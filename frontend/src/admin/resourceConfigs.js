// Defines the columns (list view) and fields (edit form) for each
// admin-manageable resource. Add a new resource here and it appears
// in the dashboard automatically via ResourceManager.

export const resourceConfigs = {
  "research-areas": {
    label: "Field of Study (Ontology)",
    columns: [
      { key: "name", label: "Name" },
      { key: "slug", label: "Slug" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tags", label: "Tags (comma separated)", type: "text" },
    ],
  },
  epistemologies: {
    label: "Epistemology",
    columns: [{ key: "name", label: "Name" }, { key: "area_name", label: "Ontology" }],
    fields: [
      { key: "research_area_id", label: "Ontology", type: "area-select", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  researchers: {
    label: "Researchers",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "area_name", label: "Ontology" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      {
        key: "education",
        label: "Education (one entry per line)",
        type: "textarea",
      },
      { key: "research_area_id", label: "Ontology", type: "area-select" },
      { key: "epistemology_id", label: "Epistemology", type: "epistemology-select" },
      { key: "interests", label: "Interests", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      { key: "orcid", label: "ORCID", type: "text" },
      { key: "scholar_url", label: "Google Scholar URL", type: "text" },
      { key: "photo_url", label: "Photo URL", type: "text" },
    ],
  },
  projects: {
    label: "Projects",
    columns: [
      { key: "title", label: "Title" },
      { key: "status", label: "Status" },
      { key: "year", label: "Year" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "year", label: "Year", type: "number" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Completed"],
      },
      { key: "research_area_id", label: "Ontology", type: "area-select" },
      { key: "epistemology_id", label: "Epistemology", type: "epistemology-select" },
      { key: "summary", label: "Summary", type: "textarea" },
      {
        key: "description",
        label: "Description (detailed, optional)",
        type: "textarea",
      },
      { key: "study_area", label: "Study Area", type: "text" },
      { key: "methodology", label: "Methodology", type: "text" },
      {
        key: "researcher_ids",
        label: "Researchers",
        type: "researcher-multiselect",
      },
    ],
  },
  publications: {
    label: "Publications",
    columns: [
      { key: "title", label: "Title" },
      { key: "year", label: "Year" },
      { key: "venue", label: "Venue" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "authors", label: "Authors", type: "text" },
      { key: "year", label: "Year", type: "number" },
      { key: "venue", label: "Venue", type: "text" },
      { key: "abstract", label: "Abstract", type: "textarea" },
      { key: "research_area_id", label: "Ontology", type: "area-select" },
      { key: "epistemology_id", label: "Epistemology", type: "epistemology-select" },
      { key: "doi_url", label: "DOI URL", type: "text" },
      { key: "pdf_url", label: "PDF URL", type: "text" },
      {
        key: "researcher_ids",
        label: "Researchers",
        type: "researcher-multiselect",
      },
    ],
  },
  news: {
    label: "News",
    columns: [
      { key: "title", label: "Title" },
      { key: "published_at", label: "Published" },
      { key: "link", label: "Link" },
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "body", label: "Body", type: "textarea" },
      { key: "link", label: "News link (https://...)", type: "text" },
      {
        key: "published_at",
        label: "Published date",
        type: "date",
      },
    ],
  },
  inquiries: {
    label: "Inquiries",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "affiliation", label: "Affiliation" },
      { key: "created_at", label: "Received" },
    ],
    fields: [], // read/delete only — inquiries come from the public form, not created here
  },
};

const classificationFields = [
  { key: "research_area_id", label: "Ontology", type: "area-select" },
  { key: "epistemology_id", label: "Epistemology", type: "epistemology-select" },
];
const workFields = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "year", label: "Year", type: "number" },
  ...classificationFields,
  { key: "summary", label: "Summary", type: "textarea" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "external_url", label: "Reference URL (https://...)", type: "text" },
  { key: "researcher_ids", label: "Researchers", type: "researcher-multiselect" },
];
resourceConfigs["intellectual-property"] = {
  label: "Intellectual Property/Patent",
  columns: [{ key: "title", label: "Title" }, { key: "registration_number", label: "Registration number" }, { key: "year", label: "Year" }],
  fields: [...workFields,
    { key: "ip_type", label: "Type", type: "select", options: ["Patent", "Copyright", "Trademark", "Industrial Design", "Other"] },
    { key: "registration_number", label: "Registration number", type: "text" },
    { key: "holders", label: "Inventors / rights holders", type: "textarea" },
    { key: "status", label: "Status", type: "select", options: ["Filed", "Pending", "Granted", "Registered", "Expired"] },
  ],
};
resourceConfigs["community-services"] = {
  label: "Community Services",
  columns: [{ key: "title", label: "Title" }, { key: "location", label: "Location" }, { key: "year", label: "Year" }],
  fields: [...workFields,
    { key: "partners", label: "Partners / beneficiaries", type: "textarea" },
    { key: "location", label: "Location", type: "text" },
    { key: "status", label: "Status", type: "select", options: ["Planned", "Active", "Completed"] },
  ],
};
