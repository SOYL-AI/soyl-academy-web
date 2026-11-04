// Computed values for ICSE 9 Biology ch01 The Cell: A Unit of Life. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (value !== expected) throw new Error(`calc: ${what}: got ${value}, expected ${expected}`);
  return value;
};
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Practical: a student draws a human cheek cell. Actual width 60 micrometres; the drawing is 6 cm wide (60 000 micrometres).
export const CHEEK = { actualUm: 60, drawingCm: 6 };
CHEEK.drawingUm = CHEEK.drawingCm * 10000;
CHEEK.magnification = eq(CHEEK.drawingUm / CHEEK.actualUm, 1000, 'cheek magnification');

// Cells in a row across the field of a microscope.
export const FIELD = { widthUm: 2000, cellUm: 80 };
FIELD.cellsInRow = eq(FIELD.widthUm / FIELD.cellUm, 25, 'cells in a row');

// Size comparison of a bacterium and a leaf cell (both in micrometres).
export const SIZE = { bacteriumUm: 2, leafCellUm: 100 };
SIZE.times = eq(SIZE.leafCellUm / SIZE.bacteriumUm, 50, 'leaf cell vs bacterium');

// A leaf-peel count (imagined): 48 mesophyll cells counted, 36 of them with chloroplasts.
export const PEEL = { cells: 48, withChloroplast: 36 };
PEEL.pct = eq(pct(PEEL.withChloroplast, PEEL.cells, 0), 75, 'peel percentage');
PEEL.without = eq(PEEL.cells - PEEL.withChloroplast, 12, 'peel without chloroplast');

// Cell theory counting: a body made of 40 trillion cells; a one-celled amoeba; ratio is not needed. A tissue sample of 200 cells,
// 150 from the skin side and the rest from the gland side.
export const SAMPLE = { total: 200, skin: 150 };
SAMPLE.gland = eq(SAMPLE.total - SAMPLE.skin, 50, 'gland cells');

// Mitochondria counted in two micrographs (imagined): a sperm mid-piece and a skin surface cell.
export const MITO = { sperm: 48, skin: 6 };
MITO.times = eq(MITO.sperm / MITO.skin, 8, 'mitochondria ratio');

// Chloroplasts in a guard cell and in a mesophyll cell (imagined values for a worked example).
export const CHLORO = { guard: 12, mesophyll: 36 };
CHLORO.sum = eq(CHLORO.guard + CHLORO.mesophyll, 48, 'chloroplast sum');

// A second magnification item: a 25 micrometre cell drawn 5 cm wide.
export const MAG2 = { actualUm: 25, drawingCm: 5 };
MAG2.magnification = eq((MAG2.drawingCm * 10000) / MAG2.actualUm, 2000, 'second magnification');
