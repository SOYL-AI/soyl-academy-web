import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { MARKETING_ENDPOINTS, MARKETING_PAGES, PLATFORM_PREFIXES } from './routes';

/**
 * Route status gate: every marketing page and GET-able endpoint answers with its expected
 * status, every URL in the sitemap answers 200, and the build contains no marketing route
 * that routes.ts does not know about.
 *
 * MARKETING_STATUS_OUT: where to write the status list (JSON).
 * MARKETING_NEXT_DIR: the `.next` directory of the build under test (default: repo root).
 */

const REPO_ROOT = resolve(import.meta.dirname, '..', '..', '..');
const NEXT_DIR = process.env.MARKETING_NEXT_DIR ?? resolve(REPO_ROOT, '.next');

interface StatusRow {
  path: string;
  method: string;
  expected: number;
  actual: number;
  contentType: string;
  ok: boolean;
  note?: string;
}

const rows: StatusRow[] = [];

test.describe.configure({ mode: 'serial' });

test.afterAll(() => {
  const out = process.env.MARKETING_STATUS_OUT;
  if (!out) return;
  mkdirSync(dirname(out), { recursive: true });
  const sorted = [...rows].sort((a, b) => a.path.localeCompare(b.path));
  writeFileSync(out, `${JSON.stringify({ checked: sorted.length, routes: sorted }, null, 2)}\n`);
});

test('marketing pages return their expected status', async ({ request }) => {
  for (const p of MARKETING_PAGES) {
    const res = await request.get(p.path, { maxRedirects: 0 });
    const contentType = res.headers()['content-type'] ?? '';
    const ok = res.status() === p.status && contentType.includes('text/html');
    rows.push({ path: p.path, method: 'GET', expected: p.status, actual: res.status(), contentType, ok });
    expect.soft(res.status(), `${p.path}`).toBe(p.status);
    expect.soft(contentType, `${p.path} content-type`).toContain('text/html');
  }
});

test('metadata routes, feeds and API routes behave as expected', async ({ request }) => {
  for (const e of MARKETING_ENDPOINTS) {
    const res = await request.get(e.path, { maxRedirects: 0 });
    const contentType = res.headers()['content-type'] ?? '';
    const typeOk = !e.contentType || contentType.includes(e.contentType);
    rows.push({
      path: e.path,
      method: e.method,
      expected: e.status,
      actual: res.status(),
      contentType,
      ok: res.status() === e.status && typeOk,
      ...(e.note ? { note: e.note } : {}),
    });
    expect.soft(res.status(), `${e.path}`).toBe(e.status);
    if (e.contentType) expect.soft(contentType, `${e.path} content-type`).toContain(e.contentType);
  }
});

test('every sitemap URL (pages and their OG images) returns 200', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<(?:loc|image:loc)>([^<]+)<\/(?:loc|image:loc)>/g)].map((m) =>
    m[1]!.replace(/&amp;/g, '&')
  );
  expect(locs.length).toBeGreaterThan(MARKETING_PAGES.length);
  const known = new Set(rows.map((r) => r.path));
  for (const loc of locs) {
    const url = new URL(loc);
    const path = `${url.pathname}${url.search}`;
    const r = await request.get(path, { maxRedirects: 0 });
    if (!known.has(path)) {
      rows.push({
        path,
        method: 'GET',
        expected: 200,
        actual: r.status(),
        contentType: r.headers()['content-type'] ?? '',
        ok: r.status() === 200,
        note: 'from sitemap.xml',
      });
      known.add(path);
    }
    expect.soft(r.status(), `${path} (sitemap)`).toBe(200);
  }
});

test('routes.ts covers every marketing route in the build', () => {
  const manifestPath = resolve(NEXT_DIR, 'app-path-routes-manifest.json');
  test.skip(!existsSync(manifestPath), `no build manifest at ${manifestPath}`);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, string>;
  const covered = new Set<string>([
    ...MARKETING_PAGES.map((p) => p.path),
    ...MARKETING_ENDPOINTS.map((e) => new URL(e.path, 'http://x').pathname),
    '/journal/[slug]', // each slug is listed individually in MARKETING_PAGES and checked via the sitemap
  ]);
  const ignored = new Set(['/_global-error', '/_not-found']);
  const isPlatform = (entry: string, route: string) =>
    entry.includes('/(platform)/') || PLATFORM_PREFIXES.some((p) => route === p || route.startsWith(`${p}/`));

  const uncovered = Object.entries(manifest)
    .filter(([entry, route]) => !ignored.has(route) && !isPlatform(entry, route) && !covered.has(route))
    .map(([, route]) => route);
  expect(uncovered, 'marketing routes missing from platform/e2e/marketing/routes.ts').toEqual([]);
});
