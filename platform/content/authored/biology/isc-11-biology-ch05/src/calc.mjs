// ISC 11 Biology ch05 Animal Kingdom — the phylum feature table and every count used in the chapter, asserted with eq.
export function eq(value, expected, what) {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Non-chordate phyla and the body-plan features used to classify them. */
export const PHYLA = [
  { name: 'Porifera', sym: 'asymmetrical', layers: 'none', coelom: 'acoelomate', seg: false, gut: 'none', org: 'cellular', eg: ['Sycon', 'Spongilla', 'Euspongia'] },
  { name: 'Cnidaria', sym: 'radial', layers: 'diploblastic', coelom: 'acoelomate', seg: false, gut: 'one opening', org: 'tissue', eg: ['Hydra', 'Aurelia', 'Physalia'] },
  { name: 'Ctenophora', sym: 'radial', layers: 'diploblastic', coelom: 'acoelomate', seg: false, gut: 'mouth and anal pores', org: 'tissue', eg: ['Pleurobrachia', 'Ctenoplana'] },
  { name: 'Platyhelminthes', sym: 'bilateral', layers: 'triploblastic', coelom: 'acoelomate', seg: false, gut: 'one opening', org: 'organ system', eg: ['Taenia', 'Fasciola', 'Planaria'] },
  { name: 'Nematoda', sym: 'bilateral', layers: 'triploblastic', coelom: 'pseudocoelomate', seg: false, gut: 'two openings', org: 'organ system', eg: ['Ascaris', 'Wuchereria', 'Ancylostoma'] },
  { name: 'Annelida', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: true, gut: 'two openings', org: 'organ system', eg: ['Nereis', 'Pheretima', 'Hirudinaria'] },
  { name: 'Mollusca', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'two openings', org: 'organ system', eg: ['Pila', 'Octopus', 'Pinctada'] },
  { name: 'Arthropoda', sym: 'bilateral', layers: 'triploblastic', coelom: 'haemocoelomate', seg: true, gut: 'two openings', org: 'organ system', eg: ['Palaemon', 'Apis', 'Limulus'] },
  { name: 'Echinodermata', sym: 'radial (adult)', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'two openings', org: 'organ system', eg: ['Asterias', 'Echinus', 'Antedon'] },
  { name: 'Hemichordata', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'two openings', org: 'organ system', eg: ['Balanoglossus', 'Saccoglossus'] },
];
export const count = (pred) => PHYLA.filter(pred).length;
export const names = (pred) => PHYLA.filter(pred).map((p) => p.name);
export const phylumFor = (sym, layers, coelom) => {
  const hit = PHYLA.filter((p) => p.sym.startsWith(sym) && p.layers === layers && p.coelom === coelom);
  return hit.map((p) => p.name);
};

export const N_PHYLA = eq(PHYLA.length, 10, 'non-chordate phyla listed');
export const N_TRIPLO = eq(count((p) => p.layers === 'triploblastic'), 7, 'triploblastic phyla');
export const N_DIPLO = eq(count((p) => p.layers === 'diploblastic'), 2, 'diploblastic phyla');
export const N_SEG = eq(count((p) => p.seg), 2, 'segmented non-chordate phyla');
export const N_COELOMATE = eq(count((p) => p.coelom === 'coelomate'), 4, 'coelomate non-chordate phyla');
export const N_RADIAL = eq(count((p) => p.sym.startsWith('radial')), 3, 'radial non-chordate phyla');
export const N_BILATERAL = eq(count((p) => p.sym === 'bilateral'), 6, 'bilateral non-chordate phyla');
export const N_ONE_OPENING = eq(count((p) => p.gut === 'one opening'), 2, 'phyla with a gut of one opening');

// Phylum identification: unique answers used in questions
eq(phylumFor('bilateral', 'triploblastic', 'pseudocoelomate'), ['Nematoda'], 'bilateral triploblastic pseudocoelomate');
eq(phylumFor('bilateral', 'triploblastic', 'haemocoelomate'), ['Arthropoda'], 'haemocoelomate');
eq(phylumFor('radial', 'diploblastic', 'acoelomate'), ['Cnidaria', 'Ctenophora'], 'radial diploblastic');
eq(phylumFor('bilateral', 'triploblastic', 'acoelomate'), ['Platyhelminthes'], 'acoelomate bilateral triploblastic');

// A pond-net sample (imagined)
export const POND = { 'flatworms': 6, 'roundworms': 4, 'annelids': 10, 'molluscs': 14, 'arthropods': 14 };
export const POND_TOTAL = eq(Object.values(POND).reduce((a, b) => a + b, 0), 48, 'pond sample size');
export const POND_COELOM = eq(POND.annelids + POND.molluscs, 24, 'coelomate animals in the pond sample');
export const POND_SEG = eq(POND.annelids + POND.arthropods, 24, 'segmented animals in the pond sample');
export const POND_ACOEL_PCT = eq((POND.flatworms / POND_TOTAL) * 100, 12.5, 'flatworm percentage');

// Imagined counts for single animals
export const CTENO = { rows: 8, platesPerRow: 35 };
export const CTENO_PLATES = eq(CTENO.rows * CTENO.platesPerRow, 280, 'comb plates');
export const STAR = { arms: 5, feetPerArm: 120 };
export const STAR_FEET = eq(STAR.arms * STAR.feetPerArm, 600, 'tube feet of a starfish');
export const NEREIS = { segments: 90, parapodiaPerSegment: 2 };
export const NEREIS_PARAPODIA = eq(NEREIS.segments * NEREIS.parapodiaPerSegment, 180, 'parapodia of a Nereis');

/** Vertebrate classes. heart = chambers; gills = gill slits per side (a typical value) where fish. */
export const VERT = [
  { cls: 'Cyclostomata', heart: 2, blood: 'cold', cover: 'slimy skin, no scales', ex: ['Petromyzon', 'Myxine'], jaws: false },
  { cls: 'Chondrichthyes', heart: 2, blood: 'cold', cover: 'placoid scales', ex: ['Scoliodon', 'Trygon', 'Carcharodon'], jaws: true },
  { cls: 'Osteichthyes', heart: 2, blood: 'cold', cover: 'cycloid or ctenoid scales', ex: ['Labeo', 'Catla', 'Hippocampus'], jaws: true },
  { cls: 'Amphibia', heart: 3, blood: 'cold', cover: 'moist skin without scales', ex: ['Rana', 'Bufo', 'Ichthyophis'], jaws: true },
  { cls: 'Reptilia', heart: 3, blood: 'cold', cover: 'dry skin with horny scales', ex: ['Calotes', 'Naja', 'Testudo'], jaws: true },
  { cls: 'Aves', heart: 4, blood: 'warm', cover: 'feathers', ex: ['Columba', 'Corvus', 'Pavo'], jaws: true },
  { cls: 'Mammalia', heart: 4, blood: 'warm', cover: 'hair', ex: ['Macaca', 'Camelus', 'Pteropus'], jaws: true },
];
export const heartOf = (cls) => VERT.find((v) => v.cls === cls).heart;
export const N_VERT_CLASSES = eq(VERT.length, 7, 'vertebrate classes');
export const N_WARM = eq(VERT.filter((v) => v.blood === 'warm').length, 2, 'warm-blooded classes');
export const N_FOUR_CHAMBERED = eq(VERT.filter((v) => v.heart === 4).length, 2, 'four-chambered classes');

// A zoo list (imagined): animals and the heart chambers of each
export const ZOO = [['Scoliodon', 'Chondrichthyes', 3], ['Labeo', 'Osteichthyes', 5], ['Rana', 'Amphibia', 4], ['Calotes', 'Reptilia', 6], ['Columba', 'Aves', 8], ['Pteropus', 'Mammalia', 2]];
export const ZOO_TOTAL = eq(ZOO.reduce((s, [, , k]) => s + k, 0), 28, 'zoo animals');
export const ZOO_CHAMBERS = eq(ZOO.reduce((s, [, c, k]) => s + heartOf(c) * k, 0), 86, 'heart chambers in the zoo');
export const ZOO_WARM = eq(ZOO.filter(([, c]) => VERT.find((v) => v.cls === c).blood === 'warm').reduce((s, [, , k]) => s + k, 0), 10, 'warm-blooded zoo animals');
export const ZOO_FOUR = eq(ZOO.filter(([, c]) => heartOf(c) === 4).reduce((s, [, , k]) => s + k, 0), 10, 'zoo animals with a four-chambered heart');

// Gill slits (pairs): a lamprey (7 pairs) and a dogfish shark (5 pairs)
export const GILL = { lamprey: 7, shark: 5 };
export const GILL_LAMPREY = eq(GILL.lamprey * 2, 14, 'lamprey gill slits');
export const GILL_SHARK = eq(GILL.shark * 2, 10, 'shark gill slits');
export const GILL_DIFF = eq(GILL_LAMPREY - GILL_SHARK, 4, 'difference in gill slits');
