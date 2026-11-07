// Computed values for ICSE 9 Physics ch07 Heat and Energy. Every number used in a stem, answer, table or slide is exported
// from here and asserted with eq(value, expected, what). 1 cal = 4.186 J; for the ice-in-a-pipe numericals water is taken as
// 1000 kg m^-3 and ice as 900 kg m^-3 (each stem says so). Density table of water 0 to 10 degrees C: standard tables, rounded.
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const CAL = 4.186;
export const toJ = (cal) => sig(cal * CAL, 7);
export const toCal = (j) => j / CAL;
export const RHO_W = 1000;
export const RHO_ICE = 900;

// ---------------------------------------------------------------- density and volume of water, 0 to 10 degrees C
export const TEMPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const DENS = [999.84, 999.9, 999.94, 999.96, 999.97, 999.96, 999.94, 999.9, 999.85, 999.78, 999.7]; // kg m^-3
export const VOL1000 = DENS.map((d) => sig((1e6 / d), 7)); // volume of 1000 g (1 kg) in cm^3
export const iMax = DENS.indexOf(Math.max(...DENS));
export const iMin = VOL1000.indexOf(Math.min(...VOL1000));
eq([TEMPS[iMax], TEMPS[iMin]], [4, 4], 'maximum density and minimum volume at 4 degrees C');
eq([DENS[0], DENS[4], DENS[10]], [999.84, 999.97, 999.7], 'density table ends');
eq([DENS[2] === DENS[6], DENS[1] === DENS[7]], [true, true], 'symmetric pairs 2 and 6, 1 and 7');
eq([VOL1000[0], VOL1000[4], VOL1000[10]].map((x) => Number(x.toFixed(2))), [1000.16, 1000.03, 1000.3], 'volume of 1 kg at 0, 4 and 10');
export const V0 = Number(VOL1000[0].toFixed(2));
export const V4 = Number(VOL1000[4].toFixed(2));
export const V10 = Number(VOL1000[10].toFixed(2));
export const DV_0_4 = Number((V0 - V4).toFixed(2)); // fall in volume of 1 kg from 0 to 4 degrees C, cm^3
eq(DV_0_4, 0.13, 'volume change 0 to 4');
export const DV_4_10 = Number((V10 - V4).toFixed(2));
eq(DV_4_10, 0.27, 'volume change 4 to 10');

// ---------------------------------------------------------------- Hope's experiment, illustrative thermometer readings (degrees C)
export const HOPE_T = [0, 5, 10, 15, 20, 25, 30, 35, 40]; // minutes
export const HOPE_TOP = [10, 10, 10, 10, 9, 7, 4, 2, 0];
export const HOPE_BOT = [10, 8, 6, 5, 4, 4, 4, 4, 4];
eq(HOPE_BOT.indexOf(4), 4, 'bottom reaches 4 at 20 min');
eq(HOPE_T[HOPE_BOT.indexOf(4)], 20, 'bottom reaches 4 degrees C at 20 minutes');
eq(HOPE_TOP[HOPE_TOP.length - 1], 0, 'top ends at 0');
export const HOPE_TOP_START_FALL = HOPE_T[HOPE_TOP.findIndex((x, i) => i > 0 && x < HOPE_TOP[0])];
eq(HOPE_TOP_START_FALL, 20, 'top starts to fall at 20 min');
export const HOPE_BOT_AT_30 = HOPE_BOT[HOPE_T.indexOf(30)];
export const HOPE_TOP_AT_30 = HOPE_TOP[HOPE_T.indexOf(30)];
eq([HOPE_BOT_AT_30, HOPE_TOP_AT_30], [4, 4], 'both read 4 at 30 min');
export const HOPE_TOP_AT_25 = HOPE_TOP[HOPE_T.indexOf(25)];
eq(HOPE_TOP_AT_25, 7, 'top at 25 min');
export const HOPE_BOT_AT_10 = HOPE_BOT[HOPE_T.indexOf(10)];
eq(HOPE_BOT_AT_10, 6, 'bottom at 10');

// ---------------------------------------------------------------- pond in winter (figure): temperatures from the ice downwards
export const POND = [0, 1, 2, 3, 4]; // surface ice, then water layers, bottom
eq(POND[POND.length - 1], 4, 'pond bottom 4 degrees C');

// ---------------------------------------------------------------- deck 1
export const D1 = { m: 300, dt: 20, cal: 300 * 20 };
export const D1_J = toJ(D1.cal);
export const D1_CONV = { cal: 300, j: toJ(300) };
eq([D1.cal, D1_J, D1_CONV.j], [6000, 25116, 1255.8], 'deck 1 examples');
export const D1_ICE = { v: 1000, vi: sig((1000 * RHO_W) / RHO_ICE, 5) };
export const D1_ICE_INC = sig(D1_ICE.vi - D1_ICE.v, 4);
eq([D1_ICE.vi, D1_ICE_INC], [1111.1, 111.1], 'deck 1 pipe example');
export const CHK_CONV = toJ(400);
eq(CHK_CONV, 1674.4, 'chk-conv');

// ---------------------------------------------------------------- deck 2
export const D2_ENG = { in: 20000, useful: 5000, deg: 20000 - 5000, cal: sig((20000 - 5000) / CAL, 6) };
eq([D2_ENG.deg, D2_ENG.cal], [15000, 3583.37], 'deck 2 engine');
export const D2_BULB = { in: 100, light: 8, heat: 100 - 8, pct: sig(((100 - 8) / 100) * 100, 3) };
eq([D2_BULB.heat, D2_BULB.pct], [92, 92], 'deck 2 bulb');

// ---------------------------------------------------------------- numericals
export const N_CAL = toJ(250);
eq(N_CAL, 1046.5, 'num-cal');
export const N_J = toCal(8372);
eq(N_J, 2000, 'num-j');
export const N_WARM = { m: 200, dt: 15, cal: 200 * 15, j: toJ(200 * 15) };
eq([N_WARM.cal, N_WARM.j], [3000, 12558], 'num-warm');
export const N_FOOD = { kcal: 150, j: toJ(150 * 1000), kj: sig(toJ(150 * 1000) / 1000, 7) };
eq([N_FOOD.j, N_FOOD.kj], [627900, 627.9], 'num-food');
export const N_KJ = sig(toCal(2000), 4);
eq(N_KJ, 477.8, 'num-kj');
export const N_ICE = { v: 500, vi: sig((500 * RHO_W) / RHO_ICE, 4) };
export const N_ICE_INC = sig(N_ICE.vi - N_ICE.v, 3);
export const N_ICE_PCT = sig((N_ICE_INC / N_ICE.v) * 100, 3);
eq([N_ICE.vi, N_ICE_INC, N_ICE_PCT], [555.6, 55.6, 11.1], 'num-ice');
export const N_DEG = { in: 8000, useful: 2400, deg: 8000 - 2400 };
eq(N_DEG.deg, 5600, 'num-deg');
export const N_PCT = { in: 12000, pct: 30, useful: sig(12000 * 0.3, 4), deg: sig(12000 - 12000 * 0.3, 4), cal: sig((12000 - 12000 * 0.3) / CAL, 5) };
eq([N_PCT.useful, N_PCT.deg, N_PCT.cal], [3600, 8400, 2006.7], 'num-pct');
export const N_MASS = { j: 5023.2, cal: sig(5023.2 / CAL, 5) };
eq(N_MASS.cal, 1200, 'num-mass: 5023.2 J = 1200 cal');
export const N_RISE = { m: 400, cal: N_MASS.cal, dt: N_MASS.cal / 400 };
eq(N_RISE.dt, 3, 'num-rise: 1200 cal warms 400 g by 3 degrees C');
export const N_BULB = { in: 60, light: 3, heat: 60 - 3, pct: sig((60 - 3) / 60 * 100, 3) };
eq([N_BULB.heat, N_BULB.pct], [57, 95], 'num-bulb');

// ---------------------------------------------------------------- multiple-choice numbers
export const M3 = [toJ(1500) === 6279 ? 6279 : null, 1500 / CAL, 1500 * CAL * 1000, 1500 + CAL];
eq(M3[0], 6279, 'ht-mcq3 key: 1500 cal');
export const A3 = [toJ(500), sig(500 / CAL, 4), 500, 500 * 1000];
eq([A3[0], A3[1]], [2093, 119.4], 'ht-mcq4');

// ---------------------------------------------------------------- long answers
export const LH = { cal: 4000, j: toJ(4000), m: 250, dt: 16 };
eq([LH.j, LH.m * LH.dt], [16744, 4000], 'long-heat: 4000 cal = 16744 J = 250 g x 16');
export const LH_KCAL = LH.cal / 1000;
export const LH_HEATER = { j: 33488, cal: sig(33488 / CAL, 6), m: 500, dt: sig(33488 / CAL / 500, 4) };
eq([LH_HEATER.cal, LH_HEATER.dt], [8000, 16], 'long-heat heater 33488 J');
export const LE = { in: 8000, useful: 2400, deg: 5600, sound: 800, heat: 4800, cal: sig(5600 / CAL, 5) };
eq([LE.sound + LE.heat, LE.cal], [5600, 1337.8], 'long-engine');
export const LE_PCT = sig((LE.deg / LE.in) * 100, 3);
eq(LE_PCT, 70, 'long-engine degraded %');
export const LP = { v: 2000, vi: sig((2000 * RHO_W) / RHO_ICE, 5) };
export const LP_INC = sig(LP.vi - LP.v, 4);
eq([LP.vi, LP_INC], [2222.2, 222.2], 'long-pipe: 2000 cm3');

// ---------------------------------------------------------------- added numericals
export const N_SP = { m: 60, t1: 25, t2: 65, cal: 60 * (65 - 25), j: toJ(60 * (65 - 25)) };
eq([N_SP.cal, N_SP.j], [2400, 10046.4], 'num-spoon: 60 g, 25 to 65 degrees C');
export const N_TANK = { m: 900, vw: sig(900 / 1000, 3), vi: sig(900 / 900, 3), inc: sig(900 / 900 - 900 / 1000, 3) };
eq([N_TANK.vw, N_TANK.vi, N_TANK.inc], [0.9, 1, 0.1], 'num-tank: 900 kg of water');
