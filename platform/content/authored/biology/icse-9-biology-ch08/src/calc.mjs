// Computed values for ICSE 9 Biology ch08 Economic Importance of Bacteria and Fungi. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;
export const doublings = (minutes, every) => {
  eq(minutes % every, 0, 'whole number of doublings');
  return minutes / every;
};

// Worked example (deck 1) and a structured question: a village vaccination drive.
export const VACC = { children: 600, vaccinated: 450 };
VACC.left = eq(VACC.children - VACC.vaccinated, 150, 'children not yet vaccinated');
VACC.pct = eq(pct(VACC.vaccinated, VACC.children), 75, 'percentage vaccinated');
VACC.pctLeft = eq(pct(VACC.left, VACC.children), 25, 'percentage not vaccinated');

// Worked example (deck 1) and a numerical item: nitrogen in air (about 78 percent by volume).
export const AIR = { litres: 500, percent: 78 };
AIR.nitrogen = eq((AIR.litres * AIR.percent) / 100, 390, 'litres of nitrogen in the air sample');
AIR.other = eq(AIR.litres - AIR.nitrogen, 110, 'litres of other gases');
export const AIR2 = { litres: 2000, percent: 78 };
AIR2.nitrogen = eq((AIR2.litres * AIR2.percent) / 100, 1560, 'litres of nitrogen in 2000 litres of air');

// Worked example (deck 2) and a structured question: cooked rice left in a warm kitchen; bacteria double every 30 minutes.
export const SPOIL = { start: 100, every: 30, minutes: 180 };
SPOIL.n = doublings(SPOIL.minutes, SPOIL.every);
SPOIL.final = eq(SPOIL.start * 2 ** SPOIL.n, 6400, 'bacteria after three hours');
SPOIL.series = [0, 30, 60, 90, 120, 150, 180].map((m) => SPOIL.start * 2 ** (m / SPOIL.every));
eq(SPOIL.series, [100, 200, 400, 800, 1600, 3200, 6400], 'bacterial counts every half hour');
SPOIL.at60 = eq(SPOIL.series[2], 400, 'count after one hour');
SPOIL.at120 = eq(SPOIL.series[4], 1600, 'count after two hours');
// Bank: a milk sample with 250 bacteria; they double every 20 minutes for one hour.
export const MILK = { start: 250, every: 20, minutes: 60 };
MILK.n = doublings(MILK.minutes, MILK.every);
MILK.final = eq(MILK.start * 2 ** MILK.n, 2000, 'bacteria in the milk after one hour');

// Worked example (deck 2): yeast cells in a sugar solution; each cell buds to double the number every 90 minutes.
export const YEAST = { start: 4, every: 90, minutes: 360 };
YEAST.n = doublings(YEAST.minutes, YEAST.every);
YEAST.final = eq(YEAST.start * 2 ** YEAST.n, 64, 'yeast cells after six hours');
// Bank: 5 yeast cells double 3 times.
export const YEAST2 = { start: 5, n: 3 };
YEAST2.final = eq(YEAST2.start * 2 ** YEAST2.n, 40, 'yeast cells after three doublings');

// Structured question: dough volume before and after rising.
export const DOUGH = { before: 400, after: 1000 };
DOUGH.gain = eq(DOUGH.after - DOUGH.before, 600, 'gain in dough volume (mL)');
DOUGH.pct = eq(pct(DOUGH.gain, DOUGH.before), 150, 'percentage increase in dough volume');
DOUGH.times = eq(DOUGH.after / DOUGH.before, 2.5, 'dough volume ratio');

// Glucose broken down in brewing: each glucose molecule gives 2 alcohol and 2 carbon dioxide molecules.
export const BREW = { glucose: 50, alcoholEach: 2, co2Each: 2 };
BREW.alcohol = eq(BREW.glucose * BREW.alcoholEach, 100, 'alcohol molecules');
BREW.co2 = eq(BREW.glucose * BREW.co2Each, 100, 'carbon dioxide molecules');

// Mushroom farm: 3 trays, 12 mushrooms in each tray at every flush, 2 flushes.
export const MUSH = { trays: 3, perTray: 12, flushes: 2 };
MUSH.perFlush = eq(MUSH.trays * MUSH.perTray, 36, 'mushrooms per flush');
MUSH.total = eq(MUSH.perFlush * MUSH.flushes, 72, 'mushrooms in two flushes');

// Tannery: 4 vats with 15 hides each; 20 percent of the hides need to be soaked again.
export const TAN = { vats: 4, perVat: 15, redo: 20 };
TAN.hides = eq(TAN.vats * TAN.perVat, 60, 'hides in the tannery');
TAN.again = eq((TAN.hides * TAN.redo) / 100, 12, 'hides soaked again');
TAN.done = eq(TAN.hides - TAN.again, 48, 'hides ready');

// Bank structured question: milk sample, bacteria double every 20 minutes; counts every 20 minutes for an hour and after two hours.
MILK.series = [0, 20, 40, 60].map((m) => MILK.start * 2 ** (m / MILK.every));
eq(MILK.series, [250, 500, 1000, 2000], 'bacteria in milk every 20 minutes');
MILK.at120 = eq(MILK.start * 2 ** doublings(120, MILK.every), 16000, 'bacteria in the milk after two hours');

// Bank structured question: a second batch of dough.
export const BREAD = { before: 500, after: 1100 };
BREAD.gain = eq(BREAD.after - BREAD.before, 600, 'gain in bread dough volume');
BREAD.pct = eq(pct(BREAD.gain, BREAD.before), 120, 'percentage increase in bread dough volume');
