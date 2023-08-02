import yargs from "yargs/yargs";

import { Config, defaultConfig } from "../config";

/**
 * Parses command line arguments and converts them to domain-specific Config object.
 */
export async function parseCmd(): Promise<Config> {
  const argv = await yargs(process.argv.slice(2)).options({
    url: { type: "string", demandOption: true },
    singleUrl: { type: "boolean", default: defaultConfig.singleUrl },
    crawlDepth: { type: "number", default: defaultConfig.crawlDepth },
    crawlTotalPageLimit: {
      type: "number",
      default: defaultConfig.crawlTotalPageLimit,
    },
  }).argv;

  return {
    ...defaultConfig,
    url: argv.url,
    singleUrl: argv.singleUrl,
    crawlDepth: argv.crawlDepth,
    crawlTotalPageLimit: argv.crawlTotalPageLimit,
  };
}
