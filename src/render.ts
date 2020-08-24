import fs from "fs";
import MarkdownIt from "markdown-it";
import { Config } from "./getConfig";
import initPrism from "./initPrism";
import { Collection, Item, Index } from "./preprocess";
import { upsertDir } from "./util";
import { applyTemplate, applyTemplateToIndex } from "./templating";

const createRenderer = async (config: Config): Promise<MarkdownIt> => {
  const Prism = await initPrism(config);

  function getHighlight(str: string, lang: string): string {
    const wrapStr = (s: string) => {
      const langStr = lang ? lang : "";
      return `<pre class="language-${langStr}"><code class="language-${langStr}">${s}</code></pre>`;
    };

    if (Boolean(config.prismjs) && lang !== "") {
      let formatted = "";
      try {
        formatted = Prism.highlight(str, Prism.languages[lang], lang);
      } catch (e) {
        console.error(`ABORTED: There was an error using Prism to highlight the language '${lang}'
                      Please make sure this language is included in your Blogli config under 'prismjs.languages'`);
      }
      return wrapStr(formatted);
    }

    // If no formatter or lang
    return wrapStr(str);
  }

  return MarkdownIt({
    html: true,
    linkify: true,
    highlight: getHighlight,
  });
};

const writeFile = (item: Item, markup: string): void => {
  upsertDir(item.targetDir);
  fs.writeFileSync(item.targetPath, markup, "utf8");
};

const renderItem = async (config: Config, MD: MarkdownIt, item: Item) => {
  const markup = MD.render(item.content);
  const result = await applyTemplate(config, markup, item);
  return result;
};

const renderIndex = async (config: Config, MD: MarkdownIt, item: Index) => {
  const markup = MD.render(item.content);
  const result = await applyTemplateToIndex(config, markup, item);
  return result;
};

export const renderCollection = async (
  config: Config,
  collection: Collection,
  MD: MarkdownIt
): Promise<void> => {
  // Render collections
  collection.items.forEach(async (item) => {
    const result = await renderItem(config, MD, item);
    writeFile(item, result);
  });

  // render index page
  const result = await renderIndex(config, MD, collection.index);
  writeFile(collection.index, result);
};

export const renderCollections = async (
  config: Config,
  collections: Collection[]
): Promise<void> => {
  const MD = await createRenderer(config);

  collections.forEach((coll) => renderCollection(config, coll, MD));
};
