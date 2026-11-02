// SVG diagrams for ch02 Biological Classification (allow-listed elements, palette colours only).
// Cells and organisms are neutral, labelled schematics (not to scale).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { LICHEN } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const box = (x, y, w, h, c, l1, l2) =>
  S.rect(x, y, w, h, { rx: 7, c, fill: c, fop: 0.14, sw: 1.6 }) + lab(x + w / 2, y + (l2 ? h / 2 - 2 : h / 2 + 4), l1, { a: 'middle', w: 'bold', size: 12 }) + (l2 ? lab(x + w / 2, y + h / 2 + 13, l2, { a: 'middle', size: 10.5 }) : '');

// 1. The five kingdoms
export const FIVEK = svgDoc(
  620,
  330,
  'Whittaker’s five kingdoms (1969). Monera, the prokaryotes, lie at the base. Above them the Protista are unicellular eukaryotes. Three multicellular eukaryotic kingdoms rise from the Protista: Fungi, which absorb food; Plantae, which make food by photosynthesis; and Animalia, which ingest food',
  [
    lab(310, 18, 'Five-kingdom classification (R. H. Whittaker, 1969)', { a: 'middle', w: 'bold', size: 12 }),
    lab(310, 46, 'Multicellular eukaryotes', { a: 'middle', size: 11, c: MUTED }),
    S.line(310, 190, 120, 112, { c: MUTED, w: 1.5 }),
    S.line(310, 190, 310, 112, { c: MUTED, w: 1.5 }),
    S.line(310, 190, 500, 112, { c: MUTED, w: 1.5 }),
    S.line(310, 270, 310, 232, { c: MUTED, w: 1.5 }),
    box(40, 58, 160, 54, BROWN, 'Fungi', 'absorb food (chitin walls)'),
    box(230, 58, 160, 54, GREEN, 'Plantae', 'photosynthesis (cellulose walls)'),
    box(420, 58, 160, 54, BLUE, 'Animalia', 'ingest food (no cell wall)'),
    box(230, 190, 160, 42, ACC, 'Protista', 'unicellular eukaryotes'),
    box(230, 270, 160, 42, RED, 'Monera', 'no nuclear membrane'),
    lab(404, 215, 'Eukaryotes with a nuclear membrane', { size: 10.5, c: MUTED }),
    lab(404, 297, 'Prokaryotes', { size: 10.5, c: MUTED }),
  ].join(''),
);

// 2. Shapes of bacteria and a cyanobacterial filament (labelled and lettered versions)
const cell = (c = GREEN) => ({ fill: c, fop: 0.22, c, sw: 1.6 });
const bactShapes = () =>
  [
    // coccus
    S.circle(48, 74, 15, cell()), S.circle(78, 74, 15, cell()), S.circle(63, 100, 15, cell()),
    // bacillus
    S.rect(130, 56, 76, 24, { rx: 12, ...cell(BLUE) }), S.rect(130, 92, 76, 24, { rx: 12, ...cell(BLUE) }),
    // vibrio
    S.path('M252 58 C296 58 304 100 270 122', { c: ACC, w: 16, cap: 'round' }),
    S.path('M252 58 C296 58 304 100 270 122', { c: FILL, w: 10, cap: 'round' }),
    // spirillum
    S.path('M352 52 C374 52 374 76 352 76 C330 76 330 100 352 100 C374 100 374 124 352 124', { c: BROWN, w: 14, cap: 'round' }),
    S.path('M352 52 C374 52 374 76 352 76 C330 76 330 100 352 100 C374 100 374 124 352 124', { c: FILL, w: 8, cap: 'round' }),
    // filament with heterocyst
    ...[0, 1, 2, 4, 5, 6].map((i) => S.rect(444 + i * 21, 76, 19, 26, { rx: 3, ...cell(GREEN) })),
    S.circle(444 + 3 * 21 + 10, 89, 13, { fill: ACC, fop: 0.35, c: ACC, sw: 2 }),
  ].join('');
export const BACT = svgDoc(
  620,
  170,
  'Shapes of bacteria and a cyanobacterial filament: coccus (spherical), bacillus (rod-shaped), vibrio (comma-shaped), spirillum (spiral), and a filament of a cyanobacterium such as Nostoc with one larger, thick-walled cell, the heterocyst, which fixes atmospheric nitrogen',
  [
    bactShapes(),
    lab(63, 146, 'Coccus', { a: 'middle', w: 'bold' }),
    lab(63, 160, '(spherical)', { a: 'middle', size: 10 }),
    lab(168, 146, 'Bacillus', { a: 'middle', w: 'bold' }),
    lab(168, 160, '(rod)', { a: 'middle', size: 10 }),
    lab(276, 146, 'Vibrio', { a: 'middle', w: 'bold' }),
    lab(276, 160, '(comma)', { a: 'middle', size: 10 }),
    lab(352, 146, 'Spirillum', { a: 'middle', w: 'bold' }),
    lab(352, 160, '(spiral)', { a: 'middle', size: 10 }),
    lab(520, 146, 'Cyanobacterial filament', { a: 'middle', w: 'bold' }),
    lab(520, 160, 'larger cell: heterocyst', { a: 'middle', size: 10, c: ACC }),
  ].join(''),
);
export const BACT_Q = svgDoc(
  620,
  170,
  'Five unlabelled bacterial forms marked by letters: A a cluster of spherical cells, B two rod-shaped cells, C a comma-shaped cell, D a spiral cell, and E a filament of cells in which one cell is larger and thick-walled',
  [bactShapes(), ...[['A', 63], ['B', 168], ['C', 276], ['D', 352], ['E', 520]].map(([l, x]) => S.text(x, 152, l, { a: 'middle', size: 16, w: 'bold' }))].join(''),
);

// 3. Four protists
export const PROTIST = svgDoc(
  640,
  220,
  'Four protists drawn as schematics. Amoeba has finger-like pseudopodia and a nucleus. Paramecium is slipper-shaped, covered with cilia, with an oral groove and a large nucleus. Euglena is spindle-shaped with a long flagellum, a flexible protein-rich pellicle instead of a cell wall and chloroplasts. A diatom has a silica shell of two overlapping halves fitting like a soap box',
  [
    // Amoeba
    S.path('M40 90 C46 60 80 56 96 66 C110 52 140 60 134 88 C150 100 140 126 118 126 C108 140 70 140 62 122 C36 122 30 104 40 90 Z', { fill: GREEN, fop: 0.16, c: GREEN, w: 1.6 }),
    S.ellipse(34, 80, 13, 8, { fill: GREEN, fop: 0.16, c: GREEN, sw: 1.6 }),
    S.ellipse(146, 78, 14, 8, { fill: GREEN, fop: 0.16, c: GREEN, sw: 1.6 }),
    S.ellipse(56, 136, 9, 13, { fill: GREEN, fop: 0.16, c: GREEN, sw: 1.6 }),
    S.circle(88, 96, 12, { fill: BROWN, fop: 0.35, c: BROWN, sw: 1.4 }),
    lab(88, 176, 'Amoeba', { a: 'middle', w: 'bold' }),
    lab(88, 190, 'pseudopodia', { a: 'middle', size: 10 }),
    // Paramecium
    S.ellipse(250, 98, 56, 24, { fill: BLUE, fop: 0.14, c: BLUE, sw: 1.6 }),
    ...Array.from({ length: 16 }, (_, i) => {
      const t = (i / 16) * Math.PI * 2;
      const x = 250 + 56 * Math.cos(t);
      const y = 98 + 24 * Math.sin(t);
      return S.line(x, y, x + 7 * Math.cos(t), y + 7 * Math.sin(t), { c: BLUE, w: 1.2 });
    }),
    S.path('M214 98 L246 108', { c: MUTED, w: 2 }),
    S.ellipse(268, 92, 12, 8, { fill: BROWN, fop: 0.35, c: BROWN, sw: 1.2 }),
    lab(250, 176, 'Paramecium', { a: 'middle', w: 'bold' }),
    lab(250, 190, 'cilia, oral groove', { a: 'middle', size: 10 }),
    // Euglena
    S.path('M366 98 C380 78 428 78 446 98 C428 118 380 118 366 98 Z', { fill: GREEN, fop: 0.16, c: GREEN, sw: 1.6 }),
    S.path('M366 98 C352 84 346 70 354 58 C358 52 364 52 368 58', { c: ACC, w: 2 }),
    ...[[386, 92], [402, 102], [418, 92]].map(([x, y]) => S.ellipse(x, y, 7, 4, { fill: GREEN, fop: 0.6, c: GREEN, sw: 0.8 })),
    lab(406, 176, 'Euglena', { a: 'middle', w: 'bold' }),
    lab(406, 190, 'flagellum, pellicle,', { a: 'middle', size: 10 }),
    lab(406, 203, 'chloroplasts', { a: 'middle', size: 10 }),
    // Diatom
    S.rect(520, 76, 84, 46, { rx: 8, fill: FILL, c: ACC, sw: 1.8 }),
    S.rect(514, 70, 84, 46, { rx: 8, fill: FILL, c: ACC, sw: 1.8, fop: 0.2 }),
    ...[528, 540, 552, 564, 576, 588].map((x) => S.line(x, 80, x, 112, { c: MUTED, w: 0.8 })),
    lab(560, 176, 'Diatom', { a: 'middle', w: 'bold' }),
    lab(560, 190, 'silica shell of', { a: 'middle', size: 10 }),
    lab(560, 203, 'two halves', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Fungal hyphae and mycelium
const nuc = (x, y) => S.circle(x, y, 4.5, { fill: BROWN, fop: 0.5, c: BROWN, sw: 1 });
export const HYPHAE = svgDoc(
  640,
  230,
  'Fungal hyphae and mycelium. A coenocytic hypha is a continuous tube of cytoplasm with many nuclei and no cross walls. A septate hypha is divided by cross walls (septa) into compartments, each with one or more nuclei. The hyphal wall is made of chitin and polysaccharides. A branching network of hyphae makes up the mycelium',
  [
    lab(20, 18, 'Coenocytic hypha (aseptate)', { w: 'bold' }),
    S.rect(20, 28, 290, 30, { rx: 14, fill: BROWN, fop: 0.12, c: BROWN, sw: 1.8 }),
    ...[48, 92, 140, 180, 232, 278].map((x, i) => nuc(x, i % 2 ? 48 : 38)),
    lab(20, 76, 'continuous cytoplasm, many nuclei, no cross walls', { size: 10.5, c: MUTED }),
    lab(20, 112, 'Septate hypha', { w: 'bold' }),
    S.rect(20, 122, 290, 30, { rx: 14, fill: BROWN, fop: 0.12, c: BROWN, sw: 1.8 }),
    ...[88, 164, 240].map((x) => S.line(x, 122, x, 152, { c: BROWN, w: 2.4 })),
    ...[52, 126, 202, 276].map((x) => nuc(x, 137)),
    lab(20, 170, 'divided by cross walls (septa); one or more nuclei per compartment', { size: 10.5, c: MUTED }),
    lab(20, 196, 'Hyphal wall: chitin and polysaccharides', { size: 10.5, c: BROWN }),
    lab(350, 18, 'Mycelium', { w: 'bold' }),
    S.path('M350 150 C390 140 420 120 450 118 C480 116 500 90 540 80 M450 118 C470 140 500 150 540 150 M400 134 C410 110 420 80 440 54 M540 80 C560 70 580 60 610 50 M540 150 C570 160 590 180 620 186 M450 118 C440 150 436 180 420 200', { c: BROWN, w: 2.4 }),
    lab(350, 214, 'network of branching hyphae', { size: 10.5, c: MUTED }),
  ].join(''),
);

// 5. A bacteriophage, a virus particle and a viroid
const hexHead = 'M110 24 L136 40 L136 70 L110 86 L84 70 L84 40 Z';
export const VIRUS = svgDoc(
  700,
  290,
  'A bacteriophage, a generic virus particle and a viroid. The bacteriophage has a head (protein coat or capsid built of capsomeres) enclosing double-stranded DNA, a collar, a tail sheath, a base plate and tail fibres. A virus particle has nucleic acid, DNA or RNA, inside a protein capsid. A viroid is only a short free RNA molecule of low molecular weight with no protein coat',
  [
    lab(20, 16, 'Bacteriophage', { w: 'bold' }),
    S.path(hexHead, { fill: BLUE, fop: 0.18, c: BLUE, w: 1.8 }),
    S.path('M96 48 C104 42 112 56 122 50 C128 46 124 64 112 62 C100 60 98 70 108 72', { c: ACC, w: 1.6 }),
    S.rect(100, 86, 20, 8, { fill: FILL, c: currentColorSafe(), sw: 1.2 }),
    S.rect(104, 94, 12, 70, { fill: BLUE, fop: 0.3, c: BLUE, sw: 1.4 }),
    ...[104, 114, 124, 134, 144, 154].map((y) => S.line(104, y, 116, y, { c: BLUE, w: 1 })),
    S.rect(92, 164, 36, 8, { fill: FILL, c: currentColorSafe(), sw: 1.2 }),
    ...[[92, 170, 70, 214], [100, 172, 90, 222], [120, 172, 130, 222], [128, 170, 150, 214], [110, 172, 110, 226]].map(([a, b, c, d]) => S.line(a, b, c, d, { c: MUTED, w: 1.4 })),
    lab(164, 50, 'Head (capsid) with DNA', { size: 10.5 }),
    S.lead(160, 47, 138, 52),
    lab(164, 90, 'Collar', { size: 10.5 }),
    S.lead(160, 87, 122, 90),
    lab(164, 130, 'Tail sheath', { size: 10.5 }),
    S.lead(160, 127, 118, 130),
    lab(164, 172, 'Base plate', { size: 10.5 }),
    S.lead(160, 169, 130, 169),
    lab(164, 214, 'Tail fibres', { size: 10.5 }),
    S.lead(160, 211, 138, 216),
    lab(340, 16, 'Virus particle', { w: 'bold' }),
    S.circle(392, 90, 40, { fill: BLUE, fop: 0.14, c: BLUE, w: 1.8 }),
    S.circle(392, 90, 26, { fill: FILL, c: MUTED, sw: 1 }),
    S.path('M376 90 C382 76 392 100 398 84 C404 72 410 96 408 92', { c: ACC, w: 1.8 }),
    lab(450, 78, 'Nucleic acid (DNA or RNA)', { size: 10.5 }),
    lab(450, 92, 'inside a protein coat (capsid)', { size: 10.5 }),
    lab(450, 106, 'made of capsomeres', { size: 10.5 }),
    lab(340, 176, 'Viroid', { w: 'bold' }),
    S.path('M380 214 C370 196 390 184 404 194 C420 204 412 226 394 228 C384 228 380 222 380 214', { c: ACC, w: 2.4 }),
    lab(450, 204, 'Free RNA of low molecular weight', { size: 10.5 }),
    lab(450, 218, 'no protein coat', { size: 10.5 }),
  ].join(''),
);
function currentColorSafe() {
  return 'currentColor';
}

// 6. A lichen in section
const hyphaLine = (x, y, w) => S.path(`M${x} ${y} C${x + w * 0.25} ${y - 8} ${x + w * 0.5} ${y + 8} ${x + w * 0.75} ${y - 6} S${x + w} ${y + 4} ${x + w} ${y}`, { c: BROWN, w: 1.8 });
export const LICHEN_SVG = svgDoc(
  600,
  260,
  'A lichen in section: a symbiotic association of an alga (the phycobiont) and a fungus (the mycobiont). Dense fungal hyphae form the upper and lower layers and enclose a middle layer of algal cells. The alga photosynthesises and supplies food; the fungus gives shelter, absorbs water and minerals and protects the alga. Lichens do not grow where the air is polluted, so they are pollution indicators',
  [
    S.rect(20, 30, 330, 180, { rx: 10, c: MUTED, fill: FILL, sw: 1.4 }),
    ...[44, 54, 64].map((y) => hyphaLine(30, y, 310)),
    S.line(20, 78, 350, 78, { c: MUTED, w: 0.8, dash: '3 3' }),
    ...[[50, 100], [92, 112], [134, 98], [176, 114], [218, 100], [260, 112], [300, 100], [72, 134], [118, 140], [164, 134], [210, 142], [256, 136], [304, 140]].map(([x, y]) => S.circle(x, y, 11, { fill: GREEN, fop: 0.4, c: GREEN, sw: 1.2 })),
    ...[96, 106, 124, 150].map((y, i) => hyphaLine(30, y + 12 + (i % 2) * 4, 310)),
    S.line(20, 160, 350, 160, { c: MUTED, w: 0.8, dash: '3 3' }),
    ...[176, 188, 198].map((y) => hyphaLine(30, y, 310)),
    lab(34, 24, 'Upper layer: dense fungal hyphae', { size: 10.5, c: BROWN }),
    lab(34, 228, 'Lower layer: loose hyphae that attach to the bark', { size: 10.5, c: BROWN }),
    S.arrow(360, 110, 430, 88, { c: GREEN, w: 2 }),
    lab(436, 80, 'Alga (phycobiont)', { w: 'bold', c: GREEN }),
    lab(436, 94, 'makes food by photosynthesis', { size: 10.5 }),
    S.arrow(360, 190, 430, 170, { c: BROWN, w: 2 }),
    lab(436, 162, 'Fungus (mycobiont)', { w: 'bold', c: BROWN }),
    lab(436, 176, 'shelter, water, protection', { size: 10.5 }),
    lab(20, 252, `Lichen cover falls from ${LICHEN[3][1]} percent in a forest to ${LICHEN[0][1]} percent in a city centre`, { size: 10, c: MUTED }),
  ].join(''),
);

export const ALL = { FIVEK, BACT, BACT_Q, PROTIST, HYPHAE, VIRUS, LICHEN_SVG };
