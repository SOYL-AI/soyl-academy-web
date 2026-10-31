// SVG diagrams for ISC 12 Biology ch11. PLASMODIUM is copied from cbse-12-biology-ch07/src/svgs.mjs (same author);
// FEVER (computed temperature curve), CONTACT (contact inhibition) and TUMOUR (benign and malignant) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { temp, bouts } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Life cycle of Plasmodium (two hosts)
const box = (x, y, w, h, t, fill) => S.rect(x, y, w, h, { rx: 8, fill, fop: 0.2, sw: 1.2 }) + t.map((s, i) => S.text(x + w / 2, y + 18 + i * 13, s, { a: 'middle', size: 10 })).join('');
export const PLASMODIUM = svgDoc(
  460,
  280,
  'Life cycle of the malaria parasite Plasmodium. In the human host: an infected female Anopheles mosquito injects sporozoites; they multiply in liver cells, then attack red blood cells, multiply there and burst them, releasing haemozoin that causes chill and high fever, recurring every 48 hours in vivax malaria; some parasites form gametocytes. In the mosquito: a female Anopheles takes up gametocytes with blood; fertilisation and development take place in its stomach; sporozoites collect in its salivary glands and are injected at the next bite',
  [
    S.text(110, 18, 'In the human host', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    S.text(350, 18, 'In the female Anopheles mosquito', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-blue)' }),
    box(20, 30, 180, 44, ['Sporozoites enter with the bite', '(infective stage)'], 'var(--diagram-red)'),
    box(20, 96, 180, 44, ['Multiply in liver cells'], 'var(--diagram-red)'),
    box(20, 162, 180, 56, ['Attack red blood cells; RBCs burst,', 'releasing haemozoin: chill and', 'high fever that recurs'], 'var(--diagram-red)'),
    box(20, 232, 180, 40, ['Gametocytes form in RBCs'], 'var(--diagram-red)'),
    box(260, 232, 180, 40, ['Mosquito takes up gametocytes'], 'var(--diagram-blue)'),
    box(260, 150, 180, 56, ['Fertilisation and development', 'in the mosquito’s stomach wall'], 'var(--diagram-blue)'),
    box(260, 62, 180, 56, ['Sporozoites move to the', 'salivary glands'], 'var(--diagram-blue)'),
    S.arrow(110, 74, 110, 94, { size: 6 }),
    S.arrow(110, 140, 110, 160, { size: 6 }),
    S.arrow(110, 218, 110, 230, { size: 6 }),
    S.arrow(200, 252, 258, 252, { size: 6, c: 'var(--diagram-accent)' }),
    S.arrow(350, 232, 350, 208, { size: 6 }),
    S.arrow(350, 150, 350, 120, { size: 6 }),
    S.arrow(258, 70, 202, 52, { size: 6, c: 'var(--diagram-accent)' }),
    lab(212, 40, 'bite', { size: 10, c: 'var(--diagram-accent)' }),
    lab(208, 268, 'bite', { size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch11
// 2. Malaria fever cycle (computed: Plasmodium vivax, bouts every 48 hours)
const HRS = 150;
const fx = (h) => 60 + (h / HRS) * 380;
const fy = (t) => 190 - (t - 36) * 30;
const FPTS = Array.from({ length: HRS * 2 + 1 }, (_, i) => i / 2).map((h) => [fx(h), fy(temp(h))]);
export const FEVER = svgDoc(
  460,
  240,
  'Body temperature of a patient with malaria caused by Plasmodium vivax over about six days: the temperature stays near 37 degrees Celsius and rises to about 40 degrees in bouts of high fever with chills that recur every 48 hours, each time infected red blood cells burst and release haemozoin',
  [
    S.line(60, 190, 445, 190, { w: 1.5 }), S.line(60, 190, 60, 30, { w: 1.5 }),
    ...[36, 37, 38, 39, 40].map((t) => S.text(54, fy(t) + 4, String(t), { a: 'end', size: 10 }) + S.line(60, fy(t), 445, fy(t), { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    S.path('M' + FPTS.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.2, c: 'var(--diagram-red)' }),
    ...bouts(HRS).map((h) => S.text(fx(h), 205, String(h), { a: 'middle', size: 10 })),
    ...bouts(HRS).slice(1).map((h) => S.text(fx(h), fy(40) - 8, 'RBCs burst', { a: 'middle', size: 10, c: 'var(--diagram-accent)' })),
    S.text(250, 230, 'Time (hours)', { a: 'middle', size: 11 }),
    S.text(66, 24, 'Body temperature (°C)', { size: 11 }),
  ].join(''),
);

// 3. Contact inhibition in culture
const cell = (x, y, c) => S.rect(x, y, 26, 16, { rx: 6, fill: c, fop: 0.45, sw: 1 });
export const CONTACT = svgDoc(
  460,
  200,
  'Cells growing on the floor of a culture dish. Normal cells divide until they touch their neighbours and then stop, forming a single layer: contact inhibition. Cancer cells have lost contact inhibition, so they keep dividing and pile up in many layers',
  [
    S.text(110, 22, 'Normal cells', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-green)' }),
    S.line(10, 150, 210, 150, { w: 2 }),
    ...Array.from({ length: 7 }, (_, i) => cell(12 + i * 28, 132, 'var(--diagram-green)')),
    S.text(110, 172, 'One layer: stop dividing on contact', { a: 'middle', size: 10 }),
    S.text(110, 186, '(contact inhibition)', { a: 'middle', size: 10 }),
    S.text(350, 22, 'Cancer cells', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    S.line(250, 150, 450, 150, { w: 2 }),
    ...[[0, 7], [1, 6], [2, 5], [3, 4], [4, 2]].flatMap(([row, n]) => Array.from({ length: n }, (_, i) => cell(252 + row * 10 + i * 28, 132 - row * 18, 'var(--diagram-red)'))),
    S.text(350, 172, 'Pile up in layers: no contact inhibition', { a: 'middle', size: 10 }),
    S.text(350, 186, '(uncontrolled division)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Benign and malignant tumours
const blob = (cx, cy, n, r0, c) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * 2 * Math.PI, rr = r0 * (0.4 + 0.5 * ((i * 7) % 5) / 4);
  return S.circle(cx + rr * Math.cos(a), cy + rr * Math.sin(a), 6, { fill: c, fop: 0.55, sw: 0.8 });
}).join('');
export const TUMOUR = svgDoc(
  460,
  220,
  'A benign tumour stays in its place inside a capsule and does not invade nearby tissue. A malignant tumour has no capsule; its cells invade surrounding tissue, enter a blood vessel and are carried to distant sites where they start new tumours: metastasis',
  [
    S.text(110, 22, 'Benign tumour', { a: 'middle', size: 12, w: 'bold' }),
    S.ellipse(110, 100, 62, 46, { fill: 'var(--diagram-fill)', sw: 2 }),
    blob(110, 100, 14, 34, 'var(--diagram-green)'),
    S.text(110, 170, 'Enclosed in a capsule;', { a: 'middle', size: 10 }),
    S.text(110, 184, 'stays where it started', { a: 'middle', size: 10 }),
    S.text(330, 22, 'Malignant tumour', { a: 'middle', size: 12, w: 'bold' }),
    blob(300, 90, 16, 40, 'var(--diagram-red)'),
    S.circle(352, 64, 6, { fill: 'var(--diagram-red)', fop: 0.55, sw: 0.8 }), S.circle(352, 122, 6, { fill: 'var(--diagram-red)', fop: 0.55, sw: 0.8 }),
    S.path('M380 30 C390 80 390 130 380 180', { w: 10, c: 'var(--diagram-red)', op: 0.25 }),
    S.circle(385, 110, 5, { fill: 'var(--diagram-red)', fop: 0.8, sw: 0.8 }), S.circle(388, 150, 5, { fill: 'var(--diagram-red)', fop: 0.8, sw: 0.8 }),
    S.arrow(392, 160, 430, 196, { w: 1.5 }),
    blob(436, 200, 6, 10, 'var(--diagram-red)'),
    S.text(398, 44, 'Blood vessel', { size: 10 }),
    S.text(280, 170, 'No capsule; invades tissue', { a: 'middle', size: 10 }),
    S.text(280, 184, 'and spreads (metastasis)', { a: 'middle', size: 10 }),
    S.text(424, 214, 'new tumour', { a: 'end', size: 10 }),
  ].join(''),
);

export const ALL = { PLASMODIUM, FEVER, CONTACT, TUMOUR };
