import { expect, test } from '@playwright/test';

/** GEN-4 with the production default (flag off): the platform does not exist. */
const ROUTES = [
  '/learn',
  '/learn/cbse/10',
  '/learn/cbse/10/science',
  '/learn/cbse/10/science/ch01',
  '/learn/cbse/10/science/ch01/lesson',
  '/learn/cbse/10/science/ch01/lesson?part=2',
  '/learn/cbse/10/science/ch01/lesson/2',
  '/learn/cbse/10/science/ch01/notes',
  '/learn/cbse/10/science/ch01/flashcards',
  '/learn/cbse/10/science/ch01/practice',
  '/admin',
  '/api/platform/v1/chapters/cbse-10-science-ch01',
  '/learn/sitemap.xml',
  '/me',
  // Student dashboard (D-043) and its short link
  '/me/dashboard',
  '/dashboard',
  '/api/platform/v1/me/dashboard',
  '/api/platform/v1/schools?q=st',
  '/dev/ui',
  '/api/platform/v1/session',
  '/api/platform/v1/catalog/boards',
  '/api/platform/v1/auth/google/start',
  // M3/M4
  '/tests',
  '/tests/series/cbse/10/science',
  '/tests/attempt/00000000-0000-4000-8000-000000000000',
  '/tests/result/00000000-0000-4000-8000-000000000000',
  '/tests/builder',
  '/tests/live/live_cbse10sci_1',
  '/ask',
  '/plans',
  '/leaderboard',
  '/api/platform/v1/plans',
  '/api/platform/v1/test-series?subject=cbse-10-science',
  '/api/platform/v1/credits',
  // SOYL Coins (ADR-021 §8)
  '/coins',
  '/store',
  '/api/platform/v1/coins',
  '/api/platform/v1/coins/store',
  '/api/platform/v1/coins/daily-challenge?board=cbse&class=10',
];

for (const path of ROUTES) {
  test(`${path} → 404`, async ({ request }) => {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status()).toBe(404);
    // proxy.ts is inert: no platform security headers when the flag is off.
    expect(res.headers()['content-security-policy']).toBeUndefined();
  });
}

test('POSTs to the proxy and CSP endpoint → 404', async ({ request }) => {
  expect((await request.post('/api/platform/v1/auth/email/send-otp', { data: { email: 'a@example.com' } })).status()).toBe(404);
  expect((await request.post('/api/platform/csp-report', { headers: { 'content-type': 'application/csp-report' }, data: '{}' })).status()).toBe(404);
  expect((await request.post('/api/platform/v1/webhooks/razorpay', { headers: { 'content-type': 'application/json', 'x-razorpay-signature': 'x' }, data: '{}' })).status()).toBe(404);
  expect((await request.post('/api/platform/v1/ai/quick-doubt', { data: { message: 'x' } })).status()).toBe(404);
  expect((await request.post('/api/platform/v1/coins/check-in', { data: {} })).status()).toBe(404);
  expect((await request.post('/api/platform/v1/coins/redeem', { data: { itemKey: 'hoodie' } })).status()).toBe(404);
});

test('/dashboard and /me/dashboard are the marketing 404 with the marketing chrome (no platform shell)', async ({ page }) => {
  for (const path of ['/dashboard', '/me/dashboard']) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(404);
    await expect(page.locator('#mobile-menu'), path).toHaveCount(1); // the marketing header's menu
    await expect(page.locator('#soyl-platform-root'), path).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Learning platform' }), path).toHaveCount(0);
  }
});

test('the marketing header has no Learn link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Learn', exact: true })).toHaveCount(0);
  expect(await page.content()).not.toContain('href="/learn"');
});
