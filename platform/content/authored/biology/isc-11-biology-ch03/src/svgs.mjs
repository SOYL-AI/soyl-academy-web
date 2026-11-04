// SVG diagrams for ISC 11 Biology ch03: protozoan locomotion, fungal hyphae, a lichen section, TMV and a bacteriophage (labelled and lettered).
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = 'var(--diagram-muted)';

// 1. Locomotion in rhizopods, flagellates and ciliates
const nucleus = (x, y) => S.circle(x, y, 6, { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.35, sw: 1.2 });
export const LOCO = svgDoc(
  480,
  210,
  'Three protozoans and how they move: an amoeba, a rhizopod, with an irregular body and blunt finger-like pseudopodia; a flagellate with a long whip-like flagellum at the front; and a slipper-shaped ciliate whose body is covered with many short, beating cilia',
  [
    S.path('M40 90 C30 70 50 52 72 60 C80 40 110 40 118 62 C140 60 150 86 134 102 C140 124 110 138 92 128 C72 140 40 130 48 108 C32 106 34 96 40 90 Z', { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.15, w: 1.5 }),
    S.path('M118 62 C130 52 140 56 146 48', { w: 5, c: 'var(--diagram-blue)', cap: 'round' }),
    S.path('M48 108 C34 120 28 118 20 128', { w: 5, c: 'var(--diagram-blue)', cap: 'round' }),
    nucleus(84, 92),
    lab(84, 160, 'Amoeba', { a: 'middle', w: 'bold' }), lab(84, 175, 'Pseudopodia', { a: 'middle', size: 10, c: muted }), lab(84, 188, 'Rhizopod', { a: 'middle', size: 10, c: muted }),
    S.ellipse(250, 95, 38, 22, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.15, sw: 1.5 }), nucleus(256, 95),
    S.path('M212 90 C200 70 190 92 176 74', { w: 1.8 }), lab(166, 66, 'Flagellum', { size: 10 }),
    lab(250, 160, 'Flagellate', { a: 'middle', w: 'bold' }), lab(250, 175, 'Flagellum', { a: 'middle', size: 10, c: muted }), lab(250, 188, 'Trypanosoma', { a: 'middle', size: 10, c: muted }),
    S.path('M360 70 C410 62 446 82 442 100 C438 122 396 126 356 114 C338 106 340 80 360 70 Z', { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.12, w: 1.5 }),
    ...Array.from({ length: 12 }, (_, i) => { const x = 362 + i * 7; return S.line(x, 70, x - 2, 62, { w: 1 }) + S.line(x - 2, 118, x - 4, 126, { w: 1 }); }),
    nucleus(400, 94),
    lab(396, 160, 'Paramecium', { a: 'middle', w: 'bold' }), lab(396, 175, 'Cilia', { a: 'middle', size: 10, c: muted }), lab(396, 188, 'Ciliate', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 2. Coenocytic (aseptate) and septate hyphae
const dot = (x, y) => S.circle(x, y, 4, { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.5, sw: 1 });
export const HYPHAE = svgDoc(
  480,
  210,
  'Two kinds of fungal hypha: a coenocytic aseptate hypha, a continuous tube with no cross walls and many nuclei scattered in the cytoplasm; and a septate hypha divided by cross walls, each with a small central pore, into compartments that each hold one or two nuclei',
  [
    lab(240, 20, 'Coenocytic (aseptate) hypha', { a: 'middle', w: 'bold' }),
    S.rect(30, 34, 420, 36, { rx: 18, fill: 'var(--diagram-green)', fop: 0.15, sw: 1.5 }),
    ...[70, 120, 180, 235, 290, 340, 395].map((x, i) => dot(x, i % 2 ? 58 : 46)),
    lab(240, 90, 'No cross walls; many nuclei in continuous cytoplasm (Mucor, Rhizopus)', { a: 'middle', size: 10, c: muted }),
    lab(240, 124, 'Septate hypha', { a: 'middle', w: 'bold' }),
    S.rect(30, 138, 420, 36, { rx: 18, fill: 'var(--diagram-blue)', fop: 0.15, sw: 1.5 }),
    ...[130, 230, 330].map((x) => S.line(x, 138, x, 174, { w: 2 }) + S.circle(x, 156, 2, { fill: 'var(--diagram-fill)', sw: 1 })),
    ...[80, 180, 280, 390].map((x) => dot(x, 156)),
    lab(240, 194, 'Cross walls (septa) with a pore; one or two nuclei per compartment (Penicillium)', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 3. Section of a lichen thallus
const algae = (x, y) => S.circle(x, y, 6, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.4, sw: 1 });
export const LICHEN = svgDoc(
  480,
  240,
  'Vertical section of a lichen: an upper layer of tightly packed fungal hyphae, a layer of green algal cells wound among the hyphae, a loose medulla of hyphae, a lower layer of packed hyphae and root-like rhizines that fix the lichen to a surface; the fungus is the mycobiont and the alga the phycobiont',
  [
    S.rect(20, 30, 270, 30, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }),
    ...Array.from({ length: 13 }, (_, i) => S.line(30 + i * 20, 32, 30 + i * 20, 58, { c: 'var(--diagram-brown)', w: 1 })),
    S.rect(20, 60, 270, 36, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    ...[40, 70, 100, 135, 165, 200, 235, 265].map((x, i) => algae(x, i % 2 ? 84 : 74)),
    S.rect(20, 96, 270, 50, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    S.path('M30 110 C60 130 90 100 120 122 C150 140 180 104 210 124 C240 138 262 110 282 120', { w: 1.2, c: 'var(--diagram-brown)' }),
    S.path('M30 134 C70 114 100 140 140 118 C180 100 220 140 270 130', { w: 1.2, c: 'var(--diagram-brown)' }),
    S.rect(20, 146, 270, 24, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }),
    ...[60, 120, 180, 240].map((x) => S.line(x, 170, x - 6, 196, { w: 1.5 })),
    lab(300, 48, 'Upper cortex: packed fungal hyphae', { size: 10 }), S.lead(296, 45, 290, 45),
    lab(300, 82, 'Algal layer: phycobiont (photosynthetic)', { size: 10 }), S.lead(296, 79, 242, 80),
    lab(300, 124, 'Medulla: loose fungal hyphae', { size: 10 }), S.lead(296, 121, 284, 120),
    lab(300, 160, 'Lower cortex: packed hyphae', { size: 10 }), S.lead(296, 157, 290, 158),
    lab(300, 192, 'Rhizines: attach to bark or rock', { size: 10 }), S.lead(296, 189, 238, 188),
    lab(150, 222, 'Fungus = mycobiont; alga (or cyanobacterium) = phycobiont', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 4. Tobacco mosaic virus
export const TMV = svgDoc(
  480,
  220,
  'Tobacco mosaic virus: a straight helical rod. An outer protein coat, the capsid, is built of many identical protein subunits called capsomeres wound in a helix; inside it a single helical strand of RNA, the genetic material, runs along the axis. Part of the coat is cut away to show the RNA',
  [
    S.rect(150, 80, 290, 50, { fill: 'var(--diagram-blue)', fop: 0.18, sw: 1.5 }),
    ...Array.from({ length: 24 }, (_, i) => S.line(156 + i * 12, 80, 164 + i * 12, 130, { c: 'var(--diagram-blue)', w: 1.2 })),
    S.path('M60 105 C70 90 80 120 90 105 C100 90 110 120 120 105 C130 90 140 120 150 105 C160 92 170 118 180 105 C190 94 200 116 210 105 C220 96 230 114 240 105 C250 96 260 114 270 105 C280 96 290 114 300 105 C310 96 320 114 330 105 C340 96 350 114 360 105 C370 96 380 114 390 105 C400 96 410 114 420 105', { c: 'var(--diagram-red)', w: 2.2 }),
    S.rect(60, 80, 90, 50, { dash: '4 3', c: muted, sw: 1 }),
    lab(300, 40, 'Capsid made of capsomeres', { a: 'middle', w: 'bold' }), S.lead(290, 46, 280, 82),
    lab(105, 160, 'RNA (genetic material)', { a: 'middle', w: 'bold', c: 'var(--diagram-red)' }), S.lead(105, 148, 105, 114),
    lab(350, 150, 'Protein coat: identical subunits in a helix', { a: 'middle', size: 10, c: muted }),
    lab(105, 70, 'Coat cut away', { a: 'middle', size: 10, c: muted }),
    S.arrow(150, 180, 440, 180, { c: muted, w: 1 }), S.arrow(440, 180, 150, 180, { c: muted, w: 1 }),
    lab(295, 202, 'About 300 nanometres long and 18 nanometres wide', { a: 'middle', size: 10, c: muted }),
  ].join(''),
);

// 5. Bacteriophage (drawn once, labelled and lettered)
function phage() {
  return [
    '<polygon points="110,30 140,14 170,30 170,70 140,86 110,70" fill="var(--diagram-blue)" fill-opacity="0.2" stroke="currentColor" stroke-width="1.6"/>',
    S.path('M122 40 C132 34 140 52 150 44 C158 40 160 52 156 60 C148 70 134 56 126 66', { c: 'var(--diagram-red)', w: 1.6 }),
    S.rect(130, 86, 20, 8, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }),
    S.rect(126, 94, 28, 62, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1.4 }),
    ...[104, 114, 124, 134, 144].map((y) => S.line(126, y, 154, y, { w: 1 })),
    S.line(140, 94, 140, 156, { c: muted, w: 1 }),
    S.rect(112, 156, 56, 8, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }),
    S.line(116, 164, 80, 196, { w: 1.4 }), S.line(124, 164, 108, 204, { w: 1.4 }), S.line(156, 164, 172, 204, { w: 1.4 }), S.line(164, 164, 200, 196, { w: 1.4 }),
  ].join('');
}
export const PHAGE = svgDoc(
  480,
  220,
  'A bacteriophage of the T-even type: a many-sided head with double-stranded DNA inside, joined through a short collar to a hollow tail with a contractile sheath, which ends in a base plate that carries tail fibres',
  [
    phage(),
    lab(190, 40, 'Head (capsid) with DNA', { size: 10 }), S.lead(184, 38, 172, 40),
    lab(190, 94, 'Collar', { size: 10 }), S.lead(184, 91, 152, 90),
    lab(190, 124, 'Tail sheath and core', { size: 10 }), S.lead(184, 121, 156, 122),
    lab(190, 165, 'Base plate', { size: 10 }), S.lead(184, 162, 170, 160),
    lab(214, 205, 'Tail fibres', { size: 10 }), S.lead(210, 202, 200, 198),
  ].join(''),
);
const circ = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1.4 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
export const PHAGE_L = svgDoc(
  480,
  220,
  'The same bacteriophage with five parts marked by letters: A the many-sided head, B the short ring below it, C the long cylindrical tail, D the flat plate at the tail tip and E the thin threads that spread out from that plate',
  [
    phage(),
    circ(214, 40, 'A'), S.lead(205, 40, 172, 40),
    circ(214, 92, 'B'), S.lead(205, 91, 152, 90),
    circ(214, 124, 'C'), S.lead(205, 123, 156, 122),
    circ(214, 162, 'D'), S.lead(205, 161, 170, 160),
    circ(232, 200, 'E'), S.lead(223, 199, 202, 198),
  ].join(''),
);

export const ALL = { LOCO, HYPHAE, LICHEN, TMV, PHAGE, PHAGE_L };
