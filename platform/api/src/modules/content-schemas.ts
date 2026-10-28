/**
 * Response schemas for content, practice and progress (API-9: serialisation strips anything not
 * listed). Question objects use the content contract's snake_case names; wrappers are camelCase.
 * None of the student-facing schemas has a field for answers, solutions, marking schemes or rubrics.
 */
import { z } from 'zod/v4';
import { QUESTION_TYPES } from '@soyl/shared/content/question';
import { SLIDE_LAYOUTS } from '@soyl/shared/content/deck';
import { ChapterId } from '@soyl/shared/content/ids';
import { BoardSchema } from '../schemas';
import { SCHOOL_ASSESSMENT_KINDS } from '../domain/assessment';

export const ChapterParams = z.strictObject({ id: ChapterId });
/** Formative-only chapters/topics (M5): set when boardAssessed is false (domain/assessment.ts). */
export const SchoolAssessmentSchema = z
  .enum(SCHOOL_ASSESSMENT_KINDS)
  .meta({
    id: 'SchoolAssessment',
    description: 'Only when boardAssessed is false: assessed by the school, not in the board exam. periodic = periodic assessment only; project = project work only; practical = practical; internal = formative/internal assessment.',
  });
export const ReviewStatusSchema = z.enum(['beta', 'reviewed']).meta({ id: 'ReviewStatus', description: 'beta = published after automated checks; reviewed = human-reviewed (CONTEXT §4).' });
const QuestionTypeSchema = z.enum(QUESTION_TYPES).meta({ id: 'QuestionType' });
const OptionSchema = z.object({ id: z.string(), text_md: z.string() });
/** Diagrams/visuals: renderable specs from the content contract (platform/shared/content/visual.ts). */
const VisualSchema = z.unknown().meta({ id: 'Visual', description: 'platform/shared/content/visual.ts Visual' });

const partShape = {
  id: z.string(),
  type: QuestionTypeSchema,
  /** Auto-gradable (instant check); written types are self-evaluated against the marking scheme. */
  objective: z.boolean(),
  stem_md: z.string(),
  options: z.array(OptionSchema),
  match_right: z.array(OptionSchema),
  marks: z.number(),
  assets: z.array(VisualSchema),
  format: z.string().optional(),
  word_limit: z.object({ min: z.number().int(), max: z.number().int() }).optional(),
  map_id: z.string().optional(),
};
export const StudentPartSchema = z.object(partShape).meta({ id: 'StudentQuestionPart' });
export const StudentQuestionSchema = z
  .object({
    ...partShape,
    version: z.number().int(),
    difficulty: z.number().int(),
    expected_time_sec: z.number().int(),
    topic_ids: z.array(z.string()),
    passage_md: z.string().optional(),
    passage_origin: z.string().optional(),
    children: z.array(z.object({ ...partShape, alternatives: z.array(StudentPartSchema) })),
  })
  .meta({ id: 'StudentQuestion', description: 'A question without its answer, solution or marking scheme (DB-6). Check answers with POST /v1/practice/answers.' });

const DeckPartSummary = z.object({ part: z.number().int(), title: z.string(), slideCount: z.number().int(), hasAudio: z.boolean(), version: z.number().int(), reviewStatus: ReviewStatusSchema });

export const ChapterHubResponse = z
  .object({
    chapter: z.object({
      id: z.string(),
      number: z.number().int(),
      title: z.string(),
      titleEn: z.string().nullable(),
      unit: z.string().nullable(),
      boardAssessed: z.boolean(),
      schoolAssessment: SchoolAssessmentSchema.nullable(),
      topics: z.array(z.object({ id: z.string(), title: z.string(), titleEn: z.string().nullable(), boardAssessed: z.boolean(), schoolAssessment: SchoolAssessmentSchema.nullable() })),
    }),
    subject: z.object({ id: z.string(), name: z.string(), board: BoardSchema, exam: z.enum(['cbse', 'icse', 'isc']), classLevel: z.number().int(), language: z.string(), script: z.string() }),
    assets: z.object({
      lesson: z.object({ available: z.boolean(), parts: z.array(DeckPartSummary), slideCount: z.number().int() }),
      notes: z.object({ available: z.boolean(), sections: z.number().int(), reviewStatus: ReviewStatusSchema.nullable() }),
      flashcards: z.object({ available: z.boolean(), count: z.number().int(), reviewStatus: ReviewStatusSchema.nullable() }),
      practice: z.object({ available: z.boolean(), count: z.number().int(), byType: z.record(z.string(), z.number().int()), byDifficulty: z.record(z.string(), z.number().int()) }),
      tests: z.object({
        available: z.boolean(),
        count: z.number().int(),
        items: z.array(z.object({ id: z.string(), title: z.string(), kind: z.string(), durationMin: z.number().int(), totalMarks: z.number(), questionCount: z.number().int() })),
      }),
    }),
  })
  .meta({ id: 'ChapterHub', description: 'Public and cacheable; your own progress is GET /v1/me/progress/chapters/{id}.' });

const SlideSchema = z.object({
  id: z.string(),
  layout: z.enum(SLIDE_LAYOUTS),
  heading: z.string(),
  body_md: z.string(),
  bullets: z.array(z.string()),
  columns: z.tuple([z.string(), z.string()]).optional(),
  visual: VisualSchema.nullable(),
  math: z.array(z.string()),
  narration: z.string(),
  check_question_id: z.string().nullable(),
  audio: z.object({ key: z.string(), duration_ms: z.number().int() }).nullable(),
});

export const DeckResponse = z
  .object({
    chapterId: z.string(),
    part: z.number().int(),
    parts: z.array(DeckPartSummary),
    version: z.number().int(),
    reviewStatus: ReviewStatusSchema,
    title: z.string(),
    language: z.string(),
    goals: z.array(z.string()),
    slides: z.array(SlideSchema),
    checkQuestions: z.array(StudentQuestionSchema),
  })
  .meta({ id: 'LessonDeck' });

export const NotesResponse = z
  .object({
    chapterId: z.string(),
    version: z.number().int(),
    reviewStatus: ReviewStatusSchema,
    title: z.string(),
    language: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        body_md: z.string(),
        key_terms: z.array(z.object({ term: z.string(), definition_md: z.string() })),
        formulas: z.array(z.object({ latex: z.string(), label: z.string().optional() })),
        visual: VisualSchema.nullable(),
        visuals: z.array(VisualSchema),
        topic_ids: z.array(z.string()),
      }),
    ),
    exam_tips_md: z.string(),
  })
  .meta({ id: 'ChapterNotes' });

export const FlashcardsResponse = z
  .object({
    chapterId: z.string(),
    version: z.number().int(),
    reviewStatus: ReviewStatusSchema,
    language: z.string(),
    cards: z.array(z.object({ id: z.string(), front_md: z.string(), back_md: z.string(), tag: z.string(), topic_id: z.string().nullable() })),
  })
  .meta({ id: 'ChapterFlashcards' });

export const StreakSchema = z
  .object({ current: z.number().int(), longest: z.number().int(), lastActiveDay: z.string().nullable(), atRisk: z.boolean(), freezeAvailableThisWeek: z.boolean() })
  .meta({ id: 'Streak', description: 'IST calendar days; one missed day per week is covered automatically.' });
