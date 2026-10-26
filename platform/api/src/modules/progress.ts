/**
 * The signed-in student's progress (ARCHITECTURE §4.1 gamification, §12). Member-only, scoped to the
 * caller (API-7), never cached (no-store).
 *
 *   GET /v1/me/progress                    totals (XP, level, streak, accuracy) + chapters by subject
 *   GET /v1/me/progress/chapters/:id       one chapter: per-part lesson positions, practice detail
 *   PUT /v1/me/lesson-progress             save position / completion (idempotent)
 *   GET /v1/me/badges                      badge catalogue with what you have earned
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { ChapterId } from '@soyl/shared/content/ids';
import { policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { loadChapter } from '../domain/content';
import { badgesFor } from '../domain/gamification';
import { chapterProgress, progressSummary, saveLessonProgress } from '../domain/progress';
import { ChapterParams, StreakSchema } from './content-schemas';

const Mode = z.enum(['read', 'listen']);
const PracticeStats = z.object({ attempts: z.number().int(), questionsAnswered: z.number().int(), questionsCorrect: z.number().int(), accuracy: z.number().nullable() });

const ProgressResponse = z
  .object({
    totals: z.object({
      xp: z.number().int(),
      level: z.number().int(),
      levelStartXp: z.number().int(),
      nextLevelXp: z.number().int(),
      streak: StreakSchema,
      lessonsCompleted: z.number().int(),
      practiceAttempts: z.number().int(),
      /** Share of auto-checked answers that were right (null before any). */
      practiceAccuracy: z.number().nullable(),
    }),
    subjects: z.array(
      z.object({
        subjectId: z.string(),
        name: z.string(),
        chapters: z.array(
          z.object({
            chapterId: z.string(),
            number: z.number().int(),
            title: z.string(),
            lessons: z.object({
              partsStarted: z.number().int(),
              partsCompleted: z.number().int(),
              lastPart: z.number().int().nullable(),
              lastSlide: z.number().int().nullable(),
              lastMode: Mode.nullable(),
              updatedAt: z.iso.datetime().nullable(),
            }),
            practice: PracticeStats.extend({ lastAnsweredAt: z.iso.datetime().nullable() }),
          }),
        ),
      }),
    ),
  })
  .meta({ id: 'MyProgress' });

const ChapterProgressResponse = z
  .object({
    chapterId: z.string(),
    lessons: z.array(z.object({ part: z.number().int(), slideCount: z.number().int(), slide: z.number().int().nullable(), mode: Mode.nullable(), completedAt: z.iso.datetime().nullable(), updatedAt: z.iso.datetime().nullable() })),
    practice: PracticeStats.extend({ answeredQuestionIds: z.array(z.string()), correctQuestionIds: z.array(z.string()) }),
  })
  .meta({ id: 'MyChapterProgress' });

const LessonProgressBody = z
  .strictObject({
    chapterId: ChapterId,
    /** 1-based deck part, or 0 for a single-deck chapter; omitted = the first part. */
    part: z.number().int().min(0).max(20).optional(),
    /** 0-based slide index. */
    slide: z.number().int().min(0).max(1000),
    mode: Mode.default('read'),
    /** Optional; reaching the last slide completes the part anyway. Only valid on the last slide. */
    completed: z.boolean().optional(),
  })
  .meta({ id: 'LessonProgressRequest' });

const LessonProgressResponse = z
  .object({
    chapterId: z.string(),
    part: z.number().int(),
    slide: z.number().int(),
    slideCount: z.number().int(),
    mode: Mode,
    completedAt: z.iso.datetime().nullable(),
    updatedAt: z.iso.datetime(),
    xpAwarded: z.number().int(),
    badgesAwarded: z.array(z.string()),
    streak: StreakSchema.nullable(),
  })
  .meta({ id: 'LessonProgress' });

const BadgesResponse = z
  .object({ badges: z.array(z.object({ key: z.string(), name: z.string(), description: z.string(), icon: z.string(), awarded: z.boolean(), awardedAt: z.iso.datetime().nullable() })) })
  .meta({ id: 'MyBadges' });

export function registerProgressRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config, clock } = deps;
  const year = config.academicYear;

  app.get('/v1/me/progress', {
    config: { policy: policies.member() },
    schema: { tags: ['progress'], summary: 'Your XP, level, streak and per-chapter lesson and practice progress', response: withProblems({ 200: ProgressResponse }) },
    handler: async (request) => progressSummary(db, clock, request.auth!.user.id),
  });

  app.get('/v1/me/progress/chapters/:id', {
    config: { policy: policies.member() },
    schema: { tags: ['progress'], summary: 'Your progress in one chapter (the private half of the chapter hub)', params: ChapterParams, response: withProblems({ 200: ChapterProgressResponse }) },
    handler: async (request) => chapterProgress(db, year, request.auth!.user.id, await loadChapter(db, request.params.id, year)),
  });

  app.put('/v1/me/lesson-progress', {
    config: { policy: policies.member({ rateLimit: { buckets: ['progress.write.user'] } }) },
    schema: { tags: ['progress'], summary: 'Save your lesson position or completion (idempotent)', body: LessonProgressBody, response: withProblems({ 200: LessonProgressResponse }) },
    handler: async (request) => {
      const b = request.body;
      const chapter = await loadChapter(db, b.chapterId, year);
      return saveLessonProgress(db, clock, year, request.auth!.user.id, chapter, { part: b.part, slide: b.slide, mode: b.mode, completed: b.completed });
    },
  });

  app.get('/v1/me/badges', {
    config: { policy: policies.member() },
    schema: { tags: ['progress'], summary: 'Badges you can earn and the ones you have', response: withProblems({ 200: BadgesResponse }) },
    handler: async (request) => ({ badges: await badgesFor(db, request.auth!.user.id) }),
  });
}
