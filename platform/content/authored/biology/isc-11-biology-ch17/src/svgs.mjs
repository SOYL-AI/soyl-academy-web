// SVG diagrams for ISC 11 Biology ch17 Body Fluids and Circulation. Timings come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { PHASES, cycleSec } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const BLUE = { fill: 'var(--diagram-blue)', fop: 0.25 };
const RED = { fill: 'var(--diagram-red)', fop: 0.22 };

// ---------------------------------------------------------------- 1. Human heart, internal structure (labelled and lettered)
function heart(letters) {
  const o = [];
  // chambers
  o.push(S.rect(210, 130, 80, 85, { rx: 18, sw: 2.2, ...BLUE }), S.rect(330, 130, 80, 85, { rx: 18, sw: 2.2, ...RED }));
  o.push(S.rect(210, 222, 90, 115, { rx: 20, sw: 2.2, ...BLUE }), S.rect(310, 222, 105, 135, { rx: 24, sw: 3.6, ...RED }));
  o.push(S.line(305, 216, 305, 346, { w: 5 }));
  // great vessels
  o.push(S.rect(210, 52, 22, 80, { sw: 1.5, ...BLUE }), S.rect(150, 190, 60, 18, { sw: 1.5, ...BLUE }));
  o.push(S.rect(293, 96, 14, 126, { sw: 1.5, ...BLUE }), S.path('M300 96 C300 74 275 64 252 66', { c: 'var(--diagram-blue)', w: 12, op: 0.35 }), S.arrow(262, 66, 240, 66, { w: 1.5, c: 'var(--diagram-blue)' }));
  o.push(S.rect(316, 100, 14, 122, { sw: 1.5, ...RED }), S.path('M323 104 C323 46 420 40 440 112', { c: 'var(--diagram-red)', w: 12, op: 0.35 }), S.arrow(440, 112, 440, 134, { w: 1.5, c: 'var(--diagram-red)' }));
  o.push(S.rect(410, 140, 50, 14, { sw: 1.5, ...RED }), S.rect(410, 180, 50, 14, { sw: 1.5, ...RED }));
  // valves
  o.push(S.path('M217 219 L245 245 M285 219 L257 245', { w: 2.2 }), S.path('M337 219 L365 245 M405 219 L377 245', { w: 2.2 }));
  o.push(S.path('M293 228 L300 220 L307 228', { w: 2 }), S.path('M316 226 L323 218 L330 226', { w: 2 }));
  // chordae tendineae and papillary muscles
  o.push(S.path('M245 245 L240 298 M257 245 L262 298', { w: 1, c: 'var(--diagram-muted)' }), S.ellipse(240, 304, 7, 6, { fill: 'var(--diagram-fill)', sw: 1.2 }), S.ellipse(262, 304, 7, 6, { fill: 'var(--diagram-fill)', sw: 1.2 }));
  o.push(S.path('M365 245 L360 304 M377 245 L384 304', { w: 1, c: 'var(--diagram-muted)' }), S.ellipse(360, 310, 8, 6, { fill: 'var(--diagram-fill)', sw: 1.2 }), S.ellipse(384, 310, 8, 6, { fill: 'var(--diagram-fill)', sw: 1.2 }));
  // labels
  const L = 14;
  const R = 478;
  const left = (text, y, tx, ty) => o.push(S.lead(L + 112, y - 4, tx, ty), lab(L, y, text));
  const right = (text, y, tx, ty) => o.push(S.lead(R - 4, y - 4, tx, ty), lab(R, y, text));
  if (!letters) {
    left('Superior vena cava', 80, 210, 82);
    left('Inferior vena cava', 204, 152, 199);
    left('Right auricle', 160, 212, 160);
    left('Tricuspid valve', 252, 226, 228);
    left('Right ventricle', 296, 218, 296);
    left('Chordae tendineae', 326, 242, 300);
    o.push(S.lead(300, 36, 300, 94), lab(232, 30, 'Pulmonary artery'));
    right('Aorta', 52, 410, 62);
    right('Pulmonary veins', 172, 462, 168);
    right('Left auricle', 218, 398, 205);
    right('Bicuspid (mitral) valve', 258, 407, 226);
    right('Left ventricle', 304, 413, 300);
    o.push(S.lead(305, 364, 305, 346), lab(305, 380, 'Interventricular septum', { a: 'middle' }));
  } else {
    // letters: A left ventricle, B right auricle, C aorta, D bicuspid valve, E interventricular septum
    o.push(S.lead(L + 112, 156, 212, 160), tag(L + 120, 156, 'B'));
    o.push(S.lead(R - 4, 48, 410, 62), tag(R + 8, 48, 'C'));
    o.push(S.lead(R - 4, 296, 413, 300), tag(R + 8, 296, 'A'));
    o.push(S.lead(R - 4, 252, 407, 226), tag(R + 8, 252, 'D'));
    o.push(S.lead(305, 364, 305, 346), tag(305, 372, 'E'));
  }
  return o.join('');
}
export const HEART = svgDoc(
  640,
  395,
  'Human heart in section: the right auricle receives blood from the superior and inferior vena cavae and passes it through the tricuspid valve into the right ventricle, which pumps it into the pulmonary artery; the left auricle receives blood from the pulmonary veins and passes it through the bicuspid (mitral) valve into the left ventricle, which has the thickest wall and pumps blood into the aorta. The interventricular septum separates the two ventricles, and semilunar valves guard the exits of the ventricles. Chordae tendineae hold the valve flaps',
  heart(false),
);
export const HEART_Q = svgDoc(
  640,
  395,
  'The same heart with five parts marked A to E: A the left ventricle, B the right auricle, C the aorta leaving the heart, D the valve between the left auricle and the left ventricle, and E the wall between the two ventricles',
  heart(true),
);

// ---------------------------------------------------------------- 2. Cardiac cycle timeline
const X0 = 40;
const PX = 600; // pixels per second
export const CYCLE = svgDoc(
  600,
  290,
  `One cardiac cycle at 75 beats a minute lasts ${cycleSec(75)} second: atrial systole ${PHASES[0][1]} second, ventricular systole ${PHASES[1][1]} second and joint diastole ${PHASES[2][1]} second. In atrial systole the auricles contract and push blood into the ventricles through open atrioventricular valves. In ventricular systole the atrioventricular valves close, the semilunar valves open and blood leaves by the aorta and the pulmonary artery. In joint diastole all four chambers relax, the semilunar valves close and blood flows from the veins into the heart`,
  (() => {
    const o = [lab(300, 20, `One cardiac cycle at 75 beats a minute = ${cycleSec(75)} second`, { a: 'middle', w: 'bold' })];
    const cols = ['var(--diagram-yellow)', 'var(--diagram-red)', 'var(--diagram-blue)'];
    let t = 0;
    PHASES.forEach(([name, d], i) => {
      const x = X0 + t * PX;
      o.push(S.rect(x, 50, d * PX, 36, { fill: cols[i], fop: 0.3, sw: 1.5 }));
      o.push(S.line(x, 90, x, 98), sm(x, 110, `${Math.round(t * 10) / 10}`, { a: 'middle', c: 'var(--diagram-muted)' }));
      t += d;
    });
    o.push(S.line(X0 + t * PX, 90, X0 + t * PX, 98), sm(X0 + t * PX, 110, `${Math.round(t * 10) / 10} s`, { a: 'middle', c: 'var(--diagram-muted)' }));
    const blocks = [
      [10, 'Atrial systole (0.1 s)', ['Auricles contract', 'Blood is pushed into the', 'ventricles; AV valves open']],
      [205, 'Ventricular systole (0.3 s)', ['Ventricles contract; AV valves', 'close, semilunar valves open;', 'blood leaves by the aorta and', 'the pulmonary artery']],
      [405, 'Joint diastole (0.4 s)', ['All four chambers relax;', 'semilunar valves close;', 'blood flows in from the veins']],
    ];
    const mids = PHASES.map(([, d], i) => X0 + (PHASES.slice(0, i).reduce((s, [, x]) => s + x, 0) + d / 2) * PX);
    blocks.forEach(([x, title, lines], i) => {
      o.push(S.lead(mids[i], 88, x + 70, 138));
      o.push(S.rect(x, 140, 185, 20 + lines.length * 14 + 8, { rx: 4, fill: 'var(--diagram-fill)', fop: 0.5, sw: 1 }));
      o.push(sm(x + 8, 156, title, { w: 'bold' }));
      lines.forEach((ln, k) => o.push(sm(x + 8, 172 + k * 14, ln)));
    });
    o.push(lab(300, 276, 'AV valves = atrioventricular valves (tricuspid and bicuspid)', { a: 'middle', c: 'var(--diagram-muted)' }));
    return o.join('');
  })(),
);

// ---------------------------------------------------------------- 3. ECG (labelled and lettered)
const base = 150;
function beat(x0) {
  const y = base;
  return ` L${x0 + 20} ${y} Q${x0 + 35} ${y - 26} ${x0 + 50} ${y} L${x0 + 68} ${y} L${x0 + 74} ${y + 8} L${x0 + 86} ${y - 96} L${x0 + 98} ${y + 24} L${x0 + 106} ${y} L${x0 + 132} ${y} Q${x0 + 158} ${y - 48} ${x0 + 184} ${y} L${x0 + 220} ${y}`;
}
function ecg(letters) {
  const o = [];
  o.push(S.path(`M20 ${base}${beat(20)}${beat(240)} L520 ${base}`, { c: 'var(--diagram-blue)', w: 2.2 }));
  // R-R interval
  o.push(S.arrow(106, 34, 326, 34, { w: 1.2, c: 'var(--diagram-muted)' }), S.arrow(326, 34, 106, 34, { w: 1.2, c: 'var(--diagram-muted)' }));
  o.push(S.line(106, 30, 106, 52, { w: 1, c: 'var(--diagram-muted)' }), S.line(326, 30, 326, 52, { w: 1, c: 'var(--diagram-muted)' }));
  if (letters) {
    o.push(tag(216, 24, 'D'));
    o.push(S.lead(55, 118, 55, 135), tag(55, 108, 'C'));
    o.push(S.lead(120, 66, 108, 58), tag(130, 62, 'A'));
    o.push(S.lead(190, 112, 190, 126), tag(190, 102, 'B'));
  } else {
    o.push(lab(216, 24, 'R–R interval (one cardiac cycle)', { a: 'middle' }));
    o.push(S.lead(55, 118, 55, 135), lab(55, 112, 'P wave', { a: 'middle', w: 'bold' }));
    o.push(S.lead(128, 66, 110, 58), lab(132, 70, 'QRS complex', { w: 'bold' }));
    o.push(S.lead(190, 112, 190, 126), lab(190, 106, 'T wave', { a: 'middle', w: 'bold' }));
    o.push(lab(20, 200, 'P wave: electrical excitation (depolarisation) of the auricles, followed by atrial systole', {}));
    o.push(lab(20, 218, 'QRS complex: depolarisation of the ventricles, followed by the start of ventricular systole', {}));
    o.push(lab(20, 236, 'T wave: return of the ventricles to the resting state (repolarisation), followed by diastole', {}));
  }
  return o.join('');
}
export const ECG = svgDoc(
  560,
  250,
  'A normal electrocardiogram showing two heart beats. Each beat has a small P wave (excitation of the auricles), a tall narrow QRS complex (excitation of the ventricles) and a rounded T wave (return of the ventricles to the resting state). The distance between two R peaks is one cardiac cycle',
  ecg(false),
);
export const ECG_Q = svgDoc(
  560,
  170,
  'An electrocardiogram of two beats with four features marked A to D: A the tall narrow spike of each beat, B the rounded wave that follows it, C the small wave that comes first in each beat, and D the interval between the tops of two successive tall spikes',
  ecg(true),
);

// ---------------------------------------------------------------- 4. Artery, vein and capillary in cross-section
function ring(cx, cy, layers) {
  return layers.map(([r, fill, fop]) => S.circle(cx, cy, r, { fill, fop, sw: 1.4 })).join('');
}
const at = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
function vesselRow(cy, cx, layers, marks, notes, title) {
  const o = [ring(cx, cy, layers)];
  o.push(lab(10, cy - layers[0][0] - 8, title, { w: 'bold' }));
  marks.forEach(([text, r, deg, ly]) => {
    const [tx, ty] = at(cx, cy, r, deg);
    o.push(S.lead(168, ly - 4, tx, ty), sm(172, ly, text));
  });
  notes.forEach((n, i) => o.push(sm(380, cy - 28 + i * 15, n)));
  return o.join('');
}
export const VESSELS = svgDoc(
  600,
  400,
  'Transverse sections of an artery, a vein and a capillary. The artery has a thick wall of three coats (outer connective tissue, a thick middle layer of smooth muscle and elastic fibres, and an inner endothelium) around a narrow lumen. The vein has the same three coats but a thinner wall and a wide lumen, and its inner lining forms valves. The capillary has a wall of a single layer of endothelial cells, so that gases and nutrients can pass across it',
  [
    vesselRow(80, 80, [[56, 'var(--diagram-fill)', 0.6], [46, 'var(--diagram-yellow)', 0.35], [24, 'var(--diagram-fill)', 0.6], [15, 'var(--diagram-red)', 0.25]], [['Outer coat (connective tissue)', 51, -30, 36], ['Middle coat: muscle and elastic fibres', 35, -5, 70], ['Inner lining (endothelium)', 21, 25, 104], ['Narrow lumen', 4, 60, 138]], ['Thick, elastic and muscular wall', 'Narrow lumen, no valves', 'Carries blood away from the heart', 'under high pressure'], 'Artery'),
    vesselRow(215, 80, [[56, 'var(--diagram-fill)', 0.6], [48, 'var(--diagram-yellow)', 0.3], [42, 'var(--diagram-fill)', 0.6], [36, 'var(--diagram-blue)', 0.2]], [['Outer coat (connective tissue)', 52, -30, 178], ['Thin middle coat', 45, -5, 212], ['Inner lining (endothelium)', 39, 25, 246], ['Wide lumen', 10, 55, 280]], ['Thin wall with less muscle', 'Wide lumen; valves present', 'Carries blood towards the heart', 'at low pressure'], 'Vein'),
    vesselRow(345, 80, [[26, 'var(--diagram-fill)', 0.6], [19, 'var(--diagram-red)', 0.22]], [['Wall: one layer of endothelial cells', 22, -20, 330], ['Lumen: red cells pass in single file', 6, 20, 360]], ['Wall only one cell thick', 'Exchange of gases, food and', 'wastes between blood and tissues'], 'Capillary'),
  ].join(''),
);
