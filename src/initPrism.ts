import Prism from "prismjs";
import { Config } from "./getConfig";

export default async (config: Config): Promise<typeof Prism> => {
  if (config.prismjs) {
    config.prismjs.languages.forEach(async (lang) => {
      await import(`../node_modules/prismjs/components/prism-${lang}`);
    });
  }
  return Prism;
};
