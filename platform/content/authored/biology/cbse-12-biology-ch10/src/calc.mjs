// Rules for ch10: percentages, yields and simple quantities used in examples, cases and re-solves.
export const pctChange = (before, after) => Math.round(((after - before) / before) * 1000) / 10;
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
/** Grams of protein in a volume of milk at a concentration in g per litre. */
export const grams = (gPerL, litres) => Math.round(gPerL * litres * 100) / 100;
/** Insulin: chain A has 21 and chain B has 30 amino acids; they are joined by disulphide bridges. */
export const INSULIN = { A: 21, B: 30 };
export const insulinTotal = () => INSULIN.A + INSULIN.B;
