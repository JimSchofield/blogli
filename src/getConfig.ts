import fs from "fs";
import path from "path";

export interface Config {
  paths: {
    cwd: string;
    targetDir: string;
    sourceDir: string;
    templates?: string;
  };
  collections: {
    include: string[];
  };
}

export default (__CWD: string): Config => {
  const configFile = fs.readFileSync(
    path.resolve(__CWD, "blogli.json"),
    "utf8"
  );

  const initConfig = JSON.parse(configFile);

  const config: Config = {
    paths: {
      cwd: __CWD,
      targetDir: path.resolve(__CWD, initConfig.paths.targetDir),
      sourceDir: path.resolve(__CWD, initConfig.paths.sourceDir),
      // templates are optional
      ...(initConfig.paths.templates
        ? { templates: path.resolve(__CWD, initConfig.paths.templates) }
        : {}),
    },
    collections: { ...initConfig.collections },
  };

  return config;
};
