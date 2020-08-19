import path from "path";
import { createCollection } from "./preprocess";

const __CWD = process.cwd();

export interface Config {
  paths: {
    cwd: string;
    targetDir: string;
    sourceDir: string;
  };
  collections: {
    include: string[];
  };
}

const config: Config = {
  paths: {
    cwd: __CWD,
    targetDir: path.resolve(__CWD, "output"),
    sourceDir: path.resolve("content"),
  },
  collections: {
    include: ["posts", "journal"],
  },
  // pages: {}
};

const collection = createCollection(config, "posts");

console.log(collection);
