import fs from "fs";
import path from "path";
import { Config } from "./types/config";

export default (__CWD: string): Config => {
  const configFile = fs.readFileSync(
    path.resolve(__CWD, "blogli.json"),
    "utf8"
  );

  const initConfig = JSON.parse(configFile);

  const targetDir = path.resolve(__CWD, initConfig.paths.targetDir);

  const config: Config = {
    siteMeta: {
      assetsDir: initConfig.paths.targetAssetsDir
        ? initConfig.paths.targetAssetsDir
        : "assets",
      siteTitle: initConfig.title ? initConfig.title : "My Blogli Site",
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
      include: initConfig.collections.include,
    },
    prismjs: {
      ...initConfig.prismjs,
    },
  };

  return config;
};
