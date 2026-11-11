#!/usr/bin/env node
/**
 * Brand fonts for the marketing site (ADR-028): Zodiak and Switzer from Fontshare.
 *
 * They are free to use on a website under the ITF Free Font License but may not be redistributed as files,
 * and this repository is public, so the files are never committed. This script downloads them into the
 * git-ignored `assets/fonts/`, where `lib/fonts.ts` picks them up with `next/font/local` (self-hosted, so
 * visitors never request anything from Fontshare: WEB-1 holds).
 *
 * It runs on `postinstall`, `predev` and `prebuild`, so the files exist before any `next build` or `next dev`,
 * including the e2e scripts that call `npx next build` directly.
 *
 * It must never fail an install or a build. In order, it uses:
 *   1. the files already in assets/fonts/ (nothing to do),
 *   2. a fresh download from Fontshare (also copied to node_modules/.cache/soyl-fonts/, which CI caches),
 *   3. that cache, when Fontshare cannot be reached,
 *   4. a glyphless placeholder (scripts/fonts/placeholder.woff2, made by scripts/fonts/make-placeholder.py),
 *      so `next/font/local` still compiles and every character renders in the metric-matched fallback.
 * It always exits 0 and says which of these it used.
 *
 *   node scripts/fetch-fonts.mjs            fetch what is missing
 *   node scripts/fetch-fonts.mjs --force    fetch everything again
 */
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'fonts');
const CACHE = join(ROOT, 'node_modules', '.cache', 'soyl-fonts');
const PLACEHOLDER = join(ROOT, 'scripts', 'fonts', 'placeholder.woff2');
const MARKER = join(OUT, 'SOURCE.txt');

/** One request per family: the Fontshare CSS API answers only the first `f[]` of a query. */
const FAMILIES = [
  { slug: 'zodiak', name: 'Zodiak', weights: '400,401' },
  { slug: 'switzer', name: 'Switzer', weights: '400,500,600' },
];

/** The files lib/fonts.ts expects. Keep the two lists in step. */
export const FILES = ['zodiak-400.woff2', 'zodiak-400-italic.woff2', 'switzer-400.woff2', 'switzer-500.woff2', 'switzer-600.woff2'];

/**
 * The share card (app/og/route.tsx) is drawn by satori, which reads WOFF or TTF but not WOFF2. These are fetched
 * from the same Fontshare answer, best effort: when they are missing the card falls back to its default font and
 * nothing fails.
 */
export const OG_FILES = ['zodiak-400.woff', 'switzer-500.woff'];

/** A real woff2 from Fontshare is tens of kilobytes; the placeholder is a few hundred bytes. */
const REAL_MIN_BYTES = 4000;
const TIMEOUT_MS = 15000;

const log = (msg) => console.log(`[fetch-fonts] ${msg}`);
const isReal = (path) => existsSync(path) && statSync(path).size >= REAL_MIN_BYTES;

async function get(url, as) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'user-agent': 'soyl-academy-build' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return as === 'text' ? res.text() : Buffer.from(await res.arrayBuffer());
}

/** Parse Fontshare's @font-face blocks into { file, url } pairs. */
function faces(css, family) {
  const out = [];
  for (const block of css.split('@font-face').slice(1)) {
    const weight = /font-weight:\s*(\d+)/.exec(block)?.[1];
    const italic = /font-style:\s*italic/.test(block);
    const base = `${family.slug}-${weight}${italic ? '-italic' : ''}`;
    for (const ext of ['woff2', 'woff']) {
      const url = new RegExp(`url\\('([^']+\\.${ext})'\\)`).exec(block)?.[1];
      if (weight && url) out.push({ file: `${base}.${ext}`, url: url.startsWith('//') ? `https:${url}` : url });
    }
  }
  return out;
}

async function download() {
  const wanted = new Set([...FILES, ...OG_FILES]);
  const got = [];
  for (const family of FAMILIES) {
    const css = await get(`https://api.fontshare.com/v2/css?f[]=${family.slug}@${family.weights}&display=swap`, 'text');
    for (const face of faces(css, family)) {
      if (!wanted.has(face.file)) continue;
      const data = await get(face.url, 'buffer');
      const magic = face.file.endsWith('.woff2') ? 'wOF2' : 'wOFF';
      if (data.length < REAL_MIN_BYTES || data.subarray(0, 4).toString('latin1') !== magic) throw new Error(`not a ${magic}: ${face.url}`);
      writeFileSync(join(OUT, face.file), data);
      writeFileSync(join(CACHE, face.file), data);
      got.push(face.file);
    }
  }
  const missing = FILES.filter((f) => !got.includes(f));
  if (missing.length) throw new Error(`Fontshare did not list: ${missing.join(', ')}`);
}

function fromCache() {
  if (!FILES.every((f) => isReal(join(CACHE, f)))) return false;
  for (const f of [...FILES, ...OG_FILES.filter((o) => isReal(join(CACHE, o)))]) copyFileSync(join(CACHE, f), join(OUT, f));
  return true;
}

function placeholders() {
  for (const f of FILES) if (!isReal(join(OUT, f))) copyFileSync(PLACEHOLDER, join(OUT, f));
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(CACHE, { recursive: true });
  const force = process.argv.includes('--force');
  if (!force && [...FILES, ...OG_FILES].every((f) => isReal(join(OUT, f)))) {
    log('brand fonts present');
    return;
  }
  let source;
  try {
    await download();
    source = 'fontshare';
  } catch (err) {
    log(`could not download from Fontshare (${err.message})`);
    if (fromCache()) source = 'cache';
    else {
      placeholders();
      source = 'placeholder';
      log('WARNING: using glyphless placeholders; pages render in the fallback fonts (Times New Roman / Arial, metric-matched)');
    }
  }
  writeFileSync(MARKER, `${source} ${new Date().toISOString()}\n`);
  log(`brand fonts from ${source}`);
}

try {
  await main();
} catch (err) {
  // Never fail the install or the build: lib/fonts.ts still needs files, so fall back to placeholders.
  try {
    mkdirSync(OUT, { recursive: true });
    placeholders();
  } catch {
    /* nothing more we can do; next/font will report the missing file */
  }
  log(`unexpected error, placeholders used: ${err?.message ?? err}`);
}
process.exit(0);
