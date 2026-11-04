// Shared computed data for ch04 Chemical Bonding and Molecular Structure (decks, notes, questions and SVGs all use these).
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

/** Formal charge = valence electrons − non-bonding electrons − half the bonding electrons. */
export const fc = (V, L, B) => V - L - B / 2;

// ---- VSEPR: central atom with n monovalent ligands (single bonds) and an overall charge
export const SHAPE = {
  '2,0': ['linear', 'sp', '180°'],
  '3,0': ['trigonal planar', 'sp²', '120°'],
  '2,1': ['bent', 'sp²', 'less than 120°'],
  '4,0': ['tetrahedral', 'sp³', '109.5°'],
  '3,1': ['trigonal pyramidal', 'sp³', 'less than 109.5°'],
  '2,2': ['bent', 'sp³', 'less than 109.5°'],
  '5,0': ['trigonal bipyramidal', 'sp³d', '90° and 120°'],
  '4,1': ['see-saw', 'sp³d', 'about 90° and 120°'],
  '3,2': ['T-shaped', 'sp³d', 'about 90°'],
  '2,3': ['linear', 'sp³d', '180°'],
  '6,0': ['octahedral', 'sp³d²', '90°'],
  '5,1': ['square pyramidal', 'sp³d²', 'about 90°'],
  '4,2': ['square planar', 'sp³d²', '90°'],
};
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
  PCl5: vsepr('PCl₅', 5, 5),
  SF4: vsepr('SF₄', 6, 4),
  ClF3: vsepr('ClF₃', 7, 3),
  XeF2: vsepr('XeF₂', 8, 2),
  SF6: vsepr('SF₆', 6, 6),
  BrF5: vsepr('BrF₅', 7, 5),
  XeF4: vsepr('XeF₄', 8, 4),
  ICl2: vsepr('ICl₂⁻', 7, 2, -1),
  NH4: vsepr('NH₄⁺', 5, 4, 1),
  H3O: vsepr('H₃O⁺', 6, 3, 1),
  I3: vsepr('I₃⁻', 7, 2, -1),
  NH2: vsepr('NH₂⁻', 5, 2, -1),
};

// ---- molecular orbitals of homonuclear diatomics (valence electrons only for period 2)
export function mo(nElectrons, mixing) {
  const lv = mixing
    ? [['σ2s', 1, false], ['σ*2s', 1, true], ['π2p', 2, false], ['σ2p', 1, false], ['π*2p', 2, true], ['σ*2p', 1, true]]
    : [['σ2s', 1, false], ['σ*2s', 1, true], ['σ2p', 1, false], ['π2p', 2, false], ['π*2p', 2, true], ['σ*2p', 1, true]];
  return fillLevels(lv.map(([name, deg, anti]) => ({ name, deg, anti })), nElectrons);
}
export function mo1s(nElectrons) {
  return fillLevels([{ name: 'σ1s', deg: 1, anti: false }, { name: 'σ*1s', deg: 1, anti: true }], nElectrons);
}
function fillLevels(levels, n) {
  let left = n;
  let bonding = 0;
  let anti = 0;
  let unpaired = 0;
  const out = levels.map((l) => {
    const take = Math.min(left, 2 * l.deg);
    left -= take;
    const orbs = Array.from({ length: l.deg }, () => [0, 0]); // [up, down]
    for (let i = 0; i < take; i++) orbs[i % l.deg][Math.floor(i / l.deg)] = 1; // Hund: one in each orbital first
    unpaired += orbs.filter(([u, d]) => u + d === 1).length;
    if (l.anti) anti += take;
    else bonding += take;
    return { ...l, n: take, orbs };
  });
  if (left) throw new Error('too many electrons');
  return { levels: out, bonding, anti, bo: (bonding - anti) / 2, unpaired };
}
export const DIATOMICS = [
  ['H₂', mo1s(2)], ['He₂', mo1s(4)], ['Li₂', mo(2, true)], ['Be₂', mo(4, true)], ['B₂', mo(6, true)], ['C₂', mo(8, true)], ['N₂', mo(10, true)], ['O₂', mo(12, false)], ['F₂', mo(14, false)], ['Ne₂', mo(16, false)],
];
export const mag = (m) => (m.unpaired ? 'paramagnetic' : 'diamagnetic');

// ---- textbook bond data
export const BE = { 'H–H': 436, 'C–H': 414, 'N–H': 391, 'O–H': 463, 'H–Cl': 431, 'Cl–Cl': 242, 'C–C': 347, 'C=C': 611, 'C≡C': 837, 'N≡N': 946, 'O=O': 498, 'F–F': 159 };
export const BL = { 'H–H': 74, 'C–C': 154, 'C=C': 134, 'C≡C': 120, 'N≡N': 109, 'O=O': 121, 'H–F': 92, 'H–Cl': 127 };
export const DIPOLE = { HF: 1.78, HCl: 1.07, HBr: 0.79, HI: 0.38, H2O: 1.85, NH3: 1.47, NF3: 0.23, CHCl3: 1.04, CO2: 0, BF3: 0, CH4: 0, CCl4: 0 };
