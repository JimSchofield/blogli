import fs from "fs";
import MarkdownIt from "markdown-it";
import path from "path";
import { Config } from "./getConfig";
import initPrism from "./initPrism";
import { Collection, Item } from "./preprocess";
import { upsertDir, replaceByToken } from "./util";

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

export const renderCollection = (
  config: Config,
  collection: Collection,
  MD: MarkdownIt
): void => {
  collection.items.forEach((item) => {
    const itemContent = fs.readFileSync(item.sourcePath, "utf8");
    const markup = MD.render(itemContent);

    let result = markup;

    const templatesDir = config.paths.templates;
    if (templatesDir) {
      const template = "site.html";
      const templateContent = fs.readFileSync(
        path.resolve(templatesDir, template),
        "utf-8"
      );

      result = replaceByToken(templateContent, "content", markup);
    }

    writeFile(item, result);
  });
};

export const renderCollections = async (
  config: Config,
  collections: Collection[]
): Promise<void> => {
  const MD = await createRenderer(config);

  collections.forEach((coll) => renderCollection(config, coll, MD));
};
