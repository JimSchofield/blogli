#! /usr/bin/env node

import { getCollections } from "./preprocess";
import getConfig from "./getConfig";

const __CWD = process.cwd();

const config = getConfig(__CWD);
const collections = getCollections(config);
console.log(collections);
