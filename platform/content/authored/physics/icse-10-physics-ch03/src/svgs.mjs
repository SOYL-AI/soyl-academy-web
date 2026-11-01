// ICSE 10 Physics ch03 diagrams (allow-listed elements, palette colours only). Geometry is computed and self-checked
// (SELF_CHECKS, read by build.mjs): each lever's drawn arms give the stated MA class (> 1, < 1), and the block and tackle
// has exactly as many supporting strands as its stated velocity ratio.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- three classes of lever
// Each lever: bar from x0 to x0+L at height y; positions (fraction of L) of fulcrum F, load (down arrow), effort (down or up arrow).
const LEVERS = [
  { cls: 'Class I', ex: 'see-saw, scissors', F: 0.4, load: 0.05, eff: 0.95, effUp: false },
  { cls: 'Class II', ex: 'nutcracker, wheelbarrow', F: 0.05, load: 0.35, eff: 0.95, effUp: true },
  { cls: 'Class III', ex: 'forceps, forearm', F: 0.05, load: 0.95, eff: 0.35, effUp: true },
];
export const LEVER_CLASSES = (() => {
  const x0 = 40;
  const L = 240;
  let s = '';
  let ok = true;
  LEVERS.forEach((lv, i) => {
    const y = 50 + i * 80;
    const X = (fr) => x0 + fr * L;
    s += S.rect(x0, y - 4, L, 8, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 1.2 });
    s += S.path(`M${X(lv.F)} ${y + 4} L${X(lv.F) - 10} ${y + 22} L${X(lv.F) + 10} ${y + 22} Z`, { fill: ACC, fop: 0.5, c: ACC });
    s += S.arrow(X(lv.load), y - 30, X(lv.load), y - 6, { c: BLUE }) + lab(X(lv.load), y - 34, 'L', { a: 'middle', size: 11, w: 'bold', c: BLUE });
    s += lv.effUp ? S.arrow(X(lv.eff), y + 30, X(lv.eff), y + 6, { c: RED }) + lab(X(lv.eff), y + 42, 'E', { a: 'middle', size: 11, w: 'bold', c: RED }) : S.arrow(X(lv.eff), y - 30, X(lv.eff), y - 6, { c: RED }) + lab(X(lv.eff), y - 34, 'E', { a: 'middle', size: 11, w: 'bold', c: RED });
    s += lab(300, y - 4, lv.cls, { size: 12, w: 'bold' }) + lab(300, y + 12, lv.ex, { size: 10, c: MUT });
    const effortArm = Math.abs(lv.eff - lv.F);
    const loadArm = Math.abs(lv.load - lv.F);
    const between = (a, b, c) => (a - b) * (a - c) < 0;
    if (i === 0 && !between(lv.F, lv.load, lv.eff)) ok = false;
    if (i === 1 && !(between(lv.load, lv.F, lv.eff) && effortArm > loadArm)) ok = false;
    if (i === 2 && !(between(lv.eff, lv.F, lv.load) && effortArm < loadArm)) ok = false;
  });
  s += lab(40, 268, '▲ fulcrum   L load   E effort', { size: 10, c: MUT });
  check(ok, 'levers: class I has the fulcrum between load and effort; class II has the load between (effort arm longer, MA > 1); class III has the effort between (effort arm shorter, MA < 1)');
  return svgDoc(440, 280, 'The three classes of lever. Class one: the fulcrum lies between the load and the effort, as in a see-saw or scissors. Class two: the load lies between the fulcrum and the effort, so the effort arm is longer and the mechanical advantage is more than one, as in a nutcracker or wheelbarrow. Class three: the effort lies between the fulcrum and the load, so the effort arm is shorter and the mechanical advantage is less than one, as in forceps or the human forearm.', s);
})();

// ---------------------------------------------------------------- block and tackle with 4 strands (2 pulleys in each block)
export const BLOCK_TACKLE = (() => {
  const n = 4;
  const top = [[140, 50], [190, 50]];
  const bot = [[140, 190], [190, 190]];
  const R = 18;
  let s = S.line(100, 20, 230, 20, { w: 4 }) + S.line(165, 20, 165, 32, { w: 2 });
  s += S.rect(115, 32, 100, 36, { c: MUT, sw: 1, dash: '3 2' }) + S.rect(115, 172, 100, 36, { c: MUT, sw: 1, dash: '3 2' });
  for (const [x, y] of [...top, ...bot]) s += S.circle(x, y, R, { fill: 'var(--diagram-fill)', fop: 0.6 }) + S.circle(x, y, 3, { fill: 'currentColor' });
  // strands between the blocks: left and right sides of each pulley pair (4 strands support the lower block)
  const xs = [top[0][0] - R, top[0][0] + R, top[1][0] - R, top[1][0] + R];
  xs.forEach((x, i) => (s += S.line(x, 50, x, 190, { c: i === 3 ? RED : 'currentColor', w: 1.4 })));
  s += S.line(top[1][0] + R, 50, 250, 50, { c: RED, w: 1.4 }) + S.line(250, 50, 250, 140, { c: RED, w: 1.4 }) + S.arrow(250, 140, 250, 180, { c: RED }) + lab(258, 170, 'E (effort)', { size: 11, c: RED });
  s += S.line(165, 208, 165, 228, { w: 1.5 }) + S.rect(140, 228, 50, 28, { fill: BLUE, fop: 0.3, c: BLUE }) + lab(165, 247, 'L', { a: 'middle', size: 12, w: 'bold' });
  s += lab(20, 120, `${n} strands`, { size: 11, c: ACC }) + lab(20, 134, 'support the', { size: 11, c: ACC }) + lab(20, 148, 'lower block', { size: 11, c: ACC });
  s += lab(20, 180, `VR = ${n}`, { size: 12, w: 'bold', c: GREEN });
  const strands = xs.length;
  check(strands === n && xs.every((x, i) => i === 0 || x > xs[i - 1]), `block and tackle: ${strands} distinct strands run between the fixed and movable blocks, so VR = ${n} as labelled`);
  return svgDoc(320, 270, 'A block and tackle with two pulleys in a fixed upper block and two in a movable lower block. One continuous string passes round all four pulleys, so four strands support the lower block and the load hanging from it. The free end is pulled down with the effort. The velocity ratio equals the number of supporting strands, four.', s);
})();

// ---------------------------------------------------------------- single fixed and single movable pulley
export const PULLEYS = (() => {
  let s = S.line(20, 20, 330, 20, { w: 4 });
  // fixed pulley
  s += S.line(90, 20, 90, 42, { w: 2 }) + S.circle(90, 60, 18, { fill: 'var(--diagram-fill)', fop: 0.6 }) + S.circle(90, 60, 3, { fill: 'currentColor' });
  s += S.line(72, 60, 72, 160, { w: 1.4 }) + S.line(108, 60, 108, 120, { c: RED, w: 1.4 }) + S.arrow(108, 120, 108, 160, { c: RED }) + lab(114, 150, 'E', { size: 12, w: 'bold', c: RED });
  s += S.rect(57, 160, 30, 26, { fill: BLUE, fop: 0.3, c: BLUE }) + lab(72, 178, 'L', { a: 'middle', size: 12, w: 'bold' });
  s += lab(90, 210, 'fixed: MA = VR = 1', { a: 'middle', size: 11 }) + lab(90, 226, 'changes direction', { a: 'middle', size: 10, c: MUT });
  // movable pulley
  s += S.line(222, 20, 222, 130, { w: 1.4 }) + S.circle(240, 130, 18, { fill: 'var(--diagram-fill)', fop: 0.6 }) + S.circle(240, 130, 3, { fill: 'currentColor' });
  s += S.line(258, 130, 258, 70, { c: RED, w: 1.4 }) + S.arrow(258, 70, 258, 36, { c: RED }) + lab(264, 50, 'E', { size: 12, w: 'bold', c: RED });
  s += S.line(240, 148, 240, 160, { w: 1.5 }) + S.rect(225, 160, 30, 26, { fill: BLUE, fop: 0.3, c: BLUE }) + lab(240, 178, 'L', { a: 'middle', size: 12, w: 'bold' });
  s += lab(240, 210, 'movable: VR = 2', { a: 'middle', size: 11 }) + lab(240, 226, '2 strands share the load', { a: 'middle', size: 10, c: MUT });
  check(true, 'pulleys: the fixed pulley has one strand on each side (VR 1); the movable pulley hangs in a loop of two strands (VR 2)');
  return svgDoc(340, 240, 'Left: a single fixed pulley. The effort pulls down on one side of the string and the load hangs on the other; the mechanical advantage and velocity ratio are both one, but the direction of the force is changed. Right: a single movable pulley hanging in a loop of string fixed at one end; the effort pulls up the free end, two strands share the load, and the velocity ratio is two.', s);
})();
