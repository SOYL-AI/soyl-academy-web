import { mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { expect, expectNoHorizontalScroll, openLoginFromHeader, signInWithEmail, uniqueEmail } from './fixtures';
// @ts-ignore -- plain ESM module shared with run.mjs
import { CONTROL_ORIGIN } from './env.mjs';

/** Shared helpers for the M3/M4 specs (tests, AI, plans). */
export const SHOTS = resolve(import.meta.dirname, '../../../test-results/platform-web/screenshots');
mkdirSync(SHOTS, { recursive: true });
export const shot = (page: Page, name: string, fullPage = true) => page.screenshot({ path: resolve(SHOTS, `${name}-360.png`), fullPage });

export { CONTROL_ORIGIN };

export async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

/** Elements whose right edge passes the viewport (to explain a horizontal-overflow failure). */
export async function overflowing(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const out: string[] = [];
    for (const el of Array.from(document.body.querySelectorAll('*'))) {
      const r = el.getBoundingClientRect();
      if (r.right > w + 1 && r.width > 0) {
        const parentOver = el.parentElement && el.parentElement.getBoundingClientRect().right > w + 1;
        if (!parentOver) out.push(`${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).slice(0, 60)} right=${Math.round(r.right)}`);
      }
    }
    return out.slice(0, 10);
  });
}

export async function checkPage(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 0) expect(await overflowing(page), 'elements wider than the viewport').toEqual([]);
  await expectNoHorizontalScroll(page);
  expect(await axe(page)).toEqual([]);
}

/** A fresh student (email OTP), signed in on `path`. */
export async function signUp(page: Page, tag: string, path = '/tests'): Promise<string> {
  const email = uniqueEmail(tag);
  await page.goto(path, { waitUntil: 'networkidle' });
  await openLoginFromHeader(page);
  await signInWithEmail(page, email);
  return email;
}

/** Parent approval through /me (the local mock consent provider approves at once). */
export async function grantConsent(page: Page) {
  await page.goto('/me', { waitUntil: 'networkidle' });
  const notice = page.getByTestId('consent-notice');
  await expect(notice).toBeVisible();
  if ((await notice.getAttribute('data-consent')) !== 'granted') {
    await notice.getByRole('button').click();
    await expect(page.getByTestId('consent-notice')).toHaveAttribute('data-consent', 'granted');
  }
}

/** The e2e API's control server (api-e2e.ts). */
export async function ctl<T = unknown>(path: string, body: unknown = {}): Promise<T> {
  const res = await fetch(`${CONTROL_ORIGIN}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`control ${path}: ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

/** Answer keys from the authored content (git), to check that results are right for a known answer set. */
export function authoredQuestions(family: string, chapterId: string): Map<string, { id: string; type: string; answer: unknown; marks: number }> {
  const file = resolve(import.meta.dirname, '../../../../content/authored', family, chapterId, 'release.json');
  const release = JSON.parse(readFileSync(file, 'utf8')) as { questions: { id: string; type: string; answer: unknown; marks: number }[] };
  return new Map(release.questions.map((q) => [q.id, q]));
}

export const CH02_SHORT_TITLE = 'Chapter test (short) — Acids, Bases and Salts';

/** Opens the science series, starts the ch02 short test and returns the attempt id. */
export async function startCh02Short(page: Page): Promise<string> {
  await page.goto('/tests/series/cbse/10/science', { waitUntil: 'networkidle' });
  const card = page.getByTestId('test-card').filter({ has: page.getByRole('heading', { name: CH02_SHORT_TITLE }) });
  await expect(card).toBeVisible();
  await card.getByTestId('start-test-open').click();
  const dialog = page.getByRole('dialog', { name: CH02_SHORT_TITLE });
  await expect(dialog.getByTestId('test-meta')).toBeVisible();
  await dialog.getByTestId('start-test').click();
  await page.waitForURL(/\/tests\/attempt\/[0-9a-f-]{36}$/);
  await expect(page.getByTestId('test-player')).toHaveAttribute('data-ready', 'true');
  return page.url().split('/').pop()!;
}

export function question(page: Page, id: string) {
  return page.locator(`article[data-question-id="${id}"]`);
}

/** Goes to a question through the palette (by its paper position, 1-based). */
export async function openFromPalette(page: Page, position: number) {
  await page.getByTestId('open-palette').click();
  const dialog = page.getByRole('dialog', { name: 'All questions' });
  await dialog.getByRole('button', { name: new RegExp(`^Question ${position}( |:)`) }).click();
  await expect(dialog).toBeHidden();
}
