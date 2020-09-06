import fs from "fs";

export const upsertDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    console.log("Creating target directory: " + dir);
    fs.mkdirSync(dir, { recursive: true });
  }
};
