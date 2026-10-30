// Rules for ch05, used to compute worked-example numbers, diagram contents and re-solves.

const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
/** Complementary DNA strand, read in the same left-to-right order (antiparallel). */
export const complement = (s) => Array.from(s).map((b) => COMP[b]).join('');
/** mRNA transcribed from a template strand written left to right (3'→5'): complement, with U for T. */
export const transcribe = (template) => complement(template).replace(/T/g, 'U');
/** mRNA has the coding-strand sequence with U for T. */
export const codingToMrna = (coding) => coding.replace(/T/g, 'U');

// Standard genetic code (NCBI table 1), bases in the order U C A G.
const AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const NAMES = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly', '*': 'Stop' };
const IDX = { U: 0, C: 1, A: 2, G: 3 };
export const codon = (c) => NAMES[AA[IDX[c[0]] * 16 + IDX[c[1]] * 4 + IDX[c[2]]]];
/** Translate an mRNA from its first AUG until a stop codon; returns amino-acid names. */
export function translate(mrna) {
  const start = mrna.indexOf('AUG');
  const out = [];
  for (let i = start; i + 3 <= mrna.length; i += 3) {
    const aa = codon(mrna.slice(i, i + 3));
    if (aa === 'Stop') break;
    out.push(aa);
  }
  return out;
}

/** Chargaff: from the percentage of one base, the other three (double-stranded DNA). */
export function chargaff(base, pct) {
  const pair = { A: 'T', T: 'A', G: 'C', C: 'G' }[base];
  const other = (100 - 2 * pct) / 2;
  const res = { [base]: pct, [pair]: pct };
  for (const b of 'ATGC') if (!(b in res)) res[b] = other;
  return res;
}

/** Length of DNA in metres from base pairs (0.34 nm per base pair). */
export const lengthM = (bp) => bp * 0.34e-9;
/** Nucleosomes needed, about 200 bp each. */
export const nucleosomes = (bp) => bp / 200;

/** Meselson–Stahl: after n generations in 14N medium (n ≥ 0), fractions of heavy, hybrid and light DNA. */
export function meselson(n) {
  if (n === 0) return { heavy: 1, hybrid: 0, light: 0 };
  const hybrid = 2 / 2 ** n;
  return { heavy: 0, hybrid, light: 1 - hybrid };
}

/** Number of codons possible with words of length k from 4 bases. */
export const codonCount = (k) => 4 ** k;
