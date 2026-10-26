/**
 * Stage 2 (outline) output and the per-chapter question bank file (ARCHITECTURE §8.1).
 *
 * The lesson outline is written by a model (LessonOutline); the question plan is computed
 * deterministically by the pipeline from the subject's blueprints and content-targets.ts, then
 * both are stored together as a ChapterOutline that stage 3 (generate) works from.
 */
import { z } from 'zod/v4';
import { ChapterId, TopicId } from './ids';
import { Provenance } from './common';
import { SlideLayout } from './deck';
import { Competency, Question, QuestionType } from './question';

export const VISUAL_KINDS = ['svg', 'plot', 'geometry', 'chem', 'table', 'flow'] as const;
export const VisualKind = z.enum(VISUAL_KINDS);

export const OutlineSlide = z.object({
  layout: SlideLayout,
  heading: z.string().min(1).max(120),
  /** One line: what this slide teaches or asks. */
  intent: z.string().default(''),
  topic_ids: z.array(TopicId).default([]),
  /** Planned visual kind, or null for a text-only slide. */
  visual: VisualKind.nullable().default(null),
});
export type OutlineSlide = z.infer<typeof OutlineSlide>;

export const OutlinePart = z.object({
  /** 1-based part number. A chapter that fits one deck has a single part 1. */
  part: z.number().int().positive(),
  title: z.string().min(1),
  topic_ids: z.array(TopicId).min(1),
  slides: z.array(OutlineSlide).min(1),
});
export type OutlinePart = z.infer<typeof OutlinePart>;

/** What the outline model writes. */
export const LessonOutline = z.object({
  goals: z.array(z.string().min(1)).min(1).max(6),
  parts: z.array(OutlinePart).min(1),
});
export type LessonOutline = z.infer<typeof LessonOutline>;

export const QuestionPlanType = z.object({
  type: QuestionType,
  count: z.number().int().positive(),
  /** Typical marks for this type in the board pattern. */
  marks: z.number().positive().multipleOf(0.5),
});

export const QuestionPlan = z.object({
  /** Practice questions to generate (check-slide questions from decks are extra). */
  total: z.number().int().nonnegative(),
  by_type: z.array(QuestionPlanType).min(1),
  by_difficulty: z.array(z.object({ difficulty: z.number().int().min(1).max(5), count: z.number().int().nonnegative() })),
  by_competency: z.array(z.object({ competency: Competency, count: z.number().int().nonnegative() })),
  /** Where the type mix came from: blueprint ids, or "default:<family>". */
  sources: z.array(z.string()).default([]),
});
export type QuestionPlan = z.infer<typeof QuestionPlan>;

export const ChapterOutline = LessonOutline.extend({
  unit: ChapterId,
  version: z.number().int().positive().default(1),
  title: z.string().min(1),
  /** Subject family used to pick templates (content-pipeline/config/families.ts). */
  family: z.string().min(1),
  question_plan: QuestionPlan,
  provenance: Provenance.optional(),
});
export type ChapterOutline = z.infer<typeof ChapterOutline>;

/** The question bank of one chapter, as the pipeline writes it before a release is assembled. */
export const QuestionBank = z
  .object({
    unit: ChapterId,
    questions: z.array(Question),
  })
  .superRefine((bank, ctx) => {
    const ids = new Set<string>();
    bank.questions.forEach((q, i) => {
      if (ids.has(q.id)) ctx.addIssue({ code: 'custom', path: ['questions', i, 'id'], message: `duplicate question id ${q.id}` });
      ids.add(q.id);
      if (q.unit !== bank.unit) ctx.addIssue({ code: 'custom', path: ['questions', i, 'unit'], message: `question belongs to ${q.unit}` });
    });
  });
export type QuestionBank = z.infer<typeof QuestionBank>;
