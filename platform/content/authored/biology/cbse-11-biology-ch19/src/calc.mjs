// ch19 Chemical Coordination and Integration — every number used by decks, SVGs and questions, asserted here.
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);

/** Pituitary hormones as NCERT lists them: six from the pars distalis, one from the pars intermedia, two stored and released by the pars nervosa. */
export const PITUITARY = {
  distalis: ['GH', 'PRL', 'TSH', 'ACTH', 'LH', 'FSH'],
  intermedia: ['MSH'],
  nervosa: ['oxytocin', 'vasopressin'],
};
export const PIT_TOTAL = PITUITARY.distalis.length + PITUITARY.intermedia.length + PITUITARY.nervosa.length;
check(PIT_TOTAL === 9, 'nine pituitary hormones');
/** Of these, the hormones actually made in the pituitary (oxytocin and vasopressin are made in the hypothalamus). */
export const PIT_MADE = PIT_TOTAL - PITUITARY.nervosa.length;
check(PIT_MADE === 7, 'seven made in the adenohypophysis');

/** Iodine atoms per molecule. */
export const IODINE = { T4: 4, T3: 3 };
/** Share of thyroxine's iodine removed when it is converted to triiodothyronine (percent). */
export const DEIODINATION_PCT = pct(IODINE.T4 - IODINE.T3, IODINE.T4, 0);
check(DEIODINATION_PCT === 25, 'one of four iodine atoms');
/** Mass share of iodine in thyroxine with rounded molar masses (thyroxine 777, iodine 127 g per mol). */
export const T4_MOLAR = 777;
export const I_MOLAR = 127;
export const T4_IODINE_PCT = pct(IODINE.T4 * I_MOLAR, T4_MOLAR, 1);
check(IODINE.T4 * I_MOLAR === 508 && T4_IODINE_PCT === 65.4, 'iodine is about 65.4 percent of thyroxine by mass');

/** Islets of Langerhans: about 1 to 2 million, 1 to 2 percent of pancreatic tissue (NCERT). */
export const ISLETS = { min: 1e6, max: 2e6, pctMin: 1, pctMax: 2 };
/** Illustrative: a 90 g pancreas with 1.5 percent islet tissue. */
export const PANC = { mass: 90, pct: 1.5 };
PANC.islet = round((PANC.mass * PANC.pct) / 100, 2);
check(PANC.islet === 1.35, 'islet tissue 1.35 g');

/** Blood glucose arithmetic (illustrative, typical values). */
export const GLU = { conc: 90, volumeL: 5 };
GLU.dl = GLU.volumeL * 10;
GLU.totalMg = GLU.conc * GLU.dl;
GLU.totalG = GLU.totalMg / 1000;
check(GLU.dl === 50 && GLU.totalMg === 4500 && GLU.totalG === 4.5, 'about 4.5 g of glucose in 5 L of blood');
/** Renal threshold for glucose, typical textbook value (varies between people). */
export const RENAL_THRESHOLD = 180;
/** Illustrative glucose curves after a glucose drink: base + rise × (t/tp)^2 × e^(2(1 − t/tp)). */
export const curve = ({ base, rise, tp }) => (t) => base + rise * (t / tp) ** 2 * Math.exp(2 * (1 - t / tp));
export const NORMAL = { base: 90, rise: 50, tp: 40 };
export const DIABETIC = { base: 150, rise: 110, tp: 75 };
const n = curve(NORMAL);
const d = curve(DIABETIC);
check(Math.abs(n(40) - 140) < 1e-9 && Math.abs(d(75) - 260) < 1e-9, 'peaks 140 and 260');
check(n(120) < 100 && d(180) > RENAL_THRESHOLD, 'normal returns near base; diabetic stays above threshold at 3 h');
export const PEAK = { normal: 140, diabetic: 260 };
/** Values three hours after the drink, rounded to the nearest 5 for the case table. */
export const AFTER3 = { normal: Math.round(n(180) / 5) * 5, diabetic: Math.round(d(180) / 5) * 5 };
check(AFTER3.normal === 90 && AFTER3.diabetic === 190, 'three-hour values');
/** Percent rise from fasting to peak. */
export const RISE_PCT = { normal: pct(PEAK.normal - NORMAL.base, NORMAL.base, 1), diabetic: pct(PEAK.diabetic - DIABETIC.base, DIABETIC.base, 1) };
check(RISE_PCT.normal === 55.6 && RISE_PCT.diabetic === 73.3, 'percent rises');

/** Illustrative half-life arithmetic: fraction left after n half-lives. */
export const leftAfter = (minutes, half) => 0.5 ** (minutes / half);
export const HALF = { half: 10, minutes: 30 };
HALF.left = leftAfter(HALF.minutes, HALF.half);
HALF.leftPct = round(HALF.left * 100, 1);
check(HALF.left === 0.125 && HALF.leftPct === 12.5, 'one eighth left after three half-lives');

/** Illustrative amplification by a second messenger cascade. */
export const AMP = { receptors: 1, cAMPper: 100, productPer: 50 };
AMP.total = AMP.receptors * AMP.cAMPper * AMP.productPer;
check(AMP.total === 5000, 'one hormone molecule, 5000 product molecules');

/** Adrenal cortex layers from outside in. */
export const CORTEX = ['zona glomerulosa', 'zona fasciculata', 'zona reticularis'];
check(CORTEX.length === 3, 'three zones');
