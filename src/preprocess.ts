import fs from "fs";
import path from "path";
import url from "url";

import { removeExtension } from "./util/removeExtension";
import { getMeta } from "./meta";
import { Item, ItemIndex, Collection } from "./types/items";
import { Config } from "./types/config";

const buildItems = (
  config: Config,
  sourceDir: string,
  targetDir: string,
  name: string
): Item[] => {
  const files = fs.readdirSync(sourceDir);

  /*
   * In the future I might want to configure where files are retrieved
   * by different extensions, but for now we're going to stick to `.md`
   */
  const items = files
    .filter((item) => item.includes(".md") && item !== "index.md")
    .map((item) => {
      const slug = removeExtension(item);
      const sourcePath = path.resolve(sourceDir, item);

      // There seemed to be no way around getting item meta and content up front
      // as we need to build collection index pages from the meta (titles)
      const itemContent = fs.readFileSync(sourcePath, "utf8");
      const { content, meta } = getMeta(config, itemContent);

      return {
        filename: item,
        title: meta.title ? meta.title : slug,
        slug,
        sourcePath,
        targetPath: path.resolve(targetDir, slug + ".html"),
        targetDir: path.resolve(targetDir),
        meta: {
          ...meta,
          sitePath: url.resolve(
            config.address,
            `${name === "pages" ? "" : name}/${slug}.html`
          ),
        },
        content,
        itemIndex: [],
      };
    });
  return items;
};

const createIndex = (items: Item[]): ItemIndex => {
  return items.map((item) => ({
    title: item.title,
    url: item.slug + ".html",
    order: item.meta.order !== Infinity ? item.meta.order : Infinity,
  }));
};

const buildIndex = (
  config: Config,
  sourceDir: string,
  targetDir: string,
  name: string,
  items: Item[]
): Item => {
  const item = "index.md";
  const slug = "index";
  const sourcePath = path.resolve(sourceDir, item);
  const title = `${name} Index`;

  const itemContent = fs.existsSync(sourcePath)
    ? fs.readFileSync(sourcePath, "utf8")
    : "";
  const result = getMeta(config, itemContent, { title });
  const content = result.content;
  const meta = result.meta;

  return {
    filename: item,
    title: meta.title,
    slug,
    sourcePath,
    targetPath: path.resolve(targetDir, slug + ".html"),
    targetDir: path.resolve(targetDir),
    meta: {
      ...meta,
      sitePath: url.resolve(
        config.address,
        `${name === "pages" ? "" : name}/${slug}.html`
      ),
    },
    content,
    itemIndex: createIndex(items),
  };
};

export const createCollection = (config: Config, name: string): Collection => {
  const sourceDir = path.resolve(config.paths.sourceDir, name);
  const targetDir = path.resolve(config.paths.targetDir, name);

  const items = buildItems(config, sourceDir, targetDir, name);
  const index = buildIndex(config, sourceDir, targetDir, name, items);

  const collection: Collection = {
    name,
    paths: {
      sourceDir,
      targetDir,
      templates: config.paths.templates,
    },
    items,
    index,
  };

  return collection;
};

export const createPages = (config: Config): Collection => {
  const sourceDir = path.resolve(config.paths.sourceDir);
  const targetDir = path.resolve(config.paths.targetDir);

  const items = buildItems(config, sourceDir, targetDir, "");
  const index = buildIndex(config, sourceDir, targetDir, "pages", items);

  const collection: Collection = {
    name: "pages",
    paths: {
      sourceDir,
      targetDir,
      templates: config.paths.templates,
    },
    items,
    index,
  };

  return collection;
};

export const getCollections = (
  config: Config
): { collections: Collection[]; config: Config } => {
  const collections: Collection[] = config.collections.include.map(
    (collection) => {
      return createCollection(config, collection);
    }
  );

  /*
   * This is a bit awkward, but the index page should probably be
   * part of the page index
   */
  const pages: Collection = createPages(config);
  const pagesIndex: ItemIndex = createIndex(pages.items);
  pagesIndex.push({
    title: pages.index.title,
    url: pages.index.slug + ".html",
    order: pages.index.meta.order !== Infinity ? pages.index.meta.order : 0,
  });
  const newSiteMeta = {
    pagesIndex: pagesIndex.sort((a, b) => a.order - b.order),
  };
  console.log(newSiteMeta);

  const thing = {
    ...config,
    siteMeta: {
      ...config.siteMeta,
      ...newSiteMeta,
    },
  };

  console.log(thing.siteMeta.pagesIndex);

  return {
    collections: [...collections, pages],
    config: {
      ...config,
      siteMeta: {
        ...config.siteMeta,
        ...newSiteMeta,
      },
    },
  };
};
