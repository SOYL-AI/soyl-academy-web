// SVG diagrams for ISC 11 Biology ch02: a typical bacterial cell (labelled and lettered), bacterial shapes, the two kinds of
// bacterial cell wall, and the three-domain tree.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = 'var(--diagram-muted)';

/** The drawing of a rod-shaped bacterial cell with all its parts, no text. */
function cell() {
  const dots = [[185, 138], [200, 146], [215, 132], [236, 146], [250, 134], [262, 148], [228, 100], [214, 104], [252, 100], [196, 104]];
  return [
    S.rect(100, 60, 240, 120, { rx: 60, fill: 'var(--diagram-yellow)', fop: 0.22, sw: 1.2 }), // capsule
    S.rect(114, 74, 212, 92, { rx: 46, fill: 'var(--diagram-fill)', fop: 1, sw: 2.2 }), // cell wall
    S.rect(122, 82, 196, 76, { rx: 38, fill: 'var(--diagram-blue)', fop: 0.08, sw: 1.2 }), // plasma membrane and cytoplasm
    S.path('M170 112 C176 98 200 96 208 110 C216 122 232 118 238 126 C244 138 224 144 212 138 C198 142 176 138 170 124 Z', { c: 'var(--diagram-brown)', w: 1.6, fill: 'var(--diagram-brown)', fop: 0.18 }), // nucleoid
    S.circle(284, 120, 8, { c: 'var(--diagram-red)', sw: 1.6 }), // plasmid
    ...dots.map(([x, y]) => S.circle(x, y, 2, { c: 'currentColor', sw: 0, fill: 'currentColor' })),
    S.path('M146 82 C148 94 158 98 154 108 C150 114 142 108 146 100', { c: 'currentColor', w: 1.4 }), // mesosome
    S.path('M326 120 C338 108 350 132 362 118 C374 106 386 130 398 116 C406 110 412 112 416 114', { c: 'currentColor', w: 2.2 }), // flagellum
    ...[150, 190, 230, 270].map((x) => S.line(x, 60, x, 46, { w: 1.6 })), // pili
  ].join('');
}

export const BACT = svgDoc(
  470,
  240,
  'A typical rod-shaped bacterial cell: from outside to inside a capsule, a cell wall and a plasma membrane enclose the cytoplasm, which contains a nucleoid with the single circular chromosome and no nuclear membrane, a small ring-shaped plasmid, ribosomes and a mesosome; pili project from the surface and a flagellum extends from one end',
  [
    cell(),
    lab(92, 74, 'Capsule', { a: 'end', size: 10 }), S.lead(95, 71, 107, 90),
    lab(92, 108, 'Cell wall', { a: 'end', size: 10 }), S.lead(95, 105, 119, 104),
    lab(92, 142, 'Plasma membrane', { a: 'end', size: 10 }), S.lead(95, 139, 123, 128),
    lab(190, 34, 'Pili (fimbriae)', { a: 'middle' }), S.lead(190, 38, 190, 46),
    lab(380, 100, 'Flagellum', { a: 'middle' }),
    lab(124, 214, 'Mesosome', { a: 'middle' }), S.lead(130, 200, 150, 104),
    lab(205, 214, 'Nucleoid', { a: 'middle' }), S.lead(205, 200, 205, 130),
    lab(262, 214, 'Ribosomes', { a: 'middle' }), S.lead(262, 200, 250, 152),
    lab(330, 214, 'Plasmid', { a: 'middle' }), S.lead(325, 200, 288, 128),
    lab(225, 94, 'Cytoplasm', { a: 'middle', c: muted, size: 10 }),
  ].join(''),
);

const L = (x, y, t) => S.circle(x, y, 10, { fill: 'var(--diagram-fill)', sw: 1.4 }) + S.text(x, y + 4, t, { a: 'middle', size: 12, w: 'bold' });
export const BACT_L = svgDoc(
  470,
  240,
  'The same bacterial cell with five parts marked by the letters A to E and no names: A marks the outermost slime layer, B the rigid layer just inside it, C the thin membrane beneath that, D the region of cytoplasm holding the circular chromosome and E the whip-like structure at one end',
  [
    cell(),
    L(70, 70, 'A'), S.lead(80, 72, 106, 88),
    L(70, 106, 'B'), S.lead(80, 106, 118, 104),
    L(70, 142, 'C'), S.lead(80, 142, 123, 128),
    L(205, 212, 'D'), S.lead(205, 202, 205, 130),
    L(395, 96, 'E'), S.lead(392, 104, 380, 122),
    lab(235, 20, 'Typical bacterial cell', { a: 'middle', w: 'bold' }),
  ].join(''),
);

// 3. Shapes of bacteria
const coc = (x, y) => S.circle(x, y, 8, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.3 });
const rod = (x, y, a = 0) => `<g transform="rotate(${a} ${x} ${y})">${S.rect(x - 18, y - 7, 36, 14, { rx: 7, fill: 'var(--diagram-green)', fop: 0.3, sw: 1.3 })}</g>`;
export const SHAPES = svgDoc(
  480,
  250,
  'Seven bacterial forms: spherical cocci seen singly, as a pair (diplococcus), in a chain (streptococcus) and in a grape-like cluster (staphylococcus); a rod-shaped bacillus; a comma-shaped vibrio; and a spiral spirillum',
  [
    coc(60, 50), lab(60, 90, 'Coccus', { a: 'middle', w: 'bold' }), lab(60, 104, 'single sphere', { a: 'middle', size: 10, c: muted }),
    coc(170, 50), coc(188, 50), lab(180, 90, 'Diplococcus', { a: 'middle', w: 'bold' }), lab(180, 104, 'pair', { a: 'middle', size: 10, c: muted }),
    ...[0, 1, 2, 3, 4].map((i) => coc(280 + i * 17, 50)), lab(314, 90, 'Streptococcus', { a: 'middle', w: 'bold' }), lab(314, 104, 'chain', { a: 'middle', size: 10, c: muted }),
    ...[[420, 36], [438, 36], [411, 52], [429, 52], [447, 52], [420, 68], [438, 68]].map(([x, y]) => coc(x, y)), lab(430, 90, 'Staphylococcus', { a: 'middle', w: 'bold' }), lab(430, 104, 'cluster', { a: 'middle', size: 10, c: muted }),
    rod(70, 160), lab(70, 200, 'Bacillus', { a: 'middle', w: 'bold' }), lab(70, 214, 'rod', { a: 'middle', size: 10, c: muted }),
    S.path('M170 168 C176 148 196 148 202 168', { c: 'var(--diagram-red)', w: 7, cap: 'round' }), lab(186, 200, 'Vibrio', { a: 'middle', w: 'bold' }), lab(186, 214, 'comma', { a: 'middle', size: 10, c: muted }),
    S.path('M290 160 C298 138 306 182 314 160 C322 138 330 182 338 160 C346 138 354 182 362 160', { c: 'var(--diagram-brown)', w: 4, cap: 'round' }), lab(326, 200, 'Spirillum', { a: 'middle', w: 'bold' }), lab(326, 214, 'spiral', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 4. Gram-positive and Gram-negative cell walls
const band = (x, y, w, h, fillc, fop) => S.rect(x, y, w, h, { fill: fillc, fop, sw: 1.2 });
export const GRAM = svgDoc(
  480,
  240,
  'Cross-sections of two kinds of bacterial envelope. Gram-positive: a thick peptidoglycan layer outside the plasma membrane, which holds the purple crystal violet stain. Gram-negative: an outer membrane carrying lipopolysaccharide, a narrow periplasm containing a thin peptidoglycan layer, and the plasma membrane; it loses the crystal violet and takes the pink safranin',
  [
    lab(60, 24, 'Gram-positive', { a: 'middle', w: 'bold', size: 12 }),
    band(10, 40, 100, 60, 'var(--diagram-blue)', 0.4), band(10, 100, 100, 10, 'var(--diagram-brown)', 0.4), band(10, 110, 100, 46, 'var(--diagram-fill)', 1),
    lab(116, 74, 'Thick peptidoglycan layer', { size: 10 }), lab(116, 108, 'Plasma membrane', { size: 10 }), lab(116, 137, 'Cytoplasm', { size: 10 }),
    lab(10, 182, 'Keeps crystal violet', { w: 'bold', size: 11, c: 'var(--diagram-blue)' }), lab(10, 198, 'Stains purple', { w: 'bold', size: 11, c: 'var(--diagram-blue)' }),
    lab(290, 24, 'Gram-negative', { a: 'middle', w: 'bold', size: 12 }),
    band(240, 40, 100, 12, 'var(--diagram-red)', 0.35), band(240, 52, 100, 36, 'var(--diagram-fill)', 1), band(240, 62, 100, 10, 'var(--diagram-blue)', 0.4),
    band(240, 88, 100, 10, 'var(--diagram-brown)', 0.4), band(240, 98, 100, 58, 'var(--diagram-fill)', 1),
    lab(346, 49, 'Outer membrane (LPS)', { size: 10 }), lab(346, 70, 'Thin peptidoglycan', { size: 10 }), lab(346, 83, 'Periplasm', { size: 10 }), lab(346, 96, 'Plasma membrane', { size: 10 }), lab(346, 130, 'Cytoplasm', { size: 10 }),
    lab(240, 182, 'Loses crystal violet', { w: 'bold', size: 11, c: 'var(--diagram-red)' }), lab(240, 198, 'Stains pink with safranin', { w: 'bold', size: 11, c: 'var(--diagram-red)' }),
    lab(240, 228, 'LPS: lipopolysaccharide. Less peptidoglycan lets alcohol wash out the first stain.', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 5. Three-domain tree
export const DOMAINS = svgDoc(
  480,
  246,
  'A tree of life with three domains: from a common ancestor one branch leads to Bacteria, and a second branch splits into Archaea and Eukarya, so Archaea are more closely related to Eukarya than to Bacteria on this ribosomal RNA tree. Bacteria and Archaea are prokaryotes; Eukarya contains the kingdoms Protista, Fungi, Plantae and Animalia',
  [
    S.circle(20, 120, 4, { fill: 'currentColor' }), lab(14, 140, 'Common', { size: 10 }), lab(14, 153, 'ancestor', { size: 10 }),
    S.line(20, 120, 80, 120, { w: 2 }),
    S.line(80, 60, 80, 180, { w: 2 }),
    S.line(80, 60, 190, 60, { w: 2, c: 'var(--diagram-blue)' }),
    S.line(80, 180, 140, 180, { w: 2 }),
    S.line(140, 130, 140, 205, { w: 2 }),
    S.line(140, 130, 190, 130, { w: 2, c: 'var(--diagram-red)' }),
    S.line(140, 205, 190, 205, { w: 2, c: 'var(--diagram-green)' }),
    lab(198, 64, 'Bacteria', { w: 'bold', c: 'var(--diagram-blue)' }), lab(198, 78, 'Prokaryotes; peptidoglycan wall', { size: 10, c: muted }),
    lab(198, 134, 'Archaea', { w: 'bold', c: 'var(--diagram-red)' }), lab(198, 148, 'Prokaryotes; no peptidoglycan', { size: 10, c: muted }),
    lab(198, 209, 'Eukarya', { w: 'bold', c: 'var(--diagram-green)' }), lab(198, 223, 'Eukaryotes: Protista, Fungi,', { size: 10, c: muted }), lab(198, 236, 'Plantae and Animalia', { size: 10, c: muted }),
    
  ].join(''),
);

export const ALL = { BACT, BACT_L, SHAPES, GRAM, DOMAINS };
