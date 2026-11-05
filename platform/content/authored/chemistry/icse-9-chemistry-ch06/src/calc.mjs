// Computed values for ICSE 9 Chemistry ch06 Hard and Soft Water; Making Water Potable.
// All data are IMAGINED and illustrative (soap test volumes, doses, case counts); every derived number is computed here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Soap test: soap solution (mL) needed to give a lasting lather with 50 mL of each sample.
export const DISTILLED = 1;
export const SAMPLES = {
  A: { raw: 10, boiled: 4, washed: 1 },
  B: { raw: 12, boiled: 12, washed: 1 },
  C: { raw: 8, boiled: 1, washed: 1 },
};
const part = (s) => ({ excess: s.raw - DISTILLED, temporary: s.raw - s.boiled, permanent: s.boiled - DISTILLED });
export const PA = part(SAMPLES.A);
export const PB = part(SAMPLES.B);
export const PC = part(SAMPLES.C);
eq([PA.excess, PA.temporary, PA.permanent], [9, 6, 3], 'sample A parts');
eq([PB.excess, PB.temporary, PB.permanent], [11, 0, 11], 'sample B parts (permanent only)');
eq([PC.excess, PC.temporary, PC.permanent], [7, 7, 0], 'sample C parts (temporary only)');
export const A_TEMP_PCT = eq(round((PA.temporary / PA.excess) * 100, 1), 66.7, 'sample A temporary share');
export const A_PERM_PCT = eq(round((PA.permanent / PA.excess) * 100, 1), 33.3, 'sample A permanent share');
export const A_FALL_PCT = eq(round(((SAMPLES.A.raw - SAMPLES.A.boiled) / SAMPLES.A.raw) * 100, 0), 60, 'fall in soap needed after boiling sample A');
export const B_SAVED = eq(SAMPLES.B.raw - SAMPLES.B.washed, 11, 'soap saved for sample B after washing soda');

// Chlorination dose: 0.5 mg per litre in a 20 000 litre tank.
export const CL_DOSE_MG_L = 0.5;
export const TANK_L = 20000;
export const CL_MG = eq(CL_DOSE_MG_L * TANK_L, 10000, 'chlorine needed in mg');
export const CL_G = eq(CL_MG / 1000, 10, 'chlorine needed in g');

// Alum dose: 30 mg per litre for a 10 000 litre batch.
export const ALUM_MG_L = 30;
export const BATCH_L = 10000;
export const ALUM_MG = eq(ALUM_MG_L * BATCH_L, 300000, 'alum in mg');
export const ALUM_G = eq(ALUM_MG / 1000, 300, 'alum in g');

// Excess fluoride: 3.0 mg per litre found; limit 1.5 mg per litre; a 5000 litre tank.
export const F_FOUND = 3.0;
export const F_LIMIT = 1.5;
export const F_EXCESS = eq(F_FOUND - F_LIMIT, 1.5, 'excess fluoride mg per L');
export const F_TANK_L = 5000;
export const F_REMOVE_MG = eq(F_EXCESS * F_TANK_L, 7500, 'fluoride to remove in mg');
export const F_REMOVE_G = eq(F_REMOVE_MG / 1000, 7.5, 'fluoride to remove in g');
export const F_PCT = eq(round((F_EXCESS / F_FOUND) * 100, 0), 50, 'percent of fluoride removed');

// Village outbreak (imagined): 250 households; cases before and after chlorinating the well.
export const HOUSEHOLDS = 250;
export const BEFORE = 40;
export const AFTER = 10;
export const BEFORE_PCT = eq(round((BEFORE / HOUSEHOLDS) * 100, 0), 16, 'households affected before');
export const AFTER_PCT = eq(round((AFTER / HOUSEHOLDS) * 100, 0), 4, 'households affected after');
export const FALL = eq(BEFORE - AFTER, 30, 'fall in affected households');
export const FALL_PCT = eq(round((FALL / BEFORE) * 100, 0), 75, 'percent fall in cases');

// Soap use (imagined): a family uses 3 bars a month in hard water and 2 in soft water.
export const BARS_HARD = 3;
export const BARS_SOFT = 2;
export const BARS_EXTRA = eq(BARS_HARD - BARS_SOFT, 1, 'extra bars in hard water');
export const BARS_PCT = eq(round((BARS_EXTRA / BARS_SOFT) * 100, 0), 50, 'percent more soap in hard water');

// Relative masses used for the conservation check of the boiling equation (Ca 40, C 12, O 16, H 1).
export const CAHCO3_2 = eq(40 + 2 * (1 + 12 + 3 * 16), 162, 'Mr Ca(HCO3)2');
eq(100 + 18 + 44, CAHCO3_2, 'mass is conserved on boiling: CaCO3 + H2O + CO2');

// Atom balance notes (no bond characters in any equation; the pipeline checks them):
//   CaCO3 + H2O + CO2 -> Ca(HCO3)2 ; Ca(HCO3)2 -> CaCO3 + H2O + CO2 ; Mg(HCO3)2 -> MgCO3 + H2O + CO2 ;
//   CaCl2 + Na2CO3 -> CaCO3 + 2NaCl ; MgSO4 + Na2CO3 -> MgCO3 + Na2SO4 ; Ca(HCO3)2 + Na2CO3 -> CaCO3 + 2NaHCO3 ;
//   2C17H35COONa + CaCl2 -> (C17H35COO)2Ca + 2NaCl
