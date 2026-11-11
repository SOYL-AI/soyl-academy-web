// Hand-drawn SVG schematics for ISC 11 ch01 (allow-listed elements, palette colours only). Geometry and data computed here.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;

// 1. Precision and accuracy: three students each read a 25.00 mL standard three times.
const TRUE_V = 25.0;
const SETS = [
  { name: 'Student 1', v: [24.95, 24.99, 25.04], c: 'var(--diagram-green)', note: 'precise and accurate' },
  { name: 'Student 2', v: [25.58, 25.62, 25.66], c: 'var(--diagram-red)', note: 'precise, not accurate' },
  { name: 'Student 3', v: [24.4, 25.85, 25.1], c: 'var(--diagram-blue)', note: 'scattered, mean near the true value' },
];
const lo = 24.2;
const hi = 26.0;
const X0 = 110;
const XW = 330;
const px = (v) => X0 + ((v - lo) / (hi - lo)) * XW;
chk(near(mean(SETS[0].v), 24.99, 0.001) && Math.max(...SETS[0].v) - Math.min(...SETS[0].v) < 0.1, 'precision strip: student 1 mean 24.99 mL, spread under 0.1 mL');
chk(near(mean(SETS[1].v), 25.62, 0.001) && Math.abs(mean(SETS[1].v) - TRUE_V) > 0.5, 'precision strip: student 2 mean 25.62 mL is more than 0.5 mL from 25.00');
chk(Math.abs(mean(SETS[2].v) - TRUE_V) < 0.15 && Math.max(...SETS[2].v) - Math.min(...SETS[2].v) > 1, 'precision strip: student 3 mean within 0.15 mL of 25.00 but spread above 1 mL');
chk(SETS.every((s) => s.v.every((v) => v >= lo && v <= hi)), 'precision strip: every reading lies on the drawn axis');
function strip() {
  let out = '';
  SETS.forEach((s, i) => {
    const y = 52 + i * 62;
    out += lab(8, y + 4, s.name, { w: 'bold' });
    out += S.line(X0, y, X0 + XW, y, { c: 'var(--diagram-muted)', w: 1 });
    s.v.forEach((v) => (out += S.circle(px(v), y, 6, { fill: s.c, fop: 0.6, c: s.c, sw: 1.5 })));
    out += lab(X0 + XW + 6, y - 2, s.note.split(',')[0], { size: 10 });
    out += lab(X0 + XW + 6, y + 11, s.note.includes(',') ? s.note.split(',').slice(1).join(',').trim() : '', { size: 10 });
  });
  out += S.line(px(TRUE_V), 26, px(TRUE_V), 198, { c: 'var(--diagram-brown)', w: 1.5, dash: '5 4' });
  out += lab(px(TRUE_V), 18, 'true value 25.00 mL', { a: 'middle', size: 10, c: 'var(--diagram-brown)' });
  [24.5, 25.0, 25.5, 26.0].forEach((t) => {
    out += S.line(px(t), 198, px(t), 203, { w: 1 });
    out += lab(px(t), 216, t.toFixed(1), { a: 'middle', size: 10 });
  });
  out += S.line(X0, 198, X0 + XW, 198, { w: 1 });
  out += lab(X0 + XW / 2, 232, 'volume read from the pipette / mL', { a: 'middle', size: 10 });
  return out;
}
export const PREC_ACC = svgDoc(
  600,
  240,
  'Dot plot of three sets of three readings of a 25.00 millilitre standard volume. Student 1 readings 24.95, 24.99 and 25.04 cluster tightly on the true value, so they are precise and accurate. Student 2 readings 25.58, 25.62 and 25.66 cluster tightly but about 0.6 above the true value, so they are precise but not accurate. Student 3 readings 24.4, 25.85 and 25.1 are scattered, although their mean is close to the true value.',
  strip(),
);

// 2. Volume conversion ladder: m3, dm3 (litre) and cm3 (millilitre).
const f = 1000;
const vL = 2.5;
const inM3 = vL / f;
const inMl = vL * f;
chk(near(inM3, 2.5e-3, 1e-9) && near(inMl, 2500, 1e-9), 'volume ladder: 2.50 L is 2.50e-3 m3 and 2500 mL');
chk(near(10 ** 3, 1000, 1e-9), 'volume ladder: (10 dm)^3 per m^3 is 10^3 dm^3');
function box(cx, cy, w, h, l1, l2, fill) {
  return S.rect(cx - w / 2, cy - h / 2, w, h, { fill, fop: 0.3, rx: 8 }) + lab(cx, cy - 2, l1, { a: 'middle', w: 'bold', size: 12 }) + lab(cx, cy + 13, l2, { a: 'middle', size: 10 });
}
export const VOL_LADDER = svgDoc(
  560,
  190,
  'Conversion ladder for volume units. One cubic metre equals one thousand cubic decimetres. One cubic decimetre, which is one litre, equals one thousand cubic centimetres, which is one thousand millilitres. Moving to the right multiplies by one thousand and moving to the left divides by one thousand. Worked example: 2.50 litres is 2.50 times ten to the minus three cubic metres and 2500 millilitres.',
  [
    box(80, 70, 120, 52, 'm³', 'cubic metre (SI)', 'var(--diagram-blue)'),
    box(280, 70, 130, 52, 'dm³ = L', 'litre', 'var(--diagram-green)'),
    box(480, 70, 130, 52, 'cm³ = mL', 'millilitre', 'var(--diagram-yellow)'),
    S.arrow(142, 58, 214, 58, { c: 'var(--diagram-accent)', size: 6 }),
    lab(178, 50, '× 10³', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    S.arrow(214, 84, 142, 84, { c: 'var(--diagram-red)', size: 6 }),
    lab(178, 100, '÷ 10³', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.arrow(346, 58, 414, 58, { c: 'var(--diagram-accent)', size: 6 }),
    lab(380, 50, '× 10³', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    S.arrow(414, 84, 346, 84, { c: 'var(--diagram-red)', size: 6 }),
    lab(380, 100, '÷ 10³', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(280, 150, `Example: ${vL.toFixed(2)} L = ${(inM3 * 1000).toFixed(2)} × 10⁻³ m³ = ${inMl} mL`, { a: 'middle', size: 12, w: 'bold' }),
    lab(280, 172, '1 m = 10 dm, so 1 m³ = (10 dm)³ = 10³ dm³', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Gay-Lussac: N2 + 3 H2 -> 2 NH3, boxes of equal volume at the same temperature and pressure.
const REACT = { N2: 1, H2: 3, NH3: 2 };
chk(REACT.N2 + REACT.H2 === 4 && REACT.NH3 === 2, 'combining volumes: 1 + 3 volumes give 2 volumes (a contraction of 2)');
chk(REACT.N2 * 2 === REACT.NH3 * 1 && REACT.H2 * 2 === REACT.NH3 * 3, 'combining volumes: atoms of N and H balance (N: 2 = 2, H: 6 = 6)');
function vols(x0, y0, n, label, col, per) {
  let out = '';
  for (let i = 0; i < n; i++) out += S.rect(x0 + i * 46, y0, 40, 40, { fill: col, fop: 0.35, c: col, sw: 1.5, rx: 3 });
  out += lab(x0 + (n * 46 - 6) / 2, y0 + 58, label, { a: 'middle', w: 'bold' });
  out += lab(x0 + (n * 46 - 6) / 2, y0 + 72, per, { a: 'middle', size: 10 });
  return out;
}
export const COMBINING_VOLS = svgDoc(
  560,
  170,
  'Equal-sized boxes stand for equal volumes of gas at the same temperature and pressure. One box of nitrogen plus three boxes of hydrogen give two boxes of ammonia. The volume ratio 1 to 3 to 2 is a simple whole-number ratio, which is Gay-Lussac law of combining volumes.',
  [
    vols(14, 40, 1, 'nitrogen', 'var(--diagram-blue)', '1 volume'),
    lab(76, 66, '+', { a: 'middle', size: 18, w: 'bold' }),
    vols(96, 40, 3, 'hydrogen', 'var(--diagram-green)', '3 volumes'),
    S.arrow(246, 60, 306, 60, { size: 8 }),
    vols(330, 40, 2, 'ammonia', 'var(--diagram-red)', '2 volumes'),
    lab(280, 148, 'Same T and P: volume ratio N₂ : H₂ : NH₃ = 1 : 3 : 2', { a: 'middle', size: 12, w: 'bold' }),
    lab(280, 18, 'Gay-Lussac: gases combine in simple whole-number volume ratios', { a: 'middle', size: 11 }),
  ].join(''),
);

// 4. Reciprocal proportions: hydrogen, sulfur, oxygen.
const mH = 1.0;
const mS = 16.0; // g S per 1.00 g H in H2S (32/2)
const mO = 8.0; // g O per 1.00 g H in H2O (16/2)
const viaH = mS / mO; // S : O through hydrogen = 2
const direct = 32.0 / 32.0; // SO2: 32 g S per 32 g O
chk(near(viaH, 2.0, 1e-9), 'reciprocal triangle: S : O through hydrogen is 16 : 8 = 2 : 1');
chk(near(direct / viaH, 0.5, 1e-9), 'reciprocal triangle: direct ratio 1 : 1 is 1/2 of the ratio through hydrogen');
const TOP = { x: 280, y: 36 };
const BL = { x: 110, y: 168 };
const BR = { x: 450, y: 168 };
function vtx(p, l, fill) {
  return S.circle(p.x, p.y, 20, { fill, fop: 0.4 }) + lab(p.x, p.y + 4, l, { a: 'middle', w: 'bold', size: 14 });
}
export const RECIP_TRIANGLE = svgDoc(
  560,
  240,
  'Triangle diagram of the law of reciprocal proportions with hydrogen at the top, sulfur at bottom left and oxygen at bottom right. In hydrogen sulfide, 1.00 gram of hydrogen combines with 16.0 grams of sulfur. In water, 1.00 gram of hydrogen combines with 8.0 grams of oxygen. So sulfur to oxygen through hydrogen is 16 to 8, which is 2 to 1. In sulfur dioxide, 32.0 grams of sulfur combine directly with 32.0 grams of oxygen, which is 1 to 1, one half of the ratio through hydrogen: a simple multiple.',
  [
    S.line(TOP.x - 14, TOP.y + 16, BL.x + 12, BL.y - 14, { c: 'var(--diagram-green)', w: 2 }),
    S.line(TOP.x + 14, TOP.y + 16, BR.x - 12, BR.y - 14, { c: 'var(--diagram-red)', w: 2 }),
    S.line(BL.x + 22, BL.y, BR.x - 22, BR.y, { c: 'var(--diagram-blue)', w: 2, dash: '6 4' }),
    vtx(TOP, 'H', 'var(--diagram-yellow)'),
    vtx(BL, 'S', 'var(--diagram-green)'),
    vtx(BR, 'O', 'var(--diagram-red)'),
    lab(96, 90, 'H₂S: 1.00 g H', { a: 'end', size: 11 }),
    lab(96, 104, 'with 16.0 g S', { a: 'end', size: 11 }),
    lab(464, 90, 'H₂O: 1.00 g H', { size: 11 }),
    lab(464, 104, 'with 8.0 g O', { size: 11 }),
    lab(280, 188, 'SO₂ (direct): 32.0 g S with 32.0 g O, S : O = 1 : 1', { a: 'middle', size: 11 }),
    lab(280, 212, `Through H: S : O = ${mS} : ${mO} = ${viaH} : 1; direct 1 : 1 is ½ of this`, { a: 'middle', size: 11, w: 'bold' }),
    lab(280, 130, 'same or simple multiple', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 5. Conservation of mass: 4.80 g Mg + 3.20 g O -> 8.00 g MgO.
const MG = 4.8;
const OX = 3.2;
const MGO = 8.0;
chk(near(MG + OX, MGO, 1e-9), 'conservation bars: 4.80 g + 3.20 g = 8.00 g');
chk(near((MG / 24) * 16, OX, 1e-9), 'conservation bars: 0.200 mol Mg combines with 0.200 mol O atoms = 3.20 g O (Mg : O = 3 : 2 by mass)');
const scl = 15;
const baseY = 170;
function stack(x, parts, w) {
  let y = baseY;
  let out = '';
  parts.forEach(([v, col, l]) => {
    const h = v * scl;
    y -= h;
    out += S.rect(x, y, w, h, { fill: col, fop: 0.45, c: col, sw: 1.5 });
    out += lab(x + w / 2, y + h / 2 + 4, l, { a: 'middle', size: 11 });
  });
  return out;
}
export const MASS_BARS = svgDoc(
  500,
  215,
  'Two stacked bars on the same scale. Before the reaction in a sealed vessel the magnesium of mass 4.80 grams and the oxygen of mass 3.20 grams total 8.00 grams. After the reaction the magnesium oxide formed has mass 8.00 grams. The two bars are equally tall, which shows conservation of mass.',
  [
    S.line(30, baseY, 470, baseY, { w: 1.5 }),
    stack(70, [[OX, 'var(--diagram-red)', 'O₂ 3.20 g'], [MG, 'var(--diagram-blue)', 'Mg 4.80 g']], 110),
    lab(125, baseY + 16, 'Before', { a: 'middle', w: 'bold' }),
    lab(125, baseY - 8 * scl - 8, "total 8.00 g", { a: 'middle', size: 11 }),
    S.arrow(210, 110, 285, 110, { size: 8 }),
    lab(247, 100, 'reaction', { a: 'middle', size: 10 }),
    lab(247, 128, 'sealed', { a: 'middle', size: 10 }),
    stack(310, [[MGO, 'var(--diagram-green)', 'MgO 8.00 g']], 110),
    lab(365, baseY + 16, 'After', { a: 'middle', w: 'bold' }),
    lab(365, baseY - 8 * scl - 8, "total 8.00 g", { a: 'middle', size: 11 }),
    lab(250, 205, '2 Mg + O₂ → 2 MgO: mass before = mass after', { a: 'middle', size: 10 }),
  ].join(''),
);
