import type { APIRequestContext, Page } from '@playwright/test';
import { acceptAllCookies, expect, otpFor, test } from './fixtures';
import { checkPage, shot, signUp } from './m34-helpers';

/**
 * D-039 interim built-in consent (ADR-022) at 360 px, against the e2e API with CONSENT_PROVIDER=builtin:
 * - under 18: /ask consent-needed → "Ask a parent to approve" → age band → parent email → the parent's code
 *   (dev outbox) → approved → back to /ask with AI on;
 * - 18 or older: /leaderboard consent-needed → self-declare with the agreement → leaderboards on → withdraw
 *   from /me → off again;
 * - the parent's withdraw link (no session, fragment token, button press) → AI off for the student.
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

test('under 18: the parent’s emailed code turns the AI tutor on', async ({ page }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'minor', '/ask');
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('ai-consent-needed')).toBeVisible();
  await page.getByTestId('consent-flow-link').click();
  await expect(page).toHaveURL(/\/me\/consent\?next=%2Fask$/);
  await parentApproves(page, 'minor');
  await checkPage(page);
  await shot(page, 'consent-granted-minor');
  await page.getByTestId('consent-continue').click();
  await expect(page).toHaveURL(/\/ask$/);
  await expect(page.getByTestId('ai-consent-needed')).toHaveCount(0);
  await expect(page.getByTestId('credit-chip')).toHaveAttribute('data-balance', '25');
});

test('18 or older: self-declared approval turns leaderboards on; withdrawing from /me turns them off', async ({ page }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'adult', '/leaderboard');
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboard-consent')).toBeVisible();
  await page.getByTestId('consent-flow-link').click();
  await expect(page).toHaveURL(/\/me\/consent\?next=%2Fleaderboard$/);
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

  // Withdraw from the profile (confirm dialog), then the leaderboard asks again.
  await page.goto('/me', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('public-name-value')).toHaveText(/^[A-Z][a-z]+ [A-Z][a-z]+ [0-9]{3}$/);
  await page.getByTestId('consent-withdraw').click();
  await page.getByTestId('consent-withdraw-confirm').click();
  await expect(page.getByTestId('consent-flow')).toHaveAttribute('data-consent', 'revoked');
  await expect(page.getByTestId('consent-adult-off')).toBeVisible();
  await checkPage(page);
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboard-consent')).toBeVisible();
});

test('the parent’s withdraw link (no account) switches AI off again', async ({ page, browser }) => {
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

  // The student: approval shows as withdrawn by a parent; AI asks for approval again.
  await page.goto('/me/consent', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('consent-flow')).toHaveAttribute('data-consent', 'revoked');
  await expect(page.getByTestId('consent-parent')).toContainText('A parent withdrew or declined approval');
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('ai-consent-needed')).toBeVisible();
});
