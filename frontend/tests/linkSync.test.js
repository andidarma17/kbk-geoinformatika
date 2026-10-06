import test from "node:test";
import assert from "node:assert/strict";
import { createWithLinks, syncLinks } from "../src/admin/linkSync.js";

const link = { junction: "project_researchers", fk: "project_id" };

function fakeClient({ failLinkInsert = false } = {}) {
  const state = { links: new Set([1, 2]), recordExists: false, operations: [] };
  const client = {
    from(table) {
      if (table === link.junction) return {
        select: () => ({ eq: async () => {
          state.operations.push("read links");
          return { data: [...state.links].map((researcher_id) => ({ researcher_id })), error: null };
        } }),
        insert: async (rows) => {
          state.operations.push("insert links");
          if (failLinkInsert) return { error: { message: "link insert failed" } };
          rows.forEach((row) => state.links.add(row.researcher_id));
          return { error: null };
        },
        delete: () => ({ eq: () => ({ in: async (_field, ids) => {
          state.operations.push("delete links");
          ids.forEach((id) => state.links.delete(id));
          return { error: null };
        } }) }),
      };
      if (table === "projects") return {
        insert: () => {
          state.operations.push("create record");
          state.recordExists = true;
          return { select: () => ({ single: async () => ({ data: { id: 10 }, error: null }) }) };
        },
        delete: () => ({ eq: async () => {
          state.operations.push("rollback record");
          state.recordExists = false;
          return { error: null };
        } }),
      };
      throw new Error(`Unexpected table: ${table}`);
    },
  };
  return { client, state };
}

test("failed link insert preserves existing links", async () => {
  const { client, state } = fakeClient({ failLinkInsert: true });
  await assert.rejects(syncLinks(client, link, 10, [2, 3]), /link insert failed/);
  assert.deepEqual([...state.links], [1, 2]);
  assert.deepEqual(state.operations, ["read links", "insert links"]);
});

test("successful link sync inserts missing links before removing old ones", async () => {
  const { client, state } = fakeClient();
  await syncLinks(client, link, 10, [2, 3]);
  assert.deepEqual([...state.links].sort(), [2, 3]);
  assert.deepEqual(state.operations, ["read links", "insert links", "delete links"]);
});

test("failed link insert rolls back a newly created record", async () => {
  const { client, state } = fakeClient({ failLinkInsert: true });
  await assert.rejects(createWithLinks(client, "projects", { title: "Test" }, link, [3]), /link insert failed/);
  assert.equal(state.recordExists, false);
  assert.deepEqual(state.operations, ["create record", "read links", "insert links", "rollback record"]);
});
