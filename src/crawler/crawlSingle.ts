import axios from "axios";
import { parseHtml } from "../htmlParser/parseHtml";
import { getLinks } from "../htmlParser/getLinks";

export type CrawlSingleResult = {
  content: string;
  links: string[];
};

export async function crawlSingle(url: string): Promise<CrawlSingleResult> {
  const result = await axios.get(url, {
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept#examples default for navigation requests
      Accept:
        "text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
    },
  });

  const content = result.data;
  const dom = parseHtml(content);

  return {
    content,
    links: getLinks({
      url,
      dom,
    }),
  };
}
