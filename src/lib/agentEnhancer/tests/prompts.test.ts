/**
 * Tests for Agent Enhancer module
 */
import { describe, it } from "node:test";
import assert from "node:assert";
import { classifyTask, getMethodsForTask, buildEnhancedPrompt, shouldEnhance } from "../index.js";

describe("classifyTask", () => {
  it("classifies bug fix tasks", () => {
    const result = classifyTask("Fix the crash in authentication module");
    assert.equal(result, "bug_fix");
  });

  it("classifies architecture tasks", () => {
    const result = classifyTask("Design a microservices architecture for the platform");
    assert.equal(result, "architecture");
  });

  it("classifies algorithm tasks", () => {
    const result = classifyTask("Optimize this sorting algorithm for better performance");
    assert.equal(result, "algorithm");
  });

  it("classifies refactor tasks", () => {
    const result = classifyTask("Refactor this legacy code to be cleaner");
    assert.equal(result, "refactor");
  });

  it("classifies feature tasks", () => {
    const result = classifyTask("Add a new feature to support dark mode");
    assert.equal(result, "feature");
  });

  it("classifies analysis tasks", () => {
    const result = classifyTask("Analyze the performance bottleneck");
    assert.equal(result, "analysis");
  });

  it("returns general for unknown tasks", () => {
    const result = classifyTask("Hello world");
    assert.equal(result, "general");
  });

  it("is case insensitive", () => {
    const result = classifyTask("FIX the BUG");
    assert.equal(result, "bug_fix");
  });
});

describe("getMethodsForTask", () => {
  it("returns methods for bug_fix", () => {
    const methods = getMethodsForTask("bug_fix");
    assert.ok(methods.includes("reflexion"));
    assert.ok(methods.includes("chain_of_verification"));
  });

  it("returns methods for architecture", () => {
    const methods = getMethodsForTask("architecture");
    assert.ok(methods.includes("step_back"));
    assert.ok(methods.includes("graph_of_thoughts"));
  });

  it("returns general methods for unknown task types", () => {
    const methods = getMethodsForTask("general");
    assert.ok(methods.length > 0);
  });
});

describe("buildEnhancedPrompt", () => {
  it("generates enhanced prompt with task type", () => {
    const prompt = buildEnhancedPrompt("Fix the authentication bug");
    assert.ok(prompt.includes("Detected task type: **bug_fix**"));
  });

  it("includes active methods", () => {
    const prompt = buildEnhancedPrompt("Design a system architecture");
    assert.ok(prompt.includes("Active reasoning methods"));
  });

  it("includes execution order", () => {
    const prompt = buildEnhancedPrompt("Any task");
    assert.ok(prompt.includes("Execution Order"));
  });

  it("includes method descriptions", () => {
    const prompt = buildEnhancedPrompt("Fix the crash bug");
    assert.ok(prompt.includes("Reflexion") || prompt.includes("reflexion"));
    assert.ok(prompt.includes("Chain of Verification") || prompt.includes("chain_of_verification"));
  });
});

describe("shouldEnhance", () => {
  it("returns true for long messages", () => {
    const longMsg = "This is a sufficiently long message that should trigger enhancement";
    assert.equal(shouldEnhance(longMsg), true);
  });

  it("returns false for short messages", () => {
    assert.equal(shouldEnhance("Hi"), false);
  });

  it("returns true for short messages with question mark", () => {
    assert.equal(shouldEnhance("How?"), true);
  });

  it("returns true for complex questions", () => {
    const question = "What is the best way to implement this feature?";
    assert.equal(shouldEnhance(question), true);
  });
});

describe("integration scenarios", () => {
  it("bug fix scenario returns correct methods", () => {
    const taskType = classifyTask("Fix the null pointer exception in login");
    const methods = getMethodsForTask(taskType);
    const prompt = buildEnhancedPrompt("Fix the null pointer exception in login");

    assert.equal(taskType, "bug_fix");
    assert.ok(methods.includes("reflexion"));
    assert.ok(prompt.includes("bug_fix"));
  });

  it("architecture scenario returns correct methods", () => {
    const taskType = classifyTask("Design a scalable system architecture");
    const methods = getMethodsForTask(taskType);
    const prompt = buildEnhancedPrompt("Design a scalable system architecture");

    assert.equal(taskType, "architecture");
    assert.ok(methods.includes("step_back"));
    assert.ok(prompt.includes("architecture"));
  });
});
