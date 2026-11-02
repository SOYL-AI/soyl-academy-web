// SVG diagrams for ch14 Breathing and Exchange of Gases (allow-listed elements, palette colours only).
// Organs are neutral, labelled schematics (front views, not to scale); the spirogram and the oxygen
// dissociation curve are computed from calc.mjs.
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { SPIRO, capacities, PP, ODC, saturation, SAT } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();
/** Mirror a path about x = cx (absolute commands with x y pairs only). */
const mirror = (d, cx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f1(2 * cx - Number(x))} ${y}`);

// 1. Human respiratory system (front view, schematic)
const CX = 230;
const lungR = 'M214 112 C176 100 132 150 128 228 C126 268 150 284 212 272 C222 240 222 160 214 112 Z';
const pleuraR = 'M212 104 C170 92 122 146 120 228 C118 276 148 294 214 280';
const bronchR = 'M230 176 L196 196 M196 196 L170 214 M196 196 L184 232 M170 214 L152 226 M170 214 L164 246 M184 232 L176 256 M184 232 L198 252';
const respShapes = [
    S.ellipse(CX, 34, 42, 14, { fill: 'var(--diagram-fill)' }),
    S.rect(CX - 10, 48, 20, 30, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    S.rect(CX - 15, 78, 30, 22, { rx: 5, fill: 'var(--diagram-yellow)', fop: 0.3 }),
    S.path(`M${CX + 6} 80 C${CX + 16} 72 ${CX + 22} 66 ${CX + 20} 58`, { w: 2.5, c: 'var(--diagram-green)', cap: 'round' }),
    S.rect(CX - 8, 100, 16, 76, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    ...Array.from({ length: 10 }, (_, i) => S.path(`M${CX - 8} ${105 + i * 7} C${CX - 4} ${108 + i * 7} ${CX + 4} ${108 + i * 7} ${CX + 8} ${105 + i * 7}`, { w: 1, c: 'var(--diagram-muted)' })),
    S.path(lungR, { fill: 'var(--diagram-red)', fop: 0.12, w: 1.5 }),
    S.path(mirror(lungR, CX), { fill: 'var(--diagram-red)', fop: 0.12, w: 1.5 }),
    S.path(pleuraR, { w: 1.2, dash: '4 3', c: 'var(--diagram-blue)' }),
    S.path(mirror(pleuraR, CX), { w: 1.2, dash: '4 3', c: 'var(--diagram-blue)' }),
    S.path(bronchR, { w: 2, c: 'var(--diagram-brown)' }),
    S.path(mirror(bronchR, CX), { w: 2, c: 'var(--diagram-brown)' }),
    S.path(`M108 306 C150 290 200 292 ${CX} 300 C260 292 310 290 352 306`, { w: 3, c: 'var(--diagram-accent)' }),
    // alveoli inset joined to a terminal bronchiole
    S.circle(392, 222, 34, { c: 'var(--diagram-muted)', dash: '3 3' }),
    S.path('M362 198 L384 214', { w: 2, c: 'var(--diagram-brown)' }),
    ...[[386, 220], [400, 214], [396, 230], [410, 226], [383, 236], [404, 242]].map(([x, y]) => S.circle(x, y, 7, { fill: 'var(--diagram-red)', fop: 0.2, sw: 1 })),
    S.lead(366, 206, 270, 240),
];
const respLabels = [
    lab(4, 28, 'Nasal chamber'),
    S.lead(84, 25, 192, 32),
    lab(4, 60, 'Pharynx'),
    S.lead(50, 57, 218, 60),
    lab(4, 86, 'Larynx (sound box)'),
    S.lead(112, 83, 214, 86),
    lab(4, 110, 'Trachea'),
    S.lead(48, 107, 222, 106),
    lab(4, 172, 'Primary bronchus'),
    S.lead(98, 169, 210, 186),
    lab(4, 208, 'Bronchioles'),
    S.lead(70, 205, 160, 224),
    lab(4, 252, 'Right lung'),
    S.lead(64, 249, 140, 252),
    lab(456, 56, 'Epiglottis', { a: 'end', c: 'var(--diagram-green)' }),
    S.lead(396, 53, 252, 60),
    lab(456, 84, 'Incomplete', { a: 'end' }),
    lab(456, 97, 'cartilaginous rings', { a: 'end' }),
    S.lead(350, 92, 240, 103),
    lab(456, 160, 'Pleural membranes', { a: 'end', c: 'var(--diagram-blue)' }),
    S.lead(358, 157, 330, 176),
    lab(456, 272, 'Alveoli (enlarged)', { a: 'end' }),
    lab(456, 314, 'Diaphragm', { a: 'end', c: 'var(--diagram-accent)' }),
    S.lead(400, 310, 346, 303),
];
export const RESP = svgDoc(
  460,
  320,
  'Human respiratory system, front view, schematic: the nasal chamber leads to the pharynx, a common passage for food and air; the larynx (sound box) with the epiglottis that closes the glottis during swallowing; the trachea supported by incomplete cartilaginous rings divides into right and left primary bronchi, which branch into secondary and tertiary bronchi and bronchioles ending in alveoli; each lung is covered by a double-layered pleura; the dome-shaped diaphragm forms the floor of the thoracic chamber',
  [...respShapes, ...respLabels].join(''),
);


// 1b. Lettered version for a diagram question (A to E on the respiratory system)
const tag = (x, y, s, a) => S.text(x, y, s, { size: 14, w: 'bold', a });
export const RESP_Q = svgDoc(
  460,
  320,
  'Unlabelled front view of the human respiratory system with five parts marked by letters: A the thin flap at the top of the windpipe that closes during swallowing, B the cartilaginous box above the windpipe, C the straight tube with incomplete cartilage rings, D one of the two branches into which the trachea divides, and E the dome-shaped muscle forming the floor of the chest',
  [
    ...respShapes,
    tag(452, 56, 'A', 'end'),
    S.lead(442, 53, 252, 60),
    tag(4, 90, 'B'),
    S.lead(18, 86, 214, 86),
    tag(4, 114, 'C'),
    S.lead(18, 110, 222, 106),
    tag(4, 176, 'D'),
    S.lead(18, 172, 210, 186),
    tag(452, 314, 'E', 'end'),
    S.lead(442, 310, 346, 303),
  ].join(''),
);
// 2. Alveolus and capillary: the diffusion membrane
const MX = 216; // membrane position
export const ALVEOLUS = svgDoc(
  460,
  250,
  `Exchange of gases between an alveolus and a pulmonary capillary. Alveolar air has pO₂ ${PP.alveoli.o2} and pCO₂ ${PP.alveoli.co2} mm Hg; deoxygenated blood arrives with pO₂ ${PP.deoxy.o2} and pCO₂ ${PP.deoxy.co2}, so oxygen diffuses into the blood and carbon dioxide into the alveolus; blood leaves oxygenated with pO₂ ${PP.oxy.o2} and pCO₂ ${PP.oxy.co2}. The diffusion membrane has three layers: the thin squamous epithelium of the alveolus, the basement substance and the endothelium of the capillary`,
  [
    S.circle(130, 112, 84, { fill: 'var(--diagram-fill)', c: 'var(--diagram-blue)' }),
    lab(130, 96, 'Alveolar air', { a: 'middle', w: 'bold' }),
    lab(130, 112, `pO₂ ${PP.alveoli.o2} mm Hg`, { a: 'middle' }),
    lab(130, 126, `pCO₂ ${PP.alveoli.co2} mm Hg`, { a: 'middle' }),
    S.rect(MX + 4, 14, 56, 186, { rx: 10, fill: 'var(--diagram-red)', fop: 0.14, c: 'var(--diagram-red)' }),
    ...[40, 74, 108, 142, 176].map((y) => S.ellipse(MX + 32, y, 11, 6, { fill: 'var(--diagram-red)', fop: 0.45, sw: 0.8 })),
    S.arrow(MX + 32, 22, MX + 32, 34, { c: 'var(--diagram-red)', size: 6 }),
    S.arrow(MX + 32, 184, MX + 32, 196, { c: 'var(--diagram-red)', size: 6 }),
    S.line(MX - 4, 72, MX - 4, 152, { c: 'var(--diagram-blue)', w: 2 }),
    S.line(MX, 72, MX, 152, { c: 'var(--diagram-muted)', w: 2, dash: '3 2' }),
    S.line(MX + 4, 72, MX + 4, 152, { c: 'var(--diagram-red)', w: 2 }),
    S.arrow(176, 90, 262, 90, { c: 'var(--diagram-blue)', w: 2 }),
    lab(178, 84, 'O₂', { c: 'var(--diagram-blue)', w: 'bold' }),
    S.arrow(262, 136, 176, 136, { c: 'var(--diagram-accent)', w: 2 }),
    lab(178, 152, 'CO₂', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(290, 26, 'Deoxygenated blood in'),
    lab(290, 40, `pO₂ ${PP.deoxy.o2}, pCO₂ ${PP.deoxy.co2} mm Hg`, { size: 10 }),
    lab(290, 104, 'Pulmonary capillary', { c: 'var(--diagram-red)' }),
    lab(290, 118, 'with red blood cells', { c: 'var(--diagram-red)' }),
    lab(290, 180, 'Oxygenated blood out'),
    lab(290, 194, `pO₂ ${PP.oxy.o2}, pCO₂ ${PP.oxy.co2} mm Hg`, { size: 10 }),
    lab(236, 216, 'Diffusion membrane: squamous epithelium', { size: 10 }),
    lab(236, 230, 'of alveolus, basement substance, capillary', { size: 10 }),
    lab(236, 244, 'endothelium; much less than a millimetre thick', { size: 10 }),
    S.lead(232, 208, MX - 2, 154),
  ].join(''),
);

// 3. Mechanism of breathing: inspiration and expiration
const chest = (cx, wide, title, dome, lines, arrowDown) => {
  const k = wide ? 8 : 0;
  const side = `M${cx - 38 - k / 2} 54 C${cx - 66 - k} 82 ${cx - 70 - k} 150 ${cx - 64 - k} 188`;
  const ribs = [70, 96, 122, 148, 172].map((y, i) => {
    const w = 40 + i * 6 + k;
    const lift = wide ? -6 : 4;
    return S.path(`M${cx - w} ${y + lift} C${cx - w / 2} ${y + 12 + lift} ${cx + w / 2} ${y + 12 + lift} ${cx + w} ${y + lift}`, { w: 1, c: 'var(--diagram-muted)' });
  });
  const dia = dome
    ? `M${cx - 62} 186 C${cx - 30} 140 ${cx + 30} 140 ${cx + 62} 186`
    : `M${cx - 72} 190 C${cx - 30} 178 ${cx + 30} 178 ${cx + 72} 190`;
  const lr = wide ? [30, 56] : [24, 44];
  return [
    lab(cx, 14, title, { a: 'middle', w: 'bold', size: 12 }),
    S.line(cx, 22, cx, 60, { w: 3, c: 'var(--diagram-muted)' }),
    S.ellipse(cx - 32, wide ? 118 : 108, lr[0], lr[1], { fill: 'var(--diagram-red)', fop: 0.15, sw: 1.2 }),
    S.ellipse(cx + 32, wide ? 118 : 108, lr[0], lr[1], { fill: 'var(--diagram-red)', fop: 0.15, sw: 1.2 }),
    S.path(side, { w: 2 }),
    S.path(mirror(side, cx), { w: 2 }),
    ...ribs,
    S.path(dia, { w: 3, c: 'var(--diagram-accent)' }),
    arrowDown ? S.arrow(cx + 16, 24, cx + 16, 52, { c: 'var(--diagram-blue)', w: 2 }) : S.arrow(cx + 16, 52, cx + 16, 24, { c: 'var(--diagram-blue)', w: 2 }),
    lab(cx + 22, 40, arrowDown ? 'air in' : 'air out', { size: 10, c: 'var(--diagram-blue)' }),
    wide ? S.arrow(cx, 196, cx, 210, { c: 'var(--diagram-accent)', size: 6 }) : S.arrow(cx, 168, cx, 154, { c: 'var(--diagram-accent)', size: 6 }),
    wide ? S.arrow(cx - 70, 110, cx - 84, 98, { size: 6 }) + S.arrow(cx + 70, 110, cx + 84, 98, { size: 6 }) : '',
    S.lines(cx - 108, 226, lines, { size: 10, dy: 12 }),
  ].join('');
};
export const MECH = svgDoc(
  460,
  262,
  'Mechanism of breathing. Inspiration: the diaphragm contracts and flattens, increasing the volume of the thoracic chamber in the antero-posterior axis; the external intercostal muscles contract and lift the ribs and sternum, increasing the volume in the dorso-ventral axis; the pulmonary volume rises and the intra-pulmonary pressure falls below atmospheric pressure, so air moves in. Expiration: the diaphragm and intercostal muscles relax, the diaphragm domes up and the ribs and sternum return, the thoracic and pulmonary volumes fall, the intra-pulmonary pressure rises above atmospheric pressure, and air moves out',
  [
    chest(115, true, 'Inspiration', false, ['Diaphragm contracts and flattens;', 'external intercostals lift ribs, sternum;', 'lung pressure below atmospheric: air in'], true),
    S.line(230, 20, 230, 250, { c: 'var(--diagram-muted)', w: 1, dash: '4 4' }),
    chest(345, false, 'Expiration', true, ['Diaphragm and intercostals relax;', 'diaphragm domes up, ribs return;', 'lung pressure above atmospheric: air out'], false),
  ].join(''),
);

// 4. Spirogram with volumes and capacities (computed from SPIRO)
const cap = capacities(SPIRO);
const Y0 = 272;
const sy = 228 / 6000;
const y = (ml) => Y0 - ml * sy;
const FRC = cap.FRC;
const trace = (() => {
  const pts = [];
  const push = (x, v) => pts.push(`${pts.length ? 'L' : 'M'}${f1(x)} ${f1(y(v))}`);
  for (let x = 50; x <= 170; x += 2) push(x, FRC + (SPIRO.TV / 2) * (1 - Math.cos(((x - 50) / 40) * 2 * Math.PI)));
  for (let x = 172; x <= 200; x += 2) push(x, FRC + ((x - 170) / 30) * (cap.TLC - FRC));
  for (let x = 202; x <= 250; x += 2) push(x, cap.TLC - ((x - 200) / 50) * (cap.TLC - SPIRO.RV));
  for (let x = 252; x <= 280; x += 2) push(x, SPIRO.RV + ((x - 250) / 30) * (FRC - SPIRO.RV));
  for (let x = 282; x <= 330; x += 2) push(x, FRC + (SPIRO.TV / 2) * (1 - Math.cos(((x - 280) / 40) * 2 * Math.PI)));
  return pts.join(' ');
})();
const bracket = (x, lo, hi, name, c = 'currentColor') =>
  S.line(x, y(lo), x, y(hi), { c, w: 1.5 }) + S.line(x - 4, y(lo), x + 4, y(lo), { c, w: 1.5 }) + S.line(x - 4, y(hi), x + 4, y(hi), { c, w: 1.5 }) +
  S.text(x + 6, (y(lo) + y(hi)) / 2 - 1, name, { size: 10, c, w: 'bold' }) + S.text(x + 6, (y(lo) + y(hi)) / 2 + 10, String(hi - lo), { size: 10, c });
export const SPIROGRAM = svgDoc(
  560,
  300,
  `Spirogram of a healthy adult (volumes in mL). Quiet breaths swing between the functional residual capacity (${cap.FRC}) and ${cap.FRC + SPIRO.TV}, the tidal volume of ${SPIRO.TV}. A maximum inspiration reaches the total lung capacity (${cap.TLC}) and a maximum expiration falls to the residual volume (${SPIRO.RV}), which can never be breathed out. Volumes: IRV ${SPIRO.IRV}, TV ${SPIRO.TV}, ERV ${SPIRO.ERV}, RV ${SPIRO.RV}. Capacities: IC ${cap.IC}, FRC ${cap.FRC}, VC ${cap.VC}, TLC ${cap.TLC}`,
  [
    S.arrow(44, Y0 + 4, 44, 18, { size: 6 }),
    S.arrow(40, Y0, 336, Y0, { size: 6 }),
    ...[0, 1000, 2000, 3000, 4000, 5000, 6000].map((v) => S.line(40, y(v), 44, y(v), { w: 1 }) + S.text(36, y(v) + 4, String(v), { a: 'end', size: 10 })),
    S.line(44, y(cap.TLC), 330, y(cap.TLC), { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }),
    S.line(44, y(SPIRO.RV), 330, y(SPIRO.RV), { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }),
    S.line(44, y(FRC), 330, y(FRC), { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }),
    S.line(44, y(FRC + SPIRO.TV), 330, y(FRC + SPIRO.TV), { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }),
    S.path(trace, { c: 'var(--diagram-blue)', w: 2 }),
    lab(48, 14, 'Volume in lungs (mL)', { size: 10 }),
    lab(334, 290, 'Time', { size: 10, a: 'end' }),
    lab(110, 286, 'quiet breathing', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
    lab(226, 286, 'deepest breath in, then out', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
    bracket(348, FRC + SPIRO.TV, cap.TLC, 'IRV'),
    bracket(348, FRC, FRC + SPIRO.TV, 'TV'),
    bracket(348, SPIRO.RV, FRC, 'ERV'),
    bracket(348, 0, SPIRO.RV, 'RV'),
    bracket(404, FRC, cap.TLC, 'IC', 'var(--diagram-green)'),
    bracket(404, 0, FRC, 'FRC', 'var(--diagram-green)'),
    bracket(460, SPIRO.RV, cap.TLC, 'VC', 'var(--diagram-accent)'),
    bracket(512, 0, cap.TLC, 'TLC', 'var(--diagram-red)'),
  ].join(''),
);

// 5. Oxygen dissociation curve (computed; illustrative model)
const px = (p) => 60 + p * 3.3;
const py = (s) => 230 - s * 1.9;
const curve = (p50) => {
  const pts = [];
  for (let p = 0; p <= 110; p += 1) pts.push(`${p ? 'L' : 'M'}${f1(px(p))} ${f1(py(saturation(p, p50)))}`);
  return pts.join(' ');
};
export const ODCURVE = svgDoc(
  460,
  280,
  `Oxygen dissociation curve: percentage saturation of haemoglobin with oxygen plotted against pO₂ is sigmoid. At the alveolar pO₂ of ${PP.alveoli.o2} mm Hg haemoglobin is about ${SAT.alveoli} percent saturated; at the tissue pO₂ of ${PP.tissues.o2} mm Hg about ${SAT.tissues} percent. More carbon dioxide, more hydrogen ions and a higher temperature shift the curve to the right (dashed), so at the same tissue pO₂ saturation falls to about ${SAT.tissuesRight} percent and more oxygen is released. Curve drawn from a standard model; values are illustrative`,
  [
    S.arrow(60, 234, 60, 30, { size: 6 }),
    S.arrow(56, 230, 440, 230, { size: 6 }),
    ...[0, 20, 40, 60, 80, 100].map((p) => S.line(px(p), 230, px(p), 234, { w: 1 }) + S.text(px(p), 246, String(p), { a: 'middle', size: 10 })),
    ...[0, 25, 50, 75, 100].map((s) => S.line(56, py(s), 60, py(s), { w: 1 }) + S.text(52, py(s) + 4, String(s), { a: 'end', size: 10 })),
    lab(250, 268, 'Partial pressure of oxygen, pO₂ (mm Hg)', { size: 10, a: 'middle' }),
    lab(64, 24, 'Percentage saturation of haemoglobin', { size: 10 }),
    S.path(curve(ODC.p50), { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(curve(ODC.p50Right), { c: 'var(--diagram-accent)', w: 2, dash: '6 4' }),
    S.line(px(PP.tissues.o2), 230, px(PP.tissues.o2), py(SAT.tissues), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(px(PP.alveoli.o2), 230, px(PP.alveoli.o2), py(SAT.alveoli), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.circle(px(PP.alveoli.o2), py(saturation(PP.alveoli.o2)), 4, { fill: 'var(--diagram-red)', sw: 0 }),
    S.circle(px(PP.tissues.o2), py(saturation(PP.tissues.o2)), 4, { fill: 'var(--diagram-red)', sw: 0 }),
    S.circle(px(PP.tissues.o2), py(saturation(PP.tissues.o2, ODC.p50Right)), 4, { fill: 'var(--diagram-accent)', sw: 0 }),
    lab(px(PP.alveoli.o2) - 4, py(SAT.alveoli) + 22, `Alveoli: pO₂ ${PP.alveoli.o2},`, { a: 'end', size: 10 }),
    lab(px(PP.alveoli.o2) - 4, py(SAT.alveoli) + 34, `about ${SAT.alveoli}% saturated`, { a: 'end', size: 10 }),
    lab(px(PP.tissues.o2) - 8, py(SAT.tissues) - 18, `Tissues: pO₂ ${PP.tissues.o2},`, { a: 'end', size: 10 }),
    lab(px(PP.tissues.o2) - 8, py(SAT.tissues) - 6, `about ${SAT.tissues}%`, { a: 'end', size: 10 }),
    lab(px(PP.tissues.o2) + 8, py(SAT.tissuesRight) + 14, `right shift: about ${SAT.tissuesRight}%`, { size: 10, c: 'var(--diagram-accent)' }),
    S.line(300, 176, 324, 176, { c: 'var(--diagram-red)', w: 2.5 }),
    lab(330, 180, 'normal curve', { size: 10 }),
    S.line(300, 194, 324, 194, { c: 'var(--diagram-accent)', w: 2, dash: '6 4' }),
    lab(330, 198, 'more CO₂, H⁺, heat', { size: 10 }),
  ].join(''),
);

export const ALL = { RESP, RESP_Q, ALVEOLUS, MECH, SPIROGRAM, ODCURVE };
