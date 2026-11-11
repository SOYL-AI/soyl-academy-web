// Shared computed data for ISC 11 Chemistry ch11 Thermochemistry (decks, notes, questions, SVGs).
// Standard textbook values at 298 K, kJ mol⁻¹ unless stated. Every derived number is computed here.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
export const r1 = (x) => Math.round(x * 10) / 10;
export const r2 = (x) => Math.round(x * 100) / 100;
export const f0 = (x) => x.toFixed(0);
export const f1 = (x) => x.toFixed(1);
export const f2 = (x) => x.toFixed(2);
export const f3 = (x) => x.toFixed(3);
/** Signed text with a true minus sign for prose. */
export const sg = (x, d = 1) => `${x < 0 ? '−' : x > 0 ? '+' : ''}${Math.abs(x).toFixed(d)}`;
/** Signed text with a hyphen for LaTeX. */
export const tx = (x, d = 1) => `${x < 0 ? '-' : ''}${Math.abs(x).toFixed(d)}`;

// ---- standard enthalpies of formation (kJ mol⁻¹)
export const DF = {
  CO2: -393.5, H2Ol: -285.8, H2Og: -241.8, CH4: -74.8, C2H6: -84.7, C2H4: 52.3, C2H2: 226.7, CO: -110.5, NH3: -46.1,
  NO: 90.3, NO2: 33.2, C3H8: -103.8, C2H5OHl: -277.7, SO2: -296.8, HCl: -92.3, H2: 0, O2: 0, N2: 0, C: 0,
};
/** Sum of n × ΔfH over [[n, species], …]. */
export const sumF = (list) => r1(list.reduce((s, [n, k]) => s + n * DF[k], 0));
export const dHrxn = (react, prod) => r1(sumF(prod) - sumF(react));

// ---- combustion enthalpies derived from formation data (kJ mol⁻¹)
export const DC = {
  CH4: dHrxn([[1, 'CH4']], [[1, 'CO2'], [2, 'H2Ol']]), // −890.3
  C3H8: dHrxn([[1, 'C3H8']], [[3, 'CO2'], [4, 'H2Ol']]), // −2219.9
  C2H2: dHrxn([[1, 'C2H2']], [[2, 'CO2'], [1, 'H2Ol']]), // −1299.5
  C2H5OH: dHrxn([[1, 'C2H5OHl']], [[2, 'CO2'], [3, 'H2Ol']]), // −1366.7
  H2: DF.H2Ol, // −285.8
  C: DF.CO2, // −393.5
  glucose: -2803, // given
};
/** Fuels for calorific value: name, formula, molar mass (g mol⁻¹), ΔcH. */
export const FUELS = [
  { id: 'H2', name: 'hydrogen', f: 'H₂', M: 2, dc: DC.H2 },
  { id: 'CH4', name: 'methane', f: 'CH₄', M: 16, dc: DC.CH4 },
  { id: 'C2H2', name: 'ethyne', f: 'C₂H₂', M: 26, dc: DC.C2H2 },
  { id: 'C3H8', name: 'propane', f: 'C₃H₈', M: 44, dc: DC.C3H8 },
  { id: 'C', name: 'graphite', f: 'C', M: 12, dc: DC.C },
  { id: 'C2H5OH', name: 'ethanol', f: 'C₂H₅OH', M: 46, dc: DC.C2H5OH },
  { id: 'glucose', name: 'glucose', f: 'C₆H₁₂O₆', M: 180, dc: DC.glucose },
].map((x) => ({ ...x, cv: r1(-x.dc / x.M) }));
export const FUEL = Object.fromEntries(FUELS.map((x) => [x.id, x]));
/** Calorific value in kJ g⁻¹ (unrounded) = −ΔcH / M. */
export const calVal = (dc, M) => -dc / M;

// ---- neutralisation (kJ mol⁻¹ of water formed)
export const NEUT = { strong: -57.1, ethanoic: -55.2, hcn: -12.1 };
export const C_WATER = 4.18; // J g⁻¹ K⁻¹ (specific heat of the solution, density 1 g cm⁻³)

// ---- bond enthalpies (mean, kJ mol⁻¹)
export const BE = { 'H–H': 436, 'O=O': 498, 'Cl–Cl': 242, 'C–H': 414, 'C–C': 347, 'C=C': 611, 'C≡C': 837, 'C–Cl': 326, 'O–H': 463, 'C=O': 799, 'N–H': 391, 'N≡N': 946, 'H–Cl': 431 };
export const sumB = (list) => list.reduce((s, [n, k]) => s + n * BE[k], 0);
/** ΔH = Σ bonds broken − Σ bonds formed. */
export const dHbond = (broken, formed) => sumB(broken) - sumB(formed);

// ---- atomisation, sublimation, ionisation (kJ mol⁻¹)
export const SUB = { C: 716.7, Na: 107.3, Mg: 147.7, K: 89.0 };
export const IE = { Na: 496, K: 419, Mg1: 738, Mg2: 1451 };

// ---- phase transitions of water
export const WATER = { fus: 6.01, vap: 40.7, cpIce: 37.7, cpWater: 75.3, cpSteam: 33.6 }; // kJ mol⁻¹ and J K⁻¹ mol⁻¹

// ---- hydration of anhydrous copper(II) sulfate (solution enthalpies, kJ mol⁻¹)
export const CUSO4 = { solAnhyd: -66.5, solHydrate: 11.7 };
CUSO4.hyd = r1(CUSO4.solAnhyd - CUSO4.solHydrate); // −78.2

// ---- Hess cycle with nitrogen oxides
export const NOX = { step1: 180.6, step2: -114.2 };
NOX.total = r1(NOX.step1 + NOX.step2); // +66.4 for N2 + 2O2 -> 2NO2
NOX.fNO2 = r1(NOX.total / 2); // +33.2

// ---- ethyne from combustion data
export const ETHYNE = { dcC2H2: -1299.5, dcC: -393.5, dcH2: -285.8 };
ETHYNE.f = r1(2 * ETHYNE.dcC + ETHYNE.dcH2 - ETHYNE.dcC2H2); // +226.7
// ---- graphite to diamond
export const DIAMOND = { dcGraphite: -393.5, dcDiamond: -395.4 };
DIAMOND.dH = r1(DIAMOND.dcGraphite - DIAMOND.dcDiamond); // +1.9
// ---- atomisation of ethene by a Hess cycle
export const ETHENE = { atomisation: r1(2 * SUB.C + 2 * BE['H–H'] - DF.C2H4), fromBonds: 4 * BE['C–H'] + BE['C=C'] };
