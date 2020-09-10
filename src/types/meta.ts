import { ItemIndex } from "./items";

export interface Meta {
  title: string;
  template: string;
  indexTemplate: string;
  order: number;
  description?: string;
  image?: string;
  sitePath: string;
}

export const defaultMeta: Meta = {
  title: "",
  template: "templates/site.js",
  indexTemplate: "templates/indexTemplate.js",
  sitePath: "",
  order: Infinity,
};

export interface SiteMeta {
  assetsDir: string;
  siteTitle: string;
  pagesIndex?: ItemIndex;
  seo?: {
    address?: string;
    defaultDescription?: string;
    defaultImage?: string;
  };
  metaMarkup?: string;
}
