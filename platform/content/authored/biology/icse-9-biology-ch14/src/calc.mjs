// Computed values for ICSE 9 Biology ch14 Aids to Health and Health Organisations (imagined data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Antibody level (arbitrary units) after a first dose on day 0 and a booster on day 28 (imagined, drawn as a graph).
export const DAYS = [0, 7, 14, 21, 28, 35, 42, 49];
export const LEVEL = [0, 2, 8, 5, 3, 72, 60, 48];
export const BOOSTER_DAY = eq(DAYS[4], 28, 'day of the booster');
export const PEAK1 = eq(Math.max(...LEVEL.slice(0, 5)), 8, 'peak after the first dose');
export const PEAK1_DAY = eq(DAYS[LEVEL.indexOf(PEAK1)], 14, 'day of the first peak');
export const PEAK2 = eq(Math.max(...LEVEL), 72, 'peak after the booster');
export const PEAK2_DAY = eq(DAYS[LEVEL.indexOf(PEAK2)], 35, 'day of the second peak');
export const PEAK_RATIO = eq(PEAK2 / PEAK1, 9, 'times higher after the booster');
export const TIME1 = eq(PEAK1_DAY - DAYS[0], 14, 'days from the first dose to its peak');
export const TIME2 = eq(PEAK2_DAY - BOOSTER_DAY, 7, 'days from the booster to its peak');
export const TIME_RATIO = eq(TIME1 / TIME2, 2, 'how many times sooner the second peak came');
export const LEVEL_AT_BOOSTER = eq(LEVEL[4], 3, 'level on the day of the booster');
export const FALL_AFTER = eq(PEAK2 - LEVEL[7], 24, 'fall from the second peak to day 49');

// Deck 1, example 2: an antibiotic course of 3 tablets a day for 10 days; the patient stops after 4 days (imagined).
export const COURSE = { perDay: 3, days: 10, stopAfter: 4 };
export const COURSE_ALL = eq(COURSE.perDay * COURSE.days, 30, 'tablets in the full course');
export const COURSE_TAKEN = eq(COURSE.perDay * COURSE.stopAfter, 12, 'tablets taken');
export const COURSE_LEFT = eq(COURSE_ALL - COURSE_TAKEN, 18, 'tablets left');
export const COURSE_LEFT_PCT = eq((COURSE_LEFT / COURSE_ALL) * 100, 60, 'percentage of the course left');

// Deck 2, example 1: an antiseptic solution made by mixing 20 mL of concentrate with 180 mL of water (imagined).
export const MIX = { conc: 20, water: 180 };
export const MIX_TOTAL = eq(MIX.conc + MIX.water, 200, 'volume of the solution (mL)');
export const MIX_PCT = eq((MIX.conc / MIX_TOTAL) * 100, 10, 'strength of the solution (per cent)');

// Deck 2, example 2: dust particles and germs breathed in; nasal mucus traps most of them (imagined).
export const BREATH = { in: 1000, trapped: 950 };
export const BREATH_PASS = eq(BREATH.in - BREATH.trapped, 50, 'particles that get past the nose');
export const BREATH_PCT = eq((BREATH.trapped / BREATH.in) * 100, 95, 'percentage trapped in the nose');

// Bank: hand washing with an antiseptic soap (imagined).
export const HANDS = { before: 10000, killedPct: 99 };
export const HANDS_LEFT = eq(HANDS.before - (HANDS.before * HANDS.killedPct) / 100, 100, 'bacteria left on the hands');

// Bank: a blood donation camp of the Red Cross (imagined).
export const CAMP = { donors: 40, ml: 350 };
export const CAMP_ML = eq(CAMP.donors * CAMP.ml, 14000, 'blood collected (mL)');
export const CAMP_L = eq(CAMP_ML / 1000, 14, 'blood collected (litres)');

// Bank: relief after a flood (imagined).
export const RELIEF = { families: 480, blankets: 2, rice: 6 };
export const RELIEF_BLANKETS = eq(RELIEF.families * RELIEF.blankets, 960, 'blankets needed');
export const RELIEF_RICE = eq(RELIEF.families * RELIEF.rice, 2880, 'kilograms of rice needed');

// Bank: dates in the history of the two organisations.
export const DATES = { redCross: 1863, who: 1948, smallpox: 1980 };
export const YEARS_TO_SMALLPOX = eq(DATES.smallpox - DATES.who, 32, 'years from the founding of the WHO to the declaration that smallpox was eradicated');
export const YEARS_BETWEEN = eq(DATES.who - DATES.redCross, 85, 'years between the founding of the Red Cross and the WHO');

// Bank (difficulty 4): the nose traps 950 of 1000 particles, then the windpipe traps 80 per cent of what is left (imagined).
export const TWO_STAGE = { in: 1000, nose: 950, windpipePct: 80 };
export const TWO_AFTER_NOSE = eq(TWO_STAGE.in - TWO_STAGE.nose, 50, 'particles after the nose');
export const TWO_TRAPPED_WIND = eq((TWO_AFTER_NOSE * TWO_STAGE.windpipePct) / 100, 40, 'particles trapped in the windpipe');
export const TWO_REACH = eq(TWO_AFTER_NOSE - TWO_TRAPPED_WIND, 10, 'particles that reach the lungs');
