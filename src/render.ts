import MarkdownIt from "markdown-it";

const render = MarkdownIt({
  html: true,
  linkify: true,
  highlight(str: string, lang: string) {
    console.log("Found some code: ", str, lang);
    return "";
  },
});

export default render;
