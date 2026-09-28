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

  // All researchers (used by Home, People, and the admin lists)
  getResearchers: async () =>
    flatten(
      check(
        await supabase
          .from("researchers")
          .select("*, research_areas(name)")
          .order("id"),
      ),
    ),

  // One researcher with their projects and publications (used by the profile page)
  getResearcher: async (id) => {
    const row = check(
      await supabase
        .from("researchers")
        .select(
          `*, research_areas(name, slug),
           project_researchers(projects(*, research_areas(name))),
           publication_researchers(publications(*, research_areas(name)))`,
        )
        .eq("id", id)
        .maybeSingle(),
    );
    if (!row) return null;

    const {
      research_areas,
      project_researchers,
      publication_researchers,
      ...rest
    } = row;
    const byYearDesc = (a, b) => (b.year || 0) - (a.year || 0);

    return {
      ...rest,
      area_name: research_areas?.name ?? null,
      area_slug: research_areas?.slug ?? null,
      projects: flatten(
        project_researchers.map((x) => x.projects).filter(Boolean),
      ).sort(byYearDesc),
      publications: flatten(
        publication_researchers.map((x) => x.publications).filter(Boolean),
      ).sort(byYearDesc),
    };
  },

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
