import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Design-system 2026-10-29: the dev art sheet (/dev/ui/art) in light and dark. Every drawing renders, axe finds no
 * serious issue, 360 px does not scroll sideways, and the desktop run writes the owner screenshots to
 * docs/platform/design/avatars-assets/ ({light,dark}-{avatars,badges,crests,subjects,empty}.png).
 */
const DOCS = resolve(import.meta.dirname, '../../../../../docs/platform/design/avatars-assets');
mkdirSync(DOCS, { recursive: true });

for (const theme of ['light', 'dark'] as const) {
  test(`art sheet (${theme}): 64 avatars, 12 badges × 2, 6 crests, 15 subject tiles, 6 empty states; axe; screenshots`, async ({ page, baseURL }, info) => {
    const foreign: string[] = [];
    const origin = new URL(baseURL!).origin;
    page.on('request', (r) => {
      const u = r.url();
      if (!u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith('blob:')) foreign.push(u);
    });
    await page.context().addCookies([{ name: 'soyl_theme', value: theme, url: baseURL! }]);
    const res = await page.goto('/dev/ui/art', { waitUntil: 'networkidle' });
    expect(res?.status()).toBe(200);
    await expect(page.locator('#soyl-platform-root')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('[data-testid="sheet-avatars"] li')).toHaveCount(64);
    await expect(page.locator('[data-testid="sheet-avatars"] svg[data-art]')).toHaveCount(64 * 3);
    await expect(page.locator('[data-testid="sheet-badges"] svg[data-art^="badge-"]')).toHaveCount(24);
    await expect(page.locator('[data-testid="sheet-crests"] svg[data-art^="crest-"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="sheet-subjects"] svg[data-art^="subject-"]')).toHaveCount(15);
    await expect(page.locator('[data-testid="sheet-empty"] svg[data-art^="empty-"]')).toHaveCount(6);
    await expect(page.locator('[data-testid="art-sheet"] img')).toHaveCount(0);

    const axe = await new AxeBuilder({ page }).include('[data-testid="art-sheet"]').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => v.id)).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(foreign).toEqual([]);

    if (info.project.name === 'desktop-1280') {
      for (const section of ['avatars', 'badges', 'crests', 'subjects', 'empty'] as const) {
        await page.locator(`#${section}`).screenshot({ path: resolve(DOCS, `${theme}-${section}.png`) });
      }
    }
  });
}
