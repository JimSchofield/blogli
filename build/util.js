"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExtension = void 0;
exports.removeExtension = function (filename) {
    return filename.split(".").slice(0, -1).join();
};
