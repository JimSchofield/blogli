import { SiteMeta } from "./meta";
import { ShortCode } from "./shortcode";

export interface Config {
  address: string;
  siteMeta: SiteMeta;
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
  shortCodes: ShortCode[];
}
