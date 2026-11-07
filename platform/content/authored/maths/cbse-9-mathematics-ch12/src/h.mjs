// Helpers for CBSE 9 Mathematics ch12 Area and Perimeter: plane geometry on computed coordinates, and the formulas that every answer is
// recomputed with (Heron, Brahmagupta, the shoelace area, arc and sector measures with a stated value of pi).
import { geom } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const r4 = (v) => Math.round(v * 10000) / 10000;
/** Round to a number of decimal places (as a number). */
export const rd = (v, k = 2) => Math.round(v * 10 ** k) / 10 ** k;
const rad = (d) => (d * Math.PI) / 180;

export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const polar = (c, rr, deg) => [c[0] + rr * Math.cos(rad(deg)), c[1] + rr * Math.sin(rad(deg))];
export const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
/** Angle at V between rays VA and VB, in degrees (0 to 180). */
export function angleAt(V, A, B) {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
}
/** Area of a polygon (shoelace) from vertex coordinates. */
export const polyArea = (pts) => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
/** Distance from P to the line AB. */
export function lineDist(P, A, B) {
  const d = [B[0] - A[0], B[1] - A[1]];
  return Math.abs((P[0] - A[0]) * d[1] - (P[1] - A[1]) * d[0]) / Math.hypot(...d);
}
/** Circumcentre of three points (null if collinear). */
export function circumcentre(A, B, C) {
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
  if (Math.abs(d) < 1e-12) return null;
  const a2 = A[0] ** 2 + A[1] ** 2, b2 = B[0] ** 2 + B[1] ** 2, c2 = C[0] ** 2 + C[1] ** 2;
  return [(a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d, (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d];
}

// ---- the formulas under test
/** Heron's formula: area of a triangle from its three sides (NaN if the sides do not make a triangle). */
export function heron(a, b, c) {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}
/** Brahmagupta's formula: area of a cyclic quadrilateral from its four sides. */
export function brahma(a, b, c, d) {
  const s = (a + b + c + d) / 2;
  return Math.sqrt((s - a) * (s - b) * (s - c) * (s - d));
}
/** Triangle with BC = a on the x-axis, B at the origin: coordinates from the three sides (law of cosines). Returns { A, B, C }. */
export function triFromSides(a, b, c) {
  // sides: a = BC, b = CA, c = AB
  const x = (a * a + c * c - b * b) / (2 * a), y = Math.sqrt(Math.max(0, c * c - x * x));
  return { A: [x, y], B: [0, 0], C: [a, 0] };
}
/** Cyclic quadrilateral ABCD from sides AB = a, BC = b, CD = c, DA = d with diagonal AC = e found from the circle condition; returns the four points on a circle. */
export function cyclicFromSides(a, b, c, d) {
  // Ptolemy's two diagonals p = AC, q = BD satisfy p*q = a*c + b*d and p/q = (a*d + b*c)/(a*b + c*d); place A, then C on the x-axis.
  const pq = a * c + b * d, ratio = (a * d + b * c) / (a * b + c * d), p = Math.sqrt(pq * ratio);
  const A = [0, 0], C = [p, 0];
  const xB = (p * p + a * a - b * b) / (2 * p), yB = Math.sqrt(a * a - xB * xB);
  const xD = (p * p + d * d - c * c) / (2 * p), yD = -Math.sqrt(d * d - xD * xD);
  return { A, B: [xB, yB], C, D: [xD, yD] };
}

// ---- measures of circles with a stated pi
export const PI7 = 22 / 7, PI314 = 3.14;
export const circumference = (rr, pi) => 2 * pi * rr;
export const arcLen = (rr, deg, pi) => (deg / 360) * 2 * pi * rr;
export const circleArea = (rr, pi) => pi * rr * rr;
export const sectorArea = (rr, deg, pi) => (deg / 360) * pi * rr * rr;

/**
 * geom() with automatic fitting: all points are shifted so that they sit inside a canvas with margin m, and circles are included in
 * the extent, so figures can be written in natural coordinates (1 unit = 1 length unit when length labels are used).
 */
export function fig(spec, alt, caption, m = 0.6) {
  const at = (p) => (Array.isArray(p) ? p : p.at);
  const xs = [], ys = [];
  for (const p of Object.values(spec.points)) { const [x, y] = at(p); xs.push(x); ys.push(y); }
  for (const c of spec.circles ?? []) { const [x, y] = at(spec.points[c.center]); xs.push(x - c.radius, x + c.radius); ys.push(y - c.radius, y + c.radius); }
  const x0 = Math.min(...xs) - m, y0 = Math.min(...ys) - m;
  const points = {};
  for (const [k, p] of Object.entries(spec.points)) {
    const [x, y] = at(p), q = [r4(x - x0), r4(y - y0)];
    points[k] = Array.isArray(p) ? q : { ...p, at: q };
  }
  return geom({ ...spec, points, width: r4(Math.max(...xs) - x0 + m), height: r4(Math.max(...ys) - y0 + m) }, alt, caption);
}

/** Point spec: a point at coordinates p with a label position (label false hides the name). */
export const P = (p, pos, label) => ({ at: p, ...(pos ? { label_position: pos } : {}), ...(label !== undefined ? { label } : {}) });
const POS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
export const compass = (deg) => POS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
export function onC(c, rr, deg, label) {
  return { at: polar(c, rr, deg), label_position: compass(deg), ...(label !== undefined ? { label } : {}) };
}
/** An arc drawn as a polyline: adds hidden points `${id}0..${id}n` to `points` and returns the segment list. */
export function arcSegs(points, id, c, rr, from, to, n = 24) {
  const segs = [];
  for (let i = 0; i <= n; i++) points[`${id}${i}`] = P(polar(c, rr, from + ((to - from) * i) / n), undefined, false);
  for (let i = 0; i < n; i++) segs.push({ from: `${id}${i}`, to: `${id}${i + 1}` });
  return segs;
}
