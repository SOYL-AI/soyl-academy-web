// ISC 12 Biology ch17 Ecosystem — productivity and energy arithmetic (copied from cbse-12-biology-ch12, same author), with a
// litter-decomposition model added for ISC.
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
/** NPP = GPP − R */
export const npp = (gpp, resp) => gpp - resp;
/** Energy at each trophic level by the 10 percent law, starting from e0 at the producers. */
export const tenPercent = (e0, levels, f = 0.1) => Array.from({ length: levels }, (_, i) => round(e0 * f ** i, 6));
/** Ecological efficiency (percent) of transfer from one level to the next. */
export const efficiency = (out, inp) => round((out / inp) * 100, 1);
export const pct = (part, whole) => round((part / whole) * 100, 1);
/** A pyramid is upright when every level is smaller than the one below it. */
export const upright = (levels) => levels.every((v, i) => i === 0 || v < levels[i - 1]);
/** Litter mass remaining after t months with decay constant k per month: M = M0 e^(−kt). */
export const litterLeft = (m0, k, t) => round(m0 * Math.exp(-k * t), 1);
/** Model decay constants (per month) for a warm, moist forest and a cold, dry habitat. */
export const K_DECAY = { warm: 0.25, cold: 0.03 };
