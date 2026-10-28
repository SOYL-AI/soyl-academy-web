import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { acceptAllCookies, expect, expectNoHorizontalScroll, test } from './fixtures';

/**
 * Learn mode (2026-10-29): the focus-mode lesson player, notes and flashcards against the real local API and the
 * dev content. The lesson fits the screen (no page scroll; the slide card sits between the strip and the bottom
 * bar) at 360×640 and 360×760 in both themes; navigation by buttons, keys, swipe, part switch, deep link and the
 * completion screen; notes contents (sheet on phones, sidebar on desktop) and anchors clear of the sticky bars;
 * flashcards flip and sort; axe in both themes; owner screenshots (test-results/platform-web/learn-mode/).
 */
const OUT = resolve(import.meta.dirname, '../../../test-results/platform-web/learn-mode');
mkdirSync(OUT, { recursive: true });

const CH01 = '/learn/cbse/10/science/ch01';
const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

async function useTheme(page: Page, baseURL: string | undefined, theme: Theme) {
  await page.context().addCookies([{ name: 'soyl_theme', value: theme, url: baseURL! }]);
  await page.emulateMedia({ colorScheme: theme });
}

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
}

/** The page itself never scrolls in focus mode. */
async function expectNoPageScroll(page: Page) {
  const m = await page.evaluate(() => ({ h: document.scrollingElement!.scrollHeight, inner: window.innerHeight }));
  expect(m.h, 'page scroll height').toBeLessThanOrEqual(m.inner + 1);
}

const playerIndex = (page: Page) => page.getByTestId('slide-player').getAttribute('data-index');

async function openLesson(page: Page, path = `${CH01}/lesson`) {
  await page.goto(path, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('slide-player')).toHaveAttribute('data-ready', 'true');
}

/** The current slide card sits fully between the strip and the bottom bar, inside the viewport. */
async function expectSlideBetweenBars(page: Page, index: number) {
  const box = await page.evaluate((i) => {
    const r = (el: Element | null) => el!.getBoundingClientRect();
    const player = document.querySelector('[data-testid="slide-player"]')!;
    const strip = r(player.querySelector('header'));
    const bar = r(player.querySelector('nav[aria-label="Slide navigation"]'));
    const card = r(player.querySelector(`[data-slide-index="${i}"]`));
    return { stripBottom: strip.bottom, barTop: bar.top, barBottom: bar.bottom, top: card.top, bottom: card.bottom, left: card.left, right: card.right, w: window.innerWidth, h: window.innerHeight };
  }, index);
  expect(box.top, 'card top below the strip').toBeGreaterThanOrEqual(box.stripBottom - 0.5);
  expect(box.bottom, 'card bottom above the bottom bar').toBeLessThanOrEqual(box.barTop + 0.5);
  expect(box.left).toBeGreaterThanOrEqual(0);
  expect(box.right).toBeLessThanOrEqual(box.w);
  expect(box.barBottom, 'bottom bar inside the viewport').toBeLessThanOrEqual(box.h + 0.5);
  expect(box.bottom - box.top, 'the card has room').toBeGreaterThan(200);
}

/** A touch swipe on the current slide (dx < 0: to the left), starting at x = startX. */
async function swipe(page: Page, dx: number, startX = 200) {
  await page.evaluate(
    ({ delta, x }) => {
      const el = document.querySelector('[data-slide-index]:not([hidden])')!;
      const t = (cx: number, cy: number) => new Touch({ identifier: 1, target: el, clientX: cx, clientY: cy });
      el.dispatchEvent(new TouchEvent('touchstart', { touches: [t(x, 300)], changedTouches: [t(x, 300)], bubbles: true }));
      el.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t(x + delta, 305)], bubbles: true }));
    },
    { delta: dx, x: startX },
  );
}

test.beforeEach(async ({ page }) => {
  await acceptAllCookies(page);
});

test.describe('lesson player: fits the screen', () => {
  for (const height of [640, 760]) {
    for (const theme of THEMES) {
      test(`360×${height} ${theme}: no page scroll; the slide sits between the strip and the bottom bar`, async ({ page, baseURL }) => {
        await page.setViewportSize({ width: 360, height });
        await useTheme(page, baseURL, theme);
        await openLesson(page);
        expect(await page.evaluate(() => window.innerWidth)).toBe(360);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.getByRole('heading', { level: 1, name: /Part 1/ })).toBeVisible();
        await expect(page.locator('#soyl-platform-root')).toHaveAttribute('data-theme', theme);
        // The strip is slim (one line of title, no breadcrumb).
        const strip = await page.getByTestId('slide-player').locator('header').first().boundingBox();
        expect(strip!.height).toBeLessThanOrEqual(58);
        await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toHaveCount(0);
        for (const i of [0, 1, 2, 3]) {
          if (i > 0) await page.getByTestId('next-slide').click();
          await expect.poll(() => playerIndex(page)).toBe(String(i));
          await expectSlideBetweenBars(page, i);
          await expectNoPageScroll(page);
          await expectNoHorizontalScroll(page);
        }
        // Next and Previous are big touch targets.
        for (const id of ['next-slide', 'prev-slide']) expect((await page.getByTestId(id).boundingBox())!.height).toBeGreaterThanOrEqual(44);
        if (height === 760) expect(await axe(page)).toEqual([]);
      });
    }
  }

  test('a long slide scrolls inside its card ("More below"), never the page', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await openLesson(page);
    // The first slide whose content is taller than the card.
    let found = -1;
    for (let i = 0; i < 21 && found < 0; i++) {
      const tall = await page.evaluate((n) => {
        const slot = document.querySelector<HTMLElement>(`[data-slide-index="${n}"]`)!;
        return slot.scrollHeight > slot.clientHeight + 1;
      }, i);
      if (tall) found = i;
      else {
        await page.keyboard.press('ArrowRight');
        await expect.poll(() => playerIndex(page)).toBe(String(i + 1));
      }
    }
    expect(found, 'a slide taller than a 360×640 card').toBeGreaterThanOrEqual(0);
    const slot = page.locator(`[data-slide-index="${found}"]`);
    await expect(page.getByRole('button', { name: /More below/, includeHidden: true })).toBeVisible();
    await expect(slot).toHaveAttribute('tabindex', '0'); // keyboard-scrollable
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => slot.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    await expectNoPageScroll(page);
    expect(await playerIndex(page)).toBe(String(found));
  });
});

test('lesson navigation: buttons, keys, swipe (not from the edge), deep link, part switch, completion', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await openLesson(page);
  expect(await playerIndex(page)).toBe('0');
  await page.getByTestId('next-slide').click();
  await expect.poll(() => playerIndex(page)).toBe('1');
  await page.getByTestId('prev-slide').click();
  await expect.poll(() => playerIndex(page)).toBe('0');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press(' ');
  await expect.poll(() => playerIndex(page)).toBe('2');
  await page.keyboard.press('Shift+Space');
  await expect.poll(() => playerIndex(page)).toBe('1');
  await swipe(page, -160);
  await expect.poll(() => playerIndex(page)).toBe('2');
  await swipe(page, 160);
  await expect.poll(() => playerIndex(page)).toBe('1');
  await swipe(page, 200, 4); // from the screen edge: the OS back gesture, not a slide change
  await page.waitForTimeout(200);
  expect(await playerIndex(page)).toBe('1');
  await expect(page.getByTestId('slide-announcer')).toHaveText(/^Slide 2 of 21/);
  await expect(page.getByTestId('slide-count')).toHaveText('2 / 21');

  // The URL follows the slide; a deep link opens that slide.
  await expect(page).toHaveURL(`${CH01}/lesson?slide=2`);
  await openLesson(page, `${CH01}/lesson?part=2&slide=3`);
  await expect(page.getByRole('heading', { level: 1, name: /Part 2/ })).toBeVisible();
  expect(await playerIndex(page)).toBe('2');
  await expect(page.getByTestId('resume-note')).toContainText('Opened at slide 3');

  // Part switch from the strip.
  await page.getByTestId('part-switcher').click();
  await page.getByRole('navigation', { name: 'Lesson parts' }).getByRole('link').first().click();
  await expect(page).toHaveURL(new RegExp(`${CH01}/lesson(\\?slide=\\d+)?$`));
  await expect(page.getByRole('heading', { level: 1, name: /Part 1/ })).toBeVisible();

  // Completion: Finish on the last slide → summary, the next part in the bottom bar; Previous goes back.
  await expect(page.getByTestId('slide-player')).toHaveAttribute('data-ready', 'true');
  await page.keyboard.press('End');
  await expect(page.getByTestId('next-slide')).toHaveText(/Finish/);
  await page.getByTestId('next-slide').click();
  const done = page.getByTestId('lesson-complete');
  await expect(done).toBeVisible();
  await expect(done).toContainText('Part 1 complete');
  await expect(done).toContainText('slides done');
  await expect(page.getByTestId('lesson-saved')).toContainText('Saved on this device');
  await expectNoPageScroll(page);
  expect(await axe(page)).toEqual([]);
  await page.getByTestId('prev-slide').click();
  await expect(done).toBeHidden();
  await page.keyboard.press('ArrowRight');
  await expect(done).toBeVisible();
  await page.getByTestId('lesson-next-step').click();
  // Part 2 was opened at slide 3 above, so it resumes there (the URL follows the slide).
  await expect(page).toHaveURL(/\/lesson\?part=2(&slide=3)?$/);
  await expect(page.getByRole('heading', { level: 1, name: /Part 2/ })).toBeVisible();

  // Close (×) goes back to the chapter hub.
  await page.getByTestId('lesson-close').click();
  await expect(page).toHaveURL(CH01);
});

test('notes: contents sheet on phones, sticky sidebar on desktop; anchors land below the sticky bars; axe in both themes', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await page.goto(`${CH01}/notes`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('navigation', { name: 'Contents' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: /Notes/ })).toBeVisible();
  // Phone: the reader bar sticks under the top bar; Sections opens the contents as a sheet.
  await page.getByTestId('notes-sections').click();
  const sheet = page.getByRole('navigation', { name: 'Sections' });
  await expect(sheet).toBeVisible();
  await sheet.getByRole('link').nth(2).click();
  await expect(page).toHaveURL(/#s3$/);
  await expect(sheet).toBeHidden();
  /** The section starts below the sticky bars (the top bar, and the reader bar on phones), not far below. */
  const clear = async (id: string) => {
    const r = await page.evaluate((sid) => {
      const section = document.getElementById(sid)!.getBoundingClientRect();
      const reader = document.querySelector('[data-testid="notes-reader-bar"]')!;
      const top = document.querySelector('header')!.getBoundingClientRect();
      const readerBottom = getComputedStyle(reader).display === 'none' ? 0 : reader.getBoundingClientRect().bottom;
      return { section: section.top, below: Math.max(top.bottom, readerBottom) };
    }, id);
    expect(r.section, `#${id} lands below the sticky bars`).toBeGreaterThanOrEqual(r.below - 1);
    expect(r.section).toBeLessThan(r.below + 80);
  };
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  await clear('s3');
  await expect(page.getByTestId('notes-reader-bar')).toContainText(/\d+%/);
  await expect(page.getByRole('progressbar', { name: 'Reading progress' })).toHaveAttribute('aria-valuenow', /^[1-9]\d*$/);
  await expectNoHorizontalScroll(page);
  // The end of the notes: back to the chapter and the next step.
  await page.getByTestId('notes-next').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('notes-next')).toHaveAttribute('href', `${CH01}/flashcards`);
  await expect(page.getByRole('navigation', { name: 'What next' }).getByRole('link', { name: /Back to chapter/ })).toHaveAttribute('href', CH01);

  // Desktop: sticky sidebar; following a link marks it as the section being read.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${CH01}/notes`, { waitUntil: 'networkidle' });
  await expect(page.getByTestId('notes-reader-bar')).toBeHidden();
  const toc = page.getByRole('navigation', { name: 'Contents' });
  for (const name of [/Writing and balancing|Balanc/i, /Exam tips/]) {
    const link = toc.getByRole('link', { name }).first();
    await link.click();
    await expect(link).toHaveAttribute('aria-current', 'location');
    await expect(toc).toBeInViewport();
  }
  await expect(page).toHaveURL(/#exam-tips$/);
  for (const theme of THEMES) {
    await useTheme(page, baseURL, theme);
    await page.goto(`${CH01}/notes`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    expect(await axe(page)).toEqual([]);
  }
  await page.goto(`${CH01}/notes#s4`, { waitUntil: 'networkidle' });
  await clear('s4');
});

test('flashcards: fit the screen, flip, sort with keys and buttons, end of deck; axe in both themes', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(`${CH01}/flashcards`, { waitUntil: 'networkidle' });
  const deck = page.getByTestId('flashcards');
  await expect(deck).toContainText('Card 1 of 32');
  expect(await page.evaluate(() => window.innerWidth)).toBe(360);
  await expectNoPageScroll(page);
  await expectNoHorizontalScroll(page);
  const card = await page.getByTestId('flashcard').boundingBox();
  const bar = await page.getByRole('navigation', { name: 'Cards' }).boundingBox();
  expect(card!.y + card!.height).toBeLessThanOrEqual(bar!.y + 0.5);
  // Flip: Space, the card itself, the button.
  await page.keyboard.press(' ');
  await expect(deck).toHaveAttribute('data-flipped', 'true');
  await page.getByTestId('flashcard').click();
  await expect(deck).not.toHaveAttribute('data-flipped', 'true');
  await page.getByTestId('show-answer').click();
  await expect(deck).toHaveAttribute('data-flipped', 'true');
  // Sort: 2 = know it, 1 = still learning (answer side only).
  await page.keyboard.press('2');
  await expect(deck).toContainText('Card 2 of 32');
  await page.keyboard.press('1'); // question side: ignored
  await expect(page.getByRole('status').filter({ hasText: 'known' })).toHaveText('1 known · 0 still learning');
  await page.keyboard.press(' ');
  await page.keyboard.press('1');
  await expect(page.getByRole('status').filter({ hasText: 'known' })).toHaveText('1 known · 1 still learning');
  await page.keyboard.press('ArrowRight');
  await expect(deck).toContainText('Card 4 of 32');
  await page.keyboard.press('ArrowLeft');
  await expect(deck).toContainText('Card 3 of 32');
  for (const theme of THEMES) {
    await useTheme(page, baseURL, theme);
    await page.reload({ waitUntil: 'networkidle' });
    await page.keyboard.press(' ');
    await expect(deck).toHaveAttribute('data-flipped', 'true');
    expect(await axe(page)).toEqual([]);
  }
  // Sort the whole deck: the end-of-deck screen.
  for (let i = 0; i < 32; i++) {
    if ((await deck.getAttribute('data-flipped')) !== 'true') await page.keyboard.press(' ');
    await page.keyboard.press(i % 4 === 0 ? '1' : '2');
  }
  await expect(page.getByTestId('flashcards-done')).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: 'known' })).toHaveText('24 known · 8 still learning');
  await expect(page.getByTestId('flashcards-next-step')).toHaveAttribute('href', `${CH01}/practice`);
  await expectNoPageScroll(page);
  await page.getByRole('button', { name: 'Review 8 still learning' }).click();
  await expect(deck).toContainText('Card 1 of 8 (still learning)');
});

test.describe('learn mode screenshots', () => {
  const VIEWS = [
    { name: 'mobile', width: 360, height: 760 },
    { name: 'desktop', width: 1280, height: 860 },
  ] as const;
  for (const v of VIEWS) {
    test(`owner screenshots: ${v.name}`, async ({ page, baseURL }) => {
      test.setTimeout(5 * 60_000);
      await page.setViewportSize({ width: v.width, height: v.height });
      for (const theme of THEMES) {
        await useTheme(page, baseURL, theme);
        const shot = async (name: string) => {
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(400);
          await page.screenshot({ path: resolve(OUT, `${v.name}-${theme}-${name}.png`) });
        };
        await openLesson(page);
        await page.keyboard.press('ArrowRight');
        await expect.poll(() => playerIndex(page)).toBe('1');
        await shot('lesson');
        await page.keyboard.press('End');
        await page.keyboard.press('ArrowRight');
        await expect(page.getByTestId('lesson-complete')).toBeVisible();
        await expect(page.getByTestId('lesson-saved')).toContainText('Saved');
        await shot('lesson-end');
        await page.goto(`${CH01}/notes#s2`, { waitUntil: 'networkidle' });
        await shot('notes');
        await page.goto(`${CH01}/flashcards`, { waitUntil: 'networkidle' });
        await page.keyboard.press(' ');
        await expect(page.getByTestId('flashcards')).toHaveAttribute('data-flipped', 'true');
        await shot('flashcards');
      }
    });
  }
});
