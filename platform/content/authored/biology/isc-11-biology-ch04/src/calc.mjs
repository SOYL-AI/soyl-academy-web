// ISC 11 Biology ch04 Plant Kingdom — every number in a stem, answer, table or slide is computed here and asserted.
export function eq(value, expected, what) {
  if (value !== expected) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Meiosis of diploid spore mother cells: each gives four haploid spores. */
export const sporesFrom = (mothers) => mothers * 4;
/** Haploid number from the diploid number. */
export const haploid = (twoN) => twoN / 2;
/** Ploidy of a stage in a plant with gametophyte number n: returns the chromosome number in a cell of that stage. */
export function chromosomes(stage, n) {
  const hap = ['spore', 'gametophyte', 'gamete', 'protonema', 'prothallus', 'egg', 'antherozoid', 'pollen grain', 'megaspore'];
  const dip = ['zygote', 'sporophyte', 'spore mother cell', 'embryo', 'capsule'];
  if (hap.includes(stage)) return n;
  if (dip.includes(stage)) return 2 * n;
  throw new Error(`calc: unknown stage ${stage}`);
}

// Table data for the three classes of algae (ISC scope)
export const ALGAE = {
  Chlorophyceae: { colour: 'Green', pigments: ['chlorophyll a', 'chlorophyll b'], food: 'Starch', wall: 'Cellulose', flagella: '2–8, equal, apical', habitat: 'Mostly fresh water', examples: ['Chlamydomonas', 'Volvox', 'Spirogyra', 'Chara'] },
  Phaeophyceae: { colour: 'Brown', pigments: ['chlorophyll a', 'chlorophyll c', 'fucoxanthin'], food: 'Mannitol and laminarin', wall: 'Cellulose with an outer gel of algin', flagella: '2, unequal, lateral', habitat: 'Mostly marine', examples: ['Ectocarpus', 'Laminaria', 'Sargassum', 'Fucus'] },
  Rhodophyceae: { colour: 'Red', pigments: ['chlorophyll a', 'chlorophyll d', 'phycoerythrin'], food: 'Floridean starch', wall: 'Cellulose with pectin and polysulphate esters', flagella: 'None at any stage', habitat: 'Mostly marine, including deep water', examples: ['Polysiphonia', 'Porphyra', 'Gracilaria', 'Gelidium'] },
};
export const classOfPigment = (p) => Object.entries(ALGAE).find(([, v]) => v.pigments.includes(p) && p !== 'chlorophyll a')?.[0] ?? null;
export const classOfFood = (f) => Object.entries(ALGAE).find(([, v]) => v.food.toLowerCase().startsWith(f.toLowerCase()))?.[0] ?? null;

// Life-cycle features of the four groups
export const GROUPS = {
  bryophyte: { dominant: 'gametophyte', sporophyteIndependent: false, heterosporous: false, seeds: false },
  pteridophyte: { dominant: 'sporophyte', sporophyteIndependent: true, heterosporous: false, seeds: false },
  gymnosperm: { dominant: 'sporophyte', sporophyteIndependent: true, heterosporous: true, seeds: true },
};

// A fern sporangium: 16 spore mother cells -> 64 spores (a standard leptosporangiate example)
export const FERN = { mothersPerSporangium: 16, sporangiaPerSorus: 40, sorusPerFrond: 30 };
export const FERN_SPORES_PER_SPORANGIUM = eq(sporesFrom(FERN.mothersPerSporangium), 64, 'fern spores per sporangium');
export const FERN_SPORES_PER_SORUS = eq(FERN_SPORES_PER_SPORANGIUM * FERN.sporangiaPerSorus, 2560, 'spores per sorus');
export const FERN_SPORES_PER_FROND = eq(FERN_SPORES_PER_SORUS * FERN.sorusPerFrond, 76800, 'spores per frond');

// An imagined moss capsule
export const MOSS = { smcPerCapsule: 250, n: 12 };
export const MOSS_SPORES = eq(sporesFrom(MOSS.smcPerCapsule), 1000, 'spores from a moss capsule');
export const MOSS_SPOROPHYTE_CHR = eq(chromosomes('sporophyte', MOSS.n), 24, 'moss sporophyte chromosomes');
export const MOSS_SPORE_CHR = eq(chromosomes('spore', MOSS.n), 12, 'moss spore chromosomes');

// A fern with 2n = 48 (imagined value)
export const FERN_2N = 48;
export const FERN_N = eq(haploid(FERN_2N), 24, 'fern prothallus chromosomes');

// A Pinus cone: two ovules per ovuliferous scale
export const PINUS = { scales: 60, ovulesPerScale: 2, pollenMothers: 500, twoN: 24 };
export const PINUS_OVULES = eq(PINUS.scales * PINUS.ovulesPerScale, 120, 'ovules in a female cone');
export const PINUS_MEGASPORES = eq(sporesFrom(PINUS_OVULES), 480, 'megaspores formed');
export const PINUS_FUNCTIONAL = eq(PINUS_OVULES, 120, 'functional megaspores (one per ovule)');
export const PINUS_DEGENERATE = eq(PINUS_MEGASPORES - PINUS_FUNCTIONAL, 360, 'degenerating megaspores');
export const PINUS_POLLEN = eq(sporesFrom(PINUS.pollenMothers), 2000, 'pollen grains from the mother cells');
export const PINUS_N = eq(haploid(PINUS.twoN), 12, 'Pinus pollen grain chromosomes');

// Survey of an imagined seaweed collection
export const SHORE = { green: 18, brown: 27, red: 15 };
export const SHORE_TOTAL = eq(SHORE.green + SHORE.brown + SHORE.red, 60, 'shore algae total');
export const SHORE_BROWN_PCT = eq((SHORE.brown / SHORE_TOTAL) * 100, 45, 'brown percentage');
export const SHORE_FLAGELLATE = eq(SHORE.green + SHORE.brown, 45, 'algae with flagellate stages');

