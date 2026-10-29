// SVG diagrams for ch07 Human Health and Disease (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { series, peakIn } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

// 1. Life cycle of Plasmodium (two hosts)
const box = (x, y, w, h, t, fill) => S.rect(x, y, w, h, { rx: 8, fill, fop: 0.2, sw: 1.2 }) + t.map((s, i) => S.text(x + w / 2, y + 18 + i * 13, s, { a: 'middle', size: 10 })).join('');
export const PLASMODIUM = svgDoc(
  460,
  280,
  'Life cycle of the malaria parasite Plasmodium. In the human host: an infected female Anopheles mosquito injects sporozoites; they multiply in liver cells, then attack red blood cells, multiply there and burst them, releasing haemozoin that causes chill and high fever every three to four days; some parasites form gametocytes. In the mosquito: a female Anopheles takes up gametocytes with blood; fertilisation and development take place in its stomach; sporozoites collect in its salivary glands and are injected at the next bite',
  [
    S.text(110, 18, 'In the human host', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    S.text(350, 18, 'In the female Anopheles mosquito', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-blue)' }),
    box(20, 30, 180, 44, ['Sporozoites enter with the bite', '(infective stage)'], 'var(--diagram-red)'),
    box(20, 96, 180, 44, ['Multiply in liver cells'], 'var(--diagram-red)'),
    box(20, 162, 180, 56, ['Attack red blood cells; RBCs burst,', 'releasing haemozoin: chill and', 'fever every 3–4 days'], 'var(--diagram-red)'),
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

// 2. Antibody structure (H2L2)
export const ANTIBODY = svgDoc(
  400,
  260,
  'Structure of an antibody molecule: Y-shaped, made of four polypeptide chains — two long heavy chains forming the stem and inner arms, and two short light chains on the outer arms — joined by disulfide bonds; the tips of the two arms are antigen-binding sites',
  [
    S.path('M190 240 L190 130 L120 50', { w: 10, c: 'var(--diagram-blue)', cap: 'round', join: 'round' }),
    S.path('M210 240 L210 130 L280 50', { w: 10, c: 'var(--diagram-blue)', cap: 'round', join: 'round' }),
    S.path('M160 128 L100 62', { w: 8, c: 'var(--diagram-green)', cap: 'round' }),
    S.path('M240 128 L300 62', { w: 8, c: 'var(--diagram-green)', cap: 'round' }),
    S.line(190, 150, 210, 150, { w: 2, c: 'var(--diagram-accent)' }),
    S.line(190, 160, 210, 160, { w: 2, c: 'var(--diagram-accent)' }),
    S.line(150, 100, 166, 110, { w: 2, c: 'var(--diagram-accent)' }),
    S.line(250, 100, 234, 110, { w: 2, c: 'var(--diagram-accent)' }),
    S.circle(108, 46, 14, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1, dash: '3 2' }),
    S.circle(292, 46, 14, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1, dash: '3 2' }),
    lab(4, 20, 'Antigen-binding site'),
    S.lead(70, 24, 96, 40),
    lab(4, 110, 'Light chain', { c: 'var(--diagram-green)' }),
    S.lead(64, 106, 116, 82),
    lab(300, 150, 'Heavy chain', { c: 'var(--diagram-blue)' }),
    S.lead(298, 146, 214, 180),
    lab(230, 230, 'Disulfide bonds', { c: 'var(--diagram-accent)' }),
    S.lead(228, 226, 206, 162),
    S.text(200, 256, 'H₂L₂: two heavy and two light chains', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Primary and secondary immune responses (computed)
const PTS = series(70);
const P1 = peakIn(PTS, 0, 39);
const P2 = peakIn(PTS, 40, 70);
const GX = 50;
const GY = 200;
const sx = (d) => GX + d * 5;
const sy = (v) => GY - v * 0.9;
export const RESPONSE = svgDoc(
  440,
  240,
  `Antibody level in the blood after a first and a second exposure to the same antigen: the primary response, after the first exposure on day 0, rises slowly to a low peak (about ${P1} units); the secondary response, after the second exposure on day 40, rises quickly to a much higher peak (about ${P2} units)`,
  [
    S.line(GX, GY, GX + 360, GY, { w: 1 }),
    S.line(GX, GY, GX, 20, { w: 1 }),
    ...[0, 10, 20, 30, 40, 50, 60, 70].map((d) => S.text(sx(d), GY + 14, String(d), { a: 'middle', size: 10 })),
    S.text(GX + 180, GY + 30, 'Days', { a: 'middle', size: 11 }),
    S.text(GX + 4, 16, 'Antibody level', { size: 11 }),
    S.path(PTS.map(([d, v], i) => `${i ? 'L' : 'M'}${f1(sx(d))} ${f1(sy(v))}`).join(' '), { w: 2.5, c: 'var(--diagram-accent)' }),
    S.arrow(sx(0), GY - 40, sx(0), GY - 4, { size: 6, c: 'var(--diagram-blue)' }),
    S.arrow(sx(40), GY - 40, sx(40), GY - 4, { size: 6, c: 'var(--diagram-blue)' }),
    lab(sx(0) + 4, GY - 44, '1st exposure', { size: 10, c: 'var(--diagram-blue)' }),
    lab(sx(40) - 70, GY - 44, '2nd exposure', { size: 10, c: 'var(--diagram-blue)' }),
    lab(sx(8), sy(P1) - 8, 'Primary response (low)', { size: 10 }),
    lab(sx(46), sy(P2) - 6, 'Secondary response (high, fast)', { size: 10 }),
  ].join(''),
);

export const ALL = { PLASMODIUM, ANTIBODY, RESPONSE };
