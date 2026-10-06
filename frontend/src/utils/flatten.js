// Keep the public API's taxonomy labels in the shape expected by pages.
export const flatten = (rows) =>
  rows.map(({ research_areas, epistemologies, ...rest }) => ({
    ...rest,
    area_name: research_areas?.name ?? null,
    epistemology_name: epistemologies?.name ?? null,
  }));
