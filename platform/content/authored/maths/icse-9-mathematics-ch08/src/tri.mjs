// Triangle geometry for ICSE 9 Mathematics ch08 Triangles: Congruency and Inequalities.
// Every figure is built from coordinates (world units are centimetres or metres as the labels say); lengths and angles are then
// MEASURED from the coordinates. The figure builder asserts that every numeric segment label equals the true length, every
// degree label equals the measured angle, every right-angle mark measures 90, every group of segments with the same tick count
// is equal in length and every group of angles with the same arc count is equal in size. Congruence claims are asserted by
// `congruent` (all three sides and all three angles correspond), the test that applies by `criterion`, and triangle
// inequality and ordering claims by `canForm`, `longest`, `ordered`.
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
const r4 = (v) => Math.round(v * 1e4) / 1e4;
export const r2 = (v) => Math.round(v * 100) / 100;
export const r1 = (v) => Math.round(v * 10) / 10;
export const polar = (len, deg) => [len * Math.cos(rad(deg)), len * Math.sin(rad(deg))];
export const add = (P, Q) => [P[0] + Q[0], P[1] + Q[1]];
export const sub = (P, Q) => [P[0] - Q[0], P[1] - Q[1]];
export const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
/** P + t (Q - P). */
export const lerp = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
/** Intersection of lines AB and CD. */
export function inter(A, B, C, D) {
  const d = (A[0] - B[0]) * (C[1] - D[1]) - (A[1] - B[1]) * (C[0] - D[0]);
  must(Math.abs(d) > 1e-12, 'lines are parallel');
  const a = A[0] * B[1] - A[1] * B[0], b = C[0] * D[1] - C[1] * D[0];
  return [(a * (C[0] - D[0]) - (A[0] - B[0]) * b) / d, (a * (C[1] - D[1]) - (A[1] - B[1]) * b) / d];
}
/** Foot of the perpendicular from P to the line AB. */
export function foot(P, A, B) {
  const dx = B[0] - A[0], dy = B[1] - A[1];
  const t = ((P[0] - A[0]) * dx + (P[1] - A[1]) * dy) / (dx * dx + dy * dy);
  return [A[0] + t * dx, A[1] + t * dy];
}
/** Points at distance r1 from A and r2 from B (two points, the first on the left of A to B), or null if the circles do not meet. */
export function circInter(A, r1_, B, r2_) {
  const d = dist(A, B);
  if (d > r1_ + r2_ + 1e-12 || d < Math.abs(r1_ - r2_) - 1e-12) return null;
  const a = (r1_ * r1_ - r2_ * r2_ + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1_ * r1_ - a * a));
  const M = lerp(A, B, a / d), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d;
  return [[M[0] - h * uy, M[1] + h * ux], [M[0] + h * uy, M[1] - h * ux]];
}

// ---------------------------------------------------------------- triangle builders (each returns {A, B, C})
/** Sides a = BC, b = CA, c = AB; B at the origin, C on the positive x-axis, A above. */
export function sss(a, b, c) {
  const B = [0, 0], C = [a, 0];
  const x = (c * c - b * b + a * a) / (2 * a);
  must(c * c - x * x > 1e-12, `sides ${a}, ${b}, ${c} do not form a triangle`);
  return { A: [x, Math.sqrt(c * c - x * x)], B, C };
}
/** Side a = BC with angles B and C (degrees). */
export function asa(a, Bd, Cd) {
  const B = [0, 0], C = [a, 0];
  return { A: inter(B, polar(1, Bd), C, add(C, polar(1, 180 - Cd))), B, C };
}
/** Two sides c = AB and b = AC with the angle A between them (degrees); A at the origin, B on the x-axis. */
export const sas = (c, b, Ad) => ({ A: [0, 0], B: [c, 0], C: polar(b, Ad) });
/** Isosceles triangle with apex angle (degrees) and equal sides of length leg; base BC horizontal, apex A on top. */
export function iso(apex, leg) {
  const hb = leg * Math.sin(rad(apex / 2));
  return { A: [0, leg * Math.cos(rad(apex / 2))], B: [-hb, 0], C: [hb, 0] };
}
/** Rotate (deg), optionally reflect in the y-axis first, then translate. */
export function xf(P, { rot = 0, flip = false, dx = 0, dy = 0 } = {}) {
  const x = flip ? -P[0] : P[0], c = Math.cos(rad(rot)), s = Math.sin(rad(rot));
  return [x * c - P[1] * s + dx, x * s + P[1] * c + dy];
}
/** Copy of the triangle T (names from[]) under a rigid motion, named to[]. */
export function copy(T, from, to, o) {
  const out = {};
  from.forEach((n, i) => { out[to[i]] = xf(T[n], o); });
  return out;
}

// ---------------------------------------------------------------- measuring and asserting
/** Angle in degrees (rounded to 1e-6) at V between X and Y in the world W. */
export const ang = (W, V, X, Y) => r6(angDeg(W[V], W[X], W[Y]));
export const len = (W, X, Y) => r6(dist(W[X], W[Y]));
/** Triangles in correspondence (arrays of three names): all three sides and all three angles equal. */
export function congruent(W, T1, T2, msg = '') {
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3, k = (i + 2) % 3;
    must(near(dist(W[T1[i]], W[T1[j]]), dist(W[T2[i]], W[T2[j]])), `${msg} side ${T1[i]}${T1[j]} vs ${T2[i]}${T2[j]}`);
    must(near(angDeg(W[T1[i]], W[T1[j]], W[T1[k]]), angDeg(W[T2[i]], W[T2[j]], W[T2[k]])), `${msg} angle at ${T1[i]} vs ${T2[i]}`);
  }
  return true;
}
/** Are the triangles in correspondence NOT congruent? (some side differs) */
export const notCongruent = (W, T1, T2) => [0, 1, 2].some((i) => !near(dist(W[T1[i]], W[T1[(i + 1) % 3]]), dist(W[T2[i]], W[T2[(i + 1) % 3]])));
/**
 * The congruence test that the listed equal parts of triangles ABC and DEF (any names, in correspondence) give, found from
 * the structure of the parts alone. `names` is the vertex list of the first triangle, e.g. ['A','B','C']; a part is a side
 * ('AB'), an angle ('<B') or a right angle ('R<C'). Returns 'SSS', 'SAS', 'ASA', 'AAS', 'RHS' or null (not a test).
 */
export function criterion(names, parts) {
  const idx = (n) => names.indexOf(n);
  const sides = new Set(), angles = new Set(), rights = new Set();
  for (const p of parts) {
    if (p.startsWith('R<')) { rights.add(idx(p[2])); angles.add(idx(p[2])); }
    else if (p.startsWith('<')) angles.add(idx(p[1]));
    else sides.add(3 - idx(p[0]) - idx(p[1])); // side XY is opposite the third vertex
  }
  const S = [...sides], A = [...angles];
  if (S.length === 3) return 'SSS';
  if (rights.size === 1 && S.length >= 2) { const r = [...rights][0]; if (sides.has(r)) return 'RHS'; }
  if (S.length === 2 && A.length >= 1) {
    const third = 3 - S[0] - S[1]; // the vertex between the two sides
    if (angles.has(third)) return 'SAS';
  }
  if (A.length >= 2 && S.length >= 1) {
    const [i, j] = A;
    return sides.has(3 - i - j) ? 'ASA' : 'AAS';
  }
  return null;
}
/** Can three lengths (integers or exact decimals scaled by the caller) be the sides of a triangle? Sum of the two smaller > the largest. */
export function canForm(a, b, c) {
  const s = [a, b, c].sort((x, y) => x - y);
  return s[0] + s[1] > s[2];
}
/** Names of the sides (as 'BC' etc.) of triangle T in ascending order of length. */
export function sideOrder(W, T) {
  return [0, 1, 2].map((i) => [`${T[(i + 1) % 3]}${T[(i + 2) % 3]}`, dist(W[T[(i + 1) % 3]], W[T[(i + 2) % 3]])]).sort((x, y) => x[1] - y[1]).map((x) => x[0]);
}
/** Names of the angles (as 'A' etc.) of triangle T in ascending order of size. */
export function angleOrder(W, T) {
  return [0, 1, 2].map((i) => [T[i], angDeg(W[T[i]], W[T[(i + 1) % 3]], W[T[(i + 2) % 3]])]).sort((x, y) => x[1] - y[1]).map((x) => x[0]);
}

// ---------------------------------------------------------------- figures
const COMPASS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
const compass = (deg) => COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
/**
 *   pts:    { A: [x, y], ... }  (names starting with _ are drawn without a label)
 *   segs:   [from, to, label?, { dashed, ticks }?]       a numeric label such as "7 cm" must equal the true length
 *   angles: [at, from, to, label?, { arcs, right }?]     a numeric degree label must equal the measured angle
 *   polys:  [[names], highlight?]
 *   circles: [[centre, radius]]                          radius in world units
 *   expect: [[at, from, to, degrees]]                    measured angles that the text states or derives
 *   pos:    label_position overrides, e.g. { A: 'n' }
 */
export function fig({ pts, segs = [], angles = [], polys = [], circles = [], pos = {}, names = {}, expect = [], size = 4.8, margin = 0.95, k = null }, alt, caption) {
  const W = pts;
  const P = (n) => { must(W[n], `unknown point ${n}`); return W[n]; };
  const xs = Object.values(W).map((p) => p[0]), ys = Object.values(W).map((p) => p[1]);
  let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  for (const [c, rr] of circles) { const C = P(c); x0 = Math.min(x0, C[0] - rr); x1 = Math.max(x1, C[0] + rr); y0 = Math.min(y0, C[1] - rr); y1 = Math.max(y1, C[1] + rr); }
  const kk = k ?? size / Math.max(x1 - x0, y1 - y0);
  const to = (p) => [r4((p[0] - x0) * kk + margin), r4((p[1] - y0) * kk + margin)];
  const vis = Object.entries(W).filter(([n]) => !n.startsWith('_')).map(([, p]) => p);
  const cx = vis.reduce((s, p) => s + p[0], 0) / vis.length, cy = vis.reduce((s, p) => s + p[1], 0) / vis.length;
  const points = {};
  for (const [n, p] of Object.entries(W)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false; else if (names[n]) o.label = names[n];
    if (!n.startsWith('_')) o.label_position = pos[n] ?? compass((Math.atan2(p[1] - cy, p[0] - cx) * 180) / Math.PI);
    points[n] = o;
  }
  const width = r4((x1 - x0) * kk + 2 * margin), height = r4((y1 - y0) * kk + 2 * margin);
  const ticks = {};
  const segments = segs.map(([f, t, label, o = {}]) => {
    P(f); P(t);
    const L = dist(W[f], W[t]);
    if (label !== undefined) { const m = /^(\d+(?:\.\d+)?) ?(?:cm|m)$/.exec(label); if (m) must(near(L, Number(m[1])), `segment ${f}${t} labelled ${label} is really ${L}`); }
    if (o.ticks) (ticks[o.ticks] ??= []).push([`${f}${t}`, L]);
    return { from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}) };
  });
  for (const [g, list] of Object.entries(ticks)) must(list.every((x) => near(x[1], list[0][1])), `tick group ${g} is not equal: ${list.map((x) => `${x[0]}=${x[1]}`)}`);
  const arcs = {};
  const angs = angles.map(([at, f, t, label, o = {}]) => {
    const m = angDeg(P(at), P(f), P(t));
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${f}${at}${t} labelled ${label} is really ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${f}${at}${t} is not right (${m})`);
    if (o.arcs) (arcs[o.arcs] ??= []).push([`${f}${at}${t}`, m]);
    return { at, from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  for (const [g, list] of Object.entries(arcs)) must(list.every((x) => Math.abs(x[1] - list[0][1]) < 1e-6), `arc group ${g} is not equal: ${list.map((x) => `${x[0]}=${x[1]}`)}`);
  for (const [at, f, t, v] of expect) must(Math.abs(angDeg(P(at), P(f), P(t)) - v) < 1e-6, `expected angle ${f}${at}${t} = ${v}, measured ${angDeg(P(at), P(f), P(t))}`);
  const polygons = polys.map(([vertices, highlight]) => ({ vertices, ...(highlight ? { highlight } : {}) }));
  const spec = { width, height, points, segments, angles: angs, polygons, circles: circles.map(([c, rr]) => ({ center: c, radius: r4(rr * kk) })) };
  return geom(spec, alt, caption);
}

// ---------------------------------------------------------------- named triangles
/** Triangle with the named vertices [X, Y, Z] having the given angles (degrees, summing to 180); X at the origin, Y on the x-axis. */
export function byAngles(names, angles, base = 10) {
  must(near(angles[0] + angles[1] + angles[2], 180), `angles ${angles} do not add up to 180`);
  const [X, Y, Z] = names;
  const W = { [X]: [0, 0], [Y]: [base, 0] };
  W[Z] = inter(W[X], polar(1, angles[0]), W[Y], add(W[Y], polar(1, 180 - angles[1])));
  return W;
}
/** Triangle with the named vertices [X, Y, Z] and the sides XY, YZ, ZX (lengths); X at the origin, Y on the x-axis. */
export function bySides(names, [xy, yz, zx]) {
  const [X, Y, Z] = names;
  const x = (xy * xy + zx * zx - yz * yz) / (2 * xy);
  must(zx * zx - x * x > 1e-12, `sides ${xy}, ${yz}, ${zx} do not form a triangle`);
  return { [X]: [0, 0], [Y]: [xy, 0], [Z]: [x, Math.sqrt(zx * zx - x * x)] };
}
/** A side name with its letters sorted, so that 'CA' and 'AC' compare equal. */
export const norm = (s) => [...s].sort().join('');
