export const removeExtension = (filename: string): string => {
  if (!filename.includes(".")) {
    throw new Error("Filename does not have extension: " + filename);
  }
  return filename.split(".").slice(0, -1).join(".");
};
