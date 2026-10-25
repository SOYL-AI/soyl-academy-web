/**
 * A content release is an immutable bundle per chapter (`unit@version`), stored as JSON in Blob at
 * content/releases/{unit}/{version}.json and ingested into Postgres (ARCHITECTURE §7.4).
 * Rollback = point the unit back to the previous release.
 */
import { z } from 'zod/v4';
import { ChapterId } from './ids';
import { Deck } from './deck';
import { FlashcardSet, Notes } from './study';
import { Question } from './question';

export const ChapterRelease = z
  .object({
    unit: ChapterId,
    version: z.number().int().positive(),
    academic_year: z.string(),
    created_at: z.string(),
    decks: z.array(Deck).min(1),
    notes: Notes,
    flashcards: FlashcardSet,
    questions: z.array(Question),
    /** Free-form record of the pipeline run that produced it. */
    build: z.object({ run_id: z.string().nullable(), checks: z.record(z.string(), z.string()) }).default({ run_id: null, checks: {} }),
  })
  .superRefine((r, ctx) => {
    const units = [...r.decks.map((d) => d.unit), r.notes.unit, r.flashcards.unit, ...r.questions.map((q) => q.unit)];
    units.forEach((u) => {
      if (u !== r.unit) ctx.addIssue({ code: 'custom', path: ['unit'], message: `item belongs to ${u}, release is ${r.unit}` });
    });
    const questionIds = new Set(r.questions.map((q) => q.id));
    if (questionIds.size !== r.questions.length) ctx.addIssue({ code: 'custom', path: ['questions'], message: 'duplicate question ids' });
    r.decks.forEach((d, di) =>
      d.slides.forEach((s, si) => {
        if (s.check_question_id && !questionIds.has(s.check_question_id))
          ctx.addIssue({ code: 'custom', path: ['decks', di, 'slides', si, 'check_question_id'], message: `unknown question ${s.check_question_id}` });
      }),
    );
  });
export type ChapterRelease = z.infer<typeof ChapterRelease>;

export function releaseBlobKey(unit: string, version: number): string {
  return `content/releases/${unit}/${version}.json`;
}
