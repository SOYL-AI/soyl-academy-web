// ISC 12 Biology ch16 Organisms and Populations — population arithmetic (copied from cbse-12-biology-ch11, same author),
// with density, mark–recapture, sex ratio and a competition model added for ISC.
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

// ---------------------------------------------------------------- new for ISC ch16
/** Density from a count in a sampled area (individuals per unit area). */
export const density = (count, area, dp = 2) => round(count / area, dp);
/** Mark–recapture (Lincoln index): N = marked × caught ÷ recaptured marked. */
export const lincoln = (marked, caught, recaptured) => Math.round((marked * caught) / recaptured);
/** Sex ratio as females per 1000 males. */
export const perThousand = (f, m) => Math.round((f / m) * 1000);
/**
 * Two competing species (Lotka–Volterra competition, daily Euler steps). a12: effect of 2 on 1; a21: effect of 1 on 2.
 * Returns arrays of [day, N1, N2].
 */
export function compete({ r1, r2, K1, K2, a12, a21, n1, n2, days }) {
  const out = [[0, n1, n2]];
  let x = n1, y = n2;
  for (let d = 1; d <= days; d += 1) {
    const dx = (r1 * x * (K1 - x - a12 * y)) / K1;
    const dy = (r2 * y * (K2 - y - a21 * x)) / K2;
    x = Math.max(0, x + dx);
    y = Math.max(0, y + dy);
    out.push([d, round(x, 1), round(y, 1)]);
  }
  return out;
}
/** Gause-style parameters (model values): species 1 wins, species 2 is excluded when they are grown together. */
export const GAUSE = { r1: 0.8, r2: 0.7, K1: 200, K2: 160, a12: 0.4, a21: 1.6, n1: 5, n2: 5, days: 24 };
