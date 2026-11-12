// Exact arithmetic for ISC 11 Mathematics ch14 Ellipse and Hyperbola.
// Every axis, focus, directrix, eccentricity, latus rectum and focal distance is computed from the equation by a closed formula on exact
// rationals (BigInt fractions, lengths as exact surds) and independently by dense floating-point sampling of the curve (the focal property
// SP + S'P = 2a, |SP - S'P| = 2a and the focal distances a +- ex, ex +- a are tested at 720 points). A conic from a focus, a directrix and e is
// built by squaring PS = e PL and normalised to integer coefficients; its marked points are tested in the equation and in PS = e PL.
import { Fr, fr, sqrtF, sqTex, kSqTex, near, range, d2, P, pt, solve2 } from './exact.mjs';
export { Fr, fr, sqrtF, sqTex, kSqTex, near, range, d2, P, pt, solve2 };

const must = (c, m) => { if (!c) throw new Error(`conic check failed: ${m}`); };
export const numStr = (x) => String(+Number(x).toFixed(6));
const EPS = 1e-3;
const r4 = (v) => +v.toFixed(4);
const intOf = (x) => { x = fr(x); must(x.d === 1n, `integer needed for a plot expression, got ${x}`); return String(x.n); };
const T = (x) => fr(x).tex();
const hyp = (a, b) => Math.sqrt(a * a + b * b);

// ================================================================ ellipse  x^2/p + y^2/q = 1
export class Ellipse {
  constructor(p, q) {
    this.p = fr(p); this.q = fr(q);
    must(this.p.sign() > 0 && this.q.sign() > 0 && !this.p.eq(this.q), 'an ellipse needs p, q > 0 and p != q');
    this.ax = this.q.lt(this.p) ? 'x' : 'y'; // major axis along x when p > q
    this.A2 = this.ax === 'x' ? this.p : this.q; // semi-major axis squared
    this.B2 = this.ax === 'x' ? this.q : this.p; // semi-minor axis squared
  }
  get c2() { return this.A2.sub(this.B2); }
  get e2() { return this.c2.div(this.A2); }
  get A() { return sqrtF(this.A2); }
  get B() { return sqrtF(this.B2); }
  get c() { return sqrtF(this.c2); }
  get e() { return sqrtF(this.e2); }
  eq() { return `\\dfrac{x^2}{${T(this.p)}} + \\dfrac{y^2}{${T(this.q)}} = 1`; }
  /** The point with coordinate u along the major axis and v along the minor axis. */
  at(u, v) { return this.ax === 'x' ? [fr(u), fr(v)] : [fr(v), fr(u)]; }
  onSq(x2, y2) { return fr(x2).div(this.p).add(fr(y2).div(this.q)).eq(1); }
  on(x, y) { x = fr(x); y = fr(y); return this.onSq(x.mul(x), y.mul(y)); }
  pm(v) { return this.ax === 'x' ? `(\\pm ${v}, 0)` : `(0, \\pm ${v})`; }
  pmMinor(v) { return this.ax === 'x' ? `(0, \\pm ${v})` : `(\\pm ${v}, 0)`; }
  fociTex() { return this.pm(sqTex(this.c2)); }
  verticesTex() { return this.pm(sqTex(this.A2)); }
  minorEndsTex() { return this.pmMinor(sqTex(this.B2)); }
  eTex() { return sqTex(this.e2); }
  /** Directrices x = +- A/e = +- A^2/c (or y = ...). */
  dirTex() { return `${this.ax} = \\pm ${kSqTex(this.A2.div(this.c2), this.c2)}`; }
  dirValue2() { return this.A2.mul(this.A2).div(this.c2); } // (A^2/c)^2
  lrTex() { return kSqTex(fr(2).mul(this.B2).div(this.A2), this.A2); } // 2 B^2 / A
  halfLrTex() { return kSqTex(this.B2.div(this.A2), this.A2); } // B^2 / A
  lrEndsTex() { return this.ax === 'x' ? `(\\pm ${sqTex(this.c2)}, \\pm ${this.halfLrTex()})` : `(\\pm ${this.halfLrTex()}, \\pm ${sqTex(this.c2)})`; }
  fociPts() { const c = this.c; return c ? [this.at(c, 0), this.at(c.neg(), 0)] : null; }
  /** The latus rectum end (c, B^2/A) lies on the ellipse: x^2 = c^2, y^2 = B^4 / A^2. */
  lrOn() { const x2 = this.c2, y2 = this.B2.mul(this.B2).div(this.A2); return this.ax === 'x' ? this.onSq(x2, y2) : this.onSq(y2, x2); }
  /** Floating-point tests: 720 points of the curve satisfy SP + S'P = 2A and the focal distances A -+ e u (u along the major axis). */
  verify() {
    const sp = Math.sqrt(this.p.num()), sq = Math.sqrt(this.q.num()), A = Math.sqrt(this.A2.num()), c = Math.sqrt(this.c2.num()), e = c / A;
    must(this.lrOn(), 'latus rectum end on the ellipse');
    must(near(e * e, this.e2.num()) && near(this.B2.num(), this.A2.num() * (1 - this.e2.num())), 'b^2 = a^2 (1 - e^2)');
    for (let i = 0; i < 720; i++) {
      const t = (i * Math.PI) / 360, x = sp * Math.cos(t), y = sq * Math.sin(t);
      must(near(x * x / this.p.num() + y * y / this.q.num(), 1), 'sampling on the curve');
      const [fx1, fy1, fx2, fy2] = this.ax === 'x' ? [c, 0, -c, 0] : [0, c, 0, -c];
      const d1 = hyp(x - fx1, y - fy1), d2_ = hyp(x - fx2, y - fy2), u = this.ax === 'x' ? x : y;
      must(near(d1 + d2_, 2 * A), 'SP + S\'P = 2a');
      must(near(d1, A - e * u) && near(d2_, A + e * u), 'focal distances a -+ e u');
    }
    return true;
  }
  /** Upper and lower halves y = +-sqrt(q (1 - x^2/p)); the domains stop just short of the ends of the horizontal axis. */
  fns(label = true) {
    const s = Math.sqrt(this.p.num()), body = `sqrt(${intOf(this.q)}*(1-x^2/${intOf(this.p)}))`, dom = [r4(-s + EPS), r4(s - EPS)];
    return [{ expr: body, ...(label ? { label: 'upper half' } : {}), domain: dom }, { expr: `-${body}`, ...(label ? { label: 'lower half' } : {}), domain: dom }];
  }
}

// ================================================================ hyperbola  x^2/T2 - y^2/C2 = 1 (axis 'x') or y^2/T2 - x^2/C2 = 1 (axis 'y')
export class Hyperbola {
  constructor(T2, C2, ax = 'x') {
    this.T2 = fr(T2); this.C2 = fr(C2); this.ax = ax;
    must(this.T2.sign() > 0 && this.C2.sign() > 0 && (ax === 'x' || ax === 'y'), 'a hyperbola needs T2, C2 > 0');
  }
  get c2() { return this.T2.add(this.C2); }
  get e2() { return this.c2.div(this.T2); }
  get e2conj() { return this.c2.div(this.C2); }
  get T() { return sqrtF(this.T2); }
  get C() { return sqrtF(this.C2); }
  get c() { return sqrtF(this.c2); }
  get e() { return sqrtF(this.e2); }
  conj() { return new Hyperbola(this.C2, this.T2, this.ax === 'x' ? 'y' : 'x'); }
  eq() { return this.ax === 'x' ? `\\dfrac{x^2}{${T(this.T2)}} - \\dfrac{y^2}{${T(this.C2)}} = 1` : `\\dfrac{y^2}{${T(this.T2)}} - \\dfrac{x^2}{${T(this.C2)}} = 1`; }
  /** The same equation written with the x^2 term first: -x^2/C2 + y^2/T2 = 1. */
  eqXFirst() { return this.ax === 'x' ? this.eq() : `-\\dfrac{x^2}{${T(this.C2)}} + \\dfrac{y^2}{${T(this.T2)}} = 1`; }
  /** The point with coordinate u along the transverse axis and v along the conjugate axis. */
  at(u, v) { return this.ax === 'x' ? [fr(u), fr(v)] : [fr(v), fr(u)]; }
  onSq(x2, y2) { x2 = fr(x2); y2 = fr(y2); return this.ax === 'x' ? x2.div(this.T2).sub(y2.div(this.C2)).eq(1) : y2.div(this.T2).sub(x2.div(this.C2)).eq(1); }
  on(x, y) { x = fr(x); y = fr(y); return this.onSq(x.mul(x), y.mul(y)); }
  pm(v) { return this.ax === 'x' ? `(\\pm ${v}, 0)` : `(0, \\pm ${v})`; }
  pmConj(v) { return this.ax === 'x' ? `(0, \\pm ${v})` : `(\\pm ${v}, 0)`; }
  fociTex() { return this.pm(sqTex(this.c2)); }
  verticesTex() { return this.pm(sqTex(this.T2)); }
  conjEndsTex() { return this.pmConj(sqTex(this.C2)); }
  eTex() { return sqTex(this.e2); }
  eConjTex() { return sqTex(this.e2conj); }
  dirTex() { return `${this.ax} = \\pm ${kSqTex(this.T2.div(this.c2), this.c2)}`; }
  lrTex() { return kSqTex(fr(2).mul(this.C2).div(this.T2), this.T2); } // 2 C^2 / T
  halfLrTex() { return kSqTex(this.C2.div(this.T2), this.T2); } // C^2 / T
  lrEndsTex() { return this.ax === 'x' ? `(\\pm ${sqTex(this.c2)}, \\pm ${this.halfLrTex()})` : `(\\pm ${this.halfLrTex()}, \\pm ${sqTex(this.c2)})`; }
  /** slope of the asymptotes through the centre */
  slope2() { return this.ax === 'x' ? this.C2.div(this.T2) : this.T2.div(this.C2); }
  lrOn() { const u2 = this.c2, v2 = this.C2.mul(this.C2).div(this.T2); return this.ax === 'x' ? this.onSq(u2, v2) : this.onSq(v2, u2); }
  /** Floating-point tests: both branches at 25 values of t satisfy |SP - S'P| = 2T and the focal distances e|u| -+ T. */
  verify() {
    const Tn = Math.sqrt(this.T2.num()), Cn = Math.sqrt(this.C2.num()), c = Math.sqrt(this.c2.num()), e = c / Tn;
    must(this.lrOn(), 'latus rectum end on the hyperbola');
    must(near(e * e, this.e2.num()) && near(this.C2.num(), this.T2.num() * (this.e2.num() - 1)), 'b^2 = a^2 (e^2 - 1)');
    must(near(1 / this.e2.num() + 1 / this.e2conj.num(), 1), '1/e^2 + 1/e\'^2 = 1');
    for (const sgn of [1, -1]) for (let i = -12; i <= 12; i++) {
      const t = i / 4, u = sgn * Tn * Math.cosh(t), v = Cn * Math.sinh(t);
      const [x, y] = this.ax === 'x' ? [u, v] : [v, u];
      must(near(this.ax === 'x' ? (x * x) / this.T2.num() - (y * y) / this.C2.num() : (y * y) / this.T2.num() - (x * x) / this.C2.num(), 1), 'sampling on the curve');
      const [fx1, fy1, fx2, fy2] = this.ax === 'x' ? [c, 0, -c, 0] : [0, c, 0, -c];
      const d1 = hyp(x - fx1, y - fy1), d2_ = hyp(x - fx2, y - fy2);
      must(near(Math.abs(d1 - d2_), 2 * Tn), '|SP - S\'P| = 2a');
      must(near(Math.min(d1, d2_), e * Math.abs(u) - Tn) && near(Math.max(d1, d2_), e * Math.abs(u) + Tn), 'focal distances e|u| -+ a');
    }
    return true;
  }
  /** Plot functions out to |x| = X: four for an x-axis hyperbola (two branches, upper and lower halves), two for a y-axis one. */
  fns(X, label = false) {
    const t2 = intOf(this.T2), c2 = intOf(this.C2);
    if (this.ax === 'x') {
      const s = Math.sqrt(this.T2.num()), body = `sqrt(${c2}*(x^2/${t2}-1))`, right = [r4(s + EPS), X], left = [-X, r4(-s - EPS)];
      return [
        { expr: body, ...(label ? { label: 'right branch, upper' } : {}), domain: right }, { expr: `-${body}`, ...(label ? { label: 'right branch, lower' } : {}), domain: right },
        { expr: body, ...(label ? { label: 'left branch, upper' } : {}), domain: left }, { expr: `-${body}`, ...(label ? { label: 'left branch, lower' } : {}), domain: left },
      ];
    }
    const body = `sqrt(${t2}*(1+x^2/${c2}))`;
    return [{ expr: body, ...(label ? { label: 'upper branch' } : {}), domain: [-X, X] }, { expr: `-${body}`, ...(label ? { label: 'lower branch' } : {}), domain: [-X, X] }];
  }
  /** The two asymptotes y = +-m x as plot functions on [-X, X] (m is a decimal; used only for drawing). */
  asymptotes(X) {
    const m = Math.sqrt(this.slope2().num()), mm = numStr(m);
    return [{ expr: `${mm}*x`, label: 'asymptote', domain: [-X, X] }, { expr: `-${mm}*x`, label: 'asymptote', domain: [-X, X] }];
  }
}

// ================================================================ a conic from a focus, a directrix and e (PS = e PL), as a quadratic
const gcdB = (a, b) => (b === 0n ? (a < 0n ? -a : a) : gcdB(b, a % b));
/** (l^2 + m^2)((x - p)^2 + (y - q)^2) = e^2 (l x + m y + n)^2 as A x^2 + B xy + C y^2 + D x + E y + F = 0 with coprime integer coefficients. */
export function fdConic(S, line, e2) {
  const [p, q] = S.map((v) => fr(v)), [l, m, n] = line.map((v) => fr(v)), E2 = fr(e2), N = l.mul(l).add(m.mul(m));
  let co = [N.sub(E2.mul(l).mul(l)), E2.mul(-2).mul(l).mul(m), N.sub(E2.mul(m).mul(m)), N.mul(p).mul(-2).sub(E2.mul(2).mul(l).mul(n)), N.mul(q).mul(-2).sub(E2.mul(2).mul(m).mul(n)), N.mul(p.mul(p).add(q.mul(q))).sub(E2.mul(n).mul(n))];
  let lcm = 1n; for (const x of co) lcm = (lcm * x.d) / gcdB(lcm, x.d);
  co = co.map((x) => x.mul(new Fr(lcm)));
  let g = 0n; for (const x of co) g = gcdB(g, x.n);
  co = co.map((x) => x.div(new Fr(g || 1n)));
  const lead = co.find((x) => !x.isZero());
  if (lead.sign() < 0) co = co.map((x) => x.neg());
  return { A: co[0], B: co[1], C: co[2], D: co[3], E: co[4], F: co[5], S: [p, q], line: [l, m, n], e2: E2 };
}
/** Value of the quadratic at (x, y). */
export const quadAt = (c, x, y) => { x = fr(x); y = fr(y); return c.A.mul(x).mul(x).add(c.B.mul(x).mul(y)).add(c.C.mul(y).mul(y)).add(c.D.mul(x)).add(c.E.mul(y)).add(c.F); };
/** PS^2 - e^2 PL^2, scaled by (l^2 + m^2): zero exactly when PS = e PL. */
export const fdGap = (c, x, y) => { x = fr(x); y = fr(y); const [l, m, n] = c.line, N = l.mul(l).add(m.mul(m)), s = l.mul(x).add(m.mul(y)).add(n); return N.mul(x.sub(c.S[0]).mul(x.sub(c.S[0])).add(y.sub(c.S[1]).mul(y.sub(c.S[1])))).sub(c.e2.mul(s).mul(s)); };
export function quadTex(c) {
  let s = '';
  for (const [k, mono] of [[c.A, 'x^2'], [c.B, 'xy'], [c.C, 'y^2'], [c.D, 'x'], [c.E, 'y'], [c.F, '']]) {
    if (k.isZero()) continue;
    const neg = k.sign() < 0, a = k.abs(), coef = mono && a.eq(1) ? '' : a.tex();
    s += s === '' ? `${neg ? '-' : ''}${coef}${mono}` : ` ${neg ? '-' : '+'} ${coef}${mono}`;
  }
  return `${s} = 0`;
}
/** 'ellipse' | 'hyperbola' | 'parabola' from the discriminant B^2 - 4AC. */
export function quadKind(c) { const d = c.B.mul(c.B).sub(c.A.mul(c.C).mul(4)); return d.sign() < 0 ? 'ellipse' : d.sign() > 0 ? 'hyperbola' : 'parabola'; }
/** Upper and lower roots of C y^2 + (Bx + E) y + (Ax^2 + Dx + F) = 0 as plot functions, on the x-interval where the discriminant is positive (ellipse). */
export function quadHalves(c, label = true) {
  const A = c.A.num(), B = c.B.num(), C = c.C.num(), D = c.D.num(), E = c.E.num(), F = c.F.num();
  const qa = B * B - 4 * A * C, qb = 2 * B * E - 4 * C * D, qc = E * E - 4 * C * F;
  must(qa < 0, 'ellipse: the discriminant of the quadratic in y is negative at large x');
  const dd = Math.sqrt(qb * qb - 4 * qa * qc), x1 = (-qb + dd) / (2 * qa), x2 = (-qb - dd) / (2 * qa), lo = Math.min(x1, x2), hi = Math.max(x1, x2);
  const n = (v) => (v < 0 ? `(${v})` : String(v));
  const disc = `(${n(B)}*x+${n(E)})^2-4*${n(C)}*(${n(A)}*x^2+${n(D)}*x+${n(F)})`;
  const body = (sgn) => `(-(${n(B)}*x+${n(E)})${sgn}sqrt(${disc}))/(2*${n(C)})`;
  const dom = [r4(lo + EPS), r4(hi - EPS)];
  return [{ expr: body('+'), ...(label ? { label: 'upper half' } : {}), domain: dom }, { expr: body('-'), ...(label ? { label: 'lower half' } : {}), domain: dom }];
}
