// SVG diagrams for ch03 Plant Kingdom (allow-listed elements, palette colours only). Schematic, not to scale.
// Labelled versions and lettered versions (A, B, C ...) of the same drawing come from one function each.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { SAC } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
/** One label with a leader. parts: [text, textX, textY, anchor, targetX, targetY]; lettered shows A, B, C ... instead of text. */
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

// 1. Brown alga body: holdfast, stipe, frond
export const brownAlga = (lettered = false) =>
  svgDoc(
    470,
    320,
    lettered
      ? 'Body of a large brown alga attached to a rock, with three parts marked A, B and C: A is the broad leaf-like blade at the top, B the stalk below it, and C the branched root-like structure gripping the rock'
      : 'Body of a large brown alga such as a kelp, schematic. A broad leaf-like frond with a midrib carries out photosynthesis, a stalk called the stipe supports it, and a branched root-like holdfast attaches the alga to a rock',
    [
      S.path('M40 296 C70 280 230 276 262 296 L262 312 L40 312 Z', { fill: MUT, fop: 0.25, c: MUT, w: 1.5 }),
      ...[[120, 300], [140, 304], [158, 305], [178, 304], [198, 300]].map(([x, y]) => S.path(`M158 286 L${x} ${y}`, { c: BROWN, w: 3 })),
      S.path('M158 286 C161 245 152 205 158 160', { c: BROWN, w: 8, cap: 'round' }),
      S.path('M158 168 C100 156 84 88 124 44 C136 28 150 18 160 14 C194 32 232 72 222 114 C214 146 190 166 158 168 Z', { fill: BROWN, fop: 0.28, c: BROWN, w: 2 }),
      S.path('M158 166 C160 110 158 60 160 18', { c: BROWN, w: 1.2 }),
      S.path('M158 110 C140 96 128 86 120 74 M158 110 C176 98 190 90 204 78 M158 140 C140 128 124 120 108 108 M158 140 C178 130 196 124 214 112', { c: BROWN, w: 0.8 }),
      labels(
        [
          ['Frond (leaf-like blade)', 258, 70, 'start', 214, 88],
          ['Stipe (stalk)', 258, 220, 'start', 166, 215],
          ['Holdfast (grips the rock)', 258, 280, 'start', 200, 298],
        ],
        lettered,
      ),
    ].join(''),
  );

// 2. Moss: gametophyte (leafy shoot with rhizoids) bearing a sporophyte (foot, seta, capsule)
export const mossPlant = (lettered = false) => {
  const leaves = [];
  for (let i = 0; i < 8; i++) {
    const y = 300 - i * 20;
    const s = i % 2 ? 1 : -1;
    leaves.push(S.path(`M170 ${y} Q${170 + s * 22} ${y - 20} ${170 + s * 40} ${y - 8} Q${170 + s * 22} ${y + 4} 170 ${y} Z`, { fill: GREEN, fop: 0.3, c: GREEN, w: 1.2 }));
  }
  return svgDoc(
    470,
    350,
    lettered
      ? 'Moss plant, schematic, with five parts marked A to E: A is the capsule at the top of a sporophyte, B the thin stalk below the capsule, C the foot embedded in the leafy shoot, D the leaf-like green flaps on the shoot, and E the branched thread-like structures at the base that anchor the plant'
      : 'Moss plant, schematic. The haploid gametophyte is a leafy upright shoot with spirally arranged leaf-like flaps, anchored by multicellular branched rhizoids. On its tip grows the sporophyte: a foot embedded in the shoot, a seta, and a capsule in which spores are made. The sporophyte depends on the gametophyte for nutrition',
    [
      // rhizoids
      ...[[120, 340], [145, 345], [170, 346], [195, 345], [222, 338]].map(([x, y]) => S.path(`M170 316 C170 328 ${x} 330 ${x} ${y}`, { c: BROWN, w: 1.5 })),
      S.path('M170 318 L170 150', { c: GREEN, w: 4 }),
      ...leaves,
      // sporophyte
      S.path('M170 152 L164 144 L176 144 Z', { fill: BROWN, c: BROWN, w: 1 }),
      S.path('M170 148 C172 110 168 80 171 52', { c: BROWN, w: 2 }),
      S.ellipse(171, 38, 11, 19, { fill: YEL, fop: 0.5, c: BROWN, sw: 1.8 }),
      S.path('M161 26 C166 18 176 18 181 26 Z', { fill: BROWN, c: BROWN, w: 1, fop: 0.5 }),
      // brackets
      S.path('M118 20 L112 20 L112 150 L118 150', { c: MUT, w: 1.2 }),
      S.path('M118 156 L112 156 L112 320 L118 320', { c: MUT, w: 1.2 }),
      ...(lettered
        ? []
        : [
            lab(106, 80, 'Sporophyte', { a: 'end', w: 'bold', size: 10 }), lab(106, 93, '(diploid)', { a: 'end', size: 10 }),
            lab(106, 232, 'Gametophyte', { a: 'end', w: 'bold', size: 10 }), lab(106, 245, '(haploid, dominant)', { a: 'end', size: 10 }),
          ]),
      labels(
        [
          ['Capsule (makes spores)', 262, 40, 'start', 184, 38],
          ['Seta', 262, 90, 'start', 174, 90],
          ['Foot (in the shoot)', 262, 150, 'start', 176, 146],
          ['Leaf-like flaps', 262, 220, 'start', 206, 212],
          ['Rhizoids', 262, 330, 'start', 214, 340],
        ],
        lettered,
      ),
    ].join(''),
  );
};

// 3. Fern sporophyte (Dryopteris-like): rhizome, roots, young coiled frond, pinnate frond with sori
export const fern = (lettered = false) => {
  const pin = [];
  const sori = [];
  for (let i = 0; i < 8; i++) {
    const y = 235 - i * 24;
    const xr = 188 + (i < 4 ? 0 : 0);
    const len = 52 - i * 3;
    for (const s of [-1, 1]) {
      pin.push(S.path(`M${xr} ${y} Q${xr + s * len * 0.5} ${y - 24} ${xr + s * len} ${y - 8} Q${xr + s * len * 0.5} ${y + 4} ${xr} ${y} Z`, { fill: GREEN, fop: 0.28, c: GREEN, w: 1.2 }));
      if (i >= 1 && i <= 5) sori.push(S.circle(xr + s * len * 0.55, y - 7, 2.6, { fill: BROWN, c: BROWN, sw: 0.8 }), S.circle(xr + s * len * 0.8, y - 8, 2.6, { fill: BROWN, c: BROWN, sw: 0.8 }));
    }
  }
  return svgDoc(
    480,
    380,
    lettered
      ? 'Fern sporophyte, schematic, with six parts marked A to F: A is a large feather-like leaf, B one of its leaflets, C a cluster of small brown sporangia on the underside of a leaflet, D a young leaf coiled like a spring, E the horizontal underground stem, and F the thin roots growing from it'
      : 'Fern sporophyte, schematic. A horizontal underground stem, the rhizome, bears roots below and large pinnate fronds above, with young fronds coiled like a crozier. Clusters of sporangia called sori sit on the underside of the leaflets (pinnae). The sporophyte is the dominant phase of a pteridophyte',
    [
      S.path('M120 316 L260 316', { c: BROWN, w: 12, cap: 'round' }),
      ...[[130, 360], [155, 366], [185, 362], [215, 366], [245, 360]].map(([x, y]) => S.path(`M${x} 322 L${x - 4} ${y}`, { c: BROWN, w: 1.8 })),
      // young coiled frond
      S.path('M104 312 C102 280 104 250 104 232', { c: GREEN, w: 3 }),
      S.path('M104 232 C104 208 130 208 130 228 C130 244 114 244 114 232', { c: GREEN, w: 3 }),
      // mature frond
      S.path('M188 312 C190 220 186 120 190 36', { c: GREEN, w: 3.5 }),
      ...pin,
      ...sori,
      labels(
        [
          ['Frond (large leaf)', 300, 50, 'start', 192, 52],
          ['Pinna (leaflet)', 300, 100, 'start', 232, 108],
          ['Sorus (sporangia)', 300, 180, 'start', 226, 182],
          ['Young coiled frond', 4, 190, 'start', 106, 214],
          ['Rhizome (stem)', 300, 320, 'start', 258, 318],
          ['Roots', 4, 358, 'start', 126, 352],
        ],
        lettered,
      ),
    ].join(''),
  );
};

// 4. Cycas: unbranched stem, crown of pinnate leaves, male cone, tap root and coralloid roots
export const cycas = () => {
  const leaves = [];
  for (const [ang, len] of [[-165, 120], [-140, 132], [-115, 118], [-65, 118], [-40, 132], [-15, 120]]) {
    const a = (ang * Math.PI) / 180;
    const x0 = 230, y0 = 160;
    const x1 = x0 + len * Math.cos(a), y1 = y0 + len * Math.sin(a) * 0.9 - 6;
    leaves.push(S.path(`M${x0} ${y0} Q${(x0 + x1) / 2} ${Math.min(y0, y1) - 14} ${x1.toFixed(1)} ${y1.toFixed(1)}`, { c: GREEN, w: 2 }));
    for (let k = 1; k <= 7; k++) {
      const t = k / 8;
      const px = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * ((x0 + x1) / 2) + t * t * x1;
      const py = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * (Math.min(y0, y1) - 14) + t * t * y1;
      leaves.push(S.line(px, py, px - 4, py + 12, { c: GREEN, w: 1.2 }), S.line(px, py, px + 4, py - 12, { c: GREEN, w: 1.2 }));
    }
  }
  const scales = [];
  for (let i = 0; i < 6; i++) scales.push(S.path(`M${222} ${70 + i * 11} Q230 ${76 + i * 11} 238 ${70 + i * 11}`, { c: BROWN, w: 1 }));
  return svgDoc(
    480,
    390,
    'Cycas plant, schematic. An unbranched woody stem carries a crown of large pinnate leaves. A male cone, the microsporangiate strobilus, stands at the centre of the crown. Below the soil line a tap root descends and small coralloid roots, associated with nitrogen-fixing cyanobacteria, grow near the surface',
    [
      S.line(20, 320, 460, 320, { c: MUT, w: 1.2, dash: '5 4' }),
      S.path('M204 320 L212 164 L248 164 L256 320 Z', { fill: BROWN, fop: 0.22, c: BROWN, w: 2 }),
      ...[200, 225, 250, 275, 300].map((y) => S.path(`M208 ${y} Q230 ${y + 7} 252 ${y}`, { c: BROWN, w: 1 })),
      ...leaves,
      S.ellipse(230, 96, 15, 42, { fill: YEL, fop: 0.45, c: BROWN, sw: 2 }),
      ...scales,
      S.path('M230 322 C230 345 228 360 230 380', { c: BROWN, w: 4 }),
      S.path('M222 324 C190 332 170 340 150 338 M150 338 L132 328 M150 338 L138 350 M198 332 L186 346 M186 346 L174 354', { c: BROWN, w: 2.2 }),
      S.path('M238 324 C268 332 290 340 310 338 M310 338 L328 328 M310 338 L322 350 M262 332 L274 346 M274 346 L286 354', { c: BROWN, w: 2.2 }),
      labels(
        [
          ['Male cone', 330, 70, 'start', 246, 84],
          ['Pinnate leaf', 360, 140, 'start', 330, 140],
          ['Unbranched stem', 290, 250, 'start', 252, 250],
          ['Coralloid roots', 4, 346, 'start', 132, 342],
          ['Tap root', 252, 378, 'start', 236, 370],
        ],
        false,
      ),
      lab(4, 308, 'Soil level', { c: MUT }),
    ].join(''),
  );
};

// 5. Flower in longitudinal section: sepals, petals, stamens (filament, anther), pistil (stigma, style, ovary, ovules)
export const flower = (lettered = false) => {
  const mirror = (f) => f(1) + f(-1);
  const X = (s, x) => 240 + s * x;
  return svgDoc(
    480,
    380,
    lettered
      ? 'Flower cut lengthways, schematic, with six parts marked A to F: A is the sticky tip of the central female organ, B the narrow stalk beneath it, C the swollen base containing small round bodies, D one of the small round bodies inside, E the sac at the top of the male stalk that holds pollen, and F the thin stalk that carries it'
      : 'Flower in longitudinal section, schematic. The pistil in the centre has a stigma, a style and an ovary containing ovules. Two stamens, each with a filament and an anther holding pollen grains, stand on either side. Petals and sepals surround them and all parts sit on the thalamus',
    [
      mirror((s) => S.path(`M${X(s, -26)} 322 C${X(s, -90)} 306 ${X(s, -122)} 228 ${X(s, -100)} 128 C${X(s, -60)} 170 ${X(s, -25)} 244 ${X(s, -14)} 314 Z`, { fill: ACC, fop: 0.14, c: ACC, w: 1.5 })),
      mirror((s) => S.path(`M${X(s, -30)} 330 C${X(s, -66)} 328 ${X(s, -80)} 312 ${X(s, -76)} 292`, { c: GREEN, w: 5, cap: 'round' })),
      S.ellipse(240, 336, 44, 12, { fill: GREEN, fop: 0.3, c: GREEN, sw: 1.5 }),
      mirror((s) => S.path(`M${X(s, -38)} 320 C${X(s, -50)} 270 ${X(s, -46)} 220 ${X(s, -50)} 182`, { c: BROWN, w: 2.5 })),
      mirror((s) => S.ellipse(X(s, -50), 168, 10, 16, { fill: YEL, fop: 0.6, c: BROWN, sw: 1.5 })),
      mirror((s) => S.circle(X(s, -50), 164, 1.6, { fill: BROWN, c: BROWN, sw: 0.5 }) + S.circle(X(s, -46), 172, 1.6, { fill: BROWN, c: BROWN, sw: 0.5 })),
      S.ellipse(240, 288, 28, 38, { fill: GREEN, fop: 0.25, c: GREEN, sw: 2 }),
      S.circle(231, 282, 6.5, { fill: BROWN, fop: 0.35, c: BROWN, sw: 1.5 }),
      S.circle(249, 282, 6.5, { fill: BROWN, fop: 0.35, c: BROWN, sw: 1.5 }),
      S.circle(240, 302, 6.5, { fill: BROWN, fop: 0.35, c: BROWN, sw: 1.5 }),
      S.path('M240 250 L240 134', { c: GREEN, w: 5, cap: 'butt' }),
      S.ellipse(240, 126, 14, 8, { fill: YEL, fop: 0.7, c: BROWN, sw: 1.5 }),
      labels(
        [
          ['Stigma', 392, 112, 'start', 254, 124],
          ['Style', 392, 148, 'start', 242, 140],
          ['Ovary', 392, 262, 'start', 266, 270],
          ['Ovule', 392, 300, 'start', 255, 300],
          ['Anther (pollen)', 4, 130, 'start', 184, 160],
          ['Filament', 4, 240, 'start', 196, 240],
        ],
        lettered,
      ),
      ...(lettered ? [] : [lab(4, 296, 'Petal', { c: ACC }), S.lead(36, 292, 134, 270), lab(4, 340, 'Sepal', { c: GREEN }), S.lead(34, 336, 166, 310), lab(330, 362, 'Thalamus', { c: GREEN }), S.lead(326, 358, 284, 342)]),
    ].join(''),
  );
};

// 6. Embryo sac: seven cells, eight nuclei (micropylar end left, chalazal end right)
export const embryoSac = (lettered = false) =>
  svgDoc(
    480,
    330,
    lettered
      ? 'Mature embryo sac of an angiosperm, schematic, with five parts marked A to E: A is the pair of small cells beside the large cell at the left end, B the large cell at the left end, C the two touching nuclei in the big central cell, D the group of three cells at the right end, and E the open end at the left through which the pollen tube enters'
      : `Mature embryo sac of an angiosperm, schematic: ${SAC.cells} cells and ${SAC.nuclei} nuclei. At the micropylar end lies the egg apparatus of one egg cell and two synergids; the large central cell has two polar nuclei; at the chalazal end lie three antipodal cells`,
    [
      S.ellipse(250, 160, 200, 92, { fill: GREEN, fop: 0.1, c: GREEN, sw: 2.5 }),
      // egg apparatus
      S.ellipse(98, 126, 28, 20, { fill: BLUE, fop: 0.2, c: BLUE, sw: 1.5 }), S.circle(90, 126, 6, { fill: BLUE, fop: 0.5, c: BLUE, sw: 1 }),
      S.ellipse(98, 196, 28, 20, { fill: BLUE, fop: 0.2, c: BLUE, sw: 1.5 }), S.circle(90, 196, 6, { fill: BLUE, fop: 0.5, c: BLUE, sw: 1 }),
      S.circle(118, 161, 24, { fill: RED, fop: 0.2, c: RED, sw: 1.8 }), S.circle(116, 161, 8, { fill: RED, fop: 0.5, c: RED, sw: 1 }),
      // central cell with two polar nuclei
      S.ellipse(250, 160, 70, 48, { fill: YEL, fop: 0.18, c: BROWN, sw: 1.5, dash: '4 3' }),
      S.circle(238, 160, 8, { fill: YEL, fop: 0.7, c: BROWN, sw: 1.5 }), S.circle(262, 160, 8, { fill: YEL, fop: 0.7, c: BROWN, sw: 1.5 }),
      // antipodals
      S.circle(388, 124, 20, { fill: ACC, fop: 0.18, c: ACC, sw: 1.5 }), S.circle(388, 124, 6, { fill: ACC, fop: 0.5, c: ACC, sw: 1 }),
      S.circle(406, 160, 20, { fill: ACC, fop: 0.18, c: ACC, sw: 1.5 }), S.circle(406, 160, 6, { fill: ACC, fop: 0.5, c: ACC, sw: 1 }),
      S.circle(388, 196, 20, { fill: ACC, fop: 0.18, c: ACC, sw: 1.5 }), S.circle(388, 196, 6, { fill: ACC, fop: 0.5, c: ACC, sw: 1 }),
      // micropyle marker
      S.arrow(18, 160, 54, 160, { c: MUT, size: 6, w: 1.4 }),
      labels(
        [
          ['Synergids (two)', 80, 40, 'middle', 98, 108],
          ['Egg cell', 150, 262, 'start', 124, 178],
          ['Two polar nuclei', 250, 262, 'middle', 250, 168],
          ['Antipodal cells (three)', 400, 60, 'middle', 396, 104],
          ['Entry of pollen tube', 4, 300, 'start', 30, 166],
        ],
        lettered,
      ),
      ...(lettered ? [] : [lab(250, 100, 'Central cell', { a: 'middle', c: BROWN }), lab(80, 320, 'Micropylar end', { c: MUT, size: 10 }), lab(400, 320, 'Chalazal end', { a: 'middle', c: MUT, size: 10 })]),
    ].join(''),
  );

export const BROWN_ALGA = brownAlga(false);
export const BROWN_ALGA_L = brownAlga(true);
export const MOSS = mossPlant(false);
export const MOSS_L = mossPlant(true);
export const FERN = fern(false);
export const FERN_L = fern(true);
export const CYCAS = cycas();
export const FLOWER = flower(false);
export const FLOWER_L = flower(true);
export const SAC_SVG = embryoSac(false);
export const SAC_L = embryoSac(true);
