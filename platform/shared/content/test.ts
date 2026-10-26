/**
 * Assembled tests (ARCHITECTURE §9): a fixed list of question versions laid out by a blueprint.
 * Tests reference question *versions*, so editing a question never changes a past attempt.
 */
import { z } from 'zod/v4';
import { ChapterId, SubjectId } from './ids';
import { PaperType } from './blueprint';

export const TestKind = z.enum(['chapter', 'unit', 'term', 'full', 'live', 'custom']);
export type TestKind = z.infer<typeof TestKind>;

export const TestItem = z.object({
  question_id: z.string().min(1),
  question_version: z.number().int().positive(),
  marks: z.number().positive().multipleOf(0.5),
  /** Items sharing a choice group are alternatives: the student attempts `attempt` of them. */
  choice_group: z.string().nullable().default(null),
});

export const TestSection = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  instructions: z.string().default(''),
  items: z.array(TestItem).min(1),
  choice_groups: z.array(z.object({ id: z.string(), attempt: z.number().int().positive() })).default([]),
});

export const TestDefinition = z
  .object({
    id: z.string().regex(/^t_[a-z0-9_-]+$/),
    kind: TestKind,
    paper_type: PaperType,
    blueprint_id: z.string().nullable(),
    title: z.string().min(1),
    subject_id: SubjectId,
    chapter_ids: z.array(ChapterId).min(1),
    duration_min: z.number().int().positive(),
    total_marks: z.number().positive(),
    /** Shuffle question order within sections where the board pattern allows. */
    shuffle: z.boolean().default(false),
    sections: z.array(TestSection).min(1),
    /** Deterministic assembly seed, so the same inputs rebuild the same paper. */
    seed: z.string().nullable().default(null),
    version: z.number().int().positive().default(1),
  })
  .superRefine((t, ctx) => {
    let attempted = 0;
    const seen = new Set<string>();
    t.sections.forEach((s, si) => {
      const groups = new Map(s.choice_groups.map((g) => [g.id, g.attempt]));
      const grouped = new Map<string, number[]>();
      s.items.forEach((it, ii) => {
        if (seen.has(it.question_id))
          ctx.addIssue({ code: 'custom', path: ['sections', si, 'items', ii], message: `question ${it.question_id} appears twice` });
        seen.add(it.question_id);
        if (it.choice_group === null) attempted += it.marks;
        else {
          if (!groups.has(it.choice_group))
            ctx.addIssue({ code: 'custom', path: ['sections', si, 'items', ii, 'choice_group'], message: `unknown choice group ${it.choice_group}` });
          grouped.set(it.choice_group, [...(grouped.get(it.choice_group) ?? []), it.marks]);
        }
      });
      for (const [id, marks] of grouped) {
        const attempt = groups.get(id) ?? 0;
        if (new Set(marks).size > 1)
          ctx.addIssue({ code: 'custom', path: ['sections', si, 'choice_groups'], message: `choice group ${id} mixes marks` });
        if (attempt >= marks.length)
          ctx.addIssue({ code: 'custom', path: ['sections', si, 'choice_groups'], message: `choice group ${id} offers no choice` });
        attempted += attempt * (marks[0] ?? 0);
      }
    });
    if (Math.abs(attempted - t.total_marks) > 1e-9)
      ctx.addIssue({ code: 'custom', path: ['total_marks'], message: `attempted marks add up to ${attempted}, total_marks is ${t.total_marks}` });
  });
export type TestDefinition = z.infer<typeof TestDefinition>;
