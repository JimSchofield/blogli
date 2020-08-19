"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./util");
var buildItems = function (sourceDir, targetDir) {
    var files = fs_1.default.readdirSync(sourceDir);
    var items = files.map(function (item) {
        var slug = util_1.removeExtension(item);
        return {
            filename: item,
            slug: slug,
            sourcePath: path_1.default.resolve(sourceDir, item),
            targetPath: path_1.default.resolve(targetDir, slug + ".html"),
        };
    });
    return items;
};
exports.createCollection = function (config, name) {
    var sourceDir = path_1.default.resolve(config.paths.sourceDir, name);
    var targetDir = path_1.default.resolve(config.paths.targetDir, name);
    var items = buildItems(sourceDir, targetDir);
    var collection = {
        name: name,
        paths: {
            sourceDir: sourceDir,
            targetDir: targetDir,
        },
        items: items,
    };
    return collection;
};
