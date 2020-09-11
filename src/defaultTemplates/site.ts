import { SiteMeta } from "../types/meta";
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
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    ${config.siteMeta.metaMarkup ? config.siteMeta.metaMarkup : ""}
    <link href="/${
      config.siteMeta.assetsDir
    }/prism.css" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"> 
</head>
<body>
    ${content}
</body>
</html>`;
}
