// SVG schematics for ISC 12 Biology ch01 (pre-fertilisation), allow-listed elements and palette colours only. The anther,
// pollen, ovule, embryo-sac and pollination drawings are copied from cbse-12-biology-ch01/src/svgs.mjs (same author); the
// lettered versions for diagram-based questions are new.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (deg) => (deg * Math.PI) / 180;
const pt = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
/** Circular arc from angle a1 to a2 (degrees, clockwise on screen). */
function arc(cx, cy, r, a1, a2) {
  const [x1, y1] = pt(cx, cy, r, a1);
  const [x2, y2] = pt(cx, cy, r, a2);
  const sweep = (((a2 - a1) % 360) + 360) % 360;
  return `M${f1(x1)} ${f1(y1)} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${f1(x2)} ${f1(y2)}`;
}
/** Elliptical arc from angle a1 to a2 (degrees, clockwise on screen). */
function earc(cx, cy, rx, ry, a1, a2) {
  const p1 = [cx + rx * Math.cos(rad(a1)), cy + ry * Math.sin(rad(a1))];
  const p2 = [cx + rx * Math.cos(rad(a2)), cy + ry * Math.sin(rad(a2))];
  const sweep = (((a2 - a1) % 360) + 360) % 360;
  return `M${f1(p1[0])} ${f1(p1[1])} A${rx} ${ry} 0 ${sweep > 180 ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])}`;
}
const nucleus = (x, y, r = 4) => S.circle(x, y, r, { fill: 'var(--diagram-muted)', sw: 0.8 });

// 1. Transverse section of a young anther + one microsporangium enlarged
const sporCells = (cx, cy, rr, step) => {
  const out = [];
  for (let x = cx - rr; x <= cx + rr; x += step)
    for (let y = cy - rr; y <= cy + rr; y += step) if ((x - cx) ** 2 + (y - cy) ** 2 <= (rr - step / 2) ** 2) out.push(S.circle(x, y, step / 2 - 0.6, { sw: 0.7, fill: 'var(--diagram-yellow)', fop: 0.35 }));
  return out.join('');
};
const MCX = 330;
const MCY = 120;
export const ANTHER = svgDoc(
  540,
  250,
  'Left: transverse section of a young anther with two lobes, each holding two microsporangia, joined by the connective. Right: one microsporangium enlarged, showing the wall layers from outside in: epidermis, endothecium, middle layers and tapetum, around the sporogenous tissue',
  [
    S.text(95, 18, 'Young anther (T.S.)', { a: 'middle', size: 12, w: 'bold' }),
    S.ellipse(60, 120, 44, 82, { fill: 'var(--diagram-fill)' }),
    S.ellipse(130, 120, 44, 82, { fill: 'var(--diagram-fill)' }),
    S.ellipse(95, 120, 14, 26, { fill: 'var(--diagram-fill)', sw: 0 }),
    ...[[56, 78], [56, 162], [134, 78], [134, 162]].map(([x, y]) => S.circle(x, y, 26, { fill: 'var(--diagram-yellow)', fop: 0.3 })),
    S.circle(95, 120, 7, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    lab(95, 222, 'Connective (with vascular bundle)', { a: 'middle' }),
    S.lead(95, 211, 95, 128),
    lab(4, 244, 'Microsporangia (pollen sacs): four per anther', {}),
    S.lead(60, 234, 56, 188),
    S.lead(130, 234, 134, 188),
    S.text(MCX, 18, 'One microsporangium enlarged', { a: 'middle', size: 12, w: 'bold' }),
    S.circle(MCX, MCY, 92, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.circle(MCX, MCY, 84, { sw: 1 }),
    S.circle(MCX, MCY, 76, { sw: 1, dash: '4 3' }),
    S.circle(MCX, MCY, 68, { sw: 1 }),
    S.circle(MCX, MCY, 58, { fill: 'var(--diagram-accent)', fop: 0.25, sw: 1.2 }),
    S.circle(MCX, MCY, 48, { fill: 'var(--diagram-fill)', sw: 1 }),
    sporCells(MCX, MCY, 48, 12),
    lab(440, 36, 'Epidermis'),
    S.lead(438, 33, ...pt(MCX, MCY, 90, -50)),
    lab(440, 72, 'Endothecium'),
    S.lead(438, 69, ...pt(MCX, MCY, 81, -32)),
    lab(440, 108, 'Middle layers'),
    S.lead(438, 105, ...pt(MCX, MCY, 72, -8)),
    lab(440, 150, 'Tapetum'),
    lab(440, 163, '(nourishes'),
    lab(440, 176, 'pollen)'),
    S.lead(438, 147, ...pt(MCX, MCY, 53, 22)),
    lab(440, 214, 'Sporogenous'),
    lab(440, 227, 'tissue'),
    S.lead(438, 211, ...pt(MCX, MCY, 30, 40)),
  ].join(''),
);

// 2. Mature pollen grain (two-celled stage)
const PX = 120;
const PY = 120;
export const POLLEN = svgDoc(
  430,
  240,
  'A mature two-celled pollen grain: a tough outer exine with a germ pore where exine is absent, a thin inner intine, a large vegetative cell with an irregular nucleus, and a small spindle-shaped generative cell floating in its cytoplasm',
  [
    S.circle(PX, PY, 86, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 0 }),
    S.path(arc(PX, PY, 86, 200, 160), { c: 'var(--diagram-accent)', w: 9 }),
    ...Array.from({ length: 24 }, (_, i) => 212 + i * 13).filter((a) => a <= 510).map((a) => S.circle(...pt(PX, PY, 93, a), 3, { fill: 'var(--diagram-accent)', sw: 0 })),
    S.circle(PX, PY, 78, { w: 1, sw: 1.2 }),
    S.path('M150 84 C162 78 170 90 164 98 C176 104 166 118 156 112 C150 122 136 114 142 104 C132 98 140 84 150 84 Z', { fill: 'var(--diagram-muted)', fop: 0.6, w: 1 }),
    S.path('M70 150 C84 128 112 124 128 136 C114 156 88 164 70 150 Z', { fill: 'var(--diagram-green)', fop: 0.35, w: 1.2 }),
    S.ellipse(99, 143, 9, 5, { fill: 'var(--diagram-green)', fop: 0.8, sw: 0.8 }),
    lab(250, 34, 'Exine (sporopollenin)'),
    S.lead(248, 31, ...pt(PX, PY, 92, -48)),
    lab(250, 70, 'Intine (cellulose and pectin)'),
    S.lead(248, 67, ...pt(PX, PY, 78, -22)),
    lab(250, 104, 'Vegetative cell nucleus'),
    S.lead(248, 101, 168, 100),
    lab(250, 150, 'Vegetative cell cytoplasm'),
    S.lead(248, 147, 180, 150),
    lab(250, 196, 'Generative cell'),
    S.lead(248, 193, 110, 150),
    lab(4, 236, 'Germ pore (no exine)'),
    S.lead(30, 226, ...pt(PX, PY, 86, 180)),
  ].join(''),
);

// 3. Anatropous ovule (L.S.)
const OX = 180;
const OY = 130;
export const OVULE = svgDoc(
  440,
  300,
  'Longitudinal section of an inverted ovule: the funicle attaches it to the placenta at the hilum; two integuments enclose the nucellus except at the micropyle; the chalaza lies opposite the micropyle; the embryo sac sits inside the nucellus towards the micropyle',
  [
    S.path(earc(OX, OY, 74, 104, 100, 80), { fill: 'var(--diagram-green)', fop: 0.15, w: 1.5 }),
    S.path(earc(OX, OY, 63, 92, 100, 80), { fill: 'var(--diagram-green)', fop: 0.15, w: 1.5 }),
    S.ellipse(OX, OY - 6, 52, 82, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    S.ellipse(OX, OY + 30, 16, 40, { fill: 'var(--diagram-accent)', fop: 0.2, sw: 1.2 }),
    S.path(`M${OX + 60} ${OY + 78} C${OX + 74} ${OY + 104} ${OX + 92} ${OY + 132} ${OX + 112} ${OY + 156}`, { w: 7, c: 'var(--diagram-green)', cap: 'round' }),
    S.rect(OX + 92, OY + 156, 120, 12, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1 }),
    S.circle(OX + 60, OY + 78, 4, { fill: 'currentColor', sw: 0 }),
    S.path(`M${OX - 26} ${OY - 82} L${OX + 26} ${OY - 82}`, { w: 1, dash: '3 3', c: 'var(--diagram-muted)' }),
    lab(4, 40, 'Chalaza'),
    S.lead(48, 37, OX - 4, OY - 84),
    lab(4, 84, 'Nucellus'),
    S.lead(54, 81, OX - 34, OY - 40),
    lab(4, 128, 'Inner integument'),
    S.lead(96, 125, OX - 62, OY - 2),
    lab(4, 172, 'Outer integument'),
    S.lead(100, 169, OX - 72, OY + 30),
    lab(4, 266, 'Micropyle'),
    S.lead(58, 262, OX - 4, OY + 100),
    lab(300, 60, 'Embryo sac'),
    lab(300, 73, '(female gametophyte)'),
    S.lead(298, 64, OX + 14, OY + 26),
    lab(300, 196, 'Hilum'),
    S.lead(298, 193, OX + 64, OY + 78),
    lab(300, 236, 'Funicle'),
    S.lead(298, 232, OX + 98, OY + 140),
    lab(OX + 86, OY + 166, 'Placenta', { a: 'end' }),

  ].join(''),
);

// 4 + 5. Embryo sac (7-celled, 8-nucleate) and double fertilisation
const EX = 170;
const EY = 135;
function embryoSac({ fert = false } = {}) {
  const parts = [
    S.ellipse(EX, EY, 58, 115, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    // antipodals (chalazal end, top)
    ...[[EX - 18, EY - 92], [EX + 18, EY - 92], [EX, EY - 72]].map(([x, y]) => S.circle(x, y, 12, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 1 }) + nucleus(x, y, 3.5)),
    // polar nuclei in the central cell
    S.circle(EX - 9, EY - 4, 7, { fill: fert ? 'var(--diagram-muted)' : 'var(--diagram-red)', fop: fert ? 0.6 : 0.5, sw: 1 }),
    S.circle(EX + 9, EY - 4, 7, { fill: fert ? 'var(--diagram-muted)' : 'var(--diagram-red)', fop: fert ? 0.6 : 0.5, sw: 1 }),
    // synergids (micropylar end, bottom) with filiform apparatus
    S.path(`M${EX - 30} ${EY + 70} C${EX - 34} ${EY + 90} ${EX - 18} ${EY + 108} ${EX - 6} ${EY + 112} C${EX - 6} ${EY + 96} ${EX - 12} ${EY + 72} ${EX - 30} ${EY + 70} Z`, { fill: 'var(--diagram-green)', fop: 0.25, w: 1 }),
    S.path(`M${EX + 30} ${EY + 70} C${EX + 34} ${EY + 90} ${EX + 18} ${EY + 108} ${EX + 6} ${EY + 112} C${EX + 6} ${EY + 96} ${EX + 12} ${EY + 72} ${EX + 30} ${EY + 70} Z`, { fill: 'var(--diagram-green)', fop: 0.25, w: 1 }),
    nucleus(EX - 18, EY + 84, 3.5),
    nucleus(EX + 18, EY + 84, 3.5),
    S.path(`M${EX - 8} ${EY + 106} L${EX - 4} ${EY + 114} M${EX - 4} ${EY + 104} L${EX} ${EY + 114} M${EX + 4} ${EY + 104} L${EX} ${EY + 114} M${EX + 8} ${EY + 106} L${EX + 4} ${EY + 114}`, { w: 1 }),
    // egg cell, slightly above the synergids
    S.circle(EX, EY + 62, 15, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.2 }),
    nucleus(EX, EY + 58, 5),
  ];
  return parts.join('');
}
export const EMBRYO_SAC = svgDoc(
  420,
  270,
  'A mature embryo sac, seven cells with eight nuclei: three antipodal cells at the chalazal end, a large central cell with two polar nuclei, and at the micropylar end the egg apparatus of an egg cell and two synergids with a filiform apparatus',
  [
    embryoSac(),
    lab(250, 30, 'Chalazal end', { w: 'bold' }),
    lab(250, 52, 'Antipodal cells (3)'),
    S.lead(248, 49, EX + 30, EY - 92),
    lab(250, 112, 'Central cell with'),
    lab(250, 125, 'two polar nuclei'),
    S.lead(248, 120, EX + 16, EY - 4),
    lab(250, 186, 'Egg cell'),
    S.lead(248, 183, EX + 15, EY + 62),
    lab(250, 214, 'Synergids (2)'),
    S.lead(248, 211, EX + 26, EY + 84),
    lab(250, 238, 'Filiform apparatus'),
    S.lead(248, 235, EX + 6, EY + 110),
    lab(250, 262, 'Micropylar end', { w: 'bold' }),
    lab(4, 20, '7 cells, 8 nuclei', { w: 'bold' }),
    lab(4, 50, '3 antipodals'),
    lab(4, 66, '1 central cell (2 nuclei)'),
    lab(4, 82, '2 synergids'),
    lab(4, 98, '1 egg cell'),
  ].join(''),
);

export const DOUBLE_FERT = svgDoc(
  440,
  300,
  'Double fertilisation in the embryo sac: the pollen tube enters a synergid through the micropyle and releases two male gametes; one fuses with the egg (syngamy) to form the diploid zygote, the other fuses with the two polar nuclei (triple fusion) to form the triploid primary endosperm nucleus',
  [
    embryoSac({ fert: true }),
    S.path(`M${EX - 4} 290 C${EX - 6} ${EY + 140} ${EX - 10} ${EY + 120} ${EX - 16} ${EY + 100}`, { w: 7, c: 'var(--diagram-yellow)', cap: 'round' }),
    S.circle(EX - 18, EY + 92, 3.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.circle(EX - 22, EY + 80, 3.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.arrow(EX - 18, EY + 88, EX - 6, EY + 66, { c: 'var(--diagram-accent)', w: 1.5, size: 6 }),
    S.path(`M${EX - 24} ${EY + 76} C${EX - 44} ${EY + 40} ${EX - 30} ${EY + 10} ${EX - 18} ${EY}`, { c: 'var(--diagram-accent)', w: 1.5, dash: '4 3' }),
    S.head(EX - 17, EY, -0.9, { c: 'var(--diagram-accent)', size: 6 }),
    lab(4, 30, 'Male gamete + 2 polar', { c: 'var(--diagram-accent)' }),
    lab(4, 43, 'nuclei: triple fusion', { c: 'var(--diagram-accent)' }),
    lab(4, 56, '→ primary endosperm', { c: 'var(--diagram-accent)' }),
    lab(4, 69, 'nucleus (3n)', { c: 'var(--diagram-accent)' }),
    S.lead(60, 74, EX - 16, EY - 8),
    lab(250, 180, 'Male gamete + egg:', { c: 'var(--diagram-accent)' }),
    lab(250, 193, 'syngamy → zygote (2n)', { c: 'var(--diagram-accent)' }),
    S.lead(248, 186, EX + 15, EY + 62),
    lab(250, 236, 'Pollen tube enters'),
    lab(250, 249, 'a synergid'),
    S.lead(248, 240, EX - 2, EY + 112),
    lab(250, 286, 'Micropyle'),
    S.lead(248, 283, EX + 2, 262),
    lab(250, 40, 'Antipodals'),
    S.lead(248, 37, EX + 30, EY - 92),
  ].join(''),
);

// 6. Kinds of pollination
const flowerAt = (x, y, label) =>
  [
    ...[0, 72, 144, 216, 288].map((a) => S.circle(...pt(x, y, 11, a - 90), 9, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1 })),
    S.circle(x, y, 6, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.text(x, y - 26, label, { a: 'middle', size: 12, w: 'bold' }),
  ].join('');
export const POLL_TYPES = svgDoc(
  440,
  240,
  'Three kinds of pollination: autogamy within flower A, geitonogamy from flower A to flower B on the same plant, and xenogamy from flower B of plant 1 to flower C of a different plant 2',
  [
    S.line(0, 222, 440, 222, { c: 'var(--diagram-brown)', w: 1.5 }),
    S.path('M110 222 L110 120 M110 160 C90 140 80 110 80 90 M110 140 C130 120 150 100 160 70', { w: 2.5, c: 'var(--diagram-green)' }),
    flowerAt(80, 80, 'A'),
    flowerAt(160, 60, 'B'),
    S.text(110, 238, 'Plant 1', { a: 'middle', size: 11 }),
    S.path('M350 222 L350 90', { w: 2.5, c: 'var(--diagram-green)' }),
    flowerAt(350, 80, 'C'),
    S.text(350, 238, 'Plant 2 (same species)', { a: 'middle', size: 11 }),
    S.path('M64 92 C40 110 46 130 66 120 C76 114 76 104 74 98', { c: 'var(--diagram-accent)', w: 1.5 }),
    S.head(74, 97, -1.6, { c: 'var(--diagram-accent)', size: 6 }),
    lab(4, 150, 'Autogamy', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(4, 163, '(same flower)'),
    S.path('M92 70 C108 44 132 40 146 52', { c: 'var(--diagram-accent)', w: 1.5 }),
    S.head(148, 54, 0.7, { c: 'var(--diagram-accent)', size: 6 }),
    lab(180, 150, 'Geitonogamy', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(180, 163, '(another flower, same plant)'),
    S.lead(200, 140, 122, 48),
    S.path('M176 62 C230 30 290 40 334 72', { c: 'var(--diagram-accent)', w: 1.5, dash: '5 3' }),
    S.head(336, 74, 0.7, { c: 'var(--diagram-accent)', size: 6 }),
    lab(220, 100, 'Xenogamy', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(220, 113, '(flower of a different plant)'),
  ].join(''),
);


// ---------------------------------------------------------------- lettered versions for diagram-based questions
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
export const EMBRYO_SAC_Q = svgDoc(
  420,
  270,
  'An unlabelled mature embryo sac with five parts marked by letters: A at the chalazal-end cells, B at the two nuclei in the large central cell, C at the large cell just above the micropylar-end pair, D at one of the micropylar-end pair, and E at the finger-like thickenings at the micropylar tip',
  [
    embryoSac(),
    tag(290, 46, 'A'), S.lead(281, 46, EX + 30, EY - 92),
    tag(290, 120, 'B'), S.lead(281, 120, EX + 16, EY - 4),
    tag(290, 183, 'C'), S.lead(281, 183, EX + 15, EY + 62),
    tag(290, 211, 'D'), S.lead(281, 211, EX + 26, EY + 84),
    tag(290, 240, 'E'), S.lead(281, 240, EX + 6, EY + 110),
    lab(4, 20, 'Micropylar end at the bottom', { c: 'var(--diagram-muted)' }),
  ].join(''),
);
export const ANTHER_Q = svgDoc(
  540,
  250,
  'An enlarged microsporangium of a young anther with its wall layers marked by letters from outside in: P outermost, Q the second layer, R the middle layers, S the innermost layer with dense cells, and T the central tissue',
  [
    S.circle(MCX, MCY, 92, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.circle(MCX, MCY, 84, { sw: 1 }),
    S.circle(MCX, MCY, 76, { sw: 1, dash: '4 3' }),
    S.circle(MCX, MCY, 68, { sw: 1 }),
    S.circle(MCX, MCY, 58, { fill: 'var(--diagram-accent)', fop: 0.25, sw: 1.2 }),
    S.circle(MCX, MCY, 48, { fill: 'var(--diagram-fill)', sw: 1 }),
    sporCells(MCX, MCY, 48, 12),
    tag(470, 36, 'P'), S.lead(461, 36, ...pt(MCX, MCY, 90, -50)),
    tag(470, 72, 'Q'), S.lead(461, 72, ...pt(MCX, MCY, 81, -32)),
    tag(470, 108, 'R'), S.lead(461, 108, ...pt(MCX, MCY, 72, -8)),
    tag(470, 150, 'S'), S.lead(461, 150, ...pt(MCX, MCY, 53, 22)),
    tag(470, 214, 'T'), S.lead(461, 214, ...pt(MCX, MCY, 30, 40)),
    lab(20, 120, 'One microsporangium', { w: 'bold' }),
    lab(20, 136, '(T.S., enlarged)'),
  ].join(''),
);

export const ALL = { ANTHER, POLLEN, OVULE, EMBRYO_SAC, POLL_TYPES, EMBRYO_SAC_Q, ANTHER_Q };
