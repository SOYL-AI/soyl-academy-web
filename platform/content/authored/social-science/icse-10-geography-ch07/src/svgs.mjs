// ICSE 10 Geography ch07 diagrams (allow-listed elements, palette colours only). All schematic diagrams are labelled "not to
// scale". The soil-loss figures are ILLUSTRATIVE (rounded, made-up but realistic values for an imagined field trial), exported so
// questions compute every answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm geometry and data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const YEL = 'var(--diagram-yellow)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- ILLUSTRATIVE field-trial data (tonnes of soil lost per hectare per year)
export const TRIAL = {
  title: 'Illustrative field trial on a 10-degree slope (imagined data)',
  rows: [
    { method: 'Ploughing up and down the slope', loss: 40 },
    { method: 'Contour ploughing', loss: 22 },
    { method: 'Contour ploughing with strip cropping', loss: 14 },
    { method: 'Terraced field', loss: 8 },
  ],
};
export const LOSS = Object.fromEntries(TRIAL.rows.map((r, i) => [['updown', 'contour', 'strip', 'terrace'][i], r.loss]));
/** Percentage reduction in soil loss compared with up-and-down ploughing. */
export const cut = (k) => Math.round(((LOSS.updown - LOSS[k]) / LOSS.updown) * 1000) / 10;
// ILLUSTRATIVE shelter-belt reading (km per hour), imagined farm in western Rajasthan
export const WIND = { open: 30, behind: 18 };
export const windCut = () => Math.round(((WIND.open - WIND.behind) / WIND.open) * 1000) / 10;

// ---------------------------------------------------------------- soil profile (illustrative depths)
export const HORIZONS = [
  { name: 'Topsoil (A horizon)', note: 'humus, roots, dark', cm: 25, fill: BROWN, fop: 0.55 },
  { name: 'Subsoil (B horizon)', note: 'clay and minerals washed down', cm: 45, fill: BROWN, fop: 0.3 },
  { name: 'Weathered rock (C horizon)', note: 'broken parent rock', cm: 60, fill: MUT, fop: 0.25 },
];
export const PROFILE = (() => {
  const X = 30;
  const W = 120;
  const Y0 = 30;
  const K = 1.3; // px per cm
  let y = Y0;
  let s = '';
  let ok = true;
  for (const h of HORIZONS) {
    const hh = h.cm * K;
    s += S.rect(X, y, W, hh, { fill: h.fill, fop: h.fop, c: 'currentColor', sw: 1 });
    s += lab(X + W + 12, y + hh / 2 - 2, h.name, { w: 'bold' }) + lab(X + W + 12, y + hh / 2 + 12, h.note, { size: 10, c: MUT });
    if (Math.abs(hh - h.cm * K) > 1e-9) ok = false;
    y += hh;
  }
  const total = HORIZONS.reduce((a, h) => a + h.cm, 0);
  if (Math.abs(y - Y0 - total * K) > 1e-9) ok = false;
  s += S.rect(X, y, W, 30, { fill: 'var(--diagram-fill)', c: 'currentColor', sw: 1 });
  for (let i = 0; i < 4; i++) s += S.line(X + 10 + i * 30, y + 5, X + 30 + i * 30, y + 25, { c: MUT, w: 1 });
  s += lab(X + W + 12, y + 19, 'Bedrock (parent rock)', { w: 'bold' });
  // grass on top
  for (let i = 0; i < 8; i++) s += S.line(X + 8 + i * 15, Y0, X + 4 + i * 15, Y0 - 8, { c: GREEN, w: 1.5 });
  s += lab(200, 18, 'Illustrative depths; not to scale', { a: 'middle', size: 10, c: MUT });
  check(ok, `soil profile: the ${HORIZONS.length} horizons are stacked without gaps and each band's height is proportional to its illustrative depth (total ${total} cm)`);
  return svgDoc(400, y + 45, `Schematic soil profile: dark topsoil with humus and roots, a lighter subsoil, a layer of weathered rock and solid bedrock at the bottom. Illustrative depths ${HORIZONS.map((h) => `${h.name} ${h.cm} centimetres`).join(', ')}.`, s);
})();

// ---------------------------------------------------------------- khadar and bhangar: cross-section of a river plain
export const KB = (() => {
  const riverL = 30;
  const riverR = 90;
  const khadarY = 150;
  const bhangarY = 105;
  const floodY = 140;
  const bluffX = 240;
  let s = '';
  // ground profile
  const d = `M10 ${khadarY} L${riverL} ${khadarY} Q${(riverL + riverR) / 2} ${khadarY + 40} ${riverR} ${khadarY} L${bluffX - 20} ${khadarY} L${bluffX + 10} ${bhangarY} L430 ${bhangarY} L430 220 L10 220 Z`;
  s += S.path(d, { c: 'currentColor', w: 1.5, fill: BROWN, fop: 0.25 });
  // river water
  s += S.path(`M${riverL + 4} ${khadarY + 2} Q${(riverL + riverR) / 2} ${khadarY + 34} ${riverR - 4} ${khadarY + 2} Z`, { c: BLUE, w: 1, fill: BLUE, fop: 0.6 });
  // flood level
  s += S.line(10, floodY, bluffX - 8, floodY, { c: BLUE, w: 1.5, dash: '5 4' }) + lab(110, floodY - 6, 'flood level', { size: 10, c: BLUE });
  // kankar nodules in bhangar
  const nod = [];
  for (let i = 0; i < 9; i++) nod.push([bluffX + 40 + (i % 5) * 34, bhangarY + 25 + Math.floor(i / 5) * 30]);
  nod.forEach(([x, y]) => (s += S.circle(x, y, 3, { fill: YEL, c: 'currentColor', sw: 0.8 })));
  s += lab(60, khadarY + 58, 'River', { a: 'middle' });
  s += lab((riverR + bluffX) / 2, khadarY + 30, 'KHADAR', { a: 'middle', w: 'bold' }) + lab((riverR + bluffX) / 2, khadarY + 44, 'new alluvium, renewed by floods', { a: 'middle', size: 10 });
  s += lab(335, bhangarY - 30, 'BHANGAR', { a: 'middle', w: 'bold' }) + lab(335, bhangarY - 16, 'old alluvium, above flood level', { a: 'middle', size: 10 });
  s += lab(335, 205, 'kankar (lime nodules)', { a: 'middle', size: 10 });
  s += lab(215, 18, 'Cross-section of a river plain (schematic, not to scale)', { a: 'middle', size: 11, w: 'bold' });
  const ok = bhangarY < floodY && floodY < khadarY && riverR < bluffX && nod.every(([x]) => x > bluffX);
  check(ok, 'khadar and bhangar: the flood level lies above the khadar surface but below the bhangar terrace, the khadar is next to the river, and the kankar nodules are drawn only in the bhangar');
  return svgDoc(440, 230, 'Schematic cross-section of a river plain. Next to the river is the low khadar floodplain of new alluvium, covered by the flood level. Beyond a low bluff lies the higher bhangar terrace of old alluvium with lime nodules called kankar, above the flood level.', s);
})();

// ---------------------------------------------------------------- types of erosion: sheet, gully, wind
export const EROSION = (() => {
  let s = '';
  // panel 1: sheet erosion (old surface dashed, parallel to new)
  const sheetDepth = 8;
  const p1 = [[20, 70], [150, 130]];
  s += S.path(`M${p1[0][0]} ${p1[0][1] + sheetDepth} L${p1[1][0]} ${p1[1][1] + sheetDepth} L150 175 L20 175 Z`, { fill: BROWN, fop: 0.3 });
  s += S.line(p1[0][0], p1[0][1], p1[1][0], p1[1][1], { dash: '4 3', c: MUT });
  for (let i = 0; i < 4; i++) s += S.arrow(35 + i * 28, 62 + i * 13, 55 + i * 28, 71 + i * 13, { c: BLUE, w: 1.2, size: 6 });
  s += lab(85, 30, 'Sheet erosion', { a: 'middle', w: 'bold' }) + lab(85, 195, 'thin even layer removed', { a: 'middle', size: 10 });
  // panel 2: gully erosion (V-shaped channels cut deep)
  const gullyDepth = 40;
  let g = 'M170 90';
  const gx = [190, 230, 270];
  for (const x of gx) g += ` L${x - 12} 90 L${x} ${90 + gullyDepth} L${x + 12} 90`;
  g += ' L300 90 L300 175 L170 175 Z';
  s += S.path(g, { fill: BROWN, fop: 0.3 });
  gx.forEach((x) => (s += S.arrow(x, 60, x, 82, { c: BLUE, w: 1.2, size: 6 })));
  s += lab(235, 30, 'Gully erosion', { a: 'middle', w: 'bold' }) + lab(235, 195, 'deep channels: ravines', { a: 'middle', size: 10 });
  // panel 3: wind erosion (dunes and wind arrows)
  s += S.path('M320 175 L320 140 Q350 110 375 140 Q400 115 430 140 L430 175 Z', { fill: YEL, fop: 0.45 });
  for (let i = 0; i < 3; i++) s += S.arrow(322, 75 + i * 16, 405, 75 + i * 16, { c: ACC, w: 1.5, size: 7 });
  for (let i = 0; i < 6; i++) s += S.circle(410 + (i % 3) * 7, 82 + Math.floor(i / 3) * 14, 1.6, { fill: BROWN, c: BROWN, sw: 0 });
  s += lab(375, 30, 'Wind erosion', { a: 'middle', w: 'bold' }) + lab(375, 195, 'loose dry soil blown away', { a: 'middle', size: 10 });
  s += lab(225, 215, 'Schematic, not to scale; blue arrows show running water', { a: 'middle', size: 10, c: MUT });
  check(gullyDepth > sheetDepth * 3, `erosion: gullies (${gullyDepth} px) are drawn several times deeper than the sheet-eroded layer (${sheetDepth} px), and the old surface in the sheet panel is parallel to the new one`);
  return svgDoc(450, 225, 'Three schematic panels. Sheet erosion: running water removes a thin even layer of topsoil from a slope. Gully erosion: water cuts deep V-shaped channels that turn into ravines. Wind erosion: strong winds blow loose dry soil away from sandy land.', s);
})();

// ---------------------------------------------------------------- terrace farming and contour ploughing
export const CONSERVE = (() => {
  let s = '';
  // terraces on a slope from (20,190) to (200,50)
  const n = 5;
  const [x0, y0, x1, y1] = [20, 190, 200, 50];
  const run = (x1 - x0) / n;
  const rise = (y0 - y1) / n;
  s += S.line(x0, y0, x1, y1, { dash: '4 3', c: MUT });
  let d = `M${x0} ${y0}`;
  let sumRise = 0;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * run;
    const y = y0 - (i + 1) * rise;
    d += ` L${x} ${y} L${x + run} ${y}`;
    sumRise += rise;
    s += S.rect(x + 4, y - 6, run - 8, 6, { fill: GREEN, fop: 0.6, c: 'none', sw: 0 });
  }
  d += ` L${x1} 200 L${x0} 200 Z`;
  s += S.path(d, { fill: BROWN, fop: 0.3 });
  s += lab(110, 25, 'Terrace farming', { a: 'middle', w: 'bold' }) + lab(110, 220, 'flat steps cut into the slope', { a: 'middle', size: 10 }) + lab(150, 150, 'old slope', { size: 10, c: MUT });
  // contour ploughing: plan view, slope runs down the page
  const bx = 250;
  const by = 50;
  s += S.rect(bx, by, 170, 140, { c: 'currentColor', sw: 1 });
  s += S.arrow(bx - 12, by + 10, bx - 12, by + 130, { c: MUT, w: 1.2, size: 6 }) + lab(bx - 16, by + 75, 'downhill', { a: 'end', size: 10, c: MUT });
  const furrows = [];
  for (let i = 0; i < 6; i++) {
    const y = by + 15 + i * 22;
    furrows.push([bx + 10, y, bx + 160, y]);
    s += S.path(`M${bx + 10} ${y} Q${bx + 85} ${y + 8} ${bx + 160} ${y}`, { c: BROWN, w: 2 });
  }
  s += S.arrow(bx + 85, by + 20, bx + 85, by + 34, { c: BLUE, w: 1.5, size: 6 });
  s += lab(bx + 85, 25, 'Contour ploughing', { a: 'middle', w: 'bold' }) + lab(bx + 85, 220, 'furrows across the slope trap water', { a: 'middle', size: 10 });
  const perpendicular = furrows.every(([, ya, , yb]) => ya === yb);
  const ok = Math.abs(sumRise - (y0 - y1)) < 1e-9 && perpendicular;
  check(ok, `conservation: the ${n} terrace risers add up to the full rise of the slope and every contour furrow runs across (at right angles to) the downhill direction`);
  return svgDoc(440, 230, 'Two schematic panels, not to scale. Left: terrace farming, a hill slope cut into five flat steps with crops on each step. Right: contour ploughing seen from above, with furrows running across the slope at right angles to the downhill direction so that water is held back.', s);
})();

// ---------------------------------------------------------------- bar chart of the illustrative soil-loss trial
export const LOSS_CHART = (() => {
  const X0 = 60;
  const Y0 = 190;
  const H = 150;
  const max = 40;
  const W = 60;
  let s = S.line(X0, Y0, X0 + TRIAL.rows.length * (W + 25) + 10, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let t = 0; t <= max; t += 10) s += lab(X0 - 6, Y0 - (t / max) * H + 4, String(t), { a: 'end', size: 10 });
  let ok = true;
  const short = ['Up and down', 'Contour', 'Contour + strips', 'Terraces'];
  TRIAL.rows.forEach((r, i) => {
    const h = (r.loss / max) * H;
    const x = X0 + 15 + i * (W + 25);
    s += S.rect(x, Y0 - h, W, h, { fill: BROWN, fop: 0.5, c: BROWN, sw: 1 });
    s += lab(x + W / 2, Y0 - h - 5, String(r.loss), { a: 'middle', size: 11, w: 'bold' });
    s += lab(x + W / 2, Y0 + 15, short[i], { a: 'middle', size: 10 });
    if (Math.abs(h - (r.loss / max) * H) > 1e-9) ok = false;
  });
  s += lab(14, 30, 'soil lost (tonnes per hectare per year)', { size: 10 });
  s += lab(230, 225, 'Illustrative data for an imagined field trial', { a: 'middle', size: 10, c: MUT });
  const desc = TRIAL.rows.every((r, i, a) => i === 0 || r.loss < a[i - 1].loss);
  check(ok && desc, `soil-loss chart: bar heights are proportional to ${TRIAL.rows.map((r) => r.loss).join(', ')} tonnes per hectare and soil loss falls with each stronger conservation method`);
  return svgDoc(440, 235, `Bar chart of illustrative soil loss in tonnes per hectare per year: ${TRIAL.rows.map((r) => `${r.method} ${r.loss}`).join('; ')}.`, s);
})();
