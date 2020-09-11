import { Meta } from "./meta";

export type ItemIndex = Array<{
  title: string;
  url: string;
  order: number;
}>;

export interface Item {
  filename: string;
  title: string;
  slug: string;
  sourcePath: string;
  targetPath: string;
  targetDir: string;
  meta: Meta;
  content: string;
  itemIndex: ItemIndex;
  metaMarkup?: string;
}

export interface Collection {
  name: string;
  paths: {
    targetDir: string;
    sourceDir: string;
    templates?: string;
  };
  items: Item[];
  index: Item;
}
