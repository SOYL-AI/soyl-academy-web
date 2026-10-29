// Hand-drawn SVG schematics for ch05 Coordination Compounds (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 12, size = 10) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 4, label, { a: 'middle', size });
}

// 1. Chelation by ethane-1,2-diamine.
export const CHELATE = svgDoc(
  340,
  190,
  'Left: a metal ion bonded to two separate ammonia molecules, each through one nitrogen atom. Right: the same metal ion bonded to one ethane-1,2-diamine molecule through both of its nitrogen atoms, closing a five-membered ring of metal, nitrogen, carbon, carbon and nitrogen; this ring is a chelate.',
  [
    atom(80, 95, 'M', 'var(--diagram-accent)', 15, 11),
    S.line(93, 87, 128, 62, { w: 1.5 }),
    S.line(93, 103, 128, 128, { w: 1.5 }),
    atom(140, 55, 'NH₃', 'var(--diagram-blue)', 16, 10),
    atom(140, 135, 'NH₃', 'var(--diagram-blue)', 16, 10),
    lab(95, 178, 'two unidentate ligands', { a: 'middle' }),
    atom(220, 95, 'M', 'var(--diagram-accent)', 15, 11),
    S.line(233, 86, 260, 64, { w: 1.5 }),
    S.line(233, 104, 260, 126, { w: 1.5 }),
    atom(270, 56, 'N', 'var(--diagram-blue)'),
    atom(270, 134, 'N', 'var(--diagram-blue)'),
    S.line(280, 63, 300, 74, { w: 1.5 }),
    S.line(280, 127, 300, 116, { w: 1.5 }),
    S.line(310, 92, 310, 98, { w: 1.5 }),
    atom(310, 80, 'C'),
    atom(310, 110, 'C'),
    lab(272, 99, 'ring', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(265, 178, 'one didentate ligand (en): chelate', { a: 'middle' }),
  ].join(''),
);

// 2. Geometrical isomers: square planar [PtCl2(NH3)2] and octahedral [CoCl2(NH3)4]+.
function square(cx, cy, pos, title) {
  const d = 34;
  const at = [[0, -d], [d, 0], [0, d], [-d, 0]];
  const out = [S.rect(cx - d, cy - d, 2 * d, 2 * d, { c: 'var(--diagram-muted)', sw: 1, dash: '3 3' })];
  at.forEach(([dx, dy], i) => {
    out.push(S.line(cx, cy, cx + dx * 0.62, cy + dy * 0.62, { w: 1.5 }));
    out.push(atom(cx + dx, cy + dy, pos[i], pos[i] === 'Cl' ? 'var(--diagram-green)' : 'var(--diagram-blue)', 12, 10));
  });
  out.push(atom(cx, cy, 'Pt', 'var(--diagram-accent)', 12, 10));
  out.push(lab(cx, cy + 62, title, { a: 'middle', w: 'bold' }));
  return out.join('');
}
function octa(cx, cy, pos, title) {
  // positions: 0 top, 1 bottom, 2 left, 3 right, 4 front-left (lower-left), 5 back-right (upper-right)
  const at = [[0, -42], [0, 42], [-40, 0], [40, 0], [-22, 18], [22, -18]];
  const out = [];
  at.forEach(([dx, dy], i) => {
    out.push(S.line(cx, cy, cx + dx * 0.7, cy + dy * 0.7, { w: 1.5, dash: i === 5 ? '3 2' : undefined }));
  });
  at.forEach(([dx, dy], i) => out.push(atom(cx + dx, cy + dy, pos[i], pos[i] === 'Cl' ? 'var(--diagram-green)' : 'var(--diagram-blue)', 12, 10)));
  out.push(atom(cx, cy, 'Co', 'var(--diagram-accent)', 12, 10));
  out.push(lab(cx, cy + 68, title, { a: 'middle', w: 'bold' }));
  return out.join('');
}
export const CISTRANS = svgDoc(
  360,
  330,
  'Top row: square planar diamminedichloridoplatinum(II). In the cis isomer the two chlorine atoms are next to each other; in the trans isomer they are opposite. Bottom row: octahedral tetraamminedichloridocobalt(III) ion. In the cis isomer the two chlorine atoms are on adjacent corners; in the trans isomer they are at opposite corners, one at the top and one at the bottom.',
  [
    square(90, 70, ['Cl', 'Cl', 'NH₃', 'NH₃'], 'cis'),
    square(270, 70, ['Cl', 'NH₃', 'Cl', 'NH₃'], 'trans'),
    octa(90, 230, ['Cl', 'NH₃', 'NH₃', 'Cl', 'NH₃', 'NH₃'], 'cis'),
    octa(270, 230, ['Cl', 'Cl', 'NH₃', 'NH₃', 'NH₃', 'NH₃'], 'trans'),
    lab(180, 160, 'square planar [PtCl₂(NH₃)₂]', { a: 'middle', size: 10 }),
    lab(180, 324, 'octahedral [CoCl₂(NH₃)₄]⁺', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Crystal-field splitting: free ion, octahedral and tetrahedral fields.
function level(x, y, n, w = 14, gap = 6) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(S.line(x + i * (w + gap), y, x + i * (w + gap) + w, y, { w: 2.5 }));
  return out.join('');
}
export const SPLIT = svgDoc(
  360,
  230,
  'Energy-level diagram. In the centre, five d orbitals of equal energy in the free ion. On the left, in an octahedral field, they split into a lower set of three, t2g, at minus 0.4 delta-o and an upper set of two, eg, at plus 0.6 delta-o; the gap is delta-o. On the right, in a tetrahedral field, the order is reversed and the splitting is smaller: a lower set of two, e, and an upper set of three, t2; the gap delta-t is about four-ninths of delta-o.',
  [
    level(130, 110, 5, 14, 6),
    lab(178, 132, 'free ion: five d orbitals', { a: 'middle', size: 10 }),
    level(20, 50, 2),
    level(10, 150, 3),
    lab(70, 46, 'eg', { w: 'bold' }),
    lab(70, 154, 't2g', { w: 'bold' }),
    S.arrow(100, 148, 100, 54, { size: 6, c: 'var(--diagram-accent)' }),
    S.arrow(100, 54, 100, 146, { size: 6, c: 'var(--diagram-accent)' }),
    lab(104, 100, 'Δo', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(40, 30, '+0.6 Δo', { size: 10 }),
    lab(30, 172, '−0.4 Δo', { size: 10 }),
    lab(55, 214, 'Octahedral field', { a: 'middle', w: 'bold' }),
    level(270, 136, 2),
    level(260, 92, 3),
    lab(312, 140, 'e', { w: 'bold' }),
    lab(322, 96, 't2', { w: 'bold' }),
    S.arrow(252, 134, 252, 94, { size: 5, c: 'var(--diagram-accent)' }),
    S.arrow(252, 94, 252, 132, { size: 5, c: 'var(--diagram-accent)' }),
    lab(248, 114, 'Δt', { a: 'end', c: 'var(--diagram-accent)', w: 'bold' }),
    lab(300, 214, 'Tetrahedral field', { a: 'middle', w: 'bold' }),
    lab(300, 196, 'Δt ≈ (4/9) Δo', { a: 'middle', size: 10 }),
    S.line(122, 110, 76, 56, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(122, 110, 72, 150, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(232, 110, 258, 94, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(232, 110, 268, 136, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    lab(10, 225, 'Energy increases upwards', { size: 10 }),
  ].join(''),
);

// 4. Synergic bonding in a metal carbonyl.
export const SYNERGIC = svgDoc(
  360,
  170,
  'Synergic bonding between a metal atom and carbon monoxide. Top arrow: the carbon atom of CO donates a lone pair into a vacant metal orbital, forming a sigma bond. Bottom arrow: a filled metal d orbital donates electron density back into an empty antibonding pi orbital of CO, forming a pi back-bond. The two effects strengthen each other: the metal–carbon bond becomes stronger and the carbon–oxygen bond weaker.',
  [
    atom(80, 80, 'M', 'var(--diagram-accent)', 20, 13),
    atom(190, 80, 'C', 'var(--diagram-fill)', 14, 11),
    atom(240, 80, 'O', 'var(--diagram-red)', 14, 11),
    S.line(204, 76, 226, 76, { w: 1.5 }),
    S.line(204, 80, 226, 80, { w: 1.5 }),
    S.line(204, 84, 226, 84, { w: 1.5 }),
    S.path('M176 66 C150 40 120 40 100 62', { w: 2, c: 'var(--diagram-blue)' }),
    S.head(100, 62, Math.PI * 0.72, { c: 'var(--diagram-blue)', size: 7 }),
    lab(140, 32, 'σ donation: C lone pair → empty metal orbital', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    S.path('M100 98 C120 120 150 120 176 96', { w: 2, c: 'var(--diagram-green)' }),
    S.head(176, 96, -Math.PI * 0.27, { c: 'var(--diagram-green)', size: 7 }),
    lab(140, 138, 'π back-donation: filled metal d → empty π* of CO', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(300, 70, 'M–C bond', { size: 10 }),
    lab(300, 84, 'stronger;', { size: 10 }),
    lab(300, 98, 'C–O bond', { size: 10 }),
    lab(300, 112, 'weaker', { size: 10 }),
    lab(180, 162, 'The two effects reinforce each other: synergic bonding', { a: 'middle', size: 10 }),
  ].join(''),
);
