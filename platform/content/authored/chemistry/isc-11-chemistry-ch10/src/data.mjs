// Shared computed data for ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law (decks, notes, questions, SVGs).
// Sign convention (stated once, used everywhere): delta U = q + w; q > 0 when heat flows INTO the system, w > 0 when work is done ON the system.
// Constants: R = 8.314 J K^-1 mol^-1 = 0.0821 L atm K^-1 mol^-1; 1 L atm = 101.3 J; 2.303 = ln 10.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

export const R = 8.314; // J K-1 mol-1
export const RL = 0.0821; // L atm K-1 mol-1
export const LATM = 101.3; // J per L atm
export const LN10 = 2.303;

// ---- work of expansion (work done ON the system is positive; an expanding gas has w < 0)
/** Irreversible expansion against a constant external pressure pext (atm) from V1 to V2 (L): w in joules. */
export const wIrrev = (pext, V1, V2) => -pext * (V2 - V1) * LATM;
/** Same, left in L atm. */
export const wIrrevLatm = (pext, V1, V2) => -pext * (V2 - V1);
/** Reversible isothermal expansion of n mol of ideal gas at T (K) from V1 to V2: w = -2.303 n R T log10(V2/V1), in joules. */
export const wRev = (n, T, V1, V2) => -LN10 * n * R * T * Math.log10(V2 / V1);
/** Constant-pressure heating of n mol of ideal gas by dT: w = -p dV = -n R dT, in joules. */
export const wIsobaric = (n, dT) => -n * R * dT;

// ---- first law
export const dU = (q, w) => q + w;

// ---- enthalpy: delta H = delta U + delta n_g R T (kJ in, kJ out)
export const dHfromU = (dUkJ, dn, T) => dUkJ + (dn * R * T) / 1000;
export const dUfromH = (dHkJ, dn, T) => dHkJ - (dn * R * T) / 1000;
/** delta n_g from the gaseous stoichiometric coefficients: products minus reactants. */
export const dng = (prod, react) => prod - react;

// ---- heat capacity
export const qHeat = (m, c, dT) => m * c * dT; // J, with c in J g-1 K-1
export const CpFromCv = (Cv) => Cv + R;
export const CvFromCp = (Cp) => Cp - R;

// ---- the standard p-V comparison used in the SVG, worked examples and the long question:
// 1.00 mol of ideal gas at 300 K, expanding isothermally from 8.0 atm to 2.0 atm (all work in J)
export const CMP = (() => {
  const n = 1.0;
  const T = 300;
  const p1 = 8.0;
  const p2 = 2.0;
  const pm = 4.0; // intermediate pressure for the two-step expansion
  const nRT = n * RL * T; // L atm
  const V1 = nRT / p1;
  const Vm = nRT / pm;
  const V2 = nRT / p2;
  const w1 = wIrrev(p2, V1, V2); // one step against 2.0 atm
  const wa = wIrrev(pm, V1, Vm);
  const wb = wIrrev(p2, Vm, V2);
  const w2 = wa + wb; // two steps
  const wr = wRev(n, T, V1, V2); // reversible
  return { n, T, p1, p2, pm, nRT, V1, Vm, V2, w1, wa, wb, w2, wr };
})();

// ---- path against state function: A (4.0 atm, 2.0 L) to B (1.0 atm, 6.0 L)
export const PATHS = (() => {
  const A = { p: 4.0, V: 2.0 };
  const B = { p: 1.0, V: 6.0 };
  // path I: isochoric cooling at 2.0 L from 4.0 to 1.0 atm, then isobaric expansion at 1.0 atm from 2.0 to 6.0 L
  const wI = wIrrevLatm(B.p, A.V, B.V);
  // path II: isobaric expansion at 4.0 atm from 2.0 to 6.0 L, then isochoric cooling at 6.0 L from 4.0 to 1.0 atm
  const wII = wIrrevLatm(A.p, A.V, B.V);
  return { A, B, wI, wII, wIJ: wI * LATM, wIIJ: wII * LATM };
})();

// ---- the rectangular cycle: A (4.0 atm, 2.0 L) -> B (4.0, 5.0) -> C (2.0, 5.0) -> D (2.0, 2.0) -> A
export const CYC = (() => {
  const pts = { A: { p: 4.0, V: 2.0 }, B: { p: 4.0, V: 5.0 }, C: { p: 2.0, V: 5.0 }, D: { p: 2.0, V: 2.0 } };
  const wAB = wIrrevLatm(4.0, 2.0, 5.0); // expansion at 4.0 atm
  const wCD = wIrrevLatm(2.0, 5.0, 2.0); // compression at 2.0 atm
  const net = wAB + wCD; // L atm; negative = net work done by the gas
  return { pts, wAB, wCD, net, netJ: net * LATM };
})();

// ---- Cp and Cv of one mole of a monatomic ideal gas (Cv = 3R/2, Cp = 5R/2)
export const MONO = { Cv: 1.5 * R, Cp: 2.5 * R };

// ---- PCl5(g) -> PCl3(g) + Cl2(g) at 500 K (delta n_g = +1); delta U given
export const PCL = { dUkJ: 80.0, dn: 1, T: 500 };
