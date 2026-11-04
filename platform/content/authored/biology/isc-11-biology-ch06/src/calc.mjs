// ISC 11 Biology ch06 Morphology of Root, Stem and Leaf — identification tables and every count used in the chapter, asserted with eq.
export function eq(value, expected, what) {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Root modifications: plant -> [type, function]. */
export const ROOT_MOD = {
  carrot: ['conical', 'storage'],
  radish: ['fusiform', 'storage'],
  turnip: ['napiform', 'storage'],
  beetroot: ['napiform', 'storage'],
  'sweet potato': ['tuberous', 'storage'],
  mangrove: ['pneumatophore', 'respiration'],
  banyan: ['prop root', 'support'],
  maize: ['stilt root', 'support'],
  sugarcane: ['stilt root', 'support'],
};
export const rootMod = (plant) => ROOT_MOD[plant][0];
export const rootFn = (plant) => ROOT_MOD[plant][1];
eq(rootMod('carrot'), 'conical', 'carrot');
eq(rootMod('radish'), 'fusiform', 'radish');
eq(rootMod('turnip'), 'napiform', 'turnip');
eq(rootMod('sweet potato'), 'tuberous', 'sweet potato');
eq(rootMod('mangrove'), 'pneumatophore', 'mangrove');
eq(rootMod('banyan'), 'prop root', 'banyan');
export const N_STORAGE_ROOTS = eq(Object.values(ROOT_MOD).filter(([, f]) => f === 'storage').length, 5, 'storage roots listed');
export const N_SUPPORT_ROOTS = eq(Object.values(ROOT_MOD).filter(([, f]) => f === 'support').length, 3, 'support roots listed');

/** Stem modifications: plant -> [type, position, function]. */
export const STEM_MOD = {
  potato: ['tuber', 'underground', 'storage and propagation'],
  ginger: ['rhizome', 'underground', 'storage and perennation'],
  turmeric: ['rhizome', 'underground', 'storage and perennation'],
  colocasia: ['corm', 'underground', 'storage'],
  grapevine: ['tendril', 'aerial', 'climbing'],
  citrus: ['thorn', 'aerial', 'protection'],
  bougainvillea: ['thorn', 'aerial', 'protection'],
  opuntia: ['phylloclade', 'aerial', 'photosynthesis and storage'],
  'grass (Cynodon)': ['runner', 'sub-aerial', 'vegetative propagation'],
  mint: ['sucker', 'sub-aerial', 'vegetative propagation'],
  strawberry: ['stolon', 'sub-aerial', 'vegetative propagation'],
  'water hyacinth': ['offset', 'sub-aerial', 'vegetative propagation'],
};
export const stemMod = (plant) => STEM_MOD[plant][0];
export const stemPos = (plant) => STEM_MOD[plant][1];
export const N_UNDERGROUND = eq(Object.values(STEM_MOD).filter(([, p]) => p === 'underground').length, 4, 'underground stems listed');
export const N_SUBAERIAL = eq(Object.values(STEM_MOD).filter(([, p]) => p === 'sub-aerial').length, 4, 'sub-aerial stems listed');
export const N_AERIAL = eq(Object.values(STEM_MOD).filter(([, p]) => p === 'aerial').length, 4, 'aerial stems listed');

/** Phyllotaxy: leaves per node. */
export const LEAVES_PER_NODE = { alternate: 1, opposite: 2, whorled: 6 };
export const leaves = (type, nodes) => LEAVES_PER_NODE[type] * nodes;
export const LEAF_ALT = eq(leaves('alternate', 14), 14, 'leaves on an alternate twig of 14 nodes');
export const LEAF_OPP = eq(leaves('opposite', 9), 18, 'leaves on an opposite twig of 9 nodes');
export const LEAF_WHORL = eq(leaves('whorled', 5), 30, 'leaves on a whorled twig of 5 nodes');

/** Compound leaves. */
export const pinnateLeaflets = (pairs, terminal = true) => pairs * 2 + (terminal ? 1 : 0);
export const LEAFLETS_NEEM = eq(pinnateLeaflets(9, false), 18, 'paripinnate leaflets, 9 pairs');
export const LEAFLETS_ROSE = eq(pinnateLeaflets(3), 7, 'imparipinnate leaflets, 3 pairs and a terminal leaflet');
export const PALMATE = 5;
export const LEAFLETS_COMPOUND_TWIG = eq(PALMATE * 6, 30, 'leaflets on 6 palmate leaves');

/** Root tip (imagined measurements, mm). */
export const TIP = { cap: 1, meristem: 2, elongation: 6, total: 40 };
export const TIP_MATURE = eq(TIP.total - TIP.cap - TIP.meristem - TIP.elongation, 31, 'length of the maturation region');
export const TIP_GROWING = eq(TIP.cap + TIP.meristem + TIP.elongation, 9, 'tip length above the maturation region');
export const TIP_ELONG_PCT = eq(Math.round((TIP.elongation / TIP.total) * 1000) / 10, 15, 'elongation share (percent)');
export const GROWTH = { perDay: 3, days: 7 };
export const GROWTH_WEEK = eq(GROWTH.perDay * GROWTH.days, 21, 'root growth in a week (mm)');

// Propagation and storage arithmetic (imagined)
export const POTATO = { tubers: 5, eyes: 8 };
export const POTATO_EYES = eq(POTATO.tubers * POTATO.eyes, 40, 'eyes on five potatoes');
export const RUNNER = { length_cm: 300, spacing_cm: 12 };
export const RUNNER_NODES = eq(RUNNER.length_cm / RUNNER.spacing_cm, 25, 'nodes on a runner');
export const BRYO = { leaves: 4, plantlets: 9 };
export const BRYO_PLANTLETS = eq(BRYO.leaves * BRYO.plantlets, 36, 'plantlets on Bryophyllum leaves');
export const MANGROVE = { perM2: 15, area: 12 };
export const PNEUMATOPHORES = eq(MANGROVE.perM2 * MANGROVE.area, 180, 'pneumatophores in a mangrove plot');
export const PITCHER = { insectsPerWeek: 14, pitchers: 6, weeks: 4 };
export const PITCHER_INSECTS = eq(PITCHER.insectsPerWeek * PITCHER.pitchers * PITCHER.weeks, 336, 'insects trapped by pitchers');
export const ONION = { scaleLeaves: 8, bulbs: 12 };
export const ONION_SCALES = eq(ONION.scaleLeaves * ONION.bulbs, 96, 'scale leaves in twelve onion bulbs');

// A mixed shoot (imagined): 6 opposite nodes with imparipinnate leaves (3 pairs and a terminal leaflet), 4 whorled nodes with simple leaves
export const MIX_LEAFLETS = eq(leaves('opposite', 6) * LEAFLETS_ROSE, 84, 'leaflets on the opposite nodes');
export const MIX_TOTAL = eq(MIX_LEAFLETS + leaves('whorled', 4), 108, 'separate blades on the mixed shoot');
