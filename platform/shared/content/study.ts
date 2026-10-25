/** Chapter notes and flashcards (ARCHITECTURE §7.2). */
import { z } from 'zod/v4';
import { ChapterId, TopicId } from './ids';
import { ContentStatus, Markdown, Provenance } from './common';
import { Visual } from './visual';

export const NotesSection = z.object({
  heading: z.string().min(1),
  body_md: Markdown.min(1),
  key_terms: z.array(z.object({ term: z.string().min(1), definition_md: Markdown.min(1) })).default([]),
  /** Display formulas in LaTeX. */
  formulas: z.array(z.object({ latex: z.string().min(1), label: z.string().optional() })).default([]),
  visual: Visual.nullable().default(null),
  topic_ids: z.array(TopicId).default([]),
});

export const Notes = z.object({
  unit: ChapterId,
  version: z.number().int().positive().default(1),
  title: z.string().min(1),
  language: z.string().default('en'),
  sections: z.array(NotesSection).min(1),
  /** Common mistakes and how marks are awarded. */
  exam_tips_md: Markdown.default(''),
  status: ContentStatus.default('draft'),
  provenance: Provenance.optional(),
});
export type Notes = z.infer<typeof Notes>;

export const Flashcard = z.object({
  id: z.string().regex(/^f\d{2,3}$/),
  front_md: Markdown.min(1),
  back_md: Markdown.min(1),
  tag: z.enum(['definition', 'formula', 'fact', 'concept', 'diagram', 'example', 'exam-tip']),
  topic_id: TopicId.nullable().default(null),
});

export const FlashcardSet = z
  .object({
    unit: ChapterId,
    version: z.number().int().positive().default(1),
    language: z.string().default('en'),
    cards: z.array(Flashcard).min(1),
    status: ContentStatus.default('draft'),
    provenance: Provenance.optional(),
  })
  .superRefine((set, ctx) => {
    const ids = new Set<string>();
    set.cards.forEach((c, i) => {
      if (ids.has(c.id)) ctx.addIssue({ code: 'custom', path: ['cards', i, 'id'], message: `duplicate card id ${c.id}` });
      ids.add(c.id);
    });
  });
export type FlashcardSet = z.infer<typeof FlashcardSet>;
