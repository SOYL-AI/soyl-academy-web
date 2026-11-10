// Synthetic-geometry helper for ICSE 9 Mathematics ch09 (Mid-Point and Intercept Theorems).
// Every figure is built from coordinates (in cm, y up). Mid-points, lengths, parallelism (cross products) and intercepts are
// computed from the coordinates, and the builder throws if a stated length label, a tick (equal-length) mark, an arrow
// (parallel) mark, a right-angle mark or a degree label disagrees with the coordinates. The same functions re-solve every
// claim in the questions: midTheorem, midProof, converse, converseProof, medial, quadMid, trapezium, intercepts, divide.
import { geom } from './lib.mjs';

export const must = (c, m) => { if (!c) throw new Error(`geometry self-check failed: ${m}`); };
export const near = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
export const sub = (P, Q) => [P[0] - Q[0], P[1] - Q[1]];
export const add = (P, Q) => [P[0] + Q[0], P[1] + Q[1]];
export const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
export const lerp = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
export const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
export const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
export const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
export const r6 = (v) => Math.round(v * 1e6) / 1e6;
export const rad = (d) => (d * Math.PI) / 180;
export const polar = (V, len, deg) => [V[0] + len * Math.cos(rad(deg)), V[1] + len * Math.sin(rad(deg))];
export const angDeg = (V, A, B) => {
  const a = sub(A, V), b = sub(B, V);
  return (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
};
/** AB parallel to CD (non-degenerate segments). */
export const parallel = (A, B, C, D) => dist(A, B) > 1e-9 && dist(C, D) > 1e-9 && Math.abs(cross(sub(B, A), sub(D, C))) < 1e-9 * dist(A, B) * dist(C, D);
export const collinear = (A, B, C) => Math.abs(cross(sub(B, A), sub(C, A))) < 1e-9 * Math.max(1, dist(A, B) * dist(A, C));
export const sameLine = (A, B, C, D) => collinear(A, B, C) && collinear(A, B, D);
export const isMid = (M, A, B) => near(M[0], (A[0] + B[0]) / 2) && near(M[1], (A[1] + B[1]) / 2);
export const meet = (A, B, C, D) => {
  const u = sub(B, A), v = sub(D, C);
  const den = cross(u, v);
  must(Math.abs(den) > 1e-12, 'lines are parallel, no meeting point');
  const t = cross(sub(C, A), v) / den;
  return [A[0] + t * u[0], A[1] + t * u[1]];
};
export const perimeter = (...P) => P.reduce((s, p, i) => s + dist(p, P[(i + 1) % P.length]), 0);
export const parallelogram = (A, B, C, D) => parallel(A, B, D, C) && parallel(A, D, B, C);
export const nondegenerate = (A, B, C) => Math.abs(cross(sub(B, A), sub(C, A))) > 1e-9;

// ---------------------------------------------------------------- theorems as checked computations
/** Mid-point theorem on triangle ABC: D, E mid-points of AB, AC. Asserts DE parallel to BC and DE = BC / 2; returns the points. */
export function midTheorem(A, B, C) {
  must(nondegenerate(A, B, C), 'triangle');
  const D = mid(A, B), E = mid(A, C);
  must(parallel(D, E, B, C), 'DE is parallel to BC');
  must(near(dist(D, E), dist(B, C) / 2), 'DE is half of BC');
  return { D, E, de: dist(D, E), bc: dist(B, C) };
}
/** The proof of the mid-point theorem: F on DE produced with EF = DE; triangles AED and CEF congruent; BDFC a parallelogram. */
export function midProof(A, B, C) {
  const { D, E } = midTheorem(A, B, C);
  const F = [2 * E[0] - D[0], 2 * E[1] - D[1]];
  must(near(dist(E, F), dist(D, E)) && collinear(D, E, F), 'EF = DE on the line DE produced');
  must(near(dist(A, E), dist(C, E)), 'AE = EC');
  must(near(angDeg(E, A, D), angDeg(E, C, F)), 'vertically opposite angles AED and CEF');
  must(near(dist(A, D), dist(C, F)) && near(dist(A, D), dist(D, B)), 'CF = AD = DB (congruent triangles)');
  must(near(angDeg(A, D, E), angDeg(C, F, E)), 'angle ADE = angle CFE (corresponding parts)');
  must(parallel(A, B, C, F), 'CF is parallel to AB (alternate angles)');
  must(parallelogram(B, D, F, C), 'BDFC is a parallelogram (BD = CF and BD parallel to CF)');
  must(parallel(D, F, B, C) && near(dist(D, F), dist(B, C)), 'DF is parallel and equal to BC');
  return { D, E, F, df: dist(D, F), bc: dist(B, C) };
}
/** Converse: D mid-point of AB; the line through D parallel to BC meets AC at E; E is the mid-point of AC. */
export function converse(A, B, C) {
  must(nondegenerate(A, B, C), 'triangle');
  const D = mid(A, B);
  const E = meet(D, add(D, sub(C, B)), A, C);
  must(isMid(E, A, C), 'E is the mid-point of AC');
  must(near(dist(D, E), dist(B, C) / 2), 'and DE is half of BC');
  return { D, E };
}
/** The proof of the converse: E2 the mid-point of AC; DE2 is parallel to BC by the mid-point theorem, so E2 lies on the parallel through D. */
export function converseProof(A, B, C) {
  const { D, E } = converse(A, B, C);
  const E2 = mid(A, C);
  must(parallel(D, E2, B, C) && sameLine(D, E, D, E2), 'the parallel through D is unique: DE and DE2 are one line');
  return { D, E, E2 };
}
/** Triangle of mid-points: F on AB, E on AC, D on BC. */
export function medial(A, B, C) {
  const { D: F, E } = midTheorem(A, B, C);
  const D = mid(B, C);
  must(parallel(D, E, A, B) && parallel(D, F, A, C), 'the other two sides are parallel too');
  must(near(dist(D, E), dist(A, B) / 2) && near(dist(D, F), dist(A, C) / 2) && near(dist(E, F), dist(B, C) / 2), 'each side of DEF is half of a side of ABC');
  const per = dist(D, E) + dist(E, F) + dist(F, D);
  must(near(per, perimeter(A, B, C) / 2), 'perimeter of DEF is half the perimeter of ABC');
  return { D, E, F, per, perABC: perimeter(A, B, C) };
}
/** Mid-points P, Q, R, S of AB, BC, CD, DA of a quadrilateral: PQRS is a parallelogram with sides half the diagonals. */
export function quadMid(A, B, C, D) {
  const P = mid(A, B), Q = mid(B, C), R = mid(C, D), S = mid(D, A);
  must(parallel(P, Q, A, C) && parallel(R, S, A, C) && parallel(Q, R, B, D) && parallel(P, S, B, D), 'sides parallel to the diagonals');
  must(near(dist(P, Q), dist(A, C) / 2) && near(dist(R, S), dist(A, C) / 2) && near(dist(Q, R), dist(B, D) / 2) && near(dist(S, P), dist(B, D) / 2), 'sides are half the diagonals');
  must(parallelogram(P, Q, R, S), 'PQRS is a parallelogram');
  const ac = dist(A, C), bd = dist(B, D);
  return { P, Q, R, S, ac, bd, per: perimeter(P, Q, R, S), perpendicularDiagonals: near(dot(sub(C, A), sub(D, B)), 0, 1e-9), equalDiagonals: near(ac, bd) };
}
/** Trapezium ABCD with AB parallel to DC: M, N mid-points of the legs AD and BC. */
export function trapezium(A, B, C, D) {
  must(parallel(A, B, D, C), 'AB parallel to DC');
  const M = mid(A, D), N = mid(B, C);
  must(parallel(M, N, A, B), 'MN parallel to the bases');
  must(near(dist(M, N), (dist(A, B) + dist(D, C)) / 2), 'MN is the mean of the bases');
  const P = mid(A, C), Q = mid(B, D); // mid-points of the diagonals lie on MN
  must(collinear(M, N, P) && collinear(M, N, Q), 'mid-points of the diagonals lie on MN');
  must(near(dist(P, Q), Math.abs(dist(D, C) - dist(A, B)) / 2), 'PQ is half the difference of the bases');
  return { M, N, P, Q, mn: dist(M, N), pq: dist(P, Q) };
}
/** Equal intercept theorem: parallel lines (direction dir) through the points of transversal T1 at parameters ts; transversal T2 cuts them. */
export function intercepts(T1a, T1b, dir, ts, T2a, T2b) {
  const on1 = ts.map((t) => lerp(T1a, T1b, t));
  const on2 = on1.map((P) => meet(P, add(P, dir), T2a, T2b));
  const seg = (arr) => arr.slice(1).map((p, i) => dist(arr[i], p));
  const s1 = seg(on1), s2 = seg(on2);
  if (s1.every((x) => near(x, s1[0]))) must(s2.every((x) => near(x, s2[0])), 'equal intercepts on one transversal give equal intercepts on the other');
  return { on1, on2, s1, s2 };
}
/** Divides AB into n equal parts with the construction: ray from A, n equal steps, join the last mark to B, parallels through the marks. */
export function divide(A, B, n, rayDeg, step = 1) {
  const marks = Array.from({ length: n + 1 }, (_, i) => polar(A, step * i, rayDeg));
  const dir = sub(B, marks[n]);
  const pts = marks.map((m) => meet(m, add(m, dir), A, B));
  must(near(dist(pts[0], A), 0) && near(dist(pts[n], B), 0), 'the first and last parallels pass through A and B');
  const parts = pts.slice(1).map((p, i) => dist(pts[i], p));
  must(parts.every((x) => near(x, dist(A, B) / n)), `AB is cut into ${n} equal parts`);
  return { marks, pts, part: dist(A, B) / n };
}

// ---------------------------------------------------------------- figures
const COMPASS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
const compass = (deg) => COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
const r4 = (v) => Math.round(v * 1e4) / 1e4;
/**
 * Figure from coordinates in cm.
 *   pts:    { A: [x, y], _h: [x, y] (hidden label) }
 *   segs:   [from, to, label?, { dashed, ticks, arrows }?]   numeric labels ("7.5 cm") must equal the real length
 *   lines:  [[P, Q], dashed?]  infinite lines through two points
 *   angles: [at, from, to, label?, { arcs, right }?]          numeric degree labels and right marks are measured
 *   polys:  [[names], highlight?]
 *   pos:    compass overrides for labels; names: replacement labels
 * Equal tick counts must mean equal lengths; equal arrow counts must mean parallel segments (checked here).
 */
export function fig({ pts, segs = [], lines = [], angles = [], polys = [], pos = {}, names = {}, k = 0.62, margin = 0.95, unit = 'cm' }, alt, caption) {
  const W = pts;
  const P = (n) => { must(W[n], `unknown point ${n}`); return W[n]; };
  const all = Object.values(W);
  const x0 = Math.min(...all.map((p) => p[0])), y0 = Math.min(...all.map((p) => p[1]));
  const x1 = Math.max(...all.map((p) => p[0])), y1 = Math.max(...all.map((p) => p[1]));
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const vis = Object.entries(W).filter(([n]) => !n.startsWith('_')).map(([, p]) => p);
  const cx = vis.reduce((s, p) => s + p[0], 0) / vis.length, cy = vis.reduce((s, p) => s + p[1], 0) / vis.length;
  const points = {};
  for (const [n, p] of Object.entries(W)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false;
    else {
      if (names[n]) o.label = names[n];
      o.label_position = pos[n] ?? compass((Math.atan2(p[1] - cy, p[0] - cx) * 180) / Math.PI);
    }
    points[n] = o;
  }
  const width = r4((x1 - x0) * k + 2 * margin), height = r4((y1 - y0) * k + 2 * margin);
  let numeric = false;
  const ticks = {}, arrows = {};
  const segments = segs.map(([f, t, label, o = {}]) => {
    P(f); P(t);
    if (label !== undefined && /^\d+(\.\d+)?(\s*(mm|cm|m|km))?$/.test(label.trim())) {
      numeric = true;
      must(near(dist(W[f], W[t]), Number(label.trim().split(/\s/)[0]), 1e-6), `segment ${f}${t} is labelled ${label} but is ${dist(W[f], W[t])} long`);
    }
    if (o.ticks) (ticks[o.ticks] ??= []).push([f, t]);
    if (o.arrows) (arrows[o.arrows] ??= []).push([f, t]);
    return { from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}), ...(o.arrows ? { arrows: o.arrows } : {}) };
  });
  for (const [c, list] of Object.entries(ticks)) for (const [f, t] of list) must(near(dist(W[f], W[t]), dist(W[list[0][0]], W[list[0][1]]), 1e-6), `tick group ${c}: ${f}${t} differs from ${list[0].join('')}`);
  for (const [c, list] of Object.entries(arrows)) for (const [f, t] of list) must(parallel(W[f], W[t], W[list[0][0]], W[list[0][1]]), `arrow group ${c}: ${f}${t} is not parallel to ${list[0].join('')}`);
  const lns = lines.map(([[a, b], dashed]) => { P(a); P(b); return { through: [a, b], ...(dashed ? { dashed: true } : {}) }; });
  const arcGroups = {};
  const angs = angles.map(([at, f, t, label, o = {}]) => {
    const m = angDeg(P(at), P(f), P(t));
    if (o.arcs) (arcGroups[o.arcs] ??= []).push([m, `${f}${at}${t}`]);
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${f}${at}${t} labelled ${label} but measures ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${f}${at}${t} is not a right angle`);
    return { at, from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  for (const [c, list] of Object.entries(arcGroups)) for (const [m, nm] of list) must(near(m, list[0][0], 1e-6), `arc group ${c}: angle ${nm} (${m}) differs from ${list[0][1]} (${list[0][0]})`);
  const polygons = polys.map(([vertices, highlight]) => { vertices.forEach(P); return { vertices, ...(highlight ? { highlight } : {}) }; });
  const spec = { width, height, points, segments, lines: lns, angles: angs, polygons };
  if (numeric) spec.scale = { unit, per_unit: k };
  return geom(spec, alt, caption);
}

// ---------------------------------------------------------------- triangle constructors
/** Triangle ABC with AB, BC, CA given (B at the origin, C on the x-axis, A above); the sides are asserted. */
export function triFromSides(ab, bc, ca) {
  const x = (ab * ab + bc * bc - ca * ca) / (2 * bc);
  const h2 = ab * ab - x * x;
  must(h2 > 1e-9, `no triangle with sides ${ab}, ${bc}, ${ca}`);
  const A = [x, Math.sqrt(h2)], B = [0, 0], C = [bc, 0];
  must(near(dist(A, B), ab, 1e-9) && near(dist(B, C), bc, 1e-9) && near(dist(C, A), ca, 1e-9), 'triangle sides');
  return { A, B, C };
}
/** Triangle with BC = a on the x-axis, angle B = deg at B and CA = b (the larger root for AB); the data are asserted. */
export function triFromBCAngleCA(a, deg, b) {
  const c0 = a * Math.cos(rad(deg));
  const disc = c0 * c0 - (a * a - b * b);
  must(disc > 0, 'triangle exists');
  const ab = c0 + Math.sqrt(disc);
  const B = [0, 0], C = [a, 0], A = polar(B, ab, deg);
  must(near(dist(C, A), b, 1e-9) && near(angDeg(B, A, C), deg, 1e-9), 'SAS data');
  return { A, B, C, ab };
}
export const area = (...P) => Math.abs(P.reduce((s, p, i) => s + cross(p, P[(i + 1) % P.length]), 0)) / 2;
