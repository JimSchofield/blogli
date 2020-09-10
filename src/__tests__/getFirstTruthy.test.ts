import { getFirstTruthy } from "../util/getFirstTruthy";

test("Returns first non-falsey item in argument list or else false", () => {
  expect(getFirstTruthy(1, false, false)).toBe(1);
  expect(getFirstTruthy(false, null, "Default")).toBe("Default");

  const someObj = {
    a: {
      nested: "Value",
    },
  };

  // @ts-ignore
  expect(getFirstTruthy(someObj.b, someObj.a.other, someObj.a.nested)).toBe("Value");

  // @ts-ignore
  expect(getFirstTruthy(someObj.b, someObj.a.other)).toBe(false);
});
