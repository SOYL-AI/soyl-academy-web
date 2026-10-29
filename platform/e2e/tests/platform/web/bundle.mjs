#!/usr/bin/env node
/**
 * Platform route JS budget (ARCHITECTURE §16: platform route JS ≤ 200 KB gz, player chunks lazy).
 * Next 16 prints no sizes, and these routes are ISR (no prerendered HTML at build), so this measures a
 * running `next start`: for each page, the JS referenced by the HTML (first load) and the JS the page then
 * fetches by itself without interaction (lazy chunks), gzip level 9 from the files in .next/static.
 *
 *   node tests/platform/web/bundle.mjs [--base http://localhost:3000] [--json out.json] [--only "me,dashboard"]
 * Exit 1 when a page's first-load JS exceeds the budget.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const opt = (name, def) => (args.includes(name) ? args[args.indexOf(name) + 1] : def);
const base = opt('--base', 'http://localhost:3000');
const jsonOut = opt('--json', null);
/** --only 'me,dashboard': measure just these pages (by name). */
const only = opt('--only', null);
const BUDGET_KB = 200;
const repoRoot = resolve(import.meta.dirname, '../../../../..');

export const PAGES = [
  ['hub', '/learn/cbse/10/science/ch01'],
  ['lesson', '/learn/cbse/10/science/ch01/lesson'],
  ['lesson part 2', '/learn/cbse/10/science/ch01/lesson?part=2'],
  ['notes', '/learn/cbse/10/science/ch01/notes'],
  ['flashcards', '/learn/cbse/10/science/ch01/flashcards'],
  ['practice', '/learn/cbse/10/science/ch01/practice'],
  ['notes (Hindi)', '/learn/cbse/10/hindi-a/ch02/notes'],
  ['admin', '/admin'],
  ['learn', '/learn'],
  // M3/M4
  ['tests', '/tests'],
  ['test series', '/tests/series/cbse/10/science'],
  ['test player', '/tests/attempt/00000000-0000-4000-8000-000000000000'],
  ['test result', '/tests/result/00000000-0000-4000-8000-000000000000'],
  ['test builder', '/tests/builder'],
  ['live mock', '/tests/live/live_cbse10sci_1'],
  ['ask', '/ask'],
  ['plans', '/plans'],
  ['leaderboard', '/leaderboard'],
  ['me', '/me'],
  // SOYL Coins (ADR-021); the class page carries the daily-challenge card
  ['class (challenge)', '/learn/cbse/10'],
  ['coins', '/coins'],
  ['store', '/store'],
  // Student dashboard (D-043)
  ['dashboard', '/me/dashboard'],
  // Avatars and credits UI (design-system, 2026-10-29): subject glyphs on the course page
  ['subject', '/learn/cbse/10/science'],
];

const cache = new Map();
function gz(urlPath) {
  if (cache.has(urlPath)) return cache.get(urlPath);
  const file = resolve(repoRoot, '.next', decodeURIComponent(urlPath.replace(/^\/_next\//, '')));
  const size = existsSync(file) ? gzipSync(readFileSync(file), { level: 9 }).length : 0;
  cache.set(urlPath, size);
  return size;
}

const browser = await chromium.launch();
const results = [];
let failed = false;
for (const [name, path] of only ? PAGES.filter(([n]) => only.split(',').includes(n)) : PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const requested = new Set();
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.origin === new URL(base).origin && u.pathname.startsWith('/_next/static/') && u.pathname.endsWith('.js')) requested.add(u.pathname);
  });
  const res = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 240_000 });
  const html = await res.text();
  await page.waitForTimeout(1500);
  // `nomodule` scripts (legacy polyfills) are never fetched by the browsers we support.
  const initial = new Set(
    [...html.matchAll(/<script([^>]*)>/g)]
      .filter((m) => !/nomodule/i.test(m[1]))
      .map((m) => /src="([^"]+\.js)"/.exec(m[1])?.[1])
      .filter(Boolean)
      .map((src) => new URL(src, base).pathname),
  );
  const first = [...initial].reduce((n, u) => n + gz(u), 0);
  const lazy = [...requested].filter((u) => !initial.has(u)).reduce((n, u) => n + gz(u), 0);
  const row = { name, path, firstLoadKbGz: +(first / 1024).toFixed(1), lazyKbGz: +(lazy / 1024).toFixed(1), files: initial.size };
  results.push(row);
  if (row.firstLoadKbGz > BUDGET_KB) failed = true;
  await ctx.close();
}
await browser.close();
console.log('page                 first-load JS (KB gz)   fetched after load (KB gz)');
for (const r of results) console.log(`${r.name.padEnd(20)} ${String(r.firstLoadKbGz).padStart(10)}   ${String(r.lazyKbGz).padStart(20)}`);
console.log(failed ? `FAILED: a page exceeds ${BUDGET_KB} KB gz first-load JS` : `PASSED: every page ≤ ${BUDGET_KB} KB gz first-load JS`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(results, null, 2));
process.exit(failed ? 1 : 0);
