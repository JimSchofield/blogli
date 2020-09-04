// eslint-disable-next-line
export default function (siteMeta: any, meta: any, content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${
      siteMeta.siteTitle + (meta.title ? " - " + meta.title : "")
    }</title>
    <link href="/${
      siteMeta.assetsDir
    }/prism.css" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"> 
    <style>body { margin: 0; }</style>
</head>
<body>
    ${content}
</body>
</html>`;
}
