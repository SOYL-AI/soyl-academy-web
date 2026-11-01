// Computed values for ICSE 10 Biology ch15 Human Evolution (cranial capacities, moth surveys, survival rates).
const r1 = (x) => Math.round(x * 10) / 10;
export const pct = (part, whole) => r1((part / whole) * 100);
export const ratio = (a, b) => r1(a / b);

/** Approximate average cranial capacities (cubic centimetres) as used in school textbooks; ranges are wide. */
export const ANCESTORS = [
  { key: 'aus', name: 'Australopithecus', cc: 500 },
  { key: 'hab', name: 'Homo habilis', cc: 700 },
  { key: 'ere', name: 'Homo erectus', cc: 1000 },
  { key: 'nea', name: 'Neanderthal man', cc: 1450 },
  { key: 'cro', name: 'Cro-Magnon man', cc: 1600 },
  { key: 'mod', name: 'Modern man (Homo sapiens sapiens)', cc: 1400 },
];
export const CC = Object.fromEntries(ANCESTORS.map((a) => [a.key, a.cc]));
export const ccRatio = ratio(CC.mod, CC.aus);
export const ccRise = CC.mod - CC.aus;

/** Imagined survey of peppered moths resting on tree trunks in two woods. */
export const SURVEY = { polluted: { dark: 180, light: 20 }, clean: { dark: 30, light: 170 } };
for (const w of Object.values(SURVEY)) {
  w.total = w.dark + w.light;
  w.pctDark = pct(w.dark, w.total);
}
/** Imagined release-and-recapture in the polluted wood. */
export const RECAP = { released: 100, darkBack: 40, lightBack: 10 };
RECAP.times = ratio(RECAP.darkBack, RECAP.lightBack);
RECAP.pctDark = pct(RECAP.darkBack, RECAP.released);
RECAP.pctLight = pct(RECAP.lightBack, RECAP.released);

/** Imagined beetle population that stays steady although each pair lays many eggs. */
export const BEETLE = { eggsPerPair: 100, survivorsPerPair: 2 };
BEETLE.pctSurvive = pct(BEETLE.survivorsPerPair, BEETLE.eggsPerPair);
BEETLE.die = BEETLE.eggsPerPair - BEETLE.survivorsPerPair;

if (ccRatio !== 2.8 || ccRise !== 900 || SURVEY.polluted.pctDark !== 90 || SURVEY.clean.pctDark !== 15 || RECAP.times !== 4 || RECAP.pctDark !== 40 || BEETLE.pctSurvive !== 2 || BEETLE.die !== 98) throw new Error('calc');
