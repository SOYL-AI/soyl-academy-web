// Helpers for CBSE 9 Mathematics ch11 Circles: plane geometry on computed coordinates. Every angle and length quoted in a figure,
// a slide or an answer is computed from coordinates here; figures are fitted to a canvas that includes the circles they draw.
import { geom } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const r4 = (v) => Math.round(v * 10000) / 10000;
const rad = (d) => (d * Math.PI) / 180;

export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const polar = (c, rr, deg) => [c[0] + rr * Math.cos(rad(deg)), c[1] + rr * Math.sin(rad(deg))];
export const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
/** Angle at V between rays VA and VB, in degrees (0 to 180). */
export function angleAt(V, A, B) {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
}
/** Intersection of line p1p2 with line p3p4, or null if parallel. */
export function lineInter(p1, p2, p3, p4) {
  const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [p4[0] - p3[0], p4[1] - p3[1]];
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((p3[0] - p1[0]) * d2[1] - (p3[1] - p1[1]) * d2[0]) / den;
  return [p1[0] + t * d1[0], p1[1] + t * d1[1]];
}
/** Circumcentre of three points: intersection of two perpendicular bisectors (null if collinear). */
export function circumcentre(A, B, C) {
  const m1 = mid(A, B), m2 = mid(B, C);
  const n1 = [-(B[1] - A[1]), B[0] - A[0]], n2 = [-(C[1] - B[1]), C[0] - B[0]];
  return lineInter(m1, [m1[0] + n1[0], m1[1] + n1[1]], m2, [m2[0] + n2[0], m2[1] + n2[1]]);
}
/** Foot of the perpendicular from P to the line AB. */
export function foot(P, A, B) {
  const d = [B[0] - A[0], B[1] - A[1]], t = ((P[0] - A[0]) * d[0] + (P[1] - A[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return [A[0] + t * d[0], A[1] + t * d[1]];
}
/** Distance from P to the line AB. */
export const lineDist = (P, A, B) => dist(P, foot(P, A, B));
/** Smaller angle between two directions (degrees). */
export const gap = (u, v) => { const d = Math.abs(u - v) % 360; return d > 180 ? 360 - d : d; };
/** Inscribed angle (degrees) at P on the circle, standing on chord AB. */
export const inscribed = (P, A, B) => angleAt(P, A, B);
/** Area of a polygon (shoelace) from vertex coordinates. */
export const polyArea = (pts) => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
/** True when the point lies on the circle (centre c, radius rr). */
export const onCircle = (P, c, rr, e = 1e-9) => Math.abs(dist(P, c) - rr) < e;

/**
 * geom() with automatic fitting: all points are shifted so that they sit inside a canvas with margin m, and circles are included in
 * the extent, so figures can be written in natural coordinates (1 unit = 1 cm when length labels are used).
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
/** Point on a circle at polar angle deg, labelled outside along the same direction. */
const POS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
export const compass = (deg) => POS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
export function onC(c, rr, deg, label) {
  return { at: polar(c, rr, deg), label_position: compass(deg), ...(label !== undefined ? { label } : {}) };
}
