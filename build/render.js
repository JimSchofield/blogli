"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var markdown_it_1 = __importDefault(require("markdown-it"));
var render = markdown_it_1.default({
    html: true,
    linkify: true,
    highlight: function (str, lang) {
        console.log("Found some code: ", str, lang);
        return "";
    },
});
exports.default = render;
