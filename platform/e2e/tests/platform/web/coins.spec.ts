import type { Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures';
import { checkPage, ctl, shot, signUp } from './m34-helpers';

/**
 * SOYL Coins (D-037, ADR-021) against the real local API (embedded Postgres, published content) through
 * `next start` with the flag on. The e2e API runs with merch redemption switched off (the production
 * default, COINS_PHYSICAL_REDEMPTION_ENABLED unset), so merch is "Coming soon" from the real API; the
 * consent-needed state is shown by replaying the real store response with redemption switched on.
 */

async function balance(page: Page): Promise<number> {
  const res = await page.request.get('/api/platform/v1/coins');
  expect(res.status()).toBe(200);
  return ((await res.json()) as { balance: number }).balance;
}

async function userId(page: Page): Promise<string> {
  const res = await page.request.get('/api/platform/v1/session');
  return ((await res.json()) as { user: { id: string } }).user.id;
}

test('check-in: +1 coin once per IST day, chip and history update, button disabled after', async ({ page }) => {
  await signUp(page, 'coins-checkin', '/coins');
  await expect(page.getByTestId('coins-page')).toBeVisible();
  const chip = page.getByTestId('coin-chip');
  await expect(chip).toHaveAttribute('data-balance', '0');
  await expect(chip).toHaveAttribute('href', '/coins');
  await expect(page.getByTestId('how-to-earn')).toContainText('Check in once a day');
  await checkPage(page);
  await shot(page, 'coins');

  const checkIn = page.getByTestId('check-in-button');
  await expect(checkIn).toBeEnabled();
  const post = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/coins/check-in') && r.request().method() === 'POST');
  await checkIn.click();
  expect((await post).status()).toBe(200);
  await expect(page.getByTestId('check-in-result')).toHaveText('+1 coin: daily check-in');
  await expect(checkIn).toBeDisabled();
  await expect(checkIn).toHaveText(/Checked in today/);
  await expect(page.getByTestId('check-in-streak')).toContainText('1-day streak');
  await expect(chip).toHaveAttribute('data-balance', '1');
  expect(await balance(page)).toBe(1);

  // Once per day: after a reload it stays done, and the history shows one check-in.
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('check-in-button')).toBeDisabled();
  await expect(page.getByTestId('coins-balance')).toHaveAttribute('data-balance', '1');
  await expect(page.getByTestId('coin-history-row')).toHaveCount(1);
  await expect(page.getByTestId('coin-history-row').first()).toHaveAttribute('data-source', 'checkin');
  // The API is idempotent too.
  const again = await page.evaluate(async () => {
    const r = await fetch('/api/platform/v1/coins/check-in', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    return (await r.json()) as { alreadyCheckedIn: boolean; coinsAwarded: number; balance: number };
  });
  expect(again).toMatchObject({ alreadyCheckedIn: true, coinsAwarded: 0, balance: 1 });
  await checkPage(page);
});

const CHOICE_TYPES = ['mcq', 'true-false', 'assertion-reason', 'multi-select'];

async function answerChoice(page: Page, solver: Locator, optionIds: string[]) {
  for (const id of optionIds) await solver.locator(`[data-option-id="${id}"] input`).check();
  const res = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/practice/answers') && r.request().method() === 'POST');
  await solver.getByRole('button', { name: 'Check answer' }).click();
  const r = await res;
  expect(r.status()).toBe(200);
  return (await r.json()) as { correct: boolean | null; key: { answer: { option_ids?: string[] } }; coinsAwarded: number; coinAwards: { source: string; amount: number }[] };
}

test('daily challenge on the class hub: guests are invited to log in; a right answer earns +5 coins once', async ({ page }) => {
  // Guest view first.
  await page.goto('/learn/cbse/10', { waitUntil: 'networkidle' });
  const card = page.getByTestId('daily-challenge');
  await expect(card).toBeVisible();
  await expect(card.getByTestId('challenge-login')).toBeVisible();
  await expect(card.getByTestId('challenge-status')).toContainText('Log in to earn coins');
  expect(await card.getByTestId('challenge-item').count()).toBeGreaterThan(0);
  await checkPage(page);

  await signUp(page, 'coins-challenge', '/learn/cbse/10');
  await expect(card.getByTestId('check-in-button')).toBeVisible();
  await expect(card).toHaveAttribute('data-earned', 'false');
  const types = await card.getByTestId('challenge-item').evaluateAll((els) => els.map((e) => e.getAttribute('data-question-type')));
  const index = types.findIndex((t) => CHOICE_TYPES.includes(t ?? ''));
  expect(index, `a choice-type challenge among ${types.join(', ')}`).toBeGreaterThanOrEqual(0);
  const row = card.getByTestId('challenge-item').nth(index);
  await row.getByRole('button', { name: /^Solve: / }).click();

  const solver = page.getByTestId('challenge-solver');
  await expect(solver.locator('article[data-question-id]')).toBeVisible();
  await checkPage(page);
  // First try: the first option. If it was wrong, try again with the key the server revealed.
  const optionIds = await solver.locator('[data-option-id]').evaluateAll((els) => els.map((e) => e.getAttribute('data-option-id')!));
  let result = await answerChoice(page, solver, [optionIds[0]!]);
  if (result.correct !== true) {
    expect(result.coinsAwarded).toBe(0);
    await solver.getByRole('button', { name: 'Try again' }).click();
    for (const id of optionIds) {
      const box = solver.locator(`[data-option-id="${id}"] input`);
      if ((await box.getAttribute('type')) === 'checkbox' && (await box.isChecked())) await box.uncheck();
    }
    result = await answerChoice(page, solver, result.key.answer.option_ids!);
  }
  expect(result.correct).toBe(true);
  expect(result.coinsAwarded).toBe(5);
  expect(result.coinAwards).toEqual([expect.objectContaining({ source: 'daily_challenge', amount: 5 })]);

  // Announced (aria-live toast region), chip and card updated.
  await expect(page.getByRole('status').filter({ hasText: '+5 coins: daily challenge' })).toBeVisible();
  await expect(page.getByTestId('coin-chip')).toHaveAttribute('data-balance', '5');
  await shot(page, 'daily-challenge-solved');
  await page.keyboard.press('Escape');
  await expect(solver).toBeHidden();
  await expect(row).toHaveAttribute('data-solved', 'true');
  await expect(card).toHaveAttribute('data-earned', 'true');
  expect(await balance(page)).toBe(5);

  // Only one challenge award a day: a reload keeps it solved and earned.
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('daily-challenge')).toHaveAttribute('data-earned', 'true');
  await checkPage(page);
});

test('store: digital redeem → owned → equip; merch "Coming soon" while redemption is off', async ({ page }) => {
  // Guests may look.
  await page.goto('/store', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1, name: 'The SOYL Store' })).toBeVisible();
  await expect(page.locator('[data-item="frame-saffron"]')).toHaveAttribute('data-state', 'sign_in');
  await checkPage(page);

  await signUp(page, 'coins-store', '/store');
  await ctl('/ctl/coins/grant', { userId: await userId(page), amount: 100 });
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('store-balance')).toContainText('100');

  // Merch: "Coming soon" from the real API (COINS_PHYSICAL_REDEMPTION_ENABLED off), no redeem button.
  await expect(page.getByTestId('merch-coming-soon')).toBeVisible();
  const hoodie = page.locator('[data-item="hoodie"]');
  await expect(hoodie).toHaveAttribute('data-state', 'coming_soon');
  await expect(hoodie.getByTestId('item-state')).toHaveText('Coming soon');
  await expect(hoodie.getByTestId('redeem')).toHaveCount(0);
  // Locked by an achievement, with the rule shown.
  const constellation = page.locator('[data-item="frame-constellation"]');
  await expect(constellation).toHaveAttribute('data-state', 'locked');
  await expect(constellation).toContainText('Solve 200 practice questions');
  // Too expensive for 100 coins.
  await expect(page.locator('[data-item="theme-streak-flame"]')).toHaveAttribute('data-state', /locked|insufficient_coins/);
  await checkPage(page);
  await shot(page, 'store');

  const frame = page.locator('[data-item="frame-saffron"]');
  await expect(frame).toHaveAttribute('data-state', 'available');
  await frame.getByTestId('redeem').click();
  const dialog = page.getByRole('dialog', { name: 'Redeem Saffron profile frame?' });
  await expect(dialog).toContainText('Balance after: 40 coins.');
  await checkPage(page);
  const redeem = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/coins/redeem') && r.request().method() === 'POST');
  await dialog.getByTestId('confirm-redeem').click();
  expect((await redeem).status()).toBe(200);
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('status').filter({ hasText: 'Unlocked: Saffron profile frame' })).toBeVisible();
  await expect(frame).toHaveAttribute('data-state', 'owned');
  await expect(page.getByTestId('coin-chip')).toHaveAttribute('data-balance', '40');
  await expect(page.getByTestId('redemption').filter({ hasText: 'Saffron profile frame' })).toContainText('Unlocked');
  expect(await balance(page)).toBe(40);

  await frame.getByTestId('equip').click();
  await expect(frame.getByTestId('equip')).toHaveAttribute('aria-pressed', 'true');
  const coins = (await (await page.request.get('/api/platform/v1/coins')).json()) as { equipped: { frame: string | null } };
  expect(coins.equipped.frame).toBe('frame-saffron');

  // A second redeem of an owned digital item is refused by the API (redemption_limit).
  const twice = await page.evaluate(async () => {
    const r = await fetch('/api/platform/v1/coins/redeem', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ itemKey: 'frame-saffron' }) });
    return { status: r.status, code: ((await r.json()) as { code: string }).code };
  });
  expect(twice).toEqual({ status: 409, code: 'redemption_limit' });
  // Merch is refused by the API while redemption is off (or before consent), never silently accepted.
  const merch = await page.evaluate(async () => {
    const r = await fetch('/api/platform/v1/coins/redeem', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ itemKey: 'sticker-pack' }) });
    return { status: r.status, code: ((await r.json()) as { code: string }).code };
  });
  expect(merch.status).toBe(403);
  expect(['redemption_disabled', 'consent_required', 'verification_required']).toContain(merch.code);
  await checkPage(page);
});

test('store: merch needs a parent’s approval — explained, with the way to ask', async ({ page }) => {
  await signUp(page, 'coins-consent', '/store');
  // Replay the real store response as an environment with merch redemption switched on would serve it
  // to a student without consent (the e2e API runs with redemption off, the production default).
  await page.route('**/api/platform/v1/coins/store', async (route) => {
    const res = await route.fetch();
    const body = (await res.json()) as { physicalRedemptionEnabled: boolean; consentStatus: string | null; items: { type: string; state: string }[] };
    body.physicalRedemptionEnabled = true;
    body.consentStatus = 'required';
    for (const i of body.items) if (i.type === 'physical' && i.state === 'coming_soon') i.state = 'consent_needed';
    await route.fulfill({ response: res, json: body });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('merch-consent')).toContainText('a parent or guardian must approve first');
  const stickers = page.locator('[data-item="sticker-pack"]');
  await expect(stickers).toHaveAttribute('data-state', 'consent_needed');
  await expect(stickers.getByRole('link', { name: 'Parent approval needed' })).toHaveAttribute('href', '/me');
  await expect(stickers.getByTestId('item-note')).toContainText('A parent or guardian must approve before we can send merch to your home.');
  await expect(stickers.getByTestId('redeem')).toHaveCount(0);
  await expect(page.getByTestId('address-form')).toHaveCount(0);
  await checkPage(page);
  await shot(page, 'store-consent-needed');
});
