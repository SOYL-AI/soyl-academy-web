// ch17 Locomotion and Movement — every number used by decks, SVGs and questions, asserted here.
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- skeleton (NCERT counts)
/** Skull: 8 cranial, 14 facial, the hyoid and 3 ear ossicles on each side. */
export const SKULL = { cranial: 8, facial: 14, hyoid: 1, ossicles: 6 };
export const SKULL_N = sum(SKULL);
check(SKULL_N === 29, 'skull 29');
/** Vertebral column: cervical 7, thoracic 12, lumbar 5, sacral 1 (fused), coccygeal 1 (fused). */
export const VERT = { cervical: 7, thoracic: 12, lumbar: 5, sacral: 1, coccygeal: 1 };
export const VERT_N = sum(VERT);
check(VERT_N === 26, 'vertebrae 26');
/** Ribs: 12 pairs; true 7 pairs, false (vertebrochondral) 3 pairs, floating 2 pairs. */
export const RIB_PAIRS = { true: 7, false: 3, floating: 2 };
export const RIBS_N = 2 * sum(RIB_PAIRS);
check(RIBS_N === 24, 'ribs 24');
export const AXIAL = { skull: SKULL_N, vertebrae: VERT_N, sternum: 1, ribs: RIBS_N };
export const AXIAL_N = sum(AXIAL);
check(AXIAL_N === 80, 'axial 80');
/** One fore limb: humerus, radius, ulna, 8 carpals, 5 metacarpals, 14 phalanges. */
export const FORE = { humerus: 1, radius: 1, ulna: 1, carpals: 8, metacarpals: 5, phalanges: 14 };
/** One hind limb: femur, tibia, fibula, 7 tarsals, 5 metatarsals, 14 phalanges, patella. */
export const HIND = { femur: 1, tibia: 1, fibula: 1, tarsals: 7, metatarsals: 5, phalanges: 14, patella: 1 };
export const FORE_N = sum(FORE);
export const HIND_N = sum(HIND);
check(FORE_N === 30 && HIND_N === 30, 'each limb 30');
export const LIMBS_N = 2 * FORE_N + 2 * HIND_N;
check(LIMBS_N === 120, 'limbs 120');
/** Girdles: pectoral (clavicle + scapula) each side, pelvic (one coxal bone) each side. */
export const GIRDLES = { pectoral: 4, pelvic: 2 };
export const GIRDLES_N = sum(GIRDLES);
check(GIRDLES_N === 6, 'girdles 6');
export const APPEND_N = LIMBS_N + GIRDLES_N;
check(APPEND_N === 126, 'appendicular 126');
export const TOTAL_N = AXIAL_N + APPEND_N;
check(TOTAL_N === 206, 'total 206');
export const PHALANGES_N = 4 * 14;
check(PHALANGES_N === 56, 'phalanges 56');

// ---------------------------------------------------------------- sarcomere (illustrative lengths in micrometres)
// Typical vertebrate values; NCERT gives no lengths. Myosin (A band) about 1.6, each actin filament about 1.0 from its Z line.
export const MYOSIN = 1.6;
export const ACTIN = 1.0;
/** Band widths for a sarcomere of length L: A constant, I = L - A, H = L - 2 x actin (never below 0). */
export function bands(L, a = MYOSIN, act = ACTIN) {
  return { L, A: a, I: round(L - a, 2), H: round(Math.max(0, L - 2 * act), 2) };
}
export const RELAXED = bands(2.5);
export const CONTRACTED = bands(2.1);
check(RELAXED.I === 0.9 && RELAXED.H === 0.5, 'relaxed bands');
check(CONTRACTED.I === 0.5 && CONTRACTED.H === 0.1, 'contracted bands');
check(RELAXED.A === CONTRACTED.A, 'A band constant');
/** Shortening of a myofibril of n sarcomeres in series, each shortening by d. */
export const fibrilShortening = (n, d) => round(n * d, 3);
export const WE2 = { n: 4000, from: 2.5, to: 2.1 };
WE2.d = round(WE2.from - WE2.to, 2);
WE2.um = fibrilShortening(WE2.n, WE2.d);
WE2.lenBefore = round((WE2.n * WE2.from) / 1000, 2);
WE2.lenAfter = round((WE2.n * WE2.to) / 1000, 2);
WE2.mm = round(WE2.um / 1000, 2);
WE2.umBefore = round(WE2.n * WE2.from, 1);
WE2.umAfter = round(WE2.n * WE2.to, 1);
check(WE2.umBefore === 10000 && WE2.umAfter === 8400, 'myofibril lengths');
check(WE2.d === 0.4 && WE2.um === 1600 && WE2.mm === 1.6 && WE2.lenBefore === 10 && WE2.lenAfter === 8.4, 'worked example 2');
check(round(WE2.lenBefore - WE2.lenAfter, 2) === WE2.mm, 'worked example 2 consistency');
// Question and case numbers (same rules, other illustrative lengths)
export const Q_IBAND = bands(2.3);
check(Q_IBAND.I === 0.7, 'iband question 0.7');
export const Q_HZONE = bands(2.4);
check(Q_HZONE.H === 0.4, 'hzone question 0.4');
export const Q_FIBRE = { cm: 3, from: 2.5, to: 2.2 };
Q_FIBRE.n = round((Q_FIBRE.cm * 10000) / Q_FIBRE.from, 0);
Q_FIBRE.d = round(Q_FIBRE.from - Q_FIBRE.to, 2);
Q_FIBRE.um = fibrilShortening(Q_FIBRE.n, Q_FIBRE.d);
Q_FIBRE.mm = round(Q_FIBRE.um / 1000, 2);
check(Q_FIBRE.n === 12000 && Q_FIBRE.d === 0.3 && Q_FIBRE.um === 3600 && Q_FIBRE.mm === 3.6, 'fibre shortening 3.6 mm');
export const CASE_R = bands(2.6);
export const CASE_C = bands(2.2);
check(CASE_R.I === 1 && CASE_R.H === 0.6 && CASE_C.I === 0.6 && CASE_C.H === 0.2, 'case sarcomere bands');
export const CASE_LIMIT = bands(2 * ACTIN);
check(CASE_LIMIT.H === 0 && CASE_LIMIT.I === 0.4, 'H zone vanishes at 2.0');
export const NOT_STERNAL = 2 * (RIB_PAIRS.false + RIB_PAIRS.floating);
check(NOT_STERNAL === 10, 'ribs not joined directly to sternum 10');
export const UPPER_WITH_GIRDLE = 2 * FORE_N + GIRDLES.pectoral;
check(UPPER_WITH_GIRDLE === 64, 'two fore limbs and pectoral girdles 64');
export const pct = (part, whole, dp = 0) => round((part / whole) * 100, dp);
WE2.pct = pct(WE2.d, WE2.from);
check(WE2.pct === 16, 'shortening 16 percent');
