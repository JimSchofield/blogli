import fs from "fs";
import path from "path";
import sh from "shelljs";

import { Config } from "./getConfig";
import { upsertDir } from "./util";

const copyCSSAssets = async (config: Config): Promise<void> => {
  const theme = config.prismjs && config.prismjs.theme;
  if (!theme) {
    return;
  }

  const prismPath = path.dirname(require.resolve("prismjs"));
  const themeCSS = fs.readFileSync(
    `${prismPath}/themes/prism-${theme}.css`,
    "utf8"
  );

  upsertDir(config.paths.targetAssetsDir);
  fs.writeFileSync(
    path.resolve(config.paths.targetAssetsDir, "prism.css"),
    themeCSS
  );
};

const copyStaticAssets = (config: Config): void => {
  const from = config.paths.sourceAssetsDir;
  const to = config.paths.targetAssetsDir;
  console.log(`Copying assets from ${from} to ${to}`);
  upsertDir(to);
  sh.cp("-R", from, to);
};

export const processAssets = async (config: Config): Promise<void> => {
  await copyCSSAssets(config);
  copyStaticAssets(config);
};
