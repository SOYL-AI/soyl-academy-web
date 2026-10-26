/**
 * Stage 4 lint engine: deterministic checks over a unit's artefacts. Each finding names the item
 * (outline, deck.p1, notes, flashcards, questions), the rule, a JSON path and a message.
 * Errors block the unit (auto_verified needs zero errors); warnings are reported.
 */
import { CONTENT_TARGETS } from '@soyl/shared/config/content-targets';
import {
  ChapterOutline,
  Deck,
  FlashcardSet,
  Notes,
  Question,
  QuestionBank,
  type Deck as DeckT,
  type FlashcardSet as FlashcardSetT,
  type Notes as NotesT,
  type Provenance,
  type Question as QuestionT,
  type Visual,
} from '@soyl/shared/content/index';
import { TEXT_FAMILIES, type Family } from '../../config/families';
import { checkTex, extractMath } from './math';
import { checkLiterature, checkText } from './text';
import { checkVisual } from './visual';

export type Severity = 'error' | 'warning';

export interface Finding {
  item: string;
  rule: string;
  severity: Severity;
  path: string;
  message: string;
}

export interface LintContext {
  unit: string;
  family: Family;
  classLevel: number;
  language: string;
  /** Literature chapter: apply the reproduction heuristic. */
  literature: boolean;
  /** Topic ids of the chapter in the syllabus; null when the syllabus is unknown. */
  topicIds: ReadonlySet<string> | null;
  /** Content that must carry pipeline provenance (template + model). False for exemplars. */
  requirePipelineProvenance: boolean;
}

export interface UnitBundle {
  outline?: unknown;
  decks: { key: string; data: unknown }[];
  notes?: unknown;
  flashcards?: unknown;
  /** A QuestionBank ({unit, questions}) or a plain array of questions. */
  questions?: unknown;
}

export interface LintReport {
  unit: string;
  errors: number;
  warnings: number;
  items: Record<string, { errors: number; warnings: number }>;
  findings: Finding[];
}

class Collector {
  readonly findings: Finding[] = [];
  constructor(readonly ctx: LintContext) {}

  add(item: string, rule: string, severity: Severity, path: string, message: string) {
    this.findings.push({ item, rule, severity, path, message });
  }

  /** Text, links, contact details, profanity, literature, and maths in a markdown/plain field. */
  text(item: string, path: string, value: string | undefined | null, kind: 'md' | 'plain' | 'spoken') {
    if (!value) return;
    for (const i of checkText(value, kind === 'md' ? 'md' : 'plain')) this.add(item, i.rule, i.severity, path, i.message);
    if (this.ctx.literature) for (const i of checkLiterature(value)) this.add(item, i.rule, i.severity, path, i.message);
    if (kind === 'md') {
      const { spans, error } = extractMath(value);
      if (error) this.add(item, 'math.katex', 'error', path, error);
      for (const s of spans) this.tex(item, path, s.tex, s.display);
    }
    if (kind === 'spoken' && /\$|\\[a-zA-Z]+\{/.test(value)) this.add(item, 'narration.markup', 'warning', path, 'narration contains maths markup; it is read aloud, so write it as words');
  }

  tex(item: string, path: string, tex: string, display: boolean) {
    const r = checkTex(tex, display);
    if (r.error) this.add(item, 'math.katex', 'error', path, `KaTeX: ${r.error} in "${tex.slice(0, 80)}"`);
    for (const w of r.warnings.slice(0, 3)) this.add(item, 'math.katex-strict', 'warning', path, w);
  }

  visual(item: string, path: string, v: Visual | null | undefined) {
    if (!v) return;
    const r = checkVisual(v);
    for (const i of r.issues) this.add(item, i.rule, i.severity, path, i.message);
    r.texts.forEach((t, k) => this.text(item, `${path}.text[${k}]`, t.text, t.kind));
  }

  topics(item: string, path: string, ids: readonly (string | null)[]) {
    if (!this.ctx.topicIds) return;
    for (const id of ids) if (id && !this.ctx.topicIds.has(id)) this.add(item, 'topics.unknown', 'error', path, `topic ${id} is not in the ${this.ctx.unit} syllabus`);
  }

  provenance(item: string, p: Provenance | undefined) {
    if (p?.model === 'mock') this.add(item, 'provenance.mock', 'warning', 'provenance', 'placeholder content from the mock provider: never publish');
    if (!this.ctx.requirePipelineProvenance) return;
    if (!p) return this.add(item, 'provenance.missing', 'error', 'provenance', 'no provenance recorded');
    if (p.origin === 'pipeline' && (!p.template_version || !p.model))
      this.add(item, 'provenance.missing', 'error', 'provenance', 'pipeline items must record template id@version and model');
  }

  script(item: string, path: string, text: string) {
    if (this.ctx.language === 'hi' && text && !/[ऀ-ॿ]/.test(text)) this.add(item, 'language.script', 'error', path, 'Hindi content must be written in Devanagari');
  }
}

function schema<T>(c: Collector, item: string, s: { safeParse(v: unknown): { success: true; data: T } | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } } }, value: unknown): T | null {
  const r = s.safeParse(value);
  if (r.success) return r.data;
  for (const i of r.error.issues.slice(0, 25)) c.add(item, 'schema', 'error', i.path.map(String).join('.') || '(root)', i.message);
  return null;
}

function lintQuestion(c: Collector, item: string, path: string, q: Omit<QuestionT, 'unit' | 'status' | 'version' | 'language' | 'children' | 'provenance'> & { passage_md?: string; children?: QuestionT['children'] }) {
  c.text(item, `${path}.stem_md`, q.stem_md, 'md');
  c.text(item, `${path}.passage_md`, q.passage_md, 'md');
  q.options.forEach((o, i) => c.text(item, `${path}.options[${i}]`, o.text_md, 'md'));
  q.match_right.forEach((o, i) => c.text(item, `${path}.match_right[${i}]`, o.text_md, 'md'));
  c.text(item, `${path}.solution_md`, q.solution_md, 'md');
  q.marking_scheme.forEach((s, i) => c.text(item, `${path}.marking_scheme[${i}]`, s.step, 'md'));
  if ('model_answer_md' in q.answer) c.text(item, `${path}.answer`, q.answer.model_answer_md, 'md');
  if ('blanks' in q.answer) q.answer.blanks.forEach((b, i) => b.accepted.forEach((a) => c.text(item, `${path}.answer.blanks[${i}]`, a, 'plain')));
  q.assets.forEach((v, i) => c.visual(item, `${path}.assets[${i}]`, v));
  c.topics(item, `${path}.topic_ids`, q.topic_ids);
  (q.children ?? []).forEach((ch, i) => lintQuestion(c, item, `${path}.children[${i}]`, ch));
}

function lintDeck(c: Collector, item: string, deck: DeckT) {
  const { ctx } = c;
  c.text(item, 'title', deck.title, 'plain');
  deck.goals.forEach((g, i) => c.text(item, `goals[${i}]`, g, 'md'));
  deck.slides.forEach((s, i) => {
    const p = `slides[${i}]`;
    c.text(item, `${p}.heading`, s.heading, 'md');
    c.text(item, `${p}.body_md`, s.body_md, 'md');
    s.bullets.forEach((b, k) => c.text(item, `${p}.bullets[${k}]`, b, 'md'));
    s.columns?.forEach((col, k) => c.text(item, `${p}.columns[${k}]`, col, 'md'));
    s.math.forEach((m, k) => c.tex(item, `${p}.math[${k}]`, m, true));
    c.text(item, `${p}.narration`, s.narration, 'spoken');
    c.visual(item, `${p}.visual`, s.visual);
    c.script(item, `${p}.heading`, s.heading + s.narration);
  });
  c.provenance(item, deck.provenance);

  // Editorial targets (CONTEXT §8, content-targets.ts).
  const t = CONTENT_TARGETS;
  const n = deck.slides.length;
  const count = (layout: string) => deck.slides.filter((s) => s.layout === layout).length;
  if (n < t.deckSlidesMin || n > t.deckSlidesMax) c.add(item, 'editorial.slides', 'error', 'slides', `${n} slides (target ${t.deckSlidesMin}–${t.deckSlidesMax}; split long chapters into parts)`);
  if (!count('summary')) c.add(item, 'editorial.summary', 'error', 'slides', 'no summary slide');
  if (!count('exam-tips')) c.add(item, 'editorial.exam-tips', 'error', 'slides', 'no exam-tips slide');
  const checks = count('check');
  if (checks < t.checkQuestionsMin || checks > t.checkQuestionsMax)
    c.add(item, 'editorial.checks', 'error', 'slides', `${checks} check slides (target ${t.checkQuestionsMin}–${t.checkQuestionsMax})`);
  if (!TEXT_FAMILIES.has(ctx.family)) {
    if (count('example') < t.workedExamplesMin) c.add(item, 'editorial.examples', 'error', 'slides', `${count('example')} worked examples (min ${t.workedExamplesMin})`);
    let gap = 0;
    deck.slides.forEach((s, i) => {
      gap = s.visual ? 0 : gap + 1;
      if (gap === t.visualEverySlides + 1) c.add(item, 'editorial.visual-cadence', 'error', `slides[${i}]`, `more than ${t.visualEverySlides} slides in a row without a visual (ending at ${s.id})`);
    });
  }
}

function lintNotes(c: Collector, item: string, notes: NotesT) {
  c.text(item, 'title', notes.title, 'plain');
  notes.sections.forEach((s, i) => {
    const p = `sections[${i}]`;
    c.text(item, `${p}.heading`, s.heading, 'md');
    c.text(item, `${p}.body_md`, s.body_md, 'md');
    s.key_terms.forEach((k, j) => {
      c.text(item, `${p}.key_terms[${j}].term`, k.term, 'md');
      c.text(item, `${p}.key_terms[${j}].definition_md`, k.definition_md, 'md');
    });
    s.formulas.forEach((f, j) => c.tex(item, `${p}.formulas[${j}]`, f.latex, true));
    c.visual(item, `${p}.visual`, s.visual);
    c.topics(item, `${p}.topic_ids`, s.topic_ids);
    c.script(item, `${p}.heading`, s.heading + s.body_md);
  });
  c.text(item, 'exam_tips_md', notes.exam_tips_md, 'md');
  c.provenance(item, notes.provenance);
}

function lintFlashcards(c: Collector, item: string, set: FlashcardSetT) {
  set.cards.forEach((card, i) => {
    c.text(item, `cards[${i}].front_md`, card.front_md, 'md');
    c.text(item, `cards[${i}].back_md`, card.back_md, 'md');
    c.topics(item, `cards[${i}].topic_id`, [card.topic_id]);
  });
  const n = set.cards.length;
  const t = CONTENT_TARGETS;
  if (n < t.flashcardsMin || n > t.flashcardsMax) c.add(item, 'editorial.flashcards', 'error', 'cards', `${n} flashcards (target ${t.flashcardsMin}–${t.flashcardsMax})`);
  c.provenance(item, set.provenance);
}

export function lintBundle(bundle: UnitBundle, ctx: LintContext): LintReport {
  const c = new Collector(ctx);
  const items: string[] = [];

  if (bundle.outline !== undefined) {
    items.push('outline');
    const o = schema(c, 'outline', ChapterOutline, bundle.outline);
    if (o) {
      if (o.unit !== ctx.unit) c.add('outline', 'refs.unit', 'error', 'unit', `outline is for ${o.unit}`);
      o.parts.forEach((p, i) => {
        c.topics('outline', `parts[${i}].topic_ids`, p.topic_ids);
        p.slides.forEach((s, k) => c.topics('outline', `parts[${i}].slides[${k}].topic_ids`, s.topic_ids));
      });
      if (ctx.topicIds) {
        const covered = new Set(o.parts.flatMap((p) => p.topic_ids));
        for (const id of ctx.topicIds) if (!covered.has(id)) c.add('outline', 'outline.coverage', 'warning', 'parts', `topic ${id} is not in any part`);
      }
    }
  }

  const decks: DeckT[] = [];
  for (const { key, data } of bundle.decks) {
    items.push(key);
    const d = schema(c, key, Deck, data);
    if (!d) continue;
    if (d.unit !== ctx.unit) c.add(key, 'refs.unit', 'error', 'unit', `deck is for ${d.unit}`);
    decks.push(d);
    lintDeck(c, key, d);
  }
  if (bundle.decks.length > 1) {
    const parts = decks.map((d) => d.part);
    if (parts.some((p) => p === null)) c.add('decks', 'editorial.parts', 'error', 'part', 'a chapter split into several decks needs a part number on each');
  }

  if (bundle.notes !== undefined) {
    items.push('notes');
    const n = schema(c, 'notes', Notes, bundle.notes);
    if (n) {
      if (n.unit !== ctx.unit) c.add('notes', 'refs.unit', 'error', 'unit', `notes are for ${n.unit}`);
      lintNotes(c, 'notes', n);
    }
  }

  if (bundle.flashcards !== undefined) {
    items.push('flashcards');
    const f = schema(c, 'flashcards', FlashcardSet, bundle.flashcards);
    if (f) {
      if (f.unit !== ctx.unit) c.add('flashcards', 'refs.unit', 'error', 'unit', `flashcards are for ${f.unit}`);
      lintFlashcards(c, 'flashcards', f);
    }
  }

  let questions: QuestionT[] | null = null;
  if (bundle.questions !== undefined) {
    items.push('questions');
    if (Array.isArray(bundle.questions)) {
      const parsed = bundle.questions.map((q, i) => {
        const r = Question.safeParse(q);
        if (!r.success) for (const issue of r.error.issues.slice(0, 10)) c.add('questions', 'schema', 'error', `questions[${i}].${issue.path.map(String).join('.')}`, issue.message);
        return r.success ? r.data : null;
      });
      questions = parsed.filter((q): q is QuestionT => q !== null);
      const ids = new Set<string>();
      questions.forEach((q, i) => {
        if (ids.has(q.id)) c.add('questions', 'schema', 'error', `questions[${i}].id`, `duplicate question id ${q.id}`);
        ids.add(q.id);
      });
    } else {
      questions = schema(c, 'questions', QuestionBank, bundle.questions)?.questions ?? null;
    }
    if (questions) {
      questions.forEach((q, i) => {
        if (q.unit !== ctx.unit) c.add('questions', 'refs.unit', 'error', `questions[${i}].unit`, `question ${q.id} is for ${q.unit}`);
        lintQuestion(c, 'questions', `questions[${i}]`, q);
        c.provenance('questions', q.provenance);
        c.script('questions', `questions[${i}].stem_md`, q.stem_md);
      });
      const min = CONTENT_TARGETS.practiceQuestionsMin[ctx.classLevel] ?? 40;
      if (questions.length < min) c.add('questions', 'editorial.practice', 'error', 'questions', `${questions.length} practice questions (min ${min} for class ${ctx.classLevel})`);
      const types = new Set(questions.map((q) => q.type));
      if (types.size < 5) c.add('questions', 'editorial.question-types', 'error', 'questions', `${types.size} question types (min 5): ${[...types].join(', ')}`);
    }
  }

  // Cross-item references: every check slide resolves to a question in the bank.
  if (questions) {
    const ids = new Set(questions.map((q) => q.id));
    bundle.decks.forEach(({ key }, di) => {
      decks[di]?.slides.forEach((s, i) => {
        if (s.check_question_id && !ids.has(s.check_question_id))
          c.add(key, 'refs.check-question', 'error', `slides[${i}].check_question_id`, `unknown question ${s.check_question_id}`);
      });
    });
  }

  const report: LintReport = { unit: ctx.unit, errors: 0, warnings: 0, items: {}, findings: c.findings };
  for (const key of items) report.items[key] = { errors: 0, warnings: 0 };
  for (const f of c.findings) {
    const bucket = (report.items[f.item] ??= { errors: 0, warnings: 0 });
    if (f.severity === 'error') {
      report.errors++;
      bucket.errors++;
    } else {
      report.warnings++;
      bucket.warnings++;
    }
  }
  return report;
}
