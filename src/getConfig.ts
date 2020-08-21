import fs from "fs";
import path from "path";

export interface Config {
  paths: {
    cwd: string;
    targetDir: string;
    sourceDir: string;
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

  const config: Config = {
    paths: {
      cwd: __CWD,
      targetDir,
      sourceDir: path.resolve(__CWD, initConfig.paths.sourceDir),
      // templates are optional
      ...(initConfig.paths.templates
        ? { templates: path.resolve(__CWD, initConfig.paths.templates) }
        : {}),
      targetAssetsDir: initConfig.targetAssetsDir
        ? path.resolve(targetDir, initConfig.targetAssetsDir)
        : path.resolve(targetDir, "assets"),
    },
    collections: { ...initConfig.collections },
    prismjs: {
      ...initConfig.prismjs,
    },
  };

  return config;
};
