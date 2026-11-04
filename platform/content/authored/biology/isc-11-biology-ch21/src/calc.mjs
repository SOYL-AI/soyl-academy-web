// ISC 11 Biology ch21 Chemical Coordination and Integration: every number used in a stem, answer, table, slide or diagram is computed here.
// A negative-feedback model of thyroxine control, a glucose-tolerance model for normal and diabetic subjects, calcium homeostasis, and water loss in diabetes insipidus.
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws unless the computed value matches the expected one: guards every number printed in the chapter. */
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

// ---------------------------------------------------------------- negative feedback on thyroxine (percent of the set point)
/**
 * One step of a simple proportional loop: the pituitary raises TSH in proportion to the shortfall of thyroxine below the set point
 * (and lowers it when thyroxine is above), and each step the thyroid adds thyroxine in proportion to TSH while the body uses up a fixed
 * fraction of the thyroxine. Values are percent of the normal level; the model is illustrative.
 */
export const LOOP = { set: 100, gain: 1.0, use: 0.25 };
export const tsh = (t4) => Math.max(0, round(LOOP.set + LOOP.gain * (LOOP.set - t4) * 1, 1));
export function loop(t4Start, steps) {
  const out = [{ step: 0, t4: t4Start, tsh: tsh(t4Start) }];
  let t4 = t4Start;
  for (let i = 1; i <= steps; i++) {
    t4 = round(t4 + LOOP.use * (tsh(t4) - t4), 1);
    out.push({ step: i, t4, tsh: tsh(t4) });
  }
  return out;
}
export const LOW_START = 40; // thyroxine after removal of part of the gland, percent of normal
export const HIGH_START = 160; // thyroxine after an overdose of tablets, percent of normal
export const LOW = loop(LOW_START, 8);
export const HIGH = loop(HIGH_START, 8);
eq(LOW[0].tsh, 160, 'TSH when thyroxine is at 40 percent');
eq(HIGH[0].tsh, 40, 'TSH when thyroxine is at 160 percent');
eq(LOW[LOW.length - 1].t4 > 95 && LOW[LOW.length - 1].t4 <= 100, true, 'thyroxine returns near the set point from below');
eq(HIGH[HIGH.length - 1].t4 < 105 && HIGH[HIGH.length - 1].t4 >= 100, true, 'thyroxine returns near the set point from above');
eq(LOW.every((p, i) => i === 0 || p.t4 > LOW[i - 1].t4), true, 'thyroxine rises at every step');

// ---------------------------------------------------------------- glucose tolerance model (mg per dL; hours)
export const NORMAL_RANGE = [70, 110]; // fasting blood glucose, illustrative
export const GTT_LIMITS = { fasting: 126, twoHour: 200 }; // usual diagnostic limits for diabetes mellitus
const bump = (g0, a, tau) => (t) => round(g0 + a * (t / tau) * Math.exp(1 - t / tau), 0);
export const GTT_NORMAL = bump(90, 60, 0.75);
export const GTT_DIABETIC = bump(140, 130, 1.5);
export const GTT_TIMES = [0, 0.5, 1, 1.5, 2];
export const GN = GTT_TIMES.map(GTT_NORMAL);
export const GD = GTT_TIMES.map(GTT_DIABETIC);
eq(GN, [90, 146, 147, 134, 120], 'normal glucose tolerance values');
eq(GD, [140, 224, 261, 270, 264], 'diabetic glucose tolerance values');
export const peakOf = (arr) => Math.max(...arr);
export const riseOf = (arr) => peakOf(arr) - arr[0];
eq(riseOf(GN), 57, 'rise of the normal subject');
eq(riseOf(GD), 130, 'rise of the diabetic subject');
export const verdict = (fasting, two) => (fasting >= GTT_LIMITS.fasting || two >= GTT_LIMITS.twoHour ? 'diabetes mellitus' : 'normal');
eq(verdict(GN[0], GN[4]), 'normal', 'verdict for the normal subject');
eq(verdict(GD[0], GD[4]), 'diabetes mellitus', 'verdict for the diabetic subject');
/** Fall of glucose between the peak and the 2 hour sample, percent of the peak. */
export const fallPct = (arr) => round(((peakOf(arr) - arr[arr.length - 1]) / peakOf(arr)) * 100, 1);
eq(fallPct(GN), 18.4, 'percent fall of the normal subject from the peak');

// ---------------------------------------------------------------- calcium and water balance
export const CA_RANGE = [9, 11]; // blood calcium, mg per dL, illustrative
export const CA_PATIENT = 7.6;
export const caBelow = round(CA_RANGE[0] - CA_PATIENT, 1);
eq(caBelow, 1.4, 'calcium below the lower limit');
export const URINE = { normal: 1.5, insipidus: 12 }; // litres per day
export const URINE_FOLD = round(URINE.insipidus / URINE.normal, 1);
export const URINE_EXTRA = round(URINE.insipidus - URINE.normal, 1);
eq(URINE_FOLD, 8, 'times more urine in diabetes insipidus');
eq(URINE_EXTRA, 10.5, 'extra litres of urine per day');
export const WEEK_LOSS = round(URINE.insipidus * 7, 1);
eq(WEEK_LOSS, 84, 'litres of urine in a week');

// ---------------------------------------------------------------- counts
export const PARATHYROIDS = 4;
export const GI_HORMONES = ['gastrin', 'secretin', 'GIP', 'CCK-PZ'];
eq(GI_HORMONES.length, 4, 'gastrointestinal hormones');
export const PITUITARY_ANTERIOR = ['GH', 'PRL', 'TSH', 'ACTH', 'LH', 'FSH'];
eq(PITUITARY_ANTERIOR.length, 6, 'anterior pituitary hormones');
export const ADRENAL_CORTEX_LAYERS = 3;
export const caBelowPct = round((caBelow / CA_RANGE[0]) * 100, 1);
eq(caBelowPct, 15.6, 'percent below the lower calcium limit');
/** Extra numbers used in the question bank. */
export const TSH_AT_50 = tsh(50);
eq(TSH_AT_50, 150, 'TSH when thyroxine is at 50 percent');
export const RESPONSE_GAP = round(LOW[1].t4 - LOW[0].t4, 1);
eq(RESPONSE_GAP, 30, 'thyroxine gained in the first step');
export const WATER_MULT = URINE_FOLD;

// ---------------------------------------------------------------- data sets used only in the question bank
export const GTT_R = [85, 150, 160, 120, 95]; // a healthy subject
export const GTT_S = [135, 230, 270, 280, 250]; // a subject with diabetes mellitus
eq(riseOf(GTT_R), 75, 'rise of subject R');
eq(riseOf(GTT_S), 145, 'rise of subject S');
eq(fallPct(GTT_R), 40.6, 'percent fall of subject R from the peak');
eq(verdict(GTT_R[0], GTT_R[4]), 'normal', 'verdict for subject R');
eq(verdict(GTT_S[0], GTT_S[4]), 'diabetes mellitus', 'verdict for subject S');
export const CA2 = 8.1;
export const ca2Below = round(CA_RANGE[0] - CA2, 1);
eq(ca2Below, 0.9, 'calcium shortfall of the second patient');
export const URINE_Q = 9; // litres per day in a second patient
export const URINE_Q_FOLD = round(URINE_Q / URINE.normal, 1);
eq(URINE_Q_FOLD, 6, 'times the normal urine volume');
