import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, signInWithEmail, test } from './fixtures';
import { checkPage, signUp } from './m34-helpers';

/**
 * Progress (/me/progress, design language v3 §10, ADR-032): members only (guests get the /me-style log-in prompt
 * that returns here), one h1, every section for a student with activity, a calm welcome for a brand-new one, the
 * platform nonce CSP (it is under /me), no horizontal scroll at 360 px in light and dark, and the ways in: the link
 * on Home, the sidebar (≥ 1024 px, current page) and the phone tab bar (Home stays lit). Progress radar (2026-11-14):
 * the player card section (#card) with its attribute radar (blank until rated) and the subject bars/radar; radar
 * labels stay inside the chart at 360 px.
 */
const CH01 = 'cbse-10-science-ch01';

async function setTheme(page: Page, baseURL: string | undefined, value: 'light' | 'dark') {
  await page.context().addCookies([{ name: 'soyl_theme', value, url: baseURL! }]);
}

/** Class + a few practice answers through the API (first try with option 1; a wrong try then the revealed key). */
/** Radar axis labels that leave their chart's box (clipped or overflowing at narrow widths). */
async function labelsOutside(page: Page, testId: string): Promise<string[]> {
  return page.getByTestId(testId).evaluate((fig) => {
    const box = fig.getBoundingClientRect();
    return [...fig.querySelectorAll('[data-axis]')]
      .filter((l) => {
        const r = l.getBoundingClientRect();
        return r.left < box.left - 0.5 || r.right > box.right + 0.5 || r.top < box.top - 0.5 || r.right > window.innerWidth;
      })
      .map((l) => l.textContent ?? '');
  });
}

async function practise(page: Page, count: number) {
  const origin = new URL(page.url()).origin;
  const headers = { origin, 'content-type': 'application/json' };
  expect((await page.request.patch('/api/platform/v1/me', { data: { board: 'cbse', classLevel: 10 }, headers })).status()).toBe(200);
  const list = (await (await page.request.get(`/api/platform/v1/chapters/${CH01}/practice?type=mcq`)).json()) as { items: { question: { id: string; version: number; type: string; options: { id: string }[] } }[] };
  const qs = list.items.map((x) => x.question).filter((q) => q.type === 'mcq').slice(0, count);
  for (const q of qs) {
    const post = async (ids: string[]) =>
      (await (await page.request.post('/api/platform/v1/practice/answers', { data: { questionId: q.id, version: q.version, response: { option_ids: ids } }, headers })).json()) as {
        correct: boolean | null;
        key?: { answer?: { option_ids?: string[] } };
      };
    const r = await post([q.options[0]!.id]);
    if (r.correct !== true) await post(r.key?.answer?.option_ids ?? [q.options[1]!.id]);
  }
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

test.describe('Progress (/me/progress)', () => {
  test('guests: the log-in prompt, axe + 360 px; logging in from it comes back here', async ({ page, baseURL }) => {
    await page.context().setExtraHTTPHeaders({ 'x-real-ip': '198.51.100.201' });
    for (const theme of ['light', 'dark'] as const) {
      await setTheme(page, baseURL, theme);
      await page.goto('/me/progress', { waitUntil: 'networkidle' });
      await expect(page.getByTestId('progress-guest')).toBeVisible();
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText('Your progress');
      await checkPage(page);
      expect(await page.evaluate(() => window.innerWidth)).toBe(360);
    }
    // The nonce CSP of the platform pages (the proxy matcher covers /me/:path*).
    const res = await page.request.get('/me/progress');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-security-policy']).toMatch(/'nonce-[^']+'/);
    await page.getByTestId('progress-login').click();
    await signInWithEmail(page, `e2e-progress-guest-${Date.now().toString(36)}@example.com`);
    await expect(page).toHaveURL(/\/me\/progress$/);
    await expect(page.getByTestId('progress')).toBeVisible();
  });

  test('a brand-new member: one calm welcome, no zero stats; the way in from Home', async ({ page }) => {
    await signUp(page, 'progress-new', '/learn');
    await expect(page).toHaveURL(/\/me\/dashboard$/);
    await page.getByTestId('progress-link').click();
    await expect(page).toHaveURL(/\/me\/progress$/);
    await expect(page.getByTestId('progress')).toHaveAttribute('data-new', 'true');
    await expect(page.getByTestId('progress-empty')).toBeVisible();
    await expect(page.getByTestId('kpi-solved')).toHaveCount(0);
    await expect(page.getByTestId('heatmap')).toHaveCount(0);
    await expect(page.getByTestId('weekly-goal')).toContainText('20 new questions a week');
    await expect(page.locator('h1')).toHaveCount(1);
    await checkPage(page);
    // Phones: Home stays lit on Progress (ADR-032 tab bar), Me does not.
    const tabs = page.getByRole('navigation', { name: 'Learning platform' });
    await expect(tabs.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    await expect(tabs.getByRole('link', { name: 'Me', exact: true })).not.toHaveAttribute('aria-current', /.*/);
  });

  test('a member with practice: every section, light and dark, 360 and 1280 px; the sidebar link is current', async ({ page, baseURL }) => {
    test.setTimeout(6 * 60_000);
    await signUp(page, 'progress', '/me');
    await practise(page, 4);
    await page.goto('/me/progress', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('progress')).not.toHaveAttribute('data-new', /.*/);
    for (const id of ['card-section', 'kpi-solved', 'subjects-section', 'mastery-tile', 'tests-tile', 'difficulty-tile', 'focus-tile', 'activity-card', 'recent-tile', 'weekly-goal', 'badge-tile']) {
      await expect(page.getByTestId(id), id).toBeVisible();
    }
    // The card moved from the rail to the first section (#card). Four answers are not a rating yet: the blank card and
    // a dashed hexagon with the six attribute names, no numbers. One subject: a bar, not a radar.
    await expect(page.getByTestId('card-preview')).toHaveCount(0);
    await expect(page.locator('#card')).toHaveText('Your player card');
    await expect(page.getByTestId('card-radar')).toHaveAttribute('data-blank', 'true');
    await expect(page.getByTestId('card-radar').locator('[data-axis]')).toHaveCount(6);
    expect(await page.getByTestId('card-radar').innerText()).not.toMatch(/\d/);
    await expect(page.getByTestId('player-card-blank')).toContainText('Solve 10 questions to get rated');
    await expect(page.getByTestId('subjects-bars')).toContainText('Science');
    await expect(page.locator('a[href="/me#card"]')).toHaveCount(0);
    await expect(page.getByTestId('tests-empty')).toBeVisible();
    await expect(page.getByRole('list', { name: 'Mastery by subject' })).toContainText('Science');
    await expect(page.locator('h1')).toHaveCount(1);
    // No "N of 7,537" style denominators anywhere on the page.
    expect(await page.locator('main, #platform-content').first().innerText()).not.toMatch(/of [1-9]\d?,\d{3}\b/);

    for (const theme of ['light', 'dark'] as const) {
      await setTheme(page, baseURL, theme);
      for (const width of [360, 1280]) {
        await page.setViewportSize({ width, height: width === 360 ? 800 : 900 });
        await page.goto('/me/progress', { waitUntil: 'networkidle' });
        await expect(page.locator('#soyl-platform-root')).toHaveAttribute('data-theme', theme);
        await expect(page.getByTestId('kpi-solved')).toBeVisible();
        expect(await labelsOutside(page, 'card-radar'), `${theme} ${width}`).toEqual([]);
        await checkPage(page);
        expect(await page.evaluate(() => window.innerWidth), `${theme} ${width}`).toBe(width);
      }
    }

    // ≥ 1024 px: the sidebar's Progress link is the current page and Home is not; it navigates from Home.
    await page.setViewportSize({ width: 1280, height: 900 });
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar.getByRole('link', { name: 'Progress', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(sidebar.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute('aria-current', /.*/);
    await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
    await sidebar.getByRole('link', { name: 'Progress', exact: true }).click();
    await expect(page).toHaveURL(/\/me\/progress$/);
    await expect(page.getByTestId('progress')).toBeVisible();
  });
});
