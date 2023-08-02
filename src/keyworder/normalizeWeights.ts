import R from "ramda";
import { getPageWeightFromUrl } from "./getPageWeightFromUrl";
import { Keyword } from "./keyword";

/**
 * Given keywords on different pages, normalizes keyword weights according to
 * page weight and sums up weights for keywords across pages (when same keyword is encountered on different pages).
 */
export function normalizeWeights(
  pages: Array<{
    url: string;
    keywords: Keyword[];
  }>
): Keyword[] {
  const pagesWithWeights = pages.map((p) => ({
    ...p,
    weight: getPageWeightFromUrl(p.url),
  }));
  const totalPageWeight = pagesWithWeights.reduce(
    (acc, curr) => acc + curr.weight,
    0
  );

  const weightedByPage = pagesWithWeights.flatMap((p) =>
    p.keywords.map((k) => ({
      ...k,
      weight: k.weight * (p.weight / totalPageWeight), // each keyword's weight is multiplied by normalized page weight
    }))
  );

  // And now we go through all keywords and sum up their weights from different pages.
  // To do that, first we group all keyword objects by their text keyword.
  // And then we sum up resulted weight for each keyword.
  const weightsByKeyword = R.groupBy((x) => x.keyword, weightedByPage);
  const weightedDict = R.mapObjIndexed(
    (xs) => R.sum((xs ?? []).map((x) => x.weight)),
    weightsByKeyword
  );

  // Last step is to convert dictionary to array and sort by weight.
  return R.sortBy(
    (x) => x.weight,
    Object.entries(weightedDict).map(([keyword, weight]) => ({
      keyword,
      weight,
    }))
  );
}
