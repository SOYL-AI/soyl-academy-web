/**
 * Stage 7 blueprint engine (ARCHITECTURE §9): constrained, deterministic (seeded) selection of
 * question versions from a bank to fill a blueprint exactly.
 *
 * Constraints, in order:
 *   - hard: type (with the blueprint's documented mapping: a `short`/`long` slot also takes a
 *     `numerical` of the same marks, since board numericals carry step marks), marks_each exactly,
 *     competency and difficulty range when the item sets them, not already in this paper, not in
 *     the series' exclusion set ("no repeats across a series"), scope chapters only;
 *   - multi-chapter scopes: every chapter in scope must have questions in the bank, otherwise the
 *     paper is not built (a syllabus paper from one chapter is not a board paper);
 *   - soft (scored): chapter spread (unused chapter +3), topic coverage (new topic +2), difficulty
 *     curve (target ramps from easy to hard across the paper; −|d − target|), internal-choice
 *     alternatives from the same chapter as their partner (+2); ties broken by the seeded shuffle.
 * Shortages never fail silently: they come back as GenerationRequest records (what to generate,
 * for which chapters) and no TestDefinition is produced for that paper.
 */
import { createRng } from '@soyl/ai-core';
import { TestDefinition, type Blueprint, type Competency, type PaperType, type QuestionType, type TestKind } from '@soyl/shared/content/index';
import type { z } from 'zod/v4';

export interface BankItem {
  id: string;
  version: number;
  unit: string;
  type: QuestionType;
  marks: number;
  difficulty: number;
  competency: z.infer<typeof Competency>;
  topic_ids: string[];
}

export interface PaperSpec {
  id: string;
  title: string;
  blueprint: Blueprint;
  subjectId: string;
  /** Chapters in scope, in syllabus order. */
  chapters: string[];
  seed: string;
  /** Question ids that must not be used (series no-repeat rule, short/long disjointness). */
  exclude?: ReadonlySet<string>;
}

export interface GenerationRequest {
  paper_id: string;
  blueprint_id: string;
  section: string | null;
  type: QuestionType | '*';
  marks: number | null;
  competency: string | null;
  difficulty: [number, number] | null;
  chapters: string[];
  missing: number;
  reason: string;
}

export type PaperResult = { ok: true; test: TestDefinition; used: string[] } | { ok: false; requests: GenerationRequest[] };

/** Bank types a blueprint slot accepts (blueprints handoff convention 3: numericals map to short/long). */
export const SLOT_COMPATIBLE: Partial<Record<QuestionType, QuestionType[]>> = {
  short: ['short', 'numerical'],
  long: ['long', 'numerical'],
};

export function kindFor(paper: PaperType): TestKind {
  switch (paper) {
    case 'chapter-test-short':
    case 'chapter-test-long':
      return 'chapter';
    case 'unit-test':
      return 'unit';
    case 'half-yearly':
    case 'term':
    case 'annual':
      return 'term';
    default:
      return 'full';
  }
}

interface Slot {
  section: string;
  itemIndex: number;
  type: QuestionType;
  marks: number;
  competency: string | null;
  difficulty: [number, number] | null;
  group: string | null;
  attempt: number;
  /** 0..1 position in the paper (difficulty ramp). */
  position: number;
}

function slotsOf(bp: Blueprint): Slot[] {
  const slots: Omit<Slot, 'position'>[] = [];
  for (const s of bp.sections) {
    let g = 0;
    s.items.forEach((it, itemIndex) => {
      if (it.internal_choice) {
        const groups = Math.floor(it.count / it.internal_choice.of);
        for (let k = 0; k < groups; k++) {
          const group = `${s.id}-c${++g}`;
          for (let j = 0; j < it.internal_choice.of; j++)
            slots.push({ section: s.id, itemIndex, type: it.type, marks: it.marks_each, competency: it.competency, difficulty: it.difficulty, group, attempt: it.internal_choice.attempt });
        }
      } else for (let k = 0; k < it.count; k++) slots.push({ section: s.id, itemIndex, type: it.type, marks: it.marks_each, competency: it.competency, difficulty: it.difficulty, group: null, attempt: 1 });
    });
  }
  return slots.map((s, i) => ({ ...s, position: slots.length > 1 ? i / (slots.length - 1) : 0.5 }));
}

const DIFFICULTY_RAMP = { start: 1.8, end: 3.8 } as const;

export function assemblePaper(spec: PaperSpec, bank: readonly BankItem[]): PaperResult {
  const bp = spec.blueprint;
  const scope = new Set(spec.chapters);
  const exclude = spec.exclude ?? new Set<string>();
  const rng = createRng(spec.seed);
  const pool = rng.shuffle(bank.filter((q) => scope.has(q.unit)));
  const requests: GenerationRequest[] = [];
  const base = { paper_id: spec.id, blueprint_id: bp.id };

  if (spec.chapters.length > 1) {
    const empty = spec.chapters.filter((c) => !pool.some((q) => q.unit === c));
    if (empty.length) {
      requests.push({ ...base, section: null, type: '*', marks: null, competency: null, difficulty: null, chapters: empty, missing: empty.length, reason: `${empty.length} of ${spec.chapters.length} chapters in scope have no published questions; generate and publish them first` });
      return { ok: false, requests };
    }
  }

  const used = new Set<string>();
  const usedUnits = new Map<string, number>();
  const coveredTopics = new Set<string>();
  const chosen: { slot: Slot; q: BankItem }[] = [];
  const groupUnit = new Map<string, string>();
  const shortage = new Map<string, GenerationRequest>();

  for (const slot of slotsOf(bp)) {
    const accept = SLOT_COMPATIBLE[slot.type] ?? [slot.type];
    const target = slot.difficulty ? (slot.difficulty[0] + slot.difficulty[1]) / 2 : DIFFICULTY_RAMP.start + (DIFFICULTY_RAMP.end - DIFFICULTY_RAMP.start) * slot.position;
    let best: BankItem | null = null;
    let bestScore = -Infinity;
    for (const q of pool) {
      if (used.has(q.id) || exclude.has(q.id)) continue;
      if (!accept.includes(q.type) || Math.abs(q.marks - slot.marks) > 1e-9) continue;
      if (slot.competency && !slot.competency.split('+').includes(q.competency)) continue;
      if (slot.difficulty && (q.difficulty < slot.difficulty[0] || q.difficulty > slot.difficulty[1])) continue;
      let score = 0;
      if (!usedUnits.has(q.unit)) score += 3;
      else score -= 0.5 * (usedUnits.get(q.unit)! / Math.max(1, chosen.length));
      if (q.topic_ids.some((t) => !coveredTopics.has(t))) score += 2;
      score -= Math.abs(q.difficulty - target);
      if (q.type !== slot.type) score -= 0.25; // prefer the exact type
      if (slot.group && groupUnit.has(slot.group)) score += groupUnit.get(slot.group) === q.unit ? 2 : -1;
      if (score > bestScore) {
        bestScore = score;
        best = q;
      }
    }
    if (!best) {
      const key = `${slot.section}|${slot.type}|${slot.marks}|${slot.competency}|${slot.difficulty}`;
      const prev = shortage.get(key);
      if (prev) prev.missing++;
      else
        shortage.set(key, {
          ...base,
          section: slot.section,
          type: slot.type,
          marks: slot.marks,
          competency: slot.competency,
          difficulty: slot.difficulty,
          chapters: spec.chapters,
          missing: 1,
          reason: `not enough unused ${slot.type} (${slot.marks} mark${slot.marks === 1 ? '' : 's'}) questions in scope`,
        });
      continue;
    }
    used.add(best.id);
    usedUnits.set(best.unit, (usedUnits.get(best.unit) ?? 0) + 1);
    best.topic_ids.forEach((t) => coveredTopics.add(t));
    if (slot.group && !groupUnit.has(slot.group)) groupUnit.set(slot.group, best.unit);
    chosen.push({ slot, q: best });
  }
  if (shortage.size) return { ok: false, requests: [...shortage.values()] };

  // Lay out: blueprint section and item order; inside an item, easier first; choice groups stay together.
  const sections = bp.sections.map((s) => {
    const inSection = chosen.filter((c) => c.slot.section === s.id);
    const blocks: { key: string; itemIndex: number; difficulty: number; members: typeof inSection }[] = [];
    for (const c of inSection) {
      const key = c.slot.group ?? c.q.id;
      const block = blocks.find((b) => b.key === key);
      if (block) block.members.push(c);
      else blocks.push({ key, itemIndex: c.slot.itemIndex, difficulty: 0, members: [c] });
    }
    blocks.forEach((b) => (b.difficulty = Math.min(...b.members.map((m) => m.q.difficulty))));
    blocks.sort((a, b) => a.itemIndex - b.itemIndex || a.difficulty - b.difficulty);
    const groups = [...new Map(inSection.filter((c) => c.slot.group).map((c) => [c.slot.group!, c.slot.attempt])).entries()].map(([id, attempt]) => ({ id, attempt }));
    return {
      id: s.id,
      title: s.title,
      instructions: s.instructions,
      items: blocks.flatMap((b) => b.members.map((m) => ({ question_id: m.q.id, question_version: m.q.version, marks: m.q.marks, choice_group: m.slot.group }))),
      choice_groups: groups,
    };
  });
  const test = TestDefinition.parse({
    id: spec.id,
    kind: kindFor(bp.paper_type),
    paper_type: bp.paper_type,
    blueprint_id: bp.id,
    title: spec.title,
    subject_id: spec.subjectId,
    chapter_ids: spec.chapters,
    duration_min: bp.duration_min,
    total_marks: bp.total_marks,
    shuffle: false,
    sections,
    seed: spec.seed,
    version: 1,
  });
  return { ok: true, test, used: [...used] };
}
