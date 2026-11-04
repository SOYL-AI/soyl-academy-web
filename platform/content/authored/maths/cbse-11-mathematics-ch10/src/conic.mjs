// Exact arithmetic for CBSE 11 Mathematics ch10 Conic Sections (builds on the exact rationals of gp.mjs, a copy of the ICSE 10 ch10 module).
// Every fact about a circle, parabola, ellipse or hyperbola is computed from its equation twice:
//   * by the closed formula (centre, radius, focus, directrix, axes, eccentricity, latus rectum), exact over rationals, with square roots
//     kept as exact surds (a value is "exact" when its square is a rational perfect square; otherwise it is written as a surd);
//   * by testing the curve itself: exact rational sample points satisfy the equation, and the focus-directrix or the sum/difference-of-distances
//     property holds for them (exactly where the distances are rational, by squares otherwise), plus a dense floating-point sampling of the curve.
import { Q as Rat, q } from './gp.mjs';

export { Rat, q };
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const N = (x) => (typeof x === 'bigint' ? Number(x) : Rat.of(x).num());
export const tx = (x) => Rat.of(x).tex();
export const dx = (x) => Rat.of(x).dtex();
const assert = (c, m) => { if (!c) throw new Error(`conic check failed: ${m}`); };
export const near = (u, v, tol = 1e-9) => Math.abs(u - v) <= tol * Math.max(1, Math.abs(u), Math.abs(v));

// ---------------------------------------------------------------- exact square roots of rationals
export function isqrtBig(n) {
  if (n < 0n) throw new Error('negative');
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n)))), y;
  for (;;) { y = (x + n / x) >> 1n; if (y === x || y === x + 1n && y * y > n) break; x = y; }
  while (x * x > n) x -= 1n;
  while ((x + 1n) * (x + 1n) <= n) x += 1n;
  return x;
}
/** Exact rational square root of a Rat, or null when irrational. */
export function sqrtQ(x) {
  x = Rat.of(x);
  if (x.sign() < 0) return null;
  const a = isqrtBig(x.n), b = isqrtBig(x.d);
  return a * a === x.n && b * b === x.d ? new Rat(a, b) : null;
}
function squareFree(n) { // n bigint > 0: n = k^2 * m, m square-free
  let k = 1n, m = n;
  for (let p = 2n; p * p <= m; p += 1n) while (m % (p * p) === 0n) { m /= p * p; k *= p; }
  return [k, m];
}
/** sqrt(x) = coef * sqrt(rad) with rad a square-free integer and coef a Rat (rad = 1 when x is a perfect square). */
export function surdOf(x) {
  x = Rat.of(x);
  assert(x.sign() >= 0, 'sqrt of a negative');
  const [kn, mn] = squareFree(x.n), [kd, md] = squareFree(x.d);
  return { coef: new Rat(kn, kd * md), rad: mn * md };
}
/** TeX of sqrt(x) in simplest surd form, e.g. 5, \sqrt{7}, 3\sqrt{2}, \dfrac{\sqrt{7}}{4}, \dfrac{8\sqrt{5}}{5}. */
export function sqTex(x) {
  const { coef, rad } = surdOf(x);
  if (rad === 1n) return coef.tex();
  if (coef.n === 1n && coef.d === 1n) return `\\sqrt{${rad}}`;
  if (coef.d === 1n) return `${coef.n}\\sqrt{${rad}}`;
  return coef.n === 1n ? `\\dfrac{\\sqrt{${rad}}}{${coef.d}}` : `\\dfrac{${coef.n}\\sqrt{${rad}}}{${coef.d}}`;
}
/** Product of a rational and sqrt(x) as TeX (k sqrt(x) simplified). */
export function kSqTex(k, x) {
  k = Rat.of(k);
  const { coef, rad } = surdOf(x), tot = k.mul(coef);
  if (rad === 1n) return tot.tex();
  const sign = tot.sign() < 0 ? '-' : '', t = tot.abs();
  const nn = t.n === 1n ? '' : String(t.n);
  return t.d === 1n ? `${sign}${nn}\\sqrt{${rad}}` : `${sign}\\dfrac{${nn}\\sqrt{${rad}}}{${t.d}}`;
}
/** Float value of sqrt of a Rat. */
export const fsq = (x) => Math.sqrt(Rat.of(x).num());

// ---------------------------------------------------------------- TeX helpers
export const pt = (x, y) => `(${tx(x)}, ${tx(y)})`;
export const ptd = (x, y) => `(${dx(x)}, ${dx(y)})`;
/** (x - h)^2 for variable v, h a Rat: x^2, (x - 3)^2, (x + 4)^2. */
export function sqv(v, h, dec = true) {
  h = Rat.of(h);
  if (h.isZero()) return `${v}^2`;
  const t = dec ? h.abs().dtex() : h.abs().tex();
  return `(${v} ${h.sign() > 0 ? '-' : '+'} ${t})^2`;
}
const lin = (c, v, first) => { c = Rat.of(c); if (c.isZero()) return ''; const t = c.abs().eq(1) ? '' : c.abs().dtex(); const s = c.sign() < 0 ? '-' : first ? '' : '+'; return first ? `${s}${t}${v}` : ` ${s} ${t}${v}`; };
/** x^2 + y^2 + Dx + Ey + F = 0 as TeX. */
export function circleGeneral(D, E, F) {
  let s = 'x^2 + y^2';
  const t1 = lin(D, 'x', false), t2 = lin(E, 'y', false);
  s += t1 + t2;
  F = Rat.of(F);
  if (!F.isZero()) s += ` ${F.sign() < 0 ? '-' : '+'} ${F.abs().dtex()}`;
  return `${s} = 0`;
}

// ---------------------------------------------------------------- circle
const P = (x, y) => [Rat.of(x), Rat.of(y)];
const d2 = ([a, b], [c, d]) => a.sub(c).mul(a.sub(c)).add(b.sub(d).mul(b.sub(d)));
export class Circle {
  /** centre (h, k), squared radius r2 */
  constructor(h, k, r2) { this.h = Rat.of(h); this.k = Rat.of(k); this.r2 = Rat.of(r2); assert(this.r2.sign() > 0, 'circle needs r^2 > 0'); }
  static fromGeneral(D, E, F) { const h = Rat.of(D).div(-2), k = Rat.of(E).div(-2); return new Circle(h, k, h.mul(h).add(k.mul(k)).sub(F)); }
  static fromDiameter(p1, p2) { const [a, b] = P(...p1), [c, d] = P(...p2); const h = a.add(c).div(2), k = b.add(d).div(2); const r2 = d2([h, k], [a, b]); const o = new Circle(h, k, r2); assert(o.on(p2), 'both diameter ends on the circle'); return o; }
  /** through three non-collinear points: solve x^2 + y^2 + Dx + Ey + F = 0 exactly. */
  static fromThree(p1, p2, p3) {
    const pts = [p1, p2, p3].map((p) => P(...p));
    // rows: x D + y E + F = -(x^2 + y^2)
    const M = pts.map(([x, y]) => [x, y, Rat.of(1), x.mul(x).add(y.mul(y)).neg()]);
    for (let c = 0; c < 3; c++) {
      let piv = c; while (piv < 3 && M[piv][c].isZero()) piv++;
      assert(piv < 3, 'points are collinear');
      [M[c], M[piv]] = [M[piv], M[c]];
      for (let rr = 0; rr < 3; rr++) if (rr !== c) { const f = M[rr][c].div(M[c][c]); M[rr] = M[rr].map((v, j) => v.sub(f.mul(M[c][j]))); }
    }
    const [D, E, F] = M.map((row, i) => row[3].div(row[i]));
    const o = Circle.fromGeneral(D, E, F);
    for (const p of pts) assert(o.on(p), 'through the three points');
    return o;
  }
  get radius() { return sqrtQ(this.r2); }
  get D() { return this.h.mul(-2); }
  get E() { return this.k.mul(-2); }
  get F() { return this.h.mul(this.h).add(this.k.mul(this.k)).sub(this.r2); }
  /** sign of (distance from centre)^2 - r^2: 0 on the circle, negative inside, positive outside. */
  pos(p) { return d2(P(...p), [this.h, this.k]).sub(this.r2).sign(); }
  on(p) { return this.pos(p) === 0; }
  std() { return `${sqv('x', this.h)} + ${sqv('y', this.k)} = ${this.r2.dtex()}`; }
  general() { return circleGeneral(this.D, this.E, this.F); }
  /** x-intercept chord: where the circle meets y = 0: (x - h)^2 = r^2 - k^2 */
  xCut() { const t = this.r2.sub(this.k.mul(this.k)); return t.sign() > 0 ? { half2: t, root: sqrtQ(t) } : null; }
  yCut() { const t = this.r2.sub(this.h.mul(this.h)); return t.sign() > 0 ? { half2: t, root: sqrtQ(t) } : null; }
  /** float check: the sampled points (h + r cos t, k + r sin t) satisfy the equation. */
  verifySampling() {
    const R = fsq(this.r2), h = this.h.num(), k = this.k.num();
    for (let i = 0; i < 720; i++) { const t = (i * Math.PI) / 360, x = h + R * Math.cos(t), y = k + R * Math.sin(t); assert(near((x - h) ** 2 + (y - k) ** 2, R * R), 'circle sampling'); assert(near(x * x + y * y + this.D.num() * x + this.E.num() * y + this.F.num(), 0, 1e-9) || Math.abs(x * x + y * y + this.D.num() * x + this.E.num() * y + this.F.num()) < 1e-8, 'circle general form sampling'); }
    return true;
  }
}

// ---------------------------------------------------------------- parabola with vertex at the origin
export class Parabola {
  /** kind 'y2': y^2 = k x (axis along x); kind 'x2': x^2 = k y (axis along y). */
  constructor(kind, k) { this.kind = kind; this.k = Rat.of(k); assert(!this.k.isZero(), 'k = 0'); this.p = this.k.div(4); }
  get a() { return this.p.abs(); }
  get focus() { return this.kind === 'y2' ? [this.p, Rat.of(0)] : [Rat.of(0), this.p]; }
  /** directrix as { axis: 'x' | 'y', value } meaning x = value or y = value */
  get directrix() { return { axis: this.kind === 'y2' ? 'x' : 'y', value: this.p.neg() }; }
  get lr() { return this.k.abs(); }
  get lrEnds() { const h = this.k.div(2); return this.kind === 'y2' ? [[this.p, h], [this.p, h.neg()]] : [[h, this.p], [h.neg(), this.p]]; }
  get opens() { return this.kind === 'y2' ? (this.k.sign() > 0 ? 'right' : 'left') : (this.k.sign() > 0 ? 'upward' : 'downward'); }
  get axis() { return this.kind === 'y2' ? 'x-axis' : 'y-axis'; }
  eq() { return this.kind === 'y2' ? `y^2 = ${this.k.dtex()}x` : `x^2 = ${this.k.dtex()}y`; }
  on(p) { const [x, y] = P(...p); return this.kind === 'y2' ? y.mul(y).eq(this.k.mul(x)) : x.mul(x).eq(this.k.mul(y)); }
  /** distance from p to the focus and to the directrix: exact squares must agree for every point of the curve. */
  focalSquares(p) {
    const [x, y] = P(...p);
    const toF = d2([x, y], this.focus);
    const dir = this.directrix, dd = dir.axis === 'x' ? x.sub(dir.value) : y.sub(dir.value);
    return { toFocus2: toF, toDirectrix2: dd.mul(dd) };
  }
  /** distance from a point of the curve to the focus (exact): |coordinate along the axis - directrix| */
  focalDistance(p) { const { toFocus2, toDirectrix2 } = this.focalSquares(p); assert(toFocus2.eq(toDirectrix2), 'focus-directrix property'); return sqrtQ(toFocus2); }
  /** a rational point on the curve for a rational parameter t (y = t for y2, x = t for x2) */
  pointAt(t) { t = Rat.of(t); return this.kind === 'y2' ? [t.mul(t).div(this.k), t] : [t, t.mul(t).div(this.k)]; }
  verify() {
    for (let i = -30; i <= 30; i++) { const t = new Rat(BigInt(i), 4n); const p = this.pointAt(t); assert(this.on(p), 'rational point on the parabola'); const { toFocus2, toDirectrix2 } = this.focalSquares(p); assert(toFocus2.eq(toDirectrix2), `focus-directrix at t = ${t}`); }
    for (const e of this.lrEnds) { assert(this.on(e), 'latus rectum end on the curve'); const f = this.focus, [ex, ey] = e; assert(this.kind === 'y2' ? ex.eq(f[0]) : ey.eq(f[1]), 'latus rectum passes through the focus, perpendicular to the axis'); }
    const [e1, e2] = this.lrEnds; assert(d2(e1, e2).eq(this.k.mul(this.k)), 'latus rectum length |k|');
    return true;
  }
}

// ---------------------------------------------------------------- ellipse  x^2/A + y^2/B = 1  (A = denominator under x^2)
export class Ellipse {
  constructor(A, B) { this.A = Rat.of(A); this.B = Rat.of(B); assert(this.A.sign() > 0 && this.B.sign() > 0 && !this.A.eq(this.B), 'ellipse denominators'); }
  get major() { return this.A.gt(this.B) ? 'x' : 'y'; }
  get M() { return this.A.gt(this.B) ? this.A : this.B; } // a^2
  get m() { return this.A.gt(this.B) ? this.B : this.A; } // b^2
  get c2() { return this.M.sub(this.m); }
  get e2() { return this.c2.div(this.M); }
  get a() { return sqrtQ(this.M); }
  get b() { return sqrtQ(this.m); }
  get c() { return sqrtQ(this.c2); }
  get e() { const a = this.a, c = this.c; return a && c ? c.div(a) : null; }
  get lr2() { return this.m.mul(this.m).mul(4).div(this.M); } // (2 b^2 / a)^2
  get lr() { return sqrtQ(this.lr2); }
  tex(name) {
    switch (name) {
      case 'a': return sqTex(this.M);
      case 'b': return sqTex(this.m);
      case 'c': return sqTex(this.c2);
      case 'e': return sqTex(this.e2);
      case 'major': return kSqTex(2, this.M);
      case 'minor': return kSqTex(2, this.m);
      case 'lr': return sqTex(this.lr2);
      default: throw new Error(name);
    }
  }
  /** foci as [x, y] TeX strings: (+-c, 0) or (0, +-c) */
  fociTex() { const c = this.tex('c'); return this.major === 'x' ? [`(${c}, 0)`, `(-${c}, 0)`] : [`(0, ${c})`, `(0, -${c})`]; }
  verticesTex() { const a = this.tex('a'); return this.major === 'x' ? [`(${a}, 0)`, `(-${a}, 0)`] : [`(0, ${a})`, `(0, -${a})`]; }
  minorEndsTex() { const b = this.tex('b'); return this.major === 'x' ? [`(0, ${b})`, `(0, -${b})`] : [`(${b}, 0)`, `(-${b}, 0)`]; }
  eq() { return `\\dfrac{x^2}{${this.A.dtex()}} + \\dfrac{y^2}{${this.B.dtex()}} = 1`; }
  on(p) { const [x, y] = P(...p); return x.mul(x).div(this.A).add(y.mul(y).div(this.B)).eq(1); }
  /** squared half latus rectum height: the point (c, b^2/a) lies on the curve (checked through squares) */
  checkLatusRectum() {
    const h2 = this.m.mul(this.m).div(this.M); // (b^2/a)^2
    const [x2, y2] = this.major === 'x' ? [this.c2, h2] : [h2, this.c2];
    assert(x2.div(this.A).add(y2.div(this.B)).eq(1), 'latus rectum end lies on the ellipse');
    return true;
  }
  /** floating sampling: points (a cos t, b sin t); sum of focal distances = 2a; focus-directrix with e. */
  verifySampling() {
    const A = fsq(this.A), B = fsq(this.B), c = fsq(this.c2), e = fsq(this.e2), a = fsq(this.M);
    const [f1, f2] = this.major === 'x' ? [[c, 0], [-c, 0]] : [[0, c], [0, -c]];
    for (let i = 0; i < 1440; i++) {
      const t = (i * Math.PI) / 720, x = A * Math.cos(t), y = B * Math.sin(t);
      assert(near((x * x) / (A * A) + (y * y) / (B * B), 1), 'point on the ellipse');
      const s = Math.hypot(x - f1[0], y - f1[1]) + Math.hypot(x - f2[0], y - f2[1]);
      assert(near(s, 2 * a, 1e-9), 'sum of focal distances is 2a');
      const dist = Math.abs((this.major === 'x' ? x : y) - a / e), pf = Math.hypot(x - f1[0], y - f1[1]);
      if ((this.major === 'x' ? x : y) >= 0) assert(near(pf, e * dist, 1e-9), 'focus-directrix property');
    }
    this.checkLatusRectum();
    assert(this.e2.sub(Rat.of(1).sub(this.m.div(this.M))).isZero(), 'e^2 = 1 - b^2/a^2');
    return true;
  }
}

// ---------------------------------------------------------------- hyperbola  x^2/A - y^2/B = 1 ('x') or y^2/A - x^2/B = 1 ('y')
export class Hyperbola {
  constructor(kind, A, B) { this.kind = kind; this.A = Rat.of(A); this.B = Rat.of(B); assert(this.A.sign() > 0 && this.B.sign() > 0, 'hyperbola denominators'); }
  get a() { return sqrtQ(this.A); }
  get b() { return sqrtQ(this.B); }
  get c2() { return this.A.add(this.B); }
  get c() { return sqrtQ(this.c2); }
  get e2() { return this.c2.div(this.A); }
  get e() { const a = this.a, c = this.c; return a && c ? c.div(a) : null; }
  get lr2() { return this.B.mul(this.B).mul(4).div(this.A); }
  get lr() { return sqrtQ(this.lr2); }
  /** asymptote slope squared: (b/a)^2 for 'x', (a/b)^2 for 'y' */
  get slope2() { return this.kind === 'x' ? this.B.div(this.A) : this.A.div(this.B); }
  tex(name) {
    switch (name) {
      case 'a': return sqTex(this.A);
      case 'b': return sqTex(this.B);
      case 'c': return sqTex(this.c2);
      case 'e': return sqTex(this.e2);
      case 'transverse': return kSqTex(2, this.A);
      case 'conjugate': return kSqTex(2, this.B);
      case 'lr': return sqTex(this.lr2);
      case 'slope': return sqTex(this.slope2);
      default: throw new Error(name);
    }
  }
  fociTex() { const c = this.tex('c'); return this.kind === 'x' ? [`(${c}, 0)`, `(-${c}, 0)`] : [`(0, ${c})`, `(0, -${c})`]; }
  verticesTex() { const a = this.tex('a'); return this.kind === 'x' ? [`(${a}, 0)`, `(-${a}, 0)`] : [`(0, ${a})`, `(0, -${a})`]; }
  eq() { return this.kind === 'x' ? `\\dfrac{x^2}{${this.A.dtex()}} - \\dfrac{y^2}{${this.B.dtex()}} = 1` : `\\dfrac{y^2}{${this.A.dtex()}} - \\dfrac{x^2}{${this.B.dtex()}} = 1`; }
  on(p) { const [x, y] = P(...p); const [u, v] = this.kind === 'x' ? [x, y] : [y, x]; return u.mul(u).div(this.A).sub(v.mul(v).div(this.B)).eq(1); }
  checkLatusRectum() {
    const h2 = this.B.mul(this.B).div(this.A);
    const [u2, v2] = [this.c2, h2]; // u along the transverse axis
    assert(u2.div(this.A).sub(v2.div(this.B)).eq(1), 'latus rectum end lies on the hyperbola');
    return true;
  }
  /** floating sampling: (a cosh t, b sinh t); |d1 - d2| = 2a; focus-directrix with e on each branch. */
  verifySampling() {
    const a = fsq(this.A), b = fsq(this.B), c = fsq(this.c2), e = fsq(this.e2);
    const to = (u, v) => (this.kind === 'x' ? [u, v] : [v, u]); // (transverse, conjugate) -> (x, y)
    for (let i = -400; i <= 400; i++) {
      const t = i / 100;
      for (const sgn of [1, -1]) {
        const u = sgn * a * Math.cosh(t), v = b * Math.sinh(t);
        assert(near((u * u) / (a * a) - (v * v) / (b * b), 1, 1e-9), 'point on the hyperbola');
        const [x, y] = to(u, v), f1 = to(c, 0), f2 = to(-c, 0);
        const d1 = Math.hypot(x - f1[0], y - f1[1]), d2_ = Math.hypot(x - f2[0], y - f2[1]);
        assert(near(Math.abs(d1 - d2_), 2 * a, 1e-9), 'difference of focal distances is 2a');
        const focus = sgn > 0 ? f1 : f2, pf = sgn > 0 ? d1 : d2_;
        assert(near(pf, e * Math.abs(u - sgn * (a / e)), 1e-9), 'focus-directrix property');
      }
    }
    this.checkLatusRectum();
    assert(this.e2.sub(Rat.of(1).add(this.B.div(this.A))).isZero(), 'e^2 = 1 + b^2/a^2');
    return true;
  }
}

// ---------------------------------------------------------------- sections of a cone
/** alpha: semi-vertical angle, beta: angle between the cutting plane and the axis (degrees, 0 < beta <= 90). Plane NOT through the vertex. */
export function sectionOf(alpha, beta, throughVertex = false) {
  if (!(alpha > 0 && alpha < 90 && beta >= 0 && beta <= 90)) throw new Error('angles');
  if (throughVertex) return beta > alpha ? 'a single point' : beta === alpha ? 'a single straight line' : 'a pair of intersecting straight lines';
  if (beta === 90) return 'circle';
  if (beta > alpha) return 'ellipse';
  if (beta === alpha) return 'parabola';
  return 'hyperbola';
}
/** Class of a standard conic by its eccentricity. */
export function classByE(e2) { e2 = Rat.of(e2); return e2.isZero() ? 'circle' : e2.lt(1) ? 'ellipse' : e2.eq(1) ? 'parabola' : 'hyperbola'; }
