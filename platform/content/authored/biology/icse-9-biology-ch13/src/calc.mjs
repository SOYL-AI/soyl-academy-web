// Computed values for ICSE 9 Biology ch13 Diseases and their Transmission (imagined data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Deck 1, example 1: a town normally records 4 cases of a disease a month; one month it records 92.
export const USUAL = 4;
export const SURGE = 92;
export const SURGE_RATIO = eq(SURGE / USUAL, 23, 'times the usual number of cases');
export const SURGE_EXTRA = eq(SURGE - USUAL, 88, 'extra cases above the usual');

// Deck 1, example 2: tracing the source. Ward P drinks from a broken pipe, ward Q from a covered well (imagined).
export const WARD = { P: { pop: 2000, cases: 48 }, Q: { pop: 2500, cases: 5 } };
export const RATE_P = eq((WARD.P.cases / WARD.P.pop) * 1000, 24, 'cases per 1000 in ward P');
export const RATE_Q = eq((WARD.Q.cases / WARD.Q.pop) * 1000, 2, 'cases per 1000 in ward Q');
export const RATE_RATIO = eq(RATE_P / RATE_Q, 12, 'ward P rate over ward Q rate');

// Deck 2, example 1: a malaria patient has fever peaks on days 3, 6 and 9.
export const FEVER_DAYS = [3, 6, 9];
export const FEVER_GAP = eq(FEVER_DAYS[1] - FEVER_DAYS[0], 3, 'days between fever peaks');
eq(FEVER_DAYS[2] - FEVER_DAYS[1], FEVER_GAP, 'second gap equals the first');
export const FEVER_NEXT = eq(FEVER_DAYS[2] + FEVER_GAP, 12, 'day of the next fever peak');

// Deck 2, example 2: breeding places of mosquitoes in a colony (imagined).
export const POTS = { n: 12, larvae: 50, emptied: 9 };
export const LARVAE_BEFORE = eq(POTS.n * POTS.larvae, 600, 'larvae before emptying');
export const POTS_LEFT = eq(POTS.n - POTS.emptied, 3, 'containers left with water');
export const LARVAE_AFTER = eq(POTS_LEFT * POTS.larvae, 150, 'larvae after emptying');
export const LARVAE_DROP = eq(LARVAE_BEFORE - LARVAE_AFTER, 450, 'larvae removed');
export const LARVAE_PCT = eq((LARVAE_DROP / LARVAE_BEFORE) * 100, 75, 'percentage fall in larvae');

// Bank: a boarding school of 200 pupils; 18 get chicken pox in a month (imagined).
export const SCHOOL = { pupils: 200, cases: 18 };
export const SCHOOL_PCT = eq((SCHOOL.cases / SCHOOL.pupils) * 100, 9, 'percentage of pupils with chicken pox');
export const SCHOOL_WELL = eq(SCHOOL.pupils - SCHOOL.cases, 182, 'pupils who stayed well');

// Bank: weekly new cases in an outbreak (imagined), shown as a bar chart.
export const WEEKLY = [2, 10, 38, 66, 40, 12];
export const WEEK_TOTAL = eq(WEEKLY.reduce((a, b) => a + b, 0), 168, 'total cases over six weeks');
export const PEAK = eq(Math.max(...WEEKLY), 66, 'highest weekly count');
export const PEAK_WEEK = eq(WEEKLY.indexOf(PEAK) + 1, 4, 'week with the highest count');
export const PEAK_OVER_FIRST = eq(PEAK / WEEKLY[0], 33, 'peak over week one');
export const FALL_AFTER_PEAK = eq(PEAK - WEEKLY[5], 54, 'fall from the peak to week six');

// Bank: a cholera patient passes 10 watery stools in a day, about 400 mL each (imagined).
export const STOOLS = { n: 10, ml: 400 };
export const WATER_LOST_ML = eq(STOOLS.n * STOOLS.ml, 4000, 'fluid lost in a day (mL)');
export const WATER_LOST_L = eq(WATER_LOST_ML / 1000, 4, 'fluid lost in a day (litres)');

// Bank: bed nets for filariasis in a village of 150 houses (imagined).
export const NETS = { houses: 150, with: 105 };
export const NETS_PCT = eq((NETS.with / NETS.houses) * 100, 70, 'percentage of houses with nets');
export const NETS_WITHOUT = eq(NETS.houses - NETS.with, 45, 'houses without nets');

// Bank: screened blood units (imagined).
export const BLOOD = { screened: 500, infected: 2 };
export const BLOOD_SAFE = eq(BLOOD.screened - BLOOD.infected, 498, 'units that passed the screening');

// Bank: a tuberculosis patient loses weight (imagined).
export const WT = { start: 54, end: 48, months: 3 };
export const WT_LOSS = eq(WT.start - WT.end, 6, 'weight lost (kg)');
export const WT_PER_MONTH = eq(WT_LOSS / WT.months, 2, 'mean weight lost each month (kg)');

// Bank: a typhoid patient's evening temperature on four days (imagined).
export const TEMPS = [38.5, 39.2, 39.8, 40.0];
export const TEMP_RISE = eq(round(TEMPS[3] - TEMPS[0], 1), 1.5, 'rise in evening temperature over four days');

// Bank: a female mosquito lays 3 batches of 120 eggs (imagined).
export const EGGS = { batches: 3, each: 120 };
export const EGGS_TOTAL = eq(EGGS.batches * EGGS.each, 360, 'eggs laid in all');

// Bank: roundworm eggs on a vegetable sample, before and after washing (imagined).
export const WASH = { before: 80, after: 8 };
export const WASH_DROP = eq(WASH.before - WASH.after, 72, 'eggs removed by washing');
export const WASH_FACTOR = eq(WASH.before / WASH.after, 10, 'times fewer eggs after washing');

// Bank (difficulty 4): two villages compared by cases per 1000 people (imagined).
export const VIL = { M: { pop: 3000, cases: 60 }, N: { pop: 5000, cases: 70 } };
export const VIL_M = eq((VIL.M.cases / VIL.M.pop) * 1000, 20, 'cases per 1000 in village M');
export const VIL_N = eq((VIL.N.cases / VIL.N.pop) * 1000, 14, 'cases per 1000 in village N');
export const VIL_DIFF = eq(VIL_M - VIL_N, 6, 'how much higher the rate in M is');
