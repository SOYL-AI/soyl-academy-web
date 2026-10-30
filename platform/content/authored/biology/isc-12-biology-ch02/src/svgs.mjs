// SVG schematics for ISC 12 Biology ch02 (fertilisation, seed and fruit), allow-listed elements and palette colours only.
// Double fertilisation and the two embryos are copied from cbse-12-biology-ch01/src/svgs.mjs (same author); the seed, grain
// and fruit sections and the lettered figure are new.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';

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

// 7. Dicot embryo
export const DICOT_EMBRYO = svgDoc(
  380,
  270,
  'A mature dicot embryo: an embryonal axis with two cotyledons attached; above the cotyledons the epicotyl ends in the plumule, below them the hypocotyl ends in the radicle tipped by a root cap',
  [
    S.path('M150 70 C110 60 70 80 66 120 C62 160 100 176 146 150 Z', { fill: 'var(--diagram-green)', fop: 0.25 }),
    S.path('M170 70 C210 60 250 80 254 120 C258 160 220 176 174 150 Z', { fill: 'var(--diagram-green)', fop: 0.25 }),
    S.path('M152 150 L152 228 C152 246 168 246 168 228 L168 150', { fill: 'var(--diagram-fill)' }),
    S.path('M151 228 C150 252 170 252 169 228', { fill: 'var(--diagram-brown)', fop: 0.35, w: 1.2 }),
    S.path('M154 74 L154 52 C154 40 166 40 166 52 L166 74', { fill: 'var(--diagram-fill)' }),
    S.path('M160 42 C152 30 146 30 144 36 M160 42 C168 30 174 30 176 36', { w: 1.5, c: 'var(--diagram-green)' }),
    lab(250, 30, 'Plumule'),
    S.lead(248, 27, 176, 36),
    lab(250, 56, 'Epicotyl'),
    S.lead(248, 53, 168, 62),
    lab(270, 110, 'Cotyledons (2)'),
    S.lead(268, 107, 240, 112),
    lab(4, 110, 'Cotyledon'),
    S.lead(58, 107, 76, 112),
    lab(250, 190, 'Hypocotyl'),
    S.lead(248, 187, 170, 186),
    lab(250, 232, 'Radicle'),
    S.lead(248, 229, 170, 228),
    lab(250, 260, 'Root cap'),
    S.lead(248, 257, 166, 246),
    lab(4, 200, 'Embryonal axis'),
    S.lead(84, 197, 150, 200),
  ].join(''),
);

// 8. Monocot (grass) embryo
export const MONOCOT_EMBRYO = svgDoc(
  400,
  290,
  'Longitudinal section of a grass embryo: a single shield-shaped cotyledon, the scutellum, on one side of the embryonal axis; the shoot apex and leaf primordia enclosed in a hollow foliar sheath, the coleoptile; the radicle and root cap enclosed in a sheath, the coleorhiza; a small epiblast on the side opposite the scutellum',
  [
    S.path('M150 40 C110 60 100 150 112 220 C118 250 138 260 150 250 Z', { fill: 'var(--diagram-yellow)', fop: 0.35 }),
    S.path('M150 50 L150 250', { w: 1 }),
    S.path('M150 64 C176 60 190 76 190 96 L190 120 C190 132 176 136 168 132 L150 128', { fill: 'var(--diagram-green)', fop: 0.15 }),
    S.path('M154 120 C164 100 170 90 172 76 M154 120 C160 104 176 96 182 90', { w: 1.5, c: 'var(--diagram-green)' }),
    S.circle(156, 122, 4, { fill: 'var(--diagram-green)', sw: 0 }),
    S.path('M150 136 C164 140 172 144 172 156 L172 168 C164 172 156 172 150 170', { fill: 'var(--diagram-fill)', w: 1 }),
    S.path('M150 182 C176 186 190 204 190 226 C190 250 170 262 150 262', { fill: 'var(--diagram-brown)', fop: 0.12 }),
    S.path('M150 196 L166 196 C172 210 172 226 166 240 L150 240', { fill: 'var(--diagram-fill)', w: 1.2 }),
    S.path('M150 240 L166 240 C164 250 156 254 150 254', { fill: 'var(--diagram-brown)', fop: 0.35, w: 1 }),
    lab(4, 140, 'Scutellum'),
    lab(4, 153, '(cotyledon)'),
    S.lead(68, 145, 116, 145),
    lab(250, 60, 'Coleoptile (sheath)'),
    S.lead(248, 57, 186, 80),
    lab(250, 96, 'Shoot apex and'),
    lab(250, 109, 'leaf primordia'),
    S.lead(248, 100, 176, 92),
    lab(250, 156, 'Epiblast'),
    S.lead(248, 153, 172, 158),
    lab(250, 214, 'Coleorhiza (sheath)'),
    S.lead(248, 211, 189, 214),
    lab(250, 238, 'Radicle'),
    S.lead(248, 235, 166, 222),
    lab(250, 268, 'Root cap'),
    S.lead(248, 265, 160, 250),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch02
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });

// Dicot seed (bean) opened along the cotyledons
export const BEAN = svgDoc(
  440,
  240,
  'Structure of a bean seed: the seed coat with an outer testa and inner tegmen encloses the embryo; the hilum is the scar where the seed was attached to the stalk, with the micropyle beside it; the embryo has two large fleshy cotyledons and an embryonal axis with the plumule and the radicle; there is no endosperm',
  [
    S.path('M60 120 C60 50 140 30 200 50 C250 30 300 60 300 110 C300 180 230 200 180 190 C175 170 165 160 150 170 C120 200 60 190 60 120 Z', { fill: 'var(--diagram-brown)', fop: 0.2, w: 1.5 }),
    S.path('M72 120 C72 60 140 44 198 62 C246 44 288 70 288 112 C288 172 228 186 182 178 C176 160 162 150 148 160 C120 186 72 178 72 120 Z', { fill: 'var(--diagram-green)', fop: 0.22, w: 1 }),
    S.path('M140 168 C146 160 158 152 172 146', { w: 5, c: 'var(--diagram-yellow)', cap: 'round' }),
    S.path('M172 146 C178 136 188 136 190 140 M172 146 C176 138 172 130 166 130', { w: 1.5, c: 'var(--diagram-green)' }),
    S.circle(146, 182, 2.5, { fill: 'currentColor', sw: 0 }),
    lab(320, 40, 'Seed coat'),
    lab(320, 53, '(testa + tegmen)'),
    S.lead(318, 46, 290, 70),
    lab(320, 100, 'Cotyledon'),
    S.lead(318, 97, 240, 110),
    lab(320, 136, 'Plumule'),
    S.lead(318, 133, 190, 138),
    lab(4, 150, 'Radicle'),
    S.lead(48, 147, 141, 166),
    lab(320, 206, 'Hilum'),
    S.lead(318, 203, 172, 186),
    lab(4, 222, 'Micropyle'),
    S.lead(60, 216, 145, 184),
    lab(4, 20, 'Bean seed: non-albuminous (no endosperm)', { w: 'bold' }),
  ].join(''),
);

// Monocot grain (maize), L.S.; with `letters` the names are replaced by A–F tags for diagram-based questions
function maize(letters) {
  const label = (x, y, name, letter, tx, ty) =>
    letters ? tag(x + 8, y - 4, letter) + S.lead(x - 2, y - 4, tx, ty) : lab(x, y, name) + S.lead(x - 2, y - 3, tx, ty);
  return [
    S.path('M150 30 C230 30 270 90 262 170 C254 240 208 282 165 282 C120 282 66 242 58 170 C50 90 90 30 150 30 Z', { fill: 'var(--diagram-yellow)', fop: 0.3, c: 'var(--diagram-brown)', w: 4 }),
    S.path('M68 170 C62 98 98 44 150 44 C204 44 244 98 250 170', { dash: '4 3', w: 1.5, c: 'var(--diagram-accent)' }),
    S.path('M150 202 C160 152 220 150 246 190 C258 232 232 272 196 276 C166 276 146 242 150 202 Z', { fill: 'var(--diagram-green)', fop: 0.25, w: 1.2 }),
    S.ellipse(224, 200, 9, 20, { fill: 'var(--diagram-green)', fop: 0.2, sw: 1 }),
    S.path('M224 214 L224 192 M224 196 C218 190 216 186 218 182 M224 196 C230 190 232 186 230 182', { w: 1.2, c: 'var(--diagram-green)' }),
    S.ellipse(224, 248, 10, 20, { fill: 'var(--diagram-brown)', fop: 0.15, sw: 1 }),
    S.ellipse(224, 246, 5, 13, { fill: 'var(--diagram-fill)', sw: 1 }),
    S.line(224, 220, 224, 232, { w: 1.2 }),
    label(300, 30, 'Pericarp fused with seed coat', 'A', 236, 52),
    label(300, 70, 'Aleurone layer', 'B', 236, 84),
    label(300, 112, 'Endosperm', 'C', 160, 110),
    label(300, 172, 'Scutellum (cotyledon)', 'D', 176, 220),
    label(300, 204, 'Coleoptile with plumule', 'E', 232, 196),
    label(300, 246, 'Coleorhiza with radicle', 'F', 233, 248),
  ].join('');
}
export const MAIZE = svgDoc(
  460,
  290,
  'Longitudinal section of a maize grain: the pericarp is fused with the seed coat; just inside it lies the aleurone layer around a large starchy endosperm; the embryo at one side has a shield-shaped scutellum (the single cotyledon) and an embryonal axis whose plumule is covered by the coleoptile and whose radicle is covered by the coleorhiza',
  maize(false),
);
export const MAIZE_Q = svgDoc(
  460,
  290,
  'An unlabelled longitudinal section of a maize grain with six parts marked A to F: A the fused outer covering, B a thin layer just inside it, C the large food-storing tissue, D the shield-shaped structure of the embryo, E the sheath over the shoot tip, and F the sheath over the root tip',
  maize(true),
);

// Mango (drupe), L.S.
export const MANGO = svgDoc(
  440,
  250,
  'Longitudinal section of a mango, a drupe developing from a monocarpellary superior ovary: a thin epicarp (skin), a thick fleshy edible mesocarp, a hard stony endocarp, and inside it the single seed',
  [
    S.line(150, 20, 150, 38, { w: 3, c: 'var(--diagram-brown)' }),
    S.ellipse(150, 135, 110, 95, { fill: 'var(--diagram-yellow)', fop: 0.3, c: 'var(--diagram-accent)', sw: 3 }),
    S.ellipse(150, 140, 62, 50, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1.5 }),
    S.ellipse(150, 140, 46, 34, { fill: 'var(--diagram-green)', fop: 0.25, sw: 1 }),
    lab(290, 40, 'Epicarp (skin)'),
    S.lead(288, 37, 240, 80),
    lab(290, 90, 'Mesocarp (fleshy, edible)'),
    S.lead(288, 87, 220, 120),
    lab(290, 150, 'Endocarp (hard, stony)'),
    S.lead(288, 147, 206, 150),
    lab(290, 200, 'Seed'),
    S.lead(288, 197, 180, 150),
    lab(4, 244, 'Drupe: one-seeded, stony endocarp', { w: 'bold' }),
  ].join(''),
);

// Coconut, L.S.
export const COCONUT = svgDoc(
  440,
  260,
  'Longitudinal section of a coconut, a drupe: a smooth epicarp; a thick fibrous mesocarp (coir); a hard endocarp (shell); inside it the seed with a white solid endosperm (kernel) lining the shell and liquid endosperm (coconut water) in the centre; a small embryo lies in the kernel below one of the soft eyes at one end',
  [
    S.ellipse(150, 130, 120, 104, { fill: 'var(--diagram-brown)', fop: 0.15, c: 'var(--diagram-green)', sw: 3 }),
    ...Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * 2 * Math.PI;
      return S.line(150 + 92 * Math.cos(a), 130 + 80 * Math.sin(a), 150 + 112 * Math.cos(a), 130 + 97 * Math.sin(a), { w: 1, c: 'var(--diagram-brown)' });
    }),
    S.ellipse(150, 130, 80, 70, { fill: 'var(--diagram-fill)', c: 'var(--diagram-brown)', sw: 6 }),
    S.ellipse(150, 130, 64, 54, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 1 }),
    S.ellipse(150, 70, 6, 9, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    lab(290, 30, 'Epicarp'),
    S.lead(288, 27, 230, 54),
    lab(290, 64, 'Mesocarp (fibrous, coir)'),
    S.lead(288, 61, 246, 96),
    lab(290, 104, 'Endocarp (hard shell)'),
    S.lead(288, 101, 226, 120),
    lab(290, 144, 'Endosperm (white kernel)'),
    S.lead(288, 141, 210, 140),
    lab(290, 184, 'Liquid endosperm'),
    lab(290, 197, '(coconut water)'),
    S.lead(288, 188, 170, 150),
    lab(4, 20, 'Embryo', { w: 'bold' }),
    S.lead(52, 18, 144, 68),
  ].join(''),
);

export const ALL = { DOUBLE_FERT, DICOT_EMBRYO, MONOCOT_EMBRYO, BEAN, MAIZE, MAIZE_Q, MANGO, COCONUT };
