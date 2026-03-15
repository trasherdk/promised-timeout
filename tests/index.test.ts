import { describe, it, expect } from "vitest";
import { timeout } from "../src/index.js";

describe("timeout", () => {
  it("should resolve a raw promise", async () => {
    const action = new Promise<boolean>((resolve) =>
      setTimeout(resolve, 50, true),
    );
    expect(await timeout({ action })).toBe(true);
  });

  it("should resolve a function returning a promise", async () => {
    const action = () =>
      new Promise<boolean>((resolve) => setTimeout(resolve, 50, true));
    expect(await timeout({ action })).toBe(true);
  });

  it("should reject if it takes too long", async () => {
    const action = new Promise<boolean>((resolve) =>
      setTimeout(resolve, 1000, true),
    );
    await expect(timeout({ action, time: 1 })).rejects.toThrow("timeout");
  });

  it("should resolve when completed before the deadline", async () => {
    const action = new Promise<boolean>((resolve) =>
      setTimeout(resolve, 1, true),
    );
    const start = Date.now();
    const result = await timeout({ action, time: 5000 });
    expect(result).toBe(true);
    expect(Date.now() - start).toBeLessThan(200);
  });

  it("should reject with a custom error", async () => {
    const action = new Promise<boolean>((resolve) =>
      setTimeout(resolve, 1000, true),
    );
    const error = await timeout({ action, time: 1, error: "foo" }).catch(
      (e) => e,
    );
    expect(error).toBe("foo");
  });
});
