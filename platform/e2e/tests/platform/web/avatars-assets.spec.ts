import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, test } from './fixtures';
import { checkPage, grantConsent, signUp } from './m34-helpers';

/**
 * Design-system 2026-10-29: avatars and the D-044 credits UI against the real local API.
 * - pick an unlocked avatar and background on /me → the top bar and the dashboard show it;
 * - a locked avatar cannot be saved (the picker refuses; the API answers 403 avatar_locked);
 * - the credit guide opens from the header chip; the 14-day history on /me;
 * - axe and 360 px (no sideways scroll) in light and dark; owner screenshots in docs/platform/design/avatars-assets/;
 * - first-load JS of the pages this work touched stays ≤ 200 KB gz.
 */
const DOCS = resolve(import.meta.dirname, '../../../../../docs/platform/design/avatars-assets');
mkdirSync(DOCS, { recursive: true });
const root = (page: Page) => page.locator('#soyl-platform-root');

async function setTheme(page: Page, baseURL: string | undefined, value: 'light' | 'dark') {
  await page.context().addCookies([{ name: 'soyl_theme', value, url: baseURL! }]);
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

async function openPicker(page: Page) {
  await page.goto('/me#avatar', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('avatar-picker')).toBeVisible();
}

test('avatar: pick an unlocked one → top bar and dashboard; a locked one cannot be saved; axe + 360 px light and dark', async ({ page, baseURL }) => {
  test.setTimeout(6 * 60_000);
  await signUp(page, 'avatar', '/learn');
  await expect(page).toHaveURL(/\/me\/dashboard$/);
  const topAvatar = page.getByTestId('profile-link').locator('[data-avatar]');
  await expect(topAvatar).toHaveAttribute('data-avatar', /^[a-z]+$/);
  const before = (await topAvatar.getAttribute('data-avatar'))!;
  // The top bar shows one static image, not the drawing set.
  await expect(topAvatar.locator('img')).toHaveAttribute('src', new RegExp(`^/me/avatars/${before}\\.v\\d+\\.svg$`));
  const img = await page.request.get((await topAvatar.locator('img').getAttribute('src'))!);
  expect(img.status()).toBe(200);
  expect(img.headers()['content-type']).toMatch(/^image\/svg\+xml/);
  expect(img.headers()['cache-control']).toContain('immutable');

  await openPicker(page);
  const pickId = before === 'panda' ? 'koala' : 'panda';
  await page.locator(`[data-avatar-option="${pickId}"]`).click();
  await page.getByRole('radio', { name: 'Ocean' }).check({ force: true });
  await expect(page.getByTestId('avatar-save')).toBeEnabled();
  const saved = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me') && r.request().method() === 'PATCH');
  await page.getByTestId('avatar-save').click();
  expect((await saved).status()).toBe(200);
  await expect(topAvatar).toHaveAttribute('data-avatar', pickId);
  await expect(topAvatar).toHaveAttribute('data-bg', 'ocean');

  await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('dashboard-avatar').locator('[data-avatar]')).toHaveAttribute('data-avatar', pickId);
  await expect(page.getByTestId('profile-link').locator('[data-avatar]')).toHaveAttribute('data-avatar', pickId);

  // Locked (level 8): the picker previews it but will not save; the API refuses it too. The animal in the
  // student's random public name is always unlocked, so use the other level-8 animal when the name has Moose.
  await openPicker(page);
  const locked = /Moose/.test((await page.getByTestId('avatar-preview-name').textContent()) ?? '') ? 'pelican' : 'moose';
  await page.locator(`[data-avatar-option="${locked}"]`).click();
  await expect(page.getByTestId('avatar-save')).toBeDisabled();
  await expect(page.getByTestId('avatar-locked-note')).toContainText("Reach level 8 — you're level 1");
  const refused = await page.evaluate(async (id) => {
    const r = await fetch('/api/platform/v1/me', { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ avatar: { id, bg: 'sky' } }) });
    return { status: r.status, body: (await r.json()) as { code?: string } };
  }, locked);
  expect(refused.status).toBe(403);
  expect(refused.body.code).toBe('avatar_locked');

  for (const theme of ['light', 'dark'] as const) {
    await setTheme(page, baseURL, theme);
    await openPicker(page);
    await expect(root(page)).toHaveAttribute('data-theme', theme);
    await page.locator(`[data-avatar-option="${locked}"]`).click();
    await checkPage(page);
    expect(await page.evaluate(() => window.innerWidth)).toBe(360);
    await page.getByTestId('avatar-card').screenshot({ path: resolve(DOCS, `mobile-${theme}-picker.png`) });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByTestId('avatar-card').screenshot({ path: resolve(DOCS, `desktop-${theme}-picker.png`) });
    await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
    await checkPage(page);
    await page.screenshot({ path: resolve(DOCS, `desktop-${theme}-dashboard.png`) });
    await page.setViewportSize({ width: 360, height: 800 });
  }

  // Back to the default.
  await openPicker(page);
  await page.getByTestId('avatar-reset').click();
  await expect(page.getByTestId('profile-link').locator('[data-avatar]')).toHaveAttribute('data-avatar', before);
});

test('credits: the guide opens from the header chip; bonuses, history and the dashboard tile; axe + 360 px light and dark', async ({ page, baseURL }) => {
  test.setTimeout(6 * 60_000);
  await signUp(page, 'guide', '/learn');
  await grantConsent(page);
  for (const theme of ['light', 'dark'] as const) {
    await setTheme(page, baseURL, theme);
    await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
    await expect(root(page)).toHaveAttribute('data-theme', theme);
    await expect(page.getByTestId('credits-tile')).toBeVisible();
    await expect(page.getByTestId('credits-tile')).toContainText('+10 AI credits for hitting today\'s practice goal');

    await page.getByTestId('credit-chip').click();
    const dialog = page.getByRole('dialog', { name: 'What can I do with my credits?' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('guide-left-quick-doubt')).toContainText('≈ 50 left today');
    await expect(dialog.getByTestId('guide-left-hard-doubt')).toContainText('≈ 7 left today');
    await expect(dialog.getByTestId('guide-left-paper-from-upload')).toContainText('Part of the Pro and Board Exam Pass plans');
    await expect(dialog.getByTestId('credit-bonuses')).toContainText('Solve 10 practice questions today: 0 of 10 so far.');
    await checkPage(page);
    await page.screenshot({ path: resolve(DOCS, `mobile-${theme}-credit-guide.png`) });
    await page.setViewportSize({ width: 1280, height: 900 });
    await dialog.screenshot({ path: resolve(DOCS, `desktop-${theme}-credit-guide.png`) });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    await page.goto('/me#credits', { waitUntil: 'networkidle' });
    const history = page.getByTestId('credit-history');
    await expect(history).toBeVisible();
    await expect(history.getByRole('img')).toHaveAttribute('aria-label', /^Last 14 days: \d+ credits received/);
    await history.getByText('Show as a table').click();
    await expect(page.getByTestId('credit-history-table').locator('tbody tr')).toHaveCount(14);
    await checkPage(page);
    await page.getByTestId('credits').screenshot({ path: resolve(DOCS, `mobile-${theme}-credit-history.png`) });
  }
});

test('JS budget: pages with new art and credits UI stay ≤ 200 KB gz first load', async ({ baseURL }) => {
  test.setTimeout(10 * 60_000);
  const out = resolve(import.meta.dirname, '../../../test-results/platform-web/bundle-avatars.json');
  const pages = ['me', 'dashboard', 'leaderboard', 'test player', 'test result', 'lesson', 'practice', 'learn', 'class (challenge)', 'subject', 'plans', 'ask', 'live mock'];
  const output = execFileSync(process.execPath, [resolve(import.meta.dirname, 'bundle.mjs'), '--base', baseURL!, '--json', out, '--only', pages.join(',')], { encoding: 'utf8' });
  console.log(output);
  expect(output).toContain('PASSED');
});
