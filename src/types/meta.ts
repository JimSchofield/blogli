import { ItemIndex } from "./items";

export interface Meta {
  title: string;
  template: string;
  indexTemplate: string;
  order: number;
}

export const defaultMeta: Meta = {
  title: "",
  template: "templates/site.js",
  indexTemplate: "templates/indexTemplate.js",
  order: Infinity,
};

export interface SiteMeta {
  assetsDir: string;
  siteTitle: string;
  pagesIndex?: ItemIndex;
}
