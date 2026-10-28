/**
 * Learning progress and staff second factor (backend-api M2, migration 0005).
 *
 * - `lesson_progress`: where a student is in a chapter's deck (one row per user, chapter and deck
 *   part), whether they read or listened, and when they first finished it. Upserted by
 *   PUT /v1/me/lesson-progress and by guest merge (`source = 'guest_merge'`).
 * - `practice_answers`: every practice answer a signed-in student submits (POST /v1/practice/answers),
 *   graded on the server, plus guest answers merged on first sign-in (`source = 'guest_merge'`, at
 *   most one per user and question, which makes merging idempotent). Guests' own answers are never
 *   stored server-side (CONTEXT §5: progress kept on the device).
 * - `user_mfa`: AUTH-11 TOTP for reviewer/admin accounts. The secret is AES-256-GCM encrypted with a
 *   key that is not in the database (MFA_ENCRYPTION_KEY, Key Vault); recovery codes are stored as
 *   HMACs only. `sessions.mfa_verified_at` (identity.ts) records that a session passed the factor.
 */
import { sql } from 'drizzle-orm';
import { bigint, boolean, check, index, integer, jsonb, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, marks, oneOf, timestamps, tstz } from './_shared';
import { chapters } from './catalog';
import { questions } from './content';
import { users } from './identity';

export const PROGRESS_SOURCES = ['app', 'guest_merge'] as const;
export type ProgressSource = (typeof PROGRESS_SOURCES)[number];
export const LESSON_MODES = ['read', 'listen'] as const;
export type LessonMode = (typeof LESSON_MODES)[number];
/** How a practice answer was marked: auto (objective, server-graded), self (student's own mark against the scheme), none (not marked yet). */
export const PRACTICE_GRADINGS = ['auto', 'self', 'none'] as const;
export type PracticeGrading = (typeof PRACTICE_GRADINGS)[number];

export const lessonProgress = pgTable(
  'lesson_progress',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'cascade' }),
    /** Chapter key (e.g. cbse-10-science-ch01), denormalised for progress reads. */
    unit: text('unit').notNull(),
    /** Deck part (1-based); 0 when the chapter is a single deck (decks.part IS NULL). */
    part: smallint('part').notNull().default(0),
    /** Last slide viewed, 0-based. */
    slidePosition: smallint('slide_position').notNull().default(0),
    mode: text('mode').notNull().default('read'),
    /** First time the student reached the end of this deck part; never cleared. */
    completedAt: tstz('completed_at'),
    source: text('source').notNull().default('app'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('lesson_progress_user_chapter_part_unique').on(t.userId, t.chapterId, t.part),
    index('lesson_progress_chapter_id_idx').on(t.chapterId),
    // 0014 (D-045 admin analytics): platform-wide range reads by IST day (opened, completed, last active).
    index('lesson_progress_created_at_idx').on(t.createdAt),
    index('lesson_progress_completed_at_idx').on(t.completedAt),
    index('lesson_progress_updated_at_idx').on(t.updatedAt),
    oneOf('lesson_progress_mode_check', t.mode, LESSON_MODES),
    oneOf('lesson_progress_source_check', t.source, PROGRESS_SOURCES),
    check('lesson_progress_part_check', sql`${t.part} BETWEEN 0 AND 20`),
    check('lesson_progress_slide_check', sql`${t.slidePosition} BETWEEN 0 AND 1000`),
  ],
);

export const practiceAnswers = pgTable(
  'practice_answers',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    /** The exact question version answered (D-023: versions never change). */
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    questionKey: text('question_key').notNull(),
    questionVersion: integer('question_version').notNull(),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'cascade' }),
    /** The student's response (validated shape, see api PracticeResponse); null for merged guest answers (only the outcome is known). */
    response: jsonb('response'),
    /** Null when the item is not auto-gradable and has not been self-marked. */
    correct: boolean('correct'),
    marksAwarded: marks('marks_awarded'),
    maxMarks: marks('max_marks').notNull(),
    grading: text('grading').notNull().default('auto'),
    answeredAt: tstz('answered_at').notNull(),
    source: text('source').notNull().default('app'),
    ...timestamps(),
  },
  (t) => [
    index('practice_answers_user_chapter_idx').on(t.userId, t.chapterId, t.answeredAt),
    index('practice_answers_question_id_idx').on(t.questionId),
    index('practice_answers_chapter_id_idx').on(t.chapterId),
    // 0014 (D-045 admin analytics): platform-wide range reads by answer time.
    index('practice_answers_answered_at_idx').on(t.answeredAt),
    // Guest merge is idempotent: at most one merged answer per user and question.
    uniqueIndex('practice_answers_guest_merge_unique').on(t.userId, t.questionKey).where(sql`${t.source} = 'guest_merge'`),
    oneOf('practice_answers_source_check', t.source, PROGRESS_SOURCES),
    oneOf('practice_answers_grading_check', t.grading, PRACTICE_GRADINGS),
    check('practice_answers_marks_check', sql`${t.marksAwarded} IS NULL OR (${t.marksAwarded} >= 0 AND ${t.marksAwarded} <= ${t.maxMarks})`),
  ],
);

export const userMfa = pgTable(
  'user_mfa',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .unique('user_mfa_user_id_unique')
      .references(() => users.id, { onDelete: 'cascade' }),
    /** `v1:<iv>:<ciphertext>:<tag>` (base64url), AES-256-GCM, AAD = user id. Key: MFA_ENCRYPTION_KEY. */
    totpSecretEnc: text('totp_secret_enc').notNull(),
    /** Null until the first code is verified (enrolment confirmed). */
    confirmedAt: tstz('confirmed_at'),
    /** HMAC-SHA256 of each unused recovery code; a used code is removed. */
    recoveryCodeHashes: text('recovery_code_hashes').array().notNull().default(sql`'{}'::text[]`),
    /** Last accepted TOTP time step: a code is never accepted twice (replay). */
    lastUsedStep: bigint('last_used_step', { mode: 'number' }),
    ...timestamps(),
  },
);
