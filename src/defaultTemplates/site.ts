import { SiteMeta, Meta } from "../types/meta";

export default function (
  siteMeta: SiteMeta,
  meta: Meta,
  content: string
): string {
  const title =
    siteMeta.siteTitle +
    (meta.title && meta.title.length > 0 ? " - " + meta.title : "");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    ${siteMeta.metaMarkup ? siteMeta.metaMarkup : ""}
    <link href="/${
      siteMeta.assetsDir
    }/prism.css" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"> 
</head>
<body>
    ${content}
</body>
</html>`;
}
