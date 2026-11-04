// SVG diagrams for ISC 11 Biology ch07 Morphology of the Flower and Inflorescence: a flower in L.S. (named and lettered A-E),
// aestivation, cohesion and adhesion of stamens, mono- and dithecous anthers, position of the ovary, placentation (named and
// lettered A-E), racemose and cymose inflorescence.
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
const poly = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
/** Arc whose radius changes linearly from r1 to r2 as the angle goes from a1 to a2 (degrees). */
const arc = (cx, cy, r1, a1, r2, a2, o = {}) => {
  const n = 24;
  const pts = Array.from({ length: n + 1 }, (_, i) => P(cx, cy, r1 + ((r2 - r1) * i) / n, a1 + ((a2 - a1) * i) / n));
  return S.path(poly(pts), { w: 4, c: G, cap: 'round', ...o });
};

// 1. A flower in longitudinal section (named and lettered A-E)
function flower(named) {
  const t = (x, y, s, a, name) => (named ? S.text(x, y, name, { a, size: 11 }) : S.text(x, y, s, { a, size: 15, w: 'bold' }));
  const parts = [
    S.line(220, 312, 220, 262, { c: G, w: 6 }),
    S.ellipse(220, 255, 22, 9, { c: B, fill: B, fop: 0.35, sw: 1.2 }),
    S.path('M200 258 C176 258 160 244 156 226 C178 228 196 240 204 252 Z', { c: G, fill: G, fop: 0.4, w: 1.2 }),
    S.path('M240 258 C264 258 280 244 284 226 C262 228 244 240 236 252 Z', { c: G, fill: G, fop: 0.4, w: 1.2 }),
    S.path('M204 250 C170 240 140 200 148 150 C176 170 196 210 208 244 Z', { c: R, fill: R, fop: 0.22, w: 1.4 }),
    S.path('M236 250 C270 240 300 200 292 150 C264 170 244 210 232 244 Z', { c: R, fill: R, fop: 0.22, w: 1.4 }),
    S.line(212, 248, 200, 172, { c: Y, w: 2 }), S.ellipse(199, 162, 4, 10, { c: Y, fill: Y, fop: 0.55, sw: 1.2 }),
    S.line(228, 248, 240, 172, { c: Y, w: 2 }), S.ellipse(241, 162, 4, 10, { c: Y, fill: Y, fop: 0.55, sw: 1.2 }),
    S.ellipse(220, 232, 13, 20, { c: G, fill: G, fop: 0.25, sw: 1.5 }),
    S.circle(216, 226, 3.5, { c: B, fill: B, fop: 0.6, sw: 1 }), S.circle(225, 233, 3.5, { c: B, fill: B, fop: 0.6, sw: 1 }), S.circle(215, 238, 3.5, { c: B, fill: B, fop: 0.6, sw: 1 }),
    S.line(220, 212, 220, 134, { c: G, w: 2.4 }),
    S.ellipse(220, 128, 9, 5, { c: R, fill: R, fop: 0.4, sw: 1.4 }),
  ];
  const right = [[99, 'A', 'Stigma', 229, 126], [139, 'B', 'Anther', 245, 160], [184, 'C', 'Petal (corolla)', 282, 190], [215, 'D', 'Ovule', 226, 232], [254, 'E', 'Sepal (calyx)', 276, 238], [300, '', 'Pedicel', 224, 298]];
  for (const [y, L, nm, ax, ay] of right) {
    if (!named && !L) continue;
    parts.push(S.lead(296, y - 4, ax, ay), t(300, y, L, 'start', nm));
  }
  if (named) {
    const left = [[99, 'Style', 218, 150], [140, 'Filament (stamen)', 203, 195], [182, 'Ovary', 208, 224], [270, 'Thalamus', 202, 256]];
    for (const [y, nm, ax, ay] of left) parts.push(S.lead(132, y - 4, ax, ay), S.text(128, y, nm, { a: 'end', size: 11 }));
  }
  return svgDoc(
    440,
    252,
    named
      ? 'A flower in longitudinal section on its stalk, the pedicel: the thalamus bears sepals (the calyx), petals (the corolla), two stamens each with a filament and an anther, and in the centre the carpel with a stigma, a style and an ovary containing ovules'
      : 'A flower in longitudinal section with five parts marked by letters: A the sticky tip at the top of the central column, B the pollen-bearing head of a stamen, C a coloured leaf-like part of the inner showy whorl, D a small round body inside the swollen base of the central column, and E a small green leaf-like part of the outermost whorl',
    `<g transform="translate(0 -70)">${parts.join('')}</g>`,
  );
}
export const FLOWER_NAMED = flower(true);
export const FLOWER_LETTERED = flower(false);

// 2. Aestivation: schematic transverse sections of a flower bud (outlines of the five petals)
const CX = [62, 182, 302, 422];
const CY = 78;
const TH = [0, 1, 2, 3, 4].map((i) => -90 + 72 * i);
const axisDot = (cx) => S.circle(cx, CY, 3, { c: M, fill: M, sw: 0 });
const valvate = TH.map((a) => arc(CX[0], CY, 28, a - 33, 28, a + 33)).join('') + axisDot(CX[0]);
const twisted = TH.map((a) => arc(CX[1], CY, 21, a - 45, 31, a + 45)).join('') + axisDot(CX[1]);
const imbricate =
  arc(CX[2], CY, 34, TH[0] - 42, 34, TH[0] + 42) +
  [1, 2, 3].map((i) => arc(CX[2], CY, 25, TH[i] - 42, 30, TH[i] + 42)).join('') +
  arc(CX[2], CY, 19, TH[4] - 42, 19, TH[4] + 42) +
  axisDot(CX[2]);
const vexillary =
  arc(CX[3], CY, 36, -170, 36, -10, { w: 5 }) +
  arc(CX[3], CY, 27, 105, 27, 210) +
  arc(CX[3], CY, 27, -30, 27, 75) +
  arc(CX[3], CY, 18, 70, 18, 110, { w: 5 }) +
  axisDot(CX[3]);
export const AESTIVATION = svgDoc(
  484,
  166,
  'Aestivation, the arrangement of petals in a flower bud, seen as outlines in transverse section. Valvate: five petals meet edge to edge without overlapping, as in Calotropis. Twisted: each petal overlaps the next one on one edge and is overlapped on the other, as in cotton. Imbricate: one petal lies wholly outside, one wholly inside and the other three overlap in a twist, as in gulmohar. Vexillary: a large standard petal covers two wing petals which cover two small keel petals, as in the pea and bean',
  [
    valvate, twisted, imbricate, vexillary,
    ...['Valvate', 'Twisted', 'Imbricate', 'Vexillary'].map((s, i) => title(CX[i], 134, s)),
    ...['Calotropis', 'cotton', 'gulmohar', 'pea, bean'].map((s, i) => note(CX[i], 150, s)),
    note(CX[0], 14, 'edge to edge'), note(CX[1], 14, 'each overlaps the next'), note(CX[2], 14, 'one out, one in'), note(CX[3], 14, 'standard, wings, keel'),
  ].join(''),
);

// 3. Cohesion and adhesion of stamens: six panels
function stamenPanel(ox, kind) {
  const cx = ox + 85;
  const oy = 0;
  const anther = (x, y) => S.ellipse(x, y, 4, 7, { c: Y, fill: Y, fop: 0.6, sw: 1.2 });
  const fil = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { c: Y, w: 1.6 });
  const tube = (x, w) => S.rect(x, oy + 60, w, 50, { c: B, fill: B, fop: 0.25, sw: 1.4 });
  const out = [];
  if (kind === 'mono') {
    out.push(tube(cx - 20, 40));
    [-32, -16, 0, 16, 32].forEach((d, i) => out.push(fil(cx - 16 + i * 8, oy + 60, cx + d, oy + 32), anther(cx + d, oy + 26)));
  } else if (kind === 'di') {
    out.push(tube(cx - 46, 36));
    [-4, 4, 12, 20].forEach((d, i) => out.push(fil(cx - 40 + i * 9, oy + 60, cx - 54 + d + i * 8, oy + 32), anther(cx - 54 + d + i * 8, oy + 26)));
    out.push(fil(cx + 36, oy + 110, cx + 36, oy + 34), anther(cx + 36, oy + 28), note(cx - 28, oy + 124, 'nine joined'), note(cx + 36, oy + 124, 'one free'));
  } else if (kind === 'poly') {
    [-56, -13, 30].forEach((x) => {
      out.push(S.rect(cx + x, oy + 62, 26, 48, { c: B, fill: B, fop: 0.25, sw: 1.4 }));
      [0, 1, 2].forEach((j) => out.push(fil(cx + x + 4 + j * 9, oy + 62, cx + x - 4 + j * 13, oy + 36), anther(cx + x - 4 + j * 13, oy + 30)));
    });
  } else if (kind === 'syn') {
    [-24, -12, 0, 12, 24].forEach((d) => out.push(fil(cx + d, oy + 110, cx + d, oy + 50)));
    out.push(S.rect(cx - 34, oy + 30, 68, 20, { c: Y, fill: Y, fop: 0.55, sw: 1.4, rx: 8 }), note(cx, oy + 124, 'anthers joined'));
  } else if (kind === 'epipet') {
    out.push(S.path(`M${cx - 48} ${oy + 30} L${cx - 26} ${oy + 110} L${cx + 26} ${oy + 110} L${cx + 48} ${oy + 30}`, { c: R, fill: R, fop: 0.18, w: 1.6 }));
    [[-30, 80, -40, 40], [0, 90, 0, 44], [30, 80, 40, 40]].forEach(([x1, y1, x2, y2]) => out.push(fil(cx + x1 * 0.8, oy + y1, cx + x2 * 0.8, oy + y2), anther(cx + x2 * 0.8, oy + y2 - 6)));
    out.push(note(cx, oy + 124, 'stamens on the petals'));
  } else {
    out.push(
      S.path(`M${cx} ${oy + 110} C${cx - 46} ${oy + 100} ${cx - 56} ${oy + 56} ${cx - 44} ${oy + 30} C${cx - 22} ${oy + 56} ${cx - 6} ${oy + 86} ${cx} ${oy + 110} Z`, { c: R, fill: R, fop: 0.18, w: 1.4 }),
      S.path(`M${cx} ${oy + 110} C${cx + 46} ${oy + 100} ${cx + 56} ${oy + 56} ${cx + 44} ${oy + 30} C${cx + 22} ${oy + 56} ${cx + 6} ${oy + 86} ${cx} ${oy + 110} Z`, { c: R, fill: R, fop: 0.18, w: 1.4 }),
      fil(cx - 22, oy + 86, cx - 14, oy + 40), anther(cx - 13, oy + 33), fil(cx + 22, oy + 86, cx + 14, oy + 40), anther(cx + 13, oy + 33),
      note(cx, oy + 124, 'stamens on the tepals'),
    );
  }
  return out.join('');
}
const SP = [['mono', 'Monadelphous', 'hibiscus'], ['di', 'Diadelphous', 'pea, bean'], ['poly', 'Polyadelphous', 'Bombax'], ['syn', 'Syngenesious', 'sunflower'], ['epipet', 'Epipetalous', 'datura'], ['epiph', 'Epiphyllous', 'lily']];
export const STAMENS = svgDoc(
  520,
  340,
  'Six conditions of the stamens. Monadelphous: all the filaments joined in one tube, as in hibiscus. Diadelphous: filaments in two bundles, nine joined and one free, as in pea. Polyadelphous: filaments in three or more bundles, as in Bombax. Syngenesious: anthers joined while the filaments are free, as in sunflower. Epipetalous: stamens attached to the petals, as in datura. Epiphyllous: stamens attached to the tepals of the perianth, as in lily',
  SP.map(([k, name, ex], i) => {
    const ox = (i % 3) * 170;
    const oy = i < 3 ? 0 : 172;
    return `<g transform="translate(0 ${oy})">${stamenPanel(ox, k)}${title(ox + 85, 148, name)}${note(ox + 85, 162, ex)}</g>`;
  }).join(''),
);

// 4. Anthers: dithecous and monothecous in transverse section
export const ANTHERS = svgDoc(
  460,
  210,
  'Transverse sections of two kinds of anther. A dithecous anther has two lobes called thecae joined by a connective, each lobe holding two pollen sacs, so four pollen sacs in all. A monothecous anther is kidney shaped, with one lobe holding two pollen sacs',
  [
    S.ellipse(78, 76, 28, 36, { c: Y, fill: Y, fop: 0.22, sw: 1.5 }), S.ellipse(142, 76, 28, 36, { c: Y, fill: Y, fop: 0.22, sw: 1.5 }),
    S.rect(104, 44, 12, 64, { c: G, fill: G, fop: 0.3, sw: 1.2 }), S.rect(106, 100, 8, 34, { c: G, fill: G, fop: 0.3, sw: 1.2 }),
    ...[[78, 62], [78, 90], [142, 62], [142, 90]].map(([x, y]) => S.circle(x, y, 9, { c: Y, fill: Y, fop: 0.6, sw: 1.2 })),
    S.lead(170, 62, 214, 40), lab(216, 38, 'Pollen sac'),
    S.lead(116, 118, 214, 108), lab(216, 112, 'Connective'),
    S.lead(60, 112, 44, 142), lab(8, 156, 'Theca (lobe)'),
    title(110, 178, 'Dithecous'), note(110, 194, 'two lobes, four pollen sacs'),
    S.path('M290 70 C290 28 400 28 400 70 C400 104 366 112 345 92 C324 112 290 104 290 70 Z', { c: Y, fill: Y, fop: 0.22, w: 1.5 }),
    S.circle(318, 66, 10, { c: Y, fill: Y, fop: 0.6, sw: 1.2 }), S.circle(372, 66, 10, { c: Y, fill: Y, fop: 0.6, sw: 1.2 }),
    S.rect(338, 98, 14, 36, { c: G, fill: G, fop: 0.3, sw: 1.2 }),
    S.lead(385, 54, 400, 36), lab(454, 30, 'Pollen sac', { a: 'end' }),
    title(345, 178, 'Monothecous'), note(345, 194, 'one lobe, two pollen sacs'),
  ].join(''),
);

// 5. Position of the ovary
function ovPanel(cx, kind) {
  const out = [];
  const petal = (sx, sy, dir, h) => S.path(`M${sx} ${sy} C${sx + dir * 20} ${sy - 12} ${sx + dir * 26} ${sy - h * 0.6} ${sx + dir * 20} ${sy - h}`, { c: R, w: 2 });
  const stamen = (sx, sy, dir, h) => S.line(sx, sy, sx + dir * 8, sy - h, { c: Y, w: 1.6 }) + S.ellipse(sx + dir * 8, sy - h - 5, 3.5, 6, { c: Y, fill: Y, fop: 0.6, sw: 1.2 });
  const sepal = (sx, sy, dir) => S.path(`M${sx} ${sy} C${sx + dir * 12} ${sy + 2} ${sx + dir * 16} ${sy - 6} ${sx + dir * 14} ${sy - 14}`, { c: G, w: 2 });
  if (kind === 'hypo') {
    out.push(
      S.ellipse(cx, 168, 34, 12, { c: B, fill: B, fop: 0.3, sw: 1.4 }),
      petal(cx - 28, 162, -1, 90), petal(cx + 28, 162, 1, 90), stamen(cx - 18, 160, -1, 56), stamen(cx + 18, 160, 1, 56), sepal(cx - 32, 170, -1), sepal(cx + 32, 170, 1),
      S.ellipse(cx, 134, 15, 26, { c: G, fill: G, fop: 0.3, sw: 1.5 }), S.line(cx, 108, cx, 66, { c: G, w: 2 }), S.ellipse(cx, 62, 8, 4, { c: R, fill: R, fop: 0.4, sw: 1.2 }),
    );
  } else if (kind === 'peri') {
    out.push(
      S.path(`M${cx - 34} 110 C${cx - 36} 170 ${cx + 36} 170 ${cx + 34} 110`, { c: B, fill: B, fop: 0.18, w: 3 }),
      petal(cx - 34, 110, -1, 70), petal(cx + 34, 110, 1, 70), stamen(cx - 24, 108, -1, 40), stamen(cx + 24, 108, 1, 40), sepal(cx - 36, 114, -1), sepal(cx + 36, 114, 1),
      S.ellipse(cx, 134, 14, 22, { c: G, fill: G, fop: 0.3, sw: 1.5 }), S.line(cx, 112, cx, 66, { c: G, w: 2 }), S.ellipse(cx, 62, 8, 4, { c: R, fill: R, fop: 0.4, sw: 1.2 }),
    );
  } else {
    out.push(
      S.ellipse(cx, 138, 30, 40, { c: B, fill: B, fop: 0.18, sw: 2.5 }),
      S.ellipse(cx, 146, 17, 26, { c: G, fill: G, fop: 0.3, sw: 1.5 }),
      petal(cx - 20, 104, -1, 66), petal(cx + 20, 104, 1, 66), stamen(cx - 12, 102, -1, 44), stamen(cx + 12, 102, 1, 44), sepal(cx - 24, 108, -1), sepal(cx + 24, 108, 1),
      S.line(cx, 120, cx, 62, { c: G, w: 2 }), S.ellipse(cx, 58, 8, 4, { c: R, fill: R, fop: 0.4, sw: 1.2 }),
    );
  }
  return out.join('');
}
export const OVARY_POS = svgDoc(
  480,
  240,
  'Position of the ovary in longitudinal section. Hypogynous: the ovary is superior, with the sepals, petals and stamens attached to the thalamus below it, as in mustard. Perigynous: the ovary lies in a cup-shaped thalamus and the other whorls arise from the rim of the cup at about the level of the ovary, as in rose. Epigynous: the thalamus grows round and fuses with the ovary, which is inferior, and the other whorls arise above it, as in sunflower and cucumber',
  [
    ovPanel(80, 'hypo'), ovPanel(240, 'peri'), ovPanel(400, 'epi'),
    title(80, 202, 'Hypogynous'), note(80, 217, 'ovary superior'), note(80, 231, 'whorls below the ovary'),
    title(240, 202, 'Perigynous'), note(240, 217, 'ovary half-inferior'), note(240, 231, 'whorls on the rim of a cup'),
    title(400, 202, 'Epigynous'), note(400, 217, 'ovary inferior'), note(400, 231, 'whorls above the ovary'),
  ].join(''),
);

// 6. Placentation (named and lettered A-E)
const PL_ORDER_NAMED = ['axile', 'parietal', 'free central', 'basal', 'marginal'];
/** Letters used in the lettered figure: panel order and the type each letter shows. */
export const PL_LETTERS = { A: 'free central', B: 'axile', C: 'marginal', D: 'basal', E: 'parietal' };
const PL_ORDER_LETTERED = Object.values(PL_LETTERS);
const ovule = (x, y) => S.circle(x, y, 4, { c: B, fill: B, fop: 0.6, sw: 1.1 });
function plPanel(cx, kind) {
  const cy = 70;
  const out = [];
  const ring = (r) => S.circle(cx, cy, r, { c: G, fill: G, fop: 0.1, sw: 2 });
  if (kind === 'axile') {
    out.push(ring(34));
    [-90, 30, 150].forEach((a) => out.push(S.line(cx, cy, ...P(cx, cy, 34, a), { c: G, w: 1.6 })));
    [-30, 90, 210].forEach((a) => out.push(ovule(...P(cx, cy, 11, a))));
  } else if (kind === 'parietal') {
    out.push(ring(34));
    [-30, 90, 210].forEach((a) => out.push(S.line(...P(cx, cy, 34, a), ...P(cx, cy, 19, a), { c: G, w: 1.6 })));
    [-90, 30, 150].forEach((a) => out.push(ovule(...P(cx, cy, 28, a))));
  } else if (kind === 'free central') {
    out.push(ring(34), S.circle(cx, cy, 8, { c: B, fill: B, fop: 0.3, sw: 1.4 }));
    [0, 60, 120, 180, 240, 300].forEach((a) => out.push(ovule(...P(cx, cy, 17, a))));
  } else if (kind === 'basal') {
    out.push(S.ellipse(cx, cy + 4, 26, 38, { c: G, fill: G, fop: 0.1, sw: 2 }), S.line(cx, cy - 34, cx, cy - 64, { c: G, w: 2 }), ovule(cx, cy + 30));
  } else {
    out.push(S.ellipse(cx, cy + 4, 26, 38, { c: G, fill: G, fop: 0.1, sw: 2 }), S.line(cx, cy - 34, cx, cy - 64, { c: G, w: 2 }));
    [-20, -6, 8, 22].forEach((dy) => out.push(ovule(cx - 17, cy + 6 + dy)));
    out.push(S.line(cx - 22, cy - 22, cx - 22, cy + 30, { c: B, w: 1.4, dash: '3 3' }));
  }
  return out.join('');
}
function placentation(named) {
  const order = named ? PL_ORDER_NAMED : PL_ORDER_LETTERED;
  const X = [50, 150, 250, 350, 450];
  const parts = order.map((k, i) => plPanel(X[i], k));
  const ls = order.map((k, i) => (named ? title(X[i], 134, k[0].toUpperCase() + k.slice(1)) : S.text(X[i], 140, 'ABCDE'[i], { a: 'middle', size: 16, w: 'bold' })));
  const sec = order.map((k, i) => note(X[i], named ? 150 : 158, k === 'basal' || k === 'marginal' ? 'L.S. of ovary' : 'T.S. of ovary'));
  return svgDoc(
    500,
    named ? 166 : 172,
    named
      ? 'Five types of placentation. Axile: ovules on a central axis of a chambered ovary, as in tomato and lemon. Parietal: ovules on the inner wall of a one-chambered ovary, as in mustard and Argemone. Free central: ovules on a central column that is not joined to the wall by partitions, as in Dianthus and primrose. Basal: a single ovule at the base of the ovary, as in sunflower and marigold. Marginal: ovules along one margin of a one-chambered ovary, as in pea and bean'
      : 'Five ovaries drawn to show where the ovules are attached, marked by letters. A: a one-chambered ovary with a central column bearing ovules, joined to the wall by no partition. B: a three-chambered ovary with ovules on the central axis where the partitions meet. C: a one-chambered ovary in long section with a row of ovules along one margin. D: a one-chambered ovary in long section with a single ovule at its base. E: a one-chambered ovary with ovules on the inner wall',
    [...parts, ...ls, ...sec].join(''),
  );
}
export const PLAC_NAMED = placentation(true);
export const PLAC_LETTERED = placentation(false);

// 7. Racemose and cymose inflorescence
const bloom = (x, y, n, big = true) => S.circle(x, y, big ? 11 : 5, { c: R, fill: R, fop: 0.3, sw: 1.4 }) + (n ? S.text(x, y + 4, String(n), { a: 'middle', size: 11, w: 'bold' }) : '');
export const INFLORESCENCE = svgDoc(
  480,
  290,
  'Racemose and cymose inflorescence, with numbers showing the order in which flowers open. In the racemose type the main axis keeps growing and bears flowers on short stalks, the oldest flower (1) at the base and the youngest near the tip, with a growing tip at the top. In the cymose type the main axis ends in a flower (1), the oldest, and the younger flowers (2 to 5) are borne below it on side branches',
  [
    title(110, 18, 'Racemose'),
    S.line(110, 262, 110, 50, { c: G, w: 3 }),
    ...[[225, -1, 1], [190, 1, 2], [155, -1, 3], [120, 1, 4], [85, -1, 5]].flatMap(([y, s, n]) => [S.line(110, y, 110 + s * 20, y, { c: G, w: 1.6 }), bloom(110 + s * 31, y, n)]),
    bloom(110, 42, 0, false), lab(122, 38, 'growing tip', { size: 10, c: M }),
    S.arrow(56, 230, 56, 80, { c: M, w: 1.5, size: 6 }), S.text(52, 160, 'younger', { a: 'end', size: 10, c: M }),
    title(360, 18, 'Cymose'),
    S.line(360, 262, 360, 62, { c: G, w: 3 }), bloom(360, 50, 1),
    S.line(360, 128, 322, 100, { c: G, w: 1.6 }), bloom(314, 94, 2), S.line(360, 128, 398, 100, { c: G, w: 1.6 }), bloom(406, 94, 3),
    S.line(360, 196, 322, 168, { c: G, w: 1.6 }), bloom(314, 162, 4), S.line(360, 196, 398, 168, { c: G, w: 1.6 }), bloom(406, 162, 5),
    S.arrow(470, 70, 470, 240, { c: M, w: 1.5, size: 6 }), S.text(466, 160, 'younger', { a: 'end', size: 10, c: M }),
    note(110, 282, 'axis keeps growing; oldest flower at the base'), note(360, 282, 'axis ends in a flower; oldest flower at the top'),
  ].join(''),
);

export const ALL = { FLOWER_NAMED, FLOWER_LETTERED, AESTIVATION, STAMENS, ANTHERS, OVARY_POS, PLAC_NAMED, PLAC_LETTERED, INFLORESCENCE };
