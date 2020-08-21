import fs from "fs";

export const removeExtension = (filename: string): string => {
  if (!filename.includes(".")) {
    throw new Error("Filename does not have extension: " + filename);
  }
  return filename.split(".").slice(0, -1).join(".");
};

export const upsertDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    console.log("Creating target directory: " + dir);
    fs.mkdirSync(dir, { recursive: true });
  }
};
