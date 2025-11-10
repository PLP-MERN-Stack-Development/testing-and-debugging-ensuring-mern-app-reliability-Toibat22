import { describe, it, expect } from "vitest";
import { validateBug } from "./bugHelper.js";

describe("validateBug", () => {
  it("should return true for valid bug object", () => {
    const bug = { title: "Bug 1", description: "Test bug" };
    expect(validateBug(bug)).toBe(true);
  });

  it("should return false if title is missing", () => {
    const bug = { description: "Missing title" };
    expect(validateBug(bug)).toBe(false);
  });

  it("should return false if description is missing", () => {
    const bug = { title: "Missing description" };
    expect(validateBug(bug)).toBe(false);
  });
});
