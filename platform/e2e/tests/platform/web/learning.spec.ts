import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page, Response } from '@playwright/test';
import { acceptAllCookies, expect, expectNoHorizontalScroll, openLoginFromHeader, signInWithEmail, test, uniqueEmail } from './fixtures';
// @ts-ignore -- plain ESM module shared with run.mjs
import { AUDIO_DIR, E2E_CDN_BASE } from './env.mjs';

/**
 * M2 learning core at 360 px against the real local API (all authored chapters published at start):
 * chapter hub, slide player (keys, swipe, check slide, resume, listen mode), notes, flashcards, practice
 * (every objective type right and wrong, written self-mark as a member, guest → login merge), report a
 * mistake, /admin gate, axe (no serious/critical), no horizontal scroll, no third-party requests
 * (fixture), and the route JS budget.
 */
const SHOTS = resolve(import.meta.dirname, '../../../test-results/platform-web/screenshots');
mkdirSync(SHOTS, { recursive: true });
const shot = (page: Page, name: string, fullPage = true) => page.screenshot({ path: resolve(SHOTS, `${name}-360.png`), fullPage });

const CH01 = '/learn/cbse/10/science/ch01';
const HINDI = '/learn/cbse/10/hindi-a/ch02';

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

async function checkPage(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expectNoHorizontalScroll(page);
  expect(await axe(page)).toEqual([]);
}

const playerIndex = (page: Page) => page.getByTestId('slide-player').getAttribute('data-index');

async function swipe(page: Page, dx: number) {
  await page.evaluate((delta) => {
    const el = document.querySelector('[aria-roledescription="carousel"]')!;
    const t = (x: number, y: number) => new Touch({ identifier: 1, target: el, clientX: x, clientY: y });
    el.dispatchEvent(new TouchEvent('touchstart', { touches: [t(200, 300)], changedTouches: [t(200, 300)], bubbles: true }));
    el.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t(200 + delta, 305)], bubbles: true }));
  }, dx);
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

test('chapter hub: public hub, parts, views, tests, report button; accessible at 360 px', async ({ page }) => {
  const res = await page.goto(CH01, { waitUntil: 'networkidle' });
  expect(res?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'Chemical Reactions and Equations' })).toBeVisible();
  const lesson = page.getByTestId('hub-lesson');
  await expect(lesson.getByRole('link', { name: /Part 1:/ })).toHaveAttribute('href', `${CH01}/lesson`);
  await expect(lesson.getByRole('link', { name: /Part 2:/ })).toHaveAttribute('href', `${CH01}/lesson?part=2`);
  await expect(page.getByTestId('hub-notes').getByRole('link')).toHaveAttribute('href', `${CH01}/notes`);
  await expect(page.getByTestId('hub-flashcards').getByRole('link')).toHaveAttribute('href', `${CH01}/flashcards`);
  await expect(page.getByTestId('hub-practice').getByRole('link')).toHaveAttribute('href', `${CH01}/practice`);
  await expect(page.getByTestId('chapter-tests')).toContainText('Chapter test (short)');
  await expect(page.getByTestId('report-mistake')).toBeVisible();
  await checkPage(page);
  await shot(page, 'hub');
});

test('lesson (guest): keyboard + swipe, check slide answered inline, resume after reload; part 2 via ?part=', async ({ page }) => {
  await page.goto(`${CH01}/lesson`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1, name: /Part 1/ })).toBeVisible();
  await expect(page.getByTestId('slide-player')).toHaveAttribute('data-ready', 'true');
  expect(await playerIndex(page)).toBe('0');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press(' ');
  await expect.poll(() => playerIndex(page)).toBe('3');
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => playerIndex(page)).toBe('2');
  await swipe(page, -160);
  await expect.poll(() => playerIndex(page)).toBe('3');
  await swipe(page, -160);
  await expect.poll(() => playerIndex(page)).toBe('4');
  await expect(page.getByTestId('slide-announcer')).toContainText('Slide 5 of 21');
  await checkPage(page);
  await shot(page, 'lesson-read', false);

  // Slide 5 is a check slide: answer it inline (server-checked).
  const card = page.locator('[data-slide-index="4"] article[data-question-id]');
  await expect(card).toBeVisible();
  const answer = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/practice/answers') && r.request().method() === 'POST');
  await card.locator('[data-option-id="b"] input').check();
  await card.getByRole('button', { name: 'Check answer' }).click();
  const body = await (await answer).json();
  expect(body.stored).toBe(false);
  await expect(card.getByTestId('question-result')).toBeVisible();
  await expect(card.getByTestId('answer-key')).toContainText('Solution');
  await checkPage(page);
  await shot(page, 'lesson-check-answered', false);

  // The position is saved on the device (debounced) and restored after a reload.
  await expect
    .poll(async () => page.evaluate(() => JSON.parse(window.localStorage.getItem('soyl_guest_v1') ?? '{}').lessons?.[0]?.slide))
    .toBe(4);
  const guest = await page.evaluate(() => JSON.parse(window.localStorage.getItem('soyl_guest_v1')!));
  expect(guest.lessons[0]).toMatchObject({ chapter: 'cbse-10-science-ch01', part: 1, slide: 4, completed: false, mode: 'read' });
  expect(guest.practice.some((p: { question: string }) => p.question === body.questionId)).toBe(true);
  await page.reload({ waitUntil: 'networkidle' });
  await expect.poll(() => playerIndex(page)).toBe('4');
  await expect(page.getByTestId('resume-note')).toContainText('Continuing from slide 5');

  // End of the part: completion and the link to part 2 (?part=2 → prerendered part route).
  await page.keyboard.press('End');
  await expect(page.getByTestId('lesson-complete')).toBeVisible();
  await page.getByRole('link', { name: /Next: part 2/ }).click();
  await expect(page).toHaveURL(`${CH01}/lesson?part=2`);
  await expect(page.getByRole('heading', { level: 1, name: /Part 2/ })).toBeVisible();
  expect((await page.request.get(`${CH01}/lesson?part=9`)).status()).toBe(404);
});

test('lesson listen mode: plays the slide narration from the CDN and highlights the spoken words', async ({ page, watch }) => {
  const cdn = new URL(E2E_CDN_BASE);
  watch.allowOrigins.push(cdn.origin); // WEB-1 allows the CDN origin; served locally below.
  const served: string[] = [];
  await page.route(`${cdn.origin}/**`, async (route) => {
    const key = new URL(route.request().url()).pathname.replace(`${cdn.pathname}/`, '');
    const file = resolve(AUDIO_DIR, 'blob', key);
    served.push(key);
    if (!/^audio\/[\w./-]+\.ogg$/.test(key) || !existsSync(file)) return route.fulfill({ status: 404 });
    await route.fulfill({ status: 200, contentType: 'audio/ogg', body: readFileSync(file), headers: { 'accept-ranges': 'none' } });
  });
  await page.goto(`${CH01}/lesson`, { waitUntil: 'networkidle' });
  const listen = page.getByTestId('listen-mode');
  await expect(listen).toBeEnabled();
  await listen.click();
  await expect(page.getByTestId('slide-player')).toHaveAttribute('data-mode', 'listen');
  await page.getByRole('button', { name: 'Play narration' }).click();
  await expect(page.getByRole('button', { name: 'Pause narration' })).toBeVisible();
  // The highlight follows the audio clock: it moves forward word by word while the clip plays.
  const word = async () => Number((await page.getByTestId('narration').locator('[data-highlight-word]').getAttribute('data-highlight-word')) ?? -1);
  await expect.poll(word, { timeout: 30_000 }).toBeGreaterThanOrEqual(0);
  const w1 = await word();
  await expect.poll(word, { timeout: 30_000 }).toBeGreaterThan(w1 + 2);
  await expect(page.getByTestId('narration').locator('[data-sentence] [class*="wordActive"]')).toHaveCount(1);
  expect(served[0]).toMatch(/^audio\/cbse-10-science-ch01\/deck\.p1\/s01-/);
  await checkPage(page);
  await shot(page, 'lesson-listen', false);
  await page.getByRole('button', { name: 'Pause narration' }).click();
});

test('notes: maths, chemistry and diagrams on the server; LearningResource data; Hindi notes', async ({ page }) => {
  await page.goto(`${CH01}/notes`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1, name: /Notes/ })).toBeVisible();
  const notes = page.getByTestId('notes');
  expect(await notes.locator('.katex').count()).toBeGreaterThan(5);
  expect(await notes.locator('figure[data-kind]').count()).toBeGreaterThan(0);
  await expect(page.getByRole('navigation', { name: 'Contents' })).toBeVisible();
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.some((t) => t.includes('"LearningResource"') && t.includes('"isAccessibleForFree":true'))).toBe(true);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://www.soylai.com${CH01}/notes`);
  await checkPage(page);
  await shot(page, 'notes');

  await page.goto(`${HINDI}/notes`, { waitUntil: 'networkidle' });
  await expect(page.locator('[data-testid="notes"][lang="hi"]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/[ऀ-ॿ]/);
  await checkPage(page);
  await shot(page, 'notes-hindi');
});

test('flashcards: flip, mark known / still learning, shuffle; maths and Hindi render', async ({ page }) => {
  await page.goto(`${CH01}/flashcards`, { waitUntil: 'networkidle' });
  const deck = page.getByTestId('flashcards');
  await expect(deck).toContainText('Card 1 of 32');
  await deck.getByTestId('show-answer').click();
  await expect(deck).toHaveAttribute('data-flipped', 'true');
  await checkPage(page);
  await shot(page, 'flashcards');
  await deck.getByTestId('mark-known').click();
  await expect(deck).toContainText('Card 2 of 32');
  await page.keyboard.press('Enter');
  await deck.getByTestId('mark-learning').click();
  await expect(page.getByRole('status').filter({ hasText: 'known' })).toHaveText('1 known · 1 still learning');
  await deck.getByTestId('shuffle').click();
  await expect(deck).toContainText('Card 1 of 32');
  // Maths renders on both faces (server-rendered KaTeX): CBSE 10 Maths ch01.
  await page.goto('/learn/cbse/10/mathematics/ch01/flashcards', { waitUntil: 'networkidle' });
  let maths = 0;
  for (let i = 0; i < 32 && maths === 0; i++) {
    maths = await page.locator('[data-face] .katex').count();
    if (maths) break;
    await page.getByTestId('show-answer').click();
    maths = await page.locator('[data-face] .katex').count();
    if (!maths) await page.getByRole('navigation', { name: 'Cards' }).getByRole('button', { name: 'Next' }).click();
  }
  expect(maths).toBeGreaterThan(0);
  await shot(page, 'flashcards-maths');

  await page.goto(`${HINDI}/flashcards`, { waitUntil: 'networkidle' });
  await expect(page.locator('[data-face][lang="hi"]')).toHaveText(/[ऀ-ॿ]/);
  await checkPage(page);
  await shot(page, 'flashcards-hindi');
});

/* ── Practice ────────────────────────────────────────────────────────────────────────────────── */

type Key = { option_ids?: string[]; value?: number; blanks?: { accepted: string[] }[]; pairs?: { left_id: string; right_id: string }[] };

const TYPE_LABEL: Record<string, string> = {
  mcq: 'Multiple choice',
  'multi-select': 'Select all that apply',
  'assertion-reason': 'Assertion and reason',
  'true-false': 'True or false',
  numerical: 'Numerical',
  'fill-blank': 'Fill in the blanks',
  match: 'Match the columns',
  short: 'Short answer',
};

async function filterType(page: Page, type: string, chapter = CH01) {
  await page.goto(`${chapter}/practice`, { waitUntil: 'networkidle' });
  await page.getByText('Filter questions').click();
  await page.getByRole('checkbox', { name: new RegExp(`^${TYPE_LABEL[type]}`) }).check();
  const card = page.locator(`article[data-question-type="${type}"]`).first();
  await expect(card).toBeVisible();
  await expect(page.getByTestId('practice-position')).toContainText('(filtered from');
  return card;
}

async function fill(card: Locator, type: string, key: Key | null) {
  const optionIds = await card.locator('[data-option-id]').evaluateAll((els) => els.map((e) => e.getAttribute('data-option-id')!));
  switch (type) {
    case 'mcq':
    case 'assertion-reason':
    case 'true-false': {
      const id = key ? key.option_ids![0]! : optionIds[0]!;
      await card.locator(`[data-option-id="${id}"] input`).check();
      return id;
    }
    case 'multi-select': {
      const ids = key ? key.option_ids! : [optionIds[0]!];
      for (const id of ids) await card.locator(`[data-option-id="${id}"] input`).check();
      return ids;
    }
    case 'numerical':
      await card.getByRole('textbox').fill(key ? String(key.value) : '0.000123');
      return null;
    case 'fill-blank': {
      const n = await card.getByLabel(/^Blank \(/).count();
      for (let i = 0; i < n; i++) await card.getByLabel(`Blank (${i + 1})`).fill(key ? key.blanks![i]!.accepted[0]! : 'zzzz');
      return null;
    }
    case 'match': {
      const rows = card.locator('[data-left-id]');
      const n = await rows.count();
      const rights = await rows.first().locator('option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value).filter(Boolean));
      for (let i = 0; i < n; i++) {
        const left = (await rows.nth(i).getAttribute('data-left-id'))!;
        const want = key ? key.pairs!.find((p) => p.left_id === left)!.right_id : rights[0]!;
        await rows.nth(i).locator('select').selectOption(want);
      }
      return null;
    }
  }
  return null;
}

async function wrongFor(card: Locator, type: string, key: Key) {
  const optionIds = await card.locator('[data-option-id]').evaluateAll((els) => els.map((e) => e.getAttribute('data-option-id')!));
  if (type === 'mcq' || type === 'assertion-reason' || type === 'true-false' || type === 'multi-select') {
    const wrong = optionIds.find((id) => !key.option_ids!.includes(id))!;
    await card.locator(`[data-option-id="${wrong}"] input`).check();
    return;
  }
  await fill(card, type, null);
}

async function submit(page: Page, card: Locator): Promise<{ correct: boolean | null; key: { answer: Key } }> {
  const res = page.waitForResponse((r: Response) => r.url().endsWith('/api/platform/v1/practice/answers') && r.request().method() === 'POST');
  await card.getByRole('button', { name: 'Check answer' }).click();
  const r = await res;
  expect(r.status()).toBe(200);
  await expect(card.getByTestId('question-result')).toBeVisible();
  return r.json();
}

for (const type of ['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match']) {
  test(`practice ${type}: answered right and wrong, checked on the server, solution revealed after`, async ({ page }) => {
    const card = await filterType(page, type);
    // F-006: no key text before answering.
    await expect(card.getByTestId('answer-key')).toHaveCount(0);
    await fill(card, type, null);
    const first = await submit(page, card);
    const key = first.key.answer;
    await card.getByRole('button', { name: 'Try again' }).click();
    if (first.correct) await wrongFor(card, type, key);
    else await fill(card, type, key);
    const second = await submit(page, card);
    expect(second.correct).toBe(!first.correct);
    await expect(card.locator('[data-verdict]')).toHaveAttribute('data-verdict', second.correct ? 'good' : /bad|partial/);
    await expect(card.getByTestId('answer-key')).toContainText('Marking scheme');
    await checkPage(page);
    if (['mcq', 'match', 'fill-blank', 'numerical'].includes(type)) await shot(page, `practice-${type}`);
  });
}

test('practice written answer: member self-marks against the marking scheme (PATCH)', async ({ page }) => {
  await page.goto(`${CH01}/practice`, { waitUntil: 'networkidle' });
  await openLoginFromHeader(page);
  await signInWithEmail(page, uniqueEmail('selfmark'));
  const card = await filterType(page, 'short');
  await card.getByLabel(/^Your answer/).fill('A new substance forms because the change cannot be reversed easily.');
  await expect(card.locator('[data-words]')).toHaveAttribute('data-words', '11');
  const result = await submit(page, card);
  expect(result.correct).toBeNull();
  await expect(card.getByTestId('answer-key')).toContainText('Model answer');
  const form = card.getByTestId('self-mark');
  await form.getByRole('combobox').selectOption('1');
  const patch = page.waitForResponse((r) => /\/api\/platform\/v1\/practice\/answers\/[0-9a-f-]+$/.test(r.url()) && r.request().method() === 'PATCH');
  await form.getByRole('button', { name: 'Save marks' }).click();
  expect((await patch).status()).toBe(200);
  await expect(card.getByTestId('self-mark-saved')).toBeVisible();
  await checkPage(page);
  await shot(page, 'practice-written-self-mark');
});

test('guest practice is kept on the device, then merged into the account at login', async ({ page }) => {
  const ch02 = '/learn/cbse/10/science/ch02';
  const card = await filterType(page, 'mcq', ch02);
  await card.locator('[data-option-id] input').first().check();
  const res = await submit(page, card);
  expect(res.correct).not.toBeNull();
  const qid = await card.getAttribute('data-question-id');
  await expect.poll(async () => page.evaluate(() => JSON.parse(window.localStorage.getItem('soyl_guest_v1') ?? '{}').practice?.length ?? 0)).toBe(1);
  await page.goto(ch02, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('practice-progress')).toContainText('on this device');
  await openLoginFromHeader(page);
  const merge = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/me/merge-guest'));
  await signInWithEmail(page, uniqueEmail('merge'));
  const merged = await (await merge).json();
  expect(merged.merged).toBe(true);
  expect(merged.practiceStored).toBe(1);
  await expect.poll(async () => page.evaluate(() => window.localStorage.getItem('soyl_guest_v1'))).toBeNull();
  const progress = await (await page.request.get('/api/platform/v1/me/progress/chapters/cbse-10-science-ch02')).json();
  expect(progress.practice.answeredQuestionIds).toContain(qid);
  await page.goto(ch02, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('practice-progress')).toContainText('of 1 answered');
});

test('report a mistake on a slide (guest): reason + comment → confirmation', async ({ page }) => {
  await page.goto(`${CH01}/lesson`, { waitUntil: 'networkidle' });
  await page.keyboard.press('ArrowRight');
  await page.getByRole('button', { name: 'Report a mistake in slide 2' }).click();
  const dialog = page.getByRole('dialog', { name: 'Report a mistake' });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Spelling or grammar mistake').check();
  await dialog.getByLabel(/Details/).fill('e2e: test report, please ignore');
  await checkPage(page);
  await shot(page, 'report-dialog', false);
  const res = page.waitForResponse((r) => r.url().endsWith('/api/platform/v1/content-reports'));
  await dialog.getByRole('button', { name: 'Send report' }).click();
  const r = await res;
  expect(r.status()).toBe(201);
  expect(r.request().postDataJSON()).toMatchObject({ chapterId: 'cbse-10-science-ch01', contentType: 'deck', part: 1, itemRef: 's02', reason: 'typo' });
  await expect(page.getByTestId('report-sent')).toBeVisible();
});

test('/admin: guests are asked to sign in, students are refused; renders under the nonce CSP', async ({ page }) => {
  await page.goto('/admin', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Staff sign-in' })).toBeVisible();
  await checkPage(page);
  await shot(page, 'admin-guest');
  await openLoginFromHeader(page);
  await signInWithEmail(page, uniqueEmail('admin-student'));
  await expect(page.getByRole('heading', { name: 'Staff only' })).toBeVisible();
  // The API refuses the queue for a student either way.
  expect((await page.request.get('/api/platform/v1/admin/reports')).status()).toBe(403);
});

test('platform route JS budget: ≤ 200 KB gz first load on every M2 page (player chunks lazy)', async ({ baseURL }) => {
  const out = resolve(import.meta.dirname, '../../../test-results/platform-web/bundle.json');
  const output = execFileSync(process.execPath, [resolve(import.meta.dirname, 'bundle.mjs'), '--base', baseURL!, '--json', out], { encoding: 'utf8' });
  console.log(output);
  expect(output).toContain('PASSED');
});
