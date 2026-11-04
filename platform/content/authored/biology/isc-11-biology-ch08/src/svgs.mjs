// SVG diagrams for ISC 11 Biology ch08 Anatomy of Flowering Plants: meristems, simple tissues, xylem and phloem, T.S. of dicot and
// monocot root, T.S. of dicot stem (named and lettered A-E) and monocot stem, V.S. of dicot leaf (named and lettered A-E) and monocot leaf.
// Cells are drawn programmatically as rings and grids of circles.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const G = 'var(--diagram-green)';
const B = 'var(--diagram-brown)';
const Y = 'var(--diagram-yellow)';
const R = 'var(--diagram-red)';
const BL = 'var(--diagram-blue)';
const M = 'var(--diagram-muted)';
const title = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 11, w: 'bold' });
const note = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 10, c: M });
const P = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const dot = (x, y, cr, o = {}) => S.circle(x, y, cr, { c: o.c ?? M, sw: o.sw ?? 0.9, fill: o.fill ?? 'none', fop: o.fop });
/** A ring of n circles of radius cr on a circle of radius r. */
const ring = (cx, cy, r, n, cr, o = {}) => Array.from({ length: n }, (_, i) => dot(...P(cx, cy, r, (360 * i) / n + (o.off ?? 0)), cr, o)).join('');
/**
 * Labels with leader lines, spread so that they do not overlap. items: [text, anchorX, anchorY, letter]. dir 'r' puts the
 * labels in a column at x to the right of the figure, 'l' to the left. Lettered figures show the letter instead of the text.
 */
function sideLabels(items, x, dir, named = true, gap = 24, y0 = 22) {
  const sorted = [...items].sort((a, b) => a[2] - b[2]);
  let prev = y0 - gap;
  return sorted
    .map(([t, ax, ay, L]) => {
      const y = Math.max(ay + 4, prev + gap);
      prev = y;
      const lead = S.lead(dir === 'r' ? x - 4 : x + 4, y - 4, ax, ay);
      const txt = named ? S.text(x, y, t, { a: dir === 'r' ? 'start' : 'end', size: 11 }) : S.text(x, y + 2, L, { a: dir === 'r' ? 'start' : 'end', size: 15, w: 'bold' });
      return lead + txt;
    })
    .join('');
}

// 1. Meristems
export const MERISTEMS = svgDoc(
  500,
  330,
  'Positions of the three kinds of meristem. Apical meristem at the tip of the shoot and at the tip of the root adds length; intercalary meristem at the base of an internode, above a node, adds length in grasses; lateral meristem, the ring of cambium seen in a transverse section of a stem, adds girth',
  [
    S.line(40, 240, 250, 240, { c: B, w: 2, dash: '5 4' }), lab(46, 256, 'soil level', { size: 10, c: B }),
    S.line(120, 64, 120, 240, { c: G, w: 6 }),
    S.path('M112 66 C112 44 128 44 128 66 Z', { c: R, fill: R, fop: 0.5, w: 1.5 }),
    S.path('M120 210 C150 204 176 186 214 160', { c: G, w: 4 }), S.path('M120 126 C92 120 66 104 40 82', { c: G, w: 4 }),
    dot(120, 210, 5, { c: B, fill: B, fop: 0.5, sw: 1.2 }), dot(120, 126, 5, { c: B, fill: B, fop: 0.5, sw: 1.2 }),
    S.rect(113, 164, 14, 36, { c: R, fill: R, fop: 0.35, sw: 1.4 }),
    S.line(120, 240, 120, 308, { c: B, w: 4 }), S.line(120, 262, 92, 290, { c: B, w: 2 }), S.line(120, 270, 148, 296, { c: B, w: 2 }),
    S.path('M114 306 C114 320 126 320 126 306 Z', { c: R, fill: R, fop: 0.5, w: 1.5 }),
    S.lead(132, 54, 190, 36), lab(194, 38, 'Apical meristem (shoot tip)'),
    S.lead(128, 182, 190, 176), lab(194, 180, 'Intercalary meristem'), lab(194, 194, '(base of an internode)', { size: 10, c: M }),
    S.lead(128, 314, 190, 314), lab(194, 318, 'Apical meristem (root tip)'),
    dot(390, 140, 62, { c: B, fill: B, fop: 0.1, sw: 2 }), dot(390, 140, 38, { c: R, sw: 5 }), dot(390, 140, 18, { c: M, fill: G, fop: 0.2, sw: 1 }),
    S.lead(424, 98, 440, 66), lab(488, 62, 'Lateral meristem', { a: 'end' }), lab(488, 76, '(cambium ring)', { a: 'end', size: 10, c: M }),
    title(390, 224, 'T.S. of a stem'), note(390, 238, 'the ring of cambium adds girth'),
  ].join(''),
);

// 2. Simple tissues in transverse section
const hexPts = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => P(cx, cy, r, 60 * i + 30));
const hexPath = (cx, cy, r) => 'M' + hexPts(cx, cy, r).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z';
const grid = (cx, cy, d, rows, cols) => {
  const out = [];
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) out.push([cx + (j - (cols - 1) / 2) * d + (i % 2 ? d / 2 : 0) - d / 4, cy + (i - (rows - 1) / 2) * d * 0.87]);
  return out;
};
export const SIMPLE_TISSUES = svgDoc(
  540,
  210,
  'Three simple permanent tissues in transverse section. Parenchyma: rounded thin-walled living cells with small spaces between them. Collenchyma: living cells packed together with the walls thickened at the corners. Sclerenchyma: dead cells with very thick lignified walls and a narrow cavity',
  [
    ...grid(90, 80, 28, 4, 4).map(([x, y]) => dot(x, y, 12, { c: G, fill: G, fop: 0.15, sw: 1 }) + dot(x + 2, y, 2.5, { c: M, fill: M, sw: 0 })),
    ...grid(270, 80, 28, 4, 4).flatMap(([x, y]) => [S.path(hexPath(x, y, 15), { c: M, w: 1, fill: G, fop: 0.1 }), ...hexPts(x, y, 15).map(([a, b]) => dot(a, b, 2.6, { c: B, fill: B, sw: 0 }))]),
    ...grid(450, 80, 28, 4, 4).map(([x, y]) => dot(x, y, 12, { c: B, fill: B, fop: 0.15, sw: 3.6 }) + dot(x, y, 2.4, { c: M, sw: 0.8 })),
    title(90, 160, 'Parenchyma'), note(90, 176, 'thin wall; spaces between cells'), note(90, 190, 'living'),
    title(270, 160, 'Collenchyma'), note(270, 176, 'corners thickened (cellulose, pectin)'), note(270, 190, 'living'),
    title(450, 160, 'Sclerenchyma'), note(450, 176, 'thick lignified wall; narrow cavity'), note(450, 190, 'dead'),
  ].join(''),
);

// 3. Complex tissues: xylem and phloem elements in longitudinal view
const xTrach = (x) => S.path(`M${x} 30 L${x + 12} 44 L${x + 12} 120 L${x} 134 L${x - 12} 120 L${x - 12} 44 Z`, { c: BL, fill: BL, fop: 0.12, w: 1.4 }) + [56, 72, 88, 104].map((y) => S.line(x - 12, y, x - 7, y, { c: BL, w: 2 }) + S.line(x + 7, y, x + 12, y, { c: BL, w: 2 })).join('');
const xVessel = (x) => [0, 1, 2].map((i) => S.rect(x - 14, 30 + i * 36, 28, 34, { c: BL, fill: BL, fop: 0.12, sw: 1.4 }) + [0, 1, 2].map((k) => S.line(x - 14, 38 + i * 36 + k * 10, x + 14, 38 + i * 36 + k * 10, { c: BL, w: 2.4 })).join('') + (i < 2 ? S.line(x - 14, 64 + i * 36, x + 14, 64 + i * 36, { c: R, w: 1.4, dash: '3 2' }) : '')).join('');
const fibre = (x, c) => S.path(`M${x} 24 L${x + 7} 60 L${x + 7} 110 L${x} 140 L${x - 7} 110 L${x - 7} 60 Z`, { c, fill: c, fop: 0.3, w: 3 });
const parCell = (x, y, c) => S.rect(x - 14, y, 28, 30, { c: G, fill: G, fop: 0.15, sw: 1.3 }) + dot(x, y + 15, 4.5, { c, fill: c, fop: 0.5, sw: 0.8 });
const sieve = (x) => [0, 1, 2].map((i) => S.rect(x - 15, 30 + i * 36, 30, 34, { c: Y, fill: Y, fop: 0.18, sw: 1.4 })).join('') + [0, 1].map((i) => S.line(x - 15, 64 + i * 36, x + 15, 64 + i * 36, { c: R, w: 2.4, dash: '2 2' })).join('');
export const VASCULAR = svgDoc(
  560,
  230,
  'Elements of the complex tissues in longitudinal view. Xylem: a tracheid, a vessel made of cells joined end to end with perforations and thickened walls, a thick-walled fibre and xylem parenchyma; all except the parenchyma are dead. Phloem: a sieve tube of cells with sieve plates between them and no nucleus, a companion cell with a nucleus beside it, phloem parenchyma and a phloem fibre; all except the fibre are living',
  [
    S.text(125, 16, 'Xylem', { a: 'middle', size: 12, w: 'bold' }),
    xTrach(40), xVessel(100), fibre(155, BL), parCell(206, 50, BL), parCell(206, 84, BL),
    title(40, 156, 'Tracheid'), note(40, 170, 'dead'), title(100, 156, 'Vessel'), note(100, 170, 'dead; open ends'), title(155, 156, 'Fibre'), note(155, 170, 'dead'), title(206, 156, 'Parenchyma'), note(206, 170, 'living'),
    S.line(268, 20, 268, 200, { c: M, w: 1, dash: '3 4' }),
    S.text(425, 16, 'Phloem', { a: 'middle', size: 12, w: 'bold' }),
    sieve(320), S.rect(344, 30, 12, 108, { c: Y, fill: Y, fop: 0.3, sw: 1.4 }), dot(350, 80, 3.5, { c: B, fill: B, fop: 0.6, sw: 0.8 }),
    parCell(402, 50, Y), parCell(402, 84, Y), fibre(458, Y),
    title(320, 156, 'Sieve tube'), note(320, 170, 'living; no nucleus'), title(358, 190, 'Companion cell'), note(358, 204, 'living; nucleus'),
    title(402, 156, 'Parenchyma'), note(402, 170, 'living'), title(458, 156, 'Fibre'), note(458, 170, 'dead'),
    lab(300, 26, 'Sieve plates', { size: 10, c: R, a: 'end' }),
  ].join(''),
);

// 4. T.S. of roots (dicot: four xylem arms, no real pith; monocot: eight arms, large pith)
const RC = { x: 270, y: 165 };
function rootTS(arms, pithBig) {
  const { x: cx, y: cy } = RC;
  const out = [dot(cx, cy, 128, { c: M, fill: G, fop: 0.05, sw: 1 })];
  out.push(ring(cx, cy, 124, 44, 3.4, { c: B, fill: B, fop: 0.2 }));
  [-45, -15, 20, 55, 95, 135, 175, 215, 255, 295].forEach((a) => out.push(S.line(...P(cx, cy, 127, a), ...P(cx, cy, 141, a + 3), { c: M, w: 1 })));
  out.push(ring(cx, cy, 108, 36, 7, { fill: G, fop: 0.12 }), ring(cx, cy, 93, 32, 7, { fill: G, fop: 0.12, off: 5 }), ring(cx, cy, 78, 28, 7, { fill: G, fop: 0.12 }));
  out.push(ring(cx, cy, 62, 28, 4.4, { c: B, fill: G, fop: 0.35, sw: 1.8 }));
  out.push(ring(cx, cy, 54, 36, 3, { c: R, fill: R, fop: 0.25 }));
  const step = 360 / arms;
  for (let k = 0; k < arms; k++) {
    const a = -90 + k * step;
    [[44, 3], [34, 4.3], [24, 5.2], [14, 5.6]].forEach(([r0, cr]) => {
      if (pithBig && r0 < 24) return;
      out.push(dot(...P(cx, cy, r0, a), cr * (arms > 5 ? 0.85 : 1), { c: BL, fill: BL, fop: 0.3, sw: 1.1 }));
    });
    const ap = a + step / 2;
    [-1, 1].forEach((s) => out.push(dot(...P(cx, cy, 40, ap + s * (arms > 5 ? 5 : 9)), 3.8, { c: B, fill: Y, fop: 0.55, sw: 1 })));
    out.push(dot(...P(cx, cy, 33, ap), 3.8, { c: B, fill: Y, fop: 0.55, sw: 1 }));
    [14, 24].forEach((r0) => out.push(dot(...P(cx, cy, r0, ap), 3, { sw: 0.8 })));
  }
  if (pithBig) out.push(dot(cx, cy, 9, { fill: G, fop: 0.15, sw: 1 }), ring(cx, cy, 17, 7, 7, { fill: G, fop: 0.15 }));
  return out.join('');
}
const rootItems = (pithBig) => {
  const { x: cx, y: cy } = RC;
  const A = (r, a) => P(cx, cy, r, a);
  const right = [
    ['Root hair', ...A(141, -43)], ['Epiblema', ...A(124, -22)], ['Endodermis', ...A(62, 6)], ['Phloem', ...A(38, pithBig ? 22.5 : 45)], ['Metaxylem (inner)', ...A(pithBig ? 24 : 24, 45)],
  ];
  if (!pithBig) right[4] = ['Metaxylem (inner)', ...A(24, 0)];
  const left = [['Cortex', ...A(100, 205)], ['Pericycle', ...A(54, 232)], ['Protoxylem (outer)', ...A(44, pithBig ? -135 : 180)], [pithBig ? 'Pith (large)' : 'Conjunctive tissue', ...(pithBig ? A(0, 0) : A(22, 225))]];
  return { right, left };
};
const rootFig = (arms, pithBig, label, alt) => {
  const { right, left } = rootItems(pithBig);
  return svgDoc(540, 330, alt, [S.text(270, 16, label, { a: 'middle', size: 12, w: 'bold' }), rootTS(arms, pithBig), sideLabels(right, 424, 'r', true, 22, 40), sideLabels(left, 120, 'l', true, 24, 120)].join(''));
};
export const DICOT_ROOT = rootFig(4, false, 'Dicot root (T.S.)', 'Transverse section of a dicot root: a single outer layer, the epiblema, some cells of which bear root hairs; a wide cortex of parenchyma with spaces between the cells; the endodermis, a ring of barrel-shaped cells with Casparian strips; the pericycle just inside it; and the vascular cylinder in the centre with four xylem arms alternating with four patches of phloem, separated by conjunctive tissue, with the oldest xylem (protoxylem) towards the outside of each arm and a very small pith');
export const MONOCOT_ROOT = rootFig(8, true, 'Monocot root (T.S.)', 'Transverse section of a monocot root: epiblema with root hairs, a wide cortex, the endodermis with Casparian strips, the pericycle, and a vascular cylinder with eight xylem arms alternating with eight patches of phloem, the oldest xylem towards the outside of each arm, and a large well-developed pith in the centre');

// 5. T.S. of a dicot stem (named and lettered)
const SC = { x: 270, y: 168 };
const BUNDLES = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => 45 * k - 22.5);
function dicotStemTS() {
  const { x: cx, y: cy } = SC;
  const out = [];
  out.push(ring(cx, cy, 138, 64, 3.2, { c: M, fill: G, fop: 0.1 }), dot(cx, cy, 142, { c: B, sw: 1.4 }));
  out.push(ring(cx, cy, 127, 46, 5, { c: B, fill: B, fop: 0.18, sw: 2.2 }));
  out.push(ring(cx, cy, 113, 38, 7, { fill: G, fop: 0.12 }), ring(cx, cy, 98, 32, 7, { fill: G, fop: 0.12, off: 5 }));
  out.push(ring(cx, cy, 85, 34, 3.8, { c: B, fill: G, fop: 0.35, sw: 1.6 }));
  [0, 45, 90, 135, 180, 225, 270, 315].forEach((a) => [50, 62, 74].forEach((r0) => out.push(dot(...P(cx, cy, r0, a), 5.4, { fill: G, fop: 0.12 }))));
  BUNDLES.forEach((a) => {
    [-5.5, 0, 5.5].forEach((d) => out.push(dot(...P(cx, cy, 79, a + d), 3.2, { c: B, fill: B, fop: 0.5, sw: 1 })));
    [-4, 4].forEach((d) => out.push(dot(...P(cx, cy, 71, a + d * 1.2), 3.6, { c: B, fill: Y, fop: 0.55, sw: 1 })));
    out.push(dot(...P(cx, cy, 70, a), 3.6, { c: B, fill: Y, fop: 0.55, sw: 1 }));
    [-6, -2, 2, 6].forEach((d) => out.push(dot(...P(cx, cy, 63, a + d), 1.8, { c: R, fill: R, fop: 0.4, sw: 0.6 })));
    [-4.5, 4.5].forEach((d) => out.push(dot(...P(cx, cy, 55, a + d), 5.2, { c: BL, fill: BL, fop: 0.3, sw: 1.1 })));
    [-4, 4].forEach((d) => out.push(dot(...P(cx, cy, 44, a + d), 4.4, { c: BL, fill: BL, fop: 0.3, sw: 1.1 })));
    out.push(dot(...P(cx, cy, 34, a), 2.6, { c: BL, fill: BL, fop: 0.3, sw: 1 }));
  });
  out.push(dot(cx, cy, 9, { fill: G, fop: 0.12 }), ring(cx, cy, 20, 6, 9, { fill: G, fop: 0.12 }));
  return out.join('');
}
const dstemItems = () => {
  const { x: cx, y: cy } = SC;
  const A = (r, a) => P(cx, cy, r, a);
  return {
    right: [
      ['Epidermis', ...A(140, -50), 'A'], ['Hypodermis (collenchyma)', ...A(127, -30), 'B'], ['Cortex (parenchyma)', ...A(106, -10), 'C'], ['Endodermis (starch sheath)', ...A(85, 12), 'D'], ['Pericycle (sclerenchyma)', ...A(79, 22.5 + 0), 'E'],
    ],
    left: [
      ['Phloem', ...A(71, 157.5), 'F'], ['Cambium', ...A(63, 202.5), 'G'], ['Xylem', ...A(50, 247.5), 'H'], ['Medullary ray', ...A(62, 180), 'I'], ['Pith', ...A(0, 0), 'J'],
    ],
  };
};
export const DICOT_STEM = svgDoc(
  600,
  340,
  'Transverse section of a dicot stem: an outer epidermis; a hypodermis of collenchyma; a cortex of parenchyma; the endodermis, a starch sheath; the pericycle as patches of sclerenchyma over the bundles; eight conjoint, open vascular bundles in a ring, each with phloem on the outside, a strip of cambium and xylem on the inside with the protoxylem towards the pith; medullary rays of parenchyma between the bundles; and a large pith in the centre',
  [S.text(300, 16, 'Dicot stem (T.S.)', { a: 'middle', size: 12, w: 'bold' }), dicotStemTS(), sideLabels(dstemItems().right, 450, 'r', true, 26, 36), sideLabels(dstemItems().left, 118, 'l', true, 26, 120)].join('').replace(/<g[^>]*>/g, '').replace(/<\/g>/g, ''),
);
/** Lettered version: letters mark five structures. */
export const DSTEM_LETTERS = { A: 'hypodermis', B: 'endodermis', C: 'phloem', D: 'xylem', E: 'pith' };
export const DICOT_STEM_LETTERED = svgDoc(
  560,
  340,
  'Transverse section of a dicot stem with five structures marked by letters. A: the layer of thick-cornered living cells just below the epidermis. B: the ring of barrel-shaped cells that contains starch, at the inner edge of the cortex. C: the group of sieve tubes and companion cells on the outer side of a vascular bundle. D: the group of large dead vessels on the inner side of a vascular bundle. E: the large parenchymatous region at the centre',
  (() => {
    const { x: cx, y: cy } = SC;
    const A = (r, a) => P(cx, cy, r, a);
    const items = [['', ...A(127, -30), 'A'], ['', ...A(85, 12), 'B'], ['', ...A(71, -22.5), 'C'], ['', ...A(52, 22.5), 'D'], ['', ...A(0, 0), 'E']];
    return dicotStemTS() + sideLabels(items, 450, 'r', false, 34, 40);
  })(),
);

// 6. T.S. of a monocot stem
function monocotBundle(cx, cy, a, rr) {
  const out = [dot(cx, cy, rr, { c: B, fill: B, fop: 0.18, sw: 2 })];
  // xylem towards the centre of the stem (angle a + 180 is inward), phloem outward
  [-1, 1].forEach((s) => out.push(dot(cx + Math.cos(((a + 90 * s) * Math.PI) / 180) * 0.36 * rr - Math.cos((a * Math.PI) / 180) * 0.32 * rr, cy + Math.sin(((a + 90 * s) * Math.PI) / 180) * 0.36 * rr - Math.sin((a * Math.PI) / 180) * 0.32 * rr, 0.3 * rr, { c: BL, fill: BL, fop: 0.3, sw: 1.1 })));
  out.push(dot(...P(cx, cy, 0.5 * rr, a + 180), 0.2 * rr, { c: BL, fill: BL, fop: 0.3, sw: 1 }), dot(...P(cx, cy, 0.52 * rr, a + 180), 0.1 * rr, { c: M, sw: 0.7 }));
  [-1, 1].forEach((s) => out.push(dot(cx + Math.cos(((a + 90 * s) * Math.PI) / 180) * 0.34 * rr + Math.cos((a * Math.PI) / 180) * 0.36 * rr, cy + Math.sin(((a + 90 * s) * Math.PI) / 180) * 0.34 * rr + Math.sin((a * Math.PI) / 180) * 0.36 * rr, 0.22 * rr, { c: B, fill: Y, fop: 0.55, sw: 0.9 })));
  return out.join('');
}
const MC = { x: 270, y: 168 };
function monocotStemTS() {
  const { x: cx, y: cy } = MC;
  const out = [dot(cx, cy, 134, { c: M, fill: G, fop: 0.07, sw: 1 })];
  out.push(ring(cx, cy, 131, 60, 3.2, { c: M, fill: G, fop: 0.1 }));
  out.push(ring(cx, cy, 120, 46, 4.6, { c: B, fill: B, fop: 0.4, sw: 2.4 }));
  out.push(ring(cx, cy, 96, 22, 5.2, { fill: G, fop: 0.1 }), ring(cx, cy, 68, 16, 5.6, { fill: G, fop: 0.1, off: 11 }), ring(cx, cy, 37, 9, 6, { fill: G, fop: 0.1, off: 20 }), dot(cx, cy, 6, { fill: G, fop: 0.1 }));
  const rings = [[108, 16, 7.5, 0], [82, 12, 9.5, 15], [53, 8, 11, 22.5]];
  for (const [r0, n, rr, off] of rings) for (let i = 0; i < n; i++) { const a = (360 * i) / n + off; out.push(monocotBundle(...P(cx, cy, r0, a), a, rr)); }
  out.push(monocotBundle(cx, cy, 90, 12));
  return out.join('');
}
export const MONOCOT_STEM = svgDoc(
  600,
  340,
  'Transverse section of a monocot stem: an outer epidermis; a hypodermis of sclerenchyma; ground tissue of parenchyma with no separation into cortex, pith and medullary rays; and many vascular bundles scattered through the ground tissue, smaller and more crowded towards the periphery. Each bundle is conjoint and closed, with no cambium, has xylem on the inner side and phloem on the outer side, no phloem parenchyma, and is surrounded by a sclerenchymatous sheath',
  [
    S.text(300, 16, 'Monocot stem (T.S.)', { a: 'middle', size: 12, w: 'bold' }), monocotStemTS(),
    sideLabels([['Epidermis', ...P(MC.x, MC.y, 133, -48)], ['Hypodermis (sclerenchyma)', ...P(MC.x, MC.y, 120, -28)], ['Ground tissue (parenchyma)', ...P(MC.x, MC.y, 96, -8)], ['Vascular bundle (closed)', ...P(MC.x, MC.y, 82, 18)], ['Sclerenchymatous sheath', ...P(MC.x, MC.y, 91, 22.5 + 15)]], 450, 'r', true, 26, 36),
    sideLabels([['Phloem', ...P(MC.x, MC.y, 62, 202.5)], ['Xylem (vessels)', ...P(MC.x, MC.y, 44, 157.5)], ['Large central bundle', ...P(MC.x, MC.y, 0, 0)], ['Small bundles', ...P(MC.x, MC.y, 108, 180)]], 118, 'l', true, 26, 130),
  ].join(''),
);

// 7. V.S. of a dicot leaf (named and lettered) and of a monocot leaf
const LX = [130, 410];
function leafBand(y, h, n, o) {
  const w = (LX[1] - LX[0]) / n;
  return Array.from({ length: n }, (_, i) => S.rect(LX[0] + i * w, y, w - 1, h, o)).join('');
}
function dicotLeaf() {
  const out = [];
  out.push(S.line(LX[0], 62, LX[1], 62, { c: B, w: 3 }), leafBand(64, 14, 14, { c: M, fill: G, fop: 0.1, sw: 1 }));
  const nP = 22;
  const pw = (LX[1] - LX[0]) / nP;
  for (let i = 0; i < nP; i++) out.push(S.rect(LX[0] + i * pw + 1, 80, pw - 2, 42, { c: M, fill: G, fop: 0.4, sw: 0.9, rx: 3 }));
  const stoma = [190, 350];
  for (const [y, off] of [[134, 0], [156, 13], [178, 0]]) for (let i = 0; i < 11; i++) {
    const x = LX[0] + 14 + i * 26 + off;
    if (x > LX[1] - 8) continue;
    if (y >= 156 && stoma.some((s) => Math.abs(x - s) < 20)) continue;
    out.push(S.ellipse(x, y, 11, 9, { c: M, fill: G, fop: 0.18, sw: 0.9 }));
  }
  out.push(leafBand(198, 14, 14, { c: M, fill: G, fop: 0.1, sw: 1 }), S.line(LX[0], 214, LX[1], 214, { c: B, w: 3 }));
  stoma.forEach((x) => out.push(S.ellipse(x - 5, 205, 4.2, 7.5, { c: G, fill: G, fop: 0.55, sw: 1.2 }), S.ellipse(x + 5, 205, 4.2, 7.5, { c: G, fill: G, fop: 0.55, sw: 1.2 })));
  // vascular bundle with its sheath, xylem towards the upper surface
  out.push(S.circle(270, 150, 30, { c: B, fill: 'var(--diagram-fill)', sw: 2 }));
  [[262, 138], [276, 138], [269, 148]].forEach(([x, y]) => out.push(dot(x, y, 5, { c: BL, fill: BL, fop: 0.35, sw: 1.1 })));
  [[262, 162], [276, 162], [269, 170]].forEach(([x, y]) => out.push(dot(x, y, 4, { c: B, fill: Y, fop: 0.55, sw: 1 })));
  return out.join('');
}
const dleafItems = (letters) => ({
  right: [
    ['Upper epidermis', 400, 71, 'A'], ['Palisade parenchyma', 392, 100, 'B'], ['Spongy parenchyma', 395, 156, 'C'], ['Lower epidermis', 395, 205, 'F'], ['Xylem', 276, 138, 'D'], ['Phloem', 276, 162, 'G'],
  ].filter((it) => !letters || 'ABCDE'.includes(it[3])),
  left: [
    ['Upper cuticle', 140, 62, 'H'], ['Bundle sheath', 242, 150, 'I'], ['Air space', 160, 160, 'J'], ['Sub-stomatal cavity', 190, 190, 'K'], ['Guard cell', 185, 205, 'E'], ['Stoma (pore)', 190, 206, 'L'],
  ].filter((it) => !letters || 'ABCDE'.includes(it[3])),
});
export const DICOT_LEAF = svgDoc(
  600,
  270,
  'Vertical section of a dicot (dorsiventral) leaf: a cuticle and an upper epidermis; a layer of tall, closely packed palisade parenchyma cells under it; below, loosely arranged spongy parenchyma with air spaces; a lower epidermis with stomata, each with two guard cells over a sub-stomatal cavity; and a vascular bundle with a bundle sheath, xylem towards the upper surface and phloem towards the lower surface',
  [
    dicotLeaf(),
    sideLabels(dleafItems(false).right.map(([t, x, y]) => [t, x, y]), 440, 'r', true, 24, 40),
    sideLabels(dleafItems(false).left.filter((it) => !['L'].includes(it[3])).map(([t, x, y]) => [t, x, y]), 116, 'l', true, 24, 60),
  ].join(''),
);
export const DLEAF_LETTERS = { A: 'upper epidermis', B: 'palisade parenchyma', C: 'spongy parenchyma', D: 'xylem', E: 'guard cell' };
export const DICOT_LEAF_LETTERED = svgDoc(
  500,
  270,
  'Vertical section of a leaf with five structures marked by letters. A: the single layer of flat cells on the upper surface. B: the layer of tall, closely packed, chloroplast-rich cells just below it. C: the loosely packed rounded cells with air spaces below that layer. D: the group of vessels on the upper side of the vascular bundle. E: one of the two bean-shaped cells that surround a pore in the lower surface',
  dicotLeaf() + sideLabels([['', 400, 71, 'A'], ['', 392, 100, 'B'], ['', 395, 156, 'C'], ['', 270, 138, 'D'], ['', 355, 205, 'E']], 440, 'r', false, 34, 40),
);

function monocotLeaf() {
  const out = [];
  out.push(S.line(LX[0], 62, LX[1], 62, { c: B, w: 3 }));
  const w = 20;
  for (let i = 0; i < 14; i++) {
    const x = LX[0] + i * w;
    const bull = (i >= 2 && i <= 4) || (i >= 9 && i <= 11);
    out.push(bull ? S.rect(x, 64, w - 1, 26, { c: M, fill: G, fop: 0.05, sw: 1, rx: 6 }) : S.rect(x, 64, w - 1, 12, { c: M, fill: G, fop: 0.1, sw: 1 }));
  }
  for (const [y, off] of [[96, 0], [118, 13], [140, 0], [162, 13], [184, 0]]) for (let i = 0; i < 11; i++) {
    const x = LX[0] + 14 + i * 26 + off;
    if (x > LX[1] - 8) continue;
    if (Math.abs(x - 200) < 26 || Math.abs(x - 340) < 26) continue;
    out.push(S.ellipse(x, y, 10, 9, { c: M, fill: G, fop: 0.22, sw: 0.9 }));
  }
  out.push(leafBand(204, 12, 14, { c: M, fill: G, fop: 0.1, sw: 1 }), S.line(LX[0], 218, LX[1], 218, { c: B, w: 3 }));
  [250, 395].forEach((x) => out.push(S.ellipse(x - 4.5, 70, 3.6, 6, { c: G, fill: G, fop: 0.55, sw: 1.1 }), S.ellipse(x + 4.5, 70, 3.6, 6, { c: G, fill: G, fop: 0.55, sw: 1.1 })));
  [270, 395].forEach((x) => out.push(S.ellipse(x - 4.5, 211, 3.6, 6, { c: G, fill: G, fop: 0.55, sw: 1.1 }), S.ellipse(x + 4.5, 211, 3.6, 6, { c: G, fill: G, fop: 0.55, sw: 1.1 })));
  [200, 340].forEach((x) => {
    out.push(S.circle(x, 140, 28, { c: B, fill: 'var(--diagram-fill)', sw: 2 }));
    out.push(S.path(`M${x - 14} 94 Q${x} 84 ${x + 14} 94`, { c: B, w: 5 }), S.path(`M${x - 14} 186 Q${x} 196 ${x + 14} 186`, { c: B, w: 5 }));
    [[x - 7, 132], [x + 7, 132], [x, 141]].forEach(([a, b]) => out.push(dot(a, b, 5, { c: BL, fill: BL, fop: 0.35, sw: 1.1 })));
    [[x - 7, 156], [x + 7, 156]].forEach(([a, b]) => out.push(dot(a, b, 4, { c: B, fill: Y, fop: 0.55, sw: 1 })));
  });
  return out.join('');
}
export const MONOCOT_LEAF = svgDoc(
  600,
  270,
  'Vertical section of a monocot (isobilateral) leaf: a cuticle and epidermis on both surfaces; groups of large, thin-walled bulliform cells in the upper epidermis; mesophyll of similar rounded cells, not separated into palisade and spongy tissue; parallel vascular bundles, each with a sheath, xylem towards the upper surface, phloem towards the lower surface and sclerenchyma above and below; and stomata on both the upper and the lower surface',
  [
    monocotLeaf(),
    sideLabels([['Bulliform cells', 392, 78], ['Stoma (upper)', 399, 70], ['Mesophyll (one kind)', 395, 150], ['Bundle sheath', 372, 140], ['Stoma (lower)', 399, 211], ['Lower epidermis', 395, 210]].map(([t, x, y]) => [t, x, y]), 440, 'r', true, 24, 40),
    sideLabels([['Upper epidermis', 150, 70], ['Sclerenchyma', 200, 90], ['Xylem', 193, 132], ['Phloem', 193, 156], ['Vascular bundle', 175, 160]].map(([t, x, y]) => [t, x, y]), 116, 'l', true, 24, 70),
  ].join(''),
);

export const ALL = { MERISTEMS, SIMPLE_TISSUES, VASCULAR, DICOT_ROOT, MONOCOT_ROOT, DICOT_STEM, DICOT_STEM_LETTERED, MONOCOT_STEM, DICOT_LEAF, DICOT_LEAF_LETTERED, MONOCOT_LEAF };
