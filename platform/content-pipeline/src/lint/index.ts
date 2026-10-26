/**
 * Stage 4 lint engine: deterministic checks over a unit's artefacts. Each finding names the item
 * (outline, deck.p1, notes, flashcards, questions), the rule, a JSON path and a message.
 * Errors block the unit (auto_verified needs zero errors); warnings are reported.
 * Rule catalogue: README "Lint rules".
 */
import { CONTENT_TARGETS } from '@soyl/shared/config/content-targets';
import {
  ChapterOutline,
  Deck,
  FlashcardSet,
  Notes,
  OBJECTIVE_TYPES,
  Question,
  QuestionBank,
  type Deck as DeckT,
  type FlashcardSet as FlashcardSetT,
  type Notes as NotesT,
  type Provenance,
  type Question as QuestionT,
  type Visual,
  type ScriptInfo,
  checkMajority,
  checkNarration,
  checkScriptText,
  codeBlocks,
  letterCounts,
  scriptForLanguage,
  unmatchedUnderline,
  wordCount,
} from '@soyl/shared/content/index';
import { TEXT_FAMILIES, type Family } from '../../config/families';
import { HINDI_ORTHOGRAPHY, LITERATURE, WORD_LIMIT_SLACK } from '../../config/pipeline';
import { checkArithmetic } from './arith';
import { SKELETAL_CONTEXT, ceBodies, checkBalance } from './chem';
import { checkTex, extractMath } from './math';
import { checkLiterature, checkText, stripFences, stripMathAndCode } from './text';
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
  /** ISO 15924 script of the subject (subjects.yaml); null/undefined → derived from `language`. */
  script?: string | null;
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

/** Share of items at application or above that CBSE papers target (~50%); outside this band is a warning. */
export const COMPETENCY_BAND = { min: 0.45, max: 0.65 } as const;

/** LaTeX commands that take a brace argument; seen without a backslash they mean an escape was lost. */
const LOST_BACKSLASH = /(^|[^\\A-Za-z])(ce|frac|dfrac|tfrac|sqrt|text|mathrm|mathbf|xrightarrow|overline|underline|vec|hat|operatorname|pu)\{/;
/** JSON escapes that swallow a LaTeX backslash: \f(rac) → form feed, \b(eta) → backspace, \t(imes|ext|heta) → tab, \r(ightarrow) → CR, \n(eq|u) → newline. */
const EATEN_ESCAPE = /[\u0008\u000c]|\t(?:imes|ext|heta|au|an|o\b|riangle)|\r(?:ightarrow|ho|m\b)|\n(?:eq|u\b|abla|ewline)/;

/** Narration is read by TTS: no LaTeX, symbols, arrows or formulae. */
const NARRATION_SYMBOLS = /[$\\^_=<>→⇌↑↓×÷±√∞≈≠≤≥°Ω₀-₉⁰-⁹]|(?:^|[^A-Za-z])(?:[A-Z][a-z]?\d+(?:[A-Z][a-z]?\d*)*|(?:[A-Z][a-z]?){2,}\d+)(?![A-Za-z])/;

type TextKind = 'md' | 'plain' | 'spoken';
interface TextOpts {
  /** Text that marks deliberately unbalanced equations (slide, stem, card). */
  context?: string;
  /** Skip the balance check (wrong options of objective questions). */
  exemptBalance?: boolean;
  /** Recompute numeric = chains (solutions, model answers, worked examples). */
  arithmetic?: boolean;
}

class Collector {
  readonly findings: Finding[] = [];
  private readonly svgIds = new Map<string, string>();
  private readonly mockWarned = new Set<string>();
  /** Non-Latin script of a language subject (Devanagari for Hindi…); null for English-medium content. */
  readonly scriptInfo: ScriptInfo | null;
  constructor(readonly ctx: LintContext) {
    this.scriptInfo = scriptForLanguage(ctx.language, ctx.script);
  }

  add(item: string, rule: string, severity: Severity, path: string, message: string) {
    this.findings.push({ item, rule, severity, path, message });
  }

  private escapes(item: string, path: string, value: string) {
    const lost = LOST_BACKSLASH.exec(value);
    if (lost) this.add(item, 'latex.backslash', 'error', path, `"${lost[2]}{" without a backslash: an escape was lost (write \\\\${lost[2]} in JSON)`);
    if (EATEN_ESCAPE.test(value)) this.add(item, 'latex.backslash', 'error', path, 'contains a control character where a LaTeX command was (JSON "\\frac"/"\\times"/"\\rightarrow" need a double backslash)');
  }

  private balance(item: string, path: string, body: string, opts: TextOpts, own: string) {
    if (opts.exemptBalance) return;
    const r = checkBalance(body);
    if (r.kind !== 'unbalanced') return;
    if (SKELETAL_CONTEXT.test(opts.context ?? '') || SKELETAL_CONTEXT.test(own)) return;
    this.add(item, 'chem.balance', 'error', path, `equation "${body.slice(0, 80)}" is not balanced (${r.elements.join(', ')}); if it is deliberately skeletal, say so in the text ("skeletal", "unbalanced", "Balance …")`);
  }

  /** Text, links, contact details, profanity, literature, maths and chemistry in one field. */
  text(item: string, path: string, value: string | undefined | null, kind: TextKind, opts: TextOpts = {}) {
    if (!value) return;
    for (const i of checkText(value, kind === 'md' ? 'md' : 'plain')) this.add(item, i.rule, i.severity, path, i.message);
    if (this.ctx.literature) for (const i of checkLiterature(value)) this.add(item, i.rule, i.severity, path, i.message);
    this.escapes(item, path, value);
    if (kind === 'md') {
      const prose = stripMathAndCode(value);
      for (const u of unmatchedUnderline(prose))
        this.add(item, 'markdown.underline', 'error', path, `underline marker "${u}" is not closed: write ++word++ on one line`);
      if (/<u>/i.test(prose)) this.add(item, 'markdown.underline', 'error', path, 'use the underline marker ++word++ instead of <u>');
      const { spans, error } = extractMath(stripFences(value));
      if (error) this.add(item, 'math.katex', 'error', path, error);
      for (const s of spans) this.tex(item, path, s.tex, s.display, opts, value);
    }
    if (kind === 'spoken') {
      const m = NARRATION_SYMBOLS.exec(value);
      if (m) this.add(item, 'narration.symbols', 'error', path, `narration is read aloud: no formulae, symbols or LaTeX ("${m[0].trim()}"); write it as words`);
    }
  }

  tex(item: string, path: string, tex: string, display: boolean, opts: TextOpts = {}, own = '') {
    const r = checkTex(tex, display);
    if (r.error) this.add(item, 'math.katex', 'error', path, `KaTeX: ${r.error} in "${tex.slice(0, 80)}"`);
    for (const w of r.warnings.slice(0, 3)) this.add(item, 'math.katex-strict', 'warning', path, w);
    if (own === '') this.escapes(item, path, tex);
    for (const body of ceBodies(tex)) this.balance(item, path, body, opts, own || tex);
    if (opts.arithmetic)
      for (const slip of checkArithmetic(tex))
        this.add(item, 'math.arithmetic', 'error', path, `"${slip.left} = ${slip.right}" does not hold (${+slip.leftValue.toFixed(6)} ≠ ${+slip.rightValue.toFixed(6)}); use \\approx for rounded values`);
  }

  visual(item: string, path: string, v: Visual | null | undefined, opts: TextOpts = {}) {
    if (!v) return;
    const r = checkVisual(v);
    for (const i of r.issues) this.add(item, i.rule, i.severity, path, i.message);
    r.texts.forEach((t, k) => this.text(item, `${path}.text[${k}]`, t.text, t.kind, opts));
    if (r.equation) this.balance(item, `${path}.spec.equation`, r.equation, opts, v.caption ?? '');
    for (const id of r.svgIds) {
      const key = `${item}|${id}`;
      const prev = this.svgIds.get(key);
      if (prev && prev !== path) this.add(item, 'svg.ids', 'warning', path, `id "${id}" is also used by the diagram at ${prev}; prefix ids per diagram`);
      else this.svgIds.set(key, path);
    }
  }

  topics(item: string, path: string, ids: readonly (string | null)[]) {
    if (!this.ctx.topicIds) return;
    for (const id of ids) if (id && !this.ctx.topicIds.has(id)) this.add(item, 'topics.unknown', 'error', path, `topic ${id} is not in the ${this.ctx.unit} syllabus`);
  }

  provenance(item: string, p: Provenance | undefined) {
    if (p?.model === 'mock' && !this.mockWarned.has(item) && this.mockWarned.add(item)) this.add(item, 'provenance.mock', 'warning', 'provenance', 'placeholder content from the mock provider: never publish');
    if (!this.ctx.requirePipelineProvenance) return;
    if (!p) return this.add(item, 'provenance.missing', 'error', 'provenance', 'no provenance recorded');
    if (p.origin === 'pipeline' && (!p.template_version || !p.model))
      this.add(item, 'provenance.missing', 'error', 'provenance', 'pipeline items must record template id@version and model');
  }

  script(item: string, path: string, text: string) {
    const s = this.scriptInfo;
    if (s && text && letterCounts(text, s).script === 0) this.add(item, 'language.script', 'error', path, `${this.ctx.language} content must be written in ${s.name}`);
  }

  /**
   * Script rules for a whole item (shared/content/script.ts: NFC, well-formedness, Latin runs) plus
   * Hindi orthography warnings (non-standard spellings, nukta consistency).
   */
  scriptItem(item: string, data: unknown) {
    const s = this.scriptInfo;
    if (!s) return;
    for (const i of checkScriptText(data, s, { root: item })) this.add(item, i.rule, i.severity, i.path, i.message);
    if (s.code !== 'Deva' || this.ctx.language !== 'hi') return;
    const text = JSON.stringify(data);
    for (const w of HINDI_ORTHOGRAPHY.nonStandard) if (text.includes(w)) this.add(item, 'language.spelling', 'warning', item, `non-standard spelling "${w}" (NCERT/CBSE standard: \u0917\u090F, \u091A\u093E\u0939\u093F\u090F, \u0932\u093F\u090F, \u0915\u0930\u094D\u0924\u0943\u0935\u093E\u091A\u094D\u092F \u2026)`);
    const words = new Set(text.match(/[\u0900-\u097F]+/gu) ?? []);
    for (const w of words) if (w.includes('\u093C') && words.has(w.replace(/\u093C/g, ''))) this.add(item, 'language.nukta', 'warning', item, `both "${w}" and "${w.replace(/\u093C/g, '')}" are used`);
  }

  scriptIssues(item: string, issues: { rule: string; severity: Severity; path: string; message: string }[]) {
    for (const i of issues) this.add(item, i.rule, i.severity, i.path, i.message);
  }
}

function schema<T>(c: Collector, item: string, s: { safeParse(v: unknown): { success: true; data: T } | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } } }, value: unknown): T | null {
  const r = s.safeParse(value);
  if (r.success) return r.data;
  for (const i of r.error.issues.slice(0, 25)) c.add(item, 'schema', 'error', i.path.map(String).join('.') || '(root)', i.message);
  return null;
}

type QuestionLike = Pick<
  QuestionT,
  'type' | 'stem_md' | 'options' | 'match_right' | 'answer' | 'solution_md' | 'marking_scheme' | 'assets' | 'topic_ids' | 'marks' | 'word_limit' | 'rubric' | 'map_id' | 'format'
> & {
  passage_md?: string;
  passage_origin?: QuestionT['passage_origin'];
  children?: (QuestionLike & { alternatives?: QuestionLike[] })[];
  alternatives?: QuestionLike[];
};

function lintQuestion(c: Collector, item: string, path: string, q: QuestionLike, parentContext = '') {
  const context = `${parentContext} ${q.passage_md ?? ''} ${q.stem_md}`;
  const correct = new Set('option_ids' in q.answer ? q.answer.option_ids : []);
  const objectiveOptions = ['mcq', 'multi-select', 'assertion-reason', 'true-false'].includes(q.type);
  c.text(item, `${path}.stem_md`, q.stem_md, 'md', { context });
  c.text(item, `${path}.passage_md`, q.passage_md, 'md', { context });
  q.options.forEach((o, i) => c.text(item, `${path}.options[${i}]`, o.text_md, 'md', { context, exemptBalance: objectiveOptions && !correct.has(o.id) }));
  q.match_right.forEach((o, i) => c.text(item, `${path}.match_right[${i}]`, o.text_md, 'md', { context }));
  c.text(item, `${path}.solution_md`, q.solution_md, 'md', { context: `${context} ${q.solution_md}`, arithmetic: true });
  if (q.type === 'numerical' && 'value' in q.answer) {
    const want = q.answer.value;
    const tol = Math.max(q.answer.tolerance, 1e-9, Math.abs(want) * 0.005);
    const numbers = [...q.solution_md.replace(/(\d),(?=\d)/g, '$1').matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    if (!numbers.some((n) => Math.abs(n - want) <= tol)) c.add(item, 'solution.answer', 'warning', `${path}.solution_md`, `the solution never states the answer ${want}`);
  }
  q.marking_scheme.forEach((s, i) => c.text(item, `${path}.marking_scheme[${i}]`, s.step, 'md', { context }));
  if ('model_answer_md' in q.answer) c.text(item, `${path}.answer`, q.answer.model_answer_md, 'md', { context, arithmetic: true });
  if ('blanks' in q.answer) q.answer.blanks.forEach((b, i) => b.accepted.forEach((a) => c.text(item, `${path}.answer.blanks[${i}]`, a, 'plain')));
  q.assets.forEach((v, i) => c.visual(item, `${path}.assets[${i}]`, v, { context }));
  c.topics(item, `${path}.topic_ids`, q.topic_ids);
  lintQuestionV2(c, item, path, q, context);
  (q.children ?? []).forEach((ch, i) => {
    lintQuestion(c, item, `${path}.children[${i}]`, ch, context);
    (ch.alternatives ?? []).forEach((alt, k) => lintQuestion(c, item, `${path}.children[${i}].alternatives[${k}]`, alt, context));
  });
}

/** Contract v2 rules: word limits, writing rubric text, code-output, ordering, map, passage origin. */
function lintQuestionV2(c: Collector, item: string, path: string, q: QuestionLike, context: string) {
  const a = q.answer;
  if (q.word_limit && 'model_answer_md' in a) {
    const n = wordCount(stripMathAndCode(a.model_answer_md));
    const { min, max } = q.word_limit;
    if (n < Math.floor(min * WORD_LIMIT_SLACK.below) || n > Math.ceil(max * WORD_LIMIT_SLACK.above))
      c.add(item, 'answer.word-limit', 'warning', `${path}.answer`, `model answer is ${n} words; the question asks for ${min}–${max}`);
  }
  q.rubric?.forEach((r, i) => {
    c.text(item, `${path}.rubric[${i}].criterion`, r.criterion, 'plain');
    c.text(item, `${path}.rubric[${i}].descriptor_md`, r.descriptor_md, 'md', { context });
  });
  if (q.type === 'writing' && q.word_limit && q.word_limit.max > 1000)
    c.add(item, 'writing.word-limit', 'error', `${path}.word_limit`, `word limit ${q.word_limit.max} is not a school writing task (max 1000)`);
  if (q.type === 'code-output' && 'output' in a) {
    if (a.output.length > 2000) c.add(item, 'code.output', 'error', `${path}.answer.output`, `expected output is ${a.output.length} characters (max 2000)`);
    for (const b of codeBlocks(q.stem_md)) {
      if (b.code.split('\n').length > 40) c.add(item, 'code.length', 'warning', `${path}.stem_md`, `code block has ${b.code.split('\n').length} lines; board items are short (≤ 40)`);
      if (/\binput\s*\(|Scanner\s*\(|scanf\s*\(|readline\s*\(/.test(b.code) && !/input|enter|type/i.test(q.stem_md.replace(b.code, '')))
        c.add(item, 'code.input', 'warning', `${path}.stem_md`, 'the code reads input but the stem gives none; the output is not determined');
    }
  }
  if (q.type === 'ordering' && 'order' in a && a.order.every((id, i) => q.options[i]?.id === id))
    c.add(item, 'ordering.shuffled', 'warning', `${path}.options`, 'items are listed in the correct order; list them shuffled (the key is guessable on paper)');
  if (q.type === 'map' && 'places' in a) {
    if (!q.map_id) c.add(item, 'map.id', 'warning', `${path}.map_id`, 'no map_id: the renderer cannot choose an outline map');
    if (Math.abs(a.places.length - q.marks) > 1e-9) c.add(item, 'map.marks', 'warning', `${path}.marks`, `${a.places.length} place(s) for ${q.marks} mark(s); board map items are 1 mark per place`);
    a.places.forEach((p, i) => [p.name, ...p.accepted].forEach((n) => c.text(item, `${path}.answer.places[${i}]`, n, 'plain')));
  }
  if (q.type === 'case-based' || q.type === 'source-based') {
    if (q.passage_origin === 'licensed-excerpt' && !LITERATURE.allowLicensedExcerpts)
      c.add(item, 'passage.licensed', 'error', `${path}.passage_origin`, 'licensed excerpts are refused until licensed source texts exist (CONTEXT §8); write a SOYL passage or commentary');
    if (c.ctx.literature && !q.passage_origin)
      c.add(item, 'passage.origin', 'warning', `${path}.passage_origin`, 'literature passage without passage_origin (soyl-original | soyl-commentary)');
  }
}

function lintDeck(c: Collector, item: string, deck: DeckT) {
  const { ctx } = c;
  c.text(item, 'title', deck.title, 'plain');
  deck.goals.forEach((g, i) => c.text(item, `goals[${i}]`, g, 'md'));
  deck.slides.forEach((s, i) => {
    const p = `slides[${i}]`;
    const context = [s.heading, s.body_md, ...s.bullets, ...(s.columns ?? [])].join(' ');
    const arithmetic = s.layout === 'example';
    c.text(item, `${p}.heading`, s.heading, 'md', { context });
    c.text(item, `${p}.body_md`, s.body_md, 'md', { context, arithmetic });
    s.bullets.forEach((b, k) => c.text(item, `${p}.bullets[${k}]`, b, 'md', { context, arithmetic }));
    s.columns?.forEach((col, k) => c.text(item, `${p}.columns[${k}]`, col, 'md', { context, arithmetic }));
    s.math.forEach((m, k) => c.tex(item, `${p}.math[${k}]`, m, true, { context, arithmetic }));
    c.text(item, `${p}.narration`, s.narration, 'spoken');
    if (c.scriptInfo) c.scriptIssues(item, checkNarration(s.narration, c.scriptInfo, `${p}.narration`));
    c.visual(item, `${p}.visual`, s.visual, { context });
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
    const context = [s.heading, s.body_md, ...s.key_terms.map((k) => k.definition_md)].join(' ');
    c.text(item, `${p}.heading`, s.heading, 'md', { context });
    c.text(item, `${p}.body_md`, s.body_md, 'md', { context });
    s.key_terms.forEach((k, j) => {
      c.text(item, `${p}.key_terms[${j}].term`, k.term, 'md', { context });
      c.text(item, `${p}.key_terms[${j}].definition_md`, k.definition_md, 'md', { context });
    });
    s.formulas.forEach((f, j) => c.tex(item, `${p}.formulas[${j}]`, f.latex, true, { context }));
    c.visual(item, `${p}.visual`, s.visual, { context });
    s.visuals.forEach((v, j) => c.visual(item, `${p}.visuals[${j}]`, v, { context }));
    c.topics(item, `${p}.topic_ids`, s.topic_ids);
    c.script(item, `${p}.heading`, s.heading + s.body_md);
  });
  c.text(item, 'exam_tips_md', notes.exam_tips_md, 'md');
  c.provenance(item, notes.provenance);
}

function lintFlashcards(c: Collector, item: string, set: FlashcardSetT) {
  set.cards.forEach((card, i) => {
    const context = `${card.front_md} ${card.back_md}`;
    c.text(item, `cards[${i}].front_md`, card.front_md, 'md', { context });
    c.text(item, `cards[${i}].back_md`, card.back_md, 'md', { context });
    c.topics(item, `cards[${i}].topic_id`, [card.topic_id]);
  });
  const n = set.cards.length;
  const t = CONTENT_TARGETS;
  if (n < t.flashcardsMin || n > t.flashcardsMax) c.add(item, 'editorial.flashcards', 'error', 'cards', `${n} flashcards (target ${t.flashcardsMin}–${t.flashcardsMax})`);
  c.provenance(item, set.provenance);
}

function lintBank(c: Collector, questions: QuestionT[]) {
  const { ctx } = c;
  questions.forEach((q, i) => {
    if (q.unit !== ctx.unit) c.add('questions', 'refs.unit', 'error', `questions[${i}].unit`, `question ${q.id} is for ${q.unit}`);
    lintQuestion(c, 'questions', `questions[${i}]`, q);
    c.provenance('questions', q.provenance);
    c.script('questions', `questions[${i}].stem_md`, q.stem_md);
    if (c.scriptInfo) c.scriptIssues('questions', checkMajority(q.stem_md, c.scriptInfo, `questions[${i}].stem_md`));
  });
  c.scriptItem('questions', questions);
  const min = CONTENT_TARGETS.practiceQuestionsMin[ctx.classLevel] ?? 40;
  if (questions.length < min) c.add('questions', 'editorial.practice', 'error', 'questions', `${questions.length} practice questions (min ${min} for class ${ctx.classLevel})`);
  const types = new Set(questions.map((q) => q.type));
  if (types.size < 5) c.add('questions', 'editorial.question-types', 'error', 'questions', `${types.size} question types (min 5): ${[...types].join(', ')}`);
  if (questions.length) {
    const higher = questions.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency)).length / questions.length;
    if (higher < COMPETENCY_BAND.min || higher > COMPETENCY_BAND.max)
      c.add('questions', 'balance.competency', 'warning', 'questions', `${Math.round(higher * 100)}% of items are application or above (board papers ≈ 50%; band ${COMPETENCY_BAND.min * 100}–${COMPETENCY_BAND.max * 100}%)`);
    if (!questions.some((q) => q.difficulty >= 4)) c.add('questions', 'balance.difficulty', 'warning', 'questions', 'no difficulty 4–5 items');
  }
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

  const decks: (DeckT | null)[] = [];
  for (const { key, data } of bundle.decks) {
    items.push(key);
    const d = schema(c, key, Deck, data);
    decks.push(d);
    if (!d) continue;
    if (d.unit !== ctx.unit) c.add(key, 'refs.unit', 'error', 'unit', `deck is for ${d.unit}`);
    lintDeck(c, key, d);
    c.scriptItem(key, d);
  }
  if (bundle.decks.length > 1 && decks.some((d) => d && d.part === null))
    c.add('decks', 'editorial.parts', 'error', 'part', 'a chapter split into several decks needs a part number on each');

  if (bundle.notes !== undefined) {
    items.push('notes');
    const n = schema(c, 'notes', Notes, bundle.notes);
    if (n) {
      if (n.unit !== ctx.unit) c.add('notes', 'refs.unit', 'error', 'unit', `notes are for ${n.unit}`);
      lintNotes(c, 'notes', n);
      c.scriptItem('notes', n);
      if (c.scriptInfo) n.sections.forEach((s, i) => c.scriptIssues('notes', checkMajority(s.body_md, c.scriptInfo!, `sections[${i}].body_md`)));
    }
  }

  if (bundle.flashcards !== undefined) {
    items.push('flashcards');
    const f = schema(c, 'flashcards', FlashcardSet, bundle.flashcards);
    if (f) {
      if (f.unit !== ctx.unit) c.add('flashcards', 'refs.unit', 'error', 'unit', `flashcards are for ${f.unit}`);
      lintFlashcards(c, 'flashcards', f);
      c.scriptItem('flashcards', f);
    }
  }

  let questions: QuestionT[] | null = null;
  if (bundle.questions !== undefined) {
    items.push('questions');
    if (Array.isArray(bundle.questions)) {
      questions = [];
      const ids = new Set<string>();
      bundle.questions.forEach((raw, i) => {
        const r = Question.safeParse(raw);
        if (!r.success) {
          for (const issue of r.error.issues.slice(0, 10)) c.add('questions', 'schema', 'error', `questions[${i}].${issue.path.map(String).join('.')}`, issue.message);
          return;
        }
        if (ids.has(r.data.id)) c.add('questions', 'schema', 'error', `questions[${i}].id`, `duplicate question id ${r.data.id}`);
        ids.add(r.data.id);
        questions!.push(r.data);
      });
    } else {
      questions = schema(c, 'questions', QuestionBank, bundle.questions)?.questions ?? null;
    }
    if (questions) lintBank(c, questions);
  }

  // Cross-item references: every check slide resolves to an objective question in the bank.
  if (questions) {
    const byId = new Map(questions.map((q) => [q.id, q]));
    bundle.decks.forEach(({ key }, di) => {
      decks[di]?.slides.forEach((s, i) => {
        if (!s.check_question_id) return;
        const q = byId.get(s.check_question_id);
        if (!q) c.add(key, 'refs.check-question', 'error', `slides[${i}].check_question_id`, `unknown question ${s.check_question_id}`);
        else if (!OBJECTIVE_TYPES.includes(q.type))
          c.add(key, 'refs.check-question', 'error', `slides[${i}].check_question_id`, `check slide points to a ${q.type} question; check slides need an objective type (${OBJECTIVE_TYPES.join(', ')})`);
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
