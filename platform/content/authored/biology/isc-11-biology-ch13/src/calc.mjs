// ISC 11 Biology ch13 Photosynthesis in Higher Plants — every number in a stem, answer, table or slide is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one (so a typo can never reach a bank). */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- Calvin cycle bookkeeping
/** C3 cycle: each CO2 fixed costs 3 ATP and 2 NADPH. */
export const calvin = (co2) => ({ turns: co2, atp: 3 * co2, nadph: 2 * co2 });
/** C4 pathway: 2 extra ATP per CO2 to regenerate PEP (5 ATP and 2 NADPH per CO2). */
export const c4 = (co2) => ({ turns: co2, atp: 5 * co2, nadph: 2 * co2 });
export const GLU = calvin(6);
export const GLU4 = c4(6);
eq(GLU.atp, 18, 'C3 ATP per glucose');
eq(GLU.nadph, 12, 'C3 NADPH per glucose');
eq(GLU4.atp, 30, 'C4 ATP per glucose');
eq(GLU4.nadph, 12, 'C4 NADPH per glucose');

/** Carbon atoms through n turns of the cycle (RuBP has 5 C, PGA and G3P 3 C). */
export function carbon(turns) {
  const rubpIn = turns;
  const cIn = rubpIn * 5 + turns;
  const pga = cIn / 3;
  const g3pExit = turns / 3; // one G3P (3 C) leaves for every three CO2 fixed
  const g3pKept = pga - g3pExit;
  const rubpOut = (g3pKept * 3) / 5;
  return { rubpIn, cIn, pga, g3pExit, g3pKept, rubpOut, cExit: g3pExit * 3 };
}
export const CARB6 = carbon(6);
eq(CARB6.cIn, 36, 'carbon entering six turns');
eq(CARB6.pga, 12, 'PGA from six turns');
eq(CARB6.g3pExit, 2, 'G3P leaving six turns');
eq(CARB6.g3pKept, 10, 'G3P kept six turns');
eq(CARB6.rubpOut, 6, 'RuBP regenerated');
eq(CARB6.cExit, 6, 'carbon leaving as glucose');
export const CARB3 = carbon(3);
eq(CARB3.cIn, 18, 'carbon for three turns');
eq(CARB3.pga, 6, 'PGA for three turns');
eq(CARB3.g3pExit, 1, 'one G3P from three turns');
eq(CARB3.rubpOut, 3, 'three RuBP regenerated');

// ---------------------------------------------------------------- water, oxygen and electrons
/** Water split to supply the electrons for n NADPH (2 e- per NADPH, 2 e- per water). */
export const waterForNadph = (nadph) => nadph;
export const o2FromWater = (water) => water / 2;
export const GLU_WATER = waterForNadph(GLU.nadph);
eq(GLU_WATER, 12, 'water split per glucose');
eq(o2FromWater(GLU_WATER), 6, 'O2 per glucose');
export const WATER_MADE = 6; // 6 CO2 + 12 H2O -> C6H12O6 + 6 O2 + 6 H2O
eq(GLU_WATER - WATER_MADE, 6, 'net water used');

// molar masses (C 12, H 1, O 16)
export const M = { co2: 44, glucose: 180, o2: 32, h2o: 18 };
eq(12 + 2 * 16, M.co2, 'CO2 molar mass');
eq(6 * 12 + 12 * 1 + 6 * 16, M.glucose, 'glucose molar mass');
export const glucoseFromCo2 = (g) => round((g * M.glucose) / (6 * M.co2), 3);
export const o2FromCo2 = (g) => round((g * 6 * M.o2) / (6 * M.co2), 3);
export const LEAF_CO2 = 1.32;
export const LEAF_GLU = glucoseFromCo2(LEAF_CO2);
export const LEAF_O2 = o2FromCo2(LEAF_CO2);
eq(LEAF_GLU, 0.9, 'glucose from 1.32 g CO2');
eq(LEAF_O2, 0.96, 'O2 from 1.32 g CO2');

// ---------------------------------------------------------------- proton gradient
/** Fold difference in H+ concentration between two pH values. */
export const hFold = (lowPh, highPh) => round(10 ** (highPh - lowPh));
export const GRAD = { lumen: 5.5, stroma: 7.5 };
export const GRAD_FOLD = hFold(GRAD.lumen, GRAD.stroma);
eq(GRAD_FOLD, 100, 'proton gradient fold');
export const GRAD2 = { lumen: 4.8, stroma: 7.8 };
eq(hFold(GRAD2.lumen, GRAD2.stroma), 1000, 'second gradient fold');

// ---------------------------------------------------------------- photorespiration
/** Two glycolate (2 C each) -> serine (3 C) + CO2 (1 C): fraction of carbon lost. */
export const PR = { in: 2 * 2, serine: 3, co2: 1 };
eq(PR.serine + PR.co2, PR.in, 'carbon balance of photorespiration');
export const PR_LOSS = (PR.co2 / PR.in) * 100;
eq(PR_LOSS, 25, 'percent of glycolate carbon lost');

// ---------------------------------------------------------------- limiting factors (Blackman) — a model, in arbitrary units
export const LIM = { slope: 0.6, capLow: 24, capHigh: 48 }; // rate = min(slope * light, cap)
export const rate = (light, cap) => round(Math.min(LIM.slope * light, cap), 2);
export const plateauAt = (cap) => round(cap / LIM.slope, 2);
eq(plateauAt(LIM.capLow), 40, 'light at which the low-CO2 curve flattens');
eq(plateauAt(LIM.capHigh), 80, 'light at which the high-CO2 curve flattens');
eq(rate(30, LIM.capLow), 18, 'rate at 30 klux, low CO2');
eq(rate(30, LIM.capHigh), 18, 'rate at 30 klux, high CO2');
eq(rate(60, LIM.capLow), 24, 'rate at 60 klux, low CO2');
eq(rate(60, LIM.capHigh), 36, 'rate at 60 klux, high CO2');
eq(rate(100, LIM.capHigh), 48, 'rate at 100 klux, high CO2');
/** Which factor limits at a given light and cap. */
export const limiting = (light, cap) => (LIM.slope * light < cap ? 'light' : 'carbon dioxide');
eq(limiting(30, LIM.capLow), 'light', 'limiting at 30');
eq(limiting(60, LIM.capLow), 'carbon dioxide', 'limiting at 60, low CO2');
eq(limiting(60, LIM.capHigh), 'light', 'limiting at 60, high CO2');
// temperature set: rate at 20, 30, 40 °C under saturating light and CO2 (enzyme model)
export const TEMP = [[10, 6], [20, 14], [30, 24], [40, 12], [50, 2]];

// ---------------------------------------------------------------- spectra (schematic Gaussians; wavelengths in nm)
const g = (x, mu, sd, h) => h * Math.exp(-((x - mu) ** 2) / (2 * sd ** 2));
export const chlA = (x) => g(x, 430, 16, 1) + g(x, 662, 14, 0.85);
export const chlB = (x) => g(x, 453, 15, 0.9) + g(x, 642, 13, 0.6);
export const carot = (x) => g(x, 470, 22, 0.75);
export const sumAbs = (x) => (chlA(x) + chlB(x) + carot(x)) / 2.1;
export const WL = Array.from({ length: 31 }, (_, i) => 400 + i * 10);
export const argmax = (f) => WL.reduce((b, x) => (f(x) > f(b) ? x : b), WL[0]);
eq(argmax(chlA), 430, 'chlorophyll a blue peak');
eq(chlA(550) < 0.05, true, 'green is weakly absorbed by chlorophyll a');
eq(sumAbs(550) < 0.2, true, 'green is weakly absorbed overall');

// Engelmann's experiment: bacteria counted in 1 mm segments of the filament under each colour band
export const ENG = [['violet-blue', 52], ['green', 7], ['red', 45]];
export const ENG_TOTAL = ENG.reduce((s, [, n]) => s + n, 0);
eq(ENG_TOTAL, 104, 'bacteria counted');
export const ENG_RED_PCT = round((45 / ENG_TOTAL) * 100, 1);
eq(ENG_RED_PCT, 43.3, 'percent of bacteria at red');
export const ENG_FOLD = round(52 / 7, 1);
eq(ENG_FOLD, 7.4, 'blue to green ratio');

// ---------------------------------------------------------------- C3 and C4 comparison numbers
export const C4_VS_C3 = { c3opt: '20–25', c4opt: '30–45' };
// CO2 compensation point (ppm): C3 25–100, C4 0–10
export const COMP = { c3: [25, 100], c4: [0, 10] };

// ---------------------------------------------------------------- extra data for the question bank
/** Bubble counts per minute from three Hydrilla twigs lit through coloured filters. */
export const BUB = [['violet-blue', 38], ['green', 4], ['red', 31]];
export const BUB_TOTAL = BUB.reduce((s, [, n]) => s + n, 0);
eq(BUB_TOTAL, 73, 'bubbles in total');
export const BUB_GREEN_PCT = round((4 / BUB_TOTAL) * 100, 1);
eq(BUB_GREEN_PCT, 5.5, 'percent of bubbles under green');
/** A chloroplast preparation that made 60 NADPH. */
export const PREP = { nadph: 60, water: waterForNadph(60), o2: o2FromWater(waterForNadph(60)) };
eq(PREP.water, 60, 'water split for 60 NADPH');
eq(PREP.o2, 30, 'oxygen for 60 NADPH');
/** Photorespiration in 8 glycolate molecules (4 pairs). */
export const PR8 = { glycolate: 8, serine: 8 / 2, co2: (8 / 2) * PR.co2, carbonIn: 8 * 2 };
eq(PR8.co2, 4, 'CO2 lost from 8 glycolate');
eq(PR8.carbonIn, 16, 'carbon in 8 glycolate');
export const CALVIN9 = calvin(9);
eq(CALVIN9.atp, 27, 'ATP to fix 9 CO2');
eq(CALVIN9.nadph, 18, 'NADPH to fix 9 CO2');
export const C4_4 = c4(4);
eq(C4_4.atp, 20, 'ATP to fix 4 CO2 in a C4 plant');
export const C4_EXTRA = GLU4.atp - GLU.atp;
eq(C4_EXTRA, 12, 'extra ATP of C4 per glucose');
/** Temperature response: optimum is the temperature with the highest rate. */
export const TEMP_OPT = TEMP.reduce((b, p) => (p[1] > b[1] ? p : b))[0];
eq(TEMP_OPT, 30, 'optimum temperature');
export const lumenPh = (stromaPh, fold) => round(stromaPh - Math.log10(fold), 1);
eq(lumenPh(8, 10000), 4, 'lumen pH for a 10 000-fold gradient');
