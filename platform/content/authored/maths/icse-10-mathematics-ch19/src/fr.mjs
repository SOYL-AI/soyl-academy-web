// Exact fractions for ICSE 10 Mathematics ch13 Equation of a Straight Line (copied from ch11's refl.mjs, which
// copied it from ch09's ap.mjs). Every slope, intercept, equation coefficient and meeting point in this chapter
// is computed with these, never with floating point.

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
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => new Fr(n, d);
export { gcd };
