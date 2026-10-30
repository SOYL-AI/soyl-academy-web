// Hand-drawn SVG schematics for ch12 Isolation of Elements (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Froth flotation cell.
const bubbles = [[70, 70], [92, 62], [115, 72], [140, 64], [165, 70], [188, 62], [210, 71], [232, 65], [82, 84], [128, 82], [176, 84], [222, 83]];
const ore = [[95, 70], [143, 66], [190, 64], [234, 67], [130, 84]];
const gangue = [[90, 196], [120, 200], [150, 194], [182, 199], [212, 195], [240, 200], [104, 186], [168, 188], [226, 187]];
export const FROTH = svgDoc(
  360,
  230,
  'A tank of water containing powdered sulphide ore, pine oil and a little xanthate collector. Air is blown in through a pipe at the bottom while a stirrer agitates the mixture. A froth forms at the top; the ore particles, wetted by oil, stick to the air bubbles and rise into the froth, which overflows and is skimmed off. The gangue particles, wetted by water, sink to the bottom.',
  [
    S.path('M50 50 L50 210 L260 210 L260 50', { w: 2 }),
    S.rect(52, 90, 206, 118, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 0 }),
    S.rect(52, 56, 206, 34, { fill: 'var(--diagram-fill)', sw: 0 }),
    ...bubbles.map(([x, y]) => S.circle(x, y, 8, { sw: 1 })),
    ...ore.map(([x, y]) => S.circle(x, y, 3, { fill: 'var(--diagram-brown)', c: 'var(--diagram-brown)', sw: 1 })),
    ...gangue.map(([x, y]) => S.rect(x - 3, y - 3, 6, 6, { fill: 'var(--diagram-muted)', c: 'var(--diagram-muted)', sw: 1 })),
    S.line(155, 20, 155, 150, { w: 2 }),
    S.line(140, 150, 170, 150, { w: 3 }),
    lab(162, 24, 'stirrer', { size: 10 }),
    S.path('M20 120 L20 214 L120 214', { w: 2, c: 'var(--diagram-accent)' }),
    S.arrow(120, 214, 120, 204, { c: 'var(--diagram-accent)', size: 6 }),
    lab(8, 112, 'air', { size: 10, c: 'var(--diagram-accent)' }),
    S.path('M260 60 L300 60 L300 100', { w: 1.5 }),
    S.arrow(300, 60, 300, 104, { size: 6 }),
    lab(268, 120, 'froth with', { size: 10 }),
    lab(268, 133, 'ore skimmed off', { size: 10 }),
    lab(268, 196, 'gangue sinks', { size: 10, c: 'var(--diagram-muted)' }),
    S.lead(244, 198, 264, 194),
    lab(170, 46, 'froth: ore on bubbles', { size: 10, c: 'var(--diagram-brown)' }),
    lab(62, 140, 'water + pine oil + collector', { size: 10 }),
  ].join(''),
);

// 2. Zone refining of a rod.
export const ZONE = svgDoc(
  360,
  150,
  'A rod of impure metal lies horizontally. A circular heater surrounds a narrow section of it and moves slowly from left to right. The section inside the heater is molten. Pure metal crystallises behind the heater on the left, while impurities, which are more soluble in the melt, move along with the molten zone to the right-hand end, which is finally cut off.',
  [
    S.rect(20, 60, 320, 30, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.rect(20, 61, 140, 28, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 0 }),
    S.rect(160, 61, 30, 28, { fill: 'var(--diagram-red)', fop: 0.45, sw: 0 }),
    S.ellipse(175, 75, 22, 32, { c: 'var(--diagram-red)', sw: 2 }),
    lab(175, 32, 'moving heater', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.arrow(215, 30, 255, 30, { c: 'var(--diagram-red)', size: 6 }),
    lab(90, 110, 'pure metal recrystallises', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(175, 128, 'molten zone', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(275, 110, 'impure metal', { a: 'middle', size: 10 }),
    S.line(320, 50, 320, 100, { w: 1.5, c: 'var(--diagram-muted)', dash: '3 2' }),
    lab(330, 46, 'cut', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(180, 146, 'Impurities collect in the melt and are swept to the end', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);
