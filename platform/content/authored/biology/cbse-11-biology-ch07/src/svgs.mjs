// SVG diagrams for ch07 Structural Organisation in Animals (allow-listed elements, palette colours only).
// Tissues and frog organs are drawn as neutral, labelled schematics (not to scale).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();
/** Mirror a path about x = cx (absolute commands with "x y" pairs only). */
const mirror = (d, cx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f1(2 * cx - Number(x))} ${y}`);

// 1. Simple epithelia: squamous, cuboidal, columnar, ciliated columnar
const EP = [
  { name: 'Squamous', h: 10, ex: ['Blood vessel walls,', 'lung air sacs'] },
  { name: 'Cuboidal', h: 26.5, ex: ['Gland ducts,', 'kidney tubules'] },
  { name: 'Columnar', h: 60, ex: ['Stomach and', 'intestine lining'] },
  { name: 'Ciliated', h: 60, ex: ['Bronchioles,', 'fallopian tubes'], cilia: true },
];
const epPanel = (e, i) => {
  const x0 = 12 + i * 118;
  const base = 152;
  const w = 26.5;
  const out = [];
  for (let k = 0; k < 4; k++) {
    const x = x0 + k * w;
    out.push(S.rect(x, base - e.h, w, e.h, { fill: 'var(--diagram-green)', fop: 0.15, sw: 1.2 }));
    const cx = x + w / 2;
    if (e.h < 15) out.push(S.ellipse(cx, base - e.h / 2, 6, 2.6, { fill: 'var(--diagram-muted)', sw: 0.6 }));
    else if (e.h < 30) out.push(S.circle(cx, base - e.h / 2, 5, { fill: 'var(--diagram-muted)', sw: 0.6 }));
    else out.push(S.ellipse(cx, base - 18, 5, 8, { fill: 'var(--diagram-muted)', sw: 0.6 }));
    if (e.cilia) for (let c = 0; c < 4; c++) out.push(S.line(x + 4 + c * 6, base - e.h, x + 2 + c * 6, base - e.h - 10, { w: 1, c: 'var(--diagram-blue)' }));
  }
  out.push(S.line(x0 - 2, base + 2, x0 + 4 * w + 2, base + 2, { w: 3, c: 'var(--diagram-accent)' }));
  out.push(lab(x0 + 2 * w, 176, e.name, { a: 'middle', w: 'bold' }));
  out.push(S.lines(x0 + 2 * w, 192, e.ex, { a: 'middle', size: 10, c: 'var(--diagram-muted)' }));
  return out.join('');
};
export const EPITHELIA = svgDoc(
  480,
  236,
  'Simple epithelia, each a single layer of cells resting on a basement membrane: squamous (thin flat cells with flattened nuclei; walls of blood vessels and air sacs of lungs), cuboidal (cube-like cells with round central nuclei; ducts of glands and tubules of nephrons), columnar (tall cells with nuclei near the base; lining of stomach and intestine) and ciliated columnar (columnar cells bearing cilia on the free surface; bronchioles and fallopian tubes)',
  [
    lab(240, 20, 'Simple epithelia: one layer of cells', { a: 'middle', w: 'bold' }),
    ...EP.map(epPanel),
    lab(130 + 53, 104, 'Nucleus', { a: 'middle', size: 10 }),
    S.lead(130 + 40, 107, 130 + 40, 132),
    lab(366 + 66, 66, 'Cilia', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    S.lead(366 + 60, 70, 366 + 56, 82),
    lab(240, 228, 'Thick line under each tissue: basement membrane', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 2. Connective tissues: areolar (loose), cartilage and bone
const lacunae = (cx, cy, pts, cell) => pts.map(([dx, dy, two]) => S.ellipse(cx + dx, cy + dy, 11, 8, { fill: 'var(--diagram-fill)', sw: 1 }) + (two ? S.circle(cx + dx - 4, cy + dy, 3.5, cell) + S.circle(cx + dx + 4, cy + dy, 3.5, cell) : S.circle(cx + dx, cy + dy, 4, cell))).join('');
const CELL = { fill: 'var(--diagram-green)', fop: 0.7, sw: 0.6 };
const osteo = (cx, cy) => [[30, 0], [-30, 8], [6, -40], [-12, 42], [40, 30], [-42, -26], [36, -34], [0, 18]].map(([dx, dy]) => S.ellipse(cx + dx, cy + dy, 6, 3, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 0.6 })).join('');
export const CONNECTIVE = svgDoc(
  480,
  250,
  'Connective tissues. Areolar tissue: wavy collagen fibres and thin elastic fibres in a matrix, with a spindle-shaped fibroblast, a macrophage and a mast cell with granules. Cartilage: chondrocytes, singly or in pairs, inside small cavities (lacunae) in a solid, pliable matrix. Bone: osteocytes in lacunae within a hard matrix of calcium salts and collagen fibres, arranged in rings',
  [
    lab(110, 22, 'Areolar tissue', { a: 'middle', w: 'bold' }),
    S.rect(10, 34, 200, 150, { c: 'var(--diagram-muted)', sw: 1, rx: 6 }),
    S.path('M12 64 C60 44 100 94 208 72', { c: 'var(--diagram-brown)', w: 4, op: 0.75 }),
    S.path('M12 158 C70 136 120 176 208 140', { c: 'var(--diagram-brown)', w: 4, op: 0.75 }),
    S.path('M12 104 C70 96 130 112 208 104', { c: 'var(--diagram-blue)', w: 1 }),
    S.path('M44 36 C70 90 110 120 152 182', { c: 'var(--diagram-blue)', w: 1 }),
    S.path('M38 120 Q62 106 86 120 Q62 134 38 120 Z', { fill: 'var(--diagram-green)', fop: 0.35, w: 1 }),
    S.ellipse(62, 120, 7, 3.5, { fill: 'var(--diagram-muted)', sw: 0.6 }),
    S.path('M150 56 C164 50 176 60 172 72 C170 84 156 88 146 80 C136 72 138 60 150 56 Z', { fill: 'var(--diagram-yellow)', fop: 0.4, w: 1 }),
    S.circle(157, 69, 4.5, { fill: 'var(--diagram-muted)', sw: 0.6 }),
    S.circle(176, 120, 12, { fill: 'var(--diagram-red)', fop: 0.15, sw: 1 }),
    ...[[-5, -5], [4, -6], [6, 3], [-3, 5], [-7, 1], [1, -1]].map(([dx, dy]) => S.circle(176 + dx, 120 + dy, 1.5, { fill: 'var(--diagram-red)', sw: 0 })),
    lab(14, 202, 'Collagen fibre', { size: 10, c: 'var(--diagram-brown)' }), S.lead(40, 194, 36, 162),
    lab(110, 202, 'Elastic fibre', { size: 10, c: 'var(--diagram-blue)' }), S.lead(132, 194, 132, 160),
    lab(14, 222, 'Fibroblast', { size: 10 }), S.lead(30, 214, 50, 125),
    lab(84, 222, 'Macrophage', { size: 10 }), S.lead(120, 214, 148, 82),
    lab(154, 222, 'Mast cell', { size: 10 }), S.lead(178, 214, 178, 133),
    lab(290, 22, 'Cartilage', { a: 'middle', w: 'bold' }),
    S.circle(290, 110, 56, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 1.5 }),
    lacunae(290, 110, [[-26, -24], [10, -32], [30, -4, true], [-30, 12, true], [2, 4], [-6, 36], [26, 30]], CELL),
    lab(290, 190, 'Chondrocytes in lacunae', { a: 'middle', size: 10 }), S.lead(290, 181, 286, 152),
    lab(290, 204, 'in a pliable matrix', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(410, 22, 'Bone', { a: 'middle', w: 'bold' }),
    S.circle(410, 110, 56, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1.5 }),
    S.circle(410, 110, 46, { c: 'var(--diagram-muted)', sw: 0.8, dash: '3 3' }),
    S.circle(410, 110, 34, { c: 'var(--diagram-muted)', sw: 0.8, dash: '3 3' }),
    S.circle(410, 110, 22, { c: 'var(--diagram-muted)', sw: 0.8, dash: '3 3' }),
    osteo(410, 110),
    lab(410, 190, 'Osteocytes in lacunae', { a: 'middle', size: 10 }), S.lead(410, 181, 398, 153),
    lab(410, 204, 'hard matrix: calcium', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(410, 217, 'salts and collagen', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Muscle tissue: skeletal, smooth, cardiac
const striae = (x, y, w, h, step = 5) => {
  const out = [];
  for (let sx = x + 3; sx < x + w - 1; sx += step) out.push(S.line(sx, y + 1, sx, y + h - 1, { c: 'var(--diagram-muted)', w: 0.7 }));
  return out.join('');
};
const MUSC_FILL = { fill: 'var(--diagram-red)', fop: 0.15, sw: 1.2 };
const NUC = { fill: 'var(--diagram-muted)', sw: 0.6 };
const spindle = (x1, x2, y, h) => `M${x1} ${y} Q${(x1 + x2) / 2} ${y - h} ${x2} ${y} Q${(x1 + x2) / 2} ${y + h} ${x1} ${y} Z`;
export const MUSCLES = svgDoc(
  480,
  214,
  'Three kinds of muscle tissue. Skeletal muscle: long, unbranched, cylindrical fibres with cross striations and many nuclei near the edge; voluntary, as in the biceps. Smooth muscle: spindle-shaped cells tapering at both ends, each with one central nucleus and no striations; involuntary, in the walls of blood vessels, stomach and intestine. Cardiac muscle: branched, striated fibres joined end to end at intercalated discs (communication junctions) so that the cells contract as a unit; involuntary, only in the heart',
  [
    S.rect(12, 46, 140, 30, MUSC_FILL), striae(12, 46, 140, 30),
    S.rect(12, 90, 140, 30, MUSC_FILL), striae(12, 90, 140, 30),
    ...[30, 75, 120].map((x) => S.ellipse(x, 49, 7, 2.5, NUC)),
    ...[50, 100, 140].map((x) => S.ellipse(x, 117, 7, 2.5, NUC)),
    lab(82, 148, 'Skeletal (striated)', { a: 'middle', w: 'bold' }),
    S.lines(82, 164, ['Many nuclei; voluntary;', 'biceps, limb muscles'], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.path(spindle(172, 310, 56, 16), MUSC_FILL), S.ellipse(241, 56, 7, 3, NUC),
    S.path(spindle(190, 322, 84, 16), MUSC_FILL), S.ellipse(256, 84, 7, 3, NUC),
    S.path(spindle(166, 300, 112, 16), MUSC_FILL), S.ellipse(233, 112, 7, 3, NUC),
    lab(245, 148, 'Smooth (unstriated)', { a: 'middle', w: 'bold' }),
    S.lines(245, 164, ['Spindle cells; involuntary;', 'gut and blood vessels'], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.rect(338, 40, 132, 22, MUSC_FILL), striae(338, 40, 132, 22, 6),
    S.rect(338, 100, 132, 22, MUSC_FILL), striae(338, 100, 132, 22, 6),
    S.path('M384 62 L404 62 L428 100 L408 100 Z', MUSC_FILL),
    S.line(372, 40, 372, 62, { w: 3, c: 'var(--diagram-accent)' }),
    S.line(446, 40, 446, 62, { w: 3, c: 'var(--diagram-accent)' }),
    S.line(362, 100, 362, 122, { w: 3, c: 'var(--diagram-accent)' }),
    S.line(452, 100, 452, 122, { w: 3, c: 'var(--diagram-accent)' }),
    S.ellipse(354, 51, 6, 3, NUC), S.ellipse(420, 51, 6, 3, NUC), S.ellipse(392, 111, 6, 3, NUC),
    lab(404, 148, 'Cardiac', { a: 'middle', w: 'bold' }),
    S.lines(404, 164, ['Branched, striated;', 'involuntary; heart only'], { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(404, 30, 'Intercalated disc', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }), S.lead(430, 33, 444, 40),
    lab(240, 206, 'Short thick bars in cardiac muscle: intercalated discs (communication junctions)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Neural tissue: a neuron with neuroglial cells
const glia = (cx, cy) => S.circle(cx, cy, 5, { fill: 'var(--diagram-green)', fop: 0.6, sw: 0.8 }) + [0, 1, 2, 3, 4].map((k) => {
  const a = (k / 5) * Math.PI * 2 + 0.3;
  return S.line(cx + 5 * Math.cos(a), cy + 5 * Math.sin(a), cx + 13 * Math.cos(a), cy + 13 * Math.sin(a), { w: 1, c: 'var(--diagram-green)' });
}).join('');
export const NEURON = svgDoc(
  480,
  200,
  'Neural tissue: a neuron with a cell body containing the nucleus, several short branched dendrites, and a long axon ending in branched axon terminals with knobs; an arrow shows the impulse travelling from the dendrites through the cell body along the axon. Small neuroglial cells lie around the neuron; they protect and support neurons and make up more than half the volume of neural tissue',
  [
    S.path('M92 80 L58 54 L36 50 M58 54 L48 30 M90 108 L54 128 L30 126 M54 128 L50 152 M100 72 L86 38 L70 26 M86 38 L96 18', { w: 1.6 }),
    S.circle(112, 94, 26, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.6 }),
    S.circle(112, 94, 9, { fill: 'var(--diagram-muted)', sw: 0.8 }),
    S.line(138, 94, 380, 94, { w: 3 }),
    S.path('M380 94 L414 70 M380 94 L420 94 M380 94 L414 118', { w: 1.6 }),
    S.circle(416, 69, 4, { fill: 'currentColor', sw: 0 }), S.circle(423, 94, 4, { fill: 'currentColor', sw: 0 }), S.circle(416, 119, 4, { fill: 'currentColor', sw: 0 }),
    S.arrow(170, 116, 330, 116, { c: 'var(--diagram-accent)', w: 1.5 }),
    lab(250, 134, 'Direction of impulse', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    glia(200, 54), glia(290, 152), glia(232, 170), glia(330, 52),
    lab(4, 172, 'Dendrites'), S.lead(30, 162, 44, 136),
    lab(120, 22, 'Cell body', {}), S.lead(130, 26, 122, 68),
    lab(168, 190, 'Nucleus'), S.lead(180, 180, 116, 102),
    lab(250, 84, 'Axon', { a: 'middle' }),
    lab(440, 70, 'Axon', { size: 10 }), lab(440, 82, 'terminals', { size: 10 }), S.lead(438, 76, 426, 90),
    lab(340, 190, 'Neuroglial cells', { size: 10, c: 'var(--diagram-green)' }), S.lead(360, 180, 300, 158),
  ].join(''),
);

// 5. Frog, external features (dorsal view)
const CX = 210;
const foreL = 'M164 150 C144 152 128 158 122 170 C118 178 116 186 116 192';
const hindL = 'M168 214 C140 208 118 204 104 214 C94 222 110 236 126 244 C136 250 140 258 138 268';
const handL = [[116, 192, 104, 200], [116, 192, 110, 204], [116, 192, 120, 205], [116, 192, 128, 200]];
const footToes = [[-34, 22], [-20, 30], [-4, 34], [12, 30], [24, 20]];
const footL = () => {
  const [fx, fy] = [138, 268];
  const tips = footToes.map(([dx, dy]) => [fx + dx, fy + dy]);
  const web = `M${fx} ${fy} ${tips.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(' ')} Z`;
  return S.path(web, { fill: 'var(--diagram-green)', fop: 0.2, w: 0.8 }) + tips.map(([x, y]) => S.line(fx, fy, x, y, { w: 1.6 })).join('');
};
const footR = () => {
  const [fx, fy] = [2 * CX - 138, 268];
  const tips = footToes.map(([dx, dy]) => [fx - dx, fy + dy]);
  const web = `M${fx} ${fy} ${tips.map(([x, y]) => `L${f1(x)} ${f1(y)}`).join(' ')} Z`;
  return S.path(web, { fill: 'var(--diagram-green)', fop: 0.2, w: 0.8 }) + tips.map(([x, y]) => S.line(fx, fy, x, y, { w: 1.6 })).join('');
};
export const FROG_EXT = svgDoc(
  440,
  320,
  'External features of a frog, dorsal view, schematic: the body has a head and a trunk with no neck and no tail; a pair of nostrils above the mouth; a pair of bulging eyes, each protected by a nictitating membrane; a membranous tympanum behind each eye; short forelimbs ending in four digits and longer, more muscular hind limbs ending in five webbed digits; the dorsal skin is olive green with dark irregular spots',
  [
    S.path(foreL, { w: 6, cap: 'round', c: 'var(--diagram-green)' }), S.path(mirror(foreL, CX), { w: 6, cap: 'round', c: 'var(--diagram-green)' }),
    ...handL.map(([a, b, c, d]) => S.line(a, b, c, d, { w: 1.8 })), ...handL.map(([a, b, c, d]) => S.line(2 * CX - a, b, 2 * CX - c, d, { w: 1.8 })),
    S.path(hindL, { w: 10, cap: 'round', c: 'var(--diagram-green)' }), S.path(mirror(hindL, CX), { w: 10, cap: 'round', c: 'var(--diagram-green)' }),
    footL(), footR(),
    S.path('M210 40 C240 40 262 70 266 100 C276 140 274 200 250 228 C236 242 184 242 170 228 C146 200 144 140 154 100 C158 70 180 40 210 40 Z', { fill: 'var(--diagram-green)', fop: 0.3, w: 2 }),
    ...[[196, 140, 9, 6], [228, 160, 8, 5], [204, 190, 10, 6], [236, 208, 7, 4], [184, 214, 7, 4], [218, 118, 6, 4]].map(([x, y, a, b]) => S.ellipse(x, y, a, b, { fill: 'var(--diagram-brown)', fop: 0.45, sw: 0 })),
    S.circle(188, 78, 10, { fill: 'var(--diagram-fill)', sw: 1.5 }), S.circle(232, 78, 10, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.circle(188, 78, 4, { fill: 'currentColor', sw: 0 }), S.circle(232, 78, 4, { fill: 'currentColor', sw: 0 }),
    S.circle(203, 52, 2, { fill: 'currentColor', sw: 0 }), S.circle(217, 52, 2, { fill: 'currentColor', sw: 0 }),
    S.circle(170, 104, 8, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1 }), S.circle(250, 104, 8, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1 }),
    S.line(150, 118, 270, 118, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(4, 44, 'Nostril'), S.lead(46, 48, 200, 52),
    lab(4, 74, 'Eye (with'), lab(4, 87, 'nictitating membrane)'), S.lead(64, 78, 178, 78),
    lab(4, 116, 'Tympanum'), S.lead(62, 112, 162, 104),
    lab(4, 166, 'Forelimb:'), lab(4, 179, 'four digits'), S.lead(60, 174, 114, 192),
    lab(4, 296, 'Hind limb: five'), lab(4, 309, 'webbed digits'), S.lead(70, 300, 112, 288),
    lab(436, 74, 'Head', { a: 'end' }), S.lead(406, 70, 262, 90),
    lab(436, 166, 'Trunk', { a: 'end' }), S.lead(404, 162, 272, 166),
    lab(436, 106, 'No neck:', { a: 'end', size: 10, c: 'var(--diagram-muted)' }), lab(436, 119, 'head joins trunk', { a: 'end', size: 10, c: 'var(--diagram-muted)' }),
    lab(436, 250, 'No tail', { a: 'end', size: 10, c: 'var(--diagram-muted)' }),
    lab(436, 204, 'Dark spots on', { a: 'end', size: 10, c: 'var(--diagram-brown)' }), lab(436, 217, 'olive-green skin', { a: 'end', size: 10, c: 'var(--diagram-brown)' }), S.lead(372, 206, 240, 208),
  ].join(''),
);

// 6. Frog heart (ventral view, schematic)
export const FROG_HEART = svgDoc(
  440,
  282,
  'Heart of the frog, ventral view, schematic, inside the pericardium: two atria (right and left) above a single conical ventricle, making three chambers; a triangular sinus venosus on the dorsal side (dashed) receives blood from the venae cavae and opens into the right atrium; the conus arteriosus, a sac-like tube, leaves the ventricle on the ventral side and divides into arteries; arrows show the path of blood',
  [
    S.ellipse(220, 136, 132, 116, { c: 'var(--diagram-muted)', sw: 1, dash: '5 4' }),
    S.path('M126 168 L170 176 L140 222 Z', { fill: 'var(--diagram-blue)', fop: 0.15, w: 1.2, dash: '4 3' }),
    S.ellipse(176, 108, 44, 32, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.6 }),
    S.ellipse(264, 108, 44, 32, { fill: 'var(--diagram-red)', fop: 0.2, sw: 1.6 }),
    S.path('M160 140 L280 140 Q272 214 220 238 Q168 214 160 140 Z', { fill: 'var(--diagram-red)', fop: 0.3, w: 1.8 }),
    S.path('M194 150 L210 150 L224 60 L208 60 Z', { fill: 'var(--diagram-yellow)', fop: 0.45, w: 1.4 }),
    S.path('M208 60 L180 30 M224 60 L254 30', { w: 2.5 }),
    S.arrow(40, 160, 124, 180, { c: 'var(--diagram-blue)', w: 2 }),
    S.arrow(56, 240, 134, 214, { c: 'var(--diagram-blue)', w: 2 }),
    S.arrow(206, 50, 182, 26, { w: 1.2, size: 6 }), S.arrow(226, 50, 252, 26, { w: 1.2, size: 6 }),
    lab(4, 150, 'Venae cavae', { c: 'var(--diagram-blue)' }),
    lab(4, 74, 'Right atrium'), S.lead(80, 78, 140, 98),
    lab(4, 262, 'Sinus venosus (dorsal),', { size: 10 }), lab(4, 275, 'opens into right atrium', { size: 10 }),
    S.lead(122, 252, 140, 224),
    lab(436, 74, 'Left atrium', { a: 'end' }), S.lead(370, 78, 300, 98),
    lab(436, 200, 'Ventricle (one)', { a: 'end' }), S.lead(352, 196, 254, 196),
    lab(436, 40, 'Conus arteriosus', { a: 'end' }), S.lead(340, 44, 220, 84),
    lab(436, 246, 'Pericardium', { a: 'end', c: 'var(--diagram-muted)' }), S.lead(360, 240, 320, 214),
    lab(130, 20, 'Arteries', { a: 'end', size: 10 }),
  ].join(''),
);

// 7. Male frog urinogenital system (ventral view, schematic)
const KID = { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.5 };
export const FROG_UROGEN = svgDoc(
  440,
  300,
  'Male urinogenital system of the frog, ventral view, schematic: a pair of dark red, elongated kidneys on either side of the midline; a yellowish ovoid testis attached to the upper part of each kidney by a fold of peritoneum (mesorchium); ten to twelve fine vasa efferentia run from each testis into the kidney and open into Bidder’s canal inside it; a urinogenital duct leaves each kidney and opens into the cloaca; a thin-walled urinary bladder lies ventral to the rectum and also opens into the cloaca',
  [
    S.ellipse(176, 140, 18, 62, KID), S.ellipse(264, 140, 18, 62, KID),
    S.line(170, 96, 170, 186, { c: 'var(--diagram-accent)', w: 1.2, dash: '4 3' }),
    S.line(270, 96, 270, 186, { c: 'var(--diagram-accent)', w: 1.2, dash: '4 3' }),
    S.ellipse(130, 96, 13, 24, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.5 }),
    S.ellipse(310, 96, 13, 24, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.5 }),
    ...[84, 92, 100, 108].map((y) => S.line(143, y, 160, y + 6, { w: 1 }) + S.line(297, y, 280, y + 6, { w: 1 })),
    S.path('M180 200 C186 226 200 246 214 262', { w: 2.2, c: 'var(--diagram-blue)' }),
    S.path('M260 200 C254 226 240 246 226 262', { w: 2.2, c: 'var(--diagram-blue)' }),
    S.rect(212, 196, 16, 60, { fill: 'var(--diagram-brown)', fop: 0.25, sw: 1 }),
    S.ellipse(220, 238, 22, 12, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 1.2 }),
    S.circle(220, 268, 10, { fill: 'var(--diagram-brown)', fop: 0.45, sw: 1.5 }),
    lab(4, 60, 'Testis'), S.lead(40, 64, 120, 80),
    lab(4, 132, 'Vasa efferentia'), S.lead(90, 128, 150, 100),
    lab(4, 190, 'Kidney'), S.lead(42, 186, 162, 170),
    lab(4, 240, 'Urinogenital duct', { c: 'var(--diagram-blue)' }), S.lead(104, 236, 192, 232),
    lab(436, 60, 'Bidder’s canal', { a: 'end', c: 'var(--diagram-accent)' }), lab(436, 73, '(inside kidney)', { a: 'end', size: 10, c: 'var(--diagram-accent)' }), S.lead(360, 70, 272, 112),
    lab(436, 198, 'Rectum', { a: 'end' }), S.lead(392, 196, 229, 214),
    lab(436, 240, 'Urinary bladder', { a: 'end' }), S.lead(352, 238, 243, 239),
    lab(436, 284, 'Cloaca', { a: 'end' }), S.lead(394, 280, 230, 270),
  ].join(''),
);

export const ALL = { EPITHELIA, CONNECTIVE, MUSCLES, NEURON, FROG_EXT, FROG_HEART, FROG_UROGEN };
