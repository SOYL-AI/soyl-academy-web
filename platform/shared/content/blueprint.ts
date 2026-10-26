/**
 * Blueprints: machine-readable paper patterns (CONTEXT §15, ARCHITECTURE §9).
 * Stored as YAML in platform/catalog/<board>/<class>/<subject>/blueprints/<paper_type>.yaml
 * (or a board/class-level default in platform/catalog/<board>/blueprints/).
 */
import { z } from 'zod/v4';
import { Board, ClassLevel, Exam, SubjectId } from './ids';
import { Competency, QuestionType } from './question';

export const PaperType = z.enum([
  'board', // full-length board-pattern paper (mocks, live mocks)
  'board-second-exam', // CBSE Class 10 May exam track
  'chapter-test-short',
  'chapter-test-long',
  'unit-test',
  'half-yearly',
  'term',
  'annual',
]);
export type PaperType = z.infer<typeof PaperType>;

export const BlueprintItem = z.object({
  type: QuestionType,
  count: z.number().int().positive(),
  marks_each: z.number().positive().multipleOf(0.5),
  /** Internal choice: the student attempts `attempt` of every `of` questions in this item group. */
  internal_choice: z.object({ attempt: z.number().int().positive(), of: z.number().int().positive() }).nullable().default(null),
  competency: Competency.nullable().default(null),
  difficulty: z.tuple([z.number().int().min(1).max(5), z.number().int().min(1).max(5)]).nullable().default(null),
});

export const BlueprintSection = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  instructions: z.string().default(''),
  items: z.array(BlueprintItem).min(1),
});

export const Blueprint = z
  .object({
    id: z.string().min(1),
    board: Board,
    exam: Exam,
    class: ClassLevel,
    /** Null for a board/class default that applies to any subject without its own. */
    subject_id: SubjectId.nullable(),
    paper_type: PaperType,
    /**
     * Paper variant when one subject has several papers on the same syllabus (CBSE Maths Standard 041 /
     * Basic 241, a language level, an NCC wing). Matches Subject.variants[].code/name in subjects.yaml.
     * Null/absent = the subject's only (or default) paper. The assembler builds one series per variant.
     */
    variant: z.object({ code: z.string().nullable(), name: z.string().min(1) }).nullable().optional(),
    academic_year: z.string(),
    duration_min: z.number().int().positive(),
    total_marks: z.number().positive(),
    /** Share of marks by competency kind, e.g. CBSE board papers ≈ 50% competency-based, 20% MCQ, 30% constructed. */
    mark_shares: z.record(z.string(), z.number().min(0).max(1)).default({}),
    /** Chapter scope: "chapter" (one chapter), "unit" (a unit's chapters), "syllabus" (all), or explicit ids. */
    scope: z.union([z.enum(['chapter', 'unit', 'half-syllabus', 'syllabus']), z.array(z.string())]),
    sections: z.array(BlueprintSection).min(1),
    source_status: z.enum(['verified', 'unverified']),
    source: z.string(),
    notes: z.string().nullable().optional(),
  })
  .superRefine((b, ctx) => {
    // Marks that count = attempted items only (internal choice reduces the count that is attempted).
    const counted = b.sections
      .flatMap((s) => s.items)
      .reduce((sum, it) => {
        const attempted = it.internal_choice ? (it.count / it.internal_choice.of) * it.internal_choice.attempt : it.count;
        return sum + attempted * it.marks_each;
      }, 0);
    if (Math.abs(counted - b.total_marks) > 1e-9)
      ctx.addIssue({ code: 'custom', path: ['total_marks'], message: `sections add up to ${counted} attempted marks, total_marks is ${b.total_marks}` });
  });
export type Blueprint = z.infer<typeof Blueprint>;
