/**
 * Catalog (ARCHITECTURE §6, §7.1): loaded from platform/catalog/<board>/subjects.yaml and every syllabus.yaml
 * by `npm run db -- seed catalog`. Natural keys are the catalog ids (`cbse-10-science`,
 * `cbse-10-science-ch06`, `cbse-10-science-ch06-t02`), unique per `academic_year`, so 2027-28 can be
 * added beside 2026-27 (CONTEXT §4).
 */
import { sql } from 'drizzle-orm';
import { boolean, check, index, jsonb, pgTable, smallint, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps } from './_shared';

export const EXAMS = ['cbse', 'icse', 'isc'] as const;
export const SUBJECT_TIERS = ['core', 'language', 'elective'] as const;
export const SOURCE_STATUSES = ['verified', 'unverified'] as const;

const academicYear = () => text('academic_year').notNull();
const academicYearCheck = (name: string, column: Parameters<typeof oneOf>[1]) =>
  check(name, sql`${column} ~ '^[0-9]{4}-[0-9]{2}$'`);

/** Reference data, not year-specific. */
export const boards = pgTable('boards', {
  id: id(),
  code: text('code').notNull().unique('boards_code_unique'),
  name: text('name').notNull(),
  ...timestamps(),
});

export const classes = pgTable(
  'classes',
  {
    id: id(),
    boardId: uuid('board_id')
      .notNull()
      .references(() => boards.id, { onDelete: 'restrict' }),
    level: smallint('level').notNull(),
    /** cbse for CBSE; icse (7–10) or isc (11–12) for CISCE. */
    exam: text('exam').notNull(),
    name: text('name').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('classes_board_level_unique').on(t.boardId, t.level),
    check('classes_level_check', sql`${t.level} BETWEEN 7 AND 12`),
    oneOf('classes_exam_check', t.exam, EXAMS),
  ],
);

export const subjects = pgTable(
  'subjects',
  {
    id: id(),
    key: text('key').notNull(),
    academicYear: academicYear(),
    boardId: uuid('board_id')
      .notNull()
      .references(() => boards.id, { onDelete: 'restrict' }),
    classId: uuid('class_id')
      .notNull()
      .references(() => classes.id, { onDelete: 'restrict' }),
    exam: text('exam').notNull(),
    classLevel: smallint('class_level').notNull(),
    code: text('code'),
    name: text('name').notNull(),
    language: text('language').notNull(),
    script: text('script').notNull(),
    tier: text('tier').notNull(),
    wave: smallint('wave').notNull(),
    priority: smallint('priority').notNull(),
    theoryOnly: boolean('theory_only').notNull(),
    hasBoardExam: boolean('has_board_exam').notNull(),
    sourceStatus: text('source_status').notNull(),
    source: text('source').notNull(),
    notes: text('notes'),
    variants: jsonb('variants').notNull().default(sql`'[]'::jsonb`),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('subjects_key_year_unique').on(t.key, t.academicYear),
    index('subjects_board_id_idx').on(t.boardId),
    index('subjects_class_id_idx').on(t.classId),
    index('subjects_listing_idx').on(t.academicYear, t.exam, t.classLevel),
    academicYearCheck('subjects_academic_year_check', t.academicYear),
    oneOf('subjects_exam_check', t.exam, EXAMS),
    oneOf('subjects_tier_check', t.tier, SUBJECT_TIERS),
    oneOf('subjects_source_status_check', t.sourceStatus, SOURCE_STATUSES),
    check('subjects_wave_check', sql`${t.wave} BETWEEN 1 AND 3`),
    check('subjects_class_level_check', sql`${t.classLevel} BETWEEN 7 AND 12`),
  ],
);

/** One row per loaded syllabus.yaml (subject × academic year): file-level metadata and its content hash. */
export const syllabusVersions = pgTable(
  'syllabus_versions',
  {
    id: id(),
    subjectId: uuid('subject_id')
      .notNull()
      .references(() => subjects.id, { onDelete: 'cascade' }),
    academicYear: academicYear(),
    sourceStatus: text('source_status').notNull(),
    sources: jsonb('sources').notNull().default(sql`'[]'::jsonb`),
    examNotes: text('exam_notes'),
    units: jsonb('units').notNull().default(sql`'[]'::jsonb`),
    removedTopics: jsonb('removed_topics').notNull().default(sql`'[]'::jsonb`),
    /** sha256 of the parsed file, so re-seeding an unchanged file is a no-op. */
    contentHash: text('content_hash').notNull(),
    sourcePath: text('source_path').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('syllabus_versions_subject_year_unique').on(t.subjectId, t.academicYear),
    academicYearCheck('syllabus_versions_academic_year_check', t.academicYear),
    oneOf('syllabus_versions_source_status_check', t.sourceStatus, SOURCE_STATUSES),
  ],
);

export const chapters = pgTable(
  'chapters',
  {
    id: id(),
    subjectId: uuid('subject_id')
      .notNull()
      .references(() => subjects.id, { onDelete: 'cascade' }),
    /** The content "unit" id, e.g. cbse-10-science-ch06 (CONTEXT §15). */
    key: text('key').notNull(),
    academicYear: academicYear(),
    number: smallint('number').notNull(),
    title: text('title').notNull(),
    titleEn: text('title_en'),
    /** The syllabus unit/part the chapter belongs to (syllabus.yaml `unit`), e.g. "Part A". */
    syllabusUnit: text('syllabus_unit'),
    removedTopics: jsonb('removed_topics').notNull().default(sql`'[]'::jsonb`),
    /** Titles and authors only, never the text (CONTEXT §8). */
    literatureTexts: jsonb('literature_texts').notNull().default(sql`'[]'::jsonb`),
    boardAssessed: boolean('board_assessed').notNull().default(true),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('chapters_key_year_unique').on(t.key, t.academicYear),
    uniqueIndex('chapters_subject_number_unique').on(t.subjectId, t.number),
    academicYearCheck('chapters_academic_year_check', t.academicYear),
  ],
);

export const topics = pgTable(
  'topics',
  {
    id: id(),
    chapterId: uuid('chapter_id')
      .notNull()
      .references(() => chapters.id, { onDelete: 'cascade' }),
    key: text('key').notNull(),
    academicYear: academicYear(),
    position: smallint('position').notNull(),
    title: text('title').notNull(),
    titleEn: text('title_en'),
    boardAssessed: boolean('board_assessed').notNull().default(true),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('topics_key_year_unique').on(t.key, t.academicYear),
    index('topics_chapter_id_idx').on(t.chapterId, t.position),
    academicYearCheck('topics_academic_year_check', t.academicYear),
  ],
);

export const learningOutcomes = pgTable(
  'learning_outcomes',
  {
    id: id(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'cascade' }),
    academicYear: academicYear(),
    position: smallint('position').notNull(),
    text: text('text').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('learning_outcomes_topic_position_unique').on(t.topicId, t.position),
    academicYearCheck('learning_outcomes_academic_year_check', t.academicYear),
  ],
);
