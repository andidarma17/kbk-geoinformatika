export const sameId = (a, b) => a != null && b != null && String(a) === String(b);

export function matchesTaxonomy(row, ontology = "", epistemology = "") {
  return (!ontology || sameId(row.research_area_id, ontology)) &&
    (!epistemology || sameId(row.epistemology_id, epistemology));
}

export function epistemologiesFor(items, ontology) {
  return ontology ? items.filter((item) => sameId(item.research_area_id, ontology)) : [];
}

export function validateClassification(form, epistemologies) {
  if (form.epistemology_id && !epistemologies.some((item) =>
    sameId(item.id, form.epistemology_id) && sameId(item.research_area_id, form.research_area_id))) {
    throw new Error("Select an Epistemology belonging to the selected Ontology.");
  }
}
