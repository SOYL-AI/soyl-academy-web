// ISC 11 Biology ch10 Cell: The Unit of Life. Every number used in a stem, answer, table, graph or slide is computed here and
// asserted with eq(); nothing computed is typed by hand elsewhere. Settings are original to this chapter: cube cells for the
// surface-to-volume ratio, a transport-rate table for diffusion against a carrier, a cell-fractionation table of marker
// enzymes, a micrograph scale bar, ciliated-cell microtubule counts and chromosome arm data.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);

// ---------------------------------------------------------------- surface area to volume (cube-shaped model cells)
export const cube = (side) => ({ side, sa: 6 * side * side, vol: side ** 3, ratio: round(6 / side, 2) });
export const CUBES = [2, 4, 8].map(cube);
eq(CUBES.map((c) => c.sa), [24, 96, 384], 'cube surface areas');
eq(CUBES.map((c) => c.vol), [8, 64, 512], 'cube volumes');
eq(CUBES.map((c) => c.ratio), [3, 1.5, 0.75], 'cube surface-to-volume ratios');
/** Cells needed to fill one 8-unit cube when each cell is a 2-unit cube. */
export const SMALL_IN_BIG = CUBES[2].vol / CUBES[0].vol;
eq(SMALL_IN_BIG, 64, 'small cubes in the large cube');
export const SA_SMALL_TOTAL = SMALL_IN_BIG * CUBES[0].sa; // surface exposed if the same volume is made of small cells
eq(SA_SMALL_TOTAL, 1536, 'surface of 64 small cubes');
eq(SA_SMALL_TOTAL / CUBES[2].sa, 4, 'surface gain from small cells');

// ---------------------------------------------------------------- transport rates (arbitrary units per minute)
// Simple diffusion rises in a straight line with the outside concentration; a carrier saturates: v = Vmax S / (K + S).
export const CARRIER = { vmax: 60, k: 20 };
export const DIFF_K = 0.25;
export const diffusion = (s) => round(DIFF_K * s, 2);
export const carrier = (s) => round((CARRIER.vmax * s) / (CARRIER.k + s), 1);
export const TR_S = [10, 20, 40, 100, 200];
export const TR = TR_S.map((s) => ({ s, diff: diffusion(s), car: carrier(s) }));
eq(TR.map((t) => t.diff), [2.5, 5, 10, 25, 50], 'diffusion rates');
eq(TR.map((t) => t.car), [20, 30, 40, 50, 54.5], 'carrier rates');
eq(carrier(CARRIER.k), CARRIER.vmax / 2, 'half of the carrier maximum at S = K');
/** The carrier is already within this fraction (percent) of its maximum at S = 200. */
export const CAR_SAT_200 = pct(carrier(200), CARRIER.vmax);
eq(CAR_SAT_200, 90.8, 'carrier saturation at 200');
eq(diffusion(200) > carrier(200), false, 'diffusion still below carrier at 200');
/** Where does the straight line overtake the curve? 0.25 S = 60 S/(20+S) -> S = 220. */
export const CROSS = CARRIER.vmax / DIFF_K - CARRIER.k;
eq(CROSS, 220, 'concentration where diffusion overtakes the carrier');

// ---------------------------------------------------------------- cell fractionation: marker-enzyme activity (units) per fraction
export const FRACTIONS = ['Nuclear pellet', 'Heavy pellet', 'Microsome pellet', 'Supernatant'];
export const ENZ = {
  'Succinate dehydrogenase': [30, 420, 35, 15], // inner mitochondrial membrane marker
  'Acid phosphatase': [20, 260, 20, 200], // lysosome marker (some leaks into supernatant)
  'Glucose-6-phosphatase': [25, 40, 380, 55], // endoplasmic reticulum marker
  Catalase: [10, 90, 30, 70], // peroxisome marker
};
export const total = (a) => a.reduce((x, y) => x + y, 0);
eq(Object.values(ENZ).map(total), [500, 500, 500, 200], 'enzyme totals');
export const share = (name, i) => pct(ENZ[name][i], total(ENZ[name]));
eq(share('Succinate dehydrogenase', 1), 84, 'SDH in the heavy pellet');
eq(share('Glucose-6-phosphatase', 2), 76, 'G6Pase in the microsome pellet');
eq(share('Acid phosphatase', 3), 40, 'acid phosphatase in the supernatant');
eq(share('Catalase', 1), 45, 'catalase in the heavy pellet');
/** The fraction holding the largest share of an enzyme. */
export const richest = (name) => FRACTIONS[ENZ[name].indexOf(Math.max(...ENZ[name]))];
eq(richest('Glucose-6-phosphatase'), 'Microsome pellet', 'richest in the ER marker');

// ---------------------------------------------------------------- micrograph scale bar
export const SCALE = { barCm: 2.5, barUm: 1 };
export const MITO_CM = 4.5; // length of the mitochondrion on the micrograph
export const realUm = (cm) => round((cm * SCALE.barUm) / SCALE.barCm, 2);
eq(realUm(MITO_CM), 1.8, 'organelle length from the scale bar');
eq(realUm(1), 0.4, 'one centimetre on the scale bar');
export const RIBO_NM = 20; // ribosome diameter, nm (approximate)
export const ribosomesAcross = (um) => round((um * 1000) / RIBO_NM, 0);
eq(ribosomesAcross(realUm(MITO_CM)), 90, 'ribosomes laid end to end across 1.8 micrometres');

// ---------------------------------------------------------------- cilia and centrioles
export const AXONEME = { doublets: 9, central: 2 };
export const axonemeMicrotubules = AXONEME.doublets * 2 + AXONEME.central;
eq(axonemeMicrotubules, 20, 'microtubules in one 9 + 2 axoneme');
export const CILIA_PER_CELL = 250;
export const cellMicrotubules = CILIA_PER_CELL * axonemeMicrotubules;
eq(cellMicrotubules, 5000, 'microtubules in the axonemes of one ciliated cell');
export const BASAL = { triplets: 9, per: 3 };
export const centrioleMicrotubules = BASAL.triplets * BASAL.per;
eq(centrioleMicrotubules, 27, 'microtubules in one centriole');
eq(2 * centrioleMicrotubules, 54, 'microtubules in a centrosome');
/** A sperm tail is a flagellum with a 9 + 2 axoneme, so one sperm holds 20 axonemal microtubules. */
export const SPERM_TAIL_MT = axonemeMicrotubules;

// ---------------------------------------------------------------- chromosome arm data (micrometres), all drawn to scale in svgs.mjs
export const kind = (total_, short) => {
  if (short === 0) return 'telocentric';
  const idx = short / total_;
  if (idx >= 0.375) return 'metacentric';
  if (idx >= 0.25) return 'submetacentric';
  return 'acrocentric';
};
export const CHR = [
  { name: 'metacentric', total: 20, short: 9 },
  { name: 'submetacentric', total: 20, short: 6 },
  { name: 'acrocentric', total: 20, short: 3 },
  { name: 'telocentric', total: 20, short: 0 },
];
for (const c of CHR) eq(kind(c.total, c.short), c.name, `classification of the ${c.name} example`);
export const armRatio = (c) => (c.short === 0 ? null : round((c.total - c.short) / c.short, 1));
eq(CHR.map(armRatio), [1.2, 2.3, 5.7, null], 'long-arm to short-arm ratios');
/** A chromosome with a 14 micrometre long arm and 4 micrometre short arm. */
export const EXTRA = { total: 18, short: 4 };
eq(kind(EXTRA.total, EXTRA.short), 'acrocentric', 'classification of the 4 + 14 chromosome');
eq(kind(16, 8), 'metacentric', 'a chromosome with equal arms');
eq(kind(12, 4), 'submetacentric', 'a 4 + 8 chromosome');

// ---------------------------------------------------------------- historical dates
export const YEARS = { hooke: 1665, leeuwenhoek: 1674, brown: 1831, schleiden: 1838, schwann: 1839, virchow: 1855, singer: 1972 };
eq(YEARS.virchow - YEARS.schwann, 16, 'years from Schwann to Virchow');
eq(YEARS.singer - YEARS.hooke, 307, 'years from Hooke to the fluid mosaic model');

// ---------------------------------------------------------------- extra derived values used in decks and answers
export const BASAL_TOTAL = CILIA_PER_CELL * centrioleMicrotubules;
eq(BASAL_TOTAL, 6750, 'microtubules in the basal bodies of one ciliated cell');
/** Share of the chromosome length lying in the short arm (percent). */
export const shortShare = (c) => pct(c.short, c.total, 0);
eq(CHR.map(shortShare), [45, 30, 15, 0], 'short-arm share of each chromosome');
export const longArm = (c) => c.total - c.short;
eq(CHR.map(longArm), [11, 14, 17, 20], 'long-arm lengths');
/** Increase from 100 to 200 units of outside concentration for each transport route. */
export const GAIN_100_200 = { car: round(carrier(200) - carrier(100), 1), carPct: pct(carrier(200) - carrier(100), carrier(100), 0), diff: diffusion(200) - diffusion(100) };
eq(GAIN_100_200, { car: 4.5, carPct: 9, diff: 25 }, 'gain when the concentration doubles from 100 to 200');

// ---------------------------------------------------------------- values for the question bank
eq(cube(5).ratio, 1.2, 'ratio for a 5-unit cube');
/** Factor by which the total surface grows when a big cube is cut into small cubes of the same total volume. */
export const cutFactor = (big, small) => round(((big / small) ** 3 * cube(small).sa) / cube(big).sa, 2);
eq(cutFactor(6, 3), 2, 'cutting a 6-cube into 3-cubes doubles the surface');
eq(cutFactor(8, 2), 4, 'cutting an 8-cube into 2-cubes quadruples the surface');
eq(carrier(60), 45, 'carrier rate at S = 60');
export const SCALE2 = { barCm: 3, barUm: 0.5 };
export const realUm2 = (cm) => round((cm * SCALE2.barUm) / SCALE2.barCm, 3);
eq(realUm2(7.5), 1.25, 'second micrograph: 7.5 cm');
export const CILIA_B = 180;
export const basalTotal = (n) => n * centrioleMicrotubules;
eq(basalTotal(CILIA_B), 4860, 'microtubules in 180 basal bodies');
// karyotype of a plant with 2n = 10 (micrometres): short arm, long arm
export const KARYO = [
  { no: 1, short: 5, long: 11 },
  { no: 2, short: 8, long: 8 },
  { no: 3, short: 3, long: 13 },
  { no: 4, short: 0, long: 15 },
  { no: 5, short: 6, long: 9 },
].map((c) => ({ ...c, total: c.short + c.long, type: kind(c.short + c.long, c.short) }));
eq(KARYO.map((c) => c.type), ['submetacentric', 'metacentric', 'acrocentric', 'telocentric', 'metacentric'], 'karyotype types');
export const KARYO_TOTAL = KARYO.reduce((s, c) => s + c.total, 0);
eq(KARYO_TOTAL, 78, 'total length of the five chromosomes');
eq(pct(KARYO[2].short, KARYO[2].total, 1), 18.8, 'short-arm share of chromosome 3');
