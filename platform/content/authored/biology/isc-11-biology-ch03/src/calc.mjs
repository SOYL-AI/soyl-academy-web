// ISC 11 Biology ch03 Protista, Fungi, Lichens and Viruses: counts, percentages, dates and the fungal class key are computed here
// and asserted with eq(); nothing computed is typed by hand elsewhere.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (a, b) => round((a / b) * 100, 1);

// ---------------------------------------------------------------- protozoan groups
export const PROTOZOA = [
  { g: 'Rhizopods (amoeboid)', move: 'Pseudopodia (false feet)', eg: 'Amoeba, Entamoeba' },
  { g: 'Flagellates', move: 'Flagella', eg: 'Trypanosoma, Giardia' },
  { g: 'Ciliates', move: 'Cilia', eg: 'Paramecium, Vorticella' },
  { g: 'Sporozoans', move: 'No locomotory organ', eg: 'Plasmodium' },
];
// A made-up pond sample of free-living protozoans
export const POND = { flagellates: 80, ciliates: 50, rhizopods: 40, total: 200 };
POND.others = POND.total - POND.flagellates - POND.ciliates - POND.rhizopods;
eq(POND.others, 30, 'other organisms in the pond sample');
eq(pct(POND.flagellates, POND.total), 40, 'flagellates are 40 percent');
eq(pct(POND.ciliates, POND.total), 25, 'ciliates are 25 percent');
eq(POND.flagellates + POND.ciliates, 130, 'flagellates plus ciliates');

// ---------------------------------------------------------------- fungal spores and stages
export const ASCI = { count: 120, perAscus: 8 };
export const ascospores = ASCI.count * ASCI.perAscus;
eq(ascospores, 960, '120 asci with 8 spores each');
export const BASIDIUM = 4;
export const basidiospores = (n) => n * BASIDIUM;
eq(basidiospores(75), 300, '75 basidia');
/** Chromosomes: each haploid nucleus has n; after plasmogamy the cell has two nuclei; karyogamy fuses them. */
export const STAGE = (n) => ({ plasmogamy: { nuclei: 2, chromosomesEach: n, total: 2 * n }, dikaryophase: { nuclei: 2, total: 2 * n }, karyogamy: { nuclei: 1, chromosomes: 2 * n } });
eq(STAGE(4).dikaryophase.total, 8, 'dikaryotic cell with n = 4 holds 8 chromosomes in 2 nuclei');
eq(STAGE(4).karyogamy, { nuclei: 1, chromosomes: 8 }, 'zygote nucleus after karyogamy');
eq(STAGE(7).dikaryophase.total, 14, 'n = 7');
/** Yeast budding: cells after t minutes with generation time g. */
export const growth = (n0, g, t) => {
  if (t % g) throw new Error('not a whole number of generations');
  return n0 * 2 ** (t / g);
};
eq(growth(5, 90, 360), 80, '5 yeast cells, 90 minutes, 6 hours');
eq(growth(12, 90, 270), 96, '12 yeast cells, 90 minutes, 4.5 hours');

export const CLASSES = [
  { c: 'Zygomycetes', hyphae: 'Aseptate, coenocytic', sexual: 'Zygospore', asexual: 'Sporangiospores', eg: 'Mucor, Rhizopus' },
  { c: 'Ascomycetes', hyphae: 'Septate', sexual: 'Ascospores in asci', asexual: 'Conidia', eg: 'Penicillium, Aspergillus, Neurospora, yeast' },
  { c: 'Basidiomycetes', hyphae: 'Septate', sexual: 'Basidiospores on a basidium', asexual: 'Usually absent', eg: 'Agaricus, Ustilago, Puccinia' },
  { c: 'Deuteromycetes', hyphae: 'Septate', sexual: 'Not known', asexual: 'Conidia', eg: 'Alternaria, Colletotrichum, Trichoderma' },
];
/** Class of a fungus from its hyphae and its sexual spore. */
export const classify = (hyphae, sexual) => CLASSES.find((x) => x.hyphae.startsWith(hyphae) && x.sexual.startsWith(sexual))?.c ?? null;
eq(classify('Aseptate', 'Zygospore'), 'Zygomycetes', 'key: aseptate with zygospore');
eq(classify('Septate', 'Ascospores'), 'Ascomycetes', 'key: septate with ascospores');
eq(classify('Septate', 'Basidiospores'), 'Basidiomycetes', 'key: basidiospores');
eq(classify('Septate', 'Not known'), 'Deuteromycetes', 'key: sexual stage unknown');

// ---------------------------------------------------------------- history of viruses (years)
export const YR = { ivanowsky: 1892, beijerinck: 1898, stanley: 1935, diener: 1971 };
eq(YR.beijerinck - YR.ivanowsky, 6, 'Ivanowsky to Beijerinck');
eq(YR.stanley - YR.beijerinck, 37, 'Beijerinck to Stanley');
eq(YR.diener - YR.stanley, 36, 'Stanley to Diener');
eq(YR.diener - YR.ivanowsky, 79, 'Ivanowsky to Diener');
// Sizes in nanometres
export const SIZE = { tmvLength: 300, tmvWidth: 18, bacteriumUm: 2 };
export const nm = (um) => um * 1000;
eq(nm(SIZE.bacteriumUm) / SIZE.tmvLength, 6.666666666666667, 'a 2 um bacterium against a 300 nm TMV rod');
eq(round(SIZE.tmvLength / SIZE.tmvWidth, 1), 16.7, 'TMV length to width');
