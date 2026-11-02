// ch06 Anatomy of Flowering Plants — every number used by decks, SVGs and questions is computed (and checked) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (typeof expected === 'string' ? value !== expected : Math.abs(value - expected) > 1e-9) throw new Error(`calc: ${what} = ${value}, expected ${expected}`);
};
export const N = {};

/** Real size in micrometres of an object measuring `imageMm` millimetres on a print at magnification `mag`. */
export const actualUm = (imageMm, mag) => round((imageMm * 1000) / mag, 2);
N.parenUm = actualUm(21, 600);
N.sclereidUm = actualUm(45, 900);
N.fibreUm = actualUm(30, 500);
eq(N.parenUm, 35, 'parenchyma cell width');
eq(N.sclereidUm, 50, 'sclereid width');
eq(N.fibreUm, 60, 'fibre width');

/** Stomatal density: stomata counted in a field of view of known area (mm squared). */
export const density = (count, areaMm2) => round(count / areaMm2, 1);
export const FIELD = { area: 0.25, upper: 5, lower: 20 };
N.stoUpper = density(FIELD.upper, FIELD.area);
N.stoLower = density(FIELD.lower, FIELD.area);
N.stoRatio = N.stoLower / N.stoUpper;
N.stoTotal = N.stoUpper + N.stoLower;
eq(N.stoUpper, 20, 'upper stomatal density');
eq(N.stoLower, 80, 'lower stomatal density');
eq(N.stoRatio, 4, 'lower to upper ratio');
eq(N.stoTotal, 100, 'total density both surfaces');
// an isobilateral (grass) leaf: equal counts on both surfaces in a field of 0.2 mm squared
export const GRASS = { area: 0.2, upper: 9, lower: 9 };
N.grassDensity = density(GRASS.upper, GRASS.area);
eq(N.grassDensity, 45, 'grass stomatal density per surface');
eq(density(GRASS.upper, GRASS.area), density(GRASS.lower, GRASS.area), 'equal on both surfaces');

/** Vascular bundles in a monocot stem section: counted in a small field, scaled to a larger section. */
export const BUNDLE = { counted: 30, field: 5, section: 12 };
N.bundleDensity = BUNDLE.counted / BUNDLE.field;
N.bundlesInSection = N.bundleDensity * BUNDLE.section;
eq(N.bundleDensity, 6, 'bundle density per mm squared');
eq(N.bundlesInSection, 72, 'bundles in a 12 mm squared section');

/** Thickness (micrometres) of the layers of a dicot leaf in transverse section. */
export const LAYERS = { upperEpi: 20, palisade: 70, spongy: 90, lowerEpi: 20 };
N.leafThick = LAYERS.upperEpi + LAYERS.palisade + LAYERS.spongy + LAYERS.lowerEpi;
N.mesophyll = LAYERS.palisade + LAYERS.spongy;
N.palisadePct = round((LAYERS.palisade / N.leafThick) * 100, 1);
N.mesoPct = round((N.mesophyll / N.leafThick) * 100, 1);
N.epiPct = round(((LAYERS.upperEpi + LAYERS.lowerEpi) / N.leafThick) * 100, 1);
eq(N.leafThick, 200, 'leaf thickness');
eq(N.mesophyll, 160, 'mesophyll thickness');
eq(N.palisadePct, 35, 'palisade share');
eq(N.mesoPct, 80, 'mesophyll share');
eq(N.epiPct, 20, 'epidermis share');

/** Patches of xylem and phloem in a root: arms of xylem alternate with equal patches of phloem. */
export const patches = (arms) => 2 * arms;
N.dicotPatches = patches(4);
N.monoPatches = patches(8);
eq(N.dicotPatches, 8, 'tetrarch root patches');
eq(N.monoPatches, 16, 'polyarch root patches');
export const armType = (arms) => ({ 2: 'diarch', 3: 'triarch', 4: 'tetrarch' })[arms] ?? (arms > 6 ? 'polyarch' : 'penta/hexarch');
eq(armType(4), 'tetrarch', 'arm type of a dicot root');
eq(armType(8), 'polyarch', 'arm type of a monocot root');

/** Vascular bundles of a dicot stem lie in a ring: bundle count and the angle between neighbours. */
export const RING = { bundles: 8 };
N.ringAngle = 360 / RING.bundles;
eq(N.ringAngle, 45, 'angle between neighbouring bundles');

/** Percentage of a cell sample (a count of 80 cells in a stem section field). */
export const SAMPLE = { total: 80, collenchyma: 20, parenchyma: 44, sclerenchyma: 16 };
export const pct = (part, whole) => round((part / whole) * 100, 1);
N.sampleCollenPct = pct(SAMPLE.collenchyma, SAMPLE.total);
eq(SAMPLE.collenchyma + SAMPLE.parenchyma + SAMPLE.sclerenchyma, SAMPLE.total, 'sample adds up');
eq(N.sampleCollenPct, 25, 'collenchyma share');
eq(pct(SAMPLE.parenchyma, SAMPLE.total), 55, 'parenchyma share');
eq(pct(SAMPLE.sclerenchyma, SAMPLE.total), 20, 'sclerenchyma share');

/** Letters on the lettered leaf diagram. */
export const LEAF_LETTERS = { palisade: 'A', guard: 'B', epi: 'C', spongy: 'D', xylem: 'E' };

// further numbers used by questions
N.cellUm = actualUm(36, 900);
eq(N.cellUm, 40, 'cell width at 900 times');
N.sto112 = density(28, 0.25);
eq(N.sto112, 112, 'stomatal density from 28 in 0.25');
export const BUNDLE2 = { counted: 24, field: 4, section: 15 };
N.bundle2Density = BUNDLE2.counted / BUNDLE2.field;
N.bundle2Section = N.bundle2Density * BUNDLE2.section;
eq(N.bundle2Density, 6, 'bundle density 2');
eq(N.bundle2Section, 90, 'bundles in a 15 mm squared section');
// a second leaf: grass leaf with 9 stomata per 0.2 mm squared on each surface; stomata on both surfaces of a 4 cm squared piece (area in mm squared)
N.grassPieceMm2 = 400;
N.grassBoth = N.grassDensity * 2 * N.grassPieceMm2;
eq(N.grassBoth, 36000, 'stomata on both surfaces of a 400 mm squared piece of grass leaf');
