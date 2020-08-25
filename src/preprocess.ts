import fs from "fs";
import path from "path";
import { removeExtension, getMeta } from "./util";
import { Config } from "./getConfig";

export type ItemIndex = Array<{ title: string; url: string }>;

export interface Item {
  filename: string;
  title: string;
  slug: string;
  sourcePath: string;
  targetPath: string;
  targetDir: string;
  meta: unknown;
  content: string;
  itemIndex: ItemIndex;
}

export interface Collection {
  name: string;
  paths: {
    targetDir: string;
    sourceDir: string;
    templates?: string;
  };
  items: Item[];
  index: Item;
}

const buildItems = (sourceDir: string, targetDir: string): Item[] => {
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
      const { content, meta } = getMeta(itemContent);

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
  sourceDir: string,
  targetDir: string,
  name: string,
  items: Item[]
): Item => {
  // I don't know if there's a better way to do this, but many defaults need to be
  // in place if an index file doesn't exist
  const item = "index.md";
  const slug = "index";
  const sourcePath = path.resolve(sourceDir, item);
  let title = `${name} Index`;
  let content;
  let meta;

  if (fs.existsSync(sourcePath)) {
    const itemContent = fs.readFileSync(sourcePath, "utf8");
    const result = getMeta(itemContent);
    content = result.content;
    meta = result.meta;
    title = meta.title;
  } else {
    content = "";
    meta = { title };
  }

  return {
    filename: item,
    title,
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

  const items = buildItems(sourceDir, targetDir);
  const index = buildIndex(sourceDir, targetDir, name, items);

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

export const getCollections = (config: Config): Collection[] => {
  const collections: Collection[] = config.collections.include.map(
    (collection) => {
      return createCollection(config, collection);
    }
  );

  return collections;
};
