// SVG diagrams for ICSE 9 Biology ch05 Seeds: Structure and Germination. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const head = (p, x, y, t) => p.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));

// ---------------------------------------------------------------- 1. a bean seed, from outside and opened (named and lettered A-E)
function bean(lettered) {
  const p = [];
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Seed coat', 'Cotyledon', 'Plumule', 'Radicle', 'Hilum'];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  head(p, 150, 22, 'Seed from outside'); head(p, 440, 22, 'Seed opened');
  // outside view
  p.push(S.ellipse(150, 178, 62, 92, { fill: BROWN, fop: 0.3, sw: 2.2 }));
  p.push(S.ellipse(90, 178, 5, 14, { fill: BROWN, fop: 0.85, sw: 1 }));
  p.push(S.circle(96, 214, 3, { fill: 'currentColor', sw: 0 }));
  p.push(S.text(66, 164, L[4], { a: 'end', ...o }), S.lead(70, 162, 87, 175));
  p.push(S.text(66, 226, 'Micropyle', { a: 'end', size: 11 }), S.lead(70, 222, 94, 215));
  if (!lettered) p.push(S.text(150, 62, L[0], { a: 'middle', ...o }), S.lead(150, 68, 150, 88));
  // opened view: seed coat, one cotyledon, embryo axis
  p.push(S.ellipse(440, 178, 90, 108, { fill: BROWN, fop: 0.25, sw: 2.6 }));
  p.push(S.ellipse(440, 178, 80, 98, { fill: YEL, fop: 0.35, sw: 1.6 }));
  p.push(S.path('M416 122 L398 86', { c: GREEN, w: 8, cap: 'round' }));
  p.push(S.path('M416 122 Q434 142 440 172', { c: GREEN, w: 4, cap: 'round' }));
  p.push(S.ellipse(436, 182, 6, 12, { fill: GREEN, fop: 0.55, sw: 1.2 }), S.ellipse(446, 176, 5, 10, { fill: GREEN, fop: 0.55, sw: 1.2 }));
  p.push(S.text(556, 112, L[0], o), S.lead(552, 108, 523, 132));
  p.push(S.text(556, 214, L[1], o), S.lead(552, 210, 514, 206));
  p.push(S.text(330, 176, L[2], { a: 'end', ...o }), S.lead(334, 174, 432, 172));
  p.push(S.text(350, 82, L[3], { a: 'end', ...o }), S.lead(354, 80, 395, 88));
  const name = lettered
    ? 'A bean seed shown from outside and opened, with parts lettered: A the thin outer covering, B the large thick food-storing half, C the tiny shoot with young leaves, D the pointed part that points towards the micropyle end, E the scar on the edge of the outside view'
    : 'A bean seed shown from outside, with the hilum and micropyle, and opened, with the seed coat, one thick cotyledon, the plumule and the radicle of the embryo';
  return svgDoc(640, 290, name, p.join(''));
}
export const BEAN = bean(false);
export const BEAN_LETTERED = bean(true);

// ---------------------------------------------------------------- 2. a maize grain in long section (named and lettered A-E)
function maize(lettered) {
  const p = [];
  const L = lettered ? ['A', 'B', 'C', 'D', 'E'] : ['Fruit wall and seed coat', 'Endosperm', 'Scutellum', 'Plumule', 'Radicle'];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  p.push(S.path('M230 40 C330 40 350 130 340 200 C330 280 280 310 230 310 C180 310 130 280 120 200 C110 130 130 40 230 40 Z', { fill: YEL, fop: 0.3, sw: 2.6 }));
  // embryo: scutellum, plumule inside coleoptile, radicle inside coleorhiza
  p.push(S.ellipse(172, 215, 22, 62, { fill: GREEN, fop: 0.3, sw: 1.6 }));
  p.push(S.path('M164 164 L178 106 L194 164 Z', { fill: GREEN, fop: 0.2, w: 1.4 }));
  p.push(S.line(178, 164, 178, 124, { c: GREEN, w: 3, cap: 'round' }));
  p.push(S.line(178, 262, 178, 290, { c: GREEN, w: 6, cap: 'round' }));
  p.push(S.path('M164 266 Q178 308 192 266', { w: 1.4 }));
  // labels on the right: coat and endosperm
  p.push(lettered ? S.text(392, 98, L[0], o) : S.lines(380, 90, ['Fruit wall and', 'seed coat (joined)'], { size: 11, dy: 13 }), S.lead(376, 94, 336, 106));
  p.push(S.text(lettered ? 392 : 380, 192, L[1], o), S.lead(lettered ? 388 : 376, 188, 296, 188));
  // labels on the left: embryo parts
  p.push(S.text(96, 220, L[2], { a: 'end', ...o }), S.lead(100, 216, 152, 216));
  p.push(S.text(96, 150, L[3], { a: 'end', ...o }), S.lead(100, 148, 174, 146));
  p.push(S.text(96, 286, L[4], { a: 'end', ...o }), S.lead(100, 284, 174, 280));
  if (!lettered) {
    p.push(S.text(96, 100, 'Coleoptile', { a: 'end', size: 11 }), S.lead(100, 98, 170, 128));
    p.push(S.text(96, 320, 'Coleorhiza', { a: 'end', size: 11 }), S.lead(100, 316, 168, 292));
  }
  const name = lettered
    ? 'A maize grain in long section with parts lettered: A the thin joined outer covering, B the large starchy tissue filling most of the grain, C the flat shield-like part beside the embryo, D the tiny shoot at the top of the embryo, E the tiny root at the lower end of the embryo'
    : 'A maize grain in long section: a joined fruit wall and seed coat, a large endosperm, the scutellum beside the embryo, a plumule inside its coleoptile and a radicle inside its coleorhiza';
  return svgDoc(520, 336, name, p.join(''));
}
export const MAIZE = maize(false);
export const MAIZE_LETTERED = maize(true);

// ---------------------------------------------------------------- 3. epigeal and hypogeal germination
export const GERMINATION = (() => {
  const p = [];
  head(p, 160, 22, 'Epigeal germination (bean)'); head(p, 480, 22, 'Hypogeal germination (pea)');
  for (const x0 of [10, 340]) {
    p.push(S.rect(x0, 172, 300, 130, { fill: BROWN, fop: 0.2, sw: 0 }));
    p.push(S.line(x0, 172, x0 + 300, 172, { c: BROWN, w: 1.6, dash: '6 3' }));
  }
  // epigeal: root, long hypocotyl, cotyledons above the soil, young leaves
  p.push(S.path('M160 176 Q156 230 150 292', { c: BROWN, w: 3.5 }), S.path('M157 220 Q140 232 128 240', { c: BROWN, w: 1.6 }), S.path('M155 250 Q170 258 180 262', { c: BROWN, w: 1.6 }));
  p.push(S.path('M160 176 L160 112', { c: GREEN, w: 6, cap: 'round' }));
  p.push(S.path('M160 112 Q128 108 126 90 Q146 92 160 108 Z', { fill: YEL, fop: 0.5, w: 1.4 }), S.path('M160 112 Q192 108 194 90 Q174 92 160 108 Z', { fill: YEL, fop: 0.5, w: 1.4 }));
  p.push(S.path('M160 106 L160 80', { c: GREEN, w: 2.4 }), S.ellipse(152, 74, 8, 5, { fill: GREEN, fop: 0.5, sw: 1.2 }), S.ellipse(168, 74, 8, 5, { fill: GREEN, fop: 0.5, sw: 1.2 }));
  p.push(S.text(18, 166, 'Soil level', { size: 10, c: MUTED }));
  p.push(S.text(214, 66, 'Young leaves', { size: 11 }), S.lead(210, 62, 176, 72));
  p.push(S.lines(214, 104, ['Cotyledons lifted', 'above the soil'], { size: 11, dy: 13 }), S.lead(210, 100, 190, 98));
  p.push(S.lines(214, 150, ['Hypocotyl', 'lengthens'], { size: 11, dy: 13 }), S.lead(210, 146, 166, 142));
  p.push(S.text(214, 252, 'Root', { size: 11 }), S.lead(210, 248, 154, 248));
  // hypogeal: seed stays under the soil, epicotyl grows up
  p.push(S.ellipse(480, 218, 20, 15, { fill: YEL, fop: 0.5, sw: 1.8 }));
  p.push(S.path('M480 206 L480 106', { c: GREEN, w: 5, cap: 'round' }));
  p.push(S.path('M480 106 L480 82', { c: GREEN, w: 2.4 }), S.ellipse(472, 76, 8, 5, { fill: GREEN, fop: 0.5, sw: 1.2 }), S.ellipse(488, 76, 8, 5, { fill: GREEN, fop: 0.5, sw: 1.2 }));
  p.push(S.path('M478 232 Q472 262 470 294', { c: BROWN, w: 3.5 }), S.path('M475 262 Q460 272 450 278', { c: BROWN, w: 1.6 }));
  p.push(S.text(526, 66, 'Young leaves', { size: 11 }), S.lead(522, 62, 496, 72));
  p.push(S.text(526, 140, 'Epicotyl lengthens', { size: 11 }), S.lead(522, 136, 486, 136));
  p.push(S.lines(526, 206, ['Cotyledons stay', 'in the soil'], { size: 11, dy: 13 }), S.lead(522, 210, 502, 216));
  p.push(S.text(526, 280, 'Root', { size: 11 }), S.lead(522, 276, 474, 276));
  p.push(S.text(348, 166, 'Soil level', { size: 10, c: MUTED }));
  return svgDoc(640, 306, 'Two seedlings side by side. In epigeal germination of a bean the part below the leaves, the hypocotyl, lengthens and lifts the cotyledons above the soil. In hypogeal germination of a pea the cotyledons stay in the soil and the part above them, the epicotyl, lengthens', p.join(''));
})();

// ---------------------------------------------------------------- 4. four test tubes for the conditions of germination
export const TUBES_SVG = (() => {
  const p = [];
  const xs = [90, 240, 390, 540];
  const seed = (x, y) => S.ellipse(x, y, 6, 4, { fill: BROWN, fop: 0.75, sw: 1 });
  // ice bath behind tube R
  p.push(S.rect(xs[2] - 52, 150, 104, 78, { fill: BLUE, fop: 0.18, sw: 1.4, dash: '5 3' }));
  p.push(S.text(xs[2], 244, 'Ice bath', { a: 'middle', size: 10, c: MUTED }));
  xs.forEach((x, i) => {
    p.push(S.text(x, 48, 'PQRS'[i], { a: 'middle', size: 15, w: 'bold' }));
    p.push(S.rect(x - 30, 60, 60, 160, { rx: 10, sw: 1.8 }));
    if (i === 1) {
      p.push(S.rect(x - 28, 94, 56, 124, { fill: BLUE, fop: 0.22, sw: 0 }), S.rect(x - 28, 94, 56, 12, { fill: YEL, fop: 0.55, sw: 0 }));
      p.push(seed(x - 12, 206), seed(x + 4, 208), seed(x + 16, 204), seed(x - 2, 196));
    } else {
      p.push(S.rect(x - 26, 120, 52, 96, { fill: i === 0 ? 'var(--diagram-fill)' : BLUE, fop: i === 0 ? 1 : 0.18, sw: 1 }));
      p.push(seed(x - 12, 150), seed(x + 6, 146), seed(x - 2, 170), seed(x + 14, 172), seed(x - 14, 186));
    }
  });
  const caps = [['Dry cotton wool,', 'room temperature'], ['Boiled, cooled water', 'with a layer of oil'], ['Moist cotton wool', 'in an ice bath'], ['Moist cotton wool,', 'room temperature']];
  caps.forEach((c, i) => p.push(S.lines(xs[i], i === 2 ? 266 : 252, c, { a: 'middle', size: 11, dy: 13 })));
  return svgDoc(640, 290, 'Four test tubes P, Q, R and S, each with twenty seeds: P has dry cotton wool at room temperature; Q has seeds under boiled, cooled water with a layer of oil on top; R has moist cotton wool standing in an ice bath; S has moist cotton wool at room temperature', p.join(''));
})();
