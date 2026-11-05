// SVG diagrams for ICSE 9 Biology ch10 Teeth and the Digestive System. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. a tooth in section (named and lettered A-E)
function tooth(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const outline = 'M190 150 C178 110 182 56 215 52 C235 49 265 49 285 52 C318 56 322 110 310 150 C306 195 284 252 258 282 C252 290 248 290 242 282 C216 252 194 195 190 150 Z';
  // jaw bone and gums
  p.push(S.rect(120, 205, 260, 110, { fill: MUTED, fop: 0.22, sw: 1.2 }));
  p.push(S.path('M120 140 C150 136 180 140 191 148 L196 205 L120 205 Z', { c: GREEN, fill: GREEN, fop: 0.3, w: 1.4 }));
  p.push(S.path('M380 140 C350 136 320 140 309 148 L304 205 L380 205 Z', { c: GREEN, fill: GREEN, fop: 0.3, w: 1.4 }));
  // tooth body (dentine), enamel cap, cement, pulp cavity
  p.push(S.path(outline, { c: 'currentColor', w: 1.6, fill: FILL, fop: 1 }));
  p.push(S.path(outline, { c: 'currentColor', w: 0, fill: YEL, fop: 0.22 }));
  p.push(S.path('M190 150 C178 110 182 56 215 52 C235 49 265 49 285 52 C318 56 322 110 310 150', { c: BLUE, w: 7, op: 0.75 }));
  p.push(S.path('M310 152 C306 195 284 252 258 282 C252 290 248 290 242 282 C216 252 194 195 190 152', { c: BROWN, w: 5, op: 0.7 }));
  p.push(S.path('M222 150 C220 110 228 90 250 88 C272 90 280 110 278 150 C276 200 262 248 250 268 C238 248 224 200 222 150 Z', { c: RED, w: 1.4, fill: RED, fop: 0.22 }));
  p.push(S.line(245, 160, 248, 300, { c: RED, w: 1.6 }), S.line(255, 160, 252, 300, { c: 'currentColor', w: 1.4 }));
  // neck line
  p.push(S.line(186, 150, 314, 150, { c: MUTED, w: 1, dash: '4 3' }));
  if (!lettered) {
    // left labels
    p.push(S.text(112, 62, 'Enamel', { a: 'end', ...o }), S.lead(116, 60, 184, 84));
    p.push(S.text(112, 104, 'Dentine', { a: 'end', ...o }), S.lead(116, 102, 200, 124));
    p.push(S.text(112, 144, 'Pulp cavity', { a: 'end', ...o }), S.lead(116, 142, 232, 142));
    p.push(S.text(112, 186, 'Gum', { a: 'end', ...o }), S.lead(116, 184, 160, 172));
    p.push(S.text(112, 238, 'Cement', { a: 'end', ...o }), S.lead(116, 236, 210, 236));
    p.push(S.text(112, 292, 'Jaw bone', { a: 'end', ...o }), S.lead(116, 290, 170, 288));
    // right labels
    p.push(S.text(396, 94, 'Crown', o), S.lead(392, 92, 300, 92));
    p.push(S.text(396, 154, 'Neck', o), S.lead(392, 152, 312, 150));
    p.push(S.text(396, 226, 'Root', o), S.lead(392, 224, 290, 224));
    p.push(S.lines(396, 292, ['Blood vessels', 'and nerves'], { ...o, dy: 13 }), S.lead(392, 290, 254, 292));
  } else {
    p.push(S.text(150, 64, 'A', { a: 'end', ...o }), S.lead(154, 62, 184, 84));
    p.push(S.text(150, 112, 'B', { a: 'end', ...o }), S.lead(154, 108, 204, 124));
    p.push(S.text(400, 144, 'C', o), S.lead(396, 140, 262, 140));
    p.push(S.text(112, 240, 'D', { a: 'end', ...o }), S.lead(116, 236, 210, 236));
    p.push(S.text(112, 182, 'E', { a: 'end', ...o }), S.lead(116, 178, 170, 172));
  }
  const name = lettered
    ? 'A tooth in vertical section with parts lettered: A the hard white covering of the crown, B the bony yellowish tissue that forms most of the tooth, C the central cavity holding blood vessels and nerves, D the thin layer covering the root, E the soft tissue around the neck'
    : 'A tooth in vertical section: enamel covering the crown, dentine below it, a central pulp cavity with blood vessels and nerves, cement around the root, gum around the neck and the jaw bone holding the root; crown, neck and root marked';
  return svgDoc(540, 330, name, p.join(''));
}
export const TOOTH = tooth(false);
export const TOOTH_LETTERED = tooth(true);

// ---------------------------------------------------------------- 2. the human digestive system (named and lettered A-E)
function digestive(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const tube = (d, w, c, op = 0.55) => S.path(d, { c, w, op, cap: 'round', join: 'round' });
  // mouth, salivary gland, food pipe
  p.push(S.ellipse(272, 40, 36, 20, { fill: RED, fop: 0.2, sw: 1.6 }));
  p.push(S.ellipse(218, 62, 17, 11, { fill: YEL, fop: 0.45, sw: 1.4 }));
  p.push(tube('M272 60 L272 176', 12, BROWN));
  // liver and gall bladder
  p.push(S.path('M112 182 C140 164 205 164 238 170 C240 195 232 222 200 234 C160 244 124 226 112 182 Z', { c: BROWN, w: 1.6, fill: BROWN, fop: 0.35 }));
  p.push(S.ellipse(214, 248, 8, 13, { c: GREEN, fill: GREEN, fop: 0.5, sw: 1.4 }));
  // stomach
  p.push(S.path('M262 168 C240 174 244 234 288 254 C326 268 358 252 358 230 C358 216 344 214 334 222 C312 234 298 216 298 198 C298 184 294 172 284 168 Z', { c: GREEN, w: 1.8, fill: GREEN, fop: 0.25 }));
  // pancreas
  p.push(S.path('M290 286 C322 278 366 278 394 290 C384 304 330 304 290 298 Z', { c: BROWN, w: 1.4, fill: YEL, fop: 0.5 }));
  // large intestine (frame) and rectum, anus
  p.push(tube('M196 436 L196 324 C196 320 200 320 204 320 L384 320 C390 320 392 324 392 328 L392 420 C392 446 360 452 330 458 C300 464 292 470 292 486', 15, BROWN, 0.5));
  p.push(S.circle(292, 494, 6, { c: BROWN, fill: BROWN, fop: 0.5, sw: 1.4 }));
  // small intestine coil
  p.push(tube('M350 246 C380 256 380 300 364 338 L250 340 C228 344 228 362 250 366 L350 366 C372 370 372 388 350 392 L250 394 C230 398 230 414 250 418 L330 418 C340 420 342 428 330 430 L206 432', 9, RED, 0.75));
  if (!lettered) {
    p.push(S.text(196, 58, 'Salivary gland', { a: 'end', ...o }), S.lead(200, 58, 202, 62));
    p.push(S.text(424, 36, 'Mouth', o), S.lead(420, 35, 308, 38));
    p.push(S.text(424, 112, 'Oesophagus', o), S.lead(420, 110, 280, 110));
    p.push(S.text(424, 212, 'Stomach', o), S.lead(420, 210, 340, 216));
    p.push(S.text(424, 276, 'Pancreas', o), S.lead(420, 275, 380, 285));
    p.push(S.text(100, 206, 'Liver', { a: 'end', ...o }), S.lead(104, 205, 150, 205));
    p.push(S.text(176, 262, 'Gall bladder', { a: 'end', ...o }), S.lead(180, 262, 204, 252));
    p.push(S.text(424, 384, 'Small intestine', o), S.lead(420, 382, 372, 382));
    p.push(S.text(424, 344, 'Large intestine', o), S.lead(420, 342, 400, 338));
    p.push(S.text(318, 498, 'Anus', o), S.lead(314, 496, 300, 494));
    p.push(S.text(352, 474, 'Rectum', o), S.lead(348, 472, 316, 462));
  } else {
    p.push(S.text(176, 62, 'A', { a: 'end', ...o }), S.lead(180, 60, 202, 62));
    p.push(S.text(100, 206, 'B', { a: 'end', ...o }), S.lead(104, 204, 150, 205));
    p.push(S.text(424, 212, 'C', o), S.lead(420, 208, 340, 216));
    p.push(S.text(424, 290, 'D', o), S.lead(420, 286, 386, 292));
    p.push(S.text(424, 384, 'E', o), S.lead(420, 380, 372, 382));
  }
  const name = lettered
    ? 'The human digestive system from the front with organs lettered: A the gland that opens into the mouth, B the large brown gland on the right of the body, C the bag that receives food from the food pipe, D the gland lying below the stomach, E the long coiled tube between the stomach and the large intestine'
    : 'The human digestive system from the front: mouth with a salivary gland, oesophagus, liver with gall bladder, stomach, pancreas, the coiled small intestine, the large intestine with rectum and anus';
  return svgDoc(560, 510, name, p.join(''));
}
export const DIGESTIVE = digestive(false);
export const DIGESTIVE_LETTERED = digestive(true);

// ---------------------------------------------------------------- 3. one villus of the small intestine (named and lettered A-E)
function villus(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // intestinal wall, muscle layer
  p.push(S.rect(50, 270, 420, 62, { fill: MUTED, fop: 0.2, sw: 1.2 }));
  // neighbouring villi (faint) and glands between villi
  p.push(S.path('M70 270 L70 150 C70 120 120 120 120 150 L120 270', { c: MUTED, w: 1.6, fill: FILL, fop: 1 }));
  p.push(S.path('M360 270 L360 150 C360 120 410 120 410 150 L410 270', { c: MUTED, w: 1.6, fill: FILL, fop: 1 }));
  p.push(S.path('M150 270 L150 296 L170 296 L170 270', { c: MUTED, w: 1.4, fill: FILL, fop: 1 }));
  p.push(S.path('M310 270 L310 296 L330 296 L330 270', { c: MUTED, w: 1.4, fill: FILL, fop: 1 }));
  // main villus: one-cell thick wall (dashed thick line shows the cells), lacteal and capillaries
  p.push(S.path('M190 272 L190 100 C190 52 290 52 290 100 L290 272 Z', { c: 'currentColor', w: 1.4, fill: FILL, fop: 1 }));
  p.push(S.path('M190 272 L190 100 C190 52 290 52 290 100 L290 272', { c: BROWN, w: 6, dash: '9 2', op: 0.7 }));
  p.push(S.path('M240 312 L240 86 C240 78 240 78 240 86', { c: YEL, w: 13, cap: 'round', op: 0.85 }));
  const loop = (m) => {
    const x = (v) => (m ? 480 - v : v);
    return S.path(`M${x(210)} 272 C${x(204)} 232 ${x(216)} 204 ${x(210)} 172 C${x(206)} 142 ${x(216)} 122 ${x(222)} 108 C${x(230)} 122 ${x(224)} 142 ${x(226)} 172 C${x(230)} 204 ${x(222)} 232 ${x(228)} 272`, { c: RED, w: 2.6 });
  };
  p.push(loop(false), loop(true));
  p.push(S.line(210, 272, 210, 312, { c: RED, w: 3 }), S.line(270, 272, 270, 312, { c: BLUE, w: 3 }));
  // arrows for absorbed food
  p.push(S.arrow(150, 190, 204, 190, { size: 7 }), S.arrow(330, 190, 276, 190, { size: 7, c: 'currentColor' }));
  if (!lettered) {
    p.push(S.lines(20, 98, ['Glucose and', 'amino acids'], { ...o, dy: 13 }));
    p.push(S.lines(336, 98, ['Fatty acids and', 'glycerol'], { ...o, dy: 13 }));
    p.push(S.text(240, 28, 'Epithelium (one cell thick)', { a: 'middle', ...o }), S.lead(240, 33, 240, 54));
    p.push(S.text(16, 232, 'Capillary network', o), S.lead(112, 230, 208, 230));
    p.push(S.text(376, 232, 'Lacteal', o), S.lead(374, 230, 246, 230));
    p.push(S.text(16, 322, 'Intestinal gland', o), S.lead(96, 316, 148, 292));
    p.push(S.text(376, 322, 'Muscle layer', o), S.lead(372, 320, 340, 312));
  } else {
    p.push(S.text(230, 28, 'A', { a: 'middle', ...o }), S.lead(240, 33, 240, 54));
    p.push(S.text(40, 232, 'B', o), S.lead(60, 228, 208, 230));
    p.push(S.text(430, 232, 'C', o), S.lead(426, 228, 246, 230));
    p.push(S.text(56, 324, 'D', o), S.lead(72, 318, 148, 292));
    p.push(S.text(430, 324, 'E', o), S.lead(426, 320, 340, 312));
  }
  const name = lettered
    ? 'One villus of the small intestine with parts lettered: A the thin outer covering one cell thick, B the network of blood vessels inside, C the central lymph tube, D the small pit between villi, E the layer at the base of the wall that squeezes the food along'
    : 'One finger-shaped villus of the small intestine: a surface layer one cell thick, a network of blood capillaries and a central lacteal; arrows show glucose and amino acids entering the capillaries and fatty acids and glycerol entering the lacteal; intestinal glands and the muscle layer lie at the base';
  return svgDoc(520, 340, name, p.join(''));
}
export const VILLUS = villus(false);
export const VILLUS_LETTERED = villus(true);
