// ISC 11 Biology ch12 Cell Cycle and Cell Division: every number used in a stem, answer, table, graph or slide is computed here
// and asserted with eq(). Original settings: a 20-hour culture with a flow-cytometry histogram, a mouse-like cell with 2n = 40 and
// 6.4 pg of DNA in G1, an onion root tip squash of 600 cells, a lily with 2n = 24 for meiosis, a four-hour doubling time and
// sperm counts. All DNA amounts are illustrative.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);

// ---------------------------------------------------------------- the cell cycle of a culture (hours)
export const CYCLE = { G1: 9, S: 7, G2: 3.5, M: 0.5 };
export const CYCLE_H = CYCLE.G1 + CYCLE.S + CYCLE.G2 + CYCLE.M;
eq(CYCLE_H, 20, 'cycle length');
export const INTERPHASE_H = CYCLE.G1 + CYCLE.S + CYCLE.G2;
eq(INTERPHASE_H, 19.5, 'interphase length');
export const SHARE = Object.fromEntries(Object.entries(CYCLE).map(([k, v]) => [k, pct(v, CYCLE_H, 1)]));
eq(SHARE, { G1: 45, S: 35, G2: 17.5, M: 2.5 }, 'share of the cycle');
eq(pct(INTERPHASE_H, CYCLE_H, 1), 97.5, 'interphase share');
/** Flow cytometry of 2000 cells in an asynchronous culture: cells per phase are proportional to the time spent in it. */
export const N_FLOW = 2000;
export const FLOW = { g1: Math.round((N_FLOW * CYCLE.G1) / CYCLE_H), s: Math.round((N_FLOW * CYCLE.S) / CYCLE_H), g2m: Math.round((N_FLOW * (CYCLE.G2 + CYCLE.M)) / CYCLE_H) };
eq(FLOW, { g1: 900, s: 700, g2m: 400 }, 'cells per phase in 2000');
/** Hours spent in a phase deduced from the cell count and the cycle length. */
export const hoursFromCount = (count, n = N_FLOW, cycle = CYCLE_H) => round((count / n) * cycle, 2);
eq(hoursFromCount(FLOW.g1), 9, 'G1 hours from the histogram');
eq(hoursFromCount(FLOW.s), 7, 'S hours from the histogram');
eq(hoursFromCount(FLOW.g2m), 4, 'G2 plus M hours from the histogram');
// histogram bins for the diagram: DNA content in C units
export const BINS = [[2, 900], [2.4, 175], [2.8, 175], [3.2, 175], [3.6, 175], [4, 400]];
eq(BINS.reduce((s, b) => s + b[1], 0), N_FLOW, 'histogram total');
eq(BINS.slice(1, 5).reduce((s, b) => s + b[1], 0), FLOW.s, 'S-phase bins');

// ---------------------------------------------------------------- DNA, chromosomes and chromatids through the cycle (mouse-like cell)
export const MOUSE = { n2: 40, c: 6.4 }; // 2n chromosomes; DNA (pg) in a G1 nucleus (2C)
export const dna = (stage) => ({ G1: MOUSE.c, S: 'rising', G2: MOUSE.c * 2, prophase: MOUSE.c * 2, metaphase: MOUSE.c * 2, anaphase: MOUSE.c * 2, telophase: MOUSE.c, daughter: MOUSE.c })[stage];
eq([dna('G1'), dna('G2'), dna('telophase')], [6.4, 12.8, 6.4], 'DNA per nucleus');
export const MITOSIS = {
  G1: { chromosomes: 40, chromatids: 40 },
  G2: { chromosomes: 40, chromatids: 80 },
  prophase: { chromosomes: 40, chromatids: 80 },
  metaphase: { chromosomes: 40, chromatids: 80 },
  anaphase: { chromosomes: 80, chromatids: 80 }, // whole cell: each chromatid is now a chromosome
  telophase: { chromosomes: 40, chromatids: 40 }, // per daughter nucleus
};
eq(MITOSIS.anaphase.chromosomes, MOUSE.n2 * 2, 'chromosomes in the whole cell at anaphase');
eq(MITOSIS.metaphase.chromatids, MOUSE.n2 * 2, 'chromatids at metaphase');
export const ONION = { n2: 16 };
eq(ONION.n2 * 2, 32, 'chromatids in an onion cell at metaphase');
eq(ONION.n2 / 2, 8, 'haploid number of onion');

// ---------------------------------------------------------------- growth of a culture
export const DOUBLING_H = 4;
export const cellsAfter = (hours, start = 1, d = DOUBLING_H) => start * 2 ** (hours / d);
eq(cellsAfter(24), 64, 'cells after 24 h from one cell');
eq(cellsAfter(24, 5), 320, 'cells after 24 h from five cells');
eq(cellsAfter(72), 262144, 'cells after 72 h');
export const divisionsFor = (cells) => Math.log2(cells);
eq(divisionsFor(64), 6, 'divisions to make 64 cells');

// ---------------------------------------------------------------- mitotic index of an onion root tip squash
export const ROOT = { total: 600, interphase: 528, prophase: 45, metaphase: 9, anaphase: 6, telophase: 12, cycleH: 18 };
export const DIVIDING = ROOT.prophase + ROOT.metaphase + ROOT.anaphase + ROOT.telophase;
eq(DIVIDING, 72, 'dividing cells');
eq(ROOT.interphase + DIVIDING, ROOT.total, 'cells counted');
export const MI = pct(DIVIDING, ROOT.total, 1);
eq(MI, 12, 'mitotic index');
export const M_MIN = round((DIVIDING / ROOT.total) * ROOT.cycleH * 60, 1);
eq(M_MIN, 129.6, 'minutes spent in mitosis');
export const stageMin = (k) => round((ROOT[k] / DIVIDING) * M_MIN, 1);
eq(['prophase', 'metaphase', 'anaphase', 'telophase'].map(stageMin), [81, 16.2, 10.8, 21.6], 'minutes in each stage');
export const longest = ['prophase', 'metaphase', 'anaphase', 'telophase'].reduce((a, b) => (ROOT[a] >= ROOT[b] ? a : b));
eq(longest, 'prophase', 'longest stage of mitosis');
eq(pct(ROOT.prophase, DIVIDING, 1), 62.5, 'share of dividing cells in prophase');

// ---------------------------------------------------------------- meiosis
export const LILY = { n2: 24 };
export const bivalents = (n2) => n2 / 2;
eq(bivalents(LILY.n2), 12, 'bivalents in a lily meiocyte');
export const combos = (n2) => 2 ** bivalents(n2);
eq(combos(LILY.n2), 4096, 'chromosome combinations in lily gametes');
eq(combos(MOUSE.n2), 1048576, 'combinations in a mouse');
eq(combos(LILY.n2) ** 2, 16777216, 'zygote combinations in a lily');
eq(combos(46), 8388608, 'human gametes without crossing over');
export const MEIOSIS = [
  { stage: 'G1 / before S', chromosomes: 40, chromatids: 40, dna: 6.4, cells: 1 },
  { stage: 'Prophase I to metaphase I', chromosomes: 40, chromatids: 80, dna: 12.8, cells: 1 },
  { stage: 'End of meiosis I (each cell)', chromosomes: 20, chromatids: 40, dna: 6.4, cells: 2 },
  { stage: 'Anaphase II (whole cell)', chromosomes: 40, chromatids: 40, dna: 6.4, cells: 2 },
  { stage: 'End of meiosis II (each cell)', chromosomes: 20, chromatids: 20, dna: 3.2, cells: 4 },
];
eq(MEIOSIS[4].dna, MOUSE.c / 2, 'DNA in a gamete is half of G1');
eq(MEIOSIS[2].dna, MOUSE.c, 'DNA in a secondary meiocyte equals G1');
eq(MEIOSIS[2].chromosomes, MOUSE.n2 / 2, 'chromosome number after meiosis I');
/** Sperm from primary spermatocytes: each gives four. Eggs from primary oocytes: each gives one. */
export const spermatocytesFor = (sperm) => sperm / 4;
eq(spermatocytesFor(600), 150, 'spermatocytes for 600 sperm');
export const oocytesFor = (eggs) => eggs;
eq(oocytesFor(600), 600, 'oocytes for 600 eggs');
export const polarBodies = (oocytes) => oocytes * 3;
eq(polarBodies(12), 36, 'polar bodies from 12 oocytes');
eq(spermatocytesFor(1000) * 2, 500, 'secondary spermatocytes for 1000 sperm');
/** Recombinant gametes from one bivalent with genes AB / ab and a single crossover in a share f of meioses: f/2 of gametes. */
export const recombinants = (f, n) => round((f / 2) * n, 0);
eq(recombinants(1, 400), 200, 'all meioses with a crossover');
eq(recombinants(0.4, 500), 100, 'recombinant gametes when 40 percent of meioses have a crossover');

// ---------------------------------------------------------------- values for the question bank
export const GARLIC = { total: 500, interphase: 430, prophase: 40, metaphase: 10, anaphase: 5, telophase: 15, cycleH: 16 };
export const G_DIV = GARLIC.prophase + GARLIC.metaphase + GARLIC.anaphase + GARLIC.telophase;
eq(G_DIV, 70, 'garlic dividing cells');
eq(GARLIC.interphase + G_DIV, GARLIC.total, 'garlic cells counted');
export const G_MI = pct(G_DIV, GARLIC.total, 1);
eq(G_MI, 14, 'garlic mitotic index');
export const G_M_MIN = round((G_DIV / GARLIC.total) * GARLIC.cycleH * 60, 1);
eq(G_M_MIN, 134.4, 'garlic minutes in mitosis');
export const gStage = (k) => round((GARLIC[k] / G_DIV) * G_M_MIN, 1);
eq(['prophase', 'metaphase', 'anaphase', 'telophase'].map(gStage), [76.8, 19.2, 9.6, 28.8], 'garlic stage minutes');
eq(hoursFromCount(500, 2000, 24), 6, 'S-phase hours for 500 of 2000 cells in a 24-hour cycle');
eq(pct(40, 250, 0), 16, 'mitotic index of 40 in 250');
eq(spermatocytesFor(800), 200, 'spermatocytes for 800 sperm');
eq(LILY.n2 * 2, 48, 'chromatids at metaphase in a lily cell');
eq(LILY.n2 / 2, 12, 'chromosomes in a lily gamete');
eq(MEIOSIS[4].chromosomes, 20, 'chromosomes in a mouse gamete');
