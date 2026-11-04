// SVG diagrams for ISC 11 Biology ch05 Animal Kingdom: symmetry, body cavities (named and lettered), a sponge, polyp and medusa,
// a simple chordate (named and lettered) and the hearts of vertebrates (drawn from the chamber counts in calc.mjs).
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { VERT, heartOf } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const ECTO = 'var(--diagram-green)';
const MESO = 'var(--diagram-brown)';
const ENDO = 'var(--diagram-blue)';

// 1. Symmetry
export const SYMMETRY = svgDoc(
  480,
  210,
  'Three kinds of body symmetry: an asymmetrical sponge-like body that cannot be divided into equal halves by any plane; a radially symmetrical body, such as a sea anemone seen from above, that can be cut into equal halves by any plane through the central axis; and a bilaterally symmetrical worm-like body that can be cut into two mirror-image halves along one plane only, with a head end and a tail end',
  [
    // asymmetrical
    S.path('M30 90 C20 60 50 40 78 52 C104 40 128 64 112 92 C124 118 94 136 66 126 C40 140 18 118 30 90 Z', { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.25, w: 1.4 }),
    S.circle(52, 80, 5, { c: 'var(--diagram-brown)', fill: 'var(--diagram-fill)', sw: 1 }),
    S.circle(88, 100, 6, { c: 'var(--diagram-brown)', fill: 'var(--diagram-fill)', sw: 1 }),
    S.circle(70, 70, 4, { c: 'var(--diagram-brown)', fill: 'var(--diagram-fill)', sw: 1 }),
    lab(70, 160, 'Asymmetrical', { a: 'middle', w: 'bold' }),
    lab(70, 176, 'no plane gives equal halves', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(70, 192, 'e.g. most sponges', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    // radial
    ...Array.from({ length: 5 }, (_, i) => {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      return S.path(`M240 90 L${240 + 56 * Math.cos(a - 0.3)} ${90 + 56 * Math.sin(a - 0.3)} L${240 + 56 * Math.cos(a + 0.3)} ${90 + 56 * Math.sin(a + 0.3)} Z`, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.3, w: 1.3 });
    }),
    S.circle(240, 90, 14, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.5, sw: 1.3 }),
    S.line(240, 24, 240, 156, { w: 1, c: 'var(--diagram-accent)', dash: '4 3' }),
    S.line(174, 90, 306, 90, { w: 1, c: 'var(--diagram-accent)', dash: '4 3' }),
    S.line(194, 44, 286, 136, { w: 1, c: 'var(--diagram-accent)', dash: '4 3' }),
    lab(240, 176, 'Radial', { a: 'middle', w: 'bold' }),
    lab(240, 192, 'any plane through the axis', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    // bilateral
    S.ellipse(400, 90, 22, 56, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.4 }),
    S.circle(400, 48, 8, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.5, sw: 1.2 }),
    S.line(400, 24, 400, 156, { w: 1, c: 'var(--diagram-accent)', dash: '4 3' }),
    lab(412, 32, 'head', { size: 10 }),
    lab(412, 152, 'tail', { size: 10 }),
    lab(400, 176, 'Bilateral', { a: 'middle', w: 'bold' }),
    lab(400, 192, 'one plane only', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    lab(400, 14, 'plane', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 2. Body cavities: three cross-sections
function section(cx, cy, kind) {
  const parts = [];
  const R = 54;
  if (kind === 'acoel') {
    parts.push(S.circle(cx, cy, R, { c: ECTO, sw: 3, fill: MESO, fop: 0.3 }));
    parts.push(S.circle(cx, cy, 14, { c: ENDO, sw: 3, fill: 'var(--diagram-fill)' }));
  } else if (kind === 'pseudo') {
    parts.push(S.circle(cx, cy, R, { c: ECTO, sw: 3, fill: 'var(--diagram-fill)' }));
    parts.push(S.circle(cx, cy, R - 9, { c: MESO, sw: 6, fill: 'var(--diagram-fill)' }));
    parts.push(S.circle(cx, cy, 14, { c: ENDO, sw: 3, fill: 'var(--diagram-fill)' }));
  } else {
    parts.push(S.circle(cx, cy, R, { c: ECTO, sw: 3, fill: 'var(--diagram-fill)' }));
    parts.push(S.circle(cx, cy, R - 9, { c: MESO, sw: 6, fill: 'var(--diagram-fill)' }));
    parts.push(S.circle(cx, cy, 24, { c: MESO, sw: 6, fill: 'var(--diagram-fill)' }));
    parts.push(S.circle(cx, cy, 14, { c: ENDO, sw: 3, fill: 'var(--diagram-fill)' }));
  }
  return parts.join('');
}
function coelom(named) {
  const xs = [80, 240, 400];
  const kinds = ['acoel', 'pseudo', 'coel'];
  const title = named ? ['Acoelomate', 'Pseudocoelomate', 'Coelomate'] : ['A', 'B', 'C'];
  const body = [
    ...xs.map((x, i) => section(x, 76, kinds[i])),
    ...xs.map((x, i) => S.text(x, 150, title[i], { a: 'middle', size: named ? 12 : 15, w: 'bold' })),
  ];
  if (named) {
    body.push(
      lab(80, 168, 'mesoderm fills the space', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
      lab(240, 168, 'cavity not fully lined by mesoderm', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
      lab(400, 168, 'cavity lined by mesoderm all round', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
      S.rect(10, 184, 12, 10, { c: ECTO, sw: 3 }), lab(26, 193, 'ectoderm', { size: 10 }),
      S.rect(100, 184, 12, 10, { c: MESO, sw: 3 }), lab(116, 193, 'mesoderm', { size: 10 }),
      S.rect(190, 184, 12, 10, { c: ENDO, sw: 3 }), lab(206, 193, 'endoderm (gut lining)', { size: 10 }),
    );
  } else {
    body.push(
      S.lead(417, 59, 440, 40), S.text(446, 44, 'D', { size: 14, w: 'bold' }),
      S.lead(425, 101, 440, 112), S.text(446, 116, 'E', { size: 14, w: 'bold' }),
      lab(10, 190, 'In each section the outer ring is the body wall and the small inner ring is the gut.', { size: 10, c: 'var(--diagram-muted)' }),
    );
  }
  return svgDoc(
    480,
    204,
    named
      ? 'Cross-sections of three body plans. Acoelomate: the space between the body wall and the gut is filled with solid mesoderm and there is no body cavity. Pseudocoelomate: a body cavity lies between the mesoderm under the body wall and the endoderm of the gut, so the cavity is not lined by mesoderm on the gut side. Coelomate: a true coelom lies between a mesoderm layer under the body wall and a mesoderm layer around the gut'
      : 'Cross-sections of three body plans marked A, B and C. In A the space between body wall and gut is solid tissue; in B a cavity lies between the body-wall mesoderm and the gut with no mesoderm around the gut; in C a cavity lies between two mesoderm layers, one under the body wall and one around the gut. Letter D points to the mesoderm layer around the gut in C and letter E to the cavity in C',
    body.join(''),
  );
}
export const COELOM_NAMED = coelom(true);
export const COELOM_LETTERED = coelom(false);

// 3. A sponge
export const SPONGE = svgDoc(
  400,
  280,
  'Vertical section of a vase-shaped sponge: water enters through many small pores called ostia in the body wall, passes into the central cavity called the spongocoel, is driven by flagellated collar cells called choanocytes that line the cavity, and leaves through the large opening at the top, the osculum; the wall is supported by spicules',
  [
    S.path('M120 250 C100 200 100 120 130 70 L130 50 L270 50 L270 70 C300 120 300 200 280 250 Z', { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', fop: 0.18, w: 1.6 }),
    S.path('M150 240 C140 200 140 120 160 74 L160 60 L240 60 L240 74 C260 120 260 200 250 240 Z', { c: 'var(--diagram-muted)', fill: 'var(--diagram-fill)', w: 1.2 }),
    ...[[124, 210], [118, 170], [122, 130], [140, 96], [276, 210], [282, 170], [278, 130], [260, 96]].map(([x, y]) => S.ellipse(x, y, 4, 2.6, { c: 'var(--diagram-blue)', fill: 'var(--diagram-fill)', sw: 1.2 })),
    ...[[158, 200], [154, 160], [158, 120], [170, 88], [242, 200], [246, 160], [242, 120], [230, 88]].map(([x, y]) => S.circle(x, y, 4, { c: 'var(--diagram-green)', fill: 'var(--diagram-green)', fop: 0.4, sw: 1.2 })),
    S.line(133, 180, 145, 168, { w: 1.4, c: 'var(--diagram-muted)' }), S.line(267, 184, 255, 172, { w: 1.4, c: 'var(--diagram-muted)' }),
    S.arrow(70, 170, 112, 170, { c: 'var(--diagram-blue)', w: 1.8, size: 6 }),
    S.arrow(330, 170, 288, 170, { c: 'var(--diagram-blue)', w: 1.8, size: 6, dash: '1 0' }),
    S.arrow(200, 120, 200, 34, { c: 'var(--diagram-blue)', w: 1.8, size: 6 }),
    lab(70, 160, 'water in', { size: 10, c: 'var(--diagram-blue)' }),
    lab(200, 22, 'Osculum: water out', { a: 'middle', size: 11 }),
    S.lead(200, 130, 340, 100), lab(300, 96, 'Spongocoel', {}),
    S.lead(250, 120, 336, 140), lab(310, 148, 'Choanocytes', { size: 11 }),
    S.lead(118, 130, 60, 120), lab(8, 118, 'Ostium (pore)', {}),
    S.lead(139, 176, 60, 206), lab(8, 218, 'Spicule', {}),
    lab(200, 270, 'Sponge: cellular level of organisation, no true tissues', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Polyp and medusa
export const POLYP_MEDUSA = svgDoc(
  460,
  250,
  'The two body forms of Cnidaria. Left, the polyp: a sessile cylindrical body attached by a basal disc, with a mouth on a raised hypostome surrounded by tentacles, and a central gastrovascular cavity. Right, the medusa: a free-swimming umbrella-shaped body with the mouth hanging down on a central stalk and tentacles around the rim; a jelly-like mesoglea lies between the two cell layers',
  [
    S.rect(70, 70, 60, 120, { rx: 14, fill: 'var(--diagram-green)', fop: 0.22, sw: 1.4, c: 'var(--diagram-green)' }),
    S.rect(86, 86, 28, 92, { rx: 8, fill: 'var(--diagram-fill)', sw: 1, c: 'var(--diagram-muted)' }),
    S.rect(80, 190, 40, 8, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 1 }),
    S.path('M70 74 C56 52 50 44 44 36 M80 70 C74 50 70 40 66 30 M120 70 C126 50 130 40 134 30 M130 74 C144 52 150 44 156 36', { c: 'var(--diagram-green)', w: 2 }),
    S.rect(92, 62, 16, 10, { rx: 4, fill: 'var(--diagram-red)', fop: 0.3, sw: 1, c: 'var(--diagram-red)' }),
    lab(100, 20, 'Polyp (sessile)', { a: 'middle', size: 12, w: 'bold' }),
    S.lead(46, 42, 20, 56), lab(8, 66, 'Tentacle', { size: 10 }),
    S.lead(108, 66, 172, 60), lab(176, 64, 'Mouth (hypostome)', { size: 10 }),
    S.lead(114, 130, 172, 126), lab(176, 130, 'Gastrovascular cavity', { size: 10 }),
    S.lead(130, 100, 172, 96), lab(176, 100, 'Body wall: two layers', { size: 10 }),
    S.lead(100, 194, 172, 194), lab(176, 198, 'Basal disc', { size: 10 }),
    S.path('M330 70 C290 70 270 110 276 130 L384 130 C390 110 370 70 330 70 Z', { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.2, w: 1.4 }),
    S.path('M330 80 C300 82 288 112 290 124 L370 124 C372 112 360 82 330 80 Z', { c: 'var(--diagram-blue)', fill: 'var(--diagram-fill)', w: 1, fop: 0.5 }),
    S.line(330, 130, 330, 176, { w: 4, c: 'var(--diagram-red)' }),
    S.path('M280 132 C274 160 276 190 272 214 M296 132 C292 160 294 190 290 214 M364 132 C368 160 366 190 370 214 M380 132 C386 160 384 190 388 214', { c: 'var(--diagram-blue)', w: 1.8 }),
    lab(330, 20, 'Medusa (free-swimming)', { a: 'middle', size: 12, w: 'bold' }),
    S.lead(330, 74, 330, 40), lab(330, 36, 'Umbrella', { a: 'middle', size: 10 }),
    S.lead(332, 160, 400, 170), lab(402, 174, 'Mouth', { size: 10 }),
    S.lead(388, 200, 410, 214), lab(396, 228, 'Tentacle', { size: 10 }),
    S.lead(358, 100, 388, 90), lab(390, 94, 'Mesoglea', { size: 10 }),
    lab(230, 246, 'Obelia shows both forms in one life cycle (metagenesis)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. A simple chordate: named and lettered
function chordate(named) {
  const t = (letter, name) => (named ? name : letter);
  const lbl = (x, y, a, s) => (named ? lab(x, y, s, { a, size: 11 }) : S.text(x, y, s, { a, size: 14, w: 'bold' }));
  return svgDoc(
    440,
    230,
    named
      ? 'Side view of a simple chordate with the four fundamental features labelled: the dorsal hollow nerve cord above the notochord, pharyngeal gill slits in the front part of the gut, a post-anal tail beyond the anus, and the ventral heart under the pharynx'
      : 'Side view of a simple chordate with five parts marked by letters: A the hollow nerve cord on the back, B the rod-like notochord just below it, C the slits in the pharynx, D the tail that extends beyond the anus and E the heart on the underside',
    [
      S.path('M30 110 C40 80 110 76 260 84 L380 104 L260 134 C150 142 40 140 30 110 Z', { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.12, w: 1.4 }),
      S.line(60, 90, 330, 96, { w: 5, c: 'var(--diagram-yellow)' }),
      S.line(58, 82, 330, 88, { w: 3, c: 'var(--diagram-green)' }),
      S.path('M60 124 C140 126 220 124 300 116', { c: 'var(--diagram-brown)', w: 2.4 }),
      ...[0, 1, 2, 3, 4].map((i) => S.line(76 + i * 14, 102, 78 + i * 14, 120, { w: 1.6, c: 'var(--diagram-red)' })),
      S.circle(300, 120, 3, { c: 'var(--diagram-brown)', fill: 'var(--diagram-brown)', sw: 1 }),
      S.ellipse(116, 134, 9, 6, { c: 'var(--diagram-red)', fill: 'var(--diagram-red)', fop: 0.5, sw: 1.2 }),
      S.lead(190, 84, 190, 40), lbl(190, 32, 'middle', t('A', 'Dorsal hollow nerve cord')),
      S.lead(240, 94, 296, 56), lbl(298, 50, 'start', t('B', 'Notochord')),
      S.lead(90, 108, 70, 56), lbl(70, 48, 'middle', t('C', 'Pharyngeal gill slits')),
      S.lead(350, 108, 400, 150), lbl(436, 164, 'end', t('D', 'Post-anal tail')),
      S.lead(116, 140, 116, 186), lbl(116, 200, 'middle', t('E', 'Ventral heart')),
      ...(named ? [S.lead(300, 124, 300, 186), lbl(300, 200, 'middle', 'Anus')] : []),
      lab(10, 220, 'Mouth at the left, tail at the right', { size: 10, c: 'var(--diagram-muted)' }),
    ].join(''),
  );
}
export const CHORDATE_NAMED = chordate(true);
export const CHORDATE_LETTERED = chordate(false);

// 6. Hearts of vertebrates, drawn from the chamber counts
function heart(cx, cls) {
  const n = heartOf(cls);
  const atria = n === 2 ? 1 : 2;
  const vent = n === 4 ? 2 : 1;
  const w = 28;
  const parts = [];
  for (let i = 0; i < atria; i++) parts.push(S.rect(cx - (atria * w) / 2 + i * w, 56, w - 2, 30, { rx: 8, fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.3 }));
  for (let i = 0; i < vent; i++) parts.push(S.rect(cx - (atria * w) / 2 + i * ((atria * w) / vent), 90, (atria * w) / vent - 2, 40, { rx: 8, fill: 'var(--diagram-red)', fop: 0.3, sw: 1.3 }));
  if (cls === 'Reptilia') parts.push(S.line(cx, 92, cx, 108, { w: 1.2, c: 'var(--diagram-muted)', dash: '3 2' }));
  return parts.join('') + S.text(cx, 150, cls, { a: 'middle', size: 10.5, w: 'bold' }) + S.text(cx, 164, `${n} chambers`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
}
const HEART_CLASSES = ['Osteichthyes', 'Amphibia', 'Reptilia', 'Aves'];
export const HEARTS = svgDoc(
  460,
  200,
  `The hearts of vertebrates drawn as boxes, atria in blue on top and ventricles in red below: a fish has two chambers (one atrium and one ventricle), an amphibian three (two atria and one ventricle), a typical reptile three (two atria and one ventricle with an incomplete partition), and birds and mammals four (two atria and two ventricles)`,
  [
    S.text(230, 20, 'Chambers of the heart', { a: 'middle', size: 12, w: 'bold' }),
    ...HEART_CLASSES.map((c, i) => heart(60 + i * 113, c)),
    S.rect(120, 176, 12, 10, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1 }), lab(136, 185, 'atrium', { size: 10 }),
    S.rect(200, 176, 12, 10, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1 }), lab(216, 185, 'ventricle', { size: 10 }),
    lab(290, 185, 'Mammals also have four chambers', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
void VERT;

export const ALL = { SYMMETRY, COELOM_NAMED, COELOM_LETTERED, SPONGE, POLYP_MEDUSA, CHORDATE_NAMED, CHORDATE_LETTERED, HEARTS };
