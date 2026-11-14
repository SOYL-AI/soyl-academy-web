// Shared computed data for ISC 11 Chemistry ch14 Ionic Equilibrium: Acids, Bases and pH (decks, notes, questions, SVGs).
// Standard values at 298 K unless stated: Ka(CH3COOH) 1.8e-5, Kb(NH3) 1.8e-5, Kw 1.0e-14; Ka(HCOOH) 1.8e-4, Ka(HNO2) 4.5e-4, Ka(C6H5COOH) 6.5e-5,
// Ka(HCN) 4.9e-10; H3PO4 Ka1 7.5e-3, Ka2 6.2e-8, Ka3 4.8e-13; Kb(CH3NH2) 4.4e-4; Kw 5.5e-14 at 323 K and 5.1e-13 at 373 K.
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
export const log10 = Math.log10;

export const KW = 1.0e-14;
export const KA = { acetic: 1.8e-5, formic: 1.8e-4, nitrous: 4.5e-4, benzoic: 6.5e-5, hcn: 4.9e-10 };
export const KB = { ammonia: 1.8e-5, methylamine: 4.4e-4 };
export const PHOS = { k1: 7.5e-3, k2: 6.2e-8, k3: 4.8e-13 };
export const KW_T = { 298: 1.0e-14, 323: 5.5e-14, 373: 5.1e-13 };

const quad = (a, b, c) => (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
/** Degree of ionisation of a weak electrolyte of constant K at concentration C (exact, quadratic). */
export const alphaExact = (K, C) => quad(C, K, -K);
/** Approximation alpha = sqrt(K / C). */
export const alphaApprox = (K, C) => Math.sqrt(K / C);
/** [H+] (or [OH-]) of a weak monoprotic acid (base): exact and approximate. */
export const hExact = (K, C) => C * alphaExact(K, C);
export const hApprox = (K, C) => Math.sqrt(K * C);
export const pH = (h) => -log10(h);

/** pH of a solution by charge balance, bisection on log h; fn(h) must be increasing in h. */
const bisect = (fn) => {
  let lo = -14.5, hi = 0.5;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (fn(10 ** mid) > 0) hi = mid;
    else lo = mid;
  }
  return -(lo + hi) / 2;
};
/** Strong acid (Ca, mol/L, volume Va mL) titrated with strong base (Cb, Vb mL added). */
export const phSASB = (Ca, Va, Cb, Vb) => {
  const V = Va + Vb, a = (Ca * Va) / V, b = (Cb * Vb) / V;
  return bisect((h) => b + h - a - KW / h);
};
/** Weak acid (constant Ka) titrated with a strong base. */
export const phWASB = (Ka, Ca, Va, Cb, Vb) => {
  const V = Va + Vb, a = (Ca * Va) / V, b = (Cb * Vb) / V;
  return bisect((h) => b + h - (a * Ka) / (Ka + h) - KW / h);
};
/** Weak base (constant Kb) titrated with a strong acid. */
export const phWBSA = (Kb, Cb, Vb, Ca, Va) => {
  const V = Va + Vb, a = (Ca * Va) / V, b = (Cb * Vb) / V;
  const Kap = KW / Kb;
  return bisect((h) => (b * h) / (Kap + h) + h - a - KW / h);
};
