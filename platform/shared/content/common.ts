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
});
export type Provenance = z.infer<typeof Provenance>;

/** Markdown with optional inline/display LaTeX ($...$, $$...$$) and mhchem (\ce{...}). */
export const Markdown = z.string();

export function wordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}
