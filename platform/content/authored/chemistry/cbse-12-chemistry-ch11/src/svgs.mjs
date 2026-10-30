// Hand-drawn SVG schematics for ch11 Surface Chemistry (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Tyndall effect: a beam through a true solution (invisible path) and a sol (bright path).
const beaker = (x, title, sol) => [
  S.rect(x, 50, 110, 90, { sw: 1.5 }),
  S.rect(x + 1, 62, 108, 77, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 0 }),
  ...(sol
    ? [S.path(`M${x} 95 L${x + 110} 88 L${x + 110} 108 Z`, { c: 'var(--diagram-yellow)', fill: 'var(--diagram-yellow)', fop: 0.5, w: 1 }),
      ...[[x + 20, 97], [x + 40, 93], [x + 55, 99], [x + 75, 95], [x + 92, 101], [x + 66, 92]].map(([cx, cy]) => S.circle(cx, cy, 1.6, { fill: 'currentColor', sw: 0 }))]
    : [S.line(x, 95, x + 110, 95, { c: 'var(--diagram-yellow)', w: 1, dash: '2 4' })]),
  lab(x + 55, 158, title, { a: 'middle', size: 11, w: 'bold' }),
  lab(x + 55, 172, sol ? 'path of light visible' : 'path not visible', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
].join('');
export const TYNDALL = svgDoc(
  360,
  210,
  'A narrow beam of light from a lamp on the left passes through two beakers. In the first beaker, a true solution, the path of the beam cannot be seen. In the second beaker, a colloidal sol, the beam shows up as a bright cone because the colloidal particles scatter light; an observer views it from the side, at right angles to the beam.',
  [
    S.rect(8, 86, 26, 18, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    lab(21, 80, 'lamp', { a: 'middle', size: 10 }),
    S.arrow(34, 95, 64, 95, { c: 'var(--diagram-yellow)', w: 2, size: 6 }),
    beaker(66, 'True solution', false),
    S.line(176, 95, 222, 95, { c: 'var(--diagram-yellow)', w: 2 }),
    beaker(224, 'Colloidal sol', true),
    S.ellipse(279, 26, 10, 6, { sw: 1.5 }),
    S.circle(279, 26, 2.5, { fill: 'currentColor', sw: 0 }),
    S.arrow(279, 34, 279, 84, { c: 'var(--diagram-muted)', w: 1, size: 5, dash: '3 2' }),
    lab(294, 30, 'observer', { size: 10 }),
    lab(180, 202, 'Scattering by particles (1–1000 nm) makes the beam visible', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 2. A positively charged ferric hydroxide sol particle with its layer of counter-ions.
const ring = (cx, cy, rr, n, sym, c) => Array.from({ length: n }, (_, k) => {
  const t = (2 * Math.PI * k) / n;
  return S.text(cx + rr * Math.cos(t), cy + rr * Math.sin(t) + 4, sym, { a: 'middle', size: 12, w: 'bold', c });
}).join('');
export const CHARGED = svgDoc(
  340,
  220,
  'A colloidal particle of hydrated ferric oxide drawn as a circle. Fe3+ ions adsorbed on its surface give it a positive charge, shown as plus signs around the particle. A looser outer layer of chloride ions, shown as minus signs, surrounds it. Because all particles carry the same charge, they repel each other and the sol stays stable.',
  [
    S.circle(110, 110, 48, { fill: 'var(--diagram-brown)', fop: 0.35, c: 'var(--diagram-brown)', sw: 2 }),
    lab(110, 106, 'Fe₂O₃·xH₂O', { a: 'middle', size: 11, w: 'bold' }),
    lab(110, 120, 'particle', { a: 'middle', size: 10 }),
    ring(110, 110, 58, 12, '+', 'var(--diagram-red)'),
    ring(110, 110, 84, 14, '−', 'var(--diagram-blue)'),
    S.circle(110, 110, 70, { c: 'var(--diagram-muted)', sw: 1, dash: '3 3' }),
    S.lead(166, 82, 222, 50),
    lab(226, 46, 'adsorbed Fe³⁺ ions', { size: 10, c: 'var(--diagram-red)' }),
    lab(226, 59, '(fixed layer, +)', { size: 10, c: 'var(--diagram-red)' }),
    S.lead(190, 140, 222, 160),
    lab(226, 160, 'Cl⁻ counter-ions', { size: 10, c: 'var(--diagram-blue)' }),
    lab(226, 173, '(diffuse layer, −)', { size: 10, c: 'var(--diagram-blue)' }),
    lab(170, 214, 'Like charges on all particles: they repel, so the sol is stable', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);
