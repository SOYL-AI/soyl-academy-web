// Computed values for ICSE 10 Biology ch09 (filtration rate, daily filtrate, reabsorption, urea concentration).
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

/** Litres of glomerular filtrate a day from a filtration rate in mL per minute. */
export const filtrateLitresPerDay = (mlPerMin) => (mlPerMin * 60 * 24) / 1000;

// Both kidneys of an adult: filtration rate and daily urine.
export const KID = { gfr: 125, urine: 1.5 };
KID.filtrate = filtrateLitresPerDay(KID.gfr);
KID.reabsorbed = Math.round((KID.filtrate - KID.urine) * 10) / 10;
KID.pctReabsorbed = pct(KID.reabsorbed, KID.filtrate);
KID.pctPassed = Math.round((100 - KID.pctReabsorbed) * 10) / 10;

// Typical concentrations (g per 100 mL) in plasma, glomerular filtrate and urine.
export const COMP = {
  protein: [7, 0, 0],
  glucose: [0.1, 0.1, 0],
  urea: [0.03, 0.03, 2],
  salts: [0.9, 0.9, 1.5],
};
COMP.ureaFactor = Math.round(COMP.urea[2] / COMP.urea[0]);

// Imagined day of a student: water lost by each route (mL).
export const WATER = { urine: 1500, sweat: 450, breath: 350, faeces: 150 };
WATER.total = WATER.urine + WATER.sweat + WATER.breath + WATER.faeces;
WATER.pctUrine = pct(WATER.urine, WATER.total);

if (KID.filtrate !== 180 || KID.reabsorbed !== 178.5 || KID.pctReabsorbed !== 99.2 || KID.pctPassed !== 0.8 || COMP.ureaFactor !== 67 || WATER.total !== 2450 || WATER.pctUrine !== 61.2) throw new Error('calc');
