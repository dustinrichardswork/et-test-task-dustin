import fs from "fs/promises";
import path from "path";
import { CrawlResult } from "../crawler/crawl";
import { cacheDir } from "./cacheConstants";
import { getFilenameForUrl } from "./getFilenameForUrl";

export async function saveCrawlResult(crawlResult: CrawlResult) {
  const outPath = path.join(cacheDir, getFilenameForUrl(crawlResult.url));
  await fs.writeFile(outPath, JSON.stringify(crawlResult, undefined, 2));
}
