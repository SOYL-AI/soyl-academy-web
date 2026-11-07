// 4-gon helpers for CBSE 9 Mathematics ch10: vector arithmetic, classification of a 4-gon from its coordinates, symmetry counts,
// and the midpoint (Varignon) 4-gon. Every property that a table or an item states is computed here from coordinates.
import { dist, angleAt, polar, lineInter, close } from './h.mjs';

export const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
export const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
export const scale = (p, k) => [p[0] * k, p[1] * k];
export const dot = (p, q) => p[0] * q[0] + p[1] * q[1];
export const cross = (p, q) => p[0] * q[1] - p[1] * q[0];
export const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
export const centroid = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
/** Are the segments p1p2 and q1q2 parallel? */
export const par = (p1, p2, q1, q2, e = 1e-9) => Math.abs(cross(sub(p2, p1), sub(q2, q1))) < e;
/** Is the angle at V (between VA and VB) a right angle? */
export const rightAt = (V, A, B, e = 1e-9) => Math.abs(dot(sub(A, V), sub(B, V))) < e;
export const polyArea = (P) => Math.abs(P.reduce((s, p, i) => s + cross(p, P[(i + 1) % P.length]), 0)) / 2;

/** Properties of the 4-gon [A, B, C, D] (vertices in order), all computed from the coordinates. */
export function classify(P) {
  const [A, B, C, D] = P;
  const sides = [dist(A, B), dist(B, C), dist(C, D), dist(D, A)];
  const e = 1e-9;
  const oppPar = [par(A, B, D, C), par(B, C, A, D)];
  const allEq = sides.every((s) => close(s, sides[0], e));
  const right = rightAt(A, B, D) && rightAt(B, A, C) && rightAt(C, B, D) && rightAt(D, C, A);
  const o = (() => { const AC = sub(C, A), BD = sub(D, B); const t = cross(sub(B, A), BD) / cross(AC, BD); return add(A, scale(AC, t)); })();
  const diag = { AC: dist(A, C), BD: dist(B, D), equal: close(dist(A, C), dist(B, D), e), perpendicular: rightAt([0, 0], sub(C, A), sub(D, B)) };
  return {
    sides, oppPar, o, diag,
    trapezium: oppPar[0] || oppPar[1],
    exactlyOnePair: oppPar[0] !== oppPar[1],
    parallelogram: oppPar[0] && oppPar[1],
    rhombus: oppPar[0] && oppPar[1] && allEq,
    rectangle: oppPar[0] && oppPar[1] && right,
    square: oppPar[0] && oppPar[1] && allEq && right,
    kite: (close(sides[0], sides[3], e) && close(sides[1], sides[2], e)) || (close(sides[0], sides[1], e) && close(sides[2], sides[3], e)),
    oppSidesEqual: close(sides[0], sides[2], e) && close(sides[1], sides[3], e),
    oppAnglesEqual: close(angleAt(A, B, D), angleAt(C, B, D), 1e-7) && close(angleAt(B, A, C), angleAt(D, A, C), 1e-7),
    diagBisect: close(dist(A, o), dist(o, C), 1e-7) && close(dist(B, o), dist(o, D), 1e-7),
  };
}

/** Number of lines of symmetry and the order of rotational symmetry of a convex polygon given by its vertices. */
export function symmetries(P) {
  const c = centroid(P);
  const same = (Q) => Q.every((q) => P.some((p) => dist(p, q) < 1e-7));
  const rotate = (p, deg) => { const t = (deg * Math.PI) / 180, v = sub(p, c); return add(c, [v[0] * Math.cos(t) - v[1] * Math.sin(t), v[0] * Math.sin(t) + v[1] * Math.cos(t)]); };
  const reflect = (p, deg) => { const t = (2 * deg * Math.PI) / 180, v = sub(p, c); return add(c, [v[0] * Math.cos(t) + v[1] * Math.sin(t), v[0] * Math.sin(t) - v[1] * Math.cos(t)]); };
  let lines = 0;
  for (let k = 0; k < 360; k++) if (same(P.map((p) => reflect(p, k / 2)))) lines++;
  let order = 1;
  for (let k = 2; k <= 8; k++) if (same(P.map((p) => rotate(p, 360 / k)))) order = k;
  return { lines, order, centre: c };
}
/** Does reflecting the vertices in the line through a point with direction (deg) map the vertex set to itself? */
export function reflectsOnto(P, through, deg) {
  const t = (2 * deg * Math.PI) / 180;
  const R = (p) => { const v = sub(p, through); return add(through, [v[0] * Math.cos(t) + v[1] * Math.sin(t), v[0] * Math.sin(t) - v[1] * Math.cos(t)]); };
  return P.every((p) => P.some((q) => dist(q, R(p)) < 1e-7));
}

/** The 4-gon formed by the midpoints of the sides of [A, B, C, D]: [P, Q, R, S] = midpoints of AB, BC, CD, DA. */
export const varignon = (P) => P.map((p, i) => mid(p, P[(i + 1) % 4]));
/** Intersection point of the lines AC and BD of a 4-gon. */
export const diagCross = (P) => lineInter(P[0], P[2], P[1], P[3]);

/** The 4-gon with angles A = 80, B = 95, C = 70 and D = 115 (sum 360), AB = 5 and BC = 4; all four angles are computed. */
export function quad80() {
  const A = [0, 0], B = [5, 0], C = polar(B, 4, 85);
  const D = lineInter(A, polar(A, 1, 80), C, polar(C, 1, 195));
  return [A, B, C, D];
}
