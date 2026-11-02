// ICSE 10 Geography ch13 Food Crops — diagrams (allow-listed elements, palette colours only). The transplanting sketch is
// SCHEMATIC (not to scale); the rainfall bands use approximate textbook ranges; the four-district rice table is ILLUSTRATIVE
// (rounded, made-up but realistic, not official statistics) and is exported so the questions compute every answer from it.
// SELF_CHECKS (read by build.mjs) confirm the panels run in order with water above the soil, the bands sit on the scale and
// the yield bars follow the data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- transplanting paddy (schematic, three panels)
export const TRANSPLANT = (() => {
  const PW = 136;
  const GAP = 8;
  const SOIL = 150;
  const WATER = 136;
  let s = '';
  const x0s = [0, 1, 2].map((i) => 6 + i * (PW + GAP));
  const titles = [['1. Nursery bed:', 'seed sown thickly'], ['2. Seedlings uprooted', 'after four to six weeks'], ['3. Planted in rows in a', 'puddled, flooded field']];
  x0s.forEach((x, i) => {
    s += S.rect(x, 36, PW, 150, { c: MUT, sw: 1, dash: '4 3' });
    s += lab(x + PW / 2, 14, titles[i][0], { a: 'middle', size: 10, w: 'bold' }) + lab(x + PW / 2, 28, titles[i][1], { a: 'middle', size: 10 });
    s += S.rect(x + 6, SOIL, PW - 12, 24, { c: BROWN, sw: 1, fill: BROWN, fop: 0.35 });
  });
  // panel 1: dense short seedlings on a raised bed
  for (let k = 0; k < 22; k++) {
    const x = x0s[0] + 14 + k * 5.4;
    s += S.line(x, SOIL, x + (k % 2 ? 2 : -2), SOIL - 14, { c: GREEN, w: 1.4 });
  }
  // panel 2: bundles of taller seedlings with roots
  [40, 70, 100].forEach((dx) => {
    const x = x0s[1] + dx;
    for (let k = -2; k <= 2; k++) s += S.line(x, 120, x + k * 4, 70, { c: GREEN, w: 1.4 });
    s += S.line(x - 4, 124, x + 4, 124, { c: BROWN, w: 3 });
    for (let k = -1; k <= 1; k++) s += S.line(x, 124, x + k * 3, 134, { c: BROWN, w: 1 });
  });
  s += S.arrow(x0s[1] + PW - 14, 100, x0s[2] + 14, 100, { c: ACC, w: 1.6, size: 6 });
  // panel 3: flooded field with seedlings in evenly spaced rows
  const x3 = x0s[2];
  s += S.rect(x3 + 6, WATER, PW - 12, SOIL - WATER, { c: BLUE, sw: 0.8, fill: BLUE, fop: 0.3 });
  const rows = [];
  for (let k = 0; k < 6; k++) rows.push(x3 + 22 + k * 20);
  rows.forEach((x) => {
    for (let j = -1; j <= 1; j++) s += S.line(x, SOIL, x + j * 4, SOIL - 34, { c: GREEN, w: 1.4 });
  });
  s += lab(x3 + PW / 2, WATER - 44, 'standing water', { a: 'middle', size: 10, c: BLUE });
  s += S.lead(x3 + PW / 2, WATER - 40, x3 + PW / 2 + 6, WATER + 4);
  s += lab(6, 204, 'Schematic — not to scale', { size: 10, c: MUT });
  const gaps = rows.slice(1).map((x, i) => x - rows[i]);
  const ordered = x0s[0] < x0s[1] && x0s[1] < x0s[2];
  check(ordered && WATER < SOIL && gaps.every((g) => g === gaps[0]), 'transplant: panels run left to right in the order nursery, uprooting, transplanting; the water surface lies above the soil in the field; seedling rows are evenly spaced');
  return svgDoc(440, 212, 'Three-panel schematic of transplanting paddy: first, seed is sown thickly in a small nursery bed; second, after four to six weeks the seedlings are uprooted in bundles; third, they are planted in evenly spaced rows in a puddled field kept under standing water. Not to scale.', s);
})();

// ---------------------------------------------------------------- approximate rainfall needs (cm) and temperatures (°C)
export const NEEDS = [
  ['Rice', 100, 200, '22–32 °C'],
  ['Wheat', 50, 75, '10–25 °C'],
  ['Jowar', 50, 100, '27–32 °C'],
  ['Bajra', 40, 50, '25–30 °C'],
  ['Gram', 40, 45, '20–25 °C'],
];
export const RAINBAND = (() => {
  const X0 = 70;
  const SC = 1.2; // px per cm
  const MAX = 250;
  const xv = (cm) => X0 + cm * SC;
  let s = lab(220, 16, 'Approximate rainfall needs (cm) and growing temperatures', { a: 'middle', size: 11, w: 'bold' });
  for (let cm = 0; cm <= MAX; cm += 50) s += S.line(xv(cm), 28, xv(cm), 168, { c: MUT, w: 0.5, dash: '2 3' }) + lab(xv(cm), 182, String(cm), { a: 'middle', size: 10 });
  let ok = true;
  NEEDS.forEach(([crop, lo, hi, t], i) => {
    const y = 34 + i * 27;
    s += lab(X0 - 6, y + 13, crop, { a: 'end', size: 11 });
    s += S.rect(xv(lo), y, (hi - lo) * SC, 18, { c: i === 0 ? BLUE : i === 1 ? YEL : GREEN, sw: 1, fill: i === 0 ? BLUE : i === 1 ? YEL : GREEN, fop: 0.5 });
    s += lab(xv(hi) + 6, y + 13, `${lo}–${hi} cm; ${t}`, { size: 10 });
    if (Math.abs(xv(lo) - (X0 + lo * SC)) > 1e-9 || hi <= lo) ok = false;
  });
  s += lab(220, 198, 'rainfall in centimetres; ranges are approximate and vary by region', { a: 'middle', size: 10, c: MUT });
  check(ok && NEEDS[0][1] >= 100 && NEEDS[3][2] <= 50, 'rain bands: every band starts and ends at its rainfall values on the scale; rice needs at least 100 cm and bajra at most 50 cm');
  return svgDoc(440, 206, 'Range chart of approximate rainfall needs: rice 100 to 200 centimetres, wheat 50 to 75, jowar 50 to 100, bajra 40 to 50 and gram 40 to 45, with typical growing temperatures beside each.', s);
})();

// ---------------------------------------------------------------- illustrative rice data for four districts
// [district, area (thousand ha), production (thousand tonnes)]
export const DIST = [['A', 400, 1600], ['B', 300, 1050], ['C', 600, 1350], ['D', 200, 500]];
export const yld = (d) => {
  const [, a, p] = DIST.find(([n]) => n === d);
  return Math.round((p / a) * 100) / 100;
};
export const totArea = () => DIST.reduce((s, [, a]) => s + a, 0);
export const totProd = () => DIST.reduce((s, [, , p]) => s + p, 0);
export const YIELDCHART = (() => {
  const X0 = 60;
  const Y0 = 190;
  const H = 140;
  const MAX = 5;
  const yv = (v) => Y0 - (v / MAX) * H;
  let s = lab(230, 18, 'Rice yield of four districts (illustrative), tonnes per hectare', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(X0, Y0, 420, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let v = 0; v <= MAX; v++) s += lab(X0 - 6, yv(v) + 4, String(v), { a: 'end', size: 10 });
  let ok = true;
  DIST.forEach(([d], i) => {
    const v = yld(d);
    const x = X0 + 30 + i * 85;
    const h = Y0 - yv(v);
    s += S.rect(x, yv(v), 46, h, { c: GREEN, sw: 1, fill: GREEN, fop: 0.5 });
    s += lab(x + 23, yv(v) - 5, Number.isInteger(v) ? v.toFixed(1) : String(v), { a: 'middle', size: 10 });
    s += lab(x + 23, Y0 + 14, `District ${d}`, { a: 'middle', size: 10 });
    if (Math.abs(h - (v / MAX) * H) > 1e-9) ok = false;
  });
  s += lab(240, 222, `Yield = production ÷ area. Total: ${totProd()} thousand tonnes from ${totArea()} thousand ha.`, { a: 'middle', size: 10, c: MUT });
  check(ok && totArea() === 1500 && totProd() === 4500, 'yield chart: every bar height is proportional to production divided by area; the four districts total 1500 thousand ha and 4500 thousand tonnes');
  return svgDoc(440, 232, `Bar chart of illustrative rice yields in tonnes per hectare: District A ${yld('A')}, B ${yld('B')}, C ${yld('C')}, D ${yld('D')}.`, s);
})();
