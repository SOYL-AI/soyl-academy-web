import { resolve } from 'node:path';
import { defineConfig } from '@playwright/test';
// @ts-ignore -- plain ESM module shared with run.mjs
import { FLAG_OFF_PORT } from './env.mjs';

/**
 * GEN-4: with the platform flag OFF (the production default) every platform route is a 404 and the
 * marketing header has no Learn link. Needs a `.next` built with the canonical (flag-off) env; run.mjs does that.
 */
const repoRoot = resolve(import.meta.dirname, '../../../../..');
const origin = `http://localhost:${FLAG_OFF_PORT}`;

export default defineConfig({
  testDir: '.',
  // marketing-nav.spec.ts runs in both suites and adapts to the flag (ADR-025).
  testMatch: /(flag-off|marketing-nav)\.spec\.ts$/,
  outputDir: resolve(import.meta.dirname, '../../../test-results/platform-web/playwright-flag-off'),
  workers: 1,
  forbidOnly: true,
  retries: 0,
  reporter: [['list']],
  use: { baseURL: origin, browserName: 'chromium', viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true },
  webServer: {
    command: `npx next start --port ${FLAG_OFF_PORT} --hostname localhost`,
    cwd: repoRoot,
    url: `${origin}/`,
    timeout: 120_000,
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'pipe',
    // No platform env at all: the canonical production default.
    env: { NEXT_TELEMETRY_DISABLED: '1', NEXT_PUBLIC_PLATFORM_ENABLED: '', PLATFORM_API_ORIGIN: '', PLATFORM_EDGE_SECRET: '' },
  },
});
