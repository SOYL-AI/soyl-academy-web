/**
 * Assessment (ARCHITECTURE §6, §9; CONTEXT §10). Tests reference question *version* rows (D-023).
 * Attempt lifecycle: created → in_progress → submitted | auto_submitted. The server sets
 * `deadline_at`; client timestamps are advisory only (AC-12, F-007).
 */
import { sql } from 'drizzle-orm';
import { boolean, check, index, integer, jsonb, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { PaperType } from '@soyl/shared/content/blueprint';
import { TestKind } from '@soyl/shared/content/test';
import { id, marks, oneOf, ratio, timestamps, tstz } from './_shared';
import { EXAMS, subjects } from './catalog';
import { questions } from './content';
import { users } from './identity';
import { aiRequests } from './ai-credits';

export const PAPER_TYPES = PaperType.options;
export const TEST_KINDS = TestKind.options;
export const ATTEMPT_STATUSES = ['created', 'in_progress', 'submitted', 'auto_submitted'] as const;
export type AttemptStatus = (typeof ATTEMPT_STATUSES)[number];
export const ACTIVE_ATTEMPT_STATUSES = ['created', 'in_progress'] as const;
export const EVALUATION_MODES = ['auto', 'self', 'ai'] as const;

export const blueprints = pgTable(
  'blueprints',
  {
    id: id(),
    /** Blueprint.id from the YAML. */
    key: text('key').notNull(),
    academicYear: text('academic_year').notNull(),
    board: text('board').notNull(),
    exam: text('exam').notNull(),
    classLevel: smallint('class_level').notNull(),
    /** Null for a board/class default that applies to subjects without their own. */
    subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }),
    paperType: text('paper_type').notNull(),
    durationMin: integer('duration_min').notNull(),
    totalMarks: marks('total_marks').notNull(),
    sourceStatus: text('source_status').notNull(),
    /** Blueprint (platform/shared/content/blueprint.ts). */
    definition: jsonb('definition').notNull(),
    sourcePath: text('source_path').notNull(),
    contentHash: text('content_hash').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('blueprints_key_year_unique').on(t.key, t.academicYear),
    index('blueprints_subject_id_idx').on(t.subjectId, t.paperType),
    index('blueprints_scope_idx').on(t.academicYear, t.exam, t.classLevel, t.paperType),
    oneOf('blueprints_exam_check', t.exam, EXAMS),
    oneOf('blueprints_paper_type_check', t.paperType, PAPER_TYPES),
  ],
);

export const testSeries = pgTable(
  'test_series',
  {
    id: id(),
    key: text('key').notNull(),
    academicYear: text('academic_year').notNull(),
    subjectId: uuid('subject_id')
      .notNull()
      .references(() => subjects.id, { onDelete: 'restrict' }),
    title: text('title').notNull(),
    /** e.g. main, second_exam (CBSE Class 10 May track). */
    track: text('track').notNull().default('main'),
    description: text('description'),
    position: integer('position').notNull().default(0),
    status: text('status').notNull().default('draft'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('test_series_key_year_unique').on(t.key, t.academicYear),
    index('test_series_subject_id_idx').on(t.subjectId, t.status),
    oneOf('test_series_status_check', t.status, ['draft', 'published', 'retired']),
  ],
);

export const tests = pgTable(
  'tests',
  {
    id: id(),
    /** TestDefinition.id, e.g. t_cbse10sci_ch06_short. Custom tests get a generated key. */
    key: text('key').notNull(),
    version: integer('version').notNull().default(1),
    academicYear: text('academic_year').notNull(),
    kind: text('kind').notNull(),
    paperType: text('paper_type').notNull(),
    blueprintId: uuid('blueprint_id').references(() => blueprints.id, { onDelete: 'set null' }),
    seriesId: uuid('series_id').references(() => testSeries.id, { onDelete: 'set null' }),
    seriesPosition: integer('series_position'),
    subjectId: uuid('subject_id')
      .notNull()
      .references(() => subjects.id, { onDelete: 'restrict' }),
    chapterKeys: text('chapter_keys').array().notNull(),
    title: text('title').notNull(),
    durationMin: integer('duration_min').notNull(),
    totalMarks: marks('total_marks').notNull(),
    shuffle: boolean('shuffle').notNull().default(false),
    seed: text('seed'),
    status: text('status').notNull().default('draft'),
    /** TestDefinition (platform/shared/content/test.ts): question ids + versions only, no answers. */
    definition: jsonb('definition').notNull(),
    /** Custom tests (POST /v1/tests/custom): the student who built it. */
    createdByUserId: uuid('created_by_user_id').references(() => users.id, { onDelete: 'cascade' }),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('tests_key_version_unique').on(t.key, t.version),
    index('tests_subject_id_idx').on(t.subjectId, t.kind, t.status),
    index('tests_series_id_idx').on(t.seriesId, t.seriesPosition),
    index('tests_blueprint_id_idx').on(t.blueprintId),
    index('tests_created_by_user_id_idx').on(t.createdByUserId),
    oneOf('tests_kind_check', t.kind, TEST_KINDS),
    oneOf('tests_paper_type_check', t.paperType, PAPER_TYPES),
    oneOf('tests_status_check', t.status, ['draft', 'published', 'retired']),
    check('tests_duration_check', sql`${t.durationMin} > 0`),
  ],
);

export const testItems = pgTable(
  'test_items',
  {
    id: id(),
    testId: uuid('test_id')
      .notNull()
      .references(() => tests.id, { onDelete: 'cascade' }),
    /** The exact question version row (D-023). */
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'restrict' }),
    sectionId: text('section_id').notNull(),
    position: integer('position').notNull(),
    marks: marks('marks').notNull(),
    choiceGroup: text('choice_group'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('test_items_test_position_unique').on(t.testId, t.position),
    uniqueIndex('test_items_test_question_unique').on(t.testId, t.questionId),
    index('test_items_question_id_idx').on(t.questionId),
  ],
);

export const liveEvents = pgTable(
  'live_events',
  {
    id: id(),
    key: text('key').notNull(),
    academicYear: text('academic_year').notNull(),
    testId: uuid('test_id')
      .notNull()
      .references(() => tests.id, { onDelete: 'restrict' }),
    title: text('title').notNull(),
    registrationOpensAt: tstz('registration_opens_at').notNull(),
    startsAt: tstz('starts_at').notNull(),
    /** Late start allowed up to this many minutes after starts_at (AC-11). */
    lateStartMinutes: integer('late_start_minutes').notNull().default(15),
    endsAt: tstz('ends_at').notNull(),
    status: text('status').notNull().default('scheduled'),
    resultsPublishedAt: tstz('results_published_at'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('live_events_key_year_unique').on(t.key, t.academicYear),
    index('live_events_test_id_idx').on(t.testId),
    index('live_events_starts_at_idx').on(t.startsAt),
    oneOf('live_events_status_check', t.status, ['scheduled', 'open', 'closed', 'results_published', 'cancelled']),
    check('live_events_window_check', sql`${t.endsAt} > ${t.startsAt} AND ${t.startsAt} >= ${t.registrationOpensAt}`),
  ],
);

export const liveRegistrations = pgTable(
  'live_registrations',
  {
    id: id(),
    liveEventId: uuid('live_event_id')
      .notNull()
      .references(() => liveEvents.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    /** Final rank snapshot from Redis (ARCHITECTURE §9). */
    finalRank: integer('final_rank'),
    percentile: ratio('percentile'),
    score: marks('score'),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('live_registrations_event_user_unique').on(t.liveEventId, t.userId),
    index('live_registrations_user_id_idx').on(t.userId),
    index('live_registrations_rank_idx').on(t.liveEventId, t.finalRank),
  ],
);

export const attempts = pgTable(
  'attempts',
  {
    id: id(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    testId: uuid('test_id')
      .notNull()
      .references(() => tests.id, { onDelete: 'restrict' }),
    liveEventId: uuid('live_event_id').references(() => liveEvents.id, { onDelete: 'restrict' }),
    status: text('status').notNull().default('created'),
    startedAt: tstz('started_at'),
    deadlineAt: tstz('deadline_at'),
    submittedAt: tstz('submitted_at'),
    score: marks('score'),
    maxScore: marks('max_score'),
    sectionScores: jsonb('section_scores'),
    /** Recorded, not punished in beta (ARCHITECTURE §9). */
    tabSwitchCount: integer('tab_switch_count').notNull().default(0),
    /** Per-user question/option shuffle seed. */
    shuffleSeed: text('shuffle_seed'),
    ...timestamps(),
  },
  (t) => [
    // DB-2 / AC-12: one active attempt per (user, test) ...
    uniqueIndex('attempts_one_active_per_user_test')
      .on(t.userId, t.testId)
      .where(sql`${t.status} IN ('created', 'in_progress')`),
    // ... and one attempt per live event, ever (NULL live_event_id rows are not constrained).
    uniqueIndex('attempts_one_per_live_event').on(t.userId, t.liveEventId),
    // ARCHITECTURE §6 hot lookup
    index('attempts_user_created_idx').on(t.userId, t.createdAt),
    index('attempts_test_id_idx').on(t.testId),
    index('attempts_live_event_id_idx').on(t.liveEventId),
    // Auto-submit sweeper
    index('attempts_deadline_active_idx').on(t.deadlineAt).where(sql`${t.status} = 'in_progress'`),
    oneOf('attempts_status_check', t.status, ATTEMPT_STATUSES),
    check('attempts_started_check', sql`${t.status} = 'created' OR (${t.startedAt} IS NOT NULL AND ${t.deadlineAt} IS NOT NULL)`),
    check('attempts_deadline_check', sql`${t.deadlineAt} IS NULL OR ${t.deadlineAt} > ${t.startedAt}`),
    check(
      'attempts_submitted_check',
      sql`(${t.status} IN ('submitted', 'auto_submitted')) = (${t.submittedAt} IS NOT NULL)`,
    ),
  ],
);

export const responses = pgTable(
  'responses',
  {
    id: id(),
    attemptId: uuid('attempt_id')
      .notNull()
      .references(() => attempts.id, { onDelete: 'cascade' }),
    testItemId: uuid('test_item_id')
      .notNull()
      .references(() => testItems.id, { onDelete: 'restrict' }),
    answer: jsonb('answer'),
    markedForReview: boolean('marked_for_review').notNull().default(false),
    timeSpentSec: integer('time_spent_sec').notNull().default(0),
    /** Advisory client timestamp; acceptance is decided by server receipt time vs deadline_at (AC-12). */
    clientSavedAt: tstz('client_saved_at'),
    /** Server receipt time of the latest save. */
    autosavedAt: tstz('autosaved_at').notNull().defaultNow(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('responses_attempt_item_unique').on(t.attemptId, t.testItemId),
    index('responses_test_item_id_idx').on(t.testItemId),
    check('responses_time_spent_check', sql`${t.timeSpentSec} >= 0`),
  ],
);

export const evaluations = pgTable(
  'evaluations',
  {
    id: id(),
    responseId: uuid('response_id')
      .notNull()
      .references(() => responses.id, { onDelete: 'cascade' }),
    mode: text('mode').notNull(),
    status: text('status').notNull().default('done'),
    marks: marks('marks'),
    maxMarks: marks('max_marks').notNull(),
    /** Step marks with reasons: [{ step, awarded, max, reason }]. */
    feedback: jsonb('feedback').notNull().default(sql`'[]'::jsonb`),
    /** AI evaluation confidence 0..1; low confidence shows "AI-graded — check with your teacher". */
    confidence: ratio('confidence'),
    aiRequestId: uuid('ai_request_id').references(() => aiRequests.id, { onDelete: 'set null' }),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('evaluations_response_mode_unique').on(t.responseId, t.mode),
    index('evaluations_ai_request_id_idx').on(t.aiRequestId),
    oneOf('evaluations_mode_check', t.mode, EVALUATION_MODES),
    oneOf('evaluations_status_check', t.status, ['pending', 'done', 'failed']),
    check('evaluations_marks_check', sql`${t.marks} IS NULL OR (${t.marks} >= 0 AND ${t.marks} <= ${t.maxMarks})`),
  ],
);
