// Shared computed data for ISC 11 Chemistry ch07 Ionic Bonding (decks, notes, questions and SVGs all use these).
// Enthalpies in kJ per mole. Standard textbook Born-Haber data (tables differ by a few kJ between sources).
export const ELEM = {
  Li: { Z: 3, v: 1 }, Na: { Z: 11, v: 1 }, K: { Z: 19, v: 1 },
  Mg: { Z: 12, v: 2 }, Ca: { Z: 20, v: 2 }, Al: { Z: 13, v: 3 },
  N: { Z: 7, v: 5 }, O: { Z: 8, v: 6 }, F: { Z: 9, v: 7 }, S: { Z: 16, v: 6 }, Cl: { Z: 17, v: 7 }, Br: { Z: 35, v: 7 },
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const SUB = { 1: '', 2: '₂', 3: '₃', 4: '₄' };
/** Ionic compound of metal `m` (loses all its valence electrons) and non-metal `x` (completes its octet). */
export function ionic(m, x) {
  const qc = ELEM[m].v;
  const qa = 8 - ELEM[x].v;
  const g = gcd(qc, qa);
  const nc = qa / g;
  const na = qc / g;
  return { m, x, qc, qa, nc, na, formula: `${m}${SUB[nc]}${x}${SUB[na]}`, lost: nc * qc, gained: na * qa };
}
export const COMPOUNDS = [ionic('Na', 'Cl'), ionic('Li', 'O'), ionic('Mg', 'O'), ionic('Ca', 'O'), ionic('Mg', 'F'), ionic('Na', 'S')];

// ---- Born-Haber data (kJ/mol): sublimation of the metal, bond dissociation enthalpy of the halogen (per mole of X2),
// ionisation enthalpies, electron gain enthalpy of X (first), lattice enthalpy, enthalpy of formation of the solid
export const BH = {
  NaCl: { name: 'sodium chloride', sub: 108, bde: 242, nX: 1, ie: [496], ege: -349, lattice: -788, hf: -412 },
  KCl: { name: 'potassium chloride', sub: 89, bde: 242, nX: 1, ie: [419], ege: -349, lattice: -717, hf: -437 },
  NaBr: { name: 'sodium bromide', sub: 108, bde: 224, nX: 1, ie: [496], ege: -325, lattice: -752, hf: -361 },
  NaF: { name: 'sodium fluoride', sub: 108, bde: 158, nX: 1, ie: [496], ege: -328, lattice: -923, hf: -568 },
  MgCl2: { name: 'magnesium chloride', sub: 148, bde: 242, nX: 2, ie: [738, 1451], ege: -349, lattice: null, hf: -641 },
};
/** Sum of all steps except the lattice enthalpy (the "atomisation and ionisation" part of the cycle). */
export function bhSteps(d) {
  return { sub: d.sub, diss: (d.bde * d.nX) / 2, ie: d.ie.reduce((s, x) => s + x, 0), ege: d.ege * d.nX };
}
export function bhSum(d) {
  const s = bhSteps(d);
  return s.sub + s.diss + s.ie + s.ege;
}
/** Lattice enthalpy from the enthalpy of formation: U = dHf - (sub + dissociation + IE + EGE). */
export const bhLattice = (d) => d.hf - bhSum(d);
/** Enthalpy of formation from the lattice enthalpy. */
export const bhHf = (d, U) => bhSum(d) + U;

// ---- lattice enthalpies of selected solids (kJ/mol, formation of the solid from gaseous ions) and ionic radii (pm)
export const LATT = { LiF: -1037, NaF: -923, NaCl: -788, KCl: -717, NaBr: -752, NaI: -700, MgO: -3791, CaO: -3401, MgCl2: -2526 };
export const RAD = { 'Li+': 76, 'Na+': 102, 'K+': 138, 'Mg2+': 72, 'Ca2+': 100, 'F-': 133, 'Cl-': 181, 'Br-': 196, 'I-': 220, 'O2-': 140 };
// Pauling electronegativities
export const EN = { Li: 1.0, Na: 0.9, K: 0.8, Mg: 1.2, Ca: 1.0, Al: 1.5, C: 2.5, S: 2.5, N: 3.0, Cl: 3.0, O: 3.5, F: 4.0, H: 2.1, Br: 2.8 };
