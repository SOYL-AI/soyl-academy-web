// ch19 Purification and Analysis of Organic Compounds — SVGs. Apparatus is drawn from computed geometry (slanted condensers,
// flask segments); the Rf values, the molar masses behind the estimation formulas and the layout of the thin-layer plate are
// computed here and checked.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const MUTED = 'var(--diagram-muted)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BRN = 'var(--diagram-brown)';
const ACC = 'var(--diagram-accent)';
const FILL = 'var(--diagram-fill)';
const lab = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const poly = (pts, o = {}) => S.path(`M${pts.map((p) => `${p[0]} ${p[1]}`).join(' L')} Z`, o);

// ---------------------------------------------------------------- molar masses behind the formulas (checked)
const MM = { CO2: 12 + 32, H2O: 2 + 16, BaSO4: 137 + 32 + 64, AgCl: 108 + 35.5, AgBr: 108 + 80, AgI: 108 + 127, Mg2P2O7: 48 + 62 + 112 };
chk(MM.CO2 === 44 && MM.H2O === 18, 'CO2 = 44 and H2O = 18 give 12/44 and 2/18');
chk(MM.BaSO4 === 233 && MM.Mg2P2O7 === 222, 'BaSO4 = 233 and Mg2P2O7 = 222 give 32/233 and 62/222');
chk(MM.AgCl === 143.5 && MM.AgBr === 188 && MM.AgI === 235, 'AgCl 143.5, AgBr 188, AgI 235');

// ---------------------------------------------------------------- glassware helpers
/** Round flask with a neck; the liquid is a circular segment below level (cy + d). */
function flask(cx, cy, r, nw, neckTop, { d = 4, lc = BLUE } = {}) {
  const hw = nw / 2;
  const yj = cy - Math.sqrt(r * r - hw * hw);
  const w = Math.sqrt(r * r - d * d);
  return [
    S.path(`M${cx - hw} ${neckTop} L${cx - hw} ${yj} A${r} ${r} 0 1 0 ${cx + hw} ${yj} L${cx + hw} ${neckTop}`, { w: 1.5 }),
    S.path(`M${cx - w} ${cy + d} L${cx + w} ${cy + d} A${r} ${r} 0 0 1 ${cx - w} ${cy + d} Z`, { c: lc, w: 1, fill: lc, fop: 0.25 }),
  ].join('');
}
/** Slanted Liebig-type condenser from A to B with a water jacket of half-width hw. */
function condenser(ax, ay, bx, by, hw = 8) {
  const L = Math.hypot(bx - ax, by - ay);
  const ux = (bx - ax) / L;
  const uy = (by - ay) / L;
  const nx = -uy;
  const ny = ux;
  const P = (t, o) => [ax + ux * t + nx * o, ay + uy * t + ny * o];
  const jac = poly([P(8, -hw), P(L - 8, -hw), P(L - 8, hw), P(8, hw)], { w: 1.5, fill: BLUE, fop: 0.18 });
  return jac + S.line(...P(0, 0), ...P(L, 0), { w: 1.5 }) + S.line(...P(0, 3), ...P(8, 3), { w: 1 });
}
/** Conical receiver with its neck at (cx, top). */
function conical(cx, top, h = 40, wb = 44, fillFrac = 0.3) {
  const bot = top + h;
  const neck = 6;
  const shoulder = top + 10;
  const body = poly([[cx - neck, top], [cx - neck, shoulder], [cx - wb / 2, bot], [cx + wb / 2, bot], [cx + neck, shoulder], [cx + neck, top]], { w: 1.5 }).replace(' Z', '');
  const ly = bot - fillFrac * h;
  const k = (ly - shoulder) / (bot - shoulder);
  const hw = neck + (wb / 2 - neck) * k;
  return body + poly([[cx - hw, ly], [cx + hw, ly], [cx + wb / 2, bot], [cx - wb / 2, bot]], { w: 1, c: BLUE, fill: BLUE, fop: 0.3 });
}
const flame = (cx, y) => S.path(`M${cx} ${y} C${cx - 9} ${y - 8} ${cx - 4} ${y - 14} ${cx} ${y - 20} C${cx + 4} ${y - 14} ${cx + 9} ${y - 8} ${cx} ${y} Z`, { c: RED, fill: YEL, fop: 0.6, w: 1.2 });

// ---------------------------------------------------------------- 1. fractional and steam distillation
export const DISTILLS = (() => {
  const b = [];
  b.push(lab(105, 14, 'Fractional distillation', { a: 'middle', w: 'bold', size: 12, c: BLUE }));
  b.push(lab(330, 14, 'Steam distillation', { a: 'middle', w: 'bold', size: 12, c: BLUE }));
  // left panel
  b.push(flask(62, 205, 24, 22, 100, { d: 6 }));
  b.push(S.rect(51, 84, 22, 98, { sw: 1.5 }));
  for (let row = 0; row < 9; row++) for (let col = 0; col < 3; col++) b.push(S.circle(56 + col * 6 + (row % 2) * 3, 94 + row * 10, 2, { sw: 1, c: MUTED }));
  b.push(S.line(62, 62, 62, 108, { w: 1.2 }) + S.circle(62, 110, 3, { c: RED, fill: RED, sw: 1 }));
  b.push(S.rect(54, 76, 16, 8, { fill: BRN, fop: 0.5, sw: 1 }));
  b.push(S.line(73, 92, 82, 92, { w: 1.5 }));
  const cd = condenser(82, 92, 170, 150);
  b.push(cd);
  b.push(S.line(172, 152, 181, 176, { w: 1.5 }));
  b.push(conical(184, 176, 44, 46));
  b.push(flame(62, 244));
  b.push(S.line(48, 246, 76, 246, { w: 2, c: MUTED }));
  b.push(lab(62, 56, 'thermometer', { a: 'middle' }));
  b.push(lab(44, 134, 'fractionating', { a: 'end' }) + lab(44, 146, 'column (beads)', { a: 'end' }));
  b.push(S.lead(46, 140, 52, 140));
  b.push(lab(150, 104, 'condenser', { a: 'middle' }));
  b.push(lab(112, 74, 'water out', { a: 'start' }) + S.lead(112, 72, 100, 84));
  b.push(lab(180, 136, 'water in', { a: 'start' }) + S.lead(179, 134, 164, 140));
  b.push(lab(184, 240, 'distillate', { a: 'middle' }));
  b.push(lab(34, 224, 'mixture', { a: 'end' }));
  b.push(lab(62, 262, 'heat', { a: 'middle' }));
  // right panel
  b.push(flask(250, 205, 21, 16, 140, { d: 4 }));
  b.push(flask(330, 205, 26, 24, 120, { d: 4 }));
  b.push(S.rect(317, 112, 26, 8, { fill: BRN, fop: 0.5, sw: 1 }));
  b.push(S.path('M250 140 L250 96 L322 96 L322 222', { w: 1.5 }));
  for (let i = 0; i < 3; i++) b.push(S.circle(322 + (i - 1) * 3, 222 - i * 6, 1.8, { sw: 1, c: BLUE }));
  b.push(S.path('M338 112 L338 100 L348 100', { w: 1.5 }));
  const cd2 = condenser(348, 100, 404, 150, 7);
  b.push(cd2);
  b.push(S.line(405, 151, 412, 172, { w: 1.5 }));
  b.push(conical(412, 172, 44, 44));
  b.push(flame(250, 244));
  b.push(S.line(238, 246, 262, 246, { w: 2, c: MUTED }));
  b.push(lab(264, 262, 'steam generator', { a: 'middle' }));
  b.push(lab(330, 246, 'organic liquid', { a: 'middle' }) + lab(330, 258, 'and water', { a: 'middle' }));
  b.push(lab(392, 98, 'condenser', { a: 'middle' }));
  b.push(lab(404, 232, 'distillate', { a: 'middle' }) + lab(404, 244, 'water + organic', { a: 'middle' }));
  b.push(lab(286, 90, 'steam', { a: 'middle' }));
  b.push(S.line(212, 24, 212, 262, { c: MUTED, w: 1, dash: '3 3' }));
  return svgDoc(505, 270, 'Two distillation set-ups side by side. Left: fractional distillation, with a flask heated from below, a fractionating column packed with beads, a thermometer at its top, a slanted water-cooled condenser and a receiver. Right: steam distillation, with a steam generator sending steam into a flask of the organic liquid and water, then a condenser and a receiver.', '<g transform="translate(56,0)">' + b.join('') + '</g>');
})();

// ---------------------------------------------------------------- 2. four more methods
export const METHODS = (() => {
  const b = [];
  const colW = 125;
  const heads = ['Sublimation', 'Crystallisation', 'Solvent extraction', 'Column chromatography'];
  heads.forEach((h, i) => b.push(lab(colW * i + 62, i === 3 ? 12 : 14, i === 3 ? 'Column' : h, { a: 'middle', w: 'bold', size: 11, c: BLUE })));
  b.push(lab(colW * 3 + 62, 25, 'chromatography', { a: 'middle', w: 'bold', size: 11, c: BLUE }));
  // 1 sublimation: china dish, inverted funnel, cotton plug, crystals on the funnel
  const x1 = 62;
  b.push(S.path(`M${x1 - 30} 150 Q${x1} 175 ${x1 + 30} 150 Z`, { w: 1.5, fill: FILL, fop: 0.6 }));
  b.push(poly([[x1 - 22, 148], [x1 + 22, 148], [x1 + 24, 150], [x1 - 24, 150]], { w: 0, fill: BRN, fop: 0.5 }));
  b.push(poly([[x1 - 34, 146], [x1 + 34, 146], [x1 + 5, 80], [x1 - 5, 80]], { w: 1.5 }));
  b.push(S.line(x1 - 5, 80, x1 - 5, 58, { w: 1.5 }) + S.line(x1 + 5, 80, x1 + 5, 58, { w: 1.5 }));
  b.push(S.rect(x1 - 5, 58, 10, 8, { fill: MUTED, fop: 0.4, sw: 1 }));
  for (let k = 0; k < 6; k++) b.push(S.line(x1 - 24 + k * 6, 128 - k * 8 + (k > 2 ? (k - 2) * 12 : 0), x1 - 21 + k * 6, 124 - k * 8 + (k > 2 ? (k - 2) * 12 : 0), { w: 1.2, c: GREEN }));
  b.push(flame(x1, 196));
  b.push(S.line(x1 - 14, 198, x1 + 14, 198, { w: 2, c: MUTED }));
  b.push(lab(x1, 214, 'vapour condenses on', { a: 'middle' }));
  b.push(lab(x1, 226, 'the cool funnel wall', { a: 'middle' }));
  // 2 crystallisation: beaker, crystals, filter funnel
  const x2 = colW + 62;
  b.push(S.path(`M${x2 - 28} 90 L${x2 - 28} 170 L${x2 + 28} 170 L${x2 + 28} 90`, { w: 1.5 }));
  b.push(S.rect(x2 - 27, 112, 54, 57, { c: BLUE, fill: BLUE, fop: 0.2, sw: 0 }));
  [[-18, 0], [-6, 3], [8, 0], [18, 4], [0, -2]].forEach(([dx, dy]) => b.push(poly([[x2 + dx, 166 + dy - 8], [x2 + dx + 5, 166 + dy], [x2 + dx - 5, 166 + dy]], { w: 1, c: GREEN, fill: GREEN, fop: 0.5 })));
  b.push(lab(x2, 80, 'hot saturated solution cools', { a: 'middle', size: 10 }));
  b.push(S.arrow(x2, 182, x2, 196, { size: 5, w: 1 }));
  b.push(poly([[x2 - 26, 200], [x2 + 26, 200], [x2 + 4, 222], [x2 - 4, 222]], { w: 1.5 }));
  b.push(lab(x2, 238, 'filter: crystals stay,', { a: 'middle' }));
  b.push(lab(x2, 250, 'mother liquor passes', { a: 'middle' }));
  // 3 separating funnel
  const x3 = colW * 2 + 62;
  b.push(S.path(`M${x3 - 5} 40 L${x3 - 5} 62 Q${x3 - 34} 80 ${x3 - 34} 112 Q${x3 - 34} 150 ${x3 - 4} 168 L${x3 - 4} 182 L${x3 + 4} 182 L${x3 + 4} 168 Q${x3 + 34} 150 ${x3 + 34} 112 Q${x3 + 34} 80 ${x3 + 5} 62 L${x3 + 5} 40`, { w: 1.5 }));
  b.push(S.rect(x3 - 7, 34, 14, 7, { fill: BRN, fop: 0.5, sw: 1 }));
  b.push(S.path(`M${x3 - 33} 112 L${x3 + 33} 112 Q${x3 + 34} 150 ${x3 + 4} 168 L${x3 - 4} 168 Q${x3 - 34} 150 ${x3 - 33} 112 Z`, { c: BLUE, fill: BLUE, fop: 0.25, w: 0 }));
  b.push(S.line(x3 - 33, 112, x3 + 33, 112, { c: MUTED, w: 1, dash: '3 2' }));
  b.push(S.line(x3 - 10, 176, x3 + 10, 176, { w: 2.5 }));
  b.push(lab(x3, 100, 'ether layer', { a: 'middle' }));
  b.push(lab(x3, 140, 'water layer', { a: 'middle' }));
  b.push(lab(x3, 206, 'shake, vent, settle,', { a: 'middle' }));
  b.push(lab(x3, 218, 'run off lower layer', { a: 'middle' }));
  // 4 column chromatography
  const x4 = colW * 3 + 40;
  b.push(S.rect(x4 - 14, 40, 28, 140, { sw: 1.5 }));
  b.push(S.rect(x4 - 13, 70, 26, 106, { c: MUTED, fill: FILL, fop: 0.7, sw: 0 }));
  b.push(S.rect(x4 - 13, 84, 26, 12, { c: RED, fill: RED, fop: 0.45, sw: 0 }));
  b.push(S.rect(x4 - 13, 120, 26, 12, { c: BLUE, fill: BLUE, fop: 0.45, sw: 0 }));
  b.push(S.line(x4, 180, x4, 196, { w: 1.5 }));
  b.push(S.circle(x4, 204, 2.5, { c: BLUE, fill: BLUE, sw: 1 }));
  b.push(lab(x4 + 18, 56, 'solvent (eluent)', { a: 'start' }));
  b.push(lab(x4 + 18, 93, 'band A', { a: 'start' }) + lab(x4 + 18, 129, 'band B', { a: 'start' }));
  b.push(lab(x4 + 18, 160, 'adsorbent', { a: 'start' }));
  b.push(lab(x4, 226, 'bands separate by', { a: 'middle' }) + lab(x4, 238, 'different adsorption', { a: 'middle' }));
  return svgDoc(520, 256, 'Four purification methods. Sublimation: a solid heated in a china dish, with its vapour condensing on an inverted funnel. Crystallisation: a hot saturated solution cools, crystals form and are filtered. Differential extraction: an organic solvent and water shaken in a separating funnel, then the lower layer run off. Column chromatography: bands of two components move down a column of adsorbent at different speeds.', b.join(''));
})();

// ---------------------------------------------------------------- 3. thin-layer chromatography and Rf (computed)
const FRONT = 8.0; // cm
const SPOTS = [
  { name: 'A', d: 2.0 },
  { name: 'B', d: 4.4 },
  { name: 'C', d: 6.4 },
];
export const TLC = (() => {
  const b = [];
  const px = 22; // px per cm
  const y0 = 235; // start line
  const x0 = 40;
  const w = 220;
  b.push(S.rect(x0, y0 - FRONT * px - 18, w, FRONT * px + 38, { sw: 1.5, fill: FILL, fop: 0.5 }));
  b.push(S.line(x0, y0, x0 + w, y0, { c: MUTED, w: 1, dash: '4 3' }));
  const yf = y0 - FRONT * px;
  b.push(S.line(x0, yf, x0 + w, yf, { c: MUTED, w: 1, dash: '4 3' }));
  b.push(lab(x0 + 5, y0 + 14, 'start line', { a: 'start' }));
  b.push(lab(x0 + 5, yf - 5, 'solvent front', { a: 'start' }));
  const lanes = [55, 110, 165, 220].map((x) => x0 + x - 40);
  const lane = (i) => x0 + 35 + i * 55;
  b.push(lab(lane(0), y0 + 30, 'A', { a: 'middle', w: 'bold' }) + lab(lane(1), y0 + 30, 'B', { a: 'middle', w: 'bold' }) + lab(lane(2), y0 + 30, 'C', { a: 'middle', w: 'bold' }) + lab(lane(3), y0 + 30, 'mix', { a: 'middle', w: 'bold' }));
  void lanes;
  const cols = [RED, BLUE, GREEN];
  SPOTS.forEach((s, i) => {
    b.push(S.ellipse(lane(i), y0 - s.d * px, 7, 6, { c: cols[i], fill: cols[i], fop: 0.55, sw: 1 }));
    b.push(S.ellipse(lane(3), y0 - s.d * px, 7, 6, { c: cols[i], fill: cols[i], fop: 0.55, sw: 1 }));
  });
  b.push(S.circle(lane(3), y0, 6, { c: MUTED, fill: MUTED, fop: 0.4, sw: 1 }));
  // distance dimension for spot B
  const xd = x0 + w + 70;
  b.push(S.line(xd, y0, xd, yf, { w: 1, c: BLUE }) + S.head(xd, yf, -Math.PI / 2, { size: 5, c: BLUE }) + S.head(xd, y0, Math.PI / 2, { size: 5, c: BLUE }));
  b.push(lab(xd + 6, (y0 + yf) / 2 + 4, 'L = 8.0 cm', { a: 'start', c: BLUE }));
  const yb = y0 - SPOTS[1].d * px;
  b.push(S.line(xd - 40, y0, xd - 40, yb, { w: 1, c: RED }) + S.head(xd - 40, yb, -Math.PI / 2, { size: 5, c: RED }) + S.head(xd - 40, y0, Math.PI / 2, { size: 5, c: RED }));
  b.push(lab(xd - 40, yb - 8, 'd = 4.4 cm', { a: 'middle', c: RED }));
  const rf = SPOTS.map((s) => s.d / FRONT);
  b.push(lab(x0 + w / 2, 14, 'Rf = d ÷ L (never more than 1)', { a: 'middle', size: 11, w: 'bold' }));
  b.push(lab(x0 + w / 2, 30, `A: ${rf[0].toFixed(2)}   B: ${rf[1].toFixed(2)}   C: ${rf[2].toFixed(2)}`, { a: 'middle', size: 11 }));
  chk(rf.every((x) => x > 0 && x < 1) && rf[1].toFixed(2) === '0.55', `Rf values computed from the drawn distances: ${rf.map((x) => x.toFixed(2)).join(', ')}`);
  chk(SPOTS.every((s) => s.d < FRONT), 'every spot lies below the solvent front');
  return svgDoc(400, 276, 'A thin-layer chromatography plate with a start line, a solvent front 8.0 cm above it, lanes for pure samples A, B and C and for a mixture. The spots of the mixture sit at the same heights as the pure samples, and the distances d and L used for the Rf value are marked for spot B.', b.join(''));
})();

// ---------------------------------------------------------------- 4. Lassaigne's test (flow with outcomes)
export const LASS = (() => {
  const b = [];
  const box = (x, y, w, h, lines, { c = 'currentColor', fill = 'none', fop = 0.12 } = {}) => S.rect(x, y, w, h, { sw: 1.3, c, rx: 4, fill, fop }) + S.lines(x + w / 2, y + 15, lines, { a: 'middle', size: 10, dy: 12 });
  b.push(box(10, 8, 150, 40, ['organic compound + sodium', 'heated red hot (fusion)'], { c: RED }));
  b.push(S.arrow(160, 28, 190, 28, { size: 6 }));
  b.push(box(190, 8, 130, 40, ['plunge into water, boil,', 'filter: fusion extract'], { c: BLUE }));
  b.push(S.line(255, 48, 255, 62, { w: 1.3 }));
  b.push(S.line(255, 62, 255, 62, { w: 1.3 }));
  const col = [68, 200, 332, 464];
  b.push(S.line(col[0], 62, col[3], 62, { w: 1.3 }));
  col.forEach((x) => b.push(S.arrow(x, 62, x, 76, { size: 6 })));
  const heads = [['Nitrogen', 'NaCN'], ['Sulphur', 'Na₂S'], ['Halogen', 'NaX'], ['N and S together', 'NaSCN']];
  const steps = [
    ['warm with FeSO₄ and', 'NaOH; boil; acidify', 'with dilute H₂SO₄'],
    ['add lead acetate', '(acetic acid present)', 'or sodium nitroprusside'],
    ['boil with dilute HNO₃,', 'cool; add AgNO₃', ''],
    ['acidify with dilute', 'HCl; add FeCl₃', ''],
  ];
  const res = [
    { l: ['Prussian blue colour'], c: BLUE },
    { l: ['black PbS; or violet', 'with nitroprusside'], c: ACC },
    { l: ['AgCl white; AgBr pale', 'yellow; AgI yellow'], c: YEL },
    { l: ['blood-red colour'], c: RED },
  ];
  heads.forEach(([h, s], i) => {
    const x = col[i] - 58;
    b.push(S.rect(x, 76, 116, 28, { sw: 1.3, rx: 4, c: i === 3 ? RED : BLUE, fill: i === 3 ? RED : BLUE, fop: 0.12 }));
    b.push(lab(col[i], 88, h, { a: 'middle', w: 'bold', size: 10 }) + lab(col[i], 100, `${s} in extract`, { a: 'middle', size: 10 }));
    b.push(S.lines(col[i], 124, steps[i].filter(Boolean), { a: 'middle', size: 10, dy: 12 }));
    b.push(S.arrow(col[i], 158, col[i], 172, { size: 6 }));
    b.push(S.rect(col[i] - 62, 174, 124, 36, { sw: 1.3, rx: 4, c: res[i].c, fill: res[i].c, fop: 0.2 }));
    b.push(S.lines(col[i], res[i].l.length === 1 ? 196 : 189, res[i].l, { a: 'middle', size: 10, dy: 12 }));
  });
  b.push(lab(265, 232, 'Boil the extract with HNO₃ before the halogen test: this removes CN⁻ and S²⁻', { a: 'middle', size: 10 }));
  return svgDoc(530, 244, 'Flow chart of Lassaigne test. Sodium fusion of the organic compound gives sodium cyanide, sodium sulphide and sodium halide in the extract. Nitrogen gives Prussian blue with iron sulphate; sulphur gives a black precipitate with lead acetate or a violet colour with sodium nitroprusside; halogens give a silver halide precipitate after boiling with nitric acid; nitrogen and sulphur together give a blood-red colour with iron chloride.', b.join(''));
})();

// ---------------------------------------------------------------- 5. Liebig's combustion train
export const LIEBIG = (() => {
  const b = [];
  const y = 90;
  b.push(lab(260, 16, 'Weigh each absorber before and after the run', { a: 'middle', size: 11, w: 'bold' }));
  // oxygen supply
  b.push(S.rect(10, 70, 34, 52, { sw: 1.5, rx: 6, c: GREEN, fill: GREEN, fop: 0.15 }));
  b.push(lab(27, 101, 'O₂', { a: 'middle', w: 'bold', size: 12 }));
  b.push(lab(27, 138, 'pure', { a: 'middle' }) + lab(27, 150, 'oxygen', { a: 'middle' }));
  b.push(S.arrow(44, y, 74, y, { size: 6 }));
  // furnace and combustion tube
  b.push(S.rect(74, y - 11, 190, 22, { sw: 1.5 }));
  b.push(S.rect(110, y - 26, 118, 52, { sw: 1.5, c: RED, rx: 4, fill: RED, fop: 0.1 }));
  b.push(lab(169, y - 32, 'furnace', { a: 'middle', c: RED }));
  b.push(S.rect(124, y - 9, 20, 18, { sw: 1, c: BRN, fill: BRN, fop: 0.35 }));
  for (let k = 0; k < 9; k++) b.push(S.circle(160 + k * 7, y, 2.5, { c: MUTED, fill: MUTED, fop: 0.5, sw: 1 }));
  b.push(lab(134, y + 44, 'boat with', { a: 'middle' }) + lab(134, y + 56, 'sample', { a: 'middle' }));
  b.push(S.lead(134, y + 34, 134, y + 10));
  b.push(lab(196, y + 44, 'copper(II) oxide', { a: 'middle' }) + lab(196, y + 56, 'granules', { a: 'middle' }));
  b.push(S.lead(196, y + 34, 196, y + 10));
  b.push(lab(169, y + 82, 'combustion tube', { a: 'middle', w: 'bold' }));
  // U-tube of anhydrous CaCl2
  b.push(S.line(264, y, 302, y, { w: 1.5 }));
  b.push(S.path('M296 90 L296 128 A16 16 0 0 0 328 128 L328 90 L316 90 L316 128 A4 4 0 0 1 308 128 L308 90 Z', { w: 1.5, fill: MUTED, fop: 0.3 }));
  b.push(S.line(322, y, 356, y, { w: 1.5 }));
  b.push(lab(300, 166, 'U-tube of anhydrous', { a: 'middle' }) + lab(300, 178, 'CaCl₂ takes up water', { a: 'middle' }));
  b.push(S.lead(312, 154, 312, 148));
  // potash bulbs
  [0, 1, 2].forEach((i) => b.push(S.circle(368 + i * 26, y + 4, 11, { sw: 1.5, c: BLUE, fill: BLUE, fop: 0.22 })));
  b.push(S.line(356, y, 357, y, { w: 1.5 }));
  b.push(S.line(404, y + 4, 436, y + 4, { w: 1.5 }));
  b.push(S.lines(392, 140, ['potash bulbs,', 'conc. KOH takes', 'up carbon dioxide'], { a: 'middle', size: 10, dy: 12 }));
  b.push(S.lead(392, 128, 392, 112));
  // guard tube
  b.push(S.rect(436, y - 6, 18, 36, { sw: 1.2, c: MUTED, fill: FILL, fop: 0.7 }));
  b.push(lab(484, y + 50, 'guard tube', { a: 'middle' }) + lab(484, y + 62, '(soda lime)', { a: 'middle' }));
  b.push(S.lead(470, y + 38, 456, y + 26));
  b.push(S.arrow(445, y - 6, 445, y - 28, { size: 6 }));
  b.push(lab(445, y - 34, 'to air', { a: 'middle' }));
  return svgDoc(535, 196, "Liebig's method for carbon and hydrogen. Pure oxygen passes over a weighed sample in a boat inside a furnace-heated combustion tube packed with copper(II) oxide. The water formed is absorbed in a weighed U-tube of anhydrous calcium chloride, then the carbon dioxide in weighed bulbs of concentrated potassium hydroxide, followed by a soda lime guard tube open to the air.", b.join(''));
})();

// ---------------------------------------------------------------- 6. Kjeldahl digestion and distillation
export const KJELD = (() => {
  const b = [];
  b.push(lab(70, 14, '1. Digestion', { a: 'middle', w: 'bold', size: 12, c: BLUE }));
  b.push(lab(310, 14, '2. Distillation and absorption', { a: 'middle', w: 'bold', size: 12, c: BLUE }));
  // Kjeldahl flask, tilted neck
  b.push(flask(70, 150, 30, 14, 60, { d: 10 }));
  b.push(S.rect(60, 54, 20, 7, { sw: 1, fill: BRN, fop: 0.4 }));
  b.push(flame(70, 196));
  b.push(S.line(52, 198, 88, 198, { w: 2, c: MUTED }));
  b.push(lab(70, 214, 'organic compound', { a: 'middle' }) + lab(70, 226, '+ conc. H₂SO₄ + K₂SO₄', { a: 'middle' }) + lab(70, 238, '+ CuSO₄ (catalyst)', { a: 'middle' }));
  b.push(lab(70, 34, 'N → (NH₄)₂SO₄', { a: 'middle', w: 'bold' }));
  // distillation flask
  b.push(flask(210, 150, 30, 18, 80, { d: 8 }));
  b.push(S.rect(199, 74, 22, 8, { sw: 1, fill: BRN, fop: 0.4 }));
  b.push(S.path('M204 76 L204 50 L190 50', { w: 1.5 }));
  b.push(S.rect(180, 38, 12, 18, { sw: 1.2, c: MUTED, fill: FILL, fop: 0.5 }));
  b.push(lab(186, 30, 'NaOH solution', { a: 'middle' }) + lab(186, 20, '(excess)', { a: 'middle' }));
  b.push(S.path('M214 78 L214 56 L248 56 L248 70', { w: 1.5 }));
  // trap bulb
  b.push(S.circle(248, 82, 12, { sw: 1.5 }));
  b.push(lab(262, 38, 'bulb trap (stops spray)', { a: 'start' }));
  b.push(S.lead(262, 42, 254, 72));
  b.push(S.line(248, 94, 248, 100, { w: 1.5 }));
  // condenser
  const cd = condenser(258, 74, 350, 130, 7);
  b.push(cd);
  b.push(S.line(350, 130, 362, 150, { w: 1.5 }) + S.line(362, 150, 362, 212, { w: 1.5 }));
  b.push(lab(310, 62, 'condenser', { a: 'middle' }));
  // receiver
  b.push(S.path('M330 180 L330 220 Q330 232 342 232 L382 232 Q394 232 394 220 L394 180', { w: 1.5 }));
  b.push(S.rect(331, 196, 62, 35, { sw: 0, c: BLUE, fill: BLUE, fop: 0.25 }));
  b.push(lab(362, 248, 'ammonia absorbed in a known', { a: 'middle' }) + lab(362, 260, 'volume of standard H₂SO₄', { a: 'middle' }));
  b.push(flame(210, 196));
  b.push(S.line(194, 198, 226, 198, { w: 2, c: MUTED }));
  b.push(lab(210, 214, 'heat', { a: 'middle' }));
    return svgDoc(440, 268, 'Kjeldahl method in two stages. Digestion: the compound is heated in a long-necked flask with concentrated sulphuric acid, potassium sulphate and copper sulphate, so that its nitrogen becomes ammonium sulphate. Distillation: the digest is made strongly alkaline with sodium hydroxide, the ammonia passes through a bulb trap and a condenser, and is absorbed in a measured volume of standard sulphuric acid.', b.join(''));
})();

// ---------------------------------------------------------------- 7. Carius method
export const CARIUS = (() => {
  const b = [];
  // furnace and tube
  b.push(S.rect(10, 60, 150, 36, { sw: 1.5, c: RED, rx: 4, fill: RED, fop: 0.12 }));
  b.push(lab(85, 52, 'iron-jacketed furnace', { a: 'middle', c: RED }));
  b.push(S.path('M20 78 L135 78 Q150 78 150 78', { w: 2 }));
  b.push(S.rect(18, 70, 124, 16, { sw: 1.5, rx: 8 }));
  b.push(S.rect(30, 74, 22, 8, { sw: 1, c: BRN, fill: BRN, fop: 0.4 }));
  b.push(S.rect(56, 74, 80, 8, { sw: 0, c: BLUE, fill: BLUE, fop: 0.25 }));
  b.push(lab(85, 120, 'sealed hard-glass tube', { a: 'middle' }));
  b.push(lab(85, 132, 'sample in a small ignition tube,', { a: 'middle' }));
  b.push(lab(85, 144, 'fuming HNO₃ (+ AgNO₃ for X)', { a: 'middle' }));
  b.push(lab(85, 156, 'heated for several hours', { a: 'middle' }));
  b.push(S.arrow(164, 78, 204, 78, { size: 6 }));
  b.push(lab(184, 66, 'cool, open,', { a: 'middle' }) + lab(184, 100, 'dilute', { a: 'middle' }));
  const out = [
    ['Carbon, hydrogen', 'oxidised to CO₂ and H₂O (not weighed)'],
    ['Halogen X', 'with AgNO₃: AgX precipitate (filter, dry, weigh)'],
    ['Sulphur', 'H₂SO₄ + BaCl₂ → BaSO₄ (filter, dry, weigh)'],
    ['Phosphorus', 'H₃PO₄ + magnesia mixture → MgNH₄PO₄; ignite → Mg₂P₂O₇'],
  ];
  out.forEach(([h, t], i) => {
    const y = 10 + i * 40;
    b.push(S.line(212, 78, 236, y + 17, { w: 1, c: MUTED }));
    b.push(S.rect(236, y, 330, 34, { sw: 1.3, rx: 4, c: i === 0 ? MUTED : BLUE, fill: i === 0 ? MUTED : BLUE, fop: 0.1 }));
    b.push(lab(246, y + 14, h, { w: 'bold', size: 11 }));
    b.push(lab(246, y + 28, t, { size: 10 }));
  });
  b.push(lab(400, 186, 'Compare the mass of precipitate with the mass of compound taken', { a: 'middle', size: 10 }));
  return svgDoc(580, 196, 'Carius method. A sealed thick glass tube holding the organic compound and fuming nitric acid is heated in a furnace. Halogens give silver halide with silver nitrate, sulphur is oxidised to sulphuric acid and weighed as barium sulphate, and phosphorus is oxidised to phosphoric acid, precipitated as magnesium ammonium phosphate and ignited to magnesium pyrophosphate.', b.join(''));
})();
