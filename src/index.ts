#! /usr/bin/env node

import { getCollections } from "./preprocess";
import getConfig from "./getConfig";
import { renderCollections } from "./render";
import { processAssets } from "./postprocess";
import { summarize } from "./util/summarize";

const __CWD = process.cwd();

async function main() {
  const initialConfig = await getConfig(__CWD);
  // console.log(initialConfig);
  const { collections, config } = getCollections(initialConfig);
  await renderCollections(config, collections);
  await processAssets(config);
  summarize(config, collections);
}
main();
