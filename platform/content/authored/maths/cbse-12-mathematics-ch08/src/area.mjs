// CBSE 12 Mathematics ch08 helpers: an independent numeric integrator (composite Simpson) for the
// re-solve checks, and a builder for shaded-region geometry figures computed from the curve itself.
import { geom, round3 } from '../../cbse-12-mathematics-ch01/src/lib.mjs';

/** Square root that never returns NaN for a tiny negative rounding error at a domain end. */
export const sq = (v) => Math.sqrt(Math.max(0, v));
/** Composite Simpson's rule with n (even) panels. Accurate to about 1e-7 here even with √ end points. */
export function simpson(g, a, b, n = 200000) {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * g(a + (h * k));
  return (s * h) / 3;
}
/** Area between a curve and the x-axis: integral of |g|. */
export const areaAbs = (g, a, b, n) => simpson((x) => Math.abs(g(x)), a, b, n);
export const close = (u, v, tol = 1e-5) => Math.abs(u - v) <= tol * Math.max(1, Math.abs(v));
export const round2 = (v) => Math.round(v * 100) / 100;
export const P = Math.PI;
export const S3 = Math.sqrt(3);

/**
 * Shaded region figure in maths coordinates.
 * view: [x0, x1, y0, y1] maths window; s: drawing units per maths unit.
 * curves: arrays of [x, y] polylines (drawn as segments); region: [x, y] polygon (shaded);
 * marks: [x, y, label, position] labelled points; dashed: [[x, y], [x, y]] dashed segments (limits).
 */
export function regionFig({ view, s, curves = [], region = null, regions = [], marks = [], dashed = [] }, alt, caption) {
  const [x0, x1, y0, y1] = view;
  const X = (x) => round3((x - x0) * s);
  const Y = (y) => round3((y - y0) * s);
  const points = {};
  const segments = [];
  const polygons = [];
  let id = 0;
  const pt = (x, y, label = false, label_position) => {
    const k = `P${id++}`;
    points[k] = label === false ? { at: [X(x), Y(y)], label: false } : { at: [X(x), Y(y)], label, ...(label_position ? { label_position } : {}) };
    return k;
  };
  // axes
  if (y0 <= 0 && y1 >= 0) segments.push({ from: pt(x0, 0), to: pt(x1, 0) });
  if (x0 <= 0 && x1 >= 0) segments.push({ from: pt(0, y0), to: pt(0, y1) });
  for (const reg of region ? [region, ...regions] : regions) polygons.push({ vertices: reg.map(([x, y]) => pt(x, y)), fill: true, highlight: 'shade' });
  for (const c of curves) {
    const ks = c.map(([x, y]) => pt(x, y));
    for (let i = 1; i < ks.length; i++) segments.push({ from: ks[i - 1], to: ks[i] });
  }
  for (const [p, q] of dashed) segments.push({ from: pt(...p), to: pt(...q), dashed: true });
  for (const [x, y, label, pos] of marks) pt(x, y, label, pos);
  for (const p of Object.values(points)) {
    const [u, v] = p.at;
    if (u < -1e-9 || v < -1e-9 || u > X(x1) + 1e-9 || v > Y(y1) + 1e-9) throw new Error(`regionFig: point (${u}, ${v}) off the canvas`);
  }
  return geom({ width: X(x1), height: Y(y1), points, segments, polygons, not_to_scale: false }, alt, caption);
}
/** Sample y = g(x) on [a, b] as a polyline of n + 1 points. */
export const sample = (g, a, b, n = 40) => Array.from({ length: n + 1 }, (_, k) => { const x = a + ((b - a) * k) / n; return [x, g(x)]; });
/** Sample x = h(y) on [c, d]. */
export const sampleY = (h, c, d, n = 40) => Array.from({ length: n + 1 }, (_, k) => { const y = c + ((d - c) * k) / n; return [h(y), y]; });
