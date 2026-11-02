// SVG diagrams for ch20 Digestion and Absorption (allow-listed elements, palette colours only).
// Human organs are neutral, labelled schematics (front views, not to scale).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { HALF_JAW, PER_HALF, TOTAL_TEETH, FORMULA } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const labs = (x, y, arr, o) => S.lines(x, y, arr, { size: 11, dy: 13, ...o });
const tube = (d, w, c) => S.path(d, { c, w, op: 0.35, cap: 'round', join: 'round' }) + S.path(d, { c, w: 1.2 });

// 1. Alimentary canal and associated glands
const colon = 'M130 412 L130 316 C130 310 136 306 142 306 L328 306 C336 306 342 312 342 318 L342 396 C342 418 300 420 270 424 C258 426 252 432 252 440 L252 452';
const small = 'M268 294 C290 300 300 316 290 330 L172 330 C160 330 160 346 172 346 L298 346 C310 346 310 362 298 362 L172 362 C160 362 160 378 172 378 L298 378 C310 378 310 394 298 394 L172 394 C162 394 154 404 146 412';
export const CANAL = svgDoc(
  460,
  470,
  'Human alimentary canal and associated digestive glands, front view, schematic: the buccal cavity with the tongue; three pairs of salivary glands (parotid, sub-maxillary and sub-lingual); the pharynx; the oesophagus leading to the J-shaped stomach; the liver with the gall bladder below it; the C-shaped duodenum with the pancreas in its curve; the coiled jejunum and ileum; the large intestine made of the caecum with the vermiform appendix, the ascending, transverse and descending colon, and the rectum opening at the anus',
  [
    S.ellipse(230, 46, 36, 18, { fill: 'var(--diagram-red)', fop: 0.15, c: 'var(--diagram-red)', sw: 1.2 }),
    S.ellipse(230, 52, 18, 6, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1 }),
    S.ellipse(178, 36, 10, 14, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    S.ellipse(196, 72, 11, 6, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    S.ellipse(232, 74, 9, 5, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    tube('M230 64 L232 92 C240 120 252 150 262 175', 10, 'var(--diagram-red)'),
    S.path('M118 158 C140 138 230 140 252 158 C250 184 226 200 192 206 C156 210 122 196 118 158 Z', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.2 }),
    S.ellipse(204, 216, 8, 12, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }),
    S.path('M262 172 C292 152 346 164 348 202 C350 238 312 260 274 252 L272 232 C292 230 304 218 304 204 C304 192 290 190 266 192 Z', { fill: 'var(--diagram-red)', fop: 0.2, c: 'var(--diagram-red)', w: 1.5 }),
    tube('M270 246 C240 252 222 258 222 276 C222 294 246 300 268 294', 12, 'var(--diagram-yellow)'),
    S.path('M240 284 C252 270 300 262 330 266 C334 274 312 282 292 284 C272 288 252 292 240 284 Z', { fill: 'var(--diagram-accent)', fop: 0.4, w: 1 }),
    tube(colon, 16, 'var(--diagram-green)'),
    tube(small, 9, 'var(--diagram-blue)'),
    S.ellipse(130, 420, 14, 12, { fill: 'var(--diagram-green)', fop: 0.4, sw: 1 }),
    S.path('M124 430 C120 442 122 452 128 458', { c: 'var(--diagram-green)', w: 4, cap: 'round' }),
    S.circle(252, 456, 3, { fill: 'currentColor', sw: 0 }),
    labs(8, 26, ['Parotid', 'gland'], { c: 'var(--diagram-brown)' }), S.lead(56, 30, 168, 36),
    lab(8, 72, 'Sub-maxillary gland', { c: 'var(--diagram-brown)' }), S.lead(112, 69, 185, 72),
    lab(8, 96, 'Sub-lingual gland', { c: 'var(--diagram-brown)' }), S.lead(98, 93, 226, 77),
    lab(8, 166, 'Liver', { c: 'var(--diagram-brown)' }), S.lead(36, 163, 120, 166),
    lab(8, 222, 'Gall bladder', { c: 'var(--diagram-green)' }), S.lead(76, 219, 196, 217),
    lab(8, 268, 'Duodenum'), S.lead(64, 265, 216, 270),
    lab(8, 300, 'Transverse colon', { c: 'var(--diagram-green)' }), S.lead(100, 300, 156, 306),
    lab(8, 360, 'Ascending colon', { c: 'var(--diagram-green)' }), S.lead(94, 357, 122, 357),
    lab(8, 420, 'Caecum', { c: 'var(--diagram-green)' }), S.lead(50, 417, 116, 418),
    lab(8, 456, 'Vermiform appendix', { c: 'var(--diagram-green)' }), S.lead(116, 453, 122, 452),
    labs(452, 36, ['Buccal cavity', 'and tongue'], { a: 'end', c: 'var(--diagram-red)' }), S.lead(372, 42, 266, 48),
    lab(452, 84, 'Pharynx', { a: 'end' }), S.lead(406, 81, 237, 80),
    lab(452, 128, 'Oesophagus', { a: 'end', c: 'var(--diagram-red)' }), S.lead(386, 125, 252, 140),
    lab(452, 200, 'Stomach', { a: 'end', c: 'var(--diagram-red)' }), S.lead(406, 197, 346, 200),
    lab(452, 262, 'Pancreas', { a: 'end', c: 'var(--diagram-accent)' }), S.lead(404, 259, 332, 268),
    labs(452, 330, ['Small intestine', '(jejunum, ileum)'], { a: 'end', c: 'var(--diagram-blue)' }), S.lead(360, 336, 304, 346),
    lab(452, 384, 'Descending colon', { a: 'end', c: 'var(--diagram-green)' }), S.lead(358, 381, 350, 381),
    lab(452, 430, 'Rectum', { a: 'end', c: 'var(--diagram-green)' }), S.lead(410, 427, 262, 436),
    lab(452, 460, 'Anus', { a: 'end' }), S.lead(422, 457, 258, 456),
  ].join(''),
);

// 2. Dental arch of one jaw (computed from the dental formula)
const TYPES = [
  ['I', HALF_JAW.I, 'var(--diagram-blue)', 'Incisors'],
  ['C', HALF_JAW.C, 'var(--diagram-red)', 'Canine'],
  ['PM', HALF_JAW.PM, 'var(--diagram-yellow)', 'Premolars'],
  ['M', HALF_JAW.M, 'var(--diagram-green)', 'Molars'],
];
const seq = TYPES.flatMap(([k, n, c]) => Array.from({ length: n }, () => [k, c]));
const tooth = (x, y, [k, c]) => {
  const sz = { I: [7, 9], C: [8, 8], PM: [9, 9], M: [12, 11] }[k];
  return S.ellipse(x, y, sz[0], sz[1], { fill: c, fop: 0.45, sw: 1 });
};
const arch = seq.flatMap((t, i) => {
  const phi = (((i + 0.5) / PER_HALF) * 100 * Math.PI) / 180;
  const x = 130 * Math.sin(phi);
  const y = 40 + 150 * (1 - Math.cos(phi));
  return [tooth(160 - x, y, t), tooth(160 + x, y, t)];
});
export const TEETH = svgDoc(
  460,
  270,
  `Teeth of one adult human jaw seen from above, schematic: from the front midline backwards each half has ${HALF_JAW.I} incisors, ${HALF_JAW.C} canine, ${HALF_JAW.PM} premolars and ${HALF_JAW.M} molars, ${PER_HALF} teeth. The dental formula ${FORMULA} over ${FORMULA} gives ${PER_HALF} teeth in each of four half jaws, ${TOTAL_TEETH} permanent teeth in all`,
  [
    ...arch,
    S.text(160, 104, 'One jaw', { a: 'middle', size: 11, w: 'bold' }),
    S.text(160, 120, `${PER_HALF * 2} teeth`, { a: 'middle', size: 11 }),
    S.text(160, 136, '(front at top)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.text(312, 24, 'In each half jaw:', { size: 11, w: 'bold' }),
    ...TYPES.map(([k, n, c, name], i) => S.ellipse(318, 44 + i * 26, 8, 8, { fill: c, fop: 0.45, sw: 1 }) + lab(334, 48 + i * 26, `${name} (${k}): ${n}`)),
    S.text(312, 160, 'Dental formula', { size: 11, w: 'bold' }),
    S.text(380, 186, `${FORMULA}`, { a: 'middle', size: 13, w: 'bold' }),
    S.line(350, 192, 410, 192, { w: 1.2 }),
    S.text(380, 208, `${FORMULA}`, { a: 'middle', size: 13, w: 'bold' }),
    S.text(312, 236, `${PER_HALF} per half jaw × 4 = ${TOTAL_TEETH}`, { size: 11 }),
    S.text(312, 254, 'upper over lower jaw', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Transverse section of the gut wall
const cx = 150, cy = 150;
const ring = (rad, c, fop) => S.circle(cx, cy, rad, { fill: 'var(--diagram-fill)', c: 'var(--diagram-muted)', sw: 1 }) + S.circle(cx, cy, rad, { fill: c, fop, sw: 0 });
const villi = Array.from({ length: 22 }, (_, k) => {
  const a = (k / 22) * 2 * Math.PI;
  const p = (rad, da) => `${(cx + rad * Math.cos(a + da)).toFixed(1)} ${(cy + rad * Math.sin(a + da)).toFixed(1)}`;
  return S.path(`M${p(63, -0.1)} L${p(44, -0.05)} C${p(40, -0.03)} ${p(40, 0.03)} ${p(44, 0.05)} L${p(63, 0.1)} Z`, { fill: 'var(--diagram-green)', fop: 0.5, w: 0.8 });
}).join('');
const vessels = Array.from({ length: 12 }, (_, k) => {
  const a = (k / 12) * 2 * Math.PI + 0.2;
  return S.circle(cx + 89 * Math.cos(a), cy + 89 * Math.sin(a), 3, { fill: k % 2 ? 'var(--diagram-blue)' : 'var(--diagram-red)', fop: 0.7, sw: 0.6 });
}).join('');
export const WALL = svgDoc(
  460,
  300,
  'Transverse section of the gut wall, schematic, from outside inwards: serosa, a thin mesothelium with some connective tissue; muscularis, with an outer longitudinal and an inner circular layer of smooth muscle; sub-mucosa, loose connective tissue with nerves, blood and lymph vessels; and mucosa, which lines the lumen and forms finger-like villi in the small intestine',
  [
    ring(122, 'var(--diagram-muted)', 0.15),
    ring(116, 'var(--diagram-red)', 0.2),
    ring(103, 'var(--diagram-red)', 0.4),
    ring(80, 'var(--diagram-yellow)', 0.2),
    vessels,
    ring(64, 'var(--diagram-green)', 0.3),
    S.circle(cx, cy, 46, { fill: 'var(--diagram-fill)', sw: 0 }),
    villi,
    S.text(cx, cy + 4, 'Lumen', { a: 'middle', size: 11 }),
    lab(300, 30, 'Serosa'), S.lead(298, 27, 236, 70),
    labs(300, 70, ['Muscularis: outer', 'longitudinal layer'], { c: 'var(--diagram-red)' }), S.lead(298, 74, 258, 102),
    labs(300, 112, ['Muscularis: inner', 'circular layer'], { c: 'var(--diagram-red)' }), S.lead(298, 116, 257, 130),
    labs(300, 156, ['Sub-mucosa: nerves,', 'blood and lymph vessels'], { c: 'var(--diagram-brown)' }), S.lead(298, 160, 240, 160),
    labs(300, 206, ['Mucosa: lines the', 'lumen, forms villi'], { c: 'var(--diagram-green)' }), S.lead(298, 210, 212, 186),
    labs(300, 256, ['Villi project', 'into the lumen'], { c: 'var(--diagram-green)' }), S.lead(298, 258, 175, 193),
  ].join(''),
);

// 4. Duodenum with the bile and pancreatic ducts
export const DUCTS = svgDoc(
  460,
  300,
  'Duodenum and the ducts that open into it, schematic: the stomach opens into the duodenum through the pyloric sphincter; bile from the liver passes along the hepatic duct and is stored in the gall bladder; the cystic duct from the gall bladder and the hepatic duct join to form the common bile duct; the bile duct and the pancreatic duct from the pancreas open together into the duodenum as the common hepato-pancreatic duct, guarded by the sphincter of Oddi',
  [
    S.path('M20 40 C40 18 100 20 112 46 C120 64 118 84 120 96 L104 96 C100 86 92 76 72 78 C46 80 20 70 20 40 Z', { fill: 'var(--diagram-red)', fop: 0.18, c: 'var(--diagram-red)', w: 1.5 }),
    tube('M112 98 L112 272', 26, 'var(--diagram-yellow)'),
    S.line(98, 96, 126, 96, { w: 4, c: 'var(--diagram-accent)' }),
    S.path('M244 22 C300 8 420 14 440 40 C446 66 420 90 380 94 C330 98 270 96 248 80 C232 66 232 34 244 22 Z', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.2 }),
    S.ellipse(312, 128, 12, 22, { fill: 'var(--diagram-green)', fop: 0.45, sw: 1 }),
    S.path('M262 86 C254 100 244 110 232 122', { c: 'var(--diagram-green)', w: 2.5 }),
    S.path('M302 112 C290 116 260 118 232 122', { c: 'var(--diagram-green)', w: 2.5 }),
    S.path('M232 122 C210 146 186 170 160 196 L134 204', { c: 'var(--diagram-green)', w: 3 }),
    S.path('M150 210 C160 186 220 172 300 168 C360 166 410 150 440 142 C448 160 430 180 396 186 C340 196 290 196 250 214 C222 228 176 246 150 236 Z', { fill: 'var(--diagram-accent)', fop: 0.3, w: 1.2 }),
    S.path('M430 156 C380 168 300 180 240 196 C200 206 170 208 134 206', { c: 'var(--diagram-accent)', w: 2.2, dash: '5 3' }),
    S.circle(128, 205, 5, { c: 'var(--diagram-red)', sw: 2.2 }),
    lab(8, 100, 'Stomach', { c: 'var(--diagram-red)' }), S.lead(30, 90, 40, 70),
    labs(8, 134, ['Pyloric', 'sphincter'], { c: 'var(--diagram-accent)' }), S.lead(60, 126, 98, 98),
    lab(8, 258, 'Duodenum'), S.lead(64, 255, 99, 255),
    labs(8, 186, ['Sphincter', 'of Oddi'], { c: 'var(--diagram-red)' }), S.lead(56, 196, 122, 205),
    labs(140, 282, ['Hepato-pancreatic duct (opens', 'into the duodenum)'], { size: 10 }), S.lead(150, 272, 140, 208),
    S.text(340, 58, 'Liver', { a: 'middle', size: 11, c: 'var(--diagram-brown)' }),
    lab(452, 126, 'Gall bladder', { a: 'end', c: 'var(--diagram-green)' }), S.lead(384, 123, 325, 126),
    lab(140, 30, 'Hepatic duct', { c: 'var(--diagram-green)' }), S.lead(204, 34, 254, 98),
    lab(140, 70, 'Cystic duct', { c: 'var(--diagram-green)' }), S.lead(198, 73, 270, 116),
    labs(228, 146, ['Common', 'bile duct'], { c: 'var(--diagram-green)' }),
    lab(452, 214, 'Pancreas', { a: 'end', c: 'var(--diagram-accent)' }), S.lead(404, 211, 380, 188),
    lab(452, 250, 'Pancreatic duct', { a: 'end', c: 'var(--diagram-accent)' }), S.lead(370, 246, 330, 175),
  ].join(''),
);

// 5. A villus of the small intestine
const micro = (x1, y1, x2, y2, n) => Array.from({ length: n }, (_, i) => {
  const t = (i + 0.5) / n;
  const x = x1 + (x2 - x1) * t;
  const y = y1 + (y2 - y1) * t;
  return S.line(x, y, x - (y2 > y1 ? 6 : -6) * 0, y - 6, { w: 1, c: 'var(--diagram-green)' });
}).join('');
export const VILLUS = svgDoc(
  460,
  300,
  'A villus of the small intestine, schematic: a finger-like projection of the mucosa covered by columnar epithelial cells whose microvilli form a brush border, with mucus-secreting goblet cells among them; inside, a network of blood capillaries (arterial side and venous side) surrounds a central lymph vessel, the lacteal; crypts of Lieberkuhn lie between the bases of the villi. Inset: one epithelial cell with microvilli on its free surface',
  [
    S.path('M20 266 L66 266 L66 288 C66 296 86 296 86 288 L86 266 L100 266 L100 90 C100 40 196 40 196 90 L196 266 L210 266 L210 288 C210 296 230 296 230 288 L230 266 L270 266', { c: 'var(--diagram-green)', w: 3, fill: 'none' }),
    S.path('M100 266 L100 90 C100 40 196 40 196 90 L196 266 Z', { fill: 'var(--diagram-green)', fop: 0.12, w: 0 }),
    S.path('M138 264 L138 96 C138 80 158 80 158 96 L158 264', { c: 'var(--diagram-yellow)', w: 1.5 }),
    S.path('M138 264 L138 96 C138 80 158 80 158 96 L158 264 Z', { fill: 'var(--diagram-yellow)', fop: 0.45, w: 0 }),
    S.path('M116 264 L116 90 C116 64 132 60 148 60 C164 60 180 64 180 90 L180 264', { c: 'var(--diagram-red)', w: 1.8 }),
    S.path('M116 120 L180 120 M116 170 L180 170 M116 220 L180 220', { c: 'var(--diagram-blue)', w: 1.2, dash: '3 2' }),
    S.ellipse(100, 150, 4, 8, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 0.8 }),
    S.ellipse(196, 200, 4, 8, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 0.8 }),
    ...[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map((y) => S.line(96, y, 90, y, { w: 1, c: 'var(--diagram-green)' }) + S.line(200, y, 206, y, { w: 1, c: 'var(--diagram-green)' })),
    S.rect(330, 60, 70, 80, { rx: 4, fill: 'var(--diagram-green)', fop: 0.15, c: 'var(--diagram-green)', sw: 1.2 }),
    micro(334, 60, 396, 60, 10),
    S.ellipse(365, 112, 10, 8, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 0.8 }),
    S.text(365, 154, 'Inset: one epithelial cell', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    labs(452, 20, ['Microvilli', '(brush border)'], { a: 'end', c: 'var(--diagram-green)' }), S.lead(408, 36, 398, 55),
    lab(452, 96, 'Nucleus', { a: 'end' }), S.lead(408, 93, 376, 110),
    lab(452, 180, 'Lacteal (lymph vessel)', { a: 'end', c: 'var(--diagram-brown)' }), S.lead(328, 177, 160, 177),
    lab(452, 208, 'Blood capillaries', { a: 'end', c: 'var(--diagram-red)' }), S.lead(358, 205, 182, 208),
    lab(452, 236, 'Goblet cell (mucus)', { a: 'end', c: 'var(--diagram-blue)' }), S.lead(344, 233, 201, 204),
    lab(452, 284, 'Crypt between villi', { a: 'end' }), S.lead(346, 281, 232, 284),
    labs(8, 70, ['Columnar', 'epithelium'], { c: 'var(--diagram-green)' }), S.lead(66, 74, 90, 80),
    labs(8, 140, ['Villus', '(mucosa)'], { c: 'var(--diagram-green)' }), S.lead(56, 144, 106, 128),
  ].join(''),
);

export const ALL = { CANAL, TEETH, WALL, DUCTS, VILLUS };
