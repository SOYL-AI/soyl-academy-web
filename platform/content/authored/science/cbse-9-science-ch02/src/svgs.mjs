// Hand-drawn SVG schematics for ch02 Tissues (allow-listed elements, palette colours only). All schematic, not to scale.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const B = 'var(--diagram-blue)';
const G = 'var(--diagram-green)';
const R = 'var(--diagram-red)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';

function spacingOk(ys, gap = 14) {
  const a = [...ys].sort((p, q) => p - q);
  for (let i = 1; i < a.length; i++) if (a[i] - a[i - 1] < gap) return false;
  return true;
}
/** Panel title with a one-line caption under it. */
const heading = (cx, y, t1, t2) => lab(cx, y, t1, { a: 'middle', w: 'bold', size: 12 }) + (t2 ? lab(cx, y + 14, t2, { a: 'middle', size: 10, c: M }) : '');

// ---------------------------------------------------------------- 1. where the meristems are
const L1 = [
  ['L', 48, 'Apical meristem (shoot tip)', 292, 66],
  ['L', 132, 'Leaf', 232, 140],
  ['L', 214, 'Intercalary meristem at the base of an internode', 292, 214],
  ['L', 350, 'Ground level', 120, 322],
  ['R', 392, 'Apical meristem (root tip)', 308, 382],
];
chk(spacingOk(L1.filter((x) => x[0] === 'L').map((x) => x[1])), 'meristems: left labels are at least 14 px apart');
const stemX = 300;
const ground = 322;
function leaf(x, y, dir) {
  return S.path(`M${x} ${y} q${dir * 40} -34 ${dir * 78} -6 q${-dir * 38} 30 ${-dir * 78} 6`, { c: G, w: 2, fill: G, fop: 0.35 });
}
export const MERISTEMS = svgDoc(
  620,
  420,
  'Schematic of a plant showing where meristematic tissue lies. Apical meristem at the shoot tip and the root tip makes the plant longer. Intercalary meristem at the base of an internode or leaf, as in grass, also adds length. Lateral meristem, the cambium, is a ring in the stem and root that makes them thicker. A cross-section inset shows the cambium ring between xylem and phloem. Schematic, not to scale.',
  [
    S.line(120, ground, 520, ground, { c: BR, w: 2, dash: '6 4' }),
    lab(122, ground + 15, 'Ground level', { size: 10, c: M }),
    S.line(stemX, 60, stemX, ground, { c: G, w: 7, cap: 'round' }),
    leaf(stemX, 140, -1),
    leaf(stemX, 140 + 0, 1),
    leaf(stemX, 250, -1),
    leaf(stemX, 250, 1),
    // roots
    S.path(`M${stemX} ${ground} L${stemX} 385`, { c: BR, w: 5, cap: 'round' }),
    S.path(`M${stemX} 345 q-30 8 -50 30`, { c: BR, w: 3, cap: 'round' }),
    S.path(`M${stemX} 350 q30 8 52 28`, { c: BR, w: 3, cap: 'round' }),
    // apical meristems
    S.circle(stemX, 60, 9, { c: R, sw: 2, fill: R, fop: 0.35 }),
    S.circle(stemX, 387, 9, { c: R, sw: 2, fill: R, fop: 0.35 }),
    // intercalary meristem band just above a node
    S.rect(stemX - 9, 196, 18, 20, { c: R, sw: 2, fill: R, fop: 0.35, rx: 3 }),
    lab(250, 48, 'Apical meristem (shoot tip)', { a: 'end' }),
    S.lead(254, 44, stemX - 11, 58),
    lab(230, 108, 'Leaf', { a: 'end', c: G }),
    S.lead(234, 104, stemX - 40, 134),
    lab(268, 192, 'Intercalary meristem', { a: 'end' }),
    lab(268, 205, 'at the base of an internode', { a: 'end' }),
    S.lead(272, 200, stemX - 11, 206),
    lab(250, 386, 'Apical meristem (root tip)', { a: 'end' }),
    S.lead(254, 382, stemX - 11, 386),
    // lateral meristem inset: cross-section of a stem
    S.circle(500, 160, 58, { c: BR, sw: 6 }),
    S.circle(500, 160, 52, { c: G, sw: 1, fill: G, fop: 0.15 }),
    S.circle(500, 160, 40, { c: G, sw: 6, fop: 0.5 }),
    S.circle(500, 160, 33, { c: R, sw: 4 }),
    S.circle(500, 160, 27, { c: B, sw: 6 }),
    S.circle(500, 160, 14, { c: M, sw: 1, fill: Y, fop: 0.2 }),
    lab(500, 78, 'Stem cut across', { a: 'middle', w: 'bold' }),
    lab(500, 244, 'Lateral meristem (cambium):', { a: 'middle', c: R }),
    lab(500, 258, 'makes the stem thicker', { a: 'middle', c: R }),
    S.lead(500, 226, 500, 193),
    lab(560, 160, 'Phloem', { c: G, a: 'start' }),
    S.lead(556, 157, 540, 160),
    lab(560, 176, 'Xylem', { c: B, a: 'start' }),
    S.lead(556, 173, 527, 163),
    lab(560, 118, 'Bark', { c: BR, a: 'start' }),
    S.lead(556, 115, 553, 130),
    lab(520, 408, 'Red marks show the meristems. Schematic, not to scale.', { a: 'end', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 2. simple permanent tissues
const cell = 34;
const wall = { par: 1.5, col: 3, scl: 7 };
const lumen = { par: cell - wall.par, col: cell - 2 * wall.col, scl: cell - 2 * wall.scl };
chk(wall.par < wall.col && wall.col < wall.scl, 'simple tissues: wall thickness rises from parenchyma to collenchyma to sclerenchyma');
chk(lumen.par > lumen.col && lumen.col > lumen.scl, 'simple tissues: the open space inside the cell shrinks from parenchyma to sclerenchyma');
function grid(x0, y0, n, m, draw) {
  let o = '';
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) o += draw(x0 + i * cell, y0 + j * cell, i, j);
  return o;
}
const parenchyma = grid(30, 70, 4, 4, (x, y) => S.circle(x + cell / 2, y + cell / 2, 14, { c: G, sw: wall.par, fill: G, fop: 0.14 }));
const collenchyma = grid(220, 70, 4, 4, (x, y) => S.rect(x + 5, y + 5, cell - 10, cell - 10, { c: Y, sw: 1.5, rx: 3, fill: Y, fop: 0.12 }) + [[x + 5, y + 5], [x + cell - 5, y + 5], [x + 5, y + cell - 5], [x + cell - 5, y + cell - 5]].map(([a, b]) => S.circle(a, b, 4.5, { fill: Y, c: 'none' })).join(''));
const sclerenchyma = grid(410, 70, 4, 4, (x, y) => S.rect(x + 3, y + 3, cell - 6, cell - 6, { c: BR, sw: wall.scl, rx: 2 }));
export const SIMPLE_TISSUES = svgDoc(
  600,
  290,
  'Three simple permanent plant tissues in cross-section, schematic. Parenchyma has thin-walled rounded cells with spaces between them and stores food or makes it. Collenchyma has cells with extra thickening at the corners and gives flexible support. Sclerenchyma has very thick, hard walls and a tiny space inside, and gives strength; its cells are dead.',
  [
    heading(98, 28, 'Parenchyma', 'thin walls, spaces between cells'),
    parenchyma,
    heading(288, 28, 'Collenchyma', 'corners thickened'),
    collenchyma,
    heading(478, 28, 'Sclerenchyma', 'thick hard walls, dead cells'),
    sclerenchyma,
    lab(98, 232, 'Stores food (potato), makes food (leaf)', { a: 'middle', size: 10 }),
    lab(288, 232, 'Flexible support (celery strings)', { a: 'middle', size: 10 }),
    lab(478, 232, 'Strength (coconut husk fibre, nut shell)', { a: 'middle', size: 10 }),
    lab(300, 275, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 3. xylem and phloem
const sievePlates = [150, 190, 230, 270];
chk(sievePlates.every((y, i) => i === 0 || y - sievePlates[i - 1] === 40), 'xylem and phloem: sieve plates are evenly spaced');
function vessel(x, y1, y2, rings) {
  let o = S.rect(x - 16, y1, 32, y2 - y1, { c: B, sw: 2, fill: B, fop: 0.08 });
  for (let y = y1 + 10; y < y2; y += rings) o += S.line(x - 16, y, x + 16, y, { c: B, w: 2.5 });
  return o;
}
export const XYLEM_PHLOEM = svgDoc(
  620,
  340,
  'Xylem and phloem in long section, schematic. Xylem vessels are long hollow tubes of dead cells with thick walls strengthened in rings, and they carry water and minerals upwards from the roots. Phloem has living sieve tubes, whose end walls have holes called sieve plates, and companion cells beside them. Phloem carries food made in the leaves both upwards and downwards.',
  [
    heading(150, 26, 'Xylem', 'dead cells, hollow tubes'),
    vessel(110, 60, 300, 14),
    vessel(150, 60, 300, 14),
    S.arrow(230, 280, 230, 80, { c: B, w: 3, size: 9 }),
    lab(240, 190, 'Water and', { a: 'start', c: B }),
    lab(240, 204, 'minerals up', { a: 'start', c: B }),
    lab(130, 320, 'Vessel with ring-thickened wall', { a: 'middle', size: 10 }),
    heading(470, 26, 'Phloem', 'living sieve tubes'),
    S.rect(440, 100, 36, 200, { c: G, sw: 2, fill: G, fop: 0.1 }),
    sievePlates.map((y) => S.line(440, y + 20, 476, y + 20, { c: G, w: 2, dash: '2 2' })).join(''),
    S.rect(482, 130, 14, 150, { c: A, sw: 2, rx: 4, fill: A, fop: 0.15 }),
    S.circle(489, 205, 3, { fill: A, c: 'none' }),
    S.arrow(530, 140, 530, 90, { c: G, w: 3, size: 9 }),
    S.arrow(530, 220, 530, 290, { c: G, w: 3, size: 9 }),
    lab(540, 190, 'Food', { a: 'start', c: G }),
    lab(540, 204, 'both ways', { a: 'start', c: G }),
    lab(406, 150, 'Sieve plate', { a: 'end' }),
    S.lead(410, 156, 440, 170),
    lab(406, 250, 'Sieve tube', { a: 'end' }),
    S.lead(410, 246, 440, 246),
    lab(500, 320, 'Companion cell', { a: 'middle' }),
    S.lead(494, 308, 491, 282),
    lab(310, 332, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 4. epithelial tissues
function basement(x, y, w) {
  return S.line(x, y, x + w, y, { c: M, w: 2 });
}
const epiCells = { squamous: { w: 44, h: 8, n: 3 }, cuboidal: { w: 30, h: 30, n: 4 }, columnar: { w: 22, h: 52, n: 5 }, ciliated: { w: 22, h: 52, n: 5 } };
chk(epiCells.squamous.h < epiCells.cuboidal.h && epiCells.cuboidal.h < epiCells.columnar.h, 'epithelia: cell height rises from squamous to cuboidal to columnar');
function epiPanel(x0, name, kind, note, ex) {
  const base = 130;
  const { w, h, n } = epiCells[kind];
  const total = w * n;
  const xs = x0 + (140 - total) / 2;
  let o = heading(x0 + 70, 26, name) + basement(xs - 6, base, total + 12);
  for (let i = 0; i < n; i++) {
    const x = xs + i * w;
    o += S.rect(x, base - h, w, h, { c: A, sw: 1.5, fill: Y, fop: 0.15 });
    if (kind === 'squamous') o += S.ellipse(x + w / 2, base - h / 2, 8, 2.5, { fill: A, fop: 0.4, c: 'none' });
    else o += S.ellipse(x + w / 2, base - (kind === 'cuboidal' ? h / 2 : 12), kind === 'cuboidal' ? 6 : 5, kind === 'cuboidal' ? 6 : 8, { fill: A, fop: 0.4, c: 'none' });
    if (kind === 'ciliated') for (const dx of [5, 11, 17]) o += S.path(`M${x + dx} ${base - h} q-3 -6 0 -12`, { c: R, w: 1.5 });
  }
  o += lab(x0 + 70, 156, note, { a: 'middle', size: 10 }) + lab(x0 + 70, 170, ex, { a: 'middle', size: 10, c: M });
  return o;
}
export const EPITHELIA = svgDoc(
  600,
  212,
  'Four kinds of epithelial tissue sitting on a basement membrane, schematic. Squamous epithelium is a thin layer of flat cells, as in the lining of the mouth and blood vessels. Cuboidal epithelium has cube-shaped cells, as in kidney tubules. Columnar epithelium has tall cells, as in the lining of the small intestine. Ciliated columnar epithelium has tiny hair-like cilia, as in the windpipe. Schematic, not to scale.',
  [
    epiPanel(0, 'Squamous', 'squamous', 'Flat; smooth lining', 'mouth, blood vessels'),
    epiPanel(150, 'Cuboidal', 'cuboidal', 'Cube-shaped; absorbs', 'kidney tubules'),
    epiPanel(300, 'Columnar', 'columnar', 'Tall; absorbs, secretes', 'small intestine'),
    epiPanel(450, 'Ciliated', 'ciliated', 'Cilia sweep mucus', 'windpipe'),
    lab(300, 200, 'Grey line: basement membrane. Schematic, not to scale.', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. connective tissues
const rbc = [[28, 45], [62, 38], [95, 60], [40, 90], [78, 100], [112, 85], [30, 120], [55, 125]];
chk(rbc.every(([x, y]) => x - 11 > 0 && x + 11 < 140 && y + 20 - 11 > 40 && y + 20 + 11 < 170), 'connective: every red blood cell lies inside the blood panel');
const nRBC = rbc.length;
function bloodPanel(x0) {
  let o = heading(x0 + 70, 26, 'Blood') + S.rect(x0, 40, 140, 130, { c: M, sw: 1, fill: Y, fop: 0.12, rx: 6 });
  for (const [x, y] of rbc) o += S.circle(x0 + x, y + 20, 11, { c: R, sw: 1.5, fill: R, fop: 0.35 }) + S.circle(x0 + x, y + 20, 4, { c: R, sw: 0.5, fill: 'none', fop: 0.2 });
  o += S.circle(x0 + 108, 138, 15, { c: A, sw: 1.5, fill: A, fop: 0.18 }) + S.circle(x0 + 104, 136, 5, { fill: A, fop: 0.5, c: 'none' }) + S.circle(x0 + 113, 141, 5, { fill: A, fop: 0.5, c: 'none' });
  o += S.circle(x0 + 20, 75, 3, { fill: Y, c: 'none' }) + S.circle(x0 + 52, 168, 3, { fill: Y, c: 'none' });
  o += lab(x0 + 70, 196, 'Red cells carry oxygen', { a: 'middle', size: 10 }) + lab(x0 + 70, 209, 'White cells fight germs', { a: 'middle', size: 10 }) + lab(x0 + 70, 222, 'Platelets (dots) clot blood', { a: 'middle', size: 10, c: M });
  return o;
}
function bonePanel(x0) {
  let o = heading(x0 + 70, 26, 'Bone') + S.rect(x0, 40, 140, 130, { c: M, sw: 1, fill: BR, fop: 0.1, rx: 6 });
  for (const r0 of [40, 28, 16]) o += S.circle(x0 + 70, 105, r0, { c: BR, sw: 1.5 });
  o += S.circle(x0 + 70, 105, 6, { c: R, sw: 1.5, fill: R, fop: 0.3 });
  for (const [dx, dy] of [[0, -34], [34, 0], [0, 34], [-34, 0], [24, 24], [-24, -24]]) o += S.ellipse(x0 + 70 + dx, 105 + dy, 4, 2.5, { fill: BR, fop: 0.6, c: 'none' });
  o += lab(x0 + 70, 196, 'Hard matrix: calcium', { a: 'middle', size: 10 }) + lab(x0 + 70, 209, 'and phosphorus salts', { a: 'middle', size: 10 }) + lab(x0 + 70, 222, 'Supports and protects', { a: 'middle', size: 10, c: M });
  return o;
}
function cartPanel(x0) {
  let o = heading(x0 + 70, 26, 'Cartilage') + S.rect(x0, 40, 140, 130, { c: M, sw: 1, fill: B, fop: 0.12, rx: 6 });
  for (const [x, y] of [[40, 70], [100, 80], [60, 115], [105, 135], [35, 148]]) {
    o += S.ellipse(x0 + x, y + 5, 12, 9, { c: B, sw: 1.5, fill: B, fop: 0.25 });
    o += S.circle(x0 + x - 3, y + 5, 3, { fill: B, c: 'none' }) + S.circle(x0 + x + 4, y + 6, 3, { fill: B, c: 'none' });
  }
  o += lab(x0 + 70, 196, 'Cells in a firm,', { a: 'middle', size: 10 }) + lab(x0 + 70, 209, 'flexible matrix', { a: 'middle', size: 10 }) + lab(x0 + 70, 222, 'Nose, ear, windpipe rings', { a: 'middle', size: 10, c: M });
  return o;
}
function tendonPanel(x0) {
  let o = heading(x0 + 70, 26, 'Tendon or ligament') + S.rect(x0, 40, 140, 130, { c: M, sw: 1, fill: G, fop: 0.08, rx: 6 });
  for (let i = 0; i < 8; i++) o += S.path(`M${x0 + 12} ${55 + i * 15} q30 -7 58 0 t58 0`, { c: G, w: 2 });
  for (const [x, y] of [[40, 66], [100, 96], [70, 126], [35, 144]]) o += S.ellipse(x0 + x, y, 7, 3, { fill: A, fop: 0.5, c: 'none' });
  o += lab(x0 + 70, 196, 'Strong parallel fibres', { a: 'middle', size: 10 }) + lab(x0 + 70, 209, 'Tendon: muscle to bone', { a: 'middle', size: 10 }) + lab(x0 + 70, 222, 'Ligament: bone to bone', { a: 'middle', size: 10, c: M });
  return o;
}
export const CONNECTIVE = svgDoc(
  640,
  260,
  'Four connective tissues, schematic. Blood has red cells that carry oxygen, white cells and platelets in a liquid plasma. Bone has living cells in a hard matrix of calcium and phosphorus salts arranged in rings. Cartilage has cells in a firm but flexible matrix. Tendons and ligaments are dense bands of strong parallel fibres; a tendon joins muscle to bone, a ligament joins bone to bone.',
  [bloodPanel(0), bonePanel(165), cartPanel(330), tendonPanel(495), lab(320, 250, `Blood panel shows ${nRBC} red cells (schematic, not to scale)`, { a: 'middle', size: 10, c: M })].join(''),
);

// ---------------------------------------------------------------- 6. the neuron
const L6 = [
  ['T', 40, 'Dendrites', 70, 110],
  ['T', 40, 'Cell body (cyton)', 150, 150],
  ['T', 40, 'Nucleus', 150, 150],
];
void L6;
export const NEURON = svgDoc(
  640,
  250,
  'A neuron, schematic. Several short branched dendrites receive signals and pass them to the cell body, which holds the nucleus. A single long axon carries the nerve impulse away from the cell body, and its end splits into branches called nerve endings that pass the signal on. The axon can be up to about a metre long in humans.',
  [
    // dendrites
    [[-45, -60], [-62, -18], [-50, 24], [-30, 62]].map(([dx, dy]) => S.path(`M${150 + dx * 0.1} ${125 + dy * 0.1} L${130 + dx} ${125 + dy}`, { c: A, w: 3, cap: 'round' }) + S.path(`M${130 + dx} ${125 + dy} l-14 -8 M${130 + dx} ${125 + dy} l-12 10`, { c: A, w: 2, cap: 'round' })).join(''),
    S.circle(150, 125, 36, { c: A, sw: 2.5, fill: A, fop: 0.15 }),
    S.circle(150, 125, 13, { c: A, sw: 1.5, fill: A, fop: 0.45 }),
    // axon with break marks
    S.path('M186 125 L330 125', { c: A, w: 3 }),
    S.path('M342 118 l6 14 M352 118 l6 14', { c: M, w: 1.5 }),
    S.path('M366 125 L520 125', { c: A, w: 3 }),
    // nerve endings
    [[-34, 26], [0, 0], [34, -26]].map(([dy]) => S.path(`M520 125 L${548} ${125 + dy}`, { c: A, w: 2.5 }) + S.circle(552, 125 + dy, 4, { fill: A, c: 'none' })).join(''),
    S.arrow(240, 98, 330, 98, { c: R, w: 2, size: 7 }),
    lab(285, 90, 'Impulse travels this way', { a: 'middle', size: 10, c: R }),
    lab(70, 38, 'Dendrites', { a: 'middle' }),
    S.lead(78, 44, 98, 80),
    lab(150, 38, 'Cell body (cyton)', { a: 'middle' }),
    S.lead(150, 44, 150, 90),
    lab(236, 180, 'Nucleus', { a: 'middle' }),
    S.lead(228, 170, 160, 130),
    lab(430, 165, 'Axon', { a: 'middle' }),
    S.lead(430, 153, 430, 130),
    lab(570, 200, 'Nerve endings', { a: 'middle' }),
    S.lead(566, 188, 556, 152),
    lab(355, 160, 'axon can be up to', { a: 'middle', size: 10, c: M }),
    lab(355, 173, 'about 1 m long', { a: 'middle', size: 10, c: M }),
    lab(320, 242, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 7. three kinds of muscle
function stripes(x, y, w, h, n) {
  let o = '';
  for (let i = 0; i < n; i++) o += S.line(x + (i + 0.5) * (w / n), y + 2, x + (i + 0.5) * (w / n), y + h - 2, { c: BR, w: 3 });
  return o;
}
const striatedNuclei = [[40, 67], [110, 67], [170, 67], [60, 135], [130, 135], [190, 135]];
chk(striatedNuclei.length >= 3, 'muscles: striated fibre is drawn with several nuclei at its edge');
export const MUSCLES = svgDoc(
  660,
  290,
  'Three kinds of muscle tissue, schematic. Striated or skeletal muscle has long unbranched cylindrical fibres with light and dark stripes and many nuclei at the edge; it is voluntary. Smooth muscle has spindle-shaped cells with no stripes and one nucleus each; it is involuntary. Cardiac muscle is found only in the heart; its fibres are striped, branched, each with one nucleus, joined by dark lines; it is involuntary.',
  [
    heading(110, 26, 'Striated (skeletal)'),
    S.rect(10, 60, 200, 38, { c: R, sw: 2, fill: R, fop: 0.18, rx: 8 }),
    stripes(14, 60, 192, 38, 24),
    S.rect(10, 104, 200, 38, { c: R, sw: 2, fill: R, fop: 0.18, rx: 8 }),
    stripes(14, 104, 192, 38, 24),
    striatedNuclei.map(([x, y]) => S.ellipse(x, y, 6, 3, { fill: A, fop: 0.8, c: 'none' })).join(''),
    lab(110, 168, 'Stripes, many nuclei,', { a: 'middle', size: 10 }),
    lab(110, 181, 'long and unbranched', { a: 'middle', size: 10 }),
    lab(110, 198, 'Voluntary: arm and leg muscles', { a: 'middle', size: 10, c: M }),
    heading(330, 26, 'Smooth'),
    [[260, 80], [300, 120], [340, 80], [380, 120]].map(([x, y]) => S.ellipse(x + 20, y, 38, 12, { c: G, sw: 2, fill: G, fop: 0.2 }) + S.ellipse(x + 20, y, 7, 4, { fill: A, fop: 0.8, c: 'none' })).join(''),
    S.ellipse(300, 160, 38, 12, { c: G, sw: 2, fill: G, fop: 0.2 }),
    S.ellipse(300, 160, 7, 4, { fill: A, fop: 0.8, c: 'none' }),
    lab(330, 188, 'No stripes, one nucleus,', { a: 'middle', size: 10 }),
    lab(330, 201, 'spindle-shaped cells', { a: 'middle', size: 10 }),
    lab(330, 218, 'Involuntary: food pipe, blood vessels', { a: 'middle', size: 10, c: M }),
    heading(550, 26, 'Cardiac'),
    S.rect(450, 62, 90, 30, { c: R, sw: 2, fill: R, fop: 0.18, rx: 6 }),
    S.rect(540, 76, 90, 30, { c: R, sw: 2, fill: R, fop: 0.18, rx: 6 }),
    S.rect(500, 100, 40, 30, { c: R, sw: 2, fill: R, fop: 0.18, rx: 6 }),
    S.rect(480, 128, 60, 30, { c: R, sw: 2, fill: R, fop: 0.18, rx: 6 }),
    stripes(452, 62, 86, 30, 10),
    stripes(542, 76, 86, 30, 10),
    stripes(502, 100, 36, 30, 5),
    stripes(482, 128, 56, 30, 7),
    S.line(540, 62, 540, 108, { c: 'currentColor', w: 3 }),
    S.line(540, 100, 540, 158, { c: 'currentColor', w: 3 }),
    [[480, 78], [590, 92], [520, 114], [510, 143]].map(([x, y]) => S.ellipse(x, y, 5, 3, { fill: A, fop: 0.9, c: 'none' })).join(''),
    lab(550, 182, 'Stripes, branched, one nucleus;', { a: 'middle', size: 10 }),
    lab(550, 195, 'dark lines join the fibres', { a: 'middle', size: 10 }),
    lab(550, 212, 'Involuntary: heart only', { a: 'middle', size: 10, c: M }),
    lab(330, 275, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
  ].join(''),
);

// ---------------------------------------------------------------- 8. five kinds of joint
const JOINTS = [
  { name: 'Ball and socket', ex: 'shoulder, hip', mv: 'all directions and rotation' },
  { name: 'Hinge', ex: 'elbow, knee', mv: 'back and forth in one plane' },
  { name: 'Pivot', ex: 'neck (head turning)', mv: 'rotation about an axis' },
  { name: 'Gliding', ex: 'wrist, ankle', mv: 'small sliding movements' },
  { name: 'Fixed', ex: 'skull bones', mv: 'no movement' },
];
chk(JOINTS.length === 5, 'joints: five kinds are drawn');
function jointPanel(x0, k) {
  const cx = x0 + 60;
  const j = JOINTS[k];
  let o = lab(cx, 22, j.name, { a: 'middle', w: 'bold', size: 12 });
  if (k === 0) {
    o += S.rect(cx - 7, 130, 14, 60, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.circle(cx, 112, 18, { c: BR, sw: 2, fill: BR, fop: 0.25 });
    o += S.path(`M${cx - 25} 112 A25 25 0 0 1 ${cx + 25} 112`, { c: BR, w: 5 });
    o += S.path(`M${cx + 34} 100 q12 -2 16 12`, { c: R, w: 2 }) + S.head(cx + 50, 112, 1.3, { size: 6, c: R });
    o += S.path(`M${cx - 34} 100 q-12 -2 -16 12`, { c: R, w: 2 }) + S.head(cx - 50, 112, Math.PI - 1.3, { size: 6, c: R });
  } else if (k === 1) {
    o += S.rect(cx - 7, 50, 14, 70, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.path(`M${cx} 120 L${cx + 50} 168`, { c: BR, w: 14, cap: 'round' });
    o += S.circle(cx, 124, 5, { c: 'currentColor', sw: 2, fill: M });
    o += S.path(`M${cx + 20} 110 q26 12 28 36`, { c: R, w: 2 }) + S.head(cx + 48, 146, 1.7, { size: 6, c: R });
  } else if (k === 2) {
    o += S.rect(cx - 7, 120, 14, 70, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.rect(cx - 22, 100, 44, 16, { c: BR, sw: 2, rx: 6, fill: BR, fop: 0.1 });
    o += S.rect(cx - 7, 50, 14, 66, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.ellipse(cx, 92, 34, 9, { c: R, sw: 2, dash: '4 3' }) + S.head(cx + 34, 92, Math.PI / 2, { size: 6, c: R });
  } else if (k === 3) {
    o += S.rect(cx - 40, 100, 80, 22, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.rect(cx - 40, 126, 80, 22, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.arrow(cx - 30, 92, cx + 30, 92, { c: R, w: 2, size: 7 }) + S.arrow(cx + 30, 156, cx - 30, 156, { c: R, w: 2, size: 7 });
  } else {
    o += S.rect(cx - 44, 100, 44, 44, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.rect(cx, 100, 44, 44, { c: BR, sw: 2, fill: BR, fop: 0.25, rx: 4 });
    o += S.path(`M${cx} 100 l6 8 l-6 8 l6 8 l-6 8 l6 8 l-6 4`, { c: 'currentColor', w: 2.5 });
    o += lab(cx, 164, 'zigzag suture', { a: 'middle', size: 10, c: M });
  }
  o += lab(cx, 208, j.ex, { a: 'middle', size: 10 }) + lab(cx, 222, j.mv, { a: 'middle', size: 10, c: M });
  return o;
}
export const JOINT_TYPES = svgDoc(
  640,
  270,
  'Five kinds of joint, schematic. A ball and socket joint, as at the shoulder or hip, allows movement in all directions. A hinge joint, as at the elbow or knee, allows movement back and forth in one plane. A pivot joint, as between the first two neck bones, allows rotation. A gliding joint, as at the wrist or ankle, allows small sliding movements. A fixed joint, as between skull bones, allows no movement. Schematic, not to scale.',
  [0, 1, 2, 3, 4].map((k) => jointPanel(k * 128, k)).join('') + lab(320, 258, 'Schematic, not to scale', { a: 'middle', size: 10, c: M }),
);
void near;
