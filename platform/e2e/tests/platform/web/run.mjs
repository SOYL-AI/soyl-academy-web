#!/usr/bin/env node
/**
 * Platform web e2e (web-platform M1). Run from platform/:  npm run test:platform-web -w @soyl/e2e
 *
 *   1. next build with the platform flag ON (canonical env otherwise)
 *   2. Playwright `playwright.config.ts`: starts the real API locally (embedded Postgres, mock SMS/email/
 *      consent/Google OIDC, backend handoff recipe) + `next start`, runs the flows
 *   3. next build with the flag OFF (the production default)
 *   4. Playwright `flag-off.config.ts`: every platform route 404s, the marketing header has no Learn link
 *
 * Options: --skip-build (reuse .next for step 2 only), --on-only, --off-only, and any extra args are passed
 * to Playwright (e.g. --grep "guest").
 * The build in .next is left in the flag-OFF state at the end, so the marketing regression can follow.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { canonicalEnv, run, runPlaywright } from '../../../scripts/lib.mjs';
import { AUDIO_DIR, WEB_ENV_ON } from './env.mjs';

const here = import.meta.dirname;
const repoRoot = resolve(here, '../../../../..');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const passThrough = args.filter((a) => !['--skip-build', '--on-only', '--off-only'].includes(a));

function log(msg) {
  console.log(`[platform-web] ${msg}`);
}

async function build(env, label) {
  log(`next build (${label})…`);
  const code = await run('npx', ['next', 'build'], { cwd: repoRoot, env, logFile: resolve(here, `../../../test-results/platform-web/build-${label}.log`), quiet: true });
  if (code !== 0) throw new Error(`next build (${label}) failed, see test-results/platform-web/build-${label}.log`);
}

/**
 * Narration for one chapter (CBSE 10 Science ch01) from the pipeline's mock speech provider: valid, silent
 * Ogg Opus of the estimated length. The manifest is marked non-simulated so the local dev publish merges it
 * (it refuses mock audio by default); this is e2e-only data in test-results/, never committed or deployed.
 */
async function prepareAudio() {
  const manifest = resolve(AUDIO_DIR, 'out/cbse-10-science-ch01/audio.json');
  if (!existsSync(manifest)) {
    log('mock narration audio for cbse-10-science-ch01 (pipeline tts, mock speech)…');
    const env = { ...process.env, CONTENT_PIPELINE_OUT_DIR: resolve(AUDIO_DIR, 'out'), CONTENT_PIPELINE_STATE_DIR: resolve(AUDIO_DIR, 'state'), CONTENT_BLOB_DIR: resolve(AUDIO_DIR, 'blob') };
    const code = await run('npm', ['run', 'content', '--', 'tts', '--authored', '--board', 'cbse', '--class', '10', '--subject', 'science', '--chapter', '1', '--state', 'file'], {
      cwd: resolve(repoRoot, 'platform'),
      env,
      logFile: resolve(here, '../../../test-results/platform-web/tts.log'),
      quiet: true,
    });
    if (code !== 0) throw new Error('mock tts failed, see test-results/platform-web/tts.log');
  }
  const m = JSON.parse(readFileSync(manifest, 'utf8'));
  if (m.simulated) writeFileSync(manifest, JSON.stringify({ ...m, simulated: false }, null, 2));
}

/** ISR pages rendered by an earlier `next start` survive a rebuild in .next/server/route-cache: drop them. */
function clearRouteCache() {
  rmSync(resolve(repoRoot, '.next/server/route-cache'), { recursive: true, force: true });
}

let failed = false;
if (!flag('--off-only')) {
  await prepareAudio();
  if (!flag('--skip-build')) await build(canonicalEnv(WEB_ENV_ON), 'flag-on');
  clearRouteCache();
  log('Playwright: flows with the flag ON');
  const code = await runPlaywright(['-c', resolve(here, 'playwright.config.ts'), ...passThrough], {});
  failed ||= code !== 0;
}
if (!flag('--on-only')) {
  await build(canonicalEnv(), 'flag-off');
  clearRouteCache();
  log('Playwright: flag OFF');
  const code = await runPlaywright(['-c', resolve(here, 'flag-off.config.ts'), ...passThrough], {});
  failed ||= code !== 0;
}
log(failed ? 'FAILED' : 'PASSED');
process.exit(failed ? 1 : 0);
