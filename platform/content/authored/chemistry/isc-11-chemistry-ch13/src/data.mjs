// Shared computed data for ISC 11 Chemistry ch13 Chemical Equilibrium (decks, notes, questions, SVGs).
// Constants: R = 0.0821 L atm K⁻¹ mol⁻¹ (= 8.314 J K⁻¹ mol⁻¹). Standard textbook values; invented numbers are labelled (given) where used.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-12, Math.abs(b) * rel);
export const f0 = (x) => x.toFixed(0);
export const f1 = (x) => x.toFixed(1);
export const f2 = (x) => x.toFixed(2);
export const f3 = (x) => x.toFixed(3);
export const f4 = (x) => x.toFixed(4);
/** Scientific notation as plain text, for example 1.8 × 10⁻⁵. */
export const ex = (x, d = 2) => x.toExponential(d - 1).replace(/e([+-])(\d+)/, (_, s, n) => ` × 10${s === '-' ? '⁻' : ''}${[...String(Number(n))].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')}`);
/** Scientific notation as LaTeX for use inside $…$. */
export const exL = (x, d = 2) => x.toExponential(d - 1).replace(/e([+-])(\d+)/, (_, s, n) => ` \\times 10^{${s === '-' ? '-' : ''}${Number(n)}}`);
export const RA = 0.0821;
export const RJ = 8.314;

const quad = (a, b, c) => {
  const d = Math.sqrt(b * b - 4 * a * c);
  return [(-b - d) / (2 * a), (-b + d) / (2 * a)];
};

// ---- esterification  CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O, Kc = 4.0 (standard value near 298 K)
export const K_EST = 4.0;
/** Moles of ester at equilibrium from a mol acid and b mol alcohol (no water or ester initially). */
export const esterX = (a, b, K = K_EST) => quad(1 - K, K * (a + b), -K * a * b).find((x) => x > 0 && x <= Math.min(a, b) + 1e-9);

// ---- Br2 + Cl2 <=> 2BrCl, Kc = 7.0 at 400 K (standard textbook value)
export const K_BRCL = 7.0;
/** Start c mol/L each of Br2 and Cl2: equilibrium [BrCl] = 2x. */
export const brclForward = (c, K = K_BRCL) => {
  const x = (c * Math.sqrt(K)) / (2 + Math.sqrt(K));
  return { x, brcl: 2 * x, left: c - x };
};
/** Start c mol/L BrCl only: x = [Br2] = [Cl2] at equilibrium. */
export const brclReverse = (c, K = K_BRCL) => {
  const x = c / (Math.sqrt(K) + 2);
  return { x, brcl: c - 2 * x };
};

// ---- N2O4 <=> 2NO2 by degree of dissociation alpha at total pressure P
export const kpAlpha = (alpha, P) => (4 * alpha * alpha * P) / (1 - alpha * alpha);
export const alphaFromKp = (Kp, P) => Math.sqrt(Kp / (Kp + 4 * P));
/** alpha from the observed and theoretical molar masses (one mole of reactant gives 1 + alpha moles). */
export const alphaFromM = (Mth, Mobs) => Mth / Mobs - 1;

// ---- 2HI <=> H2 + I2 by degree of dissociation (Delta n = 0): Kc = alpha^2 / (4 (1 - alpha)^2)
export const kcHI = (alpha) => (alpha * alpha) / (4 * (1 - alpha) * (1 - alpha));

// ---- Haber process model: N2 + 3H2 <=> 2NH3, dH = -92.4 kJ per equation, Kp(298 K) = 5.6e5 atm^-2 (from dG = -32.8 kJ)
export const HABER = { dH: -92.4, K298: 5.6e5 };
export const kpT = (T, K0 = HABER.K298, dH = HABER.dH) => K0 * Math.exp(-((dH * 1000) / RJ) * (1 / T - 1 / 298));
/** Mole fraction of NH3 at equilibrium for a 1:3 feed at total pressure P (atm) and temperature T (K), ideal gases. */
export const haberY = (P, T) => {
  const g = P * Math.sqrt((27 * kpT(T)) / 256);
  return (2 * g + 1 - Math.sqrt(4 * g + 1)) / (2 * g);
};

// ---- kinetic model for N2O4 <=> 2NO2 used in two diagrams (illustrative): kf = 0.10 s^-1, kr = 0.20 L mol^-1 s^-1, Kc = kf/kr = 0.50 mol L^-1
export const KIN = { kf: 0.1, kr: 0.2 };
export const KC_KIN = KIN.kf / KIN.kr;
/** Equilibrium [NO2] when the total is equivalent to a mol/L of N2O4. */
export const eqKin = (a) => {
  const y = quad(1, KC_KIN / 2, -KC_KIN * a)[1]; // y^2 / (a - y/2) = Kc
  return { y, A: a - y / 2 };
};
/** RK4 integration; state [A (N2O4), y (NO2)]. Returns a function advancing the state by time t. */
export const stepKin = (s, t, dt = 0.01) => {
  let [A, y] = s;
  const f = (A_, y_) => [-KIN.kf * A_ + KIN.kr * y_ * y_, 2 * (KIN.kf * A_ - KIN.kr * y_ * y_)];
  const n = Math.round(t / dt);
  for (let i = 0; i < n; i++) {
    const k1 = f(A, y);
    const k2 = f(A + (dt / 2) * k1[0], y + (dt / 2) * k1[1]);
    const k3 = f(A + (dt / 2) * k2[0], y + (dt / 2) * k2[1]);
    const k4 = f(A + dt * k3[0], y + dt * k3[1]);
    A += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
  }
  return [A, y];
};
