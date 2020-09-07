// eslint-disable-next-line
export default function (siteMeta: any, meta: any, content: string): string {
  const title = siteMeta.siteTitle + (meta.title ? " - " + meta.title : "");
  const description = meta.description
    ? meta.description
    : siteMeta.seo.defaultDescription;
  const image = meta.image ? meta.image : siteMeta.seo.defaultImage;
  const { address } = siteMeta.seo;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    ${address && `<meta property="og:url" content="${address}">`}
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    ${address && `<meta property="twitter:url" content="${address}">`}
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${image}">

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
