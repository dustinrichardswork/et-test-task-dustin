import { describe, expect, it } from "@jest/globals";
import { loadCrawlResult } from "./loadCrawlResult";

describe("loadCrawlResult", () => {
  it("should not throw for non existent cache", async () => {
    const result = await loadCrawlResult(
      "https://abrakadabra.nonexistent.website"
    );
    expect(result).toBe(null);
  });
});
