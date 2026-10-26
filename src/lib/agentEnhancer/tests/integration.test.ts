/**
 * Integration test: Agent Enhancer in chat handler
 *
 * Verifies that the enhanced system prompt is correctly injected
 * into the messages array before routing to the model.
 */
import { describe, it } from "node:test";
import assert from "node:assert";
import { buildEnhancedPrompt, shouldEnhance, classifyTask } from "../index.js";

/**
 * Simulate the enhancement logic from chat.ts
 */
function applyEnhancement(
  messages: Array<{ role: string; content: string }>
): Array<{ role: string; content: string }> {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return messages;
  }

  const lastUserMsg = [...messages]
    .reverse()
    .find((m) => m.role === "user" && typeof m.content === "string");

  if (lastUserMsg && shouldEnhance(lastUserMsg.content)) {
    const enhancedPrompt = buildEnhancedPrompt(lastUserMsg.content);
    const systemIdx = messages.findIndex((m) => m.role === "system");

    if (systemIdx >= 0) {
      const existing = messages[systemIdx].content || "";
      messages[systemIdx].content = enhancedPrompt + "\n\n" + existing;
    } else {
      messages.unshift({ role: "system", content: enhancedPrompt });
    }
  }

  return messages;
}

describe("Agent Enhancer Integration", () => {
  it("injects system prompt when none exists", () => {
    const messages = [
      {
        role: "user",
        content: "Fix the authentication bug in the login module that causes crash on startup",
      },
    ];

    const result = applyEnhancement(messages);

    assert.equal(result.length, 2);
    assert.equal(result[0].role, "system");
    assert.ok(result[0].content.includes("Enhanced Agent Mode"));
    assert.ok(result[0].content.includes("bug_fix"));
  });

  it("prepends to existing system message", () => {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Design a microservices architecture for handling high traffic loads",
      },
    ];

    const result = applyEnhancement(messages);

    assert.equal(result.length, 2);
    assert.equal(result[0].role, "system");
    assert.ok(result[0].content.includes("Enhanced Agent Mode"));
    assert.ok(result[0].content.includes("You are a helpful assistant."));
  });

  it("does not enhance short messages", () => {
    const messages = [{ role: "user", content: "Hi" }];

    const result = applyEnhancement(messages);

    assert.equal(result.length, 1);
    assert.equal(result[0].role, "user");
  });

  it("enhances long messages", () => {
    const messages = [
      {
        role: "user",
        content:
          "This is a complex question that requires detailed analysis and multiple reasoning steps to answer properly",
      },
    ];

    const result = applyEnhancement(messages);

    assert.equal(result.length, 2);
    assert.equal(result[0].role, "system");
  });

  it("enhances questions even if short", () => {
    const messages = [{ role: "user", content: "Why?" }];

    const result = applyEnhancement(messages);

    assert.equal(result.length, 2);
    assert.equal(result[0].role, "system");
  });

  it("uses last user message for classification", () => {
    const messages = [
      { role: "user", content: "Hello there my friend" },
      { role: "assistant", content: "Hi there! How can I help?" },
      { role: "user", content: "Fix the crash in the authentication module immediately" },
    ];

    const result = applyEnhancement(messages);

    const systemMsg = result.find((m) => m.role === "system");
    assert.ok(systemMsg);
    assert.ok(systemMsg.content.includes("bug_fix"));
  });

  it("handles messages with non-string content", () => {
    const messages = [{ role: "user", content: [{ type: "text", text: "Fix the bug" }] }];

    const result = applyEnhancement(messages);

    // Should not crash, should not enhance (content is not string)
    assert.equal(result.length, 1);
  });

  it("preserves message order", () => {
    const messages = [
      { role: "system", content: "Original system prompt content here" },
      { role: "user", content: "First question about something" },
      { role: "assistant", content: "First answer to your question" },
      {
        role: "user",
        content: "Design a scalable architecture for the platform that handles millions",
      },
    ];

    const result = applyEnhancement(messages);

    assert.equal(result[0].role, "system");
    assert.ok(result[0].content.includes("Enhanced Agent Mode"));
    assert.equal(result[1].role, "user");
    assert.equal(result[2].role, "assistant");
    assert.equal(result[3].role, "user");
  });
});

describe("End-to-end enhancement flow", () => {
  it("bug fix task gets correct methods", () => {
    const userMsg = "Fix the null pointer exception in the authentication service";
    const taskType = classifyTask(userMsg);
    const prompt = buildEnhancedPrompt(userMsg);

    assert.equal(taskType, "bug_fix");
    assert.ok(prompt.includes("Reflexion"));
    assert.ok(prompt.includes("Chain of Verification"));
    assert.ok(prompt.includes("Self-Consistency"));
  });

  it("architecture task gets correct methods", () => {
    const userMsg = "Design a system architecture for a scalable microservices platform";
    const taskType = classifyTask(userMsg);
    const prompt = buildEnhancedPrompt(userMsg);

    assert.equal(taskType, "architecture");
    assert.ok(prompt.includes("Step-back"));
    assert.ok(prompt.includes("Graph of Thoughts"));
    assert.ok(prompt.includes("Tree of Thoughts"));
  });

  it("analysis task gets correct methods", () => {
    const userMsg = "Analyze the performance bottleneck in the database queries";
    const taskType = classifyTask(userMsg);
    const prompt = buildEnhancedPrompt(userMsg);

    assert.equal(taskType, "analysis");
    assert.ok(prompt.includes("Chain of Verification"));
    assert.ok(prompt.includes("Maieutic"));
  });
});
