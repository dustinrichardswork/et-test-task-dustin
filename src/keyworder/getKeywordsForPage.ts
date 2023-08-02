import R from "ramda";
import { Keyword } from "./keyword";
import { Page } from "./page";
import { splitTextIntoWords } from "./splitTextIntoWords";

export function getKeywordsForPage(page: Page): Keyword[] {
  const words = splitTextIntoWords(
    page.dom.window.document.documentElement.textContent ?? ""
  );
  const result = R.countBy((x) => x, words);

  return Object.entries(result).map(([keyword, weight]) => ({
    keyword,
    weight,
  }));
}
