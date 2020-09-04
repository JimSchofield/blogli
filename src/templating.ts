import fs from "fs";
import path from "path";
import defaultSiteTemplate from "./defaultTemplates/site";
import defaultIndexTemplate from "./defaultTemplates/indexTemplate";
import { Config } from "./getConfig";
import { Item, ItemIndex } from "./preprocess";
import { Meta } from "./util";

const getTemplateFunction = async (
  config: Config,
  meta: Meta
): Promise<(siteMeta: any, meta: Meta, content: string) => string> => {
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
  itemToRender: Item
): Promise<string> => {
  const templatesDir = config.paths.templates;
  const { meta } = itemToRender;
  const { siteMeta } = config;

  // if there are no templates we simply return markup at this point
  let finalMarkup = markup;
  if (templatesDir) {
    const templateFunction = await getTemplateFunction(config, meta);

    // decide if index page, and get index template
    let indexTemplate;
    if (itemToRender.itemIndex.length > 0) {
      indexTemplate = await getIndexTemplate(config, meta);
    }

    finalMarkup = templateFunction(
      siteMeta,
      meta,
      // We need to apply the collection rendering to markup if it is a collection
      indexTemplate
        ? indexTemplate({ content: markup, itemIndex: itemToRender.itemIndex })
        : markup
    );
  }

  return finalMarkup;
};

// export const applyTemplateToIndex = async (
//   config: Config,
//   markup: string,
//   itemToRender: Item
// ): Promise<string> => {
//   const templatesDir = config.paths.templates;
//   const { meta } = itemToRender;
//   const { siteMeta } = config;

//   let finalMarkup = markup;
//   if (templatesDir) {
//     const { default: templateFunction } = await import(
//       path.resolve(config.paths.cwd, "templates/site.js")
//     );

//     const { default: indexGenerator } = await import(
//       path.resolve(config.paths.cwd, "templates/indexPages.js")
//     );

//     finalMarkup = templateFunction(
//       siteMeta,
//       meta,
//       indexGenerator({
//         content: markup,
//         itemIndex: itemToRender.itemIndex,
//       })
//     );
//   }

//   return finalMarkup;
// };
