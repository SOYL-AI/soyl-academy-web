// Rules for ISC 12 Biology ch15 (biotechnology and its applications). Percentages, protein yields and insulin chains are
// copied from cbse-12-biology-ch10/src/calc.mjs (same author); micropropagation multiplication is new for ISC.
export const pctChange = (before, after) => Math.round(((after - before) / before) * 1000) / 10;
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
/** Grams of protein in a volume of milk at a concentration in g per litre. */
export const grams = (gPerL, litres) => Math.round(gPerL * litres * 100) / 100;
/** Insulin: chain A has 21 and chain B has 30 amino acids; they are joined by disulphide bridges. */
export const INSULIN = { A: 21, B: 30 };
export const insulinTotal = () => INSULIN.A + INSULIN.B;
/** Plantlets after k subcultures, each shoot giving `rate` new shoots. */
export const plantlets = (n0, rate, k) => n0 * rate ** k;
