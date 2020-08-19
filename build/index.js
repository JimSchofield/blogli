"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var preprocess_1 = require("./preprocess");
var __CWD = process.cwd();
var config = {
    paths: {
        cwd: __CWD,
        targetDir: path_1.default.resolve(__CWD, "output"),
        sourceDir: path_1.default.resolve("content"),
    },
    collections: {
        include: ["posts", "journal"],
    },
};
var collection = preprocess_1.createCollection(config, "posts");
console.log(collection);
