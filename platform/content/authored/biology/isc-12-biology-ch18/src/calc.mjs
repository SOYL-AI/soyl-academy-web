// ISC 12 Biology ch18 Biodiversity and its Conservation — arithmetic (copied from cbse-12-biology-ch13, same author).
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Species–area relation S = C A^Z. */
export const speciesFor = (C, A, Z) => C * A ** Z;
/** Z from two (area, species) points: slope of log S against log A. */
export const zFrom = ([A1, S1], [A2, S2]) => (Math.log10(S2) - Math.log10(S1)) / (Math.log10(A2) - Math.log10(A1));
/** Factor by which species number rises when area is multiplied by k: k^Z. */
export const areaFactor = (k, Z) => k ** Z;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);
/** Bird species at different latitudes quoted in the chapter. */
export const BIRDS = [
  { place: 'Colombia', lat: 'near the equator', n: 1400 },
  { place: 'India', lat: 'tropical', n: 1200 },
  { place: 'New York', lat: '41° N', n: 105 },
  { place: 'Greenland', lat: '71° N', n: 56 },
];
/** India's share of world land area and of global species diversity (percent). */
export const INDIA = { land: 2.4, species: 8.1 };
