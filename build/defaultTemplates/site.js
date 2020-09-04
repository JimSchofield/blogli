"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
function default_1(siteMeta, meta, content) {
    return "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>" + (siteMeta.siteTitle + (meta.title ? " - " + meta.title : "")) + "</title>\n    <link href=\"/" + siteMeta.assetsDir + "/prism.css\" rel=\"stylesheet\" type=\"text/css\"/>\n    <link href=\"https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap\" rel=\"stylesheet\"> \n    <style>body { margin: 0; }</style>\n</head>\n<body>\n    " + content + "\n</body>\n</html>";
}
exports.default = default_1;
