"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollections = exports.createCollection = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var removeExtension_1 = require("./util/removeExtension");
var meta_1 = require("./meta");
var buildItems = function (config, sourceDir, targetDir) {
    var files = fs_1.default.readdirSync(sourceDir);
    /*
     * In the future I might want to configure where files are retrieved
     * by different extensions, but for now we're going to stick to `.md`
     */
    var items = files
        .filter(function (item) { return item.includes(".md") && item !== "index.md"; })
        .map(function (item) {
        var slug = removeExtension_1.removeExtension(item);
        var sourcePath = path_1.default.resolve(sourceDir, item);
        // There seemed to be no way around getting item meta and content up front
        // as we need to build collection index pages from the meta (titles)
        var itemContent = fs_1.default.readFileSync(sourcePath, "utf8");
        var _a = meta_1.getMeta(config, itemContent), content = _a.content, meta = _a.meta;
        return {
            filename: item,
            title: meta.title ? meta.title : slug,
            slug: slug,
            sourcePath: sourcePath,
            targetPath: path_1.default.resolve(targetDir, slug + ".html"),
            targetDir: path_1.default.resolve(targetDir),
            meta: meta,
            content: content,
            itemIndex: [],
        };
    });
    return items;
};
var createIndex = function (items) {
    return items.map(function (item) { return ({
        title: item.title,
        url: item.slug + ".html",
    }); });
};
var buildIndex = function (config, sourceDir, targetDir, name, items) {
    var item = "index.md";
    var slug = "index";
    var sourcePath = path_1.default.resolve(sourceDir, item);
    var title = name + " Index";
    var itemContent = fs_1.default.existsSync(sourcePath)
        ? fs_1.default.readFileSync(sourcePath, "utf8")
        : "";
    var result = meta_1.getMeta(config, itemContent, { title: title });
    var content = result.content;
    var meta = result.meta;
    return {
        filename: item,
        title: meta.title,
        slug: slug,
        sourcePath: sourcePath,
        targetPath: path_1.default.resolve(targetDir, slug + ".html"),
        targetDir: path_1.default.resolve(targetDir),
        meta: meta,
        content: content,
        itemIndex: createIndex(items),
    };
};
exports.createCollection = function (config, name) {
    var sourceDir = path_1.default.resolve(config.paths.sourceDir, name);
    var targetDir = path_1.default.resolve(config.paths.targetDir, name);
    var items = buildItems(config, sourceDir, targetDir);
    var index = buildIndex(config, sourceDir, targetDir, name, items);
    var collection = {
        name: name,
        paths: {
            sourceDir: sourceDir,
            targetDir: targetDir,
            templates: config.paths.templates,
        },
        items: items,
        index: index,
    };
    return collection;
};
exports.getCollections = function (config) {
    var collections = config.collections.include.map(function (collection) {
        return exports.createCollection(config, collection);
    });
    return collections;
};
