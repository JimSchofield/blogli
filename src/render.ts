import fs from "fs";

import MarkdownIt from "markdown-it";

import { Collection, Item } from "./preprocess";
import { Config } from "./getConfig";
import initPrism from "./initPrism";

const createRenderer = async (config: Config): Promise<MarkdownIt> => {
  const Prism = await initPrism(config);

  function getHighlight(str: string, lang: string): string {
    if (Boolean(config.prismjs) && lang !== "") {
      let formatted = "";
      try {
        formatted = Prism.highlight(str, Prism.languages[lang], lang);
      } catch (e) {
        console.error(`ABORTED: There was an error using Prism to highlight the language '${lang}'
Please make sure this language is included in your Blogli config under 'prismjs.languages'`);
      }
      return formatted;
    }

    // If no formatter or lang
    return "";
  }

  return MarkdownIt({
    html: true,
    linkify: true,
    highlight: getHighlight,
  });
};

const writeFile = (item: Item, markup: string): void => {
  if (!fs.existsSync(item.targetDir)) {
    console.log("Creating target directory: " + item.targetDir);
    fs.mkdirSync(item.targetDir, { recursive: true });
  }
  fs.writeFileSync(item.targetPath, markup, "utf8");
};

export const renderCollection = (
  collection: Collection,
  MD: MarkdownIt
): void => {
  collection.items.forEach((item) => {
    const itemContent = fs.readFileSync(item.sourcePath, "utf8");
    const markup = MD.render(itemContent);

    writeFile(item, markup);
  });
};

export const renderCollections = async (
  config: Config,
  collections: Collection[]
): Promise<void> => {
  const MD = await createRenderer(config);

  collections.forEach((coll) => renderCollection(coll, MD));
};
