import { acceptAllCookies, expect, test } from './fixtures';
import { checkPage, ctl, grantConsent, shot, signUp } from './m34-helpers';

/**
 * M4 /plans with the Razorpay stub (billing enabled in the e2e API): plans from the API with GST-inclusive
 * labels; CSP allows Razorpay only here; consent-needed state; buy Plus → Checkout (a stand-in for
 * checkout.js, served by Playwright) → signed webhook through the web proxy (body bytes unchanged) →
 * the plan is active within 60 s, credits topped up; /me shows it and cancels at period end.
 */
const RZP = 'https://checkout.razorpay.com';

/** A stand-in for checkout.js: records the options and "pays" (calls the success handler). */
const FAKE_CHECKOUT = `
window.Razorpay = function (options) {
  window.__rzpOptions = JSON.parse(JSON.stringify(options, (k, v) => (typeof v === 'function' ? '[fn]' : v)));
  this.open = function () {
    setTimeout(function () { options.handler({ razorpay_payment_id: 'pay_fake', razorpay_subscription_id: options.subscription_id, razorpay_signature: 'sig_fake' }); }, 300);
  };
};`;

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

test('/plans: public, GST-inclusive prices from the API; Razorpay CSP only here; no Checkout script until Buy', async ({ page }) => {
  const res = await page.goto('/plans', { waitUntil: 'networkidle' });
  expect(res?.status()).toBe(200);
  const csp = res!.headers()['content-security-policy']!;
  expect(csp).toContain(`script-src 'self' 'unsafe-inline' ${RZP}`);
  expect(csp).toContain('frame-src https://api.razorpay.com');
  expect(res!.headers()['cross-origin-opener-policy']).toBe('same-origin-allow-popups');
  await expect(page.getByTestId('plans')).toHaveAttribute('data-billing', 'on');
  const plus = page.locator('[data-plan="plus"]');
  await expect(plus).toContainText('₹199');
  await expect(plus).toContainText('incl. GST');
  await expect(plus).toContainText('40 AI credits every day');
  // D-034: "papers like my school's" is Pro and Board Exam Pass only, as the API says.
  await expect(plus).not.toContainText('Papers like my school');
  await expect(page.locator('[data-plan="pro"]')).toContainText('Papers like my school');
  await checkPage(page);
  for (const path of ['/learn', '/tests', '/ask']) {
    const r = await page.request.get(path);
    expect(r.headers()['content-security-policy'], path).not.toContain('razorpay');
  }
});

test('buy Plus: Checkout (no prefill) → signed webhook via the proxy → plan active ≤ 60 s → /me cancel', async ({ page, watch }) => {
  test.setTimeout(4 * 60_000);
  watch.allowOrigins.push(RZP); // /plans only
  await page.route(`${RZP}/v1/checkout.js`, (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: FAKE_CHECKOUT }));

  await signUp(page, 'plans', '/plans');
  await page.goto('/plans', { waitUntil: 'networkidle' });
  // Without a parent's approval nobody can buy (D-014, billing M4).
  await expect(page.getByTestId('plans-consent')).toBeVisible();
  await expect(page.getByTestId('buy-plus')).toBeDisabled();

  await grantConsent(page);
  await page.goto('/plans', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('credit-chip')).toHaveAttribute('data-balance', '25');
  const refreshBodies: unknown[] = [];
  page.on('request', (r) => {
    if (r.url().endsWith('/api/platform/v1/billing/refresh')) refreshBodies.push(r.postDataJSON());
  });
  const created = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/billing/subscriptions') && r.status() === 201);
  const started = Date.now();
  await page.getByTestId('buy-plus').click();
  await created;
  await expect(page.getByTestId('activating')).toBeVisible();
  const options = await page.evaluate(() => (window as unknown as { __rzpOptions: Record<string, unknown> }).__rzpOptions);
  expect(options.subscription_id).toMatch(/^sub_/);
  expect(options).not.toHaveProperty('prefill');

  // Razorpay's side: the payment completes and its signed webhooks arrive through our proxy.
  const paid = await ctl<{ id: string; webhooks: { rawBody: string; headers: Record<string, string> }[] }>('/ctl/razorpay/pay-latest', { kind: 'subscription' });
  expect(paid.id).toBe(options.subscription_id);
  for (const w of paid.webhooks) {
    const r = await page.request.post('/api/platform/v1/webhooks/razorpay', { data: w.rawBody, headers: w.headers });
    expect(r.status(), await r.text()).toBe(200);
  }
  // A body changed by one byte is refused: the proxy must not re-encode (HMAC).
  const tampered = await page.request.post('/api/platform/v1/webhooks/razorpay', { data: `${paid.webhooks[0]!.rawBody} `, headers: { ...paid.webhooks[0]!.headers, 'x-razorpay-event-id': 'evt_e2e_tampered' } });
  expect(tampered.status()).toBe(400);

  await expect(page.getByTestId('activated')).toBeVisible({ timeout: 60_000 });
  expect(Date.now() - started).toBeLessThan(60_000);
  expect(refreshBodies.every((b) => JSON.stringify(b) === '{}')).toBe(true); // never the Checkout response
  await expect(page.getByTestId('credit-chip')).toHaveAttribute('data-balance', '40');
  await expect(page.getByTestId('current-plan')).toContainText('Plus');
  await checkPage(page);
  await shot(page, 'plans');

  await page.goto('/me', { waitUntil: 'networkidle' });
  const sub = page.getByTestId('subscription');
  await expect(sub).toContainText('Plus');
  await sub.getByTestId('cancel-plan').click();
  await page.getByTestId('confirm-cancel-plan').click();
  await expect(sub).toContainText('will not renew');
  await checkPage(page);
});
