import test from "node:test";
import assert from "node:assert/strict";
import { flatten } from "../src/utils/flatten.js";

test("flatten exposes taxonomy names and preserves record fields", () => {
  const rows = [{ id: 7, title: "Mapping", research_areas: { name: "GIS" }, epistemologies: { name: "Spatial analysis" } }];
  assert.deepEqual(flatten(rows), [{ id: 7, title: "Mapping", area_name: "GIS", epistemology_name: "Spatial analysis" }]);
  assert.equal(rows[0].research_areas.name, "GIS");
});

test("flatten handles absent taxonomy relationships", () => {
  assert.deepEqual(flatten([{ id: 1, research_areas: null }, { id: 2 }]), [
    { id: 1, area_name: null, epistemology_name: null },
    { id: 2, area_name: null, epistemology_name: null },
  ]);
});
