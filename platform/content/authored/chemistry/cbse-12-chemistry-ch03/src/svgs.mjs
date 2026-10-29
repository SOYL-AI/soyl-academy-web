// Hand-drawn SVG schematics for ch03 Chemical Kinetics (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Energy profile with and without a catalyst (exothermic reaction).
export const PROFILE = svgDoc(
  360,
  240,
  'Energy profile of an exothermic reaction. The reactants start at a higher energy level on the left and the products end at a lower level on the right. The uncatalysed path rises over a tall hump, the activated complex; the catalysed path, drawn dashed, rises over a lower hump. Arrows mark the activation energy of each path, measured from the reactants, and the enthalpy change between reactants and products.',
  [
    S.line(40, 20, 40, 210, { w: 1.5 }),
    S.line(40, 210, 340, 210, { w: 1.5 }),
    S.head(40, 16, -Math.PI / 2, { size: 7 }),
    S.head(344, 210, 0, { size: 7 }),
    S.text(14, 120, 'Energy', { a: 'middle', size: 11 }).replace('<text ', '<text transform="rotate(-90 14 120)" '),
    lab(190, 230, 'Reaction coordinate (progress of reaction)', { a: 'middle' }),
    S.path('M50 120 H100 C140 120 150 40 180 40 C210 40 220 160 260 160 H330', { w: 2 }),
    S.path('M100 120 C140 120 150 85 180 85 C210 85 220 160 260 160', { w: 2, dash: '5 4', c: 'var(--diagram-accent)' }),
    S.line(100, 120, 120, 120, { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    S.line(150, 120, 200, 120, { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    S.arrow(180, 120, 180, 43, { size: 6 }),
    lab(174, 70, 'Ea', { a: 'end', w: 'bold' }),
    S.line(180, 85, 198, 85, { w: 1, c: 'var(--diagram-accent)', dash: '3 3' }),
    S.arrow(198, 120, 198, 88, { size: 6, c: 'var(--diagram-accent)' }),
    lab(202, 116, 'Ea′', { size: 10, c: 'var(--diagram-accent)' }),
    lab(50, 184, 'Solid curve: without a catalyst', { size: 10 }),
    lab(50, 198, 'Dashed curve: with a catalyst (lower Ea′)', { size: 10, c: 'var(--diagram-accent)' }),
    S.line(260, 120, 330, 120, { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    S.arrow(310, 122, 310, 158, { size: 6 }),
    lab(316, 144, 'ΔH', { w: 'bold' }),
    lab(56, 112, 'Reactants'),
    lab(268, 178, 'Products'),
    lab(180, 30, 'Activated complex', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Collision orientation: effective and ineffective collisions.
function molecule(x, y, parts) {
  return parts.map(([dx, dy, r, label, fill]) => S.circle(x + dx, y + dy, r, { fill: fill ?? 'var(--diagram-fill)' }) + S.text(x + dx, y + dy + 4, label, { a: 'middle', size: 10 })).join('');
}
export const ORIENT = svgDoc(
  360,
  210,
  'Two collisions between a hydroxide ion and a bromomethane molecule. Top: the hydroxide ion strikes the carbon atom on the side opposite the bromine atom with enough energy; the collision is effective and gives methanol and a bromide ion. Bottom: the hydroxide ion strikes the bromine end; the molecules bounce apart unchanged, so the collision is ineffective.',
  [
    lab(10, 18, 'Proper orientation and enough energy: effective', { w: 'bold' }),
    molecule(40, 60, [[0, 0, 14, 'OH⁻', 'var(--diagram-blue)']]),
    S.arrow(58, 60, 92, 60, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    molecule(130, 60, [[-22, 0, 9, 'H'], [0, 0, 14, 'C'], [28, 0, 16, 'Br', 'var(--diagram-brown)'], [-6, -20, 9, 'H'], [-6, 20, 9, 'H']]),
    S.arrow(186, 60, 220, 60, { w: 2, size: 7 }),
    molecule(258, 60, [[-20, 0, 12, 'HO'], [6, 0, 14, 'C']]),
    molecule(320, 60, [[0, 0, 16, 'Br⁻', 'var(--diagram-brown)']]),
    lab(240, 96, 'methanol + bromide ion', { a: 'middle', size: 10 }),
    S.line(10, 112, 350, 112, { w: 1, c: 'var(--diagram-muted)', dash: '4 3' }),
    lab(10, 132, 'Wrong orientation: ineffective (bounces off)', { w: 'bold' }),
    molecule(130, 172, [[-22, 0, 9, 'H'], [0, 0, 14, 'C'], [28, 0, 16, 'Br', 'var(--diagram-brown)'], [-6, -20, 9, 'H'], [-6, 20, 9, 'H']]),
    molecule(250, 172, [[0, 0, 14, 'OH⁻', 'var(--diagram-blue)']]),
    S.arrow(232, 172, 180, 172, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    S.arrow(272, 160, 310, 140, { w: 1.5, size: 6, dash: '4 3' }),
    lab(300, 196, 'no reaction', { a: 'middle', size: 10 }),
  ].join(''),
);
