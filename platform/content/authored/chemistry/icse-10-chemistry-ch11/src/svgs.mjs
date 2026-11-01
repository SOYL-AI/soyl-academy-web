// Hand-drawn SVG schematics for ICSE 10 Chemistry ch11 Study of Compounds: Nitric Acid (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Laboratory preparation of nitric acid in an all-glass apparatus: stoppered glass retort, receiver cooled by water.
export const HNO3_RETORT = svgDoc(
  580,
  340,
  'Schematic of the laboratory preparation of nitric acid. A glass retort with a glass stopper holds potassium nitrate and concentrated sulphuric acid and stands on a wire gauze over a burner; the mixture is heated gently, below two hundred degrees Celsius. The long glass neck of the retort slopes down into a round receiver flask that sits in a basin of cold water, with more cold water running over the flask from a tap. Nitric acid vapour passes along the neck and condenses in the cooled receiver as a pale yellow liquid. No cork or rubber is used anywhere, because nitric acid vapour attacks them.',
  [
    // retort bulb and contents
    S.circle(140, 165, 52),
    S.path('M 93 188 Q 140 236 187 188 Z', { c: 'none', w: 0, fill: 'var(--diagram-muted)', fop: 0.35 }),
    // glass stopper on top
    S.rect(130, 100, 20, 16, { fill: 'var(--diagram-muted)', fop: 0.3 }),
    S.path('M 132 116 L 133 122 M 148 116 L 147 122', { w: 1.5 }),
    // neck sloping down into the receiver
    S.path('M 180 132 L 446 236', { w: 1.6 }),
    S.path('M 190 152 L 444 250', { w: 1.6 }),
    // vapour arrows along the neck
    S.arrow(250, 170, 320, 197, { c: 'var(--diagram-accent)', size: 6 }),
    // gauze, tripod and burner
    S.line(84, 222, 196, 222, { w: 2 }),
    S.path('M 96 222 L 88 300 M 184 222 L 192 300', { w: 1.5 }),
    S.path('M 140 268 Q 131 254 140 238 Q 149 254 140 268', { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.3 }),
    S.rect(132, 268, 16, 32, { sw: 1.5 }),
    // basin of cold water
    S.path('M 396 228 L 396 318 L 566 318 L 566 228', { w: 1.8 }),
    S.rect(398, 246, 166, 70, { c: 'none', sw: 0, fill: 'var(--diagram-blue)', fop: 0.15 }),
    S.line(398, 246, 564, 246, { c: 'var(--diagram-blue)', w: 1 }),
    // receiver flask in the basin
    S.circle(486, 274, 34),
    S.path('M 462 250 L 440 232 M 470 242 L 450 226', { w: 1.5 }),
    S.path('M 455 286 Q 486 314 517 286 Z', { c: 'none', w: 0, fill: 'var(--diagram-yellow)', fop: 0.45 }),
    // tap water over the receiver
    S.path('M 520 150 L 520 170 L 500 170', { w: 1.5 }),
    S.arrow(500, 176, 494, 232, { c: 'var(--diagram-blue)', size: 6 }),
    // labels
    lab(162, 96, 'glass stopper', { size: 10 }),
    S.lead(150, 106, 160, 98),
    S.lines(8, 120, ['KNO₃ +', 'conc. H₂SO₄'], { size: 10, dy: 12 }),
    S.lead(60, 136, 104, 196),
    S.lines(8, 256, ['heat gently:', 'below 200 °C'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    lab(250, 150, 'glass retort neck', { size: 10 }),
    lab(300, 222, 'HNO₃ vapour', { size: 10, c: 'var(--diagram-accent)' }),
    S.lines(528, 150, ['cold', 'water'], { size: 10, dy: 12, c: 'var(--diagram-blue)' }),
    S.lines(404, 334, ['receiver in cold water: nitric acid collects'], { size: 10, c: 'var(--diagram-muted)' }),
    lab(250, 40, 'All-glass apparatus: no cork or rubber', { a: 'middle', size: 12, w: 'bold' }),
  ].join(''),
);

// 2. Brown ring test for a nitrate (and for nitric acid).
export const BROWN_RING = svgDoc(
  380,
  320,
  'The brown ring test. A test tube holds the solution being tested mixed with freshly prepared iron(II) sulphate solution, which is pale green. Concentrated sulphuric acid is poured slowly down the side of the tilted tube from a dropper, so that it sinks and forms a separate heavy layer at the bottom. A brown ring appears where the two layers meet, showing that a nitrate, or nitric acid, is present.',
  [
    // tube
    S.path('M 150 40 L 150 250 Q 180 286 210 250 L 210 40', { w: 1.8 }),
    S.line(144, 40, 216, 40, { w: 1.8 }),
    // upper layer: test solution + FeSO4
    S.rect(152, 110, 56, 100, { c: 'none', sw: 0, fill: 'var(--diagram-green)', fop: 0.2 }),
    // brown ring
    S.rect(152, 206, 56, 10, { c: 'none', sw: 0, fill: 'var(--diagram-brown)', fop: 0.85 }),
    // lower layer: conc. H2SO4
    S.path('M 152 216 L 152 250 Q 180 282 208 250 L 208 216 Z', { c: 'none', w: 0, fill: 'var(--diagram-muted)', fop: 0.35 }),
    // dropper pouring acid down the side
    S.path('M 236 6 L 236 30 L 216 52', { w: 1.5 }),
    S.rect(229, 0, 14, 10, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 1 }),
    S.path('M 210 60 L 209 200', { c: 'var(--diagram-muted)', w: 1.2, dash: '3 3' }),
    // labels
    S.lines(232, 70, ['conc. H₂SO₄ poured', 'slowly down the side'], { size: 10, dy: 12 }),
    S.lines(8, 140, ['test solution +', 'freshly made FeSO₄', 'solution'], { size: 10, dy: 12, c: 'var(--diagram-green)' }),
    S.lead(118, 150, 152, 160),
    S.lines(232, 206, ['brown ring at', 'the junction'], { size: 11, w: 'bold', dy: 13, c: 'var(--diagram-brown)' }),
    S.lead(212, 211, 230, 206),
    S.lines(8, 250, ['heavy layer of', 'conc. H₂SO₄'], { size: 10, dy: 12 }),
    S.lead(104, 256, 156, 240),
  ].join(''),
);
