// Helpers for CBSE 9 Mathematics ch13 Surface Area and Volume: oblique-view drawings of solids on computed points, and the formulas
// that every answer is recomputed with (cuboid, cube, cylinder, cone, square and triangular pyramids, sphere, hemisphere) with a stated pi.
import { geom } from './lib.mjs';

/** Raw template; the two characters backslash-n become a line break unless they start a TeX command (\ne, \neq, \nu). */
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export function must(cond, msg) {
  if (!cond) throw new Error(`assert: ${msg}`);
}
export const close = (a, b, e = 1e-9) => Math.abs(a - b) < e;
export const r4 = (v) => Math.round(v * 10000) / 10000;
export const rd = (v, k = 2) => Math.round(v * 10 ** k) / 10 ** k;
const rad = (d) => (d * Math.PI) / 180;
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const dist3 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);

// ---- pi
export const PI7 = 22 / 7, PI314 = 3.14;

// ---- the formulas under test
export const cuboidTSA = (l, b, h) => 2 * (l * b + b * h + h * l);
export const cuboidLSA = (l, b, h) => 2 * h * (l + b);
export const cuboidV = (l, b, h) => l * b * h;
export const cubeTSA = (a) => 6 * a * a;
export const cubeLSA = (a) => 4 * a * a;
export const cubeV = (a) => a ** 3;
export const cylCSA = (rr, h, pi) => 2 * pi * rr * h;
export const cylTSA = (rr, h, pi) => 2 * pi * rr * (rr + h);
export const cylV = (rr, h, pi) => pi * rr * rr * h;
export const slant = (rr, h) => Math.hypot(rr, h);
export const coneCSA = (rr, l, pi) => pi * rr * l;
export const coneTSA = (rr, l, pi) => pi * rr * (rr + l);
export const coneV = (rr, h, pi) => (pi * rr * rr * h) / 3;
/** Slant height of a face of a square pyramid with base side a and height h. */
export const sqSlant = (a, h) => Math.hypot(h, a / 2);
export const sqPyrLSA = (a, l) => 4 * (0.5 * a * l);
export const sqPyrTSA = (a, l) => a * a + 4 * (0.5 * a * l);
export const pyrV = (baseArea, h) => (baseArea * h) / 3;
export const sphereSA = (rr, pi) => 4 * pi * rr * rr;
export const sphereV = (rr, pi) => (4 * pi * rr ** 3) / 3;
export const hemiCSA = (rr, pi) => 2 * pi * rr * rr;
export const hemiTSA = (rr, pi) => 3 * pi * rr * rr;
export const hemiV = (rr, pi) => (2 * pi * rr ** 3) / 3;

// ---- figures
/**
 * geom() with automatic fitting: all points are shifted so that they sit inside a canvas with margin m, and circles are included in
 * the extent, so figures can be written in natural coordinates.
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
const HID = (p) => P(p, undefined, false);

/** Oblique (cabinet-style) projection of (x, y, z): x across, y into the page, z up. Depth is drawn at half length, 40 degrees. */
export const KDEPTH = 0.5, ANG = 40;
export const proj = ([x, y, z]) => [x + KDEPTH * y * Math.cos(rad(ANG)), z + KDEPTH * y * Math.sin(rad(ANG))];

/** Points on an ellipse (centre c, radii rx, ry) between two angles, added as hidden points `${id}0..${id}n`; returns the segments. */
export function ellipseSegs(points, id, c, rx, ry, from, to, n = 24, dashed = false) {
  const segs = [];
  for (let i = 0; i <= n; i++) {
    const t = rad(from + ((to - from) * i) / n);
    points[`${id}${i}`] = HID([c[0] + rx * Math.cos(t), c[1] + ry * Math.sin(t)]);
  }
  for (let i = 0; i < n; i++) segs.push({ from: `${id}${i}`, to: `${id}${i + 1}`, ...(dashed ? { dashed: true } : {}) });
  return segs;
}
const NS = { not_to_scale: true };

/** A cuboid l by b by h (drawing scale s per unit of length); labels is { l, b, h } texts for the three edges (or null). */
export function cuboidFig(l, b, h, labels, alt, caption, s = 1) {
  const L = l * s, B = b * s, H = h * s;
  const V = { A: [0, 0, 0], B: [L, 0, 0], C: [L, 0, H], D: [0, 0, H], E: [0, B, 0], F: [L, B, 0], G: [L, B, H], H: [0, B, H] };
  const pos = { A: 'sw', B: 'se', C: 'e', D: 'w', E: 'w', F: 'e', G: 'ne', H: 'nw' };
  const points = {};
  for (const [k, v] of Object.entries(V)) points[k] = P(proj(v), pos[k]);
  const e = (from, to, extra = {}) => ({ from, to, ...extra });
  const lab = (t) => (t ? { label: t } : {});
  const segments = [
    e('A', 'B', lab(labels?.l)), e('B', 'C'), e('C', 'D'), e('D', 'A', lab(labels?.h)),
    e('D', 'H'), e('C', 'G'), e('H', 'G'), e('B', 'F', lab(labels?.b)), e('F', 'G'),
    e('A', 'E', { dashed: true }), e('E', 'F', { dashed: true }), e('E', 'H', { dashed: true }),
  ];
  return fig({ points, segments, ...NS }, alt, caption);
}

/** A cylinder of radius r and height h (drawn with r : h in the true ratio times s). */
export function cylFig(rr, h, labels, alt, caption, s = 1) {
  const R = rr * s, H = h * s, ry = 0.3 * R;
  const points = { T: P([0, H], 'n', labels?.T ?? false), B: P([0, 0], 's', labels?.B ?? false), Rt: P([R, H], 'e', false), Rb: P([R, 0], 'e', false), Lb: P([-R, 0], 'w', false), Lt: P([-R, H], 'w', false) };
  const top = ellipseSegs(points, 't', [0, H], R, ry, 0, 360, 36);
  const front = ellipseSegs(points, 'f', [0, 0], R, ry, 180, 360, 18);
  const back = ellipseSegs(points, 'k', [0, 0], R, ry, 0, 180, 18, true);
  const segments = [
    { from: 'Lb', to: 'Lt' }, { from: 'Rb', to: 'Rt' },
    { from: 'T', to: 'Rt', ...(labels?.r ? { label: labels.r } : {}) },
    { from: 'B', to: 'T', dashed: true, ...(labels?.h ? { label: labels.h } : {}) },
    ...top, ...front, ...back,
  ];
  return fig({ points, segments, ...NS }, alt, caption);
}

/** A cone of radius r, height h and slant height l (labels: r, h, l texts). */
export function coneFig(rr, h, labels, alt, caption, s = 1) {
  const R = rr * s, H = h * s, ry = 0.3 * R;
  const points = { A: P([0, H], 'n', labels?.A ?? false), O: P([0, 0], 's', false), Rb: P([R, 0], 'e', false), Lb: P([-R, 0], 'w', false) };
  const front = ellipseSegs(points, 'f', [0, 0], R, ry, 180, 360, 18);
  const back = ellipseSegs(points, 'k', [0, 0], R, ry, 0, 180, 18, true);
  const segments = [
    { from: 'A', to: 'Lb' }, { from: 'A', to: 'Rb', ...(labels?.l ? { label: labels.l } : {}) },
    { from: 'A', to: 'O', dashed: true, ...(labels?.h ? { label: labels.h } : {}) },
    { from: 'O', to: 'Rb', dashed: true, ...(labels?.r ? { label: labels.r } : {}) },
    ...front, ...back,
  ];
  return fig({ points, segments, ...NS }, alt, caption);
}

/** A square pyramid with base side a and height h (labels: a, h, l). V apex, O centre of the base, M mid-point of the front edge. */
export function sqPyrFig(a, h, labels, alt, caption, s = 1) {
  const A_ = a * s, H = h * s;
  const V3 = { A: [0, 0, 0], B: [A_, 0, 0], C: [A_, A_, 0], D: [0, A_, 0], V: [A_ / 2, A_ / 2, H], O: [A_ / 2, A_ / 2, 0], M: [A_ / 2, 0, 0] };
  const pos = { A: 'sw', B: 'se', C: 'e', D: 'w', V: 'n', O: 'e', M: 's' };
  const points = {};
  for (const [k, v] of Object.entries(V3)) points[k] = P(proj(v), pos[k], k === 'O' || k === 'M' ? (labels?.pts ? k : false) : undefined);
  const lab = (t) => (t ? { label: t } : {});
  const segments = [
    { from: 'A', to: 'B', ...lab(labels?.a) }, { from: 'B', to: 'C' }, { from: 'C', to: 'D', dashed: true }, { from: 'D', to: 'A', dashed: true },
    { from: 'V', to: 'A' }, { from: 'V', to: 'B' }, { from: 'V', to: 'C' }, { from: 'V', to: 'D', dashed: true },
    { from: 'V', to: 'O', dashed: true, ...lab(labels?.h) }, { from: 'V', to: 'M', ...lab(labels?.l) },
  ];
  return fig({ points, segments, ...NS }, alt, caption);
}

/** A sphere of radius r: the outline, the equator (back half dashed) and the radius drawn to the equator. */
export function sphereFig(rr, label, alt, caption, s = 1) {
  const R = rr * s, ry = 0.3 * R;
  const points = { O: P([0, 0], 'n', false), E: P([R, 0], 'e', false) };
  const front = ellipseSegs(points, 'f', [0, 0], R, ry, 180, 360, 18);
  const back = ellipseSegs(points, 'k', [0, 0], R, ry, 0, 180, 18, true);
  return fig({ points, circles: [{ center: 'O', radius: R }], segments: [{ from: 'O', to: 'E', ...(label ? { label } : {}) }, ...front, ...back], ...NS }, alt, caption);
}

/** A solid hemisphere resting on its flat face: the dome, the base ellipse (back half dashed) and the radius. */
export function hemiFig(rr, label, alt, caption, s = 1) {
  const R = rr * s, ry = 0.3 * R;
  const points = { O: P([0, 0], 's', false), E: P([R, 0], 'e', false) };
  const dome = ellipseSegs(points, 'd', [0, 0], R, R, 0, 180, 36);
  const front = ellipseSegs(points, 'f', [0, 0], R, ry, 180, 360, 18);
  const back = ellipseSegs(points, 'k', [0, 0], R, ry, 0, 180, 18, true);
  return fig({ points, segments: [{ from: 'O', to: 'E', dashed: true, ...(label ? { label } : {}) }, ...dome, ...front, ...back], ...NS }, alt, caption);
}
export { HID, rad };
export const polar = (c, rr, deg) => [c[0] + rr * Math.cos(rad(deg)), c[1] + rr * Math.sin(rad(deg))];
/** An arc drawn as a polyline: adds hidden points `${id}0..${id}n` to `points` and returns the segment list. */
export function arcSegs(points, id, c, rr, from, to, n = 24) {
  const segs = [];
  for (let i = 0; i <= n; i++) points[`${id}${i}`] = HID(polar(c, rr, from + ((to - from) * i) / n));
  for (let i = 0; i < n; i++) segs.push({ from: `${id}${i}`, to: `${id}${i + 1}` });
  return segs;
}
