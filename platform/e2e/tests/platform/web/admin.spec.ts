import { createHmac } from 'node:crypto';
import type { Page } from '@playwright/test';
import { expect, test, uniqueEmail } from './fixtures';
import { checkPage, ctl, shot, signUp } from './m34-helpers';
// @ts-ignore -- plain ESM module shared with run.mjs
import { OIDC_PORT } from './env.mjs';

/**
 * D-045 super-admin dashboard at /admin, against the real local API (api-e2e.ts):
 * - a normal student gets no admin (UI "Staff only", API 403 on analytics);
 * - the owner flow as in production: sign up with Google (Workspace domain), the Lead runs
 *   `db admin bootstrap --role superadmin` (the real bootstrapAdmin, via the control server; it signs the
 *   account out), sign in again, enrol TOTP, verify, and the Overview shows today's sign-ups;
 * - axe (no serious/critical) in light and dark, and no horizontal overflow at 360 px on every tab.
 */

const STAFF_DOMAIN = 'staff.e2e.example.com';

/** RFC 6238 TOTP (SHA-1, 6 digits, 30 s) from a base32 secret, as an authenticator app computes it. */
function totp(secret: string, at = Date.now()): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const ch of secret.replace(/\s|=/g, '').toUpperCase()) bits += alphabet.indexOf(ch).toString(2).padStart(5, '0');
  const key = Buffer.from((bits.match(/.{8}/g) ?? []).map((b) => Number.parseInt(b, 2)));
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(at / 1000 / 30)));
  const mac = createHmac('sha1', key).update(counter).digest();
  const offset = mac[mac.length - 1]! & 0xf;
  const code = (mac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return String(code).padStart(6, '0');
}

async function googleSignIn(page: Page, email: string, sub: string) {
  await ctl('/ctl/oidc-next-user', { email, sub, hd: STAFF_DOMAIN });
  await page.goto('/admin', { waitUntil: 'networkidle' });
  await page.getByTestId('login-button').click();
  const dialog = page.getByRole('dialog', { name: 'Log in to SOYL Academy' });
  await dialog.getByRole('button', { name: 'Continue with Google' }).click();
  await page.waitForURL((u) => u.pathname === '/admin' && !u.search.includes('authError'));
  await expect(page.getByTestId('profile-link')).toBeVisible();
}

test('a normal student gets no admin: "Staff only" and 403 from the analytics API', async ({ page }) => {
  await signUp(page, 'admin-normal', '/admin');
  await expect(page.getByRole('heading', { name: 'Staff only' })).toBeVisible();
  expect((await page.request.get('/api/platform/v1/admin/analytics/overview')).status()).toBe(403);
  expect((await page.request.get('/api/platform/v1/admin/me')).status()).toBe(403);
  expect((await page.request.get('/api/platform/v1/admin/users')).status()).toBe(403);
});

test('superadmin: Google + TOTP, Overview with sign-ups, every tab accessible at 360 px in light and dark', async ({ page, watch }) => {
  test.setTimeout(240_000);
  watch.allowOrigins.push(`http://127.0.0.1:${OIDC_PORT}`);
  // A sign-up today, so the Overview has a non-zero figure (a student, in its own session).
  await signUp(page, 'admin-signup', '/learn');
  await page.context().clearCookies();

  // 1. The owner signs up with Google, then the Lead runs the bootstrap step (sessions are revoked).
  const email = uniqueEmail('owner').replace('@example.com', `@${STAFF_DOMAIN}`);
  const sub = `e2e-owner-${Date.now().toString(36)}`;
  await googleSignIn(page, email, sub);
  await expect(page.getByRole('heading', { name: 'Staff only' })).toBeVisible();
  const boot = await ctl<{ changed: boolean; sessionsRevoked: number }>('/ctl/bootstrap-admin', { email, role: 'superadmin' });
  expect(boot).toMatchObject({ changed: true });
  expect(boot.sessionsRevoked).toBeGreaterThanOrEqual(1);
  expect(await ctl<{ changed: boolean }>('/ctl/bootstrap-admin', { email, role: 'superadmin' })).toMatchObject({ changed: false });
  await page.context().clearCookies();

  // 2. Sign in again with Google (staff Workspace domain), enrol the authenticator.
  await googleSignIn(page, email, sub);
  await page.getByRole('button', { name: 'Set up authenticator' }).click();
  await page.getByText("Can't scan? Enter the key instead").click();
  const secret = (await page.locator('[data-testid="mfa-confirm"] code').first().innerText()).replace(/\s/g, '');
  expect(secret).toMatch(/^[A-Z2-7]{16,}$/);
  await page.getByLabel('Code from your app').fill(totp(secret));
  await expect(page.getByTestId('mfa-recovery-codes')).toBeVisible();
  await page.getByRole('button', { name: 'I have saved them' }).click();

  // 3. Overview: KPI tiles with today's sign-ups.
  const tabs = page.getByRole('tablist', { name: 'Admin sections' });
  await expect(tabs).toBeVisible();
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
