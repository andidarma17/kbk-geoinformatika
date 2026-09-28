# KBK Geoinformatika — Website

Full-stack scaffold for the KBK Geoinformatika (Departemen Teknik Geodesi,
UGM) website. Currently implements the **Home page** only, per the
page-by-page build plan.

```
kbk-geoinformatika/
├── backend/     Express API + SQLite database (research areas, researchers,
│                projects, publications, news)
└── frontend/    React + Vite + Tailwind CSS site, fetches from the API
```

All content shipped in `backend/seed.js` is **placeholder / mock data** —
replace it with real content once available.

## Prerequisites

- Node.js 18+ and npm

## 1. Backend (API + database)

```bash
cd backend
npm install
npm run seed   # creates kbk.db and fills it with placeholder data
npm run dev    # starts the API on http://localhost:4000
```

Copy `backend/.env.example` to `backend/.env` and adjust `JWT_SECRET`
before any real deployment (the default is fine for local dev only).

Endpoints — `GET` is public, everything else requires a Bearer token:

- `GET /api/research-areas` · `POST` · `PUT /:id` · `DELETE /:id`
- `GET /api/researchers` · `POST` · `PUT /:id` · `DELETE /:id`
- `GET /api/projects` · `POST` · `PUT /:id` · `DELETE /:id`
- `GET /api/publications` · `POST` · `PUT /:id` · `DELETE /:id`
- `GET /api/news` · `POST` · `PUT /:id` · `DELETE /:id`
- `GET /api/stats` (derived counts, not stored, always public)
- `POST /api/auth/login` — `{ "password": "..." }` → `{ "token": "..." }`
- `POST /api/auth/change-password` (requires a valid token) —
  `{ "currentPassword": "...", "newPassword": "..." }`

**Admin password:** a single shared password for the whole site, stored
as a bcrypt hash in the database (not in code or `.env`). On first run
it's initialized to `ADMIN_DEFAULT_PASSWORD` (see `.env.example`,
default: `kbk-geoinformatika`) — change it immediately via
`/api/auth/change-password` once you're logged in. Login returns a
token valid for 12 hours; send it as `Authorization: Bearer <token>` on
every write request.

The database is a single file, `backend/kbk.db` (SQLite via
`better-sqlite3`). Re-run `npm run seed` any time to reset the content
tables back to the placeholder data — this does not touch the admin
password.

## 2. Frontend (React site)

In a second terminal:

```bash
cd frontend
npm install
npm run dev    # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:4000`
(configured in `vite.config.js`), so both servers need to be running.

## Opening in VS Code

Open the `kbk-geoinformatika` folder as the workspace root — both
`backend/` and `frontend/` are visible as subfolders. Recommended: two
integrated terminals, one running the backend, one the frontend.

## Brand colors

| Token       | Hex       |
|-------------|-----------|
| `navy`      | `#01416D` |
| `navy-dark` | `#012C4A` |
| `amber`     | `#FCC104` |
| white       | `#FFFFFF` |

Defined in `frontend/tailwind.config.js`.

## Next steps

- Replace placeholder data in `backend/seed.js` with real researchers,
  projects, and publications
- Add write endpoints (POST/PUT) if the group wants to manage content
  without editing the seed file directly
- Continue the page-by-page plan: About → Research → People → Projects →
  Publications → News → Facilities → Contact
