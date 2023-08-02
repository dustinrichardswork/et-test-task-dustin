import { Keyword } from "./keyword";

export function formatKeyword(keyword: Keyword) {
  return `"${keyword.keyword}" (${keyword.weight})`;
}
