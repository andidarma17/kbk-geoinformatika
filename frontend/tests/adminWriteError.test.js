import test from "node:test";
import assert from "node:assert/strict";
import { adminWriteError } from "../src/admin/adminWriteError.js";

test("foreign-key errors show a useful admin message", () => {
  assert.equal(adminWriteError({ code: "23503", message: "raw database detail" }).message,
    "This item is still used by other records. Remove or reassign those first.");
  assert.equal(adminWriteError({ code: "42501", message: "permission denied" }).message,
    "permission denied");
});
