import { describe, expect, it } from "@jest/globals";
import { getPageWeightFromUrl } from "./getPageWeightFromUrl";

describe("getPageWeightFromUrl", () => {
  it("should get 100 for root url", () => {
    const result = getPageWeightFromUrl("https://google.com");
    expect(result).toBe(100);
  });

  it("should get 100 for root url even with trailing slash", () => {
    const result = getPageWeightFromUrl("https://google.com/");
    expect(result).toBe(100);
  });

  it("should be 5 times less weight for one level deep", () => {
    const result = getPageWeightFromUrl("https://google.com/asdf");
    expect(result).toBe(100 / 5);
  });

  it("should be 5 more times less weight for two level deep", () => {
    const result = getPageWeightFromUrl("https://google.com/asdf/zxcv");
    expect(result).toBe(100 / 5 / 5);
  });
});
