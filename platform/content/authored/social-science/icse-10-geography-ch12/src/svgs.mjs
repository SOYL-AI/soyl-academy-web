// ICSE 10 Geography ch12 Agriculture in India — diagrams (allow-listed elements, palette colours only). The crop calendar
// uses the usual textbook months; the farm, plot and yield figures are ILLUSTRATIVE (rounded, made-up but realistic, not
// official statistics) and are exported so the questions compute every answer from the same numbers. SELF_CHECKS (read by
// build.mjs) confirm the calendar bands sit on their months, the plot drawing conserves area, and bar heights follow the data.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const r1 = (x) => Math.round(x * 10) / 10;
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ---------------------------------------------------------------- crop calendar (month indices, 0 = January)
export const SEASONS = {
  Kharif: { sow: [5, 6], grow: [7], harvest: [8, 9], crops: 'rice, jowar, bajra, maize, cotton, groundnut, jute' },
  Rabi: { sow: [9, 10, 11], grow: [0, 1], harvest: [2, 3], crops: 'wheat, gram, mustard, barley, peas' },
  Zayad: { sow: [2], grow: [3, 4], harvest: [5], crops: 'watermelon, muskmelon, cucumber, vegetables, fodder' },
};
export const CALENDAR = (() => {
  const X0 = 70;
  const W = 30;
  const RH = 34;
  let s = '';
  MONTHS.forEach((m, i) => (s += lab(X0 + i * W + W / 2, 30, m, { a: 'middle', size: 10 })));
  for (let i = 0; i <= 12; i++) s += S.line(X0 + i * W, 36, X0 + i * W, 36 + 3 * RH, { c: MUT, w: 0.6 });
  let ok = true;
  Object.entries(SEASONS).forEach(([name, sz], row) => {
    const y = 40 + row * RH;
    s += lab(X0 - 6, y + 18, name, { a: 'end', size: 11, w: 'bold' });
    const seen = new Set();
    const band = (months, colour, op) => {
      for (const m of months) {
        if (seen.has(m)) ok = false;
        seen.add(m);
        s += S.rect(X0 + m * W + 1, y + 2, W - 2, RH - 8, { c: colour, sw: 0.8, fill: colour, fop: op });
      }
    };
    band(sz.sow, GREEN, 0.75);
    band(sz.grow, GREEN, 0.3);
    band(sz.harvest, YEL, 0.8);
  });
  // legend
  const ly = 40 + 3 * RH + 16;
  s += S.rect(X0, ly - 10, 14, 12, { c: GREEN, sw: 0.8, fill: GREEN, fop: 0.75 }) + lab(X0 + 18, ly, 'sowing', { size: 10 });
  s += S.rect(X0 + 80, ly - 10, 14, 12, { c: GREEN, sw: 0.8, fill: GREEN, fop: 0.3 }) + lab(X0 + 98, ly, 'growing', { size: 10 });
  s += S.rect(X0 + 165, ly - 10, 14, 12, { c: YEL, sw: 0.8, fill: YEL, fop: 0.8 }) + lab(X0 + 183, ly, 'harvesting', { size: 10 });
  s += lab(X0, ly + 18, 'Typical months for north India; dates vary from region to region.', { size: 10, c: MUT });
  const k = SEASONS.Kharif;
  const rb = SEASONS.Rabi;
  ok = ok && k.sow[0] === 5 && rb.sow[0] === 9 && rb.harvest.at(-1) === 3 && SEASONS.Zayad.harvest[0] < k.sow.at(-1) + 1;
  check(ok, 'calendar: no month is used twice in a row; kharif sowing starts in June, rabi is sown from October and harvested by April (wrapping round the new year), and zayad ends by June');
  return svgDoc(440, 200, 'Crop calendar of the three agricultural seasons of India by month. Kharif: sown June and July, growing in August, harvested September and October. Rabi: sown October to December, growing January and February, harvested March and April. Zayad: sown in March, growing April and May, harvested in June.', s);
})();

// ---------------------------------------------------------------- illustrative farm F near Muzaffarpur (Bihar)
export const PLOTS = [0.5, 1.2, 0.3, 0.9, 1.1]; // hectares, five scattered plots
export const plotTotal = () => r1(PLOTS.reduce((a, b) => a + b, 0));
export const plotMean = () => r1(plotTotal() / PLOTS.length);
export const FARM = { net: 4, kharif: 4, rabi: 3, zayad: 1 }; // hectares
export const gross = () => FARM.kharif + FARM.rabi + FARM.zayad;
export const intensity = () => Math.round((gross() / FARM.net) * 100);

export const PLOTMAP = (() => {
  const K = 2000; // square drawing units per hectare
  let s = lab(110, 20, 'Before: five scattered plots', { a: 'middle', size: 11, w: 'bold' });
  s += lab(330, 20, 'After consolidation', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(10, 30, 200, 170, { c: MUT, sw: 1, dash: '4 3' }) + S.rect(230, 30, 200, 170, { c: MUT, sw: 1, dash: '4 3' });
  // village houses in the middle of each panel
  const house = (x, y) => S.path(`M${x} ${y} l8 -8 l8 8 Z`, { c: BROWN, w: 1.2, fill: BROWN, fop: 0.5 }) + S.rect(x + 2, y, 12, 9, { c: BROWN, sw: 1.2 });
  s += house(104, 96) + lab(112, 118, 'village', { a: 'middle', size: 10, c: BROWN });
  s += house(318, 182) + lab(346, 192, 'village', { size: 10, c: BROWN });
  const pos = [[20, 40], [130, 44], [30, 150], [140, 140], [40, 84]];
  let drawn = 0;
  PLOTS.forEach((ha, i) => {
    const area = ha * K;
    const w = Math.round(Math.sqrt(area * 1.6));
    const h = area / w;
    drawn += w * h;
    const [x, y] = pos[i];
    s += S.rect(x, y, w, h, { c: GREEN, sw: 1.2, fill: GREEN, fop: 0.35 });
    s += lab(x + w / 2, y + h / 2 + 4, `${ha} ha`, { a: 'middle', size: 10 });
  });
  const total = plotTotal();
  const bw = 100;
  const bh = (total * K) / bw;
  s += S.rect(280, 60, bw, bh, { c: GREEN, sw: 1.5, fill: GREEN, fop: 0.45 });
  s += lab(330, 60 + bh / 2 + 4, `${total} ha in one block`, { a: 'middle', size: 10 });
  s += lab(220, 214, 'Illustrative farm, schematic — not to scale between panels', { a: 'middle', size: 10, c: MUT });
  check(Math.abs(drawn - bw * bh) < 1e-6 && total === 4, `plots: the five plot rectangles together cover the same drawn area as the consolidated block (${total} ha)`);
  return svgDoc(440, 222, `Two panels. Left: an illustrative farm split into five scattered plots of ${PLOTS.join(', ')} hectares around a village. Right: after consolidation, the same ${total} hectares form one compact block next to the village.`, s);
})();

// ---------------------------------------------------------------- illustrative wheat yields of District P (tonnes per hectare)
export const YIELD = [[1960, 1.0], [1970, 2.0], [1980, 2.8], [1990, 3.5], [2000, 4.2]];
export const AREA2000 = 250; // thousand hectares under wheat in 2000
export const PROD2000 = 1050; // thousand tonnes in 2000
export const yieldOf = (yr) => YIELD.find(([y]) => y === yr)[1];
export const rise = (a, b) => Math.round(((yieldOf(b) - yieldOf(a)) / yieldOf(a)) * 1000) / 10;
export const GRCHART = (() => {
  const X0 = 60;
  const Y0 = 200;
  const H = 150;
  const MAX = 5;
  const yv = (v) => Y0 - (v / MAX) * H;
  let s = lab(230, 20, 'Wheat yield, District P (illustrative), tonnes per hectare', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(X0, Y0, 420, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let v = 0; v <= MAX; v++) s += lab(X0 - 6, yv(v) + 4, String(v), { a: 'end', size: 10 }) + (v ? S.line(X0, yv(v), 420, yv(v), { c: MUT, w: 0.5, dash: '2 3' }) : '');
  let ok = true;
  YIELD.forEach(([yr, v], i) => {
    const x = X0 + 25 + i * 70;
    const h = Y0 - yv(v);
    s += S.rect(x, yv(v), 40, h, { c: i === 0 ? MUT : GREEN, sw: 1, fill: i === 0 ? MUT : GREEN, fop: 0.5 });
    s += lab(x + 20, yv(v) - 5, v.toFixed(1), { a: 'middle', size: 10 });
    s += lab(x + 20, Y0 + 14, String(yr), { a: 'middle', size: 10 });
    if (Math.abs(h - (v / MAX) * H) > 1e-9) ok = false;
  });
  s += lab(X0 + 45, Y0 + 30, 'before HYV seeds', { a: 'middle', size: 10, c: MUT }) + lab(300, Y0 + 30, 'after the Green Revolution', { a: 'middle', size: 10, c: GREEN });
  check(ok && rise(1960, 1980) === 180, 'yield chart: every bar height is proportional to its yield; the 1960 to 1980 rise is 180 per cent');
  return svgDoc(440, 240, 'Bar chart of illustrative wheat yields of District P: 1.0 tonne per hectare in 1960, 2.0 in 1970, 2.8 in 1980, 3.5 in 1990 and 4.2 in 2000, showing the rise after high-yielding seeds were introduced.', s);
})();
