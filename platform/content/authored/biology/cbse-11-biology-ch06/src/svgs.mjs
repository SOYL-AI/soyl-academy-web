// SVG diagrams for ch06 Anatomy of Flowering Plants (allow-listed elements, palette colours only).
// Schematic transverse sections, not to scale. The dicot leaf also has a lettered version (A–E) for questions.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { LEAF_LETTERS } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const g = (tf, body) => `<g transform="${tf}">${body}</g>`;
const at = (cx, cy, rad, a) => [cx + rad * Math.cos((a * Math.PI) / 180), cy + rad * Math.sin((a * Math.PI) / 180)];
const ringCells = (cx, cy, rad, n, cr, o = {}, phase = 0) => Array.from({ length: n }, (_, i) => { const [x, y] = at(cx, cy, rad, phase + (i * 360) / n); return S.circle(x, y, cr, { sw: 1, c: MUT, ...o }); }).join('');
const lead = (x1, y1, p) => S.lead(x1, y1, p[0], p[1]);

// ---------------------------------------------------------------- 1. simple permanent tissues
const hexPts = (cx, cy, R) => Array.from({ length: 6 }, (_, i) => at(cx, cy, R, 30 + 60 * i));
const poly = (pts, o = {}) => `<polygon points="${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="${o.fill ?? 'none'}" stroke="${o.c ?? 'currentColor'}" stroke-width="${o.w ?? 1}"${o.fop !== undefined ? ` fill-opacity="${o.fop}"` : ''}/>`;
const cluster = (cx, cy, R) => { const d = Math.sqrt(3) * R; return [[cx, cy], ...Array.from({ length: 6 }, (_, i) => at(cx, cy, d, 60 * i))]; };
const R0 = 17;
const parenchyma = (cx, cy) => cluster(cx, cy, R0).map(([x, y]) => poly(hexPts(x, y, R0 - 1), { w: 1, fill: GREEN, fop: 0.1 }) + S.circle(x, y + 2, 3, { fill: GREEN, fop: 0.6, sw: 0 }) + S.circle(x - 5, y - 4, 2.2, { fill: GREEN, fop: 0.6, sw: 0 })).join('');
const collenchyma = (cx, cy) => cluster(cx, cy, R0).map(([x, y]) => poly(hexPts(x, y, R0 - 1), { w: 1, fill: GREEN, fop: 0.08 }) + hexPts(x, y, R0 - 1).map(([px, py]) => S.circle(px, py, 3.6, { fill: BROWN, fop: 0.55, sw: 0 })).join('')).join('');
const sclerenchyma = (cx, cy) => cluster(cx, cy, R0).map(([x, y]) => S.circle(x, y, 14.5, { c: BROWN, sw: 5, fill: 'none' }) + S.circle(x, y, 3, { fill: FILL, sw: 1, c: MUT })).join('');
export const TISSUES = svgDoc(
  600,
  250,
  'Transverse views of the three simple permanent tissues, schematic. Parenchyma: thin-walled, roundish living cells with chloroplasts and small intercellular spaces. Collenchyma: living cells whose walls are thickened at the corners with cellulose, hemicellulose and pectin. Sclerenchyma: dead cells with thick lignified walls and a very narrow cavity',
  [
    parenchyma(100, 100), collenchyma(300, 100), sclerenchyma(500, 100),
    lab(100, 175, 'Parenchyma', { a: 'middle', w: 'bold' }), lab(100, 191, 'thin walls, living', { a: 'middle', size: 10 }), lab(100, 205, 'storage, photosynthesis', { a: 'middle', size: 10 }),
    lab(300, 175, 'Collenchyma', { a: 'middle', w: 'bold' }), lab(300, 191, 'corners thickened, living', { a: 'middle', size: 10 }), lab(300, 205, 'support of young organs', { a: 'middle', size: 10 }),
    lab(500, 175, 'Sclerenchyma', { a: 'middle', w: 'bold' }), lab(500, 191, 'thick lignified walls, dead', { a: 'middle', size: 10 }), lab(500, 205, 'strength, protection', { a: 'middle', size: 10 }),
    lab(300, 236, 'Transverse sections of the three simple permanent tissues', { a: 'middle', size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. vascular bundle types
const radialIcon = (cx, cy) => [S.circle(cx, cy, 48, { fill: GREEN, fop: 0.08, sw: 1.5, c: MUT })].concat([0, 90, 180, 270].map((a) => {
  const p = [at(cx, cy, 6, a - 14), at(cx, cy, 36, a - 5), at(cx, cy, 36, a + 5), at(cx, cy, 6, a + 14)];
  return poly(p, { fill: BROWN, fop: 0.55, c: BROWN });
})).concat([45, 135, 225, 315].map((a) => { const [x, y] = at(cx, cy, 28, a); return S.ellipse(x, y, 8, 6, { fill: GREEN, fop: 0.55, c: GREEN }); })).join('');
const bundleIcon = (ox, oy, open) => [
  S.ellipse(ox, oy - 4, 28, open ? 48 : 52, { c: open ? MUT : BROWN, sw: open ? 1 : 3.5, fill: 'none' }),
  S.ellipse(ox, oy - 30, 15, 11, { fill: GREEN, fop: 0.55, c: GREEN }),
  open ? S.line(ox - 22, oy - 12, ox + 22, oy - 12, { c: MUT, w: 2, dash: '3 2' }) : '',
  S.circle(ox - 9, oy + 4, 8, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(ox + 9, oy + 4, 8, { fill: BROWN, fop: 0.55, c: BROWN }),
  S.circle(ox, oy + 24, 5, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(ox, oy + 36, 3.5, { fill: YEL, c: BROWN, sw: 1 }),
].join('');
export const BUNDLES = svgDoc(
  600,
  230,
  'Three types of vascular bundle, schematic. Radial: in roots, xylem and phloem form separate patches lying on different radii, alternating with each other. Conjoint open: in dicot stems, xylem and phloem lie on the same radius with a layer of cambium between them. Conjoint closed: in monocot stems, xylem and phloem lie on the same radius with no cambium, and a sclerenchymatous sheath surrounds the bundle',
  [
    radialIcon(100, 90), bundleIcon(300, 90, true), bundleIcon(500, 90, false),
    lab(100, 168, 'Radial', { a: 'middle', w: 'bold' }), lab(100, 184, 'xylem and phloem on', { a: 'middle', size: 10 }), lab(100, 197, 'different radii (roots)', { a: 'middle', size: 10 }),
    lab(300, 168, 'Conjoint, open', { a: 'middle', w: 'bold' }), lab(300, 184, 'cambium present', { a: 'middle', size: 10 }), lab(300, 197, '(dicot stem)', { a: 'middle', size: 10 }),
    lab(500, 168, 'Conjoint, closed', { a: 'middle', w: 'bold' }), lab(500, 184, 'no cambium, sheath', { a: 'middle', size: 10 }), lab(500, 197, '(monocot stem)', { a: 'middle', size: 10 }),
    lab(342, 50, 'Phloem', { size: 10 }), lab(342, 74, 'Cambium', { size: 10 }), lab(342, 100, 'Xylem', { size: 10 }),
    lab(542, 50, 'Phloem', { size: 10 }), lab(542, 100, 'Xylem', { size: 10 }),
    lab(166, 44, 'Phloem', { size: 10 }), S.lead(164, 42, 122, 70), lab(166, 122, 'Xylem', { size: 10 }), S.lead(164, 118, 134, 92),
  ].join(''),
);

// ---------------------------------------------------------------- 3. roots (transverse sections)
function rootDoc({ arms, pithR, mono }) {
  const CX = 280;
  const CY = 210;
  const out = [S.circle(CX, CY, 170, { fill: GREEN, fop: 0.06, sw: 2.5 })];
  for (let a = 0; a < 360; a += 24) {
    const p1 = at(CX, CY, 170, a);
    const p2 = at(CX, CY, 188, a + 5);
    out.push(S.line(p1[0], p1[1], p2[0], p2[1], { w: 1.2 }));
  }
  out.push(ringCells(CX, CY, 152, 26, 8), ringCells(CX, CY, 134, 22, 8, {}, 8), ringCells(CX, CY, 116, 20, 7, {}, 4));
  out.push(S.circle(CX, CY, 102, { c: ACC, sw: 4 }), S.circle(CX, CY, 92, { c: BROWN, sw: 1.5, dash: '3 3' }));
  for (let i = 0; i < arms; i++) {
    const a = (i * 360) / arms;
    const r0 = Math.max(pithR, 6);
    const half = mono ? 4 : 7;
    out.push(poly([at(CX, CY, r0, a - half * 2), at(CX, CY, 78, a - half * 0.6), at(CX, CY, 78, a + half * 0.6), at(CX, CY, r0, a + half * 2)].map(([x, y]) => [x, y]), { fill: BROWN, fop: 0.55, c: BROWN }));
    const [vx, vy] = at(CX, CY, 74, a);
    out.push(S.circle(vx, vy, 3, { fill: YEL, c: BROWN, sw: 1 }));
    const [px, py] = at(CX, CY, 66, a + 180 / arms);
    out.push(S.ellipse(px, py, mono ? 7 : 10, mono ? 5 : 7, { fill: GREEN, fop: 0.55, c: GREEN }));
  }
  if (pithR > 12) out.push(S.circle(CX, CY, pithR, { fill: FILL, c: MUT, sw: 1 }), ringCells(CX, CY, pithR * 0.5, 7, 4.5, {}), S.circle(CX, CY, 4.5, { c: MUT, sw: 1 }));
  const L = [];
  const half = 180 / arms;
  const t = (rad, a) => at(CX, CY, rad, a);
  L.push(
    lab(4, 66, 'Root hair', {}), lead(56, 62, t(186, 213)),
    lab(4, 150, 'Epidermis', {}), lead(60, 146, t(170, 192)),
    lab(4, 262, 'Cortex', {}), lead(48, 258, t(134, 168)),
    lab(4, 330, 'Endodermis (with', {}), lab(4, 344, 'Casparian strips)', {}), lead(98, 332, t(102, 150)),
    lab(556, 66, 'Pericycle', { a: 'end' }), lead(500, 62, t(92, 330)),
    lab(556, 140, mono ? 'Xylem (polyarch, exarch)' : 'Xylem (exarch)', { a: 'end' }), lead(440, 136, t(60, 0)),
    lab(556, 230, 'Phloem', { a: 'end' }), lead(520, 226, t(66, half)),
    lab(556, 296, 'Conjunctive tissue', { a: 'end' }), lead(466, 292, t(46, half / 2 + 2 * half)),
    lab(556, 362, mono ? 'Pith (large, well developed)' : 'Pith (small)', { a: 'end' }), lead(420, 358, t(pithR > 12 ? pithR * 0.5 : 4, 70)),
  );
  return svgDoc(
    560,
    420,
    mono
      ? 'Transverse section of a monocot root, schematic. From outside: epidermis with root hairs, a wide cortex of parenchyma, a single-layered endodermis with Casparian strips, the pericycle, then eight patches of exarch xylem (polyarch) alternating with eight phloem patches, with conjunctive tissue between them, and a large well-developed pith in the centre'
      : 'Transverse section of a dicot root, schematic. From outside: epidermis with root hairs, a wide cortex of parenchyma, a single-layered endodermis with Casparian strips, the pericycle, then four patches of exarch xylem alternating with four phloem patches, with conjunctive tissue between them, and a very small pith or none',
    out.join('') + L.join(''),
  );
}
export const DICOTROOT = rootDoc({ arms: 4, pithR: 8, mono: false });
export const MONOROOT = rootDoc({ arms: 8, pithR: 34, mono: true });

// ---------------------------------------------------------------- 4. dicot stem
const stemBundle = (a) => g(`translate(280 210) rotate(${a})`, [
  S.path('M116 -14 L58 -6 L58 6 L116 14 Z', { w: 1, c: MUT }),
  S.path('M118 -14 Q127 0 118 14', { w: 6, c: BROWN }),
  S.ellipse(104, 0, 8, 11, { fill: GREEN, fop: 0.55, c: GREEN }),
  S.line(92, -12, 92, 12, { c: MUT, w: 2, dash: '2 2' }),
  S.circle(80, -7, 6, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(80, 7, 6, { fill: BROWN, fop: 0.55, c: BROWN }),
  S.circle(68, 0, 4.5, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(61, 0, 2.8, { fill: YEL, c: BROWN, sw: 1 }),
].join(''));
const DS_ANG = [0, 45, 90, 135, 180, 225, 270, 315];
export const DICOTSTEM = svgDoc(
  560,
  420,
  'Transverse section of a dicot stem, schematic. From outside: epidermis with a cuticle and a multicellular hair, a few layers of collenchymatous hypodermis, cortex of parenchyma, a single-layered endodermis called the starch sheath, and a ring of eight conjoint open vascular bundles. Each bundle has a cap of sclerenchyma (the pericycle), phloem towards the outside, a strip of cambium, and xylem towards the centre with the protoxylem nearest the pith, which is endarch. Medullary rays lie between the bundles, and a large pith occupies the centre',
  [
    S.circle(280, 210, 170, { fill: GREEN, fop: 0.06, sw: 2.5 }),
    S.path('M 255.6 41.6 L 250 18 L 258 14 M 250 18 L 240 20', { w: 1.2 }),
    ringCells(280, 210, 158, 36, 5, { c: BROWN, sw: 2 }),
    ringCells(280, 210, 142, 26, 8),
    S.circle(280, 210, 128, { c: ACC, sw: 3.5 }),
    ...DS_ANG.map((a) => { const [x1, y1] = at(280, 210, 60, a + 22.5); const [x2, y2] = at(280, 210, 124, a + 22.5); return S.line(x1, y1, x2, y2, { c: MUT, w: 5, dash: '1 5' }); }),
    ...DS_ANG.map(stemBundle),
    S.circle(280, 210, 52, { fill: FILL, c: MUT, sw: 1 }),
    ringCells(280, 210, 30, 8, 8), ringCells(280, 210, 6, 1, 8),
    lab(4, 60, 'Epidermis with cuticle', {}), lead(120, 56, at(280, 210, 171, 235)),
    lab(4, 126, 'Hypodermis', {}), lab(4, 140, '(collenchyma)', {}), lead(70, 132, at(280, 210, 158, 208)),
    lab(4, 262, 'Cortex', {}), lead(48, 258, at(280, 210, 142, 160)),
    lab(4, 330, 'Endodermis', {}), lab(4, 344, '(starch sheath)', {}), lead(76, 336, at(280, 210, 128, 140)),
    lab(556, 50, 'Sclerenchyma cap', { a: 'end' }), lab(556, 64, '(pericycle)', { a: 'end' }), lead(470, 56, at(280, 210, 122, 315)),
    lab(556, 124, 'Phloem', { a: 'end' }), lead(520, 120, at(280, 210, 104, 0)),
    lab(556, 170, 'Cambium', { a: 'end' }), lead(520, 166, at(280, 210, 92, 0)),
    lab(556, 216, 'Xylem (endarch)', { a: 'end' }), lead(450, 212, at(280, 210, 80, 45)),
    lab(556, 290, 'Medullary ray', { a: 'end' }), lead(500, 286, at(280, 210, 92, 67.5)),
    lab(556, 356, 'Pith (large)', { a: 'end' }), lead(500, 352, at(280, 210, 30, 80)),
    lab(380, 410, 'Vascular bundles: conjoint, open, in a ring', { a: 'middle', size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. monocot stem
const monoBundle = (x, y, s, a) => g(`translate(${x} ${y}) rotate(${a + 90}) scale(${s})`, [
  S.ellipse(0, 0, 16, 14, { c: BROWN, sw: 2.5, fill: FILL, fop: 0.9 }),
  S.ellipse(0, -7, 7, 4.5, { fill: GREEN, fop: 0.6, c: GREEN, sw: 1 }),
  S.circle(-6, 3, 4, { fill: BROWN, fop: 0.55, c: BROWN, sw: 1 }), S.circle(6, 3, 4, { fill: BROWN, fop: 0.55, c: BROWN, sw: 1 }),
  S.circle(0, 8, 2.8, { c: MUT, sw: 1 }),
].join(''));
const MCX = 260;
const MCY = 215;
const monoBundles = [];
[[132, 16, 0.62], [104, 12, 0.72], [74, 8, 0.82], [42, 5, 0.92], [0, 1, 1]].forEach(([rad, n, s], ring) => {
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n + ring * 11;
    const [x, y] = rad === 0 ? [MCX, MCY] : at(MCX, MCY, rad, a);
    monoBundles.push(monoBundle(x.toFixed(1), y.toFixed(1), s, rad === 0 ? 0 : a));
  }
});
export const MONOSTEM = svgDoc(
  700,
  430,
  'Transverse section of a monocot stem, schematic. An epidermis with a cuticle, a sclerenchymatous hypodermis, and a large ground tissue of parenchyma with many scattered vascular bundles, smaller and more crowded near the periphery. An enlarged bundle shows a sclerenchymatous bundle sheath, phloem without phloem parenchyma, two large metaxylem vessels, a protoxylem and a water-containing cavity. Each bundle is conjoint and closed, with no cambium',
  [
    S.circle(MCX, MCY, 160, { fill: GREEN, fop: 0.06, sw: 2.5 }),
    S.circle(MCX, MCY, 150, { c: BROWN, sw: 7 }),
    ...monoBundles,
    // enlarged bundle
    g('translate(570 300) scale(3.4)', [
      S.ellipse(0, 0, 16, 14, { c: BROWN, sw: 2, fill: FILL, fop: 0.9 }),
      S.ellipse(0, -7, 7, 4.5, { fill: GREEN, fop: 0.6, c: GREEN, sw: 0.8 }),
      S.circle(-6, 3, 4, { fill: BROWN, fop: 0.55, c: BROWN, sw: 0.8 }), S.circle(6, 3, 4, { fill: BROWN, fop: 0.55, c: BROWN, sw: 0.8 }),
      S.circle(0, 8, 2.8, { c: MUT, sw: 0.8 }),
    ].join('')),
    lab(4, 70, 'Epidermis', {}), lead(62, 66, at(MCX, MCY, 160, 228)),
    lab(4, 130, 'Sclerenchymatous', {}), lab(4, 144, 'hypodermis', {}), lead(84, 138, at(MCX, MCY, 150, 205)),
    lab(4, 262, 'Ground tissue', {}), lead(78, 258, at(MCX, MCY, 90, 165)),
    lab(4, 340, 'Scattered vascular', {}), lab(4, 354, 'bundles (closed)', {}), lead(94, 346, at(MCX, MCY, 104, 123)),
    lab(570, 20, 'One bundle, enlarged', { a: 'middle', w: 'bold' }),
    lab(696, 116, 'Phloem (no', { a: 'end' }), lab(696, 130, 'phloem parenchyma)', { a: 'end' }), lead(640, 118, [570, 276]),
    lab(696, 356, 'Metaxylem vessels', { a: 'end' }), lead(640, 352, [592, 314]),
    lab(696, 388, 'Water-containing cavity', { a: 'end' }), lead(656, 384, [574, 328]),
    lab(696, 416, 'Sclerenchymatous bundle sheath', { a: 'end' }), lead(520, 412, [586, 326]),
  ].join(''),
);

// ---------------------------------------------------------------- 6. dicot leaf (dorsiventral); named and lettered
function leafDoc(named) {
  const t = (key, name) => (named ? name : LEAF_LETTERS[key]);
  const o = named ? {} : { w: 'bold', size: 15 };
  const body = [];
  body.push(S.line(40, 62, 440, 62, { c: MUT, w: 2 }));
  for (let x = 40; x < 440; x += 25) body.push(S.rect(x, 64, 25, 20, { fill: GREEN, fop: 0.1, sw: 1 }));
  for (let x = 40; x < 440; x += 20) body.push(S.rect(x + 1, 86, 18, 62, { rx: 8, fill: GREEN, fop: 0.35, sw: 1.2 }));
  const spongy = [[60, 170], [100, 196], [145, 172], [60, 222], [118, 232], [170, 210], [330, 175], [372, 200], [410, 172], [340, 228], [395, 232], [300, 205], [180, 242], [280, 240]];
  spongy.forEach(([x, y], i) => body.push(S.ellipse(x, y, 17, 13, { fill: GREEN, fop: 0.2, sw: 1, c: MUT }), i % 5 === 0 ? '' : ''));
  for (let x = 40; x < 440; x += 25) body.push(S.rect(x, 262, 25, 20, { fill: GREEN, fop: 0.1, sw: 1 }));
  body.push(S.line(40, 284, 440, 284, { c: MUT, w: 2 }));
  // vein
  body.push(S.circle(240, 168, 42, { c: BROWN, sw: 2, fill: FILL, fop: 0.95 }), S.circle(240, 168, 36, { c: MUT, sw: 1, dash: '2 2' }));
  body.push(S.circle(228, 156, 6, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(246, 152, 6, { fill: BROWN, fop: 0.55, c: BROWN }), S.circle(238, 140, 4, { fill: YEL, c: BROWN, sw: 1 }));
  body.push(S.ellipse(240, 192, 16, 10, { fill: GREEN, fop: 0.55, c: GREEN }));
  // stomata on the lower epidermis
  [130, 330].forEach((x) => {
    body.push(S.rect(x - 14, 262, 28, 20, { fill: FILL, c: FILL, sw: 0 }), S.ellipse(x - 5, 272, 5, 10, { fill: GREEN, fop: 0.6, sw: 1.3 }), S.ellipse(x + 5, 272, 5, 10, { fill: GREEN, fop: 0.6, sw: 1.3 }), S.ellipse(x, 250, 14, 9, { sw: 1, c: MUT, dash: '2 2' }));
  });
  const L = named
    ? [
        lab(596, 60, 'Cuticle', { a: 'end' }), lead(540, 56, [420, 62]),
        lab(596, 92, 'Upper epidermis', { a: 'end' }), lead(500, 88, [420, 76]),
        lab(596, 124, 'Palisade parenchyma', { a: 'end' }), lead(490, 120, [405, 118]),
        lab(596, 160, 'Xylem', { a: 'end' }), lead(560, 156, [252, 152]),
        lab(596, 196, 'Phloem', { a: 'end' }), lead(560, 192, [254, 192]),
        lab(596, 230, 'Spongy parenchyma', { a: 'end' }), lead(490, 226, [414, 228]),
        lab(596, 262, 'Air space', { a: 'end' }), lead(550, 258, [336, 252]),
        lab(596, 298, 'Guard cell', { a: 'end' }), lead(550, 294, [336, 276]),
        lab(596, 330, 'Lower epidermis', { a: 'end' }), lead(500, 326, [380, 284]),
        lab(4, 320, 'Bundle sheath', {}), lead(90, 316, [204, 192]),
        lab(4, 340, 'Stoma (pore between the guard cells)', { size: 10 }),
      ]
    : [
        lab(596, 92, t('epi', 'x'), { a: 'end', ...o }), lead(560, 88, [420, 76]),
        lab(596, 124, t('palisade', 'x'), { a: 'end', ...o }), lead(560, 120, [405, 118]),
        lab(596, 160, t('xylem', 'x'), { a: 'end', ...o }), lead(560, 156, [252, 152]),
        lab(596, 230, t('spongy', 'x'), { a: 'end', ...o }), lead(560, 226, [414, 228]),
        lab(596, 298, t('guard', 'x'), { a: 'end', ...o }), lead(560, 294, [336, 276]),
      ];
  return svgDoc(
    600,
    350,
    named
      ? 'Transverse section of a dicot (dorsiventral) leaf, schematic. A cuticle covers the upper epidermis. Beneath it lie a layer of tall, closely packed palisade parenchyma cells, then loosely arranged spongy parenchyma cells with air spaces, then the lower epidermis, which carries stomata, each with two bean-shaped guard cells and an air space beneath. A vascular bundle in the middle has xylem towards the upper side, phloem towards the lower side, and a bundle sheath around it'
      : 'Transverse section of a dicot leaf with five parts marked by letters. A is the layer of tall, closely packed cells just below the upper surface. B is a pair of bean-shaped cells surrounding a pore in the lower surface. C is the outermost cell layer on the upper surface. D is the loosely arranged cell layer with air spaces. E is the water-conducting tissue in the vein, on its upper side',
    body.join('') + L.join(''),
  );
}
export const LEAF = leafDoc(true);
export const LEAF_LETTERED = leafDoc(false);

export const ALL = { TISSUES, BUNDLES, DICOTROOT, MONOROOT, DICOTSTEM, MONOSTEM, LEAF, LEAF_LETTERED };
