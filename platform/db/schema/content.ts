/**
 * Content (ARCHITECTURE §6, §7.2–7.4). Each row stores the shared-contract JSON
 * (platform/shared/content/*.ts) in `body` plus indexed columns for lookups.
 *
 * Versioning (§7.3): every edit is a new row with `version + 1`; rows are never edited in place except
 * for status transitions. `is_current` marks the latest version of each item (partial unique index).
 * Tests reference question version rows, so past attempts never change (D-023).
 *
 * DB-6 / F-006: answers, solutions and marking schemes are NOT in `questions`. They live in
 * `question_keys`, which student-facing reads never join. `questions.body` holds the student-safe
 * projection (see src/student-questions.ts `splitQuestion`). `pool` keeps test and live-mock items out
 * of practice; `live_reserved` items are embargoed until `embargo_until`.
 */
import { sql } from 'drizzle-orm';
import { boolean, check, index, integer, jsonb, pgTable, smallint, text, uniqueIndex, uuid, vector } from 'drizzle-orm/pg-core';
import { ContentStatus } from '@soyl/shared/content/common';
import { QUESTION_TYPES, Bloom, Competency } from '@soyl/shared/content/question';
import { id, marks, oneOf, ratio, timestamps, tstz } from './_shared';
import { chapters } from './catalog';
import { users } from './identity';

export const CONTENT_STATUSES = ContentStatus.options;
export const STUDENT_VISIBLE = ['published', 'reviewed'] as const;
export const QUESTION_POOLS = ['practice', 'test', 'live_reserved'] as const;
export type QuestionPool = (typeof QUESTION_POOLS)[number];
export const ORIGINS = ['pipeline', 'exemplar', 'human'] as const;

/** Embedding size for `content_chunks.embedding`. Changing it needs a migration (ADR-004). */
export const EMBEDDING_DIMENSIONS = 1536;

/** Columns shared by every versioned content table. */
const contentColumns = () => ({
  id: id(),
  /** Chapter key, e.g. cbse-10-science-ch06. */
  unit: text('unit').notNull(),
  chapterId: uuid('chapter_id')
    .notNull()
    .references(() => chapters.id, { onDelete: 'restrict' }),
  academicYear: text('academic_year').notNull(),
  version: integer('version').notNull(),
  status: text('status').notNull().default('draft'),
  isCurrent: boolean('is_current').notNull().default(true),
  language: text('language').notNull().default('en'),
  origin: text('origin').notNull().default('pipeline'),
  templateVersion: text('template_version'),
  model: text('model'),
  contentHash: text('content_hash'),
  releaseId: uuid('release_id').references(() => contentReleases.id, { onDelete: 'set null' }),
  publishedAt: tstz('published_at'),
  ...timestamps(),
});

type ContentCols = ReturnType<typeof contentColumns>;
function contentChecks(table: string, t: { [K in keyof ContentCols]: any }) {
  return [
    index(`${table}_chapter_id_idx`).on(t.chapterId, t.status),
    index(`${table}_release_id_idx`).on(t.releaseId),
    oneOf(`${table}_status_check`, t.status, CONTENT_STATUSES),
    oneOf(`${table}_origin_check`, t.origin, ORIGINS),
    check(`${table}_version_check`, sql`${t.version} > 0`),
  ];
}

/** Immutable bundle per unit@version, JSON in Blob at content/releases/{unit}/{version}.json (§7.4). */
export const contentReleases = pgTable(
  'content_releases',
  {
    id: id(),
    unit: text('unit').notNull(),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'restrict' }),
    academicYear: text('academic_year').notNull(),
    version: integer('version').notNull(),
    blobKey: text('blob_key').notNull(),
    sha256: text('sha256').notNull(),
    /** ingested → active; rollback re-activates an older release and marks the newer one rolled_back. */
    status: text('status').notNull().default('ingested'),
    activatedAt: tstz('activated_at'),
    buildRunId: text('build_run_id'),
    checks: jsonb('checks').notNull().default(sql`'{}'::jsonb`),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('content_releases_unit_version_unique').on(t.unit, t.academicYear, t.version),
    uniqueIndex('content_releases_one_active').on(t.unit, t.academicYear).where(sql`${t.status} = 'active'`),
    index('content_releases_chapter_id_idx').on(t.chapterId),
    oneOf('content_releases_status_check', t.status, ['ingested', 'active', 'superseded', 'rolled_back']),
  ],
);

export const decks = pgTable(
  'decks',
  {
    ...contentColumns(),
    /** Long chapters split into parts (1-based); null when the chapter is one deck. */
    part: smallint('part'),
    title: text('title').notNull(),
    slideCount: smallint('slide_count').notNull(),
    /** Deck (platform/shared/content/deck.ts). */
    body: jsonb('body').notNull(),
  },
  (t) => [
    ...contentChecks('decks', t),
    // part NULL (single deck) is treated as 0 so a unit cannot get two whole-chapter decks of one version.
    uniqueIndex('decks_unit_part_version_unique').on(t.unit, t.academicYear, sql`coalesce(${t.part}, 0)`, t.version),
    uniqueIndex('decks_current_unique').on(t.unit, t.academicYear, sql`coalesce(${t.part}, 0)`).where(sql`${t.isCurrent}`),
  ],
);

export const notes = pgTable(
  'notes',
  {
    ...contentColumns(),
    title: text('title').notNull(),
    /** Notes (platform/shared/content/study.ts). */
    body: jsonb('body').notNull(),
  },
  (t) => [
    ...contentChecks('notes', t),
    uniqueIndex('notes_unit_version_unique').on(t.unit, t.academicYear, t.version),
    uniqueIndex('notes_current_unique').on(t.unit, t.academicYear).where(sql`${t.isCurrent}`),
  ],
);

export const flashcardSets = pgTable(
  'flashcard_sets',
  {
    ...contentColumns(),
    cardCount: smallint('card_count').notNull(),
    /** FlashcardSet (platform/shared/content/study.ts). */
    body: jsonb('body').notNull(),
  },
  (t) => [
    ...contentChecks('flashcard_sets', t),
    uniqueIndex('flashcard_sets_unit_version_unique').on(t.unit, t.academicYear, t.version),
    uniqueIndex('flashcard_sets_current_unique').on(t.unit, t.academicYear).where(sql`${t.isCurrent}`),
  ],
);

export const questions = pgTable(
  'questions',
  {
    ...contentColumns(),
    /** Contract id, e.g. q_cbse10sci_ch06_0001. Stable across versions. */
    key: text('key').notNull(),
    type: text('type').notNull(),
    pool: text('pool').notNull().default('practice'),
    /** live_reserved items are not served before this instant (AC-11). */
    embargoUntil: tstz('embargo_until'),
    difficulty: smallint('difficulty').notNull(),
    competency: text('competency').notNull(),
    bloom: text('bloom').notNull(),
    marks: marks('marks').notNull(),
    expectedTimeSec: integer('expected_time_sec').notNull(),
    topicKeys: text('topic_keys').array().notNull().default(sql`'{}'::text[]`),
    /** Student-safe projection: stem, passage, options, match_right, assets, children without answers. */
    body: jsonb('body').notNull(),
  },
  (t) => [
    ...contentChecks('questions', t),
    uniqueIndex('questions_key_version_unique').on(t.key, t.version),
    uniqueIndex('questions_current_unique').on(t.key).where(sql`${t.isCurrent}`),
    // ARCHITECTURE §6 hot lookup
    index('questions_chapter_status_difficulty_idx').on(t.chapterId, t.status, t.difficulty),
    index('questions_chapter_pool_idx').on(t.chapterId, t.pool, t.status),
    index('questions_topic_keys_idx').using('gin', t.topicKeys),
    oneOf('questions_type_check', t.type, QUESTION_TYPES),
    oneOf('questions_pool_check', t.pool, QUESTION_POOLS),
    oneOf('questions_competency_check', t.competency, Competency.options),
    oneOf('questions_bloom_check', t.bloom, Bloom.options),
    check('questions_difficulty_check', sql`${t.difficulty} BETWEEN 1 AND 5`),
    check('questions_marks_check', sql`${t.marks} > 0`),
    check('questions_live_embargo', sql`${t.pool} <> 'live_reserved' OR ${t.embargoUntil} IS NOT NULL`),
  ],
);

/** DB-6: answer keys, one row per question version. Never joined by student-facing reads. */
export const questionKeys = pgTable('question_keys', {
  id: id(),
  questionId: uuid('question_id')
    .notNull()
    .unique('question_keys_question_id_unique')
    .references(() => questions.id, { onDelete: 'cascade' }),
  answer: jsonb('answer').notNull(),
  solutionMd: text('solution_md').notNull(),
  markingScheme: jsonb('marking_scheme').notNull(),
  /** Case/source-based: [{ id, answer, solution_md, marking_scheme }] for each child. */
  childKeys: jsonb('child_keys').notNull().default(sql`'[]'::jsonb`),
  ...timestamps(),
});

export const questionStats = pgTable(
  'question_stats',
  {
    id: id(),
    questionId: uuid('question_id')
      .notNull()
      .unique('question_stats_question_id_unique')
      .references(() => questions.id, { onDelete: 'cascade' }),
    attempts: integer('attempts').notNull().default(0),
    correct: integer('correct').notNull().default(0),
    avgTimeSec: integer('avg_time_sec'),
    /** Point-biserial discrimination index, -1..1, once there are enough attempts. */
    discrimination: ratio('discrimination'),
    computedAt: tstz('computed_at'),
    ...timestamps(),
  },
  (t) => [check('question_stats_counts_check', sql`${t.correct} >= 0 AND ${t.correct} <= ${t.attempts}`)],
);

export const assets = pgTable(
  'assets',
  {
    id: id(),
    kind: text('kind').notNull(),
    blobKey: text('blob_key').notNull().unique('assets_blob_key_unique'),
    contentType: text('content_type').notNull(),
    bytes: integer('bytes'),
    sha256: text('sha256'),
    /** Alt text for diagrams (WCAG, ARCHITECTURE §3.2). */
    alt: text('alt'),
    unit: text('unit'),
    chapterId: uuid('chapter_id').references(() => chapters.id, { onDelete: 'set null' }),
    academicYear: text('academic_year'),
    ...timestamps(),
  },
  (t) => [
    index('assets_chapter_id_idx').on(t.chapterId),
    oneOf('assets_kind_check', t.kind, ['svg', 'plot', 'geometry', 'chem', 'table', 'flow', 'image', 'audio', 'pdf']),
  ],
);

export const CONTENT_TYPES = ['deck', 'notes', 'flashcard_set', 'question', 'test'] as const;

/** Lifecycle history: draft → auto_verified → published → reviewed (→ flagged → fixed → published). */
export const contentStatusEvents = pgTable(
  'content_status_events',
  {
    id: id(),
    contentType: text('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    fromStatus: text('from_status'),
    toStatus: text('to_status').notNull(),
    actorUserId: uuid('actor_user_id').references(() => users.id, { onDelete: 'set null' }),
    runId: text('run_id'),
    reason: text('reason'),
    ...timestamps(),
  },
  (t) => [
    index('content_status_events_content_idx').on(t.contentType, t.contentId, t.createdAt),
    index('content_status_events_actor_user_id_idx').on(t.actorUserId),
    oneOf('content_status_events_type_check', t.contentType, CONTENT_TYPES),
    oneOf('content_status_events_to_check', t.toStatus, CONTENT_STATUSES),
  ],
);

/**
 * Retrieval chunks for the AI tutor (ARCHITECTURE §10). `embedding` exists only where pgvector is
 * available (Azure, CI). Migration 0002 adds it conditionally; on embedded Postgres it is absent, so
 * select explicit columns (`contentChunkColumns`) rather than the whole row there. ADR-004.
 */
export const contentChunks = pgTable(
  'content_chunks',
  {
    id: id(),
    contentType: text('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    unit: text('unit').notNull(),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'cascade' }),
    academicYear: text('academic_year').notNull(),
    exam: text('exam').notNull(),
    classLevel: smallint('class_level').notNull(),
    subjectKey: text('subject_key').notNull(),
    chunkIndex: integer('chunk_index').notNull(),
    text: text('text').notNull(),
    tokens: integer('tokens').notNull(),
    embeddingModel: text('embedding_model'),
    contentHash: text('content_hash').notNull(),
    embedding: vector('embedding', { dimensions: EMBEDDING_DIMENSIONS }),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('content_chunks_item_chunk_unique').on(t.contentType, t.contentId, t.chunkIndex),
    index('content_chunks_chapter_id_idx').on(t.chapterId),
    index('content_chunks_scope_idx').on(t.academicYear, t.exam, t.classLevel, t.subjectKey),
    index('content_chunks_embedding_hnsw_idx').using('hnsw', t.embedding.op('vector_cosine_ops')),
    oneOf('content_chunks_type_check', t.contentType, CONTENT_TYPES),
  ],
);
