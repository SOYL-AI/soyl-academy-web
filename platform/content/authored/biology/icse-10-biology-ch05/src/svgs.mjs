// SVG diagrams for ICSE 10 Biology ch05 Photosynthesis. All new, schematic drawings; chart values come from calc.mjs.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { HYD } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const leafPath = (cx, cy, w, h) => `M${cx - w} ${cy} Q${cx - w * 0.5} ${cy - h} ${cx + w * 0.6} ${cy - h * 0.55} Q${cx + w} ${cy - h * 0.2} ${cx + w} ${cy} Q${cx + w} ${cy + h * 0.2} ${cx + w * 0.6} ${cy + h * 0.55} Q${cx - w * 0.5} ${cy + h} ${cx - w} ${cy} Z`;

// ---------------------------------------------------------------- 1. chloroplast (named and lettered)
function chloroplast(lettered) {
  const p = [];
  p.push(S.ellipse(260, 140, 200, 100, { fill: 'var(--diagram-green)', fop: 0.12, sw: 1.6 }), S.ellipse(260, 140, 192, 92, { sw: 1.2 }));
  const grana = [[140, 110], [215, 172], [300, 104], [372, 170], [418, 118], [118, 168]];
  for (let i = 0; i < grana.length - 1; i++) {
    const [x1, y1] = grana[i];
    const [x2, y2] = grana[(i + 1) % grana.length];
    p.push(S.line(x1, y1, x2, y2, { c: 'var(--diagram-green)', w: 2 }));
  }
  for (const [x, y] of grana) for (let k = -2; k <= 2; k++) p.push(S.ellipse(x, y + k * 6, 20, 3.6, { fill: 'var(--diagram-green)', fop: 0.65, sw: 0.8 }));
  p.push(S.ellipse(196, 212, 18, 9, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Envelope (double membrane)', 'Granum (stack of thylakoids)', 'Stroma lamella', 'Stroma', 'Starch grain'];
  const o = lettered ? { size: 15, w: 'bold' } : {};
  p.push(S.lead(360, 54, 470, 40), lab(474, 44, L[0], o));
  p.push(S.lead(440, 112, 470, 98), lab(474, 102, L[1], o));
  p.push(S.lead(336, 137, 470, 158), lab(474, 162, L[2], o));
  p.push(S.lead(300, 214, 470, 222), lab(474, 226, L[3], o));
  p.push(S.lead(180, 214, 70, 262), lab(lettered ? 54 : 20, 270, L[4], o));
  if (!lettered) p.push(S.text(260, 274, 'Light phase in the grana; dark phase in the stroma', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  const label = lettered
    ? 'A chloroplast in section, oval in shape. A marks the double membrane around it; B a stack of thin disc-shaped sacs containing the green pigment; C a thin sheet joining one stack to another; D the colourless ground substance around the stacks; E a pale oval grain lying in D'
    : 'A chloroplast in section: an oval body bounded by a double membrane (envelope), containing stacks of thylakoids called grana joined by stroma lamellae, all lying in a colourless stroma with a starch grain. The light phase takes place in the grana and the dark phase in the stroma';
  return svgDoc(660, 282, label, p.join(''));
}
export const CHLOROPLAST = chloroplast(false);
export const CHLOROPLAST_LETTERED = chloroplast(true);

// ---------------------------------------------------------------- 2. section of a leaf
export const LEAF_TS = (() => {
  const p = [];
  p.push(S.line(40, 40, 440, 40, { c: 'var(--diagram-accent)', w: 3 }), S.line(40, 220, 440, 220, { c: 'var(--diagram-accent)', w: 3 }));
  for (let x = 40; x < 440; x += 25) p.push(S.rect(x, 42, 25, 15, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
  for (let x = 42; x < 438; x += 18) {
    p.push(S.rect(x, 59, 16, 58, { rx: 6, fill: 'var(--diagram-green)', fop: 0.18, sw: 1 }));
    for (let k = 0; k < 4; k++) p.push(S.circle(x + 5 + (k % 2) * 6, 68 + k * 12, 2.4, { fill: 'var(--diagram-green)', sw: 0 }));
  }
  const spongy = [[60, 135], [100, 150], [70, 178], [130, 128], [160, 186], [180, 140], [300, 130], [330, 182], [360, 140], [400, 170], [420, 128], [280, 188]];
  for (const [x, y] of spongy) p.push(S.ellipse(x, y, 17, 12, { fill: 'var(--diagram-green)', fop: 0.15, sw: 1 }), S.circle(x - 4, y, 2.2, { fill: 'var(--diagram-green)', sw: 0 }), S.circle(x + 5, y + 3, 2.2, { fill: 'var(--diagram-green)', sw: 0 }));
  p.push(S.circle(232, 160, 26, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.3 }), S.path('M208 156 Q232 132 256 156 Z', { fill: 'var(--diagram-blue)', fop: 0.35, w: 0.8 }), S.path('M210 166 Q232 186 254 166 Z', { fill: 'var(--diagram-brown)', fop: 0.35, w: 0.8 }));
  for (let x = 40; x < 440; x += 25) if (x !== 340) p.push(S.rect(x, 203, 25, 15, { fill: 'var(--diagram-fill)', fop: 1, sw: 1 }));
  p.push(S.ellipse(345, 211, 6, 7, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }), S.ellipse(360, 211, 6, 7, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }));
  const R = (y, ty, s, x = 440) => p.push(S.lead(x, y, 470, ty - 4), lab(474, ty, s));
  R(40, 30, 'Cuticle (waxy)');
  R(50, 54, 'Upper epidermis');
  R(88, 88, 'Palisade tissue: many chloroplasts');
  R(150, 130, 'Spongy tissue with air spaces', 420);
  p.push(S.lead(256, 168, 470, 176), lab(474, 180, 'Vein: xylem (top), phloem (below)'));
  R(212, 214, 'Lower epidermis');
  p.push(S.lead(352, 218, 470, 246), lab(474, 250, 'Stoma with guard cells'));
  return svgDoc(680, 262, 'Section of a dorsiventral leaf: a waxy cuticle over the upper epidermis; tall palisade cells packed with chloroplasts; loosely arranged spongy cells with large air spaces; a vein with xylem above and phloem below; the lower epidermis with a stoma between two guard cells and a cuticle below', p.join(''));
})();

// ---------------------------------------------------------------- 3. removing chlorophyll in a water bath
export const WATERBATH = (() => {
  const p = [];
  p.push(S.path('M110 110 L110 240 L300 240 L300 110', { w: 1.6 }), S.rect(111, 140, 188, 99, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 0 }));
  for (const [x, y] of [[140, 220], [170, 200], [250, 214], [270, 190], [150, 170]]) p.push(S.circle(x, y, 3, { sw: 0.8 }));
  p.push(S.path('M190 60 L190 200 Q205 216 220 200 L220 60', { fill: 'var(--diagram-fill)', fop: 1, w: 1.5 }), S.path('M191 120 L191 200 Q205 214 219 200 L219 120 Z', { fill: 'var(--diagram-green)', fop: 0.3, w: 0 }));
  p.push(S.path('M200 185 Q196 150 206 135 Q214 150 210 185 Z', { fill: 'var(--diagram-yellow)', fop: 0.6, w: 1 }));
  p.push(S.line(120, 244, 104, 290, { w: 2 }), S.line(290, 244, 306, 290, { w: 2 }), S.line(100, 244, 310, 244, { w: 2 }));
  p.push(S.path('M196 290 Q186 270 200 252 Q206 266 212 252 Q226 270 216 290 Z', { fill: 'var(--diagram-red)', fop: 0.5, w: 1 }), S.rect(194, 290, 24, 8, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }));
  p.push(S.lead(220, 80, 320, 64), lab(324, 68, 'Test tube with alcohol'));
  p.push(S.lead(210, 160, 320, 110), lab(324, 114, 'Leaf (boiled in water first)'), lab(324, 127, 'turns pale as chlorophyll dissolves'));
  p.push(S.lead(280, 180, 320, 170), lab(324, 174, 'Boiling water: a water bath'));
  p.push(S.lead(218, 280, 320, 262), lab(324, 260, 'Flame heats only the water;'), lab(324, 273, 'alcohol catches fire easily'));
  return svgDoc(560, 302, 'Removing chlorophyll from a leaf. A test tube containing alcohol and the leaf stands in a beaker of boiling water (a water bath) heated by a burner on a tripod. The flame heats only the water, because alcohol catches fire easily; the alcohol turns green as chlorophyll dissolves and the leaf becomes pale', p.join(''));
})();

// ---------------------------------------------------------------- 4. light screen experiment
export const LIGHTSCREEN = (() => {
  const p = [];
  p.push(S.path(leafPath(150, 120, 110, 80), { fill: 'var(--diagram-green)', fop: 0.4, w: 1.5 }), S.line(40, 120, 20, 140, { c: 'var(--diagram-green)', w: 3 }));
  p.push(S.rect(108, 50, 34, 140, { fill: 'currentColor', fop: 0.85, sw: 1 }), S.rect(104, 46, 42, 10, { rx: 2, fill: 'var(--diagram-muted)', sw: 1 }));
  p.push(S.text(150, 225, 'Before: black paper strip on both sides', { a: 'middle', size: 11, w: 'bold' }));
  p.push(S.path(leafPath(430, 120, 110, 80), { fill: 'var(--diagram-blue)', fop: 0.75, w: 1.5 }));
  p.push(S.rect(388, 52, 34, 136, { fill: 'var(--diagram-yellow)', fop: 0.9, sw: 0 }), S.path(leafPath(430, 120, 110, 80), { w: 1.5 }));
  p.push(S.text(430, 225, 'After the starch test with iodine', { a: 'middle', size: 11, w: 'bold' }));
  p.push(S.lead(140, 60, 180, 20), lab(184, 22, 'Black paper strip (clipped)'));
  p.push(S.lead(470, 110, 540, 70), lab(500, 62, 'Blue-black:'), lab(500, 75, 'starch'));
  p.push(S.lead(405, 160, 540, 180), lab(500, 176, 'Pale brown:'), lab(500, 189, 'no starch'));
  return svgDoc(600, 236, 'Light screen experiment. Left: a leaf of a destarched plant with a strip of black paper clipped across both sides, before the plant is kept in sunlight. Right: the same leaf after the starch test with iodine: the parts that received light are blue-black (starch present) and the covered strip is pale brown (no starch)', p.join(''));
})();

// ---------------------------------------------------------------- 5. Moll's half-leaf experiment
export const MOLL = (() => {
  const p = [];
  p.push(S.path('M60 120 Q60 96 90 92 L110 92 L110 70 L150 70 L150 92 L170 92 Q200 96 200 120 L200 260 L60 260 Z', { fill: 'var(--diagram-fill)', fop: 1, w: 1.6 }));
  p.push(S.rect(61, 222, 138, 37, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 0 }));
  p.push(S.rect(106, 58, 48, 16, { rx: 3, fill: 'var(--diagram-brown)', fop: 0.6, sw: 1 }), S.line(130, 58, 130, 74, { w: 1 }));
  p.push(S.path('M130 66 Q120 120 100 170 Q118 180 140 150 Q146 110 130 66 Z', { fill: 'var(--diagram-green)', fop: 0.45, w: 1.2 }));
  p.push(S.path('M130 66 Q160 40 230 30 Q240 46 220 60 Q170 66 130 66 Z', { fill: 'var(--diagram-green)', fop: 0.45, w: 1.2 }));
  p.push(S.line(250, 30, 290, 30, { c: 'var(--diagram-green)', w: 3 }), S.line(230, 30, 250, 30, { c: 'var(--diagram-green)', w: 3 }));
  p.push(S.lead(200, 46, 250, 60), lab(254, 64, 'Outer half of the leaf: in air with carbon dioxide'));
  p.push(S.lead(154, 66, 250, 96), lab(254, 100, 'Split cork sealed with Vaseline'));
  p.push(S.lead(124, 140, 250, 140), lab(254, 144, 'Inner half of the leaf: inside the bottle'));
  p.push(S.lead(180, 240, 250, 210), lab(254, 214, 'Potassium hydroxide solution'), lab(254, 227, '(absorbs carbon dioxide)'));
  p.push(S.text(130, 284, 'Wide-mouthed bottle', { a: 'middle', size: 11, w: 'bold' }));
  // result
  p.push(S.path('M560 150 Q520 110 470 150 Q520 190 560 150 Z', { fill: 'var(--diagram-yellow)', fop: 0.9, w: 1.2 }), S.path('M560 150 Q600 120 640 150 Q600 180 560 150 Z', { fill: 'var(--diagram-blue)', fop: 0.75, w: 1.2 }));
  p.push(S.line(560, 112, 560, 192, { dash: '3 3', w: 1 }));
  p.push(S.text(560, 216, 'After the starch test:', { a: 'middle', size: 11, w: 'bold' }), S.text(560, 232, 'inner half brown, outer half blue-black', { a: 'middle', size: 11 }));
  return svgDoc(660, 292, "Moll's half-leaf experiment. A leaf of a destarched plant passes through a split cork, sealed with Vaseline, into a wide-mouthed bottle containing potassium hydroxide solution, which absorbs carbon dioxide; half the leaf is inside the bottle and half outside in air. After a few hours in sunlight the starch test shows the inner half brown (no starch) and the outer half blue-black (starch)", p.join(''));
})();

// ---------------------------------------------------------------- 6. variegated leaf
export const VARIEGATED = (() => {
  const p = [];
  const leaf = (cx, inner, outer, title) => {
    p.push(S.path(leafPath(cx, 110, 110, 78), { fill: outer, fop: outer === 'var(--diagram-fill)' ? 1 : 0.85, w: 1.5 }));
    p.push(S.path(leafPath(cx + 4, 110, 80, 52), { fill: inner, fop: 0.8, w: 0.8 }));
    p.push(S.ellipse(cx - 20, 104, 14, 9, { fill: outer, fop: outer === 'var(--diagram-fill)' ? 1 : 0.85, sw: 0.8 }), S.ellipse(cx + 34, 120, 10, 7, { fill: outer, fop: outer === 'var(--diagram-fill)' ? 1 : 0.85, sw: 0.8 }));
    p.push(S.text(cx, 214, title, { a: 'middle', size: 11, w: 'bold' }));
  };
  leaf(150, 'var(--diagram-green)', 'var(--diagram-fill)', 'Before: green and white (variegated)');
  leaf(430, 'var(--diagram-blue)', 'var(--diagram-yellow)', 'After the starch test with iodine');
  p.push(S.lead(200, 64, 236, 30), lab(240, 30, 'White part: no chlorophyll'));
  p.push(S.lead(110, 130, 60, 186), lab(14, 196, 'Green part'));
  p.push(S.lead(480, 100, 560, 60), lab(520, 50, 'Blue-black:'), lab(520, 63, 'starch'));
  p.push(S.lead(500, 150, 560, 180), lab(520, 176, 'Brown:'), lab(520, 189, 'no starch'));
  return svgDoc(620, 224, 'A variegated leaf with green parts and white parts. Before the test the green parts contain chlorophyll and the white margin and patches do not. After the starch test with iodine, only the parts that were green turn blue-black; the parts that were white stay pale brown, showing no starch where there was no chlorophyll', p.join(''));
})();

// ---------------------------------------------------------------- 7. oxygen from hydrilla
export const HYDRILLA = (() => {
  const p = [];
  p.push(S.path('M200 80 L200 280 L420 280 L420 80', { w: 1.6 }), S.rect(201, 110, 218, 169, { fill: 'var(--diagram-blue)', fop: 0.22, sw: 0 }));
  p.push(S.path('M240 270 L290 200 L330 200 L380 270', { w: 1.5 }), S.rect(296, 70, 20, 132, { fill: 'var(--diagram-fill)', fop: 0.4, sw: 1.4 }), S.rect(297, 71, 18, 40, { fill: 'var(--diagram-fill)', fop: 1, sw: 0 }));
  p.push(S.rect(296, 110, 20, 92, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 0 }));
  for (const [x, y, a] of [[300, 262, -0.6], [310, 262, 0], [322, 262, 0.6]]) {
    const x2 = x + Math.sin(a) * 50, y2 = y - 50;
    p.push(S.line(x, y, x2, y2, { c: 'var(--diagram-green)', w: 2.4 }));
    for (let k = 1; k < 6; k++) { const tx = x + (x2 - x) * k / 6, ty = y + (y2 - y) * k / 6; p.push(S.line(tx - 7, ty, tx + 7, ty - 4, { c: 'var(--diagram-green)', w: 1.6 })); }
  }
  for (const [x, y] of [[306, 190], [308, 170], [304, 150], [307, 128], [312, 180]]) p.push(S.circle(x, y, 2.6, { sw: 1 }));
  // lamp
  p.push(S.circle(80, 150, 22, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.3 }), S.rect(70, 172, 20, 18, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }));
  for (const dy of [-20, 0, 20]) p.push(S.arrow(110, 150 + dy, 190, 150 + dy * 1.3, { c: 'var(--diagram-yellow)', w: 1.6, size: 6 }));
  p.push(lab(48, 210, 'Lamp at a measured'), lab(48, 223, 'distance'));
  p.push(S.lead(316, 90, 440, 70), lab(444, 74, 'Test tube: oxygen collects'), lab(444, 87, 'at the top'));
  p.push(S.lead(310, 160, 440, 130), lab(444, 134, 'Bubbles of oxygen'));
  p.push(S.lead(368, 255, 440, 186), lab(444, 190, 'Inverted funnel'));
  p.push(S.lead(330, 230, 440, 230), lab(444, 234, 'Hydrilla in water with a'), lab(444, 247, 'little sodium bicarbonate'));
  return svgDoc(640, 292, 'Release of oxygen by hydrilla. Sprigs of hydrilla lie under an inverted funnel in a beaker of water containing a little sodium bicarbonate. A water-filled test tube over the funnel stem collects the bubbles of gas, which gather at the top. A lamp at a measured distance shines on the beaker; the gas rekindles a glowing splinter, showing that it is oxygen', p.join(''));
})();

// ---------------------------------------------------------------- 8. hydrilla bubble counts (imagined)
export const BUBBLES = (() => {
  const p = [];
  const x = (v) => 230 + v * 7;
  const rows = [...HYD.rows.map((r) => [`Lamp at ${r.cm} cm`, r.rate, 'var(--diagram-green)']), [`Lamp at ${HYD.bicarb.cm} cm, extra bicarbonate`, HYD.bicarb.rate, 'var(--diagram-blue)']];
  for (let v = 0; v <= 40; v += 10) p.push(S.line(x(v), 14, x(v), 196, { c: 'var(--diagram-muted)', w: 0.5 }), S.text(x(v), 212, String(v), { a: 'middle', size: 10 }));
  rows.forEach(([name, v, col], i) => {
    const y = 20 + i * 35;
    p.push(S.rect(x(0), y, x(v) - x(0), 24, { fill: col, fop: 0.35, sw: 1.1 }), S.text(224, y + 16, name, { a: 'end', size: 11 }), S.text(x(v) + 5, y + 16, String(v), { size: 10 }));
  });
  p.push(S.line(x(0), 14, x(0), 196, { w: 1.2 }), S.text(x(20), 230, 'Bubbles of oxygen per minute', { a: 'middle', size: 11 }));
  return svgDoc(540, 238, `Bar chart of imagined bubble counts per minute from hydrilla: ${rows.map(([n, v]) => `${n}, ${v}`).join('; ')}`, p.join(''));
})();

// ---------------------------------------------------------------- 9. the carbon cycle
export const CARBON = (() => {
  const p = [];
  const box = (x, y, w, h, t, col) => {
    p.push(S.rect(x, y, w, h, { rx: 8, fill: col, fop: 0.2, sw: 1.4 }));
    t.forEach((s, i) => p.push(S.text(x + w / 2, y + h / 2 + 4 + (i - (t.length - 1) / 2) * 13, s, { a: 'middle', size: 11, w: 'bold' })));
  };
  box(230, 14, 180, 44, ['Carbon dioxide in the air'], 'var(--diagram-blue)');
  box(30, 150, 140, 44, ['Green plants'], 'var(--diagram-green)');
  box(250, 240, 140, 44, ['Animals'], 'var(--diagram-yellow)');
  box(470, 150, 140, 44, ['Decomposers'], 'var(--diagram-brown)');
  box(470, 262, 140, 44, ['Fossil fuels', '(coal, oil, gas)'], 'var(--diagram-muted)');
  p.push(S.arrow(240, 50, 120, 148, { c: 'var(--diagram-green)', w: 2 }), lab(70, 92, 'Photosynthesis', { c: 'var(--diagram-green)', w: 'bold' }));
  p.push(S.arrow(150, 148, 262, 60, { w: 1.6 }), lab(196, 120, 'Respiration'));
  p.push(S.arrow(140, 196, 252, 248, { w: 1.6 }), lab(150, 240, 'Feeding'));
  p.push(S.arrow(320, 238, 320, 60, { w: 1.6 }), lab(326, 150, 'Respiration'));
  p.push(S.arrow(392, 252, 480, 196, { w: 1.6, dash: '5 3' }), S.arrow(172, 166, 468, 166, { w: 1.4, dash: '5 3' }), lab(200, 182, 'Death and waste', { size: 10 }));
  p.push(S.arrow(520, 148, 400, 58, { c: 'var(--diagram-brown)', w: 1.8 }), lab(470, 128, 'Decomposition', { a: 'end', c: 'var(--diagram-brown)' }));
  p.push(S.path('M610 284 L628 284 L628 26 L420 26', { c: 'var(--diagram-red)', w: 1.8 }), S.head(412, 26, Math.PI, { c: 'var(--diagram-red)', size: 8 }), lab(622, 120, 'Combustion', { a: 'end', c: 'var(--diagram-red)', w: 'bold' }));
  p.push(S.arrow(540, 196, 540, 260, { w: 1.2, dash: '2 3' }), lab(546, 240, 'millions of years', { size: 10, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 312, 'The carbon cycle. Green plants take carbon dioxide from the air by photosynthesis. Plants and animals return it by respiration; animals obtain carbon by feeding on plants. Dead bodies and wastes are broken down by decomposers, which release carbon dioxide. Over millions of years some dead matter forms fossil fuels, whose combustion returns carbon dioxide to the air', p.join(''));
})();
