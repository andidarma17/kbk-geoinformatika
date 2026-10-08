import { workTypes } from "./workTypes";
import { supabase } from "./supabaseClient";
import { entityConfig } from "./entityConfig";
import { flatten } from "./utils/flatten";

function check({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

async function getEntities(config, { limit, researchAreaId } = {}) {
  let query = supabase.from(config.table)
    .select("*, research_areas(name), epistemologies(name)")
    .order("year", { ascending: false, nullsFirst: false });
  if (researchAreaId != null) query = query.eq("research_area_id", researchAreaId);
  if (limit != null) query = query.limit(limit);
  return flatten(check(await query));
}

async function getEntity(config, id, { retainJunction = false } = {}) {
  const row = check(await supabase.from(config.table)
    .select(`*, research_areas(name, slug), epistemologies(name), ${config.junction}(researchers(id, name, role))`)
    .eq("id", id).maybeSingle());
  if (!row) return null;
  const { [config.junction]: links, research_areas, epistemologies, ...rest } = row;
  return {
    ...rest,
    ...(retainJunction ? { [config.junction]: links } : {}),
    area_name: research_areas?.name ?? null,
    epistemology_name: epistemologies?.name ?? null,
    area_slug: retainJunction ? research_areas?.slug : research_areas?.slug ?? null,
    researchers: links.map((link) => link.researchers).filter(Boolean),
  };
}

async function count(table, applyFilter = (query) => query) {
  const query = supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  const { count, error } = await applyFilter(query);
  if (error) throw new Error(error.message);
  return count;
}

export const api = {
  getEpistemologies: async ({ researchAreaId } = {}) => {
    let query = supabase.from("epistemologies").select("*").order("name");
    if (researchAreaId != null) query = query.eq("research_area_id", researchAreaId);
    return check(await query);
  },

  getWorks: async (kind, { limit, researchAreaId } = {}) => {
    const cfg = workTypes[kind];
    if (!cfg) throw new Error(`Unknown work type: ${kind}`);
    return getEntities(cfg, { limit, researchAreaId });
  },

  getWork: async (kind, id) => {
    const cfg = workTypes[kind];
    if (!cfg) throw new Error(`Unknown work type: ${kind}`);
    return getEntity(cfg, id, { retainJunction: true });
  },

  getResearchAreas: async () =>
    check(await supabase.from("research_areas").select("*").order("id")),

  getResearchAreaBySlug: async (slug) =>
    check(await supabase.from("research_areas").select("*").eq("slug", slug).maybeSingle()),

  getResearchers: async ({ limit, researchAreaId } = {}) => {
    let query = supabase.from("researchers")
      .select("*, research_areas(name), epistemologies(name)")
      .order("id");
    if (researchAreaId != null) query = query.eq("research_area_id", researchAreaId);
    if (limit != null) query = query.limit(limit);
    return flatten(check(await query));
  },

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

  getProjects: (options = {}) => getEntities(entityConfig.projects, options),

  // One project with its linked researchers (used by the project detail page)
  getProject: (id) => getEntity(entityConfig.projects, id),

  getPublications: (options = {}) => getEntities(entityConfig.publications, options),

  // One publication with its linked researchers (used by the publication detail page)
  getPublication: (id) => getEntity(entityConfig.publications, id),

  getNews: async ({ limit } = {}) => {
    let query = supabase.from("news").select("*")
      .order("published_at", { ascending: false });
    if (limit != null) query = query.limit(limit);
    return check(await query);
  },

  getStats: async () => {
    const [areas, researchers, projects, publications] = await Promise.all([
      count("research_areas"),
      count("researchers"),
      count("projects", (query) => query.eq("status", "Active")),
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
