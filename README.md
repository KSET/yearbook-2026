# yearbook-2026
Nova yearbook stranica

Frontend-only static site — no backend needed. All photos and member data live as
static files under `client/public/static/` and are served directly by Vite (dev)
or any static host (production).

## Development
```
cd client
npm install
npm run dev
```

## Production build
```
cd client
npm install
npm run build
```
Outputs a static site in `client/dist/` that can be deployed to any static host
(Netlify, Vercel, GitHub Pages, S3, etc.). A `_redirects` (Netlify) and
`vercel.json` are included so client-side routes like `/2022/bike` don't 404 on
refresh; other hosts need an equivalent "fallback to index.html" rule.

## Adding new years/sections
Add photos under `client/public/static/photos/<year>/<section>/` and the
matching data under `client/public/static/json/<year>/<section>.json`, then
regenerate the manifest (also runs automatically before `dev`/`build`):
```
cd client
npm run generate-manifest
```

## Legacy backend
The `server/` (Express) and `StariApp/` (Flask) folders are the old backends
and are no longer required — the site works entirely from `client/`.
