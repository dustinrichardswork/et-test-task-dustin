import path from "path";
import { cacheDir } from "./cacheConstants";
import { getFilenameForUrl } from "./getFilenameForUrl";

export function getFilepathForUrl(url: string) {
  return path.join(cacheDir, getFilenameForUrl(url));
}
