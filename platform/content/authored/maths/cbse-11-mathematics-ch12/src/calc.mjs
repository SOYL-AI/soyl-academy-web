// Exact and numeric helpers for CBSE 11 Mathematics ch12 Limits and Derivatives.
// Exact: BigInt fractions (Fr) and polynomials (Poly) with rational coefficients: limits of rational functions are found by
// cancelling (x - a) factors and then checked again by evaluating the ORIGINAL quotient exactly at a +- 10^-k.
// Numeric: limits approached from both sides with shrinking h, and derivatives by a five-point stencil.
// Raw template that turns a written "\n" (not part of a TeX command such as \neq) into a line break.
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };

export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g;
    this.d = this.n === 0n ? 1n : d / g;
  }
  static of(v) {
    if (v instanceof Fr) return v;
    if (typeof v === 'bigint') return new Fr(v);
    if (typeof v === 'number') { if (!Number.isInteger(v)) throw new Error(`not an integer: ${v}`); return new Fr(BigInt(v)); }
    if (typeof v === 'string') {
      let m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(v.trim());
      if (m) { const f = m[3] ?? ''; return new Fr(BigInt(m[2] + f) * (m[1] ? -1n : 1n), 10n ** BigInt(f.length)); }
      m = /^(-?\d+)\/(\d+)$/.exec(v.trim());
      if (m) return new Fr(BigInt(m[1]), BigInt(m[2]));
    }
    throw new Error(`not exact: ${v}`);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  pow(k) { if (k < 0) return new Fr(1n).div(this).pow(-k); return new Fr(this.n ** BigInt(k), this.d ** BigInt(k)); }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  isZero() { return this.n === 0n; }
  isInt() { return this.d === 1n; }
  num() { return Number(this.n) / Number(this.d); }
  /** Exact decimal text when the denominator is 2^a 5^b, else null. */
  dec() {
    let d = this.d, k = 0;
    while (d % 10n === 0n) { d /= 10n; k++; }
    while (d % 2n === 0n) { d /= 2n; k++; }
    while (d % 5n === 0n) { d /= 5n; k++; }
    if (d !== 1n) return null;
    const scale = 10n ** BigInt(k);
    const v = (this.n * scale) / this.d;
    const neg = v < 0n;
    let s = babs(v).toString().padStart(k + 1, '0');
    if (k) s = `${s.slice(0, -k)}.${s.slice(-k)}`;
    return (neg ? '-' : '') + s;
  }
  /** TeX: -\dfrac{3}{4} or 5. */
  tex() {
    if (this.isInt()) return this.n.toString();
    return `${this.n < 0n ? '-' : ''}\\dfrac{${babs(this.n)}}{${this.d}}`;
  }
}
export const F = (n, d = 1) => new Fr(n, d);

/** Polynomial with Fr coefficients, stored low power first. */
export class Poly {
  constructor(c) {
    this.c = c.map((v) => Fr.of(v));
    while (this.c.length > 1 && this.c[this.c.length - 1].isZero()) this.c.pop();
    if (!this.c.length) this.c = [F(0)];
  }
  get deg() { return this.c.length - 1; }
  eval(x) { x = Fr.of(x); return this.c.reduceRight((acc, k) => acc.mul(x).add(k), F(0)); }
  num(x) { return this.c.reduceRight((acc, k) => acc * x + k.num(), 0); }
  add(o) { const n = Math.max(this.c.length, o.c.length); return new Poly(Array.from({ length: n }, (_, i) => (this.c[i] ?? F(0)).add(o.c[i] ?? F(0)))); }
  sub(o) { return this.add(o.scale(-1)); }
  scale(k) { return new Poly(this.c.map((v) => v.mul(k))); }
  mul(o) { const out = Array.from({ length: this.c.length + o.c.length - 1 }, () => F(0)); this.c.forEach((a, i) => o.c.forEach((b, j) => { out[i + j] = out[i + j].add(a.mul(b)); })); return new Poly(out); }
  pow(k) { let p = new Poly([1]); for (let i = 0; i < k; i++) p = p.mul(this); return p; }
  deriv() { return new Poly(this.c.slice(1).map((v, i) => v.mul(i + 1))); }
  eq(o) { return this.c.length === o.c.length && this.c.every((v, i) => v.eq(o.c[i])); }
  /** Divide by (x - a): { q, rem } by synthetic division. */
  divLin(a) {
    a = Fr.of(a);
    const n = this.deg;
    if (n === 0) return { q: new Poly([0]), rem: this.c[0] };
    const q = Array(n).fill(F(0));
    let carry = F(0);
    for (let i = n; i >= 1; i--) { carry = this.c[i].add(carry.mul(a)); q[i - 1] = carry; }
    return { q: new Poly(q), rem: this.c[0].add(carry.mul(a)) };
  }
  /** P(x + a) as a polynomial in x. */
  shift(a) {
    let out = new Poly([0]);
    const lin = new Poly([a, 1]);
    for (let i = this.c.length - 1; i >= 0; i--) out = out.mul(lin).add(new Poly([this.c[i]]));
    return out;
  }
  /** TeX with descending powers; integer coefficients only. */
  tex(v = 'x') {
    let s = '';
    for (let d = this.deg; d >= 0; d--) {
      const c = this.c[d];
      if (c.isZero()) continue;
      if (!c.isInt()) throw new Error('texPoly needs integer coefficients');
      const a = babs(c.n);
      const pw = d === 0 ? '' : d === 1 ? v : `${v}^${d > 9 ? `{${d}}` : d}`;
      const body = d === 0 ? `${a}` : a === 1n ? pw : `${a}${pw}`;
      s += s ? (c.n < 0n ? ` - ${body}` : ` + ${body}`) : (c.n < 0n ? `-${body}` : body);
    }
    return s || '0';
  }
}
/** P(2, -3, 1) is 2x^2 - 3x + 1 (highest power first). */
export const P = (...hi) => new Poly([...hi].reverse());
export const X = P(1, 0);
export const texFrac = (n, d) => `\\dfrac{${n.tex()}}{${d.tex()}}`;
/** TeX of (x - a) as a factor, e.g. (x + 3). */
export const lin = (a) => (a === 0 ? 'x' : a > 0 ? `(x - ${a})` : `(x + ${-a})`);

/** Limit of N/D at x = a: cancels (x - a) while both vanish. {value: Fr} or {inf: true} when only D vanishes. */
export function limRat(N, D, a) {
  a = Fr.of(a);
  let n = N, d = D, cancelled = 0;
  while (n.eval(a).isZero() && d.eval(a).isZero()) { n = n.divLin(a).q; d = d.divLin(a).q; cancelled++; }
  if (d.eval(a).isZero()) return { inf: true, n, d, cancelled };
  return { value: n.eval(a).div(d.eval(a)), n, d, cancelled };
}
/** Evaluates the ORIGINAL quotient exactly at a +- 10^-k and checks it homes in on L from both sides. */
export function approachExact(N, D, a, L, ks = [2, 3, 4, 5, 6]) {
  a = Fr.of(a);
  let prevL = Infinity, prevR = Infinity;
  for (const k of ks) {
    const h = new Fr(1n, 10n ** BigInt(k));
    for (const side of [-1, 1]) {
      const x = a.add(h.mul(side));
      const v = N.eval(x).div(D.eval(x));
      const err = Math.abs(v.sub(L).num());
      if (err > 40 * h.num()) return false;
      if (side < 0) { if (err > prevL + 1e-15) return false; prevL = err; } else { if (err > prevR + 1e-15) return false; prevR = err; }
    }
  }
  return true;
}

export const near = (a, b, t = 1e-6) => Math.abs(a - b) <= t * Math.max(1, Math.abs(b));
/** Numeric two-sided limit check for g at a against L: the error shrinks with h and is small at h = 1e-4. */
export function numLim(g, a, L, hs = [1e-1, 1e-2, 1e-3, 1e-4], tol = 2e-3) {
  for (const side of [-1, 1]) {
    let prev = Infinity;
    for (const h of hs) {
      const v = g(a + side * h);
      const err = Math.abs(v - L);
      if (!Number.isFinite(v) || err > prev + 1e-9) return false;
      prev = err;
    }
    if (prev > tol * Math.max(1, Math.abs(L))) return false;
  }
  return true;
}
/** One-sided numeric limit (side = -1 left, +1 right). */
export function sideLim(g, a, side, hs = [1e-3, 1e-4, 1e-5, 1e-6]) {
  const vals = hs.map((h) => g(a + side * h));
  return vals[vals.length - 1];
}
/** Five-point numeric derivative. */
export function dnum(g, x, h = 1e-3) { return (-g(x + 2 * h) + 8 * g(x + h) - 8 * g(x - h) + g(x - 2 * h)) / (12 * h); }
/** g' agrees with the formula dg at every point. */
export function checkDeriv(g, dg, pts, t = 1e-6) { return pts.every((x) => near(dnum(g, x), dg(x), t)); }
/** Which of the option functions equal the target function at all points (indices). */
export function matching(optFns, target, pts, t = 1e-6) { return optFns.map((fn, i) => (pts.every((x) => near(fn(x), target(x), t)) ? i : -1)).filter((i) => i >= 0); }

/** First principles for a polynomial: (f(x0 + h) - f(x0))/h is exactly a polynomial in h whose constant term is f'(x0). */
export function fpPoly(f, x0) {
  const sh = f.shift(x0); // f(x0 + h) in h
  const q = new Poly(sh.c.slice(1)); // (f(x0 + h) - f(x0))/h
  const d = q.c[0];
  const ok = d.eq(f.deriv().eval(x0));
  const checks = [F(1), F(1, 2), F(1, 10), F(-1, 100)].every((h) => f.eval(Fr.of(x0).add(h)).sub(f.eval(x0)).div(h).eq(q.eval(h)));
  return { ok: ok && checks, value: d, quotient: q };
}
/** Fixed decimal text of a number (up to 6 places, no trailing zeros). */
export const dec = (v) => String(+Number(v).toFixed(6));
export const fmt = dec;
