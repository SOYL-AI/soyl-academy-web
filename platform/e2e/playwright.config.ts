import { resolve } from 'node:path';
import { defineConfig } from '@playwright/test';

/**
 * Marketing regression. Normally launched by scripts/marketing.mjs (or marketing-diff.mjs),
 * which builds the site, starts `next start` and sets BASE_URL. Running `playwright test`
 * directly needs a server on BASE_URL already (e.g. `npm run build && npm run start` at the
 * repo root, then BASE_URL=http://localhost:3000).
 *
 * Snapshots: marketing-baseline/screenshots/<os>/<project>/<page>.png. Baselines are
 * OS-specific because font rasterisation differs between Windows and Linux; CI uses the
 * differential mode instead (see docs/platform/REPO_MAP.md section 9).
 */

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:3100';
const snapshotRoot = process.env.MARKETING_SNAPSHOT_DIR ?? resolve(import.meta.dirname, 'marketing-baseline', 'screenshots');

export default defineConfig({
  testDir: './marketing',
  outputDir: './test-results/playwright',
  snapshotPathTemplate: `${snapshotRoot.replace(/\\/g, '/')}/{platform}/{projectName}/{arg}{ext}`,
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 90_000,
  reporter: [['list'], ['html', { outputFolder: './test-results/html', open: 'never' }]],
  expect: {
    timeout: 30_000,
    toHaveScreenshot: {
      // Zero tolerance: any changed pixel fails.
      threshold: 0,
      maxDiffPixels: 0,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    // Bundled Chromium (pinned by the @playwright/test version) so pixels do not drift with Chrome updates.
    browserName: 'chromium',
  },
  projects: [
    {
      name: 'mobile',
      testMatch: /visual\.spec\.ts/,
      use: { viewport: { width: 360, height: 800 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
    },
    {
      name: 'desktop',
      testMatch: /visual\.spec\.ts/,
      use: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
    },
    {
      name: 'routes',
      testMatch: /status\.spec\.ts/,
    },
  ],
});
