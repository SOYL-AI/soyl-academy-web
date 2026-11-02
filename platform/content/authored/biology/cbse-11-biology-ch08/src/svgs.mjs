// SVG diagrams for ch08 Cell: The Unit of Life (allow-listed elements, palette colours only). Schematics, not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { AXO } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const dots = (pts, r = 2, c = 'currentColor') => pts.map(([x, y]) => S.circle(x, y, r, { fill: c, sw: 0 })).join('');

// 1. Prokaryotic (bacterial) cell
const RIBO_P = [[150, 130], [170, 92], [196, 150], [214, 96], [232, 146], [268, 150], [286, 96], [300, 148], [318, 104], [346, 150], [356, 118], [182, 116], [278, 132], [222, 130]];
export const PROKARYOTE = svgDoc(
  480,
  240,
  'A rod-shaped bacterial (prokaryotic) cell, schematic: an outer capsule (glycocalyx), a rigid cell wall and a plasma membrane form the cell envelope; a mesosome is an infolding of the plasma membrane; the nucleoid is naked genomic DNA with no nuclear envelope; small circular plasmids lie outside it; 70S ribosomes and inclusion bodies are free in the cytoplasm; a flagellum with a basal body at one end gives motility, and pili project from the surface',
  [
    S.rect(110, 64, 280, 112, { rx: 56, c: 'var(--diagram-muted)', dash: '5 3', fill: 'var(--diagram-yellow)', fop: 0.12 }),
    S.rect(118, 72, 264, 96, { rx: 48, c: 'var(--diagram-brown)', sw: 3 }),
    S.rect(124, 78, 252, 84, { rx: 42, sw: 1.2, fill: 'var(--diagram-fill)' }),
    S.path('M236 78 Q236 100 246 98 Q256 96 252 86 Q250 104 262 104 Q272 102 268 78', { w: 1.2 }),
    S.path('M200 122 C210 100 222 144 232 120 C242 96 254 144 266 120 C276 102 288 140 300 120', { c: 'var(--diagram-blue)', w: 2.2 }),
    S.circle(160, 104, 7, { c: 'var(--diagram-blue)', sw: 1.6 }), S.circle(330, 142, 6, { c: 'var(--diagram-blue)', sw: 1.6 }),
    dots(RIBO_P, 2.2),
    S.circle(146, 138, 6, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 0.8 }), S.circle(352, 98, 5, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 0.8 }),
    S.rect(378, 114, 10, 12, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.path('M388 120 C402 104 414 136 428 120 C442 104 454 136 470 120', { w: 1.8 }),
    S.line(150, 66, 142, 40), S.line(200, 64, 202, 38), S.line(320, 66, 328, 40), S.line(170, 176, 164, 200), S.line(330, 175, 336, 200),
    lab(4, 66, 'Capsule'), S.lead(50, 68, 112, 104),
    lab(4, 96, 'Cell wall', { c: 'var(--diagram-brown)' }), S.lead(56, 98, 119, 112),
    lab(4, 126, 'Plasma'), lab(4, 139, 'membrane'), S.lead(56, 132, 125, 128),
    lab(4, 196, 'Plasmid', { c: 'var(--diagram-blue)' }), S.lead(48, 190, 154, 109),
    lab(100, 26, 'Pilus'), S.lead(128, 28, 143, 42),
    lab(300, 24, 'Mesosome'), S.lead(312, 28, 262, 94),
    lab(250, 226, 'Nucleoid (naked DNA)', { a: 'middle', c: 'var(--diagram-blue)' }), S.lead(250, 214, 252, 132),
    lab(392, 226, 'Ribosomes (70S)'), S.lead(410, 214, 347, 152),
    lab(84, 226, 'Inclusion body'), S.lead(120, 214, 145, 145),
    lab(476, 96, 'Flagellum', { a: 'end' }), S.lead(450, 100, 440, 112),
  ].join(''),
);

// 2. Fluid mosaic model of the plasma membrane
const headsOut = [];
const headsIn = [];
for (let x = 20; x <= 380; x += 12) {
  if (x > 144 && x < 200) continue; // integral protein spans the bilayer here
  if (x > 300 && x < 346) {
    headsIn.push(x);
    continue; // a protein sits in the outer layer here
  }
  headsOut.push(x);
  headsIn.push(x);
}
const lipid = (x, y, down) => S.circle(x, y, 5, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1 }) + S.line(x - 2, y + (down ? 5 : -5), x - 2, y + (down ? 32 : -32), { w: 1 }) + S.line(x + 2, y + (down ? 5 : -5), x + 2, y + (down ? 32 : -32), { w: 1 });
export const MEMBRANE = svgDoc(
  480,
  230,
  'Fluid mosaic model of the plasma membrane (Singer and Nicolson, 1972): a lipid bilayer in which the polar heads of the lipids face the outside and the cytoplasm and the hydrophobic tails point inwards; an integral protein spans the whole bilayer and another is partly buried in it; a peripheral protein lies on the inner surface; carbohydrate chains are attached to a protein and a lipid on the outer surface; proteins can move sideways in the quasi-fluid bilayer',
  [
    S.rect(14, 48, 372, 152, { c: 'none', fill: 'var(--diagram-fill)', fop: 0.6 }),
    ...headsOut.map((x) => lipid(x, 82, true)),
    ...headsIn.map((x) => lipid(x, 164, false)),
    S.ellipse(172, 123, 24, 56, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.5 }),
    S.ellipse(323, 102, 22, 30, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.5 }),
    S.ellipse(250, 182, 24, 10, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1.5 }),
    S.path('M172 67 L166 50 L158 38 M166 50 L176 36', { w: 1.4, c: 'var(--diagram-red)' }),
    dots([[166, 50], [158, 38], [176, 36]], 3.2, 'var(--diagram-red)'),
    S.path('M80 77 L80 58 L72 46 M80 58 L88 46', { w: 1.4, c: 'var(--diagram-red)' }),
    dots([[80, 58], [72, 46], [88, 46]], 3.2, 'var(--diagram-red)'),
    S.arrow(270, 214, 340, 214, { c: 'var(--diagram-muted)', w: 1.2, size: 6 }), S.arrow(270, 214, 200, 214, { c: 'var(--diagram-muted)', w: 1.2, size: 6 }),
    lab(270, 228, 'proteins move sideways', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(18, 22, 'Outside the cell', { size: 10, c: 'var(--diagram-muted)' }),
    lab(18, 214, 'Cytoplasm', { size: 10, c: 'var(--diagram-muted)' }),
    lab(476, 30, 'Carbohydrate', { a: 'end', c: 'var(--diagram-red)' }), S.lead(404, 32, 180, 38),
    lab(476, 66, 'Polar head', { a: 'end' }), S.lead(408, 68, 377, 82),
    lab(476, 104, 'Hydrophobic', { a: 'end' }), lab(476, 117, 'tails', { a: 'end' }), S.lead(406, 110, 380, 112),
    lab(476, 146, 'Integral', { a: 'end', c: 'var(--diagram-blue)' }), lab(476, 159, 'proteins', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(420, 150, 345, 110), S.lead(420, 154, 196, 140),
    lab(476, 192, 'Peripheral', { a: 'end', c: 'var(--diagram-green)' }), lab(476, 205, 'protein', { a: 'end', c: 'var(--diagram-green)' }), S.lead(420, 196, 274, 184),
  ].join(''),
);

// 3. Animal cell (generalised)
const mito = (cx, cy, rx, ry) => S.ellipse(cx, cy, rx, ry, { fill: 'var(--diagram-red)', fop: 0.2, sw: 1.4 }) + S.path(`M${cx - rx + 6} ${cy} ${Array.from({ length: 6 }, (_, i) => `L${cx - rx + 10 + i * ((2 * rx - 20) / 5)} ${cy + (i % 2 ? ry - 4 : -(ry - 4))}`).join(' ')} L${cx + rx - 6} ${cy}`, { w: 1 });
const golgi = (x, y) => [0, 1, 2, 3].map((i) => S.path(`M${x} ${y + i * 7} Q${x + 30} ${y + i * 7 - 12} ${x + 60} ${y + i * 7}`, { w: 2.2, c: 'var(--diagram-green)' })).join('') + dots([[x - 4, y + 30], [x + 64, y + 30], [x + 70, y + 18], [x + 30, y + 34]], 3, 'var(--diagram-green)');
const NUC_PORES = [0.4, 1.3, 2.2, 3.1, 4.0, 4.9, 5.8].map((a) => [200 + 46 * Math.cos(a), 150 + 46 * Math.sin(a)]);
export const ANIMAL_CELL = svgDoc(
  480,
  300,
  'Generalised animal cell, schematic: plasma membrane; nucleus with a double nuclear envelope pierced by nuclear pores, a nucleolus and chromatin; rough endoplasmic reticulum with ribosomes, continuous with the outer nuclear membrane; smooth endoplasmic reticulum without ribosomes; Golgi apparatus of stacked cisternae with vesicles; mitochondria with cristae; lysosomes; free ribosomes; a centrosome with two centrioles at right angles; no cell wall, no plastids and no large central vacuole',
  [
    S.ellipse(240, 150, 158, 128, { fill: 'var(--diagram-yellow)', fop: 0.08, sw: 2 }),
    S.circle(200, 150, 48, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 2 }),
    S.circle(200, 150, 44, { sw: 1 }),
    ...NUC_PORES.map(([x, y]) => S.circle(x, y, 2.6, { fill: 'var(--diagram-fill)', sw: 0 })),
    S.circle(190, 142, 12, { fill: 'var(--diagram-muted)', fop: 0.8, sw: 0 }),
    S.path('M212 128 C222 136 206 146 218 156 M178 168 C190 176 200 162 212 174', { w: 1, c: 'var(--diagram-blue)' }),
    S.path('M252 112 C268 118 276 140 270 160 M262 102 C282 110 292 140 284 170 M272 92 C298 100 310 140 298 182', { w: 1.6, c: 'var(--diagram-blue)' }),
    dots([[256, 116], [266, 128], [270, 146], [268, 160], [266, 106], [282, 118], [289, 138], [288, 160], [284, 170], [278, 98], [298, 112], [306, 136], [304, 160], [298, 180]], 2, 'currentColor'),
    S.path('M300 206 C312 196 324 212 336 202 C348 192 356 210 368 200 M296 222 C310 214 322 230 336 220 C350 210 360 228 372 218', { w: 2, c: 'var(--diagram-blue)' }),
    golgi(112, 62),
    mito(330, 82, 30, 13), mito(126, 222, 28, 12), mito(372, 150, 22, 11),
    S.circle(300, 248, 10, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }), S.circle(140, 120, 8, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }),
    S.rect(214, 238, 8, 20, { fill: 'var(--diagram-muted)', fop: 0.7, sw: 1 }), S.rect(226, 252, 20, 8, { fill: 'var(--diagram-muted)', fop: 0.7, sw: 1 }),
    dots([[100, 160], [110, 180], [160, 250], [250, 270], [340, 250], [380, 110], [150, 88], [240, 60], [90, 130]], 1.8),
    lab(4, 30, 'Golgi apparatus', { c: 'var(--diagram-green)' }), S.lead(70, 34, 128, 60),
    lab(4, 118, 'Lysosome', { c: 'var(--diagram-red)' }), S.lead(56, 116, 132, 120),
    lab(4, 176, 'Nucleolus'), S.lead(58, 174, 180, 146),
    lab(4, 226, 'Mitochondrion', { c: 'var(--diagram-red)' }), S.lead(80, 228, 100, 224),
    lab(4, 292, 'Centrioles'), S.lead(64, 288, 214, 252),
    lab(476, 30, 'Rough ER', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(430, 32, 292, 104),
    lab(476, 64, 'Plasma membrane', { a: 'end' }), S.lead(390, 66, 360, 72),
    lab(476, 196, 'Smooth ER', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(420, 198, 370, 204),
    lab(476, 120, 'Nuclear envelope', { a: 'end' }), lab(476, 133, 'with pores', { a: 'end' }), S.lead(390, 126, 247, 146),
    lab(476, 280, 'Free ribosomes', { a: 'end' }), S.lead(400, 276, 342, 252),
  ].join(''),
);

// 4. Plant cell (generalised)
const chloro = (cx, cy, rot) => {
  const rx = rot ? 9 : 20;
  const ry = rot ? 20 : 9;
  const g = rot ? [[-1, -9], [-1, 0], [-1, 9]] : [[-10, -1], [0, -1], [10, -1]];
  return S.ellipse(cx, cy, rx, ry, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1.2 }) + g.map(([dx, dy]) => S.rect(cx + dx - (rot ? 4 : 2), cy + dy - (rot ? 2 : 4), rot ? 8 : 4, rot ? 4 : 8, { fill: 'var(--diagram-green)', sw: 0 })).join('');
};
export const PLANT_CELL = svgDoc(
  480,
  300,
  'Generalised plant cell, schematic: a rigid cell wall outside the plasma membrane, with the middle lamella between it and the wall of the neighbouring cell and plasmodesmata passing through the walls; a large central vacuole bounded by the tonoplast; chloroplasts with grana; nucleus with nucleolus pushed to one side; mitochondria; Golgi apparatus; endoplasmic reticulum; centrioles are absent',
  [
    S.rect(66, 12, 14, 276, { fill: 'var(--diagram-brown)', fop: 0.15, c: 'var(--diagram-brown)', sw: 1 }),
    S.line(80, 12, 80, 288, { c: 'var(--diagram-accent)', w: 2 }),
    S.rect(80, 12, 320, 276, { fill: 'var(--diagram-brown)', fop: 0.15, c: 'var(--diagram-brown)', sw: 2 }),
    S.rect(92, 24, 296, 252, { rx: 8, fill: 'var(--diagram-yellow)', fop: 0.08, sw: 1.4 }),
    ...[110, 180].map((y) => S.line(64, y, 94, y, { w: 1.4 }) + S.line(64, y + 6, 94, y + 6, { w: 1.4 })),
    S.rect(150, 62, 200, 150, { rx: 30, fill: 'var(--diagram-blue)', fop: 0.15, c: 'var(--diagram-blue)', sw: 1.6 }),
    S.circle(140, 240, 24, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 1.6 }), S.circle(136, 236, 8, { fill: 'var(--diagram-muted)', sw: 0 }),
    chloro(120, 52, false), chloro(116, 140, true), chloro(370, 120, true), chloro(370, 200, true), chloro(290, 252, false), chloro(300, 40, false),
    mito(206, 40, 18, 8), mito(330, 252, 18, 8),
    [0, 1, 2].map((i) => S.path(`M200 ${232 + i * 6} Q220 ${222 + i * 6} 240 ${232 + i * 6}`, { w: 2, c: 'var(--diagram-green)' })).join(''),
    S.path('M110 196 C120 186 130 204 140 194 C150 184 160 202 170 192', { w: 1.6, c: 'var(--diagram-blue)' }),
    lab(4, 28, 'Middle'), lab(4, 41, 'lamella', {}), S.lead(40, 46, 79, 60),
    lab(4, 100, 'Plasmo-'), lab(4, 113, 'desmata'), S.lead(46, 118, 66, 114),
    lab(4, 206, 'Cell wall', { c: 'var(--diagram-brown)' }), S.lead(52, 210, 86, 222),
    lab(4, 260, 'Nucleus'), S.lead(48, 256, 118, 244),
    lab(476, 30, 'Chloroplast', { a: 'end', c: 'var(--diagram-green)' }), S.lead(414, 34, 321, 40),
    lab(476, 90, 'Plasma', { a: 'end' }), lab(476, 103, 'membrane', { a: 'end' }), S.lead(420, 96, 389, 96),
    lab(476, 150, 'Central vacuole', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(392, 146, 330, 150),
    lab(476, 170, 'Tonoplast', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(420, 168, 351, 170),
    lab(476, 236, 'Golgi apparatus', { a: 'end', c: 'var(--diagram-green)' }), S.lead(392, 232, 241, 233),
    lab(476, 270, 'Mitochondrion', { a: 'end', c: 'var(--diagram-red)' }), S.lead(398, 266, 348, 254),
  ].join(''),
);

// 5. Mitochondrion and chloroplast
const cristae = () => {
  const out = [];
  for (let i = 0; i < 6; i++) {
    const x = 50 + i * 26;
    const top = i % 2 === 0;
    out.push(S.path(top ? `M${x - 5} 72 L${x - 5} 112 Q${x} 122 ${x + 5} 112 L${x + 5} 74` : `M${x - 5} 150 L${x - 5} 110 Q${x} 100 ${x + 5} 110 L${x + 5} 148`, { w: 1.3, fill: 'var(--diagram-fill)' }));
  }
  return out.join('');
};
const granum = (x, y) => [0, 1, 2, 3, 4].map((i) => S.rect(x, y + i * 5, 24, 4, { fill: 'var(--diagram-green)', fop: 0.75, sw: 0.6 })).join('');
export const MITO_CHLORO = svgDoc(
  480,
  250,
  'Left: a mitochondrion in longitudinal section, with a smooth outer membrane and an inner membrane folded into cristae that project into the matrix; the matrix holds a circular DNA molecule and 70S ribosomes. Right: a chloroplast with outer and inner membranes; stacks of thylakoids form grana, joined by stroma lamellae; the stroma holds enzymes, circular DNA and 70S ribosomes',
  [
    S.ellipse(115, 111, 96, 52, { fill: 'var(--diagram-red)', fop: 0.12, sw: 2 }),
    S.ellipse(115, 111, 88, 44, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1.3 }),
    cristae(),
    S.circle(176, 128, 6, { c: 'var(--diagram-blue)', sw: 1.4 }),
    dots([[60, 128], [112, 92], [140, 132], [168, 96], [86, 94]], 2),
    S.ellipse(362, 111, 106, 58, { fill: 'var(--diagram-green)', fop: 0.08, sw: 2 }),
    S.ellipse(362, 111, 99, 51, { fill: 'var(--diagram-green)', fop: 0.1, sw: 1.3 }),
    granum(290, 84), granum(338, 100), granum(392, 82), granum(316, 128), granum(374, 124),
    S.path('M314 94 L338 106 M362 108 L392 92 M326 128 L338 118 M362 112 L374 128', { w: 1.4, c: 'var(--diagram-green)' }),
    S.circle(432, 108, 6, { c: 'var(--diagram-blue)', sw: 1.4 }),
    dots([[300, 120], [420, 132], [350, 80], [416, 92]], 2),
    lab(115, 20, 'Mitochondrion', { a: 'middle', w: 'bold' }),
    lab(362, 20, 'Chloroplast', { a: 'middle', w: 'bold' }),
    lab(4, 40, 'Outer membrane', { size: 10 }), S.lead(50, 44, 70, 64),
    lab(140, 40, 'Inner membrane', { size: 10 }), S.lead(170, 44, 160, 72),
    lab(4, 196, 'Crista', { size: 10 }), S.lead(30, 186, 50, 140),
    lab(70, 196, 'Matrix', { size: 10 }), S.lead(90, 186, 100, 132),
    lab(126, 196, 'DNA', { size: 10, c: 'var(--diagram-blue)' }), S.lead(140, 186, 172, 132),
    lab(70, 236, 'Ribosomes (70S) in both organelles', { size: 10 }),
    lab(250, 196, 'Granum', { size: 10, c: 'var(--diagram-green)' }), S.lead(270, 186, 300, 110),
    lab(300, 210, 'Stroma lamella', { size: 10, c: 'var(--diagram-green)' }), S.lead(330, 200, 330, 124),
    lab(390, 196, 'Stroma', { size: 10 }), S.lead(404, 186, 400, 150),
    lab(440, 210, 'DNA', { size: 10, c: 'var(--diagram-blue)' }), S.lead(448, 200, 434, 115),
    lab(420, 40, 'Two', { size: 10 }), lab(420, 52, 'membranes', { size: 10 }), S.lead(430, 56, 432, 70),
  ].join(''),
);

// 6. Axoneme (9 + 2) and centriole (9 triplets)
const CX1 = 120;
const CY = 112;
const ring9 = (cx, n, rr, fn) => Array.from({ length: 9 }, (_, k) => fn(k, (k / 9) * Math.PI * 2 - Math.PI / 2, cx, rr)).join('');
const doublet = (k, a, cx, rr) => {
  const x = cx + rr * Math.cos(a);
  const y = CY + rr * Math.sin(a);
  const tx = -Math.sin(a) * 6.5;
  const ty = Math.cos(a) * 6.5;
  return S.circle(x - tx / 2, y - ty / 2, 6.5, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.2 }) + S.circle(x + tx / 2 + tx * 0.6, y + ty / 2 + ty * 0.6, 6.5, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 1.2 }) + S.line(cx + 20 * Math.cos(a), CY + 20 * Math.sin(a), cx + (rr - 8) * Math.cos(a), CY + (rr - 8) * Math.sin(a), { w: 1, c: 'var(--diagram-muted)' });
};
const triplet = (k, a, cx, rr) => {
  const x = cx + rr * Math.cos(a);
  const y = CY + rr * Math.sin(a);
  const tx = -Math.sin(a + 0.5) * 11;
  const ty = Math.cos(a + 0.5) * 11;
  return [-1, 0, 1].map((j) => S.circle(x + j * tx, y + j * ty, 5.5, { fill: 'var(--diagram-green)', fop: 0.25 + 0.15 * (j + 1), sw: 1 })).join('') + S.line(cx + 12 * Math.cos(a), CY + 12 * Math.sin(a), cx + (rr - 8) * Math.cos(a), CY + (rr - 8) * Math.sin(a), { w: 1, c: 'var(--diagram-muted)' });
};
export const AXONEME = svgDoc(
  480,
  240,
  `Left: cross-section of a cilium or flagellum. The plasma membrane encloses the axoneme, with ${AXO.doublets} pairs of doublet peripheral microtubules arranged in a ring and a central pair of microtubules inside a central sheath (the 9 + 2 array); radial spokes join the central sheath to each doublet. Right: cross-section of a centriole, a cartwheel of nine evenly spaced peripheral triplets of tubulin microtubules joined by radial spokes to a central proteinaceous hub. Cilia and flagella arise from centriole-like basal bodies`,
  [
    S.circle(CX1, CY, 84, { sw: 2, fill: 'var(--diagram-yellow)', fop: 0.08 }),
    S.circle(CX1, CY, 20, { c: 'var(--diagram-muted)', sw: 1.2 }),
    ring9(CX1, 9, 60, doublet),
    S.circle(CX1 - 8, CY, 6.5, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }), S.circle(CX1 + 8, CY, 6.5, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.2 }),
    S.circle(360, CY, 12, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }),
    ring9(360, 9, 64, triplet),
    lab(CX1, 218, 'Cilium or flagellum: 9 + 2', { a: 'middle', w: 'bold' }),
    lab(360, 218, 'Centriole: 9 triplets', { a: 'middle', w: 'bold' }),
    lab(212, 30, 'Plasma membrane', { size: 10 }), S.lead(216, 34, 186, 60),
    lab(212, 112, 'Central pair in', { size: 10, c: 'var(--diagram-red)' }), lab(212, 124, 'central sheath', { size: 10, c: 'var(--diagram-red)' }), S.lead(212, 116, 134, 112),
    lab(4, 20, 'Peripheral doublet', { size: 10, c: 'var(--diagram-blue)' }), S.lead(60, 24, 114, 48),
    lab(4, 200, 'Radial spoke', { size: 10 }), S.lead(40, 192, 96, 140),
    lab(436, 20, 'Triplet', { size: 10, c: 'var(--diagram-green)', a: 'middle' }), S.lead(430, 26, 400, 66),
    lab(452, 206, 'Hub', { size: 10, a: 'end' }), S.lead(436, 198, 368, 120),
  ].join(''),
);

// 7. Chromosome types by centromere position
const chromo = (x, top, bottom, cen, opts = {}) => {
  const w = 12;
  const out = [];
  for (const dx of [0, w + 3]) {
    if (cen - top > 2) out.push(S.rect(x + dx, top, w, cen - top - 3, { rx: 6, fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }));
    out.push(S.rect(x + dx, cen + 3, w, bottom - cen - 3, { rx: 6, fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }));
  }
  out.push(S.circle(x + w + 1.5, cen, 5, { fill: 'var(--diagram-red)', sw: 0 }));
  if (opts.sat) for (const dx of [0, w + 3]) out.push(S.circle(x + dx + w / 2, top - 12, 5, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.3 }) + S.line(x + dx + w / 2, top - 7, x + dx + w / 2, top, { w: 1 }));
  return out.join('');
};
const CHR = [
  { name: 'Metacentric', note: 'centromere in the middle', x: 50, cen: 110 },
  { name: 'Sub-metacentric', note: 'one arm shorter', x: 165, cen: 90 },
  { name: 'Acrocentric', note: 'one arm very short', x: 280, cen: 62, sat: true },
  { name: 'Telocentric', note: 'centromere at the tip', x: 395, cen: 50 },
];
export const CHROMOSOMES = svgDoc(
  480,
  230,
  'Four types of chromosomes by the position of the centromere (primary constriction), each drawn as two sister chromatids held at the centromere: metacentric, centromere in the middle with two equal arms; sub-metacentric, centromere nearer one end with one shorter and one longer arm; acrocentric, centromere close to one end with one extremely short and one very long arm (drawn with a satellite beyond a secondary constriction); telocentric, centromere at the tip',
  [
    ...CHR.map((c) => chromo(c.x, 50, 170, c.cen, c) + lab(c.x + 13.5, 194, c.name, { a: 'middle', w: 'bold', size: 11 }) + lab(c.x + 13.5, 208, c.note, { a: 'middle', size: 10, c: 'var(--diagram-muted)' })),
    lab(120, 24, 'Centromere (red) with kinetochores', { a: 'middle', size: 10, c: 'var(--diagram-red)' }), S.lead(120, 28, 80, 108),
    lab(380, 24, 'Satellite', { size: 10 }), S.lead(378, 22, 304, 38),
  ].join(''),
);

export const ALL = { PROKARYOTE, MEMBRANE, ANIMAL_CELL, PLANT_CELL, MITO_CHLORO, AXONEME, CHROMOSOMES };
