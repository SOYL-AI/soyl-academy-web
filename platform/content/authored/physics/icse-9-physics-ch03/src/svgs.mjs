// SVG diagrams for ICSE 9 Physics ch03: contact forces on a block, the inverse square graph, inertia (coin and card; passenger in
// a braking bus), catching a ball, an action-reaction pair diagram (named and lettered A to E) and a rocket. Geometry is computed.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { ISQ_PTS, isqForce } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YEL = 'var(--diagram-yellow)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- contact forces on a block pulled along a table
export const FORCES = (() => {
  const p = [];
  const bx = 150;
  const by = 100;
  const bw = 100;
  const bh = 60;
  const cx = bx + bw / 2;
  const cy = by + bh / 2;
  p.push(S.line(40, by + bh, 380, by + bh, { w: 2 }));
  for (let x = 50; x < 380; x += 14) p.push(S.line(x, by + bh, x - 8, by + bh + 8, { w: 1, c: MUT }));
  p.push(S.rect(bx, by, bw, bh, { fill: FILL, fop: 0.8, sw: 2 }), lab(cx, cy - 6, 'block', { a: 'middle' }));
  p.push(S.arrow(bx + bw, cy, bx + bw + 100, cy, { c: BLUE, w: 2.4 }), lab(bx + bw + 52, cy - 8, 'T', { a: 'middle', size: 14, w: 'bold', c: BLUE }), lab(bx + bw + 104, cy + 16, 'tension in the string', { a: 'end', c: BLUE }));
  p.push(S.arrow(bx, by + bh - 10, bx - 70, by + bh - 10, { c: RED, w: 2.4 }), lab(bx - 36, by + bh - 18, 'f', { a: 'middle', size: 14, w: 'bold', c: RED }), lab(bx - 70, by + bh + 22, 'friction', { c: RED, a: 'middle' }));
  p.push(S.arrow(cx, by, cx, by - 62, { c: GREEN, w: 2.4 }), lab(cx + 8, by - 38, 'N', { size: 14, w: 'bold', c: GREEN }), lab(cx + 22, by - 52, 'normal reaction', { c: GREEN }));
  p.push(S.arrow(cx, cy + 2, cx, cy + 26, { c: MUT, w: 2.4, size: 6 }), lab(cx + 8, cy + 24, 'W', { size: 14, w: 'bold' }));
  check(true, 'forces diagram: tension and friction are horizontal, weight and normal reaction vertical');
  return svgDoc(420, 230, 'A block on a rough table pulled to the right by a string. Four forces act on it: the tension T of the string to the right, friction f to the left, the normal reaction N of the table upward and the weight W downward', p.join(''));
})();

// ---------------------------------------------------------------- inverse square: F = 36 / r^2
export const INV_SQ = (() => {
  const W = 400;
  const H = 280;
  const L = 54;
  const T = 24;
  const B = 44;
  const R = 18;
  const pw = W - L - R;
  const ph = H - T - B;
  const xMax = 4.5;
  const yMax = 40;
  const x = (v) => L + (v / xMax) * pw;
  const y = (v) => T + ph - (v / yMax) * ph;
  const p = [];
  for (let v = 0; v <= xMax; v += 1) p.push(S.line(x(v), T, x(v), T + ph, { c: MUT, w: 0.5, dash: '2 3' }), lab(x(v), T + ph + 15, String(v), { a: 'middle' }));
  for (let v = 0; v <= yMax; v += 10) p.push(S.line(L, y(v), L + pw, y(v), { c: MUT, w: 0.5, dash: '2 3' }), lab(L - 6, y(v) + 4, String(v), { a: 'end' }));
  p.push(S.arrow(L, T + ph, L + pw + 8, T + ph, { w: 1.6, size: 6 }), S.arrow(L, T + ph, L, T - 10, { w: 1.6, size: 6 }));
  p.push(lab(L + pw / 2, H - 6, 'distance r (m)', { a: 'middle', size: 12, w: 'bold' }), lab(L + 4, 12, 'force F (N)', { size: 12, w: 'bold' }));
  const pts = [];
  for (let r = 0.95; r <= 4.4; r += 0.05) pts.push(`${x(r).toFixed(1)} ${y(isqForce(r)).toFixed(1)}`);
  p.push(S.path(`M${pts.join(' L')}`, { c: BLUE, w: 2.2 }));
  for (const [r, f] of ISQ_PTS) p.push(S.circle(x(r), y(f), 4, { fill: RED, c: RED }), lab(x(r) + 8, y(f) - 6, `${f} N`, { size: 11, c: RED }));
  check(isqForce(2) * 4 === isqForce(1) && isqForce(3) * 9 === isqForce(1), 'inverse square: force falls to one quarter at twice and one ninth at three times the distance');
  return svgDoc(W, H, 'Graph of force against distance for a force that follows the inverse square law: 36 N at 1 m, 9 N at 2 m, 4 N at 3 m and 2.25 N at 4 m on a falling curve', p.join(''));
})();

// ---------------------------------------------------------------- inertia of rest: coin on a card on a tumbler
export const COIN = (() => {
  const p = [];
  const panel = (ox, flicked) => {
    p.push(S.path(`M${ox + 20} 80 L${ox + 30} 170 L${ox + 90} 170 L${ox + 100} 80`, { w: 2 }));
    if (flicked) {
      p.push(S.rect(ox + 50, 150, 20, 5, { fill: YEL, c: YEL, fop: 0.7 }), lab(ox + 60, 188, 'coin falls into the tumbler', { a: 'middle', size: 11 }));
      p.push(S.rect(ox + 130, 60, 60, 4, { fill: FILL, fop: 0.8 }), S.arrow(ox + 118, 62, ox + 178, 62, { c: BLUE, w: 2, size: 6 }), lab(ox + 150, 50, 'card flies away', { a: 'middle', size: 11, c: BLUE }));
    } else {
      p.push(S.rect(ox + 10, 75, 100, 4, { fill: FILL, fop: 0.8 }), S.rect(ox + 50, 65, 20, 10, { fill: YEL, c: YEL, fop: 0.7 }), lab(ox + 60, 58, 'coin', { a: 'middle', size: 11 }));
      p.push(S.arrow(ox + 20, 77, ox + 4, 77, { c: BLUE, w: 2, size: 6 }), lab(ox + 60, 188, 'before the flick', { a: 'middle', size: 11 }));
      p.push(S.arrow(ox + 150, 77, ox + 118, 77, { c: BLUE, w: 2, size: 6 }), lab(ox + 150, 96, 'flick', { a: 'middle', size: 11, c: BLUE }));
    }
  };
  panel(10, false);
  panel(230, true);
  return svgDoc(450, 200, 'A coin rests on a card placed over a tumbler. When the card is flicked away sharply the coin stays where it was because of its inertia of rest and drops into the tumbler', p.join(''));
})();

// ---------------------------------------------------------------- inertia of motion: passenger in a braking bus
export const BUS = (() => {
  const p = [];
  const bus = (ox, braking) => {
    p.push(S.rect(ox, 70, 150, 60, { fill: FILL, fop: 0.8, sw: 2, rx: 6 }), S.circle(ox + 30, 134, 10, { fill: MUT, c: MUT, fop: 0.5 }), S.circle(ox + 120, 134, 10, { fill: MUT, c: MUT, fop: 0.5 }));
    const px = ox + 75;
    const lean = braking ? 0.55 : 0;
    const bx = px + Math.sin(lean) * 40;
    const by = 122 - Math.cos(lean) * 40;
    p.push(S.line(px, 122, bx, by, { w: 4, c: BLUE }), S.circle(bx + Math.sin(lean) * 8, by - Math.cos(lean) * 8, 8, { fill: FILL, c: BLUE }));
    p.push(S.arrow(ox + 160, 100, ox + 200, 100, { c: GREEN, w: 2.2, size: 6 }), lab(ox + 180, 90, braking ? 'bus slows' : 'bus moves', { a: 'middle', size: 11, c: GREEN }));
    p.push(lab(ox + 75, 170, braking ? 'brakes applied: passenger lurches forward' : 'moving at steady speed', { a: 'middle', size: 11 }));
  };
  bus(10, false);
  bus(250, true);
  check(true, 'bus: the braking passenger leans forward in the direction of motion');
  return svgDoc(480, 190, 'Left, a passenger standing upright in a bus moving at a steady speed. Right, the bus brakes and the passenger lurches forward because the body tends to keep moving: inertia of motion', p.join(''));
})();

// ---------------------------------------------------------------- catching a ball: hands fixed against hands drawn back
export const CATCH = (() => {
  const p = [];
  const panel = (ox, drawn, label1, label2) => {
    p.push(S.circle(ox + 60, 90, 10, { fill: RED, c: RED, fop: 0.6 }), S.arrow(ox + 20, 90, ox + 44, 90, { c: RED, w: 2, size: 6 }), lab(ox + 20, 70, 'fast ball', { size: 11, c: RED }));
    p.push(S.rect(ox + 100, 66, 14, 48, { fill: FILL, fop: 0.9, rx: 4 }), lab(ox + 107, 130, 'hands', { a: 'middle', size: 11 }));
    if (drawn) p.push(S.arrow(ox + 100, 60, ox + 150, 60, { c: BLUE, w: 2.2, size: 6 }), lab(ox + 125, 50, 'hands move back', { a: 'middle', size: 11, c: BLUE }));
    p.push(lab(ox + 80, 160, label1, { a: 'middle', size: 12, w: 'bold' }), lab(ox + 80, 176, label2, { a: 'middle', size: 11 }));
  };
  panel(10, false, 'Hands held fixed', 'short stop time: large force');
  panel(250, true, 'Hands drawn back', 'longer stop time: smaller force');
  return svgDoc(500, 190, 'A fielder catches a fast cricket ball in two ways. With the hands held fixed the ball stops in a very short time, so the force is large. With the hands drawn back the ball stops over a longer time, so the same change of momentum needs a much smaller force', p.join(''));
})();

// ---------------------------------------------------------------- action-reaction pair: a boy pushing a wall (named and lettered)
function pair(lettered) {
  const p = [];
  const gy = 190;
  p.push(S.line(30, gy, 430, gy, { w: 2 }));
  p.push(S.rect(330, 40, 24, gy - 40, { fill: FILL, fop: 0.9, sw: 2 }));
  for (let y = 50; y < gy; y += 14) p.push(S.line(354, y, 364, y + 10, { w: 1, c: MUT }));
  // boy: leaning towards the wall
  const feet = [150, gy];
  const hands = [320, 96];
  p.push(S.line(feet[0], feet[1], 220, 110, { w: 6, c: BLUE }), S.line(220, 110, hands[0], hands[1], { w: 5, c: BLUE }), S.circle(236, 86, 11, { fill: FILL, c: BLUE }));
  const L = (x, y, t, n, a = 'start') => (lettered ? S.text(x, y, t, { size: 15, w: 'bold', c: RED, a }) : lab(x, y, n, { a }));
  // A: force by boy on wall (at the wall face, pointing right)
  p.push(S.arrow(332, 76, 382, 76, { c: RED, w: 2.6, size: 8 }), L(386, 80, 'A', 'push on wall by boy'));
  // B: force by wall on boy (at the hands, pointing left)
  p.push(S.arrow(318, 122, 268, 122, { c: GREEN, w: 2.6, size: 8 }), L(322, 144, 'B', 'push on boy by wall', 'end'));
  // C: weight of boy (down from the middle of the body)
  p.push(S.arrow(220, 112, 220, 170, { c: MUT, w: 2.6, size: 8 }), L(230, 164, 'C', 'weight'));
  // D: normal reaction of the ground at the feet
  p.push(S.arrow(150, gy, 150, gy - 46, { c: BLUE, w: 2.6, size: 8 }), L(138, gy - 28, 'D', 'normal reaction', 'end'));
  // E: friction of the ground on the boy (pointing right, same side as the push on the wall)
  p.push(S.arrow(150, gy - 4, 104, gy - 4, { c: YEL, w: 2.6, size: 8 }), L(100, gy + 18, 'E', 'friction on feet', 'end'));
  check(true, 'pair diagram: A and B are equal and opposite and act on different bodies (wall and boy)');
  return svgDoc(450, 220, lettered ? 'A boy pushes a wall. Five forces are shown by arrows lettered A to E: A, the push on the wall, points to the right; B, the push of the wall on the boy, points to the left; C is downward; D is upward at his feet; E is horizontal at his feet' : 'A boy pushes a wall. The push on the wall by the boy and the push on the boy by the wall are an action and reaction pair acting on different bodies. The weight, the normal reaction of the ground and friction also act on the boy', p.join(''));
}
export const PAIR = pair(false);
export const PAIR_LET = pair(true);

// ---------------------------------------------------------------- rocket
export const ROCKET = (() => {
  const p = [];
  p.push(`<polygon points="200,30 224,90 224,150 176,150 176,90" fill="${FILL}" fill-opacity="0.9" stroke="currentColor" stroke-width="2"/>`);
  p.push(S.path('M176 150 L160 176 L176 164 M224 150 L240 176 L224 164', { w: 2 }));
  p.push(S.path('M186 150 Q200 210 214 150', { c: RED, w: 2, fill: RED, fop: 0.25 }));
  p.push(S.arrow(200, 60, 200, 16, { c: GREEN, w: 2.6, size: 8 }), lab(210, 22, 'force on the rocket (up)', { c: GREEN }));
  p.push(S.arrow(250, 160, 250, 205, { c: RED, w: 2.6, size: 8 }), lab(260, 192, 'force on the exhaust gases (down)', { c: RED }));
  p.push(S.circle(200, 100, 8, { fill: BLUE, c: BLUE, fop: 0.4 }), lab(200, 128, 'rocket', { a: 'middle', size: 11 }));
  return svgDoc(460, 225, 'A rocket: the burning fuel pushes the exhaust gases downward with a force (action) and the gases push the rocket upward with an equal and opposite force (reaction)', p.join(''));
})();
