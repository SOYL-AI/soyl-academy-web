/**
 * Schemas for the catalog YAML in platform/catalog/ (ARCHITECTURE §7.1):
 *   subjects.yaml                         every board × class × subject
 *   <board dir>/<class dir>/<slug>/syllabus.yaml
 *   <...>/blueprints/*.yaml               see blueprint.ts
 */
import { z } from 'zod/v4';
import { Board, ChapterId, ClassLevel, Exam, SubjectId, TopicId } from './ids';

export const AcademicYear = z.string().regex(/^\d{4}-\d{2}$/, 'academic year like 2026-27');

export const SubjectTier = z.enum(['core', 'language', 'elective']);
export type SubjectTier = z.infer<typeof SubjectTier>;

export const SourceStatus = z.enum(['verified', 'unverified']);

export const Subject = z.object({
  id: SubjectId,
  board: Board,
  exam: Exam,
  class: ClassLevel,
  code: z.string().nullable(),
  name: z.string().min(1),
  /** Teaching language, ISO 639-1. */
  language: z.string().regex(/^[a-z]{2,3}$/),
  /** Script, ISO 15924 (Latn, Deva, ...). */
  script: z.string().regex(/^[A-Z][a-z]{3}$/),
  tier: SubjectTier,
  wave: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  priority: z.union([z.literal(1), z.literal(2)]),
  theory_only: z.boolean(),
  has_board_exam: z.boolean(),
  source_status: SourceStatus,
  source: z.string(),
  notes: z.string().nullable().optional(),
});
export type Subject = z.infer<typeof Subject>;

export const SubjectsFile = z
  .object({
    academic_year: AcademicYear,
    board: Board.optional(),
    subjects: z.array(Subject),
  })
  .superRefine((file, ctx) => {
    const seen = new Set<string>();
    file.subjects.forEach((s, i) => {
      if (seen.has(s.id)) ctx.addIssue({ code: 'custom', path: ['subjects', i, 'id'], message: `duplicate subject id ${s.id}` });
      seen.add(s.id);
      if (!s.id.startsWith(`${s.exam}-${s.class}-`))
        ctx.addIssue({ code: 'custom', path: ['subjects', i, 'id'], message: `id must start with ${s.exam}-${s.class}-` });
      const expectedWave = s.class >= 10 && s.class % 2 === 0 ? 1 : s.class >= 9 ? 2 : 3;
      if (s.wave !== expectedWave)
        ctx.addIssue({ code: 'custom', path: ['subjects', i, 'wave'], message: `class ${s.class} is wave ${expectedWave}` });
    });
  });
export type SubjectsFile = z.infer<typeof SubjectsFile>;

export const Topic = z.object({
  id: TopicId,
  title: z.string().min(1),
  title_en: z.string().optional(),
  learning_outcomes: z.array(z.string().min(1)).default([]),
});
export type Topic = z.infer<typeof Topic>;

export const LiteratureText = z.union([
  z.string(),
  z.object({ title: z.string(), author: z.string().optional(), title_en: z.string().optional() }),
]);

export const SyllabusChapter = z.object({
  id: ChapterId,
  number: z.number().int().positive(),
  title: z.string().min(1),
  title_en: z.string().optional(),
  unit: z.string().nullable().optional(),
  topics: z.array(Topic).min(1),
  removed_topics: z.array(z.string()).default([]),
  /** Titles and authors only — never the text itself (CONTEXT §8). */
  literature_texts: z.array(LiteratureText).default([]),
});
export type SyllabusChapter = z.infer<typeof SyllabusChapter>;

export const SyllabusFile = z
  .object({
    subject_id: SubjectId,
    academic_year: AcademicYear,
    source_status: SourceStatus,
    sources: z.array(z.string()).default([]),
    exam_notes: z.string().nullable().optional(),
    units: z
      .array(z.object({ name: z.string(), marks: z.number().nullable().optional() }))
      .default([]),
    chapters: z.array(SyllabusChapter).min(1),
    removed_topics: z.array(z.string()).default([]),
  })
  .superRefine((file, ctx) => {
    const ids = new Set<string>();
    file.chapters.forEach((ch, i) => {
      if (!ch.id.startsWith(`${file.subject_id}-ch`))
        ctx.addIssue({ code: 'custom', path: ['chapters', i, 'id'], message: `chapter id must start with ${file.subject_id}-ch` });
      for (const id of [ch.id, ...ch.topics.map((t) => t.id)]) {
        if (ids.has(id)) ctx.addIssue({ code: 'custom', path: ['chapters', i], message: `duplicate id ${id}` });
        ids.add(id);
      }
      ch.topics.forEach((t, j) => {
        if (!t.id.startsWith(`${ch.id}-t`))
          ctx.addIssue({ code: 'custom', path: ['chapters', i, 'topics', j, 'id'], message: `topic id must start with ${ch.id}-t` });
      });
    });
  });
export type SyllabusFile = z.infer<typeof SyllabusFile>;
