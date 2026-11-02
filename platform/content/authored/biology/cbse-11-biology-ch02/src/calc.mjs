// ch02 Biological Classification — the five-kingdom table, a decision key, growth, spore and survey numbers, all asserted here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (value !== expected) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
};
export const pct = (part, whole) => round((part * 100) / whole, 1);

// ---------------------------------------------------------------- the five kingdoms (Whittaker, 1969)
/** cell: prokaryotic or eukaryotic; wall: material or none; nuc: nuclear membrane; body: organisation; nutrition: modes. */
export const KINGDOMS = [
  { name: 'Monera', cell: 'prokaryotic', wall: 'non-cellulosic (polysaccharide with amino acids)', nuc: false, body: 'cellular', auto: true, hetero: true, nutrition: 'chemosynthetic and photosynthetic autotrophs; saprophytic and parasitic heterotrophs' },
  { name: 'Protista', cell: 'eukaryotic', wall: 'present in some', nuc: true, body: 'cellular', auto: true, hetero: true, nutrition: 'photosynthetic autotrophs; heterotrophs (predators, parasites)' },
  { name: 'Fungi', cell: 'eukaryotic', wall: 'chitin and polysaccharides', nuc: true, body: 'multicellular, loose tissue', auto: false, hetero: true, nutrition: 'heterotrophic: saprophytes, parasites, symbionts' },
  { name: 'Plantae', cell: 'eukaryotic', wall: 'cellulose', nuc: true, body: 'tissues and organs', auto: true, hetero: false, nutrition: 'photosynthetic autotrophs (few heterotrophs)' },
  { name: 'Animalia', cell: 'eukaryotic', wall: 'absent', nuc: true, body: 'tissues, organs and organ systems', auto: false, hetero: true, nutrition: 'holozoic (ingest and digest food)' },
];
export const K = Object.fromEntries(KINGDOMS.map((k) => [k.name, k]));
export const countWhere = (f) => KINGDOMS.filter(f).length;
export const namesWhere = (f) => KINGDOMS.filter(f).map((k) => k.name);
eq(KINGDOMS.length, 5, 'five kingdoms');
eq(countWhere((k) => k.cell === 'eukaryotic'), 4, 'eukaryotic kingdoms');
eq(countWhere((k) => !k.nuc), 1, 'kingdom without nuclear membrane');
eq(countWhere((k) => k.auto), 3, 'kingdoms with autotrophs');
eq(countWhere((k) => k.hetero), 4, 'kingdoms with heterotrophs');
eq(countWhere((k) => k.auto && k.hetero), 2, 'kingdoms with both modes');
eq(countWhere((k) => k.wall === 'absent'), 1, 'kingdom with no cell wall');
eq(countWhere((k) => k.body.startsWith('tissues')), 2, 'kingdoms with tissues');

/** Decision key from the features of an organism (prokaryote? unicellular? wall? autotroph?). */
export const classify = ({ prokaryote, unicellular, wall, autotroph }) => {
  if (prokaryote) return 'Monera';
  if (unicellular) return 'Protista';
  if (wall === 'chitin') return 'Fungi';
  if (wall === 'cellulose' && autotroph) return 'Plantae';
  if (wall === 'none' && !autotroph) return 'Animalia';
  return 'unplaced';
};
eq(classify({ prokaryote: true, unicellular: true, wall: 'peptidoglycan', autotroph: false }), 'Monera', 'key: bacterium');
eq(classify({ prokaryote: false, unicellular: true, wall: 'none', autotroph: true }), 'Protista', 'key: Euglena');
eq(classify({ prokaryote: false, unicellular: false, wall: 'chitin', autotroph: false }), 'Fungi', 'key: mushroom');
eq(classify({ prokaryote: false, unicellular: false, wall: 'cellulose', autotroph: true }), 'Plantae', 'key: mango');
eq(classify({ prokaryote: false, unicellular: false, wall: 'none', autotroph: false }), 'Animalia', 'key: tiger');
eq(classify({ prokaryote: false, unicellular: true, wall: 'chitin', autotroph: false }), 'Protista', 'key: single-celled eukaryote goes to Protista in the textbook key');

// ---------------------------------------------------------------- discoveries (years)
export const YEAR = { whittaker: 1969, ivanowsky: 1892, beijerinck: 1898, stanley: 1935, diener: 1971 };
export const GAP = {
  ivanowskyToStanley: YEAR.stanley - YEAR.ivanowsky,
  stanleyToDiener: YEAR.diener - YEAR.stanley,
  ivanowskyToBeijerinck: YEAR.beijerinck - YEAR.ivanowsky,
  whittakerToDiener: YEAR.diener - YEAR.whittaker,
};
eq(GAP.ivanowskyToStanley, 43, 'Ivanowsky to Stanley');
eq(GAP.stanleyToDiener, 36, 'Stanley to Diener');
eq(GAP.ivanowskyToBeijerinck, 6, 'Ivanowsky to Beijerinck');
eq(GAP.whittakerToDiener, 2, 'Whittaker to Diener');

// ---------------------------------------------------------------- bacterial growth by binary fission
/** Population after `minutes` of unrestricted growth when the generation time is `gen` minutes. */
export const grow = (n0, gen, minutes) => n0 * 2 ** (minutes / gen);
export const WE_GROW = { n0: 1, gen: 30, minutes: 180 };
WE_GROW.gens = WE_GROW.minutes / WE_GROW.gen;
WE_GROW.n = grow(WE_GROW.n0, WE_GROW.gen, WE_GROW.minutes);
eq(WE_GROW.gens, 6, 'generations');
eq(WE_GROW.n, 64, 'cells after 3 hours');

// ---------------------------------------------------------------- fungal spores and the sexual cycle
export const BASIDIA = { perCap: 300, sporesPerBasidium: 4 };
BASIDIA.spores = BASIDIA.perCap * BASIDIA.sporesPerBasidium;
eq(BASIDIA.spores, 1200, 'basidiospores');
/** Chromosome numbers through a sexual cycle with haploid number n. */
export const CYCLE = (n) => ({ hypha: n, dikaryonNuclei: 2, dikaryonPerNucleus: n, dikaryonTotal: 2 * n, zygote: 2 * n, spores: n });
export const WE_CYCLE = CYCLE(8);
eq(WE_CYCLE.dikaryonTotal, 16, 'dikaryon chromosomes');
eq(WE_CYCLE.zygote, 16, 'zygote');
eq(WE_CYCLE.spores, 8, 'spore');
/** Meiosis of one diploid zygote nucleus gives 4 haploid nuclei. */
export const MEIOSIS = { nuclei: 4 };
export const FUNGI_CLASSES = ['Phycomycetes', 'Ascomycetes', 'Basidiomycetes', 'Deuteromycetes'];
eq(FUNGI_CLASSES.length, 4, 'classes of fungi');

// ---------------------------------------------------------------- yeast, lichen and virus numbers
export const YEAST = { cells: 500, budding: 125 };
YEAST.pct = pct(YEAST.budding, YEAST.cells);
eq(YEAST.pct, 25, 'budding yeast');
/** Lichen cover (percent of tree-trunk area) at four sites along a road out of a city (illustrative figures). */
export const LICHEN = [['City centre', 2], ['Suburb', 10], ['Village', 34], ['Forest', 60]];
export const lichenRatio = LICHEN[3][1] / LICHEN[0][1];
eq(lichenRatio, 30, 'forest to city lichen cover');
export const lichenDiff = LICHEN[3][1] - LICHEN[1][1];
eq(lichenDiff, 50, 'forest minus suburb');
/** A phage and its host (illustrative figures). */
export const PHAGE = { infected: 20, burst: 150 };
PHAGE.released = PHAGE.infected * PHAGE.burst;
eq(PHAGE.released, 3000, 'phage particles released');
/** TMV leaf survey. */
export const LEAVES = { examined: 240, mosaic: 60 };
LEAVES.pct = pct(LEAVES.mosaic, LEAVES.examined);
eq(LEAVES.pct, 25, 'mosaic leaves');

/** Question numbers. */
export const Q = {
  grow: { n0: 4, gen: 20, minutes: 120 },
  basidia: { perCap: 250, caps: 6 },
  protist: { diatoms: 45, dino: 30, euglena: 15, others: 10 },
  swab: { total: 80, cocci: 32, bacilli: 24 },
};
Q.grow.gens = Q.grow.minutes / Q.grow.gen;
Q.grow.n = grow(Q.grow.n0, Q.grow.gen, Q.grow.minutes);
Q.basidia.spores = Q.basidia.perCap * BASIDIA.sporesPerBasidium * Q.basidia.caps;
Q.protist.total = Object.values(Q.protist).reduce((s, v) => s + v, 0);
Q.protist.diatomPct = pct(Q.protist.diatoms, Q.protist.total);
Q.swab.spirilla = Q.swab.total - Q.swab.cocci - Q.swab.bacilli;
Q.swab.coccusPct = pct(Q.swab.cocci, Q.swab.total);
Q.swab.spirPct = pct(Q.swab.spirilla, Q.swab.total);
eq(Q.swab.spirPct, 30, 'Q spiral share');
eq(Q.grow.gens, 6, 'Q generations');
eq(Q.grow.n, 256, 'Q cells');
eq(Q.basidia.spores, 6000, 'Q spores');
eq(Q.protist.total, 100, 'Q protist total');
eq(Q.protist.diatomPct, 45, 'Q diatom share');
eq(Q.swab.spirilla, 24, 'Q spirilla');
eq(Q.swab.coccusPct, 40, 'Q coccus share');

/** Case numbers. */
export const CASE = {
  lake: { before: 3, bloom: 3 * 2 ** 5, days: 5 }, // a cyanobacterial bloom doubling each day (illustrative)
  field: { plants: 80, rusted: 12 },
  ward: { total: 50, bacterial: 20, viral: 15, protozoal: 10 },
};
CASE.lake.n = grow(CASE.lake.before, 1, CASE.lake.days);
CASE.field.pct = pct(CASE.field.rusted, CASE.field.plants);
CASE.ward.fungal = CASE.ward.total - CASE.ward.bacterial - CASE.ward.viral - CASE.ward.protozoal;
CASE.ward.viralPct = pct(CASE.ward.viral, CASE.ward.total);
eq(CASE.lake.n, 96, 'bloom after five days');
eq(CASE.field.pct, 15, 'rusted share');
eq(CASE.ward.fungal, 5, 'fungal cases');
eq(CASE.ward.viralPct, 30, 'viral share');
