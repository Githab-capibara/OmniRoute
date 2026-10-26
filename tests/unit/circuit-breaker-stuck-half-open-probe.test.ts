/**
 * Regression tests for the stuck HALF_OPEN probe (production outage, 2026-10-02).
 *
 * The chat path dispatches every provider call through
 *   breaker.execute(chatFn, { classifyResult: () => "ignore" })
 * so that `execute()` spends a HALF_OPEN probe slot but records **no** outcome:
 * the caller owns the accounting and reports it later via `breaker._onSuccess()`
 * (src/sse/handlers/chat.ts) or `recordProviderFailure()`.
 *
 * That hand-off is not guaranteed. A client abort mid-stream, a post-abort
 * disconnect, or any early return before the caller accounts leaves the probe
 * in flight forever: `halfOpenAllowed` stays 0, the breaker sits in HALF_OPEN
 * with no timer of its own, and every subsequent request for that provider is
 * rejected with `provider_circuit_open` / 503 — permanently, until an operator
 * resets the breaker by hand.
 *
 * Fix: `halfOpenProbeAt` acts as a lease. Once a probe has been in flight for
 * longer than the effective cooldown, `_refreshOpenState()` re-arms the probe
 * slot so the next request becomes a fresh probe instead of being rejected.
 *
 * Each test uses a uniquely-named breaker so SQLite-backed state loaded by
 * `loadCircuitBreakerState()` cannot leak between tests under any concurrency.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { CircuitBreaker, STATE } from "../../src/shared/utils/circuitBreaker.ts";

const uniqueName = (suffix: string) =>
  `cb-stuck-probe-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

/** Short cooldown keeps the lease-expiry tests fast and deterministic. */
const RESET_TIMEOUT_MS = 120;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Builds an OPEN breaker whose cooldown has already elapsed. */
function openBreaker(suffix: string, options: Record<string, unknown> = {}) {
  const cb = new CircuitBreaker(uniqueName(suffix), {
    failureThreshold: 1,
    resetTimeout: RESET_TIMEOUT_MS,
    halfOpenRequests: 1,
    isFailure: () => true,
    ...options,
  });
  cb._onFailure();
  assert.equal(cb.state, STATE.OPEN);
  return cb;
}

/**
 * Reproduces the production call shape: the probe slot is spent, but the caller
 * never reports an outcome (client aborted before the accounting hand-off).
 */
async function dispatchUnaccountedProbe(cb: CircuitBreaker) {
  await cb.execute(() => Promise.resolve("aborted-before-accounting"), {
    classifyResult: () => "ignore",
  });
}

test("stuck HALF_OPEN probe re-arms once the probe lease expires", async () => {
  const cb = openBreaker("recover");

  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.getStatus().state, STATE.HALF_OPEN);
  assert.equal(cb.canExecute(), true);

  await dispatchUnaccountedProbe(cb);

  // Probe is in flight and unaccounted: traffic stays gated (no thundering herd).
  assert.equal(cb.state, STATE.HALF_OPEN);
  assert.equal(cb.canExecute(), false);

  // Lease expires → the breaker heals instead of rejecting traffic forever.
  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.canExecute(), true, "stuck HALF_OPEN probe must self-heal");
  assert.equal(cb.getStatus().halfOpenAllowed, 1);

  // The re-armed probe succeeds and the breaker closes normally.
  assert.equal(await cb.execute(() => Promise.resolve("ok")), "ok");
  assert.equal(cb.state, STATE.CLOSED);
  assert.equal(cb.getStatus().halfOpenProbeAt, null);
});

test("an accounted probe within the lease window is never re-armed concurrently", async () => {
  const cb = openBreaker("accounted");

  await sleep(RESET_TIMEOUT_MS + 20);
  await cb.execute(() => Promise.resolve("ok"));
  assert.equal(cb.state, STATE.CLOSED);
  assert.equal(cb.halfOpenProbeAt, null);

  // Still closed well after the lease window: no phantom re-arm.
  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.state, STATE.CLOSED);
  assert.equal(cb.canExecute(), true);
});

test("an accounted probe failure re-OPENs immediately instead of waiting for the lease", async () => {
  const cb = openBreaker("probe-fail");

  await sleep(RESET_TIMEOUT_MS + 20);
  // getStatus() drives the lazy OPEN → HALF_OPEN refresh.
  assert.equal(cb.getStatus().state, STATE.HALF_OPEN);

  await cb.execute(() => Promise.resolve("upstream-500"), { classifyResult: () => "failure" });

  assert.equal(cb.state, STATE.OPEN, "reported probe failure must re-OPEN");
  assert.equal(cb.halfOpenProbeAt, null);
  assert.equal(cb.canExecute(), false);
  assert.ok(cb.getStatus().retryAfterMs > 0);
});

test("a caller-side failure report after an unaccounted probe still re-OPENs", async () => {
  const cb = openBreaker("late-failure");

  await sleep(RESET_TIMEOUT_MS + 20);
  await dispatchUnaccountedProbe(cb);

  // The caller does account — just late.
  cb._onFailure();

  assert.equal(cb.state, STATE.OPEN);
  assert.equal(cb.halfOpenProbeAt, null);
});

test("re-armed slot does not resurrect a breaker whose failure was reported", async () => {
  const cb = openBreaker("no-resurrect");

  await sleep(RESET_TIMEOUT_MS + 20);
  await dispatchUnaccountedProbe(cb);
  cb._onFailure(); // → OPEN, cooldown restarts from now

  // Inside the fresh cooldown: still OPEN, nothing re-armed.
  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.getStatus().state, STATE.HALF_OPEN, "cooldown elapsed → legitimate probe window");
  assert.equal(cb.canExecute(), true);
});

test("status exposes probe bookkeeping for diagnosis", async () => {
  const cb = openBreaker("status");

  await sleep(RESET_TIMEOUT_MS + 20);
  const before = cb.getStatus();
  assert.equal(before.state, STATE.HALF_OPEN);
  assert.equal(before.halfOpenAllowed, 1);
  assert.equal(before.halfOpenProbeAt, null);

  await dispatchUnaccountedProbe(cb);
  const during = cb.getStatus();
  assert.equal(during.halfOpenAllowed, 0);
  assert.equal(typeof during.halfOpenProbeAt, "number");

  cb.reset();
  assert.equal(cb.getStatus().halfOpenProbeAt, null);
  assert.equal(cb.getStatus().halfOpenAllowed, 0);
});

test("multi-slot HALF_OPEN leases track the last dispatched probe", async () => {
  const cb = openBreaker("multi", { halfOpenRequests: 2 });

  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.getStatus().halfOpenAllowed, 2);

  await dispatchUnaccountedProbe(cb);
  await dispatchUnaccountedProbe(cb);

  assert.equal(cb.getStatus().halfOpenAllowed, 0);
  assert.equal(cb.canExecute(), false);

  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.getStatus().halfOpenAllowed, 2);
  assert.equal(cb.canExecute(), true);
});

test("halfOpenRequests: 0 keeps the breaker closed for good (no lease re-arm)", async () => {
  const cb = openBreaker("disabled", { halfOpenRequests: 0 });

  await sleep(RESET_TIMEOUT_MS + 20);
  assert.equal(cb.getStatus().state, STATE.HALF_OPEN);
  assert.equal(cb.canExecute(), false, "probes disabled by configuration");

  await sleep(RESET_TIMEOUT_MS * 3);
  assert.equal(cb.canExecute(), false, "must not re-arm when probes are disabled");
});
