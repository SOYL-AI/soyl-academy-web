// SVG diagrams for ISC 12 Biology ch12. ANTIBODY and RESPONSE are copied from cbse-12-biology-ch07/src/svgs.mjs (same
// author); HIVCYCLE (replication of HIV in a helper T-cell) and ELISA (plate with computed positives) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { series, peakIn, elisa } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

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


// ---------------------------------------------------------------- new for ISC ch12
// 4. Replication of HIV in a host cell
const step = (x, y, n, lines, c) => S.circle(x, y, 9, { fill: c, fop: 0.35, sw: 1 }) + S.text(x, y + 4, String(n), { a: 'middle', size: 10, w: 'bold' }) + lines.map((s, i) => S.text(x + 14, y + 4 + i * 13, s, { size: 10 })).join('');
export const HIVCYCLE = svgDoc(
  460,
  270,
  'Replication of HIV, a retrovirus, in a helper T-lymphocyte or macrophage: the virus enters the cell and releases its RNA; reverse transcriptase copies the RNA into viral DNA; the viral DNA enters the nucleus and is integrated into the host DNA; the infected cell transcribes it and makes new viral RNA and proteins; new virus particles assemble and bud out, and repeated cycles destroy helper T-cells, so their number falls',
  [
    S.rect(110, 30, 330, 220, { rx: 30, fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.ellipse(330, 150, 80, 55, { fill: 'var(--diagram-blue)', fop: 0.12, sw: 1.2 }),
    S.text(330, 112, 'Nucleus', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    S.text(275, 24, 'Helper T-cell (or macrophage)', { a: 'middle', size: 11, w: 'bold' }),
    S.circle(55, 80, 22, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.2 }),
    S.path('M45 76 q5 -6 10 0 t10 0', { w: 1.5, c: 'var(--diagram-red)' }),
    S.text(55, 116, 'HIV', { a: 'middle', size: 11, w: 'bold' }),
    S.text(55, 130, '(RNA genome)', { a: 'middle', size: 10 }),
    S.arrow(80, 80, 120, 80, { w: 1.5 }),
    step(135, 62, 1, ['Virus enters;', 'RNA released'], 'var(--diagram-red)'),
    step(135, 112, 2, ['Reverse transcriptase:', 'RNA → viral DNA'], 'var(--diagram-red)'),
    step(270, 150, 3, ['Viral DNA joins', 'host DNA'], 'var(--diagram-blue)'),
    step(135, 178, 4, ['New viral RNA', 'and proteins made'], 'var(--diagram-green)'),
    step(135, 226, 5, ['New viruses', 'bud out'], 'var(--diagram-green)'),
    S.arrow(230, 122, 258, 140, { w: 1.2 }),
    S.arrow(258, 162, 232, 176, { w: 1.2 }),
    S.arrow(112, 236, 60, 250, { w: 1.5, c: 'var(--diagram-red)' }),
    S.text(10, 262, 'Infect more T-cells', { size: 10, c: 'var(--diagram-red)' }),
  ].join(''),
);

// 5. ELISA plate (computed: cut-off from negative controls)
export const NEG = [0.07, 0.09];
export const POS = 1.6;
export const SAMPLES = [0.11, 1.32, 0.08, 0.95, 0.24, 1.47];
export const RESULT = elisa(SAMPLES, NEG);
const well = (x, y, a, label, txt) => S.circle(x, y, 20, { fill: 'var(--diagram-yellow)', fop: Math.min(0.9, 0.05 + a / 1.8), sw: 1.2 }) + S.text(x, y + 36, label, { a: 'middle', size: 10, w: 'bold' }) + S.text(x, y + 50, txt, { a: 'middle', size: 10 });
export const ELISA = svgDoc(
  460,
  230,
  `An ELISA plate for HIV antibodies. Two negative controls give absorbance ${NEG.join(' and ')}, so the cut-off is ${RESULT.cutoff}; the positive control gives ${POS}. Of six patients’ samples with absorbance ${SAMPLES.join(', ')}, the coloured wells above the cut-off — ${SAMPLES.filter((_, i) => RESULT.positive[i]).join(', ')} — are positive`,
  [
    S.rect(10, 20, 440, 170, { rx: 10, fill: 'var(--diagram-fill)', sw: 1.2 }),
    well(50, 60, NEG[0], 'N1', String(NEG[0])), well(110, 60, NEG[1], 'N2', String(NEG[1])), well(170, 60, POS, 'P', String(POS)),
    ...SAMPLES.map((a, i) => well(50 + i * 60 + (i > 2 ? 0 : 0), 130, a, `S${i + 1}`, `${a}${RESULT.positive[i] ? ' +' : ''}`)),
    S.text(240, 50, 'N: negative controls; P: positive control', { size: 10 }),
    S.text(240, 66, `Cut-off = 3 × mean of N = ${RESULT.cutoff}`, { size: 10, w: 'bold' }),
    S.text(240, 82, 'Deeper colour = more antibody bound', { size: 10, c: 'var(--diagram-muted)' }),
    S.text(230, 214, `Positive samples (+): ${SAMPLES.map((_, i) => (RESULT.positive[i] ? `S${i + 1}` : null)).filter(Boolean).join(', ')}`, { a: 'middle', size: 11, w: 'bold' }),
  ].join(''),
);

export const ALL = { ANTIBODY, RESPONSE, HIVCYCLE, ELISA };
