#! /usr/bin/env node

import { getCollections } from "./preprocess";
import getConfig from "./getConfig";
import { renderCollections } from "./render";
import { processAssets } from "./postprocess";
import { summarize } from "./util/summarize";

const __CWD = process.cwd();

const initialConfig = getConfig(__CWD);
const { collections, config } = getCollections(initialConfig);

async function main() {
  await renderCollections(config, collections);
  await processAssets(config);
  summarize(config, collections);
}
main();
