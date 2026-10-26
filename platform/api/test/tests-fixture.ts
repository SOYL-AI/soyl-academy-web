/**
 * Helpers for the test-engine suites: answer keys of a test's items (read straight from the database,
 * as a grader would — never from an API response), correct/wrong responses per item, and a deep scan
 * for answer-revealing keys (API-9 contract).
 */
import { and, asc, desc, eq } from 'drizzle-orm';
import { questionKeys, questions, testItems, tests } from '@soyl/db';
import type { ChildKey } from '@soyl/db/student-questions';
import type { TestDb } from '@soyl/db/testing';

export interface ItemKey {
  itemId: string;
  sectionId: string;
  choiceGroup: string | null;
  marks: number;
  type: string;
  questionKey: string;
  answer: Record<string, unknown>;
  children: { id: string; type: string; marks: number; alternatives: { id: string; type: string }[] }[];
  childKeys: ChildKey[];
  markingScheme: { step: string; marks: number }[];
  difficulty: number;
}

export async function itemKeys(t: TestDb, testKey: string): Promise<ItemKey[]> {
  const [test] = await t.db.select({ id: tests.id }).from(tests).where(and(eq(tests.key, testKey), eq(tests.status, 'published'))).orderBy(desc(tests.version)).limit(1);
  const rows = await t.db
    .select({ item: testItems, q: questions, k: questionKeys })
    .from(testItems)
    .innerJoin(questions, eq(questions.id, testItems.questionId))
    .innerJoin(questionKeys, eq(questionKeys.questionId, questions.id))
    .where(eq(testItems.testId, test!.id))
    .orderBy(asc(testItems.position));
  return rows.map((r) => ({
    itemId: r.item.id,
    sectionId: r.item.sectionId,
    choiceGroup: r.item.choiceGroup,
    marks: Number(r.item.marks),
    type: r.q.type,
    questionKey: r.q.key,
    answer: r.k.answer as Record<string, unknown>,
    children: ((r.q.body as { children?: unknown[] }).children ?? []) as ItemKey['children'],
    childKeys: (r.k.childKeys ?? []) as ChildKey[],
    markingScheme: r.k.markingScheme as { step: string; marks: number }[],
    difficulty: r.q.difficulty,
  }));
}

const OBJECTIVE = new Set(['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match', 'ordering', 'code-output']);
export const isObjective = (t: string) => OBJECTIVE.has(t);

function partResponse(type: string, a: Record<string, unknown>, right: boolean): Record<string, unknown> {
  if (!isObjective(type)) return { text: right ? 'My full written answer with every step.' : 'A short attempt.' };
  if ('option_ids' in a) {
    const ids = a.option_ids as string[];
    return { option_ids: right ? ids : [ids[0] === 'zz' ? 'zy' : 'zz'] };
  }
  if ('value' in a) return { value: right ? (a.value as number) : (a.value as number) + 1000 };
  if ('blanks' in a) return { blanks: (a.blanks as { accepted: string[] }[]).map((b) => (right ? b.accepted[0]! : 'wrong')) };
  if ('pairs' in a) return { pairs: right ? a.pairs : [] };
  if ('order' in a) return { order: right ? a.order : [...(a.order as string[])].reverse() };
  if ('output' in a) return { output: right ? a.output : 'nope' };
  return { text: '' };
}

/** A response for an item: every objective part right (or wrong), written parts with some text. */
export function responseFor(k: ItemKey, right = true): Record<string, unknown> {
  if (k.type !== 'case-based' && k.type !== 'source-based') return partResponse(k.type, k.answer, right);
  const keys = new Map(k.childKeys.map((c) => [c.id, c]));
  return {
    parts: k.children.map((c) => ({ id: c.id, response: partResponse(c.type, keys.get(c.id)!.answer as Record<string, unknown>, right) })),
  };
}

export const FORBIDDEN_BEFORE_SUBMIT = ['answer', 'solution_md', 'marking_scheme', 'markingScheme', 'solutionMd', 'correct', 'explanation', 'rubric', 'childKeys', 'key', 'accepted'];

/** Paths of forbidden keys anywhere in a JSON value. */
export function forbiddenKeys(value: unknown, keys: readonly string[] = FORBIDDEN_BEFORE_SUBMIT, path = '$'): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => forbiddenKeys(v, keys, `${path}[${i}]`));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => [...(keys.includes(k) ? [`${path}.${k}`] : []), ...forbiddenKeys(v, keys, `${path}.${k}`)]);
  return [];
}
