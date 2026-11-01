// Hand-drawn SVG schematics for ICSE 10 Chemistry ch08 Metallurgy (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Hall–Héroult electrolytic cell (schematic, not to scale).
export const HALL_CELL = svgDoc(
  470,
  300,
  'Schematic of the Hall–Héroult cell. A steel tank is lined inside with carbon, which is the cathode. Thick carbon rods dip into the molten electrolyte from above and are the anodes. The electrolyte is alumina dissolved in fused cryolite with a little fluorspar, kept at about 950 degrees Celsius, and it is covered by a crust of powdered coke. Molten aluminium collects at the bottom of the tank and is drawn off through a tapping hole. Oxygen bubbles form at the anodes and burn the carbon to carbon monoxide and carbon dioxide.',
  [
    // steel tank and carbon lining
    S.rect(110, 110, 250, 150, { sw: 3, c: 'var(--diagram-muted)' }),
    S.rect(120, 118, 230, 134, { sw: 4 }),
    // electrolyte
    S.rect(124, 136, 222, 76, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 0, c: 'none' }),
    // molten aluminium
    S.rect(124, 212, 222, 36, { fill: 'var(--diagram-muted)', fop: 0.35, sw: 0, c: 'none' }),
    S.line(124, 212, 346, 212, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    // coke crust
    S.rect(124, 124, 222, 12, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 0, c: 'none' }),
    // anodes and bus bar
    ...[150, 220, 290].map((x) => S.rect(x, 50, 30, 132, { fill: 'currentColor', fop: 0.12, sw: 1.5 })),
    S.line(150, 50, 320, 50, { w: 3 }),
    S.line(235, 50, 235, 28, { w: 2 }),
    lab(242, 26, '+ (to supply)', { size: 11, w: 'bold' }),
    // oxygen bubbles near anodes
    ...[[160, 192], [174, 198], [232, 194], [246, 189], [302, 196], [314, 190]].map(([x, y]) => S.circle(x, y, 3, { c: 'var(--diagram-red)', sw: 1 })),
    // cathode connection
    S.line(110, 250, 80, 250, { w: 2 }),
    lab(30, 254, '− (to supply)', { size: 11, w: 'bold' }),
    // tapping hole
    S.arrow(360, 238, 410, 238, { c: 'var(--diagram-muted)' }),
    lab(372, 256, 'tapping hole', { size: 10, c: 'var(--diagram-muted)' }),
    // labels with leaders (left)
    S.lead(150, 70, 96, 70),
    S.lines(8, 66, ['carbon anodes', '(+): burn away'], { size: 10, dy: 12 }),
    S.lead(124, 130, 96, 110),
    S.lines(8, 106, ['powdered coke', 'crust'], { size: 10, dy: 12 }),
    S.lead(124, 175, 96, 165),
    S.lines(8, 160, ['alumina in fused', 'cryolite and', 'fluorspar, 950 °C'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    S.lead(124, 226, 96, 222),
    S.lines(8, 218, ['molten', 'aluminium'], { size: 10, dy: 12 }),
    // labels (right)
    S.lead(350, 150, 372, 150),
    S.lines(376, 140, ['carbon lining', '(cathode −)'], { size: 10, dy: 12 }),
    S.lead(360, 186, 372, 192),
    S.lines(376, 190, ['steel tank'], { size: 10, c: 'var(--diagram-muted)' }),
    S.lead(320, 192, 372, 214),
    S.lines(376, 214, ['oxygen bubbles'], { size: 10, c: 'var(--diagram-red)' }),
    lab(235, 290, 'schematic, not to scale', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Froth flotation cell for a sulphide ore.
export const FROTH = svgDoc(
  430,
  270,
  'Schematic of froth flotation. A tank holds finely powdered sulphide ore mixed with water and a little pine oil. Air is blown in through a pipe at the bottom and the mixture is stirred. The ore particles, wetted by the oil, stick to the air bubbles and rise into a froth at the top, which is skimmed off. The gangue particles, wetted by water, sink to the bottom of the tank.',
  [
    // tank
    S.path('M 110 60 L 110 230 L 300 230 L 300 60', { w: 2 }),
    // water surface and froth band
    S.rect(112, 70, 186, 30, { fill: 'var(--diagram-muted)', fop: 0.18, sw: 0, c: 'none' }),
    ...[130, 152, 174, 196, 218, 240, 262, 284].map((x, i) => S.circle(x, 84 + (i % 2) * 6, 7, { c: 'var(--diagram-muted)', sw: 1 })),
    ...[[136, 86], [180, 82], [222, 90], [268, 84]].map(([x, y]) => S.circle(x, y, 2.5, { fill: 'currentColor', c: 'currentColor', sw: 0.5 })),
    S.rect(112, 100, 186, 128, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 0, c: 'none' }),
    // air pipe and rising bubbles
    S.path('M 70 250 L 205 250 L 205 220', { w: 2.5 }),
    lab(40, 266, 'air blown in', { size: 10 }),
    ...[[200, 196], [212, 172], [198, 148], [214, 124]].map(([x, y]) => S.circle(x, y, 4, { c: 'var(--diagram-muted)', sw: 1 })),
    // stirrer
    S.line(255, 30, 255, 180, { w: 2 }),
    S.line(240, 180, 270, 180, { w: 3 }),
    lab(262, 28, 'stirrer', { size: 10 }),
    // gangue at bottom
    ...[[130, 222], [150, 224], [170, 221], [235, 223], [270, 222], [288, 224]].map(([x, y]) => S.rect(x, y, 6, 5, { fill: 'var(--diagram-brown)', fop: 0.6, sw: 0, c: 'none' })),
    // skimming arrow
    S.arrow(300, 80, 350, 80, { c: 'var(--diagram-green)' }),
    S.lines(354, 76, ['froth with', 'ore particles', 'skimmed off'], { size: 10, dy: 12, c: 'var(--diagram-green)' }),
    // labels
    S.lead(112, 150, 80, 150),
    S.lines(8, 140, ['powdered ore,', 'water and', 'pine oil'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    S.lead(300, 222, 330, 222),
    S.lines(334, 214, ['gangue', 'sinks'], { size: 10, dy: 12 }),
  ].join(''),
);
