import test from "node:test";
import assert from "node:assert/strict";
import { safeUrl } from "../src/utils/safeUrl.js";

test("accepts absolute HTTP and HTTPS URLs, including surrounding whitespace", () => {
  assert.equal(safeUrl("http://example.com/path"), "http://example.com/path");
  assert.equal(safeUrl("  https://example.com/a  "), "https://example.com/a");
});

test("rejects executable, data, empty, relative and malformed URLs", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,hi", "", "  ", "/relative", "garbage", null, undefined, 42]) {
    assert.equal(safeUrl(value), null);
  }
});
