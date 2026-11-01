// Exact arithmetic for ICSE 10 Mathematics ch09 Arithmetic Progression.
// Fractions are reduced integer pairs (every operation asserts safe integers). An AP is held as its first
// term a and common difference d (fractions). Every fact the chapter states about an AP is computed here
// and cross-checked two ways:
//   * a term T(n) by the formula a + (n - 1)d AND by listing the sequence (adding d again and again);
//   * a sum S(n) by n/2 [2a + (n - 1)d], by n/2 (a + l) AND by adding the listed terms one by one;
//   * "which term is v" by solving a + (n - 1)d = v exactly, then confirmed by listing up to that term;
//   * n from a given sum by the exact quadratic d n^2 + (2a - d) n - 2S = 0 (both rational roots) AND by a
//     search over n = 1, 2, 3, … of the listed partial sums;
//   * a and d from two terms by exact elimination, substituted back into both terms.

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

export class Fr {
  constructor(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g === 0 ? 0 : n / g;
    this.d = this.n === 0 ? 1 : d / g;
    Object.freeze(this);
  }
  static of(v) {
    if (v instanceof Fr) return v;
    if (Number.isInteger(v)) return new Fr(v);
    if (Array.isArray(v)) return new Fr(v[0], v[1]);
    if (typeof v === 'number' && Number.isFinite(v)) {
      // terminating decimals typed as numbers (e.g. 2.5): exact via their decimal string
      const s = String(v);
      if (/e/i.test(s)) throw new Error(`not an exact value: ${v}`);
      const [i, f = ''] = s.split('.');
      return new Fr(Number(i + f), 10 ** f.length);
    }
    throw new Error(`not an exact value: ${v}`);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); if (o.n === 0) throw new Error('division by zero'); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  pow(k) { if (!Number.isInteger(k) || k < 0) throw new Error(`bad power ${k}`); let r = new Fr(1); for (let i = 0; i < k; i++) r = r.mul(this); return r; }
  isZero() { return this.n === 0; }
  isInt() { return this.d === 1; }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  lt(o) { o = Fr.of(o); return this.n * o.d < o.n * this.d; }
  sign() { return Math.sign(this.n); }
  num() { return this.n / this.d; }
  /** TeX: 3, -2, \dfrac{5}{2}; dec = true writes terminating fractions as decimals (2.5). */
  tex(dec = false) {
    if (this.d === 1) return String(this.n);
    if (dec && isTerminating(this.d)) return decimal(this);
    return `${this.n < 0 ? '-' : ''}\\dfrac{${Math.abs(this.n)}}{${this.d}}`;
  }
  /** TeX safe as a factor: 2, (-2), \left(\dfrac{1}{2}\right). */
  ptex(dec = false) { if (this.d === 1 || (dec && isTerminating(this.d))) return this.sign() < 0 ? `(${this.tex(dec)})` : this.tex(dec); return `\\left(${this.tex()}\\right)`; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => new Fr(n, d);
const isTerminating = (d) => { while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
function decimal(x) {
  let k = 0;
  while (!x.mul(10 ** k).isInt()) k++;
  const v = x.mul(10 ** k).n;
  const s = String(Math.abs(v)).padStart(k + 1, '0');
  return `${v < 0 ? '-' : ''}${s.slice(0, s.length - k)}.${s.slice(s.length - k)}`;
}
/** Plain-number string of an exact value (decimal if terminating), for checks against typed text. */
export const dec = (x) => Fr.of(x).tex(true);

export function must(cond, msg) { if (!cond) throw new Error(`ap check failed: ${msg}`); }

/** Exact square root of a non-negative fraction, or null. */
export function sqrtFr(x) {
  x = Fr.of(x);
  if (x.sign() < 0) return null;
  const r = (v) => { const s = Math.round(Math.sqrt(v)); return s * s === v ? s : null; };
  const a = r(x.n), b = r(x.d);
  return a === null || b === null ? null : F(a, b);
}
/** Rational roots of A t^2 + B t + C = 0 (A ≠ 0), ascending; null when they are irrational. */
export function quadRoots(A, B, C) {
  [A, B, C] = [A, B, C].map(Fr.of);
  const D = B.mul(B).sub(A.mul(C).mul(4));
  if (D.sign() < 0) return [];
  const s = sqrtFr(D);
  if (!s) return null;
  const roots = [B.neg().sub(s).div(A.mul(2)), B.neg().add(s).div(A.mul(2))];
  for (const t of roots) must(A.mul(t).mul(t).add(B.mul(t)).add(C).isZero(), 'quadratic root check');
  const uniq = roots.filter((t, i) => roots.findIndex((u) => u.eq(t)) === i);
  return uniq.sort((u, v) => u.num() - v.num());
}

export class AP {
  constructor(a, d) { this.a = Fr.of(a); this.d = Fr.of(d); Object.freeze(this); }
  /** The first n terms, by repeated addition of d (independent of the formula). */
  list(n) {
    must(Number.isInteger(n) && n >= 1 && n <= 5000, `list length ${n}`);
    const out = [this.a];
    for (let k = 1; k < n; k++) out.push(out[k - 1].add(this.d));
    return out;
  }
  /** nth term: formula a + (n - 1)d, checked against the listed sequence. */
  T(n) {
    must(Number.isInteger(n) && n >= 1, `term index ${n}`);
    const f = this.a.add(this.d.mul(n - 1));
    must(this.list(n)[n - 1].eq(f), `T(${n}) formula vs listing`);
    return f;
  }
  /** Sum of the first n terms: n/2[2a + (n - 1)d] = n/2(a + l) = the listed terms added one by one. */
  S(n) {
    must(Number.isInteger(n) && n >= 1, `sum length ${n}`);
    const f1 = F(n, 2).mul(this.a.mul(2).add(this.d.mul(n - 1)));
    const f2 = F(n, 2).mul(this.a.add(this.T(n)));
    const added = this.list(n).reduce((s, t) => s.add(t), F(0));
    must(f1.eq(f2) && f1.eq(added), `S(${n}) formulas vs adding`);
    return f1;
  }
  /** Position of v in the AP (integer ≥ 1) or null; confirmed by listing. */
  indexOf(v) {
    v = Fr.of(v);
    if (this.d.isZero()) return v.eq(this.a) ? 1 : null;
    const k = v.sub(this.a).div(this.d).add(1);
    const ok = k.isInt() && k.n >= 1;
    if (ok) must(this.list(k.n)[k.n - 1].eq(v), `indexOf(${v}) by listing`);
    else if (k.num() >= 1 && k.num() < 5000) must(!this.list(Math.ceil(k.num())).some((t) => t.eq(v)), `indexOf(${v}) absent by listing`);
    return ok ? k.n : null;
  }
  /** Number of terms from a to the last term l (must be a term). */
  count(l) { const k = this.indexOf(l); must(k !== null, `${l} is not a term`); return k; }
  /** Values of n ≥ 1 with S(n) = S: exact quadratic roots AND a search over listed partial sums (up to max). */
  nForSum(S, max = 400) {
    S = Fr.of(S);
    let found = [];
    let run = F(0);
    for (const [i, t] of this.list(max).entries()) { run = run.add(t); if (run.eq(S)) found.push(i + 1); }
    if (this.d.isZero()) return found;
    // S = n/2 [2a + (n - 1)d]  <=>  d n^2 + (2a - d) n - 2S = 0
    const roots = quadRoots(this.d, this.a.mul(2).sub(this.d), S.mul(-2));
    const pos = (roots ?? []).filter((t) => t.isInt() && t.n >= 1).map((t) => t.n);
    must(JSON.stringify(pos) === JSON.stringify(found), `nForSum(${S}): quadratic ${pos} vs search ${found}`);
    return found;
  }
  /** Quadratic d n^2 + (2a - d) n - 2S = 0 for a given sum, as exact coefficients and roots. */
  sumQuadratic(S) {
    S = Fr.of(S);
    const co = [this.d, this.a.mul(2).sub(this.d), S.mul(-2)];
    return { co, roots: quadRoots(...co) };
  }
  /** TeX of the first k terms followed by \ldots. */
  tex(k = 3, dec = true) { return `${this.list(k).map((t) => t.tex(dec)).join(', ')}, \\ldots`; }
  /** nth-term expression as a polynomial in n: d n + (a - d). */
  nth() { return { coef: this.d, cons: this.a.sub(this.d) }; }
}
/** The AP with T(p) = u and T(q) = v: d = (v - u)/(q - p), a = u - (p - 1)d; substituted back. */
export function fromTerms(p, u, q, v) {
  u = Fr.of(u); v = Fr.of(v);
  const d = v.sub(u).div(q - p), a = u.sub(d.mul(p - 1));
  const ap = new AP(a, d);
  must(ap.T(p).eq(u) && ap.T(q).eq(v), 'fromTerms substitution');
  return ap;
}
/** Is the list an AP (all consecutive differences equal)? */
export function isAP(list) {
  const xs = list.map(Fr.of);
  const diffs = xs.slice(1).map((x, i) => x.sub(xs[i]));
  return diffs.every((x) => x.eq(diffs[0]));
}
/** Consecutive differences of a list (for tables). */
export const diffs = (list) => { const xs = list.map(Fr.of); return xs.slice(1).map((x, i) => x.sub(xs[i])); };
/** Sum of a list. */
export const total = (list) => list.map(Fr.of).reduce((s, t) => s.add(t), F(0));
/** Indian digit grouping inside TeX: 125000 -> 1{,}25{,}000. */
export function inr(v) {
  v = Fr.of(v);
  must(v.isInt(), `inr needs an integer: ${v}`);
  const s = String(Math.abs(v.n));
  if (s.length <= 3) return (v.n < 0 ? '-' : '') + s;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  const groups = [];
  while (rest.length > 2) { groups.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
  if (rest) groups.unshift(rest);
  return (v.n < 0 ? '-' : '') + [...groups, last3].join('{,}');
}
