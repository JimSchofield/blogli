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
