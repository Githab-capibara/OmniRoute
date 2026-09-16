import { test } from "node:test";
import assert from "node:assert/strict";
import { getClaudeCodeDefaultModels } from "../../open-sse/config/providerRegistry.ts";
import { CLI_TOOLS } from "../../src/shared/constants/cliTools";

test("getClaudeCodeDefaultModels returns expected default models", () => {
  const models = getClaudeCodeDefaultModels();

  // They should be non-empty strings because providerRegistry is populated statically
  assert.ok(typeof models.fable === "string");
  assert.ok(typeof models.opus === "string");
  assert.ok(typeof models.sonnet === "string");
  assert.ok(typeof models.haiku === "string");

  // Check that the returned IDs match the expected patterns
  if (models.fable) {
    assert.match(models.fable, /fable/i);
  }
  if (models.opus) {
    assert.match(models.opus, /opus/i);
  }
  if (models.sonnet) {
    assert.match(models.sonnet, /sonnet/i);
  }
  if (models.haiku) {
    assert.match(models.haiku, /haiku/i);
  }
});

test("cliTools client-safe Claude model leaf stays in sync with providerRegistry", () => {
  const registry = getClaudeCodeDefaultModels();
  const claudeTool = CLI_TOOLS.claude;
  const defaults = claudeTool?.defaultModels ?? [];

  const capture = new Map<string, string>();
  for (const model of defaults) {
    if (model.alias === "default" || typeof model.defaultValue !== "string") continue;
    const match = /^cc\/(.+)$/.exec(model.defaultValue);
    if (match) capture.set(model.alias, match[1]);
  }

  assert.equal(capture.get("sonnet"), registry.sonnet, "sonnet default drifted from registry");
  assert.equal(capture.get("opus"), registry.opus, "opus default drifted from registry");
  assert.equal(capture.get("haiku"), registry.haiku, "haiku default drifted from registry");
  assert.equal(capture.get("fable"), registry.fable, "fable default drifted from registry");
});
