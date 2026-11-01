// Computed values for ICSE 10 Biology ch12 Endocrine System (imagined blood-sugar and urine readings).
export const rise = (from, to) => to - from;
export const times = (a, b, dp = 1) => Math.round((a / b) * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

/** Normal fasting blood sugar band used in the chapter (mg per 100 mL of blood; textbook value). */
export const NORMAL = { low: 80, high: 120 };

// Imagined glucose test: blood sugar (mg per 100 mL) at 0, 1 and 2 hours after a sweet drink.
export const SUGAR = {
  hours: [0, 1, 2],
  ravi: [90, 145, 105], // healthy pancreas
  meena: [170, 290, 260], // too little insulin
};
SUGAR.raviRise = rise(SUGAR.ravi[0], SUGAR.ravi[1]);
SUGAR.raviFall = rise(SUGAR.ravi[2], SUGAR.ravi[1]);
SUGAR.meenaRise = rise(SUGAR.meena[0], SUGAR.meena[1]);
SUGAR.meenaFall = rise(SUGAR.meena[2], SUGAR.meena[1]);
SUGAR.gapAt2h = SUGAR.meena[2] - SUGAR.ravi[2];

// Imagined daily urine volumes (litres): a typical adult and a patient short of ADH.
export const URINE = { normal: 1.5, patient: 9 };
URINE.times = times(URINE.patient, URINE.normal);

// Imagined heart rate before and during a fright (beats per minute).
export const HEART = { rest: 72, fright: 117 };
HEART.rise = rise(HEART.rest, HEART.fright);
HEART.pctRise = pct(HEART.rise, HEART.rest);

if (SUGAR.raviRise !== 55 || SUGAR.raviFall !== 40 || SUGAR.meenaRise !== 120 || SUGAR.meenaFall !== 30 || SUGAR.gapAt2h !== 155 || URINE.times !== 6 || HEART.rise !== 45 || HEART.pctRise !== 63) throw new Error('calc');
