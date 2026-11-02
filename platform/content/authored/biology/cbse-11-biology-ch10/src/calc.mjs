// ch10 Cell Cycle and Cell Division — every number used by decks, SVGs and questions is computed (and asserted) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);
const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};

/** Textbook values: human cells in culture take about 24 h per cycle with M phase about 1 h; yeast about 90 min. */
export const HUMAN = { cycleH: 24, mH: 1 };
export const YEAST_MIN = 90;
/** Illustrative phase lengths (hours) used only to draw the cycle and DNA graphs. */
export const PHASES = [['G1', 11], ['S', 8], ['G2', 4], ['M', 1]];
export const interphasePct = (cycle = HUMAN.cycleH, m = HUMAN.mH, dp = 1) => pct(cycle - m, cycle, dp);
/** Mitotic index (percent of cells in division). */
export const mitoticIndex = (dividing, total, dp = 1) => pct(dividing, total, dp);
/** Time in a phase from the share of cells in it (asynchronous population). */
export const phaseTime = (sharePct, cycle, dp = 2) => round((sharePct / 100) * cycle, dp);
/** Time in a phase from a cell count out of a sample. */
export const timeFromCount = (n, total, cycleH, dp = 2) => round((n / total) * cycleH, dp);
/** Cells from one cell after time t when each cycle takes T (same units). */
export const cellsAfter = (t, T) => 2 ** (t / T);
export const generations = (t, T) => t / T;

/** Chromosome and chromatid counts for a diploid cell with 2n = N (centromere count = chromosome count). */
export const bivalents = (N) => N / 2;
export const haploidCells = (meiocytes) => 4 * meiocytes;
export const meiocytesFor = (cells) => cells / 4;
/** Stage table: [chromosomes, chromatids] per cell (or per nucleus where stated). */
export const MITOSIS = (N) => ({
  G1: [N, N],
  G2: [N, 2 * N],
  prophase: [N, 2 * N],
  metaphase: [N, 2 * N],
  anaphase: [2 * N, 2 * N], // whole cell, after the centromeres split
  telophaseNucleus: [N, N], // each daughter nucleus
});
export const MEIOSIS = (N) => ({
  prophaseI: [N, 2 * N],
  metaphaseI: [N, 2 * N],
  anaphaseI: [N, 2 * N], // whole cell: homologues part, chromatids stay joined
  poleAnaphaseI: [N / 2, N], // each pole
  telophaseI: [N / 2, N], // each of the two cells
  metaphaseII: [N / 2, N], // each cell
  anaphaseII: [N, N], // each cell, centromeres split
  telophaseII: [N / 2, N / 2], // each of the four cells
});
/** DNA per nucleus in an imagined organism whose G1 nucleus holds 9.6 pg (2C). */
export const DNA_G1_PG = 9.6;
export const DNA = {
  G1: DNA_G1_PG,
  G2: DNA_G1_PG * 2,
  mitosisDaughter: DNA_G1_PG,
  afterMeiosisI: DNA_G1_PG, // haploid chromosome number, two chromatids each: still 2C of DNA
  afterMeiosisII: DNA_G1_PG / 2, // 1C
};
export const dnaFraction = (stage) => DNA[stage] / DNA_G1_PG;

/** Worked numbers used in slides and questions. */
export const N = {};
N.interphaseShare = interphasePct(); // 95.8
N.yeast9h = cellsAfter(9 * 60, YEAST_MIN); // 6 generations
N.yeast9hGen = generations(9 * 60, YEAST_MIN);
N.bean3d = cellsAfter(72, 12); // 6 cycles of 12 h
N.rootCycle = 20; // hours, imagined root-tip cells
N.rootSample = { total: 400, interphase: 352, prophase: 24, metaphase: 8, anaphase: 4, telophase: 12 };
N.rootDividing = N.rootSample.prophase + N.rootSample.metaphase + N.rootSample.anaphase + N.rootSample.telophase;
N.rootMI = mitoticIndex(N.rootDividing, N.rootSample.total);
N.rootMetaH = timeFromCount(N.rootSample.metaphase, N.rootSample.total, N.rootCycle);
N.rootMetaMin = round(N.rootMetaH * 60);
N.rootProH = timeFromCount(N.rootSample.prophase, N.rootSample.total, N.rootCycle);
N.rootInterH = timeFromCount(N.rootSample.interphase, N.rootSample.total, N.rootCycle);
N.rootMH = timeFromCount(N.rootDividing, N.rootSample.total, N.rootCycle);
N.fly = MITOSIS(8); // Drosophila 2n = 8
N.pea = MEIOSIS(14); // garden pea 2n = 14
N.peaMit = MITOSIS(14);
N.maize = MEIOSIS(20); // maize 2n = 20
N.human = MEIOSIS(46);
N.pmcs = 250; // pollen mother cells in an anther lobe (illustrative)
N.pollen = haploidCells(N.pmcs);
N.sperm = haploidCells(120);
N.pmcFor = meiocytesFor(2000);
N.dnaG2 = DNA.G2;
N.dnaSperm = DNA.afterMeiosisII;
N.dnaDyad = DNA.afterMeiosisI;
N.divisionsFor = (cells) => Math.log2(cells);
N.cells256 = Math.log2(256);

eq(PHASES.reduce((s, [, h]) => s + h, 0), 24, 'phase hours');
eq(N.interphaseShare, 95.8, 'interphase share');
eq(interphasePct(20, 1), 95, 'interphase share, 20 h cycle');
eq(cellsAfter(6 * 60, YEAST_MIN), 16, 'yeast cells in 6 h');
eq(N.yeast9hGen, 6, 'yeast generations in 9 h');
eq(N.yeast9h, 64, 'yeast cells in 9 h');
eq(N.bean3d, 64, 'cells after 72 h at 12 h per cycle');
eq(cellsAfter(5, 1), 32, 'five generations');
eq(N.rootSample.interphase + N.rootDividing, N.rootSample.total, 'sample adds up');
eq(N.rootDividing, 48, 'dividing cells');
eq(N.rootMI, 12, 'mitotic index');
eq(N.rootMetaH, 0.4, 'metaphase hours');
eq(N.rootMetaMin, 24, 'metaphase minutes');
eq(N.rootProH, 1.2, 'prophase hours');
eq(N.rootInterH, 17.6, 'interphase hours');
eq(N.rootMH, 2.4, 'M phase hours');
eq(N.rootInterH + N.rootMH, N.rootCycle, 'phases add to the cycle');
eq(N.fly.metaphase[1], 16, 'fruit fly chromatids at metaphase');
eq(N.fly.anaphase[0], 16, 'fruit fly chromosomes at anaphase');
eq(N.fly.telophaseNucleus[0], 8, 'fruit fly chromosomes per daughter nucleus');
eq(N.peaMit.anaphase[0], 28, 'pea chromosomes at mitotic anaphase');
eq(bivalents(14), 7, 'pea bivalents');
eq(N.pea.poleAnaphaseI[0], 7, 'pea chromosomes per pole at anaphase I');
eq(N.pea.telophaseI[1], 14, 'pea chromatids per cell after meiosis I');
eq(N.pea.anaphaseII[0], 14, 'pea chromosomes in a cell at anaphase II');
eq(N.pea.telophaseII[0], 7, 'pea chromosomes per gamete cell');
eq(N.maize.prophaseI[1], 40, 'maize chromatids at prophase I');
eq(bivalents(20), 10, 'maize bivalents');
eq(N.maize.metaphaseII[0], 10, 'maize chromosomes per cell at metaphase II');
eq(N.human.telophaseII[0], 23, 'human chromosomes per gamete');
eq(bivalents(46), 23, 'human bivalents');
eq(N.pollen, 1000, 'pollen grains');
eq(N.sperm, 480, 'sperm from 120 meiocytes');
eq(N.pmcFor, 500, 'meiocytes for 2000 cells');
eq(N.dnaG2, 19.2, 'G2 DNA');
eq(N.dnaDyad, 9.6, 'DNA after meiosis I');
eq(N.dnaSperm, 4.8, 'DNA after meiosis II');
eq(dnaFraction('afterMeiosisII'), 0.5, 'gamete DNA fraction');
eq(N.cells256, 8, 'divisions to make 256 cells');
eq(haploidCells(25), 100, 'haploid cells');
eq(meiocytesFor(200), 50, 'meiocytes');

// ---- extra worked numbers for the question bank (fresh set-ups)
N.tipB = { total: 600, interphase: 540, prophase: 30, metaphase: 10, anaphase: 5, telophase: 15, cycleH: 18 };
N.tipBDividing = N.tipB.prophase + N.tipB.metaphase + N.tipB.anaphase + N.tipB.telophase;
N.tipBMI = mitoticIndex(N.tipBDividing, N.tipB.total);
N.tipBMetaMin = round(timeFromCount(N.tipB.metaphase, N.tipB.total, N.tipB.cycleH) * 60);
N.tipBAnaMin = round(timeFromCount(N.tipB.anaphase, N.tipB.total, N.tipB.cycleH) * 60);
N.tipBProMin = round(timeFromCount(N.tipB.prophase, N.tipB.total, N.tipB.cycleH) * 60);
N.mi350 = mitoticIndex(28, 350);
N.sTime = timeFromCount(450, 1200, 16);
N.interph18 = interphasePct(18, 0.75);
N.yeast450 = cellsAfter(450, YEAST_MIN);
N.yeast450Gen = generations(450, YEAST_MIN);
N.divisions256 = N.divisionsFor(256);
N.divisions1024 = N.divisionsFor(1024);
N.dnaB = { g1: 7.2 };
N.dnaB.g2 = N.dnaB.g1 * 2;
N.dnaB.dyad = N.dnaB.g1;
N.dnaB.gamete = N.dnaB.g1 / 2;
N.maizeBiv = bivalents(20);
N.maizeChromatidsProI = N.maize.prophaseI[1];
N.humanPole = N.human.poleAnaphaseI;
N.humanAnaII = N.human.anaphaseII;
N.yeastTable = [0, 1, 2, 3, 4, 5].map((k) => [k * YEAST_MIN, cellsAfter(k * YEAST_MIN, YEAST_MIN)]);
eq(N.tipBDividing, 60, 'tip B dividing');
eq(N.tipB.interphase + N.tipBDividing, N.tipB.total, 'tip B adds up');
eq(N.tipBMI, 10, 'tip B mitotic index');
eq(N.tipBMetaMin, 18, 'tip B metaphase minutes');
eq(N.tipBAnaMin, 9, 'tip B anaphase minutes');
eq(N.tipBProMin, 54, 'tip B prophase minutes');
eq(N.mi350, 8, 'mitotic index 28 of 350');
eq(N.sTime, 6, 'S phase hours');
eq(N.interph18, 95.8, 'interphase share 18 h cycle');
eq(N.yeast450, 32, 'yeast cells after 450 min');
eq(N.yeast450Gen, 5, 'yeast generations in 450 min');
eq(N.divisions256, 8, 'divisions for 256 cells');
eq(N.divisions1024, 10, 'divisions for 1024 cells');
eq(N.dnaB.g2, 14.4, 'G2 DNA, species B');
eq(N.dnaB.dyad, 7.2, 'dyad DNA, species B');
eq(N.dnaB.gamete, 3.6, 'gamete DNA, species B');
eq(N.maizeBiv, 10, 'maize bivalents');
eq(N.humanPole[0], 23, 'human chromosomes per pole at anaphase I');
eq(N.humanPole[1], 46, 'human chromatids per pole at anaphase I');
eq(N.humanAnaII[0], 46, 'human chromosomes in a cell at anaphase II');
eq(N.yeastTable[5][1], 32, 'yeast table');
N.mi400 = mitoticIndex(36, 400);
eq(N.mi400, 9, 'mitotic index 36 of 400');
