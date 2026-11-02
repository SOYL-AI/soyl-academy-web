// SVG diagrams for ch15 Body Fluids and Circulation (allow-listed elements, palette colours only).
// The heart is a labelled schematic in front view (the person's right side is on the viewer's left), not to scale.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { HEART } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const g = (dx, dy, body) => `<g transform="translate(${dx} ${dy})">${body}</g>`;
/** A vessel drawn as a hollow tube along a path. */
const tube = (d, c, w = 18) => S.path(d, { c, w, cap: 'butt', join: 'round' }) + S.path(d, { c: 'var(--diagram-fill)', w: w - 6, cap: 'butt', join: 'round' });

// 1. Section of the human heart with valves, vessels and nodal tissue
const heartBody = [
  // great vessels behind the chambers
  tube('M154 104 L154 24', BLUE, 24),
  tube('M60 156 L124 156', BLUE, 20),
  tube('M217 196 L217 70 L178 70', BLUE, 18),
  tube('M217 84 L300 84', BLUE, 14),
  tube('M255 196 L255 52 C255 18 330 18 336 52 L336 92', RED, 20),
  tube('M360 122 L404 122', RED, 12),
  tube('M360 152 L404 152', RED, 12),
  // ventricular muscle mass (left wall thicker)
  S.path('M112 182 L370 182 C368 258 318 324 250 348 C188 326 116 264 112 182 Z', { fill: RED, fop: 0.1, w: 2.5 }),
  // chambers
  S.rect(116, 100, 90, 74, { rx: 16, fill: BLUE, fop: 0.18, sw: 2 }),
  S.rect(270, 104, 90, 68, { rx: 16, fill: RED, fop: 0.18, sw: 2 }),
  S.path('M124 192 L230 192 L232 300 C196 296 138 252 124 192 Z', { fill: BLUE, fop: 0.2, w: 1.5 }),
  S.path('M262 192 L352 192 C348 246 312 300 258 326 Z', { fill: RED, fop: 0.22, w: 1.5 }),
  // valves
  S.path('M140 176 L152 200 L160 176', { fill: ACC, c: ACC, w: 1 }),
  S.path('M170 176 L180 200 L188 176', { fill: ACC, c: ACC, w: 1 }),
  S.path('M292 174 L304 198 L312 174', { fill: ACC, c: ACC, w: 1 }),
  S.path('M322 174 L332 198 L340 174', { fill: ACC, c: ACC, w: 1 }),
  S.path('M210 186 C210 176 224 176 224 186', { c: ACC, w: 2.5 }),
  S.path('M248 186 C248 176 262 176 262 186', { c: ACC, w: 2.5 }),
  // nodal tissue
  S.circle(176, 112, 5, { fill: 'var(--diagram-yellow)', c: 'var(--diagram-brown)', sw: 1 }),
  S.circle(194, 164, 5, { fill: 'var(--diagram-yellow)', c: 'var(--diagram-brown)', sw: 1 }),
  S.path('M194 169 L244 200 L246 300', { c: 'var(--diagram-brown)', w: 2.5 }),
  S.path('M246 300 C232 312 160 282 132 206', { c: 'var(--diagram-brown)', w: 1.5, dash: '4 3' }),
  S.path('M246 300 C268 318 344 268 356 206', { c: 'var(--diagram-brown)', w: 1.5, dash: '4 3' }),
];
const heartLabels = [
  lab(4, 18, 'Superior vena cava', { c: BLUE }), S.lead(112, 22, 180, 36),
  lab(4, 58, 'Sino-atrial node (pacemaker)'), S.lead(96, 62, 210, 110),
  lab(4, 98, 'Right atrium'), S.lead(76, 102, 168, 134),
  lab(4, 140, 'Inferior vena cava', { c: BLUE }), S.lead(56, 144, 104, 156),
  lab(4, 196, 'Atrio-ventricular node'), S.lead(126, 196, 230, 166),
  lab(4, 226, 'Tricuspid valve', { c: ACC }), S.lead(88, 222, 184, 196),
  lab(4, 262, 'Right ventricle'), S.lead(90, 260, 200, 260),
  lab(4, 300, 'Purkinje fibres', { c: 'var(--diagram-brown)' }), S.lead(92, 298, 190, 300),
  lab(4, 340, 'Bundle of His (in the', { c: 'var(--diagram-brown)' }),
  lab(4, 354, 'interventricular septum)', { c: 'var(--diagram-brown)' }), S.lead(140, 342, 284, 300),
  lab(556, 18, 'Aorta', { a: 'end', c: RED }), S.lead(520, 22, 386, 32),
  lab(556, 58, 'Pulmonary artery', { a: 'end', c: BLUE }), S.lead(460, 62, 330, 84),
  lab(556, 104, 'Pulmonary veins', { a: 'end', c: RED }), S.lead(470, 108, 446, 118),
  lab(556, 186, 'Left atrium', { a: 'end' }), S.lead(490, 182, 380, 150),
  lab(556, 214, 'Bicuspid (mitral) valve', { a: 'end', c: ACC }), S.lead(430, 210, 374, 190),
  lab(556, 242, 'Semilunar valves', { a: 'end', c: ACC }), S.lead(462, 238, 300, 182),
  lab(556, 280, 'Left ventricle (thick wall)', { a: 'end' }), S.lead(420, 276, 352, 268),
];
export const HEARTSEC = svgDoc(
  560,
  370,
  'Section of the human heart, front view, schematic. Upper chambers: right atrium receiving the superior and inferior venae cavae, and left atrium receiving the pulmonary veins. Lower chambers: right ventricle opening into the pulmonary artery, and left ventricle, with the thickest wall, opening into the aorta. The tricuspid valve guards the right atrioventricular opening, the bicuspid or mitral valve the left one, and semilunar valves guard the openings of the pulmonary artery and aorta. Nodal tissue: the sino-atrial node in the upper right corner of the right atrium, the atrio-ventricular node in its lower left corner, and the bundle of His running down the interventricular septum and dividing into Purkinje fibres in the ventricle walls',
  g(40, 0, heartBody.join('')) + heartLabels.join(''),
);

// 2. A standard ECG: P wave, QRS complex, T wave (computed from smooth waves; amplitudes not to scale)
const PERIOD = 0.8; // seconds per beat (72 to 75 beats per minute)
const W = [
  [0.1, 12, 0.025], // P
  [0.235, -7, 0.008], // Q
  [0.255, 72, 0.009], // R
  [0.275, -16, 0.008], // S
  [0.47, 20, 0.035], // T
];
const ecgY = (t) => {
  const u = ((t % PERIOD) + PERIOD) % PERIOD;
  return W.reduce((s, [mu, a, w]) => s + a * Math.exp(-((u - mu) ** 2) / (2 * w * w)), 0);
};
const X0 = 30, BASE = 140, PX = 200; // 200 px per second
const ecgPath = () => {
  const pts = [];
  for (let t = 0; t <= 2.05; t += 0.0025) pts.push(`${pts.length ? 'L' : 'M'}${(X0 + t * PX).toFixed(1)} ${(BASE - ecgY(t)).toFixed(1)}`);
  return pts.join(' ');
};
const grid = () => {
  const out = [];
  for (let x = X0; x <= 450; x += 20) out.push(S.line(x, 40, x, 200, { c: 'var(--diagram-muted)', w: 0.4 }));
  for (let y = 40; y <= 200; y += 20) out.push(S.line(X0, y, 450, y, { c: 'var(--diagram-muted)', w: 0.4 }));
  return out.join('');
};
const xR1 = X0 + 0.255 * PX, xR2 = X0 + (0.255 + PERIOD) * PX;
export const ECG = svgDoc(
  470,
  262,
  `A standard electrocardiogram, about two and a half beats. Each beat shows a P wave (electrical excitation, or depolarisation, of the atria), a QRS complex (depolarisation of the ventricles, which starts ventricular contraction) and a T wave (return of the ventricles from the excited to the normal state, repolarisation, marking the end of systole). The interval from one R peak to the next is one cardiac cycle, about ${HEART.cycle} second at ${HEART.rate} to 75 beats per minute`,
  [
    grid(),
    S.path(ecgPath(), { c: RED, w: 2 }),
    lab(X0 + 0.1 * PX, BASE - 18, 'P', { a: 'middle', w: 'bold' }),
    lab(X0 + 0.255 * PX, BASE - 78, 'R', { a: 'middle', w: 'bold' }),
    lab(X0 + 0.225 * PX - 4, BASE + 18, 'Q', { a: 'middle', w: 'bold' }),
    lab(X0 + 0.285 * PX + 4, BASE + 30, 'S', { a: 'middle', w: 'bold' }),
    lab(X0 + 0.47 * PX, BASE - 26, 'T', { a: 'middle', w: 'bold' }),
    S.path(`M${X0 + 0.22 * PX} ${BASE + 40} L${X0 + 0.22 * PX} ${BASE + 46} L${X0 + 0.29 * PX} ${BASE + 46} L${X0 + 0.29 * PX} ${BASE + 40}`, { w: 1.2 }),
    lab(X0 + 0.255 * PX, BASE + 59, 'QRS complex', { a: 'middle', size: 10 }),
    S.arrow(xR1 + 2, 34, xR2 - 2, 34, { size: 6, w: 1.2 }), S.arrow(xR2 - 2, 34, xR1 + 2, 34, { size: 6, w: 1.2 }),
    lab((xR1 + xR2) / 2, 28, `One cardiac cycle (R to R), about ${HEART.cycle} s`, { a: 'middle', size: 10 }),
    lab(X0, 222, 'P wave: atrial depolarisation (atria contract)', { size: 10 }),
    lab(X0, 237, 'QRS complex: ventricular depolarisation (ventricles begin to contract)', { size: 10 }),
    lab(X0, 252, 'T wave: ventricular repolarisation (end of ventricular systole)', { size: 10 }),
  ].join(''),
);

// 3. Double circulation: pulmonary and systemic circuits
const box = (x, y, w, h, t, c, fop = 0.2) => S.rect(x, y, w, h, { rx: 6, fill: c, fop, sw: 1.5 }) + lab(x + w / 2, y + h / 2 + 4, t, { a: 'middle' });
export const DOUBLE = svgDoc(
  470,
  320,
  'Double circulation in humans. Pulmonary circulation: deoxygenated blood from the right ventricle goes through the pulmonary artery to the lungs and returns, oxygenated, through the pulmonary veins to the left atrium. Systemic circulation: oxygenated blood from the left ventricle goes through the aorta, arteries, arterioles and capillaries to the tissues, and deoxygenated blood returns through veins and the venae cavae to the right atrium. Blood passes through the heart twice in one complete circuit',
  [
    box(150, 12, 170, 36, 'Lungs (capillaries)', 'var(--diagram-green)', 0.15),
    box(130, 112, 80, 40, 'Right atrium', BLUE),
    box(130, 158, 80, 40, 'Right ventricle', BLUE),
    box(256, 112, 84, 40, 'Left atrium', RED),
    box(256, 158, 84, 40, 'Left ventricle', RED),
    box(130, 262, 210, 36, 'Body tissues (capillaries)', 'var(--diagram-muted)', 0.15),
    S.arrow(170, 152, 170, 158, { c: BLUE, size: 5 }),
    S.arrow(298, 152, 298, 158, { c: RED, size: 5 }),
    // pulmonary artery: RV → lungs (through the gap between the two sides)
    S.path('M210 178 L233 178 L233 56', { c: BLUE, w: 2.5 }), S.head(233, 48, -Math.PI / 2, { c: BLUE }),
    // pulmonary veins: lungs → LA
    S.path('M298 48 L298 104', { c: RED, w: 2.5 }), S.head(298, 112, Math.PI / 2, { c: RED }),
    // aorta: LV → body
    S.path('M340 178 L410 178 L410 280 L348 280', { c: RED, w: 2.5 }), S.head(340, 280, Math.PI, { c: RED }),
    // venae cavae: body → RA
    S.path('M130 280 L84 280 L84 132 L122 132', { c: BLUE, w: 2.5 }), S.head(130, 132, 0, { c: BLUE }),
    lab(228, 96, 'Pulmonary artery', { c: BLUE, size: 10, a: 'end' }),
    lab(304, 82, 'Pulmonary veins', { c: RED, size: 10 }),
    lab(416, 222, 'Aorta and', { c: RED, size: 10 }), lab(416, 235, 'arteries', { c: RED, size: 10 }),
    lab(6, 206, 'Venae cavae', { c: BLUE, size: 10 }), lab(6, 219, 'and veins', { c: BLUE, size: 10 }),
    lab(124, 60, 'Pulmonary', { size: 10, w: 'bold', a: 'end' }), lab(124, 73, 'circulation', { size: 10, w: 'bold', a: 'end' }),
    lab(235, 240, 'Systemic circulation', { size: 10, w: 'bold', a: 'middle' }),
    S.rect(356, 16, 12, 8, { fill: RED, sw: 0 }), lab(372, 24, 'oxygenated', { size: 10 }),
    S.rect(356, 32, 12, 8, { fill: BLUE, sw: 0 }), lab(372, 40, 'deoxygenated', { size: 10 }),
  ].join(''),
);

export const ALL = { HEARTSEC, ECG, DOUBLE };
