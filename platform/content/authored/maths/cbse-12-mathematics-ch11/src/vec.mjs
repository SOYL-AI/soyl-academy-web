// 3-vector helpers for CBSE 12 Mathematics ch11 (Three Dimensional Geometry): independent arithmetic for
// the re-solve checks, LaTeX writers that turn the same numbers into text, and an oblique-projection
// sketcher for geometry figures.
import { geom } from '../../cbse-12-mathematics-ch01/src/lib.mjs';

export const add = (u, v) => u.map((x, i) => x + v[i]);
export const sub = (u, v) => u.map((x, i) => x - v[i]);
export const mul = (k, u) => u.map((x) => k * x);
export const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
export const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
export const norm = (u) => Math.sqrt(dot(u, u));
export const dcs = (u) => mul(1 / norm(u), u);
export const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
export const eqv = (u, v, tol = 1e-9) => u.length === v.length && u.every((x, i) => Math.abs(x - v[i]) < tol);
export const isZero = (u) => u.every((x) => Math.abs(x) < 1e-12);
/** u and v are parallel (proportional) direction vectors. */
export const parallel = (u, v) => isZero(cross(u, v));
/** Acute angle in degrees between two lines with directions u and v. */
export const angleDeg = (u, v) => (Math.acos(Math.min(1, Math.abs(dot(u, v)) / (norm(u) * norm(v)))) * 180) / Math.PI;
/** |cos θ| for lines with directions u, v. */
export const cosLines = (u, v) => Math.abs(dot(u, v)) / (norm(u) * norm(v));
/** Point on r = a + t b. */
export const at = (a, b, t) => add(a, mul(t, b));
/** Is P on the line r = a + t b? */
export function onLine(P, a, b) {
  return isZero(cross(sub(P, a), b).map((x) => Math.round(x * 1e9) / 1e9));
}
/** Foot of the perpendicular from P to r = a + t b, and the parameter. */
export function foot(P, a, b) {
  const t = dot(sub(P, a), b) / dot(b, b);
  return { t, F: at(a, b, t) };
}
/** Shortest distance by the vector formulas (skew or parallel). */
export function sdFormula(a1, b1, a2, b2) {
  const c = cross(b1, b2);
  if (isZero(c)) return norm(cross(b1, sub(a2, a1))) / norm(b1);
  return Math.abs(dot(c, sub(a2, a1))) / norm(c);
}
/** Shortest distance found independently: minimise |(a1 + s b1) − (a2 + t b2)| by coordinate descent. */
export function sdNumeric(a1, b1, a2, b2) {
  let s = 0, t = 0;
  for (let k = 0; k < 20000; k++) {
    // exact 1-D minimisers of a convex quadratic, alternately
    const w = sub(at(a2, b2, t), a1);
    s = dot(w, b1) / dot(b1, b1);
    const v = sub(at(a1, b1, s), a2);
    t = dot(v, b2) / dot(b2, b2);
  }
  return { d: norm(sub(at(a1, b1, s), at(a2, b2, t))), s, t, P: at(a1, b1, s), Q: at(a2, b2, t) };
}
/** Intersection of two non-parallel lines (null if skew): solve the first two independent equations, test the third. */
export function intersect(a1, b1, a2, b2) {
  const { d, P, s, t } = sdNumeric(a1, b1, a2, b2);
  if (d > 1e-7) return null;
  return { P: P.map((x) => Math.round(x * 1e9) / 1e9), s: Math.round(s * 1e9) / 1e9, t: Math.round(t * 1e9) / 1e9 };
}
export const r9 = (x) => Math.round(x * 1e9) / 1e9;

// ---------------------------------------------------------------- LaTeX writers (text generated from the same numbers)
const coef = (k, unit, first) => {
  if (k === 0) return '';
  const sign = k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
  const m = Math.abs(k);
  return `${sign}${m === 1 ? '' : m}${unit}`;
};
/** 2\hat{i} - \hat{j} + 3\hat{k} */
export function vtex(u) {
  const parts = [];
  for (const [k, unit] of [[u[0], '\\hat{i}'], [u[1], '\\hat{j}'], [u[2], '\\hat{k}']]) if (k !== 0) parts.push(coef(k, unit, parts.length === 0));
  return parts.length ? parts.join('') : '\\vec{0}';
}
/** (\,2\hat{i} - \hat{j}\,) wrapped for use after a scalar such as \lambda */
export const vpar = (u) => `(${vtex(u)})`;
/** r = a + \lambda b */
export const lineVec = (a, b, p = '\\lambda') => (isZero(a) ? `\\vec{r} = ${p}${vpar(b)}` : `\\vec{r} = ${vtex(a)} + ${p}${vpar(b)}`);
const shift = (v, x) => (x === 0 ? v : x > 0 ? `${v} - ${x}` : `${v} + ${-x}`);
/** \dfrac{x - 1}{2} = \dfrac{y + 2}{-1} = \dfrac{z - 4}{2} */
export function cart(p, d) {
  return ['x', 'y', 'z'].map((v, i) => `\\dfrac{${shift(v, p[i])}}{${d[i]}}`).join(' = ');
}
export const pt = (p) => `(${p.join(', ')})`;

// ---------------------------------------------------------------- oblique 3-D sketch as a geometry figure
/**
 * pts: { id: { p: [x, y, z], label?: string | false, pos?: compass } }; axes: length of each drawn axis
 * (x comes towards the viewer, drawn down-left). Projection: (x, y, z) -> (y - 0.55x, z - 0.42x), scaled.
 * Not to scale (oblique sketch), as the caption must say.
 */
export function fig3d({ pts, segments = [], axes = [4, 4, 4], k = 1, alt, caption }) {
  const P = (p) => [k * (p[1] - 0.55 * p[0]), k * (p[2] - 0.42 * p[0])];
  const all = { O: { p: [0, 0, 0], label: 'O', pos: 'sw' }, X: { p: [axes[0], 0, 0], label: 'x', pos: 'sw' }, Y: { p: [0, axes[1], 0], label: 'y', pos: 'e' }, Z: { p: [0, 0, axes[2]], label: 'z', pos: 'n' }, ...pts };
  const xy = Object.fromEntries(Object.entries(all).map(([id, o]) => [id, P(o.p)]));
  const xs = Object.values(xy).map((q) => q[0]), ys = Object.values(xy).map((q) => q[1]);
  const m = 0.8, dx = m - Math.min(...xs), dy = m - Math.min(...ys);
  const rd = (v) => Math.round(v * 1000) / 1000;
  const points = Object.fromEntries(Object.entries(all).map(([id, o]) => {
    const q = { at: [rd(xy[id][0] + dx), rd(xy[id][1] + dy)] };
    if (o.label !== undefined) q.label = o.label;
    if (o.pos) q.label_position = o.pos;
    return [id, q];
  }));
  return geom({
    width: rd(Math.max(...xs) + dx + m), height: rd(Math.max(...ys) + dy + m), points,
    segments: [{ from: 'O', to: 'X', dashed: true }, { from: 'O', to: 'Y', dashed: true }, { from: 'O', to: 'Z', dashed: true }, ...segments],
    not_to_scale: true,
  }, alt, caption);
}
