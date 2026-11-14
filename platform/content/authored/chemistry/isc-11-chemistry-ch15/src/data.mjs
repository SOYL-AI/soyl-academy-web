// Shared computed data for ISC 11 Chemistry ch15 Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product (decks, notes, questions, SVGs).
// Constants (stated wherever used): Kw = 1.0e-14 at 298 K; Ka(ethanoic acid) = Kb(ammonia) = 1.8e-5 (pK = 4.745); Ka(methanoic acid) = 1.8e-4;
// Ka(HCN) = 4.9e-10; Ka(benzoic acid) = 6.3e-5; Ka1(H2S) = 1.0e-7 and Ka2(H2S) = 1.2e-13 (given); saturated H2S is 0.10 mol/L.
// Ksp (298 K): AgCl 1.8e-10, BaSO4 1.1e-10, PbI2 7.1e-9, Ag2CrO4 1.1e-12, CaF2 3.4e-11 (the next four are given values for practice):
// Mg(OH)2 1.8e-11, Fe(OH)3 4.0e-38, CuS 6.0e-36, MnS 2.5e-10.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-12, Math.abs(b) * rel);
export const Kw = 1.0e-14;
export const KA = { acetic: 1.8e-5, formic: 1.8e-4, HCN: 4.9e-10, benzoic: 6.3e-5 };
export const KB = { ammonia: 1.8e-5 };
export const KSP = { AgCl: 1.8e-10, BaSO4: 1.1e-10, PbI2: 7.1e-9, Ag2CrO4: 1.1e-12, CaF2: 3.4e-11, MgOH2: 1.8e-11, FeOH3: 4.0e-38, CuS: 6.0e-36, MnS: 2.5e-10 };
export const KH2S = { k1: 1.0e-7, k2: 1.2e-13 };
export const pK = (k) => Number((-Math.log10(k)).toFixed(2)); // pK rounded to 2 dp: the printed value is the one used in every calculation
export const pH = (h) => -Math.log10(h);

// ---- common ion effect
/** [H+] of a weak acid HA alone: sqrt(Ka c). */
export const hWeak = (Ka, c) => Math.sqrt(Ka * c);
/** Degree of ionisation of a weak electrolyte alone. */
export const alphaWeak = (K, c) => Math.sqrt(K / c);
/** [H+] of an acidic buffer / acid with a common-ion salt: Ka [acid]/[salt]. */
export const hMix = (Ka, ca, cs) => (Ka * ca) / cs;
/** [OH-] of a weak base with its salt: Kb [base]/[salt]. */
export const ohMix = (Kb, cb, cs) => (Kb * cb) / cs;
export const ohToPH = (oh) => 14 - pH(oh);

// ---- hydrolysis
export const pHsawb = (c, Kb) => 7 - 0.5 * (pK(Kb) + Math.log10(c)); // strong acid + weak base salt (e.g. NH4Cl)
export const pHwasb = (c, Ka) => 7 + 0.5 * (pK(Ka) + Math.log10(c)); // weak acid + strong base salt (e.g. CH3COONa)
export const pHwawb = (Ka, Kb) => 7 + 0.5 * (pK(Ka) - pK(Kb)); // weak acid + weak base salt
export const Kh = (Kw_, Kweak) => Kw_ / Kweak;
export const hDeg = (Khyd, c) => Math.sqrt(Khyd / c);

// ---- buffers
export const hh = (pKa, salt, acid) => pKa + Math.log10(salt / acid);

// ---- solubility product
export const sAB = (Ksp) => Math.sqrt(Ksp);
export const sAB2 = (Ksp) => Math.cbrt(Ksp / 4);
export const kspAB = (s) => s * s;
export const kspAB2 = (s) => 4 * s ** 3;
/** Ionic product Qsp for an AxBy salt: [A]^x [B]^y. */
export const Q = (a, x, b, y) => a ** x * b ** y;
export const sH2S = (h, H2S = 0.1) => (KH2S.k1 * KH2S.k2 * H2S) / (h * h);

// ---- standard comparison sets used in SVGs and worked examples
export const ACID_SET = (() => {
  const c = 0.1;
  const alone = hWeak(KA.acetic, c);
  const s1 = 0.1;
  const s2 = 0.5;
  return { c, alone, pH0: pH(alone), pH1: pH(hMix(KA.acetic, c, s1)), pH2: pH(hMix(KA.acetic, c, s2)), s1, s2 };
})();
export const SALTS = [
  { name: 'NH4Cl 0.10 M', pH: pHsawb(0.1, KB.ammonia), kind: 'SA-WB' },
  { name: 'NaCl', pH: 7, kind: 'SA-SB' },
  { name: 'CH3COONa 0.10 M', pH: pHwasb(0.1, KA.acetic), kind: 'WA-SB' },
  { name: 'CH3COONH4', pH: pHwawb(KA.acetic, KB.ammonia), kind: 'WA-WB' },
  { name: 'NH4CN', pH: pHwawb(KA.HCN, KB.ammonia), kind: 'WA-WB' },
];
export const BUF = { pKa: pK(KA.acetic) };
export const SOL_SET = (() => {
  const out = {};
  out.AgCl = sAB(KSP.AgCl);
  out.BaSO4 = sAB(KSP.BaSO4);
  out.PbI2 = sAB2(KSP.PbI2);
  out.CaF2 = sAB2(KSP.CaF2);
  out.MgOH2 = sAB2(KSP.MgOH2);
  return out;
})();
// AgCl solubility in NaCl solutions of increasing concentration
export const AGCL_NACL = [0, 0.001, 0.01, 0.1].map((c) => ({ c, s: c === 0 ? sAB(KSP.AgCl) : KSP.AgCl / c }));
