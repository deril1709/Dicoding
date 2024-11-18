import { sum } from "./index.js";
import assert from "node:assert";
import { test } from "node:test";

test("should sum correctly", () => {
  const a = 1;
  const b = 1;

  const actualValue = sum(a, b);

  const expectedValue = 2;
  assert.equal(actualValue, expectedValue);
});
