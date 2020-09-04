"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = exports.replaceByToken = exports.splitByToken = exports.getMeta = exports.upsertDir = exports.removeExtension = void 0;
var fs_1 = __importDefault(require("fs"));
exports.removeExtension = function (filename) {
    if (!filename.includes(".")) {
        throw new Error("Filename does not have extension: " + filename);
    }
    return filename.split(".").slice(0, -1).join(".");
};
exports.upsertDir = function (dir) {
    if (!fs_1.default.existsSync(dir)) {
        console.log("Creating target directory: " + dir);
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
var defaultMeta = {
    title: "",
    template: "templates/site.js",
    indexTemplate: "templates/indexTemplate.js",
};
exports.getMeta = function (rawContent, defaults) {
    if (defaults === void 0) { defaults = {}; }
    if (rawContent.trim().startsWith("{")) {
        var contentLineArray = rawContent.split("\n");
        var jsonEndIndex = contentLineArray.indexOf("}");
        var meta = contentLineArray
            .slice(0, jsonEndIndex + 1)
            .join("\n")
            .trim();
        var content = contentLineArray
            .slice(jsonEndIndex + 1)
            .join("\n")
            .trim();
        var metaObject = void 0;
        try {
            metaObject = JSON.parse(meta);
            metaObject.template = metaObject.template
                ? "templates/" + metaObject.template + ".js"
                : defaultMeta.template;
            metaObject.indexTemplate = metaObject.indexTemplate
                ? "templates/" + metaObject.indexTemplate + ".js"
                : defaultMeta.indexTemplate;
        }
        catch (e) {
            throw new Error("Error parsing meta data for the following meta: " + metaObject);
        }
        return {
            meta: __assign(__assign(__assign({}, defaultMeta), defaults), metaObject),
            content: content,
        };
    }
    return {
        content: rawContent,
        meta: __assign(__assign({}, defaults), defaultMeta),
    };
};
exports.splitByToken = function (source, token) {
    var tokenRegex = new RegExp("{{\\s(" + token + ")\\s}}", "g");
    return source.split(tokenRegex);
};
exports.replaceByToken = function (source, token, replacement) {
    return exports.splitByToken(source, token)
        .map(function (str) {
        if (str === token) {
            return replacement;
        }
        else {
            return str;
        }
    })
        .join("");
};
exports.summarize = function (config, collections) {
    var filesByCollection = collections.map(function (collection) {
        return {
            name: collection.name,
            count: collection.items.length,
            location: collection.paths.targetDir,
        };
    });
    filesByCollection.forEach(function (item) {
        console.log("Collection \"" + item.name + "\" rendered " + item.count + " pages to " + item.location);
    });
};
