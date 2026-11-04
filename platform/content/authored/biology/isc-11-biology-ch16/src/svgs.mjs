// SVG diagrams for ISC 11 Biology ch16 Breathing and Exchange of Gases. Volumes and curves come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { P1, curvePoints, P50, sat, round } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const f1 = (n) => Math.round(n * 10) / 10;

// ---------------------------------------------------------------- 1. Human respiratory system (labelled and lettered)
function resp(letters) {
  const OX = 215;
  const X = (x) => x + OX;
  const parts = [];
  // conducting passages
  parts.push(S.ellipse(X(150), 36, 30, 14, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.5 }));
  parts.push(S.rect(X(141), 52, 18, 30, { rx: 6, fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.5 }));
  parts.push(S.rect(X(139), 84, 22, 24, { rx: 4, fill: 'var(--diagram-blue)', fop: 0.2, sw: 1.5 }));
  parts.push(S.rect(X(144), 108, 12, 64, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.5 }));
  for (let y = 116; y <= 166; y += 10) parts.push(S.line(X(142), y, X(158), y, { w: 1.2 }));
  parts.push(S.line(X(150), 172, X(112), 200, { w: 5 }));
  parts.push(S.line(X(150), 172, X(188), 200, { w: 5 }));
  // lungs (right lung of the body on the viewer's left)
  const rl = `M${X(120)} 190 C${X(60)} 200 ${X(52)} 255 ${X(64)} 300 Q${X(100)} 290 ${X(142)} 288 C${X(150)} 250 ${X(150)} 220 ${X(128)} 192 Z`;
  const ll = `M${X(180)} 190 C${X(240)} 200 ${X(248)} 255 ${X(236)} 300 Q${X(200)} 290 ${X(158)} 288 C${X(150)} 250 ${X(150)} 220 ${X(172)} 192 Z`;
  parts.push(S.path(rl, { fill: 'var(--diagram-red)', fop: 0.12, w: 1.8 }));
  parts.push(S.path(ll, { fill: 'var(--diagram-red)', fop: 0.12, w: 1.8 }));
  // lobes: fissures
  parts.push(S.line(X(62), 236, X(139), 244, { w: 1, c: 'var(--diagram-muted)' }));
  parts.push(S.line(X(64), 266, X(142), 270, { w: 1, c: 'var(--diagram-muted)' }));
  parts.push(S.line(X(238), 250, X(155), 252, { w: 1, c: 'var(--diagram-muted)' }));
  // bronchioles and alveoli in the right lung
  parts.push(S.path(`M${X(112)} 200 L${X(98)} 228 M${X(98)} 228 L${X(86)} 246 M${X(98)} 228 L${X(106)} 250`, { w: 1.2 }));
  for (const [cx, cy] of [[82, 254], [92, 258], [102, 258], [110, 254], [88, 268], [100, 270]]) parts.push(S.circle(X(cx), cy, 5, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1 }));
  // diaphragm
  parts.push(S.path(`M${X(46)} 314 Q${X(150)} 266 ${X(254)} 314`, { c: 'var(--diagram-brown)', w: 4 }));
  // labels: right side for the left lung and passages, left side for the right lung
  const R = X(300);
  const Lx = 10;
  const rows = letters
    ? [
        ['A', R, 36, X(180), 36], // nasal chamber
        ['B', R, 96, X(161), 96], // larynx
        ['C', R, 140, X(156), 140], // trachea
        ['D', R, 200, X(190), 199], // bronchus
        ['E', R, 300, X(240), 306], // diaphragm
      ]
    : [
        ['Nasal chamber', R, 36, X(180), 36],
        ['Larynx', R, 96, X(161), 96],
        ['Trachea', R, 140, X(156), 140],
        ['Bronchus', R, 200, X(190), 199],
        ['Left lung (two lobes)', R, 250, X(230), 250],
        ['Diaphragm', R, 306, X(240), 308],
      ];
  for (const [t, x, y, tx, ty] of rows) {
    parts.push(S.lead(x - 4, y - 4, tx, ty));
    parts.push(letters ? tag(x + 6, y - 4, t) : lab(x, y, t));
  }
  if (!letters) {
    const left = [
      ['Pharynx', 66, X(141), 66],
      ['Epiglottis', 90, X(139), 90],
      ['Right lung (three lobes)', 236, X(70), 236],
      ['Alveoli', 276, X(86), 270],
      ['Bronchiole', 214, X(98), 222],
    ];
    for (const [t, y, tx, ty] of left) {
      parts.push(S.lead(Lx + 120, y - 4, tx, ty));
      parts.push(lab(Lx, y, t));
    }
  }
  return parts.join('');
}
export const RESP = svgDoc(
  660,
  330,
  'Human respiratory system: air enters the nasal chamber, passes the pharynx and the larynx (with the epiglottis above it), then the trachea, which is held open by C-shaped cartilage rings and divides into two bronchi; each bronchus branches into bronchioles that end in alveoli inside the lungs. The right lung has three lobes and the left lung two. The diaphragm forms the floor of the chest',
  resp(false),
);
export const RESP_Q = svgDoc(
  660,
  330,
  'The human respiratory system with five parts marked A to E: A the nasal chamber, B the larynx, C the trachea, D a bronchus entering a lung, and E the diaphragm below the lungs',
  resp(true),
);

// ---------------------------------------------------------------- 2. Mechanism of breathing
function panel(ox, insp) {
  const o = [];
  const rib = insp ? { x: 22, y: 30, w: 176, h: 140 } : { x: 36, y: 38, w: 148, h: 122 };
  o.push(S.text(ox + 110, 16, insp ? 'Inspiration' : 'Expiration', { a: 'middle', size: 13, w: 'bold' }));
  o.push(S.rect(ox + rib.x, rib.y, rib.w, rib.h, { rx: 44, sw: 2.5, fill: 'var(--diagram-yellow)', fop: 0.12 }));
  const lr = insp ? [64, 54] : [52, 44];
  o.push(S.ellipse(ox + 110, 98, lr[0], lr[1], { fill: 'var(--diagram-red)', fop: 0.15, sw: 1.5 }));
  o.push(
    insp
      ? S.path(`M${ox + 30} 182 Q${ox + 110} 174 ${ox + 190} 182`, { c: 'var(--diagram-brown)', w: 4 })
      : S.path(`M${ox + 36} 176 Q${ox + 110} 138 ${ox + 184} 176`, { c: 'var(--diagram-brown)', w: 4 }),
  );
  if (insp) {
    o.push(S.arrow(ox + 24, 56, ox + 8, 38, { w: 2, c: 'var(--diagram-green)' }), S.arrow(ox + 196, 56, ox + 212, 38, { w: 2, c: 'var(--diagram-green)' }), S.arrow(ox + 110, 188, ox + 110, 210, { w: 2, c: 'var(--diagram-green)' }));
    o.push(sm(ox + 110, 232, 'Diaphragm contracts and flattens', { a: 'middle' }), sm(ox + 110, 246, 'External intercostals lift ribs up and out', { a: 'middle' }), sm(ox + 110, 260, 'Volume rises, pressure falls: air flows in', { a: 'middle', w: 'bold' }));
  } else {
    o.push(S.arrow(ox + 10, 40, ox + 32, 62, { w: 2, c: 'var(--diagram-red)' }), S.arrow(ox + 210, 40, ox + 188, 62, { w: 2, c: 'var(--diagram-red)' }), S.arrow(ox + 110, 204, ox + 110, 182, { w: 2, c: 'var(--diagram-red)' }));
    o.push(sm(ox + 110, 232, 'Diaphragm relaxes and rises as a dome', { a: 'middle' }), sm(ox + 110, 246, 'Ribs and sternum fall down and in', { a: 'middle' }), sm(ox + 110, 260, 'Volume falls, pressure rises: air flows out', { a: 'middle', w: 'bold' }));
  }
  return o.join('');
}
export const MECH = svgDoc(
  470,
  270,
  'Mechanism of breathing in two panels. Inspiration: the diaphragm contracts and flattens and the external intercostal muscles lift the ribs and sternum up and out, so the chest volume rises and the pressure in the lungs falls below atmospheric pressure, and air flows in. Expiration: the diaphragm and intercostal muscles relax, the diaphragm rises as a dome and the ribs fall, so the volume falls, the pressure rises above atmospheric pressure and air flows out',
  panel(0, true) + panel(240, false),
);

// ---------------------------------------------------------------- 3. Spirometer trace (labelled and lettered)
const V0 = 250; // y of zero volume
const K = 0.045; // pixels per mL
const yv = (v) => f1(V0 - v * K);
function trace() {
  const keys = [[50, P1.endExp], [70, P1.endInsp], [90, P1.endExp], [110, P1.endInsp], [130, P1.endExp], [150, P1.endInsp], [170, P1.endExp], [190, P1.endExp], [225, P1.tlc], [290, P1.rv], [330, P1.endExp], [350, P1.endExp]];
  const pts = [];
  for (let i = 0; i < keys.length - 1; i++) {
    const [x0, v0] = keys[i];
    const [x1, v1] = keys[i + 1];
    const n = Math.max(2, Math.round((x1 - x0) / 4));
    for (let j = 0; j <= n; j++) {
      const t = j / n;
      const e = (1 - Math.cos(Math.PI * t)) / 2;
      if (j === 0 && i > 0) continue;
      pts.push([x0 + (x1 - x0) * t, v0 + (v1 - v0) * e]);
    }
  }
  return S.path(`M${pts.map(([x, v]) => `${f1(x)} ${yv(v)}`).join(' L')}`, { c: 'var(--diagram-blue)', w: 2.2 });
}
function spiro(letters) {
  const o = [];
  o.push(lab(50, 14, 'Volume of air in the lungs (mL)', { w: 'bold' }));
  o.push(S.line(50, V0, 50, 30, { w: 1.5 }), S.line(50, V0, 360, V0, { w: 1.5 }));
  o.push(sm(205, 270, 'Time', { a: 'middle', c: 'var(--diagram-muted)' }));
  const levels = [[P1.tlc, 'Maximum level'], [P1.endInsp, ''], [P1.frc, ''], [P1.rv, 'Minimum level']];
  for (const [v] of levels) o.push(S.line(50, yv(v), 372, yv(v), { dash: '4 3', c: 'var(--diagram-muted)', w: 1 }));
  o.push(trace());
  // brackets for volumes
  const br = (x, v1, v2) => S.line(x, yv(v1), x, yv(v2), { w: 1.8 }) + S.line(x - 4, yv(v1), x, yv(v1), { w: 1.8 }) + S.line(x - 4, yv(v2), x, yv(v2), { w: 1.8 });
  const mid = (v1, v2) => (parseFloat(yv(v1)) + parseFloat(yv(v2))) / 2 + 4;
  const vols = [
    ['IRV', P1.endInsp, P1.tlc, 'B'],
    ['TV', P1.endExp, P1.endInsp, 'D'],
    ['ERV', P1.rv, P1.endExp, 'A'],
    ['RV', 0, P1.rv, 'C'],
  ];
  for (const [n, v1, v2, l] of vols) {
    o.push(br(376, v1, v2));
    o.push(letters ? tag(396, mid(v1, v2) - 4, l) : lab(384, mid(v1, v2), n, { w: 'bold' }));
  }
  o.push(br(452, P1.rv, P1.tlc));
  o.push(letters ? tag(472, mid(P1.rv, P1.tlc) - 4, 'E') : lab(460, mid(P1.rv, P1.tlc), 'VC', { w: 'bold' }));
  if (!letters) {
    o.push(br(500, 0, P1.tlc));
    o.push(lab(508, mid(0, P1.tlc), 'TLC', { w: 'bold' }));
  }
  return o.join('');
}
export const SPIRO = svgDoc(
  560,
  278,
  `Spirometer tracing of a student: quiet breathing of tidal volume ${P1.tv} mL, then a maximum inspiration up to total lung capacity ${P1.tlc} mL, a maximum expiration down to the residual volume ${P1.rv} mL, and a return to quiet breathing. Brackets mark the inspiratory reserve volume ${P1.irv} mL, tidal volume ${P1.tv} mL, expiratory reserve volume ${P1.erv} mL and residual volume ${P1.rv} mL, the vital capacity ${P1.vc} mL and the total lung capacity`,
  spiro(false),
);
export const SPIRO_Q = svgDoc(
  560,
  278,
  'The same tracing with brackets marked by letters: A the volume between the quiet end-expiration level and the minimum level reached after the strongest expiration, B the volume between the quiet end-inspiration level and the maximum level, C the volume that stays below the minimum level, D the volume of one quiet breath, and E the whole range from the minimum to the maximum level',
  spiro(true),
);

// ---------------------------------------------------------------- 4. Oxyhaemoglobin dissociation curve
const px = (p) => 50 + p * 3;
const py = (s) => 240 - s * 2;
const curve = (p50, o = {}) => S.path(`M${curvePoints(p50).map(([p, s]) => `${f1(px(p))} ${f1(py(s))}`).join(' L')}`, { w: 2.2, ...o });
function odc(letters) {
  const o = [];
  o.push(lab(50, 14, 'Percentage saturation of haemoglobin with oxygen', { w: 'bold' }));
  o.push(S.line(50, 240, 50, 36, { w: 1.5 }), S.line(50, 240, 350, 240, { w: 1.5 }));
  for (const t of [0, 20, 40, 60, 80, 100]) {
    o.push(S.line(px(t), 240, px(t), 245, { w: 1 }), sm(px(t), 258, String(t), { a: 'middle' }));
    o.push(S.line(46, py(t), 50, py(t), { w: 1 }), sm(44, py(t) + 4, String(t), { a: 'end' }));
  }
  o.push(sm(200, 274, 'Partial pressure of oxygen, pO₂ (mm Hg)', { a: 'middle', c: 'var(--diagram-muted)' }));
  o.push(S.line(px(40), 240, px(40), py(sat(40)), { dash: '4 3', c: 'var(--diagram-muted)', w: 1 }), S.line(px(100), 240, px(100), py(sat(100)), { dash: '4 3', c: 'var(--diagram-muted)', w: 1 }));
  o.push(curve(P50.normal), curve(P50.right, { c: 'var(--diagram-red)' }), curve(P50.left, { c: 'var(--diagram-blue)' }));
  o.push(S.circle(px(40), py(sat(40)), 3.5, { fill: 'currentColor' }), S.circle(px(100), py(sat(100)), 3.5, { fill: 'currentColor' }));
  if (letters) {
    // at pO2 = 30 the order from the top is left-shifted, normal, right-shifted
    o.push(S.lead(px(30) - 8, py(sat(30, P50.left)) - 4, px(30), py(sat(30, P50.left))), tag(px(30) - 16, py(sat(30, P50.left)) - 8, 'B'));
    o.push(S.lead(px(30) - 8, py(sat(30)) - 4, px(30), py(sat(30))), tag(px(30) - 16, py(sat(30)) - 8, 'C'));
    o.push(S.lead(px(30) + 8, py(sat(30, P50.right)) + 6, px(30), py(sat(30, P50.right))), tag(px(30) + 16, py(sat(30, P50.right)) + 12, 'A'));
  } else {
    o.push(S.line(370, 96, 394, 96, { w: 2.2, c: 'var(--diagram-blue)' }), sm(400, 100, `Left-shifted (half saturated at ${P50.left})`));
    o.push(S.line(370, 116, 394, 116, { w: 2.2 }), sm(400, 120, `Normal (half saturated at ${P50.normal})`));
    o.push(S.line(370, 136, 394, 136, { w: 2.2, c: 'var(--diagram-red)' }), sm(400, 140, `Right-shifted (half saturated at ${P50.right})`));
    o.push(sm(px(40) + 8, 146, `tissues: about ${round(sat(40))} percent`), sm(px(100) - 6, 120, `lungs: about ${round(sat(100))} percent`, { a: 'end' }));
  }
  return o.join('');
}
export const ODC = svgDoc(
  590,
  282,
  `Oxyhaemoglobin dissociation curves: percentage saturation of haemoglobin plotted against pO2 gives an S-shaped curve. The normal curve is about ${round(sat(100))} percent saturated at 100 mm Hg (lungs) and about ${round(sat(40))} percent at 40 mm Hg (resting tissues). A curve shifted to the right (more acid, more carbon dioxide, higher temperature) gives up more oxygen at the same pO2; a curve shifted to the left does the opposite`,
  odc(false),
);
export const ODC_Q = svgDoc(
  400,
  282,
  'Three S-shaped oxygen dissociation curves labelled A, B and C. Curve B lies furthest to the left, curve C lies in the middle and curve A lies furthest to the right. Two points are marked on the middle curve, at 40 and at 100 mm Hg',
  odc(true),
);

// ---------------------------------------------------------------- 5. Carbon dioxide transport and the chloride shift (at the tissues)
export const CLSHIFT = svgDoc(
  610,
  300,
  'Transport of carbon dioxide at the tissues. Carbon dioxide diffuses from the tissue cells into the plasma and into a red blood cell. Inside the cell, carbonic anhydrase converts carbon dioxide and water to carbonic acid, which splits into hydrogen ions and bicarbonate ions. Haemoglobin takes up the hydrogen ions, and some carbon dioxide binds to haemoglobin as carbamino-haemoglobin. Bicarbonate ions leave the cell into the plasma while chloride ions enter it, which is the chloride shift. At the lungs the whole sequence runs in reverse',
  [
    S.rect(10, 40, 90, 200, { rx: 6, fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.5 }),
    lab(55, 62, 'Tissue', { a: 'middle', w: 'bold' }),
    lab(55, 78, 'cells', { a: 'middle', w: 'bold' }),
    sm(55, 150, 'high pCO₂', { a: 'middle' }),
    S.rect(110, 30, 490, 220, { rx: 10, fill: 'var(--diagram-fill)', fop: 0.5, sw: 1, dash: '4 3' }),
    lab(355, 24, 'Plasma in a tissue capillary', { a: 'middle', c: 'var(--diagram-muted)' }),
    S.ellipse(300, 140, 112, 84, { fill: 'var(--diagram-red)', fop: 0.15, sw: 2.2 }),
    lab(300, 76, 'Red blood cell', { a: 'middle', w: 'bold' }),
    S.arrow(102, 120, 196, 120, { w: 2, c: 'var(--diagram-green)' }),
    lab(150, 112, 'CO₂', { a: 'middle', w: 'bold' }),
    sm(300, 98, 'CO₂ + H₂O  →  H₂CO₃', { a: 'middle' }),
    sm(300, 112, '(enzyme: carbonic anhydrase)', { a: 'middle', c: 'var(--diagram-accent)' }),
    sm(300, 130, 'H₂CO₃  →  H⁺ + HCO₃⁻', { a: 'middle' }),
    sm(300, 150, 'H⁺ + Hb  →  HHb (buffer)', { a: 'middle' }),
    sm(300, 170, 'CO₂ + Hb  →  carbamino-Hb', { a: 'middle' }),
    sm(300, 190, 'CO₂ (about 23 percent)', { a: 'middle', c: 'var(--diagram-muted)' }),
    S.arrow(398, 128, 470, 128, { w: 2, c: 'var(--diagram-blue)' }),
    lab(472, 124, 'HCO₃⁻ out', { w: 'bold' }),
    sm(472, 138, '(about 70 percent', {}),
    sm(472, 150, 'carried in plasma)', {}),
    S.arrow(470, 190, 398, 190, { w: 2, c: 'var(--diagram-green)' }),
    lab(472, 186, 'Cl⁻ in', { w: 'bold' }),
    sm(472, 200, '(chloride shift)', {}),
    lab(300, 276, 'Chloride shift: Cl⁻ enters as HCO₃⁻ leaves, keeping the cell electrically balanced', { a: 'middle', w: 'bold' }),
  ].join(''),
);
