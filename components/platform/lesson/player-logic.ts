/**
 * Slide player logic, pure and unit-tested: navigation keys, swipe detection, the window of mounted
 * slides (current + previous + next two: "prefetch next 2 slides", "lazy diagrams"), narration audio
 * URLs and the audio-time → word mapping that drives listen-mode highlighting.
 */
import type { NarrationSentence } from '@/components/platform/ui/slides/segment';

export type NavAction = 'next' | 'prev' | 'first' | 'last' | null;

/** ← → Space (Shift+Space back) PageUp/PageDown Home End. (↑ ↓ scroll a tall slide; the player handles them.) */
export function keyAction(key: string, shift = false): NavAction {
  switch (key) {
    case 'ArrowRight':
    case 'PageDown':
      return 'next';
    case 'ArrowLeft':
    case 'PageUp':
      return 'prev';
    case ' ':
    case 'Spacebar':
      return shift ? 'prev' : 'next';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    default:
      return null;
  }
}

/**
 * Keys typed into a form control or a widget with its own arrow keys (radio groups, sliders, tabs) are not slide
 * navigation; nor are Space and Enter on a button, link or summary (they activate it). Arrows, Page keys, Home and
 * End on a focused button or link still navigate (focus often rests on Next or a strip tool). Without `key`, any
 * key on a button or link counts as the control's (the previous behaviour).
 */
export function isInteractiveTarget(target: EventTarget | null, key?: string): boolean {
  const el = target as (Element & { isContentEditable?: boolean }) | null;
  if (!el || typeof el.closest !== 'function') return false;
  if (el.isContentEditable) return true;
  if (el.closest('input, textarea, select, [role="slider"], [role="radio"], [role="tab"], [role="listbox"], [role="menu"], dialog, [contenteditable="true"]')) return true;
  const activates = key === undefined || key === ' ' || key === 'Spacebar' || key === 'Enter';
  return activates && !!el.closest('button, a[href], summary');
}

/**
 * Elements that scroll sideways (wide tables, maths, code): a horizontal swipe there scrolls, not navigates.
 * Besides the known scrollers, any ancestor (up to `stop`) that really overflows sideways counts, so a wide
 * diagram or a future widget never fights the swipe.
 */
export function startsInHorizontalScroller(target: EventTarget | null, stop?: Element | null): boolean {
  const el = target as Element | null;
  if (!el || typeof el.closest !== 'function') return false;
  if (el.closest('[data-math], pre, table, [data-scroll-x], input, textarea, select, .katex-display')) return true;
  for (let n: Element | null = el; n && n !== stop; n = n.parentElement) {
    if (n.scrollWidth > n.clientWidth + 1) {
      const o = getComputedStyle(n).overflowX;
      if (o === 'auto' || o === 'scroll') return true;
    }
  }
  return false;
}

/** Minimum horizontal travel for a swipe; it must also be 1.5× the vertical travel (a scroll is not a swipe). */
export const SWIPE_MIN_PX = 50;
/** Touches that start this close to a screen edge are the OS back/forward gesture, not a slide swipe. */
export const SWIPE_EDGE_PX = 16;

/** A mostly horizontal swipe of at least 50 px: left → next, right → previous. */
export function swipeAction(dx: number, dy: number): NavAction {
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return dx < 0 ? 'next' : 'prev';
}

/** True when a touch starts in the OS edge-gesture zone of a `width`-px screen. */
export function isEdgeStart(x: number, width: number): boolean {
  return width > 0 && (x < SWIPE_EDGE_PX || x > width - SWIPE_EDGE_PX);
}

/* ── Deep links: ?part=N&slide=M (M is 1-based; the first slide has no parameter) ─────────────── */

/** The 0-based slide a URL's query asks for, or null (absent, malformed or out of range). */
export function slideFromSearch(search: string, total: number): number | null {
  const all = new URLSearchParams(search).getAll('slide');
  if (all.length !== 1 || !/^\d{1,3}$/.test(all[0]!)) return null;
  const n = Number(all[0]);
  return n >= 1 && n <= total ? n - 1 : null;
}

/** The same URL (path + query + hash) with `slide` set to a 0-based index (removed for the first slide). */
export function withSlideParam(href: string, index: number): string {
  const url = new URL(href, 'https://x.invalid');
  if (index > 0) url.searchParams.set('slide', String(index + 1));
  else url.searchParams.delete('slide');
  const q = url.searchParams.toString();
  return `${url.pathname}${q ? `?${q}` : ''}${url.hash}`;
}

export type OpeningNote = { kind: 'resume' | 'link'; index: number } | null;

/**
 * Where the player opens and what it says about it. A slide in the URL wins (a shared link, or a reload, whose
 * URL the player keeps in step with the slide); a saved position comes next. A reload lands on the saved slide,
 * so a URL slide equal to the saved one still says "Continuing from …". A finished part opens at the start.
 */
export function openingPosition(urlIndex: number | null, saved: number | null | undefined, savedDone: boolean, total: number): { index: number; note: OpeningNote } {
  const last = total - 1;
  const savedOk = saved !== null && saved !== undefined && saved > 0 && saved <= last && !savedDone ? saved : null;
  if (urlIndex !== null && urlIndex > 0 && urlIndex <= last) return { index: urlIndex, note: { kind: urlIndex === savedOk ? 'resume' : 'link', index: urlIndex } };
  if (urlIndex === 0) return { index: 0, note: null };
  if (savedOk !== null) return { index: savedOk, note: { kind: 'resume', index: savedOk } };
  return { index: 0, note: null };
}

/* ── Completion summary ──────────────────────────────────────────────────────────────────────── */

export interface CheckOutcome {
  correct: boolean | null;
}

export interface CompletionSummary {
  slides: number;
  checks: number;
  answered: number;
  right: number;
  /** Written answers the student marks themselves (answered, not auto-marked). */
  selfMarked: number;
  headline: string;
  detail: string;
}

/** The end-of-part summary: slides, and how the quick checks went (answers given during this visit). */
export function completionSummary(slides: number, checkIds: readonly string[], results: Readonly<Record<string, CheckOutcome | undefined>>): CompletionSummary {
  const ids = [...new Set(checkIds)];
  const done = ids.map((id) => results[id]).filter((r): r is CheckOutcome => !!r);
  const right = done.filter((r) => r.correct === true).length;
  const selfMarked = done.filter((r) => r.correct === null).length;
  const marked = done.length - selfMarked;
  let headline = 'Nice work!';
  if (marked > 0 && right === marked) headline = marked > 1 ? 'Brilliant, every check right!' : 'Brilliant, check right!';
  else if (marked > 0 && right / marked >= 0.5) headline = 'Great effort!';
  else if (marked > 0) headline = 'Good start, keep practising!';
  let detail: string;
  const checksText = (n: number) => (n === 1 ? 'quick check' : 'quick checks');
  if (ids.length === 0) detail = `You went through all ${slides} slides.`;
  else if (done.length === 0) detail = `You went through ${slides} slides. The ${ids.length === 1 ? 'quick check is' : `${ids.length} quick checks are`} waiting for you in practice.`;
  else if (marked === 0) detail = `You went through ${slides} slides and answered ${done.length} of ${ids.length} ${checksText(ids.length)}.`;
  else detail = `You went through ${slides} slides and got ${right} of ${marked} ${checksText(marked)} right${selfMarked ? ` (${selfMarked} to mark yourself)` : ''}.`;
  return { slides, checks: ids.length, answered: done.length, right, selfMarked, headline, detail };
}

export function applyNav(action: NavAction, index: number, total: number): number {
  const last = Math.max(0, total - 1);
  switch (action) {
    case 'next':
      return Math.min(last, index + 1);
    case 'prev':
      return Math.max(0, index - 1);
    case 'first':
      return 0;
    case 'last':
      return last;
    default:
      return index;
  }
}

/** Slides kept in the DOM: one behind, the current one, and the next two (prefetched, hidden). */
export function mountedWindow(index: number, total: number): number[] {
  const out: number[] = [];
  for (let i = Math.max(0, index - 1); i <= Math.min(total - 1, index + 2); i++) out.push(i);
  return out;
}

const AUDIO_KEY_RE = /^audio\/[A-Za-z0-9._/-]{1,200}\.(?:ogg|opus|webm|mp3|m4a)$/;

/**
 * Public URL of a slide's narration (pipeline M2: blob key `audio/<unit>/<deck>/<slide>-<hash>.ogg` in the
 * public-assets container behind the CDN). Only https CDN bases and well-formed keys (no `..`) are used;
 * anything else means "no audio" (WEB-1: media only from the site and the CDN origin).
 */
export function audioUrl(key: string | null | undefined, cdnBase: string | null | undefined): string | null {
  if (!key || !cdnBase || !AUDIO_KEY_RE.test(key) || key.includes('..')) return null;
  let base: URL;
  try {
    base = new URL(cdnBase);
  } catch {
    return null;
  }
  if (base.protocol !== 'https:' || base.username || base.password) return null;
  const prefix = base.href.endsWith('/') ? base.href : `${base.href}/`;
  return `${prefix}${key}`;
}

/** The MIME type to test with canPlayType for a key's extension. */
export function audioMime(key: string): string {
  if (key.endsWith('.mp3')) return 'audio/mpeg';
  if (key.endsWith('.m4a')) return 'audio/mp4';
  if (key.endsWith('.webm')) return 'audio/webm; codecs="opus"';
  return 'audio/ogg; codecs="opus"';
}

/**
 * Which word is being spoken at `t` seconds of a `duration`-second clip. The pipeline stores no word
 * timings yet (only `duration_ms`), so time is shared out by word length (characters + a pause after
 * each sentence), which tracks neural TTS closely enough for a read-along. When TTS word-boundary offsets
 * are stored later, use `wordAtOffset` instead.
 */
export function wordAtTime(sentences: NarrationSentence[], t: number, duration: number): number | null {
  const words = sentences.flatMap((s) => s.words.map((w, i) => ({ index: w.index, weight: w.text.length + 1 + (i === s.words.length - 1 ? 4 : 0) })));
  if (!words.length || !(duration > 0) || !(t >= 0)) return null;
  const total = words.reduce((n, w) => n + w.weight, 0);
  const target = (Math.min(t, duration) / duration) * total;
  let acc = 0;
  for (const w of words) {
    acc += w.weight;
    if (target < acc) return w.index;
  }
  return words[words.length - 1]!.index;
}

/** Debounce for lesson-progress saves (API limit 120/min; one save per settled slide). */
export const PROGRESS_DEBOUNCE_MS = 1200;
