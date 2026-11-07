// Helpers for CBSE 9 Mathematics ch14 Statistics: grouping, tallies, weighted means and frequency density (the formulas every answer is
// recomputed with), and chart drawings on computed coordinates (bar graphs, stacked bars, histograms with equal or unequal widths, with
// an optional frequency polygon laid over them) built with geom().
import { geom } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const r4 = (v) => Math.round(v * 10000) / 10000;
export const rd = (v, k = 2) => Math.round(v * 10 ** k) / 10 ** k;
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
export const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

// ---- the statistics under test
/** Simple mean of a list. */
export const mean = (xs) => sum(xs) / xs.length;
/** Weighted mean of values with weights. */
export const wmean = (vals, wts) => sum(vals.map((v, i) => v * wts[i])) / sum(wts);
/** Frequencies of a list of values in the classes [e0, e1), [e1, e2), ... (lower limit included, upper limit excluded). */
export const groupFreq = (data, edges) => edges.slice(0, -1).map((lo, i) => data.filter((v) => v >= lo && v < edges[i + 1]).length);
/** Frequencies of each distinct value of `vals` in the data. */
export const countEach = (data, vals) => vals.map((v) => data.filter((x) => x === v).length);
/** Class marks (mid-points) of the classes with the given edges. */
export const classMarks = (edges) => edges.slice(0, -1).map((lo, i) => (lo + edges[i + 1]) / 2);
/** Class widths. */
export const widths = (edges) => edges.slice(0, -1).map((lo, i) => edges[i + 1] - lo);
/** Frequency density: frequency per unit of class width. */
export const density = (f, edges) => f.map((v, i) => v / (edges[i + 1] - edges[i]));
/** Tally marks for n: groups of five are written ||||/ and the rest as strokes. */
export function tally(n) {
  const g = Math.floor(n / 5), rest = n % 5;
  return [...Array.from({ length: g }, () => '||||/'), rest ? '|'.repeat(rest) : ''].filter(Boolean).join(' ');
}

// ---- figures
/** geom() with automatic fitting: all points are shifted into the canvas with margins m (a number, or { l, r, t, b }). */
export function fig(spec, alt, caption, m = 0.6) {
  const mg = typeof m === 'number' ? { l: m, r: m, t: m, b: m } : m;
  const at = (p) => (Array.isArray(p) ? p : p.at);
  const xs = [], ys = [];
  for (const p of Object.values(spec.points)) { const [x, y] = at(p); xs.push(x); ys.push(y); }
  const x0 = Math.min(...xs) - mg.l, y0 = Math.min(...ys) - mg.b;
  const points = {};
  for (const [k, p] of Object.entries(spec.points)) {
    const [x, y] = at(p), q = [r4(x - x0), r4(y - y0)];
    points[k] = Array.isArray(p) ? q : { ...p, at: q };
  }
  return geom({ ...spec, points, width: r4(Math.max(...xs) - x0 + mg.r), height: r4(Math.max(...ys) - y0 + mg.t) }, alt, caption);
}
export const P = (p, pos, label) => ({ at: p, ...(pos ? { label_position: pos } : {}), ...(label !== undefined ? { label } : {}) });

/**
 * A chart on axes. The x range xr maps to a drawing width W and 0..yMax to a drawing height H, so the drawn height of every bar is
 * its value times H / yMax. bars: { x0, x1, y0 (default 0), y1, style: 'shade' | 'accent' | 'outline', top: text above the bar,
 * inner: text inside it }; lines: { pts: [[x, y], ...], dashed } in data coordinates; xTicks: { x, text }; yTitle and xTitle label the
 * ends of the axes. Every drawn bar height is asserted against its value.
 */
export function chartFig({ xr, yMax, yStep, W = 12, H = 6.5, bars = [], lines = [], xTicks = [], xTitle, yTitle, grid = true, yTickLabels = true }, alt, caption) {
  const sx = (x) => ((x - xr[0]) / (xr[1] - xr[0])) * W, sy = (y) => (y / yMax) * H;
  const points = {}, segments = [], polygons = [];
  points.O = P([0, 0], 'sw', false);
  points.X = P([W + 0.3, 0], 'e', xTitle ?? false);
  points.Y = P([0, H + 0.3], 'n', yTitle ?? false);
  segments.push({ from: 'O', to: 'X' }, { from: 'O', to: 'Y' });
  for (let v = yStep; v <= yMax + 1e-9; v += yStep) {
    const id = `yt${Math.round(v * 1000)}`;
    points[id] = P([0, sy(v)], 'w', yTickLabels ? String(rd(v, 4)) : false);
    if (grid) { points[`${id}e`] = P([W, sy(v)], undefined, false); segments.push({ from: id, to: `${id}e`, dashed: true }); }
  }
  xTicks.forEach((t, i) => { points[`xt${i}`] = P([sx(t.x), 0], 's', t.text); });
  const drawn = [];
  bars.forEach((b, i) => {
    const y0 = b.y0 ?? 0, ids = ['a', 'b', 'c', 'd'].map((k) => `b${i}${k}`);
    const corners = [[sx(b.x0), sy(y0)], [sx(b.x1), sy(y0)], [sx(b.x1), sy(b.y1)], [sx(b.x0), sy(b.y1)]];
    ids.forEach((id, k) => { points[id] = P(corners[k], undefined, false); });
    polygons.push({ vertices: ids, highlight: b.style ?? 'shade' });
    drawn.push({ x0: corners[0][0], x1: corners[1][0], y0: corners[0][1], y1: corners[2][1], v0: y0, v1: b.y1 });
    if (b.top !== undefined) points[`bt${i}`] = P([(corners[0][0] + corners[1][0]) / 2, sy(b.y1)], 'n', b.top);
    if (b.inner !== undefined) points[`bi${i}`] = P([(corners[0][0] + corners[1][0]) / 2, (sy(y0) + sy(b.y1)) / 2], b.pos, b.inner);
  });
  lines.forEach((ln, j) => {
    ln.pts.forEach(([x, y], k) => { points[`ln${j}_${k}`] = P([sx(x), sy(y)], undefined, false); });
    for (let k = 0; k < ln.pts.length - 1; k++) segments.push({ from: `ln${j}_${k}`, to: `ln${j}_${k + 1}`, ...(ln.dashed ? { dashed: true } : {}) });
  });
  const v = fig({ points, segments, polygons, not_to_scale: true }, alt, caption, { l: 1.3, r: xTitle ? 3 : 1, t: yTitle ? 1.8 : 1.2, b: 1.1 });
  for (const d of drawn) must(close(d.y1 - d.y0, ((d.v1 - d.v0) / yMax) * H) && d.x1 > d.x0, 'drawn bar height is value times H over yMax');
  return v;
}
