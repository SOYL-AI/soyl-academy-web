// ch03 Plant Kingdom — classes of algae, plant groups, life-cycle types, spore and gamete counts, ploidy: all computed and asserted here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
};

// ---------------------------------------------------------------- classes of algae (NCERT Class 11)
export const ALGAE = [
  {
    cls: 'Chlorophyceae', common: 'green algae', pigments: ['chlorophyll a', 'chlorophyll b'], colour: 'grass green', store: 'starch (in pyrenoids)', wall: 'cellulose', flagella: 'two to eight, equal, apical', habitat: 'freshwater, brackish water and salt water',
    egs: ['Chlamydomonas', 'Volvox', 'Ulothrix', 'Spirogyra', 'Chara'], gametes: 'isogamous, anisogamous or oogamous', marine: false,
  },
  {
    cls: 'Phaeophyceae', common: 'brown algae', pigments: ['chlorophyll a', 'chlorophyll c', 'fucoxanthin'], colour: 'olive green to brown', store: 'laminarin and mannitol', wall: 'cellulose with a gelatinous coating of algin', flagella: 'two, unequal, lateral', habitat: 'brackish water and salt water, rarely freshwater',
    egs: ['Ectocarpus', 'Dictyota', 'Laminaria', 'Sargassum', 'Fucus'], gametes: 'isogamous, anisogamous or oogamous', marine: true,
  },
  {
    cls: 'Rhodophyceae', common: 'red algae', pigments: ['chlorophyll a', 'chlorophyll d', 'r-phycoerythrin'], colour: 'red', store: 'floridean starch', wall: 'cellulose, pectin and polysulphate esters', flagella: 'absent', habitat: 'mostly marine, in warmer areas and at great depths',
    egs: ['Polysiphonia', 'Porphyra', 'Gracilaria', 'Gelidium'], gametes: 'oogamous', marine: true,
  },
];
export const AL = Object.fromEntries(ALGAE.map((a) => [a.common.split(' ')[0], a]));
eq(ALGAE.length, 3, 'three classes of algae');
eq(ALGAE.filter((a) => a.pigments.includes('chlorophyll a')).length, 3, 'all classes have chlorophyll a');
eq(ALGAE.filter((a) => a.pigments.includes('chlorophyll b')).map((a) => a.cls), ['Chlorophyceae'], 'only green algae have chlorophyll b');
eq(ALGAE.filter((a) => a.marine).length, 2, 'two classes are mostly marine');
eq(ALGAE.map((a) => a.egs.length), [5, 5, 4], 'example counts');
/** Names the class from a clue list (pigment or stored food). */
export const algaFromClue = ({ pigment, store }) => ALGAE.find((a) => (pigment && a.pigments.includes(pigment)) || (store && a.store.startsWith(store)))?.cls ?? 'none';
eq(algaFromClue({ pigment: 'fucoxanthin' }), 'Phaeophyceae', 'fucoxanthin → brown');
eq(algaFromClue({ pigment: 'r-phycoerythrin' }), 'Rhodophyceae', 'phycoerythrin → red');
eq(algaFromClue({ store: 'floridean' }), 'Rhodophyceae', 'floridean starch → red');
eq(algaFromClue({ store: 'laminarin' }), 'Phaeophyceae', 'laminarin → brown');
eq(algaFromClue({ pigment: 'chlorophyll b' }), 'Chlorophyceae', 'chlorophyll b → green');

// ---------------------------------------------------------------- the five groups of the plant kingdom
/** Features used in the textbook: vascular tissue, seeds, fruit, water for fertilisation, dominant phase, spore kind. */
export const GROUPS = [
  { name: 'Algae', vascular: false, seed: false, fruit: false, water: true, dominant: 'gametophyte or sporophyte (varies)', spores: 'homosporous', body: 'thalloid' },
  { name: 'Bryophytes', vascular: false, seed: false, fruit: false, water: true, dominant: 'gametophyte', spores: 'homosporous', body: 'thallus-like or leafy, with rhizoids' },
  { name: 'Pteridophytes', vascular: true, seed: false, fruit: false, water: true, dominant: 'sporophyte', spores: 'mostly homosporous', body: 'root, stem and leaves' },
  { name: 'Gymnosperms', vascular: true, seed: true, fruit: false, water: false, dominant: 'sporophyte', spores: 'heterosporous', body: 'root, stem and leaves' },
  { name: 'Angiosperms', vascular: true, seed: true, fruit: true, water: false, dominant: 'sporophyte', spores: 'heterosporous', body: 'root, stem, leaves and flowers' },
];
export const G = Object.fromEntries(GROUPS.map((g) => [g.name, g]));
export const namesWhere = (f) => GROUPS.filter(f).map((g) => g.name);
eq(GROUPS.length, 5, 'five groups');
eq(namesWhere((g) => g.vascular).length, 3, 'three groups have vascular tissue');
eq(namesWhere((g) => g.seed), ['Gymnosperms', 'Angiosperms'], 'seed plants');
eq(namesWhere((g) => g.fruit), ['Angiosperms'], 'fruit only in angiosperms');
eq(namesWhere((g) => g.water).length, 3, 'three groups need water for fertilisation');
eq(namesWhere((g) => !g.vascular).length, 2, 'two groups lack vascular tissue');
eq(namesWhere((g) => g.vascular && !g.seed), ['Pteridophytes'], 'vascular but seedless');
eq(namesWhere((g) => g.dominant === 'sporophyte').length, 3, 'three groups have a dominant sporophyte');

// ---------------------------------------------------------------- life-cycle patterns
export const CYCLES = [
  { type: 'Haplontic', dominant: 'haploid gametophyte', sporophyte: 'only the one-celled zygote', egs: 'Volvox, Spirogyra, some Chlamydomonas', meiosis: 'zygotic' },
  { type: 'Diplontic', dominant: 'diploid sporophyte', sporophyte: 'dominant, independent and photosynthetic', egs: 'all gymnosperms and angiosperms; the alga Fucus', meiosis: 'sporic' },
  { type: 'Haplo-diplontic', dominant: 'both phases multicellular and free-living', sporophyte: 'multicellular, intermediate', egs: 'bryophytes and pteridophytes; the algae Ectocarpus, Polysiphonia and kelps', meiosis: 'sporic' },
];
export const CY = Object.fromEntries(CYCLES.map((c) => [c.type, c]));
eq(CYCLES.length, 3, 'three life-cycle types');
eq(CYCLES.filter((c) => c.meiosis === 'sporic').length, 2, 'two have meiosis at spore formation');

// ---------------------------------------------------------------- ploidy: n is the haploid number
/** Chromosome number in a cell of the given kind, for a plant with haploid number n. */
export const ploidy = (cell, n) =>
  ({
    spore: n, gamete: n, egg: n, antherozoid: n, microspore: n, megaspore: n, 'pollen grain': n, protonema: n, prothallus: n, 'gametophyte cell': n, synergid: n, antipodal: n, 'polar nucleus': n, 'male gamete': n,
    zygote: 2 * n, embryo: 2 * n, 'spore mother cell': 2 * n, 'sporophyte cell': 2 * n, 'megaspore mother cell': 2 * n, 'pollen mother cell': 2 * n, nucellus: 2 * n, 'leaf cell': 2 * n,
    PEN: 3 * n, 'endosperm cell': 3 * n,
  })[cell];
eq(ploidy('spore', 8), 8, 'spore n');
eq(ploidy('zygote', 8), 16, 'zygote 2n');
eq(ploidy('PEN', 12), 36, 'PEN 3n');
eq(ploidy('endosperm cell', 12), 36, 'endosperm 3n');

// ---------------------------------------------------------------- spore and gamete counts
/** Meiosis of one mother cell gives four haploid spores. */
export const sporesFrom = (mothers) => mothers * 4;
export const meioses = (spores) => spores / 4;
export const male = (pollen) => pollen * 2; // each pollen grain delivers two male gametes
eq(sporesFrom(40), 160, 'moss capsule: 40 SMC → 160 spores');
eq(sporesFrom(16), 64, 'fern sporangium: 16 SMC → 64 spores');
eq(meioses(100), 25, '100 pollen grains need 25 meioses');
eq(meioses(60), 15, '60 spores need 15 meioses');
eq(male(100), 200, '100 pollen grains → 200 male gametes');

export const N = {};
N.moss = sporesFrom(40);
N.fern = sporesFrom(16);
N.fernSporangia = 25; // sporangia on a pinna segment (imagined)
N.fernPerSorus = N.fernSporangia * N.fern; // spores from one sorus
eq(N.fernPerSorus, 1600, 'spores from one sorus of 25 sporangia');
N.pmc = meioses(100);
N.maleGametes = male(100);
// ovules and pollen: each ovule needs one pollen tube, each tube carries two male gametes
N.ovules = 30;
N.tubes = N.ovules;
N.malesNeeded = male(N.tubes);
eq(N.malesNeeded, 60, '30 ovules need 60 male gametes');
// double fertilisation, n = 12 (imagined plant)
N.n = 12;
N.zygote = ploidy('zygote', N.n);
N.pen = ploidy('PEN', N.n);
N.egg = ploidy('egg', N.n);
eq([N.zygote, N.pen, N.egg], [24, 36, 12], 'double fertilisation numbers');
// moss with n = 8: sporophyte and spore
N.mossN = 8;
N.mossSporophyte = ploidy('sporophyte cell', N.mossN);
eq(N.mossSporophyte, 16, 'moss sporophyte 2n');
// fern sporophyte with 2n = 48: prothallus n
N.fern2n = 48;
N.prothallus = N.fern2n / 2;
eq(N.prothallus, 24, 'prothallus n');
// pine pollen: 2n = 24 → pollen grain 12, zygote 24
N.pine2n = 24;
N.pinePollen = N.pine2n / 2;
eq(N.pinePollen, 12, 'pine pollen grain n');
// seven-celled, eight-nucleate embryo sac (cells: 3 antipodals, 2 synergids, 1 egg, 1 central cell)
export const SAC = { antipodals: 3, synergids: 2, egg: 1, central: 1, polarNuclei: 2 };
SAC.cells = SAC.antipodals + SAC.synergids + SAC.egg + SAC.central;
SAC.nuclei = SAC.antipodals + SAC.synergids + SAC.egg + SAC.polarNuclei;
eq([SAC.cells, SAC.nuclei], [7, 8], 'embryo sac 7 cells, 8 nuclei');
SAC.eggApparatus = SAC.synergids + SAC.egg;
eq(SAC.eggApparatus, 3, 'egg apparatus');
// nuclei fusing in double fertilisation: syngamy 2 (male + egg), triple fusion 3 (male + 2 polar)
N.syngamy = 1 + 1;
N.triple = 1 + SAC.polarNuclei;
eq([N.syngamy, N.triple], [2, 3], 'nuclei in syngamy and triple fusion');
// seeds formed when 30 ovules are all fertilised; fruits from one ovary
N.seeds = N.ovules;
// years/dominance counts for a survey of 12 plants (imagined collection)
export const SURVEY = [
  ['Marchantia', 'Bryophytes'], ['Funaria', 'Bryophytes'], ['Sphagnum', 'Bryophytes'], ['Selaginella', 'Pteridophytes'], ['Equisetum', 'Pteridophytes'], ['Dryopteris', 'Pteridophytes'],
  ['Cycas', 'Gymnosperms'], ['Pinus', 'Gymnosperms'], ['Wolffia', 'Angiosperms'], ['Eucalyptus', 'Angiosperms'], ['Spirogyra', 'Algae'], ['Fucus', 'Algae'],
];
N.surveyTotal = SURVEY.length;
N.surveyVascular = SURVEY.filter(([, g]) => G[g].vascular).length;
N.surveySeed = SURVEY.filter(([, g]) => G[g].seed).length;
N.surveyWater = SURVEY.filter(([, g]) => G[g].water).length;
eq([N.surveyTotal, N.surveyVascular, N.surveySeed, N.surveyWater], [12, 7, 4, 8], 'survey counts');

// ---------------------------------------------------------------- extra worked numbers for the question bank
N.moss36 = sporesFrom(36);
eq(N.moss36, 144, '36 SMC → 144 spores');
N.cycasN = 11;
N.cycasLeaf = ploidy('leaf cell', N.cycasN);
eq(N.cycasLeaf, 22, 'Cycas leaf cell 2n');
N.mangoN = 14;
N.mangoZygote = ploidy('zygote', N.mangoN);
N.mangoPen = ploidy('PEN', N.mangoN);
eq([N.mangoZygote, N.mangoPen], [28, 42], 'mango-like plant: zygote and PEN');
N.pen9 = ploidy('PEN', 9);
eq(N.pen9, 27, 'PEN for n = 9');
N.endo10 = ploidy('endosperm cell', 10);
eq(N.endo10, 30, 'endosperm cell for n = 10');
N.ferns = sporesFrom(18);
eq(N.ferns, 72, '18 SMC → 72 spores');
/** Samples examined by a seaweed farm (imagined): [id, pigment, stored food]. */
export const SAMPLES = [
  ['S1', 'fucoxanthin', 'laminarin'],
  ['S2', 'r-phycoerythrin', 'floridean starch'],
  ['S3', 'chlorophyll b', 'starch'],
  ['S4', 'fucoxanthin', 'mannitol'],
  ['S5', 'r-phycoerythrin', 'floridean starch'],
];
export const classOf = (id) => algaFromClue({ pigment: SAMPLES.find((s) => s[0] === id)[1] });
N.brownSamples = SAMPLES.filter(([id]) => classOf(id) === 'Phaeophyceae').length;
N.redSamples = SAMPLES.filter(([id]) => classOf(id) === 'Rhodophyceae').length;
N.greenSamples = SAMPLES.filter(([id]) => classOf(id) === 'Chlorophyceae').length;
eq([N.brownSamples, N.redSamples, N.greenSamples], [2, 2, 1], 'sample classes');
