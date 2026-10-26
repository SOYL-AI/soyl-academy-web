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
import { resolve } from 'node:path';
import { canonicalEnv, run, runPlaywright } from '../../../scripts/lib.mjs';
import { WEB_ENV_ON } from './env.mjs';

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

let failed = false;
if (!flag('--off-only')) {
  if (!flag('--skip-build')) await build(canonicalEnv(WEB_ENV_ON), 'flag-on');
  log('Playwright: flows with the flag ON');
  const code = await runPlaywright(['-c', resolve(here, 'playwright.config.ts'), ...passThrough], {});
  failed ||= code !== 0;
}
if (!flag('--on-only')) {
  await build(canonicalEnv(), 'flag-off');
  log('Playwright: flag OFF');
  const code = await runPlaywright(['-c', resolve(here, 'flag-off.config.ts'), ...passThrough], {});
  failed ||= code !== 0;
}
log(failed ? 'FAILED' : 'PASSED');
process.exit(failed ? 1 : 0);
