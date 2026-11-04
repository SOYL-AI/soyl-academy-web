// SVG diagrams for ISC 11 Biology ch18 Excretory Products and Their Elimination. Osmolarity values come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { GRAD, FOLD, DIAL } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const f1 = (n) => Math.round(n * 10) / 10;
/** Shifts the absolute coordinate pairs of a path string. */
const shift = (d, dx) => {
  let k = 0;
  return d.replace(/-?\d+\.?\d*/g, (m) => (k++ % 2 === 0 ? String(f1(Number(m) + dx)) : m));
};

// ---------------------------------------------------------------- 1. Longitudinal section of a kidney (labelled and lettered)
function kidney(letters) {
  const OX = 150;
  const X = (x) => x + OX;
  const o = [];
  const outline = 'M230 45 C120 45 60 130 60 200 C60 275 120 345 230 345 C290 345 310 320 305 295 C300 275 270 262 270 240 L270 160 C270 138 300 125 305 105 C310 75 290 45 230 45 Z';
  o.push(S.path(shift(outline, OX), { fill: 'var(--diagram-yellow)', fop: 0.25, w: 3 }));
  // capsule drawn as a second, thin outline just inside the edge is implied by the heavy line
  const cx = 205;
  const cy = 200;
  const pyr = [];
  [55, 100, 150, 210, 260, 305].forEach((deg) => {
    const a = (deg * Math.PI) / 180;
    const p = (r, d) => [X(cx + r * Math.cos(a + (d * Math.PI) / 180)), cy + r * Math.sin(a + (d * Math.PI) / 180)];
    const apex = p(46, 0);
    const b1 = p(112, -15);
    const b2 = p(112, 15);
    pyr.push({ apex, mid: p(80, 0) });
    o.push(`<polygon points="${f1(apex[0])},${f1(apex[1])} ${f1(b1[0])},${f1(b1[1])} ${f1(b2[0])},${f1(b2[1])}" fill="var(--diagram-red)" fill-opacity="0.28" stroke="currentColor" stroke-width="1.4"/>`);
  });
  // pelvis and calyces
  o.push(S.ellipse(X(256), 200, 20, 32, { fill: 'var(--diagram-fill)', sw: 1.5 }));
  for (const { apex } of pyr) o.push(S.line(apex[0], apex[1], X(256), 200, { w: 4, c: 'var(--diagram-muted)' }));
  // ureter and blood vessels at the hilum
  o.push(S.path(shift('M258 205 L300 232 L330 280 L330 340', OX), { w: 8, c: 'var(--diagram-yellow)', op: 0.9 }));
  o.push(S.path(shift('M278 158 L362 126', OX), { w: 7, c: 'var(--diagram-red)', op: 0.55 }), S.path(shift('M282 174 L362 158', OX), { w: 7, c: 'var(--diagram-blue)', op: 0.55 }));
  const R = X(372);
  const left = (t, y, tx, ty) => o.push(S.lead(130, y - 4, tx, ty), lab(8, y, t));
  const right = (t, y, tx, ty) => o.push(S.lead(R - 6, y - 4, tx, ty), lab(R, y, t));
  const colX = (deg, r) => [X(cx + r * Math.cos((deg * Math.PI) / 180)), cy + r * Math.sin((deg * Math.PI) / 180)];
  if (!letters) {
    left('Renal capsule', 60, X(120), 85);
    left('Cortex', 110, X(88), 128);
    left('Renal column', 330, ...colX(127, 88));
    left('Medulla (renal pyramid)', 232, ...pyr[3].mid);
    right('Renal artery', 118, X(358), 128);
    right('Renal vein', 170, X(358), 160);
    right('Hilum', 208, X(288), 214);
    right('Renal pelvis', 252, X(262), 222);
    right('Calyx', 296, ...pyr[1].apex);
    right('Ureter', 360, X(330), 332);
  } else {
    // letters: A renal pelvis, B cortex, C ureter, D renal pyramid, E calyx
    const L = (l, y, tx, ty) => o.push(S.lead(R - 6, y - 4, tx, ty), tag(R + 8, y - 4, l));
    L('A', 252, X(262), 222);
    o.push(S.lead(130, 106, X(88), 128), tag(140, 106, 'B'));
    L('C', 360, X(330), 332);
    o.push(S.lead(130, 228, ...pyr[3].mid), tag(140, 228, 'D'));
    L('E', 296, ...pyr[1].apex);
  }
  return o.join('');
}
export const KIDNEY = svgDoc(
  600,
  380,
  'Longitudinal section of the human kidney: a tough renal capsule surrounds the kidney; the outer cortex dips between the cone-shaped renal pyramids of the inner medulla as the renal columns; the tips of the pyramids open into calyces that join the funnel-shaped renal pelvis, which leads to the ureter. The renal artery and renal vein and the ureter enter or leave at the notch called the hilum',
  kidney(false),
);
export const KIDNEY_Q = svgDoc(
  600,
  380,
  'A longitudinal section of a kidney with five parts marked A to E: A the funnel-shaped cavity at the hilum, B the outer region, C the tube leaving the kidney, D a cone-shaped inner mass, and E a small cup around the tip of a cone',
  kidney(true),
);

// ---------------------------------------------------------------- 2. Nephron with its blood supply (labelled and lettered)
function nephron(letters) {
  const T = 20;
  const X = (x) => x + T;
  const o = [];
  o.push(S.line(20, 205, 570, 205, { dash: '5 4', c: 'var(--diagram-muted)', w: 1 }), sm(520, 198, 'Cortex', { a: 'end', c: 'var(--diagram-muted)' }), sm(520, 220, 'Medulla', { a: 'end', c: 'var(--diagram-muted)' }));
  // blood vessels
  o.push(S.line(X(150), 70, X(186), 94, { w: 6, c: 'var(--diagram-red)' }), S.line(X(236), 90, X(262), 62, { w: 3, c: 'var(--diagram-red)' }));
  o.push(S.path(`M${X(262)} 62 C${X(296)} 100 ${X(300)} 150 ${X(262)} 196`, { c: 'var(--diagram-red)', w: 1.5, dash: '3 3' }), S.path(`M${X(222)} 150 C${X(240)} 160 ${X(240)} 190 ${X(222)} 200`, { c: 'var(--diagram-red)', w: 1.5, dash: '3 3' }));
  o.push(S.path(`M${X(190)} 215 L${X(190)} 358 Q${X(196)} 372 ${X(202)} 358 L${X(202)} 215`, { c: 'var(--diagram-red)', w: 1.8 }));
  // capsule and glomerulus
  o.push(S.circle(X(210), 110, 30, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 2 }), S.circle(X(210), 110, 17, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1.2 }), S.path(`M${X(200)} 106 Q${X(210)} 98 ${X(218)} 108 Q${X(210)} 118 ${X(202)} 114`, { w: 1 }));
  // tubule
  o.push(S.path(`M${X(210)} 140 Q${X(196)} 147 ${X(210)} 154 Q${X(224)} 161 ${X(210)} 168 Q${X(196)} 175 ${X(210)} 182 Q${X(224)} 189 ${X(210)} 196 L${X(210)} 205`, { w: 2.4, c: 'var(--diagram-green)' }));
  o.push(S.path(`M${X(210)} 205 L${X(210)} 370 Q${X(210)} 396 ${X(240)} 396 Q${X(270)} 396 ${X(270)} 370`, { w: 2, c: 'var(--diagram-blue)' }));
  o.push(S.path(`M${X(270)} 370 L${X(270)} 215`, { w: 4.5, c: 'var(--diagram-brown)' }));
  o.push(S.path(`M${X(270)} 215 L${X(270)} 172 Q${X(285)} 160 ${X(300)} 172 Q${X(315)} 184 ${X(330)} 172 Q${X(345)} 160 ${X(360)} 172 L${X(380)} 172`, { w: 2.4, c: 'var(--diagram-yellow)' }));
  o.push(S.path(`M${X(380)} 120 L${X(380)} 372`, { w: 5, c: 'var(--diagram-muted)' }), S.arrow(X(380), 372, X(380), 402, { w: 2.5, c: 'var(--diagram-muted)' }), sm(X(380) + 8, 398, 'to the renal pelvis', { c: 'var(--diagram-muted)' }));
  const left = (t, y, tx, ty, ex = 150) => o.push(S.lead(ex, y - 4, tx, ty), lab(6, y, t));
  const right = (t, y, tx, ty) => o.push(S.lead(436, y - 4, tx, ty), lab(440, y, t));
  if (!letters) {
    left('Afferent arteriole', 62, X(158), 76);
    left('Bowman’s capsule', 118, X(181), 118);
    left('Proximal convoluted tubule', 176, X(197), 168, 160);
    left('Vasa recta', 300, X(190), 300);
    left('Descending limb', 384, X(210), 380, 140);
    right('Efferent arteriole', 58, X(250), 76);
    right('Peritubular capillaries', 108, X(293), 108);
    right('Distal convoluted tubule', 160, X(330) + 8, 170);
    right('Collecting duct', 256, X(380), 256);
    o.push(S.lead(X(297), 296, X(272), 300), sm(X(299), 300, 'Ascending limb', { size: 10 }));
    o.push(S.lead(X(255), 408, X(240), 398), lab(X(262), 418, 'Loop of Henle', { a: 'middle' }));
  } else {
    // letters: A distal convoluted tubule, B descending limb, C proximal convoluted tubule, D collecting duct, E glomerulus
    o.push(S.lead(436, 156, X(330) + 8, 170), tag(446, 156, 'A'));
    o.push(S.lead(140, 380, X(210), 380), tag(130, 380, 'B'));
    o.push(S.lead(160, 172, X(197), 168), tag(150, 172, 'C'));
    o.push(S.lead(436, 252, X(380), 256), tag(446, 252, 'D'));
    o.push(S.lead(150, 112, X(204), 112), tag(140, 112, 'E'));
  }
  return o.join('');
}
export const NEPHRON = svgDoc(
  600,
  430,
  'A nephron and its blood supply. In the cortex, the Bowman’s capsule surrounds the glomerulus, which receives blood from the wide afferent arteriole and is drained by the narrower efferent arteriole; the efferent arteriole forms the peritubular capillaries and the vasa recta. The filtrate passes through the coiled proximal convoluted tubule, then down the descending limb and up the ascending limb of the loop of Henle in the medulla, then through the distal convoluted tubule into the collecting duct, which carries urine to the renal pelvis',
  nephron(false),
);
export const NEPHRON_Q = svgDoc(
  600,
  430,
  'A nephron with five parts marked A to E: A the coiled tubule that joins the collecting duct, B the thin straight limb that goes down into the medulla, C the coiled tubule that starts at the capsule, D the long straight duct that receives urine from several nephrons, and E the knot of capillaries inside the capsule',
  nephron(true),
);

// ---------------------------------------------------------------- 3. Counter-current mechanism
export const COUNTER = svgDoc(
  640,
  400,
  `Counter-current mechanism in a juxtamedullary nephron. The osmolarity of the medullary tissue fluid rises from ${GRAD[0][1]} milliosmoles per litre in the cortex to ${GRAD[3][1]} in the inner medulla. The descending limb of the loop of Henle is permeable to water, which leaves it, so the filtrate becomes more concentrated; the ascending limb lets out salts, so the filtrate becomes dilute. The collecting duct loses water, giving urine up to ${FOLD} times as concentrated as the filtrate. The vasa recta run alongside in the opposite direction and keep the gradient`,
  (() => {
    const o = [];
    const bands = [[70, 120, GRAD[0]], [120, 195, GRAD[1]], [195, 270, GRAD[2]], [270, 345, GRAD[3]]];
    bands.forEach(([y1, y2, [name, v]], i) => {
      o.push(S.rect(120, y1, 450, y2 - y1, { fill: 'var(--diagram-brown)', fop: 0.06 + i * 0.09, sw: 0 }));
      o.push(lab(112, (y1 + y2) / 2 + 4, `${v}`, { a: 'end', w: 'bold' }), sm(112, (y1 + y2) / 2 + 17, name, { a: 'end', c: 'var(--diagram-muted)' }));
    });
    o.push(lab(10, 18, 'Osmolarity of the tissue fluid (mOsmol per L)', { w: 'bold' }));
    // loop of Henle
    o.push(S.path('M240 70 L240 330 Q240 352 290 352 Q340 352 340 330 L340 125', { w: 3, c: 'var(--diagram-blue)' }));
    o.push(S.arrow(240, 78, 240, 104, { w: 2, c: 'var(--diagram-blue)' }), S.arrow(340, 170, 340, 142, { w: 2, c: 'var(--diagram-brown)' }));
    o.push(sm(240, 40, 'Filtrate in', { a: 'middle' }), sm(240, 54, 'Descending limb', { a: 'middle', w: 'bold' }), sm(340, 54, 'Ascending limb', { a: 'middle', w: 'bold' }));
    // water leaves the descending limb, salts leave the ascending limb
    for (const y of [160, 225, 290]) o.push(S.arrow(234, y, 206, y, { w: 1.5, c: 'var(--diagram-blue)' }));
    o.push(sm(200, 154, 'H₂O out', { a: 'end', c: 'var(--diagram-blue)' }));
    for (const y of [160, 225, 290]) o.push(S.arrow(346, y, 376, y, { w: 1.5, c: 'var(--diagram-brown)' }));
    o.push(sm(382, 154, 'Na⁺ and Cl⁻ out', { c: 'var(--diagram-brown)' }));
    // collecting duct
    o.push(S.path('M520 70 L520 340', { w: 5, c: 'var(--diagram-muted)' }), S.arrow(520, 330, 520, 372, { w: 2.5, c: 'var(--diagram-muted)' }));
    for (const y of [240, 300]) o.push(S.arrow(514, y, 486, y, { w: 1.5, c: 'var(--diagram-blue)' }));
    o.push(sm(520, 62, 'Collecting duct', { a: 'middle', w: 'bold' }), sm(520, 388, `Urine up to ${GRAD[3][1]}`, { a: 'middle', w: 'bold' }));
    o.push(sm(490, 270, 'H₂O out', { a: 'end', c: 'var(--diagram-blue)' }));
    // vasa recta
    o.push(S.path('M140 100 L140 330 Q146 344 152 330 L152 100', { w: 1.8, c: 'var(--diagram-red)' }), sm(146, 92, 'Vasa recta', { a: 'middle', c: 'var(--diagram-red)' }));
    o.push(lab(120, 392, `Filtrate in the cortex ${GRAD[0][1]}; urine up to ${FOLD} times as concentrated`, { c: 'var(--diagram-muted)' }));
    return o.join('');
  })(),
);

// ---------------------------------------------------------------- 4. Haemodialysis
export const DIALYSIS = svgDoc(
  600,
  290,
  `Haemodialysis: blood from an artery of the patient is pumped through a cellophane tube that runs through the dialysing unit, a bath of fluid that has the same composition as plasma except that it has no nitrogenous wastes. Heparin is added to the blood before it enters the unit to stop clotting, and anti-heparin is added before it returns to a vein of the patient. Urea and other wastes diffuse out of the blood through the cellophane into the fluid; in this example blood urea falls from ${DIAL.before} to ${DIAL.after} milligrams per 100 millilitres`,
  [
    S.rect(190, 70, 250, 150, { rx: 8, fill: 'var(--diagram-blue)', fop: 0.1, sw: 1.5, dash: '5 3' }),
    lab(315, 62, 'Dialysing unit: fluid without nitrogenous wastes', { a: 'middle', w: 'bold' }),
    S.path('M190 145 Q215 105 240 145 Q265 185 290 145 Q315 105 340 145 Q365 185 390 145 Q415 105 440 145', { c: 'var(--diagram-red)', w: 7, op: 0.45 }),
    S.line(20, 145, 190, 145, { w: 5, c: 'var(--diagram-red)' }),
    S.arrow(20, 145, 60, 145, { w: 2, c: 'var(--diagram-red)' }),
    lab(20, 168, 'Blood from an artery', { w: 'bold' }),
    S.circle(105, 145, 11, { fill: 'var(--diagram-fill)', sw: 1.5 }), sm(105, 124, 'Pump', { a: 'middle' }),
    S.arrow(130, 60, 130, 138, { w: 1.5, c: 'var(--diagram-accent)' }), sm(130, 52, 'Heparin added', { a: 'middle', c: 'var(--diagram-accent)' }),
    S.arrow(440, 145, 580, 145, { w: 2, c: 'var(--diagram-red)' }),
    S.arrow(500, 60, 500, 138, { w: 1.5, c: 'var(--diagram-accent)' }), sm(500, 52, 'Anti-heparin added', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(580, 168, 'Blood to a vein', { a: 'end', w: 'bold' }),
    ...[[240, 105], [300, 105], [360, 105], [415, 105]].map(([x, y]) => S.arrow(x, y + 25, x, y, { w: 1.3, c: 'var(--diagram-green)' })),
    sm(315, 92, 'Urea and wastes diffuse out through the cellophane', { a: 'middle', c: 'var(--diagram-green)' }),
    lab(315, 244, 'Cellophane tube (semipermeable): small wastes pass, blood cells and proteins stay', { a: 'middle' }),
    lab(315, 266, `Blood urea falls from ${DIAL.before} to ${DIAL.after} mg per 100 mL in this example`, { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);
