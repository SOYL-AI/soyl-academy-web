import { expect, test as base, type APIRequestContext, type Page } from '@playwright/test';

/**
 * Shared fixtures for the platform web e2e. Every test is watched for:
 * - CSP violations (WEB-3: zero during the suite),
 * - requests to any origin other than the site (WEB-1; Google sign-in may allow the mock OIDC origin),
 * - Vercel Analytics / Speed Insights requests on platform pages (ADR-001 §8),
 * - uncaught page errors.
 */
export interface Watch {
  csp: string[];
  foreign: string[];
  vercel: string[];
  pageErrors: string[];
  allowOrigins: string[];
}

export const test = base.extend<{ watch: Watch }>({
  watch: [
    async ({ page, baseURL }, use) => {
      const origin = new URL(baseURL!).origin;
      const w: Watch = { csp: [], foreign: [], vercel: [], pageErrors: [], allowOrigins: [] };
      page.on('console', (m) => {
        const t = m.text();
        if (/Content Security Policy|Refused to (load|execute|apply|connect|frame)/i.test(t)) w.csp.push(t);
      });
      page.on('pageerror', (e) => w.pageErrors.push(e.message));
      page.on('request', (r) => {
        const url = r.url();
        if (url.startsWith('data:') || url.startsWith('blob:')) return;
        const o = new URL(url).origin;
        if (url.includes('/_vercel/')) w.vercel.push(url);
        if (o !== origin && !w.allowOrigins.includes(o)) w.foreign.push(url);
      });
      await use(w);
      expect(w.csp, 'CSP violations').toEqual([]);
      expect(w.foreign, 'third-party requests').toEqual([]);
      expect(w.vercel, 'Vercel analytics requests on platform pages').toEqual([]);
      expect(w.pageErrors, 'page errors').toEqual([]);
    },
    { auto: true },
  ],
});
export { expect };

let seq = 0;
const runId = Date.now().toString(36).slice(-5);

export function uniqueEmail(tag: string): string {
  seq += 1;
  return `e2e-${tag}-${runId}-${seq}@example.com`;
}

/** Reserved test range +91555000xxxx (GEN-2). */
export function uniquePhone(): string {
  seq += 1;
  const n = (Number.parseInt(runId, 36) * 7 + seq * 131) % 10000;
  return `555000${String(n).padStart(4, '0')}`;
}

/** Latest mock OTP for a test identifier (GET /v1/dev/otp-outbox, local only). */
export async function otpFor(request: APIRequestContext, identifier: string): Promise<string> {
  for (let i = 0; i < 40; i++) {
    const res = await request.get(`/api/platform/v1/dev/otp-outbox?to=${encodeURIComponent(identifier)}`);
    if (res.ok()) {
      const body = (await res.json()) as { code: string | null };
      if (body.code) return body.code;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`no OTP for ${identifier}`);
}

/** Personal data must never appear in a URL (WEB-12). */
export function expectCleanUrl(page: Page, ...secrets: string[]) {
  const url = decodeURIComponent(page.url());
  for (const s of secrets) expect(url, `URL must not contain ${s}`).not.toContain(s);
}

export async function openLoginFromHeader(page: Page) {
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('dialog', { name: 'Log in to SOYL Academy' })).toBeVisible();
}

export async function signInWithEmail(page: Page, email: string) {
  const dialog = page.getByRole('dialog', { name: 'Log in to SOYL Academy' });
  await dialog.getByRole('tab', { name: 'Email' }).click();
  await dialog.getByLabel('Email address').fill(email);
  await dialog.getByRole('button', { name: 'Send code' }).click();
  await expect(dialog.getByText('We sent a 6-digit code to')).toBeVisible();
  expectCleanUrl(page, email);
  const code = await otpFor(page.request, email);
  await dialog.getByLabel('Code', { exact: true }).fill(code);
  await expect(dialog).toBeHidden();
  await expect(page.getByTestId('profile-link')).toBeVisible();
  expectCleanUrl(page, email, code);
}

export async function signInWithPhone(page: Page, national: string) {
  const dialog = page.getByRole('dialog', { name: 'Log in to SOYL Academy' });
  await dialog.getByRole('tab', { name: 'Phone' }).click();
  await dialog.getByLabel(/Mobile number/).fill(national);
  await dialog.getByRole('button', { name: 'Send code' }).click();
  await expect(dialog.getByText('We sent a 6-digit code to')).toBeVisible();
  const code = await otpFor(page.request, `+91${national}`);
  await dialog.getByLabel('Code', { exact: true }).fill(code);
  await expect(dialog).toBeHidden();
  await expect(page.getByTestId('profile-link')).toBeVisible();
  expectCleanUrl(page, national, code);
}

/** WEB-5: only these localStorage keys may exist on platform pages. */
export const ALLOWED_STORAGE_KEYS = ['soyl_guest_v1', 'soyl_cookie_consent_v1'];

export async function storageKeys(page: Page): Promise<string[]> {
  return page.evaluate(() => Object.keys(window.localStorage));
}

/** Cookie choice pre-set so the cookie bar does not cover the page ("Accept all" for WEB-1 checks). */
export async function acceptAllCookies(page: Page) {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem('soyl_cookie_consent_v1', JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() }));
    } catch {
      // ignore
    }
  });
}

export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(0);
}
