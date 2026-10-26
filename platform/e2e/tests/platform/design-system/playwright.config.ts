import { resolve } from 'node:path';
import { defineConfig } from '@playwright/test';

/**
 * Platform design-system e2e (gallery at /dev/ui): axe, 360 px layout, Devanagari font, XSS corpus
 * in a real browser. Separate from the marketing regression config on purpose.
 *
 * The gallery 404s in production builds, so this starts `next dev` at the repo root with the
 * platform flag on. Run from platform/:
 *   npx playwright test -c e2e/tests/platform/design-system/playwright.config.ts
 * or: npm run test:design-system -w @soyl/e2e
 */

const repoRoot = resolve(import.meta.dirname, '../../../../..');
const port = Number(process.env.DS_PORT ?? 3310);
const baseURL = process.env.DS_BASE_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: '.',
  outputDir: resolve(import.meta.dirname, '../../../test-results/design-system/playwright'),
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  timeout: 240_000,
  expect: { timeout: 30_000 },
  reporter: [['list'], ['html', { outputFolder: resolve(import.meta.dirname, '../../../test-results/design-system/html'), open: 'never' }]],
  use: {
    baseURL,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    browserName: 'chromium',
    navigationTimeout: 180_000,
  },
  projects: [
    { name: 'mobile-360', use: { viewport: { width: 360, height: 800 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
    { name: 'desktop-1280', use: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 } },
  ],
  webServer: process.env.DS_BASE_URL
    ? undefined
    : {
        command: `npx next dev --port ${port} --hostname 127.0.0.1`,
        cwd: repoRoot,
        url: `${baseURL}/dev/ui`,
        timeout: 240_000,
        reuseExistingServer: false,
        stdout: 'ignore',
        stderr: 'pipe',
        env: { NEXT_PUBLIC_PLATFORM_ENABLED: 'true', NEXT_TELEMETRY_DISABLED: '1' },
      },
});
