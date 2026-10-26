import { z } from 'zod/v4';

/** Content lifecycle (ARCHITECTURE §7.3). Only `published` and `reviewed` are visible to students. */
export const ContentStatus = z.enum([
  'draft',
  'auto_verified',
  'needs_review', // failed automated verification after the allowed retries
  'published',
  'reviewed',
  'flagged',
  'fixed',
  'retired',
]);
export type ContentStatus = z.infer<typeof ContentStatus>;

export const STUDENT_VISIBLE_STATUSES: readonly ContentStatus[] = ['published', 'reviewed'];

/** Where an item came from and how it was made, recorded on every generated item (ARCHITECTURE §8.2). */
export const Provenance = z.object({
  origin: z.enum(['pipeline', 'exemplar', 'human']),
  template_version: z.string().nullable().default(null),
  model: z.string().nullable().default(null),
  generated_at: z.string().nullable().default(null),
  /** Human or agent author of hand-written content (exemplars, reviewer edits); `model` stays for generated items. */
  author: z.string().nullable().optional(),
});
export type Provenance = z.infer<typeof Provenance>;

/** Markdown with optional inline/display LaTeX ($...$, $$...$$) and mhchem (\ce{...}). */
export const Markdown = z.string();

export function wordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

/**
 * Underline marker for language items ("रेखांकित पद", "the underlined word"): `++text++`.
 *
 * Raw HTML such as `<u>` is forbidden in content Markdown (lint `banned.html`), and `__text__` is
 * already strong emphasis (bold) in CommonMark, so it cannot mean underline. `++text++` is plain
 * text to a CommonMark parser and is the markdown-it-ins convention (rendered as `<ins>`, which
 * the platform styles as an underline). Rules, mirrored by the renderer:
 * - the span is on one line, at most 80 characters, and does not start or end with whitespace;
 * - it is not recognised inside code spans/blocks or maths (`$…$`);
 * - a `++` that is not part of a span (e.g. "C++") is left as text.
 * Renderers: replace UNDERLINE_RE matches with an underlined inline element whose content is the
 * captured text rendered as inline Markdown.
 */
export const UNDERLINE_RE = /\+\+([^\s+](?:[^\n]{0,78}?[^\s+])?)\+\+/g;

/** The underlined spans of a Markdown string (outside code and maths is the caller's concern). */
export function underlineSpans(md: string): string[] {
  return [...md.matchAll(UNDERLINE_RE)].map((m) => m[1]!);
}

/** `++` openers with no closing marker on the same line (an underline span that will not render). */
export function unmatchedUnderline(md: string): string[] {
  const rest = md.replace(UNDERLINE_RE, ' ');
  return [...rest.matchAll(/(?:^|\s)\+\+(?=[^\s+])(\S{0,20})/g)].map((m) => m[0].trim());
}
