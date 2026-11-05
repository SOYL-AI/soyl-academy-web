// Computed values for ICSE 9 Biology ch07 Diversity in the Animal Kingdom. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Worked example 2 (deck 1) and a structured question: a pond-and-shore survey tally by group.
export const SURVEY = { Arthropoda: 16, Mollusca: 10, Echinodermata: 6, Annelida: 4, Coelenterata: 4 };
SURVEY.total = eq(Object.values(SURVEY).reduce((a, b) => a + b, 0), 40, 'survey total');
SURVEY.pctArthropoda = eq(pct(SURVEY.Arthropoda, SURVEY.total), 40, 'percentage arthropods');
SURVEY.pctMollusca = eq(pct(SURVEY.Mollusca, SURVEY.total), 25, 'percentage molluscs');
SURVEY.worms = eq(SURVEY.Annelida, 4, 'segmented worms');
SURVEY.softBodied = eq(SURVEY.Mollusca + SURVEY.Annelida, 14, 'molluscs and annelids together');

// Worked example 1 (deck 1) and a numerical item: legs in a mixed jar of insects and spiders.
export const LEGS = { insects: 7, spiders: 3, perInsect: 6, perSpider: 8 };
LEGS.insectLegs = eq(LEGS.insects * LEGS.perInsect, 42, 'insect legs');
LEGS.spiderLegs = eq(LEGS.spiders * LEGS.perSpider, 24, 'spider legs');
LEGS.total = eq(LEGS.insectLegs + LEGS.spiderLegs, 66, 'legs in the jar');

// Heart chambers by vertebrate class (reptiles: three, with the crocodile an exception that the notes mention).
export const HEART = { Pisces: 2, Amphibia: 3, Reptilia: 3, Aves: 4, Mammalia: 4 };
HEART.fourChambered = eq(Object.entries(HEART).filter(([k, v]) => k !== 'fourChambered' && v === 4).map(([k]) => k), ['Aves', 'Mammalia'], 'four-chambered classes');
HEART.classes = eq(Object.keys(HEART).filter((k) => k !== 'fourChambered').length, 5, 'five classes');
HEART.warm = eq(Object.entries(HEART).filter(([k, v]) => k !== 'fourChambered' && v === 4).length, 2, 'warm-blooded classes');
HEART.pctWarm = eq(pct(HEART.warm, HEART.classes), 40, 'percentage warm-blooded classes');

// A museum shelf of 30 vertebrate specimens, by class (a structured question).
export const SHELF = { Pisces: 9, Amphibia: 6, Reptilia: 7, Aves: 5, Mammalia: 3 };
SHELF.total = eq(Object.values(SHELF).reduce((a, b) => a + b, 0), 30, 'shelf total');
SHELF.coldBlooded = eq(SHELF.Pisces + SHELF.Amphibia + SHELF.Reptilia, 22, 'cold-blooded specimens');
SHELF.warmBlooded = eq(SHELF.Aves + SHELF.Mammalia, 8, 'warm-blooded specimens');
eq(SHELF.coldBlooded + SHELF.warmBlooded, SHELF.total, 'cold plus warm');
SHELF.pctCold = eq(pct(SHELF.coldBlooded, SHELF.total, 1), 73.3, 'percentage cold-blooded (1 dp)');

// Body-region count: an insect has 3 regions and 3 pairs of legs; a spider has 2 regions and 4 pairs.
export const REGIONS = { insectPairs: 3, spiderPairs: 4 };
REGIONS.insectLegs = eq(REGIONS.insectPairs * 2, 6, 'insect legs from pairs');
REGIONS.spiderLegs = eq(REGIONS.spiderPairs * 2, 8, 'spider legs from pairs');
eq(REGIONS.insectLegs, LEGS.perInsect, 'consistent insect legs');
eq(REGIONS.spiderLegs, LEGS.perSpider, 'consistent spider legs');

// Phyla grouped by body cavity (used in a table and a question).
export const CAVITY = { acoelomate: ['Platyhelminthes'], pseudocoelomate: ['Nemathelminthes'], coelomate: ['Annelida', 'Arthropoda', 'Mollusca', 'Echinodermata'] };
eq(CAVITY.coelomate.length, 4, 'coelomate phyla in this course');
// Eight non-chordate phyla and five chordate classes are listed in the syllabus.
export const COUNTS = { nonChordatePhyla: eq(['Porifera', 'Coelenterata', 'Platyhelminthes', 'Nemathelminthes', 'Annelida', 'Arthropoda', 'Mollusca', 'Echinodermata'].length, 8, 'non-chordate phyla'), chordateClasses: 5 };

// Bank: a collecting tray with 9 beetles (6 legs) and 4 scorpions (8 legs); and 5 flies with 2 spiders.
export const TRAY = { beetles: 9, scorpions: 4 };
TRAY.beetleLegs = eq(TRAY.beetles * 6, 54, 'beetle legs');
TRAY.scorpionLegs = eq(TRAY.scorpions * 8, 32, 'scorpion legs');
TRAY.total = eq(TRAY.beetleLegs + TRAY.scorpionLegs, 86, 'legs in the tray');
export const WINDOW = { flies: 5, spiders: 2 };
WINDOW.total = eq(WINDOW.flies * 6 + WINDOW.spiders * 8, 46, 'legs on the window sill');
