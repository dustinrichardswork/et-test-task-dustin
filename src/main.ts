#!/usr/bin/env ts-node

import { parseCmd } from "./cmd/parseCmd";
import { crawl } from "./crawler/crawl";
import { parseHtml } from "./htmlParser/parseHtml";
import { getKeywordsForPage } from "./keyworder/getKeywordsForPage";
import { Keyword } from "./keyworder/keyword";
import { normalizeWeights } from "./keyworder/normalizeWeights";
import { Page } from "./keyworder/page";
import { reportKeywords } from "./keyworder/reportKeywords";

main();

async function main() {
  const config = await parseCmd();

  console.debug("parsed config:", config);

  const processed: Array<{
    url: string;
    keywords: Keyword[];
  }> = [];
  for await (const crawlResult of crawl(config.url, config)) {
    console.debug("got crawl result:", crawlResult.url);

    const page: Page = {
      dom: parseHtml(crawlResult.content),
      content: crawlResult.content,
      url: crawlResult.url,
    };

    const keywords = getKeywordsForPage(page);
    processed.push({
      url: page.url,
      keywords,
    });
  }

  const keywords = normalizeWeights(processed);
  const top = keywords.slice(0, 5);
  console.log(`Top 5 keywords for website ${config.url}:`);
  console.log(reportKeywords(top));
}
