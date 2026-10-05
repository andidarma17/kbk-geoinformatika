import { workTypes } from "./workTypes";
import { supabase } from "./supabaseClient";

function check({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

// Turns { research_areas: { name } } into a flat area_name field,
// matching what the pages already expect.
const flatten = (rows) =>
  rows.map(({ research_areas, epistemologies, ...rest }) => ({
    ...rest,
    area_name: research_areas?.name ?? null,
    epistemology_name: epistemologies?.name ?? null,
  }));

async function count(table) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count;
}

export const api = {
  getEpistemologies: async () =>
    check(await supabase.from("epistemologies").select("*").order("name")),

  getWorks: async (kind) => {
    const config = workTypes[kind];
    return flatten(check(await supabase.from(config.table)
      .select("*, research_areas(name), epistemologies(name)")
      .order("year", { ascending: false })));
  },

  getWork: async (kind, id) => {
    const config = workTypes[kind];
    const row = check(await supabase.from(config.table)
      .select(`*, research_areas(name, slug), epistemologies(name), ${config.junction}(researchers(id, name, role))`)
      .eq("id", id).maybeSingle());
    if (!row) return null;
    return {
      ...flatten([row])[0],
      area_slug: row.research_areas?.slug,
      researchers: row[config.junction].map((link) => link.researchers).filter(Boolean),
    };
  },

  getResearchAreas: async () =>
    check(await supabase.from("research_areas").select("*").order("id")),

  // All researchers (used by Home, People, and the admin lists)
  getResearchers: async () =>
    flatten(
      check(
        await supabase
          .from("researchers")
          .select("*, research_areas(name), epistemologies(name)")
          .order("id"),
      ),
    ),

  // One researcher with their projects and publications (used by the profile page)
  getResearcher: async (id) => {
    const row = check(
      await supabase
        .from("researchers")
        .select(
          `*, research_areas(name, slug), epistemologies(name),
           project_researchers(projects(*, research_areas(name), epistemologies(name))),
           publication_researchers(publications(*, research_areas(name), epistemologies(name))),
           intellectual_property_researchers(intellectual_properties(*, research_areas(name), epistemologies(name))),
           community_service_researchers(community_services(*, research_areas(name), epistemologies(name)))`,
        )
        .eq("id", id)
        .maybeSingle(),
    );
    if (!row) return null;

    const {
      research_areas,
      epistemologies,
      project_researchers,
      publication_researchers,
      intellectual_property_researchers,
      community_service_researchers,
      ...rest
    } = row;
    const byYearDesc = (a, b) => (b.year || 0) - (a.year || 0);

    return {
      ...rest,
      area_name: research_areas?.name ?? null,
      epistemology_name: epistemologies?.name ?? null,
      area_slug: research_areas?.slug ?? null,
      projects: flatten(
        project_researchers.map((x) => x.projects).filter(Boolean),
      ).sort(byYearDesc),
      publications: flatten(
        publication_researchers.map((x) => x.publications).filter(Boolean),
      ).sort(byYearDesc),
      intellectual_properties: flatten(
        intellectual_property_researchers.map((x) => x.intellectual_properties).filter(Boolean),
      ).sort(byYearDesc),
      community_services: flatten(
        community_service_researchers.map((x) => x.community_services).filter(Boolean),
      ).sort(byYearDesc),
    };
  },

  getProjects: async () =>
    flatten(
      check(
        await supabase
          .from("projects")
          .select("*, research_areas(name), epistemologies(name)")
          .order("year", { ascending: false }),
      ),
    ),

  // One project with its linked researchers (used by the project detail page)
  getProject: async (id) => {
    const row = check(
      await supabase
        .from("projects")
        .select(
          `*, research_areas(name, slug), epistemologies(name),
           project_researchers(researchers(id, name, role))`,
        )
        .eq("id", id)
        .maybeSingle(),
    );
    if (!row) return null;
    const { research_areas, epistemologies, project_researchers, ...rest } = row;
    return {
      ...rest,
      area_name: research_areas?.name ?? null,
      epistemology_name: epistemologies?.name ?? null,
      area_slug: research_areas?.slug ?? null,
      researchers: project_researchers
        .map((x) => x.researchers)
        .filter(Boolean),
    };
  },

  getPublications: async () =>
    flatten(
      check(
        await supabase
          .from("publications")
          .select("*, research_areas(name), epistemologies(name)")
          .order("year", { ascending: false }),
      ),
    ),

  // One publication with its linked researchers (used by the publication detail page)
  getPublication: async (id) => {
    const row = check(
      await supabase
        .from("publications")
        .select(
          `*, research_areas(name, slug), epistemologies(name),
           publication_researchers(researchers(id, name, role))`,
        )
        .eq("id", id)
        .maybeSingle(),
    );
    if (!row) return null;
    const { research_areas, epistemologies, publication_researchers, ...rest } = row;
    return {
      ...rest,
      area_name: research_areas?.name ?? null,
      epistemology_name: epistemologies?.name ?? null,
      area_slug: research_areas?.slug ?? null,
      researchers: publication_researchers
        .map((x) => x.researchers)
        .filter(Boolean),
    };
  },

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
