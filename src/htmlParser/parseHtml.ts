import { JSDOM } from "jsdom";

export function parseHtml(content: string) {
  return new JSDOM(content);
}
