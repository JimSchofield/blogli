#! /usr/bin/env node

import { getCollections } from "./preprocess";
import getConfig from "./getConfig";
import { renderCollections } from "./render";
import { processAssets } from "./postprocess";

const __CWD = process.cwd();

const config = getConfig(__CWD);
const collections = getCollections(config);
renderCollections(config, collections);
processAssets(config);
