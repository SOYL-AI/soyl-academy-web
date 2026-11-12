// Exact arithmetic for ISC 11 Mathematics ch12 Circles.
// Every centre, radius, equation, intercept and contact point is computed from the givens twice: by the closed formula on exact
// rationals (BigInt fractions, radii kept as exact surds), and by testing the points themselves (squared distances, substitution,
// dense floating-point sampling of the circle). Distances between centres are compared with the radii by exact squares.
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

export class Circle {
  constructor(h, k, r2) { this.h = fr(h); this.k = fr(k); this.r2 = fr(r2); must(this.r2.sign() > 0, 'circle needs r^2 > 0'); }
  static general(D, E, F) { const h = fr(D).div(-2), k = fr(E).div(-2); return new Circle(h, k, h.mul(h).add(k.mul(k)).sub(F)); }
  /** From the coefficients of a x^2 + a y^2 + b x + c y + e = 0 (a not 1). */
  static scaled(a, b, c, e) { return Circle.general(fr(b).div(a), fr(c).div(a), fr(e).div(a)); }
  static diameter(p1, p2) { const a = P(...p1), b = P(...p2), m = mid(a, b); const o = new Circle(m[0], m[1], d2(m, a)); must(o.on(p1) && o.on(p2), 'diameter ends on the circle'); return o; }
  static centreThrough(c, p) { return new Circle(c[0], c[1], d2(P(...c), P(...p))); }
  /** Through three points: solve x^2 + y^2 + Dx + Ey + F = 0 exactly by elimination. */
  static three(p1, p2, p3) {
    const pts = [p1, p2, p3].map((p) => P(...p));
    const M = pts.map(([x, y]) => [x, y, fr(1), x.mul(x).add(y.mul(y)).neg()]);
    for (let c = 0; c < 3; c++) {
      let piv = c; while (piv < 3 && M[piv][c].isZero()) piv++;
      must(piv < 3, 'points are collinear');
      [M[c], M[piv]] = [M[piv], M[c]];
      for (let rr = 0; rr < 3; rr++) if (rr !== c) { const f = M[rr][c].div(M[c][c]); M[rr] = M[rr].map((v, j) => v.sub(f.mul(M[c][j]))); }
    }
    const [D, E, F] = M.map((row, i) => row[3].div(row[i]));
    const o = Circle.general(D, E, F);
    for (const p of pts) must(o.on(p), 'through the three points');
    return o;
  }
  get D() { return this.h.mul(-2); }
  get E() { return this.k.mul(-2); }
  get F() { return this.h.mul(this.h).add(this.k.mul(this.k)).sub(this.r2); }
  get g() { return this.h.neg(); }
  get f() { return this.k.neg(); }
  get rad() { return sqrtF(this.r2); }
  pos(p) { return d2(P(...p), [this.h, this.k]).sub(this.r2).sign(); }
  on(p) { return this.pos(p) === 0; }
  std() { return `${sqv('x', this.h)} + ${sqv('y', this.k)} = ${this.r2.tex()}`; }
  gen() { return genTex(this.D, this.E, this.F); }
  cen() { return pt(this.h, this.k); }
  radTex() { return sqTex(this.r2); }
  /** Points where the circle meets y = 0: x^2 + Dx + F = 0. disc = D^2 - 4F. */
  xCut() { const disc = this.D.mul(this.D).sub(this.F.mul(4)); const s = disc.sign() >= 0 ? sqrtF(disc) : null; return { disc, roots: s ? [this.D.neg().sub(s).div(2), this.D.neg().add(s).div(2)] : null, lenTex: disc.sign() > 0 ? sqTex(disc) : '0' }; }
  /** Points where the circle meets x = 0: y^2 + Ey + F = 0. */
  yCut() { const disc = this.E.mul(this.E).sub(this.F.mul(4)); const s = disc.sign() >= 0 ? sqrtF(disc) : null; return { disc, roots: s ? [this.E.neg().sub(s).div(2), this.E.neg().add(s).div(2)] : null, lenTex: disc.sign() > 0 ? sqTex(disc) : '0' }; }
  /** Float check: points (h + r cos t, k + r sin t) satisfy both the standard and the general equation. */
  verify() {
    const R = Math.sqrt(this.r2.num()), h = this.h.num(), k = this.k.num(), D = this.D.num(), E = this.E.num(), F = this.F.num();
    for (let i = 0; i < 720; i++) {
      const t = (i * Math.PI) / 360, x = h + R * Math.cos(t), y = k + R * Math.sin(t);
      must(near((x - h) ** 2 + (y - k) ** 2, R * R), 'standard form sampling');
      must(Math.abs(x * x + y * y + D * x + E * y + F) < 1e-8 * Math.max(1, R * R), 'general form sampling');
    }
    return true;
  }
}

/** Relative position of two circles by exact squares: apart | external | cross | internal | inside | same. */
export function relPos(c1, c2) {
  const dd = d2([c1.h, c1.k], [c2.h, c2.k]);
  if (dd.isZero() && c1.r2.eq(c2.r2)) return 'same';
  const t = dd.sub(c1.r2).sub(c2.r2), four = c1.r2.mul(c2.r2).mul(4), t2 = t.mul(t);
  if (t.sign() > 0 && four.lt(t2)) return 'apart';
  if (t.sign() > 0 && t2.eq(four)) return 'external';
  if (t.sign() < 0 && four.lt(t2)) return 'inside';
  if (t.sign() < 0 && t2.eq(four)) return 'internal';
  return 'cross';
}
/** The same classification from the numbers d, r1 + r2, |r1 - r2| (all rational), as a second route. */
export function relPosByRadii(c1, c2) {
  const dd = sqrtF(d2([c1.h, c1.k], [c2.h, c2.k])), a = c1.rad, b = c2.rad;
  if (!dd || !a || !b) return null;
  const s = a.add(b), df = a.sub(b).abs();
  if (dd.isZero() && df.isZero()) return 'same';
  if (s.lt(dd)) return 'apart';
  if (dd.eq(s)) return 'external';
  if (dd.lt(df)) return 'inside';
  if (dd.eq(df)) return 'internal';
  return 'cross';
}
/** Point of contact of two touching circles (rational radii): C1 + (r1 / (r1 + r2)) (C2 - C1) externally, C1 + (r1 / (r1 - r2)) (C2 - C1) internally. */
export function contact(c1, c2) {
  const kind = relPos(c1, c2), a = c1.rad, b = c2.rad;
  must(kind === 'external' || kind === 'internal', 'the circles touch');
  must(a && b, 'rational radii');
  const t = kind === 'external' ? a.div(a.add(b)) : a.div(a.sub(b));
  const p = [c1.h.add(t.mul(c2.h.sub(c1.h))), c1.k.add(t.mul(c2.k.sub(c1.k)))];
  must(c1.on(p) && c2.on(p), 'the contact point lies on both circles');
  return p;
}
export const dist2 = (c1, c2) => d2([c1.h, c1.k], [c2.h, c2.k]);

// ---------------------------------------------------------------- plots
const numStr = (x) => String(+fr(x).num().toFixed(6));
/** Upper and lower halves of a circle as plot functions, each with its domain. */
export function halves(c, label = true) {
  const R = Math.sqrt(c.r2.num()), h = c.h.num();
  const exact = c.rad && c.h.d === 1n;
  const lo = exact ? h - R : +(h - R + 1e-4).toFixed(4), hi = exact ? h + R : +(h + R - 1e-4).toFixed(4);
  const xs = c.h.isZero() ? 'x' : c.h.sign() > 0 ? `(x-${numStr(c.h)})` : `(x+${numStr(c.h.abs())})`;
  const kk = c.k.isZero() ? '' : numStr(c.k);
  const body = `sqrt(${numStr(c.r2)}-${xs}^2)`;
  const up = kk ? `${kk}+${body}` : body, dn = kk ? `${kk}-${body}` : `-${body}`;
  return [{ expr: up, ...(label ? { label: 'upper half' } : {}), domain: [lo, hi] }, { expr: dn, ...(label ? { label: 'lower half' } : {}), domain: [lo, hi] }];
}
/** The marked point (x, y) as a plot point: on the upper or lower half as appropriate (exact check by the circle). */
export function onCircle(c, x, y, label) {
  must(c.on([fr(x), fr(y)]), `point (${x}, ${y}) lies on the circle`);
  return label === undefined ? [Number(x.num ? x.num() : x), Number(y.num ? y.num() : y)] : [Number(x.num ? x.num() : x), Number(y.num ? y.num() : y), label];
}
