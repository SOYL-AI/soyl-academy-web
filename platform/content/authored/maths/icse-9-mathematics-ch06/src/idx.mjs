// Exact arithmetic for ICSE 9 Mathematics ch06 Indices (Exponents).
// Values are exact rationals (BigInt numerator and denominator). A fractional index p/q is only accepted when the
// q-th root of the base is itself an exact rational (a perfect power), so every "evaluate" is an exact statement.
// Algebraic expressions (products, quotients and powers of letters with rational exponents, plus sums of such
// terms) are kept as sums of monomials c * v1^e1 * v2^e2 ... with rational exponents, so the exponent
// arithmetic of every variable is compared exactly. A typed TeX working line is parsed and evaluated; every segment
// of "A = B = C" must have the same exact value, so a mistyped step stops the build.
// Exponents that contain an unknown (2^{x+1}) are only evaluated after the unknown is substituted (env), which is how
// roots of exponential equations and identities with symbolic exponents are checked.

const big = (v) => BigInt(v);
const gcdB = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };

export class Rat {
  constructor(n, d = 1n) {
    n = big(n); d = big(d);
    if (d === 0n) throw new Error('division by zero');
    if (d < 0n) { n = -n; d = -d; }
    const k = gcdB(n, d) || 1n;
    this.n = n / k; this.d = d / k;
  }
  add(o) { return new Rat(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Rat(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Rat(this.n * o.n, this.d * o.d); }
  div(o) { if (o.n === 0n) throw new Error('division by zero'); return new Rat(this.n * o.d, this.d * o.n); }
  neg() { return new Rat(-this.n, this.d); }
  inv() { return new Rat(this.d, this.n); }
  eq(o) { return this.n === o.n && this.d === o.d; }
  get isInt() { return this.d === 1n; }
  get isZero() { return this.n === 0n; }
  get sign() { return this.n === 0n ? 0 : this.n < 0n ? -1 : 1; }
  num() { return Number(this.n) / Number(this.d); }
  pow(k) { // integer exponent (bigint-safe)
    k = Number(k);
    if (k === 0) return new Rat(1);
    if (k < 0) return this.inv().pow(-k);
    let out = new Rat(1);
    for (let i = 0; i < k; i++) out = out.mul(this);
    return out;
  }
  toString() { return this.isInt ? String(this.n) : `${this.n}/${this.d}`; }
}
export const R = (n, d = 1) => new Rat(n, d);
const ONE = R(1), ZERO = R(0);

function iroot(n, q) { // floor of the q-th root of a non-negative BigInt
  if (n < 2n) return n;
  let lo = 0n, hi = 1n;
  while (hi ** big(q) <= n) hi *= 2n;
  while (lo < hi - 1n) { const m = (lo + hi) / 2n; if (m ** big(q) <= n) lo = m; else hi = m; }
  return lo;
}
/** The q-th root of a positive rational when it is an exact rational, else throws. */
export function rootExact(x, q) {
  if (x.sign < 0) throw new Error(`root of a negative number: ${x}`);
  const a = iroot(x.n, q), b = iroot(x.d, q);
  if (a ** big(q) !== x.n || b ** big(q) !== x.d) throw new Error(`${x} has no exact ${q}-th root`);
  return new Rat(a, b);
}
/** base^e for rational base and rational exponent; a fractional exponent needs a positive base with an exact root. */
export function powRat(base, e) {
  if (e.isInt) {
    if (base.isZero && e.sign <= 0) throw new Error('0 to a non-positive power');
    return base.pow(e.n);
  }
  if (base.sign <= 0) throw new Error(`fractional index on a non-positive base ${base}`);
  const p = Number(e.n), q = Number(e.d);
  return rootExact(base, q).pow(p);
}

// ------------------------------------------------------------ polynomials in letters with rational exponents
const mkey = (e) => Object.keys(e).sort().map((v) => `${v}:${e[v]}`).join(',');
class Poly {
  constructor(terms = new Map()) { this.t = terms; }
  static const(c) { return c.isZero ? new Poly() : new Poly(new Map([['', { c, e: {} }]])); }
  static letter(v) { return new Poly(new Map([[`${v}:1`, { c: ONE, e: { [v]: ONE } }]])); }
  static from(list) {
    const m = new Map();
    for (const { c, e } of list) {
      const e2 = Object.fromEntries(Object.entries(e).filter(([, x]) => !x.isZero));
      const k = mkey(e2);
      const prev = m.get(k);
      const nc = prev ? prev.c.add(c) : c;
      if (nc.isZero) m.delete(k); else m.set(k, { c: nc, e: e2 });
    }
    return new Poly(m);
  }
  list() { return [...this.t.values()]; }
  get isConst() { return this.t.size === 0 || (this.t.size === 1 && this.t.has('')); }
  get value() { if (!this.isConst) throw new Error(`not a number: ${this}`); return this.t.size ? this.t.get('').c : ZERO; }
  add(o) { return Poly.from([...this.list(), ...o.list()]); }
  neg() { return Poly.from(this.list().map(({ c, e }) => ({ c: c.neg(), e }))); }
  sub(o) { return this.add(o.neg()); }
  mul(o) {
    const out = [];
    for (const a of this.list()) for (const b of o.list()) {
      const e = { ...a.e };
      for (const [v, x] of Object.entries(b.e)) e[v] = e[v] ? e[v].add(x) : x;
      out.push({ c: a.c.mul(b.c), e });
    }
    return Poly.from(out);
  }
  inv() {
    if (this.t.size !== 1) throw new Error(`cannot divide by a sum: ${this}`);
    const { c, e } = this.list()[0];
    return Poly.from([{ c: c.inv(), e: Object.fromEntries(Object.entries(e).map(([v, x]) => [v, x.neg()])) }]);
  }
  div(o) { return this.mul(o.inv()); }
  pow(e) { // e: Rat
    if (e.isInt) {
      const n = Number(e.n);
      if (n < 0) return this.inv().pow(R(-n));
      let out = Poly.const(ONE);
      for (let i = 0; i < n; i++) out = out.mul(this);
      return out;
    }
    if (this.t.size !== 1) throw new Error(`fractional index on a sum: ${this}`);
    const { c, e: ex } = this.list()[0];
    return Poly.from([{ c: powRat(c, e), e: Object.fromEntries(Object.entries(ex).map(([v, x]) => [v, x.mul(e)])) }]);
  }
  eq(o) {
    if (this.t.size !== o.t.size) return false;
    for (const [k, a] of this.t) { const b = o.t.get(k); if (!b || !a.c.eq(b.c)) return false; }
    return true;
  }
  toString() { return this.list().map(({ c, e }) => `${c}${Object.entries(e).sort(([p], [q]) => (p < q ? -1 : 1)).map(([v, x]) => `*${v}^${x}`).join('')}`).join(' + ') || '0'; }
}
export { Poly };

// ------------------------------------------------------------ TeX tokenizer and parser
function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let m;
    if ((m = /^\s+/.exec(rest))) { i += m[0].length; continue; }
    if ((m = /^\\(?:,|;|!|quad|qquad| )/.exec(rest))) { i += m[0].length; continue; }
    if ((m = /^\d+(\.\d+)?/.exec(rest))) { out.push({ k: 'num', v: m[0] }); i += m[0].length; continue; }
    if ((m = /^\\[a-zA-Z]+/.exec(rest))) { out.push({ k: 'cmd', v: m[0] }); i += m[0].length; continue; }
    if ((m = /^[a-zA-Z]/.exec(rest))) { out.push({ k: 'let', v: m[0] }); i += 1; continue; }
    out.push({ k: 'sym', v: rest[0] }); i += 1;
  }
  return out;
}
const toRat = (s) => { // decimal string to Rat
  const [a, b = ''] = s.split('.');
  return new Rat(big(a + b), big(10) ** big(b.length));
};
const asRat = (v) => (v instanceof Rat ? v : Array.isArray(v) ? new Rat(v[0], v[1]) : new Rat(v));

function parse(tex, env = {}) {
  const T = tokenize(tex);
  let p = 0;
  const peek = () => T[p];
  const isSym = (v) => T[p] && T[p].k === 'sym' && T[p].v === v;
  const isCmd = (v) => T[p] && T[p].k === 'cmd' && T[p].v === v;
  const fail = (m) => { throw new Error(`${m} at token ${p} in: ${tex}`); };
  const eatSym = (v) => { if (!isSym(v)) fail(`expected ${v}`); p++; };
  const letters = Object.fromEntries(Object.entries(env).map(([k, v]) => [k, asRat(v)]));

  function braced() { eatSym('{'); const x = expr(); eatSym('}'); return x; }
  function atom() {
    const t = peek();
    if (!t) fail('unexpected end');
    if (t.k === 'num') { p++; return Poly.const(toRat(t.v)); }
    if (t.k === 'let') { p++; return t.v in letters ? Poly.const(letters[t.v]) : Poly.letter(t.v); }
    if (t.k === 'sym' && t.v === '(') { p++; const x = expr(); eatSym(')'); return x; }
    if (t.k === 'cmd') {
      if (t.v === '\\left') { p++; eatSym('('); const x = expr(); if (!isCmd('\\right')) fail('expected right'); p++; eatSym(')'); return x; }
      if (t.v === '\\dfrac' || t.v === '\\frac') { p++; const a = braced(); const b = braced(); return a.div(b); }
      if (t.v === '\\sqrt') {
        p++;
        let q = 2;
        if (isSym('[')) { p++; q = Number(peek().v); p++; eatSym(']'); }
        return braced().pow(R(1, q));
      }
    }
    return fail(`unexpected ${t.v}`);
  }
  function power() {
    const base = atom();
    if (isSym('^')) {
      p++;
      let e;
      if (isSym('{')) e = braced();
      else {
        const t = peek();
        if (t && t.k === 'num') { if (t.v.length > 1) fail('write a multi-digit exponent in braces'); p++; e = Poly.const(R(t.v)); }
        else if (t && t.k === 'let') { p++; e = t.v in letters ? Poly.const(letters[t.v]) : Poly.letter(t.v); }
        else fail('bad exponent');
      }
      if (!e.isConst) fail('exponent contains an unknown: substitute it first');
      const out = base.pow(e.value);
      if (isSym('^')) fail('double exponent needs braces');
      return out;
    }
    return base;
  }
  const startsFactor = () => { const t = peek(); return t && (t.k === 'num' || t.k === 'let' || (t.k === 'sym' && t.v === '(') || (t.k === 'cmd' && ['\\left', '\\dfrac', '\\frac', '\\sqrt'].includes(t.v))); };
  function unary() {
    if (isSym('-')) { p++; return unary().neg(); }
    if (isSym('+')) { p++; return unary(); }
    return power();
  }
  function term() {
    let a = unary();
    for (;;) {
      if (isCmd('\\times') || isCmd('\\cdot')) { p++; a = a.mul(unary()); }
      else if (isCmd('\\div')) { p++; a = a.div(unary()); }
      else if (startsFactor()) a = a.mul(power());
      else return a;
    }
  }
  function expr() {
    let a = term();
    for (;;) {
      if (isSym('+')) { p++; a = a.add(term()); }
      else if (isSym('-')) { p++; a = a.sub(term()); }
      else return a;
    }
  }
  const x = expr();
  if (p < T.length) fail('trailing tokens');
  return x;
}

/** Evaluate a TeX expression (letters may remain as variables unless given in env). */
export const E = (tex, env = {}) => parse(tex, env);
/** Evaluate a TeX expression with no unknowns to an exact rational. */
export const V = (tex, env = {}) => parse(tex, env).value;
/** TeX of a rational: integers plain, others as a \dfrac. */
export const tx = (x) => (x.isInt ? String(x.n) : `${x.sign < 0 ? '-' : ''}\\dfrac{${x.n < 0n ? -x.n : x.n}}{${x.d}}`);
const splitTop = (s) => { const parts = []; let depth = 0, cur = ''; for (const ch of s) { if ('{(['.includes(ch)) depth++; if ('})]'.includes(ch)) depth--; if (ch === '=' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch; } parts.push(cur); return parts; };
/** A working line "A = B = C": every segment must have the same exact value. Returns the last segment's value. */
export function chain(line, env = {}) {
  const parts = splitTop(line);
  if (parts.length < 2) throw new Error(`not a chain: ${line}`);
  const vals = parts.map((s) => parse(s, env));
  vals.forEach((v, i) => { if (!v.eq(vals[0])) throw new Error(`working line fails at "${parts[i].trim()}" (= ${v}) vs "${parts[0].trim()}" (= ${vals[0]}): ${line}`); });
  return vals[vals.length - 1];
}
/** Numeric working line (no unknowns): chain, returning the exact rational. */
export const chainV = (line, env = {}) => chain(line, env).value;
/** lhs and rhs agree as expressions of letters (exact exponent arithmetic). */
export const same = (lhs, rhs, env = {}) => E(lhs, env).eq(E(rhs, env));
/** An identity with symbolic exponents: lhs = rhs at each sample assignment of its unknowns. */
export function identity(lhs, rhs, samples) {
  for (const env of samples) if (!V(lhs, env).eq(V(rhs, env))) throw new Error(`identity fails at ${JSON.stringify(env)}: ${lhs} vs ${rhs}`);
  return true;
}
/** The exponent of a letter in a single-monomial result, as [num, den]; or null if absent. */
export function expOf(poly, v) {
  if (poly.t.size !== 1) throw new Error(`not a monomial: ${poly}`);
  const x = poly.list()[0].e[v];
  return x ? [Number(x.n), Number(x.d)] : [0, 1];
}
export const coefOf = (poly) => { if (poly.t.size !== 1) throw new Error(`not a monomial: ${poly}`); return poly.list()[0].c; };

/**
 * Exponential equation lhs = rhs in x (lhs, rhs TeX in x). The typed root is checked three ways:
 *  1. exact substitution: lhs(root) = rhs(root);
 *  2. uniqueness: lhs - rhs is exactly evaluated at integer x in [-10, 10] (where defined); it is strictly monotone and changes
 *     sign exactly once, in the integer interval that contains the root (all terms are increasing or all decreasing in x);
 *  3. returns the root as an exact Rat.
 */
export function solveExp(lhs, rhs, root, { range = [-10, 10], skipSamples = false } = {}) {
  const r0 = asRat(root);
  if (!V(lhs, { x: r0 }).eq(V(rhs, { x: r0 }))) throw new Error(`root ${r0} fails: ${lhs} = ${rhs}`);
  if (skipSamples) return r0;
  const f = (k) => V(lhs, { x: k }).sub(V(rhs, { x: k }));
  const ys = [];
  for (let k = range[0]; k <= range[1]; k++) { try { ys.push([k, f(k)]); } catch { /* undefined at this integer */ } }
  if (ys.length < 6) throw new Error('too few sample points for the uniqueness check');
  const incr = ys.every(([, y], i) => i === 0 || y.sub(ys[i - 1][1]).sign > 0);
  const decr = ys.every(([, y], i) => i === 0 || y.sub(ys[i - 1][1]).sign < 0);
  if (!incr && !decr) throw new Error(`not monotone on the sample points: ${lhs} = ${rhs}`);
  // strictly monotone, so at most one root; the end values straddle zero, and the typed root lies inside the sampled range
  const first = ys[0][1].sign, last = ys[ys.length - 1][1].sign;
  if (first * last > 0) throw new Error(`no sign change on the sample points: ${lhs} = ${rhs}`);
  if (r0.num() < ys[0][0] || r0.num() > ys[ys.length - 1][0]) throw new Error('root outside the sampled integers');
  return r0;
}

/** Root of a x + b = c x + d (a, b, c, d integers or Rats), a != c. */
export function linRoot(a, b, c, d) {
  const [A, B, C, D] = [a, b, c, d].map(asRat);
  if (A.eq(C)) throw new Error('same coefficient of x: no unique root');
  return D.sub(B).div(A.sub(C));
}
export { asRat };
