// SVG diagrams for ch04 Animal Kingdom (allow-listed elements, palette colours only). Schematic, not to scale.
// Labelled and lettered (A, B, C ...) versions come from one function each; panels are scrambled in the lettered versions.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const FILL = 'var(--diagram-fill)';
const g = (dx, dy, body) => `<g transform="translate(${dx} ${dy})">${body}</g>`;
const labels = (parts, lettered) =>
  parts
    .map(([t, x, y, a, tx, ty], i) => {
      const s = lettered ? 'ABCDEFGH'[i] : t;
      const w = lettered ? 9 : s.length * 5.9;
      const left = a === 'start' ? x : a === 'end' ? x - w : x - w / 2;
      const right = left + w;
      let sx;
      let sy = y - 4;
      if (tx > right + 4) sx = right + 3;
      else if (tx < left - 4) sx = left - 3;
      else {
        sx = x;
        sy = ty > y ? y + 3 : y - 13;
      }
      return lab(x, y, s, { a, ...(lettered ? { w: 'bold', size: 13 } : {}) }) + S.lead(sx, sy, tx, ty);
    })
    .join('');

// 1. Body symmetry: asymmetrical, radial, bilateral
const SYM = {
  asym: () => [
    S.path('M30 100 C25 60 60 40 85 55 C110 35 140 60 130 90 C145 115 120 150 95 140 C75 160 35 145 40 120 C25 118 28 105 30 100 Z', { fill: MUT, fop: 0.25, c: MUT, w: 2 }),
    ...[[60, 80], [95, 75], [105, 112], [70, 118], [85, 96]].map(([x, y]) => S.circle(x, y, 3.5, { fill: FILL, c: MUT, sw: 1 })),
    S.ellipse(118, 54, 8, 4, { fill: FILL, c: MUT, sw: 1 }),
  ].join(''),
  radial: () => [
    S.circle(80, 95, 40, { fill: GREEN, fop: 0.15, c: GREEN, sw: 2 }),
    S.circle(80, 95, 14, { fill: ACC, fop: 0.3, c: ACC, sw: 1.5 }),
    ...Array.from({ length: 12 }, (_, i) => {
      const a = (i * Math.PI) / 6;
      return S.line(80 + 40 * Math.cos(a), 95 + 40 * Math.sin(a), 80 + 60 * Math.cos(a), 95 + 60 * Math.sin(a), { c: GREEN, w: 3, cap: 'round' });
    }),
    S.line(80, 22, 80, 168, { c: BROWN, w: 1.2, dash: '5 4' }),
    S.line(80 - 73 * Math.cos(Math.PI / 3), 95 - 73 * Math.sin(Math.PI / 3), 80 + 73 * Math.cos(Math.PI / 3), 95 + 73 * Math.sin(Math.PI / 3), { c: BROWN, w: 1.2, dash: '5 4' }),
  ].join(''),
  bilat: () => [
    S.path('M80 30 C110 40 120 80 118 120 C116 150 100 165 80 165 C60 165 44 150 42 120 C40 80 50 40 80 30 Z', { fill: BLUE, fop: 0.15, c: BLUE, w: 2 }),
    S.circle(68, 52, 3, { fill: BLUE, c: BLUE, sw: 1 }), S.circle(92, 52, 3, { fill: BLUE, c: BLUE, sw: 1 }),
    ...[92, 116, 140].flatMap((y) => [S.line(44, y, 28, y + 6, { c: BLUE, w: 2.5, cap: 'round' }), S.line(116, y, 132, y + 6, { c: BLUE, w: 2.5, cap: 'round' })]),
    S.line(80, 20, 80, 176, { c: BROWN, w: 1.2, dash: '5 4' }),
  ].join(''),
};
const SYM_TEXT = { asym: ['Asymmetrical', 'no plane gives equal halves', 'e.g. sponge'], radial: ['Radial', 'any plane through the', 'central axis; e.g. sea anemone'], bilat: ['Bilateral', 'one plane only gives', 'mirror halves; e.g. earthworm'] };
export const symmetry = (lettered = false) => {
  const order = lettered ? ['radial', 'asym', 'bilat'] : ['asym', 'radial', 'bilat'];
  return svgDoc(
    510,
    236,
    lettered
      ? 'Three animal outlines marked A, B and C. A has a circular body with tentacles all round and two dashed planes through its centre. B is an irregular body with several pores and no dashed plane. C is an elongated body with a head and paired appendages and one dashed plane down the middle'
      : 'Three kinds of body symmetry, schematic. An asymmetrical sponge cannot be cut into equal halves by any plane. A radially symmetrical animal such as a sea anemone gives equal halves when cut by any plane through the central axis. A bilaterally symmetrical animal such as an earthworm gives mirror halves by one plane only, along its midline',
    order
      .map((k, i) =>
        g(i * 170, 0, SYM[k]()) +
        (lettered
          ? lab(i * 170 + 80, 205, 'ABC'[i], { a: 'middle', w: 'bold', size: 14 })
          : lab(i * 170 + 80, 194, SYM_TEXT[k][0], { a: 'middle', w: 'bold' }) + lab(i * 170 + 80, 208, SYM_TEXT[k][1], { a: 'middle', size: 10 }) + lab(i * 170 + 80, 221, SYM_TEXT[k][2], { a: 'middle', size: 10 })),
      )
      .join(''),
  );
};

// 2. Coelom types: cross-sections of an acoelomate, a pseudocoelomate and a coelomate (ectoderm blue, mesoderm red, endoderm yellow)
const COEL = {
  aco: () => [S.circle(80, 100, 62, { fill: RED, fop: 0.28, c: BLUE, sw: 5 }), S.circle(80, 100, 16, { fill: FILL, c: BROWN, sw: 4 })].join(''),
  pseudo: () => [
    S.circle(80, 100, 62, { fill: FILL, c: BLUE, sw: 5 }),
    ...Array.from({ length: 9 }, (_, i) => {
      const a = (i * 2 * Math.PI) / 9 + 0.3;
      const rr = i % 2 ? 50 : 36;
      return S.circle(80 + rr * Math.cos(a), 100 + rr * Math.sin(a), 6.5, { fill: RED, fop: 0.45, c: RED, sw: 1.2 });
    }),
    S.circle(80, 100, 16, { fill: FILL, c: BROWN, sw: 4 }),
  ].join(''),
  coel: () => [S.circle(80, 100, 62, { fill: FILL, c: BLUE, sw: 5 }), S.circle(80, 100, 52, { c: RED, sw: 6 }), S.circle(80, 100, 24, { c: RED, sw: 6 }), S.circle(80, 100, 16, { fill: FILL, c: BROWN, sw: 4 })].join(''),
};
const COEL_TEXT = { aco: ['Acoelomate', 'no body cavity; e.g. flatworm'], pseudo: ['Pseudocoelomate', 'mesoderm in scattered pouches; e.g. roundworm'], coel: ['Coelomate', 'cavity lined by mesoderm; e.g. earthworm'] };
export const coelom = (lettered = false) => {
  const order = lettered ? ['coel', 'aco', 'pseudo'] : ['aco', 'pseudo', 'coel'];
  return svgDoc(
    520,
    280,
    lettered
      ? 'Three cross-sections of animal bodies marked A, B and C, each with a blue outer layer and a central gut tube. In A a red layer forms a complete ring lining the inside of the outer layer and another ring around the gut, with an open space between the rings. In B the space between the outer layer and the gut is completely filled with red tissue. In C the space is open with only small scattered red patches'
      : 'Three types of body cavity in cross-section, schematic. Ectoderm is the blue outer layer, mesoderm is red and the gut lined by endoderm is in the centre. An acoelomate has mesoderm filling the space between ectoderm and gut. A pseudocoelomate has a cavity with mesoderm only as scattered pouches between ectoderm and endoderm. A coelomate has a cavity completely lined by mesoderm',
    [
      ...order.map((k, i) =>
        g(i * 172 + 2, 0, COEL[k]()) +
        (lettered
          ? lab(i * 172 + 82, 192, 'ABC'[i], { a: 'middle', w: 'bold', size: 14 })
          : lab(i * 172 + 82, 188, COEL_TEXT[k][0], { a: 'middle', w: 'bold' }) + lab(i * 172 + 82, 202, COEL_TEXT[k][1].split(';')[0], { a: 'middle', size: 10 }) + lab(i * 172 + 82, 215, COEL_TEXT[k][1].split(';')[1].trim(), { a: 'middle', size: 10 })),
      ),
      S.rect(80, 242, 12, 10, { fill: BLUE, fop: 0.5, c: BLUE, sw: 1 }), lab(96, 251, 'Ectoderm', { size: 10 }),
      S.rect(170, 242, 12, 10, { fill: RED, fop: 0.5, c: RED, sw: 1 }), lab(186, 251, 'Mesoderm', { size: 10 }),
      S.rect(262, 242, 12, 10, { fill: YEL, fop: 0.4, c: BROWN, sw: 1 }), lab(278, 251, 'Gut (endoderm)', { size: 10 }),
      S.rect(372, 242, 12, 10, { fill: FILL, c: MUT, sw: 1 }), lab(388, 251, 'Cavity', { size: 10 }),
    ].join(''),
  );
};

// 3. Sponge (Sycon-like) in longitudinal section
export const sponge = (lettered = false) =>
  svgDoc(
    480,
    330,
    lettered
      ? 'Vase-shaped sponge cut lengthways, schematic, with five parts marked A to E: A is the large opening at the top, B the central cavity, C the small cells with collars lining that cavity, D the many tiny pores in the body wall, and E the needle-like pieces embedded in the wall'
      : 'Sponge cut lengthways, schematic. Water enters through many small pores called ostia into a central cavity, the spongocoel, whose lining of collar cells (choanocytes) drives the flow; the water leaves through the large opening, the osculum. Spicules support the body wall',
    [
      S.rect(150, 292, 190, 16, { fill: MUT, fop: 0.3, c: MUT, sw: 1.5 }),
      S.path('M190 292 L190 90 C190 70 205 62 215 60 L265 60 C275 62 290 70 290 90 L290 292 Z', { fill: GREEN, fop: 0.18, c: GREEN, w: 2 }),
      S.path('M212 292 L212 94 C212 82 222 76 230 74 L250 74 C258 76 268 82 268 94 L268 292 Z', { fill: FILL, c: GREEN, w: 1.2 }),
      ...[100, 124, 148, 172, 196, 220, 244, 268].flatMap((y) => [S.ellipse(216, y, 3, 6, { fill: BLUE, fop: 0.6, c: BLUE, sw: 1 }), S.ellipse(264, y, 3, 6, { fill: BLUE, fop: 0.6, c: BLUE, sw: 1 })]),
      ...[130, 190, 250].flatMap((y) => [S.line(194, y - 5, 204, y + 5, { c: BROWN, w: 1.2 }), S.line(194, y + 5, 204, y - 5, { c: BROWN, w: 1.2 }), S.line(276, y - 5, 286, y + 5, { c: BROWN, w: 1.2 }), S.line(276, y + 5, 286, y - 5, { c: BROWN, w: 1.2 })]),
      ...[150, 200, 250].flatMap((y) => [S.arrow(160, y, 189, y, { c: BLUE, size: 6 }), S.arrow(320, y, 291, y, { c: BLUE, size: 6 })]),
      S.arrow(240, 72, 240, 28, { c: BLUE, size: 7 }),
      labels(
        [
          ['Osculum (water out)', 330, 34, 'start', 246, 44],
          ['Spongocoel (central cavity)', 330, 170, 'start', 258, 170],
          ['Choanocytes (collar cells)', 330, 236, 'start', 268, 238],
          ['Ostia (pores, water in)', 4, 160, 'start', 172, 150],
          ['Spicules (skeleton)', 4, 110, 'start', 196, 128],
        ],
        lettered,
      ),
    ].join(''),
  );

// 4. Coelenterate body forms: polyp and medusa
export const cnidarian = () =>
  svgDoc(
    540,
    300,
    'The two body forms of coelenterates, schematic. The polyp is sessile and cylindrical, attached by a basal disc, with a mouth on the hypostome surrounded by tentacles that carry stinging cells. The medusa is umbrella-shaped and free-swimming, with tentacles hanging from the rim of the umbrella and a mouth on a short tube beneath it',
    [
      // polyp
      g(90, 0, [S.path('M108 262 L152 262', { c: BROWN, w: 5, cap: 'round' }),
      S.path('M112 258 L112 112 C112 100 124 94 130 94 C136 94 148 100 148 112 L148 258 Z', { fill: GREEN, fop: 0.2, c: GREEN, w: 2 }),
      S.path('M120 244 L120 120 M140 244 L140 120', { c: MUT, w: 0.8, dash: '3 3' }),
      S.path('M124 98 L130 82 L136 98', { fill: ACC, fop: 0.4, c: ACC, w: 1.5 }),
      ...[[-52, 62], [-30, 48], [0, 44], [30, 48], [52, 62]].map(([dx, y]) => S.path(`M${130 + dx * 0.25} 98 C${130 + dx * 0.8} 80 ${130 + dx} ${y + 18} ${130 + dx} ${y}`, { c: GREEN, w: 3, cap: 'round' }))].join('')),
      // medusa
      S.path('M300 140 C300 62 440 62 440 140 Z', { fill: ACC, fop: 0.15, c: ACC, w: 2 }),
      ...[308, 330, 352, 388, 410, 432].map((x) => S.path(`M${x} 140 C${x - 6} 165 ${x + 6} 185 ${x} 230`, { c: ACC, w: 2.5, cap: 'round' })),
      S.path('M366 140 L366 186 L374 186 L374 140', { fill: YEL, fop: 0.4, c: BROWN, w: 1.5 }),
      lab(220, 280, 'Polyp', { a: 'middle', w: 'bold' }), lab(220, 294, 'sessile, cylindrical', { a: 'middle', size: 10 }), lab(380, 280, 'Medusa', { a: 'middle', w: 'bold' }), lab(380, 294, 'free-swimming, umbrella-shaped', { a: 'middle', size: 10 }),
      labels(
        [
          ['Tentacles with cnidoblasts', 4, 34, 'start', 172, 62],
          ['Mouth on hypostome', 4, 80, 'start', 216, 92],
          ['Body wall (two layers)', 4, 170, 'start', 204, 170],
          ['Basal disc', 4, 262, 'start', 198, 262],
          ['Umbrella', 450, 100, 'start', 430, 104],
          ['Tentacles', 450, 190, 'start', 420, 190],
          ['Mouth', 450, 216, 'start', 376, 184],
        ],
        false,
      ),
    ].join(''),
  );

// 5. Chordate features, schematic lancelet-like side view
export const chordate = (lettered = false) =>
  svgDoc(
    520,
    260,
    lettered
      ? 'Side view of a simple chordate, schematic, with five parts marked A to E: A is the hollow tube running along the back, B the stiff rod just below it, C the row of slits in the throat region, D the small muscular pump on the underside, and E the extension of the body beyond the anus'
      : 'Simple chordate seen from the side, schematic. A dorsal hollow nerve cord runs along the back above the notochord, a rod along the body axis. Paired pharyngeal gill slits lie in the throat region, a ventral heart lies under the gut, and a post-anal tail extends beyond the anus',
    [
      S.path('M56 126 C80 88 250 80 360 100 L450 122 L360 154 C250 168 80 164 56 126 Z', { fill: GREEN, fop: 0.12, c: GREEN, w: 2 }),
      S.path('M80 100 C150 92 260 90 370 108', { c: BLUE, w: 6 }), S.path('M80 100 C150 92 260 90 370 108', { c: FILL, w: 2.4 }),
      S.path('M70 112 C150 106 260 104 420 120', { c: BROWN, w: 9, cap: 'round' }), S.path('M70 112 C150 106 260 104 420 120', { c: YEL, w: 6, cap: 'round' }),
      ...[100, 114, 128, 142].map((x) => S.line(x, 124, x - 3, 148, { c: RED, w: 2.4 })),
      S.path('M70 140 C200 148 280 148 366 146', { c: BROWN, w: 1.5 }),
      S.ellipse(200, 158, 11, 6, { fill: RED, fop: 0.5, c: RED, sw: 1.5 }),
      S.line(372, 134, 372, 158, { c: MUT, w: 1.2, dash: '3 3' }),
      labels(
        [
          ['Dorsal hollow nerve cord', 150, 40, 'start', 170, 92],
          ['Notochord', 330, 54, 'start', 300, 108],
          ['Pharyngeal gill slits', 20, 214, 'start', 112, 146],
          ['Ventral heart', 190, 240, 'start', 200, 164],
          ['Post-anal tail', 400, 214, 'start', 410, 130],
        ],
        lettered,
      ),
    ].join(''),
  );

export const SYMMETRY = symmetry(false);
export const SYMMETRY_L = symmetry(true);
export const COELOM = coelom(false);
export const COELOM_L = coelom(true);
export const SPONGE = sponge(false);
export const SPONGE_L = sponge(true);
export const CNID = cnidarian();
export const CHORD = chordate(false);
export const CHORD_L = chordate(true);
