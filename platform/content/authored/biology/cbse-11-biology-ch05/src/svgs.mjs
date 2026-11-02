// SVG diagrams for ch05 Morphology of Flowering Plants (allow-listed elements, palette colours only).
// Schematic drawings, not to scale. Lettered versions (A–E) of the flower and of the placentation panels are used in questions.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { PLAC_ORDER, FLOWER_LETTERS } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const g = (dx, dy, body) => `<g transform="translate(${dx} ${dy})">${body}</g>`;
const arc = (cx, cy, rad, a1, a2) => {
  const p = (a) => [cx + rad * Math.cos((a * Math.PI) / 180), cy + rad * Math.sin((a * Math.PI) / 180)];
  const [x1, y1] = p(a1);
  const [x2, y2] = p(a2);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${rad} ${rad} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};
const at = (cx, cy, rad, a) => [cx + rad * Math.cos((a * Math.PI) / 180), cy + rad * Math.sin((a * Math.PI) / 180)];

// 1. Parts of a flower (longitudinal section of a hypogynous flower); `mode` named or lettered
function flowerDoc(mode) {
  const named = mode === 'named';
  const t = (key, name) => (named ? name : FLOWER_LETTERS[key]);
  const o = (key) => (named ? {} : { w: 'bold', size: 15 });
  const body = [
    S.path('M280 424 L280 366', { c: GREEN, w: 7 }),
    S.ellipse(280, 358, 34, 11, { fill: BROWN, fop: 0.35 }),
    S.path('M262 360 C232 362 200 350 190 322 C222 328 250 340 270 352 Z', { fill: GREEN, fop: 0.3 }),
    S.path('M298 360 C328 362 360 350 370 322 C338 328 310 340 290 352 Z', { fill: GREEN, fop: 0.3 }),
    S.path('M264 352 C216 336 176 276 188 184 C226 210 258 270 274 346 Z', { fill: ACC, fop: 0.18 }),
    S.path('M296 352 C344 336 384 276 372 184 C334 210 302 270 286 346 Z', { fill: ACC, fop: 0.18 }),
    S.line(268, 344, 248, 228, { w: 2 }),
    S.ellipse(246, 217, 7, 13, { fill: YEL, c: BROWN, sw: 1.5 }),
    S.line(292, 344, 312, 228, { w: 2 }),
    S.ellipse(314, 217, 7, 13, { fill: YEL, c: BROWN, sw: 1.5 }),
    S.ellipse(280, 322, 22, 32, { fill: GREEN, fop: 0.35, sw: 2 }),
    S.circle(272, 312, 4, { fill: BROWN, fop: 0.6, sw: 1 }),
    S.circle(288, 312, 4, { fill: BROWN, fop: 0.6, sw: 1 }),
    S.circle(272, 328, 4, { fill: BROWN, fop: 0.6, sw: 1 }),
    S.circle(288, 328, 4, { fill: BROWN, fop: 0.6, sw: 1 }),
    S.line(280, 290, 280, 208, { w: 3 }),
    S.ellipse(280, 202, 10, 7, { fill: BROWN, fop: 0.5 }),
  ];
  const labels = named
    ? [
        lab(4, 150, 'Petal'), S.lead(40, 146, 194, 196),
        lab(4, 300, 'Sepal'), S.lead(42, 296, 208, 332),
        lab(4, 372, 'Thalamus (receptacle)'), S.lead(136, 368, 248, 360),
        lab(4, 420, 'Pedicel'), S.lead(50, 416, 276, 410),
        lab(556, 96, 'Stigma', { a: 'end' }), S.lead(520, 92, 290, 198),
        lab(556, 142, 'Style', { a: 'end' }), S.lead(520, 138, 283, 240),
        lab(556, 196, 'Anther', { a: 'end' }), S.lead(514, 192, 322, 214),
        lab(556, 260, 'Filament', { a: 'end' }), S.lead(500, 256, 304, 280),
        lab(556, 330, 'Ovary', { a: 'end' }), S.lead(522, 326, 302, 324),
        lab(556, 380, 'Ovule', { a: 'end' }), S.lead(522, 376, 294, 330),
      ]
    : [
        lab(4, 150, t('petal'), { ...o('petal') }), S.lead(26, 146, 194, 196),
        lab(4, 300, t('sepal'), { ...o('sepal') }), S.lead(26, 296, 208, 332),
        lab(556, 96, t('stigma'), { a: 'end', ...o('stigma') }), S.lead(534, 92, 290, 198),
        lab(556, 196, t('anther'), { a: 'end', ...o('anther') }), S.lead(534, 192, 322, 214),
        lab(556, 330, t('ovary'), { a: 'end', ...o('ovary') }), S.lead(534, 326, 302, 324),
      ];
  return svgDoc(
    560,
    352,
    named
      ? 'Longitudinal section of a typical flower, schematic. A pedicel bears the swollen thalamus, or receptacle. On it, from outside to inside: green sepals, large petals, stamens each made of a filament and an anther, and in the centre the carpel made of the ovary containing ovules, the style and the stigma. The ovary sits above the other whorls, so the flower is hypogynous'
      : 'Longitudinal section of a typical flower, schematic, with five parts marked by letters. A is an anther at the top of a filament. B is a sepal, a small green leaf-like part at the base. C is the knob at the top of the long slender style. D is the swollen ovary in the centre, containing ovules. E is a large petal',
    g(0, -78, body.join('') + labels.join('')),
  );
}
export const FLOWER = flowerDoc('named');
export const FLOWER_LETTERED = flowerDoc('lettered');

// 2. Placentation types (T.S. of the ovary; basal drawn in L.S.); `mode` named or lettered
const OV = (cx, cy) => S.circle(cx, cy, 4.5, { fill: BROWN, fop: 0.6, sw: 1 });
const PAN = {
  marginal(cx, cy) {
    const pts = [-42, -14, 14, 42].map((a) => at(cx, cy, 29, a));
    return [S.circle(cx, cy, 40, { fill: GREEN, fop: 0.12, sw: 2 }), S.path(arc(cx, cy, 40, -35, 35), { w: 5, c: BROWN }), ...pts.map(([x, y]) => OV(x, y))].join('');
  },
  axile(cx, cy) {
    const spokes = [-90, 30, 150].map((a) => { const [x, y] = at(cx, cy, 40, a); return S.line(cx, cy, x, y, { w: 1.8 }); });
    const ov = [-30, 90, 210].flatMap((a) => [a - 14, a + 14].map((b) => at(cx, cy, 16, b)));
    return [S.circle(cx, cy, 40, { fill: GREEN, fop: 0.12, sw: 2 }), ...spokes, ...ov.map(([x, y]) => OV(x, y))].join('');
  },
  parietal(cx, cy) {
    const ang = [45, 135, 225, 315];
    const ridge = ang.map((a) => { const [x1, y1] = at(cx, cy, 40, a); const [x2, y2] = at(cx, cy, 30, a); return S.line(x1, y1, x2, y2, { w: 3, c: BROWN }); });
    const ov = ang.map((a) => at(cx, cy, 25, a));
    return [S.circle(cx, cy, 40, { fill: GREEN, fop: 0.12, sw: 2 }), ...ridge, ...ov.map(([x, y]) => OV(x, y))].join('');
  },
  'free central'(cx, cy) {
    const ang = [0, 60, 120, 180, 240, 300];
    const ov = ang.map((a) => at(cx, cy, 24, a));
    const stalks = ov.map(([x, y]) => S.line(cx, cy, x, y, { w: 1, c: MUT }));
    return [S.circle(cx, cy, 40, { fill: GREEN, fop: 0.12, sw: 2 }), ...stalks, S.circle(cx, cy, 6, { fill: BROWN, fop: 0.5, sw: 1.5 }), ...ov.map(([x, y]) => OV(x, y))].join('');
  },
  basal(cx, cy) {
    return [S.ellipse(cx, cy, 28, 42, { fill: GREEN, fop: 0.12, sw: 2 }), S.line(cx, cy - 42, cx, cy - 62, { w: 2 }), OV(cx, cy + 30), S.line(cx, cy + 34, cx, cy + 42, { w: 2.5, c: BROWN })].join('');
  },
};
const PLAC_INFO = {
  marginal: ['Marginal', 'pea'],
  axile: ['Axile', 'tomato, lemon'],
  parietal: ['Parietal', 'mustard'],
  'free central': ['Free central', 'Dianthus'],
  basal: ['Basal', 'sunflower'],
};
function placDoc(mode) {
  const named = mode === 'named';
  const types = named ? ['marginal', 'axile', 'parietal', 'free central', 'basal'] : PLAC_ORDER;
  const out = [];
  types.forEach((ty, i) => {
    const cx = 58 + i * 116;
    out.push(PAN[ty](cx, 70));
    if (named) {
      out.push(lab(cx, 140, PLAC_INFO[ty][0], { a: 'middle', w: 'bold' }), lab(cx, 156, PLAC_INFO[ty][1], { a: 'middle', size: 10, it: true }));
    } else out.push(lab(cx, 148, 'ABCDE'[i], { a: 'middle', w: 'bold', size: 16 }));
  });
  out.push(lab(290, 188, 'Transverse section of the ovary (basal placentation: longitudinal section). Dark dots are ovules.', { a: 'middle', size: 10 }));
  return svgDoc(
    580,
    200,
    named
      ? 'Five types of placentation in sections of an ovary. Marginal: ovules in a row along the one edge of a single-chambered ovary. Axile: a multi-chambered ovary with ovules on the central axis where the partitions meet. Parietal: ovules on the inner wall of a one-chambered ovary. Free central: ovules on a central column that is not joined to the wall by partitions. Basal: a single ovule at the base of the ovary'
      : 'Five ovary sections labelled A to E, each showing a different placentation. A has ovules on the inner wall of one chamber. B is a long section with one ovule at the base. C has three chambers with ovules at the centre where the partitions meet. D has ovules along one edge of a single chamber. E has ovules on a central column with no partitions',
    out.join(''),
  );
}
export const PLAC = placDoc('named');
export const PLAC_LETTERED = placDoc('lettered');

// 3. Dicot seed (bean, split open) and monocot seed (maize grain), longitudinal sections
export const SEEDS = svgDoc(
  700,
  372,
  'Longitudinal sections of a dicot seed and a monocot seed. Dicot (bean): a seed coat with the hilum and the micropyle, two large fleshy cotyledons storing food, and an embryonal axis with the plumule above the cotyledons and the radicle below them. Monocot (maize grain): a membranous covering where the fruit wall is joined to the seed coat, a large endosperm bounded by a proteinaceous aleurone layer, a single shield-shaped cotyledon called the scutellum, and an embryonal axis with the plumule covered by the coleoptile and the radicle covered by the coleorhiza',
  [
    lab(150, 22, 'Dicot seed (bean)', { a: 'middle', w: 'bold' }),
    lab(550, 22, 'Monocot seed (maize grain)', { a: 'middle', w: 'bold' }),
    // bean
    S.ellipse(150, 190, 66, 108, { fill: BROWN, fop: 0.12, sw: 3 }),
    S.ellipse(150, 190, 58, 100, { fill: GREEN, fop: 0.2, sw: 1 }),
    S.line(150, 96, 150, 284, { c: MUT, w: 1, dash: '4 3' }),
    S.path('M118 110 L138 150 L150 144 Z', { fill: BROWN, fop: 0.45, sw: 1.5 }),
    S.path('M150 150 C154 130 168 124 176 128 C172 142 162 152 150 156 Z', { fill: GREEN, fop: 0.5, sw: 1.5 }),
    S.ellipse(85, 194, 5, 9, { fill: BROWN, fop: 0.8, sw: 1 }),
    // maize (shifted right by 100)
    g(100, 0, [
      S.path('M372 70 Q450 48 528 70 Q542 190 500 300 Q450 326 400 300 Q358 190 372 70 Z', { fill: BROWN, fop: 0.1, sw: 3 }),
      S.path('M382 76 Q450 58 518 76 Q530 190 492 292 Q450 314 408 292 Q370 190 382 76 Z', { fill: 'var(--diagram-fill)', sw: 1.5 }),
      S.path('M388 84 Q450 68 512 84 Q522 190 486 284 Q450 304 414 284 Q378 190 388 84 Z', { fill: YEL, fop: 0.25, sw: 1 }),
      S.path('M388 190 C390 130 420 124 436 152 C446 210 432 268 420 286 C398 280 386 240 388 190 Z', { fill: GREEN, fop: 0.3, sw: 2 }),
      S.line(420, 176, 414, 268, { w: 6, c: BROWN, cap: 'round' }),
      S.path('M410 178 Q420 146 430 178 Z', { fill: BROWN, fop: 0.35, sw: 1.5 }),
      S.ellipse(414, 272, 8, 9, { fill: BROWN, fop: 0.35, sw: 1.5 }),
    ].join('')),
    // dicot labels
    lab(4, 66, 'Seed coat', { a: 'start' }), S.lead(64, 62, 96, 116),
    lab(4, 296, 'Cotyledon', { a: 'start' }), S.lead(66, 292, 110, 266),
    lab(4, 340, 'Hilum', { a: 'start' }), S.lead(36, 336, 84, 200),
    lab(204, 62, 'Micropyle', { a: 'start' }), S.lead(204, 66, 116, 103),
    lab(236, 120, 'Plumule', { a: 'start' }), S.lead(234, 124, 172, 134),
    lab(236, 168, 'Radicle', { a: 'start' }), S.lead(234, 170, 128, 128),
    // monocot labels
    lab(696, 54, 'Fruit wall fused with seed coat', { a: 'end' }), S.lead(620, 58, 628, 92),
    lab(696, 124, 'Aleurone layer', { a: 'end' }), S.lead(630, 120, 608, 130),
    lab(696, 190, 'Endosperm', { a: 'end' }), S.lead(620, 186, 580, 186),
    lab(446, 140, 'Coleoptile', { a: 'end' }), S.lead(452, 136, 520, 164),
    lab(446, 232, 'Scutellum (cotyledon)', { a: 'end' }), S.lead(452, 228, 504, 226),
    lab(446, 322, 'Coleorhiza', { a: 'end' }), S.lead(452, 318, 508, 280),
    lab(300, 360, 'Embryonal axis: plumule at the top, radicle at the bottom', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Floral diagram of Solanaceae (T.S. of the flower bud, schematic)
const CX = 240;
const CY = 238;
const SEP = [-90, -18, 54, 126, 198];
const PET = SEP.map((a) => a + 36);
const calyx = SEP.map((a) => S.path(arc(CX, CY, 118, a - 28, a + 28), { w: 4, c: GREEN })).join('')
  + SEP.map((a) => S.path(arc(CX, CY, 118, a + 28, a + 44), { w: 1.2, c: GREEN, dash: '2 3' })).join('');
const corolla = PET.map((a) => S.path(arc(CX, CY, 92, a - 28, a + 28), { w: 4, c: ACC })).join('')
  + PET.map((a) => S.path(arc(CX, CY, 92, a + 28, a + 44), { w: 1.2, c: ACC, dash: '2 3' })).join('');
const stamens = SEP.map((a) => {
  const [x, y] = at(CX, CY, 62, a);
  const [x2, y2] = at(CX, CY, 90, a);
  return S.line(x, y, x2, y2, { w: 1.2, c: BROWN }) + S.ellipse(x, y, 9, 6.5, { fill: YEL, c: BROWN, sw: 1.5 }) + S.line(x - 4, y, x + 4, y, { c: BROWN, w: 1 });
}).join('');
const ovaryOv = [[-12, 4], [-5, 11], [-17, -4], [2, 13], [12, -4], [5, -11], [17, 4], [-2, -13]].map(([dx, dy]) => S.circle(CX + dx, CY + dy, 2.6, { fill: BROWN, fop: 0.7, sw: 0.8 })).join('');
export const SOLFLOR = svgDoc(
  480,
  420,
  'Floral diagram of Solanaceae, a transverse view of the flower, schematic. At the top is the mother axis. Moving inwards: the calyx of five sepals joined together, then the corolla of five petals joined together, then five stamens that alternate with the petals and are attached to them (epipetalous), and in the centre a bicarpellary syncarpous ovary with two chambers separated by an oblique partition, many ovules on swollen placentae (axile placentation) and a superior position',
  [
    S.circle(CX, 36, 9, { fill: BROWN, fop: 0.3, sw: 1.5 }),
    calyx,
    corolla,
    stamens,
    S.ellipse(CX, CY, 28, 24, { fill: GREEN, fop: 0.2, sw: 2 }),
    S.line(CX - 20, CY - 16, CX + 20, CY + 16, { w: 2 }),
    ovaryOv,
    lab(CX + 18, 40, 'Mother axis', { a: 'start' }),
    lab(2, 100, 'Calyx: five sepals,', { a: 'start' }), lab(2, 114, 'united (gamosepalous)', { a: 'start' }), S.lead(100, 106, 154, 166),
    lab(2, 200, 'Corolla: five petals,', { a: 'start' }), lab(2, 214, 'united (gamopetalous)', { a: 'start' }), S.lead(104, 220, 158, 232),
    lab(2, 330, 'Stamen: five,', { a: 'start' }), lab(2, 344, 'epipetalous', { a: 'start' }), S.lead(76, 336, 188, 276),
    lab(478, 130, 'Ovary:', { a: 'end' }), lab(478, 144, 'bicarpellary, syncarpous,', { a: 'end' }), lab(478, 158, 'two chambers, axile', { a: 'end' }), lab(478, 172, 'placentation', { a: 'end' }), S.lead(380, 164, 262, 232),
    lab(478, 340, 'Ovules on swollen', { a: 'end' }), lab(478, 354, 'placentae', { a: 'end' }), S.lead(396, 346, 252, 244),
    lab(CX, 410, 'Oblique septum: the two carpels are placed slightly to one side', { a: 'middle', size: 10 }),
  ].join(''),
);

// 5. Regions of a young root
export const ROOTZONES = svgDoc(
  460,
  380,
  'Longitudinal view of the tip of a young root, schematic. From the tip upwards: the root cap protecting the tip, the region of meristematic activity of small thin-walled dividing cells, the region of elongation of cells that are longer and enlarging, and the region of maturation where cells differentiate and root hairs arise',
  (() => {
    const x0 = 150;
    const pieces = [
      S.path(`M${x0 - 24} 340 C${x0 - 24} 360 ${x0 - 10} 372 ${x0} 372 C${x0 + 10} 372 ${x0 + 24} 360 ${x0 + 24} 340 Z`, { fill: BROWN, fop: 0.3, sw: 2 }),
      S.rect(x0 - 24, 270, 48, 70, { fill: YEL, fop: 0.22, sw: 2 }),
      S.rect(x0 - 24, 170, 48, 100, { fill: GREEN, fop: 0.18, sw: 2 }),
      S.rect(x0 - 24, 40, 48, 130, { fill: ACC, fop: 0.1, sw: 2 }),
    ];
    for (let y = 56; y < 160; y += 16) {
      pieces.push(S.line(x0 - 24, y, x0 - 40, y - 6, { w: 1.2 }), S.line(x0 + 24, y + 4, x0 + 40, y - 2, { w: 1.2 }));
    }
    for (let y = 290; y < 335; y += 14) for (const dx of [-12, 12]) pieces.push(S.circle(x0 + dx, y, 5, { sw: 1, c: BROWN }));
    pieces.push(S.ellipse(x0, 235, 10, 18, { sw: 1, c: GREEN }), S.ellipse(x0, 195, 10, 18, { sw: 1, c: GREEN }));
    const br = (y1, y2, text) => S.path(`M${x0 + 56} ${y1} L${x0 + 64} ${y1} L${x0 + 64} ${y2} L${x0 + 56} ${y2}`, { w: 1.2 }) + lab(x0 + 72, (y1 + y2) / 2 + 4, text);
    pieces.push(
      br(48, 164, 'Region of maturation'),
      lab(x0 + 72, 126, '(root hairs, differentiation)', { size: 10 }),
      br(176, 266, 'Region of elongation'),
      br(276, 336, 'Meristematic region'),
      lab(x0 + 72, 322, '(dividing cells)', { size: 10 }),
      lab(x0 + 36, 366, 'Root cap', { a: 'start' }),
      lab(4, 70, 'Root hairs', { a: 'start' }), S.lead(60, 66, x0 - 38, 62),
    );
    return pieces.join('');
  })(),
);

export const ALL = { FLOWER, FLOWER_LETTERED, PLAC, PLAC_LETTERED, SEEDS, SOLFLOR, ROOTZONES };
void RED;
void BLUE;
