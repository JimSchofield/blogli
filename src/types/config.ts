import { SiteMeta } from "./meta";

export interface Config {
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
}
