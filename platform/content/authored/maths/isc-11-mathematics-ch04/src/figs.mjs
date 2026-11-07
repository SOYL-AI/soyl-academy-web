// Figure builders for CBSE 11 Mathematics ch03: plots with free-point flags, unit-circle diagrams, sectors and arcs.
// Every coordinate is computed from the angle (never typed), rounded to 3 decimals.
import { geom, plot } from './lib.mjs';

const rd = (v) => Math.round(v * 1000) / 1000;
const RAD = (d) => (d * Math.PI) / 180;

/** plot() whose 'free' points are also flagged on_curve:false for the pipeline lint. */
export function plotF(spec, alt, caption) {
  const v = plot(spec, alt, caption);
  (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; });
  return v;
}

const W = 7, O = [3.5, 3.5], R = 2.8;
const onC = (deg, r = R) => [rd(O[0] + r * Math.cos(RAD(deg))), rd(O[1] + r * Math.sin(RAD(deg)))];

/**
 * Unit-circle diagram on a 7 x 7 canvas (circle radius 2.8 = one unit).
 * pts: [{ deg, name, label, pos, foot }]; foot draws a dashed perpendicular to the x-axis.
 * angle: { deg, label } draws the angle at O from the positive x-axis to the point with that deg (deg <= 180 for a measured label).
 * radii: draw O to each point.
 */
export function unitCircle({ pts = [], angle = null, radii = true, axes = true, chords = [], moreAngles = [], alt, caption }) {
  const points = {
    O: { at: O, label: '$O$', label_position: 'sw' },
    X: { at: onC(0), label: false },
    XL: { at: [0.3, 3.5], label: false }, XR: { at: [6.7, 3.5], label: false },
    YT: { at: [3.5, 6.7], label: false }, YB: { at: [3.5, 0.3], label: false },
  };
  const segments = [];
  if (axes) { segments.push({ from: 'XL', to: 'XR' }, { from: 'YB', to: 'YT' }); }
  for (const p of pts) {
    points[p.name] = { at: onC(p.deg), label: p.label ?? p.name, ...(p.pos ? { label_position: p.pos } : {}) };
    if (radii) segments.push({ from: 'O', to: p.name });
    if (p.foot) {
      points[`${p.name}f`] = { at: [onC(p.deg)[0], 3.5], label: false };
      segments.push({ from: p.name, to: `${p.name}f`, dashed: true });
    }
  }
  for (const [a, b, dashed] of chords) segments.push({ from: a, to: b, ...(dashed ? { dashed: true } : {}) });
  const angles = [...moreAngles];
  if (angle) {
    const target = pts.find((p) => p.deg === angle.deg);
    if (!target) throw new Error('unitCircle: angle target missing');
    angles.push({ at: 'O', from: 'X', to: target.name, label: angle.label });
  }
  return geom({ width: W, height: W, points, segments, circles: [{ center: 'O', radius: R }], angles }, alt, caption);
}

/** Arc drawn as a chain of short segments from deg0 to deg1 (deg1 > deg0) on a circle of radius r about O. */
function arcChain(points, segments, prefix, deg0, deg1, r, n = 24) {
  for (let k = 0; k <= n; k++) points[`${prefix}${k}`] = { at: onC(deg0 + ((deg1 - deg0) * k) / n, r), label: false };
  for (let k = 0; k < n; k++) segments.push({ from: `${prefix}${k}`, to: `${prefix}${k + 1}` });
}

/** A sector: two radii and the arc between them (angle thetaDeg from the x-axis), with an angle mark and labels. */
export function sector({ thetaDeg, rLabel = '$r$', arcLabel, angleLabel, alt, caption, r = R }) {
  const points = { O: { at: O, label: '$O$', label_position: 'sw' }, A: { at: onC(0, r), label: '$A$', label_position: 'e' }, B: { at: onC(thetaDeg, r), label: '$B$', label_position: 'ne' } };
  const segments = [{ from: 'O', to: 'A', ...(rLabel ? { label: rLabel } : {}) }, { from: 'O', to: 'B' }];
  arcChain(points, segments, 'a', 0, thetaDeg, r);
  if (arcLabel) points.M = { at: onC(thetaDeg / 2, r + 0.0), label: arcLabel, label_position: 'e' };
  return geom({ width: W, height: W, points, segments, angles: [{ at: 'O', from: 'A', to: 'B', label: angleLabel }], not_to_scale: true }, alt, caption);
}

/** The four quadrants with the signs of sine, cosine, tangent as labelled markers (mnemonic: All, Sine, Tangent, Cosine). */
export function quadrants(rows, alt, caption) {
  // rows: [{ at: [x, y], label }]
  const points = { O: { at: [3.5, 3.5], label: false }, XL: { at: [0.3, 3.5], label: false }, XR: { at: [6.7, 3.5], label: false }, YB: { at: [3.5, 0.3], label: false }, YT: { at: [3.5, 6.7], label: false } };
  rows.forEach((q, i) => { points[`Q${i}`] = { at: q.at, label: q.label, label_position: q.pos ?? 'e' }; });
  return geom({ width: W, height: W, points, segments: [{ from: 'XL', to: 'XR' }, { from: 'YB', to: 'YT' }], not_to_scale: true }, alt, caption);
}

export { onC, RAD };
