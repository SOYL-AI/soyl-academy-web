// Computed values for ICSE 9 Biology ch03 The Flower. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (value !== expected) throw new Error(`calc: ${what}: got ${value}, expected ${expected}`);
  return value;
};
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Worked example: a flower with 5 sepals, 5 petals, 10 stamens and 1 pistil.
export const PARTS = { sepals: 5, petals: 5, stamens: 10, pistils: 1 };
PARTS.total = eq(PARTS.sepals + PARTS.petals + PARTS.stamens + PARTS.pistils, 21, 'floral parts');
PARTS.nonEssential = eq(PARTS.sepals + PARTS.petals, 10, 'non-essential parts');
PARTS.essential = eq(PARTS.stamens + PARTS.pistils, 11, 'essential parts');

// Worked example: pollen in a flower with 6 stamens, 4 pollen sacs in each anther and 300 grains in each sac.
export const POLLEN = { stamens: 6, sacs: 4, perSac: 300 };
POLLEN.perAnther = eq(POLLEN.sacs * POLLEN.perSac, 1200, 'pollen per anther');
POLLEN.total = eq(POLLEN.stamens * POLLEN.perAnther, 7200, 'pollen per flower');

// Bank: a papaya male flower with 5 stamens, 4 sacs per anther and 250 grains per sac.
export const PAPAYA = { stamens: 5, sacs: 4, perSac: 250 };
PAPAYA.perAnther = eq(PAPAYA.sacs * PAPAYA.perSac, 1000, 'papaya pollen per anther');
PAPAYA.total = eq(PAPAYA.stamens * PAPAYA.perAnther, 5000, 'papaya pollen per flower');

// Bank: one anther with 4 pollen sacs, each with 150 grains.
export const ANTHER = { sacs: 4, perSac: 150 };
ANTHER.total = eq(ANTHER.sacs * ANTHER.perSac, 600, 'grains in an anther');

// Worked example and bank: a mango inflorescence with 120 flowers; 15 percent set fruit.
export const MANGO = { flowers: 120, percent: 15 };
MANGO.fruits = eq((MANGO.flowers * MANGO.percent) / 100, 18, 'fruits set');
MANGO.dropped = eq(MANGO.flowers - MANGO.fruits, 102, 'flowers not setting fruit');

// Bank: a bunch of 24 flowers on one axis, of which 6 are still buds.
export const BUNCH = { flowers: 24, buds: 6 };
BUNCH.open = eq(BUNCH.flowers - BUNCH.buds, 18, 'open flowers');
BUNCH.pctBuds = eq(pct(BUNCH.buds, BUNCH.flowers), 25, 'percentage buds');
