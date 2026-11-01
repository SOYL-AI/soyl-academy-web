// Working-line checker for ICSE 10 Mathematics ch09 Arithmetic Progression (adapted from ch07's work.mjs).
// Every equation typed in a worked example, a note, a flashcard or a model answer is parsed from its TeX by a
// small exact parser (fractions, + - × ÷, powers, round and square brackets, implicit multiplication,
// single-letter variables, decimals, Indian digit groups such as 1{,}25{,}000, and subscripted names such as
// T_{20}, T_n, S_{15}, S_{n - 1}) and evaluated with exact fractions (ap.mjs).
//   * consts: letters with fixed values in this line's context (e.g. a = 7, d = 4 for a given AP);
//   * free:   unknowns (n, or a and d, or x, k) — sides containing them are expressions;
//   * labels: subscripted names with a value rule, e.g. T_k = a + (k - 1)d and S_k = k/2[2a + (k - 1)d], using
//             the context's a and d (fixed or free); the index may itself contain n.
// For each pair of neighbouring sides of an "=" chain:
//   * both sides depend on the unknowns: they must be the SAME expression (checked exactly at nine sample
//     points), unless ctx.bothSides allows an equation that must hold at a verified solution;
//   * neither does: the two numbers must be equal exactly;
//   * one does and the other does not: an equation, which must hold at a verified solution (sols).
// "A \ne B" checks that the values differ. Alternatives joined by "\text{ or }" must between them give every
// verified solution. A side with an unknown letter, an unknown subscripted name or \text{…} is a label and is
// skipped. A line that cannot be parsed stops the build.
import { Fr, F } from './ap.mjs';

export function texToSrc(t) {
  let s = t
    .replace(/\{,\}/g, '')
    .replace(/(\d)\\,(?=\d)/g, '$1')
    .replace(/\\left|\\right|\\bigl|\\bigr|\\big|\\Big/g, '')
    .replace(/\\[,;!:]|\\ |\\quad|\\qquad/g, ' ')
    .replace(/\\times|\\cdot/g, '*')
    .replace(/\\div/g, '/')
    .replace(/\[/g, '(').replace(/\]/g, ')');
  // subscripted names: X_{...} or X_c  ->  @X<...>
  s = s.replace(/([A-Za-z])_\{([^{}]*)\}/g, '@$1<$2>').replace(/([A-Za-z])_([A-Za-z0-9])/g, '@$1<$2>');
  const FR = /\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/;
  let guard = 0;
  while (FR.test(s) && guard++ < 80) s = s.replace(FR, (m, a, b) => `((${a})/(${b}))`);
  if (/\\[a-zA-Z]/.test(s)) throw new Error(`unsupported TeX in a working line: ${t}`);
  return s.replace(/\{/g, '(').replace(/\}/g, ')').trim();
}

function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/\d/.test(c)) { let j = i; while (j < src.length && /[\d.]/.test(src[j])) j++; out.push({ k: 'num', v: src.slice(i, j) }); i = j; continue; }
    if (c === '@') {
      const name = src[i + 1];
      if (!/[A-Za-z]/.test(name) || src[i + 2] !== '<') throw new Error(`bad subscript in ${src}`);
      const j = src.indexOf('>', i + 3);
      if (j < 0) throw new Error(`unclosed subscript in ${src}`);
      out.push({ k: 'lab', v: name, idx: src.slice(i + 3, j) });
      i = j + 1;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) { out.push({ k: 'id', v: c }); i++; continue; }
    if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; continue; }
    throw new Error(`unexpected "${c}" in ${src}`);
  }
  return out;
}
const decFr = (s) => { if (!s.includes('.')) return F(Number(s)); const [a, b] = s.split('.'); return new Fr(Number(a + b), 10 ** b.length); };

function parseSrc(src, tex) {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v) => peek()?.k === 'op' && peek().v === v;
  const eat = (v) => { if (!isOp(v)) throw new Error(`expected ${v} in ${tex}`); p++; };
  function sum() {
    let a = prod();
    while (isOp('+') || isOp('-')) { const op = toks[p++].v; a = { t: op, a, b: prod() }; }
    return a;
  }
  function prod() {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) { const op = toks[p++].v; a = { t: op, a, b: unary() }; continue; }
      const t = peek();
      if (t && (t.k === 'id' || t.k === 'lab' || (t.k === 'op' && t.v === '('))) { a = { t: '*', a, b: power() }; continue; }
      if (t && t.k === 'num') throw new Error(`a number follows an expression without an operator in ${tex}`);
      return a;
    }
  }
  function unary() { if (isOp('-')) { p++; return { t: 'neg', a: unary() }; } if (isOp('+')) { p++; return unary(); } return power(); }
  function power() { const a = atom(); if (isOp('^')) { p++; return { t: '^', a, b: unaryNoImplicit() }; } return a; }
  function unaryNoImplicit() { if (isOp('-')) { p++; return { t: 'neg', a: atom() }; } return atom(); }
  function atom() {
    const t = toks[p++];
    if (!t) throw new Error(`unexpected end of ${tex}`);
    if (t.k === 'num') return { t: 'num', v: decFr(t.v) };
    if (t.k === 'id') return { t: 'var', v: t.v };
    if (t.k === 'lab') return { t: 'lab', v: t.v, idx: parseSrc(t.idx, tex) };
    if (t.v === '(') { const e = sum(); eat(')'); return e; }
    throw new Error(`unexpected ${t.v} in ${tex}`);
  }
  const ast = sum();
  if (p !== toks.length) throw new Error(`trailing input in ${tex}`);
  return ast;
}
export const parse = (tex) => parseSrc(texToSrc(tex), tex);

export function evalAst(n, env, labels) {
  switch (n.t) {
    case 'num': return n.v;
    case 'var': if (!(n.v in env)) throw new Error(`unknown ${n.v}`); return Fr.of(env[n.v]);
    case 'lab': { const fn = labels[n.v]; if (!fn) throw new Error(`unknown label ${n.v}`); return fn(evalAst(n.idx, env, labels), env); }
    case 'neg': return evalAst(n.a, env, labels).neg();
    case '+': return evalAst(n.a, env, labels).add(evalAst(n.b, env, labels));
    case '-': return evalAst(n.a, env, labels).sub(evalAst(n.b, env, labels));
    case '*': return evalAst(n.a, env, labels).mul(evalAst(n.b, env, labels));
    case '/': return evalAst(n.a, env, labels).div(evalAst(n.b, env, labels));
    case '^': { const e = evalAst(n.b, env, labels); if (!e.isInt() || e.n < 0) throw new Error('non-integer power'); return evalAst(n.a, env, labels).pow(e.n); }
  }
  throw new Error(`bad node ${n.t}`);
}
const varsOf = (n, out = { v: new Set(), l: new Set() }) => {
  if (n.t === 'var') out.v.add(n.v);
  if (n.t === 'lab') { out.l.add(n.v); varsOf(n.idx, out); }
  for (const k of ['a', 'b']) if (n[k]) varsOf(n[k], out);
  return out;
};

// sample values for the free unknowns (distinct, rational, avoid small special values)
const SAMPLE = [[7, 3], [-5, 2], [11, 1], [-13, 4], [3, 5], [17, 6], [-2, 7], [9, 8], [-19, 3]].map(([n, d]) => F(n, d));

/** Default AP labels: T_k (and t_k) = a + (k - 1)d, S_k = k/2 [2a + (k - 1)d], with a and d from the env. */
export const AP_LABELS = {
  T: (k, e) => Fr.of(e.a).add(Fr.of(e.d).mul(k.sub(1))),
  t: (k, e) => Fr.of(e.a).add(Fr.of(e.d).mul(k.sub(1))),
  S: (k, e) => k.div(2).mul(Fr.of(e.a).mul(2).add(Fr.of(e.d).mul(k.sub(1)))),
};

/**
 * ctx = { consts: { a: 7, d: 4, … }, free: ['n'] | ['a', 'd'] | [], sols: [{ n: Fr }…], labels: {…}, bothSides }
 */
export function checkLine(line, ctx) {
  const errs = [];
  const free = ctx.free ?? [];
  const consts = Object.fromEntries(Object.entries(ctx.consts ?? {}).map(([k, v]) => [k, Fr.of(v)]));
  const labels = ctx.labels ?? AP_LABELS;
  const envs = SAMPLE.map((s, i) => ({ ...consts, ...Object.fromEntries(free.map((v, j) => [v, SAMPLE[(i + 4 * j) % SAMPLE.length]])) }));
  const sols = (ctx.sols ?? []).map((s) => ({ ...consts, ...Object.fromEntries(Object.entries(s).map(([k, v]) => [k, Fr.of(v)])) }));
  const side = (tex) => {
    const t = tex.trim();
    if (!t || /\\text/.test(t)) return null;
    const ast = parse(t);
    const vs = varsOf(ast);
    for (const v of vs.v) if (!free.includes(v) && !(v in consts)) return null; // label such as l
    for (const l of vs.l) if (!labels[l]) return null;
    let vals;
    try { vals = envs.map((e) => evalAst(ast, e, labels)); } catch (x) { if (/division by zero/.test(x.message)) vals = envs.slice(1).map((e) => evalAst(ast, e, labels)); else throw x; }
    const dep = vals.some((v) => !v.eq(vals[0]));
    return { tex: t, ast, vals, dep };
  };
  const at = (s, sol) => evalAst(s.ast, sol, labels);
  const holdsAt = (a, b) => sols.map((sol, i) => { try { return at(a, sol).eq(at(b, sol)) ? i : -1; } catch { return -1; } }).filter((i) => i >= 0);
  const chain = (piece) => {
    const sides = piece.split('=').map(side);
    const live = sides.filter(Boolean);
    if (sides.length < 2) throw new Error(`no equation in "${piece}" of "${line}"`);
    if (live.length < 2) throw new Error(`nothing to check in "${piece}" of "${line}"`);
    let hits = null;
    for (let i = 0; i + 1 < live.length; i++) {
      const a = live[i], b = live[i + 1];
      if (a.dep && b.dep) {
        const same = a.vals.length === b.vals.length && a.vals.every((v, j) => v.eq(b.vals[j]));
        if (!same && ctx.bothSides && live.length === 2) {
          const h = holdsAt(a, b);
          if (!h.length) errs.push(`"${piece}": ${a.tex} = ${b.tex} holds at no verified solution`);
          hits = hits === null ? h : hits.filter((x) => h.includes(x));
        } else if (!same) errs.push(`"${piece}": ${a.tex} and ${b.tex} are not identical`);
      } else if (!a.dep && !b.dep) {
        if (!a.vals[0].eq(b.vals[0])) errs.push(`"${piece}": ${a.tex} = ${b.tex} is false (${a.vals[0]} vs ${b.vals[0]})`);
      } else {
        const h = holdsAt(a, b);
        if (!h.length) errs.push(`"${piece}": ${a.tex} = ${b.tex} holds at no verified solution`);
        hits = hits === null ? h : hits.filter((x) => h.includes(x));
      }
    }
    return { hits, last: live[live.length - 1] };
  };
  const pieces = line.split(/\\Rightarrow|\\implies|\\therefore|\\text\{\s*(?:so|and|hence|giving)\s*\}|;/).map((s) => s.trim()).filter(Boolean);
  for (const piece of pieces) {
    if (/\\text\{\s*or\s*\}/.test(piece)) {
      const alts = piece.split(/\\text\{\s*or\s*\}/).map((s) => s.trim().replace(/,$/, ''));
      const covered = new Set();
      for (const a of alts) { const { hits } = chain(a); if (!hits) errs.push(`"${a}": an alternative must be an equation in the unknown`); else hits.forEach((h) => covered.add(h)); }
      if (covered.size !== sols.length) errs.push(`"${piece}": alternatives cover ${covered.size} of ${sols.length} verified solutions`);
      continue;
    }
    if (/\\ne\b|\\neq\b/.test(piece)) {
      const [lhs, rhs] = piece.split(/\\neq?\b/);
      const left = lhs.includes('=') ? chain(lhs).last : side(lhs);
      const rr = side(rhs);
      if (!left || !rr || left.dep || rr.dep) throw new Error(`"${piece}": \\ne needs numbers`);
      if (left.vals[0].eq(rr.vals[0])) errs.push(`"${piece}": the two sides are equal`);
      continue;
    }
    if (/<|>|\\le\b|\\ge\b|\\lt\b|\\gt\b/.test(piece)) {
      const m = piece.split(/\\le\b|\\ge\b|<|>/);
      const op = piece.match(/\\le\b|\\ge\b|<|>/)[0];
      const L = m[0].includes('=') ? chain(m[0]).last : side(m[0]);
      const R = m[1].includes('=') ? chain(m[1]).last : side(m[1]);
      if (!L || !R || L.dep || R.dep) throw new Error(`"${piece}": an inequality needs numbers`);
      const x = L.vals[0], y = R.vals[0];
      const ok = op === '<' ? x.lt(y) : op === '>' ? y.lt(x) : op === '\\le' ? !y.lt(x) : !x.lt(y);
      if (!ok) errs.push(`"${piece}": inequality is false (${x} ${op} ${y})`);
      continue;
    }
    chain(piece);
  }
  return errs;
}

/** Working lines bound to a context: md for Markdown, verify(C) inside an item check, must() in build code. */
export function steps(ctx, lines) {
  return {
    lines,
    md: lines.map((l) => `$${l}$`),
    verify(C, label = '') { for (const l of lines) { const e = checkLine(l, ctx); C.assert(!e.length, `${label}working line "${l}" ${e.length ? e.join('; ') : 'checked'}`); } },
    must(msg = '') { for (const l of lines) { const e = checkLine(l, ctx); if (e.length) throw new Error(`${msg}: ${e.join('; ')}`); } return this; },
  };
}

/** Value of a typed TeX expression for given letter values (e.g. an MCQ option such as 7n - 2 at n = 3). */
export function texVal(tex, env = {}, labels = AP_LABELS) {
  return evalAst(parse(tex), Object.fromEntries(Object.entries(env).map(([k, v]) => [k, Fr.of(v)])), labels);
}

/** Context for a known AP (a, d fixed); optional unknown n with its verified values. */
export const apctx = (ap, { free = [], sols = [], consts = {} } = {}) => ({ consts: { a: ap.a, d: ap.d, ...consts }, free, sols, labels: AP_LABELS });
/** Context for unknown a and d (and others) with the solved values. */
export const solvectx = (names, sol, { consts = {}, labels = AP_LABELS } = {}) => ({ consts, free: names, sols: [sol], labels, bothSides: true });
/** Plain arithmetic, no unknowns. */
export const ARITH = { consts: {}, free: [], sols: [], labels: {} };
/** An equation in one unknown with the given verified values. */
export const eqctx = (name, values, consts = {}) => ({ consts, free: [name], sols: values.map((v) => ({ [name]: v })), labels: AP_LABELS, bothSides: true });
