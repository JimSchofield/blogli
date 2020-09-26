import Prism from "prismjs";
import { Config } from "./types/config";

export default async (config: Config): Promise<typeof Prism> => {
  if (
    config.prismjs &&
    config.prismjs.languages &&
    config.prismjs.languages.length > 0
  ) {
    config.prismjs.languages.forEach(async (lang) => {
      await import(`../node_modules/prismjs/components/prism-${lang}`);
    });
  } else {
    throw new Error(
      "No languages provided in blogli.js: prismjs.languages should be an array of language name strings"
    );
  }
  return Prism;
};
