// Locus constructions for ICSE 10 Mathematics ch15 Loci: exact (floating point, 1e-9) coordinates of every
// constructed point, with the figure drawn from those coordinates. Lines are {p, d} (a point and a unit
// direction); circles are (centre, radius). Everything a student would measure on a drawing (lengths, distances to
// a line, angles) is computed here, the figure builders assert the geometry (equal distances, right angles, bisected
// angles, points on circles) and the question checks assert the model-answer values after rounding to the precision
// a drawing gives (0.1 cm).
import { geom } from './lib.mjs';
import { must, near, dist, angDeg } from './sim.mjs';

export { must, near, dist, angDeg };
const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
const r4 = (v) => Math.round(v * 1e4) / 1e4;
/** Round to the precision of a drawing: one decimal place of a centimetre (or degree). */
export const r1 = (v) => Math.round(v * 10 + 1e-9) / 10;
export const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;

export const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
export const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
export const unit = (v) => { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; };
export const polar = (O, r, d) => [O[0] + r * Math.cos(rad(d)), O[1] + r * Math.sin(rad(d))];
export const line = (p, d) => ({ p, d: unit(d) });
export const through = (p, q) => line(p, vec(p, q));
export const at = (L, t) => [L.p[0] + L.d[0] * t, L.p[1] + L.d[1] * t];
const crs = (a, b) => a[0] * b[1] - a[1] * b[0];
/** Distance of X from the line L. */
export const distLine = (X, L) => Math.abs(crs(vec(L.p, X), L.d));
/** Parameter t of the foot of the perpendicular from X to L. */
export const proj = (X, L) => (X[0] - L.p[0]) * L.d[0] + (X[1] - L.p[1]) * L.d[1];
export const foot = (X, L) => at(L, proj(X, L));
/** Perpendicular bisector of AB. */
export const perpBis = (A, B) => line(mid(A, B), [-(B[1] - A[1]), B[0] - A[0]]);
/** Internal bisector of angle AOB (the bisector of the angle between rays OA and OB). */
export const bisector = (O, A, B) => line(O, [unit(vec(O, A))[0] + unit(vec(O, B))[0], unit(vec(O, A))[1] + unit(vec(O, B))[1]]);
/** The other bisector of the two lines: perpendicular to the internal one at O. */
export const bisector2 = (L) => line(L.p, [-L.d[1], L.d[0]]);
/** The parallel to L at distance dd on its left (dd > 0) or right (dd < 0). */
export const parallel = (L, dd) => line([L.p[0] - L.d[1] * dd, L.p[1] + L.d[0] * dd], L.d);
/** Meeting point of two lines, or null when parallel. */
export function intLL(L1, L2) {
  const c = crs(L1.d, L2.d);
  if (Math.abs(c) < 1e-12) return null;
  const t = crs(vec(L1.p, L2.p), L2.d) / c;
  return at(L1, t);
}
/** Points where line L meets the circle (centre C, radius r), in order of the parameter t. */
export function intLC(L, C, r) {
  const h = distLine(C, L);
  if (h > r + 1e-12) return [];
  const t0 = proj(C, L), half = Math.sqrt(Math.max(0, r * r - h * h));
  return half < 1e-9 ? [at(L, t0)] : [at(L, t0 - half), at(L, t0 + half)];
}
/** Points common to two circles (empty if they are apart or one lies inside the other). */
export function intCC(C1, r1_, C2, r2_) {
  const d = dist(C1, C2);
  if (d > r1_ + r2_ + 1e-12 || d < Math.abs(r1_ - r2_) - 1e-12) return [];
  const a = (r1_ * r1_ - r2_ * r2_ + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1_ * r1_ - a * a));
  const u = unit(vec(C1, C2)), b = [C1[0] + a * u[0], C1[1] + a * u[1]];
  return h < 1e-9 ? [b] : [[b[0] - h * u[1], b[1] + h * u[0]], [b[0] + h * u[1], b[1] - h * u[0]]];
}
/** Triangle from BC (horizontal from B = origin), AB and the angle at B in degrees: B, C, A (counter-clockwise). */
export const triSAS = (bc, ab, angB) => ({ B: [0, 0], C: [bc, 0], A: polar([0, 0], ab, angB) });
/** Triangle from three side lengths a = BC, b = CA, c = AB. */
export function triSSS(a, b, c) {
  const cosB = (a * a + c * c - b * b) / (2 * a * c);
  return { B: [0, 0], C: [a, 0], A: [c * cosB, c * Math.sqrt(1 - cosB * cosB)] };
}
/** True when X is inside (or on) the triangle PQR. */
export function inTri(X, P, Q, R) {
  const s = [crs(vec(P, Q), vec(P, X)), crs(vec(Q, R), vec(Q, X)), crs(vec(R, P), vec(R, X))];
  return s.every((v) => v >= -1e-9) || s.every((v) => v <= 1e-9);
}
/** Count of points common to the circle (C, r) and the line L. */
export const nCommon = (L, C, r) => intLC(L, C, r).length;

/**
 * Draw named points (real cm coordinates, y up) at k drawing units per cm, with circles.
 *   segs:    [from, to, label?, { dashed, ticks, arrows }?]; a purely numeric label must equal the true length
 *   circles: [centreName, radiusCm, label?]
 *   angles:  [at, from, to, label?, { right, arcs }?]; a degree label must measure what it says
 *   polys:   [[names], highlight?]
 *   names:   label text per point; names starting with "_" are drawn without a label
 */
export function drawL({ pts, k = 0.5, margin = 0.7, segs = [], circles = [], angles = [], polys = [], pos = {}, names = {}, scaleUnit = 'cm' }, alt, caption) {
  const xs = Object.values(pts).map((p) => p[0]), ys = Object.values(pts).map((p) => p[1]);
  for (const [c, r] of circles) { must(pts[c], `circle centre ${c} unknown`); xs.push(pts[c][0] - r, pts[c][0] + r); ys.push(pts[c][1] - r, pts[c][1] + r); }
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const points = {};
  for (const [n, p] of Object.entries(pts)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false; else if (names[n]) o.label = names[n];
    if (pos[n]) o.label_position = pos[n];
    points[n] = o;
  }
  const width = r4((Math.max(...xs) - x0) * k + 2 * margin), height = r4((Math.max(...ys) - y0) * k + 2 * margin);
  const segments = segs.map(([from, t, label, o = {}]) => {
    must(pts[from] && pts[t], `segment ${from}${t}: unknown point`);
    if (label !== undefined && /^\d+(\.\d+)?$/.test(label)) must(near(dist(pts[from], pts[t]), Number(label), 1e-9), `segment ${from}${t} labelled ${label} is really ${dist(pts[from], pts[t])}`);
    return { from, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}), ...(o.arrows ? { arrows: o.arrows } : {}) };
  });
  const angs = angles.map(([atp, from, t, label, o = {}]) => {
    const m = angDeg(pts[atp], pts[from], pts[t]);
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${from}${atp}${t} labelled ${label} is really ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${from}${atp}${t} is not right (${m})`);
    return { at: atp, from, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  const circs = circles.map(([c, r, label]) => ({ center: c, radius: r4(r * k), ...(label ? { label } : {}) }));
  const polygons = polys.map(([vertices, highlight]) => ({ vertices, ...(highlight ? { highlight } : {}) }));
  const spec = { width, height, points, segments, circles: circs, angles: angs, polygons };
  if (scaleUnit && segs.some((g) => /^\d+(\.\d+)?$/.test(g[2] ?? ''))) spec.scale = { unit: scaleUnit, per_unit: k };
  return geom(spec, alt, caption);
}

/** Two hidden end points for drawing the line L from parameter t0 to t1: returns [pointA, pointB]. */
export const ends = (L, t0, t1) => [at(L, t0), at(L, t1)];

/** Equal-distance check helper used inside the figure builders. */
export const equalDist = (pairs, what) => {
  const ds = pairs.map(([p, q]) => dist(p, q));
  ds.slice(1).forEach((d) => must(near(d, ds[0], 1e-9), `${what}: ${ds.join(' vs ')}`));
  return ds[0];
};
