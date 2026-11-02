// ICSE 10 Geography ch18 Waste Management — diagrams (allow-listed elements, palette colours only). The landfill and compost
// sketches are SCHEMATIC (not to scale). The household waste breakdown and the food-chain concentrations are ILLUSTRATIVE
// (rounded, made-up but realistic, not official statistics) and are exported so the questions compute every answer from them.
// SELF_CHECKS (read by build.mjs) confirm shares add up, the liner lies under all waste and above the water table, the vent
// rises above the cap, compost layers fill the pit and alternate, and concentrations rise up the food chain.
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
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- illustrative daily waste of one household (kg)
export const HOUSE = [
  ['Kitchen and garden (wet)', 1.0],
  ['Paper and cardboard', 0.3],
  ['Plastic', 0.2],
  ['Glass and metal', 0.1],
  ['Dust and inert', 0.3],
  ['Domestic hazardous', 0.1],
];
export const kg = (name) => HOUSE.find(([n]) => n === name)[1];
export const houseTotal = () => r1(HOUSE.reduce((s, [, v]) => s + v, 0));
export const share = (v) => Math.round((v / houseTotal()) * 100);
export const recyclableKg = () => r1(kg('Paper and cardboard') + kg('Plastic') + kg('Glass and metal'));
export const WASTEBAR = (() => {
  const X0 = 150;
  const SC = 220; // px per kg
  let s = lab(220, 18, 'Daily waste of one household (illustrative), kg', { a: 'middle', size: 11, w: 'bold' });
  const col = [GREEN, BROWN, BLUE, MUT, YEL, RED];
  let ok = true;
  HOUSE.forEach(([n, v], i) => {
    const y = 32 + i * 28;
    const w = v * SC;
    s += lab(X0 - 6, y + 14, n, { a: 'end', size: 10 });
    s += S.rect(X0, y, w, 20, { c: col[i], sw: 1, fill: col[i], fop: 0.5 });
    s += lab(X0 + w + 6, y + 14, `${v.toFixed(1)} kg (${share(v)}%)`, { size: 10 });
    if (Math.abs(w - v * SC) > 1e-9) ok = false;
  });
  s += S.line(X0, 28, X0, 32 + 6 * 28 - 6, { w: 1.2 });
  s += lab(220, 214, `Total ${houseTotal().toFixed(1)} kg a day. Illustrative figures.`, { a: 'middle', size: 10, c: MUT });
  const sumShares = HOUSE.reduce((t, [, v]) => t + share(v), 0);
  check(ok && houseTotal() === 2 && sumShares === 100, 'waste bar: bar lengths follow the kilograms, the six kinds total 2.0 kg and their shares add to 100 per cent');
  return svgDoc(440, 222, 'Horizontal bar chart of the illustrative daily waste of one household: kitchen and garden waste 1.0 kilogram (50 per cent), paper and cardboard 0.3 (15), plastic 0.2 (10), glass and metal 0.1 (5), dust and inert 0.3 (15), domestic hazardous 0.1 (5); total 2.0 kilograms.', s);
})();

// ---------------------------------------------------------------- sanitary landfill (schematic cross-section)
export const LANDFILL = (() => {
  const GROUND = 70;
  const LINER_TOP = 182;
  const LINER_BOT = 196;
  const WATER = 214;
  const CAP = 50;
  let s = lab(10, 16, 'Sanitary landfill (schematic)', { size: 12, w: 'bold' });
  // ground surface and groundwater
  s += S.line(10, GROUND, 70, GROUND, { c: BROWN, w: 1.5 }) + S.line(370, GROUND, 430, GROUND, { c: BROWN, w: 1.5 });
  s += S.line(10, WATER, 430, WATER, { c: BLUE, w: 1.5, dash: '6 3' }) + lab(430, WATER + 13, 'groundwater table', { a: 'end', size: 10, c: BLUE });
  // pit with liner
  s += S.path(`M70 ${GROUND} L100 ${LINER_TOP} L340 ${LINER_TOP} L370 ${GROUND}`, { c: BROWN, w: 6 });
  s += S.path(`M64 ${GROUND} L95 ${LINER_BOT} L345 ${LINER_BOT} L376 ${GROUND}`, { c: 'currentColor', w: 1.5 });
  s += lab(220, LINER_BOT - 3, 'clay and plastic liner', { a: 'middle', size: 10 });
  // waste cells with daily soil cover
  const cells = [[96, 150, 248], [88, 118, 264], [80, 86, 280]];
  let lined = true;
  cells.forEach(([x, y, w]) => {
    s += S.rect(x + 6, y, w - 12, 26, { c: MUT, sw: 1, fill: MUT, fop: 0.35 });
    s += S.rect(x + 6, y - 6, w - 12, 6, { c: BROWN, sw: 0.5, fill: BROWN, fop: 0.5 });
    if (!(y + 26 <= LINER_TOP)) lined = false;
  });
  s += lab(220, 167, 'waste cells', { a: 'middle', size: 10 }) + lab(220, 104, 'daily soil cover between layers', { a: 'middle', size: 10 });
  // final cap with grass
  s += S.path(`M70 ${GROUND} Q220 ${CAP - 20} 370 ${GROUND}`, { c: GREEN, w: 4 });
  s += lab(200, CAP - 14, 'clay cap, soil and grass', { a: 'middle', size: 10, c: GREEN });
  // gas vent
  const VENT_TOP = 24;
  s += S.line(300, 160, 300, VENT_TOP, { c: ACC, w: 3 }) + S.line(294, VENT_TOP, 306, VENT_TOP, { c: ACC, w: 3 });
  s += lab(308, VENT_TOP + 10, 'gas vent (methane)', { size: 10, c: ACC });
  // leachate pipe
  s += S.line(110, LINER_TOP - 6, 330, LINER_TOP - 6, { c: RED, w: 2, dash: '4 2' });
  s += S.arrow(330, LINER_TOP - 6, 392, 142, { c: RED, w: 1.6, size: 6 }) + lab(436, 124, 'leachate to', { a: 'end', size: 10, c: RED }) + lab(436, 137, 'treatment', { a: 'end', size: 10, c: RED });
  check(lined && LINER_BOT < WATER && VENT_TOP < CAP, 'landfill: every waste cell lies above the liner, the liner lies above the groundwater table, and the gas vent rises above the cap');
  return svgDoc(440, 230, 'Schematic cross-section of a sanitary landfill: waste is placed in cells with daily soil cover inside a pit lined with clay and plastic; a pipe collects leachate for treatment; a vent releases methane; a clay cap with soil and grass covers the top; the groundwater table lies below the liner. Not to scale.', s);
})();

// ---------------------------------------------------------------- compost pit (schematic)
export const LAYERS = [
  ['dry leaves and twigs', 20, BROWN],
  ['kitchen waste', 30, GREEN],
  ['thin layer of soil or old compost', 12, MUT],
  ['kitchen waste', 30, GREEN],
  ['dry leaves', 20, BROWN],
  ['cover: sacking or soil', 8, MUT],
];
export const COMPOST = (() => {
  const TOP = 50;
  const DEPTH = 120;
  const X = 40;
  const W = 190;
  let s = lab(10, 18, 'Compost pit (schematic)', { size: 12, w: 'bold' });
  s += S.line(10, TOP, 430, TOP, { c: BROWN, w: 1.5 });
  s += S.rect(X, TOP, W, DEPTH, { c: BROWN, sw: 2 });
  let y = TOP + DEPTH;
  let alt = true;
  let prevGreen = null;
  LAYERS.forEach(([name, h, c], i) => {
    y -= h;
    s += S.rect(X + 2, y, W - 4, h, { c: 'none', sw: 0, fill: c, fop: 0.35 });
    s += lab(X + W + 12, y + h / 2 + 4, name, { size: 10 });
    s += S.lead(X + W - 6, y + h / 2, X + W + 10, y + h / 2);
    const green = c === GREEN;
    if (i < 5 && prevGreen !== null && green === prevGreen && name !== 'dry leaves') alt = false;
    prevGreen = green;
  });
  // earthworms in the kitchen layers
  [[80, TOP + 75], [150, TOP + 92], [110, TOP + 33]].forEach(([x, yy]) => (s += S.path(`M${x} ${yy} q 6 -6 12 0 q 6 6 12 0`, { c: RED, w: 2 })));
  s += lab(X, TOP + DEPTH + 18, 'earthworms (in vermicomposting) and microbes break the waste down', { size: 10, c: RED });
  s += lab(X, TOP + DEPTH + 32, 'keep moist, turn every week or two; ready in about six to eight weeks', { size: 10, c: MUT });
  s += lab(10, 228, 'Schematic — not to scale', { size: 10, c: MUT });
  const filled = LAYERS.reduce((t, [, h]) => t + h, 0) === DEPTH;
  check(filled && alt, 'compost: the six layers exactly fill the pit depth, with kitchen (green) layers separated by dry or soil layers');
  return svgDoc(440, 236, 'Schematic of a compost pit filled in layers from the bottom: dry leaves and twigs, kitchen waste, a thin layer of soil or old compost, more kitchen waste, dry leaves, and a cover of sacking or soil; earthworms and microbes break the waste down into compost in about six to eight weeks if it is kept moist and turned. Not to scale.', s);
})();

// ---------------------------------------------------------------- biomagnification along a food chain (illustrative ppm)
export const CHAIN = [
  ['Lake water', 0.002],
  ['Plankton', 0.04],
  ['Small fish', 0.5],
  ['Large fish', 2],
  ['Fish-eating bird', 10],
];
export const ppm = (n) => CHAIN.find(([c]) => c === n)[1];
export const BIOMAG = (() => {
  let s = lab(220, 18, 'A persistent pesticide along a food chain (illustrative, ppm)', { a: 'middle', size: 11, w: 'bold' });
  let rising = true;
  CHAIN.forEach(([n, v], i) => {
    const x = 14 + i * 86;
    const h = 22 + i * 14;
    const y = 160 - h;
    s += S.rect(x, y, 74, h, { c: i ? ACC : BLUE, sw: 1.2, fill: i ? ACC : BLUE, fop: 0.15 + i * 0.12, rx: 4 });
    s += lab(x + 37, 178, n, { a: 'middle', size: 10 });
    s += lab(x + 37, y - 6, `${v} ppm`, { a: 'middle', size: 10, w: 'bold' });
    for (let d = 0; d <= i; d++) s += S.circle(x + 14 + (d % 4) * 15, y + 12 + Math.floor(d / 4) * 12, 3.5, { c: RED, fill: RED, fop: 0.8, sw: 0.5 });
    if (i < CHAIN.length - 1) s += S.arrow(x + 76, 150, x + 86, 150, { c: 'currentColor', w: 1.2, size: 5 });
    if (i > 0 && !(v > CHAIN[i - 1][1])) rising = false;
  });
  s += lab(220, 202, 'Arrows show who is eaten by whom; red dots stand for the build-up of the poison.', { a: 'middle', size: 10, c: MUT });
  check(rising, 'biomagnification: the concentration rises at every step from water to plankton, small fish, large fish and the fish-eating bird');
  return svgDoc(440, 212, 'Food chain from lake water to plankton, small fish, large fish and a fish-eating bird, with illustrative concentrations of a persistent pesticide rising from 0.002 to 0.04, 0.5, 2 and 10 parts per million.', s);
})();
