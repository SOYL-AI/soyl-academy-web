/**
 * Notes reading model (pure, unit-tested): the table of contents, which section is being read, how far through
 * the notes the reader is, and the reading time.
 */
export interface TocItem {
  id: string;
  /** Visible label (the section heading). */
  label: string;
  /** 1-based section number (exam tips have none). */
  number: number | null;
}

/** Sections become #s1, #s2 …; exam tips (when present) #exam-tips. Headings keep their own numbering ("1. …"). */
export function tocItems(headings: readonly string[], examTipsLabel: string | null): TocItem[] {
  const items: TocItem[] = headings.map((h, i) => ({ id: `s${i + 1}`, label: h.trim(), number: i + 1 }));
  if (examTipsLabel) items.push({ id: 'exam-tips', label: examTipsLabel, number: null });
  return items;
}

/**
 * "1. Chemical reactions" / "3.2 Redox" → the text (the ToC shows its own number). A bare number is kept, so
 * "1857 revolt" stays as it is.
 */
export function stripNumber(label: string): string {
  return label.replace(/^\s*(?:\d+(?:\.\d+)+[.)]?|\d+[.)])\s+/, '');
}

/**
 * The section being read: the last one whose top has reached `line` px from the top of the viewport (the
 * sticky bars' bottom plus a little). Before the first section: -1. At the very end of the page the last
 * sections can never reach the line, so there it is the last section whose top is on screen (`atEnd` = the
 * viewport height).
 */
export function activeIndex(tops: readonly number[], line: number, atEnd?: number): number {
  let active = -1;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i]! <= line) active = i;
    else break;
  }
  if (atEnd !== undefined) {
    for (let i = tops.length - 1; i > active; i--) {
      if (tops[i]! < atEnd * 0.6) return i;
    }
  }
  return active;
}

/**
 * How far through the article the reader is, 0–1: 0 while its top is below `line`, 1 once its bottom is in view.
 * `top` and `height` are the article's viewport top and height; `viewport` is the window height.
 */
export function readingProgress(top: number, height: number, viewport: number, line: number): number {
  const scrollable = height - (viewport - line);
  if (scrollable <= 0) return top <= line ? 1 : 0;
  const read = line - top;
  return Math.min(1, Math.max(0, read / scrollable));
}

/** Words per minute for a school student reading study notes (slower than leisure reading). */
const WPM = 160;

/** Minutes to read `text` (at least 1). Formula markup and Markdown symbols are not counted as words. */
export function readingMinutes(text: string): number {
  const words = text
    .replace(/\$[^$]*\$/g, ' x ')
    .replace(/[#*_>`|[\]()-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}
