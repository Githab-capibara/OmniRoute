import { test } from "node:test";
import assert from "node:assert/strict";

import { STREAM_RECOVERY } from "../../open-sse/config/constants.ts";
import { createRecoverableStream, HoldbackBuffer } from "../../open-sse/services/streamRecovery.ts";

const enc = (s: string) => new TextEncoder().encode(s);

/** A clock that jumps +1000ms per call so the holdback commits on the very first chunk. */
function steppingClock() {
  let t = 0;
  return () => {
    t += 1000;
    return t;
  };
}

function streamFrom(
  chunks: string[],
  opts: { truncateError?: Error } = {}
): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) {
        controller.enqueue(enc(chunks[i++]));
        return;
      }
      if (opts.truncateError) controller.error(opts.truncateError);
      else controller.close();
    },
  });
}

async function readAll(rs: ReadableStream<Uint8Array>): Promise<string> {
  const reader = rs.getReader();
  const dec = new TextDecoder();
  let out = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) out += dec.decode(value, { stream: true });
    }
  } catch {
    // caller inspects what arrived before the failure
  }
  return out;
}

const econnreset = () => Object.assign(new Error("socket reset"), { code: "ECONNRESET" });
const abortError = () => Object.assign(new Error("aborted"), { name: "AbortError" });

const ROLE = 'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n';
const reasoning = (s: string) =>
  `data: {"choices":[{"delta":{"reasoning_content":${JSON.stringify(s)}}}]}\n\n`;
const content = (s: string) => `data: {"choices":[{"delta":{"content":${JSON.stringify(s)}}}]}\n\n`;
const DONE = "data: [DONE]\n\n";

/** A long reasoning phase that produced no answer, then the upstream dies. */
const REASONING_ONLY = [ROLE, reasoning("thinking hard..."), reasoning("still thinking...")];
/** A second attempt that actually delivers an answer. */
const GOOD_ANSWER = [ROLE, content("hello"), DONE];

test("CONTENTLESS_RESTART_MAX is a small deliberate budget", () => {
  assert.equal(STREAM_RECOVERY.CONTENTLESS_RESTART_MAX, 2);
});

test("post-commit transport error with no assistant content re-opens and delivers the answer", async () => {
  let opens = 0;
  const out = await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );

  assert.equal(opens, 1, "should re-open exactly once and succeed");
  assert.match(out, /hello/, "client receives the recovered answer");
  assert.equal(out.match(/hello/g)?.length, 1, "answer text must not be duplicated");
});

test("graceful close with no assistant content also re-opens", async () => {
  let opens = 0;
  const out = await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY), // clean close, but no answer and no terminal marker
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );

  assert.equal(opens, 1);
  assert.match(out, /hello/);
});

test("disabled by default — omitting maxContentlessRestarts keeps the error visible", async () => {
  let opens = 0;
  let errored: Error | null = null;
  const reader = createRecoverableStream(
    streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
    () => {
      opens += 1;
      return Promise.resolve(streamFrom(GOOD_ANSWER));
    },
    { finalize: () => {}, now: steppingClock() }
  ).getReader();

  try {
    for (;;) {
      const { done } = await reader.read();
      if (done) break;
    }
  } catch (e) {
    errored = e as Error;
  }

  assert.equal(opens, 0, "no re-open when the operator did not opt in");
  assert.ok(errored, "the upstream error must still reach the client");
});

test("maxContentlessRestarts: 0 is an explicit opt-out", async () => {
  let opens = 0;
  await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      { finalize: () => {}, now: steppingClock(), maxContentlessRestarts: 0 }
    )
  );
  assert.equal(opens, 0);
});

test("restart budget is bounded and the error surfaces once exhausted", async () => {
  let opens = 0;
  const seen: number[] = [];
  const out = await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
      () => {
        opens += 1;
        // every attempt dies the same way
        return Promise.resolve(streamFrom(REASONING_ONLY, { truncateError: econnreset() }));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
        onContentlessRestart: (attempt) => seen.push(attempt),
      }
    )
  );

  assert.equal(opens, STREAM_RECOVERY.CONTENTLESS_RESTART_MAX, "budget is a hard ceiling");
  assert.deepEqual(seen, [1, 2], "observability hook fires per attempt");
  assert.doesNotMatch(out, /hello/, "no fabricated answer once the budget is spent");
});

test("a client cancellation is never turned into a restart", async () => {
  let opens = 0;
  await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: abortError() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );
  assert.equal(opens, 0, "AbortError must not spend another upstream request");
});

test("no restart once assistant text already reached the client", async () => {
  let opens = 0;
  await readAll(
    createRecoverableStream(
      streamFrom([ROLE, content("partial answer")], { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );
  assert.equal(opens, 0, "restarting would duplicate text the client already has");
});

test("no restart once a complete tool call already reached the client", async () => {
  let opens = 0;
  const toolCall =
    'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"name":"f","arguments":"{}"}}]},"finish_reason":"tool_calls"}]}\n\n';
  await readAll(
    createRecoverableStream(
      streamFrom([ROLE, reasoning("hmm"), toolCall], { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );
  assert.equal(opens, 0, "a delivered tool call must never be duplicated");
});

test("no restart while a tool call is still in flight", async () => {
  let opens = 0;
  const partialToolCall =
    'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"name":"f","arguments":"{\\"a\\":"}}]}}]}\n\n';
  await readAll(
    createRecoverableStream(
      streamFrom([ROLE, reasoning("hmm"), partialToolCall], { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );
  assert.equal(opens, 0, "a half-sent tool call must not be re-run into a second one");
});

test("restart re-runs the original request and never prefills", async () => {
  let opens = 0;
  let continuations = 0;
  await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(GOOD_ANSWER));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
        continueStream: () => {
          continuations += 1;
          return Promise.resolve(streamFrom(GOOD_ANSWER));
        },
      }
    )
  );
  assert.equal(opens, 1, "the plain re-open path is used");
  assert.equal(continuations, 0, "continuation cannot apply to an empty stream");
});

test("holdbackMs: 0 commits on the first chunk so restart-only installs no latency", () => {
  const hb = new HoldbackBuffer({ now: () => 0, holdbackMs: 0 });
  const emitted = hb.push(enc("data: a\n\n"));
  assert.equal(hb.committed, true, "zero holdback commits immediately");
  assert.equal(Buffer.concat(emitted).toString("utf8"), "data: a\n\n");
});
test("a restart replacement never re-enters early retry (worst case is 3 attempts)", async () => {
  let opens = 0;
  // Every attempt — first or replacement — dies the same way. If a replacement could
  // fall back into the pre-commit early-retry path, the attempt count would multiply
  // instead of staying bounded.
  await readAll(
    createRecoverableStream(
      streamFrom(REASONING_ONLY, { truncateError: econnreset() }),
      () => {
        opens += 1;
        return Promise.resolve(streamFrom(REASONING_ONLY, { truncateError: econnreset() }));
      },
      {
        finalize: () => {},
        now: steppingClock(),
        maxContentlessRestarts: STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
      }
    )
  );
  assert.equal(
    opens,
    STREAM_RECOVERY.CONTENTLESS_RESTART_MAX,
    "one open per restart, no early retries on top"
  );
});
