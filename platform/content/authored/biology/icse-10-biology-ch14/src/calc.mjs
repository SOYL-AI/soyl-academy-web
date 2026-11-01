// Computed values for ICSE 10 Biology ch14 Population: rates per 1000, growth rates, densities, per capita income.
const r1 = (x) => Math.round(x * 10) / 10;
/** Events (births or deaths) per 1000 people in a year. */
export const perThousand = (events, population) => r1((events / population) * 1000);
/** Natural growth rate in per cent a year (migration ignored): (birth rate − death rate) / 10. */
export const growthRate = (br, dr) => r1((br - dr) / 10);
/** People per square kilometre. */
export const density = (population, areaKm2) => Math.round(population / areaKm2);
export const perCapita = (income, population) => Math.round(income / population);
export const pct = (part, whole) => r1((part / whole) * 100);

// Imagined town for worked examples and a case (one year).
export const TOWN = { pop: 50000, births: 1100, deaths: 400, cameIn: 300, left: 100 };
TOWN.br = perThousand(TOWN.births, TOWN.pop);
TOWN.dr = perThousand(TOWN.deaths, TOWN.pop);
TOWN.gr = growthRate(TOWN.br, TOWN.dr);
TOWN.natural = TOWN.births - TOWN.deaths;
TOWN.next = TOWN.pop + TOWN.births - TOWN.deaths + TOWN.cameIn - TOWN.left;

// Imagined districts and a village.
export const DIST = { X: { area: 2500, pop: 1200000 }, Y: { area: 4000, pop: 1000000 } };
DIST.X.d = density(DIST.X.pop, DIST.X.area);
DIST.Y.d = density(DIST.Y.pop, DIST.Y.area);
export const HAMLET = { area: 4, pop: 2600 };
HAMLET.d = density(HAMLET.pop, HAMLET.area);

/** Imagined village: total yearly income (rupees) shared by a growing population. */
export const VILLAGE = { income: 60000000, popBefore: 2000, popAfter: 2500 };
VILLAGE.pcBefore = perCapita(VILLAGE.income, VILLAGE.popBefore);
VILLAGE.pcAfter = perCapita(VILLAGE.income, VILLAGE.popAfter);
VILLAGE.fall = VILLAGE.pcBefore - VILLAGE.pcAfter;

/** Schematic stages of population change (rates per 1000; illustrative, not data for any country). */
export const STAGES = [
  { name: 'Stage 1', br: 40, dr: 38 },
  { name: 'Stage 2', br: 40, dr: 15 },
  { name: 'Stage 3', br: 25, dr: 10 },
  { name: 'Stage 4', br: 12, dr: 10 },
].map((s) => ({ ...s, gr: growthRate(s.br, s.dr) }));

/** World population milestones in billions (approximate UN figures). */
export const WORLD = [[1804, 1], [1927, 2], [1960, 3], [1974, 4], [1987, 5], [1999, 6], [2011, 7], [2022, 8]];
export const yearsBetween = (b1, b2) => WORLD.find((w) => w[1] === b2)[0] - WORLD.find((w) => w[1] === b1)[0];

/** Census of India populations in crore (rounded). */
export const INDIA = [[1951, 36.1], [1961, 43.9], [1971, 54.8], [1981, 68.3], [1991, 84.6], [2001, 102.9], [2011, 121.1]];
export const censusRise = (y1, y2) => r1(INDIA.find((c) => c[0] === y2)[1] - INDIA.find((c) => c[0] === y1)[1]);
export const censusPct = (y1, y2) => pct(censusRise(y1, y2), INDIA.find((c) => c[0] === y1)[1]);

if (TOWN.br !== 22 || TOWN.dr !== 8 || TOWN.gr !== 1.4 || TOWN.next !== 50900 || DIST.X.d !== 480 || DIST.Y.d !== 250 || HAMLET.d !== 650 || VILLAGE.pcBefore !== 30000 || VILLAGE.pcAfter !== 24000 || growthRate(25, 9) !== 1.6 || growthRate(20, 8) !== 1.2 || STAGES[1].gr !== 2.5 || yearsBetween(1, 2) !== 123 || yearsBetween(7, 8) !== 11 || censusRise(2001, 2011) !== 18.2 || censusPct(2001, 2011) !== 17.7) throw new Error('calc');
