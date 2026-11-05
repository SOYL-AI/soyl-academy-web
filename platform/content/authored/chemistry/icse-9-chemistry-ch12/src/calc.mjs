// Computed values for ICSE 9 Chemistry ch12 Study of Gas Laws.
// Conventions (as in ICSE Class IX books): absolute zero is taken as -273 degrees Celsius, so K = degrees Celsius + 273;
// STP is 273 K and 760 mm Hg (1 atmosphere). All data are IMAGINED and illustrative; every derived number is computed
// and asserted here, never typed in a stem, answer, table or slide.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
const r6 = (n) => round(n, 6);

export const ZERO = 273; // kelvin offset
export const STP_T = 273;
export const STP_P = 760;
export const toK = (c) => c + ZERO;
export const toC = (k) => k - ZERO;
export const boyleP2 = (P1, V1, V2) => r6((P1 * V1) / V2);
export const boyleV2 = (P1, V1, P2) => r6((P1 * V1) / P2);
export const charlesV2 = (V1, T1, T2) => r6((V1 * T2) / T1);
export const charlesT2 = (V1, T1, V2) => r6((T1 * V2) / V1);
export const combV2 = (P1, V1, T1, P2, T2) => r6((P1 * V1 * T2) / (T1 * P2));
export const combP2 = (P1, V1, T1, V2, T2) => r6((P1 * V1 * T2) / (T1 * V2));
export const combT2 = (P1, V1, T1, P2, V2) => r6((T1 * P2 * V2) / (P1 * V1));
export const stpV = (P1, V1, T1) => r6((P1 * V1 * STP_T) / (T1 * STP_P));

// ---------------------------------------------------------------- Celsius and kelvin
eq(STP_T, toK(0), 'ice point in kelvin');
eq(toK(100), 373, 'steam point in kelvin');
eq(toC(0), -273, 'absolute zero in degrees Celsius');
export const CONV = {
  roomC: 27,
  roomK: eq(toK(27), 300, '27 C in K'),
  coldC: -73,
  coldK: eq(toK(-73), 200, '-73 C in K'),
  hotC: 127,
  hotK: eq(toK(127), 400, '127 C in K'),
  kToC_from: 350,
  kToC: eq(toC(350), 77, '350 K in C'),
  fridgeC: 7,
  fridgeK: eq(toK(7), 280, '7 C in K'),
  ln2K: 77,
  ln2C: eq(toC(77), -196, '77 K in C'),
  c47K: eq(toK(47), 320, '47 C in K'),
  k373: eq(toC(373), 100, '373 K in C'),
  k173C: eq(toC(173), -100, '173 K in C'),
  c17K: eq(toK(17), 290, '17 C in K'),
  c77K: eq(toK(77), 350, '77 C in K'),
  c91K: eq(toK(91), 364, '91 C in K'),
  c63K: eq(toK(63), 336, '63 C in K'),
  c273K: eq(toK(273), 546, '273 C in K'),
  c147K: eq(toK(147), 420, '147 C in K'),
  cm33K: eq(toK(-33), 240, '-33 C in K'),
  c102K: eq(toK(102), 375, '102 C in K'),
  c8K: eq(toK(8), 281, '8 C in K'),
  c0K: eq(toK(0), 273, '0 C in K'),
  c25K: eq(toK(25), 298, '25 C in K'),
  c42K: eq(toK(42), 315, '42 C in K'),
  c9K: eq(toK(9), 282, '9 C in K'),
  cm23K: eq(toK(-23), 250, '-23 C in K'),
  c52K: eq(toK(52), 325, '52 C in K'),
  c77Kb: eq(toK(77), 350, '77 C in K (again)'),
};
eq(toC(300) - toC(200), 100, 'a difference of 100 kelvin is 100 degrees Celsius');

// ---------------------------------------------------------------- Boyle's law: constant temperature
// Experiment: gas trapped in a cylinder under a piston; PV constant = 12000 mm Hg cm3.
export const BOYLE_K = 12000;
export const BOYLE_V = [20, 25, 40, 50, 100]; // cm3
export const BOYLE_P = BOYLE_V.map((v) => BOYLE_K / v);
eq(BOYLE_P, [600, 480, 300, 240, 120], 'Boyle data pressures');
export const BOYLE_PV = BOYLE_V.map((v, i) => v * BOYLE_P[i]);
eq(BOYLE_PV, [12000, 12000, 12000, 12000, 12000], 'Boyle products');
export const BOYLE_U = BOYLE_V.map((v) => r6(100 / v)); // 100/V, the x values of the P against 1/V plot
eq(BOYLE_U, [5, 4, 2.5, 2, 1], 'Boyle reciprocal volumes (x100)');
eq(BOYLE_P.map((p, i) => p / BOYLE_U[i]), [120, 120, 120, 120, 120], 'P / (100/V) is constant, so P against 1/V is a line through the origin');
export const BOYLE_V75_P = eq(BOYLE_K / 75, 160, 'pressure at 75 cm3');
// Bicycle pump: 400 cm3 of air at 760 mm Hg is pushed into 100 cm3.
export const PUMP = { V1: 400, P1: 760, V2: 100 };
export const PUMP_P2 = eq(boyleP2(PUMP.P1, PUMP.V1, PUMP.V2), 3040, 'pump final pressure');
export const PUMP_RATIO = eq(PUMP_P2 / PUMP.P1, 4, 'pressure rises four-fold');
eq(PUMP.V1 / PUMP.V2, 4, 'volume falls to a quarter');

// Nitrogen expands: 750 cm3 at 600 mm Hg, pressure falls to 450 mm Hg.
export const NEXP = { V1: 750, P1: 600, P2: 450 };
export const NEXP_V2 = eq(boyleV2(NEXP.P1, NEXP.V1, NEXP.P2), 1000, 'nitrogen expansion final volume');
// Gas at 750 mm Hg and 240 cm3, volume becomes 360 cm3.
export const GEXP = { P1: 750, V1: 240, V2: 360 };
export const GEXP_P2 = eq(boyleP2(GEXP.P1, GEXP.V1, GEXP.V2), 500, 'pressure when volume is 360 cm3');
// Pressure raised by 25 per cent from 800 mm Hg.
export const PUP = { P1: 800, pct: 25 };
export const PUP_P2 = eq(PUP.P1 * (1 + PUP.pct / 100), 1000, 'pressure after a 25 per cent rise');
export const PUP_V_RATIO = eq(PUP.P1 / PUP_P2, 0.8, 'volume ratio after a 25 per cent rise in pressure');
export const PUP_V_FALL = eq(round((1 - PUP_V_RATIO) * 100, 6), 20, 'per cent fall in volume');
// Compressing hydrogen: 900 cm3 at 760 mm Hg to one third of the volume.
export const H3 = { V1: 900, P1: 760 };
export const H3_V2 = eq(H3.V1 / 3, 300, 'one third of 900');
export const H3_P2 = eq(boyleP2(H3.P1, H3.V1, H3_V2), 2280, 'hydrogen at one third of the volume');
// Two flask check: chlorine in a 2.0 dm3 flask at 1140 mm Hg opened to 3.0 dm3 total.
export const CL2 = { V1: 2, P1: 1140, V2: 3 };
export const CL2_P2 = eq(boyleP2(CL2.P1, CL2.V1, CL2.V2), 760, 'chlorine spread into a larger flask');
// Weather balloon doubling check for the motion argument: halving the volume doubles pressure.
eq(boyleP2(600, 20, 10), 1200, 'halving the volume doubles the pressure');
eq(boyleP2(600, 30, 90), 200, 'tripling the volume cuts the pressure to a third');

// ---------------------------------------------------------------- Charles's law: constant pressure
// Experiment: V = 0.5 T cm3 (150 cm3 at 300 K).
export const CH_SLOPE = 0.5;
export const CH_C = [-23, 27, 77, 127]; // degrees Celsius
export const CH_K = CH_C.map(toK);
eq(CH_K, [250, 300, 350, 400], 'Charles data in kelvin');
export const CH_V = CH_K.map((t) => t * CH_SLOPE);
eq(CH_V, [125, 150, 175, 200], 'Charles data volumes');
export const CH_RATIO = CH_V.map((v, i) => v / CH_K[i]);
eq(CH_RATIO, [0.5, 0.5, 0.5, 0.5], 'V/T is constant');
export const CH_V0C = eq(CH_SLOPE * toK(0), 136.5, 'volume at 0 C');
export const CH_V_AT_ABS0 = eq(CH_SLOPE * (toC(0) + ZERO), 0, 'volume extrapolated to -273 C is zero');
eq(new Set(CH_V.map((v, i) => round(v / CH_C[i], 3))).size, 4, 'V/t in Celsius is not constant');
export const CH_V_PER_DEG = eq(CH_SLOPE, 0.5, 'volume gained per degree');
eq(round(CH_V0C / ZERO, 6), 0.5, 'one 273rd of the volume at 0 C is the gain per degree');
// Celsius form of the law: Vt = V0 (1 + t / 273)
export const celsiusForm = (V0, t) => r6(V0 * (1 + t / ZERO));
export const C0 = { V0: 273, t: 91 };
export const C0_V = eq(celsiusForm(C0.V0, C0.t), 364, 'V at 91 C from 273 cm3 at 0 C');
eq(charlesV2(C0.V0, toK(0), toK(91)), 364, 'Celsius form agrees with the kelvin form');
export const VMID = eq(celsiusForm(CH_V0C, 27), 150, 'Celsius form on the experiment data');
// Charles numericals
export const CA = { V1: 580, T1C: 17, T2C: 77 };
export const CA_V2 = eq(charlesV2(CA.V1, toK(CA.T1C), toK(CA.T2C)), 700, 'hydrogen heated from 17 to 77 C');
export const CB = { V1: 400, T1C: 7, V2: 600 };
export const CB_T2K = eq(charlesT2(CB.V1, toK(CB.T1C), CB.V2), 420, 'temperature for 600 cm3');
export const CB_T2C = eq(toC(CB_T2K), 147, 'temperature for 600 cm3 in degrees Celsius');
export const CC = { V1: 960, T1C: 127 };
export const CC_T2K = eq(charlesT2(CC.V1, toK(CC.T1C), CC.V1 / 2), 200, 'temperature when the volume is halved');
export const CC_T2C = eq(toC(CC_T2K), -73, 'halved volume temperature in Celsius');
export const CD = { V1: 273, T1C: 0 };
export const CD_V = eq(charlesV2(CD.V1, toK(0), toK(273)), 546, 'volume doubles at 273 C');
// Oxygen in a flexible bag: 350 cm3 at 7 C warmed to 42 C.
export const CF = { V1: 280, T1C: 7, T2C: 42 };
export const CF_V2 = eq(charlesV2(CF.V1, toK(CF.T1C), toK(CF.T2C)), 315, 'oxygen warmed from 7 to 42 C');
// Wrong-method check: using Celsius numbers directly gives an unlike answer
export const CF_WRONG = eq(r6((CF.V1 * CF.T2C) / CF.T1C), 1680, 'using Celsius values directly (wrong)');
export const CF_WRONG_FACTOR = eq(round(CF_WRONG / CF_V2, 2), 5.33, 'the wrong answer is more than five times the right one');
export const CF_RATIO = eq(round(toK(42) / toK(7), 6), 1.125, 'kelvin ratio for 7 to 42 C');
// Per-degree statement: gas at 0 C, each degree changes the volume by one 273rd
export const PER = { V0: 546 };
export const PER_DEG = eq(PER.V0 / ZERO, 2, 'a 546 cm3 sample changes by 2 cm3 per degree');
export const PER_AT_M20 = eq(celsiusForm(PER.V0, -20), 506, '546 cm3 at 0 C cooled by 20 degrees');

// ---------------------------------------------------------------- combined gas equation
// Carbon dioxide: 300 cm3 at 760 mm Hg and 27 C, pressure raised to 950 mm Hg and temperature to 127 C.
export const SA = { V1: 300, P1: 760, T1C: 27, P2: 950, T2C: 127 };
export const SA_V2 = eq(combV2(SA.P1, SA.V1, toK(SA.T1C), SA.P2, toK(SA.T2C)), 320, 'combined: carbon dioxide');
// Weather balloon: 20 dm3 of helium at 760 mm Hg and 27 C rises to 380 mm Hg and -33 C.
export const BAL = { V1: 20, P1: 760, T1C: 27, P2: 380, T2C: -33 };
export const BAL_V2 = eq(combV2(BAL.P1, BAL.V1, toK(BAL.T1C), BAL.P2, toK(BAL.T2C)), 32, 'combined: weather balloon');
export const BAL_STP = eq(stpV(BAL.P1, BAL.V1, toK(BAL.T1C)), 18.2, 'balloon gas at STP');
export const BAL_BOYLE_STEP = eq(boyleV2(BAL.P1, BAL.V1, BAL.P2), 40, 'balloon, Boyle step at 300 K');
export const BAL_CHARLES_STEP = eq(charlesV2(BAL_BOYLE_STEP, toK(BAL.T1C), toK(BAL.T2C)), 32, 'balloon, Charles step');
// Finding a temperature: 300 cm3 at 760 mm Hg and 27 C compressed to 150 cm3 at 1140 mm Hg.
export const TF = { V1: 300, P1: 760, T1C: 27, V2: 150, P2: 1140 };
export const TF_T2K = eq(combT2(TF.P1, TF.V1, toK(TF.T1C), TF.P2, TF.V2), 225, 'combined: final temperature');
export const TF_T2C = eq(toC(TF_T2K), -48, 'combined: final temperature in Celsius');
// Oxygen: 600 cm3 at 1140 mm Hg and 27 C, pressure falls to 760 mm Hg and temperature rises to 177 C
export const PG = { V1: 600, P1: 1140, T1C: 27, P2: 760, T2C: 177 };
export const PG_V2 = eq(combV2(PG.P1, PG.V1, toK(PG.T1C), PG.P2, toK(PG.T2C)), 1350, 'combined: pressure falls and temperature rises');
eq(toK(PG.T2C), 450, '177 C in K');
export const PG_PART = eq(round(PG.P1 / PG.P2, 6), 1.5, 'pressure factor');
export const PG_T = eq(round(toK(PG.T2C) / toK(PG.T1C), 6), 1.5, 'temperature factor');
eq(PG.V1 * PG_PART * PG_T, 1350, 'volume is the product of the two factors');

// ---------------------------------------------------------------- reduction to STP
export const ST1 = { V1: 800, P1: 570, T1C: 91 };
export const ST1_V0 = eq(stpV(ST1.P1, ST1.V1, toK(ST1.T1C)), 450, 'STP reduction 1');
export const ST2 = { V1: 1000, P1: 684, T1C: 27 };
export const ST2_V0 = eq(stpV(ST2.P1, ST2.V1, toK(ST2.T1C)), 819, 'STP reduction 2');
export const ST3 = { V1: 10, P1: 2280, T1C: 27 };
export const ST3_V0 = eq(stpV(ST3.P1, ST3.V1, toK(ST3.T1C)), 27.3, 'STP reduction 3 (dm3)');
eq(stpV(760, 1000, 300), 910, '1000 cm3 at 27 C and 760 mm Hg to STP');
// Reverse: 224 cm3 at STP taken to 273 C and 380 mm Hg
export const RV = { V0: 224, T2C: 273, P2: 380 };
export const RV_V2 = eq(combV2(STP_P, RV.V0, STP_T, RV.P2, toK(RV.T2C)), 896, 'reverse from STP');
// The gas of ST2 at STP is warmed to 273 C at constant pressure
export const ST2_WARM = eq(charlesV2(ST2_V0, STP_T, toK(273)), 1638, 'STP gas warmed to 273 C');
// Hydrogen at STP is heated to 91 C at constant pressure: 450 cm3 at STP (ST1 result)
eq(charlesV2(ST1_V0, STP_T, toK(91)), 600, 'STP volume of ST1 gas to 91 C at constant pressure');
// Why STP volume is smaller than the lab volume: ST2 pressure is lower but temperature higher; net factor
eq(round(ST2.P1 / STP_P, 6), 0.9, 'pressure factor of ST2');
eq(round(STP_T / toK(ST2.T1C), 6), 0.91, 'temperature factor of ST2');

// ---------------------------------------------------------------- values used inside question items
export const IT = {};
// deck check: 30 cm3 at 400 mm Hg becomes 60 cm3
IT.chkBT = eq(boyleP2(400, 30, 60), 200, 'check item: pressure when 30 cm3 becomes 60 cm3');
// graph of a second gas: P x V = 9000
IT.G2_K = 9000;
IT.G2 = [15, 20, 30, 45, 60, 90].map((v) => [v, IT.G2_K / v]);
eq(IT.G2, [[15, 600], [20, 450], [30, 300], [45, 200], [60, 150], [90, 100]], 'second Boyle graph readings');
IT.G2_P30 = eq(IT.G2_K / 30, 300, 'second graph: P at 30 cm3');
IT.G2_V150 = eq(IT.G2_K / 150, 60, 'second graph: V at 150 mm Hg');
IT.G2_P18 = eq(boyleP2(300, 30, 18), 500, 'second graph: P at 18 cm3');
eq(IT.G2_K / 18, 500, 'second graph: P at 18 cm3 from the constant');
// apparatus: 450 cm3 at 760 mm Hg, load raised until 2280 mm Hg
IT.APP = { V1: 450, P1: 760, P2: 2280 };
IT.APP_V2 = eq(boyleV2(IT.APP.P1, IT.APP.V1, IT.APP.P2), 150, 'apparatus: volume at 2280 mm Hg');
eq(IT.APP.P2 / IT.APP.P1, 3, 'apparatus: pressure becomes three times');
// MCQ data sets: P in mm Hg, V in cm3
IT.MCQ_OK = [[200, 90], [300, 60]];
eq(IT.MCQ_OK.map(([p, v]) => p * v), [18000, 18000], 'MCQ right option obeys Boyle');
IT.MCQ_BAD = [[[250, 80], [500, 60]], [[150, 60], [300, 45]], [[400, 30], [200, 30]]];
eq(IT.MCQ_BAD.map(([a, b]) => a[0] * a[1] === b[0] * b[1]), [false, false, false], 'MCQ wrong options break Boyle');
IT.MCQ_BAD_PV = IT.MCQ_BAD.map(([a, b]) => [a[0] * a[1], b[0] * b[1]]);
eq(IT.MCQ_BAD_PV, [[20000, 30000], [9000, 13500], [12000, 6000]], 'MCQ wrong option products');
// temperature for double volume at constant pressure from 27 C
IT.DBL_K = eq(2 * toK(27), 600, 'double the kelvin temperature');
IT.DBL_C = eq(toC(IT.DBL_K), 327, 'double volume at 327 C');
IT.WRONG_DBL_C = eq(2 * 27, 54, 'doubling the Celsius value (wrong)');
IT.K100C = eq(toC(100), -173, '100 K in C');
IT.STP_WARM_RATIO = eq(toK(273) / STP_T, 2, 'STP gas heated to 273 C doubles its volume');
// conversions
IT.m13K = eq(toK(-13), 260, '-13 C in K');
IT.k250C = eq(toC(250), -23, '250 K in C');
IT.c20K = eq(toK(20), 293, '20 C in K');
IT.c40K = eq(toK(40), 313, '40 C in K');
IT.ratio2040 = eq(round(IT.c40K / IT.c20K, 2), 1.07, 'kelvin ratio for 20 to 40 C');
IT.c25K = eq(toK(25), 298, '25 C in K');
// short-answer calculations
IT.S3 = { V1: 320, P1: 608, T1C: 63 };
IT.S3_V0 = eq(stpV(IT.S3.P1, IT.S3.V1, toK(IT.S3.T1C)), 208, 'STP volume of 320 cm3 at 608 mm Hg and 63 C');
IT.S3C = { V1: 840, T1C: -23, T2C: 27 };
IT.S3C_V2 = eq(charlesV2(IT.S3C.V1, toK(IT.S3C.T1C), toK(IT.S3C.T2C)), 1008, 'Charles: 840 cm3 from -23 C to 27 C');
// numerical items
IT.NP = { V1: 250, P1: 760, T1C: 27, T2C: 177, V2: 300 };
IT.NP_P2 = eq(combP2(IT.NP.P1, IT.NP.V1, toK(IT.NP.T1C), IT.NP.V2, toK(IT.NP.T2C)), 950, 'neon heated and expanded: final pressure');
eq(toK(177), 450, '177 C in K');
// a gas whose STP volume equals its starting volume
IT.SAME = { V1: 300, P1: 1520, T1C: 273 };
IT.SAME_V0 = eq(stpV(IT.SAME.P1, IT.SAME.V1, toK(IT.SAME.T1C)), 300, 'pressure and temperature factors cancel');
// per-reading Charles constants
IT.CH_CONST = eq(CH_RATIO[0], 0.5, 'V/T constant, cm3 per K');
// Percentages for the molecular argument
IT.HALF = eq(boyleP2(600, 20, 10) / 600, 2, 'halving the volume doubles the pressure');
