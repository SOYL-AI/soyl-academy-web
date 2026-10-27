/**
 * Slide player logic, pure and unit-tested: navigation keys, swipe detection, the window of mounted
 * slides (current + previous + next two: "prefetch next 2 slides", "lazy diagrams"), narration audio
 * URLs and the audio-time → word mapping that drives listen-mode highlighting.
 */
import type { NarrationSentence } from '@/components/platform/ui/slides/segment';

export type NavAction = 'next' | 'prev' | 'first' | 'last' | null;

/** ← → Space (Shift+Space back) PageUp/PageDown Home End. */
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

/** Keys typed into a form control, or activating a button/link, are not slide navigation. */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  const el = target as (Element & { isContentEditable?: boolean }) | null;
  if (!el || typeof el.closest !== 'function') return false;
  if (el.isContentEditable) return true;
  return !!el.closest('input, textarea, select, button, a[href], summary, [role="slider"], [role="radio"], [role="tab"], dialog, [contenteditable="true"]');
}

/** Elements that scroll sideways (wide tables, maths, code): a horizontal swipe there scrolls, not navigates. */
export function startsInHorizontalScroller(target: EventTarget | null): boolean {
  const el = target as Element | null;
  if (!el || typeof el.closest !== 'function') return false;
  return !!el.closest('[data-math], pre, table, [data-scroll-x], input, textarea, select');
}

export const SWIPE_MIN_PX = 50;

/** A mostly horizontal swipe of at least 50 px: left → next, right → previous. */
export function swipeAction(dx: number, dy: number): NavAction {
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return null;
  return dx < 0 ? 'next' : 'prev';
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
