import test from "node:test";
import assert from "node:assert/strict";
import { matchesTaxonomy, epistemologiesFor, validateClassification } from "../src/taxonomy.js";

const children = [
  { id: 10, research_area_id: 1, name: "Spatial modelling" },
  { id: 11, research_area_id: 1, name: "Data integration" },
  { id: 20, research_area_id: 2, name: "Image analysis" },
];

test("all ontologies includes existing unclassified records", () => {
  assert.equal(matchesTaxonomy({ research_area_id: null, epistemology_id: null }), true);
  assert.equal(matchesTaxonomy({ research_area_id: 1, epistemology_id: null }, "1"), true);
});

test("filter combines Ontology and Epistemology by ID, including select string values", () => {
  const row = { research_area_id: 1, epistemology_id: 10 };
  assert.equal(matchesTaxonomy(row, "1", "10"), true);
  assert.equal(matchesTaxonomy(row, "2", "10"), false);
  assert.equal(matchesTaxonomy(row, "1", "11"), false);
  assert.equal(matchesTaxonomy({ research_area_id: 1, epistemology_id: null }, "1", "10"), false);
});

test("child options include only the selected parent's Epistemologies", () => {
  assert.deepEqual(epistemologiesFor(children, "1").map((item) => item.id), [10, 11]);
  assert.deepEqual(epistemologiesFor(children, ""), []);
  assert.deepEqual(epistemologiesFor(children, "99"), []);
});

test("admin rejects a mismatched, missing or deleted parent/child assignment", () => {
  for (const form of [
    { research_area_id: 1, epistemology_id: 20 },
    { research_area_id: null, epistemology_id: 10 },
    { research_area_id: 1, epistemology_id: 99 },
  ]) assert.throws(() => validateClassification(form, children), /belonging/);
  assert.doesNotThrow(() => validateClassification({ research_area_id: "1", epistemology_id: "10" }, children));
  assert.doesNotThrow(() => validateClassification({ research_area_id: 1, epistemology_id: "" }, children));
});
