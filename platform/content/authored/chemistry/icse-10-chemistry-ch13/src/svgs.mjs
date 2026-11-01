// Hand-drawn structural-formula schematics for ICSE 10 Chemistry ch13 (allow-listed elements, palette colours only).
// Atoms are text labels; bonds are lines trimmed to the label box; double and triple bonds are parallel lines.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = (x, y, s, o) => S.text(x, y, s, { size: 10, c: 'var(--diagram-muted)', ...o });

/** Molecule: atoms [[x, y, label, colour?]…] (label '' = bare vertex), bonds [[i, j, order]…], offset (ox, oy). */
export function mol(ox, oy, atoms, bonds, { size = 13 } = {}) {
  const hw = (t) => (t ? Math.max(5, t.length * size * 0.32) : 0);
  const hh = size * 0.5;
  const out = [];
  for (const [i, j, ord = 1] of bonds) {
    const [x1, y1, l1] = atoms[i];
    const [x2, y2, l2] = atoms[j];
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    const cut = (t) => (t ? Math.min(hw(t) / Math.max(Math.abs(ux), 1e-6), hh / Math.max(Math.abs(uy), 1e-6)) + 3 : 0);
    const c1 = cut(l1);
    const c2 = cut(l2);
    const ax = ox + x1 + ux * c1;
    const ay = oy + y1 + uy * c1;
    const bx = ox + x2 - ux * c2;
    const by = oy + y2 - uy * c2;
    const offs = ord === 1 ? [0] : ord === 2 ? [-2.2, 2.2] : [-3.6, 0, 3.6];
    for (const o of offs) out.push(S.line(ax - uy * o, ay + ux * o, bx - uy * o, by + ux * o, { w: 1.3 }));
  }
  for (const [x, y, t, c] of atoms) if (t) out.push(S.text(ox + x, oy + y + size * 0.36, t, { a: 'middle', size, c, w: t === 'C' ? 'bold' : undefined }));
  return out.join('');
}

/**
 * Displayed formula of an open chain: cs = [{ u, d, b, l, r }…] — u/d: label above/below the carbon ('H' default,
 * null for none, or [label, order]); b: bond order to the next carbon; l on the first / r on the last carbon: end label.
 */
export function chain(ox, oy, cs, { dx = 40, dy = 30, size = 13 } = {}) {
  const atoms = [];
  const bonds = [];
  const sub = (v, x, y, ci) => {
    if (v === null) return;
    const [t, o] = Array.isArray(v) ? v : [v ?? 'H', 1];
    atoms.push([x, y, t]);
    bonds.push([ci, atoms.length - 1, o]);
  };
  cs.forEach((_, i) => atoms.push([i * dx, 0, 'C']));
  cs.forEach((c, i) => {
    sub(c.u, i * dx, -dy, i);
    sub(c.d, i * dx, dy, i);
    if (i < cs.length - 1) bonds.push([i, i + 1, c.b ?? 1]);
  });
  const first = cs[0];
  const last = cs[cs.length - 1];
  if (first.l !== null) {
    const t = first.l ?? 'H';
    atoms.push([-dx * 0.8 - (t.length - 1) * 4, 0, t]);
    bonds.push([0, atoms.length - 1, 1]);
  }
  if (last.r !== null) {
    const t = Array.isArray(last.r) ? last.r[0] : last.r ?? 'H';
    atoms.push([(cs.length - 1) * dx + dx * 0.8 + (t.length - 1) * 4, 0, t]);
    bonds.push([cs.length - 1, atoms.length - 1, Array.isArray(last.r) ? last.r[1] : 1]);
  }
  return mol(ox, oy, atoms, bonds, { size });
}

/** Kekulé benzene with hydrogens (h) or a bare ring of C labels. */
function benzene(cx, cy, R, { h = true, size = 13 } = {}) {
  const atoms = [];
  const bonds = [];
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 3) * k - Math.PI / 2;
    atoms.push([R * Math.cos(a), R * Math.sin(a), 'C']);
  }
  for (let k = 0; k < 6; k++) bonds.push([k, (k + 1) % 6, k % 2 === 0 ? 2 : 1]);
  if (h)
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k - Math.PI / 2;
      atoms.push([(R + 26) * Math.cos(a), (R + 26) * Math.sin(a), 'H']);
      bonds.push([k, atoms.length - 1, 1]);
    }
  return mol(cx, cy, atoms, bonds, { size });
}

// 1. Tetravalency (methane) and catenation (a five-carbon chain with a branch).
export const CARBON = svgDoc(
  440,
  170,
  'Left: the displayed formula of methane, a carbon atom in the centre joined by four single bonds to four hydrogen atoms, showing that carbon, with electronic configuration two, four, forms four covalent bonds. Right: a chain of five carbon atoms joined to one another, with a sixth carbon atom joined as a branch, showing catenation, the linking of carbon atoms to one another.',
  [
    mol(80, 75, [[0, 0, 'C'], [0, -36, 'H'], [0, 36, 'H'], [-40, 0, 'H'], [40, 0, 'H']], [[0, 1], [0, 2], [0, 3], [0, 4]]),
    lab(80, 140, 'methane: four C–H bonds', { a: 'middle' }),
    muted(80, 156, 'C (2, 4) shares four electrons', { a: 'middle' }),
    S.line(170, 20, 170, 150, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    mol(230, 80, [[0, 0, 'C'], [40, 0, 'C'], [80, 0, 'C'], [120, 0, 'C'], [160, 0, 'C'], [80, -36, 'C']], [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]]),
    lab(310, 140, 'carbon atoms linked to carbon atoms', { a: 'middle' }),
    muted(310, 156, 'catenation (hydrogen atoms not shown)', { a: 'middle' }),
  ].join(''),
);

// 2. Single, double and triple carbon–carbon bonds.
export const BONDS = svgDoc(
  460,
  150,
  'Displayed formulae of three two-carbon hydrocarbons. Ethane: two carbon atoms joined by a single bond, each carbon also bonded to three hydrogen atoms. Ethene: two carbon atoms joined by a double bond, two parallel lines, each carbon bonded to two hydrogen atoms. Ethyne: two carbon atoms joined by a triple bond, three parallel lines, each carbon bonded to one hydrogen atom.',
  [
    chain(52, 60, [{}, {}]),
    lab(72, 118, 'ethane', { a: 'middle', w: 'bold' }),
    muted(72, 134, 'C–C single bond', { a: 'middle' }),
    chain(206, 60, [{ b: 2, l: null }, { r: null }], { dx: 44 }),
    lab(228, 118, 'ethene', { a: 'middle', w: 'bold' }),
    muted(228, 134, 'C=C double bond', { a: 'middle' }),
    chain(360, 60, [{ u: null, d: null, b: 3 }, { u: null, d: null }], { dx: 44 }),
    lab(382, 118, 'ethyne', { a: 'middle', w: 'bold' }),
    muted(382, 134, 'C≡C triple bond', { a: 'middle' }),
  ].join(''),
);

// 3. Straight chain, branched chain and ring (carbon skeletons only).
export const CHAINS = svgDoc(
  460,
  170,
  'Three carbon skeletons with hydrogen atoms not shown. A straight chain of five carbon atoms in a row. A branched chain: four carbon atoms in a row with a fifth carbon joined to the second carbon. A closed ring of six carbon atoms, the skeleton of benzene, with alternate single and double bonds.',
  [
    mol(20, 80, [[0, 0, 'C'], [30, 0, 'C'], [60, 0, 'C'], [90, 0, 'C'], [120, 0, 'C']], [[0, 1], [1, 2], [2, 3], [3, 4]], { size: 12 }),
    lab(80, 130, 'straight chain', { a: 'middle', w: 'bold' }),
    mol(185, 80, [[0, 0, 'C'], [30, 0, 'C'], [60, 0, 'C'], [90, 0, 'C'], [30, -32, 'C']], [[0, 1], [1, 2], [2, 3], [1, 4]], { size: 12 }),
    lab(230, 130, 'branched chain', { a: 'middle', w: 'bold' }),
    benzene(375, 75, 40, { h: false, size: 12 }),
    lab(375, 140, 'ring (benzene skeleton)', { a: 'middle', w: 'bold' }),
    muted(230, 160, 'hydrogen atoms are not shown', { a: 'middle' }),
  ].join(''),
);

// 4. Benzene: Kekulé structure with hydrogens, and the shorthand hexagon.
export const BENZENE = svgDoc(
  380,
  210,
  'Structure of benzene. Left: six carbon atoms in a flat hexagonal ring joined by alternate single and double bonds, with one hydrogen atom attached to each carbon atom. Right: the shorthand used in books, a plain hexagon with alternate double bonds, where each corner stands for a carbon atom carrying one hydrogen atom.',
  [
    benzene(110, 98, 42),
    lab(110, 200, 'benzene with all atoms shown', { a: 'middle' }),
    mol(290, 100, [0, 1, 2, 3, 4, 5].map((k) => [40 * Math.cos((Math.PI / 3) * k - Math.PI / 2), 40 * Math.sin((Math.PI / 3) * k - Math.PI / 2), '']), [[0, 1, 2], [1, 2], [2, 3, 2], [3, 4], [4, 5, 2], [5, 0]]),
    lab(290, 168, 'shorthand: each corner', { a: 'middle' }),
    lab(290, 182, 'is one C with one H', { a: 'middle' }),
    lab(290, 200, 'formula: six C, six H', { a: 'middle', c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 5. Chain isomers of the four-carbon alkane.
export const BUTANE_ISO = svgDoc(
  460,
  150,
  'The two chain isomers with the molecular formula of four carbon and ten hydrogen atoms. Left: butane, a straight chain written CH3, CH2, CH2, CH3, boiling point about minus one degree Celsius. Right: 2-methylpropane, a three-carbon chain with a methyl branch on the middle carbon, boiling point about minus twelve degrees Celsius.',
  [
    mol(36, 70, [[0, 0, 'CH₃'], [52, 0, 'CH₂'], [104, 0, 'CH₂'], [156, 0, 'CH₃']], [[0, 1], [1, 2], [2, 3]]),
    lab(114, 112, 'butane', { a: 'middle', w: 'bold' }),
    muted(114, 128, 'straight chain, b.p. about −1 °C', { a: 'middle' }),
    mol(290, 76, [[0, 0, 'CH₃'], [52, 0, 'CH'], [104, 0, 'CH₃'], [52, -38, 'CH₃']], [[0, 1], [1, 2], [1, 3]]),
    lab(342, 112, '2-methylpropane', { a: 'middle', w: 'bold' }),
    muted(342, 128, 'branched chain, b.p. about −12 °C', { a: 'middle' }),
    lab(230, 146, 'same formula C₄H₁₀, different chains', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 6. The three chain isomers of the five-carbon alkane.
export const PENTANE_ISO = svgDoc(
  460,
  230,
  'The three chain isomers with five carbon and twelve hydrogen atoms. Top: pentane, a straight chain of five carbon groups. Bottom left: 2-methylbutane, a four-carbon chain with a methyl branch on carbon two. Bottom right: 2,2-dimethylpropane, a central carbon atom joined to four methyl groups.',
  [
    mol(70, 40, [[0, 0, 'CH₃'], [52, 0, 'CH₂'], [104, 0, 'CH₂'], [156, 0, 'CH₂'], [208, 0, 'CH₃']], [[0, 1], [1, 2], [2, 3], [3, 4]]),
    lab(174, 72, 'pentane (b.p. 36 °C)', { a: 'middle', w: 'bold' }),
    mol(30, 150, [[0, 0, 'CH₃'], [52, 0, 'CH'], [104, 0, 'CH₂'], [156, 0, 'CH₃'], [52, -36, 'CH₃']], [[0, 1], [1, 2], [2, 3], [1, 4]]),
    lab(108, 196, '2-methylbutane (b.p. 28 °C)', { a: 'middle', w: 'bold' }),
    mol(350, 150, [[0, 0, 'C'], [-52, 0, 'CH₃'], [52, 0, 'CH₃'], [0, -36, 'CH₃'], [0, 36, 'CH₃']], [[0, 1], [0, 2], [0, 3], [0, 4]]),
    lab(350, 210, '2,2-dimethylpropane (b.p. 10 °C)', { a: 'middle', w: 'bold' }),
    muted(230, 226, 'all three are C₅H₁₂: more branching, lower boiling point', { a: 'middle' }),
  ].join(''),
);

// 7. Position isomers of the straight-chain butenes.
export const BUTENE_POS = svgDoc(
  460,
  150,
  'Two position isomers with four carbon and eight hydrogen atoms. Left: but-1-ene, CH2 double bonded to CH, then CH2 and CH3, with the double bond between carbon one and carbon two. Right: but-2-ene, CH3, CH double bonded to CH, then CH3, with the double bond between carbon two and carbon three. Small numbers above the carbons show the numbering of the chain.',
  [
    mol(30, 70, [[0, 0, 'CH₂'], [52, 0, 'CH'], [104, 0, 'CH₂'], [156, 0, 'CH₃']], [[0, 1, 2], [1, 2], [2, 3]]),
    ...[1, 2, 3, 4].map((k) => muted(30 + (k - 1) * 52, 48, String(k), { a: 'middle', c: 'var(--diagram-red)' })),
    lab(108, 108, 'but-1-ene', { a: 'middle', w: 'bold' }),
    muted(108, 124, 'double bond after carbon 1', { a: 'middle' }),
    mol(270, 70, [[0, 0, 'CH₃'], [52, 0, 'CH'], [104, 0, 'CH'], [156, 0, 'CH₃']], [[0, 1], [1, 2, 2], [2, 3]]),
    ...[1, 2, 3, 4].map((k) => muted(270 + (k - 1) * 52, 48, String(k), { a: 'middle', c: 'var(--diagram-red)' })),
    lab(348, 108, 'but-2-ene', { a: 'middle', w: 'bold' }),
    muted(348, 124, 'double bond after carbon 2', { a: 'middle' }),
    lab(230, 146, 'same chain, same formula C₄H₈, double bond moved', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);
