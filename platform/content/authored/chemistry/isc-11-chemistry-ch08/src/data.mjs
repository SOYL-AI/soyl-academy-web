// Shared computed data for ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation (decks, notes, questions, SVGs).
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---- constants
export const E_CHARGE = 1.602e-19; // C
export const DEBYE = 3.336e-30; // C m per debye

// ---- bond data: length (pm) and bond enthalpy (kJ/mol)
export const BOND = {
  'H–H': { len: 74, enth: 436, order: 1 },
  'O=O': { len: 121, enth: 498, order: 2 },
  'N≡N': { len: 109, enth: 946, order: 3 },
  'C–C': { len: 154, enth: 347, order: 1 },
  'C=C': { len: 134, enth: 611, order: 2 },
  'C≡C': { len: 120, enth: 837, order: 3 },
  'C–H': { len: 109, enth: 414, order: 1 },
};

// ---- hydrogen halides: dipole moment (D) and bond length (pm)
export const HX = {
  HF: { mu: 1.91, d: 91.7 },
  HCl: { mu: 1.03, d: 127.4 },
  HBr: { mu: 0.79, d: 141.4 },
  HI: { mu: 0.38, d: 160.9 },
};
/** Dipole moment (D) of a pure ionic H+ X- pair at bond length d (pm): mu = e x d. */
export const muIonic = (d) => (E_CHARGE * d * 1e-12) / DEBYE;
export const pctIonic = (mu, d) => (mu / muIonic(d)) * 100;
/** Resultant of two equal bond moments m (D) at bond angle theta (degrees): 2 m cos(theta/2). */
export const resultant = (m, theta) => 2 * m * Math.cos(((theta / 2) * Math.PI) / 180);

// ---- formal charge = valence electrons - non-bonding electrons - half of the bonding electrons
export const fc = (V, L, B) => V - L - B / 2;

// ---- electronegativities (Pauling)
export const EN = { H: 2.1, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Cl: 3.0, Br: 2.8, S: 2.5, B: 2.0, Be: 1.5 };

// ---- ionic radii (pm) for Fajan's rules
export const RAD = { 'Li+': 76, 'Na+': 102, 'K+': 138, 'Mg2+': 72, 'Al3+': 53.5, 'Cl-': 181, 'F-': 133, 'I-': 220 };
export const ionicPotential = (z, r) => z / r; // pm^-1

// ---- bond counting: bonds [[i, j, order]]
export const countSigmaPi = (bonds) => ({ sigma: bonds.length, pi: bonds.reduce((s, b) => s + (b[2] - 1), 0) });
// acrylonitrile CH2=CH-C#N: atoms 0 C1, 1 C2, 2 C3, 3 N, 4 H, 5 H, 6 H
export const ACRYLO = [[0, 1, 2], [1, 2, 1], [2, 3, 3], [0, 4, 1], [0, 5, 1], [1, 6, 1]];
// propene CH3-CH=CH2: atoms 0 C1(H3), 1 C2, 2 C3(H2)
export const PROPENE = [[0, 1, 1], [1, 2, 2], ...[0, 0, 0].map((_, k) => [0, 3 + k, 1]), [1, 6, 1], [2, 7, 1], [2, 8, 1]];
// but-1-yne CH3-CH2-C#CH
export const BUTYNE = [[0, 1, 1], [1, 2, 1], [2, 3, 3], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1], [3, 9, 1]];

// ---- VSEPR: central atom with n monovalent-type ligands (bond pairs, single bonds) and an overall charge
export const SHAPE = {
  '2,0': ['linear', 'sp', '180°'],
  '3,0': ['trigonal planar', 'sp²', '120°'],
  '2,1': ['bent (V-shaped)', 'sp²', 'about 119°'],
  '4,0': ['tetrahedral', 'sp³', '109.5°'],
  '3,1': ['trigonal pyramidal', 'sp³', 'about 107°'],
  '2,2': ['bent (V-shaped)', 'sp³', 'about 104.5°'],
  '5,0': ['trigonal bipyramidal', 'sp³d', '90° and 120°'],
  '4,1': ['see-saw', 'sp³d', 'about 102° and 173°'],
  '3,2': ['T-shaped', 'sp³d', 'about 87.5°'],
  '2,3': ['linear', 'sp³d', '180°'],
  '6,0': ['octahedral', 'sp³d²', '90°'],
  '5,1': ['square pyramidal', 'sp³d²', 'about 90°'],
  '4,2': ['square planar', 'sp³d²', '90°'],
};
/** Vc = valence electrons of the central atom plus one for each bonded monovalent atom, minus the charge; n = bond pairs. */
export function vsepr(name, Vc, n, charge = 0) {
  const lp2 = Vc - n - charge;
  if (lp2 < 0 || lp2 % 2) throw new Error(`vsepr ${name}`);
  const lp = lp2 / 2;
  const [shape, hyb, angle] = SHAPE[`${n},${lp}`];
  return { name, bp: n, lp, sn: n + lp, shape, hyb, angle };
}
export const SPECIES = {
  BeCl2: vsepr('BeCl₂', 2, 2),
  BF3: vsepr('BF₃', 3, 3),
  CH4: vsepr('CH₄', 4, 4),
  NH3: vsepr('NH₃', 5, 3),
  H2O: vsepr('H₂O', 6, 2),
  SO2: vsepr('SO₂', 6, 2), // electron domains about S: 2 bond domains + 1 lone pair (double bonds count as one domain); handled below
  PCl5: vsepr('PCl₅', 5, 5),
  SF4: vsepr('SF₄', 6, 4),
  ClF3: vsepr('ClF₃', 7, 3),
  XeF2: vsepr('XeF₂', 8, 2),
  SF6: vsepr('SF₆', 6, 6),
  BrF5: vsepr('BrF₅', 7, 5),
  XeF4: vsepr('XeF₄', 8, 4),
};
// SO2 has two double bonds to O: sulfur contributes 6 electrons, each O is bonded by a double bond (counts as one domain);
// the lone pairs on S are (6 - 4)/2 = 1: override the single-bond formula above.
SPECIES.SO2 = { name: 'SO₂', bp: 2, lp: 1, sn: 3, shape: 'bent (V-shaped)', hyb: 'sp²', angle: 'about 119°' };
