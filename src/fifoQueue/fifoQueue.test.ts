import { describe, expect, test } from "@jest/globals";
import { FifoQueue } from "./fifoQueue";

describe("fifoQueue", () => {
  test("first in should be first out", () => {
    const q = new FifoQueue();
    q.push("first");
    q.push("second");

    const result = q.pop();
    expect(result).toBe("first");
  });
});
