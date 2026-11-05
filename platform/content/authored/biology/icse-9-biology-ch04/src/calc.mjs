// Computed values for ICSE 9 Biology ch04 Pollination and Fertilisation (imagined experiment data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const pct = (part, whole) => round((part / whole) * 100, 1);

// Chromosome numbers for a tomato plant (2n = 24).
export const TWO_N = 24;
export const GAMETE_N = eq(TWO_N / 2, 12, 'gamete chromosome number');
export const ZYGOTE_N = eq(GAMETE_N + GAMETE_N, 24, 'zygote chromosome number');
export const ENDOSPERM_N = eq(GAMETE_N * 3, 36, 'endosperm chromosome number (two polar nuclei plus one male gamete)');

// Pollen tube: steady growth rate through a style (imagined values).
export const TUBE_RATE_MM_PER_H = 3;
export const STYLE_MM = 15;
export const TUBE_HOURS = eq(STYLE_MM / TUBE_RATE_MM_PER_H, 5, 'hours for the tube to cross the style');
export const STYLE2_MM = 21;
export const TUBE2_HOURS = eq(STYLE2_MM / TUBE_RATE_MM_PER_H, 7, 'hours for the tube to cross a longer style');

// A fruit with many seeds needs one pollen tube (two male gametes) per seed.
export const SEEDS = 40;
export const TUBES_NEEDED = eq(SEEDS, 40, 'pollen tubes needed for 40 seeds');
export const MALE_GAMETES_USED = eq(SEEDS * 2, 80, 'male gametes used for 40 seeds');
export const SMALL_FRUIT_SEEDS = 6;
export const SMALL_FRUIT_GAMETES = eq(SMALL_FRUIT_SEEDS * 2, 12, 'male gametes used for 6 seeds');

// Bagging experiment on tomato flower buds (40 buds per set; imagined).
export const BUDS = 40;
export const SETS = [
  { id: 'P', what: 'Bagged, anthers left in place', fruit: 34 },
  { id: 'Q', what: 'Anthers removed, stigma dusted with pollen from another plant, bagged', fruit: 38 },
  { id: 'R', what: 'Anthers removed, bagged, no pollen added', fruit: 0 },
  { id: 'S', what: 'Left open', fruit: 36 },
].map((s) => ({ ...s, pct: pct(s.fruit, BUDS) }));
eq(SETS.map((s) => s.pct), [85, 95, 0, 90], 'fruit set percentages');
export const SET_P = SETS[0];
export const SET_Q = SETS[1];
export const SET_R = SETS[2];
export const SET_S = SETS[3];

// Pollen germination in sugar solutions (200 grains counted per slide; imagined).
export const GRAINS = 200;
export const SUGAR = [
  { conc: 0, germ: 14 },
  { conc: 5, germ: 62 },
  { conc: 10, germ: 118 },
  { conc: 15, germ: 90 },
  { conc: 20, germ: 34 },
].map((s) => ({ ...s, pct: pct(s.germ, GRAINS) }));
eq(SUGAR.map((s) => s.pct), [7, 31, 59, 45, 17], 'germination percentages');
export const BEST = SUGAR.reduce((a, b) => (b.germ > a.germ ? b : a));
eq(BEST.conc, 10, 'best sugar concentration');

// Pollen produced per flower (imagined): sage (insects) and a grass (wind).
export const SAGE_POLLEN = 2000;
export const GRASS_POLLEN = 40000;
export const POLLEN_RATIO = eq(GRASS_POLLEN / SAGE_POLLEN, 20, 'grass pollen compared with sage pollen');

// Protandry timeline (days after the flower opens; imagined).
export const ANTHER_DAYS = [1, 2];
export const STIGMA_DAYS = [3, 4];
export const GAP_DAYS = eq(STIGMA_DAYS[0] - ANTHER_DAYS[1], 1, 'days between last pollen release and a ready stigma');

// A protogynous flower (imagined): the stigma is ready first, the anthers shed pollen later.
export const PG_STIGMA_DAYS = [1, 2];
export const PG_ANTHER_DAYS = [4, 5];
export const PG_GAP_DAYS = eq(PG_ANTHER_DAYS[0] - PG_STIGMA_DAYS[1], 2, 'days between the last receptive day and the first pollen day');
export const PG_SPAN_DAYS = eq(PG_ANTHER_DAYS[1] - PG_STIGMA_DAYS[0] + 1, 5, 'days from first receptive day to last pollen day');

// A pea-like crop (imagined): 2n = 14.
export const PEA_2N = 14;
export const PEA_GAMETE = eq(PEA_2N / 2, 7, 'pea gamete chromosome number');
export const PEA_ENDOSPERM = eq(PEA_GAMETE * 3, 21, 'pea endosperm chromosome number');

// Pollen made by a wind-pollinated flower compared with the number of ovules it must fertilise (imagined).
export const GRASS_OVULES = 1;
export const GRASS_PER_OVULE = eq(GRASS_POLLEN / GRASS_OVULES, 40000, 'pollen grains for each ovule of the grass flower');
