import { Config } from "./types/config";
import { ShortCode } from "./types/shortcode";

const applyShortCode = (shortCode: ShortCode, markup: string): string => {
  const matchRegEx = shortCode.match;

  if (!(matchRegEx instanceof RegExp)) {
    throw new Error("Short code issue with matcher: not a regex");
  }

  const splitMarkup = markup.split(matchRegEx);

  const resultArray = splitMarkup.map((el) => {
    if (matchRegEx.test(el)) {
      return shortCode.resolve(el);
    }
    return el;
  });

  return resultArray.join("");
};

export const applyShortcodes = (config: Config, markup: string): string => {
  if (config.shortCodes.length < 1) {
    return markup;
  }

  return config.shortCodes.reduce((previousMarkup, currentShortCode) => {
    return applyShortCode(currentShortCode, previousMarkup);
  }, markup);
};
