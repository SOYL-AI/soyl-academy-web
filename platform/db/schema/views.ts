/**
 * Views created by migration 0002 (hand-written SQL); declared here with `.existing()` so Drizzle can
 * query them and drizzle-kit leaves them alone.
 */
import { boolean, integer, jsonb, pgView, smallint, text, uuid } from 'drizzle-orm/pg-core';
import { marks, meteredPaise, tstz } from './_shared';

/**
 * DB-6 / AC-11: what a student may see of a question. Only published/reviewed current versions, never
 * `question_keys`, and `live_reserved` items only after their embargo. Practice and ISR read this view
 * filtered to pool = 'practice'; attempts read it through test_items.
 */
export const studentQuestions = pgView('student_questions', {
  id: uuid('id').notNull(),
  key: text('key').notNull(),
  version: integer('version').notNull(),
  unit: text('unit').notNull(),
  chapterId: uuid('chapter_id').notNull(),
  academicYear: text('academic_year').notNull(),
  language: text('language').notNull(),
  status: text('status').notNull(),
  isCurrent: boolean('is_current').notNull(),
  type: text('type').notNull(),
  pool: text('pool').notNull(),
  difficulty: smallint('difficulty').notNull(),
  competency: text('competency').notNull(),
  bloom: text('bloom').notNull(),
  marks: marks('marks').notNull(),
  expectedTimeSec: integer('expected_time_sec').notNull(),
  topicKeys: text('topic_keys').array().notNull(),
  body: jsonb('body').notNull(),
}).existing();

/** Pipeline spend against CONTENT_BUDGET_INR (config_values key, rupees). */
export const contentBudget = pgView('content_budget', {
  realSpentPaise: meteredPaise('real_spent_paise').notNull(),
  simulatedSpentPaise: meteredPaise('simulated_spent_paise').notNull(),
  capPaise: meteredPaise('cap_paise'),
  remainingPaise: meteredPaise('remaining_paise'),
  lastSpendAt: tstz('last_spend_at'),
}).existing();
