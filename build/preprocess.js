"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollections = exports.createCollection = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./util");
var buildItems = function (sourceDir, targetDir) {
    var files = fs_1.default.readdirSync(sourceDir);
    /*
     * In the future I might want to configure where files are retrieved
     * by different extensions, but for now we're going to stick to `.md`
     */
    var items = files
        .filter(function (item) { return item.includes(".md"); })
        .map(function (item) {
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
            templates: config.paths.templates,
        },
        items: items,
    };
    return collection;
};
exports.getCollections = function (config) {
    var collections = config.collections.include.map(function (collection) {
        return exports.createCollection(config, collection);
    });
    return collections;
};
