/**
 * Guest progress contract: what the browser keeps in localStorage under `soyl_guest_v1` and posts to
 * POST /v1/me/merge-guest after the first sign-in (ARCHITECTURE §3.2, CONTEXT §5).
 *
 * Dependency-free apart from `zod/v4` and relative imports of platform/shared, so the Next.js platform
 * pages can import it directly (`@/platform/api/src/contract/guest`, ADR-001 / D-006) as well as use
 * the OpenAPI-generated type. WEB-5: ids, flags and timestamps only — no names, phones, emails or
 * free text.
 */
import { z } from 'zod/v4';
import { ChapterId } from '../../../shared/content/ids';

export const GUEST_STORAGE_KEY = 'soyl_guest_v1';
export const GUEST_LIMITS = { maxLessons: 500, maxPracticeAnswers: 3000 } as const;

export const GuestLesson = z
  .strictObject({
    /** Chapter (unit) id, e.g. cbse-10-science-ch06. */
    chapter: ChapterId,
    /** Index of the last slide viewed (0-based). */
    slide: z.number().int().min(0).max(1000),
    completed: z.boolean(),
    updatedAt: z.iso.datetime(),
  })
  .meta({ id: 'GuestLesson' });

export const GuestPracticeAnswer = z
  .strictObject({
    chapter: ChapterId,
    /** Question contract id (stable across versions), e.g. q_cbse10sci_ch06_0001. */
    question: z.string().max(120).regex(/^q_[a-z0-9_-]+$/),
    correct: z.boolean(),
    answeredAt: z.iso.datetime(),
  })
  .meta({ id: 'GuestPracticeAnswer' });

export const GuestProgress = z
  .strictObject({
    v: z.literal(1),
    board: z.enum(['cbse', 'cisce']).optional(),
    classLevel: z.number().int().min(7).max(12).optional(),
    lessons: z.array(GuestLesson).max(GUEST_LIMITS.maxLessons).default([]),
    practice: z.array(GuestPracticeAnswer).max(GUEST_LIMITS.maxPracticeAnswers).default([]),
  })
  .meta({ id: 'GuestProgress', description: 'localStorage soyl_guest_v1, posted once to /v1/me/merge-guest.' });

export type GuestProgress = z.infer<typeof GuestProgress>;

export const MergeGuestResponse = z
  .object({
    /** True when this call merged; false when the account had already merged (idempotent replay). */
    merged: z.boolean(),
    alreadyMerged: z.boolean(),
    mergedAt: z.iso.datetime(),
    lessonsCompleted: z.number().int(),
    practiceCorrect: z.number().int(),
    xpAwarded: z.number().int(),
    ignored: z.object({
      unknownChapters: z.number().int(),
      unknownQuestions: z.number().int(),
      /** Lesson positions without completion; stored once lesson_progress exists (handoff: schema request). */
      positionsNotStored: z.number().int(),
    }),
    /** Board/class applied to the profile (only when the profile had none). */
    profileUpdated: z.boolean(),
  })
  .meta({ id: 'MergeGuestResponse' });
export type MergeGuestResponse = z.infer<typeof MergeGuestResponse>;
