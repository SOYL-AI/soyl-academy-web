// ch08 Cell: The Unit of Life — arithmetic used by decks, SVGs and questions (asserted below).
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);
export const share = (whole, p, dp = 2) => round((whole * p) / 100, dp);
/** Cell sizes quoted in the chapter (micrometres). */
export const SIZE = { mycoplasma: 0.3, bacteriaMin: 3, bacteriaMax: 5, rbc: 7 };
export const ratio = (a, b, dp = 1) => round(a / b, dp);
/** Real size (µm) of an object measuring imageMm on a micrograph at magnification mag, and the reverse. */
export const actualUm = (imageMm, mag) => round((imageMm * 1000) / mag, 2);
export const magnification = (imageMm, realUm) => round((imageMm * 1000) / realUm, 0);
/** Microtubules: axoneme 9 doublets + central pair; centriole 9 triplets. */
export const AXO = { doublets: 9, central: 2 };
export const axonemeMT = () => AXO.doublets * 2 + AXO.central;
export const centrioleMT = () => 9 * 3;
/** Average DNA length per chromosome in cm for a total length in metres shared among n chromosomes. */
export const dnaPerChromosomeCm = (metres, n, dp = 1) => round((metres * 100) / n, dp);
/** Arm ratio of a chromosome: long arm / short arm (Infinity for a telocentric). */
export const armRatio = (longArm, shortArm, dp = 1) => (shortArm === 0 ? Infinity : round(longArm / shortArm, dp));

const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};
eq(axonemeMT(), 20, 'axoneme');
eq(centrioleMT(), 27, 'centriole');
eq(2 * centrioleMT(), 54, 'centrosome');
eq(dnaPerChromosomeCm(2, 46), 4.3, 'DNA per chromosome');
eq(ratio(SIZE.rbc, SIZE.mycoplasma), 23.3, 'RBC / Mycoplasma');
eq(ratio(SIZE.bacteriaMax, SIZE.mycoplasma), 16.7, 'bacterium / Mycoplasma');
eq(share(2000, 90, 0), 1800, 'vacuole volume');
eq(share(5, 52), 2.6, 'membrane protein');
eq(share(8, 40), 3.2, 'membrane lipid');
eq(actualUm(12, 6000), 2, 'mitochondrion');
eq(actualUm(18, 6000), 3, 'bacterium image');
eq(magnification(18, 3), 6000, 'magnification');
eq(armRatio(3, 3), 1, 'metacentric');
eq(armRatio(4, 2), 2, 'submetacentric');
eq(armRatio(5.5, 0.5), 11, 'acrocentric');
eq(pct(36, 48, 0), 75, 'survivors');
eq(share(30, 25, 1), 7.5, 'chloroplast loss');
eq(90 - 3, 87, 'chase minutes');
eq(25 * 30, 750, 'chloroplasts in 25 cells');
