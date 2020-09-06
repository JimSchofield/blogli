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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeta = void 0;
var meta_1 = require("./types/meta");
/*
 * Files may begin by including some meta information about the item
 * in json.  This needs to be split from the actual markdown before
 * converting to markup.
 */
exports.getMeta = function (config, rawContent, defaults) {
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
                ? config.paths.templates + "/" + metaObject.template + ".js"
                : meta_1.defaultMeta.template;
            metaObject.indexTemplate = metaObject.indexTemplate
                ? config.paths.templates + "/" + metaObject.indexTemplate + ".js"
                : meta_1.defaultMeta.indexTemplate;
        }
        catch (e) {
            throw new Error("Error parsing meta data for the following meta: " + metaObject);
        }
        return {
            meta: __assign(__assign(__assign({}, meta_1.defaultMeta), defaults), metaObject),
            content: content,
        };
    }
    return {
        content: rawContent,
        meta: __assign(__assign({}, defaults), meta_1.defaultMeta),
    };
};
