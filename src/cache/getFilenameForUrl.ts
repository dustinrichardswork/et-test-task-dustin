import { cacheSeparator } from "./cacheConstants";

export function getFilenameForUrl(url: string) {
  const urlObj = new URL(url);
  const base64 = Buffer.from(url).toString("base64");
  const filename = `${urlObj.host}${cacheSeparator}${base64}.json`;
  return filename;
}
