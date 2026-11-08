// Exact coordinate-geometry helpers for ISC 11 Mathematics ch11 Straight Lines, on top of ln.mjs (exact line engine, a copy of the
// CBSE 11 ch09 module) and fr.mjs (exact fractions). Everything here is computed with Fr and each result is cross-checked by a
// second, independent route before it is returned:
//   * section formula (internal and external): the point is collinear with A and B, n^2 AP^2 = m^2 PB^2 holds exactly, it lies
//     between A and B (internal) or outside the segment (external), and the parameter form A + t(B - A) gives the same point;
//   * area: the determinant form, the cross product, and (1/2) base x height from the exact distance of the apex to the base line;
//   * incentre: weighted by integer side lengths; it is at equal exact distance from the three side lines, that distance equals
//     area / semi-perimeter, and the three sub-triangle areas add up to the whole triangle;
//   * shifting the origin: the shifted equation holds for shifted copies of points of the line;
//   * angle bisectors: both lines are exact and through the meeting point, points of each bisector are at equal exact distance
//     from the two lines, the two bisectors are perpendicular, and the half-angle is confirmed with atan2;
//   * pencils L + lambda M = 0: each member passes through the meeting point and the lambda found meets the stated condition.
import { Fr, F, ct, tx, eqTex, mid, pt, same, d2, line, val, on, sameLine, slopeOf, join, through, meet, isPerp, isParallel, angleBetween, dist, anyPoint, must, isqrt, sqFactor, xAt, yAt } from './ln.mjs';
export * from './ln.mjs';

const fr = (v) => Fr.of(v);
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const P = (x, y) => pt(x, y);
/** Line key for comparing lines typed independently. */
export const K = (L) => `${L.a},${L.b},${L.c}`;
export const cross = (A, B, C) => B[0].sub(A[0]).mul(C[1].sub(A[1])).sub(B[1].sub(A[1]).mul(C[0].sub(A[0])));
const dot = (A, P0, B) => A[0].sub(P0[0]).mul(B[0].sub(P0[0])).add(A[1].sub(P0[1]).mul(B[1].sub(P0[1])));
export const len2 = (p, q) => d2(p, q);
/** Integer length of a segment (must be a whole number). */
export function ilen(p, q) { const s = isqrt(d2(p, q).n); must(d2(p, q).d === 1 && s !== null, 'integer length'); return s; }

// ---------------------------------------------------------------- section formula
/** P on AB with AP : PB = m : n (m, n > 0), internal. */
export function divide(A, B, m, n) {
  m = fr(m); n = fr(n);
  must(m.sign() > 0 && n.sign() > 0, 'internal division needs positive ratio terms');
  const s = m.add(n);
  const P0 = pt(m.mul(B[0]).add(n.mul(A[0])).div(s), m.mul(B[1]).add(n.mul(A[1])).div(s));
  must(cross(A, B, P0).isZero(), 'internal point is collinear');
  must(d2(A, P0).mul(n).mul(n).eq(d2(P0, B).mul(m).mul(m)), 'n^2 AP^2 = m^2 PB^2');
  must(dot(A, P0, B).sign() < 0, 'internal point lies between A and B');
  const t = m.div(s), Q0 = pt(A[0].add(t.mul(B[0].sub(A[0]))), A[1].add(t.mul(B[1].sub(A[1]))));
  must(same(P0, Q0), 'parameter form A + t(B - A)');
  return P0;
}
/** P on line AB, outside the segment, with AP : PB = m : n (m != n, positive), external. */
export function divideExt(A, B, m, n) {
  m = fr(m); n = fr(n);
  must(m.sign() > 0 && n.sign() > 0 && !m.eq(n), 'external division needs unequal positive terms');
  const s = m.sub(n);
  const P0 = pt(m.mul(B[0]).sub(n.mul(A[0])).div(s), m.mul(B[1]).sub(n.mul(A[1])).div(s));
  must(cross(A, B, P0).isZero(), 'external point is collinear');
  must(d2(A, P0).mul(n).mul(n).eq(d2(P0, B).mul(m).mul(m)), 'n^2 AP^2 = m^2 PB^2 (external)');
  must(dot(A, P0, B).sign() > 0, 'external point lies outside the segment');
  const t = m.div(s), Q0 = pt(A[0].add(t.mul(B[0].sub(A[0]))), A[1].add(t.mul(B[1].sub(A[1]))));
  must(same(P0, Q0), 'parameter form A + t(B - A), t = m/(m - n)');
  return P0;
}
/** The ratio in which the line L cuts AB: lambda = AP/PB (positive: internal, negative: external; null if parallel). */
export function cutRatio(A, B, L) {
  const va = val(L, A), vb = val(L, B);
  if (vb.isZero()) return null;
  const lam = va.neg().div(vb);
  if (lam.eq(-1)) return null; // parallel to AB
  const P0 = pt(A[0].add(lam.mul(B[0])).div(lam.add(1)), A[1].add(lam.mul(B[1])).div(lam.add(1)));
  must(on(L, P0) && cross(A, B, P0).isZero(), 'cut point lies on L and AB');
  must((va.sign() * vb.sign() < 0) === (lam.sign() > 0), 'internal exactly when A and B are on opposite sides of L');
  return { lam, P: P0, internal: lam.sign() > 0 };
}

// ---------------------------------------------------------------- area, collinearity, incentre
export function area(A, B, C) {
  const s = A[0].mul(B[1].sub(C[1])).add(B[0].mul(C[1].sub(A[1]))).add(C[0].mul(A[1].sub(B[1])));
  const v = s.abs().div(2);
  must(cross(A, B, C).abs().div(2).eq(v), 'area: determinant and cross product agree');
  if (!v.isZero() && !same(B, C)) {
    const h = dist(join(B, C), A);
    must(d2(B, C).mul(h.sq).div(4).eq(v.mul(v)), 'area by (1/2) base x height');
  }
  return v;
}
export const collinear = (A, B, C) => area(A, B, C).isZero();
export function incentre(A, B, C) {
  const a = ilen(B, C), b = ilen(C, A), c = ilen(A, B), s = a + b + c;
  const I = pt(fr(a).mul(A[0]).add(fr(b).mul(B[0])).add(fr(c).mul(C[0])).div(s), fr(a).mul(A[1]).add(fr(b).mul(B[1])).add(fr(c).mul(C[1])).div(s));
  const ar = area(A, B, C), rin = ar.mul(2).div(s);
  const dd = [join(B, C), join(C, A), join(A, B)].map((L) => dist(L, I).sq);
  must(dd.every((q) => q.eq(rin.mul(rin))), 'incentre is at equal distance r from the three sides, r = area / s');
  must(area(I, B, C).add(area(I, C, A)).add(area(I, A, B)).eq(ar), 'incentre lies inside the triangle');
  return { I, a, b, c, s, area: ar, r: rin };
}

// ---------------------------------------------------------------- shifting the origin
/** New origin (h, k): X = x - h, Y = y - k. Returns the raw coefficients [a, b, c'] with c' = ah + bk + c, and the normalised line. */
export function shiftLine(L, h, k) {
  h = fr(h); k = fr(k);
  const c2 = fr(L.c).add(fr(L.a).mul(h)).add(fr(L.b).mul(k));
  const N = line(L.a, L.b, c2);
  const p0 = anyPoint(L), p1 = L.b !== 0 ? pt(p0[0].add(1), yAt(L, p0[0].add(1))) : pt(p0[0], p0[1].add(1));
  for (const p of [p0, p1]) must(on(L, p) && on(N, pt(p[0].sub(h), p[1].sub(k))), 'shifted copy of a point of the line lies on the shifted equation');
  return { raw: [L.a, L.b, c2.num()], N };
}
/** Coordinates in the new system. */
export const shiftPt = (p, h, k) => pt(p[0].sub(h), p[1].sub(k));

// ---------------------------------------------------------------- angle with a given line
/** The two lines through p that make an angle with tan = t (t > 0, rational) with the line L (non-vertical). */
export function linesAtAngle(p, L, t) {
  t = fr(t); const m = slopeOf(L);
  must(m !== null && t.sign() > 0, 'angle set-up');
  const out = [];
  for (const sg of [1, -1]) {
    const den = fr(1).sub(m.mul(t).mul(sg)), num = m.add(t.mul(sg));
    const Lm = den.isZero() ? through(p, null) : through(p, num.div(den));
    const ab = angleBetween(Lm, L);
    must(ab.tan !== null && ab.tan.eq(t), 'the line makes the stated angle with L');
    out.push(Lm);
  }
  return out;
}

// ---------------------------------------------------------------- angle bisectors
/**
 * The two bisectors of the angles between L and M (intersecting lines) when the ratio of the norms sqrt(a^2 + b^2) is rational.
 * plus: s1 = s2 (the bisector of the angle that contains the origin when c1, c2 > 0), minus: s1 = -s2.
 */
export function bisectors(L, M) {
  const P0 = meet(L, M);
  must(P0 !== null, 'bisectors need intersecting lines');
  const n1 = L.a * L.a + L.b * L.b, n2 = M.a * M.a + M.b * M.b;
  const [s1, t1] = sqFactor(n1), [s2, t2] = sqFactor(n2);
  must(t1 === t2, 'the norms must be rational multiples of each other');
  // sqrt(n1) = s1 sqrt(t), sqrt(n2) = s2 sqrt(t): s1 : s2 is the norm ratio
  const plus = line(fr(s2).mul(L.a).sub(fr(s1).mul(M.a)), fr(s2).mul(L.b).sub(fr(s1).mul(M.b)), fr(s2).mul(L.c).sub(fr(s1).mul(M.c)));
  const minus = line(fr(s2).mul(L.a).add(fr(s1).mul(M.a)), fr(s2).mul(L.b).add(fr(s1).mul(M.b)), fr(s2).mul(L.c).add(fr(s1).mul(M.c)));
  for (const B of [plus, minus]) {
    must(on(B, P0), 'bisector passes through the meeting point');
    const q1 = anyPoint(B), q2 = B.b !== 0 ? pt(q1[0].add(1), yAt(B, q1[0].add(1))) : pt(q1[0], q1[1].add(1));
    for (const q of [q1, q2]) must(dist(L, q).sq.eq(dist(M, q).sq), 'points of the bisector are equidistant from the two lines');
  }
  must(isPerp(plus, minus), 'the two bisectors are perpendicular');
  must(!sameLine(plus, minus), 'distinct bisectors');
  return { plus, minus, P: P0, s1, s2 };
}
/** Does B bisect the acute angle between L and M? (the angle between B and L is below 45 degrees) */
export function bisectsAcute(B, L) {
  const ab = angleBetween(B, L);
  return ab.acute < 45 - 1e-9;
}
/** Orient L and M so that their constants are positive (nonzero constants only). */
export function orient(L) { return L.c < 0 ? line(-L.a, -L.b, -L.c) : L; }

// ---------------------------------------------------------------- pencil L + lambda M = 0
export function pencil(L, M, lam) {
  lam = fr(lam);
  const N = line(fr(L.a).add(lam.mul(M.a)), fr(L.b).add(lam.mul(M.b)), fr(L.c).add(lam.mul(M.c)));
  const P0 = meet(L, M);
  if (P0) must(on(N, P0), 'pencil member passes through the meeting point');
  return N;
}
/** lambda with L + lambda M = 0 passing through p (needs M(p) != 0). */
export function lamThrough(L, M, p) {
  const m = val(M, p);
  must(!m.isZero(), 'point on M: no finite lambda');
  const lam = val(L, p).neg().div(m);
  must(on(pencil(L, M, lam), p), 'the member passes through the point');
  return lam;
}

/** Option texts. */
export const T = (L) => `$${eqTex(L)}$`;
export const Tp = (p) => `$${ct(p)}$`;
export const N$ = (v) => `$${tx(v)}$`;
export const nv = (x) => (x instanceof Fr ? x.num() : Number(x));
