/**
 * Gets relative weight based on how deep url is from root of the website.
 * Each level makes it drop 5 fold.
 * Example:
 * For `/` it is 100.
 * For `/asdf` it is 20.
 * For `/asdf/zxcv` it is 4.
 * Check tests for more examples.
 */
export function getPageWeightFromUrl(url: string): number {
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split("/");
  // if url is https://google.com
  // parts will be ['', '']

  // if url is https://google.com/asdf
  // parts will be ['', 'asdf']

  // so number of non-empty parts is how deeply we are within a website.

  const pathDeep = parts.filter((p) => p !== "").length;

  return Math.pow(5, -pathDeep) * 100;
}
