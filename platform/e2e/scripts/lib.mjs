// Shared helpers for the marketing regression scripts: build, serve, Playwright, Lighthouse,
// build-size measurement. Plain ESM so it runs with `node` and no build step.
import { spawn, spawnSync } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

export const E2E_DIR = resolve(import.meta.dirname, '..');
export const REPO_ROOT = resolve(E2E_DIR, '..', '..');
export const BASELINE_DIR = join(E2E_DIR, 'marketing-baseline');
export const RESULTS_DIR = join(E2E_DIR, 'test-results', 'marketing');
export const IS_WINDOWS = process.platform === 'win32';

const require = createRequire(import.meta.url);

export function log(msg) {
  process.stdout.write(`[marketing] ${msg}\n`);
}

/**
 * Environment for building/serving the marketing site under test. Anything that changes what
 * the marketing site renders (site URL, TODO frames, platform flags, verification tags,
 * provider keys) is removed so the build is the canonical production build with flags off.
 */
export function canonicalEnv(extra = {}) {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (/^(NEXT_PUBLIC_|PLATFORM_|BILLING_|GOOGLE_|BING_|RAZORPAY_|RESEND_|COHORT_|VERCEL)/i.test(key)) delete env[key];
  }
  env.NEXT_TELEMETRY_DISABLED = '1';
  return { ...env, ...extra };
}

export function warnAboutEnvFiles(dir) {
  const found = readdirSync(dir).filter((f) => /^\.env/.test(f) && f !== '.env.example');
  if (found.length) {
    log(`WARNING: ${found.join(', ')} in ${dir}; Next.js loads these at build time and they can change`);
    log('         what the marketing site renders. Baselines assume none are present.');
  }
}

/** Run a command, streaming output to the console and (optionally) a log file. Resolves with the exit code. */
export function run(command, args, { cwd, env, logFile, quiet = false } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: env ?? process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: IS_WINDOWS && /\.(cmd|bat)$|^npm$|^npx$/.test(command),
    });
    let out;
    if (logFile) {
      mkdirSync(dirname(logFile), { recursive: true });
      out = createWriteStream(logFile);
    }
    const forward = (stream) => (chunk) => {
      if (!quiet) stream.write(chunk);
      out?.write(chunk);
    };
    child.stdout.on('data', forward(process.stdout));
    child.stderr.on('data', forward(process.stderr));
    child.on('error', reject);
    child.on('close', (code) => {
      out?.end();
      resolvePromise(code ?? 1);
    });
  });
}

/** `npm run build` in a checkout of the marketing site. */
export async function buildSite(siteDir, logFile) {
  warnAboutEnvFiles(siteDir);
  log(`building ${siteDir} (log: ${relative(process.cwd(), logFile)})`);
  const code = await run('npm', ['run', 'build'], { cwd: siteDir, env: canonicalEnv(), logFile, quiet: true });
  if (code !== 0) throw new Error(`npm run build failed in ${siteDir} (exit ${code}); see ${logFile}`);
}

/** Start `next start` for a built checkout. Returns { url, stop }. */
export async function startServer(siteDir, port) {
  const nextBin = join(siteDir, 'node_modules', 'next', 'dist', 'bin', 'next');
  if (!existsSync(join(siteDir, '.next', 'BUILD_ID'))) {
    throw new Error(`no production build in ${siteDir}/.next; run without --skip-build`);
  }
  const url = `http://127.0.0.1:${port}`;
  try {
    await fetch(url, { signal: AbortSignal.timeout(1000) });
    throw new Error(`port ${port} is already in use; pass --port or stop the other server`);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('port ')) throw err;
  }
  const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port), '-H', '127.0.0.1'], {
    cwd: siteDir,
    env: canonicalEnv({ NODE_ENV: 'production' }),
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: !IS_WINDOWS,
  });
  let output = '';
  child.stdout.on('data', (c) => (output += c));
  child.stderr.on('data', (c) => (output += c));

  const stop = () => {
    if (child.exitCode !== null) return;
    if (IS_WINDOWS) spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else {
      try {
        process.kill(-child.pid, 'SIGTERM');
      } catch {
        child.kill('SIGTERM');
      }
    }
  };
  process.on('exit', stop);

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`next start exited (${child.exitCode}):\n${output}`);
    try {
      const res = await fetch(`${url}/robots.txt`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        log(`serving ${siteDir} at ${url}`);
        return { url, stop };
      }
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  stop();
  throw new Error(`next start did not answer on ${url} within 60 s:\n${output}`);
}

/** Run Playwright from the e2e workspace. Resolves with the exit code. */
export function runPlaywright(args, env) {
  const cli = require.resolve('@playwright/test/cli');
  return run(process.execPath, [cli, 'test', ...args], { cwd: E2E_DIR, env: { ...process.env, ...env } });
}

// ---------------------------------------------------------------------------------------------
// Build output size. Next.js 16 no longer prints per-route sizes in the build log, so they are
// measured from the build: the JS and CSS each prerendered page references on first load.
// ---------------------------------------------------------------------------------------------

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function measureBuild(siteDir) {
  const nextDir = join(siteDir, '.next');
  const appDir = join(nextDir, 'server', 'app');
  const sizeCache = new Map();
  const assetSize = (urlPath) => {
    if (!sizeCache.has(urlPath)) {
      const file = join(nextDir, 'static', urlPath.replace(/^\/_next\/static\//, ''));
      if (!existsSync(file)) sizeCache.set(urlPath, { raw: 0, gzip: 0 });
      else {
        const buf = readFileSync(file);
        sizeCache.set(urlPath, { raw: buf.length, gzip: gzipSync(buf, { level: 9 }).length });
      }
    }
    return sizeCache.get(urlPath);
  };

  const routes = {};
  for (const file of walk(appDir).filter((f) => f.endsWith('.html'))) {
    const rel = relative(appDir, file).split(sep).join('/').replace(/\.html$/, '');
    if (rel.startsWith('_global-error')) continue;
    const route = rel === 'index' ? '/' : `/${rel}`;
    const html = readFileSync(file, 'utf8');
    const js = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\s]+?\.js/g)].map((m) => m[0]))];
    const css = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\s]+?\.css/g)].map((m) => m[0]))];
    const sum = (list) =>
      list.reduce((acc, u) => ({ raw: acc.raw + assetSize(u).raw, gzip: acc.gzip + assetSize(u).gzip }), { raw: 0, gzip: 0 });
    const jsSize = sum(js);
    const cssSize = sum(css);
    routes[route] = {
      firstLoadJsFiles: js.length,
      firstLoadJsBytes: jsSize.raw,
      firstLoadJsGzipBytes: jsSize.gzip,
      cssBytes: cssSize.raw,
      cssGzipBytes: cssSize.gzip,
      htmlBytes: Buffer.byteLength(html),
    };
  }

  const staticFiles = walk(join(nextDir, 'static'));
  const total = (pred) => staticFiles.filter(pred).reduce((n, f) => n + statSync(f).size, 0);
  const nextVersion = JSON.parse(readFileSync(join(siteDir, 'node_modules', 'next', 'package.json'), 'utf8')).version;
  return {
    nextVersion,
    note: 'Next.js 16 does not print sizes in the build route table; measured from .next: JS/CSS referenced by each prerendered page (first load), gzip level 9. Dynamic routes (ƒ) have no prerendered HTML and are not listed.',
    totals: {
      staticBytes: total(() => true),
      staticJsBytes: total((f) => f.endsWith('.js')),
      staticCssBytes: total((f) => f.endsWith('.css')),
      staticMediaBytes: total((f) => f.includes(`${sep}media${sep}`)),
    },
    routes: Object.fromEntries(Object.entries(routes).sort(([a], [b]) => a.localeCompare(b))),
  };
}

export function compareBuild(baseline, current) {
  const lines = [];
  for (const [route, cur] of Object.entries(current.routes)) {
    const base = baseline.routes[route];
    if (!base) {
      lines.push(`  ${route}: new route, first-load JS ${(cur.firstLoadJsGzipBytes / 1024).toFixed(1)} KB gz`);
      continue;
    }
    const delta = cur.firstLoadJsGzipBytes - base.firstLoadJsGzipBytes;
    if (delta !== 0) {
      const pct = ((delta / base.firstLoadJsGzipBytes) * 100).toFixed(1);
      lines.push(`  ${route}: first-load JS ${delta > 0 ? '+' : ''}${(delta / 1024).toFixed(1)} KB gz (${pct}%)`);
    }
  }
  return lines;
}

// ---------------------------------------------------------------------------------------------
// Lighthouse (npm `lighthouse`, local Chrome). Each URL × preset runs N times (default: mobile 5,
// desktop 3) after one warm-up request; the median of each category score is kept. Localhost
// mobile performance scores swing by up to ~12 points between single runs (simulated throttling
// amplifies main-thread noise), so a drop > 5 is confirmed before it fails the gate: the failing
// URL × preset is measured again and judged on the median of all its runs.
// ---------------------------------------------------------------------------------------------

export const LH_CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
export const DEFAULT_LH_RUNS = { mobile: 5, desktop: 3 };

export function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = IS_WINDOWS
    ? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe']
    : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  return candidates.find((c) => existsSync(c));
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

/** Opens a Lighthouse session on local Chrome: { measure(url, preset, runs), close() }. */
async function openLighthouse() {
  const { default: lighthouse } = await import('lighthouse');
  const { default: desktopConfig } = await import('lighthouse/core/config/desktop-config.js');
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({
    chromePath: findChrome(),
    chromeFlags: ['--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions', ...(process.env.CI ? ['--no-sandbox'] : [])],
  });
  const env = { lighthouseVersion: null, chromeVersion: null };
  const measure = async (url, preset, runs) => {
    await fetch(url).catch(() => undefined); // warm server caches (ISR, image optimiser)
    const perRun = [];
    for (let i = 0; i < runs; i++) {
      const { lhr } = await lighthouse(
        url,
        { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: LH_CATEGORIES },
        preset === 'desktop' ? desktopConfig : undefined
      );
      env.lighthouseVersion = lhr.lighthouseVersion;
      env.chromeVersion = lhr.environment?.hostUserAgent?.match(/Chrome\/([\d.]+)/)?.[1] ?? null;
      perRun.push({
        scores: Object.fromEntries(LH_CATEGORIES.map((c) => [c, Math.round((lhr.categories[c]?.score ?? 0) * 100)])),
        metrics: {
          fcpMs: Math.round(lhr.audits['first-contentful-paint']?.numericValue ?? 0),
          lcpMs: Math.round(lhr.audits['largest-contentful-paint']?.numericValue ?? 0),
          tbtMs: Math.round(lhr.audits['total-blocking-time']?.numericValue ?? 0),
          cls: Number((lhr.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3)),
        },
      });
    }
    return perRun;
  };
  return { env, measure, close: () => chrome.kill() };
}

function aggregate(perRun) {
  const scores = Object.fromEntries(LH_CATEGORIES.map((c) => [c, median(perRun.map((r) => r.scores[c]))]));
  const metrics = Object.fromEntries(Object.keys(perRun[0].metrics).map((m) => [m, median(perRun.map((r) => r.metrics[m]))]));
  return { ...scores, metrics, runs: perRun };
}

const fmt = (r) => LH_CATEGORIES.map((c) => `${c}=${r[c]}`).join(' ');

export async function runLighthouse(baseUrl, paths, { runs = DEFAULT_LH_RUNS, presets = ['mobile', 'desktop'] } = {}) {
  const session = await openLighthouse();
  const summary = { lighthouseVersion: null, chromeVersion: null, runsPerUrl: runs, aggregation: 'median per category (warm-up request first)', results: {} };
  try {
    for (const preset of presets) {
      summary.results[preset] = {};
      for (const path of paths) {
        const result = aggregate(await session.measure(`${baseUrl}${path}`, preset, runs[preset] ?? 3));
        summary.results[preset][path] = result;
        log(`lighthouse ${preset.padEnd(7)} ${path.padEnd(18)} ${fmt(result)}`);
      }
    }
  } finally {
    Object.assign(summary, session.env);
    await session.close();
  }
  return summary;
}

/** Scores that dropped by more than `tolerance` points versus the baseline: [{preset, path, message}]. */
export function compareLighthouse(baseline, current, tolerance = 5) {
  const failures = [];
  for (const [preset, pages] of Object.entries(baseline.results)) {
    for (const [path, base] of Object.entries(pages)) {
      const cur = current.results[preset]?.[path];
      if (!cur) {
        failures.push({ preset, path, message: `${preset} ${path}: not measured` });
        continue;
      }
      for (const c of LH_CATEGORIES) {
        if (base[c] - cur[c] > tolerance) {
          failures.push({ preset, path, message: `${preset} ${path} ${c}: ${base[c]} -> ${cur[c]} (drop ${base[c] - cur[c]} > ${tolerance})` });
        }
      }
    }
  }
  return failures;
}

/**
 * Compare, and re-measure every failing URL × preset `extraRuns` more times before failing;
 * the verdict uses the median over all runs. Mutates `current` with the combined runs.
 */
export async function confirmLighthouse(baseUrl, baseline, current, { tolerance = 5, extraRuns = 5 } = {}) {
  const first = compareLighthouse(baseline, current, tolerance);
  const suspects = [...new Map(first.filter((f) => current.results[f.preset]?.[f.path]).map((f) => [`${f.preset} ${f.path}`, f])).values()];
  if (!suspects.length) return first.map((f) => f.message);
  log(`lighthouse: ${suspects.length} suspected drop(s); re-measuring with ${extraRuns} more runs each`);
  const session = await openLighthouse();
  try {
    for (const { preset, path } of suspects) {
      const prior = current.results[preset][path].runs;
      const more = await session.measure(`${baseUrl}${path}`, preset, extraRuns);
      current.results[preset][path] = aggregate([...prior, ...more]);
      log(`lighthouse ${preset.padEnd(7)} ${path.padEnd(18)} ${fmt(current.results[preset][path])} (median of ${prior.length + more.length})`);
    }
  } finally {
    await session.close();
  }
  return compareLighthouse(baseline, current, tolerance).map((f) => f.message);
}


export function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const [k, v] = a.slice(2).split('=');
    if (v !== undefined) flags[k] = v;
    else if (argv[i + 1] && !argv[i + 1].startsWith('--')) flags[k] = argv[++i];
    else flags[k] = true;
  }
  return flags;
}
