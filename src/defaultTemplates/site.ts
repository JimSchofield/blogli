import { Item } from "../types/items";
import { Config } from "../types/config";

export default function (
  config: Config,
  itemToRender: Item,
  content: string
): string {
  const title =
    config.siteMeta.siteTitle +
    (itemToRender.meta.title && itemToRender.meta.title.length > 0
      ? " - " + itemToRender.meta.title
      : "");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    ${itemToRender.metaMarkup ? itemToRender.metaMarkup : ""}
    ${
      config.prismjs
        ? `<link href="/${config.siteMeta.assetsDir}/prism.css" rel="stylesheet" type="text/css"/>`
        : ""
    }
</head>
<body>
    ${content}
</body>
</html>`;
}
