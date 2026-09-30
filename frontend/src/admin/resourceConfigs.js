// Defines the columns (list view) and fields (edit form) for each
// admin-manageable resource. Add a new resource here and it appears
// in the dashboard automatically via ResourceManager.

export const resourceConfigs = {
  "research-areas": {
    label: "Research Areas",
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
  researchers: {
    label: "Researchers",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "area_name", label: "Area" },
    ],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      {
        key: "education",
        label: "Education (one entry per line)",
        type: "textarea",
      },
      { key: "research_area_id", label: "Research Area", type: "area-select" },
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
      { key: "research_area_id", label: "Research Area", type: "area-select" },
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
      { key: "research_area_id", label: "Research Area", type: "area-select" },
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
        label: "Published date (YYYY-MM-DD)",
        type: "text",
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
