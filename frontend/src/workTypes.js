import { entityConfig } from "./entityConfig";

export const workTypes = {
  "intellectual-property": {
    ...entityConfig.intellectual_properties,
    title: "Intellectual Property/Patent",
    description: "Intellectual property and patents from the group, organized by Ontology and Epistemology.",
    fields: [
      ["ip_type", "Type"], ["registration_number", "Registration number"],
      ["holders", "Inventors / rights holders"], ["status", "Status"], ["year", "Year"],
    ],
  },
  "community-services": {
    ...entityConfig.community_services,
    title: "Community Services",
    description: "Community engagement and services applying geoinformatics to shared needs.",
    fields: [["partners", "Partners / beneficiaries"], ["location", "Location"], ["status", "Status"], ["year", "Year"]],
  },
};
