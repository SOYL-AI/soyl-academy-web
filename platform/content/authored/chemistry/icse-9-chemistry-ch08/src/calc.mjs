// Computed values for ICSE 9 Chemistry ch08 Chemical Bonding.
// Electronic configurations (K 2, L 8, M 8, N 2), ions and electrons transferred, formulae of ionic compounds, shared pairs,
// lone pairs and valence-electron totals of covalent molecules, octet and duplet checks. Every count used in a stem, answer,
// table or slide is computed and asserted here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

export const SYM = { H: 1, He: 2, Li: 3, Be: 4, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20 };
export const NAME = { H: 'hydrogen', Li: 'lithium', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Na: 'sodium', Mg: 'magnesium', Al: 'aluminium', S: 'sulphur', Cl: 'chlorine', K: 'potassium', Ca: 'calcium' };
export function config(sym) {
  const shells = [];
  let left = SYM[sym];
  for (const max of [2, 8, 8, 2]) {
    if (left <= 0) break;
    const t = Math.min(max, left);
    shells.push(t);
    left -= t;
  }
  return shells;
}
export const cfg = (sym) => config(sym).join(', ');
export const outer = (sym) => config(sym).at(-1);
eq([cfg('Na'), cfg('Cl'), cfg('Mg'), cfg('Ca'), cfg('O'), cfg('H'), cfg('N'), cfg('C'), cfg('K'), cfg('F'), cfg('Li')], ['2, 8, 1', '2, 8, 7', '2, 8, 2', '2, 8, 8, 2', '2, 6', '1', '2, 5', '2, 4', '2, 8, 8, 1', '2, 7', '2, 1'], 'configurations');

// ---------------------------------------------------------------- electrovalent bonds
/** Ion formed from an atom of a metal (loses its outer electrons) or a non-metal (gains up to an octet). */
export function ion(sym, metal) {
  const o = outer(sym);
  if (metal) return { sym, charge: o, cfg: config(sym).slice(0, -1).join(', ') };
  return { sym, charge: -(8 - o), cfg: [...config(sym).slice(0, -1), 8].join(', ') };
}
/** Formula units: how many metal atoms and non-metal atoms give a neutral compound. */
export function compound(metal, nonmetal) {
  const m = ion(metal, true);
  const n = ion(nonmetal, false);
  const g = (a, b) => (b ? g(b, a % b) : a);
  const d = g(m.charge, -n.charge);
  const nm = -n.charge / d;
  const nn = m.charge / d;
  return { metal: m, nonmetal: n, nMetal: nm, nNon: nn, electrons: nm * m.charge };
}
export const NACL = compound('Na', 'Cl');
export const MGCL2 = compound('Mg', 'Cl');
export const CAO = compound('Ca', 'O');
export const NA2O = compound('Na', 'O');
export const KCL = compound('K', 'Cl');
export const MGO = compound('Mg', 'O');
export const LIF = compound('Li', 'F');
export const CACL2 = compound('Ca', 'Cl');
eq([NACL.nMetal, NACL.nNon, NACL.electrons], [1, 1, 1], 'NaCl');
eq([MGCL2.nMetal, MGCL2.nNon, MGCL2.electrons], [1, 2, 2], 'MgCl2');
eq([CAO.nMetal, CAO.nNon, CAO.electrons], [1, 1, 2], 'CaO');
eq([NA2O.nMetal, NA2O.nNon, NA2O.electrons], [2, 1, 2], 'Na2O');
eq([KCL.nMetal, KCL.nNon], [1, 1], 'KCl');
eq([MGO.nMetal, MGO.nNon, MGO.electrons], [1, 1, 2], 'MgO');
eq([LIF.nMetal, LIF.nNon], [1, 1], 'LiF');
eq([CACL2.nMetal, CACL2.nNon, CACL2.electrons], [1, 2, 2], 'CaCl2');
eq([ion('Na', true).cfg, ion('Cl', false).cfg, ion('Mg', true).cfg, ion('Ca', true).cfg, ion('O', false).cfg, ion('K', true).cfg, ion('F', false).cfg, ion('Li', true).cfg], ['2, 8', '2, 8, 8', '2, 8', '2, 8, 8', '2, 8', '2, 8, 8', '2, 8', '2'], 'ion configurations');
eq([ion('Na', true).charge, ion('Mg', true).charge, ion('Ca', true).charge, ion('Cl', false).charge, ion('O', false).charge, ion('F', false).charge, ion('K', true).charge], [1, 2, 2, -1, -2, -1, 1], 'ion charges');
// ions of the same configuration as argon: K+, Ca2+, Cl-, and S2- (atomic number 16 gains 2); neon: Na+, Mg2+, O2-, F-
eq(config('Cl').reduce((a, b) => a + b, 0) + 1, 18, 'electrons in Cl-');
eq(config('K').reduce((a, b) => a + b, 0) - 1, 18, 'electrons in K+');
eq(config('Ca').reduce((a, b) => a + b, 0) - 2, 18, 'electrons in Ca2+');
eq(config('O').reduce((a, b) => a + b, 0) + 2, 10, 'electrons in O2-');
eq(config('Mg').reduce((a, b) => a + b, 0) - 2, 10, 'electrons in Mg2+');
// charge neutrality of each compound
for (const c of [NACL, MGCL2, CAO, NA2O, KCL, MGO, LIF, CACL2]) eq(c.nMetal * c.metal.charge + c.nNon * c.nonmetal.charge, 0, `neutral ${c.metal.sym}${c.nonmetal.sym}`);

// ---------------------------------------------------------------- covalent molecules
// atoms: element counts; bonds: [atom index, atom index, order]; the checks recompute the shared pairs and lone pairs.
export const MOL = {
  H2: { atoms: ['H', 'H'], bonds: [[0, 1, 1]] },
  Cl2: { atoms: ['Cl', 'Cl'], bonds: [[0, 1, 1]] },
  O2: { atoms: ['O', 'O'], bonds: [[0, 1, 2]] },
  N2: { atoms: ['N', 'N'], bonds: [[0, 1, 3]] },
  HCl: { atoms: ['H', 'Cl'], bonds: [[0, 1, 1]] },
  H2O: { atoms: ['O', 'H', 'H'], bonds: [[0, 1, 1], [0, 2, 1]] },
  NH3: { atoms: ['N', 'H', 'H', 'H'], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] },
  CCl4: { atoms: ['C', 'Cl', 'Cl', 'Cl', 'Cl'], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
  CH4: { atoms: ['C', 'H', 'H', 'H', 'H'], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
  F2: { atoms: ['F', 'F'], bonds: [[0, 1, 1]] },
  H2S: { atoms: ['S', 'H', 'H'], bonds: [[0, 1, 1], [0, 2, 1]] },
  PH3: { atoms: ['P', 'H', 'H', 'H'], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] },
  HF: { atoms: ['F', 'H'], bonds: [[0, 1, 1]] },
};
export function analyse(m) {
  const valence = m.atoms.reduce((s, a) => s + outer(a), 0);
  const pairs = m.bonds.reduce((s, b) => s + b[2], 0);
  const lone = (valence - 2 * pairs) / 2;
  // each atom: its outer electrons plus the electrons it shares must reach a duplet (H) or an octet
  const share = m.atoms.map(() => 0);
  for (const [i, j, o] of m.bonds) {
    share[i] += o;
    share[j] += o;
  }
  const complete = m.atoms.every((a, i) => outer(a) + share[i] === (a === 'H' ? 2 : 8));
  const lonePerAtom = m.atoms.map((a, i) => (outer(a) - share[i]) / 2);
  return { valence, pairs, lone, complete, lonePerAtom, share };
}
const A = Object.fromEntries(Object.entries(MOL).map(([k, v]) => [k, analyse(v)]));
export const MA = A;
for (const [k, a] of Object.entries(A)) eq(a.complete, true, `duplet or octet in ${k}`);
eq(Object.fromEntries(Object.entries(A).map(([k, a]) => [k, [a.valence, a.pairs, a.lone]])), {
  H2: [2, 1, 0], Cl2: [14, 1, 6], O2: [12, 2, 4], N2: [10, 3, 2], HCl: [8, 1, 3], H2O: [8, 2, 2], NH3: [8, 3, 1], CCl4: [32, 4, 12], CH4: [8, 4, 0],
  F2: [14, 1, 6], H2S: [8, 2, 2], PH3: [8, 3, 1], HF: [8, 1, 3],
}, 'valence electrons, shared pairs and lone pairs');
eq([A.H2O.lonePerAtom[0], A.NH3.lonePerAtom[0], A.CH4.lonePerAtom[0], A.CCl4.lonePerAtom[1], A.HCl.lonePerAtom[1], A.O2.lonePerAtom[0], A.N2.lonePerAtom[0]], [2, 1, 0, 3, 3, 2, 1], 'lone pairs on selected atoms');
// shared electrons (two per pair)
eq([2 * A.N2.pairs, 2 * A.O2.pairs, 2 * A.H2.pairs, 2 * A.CCl4.pairs], [6, 4, 2, 8], 'shared electrons');
// bonds in a molecule of each (number of covalent bonds counted as shared pairs)
eq([A.CH4.pairs, A.NH3.pairs, A.H2O.pairs, A.CCl4.pairs], [4, 3, 2, 4], 'covalent bonds in the molecules');
// an atom of each element needs this many electrons to complete its outer shell (duplet for H)
eq(['H', 'Cl', 'O', 'N', 'C', 'F'].map((s) => (s === 'H' ? 2 : 8) - outer(s)), [1, 1, 2, 3, 4, 1], 'electrons needed');

// ---------------------------------------------------------------- radicals
// A bond is broken so that each atom keeps one of the two shared electrons: both products have an unpaired electron.
export const RAD = {
  Cl2: { from: 'Cl2', to: [['Cl', 7]], eqn: [[1, { Cl: 2 }], [2, { Cl: 1 }]] },
  H2: { from: 'H2', to: [['H', 1]], eqn: [[1, { H: 2 }], [2, { H: 1 }]] },
};
const tot = (side) => side.reduce((acc, [n, a]) => { for (const [k, v] of Object.entries(a)) acc[k] = (acc[k] ?? 0) + n * v; return acc; }, {});
eq(tot(RAD.Cl2.eqn.slice(0, 1)), { Cl: 2 }, 'Cl2');
eq(tot(RAD.Cl2.eqn.slice(1)), { Cl: 2 }, '2Cl radicals');
eq(tot(RAD.H2.eqn.slice(1)), { H: 2 }, '2H radicals');
// CH4 -> CH3 radical + H radical: one carbon and four hydrogens on each side
eq({ C: 1, H: 3 }.H + 1, 4, 'hydrogen atoms in CH3 and H radicals');
// outer electrons in a chlorine radical: seven, one of them unpaired (3 pairs + 1)
eq([outer('Cl'), (outer('Cl') - 1) / 2], [7, 3], 'chlorine radical: seven outer electrons, three pairs and one unpaired');
// electrons in a bond broken this way: 2, one to each atom
eq(2 / 2, 1, 'each atom takes one electron');
