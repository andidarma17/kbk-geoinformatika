// Tables with researcher links share these relationship names across public and admin APIs.
export const entityConfig = {
  projects: { table: "projects", junction: "project_researchers", fk: "project_id" },
  publications: { table: "publications", junction: "publication_researchers", fk: "publication_id" },
  intellectual_properties: { table: "intellectual_properties", junction: "intellectual_property_researchers", fk: "intellectual_property_id" },
  community_services: { table: "community_services", junction: "community_service_researchers", fk: "community_service_id" },
};
