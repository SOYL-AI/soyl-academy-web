import type { Locator, Page } from '@playwright/test';
import { expect, test } from './fixtures';
import { checkPage, shot, signUp } from './m34-helpers';

/**
 * SOYL Coins (D-037, D-038, ADR-021) against the real local API (embedded Postgres, published content)
 * through `next start` with the flag on, in the launch configuration: earning (check-in, the daily
 * challenge through practice) is live, redemption is switched off (COINS_REDEMPTION_ENABLED unset), so
 * /store is a coming-soon page. Redemption itself is covered by the API integration tests and the web unit
 * tests (the redemption UI renders only when the API reports redemptionEnabled).
 */

async function balance(page: Page): Promise<number> {
  const res = await page.request.get('/api/platform/v1/coins');
  expect(res.status()).toBe(200);
  return ((await res.json()) as { balance: number }).balance;
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

test('store: "Exclusive rewards — coming soon" with how to earn; nothing can be redeemed or equipped (D-038)', async ({ page }) => {
  // Guests may look.
  await page.goto('/store', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1, name: 'Exclusive rewards — coming soon' })).toBeVisible();
  await expect(page.getByTestId('store')).toHaveAttribute('data-redemption', 'off');
  await expect(page.getByTestId('store-coming-soon')).toBeVisible();
  await expect(page.getByTestId('store-teaser')).toHaveCount(3);
  await expect(page.getByText(/Our merch is being designed now/)).toBeVisible();
  await expect(page.getByTestId('store-how-to-earn')).toHaveAttribute('href', '/coins');
  await checkPage(page);

  await signUp(page, 'coins-store', '/store');
  await expect(page.getByTestId('store-balance')).toContainText('0');
  // No items, prices, redeem or equip entry points; no address form.
  for (const id of ['store-item', 'redeem', 'equip', 'address-form', 'my-redemptions']) await expect(page.getByTestId(id), id).toHaveCount(0);
  await expect(page.getByRole('button', { name: /redeem|equip/i })).toHaveCount(0);
  await checkPage(page);
  await shot(page, 'store-coming-soon');

  // The API agrees: an empty store, and every spending call is refused with redemption_disabled.
  const store = (await (await page.request.get('/api/platform/v1/coins/store')).json()) as { redemptionEnabled: boolean; items: unknown[] };
  expect(store).toMatchObject({ redemptionEnabled: false, items: [] });
  const refused = await page.evaluate(async () => {
    const call = async (method: string, path: string, body: unknown) => {
      const r = await fetch(`/api/platform${path}`, { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      return `${r.status} ${((await r.json()) as { code: string }).code}`;
    };
    return [await call('POST', '/v1/coins/redeem', { itemKey: 'frame-saffron' }), await call('PUT', '/v1/coins/equipped', { frame: 'frame-saffron' })];
  });
  expect(refused).toEqual(['403 redemption_disabled', '403 redemption_disabled']);
  expect(await balance(page)).toBe(0);
});
