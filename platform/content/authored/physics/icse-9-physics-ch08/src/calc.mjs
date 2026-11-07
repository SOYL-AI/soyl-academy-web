// Computed values for ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors. Every number used in a stem, answer, table or
// slide is exported from here and asserted with eq(value, expected, what). The ray geometry used by the diagrams (reflection of
// a point in a line, images in parallel and inclined mirrors) is computed here and checked against the laws of reflection and
// against n = 360 / theta - 1 (and its odd-case rule).
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// ---------------------------------------------------------------- geometry
/** Image of the point p in the line through the origin at angle a (degrees). */
export const reflectOrigin = ([x, y], a) => {
  const c = Math.cos(2 * rad(a));
  const s = Math.sin(2 * rad(a));
  return [x * c + y * s, x * s - y * c];
};
/** Image of p in the horizontal line y = ym. */
export const reflectH = ([x, y], ym) => [x, 2 * ym - y];
/** Angle (degrees) between the direction a->b and the vertical (the normal of a horizontal mirror). */
export const fromVertical = (a, b) => deg(Math.atan2(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])));
/**
 * Ray from o to the point (hx, ym) of a horizontal mirror at y = ym, reflected so that it comes from the image of o.
 * Returns the angle of incidence and the angle of reflection (degrees), both from the normal, and a point on the reflected ray.
 */
export function bounce(o, hx, ym, len = 1) {
  const img = reflectH(o, ym);
  const hit = [hx, ym];
  const dir = [hit[0] - img[0], hit[1] - img[1]];
  const n = Math.hypot(dir[0], dir[1]);
  const out = [hit[0] + (dir[0] / n) * len, hit[1] + (dir[1] / n) * len];
  return { img, hit, out, i: fromVertical(o, hit), r: fromVertical(hit, out) };
}
// law of reflection check on an example geometry
{
  const b = bounce([40, 100], 100, 0, 80);
  eq([Number(b.i.toFixed(6)), Number(b.r.toFixed(6))], [Number(b.i.toFixed(6)), Number(b.i.toFixed(6))], 'i equals r');
}

/** All images formed by two plane mirrors (planes) through the origin: M1 along angle 0, M2 along angle theta; object at polar (1, alpha). */
export function inclinedImages(theta, alpha) {
  const key = (p) => p.map((v) => (Math.round(v * 1e6) / 1e6 + 0).toFixed(6)).join(",");
  const n2 = [Math.sin(rad(theta)), -Math.cos(rad(theta))];
  const front = [(p) => p[1] > 1e-9, (p) => p[0] * n2[0] + p[1] * n2[1] > 1e-9];
  const angle = [0, theta];
  const obj = [Math.cos(rad(alpha)), Math.sin(rad(alpha))];
  const seen = new Map([[key(obj), { p: obj, order: 0 }]]);
  const queue = [obj];
  while (queue.length) {
    const p = queue.shift();
    const ord = seen.get(key(p)).order;
    for (let m = 0; m < 2; m++) {
      if (!front[m](p)) continue;
      const q = reflectOrigin(p, angle[m]);
      if (!seen.has(key(q))) {
        seen.set(key(q), { p: q, order: ord + 1, mirror: m + 1 });
        queue.push(q);
      }
    }
  }
  return [...seen.values()].slice(1);
}
export const nFormula = (theta, onBisector = true) => {
  const m = 360 / theta;
  if (!Number.isInteger(m)) throw new Error('360/theta must be an integer');
  return m % 2 === 0 || onBisector ? m - 1 : m;
};
// the geometry agrees with the formula, for both parities and both object positions
for (const th of [30, 36, 40, 45, 60, 72, 90, 120, 180]) {
  eq(inclinedImages(th, th / 2).length, nFormula(th, true), `images at ${th} deg, object on the bisector`);
  eq(inclinedImages(th, th / 3).length, nFormula(th, false), `images at ${th} deg, object off the bisector`);
}

// ---------------------------------------------------------------- the laws diagram and the pin experiment
export const LAW_I = 35;
export const PIN_I = [20, 30, 40, 50];
export const PIN_R = [20, 31, 40, 49];
export const PIN_DIFF = PIN_I.map((x, k) => Math.abs(x - PIN_R[k]));
eq(PIN_DIFF, [0, 1, 0, 1], 'pin readings differences');
export const PIN_MEAN_I = PIN_I.reduce((a, b) => a + b, 0) / PIN_I.length;
export const PIN_MEAN_R = PIN_R.reduce((a, b) => a + b, 0) / PIN_R.length;
eq([PIN_MEAN_I, PIN_MEAN_R], [35, 35], 'pin means');
export const PIN_TOTAL_DIFF = PIN_DIFF.reduce((a, b) => a + b, 0);
eq(PIN_TOTAL_DIFF, 2, 'pin total difference');

// ---------------------------------------------------------------- deck 1 numbers
export const D1 = { withMirror: 40, i: 90 - 40, between: 2 * (90 - 40) };
eq([D1.i, D1.between], [50, 100], 'deck example angles');
export const D1_DIST = { u: 24, v: 24, apart: 48 };
eq(D1_DIST.apart, 48, 'deck example distance');
export const CHK_ANG = { withMirror: 30, r: 60 };
eq(90 - CHK_ANG.withMirror, 60, 'chk-ang');

// ---------------------------------------------------------------- deck 2 numbers
export const PAR = { d: 40, x0: 10 };
export const PAR_IM = {};
{
  const { d, x0 } = PAR;
  const refl1 = (x) => -x; // in M1 at x = 0
  const refl2 = (x) => 2 * d - x; // in M2 at x = d
  const chainA = [refl1(x0)]; // object -> M1 -> M2 -> M1 ...
  for (let k = 0; k < 5; k++) chainA.push(k % 2 === 0 ? refl2(chainA[k]) : refl1(chainA[k]));
  const chainB = [refl2(x0)]; // object -> M2 -> M1 -> M2 ...
  for (let k = 0; k < 5; k++) chainB.push(k % 2 === 0 ? refl1(chainB[k]) : refl2(chainB[k]));
  PAR_IM.chainA = chainA;
  PAR_IM.chainB = chainB;
}
eq(PAR_IM.chainA.slice(0, 4), [-10, 90, -90, 170], 'chain A (M1 first), d = 40, x0 = 10');
eq(PAR_IM.chainB.slice(0, 4), [70, -70, 150, -150], 'chain B (M2 first)');
export const PAR_I1 = PAR.x0; // distance of the first image in M1 behind M1
export const PAR_I2 = PAR.d - PAR.x0; // first image in M2: distance behind M2
export const PAR_OBJ_I2 = PAR_IM.chainB[0] - PAR.x0; // object to first image in M2
export const PAR_I21 = PAR_IM.chainA[1] - PAR.d; // second image in M2 (image of I1) behind M2
eq([PAR_I1, PAR_I2, PAR_OBJ_I2, PAR_I21], [10, 30, 60, 50], 'parallel mirror distances');
export const PAR_I1_I2 = PAR_IM.chainB[0] - PAR_IM.chainA[0]; // distance between first images in M1 and M2
eq(PAR_I1_I2, 80, 'distance between the two first images');
export const D2_INCL = { th: 60, n: nFormula(60), m: 360 / 60 };
eq([D2_INCL.m, D2_INCL.n], [6, 5], 'deck 2 example 60 degrees');
export const N_TABLE = [[30, nFormula(30)], [45, nFormula(45)], [60, nFormula(60)], [72, nFormula(72, true), nFormula(72, false)], [90, nFormula(90)], [120, nFormula(120, true), nFormula(120, false)], [180, nFormula(180)]];
eq(N_TABLE.map((r) => r[1]), [11, 7, 5, 4, 3, 2, 1], 'table of n');
export const D2_EX2 = { th: 72, on: nFormula(72, true), off: nFormula(72, false) };
eq([D2_EX2.on, D2_EX2.off], [4, 5], 'deck 2 example 72 degrees');

// ---------------------------------------------------------------- numericals
export const N_DIST = { u: 35, v: 35, apart: 70 };
eq(N_DIST.apart, 70, 'num-dist');
export const N_WALK = { u0: 2.5, step: 1, apart: 2 * (2.5 - 1) };
eq(N_WALK.apart, 3, 'num-walk');
export const N_SPEED = { v: 1.2, rel: 2 * 1.2 };
eq(sig(N_SPEED.rel, 3), 2.4, 'num-speed');
export const N_AWAY = { u: 15, moved: 6, v: 15 + 6, apart: 2 * (15 + 6) };
eq([N_AWAY.v, N_AWAY.apart], [21, 42], 'num-away');
export const N_ANG1 = { withMirror: 25, i: 90 - 25, between: 2 * (90 - 25) };
eq([N_ANG1.i, N_ANG1.between], [65, 130], 'num-ang1');
export const N_ANG2 = { between: 76, i: 76 / 2 };
eq(N_ANG2.i, 38, 'num-ang2');
export const N_ANG3 = { i: 38, r: 38, withMirrorRef: 90 - 38 };
eq(N_ANG3.withMirrorRef, 52, 'num-ang3: reflected ray makes 52 with the mirror');
export const N_INC = { a: [60, nFormula(60)], b: [30, nFormula(30)], c: [45, nFormula(45)] };
eq([N_INC.a[1], N_INC.b[1], N_INC.c[1]], [5, 11, 7], 'num-incl');
export const N_OFF = { th: 40, on: nFormula(40, true), off: nFormula(40, false) };
eq([N_OFF.on, N_OFF.off], [8, 9], 'num-off: 40 degrees');
export const N_ANGLE = { n: 7, th: 360 / (7 + 1) };
eq(N_ANGLE.th, 45, 'num-angle: 7 images means 45 degrees');
export const CLOCK = { seen: [8, 20], actual: [3, 40] };
eq(12 * 60 - (8 * 60 + 20), 3 * 60 + 40, 'clock: 12:00 - 8:20 = 3:40');
export const CLOCK2 = { actual: [4, 25], seen: [7, 35] };
eq(12 * 60 - (4 * 60 + 25), 7 * 60 + 35, 'clock: 12:00 - 4:25 = 7:35');

// ---------------------------------------------------------------- multiple-choice numbers
export const M_LW = { withMirror: 30, i: 60 };
eq(90 - M_LW.withMirror, 60, 'lw-mcq2');
export const M_IMG = { u: 0.8, v: 0.8, apart: 1.6 };
eq(M_IMG.apart, 1.6, 'im-mcq: 0.8 m');
export const M_PM = [nFormula(60), nFormula(45), nFormula(72, true)];
eq(M_PM, [5, 7, 4], 'pm-mcq');

// ---------------------------------------------------------------- long answers
export const LL = { withMirror: 55, i: 90 - 55, r: 90 - 55, between: 2 * (90 - 55), reflWithMirror: 55 };
eq([LL.i, LL.between], [35, 70], 'long-law');
export const LB = { d0: 2, step: 0.5, apart0: 4, apart1: 2 * (2 - 0.5), v: 1.5, rel: 3 };
eq([LB.apart0, LB.apart1, LB.rel], [4, 3, 3], 'long-boy');
export const LI = { th: 90, n: nFormula(90), a: nFormula(60), b: nFormula(45), on: nFormula(72, true), off: nFormula(72, false) };
eq([LI.n, LI.a, LI.b, LI.on, LI.off], [3, 5, 7, 4, 5], 'long-incl');
export const LK = { th: 60, n: nFormula(60) };
eq(LK.n, 5, 'long-peri kaleidoscope');

// ---------------------------------------------------------------- added items
export const M_LW2 = { i: 20, between: 2 * 20 };
eq(M_LW2.between, 40, 'lw-mcq2');
export const M_LW5 = { between: 90, i: 90 / 2 };
eq(M_LW5.i, 45, 'lw-mcq5');
export const LW3B = { refWithMirror: 28, i: 90 - 28, r: 90 - 28, between: 2 * (90 - 28) };
eq([LW3B.i, LW3B.between], [62, 124], 'lw-short3b');
export const M_PM5 = { from: nFormula(90), to: nFormula(45) };
eq([M_PM5.from, M_PM5.to], [3, 7], 'pm-mcq5');
export const M_PM8 = nFormula(40, true);
eq(M_PM8, 8, 'pm-mcq8: 40 degrees on the bisector');
export const M_LW6 = { withMirror: 70, r: 90 - 70 };
eq(M_LW6.r, 20, 'lw-mcq6');
