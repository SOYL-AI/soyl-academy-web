// Exact helpers for ISC 11 Mathematics ch10 Sequences and Series.
// Every value has two routes: a closed formula (exact fractions) and an explicit list of terms that is added up term by term.
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const gcd = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b));
/** Exact rational number on BigInt. */
export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const k = gcd(n, d) || 1n;
    this.n = n / k; this.d = d / k;
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  pow(k) { let x = new Fr(1); for (let i = 0; i < Math.abs(k); i++) x = x.mul(this); return k < 0 ? new Fr(1).div(x) : x; }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  lt(o) { o = fr(o); return this.n * o.d < o.n * this.d; }
  abs() { return new Fr(this.n < 0n ? -this.n : this.n, this.d); }
  num() { return Number(this.n) / Number(this.d); }
  isInt() { return this.d === 1n; }
  str() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  /** LaTeX of the value (no dollar signs). */
  tex() { return this.d === 1n ? `${this.n}` : this.n < 0n ? `-\\dfrac{${-this.n}}{${this.d}}` : `\\dfrac{${this.n}}{${this.d}}`; }
  /** Inline maths with dollar signs. */
  m() { return `$${this.tex()}$`; }
}
export function fr(x, d = 1n) {
  if (x instanceof Fr) return x;
  if (typeof x === 'number' && !Number.isInteger(x)) throw new Error(`non-integer number ${x}: use fr(n, d)`);
  return new Fr(x, d);
}
export const sumF = (xs) => xs.reduce((s, x) => s.add(x), new Fr(0));

// ---------------------------------------------------------------- AP
export const apList = (a, d, n) => range(1, n).map((k) => fr(a).add(fr(d).mul(k - 1)));
export const apTerm = (a, d, n) => fr(a).add(fr(d).mul(n - 1));
export const apSum = (a, d, n) => fr(n).mul(fr(a).mul(2).add(fr(d).mul(n - 1))).div(2);
/** AP through two given terms: a_p = u, a_q = v. */
export function apFrom(p, u, q, v) { const d = fr(v).sub(u).div(q - p); return { a: fr(u).sub(d.mul(p - 1)), d }; }
/** The n arithmetic means between a and b, by the common difference (b - a)/(n + 1). */
export const apMeans = (a, b, n) => { const d = fr(b).sub(a).div(n + 1); return range(1, n).map((k) => fr(a).add(d.mul(k))); };

// ---------------------------------------------------------------- GP
export const gpList = (a, q, n) => range(1, n).map((k) => fr(a).mul(fr(q).pow(k - 1)));
export const gpTerm = (a, q, n) => fr(a).mul(fr(q).pow(n - 1));
export const gpSum = (a, q, n) => (fr(q).eq(1) ? fr(a).mul(n) : fr(a).mul(fr(q).pow(n).sub(1)).div(fr(q).sub(1)));
export const gpInf = (a, q) => fr(a).div(fr(1).sub(q));
/** Partial sums S_1, S_2, ... S_n by running addition. */
export const partials = (xs) => { let s = new Fr(0); return xs.map((x) => (s = s.add(x))); };
/** Geometric means between a and b (positive terms): ratio found by search over small rationals, then verified. */
export function gpMeans(a, b, n, ratios) {
  const hits = ratios.map((q) => fr(q)).filter((q) => gpTerm(a, q, n + 2).eq(b));
  return hits.map((q) => ({ q, means: gpList(a, q, n + 2).slice(1, -1) }));
}
/** Recurring decimal 0.p(q) with pre-period p (a digit string) and period q, as an exact fraction by summing the infinite GP. */
export function recurring(pre, per, whole = 0) {
  const k = pre.length, m = per.length;
  const first = fr(BigInt(per), 10n ** BigInt(k + m)); // first repeating block
  const ratio = fr(1, 10n ** BigInt(m));
  const head = k ? fr(BigInt(pre), 10n ** BigInt(k)) : fr(0);
  return fr(whole).add(head).add(gpInf(first, ratio));
}
/** Decimal expansion string (first `digits` digits after the point) of a fraction in [0, 1). */
export function decimals(f, digits) {
  let rem = f.n % f.d, out = '';
  for (let i = 0; i < digits; i++) { rem *= 10n; out += rem / f.d; rem %= f.d; }
  return out;
}

// ---------------------------------------------------------------- special sums (closed forms, BigInt) and listing
export const s1 = (n) => BigInt(n) * BigInt(n + 1) / 2n;
export const s2 = (n) => BigInt(n) * BigInt(n + 1) * BigInt(2 * n + 1) / 6n;
export const s3 = (n) => (BigInt(n) * BigInt(n + 1) / 2n) ** 2n;
export const L1 = (a, b) => range(a, b).reduce((s, k) => s + BigInt(k), 0n);
export const L2 = (a, b) => range(a, b).reduce((s, k) => s + BigInt(k) ** 2n, 0n);
export const L3 = (a, b) => range(a, b).reduce((s, k) => s + BigInt(k) ** 3n, 0n);
export const LS = (n, f) => range(1, n).reduce((s, k) => s + BigInt(f(k)), 0n);
/** First and second differences of a list of BigInt-like numbers. */
export const diffs = (xs) => xs.slice(1).map((x, i) => BigInt(x) - BigInt(xs[i]));
/** Fit a_n = A n^2 + B n + C through the first three terms (exact), and report it. */
export function fitQuad(xs) {
  const [u, v, w] = xs.map((x) => fr(x));
  const A = w.sub(v.mul(2)).add(u).div(2);
  const B = v.sub(u).sub(A.mul(3));
  const C = u.sub(A).sub(B);
  return { A, B, C, at: (n) => A.mul(n * n).add(B.mul(n)).add(C) };
}
export const S = (v) => String(v);
export const N = (v) => Number(v);
/** Signed coefficient text for an expression like 2n^2 - n + 3. */
export function quadTex(A, B, C) {
  const parts = [];
  const term = (c, v) => { c = fr(c); if (c.eq(0)) return; const neg = c.n < 0n; const ab = c.abs(); const body = ab.eq(1) && v ? v : `${ab.tex()}${v}`; parts.push((parts.length ? (neg ? ' - ' : ' + ') : neg ? '-' : '') + body); };
  term(A, 'n^2'); term(B, 'n'); term(C, '');
  return parts.join('');
}
