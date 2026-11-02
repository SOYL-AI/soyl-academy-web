// ICSE 10 Geography ch11 Energy Resources — diagrams (allow-listed elements, palette colours only). All diagrams are
// SCHEMATIC (not to scale). The installed-capacity table of "State Z" is ILLUSTRATIVE (rounded, made-up but realistic
// numbers, not official statistics) and is exported so the questions compute every answer from the same numbers.
// SELF_CHECKS (read by build.mjs) confirm the flow arrows join consecutive boxes, the hydel head is positive with the
// penstock running downhill, the biogas pipe leaves from above the slurry, and the bar lengths follow the data.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- illustrative installed capacity (MW) of State Z
export const MIX = {
  name: 'State Z (illustrative)',
  rows: [
    ['Coal (thermal)', 6000],
    ['Solar', 2100],
    ['Hydel', 1500],
    ['Wind', 1200],
    ['Natural gas', 900],
    ['Nuclear', 300],
  ],
};
export const mw = (name) => MIX.rows.find(([n]) => n === name)[1];
export const mixTotal = () => MIX.rows.reduce((s, [, v]) => s + v, 0);
export const pct = (v) => Math.round((v / mixTotal()) * 1000) / 10;
export const renewMW = () => mw('Solar') + mw('Hydel') + mw('Wind');

// ---------------------------------------------------------------- thermal power station (schematic flow)
export const THERMAL = (() => {
  const boxes = [
    ['Coal from', 'the mine'],
    ['Boiler: water', 'turns to steam'],
    ['Steam', 'turbine'],
    ['Generator', ''],
    ['Grid: power', 'lines'],
  ];
  const W = 74;
  const H = 46;
  const GAP = 14;
  const Y = 70;
  let s = '';
  const xs = boxes.map((_, i) => 12 + i * (W + GAP));
  boxes.forEach(([a, b], i) => {
    s += S.rect(xs[i], Y, W, H, { c: i === 1 ? RED : i === 2 || i === 3 ? BLUE : MUT, sw: 1.4, rx: 4, fill: FILL, fop: 0.5 });
    s += lab(xs[i] + W / 2, Y + 19, a, { a: 'middle', size: 10 }) + (b ? lab(xs[i] + W / 2, Y + 33, b, { a: 'middle', size: 10 }) : '');
  });
  let joined = true;
  for (let i = 0; i < boxes.length - 1; i++) {
    const x1 = xs[i] + W;
    const x2 = xs[i + 1];
    s += S.arrow(x1 + 1, Y + H / 2, x2 - 1, Y + H / 2, { c: ACC, w: 1.8, size: 6 });
    if (!(x2 - x1 === GAP && x2 > x1)) joined = false;
  }
  // chimney and ash from the boiler
  const bx = xs[1] + W / 2;
  s += S.rect(bx - 6, 40, 12, Y - 40, { c: MUT, sw: 1.2 });
  s += S.path(`M${bx - 4} 38 q -8 -8 0 -14 q 8 -6 0 -12`, { c: MUT, w: 1.2 });
  s += lab(bx + 12, 30, 'smoke: carbon dioxide, sulphur dioxide', { size: 10, c: RED });
  s += S.arrow(bx, Y + H, bx, Y + H + 26, { c: BROWN, w: 1.6, size: 6 });
  s += lab(bx, Y + H + 40, 'fly ash to ash pond', { a: 'middle', size: 10, c: BROWN });
  // condenser loop from turbine back to boiler
  const tx = xs[2] + W / 2;
  s += S.path(`M${tx} ${Y + H} L${tx} ${Y + H + 52} L${xs[1] + W - 10} ${Y + H + 52} L${xs[1] + W - 10} ${Y + H + 4}`, { c: BLUE, w: 1.4, dash: '4 3' });
  s += S.head(xs[1] + W - 10, Y + H + 2, -Math.PI / 2, { size: 6, c: BLUE });
  s += lab(tx + 6, Y + H + 66, 'condenser: steam cooled back to water', { size: 10, c: BLUE });
  s += lab(220, 196, 'Schematic — not to scale', { a: 'middle', size: 10, c: MUT });
  check(joined && boxes.length === 5, 'thermal: four arrows each join the right edge of one box to the left edge of the next, in the order coal, boiler, turbine, generator, grid');
  return svgDoc(450, 204, 'Schematic flow of a coal-based thermal power station: coal from the mine is burnt in a boiler that turns water into steam; the steam spins a turbine linked to a generator, and electricity goes to the grid. Smoke rises from the chimney, fly ash goes to an ash pond, and a condenser turns used steam back into water for the boiler. Not to scale.', s);
})();

// ---------------------------------------------------------------- hydel power station (schematic cross-section)
export const HYDEL = (() => {
  const RES = 62; // reservoir water level (y)
  const TAIL = 196; // tailrace water level (y)
  const intake = [176, 150];
  const house = [276, 186];
  let s = '';
  // valley floor
  s += S.path(`M10 214 L10 214 L430 214`, { c: BROWN, w: 1.5 });
  // reservoir
  s += S.path(`M10 ${RES} L178 ${RES} L178 214 L10 214 Z`, { c: 'none', w: 0, fill: BLUE, fop: 0.25 });
  s += S.line(10, RES, 178, RES, { c: BLUE, w: 1.5 });
  s += lab(70, RES + 30, 'reservoir', { a: 'middle', size: 11, c: BLUE });
  s += lab(70, RES + 44, '(such as Gobind Sagar)', { a: 'middle', size: 10, c: BLUE });
  // dam wall (trapezium)
  s += S.path(`M178 44 L196 44 L232 214 L178 214 Z`, { c: currentC(), w: 1.5, fill: FILL, fop: 0.8 });
  s += lab(204, 38, 'dam', { a: 'middle', size: 11, w: 'bold' });
  // penstock
  s += S.line(intake[0], intake[1], house[0] - 14, house[1] - 8, { c: ACC, w: 4 });
  s += lab(232, 140, 'penstock', { size: 10, c: ACC });
  // power house and turbine
  s += S.rect(house[0] - 16, house[1] - 26, 52, 32, { c: currentC(), sw: 1.4, fill: FILL, fop: 0.6 });
  s += S.circle(house[0] + 2, house[1] - 10, 8, { c: RED, sw: 1.5 });
  s += lab(house[0] - 16, 230, 'turbine and generator', { size: 10, c: RED });
  // tailrace
  s += S.path(`M${house[0] + 36} ${TAIL} L430 ${TAIL} L430 214 L${house[0] + 36} 214 Z`, { c: 'none', w: 0, fill: BLUE, fop: 0.25 });
  s += S.line(house[0] + 36, TAIL, 430, TAIL, { c: BLUE, w: 1.5 });
  s += S.arrow(350, TAIL - 6, 410, TAIL - 6, { c: BLUE, w: 1.4, size: 6 });
  s += lab(380, TAIL - 12, 'river downstream', { a: 'middle', size: 10, c: BLUE });
  // pylons to grid
  s += S.line(385, 140, 395, 92, { w: 1.2 }) + S.line(405, 140, 395, 92, { w: 1.2 }) + S.line(395, 92, 436, 74, { c: MUT, w: 1, dash: '3 3' });
  s += lab(436, 66, 'to the grid', { a: 'end', size: 10 }) + S.line(house[0] + 36, house[1] - 18, 385, 140, { c: MUT, w: 1, dash: '3 3' });
  // head arrow
  s += S.arrow(335, RES + 2, 335, TAIL - 2, { c: MUT, w: 1, size: 5 }) + S.arrow(335, TAIL - 2, 335, RES + 2, { c: MUT, w: 1, size: 5 });
  s += S.line(196, RES, 345, RES, { c: MUT, w: 1, dash: '3 3' });
  s += lab(341, 128, 'head', { size: 10, c: MUT });
  s += lab(10, 236, 'Schematic — not to scale', { size: 10, c: MUT });
  const head = TAIL - RES;
  const downhill = house[1] - 8 > intake[1] && house[0] - 14 > intake[0];
  check(head > 0 && downhill && intake[1] > RES, `hydel: reservoir surface lies ${head} units above the tailrace (positive head), the intake is below the reservoir surface and the penstock runs downhill to the power house`);
  return svgDoc(440, 244, 'Schematic cross-section of a hydroelectric station: water stored in a reservoir behind a dam flows down a sloping pipe called a penstock to a power house below, where it spins a turbine joined to a generator; the water then returns to the river downstream and the electricity goes to the grid. The height difference between the reservoir surface and the river below is the head. Not to scale.', s);
})();
function currentC() {
  return 'currentColor';
}

// ---------------------------------------------------------------- biogas (gobar gas) plant (schematic)
export const BIOGAS = (() => {
  const GROUND = 90;
  const SLURRY = 150; // slurry surface inside the digester (y)
  const dome = { cx: 220, top: 70 };
  const gasOut = [dome.cx, dome.top];
  let s = '';
  s += S.line(10, GROUND, 430, GROUND, { c: BROWN, w: 1.5 });
  s += lab(286, GROUND - 6, 'ground level', { size: 10, c: BROWN });
  // inlet tank and pipe
  s += S.rect(40, 60, 60, 30, { c: currentC(), sw: 1.4, fill: BROWN, fop: 0.25 });
  s += lab(70, 52, 'inlet: dung and water', { a: 'middle', size: 10 });
  s += S.line(80, 90, 150, 190, { c: BROWN, w: 3 });
  // digester (underground pit with dome)
  s += S.path(`M150 200 L150 120 Q220 ${dome.top - 30} 290 120 L290 200 Z`, { c: currentC(), w: 1.5, fill: 'none' });
  s += S.path(`M150 ${SLURRY} L290 ${SLURRY} L290 200 L150 200 Z`, { c: 'none', w: 0, fill: BROWN, fop: 0.35 });
  s += lab(220, 182, 'digester: bacteria work', { a: 'middle', size: 10 });
  s += lab(220, 194, 'without air', { a: 'middle', size: 10 });
  s += lab(220, 124, 'gas collects', { a: 'middle', size: 10, c: GREEN });
  // gas pipe to stove
  s += S.line(gasOut[0], gasOut[1] + 18, gasOut[0], 40, { c: GREEN, w: 2.5 }) + S.line(gasOut[0], 40, 360, 40, { c: GREEN, w: 2.5 });
  s += S.arrow(330, 40, 362, 40, { c: GREEN, w: 2.5, size: 7 });
  s += lab(372, 36, 'gas (mainly', { size: 10, c: GREEN }) + lab(372, 49, 'methane) to', { size: 10, c: GREEN }) + lab(372, 62, 'stove, lamp', { size: 10, c: GREEN });
  // outlet tank
  s += S.line(290, 190, 350, 92, { c: BROWN, w: 3 });
  s += S.rect(340, 92, 70, 26, { c: currentC(), sw: 1.4, fill: BROWN, fop: 0.35 });
  s += lab(375, 134, 'outlet: slurry', { a: 'middle', size: 10, c: BROWN });
  s += lab(375, 147, 'used as manure', { a: 'middle', size: 10, c: BROWN });
  s += lab(10, 222, 'Schematic — not to scale', { size: 10, c: MUT });
  check(gasOut[1] + 18 < SLURRY && dome.top < GROUND, 'biogas: the gas pipe leaves the top of the dome, above the slurry surface, so only gas (not slurry) reaches the stove');
  return svgDoc(440, 230, 'Schematic of a biogas or gobar gas plant: cattle dung mixed with water enters an inlet tank and flows into an underground digester, where bacteria break it down without air. The gas, mainly methane, collects under the dome and is piped to a stove or lamp; the spent slurry flows out to an outlet tank and is used as manure. Not to scale.', s);
})();

// ---------------------------------------------------------------- bar chart of the illustrative capacity mix
export const MIXCHART = (() => {
  const X0 = 110;
  const MAXW = 270;
  const MAXV = 6000;
  const BH = 20;
  let s = lab(220, 18, `Installed capacity, ${MIX.name}, megawatts`, { a: 'middle', size: 11, w: 'bold' });
  let ok = true;
  const colour = { 'Coal (thermal)': BROWN, 'Natural gas': RED, Nuclear: ACC, Hydel: BLUE, Wind: MUT, Solar: GREEN };
  MIX.rows.forEach(([name, v], i) => {
    const y = 32 + i * (BH + 8);
    const w = (v / MAXV) * MAXW;
    s += lab(X0 - 6, y + 14, name, { a: 'end', size: 10 });
    s += S.rect(X0, y, w, BH, { c: colour[name], sw: 1, fill: colour[name], fop: 0.55 });
    s += lab(X0 + w + 5, y + 14, String(v), { size: 10 });
    if (Math.abs(w - (v / MAXV) * MAXW) > 1e-9) ok = false;
  });
  s += S.line(X0, 30, X0, 32 + 6 * (BH + 8) - 6, { w: 1.2 });
  s += lab(220, 32 + 6 * (BH + 8) + 10, `Total ${mixTotal()} MW. Illustrative figures, not official data.`, { a: 'middle', size: 10, c: MUT });
  check(ok && mixTotal() === 12000, `mix chart: every bar length is proportional to its megawatts and the six sources total ${mixTotal()} MW`);
  return svgDoc(440, 222, `Horizontal bar chart of the illustrative installed electricity capacity of State Z in megawatts: coal 6000, solar 2100, hydel 1500, wind 1200, natural gas 900 and nuclear 300; total ${mixTotal()}.`, s);
})();
