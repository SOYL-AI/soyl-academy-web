// Authoring library for hand-written CBSE Hindi A chapters (hindi-language and hindi-literature
// families, D-025/D-026). Shared by ch01, ch18 (hindi-language) and ch03, ch09 (hindi-literature) of
// cbse-10-hindi-a. Adapted from the English library (english-language/…-ch02/src/lib.mjs) for Hindi:
// Devanagari option letters (क ख ग घ) in solutions, Hindi assertion-reason options, danda-aware
// answer-leak check, the shared script rules (NFC, well-formed Devanagari, no Latin runs, TTS-safe
// narration) and, for literature, a per-chapter list of phrases of the original text that must never
// appear (setForbidden).
// A chapter's build.mjs calls setUnit(), defines questions with Q()/the item builders, decks with
// deck()/sl(), notes, flashcards and tests, then build() validates everything and writes the files.
// Run a build from platform/:  npx tsx content/authored/<family>/<chapter>/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ChapterRelease, TestDefinition, wordCount, checkScriptRelease, scriptForLanguage } from '@soyl/shared/content/index';
import { checkLiterature } from '../../../../../content-pipeline/src/lint/text.ts';
import { openPipeline } from '../../../../../content-pipeline/src/pipeline';
import { lintExemplar } from '../../../../../content-pipeline/src/commands/lint';
import { deterministicChecks } from '../../../../../content-pipeline/src/verify/checks.ts';

export const AUTHOR = 'claude-opus-5-5 (subject-producer)';
export const DATE = '2026-10-27';
export const PROV = { origin: 'human', template_version: null, model: null, generated_at: DATE, author: AUTHOR };

const S = { unit: '', prefix: '', family: '', literature: false, questions: [], keys: new Map(), rot: 0, problems: [], notes: [], forbid: [] };

const ABBR = { 'hindi-a': 'hia' };
export function setUnit(unit, family) {
  S.unit = unit;
  S.family = family;
  S.literature = /literature/.test(family);
  const m = /^(cbse|icse|isc)-(\d{1,2})-(.+)-ch(\d{2})$/.exec(unit);
  S.prefix = `q_${m[1]}${m[2]}${ABBR[m[3]] ?? m[3].replace(/-/g, '')}_ch${m[4]}`;
}
/** Phrases of the original literary text that must never appear in any SOYL string (reproduction guard). */
export function setForbidden(list) {
  S.forbid = list.map((x) => x.normalize('NFC'));
}
export const topic = (n) => `${S.unit}-t${String(n).padStart(2, '0')}`;
const topics = (t) => (Array.isArray(t) ? t : [t]).map(topic);
const problem = (m) => S.problems.push(m);

const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };
const L = 'abcdefgh';
/** Devanagari option letters, as printed in Hindi papers: (क) (ख) (ग) (घ). */
export const HL = ['क', 'ख', 'ग', 'घ', 'ङ', 'च'];
// Key positions for single-answer MCQs cycle through a fixed, irregular pattern so keys are balanced.
const KEY_PATTERN = [1, 3, 0, 2, 2, 0, 3, 1, 0, 1, 2, 3, 3, 2, 1, 0];
const end = (t) => (/[।?!.]$/.test(t.trim()) ? t.trim() : `${t.trim()}।`);

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
  if (texts.length !== 4) problem(`mcq needs 4 options: ${o.stem.slice(0, 50)}`);
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
  q.solution_md = `**सही विकल्प: (${HL[k]})** ${end(texts[k])} ${o.sol}`;
  q.marking_scheme = o.scheme ?? [{ step: `सही विकल्प (${HL[k]}) का चयन`, marks: q.marks }];
  return q;
}

const AR_OPTS = [
  'अभिकथन (A) और कारण (R) दोनों सही हैं तथा कारण (R), अभिकथन (A) की सही व्याख्या करता है।',
  'अभिकथन (A) और कारण (R) दोनों सही हैं, परंतु कारण (R), अभिकथन (A) की सही व्याख्या नहीं करता है।',
  'अभिकथन (A) सही है, परंतु कारण (R) गलत है।',
  'अभिकथन (A) गलत है, परंतु कारण (R) सही है।',
];
export function ar(o) {
  const q = common('assertion-reason', {
    marks: 1,
    time: 90,
    ...o,
    stem: `${o.pre ? `${o.pre}\n\n` : ''}नीचे दो कथन दिए गए हैं — अभिकथन (A) और कारण (R)। सही विकल्प चुनिए।\n\n**अभिकथन (A):** ${o.a}\n\n**कारण (R):** ${o.r}`,
  });
  q.options = AR_OPTS.map((t, i) => ({ id: L[i], text_md: t }));
  q.answer = { option_ids: [o.key] };
  const k = L.indexOf(o.key);
  q.solution_md = `**सही विकल्प: (${HL[k]})** ${o.sol}`;
  q.marking_scheme = [{ step: `सही विकल्प (${HL[k]}) का चयन`, marks: q.marks }];
  return q;
}

export function tf(o) {
  const q = common('true-false', { marks: 1, time: 40, ...o, stem: `सत्य या असत्य बताइए: ${o.stem}` });
  q.options = [
    { id: 't', text_md: 'सत्य' },
    { id: 'f', text_md: 'असत्य' },
  ];
  q.answer = { option_ids: [o.ans ? 't' : 'f'] };
  q.solution_md = `**${o.ans ? 'सत्य' : 'असत्य'}।** ${o.sol}`;
  q.marking_scheme = [{ step: `सही उत्तर (${o.ans ? 'सत्य' : 'असत्य'})`, marks: q.marks }];
  return q;
}

/** Fill in the blanks: `___` per blank in the stem; `acc` = accepted answers per blank. */
export function fb(o) {
  const n = (o.stem.match(/_{3,}/g) ?? []).length;
  const marks = o.marks ?? n;
  const q = common('fill-blank', { time: 45 * n, ...o, marks });
  q.answer = { blanks: o.acc.map((a) => ({ accepted: a })) };
  if (n !== o.acc.length) problem(`fill-blank blanks ${n} != answers ${o.acc.length}: ${o.stem.slice(0, 60)}`);
  q.marking_scheme = o.scheme ? o.scheme.map(([step, m]) => ({ step, marks: m })) : o.acc.map((a, i) => ({ step: `रिक्त स्थान ${i + 1}: ${a[0]}`, marks: marks / n }));
  o.acc.forEach((a, i) => {
    if (!a.some((x) => o.sol.includes(x))) problem(`fill-blank solution never mentions blank ${i + 1} (${a.join('/')}): ${o.stem.slice(0, 60)}`);
  });
  return q;
}

// Deterministic permutation (never the identity) for match columns and ordering items.
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
let SEED = 11;

/** Match: `pairs` = [[left, right], …] in matching order; the right column is shuffled. */
export function match(o) {
  const n = o.pairs.length;
  const q = common('match', { marks: o.marks ?? n / 2, time: 30 * n, ...o });
  const perm = permute(n, SEED++);
  q.options = o.pairs.map(([l], i) => ({ id: `l${i + 1}`, text_md: l }));
  q.match_right = perm.map((src, i) => ({ id: `r${i + 1}`, text_md: o.pairs[src][1] }));
  q.answer = { pairs: o.pairs.map((_, i) => ({ left_id: `l${i + 1}`, right_id: `r${perm.indexOf(i) + 1}` })) };
  const key = o.pairs.map(([l, r]) => `${l} — ${r}`).join('; ');
  q.solution_md = `**सही मिलान:** ${key}। ${o.sol}`;
  q.marking_scheme = [{ step: `प्रत्येक सही जोड़ी ${q.marks / n} अंक (${n} जोड़ियाँ)`, marks: q.marks }];
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
  q.solution_md = `**सही क्रम:** ${q.answer.order.map((x) => `(${HL[L.indexOf(x)]})`).join(' → ')}। ${o.sol}`;
  q.marking_scheme = o.scheme ? o.scheme.map(([step, m]) => ({ step, marks: m })) : [{ step: 'पूरा क्रम सही (सभी चरण अपनी जगह पर)', marks: q.marks }];
  return q;
}

function limitCheck(kind, o) {
  if (!o.wl) return;
  const n = wordCount(o.model);
  const [min, max] = o.wl;
  if (n < Math.floor(min * 0.8) || n > Math.ceil(max * 1.2)) problem(`${kind} model answer ${n} words outside ${min}–${max} (±20%): ${o.stem.slice(0, 60)}`);
  else if (n > max + Math.ceil(max * 0.1) || n < min - Math.ceil(min * 0.1)) S.notes.push(`${kind} model answer ${n} words for ${min}–${max}: ${o.stem.slice(0, 50)}`);
}

function constructed(type, o) {
  const q = common(type, o);
  q.answer = { model_answer_md: o.model };
  if (o.wl) q.word_limit = { min: o.wl[0], max: o.wl[1] };
  q.marking_scheme = o.scheme.map(([step, m]) => ({ step, marks: m }));
  limitCheck(type, o);
  return q;
}
/** Short answer (1–3 marks). */
export const short = (o) => constructed('short', { time: 75 * (o.marks ?? 2), ...o });
/** Long answer (4–6 marks). */
export const long = (o) => constructed('long', { time: 420, ...o });

/** Writing task: format, word limit [min, max], rubric [[criterion, marks, descriptor]]. */
export function writing(o) {
  const q = common('writing', { time: 900, bloom: 'create', ...o });
  q.answer = { model_answer_md: o.model };
  q.format = o.format;
  q.word_limit = { min: o.wl[0], max: o.wl[1] };
  q.rubric = o.rubric.map(([criterion, marks, descriptor_md]) => ({ criterion, marks, descriptor_md }));
  q.marking_scheme = o.scheme ? o.scheme.map(([step, m]) => ({ step, marks: m })) : o.rubric.map(([criterion, marks, d]) => ({ step: `${criterion}: ${d}`, marks }));
  limitCheck('writing', o);
  return q;
}

/** Child part of a case/source item. `alts` = alternative parts (internal choice). */
export function child(id, proto, alts = []) {
  return { id, ...proto, alternatives: alts.map((a, i) => ({ id: `${id}${i + 2}`, ...a })) };
}

function childAnswer(c) {
  const a = c.answer;
  let s = '';
  if ('option_ids' in a) {
    const k = c.options.findIndex((x) => x.id === a.option_ids[0]);
    s = c.type === 'true-false' ? c.options[k].text_md : `(${HL[k]}) ${c.options[k].text_md}`;
  } else if ('blanks' in a) s = a.blanks.map((b) => b.accepted[0]).join('; ');
  else if ('model_answer_md' in a) s = a.model_answer_md;
  else if ('order' in a) s = a.order.map((x) => `(${HL[L.indexOf(x)]})`).join(' → ');
  else if ('pairs' in a) s = a.pairs.map((p) => `${p.left_id}–${p.right_id}`).join(', ');
  for (const alt of c.alternatives ?? []) s += ` **अथवा** ${childAnswer({ ...alt, alternatives: [] })}`;
  return s;
}

/** Case/source item: o.passage, o.origin ('soyl-original' | 'soyl-commentary'), o.parts = [child(…)…]. */
export function passage(type, o) {
  const marks = o.parts.reduce((s, c) => s + c.marks, 0);
  const q = common(type, { ...o, marks, time: o.time ?? o.parts.reduce((s, c) => s + c.expected_time_sec, 0) + 150 });
  q.passage_md = o.passage;
  q.passage_origin = o.origin;
  q.children = o.parts;
  q.answer = { model_answer_md: o.parts.map((c, i) => `**(${HL[i]})** ${childAnswer(c)}`).join('\n\n') };
  q.marking_scheme = o.parts.map((c, i) => ({ step: `भाग (${HL[i]})`, marks: c.marks }));
  if (o.wordsAbout) {
    const n = wordCount(o.passage);
    const [min, max] = o.wordsAbout;
    if (n < min || n > max) problem(`passage ${n} words, wanted ${min}–${max}: ${o.passage.slice(0, 40)}`);
  }
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
    language: 'hi',
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
    language: 'hi',
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

// ---------------------------------------------------------------- notes, cards
export function notes({ title, sections, tips }) {
  return {
    unit: S.unit,
    version: 1,
    title,
    language: 'hi',
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
    language: 'hi',
    cards: list.map(([front_md, back_md, tag, t], i) => ({ id: `f${String(i + 1).padStart(2, '0')}`, front_md, back_md, tag, topic_id: t ? topic(t) : null })),
    status: 'draft',
    provenance: PROV,
  };
}

// ---------------------------------------------------------------- tests
/** sections: [{ id, title, instr, items: [key | { attempt, keys }] }] */
export function test({ kind, title, duration, sections, blueprint = null }) {
  const isShort = kind === 'short';
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
    paper_type: isShort ? 'chapter-test-short' : 'chapter-test-long',
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
function allStrings(v, pathStr, out) {
  if (typeof v === 'string') out.push([pathStr, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => allStrings(x, `${pathStr}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) allStrings(x, `${pathStr}.${k}`, out);
  return out;
}
const IDISH = /\.(id|unit|type|competency|bloom|status|layout|kind|language|passage_origin|format|tag|topic_id|left_id|right_id|from|to|direction)$/;

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

  // NFC: normalise nothing silently — report.
  for (const [p, s] of allStrings(release, 'release', [])) if (s !== s.normalize('NFC')) errs.push(`${p}: not NFC`);

  // Shared script rules (the content gate's check), as errors.
  const script = scriptForLanguage('hi', 'Deva');
  for (const i of checkScriptRelease(release, script)) (i.severity === 'error' ? errs : warn).push(`script ${i.rule} ${i.path}: ${i.message}`);

  // Narration word counts.
  const narr = decks.flatMap((d) => d.slides.map((s) => [`${d.part ?? ''}/${s.id}`, s.narration]));
  for (const [id, t] of narr) {
    if (!t) errs.push(`slide ${id}: no narration`);
    else if (wordCount(t) > 90) errs.push(`slide ${id}: narration ${wordCount(t)} words`);
  }
  // Raw HTML / dollar sanity, space before danda, double danda.
  for (const [p, s] of allStrings(release, 'release', [])) {
    if (/<\/?[a-z][^>]*>/i.test(s) && !p.includes('spec')) errs.push(`${p}: raw HTML`);
    if (/\$/.test(s)) errs.push(`${p}: dollar sign (parsed as maths)`);
  }
  // Literature heuristics + forbidden phrases (reproduction guard) on every string except ids/enums.
  const facing = allStrings({ decks, notes: n, flashcards, questions: S.questions, tests }, '', []).filter(([p]) => !IDISH.test(p) && !/topic_ids|provenance|option_ids|check_question_id/.test(p));
  if (S.literature) {
    for (const [p, s] of facing) for (const i of checkLiterature(s)) (i.severity === 'error' ? errs : warn).push(`literature ${i.rule} ${p}: ${i.message}`);
  }
  for (const [p, s] of facing) for (const f of S.forbid) if (s.includes(f)) errs.push(`REPRODUCTION "${f}" at ${p}`);
  // Nukta consistency across the whole chapter (the pipeline lint checks within one item only).
  {
    const words = new Set(facing.flatMap(([, s]) => s.match(/[ऀ-ॿ]+/gu) ?? []));
    for (const w of words) if (w.includes('़') && words.has(w.replace(/़/g, ''))) errs.push(`nukta: both "${w}" and "${w.replace(/़/g, '')}" are used`);
  }
  // Pipeline deterministic verify checks (stage 5).
  for (const q of S.questions) for (const f of deterministicChecks(q)) (f.severity === 'minor' ? warn : errs).push(`verify ${q.id} ${f.check}: ${f.message}`);
  // Answer-leak contract (api/test/content.test.ts, DB-6; D-032): key-side text (solutions, model
  // answers, child/alternative solutions) of 60+ characters must not appear in served content. Checked
  // per sentence (danda-aware), which is stricter than the API's whole-string test.
  {
    const strip = (q) => ({ s: q.stem_md, o: q.options, m: q.match_right, p: q.passage_md, c: (q.children ?? []).map((c) => ({ s: c.stem_md, o: c.options, m: c.match_right, a: (c.alternatives ?? []).map((x) => ({ s: x.stem_md, o: x.options })) })) });
    const served = JSON.stringify({ decks, n, flashcards, q: S.questions.map(strip) }).replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\*/g, '');
    const keyTexts = [];
    for (const q of S.questions) {
      keyTexts.push([q.id, q.solution_md], [q.id, q.answer.model_answer_md ?? '']);
      for (const c of q.children) {
        keyTexts.push([`${q.id}/${c.id}`, c.solution_md], [`${q.id}/${c.id}`, c.answer.model_answer_md ?? '']);
        for (const a of c.alternatives ?? []) keyTexts.push([`${q.id}/${a.id}`, a.solution_md], [`${q.id}/${a.id}`, a.answer.model_answer_md ?? '']);
      }
    }
    for (const [id, t] of keyTexts) {
      if (t.length >= 60 && served.includes(t.replace(/\*/g, ''))) errs.push(`answer leak ${id}: whole key text appears in served content`);
      for (const sent of t.split(/(?<=[.!?।])\s+|\n+/)) {
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
  for (const d of decks)
    for (const s of d.slides)
      if (s.check_question_id) {
        const q = S.questions.find((x) => x.id === s.check_question_id);
        if (!q || !OBJ.includes(q.type)) errs.push(`slide ${s.id}: check question ${s.check_question_id} is not objective`);
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
  const allMcq = [...qs, ...qs.flatMap((q) => q.children)].filter((q) => q.type === 'mcq');
  const keyCount = (list) => list.reduce((m, q) => ((m[q.answer.option_ids[0]] = (m[q.answer.option_ids[0]] ?? 0) + 1), m), {});
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
    types: by((q) => (q.type === 'short' || q.type === 'long' || q.type === 'writing' ? `${q.type}-${q.marks}` : q.type)),
    difficulty: by((q) => `d${q.difficulty}`),
    competency: by((q) => q.competency),
    application_plus: `${Math.round((100 * higher) / qs.length)}% items, ${Math.round((100 * qs.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency)).reduce((s, q) => s + q.marks, 0)) / marks)}% marks`,
    mcq_keys_top_level: keyCount(qs.filter((q) => q.type === 'mcq')),
    mcq_keys_all: keyCount(allMcq),
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
  } else console.log('NO ERRORS');
  return stats;
}
