import path from "path";
import { Config } from "./getConfig";
import { Item, Index } from "./preprocess";

export const applyTemplate = async (
  config: Config,
  markup: string,
  itemToRender: Item
): Promise<string> => {
  const templatesDir = config.paths.templates;

  let markupAfterTemplates = markup;

  if (templatesDir) {
    const { default: templateFunction } = await import(
      path.resolve(config.paths.cwd, "templates/site.js")
    );

    markupAfterTemplates = templateFunction(config.templateMeta)({
      content: markup,
      meta: itemToRender,
    });
  }

  return markupAfterTemplates;
};

export const applyTemplateToIndex = async (
  config: Config,
  markup: string,
  itemToRender: Index
): Promise<string> => {
  const templatesDir = config.paths.templates;

  let markupAfterTemplates = markup;

  if (templatesDir) {
    const { default: templateFunction } = await import(
      path.resolve(config.paths.cwd, "templates/site.js")
    );

    const { default: indexGenerator } = await import(
      path.resolve(config.paths.cwd, "templates/indexPages.js")
    );

    markupAfterTemplates = templateFunction(config.templateMeta)({
      content: indexGenerator({
        content: markup,
        itemIndex: itemToRender.itemIndex,
      }),
      meta: itemToRender.meta,
    });
  }

  return markupAfterTemplates;
};
