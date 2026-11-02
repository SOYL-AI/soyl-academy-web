// ch01 The Living World — every classification fact table and number used by decks, SVGs and questions, asserted here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const check = (cond, msg) => {
  if (!cond) throw new Error(`calc: ${msg}`);
};
export const eq = (value, expected, what) => {
  if (value !== expected) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
};

// ---------------------------------------------------------------- the taxonomic hierarchy (lowest to highest)
export const RANKS = ['Species', 'Genus', 'Family', 'Order', 'Class', 'Phylum', 'Kingdom'];
eq(RANKS.length, 7, 'number of obligatory categories');
export const rankIndex = (rank) => {
  const i = RANKS.indexOf(rank);
  check(i >= 0, `unknown rank ${rank}`);
  return i;
};
/** Categories strictly between two ranks. */
export const between = (a, b) => Math.abs(rankIndex(a) - rankIndex(b)) - 1;
eq(between('Genus', 'Class'), 2, 'ranks between genus and class');
eq(between('Species', 'Kingdom'), 5, 'ranks between species and kingdom');
/** Plants use Division where animals use Phylum. */
export const rankName = (rank, kingdom) => (rank === 'Phylum' && kingdom === 'Plantae' ? 'Division' : rank);

/** Lineages (textbook-style categories; Primata and Dicotyledonae are the spellings used in the textbook). */
export const LIN = {
  'Homo sapiens': { common: 'human', Family: 'Hominidae', Order: 'Primata', Class: 'Mammalia', Phylum: 'Chordata', Kingdom: 'Animalia' },
  'Panthera tigris': { common: 'tiger', Family: 'Felidae', Order: 'Carnivora', Class: 'Mammalia', Phylum: 'Chordata', Kingdom: 'Animalia' },
  'Panthera leo': { common: 'lion', Family: 'Felidae', Order: 'Carnivora', Class: 'Mammalia', Phylum: 'Chordata', Kingdom: 'Animalia' },
  'Felis catus': { common: 'domestic cat', Family: 'Felidae', Order: 'Carnivora', Class: 'Mammalia', Phylum: 'Chordata', Kingdom: 'Animalia' },
  'Canis familiaris': { common: 'dog', Family: 'Canidae', Order: 'Carnivora', Class: 'Mammalia', Phylum: 'Chordata', Kingdom: 'Animalia' },
  'Musca domestica': { common: 'housefly', Family: 'Muscidae', Order: 'Diptera', Class: 'Insecta', Phylum: 'Arthropoda', Kingdom: 'Animalia' },
  'Apis mellifera': { common: 'honeybee', Family: 'Apidae', Order: 'Hymenoptera', Class: 'Insecta', Phylum: 'Arthropoda', Kingdom: 'Animalia' },
  'Solanum tuberosum': { common: 'potato', Family: 'Solanaceae', Order: 'Solanales', Class: 'Dicotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
  'Solanum melongena': { common: 'brinjal', Family: 'Solanaceae', Order: 'Solanales', Class: 'Dicotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
  'Capsicum annuum': { common: 'chilli', Family: 'Solanaceae', Order: 'Solanales', Class: 'Dicotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
  'Mangifera indica': { common: 'mango', Family: 'Anacardiaceae', Order: 'Sapindales', Class: 'Dicotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
  'Oryza sativa': { common: 'rice', Family: 'Poaceae', Order: 'Poales', Class: 'Monocotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
  'Triticum aestivum': { common: 'wheat', Family: 'Poaceae', Order: 'Poales', Class: 'Monocotyledonae', Phylum: 'Angiospermae', Kingdom: 'Plantae' },
};
/** Value of a rank for a binomial. */
export const at = (name, rank) => (rank === 'Species' ? name : rank === 'Genus' ? name.split(' ')[0] : LIN[name][rank]);
/** Lowest rank at which two organisms are placed in the same taxon. */
export const sharedRank = (a, b) => RANKS.find((rk) => at(a, rk) === at(b, rk)) ?? 'none';
eq(sharedRank('Panthera tigris', 'Panthera leo'), 'Genus', 'tiger and lion');
eq(sharedRank('Panthera tigris', 'Felis catus'), 'Family', 'tiger and cat');
eq(sharedRank('Panthera tigris', 'Canis familiaris'), 'Order', 'tiger and dog');
eq(sharedRank('Panthera tigris', 'Homo sapiens'), 'Class', 'tiger and human');
eq(sharedRank('Panthera tigris', 'Musca domestica'), 'Kingdom', 'tiger and housefly');
eq(sharedRank('Apis mellifera', 'Musca domestica'), 'Class', 'bee and housefly');
eq(sharedRank('Solanum tuberosum', 'Solanum melongena'), 'Genus', 'potato and brinjal');
eq(sharedRank('Solanum tuberosum', 'Capsicum annuum'), 'Family', 'potato and chilli');
eq(sharedRank('Solanum tuberosum', 'Mangifera indica'), 'Class', 'potato and mango');
eq(sharedRank('Mangifera indica', 'Oryza sativa'), 'Phylum', 'mango and rice share the division');
eq(sharedRank('Oryza sativa', 'Triticum aestivum'), 'Family', 'rice and wheat');
eq(sharedRank('Homo sapiens', 'Oryza sativa'), 'none', 'human and rice share nothing');
/** Number of ranks (of the seven) at which two organisms are placed in the same taxon. */
export const sharedCount = (a, b) => RANKS.filter((rk) => at(a, rk) === at(b, rk)).length;
eq(sharedCount('Panthera tigris', 'Panthera leo'), 6, 'tiger and lion share six ranks (all but species)');
eq(sharedCount('Panthera tigris', 'Felis catus'), 5, 'tiger and cat share five ranks');
eq(sharedCount('Panthera tigris', 'Canis familiaris'), 4, 'tiger and dog share four ranks');
eq(sharedCount('Panthera tigris', 'Musca domestica'), 1, 'tiger and housefly share one rank');
eq(sharedCount('Solanum tuberosum', 'Capsicum annuum'), 5, 'potato and chilli share five ranks');

// ---------------------------------------------------------------- binomial names
/** Checks a written (printed) binomial against the rules: two words, genus capital, species small; returns problems. */
export const nameProblems = (s) => {
  const w = s.trim().split(/\s+/);
  const out = [];
  if (w.length < 2) out.push('one word only');
  if (w[0] && !/^[A-Z][a-z]+$/.test(w[0])) out.push('genus must start with a capital letter and the rest small');
  if (w[1] && !/^[a-z]+$/.test(w[1])) out.push('species epithet must be all small letters');
  return out;
};
eq(nameProblems('Mangifera indica').length, 0, 'valid name');
eq(nameProblems('mangifera indica').length, 1, 'genus without capital');
eq(nameProblems('Mangifera Indica').length, 1, 'species with capital');
eq(nameProblems('MANGIFERA INDICA').length, 2, 'all capitals');
eq(nameProblems('Mango').length, 1, 'one-word common name');

// ---------------------------------------------------------------- numbers for worked examples and questions
/** A campus biodiversity survey (illustrative figures). */
export const CAMPUS = { Plants: 180, Insects: 120, Birds: 50, Others: 50 };
CAMPUS.total = Object.values(CAMPUS).reduce((s, v) => s + v, 0);
export const pct = (part, whole) => round((part * 100) / whole, 1);
CAMPUS.insectPct = pct(CAMPUS.Insects, CAMPUS.total);
CAMPUS.plantPct = pct(CAMPUS.Plants, CAMPUS.total);
CAMPUS.birdPct = pct(CAMPUS.Birds, CAMPUS.total);
CAMPUS.othersPct = pct(CAMPUS.Others, CAMPUS.total);
eq(CAMPUS.total, 400, 'campus total');
eq(CAMPUS.insectPct, 30, 'insect share');
eq(CAMPUS.plantPct, 45, 'plant share');
eq(CAMPUS.birdPct, 12.5, 'bird share');
eq(CAMPUS.othersPct, 12.5, 'others share');

/** A garden list: species recorded in each genus (illustrative figures). */
export const GARDEN = [['Solanum', 5], ['Capsicum', 2], ['Ocimum', 3], ['Mangifera', 1], ['Cucurbita', 4]];
export const gardenGenera = GARDEN.length;
export const gardenSpecies = GARDEN.reduce((s, [, n]) => s + n, 0);
export const gardenMean = gardenSpecies / gardenGenera;
eq(gardenGenera, 5, 'garden genera');
eq(gardenSpecies, 15, 'garden species');
eq(gardenMean, 3, 'garden mean species per genus');

/** An imaginary insect group with a fixed branching at each rank. */
export const BRANCH = { speciesPerGenus: 6, generaPerFamily: 4, familiesPerOrder: 5 };
BRANCH.speciesPerFamily = BRANCH.speciesPerGenus * BRANCH.generaPerFamily;
BRANCH.speciesPerOrder = BRANCH.speciesPerFamily * BRANCH.familiesPerOrder;
BRANCH.generaPerOrder = BRANCH.generaPerFamily * BRANCH.familiesPerOrder;
eq(BRANCH.speciesPerFamily, 24, 'species per family');
eq(BRANCH.speciesPerOrder, 120, 'species per order');
eq(BRANCH.generaPerOrder, 20, 'genera per order');

/** A museum drawer of beetles (illustrative figures). */
export const DRAWER = { specimens: 240, genera: 8, species: 24 };
DRAWER.perGenus = DRAWER.specimens / DRAWER.genera;
DRAWER.speciesPerGenus = DRAWER.species / DRAWER.genera;
DRAWER.perSpecies = DRAWER.specimens / DRAWER.species;
eq(DRAWER.perGenus, 30, 'specimens per genus');
eq(DRAWER.speciesPerGenus, 3, 'species per genus in drawer');
eq(DRAWER.perSpecies, 10, 'specimens per species');

/** Textbook count of described species and domains. */
export const DESCRIBED = { low: 1.7, high: 1.8 }; // million
export const DOMAINS = ['Bacteria', 'Archaea', 'Eukarya'];
export const EUKARYA_KINGDOMS = ['Protista', 'Fungi', 'Plantae', 'Animalia'];
eq(DOMAINS.length, 3, 'domains');
eq(EUKARYA_KINGDOMS.length, 4, 'kingdoms of Eukarya');
/** If described species are 1.75 million and a school register holds 3500, the share is 0.2 percent. */
export const REGISTER = { described: 1750000, held: 3500 };
REGISTER.pct = pct(REGISTER.held, REGISTER.described);
eq(REGISTER.pct, 0.2, 'register share');

/** Question numbers. */
export const Q = {
  pond: { Fish: 36, Insects: 84, Plants: 60, Algae: 20 }, // species recorded in a pond survey
  hill: { genera: 12, speciesPerGenus: 5 },
  herb: { sheets: 180, genera: 9 },
};
Q.pond.total = Object.values(Q.pond).reduce((s, v) => s + v, 0);
Q.pond.insectPct = pct(Q.pond.Insects, Q.pond.total);
Q.hill.species = Q.hill.genera * Q.hill.speciesPerGenus;
Q.herb.perGenus = Q.herb.sheets / Q.herb.genera;
eq(Q.pond.total, 200, 'pond total');
eq(Q.pond.insectPct, 42, 'pond insect share');
eq(Q.hill.species, 60, 'hill species');
eq(Q.herb.perGenus, 20, 'herbarium sheets per genus');

/** Case numbers. */
export const CASE = {
  forest: { Plants: 150, Birds: 60, Mammals: 15, Reptiles: 45, Insects: 330 },
  names: { common: 6, scientific: 1 }, // one plant, six local names in six languages
  taxa: { genera: 14, families: 5 },
};
CASE.forest.total = Object.values(CASE.forest).reduce((s, v) => s + v, 0);
CASE.forest.animals = CASE.forest.total - CASE.forest.Plants;
CASE.forest.insectPct = pct(CASE.forest.Insects, CASE.forest.total);
CASE.forest.animalPct = pct(CASE.forest.animals, CASE.forest.total);
CASE.taxa.generaPerFamily = round(CASE.taxa.genera / CASE.taxa.families, 1);
eq(CASE.forest.total, 600, 'forest total');
eq(CASE.forest.animals, 450, 'forest animals');
eq(CASE.forest.insectPct, 55, 'forest insect share');
eq(CASE.forest.animalPct, 75, 'forest animal share');
eq(CASE.taxa.generaPerFamily, 2.8, 'mean genera per family');

/** Isolates from a hot spring and soil sample (illustrative figures). */
CASE.sample = { total: 40, bacteria: 14, archaea: 6 };
CASE.sample.eukarya = CASE.sample.total - CASE.sample.bacteria - CASE.sample.archaea;
CASE.sample.prokaryotes = CASE.sample.bacteria + CASE.sample.archaea;
CASE.sample.prokPct = pct(CASE.sample.prokaryotes, CASE.sample.total);
eq(CASE.sample.eukarya, 20, 'eukaryote isolates');
eq(CASE.sample.prokPct, 50, 'prokaryote share');
export const LOCAL_MORE = CASE.names.common - CASE.names.scientific;
eq(LOCAL_MORE, 5, 'local names beyond the scientific name');
