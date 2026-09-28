import { supabase } from "../supabaseClient";

// Admin tabs use hyphenated names ("research-areas"); tables use underscores.
const toTable = (resource) => resource.replaceAll("-", "_");
const WITH_AREA = new Set(["researchers", "projects", "publications"]);

const flatten = (rows) =>
  rows.map((row) => {
    if (!("research_areas" in row)) return row;
    const { research_areas, ...rest } = row;
    return { ...rest, area_name: research_areas?.name ?? null };
  });

// Strips display-only fields and normalizes form values for the database.
function clean(data) {
  const { id, area_name, research_areas, created_at, ...rest } = data;
  if (typeof rest.tags === "string") {
    rest.tags = rest.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  for (const key of ["year", "research_area_id"]) {
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

  // Re-checks the current password by signing in again, then updates it.
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
    const select = WITH_AREA.has(table) ? "*, research_areas(name)" : "*";
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order("id", { ascending: false });
    if (error) throw new Error(error.message);
    return flatten(data);
  },

  create: async (resource, data) => {
    const { error } = await supabase
      .from(toTable(resource))
      .insert(clean(data));
    if (error) throw new Error(error.message);
  },

  update: async (resource, id, data) => {
    const { data: rows, error } = await supabase
      .from(toTable(resource))
      .update(clean(data))
      .eq("id", id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!rows.length)
      throw new Error(
        "Update was not allowed. Are you signed in as the admin?",
      );
  },

  remove: async (resource, id) => {
    const { data: rows, error } = await supabase
      .from(toTable(resource))
      .delete()
      .eq("id", id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!rows.length)
      throw new Error(
        "Delete was not allowed. Are you signed in as the admin?",
      );
  },
};
