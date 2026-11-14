// ch19 constants and estimation formulas (the single source of every number printed in stems and solutions).
// Atomic masses (given in the brief): H 1, C 12, N 14, O 16, Mg 24, P 31, S 32, Cl 35.5, Ag 108, Ba 137, Br 80, I 127.
export const A = { H: 1, C: 12, N: 14, O: 16, Mg: 24, P: 31, S: 32, Cl: 35.5, Br: 80, I: 127, Ag: 108, Ba: 137 };
export const MM = {
  CO2: A.C + 2 * A.O,
  H2O: 2 * A.H + A.O,
  BaSO4: A.Ba + A.S + 4 * A.O,
  AgCl: A.Ag + A.Cl,
  AgBr: A.Ag + A.Br,
  AgI: A.Ag + A.I,
  Mg2P2O7: 2 * A.Mg + 2 * A.P + 7 * A.O,
};
/** Liebig: %C = 12/44 x m(CO2)/m x 100 */
export const pctC = (mCO2, m) => (A.C / MM.CO2) * (mCO2 / m) * 100;
/** Liebig: %H = 2/18 x m(H2O)/m x 100 */
export const pctH = (mH2O, m) => ((2 * A.H) / MM.H2O) * (mH2O / m) * 100;
/** Kjeldahl: %N = 1.4 x N x V / m, N the normality of the acid, V its volume (mL) neutralised by the ammonia, m in g */
export const pctN = (normality, mL, m) => (1.4 * normality * mL) / m;
/** Carius: %X = (atomic or group mass / molar mass of precipitate) x m(precipitate)/m x 100 */
export const pctFrom = (part, ppt, mPpt, m) => (part / ppt) * (mPpt / m) * 100;
export const f = (x, d) => x.toFixed(d);
