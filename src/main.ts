#!/usr/bin/env ts-node

import { parseCmd } from "./cmd/parseCmd";

main();

async function main() {
  const config = await parseCmd();

  console.log("parsed config: ", config);
}
