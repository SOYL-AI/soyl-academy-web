// ICSE 10 Geography ch14 Cash Crops — diagrams (allow-listed elements, palette colours only). Sketches are SCHEMATIC (not to
// scale). The two-state sugarcane figures, the sugar recovery rate and the leaf-to-tea ratio are ILLUSTRATIVE (rounded, made-up
// but realistic, not official statistics) and are exported so the questions compute every answer from them. SELF_CHECKS (read
// by build.mjs) confirm stubble and ratoon shoots line up, jute bundles stay under water, tea bushes sit on the slope with
// drainage running downhill, and the bars follow the data.
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

// ---------------------------------------------------------------- sugarcane: plant crop, harvest, ratoon (schematic)
export const RATOON = (() => {
  const PW = 136;
  const GROUND = 170;
  const CANE = 100; // height of a mature cane
  const STUB = 10; // height of stubble left after cutting
  const xs0 = [0, 1, 2].map((i) => 6 + i * (PW + 8));
  const titles = [['1. Plant crop', 'grown from setts'], ['2. Harvest: cane cut', 'close to the ground'], ['3. Ratoon crop: stubble', 'sprouts again']];
  let s = '';
  const stems = [30, 58, 86, 114];
  xs0.forEach((x, i) => {
    s += S.rect(x, 36, PW, 150, { c: MUT, sw: 1, dash: '4 3' });
    s += lab(x + PW / 2, 14, titles[i][0], { a: 'middle', size: 10, w: 'bold' }) + lab(x + PW / 2, 28, titles[i][1], { a: 'middle', size: 10 });
    s += S.rect(x + 4, GROUND, PW - 8, 14, { c: BROWN, sw: 1, fill: BROWN, fop: 0.35 });
  });
  // panel 1: setts in the furrow and tall canes
  stems.forEach((dx) => {
    const x = xs0[0] + dx;
    s += S.rect(x - 8, GROUND + 3, 16, 5, { c: BROWN, sw: 1, fill: BROWN, fop: 0.8 });
    s += S.line(x, GROUND, x, GROUND - CANE, { c: GREEN, w: 3 });
    for (let k = 1; k <= 4; k++) s += S.line(x - 3, GROUND - k * 24, x + 3, GROUND - k * 24, { c: GREEN, w: 1 });
    s += S.path(`M${x} ${GROUND - CANE} q 10 -6 16 4 M${x} ${GROUND - CANE} q -10 -6 -16 4`, { c: GREEN, w: 1.4 });
  });
  s += lab(xs0[0] + 70, GROUND - CANE - 16, 'ten to eighteen months', { a: 'middle', size: 10 });
  // panel 2: stubble and cut canes lying on the ground
  stems.forEach((dx) => (s += S.line(xs0[1] + dx, GROUND, xs0[1] + dx, GROUND - STUB, { c: BROWN, w: 3 })));
  for (let k = 0; k < 3; k++) s += S.line(xs0[1] + 20, GROUND - 26 - k * 8, xs0[1] + 116, GROUND - 34 - k * 8, { c: GREEN, w: 3 });
  s += lab(xs0[1] + 68, GROUND - 64, 'cut cane to the mill', { a: 'middle', size: 10 });
  s += lab(xs0[1] + 68, GROUND - 16, 'stubble', { a: 'middle', size: 10, c: BROWN });
  // panel 3: new shoots rising from the same stubble
  const shoots = stems.map((dx) => xs0[2] + dx);
  shoots.forEach((x) => {
    s += S.line(x, GROUND, x, GROUND - STUB, { c: BROWN, w: 3 });
    s += S.line(x, GROUND - STUB, x - 6, GROUND - 56, { c: GREEN, w: 2 }) + S.line(x, GROUND - STUB, x + 5, GROUND - 60, { c: GREEN, w: 2 });
  });
  s += lab(xs0[2] + 68, GROUND - 80, 'no replanting needed', { a: 'middle', size: 10, c: GREEN });
  s += lab(6, 204, 'Schematic — not to scale', { size: 10, c: MUT });
  const aligned = shoots.every((x, i) => x - xs0[2] === stems[i]);
  check(aligned && STUB < 0.15 * CANE, 'ratoon: stubble is under fifteen per cent of cane height and every ratoon shoot rises from a stubble position of the harvested crop');
  return svgDoc(440, 212, 'Three-panel schematic of sugarcane. First, the plant crop grows from setts laid in a furrow into tall canes. Second, the canes are cut close to the ground and sent to the mill, leaving stubble. Third, the stubble sprouts again into a ratoon crop without replanting. Not to scale.', s);
})();

// ---------------------------------------------------------------- illustrative sugarcane figures for two states
export const CANE = {
  N: { name: 'State N (northern plain, illustrative)', area: 2000, prod: 160000 }, // thousand ha, thousand tonnes
  S: { name: 'State S (peninsular, illustrative)', area: 1000, prod: 100000 },
};
export const caneYield = (k) => CANE[k].prod / CANE[k].area;
export const caneGap = () => Math.round(((caneYield('S') - caneYield('N')) / caneYield('N')) * 1000) / 10;
export const RECOVERY = 10; // per cent sugar recovered from cane (illustrative)
export const CRUSH = 5000; // tonnes of cane crushed per day by an illustrative mill
export const sugarPerDay = () => (CRUSH * RECOVERY) / 100;
export const LEAF_RATIO = 4; // kg of green leaf for 1 kg of made tea (illustrative round figure)
export const CANECHART = (() => {
  const X0 = 70;
  const Y0 = 180;
  const H = 130;
  const MAX = 120;
  const yv = (v) => Y0 - (v / MAX) * H;
  let s = lab(220, 18, 'Sugarcane yield, tonnes per hectare (illustrative)', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(X0, Y0, 400, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let v = 0; v <= MAX; v += 20) s += lab(X0 - 6, yv(v) + 4, String(v), { a: 'end', size: 10 }) + (v ? S.line(X0, yv(v), 400, yv(v), { c: MUT, w: 0.5, dash: '2 3' }) : '');
  let ok = true;
  ['N', 'S'].forEach((k, i) => {
    const v = caneYield(k);
    const x = X0 + 50 + i * 150;
    const h = Y0 - yv(v);
    s += S.rect(x, yv(v), 70, h, { c: i ? GREEN : YEL, sw: 1, fill: i ? GREEN : YEL, fop: 0.55 });
    s += lab(x + 35, yv(v) - 6, String(v), { a: 'middle', size: 11, w: 'bold' });
    s += lab(x + 35, Y0 + 15, i ? 'State S (peninsular)' : 'State N (northern plain)', { a: 'middle', size: 10 });
    if (Math.abs(h - (v / MAX) * H) > 1e-9) ok = false;
  });
  s += lab(220, 214, 'Yield = production ÷ area. Illustrative figures, not official data.', { a: 'middle', size: 10, c: MUT });
  check(ok && caneYield('N') === 80 && caneYield('S') === 100 && caneGap() === 25, 'cane chart: bar heights follow production divided by area (80 and 100 tonnes per hectare); State S exceeds State N by 25 per cent');
  return svgDoc(440, 222, `Bar chart of illustrative sugarcane yields: State N on the northern plain ${caneYield('N')} tonnes per hectare; State S in peninsular India ${caneYield('S')} tonnes per hectare.`, s);
})();

// ---------------------------------------------------------------- jute retting (schematic)
export const RETTING = (() => {
  const WATER = 92;
  const BOTTOM = 172;
  let s = '';
  s += S.path(`M10 80 L60 ${WATER} L80 ${BOTTOM} L250 ${BOTTOM} L270 ${WATER} L300 80`, { c: BROWN, w: 1.5 });
  s += S.path(`M62 ${WATER} L268 ${WATER} L250 ${BOTTOM} L80 ${BOTTOM} Z`, { c: 'none', w: 0, fill: BLUE, fop: 0.25 });
  s += S.line(60, WATER, 270, WATER, { c: BLUE, w: 1.5 });
  s += lab(220, 22, 'Retting jute', { a: 'middle', size: 12, w: 'bold' }) + lab(165, WATER - 8, 'slow-moving or still water', { a: 'middle', size: 10, c: BLUE });
  const bundles = [[90, 112], [150, 118], [205, 110], [110, 140], [175, 144]];
  let under = true;
  bundles.forEach(([x, y]) => {
    s += S.rect(x, y, 48, 14, { c: GREEN, sw: 1.2, fill: GREEN, fop: 0.5, rx: 3 });
    s += S.line(x + 12, y, x + 12, y + 14, { c: BROWN, w: 1.5 }) + S.line(x + 36, y, x + 36, y + 14, { c: BROWN, w: 1.5 });
    if (!(y > WATER && y + 14 < BOTTOM)) under = false;
  });
  s += S.rect(150, 104, 14, 8, { c: MUT, sw: 1, fill: MUT, fop: 0.6 }) + lab(146, 108, 'weight', { a: 'end', size: 10, c: MUT });
  s += lab(165, 192, 'Bundles of jute stalks soak for about two to three weeks;', { a: 'middle', size: 10 });
  s += lab(165, 205, 'bacteria rot the soft tissue and loosen the fibre', { a: 'middle', size: 10 });
  // next steps
  s += S.arrow(305, 130, 330, 130, { c: ACC, w: 1.6, size: 6 });
  s += S.rect(334, 40, 100, 150, { c: MUT, sw: 1, dash: '4 3' });
  s += lab(384, 56, 'Fibre stripped,', { a: 'middle', size: 10, w: 'bold' }) + lab(384, 69, 'washed and', { a: 'middle', size: 10, w: 'bold' }) + lab(384, 82, 'dried', { a: 'middle', size: 10, w: 'bold' });
  s += S.line(344, 96, 424, 96, { c: BROWN, w: 2 });
  for (let k = 0; k < 7; k++) s += S.path(`M${350 + k * 11} 96 q 3 30 -1 56`, { c: YEL, w: 2 });
  s += lab(384, 172, 'golden fibre', { a: 'middle', size: 10, c: BROWN });
  s += lab(384, 185, 'baled for mills', { a: 'middle', size: 10, c: BROWN });
  s += lab(10, 222, 'Schematic — not to scale', { size: 10, c: MUT });
  check(under, 'retting: every jute bundle lies wholly below the water surface and above the pond floor');
  return svgDoc(440, 230, 'Schematic of retting jute: bundles of cut jute stalks are held under slow-moving or still water in a pond with weights for about two to three weeks while bacteria loosen the fibre; the fibre is then stripped, washed, hung to dry and baled for the mills. Not to scale.', s);
})();

// ---------------------------------------------------------------- tea garden on a hill slope (schematic)
export const TEAHILL = (() => {
  const A = [30, 210]; // foot of slope
  const B = [330, 60]; // top of slope
  const slopeY = (x) => A[1] + ((B[1] - A[1]) * (x - A[0])) / (B[0] - A[0]);
  let s = '';
  s += S.path(`M${A[0]} ${A[1]} L${B[0]} ${B[1]} L380 ${B[1]} L430 110 L430 220 L10 220 L10 ${A[1]} Z`, { c: BROWN, w: 1.5, fill: BROWN, fop: 0.12 });
  let onSlope = true;
  const bushes = [];
  for (let x = 70; x <= 300; x += 26) bushes.push(x);
  bushes.forEach((x) => {
    const y = slopeY(x) - 7;
    s += S.ellipse(x, y, 11, 7, { c: GREEN, sw: 1.2, fill: GREEN, fop: 0.6 });
    if (Math.abs(slopeY(x) - (y + 7)) > 1e-9) onSlope = false;
  });
  // shade trees
  [135, 239].forEach((x) => {
    const y = slopeY(x);
    s += S.line(x + 13, y - 6, x + 13, y - 50, { c: BROWN, w: 2.5 }) + S.circle(x + 13, y - 60, 14, { c: GREEN, sw: 1.2, fill: GREEN, fop: 0.3 });
  });
  s += lab(262, slopeY(252) - 72, 'shade trees', { size: 10, c: GREEN });
  // rain
  for (let k = 0; k < 8; k++) s += S.line(40 + k * 18, 24 + (k % 2) * 6, 34 + k * 18, 42 + (k % 2) * 6, { c: BLUE, w: 1.2 });
  s += lab(40, 16, 'heavy, well-spread rain', { size: 10, c: BLUE });
  // drainage arrows running downhill along the slope
  const drains = [[280, 230], [200, 150]];
  let downhill = true;
  drains.forEach(([x1, x2]) => {
    s += S.arrow(x1, slopeY(x1) + 12, x2, slopeY(x2) + 12, { c: BLUE, w: 1.4, size: 6 });
    if (!(slopeY(x2) > slopeY(x1))) downhill = false;
  });
  s += lab(214, slopeY(214) + 34, 'water drains away quickly', { size: 10, c: BLUE });
  s += lab(118, slopeY(118) + 26, 'tea bushes', { size: 10, c: GREEN });
  // factory at the foot
  s += S.rect(14, 172, 46, 28, { c: 'currentColor', sw: 1.3 }) + S.rect(46, 158, 6, 14, { c: 'currentColor', sw: 1.2 });
  s += lab(37, 214, 'factory', { a: 'middle', size: 10 });
  s += lab(300, 236, 'Schematic — not to scale', { size: 10, c: MUT });
  check(onSlope && downhill, 'tea hill: every tea bush sits on the slope line and both drainage arrows run downhill');
  return svgDoc(440, 244, 'Schematic of a tea garden on a hill slope: rows of tea bushes with shade trees grow on a well-drained slope that receives heavy, well-spread rain; water drains quickly downhill so it does not collect around the roots; a tea factory stands at the foot of the slope. Not to scale.', s);
})();
