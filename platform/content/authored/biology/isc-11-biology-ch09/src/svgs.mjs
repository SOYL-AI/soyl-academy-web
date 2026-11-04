// SVG diagrams for ISC 11 Biology ch09 Structural Organisation in Animals: Frog: external features (dorsal view, named and lettered A-E),
// male and female features, alimentary canal (ventral view, named and lettered A-E), breathing, heart and circulation, male and female
// urinogenital systems and the brain.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const G = 'var(--diagram-green)';
const B = 'var(--diagram-brown)';
const Y = 'var(--diagram-yellow)';
const R = 'var(--diagram-red)';
const BL = 'var(--diagram-blue)';
const M = 'var(--diagram-muted)';
const F = 'var(--diagram-fill)';
const title = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 11, w: 'bold' });
const note = (x, y, s) => S.text(x, y, s, { a: 'middle', size: 10, c: M });
const dot = (x, y, cr, o = {}) => S.circle(x, y, cr, { c: o.c ?? M, sw: o.sw ?? 1, fill: o.fill ?? 'none', fop: o.fop });
/** A hollow tube along a path: outline, light core and a tint. */
const tube = (d, w, c, tint = 0.3) => S.path(d, { w: w + 2, c, cap: 'round', join: 'round' }) + S.path(d, { w: w - 1, c: F, cap: 'round', join: 'round' }) + S.path(d, { w: w - 1, c, op: tint, cap: 'round', join: 'round' });
function sideLabels(items, x, dir, named = true, gap = 24, y0 = 22) {
  const sorted = [...items].sort((a, b) => a[2] - b[2]);
  let prev = y0 - gap;
  return sorted
    .map(([t, ax, ay, L]) => {
      const y = Math.max(ay + 4, prev + gap);
      prev = y;
      const lead = S.lead(dir === 'r' ? x - 4 : x + 4, y - 4, ax, ay);
      const txt = named ? S.text(x, y, t, { a: dir === 'r' ? 'start' : 'end', size: 11 }) : S.text(x, y + 2, L, { a: dir === 'r' ? 'start' : 'end', size: 15, w: 'bold' });
      return lead + txt;
    })
    .join('');
}

// 1. External features, dorsal view
function frogBody() {
  const out = [];
  const side = (s) => {
    const X = (x) => 230 + s * (x - 230);
    const hand = [[-14, 14], [-5, 18], [5, 18], [14, 14]];
    out.push(
      S.path(`M${X(180)} 122 L${X(138)} 150 L${X(122)} 194`, { c: G, w: 7, cap: 'round', join: 'round' }),
      ...hand.map(([dx, dy]) => S.line(X(122), 194, X(122 + dx), 194 + dy + 6, { c: G, w: 2.4, cap: 'round' })),
      S.path(`M${X(196)} 246 L${X(112)} 236 L${X(132)} 292`, { c: G, w: 10, cap: 'round', join: 'round' }),
      S.path(`M${X(132)} 292 L${X(86)} 330 L${X(104)} 340 L${X(126)} 338 L${X(150)} 340 L${X(164)} 326 Z`, { c: G, fill: G, fop: 0.18, w: 1.2 }),
      ...[86, 104, 126, 150, 164].map((x, i) => S.line(X(132), 292, X(x), i === 0 ? 330 : i === 4 ? 326 : 340, { c: G, w: 2.4, cap: 'round' })),
    );
  };
  side(1);
  side(-1);
  out.push(
    S.path('M180 100 C150 150 160 230 200 262 L260 262 C300 230 310 150 280 100 Z', { c: G, fill: G, fop: 0.22, w: 1.6 }),
    S.path('M230 28 C200 32 180 62 178 98 C196 114 264 114 282 98 C280 62 260 32 230 28 Z', { c: G, fill: G, fop: 0.3, w: 1.6 }),
    dot(192, 66, 10, { c: G, fill: F, sw: 1.6 }), dot(192, 66, 4.5, { c: M, fill: M, sw: 0 }), dot(268, 66, 10, { c: G, fill: F, sw: 1.6 }), dot(268, 66, 4.5, { c: M, fill: M, sw: 0 }),
    dot(222, 42, 1.8, { c: M, fill: M, sw: 0 }), dot(238, 42, 1.8, { c: M, fill: M, sw: 0 }),
    dot(170, 96, 7, { c: B, fill: B, fop: 0.2, sw: 1.4 }), dot(290, 96, 7, { c: B, fill: B, fop: 0.2, sw: 1.4 }),
    ...[[210, 150], [250, 140], [226, 190], [262, 200], [200, 214], [240, 236], [220, 120], [256, 168]].map(([x, y]) => S.ellipse(x, y, 7, 5, { c: B, fill: B, fop: 0.35, sw: 0 })),
  );
  return out.join('');
}
const FROG_RIGHT = [['Nostril', 308, 42, 'E'], ['Eye', 340, 62, 'A'], ['Tympanum', 362, 94, 'B'], ['Forelimb (four digits)', 410, 196, 'C'], ['Webbed hind foot (five toes)', 400, 336, 'D']];
const shifted = (g) => `<g transform="translate(70 0)">${g}</g>`;
export const FROG_EXT = svgDoc(
  640,
  360,
  'A frog seen from above. The body has a head and a trunk, with no neck and no tail. The skin is olive green with dark spots. The head carries two bulging eyes, two nostrils at the tip of the snout and, behind each eye, a round membrane, the tympanum, which receives sound. The short forelimbs end in four digits and the long hind limbs, folded in a Z, end in five webbed toes',
  [
    shifted(frogBody()),
    sideLabels(FROG_RIGHT, 470, 'r', true, 30, 30),
    sideLabels([['Skin (olive green, spotted)', 285, 150, ''], ['Trunk', 260, 200, ''], ['Hind limb (long, strong)', 210, 262, '']], 150, 'l', true, 50, 120),
  ].join(''),
);
export const FROG_LETTERS = { A: 'eye', B: 'tympanum', C: 'forelimb', D: 'webbed hind foot', E: 'nostril' };
export const FROG_EXT_LETTERED = svgDoc(
  520,
  360,
  'A frog seen from above with five structures marked by letters. A: one of the two bulging organs of sight on the top of the head. B: the round membrane behind that organ, which receives sound. C: the short limb in front, ending in four digits. D: the broad foot of the long hind limb, with five toes joined by skin. E: one of the two small openings at the tip of the snout',
  [shifted(frogBody()), sideLabels(FROG_RIGHT, 470, 'r', false, 30, 30)].join(''),
);

// 2. Male and female features
function hand(cx, cy, pad) {
  const out = [S.ellipse(cx, cy, 26, 20, { c: G, fill: G, fop: 0.2, sw: 1.5 })];
  [[-20, -30], [-7, -36], [7, -36], [20, -30]].forEach(([dx, dy]) => out.push(S.line(cx + dx * 0.8, cy - 12, cx + dx, cy + dy, { c: G, w: 6, cap: 'round' })));
  if (pad) out.push(S.ellipse(cx - 20, cy - 12, 10, 9, { c: B, fill: B, fop: 0.7, sw: 1.2 }));
  return out.join('');
}
export const SEX = svgDoc(
  520,
  230,
  'External features that distinguish the sexes of the frog. A male has a pair of vocal sacs, which swell out at the sides of the throat when he calls, and a dark rough copulatory pad on the first digit of each forelimb. A female has neither: her throat and her forelimbs are smooth',
  [
    S.path('M40 110 C40 60 130 50 170 80 C190 96 186 124 160 128 L60 130 C46 128 40 120 40 110 Z', { c: G, fill: G, fop: 0.25, w: 1.6 }),
    dot(120, 80, 9, { c: G, fill: F, sw: 1.6 }), dot(120, 80, 4, { c: M, fill: M, sw: 0 }), dot(64, 92, 2, { c: M, fill: M, sw: 0 }),
    S.ellipse(150, 138, 22, 14, { c: B, fill: B, fop: 0.25, sw: 1.5 }), S.ellipse(112, 142, 18, 12, { c: B, fill: B, fop: 0.25, sw: 1.5 }),
    S.lead(130, 150, 100, 196), lab(30, 210, 'Vocal sacs (swollen)', { size: 11 }),
    title(110, 22, 'Male: head, side view'),
    hand(310, 120, true), title(310, 22, 'Male: forelimb'), S.lead(296, 112, 340, 190), lab(342, 200, 'Copulatory pad', { size: 11 }),
    hand(450, 120, false), title(450, 22, 'Female: forelimb'), note(450, 176, 'smooth, no pad'),
  ].join(''),
);

// 3. Alimentary canal, ventral view (named and lettered)
function alimentary() {
  const out = [];
  out.push(S.ellipse(230, 40, 62, 28, { c: G, fill: G, fop: 0.1, sw: 1.4 }), S.line(170, 46, 290, 46, { c: M, w: 1, dash: '3 3' }), S.path('M214 50 C216 40 244 40 246 50 C240 58 220 58 214 50 Z', { c: R, fill: R, fop: 0.35, w: 1.2 }));
  out.push(tube('M230 68 L228 112', 8, B));
  out.push(S.path('M168 116 C188 100 286 100 304 118 C314 152 274 172 242 164 C204 170 158 152 168 116 Z', { c: R, fill: R, fop: 0.35, w: 1.5 }), S.ellipse(266, 154, 7, 10, { c: G, fill: G, fop: 0.6, sw: 1.2 }));
  out.push(tube('M226 124 C206 170 208 206 248 216', 20, R, 0.25));
  out.push(S.ellipse(280, 198, 20, 8, { c: Y, fill: Y, fop: 0.5, sw: 1.2 }));
  out.push(tube('M250 216 C284 218 306 206 312 176', 9, B));
  out.push(tube('M312 176 C346 176 344 206 312 210 C282 218 292 244 330 244 C362 250 352 282 312 284 C284 290 276 304 302 310', 9, B));
  out.push(tube('M302 310 L242 340', 16, B, 0.35), S.ellipse(234, 350, 17, 12, { c: B, fill: B, fop: 0.3, sw: 1.5 }));
  return out.join('');
}
const ALIM_ITEMS = (c) => ({
  right: [['Liver', 300, 122, 'A'], ['Gall bladder', 270, 150], ['Pancreas', 292, 196, 'C'], ['Duodenum', 316, 184], ['Ileum', 352, 262, 'D'], ['Rectum', 270, 326]].filter((it) => !c || it[3]),
  left: [['Buccal cavity', 200, 40], ['Tongue', 226, 50], ['Pharynx', 229, 72], ['Oesophagus', 228, 96], ['Stomach', 210, 192, 'B'], ['Cloaca', 218, 352, 'E']].filter((it) => !c || it[3]),
});
export const ALIMENTARY = svgDoc(
  520,
  380,
  'Alimentary canal of a frog in ventral view. Food passes from the mouth into the buccal cavity, which has a forked tongue attached at the front, then through the pharynx and short oesophagus into the J-shaped stomach, then the duodenum, the coiled ileum, the rectum and the cloaca. The liver, with its gall bladder, and the pancreas pour their secretions into the duodenum',
  [alimentary(), sideLabels(ALIM_ITEMS(false).right, 400, 'r', true, 26, 90), sideLabels(ALIM_ITEMS(false).left, 130, 'l', true, 26, 30)].join(''),
);
export const ALIM_LETTERS = { A: 'liver', B: 'stomach', C: 'pancreas', D: 'ileum', E: 'cloaca' };
export const ALIMENTARY_LETTERED = svgDoc(
  480,
  380,
  'Alimentary canal of a frog with five parts marked by letters. A: the large reddish three-lobed organ at the top of the body cavity that makes bile. B: the J-shaped muscular bag that receives food from the short tube behind the throat. C: the small yellowish gland lying in the bend between the first part of the small intestine and the stomach. D: the long coiled tube in which digested food is absorbed. E: the chamber at the end of the canal that receives faeces and also urine',
  [alimentary(), sideLabels(ALIM_ITEMS(true).right, 400, 'r', false, 34, 120), sideLabels(ALIM_ITEMS(true).left, 140, 'l', false, 34, 190)].join(''),
);

// 4. Breathing: head and trunk in section with the path of air
export const BREATHING = svgDoc(
  520,
  250,
  'Breathing in a frog on land. Air enters through the nostrils into the buccal cavity, is forced by raising the floor of the buccal cavity through the glottis into a pair of sac-like lungs in the trunk, and gas exchange also goes on through the moist skin and the lining of the buccal cavity. In water, oxygen dissolved in the water enters mainly through the skin',
  [
    S.path('M30 100 C40 60 150 50 200 70 C260 60 420 70 470 120 C480 160 430 200 380 200 L180 200 C100 200 40 170 30 130 Z', { c: G, fill: G, fop: 0.12, w: 1.8 }),
    S.path('M36 112 L190 126', { c: M, w: 1.2, dash: '4 3' }),
    S.path('M60 96 C80 96 100 100 120 108', { c: BL, w: 2 }), dot(52, 92, 3, { c: M, fill: M, sw: 0 }), lab(14, 78, 'Nostril', { size: 11 }),
    S.ellipse(110, 148, 70, 24, { c: B, fill: B, fop: 0.1, sw: 1.2 }), lab(70, 184, 'Buccal cavity', { size: 11 }),
    S.path('M170 150 L214 156', { c: B, w: 3 }), S.lead(196, 156, 206, 190), lab(180, 204, 'Glottis', { size: 11, c: M }),
    S.ellipse(300, 130, 52, 28, { c: R, fill: R, fop: 0.22, sw: 1.6 }), S.ellipse(390, 132, 40, 26, { c: R, fill: R, fop: 0.22, sw: 1.6 }), lab(300, 134, 'Lung', { a: 'middle' }), lab(390, 136, 'Lung', { a: 'middle' }),
    S.arrow(76, 94, 130, 126, { c: BL, w: 2, size: 8 }), S.arrow(150, 152, 242, 148, { c: BL, w: 2, size: 8 }),
    S.path('M170 214 C240 224 340 224 420 210', { c: G, w: 1.6, dash: '5 3' }), lab(300, 240, 'moist skin also exchanges gases', { a: 'middle', size: 10, c: M }),
    lab(440, 70, 'Trunk', { size: 11, c: M }),
  ].join(''),
);

// 5. Heart and the route of the blood
const chamber = (x, y, w, h, c, t) => S.path(`M${x} ${y + 10} Q${x} ${y} ${x + 10} ${y} L${x + w - 10} ${y} Q${x + w} ${y} ${x + w} ${y + 10} L${x + w} ${y + h - 10} Q${x + w} ${y + h} ${x + w - 10} ${y + h} L${x + 10} ${y + h} Q${x} ${y + h} ${x} ${y + h - 10} Z`, { c, fill: c, fop: 0.2, w: 1.8 }) + S.text(x + w / 2, y + h / 2 + 4, t, { a: 'middle', size: 11 });
export const HEART = svgDoc(
  540,
  330,
  'The three-chambered heart of the frog and the route of the blood. Deoxygenated blood from the body flows through the veins into the sinus venosus and the right atrium; oxygenated blood from the lungs enters the left atrium. Both atria empty into the single ventricle, where the two kinds of blood mix. The ventricle pumps blood into the truncus arteriosus, which divides to send blood to the lungs and skin, to the body and to the head',
  [
    chamber(110, 130, 90, 56, BL, 'Right atrium'), chamber(250, 130, 90, 56, R, 'Left atrium'), chamber(170, 216, 120, 60, Y, 'Ventricle'),
    chamber(6, 130, 90, 56, BL, 'Sinus venosus'),
    S.arrow(96, 158, 108, 158, { c: BL, w: 2, size: 7 }),
    S.arrow(156, 188, 190, 216, { c: BL, w: 2, size: 7 }), S.arrow(296, 188, 262, 216, { c: R, w: 2, size: 7 }),
    S.path('M290 216 C330 190 360 150 360 100', { c: M, w: 5, cap: 'round' }), lab(372, 170, 'Truncus arteriosus', { size: 11 }),
    S.arrow(360, 100, 330, 60, { c: M, w: 2, size: 7 }), S.arrow(360, 100, 360, 56, { c: M, w: 2, size: 7 }), S.arrow(360, 100, 404, 62, { c: M, w: 2, size: 7 }),
    lab(300, 48, 'Lungs, skin', { size: 10, c: M, a: 'middle' }), lab(360, 44, 'Body', { size: 10, c: M, a: 'middle' }), lab(412, 56, 'Head', { size: 10, c: M }),
    S.arrow(50, 100, 50, 128, { c: BL, w: 2, size: 7 }), lab(50, 92, 'Veins from body', { size: 10, c: BL, a: 'middle' }),
    S.arrow(296, 94, 296, 128, { c: R, w: 2, size: 7 }), lab(296, 86, 'From lungs', { size: 10, c: R, a: 'middle' }),
    lab(120, 304, 'Ventricle: oxygenated and deoxygenated blood mix', { size: 11, c: M }),
  ].join(''),
);

// 6. Male and female urinogenital systems (ventral view)
const kidney = (x) => S.path(`M${x - 18} 100 C${x - 18} 80 ${x + 18} 80 ${x + 18} 100 L${x + 16} 210 C${x + 16} 230 ${x - 16} 230 ${x - 16} 210 Z`, { c: R, fill: R, fop: 0.35, w: 1.6 });
export const UROGENITAL_MALE = svgDoc(
  520,
  340,
  'Urinogenital system of a male frog in ventral view. A pair of dark red kidneys lies on either side of the backbone. A pair of yellowish testes is attached to the upper part of the kidneys; fine tubes, the vasa efferentia, carry sperms from each testis into its kidney. From the kidney a duct, the urinogenital duct, carries both sperms and urine to the cloaca. The urinary bladder lies in front of the rectum and opens into the cloaca',
  [
    kidney(180), kidney(280),
    S.ellipse(206, 96, 11, 20, { c: B, fill: Y, fop: 0.6, sw: 1.4 }), S.ellipse(254, 96, 11, 20, { c: B, fill: Y, fop: 0.6, sw: 1.4 }),
    ...[0, 1, 2].flatMap((i) => [S.line(200, 84 + i * 12, 186, 96 + i * 12, { c: M, w: 1 }), S.line(260, 84 + i * 12, 274, 96 + i * 12, { c: M, w: 1 })]),
    tube('M160 210 C160 250 200 276 226 290', 5, B), tube('M300 210 C300 250 260 276 234 290', 5, B),
    S.ellipse(230, 258, 16, 12, { c: BL, fill: BL, fop: 0.2, sw: 1.4 }), S.line(230, 270, 230, 288, { c: BL, w: 2 }),
    S.ellipse(230, 300, 20, 12, { c: B, fill: B, fop: 0.3, sw: 1.5 }),
    sideLabels([['Testis', 262, 80], ['Vasa efferentia', 272, 100], ['Urinogenital duct', 296, 240], ['Cloaca', 250, 302]], 360, 'r', true, 30, 60),
    sideLabels([['Kidney', 162, 150], ['Urinary bladder', 216, 258]], 120, 'l', true, 60, 150),
  ].join(''),
);
export const UROGENITAL_FEMALE = svgDoc(
  540,
  350,
  'Urinogenital system of a female frog in ventral view. A pair of kidneys lies on either side of the backbone, each with a ureter running to the cloaca. A pair of large ovaries, packed with ova, lies in front of the kidneys and has no functional connection with them. A pair of long coiled oviducts runs from near the ovaries to the cloaca, so the ureters and the oviducts open separately into the cloaca. The urinary bladder lies in front of the rectum',
  [
    kidney(190), kidney(290),
    S.path('M150 80 C140 40 200 30 215 70 C228 110 160 130 150 80 Z', { c: B, fill: Y, fop: 0.3, w: 1.5 }), S.path('M330 80 C340 40 280 30 265 70 C252 110 320 130 330 80 Z', { c: B, fill: Y, fop: 0.3, w: 1.5 }),
    ...[[170, 62], [186, 78], [196, 56], [180, 94], [168, 82], [200, 88]].flatMap(([x, y]) => [dot(x, y, 4, { c: B, fill: B, fop: 0.6, sw: 0.8 }), dot(480 - x, y, 4, { c: B, fill: B, fop: 0.6, sw: 0.8 })]),
    tube('M140 110 C120 150 130 180 110 210 C100 240 150 250 170 262 C190 276 210 286 232 296', 8, G), tube('M340 110 C360 150 350 180 370 210 C380 240 330 250 310 262 C290 276 270 286 248 296', 8, G),
    tube('M170 214 C176 250 210 276 228 292', 4, B), tube('M310 214 C304 250 270 276 252 292', 4, B),
    S.ellipse(240, 262, 15, 11, { c: BL, fill: BL, fop: 0.2, sw: 1.4 }), S.ellipse(240, 304, 20, 12, { c: B, fill: B, fop: 0.3, sw: 1.5 }),
    sideLabels([['Ovary (with ova)', 336, 78], ['Kidney', 306, 160], ['Oviduct', 374, 200], ['Ureter', 300, 236], ['Cloaca', 260, 306]], 410, 'r', true, 34, 50),
    sideLabels([['Oviduct', 124, 160], ['Urinary bladder', 226, 264]], 100, 'l', true, 100, 140),
  ].join(''),
);

// 7. Brain, dorsal view
export const BRAIN = svgDoc(
  520,
  320,
  'Dorsal view of the brain of a frog. In the forebrain are two small olfactory lobes at the front, two cerebral hemispheres and an unpaired diencephalon. The midbrain has a pair of rounded optic lobes. The hindbrain has a small band-like cerebellum and the medulla oblongata, which passes out through the foramen magnum and continues as the spinal cord',
  [
    S.ellipse(215, 40, 10, 16, { c: G, fill: G, fop: 0.3, sw: 1.5 }), S.ellipse(255, 40, 10, 16, { c: G, fill: G, fop: 0.3, sw: 1.5 }),
    S.ellipse(212, 92, 22, 36, { c: G, fill: G, fop: 0.25, sw: 1.6 }), S.ellipse(258, 92, 22, 36, { c: G, fill: G, fop: 0.25, sw: 1.6 }),
    S.rect(214, 130, 42, 20, { c: Y, fill: Y, fop: 0.3, sw: 1.5, rx: 4 }),
    dot(212, 178, 17, { c: R, fill: R, fop: 0.25, sw: 1.6 }), dot(258, 178, 17, { c: R, fill: R, fop: 0.25, sw: 1.6 }),
    S.rect(208, 200, 54, 12, { c: B, fill: B, fop: 0.3, sw: 1.5, rx: 5 }),
    S.path('M206 214 C210 240 224 252 235 262 C246 252 260 240 264 214 Z', { c: BL, fill: BL, fop: 0.22, w: 1.6 }),
    S.line(235, 262, 235, 312, { c: M, w: 8 }),
    sideLabels([['Olfactory lobe', 262, 36], ['Cerebral hemisphere', 280, 88], ['Diencephalon', 256, 140], ['Optic lobe', 274, 176], ['Cerebellum', 262, 206], ['Medulla oblongata', 258, 236], ['Spinal cord', 238, 296]], 330, 'r', true, 30, 30),
    S.path('M170 20 L164 20 L164 154 L170 154', { c: M, w: 1.2 }), lab(158, 90, 'Forebrain', { a: 'end', size: 11 }),
    S.path('M170 160 L164 160 L164 196 L170 196', { c: M, w: 1.2 }), lab(158, 182, 'Midbrain', { a: 'end', size: 11 }),
    S.path('M170 200 L164 200 L164 268 L170 268', { c: M, w: 1.2 }), lab(158, 238, 'Hindbrain', { a: 'end', size: 11 }),
  ].join(''),
);

export const ALL = { FROG_EXT, FROG_EXT_LETTERED, SEX, ALIMENTARY, ALIMENTARY_LETTERED, BREATHING, HEART, UROGENITAL_MALE, UROGENITAL_FEMALE, BRAIN };
