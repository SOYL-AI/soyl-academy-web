// ch12 Ecosystem — productivity and energy arithmetic used by decks, SVGs and questions.
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
