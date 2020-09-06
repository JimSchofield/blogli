import fs from "fs";
import path from "path";
import { removeExtension } from "./util/removeExtension";
import { getMeta } from "./meta";
import { Item, ItemIndex, Collection } from "./types/items";
import { Config } from "./types/config";

const buildItems = (
  config: Config,
  sourceDir: string,
  targetDir: string
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
        meta,
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
    meta,
    content,
    itemIndex: createIndex(items),
  };
};

export const createCollection = (config: Config, name: string): Collection => {
  const sourceDir = path.resolve(config.paths.sourceDir, name);
  const targetDir = path.resolve(config.paths.targetDir, name);

  const items = buildItems(config, sourceDir, targetDir);
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

  const items = buildItems(config, sourceDir, targetDir);
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

export const getCollections = (config: Config): Collection[] => {
  const collections: Collection[] = config.collections.include.map(
    (collection) => {
      return createCollection(config, collection);
    }
  );

  const pages: Collection = createPages(config);

  return [...collections, pages];
};
