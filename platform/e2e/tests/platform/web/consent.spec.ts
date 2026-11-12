import type { APIRequestContext, Page } from '@playwright/test';
import { acceptAllCookies, expect, otpFor, test } from './fixtures';
import { checkPage, shot, signUp } from './m34-helpers';

/**
 * Consent only for paid plans (D-052, ADR-030) with the built-in provider (D-039, ADR-022) at 360 px, against
 * the e2e API with CONSENT_PROVIDER=builtin and BILLING_ENABLED=true:
 * - under 18: the AI tutor works with no approval; /plans asks for approval before buying → "Ask a parent to
 *   approve" → age band → parent email → the parent's code (dev outbox) → approved → back to /plans;
 * - 18 or older: leaderboards are open with no approval; self-declare with the agreement → withdraw from /me →
 *   leaderboards still open;
 * - the parent's withdraw link (no session, fragment token, button press) → approval withdrawn; AI stays on.
 */
test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

let n = 0;
const parentEmail = (tag: string) => `parent.${tag}.${Date.now().toString(36)}${++n}@example.com`;

/** The withdraw link from the last parent-approval email (GET /v1/dev/otp-outbox, local only). */
async function withdrawLinkFor(request: APIRequestContext, parent: string): Promise<string> {
  const res = await request.get(`/api/platform/v1/dev/otp-outbox?to=${encodeURIComponent(parent)}`);
  expect(res.ok()).toBe(true);
  const { link } = (await res.json()) as { link: string | null };
  expect(link).toMatch(/\/me\/consent\/parent#t=/);
  return link!;
}

async function parentApproves(page: Page, tag: string): Promise<string> {
  const flow = page.getByTestId('consent-flow');
  await expect(flow).toHaveAttribute('data-age-band', 'none');
  await expect(flow).toContainText('Only needed to buy a paid plan');
  await checkPage(page);
  await shot(page, `consent-age-${tag}`);
  await flow.getByRole('radio', { name: /Under 18/ }).check();
  await flow.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByTestId('consent-parent')).toBeVisible();
  const parent = parentEmail(tag);
  await page.getByLabel(/Parent’s or guardian’s email/).fill(parent);
  await page.getByRole('button', { name: 'Send code to my parent' }).click();
  const step = page.getByTestId('consent-code');
  await expect(step).toContainText('p•••@example.com');
  await expect(page.getByTestId('consent-flow')).toHaveAttribute('data-consent', 'pending');
  await checkPage(page);
  await shot(page, `consent-code-${tag}`);
  const code = await otpFor(page.request, parent);
  await step.getByLabel(/Approval code from your parent/).fill(code);
  await expect(page.getByTestId('consent-granted')).toBeVisible();
  await expect(page.getByTestId('consent-granted')).toContainText('Approved by a parent');
  return parent;
}

test('under 18: AI works without approval; the parent’s emailed code is asked for only to buy a plan', async ({ page }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'minor', '/ask');
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('ai-consent-needed')).toHaveCount(0);
  await expect(page.getByTestId('credit-chip')).toHaveAttribute('data-balance', '50'); // D-044, D-052

  await page.goto('/plans', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('plans-consent')).toBeVisible();
  await expect(page.getByTestId('buy-plus')).toBeDisabled();
  await page.getByTestId('plans-consent').getByRole('link', { name: 'Ask a parent to approve' }).click();
  await expect(page).toHaveURL(/\/me\/consent\?next=%2Fplans$/);
  await parentApproves(page, 'minor');
  await checkPage(page);
  await shot(page, 'consent-granted-minor');
  await page.getByTestId('consent-continue').click();
  await expect(page).toHaveURL(/\/plans$/);
  await expect(page.getByTestId('plans-consent')).toHaveCount(0);
  await expect(page.getByTestId('buy-plus')).toBeEnabled();
});

test('18 or older: leaderboards are open without approval; self-declared approval and withdrawal leave them open', async ({ page }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'adult', '/leaderboard');
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboard-consent')).toHaveCount(0);
  await expect(page.getByTestId('leaderboards')).toBeVisible();

  await page.goto('/me/consent?next=%2Fleaderboard', { waitUntil: 'networkidle' });
  const flow = page.getByTestId('consent-flow');
  await flow.getByRole('radio', { name: /18 or older/ }).check();
  await flow.getByRole('button', { name: 'Continue' }).click();
  await expect(flow.getByRole('alert')).toBeVisible(); // the agreement is required
  await flow.getByRole('checkbox').check();
  await flow.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByTestId('consent-granted')).toContainText('You confirmed you are 18 or older');
  await page.getByTestId('consent-continue').click();
  await expect(page).toHaveURL(/\/leaderboard$/);
  await expect(page.getByTestId('leaderboards')).toBeVisible();

  // Withdraw from the profile (confirm dialog); the leaderboard stays open.
  await page.goto('/me', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('public-name-value')).toHaveText(/^[A-Z][a-z]+ [A-Z][a-z]+ [0-9]{3}$/);
  await page.getByTestId('consent-withdraw').click();
  await page.getByTestId('consent-withdraw-confirm').click();
  await expect(page.getByTestId('consent-flow')).toHaveAttribute('data-consent', 'revoked');
  await expect(page.getByTestId('consent-adult-off')).toBeVisible();
  await checkPage(page);
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboard-consent')).toHaveCount(0);
  await expect(page.getByTestId('leaderboards')).toBeVisible();
});

test('the parent’s withdraw link (no account) withdraws approval; AI stays on', async ({ page, browser }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'revoke', '/me/consent');
  await page.goto('/me/consent', { waitUntil: 'networkidle' });
  const parent = await parentApproves(page, 'revoke');
  const link = await withdrawLinkFor(page.request, parent);

  // The parent's browser: no session, no cookies.
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true });
  const parentPage = await ctx.newPage();
  await acceptAllCookies(parentPage);
  await parentPage.goto(link, { waitUntil: 'networkidle' });
  await expect(parentPage.getByTestId('parent-withdraw')).toHaveAttribute('data-phase', 'ready');
  expect(new URL(parentPage.url()).hash).toBe(''); // the token left the address bar
  await checkPage(parentPage);
  await shot(parentPage, 'consent-parent-withdraw');
  await parentPage.getByTestId('parent-withdraw-confirm').click();
  await expect(parentPage.getByTestId('parent-withdraw-done')).toContainText('withdrawn');
  await ctx.close();

  // The student: approval shows as withdrawn by a parent; AI still works (D-052).
  await page.goto('/me/consent', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('consent-flow')).toHaveAttribute('data-consent', 'revoked');
  await expect(page.getByTestId('consent-parent')).toContainText('A parent withdrew or declined approval');
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('ai-consent-needed')).toHaveCount(0);
  await expect(page.getByTestId('credit-chip')).toBeVisible();
});
