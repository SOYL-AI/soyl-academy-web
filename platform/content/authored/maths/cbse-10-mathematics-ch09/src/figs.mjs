// Heights-and-distances figures for ch09, drawn to scale from the TRUE answers (y up, metres × k drawing
// units). Angles of elevation are marked at the observer between the ground (or eye-level horizontal) and the
// line of sight; angles of depression at the upper observer between a dashed horizontal and the line of sight.
// Every degree label is then exact, every right-angle mark is 90°, and numeric length labels share one scale —
// the pipeline geometry check (run by the validator on every visual) confirms all three.
import { geom } from '../../cbse-10-mathematics-ch05/src/lib.mjs';

const r3 = (v) => Math.round(v * 1000) / 1000;
export const tanD = (d) => Math.tan((d * Math.PI) / 180);
const deg = (a) => `${a}°`;
const lab = (s) => (s ? { label: s } : {});
const scaleOf = (k) => ({ unit: 'm', per_unit: k });

/** One right triangle: observer O on the ground, d m from the foot B of a vertical object BT of height h. */
export function elev({ d, h, angle, k, base = null, height = null, sight = null, names = ['O', 'B', 'T'] }, alt, caption) {
  const [O, B, T] = names;
  const x0 = 0.6, y0 = 0.6;
  const pts = { [O]: [x0, y0], [B]: [r3(x0 + d * k), y0], [T]: [r3(x0 + d * k), r3(y0 + h * k)] };
  return geom({
    width: r3(x0 + d * k + 0.9), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: O, to: B, ...lab(base) }, { from: B, to: T, ...lab(height) }, { from: O, to: T, dashed: true, ...lab(sight) }],
    angles: [{ at: B, from: O, to: T, right: true }, { at: O, from: B, to: T, label: deg(angle) }],
  }, alt, caption);
}

/** Depression from the top T of a vertical BT (height h) to a point P on the ground d m away; elevation of T from P marked equal. */
export function depr({ d, h, angle, k, height = null, base = null, sight = null, names = ['B', 'T', 'P'], showElevation = true }, alt, caption) {
  const [B, T, P] = names;
  const x0 = 0.6, y0 = 0.6;
  const pts = { [B]: [x0, y0], [T]: [x0, r3(y0 + h * k)], [P]: [r3(x0 + d * k), y0], H: { at: [r3(x0 + d * k + 0.4), r3(y0 + h * k)], label: false } };
  const angles = [{ at: B, from: P, to: T, right: true }, { at: T, from: 'H', to: P, label: deg(angle), arcs: 1 }];
  if (showElevation) angles.push({ at: P, from: B, to: T, label: deg(angle), arcs: 1 });
  return geom({
    width: r3(x0 + d * k + 0.9), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: B, to: T, ...lab(height) }, { from: B, to: P, ...lab(base) }, { from: T, to: P, dashed: true, ...lab(sight) }, { from: T, to: 'H', dashed: true }],
    angles,
  }, alt, caption);
}

/** Two observation points C (far) and D (near) on the same side of a vertical BT, in line with its foot. */
export function twoSame({ h, dNear, dFar, aNear, aFar, k, gap = null, height = null, near = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6, xb = x0 + dFar * k;
  const pts = { C: [x0, y0], D: [r3(xb - dNear * k), y0], B: [r3(xb), y0], T: [r3(xb), r3(y0 + h * k)] };
  return geom({
    width: r3(xb + 0.9), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'C', to: 'D', ...lab(gap) }, { from: 'D', to: 'B', ...lab(near) }, { from: 'B', to: 'T', ...lab(height) }, { from: 'C', to: 'T', dashed: true }, { from: 'D', to: 'T', dashed: true }],
    angles: [{ at: 'B', from: 'D', to: 'T', right: true }, { at: 'C', from: 'B', to: 'T', label: deg(aFar) }, { at: 'D', from: 'B', to: 'T', label: deg(aNear) }],
  }, alt, caption);
}

/** Observers P (left) and Q (right) on opposite sides of a vertical BT. */
export function opposite({ h, dL, dR, aL, aR, k, height = null, left = null, right = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6, xb = x0 + dL * k;
  const pts = { P: [x0, y0], B: [r3(xb), y0], Q: [r3(xb + dR * k), y0], T: [r3(xb), r3(y0 + h * k)] };
  return geom({
    width: r3(xb + dR * k + 0.7), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'P', to: 'B', ...lab(left) }, { from: 'B', to: 'Q', ...lab(right) }, { from: 'B', to: 'T', ...lab(height) }, { from: 'P', to: 'T', dashed: true }, { from: 'Q', to: 'T', dashed: true }],
    angles: [{ at: 'B', from: 'P', to: 'T', right: true }, { at: 'P', from: 'B', to: 'T', label: deg(aL) }, { at: 'Q', from: 'B', to: 'T', label: deg(aR) }],
  }, alt, caption);
}

/** From the top T of a vertical BT (height h), depressions of two points P (near, aNear) and Q (far, aFar) on one side. */
export function twoDepr({ h, dNear, dFar, aNear, aFar, k, height = null, gap = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6;
  const pts = { B: [x0, y0], T: [x0, r3(y0 + h * k)], P: [r3(x0 + dNear * k), y0], Q: [r3(x0 + dFar * k), y0], H: { at: [r3(x0 + dFar * k + 0.4), r3(y0 + h * k)], label: false } };
  return geom({
    width: r3(x0 + dFar * k + 0.9), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'B', to: 'T', ...lab(height) }, { from: 'B', to: 'Q' }, { from: 'P', to: 'Q', ...lab(gap) }, { from: 'T', to: 'P', dashed: true }, { from: 'T', to: 'Q', dashed: true }, { from: 'T', to: 'H', dashed: true }],
    angles: [{ at: 'B', from: 'Q', to: 'T', right: true }, { at: 'T', from: 'H', to: 'P', label: deg(aNear) }, { at: 'T', from: 'H', to: 'Q', label: deg(aFar), arcs: 2 }],
  }, alt, caption);
}

/** Vertical BT of height h topped by an object TU of height extra; point P on the ground d m away sees T at a1 and U at a2. */
export function stacked({ d, h, extra, a1, a2, k, base = null, lower = null, upper = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6, xb = x0 + d * k;
  const pts = { P: [x0, y0], B: [r3(xb), y0], T: [r3(xb), r3(y0 + h * k)], U: [r3(xb), r3(y0 + (h + extra) * k)] };
  return geom({
    width: r3(xb + 0.9), height: r3(y0 + (h + extra) * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'P', to: 'B', ...lab(base) }, { from: 'B', to: 'T', ...lab(lower) }, { from: 'T', to: 'U', ...lab(upper) }, { from: 'P', to: 'T', dashed: true }, { from: 'P', to: 'U', dashed: true }],
    angles: [{ at: 'B', from: 'P', to: 'U', right: true }, { at: 'P', from: 'B', to: 'T', label: deg(a1) }, { at: 'P', from: 'B', to: 'U', label: deg(a2), arcs: 2 }],
  }, alt, caption);
}

/** Observer's eye E at height e, d m from a vertical BT of height h; the horizontal from E meets BT at M. */
export function eyeLevel({ d, h, e, angle, k, eye = null, total = null, base = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6, xb = x0 + d * k;
  const pts = { F: { at: [x0, y0], label: false }, E: [x0, r3(y0 + e * k)], B: [r3(xb), y0], M: { at: [r3(xb), r3(y0 + e * k)], label_position: 'e' }, T: [r3(xb), r3(y0 + h * k)] };
  return geom({
    width: r3(xb + 0.9), height: r3(y0 + h * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'F', to: 'E', ...lab(eye) }, { from: 'F', to: 'B', ...lab(base) }, { from: 'B', to: 'T', ...lab(total) }, { from: 'E', to: 'M', dashed: true }, { from: 'E', to: 'T', dashed: true }],
    angles: [{ at: 'M', from: 'E', to: 'T', right: true }, { at: 'E', from: 'M', to: 'T', label: deg(angle) }],
  }, alt, caption);
}

/** Two buildings: AP (height a, left) and BQ (height b, right), w m apart; marks elevation of Q from A and from P. */
export function twoBuildings({ a, b, w, aTop, aFoot, k, gap = null, left = null, right = null }, alt, caption) {
  const x0 = 0.6, y0 = 0.6;
  const pts = { P: [x0, y0], A: [x0, r3(y0 + a * k)], R: [r3(x0 + w * k), y0], Q: [r3(x0 + w * k), r3(y0 + b * k)], N: { at: [r3(x0 + w * k), r3(y0 + a * k)], label_position: 'e' } };
  return geom({
    width: r3(x0 + w * k + 0.9), height: r3(y0 + b * k + 0.7), scale: scaleOf(k), points: pts,
    segments: [{ from: 'P', to: 'A', ...lab(left) }, { from: 'P', to: 'R', ...lab(gap) }, { from: 'R', to: 'Q', ...lab(right) }, { from: 'A', to: 'N', dashed: true }, { from: 'A', to: 'Q', dashed: true }, { from: 'P', to: 'Q', dashed: true }],
    angles: [{ at: 'R', from: 'P', to: 'Q', right: true }, { at: 'N', from: 'A', to: 'Q', right: true }, { at: 'A', from: 'N', to: 'Q', label: deg(aTop) }, { at: 'P', from: 'R', to: 'Q', label: deg(aFoot), arcs: 2 }],
  }, alt, caption);
}
