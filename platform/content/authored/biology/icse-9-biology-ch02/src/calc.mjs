// Computed values for ICSE 9 Biology ch02 Tissues. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (value !== expected) throw new Error(`calc: ${what}: got ${value}, expected ${expected}`);
  return value;
};
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Celery stalk in red ink: the dye climbs 15 cm in 30 minutes along the xylem.
export const DYE = { cm: 15, min: 30 };
DYE.cmPerHour = eq((DYE.cm / DYE.min) * 60, 30, 'dye speed');
DYE.after2h = eq(DYE.cmPerHour * 2, 60, 'dye in two hours');

// A heart beating 72 times a minute: cardiac muscle contracts every beat without resting for long.
export const HEART = { perMin: 72 };
HEART.perHour = eq(HEART.perMin * 60, 4320, 'beats per hour');
HEART.perDay = eq(HEART.perHour * 24, 103680, 'beats per day');

// A bean shoot tip is marked and grows 2 cm each day (apical growth).
export const SHOOT = { cmPerDay: 2, days: 14 };
SHOOT.total = eq(SHOOT.cmPerDay * SHOOT.days, 28, 'shoot growth');

// Slide count: 50 cells of a muscle-and-gut slide (imagined): 18 striped, 32 not striped.
export const SLIDE = { cells: 50, striped: 18 };
SLIDE.unstriped = eq(SLIDE.cells - SLIDE.striped, 32, 'unstriped');
SLIDE.pctStriped = eq(pct(SLIDE.striped, SLIDE.cells), 36, 'percentage striped');

// A stem section: 40 vascular bundles each with 1 phloem strand carrying 6 sieve tubes (imagined).
export const BUNDLE = { n: 40, sievePer: 6 };
BUNDLE.sieve = eq(BUNDLE.n * BUNDLE.sievePer, 240, 'sieve tubes');

// Girth: a lateral meristem adds a ring of new wood each year; a trunk shows 9 rings, each about 0.4 cm wide.
export const RINGS = { n: 9, cm: 0.4 };
RINGS.radiusCm = eq(Math.round(RINGS.n * RINGS.cm * 10) / 10, 3.6, 'ring radius');

// A neuron impulse travels 100 metres per second along a long axon of 1.2 metres: time in milliseconds.
export const IMPULSE = { mPerS: 100, axonM: 1.2 };
IMPULSE.ms = eq(Math.round((IMPULSE.axonM / IMPULSE.mPerS) * 1000), 12, 'impulse time in ms');

// Items for the question bank (different numbers from the worked examples).
export const DYE2 = { cm: 24, min: 40 };
DYE2.cmPerHour = eq((DYE2.cm / DYE2.min) * 60, 36, 'second dye speed');
export const HEART2 = { perMin: 60 };
HEART2.perHour = eq(HEART2.perMin * 60, 3600, 'beats an hour at 60');
