import R from "ramda";
import { Keyword } from "./keyword";
import { Page } from "./page";
import { splitTextIntoWords } from "./splitTextIntoWords";
import { getTextForPage } from "./getTextForPage";

export function getKeywordsForPage(page: Page): Keyword[] {
  const text = getTextForPage(page);
  // console.log(text);
  const words = splitTextIntoWords(
    text
    // page.dom.window.document.documentElement.textContent ?? ""
  );
  const result = R.countBy((x) => x, words);

  const keywords = Object.entries(result).map(([keyword, weight]) => ({
    keyword,
    weight: getWeightForKeywordLength(keyword.length) * weight,
  }));

  return keywords;
}

/**
 * Long words usually are more important.
 * Shorter words usually are some common connectivity words.
 * So it makes sense to attach different weights to them.
 */
function getWeightForKeywordLength(length: number) {
  if (length < 5) return 0.5;
  if (length > 6) return 2;
  if (length > 8) return 5;
  return 1;
}
