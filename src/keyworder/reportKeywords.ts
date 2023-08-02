import { formatKeyword } from "./formatKeyword";
import { Keyword } from "./keyword";

export function reportKeywords(keywords: Keyword[]) {
  const strs = [];
  for (const keyword of keywords) {
    strs.push(`- ${formatKeyword(keyword)}`);
  }
  return strs.join("\n");
}
