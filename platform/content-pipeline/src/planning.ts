/**
 * Deterministic planning: question plans (counts by type, difficulty, competency), deck parts,
 * the skeleton lesson outline (used for estimates before an outline exists, and by the mock),
 * and how a plan is split into generation batches.
 */
import { CONTENT_TARGETS } from '@soyl/shared/config/content-targets';
import type { Blueprint, ChapterOutline, LessonOutline, OutlineSlide, QuestionPlan, QuestionType, SyllabusChapter } from '@soyl/shared/content/index';
import { TEXT_FAMILIES, type Family } from '../config/families';
import { COMPETENCY_MIX, DEFAULT_TYPE_MIX, DIFFICULTY_MIX, GENERATION, mixKindFor } from '../config/pipeline';

type Competency = keyof typeof COMPETENCY_MIX;

/** Largest-remainder allocation of `total` across weights; with `minEach`, every weight gets at least that many. */
export function allocate(total: number, weights: number[], minEach = 0): number[] {
  if (!weights.length) return [];
  const base = Math.min(minEach, Math.floor(total / weights.length));
  const rest = total - base * weights.length;
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const exact = weights.map((w) => (w / sum) * rest);
  const out = exact.map((x) => Math.floor(x));
  let left = rest - out.reduce((a, b) => a + b, 0);
  const order = exact.map((x, i) => ({ i, r: x - Math.floor(x) })).sort((a, b) => b.r - a.r || a.i - b.i);
  for (let k = 0; left > 0; k = (k + 1) % order.length, left--) out[order[k]!.i]!++;
  return out.map((x) => x + base);
}

export const CASE_TYPES: readonly QuestionType[] = ['case-based', 'source-based'];
const MIN_TYPES = 5;

/** Type mix from blueprints (weighted by item count), topped up from the family default to ≥ 5 types. */
export function typeMix(family: Family, blueprints: Blueprint[]): { mix: { type: QuestionType; share: number; marks: number }[]; sources: string[] } {
  const weights = new Map<QuestionType, { count: number; marks: number }>();
  for (const bp of blueprints)
    for (const item of bp.sections.flatMap((s) => s.items)) {
      const w = weights.get(item.type) ?? { count: 0, marks: item.marks_each };
      w.count += item.count;
      weights.set(item.type, w);
    }
  const defaults = DEFAULT_TYPE_MIX[mixKindFor(family)];
  if (!weights.size) return { mix: defaults, sources: [`default:${mixKindFor(family)}`] };
  const total = [...weights.values()].reduce((a, w) => a + w.count, 0);
  const mix = [...weights.entries()].map(([type, w]) => ({ type, share: w.count / total, marks: w.marks }));
  for (const d of defaults) {
    if (mix.length >= MIN_TYPES) break;
    if (!mix.some((m) => m.type === d.type)) mix.push({ ...d, share: d.share / 2 });
  }
  return { mix, sources: [...blueprints.map((b) => b.id), ...(mix.length > weights.size ? [`default:${mixKindFor(family)}`] : [])] };
}

export function questionPlan(classLevel: number, family: Family, blueprints: Blueprint[]): QuestionPlan {
  const total = CONTENT_TARGETS.practiceQuestionsMin[classLevel] ?? 40;
  const { mix, sources } = typeMix(family, blueprints);
  const counts = allocate(total, mix.map((m) => m.share), 1);
  const difficulty = allocate(total, [...DIFFICULTY_MIX]);
  const competencies = Object.keys(COMPETENCY_MIX) as Competency[];
  const competency = allocate(total, competencies.map((c) => COMPETENCY_MIX[c]));
  return {
    total,
    by_type: mix.map((m, i) => ({ type: m.type, count: counts[i]!, marks: m.marks })).filter((t) => t.count > 0),
    by_difficulty: difficulty.map((count, i) => ({ difficulty: i + 1, count })),
    by_competency: competencies.map((c, i) => ({ competency: c, count: competency[i]! })),
    sources,
  };
}

/** One planned question: what a generation batch must produce, in order. */
export interface QuestionSlot {
  type: QuestionType;
  marks: number;
  difficulty: number;
  competency: Competency;
  topic_id: string;
}

/**
 * Expands a plan into concrete slots. Difficulty and competency are interleaved across types
 * (stable, deterministic) and topics are assigned round-robin so every topic gets questions.
 */
export function planSlots(plan: QuestionPlan, topicIds: string[]): QuestionSlot[] {
  const types = plan.by_type.flatMap((t) => Array.from({ length: t.count }, () => ({ type: t.type, marks: t.marks })));
  const difficulties = plan.by_difficulty.flatMap((d) => Array.from({ length: d.count }, () => d.difficulty));
  const competencies = plan.by_competency.flatMap((c) => Array.from({ length: c.count }, () => c.competency as Competency));
  // Spread: walk the difficulty/competency lists with a stride co-prime to their length.
  const pick = <T>(list: T[], i: number, fallback: T) => (list.length ? list[(i * 7) % list.length]! : fallback);
  return types.map((t, i) => ({
    ...t,
    difficulty: pick(difficulties, i, 3),
    competency: pick(competencies, i, 'understanding' as Competency),
    topic_id: topicIds[i % Math.max(1, topicIds.length)]!,
  }));
}

export interface QuestionBatch {
  key: string;
  asset: 'questions' | 'case-passages';
  slots: QuestionSlot[];
}

export function questionBatches(slots: QuestionSlot[]): QuestionBatch[] {
  const plain = slots.filter((s) => !CASE_TYPES.includes(s.type));
  const cases = slots.filter((s) => CASE_TYPES.includes(s.type));
  const out: QuestionBatch[] = [];
  for (let i = 0; i < plain.length; i += GENERATION.questionsPerBatch)
    out.push({ key: `questions.b${out.length + 1}`, asset: 'questions', slots: plain.slice(i, i + GENERATION.questionsPerBatch) });
  let c = 0;
  for (let i = 0; i < cases.length; i += GENERATION.casesPerBatch)
    out.push({ key: `cases.b${++c}`, asset: 'case-passages', slots: cases.slice(i, i + GENERATION.casesPerBatch) });
  return out;
}

/** Topics per deck part so that each part stays within the slide budget. */
export function partTopics(chapter: Pick<SyllabusChapter, 'topics'>): string[][] {
  const ids = chapter.topics.map((t) => t.id);
  const perPart = Math.max(1, Math.floor((GENERATION.slidesPerPartMax - GENERATION.fixedSlidesPerPart) / GENERATION.slidesPerTopic));
  const parts = Math.max(1, Math.ceil(ids.length / perPart));
  const sizes = allocate(ids.length, Array.from({ length: parts }, () => 1));
  const out: string[][] = [];
  let k = 0;
  for (const n of sizes) {
    out.push(ids.slice(k, k + n));
    k += n;
  }
  return out;
}

const VISUAL_ROTATION: Record<string, OutlineSlide['visual'][]> = {
  maths: ['geometry', 'plot', 'table'],
  physics: ['svg', 'plot', 'flow'],
  chemistry: ['chem', 'svg', 'table'],
  biology: ['svg', 'flow', 'table'],
  science: ['svg', 'chem', 'flow', 'plot', 'table'],
  'computer-science': ['flow', 'table', 'svg'],
  default: ['flow', 'table', 'svg'],
};

/**
 * The skeleton outline: title; per topic a concept slide then a diagram slide; then example
 * (with a visual), two checks, example (with a visual), a check, summary (concept map) and exam
 * tips. It meets every editorial target: 12–25 slides, a visual at least every 3 slides, 2 worked
 * examples, 3 checks, summary and exam tips. Used for dry-run estimates and by the mock provider.
 */
export function skeletonOutline(chapter: SyllabusChapter, family: Family, goals?: string[]): LessonOutline {
  const kinds = VISUAL_ROTATION[family] ?? VISUAL_ROTATION.default!;
  let v = 0;
  const nextVisual = () => kinds[v++ % kinds.length]!;
  const topicTitle = new Map(chapter.topics.map((t) => [t.id, t.title]));
  const groups = partTopics(chapter);
  const parts = groups.map((topicIds, pi) => {
    const perTopic = Math.max(GENERATION.slidesPerTopic, Math.ceil((CONTENT_TARGETS.deckSlidesMin - GENERATION.fixedSlidesPerPart) / topicIds.length));
    const slides: OutlineSlide[] = [
      { layout: 'title', heading: groups.length > 1 ? `${chapter.title} — Part ${pi + 1}` : chapter.title, intent: 'Title and learning goals', topic_ids: [], visual: null },
    ];
    for (const id of topicIds) {
      const title = topicTitle.get(id) ?? id;
      for (let k = 0; k < perTopic; k++) {
        const diagram = k % 2 === 1;
        slides.push({
          layout: diagram ? 'diagram' : 'concept',
          heading: diagram ? `${title}: picture it` : k === 0 ? title : `${title} (continued)`,
          intent: diagram ? `Visual explanation of ${title}` : `Explain ${title}`,
          topic_ids: [id],
          visual: diagram ? nextVisual() : null,
        });
      }
    }
    const first = topicIds[0]!;
    const last = topicIds[topicIds.length - 1]!;
    slides.push(
      { layout: 'example', heading: 'Worked example 1', intent: 'Step-by-step solved example', topic_ids: [first], visual: 'table' },
      { layout: 'check', heading: 'Check your understanding 1', intent: 'Quick MCQ', topic_ids: [first], visual: null },
      { layout: 'check', heading: 'Check your understanding 2', intent: 'Quick MCQ', topic_ids: [last], visual: null },
      { layout: 'example', heading: 'Worked example 2', intent: 'Step-by-step solved example', topic_ids: [last], visual: nextVisual() },
      { layout: 'check', heading: 'Check your understanding 3', intent: 'Quick MCQ', topic_ids: [last], visual: null },
      { layout: 'summary', heading: 'Summary', intent: 'Concept map of the part', topic_ids: topicIds, visual: 'flow' },
      { layout: 'exam-tips', heading: 'Exam tips', intent: 'Common mistakes and how marks are awarded', topic_ids: topicIds, visual: null },
    );
    return { part: pi + 1, title: groups.length > 1 ? `${chapter.title} — Part ${pi + 1}` : chapter.title, topic_ids: topicIds, slides };
  });
  return {
    goals: goals ?? chapter.topics.slice(0, 6).map((t) => t.learning_outcomes[0] ?? t.title),
    parts,
  };
}

export function outlineSlideCount(outline: Pick<ChapterOutline, 'parts'>): number {
  return outline.parts.reduce((n, p) => n + p.slides.length, 0);
}
