// ICSE 10 Physics ch02 diagrams (allow-listed elements, palette colours only). Geometry is computed and self-checked
// (SELF_CHECKS, read by build.mjs): the force components match F cos θ and F sin θ at the drawn angle, and the pendulum's
// heights follow h = L(1 − cos θ) for the drawn swing.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- force at an angle to the displacement
export const FORCE_ANGLE = (() => {
  const th = (60 * Math.PI) / 180;
  const F = 120; // px for the force arrow
  const o = [110, 140];
  const tip = [o[0] + F * Math.cos(th), o[1] - F * Math.sin(th)];
  let s = S.rect(o[0] - 50, o[1] - 20, 50, 40, { fill: 'var(--diagram-fill)', fop: 0.7 }) + lab(o[0] - 25, o[1] + 4, 'box', { a: 'middle', size: 10 });
  s += S.line(20, o[1] + 20, 400, o[1] + 20, { w: 1.2 });
  s += S.arrow(o[0], o[1], tip[0], tip[1], { c: RED, w: 2 }) + lab(tip[0] + 6, tip[1], 'F', { size: 13, w: 'bold', c: RED });
  s += S.line(o[0], o[1], tip[0], o[1], { c: BLUE, w: 1.5, dash: '5 3' }) + S.line(tip[0], o[1], tip[0], tip[1], { c: GREEN, w: 1.5, dash: '5 3' });
  s += lab(o[0] + (tip[0] - o[0]) / 2, o[1] + 14, 'F cos θ (does work)', { a: 'middle', size: 10, c: BLUE });
  s += lab(tip[0] + 6, (o[1] + tip[1]) / 2 + 20, 'F sin θ (no work)', { size: 10, c: GREEN });
  s += S.path(`M${o[0] + 30} ${o[1]} A 30 30 0 0 0 ${o[0] + 30 * Math.cos(th)} ${o[1] - 30 * Math.sin(th)}`, { c: ACC, w: 1.2 });
  s += lab(o[0] + 36, o[1] - 10, 'θ', { size: 12, c: ACC });
  s += S.arrow(260, o[1] + 40, 380, o[1] + 40, { c: 'currentColor' }) + lab(320, o[1] + 56, 'displacement s', { a: 'middle', size: 10 });
  const horiz = tip[0] - o[0];
  const vert = o[1] - tip[1];
  check(Math.abs(horiz - F * Math.cos(th)) < 1e-9 && Math.abs(vert - F * Math.sin(th)) < 1e-9 && Math.abs(horiz / F - 0.5) < 1e-9, 'force at 60°: the dashed horizontal component is F cos 60° = F/2 and the vertical component is F sin 60°, as drawn');
  return svgDoc(420, 210, 'A box pulled along level ground by a force F at angle theta above the horizontal. The force is resolved into a horizontal component F cos theta along the displacement, which does work, and a vertical component F sin theta perpendicular to the displacement, which does no work.', s);
})();

// ---------------------------------------------------------------- simple pendulum: energy at the extremes and the mean position
export const PENDULUM = (() => {
  const P = [200, 30];
  const L = 150;
  const th = (35 * Math.PI) / 180;
  const pos = [-th, 0, th].map((a) => [P[0] + L * Math.sin(a), P[1] + L * Math.cos(a)]);
  let s = S.line(140, P[1], 260, P[1], { w: 3 });
  pos.forEach((p, i) => {
    s += S.line(P[0], P[1], p[0], p[1], { w: 1.2, dash: i === 1 ? undefined : '4 3', c: i === 1 ? 'currentColor' : MUT });
    s += S.circle(p[0], p[1], 11, { fill: i === 1 ? GREEN : BLUE, fop: 0.5, c: i === 1 ? GREEN : BLUE });
  });
  const hpx = pos[1][1] - pos[0][1];
  s += S.line(pos[0][0] - 20, pos[0][1], pos[1][0] - 20, pos[0][1], { w: 1, c: MUT, dash: '3 2' });
  s += S.line(pos[0][0] - 20, pos[0][1], pos[0][0] - 20, pos[1][1], { w: 1, c: ACC }) + lab(pos[0][0] - 28, (pos[0][1] + pos[1][1]) / 2 + 4, 'h', { a: 'end', size: 12, c: ACC });
  s += lab(pos[0][0], pos[0][1] - 18, 'A: all PE', { a: 'middle', size: 10, c: BLUE });
  s += lab(pos[2][0], pos[2][1] - 18, 'C: all PE', { a: 'middle', size: 10, c: BLUE });
  s += lab(pos[1][0], pos[1][1] + 28, 'B (mean): all KE, fastest', { a: 'middle', size: 10, c: GREEN });
  check(Math.abs(hpx - L * (1 - Math.cos(th))) < 1e-9 && Math.abs(pos[0][1] - pos[2][1]) < 1e-9, 'pendulum: both extreme positions are at the same height h = L(1 − cos θ) above the mean position, as energy conservation requires');
  return svgDoc(400, 230, 'A simple pendulum swinging between extreme positions A and C through the mean position B. At A and C the bob is momentarily at rest at height h above B and its energy is all potential; at B it moves fastest and its energy is all kinetic. A and C are at the same height.', s);
})();
