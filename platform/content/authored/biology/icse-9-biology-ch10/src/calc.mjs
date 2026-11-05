// Computed values for ICSE 9 Biology ch10 Teeth and the Digestive System (imagined data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Adult dental formula for one half of a jaw (upper and lower alike): incisors 2, canines 1, premolars 2, molars 3.
export const HALF = { i: 2, c: 1, pm: 2, m: 3 };
export const HALF_TOTAL = eq(HALF.i + HALF.c + HALF.pm + HALF.m, 8, 'teeth in one half jaw');
export const JAW_TOTAL = eq(HALF_TOTAL * 2, 16, 'teeth in one jaw');
export const ADULT_TOTAL = eq(JAW_TOTAL * 2, 32, 'teeth in an adult mouth');
// Teeth of each type in the whole mouth: 4 half jaws.
export const MOUTH = { i: HALF.i * 4, c: HALF.c * 4, pm: HALF.pm * 4, m: HALF.m * 4 };
eq(MOUTH, { i: 8, c: 4, pm: 8, m: 12 }, 'teeth by type');
eq(MOUTH.i + MOUTH.c + MOUTH.pm + MOUTH.m, ADULT_TOTAL, 'types add up to 32');
export const CUT_TEAR = eq(MOUTH.i + MOUTH.c, 12, 'cutting and tearing teeth');
export const GRIND = eq(MOUTH.pm + MOUTH.m, 20, 'grinding teeth');
// Bank: a patient has lost all canines and all premolars.
export const LEFT_AFTER = eq(ADULT_TOTAL - MOUTH.c - MOUTH.pm, 20, 'teeth left after losing canines and premolars');
// Bank: a mouth with only 28 teeth (third molars missing): third molars are 4 of the 12 molars.
export const THIRD_MOLARS = 4;
export const NO_THIRD = eq(ADULT_TOTAL - THIRD_MOLARS, 28, 'teeth without third molars');
export const MOLARS_NO_THIRD = eq(MOUTH.m - THIRD_MOLARS, 8, 'molars left without third molars');

// Experiment (imagined): 2 mL saliva added to 5 mL starch solution; minutes for a drop to stop turning blue-black with iodine.
export const TUBES = [{ name: 'A', temp: 37, minutes: 6 }, { name: 'B', temp: 10, minutes: 24 }];
export const TUBE_RATIO = eq(TUBES[1].minutes / TUBES[0].minutes, 4, 'times slower at 10 degrees');
// Second experiment (bank): saliva at 37 degrees against 20 degrees.
export const EXPT2 = [{ name: 'P', temp: 37, minutes: 8 }, { name: 'Q', temp: 20, minutes: 16 }];
export const EXPT2_RATIO = eq(EXPT2[1].minutes / EXPT2[0].minutes, 2, 'times slower at 20 degrees');
export const EXPT2_DIFF = eq(EXPT2[1].minutes - EXPT2[0].minutes, 8, 'extra minutes at 20 degrees');

// Villi (imagined patch): 5 mm by 4 mm of wall; 25 villi on every square millimetre; each villus adds 0.4 square millimetre.
export const PATCH = { l: 5, w: 4, density: 25, add: 0.4 };
export const PATCH_AREA = eq(PATCH.l * PATCH.w, 20, 'flat area of patch (mm2)');
export const VILLI = eq(PATCH_AREA * PATCH.density, 500, 'villi on the patch');
export const EXTRA = eq(round(VILLI * PATCH.add, 1), 200, 'extra surface from villi (mm2)');
export const TOTAL_AREA = eq(PATCH_AREA + EXTRA, 220, 'total absorbing area (mm2)');
export const AREA_RATIO = eq(TOTAL_AREA / PATCH_AREA, 11, 'times larger with villi');

// Second patch (bank): 6 mm by 5 mm, 20 villi on each square millimetre, each adding 0.4 square millimetre.
export const PATCH2 = { l: 6, w: 5, density: 20, add: 0.4 };
export const P2_AREA = eq(PATCH2.l * PATCH2.w, 30, 'flat area of second patch');
export const P2_VILLI = eq(P2_AREA * PATCH2.density, 600, 'villi on second patch');
export const P2_EXTRA = eq(round(P2_VILLI * PATCH2.add, 1), 240, 'extra area on second patch');
export const P2_TOTAL = eq(P2_AREA + P2_EXTRA, 270, 'total area on second patch');
export const P2_RATIO = eq(P2_TOTAL / P2_AREA, 9, 'times larger on second patch');

// Bank: two molars lost from each half jaw.
export const MOLARS_LOST = eq(2 * 4, 8, 'molars lost');
export const LEFT_MOLARS = eq(ADULT_TOTAL - MOLARS_LOST, 24, 'teeth left after losing two molars in each half jaw');

// Length of the intestines in an adult (books give about 6 m and about 1.5 m).
export const SMALL_M = 6;
export const LARGE_M = 1.5;
export const LEN_RATIO = eq(SMALL_M / LARGE_M, 4, 'small intestine compared with large');
export const LEN_TOTAL = eq(SMALL_M + LARGE_M, 7.5, 'total intestine length');

