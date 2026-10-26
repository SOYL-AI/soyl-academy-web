/**
 * Student-safe delivery of a test paper inside an attempt (ARCHITECTURE §9, AC-11, API-9, DB-6).
 *
 * Questions are built with the same allowlist DTO as practice (`studentQuestion`): stems, options,
 * passages, children and their internal-choice alternatives — never answers, solutions, marking
 * schemes or rubrics. They are only built for an attempt that has started (`in_progress`) or ended.
 *
 * Per-attempt shuffle (AC-11 "per-user shuffle"), only when the test allows it (`tests.shuffle`,
 * which the board pattern decides; live mocks set it): question order inside each section (a choice
 * group moves as one block), and MCQ/multi-select option order unless an option refers to other
 * options ("all of the above", "both (a) and (b)", उपर्युक्त सभी …). Deterministic from the attempt's
 * seed, so a reload shows the same order. Item ids and option ids never change, so grading is unaffected.
 */
import { createHash } from 'node:crypto';
import { studentQuestion, type StudentQuestion } from '../content';
import type { SectionMeta, TestItemRow, TestStructure } from './load';

export interface DeliveredItem {
  itemId: string;
  sectionId: string;
  /** Question number shown to the student (choice-group members share one number). */
  number: number;
  marks: number;
  choiceGroup: string | null;
  question: StudentQuestion;
}

export interface DeliveredSection {
  id: string;
  title: string;
  instructions: string;
  /** "Attempt `attempt` of these `of` questions" groups, with their member item ids in display order. */
  choiceGroups: { id: string; attempt: number; of: number; itemIds: string[] }[];
  itemIds: string[];
  maxMarks: number;
}

function rng(seed: string) {
  let s = createHash('sha256').update(seed).digest().readUInt32BE(0);
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const next = rng(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Options that point at other options must keep their order. */
const REFERS_TO_OPTIONS = /(of the above|of these|above options|both\s*\(?[a-d]\)?|neither\s*\(?[a-d]\)?|\(\s*[a-d]\s*\)\s*(and|&|or)\s*\(\s*[a-d]\s*\)|\boptions?\s*\(?[a-d]\)?\b|उपर्युक्त|उपरोक्त|इनमें से|ऊपर दिए)/i;

export function canShuffleOptions(q: StudentQuestion): boolean {
  if (q.type !== 'mcq' && q.type !== 'multi-select') return false;
  if (q.options.length < 3) return false;
  return !q.options.some((o) => REFERS_TO_OPTIONS.test(o.text_md));
}

function sectionMax(items: TestItemRow[], s: SectionMeta): number {
  let max = items.filter((i) => !i.choiceGroup).reduce((n, i) => n + i.marks, 0);
  for (const g of s.choiceGroups)
    max += items
      .filter((i) => i.choiceGroup === g.id)
      .map((i) => i.marks)
      .sort((a, b) => b - a)
      .slice(0, g.attempt)
      .reduce((n, m) => n + m, 0);
  return max;
}

/**
 * The paper in display order for one attempt. `shuffleSeed` null (or a test without `shuffle`) keeps
 * the paper order.
 */
export function deliverPaper(structure: TestStructure, shuffleSeed: string | null): { sections: DeliveredSection[]; items: DeliveredItem[] } {
  const shuffle = structure.test.shuffle && !!shuffleSeed;
  const sections: DeliveredSection[] = [];
  const items: DeliveredItem[] = [];
  let number = 0;
  for (const s of structure.sections) {
    const inSection = structure.items.filter((i) => i.sectionId === s.id);
    // Blocks: a choice group stays together, in paper order inside the block.
    const blocks: TestItemRow[][] = [];
    for (const it of inSection) {
      const block = it.choiceGroup ? blocks.find((b) => b[0]!.choiceGroup === it.choiceGroup) : undefined;
      if (block) block.push(it);
      else blocks.push([it]);
    }
    const ordered = shuffle ? seededShuffle(blocks, `${shuffleSeed}|section|${s.id}`) : blocks;
    for (const block of ordered) {
      number++;
      for (const it of block) {
        let question = studentQuestion({ ...it.question });
        if (shuffle && canShuffleOptions(question)) question = { ...question, options: seededShuffle(question.options, `${shuffleSeed}|options|${it.itemId}`) };
        items.push({ itemId: it.itemId, sectionId: s.id, number, marks: it.marks, choiceGroup: it.choiceGroup, question });
      }
    }
    const shown = ordered.flat();
    sections.push({
      id: s.id,
      title: s.title,
      instructions: s.instructions,
      choiceGroups: s.choiceGroups.map((g) => ({ ...g, itemIds: shown.filter((i) => i.choiceGroup === g.id).map((i) => i.itemId) })),
      itemIds: shown.map((i) => i.itemId),
      maxMarks: sectionMax(inSection, s),
    });
  }
  return { sections, items };
}

/** Section outlines without questions (before an attempt starts, and for GET /v1/tests/:id). */
export function outlineSections(structure: TestStructure) {
  return structure.sections.map((s) => {
    const inSection = structure.items.filter((i) => i.sectionId === s.id);
    return {
      id: s.id,
      title: s.title,
      instructions: s.instructions,
      questionCount: inSection.length,
      maxMarks: sectionMax(inSection, s),
      choiceGroups: s.choiceGroups.map((g) => ({ id: g.id, attempt: g.attempt, of: g.of })),
    };
  });
}
