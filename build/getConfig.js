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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.default = (function (__CWD) {
    var configFile = fs_1.default.readFileSync(path_1.default.resolve(__CWD, "blogli.json"), "utf8");
    var initConfig = JSON.parse(configFile);
    var targetDir = path_1.default.resolve(__CWD, initConfig.paths.targetDir);
    var config = {
        templateMeta: {
            assetsDir: initConfig.paths.targetAssetsDir
                ? initConfig.paths.targetAssetsDir
                : "assets",
            siteTitle: initConfig.title ? initConfig.title : "My Blogli Site!",
        },
        paths: __assign(__assign({ cwd: __CWD, targetDir: targetDir, sourceDir: path_1.default.resolve(__CWD, initConfig.paths.sourceDir) }, (initConfig.paths.templates
            ? { templates: path_1.default.resolve(__CWD, initConfig.paths.templates) }
            : {})), { sourceAssetsDir: initConfig.paths.sourceAssetsDir
                ? path_1.default.resolve(__CWD, initConfig.paths.sourceAssetsDir)
                : path_1.default.resolve("assets"), targetAssetsDir: initConfig.paths.targetAssetsDir
                ? path_1.default.resolve(targetDir, initConfig.paths.targetAssetsDir)
                : path_1.default.resolve(targetDir, "assets") }),
        collections: __assign({}, initConfig.collections),
        prismjs: __assign({}, initConfig.prismjs),
    };
    return config;
});
