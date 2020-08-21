"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCollections = exports.renderCollection = void 0;
var fs_1 = __importDefault(require("fs"));
var markdown_it_1 = __importDefault(require("markdown-it"));
var MD = markdown_it_1.default({
    html: true,
    linkify: true,
    highlight: function (str, lang) {
        return "";
    },
});
var writeFile = function (item, markup) {
    if (!fs_1.default.existsSync(item.targetDir)) {
        console.log("Creating target directory: " + item.targetDir);
        fs_1.default.mkdirSync(item.targetDir, { recursive: true });
    }
    fs_1.default.writeFileSync(item.targetPath, markup, "utf8");
};
exports.renderCollection = function (collection) {
    collection.items.forEach(function (item) {
        var itemContent = fs_1.default.readFileSync(item.sourcePath, "utf8");
        var markup = MD.render(itemContent);
        writeFile(item, markup);
    });
};
exports.renderCollections = function (collections) {
    collections.forEach(exports.renderCollection);
};
