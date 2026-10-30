// SVG schematics for ISC 12 Biology ch04 Reproductive Health (allow-listed elements, palette colours only), copied from
// cbse-12-biology-ch03/src/svgs.mjs (same author).
// Medical schematics are neutral and labelled; nothing is drawn beyond what the syllabus terms need.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { doublingSeries, fertileWindow } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

// 1. Copper IUD in the uterus (front view, schematic)
export const IUD = svgDoc(
  380,
  260,
  'A copper-releasing intrauterine device in the uterus, front view: a small T-shaped plastic frame with copper wire wound on its stem sits in the uterine cavity, and its threads pass through the cervix into the vagina so a doctor can check or remove it',
  [
    S.path('M110 50 C110 30 270 30 270 50 C270 110 232 158 216 182 L164 182 C148 158 110 110 110 50 Z', { fill: 'var(--diagram-red)', fop: 0.18, w: 2 }),
    S.path('M128 56 L252 56 L198 160 L182 160 Z', { fill: 'var(--diagram-fill)', c: 'var(--diagram-red)', w: 1.2 }),
    S.rect(172, 182, 36, 18, { fill: 'var(--diagram-red)', fop: 0.3 }),
    S.path('M174 200 L174 252 M206 200 L206 252', { w: 1.5 }),
    S.path('M146 66 L234 66', { w: 4, c: 'var(--diagram-blue)', cap: 'round' }),
    S.path('M190 66 L190 148', { w: 4, c: 'var(--diagram-blue)', cap: 'round' }),
    ...[0, 1, 2, 3, 4, 5, 6].map((i) => S.path(`M185 ${84 + i * 8} L195 ${88 + i * 8}`, { w: 2, c: 'var(--diagram-brown)' })),
    S.path('M190 148 C188 176 194 200 190 232', { w: 1, c: 'var(--diagram-muted)' }),
    S.path('M192 148 C196 176 186 200 194 232', { w: 1, c: 'var(--diagram-muted)' }),
    lab(4, 56, 'T-shaped', { c: 'var(--diagram-blue)' }),
    lab(4, 69, 'plastic frame', { c: 'var(--diagram-blue)' }),
    S.lead(80, 64, 146, 66),
    lab(4, 110, 'Copper wire', { c: 'var(--diagram-brown)' }),
    S.lead(70, 107, 184, 104),
    lab(4, 222, 'Threads through the cervix'),
    S.lead(146, 218, 190, 214),
    lab(300, 40, 'Uterus'),
    S.lead(298, 44, 262, 66),
    lab(300, 190, 'Cervix'),
    S.lead(298, 187, 210, 190),
    lab(300, 240, 'Vagina'),
    S.lead(298, 237, 208, 236),
  ].join(''),
);

// 2. Sterilisation: vasectomy and tubectomy (schematic ducts)
export const STERIL = svgDoc(
  460,
  210,
  'Surgical sterilisation, schematic. Left, vasectomy: a short piece of the vas deferens is removed and both cut ends are tied, so sperms from the testis cannot pass. Right, tubectomy: a short piece of the oviduct is removed and both ends are tied, so the ovum and sperms cannot meet',
  [
    S.text(110, 18, 'Vasectomy (male)', { a: 'middle', size: 12, w: 'bold' }),
    S.ellipse(40, 150, 22, 30, { fill: 'var(--diagram-fill)' }),
    S.path('M52 124 C70 96 80 80 90 74', { w: 3, c: 'var(--diagram-blue)' }),
    S.path('M126 62 C150 52 170 50 200 50', { w: 3, c: 'var(--diagram-blue)' }),
    ...[[90, 74], [126, 62]].map(([x, y]) => S.rect(x - 4, y - 5, 8, 10, { fill: 'var(--diagram-accent)', sw: 0 })),
    S.path('M98 70 L118 64', { w: 3, c: 'var(--diagram-blue)', dash: '3 4' }),
    lab(4, 196, 'Testis'),
    S.lead(26, 186, 34, 176),
    lab(150, 90, 'Vas deferens', { c: 'var(--diagram-blue)' }),
    lab(76, 112, 'Cut and tied', { c: 'var(--diagram-accent)' }),
    S.lead(100, 102, 108, 72),
    lab(150, 130, 'Piece removed'),
    lab(150, 143, '(dashed)'),
    S.lead(148, 128, 112, 70),
    S.text(340, 18, 'Tubectomy (female)', { a: 'middle', size: 12, w: 'bold' }),
    S.path('M420 150 C420 120 448 120 448 150 C448 180 420 180 420 150 Z', { fill: 'var(--diagram-red)', fop: 0.2, w: 1.5 }),
    S.path('M420 140 C400 120 390 110 376 104', { w: 3, c: 'var(--diagram-red)' }),
    S.path('M340 92 C320 86 300 90 286 104', { w: 3, c: 'var(--diagram-red)' }),
    S.path('M286 104 l-8 6 M286 104 l-4 9 M286 104 l2 10', { w: 1.2, c: 'var(--diagram-red)' }),
    ...[[376, 104], [340, 92]].map(([x, y]) => S.rect(x - 4, y - 5, 8, 10, { fill: 'var(--diagram-accent)', sw: 0 })),
    S.path('M368 101 L348 94', { w: 3, c: 'var(--diagram-red)', dash: '3 4' }),
    S.ellipse(292, 140, 16, 10, { fill: 'var(--diagram-fill)' }),
    lab(434, 200, 'Uterus', { a: 'middle' }),
    S.lead(434, 190, 434, 176),
    lab(268, 178, 'Ovary'),
    S.lead(284, 168, 290, 150),
    lab(250, 60, 'Oviduct', { c: 'var(--diagram-red)' }),
    lab(330, 140, 'Cut and tied', { c: 'var(--diagram-accent)' }),
    S.lead(356, 130, 358, 104),
  ].join(''),
);

// 3. Amniocentesis (schematic)
export const AMNIO = svgDoc(
  460,
  250,
  'Amniocentesis, schematic: a fine needle passes through the mother’s abdominal wall and the wall of the uterus into the amniotic sac and draws a small sample of amniotic fluid, which contains cells shed by the foetus; the foetus floats in the fluid, joined to the placenta by the umbilical cord',
  [
    '<g transform="translate(80 0)">',
    S.path('M40 30 C40 140 60 230 190 236 C320 230 340 140 340 30', { w: 2, c: 'var(--diagram-muted)' }),
    S.ellipse(190, 140, 120, 86, { fill: 'var(--diagram-red)', fop: 0.18, w: 1.5 }),
    S.ellipse(190, 144, 104, 72, { fill: 'var(--diagram-blue)', fop: 0.15, w: 1 }),
    S.path('M246 82 C276 86 296 106 300 130 C284 128 264 112 250 100 C244 94 244 88 246 82 Z', { fill: 'var(--diagram-red)', fop: 0.5, w: 1.2 }),
    S.circle(160, 132, 22, { fill: 'var(--diagram-yellow)', fop: 0.35 }),
    S.ellipse(178, 172, 30, 26, { fill: 'var(--diagram-yellow)', fop: 0.35 }),
    S.path('M268 108 C244 128 224 150 204 164', { w: 2.5, c: 'var(--diagram-blue)' }),
    S.line(110, 26, 132, 110, { w: 2 }),
    S.rect(98, 8, 24, 18, { rx: 3, fill: 'var(--diagram-fill)', sw: 1.2 }),
    S.circle(132, 108, 2.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    '</g>',
    lab(4, 20, 'Syringe and'),
    lab(4, 33, 'fine needle'),
    S.lead(70, 24, 176, 18),
    lab(4, 90, 'Abdominal wall'),
    S.lead(86, 94, 124, 104),
    lab(4, 150, 'Amniotic fluid'),
    lab(4, 163, '(foetal cells)'),
    S.lead(80, 154, 196, 160),
    lab(456, 30, 'Placenta', { a: 'end' }),
    S.lead(408, 34, 352, 92),
    lab(456, 150, 'Umbilical', { a: 'end' }),
    lab(456, 163, 'cord', { a: 'end' }),
    S.lead(404, 156, 316, 140),
    lab(456, 210, 'Foetus', { a: 'end' }),
    S.lead(414, 206, 286, 182),
    lab(270, 248, 'Uterus wall', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Population growth at a constant rate (computed points)
const G = doublingSeries(100, 2, 105);
const PX = 60;
const PY = 190;
const sx = (t) => PX + t * 3;
const sy = (p) => PY - (p - 100) * (150 / 700);
export const GROWTH = svgDoc(
  420,
  240,
  `A population of 100 growing at a constant 2 percent per year: the curve bends upwards, doubling to 200 after about ${G.doubling} years, to 400 after about ${2 * G.doubling} years and to 800 after about ${3 * G.doubling} years`,
  [
    S.line(PX, PY, PX + 330, PY, { w: 1 }),
    S.line(PX, PY, PX, 26, { w: 1 }),
    ...[0, 35, 70, 105].map((t) => S.text(sx(t), PY + 16, String(t), { a: 'middle', size: 10 })),
    S.text(PX + 165, PY + 32, 'Years', { a: 'middle', size: 11 }),
    ...[100, 200, 400, 800].map((p) => S.text(PX - 6, sy(p) + 4, String(p), { a: 'end', size: 10 }) + S.line(PX, sy(p), PX + 330, sy(p), { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    S.text(PX, 16, 'Population', { a: 'middle', size: 11 }),
    S.path(G.points.map(([t, p], i) => `${i ? 'L' : 'M'}${f1(sx(t))} ${f1(sy(p))}`).join(' '), { w: 2.5, c: 'var(--diagram-accent)' }),
    ...[1, 2, 3].map((k) => S.circle(sx(k * G.doubling), sy(100 * 2 ** k), 4, { fill: 'var(--diagram-accent)', sw: 0 })),
    lab(sx(G.doubling) + 6, sy(200) - 8, `×2 at about ${G.doubling} years`, { size: 10 }),
    lab(sx(2 * G.doubling) - 112, sy(400) - 6, `×4 at about ${2 * G.doubling}`, { size: 10 }),
    lab(sx(3 * G.doubling) - 98, sy(800) + 4, `×8 at about ${3 * G.doubling}`, { size: 10 }),
  ].join(''),
);

// 5. Fertile window in a regular 28-day cycle (computed)
const FW = fertileWindow(28);
export const CALENDAR = svgDoc(
  420,
  190,
  `A 28-day cycle drawn as four rows of seven days. Days 1 to 5 are marked as menstrual flow. Days ${FW.from} to ${FW.to}, around ovulation on day 14, are marked as the fertile period that couples avoid in the periodic abstinence method`,
  [
    ...Array.from({ length: 28 }, (_, i) => {
      const d = i + 1;
      const x = 20 + (i % 7) * 52;
      const y = 20 + Math.floor(i / 7) * 34;
      const fill = d <= 5 ? 'var(--diagram-red)' : d >= FW.from && d <= FW.to ? 'var(--diagram-yellow)' : 'var(--diagram-fill)';
      const fop = d <= 5 ? 0.35 : d >= FW.from && d <= FW.to ? 0.5 : 1;
      return S.rect(x, y, 46, 28, { rx: 4, fill, fop, sw: d === 14 ? 2.5 : 1, c: d === 14 ? 'var(--diagram-accent)' : 'currentColor' }) + S.text(x + 23, y + 18, String(d), { a: 'middle', size: 11 });
    }),
    S.rect(20, 160, 16, 12, { fill: 'var(--diagram-red)', fop: 0.35, sw: 1 }),
    lab(42, 170, 'Menstrual flow'),
    S.rect(150, 160, 16, 12, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    lab(172, 170, `Fertile period (days ${FW.from}–${FW.to})`),
    S.rect(330, 160, 16, 12, { fill: 'var(--diagram-fill)', sw: 2.5, c: 'var(--diagram-accent)' }),
    lab(352, 170, 'Ovulation'),
  ].join(''),
);

export const ALL = { IUD, STERIL, AMNIO, GROWTH, CALENDAR };
