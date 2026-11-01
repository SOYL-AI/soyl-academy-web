// Hand-drawn SVG schematics for ICSE 10 Chemistry ch09 Study of Compounds: Hydrogen Chloride (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Laboratory preparation of hydrogen chloride: generating flask, drying bottle, collection by upward displacement of air.
export const HCL_PREP = svgDoc(
  560,
  320,
  'Schematic of the laboratory preparation of hydrogen chloride. A round-bottomed flask holds sodium chloride and concentrated sulphuric acid and is heated gently, keeping the temperature below two hundred degrees Celsius. A thistle funnel passes through the cork into the mixture. A delivery tube carries the gas into a wash bottle of concentrated sulphuric acid, where the gas bubbles through the acid and is dried. The dry gas then passes down a tube to the bottom of an upright gas jar, pushing the lighter air out at the top: collection by upward displacement of air.',
  [
    // flask
    S.circle(110, 200, 48),
    S.path('M 98 154 L 98 110 M 122 154 L 122 110', { w: 1.5 }),
    S.rect(94, 100, 32, 12, { fill: 'var(--diagram-muted)', fop: 0.4 }),
    S.path('M 64 212 Q 110 260 156 212 Z', { fill: 'var(--diagram-accent)', fop: 0.25, c: 'none', w: 0 }),
    // thistle funnel
    S.line(104, 228, 104, 70, { w: 1.5 }),
    S.path('M 104 70 Q 88 66 88 54 Q 104 40 120 54 Q 120 66 104 70', { w: 1.5 }),
    // burner and gauze
    S.line(70, 256, 150, 256, { w: 2 }),
    S.path('M 104 286 Q 96 274 104 262 Q 112 274 104 286', { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.3 }),
    S.rect(96, 286, 16, 24, { sw: 1.5 }),
    // delivery tube to wash bottle
    S.path('M 118 106 L 118 80 L 250 80 L 250 236', { w: 1.5 }),
    // wash bottle
    S.rect(225, 140, 70, 120, { sw: 1.5 }),
    S.rect(227, 190, 66, 68, { fill: 'var(--diagram-blue)', fop: 0.18, c: 'none', sw: 0 }),
    ...[[250, 222], [254, 208], [248, 196]].map(([x, y]) => S.circle(x, y, 3, { sw: 1 })),
    S.path('M 272 150 L 272 80 L 410 80 L 410 290', { w: 1.5 }),
    // gas jar (upright)
    S.path('M 375 120 L 375 300 L 445 300 L 445 120', { w: 1.8 }),
    S.line(368, 116, 400, 116, { w: 2.5 }),
    S.line(420, 116, 452, 116, { w: 2.5 }),
    S.arrow(434, 140, 434, 100, { c: 'var(--diagram-muted)', size: 6 }),
    lab(452, 100, 'air out', { size: 10, c: 'var(--diagram-muted)' }),
    S.arrow(398, 260, 398, 290, { c: 'var(--diagram-green)', size: 6 }),
    // labels
    S.lines(8, 40, ['thistle', 'funnel'], { size: 10, dy: 12 }),
    S.lead(90, 56, 52, 46),
    S.lines(8, 160, ['sodium', 'chloride +', 'conc. sulphuric', 'acid'], { size: 10, dy: 12, c: 'var(--diagram-accent)' }),
    S.lead(70, 220, 50, 200),
    S.lines(122, 300, ['gentle heat', '(below 200 °C)'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    S.lines(214, 276, ['conc. sulphuric acid', '(drying agent)'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    lab(300, 72, 'dry hydrogen chloride', { size: 10 }),
    S.lines(456, 200, ['gas jar:', 'upward', 'displacement', 'of air'], { size: 10, dy: 12, c: 'var(--diagram-green)' }),
  ].join(''),
);

// 2. Fountain experiment with hydrogen chloride.
export const FOUNTAIN = svgDoc(
  400,
  330,
  'Schematic of the fountain experiment. A dry round-bottomed flask filled with dry hydrogen chloride is clamped upside down. A long glass tube with a narrow jet at its upper end passes through the cork, and its lower end dips into a trough of water coloured with blue litmus solution. When a little water enters, the gas dissolves, the pressure inside falls and the water rushes up the tube as a fountain, which turns red inside the flask.',
  [
    // inverted flask
    S.circle(200, 100, 70),
    S.path('M 186 168 L 186 200 M 214 168 L 214 200', { w: 1.5 }),
    S.rect(182, 198, 36, 14, { fill: 'var(--diagram-muted)', fop: 0.4 }),
    // jet tube
    S.line(200, 70, 200, 300, { w: 1.5 }),
    // fountain spray (red)
    ...[[-30, 60], [-14, 44], [0, 40], [14, 44], [30, 60]].map(([dx, dy]) => S.path(`M 200 70 Q ${200 + dx / 2} ${dy - 4} ${200 + dx} ${dy + 30}`, { c: 'var(--diagram-red)', w: 1.5 })),
    // trough
    S.path('M 90 250 L 90 312 L 310 312 L 310 250', { w: 1.8 }),
    S.rect(92, 268, 216, 42, { fill: 'var(--diagram-blue)', fop: 0.2, c: 'none', sw: 0 }),
    S.line(92, 268, 308, 268, { c: 'var(--diagram-blue)', w: 1 }),
    S.arrow(206, 290, 206, 240, { c: 'var(--diagram-blue)', size: 6 }),
    // labels
    S.lines(290, 70, ['flask of dry', 'hydrogen', 'chloride'], { size: 10, dy: 12 }),
    S.lead(266, 90, 288, 78),
    S.lines(8, 60, ['red fountain', '(blue litmus', 'turns red)'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    S.lead(172, 80, 84, 66),
    S.lines(8, 200, ['glass tube', 'with a jet'], { size: 10, dy: 12 }),
    S.lead(198, 230, 70, 206),
    S.lines(316, 280, ['water with', 'blue litmus'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    lab(222, 246, 'water rises', { size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 3. Inverted funnel arrangement for dissolving hydrogen chloride in water.
export const FUNNEL = svgDoc(
  400,
  260,
  'Schematic of the inverted funnel arrangement for making hydrochloric acid. Hydrogen chloride from a delivery tube enters the stem of a funnel held upside down over a beaker of water, with the rim of the funnel just dipping below the water surface. If water rises into the funnel, the level in the beaker falls below the rim, air enters and the water drops back, so it cannot be sucked back into the apparatus.',
  [
    // delivery tube into funnel stem
    S.path('M 20 50 L 200 50 L 200 110', { w: 1.5 }),
    S.arrow(60, 40, 120, 40, { c: 'var(--diagram-muted)', size: 6 }),
    lab(20, 30, 'hydrogen chloride gas', { size: 10 }),
    // funnel (inverted)
    S.path('M 200 110 L 200 130 L 140 196 M 200 130 L 260 196', { w: 1.8 }),
    // beaker
    S.path('M 100 150 L 100 240 L 300 240 L 300 150', { w: 1.8 }),
    S.rect(102, 190, 196, 48, { fill: 'var(--diagram-blue)', fop: 0.18, c: 'none', sw: 0 }),
    S.line(102, 190, 298, 190, { c: 'var(--diagram-blue)', w: 1 }),
    // labels
    S.lines(270, 120, ['inverted', 'funnel'], { size: 10, dy: 12 }),
    S.lead(232, 160, 268, 128),
    S.lines(306, 186, ['rim just dips', 'below the', 'water surface'], { size: 10, dy: 12 }),
    S.lead(262, 194, 302, 186),
    S.lines(110, 228, ['water → hydrochloric acid'], { size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);
