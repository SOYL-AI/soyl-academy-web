// Probability helpers for CBSE 9 Mathematics ch15: reduced fractions (every probability is computed, never typed), a seeded generator for the
// simulated experiments (so the build is deterministic) and counters over sample spaces.
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** Reduced fraction [n, d] of n over d. */
export function frac(n, d) {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
/** Plain text 'n/d' of the reduced fraction (used as the value that a check compares). */
export const fs = (n, d) => {
  const [a, b] = frac(n, d);
  return b === 1 ? String(a) : `${a}/${b}`;
};
/** TeX of the reduced fraction; whole numbers are written as numbers. */
export const ft = (n, d) => {
  const [a, b] = frac(n, d);
  return b === 1 ? String(a) : `\\dfrac{${a}}{${b}}`;
};
/** Number of items of the list `all` that satisfy the predicate, and the reduced probability as [n, d]. */
export const pr = (all, pred) => frac(all.filter(pred).length, all.length);
/** The integers lo..hi. */
export const upto = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
export const isPrime = (n) => n > 1 && upto(2, Math.floor(Math.sqrt(n))).every((k) => n % k !== 0);
export const isSquare = (n) => Number.isInteger(Math.sqrt(n));

/** mulberry32: a small seeded generator; the same seed always gives the same experiment. */
export function mulberry32(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
