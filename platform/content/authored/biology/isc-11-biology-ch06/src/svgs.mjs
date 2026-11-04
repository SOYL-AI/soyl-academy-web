// SVG diagrams for ISC 11 Biology ch06 Morphology of Root, Stem and Leaf: root tip (named and lettered), root modifications,
// stem modifications, leaf parts (named and lettered), venation and compound leaves, phyllotaxy, leaf modifications.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const G = 'var(--diagram-green)';
const B = 'var(--diagram-brown)';
const Y = 'var(--diagram-yellow)';
const R = 'var(--diagram-red)';
const M = 'var(--diagram-muted)';
const sub = (s) => S.text(0, 0, '', {}) && s;
void sub;
const title = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 11, w: 'bold' });
const note = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 10, c: M });

// 1. Root tip with its regions (named and lettered)
function rootTip(named) {
  const L = (letter, name) => (named ? name : letter);
  const t = (x, y, s) => (named ? S.text(x, y, s, { size: 11 }) : S.text(x, y, s, { size: 15, w: 'bold' }));
  return svgDoc(
    360,
    330,
    named
      ? 'Longitudinal view of a young root tip with four regions from the tip upward: the root cap, the region of meristematic activity, the region of elongation and the region of maturation that bears root hairs'
      : 'Longitudinal view of a young root tip with four regions marked by letters from the tip upward: A the thimble-like covering at the very tip, B the region of dividing cells just behind it, C the region where cells lengthen, and D the region bearing root hairs',
    [
      S.path('M120 290 C120 306 180 306 180 290 L180 266 L120 266 Z', { c: B, fill: B, fop: 0.35, w: 1.4 }),
      S.rect(120, 230, 60, 36, { fill: R, fop: 0.25, sw: 1.4 }),
      S.rect(120, 174, 60, 56, { fill: Y, fop: 0.3, sw: 1.4 }),
      S.rect(120, 40, 60, 134, { fill: G, fop: 0.2, sw: 1.4 }),
      ...[0, 1, 2, 3, 4, 5].flatMap((i) => [S.line(120, 56 + i * 20, 104, 50 + i * 20, { w: 1.2, c: G }), S.line(180, 62 + i * 20, 196, 56 + i * 20, { w: 1.2, c: G })]),
      ...[0, 1, 2].map((i) => S.line(122, 238 + i * 12, 178, 238 + i * 12, { w: 1, c: M })),
      S.line(150, 40, 150, 266, { w: 1, c: M, dash: '3 3' }),
      S.lead(180, 286, 226, 296), t(230, 300, L('A', 'Root cap')),
      S.lead(180, 248, 226, 248), t(230, 252, L('B', 'Meristematic region')),
      S.lead(180, 200, 226, 200), t(230, 204, L('C', 'Region of elongation')),
      S.lead(196, 76, 226, 90), t(230, 94, L('D', 'Region of maturation')),
      ...(named ? [lab(230, 108, '(root hairs arise here)', { size: 10, c: M })] : []),
      lab(10, 20, 'Tip of the root at the bottom', { size: 10, c: M }),
    ].join(''),
  );
}
export const ROOT_TIP_NAMED = rootTip(true);
export const ROOT_TIP_LETTERED = rootTip(false);

// 2. Root modifications
const tuft = (x, y) => S.path(`M${x} ${y} q -14 -22 -22 -26 M${x} ${y} q 0 -28 0 -32 M${x} ${y} q 14 -22 22 -26`, { c: G, w: 2 });
export const ROOT_MODS = svgDoc(
  560,
  344,
  'Modified roots. Top row, storage roots drawn with a leaf tuft above: fusiform (radish) swollen in the middle and tapering at both ends, conical (carrot) broad at the top and tapering downward, napiform (turnip) almost spherical at the top and abruptly tapering below, and tuberous (sweet potato) irregular with no definite shape. Bottom row: prop roots hanging from the branch of a banyan, stilt roots arising from the lower nodes of maize, and pneumatophores of a mangrove rising above the mud',
  [
    // radish
    tuft(70, 62), S.path('M70 62 C100 90 100 130 70 170 C40 130 40 90 70 62 Z', { c: R, fill: R, fop: 0.25, w: 1.4 }), S.path('M70 170 L70 190', { c: B, w: 1.5 }), title(70, 208, 'Fusiform'), note(70, 222, 'radish'),
    // carrot
    tuft(200, 62), S.path('M170 62 L230 62 L204 180 L200 188 L196 180 Z', { c: Y, fill: Y, fop: 0.35, w: 1.4 }), title(200, 208, 'Conical'), note(200, 222, 'carrot'),
    // turnip
    tuft(330, 62), S.circle(330, 98, 36, { c: R, fill: R, fop: 0.15, sw: 1.4 }), S.path('M330 134 L330 180', { c: B, w: 2 }), title(330, 208, 'Napiform'), note(330, 222, 'turnip, beet'),
    // sweet potato
    tuft(460, 62), S.path('M432 80 C440 62 480 66 494 86 C506 110 480 140 462 160 C440 170 426 140 428 116 C424 98 430 88 432 80 Z', { c: B, fill: B, fop: 0.25, w: 1.4 }), title(460, 208, 'Tuberous'), note(460, 222, 'sweet potato'),
    // banyan prop roots
    S.line(20, 262, 180, 262, { c: B, w: 5 }), ...[44, 100, 156].map((x) => S.line(x, 262, x, 316, { c: B, w: 2.5 })), S.path('M20 262 q -6 -10 4 -22', { c: G, w: 2 }), note(100, 326, 'Prop roots: banyan'),
    // maize stilt roots
    S.line(260, 236, 260, 292, { c: G, w: 5 }), S.line(260, 292, 236, 318, { c: B, w: 2.5 }), S.line(260, 292, 284, 318, { c: B, w: 2.5 }), S.line(260, 280, 232, 312, { c: B, w: 2 }), S.line(260, 280, 288, 312, { c: B, w: 2 }), note(260, 328, 'Stilt roots: maize'),
    // mangrove pneumatophores
    S.rect(366, 292, 170, 26, { fill: B, fop: 0.3, sw: 1 }), ...[388, 420, 452, 484, 516].map((x, i) => S.line(x, 292, x, 262 - (i % 2) * 14, { c: B, w: 3 })), lab(366, 286, 'mud', { size: 10, c: M }), note(452, 328, 'Pneumatophores: mangrove'),
  ].join(''),
);

// 3. Stem modifications
export const STEM_MODS = svgDoc(
  560,
  330,
  'Modified stems. Top row: a potato tuber, a swollen underground stem with small depressions called eyes that bear axillary buds; a ginger rhizome, a horizontal underground stem with nodes, scale leaves and buds; and a colocasia corm, a rounded underground stem with rings of scale leaves. Bottom row: a grass runner creeping on the soil that roots at its nodes, a coiled tendril, and a pointed thorn arising in a leaf axil',
  [
    S.ellipse(80, 80, 56, 38, { c: B, fill: B, fop: 0.25, sw: 1.4 }), ...[[52, 70], [84, 62], [100, 90], [66, 96], [112, 72]].map(([x, y]) => S.circle(x, y, 3, { c: B, fill: B, fop: 0.6, sw: 1 })), S.lead(100, 90, 150, 118), lab(152, 122, 'Eye (bud)', { size: 10 }), title(80, 140, 'Tuber: potato'),
    S.path('M200 100 C220 70 250 100 270 80 C290 62 310 90 330 70', { c: B, w: 14, cap: 'round' }), ...[222, 262, 304].map((x) => S.line(x, 84, x, 106, { c: M, w: 1.5 })), S.path('M270 76 l 4 -22 M330 66 l 4 -20', { c: G, w: 2 }), title(270, 140, 'Rhizome: ginger'), lab(222, 66, 'node', { size: 10, c: M }),
    S.ellipse(450, 84, 40, 34, { c: B, fill: B, fop: 0.2, sw: 1.4 }), ...[64, 84, 104].map((y) => S.path(`M412 ${y} Q450 ${y + 8} 488 ${y}`, { c: B, w: 1.2 })), S.line(450, 50, 450, 30, { c: G, w: 3 }), S.line(450, 118, 440, 134, { c: B, w: 1.5 }), title(450, 152, 'Corm: colocasia'),
    S.line(30, 232, 280, 232, { c: B, w: 2.5 }), ...[70, 150, 230].map((x) => S.line(x, 232, x, 262, { c: B, w: 1.5 }) + S.line(x, 232, x, 206, { c: G, w: 3 }) + S.circle(x, 232, 4, { c: M, fill: 'var(--diagram-fill)', sw: 1.3 })), title(155, 290, 'Runner: grass'), note(155, 304, 'new plant at each node'),
    S.path('M350 260 C350 220 390 220 390 244 C390 268 366 266 368 246 C370 232 384 234 382 244', { c: G, w: 2 }), S.line(350, 260, 340, 290, { c: G, w: 3 }), title(370, 290, 'Tendril'),
    S.line(450, 290, 450, 220, { c: G, w: 4 }), S.path('M450 250 L486 218 L456 258 Z', { c: B, fill: B, fop: 0.5, w: 1.2 }), title(480, 290, 'Thorn'),
  ].join(''),
);

// 4. Parts of a leaf (named and lettered)
function leafParts(named) {
  const L = (letter, name) => (named ? name : letter);
  const t = (x, y, s, a = 'start') => (named ? S.text(x, y, s, { a, size: 11 }) : S.text(x, y, s, { a, size: 15, w: 'bold' }));
  return svgDoc(
    400,
    300,
    named
      ? 'A simple leaf attached to a stem: the leaf base with a pair of small leaf-like stipules, the stalk called the petiole, and the flat green lamina with a central midrib and side veins'
      : 'A simple leaf attached to a stem with five parts marked by letters: A the flat green blade, B the thick central vein of the blade, C the stalk that joins the blade to the stem, D the swollen region where the stalk joins the stem, and E the pair of small outgrowths at that region',
    [
      S.line(40, 40, 40, 270, { c: G, w: 7 }),
      S.path('M40 150 C56 150 70 148 100 146', { c: G, w: 3 }),
      S.path('M44 140 q 10 -22 22 -24 q -4 14 -22 24 Z M44 160 q 10 22 22 24 q -4 -14 -22 -24 Z', { c: G, fill: G, fop: 0.4, w: 1.2 }),
      S.circle(46, 150, 6, { c: G, fill: G, fop: 0.4, sw: 1.2 }),
      S.path('M100 146 C150 100 250 96 330 150 C250 204 150 196 100 146 Z', { c: G, fill: G, fop: 0.22, w: 1.6 }),
      S.line(100, 146, 330, 150, { c: G, w: 2.6 }),
      ...[[150, 'u'], [190, 'u'], [230, 'u'], [270, 'u'], [150, 'd'], [190, 'd'], [230, 'd'], [270, 'd']].map(([x, d]) => S.line(x, 147 + (x - 150) * 0.03, x + 28, d === 'u' ? 118 + (x - 150) * 0.1 : 180 - (x - 150) * 0.1, { c: G, w: 1.1 })),
      S.lead(220, 118, 250, 60), t(250, 54, L('A', 'Lamina (leaf blade)')),
      S.lead(300, 150, 340, 214), t(340, 226, L('B', 'Midrib'), 'start'),
      S.lead(80, 147, 100, 230), t(100, 244, L('C', 'Petiole')),
      S.lead(46, 156, 90, 270), t(94, 284, L('D', 'Leaf base')),
      S.lead(58, 122, 100, 76), t(104, 72, L('E', 'Stipule')),
    ].join(''),
  );
}
export const LEAF_NAMED = leafParts(true);
export const LEAF_LETTERED = leafParts(false);

// 5. Venation and compound leaves
const veinNet = (x, y) => [S.path(`M${x} ${y + 70} C${x - 30} ${y + 40} ${x - 30} ${y + 10} ${x} ${y} C${x + 30} ${y + 10} ${x + 30} ${y + 40} ${x} ${y + 70} Z`, { c: G, fill: G, fop: 0.18, w: 1.4 }), S.line(x, y + 70, x, y + 4, { c: G, w: 2 }), ...[16, 30, 44].flatMap((d) => [S.line(x, y + 70 - d, x - 20, y + 60 - d - 10, { c: G, w: 1 }), S.line(x, y + 70 - d, x + 20, y + 60 - d - 10, { c: G, w: 1 }), S.line(x - 10, y + 62 - d, x - 4, y + 56 - d, { c: G, w: 0.8 })])].join('');
export const LEAF_TYPES = svgDoc(
  560,
  230,
  'Venation and compound leaves. Reticulate venation: a network of veins branching from a midrib, as in dicot leaves. Parallel venation: veins running side by side from base to tip of a narrow blade, as in monocot leaves. A pinnate compound leaf: leaflets arranged along a common axis called the rachis. A palmate compound leaf: leaflets all arising from the tip of the petiole like the fingers of a hand',
  [
    veinNet(70, 36), title(70, 130, 'Reticulate'), note(70, 144, 'dicot: net of veins'),
    S.path('M190 106 C180 60 186 40 200 26 C214 40 220 60 210 106 Z', { c: G, fill: G, fop: 0.18, w: 1.4 }), ...[192, 197, 202, 207].map((x) => S.line(x + 0, 104, x + 0, 34, { c: G, w: 1 })), title(200, 130, 'Parallel'), note(200, 144, 'monocot: veins side by side'),
    S.line(330, 110, 330, 24, { c: G, w: 2.5 }), ...[40, 62, 84].flatMap((y) => [S.path(`M330 ${y} q -26 -4 -34 -18 q 24 -2 34 18 Z`, { c: G, fill: G, fop: 0.3, w: 1.2 }), S.path(`M330 ${y} q 26 -4 34 -18 q -24 -2 -34 18 Z`, { c: G, fill: G, fop: 0.3, w: 1.2 })]), S.ellipse(330, 20, 8, 12, { c: G, fill: G, fop: 0.3, sw: 1.2 }), lab(344, 114, 'rachis', { size: 10, c: M }), title(330, 134, 'Pinnate compound'), note(330, 148, 'leaflets along a rachis'),
    S.line(470, 120, 470, 98, { c: G, w: 2.5 }), ...[[-48, -40], [-24, -62], [0, -70], [24, -62], [48, -40]].map(([dx, dy]) => S.line(470, 98, 470 + dx, 98 + dy / 1.5, { c: G, w: 1.5 }) + S.ellipse(470 + dx * 1.15, 98 + dy / 1.2, 11, 7, { c: G, fill: G, fop: 0.3, sw: 1.2 })), title(470, 134, 'Palmate compound'), note(470, 148, 'leaflets from one point'),
    lab(14, 180, 'A compound leaf has a bud in the axil of its petiole but none at the base of its leaflets;', { size: 10, c: M }),
    lab(14, 196, 'a branch of simple leaves has a bud at its tip and a bud in the axil of each leaf.', { size: 10, c: M }),
  ].join(''),
);

// 6. Phyllotaxy
const leafAt = (x, y, dx, dy) => S.ellipse(x + dx, y + dy, 17, 8, { c: G, fill: G, fop: 0.3, sw: 1.2 }) + S.line(x, y, x + dx * 0.4, y + dy * 0.4, { c: G, w: 1.6 });
export const PHYLLOTAXY = svgDoc(
  560,
  260,
  'Three arrangements of leaves on a stem. Alternate: a single leaf at each node, successive leaves on alternate sides, as in the China rose. Opposite: two leaves at each node, on opposite sides, as in guava. Whorled: more than two leaves at each node, spreading around the stem, as in Alstonia',
  [
    S.line(90, 40, 90, 220, { c: G, w: 4 }), ...[0, 1, 2, 3, 4].map((i) => leafAt(90, 200 - i * 36, i % 2 ? -28 : 28, -12)), title(90, 244, 'Alternate'),
    S.line(280, 40, 280, 220, { c: G, w: 4 }), ...[0, 1, 2].flatMap((i) => [leafAt(280, 196 - i * 58, -28, -12), leafAt(280, 196 - i * 58, 28, -12)]), title(280, 244, 'Opposite'),
    S.line(470, 40, 470, 220, { c: G, w: 4 }), ...[0, 1].flatMap((i) => [leafAt(470, 196 - i * 78, -30, -10), leafAt(470, 196 - i * 78, 30, -10), leafAt(470, 196 - i * 78, -14, -26), leafAt(470, 196 - i * 78, 14, -26)]), title(470, 244, 'Whorled'),
    ...[0, 1, 2, 3, 4].map((i) => S.circle(90, 200 - i * 36, 2.6, { c: B, fill: B, sw: 1 })), ...[0, 1, 2].map((i) => S.circle(280, 196 - i * 58, 2.6, { c: B, fill: B, sw: 1 })), ...[0, 1].map((i) => S.circle(470, 196 - i * 78, 2.6, { c: B, fill: B, sw: 1 })),
    lab(14, 18, 'Dots mark the nodes', { size: 10, c: M }),
  ].join(''),
);

// 7. Leaf modifications
export const LEAF_MODS = svgDoc(
  560,
  260,
  'Modified leaves. A pea leaf whose upper leaflets are modified into coiled tendrils for climbing; spines on a green fleshy Opuntia stem pad, which are modified leaves for protection; a pitcher plant whose blade is modified into a pitcher with a lid that traps insects; and an onion bulb cut lengthwise, a short stem with fleshy scale leaves that store food',
  [
    S.line(70, 220, 70, 120, { c: G, w: 2.5 }), ...[[-24, 200], [24, 190], [-24, 162], [24, 152]].map(([dx, y]) => S.ellipse(70 + dx, y, 14, 8, { c: G, fill: G, fop: 0.3, sw: 1.2 }) + S.line(70, y, 70 + dx * 0.6, y, { c: G, w: 1.4 })), S.path('M70 120 C60 96 90 96 84 80 C78 66 64 72 70 82 M70 120 C86 100 106 100 100 84', { c: G, w: 1.6 }), title(70, 244, 'Pea: leaf tendrils'),
    S.ellipse(200, 130, 40, 60, { c: G, fill: G, fop: 0.22, sw: 1.4 }), ...[[176, 100], [212, 90], [190, 140], [226, 150], [196, 176]].flatMap(([x, y]) => [S.line(x, y, x - 8, y - 14, { c: B, w: 1.6 }), S.line(x, y, x + 8, y - 14, { c: B, w: 1.6 }), S.line(x, y, x, y - 16, { c: B, w: 1.6 })]), title(200, 244, 'Opuntia: leaf spines'),
    S.path('M330 100 C300 100 300 180 330 190 C360 180 360 100 330 100 Z', { c: G, fill: G, fop: 0.25, w: 1.5 }), S.path('M310 100 C320 82 350 82 360 100', { c: R, w: 2 }), S.path('M330 190 C330 210 340 220 348 226', { c: G, w: 1.6 }), S.path('M326 98 C318 80 340 70 346 80', { c: R, w: 1.5 }), lab(318, 70, 'lid', { size: 10, c: M }), title(330, 244, 'Pitcher plant'),
    S.circle(470, 140, 46, { c: B, fill: B, fop: 0.12, sw: 1.4 }), S.path('M470 94 C440 120 440 160 470 186 C500 160 500 120 470 94 Z', { c: B, w: 1.2 }), S.path('M470 94 C452 120 452 160 470 186 C488 160 488 120 470 94 Z', { c: B, w: 1.2 }), S.line(470, 94, 470, 70, { c: G, w: 3 }), S.line(470, 186, 462, 200, { c: B, w: 1.4 }), title(470, 244, 'Onion: bulb of scale leaves'),
  ].join(''),
);

export const ALL = { ROOT_TIP_NAMED, ROOT_TIP_LETTERED, ROOT_MODS, STEM_MODS, LEAF_NAMED, LEAF_LETTERED, LEAF_TYPES, PHYLLOTAXY, LEAF_MODS };
