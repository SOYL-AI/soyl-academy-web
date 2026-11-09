// Exact arithmetic for ISC 11 Mathematics ch13 (rationals on BigInt, exact square roots and surds, TeX helpers).
// Copied from the ISC 11 ch12 circ.mjs helpers (the Circle class is not needed here).
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
  sign() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  isZero() { return this.n === 0n; }
  abs() { return new Fr(this.n < 0n ? -this.n : this.n, this.d); }
  num() { return Number(this.n) / Number(this.d); }
  str() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  tex() { return this.d === 1n ? `${this.n}` : this.n < 0n ? `-\\dfrac{${-this.n}}{${this.d}}` : `\\dfrac{${this.n}}{${this.d}}`; }
  m() { return `$${this.tex()}$`; }
  toString() { return this.str(); }
}
export function fr(x, d = 1n) {
  if (x instanceof Fr) return x;
  if (typeof x === 'number' && !Number.isInteger(x)) throw new Error(`non-integer number ${x}: use fr(n, d)`);
  return new Fr(x, d);
}
export const sumF = (xs) => xs.reduce((s, x) => s.add(x), new Fr(0));
export const near = (u, v, tol = 1e-9) => Math.abs(u - v) <= tol * Math.max(1, Math.abs(u), Math.abs(v));
const must = (c, m) => { if (!c) throw new Error(`circle check failed: ${m}`); };

// ---------------------------------------------------------------- square roots
function isqrtBig(n) {
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  while (x * x > n) x -= 1n;
  while ((x + 1n) * (x + 1n) <= n) x += 1n;
  return x;
}
/** Exact rational square root, or null when irrational. */
export function sqrtF(x) {
  x = fr(x);
  if (x.sign() < 0) return null;
  const a = isqrtBig(x.n), b = isqrtBig(x.d);
  return a * a === x.n && b * b === x.d ? new Fr(a, b) : null;
}
function squareFree(n) {
  let k = 1n, m = n;
  for (let p = 2n; p * p <= m; p += 1n) while (m % (p * p) === 0n) { m /= p * p; k *= p; }
  return [k, m];
}
export function surdOf(x) {
  x = fr(x);
  must(x.sign() >= 0, 'sqrt of a negative');
  const [kn, mn] = squareFree(x.n), [kd, md] = squareFree(x.d);
  return { coef: new Fr(kn, kd * md), rad: mn * md };
}
/** TeX of sqrt(x) in simplest form: 5, \sqrt{7}, 3\sqrt{2}, \dfrac{\sqrt{7}}{4}. */
export function sqTex(x) {
  const { coef, rad } = surdOf(x);
  if (rad === 1n) return coef.tex();
  if (coef.n === 1n && coef.d === 1n) return `\\sqrt{${rad}}`;
  if (coef.d === 1n) return `${coef.n}\\sqrt{${rad}}`;
  return coef.n === 1n ? `\\dfrac{\\sqrt{${rad}}}{${coef.d}}` : `\\dfrac{${coef.n}\\sqrt{${rad}}}{${coef.d}}`;
}
/** TeX of k * sqrt(x) in simplest form. */
export function kSqTex(k, x) {
  k = fr(k);
  const { coef, rad } = surdOf(x), tot = k.mul(coef);
  if (rad === 1n) return tot.tex();
  const sign = tot.sign() < 0 ? '-' : '', t = tot.abs();
  const nn = t.n === 1n ? '' : String(t.n);
  return t.d === 1n ? `${sign}${nn}\\sqrt{${rad}}` : `${sign}\\dfrac{${nn}\\sqrt{${rad}}}{${t.d}}`;
}

// ---------------------------------------------------------------- TeX helpers
export const pt = (x, y) => `(${fr(x).tex()}, ${fr(y).tex()})`;
/** (x - h)^2 for the variable v: x^2, (x - 3)^2, (x + 4)^2. */
export function sqv(v, h) {
  h = fr(h);
  if (h.isZero()) return `${v}^2`;
  return `(${v} ${h.sign() > 0 ? '-' : '+'} ${h.abs().tex()})^2`;
}
const lin = (c, v) => { c = fr(c); if (c.isZero()) return ''; const t = c.abs().eq(1) ? '' : c.abs().tex(); return ` ${c.sign() < 0 ? '-' : '+'} ${t}${v}`; };
/** x^2 + y^2 + Dx + Ey + F = 0 as TeX. */
export function genTex(D, E, F) {
  F = fr(F);
  return `x^2 + y^2${lin(D, 'x')}${lin(E, 'y')}${F.isZero() ? '' : ` ${F.sign() < 0 ? '-' : '+'} ${F.abs().tex()}`} = 0`;
}

// ---------------------------------------------------------------- geometry
export const P = (x, y) => [fr(x), fr(y)];
export const d2 = ([a, b], [c, d]) => a.sub(c).mul(a.sub(c)).add(b.sub(d).mul(b.sub(d)));
export const mid = ([a, b], [c, d]) => [a.add(c).div(2), b.add(d).div(2)];
/** Solves a1 x + b1 y = c1, a2 x + b2 y = c2 exactly (null when parallel). */
export function solve2(a1, b1, c1, a2, b2, c2) {
  [a1, b1, c1, a2, b2, c2] = [a1, b1, c1, a2, b2, c2].map((x) => fr(x));
  const det = a1.mul(b2).sub(a2.mul(b1));
  if (det.isZero()) return null;
  return [c1.mul(b2).sub(c2.mul(b1)).div(det), a1.mul(c2).sub(a2.mul(c1)).div(det)];
}

