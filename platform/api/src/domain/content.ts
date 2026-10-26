/**
 * Student-facing content reads (ARCHITECTURE §4.1 content/practice, §7.3, DB-6, F-006, API-9).
 *
 * Visibility: only the current version (`is_current`) of an item whose status is `published` or
 * `reviewed`, in the configured academic year. Questions additionally come from the
 * `student_questions` view (embargo rule) and, for practice and check slides, only from the
 * `practice` pool: `test` and `live_reserved` items are never served or checked here (F-006).
 *
 * Every DTO below is built field by field from an allowlist. Nothing spreads a stored body into a
 * response, so a key-side field can never ride along (the stored question body is student-safe by
 * DB-6, but this layer does not rely on that). Question objects keep the content contract's
 * snake_case names (handoff M1 deviation 4); wrappers are camelCase.
 */
import { createHash } from 'node:crypto';
import { and, asc, eq, inArray, isNull, sql, type SQL } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { boards, chapters, decks, flashcardSets, notes, studentQuestions, subjects, testItems, tests, topics, type Database } from '@soyl/db';
import { isObjective, type QuestionType } from '@soyl/shared/content/question';
import type { Deck, Slide } from '@soyl/shared/content/deck';
import type { FlashcardSet, Notes } from '@soyl/shared/content/study';
import type { QuestionBody } from '@soyl/db/student-questions';
import { ApiProblem } from '../errors';

export const STUDENT_VISIBLE = ['published', 'reviewed'] as const;
export type ReviewStatus = 'beta' | 'reviewed';
const reviewStatus = (status: string): ReviewStatus => (status === 'reviewed' ? 'reviewed' : 'beta');

type Visible = { isCurrent: AnyPgColumn; status: AnyPgColumn; academicYear: AnyPgColumn };
/** Current version, published/reviewed, in the academic year (§7.3). */
export const visible = (t: Visible, year: string): SQL => and(eq(t.isCurrent, true), inArray(t.status, [...STUDENT_VISIBLE]), eq(t.academicYear, year))!;

/* ---------------------------------------------------------------------------------------------- */
/* Chapter                                                                                         */
/* ---------------------------------------------------------------------------------------------- */

export interface ChapterRef {
  id: string;
  key: string;
  number: number;
  title: string;
  titleEn: string | null;
  unit: string | null;
  boardAssessed: boolean;
  subject: { id: string; key: string; name: string; board: 'cbse' | 'cisce'; exam: 'cbse' | 'icse' | 'isc'; classLevel: number; language: string; script: string };
}

/** The catalog chapter for a key in the academic year, or 404. */
export async function loadChapter(db: Database, key: string, year: string): Promise<ChapterRef> {
  const [row] = await db
    .select({ c: chapters, s: subjects, board: boards.code })
    .from(chapters)
    .innerJoin(subjects, eq(subjects.id, chapters.subjectId))
    .innerJoin(boards, eq(boards.id, subjects.boardId))
    .where(and(eq(chapters.key, key), eq(chapters.academicYear, year)));
  if (!row) throw new ApiProblem('not_found');
  return {
    id: row.c.id,
    key: row.c.key,
    number: row.c.number,
    title: row.c.title,
    titleEn: row.c.titleEn,
    unit: row.c.syllabusUnit,
    boardAssessed: row.c.boardAssessed,
    subject: {
      id: row.s.id,
      key: row.s.key,
      name: row.s.name,
      board: row.board as 'cbse' | 'cisce',
      exam: row.s.exam as 'cbse' | 'icse' | 'isc',
      classLevel: row.s.classLevel,
      language: row.s.language,
      script: row.s.script,
    },
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* Questions                                                                                       */
/* ---------------------------------------------------------------------------------------------- */

interface OptionDto {
  id: string;
  text_md: string;
}

/** A gradable part as students see it: no answer, solution, marking scheme or rubric. */
export interface StudentPart {
  id: string;
  type: QuestionType;
  objective: boolean;
  stem_md: string;
  options: OptionDto[];
  match_right: OptionDto[];
  marks: number;
  assets: unknown[];
  format?: string;
  word_limit?: { min: number; max: number };
  map_id?: string;
}

export interface StudentChild extends StudentPart {
  /** Internal choice: answer this part or one of these. */
  alternatives: StudentPart[];
}

export interface StudentQuestion extends StudentPart {
  version: number;
  difficulty: number;
  expected_time_sec: number;
  topic_ids: string[];
  passage_md?: string;
  passage_origin?: string;
  children: StudentChild[];
}

const options = (list: unknown): OptionDto[] =>
  Array.isArray(list) ? list.map((o: { id: unknown; text_md: unknown }) => ({ id: String(o.id), text_md: String(o.text_md ?? '') })) : [];

/**
 * Ordering items are stored in their correct order. Serving them in that order would give the
 * answer away, so they are shuffled deterministically per question (stable across requests and
 * cacheable) and never left in the correct order.
 */
export function shuffleForOrdering(key: string, items: OptionDto[]): OptionDto[] {
  if (items.length < 2) return items;
  const out = [...items];
  let seed = createHash('sha256').update(`order:${key}`).digest().readUInt32BE(0);
  const next = () => {
    seed = (Math.imul(seed ^ (seed >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  if (out.every((o, i) => o.id === items[i]!.id)) out.push(out.shift()!);
  return out;
}

function partDto(key: string, p: Record<string, unknown>): StudentPart {
  const type = String(p.type) as QuestionType;
  const opts = options(p.options);
  return {
    id: String(p.id),
    type,
    objective: isObjective(type),
    stem_md: String(p.stem_md ?? ''),
    options: type === 'ordering' ? shuffleForOrdering(`${key}/${String(p.id)}`, opts) : opts,
    match_right: options(p.match_right),
    marks: Number(p.marks),
    assets: Array.isArray(p.assets) ? (p.assets as unknown[]) : [],
    ...(typeof p.format === 'string' ? { format: p.format } : {}),
    ...(p.word_limit && typeof p.word_limit === 'object' ? { word_limit: { min: Number((p.word_limit as { min: number }).min), max: Number((p.word_limit as { max: number }).max) } } : {}),
    ...(typeof p.map_id === 'string' ? { map_id: p.map_id } : {}),
  };
}

export interface QuestionRow {
  id: string;
  key: string;
  version: number;
  type: string;
  marks: number;
  difficulty: number;
  expectedTimeSec: number;
  topicKeys: string[];
  body: unknown;
}

export function studentQuestion(row: QuestionRow): StudentQuestion {
  const body = row.body as QuestionBody & Record<string, unknown>;
  const type = row.type as QuestionType;
  const top = partDto(row.key, { ...body, id: row.key, type, marks: row.marks });
  return {
    ...top,
    version: row.version,
    difficulty: row.difficulty,
    expected_time_sec: row.expectedTimeSec,
    topic_ids: [...row.topicKeys],
    ...(typeof body.passage_md === 'string' ? { passage_md: body.passage_md } : {}),
    ...(typeof body.passage_origin === 'string' ? { passage_origin: body.passage_origin } : {}),
    children: (Array.isArray(body.children) ? body.children : []).map((c) => {
      const child = c as unknown as Record<string, unknown>;
      return {
        ...partDto(`${row.key}/${String(child.id)}`, child),
        alternatives: (Array.isArray(child.alternatives) ? child.alternatives : []).map((a) => partDto(`${row.key}/${String(child.id)}`, a as Record<string, unknown>)),
      };
    }),
  };
}

/** Columns of the `student_questions` view a student DTO may use (never question_keys). */
export const studentQuestionSelect = {
  id: studentQuestions.id,
  key: studentQuestions.key,
  version: studentQuestions.version,
  type: studentQuestions.type,
  marks: studentQuestions.marks,
  difficulty: studentQuestions.difficulty,
  expectedTimeSec: studentQuestions.expectedTimeSec,
  topicKeys: studentQuestions.topicKeys,
  body: studentQuestions.body,
};

/** Current, visible, practice-pool questions of a chapter (F-006: no test or live items). */
export function practicePool(chapterId: string, year: string): SQL {
  return and(
    eq(studentQuestions.chapterId, chapterId),
    eq(studentQuestions.academicYear, year),
    eq(studentQuestions.isCurrent, true),
    eq(studentQuestions.pool, 'practice'),
  )!;
}

export async function practiceQuestionsByKey(db: Database, chapterId: string, year: string, keys: string[]): Promise<Map<string, StudentQuestion>> {
  if (!keys.length) return new Map();
  const rows = await db
    .select(studentQuestionSelect)
    .from(studentQuestions)
    .where(and(practicePool(chapterId, year), inArray(studentQuestions.key, keys)));
  return new Map(rows.map((r) => [r.key, studentQuestion(r)]));
}

/* ---------------------------------------------------------------------------------------------- */
/* Decks, notes, flashcards                                                                        */
/* ---------------------------------------------------------------------------------------------- */

export interface DeckPartSummary {
  /** 1-based part, or 0 when the chapter is a single deck. */
  part: number;
  title: string;
  slideCount: number;
  hasAudio: boolean;
  version: number;
  reviewStatus: ReviewStatus;
}

export async function deckParts(db: Database, chapterId: string, year: string): Promise<(DeckPartSummary & { id: string })[]> {
  const rows = await db
    .select({ id: decks.id, part: decks.part, title: decks.title, slideCount: decks.slideCount, version: decks.version, status: decks.status, body: decks.body })
    .from(decks)
    .where(and(eq(decks.chapterId, chapterId), visible(decks, year)))
    .orderBy(sql`coalesce(${decks.part}, 0)`);
  return rows.map((r) => ({
    id: r.id,
    part: r.part ?? 0,
    title: r.title,
    slideCount: r.slideCount,
    hasAudio: ((r.body as Deck).slides ?? []).some((s) => s.audio),
    version: r.version,
    reviewStatus: reviewStatus(r.status),
  }));
}

function slideDto(s: Slide) {
  return {
    id: s.id,
    layout: s.layout,
    heading: s.heading,
    body_md: s.body_md ?? '',
    bullets: [...(s.bullets ?? [])],
    ...(s.columns ? { columns: [s.columns[0], s.columns[1]] as [string, string] } : {}),
    visual: s.visual ?? null,
    math: [...(s.math ?? [])],
    narration: s.narration,
    check_question_id: s.check_question_id ?? null,
    audio: s.audio ? { key: s.audio.key, duration_ms: s.audio.duration_ms } : null,
  };
}

export async function loadDeck(db: Database, chapter: ChapterRef, year: string, part: number | undefined) {
  const parts = await deckParts(db, chapter.id, year);
  if (!parts.length) throw new ApiProblem('not_found');
  const chosen = part === undefined ? parts[0]! : parts.find((p) => p.part === part);
  if (!chosen) throw new ApiProblem('not_found');
  const [row] = await db
    .select({ body: decks.body, language: decks.language, publishedAt: decks.publishedAt, updatedAt: decks.updatedAt })
    .from(decks)
    .where(eq(decks.id, chosen.id));
  const deck = row!.body as Deck;
  const slides = (deck.slides ?? []).map(slideDto);
  const checkIds = [...new Set(slides.map((s) => s.check_question_id).filter((x): x is string => !!x))];
  const checks = await practiceQuestionsByKey(db, chapter.id, year, checkIds);
  return {
    chapterId: chapter.key,
    part: chosen.part,
    parts: parts.map(({ id: _id, ...p }) => p),
    version: chosen.version,
    reviewStatus: chosen.reviewStatus,
    title: deck.title,
    language: row!.language,
    goals: [...(deck.goals ?? [])],
    slides,
    /** Stems/options of the check-slide questions (practice pool only); answers come from POST /v1/practice/answers. */
    checkQuestions: checkIds.map((k) => checks.get(k)).filter((q): q is StudentQuestion => !!q),
  };
}

export async function loadNotes(db: Database, chapter: ChapterRef, year: string) {
  const [row] = await db
    .select({ body: notes.body, version: notes.version, status: notes.status, language: notes.language })
    .from(notes)
    .where(and(eq(notes.chapterId, chapter.id), visible(notes, year)));
  if (!row) throw new ApiProblem('not_found');
  const n = row.body as Notes;
  return {
    chapterId: chapter.key,
    version: row.version,
    reviewStatus: reviewStatus(row.status),
    title: n.title,
    language: row.language,
    sections: (n.sections ?? []).map((s) => ({
      heading: s.heading,
      body_md: s.body_md,
      key_terms: (s.key_terms ?? []).map((k) => ({ term: k.term, definition_md: k.definition_md })),
      formulas: (s.formulas ?? []).map((f) => ({ latex: f.latex, ...(f.label !== undefined ? { label: f.label } : {}) })),
      visual: s.visual ?? null,
      visuals: [...(s.visuals ?? [])],
      topic_ids: [...(s.topic_ids ?? [])],
    })),
    exam_tips_md: n.exam_tips_md ?? '',
  };
}

export async function loadFlashcards(db: Database, chapter: ChapterRef, year: string) {
  const [row] = await db
    .select({ body: flashcardSets.body, version: flashcardSets.version, status: flashcardSets.status, language: flashcardSets.language })
    .from(flashcardSets)
    .where(and(eq(flashcardSets.chapterId, chapter.id), visible(flashcardSets, year)));
  if (!row) throw new ApiProblem('not_found');
  const f = row.body as FlashcardSet;
  return {
    chapterId: chapter.key,
    version: row.version,
    reviewStatus: reviewStatus(row.status),
    language: row.language,
    cards: (f.cards ?? []).map((c) => ({ id: c.id, front_md: c.front_md, back_md: c.back_md, tag: c.tag, topic_id: c.topic_id ?? null })),
  };
}

/* ---------------------------------------------------------------------------------------------- */
/* Hub                                                                                             */
/* ---------------------------------------------------------------------------------------------- */

export async function loadHub(db: Database, chapter: ChapterRef, year: string) {
  const [parts, noteRows, cardRows, practiceRows, topicRows, testRows] = await Promise.all([
    deckParts(db, chapter.id, year),
    db
      .select({ title: notes.title, body: notes.body, status: notes.status, version: notes.version })
      .from(notes)
      .where(and(eq(notes.chapterId, chapter.id), visible(notes, year))),
    db
      .select({ cardCount: flashcardSets.cardCount, status: flashcardSets.status, version: flashcardSets.version })
      .from(flashcardSets)
      .where(and(eq(flashcardSets.chapterId, chapter.id), visible(flashcardSets, year))),
    db
      .select({ type: studentQuestions.type, difficulty: studentQuestions.difficulty, n: sql<number>`count(*)::int` })
      .from(studentQuestions)
      .where(practicePool(chapter.id, year))
      .groupBy(studentQuestions.type, studentQuestions.difficulty),
    db.select({ key: topics.key, title: topics.title, titleEn: topics.titleEn }).from(topics).where(eq(topics.chapterId, chapter.id)).orderBy(asc(topics.position)),
    db
      .select({ key: tests.key, title: tests.title, kind: tests.kind, durationMin: tests.durationMin, totalMarks: tests.totalMarks, items: sql<number>`(SELECT count(*)::int FROM ${testItems} WHERE ${testItems.testId} = ${tests.id})` })
      .from(tests)
      .where(and(eq(tests.status, 'published'), eq(tests.academicYear, year), sql`${chapter.key} = ANY(${tests.chapterKeys})`, isNull(tests.createdByUserId)))
      .orderBy(asc(tests.key)),
  ]);
  const byType: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  let practiceTotal = 0;
  for (const r of practiceRows) {
    byType[r.type] = (byType[r.type] ?? 0) + r.n;
    byDifficulty[String(r.difficulty)] = (byDifficulty[String(r.difficulty)] ?? 0) + r.n;
    practiceTotal += r.n;
  }
  const n = noteRows[0];
  const f = cardRows[0];
  return {
    chapter: {
      id: chapter.key,
      number: chapter.number,
      title: chapter.title,
      titleEn: chapter.titleEn,
      unit: chapter.unit,
      boardAssessed: chapter.boardAssessed,
      topics: topicRows.map((t) => ({ id: t.key, title: t.title, titleEn: t.titleEn })),
    },
    subject: {
      id: chapter.subject.key,
      name: chapter.subject.name,
      board: chapter.subject.board,
      exam: chapter.subject.exam,
      classLevel: chapter.subject.classLevel,
      language: chapter.subject.language,
      script: chapter.subject.script,
    },
    assets: {
      lesson: { available: parts.length > 0, parts: parts.map(({ id: _id, ...p }) => p), slideCount: parts.reduce((s, p) => s + p.slideCount, 0) },
      notes: { available: !!n, sections: n ? ((n.body as Notes).sections ?? []).length : 0, reviewStatus: n ? reviewStatus(n.status) : null },
      flashcards: { available: !!f, count: f?.cardCount ?? 0, reviewStatus: f ? reviewStatus(f.status) : null },
      practice: { available: practiceTotal > 0, count: practiceTotal, byType, byDifficulty },
      tests: { available: testRows.length > 0, count: testRows.length, items: testRows.map((t) => ({ id: t.key, title: t.title, kind: t.kind, durationMin: t.durationMin, totalMarks: Number(t.totalMarks), questionCount: t.items })) },
    },
  };
}
