// Computed values for ICSE 9 Physics ch02 Motion in One Dimension. g = 10 m s^-2 throughout (stated in every free-fall stem).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;
export const G = 10;

// ---------------------------------------------------------------- kinematics helpers
export const vel = (u, a, t) => u + a * t;
export const dist = (u, a, t) => u * t + 0.5 * a * t * t;
export const distAvg = (u, v, t) => ((u + v) / 2) * t;
export const v2dist = (u, v, a) => (v * v - u * u) / (2 * a);

// ---------------------------------------------------------------- distance and displacement
export const BOY = { north: 40, south: 30 };
export const BOY_DISP = eq(BOY.north - BOY.south, 10, 'boy displacement (m north)');
export const BOY_DIST = eq(BOY.north + BOY.south, 70, 'boy distance');
export const BUS = { out: 8, back: 3 };
export const BUS_DIST = eq(BUS.out + BUS.back, 11, 'bus distance km');
export const BUS_DISP = eq(BUS.out - BUS.back, 5, 'bus displacement km');
export const PQR = { east: 300, west: 500 };
export const PQR_DIST = eq(PQR.east + PQR.west, 800, 'rickshaw distance');
export const PQR_DISP = eq(PQR.west - PQR.east, 200, 'rickshaw displacement (m west of P)');
export const TRACK = 200;

// ---------------------------------------------------------------- speed, velocity, acceleration
export const RIDER = { d1: 900, t1: 180, d2: 1500, t2: 420 };
export const RIDER_DIST = eq(RIDER.d1 + RIDER.d2, 2400, 'rider distance');
export const RIDER_T = eq(RIDER.t1 + RIDER.t2, 600, 'rider time');
export const RIDER_V = eq(RIDER_DIST / RIDER_T, 4, 'rider average speed');
export const CYC = { d1: 480, t1: 60, d2: 720, t2: 180 };
export const CYC_V = eq((CYC.d1 + CYC.d2) / (CYC.t1 + CYC.t2), 5, 'cyclist average speed');
export const RUN = { d1: 120, t1: 20, d2: 80, t2: 30 };
export const RUN_V = eq((RUN.d1 + RUN.d2) / (RUN.t1 + RUN.t2), 4, 'check-slide average speed');
export const FERRY = { width: 150, t: 100 };
export const FERRY_V = eq((2 * FERRY.width) / (2 * FERRY.t), 1.5, 'ferry average speed over the round trip');
export const SCOOTER = { u: 5, v: 20, t: 6 };
export const SCOOTER_A = eq(round((SCOOTER.v - SCOOTER.u) / SCOOTER.t, 2), 2.5, 'scooter acceleration');
export const BRAKE = { u: 20, v: 0, t: 8 };
export const BRAKE_A = eq((BRAKE.v - BRAKE.u) / BRAKE.t, -2.5, 'scooter braking');
export const CAR_CHK = { u: 10, v: 25, t: 5 };
export const CAR_CHK_A = eq((CAR_CHK.v - CAR_CHK.u) / CAR_CHK.t, 3, 'check-slide acceleration');
export const SLOW = { u: 20, v: 5, t: 5 };
export const SLOW_A = eq((SLOW.v - SLOW.u) / SLOW.t, -3, 'slowing from 20 to 5');
export const TRAIN = { v: 30, t: 120 };
export const TRAIN_A = eq((TRAIN.v - 0) / TRAIN.t, 0.25, 'train acceleration');
export const BIKE = { u: 14, t: 7 };
export const BIKE_A = eq((0 - BIKE.u) / BIKE.t, -2, 'bike retardation');

// ---------------------------------------------------------------- graphs
// d-t graph of a toy car: O(0,0) -> A(4,20) -> B(8,20) -> C(12,60)
export const DT = [[0, 0], [4, 20], [8, 20], [12, 60]];
export const slopeOf = (p, q) => (q[1] - p[1]) / (q[0] - p[0]);
export const DT_V = { OA: eq(slopeOf(DT[0], DT[1]), 5, 'OA speed'), AB: eq(slopeOf(DT[1], DT[2]), 0, 'AB speed'), BC: eq(slopeOf(DT[2], DT[3]), 10, 'BC speed') };
export const DT_AVG = eq(DT[3][1] / DT[3][0], 5, 'toy car average speed');
const dAt = (t) => {
  for (let i = 0; i < DT.length - 1; i++) if (t >= DT[i][0] && t <= DT[i + 1][0]) return DT[i][1] + slopeOf(DT[i], DT[i + 1]) * (t - DT[i][0]);
  throw new Error('t out of range');
};
export const DT_2 = eq(dAt(2), 10, 'd at 2 s');
export const DT_10 = eq(dAt(10), 40, 'd at 10 s');
export const DT_BETWEEN = eq(DT_10 - DT_2, 30, 'distance between 2 s and 10 s');
// v-t graph of a tram: O(0,0) -> A(6,12) -> B(10,12) -> C(13,0)
export const VT = [[0, 0], [6, 12], [10, 12], [13, 0]];
export const VT_A1 = eq(slopeOf(VT[0], VT[1]), 2, 'tram acceleration');
export const VT_A3 = eq(slopeOf(VT[2], VT[3]), -4, 'tram retardation');
export const VT_S1 = eq(0.5 * 6 * 12, 36, 'tram first triangle');
export const VT_S2 = eq(4 * 12, 48, 'tram rectangle');
export const VT_S3 = eq(0.5 * 3 * 12, 18, 'tram last triangle');
export const VT_S = eq(VT_S1 + VT_S2 + VT_S3, 102, 'tram total distance');
export const VT_T = 13;
export const VT_AVG = eq(round(VT_S / VT_T, 2), 7.85, 'tram average speed');
eq(distAvg(0, 12, 6), 36, 'tram trapezoid check (first part)');

// ---------------------------------------------------------------- equations of motion
export const CAR1 = { u: 5, a: 2, t: 8 };
export const CAR1_V = eq(vel(5, 2, 8), 21, 'car v');
export const CAR1_S = eq(dist(5, 2, 8), 104, 'car s');
eq(CAR1_V * CAR1_V, 5 * 5 + 2 * 2 * CAR1_S, 'car v squared check');
export const CAR2 = { u: 4, a: 1.5, t: 6 };
export const CAR2_V = eq(vel(4, 1.5, 6), 13, 'car 2 v');
export const CAR2_S = eq(dist(4, 1.5, 6), 51, 'car 2 s');
export const CAR2_S_AVG = eq(distAvg(4, 13, 6), 51, 'car 2 s by average velocity');
export const STOP = { u: 20, a: -5 };
export const STOP_S = eq(v2dist(20, 0, -5), 40, 'stopping distance from 20 m/s');
export const STOP_T = eq((0 - 20) / -5, 4, 'stopping time from 20 m/s');
export const CHK_BRAKE = { u: 10, a: -2.5 };
export const CHK_BRAKE_S = eq(v2dist(10, 0, -2.5), 20, 'check-slide stopping distance');
export const TRUCK = { u: 30, a: -5 };
export const TRUCK_T = eq((0 - 30) / -5, 6, 'truck stopping time');
export const TRUCK_S = eq(v2dist(30, 0, -5), 90, 'truck stopping distance');
export const TRUCK_VAVG = eq((30 + 0) / 2, 15, 'truck average velocity');
eq(TRUCK_VAVG * TRUCK_T, TRUCK_S, 'truck average velocity times time');
export const REST = { a: 4, t: 5 };
export const REST_S = eq(dist(0, 4, 5), 50, 'from rest a 4 m/s2 for 5 s');
export const REST3 = { a: 3, t: 10 };
export const REST3_V = eq(vel(0, 3, 10), 30, 'from rest a 3 for 10 s v');
export const REST3_S = eq(dist(0, 3, 10), 150, 'from rest a 3 for 10 s s');
export const AVG = { u: 4, v: 16, t: 5 };
export const AVG_S = eq(distAvg(4, 16, 5), 50, 's = (u + v)t/2');

// ---------------------------------------------------------------- free fall, g = 10 m s^-2
export const fallS = (t) => 0.5 * G * t * t;
export const fallV = (t) => G * t;
export const TOWER = { t: 4 };
export const TOWER_H = eq(fallS(4), 80, 'chk: tower height after 4 s');
export const DROP45 = { h: 45 };
export const DROP45_T = eq(Math.sqrt((2 * 45) / G), 3, 'time to fall 45 m');
export const DROP45_V = eq(fallV(3), 30, 'speed after falling 45 m');
export const DROP2_V = eq(fallV(2), 20, 'speed after 2 s');
export const WELL_T = 2;
export const WELL_D = eq(fallS(2), 20, 'well depth');
export const WELL_V = eq(fallV(2), 20, 'speed at the water');
export const WELL_1 = eq(fallS(1), 5, 'first second');
export const WELL_2ND = eq(fallS(2) - fallS(1), 15, 'second second');
export const DROP5 = { t: 5 };
export const DROP5_H = eq(fallS(5), 125, 'dropped for 5 s');
export const DROP5_V = eq(fallV(5), 50, 'speed after 5 s');
export const THROW20 = { u: 20 };
export const T20_UP = eq(20 / G, 2, 'time up from 20 m/s');
export const T20_H = eq((20 * 20) / (2 * G), 20, 'height reached from 20 m/s');
export const T20_FLIGHT = eq(2 * T20_UP, 4, 'flight time from 20 m/s');
export const T20_H1 = eq(20 * 1 - fallS(1), 15, 'height after 1 s');
export const T30_H = eq((30 * 30) / (2 * G), 45, 'height reached from 30 m/s');
export const T30_UP = eq(30 / G, 3, 'time up from 30 m/s');
export const T15_UP = eq(15 / G, 1.5, 'chk-slide time up from 15 m/s');
// check: equation v = u + gt and s = ut + gt^2/2 agree at the top
eq(dist(20, -G, 2), 20, 'height from s = ut + at^2/2');
eq(dist(30, -G, 3), 45, 'height 30 m/s from s = ut + at^2/2');

// ---------------------------------------------------------------- items added for the question bank
export const BUSA = { u: 6, v: 21, t: 10 };
export const BUSA_A = eq((BUSA.v - BUSA.u) / BUSA.t, 1.5, 'bus acceleration');
export const JOG = { east: 200, t1: 50, west: 100, t2: 50 };
export const JOG_DIST = eq(JOG.east + JOG.west, 300, 'jogger distance');
export const JOG_TIME = eq(JOG.t1 + JOG.t2, 100, 'jogger time');
export const JOG_SPEED = eq(JOG_DIST / JOG_TIME, 3, 'jogger average speed');
export const JOG_DISP = eq(JOG.east - JOG.west, 100, 'jogger displacement');
export const JOG_VEL = eq(JOG_DISP / JOG_TIME, 1, 'jogger average velocity');
export const LAP = { c: 200, t: 50 };
export const LAP_V = eq(LAP.c / LAP.t, 4, 'lap average speed');
export const CYCS = { u: 3, a: 0.5, t: 10 };
export const CYCS_S = eq(dist(3, 0.5, 10), 55, 'cyclist distance');
export const BRK16 = { u: 16, a: -4 };
export const BRK16_S = eq(v2dist(16, 0, -4), 32, 'stopping distance from 16 m/s');
export const WELL15 = { t: 1.5 };
export const WELL15_D = eq(fallS(1.5), 11.25, 'well 1.5 s');
export const T40_H = eq((40 * 40) / (2 * G), 80, 'height from 40 m/s');
export const T25 = { u: 25 };
export const T25_FLIGHT = eq((2 * 25) / G, 5, 'flight time from 25 m/s');
export const AVG2 = { u: 8, v: 20, t: 4 };
export const AVG2_S = eq(distAvg(8, 20, 4), 56, 'distance (u + v)t/2');
export const VT_10 = eq(VT_S1 + VT_S2, 84, 'tram first 10 s');
export const T10 = { u: 10 };
export const T10_UP = eq(10 / G, 1, 'time up from 10 m/s');
export const T10_H = eq((10 * 10) / (2 * G), 5, 'height from 10 m/s');
export const T30_4 = eq(30 - G * 4, -10, 'velocity after 4 s from 30 m/s up');
export const T30_FLIGHT = eq((2 * 30) / G, 6, 'flight time from 30 m/s');
export const FERRY_V0 = 0;
export const VT_AVG_STR = '7.85';
