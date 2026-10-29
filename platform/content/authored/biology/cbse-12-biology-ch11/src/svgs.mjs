// SVG diagrams for ch11 Organisms and Populations (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { expN, logisticN } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Exponential and logistic growth, computed from the equations
const G = { N0: 10, r: 0.35, K: 400, T: 20 };
const gx = (t) => 50 + t * 19;
const gy = (n) => 230 - n * 0.48;
const curve = (fn, cap) => {
  const pts = [];
  for (let t = 0; t <= G.T; t += 0.25) {
    const n = fn(t);
    if (n > cap) break;
    pts.push(`${pts.length ? 'L' : 'M'}${gx(t).toFixed(1)} ${gy(n).toFixed(1)}`);
  }
  return pts.join(' ');
};
export const GROWTH = svgDoc(
  460,
  270,
  'Population growth curves: population density N plotted against time t. The exponential curve (J-shaped, dN/dt = rN) rises ever more steeply when resources are unlimited. The logistic curve (S-shaped, dN/dt = rN(K − N)/K) shows a lag phase, then acceleration, then deceleration, and levels off at the carrying capacity K shown as a dashed line',
  [
    S.arrow(50, 235, 50, 20, { size: 6 }), S.arrow(45, 230, 450, 230, { size: 6 }),
    lab(40, 16, 'Population density (N)', { size: 10 }), lab(446, 250, 'Time (t)', { size: 10, a: 'end' }),
    S.line(50, gy(G.K), 440, gy(G.K), { c: 'var(--diagram-muted)', w: 1.2, dash: '5 3' }),
    lab(442, gy(G.K) - 6, 'Carrying capacity (K)', { size: 10, a: 'end', c: 'var(--diagram-muted)' }),
    S.path(curve((t) => expN(G.N0, G.r, t), 420), { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(curve((t) => logisticN(G.N0, G.r, G.K, t), 1e9), { c: 'var(--diagram-blue)', w: 2.5 }),
    lab(96, 110, 'a  Exponential (J-shaped)', { size: 10, c: 'var(--diagram-red)' }),
    lab(96, 124, 'dN/dt = rN', { size: 10, c: 'var(--diagram-red)' }),
    lab(270, 150, 'b  Logistic (S-shaped)', { size: 10, c: 'var(--diagram-blue)' }),
    lab(270, 164, 'dN/dt = rN (K − N)/K', { size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 2. Age pyramids
const PY = {
  Expanding: [92, 70, 46, 22],
  Stable: [60, 58, 52, 34],
  Declining: [36, 50, 54, 40],
};
const BAND = ['var(--diagram-green)', 'var(--diagram-blue)', 'var(--diagram-blue)', 'var(--diagram-yellow)'];
const pyramid = (cx, name, widths) =>
  widths.map((w, i) => S.rect(cx - w / 2, 190 - (i + 1) * 30, w, 28, { fill: BAND[i], fop: 0.35, sw: 1 })).join('') +
  S.text(cx, 212, name, { a: 'middle', size: 11, w: 'bold' });
export const PYRAMIDS = svgDoc(
  460,
  250,
  'Three age pyramids of human populations, each with age classes stacked from young at the base to old at the top: expanding (triangular, with a very broad base of pre-reproductive individuals, so the population grows), stable (bell-shaped, with similar numbers in the young and reproductive classes) and declining (urn-shaped, with a narrow base, so the population shrinks)',
  [
    pyramid(80, 'Expanding', PY.Expanding),
    pyramid(230, 'Stable', PY.Stable),
    pyramid(380, 'Declining', PY.Declining),
    S.rect(20, 222, 12, 10, { fill: BAND[0], fop: 0.35, sw: 1 }), lab(36, 231, 'Pre-reproductive', { size: 10 }),
    S.rect(150, 222, 12, 10, { fill: BAND[1], fop: 0.35, sw: 1 }), lab(166, 231, 'Reproductive', { size: 10 }),
    S.rect(260, 222, 12, 10, { fill: BAND[3], fop: 0.35, sw: 1 }), lab(276, 231, 'Post-reproductive', { size: 10 }),
    lab(230, 56, 'Older age classes at the top', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Four processes that change population density
export const DENSITY = svgDoc(
  460,
  230,
  'Population density N in a habitat changes through four basic processes: natality (births) and immigration (individuals arriving from elsewhere) add to it, while mortality (deaths) and emigration (individuals leaving) reduce it. N at time t + 1 equals N at time t plus births and immigrants minus deaths and emigrants',
  [
    S.rect(160, 75, 140, 70, { rx: 10, fill: 'var(--diagram-green)', fop: 0.18, sw: 1.5 }),
    S.text(230, 106, 'Population', { a: 'middle', size: 12, w: 'bold' }),
    S.text(230, 124, 'density N', { a: 'middle', size: 12 }),
    S.arrow(40, 60, 158, 92, { c: 'var(--diagram-green)', w: 2 }), lab(20, 48, 'Natality (B): births  +', { size: 10, c: 'var(--diagram-green)' }),
    S.arrow(40, 170, 158, 130, { c: 'var(--diagram-green)', w: 2 }), lab(20, 188, 'Immigration (I): arrive  +', { size: 10, c: 'var(--diagram-green)' }),
    S.arrow(302, 92, 420, 60, { c: 'var(--diagram-red)', w: 2 }), lab(440, 48, '−  Mortality (D): deaths', { size: 10, a: 'end', c: 'var(--diagram-red)' }),
    S.arrow(302, 130, 420, 170, { c: 'var(--diagram-red)', w: 2 }), lab(440, 188, '−  Emigration (E): leave', { size: 10, a: 'end', c: 'var(--diagram-red)' }),
    S.text(230, 220, 'N(t + 1) = N(t) + [(B + I) − (D + E)]', { a: 'middle', size: 11, w: 'bold' }),
  ].join(''),
);

export const ALL = { GROWTH, PYRAMIDS, DENSITY };
