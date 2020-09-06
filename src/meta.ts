import { Meta, defaultMeta } from "./types/meta";
import { Config } from "./types/config";

/*
 * Files may begin by including some meta information about the item
 * in json.  This needs to be split from the actual markdown before
 * converting to markup.
 */
export const getMeta = (
  config: Config,
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
        ? `${config.paths.templates}/${metaObject.template}.js`
        : defaultMeta.template;

      metaObject.indexTemplate = metaObject.indexTemplate
        ? `${config.paths.templates}/${metaObject.indexTemplate}.js`
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
