import { JSDOM } from "jsdom";

/**
 * Gets inner links on a page to same website (same origin).
 */
export function getLinks({ url, dom }: { url: string; dom: JSDOM }): string[] {
  const base = new URL(url);

  return Array.from(dom.window.document.querySelectorAll("a"))
    .map((x) => x.getAttribute("href"))
    .filter((x): x is string => typeof x === "string") // null elimination
    .map((x) => {
      if (isRelativeUrl(x)) {
        return `${base.origin}${x}`;
      }
      return x;
    })
    .filter((x) => getOrigin(x) === base.origin);
}

function getOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch (err) {
    return null;
  }
}

function isRelativeUrl(url: string): boolean {
  return url.startsWith("/");
}
