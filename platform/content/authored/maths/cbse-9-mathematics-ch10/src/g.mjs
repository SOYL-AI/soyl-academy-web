// Triangle helpers for CBSE 9 Mathematics ch09: constructions from sides or angles, rigid moves (to draw congruent copies),
// feet of perpendiculars, and a classifier for the congruence criteria that the question banks use to re-solve their answers.
import { polar, lineInter, angleAt, dist, close } from './h.mjs';

/** Rotate a point about the origin by deg degrees. */
export function rotate(p, deg) {
  const t = (deg * Math.PI) / 180;
  return [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)];
}
/** Rotate every point by deg about the origin, then shift by (dx, dy): a rigid move (an exact copy). */
export const move = (pts, deg, dx, dy) => pts.map((p) => { const q = rotate(p, deg); return [q[0] + dx, q[1] + dy]; });
/** Mirror image in the y-axis, then rotate and shift: a rigid move that also turns the triangle over. */
export const flip = (pts, deg, dx, dy) => move(pts.map((p) => [-p[0], p[1]]), deg, dx, dy);
/** Triangle [A, B, C] with BC = a on the x-axis (B at the origin) and the angles at B and C given in degrees. */
export function triASA(a, Bd, Cd) {
  const B = [0, 0], C = [a, 0];
  return [lineInter(B, polar(B, 1, Bd), C, polar(C, 1, 180 - Cd)), B, C];
}
/** Triangle [A, B, C] with sides a = BC, b = CA, c = AB (B at the origin, C on the x-axis). */
export function triSSS(a, b, c) {
  const x = (a * a + c * c - b * b) / (2 * a);
  return [[x, Math.sqrt(c * c - x * x)], [0, 0], [a, 0]];
}
/** Foot of the perpendicular from P to the line AB. */
export function foot(P, A, B) {
  const d = [B[0] - A[0], B[1] - A[1]];
  const t = ((P[0] - A[0]) * d[0] + (P[1] - A[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return [A[0] + t * d[0], A[1] + t * d[1]];
}
/** The three sides [a, b, c] and the three angles [A, B, C] of triangle [A, B, C]. */
export function parts(T) {
  const [A, B, C] = T;
  return { sides: [dist(B, C), dist(C, A), dist(A, B)], angles: [angleAt(A, B, C), angleAt(B, C, A), angleAt(C, A, B)] };
}
/** True when two triangles [A, B, C] and [P, Q, R] have all six corresponding parts equal. */
export function sameParts(T1, T2, e = 1e-9) {
  const p = parts(T1), q = parts(T2);
  return p.sides.every((s, i) => close(s, q.sides[i], e)) && p.angles.every((s, i) => close(s, q.angles[i], e));
}
export const midpoint = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];

/**
 * Which congruence criterion do the equal parts give? Parts are named like this: sides 'a', 'b', 'c' (opposite the angles A, B, C)
 * and angles 'A', 'B', 'C'. Angle A lies between the sides b and c, angle B between a and c, angle C between a and b.
 * right = the vertex of a right angle that both triangles have (or null).
 * Returns 'SSS', 'SAS', 'ASA', 'AAS', 'RHS', or 'none' (for SSA, AAA, and fewer than three parts). ASA: the side lies between the two angles.
 */
export function criterion(equal, right = null) {
  if (right && !equal.includes(right)) equal = [...equal, right];
  const sides = equal.filter((x) => x === x.toLowerCase()), angles = equal.filter((x) => x === x.toUpperCase());
  if (right) {
    const hyp = right.toLowerCase();
    if (sides.includes(hyp) && sides.length >= 2 && !angles.some((g) => g !== right)) return 'RHS';
  }
  if (sides.length === 3) return 'SSS';
  if (sides.length === 2 && angles.length === 1) return sides.every((s) => s !== angles[0].toLowerCase()) ? 'SAS' : 'none';
  if (sides.length === 1 && angles.length === 2) return angles.includes(sides[0].toUpperCase()) ? 'AAS' : 'ASA';
  return 'none';
}
/** The lengths AC for the SSA data (angle A, AB = c, BC = a): the positive roots of AC^2 - 2c cos(A) AC + c^2 - a^2 = 0. */
export function ssaSides(Ad, c, a) {
  const b = 2 * c * Math.cos((Ad * Math.PI) / 180), k = c * c - a * a, D = b * b - 4 * k;
  if (D < -1e-9) return [];
  const s = Math.sqrt(Math.max(D, 0));
  return [...new Set([(b - s) / 2, (b + s) / 2].map((x) => Math.round(x * 1e9) / 1e9))].filter((x) => x > 1e-9).sort((x, y) => x - y);
}
/** Number of triangles with the SSA data (angle A, AB = c, BC = a): 0, 1 or 2. */
export const ssaCount = (Ad, c, a) => ssaSides(Ad, c, a).length;
