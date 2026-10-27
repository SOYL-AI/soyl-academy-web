/**
 * Stage 7 blueprint engine (ARCHITECTURE §9): constrained, deterministic (seeded) selection of
 * question versions from a bank to fill a blueprint exactly.
 *
 * Constraints, in order:
 *   - hard: type (with the blueprint's documented mapping: a `short`/`long` slot also takes a
 *     `numerical` of the same marks, since board numericals carry step marks), marks_each exactly,
 *     competency and difficulty range when the item sets them, not already in this paper, not in
 *     the series' exclusion set ("no repeats across a series"), not a practice-only item (tagged
 *     with any project / periodic-assessment-only topic), not a near-duplicate of a question already
 *     in the paper (`conflicts`), scope chapters only, and the
 *     section's / item's own chapter scope when the blueprint sets one (discipline sections:
 *     Science Biology / Chemistry / Physics, Social Science History / Geography / …);
 *   - multi-chapter scopes: every chapter in scope must have questions in the bank, otherwise the
 *     paper is not built (a syllabus paper from one chapter is not a board paper);
 *   - unit weightage (board papers, `unitTargets` from the syllabus unit marks): the attempted marks
 *     of every syllabus unit equal its target exactly. Slots are allocated to units first (largest
 *     marks first, a bounded seeded search that respects section scopes and what the bank holds),
 *     and both alternatives of an internal choice come from the same unit;
 *   - soft (scored): chapter spread (unused chapter +3), topic coverage (new topic +2), difficulty
 *     curve (target ramps from easy to hard across the paper; −|d − target|), the blueprint's
 *     competency mark shares (under-filled share preferred), questions in `avoid` (−6: another track's
 *     papers), internal-choice alternatives from the
 *     same chapter as their partner (+2); ties broken by the seeded shuffle of the id-sorted bank,
 *     so the same bank gives the same paper whatever order the bank was read in;
 *   - competency balance (board-pattern papers, `competencyTargets` from the blueprint `mark_shares`,
 *     COMPETENCY_BALANCE in config/pipeline.ts): after the greedy fill, single swaps inside the same
 *     slot and unit (so blueprint layout and unit weightage are untouched) move the attempted marks per
 *     band (recall+understanding / application / analysis+evaluation) to the targets. Marks are
 *     counted per part for case items (`competency_marks`) and averaged over the alternatives of an
 *     internal choice; the swaps also make the alternatives of a choice test the same bands, so the
 *     shares hold whichever alternative a student attempts.
 * Shortages never fail silently: they come back as GenerationRequest records (what to generate,
 * for which chapters) and no TestDefinition is produced for that paper. A paper that is complete but
 * misses a competency target by more than the tolerance is built and returned with `shortfalls`
 * (generation requests for the band it lacks); callers record them like any other request.
 */
import { createRng } from '@soyl/ai-core';
import { Competency, TestDefinition, type Blueprint, type PaperType, type QuestionType, type TestKind } from '@soyl/shared/content/index';
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
  /**
   * Marks per competency when they differ from `competency` (case items: per part, see
   * competencyMarksOf). Absent: all marks count at `competency`.
   */
  competency_marks?: CompetencyMarks;
}

export type CompetencyMarks = Partial<Record<z.infer<typeof Competency>, number>>;

interface PartLike {
  marks: number;
  competency: string;
  alternatives?: readonly { competency: string }[] | null;
}

/**
 * Marks per competency of a question with parts (case / source-based): each part counts at its own
 * competency, and a part with internal-choice alternatives splits its marks equally between them (the
 * student attempts one). Undefined when the question has no parts or the parts do not add up to its
 * marks (then the question's own competency applies).
 */
export function competencyMarksOf(q: { marks: number; children?: readonly PartLike[] | null }): CompetencyMarks | undefined {
  const parts = q.children ?? [];
  if (!parts.length) return undefined;
  const out: Record<string, number> = {};
  let sum = 0;
  for (const c of parts) {
    const comps = [c.competency, ...(c.alternatives ?? []).map((a) => a.competency)];
    for (const comp of comps) {
      if (!Competency.safeParse(comp).success) return undefined;
      out[comp] = (out[comp] ?? 0) + c.marks / comps.length;
    }
    sum += c.marks;
  }
  return Math.abs(sum - q.marks) > 1e-9 ? undefined : (out as CompetencyMarks);
}

/** Attempted marks a paper must carry in one competency band of the blueprint's `mark_shares`. */
export interface CompetencyTarget {
  /** The mark_shares key, e.g. "recall+understanding". */
  band: string;
  competencies: z.infer<typeof Competency>[];
  marks: number;
}

/** Fraction of a question's marks in each target band (index-aligned with `targets`). */
export function bandFractions(q: Pick<BankItem, 'marks' | 'competency' | 'competency_marks'>, targets: readonly CompetencyTarget[]): number[] {
  const out = targets.map(() => 0);
  const cm: CompetencyMarks = q.competency_marks ?? { [q.competency]: q.marks };
  for (const [comp, m] of Object.entries(cm)) {
    const i = targets.findIndex((t) => t.competencies.includes(comp as z.infer<typeof Competency>));
    if (i >= 0 && q.marks > 0) out[i]! += (m ?? 0) / q.marks;
  }
  return out;
}

/** One item of a paper for the band arithmetic: its marks, band fractions and internal-choice group. */
interface BandEntry {
  marks: number;
  f: readonly number[];
  group: string | null;
  /** Alternatives the student attempts in the group (1 of 2 on CBSE papers). */
  attempt: number;
}

/**
 * Attempted marks per band: `avg` shares each choice group's attempted marks equally between its
 * alternatives; `lo` / `hi` are the least and the most a band can carry over every way a student can
 * choose (per band, the `attempt` alternatives with the fewest / most marks in it).
 */
function bandRange(entries: readonly BandEntry[], bands: number): { avg: number[]; lo: number[]; hi: number[] } {
  const avg = Array.from({ length: bands }, () => 0);
  const lo = [...avg];
  const hi = [...avg];
  const groups = new Map<string, BandEntry[]>();
  for (const e of entries) {
    if (e.group) groups.set(e.group, [...(groups.get(e.group) ?? []), e]);
    else e.f.forEach((x, b) => ((avg[b]! += e.marks * x), (lo[b]! += e.marks * x), (hi[b]! += e.marks * x)));
  }
  for (const members of groups.values()) {
    const attempt = Math.min(members[0]!.attempt, members.length);
    for (let b = 0; b < bands; b++) {
      const v = members.map((m) => m.marks * m.f[b]!).sort((x, y) => x - y);
      avg[b]! += (attempt * v.reduce((n, x) => n + x, 0)) / v.length;
      lo[b]! += v.slice(0, attempt).reduce((n, x) => n + x, 0);
      hi[b]! += v.slice(-attempt).reduce((n, x) => n + x, 0);
    }
  }
  return { avg, lo, hi };
}

function testBandEntries(test: TestDefinition, find: (questionId: string) => Pick<BankItem, 'marks' | 'competency' | 'competency_marks'> | undefined, targets: readonly CompetencyTarget[]): BandEntry[] {
  return test.sections.flatMap((s) => {
    const attempts = new Map(s.choice_groups.map((g) => [g.id, g.attempt]));
    return s.items.flatMap((it) => {
      const q = find(it.question_id);
      return q ? [{ marks: it.marks, f: bandFractions(q, targets), group: it.choice_group ? `${s.id}/${it.choice_group}` : null, attempt: it.choice_group ? (attempts.get(it.choice_group) ?? 1) : 1 }] : [];
    });
  });
}

/**
 * Attempted marks per competency band of a test, with the range over every way a student can choose
 * between internal-choice alternatives (see bandRange).
 */
export function competencyRangeByBand(test: TestDefinition, find: (questionId: string) => Pick<BankItem, 'marks' | 'competency' | 'competency_marks'> | undefined, targets: readonly CompetencyTarget[]): { avg: number[]; lo: number[]; hi: number[] } {
  return bandRange(testBandEntries(test, find, targets), targets.length);
}

/**
 * Attempted marks per competency band of a test. Ungrouped items count fully; the alternatives of
 * an internal choice share the group's attempted marks equally (whichever the student picks).
 */
export function competencyMarksByBand(test: TestDefinition, find: (questionId: string) => Pick<BankItem, 'marks' | 'competency' | 'competency_marks'> | undefined, targets: readonly CompetencyTarget[]): number[] {
  const out = targets.map(() => 0);
  for (const s of test.sections) {
    const attempts = new Map(s.choice_groups.map((g) => [g.id, g.attempt]));
    const sizes = new Map<string, number>();
    for (const it of s.items) if (it.choice_group) sizes.set(it.choice_group, (sizes.get(it.choice_group) ?? 0) + 1);
    for (const it of s.items) {
      const q = find(it.question_id);
      if (!q) continue;
      const w = it.choice_group ? (it.marks * (attempts.get(it.choice_group) ?? 1)) / sizes.get(it.choice_group)! : it.marks;
      bandFractions(q, targets).forEach((f, i) => (out[i]! += w * f));
    }
  }
  return out;
}

/** Attempted marks a syllabus unit must carry in a paper (board papers: the syllabus unit marks). */
export interface UnitTarget {
  unit: string;
  chapters: string[];
  marks: number;
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
  /** Exact unit weightage; the targets must add up to the blueprint's total marks. */
  unitTargets?: UnitTarget[];
  /**
   * Topics the board does not assess (syllabus `board_assessed: false`: project / periodic-assessment
   * only, and every topic of a chapter that is not board-assessed). A question tagged with any of them
   * is practice, never part of this paper.
   */
  practiceOnlyTopics?: ReadonlySet<string>;
  /** Near-duplicate questions (stem similarity, ORIGINALITY.samePaper): never two of a group in one paper. */
  conflicts?: ReadonlyMap<string, ReadonlySet<string>>;
  /** Soft: questions to avoid when the bank allows (the May track avoids the main mocks' questions). */
  avoid?: ReadonlySet<string>;
  /**
   * Competency balance (board-pattern papers): attempted marks per band. The paper is balanced towards
   * them by swaps; a band still more than `competencyTolerance` marks off becomes a shortfall request.
   */
  competencyTargets?: CompetencyTarget[];
  /** Allowed deviation per band, in marks (COMPETENCY_BALANCE.toleranceMarks). */
  competencyTolerance?: number;
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

/**
 * `shortfalls`: the paper is complete but a competency band is off target by more than the tolerance;
 * each entry asks for questions of the missing band (same slot types and units). Never silent.
 */
export type PaperResult = { ok: true; test: TestDefinition; used: string[]; shortfalls?: GenerationRequest[] } | { ok: false; requests: GenerationRequest[] };

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
  /** Section / item chapter scope (null = the paper's scope). */
  chapters: readonly string[] | null;
  /** 0..1 position in the paper (difficulty ramp). */
  position: number;
}

/** One unit of allocation: a single slot, or every alternative of one internal-choice group. */
interface Block {
  slots: Slot[];
  /** Attempted marks the block adds to the paper. */
  counted: number;
  /** Availability key (slot predicate). */
  key: string;
}

function slotsOf(bp: Blueprint): Slot[] {
  const slots: Omit<Slot, 'position'>[] = [];
  for (const s of bp.sections) {
    let g = 0;
    s.items.forEach((it, itemIndex) => {
      const chapters = it.chapters ?? s.chapters ?? null;
      const base = { section: s.id, itemIndex, type: it.type, marks: it.marks_each, competency: it.competency, difficulty: it.difficulty, chapters };
      if (it.internal_choice) {
        const groups = Math.floor(it.count / it.internal_choice.of);
        for (let k = 0; k < groups; k++) {
          const group = `${s.id}-c${++g}`;
          for (let j = 0; j < it.internal_choice.of; j++) slots.push({ ...base, group, attempt: it.internal_choice.attempt });
        }
      } else for (let k = 0; k < it.count; k++) slots.push({ ...base, group: null, attempt: 1 });
    });
  }
  return slots.map((s, i) => ({ ...s, position: slots.length > 1 ? i / (slots.length - 1) : 0.5 }));
}

function blocksOf(slots: Slot[]): Block[] {
  const blocks: Block[] = [];
  const byGroup = new Map<string, Block>();
  for (const s of slots) {
    const key = `${s.section}|${s.type}|${s.marks}|${s.competency}|${s.difficulty}|${s.chapters?.join(',') ?? '*'}`;
    if (s.group) {
      const b = byGroup.get(s.group);
      if (b) {
        b.slots.push(s);
        continue;
      }
      const nb: Block = { slots: [s], counted: s.marks * s.attempt, key };
      byGroup.set(s.group, nb);
      blocks.push(nb);
    } else blocks.push({ slots: [s], counted: s.marks, key });
  }
  return blocks;
}

const DIFFICULTY_RAMP = { start: 1.8, end: 3.8 } as const;
/** Search budget for the unit allocation (nodes); beyond it the paper is reported as a shortage. */
const ALLOCATION_NODE_LIMIT = 200_000;

function accepts(slot: Slot, q: BankItem, scope: ReadonlySet<string> | null): boolean {
  const accept = SLOT_COMPATIBLE[slot.type] ?? [slot.type];
  if (!accept.includes(q.type) || Math.abs(q.marks - slot.marks) > 1e-9) return false;
  if (slot.competency && !slot.competency.split('+').includes(q.competency)) return false;
  if (slot.difficulty && (q.difficulty < slot.difficulty[0] || q.difficulty > slot.difficulty[1])) return false;
  if (slot.chapters && !slot.chapters.includes(q.unit)) return false;
  if (scope && !scope.has(q.unit)) return false;
  return true;
}

/**
 * Allocates every block to a unit so that each unit's attempted marks equal its target exactly.
 * Deterministic: units are tried by remaining share (largest first), ties by the seeded order.
 */
function allocateUnits(
  blocks: Block[],
  targets: UnitTarget[],
  candidates: (b: Block, unit: number) => number,
  order: number[],
): { ok: true; units: number[] } | { ok: false; block: Block; open: number[] } {
  const rem = targets.map((t) => t.marks);
  const eligible = blocks.map((b) => targets.map((_, u) => u).filter((u) => candidates(b, u) >= b.slots.length));
  // Remaining capacity per unit (sum of counted marks of later blocks that may go to it), for pruning.
  const capAfter: number[][] = blocks.map(() => targets.map(() => 0));
  for (let i = blocks.length - 2; i >= 0; i--) for (let u = 0; u < targets.length; u++) capAfter[i]![u] = capAfter[i + 1]![u]! + (eligible[i + 1]!.includes(u) ? blocks[i + 1]!.counted : 0);
  const used = new Map<string, number>();
  const units: number[] = [];
  let nodes = 0;
  let deepest = { i: -1, open: [] as number[] };
  const rank = new Map(order.map((u, i) => [u, i]));
  const dfs = (i: number): boolean => {
    if (i === blocks.length) return rem.every((r) => Math.abs(r) < 1e-9);
    if (++nodes > ALLOCATION_NODE_LIMIT) return false;
    if (i > deepest.i) deepest = { i, open: rem.map((r, u) => (r > 1e-9 ? u : -1)).filter((u) => u >= 0) };
    const b = blocks[i]!;
    const opts = eligible[i]!
      .filter((u) => rem[u]! - b.counted > -1e-9 && candidates(b, u) - (used.get(`${u}|${b.key}`) ?? 0) >= b.slots.length)
      .sort((x, y) => rem[y]! / targets[y]!.marks - rem[x]! / targets[x]!.marks || rank.get(x)! - rank.get(y)!);
    for (const u of opts) {
      rem[u]! -= b.counted;
      // Prune: every unit must still be reachable with the blocks left.
      if (rem.every((r, v) => r < 1e-9 || capAfter[i]![v]! - r > -1e-9)) {
        const k = `${u}|${b.key}`;
        used.set(k, (used.get(k) ?? 0) + b.slots.length);
        units.push(u);
        if (dfs(i + 1)) return true;
        units.pop();
        used.set(k, used.get(k)! - b.slots.length);
      }
      rem[u]! += b.counted;
    }
    return false;
  };
  if (dfs(0)) return { ok: true, units };
  const at = Math.min(Math.max(deepest.i, 0), blocks.length - 1);
  return { ok: false, block: blocks[at]!, open: deepest.open };
}

export function assemblePaper(spec: PaperSpec, bank: readonly BankItem[]): PaperResult {
  const bp = spec.blueprint;
  const scope = new Set(spec.chapters);
  const exclude = spec.exclude ?? new Set<string>();
  const rng = createRng(spec.seed);
  const sorted = [...bank].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const practiceOnly = spec.practiceOnlyTopics;
  const pool = rng.shuffle(sorted.filter((q) => scope.has(q.unit) && !(practiceOnly && q.topic_ids.some((t) => practiceOnly.has(t)))));
  const requests: GenerationRequest[] = [];
  const base = { paper_id: spec.id, blueprint_id: bp.id };

  if (!pool.length) {
    requests.push({ ...base, section: null, type: '*', marks: null, competency: null, difficulty: null, chapters: spec.chapters, missing: bp.sections.reduce((n, s) => n + s.items.reduce((m, it) => m + it.count, 0), 0), reason: 'no published questions in scope yet: generate and publish the chapter first' });
    return { ok: false, requests };
  }
  if (spec.chapters.length > 1) {
    const empty = spec.chapters.filter((c) => !pool.some((q) => q.unit === c));
    if (empty.length) {
      requests.push({ ...base, section: null, type: '*', marks: null, competency: null, difficulty: null, chapters: empty, missing: empty.length, reason: `${empty.length} of ${spec.chapters.length} chapters in scope have no published questions; generate and publish them first` });
      return { ok: false, requests };
    }
  }

  const slots = slotsOf(bp);
  const blocks = blocksOf(slots).map((b, i) => ({ b, i })).sort((x, y) => y.b.counted - x.b.counted || x.i - y.i).map((x) => x.b);
  const available = pool.filter((q) => !exclude.has(q.id));

  // Unit weightage: allocate blocks to units before choosing questions.
  const targets = (spec.unitTargets ?? []).map((t) => ({ ...t, chapters: t.chapters.filter((c) => scope.has(c)) })).filter((t) => t.marks > 0);
  let unitOfBlock: (Set<string> | null)[] = blocks.map(() => null);
  if (targets.length) {
    const sets = targets.map((t) => new Set(t.chapters));
    const counts = new Map<string, number>();
    const candidates = (b: Block, u: number) => {
      const k = `${u}|${b.key}`;
      let n = counts.get(k);
      if (n === undefined) {
        n = available.filter((q) => accepts(b.slots[0]!, q, sets[u]!)).length;
        counts.set(k, n);
      }
      return n;
    };
    // Plain shortages first: blocks of one kind that need more questions than every unit together holds.
    const demand = new Map<string, { block: Block; need: number }>();
    for (const b of blocks) {
      const d = demand.get(b.key) ?? { block: b, need: 0 };
      d.need += b.slots.length;
      demand.set(b.key, d);
    }
    for (const { block, need } of demand.values()) {
      const have = available.filter((q) => accepts(block.slots[0]!, q, null)).length;
      if (have >= need) continue;
      const s = block.slots[0]!;
      requests.push({ ...base, section: s.section, type: s.type, marks: s.marks, competency: s.competency, difficulty: s.difficulty, chapters: s.chapters ? spec.chapters.filter((c) => s.chapters!.includes(c)) : spec.chapters, missing: need - have, reason: `not enough unused ${s.type} (${s.marks} mark${s.marks === 1 ? '' : 's'}) questions in scope` });
    }
    if (requests.length) return { ok: false, requests };
    const order = rng.shuffle(targets.map((_, u) => u));
    const alloc = allocateUnits(blocks, targets, candidates, order);
    if (!alloc.ok) {
      const s = alloc.block.slots[0]!;
      const chapters = alloc.open.flatMap((u) => targets[u]!.chapters).filter((c) => !s.chapters || s.chapters.includes(c));
      requests.push({
        ...base,
        section: s.section,
        type: s.type,
        marks: s.marks,
        competency: s.competency,
        difficulty: s.difficulty,
        chapters: chapters.length ? chapters : spec.chapters,
        missing: alloc.block.slots.length,
        reason: `unit weightage cannot be met from the bank: not enough unused ${s.type} (${s.marks} mark${s.marks === 1 ? '' : 's'}) questions in ${alloc.open.map((u) => targets[u]!.unit).join(' / ') || 'the units in scope'}`,
      });
      return { ok: false, requests };
    }
    unitOfBlock = alloc.units.map((u) => sets[u]!);
  }

  // Competency mark shares (soft): target attempted marks per share group ("recall+understanding" …).
  const shareGroups = Object.entries(bp.mark_shares).map(([k, share]) => ({ comps: new Set(k.split('+')), target: share * bp.total_marks, assigned: 0 }));
  const groupOf = (c: string) => shareGroups.find((g) => g.comps.has(c)) ?? null;
  // Competency balance (board-pattern papers): per-part marks, choice alternatives weighted equally.
  const cTargets = spec.competencyTargets?.length ? spec.competencyTargets : null;
  const cAssigned = cTargets ? cTargets.map(() => 0) : [];
  const fracCache = new Map<string, number[]>();
  const fracs = (q: BankItem) => fracCache.get(q.id) ?? fracCache.set(q.id, bandFractions(q, cTargets ?? [])).get(q.id)!;

  const used = new Set<string>();
  const usedUnits = new Map<string, number>();
  const coveredTopics = new Set<string>();
  const chosen: { slot: Slot; q: BankItem; weight: number; unitScope: Set<string> | null; target: number }[] = [];
  const groupUnit = new Map<string, string>();
  const shortage = new Map<string, GenerationRequest>();

  blocks.forEach((block, bi) => {
    const unitScope = unitOfBlock[bi] ?? null;
    block.slots.forEach((slot, member) => {
      const counted = member === 0 ? block.counted : 0;
      const weight = block.counted / block.slots.length;
      const target = slot.difficulty ? (slot.difficulty[0] + slot.difficulty[1]) / 2 : DIFFICULTY_RAMP.start + (DIFFICULTY_RAMP.end - DIFFICULTY_RAMP.start) * slot.position;
      let best: BankItem | null = null;
      let bestScore = -Infinity;
      for (const q of available) {
        if (used.has(q.id) || !accepts(slot, q, unitScope)) continue;
        const near = spec.conflicts?.get(q.id);
        if (near && [...near].some((id) => used.has(id))) continue;
        let score = 0;
        if (!usedUnits.has(q.unit)) score += 3;
        else score -= 0.5 * (usedUnits.get(q.unit)! / Math.max(1, chosen.length));
        if (q.topic_ids.some((t) => !coveredTopics.has(t))) score += 2;
        score -= Math.abs(q.difficulty - target);
        if (q.type !== slot.type) score -= 0.25; // prefer the exact type
        if (spec.avoid?.has(q.id)) score -= 6;
        if (slot.group && groupUnit.has(slot.group)) score += groupUnit.get(slot.group) === q.unit ? 2 : -1;
        if (cTargets) fracs(q).forEach((f, i) => (score += f * 3 * Math.max(-1, Math.min(1, (cTargets[i]!.marks - cAssigned[i]!) / weight))));
        else {
          const g = counted ? groupOf(q.competency) : null;
          if (g) score += 3 * Math.max(-1, Math.min(1, (g.target - g.assigned) / counted));
        }
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
            chapters: slot.chapters ? spec.chapters.filter((c) => slot.chapters!.includes(c)) : spec.chapters,
            missing: 1,
            reason: `not enough unused ${slot.type} (${slot.marks} mark${slot.marks === 1 ? '' : 's'}) questions in scope`,
          });
        return;
      }
      used.add(best.id);
      usedUnits.set(best.unit, (usedUnits.get(best.unit) ?? 0) + 1);
      best.topic_ids.forEach((t) => coveredTopics.add(t));
      if (slot.group && !groupUnit.has(slot.group)) groupUnit.set(slot.group, best.unit);
      const g = counted ? groupOf(best.competency) : null;
      if (g) g.assigned += counted;
      if (cTargets) fracs(best).forEach((f, i) => (cAssigned[i]! += weight * f));
      chosen.push({ slot, q: best, weight, unitScope, target });
    });
  });
  if (shortage.size) return { ok: false, requests: [...shortage.values()] };

  const shortfalls = cTargets ? balanceCompetency(spec, cTargets, cAssigned, chosen, available, used, fracs, base) : [];

  // Lay out: blueprint section and item order; inside an item, easier first; choice groups stay together.
  const sections = bp.sections.map((s) => {
    const inSection = chosen.filter((c) => c.slot.section === s.id).sort((a, b) => slots.indexOf(a.slot) - slots.indexOf(b.slot));
    const blocksOut: { key: string; itemIndex: number; difficulty: number; members: typeof inSection }[] = [];
    for (const c of inSection) {
      const key = c.slot.group ?? c.q.id;
      const block = blocksOut.find((b) => b.key === key);
      if (block) block.members.push(c);
      else blocksOut.push({ key, itemIndex: c.slot.itemIndex, difficulty: 0, members: [c] });
    }
    blocksOut.forEach((b) => (b.difficulty = Math.min(...b.members.map((m) => m.q.difficulty))));
    blocksOut.sort((a, b) => a.itemIndex - b.itemIndex || a.difficulty - b.difficulty);
    const groups = [...new Map(inSection.filter((c) => c.slot.group).map((c) => [c.slot.group!, c.slot.attempt])).entries()].map(([id, attempt]) => ({ id, attempt }));
    return {
      id: s.id,
      title: s.title,
      instructions: s.instructions,
      items: blocksOut.flatMap((b) => b.members.map((m) => ({ question_id: m.q.id, question_version: m.q.version, marks: m.q.marks, choice_group: m.slot.group }))),
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
  return { ok: true, test, used: [...used], ...(shortfalls.length ? { shortfalls } : {}) };
}

/** Swap rounds of the competency balance (each round makes the best single improving swap). */
const BALANCE_MAX_ROUNDS = 400;
/** Weight of internal-choice band mismatch against band deviation (both in marks) in the balance. */
const CHOICE_MISMATCH_WEIGHT = 2;

/**
 * Competency balance (see the header): repeatedly makes the single swap — same slot, same unit scope,
 * no repeat, no near-duplicate — that most reduces Σ |attempted − target| over the bands; candidates
 * in `avoid` pay 0.5, and a closer difficulty breaks ties. Mutates `chosen`, `used` and `assigned`.
 * Returns shortfall requests for every band still more than the tolerance off target.
 */
function balanceCompetency(
  spec: PaperSpec,
  targets: readonly CompetencyTarget[],
  assigned: number[],
  chosen: { slot: Slot; q: BankItem; weight: number; unitScope: Set<string> | null; target: number }[],
  available: readonly BankItem[],
  used: Set<string>,
  fracs: (q: BankItem) => number[],
  base: { paper_id: string; blueprint_id: string },
): GenerationRequest[] {
  const dev = (a: readonly number[]) => a.reduce((n, x, i) => n + Math.abs(x - targets[i]!.marks), 0);
  // Internal choice: alternatives of one group should test the same bands, so the shares hold whichever
  // alternative a student picks. Mismatch of a group = its attempted marks × half the band-wise spread.
  const groups = new Map<string, number[]>();
  chosen.forEach((c, i) => c.slot.group && groups.set(c.slot.group, [...(groups.get(c.slot.group) ?? []), i]));
  const groupMismatch = (idx: readonly number[], at = -1, f: number[] | null = null) => {
    const fs = idx.map((i) => (i === at && f ? f : fracs(chosen[i]!.q)));
    const counted = idx.reduce((n, i) => n + chosen[i]!.weight, 0);
    return (counted / 2) * targets.reduce((n, _, b) => n + Math.max(...fs.map((x) => x[b]!)) - Math.min(...fs.map((x) => x[b]!)), 0);
  };
  const mismatchOf = new Map([...groups].map(([g, idx]) => [g, groupMismatch(idx)]));
  const total = (a: readonly number[], mismatch: number) => dev(a) + CHOICE_MISMATCH_WEIGHT * mismatch;
  for (let round = 0; round < BALANCE_MAX_ROUNDS; round++) {
    const mismatch = [...mismatchOf.values()].reduce((n, x) => n + x, 0);
    const current = total(assigned, mismatch);
    if (current < 1e-9) break;
    let best: { at: number; q: BankItem; next: number[]; groupMismatch: number | null; key: number } | null = null;
    for (const [at, c] of chosen.entries()) {
      const out = fracs(c.q);
      const idx = c.slot.group ? groups.get(c.slot.group)! : null;
      for (const q of available) {
        if (used.has(q.id) || !accepts(c.slot, q, c.unitScope)) continue;
        const near = spec.conflicts?.get(q.id);
        if (near && [...near].some((id) => id !== c.q.id && used.has(id))) continue;
        const inn = fracs(q);
        const next = assigned.map((x, i) => x + c.weight * (inn[i]! - out[i]!));
        const gm = idx ? groupMismatch(idx, at, inn) : null;
        const gain = current - total(next, gm === null ? mismatch : mismatch - mismatchOf.get(c.slot.group!)! + gm);
        if (gain < 1e-9) continue;
        const key = gain - (spec.avoid?.has(q.id) ? 0.5 : 0) - 0.01 * Math.abs(q.difficulty - c.target);
        if (!best || key > best.key + 1e-12) best = { at, q, next, groupMismatch: gm, key };
      }
    }
    if (!best) break;
    const b = best;
    const slot = chosen[b.at]!.slot;
    used.delete(chosen[b.at]!.q.id);
    used.add(b.q.id);
    chosen[b.at] = { ...chosen[b.at]!, q: b.q };
    b.next.forEach((x, i) => (assigned[i] = x));
    if (slot.group && b.groupMismatch !== null) mismatchOf.set(slot.group, b.groupMismatch);
  }

  // The tolerance must hold whichever internal-choice alternatives a student attempts.
  const tol = spec.competencyTolerance ?? 0;
  const range = bandRange(
    chosen.map((c) => ({ marks: c.q.marks, f: fracs(c.q), group: c.slot.group, attempt: c.slot.attempt })),
    targets.length,
  );
  const lowOut = targets.map((t, i) => range.lo[i]! < t.marks - tol - 1e-9);
  const highOut = targets.map((t, i) => range.hi[i]! > t.marks + tol + 1e-9);
  if (!lowOut.some(Boolean) && !highOut.some(Boolean)) return [];
  // Bands to ask for: every band that can fall more than the tolerance below its target; if only an
  // excess is out of tolerance, the band furthest below its target on average.
  const off = targets.map((t, i) => assigned[i]! - t.marks);
  let short = lowOut.map((x, i) => (x ? i : -1)).filter((i) => i >= 0);
  if (!short.length) short = [off.indexOf(Math.min(...off))];
  const fmt = (x: number) => String(Math.round(x * 10) / 10);
  const summary = targets.map((t, i) => `${t.band} ${fmt(assigned[i]!)}${Math.abs(range.hi[i]! - range.lo[i]!) > 1e-9 ? ` (${fmt(range.lo[i]!)}–${fmt(range.hi[i]!)} by choice)` : ''}/${fmt(t.marks)}`).join(', ');
  const spread = (c: (typeof chosen)[number]) => (c.slot.group ? (mismatchOf.get(c.slot.group) ?? 0) : 0);
  const out: GenerationRequest[] = [];
  for (const bi of short) {
    // Slots that could carry more of the short band — alternatives of a mismatched choice first, then
    // slots holding over-target bands, largest first: that is where a question of the band would go.
    let need = targets[bi]!.marks - range.lo[bi]!;
    const byKey = new Map<string, GenerationRequest>();
    const hosts = chosen
      .map((c) => ({ c, movable: c.weight * fracs(c.q).reduce((n, f, i) => n + (i !== bi && (off[i]! > 0 || spread(c) > 1e-9) ? f : 0), 0) }))
      .filter((h) => h.movable > 1e-9)
      .sort((x, y) => spread(y.c) - spread(x.c) || y.movable - x.movable);
    for (const { c, movable } of hosts) {
      if (need <= 1e-9) break;
      need -= movable;
      const chapters = c.unitScope ? spec.chapters.filter((ch) => c.unitScope!.has(ch)) : c.slot.chapters ? spec.chapters.filter((ch) => c.slot.chapters!.includes(ch)) : spec.chapters;
      const key = `${c.slot.section}|${c.slot.type}|${c.slot.marks}`;
      const prev = byKey.get(key);
      if (prev) {
        prev.missing++;
        prev.chapters = spec.chapters.filter((ch) => prev.chapters.includes(ch) || chapters.includes(ch));
      } else
        byKey.set(key, {
          ...base,
          section: c.slot.section,
          type: c.slot.type,
          marks: c.slot.marks,
          competency: targets[bi]!.band,
          difficulty: c.slot.difficulty,
          chapters,
          missing: 1,
          reason: `competency balance (±${fmt(tol)} marks) not met: ${summary}; not enough unused ${targets[bi]!.band.replace(/\+/g, '/')} ${c.slot.type} (${c.slot.marks} mark${c.slot.marks === 1 ? '' : 's'}) questions in these chapters`,
        });
    }
    if (!byKey.size)
      byKey.set('*', { ...base, section: null, type: '*', marks: null, competency: targets[bi]!.band, difficulty: null, chapters: spec.chapters, missing: 1, reason: `competency balance (±${fmt(tol)} marks) not met: ${summary}` });
    out.push(...byKey.values());
  }
  return out;
}

/**
 * Attempted marks per key (chapter, unit …) of a test: ungrouped items count fully; in a choice group
 * the first `attempt` alternatives count (with unit weightage every alternative shares their unit).
 */
export function attemptedMarksBy(test: TestDefinition, keyOf: (questionId: string) => string): Map<string, number> {
  const out = new Map<string, number>();
  for (const s of test.sections) {
    const attempts = new Map(s.choice_groups.map((g) => [g.id, g.attempt]));
    const seen = new Map<string, number>();
    for (const it of s.items) {
      const unit = keyOf(it.question_id);
      if (it.choice_group) {
        const n = seen.get(it.choice_group) ?? 0;
        seen.set(it.choice_group, n + 1);
        if (n >= (attempts.get(it.choice_group) ?? 1)) continue;
      }
      out.set(unit, (out.get(unit) ?? 0) + it.marks);
    }
  }
  return out;
}
