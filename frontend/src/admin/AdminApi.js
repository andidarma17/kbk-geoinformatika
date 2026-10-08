import { supabase } from "../supabaseClient";
import { createWithLinks, syncLinks } from "./linkSync";
import { adminWriteError } from "./adminWriteError";
import { entityConfig } from "../entityConfig";

// Admin tabs use hyphenated names ("research-areas"); tables use underscores.
const toTable = (resource) => resource === "intellectual-property" ? "intellectual_properties" : resource.replaceAll("-", "_");

const WITH_AREA = new Set(["researchers", "projects", "publications", "intellectual_properties", "community_services", "epistemologies"]);

function selectFor(table) {
  if (!WITH_AREA.has(table)) return "*";
  if (table === "epistemologies") return "*, research_areas(name)";
  const link = entityConfig[table];
  return link
    ? `*, research_areas(name), epistemologies(name), ${link.junction}(researcher_id)`
    : "*, research_areas(name), epistemologies(name)";
}

// Turns embedded rows into the flat fields the admin forms use.
function flatten(table, rows) {
  const link = entityConfig[table];
  return rows.map((row) => {
    const out = { ...row };
    if ("research_areas" in out) {
      out.area_name = out.research_areas?.name ?? null;
      delete out.research_areas;
    }
    if ("epistemologies" in out) {
      out.epistemology_name = out.epistemologies?.name ?? null;
      delete out.epistemologies;
    }
    if (link && link.junction in out) {
      out.researcher_ids = out[link.junction].map((j) => j.researcher_id);
      delete out[link.junction];
    }
    return out;
  });
}

// Strips display-only fields and normalizes form values for the database.
function clean(data) {
  const { id, area_name, research_areas, epistemology_name, epistemologies, created_at, researcher_ids, ...rest } =
    data;
  if (typeof rest.tags === "string") {
    rest.tags = rest.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  for (const key of ["year", "research_area_id", "epistemology_id"]) {
    if (key in rest) {
      rest[key] =
        rest[key] === "" || rest[key] == null ? null : Number(rest[key]);
    }
  }
  if ("published_at" in rest && !rest.published_at) delete rest.published_at;
  return rest;
}

export const adminApi = {
  login: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error("Incorrect email or password");
  },

  logout: () => supabase.auth.signOut(),

  getSession: async () => (await supabase.auth.getSession()).data.session,

  onAuthChange: (callback) => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      callback(session),
    );
    return () => data.subscription.unsubscribe();
  },

  changePassword: async (currentPassword, newPassword) => {
    if (newPassword.length < 8)
      throw new Error("New password must be at least 8 characters");
    const { data } = await supabase.auth.getUser();
    const email = data?.user?.email;
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (verifyError) throw new Error("Current password is incorrect");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  },

  list: async (resource) => {
    const table = toTable(resource);
    const { data, error } = await supabase
      .from(table)
      .select(selectFor(table))
      .order("id", { ascending: false });
    if (error) throw new Error(error.message);
    return flatten(table, data);
  },

  create: async (resource, data) => {
    const table = toTable(resource);
    await createWithLinks(supabase, table, clean(data), entityConfig[table], data.researcher_ids);
  },

  update: async (resource, id, data) => {
    const table = toTable(resource);
    const { data: rows, error } = await supabase
      .from(table)
      .update(clean(data))
      .eq("id", id)
      .select("id");
    if (error) throw adminWriteError(error);
    if (!rows.length)
      throw new Error(
        "Update was not allowed. Are you signed in as the admin?",
      );
    await syncLinks(supabase, entityConfig[table], id, data.researcher_ids);
  },

  remove: async (resource, id) => {
    const { data: rows, error } = await supabase
      .from(toTable(resource))
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throw adminWriteError(error);
    if (!rows.length)
      throw new Error(
        "Delete was not allowed. Are you signed in as the admin?",
      );
  },
};
