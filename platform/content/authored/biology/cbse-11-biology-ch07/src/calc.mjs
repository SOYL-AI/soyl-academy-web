// ch07 Structural Organisation in Animals — arithmetic used by decks and questions (asserted below).
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);
/** Real size in micrometres of an object measuring `imageMm` millimetres on a print at magnification `mag`. */
export const actualUm = (imageMm, mag) => round((imageMm * 1000) / mag, 2);
/** Frog limbs: digits on each forelimb and hind limb. */
export const DIGITS = { fore: 4, hind: 5 };
export const totalDigits = () => 2 * DIGITS.fore + 2 * DIGITS.hind;
/** Cranial nerves of the frog: pairs arising from the brain. */
export const CRANIAL_PAIRS = 10;
export const cranialTotal = () => 2 * CRANIAL_PAIRS;
/** Vasa efferentia per testis (10 to 12) and the range for both testes. */
export const VASA = { min: 10, max: 12 };
export const vasaBoth = () => [2 * VASA.min, 2 * VASA.max];
/** Ova laid by a mature female at a time. */
export const OVA = { min: 2500, max: 3000 };
/** Number surviving after successive survival fractions (percent). */
export const survive = (n, ...pcts) => pcts.reduce((x, p) => round((x * p) / 100, 2), n);

// Assertions: every number used in the chapter is checked here.
const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};
eq(totalDigits(), 18, 'digits');
eq(cranialTotal(), 20, 'cranial nerves');
eq(vasaBoth()[0], 20, 'vasa min');
eq(vasaBoth()[1], 24, 'vasa max');
eq(actualUm(6, 400), 15, 'cuboidal cell');
eq(actualUm(36, 600), 60, 'squamous cell');
eq(pct(42, 60, 0), 70, 'fibroblasts');
eq(pct(18, 48, 1), 37.5, 'skeletal fibres');
eq(survive(2800, 60, 5), 84, 'froglets');
eq(survive(3000, 2.5), 75, 'adults');
eq(survive(2500, 40), 1000, 'hatchlings');
