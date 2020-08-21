import fs from "fs";
import { Config } from "./getConfig";
import { Collection } from "./preprocess";

export const removeExtension = (filename: string): string => {
  if (!filename.includes(".")) {
    throw new Error("Filename does not have extension: " + filename);
  }
  return filename.split(".").slice(0, -1).join(".");
};

export const upsertDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    console.log("Creating target directory: " + dir);
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const splitByToken = (source: string, token: string): string[] => {
  const tokenRegex = new RegExp(`{{\\s(${token})\\s}}`, "g");
  return source.split(tokenRegex);
};

export const replaceByToken = (
  source: string,
  token: string,
  replacement: string
): string => {
  return splitByToken(source, token)
    .map((str) => {
      if (str === token) {
        return replacement;
      } else {
        return str;
      }
    })
    .join("");
};

export const summarize = (config: Config, collections: Collection[]): void => {
  const filesByCollection = collections.map((collection) => {
    return {
      name: collection.name,
      count: collection.items.length,
      location: collection.paths.targetDir,
    };
  });

  filesByCollection.forEach((item) => {
    console.log(
      `Collection "${item.name}" rendered ${item.count} pages to ${item.location}`
    );
  });
};
