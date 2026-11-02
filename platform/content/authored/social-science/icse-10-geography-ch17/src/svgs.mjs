// ICSE 10 Geography ch17 Transport — diagrams (allow-listed elements, palette colours only). The corridor diagram is a
// SCHEMATIC NETWORK (not a map, not to scale); the port sketch is schematic. Freight cost, speed and network figures are
// ILLUSTRATIVE (rounded, made-up but realistic, not official statistics) and are exported so the questions compute every
// answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm the quadrilateral closes, the two corridors cross at
// Jhansi, the gauge widths are drawn to proportion, the dredged channel is deeper than the ship's draught and bars follow data.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- illustrative freight cost and speed by mode
export const MODES = [
  // [mode, cost in rupees per tonne-km, average freight speed in km per hour]
  ['Road', 2.5, 40],
  ['Rail', 1.5, 25],
  ['Inland waterway', 1.0, 10],
  ['Air', 15, 500],
];
export const cost = (m) => MODES.find(([n]) => n === m)[1];
export const speed = (m) => MODES.find(([n]) => n === m)[2];
export const freight = (m, tonnes, km) => Math.round(cost(m) * tonnes * km);
export const hours = (m, km) => Math.round((km / speed(m)) * 10) / 10;
// illustrative rail network of two states
export const NET = { P: { name: 'State P (plain, illustrative)', area: 50000, rail: 2500 }, Q: { name: 'State Q (hilly, illustrative)', area: 80000, rail: 400 } };
export const density = (k) => Math.round((NET[k].rail / NET[k].area) * 1000 * 10) / 10; // km of track per 1000 sq km

export const COSTCHART = (() => {
  const X0 = 120;
  const SC = 16; // px per rupee
  let s = lab(220, 18, 'Freight cost, rupees per tonne-km (illustrative)', { a: 'middle', size: 11, w: 'bold' });
  let ok = true;
  const col = [BROWN, BLUE, GREEN, RED];
  MODES.forEach(([m, c], i) => {
    const y = 34 + i * 34;
    const w = c * SC;
    s += lab(X0 - 6, y + 15, m, { a: 'end', size: 10 });
    s += S.rect(X0, y, w, 22, { c: col[i], sw: 1, fill: col[i], fop: 0.5 });
    s += lab(X0 + w + 6, y + 15, `₹${c.toFixed(1)}`, { size: 10 });
    if (Math.abs(w - c * SC) > 1e-9) ok = false;
  });
  s += S.line(X0, 30, X0, 34 + 4 * 34 - 8, { w: 1.2 });
  s += lab(220, 190, 'Illustrative figures; real costs vary with distance, load and route.', { a: 'middle', size: 10, c: MUT });
  check(ok && cost('Inland waterway') < cost('Rail') && cost('Rail') < cost('Road') && cost('Road') < cost('Air'), 'cost chart: bar lengths are proportional to cost per tonne-km, ordered waterway < rail < road < air');
  return svgDoc(440, 198, 'Horizontal bar chart of illustrative freight costs in rupees per tonne-kilometre: inland waterway 1.0, rail 1.5, road 2.5 and air 15.', s);
})();

// ---------------------------------------------------------------- corridors: schematic network (not a map)
export const CORRIDOR = (() => {
  const P = {
    Delhi: [220, 70], Mumbai: [110, 160], Chennai: [250, 230], Kolkata: [340, 130],
    Srinagar: [205, 18], Kanyakumari: [235, 290], Porbandar: [40, 135], Silchar: [415, 118], Jhansi: [220, 128],
  };
  let s = '';
  const gq = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata'];
  const pts = gq.map((c) => P[c]);
  s += S.path('M' + pts.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z', { c: YEL, w: 5, join: 'round' });
  s += S.line(...P.Srinagar, ...P.Jhansi, { c: BLUE, w: 2.5, dash: '7 4' }) + S.line(...P.Jhansi, ...P.Kanyakumari, { c: BLUE, w: 2.5, dash: '7 4' });
  s += S.line(...P.Porbandar, ...P.Jhansi, { c: RED, w: 2.5, dash: '7 4' }) + S.line(...P.Jhansi, ...P.Silchar, { c: RED, w: 2.5, dash: '7 4' });
  Object.entries(P).forEach(([c, [x, y]]) => {
    const big = gq.includes(c);
    s += S.circle(x, y, big ? 6 : 4, { c: 'currentColor', sw: 1.2, fill: big ? YEL : FILLC(), fop: 1 });
    const pos = { Porbandar: [0, -10, 'middle'], Silchar: [0, -10, 'middle'], Jhansi: [8, 16, 'start'], Srinagar: [-9, 4, 'end'], Kanyakumari: [9, 4, 'start'] }[c];
    const right = x > 230;
    const [dx, dy, an] = pos ?? [right ? 9 : -9, 4, right ? 'start' : 'end'];
    s += lab(x + dx, y + dy, c, { a: an, size: 10, w: big ? 'bold' : undefined });
  });
  // legend
  s += S.line(20, 300, 44, 300, { c: YEL, w: 5 }) + lab(48, 304, 'Golden Quadrilateral', { size: 10 });
  s += S.line(170, 300, 194, 300, { c: BLUE, w: 2.5, dash: '7 4' }) + lab(198, 304, 'North–South', { size: 10 });
  s += S.line(280, 300, 304, 300, { c: RED, w: 2.5, dash: '7 4' }) + lab(308, 304, 'East–West', { size: 10 });
  s += lab(220, 322, 'Schematic network diagram — not a map, not to scale', { a: 'middle', size: 10, c: MUT });
  // self-check: closed loop of four edges; NS and EW segments both pass through Jhansi
  const closed = pts.length === 4;
  const onNS = Math.abs(cross(P.Srinagar, P.Kanyakumari, P.Jhansi)) / dist(P.Srinagar, P.Kanyakumari) < 8;
  const onEW = Math.abs(cross(P.Porbandar, P.Silchar, P.Jhansi)) / dist(P.Porbandar, P.Silchar) < 8;
  check(closed && onNS && onEW, 'corridor: the Golden Quadrilateral is a closed loop of four cities, and Jhansi lies (within 8 units) on both the Srinagar–Kanyakumari and the Porbandar–Silchar lines');
  return svgDoc(440, 330, 'Schematic network diagram, not a map: the Golden Quadrilateral joins Delhi, Mumbai, Chennai and Kolkata in a loop; the North–South corridor runs from Srinagar to Kanyakumari and the East–West corridor from Porbandar to Silchar, the two crossing at Jhansi.', s);
})();
function FILLC() {
  return 'var(--diagram-fill)';
}
function cross([x1, y1], [x2, y2], [x, y]) {
  return (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
}
function dist([x1, y1], [x2, y2]) {
  return Math.hypot(x2 - x1, y2 - y1);
}

// ---------------------------------------------------------------- railway gauges drawn to proportion (metres)
export const GAUGES = [['Broad gauge', 1.676], ['Metre gauge', 1.0], ['Narrow gauge', 0.762]];
export const GAUGECHART = (() => {
  const SC = 130; // px per metre
  let s = lab(220, 18, 'Railway gauges: distance between the rails', { a: 'middle', size: 11, w: 'bold' });
  let ok = true;
  GAUGES.forEach(([g, m], i) => {
    const y = 48 + i * 52;
    const x0 = 150;
    const w = m * SC;
    s += lab(x0 - 24, y + 14, g, { a: 'end', size: 10 });
    for (let k = 0; k < 6; k++) s += S.rect(x0 - 12 + k * ((w + 14) / 5), y - 4, 10, 30, { c: BROWN, sw: 1, fill: BROWN, fop: 0.4 });
    s += S.line(x0, y + 2, x0, y + 20, { c: MUT, w: 0.5 });
    s += S.rect(x0 - 3, y, 6, 22, { c: 'currentColor', sw: 1, fill: 'currentColor', fop: 0.7 }) + S.rect(x0 + w - 3, y, 6, 22, { c: 'currentColor', sw: 1, fill: 'currentColor', fop: 0.7 });
    s += S.arrow(x0 + 4, y + 36, x0 + w - 4, y + 36, { c: ACC, w: 1, size: 5 }) + S.arrow(x0 + w - 4, y + 36, x0 + 4, y + 36, { c: ACC, w: 1, size: 5 });
    s += lab(x0 + w + 22, y + 15, `${m} m`, { size: 10, c: ACC });
    if (Math.abs(w / SC - m) > 1e-9) ok = false;
  });
  s += lab(220, 206, 'Track widths drawn to the same scale', { a: 'middle', size: 10, c: MUT });
  check(ok && GAUGES[0][1] > GAUGES[1][1] && GAUGES[1][1] > GAUGES[2][1], 'gauges: the gap between the rails is drawn to one scale for broad (1.676 m), metre (1 m) and narrow (0.762 m) gauge');
  return svgDoc(440, 214, 'Three railway tracks drawn to the same scale: broad gauge with rails 1.676 metres apart, metre gauge 1 metre apart and narrow gauge 0.762 metres apart.', s);
})();

// ---------------------------------------------------------------- a seaport (schematic cross-section and plan)
export const PORT = (() => {
  const SEA = 70; // water surface (y)
  const BED = 150; // natural sea bed
  const CHANNEL = 180; // dredged channel floor
  const KEEL = 160; // bottom of the loaded ship
  let s = lab(10, 18, 'A seaport (schematic)', { size: 12, w: 'bold' });
  // water and channel
  s += S.path(`M10 ${SEA} L300 ${SEA} L300 ${BED} L230 ${BED} L210 ${CHANNEL} L110 ${CHANNEL} L90 ${BED} L10 ${BED} Z`, { c: 'none', w: 0, fill: BLUE, fop: 0.22 });
  s += S.line(10, SEA, 300, SEA, { c: BLUE, w: 1.5 });
  s += S.path(`M10 ${BED} L90 ${BED} L110 ${CHANNEL} L210 ${CHANNEL} L230 ${BED} L300 ${BED}`, { c: BROWN, w: 1.5 });
  s += lab(160, CHANNEL + 14, 'dredged channel', { a: 'middle', size: 10, c: BROWN });
  // ship
  s += S.path(`M120 ${SEA - 12} L200 ${SEA - 12} L190 ${KEEL} L130 ${KEEL} Z`, { c: 'currentColor', w: 1.4, fill: MUT, fop: 0.35 });
  s += S.rect(140, SEA - 32, 30, 20, { c: 'currentColor', sw: 1.2 });
  s += lab(160, SEA + 34, 'loaded ship', { a: 'middle', size: 10 });
  // breakwater on the sea side
  s += S.rect(14, SEA - 18, 22, BED - SEA + 18, { c: 'currentColor', sw: 1.2, fill: MUT, fop: 0.5 });
  s += lab(25, SEA - 24, 'breakwater', { a: 'middle', size: 10 });
  // quay, cranes, warehouse, rail and road
  s += S.rect(300, SEA - 10, 130, BED - SEA + 10, { c: BROWN, sw: 1.4, fill: BROWN, fop: 0.2 });
  s += S.line(310, SEA - 10, 310, SEA - 58, { c: YEL, w: 3 }) + S.line(310, SEA - 58, 262, SEA - 50, { c: YEL, w: 3 }) + S.line(262, SEA - 50, 262, SEA - 30, { c: 'currentColor', w: 1 });
  s += lab(318, SEA - 48, 'crane', { size: 10 });
  s += S.rect(340, SEA - 40, 50, 30, { c: 'currentColor', sw: 1.2 }) + lab(365, SEA - 22, 'store', { a: 'middle', size: 10 });
  s += S.line(300, SEA + 20, 430, SEA + 20, { c: 'currentColor', w: 2 }) + S.line(300, SEA + 26, 430, SEA + 26, { c: 'currentColor', w: 2 });
  for (let k = 0; k < 9; k++) s += S.line(306 + k * 14, SEA + 17, 306 + k * 14, SEA + 29, { c: 'currentColor', w: 1 });
  s += lab(365, SEA + 44, 'rail to hinterland', { a: 'middle', size: 10 });
  s += S.line(300, SEA + 54, 430, SEA + 54, { c: MUT, w: 6 }) + lab(365, SEA + 72, 'road to hinterland', { a: 'middle', size: 10 });
  s += lab(10, 214, 'Schematic — not to scale', { size: 10, c: MUT });
  check(CHANNEL > KEEL && KEEL > BED && SEA < BED, 'port: the dredged channel floor lies below the keel of the loaded ship, which would scrape the natural sea bed without dredging');
  return svgDoc(440, 222, 'Schematic of a seaport: a breakwater shelters the harbour from waves; a channel dredged deeper than the natural sea bed lets a loaded ship reach the quay; cranes, a store and rail and road links connect the port with its hinterland. Not to scale.', s);
})();
