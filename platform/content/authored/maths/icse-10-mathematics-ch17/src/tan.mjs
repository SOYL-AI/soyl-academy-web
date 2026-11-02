// Tangent, chord and secant geometry for ICSE 10 Mathematics ch17 (Circles: Tangents, Secants and Intersecting Chords).
// Every configuration is built from real coordinates: tangent points are computed exactly (foot of the polar), secants and
// chords are placed so that the stated segment lengths hold, and every length and angle that a figure label, a worked
// example or a model answer states is asserted against the coordinates (to 1e-6).
import { geom } from './lib.mjs';
import { must, near, dist, angDeg, rad, cfg, onC, lerp, meet } from './cyc.mjs';
import { steps, ARITH, eqctx } from './work.mjs';

export { must, near, dist, angDeg, rad, cfg, onC, lerp, meet, steps, ARITH, eqctx };
export const J = (lines) => lines.join('\n\n');
export const A = (lines) => steps(ARITH, lines);
export const W = (ctx, lines) => steps(ctx, lines);

const r4 = (v) => Math.round(v * 1e4) / 1e4;
export const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
export const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
export const mul = (p, s) => [p[0] * s, p[1] * s];
export const unit = (p) => mul(p, 1 / Math.hypot(p[0], p[1]));
export const dot = (p, q) => p[0] * q[0] + p[1] * q[1];
export const rot = (p, deg) => { const t = rad(deg), c = Math.cos(t), s = Math.sin(t); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
export const along = (P, Q, s) => add(P, mul(unit(sub(Q, P)), s)); // point at distance s from P towards Q

/** The two tangent points from an external point P to the circle (O, r): [upper, lower] relative to the direction O -> P. */
export function tangentPts(O, r, P) {
  const d = dist(O, P);
  must(d > r, 'P must be outside the circle');
  const v = sub(P, O), base = add(O, mul(v, (r * r) / (d * d))), h = (r * Math.sqrt(d * d - r * r)) / (d * d), perp = [-v[1], v[0]];
  return [add(base, mul(perp, h)), sub(base, mul(perp, h))];
}
/** Circle configuration: O at the origin with radius r, P = (d, 0); returns the world points O, P, A (upper), B (lower). */
export function tanCfg(r, d, extra = {}) {
  const O = [0, 0], P = [d, 0], [A1, B1] = tangentPts(O, r, P);
  return cfg({ O, P, A: A1, B: B1, ...extra });
}
/** Two intersecting chords AB, CD through P inside the circle (O at the origin, radius R): PA = a, PB = b, PC = c, PD = d. */
export function inChords(R, a, b, c, d) {
  must(near(a * b, c * d), 'products of segments must agree');
  const e2 = R * R - a * b;
  must(e2 > 0, 'P must be inside the circle');
  const e = Math.sqrt(e2), P = [e, 0];
  const place = (s1, s2, sign) => {
    const cosT = (s1 - s2) / (2 * e);
    must(Math.abs(cosT) <= 1, 'chord does not fit in the circle');
    const u = rot([1, 0], sign * (Math.acos(cosT) * 180) / Math.PI); // P . u = (s1 - s2) / 2
    return [sub(P, mul(u, s1)), add(P, mul(u, s2))];
  };
  const [Ap, Bp] = place(a, b, 1), [Cp, Dp] = place(c, d, -1);
  return cfg({ O: [0, 0], P, A: Ap, B: Bp, C: Cp, D: Dp });
}
/** Secants from P = (dd, 0) to the circle (O at the origin, radius R): PA = a, PB = b (A nearer), PC = c, PD = e; tangent PT. */
export function extSecants(R, dd, a, b, c, e) {
  const p2 = dd * dd - R * R;
  must(near(a * b, p2) && (c === undefined || near(c * e, p2)), 'PA.PB = PC.PD = d^2 - R^2 must hold');
  const P = [dd, 0], dirTo = [-1, 0];
  const line = (s1, s2, sign) => {
    const cosT = (s1 + s2) / (2 * dd);
    must(cosT <= 1 + 1e-12, 'secant does not reach the circle');
    const u = rot(dirTo, sign * (Math.acos(Math.min(1, cosT)) * 180) / Math.PI);
    return [add(P, mul(u, s1)), add(P, mul(u, s2))];
  };
  const [Ap, Bp] = line(a, b, -1), [Cp, Dp] = c === undefined ? [null, null] : line(c, e, 1);
  const [T1] = tangentPts([0, 0], R, P);
  return cfg({ O: [0, 0], P, A: Ap, B: Bp, ...(Cp ? { C: Cp, D: Dp } : {}), T: T1 });
}
/** Two circles on the x-axis: O1 = (0,0) radius r1 and O2 = (d,0) radius r2; direct (outer) or transverse common tangent. */
export function twoCircles(r1, r2, d, kind = 'direct') {
  const O1 = [0, 0], O2 = [d, 0];
  const nx = kind === 'direct' ? (r1 - r2) / d : (r1 + r2) / d;
  must(Math.abs(nx) <= 1, 'circles too close for that tangent');
  const n = [nx, Math.sqrt(1 - nx * nx)];
  const P = add(O1, mul(n, r1)), Q = kind === 'direct' ? add(O2, mul(n, r2)) : sub(O2, mul(n, r2));
  return cfg({ O1, O2, P, Q });
}
/** A point on the circle at the given position (degrees) and the tangent direction there. */
export const tangentAt = (R, deg) => { const T = onC(R, deg); return { T, v: [-Math.sin(rad(deg)), Math.cos(rad(deg))] }; };

// ---------------------------------------------------------------- figures
const COMPASS = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'];
const compass = (v) => COMPASS[Math.round((((Math.atan2(v[1], v[0]) * 180) / Math.PI) % 360 + 360) % 360 / 45) % 8];
/**
 * General figure (any number of circles). World points are in `pts` ({ name: [x, y] }); names starting with "_" are hidden.
 *   circles: [[centreName, R]]
 *   segs:    [from, to, label?, { dashed, ticks }?]     a label such as "12" or "12 cm" must equal the true length
 *   angles:  [at, from, to, label?, { arcs, right }?]   a numeric degree label must equal the measured angle
 *   expectLen: [[P, Q, value]]  expectAng: [[at, from, to, degrees]]   asserted against the coordinates
 */
export function tfig({ k = 1, pts = {}, circles = [], segs = [], angles = [], expectLen = [], expectAng = [], margin = 0.95, pos = {}, names = {} }, alt, caption) {
  const P = (n) => { must(pts[n], `unknown point ${n}`); return pts[n]; };
  const xs = Object.values(pts).map((p) => p[0]), ys = Object.values(pts).map((p) => p[1]);
  let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  for (const [c, R] of circles) { const o = P(c); x0 = Math.min(x0, o[0] - R); x1 = Math.max(x1, o[0] + R); y0 = Math.min(y0, o[1] - R); y1 = Math.max(y1, o[1] + R); }
  const to = (p) => [r4((p[0] - x0) * k + margin), r4((p[1] - y0) * k + margin)];
  const cen = circles.length ? [circles.reduce((s, [c]) => s + P(c)[0], 0) / circles.length, circles.reduce((s, [c]) => s + P(c)[1], 0) / circles.length] : [(x0 + x1) / 2, (y0 + y1) / 2];
  const isCentre = (n) => circles.some(([c]) => c === n);
  const points = {};
  for (const [n, p] of Object.entries(pts)) {
    const o = { at: to(p) };
    if (n.startsWith('_')) o.label = false; else if (names[n]) o.label = names[n];
    if (!n.startsWith('_')) o.label_position = pos[n] ?? (isCentre(n) ? 'sw' : compass(sub(p, cen)));
    points[n] = o;
  }
  const segments = segs.map(([f, t, label, o = {}]) => {
    P(f); P(t);
    const m = label !== undefined ? /^(\d+(?:\.\d+)?)( cm| m| mm)?$/.exec(label) : null;
    if (m) must(near(dist(P(f), P(t)), Number(m[1])), `segment ${f}${t} labelled ${label} is really ${dist(P(f), P(t))}`);
    return { from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.dashed ? { dashed: true } : {}), ...(o.ticks ? { ticks: o.ticks } : {}) };
  });
  const angs = angles.map(([at, f, t, label, o = {}]) => {
    const m = angDeg(P(at), P(f), P(t));
    if (label !== undefined) { const d = /^\$?(\d+(?:\.\d+)?)\^\\circ\$?$/.exec(label); if (d) must(Math.abs(m - Number(d[1])) < 1e-6, `angle ${f}${at}${t} labelled ${label} is really ${m}`); }
    if (o.right) must(Math.abs(m - 90) < 1e-6, `angle ${f}${at}${t} is not right (${m})`);
    return { at, from: f, to: t, ...(label !== undefined ? { label } : {}), ...(o.right ? { right: true } : {}), ...(o.arcs ? { arcs: o.arcs } : {}) };
  });
  for (const [a, b, v] of expectLen) must(near(dist(P(a), P(b)), v), `expected length ${a}${b} = ${v}, measured ${dist(P(a), P(b))}`);
  for (const [at, f, t, v] of expectAng) must(Math.abs(angDeg(P(at), P(f), P(t)) - v) < 1e-6, `expected angle ${f}${at}${t} = ${v}, measured ${angDeg(P(at), P(f), P(t))}`);
  const spec = { width: r4((x1 - x0) * k + 2 * margin), height: r4((y1 - y0) * k + 2 * margin), points, segments, angles: angs, polygons: [], circles: circles.map(([c, R]) => ({ center: c, radius: r4(R * k) })) };
  return geom(spec, alt, caption);
}
/** World points of a cfg (without the hidden-centre convention): names -> coordinates. */
export const worldOf = (g, names) => Object.fromEntries(names.map((n) => [n, g.W[n]]));
