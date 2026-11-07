// Helpers for CBSE 9 Mathematics ch07 Introduction to Euclid's Geometry: Axioms and Postulates.
// Plane geometry on computed coordinates (circle intersections, angles), a figure builder that fits every figure to its
// canvas, and the small fact tables (postulates, common notions, ratios) that the items look their answers up in.
import { geom, round3 } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(6)));
export const T$ = (v) => `$${fx(v)}$`;
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const r4 = (v) => Math.round(v * 10000) / 10000;

// ---- plane geometry
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const polar = (c, rad, deg) => [c[0] + rad * Math.cos((deg * Math.PI) / 180), c[1] + rad * Math.sin((deg * Math.PI) / 180)];
/** Angle at V between rays VA and VB, in degrees. */
export function angleAt(V, A, B) {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
}
/** The two intersection points of circles (c1, r1) and (c2, r2): [upper, lower] by y (or by x when the centres share a y). */
export function circInter(c1, r1, c2, r2) {
  const d = dist(c1, c2);
  must(d <= r1 + r2 + 1e-9 && d >= Math.abs(r1 - r2) - 1e-9, 'circles meet');
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const mx = c1[0] + (a * (c2[0] - c1[0])) / d, my = c1[1] + (a * (c2[1] - c1[1])) / d;
  const p = [mx + (h * (c2[1] - c1[1])) / d, my - (h * (c2[0] - c1[0])) / d], q = [mx - (h * (c2[1] - c1[1])) / d, my + (h * (c2[0] - c1[0])) / d];
  return p[1] >= q[1] ? [p, q] : [q, p];
}
/** Intersection of line p1p2 with line p3p4, or null if parallel. */
export function lineInter(p1, p2, p3, p4) {
  const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [p4[0] - p3[0], p4[1] - p3[1]];
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((p3[0] - p1[0]) * d2[1] - (p3[1] - p1[1]) * d2[0]) / den;
  return [p1[0] + t * d1[0], p1[1] + t * d1[1]];
}

/**
 * geom() with automatic fitting: all points (and circles) are shifted so that they sit inside a canvas with margin m,
 * so figures can be written in natural coordinates. Angles, equal-length marks and labels are unaffected.
 */
export function fig(spec, alt, caption, m = 0.55) {
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

/** Rectangles [x0, y0, x1, y1, label, highlight] drawn to scale as filled polygons with their labels at the centres. */
export function rectFig({ rects, sides = [], margin = 1.2, notToScale = true }, alt, caption) {
  const pts = {}, polygons = [];
  const names = new Map();
  const key = (x, y) => `${round3(x)}_${round3(y)}`;
  const nm = (x, y) => { const k = key(x, y); if (!names.has(k)) { names.set(k, `P${names.size}`); pts[names.get(k)] = { at: [round3(x + margin), round3(y + margin)], label: false }; } return names.get(k); };
  rects.forEach(([x0, y0, x1, y1, label, hl], i) => {
    polygons.push({ vertices: [nm(x0, y0), nm(x1, y0), nm(x1, y1), nm(x0, y1)], fill: true, highlight: hl ?? (i % 2 ? 'shade' : 'accent') });
    pts[`C${i}`] = { at: [round3((x0 + x1) / 2 + margin), round3((y0 + y1) / 2 + margin)], label };
  });
  sides.forEach(([x, y, text], i) => { pts[`S${i}`] = { at: [round3(x + margin), round3(y + margin)], label: text }; });
  const xs = rects.flatMap((q) => [q[0], q[2]]), ys = rects.flatMap((q) => [q[1], q[3]]);
  const W = Math.max(...xs, ...sides.map((s) => s[0])) + 2 * margin, H = Math.max(...ys, ...sides.map((s) => s[1])) + 2 * margin;
  return geom({ width: round3(W), height: round3(H), points: pts, polygons, ...(notToScale ? { not_to_scale: true } : {}) }, alt, caption);
}
export const area = ([x0, y0, x1, y1]) => (x1 - x0) * (y1 - y0);

// ---- fact tables the items look their answers up in (paraphrased; no reproduced textbook wording)
export const POSTULATES = {
  1: 'A straight line can be drawn from any one point to any other point.',
  2: 'A line segment can be extended as far as we like in a straight line.',
  3: 'A circle can be drawn with any point as centre and any length as radius.',
  4: 'All right angles are equal to one another.',
  5: 'If a line crossing two lines makes the interior angles on one side add up to less than two right angles, the two lines meet on that side when extended.',
};
export const NOTIONS = {
  1: 'Things that are equal to the same thing are equal to one another.',
  2: 'If equals are added to equals, the wholes are equal.',
  3: 'If equals are taken from equals, the remainders are equal.',
  4: 'Things that coincide with one another are equal to one another.',
  5: 'The whole is greater than the part.',
};
/** Brick ratio length : breadth : thickness = 4 : 2 : 1 (Harappan bricks), from the thickness t. */
export const brick = (t) => ({ l: 4 * t, b: 2 * t, t, vol: 4 * t * 2 * t * t });
/** Right-triangle hypotenuse from the legs. */
export const hyp = (a, b) => Math.sqrt(a * a + b * b);
