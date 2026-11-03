// Heights and distances helpers for ICSE 10 Mathematics ch21.
// - Numbers: table values to four decimals (as in the ICSE tables), rounding, and a "not near a rounding boundary" test.
// - Geometry: angle and distance from coordinates, and scene(): a figure drawn from real coordinates (metres) at a stated
//   scale; every numeric length label and every degree label is asserted against the coordinates, so a figure cannot
//   disagree with the problem it illustrates.
import { geom } from './lib.mjs';

export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const must = (cond, msg) => { if (!cond) throw new Error(`ch21 check failed: ${msg}`); };
export const near = (a, b, e = 1e-9) => Math.abs(a - b) <= e;
export const R3 = (v) => Math.round(v * 1000) / 1000;
/** Round half away from zero to dp decimals, tolerant of binary noise. */
export const rnd = (x, dp = 0) => { const f = 10 ** dp; return Math.round(Math.abs(x) * f + 1e-9) / f * Math.sign(x || 1); };
/** True when x is not within `margin` (fraction of the last place) of a rounding boundary at dp decimals. */
export const safe = (x, dp = 1, margin = 0.08) => { const y = Math.abs(x) * 10 ** dp; return Math.abs(y - Math.floor(y) - 0.5) > margin; };
/** Trigonometric table value of f at a whole number of degrees, to four decimal places. */
export const tab = (fn, d) => {
  const t = rad(d);
  const v = { sin: Math.sin(t), cos: Math.cos(t), tan: Math.tan(t), cot: 1 / Math.tan(t) }[fn];
  return Math.round(v * 1e4) / 1e4;
};
export const tn = (d) => Math.tan(rad(d));
export const sn = (d) => Math.sin(rad(d));
export const cs = (d) => Math.cos(rad(d));
export const ct = (d) => 1 / Math.tan(rad(d));
/** A table-based answer and an exact answer round to the same value, and neither sits near a rounding boundary. */
export function stable(exact, viaTable, dp = 1, margin = 0.08) { return rnd(exact, dp) === rnd(viaTable, dp) && safe(exact, dp, margin) && safe(viaTable, dp, margin); }
/** Same test for answers from surds with sqrt 3 = 1.732 (exact vs 1.732 differ by under 0.001): a smaller margin is enough. */
export const stableS = (exact, approx, dp = 1) => stable(exact, approx, dp, 0.02);

export const dist = (A, B) => Math.hypot(A[0] - B[0], A[1] - B[1]);
/** Angle in degrees at V between rays VA and VB. */
export function angAt(V, A, B) {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  const c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b));
  return deg(Math.acos(Math.max(-1, Math.min(1, c))));
}
/** Check a scenario against its givens: angles [[at, from, to, degrees]], lengths [[P, Q, metres]], tolerance tol. */
export function holds(pts, { angles = [], lens = [], tol = 1e-6 } = {}) {
  return angles.every(([v, a, b, d]) => near(angAt(pts[v], pts[a], pts[b]), d, tol)) && lens.every(([p, q, l]) => near(dist(pts[p], pts[q]), l, tol));
}

const LABEL_SIDE = { n: 'n', ne: 'ne', e: 'e', se: 'se', s: 's', sw: 'sw', w: 'w', nw: 'nw' };
/**
 * Figure from real coordinates in metres (x to the right, y up, ground y = 0).
 *  pts:   { NAME: [x, y] }          all points, including helper points
 *  names: { NAME: 'label' | false }  label shown instead of the name (false hides it)
 *  pos:   { NAME: 'n'|'s'|... }      label placement
 *  segs:  [from, to, label?, { dashed }]  label: a number (metres, asserted equal to the true length) or a LaTeX string
 *  angs:  [at, from, to, label?, { right }]  label: a number (degrees, asserted) or a string
 *  k:     drawing units per metre
 */
export function scene({ pts, k, names = {}, pos = {}, segs = [], angs = [], polys = [], pad = [0.9, 0.8, 0.9, 0.9], unit = 'm' }, alt, caption) {
  const xs = Object.values(pts).map((p) => p[0]), ys = Object.values(pts).map((p) => p[1]);
  const minx = Math.min(...xs), miny = Math.min(...ys);
  const [pl, pb, pr, pt] = pad;
  const P = {};
  for (const [n, p] of Object.entries(pts)) {
    const at = [R3((p[0] - minx) * k + pl), R3((p[1] - miny) * k + pb)];
    const lab = names[n];
    P[n] = lab === undefined && !pos[n] ? { at } : { at, ...(lab !== undefined ? { label: lab } : {}), ...(pos[n] ? { label_position: LABEL_SIDE[pos[n]] } : {}) };
  }
  const width = R3(Math.max(...Object.values(P).map((p) => p.at[0])) + pr);
  const height = R3(Math.max(...Object.values(P).map((p) => p.at[1])) + pt);
  const segments = segs.map(([from, to, lab, o]) => {
    let label;
    if (typeof lab === 'number') {
      must(near(dist(pts[from], pts[to]), lab, 1e-6), `segment ${from}${to} is ${dist(pts[from], pts[to])} m, labelled ${lab}`);
      label = `${lab} ${unit}`;
    } else label = lab;
    return { from, to, ...(label ? { label } : {}), ...(o?.dashed ? { dashed: true } : {}) };
  });
  const angles = angs.map(([at, from, to, lab, o]) => {
    const m = angAt(pts[at], pts[from], pts[to]);
    let label;
    if (typeof lab === 'number') { must(near(m, lab, 1e-6), `angle at ${at} measures ${m}, labelled ${lab}`); label = `$${lab}^\\circ$`; } else label = lab;
    if (o?.right) must(near(m, 90, 1e-6), `angle at ${at} is not a right angle`);
    return { at, from, to, ...(label ? { label } : {}), ...(o?.right ? { right: true } : {}) };
  });
  const polygons = polys.map((v) => ({ vertices: v, fill: true }));
  return geom({ width, height, scale: { unit, per_unit: k }, points: P, segments, angles, polygons }, alt, caption);
}
