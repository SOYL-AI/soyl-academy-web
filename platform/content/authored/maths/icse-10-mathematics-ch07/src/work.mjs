// Working-line checker for ICSE 10 Mathematics ch07. Every equation typed in a worked example, a note or a
// model answer is parsed from its TeX by a small exact parser (fractions, + - × ÷, powers, brackets, implicit
// multiplication, single-letter variables and named polynomials such as f(2) or p\left(\dfrac{1}{2}\right))
// and evaluated with exact fractions (poly.mjs). For each pair of neighbouring sides of an "=" chain:
//   * both sides contain the free unknown(s) (x, or k, or p and q): they must be the SAME expression
//     (an identity, checked exactly at nine sample points; with refs given, a non-zero multiple of a
//     verified polynomial, so a typed polynomial cannot drift from the computed one);
//   * neither contains an unknown: the two numbers must be equal (exactly);
//   * one side contains the unknown and the other does not: an equation, which must hold at a verified
//     solution (a zero of the polynomial, or the solved values of k, p, q).
// "A \ne B" checks that the values differ. Alternatives joined by "\text{ or }" must between them give
// every verified solution. A side with any other letter or \text{…} is a label (e.g. R) and is skipped.
// A line that cannot be parsed stops the build.
import { Fr, F } from './poly.mjs';

export function texToSrc(t) {
  let s = t.replace(/\\left|\\right/g, '').replace(/\\[,;!:]|\\ |\\quad|\\qquad/g, ' ').replace(/\\times|\\cdot/g, '*').replace(/\\div/g, '/');
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
    if (/[a-zA-Z]/.test(c)) { out.push({ k: 'id', v: c }); i++; continue; }
    if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; continue; }
    throw new Error(`unexpected "${c}" in ${src}`);
  }
  return out;
}
const decFr = (s) => { if (!s.includes('.')) return F(Number(s)); const [a, b] = s.split('.'); return new Fr(Number(a + b), 10 ** b.length); };

/** Parse to an AST; fnNames are letters used as polynomial names (f(…), p(…)). */
export function parse(tex, fnNames = []) {
  const toks = tokenize(texToSrc(tex));
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
      if (t && (t.k === 'id' || (t.k === 'op' && t.v === '('))) { a = { t: '*', a, b: power() }; continue; }
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
    if (t.k === 'id') {
      if (fnNames.includes(t.v) && isOp('(')) { eat('('); const arg = sum(); eat(')'); return { t: 'call', f: t.v, a: arg }; }
      return { t: 'var', v: t.v };
    }
    if (t.v === '(') { const e = sum(); eat(')'); return e; }
    throw new Error(`unexpected ${t.v} in ${tex}`);
  }
  const ast = sum();
  if (p !== toks.length) throw new Error(`trailing input in ${tex}`);
  return ast;
}
export function evalAst(n, env, fns) {
  switch (n.t) {
    case 'num': return n.v;
    case 'var': if (!(n.v in env)) throw new Error(`unknown ${n.v}`); return Fr.of(env[n.v]);
    case 'neg': return evalAst(n.a, env, fns).neg();
    case '+': return evalAst(n.a, env, fns).add(evalAst(n.b, env, fns));
    case '-': return evalAst(n.a, env, fns).sub(evalAst(n.b, env, fns));
    case '*': return evalAst(n.a, env, fns).mul(evalAst(n.b, env, fns));
    case '/': return evalAst(n.a, env, fns).div(evalAst(n.b, env, fns));
    case '^': { const e = evalAst(n.b, env, fns); if (!e.isInt() || e.n < 0) throw new Error('non-integer power'); return evalAst(n.a, env, fns).pow(e.n); }
    case 'call': return fns[n.f](evalAst(n.a, env, fns), env);
  }
  throw new Error(`bad node ${n.t}`);
}
const varsOf = (n, out = new Set()) => { if (n.t === 'var') out.add(n.v); if (n.t === 'call') out.add(`${n.f}()`); for (const k of ['a', 'b']) if (n[k]) varsOf(n[k], out); return out; };

// sample values for the free unknowns (distinct, rational, avoid small special values)
const SAMPLE = [[7, 3], [-5, 2], [11, 1], [-13, 4], [3, 5], [17, 6], [-2, 7], [9, 8], [-19, 3]].map(([n, d]) => F(n, d));

/**
 * ctx = { free: ['x'] | ['k'] | ['p', 'q'], sols: [{ x: Fr }…], fns: { f: (x, env) => Fr }, refs: [(env) => Fr] (optional) }
 */
export function checkLine(line, ctx) {
  const errs = [];
  const fnNames = Object.keys(ctx.fns ?? {});
  const free = ctx.free ?? ['x'];
  const envs = SAMPLE.map((s, i) => Object.fromEntries(free.map((v, j) => [v, SAMPLE[(i + 4 * j) % SAMPLE.length]])));
  const side = (tex) => {
    const t = tex.trim();
    if (!t || /\\text/.test(t)) return null;
    const ast = parse(t, fnNames);
    const vs = varsOf(ast);
    for (const v of vs) if (!v.endsWith('()') && !free.includes(v)) return null; // label such as R
    const vals = envs.map((e) => evalAst(ast, e, ctx.fns));
    const dep = vals.some((v) => !v.eq(vals[0]));
    return { tex: t, ast, vals, dep };
  };
  const at = (s, sol) => evalAst(s.ast, { ...sol }, ctx.fns);
  const holdsAt = (a, b) => (ctx.sols ?? []).map((sol, i) => { try { return at(a, sol).eq(at(b, sol)) ? i : -1; } catch { return -1; } }).filter((i) => i >= 0);
  const refOk = (s) => {
    if (!ctx.refs?.length) return true;
    return ctx.refs.some((ref) => { const rv = envs.map((e) => ref(e)); const k = rv.findIndex((v) => !v.isZero()); if (k < 0) return false; const ratio = s.vals[k].div(rv[k]); return !ratio.isZero() && rv.every((v, i) => v.mul(ratio).eq(s.vals[i])); });
  };
  /** Check one "=" chain; returns indices of solutions at which its equation(s) hold (null if it is an identity/arithmetic chain). */
  const chain = (piece) => {
    const sides = piece.split('=').map(side);
    const live = sides.filter(Boolean);
    if (sides.length < 2) throw new Error(`no equation in "${piece}" of "${line}"`);
    if (live.length < 2) throw new Error(`nothing to check in "${piece}"`);
    let hits = null;
    for (let i = 0; i + 1 < live.length; i++) {
      const a = live[i], b = live[i + 1];
      if (a.dep && b.dep) {
        const same = a.vals.every((v, j) => v.eq(b.vals[j]));
        if (!same && ctx.bothSides && live.length === 2) {
          // unknown-coefficient contexts only: "k - 7 = 5 - k" is an equation, which must hold at the solved values
          const h = holdsAt(a, b);
          if (!h.length) errs.push(`"${piece}": ${a.tex} = ${b.tex} holds at no verified solution`);
          hits = hits === null ? h : hits.filter((x) => h.includes(x));
        } else if (!same) errs.push(`"${piece}": ${a.tex} and ${b.tex} are not identical`);
        else if (!refOk(a)) errs.push(`"${piece}": ${a.tex} is not a multiple of a verified polynomial`);
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
  const pieces = line.split(/\\Rightarrow|\\implies|\\therefore|\\text\{\s*(?:so|and|hence)\s*\}/).map((s) => s.trim()).filter(Boolean);
  for (const piece of pieces) {
    if (/\\text\{\s*or\s*\}/.test(piece)) {
      const alts = piece.split(/\\text\{\s*or\s*\}/).map((s) => s.trim().replace(/,$/, ''));
      const covered = new Set();
      for (const a of alts) { const { hits } = chain(a); if (!hits) errs.push(`"${a}": an alternative must be an equation in the unknown`); else hits.forEach((h) => covered.add(h)); }
      if (covered.size !== (ctx.sols ?? []).length) errs.push(`"${piece}": alternatives cover ${covered.size} of ${(ctx.sols ?? []).length} verified solutions`);
      continue;
    }
    if (/\\ne\b|\\neq\b/.test(piece)) {
      const [lhs, rhs] = piece.split(/\\neq?\b/);
      const { last } = chain(lhs);
      const r = side(rhs);
      if (!r || last.dep || r.dep) throw new Error(`"${piece}": \\ne needs numbers`);
      if (last.vals[0].eq(r.vals[0])) errs.push(`"${piece}": the two sides are equal`);
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

/** Context for a polynomial f in x with verified zeros (sols) and reference polynomials. */
export const xctx = (f, { name = 'f', zeros = [], refs = [] } = {}) => ({
  free: ['x'],
  sols: zeros.map((z) => ({ x: Fr.of(z) })),
  fns: { [name]: (x) => f.at(x) },
  refs: refs.map((p) => (env) => p.at(env.x)),
});
/** Context for unknown coefficients: tpls = { f: env => Poly, g: … } (or one template named f); sol is the solved env. */
export const kctx = (names, tpls, sol) => ({
  free: names,
  sols: [sol],
  bothSides: true,
  fns: Object.fromEntries(Object.entries(typeof tpls === 'function' ? { f: tpls } : tpls).map(([n, t]) => [n, (x, env) => t(env).at(x)])),
});
/** Context for an equation in x with the given verified zeros and no named polynomial. */
export const zctx = (...zeros) => ({ free: ['x'], sols: zeros.map((z) => ({ x: Fr.of(z) })), fns: {} });
/** Context for identities in x (long-division steps, expansions): no reference polynomial. */
export const IDX = { free: ['x'], sols: [], fns: {} };
/** True when the typed TeX expression in x equals the polynomial (exactly, at nine points). */
export function texEquals(tex, poly) {
  const ast = parse(tex);
  return SAMPLE.every((s) => evalAst(ast, { x: s }, {}).eq(poly.at(s)));
}
/** Context for a polynomial with unknowns in x as well: free x and the unknowns (identities only). */
export const xkctx = (names, tpl, { name = 'f' } = {}) => ({
  free: ['x', ...names],
  sols: [],
  fns: { [name]: (x, env) => tpl(env).at(x) },
});
export const ARITH = { free: [], sols: [], fns: {} };
