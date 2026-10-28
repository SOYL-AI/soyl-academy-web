/**
 * Practice (ARCHITECTURE §4.1, CONTEXT §5, F-006).
 *
 *   GET   /v1/chapters/:id/practice?cursor=&type=&difficulty=&limit=   question stems (no answers), paged;
 *                                                                       signed in: unanswered first
 *   POST  /v1/practice/answers                                          check an answer on the server; the
 *                                                                       answer, solution and marking scheme
 *                                                                       come back only now. Guests: checked,
 *                                                                       not stored. Signed in: stored.
 *   PATCH /v1/practice/answers/:id                                      self-assessed marks for written parts
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { QUESTION_TYPES, type QuestionType } from '@soyl/shared/content/question';
import { DIFFICULTY_BANDS, type DifficultyBand } from '@soyl/shared/config/learning';
import { difficultiesIn } from '@soyl/shared/learning/mastery';
import { EVERYONE, policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { cachedContent } from '../http/cache';
import { loadChapter } from '../domain/content';
import { listPractice, selfAssess, submitAnswer } from '../domain/practice';
import { CreditBonusAwardSchema } from '../ai/schemas';
import { ChapterParams, StreakSchema, StudentQuestionSchema } from './content-schemas';
import { coinAwardFields } from './coins-schemas';
import { DifficultyBandSchema, PRACTICE_STATUSES, PracticeStatusSchema, PracticeSummarySchema } from './insights-schemas';

const Id = z.string().min(1).max(64).regex(/^[A-Za-z0-9_-]+$/);
const OptionIds = z.array(Id).min(1).max(20);

const PartResponse = z
  .union([
    z.strictObject({ option_ids: OptionIds }),
    z.strictObject({ value: z.number().finite() }),
    z.strictObject({ blanks: z.array(z.string().max(200)).min(1).max(20) }),
    z.strictObject({ pairs: z.array(z.strictObject({ left_id: Id, right_id: Id })).min(1).max(30) }),
    z.strictObject({ order: z.array(Id).min(2).max(30) }),
    z.strictObject({ output: z.string().max(4000) }),
    /** Written types: the student's own answer (may be empty: "show me the model answer"). */
    z.strictObject({ text: z.string().max(6000) }),
  ])
  .meta({
    id: 'PracticePartResponse',
    description:
      'mcq/assertion-reason/true-false/multi-select → option_ids; numerical → value; fill-blank → blanks (in stem order); match → pairs; ordering → order (all ids); code-output → output; short/long/writing/map → text.',
  });

export const PracticeResponseSchema = z
  .union([
    PartResponse,
    z.strictObject({
      parts: z
        .array(z.strictObject({ id: Id, alternative: Id.optional(), response: PartResponse }))
        .min(1)
        .max(20),
    }),
  ])
  .meta({ id: 'PracticeResponse', description: 'case-based/source-based → parts (one per child; `alternative` picks an internal-choice alternative).' });

const AnswerBody = z
  .strictObject({
    /** Question contract id (stable across versions). */
    questionId: z.string().max(120).regex(/^q_[a-z0-9_-]+$/),
    /** The version you were shown; omitted = current. */
    version: z.number().int().positive().optional(),
    response: PracticeResponseSchema,
  })
  .meta({ id: 'PracticeAnswerRequest' });

export const KeyRevealSchema = z
  .object({
    answer: z.unknown(),
    solution_md: z.string(),
    marking_scheme: z.array(z.object({ step: z.string(), marks: z.number() })),
    rubric: z.array(z.object({ criterion: z.string(), marks: z.number(), descriptor_md: z.string().optional() })).optional(),
  })
  .meta({ id: 'AnswerKey', description: 'Revealed only after answering (F-006). `answer` has the content contract Answer shape.' });

const FeedbackSchema = z.object({ blanksCorrect: z.array(z.boolean()).optional(), pairsCorrect: z.number().int().optional(), positionsCorrect: z.number().int().optional() });
const gradeShape = {
  correct: z.boolean().nullable(),
  marksAwarded: z.number().nullable(),
  maxMarks: z.number(),
  grading: z.enum(['auto', 'self']),
  feedback: FeedbackSchema.optional(),
};

const AnswerResult = z
  .object({
    questionId: z.string(),
    version: z.number().int(),
    type: z.enum(QUESTION_TYPES),
    ...gradeShape,
    key: KeyRevealSchema,
    parts: z.array(z.object({ id: z.string(), alternative: z.string().nullable(), type: z.enum(QUESTION_TYPES), ...gradeShape, key: KeyRevealSchema })),
    /** Written parts: compare with the model answer and marking scheme, then PATCH your marks (signed in). */
    selfAssessmentPending: z.boolean(),
    selfMaxMarks: z.number(),
    /** Guests: false (progress stays on the device). */
    stored: z.boolean(),
    answerId: z.uuid().nullable(),
    xpAwarded: z.number().int(),
    badgesAwarded: z.array(z.string()),
    streak: StreakSchema.nullable(),
    ...coinAwardFields,
    /** D-044 bonus AI credits this answer earned (daily practice goal met, 7-day streak milestone); [] for guests and without consent. */
    creditBonuses: z.array(CreditBonusAwardSchema),
  })
  .meta({ id: 'PracticeAnswerResult' });

const csvEnum = <T extends string>(values: readonly T[]) =>
  z
    .string()
    .max(300)
    .transform((s, ctx) => {
      const parts = s.split(',').map((x) => x.trim()).filter(Boolean);
      for (const p of parts) if (!values.includes(p as T)) ctx.addIssue({ code: 'custom', message: `unknown value ${p.slice(0, 40)}` });
      return parts as T[];
    });

const PracticeQuery = z.strictObject({
  cursor: z.string().max(400).optional(),
  /** Comma-separated question types. */
  type: csvEnum(QUESTION_TYPES).optional(),
  /** Comma-separated difficulties 1–5 and/or bands easy, medium, hard. */
  difficulty: csvEnum(['1', '2', '3', '4', '5', ...DIFFICULTY_BANDS] as const).optional(),
  /** Comma-separated statuses new, attempted, solved (signed in; for guests every question is new). */
  status: csvEnum(PRACTICE_STATUSES).optional(),
  limit: z.coerce.number().int().min(1).max(25).default(10),
});

const PracticeListResponse = z
  .object({
    chapterId: z.string(),
    total: z.number().int(),
    items: z.array(
      z.object({
        question: StudentQuestionSchema,
        answered: z.boolean().nullable(),
        lastCorrect: z.boolean().nullable(),
        difficulty: DifficultyBandSchema,
        /** Signed in only (null for guests). */
        status: PracticeStatusSchema.nullable(),
      }),
    ),
    nextCursor: z.string().nullable(),
    summary: PracticeSummarySchema,
  })
  .meta({ id: 'PracticePage' });

const SelfAssessResult = z
  .object({
    answerId: z.uuid(),
    marksAwarded: z.number(),
    maxMarks: z.number(),
    grading: z.literal('self'),
    /** D-044: full self-marks solve the question (D-042) and may complete today's practice goal. */
    creditBonuses: z.array(CreditBonusAwardSchema),
  })
  .meta({ id: 'PracticeSelfAssessment' });

export function registerPracticeRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config, clock } = deps;
  const year = config.academicYear;

  app.get('/v1/chapters/:id/practice', {
    config: { policy: policies.publicRead() },
    schema: {
      tags: ['practice'],
      summary: 'Practice questions of a chapter (stems and options only), paged, with difficulty bands, your status per question and whole-chapter counts. Signed in: questions you have not answered come first.',
      params: ChapterParams,
      querystring: PracticeQuery,
      response: withProblems({ 200: PracticeListResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.params.id, year);
      const userId = request.auth?.user.id ?? null;
      const page = await listPractice(db, chapter, year, userId, {
        cursor: request.query.cursor,
        types: request.query.type as QuestionType[] | undefined,
        difficulties: request.query.difficulty && [...new Set(request.query.difficulty.flatMap((d) => (DIFFICULTY_BANDS as readonly string[]).includes(d) ? difficultiesIn(d as DifficultyBand) : [Number(d)]))],
        statuses: request.query.status,
        limit: request.query.limit,
      });
      // Guests: the same page for everyone, so cacheable. Signed in: personal (answered flags) → no-store.
      return userId ? page : cachedContent(request, reply, page);
    },
  });

  app.post('/v1/practice/answers', {
    config: { policy: { roles: EVERYONE, csrf: true, rateLimit: { buckets: ['practice.answer.ip', 'practice.answer.user'] }, consent: false } },
    schema: {
      tags: ['practice'],
      summary: 'Check a practice answer on the server. Returns correctness, the answer, solution and marking scheme. Guests are checked but not stored.',
      body: AnswerBody,
      response: withProblems({ 200: AnswerResult }),
    },
    handler: async (request) => submitAnswer(db, clock, year, request.auth?.user.id ?? null, request.body),
  });

  app.patch('/v1/practice/answers/:id', {
    config: { policy: policies.member({ rateLimit: { buckets: ['practice.answer.user'] } }) },
    schema: {
      tags: ['practice'],
      summary: 'Self-assess the written parts of one of your practice answers against the marking scheme',
      params: z.strictObject({ id: z.uuid() }),
      body: z.strictObject({ marks: z.number().min(0).max(100).multipleOf(0.5) }).meta({ id: 'PracticeSelfAssessRequest' }),
      response: withProblems({ 200: SelfAssessResult }),
    },
    handler: async (request) => selfAssess(db, clock, request.auth!.user.id, request.params.id, request.body.marks),
  });
}
