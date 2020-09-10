import { getMeta } from "../meta";

test("Gets first json object in string", () => {
  // for now I am ignoring the config param because I don't want to mock it up :D
  // @ts-ignore
  expect(getMeta(null, '{\n "get": "meta"\n}\n # Heading')).toStrictEqual({
    meta: {
      get: "meta",
      indexTemplate: "templates/indexTemplate.js",
      order: Infinity,
      template: "templates/site.js",
      title: "",
    },
    content: "# Heading",
  });
});

test("Gets first json object in string with multiple lines", () => {
  const mockItem = `
{
  "title": "Day 2"
}

# Day 2

## 2020-08-15
====== `;
  // @ts-ignore
  expect(getMeta(null, mockItem)).toStrictEqual({
    meta: {
      title: "Day 2",
      indexTemplate: "templates/indexTemplate.js",
      order: Infinity,
      template: "templates/site.js",
    },
    content: `# Day 2

## 2020-08-15
======`,
  });
});
