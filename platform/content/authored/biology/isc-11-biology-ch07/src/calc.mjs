// ISC 11 Biology ch07 Morphology of the Flower and Inflorescence — identification tables and every count used in the chapter, asserted with eq.
export function eq(value, expected, what) {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Flowers named in the chapter: plant -> facts the chapter uses (null where the chapter does not rely on the fact). */
export const FLOWER = {
  gulmohar: { symmetry: 'zygomorphic', aestivation: 'imbricate', stamens: 'free', ovary: 'perigynous', placentation: 'marginal' },
  datura: { symmetry: 'actinomorphic', corolla: 'gamopetalous', stamens: 'epipetalous', ovary: 'hypogynous', placentation: 'axile' },
  calotropis: { symmetry: 'actinomorphic', aestivation: 'valvate' },
  cotton: { symmetry: 'actinomorphic', aestivation: 'twisted', stamens: 'monadelphous', anther: 'monothecous', placentation: 'axile' },
  hibiscus: { symmetry: 'actinomorphic', stamens: 'monadelphous', anther: 'monothecous' },
  bean: { symmetry: 'zygomorphic', aestivation: 'vexillary', stamens: 'diadelphous', placentation: 'marginal' },
  pea: { symmetry: 'zygomorphic', aestivation: 'vexillary', stamens: 'diadelphous', placentation: 'marginal' },
  sunflower: { stamens: 'syngenesious', anther: 'dithecous', ovary: 'epigynous', placentation: 'basal' },
  marigold: { stamens: 'syngenesious', placentation: 'basal' },
  bombax: { stamens: 'polyadelphous' },
  pumpkin: { stamens: 'synandrous', ovary: 'epigynous', placentation: 'parietal' },
  cucumber: { ovary: 'epigynous', placentation: 'parietal' },
  rose: { ovary: 'perigynous' },
  plum: { ovary: 'perigynous' },
  mustard: { ovary: 'hypogynous', placentation: 'parietal' },
  argemone: { ovary: 'hypogynous', placentation: 'parietal' },
  dianthus: { ovary: 'hypogynous', placentation: 'free central' },
  primrose: { ovary: 'hypogynous', placentation: 'free central' },
  lily: { symmetry: 'actinomorphic', stamens: 'epiphyllous', placentation: 'axile', ovary: 'hypogynous' },
  canna: { symmetry: 'asymmetric' },
  tomato: { placentation: 'axile', ovary: 'hypogynous' },
  lemon: { placentation: 'axile' },
};
export const fact = (plant, key) => FLOWER[plant][key];
eq(fact('gulmohar', 'symmetry'), 'zygomorphic', 'gulmohar symmetry');
eq(fact('datura', 'symmetry'), 'actinomorphic', 'datura symmetry');
eq(fact('calotropis', 'aestivation'), 'valvate', 'Calotropis aestivation');
eq(fact('cotton', 'aestivation'), 'twisted', 'cotton aestivation');
eq(fact('gulmohar', 'aestivation'), 'imbricate', 'gulmohar aestivation');
eq(fact('bean', 'aestivation'), 'vexillary', 'bean aestivation');
eq(fact('bean', 'stamens'), 'diadelphous', 'bean stamens');
eq(fact('hibiscus', 'stamens'), 'monadelphous', 'hibiscus stamens');
eq(fact('sunflower', 'stamens'), 'syngenesious', 'sunflower stamens');
eq(fact('datura', 'stamens'), 'epipetalous', 'datura stamens');
eq(fact('lily', 'stamens'), 'epiphyllous', 'lily stamens');
eq(fact('rose', 'ovary'), 'perigynous', 'rose ovary');
eq(fact('sunflower', 'ovary'), 'epigynous', 'sunflower ovary');
eq(fact('mustard', 'ovary'), 'hypogynous', 'mustard ovary');
eq(fact('argemone', 'placentation'), 'parietal', 'Argemone placentation');
eq(fact('dianthus', 'placentation'), 'free central', 'Dianthus placentation');
eq(fact('sunflower', 'placentation'), 'basal', 'sunflower placentation');
eq(fact('bean', 'placentation'), 'marginal', 'bean placentation');
eq(fact('tomato', 'placentation'), 'axile', 'tomato placentation');

/** Pollen sacs: a dithecous anther has two lobes (thecae) of two pollen sacs each; a monothecous anther has one lobe of two sacs. */
export const SACS = { dithecous: 4, monothecous: 2 };
export const SUNFLOWER_FLORET = { stamens: 5 };
export const SUNFLOWER_SACS = eq(SUNFLOWER_FLORET.stamens * SACS.dithecous, 20, 'pollen sacs in one sunflower floret');
export const HIBISCUS = { stamens: 60 };
export const HIBISCUS_SACS = eq(HIBISCUS.stamens * SACS.monothecous, 120, 'pollen sacs in a hibiscus flower with sixty stamens');
export const HIBISCUS_LOBES = eq(HIBISCUS.stamens * 1, 60, 'anther lobes in that hibiscus flower');
/** The same number of stamens as dithecous anthers would give twice as many sacs. */
export const SACS_IF_DITHECOUS = eq(HIBISCUS.stamens * SACS.dithecous, 240, 'sacs if the sixty anthers were dithecous');

/** A pea flower: ten stamens, nine joined in one bundle and one free. */
export const PEA = { stamens: 10, joined: 9, free: 1 };
export const PEA_BUNDLES = eq(PEA.joined > 0 ? 2 : 1, 2, 'filament groups in a pea flower');
eq(PEA.joined + PEA.free, PEA.stamens, 'pea stamens add up');
export const PEA_FLOWERS = 8;
export const PEA_JOINED = eq(PEA.joined * PEA_FLOWERS, 72, 'joined filaments in eight pea flowers');
export const PEA_FREE = eq(PEA.free * PEA_FLOWERS, 8, 'free filaments in eight pea flowers');

/** A trimerous lily: perianth of two whorls of three, two whorls of three stamens, three carpels. */
export const LILY = { perianth: 3 + 3, stamens: 3 + 3, carpels: 3 };
export const LILY_MEMBERS = eq(LILY.perianth + LILY.stamens + LILY.carpels, 15, 'floral members in the lily');
export const LILY_TEPALS = eq(LILY.perianth, 6, 'tepals of the lily');
/** A pentamerous flower with five sepals, five petals, five stamens and two carpels. */
export const PENTA = { sepals: 5, petals: 5, stamens: 5, carpels: 2 };
export const PENTA_MEMBERS = eq(PENTA.sepals + PENTA.petals + PENTA.stamens + PENTA.carpels, 17, 'members of a pentamerous flower');
export const PENTA_ESSENTIAL = eq(PENTA.stamens + PENTA.carpels, 7, 'essential-whorl members of that flower');

/** A tetramerous ovary: the cotton-like ovary of the worked example, 4 locules with 9 ovules each. */
export const OVARY = { locules: 4, perLocule: 9 };
export const OVULES = eq(OVARY.locules * OVARY.perLocule, 36, 'ovules in the four-chambered ovary');
export const SEEDS = eq((OVULES / 4) * 3, 27, 'seeds if three of every four ovules become seeds');
/** Carpels: a syncarpous ovary has as many locules as carpels (axile placentation). */
export const CARPELS_SYN = eq(OVARY.locules, 4, 'carpels fused in the four-chambered ovary');
/** An apocarpous flower with a free carpels, each with one ovule. */
export const APO = { carpels: 12, ovulesEach: 1 };
export const APO_OVULES = eq(APO.carpels * APO.ovulesEach, 12, 'ovules in an apocarpous flower of twelve carpels');
/** A sunflower-type ovary has one locule and one basal ovule: ovules in a head of 500 florets. */
export const HEAD = { florets: 500 };
export const HEAD_OVULES = eq(HEAD.florets * 1, 500, 'ovules in a head of five hundred florets, one each');

/** Survey of 40 flowers on a garden path. */
export const SURVEY = { actino: 26, zygo: 10, asym: 4 };
export const SURVEY_TOTAL = eq(SURVEY.actino + SURVEY.zygo + SURVEY.asym, 40, 'flowers surveyed');
export const SURVEY_ACTINO_PCT = eq((SURVEY.actino / SURVEY_TOTAL) * 100, 65, 'actinomorphic share (percent)');
export const SURVEY_CUT_SINGLE = eq(SURVEY.zygo, 10, 'flowers cut into equal halves by one plane only');

/** Racemose inflorescence of a radish: 24 flowers, one opens every two days from the base upward. */
export const RACEME = { flowers: 24, everyDays: 2 };
export const RACEME_GAP = eq((RACEME.flowers - 1) * RACEME.everyDays, 46, 'days between the opening of the lowest and the topmost flower');
export const opened = (day) => Math.floor(day / RACEME.everyDays) + 1;
export const RACEME_DAY20 = eq(opened(20), 11, 'flowers open on day twenty');
export const RACEME_CLOSED20 = eq(RACEME.flowers - RACEME_DAY20, 13, 'buds still closed on day twenty');
/** A cymose branch of a jasmine: the first flower opens on day 0, then one new flower every three days downward; nine flowers. */
export const CYME = { flowers: 9, everyDays: 3 };
export const CYME_LAST = eq((CYME.flowers - 1) * CYME.everyDays, 24, 'day on which the youngest flower of the cyme opens');
export const CYME_OPEN_DAY12 = eq(Math.floor(12 / CYME.everyDays) + 1, 5, 'flowers open in the cyme on day twelve');
/** Terms by order of opening. */
export const ORDER = { racemose: 'oldest at the base, youngest at the tip', cymose: 'oldest at the top, youngest below' };

// Extra numbers for the question bank
export const HIB2 = { stamens: 48 };
export const HIB2_SACS = eq(HIB2.stamens * SACS.monothecous, 96, 'pollen sacs in a hibiscus flower with forty-eight stamens');
export const FLORETS12 = 12;
export const FLORETS12_SACS = eq(FLORETS12 * SUNFLOWER_SACS, 240, 'pollen sacs in twelve sunflower florets');
export const OV2 = { locules: 5, perLocule: 12 };
export const OV2_OVULES = eq(OV2.locules * OV2.perLocule, 60, 'ovules in the five-chambered ovary');
export const HEAD2 = { florets: 600, seedsPerSix: 5 };
export const HEAD2_SEEDS = eq((HEAD2.florets / 6) * HEAD2.seedsPerSix, 500, 'seeds from a head of six hundred florets when five of every six set seed');
export const R2 = { flowers: 30, everyDays: 3 };
export const R2_GAP = eq((R2.flowers - 1) * R2.everyDays, 87, 'days between the first and the last flower of the thirty-flower raceme');
export const R2_DAY30 = eq(Math.floor(30 / R2.everyDays) + 1, 11, 'flowers open on day thirty');
export const R2_CLOSED30 = eq(R2.flowers - R2_DAY30, 19, 'buds closed on day thirty');

/** Aestivation from overlaps: each petal is [neighbours it overlaps, neighbours that overlap it]. */
export const aestivation = (petals) => {
  if (petals.every(([o, u]) => o === 0 && u === 0)) return 'valvate';
  if (petals.every(([o, u]) => o === 1 && u === 1)) return 'twisted';
  if (petals.some(([o, u]) => o === 2 && u === 0) && petals.some(([o, u]) => o === 0 && u === 2)) return 'imbricate';
  return 'other';
};
export const BUD1 = [[2, 0], [1, 1], [1, 1], [1, 1], [0, 2]];
export const BUD1_SUM = eq([BUD1.reduce((s, p) => s + p[0], 0), BUD1.reduce((s, p) => s + p[1], 0)], [5, 5], 'overlaps given and received balance');
eq(aestivation(BUD1), 'imbricate', 'bud 1 aestivation');
export const BUD2 = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
eq(aestivation(BUD2), 'twisted', 'bud 2 aestivation');
export const BUD3 = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
eq(aestivation(BUD3), 'valvate', 'bud 3 aestivation');
export const R3 = { flowers: 18, everyDays: 2 };
export const R3_GAP = eq((R3.flowers - 1) * R3.everyDays, 34, 'days between the first and last flower of the eighteen-flower raceme');
