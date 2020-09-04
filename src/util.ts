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

/*
 * Files may begin by including some meta information about the item
 * in json.  This needs to be split from the actual markdown before
 * converting to markup.
 */
export interface Meta {
  title: string;
  template: string;
  indexTemplate: string;
}
const defaultMeta: Meta = {
  title: "",
  template: "templates/site.js",
  indexTemplate: "templates/indexTemplate.js",
};
export const getMeta = (
  rawContent: string,
  defaults: Partial<Meta> = {}
): { content: string; meta: Meta } => {
  if (rawContent.trim().startsWith("{")) {
    const contentLineArray = rawContent.split("\n");
    const jsonEndIndex = contentLineArray.indexOf("}");
    const meta = contentLineArray
      .slice(0, jsonEndIndex + 1)
      .join("\n")
      .trim();
    const content = contentLineArray
      .slice(jsonEndIndex + 1)
      .join("\n")
      .trim();

    let metaObject;
    try {
      metaObject = JSON.parse(meta);

      metaObject.template = metaObject.template
        ? `templates/${metaObject.template}.js`
        : defaultMeta.template;

      metaObject.indexTemplate = metaObject.indexTemplate
        ? `templates/${metaObject.indexTemplate}.js`
        : defaultMeta.indexTemplate;
    } catch (e) {
      throw new Error(
        "Error parsing meta data for the following meta: " + metaObject
      );
    }

    return {
      meta: {
        ...defaultMeta,
        ...defaults,
        ...metaObject,
      },
      content: content,
    };
  }

  return {
    content: rawContent,
    meta: {
      ...defaults,
      ...defaultMeta,
    },
  };
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
