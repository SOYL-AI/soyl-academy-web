// ISC 11 Biology ch19 Locomotion and Movement: every number used in a stem, answer, table, slide or diagram is computed here.
// Sarcomere geometry, stimulation intervals and the summation model, and the bone counts of the human skeleton.
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws unless the computed value matches the expected one: guards every number printed in the chapter. */
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

// ---------------------------------------------------------------- sarcomere geometry (micrometres)
/** Model values used throughout the chapter: thick filament (A band) 1.5, thin filament 1.0 from each Z line. */
export const GEO = { a: 1.5, thin: 1.0 };
/** Band widths of one sarcomere of length `sarc`: total I band (both halves), overlap of thin and thick on each side, H zone. */
export function bands(sarc, { a, thin } = GEO) {
  const i = round(sarc - a, 2);
  const overlap = round(thin - i / 2, 2); // thin filament inside the A band, on each side
  const h = Math.max(0, round(a - 2 * overlap, 2));
  return { sarc, a, i, halfI: round(i / 2, 2), overlap, h };
}
export const REL = 2.8; // relaxed
export const CON = 2.2; // contracted
export const MAXC = 2.0; // strongly contracted: H zone just closed
export const B_REL = bands(REL);
export const B_CON = bands(CON);
export const B_MAX = bands(MAXC);
eq(B_REL.i, 1.3, 'relaxed I band');
eq(B_REL.h, 0.8, 'relaxed H zone');
eq(B_CON.i, 0.7, 'contracted I band');
eq(B_CON.h, 0.2, 'contracted H zone');
eq(B_MAX.h, 0, 'H zone at 2.0');
eq(B_REL.a, B_CON.a, 'A band constant');
export const shortenPct = (from, to) => round(((from - to) / from) * 100, 1);
eq(shortenPct(REL, CON), 21.4, 'sarcomere shortening percent');
/** A fibre of `lenCm` made of sarcomeres of `sarcUm` end to end: how many in series, and its length after each shortens to `toUm`. */
export const inSeries = (lenCm, sarcUm) => Math.round((lenCm * 10000) / sarcUm);
export const fibreShortMm = (lenCm, sarcUm, toUm) => round((inSeries(lenCm, sarcUm) * (sarcUm - toUm)) / 1000, 1);
eq(inSeries(4.2, REL), 15000, 'sarcomeres in 4.2 cm');
eq(fibreShortMm(4.2, REL, CON), 9, 'shortening of a 4.2 cm fibre in mm');
/** Sarcomere lengths at which the case table is measured. */
export const SARC_SERIES = [3.0, REL, 2.4, CON, MAXC];
export const SERIES = SARC_SERIES.map((s) => bands(s));
eq(SERIES.map((b) => b.h), [1.0, 0.8, 0.4, 0.2, 0], 'H zone series');
eq(SERIES.map((b) => b.i), [1.5, 1.3, 0.9, 0.7, 0.5], 'I band series');

// ---------------------------------------------------------------- stimulation and the twitch model (milliseconds)
export const TWITCH = { rise: 40, total: 120 }; // contraction and whole-twitch duration in the model
export const interval = (perSecond) => round(1000 / perSecond, 1);
/** Response of the model muscle to stimuli at the given interval: separate twitches, summation or fused tetanus. */
export function response(intervalMs) {
  if (intervalMs >= TWITCH.total) return 'separate twitches';
  if (intervalMs > TWITCH.rise) return 'summation';
  return 'fused tetanus';
}
eq(interval(25), 40, 'interval at 25 per second');
eq(interval(5), 200, 'interval at 5 per second');
eq(response(interval(5)), 'separate twitches', 'response at 5 per second');
eq(response(interval(10)), 'summation', 'response at 10 per second');
eq(response(interval(50)), 'fused tetanus', 'response at 50 per second');
/** Superposition model: each stimulus adds a twitch k(t) = (t/tau) exp(1 - t/tau), peak 1 at t = tau (40 ms). */
const kernel = (t) => (t <= 0 ? 0 : (t / TWITCH.rise) * Math.exp(1 - t / TWITCH.rise));
export const trace = (intervalMs, n, tEnd, dt = 2) => {
  const pts = [];
  for (let t = 0; t <= tEnd; t += dt) {
    let s = 0;
    for (let k = 0; k < n; k++) s += kernel(t - k * intervalMs);
    pts.push([t, 4 * Math.tanh(s / 4)]); // saturating, so a fused tetanus levels off
  }
  return pts;
};
export const peak = (pts) => round(Math.max(...pts.map((p) => p[1])), 2);
export const T_SINGLE = trace(1000, 1, 600);
export const T_SUM = trace(80, 6, 600);
export const T_TET = trace(20, 20, 600);
export const PEAKS = { single: peak(T_SINGLE), sum: peak(T_SUM), tet: peak(T_TET) };
eq(PEAKS.single, 0.98, 'single twitch peak');
eq(PEAKS.sum > PEAKS.single && PEAKS.tet > PEAKS.sum, true, 'summation and tetanus exceed a single twitch');

// ---------------------------------------------------------------- bone counts of the adult skeleton
export const SKULL = { cranium: 8, face: 14, hyoid: 1, ossicles: 6 };
export const SKULL_N = Object.values(SKULL).reduce((a, b) => a + b, 0);
export const VERT = { cervical: 7, thoracic: 12, lumbar: 5, sacrum: 1, coccyx: 1 }; // adult: sacrum and coccyx are fused
export const VERT_N = Object.values(VERT).reduce((a, b) => a + b, 0);
export const SACRAL_FUSED = 5; // separate sacral vertebrae of a child, fused into the sacrum
export const COCCYX_FUSED = 4; // separate coccygeal vertebrae, fused into the coccyx
export const VERT_CHILD = VERT.cervical + VERT.thoracic + VERT.lumbar + SACRAL_FUSED + COCCYX_FUSED;
export const RIBS = { true: 7, false: 3, floating: 2 }; // pairs
export const RIB_PAIRS = Object.values(RIBS).reduce((a, b) => a + b, 0);
export const RIB_N = RIB_PAIRS * 2;
export const AXIAL = { skull: SKULL_N, vertebral: VERT_N, sternum: 1, ribs: RIB_N };
export const AXIAL_N = Object.values(AXIAL).reduce((a, b) => a + b, 0);
export const HAND = { carpals: 8, metacarpals: 5, phalanges: 14 };
export const FOOT = { tarsals: 7, metatarsals: 5, phalanges: 14 };
export const HAND_N = Object.values(HAND).reduce((a, b) => a + b, 0);
export const FOOT_N = Object.values(FOOT).reduce((a, b) => a + b, 0);
export const ARM_N = 3 + HAND_N; // humerus, radius, ulna + hand
export const LEG_N = 4 + FOOT_N; // femur, tibia, fibula, patella + foot
export const GIRDLE_P = 4; // 2 clavicles + 2 scapulae
export const GIRDLE_L = 2; // 2 hip bones
export const APPEND = { pectoral: GIRDLE_P, upper: ARM_N * 2, pelvic: GIRDLE_L, lower: LEG_N * 2 };
export const APPEND_N = Object.values(APPEND).reduce((a, b) => a + b, 0);
export const TOTAL = AXIAL_N + APPEND_N;
export const HANDS_FEET = 2 * (HAND_N + FOOT_N);
eq(SKULL_N, 29, 'skull bones (with hyoid and ossicles)');
eq(VERT_N, 26, 'adult vertebral column');
eq(VERT_CHILD, 33, 'child vertebrae');
eq(RIB_N, 24, 'ribs');
eq(AXIAL_N, 80, 'axial skeleton');
eq(HAND_N, 27, 'bones in a hand');
eq(FOOT_N, 26, 'bones in a foot');
eq(ARM_N, 30, 'bones in an upper limb');
eq(LEG_N, 30, 'bones in a lower limb');
eq(APPEND_N, 126, 'appendicular skeleton');
eq(TOTAL, 206, 'whole skeleton');
eq(HANDS_FEET, 106, 'bones in both hands and both feet');
eq(AXIAL.sternum + AXIAL.ribs, 25, 'sternum and ribs');
export const MOVABLE_VERT = VERT.cervical + VERT.thoracic + VERT.lumbar;
eq(MOVABLE_VERT, 24, 'movable vertebrae');
