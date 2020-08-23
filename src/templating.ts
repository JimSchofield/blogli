import path from "path";
import { Config } from "./getConfig";
import { Item } from "./preprocess";

export const applyTemplate = async (
  config: Config,
  item: Item,
  markup: string,
  meta: Record<string, string>
): Promise<string> => {
  const templatesDir = config.paths.templates;

  let markupAfterTemplates = markup;

  if (templatesDir) {
    const { default: templateFunction } = await import(
      path.resolve(config.paths.cwd, "templates/site.js")
    );

    console.log(config);
    markupAfterTemplates = templateFunction(config.templateMeta)({
      content: markup,
      meta,
    });
  }

  return markupAfterTemplates;
};
