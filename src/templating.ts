import path from "path";
import { Config } from "./getConfig";
import { Item } from "./preprocess";

export const applyTemplate = async (
  config: Config,
  markup: string,
  itemToRender: Item
): Promise<string> => {
  const templatesDir = config.paths.templates;
  const { meta } = itemToRender;
  const { siteMeta } = config;

  console.log(itemToRender);

  let finalMarkup = markup;
  if (templatesDir) {
    const { default: templateFunction } = await import(
      path.resolve(config.paths.cwd, "templates/site.js")
    );

    finalMarkup = templateFunction(siteMeta, meta, markup);
  }

  return finalMarkup;
};

export const applyTemplateToIndex = async (
  config: Config,
  markup: string,
  itemToRender: Item
): Promise<string> => {
  const templatesDir = config.paths.templates;
  const { meta } = itemToRender;
  const { siteMeta } = config;

  console.log(itemToRender);

  let finalMarkup = markup;
  if (templatesDir) {
    const { default: templateFunction } = await import(
      path.resolve(config.paths.cwd, "templates/site.js")
    );

    const { default: indexGenerator } = await import(
      path.resolve(config.paths.cwd, "templates/indexPages.js")
    );

    finalMarkup = templateFunction(
      siteMeta,
      meta,
      indexGenerator({
        content: markup,
        itemIndex: itemToRender.itemIndex,
      })
    );
  }

  return finalMarkup;
};
