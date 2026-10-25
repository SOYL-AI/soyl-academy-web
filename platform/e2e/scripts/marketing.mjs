#!/usr/bin/env node
// Marketing-site baseline and regression (ARCHITECTURE §17, AGENTS.md §7 "Marketing protection").
//
//   npm run marketing:baseline   -w @soyl/e2e   re-capture the committed baseline (OWNER-APPROVED ONLY)
//   npm run marketing:regression -w @soyl/e2e   fail on any visual diff, any route status change,
//                                                or a Lighthouse category drop > 5 points
// Options:
//   --skip-build        reuse the existing production build in <repo>/.next
//   --skip-lighthouse   visual + status only (faster; not a full gate)
//   --lighthouse-runs N runs per URL × preset, median kept (default mobile 5, desktop 3)
//   --port N            port for `next start` (default 3100)
//
// Steps: npm run build (repo root, canonical env: platform flags off) → next start →
// Playwright (mobile 360×800 + desktop 1280×800 full-page screenshots, route status) →
// Lighthouse (mobile + desktop) → build-size report → stop server.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LIGHTHOUSE_PATHS } from '../marketing/routes.ts';
import {
  BASELINE_DIR,
  REPO_ROOT,
  RESULTS_DIR,
  buildSite,
  compareBuild,
  DEFAULT_LH_RUNS,
  confirmLighthouse,
  log,
  measureBuild,
  parseArgs,
  runLighthouse,
  runPlaywright,
  startServer,
} from './lib.mjs';

const mode = process.argv[2];
if (mode !== 'baseline' && mode !== 'regression') {
  console.error('usage: node scripts/marketing.mjs <baseline|regression> [--skip-build] [--skip-lighthouse] [--lighthouse-runs N] [--port N]');
  process.exit(2);
}
const flags = parseArgs(process.argv.slice(3));
const port = Number(flags.port ?? 3100);
const lhRuns = flags['lighthouse-runs'] ? { mobile: Number(flags['lighthouse-runs']), desktop: Number(flags['lighthouse-runs']) } : DEFAULT_LH_RUNS;
const baseline = mode === 'baseline';
const outDir = baseline ? BASELINE_DIR : RESULTS_DIR;
mkdirSync(outDir, { recursive: true });
mkdirSync(RESULTS_DIR, { recursive: true });

const writeJson = (file, data) => writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const failures = [];

if (baseline) {
  log('BASELINE MODE: this overwrites the committed marketing baseline. Only run it for an');
  log('owner-approved marketing change, and commit the result with that approval noted.');
}

// 1. Build
if (!flags['skip-build']) await buildSite(REPO_ROOT, join(RESULTS_DIR, 'build.log'));
const build = measureBuild(REPO_ROOT);
writeJson(join(outDir, 'build-output.json'), build);
if (!baseline && existsSync(join(BASELINE_DIR, 'build-output.json'))) {
  const lines = compareBuild(readJson(join(BASELINE_DIR, 'build-output.json')), build);
  log(lines.length ? `build size changes (informational):\n${lines.join('\n')}` : 'build size: first-load JS unchanged on every route');
}

// 2. Serve
const server = await startServer(REPO_ROOT, port);
try {
  // 3. Visual + status
  if (baseline) rmSync(join(BASELINE_DIR, 'screenshots', process.platform), { recursive: true, force: true });
  const pwCode = await runPlaywright([`--update-snapshots=${baseline ? 'all' : 'none'}`], {
    BASE_URL: server.url,
    MARKETING_STATUS_OUT: join(outDir, 'route-status.json'),
  });
  if (pwCode !== 0) failures.push(`Playwright (visual/status) failed with exit ${pwCode}; report: platform/e2e/test-results/html/index.html`);

  // 4. Lighthouse
  if (!flags['skip-lighthouse']) {
    const summary = await runLighthouse(server.url, LIGHTHOUSE_PATHS, { runs: lhRuns });
    if (!baseline) {
      const lhBaseline = join(BASELINE_DIR, 'lighthouse.json');
      if (!existsSync(lhBaseline)) failures.push('no Lighthouse baseline (marketing-baseline/lighthouse.json)');
      else failures.push(...(await confirmLighthouse(server.url, readJson(lhBaseline), summary)).map((f) => `Lighthouse ${f}`));
    }
    writeJson(join(outDir, 'lighthouse.json'), summary);
  } else if (!baseline) {
    log('Lighthouse skipped (--skip-lighthouse): this run is NOT a complete marketing gate.');
  }
} finally {
  server.stop();
}

if (failures.length) {
  log(`FAILED (${mode}):`);
  for (const f of failures) log(`  - ${f}`);
  process.exit(1);
}
log(baseline ? `baseline written to ${BASELINE_DIR}` : 'marketing regression PASSED: no visual diffs, all routes as expected, Lighthouse within 5 points');
