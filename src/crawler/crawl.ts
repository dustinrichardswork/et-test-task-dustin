import { loadCrawlResult } from "../cache/loadCrawlResult";
import { saveCrawlResult } from "../cache/saveCrawlResult";
import { FifoQueue } from "../fifoQueue/fifoQueue";
import { CrawlConfig } from "./crawlConfig";
import { crawlSingle } from "./crawlSingle";

export type CrawlResult = {
  url: string;
  depth: number;

  content: string;
  links: string[];
};

export type CrawlFail = {
  url: string;
  error: unknown;
};

/**
 * Dumb and simple webpage crawler. Implements BFS ("breadth-first search") traversal pattern. Doesn't work with SPA (Single Page Application) websites.
 */
export async function* crawl(
  url: string,
  config: CrawlConfig
): AsyncGenerator<CrawlResult, CrawlFail[], unknown> {
  const shared: Shared = {
    depth: 0,
    pageCount: 0,
    visited: new Set<string>(),
    urls: new FifoQueue([url]),
    failed: [],
  };
  yield* _crawl(shared, config);

  for (const failed of shared.failed) {
    console.warn(`Error crawling ${failed.url}: `, failed.error);
  }

  return shared.failed;
}

/**
 * Shared mutable context used throughout recursion.
 */
type Shared = {
  pageCount: number;
  depth: number;

  /**
   * Already visited urls. Used to prevent dead-loops.
   */
  visited: Set<string>;

  /**
   * Urls yet to process.
   */
  urls: FifoQueue<string>;

  failed: CrawlFail[];
};

async function* _crawl(
  shared: Shared,
  config: CrawlConfig
): AsyncGenerator<CrawlResult, void, unknown> {
  if (shared.urls.isEmpty()) return;

  const nextDepthUrls: string[][] = [];

  let url;
  // `shared.urls` is a shared mutable queue of urls, so we are processing it until there is nothing left and then refill it with inner links.
  // But as soon as it reaches too deep or crawls too many pages, we hit `validateCrawl` condition and return early.
  while ((url = shared.urls.pop())) {
    if (!validateCrawl(shared, config)) return;
    if (shared.visited.has(url)) continue;
    shared.visited.add(url);

    try {
      const cached = await loadCrawlResult(url);
      if (cached) {
        shared.pageCount += 1;
        yield cached;
        nextDepthUrls.push(cached.links);
      } else {
        const page = await crawlSingle(url);
        shared.pageCount += 1;

        const crawlResult = {
          ...page,
          depth: shared.depth,
          url: url,
        };
        await saveCrawlResult(crawlResult);
        yield crawlResult;
        nextDepthUrls.push(page.links);
      }
    } catch (error) {
      shared.failed.push({
        url,
        error,
      });
    }
  }

  shared.depth += 1;
  shared.urls = new FifoQueue(nextDepthUrls.flat());

  yield* _crawl(shared, config);
}

function validateCrawl(shared: Shared, config: CrawlConfig) {
  if (config.singleUrl) {
    return shared.pageCount === 0;
  }
  if (shared.depth > config.crawlDepth) return false;
  if (shared.pageCount >= config.crawlTotalPageLimit) return false;
  return true;
}
