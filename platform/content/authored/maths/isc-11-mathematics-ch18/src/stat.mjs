// Exact statistics for CBSE 11 Mathematics ch13 Statistics (measures of dispersion).
// Everything is a BigInt rational. Raw data, discrete frequency distributions and grouped (continuous-class)
// distributions share one engine: mean, median, range, mean deviation about any point, and the variance by FOUR
// independent routes (definition, shortcut formula, assumed mean, step deviation) that must agree exactly.
// Square roots are exact when the variance is a rational square, otherwise given to a stated number of decimals
// by integer square root (never by floating point).
import { table } from './lib.mjs';

const big = (x) => BigInt(x);
const babs = (a) => (a < 0n ? -a : a);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
export function isqrt(n) {
  if (n < 0n) throw new Error('isqrt of negative');
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  while (x * x > n) x -= 1n;
  while ((x + 1n) * (x + 1n) <= n) x += 1n;
  return x;
}

export class Fr {
  constructor(n, d = 1n) {
    n = big(n); d = big(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  static of(x) {
    if (x instanceof Fr) return x;
    if (typeof x === 'bigint') return new Fr(x);
    if (typeof x === 'number') {
      if (!Number.isFinite(x)) throw new Error('non-finite');
      const s = String(x);
      if (/e/i.test(s)) throw new Error(`exponent form ${s}`);
      const [a, b = ''] = s.split('.');
      return new Fr(big(a + b), 10n ** big(b.length));
    }
    if (typeof x === 'string') {
      const m = /^(-?\d+)\/(\d+)$/.exec(x);
      if (m) return new Fr(big(m[1]), big(m[2]));
      return Fr.of(Number(x));
    }
    throw new Error(`cannot make a rational from ${x}`);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(babs(this.n), this.d); }
  pow(k) { let v = new Fr(1n); for (let i = 0; i < k; i++) v = v.mul(this); return v; }
  cmp(o) { o = Fr.of(o); const a = this.n * o.d, b = o.n * this.d; return a < b ? -1 : a > b ? 1 : 0; }
  eq(o) { return this.cmp(o) === 0; }
  isInt() { return this.d === 1n; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
  /** Terminating decimal text, or null when the decimal recurs. */
  dec() {
    let d = this.d, k2 = 0, k5 = 0;
    while (d % 2n === 0n) { d /= 2n; k2++; }
    while (d % 5n === 0n) { d /= 5n; k5++; }
    if (d !== 1n) return null;
    const k = Math.max(k2, k5);
    return this.round(k);
  }
  /** Exact decimal text to dp places, rounded half up (away from zero). */
  round(dp) {
    const neg = this.n < 0n;
    const scale = 10n ** big(dp);
    let q = (babs(this.n) * scale * 2n + this.d) / (this.d * 2n);
    let s = String(q).padStart(dp + 1, '0');
    const out = dp ? `${s.slice(0, -dp)}.${s.slice(-dp)}` : s;
    return (neg && q !== 0n ? '-' : '') + out;
  }
  /** Exact square root as a rational, or null if it is irrational. */
  sqrt() {
    if (this.n < 0n) return null;
    const a = isqrt(this.n), b = isqrt(this.d);
    return a * a === this.n && b * b === this.d ? new Fr(a, b) : null;
  }
  /** Square root rounded to dp places (half up), by integer square root. */
  sqrtRound(dp) {
    const e = this.sqrt();
    if (e) return e.round(dp);
    const scale2 = 10n ** big(2 * dp);
    const v = isqrt((this.n * scale2) / this.d); // floor(sqrt(x) * 10^dp)
    // compare (v + 1/2)^2 with x * 10^(2dp): 4 n 10^2dp vs d (2v+1)^2
    const up = 4n * this.n * scale2 >= this.d * (2n * v + 1n) * (2n * v + 1n);
    return new Fr(v + (up ? 1n : 0n), 10n ** big(dp)).round(dp);
  }
}
export const fr = (x) => Fr.of(x);
export const sumOf = (xs) => xs.reduce((s, v) => s.add(v), fr(0));

/** Terminating decimal text ("44.75"); throws for a recurring decimal so a key is never silently rounded. */
export const T = (x) => { const s = fr(x).dec(); if (s === null) throw new Error(`non-terminating ${fr(x)}`); return s; };
/** Plain text with a minus sign as - . */
export const M = (x) => `$${T(x)}$`;
/** Number text, a terminating decimal if possible, otherwise a stated rounding. */
export const Tn = (x, dp = 2) => fr(x).dec() ?? fr(x).round(dp);
/** LaTeX of a rational: integer, terminating decimal, or \dfrac. */
export const tex = (x) => { x = fr(x); const s = x.dec(); if (s !== null) return s; return `${x.n < 0n ? '-' : ''}\\dfrac{${babs(x.n)}}{${x.d}}`; };
export const fmtN = (x) => (typeof x === 'number' ? String(+x.toFixed(6)) : String(x));

/**
 * A distribution: xs (observations or class marks, rationals) with frequencies fs.
 *   Distribution.raw([..])                        every observation once
 *   Distribution.discrete(values, freqs)
 *   Distribution.grouped(lo, h, freqs)            continuous classes lo..lo+h, ... (class marks as x)
 */
export class Dist {
  constructor(xs, fs, { classes = null, h = null, kind = 'discrete' } = {}) {
    this.x = xs.map(fr);
    this.f = fs.map((v) => fr(v));
    this.classes = classes; this.h = h === null ? null : fr(h); this.kind = kind;
    this.n = sumOf(this.f);
    if (this.x.length !== this.f.length) throw new Error('length mismatch');
  }
  static raw(vals) { return new Dist(vals, vals.map(() => 1), { kind: 'raw' }); }
  static discrete(vals, freqs) { return new Dist(vals, freqs, { kind: 'discrete' }); }
  static grouped(lo, h, freqs) {
    const classes = freqs.map((_, i) => [fr(lo).add(fr(h).mul(i)), fr(lo).add(fr(h).mul(i + 1))]);
    const marks = classes.map(([a, b]) => a.add(b).div(2));
    return new Dist(marks, freqs, { classes, h, kind: 'grouped' });
  }
  get count() { return this.x.length; }
  sumF(fn) { return this.x.reduce((s, x, i) => s.add(this.f[i].mul(fn(x, i))), fr(0)); }
  get sumFx() { return this.sumF((x) => x); }
  get mean() { return this.sumFx.div(this.n); }
  get range() {
    if (this.kind === 'grouped') return this.classes[this.count - 1][1].sub(this.classes[0][0]);
    const s = [...this.x].sort((p, q) => p.cmp(q));
    return s[s.length - 1].sub(s[0]);
  }
  cumF() { let a = fr(0); return this.f.map((v) => (a = a.add(v))); }
  /** Median: expanded list for raw/discrete data, the class formula for grouped data. */
  get median() {
    if (this.kind === 'grouped') {
      const cf = this.cumF(), half = this.n.div(2);
      const i = cf.findIndex((c) => c.cmp(half) >= 0);
      const before = i ? cf[i - 1] : fr(0);
      return this.classes[i][0].add(half.sub(before).div(this.f[i]).mul(this.h));
    }
    const list = this.x.flatMap((x, i) => Array(Number(this.f[i].n)).fill(x)).sort((p, q) => p.cmp(q));
    const m = list.length;
    return m % 2 ? list[(m - 1) / 2] : list[m / 2 - 1].add(list[m / 2]).div(2);
  }
  /** Index of the median class (grouped). */
  get medianClass() {
    const half = this.n.div(2);
    return this.cumF().findIndex((c) => c.cmp(half) >= 0);
  }
  /** Mean deviation about a. */
  md(a) { a = fr(a); return this.sumF((x) => x.sub(a).abs()).div(this.n); }
  get mdMean() { return this.md(this.mean); }
  get mdMedian() { return this.md(this.median); }
  /** Variance by the definition. */
  get variance() { const m = this.mean; return this.sumF((x) => x.sub(m).pow(2)).div(this.n); }
  /** Variance by Σfx²/n − mean². */
  get varianceShortcut() { return this.sumF((x) => x.pow(2)).div(this.n).sub(this.mean.pow(2)); }
  /** Variance by the assumed-mean route with deviations d = x − A. */
  varianceAssumed(A) { A = fr(A); const n = this.n; const sd = this.sumF((x) => x.sub(A)), sd2 = this.sumF((x) => x.sub(A).pow(2)); return sd2.div(n).sub(sd.div(n).pow(2)); }
  /** Variance by step deviations u = (x − A)/h: h²[Σfu²/n − (Σfu/n)²]. */
  varianceStep(A, h) { A = fr(A); h = fr(h); const n = this.n; const su = this.sumF((x) => x.sub(A).div(h)), su2 = this.sumF((x) => x.sub(A).div(h).pow(2)); return h.pow(2).mul(su2.div(n).sub(su.div(n).pow(2))); }
  get sd2() { return this.variance; }
  /** Exact SD text if the variance is a rational square, else to dp decimals. */
  sdText(dp = 2) { return this.variance.sqrt() ? T(this.variance.sqrt()) : this.variance.sqrtRound(dp); }
  get sdExact() { return this.variance.sqrt(); }
  /** Coefficient of variation squared, (SD/mean)^2, exact. */
  get cv2() { return this.variance.div(this.mean.pow(2)); }
  /** Coefficient of variation in percent, rounded to dp decimals. */
  cvRound(dp = 1) { return this.cv2.mul(10000).sqrtRound(dp); }
  /** Verify all variance routes and the mean-deviation identities; returns the variance. */
  verify(A, h = 1) {
    const v = this.variance;
    if (!v.eq(this.varianceShortcut)) throw new Error(`shortcut variance ${this.varianceShortcut} vs ${v}`);
    if (A !== undefined) {
      if (!v.eq(this.varianceAssumed(A))) throw new Error('assumed-mean variance disagrees');
      if (!v.eq(this.varianceStep(A, h))) throw new Error('step-deviation variance disagrees');
    }
    // mean deviation about the median never exceeds that about the mean (median minimises sum |x - a|)
    if (this.kind !== 'grouped' && this.mdMedian.cmp(this.mdMean) > 0) throw new Error('MD about median exceeds MD about mean');
    // sum of deviations from the mean is zero
    if (!this.sumF((x) => x.sub(this.mean)).eq(0)) throw new Error('deviations about the mean do not sum to zero');
    // variance is non-negative and zero only for a constant list
    if (v.cmp(0) < 0) throw new Error('negative variance');
    return v;
  }
}

/** Class label text "10–20" for a grouped class. */
export const cls = (d, i) => `${T(d.classes[i][0])}–${T(d.classes[i][1])}`;

// ---------------------------------------------------------------- tables generated from the data
/** Table with columns for a mean-deviation calculation about a (value a, label). Last row = totals. */
export function mdTable(d, a, aLabel = 'a', { lead = null } = {}) {
  const A = fr(a);
  const head = [lead ?? (d.kind === 'grouped' ? 'Class' : '$x$'), ...(d.kind === 'grouped' ? ['Mark $x$'] : []), ...(d.kind === 'raw' ? [] : ['$f$']), ...(d.kind === 'raw' ? [] : ['$fx$']), `$|x - ${aLabel}|$`, ...(d.kind === 'raw' ? [] : [`$f|x - ${aLabel}|$`])];
  const rows = d.x.map((x, i) => {
    const row = [];
    row.push(d.kind === 'grouped' ? cls(d, i) : T(x));
    if (d.kind === 'grouped') row.push(T(x));
    if (d.kind !== 'raw') { row.push(T(d.f[i])); row.push(T(d.f[i].mul(x))); }
    row.push(T(x.sub(A).abs()));
    if (d.kind !== 'raw') row.push(T(d.f[i].mul(x.sub(A).abs())));
    return row;
  });
  const tot = [];
  tot.push('Total');
  if (d.kind === 'grouped') tot.push('');
  if (d.kind !== 'raw') { tot.push(T(d.n)); tot.push(T(d.sumFx)); }
  tot.push(d.kind === 'raw' ? T(d.sumF((x) => x.sub(A).abs())) : '');
  if (d.kind !== 'raw') tot.push(T(d.sumF((x) => x.sub(A).abs())));
  return { head, rows: [...rows, tot] };
}
/** Table for the variance by step deviation: x, f, u = (x - A)/h, fu, fu². */
export function stepTable(d, A, h) {
  A = fr(A); h = fr(h);
  const head = [d.kind === 'grouped' ? 'Class' : '$x$', ...(d.kind === 'grouped' ? ['Mark $x$'] : []), '$f$', '$u = \\dfrac{x - ' + T(A) + '}{' + T(h) + '}$', '$fu$', '$fu^2$'];
  const rows = d.x.map((x, i) => {
    const u = x.sub(A).div(h);
    return [d.kind === 'grouped' ? cls(d, i) : T(x), ...(d.kind === 'grouped' ? [T(x)] : []), T(d.f[i]), T(u), T(d.f[i].mul(u)), T(d.f[i].mul(u.pow(2)))];
  });
  const su = d.sumF((x) => x.sub(A).div(h)), su2 = d.sumF((x) => x.sub(A).div(h).pow(2));
  const tot = ['Total', ...(d.kind === 'grouped' ? [''] : []), T(d.n), '', T(su), T(su2)];
  return { head, rows: [...rows, tot] };
}
export const asTable = ({ head, rows }, alt, caption) => table(head, rows, alt, caption);
/** Frequency-table markdown (header row, then values) for a stem. */
export function freqMd(d, { first = 'Class', second = 'Frequency' } = {}) {
  const lab = d.kind === 'grouped' ? d.x.map((_, i) => cls(d, i)) : d.x.map((x) => T(x));
  const hd = `| ${first} | ${lab.join(' | ')} |`;
  const sep = `|${'---|'.repeat(lab.length + 1)}`;
  const body = `| ${second} | ${d.f.map((v) => T(v)).join(' | ')} |`;
  return `${hd}\n${sep}\n${body}`;
}
/** Comma list of numbers for a stem. */
export const list = (xs) => xs.map((v) => T(v)).join(', ');
