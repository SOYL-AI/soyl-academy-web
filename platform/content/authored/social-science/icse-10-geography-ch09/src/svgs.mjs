// ICSE 10 Geography ch09 diagrams (allow-listed elements, palette colours only). Schematic diagrams are labelled "not to scale".
// The rooftop-harvest figures, irrigation efficiencies and district irrigation shares are ILLUSTRATIVE (rounded, made-up but
// realistic values), exported so questions compute every answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm
// geometry and data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- ILLUSTRATIVE rooftop harvest (1 mm of rain on 1 square metre = 1 litre)
export const ROOF = { place: 'a housing society in Pune', area: 100, rain: 700, coeff: 0.8, usePerDay: 400 };
/** Litres harvested = roof area (m²) × rainfall (mm) × runoff coefficient. */
export const harvest = (area, rain, coeff) => Math.round(area * rain * coeff);
export const ROOF_L = harvest(ROOF.area, ROOF.rain, ROOF.coeff);

// ---------------------------------------------------------------- ILLUSTRATIVE application efficiency (share of applied water that reaches the roots)
export const EFF = [
  { method: 'Flooding by canal water', eff: 0.5 },
  { method: 'Sprinkler', eff: 0.75 },
  { method: 'Drip', eff: 0.9 },
];
export const NEED = 4500; // cubic metres per hectare reaching the roots (illustrative crop need)
export const applied = (eff) => Math.round(NEED / eff);

// ---------------------------------------------------------------- ILLUSTRATIVE shares of net irrigated area by source (per cent)
export const DISTRICTS = {
  A: { label: 'District A', wells: 72, canals: 24, tanks: 1, other: 3 },
  B: { label: 'District B', wells: 30, canals: 18, tanks: 42, other: 10 },
};
const sum = (d) => d.wells + d.canals + d.tanks + d.other;
check(sum(DISTRICTS.A) === 100 && sum(DISTRICTS.B) === 100, 'district irrigation shares: each illustrative district’s four shares add up to 100 per cent');

// ---------------------------------------------------------------- surface water and groundwater: cross-section
export const SOURCES = (() => {
  let s = '';
  const ground = 110;
  const wt = 150; // water table
  const base = 215; // impermeable rock
  s += S.rect(10, ground, 420, base - ground, { fill: BROWN, fop: 0.25, c: 'none', sw: 0 });
  s += S.rect(10, wt, 420, base - wt, { fill: BLUE, fop: 0.25, c: 'none', sw: 0 });
  s += S.line(10, ground, 430, ground, { w: 1.5 }) + S.line(10, wt, 430, wt, { c: BLUE, w: 1.5, dash: '6 4' });
  s += S.rect(10, base, 420, 15, { fill: MUT, fop: 0.5, c: 'none', sw: 0 }) + lab(220, base + 12, 'impermeable rock', { a: 'middle', size: 10 });
  // river / lake on the surface
  s += S.path(`M30 ${ground} Q70 ${ground + 22} 110 ${ground} Z`, { fill: BLUE, fop: 0.6, c: BLUE, w: 1 }) + lab(70, ground - 6, 'river or lake', { a: 'middle', size: 10 });
  // rain and infiltration
  for (let i = 0; i < 6; i++) s += S.line(150 + i * 14, 20 + (i % 2) * 6, 145 + i * 14, 36 + (i % 2) * 6, { c: BLUE, w: 1.5 });
  s += lab(185, 16, 'rain', { a: 'middle', size: 10 });
  s += S.arrow(180, ground + 4, 180, wt - 4, { c: BLUE, w: 1.5, size: 6 }) + lab(186, ground + 24, 'water soaks in', { size: 10 });
  // dug well (shallow) and tube well (deep)
  const dugBottom = wt + 18;
  const tubeBottom = base - 8;
  s += S.rect(290, ground - 10, 20, dugBottom - ground + 10, { c: 'currentColor', sw: 1.5 }) + lab(300, ground - 14, 'dug well', { a: 'middle', size: 10 });
  s += S.line(380, ground - 18, 380, tubeBottom, { c: ACC, w: 3 }) + S.rect(370, ground - 30, 20, 12, { fill: ACC, fop: 0.6, c: ACC, sw: 1 }) + lab(380, ground - 34, 'tube well and pump', { a: 'middle', size: 10 });
  s += lab(30, wt - 6, 'water table', { size: 10, c: BLUE }) + lab(30, wt + 30, 'groundwater in an aquifer', { size: 10 });
  s += lab(220, 245, 'Schematic, not to scale', { a: 'middle', size: 10, c: MUT });
  const ok = dugBottom > wt && tubeBottom > dugBottom && tubeBottom < base;
  check(ok, 'water sources: the dug well just reaches below the water table, the tube well goes deeper into the aquifer, and both stop above the impermeable rock');
  return svgDoc(440, 252, 'Schematic cross-section. Surface water lies in a river or lake. Rain soaks into the ground down to the water table; below it the rock is saturated with groundwater, an aquifer, resting on impermeable rock. A shallow dug well reaches just below the water table and a deeper tube well with a pump reaches far into the aquifer.', s);
})();

// ---------------------------------------------------------------- rooftop rainwater harvesting
export const ROOFTOP = (() => {
  let s = '';
  // house and roof
  s += S.path('M40 90 L130 40 L220 90 Z', { fill: BROWN, fop: 0.35, c: 'currentColor', w: 1.5 }) + S.rect(55, 90, 150, 90, { c: 'currentColor', sw: 1.5 });
  for (let i = 0; i < 5; i++) s += S.line(90 + i * 22, 8, 84 + i * 22, 24, { c: BLUE, w: 1.5 });
  s += lab(130, 34, `roof ${ROOF.area} square metres`, { a: 'middle', size: 10 });
  // gutter and down pipe
  s += S.line(215, 90, 240, 90, { c: BLUE, w: 3 }) + S.line(240, 90, 240, 150, { c: BLUE, w: 3 });
  s += lab(246, 100, 'gutter and down pipe', { size: 10 });
  // first flush and filter
  s += S.rect(232, 150, 16, 18, { c: 'currentColor', sw: 1.2 }) + lab(252, 162, 'first-flush (dirty first rain out)', { size: 10 });
  s += S.rect(228, 172, 24, 16, { fill: MUT, fop: 0.4, c: 'currentColor', sw: 1.2 }) + lab(256, 184, 'filter (sand, gravel)', { size: 10 });
  // storage tank and recharge pit
  s += S.arrow(240, 188, 240, 202, { c: BLUE, w: 2, size: 6 });
  s += S.rect(200, 204, 80, 34, { fill: BLUE, fop: 0.35, c: 'currentColor', sw: 1.5 }) + lab(240, 225, 'storage tank', { a: 'middle', size: 10 });
  s += S.arrow(282, 220, 330, 220, { c: BLUE, w: 2, size: 6 }) + lab(306, 214, 'overflow', { a: 'middle', size: 10 });
  s += S.rect(332, 205, 50, 30, { fill: BROWN, fop: 0.3, c: 'currentColor', sw: 1.5 }) + lab(357, 248, 'recharge pit', { a: 'middle', size: 10 });
  s += S.arrow(357, 236, 357, 268, { c: BLUE, w: 2, size: 6 }) + lab(366, 266, 'to groundwater', { size: 10 });
  s += lab(110, 205, `Illustrative: ${ROOF.area} m² × ${ROOF.rain} mm × ${ROOF.coeff}`, { a: 'middle', size: 10 }) + lab(110, 220, `= ${ROOF_L} litres a year`, { a: 'middle', size: 10, w: 'bold' });
  s += lab(220, 290, 'Schematic, not to scale', { a: 'middle', size: 10, c: MUT });
  const ok = Math.abs(ROOF_L - ROOF.area * ROOF.rain * ROOF.coeff) < 0.5;
  check(ok, `rooftop harvesting: the label shows the harvest computed from the illustrative figures (${ROOF.area} × ${ROOF.rain} × ${ROOF.coeff} = ${ROOF_L} litres), and water flows downward from roof to tank to recharge pit`);
  return svgDoc(440, 298, `Schematic of rooftop rainwater harvesting. Rain on the roof runs into a gutter and down pipe, passes a first-flush device that discards the dirty first rain and a sand and gravel filter, and is stored in a tank; overflow goes to a recharge pit that lets water soak down to the groundwater. Illustrative harvest ${ROOF.area} square metres times ${ROOF.rain} millimetres times ${ROOF.coeff} equals ${ROOF_L} litres a year.`, s);
})();

// ---------------------------------------------------------------- inundation and perennial canals (schematic levels)
export const LEVELS = { flood: 70, low: 130, inundationIntake: 100, pond: 60, perennialIntake: 95 };
export const CANALS = (() => {
  let s = '';
  const L = LEVELS;
  // panel 1: river without barrage
  s += S.rect(20, 40, 180, 140, { c: MUT, sw: 1 });
  s += S.path(`M30 ${L.low} L190 ${L.low} L190 175 L30 175 Z`, { fill: BLUE, fop: 0.5, c: 'none', w: 0 });
  s += S.line(30, L.flood, 190, L.flood, { c: BLUE, w: 1.5, dash: '6 4' }) + lab(110, L.flood - 6, 'flood level (rainy season)', { a: 'middle', size: 10, c: BLUE });
  s += lab(110, L.low - 6, 'low water (dry season)', { a: 'middle', size: 10 });
  s += S.line(30, L.inundationIntake, 190, L.inundationIntake, { c: ACC, w: 2 }) + lab(110, L.inundationIntake + 14, 'canal intake', { a: 'middle', size: 10, c: ACC });
  s += lab(110, 30, 'Inundation canal: no barrage', { a: 'middle', w: 'bold' });
  // panel 2: barrage holds water up
  s += S.rect(240, 40, 180, 140, { c: MUT, sw: 1 });
  s += S.path(`M250 ${L.pond} L330 ${L.pond} L330 175 L250 175 Z`, { fill: BLUE, fop: 0.5, c: 'none', w: 0 });
  s += S.rect(330, 50, 12, 125, { fill: 'currentColor', fop: 0.6, c: 'currentColor', sw: 1 }) + lab(336, 192, 'barrage', { a: 'middle', size: 10 });
  s += S.path(`M342 ${L.low} L410 ${L.low} L410 175 L342 175 Z`, { fill: BLUE, fop: 0.5, c: 'none', w: 0 });
  s += S.line(250, L.perennialIntake, 330, L.perennialIntake, { c: ACC, w: 2 }) + lab(290, L.perennialIntake + 14, 'canal intake', { a: 'middle', size: 10, c: ACC });
  s += lab(290, L.pond - 6, 'pond level, all year', { a: 'middle', size: 10, c: BLUE });
  s += lab(330, 30, 'Perennial canal: barrage', { a: 'middle', w: 'bold' });
  s += lab(220, 212, 'Schematic, not to scale', { a: 'middle', size: 10, c: MUT });
  // in screen coordinates a smaller y is higher
  const inundOk = L.flood < L.inundationIntake && L.inundationIntake < L.low; // intake above low water, below flood level
  const perenOk = L.pond < L.perennialIntake; // pond level always above the intake
  check(inundOk && perenOk, 'canals: the inundation-canal intake lies above the dry-season water level but below flood level (water only in floods), while the barrage keeps the pond level above the perennial-canal intake all year');
  return svgDoc(440, 220, 'Two schematic panels. Left: a river without a barrage; its canal intake lies above the dry-season water level but below the flood level, so water enters only during floods, as in an inundation canal. Right: a barrage holds the river up so that the pond level stays above the canal intake all year, as in a perennial canal.', s);
})();

// ---------------------------------------------------------------- drip and sprinkler (schematic) with illustrative water applied
export const MODERN = (() => {
  let s = '';
  // drip panel
  s += S.line(20, 80, 200, 80, { c: BLUE, w: 3 }) + lab(110, 70, 'drip pipe with emitters', { a: 'middle', size: 10 });
  const plants = [45, 95, 145, 195];
  plants.forEach((x) => {
    s += S.line(x, 80, x, 98, { c: BLUE, w: 1.5 }) + S.circle(x, 104, 2.5, { fill: BLUE, c: BLUE, sw: 0 });
    s += S.line(x, 150, x, 120, { c: GREEN, w: 2 }) + S.circle(x, 114, 8, { fill: GREEN, fop: 0.5, c: GREEN, sw: 1 });
    s += S.ellipse(x, 150, 14, 6, { fill: BLUE, fop: 0.35, c: 'none', sw: 0 });
  });
  s += S.line(15, 150, 210, 150, { c: BROWN, w: 2 }) + lab(110, 172, 'wet patch only at each root zone', { a: 'middle', size: 10 });
  s += lab(110, 30, 'Drip irrigation', { a: 'middle', w: 'bold' });
  // sprinkler panel
  s += S.line(320, 150, 320, 90, { c: 'currentColor', w: 2 }) + S.circle(320, 88, 4, { fill: 'currentColor', c: 'currentColor', sw: 0 });
  for (let a = -60; a <= 60; a += 30) {
    const rad = ((a - 90) * Math.PI) / 180;
    s += S.path(`M320 88 Q${320 + 60 * Math.cos(rad)} ${88 + 60 * Math.sin(rad) - 10} ${320 + 95 * Math.sin((a * Math.PI) / 180)} 140`, { c: BLUE, w: 1.2, dash: '3 3' });
  }
  s += S.line(230, 150, 420, 150, { c: BROWN, w: 2 }) + lab(325, 172, 'spray falls like rain', { a: 'middle', size: 10 });
  s += lab(325, 30, 'Sprinkler irrigation', { a: 'middle', w: 'bold' });
  s += lab(220, 195, 'Schematic, not to scale', { a: 'middle', size: 10, c: MUT });
  check(plants.every((x) => x >= 20 && x <= 200), 'drip and sprinkler: each drip emitter is drawn directly above a plant on the pipe');
  return svgDoc(440, 202, 'Two schematic panels. Drip irrigation: a pipe with emitters lets water fall drop by drop at the base of each plant, wetting only the root zone. Sprinkler irrigation: a rotating nozzle on a riser sprays water over the crop like rain.', s);
})();
export const EFF_CHART = (() => {
  const X0 = 70;
  const Y0 = 180;
  const H = 140;
  const max = 10000;
  const W = 70;
  let s = S.line(X0, Y0, X0 + EFF.length * (W + 40) + 20, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let t = 0; t <= max; t += 2500) s += lab(X0 - 6, Y0 - (t / max) * H + 4, String(t), { a: 'end', size: 10 });
  let ok = true;
  const short = ['Flooding', 'Sprinkler', 'Drip'];
  EFF.forEach((e, i) => {
    const v = applied(e.eff);
    const h = (v / max) * H;
    const x = X0 + 25 + i * (W + 40);
    s += S.rect(x, Y0 - h, W, h, { fill: BLUE, fop: 0.45, c: BLUE, sw: 1 });
    s += lab(x + W / 2, Y0 - h - 5, String(v), { a: 'middle', w: 'bold' }) + lab(x + W / 2, Y0 + 15, `${short[i]} (${Math.round(e.eff * 100)}%)`, { a: 'middle', size: 10 });
    if (Math.abs(h - (v / max) * H) > 1e-9) ok = false;
    if (i > 0 && !(v < applied(EFF[i - 1].eff))) ok = false;
  });
  s += lab(12, 28, `water applied (cubic metres per hectare) to deliver ${NEED} to the roots`, { size: 10 });
  s += lab(230, 214, 'Illustrative efficiencies and crop need', { a: 'middle', size: 10, c: MUT });
  check(ok, `efficiency chart: bar heights equal need ÷ efficiency (${EFF.map((e) => applied(e.eff)).join(', ')} cubic metres) and fall as efficiency rises`);
  return svgDoc(440, 222, `Bar chart, illustrative: to deliver ${NEED} cubic metres of water per hectare to crop roots, flooding at ${Math.round(EFF[0].eff * 100)} per cent efficiency needs ${applied(EFF[0].eff)}, sprinkler at ${Math.round(EFF[1].eff * 100)} per cent needs ${applied(EFF[1].eff)}, and drip at ${Math.round(EFF[2].eff * 100)} per cent needs ${applied(EFF[2].eff)} cubic metres.`, s);
})();
