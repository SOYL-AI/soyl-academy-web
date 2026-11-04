// ISC 11 Biology ch01 The Living World: every classification fact, count, similarity score and chromosome figure used in a stem,
// answer, table or slide is held here and asserted with eq(); nothing computed is typed by hand elsewhere.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;

// ---------------------------------------------------------------- taxonomic hierarchy
export const RANKS = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];
export const PLANT_RANKS = ['Kingdom', 'Division', 'Class', 'Order', 'Family', 'Genus', 'Species'];
export const ORG = {
  man: { common: 'Man', plant: false, taxa: ['Animalia', 'Chordata', 'Mammalia', 'Primata', 'Hominidae', 'Homo', 'sapiens'] },
  housefly: { common: 'Housefly', plant: false, taxa: ['Animalia', 'Arthropoda', 'Insecta', 'Diptera', 'Muscidae', 'Musca', 'domestica'] },
  mosquito: { common: 'Mosquito', plant: false, taxa: ['Animalia', 'Arthropoda', 'Insecta', 'Diptera', 'Culicidae', 'Culex', 'pipiens'] },
  dog: { common: 'Dog', plant: false, taxa: ['Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'familiaris'] },
  wolf: { common: 'Wolf', plant: false, taxa: ['Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'lupus'] },
  mango: { common: 'Mango', plant: true, taxa: ['Plantae', 'Angiospermae', 'Dicotyledonae', 'Sapindales', 'Anacardiaceae', 'Mangifera', 'indica'] },
  wheat: { common: 'Wheat', plant: true, taxa: ['Plantae', 'Angiospermae', 'Monocotyledonae', 'Poales', 'Poaceae', 'Triticum', 'aestivum'] },
  maize: { common: 'Maize', plant: true, taxa: ['Plantae', 'Angiospermae', 'Monocotyledonae', 'Poales', 'Poaceae', 'Zea', 'mays'] },
  rice: { common: 'Rice', plant: true, taxa: ['Plantae', 'Angiospermae', 'Monocotyledonae', 'Poales', 'Poaceae', 'Oryza', 'sativa'] },
};
export const rankNames = (k) => (ORG[k].plant ? PLANT_RANKS : RANKS);
export const binomial = (k) => `${ORG[k].taxa[5]} ${ORG[k].taxa[6]}`;
/** Number of categories (counted from the kingdom downwards) in which two organisms are placed in the same taxon. */
export function sharedCount(a, b) {
  let n = 0;
  while (n < 7 && ORG[a].taxa[n] === ORG[b].taxa[n]) n++;
  return n;
}
/** Name of the lowest category the two share, or null when they share none. */
export const lowestShared = (a, b) => {
  const n = sharedCount(a, b);
  return n ? rankNames(a)[n - 1] : null;
};
/** First category (from the top) at which the two organisms are placed in different taxa. */
export const firstSplit = (a, b) => rankNames(a)[sharedCount(a, b)];

eq(sharedCount('man', 'housefly'), 1, 'man and housefly share only the kingdom');
eq(lowestShared('man', 'housefly'), 'Kingdom', 'lowest shared, man and housefly');
eq(firstSplit('man', 'housefly'), 'Phylum', 'man and housefly part at phylum');
eq(sharedCount('man', 'dog'), 3, 'man and dog share kingdom, phylum, class');
eq(lowestShared('man', 'dog'), 'Class', 'man and dog share the class');
eq(sharedCount('man', 'mango'), 0, 'man and mango share nothing');
eq(sharedCount('mango', 'wheat'), 2, 'mango and wheat share kingdom and division');
eq(lowestShared('mango', 'wheat'), 'Division', 'mango and wheat share the division');
eq(sharedCount('wheat', 'maize'), 5, 'wheat and maize share down to the family');
eq(lowestShared('wheat', 'maize'), 'Family', 'wheat and maize share the family');
eq(sharedCount('dog', 'wolf'), 6, 'dog and wolf share the genus');
eq(lowestShared('dog', 'wolf'), 'Genus', 'dog and wolf share the genus');
eq(firstSplit('dog', 'wolf'), 'Species', 'dog and wolf part at the species');
eq(lowestShared('housefly', 'mosquito'), 'Order', 'housefly and mosquito share the order');
eq(firstSplit('housefly', 'mosquito'), 'Family', 'housefly and mosquito part at the family');
eq(sharedCount('housefly', 'mosquito'), 4, 'housefly and mosquito share four categories');

// ---------------------------------------------------------------- herbarium sheet (genus and family counts)
export const SHEETS = [
  { name: 'Ficus benghalensis', family: 'Moraceae' },
  { name: 'Ficus religiosa', family: 'Moraceae' },
  { name: 'Mangifera indica', family: 'Anacardiaceae' },
  { name: 'Oryza sativa', family: 'Poaceae' },
  { name: 'Zea mays', family: 'Poaceae' },
  { name: 'Triticum aestivum', family: 'Poaceae' },
];
export const sheetGenera = new Set(SHEETS.map((s) => s.name.split(' ')[0])).size;
export const sheetFamilies = new Set(SHEETS.map((s) => s.family)).size;
export const sheetSpecies = new Set(SHEETS.map((s) => s.name)).size;
eq([sheetSpecies, sheetGenera, sheetFamilies], [6, 5, 3], 'herbarium sheet: species, genera, families');

/** A made-up reference collection: families x genera per family x species per genus. */
export const collection = (families, generaEach, speciesEach) => ({ genera: families * generaEach, species: families * generaEach * speciesEach });
eq(collection(3, 4, 7), { genera: 12, species: 84 }, 'collection of 3 families, 4 genera each, 7 species each');

// ---------------------------------------------------------------- numerical taxonomy (equal weight, present = 1, absent = 0)
export const CHARS = [
  'Woody trunk',
  'One cotyledon in the seed',
  'Parallel venation',
  'Compound leaves',
  'Fibrous roots',
  'Hollow internodes',
  'Fleshy fruit',
  'Grain fused with the fruit wall',
  'Male flowers in a terminal tassel',
  'Sheathing leaf base',
];
export const MAT = {
  mango: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  neem: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  wheat: [0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  maize: [0, 1, 1, 0, 1, 0, 0, 1, 1, 1],
};
export const NAMES4 = { mango: 'Mango', neem: 'Neem', wheat: 'Wheat', maize: 'Maize' };
/** Simple matching coefficient: matches / number of characters (every character weighs the same). */
export const matches = (a, b) => MAT[a].filter((v, i) => v === MAT[b][i]).length;
export const sim = (a, b) => matches(a, b) / CHARS.length;
const keys4 = Object.keys(MAT);
export const PAIRS = keys4.flatMap((a, i) => keys4.slice(i + 1).map((b) => [a, b, matches(a, b), sim(a, b)]));
eq(sim('mango', 'neem'), 0.9, 'mango and neem similarity');
eq(sim('wheat', 'maize'), 0.8, 'wheat and maize similarity');
eq(round(sim('mango', 'wheat'), 2), 0.2, 'mango and wheat similarity');
eq(round(sim('mango', 'maize'), 2), 0.2, 'mango and maize similarity');
eq(round(sim('neem', 'wheat'), 2), 0.1, 'neem and wheat similarity');
eq(round(sim('neem', 'maize'), 2), 0.1, 'neem and maize similarity');
eq(matches('mango', 'neem'), 9, 'mango and neem agree in nine characters');
eq(matches('mango', 'wheat'), 2, 'mango and wheat agree in two characters');
/** Average similarity between the two clusters (mango, neem) and (wheat, maize). */
export const between = round((sim('mango', 'wheat') + sim('mango', 'maize') + sim('neem', 'wheat') + sim('neem', 'maize')) / 4, 3);
eq(between, 0.15, 'average similarity between the two clusters');
/** A single-character artificial key: which of the four have compound leaves. */
export const compound = keys4.filter((k) => MAT[k][3] === 1);
eq(compound, ['neem'], 'only neem has compound leaves');
export const fleshy = keys4.filter((k) => MAT[k][6] === 1);
eq(fleshy, ['mango', 'neem'], 'fleshy fruit: mango and neem');

// ---------------------------------------------------------------- cytotaxonomy (chromosome numbers)
export const CHROM = { man: 46, housefly: 12, mango: 40, maize: 20, wheat: 42, pea: 14 };
/** Level of ploidy from the somatic number and the basic (monoploid) number x. */
export const ploidy = (twoN, x) => twoN / x;
eq(ploidy(CHROM.wheat, 7), 6, 'bread wheat is hexaploid on x = 7');
eq(CHROM.wheat / 2, 21, 'gamete of bread wheat');
eq(ploidy(CHROM.maize, 10), 2, 'maize is diploid on x = 10');
eq(CHROM.man / 2, 23, 'human gamete');
eq(CHROM.mango - CHROM.maize, 20, 'mango has 20 more chromosomes than maize');

// ---------------------------------------------------------------- naming
export const YEARS = { systemaNaturae: 1735, speciesPlantarum: 1753 };
eq(YEARS.speciesPlantarum - YEARS.systemaNaturae, 18, 'years between Systema Naturae and Species Plantarum');
/** Correct a written name for a printed page: genus capital, epithet lower case; returned as [genus, epithet]. */
export const fixName = (s) => {
  const [g, e] = s.trim().split(/\s+/);
  return [g[0].toUpperCase() + g.slice(1).toLowerCase(), e.toLowerCase()];
};
eq(fixName('Homo Sapiens'), ['Homo', 'sapiens'], 'fixing Homo Sapiens');
eq(fixName('zea MAYS'), ['Zea', 'mays'], 'fixing zea MAYS');
eq(fixName('azadirachta Indica'), ['Azadirachta', 'indica'], 'fixing azadirachta Indica');
