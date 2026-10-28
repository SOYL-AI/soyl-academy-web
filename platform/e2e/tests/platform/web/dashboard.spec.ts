import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, openLoginFromHeader, signInWithEmail, test, uniqueEmail } from './fixtures';
import { authoredQuestions, checkPage, grantConsent, signUp, startCh02Short } from './m34-helpers';

/**
 * D-043: the student dashboard (/me/dashboard, short link /dashboard) and the school + weekly goal on /me.
 * Real local API (GET /v1/me/dashboard, /v1/schools, PATCH /v1/me), the default landing after login, axe and
 * 360 px (layout viewport too) in light and dark, the consent gate on the school, and the owner screenshots
 * (test-results/platform-web/dashboard/{desktop,mobile}-{light,dark}-dashboard.png).
 */
const OUT = resolve(import.meta.dirname, '../../../test-results/platform-web/dashboard');
mkdirSync(OUT, { recursive: true });

const CH01 = '/learn/cbse/10/science/ch01';
const root = (page: Page) => page.locator('#soyl-platform-root');

async function setTheme(page: Page, baseURL: string | undefined, value: 'light' | 'dark') {
  await page.context().addCookies([{ name: 'soyl_theme', value, url: baseURL! }]);
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

/** Solves one multiple-choice question in CH01 practice (a wrong first try reveals the key). */
async function solveOneMcq(page: Page, skip = 0) {
  await page.goto(`${CH01}/practice`, { waitUntil: 'networkidle' });
  await page.getByText('Filter questions').click();
  await page.getByRole('checkbox', { name: /^Multiple choice/ }).check();
  for (let i = 0; i < skip; i++) await page.getByTestId('next-question').click();
  const card = page.locator('article[data-question-type="mcq"]').first();
  await expect(card).toBeVisible();
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
}

const CH02_KEYS = authoredQuestions('science', 'cbse-10-science-ch02');

/** Starts the CBSE 10 Science ch02 short test, answers the first 4 questions (choice ones right) and submits. */
async function takeShortTest(page: Page) {
  await startCh02Short(page);
  for (let i = 0; i < 4; i++) {
    const article = page.locator('article[data-question-id]').first();
    const id = (await article.getAttribute('data-question-id'))!;
    const key = CH02_KEYS.get(id)?.answer as { option_ids?: string[] } | undefined;
    if (key?.option_ids?.[0]) await article.locator(`[data-option-id="${key.option_ids[0]}"] input`).check();
    await page.getByTestId('next-question').click();
    await expect(page.locator(`article[data-question-id="${id}"]`)).toHaveCount(0);
  }
  await page.getByTestId('submit-open').click();
  await page.getByTestId('confirm-submit').click();
  await page.waitForURL(/\/tests\/result\/[0-9a-f-]{36}$/);
  await expect(page.getByTestId('score')).toBeVisible();
}

async function setClass(page: Page) {
  const prompt = page.getByTestId('prompt-class');
  await expect(prompt).toBeVisible();
  await prompt.getByLabel('Board').selectOption('cbse');
  await prompt.getByLabel('Class').selectOption('10');
  const reload = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me/dashboard') && r.status() === 200);
  await prompt.getByTestId('prompt-class-save').click();
  await reload;
  await expect(page.getByTestId('prompt-class')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-profile-line')).toHaveText(/^CBSE Class 10/);
}

test.describe('D-043 dashboard', () => {
  test('default landing: logging in from /learn opens the dashboard; /dashboard is a short link to it', async ({ page }) => {
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await openLoginFromHeader(page);
    await signInWithEmail(page, uniqueEmail('landing'));
    await expect(page).toHaveURL(/\/me\/dashboard$/);
    await expect(page.getByTestId('dashboard')).toBeVisible();
    // Home is the first tab for members and is the current page; still five tabs.
    const tabs = page.getByRole('navigation', { name: 'Learning platform' });
    await expect(tabs.getByRole('listitem')).toHaveCount(5);
    await expect(tabs.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    await expect(tabs.getByRole('link', { name: 'Me', exact: true })).not.toHaveAttribute('aria-current', /.*/);

    const short = await page.request.get('/dashboard', { maxRedirects: 0 });
    expect(short.status()).toBe(307);
    expect(short.headers().location).toMatch(/\/me\/dashboard$/);
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/me\/dashboard$/);
    // The page itself carries the platform nonce CSP (it is under /me).
    const res = await page.request.get('/me/dashboard');
    expect(res.headers()['content-security-policy']).toMatch(/'nonce-[^']+'/);
  });

  test('guests: a sign-in prompt with this device’s progress; logging in from it comes back to the dashboard', async ({ page, baseURL }) => {
    for (const theme of ['light', 'dark'] as const) {
      await setTheme(page, baseURL, theme);
      await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
      await expect(root(page)).toHaveAttribute('data-theme', theme);
      await expect(page.getByTestId('dashboard-guest')).toBeVisible();
      await expect(page.getByTestId('device-progress')).toBeVisible();
      await checkPage(page);
      expect(await page.evaluate(() => window.innerWidth)).toBe(360);
    }
    await page.getByTestId('dashboard-login').click();
    await signInWithEmail(page, uniqueEmail('dash-guest'));
    await expect(page).toHaveURL(/\/me\/dashboard$/);
    await expect(page.getByTestId('dashboard')).toBeVisible();
  });

  test('sign up, set the class, practise: solved, accuracy, difficulty, goal, activity and recent show it; axe + 360 px light and dark', async ({ page, baseURL }) => {
    test.setTimeout(8 * 60_000);
    await signUp(page, 'dash', '/learn');
    await expect(page).toHaveURL(/\/me\/dashboard$/);

    // Brand-new account: empty states and the class prompt (no consent yet: the approval link, no school prompt).
    const dash = page.getByTestId('dashboard');
    await expect(dash).toHaveAttribute('data-new', 'true');
    await expect(page.getByTestId('dashboard-welcome')).toBeVisible();
    await expect(page.getByTestId('kpi-solved')).toHaveAttribute('data-value', '0');
    await expect(page.getByTestId('prompt-school-consent')).toBeVisible();
    await expect(page.getByTestId('prompt-school')).toHaveCount(0);
    await expect(page.getByTestId('league-locked')).toBeVisible();
    await checkPage(page);
    await setClass(page);

    await solveOneMcq(page);
    await solveOneMcq(page, 1);

    await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
    await expect(dash).not.toHaveAttribute('data-new', /.*/);
    const solved = Number(await page.getByTestId('kpi-solved').getAttribute('data-value'));
    expect(solved).toBeGreaterThanOrEqual(1);
    await expect(page.getByTestId('kpi-accuracy')).not.toHaveAttribute('data-value', '–');
    expect(Number(await page.getByTestId('difficulty-chart').getAttribute('data-solved'))).toBe(solved);
    await expect(page.getByTestId('weekly-goal')).toHaveAttribute('data-progress', String(solved));
    await expect(page.getByTestId('kpi-active')).toHaveAttribute('data-value', '1/7');
    await expect(page.getByTestId('recent-row').first()).toHaveAttribute('data-kind', 'practice');
    await expect(page.getByTestId('heatmap')).toBeVisible();
    await expect(page.getByTestId('heatmap').getByRole('img')).toHaveAttribute('aria-label', /^Activity heatmap: 1 active day/);
    await expect(page.getByTestId('dashboard-streak')).toContainText('1 day streak');

    // Weekly goal: change it on the dashboard; the ring follows.
    const goal = page.getByTestId('weekly-goal');
    await goal.getByTestId('goal-change').click();
    await goal.getByLabel('Questions to solve each week').fill('3');
    await goal.getByTestId('goal-save').click();
    await expect(goal.getByText('Choose a goal from 5 to 300 questions.')).toBeVisible();
    await goal.getByLabel('Questions to solve each week').fill('5');
    const patch = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me') && r.request().method() === 'PATCH');
    await goal.getByTestId('goal-save').click();
    expect((await patch).status()).toBe(200);
    await expect(goal).toHaveAttribute('data-target', '5');
    await page.reload({ waitUntil: 'networkidle' });
    await expect(goal).toHaveAttribute('data-target', '5');

    for (const theme of ['light', 'dark'] as const) {
      await setTheme(page, baseURL, theme);
      await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
      await expect(root(page)).toHaveAttribute('data-theme', theme);
      await expect(page.getByTestId('kpis')).toBeVisible();
      await checkPage(page);
      expect(await page.evaluate(() => window.innerWidth), theme).toBe(360);
    }

    // /learn for members: continue + the way to the dashboard (the metrics moved there).
    await page.goto('/learn', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('continue-card')).toBeVisible();
    await expect(page.getByTestId('dashboard-link')).toHaveAttribute('href', '/me/dashboard');
    await expect(page.getByTestId('heatmap')).toHaveCount(0);
  });

  test('school on the profile: consented accounts search, add, see it on the dashboard and remove it', async ({ page }) => {
    test.setTimeout(5 * 60_000);
    await signUp(page, 'school', '/me');
    await grantConsent(page);
    await page.goto('/me', { waitUntil: 'networkidle' });
    const section = page.getByTestId('school-setting');
    await expect(section).toBeVisible();
    await expect(section).toContainText('never shown to other students');

    // Search as you type (debounced): a name nobody has added yet.
    const name = `Zephyr ${uniqueEmail('s').slice(4, 14).replace(/[^a-z]/g, '')} Public School`;
    const searched = page.waitForResponse((r) => r.url().includes('/api/platform/v1/schools?') && r.status() === 200);
    await section.getByLabel('Find your school').fill(name.split(' ').slice(0, 2).join(' '));
    await searched;
    await expect(section.getByTestId('school-no-results')).toBeVisible();
    await checkPage(page);

    // Add it: browser validation first, then find-or-create.
    await section.getByTestId('school-add').click();
    const form = section.getByTestId('school-add-form');
    await form.getByLabel(/School name/).fill('Call 9876543210 School');
    await form.getByLabel(/City or town/).fill('Pune');
    await form.getByTestId('school-save').click();
    await expect(form).toContainText('must not contain phone or roll numbers');
    await form.getByLabel(/School name/).fill(name);
    await form.getByLabel('State (optional)').selectOption('Maharashtra');
    const saved = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me') && r.request().method() === 'PATCH');
    await form.getByTestId('school-save').click();
    expect((await saved).status()).toBe(200);
    await expect(section.getByTestId('school-current')).toContainText(name);
    await expect(section.getByTestId('school-current')).toContainText('Pune, Maharashtra');
    await checkPage(page);

    // The creator finds it again by search; the dashboard shows it in the profile line.
    await section.getByRole('button', { name: 'Change school' }).click();
    await section.getByLabel('Find your school').fill(name.split(' ').slice(0, 2).join(' '));
    await expect(section.getByTestId('school-option').filter({ hasText: name })).toBeVisible();
    await section.getByRole('button', { name: 'Cancel' }).click();
    await page.goto('/me/dashboard', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('dashboard-profile-line')).toContainText(`${name}, Pune`);
    await expect(page.getByTestId('prompt-school-consent')).toHaveCount(0);

    // Remove it.
    await page.goto('/me', { waitUntil: 'networkidle' });
    await section.getByTestId('school-remove').click();
    await expect(section.getByTestId('school-search')).toBeVisible();
    const me = await (await page.request.get('/api/platform/v1/me')).json();
    expect(me.school).toBeNull();
  });

  test('school without consent: one line and the approval link; no school request is ever made', async ({ page }) => {
    const schoolCalls: string[] = [];
    page.on('request', (r) => {
      if (r.url().includes('/api/platform/v1/schools') || (r.url().endsWith('/api/platform/v1/me') && r.method() === 'PATCH' && (r.postData() ?? '').includes('school'))) schoolCalls.push(r.url());
    });
    await signUp(page, 'school-none', '/me');
    await expect(page.getByTestId('school-locked')).toBeVisible();
    await expect(page.getByTestId('school-locked').getByRole('link', { name: 'Turn on extra features' })).toHaveAttribute('href', '/me/consent?next=%2Fme');
    await expect(page.getByTestId('school-search')).toHaveCount(0);
    await expect(page.getByLabel('Find your school')).toHaveCount(0);
    // The weekly goal is for everyone.
    await expect(page.getByTestId('profile-weekly-goal')).toContainText('20 questions a week (default)');
    await checkPage(page);
    expect(schoolCalls).toEqual([]);
    // The API refuses a school without consent anyway (D-014).
    const res = await page.request.patch('/api/platform/v1/me', { data: { school: { name: 'Good School', city: 'Pune' } }, headers: { origin: new URL(page.url()).origin } });
    expect(res.status()).toBe(403);
  });
});

/* ── Owner screenshots: desktop 1280 (full page) / mobile 360 (first screen) × light / dark ───────────── */

test.describe('D-043 screenshots', () => {
  test('dashboard with a little real activity', async ({ page, baseURL }) => {
    test.setTimeout(10 * 60_000);
    await signUp(page, 'dash-shots', '/me');
    await page.getByLabel('Display name').fill('Asha');
    await page.getByLabel('Board').selectOption('cbse');
    await page.getByLabel('Class', { exact: true }).selectOption('10');
    await page.getByRole('button', { name: 'Save' }).first().click();
    await expect(page.getByText('Profile saved')).toBeVisible();
    await grantConsent(page);
    await page.goto('/me', { waitUntil: 'networkidle' });
    const section = page.getByTestId('school-setting');
    await section.getByTestId('school-add').click();
    const form = section.getByTestId('school-add-form');
    await form.getByLabel(/School name/).fill('Sunrise Public School');
    await form.getByLabel(/City or town/).fill('Pune');
    await form.getByTestId('school-save').click();
    await expect(section.getByTestId('school-current')).toBeVisible();
    await solveOneMcq(page);
    await solveOneMcq(page, 1);
    await solveOneMcq(page, 2);
    await takeShortTest(page);

    for (const theme of ['light', 'dark'] as const) {
      await setTheme(page, baseURL, theme);
      for (const v of [
        { name: 'desktop', width: 1280, height: 900 },
        { name: 'mobile', width: 360, height: 800 },
      ] as const) {
        await page.setViewportSize({ width: v.width, height: v.height });
        for (const [shot, path] of [
          ['dashboard', '/me/dashboard'],
          ['learn-member', '/learn'],
          ['me', '/me'],
        ] as const) {
          await page.goto(path, { waitUntil: 'load' });
          await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
          await expect(root(page)).toHaveAttribute('data-theme', theme);
          if (shot === 'dashboard') await expect(page.getByTestId('score-trend')).toBeVisible();
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(400);
          if (v.name === 'mobile') {
            const wide = await page.evaluate(() =>
              Array.from(document.body.querySelectorAll('*'))
                .filter((el) => el.getBoundingClientRect().right > 361 && !(el.parentElement && el.parentElement.getBoundingClientRect().right > 361))
                .slice(0, 8)
                .map((el) => `${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).slice(0, 50)} w=${Math.round(el.getBoundingClientRect().width)}`),
            );
            expect(await page.evaluate(() => window.innerWidth), `${path} layout viewport; wider than 360: ${wide.join(' | ')}`).toBe(360);
          }
          await page.screenshot({ path: resolve(OUT, `${v.name}-${theme}-${shot}.png`), fullPage: v.name === 'desktop' });
        }
      }
    }
  });
});
