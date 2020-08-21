#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var preprocess_1 = require("./preprocess");
var getConfig_1 = __importDefault(require("./getConfig"));
var render_1 = require("./render");
var postprocess_1 = require("./postprocess");
var __CWD = process.cwd();
var config = getConfig_1.default(__CWD);
var collections = preprocess_1.getCollections(config);
render_1.renderCollections(config, collections);
postprocess_1.processAssets(config);
