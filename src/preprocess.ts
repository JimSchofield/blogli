import fs from "fs";
import path from "path";
import { Config } from ".";
import { removeExtension } from "./util";

interface Item {
  filename: string;
  slug: string;
  sourcePath: string;
  targetPath: string;
}

interface Collection {
  name: string;
  paths: {
    targetDir: string;
    sourceDir: string;
  };
  items: Item[];
}

const buildItems = (sourceDir: string, targetDir: string): Item[] => {
  const files = fs.readdirSync(sourceDir);

  const items = files.map((item) => {
    const slug = removeExtension(item);

    return {
      filename: item,
      slug,
      sourcePath: path.resolve(sourceDir, item),
      targetPath: path.resolve(targetDir, slug + ".html"),
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
    },
    items,
  };

  return collection;
};
