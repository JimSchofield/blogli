import fs from "fs";
import path from "path";
import { removeExtension } from "./util";
import { Config } from "./getConfig";

export interface Item {
  filename: string;
  slug: string;
  sourcePath: string;
  targetPath: string;
  targetDir: string;
}

export interface Collection {
  name: string;
  paths: {
    targetDir: string;
    sourceDir: string;
    templates?: string;
  };
  items: Item[];
}

const buildItems = (sourceDir: string, targetDir: string): Item[] => {
  const files = fs.readdirSync(sourceDir);

  /*
   * In the future I might want to configure where files are retrieved
   * by different extensions, but for now we're going to stick to `.md`
   */
  const items = files
    .filter((item) => item.includes(".md"))
    .map((item) => {
      const slug = removeExtension(item);

      return {
        filename: item,
        slug,
        sourcePath: path.resolve(sourceDir, item),
        targetPath: path.resolve(targetDir, slug + ".html"),
        targetDir: path.resolve(targetDir),
      };
    });
  return items;
};

export const createCollection = (config: Config, name: string): Collection => {
  const sourceDir = path.resolve(config.paths.sourceDir, name);
  const targetDir = path.resolve(config.paths.targetDir, name);

  const items = buildItems(sourceDir, targetDir);

  const collection: Collection = {
    name,
    paths: {
      sourceDir,
      targetDir,
      templates: config.paths.templates,
    },
    items,
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
