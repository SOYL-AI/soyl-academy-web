// Computed values for ICSE 9 Chemistry ch04 Water as a Universal Solvent: Solutions and Solubility.
// Solubility = grams of solute that saturate 100 g of water at a given temperature. All curve data are ILLUSTRATIVE,
// rounded and textbook-shaped (not laboratory measurements); every derived number is computed and asserted here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Illustrative solubility data, grams per 100 g of water, at 0, 10, ... 100 degrees Celsius.
export const TEMPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export const KNO3 = [13, 21, 32, 46, 64, 85, 110, 138, 169, 202, 246];
export const NACL = [36, 36, 36, 36, 37, 37, 37, 38, 38, 39, 39];
// Calcium sulphate is only slightly soluble; drawn on its own scale (grams per 100 g of water).
export const CASO4 = [0.2, 0.22, 0.24, 0.25, 0.26, 0.25, 0.23, 0.21, 0.19, 0.17, 0.16];
export const at = (arr, t) => arr[TEMPS.indexOf(t)];
eq(at(KNO3, 60), 110, 'KNO3 at 60');
eq(at(KNO3, 20), 32, 'KNO3 at 20');
eq(at(KNO3, 80), 169, 'KNO3 at 80');
eq(at(NACL, 20), 36, 'NaCl at 20');
eq(at(NACL, 100), 39, 'NaCl at 100');
eq(at(CASO4, 40), 0.26, 'CaSO4 at 40');
eq(at(CASO4, 100), 0.16, 'CaSO4 at 100');

// Rise in solubility between 20 and 80 degrees Celsius
export const KNO3_RISE = eq(at(KNO3, 80) - at(KNO3, 20), 137, 'KNO3 rise 20 to 80');
export const NACL_RISE = eq(at(NACL, 80) - at(NACL, 20), 2, 'NaCl rise 20 to 80');
export const KNO3_RISE_100 = eq(at(KNO3, 100) - at(KNO3, 0), 233, 'KNO3 rise 0 to 100');

// N1: saturated solution from 50 g water at 60 degrees Celsius (potassium nitrate).
export const N1_WATER = 50;
export const N1_SOLUTE = eq((at(KNO3, 60) * N1_WATER) / 100, 55, 'N1 solute in 50 g water');
export const N1_SOLUTION = eq(N1_WATER + N1_SOLUTE, 105, 'N1 mass of saturated solution');

// N2: cooling a saturated solution made with 200 g water at 80 degrees to 20 degrees.
export const N2_WATER = 200;
export const N2_HOT = eq((at(KNO3, 80) * N2_WATER) / 100, 338, 'N2 dissolved at 80');
export const N2_COLD = eq((at(KNO3, 20) * N2_WATER) / 100, 64, 'N2 stays dissolved at 20');
export const N2_CRYST = eq(N2_HOT - N2_COLD, 274, 'N2 crystallised on cooling');

// N3: solubility from an evaporation experiment (salt X, 30 degrees Celsius).
export const N3_SOLN = 30;
export const N3_RESIDUE = 6;
export const N3_WATER = eq(N3_SOLN - N3_RESIDUE, 24, 'N3 water in the sample');
export const N3_SOLUBILITY = eq((N3_RESIDUE / N3_WATER) * 100, 25, 'N3 solubility g per 100 g water');

// N4: water needed to dissolve 90 g of sodium chloride at 20 degrees.
export const N4_SOLUTE = 90;
export const N4_WATER = eq((N4_SOLUTE / at(NACL, 20)) * 100, 250, 'N4 water for 90 g NaCl');

// N5: 40 g potassium nitrate in 50 g water at 40 degrees Celsius.
export const N5_SOLUTE = 40;
export const N5_WATER = 50;
export const N5_CAN = eq((at(KNO3, 40) * N5_WATER) / 100, 32, 'N5 dissolves at 40');
export const N5_LEFT = eq(N5_SOLUTE - N5_CAN, 8, 'N5 undissolved');

// N6: temperature at which solubility of potassium nitrate is 138 g per 100 g (from the table) and 250 g water at 40 degrees.
export const N6_TEMP = eq(TEMPS[KNO3.indexOf(138)], 70, 'N6 temperature for 138');
export const N6_WATER = 250;
export const N6_SOLUTE = eq((at(KNO3, 40) * N6_WATER) / 100, 160, 'N6 solute to saturate 250 g water at 40');

// N7: mixture of two salts cooled from 60 to 20 degrees (100 g water): which crystallises?
export const N7_KNO3_OUT = eq(at(KNO3, 60) - at(KNO3, 20), 78, 'N7 KNO3 out of 100 g water, 60 to 20');
export const N7_NACL_OUT = eq(at(NACL, 60) - at(NACL, 20), 1, 'N7 NaCl out of 100 g water, 60 to 20');

// N8: saturated solution percentage by mass at 20 degrees (potassium nitrate).
export const N8_PCT = eq(round((at(KNO3, 20) / (100 + at(KNO3, 20))) * 100, 1), 24.2, 'N8 percent of KNO3 in saturated solution at 20');

// N9: a hot saturated solution containing 169 g of potassium nitrate per 100 g water (80 degrees) cooled to 40 degrees.
export const N9_OUT = eq(at(KNO3, 80) - at(KNO3, 40), 105, 'N9 crystallises out of 100 g water, 80 to 40');
// N9b: 30 g of water at 80 degrees saturated, cooled to 40 degrees: use 20 g water instead to give whole numbers
export const N9B_WATER = 20;
export const N9B_OUT = eq((N9_OUT * N9B_WATER) / 100, 21, 'N9b crystallises from 20 g water');

// Unsaturated test: 20 g in 50 g water at 60 degrees (110 per 100 g water; 55 g needed to saturate)
export const N10_SOLUTE = 20;
export const N10_NEEDED = eq(N1_SOLUTE, 55, 'N10 needed to saturate 50 g water at 60');
export const N10_MORE = eq(N10_NEEDED - N10_SOLUTE, 35, 'N10 more solute needed');

// Solubility reading from a three-point set (for a data question): salt Y, mass of solute in 100 g water at 20, 40, 60.
export const Y = [{ t: 20, s: 18 }, { t: 40, s: 24 }, { t: 60, s: 36 }];
export const Y_GAIN = eq(Y[2].s - Y[0].s, 18, 'Y gain from 20 to 60');
export const Y_RATIO = eq(Y[2].s / Y[0].s, 2, 'Y doubles from 20 to 60');
export const Y_50G_AT_60 = eq((Y[2].s * 50) / 100, 18, 'Y in 50 g water at 60');

// L1 (salt Y, 50 g water saturated at 60 degrees, cooled to 20 degrees)
export const Y_SOLN = eq(50 + Y_50G_AT_60, 68, 'Y saturated solution from 50 g water at 60');
export const Y_20_50 = eq((Y[0].s * 50) / 100, 9, 'Y held by 50 g water at 20');
export const Y_CRYST = eq(Y_50G_AT_60 - Y_20_50, 9, 'Y crystals on cooling');

// L2 (graph point D: potassium nitrate at 60 degrees)
export const D_SOL = eq(at(KNO3, 60), 110, 'D solubility');
export const D_250 = eq((D_SOL * 250) / 100, 275, 'KNO3 in 250 g water at 60');
export const D_OUT = eq(at(KNO3, 60) - at(KNO3, 20), 78, 'D cooled to 20, crystals per 100 g water');

// L5 (150 g water, 60 to 20 degrees)
export const L5_WATER = 150;
export const L5_HOT = eq((at(KNO3, 60) * L5_WATER) / 100, 165, 'L5 held at 60');
export const L5_COLD = eq((at(KNO3, 20) * L5_WATER) / 100, 48, 'L5 held at 20');
export const L5_OUT = eq(L5_HOT - L5_COLD, 117, 'L5 crystals');

// L6 (evaporation experiment, salt Z)
export const Z_SOLN = 56;
export const Z_RES = 16;
export const Z_WATER = eq(Z_SOLN - Z_RES, 40, 'Z water');
export const Z_SOL = eq((Z_RES / Z_WATER) * 100, 40, 'Z solubility');
export const Z_250 = eq((Z_SOL * 250) / 100, 100, 'Z in 250 g water');
export const Z_30 = 30;
eq(Z_30 < Z_SOL, true, 'Z 30 g in 100 g water is unsaturated');

// Extra numericals
export const E1_WATER = 80;
export const E1_SOLUTE = eq((at(KNO3, 80) * 0 + at(NACL, 20) * E1_WATER) / 100, 28.8, 'NaCl in 80 g water at 20');
export const E2_TEMP_WATER = 300;
export const E2_SOLUTE = eq((at(KNO3, 40) * E2_TEMP_WATER) / 100, 192, 'KNO3 in 300 g water at 40');
export const E3_SOLN = eq(E2_TEMP_WATER + E2_SOLUTE, 492, 'saturated solution from 300 g water at 40');
