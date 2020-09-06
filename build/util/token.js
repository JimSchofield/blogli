"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceByToken = exports.splitByToken = void 0;
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
