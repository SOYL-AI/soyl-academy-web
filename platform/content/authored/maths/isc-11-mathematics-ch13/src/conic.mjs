// Exact conic arithmetic for ISC 11 Mathematics ch13 (conics, focus-directrix property, the parabola).
// Everything is computed on exact rationals (BigInt fractions) and cross-checked a second way:
//   * Conic.fromFocus builds PS^2 = e^2 PL^2 from a focus, a directrix a x + b y + c = 0 and e^2, and every conic is re-checked by
//     sampling points of it and testing PS = e PL in floating point;
//   * Par is a parabola in vertex form (R, L, U, D); its equation, focus, directrix, latus rectum and focal distance are re-derived by
//     Conic.fromFocus (PS = PL) and compared coefficient by coefficient, and by parametric points (a t^2, 2 a t) tested on PS = PL.
import { fr, Fr, sqrtF, sqTex, pt, d2, P, range, near, sqv } from './ex.mjs';

export { fr, Fr, sqrtF, sqTex, pt, d2, P, range, near, sqv };
const must = (c, m) => { if (!c) throw new Error(`conic check failed: ${m}`); };
const absB = (x) => (x < 0n ? -x : x);
const gcdB = (a, b) => (b === 0n ? absB(a) : gcdB(b, a % b));
const lcmB = (a, b) => (a / gcdB(a, b)) * b;
export const numStr = (x) => String(+fr(x).num().toFixed(6));
export const tx = (x) => fr(x).tex();

/** Integer coefficients, lowest terms, first non-zero one positive. */
function normalise(cs) {
  const L = cs.reduce((l, c) => lcmB(l, c.d), 1n);
  let ints = cs.map((c) => c.mul(L).n);
  const g = ints.reduce((gg, x) => gcdB(gg, x), 0n) || 1n;
  ints = ints.map((x) => x / g);
  const first = ints.find((x) => x !== 0n);
  if (first < 0n) ints = ints.map((x) => -x);
  return ints.map((x) => fr(x));
}
const coef = (c, sym, first) => {
  if (c.isZero()) return '';
  const a = c.abs(), body = sym && a.eq(1) ? sym : `${a.tex()}${sym}`;
  return first ? `${c.sign() < 0 ? '-' : ''}${body}` : ` ${c.sign() < 0 ? '-' : '+'} ${body}`;
};

/** Conic A x^2 + B x y + C y^2 + D x + E y + F = 0 with integer coefficients (normalised). */
export class Conic {
  constructor(A, B, C, D, E, F) {
    [this.A, this.B, this.C, this.D, this.E, this.F] = normalise([A, B, C, D, E, F].map((v) => fr(v)));
  }
  /** PS^2 = e2 * PL^2 for the focus S(p, q) and the directrix a x + b y + c = 0 (S not on it). `N` overrides a^2 + b^2 (used for wrong methods). */
  static fromFocus(S, line, e2, N = null) {
    const [p, q] = S.map((v) => fr(v)), [a, b, c] = line.map((v) => fr(v));
    e2 = fr(e2);
    const n = N === null ? a.mul(a).add(b.mul(b)) : fr(N);
    must(!a.mul(p).add(b.mul(q)).add(c).isZero() || N !== null, 'the focus is not on the directrix');
    return new Conic(
      n.sub(e2.mul(a).mul(a)), e2.mul(-2).mul(a).mul(b), n.sub(e2.mul(b).mul(b)),
      n.mul(p).mul(-2).sub(e2.mul(2).mul(a).mul(c)), n.mul(q).mul(-2).sub(e2.mul(2).mul(b).mul(c)),
      n.mul(p.mul(p).add(q.mul(q))).sub(e2.mul(c).mul(c)),
    );
  }
  val([x, y]) {
    [x, y] = [fr(x), fr(y)];
    return this.A.mul(x).mul(x).add(this.B.mul(x).mul(y)).add(this.C.mul(y).mul(y)).add(this.D.mul(x)).add(this.E.mul(y)).add(this.F);
  }
  on(p) { return this.val(p).isZero(); }
  disc() { return this.B.mul(this.B).sub(this.A.mul(this.C).mul(4)); }
  kind() { const s = this.disc().sign(); return s < 0 ? 'ellipse' : s === 0 ? 'parabola' : 'hyperbola'; }
  tex() {
    const t = [[this.A, 'x^2'], [this.B, 'xy'], [this.C, 'y^2'], [this.D, 'x'], [this.E, 'y'], [this.F, '']];
    let out = '', first = true;
    for (const [c, sym] of t) { const s = coef(c, sym, first); if (!s) continue; out += s; first = false; }
    return `${out} = 0`;
  }
  /** Same coefficients (as normalised integers)? */
  same(o) { return ['A', 'B', 'C', 'D', 'E', 'F'].every((k) => this[k].eq(o[k])); }
  /** Float sampling: points of the conic found by solving the quadratic in y for many x (and in x for many y when it is steep). */
  floatPoints() {
    const [A, B, C, D, E, F] = [this.A, this.B, this.C, this.D, this.E, this.F].map((v) => v.num()), out = [];
    for (let i = -400; i <= 400; i++) {
      const x = i / 8, qa = C, qb = B * x + E, qc = A * x * x + D * x + F;
      if (Math.abs(qa) < 1e-12) { if (Math.abs(qb) > 1e-12) out.push([x, -qc / qb]); continue; }
      const disc = qb * qb - 4 * qa * qc;
      if (disc < 0) continue;
      const s = Math.sqrt(disc);
      out.push([x, (-qb + s) / (2 * qa)], [x, (-qb - s) / (2 * qa)]);
    }
    return out;
  }
}
/** Float check that PS = e * PL at sampled points of the conic. */
export function checkFocusDirectrix(conic, S, line, e2) {
  const [p, q] = S.map((v) => fr(v).num()), [a, b, c] = line.map((v) => fr(v).num()), e = Math.sqrt(fr(e2).num());
  const pts = conic.floatPoints();
  must(pts.length >= 20, 'enough sample points');
  for (const [x, y] of pts) {
    const ps = Math.hypot(x - p, y - q), pl = Math.abs(a * x + b * y + c) / Math.hypot(a, b);
    must(Math.abs(ps - e * pl) < 1e-6 * Math.max(1, ps), `PS = e PL at (${x}, ${y})`);
  }
  return pts.length;
}
/** Full build: conic from focus, directrix and e^2, then the sampling check and the class vs e check. */
export function focusConic(S, line, e2) {
  const c = Conic.fromFocus(S, line, e2);
  checkFocusDirectrix(c, S, line, e2);
  const e2f = fr(e2), want = e2f.eq(1) ? 'parabola' : e2f.lt(1) ? 'ellipse' : 'hyperbola';
  must(c.kind() === want, `class by e (${want}) agrees with the sign of B^2 - 4AC (${c.kind()})`);
  return c;
}
/** Perpendicular distance squared of (x, y) from the line a x + b y + c = 0, exact. */
export const pl2 = (line, [x, y]) => { const [a, b, c] = line.map((v) => fr(v)); const v = a.mul(x).add(b.mul(y)).add(c); return v.mul(v).div(a.mul(a).add(b.mul(b))); };
export const ps2 = (S, p) => d2(P(...S), P(...p));
/** Ratio PS^2 / PL^2 (= e^2) of a point against a focus and a directrix, exact. */
export const e2At = (S, line, p) => ps2(S, p).div(pl2(line, p));

/** Cone sections: plane at angle beta to the axis of a double cone of semi-vertical angle alpha (degrees). */
export function coneSection(alpha, beta, throughVertex = false) {
  if (!throughVertex) return beta > alpha ? (beta === 90 ? 'circle' : 'ellipse') : beta === alpha ? 'parabola' : 'hyperbola';
  return beta > alpha ? 'point' : beta === alpha ? 'line' : 'pair of lines';
}
/** Independent float route: sign of the quadratic form of the cone on the plane spanned by (sin b, 0, cos b) and (0, 1, 0). */
export function coneSectionByForm(alpha, beta, throughVertex = false) {
  const r = Math.PI / 180, a = alpha * r, b = beta * r;
  const det = Math.sin(b) ** 2 - Math.tan(a) ** 2 * Math.cos(b) ** 2;
  const s = Math.abs(det) < 1e-12 ? 0 : Math.sign(det);
  if (!throughVertex) return s > 0 ? (beta === 90 ? 'circle' : 'ellipse') : s === 0 ? 'parabola' : 'hyperbola';
  return s > 0 ? 'point' : s === 0 ? 'line' : 'pair of lines';
}

// ================================================================ parabolas in vertex form
const cx = (c, v) => { c = fr(c); if (c.eq(1)) return v; if (c.eq(-1)) return `-${v}`; return `${c.tex()}${v}`; };
/** Vertex form. R: (y-k)^2 = 4a(x-h); L: (y-k)^2 = -4a(x-h); U: (x-h)^2 = 4a(y-k); D: (x-h)^2 = -4a(y-k); a > 0. */
export class Par {
  constructor(o, a, h = 0, k = 0) {
    this.o = o; this.a = fr(a); this.h = fr(h); this.k = fr(k);
    must('RLUD'.includes(o) && this.a.sign() > 0, 'parabola form and a > 0');
  }
  get vertex() { return [this.h, this.k]; }
  get horizontal() { return this.o === 'R' || this.o === 'L'; }
  get sgn() { return this.o === 'R' || this.o === 'U' ? 1 : -1; }
  get focus() { const d = this.a.mul(this.sgn); return this.horizontal ? [this.h.add(d), this.k] : [this.h, this.k.add(d)]; }
  /** Directrix as [a, b, c] with a x + b y + c = 0 (scaled to integers). */
  get line() {
    const d = this.a.mul(this.sgn);
    const raw = this.horizontal ? [fr(1), fr(0), this.h.sub(d).neg()] : [fr(0), fr(1), this.k.sub(d).neg()];
    const L = raw.reduce((l, c) => lcmB(l, c.d), 1n);
    return raw.map((c) => c.mul(L));
  }
  /** The directrix value: x = ... or y = ... */
  get dirVal() { const d = this.a.mul(this.sgn); return this.horizontal ? this.h.sub(d) : this.k.sub(d); }
  dirTex() { return `${this.horizontal ? 'x' : 'y'} = ${this.dirVal.tex()}`; }
  axisTex() { return this.horizontal ? `y = ${this.k.tex()}` : `x = ${this.h.tex()}`; }
  focTex() { return pt(...this.focus); }
  get lr() { return this.a.mul(4); }
  /** Ends of the latus rectum. */
  get lrEnds() { const [fx, fy] = this.focus, t = this.a.mul(2); return this.horizontal ? [[fx, fy.add(t)], [fx, fy.sub(t)]] : [[fx.add(t), fy], [fx.sub(t), fy]]; }
  /** Axis variable and its offset form: the equation (squared variable = signed 4a * offset). */
  eqTex() {
    const c = this.a.mul(4).mul(this.sgn);
    const lhs = this.horizontal ? sqv('y', this.k) : sqv('x', this.h);
    const off = this.horizontal ? shifted('x', this.h) : shifted('y', this.k);
    if (this.horizontal ? this.h.isZero() : this.k.isZero()) return `${lhs} = ${cx(c, off)}`;
    return `${lhs} = ${c.tex()}${off.includes(' ') ? `(${off})` : off}`;
  }
  conic() {
    const c4 = this.a.mul(4).mul(this.sgn), h = this.h, k = this.k;
    return this.horizontal
      ? new Conic(0, 0, 1, c4.neg(), k.mul(-2), k.mul(k).add(c4.mul(h)))
      : new Conic(1, 0, 0, h.mul(-2), c4.neg(), h.mul(h).add(c4.mul(k)));
  }
  genTex() { return this.conic().tex(); }
  on(p) { return this.conic().on(p); }
  /** PS^2 and PL^2 for a point (exact); on the parabola they are equal. */
  ps2(p) { return ps2(this.focus, p); }
  pl2(p) { return pl2(this.line, p); }
  /** Exact focal distance of a point of the parabola (a rational when PS^2 is a square). */
  focal(p) { must(this.on(p), 'the point is on the parabola'); const v = sqrtF(this.ps2(p)); must(v, 'rational focal distance'); return v; }
  /** Point (h + a t^2, k + 2 a t) style parametric point for the form. */
  param(t) {
    t = fr(t); const a = this.a, s = this.sgn;
    const u = a.mul(t).mul(t).mul(s), w = a.mul(2).mul(t);
    return this.horizontal ? [this.h.add(u), this.k.add(w)] : [this.h.add(w), this.k.add(u)];
  }
  /** Re-derive the parabola from its focus and directrix and test it; parametric and float sampling. Returns true. */
  verify() {
    const re = Conic.fromFocus(this.focus, this.line, 1);
    must(re.same(this.conic()), `PS = PL from the focus and directrix reproduces ${this.eqTex()}`);
    must(this.conic().kind() === 'parabola', 'discriminant zero');
    checkFocusDirectrix(re, this.focus, this.line, 1);
    for (const t of [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((v) => fr(v, 2))) {
      const p = this.param(t);
      must(this.on(p) && this.ps2(p).eq(this.pl2(p)), 'parametric point on the parabola with PS = PL');
      must(this.focal(p).eq(this.a.mul(t.mul(t).add(1))), 'focal distance is a (t^2 + 1)');
    }
    for (const e of this.lrEnds) must(this.on(e) && this.ps2(e).eq(this.lr.div(2).mul(this.lr.div(2))), 'latus rectum end on the parabola, half-length 2a from the focus');
    const v = this.vertex;
    must(this.on(v) && this.ps2(v).eq(this.a.mul(this.a)), 'vertex on the parabola at distance a from the focus');
    return true;
  }
}
function shifted(v, h) { h = fr(h); return h.isZero() ? v : `${v} ${h.sign() > 0 ? '-' : '+'} ${h.abs().tex()}`; }

// ================================================================ plots
const xs = (h) => { const v = fr(h); return v.isZero() ? 'x' : v.sign() > 0 ? `(x-${numStr(v)})` : `(x+${numStr(v.abs())})`; };
/** Plot functions for a parabola. xr = [xmin, xmax] of the window; vertical parabolas are single functions of x, horizontal ones two halves. */
export function parFns(par, xr, label = true) {
  const eps = 1e-4, h = par.h.num(), a4 = numStr(par.a.mul(4));
  const kk = par.k.isZero() ? '' : numStr(par.k);
  if (par.horizontal) {
    const dom = par.o === 'R' ? [+(h + eps).toFixed(4), xr[1]] : [xr[0], +(h - eps).toFixed(4)];
    const inner = par.o === 'R' ? `${a4}*${xs(par.h)}` : `-${a4}*${xs(par.h)}`;
    return [{ expr: kk ? `${kk}+sqrt(${inner})` : `sqrt(${inner})`, ...(label ? { label: 'upper branch' } : {}), domain: dom }, { expr: kk ? `${kk}-sqrt(${inner})` : `-sqrt(${inner})`, ...(label ? { label: 'lower branch' } : {}), domain: dom }];
  }
  const sg = par.o === 'U' ? '' : '-';
  const body = `${xs(par.h)}^2/${a4}`;
  return [{ expr: `${kk ? `${kk}${par.o === 'U' ? '+' : '-'}` : sg}${body}`, ...(label ? { label: 'parabola' } : {}), domain: xr }];
}
/** The directrix as a plot function when it is horizontal (null when vertical). */
export function dirFn(par, xr, label = 'directrix') {
  if (par.horizontal) return null;
  return { expr: numStr(par.dirVal), label, domain: xr };
}
