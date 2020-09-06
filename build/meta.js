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
