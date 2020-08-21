import { removeExtension, splitByToken, replaceByToken } from "../util";

test("Remove extension should only remove last characters after a period", () => {
  expect(removeExtension("filename.test")).toEqual("filename");
  expect(removeExtension("filename.aaa.test")).toEqual("filename.aaa");
  expect(removeExtension("a.b.c.md")).toEqual("a.b.c");
});

test("Remove extension should throw error if filename doesn't have an extension", () => {
  expect(() => removeExtension("filenamewithoutext")).toThrowError(
    "Filename does not have extension: filenamewithoutext"
  );
});

test("Split by token", () => {
  expect(
    splitByToken(
      `<h1>Some random HTML</h1>
{{ content }}
<p>lorem</p>`,
      "content"
    )
  ).toStrictEqual(["<h1>Some random HTML</h1>\n", "content", "\n<p>lorem</p>"]);
});

test("Replace by token", () => {
  expect(
    replaceByToken(
      "<abc>stuff</abc>{{ stuff }}<p>Other Stuff</p>",
      "stuff",
      "dog"
    )
  ).toBe("<abc>stuff</abc>dog<p>Other Stuff</p>");
});
test("Replace by token works with multiple tokens", () => {
  expect(
    replaceByToken(
      "<abc>stuff</abc>{{ stuff }}<p>Other Stuff {{ stuff }}</p>{{ stuff }}",
      "stuff",
      "dog"
    )
  ).toBe("<abc>stuff</abc>dog<p>Other Stuff dog</p>dog");
});
