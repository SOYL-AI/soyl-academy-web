import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, expectNoHorizontalScroll, openLoginFromHeader, test } from './fixtures';

/**
 * /learn pages at 360 px: catalog browsing, metadata, axe (zero serious/critical), no horizontal scroll,
 * security headers (WEB-3, WEB-4), no third-party or Vercel requests with "Accept all" cookies (WEB-1,
 * checked by the fixture), screenshots for the handoff.
 */
const SHOTS = resolve(import.meta.dirname, '../../../test-results/platform-web/screenshots');
mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  { path: '/learn', h1: 'What are you studying?', shot: 'learn' },
  { path: '/learn/cbse/10', h1: 'CBSE Class 10', shot: 'learn-cbse-10' },
  { path: '/learn/cisce/12', h1: 'ISC Class 12', shot: 'learn-cisce-12' },
  { path: '/learn/cbse/10/science', h1: 'Science', shot: 'learn-cbse-10-science' },
  { path: '/learn/cbse/10/hindi-a', h1: 'Hindi Course A', shot: 'learn-cbse-10-hindi-a' },
  { path: '/learn/cbse/10/science/ch01', h1: 'Chemical Reactions and Equations', shot: 'chapter-hub' },
];

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

for (const p of PAGES) {
  test(`${p.path}: renders, accessible, fits 360 px`, async ({ page }) => {
    const res = await page.goto(p.path, { waitUntil: 'networkidle' });
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: p.h1 })).toBeAttached();
    await expect(page.getByTestId('login-button')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expectNoHorizontalScroll(page);
    expect(await axe(page)).toEqual([]);
    await page.screenshot({ path: resolve(SHOTS, `${p.shot}-360.png`), fullPage: true });
  });
}

test('login sheet at 360 px: accessible, fits, screenshot', async ({ page }) => {
  await page.goto('/learn/cbse/10/science/ch01', { waitUntil: 'networkidle' });
  await openLoginFromHeader(page);
  await expectNoHorizontalScroll(page);
  expect(await axe(page)).toEqual([]);
  await page.screenshot({ path: resolve(SHOTS, 'login-sheet-360.png') });
  await page.getByRole('tab', { name: 'Email' }).click();
  await page.screenshot({ path: resolve(SHOTS, 'login-sheet-email-360.png') });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('browse board → class → subject → chapter by tapping', async ({ page }) => {
  await page.goto('/learn');
  await page.getByRole('link', { name: 'CISCE Class 10 (ICSE)' }).click();
  await expect(page).toHaveURL(/\/learn\/cisce\/10$/);
  await expect(page.getByRole('heading', { level: 2, name: /Core subjects/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Languages/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Electives/ })).toBeVisible();
  await page.getByRole('link', { name: /^Chemistry/ }).click();
  await expect(page).toHaveURL(/\/learn\/cisce\/10\/chemistry$/);
  await page.getByRole('link', { name: /Chapter 1:/ }).click();
  await expect(page).toHaveURL(/\/learn\/cisce\/10\/chemistry\/ch01$/);
  // No content for this chapter yet (M2): every view says "Coming soon" instead of linking.
  for (const v of ['hub-lesson', 'hub-notes', 'hub-flashcards', 'hub-practice']) await expect(page.getByTestId(v)).toContainText('Coming soon');
  await expect(page.getByTestId('chapter-tests')).toBeVisible();
});

test('metadata: title, description, canonical, breadcrumbs JSON-LD', async ({ page }) => {
  await page.goto('/learn/cbse/10/science');
  await expect(page).toHaveTitle('CBSE Class 10 Science: chapters | SOYL Academy');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://www.soylai.com/learn/cbse/10/science');
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /chapters of CBSE Class 10 Science/);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.some((t) => t.includes('"BreadcrumbList"'))).toBe(true);
});

test('unknown boards, classes, subjects and chapters are 404', async ({ page }) => {
  for (const path of ['/learn/icse/10', '/learn/cbse/6', '/learn/cbse/10/not-a-subject', '/learn/cbse/10/science/ch99', '/learn/cbse/10/science/ch01/quiz', '/learn/cbse/12/science']) {
    const res = await page.request.get(path);
    expect(res.status(), path).toBe(404);
  }
});

test('security headers on platform pages (WEB-3, WEB-4); nonce on /me', async ({ page }) => {
  const learn = await page.request.get('/learn');
  const h = learn.headers();
  expect(h['content-security-policy']).toContain("default-src 'self'");
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['content-security-policy']).toContain("object-src 'none'");
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(h['permissions-policy']).toBe('camera=(), microphone=(), geolocation=(), browsing-topics=()');
  expect(h['cross-origin-opener-policy']).toBe('same-origin');

  const me = await page.request.get('/me');
  const csp = me.headers()['content-security-policy']!;
  const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
  expect(nonce).toBeTruthy();
  expect(csp).toContain("'strict-dynamic'");
  expect(csp.split('; ').find((d) => d.startsWith('script-src'))).not.toContain('unsafe-inline');
  const html = await me.text();
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map((m) => ({ tag: m[1]!, body: m[2]! }));
  const executable = scripts.filter((s) => !/type="application\/ld\+json"/.test(s.tag));
  const withoutNonce = executable.filter((s) => !s.tag.includes(`nonce="${nonce}"`));
  // Only the root layout's consent boot script and the platform theme boot script (ADR-023) have no nonce, and
  // each is an inline script whose exact SHA-256 is in the policy (no src, nothing else allowed).
  expect(withoutNonce.length, 'inline boot scripts without a nonce').toBeLessThanOrEqual(2);
  for (const s of withoutNonce) {
    expect(s.tag, 'a script without a nonce must be inline').not.toMatch(/\ssrc=/);
    expect(csp, 'every script without a nonce is allowed by its hash').toContain(`'sha256-${createHash('sha256').update(s.body, 'utf8').digest('base64')}'`);
  }
  const second = await page.request.get('/me');
  expect(/'nonce-([^']+)'/.exec(second.headers()['content-security-policy']!)?.[1]).not.toBe(nonce);

  // Marketing pages are untouched by the platform proxy.ts.
  const about = await page.request.get('/about');
  expect(about.headers()['content-security-policy']).toBeUndefined();
});

test('/me renders under the nonce CSP without violations (fixture)', async ({ page }) => {
  await page.goto('/me', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Log in to see your profile' })).toBeVisible();
  expect(await axe(page)).toEqual([]);
  await expectNoHorizontalScroll(page);
});

test('the marketing header shows the Learn entry point when the flag is on', async ({ page }) => {
  // Platform pages have their own app shell since ADR-023, so the marketing header is checked on the home page.
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn');
});

test('platform sitemap lists /learn, class and subject pages', async ({ request }) => {
  const res = await request.get('/learn/sitemap.xml');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/xml');
  const xml = await res.text();
  expect(xml).toContain('<loc>https://www.soylai.com/learn</loc>');
  expect(xml).toContain('<loc>https://www.soylai.com/learn/cisce/12</loc>');
  expect(xml).toContain('<loc>https://www.soylai.com/learn/cbse/10/science</loc>');
  expect((xml.match(/<loc>/g) ?? []).length).toBeGreaterThan(700);
});
