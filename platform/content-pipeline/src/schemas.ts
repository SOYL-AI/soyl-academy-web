/**
 * Generation schemas: what each model call must return, built from the shared contract.
 *
 * Each schema normalises the raw JSON *before* validation (z.preprocess): the pipeline, not the
 * model, owns unit ids, slide/card/question ids and status, so a model never fails validation for
 * getting bookkeeping wrong. Content rules (answers, marks, narration length, …) are still the
 * contract's and still fail validation, which triggers the client's repair round-trip.
 */
import { z } from 'zod/v4';
import {
  Deck,
  FlashcardSet,
  LessonOutline,
  Notes,
  Question,
  type Deck as DeckT,
  type Question as QuestionT,
} from '@soyl/shared/content/index';
import { questionIdPrefix } from './ids';
import type { QuestionSlot } from './planning';

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Item-level ids use the chapter prefix (q_cbse10sci_ch01); assembly renumbers them <prefix>_NNN. */
export function questionIdBase(unit: string): string {
  return questionIdPrefix(unit);
}

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

function normalizeQuestion(q: unknown, unit: string, id: string): unknown {
  if (!isObj(q)) return q;
  const out: Obj = { ...q, id, unit, status: 'draft', version: 1 };
  delete out.provenance;
  if (Array.isArray(q.children))
    out.children = q.children.map((c, i) =>
      isObj(c)
        ? { ...c, id: String.fromCharCode(97 + i), ...(Array.isArray(c.alternatives) ? { alternatives: c.alternatives.map((a, k) => (isObj(a) ? { ...a, id: `${String.fromCharCode(97 + i)}${k + 2}` } : a)) } : {}) }
        : c,
    );
  return out;
}

export function normalizeQuestions(list: unknown, unit: string, prefix: string): { questions: unknown[]; idMap: Map<string, string> } {
  const idMap = new Map<string, string>();
  const questions = (Array.isArray(list) ? list : []).map((q, i) => {
    const id = `${prefix}_${pad(i + 1)}`;
    if (isObj(q) && typeof q.id === 'string') idMap.set(q.id, id);
    return normalizeQuestion(q, unit, id);
  });
  return { questions, idMap };
}

export const DeckGeneration = z.object({ deck: Deck, check_questions: z.array(Question).min(1) });
export type DeckGeneration = { deck: DeckT; check_questions: QuestionT[] };

/** Deck part plus the MCQs its check slides point to. */
export function deckGenerationSchema(unit: string, part: number | null): z.ZodType<DeckGeneration> {
  const prefix = `${questionIdBase(unit)}_d${part ?? 1}_c`;
  return z
    .preprocess((raw) => {
      if (!isObj(raw) || !isObj(raw.deck)) return raw;
      const { questions, idMap } = normalizeQuestions(raw.check_questions, unit, prefix);
      const newIds = questions.map((q) => (q as Obj).id as string);
      let checkIndex = 0;
      const slides = Array.isArray(raw.deck.slides)
        ? raw.deck.slides.map((s, i) => {
            if (!isObj(s)) return s;
            const slide: Obj = { ...s, id: `s${pad(i + 1)}` };
            if (s.layout === 'check') {
              const ref = typeof s.check_question_id === 'string' ? idMap.get(s.check_question_id) : undefined;
              slide.check_question_id = ref ?? newIds[checkIndex] ?? s.check_question_id ?? null;
              checkIndex++;
            }
            delete slide.audio;
            return slide;
          })
        : raw.deck.slides;
      const deck: Obj = { ...raw.deck, unit, part, version: 1, status: 'draft', slides };
      delete deck.provenance;
      return { deck, check_questions: questions };
    }, DeckGeneration)
    .superRefine((g, ctx) => {
      const ids = new Set(g.check_questions.map((q) => q.id));
      g.deck.slides.forEach((s, i) => {
        if (s.layout === 'check' && s.check_question_id && !ids.has(s.check_question_id))
          ctx.addIssue({ code: 'custom', path: ['deck', 'slides', i, 'check_question_id'], message: `check slide points to ${s.check_question_id}, which is not in check_questions` });
      });
    }) as unknown as z.ZodType<DeckGeneration>;
}

export function notesSchema(unit: string): z.ZodType<z.infer<typeof Notes>> {
  return z.preprocess((raw) => {
    if (!isObj(raw)) return raw;
    const out: Obj = { ...raw, unit, version: 1, status: 'draft' };
    delete out.provenance;
    return out;
  }, Notes) as unknown as z.ZodType<z.infer<typeof Notes>>;
}

export function flashcardsSchema(unit: string): z.ZodType<z.infer<typeof FlashcardSet>> {
  return z.preprocess((raw) => {
    if (!isObj(raw)) return raw;
    const cards = Array.isArray(raw.cards) ? raw.cards.map((c, i) => (isObj(c) ? { ...c, id: `f${pad(i + 1)}` } : c)) : raw.cards;
    const out: Obj = { ...raw, unit, version: 1, status: 'draft', cards };
    delete out.provenance;
    return out;
  }, FlashcardSet) as unknown as z.ZodType<z.infer<typeof FlashcardSet>>;
}

export const QuestionList = z.object({ questions: z.array(Question).min(1) });
export type QuestionList = { questions: QuestionT[] };

/** A batch of questions that must match the planned slots (count and type, in any order). */
export function questionBatchSchema(unit: string, batchKey: string, slots: QuestionSlot[]): z.ZodType<QuestionList> {
  const prefix = `${questionIdBase(unit)}_${batchKey.replace(/^questions\./, '').replace(/\./g, '_')}`;
  return z
    .preprocess((raw) => {
      // Templates may ask for a bare JSON array of questions; accept both shapes.
      const list = Array.isArray(raw) ? raw : isObj(raw) ? raw.questions : undefined;
      if (list === undefined) return raw;
      return { questions: normalizeQuestions(list, unit, prefix).questions };
    }, QuestionList)
    .superRefine((list, ctx) => {
      const want = new Map<string, number>();
      for (const s of slots) want.set(s.type, (want.get(s.type) ?? 0) + 1);
      const got = new Map<string, number>();
      for (const q of list.questions) got.set(q.type, (got.get(q.type) ?? 0) + 1);
      for (const [type, n] of want)
        if ((got.get(type) ?? 0) !== n) ctx.addIssue({ code: 'custom', path: ['questions'], message: `expected ${n} ${type} question(s), got ${got.get(type) ?? 0}` });
      for (const [type, n] of got) if (!want.has(type)) ctx.addIssue({ code: 'custom', path: ['questions'], message: `${n} unplanned ${type} question(s)` });
    }) as unknown as z.ZodType<QuestionList>;
}

export const OutlineGeneration = LessonOutline;
