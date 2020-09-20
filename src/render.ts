import fs from "fs";
import MarkdownIt from "markdown-it";
import { Config } from "./types/config";
import initPrism from "./initPrism";
import { applyTemplate } from "./templating";
import { upsertDir } from "./util/upsertDir";
import { Item, Collection } from "./types/items";
import { applyShortcodes } from "./shortcodes";

const createRenderer = async (config: Config): Promise<MarkdownIt> => {
  const Prism = config.prismjs ? await initPrism(config) : undefined;

  function getHighlight(str: string, lang: string): string {
    const wrapStr = (s: string) => {
      const langStr = lang ? lang : "";
      return `<pre class="language-${langStr}"><code class="language-${langStr}">${s}</code></pre>`;
    };

    if (Prism && lang !== "") {
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

const renderItem = async (
  config: Config,
  MD: MarkdownIt,
  item: Item,
  collection: Collection
) => {
  const markup = MD.render(item.content);
  const intermediateMarkup = applyShortcodes(config, markup);
  const result = await applyTemplate(
    config,
    intermediateMarkup,
    item,
    collection
  );
  return result;
};

export const renderCollection = async (
  config: Config,
  collection: Collection,
  MD: MarkdownIt
): Promise<void> => {
  // Render collections
  collection.items.forEach(async (item) => {
    const result = await renderItem(config, MD, item, collection);

    writeFile(item, result);
  });

  // render index page
  const result = await renderItem(config, MD, collection.index, collection);
  writeFile(collection.index, result);
};

export const renderCollections = async (
  config: Config,
  collections: Collection[]
): Promise<void> => {
  const MD = await createRenderer(config);

  collections.forEach((coll) => renderCollection(config, coll, MD));
};
