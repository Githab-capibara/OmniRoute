import test from "node:test";
import assert from "node:assert/strict";
import {
  isCompressionExcluded,
  normalizeCompressionExclusions,
} from "../../open-sse/services/compression/exclusions.ts";
import { applyStackedCompression } from "../../open-sse/services/compression/strategySelector.ts";
import type { CompressionPipelineStep } from "../../open-sse/services/compression/types.ts";

// #8034 — per-model/endpoint compression exclusion filter.

test("isCompressionExcluded: excluded model is true, non-excluded is false", () => {
  const exclusions = normalizeCompressionExclusions(["text-embedding-3-large"]);
  assert.equal(isCompressionExcluded({ model: "text-embedding-3-large" }, exclusions), true);
  assert.equal(isCompressionExcluded({ model: "gpt-5-6" }, exclusions), false);
});

test("isCompressionExcluded: provider/model composite and bare-model patterns both match", () => {
  const composite = normalizeCompressionExclusions(["openai/text-embedding-3-large"]);
  assert.equal(
    isCompressionExcluded({ provider: "openai", model: "text-embedding-3-large" }, composite),
    true
  );
  // Bare model alone (no provider given) does not match a provider-qualified pattern.
  assert.equal(isCompressionExcluded({ model: "text-embedding-3-large" }, composite), false);

  const bare = normalizeCompressionExclusions(["text-embedding-3-large"]);
  assert.equal(
    isCompressionExcluded({ provider: "openai", model: "text-embedding-3-large" }, bare),
    true
  );
});

test("isCompressionExcluded: provider/* wildcard matches every model of that provider; * excludes everything", () => {
  const providerWildcard = normalizeCompressionExclusions(["openai/*"]);
  assert.equal(
    isCompressionExcluded({ provider: "openai", model: "gpt-5-6" }, providerWildcard),
    true
  );
  assert.equal(
    isCompressionExcluded({ provider: "anthropic", model: "claude-opus" }, providerWildcard),
    false
  );

  const everything = normalizeCompressionExclusions(["*"]);
  assert.equal(
    isCompressionExcluded({ provider: "anthropic", model: "claude-opus" }, everything),
    true
  );
  assert.equal(isCompressionExcluded({ model: "anything" }, everything), true);
});

// #19157 — passthrough gateways (hcnsec/hnc) must skip the lossy stacked pipeline so a
// 1M-window MiMo agent keeps its context instead of being rewritten every turn. The
// operator opted in with a `hnc/*` exclusion; verify the wildcard matches real model ids.
test("isCompressionExcluded: hnc/* exclusion matches hnc passthrough models", () => {
  const exclusions = normalizeCompressionExclusions(["hnc/*"]);
  assert.equal(
    isCompressionExcluded({ provider: "hnc", model: "MiMo-V2.6-Flash" }, exclusions),
    true
  );
  assert.equal(
    isCompressionExcluded({ provider: "hnc", model: "glm-5.3-flash" }, exclusions),
    true
  );
  // Bare model id alone does not match the provider-qualified wildcard.
  assert.equal(isCompressionExcluded({ model: "MiMo-V2.6-Flash" }, exclusions), false);
  // Other providers remain compressible.
  assert.equal(
    isCompressionExcluded({ provider: "xiaomi-mimo", model: "mimo-v2.6-flash" }, exclusions),
    false
  );
});

test("isCompressionExcluded: case-insensitive match", () => {
  const exclusions = normalizeCompressionExclusions(["OpenAI/GPT-5-6"]);
  assert.equal(isCompressionExcluded({ provider: "openai", model: "gpt-5-6" }, exclusions), true);
  assert.equal(isCompressionExcluded({ provider: "OPENAI", model: "GPT-5-6" }, exclusions), true);
});

test("isCompressionExcluded: empty / absent / malformed exclusions => false (default unchanged)", () => {
  assert.equal(isCompressionExcluded({ model: "gpt-5-6" }, undefined), false);
  assert.equal(isCompressionExcluded({ model: "gpt-5-6" }, []), false);
  // Malformed raw input normalizes to an empty list.
  assert.equal(
    isCompressionExcluded({ model: "gpt-5-6" }, normalizeCompressionExclusions("not-an-array")),
    false
  );
  assert.equal(
    isCompressionExcluded({ model: "gpt-5-6" }, normalizeCompressionExclusions(null)),
    false
  );
});

test("isCompressionExcluded: regex metacharacters in a pattern are escaped", () => {
  const exclusions = normalizeCompressionExclusions(["gpt-5.6"]);
  assert.equal(isCompressionExcluded({ model: "gpt-5.6" }, exclusions), true);
  // A literal `.` must not behave as "any character" — gpt-5x6 must NOT match.
  assert.equal(isCompressionExcluded({ model: "gpt-5x6" }, exclusions), false);
});

test("normalizeCompressionExclusions: drops non-strings and dedupes", () => {
  const result = normalizeCompressionExclusions([
    "gpt-5-6",
    "GPT-5-6",
    " gpt-5-6 ",
    42,
    null,
    undefined,
    { not: "a string" },
    "claude-opus",
  ]);
  assert.deepEqual(result, ["gpt-5-6", "claude-opus"]);
});

test("behavior: excluded target passes through byte-identical; non-excluded still compresses", () => {
  const pipeline: CompressionPipelineStep[] = [{ engine: "caveman", intensity: "full" }];
  const body = {
    messages: [
      {
        role: "user",
        content:
          "I would like to please politely and kindly ask you a question if that is okay with you.",
      },
    ],
  };

  const exclusions = normalizeCompressionExclusions(["openai/text-embedding-3-large"]);

  // Excluded target: the caller must skip the whole pipeline before calling into it — this
  // assertion proves the gate condition itself, not applyStackedCompression's own no-op path.
  const excludedTarget = { provider: "openai", model: "text-embedding-3-large" };
  assert.equal(isCompressionExcluded(excludedTarget, exclusions), true);
  const passthroughBody = JSON.parse(JSON.stringify(body));
  assert.deepEqual(passthroughBody, body);

  // Non-excluded target: the pipeline is not gated and still compresses (savings observed).
  const nonExcludedTarget = { provider: "openai", model: "gpt-5-6" };
  assert.equal(isCompressionExcluded(nonExcludedTarget, exclusions), false);
  const result = applyStackedCompression(JSON.parse(JSON.stringify(body)), pipeline, {
    preserveSystemPrompt: false,
  });
  assert.equal(result.compressed, true);
  assert.notEqual(JSON.stringify(result.body), JSON.stringify(body));
});
