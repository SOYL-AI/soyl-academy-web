import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, expectNoHorizontalScroll, test } from './fixtures';

/**
 * Marketing header, site index and footer (ADR-033, replacing ADR-025's mega menus). Runs in both suites:
 * - playwright.config.ts (flag ON): the Learn chapter, "Log in", and no marketing chrome on /learn;
 * - flag-off.config.ts (flag OFF, the production default): no Learn chapter, no "Log in", no /learn link.
 * Analytics are declined, so marketing pages load no Vercel scripts (the fixture fails on any).
 */

const flagOff = () => /flag-off\.config\.ts$/.test(test.info().config.configFile ?? '');
const CHAPTERS = () => (flagOff() ? ['Missions', 'Programmes', 'SOYL'] : ['Missions', 'Programmes', 'Learn free', 'SOYL']);
const LINKS = ['Missions', 'Schools', 'Teachers', 'Parents', 'Future Builders'];
const DESKTOP = { viewport: { width: 1280, height: 860 }, isMobile: false, hasTouch: false } as const;

async function declineAnalytics(page: Page) {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem('soyl_cookie_consent_v1', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() }));
    } catch {
      // ignore
    }
  });
}

async function axe(page: Page) {
  // Contrast is judged on the settled page: wait for every finite animation (entrance fades, the index's
  // transitions) to finish. Infinite loops and scroll-driven parallax only move things and are ignored.
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((a) => !(a.timeline instanceof DocumentTimeline) || a.effect?.getTiming().iterations === Infinity || a.playState !== 'running')
  );
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

const primary = (page: Page) => page.getByRole('navigation', { name: 'Primary' });
const indexButton = (page: Page) => page.getByRole('banner').getByRole('button', { name: /Index|Close/ });
const sheet = (page: Page) => page.locator('#site-index');

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe('desktop header', () => {
  test.use(DESKTOP);

  test('five links, the sign-in entry, Book a demo and an Index button (no ARIA menu roles)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(primary(page).getByRole('link')).toHaveText(LINKS);
    await expect(page.locator('header [role="menu"], header [role="menuitem"], header [role="menubar"]')).toHaveCount(0);
    const banner = page.getByRole('banner');
    if (flagOff()) {
      await expect(banner.getByRole('link', { name: 'Log in' })).toHaveCount(0);
      await expect(banner.getByRole('link', { name: 'Sign in', exact: true })).toHaveAttribute('href', /^https:\/\//);
    } else {
      await expect(banner.getByRole('link', { name: 'Log in', exact: true })).toHaveAttribute('href', '/me');
    }
    await expect(banner.getByRole('link', { name: 'Book a demo', exact: true })).toHaveAttribute('href', '/book-a-demo');
    await expect(indexButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(indexButton(page)).toHaveAttribute('aria-controls', 'site-index');
  });

  test('the current page is marked', async ({ page }) => {
    await page.goto('/schools', { waitUntil: 'networkidle' });
    await expect(primary(page).getByRole('link', { name: 'Schools', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  test('Index: opens as a modal, focus moves in and is trapped, Escape closes and returns focus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(sheet(page)).toHaveAttribute('inert', '');
    await indexButton(page).click();
    await expect(indexButton(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(sheet(page)).toHaveAttribute('role', 'dialog');
    await expect(sheet(page)).toHaveAttribute('aria-modal', 'true');
    await expect(sheet(page).getByRole('heading', { level: 2 })).toHaveText(CHAPTERS());
    await expect(sheet(page).getByRole('link', { name: /How missions work/ })).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('#site-index')))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(indexButton(page)).toHaveAttribute('aria-expanded', 'false');
    await expect(indexButton(page)).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });

  test('Index links resolve, and following one closes the index', async ({ page, request }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await indexButton(page).click();
    const hrefs = await sheet(page).locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    for (const href of new Set(hrefs)) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
    if (flagOff()) expect(hrefs.some((h) => h === '/learn' || h.startsWith('/learn/'))).toBe(false);
    await sheet(page).getByRole('link', { name: /About SOYL/ }).click();
    await page.waitForURL('**/about');
    await expect(indexButton(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test('axe: home page, and with the index open', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(await axe(page)).toEqual([]);
    await indexButton(page).click();
    await expect(indexButton(page)).toHaveAttribute('aria-expanded', 'true');
    expect(await axe(page)).toEqual([]);
  });
});

test.describe('header at 360 px', () => {
  test.use({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });

  test('the logo and the Index button; the index opens, nothing overflows, Escape closes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(primary(page)).toBeHidden();
    await expectNoHorizontalScroll(page);
    await indexButton(page).click();
    await expect(sheet(page).getByRole('link', { name: 'Book a demo', exact: true })).toBeVisible();
    if (flagOff()) {
      await expect(sheet(page).getByRole('link', { name: 'Sign in', exact: true })).toBeVisible();
    } else {
      await expect(sheet(page).getByRole('link', { name: /Free lessons/ })).toHaveAttribute('href', '/learn');
    }
    await expectNoHorizontalScroll(page);
    expect(await axe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(indexButton(page)).toBeFocused();
  });
});

test.describe('footer', () => {
  test('columns, legal line, and every internal link returns 200', async ({ page, request }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const footer = page.getByRole('contentinfo');
    const nav = footer.getByRole('navigation', { name: 'Footer' });
    await expect(nav.getByRole('heading', { level: 2 })).toHaveText([...CHAPTERS(), 'Legal']);
    await expect(nav.getByRole('button', { name: 'Cookie preferences' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Instagram', exact: true })).toHaveAttribute('href', 'https://www.instagram.com/soylacademy/');
    await expect(footer.getByRole('link', { name: 'outreach@soyl.cloud' })).toHaveAttribute('href', 'mailto:outreach@soyl.cloud');
    await expect(footer).toContainText('SOYL AI Private Limited · Bengaluru 560043');
    await expect(footer).toContainText('Story of Your Life.');
    await expect(footer.getByRole('link', { name: 'Book a demo', exact: true }).first()).toBeVisible();
    if (flagOff()) {
      await expect(nav.getByRole('link', { name: 'Free lessons' })).toHaveCount(0);
    } else {
      await expect(nav.getByRole('link', { name: 'Free lessons' })).toHaveAttribute('href', '/learn');
    }
    const hrefs = await footer.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
    if (flagOff()) expect(hrefs.some((h) => h === '/learn' || h.startsWith('/learn/'))).toBe(false);
  });
});

test('platform pages keep their own shell: no marketing header or footer on /learn (flag ON)', async ({ page }) => {
  test.skip(flagOff(), '/learn is a 404 with the flag off (flag-off.spec.ts)');
  await page.goto('/learn', { waitUntil: 'networkidle' });
  await expect(page.getByRole('navigation', { name: 'Primary' })).toHaveCount(0);
  await expect(page.locator('#site-index')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Footer' })).toHaveCount(0);
});
