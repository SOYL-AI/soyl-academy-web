// SVG diagrams for ICSE 10 Biology ch08 Circulatory System: Heart, Blood Vessels and Circulation. All new drawings.
// Vessel names are limited to the main vessels of the heart, liver and kidney (removed topic: all other names).
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { CYCLE } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YELLOW = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';

/** A hollow tube along path d: outline in colour, hollow centre, light tint. */
const tube = (d, w, col) => S.path(d, { c: col, w, cap: 'butt', join: 'round' }) + S.path(d, { c: FILL, w: w - 4, cap: 'butt', join: 'round' }) + S.path(d, { c: col, w: w - 4, op: 0.28, cap: 'butt', join: 'round' });

// ---------------------------------------------------------------- 1. heart, longitudinal section (named and lettered)
function heart(lettered) {
  const p = [];
  p.push('<g transform="translate(95 0)">');
  // pulmonary artery (behind the aorta), with its two branches to the lungs
  p.push(tube('M232 256 L232 100 Q232 84 216 84 L95 84', 24, BLUE), tube('M232 100 Q236 84 252 84 L480 84', 24, BLUE));
  // heart wall and chambers
  const outer = 'M140 175 C140 125 190 110 230 118 L330 118 C380 110 440 125 440 185 C440 290 360 370 300 410 C240 370 140 300 140 230 Z';
  p.push(S.path(outer, { fill: FILL, fop: 1, w: 1.8 }), S.path(outer, { c: RED, fill: RED, fop: 0.22, w: 1.8 }));
  const cav = (d, col) => S.path(d, { fill: FILL, fop: 1, w: 1.2 }) + S.path(d, { c: col, fill: col, fop: 0.18, w: 1.2 });
  p.push(cav('M158 170 C158 140 228 138 236 165 L236 238 L158 238 Z', BLUE));
  p.push(cav('M158 252 L246 252 L246 330 C220 350 185 330 160 285 Z', BLUE));
  p.push(cav('M318 165 C322 138 410 138 418 170 L414 228 L318 228 Z', RED));
  p.push(cav('M310 244 L406 244 C400 300 350 355 312 378 Z', RED));
  // openings between auricles and ventricles
  p.push(S.rect(168, 236, 44, 18, { fill: FILL, fop: 1, sw: 0 }), S.rect(168, 236, 44, 18, { fill: BLUE, fop: 0.18, sw: 0 }));
  p.push(S.rect(336, 226, 56, 20, { fill: FILL, fop: 1, sw: 0 }), S.rect(336, 226, 56, 20, { fill: RED, fop: 0.18, sw: 0 }));
  // valve flaps, chordae tendineae and papillary muscles
  for (const [x1, x2, cx] of [[168, 182, 186], [212, 198, 204]]) p.push(S.line(x1, 244, x2, 274, { w: 3, cap: 'round' }), S.line(x2, 274, cx, 308, { c: MUTED, w: 1 }));
  for (const [x1, x2, cx] of [[336, 350, 354], [392, 378, 374]]) p.push(S.line(x1, 236, x2, 266, { w: 3, cap: 'round' }), S.line(x2, 266, cx, 302, { c: MUTED, w: 1 }));
  for (const [x, y] of [[186, 312], [204, 312], [354, 306], [374, 306]]) p.push(S.ellipse(x, y, 6, 5, { c: RED, fill: RED, fop: 0.5, sw: 1 }));
  // aorta (in front of the pulmonary artery branch)
  p.push(tube('M290 248 L290 70 Q290 34 330 34 Q372 34 378 70 L378 125', 28, RED));
  // semilunar valves at the bases of the aorta and pulmonary artery
  for (const x of [232, 290]) p.push(S.path(`M${x - 9} 236 Q${x - 4} 246 ${x} 236 Q${x + 4} 246 ${x + 9} 236`, { w: 2 }));
  // venae cavae and pulmonary veins
  p.push(tube('M190 20 L190 150', 28, BLUE), tube('M110 380 L110 300 Q110 228 160 222', 26, BLUE));
  p.push(tube('M500 160 L416 168', 16, RED), tube('M500 212 L414 210', 16, RED));
  const lead = (x1, y1, x2, y2) => p.push(S.lead(x1, y1, x2, y2));
  const txt = (x, y, s, a) => p.push(S.text(x, y, s, { a, size: lettered ? 14 : 11, w: lettered ? 'bold' : undefined }));
  if (!lettered) {
    const left = [['Superior vena cava', 176, 40, 34], ['Right auricle', 172, 175, 160], ['Semilunar valve', 224, 238, 205], ['Tricuspid valve', 170, 247, 248], ['Chordae tendineae', 192, 292, 290], ['Right ventricle', 200, 318, 335], ['Inferior vena cava', 97, 372, 384]];
    for (const [s, x, y, ty] of left) lead(x, y, 92, ty - 4), txt(88, ty, s, 'end');
    const right = [['Aorta', 380, 58, 40], ['Pulmonary artery', 482, 84, 88], ['Left auricle', 390, 185, 228], ['Bicuspid valve', 392, 238, 262], ['Left ventricle', 372, 280, 300], ['Papillary muscle', 378, 308, 336]];
    for (const [s, x, y, ty] of right) lead(x, y, 501, ty - 4), txt(505, ty, s, 'start');
    lead(498, 163, 501, 182), lead(498, 211, 501, 186), txt(505, 190, 'Pulmonary veins', 'start');
    lead(276, 345, 270, 412), txt(270, 425, 'Septum', 'middle');
  } else {
    lead(372, 290, 501, 296), txt(505, 300, 'A', 'start');
    lead(170, 247, 92, 244), txt(88, 248, 'B', 'end');
    lead(482, 84, 501, 84), txt(505, 89, 'C', 'start');
    lead(192, 292, 92, 286), txt(88, 290, 'D', 'end');
    lead(224, 238, 92, 201), txt(88, 205, 'E', 'end');
  }
  p.push('</g>');
  const label = lettered
    ? 'Longitudinal section of the human heart with five parts lettered. A: the thick-walled lower chamber on the left side of the heart. B: the three-flapped valve between the upper and lower chambers on the right side. C: the vessel that leaves the right lower chamber and branches towards the lungs. D: the thread-like cords joining the valve flaps of the right side to small muscles on the chamber wall. E: the pocket-like valve where vessel C leaves the right lower chamber'
    : 'Longitudinal section of the human heart. Deoxygenated blood (blue) enters the right auricle through the superior and inferior venae cavae, passes the tricuspid valve into the right ventricle and leaves through the pulmonary artery, guarded by a semilunar valve. Oxygenated blood (red) enters the left auricle through the pulmonary veins, passes the bicuspid valve into the thick-walled left ventricle and leaves through the aorta. Chordae tendineae join the valve flaps to papillary muscles; the septum separates the two sides';
  return svgDoc(700, 435, label, p.join(''));
}
export const HEART = heart(false);
export const HEART_LETTERED = heart(true);

// ---------------------------------------------------------------- 2. double circulation
export const DOUBLE = (() => {
  const p = [];
  const box = (x, y, w, h, s, col) => p.push(S.rect(x, y, w, h, { rx: 6, c: col, fill: col, fop: 0.18, sw: 1.5 }), S.text(x + w / 2, y + h / 2 + 4, s, { a: 'middle', size: 11, w: 'bold' }));
  box(185, 20, 190, 44, 'Lungs: blood takes up oxygen', BLUE);
  box(185, 296, 190, 44, 'Body tissues: oxygen used', RED);
  // heart: four chambers
  p.push(S.rect(190, 120, 180, 120, { rx: 10, sw: 1.8 }), S.line(280, 120, 280, 240, { w: 1.8 }), S.line(190, 175, 370, 175, { w: 1, c: MUTED }));
  box(196, 126, 78, 44, 'Right auricle', BLUE);
  box(196, 182, 78, 52, 'Right ventricle', BLUE);
  box(286, 126, 78, 44, 'Left auricle', RED);
  box(286, 182, 78, 52, 'Left ventricle', RED);
  // pulmonary circuit (left loop)
  p.push(S.path('M196 208 L130 208 L130 42 L196 42', { c: BLUE, w: 2.5 }), S.head(198, 42, 0, { c: BLUE, size: 9 }));
  p.push(S.path('M364 42 L430 42 L430 148 L366 148', { c: RED, w: 2.5 }), S.head(364, 148, Math.PI, { c: RED, size: 9 }));
  // systemic circuit
  p.push(S.path('M364 208 L480 208 L480 318 L362 318', { c: RED, w: 2.5 }), S.head(362, 318, Math.PI, { c: RED, size: 9 }));
  p.push(S.path('M198 318 L80 318 L80 148 L194 148', { c: BLUE, w: 2.5 }), S.head(196, 148, 0, { c: BLUE, size: 9 }));
  p.push(lab(136, 120, 'Pulmonary'), lab(136, 133, 'artery'), lab(436, 100, 'Pulmonary'), lab(436, 113, 'veins'));
  p.push(lab(486, 262, 'Aorta'), lab(10, 240, 'Venae cavae'));
  p.push(S.text(280, 92, 'Pulmonary circuit: heart → lungs → heart', { a: 'middle', size: 11, c: MUTED }), S.text(280, 274, 'Systemic circuit: heart → body → heart', { a: 'middle', size: 11, c: MUTED }));
  p.push(lab(10, 360, 'Blue: deoxygenated blood. Red: oxygenated blood. Blood passes through the heart twice per round.', { c: MUTED }));
  return svgDoc(560, 370, 'Double circulation. The right ventricle pumps deoxygenated blood through the pulmonary artery to the lungs, and oxygenated blood returns through the pulmonary veins to the left auricle: the pulmonary circuit. The left ventricle pumps oxygenated blood through the aorta to the body tissues, and deoxygenated blood returns through the venae cavae to the right auricle: the systemic circuit. Blood passes through the heart twice in one complete round', p.join(''));
})();

// ---------------------------------------------------------------- 3. artery, vein and capillary
export const VESSELS = (() => {
  const p = [];
  // artery
  p.push(S.text(90, 22, 'Artery (T.S.)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.circle(90, 110, 62, { c: BROWN, fill: BROWN, fop: 0.15, sw: 1.5 }), S.circle(90, 110, 52, { c: RED, fill: RED, fop: 0.3, sw: 1.2 }), S.circle(90, 110, 24, { fill: FILL, fop: 1, sw: 1.2 }), S.circle(90, 110, 24, { c: YELLOW, sw: 2.5 }));
  // vein
  p.push(S.text(335, 22, 'Vein (T.S.)', { a: 'middle', size: 12, w: 'bold' }));
  const vein = 'M222 92 C230 58 300 52 320 84 C336 110 326 150 290 160 C250 168 214 140 222 92 Z';
  const lum = 'M232 96 C240 68 296 64 310 88 C322 110 314 142 288 150 C256 156 226 132 232 96 Z';
  p.push('<g transform="translate(60 0)">', S.path(vein, { c: BROWN, fill: BROWN, fop: 0.15, w: 1.5 }), S.path(lum, { fill: FILL, fop: 1, w: 1.2 }), S.path(lum, { c: YELLOW, w: 2 }));
  p.push(S.path('M228 94 C236 62 298 58 315 86', { c: RED, w: 2.5, op: 0.6 }), '</g>');
  // capillary
  p.push(S.text(515, 22, 'Capillary (T.S.)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.circle(515, 110, 22, { c: RED, sw: 1.5 }), S.circle(515, 110, 17, { fill: FILL, fop: 1, sw: 1 }), S.ellipse(533, 110, 4, 7, { c: BLUE, fill: BLUE, fop: 0.6, sw: 0 }), S.ellipse(500, 98, 5, 3, { c: BLUE, fill: BLUE, fop: 0.6, sw: 0 }));
  p.push(S.circle(515, 112, 7, { c: RED, fill: RED, fop: 0.5, sw: 1 }));
  // labels
  p.push(S.lead(150, 110, 172, 110), S.lead(140, 110, 172, 124), S.lead(112, 102, 172, 138));
  p.push(lab(100, 186, 'Thick wall of muscle and', { a: 'middle' }), lab(100, 199, 'elastic fibres; narrow lumen', { a: 'middle' }));
  p.push(lab(176, 113, 'outer coat', { size: 10 }), lab(176, 127, 'muscle, elastic', { size: 10 }), lab(176, 141, 'lining', { size: 10 }));
  p.push(lab(335, 186, 'Thin wall, little muscle;', { a: 'middle' }), lab(335, 199, 'wide, irregular lumen', { a: 'middle' }));
  p.push(lab(515, 156, 'Wall one cell thick', { a: 'middle' }), lab(515, 169, '(endothelium only);', { a: 'middle' }), lab(515, 182, 'red cells in single file', { a: 'middle' }));
  // vein valves, longitudinal view
  p.push(S.text(270, 230, 'Valves in a vein (L.S.)', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.line(120, 250, 420, 250, { c: BLUE, w: 1.5 }), S.line(120, 290, 420, 290, { c: BLUE, w: 1.5 }));
  for (const x of [200, 330]) p.push(S.path(`M${x} 250 Q${x + 22} 262 ${x + 30} 268`, { c: BLUE, w: 2.2 }), S.path(`M${x} 290 Q${x + 22} 278 ${x + 30} 272`, { c: BLUE, w: 2.2 }));
  p.push(S.arrow(140, 270, 190, 270, { c: BLUE, size: 7 }), S.arrow(250, 270, 320, 270, { c: BLUE, size: 7 }));
  p.push(lab(428, 266, 'to the heart'), lab(428, 279, '(flaps open)'));
  p.push(lab(120, 312, 'Blood pushed backwards closes the pocket-like flaps: flow is one way, to the heart.', { c: MUTED }));
  return svgDoc(600, 322, 'Blood vessels. Artery in transverse section: a thick wall with an outer fibrous coat, a thick middle layer of muscle and elastic fibres and an inner lining, around a narrow lumen. Vein in transverse section: a thin wall with little muscle around a wide, irregular lumen. Capillary in transverse section: a wall only one cell thick, with red cells passing in single file. A vein in longitudinal section shows pocket-like valves that let blood flow only towards the heart', p.join(''));
})();

// ---------------------------------------------------------------- 4. the cardiac cycle
export const CARDIAC = (() => {
  const p = [];
  const x0 = 150, w = 430, k = w / CYCLE.total;
  const seg = [[['Auricles', 'contract'], CYCLE.atrial, RED], [['Ventricles contract'], CYCLE.ventricular, BLUE], [['Whole heart relaxes'], CYCLE.diastole, GREEN]];
  let t = 0;
  p.push(S.text(20, 18, `One cardiac cycle at ${CYCLE.bpm} beats per minute lasts ${CYCLE.total} s`, { size: 12, w: 'bold' }));
  for (const [s, d, col] of seg) {
    p.push(S.rect(x0 + t * k, 62, d * k, 34, { c: col, fill: col, fop: 0.25, sw: 1.2 }), S.text(x0 + (t + d / 2) * k, 84, `${d} s`, { a: 'middle', size: 11, w: 'bold' }));
    s.forEach((line, i) => p.push(S.text(x0 + (t + d / 2) * k, 56 - (s.length - 1 - i) * 13, line, { a: 'middle', size: 11, w: 'bold' })));
    t += d;
  }
  for (let i = 0; i <= 8; i++) p.push(S.line(x0 + i * 0.1 * k, 112, x0 + i * 0.1 * k, 118, { c: MUTED, w: 1 }), S.text(x0 + i * 0.1 * k, 132, (i / 10).toFixed(1), { a: 'middle', size: 10, c: MUTED }));
  p.push(S.line(x0, 112, x0 + w, 112, { c: MUTED, w: 1 }), S.text(x0 - 16, 132, 'time (s)', { a: 'end', size: 10, c: MUTED }));
  // valve rows
  const rows = [['Tricuspid and bicuspid', ['open', 'shut', 'open']], ['Semilunar valves', ['shut', 'open', 'shut']]];
  rows.forEach(([name, st], i) => {
    const y = 170 + i * 34;
    p.push(S.text(x0 - 6, y + 4, name, { a: 'end', size: 11 }));
    t = 0;
    seg.forEach(([, d], j) => {
      p.push(S.rect(x0 + t * k + 2, y - 10, d * k - 4, 20, { rx: 4, fill: st[j] === 'open' ? GREEN : 'var(--diagram-accent)', fop: 0.2, sw: 0 }), S.text(x0 + (t + d / 2) * k, y + 4, st[j], { a: 'middle', size: 11 }));
      t += d;
    });
  });
  p.push(S.text(x0 - 6, 154, 'Valves:', { a: 'end', size: 11, w: 'bold' }));
  const lubb = x0 + CYCLE.atrial * k, dub = x0 + (CYCLE.atrial + CYCLE.ventricular) * k;
  p.push(S.line(lubb, 62, lubb, 222, { c: 'currentColor', w: 1.2, dash: '3 3' }), S.line(dub, 62, dub, 222, { c: 'currentColor', w: 1.2, dash: '3 3' }));
  p.push(S.text(lubb, 240, '"lubb": tricuspid and bicuspid close', { a: 'start', size: 11, w: 'bold' }), S.text(dub, 256, '"dub": semilunar valves close', { a: 'start', size: 11, w: 'bold' }));
  return svgDoc(600, 270, `The cardiac cycle at ${CYCLE.bpm} beats per minute: the auricles contract for ${CYCLE.atrial} s, the ventricles contract for ${CYCLE.ventricular} s and the whole heart relaxes for ${CYCLE.diastole} s, a total of ${CYCLE.total} s. The tricuspid and bicuspid valves are open except while the ventricles contract; the semilunar valves are open only while the ventricles contract. The first sound, lubb, is the closing of the tricuspid and bicuspid valves; the second, dub, is the closing of the semilunar valves`, p.join(''));
})();

// ---------------------------------------------------------------- 5. vessels of the liver and kidney
export const PORTAL = (() => {
  const p = [];
  const box = (x, y, w, h, s, col) => p.push(S.rect(x, y, w, h, { rx: 8, c: col, fill: col, fop: 0.2, sw: 1.5 }), S.text(x + w / 2, y + h / 2 + 4, s, { a: 'middle', size: 12, w: 'bold' }));
  // main trunks
  p.push(S.line(470, 30, 470, 330, { c: RED, w: 6 }), S.line(90, 30, 90, 330, { c: BLUE, w: 6 }));
  p.push(S.text(470, 22, 'Aorta (from heart)', { a: 'middle', size: 11, w: 'bold' }), S.text(90, 22, 'Inferior vena cava (to heart)', { a: 'middle', size: 11, w: 'bold' }));
  p.push(S.head(470, 336, Math.PI / 2, { c: RED, size: 9 }), S.head(90, 24, -Math.PI / 2, { c: BLUE, size: 9 }));
  box(230, 50, 100, 50, 'Liver', BROWN);
  box(230, 160, 100, 46, 'Intestine', GREEN);
  box(230, 260, 100, 50, 'Kidney', RED);
  // liver
  p.push(S.arrow(470, 66, 334, 66, { c: RED, size: 8 }), lab(360, 60, 'Hepatic artery'));
  p.push(S.arrow(470, 183, 334, 183, { c: RED, size: 8 }));
  p.push(S.path('M280 160 L280 104', { c: BLUE, w: 2.5 }), S.head(280, 102, -Math.PI / 2, { c: BLUE, size: 8 }), lab(288, 136, 'Hepatic portal vein'), lab(288, 149, '(digested food)', { c: MUTED }));
  p.push(S.arrow(230, 75, 94, 75, { c: BLUE, size: 8 }), lab(120, 69, 'Hepatic vein'));
  // kidney
  p.push(S.arrow(470, 278, 334, 278, { c: RED, size: 8 }), lab(360, 272, 'Renal artery'), lab(360, 296, '(more urea)', { c: MUTED }));
  p.push(S.arrow(230, 290, 94, 290, { c: BLUE, size: 8 }), lab(120, 284, 'Renal vein'), lab(120, 308, '(least urea)', { c: MUTED }));
  p.push(lab(20, 352, 'Blood from the intestine reaches the liver before the heart: the hepatic portal system.', { c: MUTED }));
  return svgDoc(560, 362, 'Blood vessels of the liver and kidney. The aorta sends the hepatic artery to the liver, an artery to the intestine and the renal artery to the kidney. Blood from the intestine, rich in digested food, goes to the liver in the hepatic portal vein. The hepatic vein carries blood from the liver, and the renal vein carries blood from the kidney, to the inferior vena cava. The renal artery carries more urea than the renal vein', p.join(''));
})();
