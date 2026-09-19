// Scans public/static/photos/<year>/<section> and writes public/static/manifest.json,
// so the frontend can list years/sections without a backend directory-listing API.
// Re-run (or let `npm run dev`/`npm run build` re-run it via pre-hooks) whenever photos are added.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const photosDir = join(__dirname, '..', 'public', 'static', 'photos');
const manifestPath = join(__dirname, '..', 'public', 'static', 'manifest.json');

function listDirs(path) {
  return readdirSync(path, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

const years = listDirs(photosDir);
const sections = {};
for (const year of years) {
  sections[year] = listDirs(join(photosDir, year));
}

writeFileSync(manifestPath, JSON.stringify({ years, sections }, null, 2) + '\n');
console.log(`Wrote manifest for ${years.length} year(s) to ${manifestPath}`);
