// Computed values for ICSE 9 Physics ch01 Measurements and Experimentation.
// Every number that appears in a stem, model answer, table or slide is computed here and asserted with eq().
// Conventions: pi = 3.14 and g = 10 m s^-2 unless a stem says otherwise; 1 lb = 0.4536 kg; 1 ft = 30.48 cm.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;
export const PI = 3.14;
export const G = 10;

// ---------------------------------------------------------------- units and conversions
export const KMH_TO_MS = (v) => (v * 1000) / 3600;
export const SPEED = { a: 54, b: 108, c: 90 };
export const SPEED_MS = { a: eq(KMH_TO_MS(54), 15, '54 km/h'), b: eq(KMH_TO_MS(108), 30, '108 km/h'), c: eq(KMH_TO_MS(90), 25, '90 km/h') };
export const GCM3_TO_KGM3 = (d) => d * 1000; // 1 g cm^-3 = 10^-3 kg / 10^-6 m^3 = 1000 kg m^-3
export const DENS = { oil: eq(GCM3_TO_KGM3(0.8), 800, '0.8 g/cm3'), alu: eq(GCM3_TO_KGM3(2.7), 2700, '2.7 g/cm3'), brass: eq(GCM3_TO_KGM3(8.4), 8400, '8.4 g/cm3'), x: eq(GCM3_TO_KGM3(2.5), 2500, '2.5 g/cm3') };
export const LB_KG = 0.4536;
export const PARCEL_LB = 20;
export const PARCEL_KG = eq(round(PARCEL_LB * LB_KG, 2), 9.07, '20 lb in kg');
export const FOOT_CM = 30.48;
export const HEIGHT_FT = 5.5;
export const HEIGHT_CM = eq(round(HEIGHT_FT * FOOT_CM, 2), 167.64, '5.5 ft in cm');
export const HEIGHT_M = eq(round(HEIGHT_CM / 100, 4), 1.6764, '5.5 ft in m');
export const HEIGHT_M2 = eq(round(HEIGHT_M, 2), 1.68, '5.5 ft in m to 2 dp');
// momentum of a 0.5 kg ball at 12 m/s in SI and cgs
export const BALL = { m: 0.5, v: 12 };
export const BALL_P = eq(BALL.m * BALL.v, 6, 'momentum SI');
export const BALL_P_CGS = eq(BALL.m * 1000 * BALL.v * 100, 600000, 'momentum cgs');

// ---------------------------------------------------------------- least count
export const lcFromDivisions = (range, n) => range / n; // value of one division
export const LC = {
  rule_mm: 1,
  cylA: eq(lcFromDivisions(10, 5), 2, 'cylinder: 10 mL over 5 divisions = 2 mL'),
  cylB: eq(lcFromDivisions(250, 50), 5, 'cylinder: 250 mL over 50 divisions'),
  cylC: eq(lcFromDivisions(100, 40), 2.5, 'cylinder: 100 mL over 40 divisions'),
  watch: eq(round(lcFromDivisions(60, 300), 1), 0.2, 'stopwatch: 60 s over 300 divisions'),
};
// cylinder reading figure
export const CYL_LEVEL = 46;
eq(CYL_LEVEL % LC.cylA, 0, 'level 46 mL is on a 2 mL division');
// timing a ball falling 2.0 m with g = 10 m s^-2
export const FALL_H = 2.0;
export const FALL_T = eq(round(Math.sqrt((2 * FALL_H) / G), 2), 0.63, 'fall time 2 m');
export const FALL_ERR_COARSE = eq(round((0.1 / FALL_T) * 100, 0), 16, 'percentage uncertainty with 0.1 s');
export const FALL_ERR_FINE = eq(round((0.01 / FALL_T) * 100, 1), 1.6, 'percentage uncertainty with 0.01 s');
// the same stopwatch used for one oscillation and for twenty
export const SW_LC = 0.1;
export const OSC20_ERR = eq(round(SW_LC / 20, 3), 0.005, 'error in one period from 20 oscillations');
// measuring a wire of diameter 0.85 mm
export const WIRE_D_MM = 0.85;
export const RULE_FRAC = eq(round((1 / WIRE_D_MM) * 100, 0), 118, 'rule LC over wire diameter, percent');
export const VER_FRAC = eq(round((0.1 / WIRE_D_MM) * 100, 0), 12, 'Vernier LC over wire diameter, percent');
export const SCR_FRAC = eq(round((0.01 / WIRE_D_MM) * 100, 1), 1.2, 'screw gauge LC over wire diameter, percent');

// ---------------------------------------------------------------- Vernier callipers (1 MSD = 1 mm, 10 VSD = 9 MSD, LC = 0.1 mm)
// A reading is msr (whole millimetres on the main scale) and n (the vernier line that coincides with a main-scale line).
export const VLC_MM = 0.1;
export const vlcFrom = (msdMm, nVsd) => round(msdMm / nVsd, 4); // N vernier divisions = (N - 1) main divisions
export const VLC = { ten: eq(vlcFrom(1, 10), 0.1, '10 VSD = 9 MSD'), twenty: eq(vlcFrom(1, 20), 0.05, '20 VSD = 19 MSD'), half: eq(vlcFrom(0.5, 10), 0.05, 'MSD 0.5 mm, 10 VSD = 9 MSD') };
/** Reading in tenths of a millimetre (integer): msr * 10 + n. */
export const vTenths = ({ msr, n }) => msr * 10 + n;
export const vCm = (r) => round(vTenths(r) / 100, 2);
/** Vernier zero position in mm for a reading, and the coinciding-line check. */
export function vernierZero({ msr, n }) {
  const z = msr + n * 0.1;
  const j = z + 0.9 * n; // position of the n-th vernier line
  if (Math.abs(j - Math.round(j)) > 1e-9) throw new Error('vernier line n does not coincide with a main-scale line');
  for (let k = 1; k < 10; k++) {
    if (k === n) continue;
    const p = z + 0.9 * k;
    if (Math.abs(p - Math.round(p)) < 1e-9) throw new Error(`vernier lines ${n} and ${k} both coincide`);
  }
  return z;
}
export const V = {
  ex1: { msr: 23, n: 4 },
  exClosed: { msr: 0, n: 3 }, // +0.03 cm
  ex2: { msr: 14, n: 8 },
  q1: { msr: 36, n: 6 },
  qMcq: { msr: 12, n: 9 },
  q2: { msr: 27, n: 5 },
  q2Closed: { msr: 0, n: 2 },
  longClosed: { msr: 0, n: 8 }, // negative error: the vernier zero lies left of the main zero
  longObs: { msr: 45, n: 3 },
  bob: { msr: 30, n: 4 },
};
eq(vCm(V.ex1), 2.34, 'Vernier example 1');
eq(vCm(V.exClosed), 0.03, 'Vernier closed example');
eq(vCm(V.ex2), 1.48, 'Vernier example 2 observed');
export const EX2_TRUE = eq(round(vCm(V.ex2) - vCm(V.exClosed), 2), 1.45, 'Vernier example 2 true');
eq(vCm(V.q1), 3.66, 'Vernier question 1');
eq(vCm(V.qMcq), 1.29, 'Vernier MCQ');
eq(vCm(V.q2), 2.75, 'Vernier question 2 observed');
eq(vCm(V.q2Closed), 0.02, 'Vernier question 2 closed');
export const Q2_TRUE = eq(round(vCm(V.q2) - vCm(V.q2Closed), 2), 2.73, 'Vernier question 2 true');
// negative zero error: vernier zero is 0.2 mm left of the main zero, so the 8th line coincides: error = -(10 - 8) x 0.01 cm
export const LONG_ZERO_CM = eq(round(-(10 - V.longClosed.n) * 0.01, 2), -0.02, 'negative zero error');
eq(vCm(V.longObs), 4.53, 'Vernier long observed');
export const LONG_TRUE = eq(round(vCm(V.longObs) - LONG_ZERO_CM, 2), 4.55, 'Vernier long true');
export const BOB_D = eq(vCm(V.bob), 3.04, 'bob diameter');
export const BOB_R = eq(round(BOB_D / 2, 2), 1.52, 'bob radius');
for (const [k, v] of Object.entries(V)) if (k !== 'longClosed' && k !== 'exClosed' && k !== 'q2Closed') vernierZero(v);
vernierZero(V.exClosed);
vernierZero(V.q2Closed);

// ---------------------------------------------------------------- micrometre screw gauge (pitch 1 mm, 100 divisions, LC 0.01 mm)
export const PITCH = 1;
export const DIVS = 100;
export const SLC_MM = eq(round(PITCH / DIVS, 3), 0.01, 'screw gauge least count');
export const slcFrom = (advanceMm, turns, divs) => round(advanceMm / turns / divs, 4);
export const SLC = { half: eq(slcFrom(3, 6, 50), 0.01, '3 mm in 6 turns, 50 divisions'), pitch: eq(round(3 / 6, 2), 0.5, 'pitch 0.5 mm') };
export const sMm = ({ msr, csr }) => round(msr + csr * SLC_MM, 2);
export const S_ = {
  ex1: { msr: 5, csr: 37 },
  exClosed: { csr: 6 }, // +0.06 mm
  ex2: { msr: 2, csr: 43 },
  q1: { msr: 1, csr: 62 },
  qMcq: { msr: 3, csr: 28 },
  q2: { msr: 0, csr: 71 },
  q2Closed: { csr: 94 }, // -0.06 mm
  longClosed: { csr: 4 }, // +0.04 mm
  longObs: { msr: 1, csr: 49 },
  shortClosed: { csr: 97 }, // -0.03 mm
};
eq(sMm(S_.ex1), 5.37, 'screw gauge example 1');
export const EXS_ZERO = eq(round(S_.exClosed.csr * SLC_MM, 2), 0.06, 'screw gauge example zero error');
eq(sMm(S_.ex2), 2.43, 'screw gauge example 2 observed');
export const EXS_TRUE = eq(round(sMm(S_.ex2) - EXS_ZERO, 2), 2.37, 'screw gauge example 2 true');
eq(sMm(S_.q1), 1.62, 'screw gauge question 1');
eq(sMm(S_.qMcq), 3.28, 'screw gauge MCQ');
eq(sMm(S_.q2), 0.71, 'screw gauge question 2 observed');
export const Q2S_ZERO = eq(round(-(DIVS - S_.q2Closed.csr) * SLC_MM, 2), -0.06, 'screw gauge question 2 zero error');
export const Q2S_TRUE = eq(round(sMm(S_.q2) - Q2S_ZERO, 2), 0.77, 'screw gauge question 2 true');
export const LONGS_ZERO = eq(round(S_.longClosed.csr * SLC_MM, 2), 0.04, 'screw gauge long zero error');
eq(sMm(S_.longObs), 1.49, 'screw gauge long observed');
export const LONGS_D = eq(round(sMm(S_.longObs) - LONGS_ZERO, 2), 1.45, 'screw gauge long true diameter');
export const LONGS_R = eq(round(LONGS_D / 2, 3), 0.725, 'radius');
export const LONGS_AREA = eq(round(PI * LONGS_R * LONGS_R, 2), 1.65, 'cross-section area, mm2');
export const SHORTS_ZERO = eq(round(-(DIVS - S_.shortClosed.csr) * SLC_MM, 2), -0.03, 'screw gauge short zero error');

// ---------------------------------------------------------------- simple pendulum, T = 2 pi sqrt(l/g), pi = 3.14, g = 10 m s^-2
export const T_of = (l, g = G) => 2 * PI * Math.sqrt(l / g);
export const l_of = (T, g = G) => (g * T * T) / (4 * PI * PI);
export const g_of = (l, T) => (4 * PI * PI * l) / (T * T);
export const PEN = { l1: 2.5 };
export const PEN_T1 = eq(round(T_of(PEN.l1), 2), 3.14, 'period of a 2.5 m pendulum');
export const SECONDS_L = eq(round(l_of(2), 2), 1.01, 'length of a seconds pendulum, g = 10');
export const EXP1 = { l: 0.64, n: 20, t: 32.0 };
export const EXP1_T = eq(EXP1.t / EXP1.n, 1.6, 'period from 20 oscillations in 32 s');
export const EXP1_G = eq(round(g_of(EXP1.l, EXP1_T), 2), 9.86, 'g from experiment');
export const OSC = { n: 24, t: 60 };
export const OSC_T = eq(OSC.t / OSC.n, 2.5, 'period from 24 oscillations in 60 s');
export const OSC_F = eq(round(1 / OSC_T, 1), 0.4, 'frequency');
export const OSC2 = { n: 30, t: 60 };
export const OSC2_T = eq(OSC2.t / OSC2.n, 2, 'period 30 in 60 s');
export const OSC2_F = eq(1 / OSC2_T, 0.5, 'frequency 0.5 Hz');
// quarter length / ninth length
eq(round(T_of(1) / T_of(0.25), 3), 2, 'length x 4 doubles the period');
eq(round(T_of(1) / T_of(1 / 9), 3), 3, 'length / 9 divides the period by 3');
export const MOON_RATIO = eq(round(Math.sqrt(6), 2), 2.45, 'moon: g one sixth, T x sqrt 6');
// bob experiment (long structured question)
export const THREAD_CM = 87.0;
export const EFF_L_CM = eq(round(THREAD_CM + BOB_R, 2), 88.52, 'effective length');
export const EFF_L_M = eq(round(EFF_L_CM / 100, 4), 0.8852, 'effective length in m');
export const EXP2 = { n: 20, t: 38.0 };
export const EXP2_T = eq(EXP2.t / EXP2.n, 1.9, 'T from 20 oscillations in 38 s');
export const EXP2_T2 = eq(round(EXP2_T * EXP2_T, 2), 3.61, 'T squared');
export const EXP2_G = eq(round(g_of(EFF_L_M, EXP2_T), 2), 9.67, 'g from the bob experiment');
// l against T^2 graphs: l = slope * T^2, slope = g / (4 pi^2)
export const GRAPH_A = { slope: 0.25, pts: [[1.0, 0.25], [1.6, 0.4], [2.4, 0.6], [3.2, 0.8], [4.0, 1.0]] };
export const GRAPH_B = { slope: 0.24, pts: [[1.0, 0.24], [2.5, 0.6], [3.5, 0.84], [5.0, 1.2]] };
for (const G_ of [GRAPH_A, GRAPH_B]) for (const [x, y] of G_.pts) eq(round(x * G_.slope, 2), y, `graph point T2=${x}`);
export const gFromSlope = (s) => 4 * PI * PI * s;
export const GA_G = eq(round(gFromSlope(GRAPH_A.slope), 2), 9.86, 'g from graph A');
export const GB_G = eq(round(gFromSlope(GRAPH_B.slope), 2), 9.47, 'g from graph B');
export const slopeOf = (p, q) => round((q[1] - p[1]) / (q[0] - p[0]), 3);
export const GA_SLOPE = eq(slopeOf([1.6, 0.4], [4.0, 1.0]), 0.25, 'slope A');
export const GB_SLOPE = eq(slopeOf([2.5, 0.6], [5.0, 1.2]), 0.24, 'slope B');
// T^2 vs l alternative (slope = 4 pi^2 / g): used only to explain why l-T^2 is plotted
export const T2_SLOPE = eq(round(4 * PI * PI / G, 2), 3.94, '4 pi^2 / g with g = 10');

// ---------------------------------------------------------------- items added for the question bank
export const PEN2 = { l: 0.4 };
export const PEN2_T = eq(round(T_of(PEN2.l), 2), 1.26, 'period of a 0.4 m pendulum');
export const KMH_12 = eq(round(12 * 3.6, 1), 43.2, '12 m/s in km/h');
export const KMH_36 = eq(KMH_TO_MS(36), 10, '36 km/h');
export const LC_CYL_D = eq(round(250 / 50, 0), 5, 'cylinder 250 mL over 50 divisions');
export const SLOW = eq(round(T_of(1, G / 6) / T_of(1, G), 2), 2.45, 'period on a planet with g/6');
