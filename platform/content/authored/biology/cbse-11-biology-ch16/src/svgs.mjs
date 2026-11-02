// SVG diagrams for ch16 Excretory Products and their Elimination (allow-listed elements, palette colours only).
// Organs are labelled schematics (front view, the person's right on the viewer's left), not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { KIDNEY, N } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (deg) => (deg * Math.PI) / 180;

/** Bean outline: an ellipse (rx, ry) whose hilum notch at (hx, hy) faces +x (side = 1) or -x (side = -1). */
const bean = (hx, hy, rx, ry, side = 1) => {
  const cx = hx - side * rx * 0.7;
  const pts = [];
  for (let a = 30; a <= 330; a += 5) pts.push([cx + side * rx * Math.cos(rad(a)), hy + ry * Math.sin(rad(a))]);
  const B = pts[0], T = pts[pts.length - 1];
  return `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')} C${f1(T[0] - side * 6)} ${f1(hy - ry * 0.25)} ${f1(hx)} ${f1(hy - 18)} ${f1(hx)} ${f1(hy)} C${f1(hx)} ${f1(hy + 18)} ${f1(B[0] - side * 6)} ${f1(hy + ry * 0.25)} ${f1(B[0])} ${f1(B[1])} Z`;
};

// 1. Human excretory (urinary) system, front view
const KR = { hx: 160, hy: 132 }; // viewer's left = person's right kidney (slightly lower)
const KL = { hx: 300, hy: 122 };
export const URINARY = svgDoc(
  480,
  380,
  'Human excretory system, front view, schematic: a pair of bean-shaped kidneys high on the back wall of the abdomen; a renal artery from the aorta and a renal vein to the inferior vena cava at the hilum of each kidney; a ureter from each kidney down to the urinary bladder; and the urethra leading out from the bladder',
  [
    // renal vessels
    S.line(KR.hx + 4, KR.hy - 12, 250, KR.hy - 12, { c: RED, w: 3 }),
    S.line(KR.hx + 4, KR.hy + 2, 208, KR.hy + 2, { c: BLUE, w: 3 }),
    S.line(256, KL.hy - 12, KL.hx - 4, KL.hy - 12, { c: RED, w: 3 }),
    S.line(220, KL.hy + 2, KL.hx - 4, KL.hy + 2, { c: BLUE, w: 3 }),
    S.line(214, 14, 214, 300, { c: BLUE, w: 12 }), S.line(214, 14, 214, 300, { c: 'var(--diagram-fill)', w: 7 }),
    S.line(250, 14, 250, 300, { c: RED, w: 12 }), S.line(250, 14, 250, 300, { c: 'var(--diagram-fill)', w: 7 }),
    S.path(bean(KR.hx, KR.hy, 46, 64, 1), { fill: BROWN, fop: 0.35, w: 1.8 }),
    S.path(bean(KL.hx, KL.hy, 46, 64, -1), { fill: BROWN, fop: 0.35, w: 1.8 }),
    // ureters
    S.path(`M${KR.hx + 2} ${KR.hy + 14} C${KR.hx + 20} 210 196 260 214 302`, { c: YEL, w: 4 }),
    S.path(`M${KL.hx - 2} ${KL.hy + 14} C${KL.hx - 20} 210 268 260 250 302`, { c: YEL, w: 4 }),
    // bladder and urethra
    S.ellipse(232, 322, 46, 30, { fill: YEL, fop: 0.3, sw: 1.8 }),
    S.rect(227, 350, 10, 26, { fill: YEL, fop: 0.3, sw: 1.5 }),
    lab(4, 50, 'Kidney'), S.lead(42, 54, 110, 90),
    lab(4, 112, 'Renal artery', { c: RED }), S.lead(74, 115, 180, 120),
    lab(4, 156, 'Renal vein', { c: BLUE }), S.lead(64, 153, 186, 135),
    lab(4, 236, 'Ureter'), S.lead(42, 233, 186, 222),
    lab(4, 326, 'Urinary bladder'), S.lead(94, 322, 188, 322),
    lab(4, 368, 'Urethra'), S.lead(50, 365, 226, 365),
    lab(476, 30, 'Inferior vena cava', { a: 'end', c: BLUE }), S.lead(374, 34, 220, 46),
    lab(476, 60, 'Aorta', { a: 'end', c: RED }), S.lead(440, 57, 256, 70),
    lab(476, 210, 'Hilum: renal vessels', { a: 'end' }), lab(476, 223, 'and ureter join the kidney', { a: 'end' }), S.lead(360, 205, KL.hx + 6, KL.hy + 4),
  ].join(''),
);

// 2. Longitudinal section of a kidney
const P = { x: 340, y: 172 }; // hilum
const RX = 128, RY = 152;
const C = { x: P.x - 0.7 * RX, y: P.y }; // centre of the outline ellipse
const at = (deg, f) => [C.x + RX * f * Math.cos(rad(deg)), C.y + RY * f * Math.sin(rad(deg))];
const toward = (pt, k) => [P.x + (pt[0] - P.x) * k, P.y + (pt[1] - P.y) * k];
const PYR = [105, 142, 180, 218, 255];
const pyramid = (deg) => {
  const b1 = at(deg - 11, 0.8), b2 = at(deg + 11, 0.8), mid = at(deg, 0.86);
  const a = toward(at(deg, 0.8), 0.32);
  return S.path(`M${f1(a[0])} ${f1(a[1])} L${f1(b1[0])} ${f1(b1[1])} Q${f1(mid[0])} ${f1(mid[1])} ${f1(b2[0])} ${f1(b2[1])} Z`, { fill: RED, fop: 0.3, w: 1.2 });
};
const cup = (deg) => toward(at(deg, 0.8), 0.4);
const pelvis = `M${f1(P.x + 8)} ${f1(P.y - 18)} L${PYR.map((d) => cup(d)).map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')} L${f1(P.x + 8)} ${f1(P.y + 18)} Z`;
export const KIDNEYLS = svgDoc(
  560,
  340,
  'Longitudinal section of a human kidney, schematic: an outer tough capsule; an outer cortex and an inner medulla; the medulla divided into conical medullary pyramids projecting into the calyces; the cortex extending between the pyramids as the columns of Bertini; calyces opening into the funnel-shaped renal pelvis; the ureter leaving the pelvis at the hilum, where the renal artery and renal vein also enter and leave',
  [
    S.path(bean(P.x, P.y, RX, RY, 1), { fill: BROWN, fop: 0.22, w: 3 }),
    ...PYR.map(pyramid),
    S.path(pelvis, { fill: 'var(--diagram-fill)', c: YEL, w: 2 }),
    S.path(`M${P.x + 10} ${P.y + 18} C${P.x + 60} ${P.y + 30} ${P.x + 76} ${P.y + 70} ${P.x + 76} ${P.y + 160}`, { c: YEL, w: 7 }),
    S.line(P.x + 6, P.y - 30, P.x + 150, P.y - 30, { c: RED, w: 4 }),
    S.line(P.x + 6, P.y - 14, P.x + 150, P.y - 14, { c: BLUE, w: 4 }),
    lab(4, 30, 'Capsule'), S.lead(52, 27, at(232, 1)[0], at(232, 1)[1]),
    lab(4, 78, 'Cortex'), S.lead(44, 75, at(200, 0.9)[0], at(200, 0.9)[1]),
    lab(4, 140, 'Medullary pyramid', { c: RED }), lab(4, 153, '(medulla)', { c: RED }), S.lead(108, 140, at(180, 0.62)[0], at(180, 0.62)[1]),
    lab(4, 222, 'Column of Bertini'), S.lead(102, 222, at(161, 0.62)[0], at(161, 0.62)[1]),
    lab(4, 300, 'Calyx'), S.lead(36, 297, cup(105)[0], cup(105)[1]),
    lab(556, 112, 'Renal artery', { a: 'end', c: RED }), S.lead(486, 116, P.x + 120, P.y - 30),
    lab(556, 172, 'Renal vein', { a: 'end', c: BLUE }), S.lead(494, 168, P.x + 120, P.y - 14),
    lab(556, 230, 'Renal pelvis', { a: 'end' }), S.lead(484, 226, P.x - 14, P.y + 10),
    lab(556, 270, 'Hilum', { a: 'end' }), S.lead(520, 266, P.x + 8, P.y + 6),
    lab(556, 318, 'Ureter', { a: 'end', c: BROWN }), S.lead(516, 314, P.x + 80, P.y + 130),
  ].join(''),
);

// 3. Nephron with its blood vessels
const CM = 176; // cortex–medulla boundary
export const NEPHRON = svgDoc(
  540,
  390,
  'A nephron with its blood vessels, schematic. In the cortex: the afferent arteriole, a branch of the renal artery, forms the glomerulus inside the cup-shaped Bowman’s capsule (together the Malpighian body); the efferent arteriole leaves it and forms peritubular capillaries around the tubule; the highly coiled proximal convoluted tubule leads to the hairpin Henle’s loop, whose descending and ascending limbs dip into the medulla beside the U-shaped vasa recta; the ascending limb continues as the distal convoluted tubule, which opens into a collecting duct running down through the medulla towards the renal pelvis',
  [
    S.rect(110, 10, 360, CM - 10, { fill: BROWN, fop: 0.08, sw: 0 }),
    S.rect(110, CM, 360, 372 - CM, { fill: RED, fop: 0.08, sw: 0 }),
    S.line(110, CM, 470, CM, { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }),
    lab(466, CM - 6, 'Cortex', { a: 'end', size: 10, c: 'var(--diagram-muted)' }),
    lab(466, CM + 14, 'Medulla', { a: 'end', size: 10, c: 'var(--diagram-muted)' }),
    // vasa recta (behind the loop)
    S.path('M206 110 L206 352 C206 372 300 372 300 352 L300 140', { c: RED, w: 2, dash: '6 3' }),
    // afferent arteriole and glomerulus
    S.line(120, 72, 160, 82, { c: RED, w: 4 }),
    S.path('M166 82 C160 66 182 60 186 74 C196 62 206 80 194 88 C206 96 190 108 182 98 C176 110 158 100 166 92 C154 90 156 82 166 82 Z', { fill: RED, fop: 0.35, c: RED, w: 1.5 }),
    S.path('M168 98 C150 110 140 126 140 150', { c: RED, w: 3 }),
    // Bowman's capsule
    S.path('M168 62 C186 44 218 50 222 84 C224 112 194 126 170 108', { c: YEL, w: 3 }),
    S.path('M164 54 C188 32 230 42 232 84 C234 122 196 138 162 116', { c: YEL, w: 3 }),
    // PCT (coiled), then descending limb, loop, ascending limb, DCT, collecting duct
    S.path('M232 84 C252 72 252 40 272 40 C292 40 292 70 272 74 C254 78 252 100 272 104 C290 108 272 126 252 128 C238 130 230 140 230 160 L230 345 C230 362 270 362 270 345 L270 150 C270 132 292 128 300 112 C308 96 330 92 340 104 C350 118 368 112 368 96 C368 80 352 74 360 60 C368 48 392 50 400 62', { c: YEL, w: 5, join: 'round' }),
    S.line(400, 40, 400, 378, { c: YEL, w: 7 }),
    // peritubular capillaries around the convoluted tubules
    S.path('M140 150 C150 170 190 168 196 150 C204 128 246 150 250 130 C256 110 296 118 300 140', { c: RED, w: 1.2, dash: '3 2' }),
    S.path('M300 140 C320 150 352 140 360 126 C370 112 390 120 392 108', { c: BLUE, w: 1.2, dash: '3 2' }),
    lab(4, 66, 'Afferent arteriole', { c: RED }), S.lead(104, 70, 124, 73),
    lab(4, 98, 'Glomerulus', { c: RED }), S.lead(66, 95, 168, 86),
    lab(4, 132, 'Efferent arteriole', { c: RED }), S.lead(100, 130, 150, 116),
    lab(4, 172, 'Peritubular', { c: RED }), lab(4, 185, 'capillaries', { c: RED }), S.lead(68, 176, 160, 160),
    lab(4, 260, 'Descending limb', { c: BROWN }), lab(4, 273, 'of Henle’s loop', { c: BROWN }), S.lead(94, 262, 228, 262),
    lab(4, 352, 'Vasa recta', { c: RED }), S.lead(64, 348, 204, 330),
    lab(170, 24, 'Bowman’s capsule', { a: 'middle', c: BROWN }), S.lead(180, 28, 196, 46),
    lab(270, 24, 'PCT', { a: 'middle', c: BROWN }), S.lead(274, 28, 274, 38),
    lab(536, 70, 'DCT', { a: 'end', c: BROWN }), S.lead(512, 67, 372, 92),
    lab(536, 230, 'Ascending limb', { a: 'end', c: BROWN }), lab(536, 243, 'of Henle’s loop', { a: 'end', c: BROWN }), S.lead(452, 234, 272, 230),
    lab(536, 300, 'Collecting duct', { a: 'end', c: BROWN }), S.lead(452, 297, 404, 300),
    lab(536, 378, 'to renal pelvis', { a: 'end', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Counter-current mechanism: Henle's loop, vasa recta and the medullary osmolarity gradient
const Y0 = 50, Y3 = 300; // depths of the 300 and 1200 levels
const yAt = (i) => Y0 + (i * (Y3 - Y0)) / 3;
const band = (i) => S.rect(70, yAt(i) - 42, 400, 84, { fill: YEL, fop: 0.06 + i * 0.09, sw: 0 });
export const COUNTER = svgDoc(
  540,
  380,
  `Counter-current mechanism, schematic. The osmolarity of the medullary interstitial fluid rises from about ${KIDNEY.osm.cortex} milliosmoles per litre in the cortex to about ${KIDNEY.osm.inner} in the inner medulla (levels ${N.osmLevels.join(', ')}). Filtrate flows down the descending limb of Henle’s loop, which is permeable to water but almost impermeable to electrolytes, so water leaves and the filtrate becomes concentrated; it flows up the ascending limb, which is impermeable to water but transports sodium chloride out, so the filtrate becomes dilute. Sodium chloride from the ascending limb is taken up by the descending limb of the vasa recta and returned to the interstitium by its ascending limb. Small amounts of urea leave the collecting duct into the interstitium and enter the thin ascending limb. Water leaves the collecting duct into the concentrated medulla, concentrating the urine`,
  [
    ...[0, 1, 2, 3].map(band),
    S.line(70, 8, 70, 360, { c: 'var(--diagram-muted)', w: 1 }),
    ...N.osmLevels.map((v, i) => lab(64, yAt(i) + 4, String(v), { a: 'end', w: 'bold' })),
    lab(4, 20, 'mOsmol per L', { size: 10, c: 'var(--diagram-muted)' }),
    lab(4, 352, 'inner', { size: 10, c: 'var(--diagram-muted)' }), lab(4, 364, 'medulla', { size: 10, c: 'var(--diagram-muted)' }),
    // Henle's loop
    S.path(`M150 14 L150 ${Y3 + 20} C150 ${Y3 + 52} 210 ${Y3 + 52} 210 ${Y3 + 20} L210 14`, { c: YEL, w: 9, join: 'round' }),
    S.arrow(130, 40, 130, 90, { size: 6 }), S.arrow(230, 90, 230, 40, { size: 6 }),
    // vasa recta
    S.path(`M300 14 L300 ${Y3 + 24} C300 ${Y3 + 50} 350 ${Y3 + 50} 350 ${Y3 + 24} L350 14`, { c: RED, w: 4 }),
    S.arrow(286, 40, 286, 90, { size: 6, c: RED }), S.arrow(364, 90, 364, 40, { size: 6, c: RED }),
    // collecting duct
    S.line(440, 14, 440, 360, { c: YEL, w: 9 }),
    S.arrow(456, 60, 456, 110, { size: 6 }),
    // exchanges
    S.arrow(144, 150, 104, 150, { c: BLUE, size: 6 }), lab(100, 146, 'water', { a: 'end', size: 10, c: BLUE }),
    S.arrow(216, 200, 258, 200, { c: BROWN, size: 6 }), lab(222, 194, 'NaCl', { size: 10, c: BROWN }),
    S.arrow(262, 220, 294, 220, { c: BROWN, size: 6 }),
    S.arrow(356, 180, 392, 180, { c: BROWN, size: 6 }), lab(360, 174, 'NaCl', { size: 10, c: BROWN }),
    S.arrow(434, 240, 396, 240, { c: BLUE, size: 6 }), lab(404, 256, 'water', { size: 10, c: BLUE }),
    S.arrow(434, 290, 396, 290, { c: 'var(--diagram-green)', size: 6 }), lab(396, 306, 'urea', { size: 10, c: 'var(--diagram-green)' }),
    S.arrow(262, 270, 216, 270, { c: 'var(--diagram-green)', size: 6 }), lab(224, 286, 'urea', { size: 10, c: 'var(--diagram-green)' }),
    lab(180, 372, 'Henle’s loop', { a: 'middle', w: 'bold' }),
    lab(325, 372, 'Vasa recta', { a: 'middle', w: 'bold', c: RED }),
    lab(536, 372, 'Collecting duct', { a: 'end', w: 'bold' }),
    lab(474, 80, 'urine', { size: 10 }), lab(474, 92, 'becomes', { size: 10 }), lab(474, 104, 'concentrated', { size: 10 }),
  ].join(''),
);

export const ALL = { URINARY, KIDNEYLS, NEPHRON, COUNTER };
