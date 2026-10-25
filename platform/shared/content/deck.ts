/**
 * Slide decks (ARCHITECTURE §7.2, CONTEXT §8 "Visual lesson rules").
 * Structural rules are enforced here; editorial targets (slide counts, visual frequency) are
 * checked by the pipeline's lint stage using config/content-targets.ts so they can be tuned.
 */
import { z } from 'zod/v4';
import { ChapterId } from './ids';
import { ContentStatus, Markdown, Provenance, wordCount } from './common';
import { Visual } from './visual';
import { CONTENT_TARGETS } from '../config/content-targets';

export const SLIDE_LAYOUTS = [
  'title',
  'concept',
  'two-column',
  'diagram',
  'example',
  'check',
  'summary',
  'exam-tips',
] as const;
export const SlideLayout = z.enum(SLIDE_LAYOUTS);
export type SlideLayout = z.infer<typeof SlideLayout>;

export const Slide = z
  .object({
    id: z.string().regex(/^s\d{2}$/),
    layout: SlideLayout,
    heading: z.string().min(1).max(120),
    body_md: Markdown.default(''),
    bullets: z.array(Markdown).max(6).default([]),
    /** two-column layout: the right-hand column. */
    columns: z.tuple([Markdown, Markdown]).optional(),
    visual: Visual.nullable().default(null),
    /** Display maths in LaTeX (KaTeX). Inline maths goes in body_md as $...$. */
    math: z.array(z.string()).default([]),
    /** Plain spoken language, read aloud in listen mode. */
    narration: z.string().min(1),
    /** check layout: the practice question shown on this slide. */
    check_question_id: z.string().nullable().default(null),
    /** Narration audio, filled in by the TTS stage. */
    audio: z.object({ key: z.string(), duration_ms: z.number().int().positive() }).nullable().default(null),
  })
  .superRefine((s, ctx) => {
    const words = wordCount(s.narration);
    if (words > CONTENT_TARGETS.narrationMaxWords)
      ctx.addIssue({ code: 'custom', path: ['narration'], message: `narration is ${words} words (max ${CONTENT_TARGETS.narrationMaxWords})` });
    if (s.layout === 'diagram' && !s.visual) ctx.addIssue({ code: 'custom', path: ['visual'], message: 'diagram slide needs a visual' });
    if (s.layout === 'check' && !s.check_question_id)
      ctx.addIssue({ code: 'custom', path: ['check_question_id'], message: 'check slide needs check_question_id' });
    if (s.layout === 'two-column' && !s.columns) ctx.addIssue({ code: 'custom', path: ['columns'], message: 'two-column slide needs columns' });
  });
export type Slide = z.infer<typeof Slide>;

export const Deck = z
  .object({
    unit: ChapterId,
    /** Long chapters are split into parts (1-based). Null when the chapter is one deck. */
    part: z.number().int().positive().nullable().default(null),
    version: z.number().int().positive().default(1),
    title: z.string().min(1),
    language: z.string().default('en'),
    goals: z.array(z.string().min(1)).min(1).max(6),
    slides: z.array(Slide).min(1),
    status: ContentStatus.default('draft'),
    provenance: Provenance.optional(),
  })
  .superRefine((d, ctx) => {
    const ids = new Set<string>();
    d.slides.forEach((s, i) => {
      if (ids.has(s.id)) ctx.addIssue({ code: 'custom', path: ['slides', i, 'id'], message: `duplicate slide id ${s.id}` });
      ids.add(s.id);
    });
  });
export type Deck = z.infer<typeof Deck>;
