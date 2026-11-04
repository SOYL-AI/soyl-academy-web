// ISC 11 Biology ch08 Anatomy of Flowering Plants — tissue and organ tables and every count used in the chapter, asserted with eq.
export function eq(value, expected, what) {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Meristems: type -> [where, growth it brings about, origin]. */
export const MERISTEM = {
  apical: ['tips of roots and shoots', 'length', 'primary'],
  intercalary: ['bases of leaves and above the nodes of grasses', 'length', 'primary'],
  lateral: ['vascular cambium and cork cambium', 'girth', 'secondary'],
};
export const growsIn = (m) => MERISTEM[m][1];
eq(growsIn('apical'), 'length', 'apical growth');
eq(growsIn('intercalary'), 'length', 'intercalary growth');
eq(growsIn('lateral'), 'girth', 'lateral growth');

/** Simple tissues: name -> { wall, living, role }. */
export const SIMPLE = {
  parenchyma: { wall: 'thin cellulose', living: true, role: 'storage, photosynthesis and secretion' },
  collenchyma: { wall: 'unevenly thickened with cellulose and pectin at the corners', living: true, role: 'mechanical support to growing parts' },
  sclerenchyma: { wall: 'thick, lignified', living: false, role: 'mechanical strength' },
};
/** Complex tissues: element -> [tissue, living]. */
export const ELEMENT = {
  tracheid: ['xylem', false],
  vessel: ['xylem', false],
  'xylem fibre': ['xylem', false],
  'xylem parenchyma': ['xylem', true],
  'sieve tube element': ['phloem', true],
  'companion cell': ['phloem', true],
  'phloem parenchyma': ['phloem', true],
  'phloem fibre': ['phloem', false],
};
export const elements = (tissue) => Object.entries(ELEMENT).filter(([, [t]]) => t === tissue).map(([n]) => n);
export const N_XYLEM = eq(elements('xylem').length, 4, 'xylem elements');
export const N_PHLOEM = eq(elements('phloem').length, 4, 'phloem elements');
export const N_DEAD_XYLEM = eq(elements('xylem').filter((n) => !ELEMENT[n][1]).length, 3, 'dead xylem elements');
export const N_DEAD_PHLOEM = eq(elements('phloem').filter((n) => !ELEMENT[n][1]).length, 1, 'dead phloem elements');
export const N_DEAD_ALL = eq(N_DEAD_XYLEM + N_DEAD_PHLOEM, 4, 'dead elements in the vascular tissues');

/** Organs: feature -> [dicot, monocot]. */
export const ROOT = { xylemArms: ['two to four (rarely more)', 'more than six'], pith: ['small or absent', 'large and well developed'], secondary: ['present', 'absent'] };
export const STEM = { bundles: ['in a ring', 'scattered'], hypodermis: ['collenchymatous', 'sclerenchymatous'], bundleType: ['conjoint, open (cambium present)', 'conjoint, closed (no cambium)'], phloemParenchyma: ['present', 'absent'], medullaryRays: ['present', 'absent'] };
export const LEAF = { name: ['dorsiventral', 'isobilateral'], mesophyll: ['palisade and spongy', 'not differentiated'], stomata: ['more on the lower surface', 'about equal on both surfaces'], bulliform: ['absent', 'present'] };

// Arithmetic (imagined data)
/** An apical meristem whose cells divide every 8 hours, from one cell. */
export const DIV = { hours: 8, spanHours: 48 };
export const DIVISIONS = eq(DIV.spanHours / DIV.hours, 6, 'divisions in 48 hours');
export const CELLS_AFTER = eq(2 ** DIVISIONS, 64, 'cells after six divisions from one');
/** An intercalary meristem at the base of a bamboo internode adds 3 cm a day. */
export const BAMBOO = { cmPerDay: 3, days: 12 };
export const BAMBOO_GROWTH = eq(BAMBOO.cmPerDay * BAMBOO.days, 36, 'cm added in twelve days');
/** A wheat root with 14 xylem bundles alternating with phloem bundles. */
export const WHEAT = { xylem: 14 };
export const WHEAT_PHLOEM = eq(WHEAT.xylem, 14, 'phloem bundles alternate with xylem');
export const WHEAT_STRANDS = eq(WHEAT.xylem + WHEAT_PHLOEM, 28, 'vascular strands in the wheat root');
/** A triarch dicot root. */
export const TRIARCH = { arms: 3 };
export const TRIARCH_STRANDS = eq(TRIARCH.arms * 2, 6, 'strands in a triarch root');
/** A dicot stem with a ring of 12 open bundles, each with 6 vessels and 9 sieve tube elements. */
export const RING = { bundles: 12, vessels: 6, sieve: 9 };
export const RING_VESSELS = eq(RING.bundles * RING.vessels, 72, 'vessels in the ring of bundles');
export const RING_SIEVE = eq(RING.bundles * RING.sieve, 108, 'sieve tube elements in the ring of bundles');
/** A stem section of radius 3 mm with a pith of radius 1.2 mm. */
export const SECTION = { r: 3, pith: 1.2 };
export const PITH_AREA_PCT = eq(Math.round(((SECTION.pith / SECTION.r) ** 2) * 1000) / 10, 16, 'share of the section area taken by the pith (percent)');
/** A mango leaf: 250 stomata per square millimetre on the lower epidermis, none on the upper; lower surface 30 square cm. */
export const MANGO = { perMm2: 250, areaCm2: 30 };
export const MANGO_STOMATA = eq(MANGO.perMm2 * MANGO.areaCm2 * 100, 750000, 'stomata on the lower surface of the mango leaf');
/** A paddy leaf: 90 stomata per square millimetre on each surface; one surface 12 square cm. */
export const PADDY = { perMm2: 90, areaCm2: 12 };
export const PADDY_STOMATA = eq(PADDY.perMm2 * PADDY.areaCm2 * 100 * 2, 216000, 'stomata on both surfaces of the paddy leaf');
/** A sugarcane stem section: 40 scattered bundles, one in four peripheral and small. */
export const CANE = { bundles: 40, peripheralPerFour: 1 };
export const CANE_PERIPHERAL = eq((CANE.bundles / 4) * CANE.peripheralPerFour, 10, 'peripheral bundles');
export const CANE_CENTRAL = eq(CANE.bundles - CANE_PERIPHERAL, 30, 'central bundles');
/** Phloem sap: an aphid stylet collects 6 microlitres an hour. */
export const APHID = { ulPerHour: 6, hours: 9 };
export const APHID_SAP = eq(APHID.ulPerHour * APHID.hours, 54, 'microlitres of sap in nine hours');
/** A guava with gritty stone cells: 25 clusters of 18 cells. */
export const GUAVA = { clusters: 25, cells: 18 };
export const GUAVA_CELLS = eq(GUAVA.clusters * GUAVA.cells, 450, 'stone cells in the sample');
/** A root hair zone: 600 hairs per square cm, a 5 square cm zone. */
export const HAIR = { perCm2: 600, cm2: 5 };
export const HAIR_TOTAL = eq(HAIR.perCm2 * HAIR.cm2, 3000, 'root hairs in the zone');

// Extra numbers for the question bank
export const DIV2 = { hours: 4, spanHours: 20 };
export const CELLS2 = eq(2 ** (DIV2.spanHours / DIV2.hours), 32, 'cells after twenty hours with a four-hour cycle');
export const RING2 = { bundles: 15, vessels: 7, sieve: 11 };
export const RING2_VESSELS = eq(RING2.bundles * RING2.vessels, 105, 'vessels in the second ring');
export const RING2_SIEVE = eq(RING2.bundles * RING2.sieve, 165, 'sieve tube elements in the second ring');
export const ROOT10 = { xylem: 10 };
export const ROOT10_STRANDS = eq(ROOT10.xylem * 2, 20, 'strands in a ten-armed root');
export const SECTION2 = { r: 4, pith: 1 };
export const PITH2_PCT = eq((SECTION2.pith / SECTION2.r) ** 2 * 100, 6.25, 'pith share of a section of radius 4 mm (percent)');
export const LEAF2 = { perMm2: 180, areaCm2: 40 };
export const LEAF2_STOMATA = eq(LEAF2.perMm2 * LEAF2.areaCm2 * 100, 720000, 'stomata on the lower surface of the second leaf');
