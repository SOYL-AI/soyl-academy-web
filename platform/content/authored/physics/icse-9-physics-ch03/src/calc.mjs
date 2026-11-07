// Computed values for ICSE 9 Physics ch03 Force and Newton's Laws of Motion.
// Conventions: 1 N = 10^5 dyne; 1 kgf = 9.8 N (stated in stems; 10 N when a stem says g = 10); 1 gf = 980 dyne.
// Units of force other than cgs and SI (kgf, gf) appear only in conversions, never in second-law numericals (removed topic).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;
export const G = 10;
export const KGF = 9.8;
export const DYNE_PER_N = 1e5;
export const DYNE_PER_GF = 980;

// ---------------------------------------------------------------- units of force
export const toN = (kgf, g = KGF) => round(kgf * g, 3);
export const toDyne = (n) => n * DYNE_PER_N;
export const U = {
  kgf4: eq(toN(4), 39.2, '4 kgf in N'),
  kgf3_g10: eq(toN(3, 10), 30, '3 kgf in N with g = 10'),
  kgf2_gf: eq(2 * 1000, 2000, '2 kgf in gf'),
  n25_dyne: eq(toDyne(2.5), 250000, '2.5 N in dyne'),
  n5_dyne: eq(toDyne(5), 500000, '5 N in dyne'),
  gf250_dyne: eq(250 * DYNE_PER_GF, 245000, '250 gf in dyne'),
  gf250_n: eq(round((250 * DYNE_PER_GF) / DYNE_PER_N, 3), 2.45, '250 gf in N'),
  gf500_n: eq(round((500 * 980) / 1e5, 3), 4.9, '500 gf in N'),
  dyne_to_n: eq(3e5 / DYNE_PER_N, 3, '3 x 10^5 dyne in N'),
  kgf1_dyne: eq(round(KGF * DYNE_PER_N, 0), 980000, '1 kgf in dyne'),
  gf1_n: eq(round(980 / 1e5, 5), 0.0098, '1 gf in N'),
  n196_kgf: eq(round(19.6 / KGF, 3), 2, '19.6 N in kgf'),
};

// ---------------------------------------------------------------- inverse square
export const ISQ = { f1: 36, r1: 1 };
export const isqForce = (r) => (ISQ.f1 * ISQ.r1 * ISQ.r1) / (r * r);
export const ISQ_PTS = [1, 2, 3, 4].map((r) => [r, isqForce(r)]);
eq(ISQ_PTS.map((p) => p[1]), [36, 9, 4, 2.25], 'inverse square points');
export const ISQ_3 = eq(isqForce(3), 4, 'force at 3 m');
export const ISQ_HALF = eq(isqForce(0.5), 144, 'force at half the distance');

// ---------------------------------------------------------------- momentum and F = ma
export const BALL = { m: 0.15, v: 20 };
export const BALL_P = eq(round(BALL.m * BALL.v, 3), 3, 'momentum of the ball');
export const TROLLEY = { m: 4, v: 2.5 };
export const TROLLEY_P = eq(TROLLEY.m * TROLLEY.v, 10, 'momentum of the trolley');
export const FMA = { F: 20, m: 8 };
export const FMA_A = eq(FMA.F / FMA.m, 2.5, 'acceleration of the 8 kg block');
export const MASS = { F: 600, a: 1.5 };
export const MASS_M = eq(MASS.F / MASS.a, 400, 'mass from F and a');
export const CAR = { m: 800, F: 1200, t: 5 };
export const CAR_A = eq(CAR.F / CAR.m, 1.5, 'car acceleration');
export const CAR_V = eq(CAR_A * CAR.t, 7.5, 'car speed after 5 s');
export const CAR_S = eq(0.5 * CAR_A * CAR.t * CAR.t, 18.75, 'car distance in 5 s');
export const BRAKE = { m: 1000, u: 15, t: 5 };
export const BRAKE_A = eq((0 - BRAKE.u) / BRAKE.t, -3, 'braking acceleration');
export const BRAKE_F = eq(BRAKE.m * BRAKE_A, -3000, 'braking force');
export const BRAKE_S = eq(round((BRAKE.u * BRAKE.t) / 2, 3), 37.5, 'braking distance (average velocity x time)');
export const CATCH = { m: 0.16, v: 25, t1: 0.05, t2: 0.2 };
export const CATCH_P = eq(CATCH.m * CATCH.v, 4, 'momentum of the cricket ball');
export const CATCH_F1 = eq(round(CATCH_P / CATCH.t1, 3), 80, 'force with hands fixed');
export const CATCH_F2 = eq(round(CATCH_P / CATCH.t2, 3), 20, 'force with hands drawn back');
export const TRUCK = { m: 2000, u: 5, v: 12, t: 7 };
export const TRUCK_DP = eq(TRUCK.m * (TRUCK.v - TRUCK.u), 14000, 'change of momentum of the truck');
export const TRUCK_F = eq(TRUCK_DP / TRUCK.t, 2000, 'force on the truck');
export const TRUCK_A = eq((TRUCK.v - TRUCK.u) / TRUCK.t, 1, 'truck acceleration');
eq(TRUCK.m * TRUCK_A, TRUCK_F, 'F = ma agrees with rate of change of momentum');
export const CGS = { F: 5e4, m: 250 };
export const CGS_A = eq(CGS.F / CGS.m, 200, 'cgs acceleration in cm/s2');
export const CGS_A_SI = eq(CGS_A / 100, 2, 'cgs acceleration in m/s2');
export const CGS_F_SI = eq(CGS.F / DYNE_PER_N, 0.5, 'cgs force in N');
export const CGS_M_SI = eq(CGS.m / 1000, 0.25, 'cgs mass in kg');
eq(CGS_F_SI / CGS_M_SI, CGS_A_SI, 'SI check of the cgs numerical');
// one-newton definition check
export const ONE_N = eq(1 * 1, 1, '1 N gives 1 kg an acceleration of 1 m/s2');
export const ONE_DYNE = eq(1 * 1, 1, '1 dyne gives 1 g an acceleration of 1 cm/s2');
export const KICK = { m: 0.4, a: 15 };
export const KICK_F = eq(KICK.m * KICK.a, 6, 'force on a football');
// second law numericals combined with equations of motion
export const SCOOT = { m: 150, F: 300, t: 6 };
export const SCOOT_A = eq(SCOOT.F / SCOOT.m, 2, 'scooter acceleration');
export const SCOOT_V = eq(SCOOT_A * SCOOT.t, 12, 'scooter speed');
export const SLED = { m: 25, F: 50, s: 16 };
export const SLED_A = eq(SLED.F / SLED.m, 2, 'sled acceleration');
export const SLED_V = eq(Math.sqrt(2 * SLED_A * SLED.s), 8, 'sled speed after 16 m');
export const SLED_T = eq(SLED_V / SLED_A, 4, 'sled time');
// third law
export const WALL = { F: 120 };
// mass of 1 kgf object
export const TWOKG = { m: 2 };
export const TWOKG_N = eq(TWOKG.m * KGF, 19.6, 'weight of 2 kg in N (g = 9.8)');

// ---------------------------------------------------------------- items added for the question bank
export const V = {
  kgf6: eq(toN(6), 58.8, '6 kgf in N'),
  n08_dyne: eq(Math.round(toDyne(0.8)), 80000, '0.8 N in dyne'),
  gf150_dyne: eq(150 * DYNE_PER_GF, 147000, '150 gf in dyne'),
  kgf35_n: eq(toN(3.5), 34.3, '3.5 kgf in N'),
  kgf35_dyne: eq(Math.round(toN(3.5) * DYNE_PER_N), 3430000, '3.5 kgf in dyne'),
  n06_dyne: eq(Math.round(toDyne(0.6)), 60000, '0.6 N in dyne'),
  n75_dyne: eq(toDyne(7.5), 750000, '7.5 N in dyne'),
  dyne49k_gf: eq(49000 / DYNE_PER_GF, 50, '49000 dyne in gf'),
  n196_kgf: eq(round(19.6 / KGF, 3), 2, '19.6 N in kgf'),
  kgf3_g10: eq(3 * 10, 30, '3 kgf with g = 10'),
  gf500_n: eq(round((500 * DYNE_PER_GF) / DYNE_PER_N, 3), 4.9, '500 gf in N'),
};
export const GIRL = { m: 40, v: 5 };
export const GIRL_P = eq(GIRL.m * GIRL.v, 200, 'momentum of the girl');
export const TRUCK3 = { m: 3000, v: 6 };
export const TRUCK3_P = eq(TRUCK3.m * TRUCK3.v, 18000, 'momentum of the 3000 kg truck');
export const BIKE = { m: 120, u: 10, t: 4 };
export const BIKE_A = eq((0 - BIKE.u) / BIKE.t, -2.5, 'bike deceleration');
export const BIKE_F = eq(BIKE.m * BIKE_A, -300, 'braking force on the bike and rider');
export const HOCKEY = { m: 0.2, v: 30, t: 0.04 };
export const HOCKEY_P = eq(round(HOCKEY.m * HOCKEY.v, 3), 6, 'momentum of the hockey ball');
export const HOCKEY_F = eq(round(HOCKEY_P / HOCKEY.t, 3), 150, 'force stopping the hockey ball');
export const CGS2 = { F: 3e4, m: 500 };
export const CGS2_A = eq(CGS2.F / CGS2.m, 60, 'cgs acceleration 60 cm/s2');
export const ISQ2 = { f: 100, r1: 2, r2: 10 };
export const ISQ2_F = eq((ISQ2.f * ISQ2.r1 * ISQ2.r1) / (ISQ2.r2 * ISQ2.r2), 4, 'force at 10 m');
export const ISQ3 = { f: 16, r1: 2, r2: 4 };
export const ISQ3_F = eq((ISQ3.f * ISQ3.r1 * ISQ3.r1) / (ISQ3.r2 * ISQ3.r2), 4, '16 N at 2 cm to 4 cm');
export const SL1 = { F: 12, a: 3 };
export const SL1_M = eq(SL1.F / SL1.a, 4, 'mass for 12 N and 3 m/s2');
export const SL1_A2 = eq(SL1.F / (2 * SL1_M), 1.5, 'acceleration with twice the mass');
export const SL3 = { F: 10, t: 4 };
export const SL3_DP = eq(SL3.F * SL3.t, 40, 'change of momentum F t');
export const S3D = { m: 0.5, v: 8, t: 0.1 };
export const S3D_DP = eq(S3D.m * S3D.v, 4, 'momentum removed');
export const S3D_F = eq(round(S3D_DP / S3D.t, 3), 40, 'force to stop the 0.5 kg ball');
export const S3E = { F: 24, m: 6, t: 5 };
export const S3E_A = eq(S3E.F / S3E.m, 4, 'acceleration 24 N on 6 kg');
export const S3E_V = eq(S3E_A * S3E.t, 20, 'speed after 5 s');
export const S3E_P = eq(S3E.m * S3E_V, 120, 'momentum gained');
export const CHK = { F: 150, m: 50, t: 4 };
export const CHK_A = eq(CHK.F / CHK.m, 3, 'check-slide acceleration');
export const CHK_V = eq(CHK_A * CHK.t, 12, 'check-slide speed');
export const CATCH2 = { m: 0.14, v: 30, t1: 0.04, t2: 0.14 };
export const CATCH2_P = eq(round(CATCH2.m * CATCH2.v, 3), 4.2, 'momentum of the second ball');
export const CATCH2_F1 = eq(round(CATCH2_P / CATCH2.t1, 3), 105, 'force with the short stop');
export const CATCH2_F2 = eq(round(CATCH2_P / CATCH2.t2, 3), 30, 'force with the longer stop');
export const CATCH2_R = eq(round(CATCH2_F1 / CATCH2_F2, 2), 3.5, 'ratio of forces');
export const SLED_P = eq(SLED.m * SLED_V, 200, 'sled momentum');
export const SLED_STOP = eq(SLED_P / 2, 100, 'force to stop the sled in 2 s');
