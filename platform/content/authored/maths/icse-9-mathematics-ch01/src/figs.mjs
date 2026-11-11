// Number-line figures for ICSE 9 Mathematics ch01, drawn as 'geometry' visuals from computed coordinates.
// Every length is asserted with Pythagoras (dist() against the exact surd value) before the figure is returned.
import { geom } from './lib.mjs';
import { sq, rat, dist, near, tex } from './surd.mjs';

const r2 = (v) => Math.round(v * 1e6) / 1e6;
const lab = (t) => `$${t}$`;

/**
 * Number line from `from` to `to` (integers) with unit length k; `marks` = [{ at, label }] extra labelled points,
 * `minor` = step of unlabelled minor ticks (e.g. 1/3).
 */
export function numberLineFig({ from = 0, to = 3, k = 1.3, marks = [], minor = 0, caption, alt }) {
  const ox = 0.8, oy = 0.9;
  const X = (v) => r2(ox + (v - from) * k);
  const pts = {};
  const segs = [{ from: 'L', to: 'R' }];
  pts.L = { at: [0.15, oy], label: false };
  pts.R = { at: [r2(X(to) + 0.65), oy], label: false };
  for (let v = from; v <= to; v++) pts[`I${v - from}`] = { at: [X(v), oy], label: lab(String(v)) };
  if (minor) for (let v = from; v < to - 1e-9; v += minor) if (Math.abs(v - Math.round(v)) > 1e-9) pts[`m${Math.round(v * 1000)}`] = { at: [X(v), oy], label: false };
  marks.forEach((m, i) => { pts[`P${i}`] = { at: [X(m.at), r2(oy + 0.75)], label: lab(m.label), label_position: 'n' }; segs.push({ from: `P${i}`, to: `Q${i}`, dashed: true }); pts[`Q${i}`] = { at: [X(m.at), oy], label: false }; });
  return geom({ width: r2(X(to) + 1.0), height: 2.1, points: pts, segments: segs, not_to_scale: true }, alt, caption);
}

/**
 * Right-angled triangle on the number line: OA = a along the line, AB = b at right angles, circle centre O through B
 * meets the line at P with OP = sqrt(a^2 + b^2). Returns the figure; throws if any length disagrees with Pythagoras.
 */
export function rootFig({ a, b, k = 0.75, alt, caption }) {
  const h2 = a * a + b * b;
  const H = sq(h2); // exact value of the hypotenuse
  const h = H.value;
  const R = h * k, ox = R + 0.3, oy = R + 0.35;
  const O = [ox, oy], A = [ox + a * k, oy], B = [ox + a * k, oy + b * k], P = [ox + h * k, oy];
  if (!near(dist(O, B) / k, h) || !near(dist(O, P) / k, h) || !near(R, dist(O, B))) throw new Error('rootFig: lengths disagree with Pythagoras');
  const top = Math.ceil(a + 0 * b) + 1;
  const pts = {
    L: { at: [0.1, oy], label: false },
    R: { at: [r2(ox + Math.max(top, Math.ceil(h) + 1) * k), oy], label: false },
    O: { at: O.map(r2), label: lab('0'), label_position: 'sw' },
    A: { at: A.map(r2), label: lab(String(a)), label_position: 'se' },
    B: { at: B.map(r2), label: 'B' },
    P: { at: P.map(r2), label: lab(tex(H)), label_position: 'se' },
  };
  for (let v = 1; v <= Math.ceil(h); v++) if (v !== a) pts[`T${v}`] = { at: [r2(ox + v * k), oy], label: lab(String(v)), label_position: 's' };
  const W = r2(ox + Math.max(top, Math.ceil(h) + 1) * k + 0.4);
  return geom({
    width: Math.max(W, r2(ox + R + 0.6)), height: r2(2 * R + 0.7),
    points: pts,
    segments: [{ from: 'L', to: 'R' }, { from: 'A', to: 'B', label: String(b) }, { from: 'O', to: 'B' }],
    circles: [{ center: 'O', radius: r2(R) }],
    angles: [{ at: 'A', from: 'O', to: 'B', right: true }],
    scale: { unit: 'cm', per_unit: k },
  }, alt, caption);
}
export { rat };
