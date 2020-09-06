export const splitByToken = (source: string, token: string): string[] => {
  const tokenRegex = new RegExp(`{{\\s(${token})\\s}}`, "g");
  return source.split(tokenRegex);
};

export const replaceByToken = (
  source: string,
  token: string,
  replacement: string
): string => {
  return splitByToken(source, token)
    .map((str) => {
      if (str === token) {
        return replacement;
      } else {
        return str;
      }
    })
    .join("");
};
