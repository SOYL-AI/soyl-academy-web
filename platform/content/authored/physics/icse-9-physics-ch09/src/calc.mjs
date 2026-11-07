// Computed values for ICSE 9 Physics ch09 Spherical Mirrors. Every number used in a stem, answer, table or slide is exported
// from here and asserted with eq(value, expected, what). Cartesian sign convention: the pole is the origin, light travels from
// left to right, distances are measured from the pole, those against the direction of the incident light are negative, heights
// above the principal axis are positive. Mirror formula 1/v + 1/u = 1/f; magnification m = h'/h = -v/u. A concave mirror has f
// and R negative, a convex mirror has f and R positive (f = R/2).
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
/** Image distance for object distance u and focal length f (both signed). Infinity when the object is at the focus. */
export const vOf = (u, f) => (Math.abs(1 / f - 1 / u) < 1e-12 ? Infinity : 1 / (1 / f - 1 / u));
export const mag = (u, v) => -v / u;
export const mOf = (u, f) => -vOf(u, f) / u;
const r3 = (x) => sig(x, 6);

// ---------------------------------------------------------------- table of images by a concave mirror (f = -10 cm, R = -20 cm)
export const FC = -10;
export const CASES = [
  { name: 'beyond C', u: -30 },
  { name: 'at C', u: -20 },
  { name: 'between C and F', u: -15 },
  { name: 'at F', u: -10 },
  { name: 'between F and P', u: -5 },
].map((c) => {
  const v = vOf(c.u, FC);
  return { ...c, v: Number.isFinite(v) ? r3(v) : v, m: Number.isFinite(v) ? r3(mag(c.u, v)) : Infinity };
});
eq(CASES.map((c) => c.v), [-15, -20, -30, Infinity, 10], 'image distances for the six positions');
eq(CASES.map((c) => c.m), [-0.5, -1, -2, Infinity, 2], 'magnifications for the positions');

// ---------------------------------------------------------------- deck 1
export const D1 = { R: -30, f: -15 };
eq(D1.R / 2, D1.f, 'deck example: f = R/2');
export const D1_X = { Rc: 40, f: 20 }; // convex example: R = 40 cm gives f = +20 cm
eq(D1_X.Rc / 2, D1_X.f, 'deck example convex');
export const D1_CLASS = { f: -12, u: -30, R: -24 };
eq(D1_CLASS.u < D1_CLASS.R, true, 'deck classify: object beyond C (|u| > |R|)');
export const D1_CLASS_V = r3(vOf(D1_CLASS.u, D1_CLASS.f));
eq(D1_CLASS_V, -20, 'deck classify: v = -20 cm');
export const CHK = { R: -30, f: -15 };
export const CHK_F = Math.abs(CHK.R) / 2;
eq(CHK_F, 15, 'chk-fr');

// ---------------------------------------------------------------- deck 2
export const D2_EX1 = { f: -15, u: -25, h: 4 };
D2_EX1.v = r3(vOf(D2_EX1.u, D2_EX1.f));
D2_EX1.m = r3(mOf(D2_EX1.u, D2_EX1.f));
D2_EX1.h2 = r3(D2_EX1.m * D2_EX1.h);
eq([D2_EX1.v, D2_EX1.m, D2_EX1.h2], [-37.5, -1.5, -6], 'deck example 1 concave');
export const D2_EX2 = { f: 20, u: -60, h: 6 };
D2_EX2.v = r3(vOf(D2_EX2.u, D2_EX2.f));
D2_EX2.m = r3(mOf(D2_EX2.u, D2_EX2.f));
D2_EX2.h2 = r3(D2_EX2.m * D2_EX2.h);
eq([D2_EX2.v, D2_EX2.m, D2_EX2.h2], [15, 0.25, 1.5], 'deck example 2 convex');
export const CHK2 = { f: -10, u: -40 };
CHK2.v = r3(vOf(CHK2.u, CHK2.f));
eq(CHK2.v, -13.3333, 'chk-formula: v = -13.3333 cm (about -13.3)');
export const CHK2_V = sig(CHK2.v, 3);
eq(CHK2_V, -13.3, 'chk-formula rounded');

// ---------------------------------------------------------------- numericals
export const N_V1 = { f: -12, u: -36 };
N_V1.v = r3(vOf(N_V1.u, N_V1.f));
N_V1.m = r3(mOf(N_V1.u, N_V1.f));
eq([N_V1.v, N_V1.m], [-18, -0.5], 'num-v1');
export const N_F = { R: -30, f: -15 };
eq(N_F.R / 2, N_F.f, 'num-f');
export const N_CONV = { f: 20, u: -60 };
N_CONV.v = r3(vOf(N_CONV.u, N_CONV.f));
N_CONV.m = r3(mOf(N_CONV.u, N_CONV.f));
eq([N_CONV.v, N_CONV.m], [15, 0.25], 'num-conv');
export const N_OBJ = { f: -12, v: -36 };
N_OBJ.u = r3(1 / (1 / N_OBJ.f - 1 / N_OBJ.v));
eq(N_OBJ.u, -18, 'num-obj');
export const N_H = { f: -10, u: -15, h: 4 };
N_H.v = r3(vOf(N_H.u, N_H.f));
N_H.m = r3(mOf(N_H.u, N_H.f));
N_H.h2 = r3(N_H.m * N_H.h);
eq([N_H.v, N_H.m, N_H.h2], [-30, -2, -8], 'num-h');
export const N_VIRT = { f: -20, u: -10 };
N_VIRT.v = r3(vOf(N_VIRT.u, N_VIRT.f));
N_VIRT.m = r3(mOf(N_VIRT.u, N_VIRT.f));
eq([N_VIRT.v, N_VIRT.m], [20, 2], 'num-virt');
export const N_SHAVE = { u: -20, m: 3 };
N_SHAVE.v = N_SHAVE.m * -N_SHAVE.u * -1; // m = -v/u so v = -m u
N_SHAVE.v = -N_SHAVE.m * N_SHAVE.u;
N_SHAVE.f = r3(1 / (1 / N_SHAVE.v + 1 / N_SHAVE.u));
eq([N_SHAVE.v, N_SHAVE.f], [60, -30], 'num-shave');
export const N_R = { f: 25, R: 50 };
eq(N_R.f * 2, N_R.R, 'num-r');
export const N_REAR = { f: 30, u: -90 };
N_REAR.v = r3(vOf(N_REAR.u, N_REAR.f));
N_REAR.m = r3(mOf(N_REAR.u, N_REAR.f));
eq([N_REAR.v, N_REAR.m], [22.5, 0.25], 'num-rear');
export const N_ERR = { f: -15, u: -45 };
N_ERR.v = r3(vOf(N_ERR.u, N_ERR.f));
N_ERR.m = r3(mOf(N_ERR.u, N_ERR.f));
eq([N_ERR.v, N_ERR.m], [-22.5, -0.5], 'num-err: f -15, u -45');

// ---------------------------------------------------------------- multiple-choice numbers
export const M1 = { f: -20, u: -30 };
M1.v = r3(vOf(M1.u, M1.f));
eq(M1.v, -60, 'mcq: f -20, u -30 gives v -60');
export const M2 = { R: 36, f: 18 };
eq(M2.R / 2, M2.f, 'mcq convex R');
export const M3 = { f: -10, u: -25 };
M3.v = r3(vOf(M3.u, M3.f));
M3.m = r3(mOf(M3.u, M3.f));
eq([M3.v, sig(M3.m, 3)], [-16.6667, -0.667], 'mcq: f -10, u -25');
export const M3_V = sig(M3.v, 3);
export const M3_M = sig(M3.m, 3);
eq([M3_V, M3_M], [-16.7, -0.667], 'mcq rounded');
export const M4 = { u: -12, f: -12 };
eq(vOf(M4.u, M4.f), Infinity, 'mcq: object at F, image at infinity');

// ---------------------------------------------------------------- long answers
export const LA = { f: -15, u: -45, h: 6 };
LA.v = r3(vOf(LA.u, LA.f));
LA.m = r3(mOf(LA.u, LA.f));
LA.h2 = r3(LA.m * LA.h);
eq([LA.v, LA.m, LA.h2], [-22.5, -0.5, -3], 'long-conc: f -15, u -45, h 6');
export const LB = { f: -18, u: -12, h: 3 };
LB.v = r3(vOf(LB.u, LB.f));
LB.m = r3(mOf(LB.u, LB.f));
LB.h2 = r3(LB.m * LB.h);
eq([LB.v, LB.m, LB.h2], [36, 3, 9], 'long-shave: f -18, u -12, h 3');
export const LC = { f: 40, u: -120 };
LC.v = r3(vOf(LC.u, LC.f));
LC.m = r3(mOf(LC.u, LC.f));
eq([LC.v, LC.m], [30, 0.25], 'long-conv: f 40, u -120');
export const LD = { R: -40, f: -20, u: -30, h: 5 };
eq(LD.R / 2, LD.f, 'long-table f');
LD.v = r3(vOf(LD.u, LD.f));
LD.m = r3(mOf(LD.u, LD.f));
LD.h2 = r3(LD.m * LD.h);
eq([LD.v, LD.m, LD.h2], [-60, -2, -10], 'long-table: R -40, u -30, h 5');
export const LE = { f: -20, u1: -50, u2: -20 };
LE.v1 = r3(vOf(LE.u1, LE.f));
LE.m1 = r3(mag(LE.u1, LE.v1));
eq([LE.v1, sig(LE.m1, 3)], [-33.3333, -0.667], 'long-pos: f -20, u -50');
export const LE_V = sig(LE.v1, 3);
export const LE_M = sig(LE.m1, 3);
eq([LE_V, LE_M], [-33.3, -0.667], 'long-pos rounded');
export const LF = { f: -24, u: -16, h: 2 };
LF.v = r3(vOf(LF.u, LF.f));
LF.m = r3(mOf(LF.u, LF.f));
LF.h2 = r3(LF.m * LF.h);
eq([LF.v, LF.m, LF.h2], [48, 3, 6], 'long-virtual: f -24, u -16, h 2');

// ---------------------------------------------------------------- added items
export const M4R = { f: 7.5, R: 15 };
eq(M4R.f * 2, M4R.R, 'tm-mcq4');
export const LT = { pf: 12, pc: 24 };
eq(LT.pf * 2, LT.pc, 'long-terms: PF = 12 cm, PC = 24 cm');
export const SF2 = { f: -20, u: -30, v: r3(vOf(-30, -20)) };
eq(SF2.v, -60, 'sf-mcq2');
export const N_FOC = { m: -2, u: -15 };
N_FOC.v = -N_FOC.m * N_FOC.u;
N_FOC.f = r3(1 / (1 / N_FOC.v + 1 / N_FOC.u));
eq([N_FOC.v, N_FOC.f], [-30, -10], 'num-focal: m -2, u -15');
export const N_SAME = { u: -24, v: -24 };
N_SAME.f = r3(1 / (1 / N_SAME.v + 1 / N_SAME.u));
eq(N_SAME.f, -12, 'num-same: object and image at the same place');
