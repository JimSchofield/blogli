"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDir = exports.removeExtension = void 0;
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
