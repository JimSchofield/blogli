import fs from "fs";
import path from "path";
import defaultSiteTemplate from "./defaultTemplates/site";
import defaultIndexTemplate from "./defaultTemplates/indexTemplate";
import { Config } from "./types/config";
import { Meta } from "./types/meta";
import { ItemIndex, Item, Collection } from "./types/items";
import { getMetaMarkup } from "./defaultTemplates/metaMarkup";

const getTemplateFunction = async (
  config: Config,
  meta: Meta
): Promise<(config: Config, itemToRender: Item, content: string) => string> => {
  if (fs.existsSync(meta.template)) {
    // if a user default site template is defined in the project
    const imported = await import(
      path.resolve(config.paths.cwd, meta.template)
    );
    return await imported.default;
  } else {
    // default template loading
    return defaultSiteTemplate;
  }
};

const getIndexTemplate = async (
  config: Config,
  meta: Meta
): Promise<(data: { content: string; itemIndex: ItemIndex }) => string> => {
  if (fs.existsSync(meta.indexTemplate)) {
    // if template is defined in the content meta
    const imported = await import(
      path.resolve(config.paths.cwd, meta.indexTemplate)
    );
    return await imported.default;
  } else {
    // default template loading
    return defaultIndexTemplate;
  }
};

export const applyTemplate = async (
  config: Config,
  markup: string,
  itemToRender: Item,
  collection: Collection
): Promise<string> => {
  const templatesDir = config.paths.templates;
  const { meta } = itemToRender;

  // if there are no templates we simply return markup at this point
  if (!templatesDir) {
    return markup;
  }

  const templateFunction = await getTemplateFunction(config, meta);

  // decide if index page, and get index template
  let indexTemplate;
  if (itemToRender.itemIndex.length > 0) {
    indexTemplate = await getIndexTemplate(config, meta);
  }

  const metaMarkup = getMetaMarkup(config.siteMeta, meta);

  return templateFunction(
    config,
    { ...itemToRender, metaMarkup },
    // We need to apply the collection rendering to markup if it is a collection
    indexTemplate && collection.name !== "pages"
      ? indexTemplate({ content: markup, itemIndex: itemToRender.itemIndex })
      : markup
  );
};
