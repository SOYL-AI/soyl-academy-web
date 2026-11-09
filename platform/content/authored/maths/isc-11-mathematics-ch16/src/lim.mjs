// Helpers for ISC 11 Mathematics ch16 Limits: exact rational arithmetic (BigInt fractions), polynomials, exact limits of
// rational functions at a point and at infinity, and numeric two-sided approach (evaluating at a - h and a + h for small h).
const gcdB = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };

export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcdB(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  add(o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = F(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
  isZero() { return this.n === 0n; }
  sign() { return this.n === 0n ? 0 : this.n > 0n ? 1 : -1; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  tex() { const s = this.n < 0n ? '-' : ''; const a = this.n < 0n ? -this.n : this.n; return this.d === 1n ? `${s}${a}` : `${s}\\dfrac{${a}}{${this.d}}`; }
}
export const F = (x, d) => (x instanceof Fr ? x : new Fr(x, d ?? 1n));
export const fr = F;
/** Integer power of a fraction. */
export const fpow = (x, k) => { let v = F(1); for (let i = 0; i < Math.abs(k); i++) v = v.mul(x); return k < 0 ? F(1).div(v) : v; };

// polynomials: arrays of Fr, highest power first
export const P = (...c) => c.map((v) => F(v));
export const pEval = (p, x) => p.reduce((s, c) => s.mul(x).add(c), F(0));
/** Synthetic division by (x - a): quotient and remainder. */
export function pDiv(p, a) {
  a = F(a);
  const q = [];
  let carry = F(0);
  for (const c of p) { carry = carry.mul(a).add(c); q.push(carry); }
  const rem = q.pop();
  return { q, rem };
}
export const pMul = (p, q) => { const out = Array(p.length + q.length - 1).fill(null).map(() => F(0)); p.forEach((u, i) => q.forEach((v, j) => { out[i + j] = out[i + j].add(u.mul(v)); })); return out; };
export const pDeg = (p) => p.length - 1;

/** Exact limit of num/den at x -> a (both polynomials) by cancelling common factors (x - a); null if not finite. */
export function ratLim(num, den, a) {
  let n = num.map(F), d = den.map(F);
  a = F(a);
  for (let i = 0; i < 30; i++) {
    const nv = pEval(n, a), dv = pEval(d, a);
    if (!dv.isZero()) return nv.div(dv);
    if (!nv.isZero()) return null;
    n = pDiv(n, a).q; d = pDiv(d, a).q;
  }
  return null;
}
/** Exact limit of num/den as x -> +infinity (dir = 1) or -infinity (dir = -1); null if it is infinite. */
export function ratInf(num, den, dir = 1) {
  const strip = (p) => { let i = 0; while (i < p.length - 1 && p[i].isZero()) i++; return p.slice(i); };
  const n = strip(num.map(F)), d = strip(den.map(F));
  if (pDeg(n) < pDeg(d)) return F(0);
  if (pDeg(n) === pDeg(d)) return n[0].div(d[0]);
  return null;
}

// ------------------------------------------------------------------ numeric approach
export const HS = [1e-4, 1e-5, 1e-6];
const within = (v, L, tol) => Number.isFinite(v) && Math.abs(v - L) <= tol * Math.max(1, Math.abs(L));
/** Values of g at a - h and a + h for each h. */
export const sides = (g, a, hs = HS) => ({ left: hs.map((h) => g(a - h)), right: hs.map((h) => g(a + h)) });
/** True if g(a - h) and/or g(a + h) are all within a relative tolerance of L for every h (side: both | left | right). */
export function near(g, a, L, { side = 'both', tol = 2e-3, hs = HS } = {}) {
  const s = sides(g, a, hs);
  const vals = side === 'left' ? s.left : side === 'right' ? s.right : [...s.left, ...s.right];
  return vals.every((v) => within(v, L, tol));
}
/** The limit does not exist: the two sides approach different finite values, or one side is unbounded. */
export function noLimit(g, a, hs = HS) {
  const s = sides(g, a, hs);
  const lim = (arr) => (arr.every((v) => Number.isFinite(v)) && Math.abs(arr[arr.length - 1] - arr[arr.length - 2]) < 1e-2 * Math.max(1, Math.abs(arr[arr.length - 1])) ? arr[arr.length - 1] : null);
  const l = lim(s.left), r = lim(s.right);
  if (l === null || r === null) return s.left.concat(s.right).some((v) => !Number.isFinite(v) || Math.abs(v) > 1e3);
  return Math.abs(l - r) > 1e-2;
}
/** One-sided values rounded for tables. */
export const approach = (g, a, side, hs = HS) => (side === 'left' ? sides(g, a, hs).left : sides(g, a, hs).right);
/** g(x) near L for x = +-1e4, 1e6, 1e8 (dir = 1 or -1). */
export function nearInf(g, L, dir = 1, tol = 2e-3) {
  return [1e4, 1e6, 1e8].every((x) => within(g(dir * x), L, tol));
}
/** Display of a decimal without trailing zeros. */
export const dec = (v, k = 4) => String(+v.toFixed(k));
export const T = (s) => `$${s}$`;
export const limTex = (a, body) => String.raw`\displaystyle\lim_{x \to ${a}} ${body}`;
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
