// SVG diagrams for ISC 11 Biology ch10 Cell: The Unit of Life. All are drawn here with the lib's S helpers (palette colours only).
// New for this chapter: fluid mosaic membrane (plain and lettered A to E), three carrier modes, endomembrane secretion route,
// mitochondrion and chloroplast, axoneme and centriole cross-sections, four chromosome types (plain and lettered A to D)
// and a computed transport-rate graph.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { TR_S, carrier, diffusion, CARRIER, CHR } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = 'var(--diagram-muted)';
const badge = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });

// ---------------------------------------------------------------- 1. fluid mosaic membrane (plain and lettered)
function membrane(lettered) {
  const xs = Array.from({ length: 14 }, (_, i) => 175 + 16 * i);
  const parts = [];
  for (const x of xs) {
    parts.push(S.line(x - 3, 84, x - 3, 112, { w: 1.2 }), S.line(x + 3, 84, x + 3, 112, { w: 1.2 }), S.circle(x, 78, 6, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }));
    parts.push(S.line(x - 3, 146, x - 3, 118, { w: 1.2 }), S.line(x + 3, 146, x + 3, 118, { w: 1.2 }), S.circle(x, 152, 6, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }));
  }
  const prot = (x, y, w, h, c, fop = 0.4) => S.rect(x, y, w, h, { rx: 10, fill: 'var(--diagram-fill)', sw: 0 }) + S.rect(x, y, w, h, { rx: 10, fill: c, fop, sw: 1.4 });
  parts.push(prot(225, 64, 28, 102, 'var(--diagram-green)'));
  parts.push(prot(305, 64, 44, 102, 'var(--diagram-green)'));
  parts.push(S.rect(320, 68, 14, 94, { rx: 6, fill: 'var(--diagram-blue)', fop: 0.2, sw: 0 }));
  parts.push(S.ellipse(278, 62, 18, 10, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1.4 }));
  parts.push(S.ellipse(372, 168, 18, 10, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1.4 }));
  parts.push(S.ellipse(205, 100, 3.5, 9, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 1 }), S.ellipse(374, 132, 3.5, 9, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 1 }));
  parts.push(S.path('M239 64 L233 54 L245 46 L233 38 L241 30', { w: 1.5, c: 'var(--diagram-accent)' }), S.circle(241, 29, 3, { fill: 'var(--diagram-accent)', sw: 0 }));
  parts.push(S.path('M175 72 L170 62 L180 54 L172 46', { w: 1.5, c: 'var(--diagram-accent)' }), S.circle(172, 45, 3, { fill: 'var(--diagram-accent)', sw: 0 }));
  parts.push(lab(182, 22, 'Outside the cell', { c: muted, size: 10 }), lab(182, 196, 'Cytoplasm', { c: muted, size: 10 }));
  if (!lettered) {
    parts.push(S.lead(245, 38, 420, 28), lab(424, 31, 'Carbohydrate chain'));
    parts.push(S.lead(296, 60, 420, 56), lab(424, 59, 'Peripheral protein'));
    parts.push(S.lead(383, 78, 420, 84), lab(424, 87, 'Phospholipid head'));
    parts.push(S.lead(386, 100, 420, 112), lab(424, 115, 'Hydrophobic tails'));
    parts.push(S.lead(334, 150, 420, 170), lab(424, 173, 'Protein channel'));
    parts.push(S.lead(225, 140, 130, 140), lab(8, 143, 'Integral protein'));
    parts.push(S.lead(201, 100, 130, 100), lab(8, 103, 'Cholesterol'));
    return svgDoc(540, 205, 'Fluid mosaic model of the plasma membrane: a double layer of phospholipids with hydrophilic heads facing outwards and hydrophobic tails inside; integral proteins span the bilayer and one forms a channel, peripheral proteins lie on the surface, cholesterol sits among the tails, and carbohydrate chains on proteins and lipids face outside', parts.join(''));
  }
  parts.push(S.lead(245, 38, 420, 28), badge(430, 28, 'A'));
  parts.push(S.lead(383, 78, 420, 84), badge(430, 84, 'B'));
  parts.push(S.lead(349, 110, 420, 112), badge(430, 112, 'C'));
  parts.push(S.lead(296, 60, 420, 56), badge(430, 56, 'D'));
  parts.push(S.lead(378, 132, 420, 140), badge(430, 140, 'E'));
  return svgDoc(540, 205, 'Plasma membrane with five parts marked A to E: A a carbohydrate chain on the outer surface, B a phospholipid head, C an integral protein spanning the bilayer, D a peripheral protein on the outer surface and E a cholesterol molecule among the hydrophobic tails', parts.join(''));
}
export const MEMBRANE = membrane(false);
export const MEMBRANE_L = membrane(true);

// ---------------------------------------------------------------- 2. uniport, symport, antiport
function carrierPanel(x0, title, sub, moves) {
  const p = [S.rect(x0, 96, 140, 22, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.2 })];
  p.push(S.rect(x0 + 50, 74, 40, 66, { rx: 10, fill: 'var(--diagram-green)', fop: 0.4, sw: 1.4 }));
  p.push(lab(x0 + 2, 90, 'outside', { size: 10, c: muted }), lab(x0 + 2, 132, 'inside', { size: 10, c: muted }));
  for (const [dx, down, c] of moves) {
    const yA = down ? 34 : 150;
    p.push(S.circle(x0 + dx, yA, 6, { fill: c, fop: 0.7, sw: 1 }), S.arrow(x0 + dx, down ? 44 : 140, x0 + dx, down ? 138 : 50, { w: 1.5, size: 6 }));
  }
  p.push(S.text(x0 + 70, 186, title, { a: 'middle', size: 12, w: 'bold' }), S.text(x0 + 70, 201, sub, { a: 'middle', size: 10, c: muted }));
  return p.join('');
}
export const CARRIERS = svgDoc(
  480,
  210,
  'Three kinds of carrier-mediated transport across the membrane: in uniport one substance crosses in one direction; in symport two different substances cross together in the same direction; in antiport two different substances cross in opposite directions',
  [carrierPanel(10, 'Uniport', 'one substance, one way', [[70, true, 'var(--diagram-blue)']]), carrierPanel(170, 'Symport', 'two substances, same way', [[55, true, 'var(--diagram-blue)'], [85, true, 'var(--diagram-red)']]), carrierPanel(330, 'Antiport', 'two substances, opposite ways', [[55, true, 'var(--diagram-blue)'], [85, false, 'var(--diagram-red)']])].join(''),
);

// ---------------------------------------------------------------- 3. endomembrane system: from ribosome to secretion
export const ENDO = svgDoc(
  540,
  262,
  'The endomembrane route of a secreted protein: the nucleus is joined to the rough endoplasmic reticulum, whose ribosomes make the protein; transport vesicles carry it to the cis face of the Golgi complex; it matures towards the trans face and leaves in vesicles, some going to the plasma membrane for secretion and some becoming lysosomes; smooth endoplasmic reticulum lies below without ribosomes',
  [
    S.ellipse(60, 110, 46, 58, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 1.5 }),
    S.circle(60, 110, 12, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1 }),
    lab(60, 84, 'Nucleus', { a: 'middle', size: 10, w: 'bold' }),
    ...[0, 1, 2, 3].flatMap((i) => [
      S.rect(120, 66 + i * 22, 84, 12, { rx: 6, fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.2 }),
      ...[0, 1, 2, 3, 4, 5].map((k) => S.circle(128 + k * 14, 66 + i * 22 - 2, 1.8, { fill: 'currentColor', sw: 0 })),
    ]),
    lab(162, 168, 'Rough ER', { a: 'middle', size: 10, w: 'bold' }),
    lab(162, 180, '(ribosomes on surface)', { a: 'middle', size: 10, c: muted }),
    S.path('M106 100 L120 98 M106 120 L120 120', { w: 1.2, c: muted }),
    S.circle(228, 96, 5, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }), S.circle(238, 122, 5, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }),
    S.arrow(208, 100, 262, 104, { w: 1.2, size: 6 }),
    ...[0, 1, 2, 3].map((i) => S.path(`M${270 + i * 14} 70 Q${282 + i * 14} 108 ${270 + i * 14} 146`, { w: 3, c: 'var(--diagram-green)' })),
    lab(298, 62, 'Golgi complex', { a: 'middle', size: 10, w: 'bold' }),
    lab(270, 164, 'cis face', { a: 'middle', size: 10, c: muted }), lab(270, 176, '(forming)', { a: 'middle', size: 10, c: muted }),
    lab(318, 164, 'trans face', { a: 'middle', size: 10, c: muted }), lab(318, 176, '(maturing)', { a: 'middle', size: 10, c: muted }),
    S.circle(372, 84, 6, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.2 }), S.arrow(334, 100, 366, 87, { w: 1.2, size: 6 }),
    S.arrow(380, 84, 488, 84, { w: 1.2, size: 6 }),
    S.line(498, 40, 498, 200, { w: 4, c: 'var(--diagram-brown)' }), lab(534, 218, 'Plasma membrane', { a: 'end', size: 10, w: 'bold' }),
    lab(440, 74, 'secretion', { a: 'middle', size: 10, c: muted }),
    S.arrow(334, 128, 394, 160, { w: 1.2, size: 6 }),
    S.circle(408, 168, 22, { fill: 'var(--diagram-red)', fop: 0.2, sw: 1.5 }), lab(408, 172, 'enzymes', { a: 'middle', size: 10 }),
    lab(408, 204, 'Lysosome', { a: 'middle', size: 10, w: 'bold' }),
    S.path('M120 216 q16 -14 32 0 t32 0 t32 0 t32 0', { w: 3, c: 'var(--diagram-green)' }),
    S.path('M120 232 q16 -14 32 0 t32 0 t32 0 t32 0', { w: 3, c: 'var(--diagram-green)' }),
    lab(262, 228, 'Smooth ER (no ribosomes)', { size: 10, w: 'bold' }),
  ].join(''),
);

// ---------------------------------------------------------------- 4. mitochondrion and chloroplast
const cristae = [88, 112, 136, 160, 184].flatMap((x, i) => (i % 2 ? [S.path(`M${x} 148 L${x} 118 Q${x} 112 ${x + 6} 112 Q${x + 12} 112 ${x + 12} 118 L${x + 12} 148`, { w: 1.6, c: 'var(--diagram-brown)' })] : [S.path(`M${x} 84 L${x} 114 Q${x} 120 ${x + 6} 120 Q${x + 12} 120 ${x + 12} 114 L${x + 12} 84`, { w: 1.6, c: 'var(--diagram-brown)' })]));
const granum = (cx, cy, n) => Array.from({ length: n }, (_, i) => S.rect(cx - 16, cy - (n * 6) / 2 + i * 6, 32, 5, { rx: 2, fill: 'var(--diagram-green)', fop: 0.55, sw: 0.8 })).join('');
export const ORGANELLES = svgDoc(
  540,
  250,
  'Ultrastructure of a mitochondrion (left) and a chloroplast (right): the mitochondrion has a smooth outer membrane and an inner membrane folded into cristae that enclose the matrix; the chloroplast has a double envelope, stacks of thylakoids called grana joined by stroma lamellae, and a fluid stroma',
  [
    S.ellipse(140, 120, 96, 50, { fill: 'var(--diagram-yellow)', fop: 0.12, sw: 2 }),
    S.ellipse(140, 120, 88, 42, { fill: 'none', sw: 1.2 }),
    ...cristae,
    lab(140, 40, 'Mitochondrion', { a: 'middle', size: 12, w: 'bold' }),
    S.lead(60, 82, 24, 56), lab(8, 52, 'Outer membrane', { size: 10 }),
    S.lead(86, 104, 26, 196), lab(8, 208, 'Inner membrane', { size: 10 }),
    S.lead(130, 98, 190, 68), lab(184, 62, 'Crista', { size: 10 }),
    S.lead(150, 134, 206, 188), lab(186, 202, 'Matrix', { size: 10 }),
    S.ellipse(400, 120, 104, 54, { fill: 'var(--diagram-green)', fop: 0.1, sw: 2 }),
    S.ellipse(400, 120, 98, 48, { fill: 'none', sw: 1.2 }),
    granum(350, 112, 4), granum(400, 132, 5), granum(450, 110, 4), granum(380, 96, 3), granum(430, 138, 3),
    S.line(366, 112, 384, 132, { w: 1.2, c: 'var(--diagram-green)' }), S.line(416, 132, 434, 112, { w: 1.2, c: 'var(--diagram-green)' }), S.line(364, 108, 366, 98, { w: 1.2, c: 'var(--diagram-green)' }),
    lab(400, 40, 'Chloroplast', { a: 'middle', size: 12, w: 'bold' }),
    S.lead(320, 82, 300, 56), lab(268, 52, 'Double envelope', { size: 10 }),
    S.lead(456, 98, 500, 62), lab(446, 56, 'Granum', { size: 10 }),
    S.lead(375, 124, 330, 196), lab(268, 208, 'Stroma lamella', { size: 10 }),
    S.lead(470, 140, 496, 196), lab(448, 208, 'Stroma', { size: 10 }),
  ].join(''),
);

// ---------------------------------------------------------------- 5. axoneme (9 + 2) and centriole (9 triplets)
const ring = (cx, cy, r, n, f) => Array.from({ length: n }, (_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return f(cx + r * Math.cos(a), cy + r * Math.sin(a), a);
}).join('');
export const AXONEME_SVG = svgDoc(
  500,
  240,
  'Cross-sections of a cilium or flagellum and a centriole: the axoneme has nine outer doublet microtubules and two central single microtubules, joined by radial spokes and enclosed by the plasma membrane; a centriole or basal body has nine outer triplets and no central microtubules',
  [
    S.circle(120, 110, 78, { fill: 'var(--diagram-yellow)', fop: 0.1, sw: 1.8 }),
    ring(120, 110, 56, 9, (x, y, a) => S.line(120 + 12 * Math.cos(a), 110 + 12 * Math.sin(a), x - 6 * Math.cos(a), y - 6 * Math.sin(a), { w: 1, c: muted }) + S.circle(x, y, 6, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.4 }) + S.circle(x + 9 * Math.cos(a), y + 9 * Math.sin(a), 6, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.4 })),
    S.circle(114, 110, 7, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.4 }), S.circle(128, 110, 7, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1.4 }),
    lab(120, 18, 'Cilium or flagellum: nine plus two', { a: 'middle', size: 11, w: 'bold' }),
    S.lead(180, 70, 232, 56), lab(236, 59, 'Doublet (outer)', { size: 10 }),
    S.lead(130, 108, 232, 100), lab(236, 103, 'Central pair', { size: 10 }),
    S.lead(134, 92, 232, 144), lab(236, 147, 'Radial spoke', { size: 10 }),
    S.lead(190, 150, 232, 186), lab(236, 189, 'Plasma membrane', { size: 10 }),
    ring(370, 112, 54, 9, (x, y, a) => [-1, 0, 1].map((k) => S.circle(x - k * 9 * Math.sin(a) + k * 2 * Math.cos(a), y + k * 9 * Math.cos(a) + k * 2 * Math.sin(a), 5.5, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.2 })).join('')),
    lab(370, 18, 'Centriole: nine triplets', { a: 'middle', size: 11, w: 'bold' }),
    S.lead(412, 82, 446, 56), lab(440, 52, 'Triplet', { size: 10 }),
    lab(370, 205, 'No central microtubules', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// ---------------------------------------------------------------- 6. chromosome types (plain and lettered)
const PX = 5; // pixels per micrometre
function chromosome(x, c, label, { satellite = false } = {}) {
  const y0 = 60;
  const p = [];
  const cy = y0 + c.short * PX;
  p.push(S.line(x, y0, x, y0 + c.total * PX, { w: 10, cap: 'round', c: 'var(--diagram-blue)' }));
  p.push(S.circle(x, c.short === 0 ? y0 + 2 : cy, 6, { fill: 'var(--diagram-red)', fop: 0.7, sw: 1.2 }));
  if (satellite) p.push(S.line(x, y0 - 2, x, y0 - 12, { w: 1.5, c: muted }), S.circle(x, y0 - 18, 5, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 1 }));
  p.push(label);
  return p.join('');
}
const order = { plain: ['metacentric', 'submetacentric', 'acrocentric', 'telocentric'], lettered: ['acrocentric', 'telocentric', 'metacentric', 'submetacentric'] };
const sizes = (name) => CHR.find((c) => c.name === name);
export const CHROMOSOMES = svgDoc(
  480,
  210,
  'Four chromosome types by the position of the centromere (red dot): metacentric with the centromere in the middle so the arms are equal; submetacentric with it a little away from the middle; acrocentric with it near one end, here with a satellite beyond a secondary constriction; and telocentric with it at the very end',
  order.plain.map((n, i) => chromosome(70 + i * 110, sizes(n), lab(70 + i * 110, 188, n[0].toUpperCase() + n.slice(1), { a: 'middle', size: 11, w: 'bold' }), { satellite: n === 'acrocentric' })).join('') +
    lab(240, 16, 'Centromere (red) divides each chromosome into a short arm and a long arm', { a: 'middle', size: 10, c: muted }),
);
export const CHROMOSOMES_L = svgDoc(
  480,
  210,
  'Four chromosomes A to D drawn to the same scale, with the centromere shown as a red dot: A has the centromere near one end and a small satellite, B has it at the very end, C has it in the middle and D has it a little away from the middle',
  order.lettered.map((n, i) => chromosome(70 + i * 110, sizes(n), badge(70 + i * 110, 188, 'ABCD'[i]), { satellite: n === 'acrocentric' })).join('') + lab(240, 16, 'All four are drawn at the same scale', { a: 'middle', size: 10, c: muted }),
);

// ---------------------------------------------------------------- 7. transport rate graph (computed)
const GX = (s) => 60 + (s / 220) * 380;
const GY = (v) => 190 - (v / 60) * 150;
const pts = Array.from({ length: 45 }, (_, i) => i * 5);
const path = (f) => 'M' + pts.map((s) => `${GX(s).toFixed(1)} ${GY(f(s)).toFixed(1)}`).join(' L');
export const RATEGRAPH = svgDoc(
  480,
  250,
  `Rate of movement into a cell against the outside concentration: simple diffusion rises as a straight line, while carrier-mediated facilitated diffusion rises steeply at first and then levels off near its maximum of ${CARRIER.vmax} units because all the carriers are busy`,
  [
    S.line(60, 190, 450, 190, { w: 1.5 }), S.line(60, 190, 60, 30, { w: 1.5 }),
    ...[0, 20, 40, 60].map((v) => S.text(54, GY(v) + 4, String(v), { a: 'end', size: 10 }) + S.line(60, GY(v), 450, GY(v), { w: 0.5, c: muted, dash: '2 4' })),
    ...[0, 50, 100, 150, 200].map((s) => S.text(GX(s), 206, String(s), { a: 'middle', size: 10 })),
    S.path(path((s) => carrier(s)), { w: 2.5, c: 'var(--diagram-green)' }),
    S.path(path((s) => diffusion(s)), { w: 2.5, c: 'var(--diagram-blue)', dash: '5 3' }),
    ...TR_S.map((s) => S.circle(GX(s), GY(carrier(s)), 3, { fill: 'var(--diagram-green)', sw: 0 })),
    lab(150, 48, 'Carrier (facilitated diffusion)', { size: 10, c: 'var(--diagram-green)' }),
    lab(300, 176, 'Simple diffusion', { size: 10, c: 'var(--diagram-blue)' }),
    S.text(255, 226, 'Outside concentration (arbitrary units)', { a: 'middle', size: 11 }),
    S.text(64, 24, 'Rate of entry (units per minute)', { size: 11 }),
  ].join(''),
);

export const ALL = { MEMBRANE, MEMBRANE_L, CARRIERS, ENDO, ORGANELLES, AXONEME_SVG, CHROMOSOMES, CHROMOSOMES_L, RATEGRAPH };
