import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import { expect, expectNoHorizontalScroll, test } from './fixtures';

/**
 * Marketing header mega menus, mobile sheet and footer (ADR-025). Runs in both suites:
 * - playwright.config.ts (flag ON): the Learn group, "Log in", and no marketing chrome on /learn;
 * - flag-off.config.ts (flag OFF, the production default): no Learn group, no "Log in", no /learn link.
 * Analytics are declined, so marketing pages load no Vercel scripts (the fixture fails on any).
 */

const flagOff = () => /flag-off\.config\.ts$/.test(test.info().config.configFile ?? '');
const GROUPS = () => (flagOff() ? ['Programs', 'Future Builders', 'About'] : ['Programs', 'Future Builders', 'Learn', 'About']);
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
  // Contrast is judged on the settled page: wait for every finite animation (entrance fades, the menu's
  // transitions) to finish. Infinite loops (float, marquee) and scroll-driven parallax only move things and
  // are ignored.
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((a) => !(a.timeline instanceof DocumentTimeline) || a.effect?.getTiming().iterations === Infinity || a.playState !== 'running')
  );
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

const primary = (page: Page) => page.getByRole('navigation', { name: 'Primary' });
const trigger = (page: Page, name: string) => primary(page).getByRole('button', { name, exact: true });

async function panelOf(page: Page, button: Locator): Promise<Locator> {
  const id = await button.getAttribute('aria-controls');
  expect(id, 'aria-controls').toBeTruthy();
  return page.locator(`#${id}`);
}

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe('desktop mega menus', () => {
  test.use(DESKTOP);

  test('the top bar lists the right groups (disclosure buttons, no ARIA menu roles) and sign-in entry', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const buttons = primary(page).locator('button[aria-expanded]');
    await expect(buttons).toHaveText(GROUPS());
    for (const name of GROUPS()) {
      const b = trigger(page, name);
      await expect(b).toHaveAttribute('aria-expanded', 'false');
      await expect(await panelOf(page, b)).toBeHidden();
    }
    await expect(page.locator('header [role="menu"], header [role="menuitem"], header [role="menubar"]')).toHaveCount(0);
    const banner = page.getByRole('banner');
    if (flagOff()) {
      await expect(banner.getByRole('link', { name: 'Log in' })).toHaveCount(0);
      await expect(banner.getByRole('link', { name: 'Sign in', exact: true })).toHaveAttribute('href', /^https:\/\//);
      expect(await page.content()).not.toContain('href="/learn"');
    } else {
      await expect(banner.getByRole('link', { name: 'Log in', exact: true })).toHaveAttribute('href', '/me');
      await expect(banner.getByRole('link', { name: 'Book a demo', exact: true })).toHaveAttribute('href', '/book-a-demo');
    }
  });

  test('hover opens each panel after a short delay, dims the page, and leaving closes it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    for (const name of GROUPS()) {
      const b = trigger(page, name);
      await b.hover();
      await expect(b).toHaveAttribute('aria-expanded', 'true');
      const panel = await panelOf(page, b);
      await expect(panel).toBeVisible();
      await expect(page.locator('[data-menu-backdrop]')).toBeVisible();
      // Every item: an icon tile, a title and a one-line description; plus a featured card.
      const items = panel.locator('[data-menu-item]');
      expect(await items.count()).toBeGreaterThanOrEqual(2);
      await expect(panel.locator('[data-feature-card]')).toHaveCount(1);
      // Moving into the panel keeps it open.
      await items.first().hover();
      await expect(b).toHaveAttribute('aria-expanded', 'true');
      await page.mouse.move(640, 840);
      await expect(b).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
    }
    await expect(page.locator('[data-menu-backdrop]')).toHaveCount(0);
  });

  test('keyboard: Enter / Space / ArrowDown open and focus the first link; Escape closes and returns focus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    for (const [i, name] of GROUPS().entries()) {
      const b = trigger(page, name);
      const panel = await panelOf(page, b);
      const key = ['Enter', ' ', 'ArrowDown'][i % 3]!;
      await b.focus();
      await page.keyboard.press(key);
      await expect(b).toHaveAttribute('aria-expanded', 'true');
      await expect(panel.locator('a[href]').first()).toBeFocused();
      // Arrow keys move through the links.
      await page.keyboard.press('ArrowDown');
      await expect(panel.locator('a[href]').nth(1)).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(b).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
      await expect(b).toBeFocused();
    }
    // ArrowRight moves between the top-level buttons; Enter again toggles closed.
    const first = trigger(page, GROUPS()[0]!);
    await first.focus();
    await page.keyboard.press('ArrowRight');
    await expect(trigger(page, GROUPS()[1]!)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(trigger(page, GROUPS()[1]!)).toHaveAttribute('aria-expanded', 'true');
    await trigger(page, GROUPS()[1]!).focus();
    await page.keyboard.press('Enter');
    await expect(trigger(page, GROUPS()[1]!)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Tab moves from a button into its open panel; tabbing out of the menu closes it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const last = GROUPS()[GROUPS().length - 1]!;
    const b = trigger(page, last);
    await b.click();
    await expect(b).toHaveAttribute('aria-expanded', 'true');
    const links = (await panelOf(page, b)).locator('a[href]');
    const n = await links.count();
    await b.focus();
    for (let i = 0; i < n; i++) await page.keyboard.press('Tab');
    await expect(links.nth(n - 1)).toBeFocused();
    await page.keyboard.press('Tab'); // out of the menu, to the sign-in link
    await expect(b).toHaveAttribute('aria-expanded', 'false');
  });

  test('click toggles; outside click and navigation close the panel', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const b = trigger(page, 'Programs');
    await b.click();
    await expect(b).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.click(640, 800); // the dimmed page
    await expect(b).toHaveAttribute('aria-expanded', 'false');
    await b.click();
    await expect(b).toHaveAttribute('aria-expanded', 'true');
    await b.click();
    await expect(b).toHaveAttribute('aria-expanded', 'false');

    await b.click();
    const panel = await panelOf(page, b);
    await panel.getByRole('link', { name: /^For schools A ten-week/ }).click();
    await expect(page).toHaveURL(/\/schools$/);
    await expect(b).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();
    // The current section is marked inside the panel.
    await b.click();
    await expect(panel.getByRole('link', { name: /^For schools A ten-week/ })).toHaveAttribute('aria-current', 'page');
  });

  test('About shows the latest Journal post; the menu links resolve', async ({ page, request }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const b = trigger(page, 'About');
    await b.click();
    const card = (await panelOf(page, b)).locator('[data-feature-card]');
    await expect(card).toContainText('From the Journal');
    await expect(card).toHaveAttribute('href', /^\/journal\/[a-z0-9-]+$/);
    const hrefs = await primary(page).locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test('axe: home page with a menu open', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await trigger(page, GROUPS()[0]!).click();
    await expect(trigger(page, GROUPS()[0]!)).toHaveAttribute('aria-expanded', 'true');
    expect(await axe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await trigger(page, 'About').click();
    expect(await axe(page)).toEqual([]);
  });
});

test.describe('mobile sheet at 360 px', () => {
  test.use({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });

  test('opens, locks scroll, traps focus, accordion works, Escape closes, nothing overflows', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expectNoHorizontalScroll(page);
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    const sheet = page.locator('#mobile-menu');
    await expect(sheet).toBeVisible();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
    expect(await sheet.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    await expectNoHorizontalScroll(page);

    // Accordion groups: the same items and descriptions as the desktop menus.
    const groupButtons = sheet.locator('button[aria-expanded]');
    await expect(groupButtons).toHaveText(GROUPS());
    const programs = groupButtons.first();
    await programs.click();
    await expect(programs).toHaveAttribute('aria-expanded', 'true');
    const region = page.locator(`#${await programs.getAttribute('aria-controls')}`);
    await expect(region.getByRole('link', { name: /^For schools/ })).toBeVisible();
    await expect(region.getByText('A ten-week pilot that rethinks homework for the age of AI.')).toBeVisible();
    await expectNoHorizontalScroll(page);
    // The call to action stays pinned at the bottom of the screen.
    const cta = sheet.getByRole('link', { name: 'Book a demo', exact: true });
    const box = await cta.boundingBox();
    expect(box && box.y + box.height).toBeGreaterThan(700);
    if (flagOff()) {
      await expect(sheet.getByRole('link', { name: 'Log in' })).toHaveCount(0);
      await expect(sheet.getByRole('link', { name: 'Sign in', exact: true })).toBeVisible();
    } else {
      await expect(sheet.getByRole('link', { name: 'Log in', exact: true })).toHaveAttribute('href', '/me');
      await expect(sheet.getByRole('link', { name: /Start learning free/ })).toHaveAttribute('href', '/learn');
    }
    await programs.click();
    await expect(programs).toHaveAttribute('aria-expanded', 'false');
    await expect(region).toBeHidden();

    // Focus trap: Tab and Shift+Tab never leave the toggle + sheet.
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('#mobile-menu') || document.activeElement?.getAttribute('aria-controls') === 'mobile-menu'))).toBe(true);
    }
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab');
      expect(await page.evaluate(() => Boolean(document.activeElement?.closest('#mobile-menu') || document.activeElement?.getAttribute('aria-controls') === 'mobile-menu'))).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });

  test('navigating from the sheet closes it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open menu' }).click();
    const sheet = page.locator('#mobile-menu');
    await sheet.getByRole('button', { name: 'About', exact: true }).click();
    await sheet.getByRole('link', { name: /^About SOYL/ }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(sheet).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });

  test('axe: home page with the sheet open (and a group expanded)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    expect(await axe(page)).toEqual([]);
    await page.locator('#mobile-menu button[aria-expanded]').first().click();
    expect(await axe(page)).toEqual([]);
  });
});

test.describe('footer', () => {
  test('columns, legal line, decorative wordmark, and every internal link returns 200', async ({ page, request }) => {
    await page.goto('/about', { waitUntil: 'networkidle' });
    const footer = page.getByRole('contentinfo');
    const nav = footer.getByRole('navigation', { name: 'Footer' });
    const headings = flagOff() ? ['Programs', 'Future Builders', 'Company', 'Legal'] : ['Programs', 'Future Builders', 'Learn', 'Company', 'Legal'];
    await expect(nav.getByRole('heading', { level: 2 })).toHaveText(headings);
    await expect(nav.getByRole('button', { name: 'Cookie preferences' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Instagram', exact: true })).toHaveAttribute('href', 'https://www.instagram.com/soylacademy/');
    await expect(footer.getByRole('link', { name: 'outreach@soyl.cloud' })).toHaveAttribute('href', 'mailto:outreach@soyl.cloud');
    await expect(footer).toContainText('SOYL AI Private Limited · Bengaluru 560043');
    await expect(footer.getByRole('link', { name: 'Book a demo', exact: true }).first()).toBeVisible();
    // The oversized wordmark (owner, 2026-10-29) is decorative: visible, but hidden from assistive technology.
    const wordmark = footer.locator('[aria-hidden="true"]').filter({ hasText: /^SOYL$/ });
    await expect(wordmark).toHaveCount(1);
    await expect(wordmark).toBeVisible();
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
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Footer' })).toHaveCount(0);
  await expect(page.locator('[data-feature-card]')).toHaveCount(0);
});
