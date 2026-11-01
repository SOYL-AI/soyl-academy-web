// Computed values for ICSE 10 Biology ch01 (cell numbers, chromosome numbers, DNA content, slide counts).
/** Cells formed from one cell after n successive mitotic divisions. */
export const cellsAfter = (n) => 2 ** n;
/** Chromosome number of each daughter cell: mitosis keeps 2n; meiosis halves it. */
export const afterMitosis = (twoN) => twoN;
export const afterMeiosis = (twoN) => twoN / 2;
/** Relative DNA content (C = amount in a gamete) through the cycle of a diploid cell. */
export const DNA = { G1: 2, S_end: 4, G2: 4, daughter: 2, gamete: 1 };
/** Chromatids visible at metaphase of mitosis in a cell of 2n chromosomes. */
export const chromatidsAtMetaphase = (twoN) => twoN * 2;
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Imagined onion root-tip count used in a case question and a worked example.
export const ROOT = { interphase: 270, prophase: 15, metaphase: 6, anaphase: 5, telophase: 4 };
ROOT.total = ROOT.interphase + ROOT.prophase + ROOT.metaphase + ROOT.anaphase + ROOT.telophase;
ROOT.dividing = ROOT.total - ROOT.interphase;
ROOT.pctDividing = pct(ROOT.dividing, ROOT.total);

if (cellsAfter(3) !== 8 || afterMeiosis(46) !== 23 || chromatidsAtMetaphase(46) !== 92 || ROOT.total !== 300 || ROOT.pctDividing !== 10) throw new Error('calc');
