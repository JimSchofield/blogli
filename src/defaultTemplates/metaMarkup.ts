import { SiteMeta, Meta } from "../types/meta";
import { getFirstTruthy } from "../util/getFirstTruthy";

export const getMetaMarkup = (siteMeta: SiteMeta, meta: Meta): string => {
  const title =
    siteMeta.siteTitle +
    (meta.title && meta.title.length > 0 ? " - " + meta.title : "");
  const description = getFirstTruthy(
    meta.description,
    siteMeta.seo && siteMeta.seo.defaultDescription
  );
  const image = getFirstTruthy(
    meta.image,
    siteMeta.seo && siteMeta.seo.defaultImage
  );
  const address = getFirstTruthy(meta.sitePath);

  return `
    <meta name="title" content="${title}">
    ${description ? `<meta name="description" content="${description}">` : ""}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    ${address ? `<meta property="og:url" content="${address}">` : ""}
    <meta property="og:title" content="${title}">
    ${
      description
        ? `<meta property="og:description" content="${description}">`
        : ""
    }
    ${image ? `<meta property="og:image" content="${image}">` : ""}

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    ${address ? `<meta property="twitter:url" content="${address}">` : ""}
    <meta property="twitter:title" content="${title}">
    ${
      description
        ? `<meta property="twitter:description" content="${description}">`
        : ""
    }
    ${image ? `<meta property="twitter:image" content="${image}">` : ""}
  `;
};
