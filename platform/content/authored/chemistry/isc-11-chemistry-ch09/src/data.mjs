// Shared computed data for ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding.
export const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- molecular orbital filling (qualitative, valence MOs)
// An orbital level: n (label), deg (1 for sigma, 2 for the degenerate pi pair), kind ('b' bonding, 'a' antibonding).
const L = (n, deg, kind) => ({ n, deg, kind });
export const ORD_1S = [L('σ1s', 1, 'b'), L('σ*1s', 1, 'a')];
/** Li2 to N2: s-p mixing places the pi pair below sigma 2pz. */
export const ORD_MIX = [L('σ2s', 1, 'b'), L('σ*2s', 1, 'a'), L('π2p', 2, 'b'), L('σ2pz', 1, 'b'), L('π*2p', 2, 'a'), L('σ*2pz', 1, 'a')];
/** O2, F2, Ne2: no s-p mixing; sigma 2pz lies below the pi pair. */
export const ORD_NOMIX = [L('σ2s', 1, 'b'), L('σ*2s', 1, 'a'), L('σ2pz', 1, 'b'), L('π2p', 2, 'b'), L('π*2p', 2, 'a'), L('σ*2pz', 1, 'a')];
export const ORDERS = { '1s': ORD_1S, mix: ORD_MIX, nomix: ORD_NOMIX };

/** Aufbau, Pauli and Hund: fills `e` electrons into the ordered levels. Returns the levels with occupancy and the totals. */
export function fillMO(order, e) {
  let left = e;
  const levels = order.map((lv) => {
    const cap = 2 * lv.deg;
    const k = Math.min(cap, left);
    left -= k;
    // Hund: one electron in each degenerate orbital before any pairing
    const occ = Array(lv.deg).fill(0);
    for (let i = 0; i < k; i++) occ[i % lv.deg] += 1;
    const unpaired = occ.filter((o) => o === 1).length;
    return { ...lv, e: k, occ, unpaired };
  });
  if (left !== 0) throw new Error(`fillMO: ${e} electrons do not fit`);
  const nb = levels.filter((l) => l.kind === 'b').reduce((s, l) => s + l.e, 0);
  const na = levels.filter((l) => l.kind === 'a').reduce((s, l) => s + l.e, 0);
  const unpaired = levels.reduce((s, l) => s + l.unpaired, 0);
  return { levels, nb, na, bo: (nb - na) / 2, unpaired, para: unpaired > 0 };
}
export const config = (m) => m.levels.filter((l) => l.e > 0).map((l) => `${l.n}${sup(l.e)}`).join(' ');
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸';
const sup = (n) => SUPS[n];

/** Species: ev = electrons in the valence MOs of the list (core sigma 1s and sigma* 1s pair cancel and are left out), ord = ordering. */
export const SP = {
  H2: { name: 'H₂', ev: 2, ord: '1s' },
  He2: { name: 'He₂', ev: 4, ord: '1s' },
  Li2: { name: 'Li₂', ev: 2, ord: 'mix' },
  Be2: { name: 'Be₂', ev: 4, ord: 'mix' },
  B2: { name: 'B₂', ev: 6, ord: 'mix' },
  C2: { name: 'C₂', ev: 8, ord: 'mix' },
  N2: { name: 'N₂', ev: 10, ord: 'mix' },
  O2: { name: 'O₂', ev: 12, ord: 'nomix' },
  F2: { name: 'F₂', ev: 14, ord: 'nomix' },
  Ne2: { name: 'Ne₂', ev: 16, ord: 'nomix' },
  'N2+': { name: 'N₂⁺', ev: 9, ord: 'mix' },
  'N2-': { name: 'N₂⁻', ev: 11, ord: 'mix' },
  'N2 2-': { name: 'N₂²⁻', ev: 12, ord: 'mix' },
  'O2+': { name: 'O₂⁺', ev: 11, ord: 'nomix' },
  'O2-': { name: 'O₂⁻', ev: 13, ord: 'nomix' },
  'O2 2-': { name: 'O₂²⁻', ev: 14, ord: 'nomix' },
};
export const MO = Object.fromEntries(Object.entries(SP).map(([k, s]) => [k, { ...s, ...fillMO(ORDERS[s.ord], s.ev) }]));
export const bo = (k) => MO[k].bo;
export const fmtBO = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(1));
export const magnet = (k) => (MO[k].para ? 'paramagnetic' : 'diamagnetic');

// ---- bond lengths (pm) and bond enthalpies (kJ/mol): standard textbook values (approximate)
export const LEN = { H2: 74, Li2: 267, B2: 159, C2: 124, N2: 110, O2: 121, F2: 142, 'O2+': 112, 'O2-': 128, 'O2 2-': 149, 'N2+': 112 };
export const ENTH = { H2: 436, Li2: 105, B2: 290, C2: 602, N2: 946, O2: 498, F2: 159 };

// ---------------------------------------------------------------- resonance: total bond order spread over n equivalent positions
/** Bond order of each equivalent bond in the hybrid = (bonds in one structure over the equivalent positions) / positions. */
export const hybridBO = (totalBondsInOneStructure, positions) => totalBondsInOneStructure / positions;
export const RES = {
  O3: { total: 3, pos: 2 }, // O=O-O: one double + one single over two O-O positions
  CO3: { total: 4, pos: 3 }, // C=O + 2 C-O over three
  NO3: { total: 4, pos: 3 }, // N=O + 2 N-O over three
  CO2: { total: 4, pos: 2 }, // two double bonds over two positions (main structure)
};
export const resBO = (k) => hybridBO(RES[k].total, RES[k].pos);
export const q23 = (charge, n) => charge / n; // charge on each equivalent terminal O

// ---------------------------------------------------------------- coordinate bonds
/** Dative bonds from chlorine in HClOn (n = 1..4): n - 1; lone pairs left on Cl: 3 - (n - 1). */
export const clDative = (n) => n - 1;
export const clLonePairs = (n) => 3 - clDative(n);
export const clOxState = (n) => 2 * n - 1; // +1, +3, +5, +7

// ---------------------------------------------------------------- boiling points (K): standard values
export const BP = {
  14: [['CH₄', 112], ['SiH₄', 161], ['GeH₄', 185], ['SnH₄', 221]],
  15: [['NH₃', 240], ['PH₃', 185], ['AsH₃', 211], ['SbH₃', 256]],
  16: [['H₂O', 373], ['H₂S', 213], ['H₂Se', 232], ['H₂Te', 271]],
  17: [['HF', 293], ['HCl', 188], ['HBr', 207], ['HI', 237]],
};
export const NA = 6.022e23;
