// Computed values for ICSE 9 Biology ch06 Respiration in Plants (imagined experiment data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const pct = (part, whole) => round((part / whole) * 100, 1);

// Aerobic respiration: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + energy. Anaerobic (plants, yeast): C6H12O6 -> 2 C2H5OH + 2 CO2 + energy.
export const AERO = { glucose: 1, o2: 6, co2: 6, water: 6 };
export const ANAERO = { glucose: 1, ethanol: 2, co2: 2 };
// Atoms balance in the aerobic equation (6 C, 12 H, 18 O on each side) and in the anaerobic one.
eq([6 * 1, 12 * 1, 6 * 1 + 6 * 2], [6, 12, 18], 'atoms in glucose plus six oxygen: C, H, O');
eq([AERO.co2 * 1, AERO.water * 2, AERO.co2 * 2 + AERO.water * 1], [6, 12, 18], 'atoms in six carbon dioxide plus six water: C, H, O');
eq([ANAERO.ethanol * 2 + ANAERO.co2 * 1, ANAERO.ethanol * 6, ANAERO.ethanol * 1 + ANAERO.co2 * 2], [6, 12, 6], 'atoms in two ethanol plus two carbon dioxide: C, H, O');

// Worked example 1: five glucose molecules respired aerobically.
export const N5 = 5;
export const N5_O2 = eq(N5 * AERO.o2, 30, 'oxygen molecules for 5 glucose');
export const N5_CO2 = eq(N5 * AERO.co2, 30, 'carbon dioxide molecules from 5 glucose');
export const N5_WATER = eq(N5 * AERO.water, 30, 'water molecules from 5 glucose');
// Worked example 2 and bank: eight glucose molecules respired anaerobically.
export const N8 = 8;
export const N8_ETHANOL = eq(N8 * ANAERO.ethanol, 16, 'ethanol molecules from 8 glucose');
export const N8_CO2 = eq(N8 * ANAERO.co2, 16, 'carbon dioxide molecules from 8 glucose anaerobically');
// Carbon counted through glycolysis: glucose (6 carbons) splits into 2 pyruvate (3 carbons each).
export const GLUCOSE_C = 6;
export const PYRUVATE_C = 3;
export const PYRUVATES = eq(GLUCOSE_C / PYRUVATE_C, 2, 'pyruvate molecules from one glucose');
export const PYRUVATES_FROM_4 = eq(4 * PYRUVATES, 8, 'pyruvate molecules from 4 glucose');
// Energy yield taken as 2 ATP (anaerobic) and about 36 ATP (aerobic) per glucose (books give 36 to 38).
export const ATP_ANAERO = 2;
export const ATP_AERO = 36;
export const ATP_RATIO = eq(ATP_AERO / ATP_ANAERO, 18, 'aerobic compared with anaerobic ATP');
export const ATP_12 = eq(12 * ATP_ANAERO, 24, 'ATP from 12 glucose anaerobically');

// Experiment: lime water in two flasks of germinating seeds (imagined): time to turn milky.
export const LIME = [{ mass: 25, minutes: 36 }, { mass: 50, minutes: 18 }];
export const LIME_RATIO = eq(LIME[0].minutes / LIME[1].minutes, 2, 'ratio of times to turn milky');
export const LIME_DIFF = eq(LIME[0].minutes - LIME[1].minutes, 18, 'minutes saved with double the seeds');

// Experiment: thermometer readings in two vacuum flasks (degrees Celsius), day 0 to day 4 (imagined).
export const FLASK_A = [22, 24, 26, 28, 30]; // germinating seeds
export const FLASK_B = [22, 22, 22, 22, 22]; // boiled seeds (control)
export const RISE_A = eq(FLASK_A[4] - FLASK_A[0], 8, 'rise in flask A');
export const RISE_B = eq(FLASK_B[4] - FLASK_B[0], 0, 'rise in flask B');
export const RISE_PER_DAY = eq(RISE_A / 4, 2, 'mean rise per day in flask A');
export const A_BEYOND_B = eq(FLASK_A[4] - FLASK_B[4], 8, 'difference between the flasks on day 4');

// Bank: yeast in sugar solution gives off carbon dioxide (imagined).
export const YEAST_ML = 45;
export const YEAST_MIN = 30;
export const YEAST_RATE = eq(YEAST_ML / YEAST_MIN, 1.5, 'carbon dioxide each minute (mL)');
// Bank: a leaf has 1200 stomata on a patch and 3 out of 4 are open in light.
export const STOMATA = 1200;
export const STOMATA_OPEN = eq((STOMATA * 3) / 4, 900, 'open stomata');
export const STOMATA_SHUT = eq(STOMATA - STOMATA_OPEN, 300, 'closed stomata');
