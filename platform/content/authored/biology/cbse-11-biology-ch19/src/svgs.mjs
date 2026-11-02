// SVG diagrams for ch19 Chemical Coordination and Integration (allow-listed elements, palette colours only).
// Human body parts are neutral, labelled schematics (not to scale).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { curve, NORMAL, DIABETIC, RENAL_THRESHOLD } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const labs = (x, y, arr, o) => S.lines(x, y, arr, { size: 11, dy: 13, ...o });

// 1. Endocrine glands of the human body
export const ENDOCRINE = svgDoc(
  440,
  380,
  'Location of the human endocrine glands, front view, schematic: the hypothalamus at the base of the forebrain with the pituitary hanging below it by a stalk; the pineal gland on the dorsal side of the forebrain; the thyroid with two lobes on either side of the trachea joined by an isthmus, and four parathyroid glands on its back; the thymus behind the sternum between the lungs; an adrenal gland on top of each kidney; the pancreas below the stomach; the ovaries in the female pelvis (testes lie in the scrotum in males)',
  [
    S.ellipse(220, 60, 36, 42, { c: 'var(--diagram-muted)' }),
    S.ellipse(220, 50, 26, 22, { c: 'var(--diagram-muted)', dash: '3 3', sw: 1 }),
    S.rect(206, 101, 28, 20, { c: 'var(--diagram-muted)', sw: 1.2 }),
    S.path('M150 132 C160 120 280 120 290 132 L300 260 C300 300 282 330 262 342 L178 342 C158 330 140 300 140 260 Z', { c: 'var(--diagram-muted)', w: 1.5 }),
    S.ellipse(220, 63, 8, 4, { fill: 'var(--diagram-accent)', fop: 0.8, sw: 1 }),
    S.line(220, 67, 220, 71, { w: 1.5 }),
    S.circle(220, 75, 4, { fill: 'var(--diagram-red)', fop: 0.8, sw: 1 }),
    S.circle(233, 50, 3.5, { fill: 'var(--diagram-brown)', fop: 0.8, sw: 1 }),
    S.ellipse(211, 111, 7, 10, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1 }),
    S.ellipse(229, 111, 7, 10, { fill: 'var(--diagram-red)', fop: 0.45, sw: 1 }),
    S.rect(216, 112, 8, 5, { fill: 'var(--diagram-red)', fop: 0.45, sw: 0.8 }),
    ...[[207, 106], [207, 117], [233, 106], [233, 117]].map(([x, y]) => S.circle(x, y, 2.2, { fill: 'var(--diagram-yellow)', sw: 0.6 })),
    S.path('M220 140 C206 140 204 160 212 168 C216 170 220 166 220 160 C220 166 224 170 228 168 C236 160 234 140 220 140 Z', { fill: 'var(--diagram-green)', fop: 0.4, w: 1 }),
    S.ellipse(190, 242, 12, 18, { fill: 'var(--diagram-brown)', fop: 0.2, sw: 1 }),
    S.ellipse(250, 242, 12, 18, { fill: 'var(--diagram-brown)', fop: 0.2, sw: 1 }),
    S.path('M180 226 C182 214 198 214 200 226 Z', { fill: 'var(--diagram-accent)', fop: 0.7, w: 1 }),
    S.path('M240 226 C242 214 258 214 260 226 Z', { fill: 'var(--diagram-accent)', fop: 0.7, w: 1 }),
    S.ellipse(226, 278, 32, 7, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    S.ellipse(196, 312, 8, 5, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }),
    S.ellipse(244, 312, 8, 5, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }),
    lab(8, 58, 'Hypothalamus', { c: 'var(--diagram-accent)' }), S.lead(84, 59, 211, 63),
    lab(8, 88, 'Pituitary', { c: 'var(--diagram-red)' }), S.lead(58, 85, 215, 76),
    lab(8, 115, 'Thyroid', { c: 'var(--diagram-red)' }), S.lead(52, 112, 203, 111),
    lab(8, 156, 'Thymus', { c: 'var(--diagram-green)' }), S.lead(50, 153, 207, 154),
    lab(8, 214, 'Adrenal gland', { c: 'var(--diagram-accent)' }), S.lead(84, 214, 183, 221),
    lab(8, 282, 'Pancreas'), S.lead(58, 279, 194, 278),
    lab(8, 316, 'Ovary (female)', { c: 'var(--diagram-blue)' }), S.lead(88, 313, 187, 312),
    lab(432, 40, 'Pineal gland', { a: 'end', c: 'var(--diagram-brown)' }), S.lead(364, 37, 236, 49),
    labs(432, 100, ['Parathyroid glands', '(four, on the back', 'of the thyroid)'], { a: 'end' }), S.lead(322, 110, 236, 107),
    lab(432, 245, 'Kidney', { a: 'end' }), S.lead(392, 242, 262, 242),
    S.text(220, 370, 'Testes lie in the scrotum in males', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Hypothalamus–pituitary axis
const ox = 40;
const X = (x) => x + ox;
export const AXIS = svgDoc(
  520,
  320,
  'Hypothalamus and pituitary, schematic: one group of hypothalamic neurosecretory cells releases releasing and inhibiting hormones into a primary capillary bed at the base of the hypothalamus; hypophysial portal veins carry them down the stalk to capillaries in the anterior pituitary (pars distalis), which secretes GH, PRL, TSH, ACTH, LH and FSH. A second group of neurosecretory cells makes oxytocin and vasopressin, which travel down their axons in the stalk and are stored in and released from the posterior pituitary (pars nervosa). The pars intermedia lies between the lobes',
  [
    S.rect(X(120), 18, 240, 74, { rx: 22, fill: 'var(--diagram-fill)', c: 'var(--diagram-muted)' }),
    S.text(X(240), 36, 'Hypothalamus', { a: 'middle', size: 12, w: 'bold' }),
    S.path(`M${X(215)} 92 L${X(225)} 162 M${X(265)} 92 L${X(255)} 162`, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.ellipse(X(195), 220, 68, 55, { fill: 'var(--diagram-red)', fop: 0.15, c: 'var(--diagram-red)', sw: 1.5 }),
    S.ellipse(X(300), 214, 46, 46, { fill: 'var(--diagram-blue)', fop: 0.15, c: 'var(--diagram-blue)', sw: 1.5 }),
    S.ellipse(X(256), 214, 7, 38, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    // releasing-hormone neurons and portal system
    S.circle(X(170), 60, 6, { fill: 'var(--diagram-blue)', fop: 0.7, sw: 1 }),
    S.circle(X(192), 70, 6, { fill: 'var(--diagram-blue)', fop: 0.7, sw: 1 }),
    S.path(`M${X(170)} 66 C${X(176)} 82 ${X(214)} 86 ${X(224)} 98 M${X(192)} 76 C${X(198)} 86 ${X(216)} 90 ${X(226)} 98`, { c: 'var(--diagram-blue)', w: 1.3 }),
    S.path(`M${X(222)} 102 c4 -6 8 6 12 0 c4 -6 8 6 12 0`, { c: 'var(--diagram-red)', w: 1.5 }),
    S.path(`M${X(228)} 106 C${X(228)} 140 ${X(214)} 160 ${X(200)} 186 M${X(236)} 106 C${X(236)} 140 ${X(222)} 166 ${X(210)} 188`, { c: 'var(--diagram-red)', w: 1.8 }),
    S.path(`M${X(170)} 200 c6 -8 12 8 18 0 c6 -8 12 8 18 0 c6 -8 12 8 18 0 M${X(170)} 214 c6 -8 12 8 18 0 c6 -8 12 8 18 0 c6 -8 12 8 18 0`, { c: 'var(--diagram-red)', w: 1.3 }),
    S.arrow(X(170), 252, X(140), 280, { c: 'var(--diagram-red)', size: 6 }),
    // oxytocin and vasopressin neurons
    S.circle(X(288), 58, 6, { fill: 'var(--diagram-accent)', fop: 0.7, sw: 1 }),
    S.circle(X(310), 68, 6, { fill: 'var(--diagram-accent)', fop: 0.7, sw: 1 }),
    S.path(`M${X(288)} 64 C${X(270)} 84 ${X(248)} 100 ${X(246)} 140 C${X(246)} 170 ${X(270)} 190 ${X(292)} 206 M${X(310)} 74 C${X(286)} 92 ${X(254)} 110 ${X(252)} 140 C${X(252)} 166 ${X(280)} 184 ${X(304)} 214`, { c: 'var(--diagram-accent)', w: 1.3 }),
    S.circle(X(292), 206, 3, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.circle(X(304), 214, 3, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.arrow(X(320), 250, X(345), 280, { c: 'var(--diagram-accent)', size: 6 }),
    labs(8, 46, ['Cells making', 'releasing and', 'inhibiting hormones'], { c: 'var(--diagram-blue)' }), S.lead(118, 60, X(163), 60),
    labs(8, 100, ['Primary capillaries', '(base of hypothalamus)'], { c: 'var(--diagram-red)' }), S.lead(132, 104, X(220), 102),
    labs(8, 148, ['Hypophysial', 'portal veins'], { c: 'var(--diagram-red)' }), S.lead(80, 148, X(222), 144),
    labs(8, 226, ['Anterior pituitary', '(pars distalis)'], { c: 'var(--diagram-red)' }), S.lead(106, 226, X(140), 220),
    lab(8, 300, 'Secretes GH, PRL, TSH, ACTH, LH, FSH', { c: 'var(--diagram-red)' }),
    labs(512, 46, ['Cells making', 'oxytocin and', 'vasopressin'], { a: 'end', c: 'var(--diagram-accent)' }), S.lead(438, 60, X(318), 66),
    labs(512, 132, ['Neurosecretory', 'axons in the stalk'], { a: 'end', c: 'var(--diagram-accent)' }), S.lead(408, 136, X(254), 140),
    labs(512, 208, ['Posterior pituitary', '(pars nervosa)'], { a: 'end', c: 'var(--diagram-blue)' }), S.lead(408, 212, X(338), 212),
    lab(512, 300, 'Stores and releases oxytocin, vasopressin', { a: 'end', c: 'var(--diagram-accent)' }),
    S.text(X(256), 284, 'Pars intermedia (MSH)', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.lead(X(256), 274, X(256), 253),
  ].join(''),
);

// 3. Mechanism of hormone action
const box = (x, y, w, h, lines, c) => S.rect(x, y, w, h, { rx: 6, fill: 'var(--diagram-fill)', c: c ?? 'var(--diagram-muted)', sw: 1 }) + S.lines(x + w / 2, y + 15, lines, { a: 'middle', size: 10, dy: 12 });
export const ACTION = svgDoc(
  500,
  310,
  'Mechanism of hormone action. (a) A protein, peptide or amino-acid-derived hormone binds a membrane-bound receptor on the target cell and does not enter; a second messenger such as cyclic AMP, IP3 or calcium ions is generated inside and causes biochemical changes, leading to physiological and developmental responses. (b) A steroid hormone or iodothyronine enters the cell and binds an intracellular, mostly nuclear, receptor; the hormone–receptor complex acts on the genome, changing gene expression so that new proteins are made, leading to responses',
  [
    S.text(127, 16, '(a) Membrane-bound receptor', { a: 'middle', size: 11, w: 'bold' }),
    S.text(127, 30, 'peptide, protein, amine hormones', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.rect(22, 70, 210, 228, { rx: 18, fill: 'var(--diagram-fill)', fop: 0.5, c: 'var(--diagram-muted)', sw: 2.5 }),
    S.circle(127, 50, 8, { fill: 'var(--diagram-red)', fop: 0.7, sw: 1 }),
    S.text(140, 54, 'Hormone', { size: 10 }),
    S.path('M115 62 L115 80 L139 80 L139 62', { c: 'var(--diagram-blue)', w: 3 }),
    S.text(110, 60, 'Receptor', { a: 'end', size: 10, c: 'var(--diagram-blue)' }),
    S.arrow(127, 84, 127, 104, { size: 6 }),
    box(42, 106, 170, 40, ['Second messenger', '(cAMP, IP3, calcium ions)'], 'var(--diagram-accent)'),
    S.arrow(127, 148, 127, 168, { size: 6 }),
    box(42, 170, 170, 40, ['Biochemical changes', '(e.g. enzymes activated)']),
    S.arrow(127, 212, 127, 232, { size: 6 }),
    box(42, 234, 170, 40, ['Physiological and', 'developmental responses']),
    S.text(372, 16, '(b) Intracellular receptor', { a: 'middle', size: 11, w: 'bold' }),
    S.text(372, 30, 'steroids and iodothyronines', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.rect(262, 70, 220, 228, { rx: 18, fill: 'var(--diagram-fill)', fop: 0.5, c: 'var(--diagram-muted)', sw: 2.5 }),
    S.circle(300, 50, 8, { fill: 'var(--diagram-yellow)', fop: 0.8, sw: 1 }),
    S.text(314, 54, 'Hormone enters the cell', { size: 10 }),
    S.arrow(300, 60, 330, 112, { size: 6 }),
    S.ellipse(380, 142, 88, 36, { fill: 'var(--diagram-blue)', fop: 0.12, c: 'var(--diagram-blue)', sw: 1.5 }),
    S.lines(390, 132, ['Nucleus: hormone–receptor', 'complex acts on genes'], { a: 'middle', size: 10, dy: 13 }),
    S.arrow(372, 180, 372, 198, { size: 6 }),
    box(287, 200, 170, 28, ['mRNA and new proteins']),
    S.arrow(372, 230, 372, 242, { size: 6 }),
    box(287, 244, 170, 40, ['Physiological and', 'developmental responses']),
  ].join(''),
);

// 4. Blood glucose after a glucose drink (illustrative curves computed in calc.mjs)
const gx = (t) => 60 + t * 2;
const gy = (v) => 240 - (v - 50) * 0.84;
const trace = (f) => {
  const pts = [];
  for (let t = 0; t <= 180; t += 5) pts.push(`${pts.length ? 'L' : 'M'}${gx(t).toFixed(1)} ${gy(f(t)).toFixed(1)}`);
  return pts.join(' ');
};
export const GLUCOSE = svgDoc(
  460,
  285,
  `Illustrative blood glucose after a glucose drink. In a healthy person glucose rises from about ${NORMAL.base} to a peak of about ${NORMAL.base + NORMAL.rise} mg per dL and returns close to the fasting value within two hours, because insulin drives glucose into liver and fat cells. In a person with untreated diabetes mellitus the fasting level is higher (about ${DIABETIC.base}), the peak reaches about ${DIABETIC.base + DIABETIC.rise}, and glucose stays above the kidney threshold (about ${RENAL_THRESHOLD}) for a long time, so glucose appears in the urine`,
  [
    S.arrow(60, 244, 60, 26, { size: 6 }), S.arrow(56, 240, 440, 240, { size: 6 }),
    ...[0, 60, 120, 180].map((t) => S.line(gx(t), 240, gx(t), 245, { w: 1 }) + S.text(gx(t), 257, String(t), { a: 'middle', size: 10 })),
    ...[100, 200, 300].map((v) => S.line(55, gy(v), 60, gy(v), { w: 1 }) + S.text(52, gy(v) + 4, String(v), { a: 'end', size: 10 })),
    S.line(60, gy(RENAL_THRESHOLD), 430, gy(RENAL_THRESHOLD), { c: 'var(--diagram-accent)', w: 1.2, dash: '5 4' }),
    S.text(430, gy(RENAL_THRESHOLD) + 15, `Kidney threshold (about ${RENAL_THRESHOLD})`, { a: 'end', size: 10, c: 'var(--diagram-accent)' }),
    S.path(trace(curve(NORMAL)), { c: 'var(--diagram-blue)', w: 2.5 }),
    S.path(trace(curve(DIABETIC)), { c: 'var(--diagram-red)', w: 2.5 }),
    S.text(300, 78, 'Untreated diabetes', { size: 11, c: 'var(--diagram-red)', w: 'bold' }),
    S.text(290, 226, 'Healthy person', { size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
    S.text(64, 20, 'Blood glucose (mg per dL)', { size: 10 }),
    S.text(250, 278, 'Time after a glucose drink (minutes); illustrative values', { a: 'middle', size: 10 }),
  ].join(''),
);

export const ALL = { ENDOCRINE, AXIS, ACTION, GLUCOSE };
