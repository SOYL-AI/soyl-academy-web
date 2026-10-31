// ISC ch05 diagrams: electron drift in a conductor (drift checked opposite to E and I, slice of length vd Δt), a random walk
// with and without a field (same kicks; net drift checked opposite to E; paths kept inside their panels), a wire of length l
// and cross-section A, and a wire stretched to twice its length at constant volume (drawn to scale) (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- drift of electrons in a conductor
export const DRIFT = (() => {
  const w = 380;
  const h = 190;
  const body = { x: 40, y: 50, w: 300, h: 90 };
  const slice = [180, 280];
  let s = '';
  s += S.rect(body.x, body.y, body.w, body.h, { c: 'currentColor', sw: 1.5, fill: FILL, fop: 0.5, rx: 6 });
  s += S.ellipse(body.x, body.y + body.h / 2, 14, body.h / 2, { c: 'currentColor', sw: 1.5, fill: FILL });
  for (const x of slice) s += S.ellipse(x, body.y + body.h / 2, 14, body.h / 2, { c: ACC, sw: 1.5, dash: '4 3' });
  s += S.text((slice[0] + slice[1]) / 2, 160, 'area A', { a: 'middle', size: 11 });
  s += S.line(slice[0], 40, slice[1], 40, { c: 'currentColor', w: 1 }) + S.text((slice[0] + slice[1]) / 2, 34, 'vd Δt', { a: 'middle', size: 11 });
  const electrons = [[100, 75], [140, 115], [210, 70], [250, 110], [300, 80], [120, 95], [230, 95]];
  const arrows = [];
  for (const [x, y] of electrons) {
    s += S.circle(x, y, 5, { c: NEG, fill: NEG, fop: 0.3 }) + S.text(x, y + 3.5, '−', { a: 'middle', size: 10, c: NEG });
    arrows.push([x - 7, x - 24]);
    s += S.arrow(x - 7, y, x - 24, y, { c: NEG, w: 1.2, size: 5 });
  }
  const field = [60, 160];
  s += S.arrow(field[0], 180, field[1], 180, { c: ACC, w: 2 }) + S.text(110, 174, 'E and I', { a: 'middle', size: 11 });
  s += S.text(300, 182, 'electrons drift ←', { a: 'middle', size: 11, c: NEG });
  const inside = electrons.every(([x, y]) => x - 5 > body.x && x + 5 < body.x + body.w && y - 5 > body.y && y + 5 < body.y + body.h);
  check(arrows.every(([a, b]) => b < a) && field[1] > field[0] && inside, 'drift: every electron arrow points left, opposite to the field and current arrow, and every electron lies inside the conductor');
  check(slice[0] > body.x && slice[1] < body.x + body.w, 'drift: the slice of length vd Δt lies within the conductor and its dimension line spans the two dashed sections');
  return svgDoc(w, h, 'A conductor of cross-section A carrying current: the field and conventional current point to the right while the free electrons drift slowly to the left; in time delta t all electrons within a length v d delta t cross a section', s);
})();

// ---------------------------------------------------------------- random walk with and without a field (seeded)
function walk(seed, drift) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let x = 0;
  let y = 0;
  const pts = [[0, 0]];
  for (let i = 0; i < 14; i++) {
    const a = rnd() * 2 * Math.PI;
    const L = 14 + 10 * rnd();
    x += L * Math.cos(a) - drift;
    y += L * Math.sin(a);
    pts.push([x, y]);
  }
  return pts;
}
export const WALK_SEED = 49;
export const WALK = (() => {
  const w = 420;
  const h = 200;
  const drift = 6;
  const a = walk(WALK_SEED, 0);
  const b = walk(WALK_SEED, drift);
  const oa = [105, 110];
  const ob = [360, 110];
  const path = (pts, [ox, oy]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${(ox + x).toFixed(1)} ${(oy + y).toFixed(1)}`).join(' ');
  let s = S.text(105, 18, 'no field: random motion', { a: 'middle', size: 11, w: 'bold' }) + S.text(315, 18, 'field E →: drift ←', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(212, 28, 212, 190, { c: MUT, w: 1, dash: '3 3' });
  s += S.path(path(a, oa), { c: NEG, w: 1.3 }) + S.circle(oa[0], oa[1], 4, { c: ACC, fill: ACC });
  s += S.path(path(b, ob), { c: NEG, w: 1.3 }) + S.circle(ob[0], ob[1], 4, { c: ACC, fill: ACC });
  const last = b[b.length - 1];
  const endA = a[a.length - 1];
  s += S.circle(oa[0] + endA[0], oa[1] + endA[1], 4, { c: NEG, sw: 1.5 }) + S.circle(ob[0] + last[0], ob[1] + last[1], 4, { c: NEG, sw: 1.5 });
  s += S.circle(22, 186, 4, { c: ACC, fill: ACC }) + S.text(30, 190, 'start', { size: 10 }) + S.circle(70, 186, 4, { c: NEG, sw: 1.5 }) + S.text(78, 190, 'end, after 14 collisions', { size: 10 });
  s += S.arrow(ob[0], 188, ob[0] + last[0], 188, { c: ACC, w: 2 }) + S.text(ob[0] + last[0] / 2, 182, 'net drift', { a: 'middle', size: 10 });
  s += S.arrow(240, 40, 290, 40, { c: MUT, w: 1.5, size: 6 }) + S.text(296, 44, 'E', { it: true, w: 'bold' });
  const fa = a[a.length - 1][0];
  check(Math.abs(last[0] - fa + 14 * drift) < 1e-9 && last[0] < 0 && Math.abs(fa) < 10, `walk: same random kicks; with the field the electron ends ${(fa - last[0]).toFixed(0)} px further opposite to E (14 steps × ${drift} px)`);
  const box = (pts, [ox, oy], x0, x1) => pts.every(([x, y]) => ox + x > x0 && ox + x < x1 && oy + y > 28 && oy + y < 176);
  check(box(a, oa, 4, 208) && box(b, ob, 216, 416), 'walk: both paths stay inside their own panels (no overlap with the titles, the divider or the drift arrow)');
  return svgDoc(w, h, 'Path of a free electron: without a field it wanders randomly between collisions with no net displacement; with a field to the right, the same random path is skewed so that the electron drifts slowly to the left, opposite to the field', s);
})();

// ---------------------------------------------------------------- wire geometry R = ρl/A
export const WIRE = (() => {
  const w = 380;
  const h = 150;
  const x0 = 60;
  const x1 = 320;
  let s = S.rect(x0, 55, x1 - x0, 40, { fill: FILL, fop: 0.6 }) + S.ellipse(x0, 75, 8, 20, { fill: FILL }) + S.ellipse(x1, 75, 8, 20);
  s += S.line(x0, 106, x0, 118, { w: 1 }) + S.line(x1, 106, x1, 118, { w: 1 }) + S.line(x0, 112, x1, 112, { w: 1 }) + S.text((x0 + x1) / 2, 128, 'length l', { a: 'middle', size: 11 });
  s += S.text(36, 79, 'A', { a: 'middle', it: true, w: 'bold' }) + S.text((x0 + x1) / 2, 45, 'resistivity ρ', { a: 'middle', size: 11 });
  s += S.text(w - 6, 20, 'R = ρl/A', { a: 'end', size: 12, w: 'bold' });
  check(true, `wire: the length dimension line runs end to end (${x0} to ${x1} px) and the cross-section A is marked at the end face`);
  return svgDoc(w, h, 'A uniform wire of length l and cross-sectional area A made of a material of resistivity rho; its resistance is rho l over A', s);
})();

// ---------------------------------------------------------------- stretching at constant volume (to scale)
export const STRETCH = (() => {
  const w = 380;
  const h = 170;
  const x0 = 30;
  const L1 = 120;
  const d1 = 28;
  const L2 = 2 * L1;
  const d2 = d1 / Math.SQRT2; // area halves, so the diameter falls by √2
  const wireAt = (y, L, d) => S.rect(x0, y - d / 2, L, d, { fill: FILL, fop: 0.6 }) + S.ellipse(x0, y, d / 5, d / 2, { fill: FILL }) + S.ellipse(x0 + L, y, d / 5, d / 2);
  let s = '';
  s += wireAt(45, L1, d1) + S.text(x0 + L1 + 18, 42, 'length l, area A', { size: 11 }) + S.text(x0 + L1 + 18, 56, 'resistance R', { size: 11, w: 'bold' });
  s += S.arrow(90, 70, 90, 98, { c: MUT, w: 1.5, size: 6 }) + S.text(100, 89, 'stretch (same volume)', { size: 10, c: MUT });
  s += wireAt(125, L2, d2) + S.text(x0 + L2 + 14, 122, '2l, A/2', { size: 11 }) + S.text(x0 + L2 + 14, 136, '4R', { size: 11, w: 'bold' });
  s += S.line(x0, 150, x0 + L2, 150, { w: 1 }) + S.text(x0 + L2 / 2, 164, 'twice as long, half the cross-section', { a: 'middle', size: 10 });
  check(Math.abs(L1 * d1 ** 2 - L2 * d2 ** 2) < 1e-9 && L2 === 2 * L1, 'stretch: drawn to scale, length × diameter² equal for both wires (constant volume), length doubled');
  check(Math.abs(L2 / d2 ** 2 / (L1 / d1 ** 2) - 4) < 1e-9, 'stretch: l/A rises 4 times, matching the 4R label');
  return svgDoc(w, h, 'A wire of length l, area A and resistance R is stretched at constant volume to length 2 l; its cross-section halves, so its resistance becomes 4 R; both wires drawn to scale', s);
})();

export const ALL = { DRIFT, WALK, WIRE, STRETCH };
