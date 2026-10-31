// Rules for ISC 12 Biology ch09 (origin of life and evidences of evolution): radiocarbon decay and percentages, used for
// worked examples, the decay diagram and re-solves.
export const HALF_LIFE = 5730; // years, carbon-14
const r4 = (x) => Math.round(x * 10000) / 10000;
/** Fraction of the original carbon-14 left after t years. */
export const remaining = (t) => r4(0.5 ** (t / HALF_LIFE));
/** Age in years from the fraction of carbon-14 left (rounded to the nearest year). */
export const ageFromFraction = (f) => Math.round(HALF_LIFE * Math.log2(1 / f));
/** Age after a whole number of half-lives. */
export const halves = (n) => HALF_LIFE * n;
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
