export type CrawlConfig =
  | {
      singleUrl: true;
    }
  | {
      singleUrl: false;
      crawlTotalPageLimit: number;
      crawlDepth: number;
    };
