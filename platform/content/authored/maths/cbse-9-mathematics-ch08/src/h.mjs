// Helpers for CBSE 9 Mathematics ch08 Lines and Angles: plane geometry on computed coordinates, direction-based angle
// calculation (every angle-chasing answer is computed from the ray directions, not typed), and builders for the standard figures
// (two crossing lines, parallel lines with a transversal, rays around a point).
import { geom } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(6)));
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const r4 = (v) => Math.round(v * 10000) / 10000;
const rad = (d) => (d * Math.PI) / 180;

// ---- plane geometry
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const polar = (c, rr, deg) => [c[0] + rr * Math.cos(rad(deg)), c[1] + rr * Math.sin(rad(deg))];
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
/** Smaller angle between two ray directions (degrees). */
export const gap = (u, v) => { const d = Math.abs(u - v) % 360; return d > 180 ? 360 - d : d; };
/** Anticlockwise turn from direction u to direction v, in [0, 360). */
export const turn = (u, v) => (((v - u) % 360) + 360) % 360;

/**
 * Parallel lines l (upper) and m (lower) cut by a transversal that makes the angle alpha with them. Each ray at P (on l) and at Q
 * (on m) has a direction; the eight angles are computed from those directions:
 *   at P: 1 = (T, W), 2 = (T, E), 3 = (E, B), 4 = (B, W);   at Q: 5 = (T, W), 6 = (T, E), 7 = (E, B), 8 = (B, W)
 * where E is to the right along the line, W to the left, T up the transversal and B down it.
 * Corresponding: (1,5) (2,6) (3,7) (4,8). Alternate interior: (3,5) (4,6). Co-interior: (3,6) (4,5). Vertically opposite: (1,3) (2,4) (5,7) (6,8).
 */
export function eight(alpha) {
  const R = { E: 0, W: 180, T: alpha, B: alpha + 180 };
  const pairs = [['T', 'W'], ['T', 'E'], ['E', 'B'], ['B', 'W']];
  const o = {};
  [0, 4].forEach((k) => pairs.forEach(([p, q], i) => { o[k + i + 1] = gap(R[p], R[q]); }));
  return o;
}
export const CORR = [[1, 5], [2, 6], [3, 7], [4, 8]], ALT = [[3, 5], [4, 6]], COIN = [[3, 6], [4, 5]], VERT = [[1, 3], [2, 4], [5, 7], [6, 8]];

/**
 * geom() with automatic fitting: all points are shifted so that they sit inside a canvas with margin m, so figures can be
 * written in natural coordinates. Angles, marks and labels are unaffected.
 */
export function fig(spec, alt, caption, m = 0.6) {
  const at = (p) => (Array.isArray(p) ? p : p.at);
  const xs = [], ys = [];
  for (const p of Object.values(spec.points)) { const [x, y] = at(p); xs.push(x); ys.push(y); }
  const x0 = Math.min(...xs) - m, y0 = Math.min(...ys) - m;
  const points = {};
  for (const [k, p] of Object.entries(spec.points)) {
    const [x, y] = at(p), q = [r4(x - x0), r4(y - y0)];
    points[k] = Array.isArray(p) ? q : { ...p, at: q };
  }
  return geom({ ...spec, points, width: r4(Math.max(...xs) - x0 + m), height: r4(Math.max(...ys) - y0 + m) }, alt, caption);
}

/** Two parallel lines and a transversal. sel: [[angle number 1-8, label, arcs?]]; names: label the lines l, m and t. */
export function transFig(alpha, sel, alt, caption, { h = 3.2, long = 3.4 } = {}) {
  const dir = [Math.cos(rad(alpha)), Math.sin(rad(alpha))];
  const Q = [0, 0], P = [h / Math.tan(rad(alpha)), h];
  const pts = {
    P: { at: P, label: false }, Q: { at: Q, label: false },
    Pl: { at: [P[0] - long, h], label: false }, Pr: { at: [P[0] + long, h], label: 'l', label_position: 'ne' },
    Ql: { at: [-long, 0], label: false }, Qr: { at: [long, 0], label: 'm', label_position: 'se' },
    Tt: { at: [P[0] + 1.1 * dir[0], h + 1.1 * dir[1]], label: 't', label_position: 'ne' }, Tb: { at: [-1.1 * dir[0], -1.1 * dir[1]], label: false },
  };
  const at = { 1: ['P', 'Tt', 'Pl'], 2: ['P', 'Tt', 'Pr'], 3: ['P', 'Pr', 'Q'], 4: ['P', 'Q', 'Pl'], 5: ['Q', 'P', 'Ql'], 6: ['Q', 'P', 'Qr'], 7: ['Q', 'Qr', 'Tb'], 8: ['Q', 'Tb', 'Ql'] };
  const angles = sel.map(([i, label, arcs]) => ({ at: at[i][0], from: at[i][1], to: at[i][2], label, ...(arcs ? { arcs } : {}) }));
  return fig({
    points: pts,
    segments: [{ from: 'Pl', to: 'Pr', arrows: 1 }, { from: 'Ql', to: 'Qr', arrows: 1 }, { from: 'Tb', to: 'Tt' }],
    angles,
  }, alt, caption);
}

/** Two lines AB and CD crossing at O; B at direction t1 and C at direction t2 (t1 < t2 < t1 + 180). sel: [[name BOC | COA | AOD | DOB, label, arcs?]]. */
export function crossFig(t1, t2, sel, alt, caption) {
  const O = [0, 0];
  const pts = { O: { at: O, label_position: 's' }, B: { at: polar(O, 3, t1), label_position: 'e' }, A: { at: polar(O, 3, t1 + 180), label_position: 'w' }, C: { at: polar(O, 3, t2), label_position: 'n' }, D: { at: polar(O, 3, t2 + 180), label_position: 's' } };
  const names = { BOC: ['B', 'C'], COA: ['C', 'A'], AOD: ['A', 'D'], DOB: ['D', 'B'] };
  return fig({
    points: pts,
    segments: [{ from: 'A', to: 'B' }, { from: 'C', to: 'D' }],
    angles: sel.map(([n, label, arcs]) => ({ at: 'O', from: names[n][0], to: names[n][1], label, ...(arcs ? { arcs } : {}) })),
  }, alt, caption);
}
/** The four angles of a crossing, computed from the directions. */
export function crossAngles(t1, t2) {
  return { BOC: gap(t1, t2), COA: gap(t2, t1 + 180), AOD: gap(t1 + 180, t2 + 180), DOB: gap(t2 + 180, t1) };
}

/** Rays from O at the given directions (degrees); angles between consecutive rays labelled. labels: array of strings (same length as dirs). */
export function aroundFig(dirs, labels, names, alt, caption, { len = 2.6 } = {}) {
  const O = [0, 0], pts = { O: { at: O, label: false } };
  dirs.forEach((d, i) => { pts[names[i]] = { at: polar(O, len, d), label_position: ['e', 'n', 'w', 's'][i % 4] }; });
  return fig({
    points: pts,
    segments: dirs.map((_, i) => ({ from: 'O', to: names[i] })),
    angles: dirs.map((_, i) => ({ at: 'O', from: names[i], to: names[(i + 1) % dirs.length], label: labels[i] })),
  }, alt, caption);
}
