import { acceptAllCookies, expect, test } from './fixtures';
import { authoredQuestions, checkPage, CONTROL_ORIGIN, ctl, grantConsent, openFromPalette, question, shot, signUp, startCh02Short } from './m34-helpers';

/**
 * M3 test player and test pages against the real local API (api-e2e.ts) at 360 px:
 * - series → start → answer → autosave → reload resumes → 2 minutes offline (answers kept on the device,
 *   offline banner) → reconnect flushes → nothing lost → submit → result right for a known answer set →
 *   self-evaluation per step;
 * - auto-submit at the (server) deadline;
 * - custom builder (+ bank_too_small);
 * - live mock: register, countdown, start, rank, consent-needed leaderboard;
 * - axe (no serious/critical), no horizontal scroll, no third-party requests (fixture).
 */
const CH = 'cbse-10-science-ch02';
const KEYS = authoredQuestions('science', CH);
const Q = { mcq1: 'q_cbse10sci_ch02_008', mcq2: 'q_cbse10sci_ch02_032', mcq3: 'q_cbse10sci_ch02_041', ar: 'q_cbse10sci_ch02_050', short1: 'q_cbse10sci_ch02_026' };
const correct = (id: string) => (KEYS.get(id)!.answer as { option_ids: string[] }).option_ids[0]!;
const wrong = (id: string) => ['a', 'b', 'c', 'd'].find((o) => o !== correct(id))!;

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

async function waitForSave(page: import('@playwright/test').Page) {
  return page.waitForResponse((r) => /\/api\/platform\/v1\/attempts\/[^/]+\/responses$/.test(r.url()) && r.request().method() === 'PUT' && r.status() === 200, { timeout: 30_000 });
}

test('test player: autosave, reload, 2 minutes offline, reconnect, submit; result right for a known answer set; self-evaluation', async ({ page, context }) => {
  test.setTimeout(9 * 60_000);
  await signUp(page, 'player', '/tests');
  await expect(page.getByTestId('subject-list')).toBeVisible();
  await checkPage(page);
  await shot(page, 'tests-home');

  const attemptId = await startCh02Short(page);
  await checkPage(page);

  // Q1 right, Q2 wrong (choices are recorded at once and flushed on the 10 s cadence).
  await question(page, Q.mcq1).locator(`[data-option-id="${correct(Q.mcq1)}"] input`).check();
  const saved = waitForSave(page);
  await page.getByTestId('next-question').click();
  await question(page, Q.mcq2).locator(`[data-option-id="${wrong(Q.mcq2)}"] input`).check();
  const body = (await (await saved).request().postDataJSON()) as { items: { itemId: string; seq: number; changedAt: string }[] };
  expect(body.items.length).toBeGreaterThan(0);
  expect(body.items[0]!.seq).toBeGreaterThan(1_700_000_000_000);
  await expect(page.getByTestId('save-status')).toHaveAttribute('data-pending', '0', { timeout: 30_000 });

  // A reload resumes the attempt with every answer (server + this device).
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('test-player')).toHaveAttribute('data-ready', 'true');
  await expect(question(page, Q.mcq3)).toBeVisible(); // opens at the first unanswered question
  await openFromPalette(page, 1);
  await expect(question(page, Q.mcq1).locator(`[data-option-id="${correct(Q.mcq1)}"] input`)).toBeChecked();

  // Offline for 2 minutes: keep answering; answers stay on the device.
  await context.setOffline(true);
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await openFromPalette(page, 3);
  await question(page, Q.mcq3).locator(`[data-option-id="${correct(Q.mcq3)}"] input`).check();
  await page.getByTestId('next-question').click();
  await question(page, Q.ar).locator(`[data-option-id="${correct(Q.ar)}"] input`).check();
  await page.getByTestId('mark-review').click();
  await page.getByTestId('next-question').click();
  const answerText = 'In water HCl gives H+ ions, so it is acidic. Dry HCl gas has no H+ ions, so it does not change litmus.';
  await question(page, Q.short1).locator('textarea').fill(answerText);
  await expect(page.getByTestId('offline-banner')).toBeVisible();
  await shot(page, 'test-player-offline', false);
  await page.waitForTimeout(120_000);
  await expect(page.getByTestId('save-status')).toHaveAttribute('data-status', 'offline');
  expect(Number(await page.getByTestId('save-status').getAttribute('data-pending'))).toBeGreaterThanOrEqual(3);
  await page.getByTestId('open-palette').click();
  await expect(page.getByTestId('palette')).toBeVisible();
  await shot(page, 'test-player-palette', false);
  await checkPage(page);
  await page.keyboard.press('Escape');

  // Back online: the queue flushes at once and nothing is lost.
  const flushed = waitForSave(page);
  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await flushed;
  await expect(page.getByTestId('save-status')).toHaveAttribute('data-pending', '0', { timeout: 30_000 });
  await expect(page.getByTestId('offline-banner')).toBeHidden();
  const state = await (await page.request.get(`/api/platform/v1/attempts/${attemptId}`)).json();
  const byQuestion = new Map<string, { response: unknown; markedForReview: boolean }>();
  for (const r of state.responses) byQuestion.set(state.items.find((i: { itemId: string }) => i.itemId === r.itemId).question.id, r);
  expect(byQuestion.get(Q.mcq1)!.response).toEqual({ option_ids: [correct(Q.mcq1)] });
  expect(byQuestion.get(Q.mcq2)!.response).toEqual({ option_ids: [wrong(Q.mcq2)] });
  expect(byQuestion.get(Q.mcq3)!.response).toEqual({ option_ids: [correct(Q.mcq3)] });
  expect(byQuestion.get(Q.ar)).toMatchObject({ response: { option_ids: [correct(Q.ar)] }, markedForReview: true });
  expect(byQuestion.get(Q.short1)!.response).toEqual({ text: answerText });
  expect(state.attempt.tabSwitchCount).toBeGreaterThanOrEqual(0);

  // Reload once more: the written answer is back too.
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('test-player')).toHaveAttribute('data-ready', 'true');
  await openFromPalette(page, 5);
  await expect(question(page, Q.short1).locator('textarea')).toHaveValue(answerText);

  // Submit with confirmation.
  await page.getByTestId('submit-open').click();
  await expect(page.getByTestId('submit-summary')).toContainText('5');
  await page.getByTestId('confirm-submit').click();
  await page.waitForURL(new RegExp(`/tests/result/${attemptId}`));
  const expectedAuto = [Q.mcq1, Q.mcq3, Q.ar].reduce((n, id) => n + KEYS.get(id)!.marks, 0);
  await expect(page.getByTestId('score')).toContainText(`${expectedAuto} / 20`);
  await expect(page.getByTestId('pending-self')).toBeVisible();
  await expect(page.getByTestId('percentile')).toContainText('–');
  await expect(page.locator(`li[data-status="correct"] article[data-question-id="${Q.mcq1}"]`)).toBeVisible();
  await expect(page.locator(`li[data-status="wrong"] article[data-question-id="${Q.mcq2}"]`)).toBeVisible();
  // AI marking needs a parent's approval (D-014): friendly state, no AI call.
  await expect(page.getByTestId('ai-evaluation').getByTestId('ai-consent-needed')).toBeVisible();

  // Self-evaluation per marking-scheme step: the total rises, the auto score does not.
  const item = page.locator('li[data-item-id]').filter({ has: question(page, Q.short1) });
  const form = item.getByTestId('self-eval');
  const selects = form.locator('select');
  const n = await selects.count();
  for (let i = 0; i < n; i++) await selects.nth(i).selectOption({ index: (await selects.nth(i).locator('option').count()) - 1 });
  const evaluated = page.waitForResponse((r) => r.url().endsWith(`/attempts/${attemptId}/self-evaluation`) && r.status() === 200);
  await form.getByRole('button', { name: 'Save my marks' }).click();
  const result = await (await evaluated).json();
  expect(result.score.auto).toBe(expectedAuto);
  expect(result.score.self).toBe(KEYS.get(Q.short1)!.marks);
  await expect(page.getByTestId('score')).toContainText(`${expectedAuto + KEYS.get(Q.short1)!.marks} / 20`);
  await checkPage(page);
  await shot(page, 'test-result');

  // WEB-10: submit clears the device queue; WEB-5: localStorage keeps only the allowlisted keys.
  const keys = await page.evaluate(() => Object.keys(window.localStorage));
  expect(keys.every((k) => ['soyl_guest_v1', 'soyl_cookie_consent_v1'].includes(k))).toBe(true);
});

test('auto-submit when the server deadline passes', async ({ page }) => {
  test.setTimeout(4 * 60_000);
  await signUp(page, 'autosubmit', '/tests');
  const attemptId = await startCh02Short(page);
  await question(page, Q.mcq1).locator(`[data-option-id="${correct(Q.mcq1)}"] input`).check();
  // The server moves the deadline to 25 s from now; the next autosave reply carries it to the timer.
  await ctl('/ctl/attempt-deadline', { attemptId, inSeconds: 25 });
  const saved = waitForSave(page);
  await page.getByTestId('next-question').click();
  await question(page, Q.mcq2).locator(`[data-option-id="${correct(Q.mcq2)}"] input`).check();
  const reply = await (await saved).json();
  expect(Date.parse(reply.deadlineAt) - Date.parse(reply.serverNow)).toBeLessThan(30_000);
  await expect(page.getByTestId('timer')).toContainText(/00:[0-2]\d/);
  await page.waitForURL(new RegExp(`/tests/result/${attemptId}`), { timeout: 90_000 });
  await expect(page.getByTestId('score')).toContainText(`${KEYS.get(Q.mcq1)!.marks + KEYS.get(Q.mcq2)!.marks} / 20`);
});

test('custom builder: build from chapters, start; bank_too_small explained', async ({ page }) => {
  test.setTimeout(3 * 60_000);
  await signUp(page, 'builder', '/tests/builder');
  await page.goto('/tests/builder', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('builder')).toBeVisible();
  await page.getByLabel('Subject').selectOption('cbse-10-science');
  const picker = page.getByTestId('chapter-picker');
  await picker.getByRole('checkbox').nth(1).check();
  await picker.getByRole('checkbox').nth(2).check();
  await page.getByLabel(/^Questions/).fill('10');
  await checkPage(page);
  await shot(page, 'tests-builder');
  await page.getByTestId('build-test').click();
  await expect(page.getByTestId('built')).toContainText('10 questions');
  await page.getByTestId('start-custom').click();
  await page.waitForURL(/\/tests\/attempt\//);
  await expect(page.getByTestId('test-player')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('p[aria-live="polite"]').first()).toContainText('of 10');

  await page.goto('/tests/builder', { waitUntil: 'networkidle' });
  await page.getByLabel('Subject').selectOption('cbse-10-science');
  await page.getByTestId('chapter-picker').getByRole('checkbox').first().check();
  await page.getByRole('checkbox', { name: 'True or false' }).check();
  await page.getByLabel(/^Questions/).fill('60');
  await page.getByTestId('build-test').click();
  await expect(page.getByTestId('builder-error')).toContainText(/Not enough questions|not enough questions/i);
});

test('live mock: register, countdown, start, rank; leaderboard needs consent', async ({ page }) => {
  test.setTimeout(5 * 60_000);
  await signUp(page, 'live', '/tests');
  const events = (await (await page.request.get('/api/platform/v1/live-events')).json()).events as { id: string; title: string; subject: { id: string } }[];
  const ev = events.find((e) => e.title.includes('Dev live mock') && e.subject.id === 'cbse-10-science') ?? events.find((e) => e.title.includes('Dev live mock'));
  expect(ev, 'dev live mock scheduled by the e2e API').toBeTruthy();
  await ctl('/ctl/live-shift', { eventId: ev!.id, startsInSeconds: 90 });
  await page.goto(`/tests/live/${ev!.id}`, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('live-event')).toHaveAttribute('data-phase', 'registration_open');
  await expect(page.getByTestId('countdown')).toContainText(/Starts in/);
  await page.getByTestId('live-register').click();
  await expect(page.getByTestId('registered')).toBeVisible();
  await checkPage(page);
  await shot(page, 'live-registered');

  await ctl('/ctl/live-shift', { eventId: ev!.id, startsInSeconds: -5 });
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.getByTestId('live-event')).toHaveAttribute('data-phase', 'live');
  await expect(page.getByTestId('leaderboard').getByTestId('ai-consent-needed')).toBeVisible();
  await page.getByTestId('live-start').click();
  await page.waitForURL(/\/tests\/attempt\//);
  await expect(page.getByTestId('test-player')).toHaveAttribute('data-ready', 'true');
  const attemptId = page.url().split('/').pop()!;
  const first = page.locator('article[data-question-id]').first();
  const radio = first.locator('input[type="radio"]').first();
  if (await radio.count()) await radio.check();
  await page.getByTestId('submit-open').click();
  await page.getByTestId('confirm-submit').click();
  await page.waitForURL(new RegExp(`/tests/result/${attemptId}`));
  await expect(page.getByText('All-India rank')).toBeVisible();

  await grantConsent(page);
  await page.goto(`/tests/live/${ev!.id}`, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('my-rank')).toContainText('Your rank');
  await checkPage(page);
  await shot(page, 'live-leaderboard');
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboards')).toBeVisible();
  await checkPage(page);
  await shot(page, 'leaderboard');
});

test('/me lists attempts; leaderboard and pages without consent are friendly; no third-party requests', async ({ page }) => {
  await signUp(page, 'me-tests', '/tests');
  await page.goto('/leaderboard', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('leaderboard-consent')).toBeVisible();
  await checkPage(page);
  await shot(page, 'leaderboard-consent');
  await page.goto('/me', { waitUntil: 'networkidle' });
  await expect(page.getByTestId('my-attempts')).toBeVisible();
  await expect(page.getByTestId('subscription')).toContainText('Free');
  await expect(page.getByTestId('credits')).toBeVisible();
  await checkPage(page);
  expect(CONTROL_ORIGIN).toMatch(/^http:\/\/127\.0\.0\.1:/);
});
