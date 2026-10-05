export const workTypes = {
  "intellectual-property": {
    title: "Intellectual Property/Patent",
    table: "intellectual_properties",
    junction: "intellectual_property_researchers",
    foreignKey: "intellectual_property_id",
    description: "Intellectual property and patents from the group, organized by Ontology and Epistemology.",
    fields: [
      ["ip_type", "Type"], ["registration_number", "Registration number"],
      ["holders", "Inventors / rights holders"], ["status", "Status"], ["year", "Year"],
    ],
  },
  "community-services": {
    title: "Community Services",
    table: "community_services",
    junction: "community_service_researchers",
    foreignKey: "community_service_id",
    description: "Community engagement and services applying geoinformatics to shared needs.",
    fields: [["partners", "Partners / beneficiaries"], ["location", "Location"], ["status", "Status"], ["year", "Year"]],
  },
};
