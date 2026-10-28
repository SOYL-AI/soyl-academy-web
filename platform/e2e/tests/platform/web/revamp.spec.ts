import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Locator, Page } from '@playwright/test';
import { acceptAllCookies, expect, test } from './fixtures';
import { checkPage, grantConsent, signUp } from './m34-helpers';

/**
 * ADR-023 (UI revamp): the platform's own app shell, the Light / Dark / System theme (persisted, applied before
 * first paint, nonce CSP intact, marketing untouched), dark-theme accessibility at 360 px, the LeetCode-style
 * practice list, and the before/after screenshots for the owner (test-results/platform-web/revamp/).
 */
const OUT = resolve(import.meta.dirname, '../../../test-results/platform-web/revamp');
mkdirSync(OUT, { recursive: true });

const CH01 = '/learn/cbse/10/science/ch01';
const DARK_BG = 'rgb(22, 23, 26)'; // --p-bg (dark)
const LIGHT_BG = 'rgb(245, 246, 248)'; // --p-bg (light)

const root = (page: Page) => page.locator('#soyl-platform-root');
const bg = (l: Locator) => l.evaluate((el) => getComputedStyle(el).backgroundColor);

async function setThemeCookie(page: Page, baseURL: string | undefined, value: 'light' | 'dark' | 'system') {
  await page.context().addCookies([{ name: 'soyl_theme', value, url: baseURL! }]);
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

/**
 * Tests that also open marketing pages: analytics declined, so the marketing page loads no Vercel scripts (the
 * fixture fails on any /_vercel/ request; platform pages never load them either way).
 */
async function essentialCookiesOnly(page: Page) {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem('soyl_cookie_consent_v1', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() }));
    } catch {
      // ignore
    }
  });
}

test.describe('ADR-023 app shell', () => {
  test('platform pages have their own shell (no marketing header/footer); the cookie bar and legal links stay', async ({ page }) => {
    await essentialCookiesOnly(page);
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await expect(page.locator('#mobile-menu')).toHaveCount(0); // the marketing header's menu
    await expect(page.getByRole('link', { name: 'Book a demo' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'SOYL Academy, learning home' })).toHaveAttribute('href', '/learn');
    const tabs = page.getByRole('navigation', { name: 'Learning platform' });
    await expect(tabs).toHaveCount(1); // 360 px: the tab bar (the desktop nav is hidden)
    await expect(tabs.getByRole('link', { name: 'Learn' })).toHaveAttribute('aria-current', 'page');
    await expect(tabs.getByRole('link', { name: 'Me' })).toHaveAttribute('href', '/me');
    const footer = page.locator('#platform-content ~ footer');
    for (const name of ['Privacy', 'Terms', 'soylai.com']) await expect(footer.getByRole('link', { name })).toBeVisible();
    await footer.getByRole('button', { name: 'Cookie preferences' }).click();
    await expect(page.getByRole('heading', { name: 'Cookies' })).toBeVisible();
    await page.getByRole('button', { name: 'Save choices' }).click();
    await expect(page.getByRole('heading', { name: 'Cookies' })).toBeHidden();
    await checkPage(page);

    // Back to the main site: the marketing header and footer are there again, the platform theme is gone.
    await footer.getByRole('link', { name: 'soylai.com' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('#mobile-menu')).toHaveCount(1);
    await expect(page.locator('html')).not.toHaveAttribute('data-platform-theme', /.*/);
  });

  test('immersive pages (lesson) hide the tab bar; the top bar stays', async ({ page }) => {
    await page.goto(`${CH01}/lesson`, { waitUntil: 'networkidle' });
    await expect(page.getByTestId('slide-player')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Learning platform' })).toHaveCount(0);
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });
});

test.describe('ADR-023 theme', () => {
  test('Light / Dark / System: picked in the top bar, persisted across reloads, applied before first paint', async ({ page, baseURL }) => {
    await essentialCookiesOnly(page);
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await expect(root(page)).toHaveAttribute('data-theme', 'light');
    expect(await bg(root(page))).toBe(LIGHT_BG);

    await page.getByTestId('theme-toggle').click();
    await page.getByRole('radio', { name: 'Dark' }).check();
    await expect(root(page)).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('html')).toHaveAttribute('data-platform-theme', 'dark');
    expect(await bg(root(page))).toBe(DARK_BG);
    expect((await page.context().cookies()).find((c) => c.name === 'soyl_theme')?.value).toBe('dark');
    await page.keyboard.press('Escape');

    await page.reload({ waitUntil: 'networkidle' });
    await expect(root(page)).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('data-theme-pref', 'dark');

    // No flash: with every app script blocked, the inline boot script alone has themed the page (ISR page:
    // static CSP; /me: nonce CSP, the boot script is allowed by its hash; the fixture fails on any violation).
    await page.route('**/_next/static/**/*.js', (r) => r.abort());
    for (const path of ['/learn/cbse/10/science', '/me']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(root(page)).toHaveAttribute('data-theme', 'dark');
      expect(await bg(root(page)), path).toBe(DARK_BG);
      expect(await bg(page.locator('body')), path).toBe(DARK_BG);
    }
    await page.unroute('**/_next/static/**/*.js');

    // System follows the operating system, live.
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await page.getByTestId('theme-toggle').click();
    await page.getByRole('radio', { name: 'System' }).check();
    await page.keyboard.press('Escape');
    await expect(root(page)).toHaveAttribute('data-theme', 'light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(root(page)).toHaveAttribute('data-theme', 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(root(page)).toHaveAttribute('data-theme', 'light');
    expect((await page.context().cookies()).find((c) => c.name === 'soyl_theme')?.value).toBe('system');

    // Marketing pages are never themed by the platform (they stay exactly as they are).
    await setThemeCookie(page, baseURL, 'dark');
    await page.goto('/about', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).not.toHaveAttribute('data-platform-theme', /.*/);
    expect(await bg(page.locator('body'))).toBe('rgb(255, 255, 255)');
  });

  test('dark theme: platform pages pass axe (AA contrast) and fit 360 px', async ({ page, baseURL }) => {
    test.setTimeout(4 * 60_000);
    await setThemeCookie(page, baseURL, 'dark');
    for (const path of ['/learn', '/learn/cbse/10', '/learn/cbse/10/science', CH01, `${CH01}/practice`, `${CH01}/notes`, '/learn/cbse/10/hindi-a/ch02/notes', '/me', '/leaderboard', '/tests', '/store']) {
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(root(page), path).toHaveAttribute('data-theme', 'dark');
      await checkPage(page);
    }
  });
});

test.describe('ADR-023 practice list', () => {
  test('summary, list behind a toggle on phones, difficulty and status filters, solved status, keyboard', async ({ page }) => {
    await page.goto(`${CH01}/practice`, { waitUntil: 'networkidle' });
    const summary = page.getByTestId('solved-count');
    await expect(summary).toHaveAttribute('data-solved', '0');
    const list = page.getByTestId('problem-list');
    await expect(list).toBeHidden();
    await page.getByTestId('list-toggle').click();
    await expect(list).toBeVisible();
    const rows = page.getByTestId('problem-row');
    // The whole chapter loads in the background (25 a page).
    await expect.poll(() => rows.count(), { timeout: 30_000 }).toBeGreaterThan(25);
    await checkPage(page);

    // Difficulty filter (server-side): only Easy rows.
    await page.getByRole('checkbox', { name: /^Easy/ }).check();
    await expect(page.getByTestId('practice-position')).toContainText('(filtered from');
    await expect.poll(async () => (await rows.evaluateAll((els) => els.map((e) => e.getAttribute('data-band')))).every((b) => b === 'easy')).toBe(true);
    await page.getByRole('checkbox', { name: /^Easy/ }).uncheck();

    // Answer a multiple-choice question right (with the key revealed after a wrong first try): it is solved.
    await page.getByText('Filter questions').click();
    await page.getByRole('checkbox', { name: /^Multiple choice/ }).check();
    const card = page.locator('article[data-question-type="mcq"]').first();
    await expect(card).toBeVisible();
    const qid = await card.getAttribute('data-question-id');
    const ids = await card.locator('[data-option-id]').evaluateAll((els) => els.map((e) => e.getAttribute('data-option-id')!));
    await card.locator(`[data-option-id="${ids[0]}"] input`).check();
    const answer = async () => {
      const res = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/practice/answers') && r.request().method() === 'POST');
      await card.getByRole('button', { name: 'Check answer' }).click();
      return (await (await res).json()) as { correct: boolean; key: { answer: { option_ids: string[] } } };
    };
    let r = await answer();
    if (!r.correct) {
      await card.getByRole('button', { name: 'Try again' }).click();
      await card.locator(`[data-option-id="${r.key.answer.option_ids[0]}"] input`).check();
      r = await answer();
    }
    expect(r.correct).toBe(true);
    const current = page.locator('[data-testid="problem-row"][aria-current="true"]');
    await expect(current).toHaveAttribute('data-status', 'solved');
    await expect(summary).toHaveAttribute('data-solved', '1');

    // Status filter (client-side): Solved shows just that one; New keeps the open question listed.
    await page.getByRole('radio', { name: 'Solved' }).check();
    await expect(rows).toHaveCount(1);
    await page.getByRole('radio', { name: 'New' }).check();
    expect(await rows.evaluateAll((els) => els.filter((e) => e.getAttribute('aria-current') !== 'true').every((e) => e.getAttribute('data-status') === 'new'))).toBe(true);
    await page.getByRole('radio', { name: 'All' }).check();
    await checkPage(page);

    // Desktop: split view, J / K move through the list.
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(list).toBeVisible();
    await expect(page.getByTestId('list-toggle')).toBeHidden();
    await page.locator('h1').click();
    const pos = page.getByTestId('practice-position');
    const before = (await pos.textContent()) ?? '';
    await page.keyboard.press('j');
    await expect(pos).not.toHaveText(before);
    await page.keyboard.press('k');
    await expect(pos).toHaveText(before);
    expect(await page.locator(`article[data-question-id="${qid}"]`).count()).toBe(1);
  });
});

/* ── Screenshots for the owner (desktop 1280 / mobile 360 × light / dark) ─────────────────────────────── */

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 360, height: 800 },
] as const;

async function shots(page: Page, baseURL: string | undefined, name: string, path: string) {
  for (const theme of ['light', 'dark'] as const) {
    await setThemeCookie(page, baseURL, theme);
    for (const v of VIEWPORTS) {
      await page.setViewportSize({ width: v.width, height: v.height });
      await page.goto(path, { waitUntil: 'load' });
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
      await expect(root(page)).toHaveAttribute('data-theme', theme);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      await page.screenshot({ path: resolve(OUT, `${v.name}-${theme}-${name}.png`), fullPage: v.name === 'mobile' ? false : true });
    }
  }
}

test.describe('ADR-023 screenshots', () => {
  for (const [name, path] of [
    ['learn', '/learn'],
    ['class', '/learn/cbse/10'],
    ['subject', '/learn/cbse/10/science'],
    ['chapter', CH01],
    ['practice', `${CH01}/practice`],
    ['lesson', `${CH01}/lesson`],
    ['notes-hindi', '/learn/cbse/10/hindi-a/ch02/notes'],
    ['store', '/store'],
  ] as const) {
    test(`guest page: ${name}`, async ({ page, baseURL }) => {
      test.setTimeout(4 * 60_000);
      await shots(page, baseURL, name, path);
    });
  }

  test('member pages: dashboard, profile with card and heatmap, league', async ({ page, baseURL }) => {
    test.setTimeout(15 * 60_000);
    await signUp(page, 'revamp', '/me');
    await page.getByLabel('Board').selectOption('cbse');
    await page.getByLabel('Class', { exact: true }).selectOption('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Profile saved')).toBeVisible();
    await grantConsent(page);
    // A little practice so mastery, the heatmap and the card have something to show.
    await page.goto(`${CH01}/practice`, { waitUntil: 'networkidle' });
    for (let i = 0; i < 3; i++) {
      const card = page.locator('article[data-question-type="mcq"], article[data-question-type="true-false"], article[data-question-type="assertion-reason"]').first();
      if (!(await card.count())) {
        await page.getByTestId('next-question').click();
        continue;
      }
      await card.locator('[data-option-id] input').first().check();
      await card.getByRole('button', { name: 'Check answer' }).click();
      await expect(card.getByTestId('question-result')).toBeVisible();
      await page.getByTestId('next-question').click();
    }
    for (const [name, path] of [
      ['dashboard', '/learn'],
      ['me', '/me'],
      ['leaderboard', '/leaderboard'],
      ['practice-member', `${CH01}/practice`],
      ['chapter-member', CH01],
    ] as const)
      await shots(page, baseURL, name, path);
  });
});
