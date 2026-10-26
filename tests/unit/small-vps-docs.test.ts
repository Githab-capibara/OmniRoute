import { describe, it } from "node:test";
import { ok } from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

describe("Small VPS documentation (#8237)", () => {
  it("16-vm-deployment.md exists", () => {
    ok(existsSync("docs/ops/16-vm-deployment.md"));
  });

  it("03-environment-variables.md mentions DISABLE_BACKGROUND_SERVICES", () => {
    const content = readFileSync("docs/reference/03-environment-variables.md", "utf-8");
    ok(content.includes("DISABLE_BACKGROUND_SERVICES"), "should document the env var");
  });

  it("16-vm-deployment.md mentions RAM/resource requirements", () => {
    const content = readFileSync("docs/ops/16-vm-deployment.md", "utf-8");
    ok(content.includes("RAM") || content.includes("memory"), "should reference memory sizing");
  });
});
