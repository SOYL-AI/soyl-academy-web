// Computed values for ICSE 9 Physics ch04 Gravitation. Every number used in a stem, answer, table or slide is exported
// from here and asserted with eq(value, expected, what). G = 6.67e-11 N m^2 kg^-2; g = 10 m s^-2 unless a stem says 9.8;
// 1 kgf = 9.8 N unless a stem says g = 10.
import { sig } from '../../icse-9-physics-ch01/src/lib.mjs';

export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const Gc = 6.67e-11;
export const g10 = 10;
export const g98 = 9.8;
export const KGF = 9.8;

/** Universal law: F = G m1 m2 / r^2 */
export const pull = (m1, m2, r) => (Gc * m1 * m2) / (r * r);
/** Ratio-type change of force: masses scaled by a and b, distance scaled by k. */
export const ratio = (a, b, k) => (a * b) / (k * k);

// ---------------------------------------------------------------- deck 1
export const D1_F0 = 12; // N, force before the change
export const D1_RATIO = ratio(1, 2, 3); // second mass doubled, distance tripled
export const D1_F = sig(D1_F0 * D1_RATIO, 3);
eq(D1_F, 2.67, 'deck example ratio force');
export const ST_M1 = 55;
export const ST_M2 = 65;
export const ST_R = 1.5;
export const ST_F = pull(ST_M1, ST_M2, ST_R);
export const ST_F3 = sig(ST_F, 3);
eq(ST_F3, 1.06e-7, 'two students force');
// inverse-square graph: F = 64 / r^2
export const GRAPH = [1, 2, 4].map((r) => [r, 64 / (r * r)]);
eq(GRAPH.map((p) => p[1]), [64, 16, 4], 'graph points');
export const TABLE_RATIO = {
  m1x2: ratio(2, 1, 1),
  r_x2: ratio(1, 1, 2),
  r_half: ratio(1, 1, 0.5),
  both_x2_r_x2: ratio(2, 2, 2),
  r_x3: ratio(1, 1, 3),
};
eq(TABLE_RATIO, { m1x2: 2, r_x2: 0.25, r_half: 4, both_x2_r_x2: 1, r_x3: 1 / 9 }, 'ratio table');

// ---------------------------------------------------------------- deck 2
export const FALL_T = [0, 1, 2, 3];
export const FALL_S = FALL_T.map((t) => 0.5 * g10 * t * t);
export const FALL_V = FALL_T.map((t) => g10 * t);
eq(FALL_S, [0, 5, 20, 45], 'strobe distances');
eq(FALL_V, [0, 10, 20, 30], 'strobe speeds');
export const D2_T = 2;
export const D2_V = g10 * D2_T;
export const D2_S = 0.5 * g10 * D2_T * D2_T;
eq([D2_V, D2_S], [20, 20], 'deck free-fall example');
export const W_1KG = 1 * g10;
export const W_4KG = 4 * g10;
eq([W_1KG, W_4KG], [10, 40], 'weights of 1 kg and 4 kg');
export const D2_M = 7.5;
export const D2_WN = sig(D2_M * KGF, 3);
eq(D2_WN, 73.5, 'deck weight of 7.5 kg');
export const SB_M = 5;
export const SB_N = SB_M * KGF;
eq(SB_N, 49, 'spring balance 5 kg');

// ---------------------------------------------------------------- question numbers
// N1: two steel balls, 4 kg and 25 kg, centres 0.5 m apart
export const N1 = pull(4, 25, 0.5);
export const N1_M = sig(N1 / 1e-8, 3);
eq(N1_M, 2.67, 'N1 mantissa');
// N2: two ships, 3e6 kg and 5e6 kg, 100 m apart
export const N2 = pull(3e6, 5e6, 100);
export const N2_3 = sig(N2, 3);
eq(N2_3, 0.1, 'N2 force');
// N3: force 36 N, distance tripled
export const N3 = 36 * ratio(1, 1, 3);
eq(N3, 4, 'N3');
// N4: 18 N; m1 x2, m2 x3, r x2
export const N4 = 18 * ratio(2, 3, 2);
eq(N4, 27, 'N4');
// N5: weight of 54 kg, g = 10
export const N5 = 54 * g10;
eq(N5, 540, 'N5');
// N6: 8.5 kgf in newton
export const N6 = sig(8.5 * KGF, 3);
eq(N6, 83.3, 'N6');
// N7: mass from 735 N, g = 9.8
export const N7 = sig(735 / g98, 4);
eq(N7, 75, 'N7');
// N8: speed after 2.5 s
export const N8 = g10 * 2.5;
eq(N8, 25, 'N8');
// N9: distance in 1.5 s
export const N9 = 0.5 * g10 * 1.5 * 1.5;
eq(N9, 11.25, 'N9');
// N10: time to fall 125 m, and speed on landing
export const N10_T = Math.sqrt((2 * 125) / g10);
export const N10_V = g10 * N10_T;
eq([N10_T, N10_V], [5, 50], 'N10');
// N11: g from weight of 2.5 kg = 24.5 N
export const N11 = 24.5 / 2.5;
eq(N11, 9.8, 'N11');
// N12: weight in kgf of 30 kg is 30 kgf, in newton (g = 10) 300 N
export const N12_N = 30 * g10;
eq(N12_N, 300, 'N12');

// short and long answers
export const S3_FALL_H = 80;
export const S3_FALL_T = Math.sqrt((2 * S3_FALL_H) / g10);
export const S3_FALL_V = g10 * S3_FALL_T;
eq([S3_FALL_T, S3_FALL_V], [4, 40], 'short3 fall');
export const S3_W_M = 62;
export const S3_W_N = sig(S3_W_M * g98, 4);
export const S3_W_KGF = S3_W_M;
export const S3_M_FROM = sig(441 / g98, 4);
eq([S3_W_N, S3_M_FROM], [607.6, 45], 'short3 weight');
export const R3 = [ratio(2, 1, 1), ratio(1, 1, 0.5), ratio(2, 2, 2)];
eq(R3, [2, 4, 1], 'short3 ratios');
export const S2_CONV = sig(20 * KGF, 4);
export const S2_BACK = sig(245 / KGF, 4);
eq([S2_CONV, S2_BACK], [196, 25], 'short2 conversions');

// long: apple and the Earth
export const APPLE_M = 0.15;
export const APPLE_W = APPLE_M * g10;
export const EARTH_M = 6e24;
export const EARTH_A = APPLE_W / EARTH_M;
eq(APPLE_W, 1.5, 'apple weight');
eq(sig(EARTH_A, 2), 2.5e-25, 'acceleration of the Earth');
// long: fall data table s = 1/2 g t^2 for t = 1..5; s/t^2 = 5
export const TAB_T = [0.5, 1, 1.5, 2];
export const TAB_S = TAB_T.map((t) => 0.5 * g10 * t * t);
export const TAB_K = TAB_S.map((s, i) => s / (TAB_T[i] * TAB_T[i]));
eq(TAB_S, [1.25, 5, 11.25, 20], 'fall table');
eq(TAB_K, [5, 5, 5, 5], 'fall table s over t squared');
export const TAB_V2 = g10 * 2;
eq(TAB_V2, 20, 'speed at the end of 2 s');
export const TAB_G = 2 * TAB_K[0];
eq(TAB_G, 10, 'g from table');
// long: two bodies, lettered figure, force ratio
export const LF0 = 0.6; // N at the drawn separation (hypothetical)
export const LF_NEW = sig(LF0 * ratio(2, 1, 2), 3);
eq(LF_NEW, 0.3, 'lettered figure ratio force');
// long: shopper's spring balance
export const SH_M = 2.5;
export const SH_N = SH_M * g10;
export const SH_N98 = sig(SH_M * KGF, 3);
eq([SH_N, SH_N98], [25, 24.5], 'rice weights');
// long: Newton's tube
export const TUBE_V = g10 * 0.4;
eq(sig(TUBE_V, 2), 4, 'tube speed');
// long: two girls, force as ratio
export const GIRL_F = pull(48, 52, 2);
eq(sig(GIRL_F, 3), 4.16e-8, 'girls force');
export const GIRL_FM = sig(GIRL_F / 1e-8, 3);
export const GIRL_F2 = GIRL_F * ratio(1, 1, 0.5);
export const GIRL_F2M = sig(GIRL_F2 / 1e-8, 3);
eq([GIRL_FM, GIRL_F2M], [4.16, 16.6], 'girls force mantissas');
// long: moon and astronaut (qualitative) - weight on Earth of an astronaut 72 kg (g = 10) is 720 N
export const AST_M = 72;
export const AST_W = AST_M * g10;
eq(AST_W, 720, 'astronaut weight');

// chk-kgf options
export const K3 = sig(3 * KGF, 3);
export const K3_DIV = sig(3 / KGF, 3);
export const K3_ODD = sig(KGF / 3, 3);
eq([K3, K3_DIV, K3_ODD], [29.4, 0.306, 3.27], 'chk-kgf options');
// fall-mcq2: speed after 6 s, with its distractors
export const F6 = [g10 * 6, (g10 * 6) / 2, 0.5 * g10 * 36];
eq(F6, [60, 30, 180], 'fall-mcq2');
// wt-mcq4 and wt-mcq7
export const W3 = 3 * g10;
export const M196 = sig(196 / g98, 4);
export const M196_BAD = [sig(196 / 10, 3), sig(196 * g98, 5)];
eq([W3, M196, M196_BAD], [30, 20, [19.6, 1920.8]], 'wt-mcq4 and wt-mcq7');
// long-tube: coin 5 g and feather 0.5 g, tube 0.80 m
export const COIN_M = 0.005;
export const FEATHER_M = 0.0005;
export const COIN_W = COIN_M * g10;
export const FEATHER_W = FEATHER_M * g10;
export const PULL_RATIO = sig(COIN_W / FEATHER_W, 3);
export const TUBE_L = 0.8;
export const TUBE_T = Math.sqrt((2 * TUBE_L) / g10);
export const TUBE_VEL = g10 * TUBE_T;
eq([sig(COIN_W, 2), sig(FEATHER_W, 2), PULL_RATIO, sig(TUBE_T, 2), sig(TUBE_VEL, 2)], [0.05, 0.005, 10, 0.4, 4], 'long-tube numbers');
// long-ships (girls): weight of the 48 kg girl against the mutual pull
export const GIRL_W = 48 * g10;
export const GIRL_TIMES = sig(GIRL_W / GIRL_F, 2);
eq([GIRL_W, GIRL_TIMES], [480, 1.2e10], 'girl weight and times');
// long-apple: g of the mango against the acceleration of the Earth
export const A_RATIO = sig(g10 / EARTH_A, 2);
eq(A_RATIO, 4e25, 'g over the acceleration of the Earth');
