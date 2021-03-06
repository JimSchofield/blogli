import fs from "fs";
import path from "path";
import sh from "shelljs";

import { upsertDir } from "./util/upsertDir";
import { Config } from "./types/config";

const copyCSSAssets = async (config: Config): Promise<void> => {
  const theme =
    config.prismjs && config.prismjs.theme ? `-${config.prismjs.theme}` : "";

  const prismPath = path.dirname(require.resolve("prismjs"));
  const themeCSS = fs.readFileSync(
    `${prismPath}/themes/prism${theme}.css`,
    "utf8"
  );

  upsertDir(config.paths.targetAssetsDir);
  fs.writeFileSync(
    path.resolve(config.paths.targetAssetsDir, "prism.css"),
    themeCSS
  );
};

const copyStaticAssets = (config: Config): void => {
  // for some reason without globbing this was not copying as intended
  const glob = config.paths.sourceAssetsDir.slice(-1) === "/" ? "*" : "/*";
  const from = config.paths.sourceAssetsDir + glob;
  const to = config.paths.targetAssetsDir;
  console.log(`Copying assets from ${from} to ${to}`);
  upsertDir(to);
  // R = recursive
  // u = only copy if source is newer
  sh.cp("-Ru", from, to);
};

export const processAssets = async (config: Config): Promise<void> => {
  await copyCSSAssets(config);
  copyStaticAssets(config);
};
