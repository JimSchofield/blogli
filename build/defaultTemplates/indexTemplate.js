"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(data) {
    var content = data.content, itemIndex = data.itemIndex;
    return "\n    " + content + "\n    <ul>\n      " + itemIndex
        .map(function (item) {
        return "\n          <li><a href=\"" + item.url + "\">" + item.title + "</a></li>\n        ";
    })
        .join("") + "\n    </ul>\n  ";
}
exports.default = default_1;
