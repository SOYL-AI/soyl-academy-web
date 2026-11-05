// Computed values for ICSE 9 Biology ch05 Seeds: Structure and Germination (imagined experiment data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const pct = (part, whole) => round((part / whole) * 100, 1);

// Worked example 1: a bag with 25 bean seeds and 25 maize grains; cotyledons counted.
export const BAG = { bean: 25, maize: 25, beanCot: 2, maizeCot: 1 };
BAG.beanCotyledons = eq(BAG.bean * BAG.beanCot, 50, 'cotyledons in 25 bean seeds');
BAG.maizeCotyledons = eq(BAG.maize * BAG.maizeCot, 25, 'cotyledons in 25 maize grains');
BAG.total = eq(BAG.beanCotyledons + BAG.maizeCotyledons, 75, 'cotyledons in the bag');

// Water uptake by gram seeds soaked overnight (imagined).
export const SOAK = { dry: 12, wet: 18 };
SOAK.gain = eq(SOAK.wet - SOAK.dry, 6, 'water taken up (g)');
SOAK.pct = eq(pct(SOAK.gain, SOAK.dry), 50, 'percentage gain in mass');

// Four test tubes of 20 seeds each (imagined): P dry cotton wool, Q boiled water with oil, R moist cotton wool in ice, S moist cotton wool at room temperature.
export const SEEDS = 20;
export const TUBES = [
  { id: 'P', what: 'Dry cotton wool, room temperature', germ: 0 },
  { id: 'Q', what: 'Seeds under boiled, cooled water with a layer of oil', germ: 0 },
  { id: 'R', what: 'Moist cotton wool kept in an ice bath', germ: 1 },
  { id: 'S', what: 'Moist cotton wool at room temperature, open to air', germ: 19 },
].map((t) => ({ ...t, pct: pct(t.germ, SEEDS) }));
eq(TUBES.map((t) => t.pct), [0, 0, 5, 95], 'germination percentages in the four tubes');
export const [TP, TQ, TR, TS] = TUBES;
export const NOT_GERM_S = eq(SEEDS - TS.germ, 1, 'seeds that did not germinate in tube S');

// A seed test: 50 mustard seeds sown on moist cloth, 42 germinated.
export const TEST = { sown: 50, germ: 42 };
TEST.pct = eq(pct(TEST.germ, TEST.sown), 84, 'germination percentage');
TEST.failed = eq(TEST.sown - TEST.germ, 8, 'seeds that did not germinate');

// Radicle length of a germinating seed (mm) on days 1 to 4 (imagined), then the growth in the last three days.
export const RADICLE = [3, 9, 18, 30];
export const RADICLE_GAIN = eq(RADICLE[3] - RADICLE[0], 27, 'growth from day 1 to day 4 (mm)');
export const RADICLE_PER_DAY = eq(RADICLE_GAIN / 3, 9, 'mean growth per day (mm)');
export const RADICLE_BIGGEST = eq(Math.max(...RADICLE.slice(1).map((v, i) => v - RADICLE[i])), 12, 'largest one-day gain (mm)');

// Reserve food: dry mass of the cotyledons of a germinating seedling (imagined; mg).
export const COT = { start: 800, day8: 560 };
COT.lost = eq(COT.start - COT.day8, 240, 'reserve food used (mg)');
COT.pct = eq(pct(COT.lost, COT.start), 30, 'percentage of reserve used');

// Hypogeal seedling (imagined): seed sown 4 cm deep; the shoot grows 2 cm a day.
export const SOWN_DEPTH_CM = 4;
export const SHOOT_PER_DAY_CM = 2;
export const DAYS_TO_SURFACE = eq(SOWN_DEPTH_CM / SHOOT_PER_DAY_CM, 2, 'days for a shoot growing 2 cm a day to reach the surface');
