import { removeExtension } from "../util";

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
