import { supabase } from "./supabaseClient";

function check({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

// Turns { research_areas: { name } } into a flat area_name field,
// matching what the pages already expect.
const flatten = (rows) =>
  rows.map(({ research_areas, ...rest }) => ({
    ...rest,
    area_name: research_areas?.name ?? null,
  }));

async function count(table) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count;
}

export const api = {
  getResearchAreas: async () =>
    check(await supabase.from("research_areas").select("*").order("id")),

  getResearchers: async () =>
    flatten(
      check(
        await supabase
          .from("researchers")
          .select("*, research_areas(name)")
          .order("id"),
      ),
    ),

  getProjects: async () =>
    flatten(
      check(
        await supabase
          .from("projects")
          .select("*, research_areas(name)")
          .order("year", { ascending: false }),
      ),
    ),

  getPublications: async () =>
    flatten(
      check(
        await supabase
          .from("publications")
          .select("*, research_areas(name)")
          .order("year", { ascending: false }),
      ),
    ),

  getNews: async () =>
    check(
      await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false }),
    ),

  getStats: async () => {
    const [areas, researchers, projects, publications] = await Promise.all([
      count("research_areas"),
      count("researchers"),
      count("projects"),
      count("publications"),
    ]);
    return { areas, researchers, projects, publications };
  },

  submitInquiry: async ({ name, email, affiliation, message }) => {
    const { error } = await supabase
      .from("inquiries")
      .insert({ name, email, affiliation: affiliation || "", message });
    if (error) throw new Error(error.message);
  },
};
