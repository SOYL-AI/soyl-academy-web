// Exact arithmetic and finite sample spaces for ISC 11 Mathematics ch19 Probability.
// Every probability in the chapter is computed here by enumerating a finite sample space with exact rationals (BigInt fractions).
// The addition theorem is cross-checked against direct counting of the union (addOK), and the complement rule against direct counting.
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const gcdB = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcdB(b, a % b));
/** Exact rational number on BigInt. */
export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const k = gcdB(n, d) || 1n;
    this.n = n / k; this.d = d / k;
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  lt(o) { o = fr(o); return this.n * o.d < o.n * this.d; }
  le(o) { return this.lt(o) || this.eq(o); }
  sign() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  isZero() { return this.n === 0n; }
  num() { return Number(this.n) / Number(this.d); }
  str() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  /** Fraction in LaTeX. */
  tex() { return this.d === 1n ? `${this.n}` : this.n < 0n ? `-\\dfrac{${-this.n}}{${this.d}}` : `\\dfrac{${this.n}}{${this.d}}`; }
  /** Terminating decimal if there is one (0.35), otherwise the fraction. */
  dtex() { const s = this.decimal(); return s ?? this.tex(); }
  decimal() {
    for (let k = 0; k <= 8; k++) {
      const p = 10n ** BigInt(k);
      if ((this.n * p) % this.d === 0n) {
        const v = (this.n * p) / this.d, neg = v < 0n, a = neg ? -v : v;
        let s = a.toString().padStart(k + 1, '0');
        if (k) s = `${s.slice(0, -k)}.${s.slice(-k)}`;
        return (neg ? '-' : '') + s;
      }
    }
    return null;
  }
  m() { return `$${this.tex()}$`; }
  toString() { return this.str(); }
}
export function fr(x, d = 1n) {
  if (x instanceof Fr) return x;
  if (typeof x === 'number' && !Number.isInteger(x)) throw new Error(`non-integer number ${x}: use fr(n, d) or dec('0.35')`);
  return new Fr(x, d);
}
/** Exact value of a decimal string such as '0.35'. */
export function dec(s) {
  const m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s);
  if (!m) throw new Error(`bad decimal ${s}`);
  const f = m[3] ?? '';
  const v = BigInt(m[2] + f) * (m[1] ? -1n : 1n);
  return new Fr(v, 10n ** BigInt(f.length));
}
export const sumF = (xs) => xs.reduce((s, x) => s.add(x), new Fr(0));
export const must = (c, m) => { if (!c) throw new Error(`probability check failed: ${m}`); };
export const T = (x) => `$${x}$`;
export const F = (n, d = 1) => fr(n, d);
export const mt = (o) => (typeof o === 'string' ? `\\mathrm{${o}}` : Array.isArray(o) ? `(${o.map(mt).join(', ')})` : String(o));
export const setTex = (os, f = mt) => (os.length ? `\\{${os.map(f).join(', ')}\\}` : '\\varnothing');

// ---------------------------------------------------------------- counting
export function choose(n, k) {
  if (k < 0 || k > n) return 0;
  let v = 1n;
  for (let i = 1; i <= k; i++) v = (v * BigInt(n - k + i)) / BigInt(i);
  return Number(v);
}
export const cart = (...lists) => lists.reduce((acc, l) => acc.flatMap((a) => l.map((x) => [...a, x])), [[]]);
/** Subsets of size k of a list (every choice once, order ignored). */
export function subsets(list, k) {
  if (k === 0) return [[]];
  if (list.length < k) return [];
  const [h, ...t] = list;
  return [...subsets(t, k - 1).map((s) => [h, ...s]), ...subsets(t, k)];
}
/** Ordered selections of k different items. */
export function arrangements(list, k) {
  if (k === 0) return [[]];
  return list.flatMap((x, i) => arrangements([...list.slice(0, i), ...list.slice(i + 1)], k - 1).map((s) => [x, ...s]));
}
const key = (o) => JSON.stringify(o);

// ---------------------------------------------------------------- sample spaces
export class Space {
  /** outs: outcomes (numbers, strings or arrays); w: optional exact weights (default equally likely). */
  constructor(outs, w = null) {
    this.outs = outs;
    must(new Set(outs.map(key)).size === outs.length, 'duplicate outcomes');
    this.w = w ? w.map(fr) : outs.map(() => fr(1, outs.length));
    must(this.w.length === outs.length && this.w.every((x) => x.sign() >= 0) && sumF(this.w).eq(1), 'weights must be non-negative and sum to 1');
  }
  get n() { return this.outs.length; }
  ev(pred) { return this.outs.filter(pred); }
  cnt(pred) { return this.ev(pred).length; }
  P(pred) { return sumF(this.outs.map((o, i) => (pred(o) ? this.w[i] : fr(0)))); }
  /** The event given as a list of outcomes (each must belong to the space). */
  of(list) { const ks = new Set(list.map(key)); must(list.every((o) => this.outs.some((x) => key(x) === key(o))), 'event outside the space'); return (o) => ks.has(key(o)); }
}
/** Test of the two probability rules on the events A and B (predicates) of the space S: returns an object of exact values. */
export function addOK(S, A, B) {
  const pa = S.P(A), pb = S.P(B), pab = S.P((o) => A(o) && B(o)), pu = S.P((o) => A(o) || B(o));
  const ok = pu.eq(pa.add(pb).sub(pab)) && S.P((o) => !A(o)).eq(fr(1).sub(pa)) && S.P((o) => A(o) && !B(o)).eq(pa.sub(pab)) && S.P((o) => !A(o) && !B(o)).eq(fr(1).sub(pu));
  return { pa, pb, pab, pu, ok, only: S.P((o) => A(o) && !B(o)), neither: S.P((o) => !A(o) && !B(o)), exactlyOne: S.P((o) => A(o) !== B(o)), pnotA: S.P((o) => !A(o)) };
}
/** Three-event inclusion-exclusion against direct counting. */
export function addOK3(S, A, B, C) {
  const p = (f) => S.P(f);
  const lhs = p((o) => A(o) || B(o) || C(o));
  const rhs = p(A).add(p(B)).add(p(C)).sub(p((o) => A(o) && B(o))).sub(p((o) => A(o) && C(o))).sub(p((o) => B(o) && C(o))).add(p((o) => A(o) && B(o) && C(o)));
  return { lhs, ok: lhs.eq(rhs) };
}
export const mutuallyExclusive = (S, A, B) => S.cnt((o) => A(o) && B(o)) === 0;
export const exhaustive = (S, ...Es) => S.cnt((o) => !Es.some((E) => E(o))) === 0;
/** Valid assignment of probabilities to the outcomes: all in [0, 1] and summing to 1; returns the first rule broken. */
export function assignVerdict(ws) {
  const w = ws.map(fr), total = sumF(w);
  if (w.some((x) => x.sign() < 0)) return { ok: false, why: 'negative', total };
  if (w.some((x) => fr(1).lt(x))) return { ok: false, why: 'above 1', total };
  if (!total.eq(1)) return { ok: false, why: 'total', total };
  return { ok: true, why: 'valid', total };
}

// ---------------------------------------------------------------- the chapter's experiments
export const coinSeq = (n) => cart(...Array.from({ length: n }, () => ['H', 'T'])).map((a) => a.join(''));
export const COIN3 = new Space(coinSeq(3));
export const COIN4 = new Space(coinSeq(4));
export const TETRA2 = new Space(cart([1, 2, 3, 4], [1, 2, 3, 4]));
/** Two-digit numbers written with two different digits from 1, 2, 3, 4. */
export const DIG = new Space(cart([1, 2, 3, 4], [1, 2, 3, 4]).filter(([a, b]) => a !== b).map(([a, b]) => 10 * a + b));
export const tiles = (a, b) => new Space(range(a, b));
/** The 12 cards of an imagined board game. */
export const CARDS = [['c1', 'Red', 'star'], ['c2', 'Red', 'star'], ['c3', 'Red', 'moon'], ['c4', 'Blue', 'star'], ['c5', 'Blue', 'moon'], ['c6', 'Blue', 'moon'], ['c7', 'Blue', 'sun'], ['c8', 'Green', 'star'], ['c9', 'Green', 'sun'], ['c10', 'Green', 'sun'], ['c11', 'Yellow', 'moon'], ['c12', 'Yellow', 'sun']];
export const CARDSP = new Space(CARDS.map((c) => c[0]));
export const cardOf = (id) => CARDS.find((c) => c[0] === id);
export const isPrime = (n) => n > 1 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);
