"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDir = void 0;
var fs_1 = __importDefault(require("fs"));
exports.upsertDir = function (dir) {
    if (!fs_1.default.existsSync(dir)) {
        console.log("Creating target directory: " + dir);
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
