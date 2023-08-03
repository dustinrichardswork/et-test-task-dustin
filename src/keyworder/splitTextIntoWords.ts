import Tokenizer from "tokenize-text";

const excludeWords = new Set([
  "and",
  "at",
  "month",
  "to",
  "more",
  "a",
  "you",
  "the",
  "your",
  "is",
  "of",
  "read",
  "in",
  "count",
]);

export function splitTextIntoWords(str: string): string[] {
  const tokenize = new Tokenizer();
  return (
    tokenize
      .words()(str)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((t: any) => {
        const str: string = t.value;
        return str.toLowerCase();
      })
      .filter((w: string) => !excludeWords.has(w)) // exclude common words
      .filter((w: string) => isNaN(parseFloat(w))) // exclude numbers
  );
}
