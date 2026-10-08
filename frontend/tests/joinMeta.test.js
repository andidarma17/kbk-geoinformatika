import test from "node:test";
import assert from "node:assert/strict";
import { joinMeta } from "../src/utils/joinMeta.js";

test("joins only populated metadata without dangling separators", () => {
  assert.equal(joinMeta("Researcher", "Ontology", 2026), "Researcher · Ontology · 2026");
  assert.equal(joinMeta(null, "Ontology", undefined, ""), "Ontology");
  assert.equal(joinMeta("Researcher", null, ""), "Researcher");
  assert.equal(joinMeta(null, undefined, ""), "");
  assert.equal(joinMeta(0, 2026), "0 · 2026");
});
