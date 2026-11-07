// Computed values for ICSE 9 Physics ch06 Upthrust and Archimedes' Principle. Every number used in a stem, answer, table
// or slide is exported from here and asserted with eq(value, expected, what). g = 10 m s^-2 throughout; densities
// (kg m^-3): water 1000, sea water 1030, ice 900 (deck) and 920 (questions), brine 1200, oil 800, air 1.2, helium 0.18.
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const g = 10;
export const RHO = { water: 1000, sea: 1030, ice: 900, ice2: 920, brine: 1200, oil: 800, air: 1.2, he: 0.18 };
const cm3 = (v) => v / 1e6; // cm^3 -> m^3
export const vol = cm3;
/** Upthrust on a body with volume v (m^3) immersed in a liquid of density rho. */
export const up = (v, rho) => sig(rho * v * g, 10);
/** Relative density from weights in air and in water. */
export const rdSolid = (wAir, wWater) => wAir / (wAir - wWater);
/** Relative density of a liquid from the weights of one solid in air, in water and in the liquid. */
export const rdLiquid = (wAir, wWater, wLiq) => (wAir - wLiq) / (wAir - wWater);

// ---------------------------------------------------------------- deck 1
export const SW = { w: 15, v: 600, u: up(cm3(600), RHO.water) };
export const SW_APP = SW.w - SW.u;
eq([SW.u, SW_APP], [6, 9], 'spring balance in water');
export const D1_CALC = up(cm3(250), RHO.water);
eq(D1_CALC, 2.5, 'chk-calc');
export const D1_RD = { air: 8, water: 5, rd: sig(rdSolid(8, 5), 3), density: sig(rdSolid(8, 5) * RHO.water, 3) };
eq([D1_RD.rd, D1_RD.density], [2.67, 2670], 'deck RD example');
export const CHK_RD = rdSolid(6, 4);
eq(CHK_RD, 3, 'chk-rd');
export const LIQ_DECK = { air: 6, water: 4, liq: 4.4, rd: sig(rdLiquid(6, 4, 4.4), 3) };
eq(LIQ_DECK.rd, 0.8, 'deck liquid RD');
export const RD_TABLE = [['Water', 1], ['Ice', 0.9], ['Aluminium', 2.7], ['Iron', 7.8], ['Mercury', 13.6]];
eq(RD_TABLE.map(([, r]) => r * RHO.water), [1000, 900, 2700, 7800, 13600], 'RD table as densities');

// ---------------------------------------------------------------- deck 2
export const D2_LOG = { rho: 650, frac: 650 / RHO.water, pct: sig((650 / RHO.water) * 100, 3), above: sig(100 - (650 / RHO.water) * 100, 3) };
eq([D2_LOG.frac, D2_LOG.pct, D2_LOG.above], [0.65, 65, 35], 'pine log');
export const CHK_FRAC = sig((800 / 1000) * 100, 3);
eq(CHK_FRAC, 80, 'chk-fraction');
export const ICE = { frac: RHO.ice / RHO.sea };
export const ICE_BELOW = sig(ICE.frac * 100, 3);
export const ICE_ABOVE = sig(100 - ICE.frac * 100, 3);
eq([ICE_BELOW, ICE_ABOVE], [87.4, 12.6], 'iceberg percentages');
export const ICE_V = 8000;
export const ICE_V_IN = sig(ICE_V * ICE.frac, 3);
export const ICE_V_OUT = sig(ICE_V - ICE_V * ICE.frac, 3);
eq([ICE_V_IN, ICE_V_OUT], [6990, 1010], 'deck iceberg volumes');

// ---------------------------------------------------------------- numericals
export const N_UP = up(cm3(400), RHO.water);
eq(N_UP, 4, 'num-up');
export const N_APP = 12 - up(cm3(450), RHO.water);
eq(N_APP, 7.5, 'num-app');
export const IRON = { m: 1.95, rho: 7800, v: 1.95 / 7800 };
export const IRON_W = IRON.m * g;
export const IRON_U = up(IRON.v, RHO.water);
export const IRON_APP = IRON_W - IRON_U;
eq([sig(IRON.v * 1e6, 3), sig(IRON_W, 3), sig(IRON_U, 3), sig(IRON_APP, 3)], [250, 19.5, 2.5, 17], 'num-iron');
export const N_RD = rdSolid(5, 3);
eq(N_RD, 2.5, 'num-rd');
export const N_RDL = rdLiquid(6, 4, 4.5);
eq(N_RDL, 0.75, 'num-rdliq');
export const N_DENS = sig(8.9 * RHO.water, 4);
eq(N_DENS, 8900, 'num-dens');
export const N_OIL = 4 - up(cm3(150), RHO.oil);
eq(sig(N_OIL, 3), 2.8, 'num-oil');
export const WOOD = { rho: 600, v: 500 };
export const WOOD_ABOVE = sig(WOOD.v * (1 - WOOD.rho / RHO.water), 3);
eq(WOOD_ABOVE, 200, 'num-wood');
export const N_ICE = sig((RHO.ice2 / RHO.sea) * 100, 3);
eq(N_ICE, 89.3, 'num-ice');
export const BRINE = { v: 200, u: up(cm3(200), RHO.brine) };
export const BRINE_M = sig(BRINE.u / g, 3);
eq([BRINE.u, BRINE_M], [2.4, 0.24], 'num-brine');
export const BOAT_V = 800 / RHO.water;
eq(BOAT_V, 0.8, 'num-boat');
export const CORK_ABOVE = sig(100 - (240 / RHO.water) * 100, 3);
eq(CORK_ABOVE, 76, 'num-cork');

// ---------------------------------------------------------------- multiple-choice numbers
export const A2 = [20 - 6, 20 + 6, 20 * 6];
eq(A2, [14, 26, 120], 'ar-mcq2');
export const R2 = [sig(2700 / RHO.water, 3), 2700, sig(RHO.water / 2700, 2), 27];
eq(R2, [2.7, 2700, 0.37, 27], 'rd-mcq2');
export const R4 = [rdLiquid(10, 6, 6.8), 1 / 0.8, 6.8 / 10, 10 - 6.8];
eq(R4.map((x) => sig(x, 3)), [0.8, 1.25, 0.68, 3.2], 'rd-mcq4');
export const F3 = [sig((640 / RHO.water) * 100, 3), sig((1 - 640 / RHO.water) * 100, 3), 100, sig((RHO.water / 640) * 100, 3)];
eq(F3, [64, 36, 100, 156], 'fl-mcq3');

// ---------------------------------------------------------------- short answers
export const S3 = { air: 8, water: 5.4 };
export const S3_U = sig(S3.air - S3.water, 3);
export const S3_V = sig(S3_U / (RHO.water * g) * 1e6, 3);
export const S3_M = S3.air / g;
export const S3_RD = sig(S3.air / S3_U, 3);
eq([S3_U, S3_V, S3_M, S3_RD], [2.6, 260, 0.8, 3.08], 'ar-s3');
export const BLOCK = { m: 0.6, v: 1000 };
export const BLOCK_RHO = BLOCK.m / cm3(BLOCK.v);
export const BLOCK_W = BLOCK.m * g;
export const BLOCK_VIN = sig((BLOCK_W / (RHO.water * g)) * 1e6, 3);
eq([sig(BLOCK_RHO, 3), BLOCK_W, BLOCK_VIN], [600, 6, 600], 'fl-s3');

// ---------------------------------------------------------------- long answers
// spring balance in water (figure): same body as the deck figure
export const LS = { w: SW.w, app: SW_APP, u: SW.u, v: SW.v };
// RD experiment
export const LR = { air: 4.8, water: 4.0, liq: 4.2 };
export const LR_U = sig(LR.air - LR.water, 3);
export const LR_RDS = sig(rdSolid(LR.air, LR.water), 3);
export const LR_RDL = sig(rdLiquid(LR.air, LR.water, LR.liq), 3);
eq([LR_U, LR_RDS, LR_RDL, LR_RDS * RHO.water, sig(LR_RDL * RHO.water, 3)], [0.8, 6, 0.75, 6000, 750], 'long RD');
// three blocks of 500 cm^3
export const LF = { v: 500, rhoA: 2500, rhoB: 1000, rhoC: 400 };
export const LF_WA = sig(LF.rhoA * cm3(LF.v) * g, 3);
export const LF_WB = sig(LF.rhoB * cm3(LF.v) * g, 3);
export const LF_WC = sig(LF.rhoC * cm3(LF.v) * g, 3);
export const LF_U = sig(up(cm3(LF.v), RHO.water), 3);
export const LF_AAPP = sig(LF_WA - LF_U, 3);
export const LF_VIN = sig((LF_WC / (RHO.water * g)) * 1e6, 3);
export const LF_PCT = sig((LF_VIN / LF.v) * 100, 3);
eq([LF_WA, LF_WB, LF_WC, LF_U, LF_AAPP, LF_VIN, LF_PCT], [12.5, 5, 2, 5, 7.5, 200, 40], 'long float');
// iceberg, structured question: ice 900 in sea water 1030, total 20 000 m^3, and in fresh water
export const LI = { v: 20000, below: sig((RHO.ice / RHO.sea) * 100, 3), above: sig(100 - (RHO.ice / RHO.sea) * 100, 3) };
export const LI_VOUT = sig(LI.v * (1 - RHO.ice / RHO.sea), 3);
export const LI_FRESH = sig((RHO.ice / RHO.water) * 100, 3);
eq([LI.below, LI.above, LI_VOUT, LI_FRESH], [87.4, 12.6, 2520, 90], 'long iceberg');
// submarine
export const SUB = { v: 3000, w: 24000000 };
export const SUB_U = RHO.sea * SUB.v * g;
export const SUB_BALLAST_W = SUB_U - SUB.w;
export const SUB_BALLAST_M = SUB_BALLAST_W / g;
export const SUB_VIN = sig(SUB.w / (RHO.sea * g), 4);
export const SUB_PCT = sig((SUB_VIN / SUB.v) * 100, 3);
eq([SUB_U, SUB_BALLAST_W, SUB_BALLAST_M, SUB_VIN, SUB_PCT], [30900000, 6900000, 690000, 2330, 77.7], 'long submarine');
// balloon
export const BAL = { v: 600, load: 3000 };
export const BAL_U = RHO.air * BAL.v * g;
export const BAL_WHE = sig(RHO.he * BAL.v * g, 4);
export const BAL_NET = BAL_U - BAL_WHE - BAL.load;
export const BAL_M = BAL_NET / g;
eq([BAL_U, BAL_WHE, sig(BAL_NET, 4), sig(BAL_M, 3)], [7200, 1080, 3120, 312], 'long balloon');
