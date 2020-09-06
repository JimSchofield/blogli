import { Config } from "../types/config";
import { Collection } from "../types/items";

export const summarize = (_config: Config, collections: Collection[]): void => {
  const filesByCollection = collections.map((collection) => {
    return {
      name: collection.name,
      count: collection.items.length,
      location: collection.paths.targetDir,
    };
  });

  filesByCollection.forEach((item) => {
    console.log(
      `Collection "${item.name}" rendered ${item.count} pages to ${item.location}`
    );
  });
};
