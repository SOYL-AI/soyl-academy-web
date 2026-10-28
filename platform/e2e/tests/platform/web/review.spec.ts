import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, test } from './fixtures';
import { checkPage, grantConsent, signUp } from './m34-helpers';

/**
 * Lead review of the live site (2026-10-28) and the owner's "way back to the main site": the top bar fits at
 * every width (guests and the widest member bar), one page container lines up with the top bar, /tests lists
 * subjects with tests first with true badges, school-only chapters are one final group (page and sidebar), the
 * sidebar keeps the current chapter in view, /plans prices, and a spot-check of the changed pages at 360 and
 * 1280 px in light and dark (screenshots: test-results/platform-web/review/).
 */
const OUT = resolve(import.meta.dirname, '../../../test-results/platform-web/review');
mkdirSync(OUT, { recursive: true });

const SUBJECT = '/learn/cbse/10/science';
const WIDTHS = [360, 420, 480, 600, 768, 900, 1024, 1100, 1280, 1440] as const;
const root = (page: Page) => page.locator('#soyl-platform-root');

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

/** Elements of the top bar that pass the right edge, and how far the bar's row overflows. */
async function topBar(page: Page) {
  return page.evaluate(() => {
    const bar = document.querySelector('#soyl-platform-root header')!;
    const inner = bar.lastElementChild as HTMLElement;
    const w = document.documentElement.clientWidth;
    const out = Array.from(bar.querySelectorAll<HTMLElement>('*'))
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > w + 0.5;
      })
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
    return { overflow: inner.scrollWidth - inner.clientWidth, out, height: bar.getBoundingClientRect().height };
  });
}

async function shellFits(page: Page, path: string, waitForTestId?: string) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 800 });
    // Resizing the same page is enough (CSS breakpoints); load it once, then wait for the session to settle.
    if (width === WIDTHS[0]) await page.goto(path, { waitUntil: 'load' });
    await expect(page.locator('#soyl-platform-root header [data-session]')).not.toHaveAttribute('data-session', 'loading');
    if (waitForTestId) await expect(page.getByTestId(waitForTestId)).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const r = await topBar(page);
    expect(r, `top bar at ${width}px`).toEqual({ overflow: 0, out: [], height: r.height });
    expect(r.height, `top bar height at ${width}px (one row)`).toBeLessThan(70);
    // Exactly one way to navigate: the bottom tabs below 1024 px, the top-bar nav from 1024 px.
    await expect(page.getByRole('navigation', { name: 'Learning platform' }), `${width}px`).toHaveCount(1);
    // The way back to the main site is always on screen.
    await expect(page.getByRole('link', { name: 'Back to soylai.com, the SOYL main website' }), `${width}px`).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${width}px`).toBeLessThanOrEqual(0);
  }
}

test.describe('Lead review: shell and layout', () => {
  test('guests: the top bar fits on one row from 360 to 1280 px', async ({ page }) => {
    test.setTimeout(4 * 60_000);
    await shellFits(page, SUBJECT);
  });

  test('members with every chip (streak, coins, AI credits, Home in the nav): the top bar still fits', async ({ page }) => {
    test.setTimeout(5 * 60_000);
    await signUp(page, 'topbar', '/me');
    await grantConsent(page);
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('credit-chip')).toBeVisible();
    await shellFits(page, '/me/dashboard', 'credit-chip');
  });

  test('one page container: content lines up with the top bar on every page (1280 px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const path of ['/learn', '/learn/cbse/10', SUBJECT, `${SUBJECT}/ch01`, '/tests', '/ask', '/plans', '/leaderboard', '/me/dashboard']) {
      await page.goto(path, { waitUntil: 'networkidle' });
      const [bar, content] = await page.evaluate(() => {
        const left = (el: Element) => el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
        return [left(document.querySelector('#soyl-platform-root header')!.lastElementChild!), left(document.querySelector('#platform-content')!.firstElementChild!)];
      });
      expect(Math.abs(bar - content), `${path}: content left ${content} vs top bar ${bar}`).toBeLessThanOrEqual(1);
    }
  });

  test('/plans: no tab is lit on phones; Free shows ₹0; one-time prices keep a normal hyphen', async ({ page }) => {
    await page.goto('/plans', { waitUntil: 'networkidle' });
    const tabs = page.getByRole('navigation', { name: 'Learning platform' });
    await expect(tabs.locator('[aria-current="page"]')).toHaveCount(0);
    await expect(page.getByTestId('price-free')).toHaveText('₹0');
    const pass = page.getByTestId('price-board_exam_pass');
    if (await pass.count()) await expect(pass).toContainText(/₹[\d,]+ one-time/);
    await expect(page.locator('[data-plan="free"] h2')).toHaveText(/^Free/);
    await checkPage(page);
  });
});

test.describe('Lead review: content pages', () => {
  test('/tests: subjects with tests first with true badges; the rest under a collapsed "coming soon"', async ({ page }) => {
    await page.goto('/tests', { waitUntil: 'networkidle' });
    const ready = page.getByTestId('subject-list');
    await expect(ready).toBeVisible();
    const readyCards = ready.locator('a');
    expect(await readyCards.count()).toBeGreaterThan(0);
    // Every ready subject carries a badge that is true (full series or a test count).
    for (const text of await readyCards.allTextContents()) expect(text).toMatch(/Full series|\d+ (chapter )?tests?/);
    await expect(readyCards.filter({ hasText: 'Science' }).first()).toHaveAttribute('data-has-tests', 'true');
    const more = page.getByTestId('more-subjects');
    await expect(more).not.toHaveAttribute('open', /.*/);
    await expect(more.locator('a').first()).toBeHidden();
    await more.locator('summary').click();
    await expect(more.getByRole('link', { name: /Sanskrit/ }).first()).toBeVisible();
    await expect(more.getByText('Full series')).toHaveCount(0);
    expect(await more.locator('[data-has-tests]').count()).toBe(0);
    await checkPage(page);
  });

  test('subject page and sidebar: school-only chapters are one final group; units are not repeated', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(SUBJECT, { waitUntil: 'networkidle' });
    const chapters = page.locator('section[aria-labelledby="chapters-title"]');
    const unitHeads = await chapters.locator('h3').allTextContents();
    const names = unitHeads.map((t) => t.replace(/\d+ chapters?$/, '').trim());
    expect(new Set(names).size, `unit headings: ${names.join(' | ')}`).toBe(names.length);
    expect(names.at(-1)).toBe('School assessment only (not in board exam)');
    const sidebar = page.getByTestId('course-sidebar');
    const sideUnits = await sidebar.locator('p').allTextContents();
    expect(new Set(sideUnits).size, `sidebar units: ${sideUnits.join(' | ')}`).toBe(sideUnits.length);
    expect(sideUnits.at(-1)).toBe('School assessment only (not in board exam)');
    await checkPage(page);
  });

  test('chapter page (desktop): the sidebar scrolls on its own and shows the current chapter', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const last = await page.request.get('/api/platform/v1/catalog/subjects/cbse-10-science/chapters');
    const ids = ((await last.json()) as { chapters: { id: string }[] }).chapters.map((c) => c.id);
    const lastId = ids.at(-1)!;
    await page.goto(`${SUBJECT}/${lastId.slice(-4)}`, { waitUntil: 'networkidle' });
    const sidebar = page.getByTestId('course-sidebar');
    const box = (await sidebar.boundingBox())!;
    expect(box.y + box.height).toBeLessThanOrEqual(720);
    const current = sidebar.locator('li [aria-current="page"]');
    await expect(current).toBeVisible();
    const cur = (await current.boundingBox())!;
    expect(cur.y, 'current chapter inside the sidebar').toBeGreaterThanOrEqual(box.y);
    expect(cur.y + cur.height, 'current chapter inside the sidebar').toBeLessThanOrEqual(box.y + box.height);
    const scrollable = await sidebar.evaluate((el) => el.scrollHeight > el.clientHeight && getComputedStyle(el).overflowY === 'auto');
    expect(scrollable).toBe(true);
  });
});

/* ── Spot-check of the changed pages: 360 / 1280 × light / dark, no overflow, screenshots ───────────────── */

const SPOT = [
  ['learn', '/learn'],
  ['class', '/learn/cbse/10'],
  ['subject', SUBJECT],
  ['chapter', `${SUBJECT}/ch01`],
  ['practice', `${SUBJECT}/ch01/practice`],
  ['tests', '/tests'],
  ['leaderboard-guest', '/leaderboard'],
  ['ask', '/ask'],
  ['plans', '/plans'],
] as const;

test.describe('Lead review: spot-check', () => {
  for (const [name, path] of SPOT) {
    test(`${name}: 360 and 1280 px, light and dark, no horizontal overflow`, async ({ page, baseURL }) => {
      test.setTimeout(3 * 60_000);
      for (const theme of ['light', 'dark'] as const) {
        await page.context().addCookies([{ name: 'soyl_theme', value: theme, url: baseURL! }]);
        for (const v of [
          { name: 'mobile', width: 360, height: 800 },
          { name: 'desktop', width: 1280, height: 900 },
        ] as const) {
          await page.setViewportSize({ width: v.width, height: v.height });
          await page.goto(path, { waitUntil: 'load' });
          await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
          await expect(root(page)).toHaveAttribute('data-theme', theme);
          await page.evaluate(() => document.fonts.ready);
          expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${path} ${v.name} ${theme}`).toBeLessThanOrEqual(0);
          if (v.name === 'mobile') expect(await page.evaluate(() => window.innerWidth), `${path} layout viewport`).toBe(360);
          await page.waitForTimeout(300);
          await page.screenshot({ path: resolve(OUT, `${v.name}-${theme}-${name}.png`), fullPage: v.name === 'desktop' });
        }
      }
      await checkPage(page);
    });
  }
});
