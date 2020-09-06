"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = void 0;
exports.summarize = function (_config, collections) {
    var filesByCollection = collections.map(function (collection) {
        return {
            name: collection.name,
            count: collection.items.length,
            location: collection.paths.targetDir,
        };
    });
    filesByCollection.forEach(function (item) {
        console.log("Collection \"" + item.name + "\" rendered " + item.count + " pages to " + item.location);
    });
};
