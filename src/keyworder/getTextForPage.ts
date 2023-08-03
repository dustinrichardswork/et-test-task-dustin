import { Page } from "./page";
import { convert } from "html-to-text";

export function getTextForPage(page: Page): string {
  // temporary solution
  // ideally we want to keep info about which tag is the word under so that we can use it to add some weight to a found keyword
  let text = convert(page.content);
  const regexpLink = /\[.*\]/g;
  text = text.replaceAll(regexpLink, "");
  const regexpUrl = /(?:https?|ftp):\/\/[\n\S]+/g;
  text = text.replaceAll(regexpUrl, "");
  return text;
}
