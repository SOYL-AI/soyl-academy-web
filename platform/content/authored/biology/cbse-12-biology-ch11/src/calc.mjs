// ch11 Organisms and Populations — population arithmetic used by decks, SVGs and questions.
const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export { round };
/** Per-capita rate: events per individual per unit time. */
export const rate = (events, N, dp = 3) => round(events / N, dp);
/** N(t+1) = N(t) + [(B + I) − (D + E)] */
export const nextN = (Nt, B, I, D, E) => Nt + (B + I) - (D + E);
/** Exponential growth N(t) = N0 e^{rt}. */
export const expN = (N0, r, t) => N0 * Math.exp(r * t);
/** Logistic growth rate dN/dt = rN (K − N)/K. */
export const logisticRate = (r, N, K) => (r * N * (K - N)) / K;
/** Logistic solution N(t) = K / (1 + ((K − N0)/N0) e^{−rt}). */
export const logisticN = (N0, r, K, t) => K / (1 + ((K - N0) / N0) * Math.exp(-r * t));
/** Doubling time for exponential growth, ln 2 / r. */
export const doublingTime = (r) => Math.log(2) / r;
/** Intrinsic rates quoted in the chapter (per individual per year). */
export const R = { rat: 0.015, beetle: 0.12, india1981: 0.0205 };
