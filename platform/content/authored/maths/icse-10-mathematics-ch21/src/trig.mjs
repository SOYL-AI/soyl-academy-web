// Exact and floating-point trigonometry for ICSE 10 Mathematics ch20 Trigonometric Identities.
// - Q(sqrt2, sqrt3): elements [a, b, c, d] = a + b*sqrt2 + c*sqrt3 + d*sqrt6 with BigInt rational parts (Fr from prop.mjs).
//   Every value of sin, cos, tan, cot, sec, cosec at 0, 30, 45, 60, 90 degrees lives here, so evaluated expressions are exact.
// - A small expression language (sin(A), cos(90-A), tan(30)^2, sec(A) ...; + - * / ^, explicit * only) is parsed once and
//   evaluated three ways: exactly at standard angles, in floating point at any angle (to test identities), and "given-ratio"
//   mode where the angle T has a known exact set of ratios (e.g. sin T = 5/13) and sin(T), cos(T) ... return those.
// Anything undefined (tan 90, division by zero) throws or is skipped by the identity tests; nothing is ever rounded in a key.
import { Fr, fr } from './prop.mjs';

// ---------------------------------------------------------------- the field Q(sqrt2, sqrt3)
const Z = () => fr(0);
export const el = (a = 0, b = 0, c = 0, d = 0) => [fr(a), fr(b), fr(c), fr(d)];
const ELT = (x) => (Array.isArray(x) ? x : el(x));
export const add = (x, y) => { x = ELT(x); y = ELT(y); return x.map((v, i) => v.add(y[i])); };
export const sub = (x, y) => { x = ELT(x); y = ELT(y); return x.map((v, i) => v.sub(y[i])); };
export const neg = (x) => ELT(x).map((v) => v.neg());
export function mul(x, y) {
  const [a1, b1, c1, d1] = ELT(x), [a2, b2, c2, d2] = ELT(y);
  return [
    a1.mul(a2).add(b1.mul(b2).mul(2)).add(c1.mul(c2).mul(3)).add(d1.mul(d2).mul(6)),
    a1.mul(b2).add(b1.mul(a2)).add(c1.mul(d2).add(d1.mul(c2)).mul(3)),
    a1.mul(c2).add(c1.mul(a2)).add(b1.mul(d2).add(d1.mul(b2)).mul(2)),
    a1.mul(d2).add(d1.mul(a2)).add(b1.mul(c2)).add(c1.mul(b2)),
  ];
}
const s1 = ([a, b, c, d]) => [a, b.neg(), c, d.neg()]; // sqrt2 -> -sqrt2
const s2 = ([a, b, c, d]) => [a, b, c.neg(), d.neg()]; // sqrt3 -> -sqrt3
export const isZero = (x) => ELT(x).every((v) => v.n === 0n);
export function inv(x) {
  x = ELT(x);
  if (isZero(x)) throw new Error('division by zero');
  const others = mul(mul(s1(x), s2(x)), s2(s1(x)));
  const N = mul(x, others);
  if (!N.slice(1).every((v) => v.n === 0n)) throw new Error('norm not rational');
  return others.map((v) => v.div(N[0]));
}
export const div = (x, y) => mul(x, inv(y));
export function pow(x, k) {
  if (!Number.isInteger(k)) throw new Error('non-integer power');
  if (k < 0) return pow(inv(x), -k);
  let out = el(1);
  for (let i = 0; i < k; i++) out = mul(out, x);
  return out;
}
export const eq = (x, y) => isZero(sub(x, y));
export const isRat = (x) => ELT(x).slice(1).every((v) => v.n === 0n);
/** Rational part as Fr (throws when irrational). */
export const rat = (x) => { if (!isRat(x)) throw new Error('not rational'); return ELT(x)[0]; };
export const num = (x) => rat(x).v;
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
/** Canonical LaTeX: \dfrac{p + q\sqrt{3}}{d} (terms ordered 1, sqrt2, sqrt3, sqrt6), integers and plain fractions when rational. */
export function tx(x) {
  x = ELT(x);
  if (isRat(x)) return x[0].tex();
  let D = 1n;
  for (const v of x) D = (D * v.d) / bgcd(D, v.d);
  const co = x.map((v) => (v.n * D) / v.d);
  const names = ['', '\\sqrt{2}', '\\sqrt{3}', '\\sqrt{6}'];
  let g = D;
  for (const c of co) g = bgcd(g, c);
  const Dn = D / g;
  const terms = co.map((c, i) => [c / g, names[i]]).filter(([c]) => c !== 0n);
  let s = '';
  terms.forEach(([c, n], i) => {
    const mag = c < 0n ? -c : c;
    const body = n === '' ? `${mag}` : mag === 1n ? n : `${mag}${n}`;
    s += i === 0 ? (c < 0n ? `-${body}` : body) : c < 0n ? ` - ${body}` : ` + ${body}`;
  });
  return Dn === 1n ? s : `\\dfrac{${s}}{${Dn}}`;
}

// ---------------------------------------------------------------- standard-angle values
const R = (a, b) => fr(a, b);
const SIN = { 0: el(0), 30: el(R(1, 2)), 45: el(0, R(1, 2)), 60: el(0, 0, R(1, 2)), 90: el(1) };
const COS = { 0: SIN[90], 30: SIN[60], 45: SIN[45], 60: SIN[30], 90: SIN[0] };
export const STD = [0, 30, 45, 60, 90];
function stdFn(name, deg) {
  const key = Number(deg);
  if (!STD.includes(key)) throw new Error(`not a standard angle: ${deg}`);
  const s = SIN[key], c = COS[key];
  switch (name) {
    case 'sin': return s;
    case 'cos': return c;
    case 'tan': return div(s, c);
    case 'cot': return div(c, s);
    case 'sec': return inv(c);
    case 'cosec': return inv(s);
    default: throw new Error(`unknown function ${name}`);
  }
}
const FNS = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'cosec']);
const flFn = (name, deg) => {
  const t = (deg * Math.PI) / 180, s = Math.sin(t), c = Math.cos(t);
  return { sin: s, cos: c, tan: s / c, cot: c / s, sec: 1 / c, cosec: 1 / s }[name];
};

// ---------------------------------------------------------------- parser
function parse(src) {
  const toks = [];
  const re = /\s*(?:(\d+(?:\.\d+)?)|([A-Za-z]+)|(.))/gy;
  let m;
  while (re.lastIndex < src.length && (m = re.exec(src))) {
    if (m[1] !== undefined) toks.push({ t: 'num', v: m[1] });
    else if (m[2] !== undefined) toks.push({ t: 'id', v: m[2] });
    else toks.push({ t: 'op', v: m[3] });
  }
  let i = 0;
  const peek = () => toks[i], take = () => toks[i++];
  const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
  function expr() {
    let a = term();
    while (isOp('+') || isOp('-')) { const op = take().v; a = { t: 'bin', op, a, b: term() }; }
    return a;
  }
  function term() {
    let a = unary();
    while (isOp('*') || isOp('/')) { const op = take().v; a = { t: 'bin', op, a, b: unary() }; }
    return a;
  }
  function unary() {
    if (isOp('-')) { take(); return { t: 'neg', a: unary() }; }
    return power();
  }
  function power() {
    const a = atom();
    if (isOp('^')) { take(); const k = take(); if (k.t !== 'num') throw new Error('integer exponent expected'); return { t: 'pow', a, k: Number(k.v) }; }
    return a;
  }
  function atom() {
    const k = take();
    if (!k) throw new Error(`unexpected end of ${src}`);
    if (k.t === 'num') return { t: 'num', v: k.v };
    if (k.t === 'op' && k.v === '(') { const e = expr(); if (!isOp(')')) throw new Error(`) expected in ${src}`); take(); return e; }
    if (k.t === 'id' && FNS.has(k.v)) {
      if (!isOp('(')) throw new Error(`( expected after ${k.v} in ${src}`);
      take(); const e = expr(); if (!isOp(')')) throw new Error(`) expected in ${src}`); take();
      return { t: 'fn', name: k.v, a: e };
    }
    if (k.t === 'id') return { t: 'var', n: k.v };
    throw new Error(`unexpected ${k.v} in ${src}`);
  }
  const ast = expr();
  if (i !== toks.length) throw new Error(`trailing input in ${src}`);
  return ast;
}
const cache = new Map();
const ast = (s) => { if (!cache.has(s)) cache.set(s, parse(s)); return cache.get(s); };

const MARK = { mark: true };
function evalExact(a, env, ratios) {
  const go = (n) => evalExact(n, env, ratios);
  switch (a.t) {
    case 'num': return el(fr(a.v));
    case 'var': {
      if (a.n === 'T' && ratios) return MARK;
      if (!(a.n in env)) throw new Error(`unbound ${a.n}`);
      return ELT(env[a.n]);
    }
    case 'neg': return neg(go(a.a));
    case 'bin': {
      const x = go(a.a), y = go(a.b);
      if (x === MARK || y === MARK) throw new Error('arithmetic on the symbolic angle');
      return a.op === '+' ? add(x, y) : a.op === '-' ? sub(x, y) : a.op === '*' ? mul(x, y) : div(x, y);
    }
    case 'pow': return pow(go(a.a), a.k);
    case 'fn': {
      const x = go(a.a);
      if (x === MARK) { if (!ratios || !(a.name in ratios)) throw new Error(`no ratio ${a.name}`); return ELT(ratios[a.name]); }
      return stdFn(a.name, num(x));
    }
    default: throw new Error('bad node');
  }
}
function evalFloat(a, env) {
  const go = (n) => evalFloat(n, env);
  switch (a.t) {
    case 'num': return Number(a.v);
    case 'var': if (!(a.n in env)) throw new Error(`unbound ${a.n}`); return env[a.n];
    case 'neg': return -go(a.a);
    case 'bin': { const x = go(a.a), y = go(a.b); return a.op === '+' ? x + y : a.op === '-' ? x - y : a.op === '*' ? x * y : x / y; }
    case 'pow': return go(a.a) ** a.k;
    case 'fn': return flFn(a.name, go(a.a));
    default: throw new Error('bad node');
  }
}

/** Exact value of an expression at standard angles (env: { A: 30, B: 60 }). */
export const E = (src, env = {}) => evalExact(ast(src), env, null);
/** Floating-point value (env angles in degrees). */
export const Fl = (src, env = {}) => evalFloat(ast(src), env);
/** Exact value when the angle T has known ratios (see ratiosFrom*), e.g. G('sin(T)*cos(T)', ratiosFromSin(5, 13)). */
export const G = (src, ratios, env = {}) => evalExact(ast(src), env, ratios);

// ---------------------------------------------------------------- identities
const FLOAT_ANGLES = [7, 18, 23, 31, 37, 44, 52, 58, 66, 73, 81];
/**
 * Both sides agree at every angle: exactly at the standard angles in `exact` (angles where a side is undefined are skipped,
 * and at least two must remain) and to 1e-9 relative at the floating-point angles in `floats`. Returns the number of points checked.
 */
export function identity(lhs, rhs, { exact = [30, 45, 60], floats = FLOAT_ANGLES, vars = {} } = {}) {
  let n = 0, exactUsed = 0;
  for (const A of exact) {
    let x, y;
    try { x = E(lhs, { A, ...vars }); y = E(rhs, { A, ...vars }); } catch { continue; }
    if (!eq(x, y)) throw new Error(`identity fails exactly at ${A} degrees: ${lhs} vs ${rhs}: ${tx(x)} vs ${tx(y)}`);
    n++; exactUsed++;
  }
  if (exactUsed < 2) throw new Error(`identity ${lhs} = ${rhs}: fewer than two exact points`);
  for (const A of floats) {
    const x = Fl(lhs, { A, ...vars }), y = Fl(rhs, { A, ...vars });
    if (!(Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y)))) throw new Error(`identity fails at ${A} degrees: ${lhs} = ${x}, ${rhs} = ${y}`);
    n++;
  }
  return n;
}
/** True when the two sides differ at one of the given angles (an alleged identity that is false, or a dropped condition). */
export function fails(lhs, rhs, angles = [30, 45, 60], vars = {}) {
  return angles.some((A) => {
    try { return !eq(E(lhs, { A, ...vars }), E(rhs, { A, ...vars })); } catch { return false; }
  });
}
/** Float version of fails for non-standard angles. */
export function failsFl(lhs, rhs, angles = [20, 35, 50], vars = {}) {
  return angles.some((A) => Math.abs(Fl(lhs, { A, ...vars }) - Fl(rhs, { A, ...vars })) > 1e-6);
}

// ---------------------------------------------------------------- ratios from one given ratio (acute angle, exact rationals)
const full = (s, c) => ({ sin: s, cos: c, tan: s.div(c), cot: c.div(s), sec: fr(1).div(c), cosec: fr(1).div(s) });
const rt = (v) => { const r = fr(v).sqrt(); if (!r) throw new Error(`not a perfect square: ${v}`); return r; };
export const ratiosFromSin = (s) => { s = fr(s); return full(s, rt(fr(1).sub(s.mul(s)))); };
export const ratiosFromCos = (c) => { c = fr(c); return full(rt(fr(1).sub(c.mul(c))), c); };
export const ratiosFromTan = (t) => { t = fr(t); const c = rt(fr(1).div(fr(1).add(t.mul(t)))); return full(t.mul(c), c); };
export const ratiosFromCot = (k) => ratiosFromTan(fr(1).div(fr(k)));
export const ratiosFromSec = (s) => ratiosFromCos(fr(1).div(fr(s)));
export const ratiosFromCosec = (s) => ratiosFromSin(fr(1).div(fr(s)));
/** Ratios as exact field elements, ready for G(). Also checks the three identities hold exactly for them. */
export function ratiosOf(r) {
  const one = fr(1);
  if (!r.sin.pow(2).add(r.cos.pow(2)).eq(one) || !one.add(r.tan.pow(2)).eq(r.sec.pow(2)) || !one.add(r.cot.pow(2)).eq(r.cosec.pow(2))) throw new Error('ratios violate the Pythagorean identities');
  if (!(r.sin.cmp(0) > 0 && r.cos.cmp(0) > 0 && r.sin.cmp(1) < 0)) throw new Error('not an acute angle');
  return Object.fromEntries(Object.entries(r).map(([k, v]) => [k, el(v)]));
}
export const fromSin = (p, q) => ratiosOf(ratiosFromSin(fr(p, q)));
export const fromCos = (p, q) => ratiosOf(ratiosFromCos(fr(p, q)));
export const fromTan = (p, q) => ratiosOf(ratiosFromTan(fr(p, q)));
export const fromCot = (p, q) => ratiosOf(ratiosFromCot(fr(p, q)));
export const fromSec = (p, q) => ratiosOf(ratiosFromSec(fr(p, q)));
export const fromCosec = (p, q) => ratiosOf(ratiosFromCosec(fr(p, q)));
export { Fr, fr };
/** True when identity() passes (both sides agree at every exact and floating-point test angle). */
export function same(lhs, rhs, opts) { try { identity(lhs, rhs, opts); return true; } catch { return false; } }
/** For each candidate expression: does it equal the target at every test angle? (Used to check that exactly one MCQ option is right.) */
export const only = (target, cands, opts) => cands.map((c) => same(c, target, opts));
