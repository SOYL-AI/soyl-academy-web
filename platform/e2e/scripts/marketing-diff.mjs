#!/usr/bin/env node
// Differential marketing regression: OS-independent, for CI (Linux) where the committed
// Windows baselines cannot match pixel-for-pixel because fonts rasterise differently.
//
//   npm run marketing:diff -w @soyl/e2e -- [--base <git ref>] [--lighthouse] [--keep] [--skip-head-build]
//
// 1. base = merge-base(<--base, default origin/main, else main>, HEAD)
// 2. `git worktree add --detach` the base into a temp dir, `npm ci`, `npm run build`, `next start`
// 3. Playwright captures every marketing page there (same machine, same Chromium, same fonts)
//    into a temp snapshot dir. Pages that do not exist in the base are skipped in step 5.
// 4. `npm run build` + `next start` for the current checkout (HEAD + working tree)
// 5. Playwright compares HEAD against the base snapshots (zero tolerance) and runs the route
//    status suite (every marketing route 200, sitemap URLs 200, routes.ts complete)
// 6. --lighthouse: Lighthouse both builds; fail if any category drops > 5 points
//
// Exit 0 only when HEAD renders the marketing site identically to its merge-base with main.
// CI wiring (infra-azure, M1): checkout with fetch-depth: 0, setup-node 24, `npm ci` at the root
// and in platform/, `npx playwright install --with-deps chromium` in platform/e2e, then this script.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { LIGHTHOUSE_PATHS } from '../marketing/routes.ts';
import {
  REPO_ROOT,
  RESULTS_DIR,
  buildSite,
  DEFAULT_LH_RUNS,
  confirmLighthouse,
  log,
  parseArgs,
  run,
  runLighthouse,
  runPlaywright,
  startServer,
} from './lib.mjs';

const flags = parseArgs(process.argv.slice(2));
const git = (...args) => execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
const refExists = (ref) => {
  try {
    git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`);
    return true;
  } catch {
    return false;
  }
};

const baseRef = flags.base ?? (refExists('origin/main') ? 'origin/main' : 'main');
if (!refExists(baseRef)) {
  console.error(`base ref ${baseRef} not found (in CI, check out with fetch-depth: 0)`);
  process.exit(2);
}
const baseSha = git('merge-base', baseRef, 'HEAD');
const headSha = git('rev-parse', 'HEAD');
const workDir = resolve(flags['work-dir'] ?? join(tmpdir(), 'soyl-marketing-diff'));
const baseDir = join(workDir, 'base');
const snapshotDir = join(workDir, 'snapshots');
const skipFile = join(workDir, 'missing-in-base.txt');
const lhRuns = flags['lighthouse-runs'] ? { mobile: Number(flags['lighthouse-runs']), desktop: Number(flags['lighthouse-runs']) } : DEFAULT_LH_RUNS;
const basePort = Number(flags['base-port'] ?? 3201);
const headPort = Number(flags['head-port'] ?? 3202);

log(`differential regression: base ${baseSha.slice(0, 10)} (merge-base of ${baseRef}) vs HEAD ${headSha.slice(0, 10)} + working tree`);
mkdirSync(RESULTS_DIR, { recursive: true });

// Fresh work dir (and prune any worktree left by an aborted run).
if (existsSync(baseDir)) {
  try {
    git('worktree', 'remove', '--force', baseDir);
  } catch {
    rmSync(baseDir, { recursive: true, force: true });
  }
}
git('worktree', 'prune');
rmSync(workDir, { recursive: true, force: true });
mkdirSync(workDir, { recursive: true });

const failures = [];
let baseLighthouse;
try {
  // --- base -----------------------------------------------------------------------------------
  git('worktree', 'add', '--detach', baseDir, baseSha);
  log(`npm ci in base worktree ${baseDir}`);
  if ((await run('npm', ['ci', '--no-audit', '--no-fund'], { cwd: baseDir, logFile: join(RESULTS_DIR, 'diff-base-npm-ci.log'), quiet: true })) !== 0) {
    throw new Error('npm ci failed in the base worktree');
  }
  await buildSite(baseDir, join(RESULTS_DIR, 'diff-base-build.log'));
  const base = await startServer(baseDir, basePort);
  try {
    const code = await runPlaywright(['--project=mobile', '--project=desktop', '--update-snapshots=all'], {
      BASE_URL: base.url,
      MARKETING_SNAPSHOT_DIR: snapshotDir,
      MARKETING_CAPTURE_LENIENT: '1',
      MARKETING_SKIP_PAGES_FILE: skipFile,
    });
    if (code !== 0) throw new Error(`capturing the base build failed (exit ${code})`);
    if (flags.lighthouse) baseLighthouse = await runLighthouse(base.url, LIGHTHOUSE_PATHS, { runs: lhRuns });
  } finally {
    base.stop();
  }
  if (existsSync(skipFile)) log(`pages new since base (not compared): ${readFileSync(skipFile, 'utf8').split(/\r?\n/).filter(Boolean).join(', ')}`);

  // --- head -----------------------------------------------------------------------------------
  if (!flags['skip-head-build']) await buildSite(REPO_ROOT, join(RESULTS_DIR, 'diff-head-build.log'));
  const head = await startServer(REPO_ROOT, headPort);
  try {
    const code = await runPlaywright(['--update-snapshots=none'], {
      BASE_URL: head.url,
      MARKETING_SNAPSHOT_DIR: snapshotDir,
      MARKETING_SKIP_PAGES_FILE: skipFile,
      MARKETING_STATUS_OUT: join(RESULTS_DIR, 'route-status.json'),
    });
    if (code !== 0) failures.push(`HEAD differs from base or a route check failed (exit ${code}); report: platform/e2e/test-results/html/index.html`);
    if (flags.lighthouse) {
      const headLighthouse = await runLighthouse(head.url, LIGHTHOUSE_PATHS, { runs: lhRuns });
      failures.push(...(await confirmLighthouse(head.url, baseLighthouse, headLighthouse)).map((f) => `Lighthouse ${f}`));
    }
  } finally {
    head.stop();
  }
} catch (err) {
  failures.push(err instanceof Error ? err.message : String(err));
} finally {
  if (!flags.keep) {
    try {
      git('worktree', 'remove', '--force', baseDir);
    } catch {
      /* already gone */
    }
    rmSync(workDir, { recursive: true, force: true });
  } else log(`kept ${workDir}`);
}

if (failures.length) {
  log('differential marketing regression FAILED:');
  for (const f of failures) log(`  - ${f}`);
  process.exit(1);
}
log('differential marketing regression PASSED: HEAD renders the marketing site identically to its merge-base');
