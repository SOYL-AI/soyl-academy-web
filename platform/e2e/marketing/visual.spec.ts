import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { MARKETING_PAGES } from './routes';
import { preparePage, stabilisePage } from './stabilise';

/**
 * Full-page screenshots of every marketing page, compared pixel-for-pixel (threshold 0,
 * maxDiffPixels 0, set in playwright.config.ts) with the committed baseline.
 *
 * Differential mode (scripts/marketing-diff.mjs) captures the merge-base build into a
 * temporary snapshot directory first; pages that did not exist there are appended to
 * MARKETING_SKIP_PAGES_FILE during that capture and skipped in the comparison run.
 */

const lenientCapture = process.env.MARKETING_CAPTURE_LENIENT === '1';
const skipFile = process.env.MARKETING_SKIP_PAGES_FILE;
const skipped = new Set<string>(
  skipFile && existsSync(skipFile) ? readFileSync(skipFile, 'utf8').split(/\r?\n/).filter(Boolean) : []
);

for (const p of MARKETING_PAGES) {
  test(`${p.name} ${p.path}`, async ({ page }) => {
    test.skip(!lenientCapture && skipped.has(p.name), `${p.path} did not exist in the base build`);
    await preparePage(page, { consent: true });
    const response = await page.goto(p.path, { waitUntil: 'networkidle' });
    const status = response?.status() ?? 0;
    if (lenientCapture && status !== p.status) {
      if (skipFile) appendFileSync(skipFile, `${p.name}\n`);
      test.skip(true, `${p.path} returned ${status} in the base build`);
    }
    expect(status, `${p.path} status`).toBe(p.status);
    await stabilisePage(page);
    await expect(page).toHaveScreenshot(`${p.name}.png`, { fullPage: true });
  });
}

// First visit: the cookie bar is part of what every new visitor sees.
test('home first visit (cookie bar)', async ({ page }) => {
  await preparePage(page, { consent: false });
  await page.goto('/', { waitUntil: 'networkidle' });
  await stabilisePage(page);
  await expect(page.locator('.cookie-bar')).toBeVisible();
  await expect(page).toHaveScreenshot('home-first-visit.png', { fullPage: false });
});
