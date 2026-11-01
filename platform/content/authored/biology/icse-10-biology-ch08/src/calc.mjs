// Computed values for ICSE 10 Biology ch08 (heart rate, cardiac cycle, cardiac output, pulse counts, blood pressure).
const r2 = (x) => Math.round(x * 100) / 100;

/** Length of one cardiac cycle (s) at a given heart rate (beats per minute). */
export const cycleSec = (bpm) => r2(60 / bpm);
/** Cardiac output (litres per minute) = heart rate × stroke volume (mL). */
export const outputLpm = (bpm, strokeMl) => r2((bpm * strokeMl) / 1000);
/** Beats per minute from a count over a number of seconds. */
export const perMinute = (beats, seconds) => Math.round((beats * 60) / seconds);

// Textbook cardiac cycle at 75 beats per minute: atrial systole, ventricular systole, joint diastole (s).
export const CYCLE = { bpm: 75, atrial: 0.1, ventricular: 0.3, diastole: 0.4 };
CYCLE.total = r2(CYCLE.atrial + CYCLE.ventricular + CYCLE.diastole);
CYCLE.check = cycleSec(CYCLE.bpm);

// Resting adult: heart rate and stroke volume.
export const REST = { bpm: 72, stroke: 70 };
REST.output = outputLpm(REST.bpm, REST.stroke);
REST.cycle = cycleSec(REST.bpm);

// Imagined pulse experiment: beats counted in 15 s at rest and just after skipping.
export const PULSE = { seconds: 15, rest: 18, after: 31 };
PULSE.restRate = perMinute(PULSE.rest, PULSE.seconds);
PULSE.afterRate = perMinute(PULSE.after, PULSE.seconds);
PULSE.rise = PULSE.afterRate - PULSE.restRate;

// Blood pressure reading in mm of mercury.
export const BP = { systolic: 120, diastolic: 80 };
BP.difference = BP.systolic - BP.diastolic;

// An athlete during a race.
export const RACE = { bpm: 160, stroke: 120 };
RACE.output = outputLpm(RACE.bpm, RACE.stroke);

// A trained athlete at rest pumps the same volume per minute as REST with fewer beats.
export const ATHLETE = { bpm: 56 };
ATHLETE.stroke = Math.round((REST.output * 1000) / ATHLETE.bpm);

// Imagined blood samples an hour after a meal (mg per 100 mL).
export const MEAL = { hpvGlucose: 160, hvGlucose: 100, raUrea: 30, rvUrea: 18 };
MEAL.glucoseTaken = MEAL.hpvGlucose - MEAL.hvGlucose;
MEAL.ureaRemoved = MEAL.raUrea - MEAL.rvUrea;

if (ATHLETE.stroke !== 90 || MEAL.glucoseTaken !== 60 || MEAL.ureaRemoved !== 12 || CYCLE.total !== 0.8 || CYCLE.check !== 0.8 || REST.output !== 5.04 || REST.cycle !== 0.83 || PULSE.restRate !== 72 || PULSE.afterRate !== 124 || PULSE.rise !== 52 || BP.difference !== 40 || RACE.output !== 19.2) throw new Error('calc');
