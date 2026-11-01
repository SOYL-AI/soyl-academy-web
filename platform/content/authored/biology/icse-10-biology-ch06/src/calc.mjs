// Computed values for ICSE 10 Biology ch06 (imagined experiments on plant growth regulators and tropisms).
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;
const r1 = (x) => Math.round(x * 10) / 10;

// Dwarf pea seedlings: mean height (cm) three weeks after spraying with water or with gibberellin.
export const PEA = { water: 12, ga: 30 };
PEA.increase = PEA.ga - PEA.water;
PEA.times = r1(PEA.ga / PEA.water);

// Rose stem cuttings: rooted cuttings out of each batch, dipped in auxin rooting powder or untreated.
export const CUT = { n: 40, auxin: 34, control: 10 };
CUT.pctAuxin = pct(CUT.auxin, CUT.n);
CUT.pctControl = pct(CUT.control, CUT.n);
CUT.extra = CUT.auxin - CUT.control;

// Detached leaves kept in the dark for six days: leaves still green out of each set of 20.
export const LEAF = { n: 20, cytokinin: 18, water: 4 };
LEAF.pctCytokinin = pct(LEAF.cytokinin, LEAF.n);
LEAF.pctWater = pct(LEAF.water, LEAF.n);

// Unripe bananas in a closed box with one ripe banana, or alone: days to turn yellow.
export const BANANA = { withRipe: 3, alone: 8 };
BANANA.saved = BANANA.alone - BANANA.withRipe;

if (PEA.increase !== 18 || PEA.times !== 2.5 || CUT.pctAuxin !== 85 || CUT.pctControl !== 25 || LEAF.pctCytokinin !== 90 || LEAF.pctWater !== 20 || BANANA.saved !== 5) throw new Error('calc');
