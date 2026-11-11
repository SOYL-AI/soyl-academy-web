#!/usr/bin/env node
/**
 * Downloads the chosen Pexels photographs (plan §5.1) into public/photos/ and writes content/credits.ts.
 *
 *   node tools/assets/fetch-pexels.mjs
 *
 * Needs PEXELS_API_KEY in .env.local (git-ignored). The key is read from that file and sent only to
 * api.pexels.com; it is never printed or written anywhere else.
 * Pexels licence: free to use and modify, no attribution required (we credit anyway, plan §2.6).
 * Each photo is fetched once at a fixed width; next/image makes the sizes the page needs.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'public', 'photos');
const CREDITS = join(ROOT, 'content', 'credits.ts');
const WIDTH = 1600;

/** slug → Pexels id. Real photographs only; see the rules in DESIGN.md §6 before adding one. */
const PHOTOS = [
  // In use on the homepage.
  { slug: 'parents-reading', id: 7104388, use: 'Home: the parents door', alt: 'A mother and her daughter reading a book together at home', face: true },
  { slug: 'classroom-from-behind', id: 6217466, use: 'Home: the schools door', alt: 'Students in uniform seen from behind, listening in a classroom', face: false },
  { slug: 'hands-breadboard', id: 15470540, use: 'Home: the Future Builders door', alt: 'Hands wiring components on a breadboard', face: false },
  // The rest of the plan's list (§5.1), for the other pages. `face: true` means a recognisable person: never
  // beside a price, a claim or a number when that person is a child (DESIGN.md §6).
  { slug: 'hands-red-pencil', id: 9797031, use: 'Study, marking', alt: 'A hand holding a red pencil over an open notebook', face: false },
  { slug: 'hands-writing-night', id: 239548, use: 'Study at night', alt: 'Hands writing in a notebook in low light', face: false },
  { slug: 'desk-pages', id: 8423372, use: 'Study desk from above', alt: 'Hands turning the pages of a book beside a notebook, seen from above', face: false },
  { slug: 'notes-top', id: 6929270, use: 'Notes from above', alt: 'Two people writing notes in notebooks on a wooden table, seen from above', face: false },
  { slug: 'night-study', id: 33940743, use: 'Night theme', alt: 'Reading under a desk lamp at night', face: false },
  { slug: 'lamplight', id: 40746551, use: 'Night, small only', alt: 'A child reading by lamplight', face: true },
  { slug: 'classroom-girls', id: 3231358, use: 'Classroom', alt: 'Schoolgirls in uniform listening in a classroom', face: true },
  { slug: 'classroom-boys', id: 18012456, use: 'Classroom', alt: 'Young schoolboys in uniform at their desks in a classroom', face: true },
  { slug: 'parents-alt', id: 7104142, use: 'Parents', alt: 'A mother and her daughter smiling over a painting the girl made', face: true },
  { slug: 'teacher-blackboard', id: 3184658, use: 'Teachers', alt: 'A teacher writing on a blackboard', face: true },
  { slug: 'chalk-maths', id: 39191015, use: 'Night theme, teachers', alt: 'A hand writing maths on a blackboard in chalk', face: false },
  { slug: 'chalk-alt', id: 6256258, use: 'Night theme', alt: 'A hand writing trigonometry in chalk on a blackboard', face: false },
  { slug: 'arduino-team', id: 33373082, use: 'Future Builders', alt: 'Several hands wiring an Arduino board beside a laptop', face: false },
  { slug: 'electronics-top', id: 4709369, use: 'Future Builders', alt: 'Hands soldering electronic components on a workbench, seen from above', face: false },
];

function apiKey() {
  const env = join(ROOT, '.env.local');
  if (!existsSync(env)) throw new Error('.env.local not found');
  const line = readFileSync(env, 'utf8').split(/\r?\n/).find((l) => l.startsWith('PEXELS_API_KEY='));
  const key = line?.slice('PEXELS_API_KEY='.length).trim();
  if (!key) throw new Error('PEXELS_API_KEY is not set in .env.local');
  return key;
}

async function main() {
  const key = apiKey();
  mkdirSync(OUT, { recursive: true });
  const credits = [];
  for (const p of PHOTOS) {
    const res = await fetch(`https://api.pexels.com/v1/photos/${p.id}`, { headers: { Authorization: key } });
    if (!res.ok) throw new Error(`Pexels ${p.id}: ${res.status}`);
    const meta = await res.json();
    const url = `${meta.src.original}?auto=compress&cs=tinysrgb&w=${WIDTH}`;
    const img = await fetch(url);
    if (!img.ok) throw new Error(`download ${p.id}: ${img.status}`);
    const buf = Buffer.from(await img.arrayBuffer());
    const file = `${p.slug}.jpg`;
    writeFileSync(join(OUT, file), buf);
    const width = WIDTH;
    const height = Math.round((meta.height / meta.width) * WIDTH);
    credits.push({
      slug: p.slug,
      src: `/photos/${file}`,
      width,
      height,
      alt: p.alt,
      use: p.use,
      photographer: meta.photographer,
      photographerUrl: meta.photographer_url,
      source: 'Pexels',
      sourceUrl: meta.url,
      licence: 'Pexels licence',
      face: p.face,
    });
    console.log(`${file}  ${(buf.length / 1024).toFixed(0)} KB  ${width}x${height}  ${meta.photographer}`);
  }
  const ts = `/**
 * GENERATED by tools/assets/fetch-pexels.mjs. Every photograph on the site, with its credit (plan §2.6).
 * Rendered on /about. Real photographs only: no generated people.
 */
export interface PhotoCredit {
  slug: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  use: string;
  photographer: string;
  photographerUrl: string;
  source: 'Pexels';
  sourceUrl: string;
  licence: string;
  /** A recognisable person is in the picture. A child's face never sits beside a price, a claim or a number. */
  face: boolean;
}

export const PHOTO_CREDITS: PhotoCredit[] = ${JSON.stringify(credits, null, 2)};

export function photo(slug: string): PhotoCredit {
  const p = PHOTO_CREDITS.find((c) => c.slug === slug);
  if (!p) throw new Error(\`No photo "\${slug}" in content/credits.ts\`);
  return p;
}
`;
  writeFileSync(CREDITS, ts);
  console.log(`wrote ${CREDITS}`);
}

main().catch((err) => {
  console.error(`[fetch-pexels] ${err.message}`);
  process.exit(1);
});
