// Rules for ch06 Evolution: Hardy–Weinberg, percentages and selection curves, used for examples, diagrams and re-solves.
const r4 = (x) => Math.round(x * 10000) / 10000;

/** From the frequency of the recessive phenotype (q²), all Hardy–Weinberg frequencies. */
export function hwFromRecessive(q2) {
  const q = Math.sqrt(q2);
  const p = 1 - q;
  return { p: r4(p), q: r4(q), AA: r4(p * p), Aa: r4(2 * p * q), aa: r4(q2) };
}
/** From allele frequency p, the genotype frequencies. */
export function hwFromP(p) {
  const q = 1 - p;
  return { p: r4(p), q: r4(q), AA: r4(p * p), Aa: r4(2 * p * q), aa: r4(q * q) };
}
/** Allele frequency of A from genotype counts. */
export function alleleFreq(nAA, nAa, naa) {
  const total = 2 * (nAA + nAa + naa);
  return r4((2 * nAA + nAa) / total);
}
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;

/** Normal curve sample points for a selection diagram. */
export function curve(mean, sd, x0, x1, step = 2) {
  const pts = [];
  for (let x = x0; x <= x1; x += step) pts.push([x, Math.exp(-((x - mean) ** 2) / (2 * sd * sd))]);
  return pts;
}
