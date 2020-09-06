export interface Meta {
  title: string;
  template: string;
  indexTemplate: string;
}

export const defaultMeta: Meta = {
  title: "",
  template: "templates/site.js",
  indexTemplate: "templates/indexTemplate.js",
};

export interface SiteMeta {
  assetsDir: string;
  siteTitle: string;
}
