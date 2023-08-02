import { CrawlConfig } from "./crawler/crawlConfig";

export type Config = {
  url: string;
} & CrawlConfig;

export const defaultConfig = {
  singleUrl: false,
  crawlTotalPageLimit: 10,
  crawlDepth: 2,
} satisfies Partial<Config>;
