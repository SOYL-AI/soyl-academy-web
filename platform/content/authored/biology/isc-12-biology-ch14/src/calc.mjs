// Rules for ISC 12 Biology ch14 (copied from cbse-12-biology-ch09, same author): complementary strands, palindromes,
// restriction cutting, PCR doubling, gel migration and site frequency.
const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
export const complement = (s) => Array.from(s).map((b) => COMP[b]).join('');
export const reverseComplement = (s) => complement(s).split('').reverse().join('');
/** A recognition sequence is palindromic if it equals its reverse complement (same 5'→3' on both strands). */
export const isPalindrome = (s) => s === reverseComplement(s);

/** Cut a top-strand sequence at every occurrence of `site`, `cut` bases after the site start (EcoRI: GAATTC, cut 1). */
export function digest(seq, site, cut) {
  const pieces = [];
  let start = 0;
  let i = seq.indexOf(site);
  while (i !== -1) {
    pieces.push(seq.slice(start, i + cut));
    start = i + cut;
    i = seq.indexOf(site, i + 1);
  }
  pieces.push(seq.slice(start));
  return pieces;
}
/** Expected number of cuts of a random DNA for a recognition site of n bases: length / 4^n. */
export const expectedSites = (length, n) => length / 4 ** n;
/** DNA copies after n PCR cycles starting from c0 molecules. */
export const pcr = (cycles, c0 = 1) => c0 * 2 ** cycles;
/** Gel migration (arbitrary units): smaller fragments travel further, roughly linear in −log10(size). */
export const migration = (bp) => Math.round((5 - Math.log10(bp)) * 60);
