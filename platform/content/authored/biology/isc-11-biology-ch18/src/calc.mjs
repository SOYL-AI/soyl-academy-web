// ISC 11 Biology ch18 Excretory Products and Their Elimination — every number in a stem, answer, table, slide or diagram is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one. */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- nephrons
export const NEPH = { perKidney: 1_000_000, kidneys: 2, juxtaPct: 15 };
export const NEPH_TOTAL = NEPH.perKidney * NEPH.kidneys;
export const JUXTA = round((NEPH_TOTAL * NEPH.juxtaPct) / 100);
export const CORTICAL = NEPH_TOTAL - JUXTA;
eq(NEPH_TOTAL, 2_000_000, 'nephrons in both kidneys');
eq(JUXTA, 300_000, 'juxtamedullary nephrons');
eq(CORTICAL, 1_700_000, 'cortical nephrons');

// ---------------------------------------------------------------- filtration and reabsorption
export const MIN_PER_DAY = 1440;
export const filtrateLitres = (gfrMlMin) => round((gfrMlMin * MIN_PER_DAY) / 1000, 1);
export const GFR = 120; // mL per minute (textbook value is about 125)
export const FILTRATE = filtrateLitres(GFR);
eq(FILTRATE, 172.8, 'filtrate a day at GFR 120');
export const URINE = 1.5; // litres a day
export const REABS = round(FILTRATE - URINE, 1);
export const REABS_PCT = round((REABS / FILTRATE) * 100, 1);
eq(REABS, 171.3, 'litres reabsorbed a day');
eq(REABS_PCT, 99.1, 'percentage of the filtrate reabsorbed');
export const PCT_SHARE = 70;
export const PCT_LITRES = round((FILTRATE * PCT_SHARE) / 100, 1);
eq(PCT_LITRES, 121, 'litres reabsorbed in the proximal tubule');
export const GFR_LOW = 60;
eq(filtrateLitres(GFR_LOW), 86.4, 'filtrate at GFR 60');
// net filtration pressure (mm Hg): glomerular blood pressure minus (capsule pressure + blood osmotic pressure)
export const NFP_IN = { glomerular: 60, capsule: 18, osmotic: 32 };
export const NFP = NFP_IN.glomerular - (NFP_IN.capsule + NFP_IN.osmotic);
eq(NFP, 10, 'net filtration pressure');
export const NFP_FALL = { glomerular: 45 };
export const NFP_AFTER = NFP_FALL.glomerular - (NFP_IN.capsule + NFP_IN.osmotic);
eq(NFP_AFTER, -5, 'net filtration pressure after a fall of blood pressure');
// clearance of a filtered, unreabsorbed substance (creatinine): GFR = U x V / P
export const clearance = (u, v, p) => round((u * v) / p, 1);
export const CLR = { u: 1.5, v: 1.2, p: 0.015 }; // mg per mL, mL per minute, mg per mL
export const CLR_GFR = clearance(CLR.u, CLR.v, CLR.p);
eq(CLR_GFR, 120, 'GFR from creatinine clearance');
export const CLR_PAT = { u: 0.9, v: 1.0, p: 0.018 };
export const CLR_PAT_GFR = clearance(CLR_PAT.u, CLR_PAT.v, CLR_PAT.p);
eq(CLR_PAT_GFR, 50, 'patient GFR from clearance');

// ---------------------------------------------------------------- the medullary gradient (mOsmol per L)
export const GRAD = [['Cortex', 300], ['Outer medulla', 600], ['Mid medulla', 900], ['Inner medulla', 1200]];
export const MAX_CONC = GRAD[GRAD.length - 1][1];
export const FOLD = MAX_CONC / GRAD[0][1];
eq(FOLD, 4, 'urine can be four times as concentrated as the filtrate');
export const PLASMA_OSM = 300;
export const RISE_PER_STEP = GRAD[1][1] - GRAD[0][1];
eq(RISE_PER_STEP, 300, 'rise of osmolarity per step');

// ---------------------------------------------------------------- water balance (mL a day)
export const WATER = { intake: 2500, urine: 1500, skin: 600, lungs: 300, faeces: 100 };
eq(WATER.urine + WATER.skin + WATER.lungs + WATER.faeces, WATER.intake, 'normal day: output equals intake');
export const HOT = { skin: 1500 };
export const HOT_URINE = WATER.intake - (HOT.skin + WATER.lungs + WATER.faeces);
eq(HOT_URINE, 600, 'urine volume that restores balance on a hot day');
export const URINE_FALL_PCT = round(((WATER.urine - HOT_URINE) / WATER.urine) * 100);
eq(URINE_FALL_PCT, 60, 'percentage fall of the urine volume');
export const URINE_UREA_G = 27;
export const URINE_UREA_CONC = round(URINE_UREA_G / URINE, 1);
eq(URINE_UREA_CONC, 18, 'urea concentration in urine (g per litre)');

// ---------------------------------------------------------------- dialysis
export const DIAL = { before: 84, after: 28 }; // mg urea per 100 mL of blood
export const DIAL_REMOVED = round(((DIAL.before - DIAL.after) / DIAL.before) * 100, 1);
eq(DIAL_REMOVED, 66.7, 'percentage of urea removed in one session');
export const DIAL_NORMAL_MAX = 40;
export const DIAL_SESSIONS_PER_WEEK = 3;
export const DIAL_HOURS = 4;
export const DIAL_WEEK_HOURS = DIAL_SESSIONS_PER_WEEK * DIAL_HOURS;
eq(DIAL_WEEK_HOURS, 12, 'hours of dialysis in a week');
export const BLOOD_FLOW = 300; // mL per minute through the dialyser
export const BLOOD_SESSION_L = round((BLOOD_FLOW * DIAL_HOURS * 60) / 1000, 1);
eq(BLOOD_SESSION_L, 72, 'litres of blood passed through the dialyser in one session');

// ---------------------------------------------------------------- numbers for the question bank (different from the worked examples)
export const GFR80 = 80;
eq(filtrateLitres(GFR80), 115.2, 'filtrate a day at GFR 80');
export const REAB2 = { gfr: 110, urine: 1.8 };
export const FIL2 = filtrateLitres(REAB2.gfr);
export const REAB2_L = round(FIL2 - REAB2.urine, 1);
export const REAB2_PCT = round((REAB2_L / FIL2) * 100, 1);
eq(FIL2, 158.4, 'filtrate a day at GFR 110');
eq(REAB2_L, 156.6, 'litres reabsorbed, second example');
eq(REAB2_PCT, 98.9, 'percentage reabsorbed, second example');
export const NFP2_IN = { glomerular: 66, capsule: 15, osmotic: 28 };
export const NFP2 = NFP2_IN.glomerular - (NFP2_IN.capsule + NFP2_IN.osmotic);
eq(NFP2, 23, 'second net filtration pressure');
export const CLR_B = { u: 0.6, v: 1.5, p: 0.012 };
export const CLR_B_GFR = clearance(CLR_B.u, CLR_B.v, CLR_B.p);
eq(CLR_B_GFR, 75, 'clearance, before illness');
export const CLR_A = { u: 0.6, v: 1.5, p: 0.03 };
export const CLR_A_GFR = clearance(CLR_A.u, CLR_A.v, CLR_A.p);
eq(CLR_A_GFR, 30, 'clearance, after illness');
export const CLR_FALL_PCT = round(((CLR_B_GFR - CLR_A_GFR) / CLR_B_GFR) * 100);
eq(CLR_FALL_PCT, 60, 'percentage fall of the GFR');
export const NEPH2 = { perKidney: 1_100_000, juxtaPct: 15 };
export const NEPH2_JUXTA = round((NEPH2.perKidney * NEPH2.juxtaPct) / 100);
eq(NEPH2_JUXTA, 165_000, 'juxtamedullary nephrons in one kidney');
export const OSM2 = { filtrate: 300, urine: 840 };
export const OSM2_FOLD = round(OSM2.urine / OSM2.filtrate, 1);
eq(OSM2_FOLD, 2.8, 'concentration of the urine against the filtrate');
export const DIAL2 = { before: 120, after: 45 };
export const DIAL2_PCT = round(((DIAL2.before - DIAL2.after) / DIAL2.before) * 100, 1);
eq(DIAL2_PCT, 62.5, 'percentage of urea removed, second example');
export const COLD = { skin: 300 };
export const COLD_URINE = WATER.intake - (COLD.skin + WATER.lungs + WATER.faeces);
eq(COLD_URINE, 1800, 'urine on a cold day');
export const UREA2 = { g: 30, litres: 1.2 };
export const UREA2_CONC = round(UREA2.g / UREA2.litres, 1);
eq(UREA2_CONC, 25, 'urea concentration of the second urine');
export const SURFACE = { milliL: 200, hours: 1 };
export const CO2_HOUR_L = round((SURFACE.milliL * 60) / 1000, 1);
eq(CO2_HOUR_L, 12, 'carbon dioxide breathed out in an hour (litres)');
export const LOOP = { gfr: 125, pctShare: 70 };
export const LOOP_IN = round((LOOP.gfr * (100 - LOOP.pctShare)) / 100, 1);
eq(LOOP_IN, 37.5, 'filtrate entering the loop of Henle each minute');
export const FLUIDS = { plasma: { protein: 7.0, glucose: 0.1, urea: 0.03 }, filtrate: { protein: 0, glucose: 0.1, urea: 0.03 }, urine: { protein: 0, glucose: 0, urea: 2.0 } };
export const REAB2_EXACT = round((REAB2_L / FIL2) * 100, 2);
eq(REAB2_EXACT, 98.86, 'exact percentage reabsorbed, second example');
