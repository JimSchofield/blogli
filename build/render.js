"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCollections = exports.renderCollection = void 0;
var fs_1 = __importDefault(require("fs"));
var markdown_it_1 = __importDefault(require("markdown-it"));
var initPrism_1 = __importDefault(require("./initPrism"));
var templating_1 = require("./templating");
var upsertDir_1 = require("./util/upsertDir");
var createRenderer = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    function getHighlight(str, lang) {
        var wrapStr = function (s) {
            var langStr = lang ? lang : "";
            return "<pre class=\"language-" + langStr + "\"><code class=\"language-" + langStr + "\">" + s + "</code></pre>";
        };
        if (Boolean(config.prismjs) && lang !== "") {
            var formatted = "";
            try {
                formatted = Prism.highlight(str, Prism.languages[lang], lang);
            }
            catch (e) {
                console.error("ABORTED: There was an error using Prism to highlight the language '" + lang + "'\n                      Please make sure this language is included in your Blogli config under 'prismjs.languages'");
            }
            return wrapStr(formatted);
        }
        // If no formatter or lang
        return wrapStr(str);
    }
    var Prism;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initPrism_1.default(config)];
            case 1:
                Prism = _a.sent();
                return [2 /*return*/, markdown_it_1.default({
                        html: true,
                        linkify: true,
                        highlight: getHighlight,
                    })];
        }
    });
}); };
var writeFile = function (item, markup) {
    upsertDir_1.upsertDir(item.targetDir);
    fs_1.default.writeFileSync(item.targetPath, markup, "utf8");
};
var renderItem = function (config, MD, item) { return __awaiter(void 0, void 0, void 0, function () {
    var markup, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                markup = MD.render(item.content);
                return [4 /*yield*/, templating_1.applyTemplate(config, markup, item)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.renderCollection = function (config, collection, MD) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Render collections
                collection.items.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, renderItem(config, MD, item)];
                            case 1:
                                result = _a.sent();
                                writeFile(item, result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, renderItem(config, MD, collection.index)];
            case 1:
                result = _a.sent();
                writeFile(collection.index, result);
                return [2 /*return*/];
        }
    });
}); };
exports.renderCollections = function (config, collections) { return __awaiter(void 0, void 0, void 0, function () {
    var MD;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createRenderer(config)];
            case 1:
                MD = _a.sent();
                collections.forEach(function (coll) { return exports.renderCollection(config, coll, MD); });
                return [2 /*return*/];
        }
    });
}); };
