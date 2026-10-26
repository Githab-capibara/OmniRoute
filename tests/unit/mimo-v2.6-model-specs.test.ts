import test from "node:test";
import assert from "node:assert/strict";

// MiMo-V2.6 (Pro + Flash) support — models.dev 2026-09-22: both declare a
// 1M context window, 131072 max output, multimodal input, and tool calling.
// Before the specs were added, passthrough gateways (e.g. hnc) resolving these
// models fell to DEFAULT_LIMITS.default (128k), so the gateway purged history
// at ~90k tokens and agent sessions "forgot" their context (issue #19157).

const { MODEL_SPECS } = await import("../../src/shared/constants/modelSpecs.ts");
const { CHAT_OPENAI_COMPAT_MODELS } = await import("../../open-sse/config/providers/shared.ts");

test("modelSpecs: mio v2.6 pro and flash ship 1M/131072 specs", () => {
  const pro = MODEL_SPECS["mimo-v2.6-pro"];
  const flash = MODEL_SPECS["mimo-v2.6-flash"];

  assert.ok(pro, "mimo-v2.6-pro spec must exist");
  assert.ok(flash, "mimo-v2.6-flash spec must exist");
  assert.equal(pro.contextWindow, 1_048_576);
  assert.equal(pro.maxOutputTokens, 131072);
  assert.equal(pro.supportsTools, true);
  assert.equal(flash.contextWindow, 1_048_576);
  assert.equal(flash.maxOutputTokens, 131072);
  assert.equal(flash.supportsTools, true);
});

test("provider catalogs expose mimo v2.6 on xiaomi-mimo, token-plan and gitlawb", () => {
  for (const key of ["xiaomi-mimo", "xiaomi-mimo-token-plan", "gitlawb"]) {
    const entries = CHAT_OPENAI_COMPAT_MODELS[key] ?? [];
    const ids = entries.map((entry: { id: string }) => entry.id);
    assert.ok(ids.includes("mimo-v2.6-pro"), `${key} must list mimo-v2.6-pro`);
    assert.ok(ids.includes("mimo-v2.6-flash"), `${key} must list mimo-v2.6-flash`);
    const pro = entries.find((entry: { id: string }) => entry.id === "mimo-v2.6-pro");
    const flash = entries.find((entry: { id: string }) => entry.id === "mimo-v2.6-flash");
    assert.equal(pro.contextLength, 1_048_576);
    assert.equal(pro.maxOutputTokens, 131_072);
    assert.equal(flash.contextLength, 1_048_576);
    assert.equal(flash.maxOutputTokens, 131_072);
  }
});
