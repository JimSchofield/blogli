#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var preprocess_1 = require("./preprocess");
var getConfig_1 = __importDefault(require("./getConfig"));
var __CWD = process.cwd();
var config = getConfig_1.default(__CWD);
var collections = preprocess_1.getCollections(config);
console.log(collections);
