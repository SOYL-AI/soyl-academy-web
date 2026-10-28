/**
 * Learn mode (2026-10-29): the focus-mode lesson player (keys, swipe thresholds, deep links, resume, completion
 * summary, bottom-bar Check), the notes reading model (contents, section being read, reading progress) and the
 * flashcards session model (flip, sort, review, shuffle, keys) with their components.
 */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import {
  applyNav,
  completionSummary,
  isEdgeStart,
  isInteractiveTarget,
  keyAction,
  openingPosition,
  slideFromSearch,
  startsInHorizontalScroller,
  swipeAction,
  SWIPE_EDGE_PX,
  SWIPE_MIN_PX,
  withSlideParam,
} from '../lesson/player-logic';
import { SlidePlayer, type SlideMeta } from '../lesson/SlidePlayer';
import { activeIndex, readingMinutes, readingProgress, stripNumber, tocItems } from '../notes/toc-model';
import { NotesReaderBar, NotesToc } from '../notes/NotesToc';
import { deckKey, deckReducer, deckSummary, initDeck, type DeckState } from '../flashcards/deck-model';
import { FlashcardDeck } from '../flashcards/FlashcardDeck';
import { recordGuestLessonPosition } from '../lib/guest-storage';

const CH = 'cbse-10-science-ch01';
const HUB = '/learn/cbse/10/science/ch01';

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  h.session.state = { status: 'guest' };
  for (const fn of Object.values(h.api)) fn.mockReset();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

/* ── Player logic ─────────────────────────────────────────────────────────────────────────────── */

describe('player navigation logic', () => {
  it('keys: arrows, Space / Shift+Space, Page keys, Home/End; anything else is not navigation', () => {
    expect(keyAction('ArrowRight')).toBe('next');
    expect(keyAction('ArrowLeft')).toBe('prev');
    expect(keyAction(' ')).toBe('next');
    expect(keyAction(' ', true)).toBe('prev');
    expect(keyAction('PageDown')).toBe('next');
    expect(keyAction('PageUp')).toBe('prev');
    expect(keyAction('Home')).toBe('first');
    expect(keyAction('End')).toBe('last');
    expect(keyAction('ArrowDown')).toBeNull(); // ↓ scrolls a long slide instead
    expect(keyAction('Enter')).toBeNull();
    expect(applyNav('next', 20, 21)).toBe(20);
    expect(applyNav('prev', 0, 21)).toBe(0);
  });

  it('keys on a focused button: arrows still navigate, Space/Enter belong to the button; fields keep every key', () => {
    const btn = document.createElement('button');
    const radio = document.createElement('input');
    radio.type = 'radio';
    expect(isInteractiveTarget(btn, 'ArrowRight')).toBe(false);
    expect(isInteractiveTarget(btn, 'End')).toBe(false);
    expect(isInteractiveTarget(btn, ' ')).toBe(true);
    expect(isInteractiveTarget(btn, 'Enter')).toBe(true);
    expect(isInteractiveTarget(btn)).toBe(true); // no key: the old, strict behaviour
    expect(isInteractiveTarget(radio, 'ArrowRight')).toBe(true);
    expect(isInteractiveTarget(document.body, ' ')).toBe(false);
  });

  it('swipe thresholds: 50 px, mostly horizontal; not from the screen edges', () => {
    expect(SWIPE_MIN_PX).toBe(50);
    expect(swipeAction(-(SWIPE_MIN_PX - 1), 0)).toBeNull();
    expect(swipeAction(-SWIPE_MIN_PX, 0)).toBe('next');
    expect(swipeAction(SWIPE_MIN_PX, 0)).toBe('prev');
    expect(swipeAction(-90, 60)).toBe('next'); // 90 ≥ 1.5 × 60
    expect(swipeAction(-90, 61)).toBeNull(); // a diagonal scroll is not a swipe
    expect(isEdgeStart(SWIPE_EDGE_PX - 1, 360)).toBe(true);
    expect(isEdgeStart(360 - SWIPE_EDGE_PX + 1, 360)).toBe(true);
    expect(isEdgeStart(180, 360)).toBe(false);
  });

  it('swipes inside sideways scrollers (tables, maths, a wide element) do not navigate', () => {
    const stage = document.createElement('div');
    const wide = document.createElement('div');
    const inner = document.createElement('span');
    wide.appendChild(inner);
    stage.appendChild(wide);
    document.body.appendChild(stage);
    expect(startsInHorizontalScroller(inner, stage)).toBe(false);
    Object.defineProperty(wide, 'scrollWidth', { value: 800, configurable: true });
    Object.defineProperty(wide, 'clientWidth', { value: 300, configurable: true });
    wide.style.overflowX = 'auto';
    expect(startsInHorizontalScroller(inner, stage)).toBe(true);
    wide.style.overflowX = 'hidden';
    expect(startsInHorizontalScroller(inner, stage)).toBe(false);
    const table = document.createElement('table');
    const cell = document.createElement('td');
    table.appendChild(cell);
    stage.appendChild(table);
    expect(startsInHorizontalScroller(cell, stage)).toBe(true);
    stage.remove();
  });

  it('deep links: ?slide=N (1-based) ↔ index; other parameters and the hash are kept', () => {
    expect(slideFromSearch('?part=2&slide=7', 21)).toBe(6);
    expect(slideFromSearch('?slide=1', 21)).toBe(0);
    for (const bad of ['', '?slide=0', '?slide=22', '?slide=x', '?slide=3&slide=4', '?slide=-1', '?slide=1e3']) expect(slideFromSearch(bad, 21)).toBeNull();
    expect(withSlideParam('/learn/x/lesson?part=2', 6)).toBe('/learn/x/lesson?part=2&slide=7');
    expect(withSlideParam('/learn/x/lesson?part=2&slide=7', 0)).toBe('/learn/x/lesson?part=2');
    expect(withSlideParam('/learn/x/lesson?slide=3#top', 4)).toBe('/learn/x/lesson?slide=5#top');
  });

  it('opening position: the URL wins, then the saved position; a reload is a resume; finished parts start over', () => {
    expect(openingPosition(null, 4, false, 21)).toEqual({ index: 4, note: { kind: 'resume', index: 4 } });
    expect(openingPosition(4, 4, false, 21)).toEqual({ index: 4, note: { kind: 'resume', index: 4 } });
    expect(openingPosition(9, 4, false, 21)).toEqual({ index: 9, note: { kind: 'link', index: 9 } });
    expect(openingPosition(0, 4, false, 21)).toEqual({ index: 0, note: null });
    expect(openingPosition(null, 4, true, 21)).toEqual({ index: 0, note: null });
    expect(openingPosition(null, 30, false, 21)).toEqual({ index: 0, note: null });
    expect(openingPosition(null, null, false, 21)).toEqual({ index: 0, note: null });
  });

  it('completion summary: slides, quick checks right, self-marked answers, nothing answered', () => {
    const ids = ['q1', 'q2', 'q3'];
    expect(completionSummary(21, ids, { q1: { correct: true }, q2: { correct: true }, q3: { correct: true } })).toMatchObject({ right: 3, answered: 3, headline: 'Brilliant, every check right!' });
    const some = completionSummary(21, ids, { q1: { correct: true }, q2: { correct: false } });
    expect(some).toMatchObject({ checks: 3, answered: 2, right: 1, headline: 'Great effort!' });
    expect(some.detail).toBe('You went through 21 slides and got 1 of 2 quick checks right.');
    const self = completionSummary(10, ids, { q1: { correct: null } });
    expect(self.detail).toBe('You went through 10 slides and answered 1 of 3 quick checks.');
    expect(completionSummary(10, ids, { q1: { correct: false }, q2: { correct: null } }).detail).toBe('You went through 10 slides and got 0 of 1 quick check right (1 to mark yourself).');
    expect(completionSummary(10, ids, {}).detail).toBe('You went through 10 slides. The 3 quick checks are waiting for you in practice.');
    expect(completionSummary(8, [], {}).detail).toBe('You went through all 8 slides.');
  });
});

/* ── Player component ─────────────────────────────────────────────────────────────────────────── */

function deck(n: number, checkAt?: number) {
  const slides = Array.from({ length: n }, (_, i) => (
    <article key={i} data-testid={`slide-${i}`}>
      <h2>Slide {i + 1}</h2>
      {i === checkAt && (
        <article data-question-id="q1">
          <form onSubmit={(e) => e.preventDefault()}>
            <button type="submit">Check answer</button>
          </form>
        </article>
      )}
    </article>
  ));
  const meta: SlideMeta[] = Array.from({ length: n }, (_, i) => ({ id: `s${String(i + 1).padStart(2, '0')}`, heading: `Heading ${i + 1}`, narration: 'Hello.', audio: null, checkQuestionId: i === checkAt ? 'q1' : null }));
  return { slides, meta };
}

function player(n = 5, extra: Partial<Parameters<typeof SlidePlayer>[0]> = {}, checkAt?: number) {
  const { slides, meta } = deck(n, checkAt);
  return render(
    <ToastProvider>
      <SlidePlayer
        chapterId={CH}
        part={1}
        firstPart
        slides={slides}
        meta={meta}
        title="Chemical Reactions — Part 1: Equations"
        chapterTitle="Chemical Reactions and Equations"
        parts={[
          { part: 1, title: 'Equations', href: `${HUB}/lesson` },
          { part: 2, title: 'Redox', href: `${HUB}/lesson?part=2` },
        ]}
        links={{ hub: HUB, practice: `${HUB}/practice`, notes: `${HUB}/notes`, nextPart: { href: `${HUB}/lesson?part=2`, title: 'part 2' } }}
        {...extra}
      />
    </ToastProvider>,
  );
}
const idx = () => screen.getByTestId('slide-player').getAttribute('data-index');
const ready = () => waitFor(() => expect(screen.getByTestId('slide-player').hasAttribute('data-ready')).toBe(true));

describe('SlidePlayer (focus mode)', () => {
  it('strip: one-line h1, close → chapter, part switcher with links, "n / N", options with report and outline', async () => {
    player(5);
    await ready();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Chemical Reactions — Part 1: Equations');
    expect(screen.getByRole('link', { name: /Close the lesson/ }).getAttribute('href')).toBe(HUB);
    expect(screen.getByTestId('slide-count').textContent).toBe('1 / 5');
    const parts = screen.getByTestId('part-switcher');
    expect(parts.textContent).toContain('Part 1 of 2');
    expect(parts.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(parts);
    expect(parts.getAttribute('aria-expanded')).toBe('true');
    const nav = screen.getByRole('navigation', { name: 'Lesson parts' });
    expect(within(nav).getByRole('link', { name: /Redox/ }).getAttribute('href')).toBe(`${HUB}/lesson?part=2`);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(parts.getAttribute('aria-expanded')).toBe('false');
    // Options: report a mistake for this slide, and the outline jumps.
    fireEvent.click(screen.getByTestId('lesson-options'));
    const panel = screen.getByTestId('lesson-options-panel');
    expect(within(panel).getByRole('button', { name: 'Report a mistake in slide 1' })).toBeTruthy();
    fireEvent.click(within(panel).getByRole('button', { name: /Heading 4/ }));
    expect(idx()).toBe('3');
    expect(screen.getByTestId('slide-count').textContent).toBe('4 / 5');
    expect(screen.getByTestId('lesson-options').getAttribute('aria-expanded')).toBe('false');
    const bar = screen.getByRole('progressbar', { name: 'Lesson progress' });
    expect(bar.getAttribute('aria-valuetext')).toBe('Slide 4 of 5');
  });

  it('↓ / ↑ scroll the slide card, not the page; ← → still navigate', async () => {
    player(4);
    await ready();
    const slot = document.querySelector<HTMLElement>('[data-slide-index="0"]')!;
    const scrollBy = vi.fn();
    slot.scrollBy = scrollBy as unknown as typeof slot.scrollBy;
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(scrollBy).toHaveBeenCalledWith({ top: 64 });
    expect(idx()).toBe('0');
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(idx()).toBe('1');
  });

  it('swipes from the screen edge are left to the OS (back gesture)', async () => {
    player(4);
    await ready();
    const viewport = screen.getByRole('region', { name: 'Lesson slides' });
    fireEvent.touchStart(viewport, { touches: [{ clientX: 5, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 200, clientY: 100 }] });
    expect(idx()).toBe('0');
    fireEvent.touchStart(viewport, { touches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchEnd(viewport, { changedTouches: [{ clientX: 249, clientY: 100 }] });
    expect(idx()).toBe('1');
  });

  it('deep link ?slide=3 opens slide 3 and says so; the URL then follows the slide', async () => {
    window.history.replaceState(null, '', `${HUB}/lesson?part=1&slide=3`);
    player(5);
    await ready();
    expect(idx()).toBe('2');
    expect(screen.getByTestId('resume-note').textContent).toContain('Opened at slide 3');
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    await waitFor(() => expect(window.location.search).toBe('?part=1&slide=4'));
    fireEvent.keyDown(window, { key: 'Home' });
    await waitFor(() => expect(window.location.search).toBe('?part=1'));
    // Back/forward to an entry with another slide: the player follows the URL.
    window.history.replaceState(null, '', `${HUB}/lesson?part=1&slide=5`);
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(idx()).toBe('4');
  });

  it('resume: a guest returns to the saved slide ("Continuing from"), Start over goes to slide 1', async () => {
    recordGuestLessonPosition(CH, { part: 1, slide: 3, completed: false });
    player(6);
    await waitFor(() => expect(idx()).toBe('3'));
    expect(screen.getByTestId('resume-note').textContent).toContain('Continuing from slide 4');
    fireEvent.click(screen.getByRole('button', { name: 'Start over' }));
    expect(idx()).toBe('0');
    expect(screen.queryByTestId('resume-note')).toBeNull();
  });

  it('question slides: the bottom bar offers Check (submits the card) and Skip; then Next', async () => {
    player(4, {}, 1);
    await ready();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('check-slide').textContent).toContain('Check');
    expect(screen.getByTestId('next-slide').textContent).toContain('Skip');
    const form = document.querySelector<HTMLFormElement>('[data-slide-index="1"] article[data-question-id] form')!;
    const submitted = vi.fn((e: Event) => e.preventDefault());
    form.addEventListener('submit', submitted);
    fireEvent.click(screen.getByTestId('check-slide'));
    expect(submitted).toHaveBeenCalledTimes(1);
  });

  it('Finish on the last slide: completion screen with the summary, the next part in the bar, and back', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    player(3);
    await ready();
    fireEvent.keyDown(window, { key: 'End' });
    expect(screen.getByTestId('next-slide').textContent).toContain('Finish');
    fireEvent.click(screen.getByTestId('next-slide'));
    const done = await screen.findByTestId('lesson-complete', {}, { timeout: 5000 });
    expect(screen.getByTestId('slide-player').hasAttribute('data-finished')).toBe(true);
    expect(done.textContent).toContain('Part 1 complete');
    expect(done.textContent).toContain('3slides done');
    expect(within(done).getByRole('link', { name: 'Practise questions' }).getAttribute('href')).toBe(`${HUB}/practice`);
    expect(screen.getByTestId('lesson-next-step').getAttribute('href')).toBe(`${HUB}/lesson?part=2`);
    expect(screen.getByTestId('lesson-next-step').textContent).toContain('Next: part 2');
    expect(screen.getByTestId('slide-announcer').textContent).toBe('Part 1 complete');
    await waitFor(() => expect(screen.getByTestId('lesson-saved').textContent).toContain('Saved on this device'));
    // Previous returns to the last slide.
    fireEvent.click(screen.getByTestId('prev-slide'));
    expect(idx()).toBe('2');
    expect(screen.queryByTestId('lesson-complete')).toBeNull();
  });
});

/* ── Notes ────────────────────────────────────────────────────────────────────────────────────── */

describe('notes reading model', () => {
  it('contents: #s1 … and #exam-tips; numbers stripped for display', () => {
    const items = tocItems(['1. Chemical reactions', '2. Balancing'], 'Exam tips');
    expect(items).toEqual([
      { id: 's1', label: '1. Chemical reactions', number: 1 },
      { id: 's2', label: '2. Balancing', number: 2 },
      { id: 'exam-tips', label: 'Exam tips', number: null },
    ]);
    expect(tocItems(['A'], null)).toHaveLength(1);
    expect(stripNumber('3.2 Redox')).toBe('Redox');
    expect(stripNumber('4) Corrosion')).toBe('Corrosion');
    expect(stripNumber('Rancidity')).toBe('Rancidity');
    expect(stripNumber('1857 revolt')).toBe('1857 revolt');
  });

  it('the section being read is the last one above the reading line', () => {
    expect(activeIndex([200, 900, 1600], 136)).toBe(-1);
    expect(activeIndex([100, 900, 1600], 136)).toBe(0);
    expect(activeIndex([-800, 136, 700], 136)).toBe(1);
    expect(activeIndex([-2000, -1200, -10], 136)).toBe(2);
    // At the end of the page the last sections cannot reach the line: the last one well on screen counts.
    expect(activeIndex([-2000, 300, 500], 136, 800)).toBe(1);
    expect(activeIndex([-2000, 300, 450], 136, 800)).toBe(2);
    expect(activeIndex([-2000, 300, 700], 136, 800)).toBe(1);
  });

  it('reading progress: 0 before the article, 1 at its end, proportional between', () => {
    expect(readingProgress(500, 3000, 800, 136)).toBe(0);
    expect(readingProgress(136, 3000, 800, 136)).toBe(0);
    const scrollable = 3000 - (800 - 136);
    expect(readingProgress(136 - scrollable / 2, 3000, 800, 136)).toBeCloseTo(0.5);
    expect(readingProgress(-5000, 3000, 800, 136)).toBe(1);
    expect(readingProgress(100, 300, 800, 136)).toBe(1); // short article, already in view
  });

  it('reading time: about 160 words a minute, at least 1', () => {
    expect(readingMinutes('word '.repeat(10))).toBe(1);
    expect(readingMinutes('word '.repeat(800))).toBe(5);
    expect(readingMinutes('$a+b=c$ **bold** # heading')).toBe(1);
  });

  it('contents and reader bar: links to sections, current section marked while scrolling, Sections sheet', async () => {
    const items = tocItems(['1. Reactions', '2. Equations'], 'Exam tips');
    const article = document.createElement('article');
    article.id = 'notes-article';
    const tops: Record<string, number> = { s1: 50, s2: 900, 'exam-tips': 1700 }; // reading line: 96 px at 1024 px wide (jsdom)
    for (const it of items) {
      const sec = document.createElement('section');
      sec.id = it.id;
      sec.getBoundingClientRect = () => ({ top: tops[it.id]! }) as DOMRect;
      article.appendChild(sec);
    }
    article.getBoundingClientRect = () => ({ top: 100, height: 2400 }) as DOMRect;
    document.body.appendChild(article);
    render(
      <>
        <NotesToc items={items} title="Contents" />
        <NotesReaderBar items={items} sheetTitle="Sections" />
      </>,
    );
    const toc = screen.getByRole('navigation', { name: 'Contents' });
    expect(within(toc).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#s1', '#s2', '#exam-tips']);
    await waitFor(() => expect(within(toc).getByRole('link', { name: /Reactions/ }).getAttribute('aria-current')).toBe('location'));
    tops.s1 = -900;
    tops.s2 = 40;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => expect(within(toc).getByRole('link', { name: /Equations/ }).getAttribute('aria-current')).toBe('location'));
    expect(screen.getByTestId('notes-reader-bar').textContent).toContain('Equations');
    fireEvent.click(screen.getByTestId('notes-sections'));
    const sheet = await screen.findByRole('navigation', { name: 'Sections' });
    expect(within(sheet).getAllByRole('link')).toHaveLength(3);
    article.remove();
  });
});

/* ── Flashcards ───────────────────────────────────────────────────────────────────────────────── */

describe('flashcards session model', () => {
  const ids = ['a', 'b', 'c'];
  const run = (s: DeckState, ...actions: Parameters<typeof deckReducer>[1][]) => actions.reduce(deckReducer, s);

  it('flip, sort, skip to the next unsorted card, summary', () => {
    let s = initDeck(ids);
    s = run(s, { type: 'flip' });
    expect(s.flipped).toBe(true);
    s = run(s, { type: 'mark', mark: 'known' });
    expect(s).toMatchObject({ pos: 1, flipped: false, marks: { a: 'known' } });
    s = run(s, { type: 'move', to: 2 }, { type: 'mark', mark: 'learning' });
    expect(s.pos).toBe(1); // wraps to the first unsorted card
    expect(deckSummary(s)).toMatchObject({ known: 1, learning: 1, left: 1, done: false, knownPct: 33 });
    s = run(s, { type: 'mark', mark: 'known' });
    expect(deckSummary(s)).toMatchObject({ known: 2, learning: 1, left: 0, done: true });
  });

  it('review only the cards still being learnt; restart clears the session', () => {
    let s = run(initDeck(ids), { type: 'mark', mark: 'learning' }, { type: 'mark', mark: 'known' }, { type: 'mark', mark: 'learning' });
    s = run(s, { type: 'review' });
    expect(s).toMatchObject({ order: ['a', 'c'], reviewOnly: true, pos: 0, marks: { b: 'known' } });
    expect(deckSummary(s)).toMatchObject({ round: 2, total: 3, done: false });
    s = run(s, { type: 'restart' });
    expect(s).toEqual(initDeck(ids));
  });

  it('shuffle takes only a permutation of the round; moves clamp', () => {
    const s = initDeck(ids);
    expect(run(s, { type: 'shuffle', order: ['c', 'a', 'b'] }).order).toEqual(['c', 'a', 'b']);
    expect(run(s, { type: 'shuffle', order: ['a', 'a', 'b'] }).order).toEqual(ids);
    expect(run(s, { type: 'move', to: 9 }).pos).toBe(2);
    expect(run(s, { type: 'move', to: -1 }).pos).toBe(0);
  });

  it('keys: Space/Enter flip, ← → move, 1 / 2 sort only on the answer side', () => {
    expect(deckKey(' ', false)).toEqual({ type: 'flip' });
    expect(deckKey('Enter', true)).toEqual({ type: 'flip' });
    expect(deckKey('ArrowLeft', false)).toEqual({ type: 'prev' });
    expect(deckKey('ArrowRight', false)).toEqual({ type: 'next' });
    expect(deckKey('1', false)).toBeNull();
    expect(deckKey('1', true)).toEqual({ type: 'mark', mark: 'learning' });
    expect(deckKey('2', true)).toEqual({ type: 'mark', mark: 'known' });
    expect(deckKey('x', true)).toBeNull();
  });

  it('deck: keys 1/2 sort, the end-of-deck screen sums up and offers practice and a review', () => {
    const cards = ids.map((id) => ({ id, tag: 'fact', front: <p>Front {id}</p>, back: <p>Back {id}</p> }));
    render(<FlashcardDeck cards={cards} chapterId={CH} title="Flashcards: Chemical Reactions" links={{ hub: HUB, practice: `${HUB}/practice`, notes: `${HUB}/notes` }} />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Flashcards: Chemical Reactions');
    expect(screen.getByRole('link', { name: /Close the flashcards/ }).getAttribute('href')).toBe(HUB);
    fireEvent.keyDown(window, { key: '2' }); // not flipped yet: nothing
    expect(screen.getByRole('status').textContent).toBe('0 known · 0 still learning');
    for (const mark of ['2', '1', '2']) {
      fireEvent.keyDown(window, { key: ' ' });
      fireEvent.keyDown(window, { key: mark });
    }
    expect(screen.getByRole('status').textContent).toBe('2 known · 1 still learning');
    const done = screen.getByTestId('flashcards-done');
    expect(done.textContent).toContain('You know 2 of 3 cards');
    expect(screen.getByTestId('flashcards-next-step').getAttribute('href')).toBe(`${HUB}/practice`);
    expect(screen.getByRole('progressbar', { name: 'Cards sorted' }).getAttribute('aria-valuetext')).toBe('3 of 3 sorted');
    fireEvent.click(within(done).getByRole('button', { name: 'Review 1 still learning' }));
    expect(screen.getByText('Card 1 of 1 (still learning)')).toBeTruthy();
    expect(screen.getByText('Front b')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next card' }));
    expect(screen.getByText('Card 1 of 1 (still learning)')).toBeTruthy();
  });
});
