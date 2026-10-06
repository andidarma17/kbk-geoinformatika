# KBK Geoinformatika — Website

Website for KBK Geoinformatika, the geoinformatics research group at
Departemen Teknik Geodesi, Fakultas Teknik, Universitas Gadjah Mada.

The site is a React single-page app that reads its content from
[Supabase](https://supabase.com) (Postgres) directly from the browser.
There is no separate backend server. Content is managed through a
password-protected admin dashboard at `/admin`.

All content loaded by the starter SQL is **placeholder / mock data**.
Replace it through the admin dashboard once real content is available.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- React Router
- Supabase (Postgres, Auth, Row Level Security)
- Hosting: Netlify (static frontend)

## Project structure

```
kbk-geoinformatika/
├── README.md
├── .gitignore
└── frontend/
    ├── index.html
    ├── package.json
    ├── .nvmrc              (Node 20 for nvm)
    ├── .env.example        (copy to .env and fill in)
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env                 (local only, not committed)
    ├── public/
    │   ├── _headers         (Netlify security and cache headers)
    │   └── _redirects       (Netlify SPA routing rule)
    └── src/
        ├── main.jsx         (startup and configuration errors)
        ├── App.jsx          (routes)
        ├── api.js           (public data access via Supabase)
        ├── supabaseClient.js
        ├── components/      (Navbar, Footer, Layout, cards, ...)
        ├── pages/           (Home, About, Research, People, ...)
        └── admin/           (login, dashboard, generic CRUD manager)
```

## Pages

| Route                    | Page                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| `/`                      | Home                                                                       |
| `/about`                 | About the group                                                            |
| `/research`              | Field of Study (Ontology) overview and diagram                             |
| `/research/:slug`        | One Ontology, its Epistemologies and related outputs                       |
| `/projects`              | Projects directory (filter by status, Ontology and Epistemology)           |
| `/publications`          | Publications directory (search, filter by Ontology, Epistemology and year) |
| `/intellectual-property` | Intellectual Property/Patent directory and detail pages                    |
| `/community-services`    | Community Services directory and detail pages                              |
| `/people`                | People directory (filter by role, Ontology and Epistemology)               |
| `/people/:id`            | Researcher profile: education, projects, publications                      |
| `/facilities`            | Facilities and resources                                                   |
| `/news`                  | News and activities                                                        |
| `/contact`               | Contact and inquiry form                                                   |
| `/admin`                 | Admin dashboard (login required, hidden from search engines)               |

## Running locally

Requires Node.js 20+ and npm. The `frontend/.nvmrc` file selects Node 20 when using nvm.

```bash
cd frontend
npm install
npm run dev
```

The site runs on http://localhost:5173.

Run `npm test` for the automated tests,
and `npm run build` to check the production bundle.

Copy `frontend/.env.example` to `frontend/.env`, then fill in your Supabase project details:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-key
```

The key is the project's public key (labelled "anon" or "publishable" in the
Supabase dashboard). It is meant to be exposed to the browser. Data is
protected by Row Level Security policies, not by hiding this key. Vite
reads these variables at build time, so restart `npm run dev` after
changing them.

## Supabase setup

1. Create a Supabase project.
2. In the SQL Editor, create the tables and security policies (see
   "Database" below). In the `is_admin()` function, set the admin email
   address (lowercase).
3. In Authentication, add one user with that same email and a strong
   password, auto-confirmed.
4. Turn off new user sign-ups in the Auth settings.
5. Copy the project URL and public key into `frontend/.env`.

### Database

| Table                                                                | Purpose                                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `research_areas`                                                     | Name, slug, description, tags                                            |
| `researchers`                                                        | Profile fields, education (one entry per line), photo URL, research area |
| `projects`                                                           | Title, year, status, summary, study area, methodology, research area     |
| `publications`                                                       | Title, authors, year, venue, DOI/PDF URLs, research area                 |
| `news`                                                               | Title, body, published date                                              |
| `inquiries`                                                          | Contact form submissions (only the admin can read them)                  |
| `project_researchers`                                                | Links researchers to projects                                            |
| `publication_researchers`                                            | Links researchers to publications                                        |
| `epistemologies`                                                     | Subcategories of an Ontology (`research_areas`)                          |
| `intellectual_properties`                                            | Intellectual property and patents                                        |
| `community_services`                                                 | Community service activities                                             |
| `intellectual_property_researchers`, `community_service_researchers` | Links people to those outputs                                            |

If it has not already been applied, run [`supabase/migrations/20261005_ontology_epistemology_outputs.sql`](supabase/migrations/20261005_ontology_epistemology_outputs.sql) in the Supabase SQL Editor before deploying. It keeps existing `research_areas` records and IDs, adds Epistemology as an optional child classification, and expects the existing `public.is_admin()` function. Then apply [`supabase/migrations/20261006_indexes_and_inquiry_limits.sql`](supabase/migrations/20261006_indexes_and_inquiry_limits.sql), which adds taxonomy and researcher-link indexes plus length limits for new inquiry submissions. Back up production data before applying migrations. Codex has not run the 20261006 migration. Deploy the frontend after the SQL succeeds; deploying it first will make taxonomy queries fail.

Security model (Row Level Security):

- Content tables: anyone can read, only the admin can write.
- `inquiries`: anyone can submit, only the admin can read or delete.
- The admin is identified by the email in the `is_admin()` SQL function.

### Things to watch

- **File name case:** Netlify builds on Linux, where file names are
  case-sensitive. An import such as `./admin/AdminApp.jsx` must match the
  file name exactly.
- **Free Supabase projects pause after a period of inactivity.** Regular
  visitor traffic usually prevents this, but a quiet period can trigger
  it. A scheduled ping or the paid plan avoids it. Export a backup of
  your data now and then.

## Brand colors

| Token        | Hex       |
| ------------ | --------- |
| `navy`       | `#01416D` |
| `navy-dark`  | `#012C4A` |
| `amber`      | `#FCC104` |
| `amber-dark` | `#D9A700` |
| white        | `#FFFFFF` |

Defined in `frontend/tailwind.config.js`.
