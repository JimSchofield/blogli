import fs from "fs";
import path from "path";
import { Config } from "./types/config";
import { ShortCode } from "./types/shortcode";

const importShortCodes = async (
  __CWD: string,
  names: string[]
): Promise<ShortCode[]> => {
  const shortCodesArray = await Promise.all(
    names.map(
      async (name): Promise<ShortCode> => {
        const res = await import(path.resolve(__CWD, `shortcodes/${name}.js`));
        return await res.default;
      }
    )
  );

  // @ts-ignore
  return await shortCodesArray.flat();
};

export default async (__CWD: string): Promise<Config> => {
  const configFile = fs.readFileSync(
    path.resolve(__CWD, "blogli.json"),
    "utf8"
  );

  const initConfig = JSON.parse(configFile);

  const targetDir = path.resolve(__CWD, initConfig.paths.targetDir);

  const config: Config = {
    address: initConfig.address ? initConfig.address : "/",
    siteMeta: {
      assetsDir: initConfig.paths.targetAssetsDir
        ? initConfig.paths.targetAssetsDir
        : "assets",
      siteTitle: initConfig.title ? initConfig.title : "My Blogli Site",
      ...{ seo: initConfig.seo },
    },
    paths: {
      cwd: __CWD,
      targetDir,
      sourceDir: path.resolve(__CWD, initConfig.paths.sourceDir),
      // templates are optional
      templates: initConfig.paths.templates
        ? path.resolve(__CWD, initConfig.paths.templates)
        : path.resolve(__CWD, "templates"),
      sourceAssetsDir: initConfig.paths.sourceAssetsDir
        ? path.resolve(__CWD, initConfig.paths.sourceAssetsDir)
        : path.resolve("assets"),
      targetAssetsDir: initConfig.paths.targetAssetsDir
        ? path.resolve(targetDir, initConfig.paths.targetAssetsDir)
        : path.resolve(targetDir, "assets"),
    },
    collections: {
      include:
        initConfig.collections && initConfig.collections.include
          ? initConfig.collections.include
          : [],
    },
    prismjs: initConfig.prismjs ? initConfig.prismjs : undefined,
    shortCodes: Array.isArray(initConfig.shortcodes)
      ? await importShortCodes(__CWD, initConfig.shortcodes)
      : [],
  };

  return config;
};
