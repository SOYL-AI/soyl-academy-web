// SVG diagrams for ISC 11 Biology ch21 Chemical Coordination and Integration. Numbers on the graphs come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { LOW, GTT_TIMES, GN, GD, GTT_LIMITS, NORMAL_RANGE } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
const box = (x, y, w, h, lines, c = 'var(--diagram-fill)', o = {}) => S.rect(x, y, w, h, { rx: 6, fill: c, fop: 0.5, sw: 1.2 }) + lines.map((s, i) => S.text(x + w / 2, y + 15 + i * 12, s, { a: 'middle', size: 10, w: i === 0 && o.bold ? 'bold' : undefined })).join('');

// ---------------------------------------------------------------- the body and the glands
function body() {
  return (
    S.circle(240, 42, 28, { fill: 'var(--diagram-fill)', sw: 1.5 }) +
    S.rect(232, 68, 16, 16, { fill: 'var(--diagram-fill)', sw: 1.2 }) +
    S.path('M192 86 L288 86 L296 190 L276 214 L204 214 L184 190 Z', { fill: 'var(--diagram-fill)', w: 1.5 }) +
    S.path('M192 90 L160 170 M288 90 L320 170', { w: 9, c: 'var(--diagram-fill)', cap: 'round' }) +
    S.path('M192 90 L160 170 M288 90 L320 170', { w: 1.2, c: 'var(--diagram-muted)' }) +
    S.path('M212 214 L206 330 M268 214 L274 330', { w: 14, c: 'var(--diagram-fill)', cap: 'round' })
  );
}
const G = {
  hypothalamus: [240, 36], pituitary: [240, 48], pineal: [250, 30], thyroid: [240, 92], thymus: [240, 118], adrenalL: [218, 152], adrenalR: [262, 152],
  pancreas: [240, 172], ovaryL: [222, 200], ovaryR: [258, 200], testisL: [232, 232], testisR: [248, 232],
};
function glands() {
  return (
    S.circle(...G.hypothalamus, 4, { fill: 'var(--diagram-red)', fop: 0.7, sw: 0 }) +
    S.circle(...G.pituitary, 5, { fill: 'var(--diagram-blue)', fop: 0.7, sw: 0 }) +
    S.circle(...G.pineal, 3, { fill: 'var(--diagram-green)', fop: 0.8, sw: 0 }) +
    S.path('M228 94 C234 84 246 84 252 94 C246 98 234 98 228 94 Z', { fill: 'var(--diagram-yellow)', fop: 0.7, w: 1.2 }) +
    S.ellipse(...G.thymus, 14, 9, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1.2 }) +
    S.path('M210 160 L222 160 L220 146 L212 146 Z M258 160 L270 160 L268 146 L260 146 Z', { fill: 'var(--diagram-accent)', fop: 0.6, w: 1.2 }) +
    S.path('M214 170 C226 162 252 162 268 174 C256 180 228 182 214 170 Z', { fill: 'var(--diagram-brown)', fop: 0.5, w: 1.2 }) +
    S.ellipse(...G.ovaryL, 6, 4, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }) + S.ellipse(...G.ovaryR, 6, 4, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }) +
    S.ellipse(...G.testisL, 5, 7, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 1 }) + S.ellipse(...G.testisR, 5, 7, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 1 })
  );
}
export const ENDOCRINE = svgDoc(
  480,
  350,
  'The human body with the main endocrine glands marked: hypothalamus, pituitary and pineal in the head; thyroid and, behind it, the four parathyroids in the neck; thymus in the upper chest; two adrenal glands above the kidneys; pancreas behind the stomach; ovaries in the female pelvis and testes in the male scrotum',
  [
    body(), glands(),
    lab(10, 30, 'Hypothalamus', { w: 'bold' }), S.lead(88, 28, 236, 36),
    lab(10, 62, 'Pituitary gland', { w: 'bold' }), S.lead(92, 58, 235, 49),
    lab(310, 22, 'Pineal gland', { w: 'bold' }), S.lead(308, 22, 254, 30),
    lab(310, 74, 'Parathyroids (4, behind', { size: 10 }), lab(310, 86, 'the thyroid)', { size: 10 }), S.lead(308, 80, 253, 94),
    lab(310, 108, 'Thyroid gland', { w: 'bold' }), S.lead(308, 104, 254, 92),
    lab(10, 120, 'Thymus', { w: 'bold' }), S.lead(58, 116, 226, 118),
    lab(310, 150, 'Adrenal glands', { w: 'bold' }), S.lead(308, 146, 268, 152),
    lab(10, 176, 'Pancreas', { w: 'bold' }), S.lead(66, 172, 218, 172),
    lab(10, 206, 'Ovaries (female)', { w: 'bold' }), S.lead(100, 202, 214, 200),
    lab(310, 236, 'Testes (male)', { w: 'bold' }), S.lead(308, 232, 254, 232),
  ].join(''),
);
export const ENDOCRINE_Q = svgDoc(
  480,
  350,
  'The human body with five endocrine glands marked by letters: A the small gland at the base of the brain suspended by a stalk from the hypothalamus, B the butterfly-shaped gland on the windpipe in the neck, C the gland in the upper chest that is large in children and shrinks in old age, D the glands that sit above the kidneys, and E the gland lying behind the stomach that has both digestive and hormonal functions',
  [
    body(), glands(),
    tag(110, 40, 'A'), S.lead(119, 42, 234, 49),
    tag(350, 92, 'B'), S.lead(341, 92, 254, 92),
    tag(110, 118, 'C'), S.lead(119, 118, 226, 118),
    tag(350, 152, 'D'), S.lead(341, 152, 270, 152),
    tag(110, 176, 'E'), S.lead(119, 176, 216, 174),
  ].join(''),
);

// ---------------------------------------------------------------- hypothalamus and pituitary
export const PITUITARY = svgDoc(
  480,
  300,
  'The hypothalamus controls the pituitary in two ways. Releasing and inhibiting hormones made by the hypothalamus reach the anterior pituitary through the hypophysial portal vessels and control its hormones: growth hormone, prolactin, thyroid-stimulating hormone, adrenocorticotropic hormone, luteinising hormone and follicle-stimulating hormone. Nerve fibres from the hypothalamus run down the stalk to the posterior pituitary, which stores and releases oxytocin and vasopressin (ADH) made in the hypothalamus',
  [
    box(150, 12, 180, 34, ['Hypothalamus', 'makes releasing, inhibiting hormones'], 'var(--diagram-red)', { bold: true }),
    S.path('M150 46 C140 64 160 76 150 96 C142 106 150 112 150 116', { w: 2.5, c: 'var(--diagram-red)' }), S.head(150, 118, 1.57, { size: 6, c: 'var(--diagram-red)' }),
    S.line(330, 46, 330, 114, { w: 2.5, c: 'var(--diagram-blue)' }), S.head(330, 118, 1.57, { size: 6, c: 'var(--diagram-blue)' }),
    sm(164, 76, 'Portal vessels carry', { c: 'var(--diagram-red)' }), sm(164, 88, 'releasing hormones', { c: 'var(--diagram-red)' }),
    sm(346, 76, 'Nerve fibres carry', { c: 'var(--diagram-blue)' }), sm(346, 88, 'oxytocin and ADH', { c: 'var(--diagram-blue)' }),
    S.ellipse(150, 144, 50, 26, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1.5 }),
    S.ellipse(330, 144, 38, 26, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1.5 }),
    lab(150, 148, 'Anterior', { a: 'middle', w: 'bold' }), lab(330, 148, 'Posterior', { a: 'middle', w: 'bold' }),
    sm(150, 200, 'GH, prolactin, TSH,', { a: 'middle' }), sm(150, 212, 'ACTH, LH, FSH', { a: 'middle' }), sm(150, 232, 'Make and release their own', { a: 'middle', c: 'var(--diagram-muted)' }), sm(150, 244, 'hormones', { a: 'middle', c: 'var(--diagram-muted)' }),
    sm(330, 200, 'Oxytocin and ADH', { a: 'middle' }), sm(330, 232, 'Store and release hormones', { a: 'middle', c: 'var(--diagram-muted)' }), sm(330, 244, 'made in the hypothalamus', { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- feedback loop and its time course
export const FEEDBACK = svgDoc(
  480,
  250,
  'Negative feedback control of thyroxine. The hypothalamus releases TRH, which makes the anterior pituitary release TSH, which makes the thyroid release thyroxine (T3 and T4). When thyroxine rises, it acts back on the hypothalamus and pituitary to reduce TRH and TSH, so that thyroid secretion falls; when thyroxine falls, the inhibition is removed and secretion rises',
  [
    box(10, 80, 100, 44, ['Hypothalamus'], 'var(--diagram-red)', { bold: true }),
    box(140, 80, 100, 44, ['Anterior', 'pituitary'], 'var(--diagram-yellow)', { bold: true }),
    box(270, 80, 90, 44, ['Thyroid', 'gland'], 'var(--diagram-green)', { bold: true }),
    box(390, 80, 80, 44, ['Body', 'tissues'], 'var(--diagram-fill)', { bold: true }),
    S.arrow(110, 102, 138, 102, { size: 6 }), sm(124, 74, 'TRH', { a: 'middle' }),
    S.arrow(240, 102, 268, 102, { size: 6 }), sm(254, 74, 'TSH', { a: 'middle' }),
    S.arrow(360, 102, 388, 102, { size: 6 }), sm(374, 74, 'T3, T4', { a: 'middle' }),
    S.path('M315 80 L315 40 L60 40 L60 78', { w: 1.8, c: 'var(--diagram-red)', dash: '5 3' }), S.head(60, 80, 1.57, { size: 6, c: 'var(--diagram-red)' }),
    S.path('M315 40 L315 40', { w: 1 }),
    S.path('M190 40 L190 78', { w: 1.8, c: 'var(--diagram-red)', dash: '5 3' }), S.head(190, 80, 1.57, { size: 6, c: 'var(--diagram-red)' }),
    lab(188, 28, 'Negative feedback (stops further secretion)', { a: 'middle', c: 'var(--diagram-red)', w: 'bold' }),
    sm(240, 160, 'Thyroxine high: TRH and TSH fall, so the thyroid makes less.', { a: 'middle' }),
    sm(240, 176, 'Thyroxine low: the inhibition lifts, TRH and TSH rise, so the thyroid makes more.', { a: 'middle' }),
    sm(240, 200, 'Result: thyroxine stays near its set point.', { a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);
const FX = (i) => 60 + i * 44;
const FY = (v) => 200 - v;
export const FEEDBACK_CURVE = svgDoc(
  480,
  250,
  `Model of negative feedback after part of the thyroid is removed. Thyroxine starts at ${LOW[0].t4} percent of normal and TSH at ${LOW[0].tsh} percent. As thyroxine rises step by step to about ${Math.round(LOW[LOW.length - 1].t4)} percent, TSH falls back towards 100 percent, the normal level. The values are percent of the normal level`,
  [
    S.line(60, 200, 440, 200, { w: 1.2 }), S.line(60, 20, 60, 200, { w: 1.2 }),
    ...[0, 50, 100, 150].map((v) => sm(54, FY(v) + 3, String(v), { a: 'end' }) + S.line(60, FY(v), 440, FY(v), { w: 0.5, c: 'var(--diagram-muted)', dash: v === 100 ? '5 3' : '2 4' })),
    ...LOW.map((_, i) => sm(FX(i), 214, String(i), { a: 'middle' })),
    S.path('M' + LOW.map((p, i) => `${FX(i)} ${FY(p.t4)}`).join(' L'), { w: 2.5, c: 'var(--diagram-green)' }),
    S.path('M' + LOW.map((p, i) => `${FX(i)} ${FY(p.tsh)}`).join(' L'), { w: 2.5, c: 'var(--diagram-red)', dash: '6 3' }),
    ...LOW.map((p, i) => S.circle(FX(i), FY(p.t4), 2.5, { fill: 'var(--diagram-green)', sw: 0 }) + S.circle(FX(i), FY(p.tsh), 2.5, { fill: 'var(--diagram-red)', sw: 0 })),
    lab(140, FY(LOW[0].tsh) - 6, 'TSH', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(130, FY(LOW[2].t4) + 22, 'Thyroxine', { c: 'var(--diagram-green)', w: 'bold' }),
    sm(380, FY(100) + 18, 'Set point (100)', { c: 'var(--diagram-muted)' }),
    lab(250, 236, 'Steps (time)', { a: 'middle' }), sm(8, 16, 'Percent of normal level', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- blood glucose
export const GLUCOSE = svgDoc(
  480,
  300,
  `Control of blood glucose by the islets of Langerhans of the pancreas. After a meal the glucose level rises, the beta cells release insulin, and the liver, muscles and fat cells take up glucose and the liver makes glycogen, so the level falls. When the level falls the alpha cells release glucagon, the liver breaks glycogen down and makes glucose, so the level rises. The normal fasting level is about ${NORMAL_RANGE[0]} to ${NORMAL_RANGE[1]} milligrams per decilitre`,
  [
    box(150, 112, 180, 40, ['Blood glucose', `normal about ${NORMAL_RANGE[0]} to ${NORMAL_RANGE[1]} mg per dL`], 'var(--diagram-yellow)', { bold: true }),
    box(20, 12, 130, 40, ['Glucose rises', '(after a meal)'], 'var(--diagram-fill)'), box(180, 12, 120, 40, ['Beta cells:', 'insulin'], 'var(--diagram-blue)', { bold: true }), box(330, 12, 140, 52, ['Liver, muscle, fat take', 'up glucose; liver makes', 'glycogen'], 'var(--diagram-fill)'),
    S.arrow(150, 32, 178, 32, { size: 6 }), S.arrow(300, 32, 328, 32, { size: 6 }),
    S.path('M400 66 L400 130 L332 130', { w: 1.8, c: 'var(--diagram-blue)' }), S.head(332, 130, Math.PI, { size: 6, c: 'var(--diagram-blue)' }), sm(404, 100, 'glucose falls', { c: 'var(--diagram-blue)' }),
    S.path('M150 130 L80 130 L80 54', { w: 1.8, c: 'var(--diagram-muted)' }), S.head(80, 54, -1.57, { size: 6, c: 'var(--diagram-muted)' }),
    box(20, 248, 130, 40, ['Glucose falls', '(between meals)'], 'var(--diagram-fill)'), box(180, 248, 120, 40, ['Alpha cells:', 'glucagon'], 'var(--diagram-red)', { bold: true }), box(330, 236, 140, 52, ['Liver breaks glycogen', 'down and makes', 'glucose'], 'var(--diagram-fill)'),
    S.arrow(150, 268, 178, 268, { size: 6 }), S.arrow(300, 268, 328, 268, { size: 6 }),
    S.path('M400 234 L400 170 L300 170 L300 156', { w: 1.8, c: 'var(--diagram-red)' }), S.head(300, 154, -1.57, { size: 6, c: 'var(--diagram-red)' }), sm(404, 200, 'glucose rises', { c: 'var(--diagram-red)' }),
    S.path('M200 152 L200 170 L80 170 L80 244', { w: 1.8, c: 'var(--diagram-muted)' }), S.head(80, 246, 1.57, { size: 6, c: 'var(--diagram-muted)' }),
  ].join(''),
);
const TX = (t) => 70 + t * 170;
const TY = (g) => 220 - (g - 60) * 0.72;
const gttPath = (arr) => 'M' + arr.map((g, i) => `${TX(GTT_TIMES[i])} ${TY(g)}`).join(' L');
export const GTT = svgDoc(
  480,
  260,
  `Glucose tolerance test: blood glucose after a glucose drink in a normal subject (fasting ${GN[0]}, peak ${Math.max(...GN)}, ${GN[GN.length - 1]} at two hours) and in a subject with diabetes mellitus (fasting ${GD[0]}, peak ${Math.max(...GD)}, ${GD[GD.length - 1]} at two hours). The dashed lines mark the usual limits of ${GTT_LIMITS.fasting} fasting and ${GTT_LIMITS.twoHour} at two hours`,
  [
    S.line(70, 220, 440, 220, { w: 1.2 }), S.line(70, 20, 70, 220, { w: 1.2 }),
    ...[100, 150, 200, 250].map((g) => sm(64, TY(g) + 3, String(g), { a: 'end' }) + S.line(70, TY(g), 440, TY(g), { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...GTT_TIMES.map((t) => sm(TX(t), 234, String(t), { a: 'middle' })),
    S.line(70, TY(GTT_LIMITS.fasting), 440, TY(GTT_LIMITS.fasting), { w: 1, c: 'var(--diagram-red)', dash: '5 3' }), sm(444, TY(GTT_LIMITS.fasting) + 3, String(GTT_LIMITS.fasting), { c: 'var(--diagram-red)' }),
    S.line(70, TY(GTT_LIMITS.twoHour), 440, TY(GTT_LIMITS.twoHour), { w: 1, c: 'var(--diagram-red)', dash: '5 3' }), sm(444, TY(GTT_LIMITS.twoHour) + 3, String(GTT_LIMITS.twoHour), { c: 'var(--diagram-red)' }),
    S.path(gttPath(GN), { w: 2.5, c: 'var(--diagram-green)' }), S.path(gttPath(GD), { w: 2.5, c: 'var(--diagram-blue)' }),
    ...GTT_TIMES.map((t, i) => S.circle(TX(t), TY(GN[i]), 3, { fill: 'var(--diagram-green)', sw: 0 }) + S.circle(TX(t), TY(GD[i]), 3, { fill: 'var(--diagram-blue)', sw: 0 })),
    lab(300, TY(GN[2]) + 26, 'Normal', { c: 'var(--diagram-green)', w: 'bold' }), lab(300, TY(GD[3]) - 10, 'Diabetes mellitus', { c: 'var(--diagram-blue)', w: 'bold' }),
    lab(255, 254, 'Hours after the glucose drink', { a: 'middle' }), sm(8, 16, 'Blood glucose (mg per dL)', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// ---------------------------------------------------------------- mechanism of hormone action
export const MECHANISM = svgDoc(
  480,
  310,
  'Two ways in which hormones act. Left: a protein hormone cannot cross the cell membrane; it binds a receptor on the surface, which activates adenylyl cyclase through a G protein and makes cyclic AMP, the second messenger, from ATP; cyclic AMP activates enzymes and gives the response. Right: a steroid hormone passes through the membrane, binds an intracellular receptor, and the hormone-receptor complex enters the nucleus, binds DNA and switches genes on, so new mRNA and proteins are made',
  [
    S.line(10, 120, 230, 120, { w: 6, c: 'var(--diagram-muted)' }), S.line(250, 120, 470, 120, { w: 6, c: 'var(--diagram-muted)' }),
    lab(10, 20, 'Protein hormone', { w: 'bold' }), lab(250, 20, 'Steroid hormone', { w: 'bold' }),
    S.circle(40, 50, 9, { fill: 'var(--diagram-red)', fop: 0.7, sw: 1 }), sm(56, 54, 'Hormone (first messenger)', { c: 'var(--diagram-red)' }),
    S.path('M32 96 L32 120 M48 96 L48 120 M32 96 Q40 84 48 96', { w: 2.5, c: 'var(--diagram-blue)' }), sm(58, 100, 'Receptor on the surface', { c: 'var(--diagram-blue)' }),
    S.rect(62, 112, 58, 16, { rx: 7, fill: 'var(--diagram-yellow)', fop: 0.8, sw: 1.2 }), sm(91, 124, 'G protein', { a: 'middle' }),
    S.rect(126, 112, 96, 16, { rx: 4, fill: 'var(--diagram-green)', fop: 0.7, sw: 1.2 }), sm(174, 124, 'Adenylyl cyclase', { a: 'middle' }),
    sm(174, 150, 'ATP', { a: 'middle', c: 'var(--diagram-muted)' }), S.arrow(174, 154, 174, 172, { size: 5, w: 1.2 }),
    sm(174, 186, 'cyclic AMP', { a: 'middle', c: 'var(--diagram-brown)', w: 'bold' }), sm(174, 198, '(second messenger)', { a: 'middle', c: 'var(--diagram-brown)' }),
    S.arrow(174, 204, 174, 224, { size: 5, w: 1.2 }), sm(174, 238, 'Activates enzymes', { a: 'middle' }), S.arrow(174, 244, 174, 262, { size: 5, w: 1.2 }), sm(174, 276, 'Cell response', { a: 'middle', c: 'var(--diagram-muted)' }),
    S.circle(300, 50, 9, { fill: 'var(--diagram-red)', fop: 0.7, sw: 1 }), S.arrow(300, 62, 300, 150, { size: 6, w: 1.5, c: 'var(--diagram-red)', dash: '4 3' }), sm(316, 54, 'Passes through the membrane', { c: 'var(--diagram-red)' }),
    S.circle(300, 164, 14, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.5 }), sm(320, 168, 'Receptor in the cytoplasm', { c: 'var(--diagram-blue)' }),
    S.ellipse(390, 226, 80, 38, { fill: 'var(--diagram-fill)', sw: 1.5 }), sm(390, 208, 'Nucleus', { a: 'middle' }),
    S.arrow(310, 178, 340, 212, { size: 5, w: 1.2 }),
    S.path('M350 230 L430 230', { w: 3, c: 'var(--diagram-brown)' }), sm(390, 248, 'DNA: genes switched on', { a: 'middle' }),
    S.arrow(390, 266, 390, 280, { size: 5, w: 1.2 }), sm(390, 294, 'mRNA, then new proteins', { a: 'middle' }),
  ].join(''),
);

export const ALL = { ENDOCRINE, ENDOCRINE_Q, PITUITARY, FEEDBACK, FEEDBACK_CURVE, GLUCOSE, GTT, MECHANISM };
