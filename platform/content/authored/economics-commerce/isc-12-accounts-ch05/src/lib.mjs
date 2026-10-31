// Authoring library for hand-written chapters (D-025/D-026). Copy of the CBSE 12 Economics lib
// (cbse-12-economics-ch01/src/lib.mjs), unchanged except for this header, used for ISC Class 12
// Accounts ch05 (economics-commerce family): ids q_isc12accounts_ch05_NNN, tests t_isc12accounts_ch05_*.
// A chapter's build.mjs calls setUnit(), defines questions with Q()/the item builders, decks with
// deck()/sl(), notes, flashcards and tests, then build() validates everything and writes the files.
// Run a build from platform/:  npx tsx content/authored/<family>/<chapter>/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ChapterRelease, TestDefinition, wordCount } from '@soyl/shared/content/index';
import { checkLiterature } from '../../../../../content-pipeline/src/lint/text.ts';
import { openPipeline } from '../../../../../content-pipeline/src/pipeline';
import { lintExemplar } from '../../../../../content-pipeline/src/commands/lint';
import { deterministicChecks } from '../../../../../content-pipeline/src/verify/checks.ts';

export const AUTHOR = 'claude-opus-5-5 (subject-producer)';
export const DATE = '2026-10-29';
export const PROV = { origin: 'human', template_version: null, model: null, generated_at: DATE, author: AUTHOR };

const S = { unit: '', prefix: '', family: '', literature: false, questions: [], keys: new Map(), rot: 0, problems: [], notes: [] };

const ABBR = { 'english-language-and-literature': 'engll', 'social-science': 'sst' };
export function setUnit(unit, family) {
  S.unit = unit;
  S.family = family;
  S.literature = /literature/.test(family);
  const m = /^(cbse|icse|isc)-(\d{1,2})-(.+)-ch(\d{2})$/.exec(unit);
  S.prefix = `q_${m[1]}${m[2]}${ABBR[m[3]] ?? m[3].replace(/-/g, '')}_ch${m[4]}`;
}
export const topic = (n) => `${S.unit}-t${String(n).padStart(2, '0')}`;
const topics = (t) => (Array.isArray(t) ? t : [t]).map(topic);
const problem = (m) => S.problems.push(m);

const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };
const L = 'abcdefgh';
// Key positions for single-answer MCQs cycle through a fixed, irregular pattern so keys are balanced.
const KEY_PATTERN = [1, 3, 0, 2, 2, 0, 3, 1, 0, 1, 2, 3, 3, 2, 1, 0];

function common(type, o) {
  if (!o.stem) problem(`${type}: missing stem`);
  if (!o.sol) problem(`${type}: missing solution (${(o.stem || '').slice(0, 50)})`);
  if (!o.c || !BLOOM[o.c]) problem(`${type}: bad competency ${o.c} (${(o.stem || '').slice(0, 50)})`);
  if (!o.d) problem(`${type}: missing difficulty (${(o.stem || '').slice(0, 50)})`);
  return {
    type,
    stem_md: o.stem,
    options: [],
    match_right: [],
    solution_md: o.sol,
    marks: o.marks,
    difficulty: o.d,
    competency: o.c,
    bloom: o.bloom ?? BLOOM[o.c],
    topic_ids: topics(o.t),
    expected_time_sec: o.time,
    assets: o.assets ?? [],
  };
}

/** Single-answer MCQ. `opts[0]` is the correct option unless `key` is given with `fixed: true`. */
export function mcq(o) {
  const q = common('mcq', { marks: 1, time: 60, ...o });
  let texts = o.opts.slice();
  let k = 0;
  if (o.fixed) k = L.indexOf(o.key);
  else {
    const pos = KEY_PATTERN[S.rot++ % KEY_PATTERN.length] % texts.length;
    const correct = texts.shift();
    texts.splice(pos, 0, correct);
    k = pos;
  }
  q.options = texts.map((t, i) => ({ id: L[i], text_md: t }));
  q.answer = { option_ids: [L[k]] };
  q.solution_md = `**Correct option: (${L[k]})** ${/[.?!]$/.test(texts[k]) ? texts[k] : texts[k] + "."} ${o.sol}`;
  q.marking_scheme = o.scheme ?? [{ step: `Correct option (${L[k]})`, marks: q.marks }];
  return q;
}

const AR_OPTS = [
  'Both A and R are true, and R is the correct explanation of A.',
  'Both A and R are true, but R is not the correct explanation of A.',
  'A is true, but R is false.',
  'A is false, but R is true.',
];
export function ar(o) {
  const q = common('assertion-reason', { marks: 1, time: 75, ...o, stem: `${o.pre ?? ''}**Assertion (A):** ${o.a}\n\n**Reason (R):** ${o.r}\n\nChoose the correct option.` });
  q.options = AR_OPTS.map((t, i) => ({ id: L[i], text_md: t }));
  q.answer = { option_ids: [o.key] };
  q.solution_md = `**Correct option: (${o.key})** ${o.sol}`;
  q.marking_scheme = [{ step: `Correct option (${o.key})`, marks: q.marks }];
  return q;
}

export function tf(o) {
  const q = common('true-false', { marks: 1, time: 40, ...o });
  q.options = [
    { id: 'a', text_md: 'True' },
    { id: 'b', text_md: 'False' },
  ];
  q.answer = { option_ids: [o.ans ? 'a' : 'b'] };
  q.solution_md = `**${o.ans ? 'True' : 'False'}.** ${o.sol}`;
  q.marking_scheme = [{ step: `Correct choice (${o.ans ? 'True' : 'False'})`, marks: q.marks }];
  return q;
}

/** Fill in the blanks: `___` per blank in the stem; `acc` = accepted answers per blank. */
export function fb(o) {
  const n = (o.stem.match(/_{3,}/g) ?? []).length;
  const marks = o.marks ?? n;
  const q = common('fill-blank', { time: 45 * n, ...o, marks });
  q.answer = { blanks: o.acc.map((a) => ({ accepted: a })) };
  if (n !== o.acc.length) problem(`fill-blank blanks ${n} != answers ${o.acc.length}: ${o.stem.slice(0, 60)}`);
  q.marking_scheme = o.scheme ? o.scheme.map(([step, marks]) => ({ step, marks })) : o.acc.map((a, i) => ({ step: `Blank ${i + 1}: ${a[0]}`, marks: marks / n }));
  const sol = o.sol.toLowerCase();
  o.acc.forEach((a, i) => {
    if (!a.some((x) => sol.includes(x.toLowerCase()))) problem(`fill-blank solution never mentions blank ${i + 1} (${a.join('/')}): ${o.stem.slice(0, 60)}`);
  });
  return q;
}

// Deterministic derangement-ish permutation for match columns and ordering items.
function permute(n, seed) {
  const idx = [...Array(n).keys()];
  let s = seed * 9301 + 49297;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  if (idx.every((v, i) => v === i)) idx.push(idx.shift());
  return idx;
}
let SEED = 7;

/** Match: `pairs` = [[left, right], …] in matching order; the right column is shuffled. */
export function match(o) {
  const n = o.pairs.length;
  const q = common('match', { marks: o.marks ?? n / 2, time: 30 * n, ...o });
  const perm = permute(n, SEED++);
  q.options = o.pairs.map(([l], i) => ({ id: L[i], text_md: l }));
  const rightIds = ['p', 'q', 'r', 's', 't', 'u'];
  q.match_right = perm.map((src, i) => ({ id: rightIds[i], text_md: o.pairs[src][1] }));
  q.answer = { pairs: o.pairs.map((_, i) => ({ left_id: L[i], right_id: rightIds[perm.indexOf(i)] })) };
  const key = q.answer.pairs.map((p) => `(${p.left_id})–(${p.right_id})`).join(', ');
  q.solution_md = `**Key:** ${key}. ${o.sol}`;
  q.marking_scheme = [{ step: `Each correct pair ${q.marks / n} mark (${n} pairs)`, marks: q.marks }];
  return q;
}

/** Ordering: `items` in the CORRECT order; they are shown shuffled. */
export function ord(o) {
  const n = o.items.length;
  const q = common('ordering', { marks: o.marks ?? 2, time: 25 * n, ...o });
  const perm = permute(n, SEED++);
  const ids = perm.map((_, i) => L[i]);
  q.options = perm.map((src, i) => ({ id: ids[i], text_md: o.items[src] }));
  q.answer = { order: o.items.map((_, src) => ids[perm.indexOf(src)]) };
  q.solution_md = `**Correct order:** ${q.answer.order.map((x) => `(${x})`).join(' → ')}. ${o.sol}`;
  q.marking_scheme = o.scheme ? o.scheme.map(([step, marks]) => ({ step, marks })) : [{ step: 'Complete correct sequence (all items in place)', marks: q.marks }];
  return q;
}

function limitCheck(kind, o) {
  if (!o.wl) return;
  const n = wordCount(o.model);
  const [min, max] = o.wl;
  if (n < Math.floor(min * 0.8) || n > Math.ceil(max * 1.2)) problem(`${kind} model answer ${n} words outside ${min}–${max} (+/-20%): ${o.stem.slice(0, 60)}`);
  else if (n > max + Math.ceil(max * 0.1)) S.notes.push(`${kind} model answer ${n} words for ${min}–${max}: ${o.stem.slice(0, 50)}`);
}

function constructed(type, o) {
  const q = common(type, o);
  q.answer = { model_answer_md: o.model };
  if (o.wl) q.word_limit = { min: o.wl[0], max: o.wl[1] };
  q.marking_scheme = o.scheme.map(([step, marks]) => ({ step, marks }));
  limitCheck(type, o);
  return q;
}
/** Short answer (1–3 marks). */
export const short = (o) => constructed('short', { time: 60 * (o.marks ?? 2) + 30, ...o });
/** Long answer (4–6 marks). */
export const long = (o) => constructed('long', { time: 600, ...o });

/** Writing task: format, word limit [min, max], rubric [[criterion, marks, descriptor]]. */
export function writing(o) {
  const q = common('writing', { time: 900, bloom: 'create', ...o });
  q.answer = { model_answer_md: o.model };
  q.format = o.format;
  q.word_limit = { min: o.wl[0], max: o.wl[1] };
  q.rubric = o.rubric.map(([criterion, marks, descriptor_md]) => ({ criterion, marks, descriptor_md }));
  q.marking_scheme = o.scheme ? o.scheme.map(([step, marks]) => ({ step, marks })) : o.rubric.map(([criterion, marks, d]) => ({ step: `${criterion}: ${d}`, marks }));
  limitCheck('writing', o);
  return q;
}

/** Child part of a case/source item. `alts` = alternative parts (internal choice). */
export function child(id, proto, alts = []) {
  return { id, ...proto, alternatives: alts.map((a, i) => ({ id: `${id}-${['i', 'ii', 'iii'][i + 1] ?? i}`, ...a })) };
}

function childAnswer(c) {
  const a = c.answer;
  if ('option_ids' in a) return `(${a.option_ids[0]}) ${c.options.find((x) => x.id === a.option_ids[0]).text_md}`;
  if ('blanks' in a) return a.blanks.map((b) => b.accepted[0]).join('; ');
  if ('model_answer_md' in a) return a.model_answer_md;
  if ('order' in a) return a.order.map((x) => `(${x})`).join(' → ');
  if ('pairs' in a) return a.pairs.map((p) => `${p.left_id}–${p.right_id}`).join(', ');
  if ('value' in a) {
    const v = a.value.toLocaleString('en-IN');
    return a.unit === '₹' ? `**₹${v}**` : a.unit === '%' ? `**${v}%**` : `**${v}${a.unit ? ` ${a.unit}` : ''}**`;
  }
  return '';
}

/**
 * Case/source item: o.passage, o.origin ('soyl-original' | 'soyl-commentary'), o.parts = [child(…)…].
 * The parent's model answer and solution list every part and every alternative ("OR (c) (ii)").
 */
export function passage(type, o) {
  const marks = o.parts.reduce((s, c) => s + c.marks, 0);
  const label = (c, i) => (i === 0 ? `**(${c.id})${c.alternatives.length ? ' (i)' : ''}**` : `**OR (${c.id}) (${['i', 'ii', 'iii'][i]})**`);
  const each = (fn) => o.parts.flatMap((c) => [c, ...c.alternatives].map((x, i) => `${label(c, i)} ${fn(x)}`)).join('\n\n');
  const sol = o.sol ?? each((x) => x.solution_md);
  const q = common(type, { ...o, sol, marks, time: o.time ?? o.parts.reduce((s, c) => s + c.expected_time_sec, 0) + 120 });
  q.passage_md = o.passage;
  q.passage_origin = o.origin;
  q.children = o.parts;
  q.answer = { model_answer_md: each(childAnswer) };
  q.marking_scheme = o.parts.map((c) => ({ step: c.alternatives.length ? `Part (${c.id}): either (i) or (ii)` : `Part (${c.id})`, marks: c.marks }));
  return q;
}

/** Numerical (economics data): value, unit, optional tolerance; the solution must state the value. */
export function num(o) {
  const q = common('numerical', { marks: 1, time: 90, ...o });
  q.answer = { value: o.value, tolerance: o.tol ?? 0, unit: o.unit ?? null };
  q.marking_scheme = o.scheme ? o.scheme.map(([step, marks]) => ({ step, marks })) : [{ step: `Correct answer: ${o.value}${o.unit ? ` ${o.unit}` : ''}`, marks: q.marks }];
  return q;
}

/** Map item: places = [[id, name, kind, accepted?]…], 1 mark per place; map = outline map id. */
export function mapQ(o) {
  const n = o.places.length;
  const q = common('map', { marks: n, time: 60 * n, ...o });
  q.answer = { places: o.places.map(([id, name, kind, accepted = []]) => ({ id, name, accepted, kind })) };
  q.map_id = o.map ?? 'india-political';
  q.marking_scheme = o.places.map(([id, name]) => ({ step: `${id}: ${name} correctly located and labelled`, marks: 1 }));
  return q;
}
export const source = (o) => passage('source-based', o);
export const caseQ = (o) => passage('case-based', o);

/** Registers a question under a local key; ids are assigned in definition order. */
export function Q(key, proto) {
  if (S.keys.has(key)) problem(`duplicate key ${key}`);
  const id = `${S.prefix}_${String(S.questions.length + 1).padStart(3, '0')}`;
  const { children = [], passage_md, passage_origin, ...rest } = proto;
  const q = {
    id,
    unit: S.unit,
    language: 'en',
    ...rest,
    ...(passage_md !== undefined && { passage_md, passage_origin }),
    children,
    status: 'draft',
    version: 1,
    provenance: PROV,
  };
  S.questions.push(q);
  S.keys.set(key, q);
  return id;
}
export const qid = (key) => {
  const q = S.keys.get(key);
  if (!q) throw new Error(`unknown question key ${key}`);
  return q.id;
};

// ---------------------------------------------------------------- decks
/** Slide: layout, heading, { b: body, bl: bullets, cols: [left, right], v: visual, n: narration, chk: question key }. */
export function sl(layout, heading, o = {}) {
  return { layout, heading, b: o.b ?? '', bl: o.bl ?? [], cols: o.cols, v: o.v ?? null, n: o.n, chk: o.chk ?? null };
}
export function deck({ part = null, title, goals, slides }) {
  return {
    unit: S.unit,
    part,
    version: 1,
    title,
    language: 'en',
    goals,
    slides: slides.map((s, i) => ({
      id: `s${String(i + 1).padStart(2, '0')}`,
      layout: s.layout,
      heading: s.heading,
      body_md: s.b,
      bullets: s.bl,
      ...(s.cols && { columns: s.cols }),
      visual: s.v,
      math: [],
      narration: s.n,
      check_question_id: s.chk ? qid(s.chk) : null,
      audio: null,
    })),
    status: 'draft',
    provenance: PROV,
  };
}
export const table = (headers, rows, alt, caption) => ({ kind: 'table', spec: { headers, rows }, alt, ...(caption && { caption }) });
export function flow(direction, labels, alt, caption, edges) {
  const nodes = labels.map((label, i) => ({ id: `n${i + 1}`, label }));
  return {
    kind: 'flow',
    spec: { direction, nodes, edges: edges ?? nodes.slice(1).map((n, i) => ({ from: nodes[i].id, to: n.id })) },
    alt,
    ...(caption && { caption }),
  };
}
export const bars = ({ x, y, label, points }, alt, caption) => ({
  kind: 'plot',
  spec: { x, y, functions: [], points: [], series: [{ label, points, kind: 'bar' }], grid: true },
  alt,
  ...(caption && { caption }),
});

// ---------------------------------------------------------------- notes, cards
export function notes({ title, sections, tips }) {
  return {
    unit: S.unit,
    version: 1,
    title,
    language: 'en',
    sections: sections.map((s) => ({
      heading: s.h,
      body_md: s.b,
      key_terms: (s.terms ?? []).map(([term, definition_md]) => ({ term, definition_md })),
      formulas: [],
      visual: s.v ?? null,
      visuals: s.vs ?? [],
      topic_ids: topics(s.t),
    })),
    exam_tips_md: tips,
    status: 'draft',
    provenance: PROV,
  };
}
export function cards(list) {
  return {
    unit: S.unit,
    version: 1,
    language: 'en',
    cards: list.map(([front_md, back_md, tag, t], i) => ({ id: `f${String(i + 1).padStart(2, '0')}`, front_md, back_md, tag, topic_id: t ? topic(t) : null })),
    status: 'draft',
    provenance: PROV,
  };
}

// ---------------------------------------------------------------- tests
/**
 * sections: [{ id, title, instr, items: [key | { attempt, keys }] }]
 * blueprint: the subject blueprint id when the test follows it item for item (else null).
 */
export function test({ kind, title, duration, sections, blueprint = null }) {
  const short = kind === 'short';
  const subject = S.unit.replace(/-ch\d{2}$/, '');
  let total = 0;
  const secs = sections.map((s) => {
    const items = [];
    const groups = [];
    s.items.forEach((it, gi) => {
      if (typeof it === 'string') {
        const q = S.keys.get(it);
        if (!q) throw new Error(`test: unknown key ${it}`);
        items.push({ question_id: q.id, question_version: 1, marks: q.marks, choice_group: null });
        total += q.marks;
      } else {
        const g = `${s.id}${gi + 1}`;
        groups.push({ id: g, attempt: it.attempt });
        it.keys.forEach((k) => {
          const q = S.keys.get(k);
          if (!q) throw new Error(`test: unknown key ${k}`);
          items.push({ question_id: q.id, question_version: 1, marks: q.marks, choice_group: g });
        });
        total += it.attempt * S.keys.get(it.keys[0]).marks;
      }
    });
    return { id: s.id, title: s.title, instructions: s.instr, items, choice_groups: groups };
  });
  return {
    id: `${S.prefix.replace(/^q_/, 't_')}_${kind}`,
    kind: 'chapter',
    paper_type: short ? 'chapter-test-short' : 'chapter-test-long',
    blueprint_id: blueprint,
    title,
    subject_id: subject,
    chapter_ids: [S.unit],
    duration_min: duration,
    total_marks: total,
    shuffle: false,
    sections: secs,
    seed: `${S.unit}-${kind}-v1`,
    version: 1,
  };
}

// ---------------------------------------------------------------- build + validation
const NARRATION_SYMBOLS = /[$\\^_=<>→⇌↑↓×÷±√∞≈≠≤≥°Ω₀-₉⁰-⁹]|(?:^|[^A-Za-z])(?:[A-Z][a-z]?\d+(?:[A-Z][a-z]?\d*)*|(?:[A-Z][a-z]?){2,}\d+)(?![A-Za-z])/;

function allStrings(v, pathStr, out) {
  if (typeof v === 'string') out.push([pathStr, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => allStrings(x, `${pathStr}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) allStrings(x, `${pathStr}.${k}`, out);
  return out;
}

export function build({ dir, decks, notes: n, flashcards, tests, checks = {} }) {
  const release = {
    unit: S.unit,
    version: 1,
    academic_year: '2026-27',
    created_at: DATE,
    decks,
    notes: n,
    flashcards,
    questions: S.questions,
    build: { run_id: null, checks },
  };
  const errs = [...S.problems];
  const warn = [...S.notes];

  // Narration.
  const narr = decks.flatMap((d) => d.slides.map((s) => [s.id, s.narration]));
  for (const [id, t] of narr) {
    if (!t) errs.push(`slide ${id}: no narration`);
    else {
      if (wordCount(t) > 90) errs.push(`slide ${id}: narration ${wordCount(t)} words`);
      const m = NARRATION_SYMBOLS.exec(t);
      if (m) errs.push(`slide ${id}: narration symbol "${m[0]}"`);
      if (/["“”]/.test(t)) warn.push(`slide ${id}: narration has quote marks`);
    }
  }
  // Raw HTML / underline sanity.
  for (const [p, s] of allStrings(release, 'release', [])) {
    if (/<\/?[a-z][^>]*>/i.test(s) && !p.includes('spec')) errs.push(`${p}: raw HTML`);
    if (/\$/.test(s)) errs.push(`${p}: dollar sign (parsed as maths)`);
  }
  // Literature heuristics on every student-facing string.
  if (S.literature) {
    for (const [p, s] of allStrings({ decks, notes: n, flashcards, questions: S.questions }, '', [])) {
      if (/\.(id|unit|type|competency|bloom|status|layout|kind|language|passage_origin|format)$/.test(p) || /topic_ids|provenance|option_ids/.test(p)) continue;
      for (const i of checkLiterature(s)) (i.severity === 'error' ? errs : warn).push(`literature ${i.rule} ${p}: ${i.message}`);
    }
  }
  // Pipeline deterministic verify checks (stage 5).
  for (const q of S.questions) {
    for (const f of deterministicChecks(q)) (f.severity === 'minor' ? warn : errs).push(`verify ${q.id} ${f.check}: ${f.message}`);
  }
  // Answer-leak contract (api/test/content.test.ts, DB-6): key-side text (solution_md, model answers,
  // child solutions) of 60+ characters must not appear in served content (decks, notes, flashcards,
  // stems, options, passages). Checked per sentence, which is stricter than the API's whole-string test.
  {
    const strip = (q) => ({ s: q.stem_md, o: q.options, m: q.match_right, p: q.passage_md, c: (q.children ?? []).map((c) => ({ s: c.stem_md, o: c.options, m: c.match_right })) });
    const served = JSON.stringify({ decks, n, flashcards, q: S.questions.map(strip) }).replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\*/g, '');
    const keyTexts = [];
    for (const q of S.questions) {
      keyTexts.push([q.id, q.solution_md], [q.id, q.answer.model_answer_md ?? '']);
      for (const c of q.children) {
        keyTexts.push([`${q.id}/${c.id}`, c.solution_md], [`${q.id}/${c.id}`, c.answer.model_answer_md ?? '']);
        for (const a of c.alternatives ?? []) keyTexts.push([`${q.id}/${a.id}`, a.solution_md]);
      }
    }
    for (const [id, t] of keyTexts) {
      if (t.length >= 60 && served.includes(t.replace(/\*/g, ''))) errs.push(`answer leak ${id}: whole key text appears in served content`);
      for (const sent of t.split(/(?<=[.!?])\s+|\n+/)) {
        const s = sent.trim().replace(/\*/g, '');
        if (s.length >= 60 && served.includes(s)) errs.push(`answer leak ${id}: "${s.slice(0, 70)}…" also appears in served content`);
      }
    }
  }
  // Schemas.
  const pr = ChapterRelease.safeParse(release);
  if (!pr.success) errs.push(...pr.error.issues.slice(0, 15).map((i) => `ChapterRelease ${i.path.join('.')}: ${i.message}`));
  for (const t of tests) {
    const p = TestDefinition.safeParse(t);
    if (!p.success) errs.push(`${t.id}: ${p.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
  }
  const used = tests.map((t) => new Set(t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
  if (used.length === 2) {
    const shared = [...used[0]].filter((x) => used[1].has(x));
    if (shared.length) warn.push(`tests share ${shared.length} question(s): ${shared.join(', ')}`);
  }
  // Check slides must point at objective questions.
  const OBJ = ['mcq', 'multi-select', 'assertion-reason', 'numerical', 'fill-blank', 'match', 'true-false', 'code-output', 'ordering'];
  for (const d of decks) for (const s of d.slides) if (s.check_question_id) {
    const q = S.questions.find((x) => x.id === s.check_question_id);
    if (!q || !OBJ.includes(q.type)) errs.push(`slide ${s.id}: check question ${s.check_question_id} is not objective`);
  }

  // Editorial counts (the content gate's targets), so an unfinished chapter never builds clean.
  if (S.questions.length < 60) errs.push(`only ${S.questions.length} questions (60 needed for Class 12)`);
  if (flashcards.cards.length < 20 || flashcards.cards.length > 40) errs.push(`${flashcards.cards.length} flashcards (20–40)`);
  if (tests.length !== 2) errs.push(`${tests.length} tests (2 needed)`);
  if (!fs.existsSync(path.join(dir, 'README.md'))) errs.push('README.md missing');
  for (const d of decks) {
    const c = (l) => d.slides.filter((s) => s.layout === l).length;
    if (d.slides.length < 12 || d.slides.length > 25) errs.push(`deck ${d.part}: ${d.slides.length} slides (12–25)`);
    if (c('check') < 3 || c('check') > 5) errs.push(`deck ${d.part}: ${c('check')} check slides (3–5)`);
    if (c('example') < 2) errs.push(`deck ${d.part}: ${c('example')} worked examples (2+)`);
    if (!c('summary') || !c('exam-tips')) errs.push(`deck ${d.part}: summary and exam-tips slides needed`);
    let gap = 0;
    for (const s of d.slides) { gap = s.visual ? 0 : gap + 1; if (gap > 3) errs.push(`deck ${d.part}: more than 3 slides without a visual at ${s.id}`); }
  }

  fs.writeFileSync(path.join(dir, 'release.json'), JSON.stringify(release, null, 1) + '\n');
  fs.writeFileSync(path.join(dir, 'tests.json'), JSON.stringify({ tests }, null, 1) + '\n');

  // Pipeline lint (stage 4), the same function `content lint --exemplars` uses.
  const p = openPipeline({}, { log: () => {} });
  const lr = lintExemplar(p, { family: S.family, dir, unit: S.unit });
  for (const f of lr.findings) (f.severity === 'error' ? errs : warn).push(`lint ${f.rule} ${f.path}: ${f.message}`);

  // Stats.
  const qs = S.questions;
  const by = (f) => qs.reduce((m, q) => ((m[f(q)] = (m[f(q)] ?? 0) + 1), m), {});
  const mcqs = qs.filter((q) => q.type === 'mcq');
  const keyCount = mcqs.reduce((m, q) => ((m[q.answer.option_ids[0]] = (m[q.answer.option_ids[0]] ?? 0) + 1), m), {});
  const higher = qs.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency)).length;
  const children = qs.reduce((s, q) => s + q.children.length, 0);
  const marks = qs.reduce((s, q) => s + q.marks, 0);
  const words = narr.map(([, t]) => wordCount(t));
  const stats = {
    slides: decks.map((d) => `${d.slides.length} (${d.slides.filter((s) => s.visual).length} visuals, ${d.slides.filter((s) => s.layout === 'check').length} checks, ${d.slides.filter((s) => s.layout === 'example').length} examples)`).join(' + '),
    narration: `max ${Math.max(...words)}, mean ${Math.round(words.reduce((a, b) => a + b, 0) / words.length)}`,
    notes_sections: n.sections.length,
    flashcards: flashcards.cards.length,
    questions: `${qs.length} (${marks} marks), ${children} passage children`,
    types: by((q) => (q.type === 'short' || q.type === 'long' ? `${q.type}-${q.marks}` : q.type)),
    difficulty: by((q) => `d${q.difficulty}`),
    competency: by((q) => q.competency),
    application_plus: `${Math.round((100 * higher) / qs.length)}%`,
    mcq_keys: keyCount,
    ar_keys: qs.filter((q) => q.type === 'assertion-reason').map((q) => q.answer.option_ids[0]).join(','),
    topics: by((q) => q.topic_ids.map((t) => t.slice(-3)).join('+')),
    tests: tests.map((t) => `${t.paper_type} ${t.total_marks} marks / ${t.duration_min} min, ${t.sections.reduce((s, x) => s + x.items.length, 0)} items`),
    lint: `${lr.errors} error(s), ${lr.warnings} warning(s)`,
  };
  console.log(JSON.stringify(stats, null, 1));
  if (warn.length) console.log(`WARNINGS (${warn.length}):\n  ` + warn.join('\n  '));
  if (errs.length) {
    console.log(`ERRORS (${errs.length}):\n  ` + errs.join('\n  '));
    process.exitCode = 1;
    // A chapter with errors must not be picked up by the tree-wide gates (they scan every folder that
    // has release.json), so its output is parked as *.wip.json until it builds clean. Never committed.
    for (const f of ['release', 'tests']) fs.renameSync(path.join(dir, `${f}.json`), path.join(dir, `${f}.wip.json`));
    console.log('Output parked as release.wip.json / tests.wip.json');
  } else {
    for (const f of ['release', 'tests']) fs.rmSync(path.join(dir, `${f}.wip.json`), { force: true });
    console.log('NO ERRORS');
  }
  return stats;
}

// ---------------------------------------------------------------- SVG (economics diagrams)
// Small SVG builder in pixel coordinates (y down), theme colours only (currentColor and the
// var(--diagram-*) tokens of shared/content/svg-allowlist.ts). chart() maps data coordinates to pixels
// so that every plotted point of a curve is computed from its equation, never placed by eye.
const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r2 = (v) => +v.toFixed(2);
export class Svg {
  constructor(w, h) { this.w = w; this.h = h; this.parts = []; }
  style(o = {}) {
    const col = (c) => (c === 'accent' ? 'var(--diagram-accent)' : c === 'muted' ? 'var(--diagram-muted)' : c === 'fill' ? 'var(--diagram-fill)' : c ? `var(--diagram-${c})` : 'currentColor');
    const fill = o.fill ? col(o.fill) : 'none';
    const stroke = o.stroke === false ? 'none' : col(o.color);
    return `fill="${fill}"${o.fillOpacity ? ` fill-opacity="${o.fillOpacity}"` : ''} stroke="${stroke}" stroke-width="${o.sw ?? 2}"${o.dash ? ' stroke-dasharray="6 4"' : ''}`;
  }
  line(x1, y1, x2, y2, o) { this.parts.push(`<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" ${this.style(o)}/>`); return this; }
  polyline(pts, o) { this.parts.push(`<polyline points="${pts.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ')}" ${this.style(o)}/>`); return this; }
  polygon(pts, o) { this.parts.push(`<polygon points="${pts.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ')}" ${this.style(o)}/>`); return this; }
  rect(x, y, w, h, o = {}) { this.parts.push(`<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" rx="${o.rx ?? 8}" ${this.style(o)}/>`); return this; }
  path(d, o) { this.parts.push(`<path d="${d}" ${this.style(o)}/>`); return this; }
  dot(x, y, r = 4, color) { this.parts.push(`<circle cx="${r2(x)}" cy="${r2(y)}" r="${r}" fill="${color ? `var(--diagram-${color})` : 'currentColor'}" stroke="none"/>`); return this; }
  /** Arrowhead at (x, y) pointing in direction (dx, dy). */
  head(x, y, dx, dy, o = {}) {
    const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, s = o.size ?? 9;
    const pts = [[x, y], [x - s * ux - s * 0.5 * uy, y - s * uy + s * 0.5 * ux], [x - s * ux + s * 0.5 * uy, y - s * uy - s * 0.5 * ux]];
    this.parts.push(`<polygon points="${pts.map(([a, b]) => `${r2(a)},${r2(b)}`).join(' ')}" fill="${o.color ? `var(--diagram-${o.color})` : 'currentColor'}" stroke="none"/>`);
    return this;
  }
  arrow(x1, y1, x2, y2, o = {}) { this.line(x1, y1, x2, y2, o); return this.head(x2, y2, x2 - x1, y2 - y1, o); }
  text(x, y, s, o = {}) {
    const fill = o.color ? `var(--diagram-${o.color})` : o.muted ? 'var(--diagram-muted)' : 'currentColor';
    this.parts.push(`<text x="${r2(x)}" y="${r2(y)}" fill="${fill}" stroke="none" text-anchor="${o.anchor ?? 'middle'}" dominant-baseline="middle" font-size="${o.size ?? 14}"${o.bold ? ' font-weight="bold"' : ''}${o.italic ? ' font-style="italic"' : ''}>${escXml(s)}</text>`);
    return this;
  }
  /** Chart frame: data box [x0,x1]×[y0,y1] drawn in the pixel box (left, top, width, height). */
  chart({ x0 = 0, x1, y0 = 0, y1, left = 60, top = 20, width, height, xLabel, yLabel }) {
    const X = (x) => left + ((x - x0) / (x1 - x0)) * width;
    const Y = (y) => top + height - ((y - y0) / (y1 - y0)) * height;
    this.arrow(left, top + height, left + width + 14, top + height, { sw: 1.6 });
    this.arrow(left, top + height, left, top - 10, { sw: 1.6 });
    this.text(left - 10, top + height + 14, 'O', { size: 13 });
    const oIndex = this.parts.length - 1;
    if (xLabel) this.text(left + width + 10, top + height + 34, xLabel, { anchor: 'end', size: 13 });
    if (yLabel) this.text(left + 8, top - 12, yLabel, { anchor: 'start', size: 13 });
    const self = this;
    return {
      X, Y,
      fn(f, a, b, o, n = 40) { const pts = []; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; pts.push([X(x), Y(f(x))]); } self.polyline(pts, o); return this; },
      seg(p, q, o) { self.line(X(p[0]), Y(p[1]), X(q[0]), Y(q[1]), o); return this; },
      dot(p, color) { self.dot(X(p[0]), Y(p[1]), 4, color); return this; },
      label(p, s, o = {}) { self.text(X(p[0]) + (o.dx ?? 0), Y(p[1]) + (o.dy ?? 0), s, o); return this; },
      xTick(x, s) { if (x === x0) self.parts[oIndex] = ''; self.line(X(x), Y(y0), X(x), Y(y0) + 5, { sw: 1.2 }); self.text(X(x), Y(y0) + 16, s, { size: 12 }); return this; },
      yTick(y, s) { self.line(X(x0) - 5, Y(y), X(x0), Y(y), { sw: 1.2 }); self.text(X(x0) - 8, Y(y), s, { size: 12, anchor: 'end' }); return this; },
      drop(p, o = {}) { self.line(X(p[0]), Y(p[1]), X(p[0]), Y(y0), { sw: 1.2, dash: true, color: 'muted', ...o }); self.line(X(p[0]), Y(p[1]), X(x0), Y(p[1]), { sw: 1.2, dash: true, color: 'muted', ...o }); return this; },
    };
  }
  visual(alt, caption) {
    const spec = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" role="img" aria-label="${escXml(alt).replace(/"/g, '&quot;')}" font-family="sans-serif" font-size="14" fill="none"><title>${escXml(alt)}</title>${this.parts.join('')}</svg>`;
    return { kind: 'svg', spec, alt, ...(caption && { caption }) };
  }
}
