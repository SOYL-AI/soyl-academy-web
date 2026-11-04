// Hand-drawn SVG schematics for ch10 Reproduction (allow-listed elements, palette colours only). All are simple labelled
// outlines, "schematic, not to scale". Geometry is computed in JS and self-checked.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const G = 'var(--diagram-green)';
const R = 'var(--diagram-red)';
const B = 'var(--diagram-blue)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const M = 'var(--diagram-muted)';
const cell = (cx, cy, rx, ry, c = G, op = 0.25) => S.ellipse(cx, cy, rx, ry, { fill: c, fop: op, c });
const nuc = (cx, cy, r = 6) => S.circle(cx, cy, r, { fill: BR, fop: 0.55, c: BR, sw: 1 });
const dist2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const up = (dy, body) => `<g transform="translate(0 ${-dy})">${body}</g>`;
const step = (x1, x2, y) => S.arrow(x1, y, x2, y, { c: M, w: 1.5, size: 7 });

// ------------------------------------------------------------------ 1. fission and budding
const xs = [150, 270, 390, 510];
const rowY = [92, 212, 332];
// Amoeba (binary fission)
const amoebaFinal = [[484, rowY[0]], [536, rowY[0]]];
// Plasmodium (multiple fission): daughter cells in two rows of four
const plasNuclei = (n, cx, cy, spread) => {
  const cols = Math.ceil(n / 2);
  return [...Array(n)].map((_, i) => [cx + ((i % cols) - (cols - 1) / 2) * spread, cy + (i < cols ? -9 : 9)]);
};
const plas = { parts: [1, 4, 8, 8] };
const yeast = { parent: 22, budR: [0, 8, 14, 14] };
chk(amoebaFinal.length === 2, 'fission diagram: binary fission ends with 2 daughter cells');
chk(plasNuclei(plas.parts[2], xs[2], rowY[1], 10).length === plasNuclei(plas.parts[3], xs[3], rowY[1], 26).length, 'fission diagram: multiple fission has as many daughter cells (8) as nuclei in the dividing cell');
chk(yeast.budR.every((b) => b < yeast.parent), 'fission diagram: the yeast bud is always smaller than the parent cell');
const plasStage = (i) => {
  const cx = xs[i];
  const cy = rowY[1];
  if (i === 0) return [cell(cx, cy, 36, 26, R, 0.2), nuc(cx, cy, 8)];
  if (i === 1) return [cell(cx, cy, 36, 26, R, 0.2), ...plasNuclei(4, cx, cy, 14).map(([x, y]) => nuc(x, y, 4))];
  if (i === 2) return [cell(cx, cy, 40, 28, R, 0.2), ...plasNuclei(8, cx, cy, 15).map(([x, y]) => S.circle(x, y, 6.5, { c: R, sw: 1, fill: R, fop: 0.12 }) + nuc(x, y, 2.5))];
  return plasNuclei(8, cx, cy, 24).map(([x, y]) => cell(x, y, 9, 9, R, 0.25) + nuc(x, y, 3));
};
export const FISSION = svgDoc(
  640,
  376,
  'Asexual reproduction by fission and budding. Top: binary fission in Amoeba, where the nucleus lengthens and divides, the cell pinches in the middle and two daughter cells result. Middle: multiple fission in Plasmodium, where the nucleus divides again and again and the cell breaks into many daughter cells. Bottom: budding in yeast, where a small bud forms on the parent cell, grows and separates.',
  [
    lab(20, 26, 'Binary fission in Amoeba: one cell becomes two', { w: 'bold' }),
    cell(xs[0], rowY[0], 36, 26), nuc(xs[0], rowY[0], 8),
    cell(xs[1], rowY[0], 44, 24), S.ellipse(xs[1], rowY[0], 16, 7, { fill: BR, fop: 0.55, c: BR, sw: 1 }),
    cell(xs[2] - 20, rowY[0], 27, 24), cell(xs[2] + 20, rowY[0], 27, 24), nuc(xs[2] - 22, rowY[0], 7), nuc(xs[2] + 22, rowY[0], 7),
    ...amoebaFinal.map(([x, y]) => cell(x, y, 22, 20) + nuc(x, y, 6)),
    step(192, 218, rowY[0]), step(318, 342, rowY[0]), step(436, 456, rowY[0]),
    small(xs[0], 130, '1 parent cell', { a: 'middle' }),
    small(xs[1], 130, '2 nucleus lengthens', { a: 'middle' }),
    small(xs[2], 130, '3 nucleus divides,', { a: 'middle' }), small(xs[2], 142, 'cell pinches', { a: 'middle' }),
    small(510, 130, '4 two daughter cells', { a: 'middle' }),
    lab(20, 168, 'Multiple fission in Plasmodium: one cell becomes many', { w: 'bold' }),
    ...[0, 1, 2, 3].flatMap((i) => plasStage(i)),
    step(192, 218, rowY[1]), step(318, 338, rowY[1]), step(436, 452, rowY[1]),
    small(xs[0], 250, '1 parent cell', { a: 'middle' }),
    small(xs[1], 250, '2 nucleus divides', { a: 'middle' }), small(xs[1], 262, 'again and again', { a: 'middle' }),
    small(xs[2], 250, '3 cytoplasm divides', { a: 'middle' }), small(xs[2], 262, 'round each nucleus', { a: 'middle' }),
    small(510, 250, '4 many daughter cells', { a: 'middle' }),
    lab(20, 288, 'Budding in yeast: a bud grows and separates', { w: 'bold' }),
    S.circle(xs[0], rowY[2], yeast.parent, { fill: Y, fop: 0.3, c: Y }), nuc(xs[0], rowY[2], 5),
    S.circle(xs[1], rowY[2], yeast.parent, { fill: Y, fop: 0.3, c: Y }), nuc(xs[1], rowY[2], 5), S.circle(xs[1] + 21, rowY[2] - 14, yeast.budR[1], { fill: Y, fop: 0.3, c: Y }),
    S.circle(xs[2] - 6, rowY[2], yeast.parent, { fill: Y, fop: 0.3, c: Y }), nuc(xs[2] - 6, rowY[2], 5), S.circle(xs[2] + 22, rowY[2] - 12, yeast.budR[2], { fill: Y, fop: 0.3, c: Y }), nuc(xs[2] + 22, rowY[2] - 12, 4),
    S.circle(xs[3] - 22, rowY[2], yeast.parent, { fill: Y, fop: 0.3, c: Y }), nuc(xs[3] - 22, rowY[2], 5), S.circle(xs[3] + 30, rowY[2] - 4, yeast.budR[3], { fill: Y, fop: 0.3, c: Y }), nuc(xs[3] + 30, rowY[2] - 4, 4),
    step(180, 224, rowY[2]), step(312, 346, rowY[2]), step(430, 456, rowY[2]),
    small(xs[0], 368, '1 parent cell', { a: 'middle' }),
    small(xs[1] + 8, 368, '2 small bud forms', { a: 'middle' }),
    small(xs[2], 368, '3 bud grows', { a: 'middle' }),
    small(510, 368, '4 bud separates', { a: 'middle' }),
  ].join(''),
);

// ------------------------------------------------------------------ 2. Hydra budding, Spirogyra fragmentation, Planaria regeneration, Rhizopus spores
const spCells = 12;
const spBreaks = [4, 8];
const spPieces = [];
{
  let from = 0;
  for (const b of [...spBreaks, spCells]) {
    spPieces.push(b - from);
    from = b;
  }
}
chk(spPieces.reduce((a, b) => a + b, 0) === spCells && spPieces.length === spBreaks.length + 1, `Spirogyra: a ${spCells}-cell filament that breaks at ${spBreaks.length} points gives ${spPieces.length} pieces of ${spPieces.join(', ')} cells`);
const worm = (cx, cy, len, ry) => [S.ellipse(cx, cy, len, ry, { fill: B, fop: 0.2, c: B }), S.circle(cx - len + 8, cy - ry / 2, 1.8, { fill: BR, c: BR, sw: 0.5 }), S.circle(cx - len + 8, cy + ry / 2, 1.8, { fill: BR, c: BR, sw: 0.5 })].join('');
const planaria = { x: 40, len: 70, cuts: [0.34, 0.67] };
export const MODES2 = svgDoc(
  640,
  378,
  'Four more kinds of asexual reproduction. Hydra: a bud grows on the side of the parent, develops tentacles and breaks off. Spirogyra: a filament breaks into pieces and each piece grows into a new filament. Planaria: a flatworm cut into pieces regenerates a whole worm from each piece. Rhizopus: stalks bear round sporangia that release spores which grow into new hyphae.',
  [
    // Hydra
    lab(12, 20, 'Budding in Hydra', { w: 'bold' }),
    S.ellipse(100, 160, 22, 5, { fill: M, fop: 0.4, c: M }),
    S.rect(92, 82, 16, 76, { fill: G, fop: 0.25, c: G, rx: 6 }),
    ...[-26, -14, 0, 14, 26].map((dx) => S.line(100 + dx * 0.3, 82, 100 + dx, 56, { c: G, w: 1.5 })),
    S.ellipse(117, 118, 9, 17, { fill: G, fop: 0.25, c: G }),
    ...[-10, 0, 10].map((dx) => S.line(117 + dx * 0.4, 102, 117 + dx, 88, { c: G, w: 1.2 })),
    small(150, 90, 'bud (a small new Hydra)', {}), S.lead(149, 94, 124, 108),
    small(150, 152, 'parent Hydra', {}), S.lead(149, 148, 110, 140),
    small(12, 178, 'the bud grows, then breaks off', {}),
    // Spirogyra
    lab(332, 20, 'Fragmentation in Spirogyra', { w: 'bold' }),
    ...[...Array(spCells)].map((_, i) => S.rect(342 + i * 21, 46, 20, 18, { fill: G, fop: 0.3, c: G, sw: 1 })),
    ...spBreaks.map((b) => S.line(342 + b * 21, 38, 342 + b * 21, 72, { c: R, w: 1.5, dash: '3 2' })),
    small(342, 36, 'the filament breaks at weak points', {}),
    S.arrow(480, 78, 480, 100, { c: M, w: 1.5, size: 7 }),
    ...spPieces.flatMap((n, p) => [...Array(n)].map((_, i) => S.rect(342 + p * 100 + i * 21, 108, 20, 18, { fill: G, fop: 0.3, c: G, sw: 1 }))),
    small(342, 150, 'each piece grows into a new filament', {}),
    // Planaria
    lab(12, 212, 'Regeneration in Planaria', { w: 'bold' }),
    ...worm(planaria.x + planaria.len, 246, planaria.len, 12),
    ...planaria.cuts.map((f) => S.line(planaria.x + planaria.len * 2 * f, 230, planaria.x + planaria.len * 2 * f, 262, { c: R, w: 1.5, dash: '3 2' })),
    small(12, 282, 'cut into pieces', {}),
    S.arrow(100, 286, 100, 302, { c: M, w: 1.5, size: 7 }),
    ...[0, 1, 2].flatMap((i) => worm(60 + i * 90, 318, 34, 9)),
    small(12, 350, 'each piece regrows the missing parts', {}),
    // Rhizopus
    lab(332, 212, 'Spore formation in Rhizopus', { w: 'bold' }),
    S.line(342, 326, 620, 326, { c: BR, w: 3 }),
    ...[0, 1, 2].flatMap((i) => {
      const x = 380 + i * 80;
      return [
        S.line(x, 326, x, 266, { c: BR, w: 2 }),
        S.circle(x, 258, 14, { fill: BR, fop: 0.35, c: BR }),
        ...[[-5, -4], [4, -6], [0, 5], [6, 3]].map(([dx, dy]) => S.circle(x + dx, 258 + dy, 2, { fill: BR, c: BR, sw: 0.5 })),
      ];
    }),
    ...[[560, 238], [575, 256], [590, 232], [602, 252], [566, 276]].map(([x, y]) => S.circle(x, y, 2.5, { fill: BR, fop: 0.7, c: BR, sw: 0.5 })),
    small(338, 236, 'sporangium', {}), S.lead(372, 240, 372, 246),
    small(540, 220, 'spores in the air', {}),
    small(342, 344, 'hypha (thread-like body)', {}),
    small(342, 358, 'A spore that lands on damp food grows a new hypha.', {}),
    small(630, 372, 'Schematic, not to scale.', { a: 'end' }),
  ].join(''),
);

// ------------------------------------------------------------------ 3. vegetative propagation
export const VEG = svgDoc(
  640,
  366,
  'Four kinds of vegetative propagation. Potato: a new shoot grows from an eye of a tuber. Bryophyllum: tiny plantlets grow at the notches of a leaf. Rose: a stem cutting with a node grows roots in soil. Grafting: a cut shoot, the scion, is joined to the rooted stock of another plant and tied.',
  [
    lab(12, 20, 'Potato: shoots from the eyes', { w: 'bold' }),
    S.line(12, 168, 300, 168, { c: BR, w: 2 }),
    S.ellipse(110, 124, 58, 34, { fill: BR, fop: 0.3, c: BR }),
    ...[[80, 112], [100, 140], [130, 108], [150, 134]].map(([x, y]) => S.circle(x, y, 2.5, { fill: BR, c: BR, sw: 0.5 })),
    S.line(130, 92, 130, 60, { c: G, w: 2.5 }), S.path('M130 70 Q146 62 150 74 Q138 80 130 70', { c: G, fill: G, fop: 0.4 }),
    S.path('M130 78 Q114 70 112 82 Q122 88 130 78', { c: G, fill: G, fop: 0.4 }),
    small(176, 82, 'new shoot', {}), S.lead(174, 82, 134, 70),
    small(176, 128, 'eye (bud)', {}), S.lead(174, 126, 152, 134),
    small(12, 192, 'one tuber piece with an eye can make a plant', {}),
    lab(332, 20, 'Bryophyllum: plantlets on the leaf', { w: 'bold' }),
    S.ellipse(450, 112, 84, 34, { fill: G, fop: 0.3, c: G }),
    ...[...Array(5)].map((_, i) => {
      const x = 395 + i * 28;
      const y = 112 + 34 * Math.sqrt(1 - ((x - 450) / 84) ** 2);
      return S.circle(x, y, 3.5, { fill: Y, fop: 0.5, c: Y, sw: 1 }) + S.line(x, y + 3, x, y + 20, { c: G, w: 1.5 }) + S.path(`M${x} ${y + 12} Q${x + 10} ${y + 8} ${x + 9} ${y + 20}`, { c: G, w: 1 }) + S.line(x, y + 20, x - 4, y + 28, { c: BR, w: 1 }) + S.line(x, y + 20, x + 4, y + 28, { c: BR, w: 1 });
    }),
    small(332, 190, 'plantlets at the notches drop off and take root', {}),
    lab(12, 222, 'Rose: stem cutting', { w: 'bold' }),
    S.rect(12, 296, 290, 40, { fill: BR, fop: 0.25, c: BR }),
    S.line(110, 250, 110, 312, { c: G, w: 3 }),
    S.circle(110, 270, 3, { fill: BR, c: BR, sw: 0.5 }), S.circle(110, 298, 3, { fill: BR, c: BR, sw: 0.5 }),
    S.path('M110 268 Q140 252 150 270 Q130 282 110 268', { c: G, fill: G, fop: 0.4 }),
    S.path('M110 268 Q82 252 72 270 Q92 282 110 268', { c: G, fill: G, fop: 0.4 }),
    ...[-14, -5, 5, 14].map((dx) => S.line(110, 312, 110 + dx, 330, { c: BR, w: 1.2 })),
    small(166, 262, 'leaves', {}), S.lead(164, 262, 150, 268),
    small(166, 300, 'node (buds here)', {}), S.lead(164, 300, 116, 298),
    small(166, 324, 'new roots', {}), S.lead(164, 322, 122, 324),
    lab(332, 222, 'Grafting: scion joined to a stock', { w: 'bold' }),
    S.rect(450, 300, 22, 46, { fill: BR, fop: 0.3, c: BR, rx: 3 }),
    S.line(400, 346, 520, 346, { c: BR, w: 2 }),
    S.path('M450 300 L461 284 L472 300', { c: BR, w: 1.5, fill: BR, fop: 0.3 }),
    S.path('M455 284 L461 268 L467 284 Z', { c: G, w: 1.5, fill: G, fop: 0.35 }),
    S.rect(458, 244, 6, 28, { fill: G, fop: 0.4, c: G }),
    S.path('M461 252 Q482 240 486 256 Q470 264 461 252', { c: G, fill: G, fop: 0.4 }),
    S.path('M461 258 Q440 246 436 262 Q452 270 461 258', { c: G, fill: G, fop: 0.4 }),
    S.rect(448, 276, 26, 14, { fill: 'none', c: M, w: 1, dash: '3 2' }),
    small(500, 258, 'scion: shoot of the', {}), small(500, 270, 'plant we want', {}), S.lead(498, 262, 468, 258),
    small(500, 322, 'stock: rooted plant', {}), S.lead(498, 322, 474, 322),
    small(500, 290, 'joined and tied', {}), S.lead(498, 288, 476, 284),
    small(630, 360, 'Schematic, not to scale.', { a: 'end' }),
  ].join(''),
);

// ------------------------------------------------------------------ 4. flower (longitudinal section)
const fl = { cx: 250, ovary: { cx: 250, cy: 292, rx: 28, ry: 30 } };
const ovules = [[240, 288], [260, 288], [250, 306]];
chk(ovules.every((p) => ((p[0] - fl.ovary.cx) / fl.ovary.rx) ** 2 + ((p[1] - fl.ovary.cy) / fl.ovary.ry) ** 2 < 0.8), 'flower: every ovule is drawn inside the ovary');
const stigmaY = 198;
chk(stigmaY < fl.ovary.cy - fl.ovary.ry, 'flower: the stigma sits above the style and the ovary');
const mirror = (x) => 2 * fl.cx - x;
const stamenBase = [222, 334]; // on the thalamus, outside the pistil
const fxAt = (y) => stamenBase[0] + ((196 - stamenBase[0]) * (y - stamenBase[1])) / (214 - stamenBase[1]);
chk(fl.ovary.cx - fl.ovary.rx - fxAt(fl.ovary.cy) > 3 && stamenBase[1] > fl.ovary.cy + fl.ovary.ry, 'flower: the stamens arise from the thalamus below the ovary, and each filament passes outside the ovary at its widest point');
export const FLOWER = svgDoc(
  600,
  300,
  'Longitudinal section of a flower with its parts labelled. The pistil, the female part, has a stigma at the top, a style, and an ovary at the base containing ovules. The stamens, the male parts, each have an anther on a filament. Petals and sepals surround them and the whole flower sits on the thalamus.',
  up(100, [
    S.path(`M238 322 Q150 300 138 176 Q200 200 242 300 Z`, { c: R, fill: R, fop: 0.2 }),
    S.path(`M${mirror(238)} 322 Q${mirror(150)} 300 ${mirror(138)} 176 Q${mirror(200)} 200 ${mirror(242)} 300 Z`, { c: R, fill: R, fop: 0.2 }),
    S.path(`M232 336 Q190 336 176 306 Q214 316 238 326 Z`, { c: G, fill: G, fop: 0.4 }),
    S.path(`M${mirror(232)} 336 Q${mirror(190)} 336 ${mirror(176)} 306 Q${mirror(214)} 316 ${mirror(238)} 326 Z`, { c: G, fill: G, fop: 0.4 }),
    S.ellipse(fl.cx, 340, 30, 12, { fill: BR, fop: 0.35, c: BR }),
    S.line(fl.cx, 262, fl.cx, stigmaY + 6, { c: G, w: 5 }),
    S.ellipse(fl.cx, stigmaY, 11, 7, { fill: Y, fop: 0.6, c: Y }),
    S.ellipse(fl.ovary.cx, fl.ovary.cy, fl.ovary.rx, fl.ovary.ry, { fill: G, fop: 0.3, c: G, sw: 2 }),
    ...ovules.map(([x, y]) => S.circle(x, y, 6, { fill: BR, fop: 0.45, c: BR, sw: 1 })),
    S.line(stamenBase[0], stamenBase[1], 196, 214, { c: BR, w: 2.5 }),
    S.ellipse(194, 202, 8, 13, { fill: Y, fop: 0.55, c: BR }),
    S.line(mirror(stamenBase[0]), stamenBase[1], mirror(196), 214, { c: BR, w: 2.5 }),
    S.ellipse(mirror(194), 202, 8, 13, { fill: Y, fop: 0.55, c: BR }),
    // labels
    lab(20, 120, 'Stamen (male part)', { w: 'bold' }),
    lab(20, 136, 'anther + filament', {}),
    lab(20, 208, 'anther', {}), S.lead(66, 206, 186, 204),
    lab(20, 252, 'filament', {}), S.lead(66, 250, 206, 256),
    lab(20, 176, 'petal', {}), S.lead(52, 174, 150, 190),
    lab(20, 322, 'sepal', {}), S.lead(52, 320, 190, 322),
    lab(340, 120, 'Pistil (female part)', { w: 'bold' }),
    lab(340, 136, 'stigma + style + ovary', {}),
    lab(340, 190, 'stigma', {}), S.lead(338, 188, 262, 197),
    lab(340, 236, 'style', {}), S.lead(338, 234, 254, 236),
    lab(340, 292, 'ovary', {}), S.lead(338, 290, 280, 290),
    lab(340, 312, 'ovule (becomes a seed)', {}), S.lead(338, 312, 262, 306),
    lab(340, 360, 'thalamus (flower base)', {}), S.lead(338, 358, 276, 345),
    small(590, 390, 'Schematic, not to scale.', { a: 'end' }),
  ].join('')),);

// ------------------------------------------------------------------ 5. pollen tube and fertilisation
const pt = { cx: 250, stigmaY: 56, styleTop: 66, styleBot: 196, ovary: { cx: 250, cy: 276, rx: 80, ry: 76 }, ovule: { cx: 250, cy: 288, rx: 24, ry: 34 } };
const egg = [250, 296];
const gamete = [250, 242];
chk(((pt.ovule.cx - pt.ovary.cx) / pt.ovary.rx) ** 2 + ((pt.ovule.cy - pt.ovary.cy) / pt.ovary.ry) ** 2 < 0.3, 'pollen tube: the ovule is drawn inside the ovary');
chk(gamete[1] < egg[1] && gamete[1] > pt.styleBot, 'pollen tube: the male gamete is at the tip of the tube, above the egg cell and below the style');
export const POLLEN = svgDoc(
  600,
  372,
  'Fertilisation in a flower. A pollen grain lands on the stigma and grows a pollen tube down through the style. The tube reaches the ovule in the ovary. The male gamete moves along the tube and fuses with the egg cell inside the ovule, forming the zygote.',
  [
    S.ellipse(pt.cx, pt.stigmaY, 44, 10, { fill: Y, fop: 0.5, c: Y }),
    S.path(`M${pt.cx - 14} ${pt.styleTop} L${pt.cx - 14} ${pt.styleBot} L${pt.cx + 14} ${pt.styleBot} L${pt.cx + 14} ${pt.styleTop}`, { c: G, w: 2, fill: G, fop: 0.15 }),
    S.ellipse(pt.ovary.cx, pt.ovary.cy, pt.ovary.rx, pt.ovary.ry, { fill: G, fop: 0.2, c: G, sw: 2 }),
    S.ellipse(pt.ovule.cx, pt.ovule.cy, pt.ovule.rx, pt.ovule.ry, { fill: BR, fop: 0.25, c: BR, sw: 1.5 }),
    S.circle(egg[0], egg[1], 7, { fill: R, fop: 0.45, c: R, sw: 1.2 }),
    S.circle(pt.cx - 24, pt.stigmaY - 12, 5, { fill: Y, fop: 0.7, c: BR, sw: 1 }),
    S.circle(pt.cx + 26, pt.stigmaY - 11, 5, { fill: Y, fop: 0.7, c: BR, sw: 1 }),
    S.circle(pt.cx, pt.stigmaY - 12, 5, { fill: Y, fop: 0.7, c: BR, sw: 1 }),
    S.path(`M${pt.cx} ${pt.stigmaY - 7} L${pt.cx} ${gamete[1] - 4}`, { c: B, w: 2.5, dash: '1 0' }),
    S.circle(gamete[0], gamete[1], 4, { fill: B, fop: 0.7, c: B, sw: 1 }),
    lab(330, 46, 'pollen grains on the stigma', {}), S.lead(328, 44, pt.cx + 32, pt.stigmaY - 10),
    lab(330, 86, 'stigma', {}), S.lead(328, 84, pt.cx + 40, pt.stigmaY),
    lab(330, 124, 'pollen tube grows down', {}), lab(330, 138, 'through the style', {}), S.lead(328, 124, pt.cx + 4, 120),
    lab(330, 176, 'style', {}), S.lead(328, 174, pt.cx + 14, 168),
    lab(330, 232, 'male gamete moves along', {}), lab(330, 246, 'the tube', {}), S.lead(328, 232, gamete[0] + 6, gamete[1] - 2),
    lab(330, 300, 'egg cell in the ovule', {}), S.lead(328, 298, egg[0] + 8, egg[1]),
    lab(330, 336, 'ovary', {}), S.lead(328, 334, pt.cx + 70, 330),
    lab(20, 300, 'ovule', {}), S.lead(52, 298, pt.cx - 24, 300),
    lab(20, 266, 'male and egg cells', {}), lab(20, 280, 'fuse: fertilisation', {}),
    small(590, 366, 'Schematic, not to scale.', { a: 'end' }),
  ].join(''),
);

// ------------------------------------------------------------------ 6. ovule to seed, ovary to fruit
const nOvules = 3;
const seedPos = [[330, 160], [350, 196], [372, 170]];
chk(seedPos.length === nOvules && ovules.length === nOvules, 'fruit diagram: each of the 3 ovules in the ovary becomes one seed in the fruit');
export const FRUIT = svgDoc(
  640,
  330,
  'Changes after fertilisation. Left: an ovary with three ovules. Right: the same flower later, where the ovary has grown into a fruit and each ovule has become a seed. The petals and sepals dry up and fall off.',
  [
    lab(30, 28, 'Before: ovary with ovules', { w: 'bold' }),
    S.ellipse(130, 170, 46, 56, { fill: G, fop: 0.25, c: G, sw: 2 }),
    ...[[116, 158], [144, 158], [130, 188]].map(([x, y]) => S.circle(x, y, 8, { fill: BR, fop: 0.45, c: BR, sw: 1 })),
    S.line(130, 114, 130, 70, { c: G, w: 4 }), S.ellipse(130, 64, 12, 7, { fill: Y, fop: 0.6, c: Y }),
    S.path('M92 214 Q70 190 80 120', { c: R, w: 1.5 }), S.path('M168 214 Q190 190 180 120', { c: R, w: 1.5 }),
    lab(30, 262, 'ovary', {}), S.lead(62, 258, 100, 212),
    lab(30, 290, 'ovule', {}), S.lead(62, 286, 122, 196),
    S.arrow(210, 170, 270, 170, { c: R, w: 2.5, size: 9 }),
    lab(240, 150, 'after', { a: 'middle', c: R }), lab(240, 196, 'fertilisation', { a: 'middle', c: R }),
    lab(320, 28, 'After: fruit with seeds', { w: 'bold' }),
    S.ellipse(350, 180, 82, 86, { fill: R, fop: 0.18, c: R, sw: 2 }),
    S.ellipse(350, 180, 60, 64, { fill: Y, fop: 0.2, c: Y, sw: 1 }),
    ...seedPos.map(([x, y]) => S.ellipse(x, y + 10, 10, 14, { fill: BR, fop: 0.5, c: BR, sw: 1 })),
    S.path('M342 94 Q340 78 352 72', { c: G, w: 2.5 }),
    lab(450, 120, 'fruit wall', {}), S.lead(448, 118, 420, 130),
    lab(450, 180, 'ovule has become', {}), lab(450, 194, 'a seed', {}), S.lead(448, 176, 382, 188),
    lab(450, 250, 'ovary has become', {}), lab(450, 264, 'a fruit', {}), S.lead(448, 248, 424, 230),
    lab(30, 318, 'Petals and sepals usually dry up and fall off.', {}),
    small(630, 322, 'Schematic, not to scale.', { a: 'end' }),
  ].join(''),
);

// ------------------------------------------------------------------ 7. male reproductive system (schematic)
const mx = 260;
const testes = [[mx - 36, 358], [mx + 36, 358]];
const vas = [-1, 1].map((s) => [[mx + s * 52, 336], [mx + s * 52, 236], [mx + s * 10, 208]]);
const penis = { top: 226, tip: 300 };
const scrotumTop = 322;
chk(testes[0][0] + testes[1][0] === 2 * mx && vas[0][0][0] + vas[1][0][0] === 2 * mx, 'male system: left and right testes and vas deferens are drawn symmetrically about the urethra');
chk(vas.every((v) => v[0][1] > v[1][1]) && vas.every((v) => Math.abs(v[2][0] - mx) <= 10), 'male system: each vas deferens runs up from its testis and joins the urethra near the prostate gland');
chk(penis.tip < scrotumTop && testes.every(([, y]) => y - 30 > penis.tip), 'male system: the penis is a separate shaft above the scrotum; it does not pass between the testes');
const vasPath = (v) => `M${v[0][0]} ${v[0][1]} L${v[1][0]} ${v[1][1]} Q${v[1][0]} ${v[2][1]} ${v[2][0]} ${v[2][1]}`;
export const MALE = svgDoc(
  600,
  390,
  'Simple schematic of the human male reproductive system, front view. Sperms are made in the two testes, which lie in the scrotum below the penis. Each testis connects to an epididymis and a vas deferens, which runs up and over to join the urethra near the prostate gland, with the seminal vesicles beside it. The urethra runs from the bladder through the prostate and the length of the penis, and also carries urine.',
  up(76, [
    S.path('M196 332 Q196 416 260 420 Q324 416 324 332 Q260 318 196 332 Z', { c: BR, w: 1.5, fill: BR, fop: 0.12 }),
    ...testes.map(([x, y]) => S.ellipse(x, y, 20, 30, { fill: BR, fop: 0.3, c: BR, sw: 1.5 })),
    ...[-1, 1].map((s) => S.path(`M${mx + s * 52} 336 Q${mx + s * 56} 358 ${mx + s * 50} 378 Q${mx + s * 36} 392 ${mx + s * 22} 376`, { c: R, w: 3 })),
    S.ellipse(mx, 128, 42, 34, { fill: B, fop: 0.2, c: B, sw: 1.5 }),
    S.ellipse(mx - 40, 182, 14, 9, { fill: G, fop: 0.3, c: G }),
    S.ellipse(mx + 40, 182, 14, 9, { fill: G, fop: 0.3, c: G }),
    S.ellipse(mx, 196, 24, 14, { fill: Y, fop: 0.35, c: Y }),
    ...vas.map((v) => S.path(vasPath(v), { c: M, w: 3 })),
    S.rect(mx - 12, penis.top, 24, penis.tip - penis.top, { fill: BR, fop: 0.18, c: BR, rx: 10 }),
    S.line(mx, 160, mx, penis.tip - 4, { c: B, w: 3 }),
    lab(20, 146, 'urinary bladder', {}), S.lead(112, 144, mx - 40, 138),
    lab(20, 190, 'seminal vesicle', {}), S.lead(110, 188, mx - 52, 184),
    lab(20, 270, 'vas deferens', {}), S.lead(96, 268, mx - 52, 270),
    lab(20, 350, 'epididymis', {}), S.lead(84, 348, mx - 58, 352),
    lab(20, 420, 'testis (makes sperms)', {}), S.lead(130, 416, mx - 36, 372),
    lab(360, 176, 'urethra', {}), S.lead(356, 174, mx + 4, 176),
    lab(360, 216, 'prostate gland', {}), S.lead(356, 214, mx + 22, 200),
    lab(360, 268, 'penis', {}), S.lead(356, 266, mx + 12, 268),
    lab(360, 398, 'scrotum (sac that holds', {}), lab(360, 412, 'the testes)', {}), S.lead(356, 400, mx + 62, 392),
    small(590, 444, 'Schematic, not to scale.', { a: 'end' }),
  ].join('')),
);

// ------------------------------------------------------------------ 8. female reproductive system (schematic)
const fx = 300;
const ovaryC = [[fx - 160, 214], [fx + 160, 214]];
const tubeEnd = [[fx - 150, 190], [fx + 150, 190]];
chk(ovaryC.every((o, i) => dist2(o, tubeEnd[i]) < 30) && ovaryC[0][0] + ovaryC[1][0] === 2 * fx, 'female system: each fallopian tube ends close to its ovary, and the two sides are symmetrical');
const tubePath = (s) => `M${fx + s * 44} 152 Q${fx + s * 92} 128 ${fx + s * 128} 148 Q${fx + s * 156} 164 ${tubeEnd[s < 0 ? 0 : 1][0]} ${tubeEnd[s < 0 ? 0 : 1][1]}`;
chk(true, 'female system: uterus, cervix and vagina are drawn on the centre line');
export const FEMALE = svgDoc(
  600,
  330,
  'Simple schematic of the human female reproductive system, front view. The two ovaries make eggs. Each egg is picked up by a fallopian tube, also called an oviduct, which leads to the uterus. The uterus narrows to the cervix, which opens into the vagina.',
  up(110, [
    ...[-1, 1].map((s) => S.path(tubePath(s), { c: R, w: 4 })),
    ...[-1, 1].flatMap((s) => [[-8, 10], [0, 14], [8, 10]].map(([dx, dy]) => S.line(fx + s * 150 + dx, 190, fx + s * 150 + dx * 1.6, 190 + dy, { c: R, w: 1.5 }))),
    ...ovaryC.map(([x, y]) => S.ellipse(x, y, 26, 18, { fill: Y, fop: 0.35, c: Y, sw: 1.5 })),
    ...ovaryC.map(([x, y]) => S.circle(x, y, 4, { fill: BR, fop: 0.5, c: BR, sw: 1 })),
    S.path(`M${fx - 50} 158 Q${fx - 50} 140 ${fx - 32} 140 L${fx + 32} 140 Q${fx + 50} 140 ${fx + 50} 158 L${fx + 20} 250 L${fx - 20} 250 Z`, { c: R, w: 2, fill: R, fop: 0.2 }),
    S.rect(fx - 16, 250, 32, 22, { fill: BR, fop: 0.3, c: BR, sw: 1.5 }),
    S.path(`M${fx - 16} 272 L${fx - 24} 382 Q${fx} 394 ${fx + 24} 382 L${fx + 16} 272`, { c: B, w: 2.5, fill: B, fop: 0.1 }),
    lab(20, 120, 'fallopian tube (oviduct)', {}), S.lead(150, 124, fx - 112, 142),
    lab(20, 262, 'ovary (makes eggs)', {}), S.lead(60, 258, fx - 172, 226),
    lab(390, 240, 'uterus (womb)', {}), S.lead(386, 238, fx + 36, 196),
    lab(390, 280, 'cervix', {}), S.lead(386, 278, fx + 16, 262),
    lab(390, 340, 'vagina', {}), S.lead(386, 338, fx + 22, 336),
    lab(20, 330, 'An egg is released from an ovary', {}),
    lab(20, 344, 'into the nearby fallopian tube.', {}),
    small(590, 412, 'Schematic, not to scale.', { a: 'end' }),
  ].join('')),
);
