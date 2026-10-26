// Authoring library for hand-authored CBSE 10 Science chapters ch06–ch09 (subject-producer, D-025/D-026).
// Builders for slides, decks, visuals, SVG diagrams, questions (with balanced MCQ keys, case parts with
// `alternatives`), chapter tests on the default blueprints; an independent validator (KaTeX strict + mhchem,
// SVG allow-list via saxes, narration/TTS, check slides, word limits, statistics); a re-solve harness; and a
// call into the pipeline's own stage-4 lint. Run from platform/:
//   npx tsx content/authored/science/<chapter>/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import 'katex/contrib/mhchem';
import { SaxesParser } from 'saxes';
import { SVG_ALLOWED_ATTRIBUTES, SVG_ALLOWED_ELEMENTS, SVG_RULES, DIAGRAM_PALETTE } from '../../../../../shared/content/svg-allowlist.ts';
import { ChapterRelease, TestDefinition } from '../../../../../shared/content/index.ts';
import { openPipeline } from '../../../../../content-pipeline/src/pipeline.ts';
import { lintExemplar } from '../../../../../content-pipeline/src/commands/lint.ts';

export const r = String.raw;

// ---------------------------------------------------------------- context
const C = { nn: '', unit: '', title: '', prefix: '' };
export const PROV = { origin: 'human', template_version: null, model: null, generated_at: '2026-10-26', author: 'claude-opus-5-5 (subject-producer)' };
export function setChapter(nn, title) {
  C.nn = String(nn).padStart(2, '0');
  C.unit = `cbse-10-science-ch${C.nn}`;
  C.title = title;
  C.prefix = `q_cbse10sci_ch${C.nn}_`;
}
export const unit = () => C.unit;
export const T = (n) => `${C.unit}-t${String(n).padStart(2, '0')}`;
const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };

// ---------------------------------------------------------------- visuals
export const table = (headers, rows, alt, caption) => ({ kind: 'table', spec: { headers, rows }, alt, ...(caption ? { caption } : {}) });
export const flow = (direction, nodes, edges, alt, caption) => ({
  kind: 'flow',
  spec: { direction, nodes: nodes.map(([id, label]) => ({ id, label })), edges: edges.map(([from, to, label]) => (label ? { from, to, label } : { from, to })) },
  alt,
  ...(caption ? { caption } : {}),
});
export const chem = (equation, alt, caption) => ({ kind: 'chem', spec: { equation }, alt, ...(caption ? { caption } : {}) });
export const svgV = (spec, alt, caption) => ({ kind: 'svg', spec, alt, ...(caption ? { caption } : {}) });
export const plot = (spec, alt, caption) => ({ kind: 'plot', spec: { grid: true, functions: [], points: [], series: [], ...spec }, alt, ...(caption ? { caption } : {}) });

// ---------------------------------------------------------------- SVG helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = (n) => (Math.round(n * 10) / 10).toString();
/** Complete <svg> root with viewBox, role, aria-label and <title>. */
export function svgDoc(w, h, label, body, { size = 12 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" font-family="sans-serif" font-size="${size}" fill="none"><title>${esc(label)}</title>${body}</svg>`;
}
/** Small drawing kit; every helper returns an SVG fragment string. */
export const S = {
  text(x, y, s, { a = 'start', size, w, c = 'currentColor', it } = {}) {
    return `<text x="${f1(x)}" y="${f1(y)}" fill="${c}" stroke="none"${a !== 'start' ? ` text-anchor="${a}"` : ''}${size ? ` font-size="${size}"` : ''}${w ? ` font-weight="${w}"` : ''}${it ? ' font-style="italic"' : ''}>${esc(s)}</text>`;
  },
  /** Multi-line text, lines `dy` apart. */
  lines(x, y, arr, o = {}) {
    return arr.map((s, i) => S.text(x, y + i * (o.dy ?? 13), s, o)).join('');
  },
  line(x1, y1, x2, y2, { c = 'currentColor', w = 1.5, dash, cap } = {}) {
    return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}${cap ? ` stroke-linecap="${cap}"` : ''}/>`;
  },
  /** Thin muted leader line from a label to a part. */
  lead(x1, y1, x2, y2) {
    return S.line(x1, y1, x2, y2, { c: 'var(--diagram-muted)', w: 1 });
  },
  path(d, { c = 'currentColor', w = 1.5, fill = 'none', dash, op, fop, join, cap } = {}) {
    return `<path d="${d}" fill="${fill}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}${op !== undefined ? ` stroke-opacity="${op}"` : ''}${fop !== undefined ? ` fill-opacity="${fop}"` : ''}${join ? ` stroke-linejoin="${join}"` : ''}${cap ? ` stroke-linecap="${cap}"` : ''}/>`;
  },
  rect(x, y, w, h, { c = 'currentColor', sw = 1.5, fill = 'none', rx, fop, dash } = {}) {
    return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}"${rx ? ` rx="${rx}"` : ''} fill="${fill}" stroke="${c}" stroke-width="${sw}"${fop !== undefined ? ` fill-opacity="${fop}"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  },
  circle(cx, cy, rr, { c = 'currentColor', sw = 1.5, fill = 'none', fop, dash } = {}) {
    return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rr)}" fill="${fill}" stroke="${c}" stroke-width="${sw}"${fop !== undefined ? ` fill-opacity="${fop}"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  },
  ellipse(cx, cy, rx, ry, { c = 'currentColor', sw = 1.5, fill = 'none', fop, dash } = {}) {
    return `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${fill}" stroke="${c}" stroke-width="${sw}"${fop !== undefined ? ` fill-opacity="${fop}"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  },
  /** Filled arrowhead with its tip at (x, y), pointing along angle `ang` (radians, screen coordinates). */
  head(x, y, ang, { size = 7, c = 'currentColor' } = {}) {
    const a1 = ang + Math.PI - 0.42;
    const a2 = ang + Math.PI + 0.42;
    const p = [[x, y], [x + size * Math.cos(a1), y + size * Math.sin(a1)], [x + size * Math.cos(a2), y + size * Math.sin(a2)]];
    return `<polygon points="${p.map(([a, b]) => `${f1(a)},${f1(b)}`).join(' ')}" fill="${c}" stroke="none"/>`;
  },
  /** Straight arrow from (x1, y1) to (x2, y2) with a head at the end. */
  arrow(x1, y1, x2, y2, { c = 'currentColor', w = 1.5, size = 7, dash } = {}) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const bx = x2 - (size * 0.8) * Math.cos(ang);
    const by = y2 - (size * 0.8) * Math.sin(ang);
    return S.line(x1, y1, bx, by, { c, w, dash }) + S.head(x2, y2, ang, { size, c });
  },
  /** Arrowhead placed in the middle of a segment (for light rays). */
  midHead(x1, y1, x2, y2, { c = 'currentColor', size = 7, at = 0.5 } = {}) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const x = x1 + (x2 - x1) * at + (size / 2) * Math.cos(ang);
    const y = y1 + (y2 - y1) * at + (size / 2) * Math.sin(ang);
    return S.head(x, y, ang, { size, c });
  },
};

// ---------------------------------------------------------------- slides and decks
/** sl(layout, heading, { b: body_md, ul: bullets, cols, v: visual, m: math, n: narration, chk: question key }) */
export function sl(layout, heading, o) {
  const s = { id: '', layout, heading, body_md: o.b ?? '', bullets: o.ul ?? [] };
  if (o.cols) s.columns = o.cols;
  s.visual = o.v ?? null;
  s.math = o.m ?? [];
  s.narration = o.n;
  s.check_question_id = o.chk ?? null; // a question key, resolved to an id at build time
  s.audio = null;
  return s;
}
export function deck({ part, title, goals, slides }) {
  return { unit: C.unit, part, version: 1, title, language: 'en', goals, slides: slides.map((s, i) => ({ ...s, id: `s${String(i + 1).padStart(2, '0')}` })), status: 'draft', provenance: PROV };
}

// ---------------------------------------------------------------- questions
const AR_OPTIONS = [
  { id: 'a', text_md: 'Both A and R are true, and R is the correct explanation of A.' },
  { id: 'b', text_md: 'Both A and R are true, but R is not the correct explanation of A.' },
  { id: 'c', text_md: 'A is true, but R is false.' },
  { id: 'd', text_md: 'A is false, but R is true.' },
];
const scheme = (s) => s.map(([step, marks]) => ({ step, marks }));
const DEFAULT_WL = { 'short-1': [5, 30], 'short-2': [30, 50], 'short-3': [50, 80], 'long-5': [80, 120] };
function base(o, type, marks, answer, options = []) {
  const q = {
    type,
    stem_md: o.stem,
    options,
    match_right: o.right_col ?? [],
    answer,
    solution_md: o.sol,
    marking_scheme: scheme(o.scheme),
    marks,
    difficulty: o.d,
    competency: o.c,
    bloom: o.bloom ?? BLOOM[o.c],
    topic_ids: o.t.map(T),
    expected_time_sec: o.time ?? { 1: 60, 2: 150, 3: 270, 4: 480, 5: 570 }[marks] ?? 60,
    assets: o.assets ?? [],
  };
  if ((type === 'short' || type === 'long') && o.wl !== null) {
    const wl = o.wl ?? DEFAULT_WL[`${type}-${marks}`];
    if (wl) q.word_limit = { min: wl[0], max: wl[1] };
  }
  return q;
}
const MCQ = new WeakMap(); // question object -> { right, wrong }
export const mk = {
  /** mcq: `right` (correct text), `wrong` (3 distractors); solution/scheme may use @K (key letter) and @1 @2 @3 (letters of wrong[0..2]). */
  mcq(o) {
    const q = base({ scheme: o.scheme ?? [['Correct option (@K)', 1]], ...o }, 'mcq', 1, { option_ids: ['?'] }, []);
    MCQ.set(q, { right: o.right, wrong: o.wrong, key: o.key ?? null });
    return q;
  },
  ar(o) {
    return base({ ...o, stem: `**Assertion (A):** ${o.a}\n\n**Reason (R):** ${o.r}\n\nChoose the correct option.`, scheme: o.scheme ?? [[`Correct option (${o.key})`, 1]], time: o.time ?? 75 }, 'assertion-reason', 1, { option_ids: [o.key] }, AR_OPTIONS);
  },
  tf(o) {
    return base({ scheme: [[`${o.key === 't' ? 'True' : 'False'}${o.key === 'f' ? ', with the correction' : ''}`, 1]], time: 45, ...o, stem: `True or false? ${o.stem}` }, 'true-false', 1, { option_ids: [o.key] }, [{ id: 't', text_md: 'True' }, { id: 'f', text_md: 'False' }]);
  },
  fill(o) {
    return base({ scheme: [[`Writes "${o.acc.map((a) => a[0]).join('", "')}"`, 1]], time: 45, ...o }, 'fill-blank', o.marks ?? 1, { blanks: o.acc.map((accepted) => ({ accepted })) });
  },
  /** match: o.pairs [[left, right]…] in matching order; o.order[i] = letter index (p q r s) of the right item paired with left item i. */
  match(o) {
    const left = o.pairs.map(([l], i) => ({ id: String(i + 1), text_md: l }));
    const rightById = o.pairs.map(([, rt], i) => ({ id: 'pqrs'[o.order[i]], text_md: rt })).sort((a, b) => a.id.localeCompare(b.id));
    const pairs = o.pairs.map((_, i) => ({ left_id: String(i + 1), right_id: 'pqrs'[o.order[i]] }));
    return base(
      { scheme: pairs.map((p) => [`${p.left_id} → ${p.right_id}`, (o.marks ?? 2) / o.pairs.length]), time: 150, ...o, right_col: rightById },
      'match',
      o.marks ?? 2,
      { pairs },
      left,
    );
  },
  num(o) {
    return base(o, 'numerical', o.marks ?? 1, { value: o.value, tolerance: o.tol ?? 0, unit: o.unit ?? null });
  },
  short(o) {
    return base(o, 'short', o.marks, { model_answer_md: o.model });
  },
  long(o) {
    return base(o, 'long', 5, { model_answer_md: o.model });
  },
  /** A case part: `q` built with mk.*, optional alternatives (same marks). */
  part(id, q, alts = []) {
    const p = { id, ...q, _alts: alts };
    if (MCQ.has(q)) MCQ.set(p, MCQ.get(q));
    return p;
  },
  /** Case-based parent. o: { passage, children: [part…], d, c, t?, time? } */
  case(o) {
    return {
      type: 'case-based',
      stem_md: 'Read the passage and answer the questions that follow.',
      passage_md: o.passage,
      passage_origin: 'soyl-original',
      options: [],
      match_right: [],
      answer: { model_answer_md: '' },
      solution_md: '',
      marking_scheme: o.children.map((c) => ({ step: `Part (${c.id})${c._alts.length ? ': either (i) or (ii)' : ''}`, marks: c.marks })),
      marks: o.children.reduce((s, c) => s + c.marks, 0),
      difficulty: o.d,
      competency: o.c,
      bloom: o.bloom ?? BLOOM[o.c],
      topic_ids: (o.t ?? [...new Set(o.children.flatMap((c) => c.topic_ids))].map((x) => Number(x.slice(-2)))).map(T),
      expected_time_sec: o.time ?? 480,
      assets: o.assets ?? [],
      _children: o.children,
    };
  },
};

const REG = []; // { key, q, check }
/** Registers a bank question under a key; `check` is an independent re-solve (returns true or a message). */
export function add(key, q, check = null) {
  if (REG.some((e) => e.key === key)) throw new Error(`duplicate key ${key}`);
  REG.push({ key, q, check });
}
export const reg = () => REG;

// Seeded RNG for balanced key placement.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}
function placeMcq(q, letter) {
  const m = MCQ.get(q);
  const idx = 'abcd'.indexOf(letter);
  const texts = [...m.wrong];
  texts.splice(idx, 0, m.right);
  q.options = texts.map((text_md, i) => ({ id: 'abcd'[i], text_md }));
  q.answer = { option_ids: [letter] };
  const wl = m.wrong.map((w) => 'abcd'[texts.indexOf(w)]);
  const sub = (s) => s.replace(/@K/g, letter).replace(/@1/g, wl[0]).replace(/@2/g, wl[1]).replace(/@3/g, wl[2]);
  q.solution_md = sub(q.solution_md);
  q.marking_scheme = q.marking_scheme.map((s) => ({ ...s, step: sub(s.step) }));
  q._key = letter;
}
function answerText(q) {
  const a = q.answer;
  if (q.type === 'mcq') return `(${a.option_ids[0]}) ${q.options.find((o) => o.id === a.option_ids[0]).text_md}`;
  if (q.type === 'true-false') return a.option_ids[0] === 't' ? 'True.' : 'False.';
  if (q.type === 'assertion-reason') return `(${a.option_ids[0]})`;
  if ('model_answer_md' in a) return a.model_answer_md;
  if ('blanks' in a) return a.blanks.map((b) => b.accepted[0]).join('; ');
  if ('value' in a) return `${a.value}${a.unit ? ` ${a.unit}` : ''}`;
  if ('pairs' in a) return a.pairs.map((p) => `${p.left_id} → ${p.right_id}`).join(', ');
  return '';
}

/** Assigns ids, places MCQ keys (balanced, seeded), composes case parents, resolves check-slide keys. */
export function finalize({ seed = 7, decks }) {
  const bank = [];
  const parts = [];
  for (const { q } of REG) {
    if (q.type === 'mcq') bank.push(q);
    for (const c of q._children ?? []) {
      if (c.type === 'mcq') parts.push(c);
      for (const a of c._alts) if (a.type === 'mcq') parts.push(a);
    }
  }
  // Balanced letters, separately for bank MCQs and case parts: fixed keys first, then a seeded shuffle of
  // the remaining letters so each letter is used about equally.
  const rand = rng(seed);
  for (const mcqs of [bank, parts]) {
    const counts = { a: 0, b: 0, c: 0, d: 0 };
    for (const q of mcqs) if (MCQ.get(q).key) counts[MCQ.get(q).key]++;
    const free = mcqs.filter((q) => !MCQ.get(q).key).length;
    const pool = [];
    for (let round = 0; pool.length < free; round++) for (const l of 'abcd') if (counts[l] <= round && pool.length < free) pool.push(l);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    let k = 0;
    for (const q of mcqs) placeMcq(q, MCQ.get(q).key ?? pool[k++]);
  }

  const questions = REG.map(({ key, q }, i) => {
    const id = `${C.prefix}${String(i + 1).padStart(3, '0')}`;
    const out = { id, unit: C.unit, language: 'en', ...q };
    delete out._key;
    if (q.type === 'case-based') {
      const kids = q._children.map((c) => {
        const { _alts, _key, ...rest } = c;
        void _key;
        const child = { ...rest, alternatives: [] };
        if (_alts.length) {
          child.stem_md = `**Either** (i): ${child.stem_md}`;
          child.alternatives = _alts.map((a, j) => {
            const { _key: k2, ...ar } = a;
            void k2;
            return { id: `${c.id}-${['ii', 'iii'][j]}`, ...ar, stem_md: `**Or** (${['ii', 'iii'][j]}): ${ar.stem_md}` };
          });
        }
        return child;
      });
      const model = kids
        .map((c) => `**(${c.id})** ${c.alternatives.length ? '(i) ' : ''}${answerText(c)}${c.alternatives.map((a, j) => `\n\n**OR** (${['ii', 'iii'][j]}) ${answerText(a)}`).join('')}`)
        .join('\n\n');
      const sol = kids
        .map((c) => `**(${c.id})** ${c.alternatives.length ? '(i) ' : ''}${c.solution_md}${c.alternatives.map((a, j) => `\n\n(${['ii', 'iii'][j]}) ${a.solution_md}`).join('')}`)
        .join('\n\n');
      out.answer = { model_answer_md: model };
      out.solution_md = sol;
      out.children = kids;
      delete out._children;
    } else out.children = [];
    out.status = 'draft';
    out.version = 1;
    out.provenance = PROV;
    return { key, id, q: out };
  });
  const byKey = new Map(questions.map((e) => [e.key, e]));
  for (const d of decks)
    for (const s of d.slides)
      if (s.check_question_id) {
        const e = byKey.get(s.check_question_id);
        if (!e) throw new Error(`check slide ${d.part}/${s.id}: unknown key ${s.check_question_id}`);
        s.check_question_id = e.id;
      }
  return { questions: questions.map((e) => e.q), byKey };
}

// ---------------------------------------------------------------- tests (default blueprints)
export function buildTests(byKey, { short, long }) {
  const item = (k, group = null) => {
    const e = byKey.get(k);
    if (!e) throw new Error(`test: unknown key ${k}`);
    return { question_id: e.id, question_version: 1, marks: e.q.marks, choice_group: group, _q: e.q };
  };
  const expect = (items, spec, where) => {
    const got = items.map((i) => `${i._q.type}:${i._q.marks}${i.choice_group ? '*' : ''}`).join(' ');
    if (got !== spec) throw new Error(`${where}: got "${got}", blueprint wants "${spec}"`);
  };
  const strip = (items) => items.map(({ _q, ...rest }) => (void _q, rest));
  const sTitle = `Chapter test (short) — ${C.title}`;
  const lTitle = `Chapter test (long) — ${C.title}`;
  const sA = short.A.map((k) => item(k));
  expect(sA, 'mcq:1 mcq:1 mcq:1 assertion-reason:1', 'short A');
  const sB = short.B.map((k) => item(k));
  expect(sB, 'short:2 short:2 short:3', 'short B');
  const sC = short.C.map((k) => item(k, 'C1'));
  expect(sC, 'long:5* long:5*', 'short C');
  const sD = short.D.map((k) => item(k));
  expect(sD, 'case-based:4', 'short D');
  const lA = long.A.map((k) => item(k));
  expect(lA, 'mcq:1 mcq:1 mcq:1 mcq:1 mcq:1 mcq:1 mcq:1 mcq:1 assertion-reason:1 assertion-reason:1', 'long A');
  const [b1, b2, [b3, b4], b5, [b6, b7]] = long.B;
  const lB = [item(b1), item(b2), item(b3, 'B1'), item(b4, 'B1'), item(b5), item(b6, 'B2'), item(b7, 'B2')];
  expect(lB, 'short:2 short:2 short:2* short:2* short:3 short:3* short:3*', 'long B');
  const [c1, [c2, c3]] = long.C;
  const lC = [item(c1), item(c2, 'C1'), item(c3, 'C1')];
  expect(lC, 'long:5 long:5* long:5*', 'long C');
  const lD = long.D.map((k) => item(k));
  expect(lD, 'case-based:4 case-based:4', 'long D');
  const subject = 'cbse-10-science';
  const tests = [
    {
      id: `t_cbse10sci_ch${C.nn}_short`,
      kind: 'chapter',
      paper_type: 'chapter-test-short',
      blueprint_id: 'cbse-10-default-chapter-test-short',
      title: sTitle,
      subject_id: subject,
      chapter_ids: [C.unit],
      duration_min: 40,
      total_marks: 20,
      shuffle: false,
      seed: `${C.unit}-short-v1`,
      version: 1,
      sections: [
        { id: 'A', title: 'Section A — Objective (1 mark each)', instructions: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: strip(sA), choice_groups: [] },
        { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instructions: 'Answer in about 30–50 words for 2-mark questions and 50–80 words for the 3-mark question. Draw labelled diagrams where asked.', items: strip(sB), choice_groups: [] },
        { id: 'C', title: 'Section C — Long answer (5 marks)', instructions: 'Answer any ONE of the two questions in about 80–120 words. Draw labelled diagrams where useful.', items: strip(sC), choice_groups: [{ id: 'C1', attempt: 1 }] },
        { id: 'D', title: 'Section D — Case-based (4 marks)', instructions: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: strip(sD), choice_groups: [] },
      ],
    },
    {
      id: `t_cbse10sci_ch${C.nn}_long`,
      kind: 'chapter',
      paper_type: 'chapter-test-long',
      blueprint_id: 'cbse-10-default-chapter-test-long',
      title: lTitle,
      subject_id: subject,
      chapter_ids: [C.unit],
      duration_min: 90,
      total_marks: 40,
      shuffle: false,
      seed: `${C.unit}-long-v1`,
      version: 1,
      sections: [
        { id: 'A', title: 'Section A — Objective (1 mark each)', instructions: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: strip(lA), choice_groups: [] },
        { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instructions: 'Answer in about 30–50 words for 2-mark questions and 50–80 words for 3-mark questions. There is an internal choice in one 2-mark and one 3-mark question.', items: strip(lB), choice_groups: [{ id: 'B1', attempt: 1 }, { id: 'B2', attempt: 1 }] },
        { id: 'C', title: 'Section C — Long answer (5 marks)', instructions: 'Answer the first question and any ONE of the next two, in about 80–120 words each. Draw labelled diagrams where useful.', items: strip(lC), choice_groups: [{ id: 'C1', attempt: 1 }] },
        { id: 'D', title: 'Section D — Case-based (4 marks each)', instructions: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: strip(lD), choice_groups: [] },
      ],
    },
  ];
  const sIds = new Set(tests[0].sections.flatMap((s) => s.items.map((i) => i.question_id)));
  const overlap = tests[1].sections.flatMap((s) => s.items.map((i) => i.question_id)).filter((id) => sIds.has(id));
  if (overlap.length) throw new Error(`short and long tests share ${overlap.join(', ')}`);
  return tests;
}

// ---------------------------------------------------------------- validator
/** Narration is read by TTS (same pattern as the pipeline lint, plus unit abbreviations and gene symbols). */
const NARR_LINT = /[$\\^_=<>→⇌↑↓×÷±√∞≈≠≤≥°Ω₀-₉⁰-⁹]|(?:^|[^A-Za-z])(?:[A-Z][a-z]?\d+(?:[A-Z][a-z]?\d*)*|(?:[A-Z][a-z]?){2,}\d+)(?![A-Za-z])/;
const NARR_EXTRA = /\b\d+(?:\.\d+)?\s?(?:cm|mm|km|m|ml|mL|kg|g|s|ms|D|Hz|nm)\b|\b(?:XX|XY|Tt|TT|tt|Rr|RR|rr|Yy|YY|yy|RrYy|RRYY|rryy)\b|\be\.g\.|\bi\.e\.|&|%|\//;

function walkStrings(v, p, out) {
  if (typeof v === 'string') out.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walkStrings(x, `${p}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walkStrings(x, `${p}.${k}`, out);
  return out;
}
function mathSpans(s) {
  const spans = [];
  const re = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let m;
  while ((m = re.exec(s))) spans.push([m[1] ?? m[2], !!m[1]]);
  return spans;
}
const wc = (t) => (t.trim() ? t.trim().split(/\s+/u).length : 0);
const stripMath = (s) => s.replace(/\$\$[^$]+\$\$|\$[^$]+\$/g, ' ');

export function validate(release, tests) {
  const errors = [];
  const warns = [];
  const err = (p, m) => errors.push(`${p}: ${m}`);
  const strings = walkStrings(release, '$', []);
  // KaTeX (strict) over every $…$ span, math[] entry and chem equation
  let math = 0;
  const kx = (p, tex, display) => {
    math++;
    try {
      katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'error', trust: false });
    } catch (e) {
      err(p, `KaTeX: ${e.message.slice(0, 120)} in ${tex.slice(0, 60)}`);
    }
  };
  let svgs = 0;
  const svgIdsByPage = new Map();
  const els = new Set(SVG_ALLOWED_ELEMENTS);
  const attrs = new Set(SVG_ALLOWED_ATTRIBUTES);
  const palette = new Set(DIAGRAM_PALETTE);
  const classRe = new RegExp(SVG_RULES.classPattern);
  for (const [p, s] of strings) {
    if (/\.spec$/.test(p) && s.startsWith('<svg')) {
      svgs++;
      const page = /^\$\.(decks\[\d+\]|notes|questions\[\d+\]|flashcards)/.exec(p)?.[0] ?? p;
      let viewBox = false;
      let title = false;
      let depth = 0;
      const parser = new SaxesParser({ xmlns: false });
      parser.on('error', (e) => err(p, `XML: ${e.message}`));
      parser.on('opentag', (tag) => {
        depth++;
        if (!els.has(tag.name)) err(p, `<${tag.name}> not allowed`);
        if (tag.name === 'title') title = true;
        for (const [k, v] of Object.entries(tag.attributes)) {
          if (!attrs.has(k)) err(p, `attribute ${k} not allowed on <${tag.name}>`);
          if (k === 'viewBox' && tag.name === 'svg' && depth === 1) viewBox = true;
          if (/^on/i.test(k) || k === 'style') err(p, `forbidden ${k}`);
          if (k === 'href' && !v.startsWith('#')) err(p, 'non-fragment href');
          if (/url\(/.test(v) && !/^url\(#[\w-]+\)$/.test(v)) err(p, 'non-fragment url()');
          if (['fill', 'stroke', 'stop-color'].includes(k) && !palette.has(v) && !/^url\(#/.test(v)) err(p, `colour ${v} not in palette`);
          if (k === 'class') for (const c of v.split(/\s+/)) if (!classRe.test(c)) err(p, `class ${c}`);
          if (k === 'id') {
            const key = `${page}|${v}`;
            const prev = svgIdsByPage.get(key);
            if (prev && prev !== p) err(p, `id ${v} also used at ${prev}`);
            svgIdsByPage.set(key, p);
          }
          if (k === 'font-size' && Number(v) < 10) warns.push(`${p}: font-size ${v} < 10`);
        }
      });
      parser.on('closetag', () => depth--);
      parser.write(s).close();
      if (!viewBox) err(p, 'no viewBox');
      if (!title) err(p, 'no <title>');
      if (Buffer.byteLength(s) > SVG_RULES.maxBytes) err(p, 'SVG too large');
      continue;
    }
    if (/\.math\[\d+\]$|\.latex$/.test(p)) kx(p, s, true);
    else if (/\.spec\.equation$/.test(p)) kx(p, `\\ce{${s}}`, true);
    else {
      for (const [tex, d] of mathSpans(s)) kx(p, tex, d);
      if ((s.replace(/\\\$/g, '').match(/\$/g) || []).length % 2) err(p, 'odd number of $');
    }
    if (/(^|[^\\A-Za-z])(ce|frac|dfrac|text|mathrm|times|sqrt)\{/.test(s) && !/\.spec\.equation$/.test(p)) err(p, 'LaTeX command without backslash');
    if (/[\u0000-\u0009\u000b\u000c\u000e-\u001f]/.test(s)) err(p, 'control character');
    if (/\bdata:/i.test(stripMath(s))) err(p, '"data:" reads as a URL scheme');
  }
  // Narration
  const narr = [];
  for (const d of release.decks)
    for (const s of d.slides) {
      const n = wc(s.narration);
      narr.push(n);
      const where = `deck${d.part}/${s.id}`;
      if (n > 90) err(where, `narration ${n} words`);
      const m = NARR_LINT.exec(s.narration) || NARR_EXTRA.exec(s.narration);
      if (m) err(where, `narration symbol/abbreviation "${m[0]}"`);
    }
  // Check slides → objective questions
  const byId = new Map(release.questions.map((q) => [q.id, q]));
  const OBJ = ['mcq', 'multi-select', 'assertion-reason', 'numerical', 'fill-blank', 'match', 'true-false'];
  for (const d of release.decks)
    for (const s of d.slides) if (s.check_question_id && !OBJ.includes(byId.get(s.check_question_id)?.type)) err(`deck${d.part}/${s.id}`, 'check slide must point to an objective question');
  // Word limits (same slack as the pipeline lint)
  const wlCheck = (q, p) => {
    if (q.word_limit && 'model_answer_md' in q.answer) {
      const n = wc(stripMath(q.answer.model_answer_md));
      if (n < Math.floor(q.word_limit.min * 0.8) || n > Math.ceil(q.word_limit.max * 1.2)) warns.push(`${p}: model answer ${n} words vs ${q.word_limit.min}–${q.word_limit.max}`);
    }
  };
  for (const q of release.questions) {
    wlCheck(q, q.id);
    for (const c of q.children) {
      wlCheck(c, `${q.id}/${c.id}`);
      for (const a of c.alternatives) wlCheck(a, `${q.id}/${a.id}`);
    }
    const allText = [q.stem_md, q.solution_md, ...q.options.map((o) => o.text_md)].join(' ');
    if (/@[K123]/.test(allText)) err(q.id, 'unreplaced @ placeholder');
  }
  // Deck shape
  const deckStats = release.decks.map((d) => {
    let gap = 0;
    let maxGap = 0;
    for (const s of d.slides) {
      gap = s.visual ? 0 : gap + 1;
      maxGap = Math.max(maxGap, gap);
    }
    const lay = (l) => d.slides.filter((s) => s.layout === l).length;
    if (maxGap > 3) err(`deck${d.part}`, `visual gap ${maxGap}`);
    if (d.slides.length < 12 || d.slides.length > 25) err(`deck${d.part}`, `${d.slides.length} slides`);
    if (lay('example') < 2) err(`deck${d.part}`, 'fewer than 2 worked examples');
    if (lay('check') < 3 || lay('check') > 5) err(`deck${d.part}`, `${lay('check')} checks`);
    if (!lay('summary') || !lay('exam-tips')) err(`deck${d.part}`, 'summary/exam-tips missing');
    return { slides: d.slides.length, visuals: d.slides.filter((s) => s.visual).length, maxGap, examples: lay('example'), checks: lay('check') };
  });
  return { errors, warns, math, svgs, narr: { slides: narr.length, max: Math.max(...narr), min: Math.min(...narr), mean: Math.round(narr.reduce((a, b) => a + b, 0) / narr.length) }, deckStats };
}

export function stats(release) {
  const qs = release.questions;
  const by = (f) => qs.reduce((m, q) => ((m[f(q)] = (m[f(q)] ?? 0) + 1), m), {});
  const higher = qs.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency));
  const totalMarks = qs.reduce((s, q) => s + q.marks, 0);
  const keys = { a: 0, b: 0, c: 0, d: 0 };
  for (const q of qs) if (q.type === 'mcq') keys[q.answer.option_ids[0]]++;
  const arKeys = qs.filter((q) => q.type === 'assertion-reason').map((q) => q.answer.option_ids[0]).join('');
  const topics = {};
  for (const q of qs) for (const t of q.topic_ids) topics[t.slice(-3)] = (topics[t.slice(-3)] ?? 0) + 1;
  const visualKinds = {};
  for (const d of release.decks) for (const s of d.slides) if (s.visual) visualKinds[s.visual.kind] = (visualKinds[s.visual.kind] ?? 0) + 1;
  const svgSet = new Set();
  const walk = (v) => {
    if (v && typeof v === 'object') {
      if (v.kind === 'svg') svgSet.add(v.spec);
      Object.values(v).forEach(walk);
    }
  };
  walk(release);
  return {
    questions: qs.length,
    marks: totalMarks,
    types: by((q) => (q.type === 'short' ? `short${q.marks}` : q.type)),
    difficulty: by((q) => `d${q.difficulty}`),
    competency: by((q) => q.competency),
    higherItems: `${Math.round((higher.length / qs.length) * 100)}%`,
    higherMarks: `${Math.round((higher.reduce((s, q) => s + q.marks, 0) / totalMarks) * 100)}%`,
    mcqKeys: keys,
    arKeys,
    topics,
    flashcards: release.flashcards.cards.length,
    notesSections: release.notes.sections.length,
    slides: release.decks.map((d) => d.slides.length),
    visualKinds,
    distinctSvgs: svgSet.size,
    wordLimits: qs.filter((q) => q.word_limit).length,
  };
}

/** Builds, validates, lints and writes a chapter. */
export function writeChapter({ dir, decks, notes, flashcards, tests: testSpec, checksExtra = {}, seed }) {
  const { questions, byKey } = finalize({ seed, decks });
  const tests = buildTests(byKey, testSpec);
  const release = { unit: C.unit, version: 1, academic_year: '2026-27', created_at: '2026-10-26T00:00:00+05:30', decks, notes, flashcards, questions, build: { run_id: null, checks: {} } };
  // Re-solve harness
  const resolveLog = [];
  let solved = 0;
  for (const e of REG) {
    if (!e.check) continue;
    const id = byKey.get(e.key).id;
    let res;
    try {
      res = e.check(byKey.get(e.key).q);
    } catch (x) {
      res = `threw ${x.message}`;
    }
    if (res === true) {
      solved++;
      resolveLog.push(`ok   ${id} ${e.key}`);
    } else resolveLog.push(`FAIL ${id} ${e.key}: ${res}`);
  }
  const v = validate(release, tests);
  const st = stats(release);
  const parsed = ChapterRelease.safeParse(release);
  if (!parsed.success) v.errors.push(...parsed.error.issues.slice(0, 20).map((i) => `schema ${i.path.join('.')}: ${i.message}`));
  for (const t of tests) {
    const pt = TestDefinition.safeParse(t);
    if (!pt.success) v.errors.push(...pt.error.issues.map((i) => `test ${t.id} ${i.path.join('.')}: ${i.message}`));
  }
  const fails = resolveLog.filter((l) => l.startsWith('FAIL'));
  release.build.checks = {
    katex_mhchem: `${v.math} math strings parsed with KaTeX ${katex.version} + mhchem (throwOnError, strict "error"), ${v.errors.filter((e) => e.includes('KaTeX')).length} failures`,
    svg_allowlist: `${v.svgs} SVG visuals (${st.distinctSvgs} distinct diagrams) checked with saxes against svg-allowlist.ts: elements, attributes, class pattern, fragment-only refs, no style, palette incl. named hues, viewBox, title, per-page unique ids — ${v.errors.filter((e) => /svg|<|attribute|colour|viewBox|title|id /.test(e)).length} failures`,
    narration: `${v.narr.slides} slides, ${v.narr.min}–${v.narr.max} words (mean ${v.narr.mean}), no symbols, formulae or unit abbreviations`,
    resolve: `${solved}/${REG.filter((e) => e.check).length} scripted re-solve checks pass${fails.length ? ` (${fails.length} FAIL)` : ''}`,
    ...checksExtra,
  };
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'release.json'), JSON.stringify(release, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'tests.json'), JSON.stringify({ tests }, null, 2) + '\n');
  // Pipeline stage-4 lint on the written files
  const p = openPipeline({}, { log: () => {} });
  const lr = lintExemplar(p, { family: 'science', dir, unit: C.unit });
  release.build.checks.pipeline_lint = `npm run content -- lint --exemplars: ${lr.errors} errors, ${lr.warnings} warnings`;
  fs.writeFileSync(path.join(dir, 'release.json'), JSON.stringify(release, null, 2) + '\n');
  const report = { validator: { errors: v.errors, warnings: v.warns, math: v.math, svgs: v.svgs, narration: v.narr, decks: v.deckStats }, stats: st, lint: { errors: lr.errors, warnings: lr.warnings, findings: lr.findings.map((f) => `${f.severity} ${f.item} ${f.rule} ${f.path}: ${f.message}`) }, resolve: { solved, fails } };
  fs.writeFileSync(path.join(dir, 'src', 'build.log'), JSON.stringify(report, null, 2) + '\n' + resolveLog.join('\n') + '\n');
  return report;
}

/** Compact dump of the bank for the verifier pass (read by a human/agent, not committed). */
export function dumpBank(release) {
  const out = [];
  const one = (q, ind = '') => {
    out.push(`${ind}[${q.id}] ${q.type} ${q.marks}m d${q.difficulty} ${q.competency} ${q.topic_ids.map((t) => t.slice(-3)).join(',')}`);
    out.push(`${ind}  STEM: ${q.stem_md.replace(/\n+/g, ' / ')}`);
    for (const o of q.options) out.push(`${ind}   (${o.id}) ${o.text_md}`);
    for (const o of q.match_right) out.push(`${ind}   [${o.id}] ${o.text_md}`);
    out.push(`${ind}  KEY: ${JSON.stringify(q.answer).slice(0, 900)}`);
    out.push(`${ind}  SOL: ${q.solution_md.replace(/\n+/g, ' / ')}`);
    out.push(`${ind}  MS: ${q.marking_scheme.map((s) => `${s.step} [${s.marks}]`).join(' | ')}`);
  };
  for (const q of release.questions) {
    if (q.type === 'case-based') {
      out.push(`[${q.id}] CASE d${q.difficulty} ${q.competency}`);
      out.push(`  PASSAGE: ${q.passage_md.replace(/\n+/g, ' / ')}`);
      for (const c of q.children) {
        one({ ...c, id: `${q.id}/${c.id}` }, '    ');
        for (const a of c.alternatives) one({ ...a, id: `${q.id}/${a.id}` }, '      ');
      }
    } else one(q);
    out.push('');
  }
  return out.join('\n');
}
