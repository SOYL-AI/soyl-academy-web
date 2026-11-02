// ICSE 10 Geography ch08 diagrams (allow-listed elements, palette colours only). Schematic diagrams are labelled "not to scale".
// Station rainfall, the forest-area table and the mountain temperatures are ILLUSTRATIVE (rounded, made-up but realistic values),
// exported so questions compute every answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm geometry and data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const YEL = 'var(--diagram-yellow)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- rainfall bands (cm a year; approximate textbook limits)
export const BANDS = [
  { type: 'Tropical desert (thorn)', min: 0, max: 70, c: YEL },
  { type: 'Dry deciduous', min: 70, max: 100, c: BROWN },
  { type: 'Moist deciduous', min: 100, max: 200, c: GREEN },
  { type: 'Tropical evergreen', min: 200, max: 400, c: BLUE },
];
/** Forest type expected for a given annual rainfall in cm (lowland, tropical). */
export const forestFor = (cm) => BANDS.find((b) => cm >= b.min && cm < b.max)?.type ?? BANDS[BANDS.length - 1].type;
// ILLUSTRATIVE stations (annual rainfall, cm)
export const STATIONS = [
  { id: 'P', where: 'windward slope of the Western Ghats', cm: 280 },
  { id: 'Q', where: 'Chota Nagpur plateau', cm: 140 },
  { id: 'R', where: 'plains of south Bihar', cm: 85 },
  { id: 'S', where: 'western Rajasthan', cm: 30 },
];

export const RAIN_BAND = (() => {
  const X0 = 30;
  const W = 380;
  const max = 400;
  const x = (cm) => X0 + (cm / max) * W;
  let s = '';
  for (const b of BANDS) {
    s += S.rect(x(b.min), 70, x(b.max) - x(b.min), 40, { fill: b.c, fop: 0.45, c: 'currentColor', sw: 1 });
  }
  s += lab((x(0) + x(70)) / 2, 128, 'Thorn', { a: 'middle', size: 10 }) + lab((x(70) + x(100)) / 2, 142, 'Dry dec.', { a: 'middle', size: 10 });
  s += lab((x(100) + x(200)) / 2, 128, 'Moist deciduous', { a: 'middle', size: 10 }) + lab((x(200) + x(400)) / 2, 128, 'Tropical evergreen', { a: 'middle', size: 10 });
  for (const t of [0, 70, 100, 200, 300, 400]) s += S.line(x(t), 110, x(t), 116, { w: 1 }) + lab(x(t), 160, String(t), { a: 'middle', size: 10 });
  s += lab(X0 + W / 2, 178, 'annual rainfall (cm)', { a: 'middle', size: 10 });
  let ok = true;
  for (const st of STATIONS) {
    const sx = x(st.cm);
    s += S.arrow(sx, 30, sx, 66, { c: 'currentColor', w: 1.5, size: 6 }) + lab(sx, 24, st.id, { a: 'middle', w: 'bold' });
    const band = BANDS.find((b) => b.type === forestFor(st.cm));
    if (!(sx >= x(band.min) && sx <= x(band.max))) ok = false;
  }
  s += lab(220, 198, 'Approximate limits; illustrative stations P, Q, R, S', { a: 'middle', size: 10, c: MUT });
  check(ok, `rainfall bands: each illustrative station marker (${STATIONS.map((st) => `${st.id} ${st.cm} cm`).join(', ')}) falls inside the band of the forest type assigned to it`);
  return svgDoc(440, 205, `Rainfall scale from 0 to 400 centimetres divided into bands: thorn forest below 70, dry deciduous 70 to 100, moist deciduous 100 to 200, tropical evergreen above 200. Illustrative stations: ${STATIONS.map((st) => `${st.id} ${st.cm} centimetres`).join(', ')}.`, s);
})();

// ---------------------------------------------------------------- layers of a tropical evergreen forest (schematic)
export const STOREYS = [
  { name: 'Emergents', m: 55 },
  { name: 'Main canopy', m: 35 },
  { name: 'Understorey', m: 18 },
  { name: 'Shrubs, canes, ferns', m: 5 },
];
export const LAYERS = (() => {
  const G = 200;
  const K = 3; // px per metre
  let s = S.line(20, G, 420, G, { c: BROWN, w: 2 });
  let ok = true;
  const xs = [[60, 300], [110, 180, 250, 350], [80, 150, 220, 290, 380], [40, 100, 170, 240, 320, 400]];
  STOREYS.forEach((st, i) => {
    const top = G - st.m * K;
    const r = [16, 22, 14, 7][i];
    for (const cx of xs[i]) {
      s += S.line(cx, G, cx, top + r, { c: BROWN, w: i < 2 ? 3 : 2 });
      s += S.circle(cx, top + r, r, { fill: GREEN, fop: 0.35 + i * 0.1, c: GREEN, sw: 1 });
    }
    s += S.line(20, top, 30, top, { w: 1 }) + lab(34, top + 4, `${st.name}`, { size: 10 });
    if (i > 0 && !(st.m < STOREYS[i - 1].m)) ok = false;
  });
  s += lab(220, 222, 'Schematic, not to scale: heights are rough', { a: 'middle', size: 10, c: MUT });
  check(ok, 'evergreen layers: each storey is drawn lower than the one above it (emergents, canopy, understorey, shrubs)');
  return svgDoc(440, 230, 'Schematic side view of a tropical evergreen forest showing several storeys: a few very tall emergent trees, a dense main canopy, a lower understorey of smaller trees, and shrubs, canes and ferns near the ground.', s);
})();

// ---------------------------------------------------------------- altitudinal zones in the Himalayas (approximate) with illustrative temperatures
export const LAPSE = 6.5; // degrees C per 1000 m
export const BASE = { alt: 0, temp: 30 }; // illustrative mean summer temperature at the foot of the range
export const tempAt = (m) => Math.round((BASE.temp - (LAPSE * (m - BASE.alt)) / 1000) * 10) / 10;
export const ZONES = [
  { name: 'Tropical moist deciduous (sal)', from: 0, to: 1000 },
  { name: 'Wet temperate: oak, chestnut', from: 1000, to: 2000 },
  { name: 'Temperate coniferous: pine, deodar, spruce, fir', from: 2000, to: 3000 },
  { name: 'Alpine: silver fir, juniper, birch, rhododendron', from: 3000, to: 3600 },
  { name: 'Alpine meadows; mosses and lichens higher up', from: 3600, to: 4800 },
];
export const MOUNTAIN = (() => {
  const Y0 = 230;
  const K = 0.042; // px per metre
  const y = (m) => Y0 - m * K;
  const TOP = 4800;
  const hx = (m, side) => 140 + side * 100 * (1 - m / TOP); // half-width of the cone at altitude m
  let s = '';
  const fills = [GREEN, GREEN, GREEN, BLUE, MUT];
  const fops = [0.55, 0.4, 0.3, 0.2, 0.2];
  let ok = true;
  ZONES.forEach((z, i) => {
    s += S.path(`M${hx(z.from, -1)} ${y(z.from)} L${hx(z.to, -1)} ${y(z.to)} L${hx(z.to, 1)} ${y(z.to)} L${hx(z.from, 1)} ${y(z.from)} Z`, { fill: fills[i], fop: fops[i], c: 'none', w: 0 });
    s += lab(250, (y(z.from) + y(z.to)) / 2 + 4, z.name, { size: 10 });
    s += S.line(36, y(z.from), 40, y(z.from), { w: 1 }) + lab(32, y(z.from) + 4, `${z.from} m`, { a: 'end', size: 10 });
    if (i > 0 && z.from !== ZONES[i - 1].to) ok = false;
    if (i > 0 && !(tempAt(z.from) < tempAt(ZONES[i - 1].from))) ok = false;
  });
  s += S.path(`M40 ${Y0} L140 ${y(TOP)} L240 ${Y0}`, { c: 'currentColor', w: 2 });
  s += lab(260, 14, 'Schematic, not to scale; altitudes are approximate', { a: 'middle', size: 10, c: MUT });
  check(ok, `mountain zones: the ${ZONES.length} zones join without gaps and the illustrative temperature falls at every zone boundary (${ZONES.map((z) => `${z.from} m ${tempAt(z.from)} °C`).join(', ')})`);
  return svgDoc(520, 240, 'Schematic mountain with vegetation zones by approximate altitude: tropical moist deciduous forest with sal up to about 1000 metres; wet temperate forest of oak and chestnut from about 1000 to 2000 metres; temperate coniferous forest of pine, deodar, spruce and fir from about 2000 to 3000 metres; alpine forest of silver fir, juniper, birch and rhododendron to about 3600 metres; then alpine meadows, with mosses and lichens higher up.', s);
})();

// ---------------------------------------------------------------- mangrove roots and tides (schematic)
export const TIDE = { high: 70, low: 140 };
export const MANGROVE = (() => {
  let s = '';
  const mud = 175;
  s += S.rect(10, TIDE.high, 420, mud - TIDE.high, { fill: BLUE, fop: 0.15, c: 'none', sw: 0 });
  s += S.line(10, TIDE.high, 430, TIDE.high, { c: BLUE, w: 1.5, dash: '6 4' }) + lab(425, TIDE.high - 6, 'high tide', { a: 'end', size: 10, c: BLUE });
  s += S.line(10, TIDE.low, 430, TIDE.low, { c: BLUE, w: 1.5, dash: '2 3' }) + lab(425, TIDE.low - 6, 'low tide', { a: 'end', size: 10, c: BLUE });
  s += S.rect(10, mud, 420, 30, { fill: BROWN, fop: 0.45, c: 'none', sw: 0 }) + lab(220, 198, 'salty mud of a delta', { a: 'middle', size: 10 });
  // tree with stilt roots
  const tx = 120;
  s += S.line(tx, 35, tx, 120, { c: BROWN, w: 4 }) + S.circle(tx, 35, 30, { fill: GREEN, fop: 0.5, c: GREEN, sw: 1 });
  for (const dx of [-45, -25, 25, 45]) s += S.path(`M${tx} 110 Q${tx + dx * 0.4} 130 ${tx + dx} ${mud}`, { c: BROWN, w: 2 });
  s += lab(tx, 222, 'stilt (prop) roots', { a: 'middle', size: 10 });
  // breathing roots (pneumatophores) rising above low-tide level
  const px = [250, 270, 290, 310, 330, 350];
  const tipY = 125;
  px.forEach((x) => (s += S.line(x, mud, x, tipY, { c: BROWN, w: 2 })));
  s += lab(300, 222, 'breathing roots', { a: 'middle', size: 10 });
  s += lab(220, 14, 'Schematic, not to scale', { a: 'middle', size: 10, c: MUT });
  const ok = tipY < TIDE.low && TIDE.high < TIDE.low;
  check(ok, 'mangrove: the breathing roots rise above the low-tide line, so they are exposed to air at low tide, and the high-tide line lies above the low-tide line');
  return svgDoc(440, 230, 'Schematic of a mangrove shore in a delta. A tree stands in salty mud on arching stilt roots; nearby, breathing roots grow upward out of the mud and stand above the water at low tide; dashed lines mark high tide and low tide.', s);
})();

// ---------------------------------------------------------------- ILLUSTRATIVE forest area of an imagined state (square km)
export const FOREST_AREA = [
  { type: 'Moist deciduous', km2: 6000 },
  { type: 'Dry deciduous', km2: 3600 },
  { type: 'Tropical evergreen', km2: 1800 },
  { type: 'Mangrove (littoral)', km2: 600 },
];
export const forestTotal = FOREST_AREA.reduce((a, r) => a + r.km2, 0);
export const share = (type) => Math.round((FOREST_AREA.find((r) => r.type === type).km2 / forestTotal) * 1000) / 10;
export const SHARE_BAR = (() => {
  const X0 = 30;
  const W = 380;
  let x = X0;
  let s = '';
  const fills = [GREEN, BROWN, BLUE, YEL];
  let sum = 0;
  FOREST_AREA.forEach((r, i) => {
    const w = (r.km2 / forestTotal) * W;
    s += S.rect(x, 60, w, 50, { fill: fills[i], fop: 0.5, c: 'currentColor', sw: 1 });
    s += lab(x + w / 2, 90, `${share(r.type)}%`, { a: 'middle', size: 11, w: 'bold' });
    s += S.rect(X0 + (i % 2) * 200, 130 + Math.floor(i / 2) * 22, 12, 12, { fill: fills[i], fop: 0.5, c: 'currentColor', sw: 1 }) + lab(X0 + 18 + (i % 2) * 200, 141 + Math.floor(i / 2) * 22, `${r.type}: ${r.km2} sq km`, { size: 10 });
    x += w;
    sum += share(r.type);
  });
  s += lab(220, 40, `Forest of an imagined state: ${forestTotal} sq km (illustrative)`, { a: 'middle', size: 11, w: 'bold' });
  const ok = Math.abs(x - (X0 + W)) < 1e-6 && Math.abs(sum - 100) < 0.05;
  check(ok, `forest shares: the four segments fill the whole bar and the shares (${FOREST_AREA.map((r) => share(r.type)).join(' + ')}) add up to 100%`);
  return svgDoc(440, 185, `Bar divided into shares of the forest area of an imagined state, illustrative: ${FOREST_AREA.map((r) => `${r.type} ${r.km2} square kilometres, ${share(r.type)} per cent`).join('; ')}.`, s);
})();
