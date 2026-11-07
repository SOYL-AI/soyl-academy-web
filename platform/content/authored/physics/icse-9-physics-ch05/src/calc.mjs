// Computed values for ICSE 9 Physics ch05 Pressure in Fluids. Every number used in a stem, answer, table or slide is
// exported from here and asserted with eq(value, expected, what). g = 10 m s^-2 throughout; densities (kg m^-3): water
// 1000, sea water 1030, kerosene 800, mercury 13600. Pressure is the pressure of the liquid alone (atmosphere ignored).
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const g = 10;
export const RHO = { water: 1000, sea: 1030, kero: 800, hg: 13600 };
/** Pressure from thrust and area (N, m^2). */
export const press = (F, A) => F / A;
/** Pressure of a liquid column: h rho g. */
export const col = (h, rho) => h * rho * g;
const cm2 = (a) => a / 10000; // cm^2 -> m^2
export const area = cm2;

// ---------------------------------------------------------------- deck 1
// brick 24 cm x 10 cm x 5 cm is not used here; the deck brick is 20 cm x 10 cm x 5 cm and weighs 20 N
export const BRICK_W = 20;
export const BRICK_FACES = [
  { name: 'lying flat', a: 20 * 10, p: sig(press(BRICK_W, cm2(20 * 10)), 4) },
  { name: 'on its long edge', a: 20 * 5, p: sig(press(BRICK_W, cm2(20 * 5)), 4) },
  { name: 'on its end', a: 10 * 5, p: sig(press(BRICK_W, cm2(10 * 5)), 4) },
];
eq(BRICK_FACES.map((f) => [f.a, f.p]), [[200, 1000], [100, 2000], [50, 4000]], 'brick faces');
export const D1_W = 500;
export const D1_A = 0.025;
export const D1_P = press(D1_W, D1_A);
export const D1_P1 = press(D1_W, D1_A / 2);
eq([D1_P, D1_P1], [20000, 40000], 'deck 1 example 1');
export const D1_H = 8;
export const D1_PL = col(D1_H, RHO.water);
eq(D1_PL, 80000, 'deck 1 example 2');
export const PLOT_PTS = [2, 5, 8].map((h) => [h, col(h, RHO.water)]);
eq(PLOT_PTS.map((p) => p[1]), [20000, 50000, 80000], 'p against h points');

// ---------------------------------------------------------------- deck 2
export const D2_H = 20;
export const D2_A = 0.5;
export const D2_P = col(D2_H, RHO.water);
export const D2_F = D2_P * D2_A;
eq([D2_P, D2_F], [200000, 100000], 'deck 2 example 1');
export const D2_F1 = 25;
export const D2_A1 = 4;
export const D2_A2 = 60;
export const D2_PT = press(D2_F1, cm2(D2_A1));
export const D2_F2 = (D2_F1 * D2_A2) / D2_A1;
eq([D2_PT, D2_F2], [62500, 375], 'deck 2 example 2');
export const VESSEL_H = 0.4;
export const VESSEL_P = col(VESSEL_H, RHO.water);
eq(VESSEL_P, 4000, 'vessels at 0.4 m');

// ---------------------------------------------------------------- numericals
export const N_THRUST = press(600, 0.15);
eq(N_THRUST, 4000, 'thrust over 0.15 m2');
export const N_MAN = press(45 * g, cm2(150));
eq(N_MAN, 30000, 'boy on one foot');
export const N_KNIFE = sig(press(24, 0.00004), 6);
eq(N_KNIFE, 600000, 'knife edge');
export const N_SEA = col(12, RHO.sea);
eq(N_SEA, 123600, 'sea water at 12 m');
export const N_KERO = col(0.35, RHO.kero);
eq(N_KERO, 2800, 'kerosene at 0.35 m');
export const N_HG = sig(col(0.3, RHO.hg), 6);
eq(N_HG, 40800, 'mercury 0.30 m');
export const N_DEPTH = 50000 / (RHO.water * g);
eq(N_DEPTH, 5, 'depth for 50000 Pa');
export const N_RHO = sig(5400 / (0.6 * g), 4);
eq(N_RHO, 900, 'density from 5400 Pa at 0.6 m');
export const N_PASC = (30 * 50) / 2;
eq(N_PASC, 750, 'Pascal 30 N on 2 cm2 to 50 cm2');
export const N_PASC2 = press(40, cm2(8));
eq(N_PASC2, 50000, 'pressure transmitted by 40 N on 8 cm2');
export const N_TANK_P = col(0.8, RHO.water);
export const N_TANK_F = N_TANK_P * (3.0 * 2.0);
eq([N_TANK_P, N_TANK_F], [8000, 48000], 'tank 3 m by 2 m, 0.8 m deep');

// multiple-choice numbers
export const M5 = [press(500, 0.25), 500 * 0.25, 0.25 / 500];
eq(M5, [2000, 125, 0.0005], 'th-mcq5');
export const L3 = [col(5, 1100), 5 * 1100, 2 * col(5, 1100), col(5, 1100) / 2];
eq(L3, [55000, 5500, 110000, 27500], 'lq-mcq3');
export const P3 = [(10 * 40) / 2, (10 * 2) / 40, 10 * 2];
eq(P3, [200, 0.5, 20], 'pl-mcq3');

// short answers
export const BLOCK = { w: 36, faces: [24 * 10, 24 * 5, 10 * 5] };
export const BLOCK_P = BLOCK.faces.map((a) => sig(press(BLOCK.w, cm2(a)), 4));
eq(BLOCK_P, [1500, 3000, 7200], 'block 24 x 10 x 5, 36 N');
export const WATER_P = col(0.5, RHO.water);
export const HG_P = sig(col(0.04, RHO.hg), 5);
eq([WATER_P, HG_P], [5000, 5440], 'water 0.5 m against mercury 0.04 m');
export const S3_PT = press(20, cm2(5));
export const S3_F2 = S3_PT * cm2(100);
eq([S3_PT, S3_F2], [40000, 400], 'short 3 pistons');

// ---------------------------------------------------------------- long answers
export const LB = { w: 54, faces: [30 * 15, 30 * 6, 15 * 6] };
export const LB_P = LB.faces.map((a) => sig(press(LB.w, cm2(a)), 4));
eq(LB_P, [1200, 3000, 6000], 'long block 30 x 15 x 6, 54 N');
export const LP = { f1: 15, a1: 4, a2: 80 };
export const LP_P = press(LP.f1, cm2(LP.a1));
export const LP_F2 = LP_P * cm2(LP.a2);
eq([LP_P, LP_F2], [37500, 300], 'long Pascal');
export const DAM = { h: 40, p10: col(10, RHO.water), p30: col(30, RHO.water), pBase: col(40, RHO.water), gateF: col(30, RHO.water) * 2 };
eq([DAM.p10, DAM.p30, DAM.pBase, DAM.gateF], [100000, 300000, 400000, 600000], 'dam');
export const SPURT = [0.1, 0.2, 0.3].map((h) => col(h, RHO.water));
export const SPURT_BRINE = col(0.3, 1200);
eq([SPURT.map((p) => sig(p, 4)), sig(SPURT_BRINE, 4)], [[1000, 2000, 3000], 3600], 'spurt');
export const TANK = { a: 2.0 * 1.5, h: 1.2 };
export const TANK_P = col(TANK.h, RHO.water);
export const TANK_F = TANK_P * TANK.a;
export const TANK_V = sig(TANK.a * TANK.h, 4);
export const TANK_W = sig(RHO.water * TANK_V * g, 5);
eq([TANK_P, TANK_F, sig(TANK_V, 3), TANK_W], [12000, 36000, 3.6, 36000], 'tank');
export const DIVER = { p25: col(25, RHO.sea), f: sig(col(25, RHO.sea) * 0.02, 6), p50: col(50, RHO.sea) };
eq([DIVER.p25, sig(DIVER.f, 4), DIVER.p50], [257500, 5150, 515000], 'diver');

// spurt figure: vessel of water 75 cm deep, holes 10, 20, 30 cm below the surface, table at the base; range = 2 sqrt(d * y)
export const JET_H = 75;
export const JET_D = [10, 20, 30];
export const JET_RANGE = JET_D.map((d) => 2 * Math.sqrt(d * (JET_H - d)));

// further multiple-choice numbers
export const M7 = [20 / 4, 20 * 4, 4 / 20];
eq(M7, [5, 80, 0.2], 'th-mcq7');
export const CF = (5 * 10) / 1;
eq(CF, 50, 'chk-force');
export const P3_X = 10 * 40;
eq(P3_X, 400, 'pl-mcq3 distractor');

// extra multiple-choice numbers
export const TH8 = [press(90, 0.03), sig(90 * 0.03, 3), sig(0.03 / 90, 3), 90 / 0.3];
eq(TH8, [3000, 2.7, 0.000333, 300], 'th-mcq8');
export const LQ8 = [col(0.4, 900), col(0.4, 900) / 10, col(0.4, RHO.water), col(0.4, 900) * 10];
eq(LQ8.map((x) => sig(x, 4)), [3600, 360, 4000, 36000], 'lq-mcq8');
export const PL6 = [press(8, cm2(4)), 8 / 4, sig(8 * cm2(4), 3), 8 / 0.04];
eq(PL6.map((x) => sig(x, 4)), [20000, 2, 0.0032, 200], 'pl-mcq6');
