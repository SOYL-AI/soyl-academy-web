#!/usr/bin/env node
/**
 * Proof that, with the platform flag OFF, every marketing page renders the same HTML as before the
 * web-platform changes (ADR-001 §4, D-017). Run from platform/:
 *
 *   node e2e/tests/platform/web/flag-off-html.mjs [--base <ref>] [--keep]
 *
 * 1. Checks out <base> (default: merge-base of HEAD and origin/platform/main) in a temporary worktree,
 *    `npm ci`, and builds both base and HEAD with the canonical flag-off env (scripts/lib.mjs).
 * 2. Serves both with `next start` and fetches every page in marketing/routes.ts plus the 404 page and the
 *    text endpoints (robots, sitemap, feed, manifest, llms.txt).
 * 3. Compares:
 *    a. server HTML byte-for-byte after replacing build-specific asset URLs (`/_next/static/...` chunk and
 *       CSS file names, which change whenever any module in the app changes) with a placeholder and
 *       removing inline flight-data scripts (they embed the same chunk names);
 *    b. the bytes of every stylesheet each page links (marketing CSS must be identical: Tailwind leak rule);
 *    c. the hydrated DOM in Chromium (`document.documentElement.outerHTML` without <script>/<link> tags);
 *    d. text endpoints byte-for-byte.
 *    Raw (un-normalised) byte equality is reported too, for information.
 * Writes test-results/platform-web/flag-off-html.json and exits 1 on any difference.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { canonicalEnv, run } from '../../../scripts/lib.mjs';
import { MARKETING_PAGES } from '../../../marketing/routes.ts';

const here = import.meta.dirname;
const repoRoot = resolve(here, '../../../../..');
const out = resolve(here, '../../../test-results/platform-web');
const args = process.argv.slice(2);
const keep = args.includes('--keep');
const git = (...a) => execFileSync('git', a, { cwd: repoRoot, encoding: 'utf8' }).trim();
const baseRef = args.includes('--base') ? args[args.indexOf('--base') + 1] : git('merge-base', 'HEAD', 'origin/platform/main');
const log = (m) => console.log(`[flag-off-html] ${m}`);

const TEXT_ENDPOINTS = ['/robots.txt', '/sitemap.xml', '/feed.xml', '/manifest.webmanifest', '/llms.txt', '/llms-full.txt'];
const PAGES = [...MARKETING_PAGES.map((p) => p.path), '/this-page-does-not-exist'];

function startServer(dir, port) {
  return new Promise((resolveStart, reject) => {
    import('node:child_process').then(({ spawn }) => {
      const child = spawn('npx', ['next', 'start', '--port', String(port), '--hostname', '127.0.0.1'], {
        cwd: dir,
        env: canonicalEnv({ NODE_ENV: 'production' }),
        shell: process.platform === 'win32',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      const deadline = Date.now() + 90_000;
      const poll = async () => {
        try {
          const r = await fetch(`http://127.0.0.1:${port}/`);
          if (r.status === 200) return resolveStart(child);
        } catch {
          // not yet
        }
        if (Date.now() > deadline) return reject(new Error(`next start on ${port} did not answer`));
        setTimeout(poll, 500);
      };
      poll();
    });
  });
}

function kill(child) {
  if (!child) return;
  if (process.platform === 'win32') {
    try {
      execFileSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } catch {
      // already gone
    }
  } else child.kill('SIGTERM');
}

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

/** Build-specific tokens → placeholders; inline flight scripts removed (they repeat the chunk names). */
function normaliseHtml(html) {
  return html
    .replace(/<script>self\.__next_f\.push\([\s\S]*?<\/script>/g, '<script>FLIGHT</script>')
    .replace(/\/_next\/static\/[A-Za-z0-9_\-./~]+?\.(js|css|woff2)/g, '/_next/static/ASSET.$1')
    .replace(/\?dpl=[A-Za-z0-9_-]+/g, '');
}

function stylesheetHrefs(html) {
  return [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
}

async function collect(port) {
  const origin = `http://127.0.0.1:${port}`;
  const pages = {};
  for (const path of PAGES) {
    const res = await fetch(origin + path);
    const html = await res.text();
    const css = [];
    for (const href of stylesheetHrefs(html)) css.push(sha(await (await fetch(origin + href)).text()));
    pages[path] = { status: res.status, raw: html, normalised: normaliseHtml(html), css };
  }
  const text = {};
  for (const path of TEXT_ENDPOINTS) {
    const res = await fetch(origin + path);
    text[path] = { status: res.status, body: await res.text() };
  }
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  await ctx.addInitScript(() => {
    try {
      window.localStorage.setItem('soyl_cookie_consent_v1', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: '2026-01-01T00:00:00.000Z' }));
    } catch {
      // ignore
    }
  });
  await ctx.route(/\/_vercel\//, (r) => r.abort());
  const dom = {};
  for (const path of PAGES) {
    const page = await ctx.newPage();
    await page.clock.setFixedTime(new Date('2026-10-26T06:30:00Z'));
    await page.goto(origin + path, { waitUntil: 'networkidle' });
    dom[path] = await page.evaluate(() => {
      const clone = document.documentElement.cloneNode(true);
      clone.querySelectorAll('script, link, next-route-announcer, nextjs-portal').forEach((n) => n.remove());
      return clone.outerHTML;
    });
    await page.close();
  }
  await browser.close();
  return { pages, text, dom };
}

mkdirSync(out, { recursive: true });
const baseDir = join(tmpdir(), 'soyl-flag-off-html', 'base');
let baseServer;
let headServer;
let failed = false;
try {
  log(`base ${baseRef.slice(0, 12)} vs HEAD ${git('rev-parse', 'HEAD').slice(0, 12)}`);
  if (existsSync(baseDir)) {
    try {
      git('worktree', 'remove', '--force', baseDir);
    } catch {
      rmSync(baseDir, { recursive: true, force: true });
    }
  }
  git('worktree', 'add', '--detach', baseDir, baseRef);
  log('npm ci (base)…');
  if ((await run('npm', ['ci', '--no-audit', '--no-fund'], { cwd: baseDir, logFile: join(out, 'flag-off-base-npm-ci.log'), quiet: true })) !== 0) throw new Error('npm ci failed (base)');
  log('next build (base, flag off)…');
  if ((await run('npm', ['run', 'build'], { cwd: baseDir, env: canonicalEnv(), logFile: join(out, 'flag-off-base-build.log'), quiet: true })) !== 0) throw new Error('base build failed');
  log('next build (HEAD, flag off)…');
  if ((await run('npm', ['run', 'build'], { cwd: repoRoot, env: canonicalEnv(), logFile: join(out, 'flag-off-head-build.log'), quiet: true })) !== 0) throw new Error('HEAD build failed');

  baseServer = await startServer(baseDir, 3401);
  headServer = await startServer(repoRoot, 3402);
  log('collecting…');
  const base = await collect(3401);
  const head = await collect(3402);

  const report = { base: baseRef, head: git('rev-parse', 'HEAD'), pages: {}, text: {}, summary: {} };
  let rawIdentical = 0;
  for (const path of PAGES) {
    const b = base.pages[path];
    const h = head.pages[path];
    const r = {
      status: `${b.status}/${h.status}`,
      rawIdentical: b.raw === h.raw,
      htmlIdentical: b.normalised === h.normalised,
      cssIdentical: JSON.stringify(b.css) === JSON.stringify(h.css),
      domIdentical: base.dom[path] === head.dom[path],
      htmlSha: sha(h.normalised),
    };
    if (r.rawIdentical) rawIdentical += 1;
    if (b.status !== h.status || !r.htmlIdentical || !r.cssIdentical || !r.domIdentical) {
      failed = true;
      writeFileSync(join(out, `flag-off-diff-${path.replace(/[^a-z0-9]+/gi, '_')}-base.html`), b.normalised);
      writeFileSync(join(out, `flag-off-diff-${path.replace(/[^a-z0-9]+/gi, '_')}-head.html`), h.normalised);
    }
    report.pages[path] = r;
    log(`${r.htmlIdentical && r.cssIdentical && r.domIdentical ? 'same' : 'DIFF'}  ${path}  status ${r.status}  html=${r.htmlIdentical} css=${r.cssIdentical} dom=${r.domIdentical} raw=${r.rawIdentical}`);
  }
  for (const path of TEXT_ENDPOINTS) {
    const same = base.text[path].status === head.text[path].status && base.text[path].body === head.text[path].body;
    report.text[path] = same;
    if (!same) failed = true;
    log(`${same ? 'same' : 'DIFF'}  ${path}`);
  }
  report.summary = { pages: PAGES.length, rawIdentical, textEndpoints: TEXT_ENDPOINTS.length, passed: !failed };
  writeFileSync(join(out, 'flag-off-html.json'), JSON.stringify(report, null, 2));
  log(`${PAGES.length} pages, ${rawIdentical} raw byte-identical (others differ only in build asset names), ${TEXT_ENDPOINTS.length} text endpoints`);
  log(failed ? 'FAILED: differences found (see test-results/platform-web/flag-off-diff-*)' : 'PASSED: flag-off marketing HTML, CSS and hydrated DOM identical to base');
} catch (err) {
  failed = true;
  console.error(err);
} finally {
  kill(baseServer);
  kill(headServer);
  if (!keep) {
    try {
      git('worktree', 'remove', '--force', baseDir);
    } catch {
      // leave it
    }
  }
}
process.exit(failed ? 1 : 0);
