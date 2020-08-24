import fs from "fs";
import path from "path";

export interface Config {
  templateMeta: {
    assetsDir: string;
    siteTitle: string;
  };
  paths: {
    cwd: string;
    targetDir: string;
    sourceDir: string;
    sourceAssetsDir: string;
    targetAssetsDir: string;
    templates?: string;
  };
  collections: {
    include: string[];
  };
  prismjs?: {
    languages: string[];
    theme?: string;
  };
}

export default (__CWD: string): Config => {
  const configFile = fs.readFileSync(
    path.resolve(__CWD, "blogli.json"),
    "utf8"
  );

  const initConfig = JSON.parse(configFile);

  const targetDir = path.resolve(__CWD, initConfig.paths.targetDir);

  console.log(initConfig);
  console.log(initConfig.sourceAssetsDir)

  const config: Config = {
    templateMeta: {
      assetsDir: initConfig.paths.targetAssetsDir
        ? initConfig.paths.targetAssetsDir
        : "assets",
      siteTitle: initConfig.title ? initConfig.title : "My Blogli Site!",
    },
    paths: {
      cwd: __CWD,
      targetDir,
      sourceDir: path.resolve(__CWD, initConfig.paths.sourceDir),
      // templates are optional
      ...(initConfig.paths.templates
        ? { templates: path.resolve(__CWD, initConfig.paths.templates) }
        : {}),
      sourceAssetsDir: initConfig.paths.sourceAssetsDir
        ? path.resolve(__CWD, initConfig.paths.sourceAssetsDir)
        : path.resolve("assets"),
      targetAssetsDir: initConfig.paths.targetAssetsDir
        ? path.resolve(targetDir, initConfig.paths.targetAssetsDir)
        : path.resolve(targetDir, "assets"),
    },
    collections: { ...initConfig.collections },
    prismjs: {
      ...initConfig.prismjs,
    },
  };

  return config;
};
