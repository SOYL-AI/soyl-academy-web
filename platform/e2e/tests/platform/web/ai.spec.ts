import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, test } from './fixtures';
import { checkPage, CONTROL_ORIGIN, grantConsent, question, shot, signUp, startCh02Short } from './m34-helpers';

/**
 * M4 AI flows against the deterministic mock provider (api-e2e.ts), at 360 px:
 * consent-needed → consent → quote → stream → credits decrease (header chip) → hint → full solution →
 * failure before output refunded → photo doubt (browser re-encode, PUT to "Blob", complete, poll) →
 * explain this slide → AI evaluation of a written answer (labels, separate from the score) →
 * exhaustion → paywall with the reset countdown. No third-party requests (fixture); uploads go only to the
 * configured upload origin.
 */
const FAIL = 'E2E-FAIL-BEFORE-OUTPUT';

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

const chip = (page: Page) => page.getByTestId('credit-chip');

async function ask(page: Page, mode: 'Quick doubt' | 'Step by step' | 'Photo of a question', text: string, credits: number) {
  await page.getByRole('radio', { name: new RegExp(`^${mode}`) }).check();
  await page.getByTestId('ask-input').fill(text);
  await page.getByTestId('ask-send').click();
  const dialog = page.getByRole('dialog', { name: 'Use AI credits?' });
  await expect(dialog.getByTestId('quote')).toContainText(`${credits} credit`);
  await dialog.getByTestId('quote-confirm').click();
}

const lastAnswer = (page: Page) => page.locator('[data-role="assistant"]').last();

test('AI tutor: quote → stream → credits; hint → full; refund on failure; photo doubt; explain slide; AI evaluation; paywall', async ({ page, watch }) => {
  test.setTimeout(8 * 60_000);
  watch.allowOrigins.push(CONTROL_ORIGIN); // the upload origin (Blob storage stand-in), /ask only
  await signUp(page, 'ai', '/ask');
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('ai-consent-needed')).toBeVisible();
  await expect(chip(page)).toHaveCount(0);
  await checkPage(page);
  await shot(page, 'ask-consent-needed');

  await grantConsent(page);
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await expect(chip(page)).toHaveAttribute('data-balance', '25');

  // Quick doubt: 1 credit, quoted first, streamed, hint first.
  await ask(page, 'Quick doubt', 'Why does iron rust faster near the sea?', 1);
  await expect(lastAnswer(page)).toHaveAttribute('data-status', 'streaming');
  await expect(lastAnswer(page)).toContainText('[MOCK]');
  await shot(page, 'ask-streaming', false);
  await expect(lastAnswer(page)).toHaveAttribute('data-status', 'done', { timeout: 30_000 });
  await expect(lastAnswer(page)).toHaveAttribute('data-mode', 'hint');
  await expect(chip(page)).toHaveAttribute('data-balance', '24');

  // "Show full solution" in the same conversation.
  await page.getByTestId('reveal').click();
  await page.getByRole('dialog', { name: 'Use AI credits?' }).getByTestId('quote-confirm').click();
  await expect(lastAnswer(page)).toHaveAttribute('data-status', 'done', { timeout: 30_000 });
  await expect(lastAnswer(page)).toHaveAttribute('data-mode', 'full');
  await expect(lastAnswer(page)).toContainText('Full solution');
  await expect(chip(page)).toHaveAttribute('data-balance', '23');
  await checkPage(page);
  await shot(page, 'ask-answered');

  // The provider fails before any output: credits come back.
  await page.getByRole('button', { name: 'Start a new chat' }).click({ trial: true }).catch(() => undefined);
  await ask(page, 'Quick doubt', `What is the pH of pure water? ${FAIL}`, 1);
  await expect(page.getByText(/refunded/i).last()).toBeVisible({ timeout: 30_000 });
  await expect(chip(page)).toHaveAttribute('data-balance', '23');
  const credits = await (await page.request.get('/api/platform/v1/credits')).json();
  expect(credits.balance).toBe(23);

  // Photo doubt: the browser re-encodes the photo and PUTs it straight to storage.
  const png = await page.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 300;
    const x = c.getContext('2d')!;
    x.fillStyle = '#fff';
    x.fillRect(0, 0, 600, 300);
    x.fillStyle = '#000';
    x.font = '32px sans-serif';
    x.fillText('Solve: 2x + 3 = 11', 40, 150);
    return c.toDataURL('image/png').split(',')[1]!;
  });
  await page.getByRole('radio', { name: /^Photo of a question/ }).check();
  await page.getByTestId('photo-input').setInputFiles({ name: 'question.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  const put = page.waitForRequest((r) => r.url().startsWith(`${CONTROL_ORIGIN}/blob`) && r.method() === 'PUT');
  await page.getByTestId('ask-send').click();
  await expect(page.getByRole('dialog', { name: 'Use AI credits?' }).getByTestId('quote')).toContainText('10 credits');
  await page.getByRole('dialog', { name: 'Use AI credits?' }).getByTestId('quote-confirm').click();
  const putReq = await put;
  expect(putReq.headers()['content-type']).toBe('image/jpeg'); // re-encoded: EXIF-free JPEG
  expect(putReq.headers()['cookie']).toBeUndefined();
  await expect(lastAnswer(page)).toContainText('I read the question in your photo', { timeout: 60_000 });
  await expect(lastAnswer(page)).toHaveAttribute('data-status', 'done', { timeout: 30_000 });
  await expect(chip(page)).toHaveAttribute('data-balance', '13');

  // History.
  await page.getByText('Your recent chats').click();
  await expect(page.locator('details').getByRole('button').first()).toBeVisible();

  // Explain this slide (1 credit, quoted in the dialog).
  await page.goto('/learn/cbse/10/science/ch01/lesson', { waitUntil: 'networkidle' });
  await page.getByTestId('explain-slide').click();
  const explain = page.getByTestId('explain-dialog');
  await explain.getByTestId('explain-confirm').click();
  await expect(explain.locator('[data-role="assistant"]')).toHaveAttribute('data-status', 'done', { timeout: 30_000 });
  await expect(explain).toContainText('[MOCK]');
  await checkPage(page);
  await shot(page, 'explain-slide', false);
  await page.keyboard.press('Escape');
  await expect(chip(page)).toHaveAttribute('data-balance', '12');

  // AI evaluation of a written answer: quote, job, labels; the score does not change.
  const attemptId = await startCh02Short(page);
  for (let i = 0; i < 4; i++) await page.getByTestId('next-question').click();
  await question(page, 'q_cbse10sci_ch02_026').locator('textarea').fill('Hydrogen chloride gives hydrogen ions only in water. Dry HCl gas has no free ions, so it cannot change the colour of dry litmus paper. In water it ionises fully.');
  await page.getByTestId('submit-open').click();
  await page.getByTestId('confirm-submit').click();
  await page.waitForURL(new RegExp(`/tests/result/${attemptId}`));
  const before = await page.getByTestId('score').textContent();
  await page.getByTestId('ai-evaluate-all').click();
  await expect(page.getByRole('dialog', { name: 'Use AI credits?' }).getByTestId('quote')).toContainText('6 credits');
  await page.getByRole('dialog', { name: 'Use AI credits?' }).getByTestId('quote-confirm').click();
  await expect(page.getByTestId('ai-marks')).toBeVisible({ timeout: 60_000 });
  await expect(page.getByTestId('ai-marks')).toContainText(/AI-graded/);
  await expect(page.getByTestId('ai-marks')).toContainText('Not part of your score');
  expect(await page.getByTestId('score').textContent()).toBe(before);
  await checkPage(page);
  await shot(page, 'test-result-ai');
  await expect(chip(page)).toHaveAttribute('data-balance', '6');

  // Out of credits: the quote stops it and the paywall shows the reset countdown and plans.
  await page.goto('/ask', { waitUntil: 'networkidle' });
  await ask(page, 'Step by step', 'Balance Fe + O2 → Fe2O3 step by step.', 6);
  await expect(lastAnswer(page)).toHaveAttribute('data-status', 'done', { timeout: 30_000 });
  await expect(chip(page)).toHaveAttribute('data-balance', '0');
  await page.getByRole('radio', { name: /^Step by step/ }).check();
  await page.getByTestId('ask-input').fill('One more question about acids.');
  await page.getByTestId('ask-send').click();
  await expect(page.getByTestId('paywall')).toBeVisible();
  await expect(page.getByTestId('reset-countdown')).toContainText(/in \d/);
  await expect(page.getByTestId('paywall-plans')).toHaveAttribute('href', '/plans');
  await checkPage(page);
  await shot(page, 'paywall', false);

  // The API agrees (402 with the countdown and plans link), and non-AI features keep working.
  const refused = await page.request.post('/api/platform/v1/ai/hard-doubt', { data: { message: 'x?' }, headers: { origin: new URL(page.url()).origin, 'idempotency-key': 'e2e-paywall-12345' } });
  expect(refused.status()).toBe(402);
  expect(await refused.json()).toMatchObject({ code: 'credits_exhausted', plansUrl: expect.any(String), resetInSeconds: expect.any(Number) });
  expect((await page.request.get('/api/platform/v1/chapters/cbse-10-science-ch01/practice?limit=1')).status()).toBe(200);
});
