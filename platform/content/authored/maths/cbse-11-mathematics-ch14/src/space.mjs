// Exact probability helpers for CBSE 11 Mathematics ch14 Probability (events as sets, the axiomatic approach).
// Every probability in a key, a slide, a note or a table is a ratio of integers obtained by enumerating a sample
// space in code (equally likely outcomes) or by adding exact fractions (weighted outcomes). Nothing is a rounded float.
import { geom } from './lib.mjs';

/** String.raw, except that a backslash-n not followed by a lower-case letter becomes a newline. */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const safe = (n) => { if (!Number.isSafeInteger(n)) throw new Error(`unsafe integer ${n}`); return n; };

/** Exact fraction n/d (integers only). */
export class Fr {
  constructor(n, d = 1) {
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const k = gcd(n, d) || 1;
    this.n = safe(n / k);
    this.d = safe(d / k);
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); return new Fr(this.n * o.d, this.d * o.n); }
  comp() { return new Fr(this.d - this.n, this.d); }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  le(o) { o = fr(o); return this.n * o.d <= o.n * this.d; }
  get v() { return this.n / this.d; }
  /** Terminating decimal string, or throws. */
  dec() {
    let d = this.d;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    if (d !== 1) throw new Error(`non-terminating ${this}`);
    return String(+this.v.toFixed(9));
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
  /** \dfrac{n}{d} (or the integer). */
  tex() { return this.d === 1 ? `${this.n}` : `\\dfrac{${this.n}}{${this.d}}`; }
  /** Inline maths: $\dfrac{n}{d}$. */
  m() { return `$${this.tex()}$`; }
}
export function fr(n, d = 1) {
  if (n instanceof Fr) return n;
  if (typeof n === 'string') {
    if (n.includes('/')) { const [a, b] = n.split('/').map(Number); return new Fr(a, b); }
    if (n.includes('.')) { const k = n.split('.')[1].length; return new Fr(Math.round(Number(n) * 10 ** k), 10 ** k); }
    return new Fr(Number(n), d);
  }
  if (!Number.isInteger(n)) throw new Error('pass decimals as strings');
  return new Fr(n, d);
}
export const sum = (xs) => xs.reduce((a, b) => a.add(b), new Fr(0));
export const T = (s) => `$${s}$`;

// ---------------------------------------------------------------- sample spaces (outcomes are values; events are arrays of the same values)
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const cart = (...lists) => lists.reduce((acc, l) => acc.flatMap((x) => l.map((y) => [...x, y])), [[]]);
/** Ordered k-tuples of distinct positions of items (selection without replacement, order matters). */
export function arr(items, k) {
  const out = [];
  const rec = (used, cur) => {
    if (cur.length === k) { out.push(cur.slice()); return; }
    items.forEach((it, i) => { if (!used.has(i)) { used.add(i); cur.push(it); rec(used, cur); cur.pop(); used.delete(i); } });
  };
  rec(new Set(), []);
  return out;
}
/** Unordered k-subsets (combinations) of items. */
export function comb(items, k) {
  const out = [];
  const rec = (start, cur) => {
    if (cur.length === k) { out.push(cur.slice()); return; }
    for (let i = start; i < items.length; i++) { cur.push(items[i]); rec(i + 1, cur); cur.pop(); }
  };
  rec(0, []);
  return out;
}
/** All subsets of a list (events of a sample space). */
export const subsets = (items) => items.reduce((acc, x) => acc.concat(acc.map((s) => [...s, x])), [[]]);
export const dice2 = cart(range(1, 6), range(1, 6)).map(([a, b]) => ({ a, b, k: `(${a}, ${b})` }));
export const tosses = (n) => cart(...Array.from({ length: n }, () => ['H', 'T'])).map((c) => c.join(''));
export const isPrime = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
export const isSquare = (n) => Number.isInteger(Math.sqrt(n));

// ---------------------------------------------------------------- events as sets
export const ev = (S, A) => S.filter(A);
export const inA = (E, o) => E.includes(o);
export const uni = (S, A, B) => S.filter((o) => A.includes(o) || B.includes(o));
export const inter = (S, A, B) => S.filter((o) => A.includes(o) && B.includes(o));
export const diff = (S, A, B) => S.filter((o) => A.includes(o) && !B.includes(o));
export const comp = (S, A) => S.filter((o) => !A.includes(o));
export const exclusive = (S, A, B) => inter(S, A, B).length === 0;
export const exhaustive = (S, A, B) => uni(S, A, B).length === S.length;
/** Probability of an event on a sample space of equally likely outcomes. */
export const P = (S, E) => new Fr(E.length, S.length);
/** Weighted outcomes: probability of an event is the sum of its elementary probabilities. */
export const WP = (w, E) => sum(E.map((o) => fr(w[o])));
export const wTotal = (w) => sum(Object.values(w).map((x) => fr(x)));

/**
 * Checks, on one instance, everything the chapter states about two events A and B (equally likely space S):
 * the addition theorem, the complement rule, A minus B, neither, exactly one, and the exclusive / exhaustive tests.
 * Returns the exact probabilities.
 */
export function laws(S, A, B) {
  const pa = P(S, A), pb = P(S, B), pi = P(S, inter(S, A, B)), pu = P(S, uni(S, A, B));
  if (!pu.eq(pa.add(pb).sub(pi))) throw new Error('addition theorem fails');
  if (!P(S, comp(S, A)).eq(pa.comp())) throw new Error('complement rule fails');
  if (!P(S, diff(S, A, B)).eq(pa.sub(pi))) throw new Error('A minus B fails');
  const nei = P(S, S.filter((o) => !A.includes(o) && !B.includes(o)));
  if (!nei.eq(pu.comp())) throw new Error('neither fails');
  if (!P(S, comp(S, uni(S, A, B))).eq(nei)) throw new Error('De Morgan fails');
  const one = P(S, S.filter((o) => A.includes(o) !== B.includes(o)));
  if (!one.eq(pu.sub(pi))) throw new Error('exactly one fails');
  if (exclusive(S, A, B) !== pi.eq(0)) throw new Error('exclusive test fails');
  return { pa, pb, pi, pu, nei, one, pab: pa.sub(pi), pba: pb.sub(pi) };
}

/** Set-builder style listing for maths: \{1, 2, 3\} from a list, with an optional formatter. */
export const setTex = (E, f = (x) => String(x)) => (E.length ? String.raw`\{` + E.map(f).join(', ') + String.raw`\}` : String.raw`\varnothing`);
export const txt = (s) => String.raw`\text{${s}}`;

/** Options for an MCQ: typed values (Fr, number, or string) and the target; the key is the single option equal to it. */
export function pick(vals, target, show) {
  const v = (x) => (x instanceof Fr ? x.v : x);
  const eq = (a, b) => (typeof a === 'string' || typeof b === 'string' ? a === b : Math.abs(v(a) - v(b)) < 1e-9);
  const hits = vals.map((x, i) => (eq(x, target) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error(`options ${vals.map(String)} do not single out ${target}`);
  const labels = vals.map((x) => (show ? show(x) : x instanceof Fr ? x.m() : T(String(x))));
  return { key: 'abcd'[hits[0]], opts: labels, vals: vals.map(v) };
}

// ---------------------------------------------------------------- figures
const round = (x) => Math.round(x * 1000) / 1000;

/** Two overlapping circles in a rectangle; region labels (short text) for A only, both, B only and outside. */
export function venn({ a = 'A', b = 'B', s = 'S', regions = [], alt, caption }) {
  const [ra, rab, rb, ro] = regions;
  const points = {
    S1: { at: [0.3, 0.3], label: false }, S2: { at: [7.7, 0.3], label: false }, S3: { at: [7.7, 4.7], label: false }, S4: { at: [0.3, 4.7], label: false },
    SL: { at: [0.7, 4.3], label: s },
    O1: { at: [3.1, 2.4], label: false }, O2: { at: [4.9, 2.4], label: false },
    LA: { at: [1.9, 4.1], label: a }, LB: { at: [6.1, 4.1], label: b },
    M: { at: [4, 2.4], label: false },
  };
  if (ra) points.RA = { at: [2.3, 2.4], label: ra };
  if (rab) points.RAB = { at: [4, 2.4], label: rab };
  if (rb) points.RB = { at: [5.7, 2.4], label: rb };
  if (ro) points.RO = { at: [6.9, 0.8], label: ro };
  return geom({
    width: 8, height: 5,
    points,
    polygons: [{ vertices: ['S1', 'S2', 'S3', 'S4'] }],
    circles: [{ center: 'O1', radius: 1.6 }, { center: 'O2', radius: 1.6 }],
    not_to_scale: true,
  }, alt, caption);
}

/** Sample space split into n vertical strips (mutually exclusive and exhaustive events), with an event A drawn across them. */
export function partition({ labels, alt, caption, event = 'A' }) {
  const n = labels.length;
  const W = 8, H = 4.6;
  const points = {};
  const polygons = [];
  for (let i = 0; i < n; i++) {
    const x0 = round(0.3 + (i * (W - 0.6)) / n), x1 = round(0.3 + ((i + 1) * (W - 0.6)) / n);
    points[`B${i}a`] = { at: [x0, 0.3], label: false };
    points[`B${i}b`] = { at: [x1, 0.3], label: false };
    points[`B${i}c`] = { at: [x1, H - 0.3], label: false };
    points[`B${i}d`] = { at: [x0, H - 0.3], label: false };
    points[`T${i}`] = { at: [round((x0 + x1) / 2), H - 0.7], label: labels[i] };
    polygons.push({ vertices: [`B${i}a`, `B${i}b`, `B${i}c`, `B${i}d`] });
  }
  points.C = { at: [W / 2, 2], label: false };
  points.CL = { at: [W / 2, 2.9], label: event };
  return geom({ width: W, height: H, points, polygons, circles: [{ center: 'C', radius: 1.6 }], not_to_scale: true }, alt, caption);
}
