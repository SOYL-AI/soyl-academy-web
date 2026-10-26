/**
 * Test structures for the test engine (ARCHITECTURE §9, ADR-012).
 *
 * A `tests` row and its `test_items` are immutable once ingested (a changed paper is a new version
 * row, D-023), so a test's structure — items, sections, choice groups and the student-safe question
 * columns of every item — is cached in process for a few minutes. That keeps autosave and resume off
 * the question tables under live-mock load (§16). The answer keys are cached separately and are only
 * ever read by grading (`loadKeys`), never by a student DTO (DB-6, F-006).
 */
import { and, asc, desc, eq, inArray } from 'drizzle-orm';
import { boards, questionKeys, questions, subjects, testItems, tests, type Database } from '@soyl/db';
import type { ChildKey } from '@soyl/db/student-questions';
import type { TestDefinition } from '@soyl/shared/content/test';
import type { QuestionType } from '@soyl/shared/content/question';

export interface TestRow {
  id: string;
  key: string;
  version: number;
  academicYear: string;
  kind: string;
  paperType: string;
  title: string;
  durationMin: number;
  totalMarks: number;
  shuffle: boolean;
  seed: string | null;
  status: string;
  chapterKeys: string[];
  seriesId: string | null;
  seriesPosition: number | null;
  createdByUserId: string | null;
  definition: TestDefinition;
  subject: { id: string; key: string; name: string; board: string; classLevel: number };
}

/** Student-safe question columns (studentQuestionColumns) plus the pool/embargo the engine checks. */
export interface ItemQuestion {
  id: string;
  key: string;
  version: number;
  type: QuestionType;
  marks: number;
  difficulty: number;
  expectedTimeSec: number;
  topicKeys: string[];
  body: unknown;
  pool: string;
  embargoUntil: Date | null;
}

export interface TestItemRow {
  itemId: string;
  sectionId: string;
  position: number;
  marks: number;
  choiceGroup: string | null;
  question: ItemQuestion;
}

export interface SectionMeta {
  id: string;
  title: string;
  instructions: string;
  choiceGroups: { id: string; attempt: number; of: number }[];
}

export interface TestStructure {
  test: TestRow;
  items: TestItemRow[];
  sections: SectionMeta[];
  byItemId: Map<string, TestItemRow>;
}

export interface QuestionKeyRow {
  answer: unknown;
  solutionMd: string;
  markingScheme: unknown;
  childKeys: ChildKey[];
  rubric: unknown;
}

const TTL_MS = 10 * 60_000;
const MAX_ENTRIES = 500;

class Lru<V> {
  private map = new Map<string, { at: number; value: Promise<V> }>();
  get(key: string, load: () => Promise<V>): Promise<V> {
    const now = Date.now();
    const hit = this.map.get(key);
    if (hit && now - hit.at < TTL_MS) {
      this.map.delete(key);
      this.map.set(key, hit);
      return hit.value;
    }
    const value = load();
    value.catch(() => this.map.delete(key));
    this.map.set(key, { at: now, value });
    while (this.map.size > MAX_ENTRIES) this.map.delete(this.map.keys().next().value!);
    return value;
  }
  clear() {
    this.map.clear();
  }
}

const structures = new WeakMap<object, Lru<TestStructure>>();
const keyCaches = new WeakMap<object, Lru<Map<string, QuestionKeyRow>>>();
const cacheFor = <V>(m: WeakMap<object, Lru<V>>, db: Database): Lru<V> => {
  let c = m.get(db);
  if (!c) m.set(db, (c = new Lru<V>()));
  return c;
};

/** Test helper: forget cached structures (a test that edits rows in place). */
export function clearTestCaches(db: Database): void {
  structures.get(db)?.clear();
  keyCaches.get(db)?.clear();
}

const testColumns = {
  id: tests.id,
  key: tests.key,
  version: tests.version,
  academicYear: tests.academicYear,
  kind: tests.kind,
  paperType: tests.paperType,
  title: tests.title,
  durationMin: tests.durationMin,
  totalMarks: tests.totalMarks,
  shuffle: tests.shuffle,
  seed: tests.seed,
  status: tests.status,
  chapterKeys: tests.chapterKeys,
  seriesId: tests.seriesId,
  seriesPosition: tests.seriesPosition,
  createdByUserId: tests.createdByUserId,
  definition: tests.definition,
  subjectId: subjects.id,
  subjectKey: subjects.key,
  subjectName: subjects.name,
  board: boards.code,
  classLevel: subjects.classLevel,
};

type TestSelect = { [K in keyof typeof testColumns]: unknown };

function toTestRow(r: TestSelect): TestRow {
  return {
    id: r.id as string,
    key: r.key as string,
    version: r.version as number,
    academicYear: r.academicYear as string,
    kind: r.kind as string,
    paperType: r.paperType as string,
    title: r.title as string,
    durationMin: r.durationMin as number,
    totalMarks: Number(r.totalMarks),
    shuffle: r.shuffle as boolean,
    seed: (r.seed as string | null) ?? null,
    status: r.status as string,
    chapterKeys: r.chapterKeys as string[],
    seriesId: (r.seriesId as string | null) ?? null,
    seriesPosition: (r.seriesPosition as number | null) ?? null,
    createdByUserId: (r.createdByUserId as string | null) ?? null,
    definition: r.definition as TestDefinition,
    subject: { id: r.subjectId as string, key: r.subjectKey as string, name: r.subjectName as string, board: r.board as string, classLevel: r.classLevel as number },
  };
}

const testQuery = (db: Database) =>
  db.select(testColumns).from(tests).innerJoin(subjects, eq(subjects.id, tests.subjectId)).innerJoin(boards, eq(boards.id, subjects.boardId));

/** The latest published version of a test key in the academic year (null when there is none). */
export async function publishedTestByKey(db: Database, key: string, year: string): Promise<TestRow | null> {
  const [row] = await testQuery(db)
    .where(and(eq(tests.key, key), eq(tests.academicYear, year), eq(tests.status, 'published')))
    .orderBy(desc(tests.version))
    .limit(1);
  return row ? toTestRow(row) : null;
}

export async function testById(db: Database, id: string): Promise<TestRow | null> {
  const [row] = await testQuery(db).where(eq(tests.id, id));
  return row ? toTestRow(row) : null;
}

/** Items, sections and student-safe question columns of a test version (cached; the rows are immutable). */
export function loadStructure(db: Database, test: TestRow): Promise<TestStructure> {
  return cacheFor(structures, db).get(test.id, async () => {
    const rows = await db
      .select({
        itemId: testItems.id,
        sectionId: testItems.sectionId,
        position: testItems.position,
        marks: testItems.marks,
        choiceGroup: testItems.choiceGroup,
        qid: questions.id,
        key: questions.key,
        version: questions.version,
        type: questions.type,
        qmarks: questions.marks,
        difficulty: questions.difficulty,
        expectedTimeSec: questions.expectedTimeSec,
        topicKeys: questions.topicKeys,
        body: questions.body,
        pool: questions.pool,
        embargoUntil: questions.embargoUntil,
      })
      .from(testItems)
      .innerJoin(questions, eq(questions.id, testItems.questionId))
      .where(eq(testItems.testId, test.id))
      .orderBy(asc(testItems.position));
    const items: TestItemRow[] = rows.map((r) => ({
      itemId: r.itemId,
      sectionId: r.sectionId,
      position: r.position,
      marks: Number(r.marks),
      choiceGroup: r.choiceGroup,
      question: {
        id: r.qid,
        key: r.key,
        version: r.version,
        type: r.type as QuestionType,
        marks: Number(r.qmarks),
        difficulty: r.difficulty,
        expectedTimeSec: r.expectedTimeSec,
        topicKeys: r.topicKeys,
        body: r.body,
        pool: r.pool,
        embargoUntil: r.embargoUntil,
      },
    }));
    const defSections = new Map((test.definition?.sections ?? []).map((s) => [s.id, s]));
    const order: string[] = [];
    for (const it of items) if (!order.includes(it.sectionId)) order.push(it.sectionId);
    const sections: SectionMeta[] = order.map((id) => {
      const def = defSections.get(id);
      const inSection = items.filter((i) => i.sectionId === id);
      const groups = new Map<string, number>();
      for (const i of inSection) if (i.choiceGroup) groups.set(i.choiceGroup, (groups.get(i.choiceGroup) ?? 0) + 1);
      const attemptOf = new Map((def?.choice_groups ?? []).map((g) => [g.id, g.attempt]));
      return {
        id,
        title: def?.title ?? `Section ${id}`,
        instructions: def?.instructions ?? '',
        choiceGroups: [...groups.entries()].map(([g, of]) => ({ id: g, attempt: attemptOf.get(g) ?? 1, of })),
      };
    });
    return { test, items, sections, byItemId: new Map(items.map((i) => [i.itemId, i])) };
  });
}

/** Answer keys of a test's questions, by question row id. Grading only (server side). */
export function loadKeys(db: Database, structure: TestStructure): Promise<Map<string, QuestionKeyRow>> {
  return cacheFor(keyCaches, db).get(structure.test.id, async () => {
    const ids = structure.items.map((i) => i.question.id);
    if (!ids.length) return new Map();
    const rows = await db
      .select({ questionId: questionKeys.questionId, answer: questionKeys.answer, solutionMd: questionKeys.solutionMd, markingScheme: questionKeys.markingScheme, childKeys: questionKeys.childKeys, rubric: questionKeys.rubric })
      .from(questionKeys)
      .where(inArray(questionKeys.questionId, ids));
    return new Map(rows.map((r) => [r.questionId, { answer: r.answer, solutionMd: r.solutionMd, markingScheme: r.markingScheme, childKeys: (r.childKeys ?? []) as ChildKey[], rubric: r.rubric ?? null }]));
  });
}

/** Marks of a section that count (non-grouped items plus `attempt` × marks per choice group). */
export function sectionMax(structure: TestStructure, sectionId: string): number {
  const s = structure.sections.find((x) => x.id === sectionId);
  const items = structure.items.filter((i) => i.sectionId === sectionId);
  let max = items.filter((i) => !i.choiceGroup).reduce((n, i) => n + i.marks, 0);
  for (const g of s?.choiceGroups ?? []) {
    const marks = items.filter((i) => i.choiceGroup === g.id).map((i) => i.marks).sort((a, b) => b - a);
    max += marks.slice(0, g.attempt).reduce((n, m) => n + m, 0);
  }
  return max;
}
