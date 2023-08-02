export function splitTextIntoWords(str: string): string[] {
  return str
    .split(/[ \n\r\t]/)
    .map((x) => x.trim())
    .filter((x) => x !== "");
}
