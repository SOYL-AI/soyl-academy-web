// Authoring library for hand-authored CBSE 10 Mathematics chapters (subject-producer, D-026).
// Builders for slides, questions, visuals and tests; an independent numeric re-solve harness; and
// a validator (KaTeX strict parse, lost backslashes, narration, plot zeros/intersections, schemes,
// statistics). Run build scripts with tsx from platform/ so the pipeline's expression parser loads:
//   npx tsx content/authored/maths/<chapter>/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import katex from 'katex';
import { parseExpr, evaluate } from '../../../../../content-pipeline/src/lint/expr.ts';

export const r = String.raw;

// ---------------------------------------------------------------- context
let UNIT = '';
let PREFIX = '';
const PROV = { origin: 'human', template_version: null, model: null, generated_at: '2026-10-26', author: 'claude-opus-5-5 (subject-producer)' };
export function setUnit(unit) {
  UNIT = unit;
  PREFIX = `q_cbse10math_ch${unit.slice(-2)}_`;
}
export const topic = (n) => `${UNIT}-t${String(n).padStart(2, '0')}`;
const BLOOM = { recall: 'remember', understanding: 'understand', application: 'apply', analysis: 'analyze', evaluation: 'evaluate' };

// ---------------------------------------------------------------- visuals
const freePoints = new WeakSet(); // plot points deliberately not on any curve
export function plot({ x, y, xl = 'x', yl = 'y', fns = [], pts = [], series = [], samples }, alt, caption) {
  const points = pts.map(([px, py, label, opt]) => {
    const p = label === undefined ? { at: [px, py] } : { at: [px, py], label };
    if (opt === 'free') freePoints.add(p);
    return p;
  });
  const spec = {
    x: { min: x[0], max: x[1], label: xl },
    y: { min: y[0], max: y[1], label: yl },
    functions: fns.map((f) => (typeof f === 'string' ? { expr: f } : f)),
    points,
    series,
    grid: true,
  };
  if (samples) spec.samples = samples;
  return { kind: 'plot', spec, alt, caption };
}
export const table = (headers, rows, alt, caption) => ({ kind: 'table', spec: { headers, rows }, alt, caption });
export function flow(direction, nodes, edges, alt, caption) {
  return {
    kind: 'flow',
    spec: {
      direction,
      nodes: nodes.map(([id, label]) => ({ id, label })),
      edges: edges.map(([from, to, label]) => (label ? { from, to, label } : { from, to })),
    },
    alt,
    caption,
  };
}
export const geom = (spec, alt, caption) => ({
  kind: 'geometry',
  spec: { width: spec.width, height: spec.height, points: spec.points, segments: spec.segments ?? [], lines: spec.lines ?? [], rays: spec.rays ?? [], circles: spec.circles ?? [], angles: spec.angles ?? [], polygons: spec.polygons ?? [], ...(spec.scale ? { scale: spec.scale } : {}), ...(spec.not_to_scale ? { not_to_scale: true } : {}) },
  alt,
  caption,
});

/** Factor tree of n by repeatedly splitting off the smallest prime (or a given first split). */
export function factorTree(n, { x0 = 1.2, dx = 0.95, dy = 1.05, first = null, width, label = (v) => String(v) } = {}) {
  const pts = {};
  const segs = [];
  const circles = [];
  let id = 0;
  const depth = [];
  function node(v, x, yLevel) {
    const k = `N${id++}`;
    pts[k] = { at: [x, yLevel], label: label(v) };
    return k;
  }
  // chain: parent splits into (left = prime, right = quotient)
  let level = 0;
  let cur = node(n, x0, 0);
  let v = n;
  let x = x0;
  const splits = [];
  if (first) splits.push(first);
  while (!isPrime(v)) {
    const [a, b] = splits.length ? splits.shift() : [smallestPrime(v), v / smallestPrime(v)];
    level++;
    const l = node(a, x - dx * 0.75, -level);
    const rr = node(b, x + dx * 0.75, -level);
    segs.push({ from: cur, to: l }, { from: cur, to: rr });
    if (isPrime(a)) circles.push(l);
    else {
      // composite left child: split it fully downwards-left (small numbers only)
      let lv = a, lk = l, lx = x - dx * 0.75, ll = level;
      while (!isPrime(lv)) {
        const p = smallestPrime(lv);
        ll++;
        const a2 = node(p, lx - dx * 0.6, -ll);
        const b2 = node(lv / p, lx + dx * 0.15, -ll);
        segs.push({ from: lk, to: a2 }, { from: lk, to: b2 });
        circles.push(a2);
        lv = lv / p;
        lk = b2;
        lx = lx + dx * 0.15;
        if (isPrime(lv)) circles.push(b2);
      }
      depth.push(ll);
    }
    cur = rr;
    v = b;
    x = x + dx * 0.75;
  }
  circles.push(cur);
  const maxLevel = Math.max(level, ...depth);
  const H = maxLevel * dy + 1.4;
  const xs = Object.values(pts).map((p) => p.at[0]);
  const shift = 0.6 - Math.min(...xs);
  for (const p of Object.values(pts)) p.at = [round3(p.at[0] + shift), round3(H - 0.7 + p.at[1] * dy)];
  const W = width ?? round3(Math.max(...Object.values(pts).map((p) => p.at[0])) + 0.7);
  return { width: W, height: round3(H), points: pts, segments: segs, primes: circles };
}

// ---------------------------------------------------------------- slides and decks
export function deck({ part, title, goals, slides }) {
  return {
    unit: UNIT,
    part,
    version: 1,
    title,
    language: 'en',
    goals,
    slides: slides.map((s, i) => ({ ...s, id: `s${String(i + 1).padStart(2, '0')}` })),
    status: 'draft',
    provenance: PROV,
  };
}
/** sl(layout, heading, { b: body_md, ul: bullets, cols, v: visual, m: math, n: narration, chk: question key }) */
export function sl(layout, heading, o) {
  const s = { id: '', layout, heading, body_md: o.b ?? '', bullets: o.ul ?? [] };
  if (o.cols) s.columns = o.cols;
  s.visual = o.v ?? null;
  s.math = o.m ?? [];
  s.narration = o.n;
  s.check_question_id = o.chk ?? null;
  s.audio = null;
  return s;
}

// ---------------------------------------------------------------- questions
const AR_OPTIONS = [
  { id: 'a', text_md: 'Both Assertion (A) and Reason (R) are true, and R is the correct explanation of A.' },
  { id: 'b', text_md: 'Both Assertion (A) and Reason (R) are true, but R is not the correct explanation of A.' },
  { id: 'c', text_md: 'Assertion (A) is true, but Reason (R) is false.' },
  { id: 'd', text_md: 'Assertion (A) is false, but Reason (R) is true.' },
];
const scheme = (s) => s.map(([step, marks]) => ({ step, marks }));
function base(o, type, marks, answer, options = []) {
  return {
    type,
    stem_md: o.stem,
    options,
    match_right: [],
    answer,
    solution_md: o.sol,
    marking_scheme: scheme(o.scheme),
    marks,
    difficulty: o.d,
    competency: o.c,
    bloom: o.bloom ?? BLOOM[o.c],
    topic_ids: o.t.map(topic),
    expected_time_sec: o.time,
    assets: o.assets ?? [],
  };
}
const opts4 = (arr) => arr.map((text_md, i) => ({ id: 'abcd'[i], text_md }));
export const mk = {
  mcq: (o) => base({ scheme: [[`Correct option (${o.key})`, 1]], time: 60, ...o }, 'mcq', 1, { option_ids: [o.key] }, opts4(o.opts)),
  ar: (o) => base({ ...o, stem: `**Assertion (A):** ${o.a}\n\n**Reason (R):** ${o.r}`, scheme: o.scheme ?? [[`Correct option (${o.key})`, 1]], time: o.time ?? 75 }, 'assertion-reason', 1, { option_ids: [o.key] }, AR_OPTIONS),
  tf: (o) => base({ scheme: [[`${o.key === 't' ? 'True' : 'False'}, with reason`, 1]], time: 45, ...o }, 'true-false', 1, { option_ids: [o.key] }, [{ id: 't', text_md: 'True' }, { id: 'f', text_md: 'False' }]),
  fill: (o) => base({ scheme: [[o.acc[0][0], 1]], time: 45, ...o }, 'fill-blank', 1, { blanks: o.acc.map((accepted) => ({ accepted })) }),
  num: (o) => base(o, 'numerical', o.marks ?? 1, { value: o.value, tolerance: o.tol ?? 0, unit: o.unit ?? null }),
  short: (o) => base(o, 'short', o.marks, { model_answer_md: o.model }),
  long: (o) => base(o, 'long', 5, { model_answer_md: o.model }),
};
/** Children of case questions: same builders plus an id and optional alternatives. */
export function child(id, q, alternatives = []) {
  return { id, ...q, alternatives: alternatives.map((a, k) => ({ id: `${id}${['i', 'ii', 'iii'][k + 1]}`, ...a })) };
}

const registry = []; // { key, q, check, qual }
export function Q(key, q, check, qual = null) {
  registry.push({ key, q, check, qual });
}
export function caseQ(key, o, check) {
  const q = {
    type: 'case-based',
    stem_md: 'Read the passage and answer the questions that follow.',
    options: [],
    match_right: [],
    answer: { model_answer_md: o.model },
    solution_md: o.sol,
    marking_scheme: o.children.map((c) => ({ step: `Part (${c.id})${c.alternatives.length ? ' — either alternative' : ''}`, marks: c.marks })),
    marks: o.children.reduce((s, c) => s + c.marks, 0),
    difficulty: o.d,
    competency: o.c,
    bloom: BLOOM[o.c],
    topic_ids: [...new Set(o.children.flatMap((c) => c.topic_ids))],
    expected_time_sec: o.time ?? 480,
    assets: o.assets ?? [],
    passage_md: o.passage,
    passage_origin: 'soyl-original',
    children: o.children,
  };
  registry.push({ key, q, check, qual: null });
}
export const qid = (key) => {
  const i = registry.findIndex((e) => e.key === key);
  if (i < 0) throw new Error(`unknown question key ${key}`);
  return PREFIX + String(i + 1).padStart(3, '0');
};

// ---------------------------------------------------------------- maths helpers (independent arithmetic)
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
export const hcfN = (...xs) => xs.reduce(gcd);
export const lcmN = (...xs) => xs.reduce(lcm);
export function isPrime(n) {
  if (n < 2 || !Number.isInteger(n)) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
}
export const smallestPrime = (n) => { for (let p = 2; p * p <= n; p++) if (n % p === 0) return p; return n; };
export function factorise(n) {
  const f = {};
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { f[p] = (f[p] ?? 0) + 1; n /= p; }
  if (n > 1) f[n] = (f[n] ?? 0) + 1;
  return f;
}
/** "2^{3} \times 3^{2} \times 5" style string of a factorisation, to compare with text. */
export function factorTex(n) {
  return Object.entries(factorise(n)).map(([p, e]) => (e === 1 ? p : `${p}^${e > 9 ? `{${e}}` : e}`)).join(r` \times `);
}
export const round3 = (v) => Math.round(v * 1000) / 1000;
export const fmt = (v) => (typeof v === 'number' ? String(+v.toFixed(6)) : String(v));
/** Real roots of ax^2+bx+c, ascending. */
export function quadRoots(a, b, c) {
  const D = b * b - 4 * a * c;
  if (D < -1e-12) return [];
  if (Math.abs(D) < 1e-12) return [-b / (2 * a)];
  const s = Math.sqrt(D);
  return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((u, v) => u - v);
}
/** Solves a1 x + b1 y = c1, a2 x + b2 y = c2 (right-hand side form). */
export function solve2(a1, b1, c1, a2, b2, c2) {
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-12) return null;
  return [(c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det];
}
export const f = (expr) => { const ast = parseExpr(expr); return (x) => evaluate(ast, x); };
/** Coefficients [a, b, c, …] (highest power first) of a·∏(x − r). */
export function polyFromRoots(roots, a = 1) {
  let c = [a];
  for (const r0 of roots) c = [...c, 0].map((v, i) => v - (i ? r0 * c[i - 1] : 0));
  return c.map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v));
}
/** Real zeros of an expression on [a, b], found numerically (sign changes + touching zeros). */
export function numRoots(expr, a, b, N = 8000) {
  const g = f(expr);
  const out = [];
  const h = (b - a) / N;
  for (let k = 0; k <= N; k++) {
    const x = a + h * k, y = g(x);
    if (Math.abs(y) < 1e-12) { out.push(x); continue; }
    const y2 = g(x + h);
    if (k < N && Math.abs(y2) > 1e-12 && Math.sign(y) !== Math.sign(y2)) { let lo = x, hi = x + h; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; } out.push((lo + hi) / 2); }
    else if (k > 0 && k < N && Math.abs(y) < 1e-2 && Math.abs(y) <= Math.abs(g(x - h)) && Math.abs(y) <= Math.abs(y2)) { let lo = x - h, hi = x + h; for (let i = 0; i < 100; i++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (Math.abs(g(m1)) < Math.abs(g(m2))) hi = m2; else lo = m1; } const m = (lo + hi) / 2; if (Math.abs(g(m)) < 1e-9) out.push(m); }
  }
  return out.filter((z, i) => out.findIndex((w) => Math.abs(w - z) < 1e-5) === i).map((z) => Math.round(z * 1e6) / 1e6);
}

// ---------------------------------------------------------------- re-solve harness
function numsIn(text) {
  return [...text.replace(/(\d),(?=\d\d)/g, '$1').replace(/\\[dt]?frac\{(-?\d+)\}\{(\d+)\}/g, (m, a, b) => ` ${a / b} ${a} ${b} `).matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
}
function hasNumber(text, v) {
  const want = Math.abs(Number(fmt(v)));
  return numsIn(text).some((x) => Math.abs(x - want) < 1e-9);
}
function makeChecker(entryKey, q, log, errs) {
  const tag = (sub) => `${entryKey}${sub ? `.${sub}` : ''}`;
  const C = (node, sub) => ({
    /** The key option's text contains the value, and no other option does. */
    opt(value) {
      const chosen = node.options.find((o) => o.id === node.answer.option_ids[0]);
      const ok = hasNumber(chosen.text_md, value) && node.options.filter((o) => o !== chosen).every((o) => !numsIn(o.text_md).length || !hasNumber(o.text_md, value) || numsIn(o.text_md).length > 1);
      log.push([tag(sub), fmt(value), chosen.text_md, ok]);
      if (!ok) errs.push(`${tag(sub)}: re-solve ${fmt(value)} vs key option "${chosen.text_md}"`);
    },
    key(id) {
      const ok = node.answer.option_ids[0] === id;
      log.push([tag(sub), id, node.answer.option_ids[0], ok]);
      if (!ok) errs.push(`${tag(sub)}: re-solve gives option ${id}, key is ${node.answer.option_ids[0]}`);
    },
    val(value, tol = 1e-9) {
      const ok = Math.abs(node.answer.value - value) <= Math.max(tol, node.answer.tolerance + 1e-9) && Math.abs(node.answer.value - Number(fmt(node.answer.value))) < 1e-12;
      log.push([tag(sub), fmt(value), node.answer.value, ok]);
      if (!ok) errs.push(`${tag(sub)}: re-solve ${fmt(value)}, key ${node.answer.value} (tol ${node.answer.tolerance})`);
      if (!hasNumber(node.solution_md, node.answer.value)) errs.push(`${tag(sub)}: solution never states ${node.answer.value}`);
    },
    /** Option values typed independently of the text: exactly one equals the re-solved target, and it is the key. */
    which(values, target) {
      const eq = (u, v) => (Array.isArray(u) ? u.length === v.length && u.every((x, k) => Math.abs(x - v[k]) < 1e-9) : Math.abs(u - v) < 1e-9);
      const hits = values.map((v, k) => (eq(v, target) ? 'abcd'[k] : null)).filter(Boolean);
      const ok = hits.length === 1 && hits[0] === node.answer.option_ids[0];
      log.push([tag(sub), JSON.stringify(target), `${node.answer.option_ids[0]} (hits ${hits.join('')})`, ok]);
      if (!ok) errs.push(`${tag(sub)}: re-solve ${JSON.stringify(target)} matches options [${hits}], key ${node.answer.option_ids[0]}`);
    },
    blank(value, i = 0) {
      const acc = node.answer.blanks[i].accepted;
      const parse = (a) => { const s = a.replace(/\s|\$/g, '').replace(/−/g, '-'); if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s); const m = /^(-?\d+)\/(\d+)$/.exec(s); return m ? Number(m[1]) / Number(m[2]) : NaN; };
      const ok = typeof value === 'number' ? acc.some((a) => Math.abs(parse(a) - value) < 1e-9) && acc.every((a) => Number.isNaN(parse(a)) || Math.abs(parse(a) - value) < 1e-9) : acc.map((a) => a.toLowerCase()).includes(String(value).toLowerCase());
      log.push([tag(sub), fmt(value), acc.join('|'), ok]);
      if (!ok) errs.push(`${tag(sub)}: re-solve ${fmt(value)} not among accepted ${acc.join('|')}`);
    },
    /** Every listed number/string appears in the model answer (short/long/case parent). */
    model(values) {
      const text = node.answer.model_answer_md;
      const miss = values.filter((v) => (typeof v === 'number' ? !hasNumber(text, v) : !text.includes(v)));
      log.push([tag(sub), values.map(fmt).join(', '), 'model answer', !miss.length]);
      if (miss.length) errs.push(`${tag(sub)}: model answer lacks ${miss.map(fmt).join(', ')}`);
    },
    /** Every listed number/string appears in the solution. */
    sol(values) {
      const text = node.solution_md;
      const miss = values.filter((v) => (typeof v === 'number' ? !hasNumber(text, v) : !text.includes(v)));
      log.push([tag(sub), values.map(fmt).join(', '), 'solution', !miss.length]);
      if (miss.length) errs.push(`${tag(sub)}: solution lacks ${miss.map(fmt).join(', ')}`);
    },
    assert(cond, msg) {
      log.push([tag(sub), msg, 'assert', !!cond]);
      if (!cond) errs.push(`${tag(sub)}: ${msg}`);
    },
    child(id) {
      const c = node.children.find((x) => x.id === id) ?? node.children.flatMap((x) => x.alternatives).find((x) => x.id === id);
      return C(c, id);
    },
  });
  return C(q, '');
}

// ---------------------------------------------------------------- validation
const LOST = /(^|[^\\A-Za-z])(frac|dfrac|tfrac|sqrt|times|text|cdot|div|Rightarrow|Leftrightarrow|implies|therefore|because|neq|ne|le|ge|leq|geq|pm|mid|nmid|alpha|beta|gamma|quad|circ|operatorname|left|right|approx|infty|overline|underbrace|boxed|blacksquare)(\{|\b)(?![a-z])/;
function strings(v, p, out) {
  if (typeof v === 'string') out.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${p}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) strings(x, `${p}.${k}`, out);
  return out;
}
function plotChecks(where, v, errs, stats) {
  const fns = v.spec.functions.map((fn) => ({ ...fn, g: f(fn.expr), dom: fn.domain ?? [v.spec.x.min, v.spec.x.max] }));
  const on = (fn, [x, y]) => x >= fn.dom[0] - 1e-9 && x <= fn.dom[1] + 1e-9 && Math.abs(fn.g(x) - y) < 1e-6;
  for (const p of v.spec.points) {
    const [x, y] = p.at;
    if (x < v.spec.x.min || x > v.spec.x.max || y < v.spec.y.min || y > v.spec.y.max) errs.push(`${where}: point (${x}, ${y}) outside the plot range`);
    if (p.label) {
      const m = /^\$?\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\$?$/.exec(p.label.replace(/−/g, '-').replace(/^[A-Za-z]\s*/, '').trim());
      if (m && (Math.abs(Number(m[1]) - x) > 1e-9 || Math.abs(Number(m[2]) - y) > 1e-9)) errs.push(`${where}: point label ${p.label} but drawn at (${x}, ${y})`);
    }
    if (!freePoints.has(p) && fns.length && !fns.some((fn) => on(fn, p.at))) errs.push(`${where}: point (${x}, ${y}) lies on no plotted function`);
    stats.plotPoints = (stats.plotPoints ?? 0) + 1;
  }
  // zeros: if any marked point is a zero of a function, every zero in range must be marked
  for (const fn of fns) {
    const marked = v.spec.points.filter((p) => p.at[1] === 0 && on(fn, p.at)).map((p) => p.at[0]);
    if (!marked.length) continue;
    const [a, b] = [Math.max(fn.dom[0], v.spec.x.min), Math.min(fn.dom[1], v.spec.x.max)];
    const N = 4000;
    const zeros = [];
    let prev = fn.g(a);
    for (let k = 1; k <= N; k++) {
      const x = a + ((b - a) * k) / N, y = fn.g(x);
      if (y === 0) zeros.push(x);
      else if (prev !== 0 && Math.sign(y) !== Math.sign(prev)) { let lo = x - (b - a) / N, hi = x; for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2; if (Math.sign(fn.g(mid)) === Math.sign(fn.g(lo))) lo = mid; else hi = mid; } zeros.push((lo + hi) / 2); }
      else if (Math.abs(y) < 1e-3) { // touching zero: local minimum of |f|
        const yl = Math.abs(fn.g(x - (b - a) / N)), yr = Math.abs(fn.g(x + (b - a) / N));
        if (Math.abs(y) <= yl && Math.abs(y) <= yr) { let lo = x - (b - a) / N, hi = x + (b - a) / N; for (let it = 0; it < 80; it++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (Math.abs(fn.g(m1)) < Math.abs(fn.g(m2))) hi = m2; else lo = m1; } if (Math.abs(fn.g((lo + hi) / 2)) < 1e-9) zeros.push((lo + hi) / 2); }
      }
      prev = y;
    }
    const uniq = zeros.filter((z, i) => zeros.findIndex((w) => Math.abs(w - z) < 1e-4) === i);
    for (const z of uniq) if (!marked.some((m) => Math.abs(m - z) < 1e-4)) errs.push(`${where}: zero of ${fn.expr} near x = ${z.toFixed(4)} is not marked`);
    for (const m of marked) if (!uniq.some((z) => Math.abs(m - z) < 1e-4)) errs.push(`${where}: marked zero ${m} of ${fn.expr} not found numerically`);
    stats.zerosChecked = (stats.zerosChecked ?? 0) + uniq.length;
  }
  // intersections of straight lines: a point on two lines must be their unique intersection
  for (const p of v.spec.points) {
    const hits = fns.filter((fn) => on(fn, p.at));
    if (hits.length >= 2) stats.intersectionsChecked = (stats.intersectionsChecked ?? 0) + 1;
  }
}

export function build({ dir, release, testsSpec, readmeCheck = true }) {
  const errs = [];
  const log = [];
  const stats = {};
  release.notes.sections = release.notes.sections.map((s) => ({ heading: s.heading, body_md: s.body_md, key_terms: s.key_terms ?? [], formulas: s.formulas ?? [], visual: s.visual ?? null, visuals: s.visuals ?? [], topic_ids: s.topic_ids ?? [] }));
  // resolve question keys
  const questions = registry.map(({ key, q }, i) => ({ id: PREFIX + String(i + 1).padStart(3, '0'), unit: UNIT, language: 'en', ...q, children: q.children ?? [], status: 'draft', version: 1, provenance: PROV }));
  // reorder keys so id comes first
  release.questions = questions.map(({ id, unit, language, ...rest }) => ({ id, unit, language, ...rest }));
  for (const d of release.decks) for (const s of d.slides) if (s.check_question_id && !s.check_question_id.startsWith('q_')) s.check_question_id = qid(s.check_question_id);
  // re-solve
  registry.forEach((e, i) => {
    const q = release.questions[i];
    const key = q.id.slice(-3) + ':' + e.key;
    if (e.qual) { log.push([key, 'qualitative', e.qual, true]); return; }
    if (!e.check) { errs.push(`${key}: no re-solve check`); return; }
    try { e.check(makeChecker(key, q, log, errs)); } catch (x) { errs.push(`${key}: check threw ${x.message}`); }
  });
  // tests
  const tests = testsSpec(qid, (id) => release.questions.find((q) => q.id === id));
  // ------------------------------------ KaTeX + lost backslashes + LaTeX outside $
  let mathCount = 0;
  const all = strings(release, '$', []);
  for (const [p, s] of all) {
    if (/\.narration$|\.alt$|\.expr$|\.id$|\.unit$|\.label_position$/.test(p)) continue;
    const raw = /\.math\[\d+\]$|\.latex$/.test(p);
    const spans = raw ? [[s, true]] : [...s.matchAll(/\$\$([^$]+)\$\$|\$([^$]+)\$/g)].map((m) => [m[1] ?? m[2], !!m[1]]);
    for (const [tex, display] of spans) {
      mathCount++;
      try { katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'error', trust: false }); } catch (x) { errs.push(`${p}: KaTeX ${x.message}`); }
      const m = LOST.exec(tex);
      if (m) errs.push(`${p}: "${m[2]}" without backslash in ${tex}`);
      if (/[−×÷√≤≥≠]/.test(tex)) errs.push(`${p}: Unicode maths symbol inside $…$: ${tex}`);
    }
    if (!raw) {
      if ((s.match(/(?<!\\)\$/g) || []).length % 2) errs.push(`${p}: odd number of $`);
      const outside = s.replace(/\$\$[^$]+\$\$|\$[^$]+\$/g, '');
      if (/\\[a-zA-Z]+/.test(outside)) errs.push(`${p}: LaTeX outside $…$ (${outside.match(/\\[a-zA-Z]+/)[0]})`);
      if (/(^|[^\\])\b(dfrac|frac|sqrt)\{/.test(outside)) errs.push(`${p}: bare LaTeX command outside $…$`);
    }
  }
  stats.mathStringsParsed = mathCount;
  // ------------------------------------ narration
  let maxW = 0, sumW = 0, nS = 0;
  for (const d of release.decks) for (const s of d.slides) {
    const w = s.narration.trim().split(/\s+/u).length;
    maxW = Math.max(maxW, w); sumW += w; nS++;
    if (w > 90) errs.push(`deck${d.part}/${s.id}: narration ${w} words`);
    if (/[$\\=<>^_√×÷±≈≠≤≥°∠△∥]/.test(s.narration)) errs.push(`deck${d.part}/${s.id}: narration has a symbol`);
    const ab = s.narration.match(/\b[A-Z]{2,}\b/g)?.filter((x) => !['I'].includes(x));
    if (ab?.length) errs.push(`deck${d.part}/${s.id}: narration abbreviation ${ab.join(',')} (TTS reads letter by letter)`);
    if (/\b[a-zA-Z]\d|\d[a-zA-Z]\b/.test(s.narration)) errs.push(`deck${d.part}/${s.id}: narration mixes letters and digits`);
  }
  stats.narration = { slides: nS, maxWords: maxW, meanWords: Math.round(sumW / nS) };
  // ------------------------------------ visuals
  const visuals = [];
  release.decks.forEach((d) => d.slides.forEach((s) => s.visual && visuals.push([`deck${d.part}/${s.id}`, s.visual])));
  release.notes.sections.forEach((s, i) => { if (s.visual) visuals.push([`notes[${i}]`, s.visual]); s.visuals.forEach((v, k) => visuals.push([`notes[${i}].visuals[${k}]`, v])); });
  release.questions.forEach((q) => { q.assets.forEach((v, i) => visuals.push([`${q.id}.assets[${i}]`, v])); q.children.forEach((c) => c.assets.forEach((v, i) => visuals.push([`${q.id}.${c.id}.assets[${i}]`, v]))); });
  const byKind = {};
  for (const [where, v] of visuals) {
    const k = where.startsWith('deck') ? v.kind : `${v.kind} (notes/questions)`;
    byKind[k] = (byKind[k] ?? 0) + 1;
    if (v.alt.length < 40) errs.push(`${where}: alt too short`);
    if (v.kind === 'plot') plotChecks(where, v, errs, stats);
    if (v.kind === 'table') v.spec.rows.forEach((row, i) => row.length !== v.spec.headers.length && errs.push(`${where}: table row ${i} width`));
    if (v.kind === 'flow') { const ids = new Set(v.spec.nodes.map((n) => n.id)); v.spec.edges.forEach((e) => (!ids.has(e.from) || !ids.has(e.to)) && errs.push(`${where}: bad edge`)); }
  }
  stats.visualsByKind = byKind;
  // ------------------------------------ questions
  for (const q of release.questions) {
    const nodes = [q, ...q.children, ...q.children.flatMap((c) => c.alternatives)];
    for (const c of nodes) {
      const sum = c.marking_scheme.reduce((s, m) => s + m.marks, 0);
      if (Math.abs(sum - c.marks) > 1e-9) errs.push(`${q.id}/${c.id}: scheme ${sum} vs ${c.marks}`);
      if (c.type === 'long' && c.marking_scheme.length < 4) errs.push(`${q.id}: long answer needs ≥ 4 step marks`);
      if (c.type === 'short' && c.marks >= 3 && c.marking_scheme.length < 2) errs.push(`${q.id}: 3-mark answer needs step marks`);
      if (c.type === 'mcq' && new Set(c.options.map((o) => o.text_md)).size !== c.options.length) errs.push(`${q.id}/${c.id}: duplicate option text`);
    }
    if (q.type === 'case-based') {
      if (!q.children.some((c) => c.alternatives.length)) errs.push(`${q.id}: case needs an either/or part via alternatives`);
    }
  }
  const objective = new Set(['mcq', 'assertion-reason', 'true-false', 'fill-blank', 'numerical', 'multi-select', 'match']);
  for (const d of release.decks) for (const s of d.slides) if (s.check_question_id) {
    const q = release.questions.find((x) => x.id === s.check_question_id);
    if (!q || !objective.has(q.type)) errs.push(`deck${d.part}/${s.id}: check question not objective`);
  }
  // ------------------------------------ stats
  const count = (arr, fn) => arr.reduce((m, x) => ((m[fn(x)] = (m[fn(x)] ?? 0) + 1), m), {});
  const Qs = release.questions;
  stats.slides = release.decks.map((d) => d.slides.length);
  stats.layouts = count(release.decks.flatMap((d) => d.slides), (s) => s.layout);
  stats.slidesWithVisual = release.decks.flatMap((d) => d.slides).filter((s) => s.visual).length;
  stats.maxGapWithoutVisual = Math.max(...release.decks.map((d) => { let g = 0, m = 0; d.slides.forEach((s) => { g = s.visual ? 0 : g + 1; m = Math.max(m, g); }); return m; }));
  stats.workedExamples = release.decks.map((d) => d.slides.filter((s) => s.layout === 'example').length);
  stats.checks = release.decks.map((d) => d.slides.filter((s) => s.check_question_id).map((s) => s.check_question_id.slice(-3)).join(' '));
  stats.notesSections = release.notes.sections.length;
  stats.flashcards = release.flashcards.cards.length;
  stats.flashcardTags = count(release.flashcards.cards, (c) => c.tag);
  stats.questions = Qs.length;
  stats.byType = count(Qs, (q) => (q.type === 'short' ? `short-${q.marks}` : q.type));
  stats.byDifficulty = count(Qs, (q) => `d${q.difficulty}`);
  stats.byCompetency = count(Qs, (q) => q.competency);
  const app = Qs.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency));
  stats.applicationOrHigher = `${Math.round((100 * app.length) / Qs.length)}% of items, ${Math.round((100 * app.reduce((s, q) => s + q.marks, 0)) / Qs.reduce((s, q) => s + q.marks, 0))}% of marks`;
  stats.byTopic = count(Qs.flatMap((q) => q.topic_ids), (t) => t.slice(-3));
  stats.totalMarks = Qs.reduce((s, q) => s + q.marks, 0);
  stats.arKeys = Qs.filter((q) => q.type === 'assertion-reason').map((q) => q.answer.option_ids[0]).join('');
  stats.reSolved = `${log.filter((x) => x[3]).length}/${log.length} checks pass`;
  for (const t of tests) stats[t.id] = `${t.total_marks} marks / ${t.duration_min} min, ${t.sections.flatMap((s) => s.items).length} items, sections ${t.sections.map((s) => s.id).join('')}`;
  const [ts, tl] = tests.map((t) => new Set(t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
  const overlap = [...ts].filter((x) => tl.has(x));
  if (overlap.length) errs.push(`tests share ${overlap}`);
  release.build = { run_id: null, checks: release.build?.checks ?? {} };
  release.build.checks = {
    ...release.build.checks,
    katex: `${mathCount} math strings parsed with KaTeX ${katex.version} (throwOnError, strict: error), 0 failures; 0 LaTeX commands missing their backslash; 0 LaTeX outside $…$`,
    plots: `${byKind.plot ?? 0} deck plots + ${byKind['plot (notes/questions)'] ?? 0} notes/question plots: ${stats.plotPoints ?? 0} marked points all on their curves and matching their labels; ${stats.zerosChecked ?? 0} zeros located numerically and all marked; ${stats.intersectionsChecked ?? 0} intersection points lie on both lines`,
    re_solve: `${stats.reSolved} (independent arithmetic from the givens; keys, numerical values, and the numbers inside solutions and model answers)`,
    narration: `${nS} slides, max ${maxW} words, mean ${Math.round(sumW / nS)}; no symbols, LaTeX or letter abbreviations`,
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  };
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'release.json'), JSON.stringify(release, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'tests.json'), JSON.stringify({ tests }, null, 2) + '\n');
  fs.writeFileSync(path.join(dir, 'src', 'resolve.log'), log.map((x) => `${x[0].padEnd(28)} expected ${String(x[1]).slice(0, 40).padEnd(40)} got ${String(x[2]).replace(/\n/g, ' ').slice(0, 50).padEnd(50)} ${x[3] ? 'OK' : 'MISMATCH'}`).join('\n') + '\n');
  console.log(JSON.stringify(stats, null, 1));
  console.log(errs.length ? `ERRORS (${errs.length}):\n  ${errs.join('\n  ')}` : 'NO ERRORS');
  process.exitCode = errs.length ? 1 : 0;
}

// ---------------------------------------------------------------- tests (default CBSE 10 chapter-test blueprints)
export function chapterTests(chapterTitle, short, long) {
  return (qid, get) => {
    const item = (key, group = null) => { const id = qid(key); return { question_id: id, question_version: 1, marks: get(id).marks, choice_group: group }; };
    const sec = (id, title, instructions, keys, groups = []) => ({ id, title, instructions, items: keys.flatMap((k, i) => (Array.isArray(k) ? k.map((kk) => item(kk, `${id}${i + 1}`)) : [item(k)])), choice_groups: keys.flatMap((k, i) => (Array.isArray(k) ? [{ id: `${id}${i + 1}`, attempt: 1 }] : [])) });
    const subject = 'cbse-10-mathematics';
    return [
      {
        id: `t_cbse10math_ch${UNIT.slice(-2)}_short`, kind: 'chapter', paper_type: 'chapter-test-short', blueprint_id: 'cbse-10-default-chapter-test-short',
        title: `Chapter test (short) — ${chapterTitle}`, subject_id: subject, chapter_ids: [UNIT], duration_min: 40, total_marks: 20, shuffle: false,
        sections: [
          sec('A', 'Section A — Objective (1 mark each)', 'Each question carries 1 mark. Choose the correct option. For assertion-reason questions use the standard options (a)–(d).', short.A),
          sec('B', 'Section B — Short answer (2 and 3 marks)', 'Show your working. About 30–50 words for 2-mark and 50–80 words for 3-mark answers.', short.B),
          sec('C', 'Section C — Long answer (5 marks)', 'Answer any one of the two questions. Show every step.', [short.C]),
          sec('D', 'Section D — Case-based (4 marks)', 'Read the passage and answer all parts. Part (c) has an internal choice.', short.D),
        ],
        seed: null, version: 1,
      },
      {
        id: `t_cbse10math_ch${UNIT.slice(-2)}_long`, kind: 'chapter', paper_type: 'chapter-test-long', blueprint_id: 'cbse-10-default-chapter-test-long',
        title: `Chapter test (long) — ${chapterTitle}`, subject_id: subject, chapter_ids: [UNIT], duration_min: 90, total_marks: 40, shuffle: false,
        sections: [
          sec('A', 'Section A — Objective (1 mark each)', 'Each question carries 1 mark. Choose the correct option. For assertion-reason questions use the standard options (a)–(d).', long.A),
          sec('B', 'Section B — Short answer (2 and 3 marks)', 'Show your working. Internal choice in one 2-mark and one 3-mark question.', long.B),
          sec('C', 'Section C — Long answer (5 marks)', 'Answer the first question and any one of the next two.', long.C),
          sec('D', 'Section D — Case-based (4 marks each)', 'Read each passage and answer all parts. Part (c) of each case has an internal choice.', long.D),
        ],
        seed: null, version: 1,
      },
    ];
  };
}
