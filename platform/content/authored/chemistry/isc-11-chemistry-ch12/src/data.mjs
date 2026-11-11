// Shared computed data for ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity (decks, notes, questions, SVGs).
// Standard textbook values at 298 K. Constants: R = 8.314 J K⁻¹ mol⁻¹; 2.303 R T used for ΔG° = −2.303 R T log K.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
export const r1 = (x) => Math.round(x * 10) / 10;
export const f0 = (x) => x.toFixed(0);
export const f1 = (x) => x.toFixed(1);
export const f2 = (x) => x.toFixed(2);
export const f3 = (x) => x.toFixed(3);
export const sg = (x, d = 1) => `${x < 0 ? '−' : x > 0 ? '+' : ''}${Math.abs(x).toFixed(d)}`;
export const tx = (x, d = 1) => `${x < 0 ? '-' : ''}${Math.abs(x).toFixed(d)}`;
export const R = 8.314;

// ---- transitions: ΔH (kJ mol⁻¹) at the transition temperature T (K)
export const TRANS = {
  iceFus: { name: 'ice (fusion)', H: 6.01, T: 273.15 },
  waterVap: { name: 'water (vaporisation)', H: 40.7, T: 373.15 },
  benzVap: { name: 'benzene (vaporisation)', H: 30.8, T: 353.2 },
  benzFus: { name: 'benzene (fusion)', H: 9.87, T: 278.7 },
  acetVap: { name: 'propanone (vaporisation)', H: 29.1, T: 329.4 },
  hgFus: { name: 'mercury (fusion)', H: 2.29, T: 234.3 },
};
/** ΔS = q_rev / T in J K⁻¹ mol⁻¹ from ΔH in kJ mol⁻¹. */
export const dsTrans = (k) => (TRANS[k].H * 1000) / TRANS[k].T;
export const dsIsoExp = (n, v1, v2) => n * R * Math.log(v2 / v1);

// ---- standard molar entropies S° (J K⁻¹ mol⁻¹) and enthalpies of formation (kJ mol⁻¹)
export const S0 = { H2: 130.7, N2: 191.6, O2: 205.1, NH3: 192.5, H2Ol: 69.9, H2Og: 188.8, NO: 210.8, NO2: 240.1, N2O4: 304.3, CO2: 213.8, MgO: 26.9, MgCO3: 65.7, C: 5.7, diamond: 2.4 };
export const HF = { NO: 90.3, NO2: 33.2, N2O4: 9.2, MgO: -601.6, MgCO3: -1095.8, CO2: -393.5, H2Ol: -285.8, NH3: -46.1, H2: 0, O2: 0, N2: 0 };
export const GF = { NO2: 51.3, N2O4: 97.9 }; // ΔfG° kJ mol⁻¹
export const sum = (tab, list) => list.reduce((s, [n, k]) => s + n * tab[k], 0);
export const dS = (react, prod) => sum(S0, prod) - sum(S0, react);
export const dH = (react, prod) => r1(sum(HF, prod) - sum(HF, react));
/** ΔG = ΔH − TΔS (kJ mol⁻¹) with ΔS in J K⁻¹ mol⁻¹. */
export const dG = (h, s, T = 298) => h - (T * s) / 1000;
/** Crossover temperature T = ΔH / ΔS in K. */
export const Tc = (h, s) => (h * 1000) / s;
export const RT2303 = (T = 298) => (2.303 * R * T) / 1000; // kJ mol⁻¹
export const logK = (g, T = 298) => -g / RT2303(T);

// ---- reactions used throughout
export const RX = {
  N2O4: (() => {
    const h = dH([[1, 'N2O4']], [[2, 'NO2']]);
    const s = dS([[1, 'N2O4']], [[2, 'NO2']]);
    return { h, s, Tc: Tc(h, s), g298: dG(h, s) };
  })(),
  MgCO3: (() => {
    const h = dH([[1, 'MgCO3']], [[1, 'MgO'], [1, 'CO2']]);
    const s = dS([[1, 'MgCO3']], [[1, 'MgO'], [1, 'CO2']]);
    return { h, s, Tc: Tc(h, s), g298: dG(h, s) };
  })(),
  NO: (() => {
    const h = dH([[2, 'NO'], [1, 'O2']], [[2, 'NO2']]);
    const s = dS([[2, 'NO'], [1, 'O2']], [[2, 'NO2']]);
    return { h, s, Tc: Tc(h, s), g298: dG(h, s) };
  })(),
  water: (() => {
    const h = dH([[2, 'H2'], [1, 'O2']], [[2, 'H2Ol']]);
    const s = dS([[2, 'H2'], [1, 'O2']], [[2, 'H2Ol']]);
    return { h, s, Tc: Tc(h, s), g298: dG(h, s) };
  })(),
  haber: (() => {
    const h = dH([[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
    const s = dS([[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
    return { h, s, Tc: Tc(h, s), g298: dG(h, s) };
  })(),
};
