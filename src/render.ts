import fs from "fs";
import MarkdownIt from "markdown-it";
import { Collection, Item } from "./preprocess";

const MD = MarkdownIt({
  html: true,
  linkify: true,
  highlight(str: string, lang: string) {
    return "";
  },
});

const writeFile = (item: Item, markup: string): void => {
  if (!fs.existsSync(item.targetDir)) {
    console.log("Creating target directory: " + item.targetDir);
    fs.mkdirSync(item.targetDir, { recursive: true });
  }
  fs.writeFileSync(item.targetPath, markup, "utf8");
};

export const renderCollection = (collection: Collection): void => {
  collection.items.forEach((item) => {
    const itemContent = fs.readFileSync(item.sourcePath, "utf8");
    const markup = MD.render(itemContent);

    writeFile(item, markup);
  });
};

export const renderCollections = (collections: Collection[]): void => {
  collections.forEach(renderCollection);
};
