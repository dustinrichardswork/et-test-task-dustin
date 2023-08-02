import { describe, expect, it } from "@jest/globals";
import { splitTextIntoWords } from "./splitTextIntoWords";

describe("splitTextIntoWords", () => {
  it("should work", () => {
    const result = splitTextIntoWords(
      "text someother text \nhello\nworld\t123"
    );
    expect(result).toMatchInlineSnapshot(`
[
  "text",
  "someother",
  "text",
  "hello",
  "world",
  "123",
]
`);
  });
});
