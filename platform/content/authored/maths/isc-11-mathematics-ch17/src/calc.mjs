// Helpers for ISC 11 Mathematics ch17 Derivatives.
// 1. An expression engine: one string such as 'x^2sin(x)' gives the TeX that is printed AND the function that is checked,
//    so an option or an answer in the text can never differ from the function that was tested.
// 2. Numeric differentiation: central difference (f(x+h) - f(x-h)) / 2h with h = 1e-5, and the forward difference quotient
//    at h = 1e-6, compared with a claimed derivative at several sample points.
// 3. Exact polynomials (Laurent: integer powers, positive or negative) on exact fractions, with exact derivative, product
//    and evaluation, so that polynomial derivatives are verified in exact arithmetic besides numerically.
import { Fr, F } from './fr.mjs';
export { Fr, F };

// ------------------------------------------------------------------ expression parser
const FNS = { sin: Math.sin, cos: Math.cos, tan: Math.tan, sec: (v) => 1 / Math.cos(v), cosec: (v) => 1 / Math.sin(v), cot: (v) => 1 / Math.tan(v), sqrt: Math.sqrt, abs: Math.abs };
const NAMES = ['cosec', 'sqrt', 'sin', 'cos', 'tan', 'sec', 'cot', 'abs', 'pi', 'x', 'h', 't', 'a', 'b', 'n'];
function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ') { i++; continue; }
    const num = /^(\d+(\.\d+)?)/.exec(src.slice(i));
    if (num) { out.push({ k: 'num', v: num[0] }); i += num[0].length; continue; }
    const id = /^[a-z]+/.exec(src.slice(i));
    if (id) {
      let w = id[0];
      while (w) { const nm = NAMES.find((n) => w.startsWith(n)); if (!nm) throw new Error(`unknown name ${w} in ${src}`); out.push({ k: 'id', v: nm }); w = w.slice(nm.length); }
      i += id[0].length; continue;
    }
    if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; continue; }
    throw new Error(`bad character ${c} in ${src}`);
  }
  return out;
}
export function parse(src) {
  const toks = tokenize(src);
  let i = 0;
  const isOp = (v) => toks[i]?.k === 'op' && toks[i].v === v;
  const sum = () => { let a = prod(); while (isOp('+') || isOp('-')) { const op = toks[i++].v; a = { t: 'bin', op, a, b: prod() }; } return a; };
  const startsAtom = () => toks[i] && (toks[i].k === 'id' || (toks[i].k === 'op' && toks[i].v === '('));
  const prod = () => {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) { const op = toks[i++].v; a = { t: 'bin', op, a, b: unary() }; } else if (startsAtom()) a = { t: 'bin', op: '*', a, b: power(), implicit: true };
      else return a;
    }
  };
  const unary = () => { if (isOp('-')) { i++; return { t: 'neg', a: unary() }; } if (isOp('+')) { i++; return unary(); } return power(); };
  const power = () => { const a = atom(); if (isOp('^')) { i++; return { t: 'bin', op: '^', a, b: unary() }; } return a; };
  const atom = () => {
    const tk = toks[i++];
    if (!tk) throw new Error(`unexpected end in ${src}`);
    if (tk.k === 'num') return { t: 'num', raw: tk.v, v: Number(tk.v) };
    if (tk.k === 'op' && tk.v === '(') { const e = sum(); if (!isOp(')')) throw new Error(`missing ) in ${src}`); i++; return { t: 'paren', a: e }; }
    if (tk.k === 'id') {
      if (FNS[tk.v]) { if (!isOp('(')) throw new Error(`${tk.v} needs ( in ${src}`); i++; const e = sum(); if (!isOp(')')) throw new Error(`missing ) in ${src}`); i++; return { t: 'call', fn: tk.v, a: e }; }
      if (tk.v === 'pi') return { t: 'pi' };
      return { t: 'var', n: tk.v };
    }
    throw new Error(`unexpected ${tk.v} in ${src}`);
  };
  const e = sum();
  if (i !== toks.length) throw new Error(`trailing input in ${src}`);
  return e;
}
const evalNode = (n, env) => {
  switch (n.t) {
    case 'num': return n.v;
    case 'pi': return Math.PI;
    case 'var': if (!(n.n in env)) throw new Error(`variable ${n.n} not set`); return env[n.n];
    case 'paren': return evalNode(n.a, env);
    case 'neg': return -evalNode(n.a, env);
    case 'call': return FNS[n.fn](evalNode(n.a, env));
    case 'bin': { const a = evalNode(n.a, env), b = evalNode(n.b, env); return n.op === '+' ? a + b : n.op === '-' ? a - b : n.op === '*' ? a * b : n.op === '/' ? a / b : a ** b; }
    default: throw new Error(`bad node ${n.t}`);
  }
};

// ------------------------------------------------------------------ TeX printer (precedence: 0 sum, 1 product, 2 unary/power base)
const strip = (n) => (n.t === 'paren' ? strip(n.a) : n);
const leadNeg = (n) => { n = strip(n); return n.t === 'neg' || (n.t === 'bin' && (n.op === '*' || n.op === '/') && leadNeg(n.a)); };
const stripNeg = (n) => { n = strip(n); return n.t === 'neg' ? n.a : { ...n, a: stripNeg(n.a) }; };
const isAtomic = (n) => { n = strip(n); return n.t === 'num' || n.t === 'var' || n.t === 'pi'; };
const TRIG = { sin: '\\sin', cos: '\\cos', tan: '\\tan', cot: '\\cot', sec: '\\sec', cosec: '\\operatorname{cosec}' };
function simpleArg(n) { n = strip(n); return isAtomic(n) || (n.t === 'bin' && n.op === '*' && strip(n.a).t === 'num' && isAtomic(n.b)); }
function tex(n, ctx = 0) {
  n = strip(n);
  switch (n.t) {
    case 'num': return n.raw;
    case 'pi': return '\\pi';
    case 'var': return n.n;
    case 'neg': { const s = `-${tex(n.a, 2)}`; return ctx >= 2 ? `(${s})` : s; }
    case 'call': {
      if (n.fn === 'sqrt') return `\\sqrt{${tex(n.a, 0)}}`;
      if (n.fn === 'abs') return `\\lvert ${tex(n.a, 0)} \\rvert`;
      return simpleArg(n.a) ? `${TRIG[n.fn]} ${tex(n.a, 1)}` : `${TRIG[n.fn]}(${tex(n.a, 0)})`;
    }
    case 'bin': {
      if (n.op === '+' || n.op === '-') {
        let s;
        if (n.op === '+' && leadNeg(n.b)) s = `${tex(n.a, 0)} - ${tex(stripNeg(n.b), 1)}`;
        else s = `${tex(n.a, 0)} ${n.op} ${tex(n.b, 1)}`;
        return ctx >= 1 ? `(${s})` : s;
      }
      if (n.op === '*') {
        const A = tex(n.a, 1), B0 = tex(n.b, 1);
        const B = leadNeg(n.b) ? `(${B0})` : B0;
        const sep = /^[0-9]/.test(B) ? ' \\times ' : '';
        const s = `${A}${sep}${B}`;
        return ctx >= 2 ? `(${s})` : s;
      }
      if (n.op === '/') { const s = `\\dfrac{${tex(n.a, 0)}}{${tex(n.b, 0)}}`; return ctx >= 3 ? `(${s})` : s; }
      // power
      const base = strip(n.a);
      if (base.t === 'call' && TRIG[base.fn]) return simpleArg(base.a) ? `${TRIG[base.fn]}^{${tex(n.b, 0)}} ${tex(base.a, 1)}` : `${TRIG[base.fn]}^{${tex(n.b, 0)}}(${tex(base.a, 0)})`;
      const B = isAtomic(base) && !(base.t === 'num' && /\./.test(base.raw)) ? tex(base, 2) : base.t === 'call' && base.fn === 'sqrt' ? tex(base, 2) : `(${tex(base, 0)})`;
      return `${B}^{${tex(n.b, 0)}}`;
    }
    default: throw new Error(`bad node ${n.t}`);
  }
}
/** E('x^2sin(x)') -> { s, ast, tex, T (wrapped in $), f(x), g(env) } */
export function E(s) {
  const ast = parse(s);
  const t = tex(ast, 0);
  return { s, ast, tex: t, T: `$${t}$`, f: (x) => evalNode(ast, { x }), g: (env) => evalNode(ast, env) };
}
export const T = (s) => E(s).T;
/** Evaluate an expression string in x. */
export const ef = (s) => E(s).f;

// ------------------------------------------------------------------ numeric differentiation
export const cd = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
export const fdq = (f, x, h) => (f(x + h) - f(x)) / h;
export const near = (a, b, tol = 1e-6) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b));
export const XS = [-2.7, -1.3, -0.4, 0.6, 1.5, 2.4, 3.3]; // away from 0, pi and multiples of pi/2
export const XP = [0.3, 0.8, 1.7, 2.6, 4.1]; // positive values (square roots, reciprocals of x)
export const XT = [0.2, 0.5, 0.9, 1.2, 1.4]; // inside (0, pi/2): every trigonometric function is defined and finite
/** df is the derivative of f at every sample point: central difference, h = 1e-5. */
export function derivOK(f, df, xs = XS) {
  return xs.every((x) => near(cd(f, x), df(x), 1e-5));
}
/** The forward difference quotient at a small h agrees with df at x (first-principles check). */
export function dqOK(f, df, x, h = 1e-6) { return near(fdq(f, x, h), df(x), 1e-4); }
/** Two functions agree at every sample point. */
export function sameFn(f, g, xs = XS) { return xs.every((x) => near(f(x), g(x), 1e-9)); }
/** Indices of the options whose function is the derivative of f. */
export function whichDeriv(f, optStrings, xs = XS) { return optStrings.map((s, k) => (derivOK(f, ef(s), xs) ? k : -1)).filter((k) => k >= 0); }
/** Distinct as functions: no two of the options agree at all sample points. */
export function allDistinct(optStrings, xs = XS) {
  for (let i = 0; i < optStrings.length; i++) for (let j = i + 1; j < optStrings.length; j++) if (sameFn(ef(optStrings[i]), ef(optStrings[j]), xs)) return false;
  return true;
}
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const round = (v, d = 4) => Math.round(v * 10 ** d) / 10 ** d;

// ------------------------------------------------------------------ exact Laurent polynomials
export class Poly {
  constructor(m = new Map()) { this.m = new Map([...m].filter(([, c]) => !c.isZero())); }
  /** Poly.of([[coef, exp], ...]) */
  static of(terms) { const m = new Map(); for (const [c, e] of terms) m.set(e, (m.get(e) ?? F(0)).add(F(c))); return new Poly(m); }
  add(o) { const m = new Map(this.m); for (const [e, c] of o.m) m.set(e, (m.get(e) ?? F(0)).add(c)); return new Poly(m); }
  neg() { return new Poly(new Map([...this.m].map(([e, c]) => [e, c.neg()]))); }
  sub(o) { return this.add(o.neg()); }
  mul(o) { const m = new Map(); for (const [e1, c1] of this.m) for (const [e2, c2] of o.m) m.set(e1 + e2, (m.get(e1 + e2) ?? F(0)).add(c1.mul(c2))); return new Poly(m); }
  scale(k) { return this.mul(Poly.of([[k, 0]])); }
  d() { const m = new Map(); for (const [e, c] of this.m) if (e !== 0) m.set(e - 1, c.mul(e)); return new Poly(m); }
  at(x) { x = Fr.of(x); let s = F(0); for (const [e, c] of this.m) s = s.add(c.mul(e >= 0 ? x.pow(e) : F(1).div(x.pow(-e)))); return s; }
  eq(o) { return this.sub(o).m.size === 0; }
  degree() { return Math.max(...this.m.keys()); }
  fn() { return (x) => { let s = 0; for (const [e, c] of this.m) s += c.num() * x ** e; return s; }; }
  /** Expression string for E(): integer coefficients only, descending powers. */
  expr() {
    const es = [...this.m.keys()].sort((a, b) => b - a);
    if (!es.length) return '0';
    let out = '';
    es.forEach((e, k) => {
      const c = this.m.get(e);
      if (!c.isInt()) throw new Error(`non-integer coefficient ${c}`);
      const a = Math.abs(c.n), neg = c.n < 0;
      let body;
      if (e === 0) body = String(a);
      else { const xp = e === 1 ? 'x' : e < 0 ? `x^(-${-e})` : `x^${e}`; body = a === 1 ? xp : `${a}${xp}`; }
      out += k === 0 ? (neg ? `-${body}` : body) : ` ${neg ? '-' : '+'} ${body}`;
    });
    return out;
  }
  tex() { return E(this.expr()).tex; }
}
export const poly = (...terms) => Poly.of(terms);

/** Indices of the options (expression strings in x) that equal the target function at every sample point. */
export function whichSame(target, optStrings, xs = XS) { return optStrings.map((s, k) => (sameFn(target, ef(s), xs) ? k : -1)).filter((k) => k >= 0); }
/** Indices of the options (expressions in x and h) that equal the difference quotient of f for every x in xs and h in hs. */
export function whichDQ(f, optStrings, xs = [1.3, 2.1, -0.7], hs = [0.5, 0.2, 0.1, -0.3, -0.05]) {
  return optStrings.map((s, k) => { const e = E(s); return xs.every((x) => hs.every((h) => near((f(x + h) - f(x)) / h, e.g({ x, h }), 1e-9))) ? k : -1; }).filter((k) => k >= 0);
}
export const XQ = [0.2, 0.9, 1.7, 2.3, -0.8, -1.9]; // away from the zeros of 1 + cos x and of sin x
/** The line y = expr passes through (a, f(a)) with slope f'(a). */
export const isTangent = (f, a, lineStr) => { const g = ef(lineStr); return near(g(a), f(a), 1e-9) && near(cd(g, a), cd(f, a), 1e-6); };
