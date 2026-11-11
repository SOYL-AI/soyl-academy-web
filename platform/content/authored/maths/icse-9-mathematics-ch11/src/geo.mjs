// Synthetic-geometry helper for ICSE 9 Mathematics ch11 (Rectilinear Figures: Parallelograms).
// Every figure is built from coordinates (in cm, y up). Lengths, angles, parallelism (cross products), the diagonals' mid-point and
// the congruent triangles of every proof are computed from the coordinates, and the builder throws if a stated length label, a tick
// (equal-length) mark, an arrow (parallel) mark, a right-angle mark or a degree label disagrees with the coordinates. The same
// functions re-solve the claims in the questions: props, para, paraSA, oppAnglesProof, onePairProof, diagProof, rhombus,
// rhombusProof, rect, rectProof, square.
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


export const area = (...P) => Math.abs(P.reduce((s, p, i) => s + cross(p, P[(i + 1) % P.length]), 0)) / 2;
/** Angle PVQ with the vertex in the middle (as in the notation of the proofs). */
export const ang = (P, V, Q) => angDeg(V, P, Q);
/** Interior angle of the polygon at vertex i (vertices in order). */
export const interior = (V, i) => angDeg(V[i], V[(i + V.length - 1) % V.length], V[(i + 1) % V.length]);
/** Triangles with equal sides (in any order) are congruent (SSS), so every matching part is equal. */
export const congruentSSS = (P, Q) => {
  const s = (T) => [dist(T[0], T[1]), dist(T[1], T[2]), dist(T[2], T[0])].sort((a, b) => a - b);
  const a = s(P), b = s(Q);
  return a.every((x, i) => near(x, b[i], 1e-9)) && near(area(...P), area(...Q), 1e-9);
};

// ---------------------------------------------------------------- parallelograms as checked computations
/** True for a parallelogram ABCD (vertices in order): both pairs of opposite sides parallel. */
export const isPar = (A, B, C, D) => nondegenerate(A, B, D) && parallel(A, B, D, C) && parallel(A, D, B, C);
/**
 * Properties of the parallelogram ABCD. Every one is asserted from the coordinates: opposite sides parallel and equal, opposite
 * angles equal, adjacent angles supplementary, the diagonals bisect each other at O, each diagonal cuts it into two congruent
 * triangles of half the area, the four triangles at O have equal area, and the four angles add up to 360.
 */
export function props(A, B, C, D) {
  must(isPar(A, B, C, D), 'ABCD is a parallelogram');
  const V = [A, B, C, D];
  must(near(dist(A, B), dist(D, C)) && near(dist(A, D), dist(B, C)), 'opposite sides equal');
  const [a, b, c, d] = V.map((_, i) => interior(V, i));
  must(near(a, c, 1e-9) && near(b, d, 1e-9) && near(a + b, 180, 1e-9) && near(a + b + c + d, 360, 1e-9), 'opposite angles equal, adjacent supplementary, sum 360');
  const O = mid(A, C);
  must(isMid(O, B, D), 'the diagonals bisect each other');
  must(congruentSSS([A, B, C], [C, D, A]) && congruentSSS([B, C, D], [D, A, B]), 'each diagonal cuts it into two congruent triangles');
  must(near(area(A, B, C), area(A, B, C, D) / 2) && near(area(A, C, D), area(A, B, C, D) / 2), 'each diagonal halves the area');
  must(near(area(A, O, B), area(A, B, C, D) / 4) && near(area(B, O, C), area(A, O, B)) && near(area(C, O, D), area(A, O, B)), 'four triangles at O have equal area');
  return { A, B, C, D, O, ab: dist(A, B), ad: dist(A, D), ac: dist(A, C), bd: dist(B, D), angA: a, angB: b, per: perimeter(A, B, C, D), area: area(A, B, C, D) };
}
/** Parallelogram ABCD from A, B and D (C = B + D - A), with all its properties asserted. */
export function para(A, B, D) {
  must(nondegenerate(A, B, D), 'A, B, D not collinear');
  return props(A, B, add(B, sub(D, A)), D);
}
/** Parallelogram with AB = ab along the x-axis, AD = ad, angle A = deg. */
export const paraSA = (ab, ad, deg) => para([0, 0], [ab, 0], polar([0, 0], ad, deg));
/**
 * The proof that the opposite angles of ABCD are equal: AD parallel to BC gives angle A + angle B = 180 (co-interior angles);
 * AB parallel to DC gives angle B + angle C = 180; so angle A = angle C.
 */
export function oppAnglesProof(A, B, C, D) {
  const p = props(A, B, C, D);
  const V = [A, B, C, D];
  must(parallel(A, D, B, C) && near(interior(V, 0) + interior(V, 1), 180), 'co-interior angles A and B add up to 180 (AD parallel to BC, transversal AB)');
  must(parallel(A, B, D, C) && near(interior(V, 1) + interior(V, 2), 180), 'co-interior angles B and C add up to 180 (AB parallel to DC, transversal BC)');
  must(near(interior(V, 0), 180 - interior(V, 1)) && near(interior(V, 0), interior(V, 2)), 'so angle A = 180 - angle B = angle C');
  return p;
}
/**
 * A quadrilateral ABCD with AB parallel to DC and AB = DC (as vectors B - A = C - D), checked to be a parallelogram, and the proof that
 * its opposite angles are equal: join AC; triangles ABC and CDA have AB = CD, angle BAC = angle DCA (alternate angles) and AC common
 * (SAS), so angle B = angle D and angle BCA = angle DAC; adding the angles at A and at C gives angle A = angle C.
 */
export function onePairProof(A, B, C, D) {
  must(parallel(A, B, D, C) && near(dist(A, B), dist(D, C)) && near(cross(sub(B, A), sub(C, D)), 0) && dot(sub(B, A), sub(C, D)) > 0, 'AB parallel to DC, AB = DC, in the same direction');
  must(near(ang(B, A, C), ang(D, C, A)), 'angle BAC = angle DCA (alternate angles)');
  must(congruentSSS([A, B, C], [C, D, A]), 'triangles ABC and CDA are congruent (SAS)');
  const V = [A, B, C, D];
  must(near(interior(V, 1), interior(V, 3)), 'angle B = angle D (corresponding parts)');
  must(near(ang(B, C, A), ang(D, A, C)) && parallel(A, D, B, C), 'angle BCA = angle DAC (corresponding parts): alternate angles, so AD parallel to BC');
  must(near(ang(B, A, C) + ang(C, A, D), interior(V, 0)) && near(ang(D, C, A) + ang(A, C, B), interior(V, 2)) && near(interior(V, 0), interior(V, 2)), 'angle A = BAC + CAD = DCA + ACB = angle C');
  return props(A, B, C, D);
}
/** Diagonals bisect each other: triangles AOB and COD have AB = CD and equal alternate angles at A, C and at B, D (ASA), so OA = OC and OB = OD. */
export function diagProof(A, B, C, D) {
  const p = props(A, B, C, D);
  const { O } = p;
  must(parallel(A, B, D, C) && near(dist(A, B), dist(D, C)), 'AB = CD and AB parallel to CD');
  must(near(ang(O, A, B), ang(O, C, D)) && near(ang(O, B, A), ang(O, D, C)), 'alternate angles OAB = OCD and OBA = ODC');
  must(congruentSSS([A, O, B], [C, O, D]) && near(dist(A, O), dist(O, C)) && near(dist(B, O), dist(O, D)), 'triangles AOB and COD congruent: OA = OC and OB = OD');
  return p;
}
/** Rhombus ABCD: parallelogram with four equal sides; diagonals perpendicular, bisecting each other and the angles. */
export function rhombus(A, B, C, D) {
  const p = props(A, B, C, D);
  const s = dist(A, B);
  must([dist(B, C), dist(C, D), dist(D, A)].every((x) => near(x, s)), 'all four sides equal');
  must(near(dot(sub(C, A), sub(D, B)), 0, 1e-9) && near(angDeg(p.O, A, B), 90), 'diagonals perpendicular');
  must(near(ang(A, B, D), p.angB / 2) && near(ang(B, A, C), p.angA / 2) && near(ang(A, D, B), p.angB / 2) && near(ang(D, A, C), p.angA / 2), 'each diagonal bisects the angles at its ends');
  must(congruentSSS([A, p.O, B], [C, p.O, D]) && congruentSSS([A, p.O, B], [A, p.O, D]) && congruentSSS([A, p.O, B], [B, p.O, C]), 'four congruent right triangles at O');
  return { ...p, side: s };
}
/** Rhombus with diagonals AC = d1 (along x) and BD = d2 (along y). */
export const rhombusD = (d1, d2) => rhombus([-d1 / 2, 0], [0, -d2 / 2], [d1 / 2, 0], [0, d2 / 2]);
/** The proof that the diagonals of a rhombus meet at right angles: triangles AOB and AOD have AB = AD, OB = OD, OA common (SSS); angle AOB = angle AOD and they lie on a straight line, so each is 90. */
export function rhombusProof(A, B, C, D) {
  const rh = rhombus(A, B, C, D);
  const { O } = rh;
  must(near(dist(A, B), dist(A, D)) && near(dist(O, B), dist(O, D)) && congruentSSS([A, O, B], [A, O, D]), 'SSS: triangles AOB and AOD congruent');
  must(near(angDeg(O, A, B), angDeg(O, A, D)) && near(angDeg(O, A, B) + angDeg(O, A, D), 180) && near(angDeg(O, A, B), 90), 'equal angles on a straight line: each is 90');
  return rh;
}
/** Rectangle ABCD: four right angles, equal diagonals, OA = OB = OC = OD. */
export function rect(A, B, C, D) {
  const p = props(A, B, C, D);
  must([0, 1, 2, 3].every((i) => near(interior([A, B, C, D], i), 90)) && near(p.ac, p.bd), 'four right angles and equal diagonals');
  must([dist(p.O, A), dist(p.O, B), dist(p.O, C), dist(p.O, D)].every((x) => near(x, p.ac / 2)), 'OA = OB = OC = OD = half a diagonal');
  must(near(p.ac * p.ac, p.ab * p.ab + p.ad * p.ad), 'diagonal squared = length squared + breadth squared');
  return p;
}
export const rectLB = (l, b) => rect([0, 0], [l, 0], [l, b], [0, b]);
/** The proof that the diagonals of a rectangle are equal: triangles ABC and DCB have AB = DC, BC common and angle B = angle C = 90 (SAS), so AC = DB. */
export function rectProof(A, B, C, D) {
  const rc = rect(A, B, C, D);
  must(near(dist(A, B), dist(D, C)) && near(ang(A, B, C), 90) && near(ang(B, C, D), 90) && congruentSSS([A, B, C], [D, C, B]) && near(dist(A, C), dist(D, B)), 'SAS: triangles ABC and DCB congruent, so AC = DB');
  return rc;
}
/** Square ABCD: a rectangle and a rhombus at once. */
export function square(A, B, C, D) {
  const rc = rect(A, B, C, D);
  const rh = rhombus(A, B, C, D);
  must(near(ang(B, A, C), 45) && near(angDeg(rc.O, A, B), 90), 'square: diagonals bisect the angles into 45 and meet at 90');
  return { ...rc, side: rh.side };
}
export const squareS = (s) => square([0, 0], [s, 0], [s, s], [0, s]);

/** Parallelogram ABCD whose diagonals cross at O = origin: AC = d1 along the x-axis, BD = d2, the angle between them deg (D above the axis). */
export function paraDiag(d1, d2, deg) {
  const w = polar([0, 0], d2 / 2, deg);
  return props([-d1 / 2, 0], [-w[0], -w[1]], [d1 / 2, 0], w);
}
/** Parallelogram ABCD from the sides of triangle AOB (OA = oa, OB = ob, AB = ab), O the mid-point of both diagonals. */
export function paraTri(oa, ob, ab) {
  const x = (ab * ab - ob * ob - oa * oa) / (2 * oa);
  must(Math.abs(x) < ob, 'triangle AOB exists');
  const B = [x, Math.sqrt(ob * ob - x * x)];
  return props([-oa, 0], B, [oa, 0], [-B[0], -B[1]]);
}
/** Triangle ABC with AB = c on the x-axis, angle A = a and angle B = b (degrees), C above the axis. */
export function triASA(c, a, b) {
  const C = meet([0, 0], polar([0, 0], 1, a), [c, 0], polar([c, 0], 1, 180 - b));
  return { A: [0, 0], B: [c, 0], C };
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
