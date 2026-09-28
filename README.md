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
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env                 (local only, not committed)
    ├── public/
    │   └── _redirects       (Netlify SPA routing rule)
    └── src/
        ├── main.jsx         (routes)
        ├── api.js           (public data access via Supabase)
        ├── supabaseClient.js
        ├── components/      (Navbar, Footer, Layout, cards, ...)
        ├── pages/           (Home, About, Research, People, ...)
        └── admin/           (login, dashboard, generic CRUD manager)
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About the group |
| `/research` | Research areas overview |
| `/research/:slug` | One research area with its researchers, projects, publications |
| `/projects` | Projects directory (filter by status and area) |
| `/publications` | Publications directory (search, filter by area and year) |
| `/people` | People directory (filter by role) |
| `/people/:id` | Researcher profile: education, projects, publications |
| `/facilities` | Facilities and resources |
| `/news` | News and activities |
| `/contact` | Contact and inquiry form |
| `/admin` | Admin dashboard (login required, hidden from search engines) |

## Running locally

Requires Node.js 18+ and npm.

```bash
cd frontend
npm install
npm run dev
```

The site runs on http://localhost:5173.

Create `frontend/.env` with your Supabase project details:

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

| Table | Purpose |
|-------|---------|
| `research_areas` | Name, slug, description, tags |
| `researchers` | Profile fields, education (one entry per line), photo URL, research area |
| `projects` | Title, year, status, summary, study area, methodology, research area |
| `publications` | Title, authors, year, venue, DOI/PDF URLs, research area |
| `news` | Title, body, published date |
| `inquiries` | Contact form submissions (only the admin can read them) |
| `project_researchers` | Links researchers to projects |
| `publication_researchers` | Links researchers to publications |

Security model (Row Level Security):

- Content tables: anyone can read, only the admin can write.
- `inquiries`: anyone can submit, only the admin can read or delete.
- The admin is identified by the email in the `is_admin()` SQL function.

## Admin dashboard

Open `/admin` and sign in with the admin email and password. Tabs:
Research Areas, Researchers, Projects, Publications, News, Inquiries, and
Settings (change password).

Tips:

- **Photo URL:** paste the direct link to an image file. If the image
  server blocks other sites from displaying its images, the card falls
  back to the person's initials. Hosting the image in `frontend/public/`
  or Supabase Storage avoids this.
- **Education:** one entry per line, for example
  `PhD in Geodetic Engineering, UGM, 2022`.
- **Linking people to work:** in the Projects and Publications forms,
  tick the researchers involved. Their profile pages then list that work.
- **Tags** (research areas): comma separated.

## Deploying (Netlify)

1. Push the repository to GitHub.
2. In Netlify, import the repository and use these build settings:
   - Base directory: leave empty
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
3. Add the two environment variables (`VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`) in the site's environment settings, then
   redeploy.
4. Keep `frontend/public/_redirects` in the repository. It contains
   `/*  /index.html  200` so that refreshing a page such as `/research`
   or `/admin` does not return a 404.

Every push to the main branch redeploys the site automatically.

### Things to watch

- **File name case:** Netlify builds on Linux, where file names are
  case-sensitive. An import such as `./admin/AdminApp.jsx` must match the
  file name exactly.
- **Free Supabase projects pause after a period of inactivity.** Regular
  visitor traffic usually prevents this, but a quiet period can trigger
  it. A scheduled ping or the paid plan avoids it. Export a backup of
  your data now and then.

## Brand colors

| Token | Hex |
|-------|-----|
| `navy` | `#01416D` |
| `navy-dark` | `#012C4A` |
| `amber` | `#FCC104` |
| `amber-dark` | `#D9A700` |
| white | `#FFFFFF` |

Defined in `frontend/tailwind.config.js`.
