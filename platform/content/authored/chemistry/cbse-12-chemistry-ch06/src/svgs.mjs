// Hand-drawn SVG schematics for ch06 Haloalkanes and Haloarenes (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 13, size = 11) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 4, label, { a: 'middle', size });
}

// 1. Polar C–X bond.
export const POLAR = svgDoc(
  340,
  150,
  'A carbon atom bonded to a halogen atom X. The halogen is more electronegative, so it carries a partial negative charge and the carbon a partial positive charge; an arrow along the bond points from carbon towards the halogen. The partially positive carbon is attacked by nucleophiles.',
  [
    atom(110, 75, 'C', 'var(--diagram-fill)', 18, 13),
    atom(230, 75, 'X', 'var(--diagram-green)', 24, 13),
    S.line(128, 75, 206, 75, { w: 3 }),
    lab(110, 40, 'δ+', { a: 'middle', size: 14, w: 'bold', c: 'var(--diagram-blue)' }),
    lab(230, 36, 'δ−', { a: 'middle', size: 14, w: 'bold', c: 'var(--diagram-red)' }),
    S.arrow(135, 110, 205, 110, { c: 'var(--diagram-accent)', w: 2 }),
    S.line(140, 104, 140, 116, { c: 'var(--diagram-accent)', w: 2 }),
    lab(170, 130, 'bond dipole: towards the halogen', { a: 'middle', size: 10 }),
    S.arrow(40, 60, 88, 70, { c: 'var(--diagram-blue)', w: 2, size: 6 }),
    lab(20, 52, 'Nu⁻ attacks C', { size: 10, c: 'var(--diagram-blue)' }),
    lab(275, 80, 'X = F, Cl,', { size: 10 }),
    lab(275, 94, 'Br, I', { size: 10 }),
  ].join(''),
);

// 2. SN2: backside attack, transition state and inversion.
function centre(x, y, left, right, flip) {
  // three H drawn as an umbrella opening to the left (flip=false) or right (flip=true)
  const s = flip ? 1 : -1;
  return [
    S.line(x, y, x + s * 22, y - 26, { w: 1.5 }),
    S.line(x, y, x + s * 22, y + 26, { w: 1.5 }),
    S.line(x, y, x + s * 28, y + 4, { w: 1.5 }),
    atom(x + s * 22, y - 26, 'H', 'var(--diagram-fill)', 8, 10),
    atom(x + s * 22, y + 26, 'H', 'var(--diagram-fill)', 8, 10),
    atom(x + s * 28, y + 4, 'H', 'var(--diagram-fill)', 8, 10),
    left ?? '',
    right ?? '',
    atom(x, y, 'C', 'var(--diagram-fill)', 11, 10),
  ].join('');
}
export const SN2 = svgDoc(
  360,
  170,
  'SN2 reaction of hydroxide with bromomethane in three stages. Left: the hydroxide ion approaches the carbon from the side opposite the bromine. Centre: the transition state, in which the O–C bond is forming and the C–Br bond breaking at the same time, with the three hydrogen atoms in one plane. Right: methanol and a bromide ion; the three hydrogen atoms have flipped over like an umbrella in the wind, so the configuration is inverted.',
  [
    atom(16, 70, 'HO⁻', 'var(--diagram-blue)', 14, 10),
    centre(70, 70, '', S.line(70, 70, 100, 70, { w: 2 }) + atom(112, 70, 'Br', 'var(--diagram-green)', 12, 10), false),
    S.arrow(124, 70, 140, 70, { size: 6 }),
    lab(186, 20, 'transition state', { a: 'middle', size: 10, w: 'bold' }),
    S.line(150, 70, 175, 70, { w: 1.5, dash: '4 3' }),
    S.line(197, 70, 222, 70, { w: 1.5, dash: '4 3' }),
    atom(150, 70, 'HO', 'var(--diagram-blue)', 12, 10),
    S.line(186, 70, 186, 42, { w: 1.5 }),
    S.line(186, 70, 170, 96, { w: 1.5 }),
    S.line(186, 70, 202, 96, { w: 1.5 }),
    atom(186, 40, 'H', 'var(--diagram-fill)', 8, 10),
    atom(168, 98, 'H', 'var(--diagram-fill)', 8, 10),
    atom(204, 98, 'H', 'var(--diagram-fill)', 8, 10),
    atom(186, 70, 'C', 'var(--diagram-fill)', 11, 10),
    atom(232, 70, 'Br', 'var(--diagram-green)', 12, 10),
    S.arrow(248, 70, 262, 70, { size: 6 }),
    atom(278, 70, 'HO', 'var(--diagram-blue)', 12, 10),
    centre(310, 70, S.line(290, 70, 299, 70, { w: 2 }), '', true),
    atom(346, 118, 'Br⁻', 'var(--diagram-green)', 12, 10),
    lab(55, 140, 'backside attack', { a: 'middle', size: 10 }),
    lab(186, 140, 'bonds form and break together', { a: 'middle', size: 10 }),
    lab(310, 140, 'inverted', { a: 'middle', size: 10 }),
    lab(180, 162, 'Rate = k[CH₃Br][OH⁻]', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Resonance in chlorobenzene.
function ring(cx, cy, doubles) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push([cx + 30 * Math.cos(a), cy + 30 * Math.sin(a)]);
  }
  const out = [];
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % 6];
    out.push(S.line(x1, y1, x2, y2, { w: 1.5 }));
    if (doubles.includes(i)) {
      const mx = cx + (x1 + x2 - 2 * cx) * 0.82 / 2;
      const my = cy + (y1 + y2 - 2 * cy) * 0.82 / 2;
      const dx = (x2 - x1) * 0.32;
      const dy = (y2 - y1) * 0.32;
      out.push(S.line(mx - dx, my - dy, mx + dx, my + dy, { w: 1.5 }));
    }
  }
  return { svg: out.join(''), pts };
}
export const RESONANCE = svgDoc(
  360,
  170,
  'Two resonance structures of chlorobenzene. Left: the normal Kekulé ring with a single C–Cl bond. Right: a lone pair from chlorine has moved into the ring, giving a double bond between carbon and chlorine, a positive charge on chlorine and a negative charge on a ring carbon ortho to it. The real molecule is a hybrid, so the C–Cl bond has partial double-bond character.',
  (() => {
    const a = ring(80, 100, [1, 3, 5]);
    const b = ring(260, 100, [2, 4]);
    return [
      a.svg,
      S.line(a.pts[0][0], a.pts[0][1], a.pts[0][0], a.pts[0][1] - 26, { w: 1.5 }),
      lab(a.pts[0][0], a.pts[0][1] - 32, 'Cl', { a: 'middle', w: 'bold' }),
      lab(a.pts[0][0] + 14, a.pts[0][1] - 40, '··', { size: 12 }),
      S.arrow(140, 100, 190, 100, { size: 6 }),
      S.arrow(190, 100, 140, 100, { size: 6 }),
      b.svg,
      S.line(b.pts[0][0] - 2.5, b.pts[0][1], b.pts[0][0] - 2.5, b.pts[0][1] - 26, { w: 1.5 }),
      S.line(b.pts[0][0] + 2.5, b.pts[0][1], b.pts[0][0] + 2.5, b.pts[0][1] - 26, { w: 1.5 }),
      lab(b.pts[0][0], b.pts[0][1] - 32, 'Cl⁺', { a: 'middle', w: 'bold', c: 'var(--diagram-red)' }),
      lab(b.pts[1][0] + 8, b.pts[1][1] + 4, '−', { size: 14, w: 'bold', c: 'var(--diagram-blue)' }),
      lab(80, 160, 'C–Cl single bond', { a: 'middle', size: 10 }),
      lab(260, 160, 'C=Cl⁺, negative charge at ortho C', { a: 'middle', size: 10 }),
    ].join('');
  })(),
);
