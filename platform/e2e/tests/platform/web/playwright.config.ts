import { resolve } from 'node:path';
import { defineConfig } from '@playwright/test';
// @ts-ignore -- plain ESM module shared with run.mjs
import { API_ENV, API_ORIGIN, WEB_ENV_ON, WEB_ORIGIN, WEB_PORT } from './env.mjs';

/**
 * Platform web flows (web-platform M1) against the real local API + mock providers and a production
 * `next start` built with the platform flag ON. Use `run.mjs` (npm run test:platform-web -w @soyl/e2e),
 * which builds first.
 */
const repoRoot = resolve(import.meta.dirname, '../../../../..');
const platformRoot = resolve(repoRoot, 'platform');

export default defineConfig({
  testDir: '.',
  testMatch: /(?<!flag-off)\.spec\.ts$/,
  outputDir: resolve(import.meta.dirname, '../../../test-results/platform-web/playwright'),
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { outputFolder: resolve(import.meta.dirname, '../../../test-results/platform-web/html'), open: 'never' }]],
  use: {
    baseURL: WEB_ORIGIN,
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    browserName: 'chromium',
    reducedMotion: 'reduce',
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  },
  projects: [{ name: 'mobile-360' }],
  webServer: [
    {
      command: 'npm run dev -w @soyl/api',
      cwd: platformRoot,
      url: `${API_ORIGIN}/healthz`,
      timeout: 300_000,
      reuseExistingServer: false,
      stdout: 'ignore',
      stderr: 'pipe',
      env: API_ENV,
    },
    {
      command: `npx next start --port ${WEB_PORT} --hostname localhost`,
      cwd: repoRoot,
      url: `${WEB_ORIGIN}/learn`,
      timeout: 120_000,
      reuseExistingServer: false,
      stdout: 'ignore',
      stderr: 'pipe',
      env: WEB_ENV_ON,
    },
  ],
});
