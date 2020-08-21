"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = exports.replaceByToken = exports.splitByToken = exports.upsertDir = exports.removeExtension = void 0;
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
