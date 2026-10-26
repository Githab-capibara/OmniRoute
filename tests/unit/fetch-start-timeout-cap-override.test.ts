/**
 * Tests for the headers-phase cap override (`OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS`).
 *
 * The 110s default keeps OmniRoute's watchdog under Codex's ~120s client abort.
 * Gateways fronting a slow upstream need more headroom than that, and without an
 * override the cap turns a working-but-slow provider into an unrecoverable 504.
 * The default must stay exactly 110s so Codex behaviour is unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveFetchStartTimeout,
  resolveFetchStartTimeoutCapMs,
  DEFAULT_FETCH_START_TIMEOUT_CAP_MS,
  CODEX_CLIENT_ABORT_MS,
} from "../../open-sse/utils/fetchStartTimeoutPolicy.ts";

const ENV = "OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS";

function withEnv<T>(value: string | undefined, fn: () => T): T {
  const previous = process.env[ENV];
  if (value === undefined) delete process.env[ENV];
  else process.env[ENV] = value;
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env[ENV];
    else process.env[ENV] = previous;
  }
}

test("default cap is unchanged and still under Codex's client abort window", () => {
  withEnv(undefined, () => {
    assert.equal(resolveFetchStartTimeoutCapMs(), DEFAULT_FETCH_START_TIMEOUT_CAP_MS);
    assert.equal(DEFAULT_FETCH_START_TIMEOUT_CAP_MS, 110_000);
    assert.ok(DEFAULT_FETCH_START_TIMEOUT_CAP_MS < CODEX_CLIENT_ABORT_MS);
  });
});

test("streaming requests are still capped to 110s by default", () => {
  withEnv(undefined, () => {
    const result = resolveFetchStartTimeout({ baseTimeoutMs: 600_000, stream: true });
    assert.equal(result.timeoutMs, 110_000);
    assert.equal(result.capped, true);
  });
});

test("OMNIROUTE_FETCH_START_TIMEOUT_CAP_MS raises the cap for slow upstreams", () => {
  withEnv("300000", () => {
    assert.equal(resolveFetchStartTimeoutCapMs(), 300_000);
    const result = resolveFetchStartTimeout({ baseTimeoutMs: 600_000, stream: true });
    assert.equal(result.timeoutMs, 300_000);
    assert.equal(result.baseTimeoutMs, 600_000);
    assert.equal(result.capped, true);
  });
});

test("a raised cap still cannot exceed the base timeout", () => {
  withEnv("300000", () => {
    const result = resolveFetchStartTimeout({ baseTimeoutMs: 90_000, stream: true });
    assert.equal(result.timeoutMs, 90_000);
    assert.equal(result.capped, false);
  });
});

test("invalid, empty, zero and negative overrides fall back to the default", () => {
  for (const bad of ["", "   ", "abc", "0", "-1", "-300000", "NaN", "Infinity"]) {
    withEnv(bad, () => {
      assert.equal(
        resolveFetchStartTimeoutCapMs(),
        DEFAULT_FETCH_START_TIMEOUT_CAP_MS,
        `expected fallback for ${JSON.stringify(bad)}`
      );
    });
  }
});

test("surrounding whitespace and fractional values are tolerated", () => {
  withEnv(" 240000 ", () => assert.equal(resolveFetchStartTimeoutCapMs(), 240_000));
  withEnv("120500.9", () => assert.equal(resolveFetchStartTimeoutCapMs(), 120_500));
});

test("non-streaming requests are never capped, even with the env override", () => {
  withEnv("300000", () => {
    const result = resolveFetchStartTimeout({ baseTimeoutMs: 600_000, stream: false });
    assert.equal(result.timeoutMs, 600_000);
    assert.equal(result.capped, false);
  });
});

test("explicit capMs argument still wins over the environment", () => {
  withEnv("300000", () => {
    const result = resolveFetchStartTimeout({
      baseTimeoutMs: 600_000,
      stream: true,
      capMs: 45_000,
    });
    assert.equal(result.timeoutMs, 45_000);
  });
});
