// Hand-drawn SVG schematics for ch14 Chemistry in Everyday Life (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// Enzyme with an active site: substrate fits (left); competitive inhibitor blocks the site (right).
const enzyme = (x) => S.path(`M${x} 150 L${x} 90 L${x + 40} 90 L${x + 40} 110 L${x + 70} 110 L${x + 70} 90 L${x + 120} 90 L${x + 120} 150 Z`, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'var(--diagram-blue)', w: 2 });
export const ENZYME = svgDoc(
  360,
  200,
  'Two copies of an enzyme drawn as a block with a notch, the active site, in its top edge. On the left, a substrate molecule shaped to fit the notch sits in the active site, and the reaction proceeds. On the right, a drug molecule of similar shape, a competitive inhibitor, occupies the active site instead, so the substrate cannot bind and the enzyme is blocked.',
  [
    enzyme(20),
    S.rect(61, 92, 28, 18, { fill: 'var(--diagram-green)', fop: 0.6, c: 'var(--diagram-green)', sw: 1.5 }),
    lab(75, 76, 'substrate', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(80, 170, 'Substrate binds:', { a: 'middle', size: 10 }),
    lab(80, 183, 'reaction catalysed', { a: 'middle', size: 10 }),
    enzyme(210),
    S.rect(251, 92, 28, 18, { fill: 'var(--diagram-red)', fop: 0.6, c: 'var(--diagram-red)', sw: 1.5 }),
    lab(265, 76, 'drug (inhibitor)', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.rect(300, 30, 28, 18, { fill: 'var(--diagram-green)', fop: 0.6, c: 'var(--diagram-green)', sw: 1.5 }),
    lab(314, 24, 'substrate', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    S.line(296, 52, 332, 26, { c: 'var(--diagram-red)', w: 2 }),
    lab(270, 170, 'Active site blocked:', { a: 'middle', size: 10 }),
    lab(270, 183, 'no reaction', { a: 'middle', size: 10 }),
    lab(80, 135, 'enzyme', { a: 'middle', size: 10 }),
    lab(270, 135, 'enzyme', { a: 'middle', size: 10 }),
  ].join(''),
);

// Receptor in a cell membrane: messenger (or agonist) binds; antagonist blocks.
export const RECEPTOR = svgDoc(
  360,
  190,
  'A cell membrane drawn as a horizontal double line, with two receptor proteins embedded in it. On the left a chemical messenger binds to the receptor’s binding site from outside the cell and a signal passes into the cell. On the right an antagonist drug binds to the site and blocks it without passing on a signal.',
  [
    S.line(10, 90, 350, 90, { w: 2 }),
    S.line(10, 104, 350, 104, { w: 2 }),
    lab(14, 82, 'outside cell', { size: 10, c: 'var(--diagram-muted)' }),
    lab(14, 120, 'inside cell', { size: 10, c: 'var(--diagram-muted)' }),
    S.path('M70 130 L70 70 L85 70 L90 80 L100 80 L105 70 L120 70 L120 130 Z', { fill: 'var(--diagram-brown)', fop: 0.35, c: 'var(--diagram-brown)', w: 2 }),
    S.circle(95, 72, 8, { fill: 'var(--diagram-green)', fop: 0.7, c: 'var(--diagram-green)' }),
    lab(95, 52, 'messenger (or agonist)', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    S.arrow(95, 132, 95, 168, { c: 'var(--diagram-green)', size: 6 }),
    lab(105, 160, 'signal', { size: 10, c: 'var(--diagram-green)' }),
    S.path('M240 130 L240 70 L255 70 L260 80 L270 80 L275 70 L290 70 L290 130 Z', { fill: 'var(--diagram-brown)', fop: 0.35, c: 'var(--diagram-brown)', w: 2 }),
    S.rect(253, 62, 24, 16, { fill: 'var(--diagram-red)', fop: 0.6, c: 'var(--diagram-red)', sw: 1.5 }),
    lab(265, 52, 'antagonist', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(265, 160, 'no signal', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(180, 184, 'Receptors in the membrane receive chemical messages', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);
