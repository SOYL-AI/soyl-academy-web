import type { Page } from '@playwright/test';
import { expect, openLoginFromHeader, signInWithEmail, test } from './fixtures';
import { checkPage, ctl, shot, signUp } from './m34-helpers';

/**
 * D-045 super-admin dashboard at /admin, against the real local API (api-e2e.ts):
 * - a normal student gets no admin (UI "Staff only", API 403 on analytics);
 * - the owner flow as in production (ADR-026, owner decision 2026-10-29: staff sign in with the email
 *   one-time code only, no Google, no TOTP): sign up with the email code, the Lead runs
 *   `db admin bootstrap --role superadmin` (the real bootstrapAdmin, via the control server; it signs the
 *   account out), sign in again with the email code and land straight on the Overview with today's
 *   sign-ups (no authenticator step);
 * - axe (no serious/critical) in light and dark, and no horizontal overflow at 360 px on every tab.
 * TOTP (STAFF_AUTH.secondFactor 'totp') stays covered by the API tests (reports-mfa, admin-analytics,
 * staff-sign-in) and the web unit tests (m2-components: enrol, confirm, recovery codes, verify).
 */

/** Sign in at /admin with the email code, from the staff page's own "Log in" button. */
async function emailSignInAtAdmin(page: Page, email: string) {
  await page.goto('/admin', { waitUntil: 'networkidle' });
  await openLoginFromHeader(page);
  await signInWithEmail(page, email);
  await expect(page).toHaveURL(/\/admin(\?[^#]*)?$/);
}

test('a normal student gets no admin: "Staff only" and 403 from the analytics API', async ({ page }) => {
  await signUp(page, 'admin-normal', '/admin');
  await expect(page.getByRole('heading', { name: 'Staff only' })).toBeVisible();
  expect((await page.request.get('/api/platform/v1/admin/analytics/overview')).status()).toBe(403);
  expect((await page.request.get('/api/platform/v1/admin/me')).status()).toBe(403);
  expect((await page.request.get('/api/platform/v1/admin/users')).status()).toBe(403);
});

test('superadmin: email code only, Overview with sign-ups, every tab accessible at 360 px in light and dark', async ({ page }) => {
  test.setTimeout(240_000);
  // A sign-up today, so the Overview has a non-zero figure (a student, in its own session).
  await signUp(page, 'admin-signup', '/learn');
  await page.context().clearCookies();

  // 1. The owner signs up with the email code at /admin ("Staff only" until the bootstrap step), then the
  //    Lead runs the bootstrap step (sessions are revoked).
  const email = await signUp(page, 'owner', '/admin');
  await expect(page.getByRole('heading', { name: 'Staff only' })).toBeVisible();
  const boot = await ctl<{ changed: boolean; sessionsRevoked: number }>('/ctl/bootstrap-admin', { email, role: 'superadmin' });
  expect(boot).toMatchObject({ changed: true });
  expect(boot.sessionsRevoked).toBeGreaterThanOrEqual(1);
  expect(await ctl<{ changed: boolean }>('/ctl/bootstrap-admin', { email, role: 'superadmin' })).toMatchObject({ changed: false });
  await page.context().clearCookies();

  // 2. Sign in again with the email code: straight to the dashboard, no authenticator set-up or verify step.
  await emailSignInAtAdmin(page, email);

  // 3. Overview: KPI tiles with today's sign-ups.
  const tabs = page.getByRole('tablist', { name: 'Admin sections' });
  await expect(tabs).toBeVisible();
  await expect(page.getByRole('button', { name: 'Set up authenticator' })).toHaveCount(0);
  await expect(page.getByTestId('mfa-verify')).toHaveCount(0);
  expect((await page.request.get('/api/platform/v1/admin/me')).status()).toBe(200);
  const signups = page.getByTestId('kpi-signups');
  await expect(signups).toBeVisible();
  const value = Number((await signups.locator('p').nth(1).innerText()).replace(/[^\d]/g, ''));
  expect(value).toBeGreaterThan(0);
  await expect(page.getByRole('group', { name: /^New sign-ups per day/ })).toBeVisible();
  await checkPage(page);
  await shot(page, 'admin-overview');

  // 4. Every tab renders without overflow or serious axe findings, light then dark.
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    for (const name of ['Overview', 'Growth', 'Engagement', 'Retention', 'AI and credits', 'Revenue', 'Interest', 'Content', 'Users', 'Reports']) {
      await tabs.getByRole('tab', { name }).click();
      const panel = page.getByRole('tabpanel', { name });
      await expect(panel).toBeVisible();
      // Wait for the section's own content (each tab loads its data when opened).
      if (name === 'Users') await expect(panel.getByTestId('user-row').first()).toBeVisible();
      else if (name === 'Reports') await expect(panel.getByRole('heading', { name: 'Content reports' })).toBeVisible();
      else if (name === 'Retention') await expect(panel.getByTestId('retention')).toBeVisible();
      else await expect(panel.locator('figure, table').first()).toBeVisible();
      await page.waitForLoadState('networkidle');
      await checkPage(page);
      if (scheme === 'dark') await shot(page, `admin-${name.toLowerCase().replace(/\s+/g, '-')}-dark`);
    }
  }

  // 5. The audited reveal works from the Users tab and never puts the address in the URL.
  await page.emulateMedia({ colorScheme: 'light' });
  await tabs.getByRole('tab', { name: 'Users' }).click();
  const row = page.getByTestId('user-row').first();
  await row.getByRole('button', { name: 'Summary' }).click();
  await expect(row.getByTestId('user-summary')).toBeVisible();
  await row.getByRole('button', { name: 'Reveal email' }).click();
  await expect(row.getByText(/@example\.com$/)).toBeVisible();
  expect(page.url()).not.toContain('@');
});
