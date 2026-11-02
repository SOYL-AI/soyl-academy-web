// Circle-geometry figures for ICSE 10 Mathematics ch16 (Circles: Angle and Cyclic Properties).
// Every point on a circle is placed at a chosen position (degrees, anticlockwise from the positive x-axis) on a circle of
// radius R; angles are then MEASURED from the coordinates. The builder asserts (to 1e-6 degrees) that every degree label
// equals the measured angle, every right-angle mark measures 90, and every `expect` entry (a stated or derived angle in a
// worked example or solution) equals the angle measured on the figure. Numeric segment labels must equal true lengths.
import { geom } from './lib.mjs';

export const must = (c, m) => { if (!c) throw new Error(m); };
export const rad = (d) => (d * Math.PI) / 180;
export const near = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
export const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
export const angDeg = (V, A, B) => {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
};
export const r6 = (v) => Math.round(v * 1e6) / 1e6;
export const onC = (R, deg) => [R * Math.cos(rad(deg)), R * Math.sin(rad(deg))];
const r4 = (v) => Math.round(v * 1e4) / 1e4;
/** Intersection of lines AB and CD. */
export function meet(A, B, C, D) {
  const d = (A[0] - B[0]) * (C[1] - D[1]) - (A[1] - B[1]) * (C[0] - D[0]);
  must(Math.abs(d) > 1e-12, 'lines are parallel');
  const a = A[0] * B[1] - A[1] * B[0], b = C[0] * D[1] - C[1] * D[0];
  return [(a * (C[0] - D[0]) - (A[0] - B[0]) * b) / d, (a * (C[1] - D[1]) - (A[1] - B[1]) * b) / d];
}
/** Point P + t (Q - P): on line PQ beyond Q when t > 1. */
export const lerp = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
const COMPASS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
const compass = (deg) => COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];

/**
 * A circle configuration without drawing: points on the circle at the given positions (degrees), plus free points
 * (arrays). `ang(V, X, Y)` measures the angle XVY in degrees (rounded to 1e-6); O is the centre.
 */
export function cfg(pts, R = 1) {
  const W = { O: [0, 0] };
  for (const [n, v] of Object.entries(pts)) W[n] = typeof v === 'number' ? onC(R, v) : v;
  const ang = (V, X, Y) => r6(angDeg(W[V], W[X], W[Y]));
  const len = (X, Y) => r6(dist(W[X], W[Y]));
  return { W, ang, len, R };
}

/**
 * Figure on a circle (or, with circle: false, a plain figure of the given points).
 *   pts:    { A: 200 (degrees on the circle) | [x, y] (free point, world units) }
 *   segs:   [from, to, label?, { dashed, ticks }?]
 *   angles: [at, from, to, label?, { arcs, right }?]   a numeric degree label must equal the measured angle
 *   polys:  [[names], highlight?]
 *   expect: [[at, from, to, degrees]]                  measured angles that the text states or derives
 *   centre: true draws O (labelled), false draws a hidden centre point
 */
export function circleFig({ R = 1, k = 1.7, pts = {}, circle = true, centre = true, segs = [], angles = [], polys = [], pos = {}, names = {}, margin = 0.95, expect = [], posO = 'se', scaleUnit = null }, alt, caption) {
  const W = {}, degOf = {};
  W[centre ? 'O' : '_O'] = [0, 0];
  for (const [n, v] of Object.entries(pts)) { if (typeof v === 'number') { W[n] = onC(R, v); degOf[n] = v; } else W[n] = v; }
  const cName = centre ? 'O' : '_O';
  const P = (n) => { must(W[n], `unknown point ${n}`); return W[n]; };
  const bx = Object.values(W).map((p) => p[0]), by = Object.values(W).map((p) => p[1]);
  const lo = circle ? [-R, -R] : [Infinity, Infinity], hi = circle ? [R, R] : [-Infinity, -Infinity];
  const x0 = Math.min(lo[0], ...bx), y0 = Math.min(lo[1], ...by), x1 = Math.max(hi[0], ...bx), y1 = Math.max(hi[1], ...by);
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const points = {};
  for (const [n, p] of Object.entries(W)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false; else if (names[n]) o.label = names[n];
    if (!n.startsWith('_')) o.label_position = pos[n] ?? (n === 'O' ? posO : degOf[n] !== undefined ? compass(degOf[n]) : compass((Math.atan2(p[1], p[0]) * 180) / Math.PI));
    points[n] = o;
  }
  const width = r4((x1 - x0) * k + 2 * margin), height = r4((y1 - y0) * k + 2 * margin);
  const segments = segs.map(([f, t, label, o = {}]) => {
    P(f); P(t);
    if (label !== undefined && /^\d+(\.\d+)?$/.test(label)) must(near(dist(W[f], W[t]), Number(label)), `segment ${f}${t} labelled ${label} is really ${dist(W[f], W[t])}`);
    return { from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}) };
  });
  const angs = angles.map(([at, f, t, label, o = {}]) => {
    const m = angDeg(P(at), P(f), P(t));
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${f}${at}${t} labelled ${label} is really ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${f}${at}${t} is not right`);
    return { at, from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  for (const [at, f, t, v] of expect) must(Math.abs(angDeg(P(at), P(f), P(t)) - v) < 1e-6, `expected angle ${f}${at}${t} = ${v}, measured ${angDeg(P(at), P(f), P(t))}`);
  const polygons = polys.map(([vertices, highlight]) => ({ vertices, ...(highlight ? { highlight } : {}) }));
  const spec = { width, height, points, segments, angles: angs, polygons, circles: circle ? [{ center: cName, radius: r4(R * k) }] : [] };
  if (scaleUnit) spec.scale = { unit: scaleUnit, per_unit: k };
  return { fig: geom(spec, alt, caption), W };
}
