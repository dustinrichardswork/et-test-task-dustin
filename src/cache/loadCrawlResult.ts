import { CrawlResult } from "../crawler/crawl";
import fs from "fs/promises";
import { getFilepathForUrl } from "./getFilepathForUrl";
import { getLinks } from "../htmlParser/getLinks";
import { parseHtml } from "../htmlParser/parseHtml";

export async function loadCrawlResult(
  url: string
): Promise<CrawlResult | null> {
  const outPath = getFilepathForUrl(url);
  try {
    const content = (
      await fs.readFile(outPath, {
        encoding: "utf8",
      })
    ).toString();
    const result: CrawlResult = JSON.parse(content);
    // re-do links parsing in case parsing strategy changed
    result.links = getLinks({
      url: result.url,
      dom: parseHtml(result.content),
    });
    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err && err.code === "ENOENT") {
      return null;
    }
    console.warn(`Error reading cache file for url ${url}:`, err);
    return null;
  }
}
