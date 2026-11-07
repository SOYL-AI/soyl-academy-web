// Exact and floating-point trigonometry helpers for CBSE 11 Mathematics ch03 Trigonometric Functions.
// - Elements of Q(sqrt2, sqrt3) are [a, b, c, d] = a + b*sqrt2 + c*sqrt3 + d*sqrt6 with rational parts (small integers, Number).
//   sin, cos, tan of every multiple of 15 degrees live in this field, so identities can be tested EXACTLY at those angles.
// - Floating-point sampling grids test every identity at many other angles (all four quadrants).
// - Radian helpers (reduced fractions of pi) and tex printers keep every printed value computed, never typed.
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ---------------------------------------------------------------- rationals
export class Fr {
  constructor(n, d = 1) {
    if (d === 0) throw new Error('zero denominator');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g; this.d = d / g;
  }
  add(o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = F(o); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
  get v() { return this.n / this.d; }
  tex() { return this.d === 1 ? `${this.n}` : this.n < 0 ? `-\\dfrac{${-this.n}}{${this.d}}` : `\\dfrac{${this.n}}{${this.d}}`; }
  plain() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
}
export const F = (x) => (x instanceof Fr ? x : new Fr(x, 1));
export const fr = (n, d = 1) => new Fr(n, d);

// ---------------------------------------------------------------- the field Q(sqrt2, sqrt3)
export const el = (a = 0, b = 0, c = 0, d = 0) => [F(a), F(b), F(c), F(d)];
const E = (x) => (Array.isArray(x) ? x : el(x));
export const add = (x, y) => { x = E(x); y = E(y); return x.map((v, i) => v.add(y[i])); };
export const sub = (x, y) => { x = E(x); y = E(y); return x.map((v, i) => v.sub(y[i])); };
export const neg = (x) => E(x).map((v) => v.neg());
export function mul(x, y) {
  const [a1, b1, c1, d1] = E(x), [a2, b2, c2, d2] = E(y);
  return [
    a1.mul(a2).add(b1.mul(b2).mul(2)).add(c1.mul(c2).mul(3)).add(d1.mul(d2).mul(6)),
    a1.mul(b2).add(b1.mul(a2)).add(c1.mul(d2).add(d1.mul(c2)).mul(3)),
    a1.mul(c2).add(c1.mul(a2)).add(b1.mul(d2).add(d1.mul(b2)).mul(2)),
    a1.mul(d2).add(d1.mul(a2)).add(b1.mul(c2)).add(c1.mul(b2)),
  ];
}
const c1 = ([a, b, c, d]) => [a, b.neg(), c, d.neg()]; // sqrt2 -> -sqrt2
const c2 = ([a, b, c, d]) => [a, b, c.neg(), d.neg()]; // sqrt3 -> -sqrt3
export const isZero = (x) => E(x).every((v) => v.n === 0);
export function inv(x) {
  x = E(x);
  if (isZero(x)) throw new Error('division by zero');
  const others = mul(mul(c1(x), c2(x)), c2(c1(x)));
  const N = mul(x, others);
  if (!N.slice(1).every((v) => v.n === 0)) throw new Error('norm not rational');
  return others.map((v) => v.div(N[0]));
}
export const div = (x, y) => mul(x, inv(y));
export const pow = (x, k) => { let o = el(1); for (let i = 0; i < k; i++) o = mul(o, x); return o; };
export const eq = (x, y) => isZero(sub(x, y));
export const val = (x) => { const [a, b, c, d] = E(x).map((v) => v.v); return a + b * Math.SQRT2 + c * Math.sqrt(3) + d * Math.sqrt(6); };
/** LaTeX: single \dfrac with the common denominator, sign pulled out of the fraction, positive terms first. */
export function tx(x) {
  x = E(x);
  if (isZero(x)) return '0';
  const rat = x.slice(1).every((v) => v.n === 0);
  if (rat) return x[0].tex();
  let D = 1;
  for (const v of x) D = (D * v.d) / gcd(D, v.d);
  const co = x.map((v) => (v.n * D) / v.d);
  let g = D;
  for (const c of co) g = gcd(g, c);
  const names = ['', '\\sqrt{2}', '\\sqrt{3}', '\\sqrt{6}'];
  let terms = co.map((c, i) => [c / g, names[i]]).filter(([c]) => c !== 0);
  const Dn = D / g;
  let sign = '';
  if (terms.every(([c]) => c < 0) && (Dn > 1 || terms.length === 1)) { sign = '-'; terms = terms.map(([c, n]) => [-c, n]); }
  else if (terms[0][0] < 0) terms = [...terms.filter(([c]) => c > 0), ...terms.filter(([c]) => c < 0)];
  let s = '';
  terms.forEach(([c, n], i) => {
    const mag = Math.abs(c);
    const body = n === '' ? `${mag}` : mag === 1 ? n : `${mag}${n}`;
    s += i === 0 ? (c < 0 ? `-${body}` : body) : c < 0 ? ` - ${body}` : ` + ${body}`;
  });
  return Dn === 1 ? `${sign}${s}` : `${sign}\\dfrac{${s}}{${Dn}}`;
}

// ---------------------------------------------------------------- exact sin, cos, tan at multiples of 15 degrees
const S1 = el(0, fr(-1, 4), 0, fr(1, 4)); // sin 15 = (sqrt6 - sqrt2)/4
const C1 = el(0, fr(1, 4), 0, fr(1, 4)); // cos 15 = (sqrt6 + sqrt2)/4
const SIN0 = { 0: el(0), 15: S1, 30: el(fr(1, 2)), 45: el(0, fr(1, 2)), 60: el(0, 0, fr(1, 2)), 75: C1, 90: el(1) };
export const norm = (d) => ((d % 360) + 360) % 360;
export function sinD(d) {
  if (d % 15 !== 0) throw new Error(`not a multiple of 15: ${d}`);
  d = norm(d);
  if (d <= 90) return SIN0[d];
  if (d <= 180) return SIN0[180 - d];
  if (d <= 270) return neg(SIN0[d - 180]);
  return neg(SIN0[360 - d]);
}
export const cosD = (d) => sinD(d + 90);
export const tanD = (d) => { const c = cosD(d); if (isZero(c)) throw new Error(`tan undefined at ${d}`); return div(sinD(d), c); };
export const tanDefined = (d) => !isZero(cosD(d));
export const cotD = (d) => div(cosD(d), sinD(d));
export const sinRad = (d) => Math.sin((d * Math.PI) / 180);
export const cosRad = (d) => Math.cos((d * Math.PI) / 180);
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const ALL15 = Array.from({ length: 24 }, (_, k) => 15 * k);

// ---------------------------------------------------------------- radians as fractions of pi
/** degrees -> [p, q] with angle = p/q * pi (reduced, q > 0). */
export function toPi(d) { const g = gcd(d, 180) || 1; return [d / g, 180 / g]; }
/** LaTeX of (p/q) pi, reduced. */
export function piT(p, q = 1) {
  const g = gcd(p, q) || 1; p /= g; q /= g;
  if (q < 0) { p = -p; q = -q; }
  if (p === 0) return '0';
  const sign = p < 0 ? '-' : '';
  const a = Math.abs(p);
  const top = a === 1 ? '\\pi' : `${a}\\pi`;
  return q === 1 ? `${sign}${top}` : `${sign}\\dfrac{${top}}{${q}}`;
}
export const degPi = (d) => piT(...toPi(d));
/** Plain-text pi fraction for narration-free places such as fill-blank answers: 3pi/2. */
export const piPlain = (p, q = 1) => { const g = gcd(p, q) || 1; p /= g; q /= g; return `${p === 1 ? '' : p === -1 ? '-' : p}π${q === 1 ? '' : `/${q}`}`; };

// ---------------------------------------------------------------- sampling grids (floating point)
/** 721 angles from -360 to 360 degrees in steps of 1 (as radians), excluding nothing; callers filter undefined values. */
export const gridRad = Array.from({ length: 1441 }, (_, k) => rad(-360 + k * 0.5));
export const fin = (v) => Number.isFinite(v) && Math.abs(v) < 1e9;
/** Identity test: a(x,y) = b(x,y) at every grid pair where both are finite; requires at least `min` defined pairs. */
export function holds2(a, b, xs = gridRad.filter((_, i) => i % 7 === 0), ys = gridRad.filter((_, i) => i % 11 === 0), min = 100) {
  let n = 0;
  for (const x of xs) for (const y of ys) {
    const u = a(x, y), v = b(x, y);
    if (!fin(u) || !fin(v)) continue;
    if (!near(u, v, 1e-8)) return false;
    n++;
  }
  return n >= min;
}
export function holds1(a, b, xs = gridRad, min = 100) {
  let n = 0;
  for (const x of xs) {
    const u = a(x), v = b(x);
    if (!fin(u) || !fin(v)) continue;
    if (!near(u, v, 1e-8)) return false;
    n++;
  }
  return n >= min;
}
/** Smallest positive period of f among k*pi/d (k, d small), tested on the grid; null if none found up to 8 pi. */
export function period(f, xs = gridRad) {
  const cands = [];
  for (let d = 1; d <= 12; d++) for (let k = 1; k <= 8 * d; k++) cands.push((k * Math.PI) / d);
  cands.sort((a, b) => a - b);
  for (const p of cands) {
    let ok = true, n = 0;
    for (const x of xs) {
      const u = f(x), v = f(x + p);
      if (!fin(u) || !fin(v)) continue;
      if (!near(u, v, 1e-8)) { ok = false; break; }
      n++;
    }
    if (ok && n > 100) return p;
  }
  return null;
}
