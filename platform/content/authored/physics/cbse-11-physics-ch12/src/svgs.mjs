// ch12 diagrams, all drawn from numbers with self-checks: a molecule bouncing off a wall (pressure derivation), degrees of freedom,
// molar heat capacities from f, a free-path picture with a measured mean, sample speeds with their mean and rms, and rms speeds
// of five gases to scale.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, vrmsM, modes, cvR, cpR, rng, meanOf, rmsOf } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- BOX: one molecule bounces off the right wall of a cube
export const BOX_DATA = { L: 170, x0: 40, y0: 40, S: [80, 150], H: [210, 98], m: 1 };
export const BOX = (() => {
  const { L, x0, y0, S: s0, H, m } = BOX_DATA;
  const w = 420;
  const h = 250;
  const wallX = x0 + L;
  const dx = H[0] - s0[0];
  const dy = H[1] - s0[1];
  const E = [H[0] - dx, H[1] + dy];
  let s = S.rect(x0, y0, L, L, { w: 1.5, fill: FILL, fop: 0.35 });
  s += S.line(wallX, y0, wallX, y0 + L, { c: RED, w: 4 });
  s += S.text(wallX + 6, y0 + 12, 'wall', { size: 11, c: RED, w: 'bold' }) + S.text(wallX + 6, y0 + 25, 'area A = L²', { size: 10, c: RED });
  s += S.circle(s0[0], s0[1], 6, { c: BLUE, fill: BLUE, fop: 0.4 });
  s += S.arrow(s0[0], s0[1], H[0], H[1],{ c: BLUE, w: 1.8, size: 7 });
  s += S.arrow(H[0], H[1], E[0], E[1], { c: GRN, w: 1.8, size: 7 });
  s += S.circle(E[0], E[1], 6, { c: GRN, fill: GRN, fop: 0.4 });
  s += S.text(s0[0] + 6, s0[1] + 20, 'before: (+vx, vy)', { size: 10, c: BLUE });
  s += S.text(E[0] - 4, E[1] - 12, 'after: (−vx, vy)', { size: 10, c: GRN });
  // box dimension L
  const by = y0 + L + 20;
  s += S.arrow(x0 + L / 2, by, x0, by, { w: 1.2, size: 5 }) + S.arrow(x0 + L / 2, by, wallX, by, { w: 1.2, size: 5 });
  s += S.text(x0 + L / 2, by + 15, 'side L (a cube)', { a: 'middle', size: 10 });
  // the arithmetic of one collision
  const vx = dx; // pixels per unit time stand for the x-component
  const dp = 2 * m * vx;
  const dt = (2 * L) / vx;
  s += S.lines(wallX + 62, y0 + 58, ['x-momentum before: + m vx', 'x-momentum after: − m vx', 'change given to wall: 2 m vx', 'return trip: 2L, time 2L / vx', 'force from this molecule on the', 'wall: 2 m vx ÷ (2L / vx) = m vx² / L'], { size: 10, dy: 16 });
  const okRefl = near(Math.hypot(dx, dy), Math.hypot(E[0] - H[0], E[1] - H[1]), 1e-9) && near(E[0] - H[0], -dx, 1e-9);
  const okVy = near(E[1] - H[1], dy, 1e-9);
  const okForce = near(dp / dt, (m * vx * vx) / L, 1e-9);
  const inside = [s0, H, E].every(([px, py]) => px >= x0 && px <= wallX && py >= y0 && py <= y0 + L);
  check(okRefl && okVy && okForce && inside, `box: speed unchanged and vx reversed on reflection (|v| ${f1(Math.hypot(dx, dy))} px both ways), vy unchanged; 2 m vx ÷ (2L/vx) = m vx²/L = ${f1((m * vx * vx) / L)} (arbitrary units); all points inside the cube`);
  return svgDoc(w, h, 'A molecule moving inside a cube of side L strikes the right-hand wall and rebounds: the component of velocity perpendicular to the wall reverses and the component along the wall is unchanged, so the wall receives a momentum of two m times v x per collision', s);
})();

// ---------------------------------------------------------------- DOF: three molecules and their degrees of freedom
export const DOF = (() => {
  const w = 420;
  const h = 268;
  const mono = modes(1, true);
  const di = modes(2, true);
  const tri = modes(3, false);
  let s = '';
  const panel = (cx, title, m, drawing) => {
    s += S.text(cx, 18, title, { a: 'middle', size: 11, w: 'bold' }) + drawing;
    s += S.lines(cx, 168, [`translation: ${m.trans}`, `rotation: ${m.rot}`, `vibration: ${m.vib}`], { a: 'middle', size: 10, dy: 14 });
    s += S.text(cx, 222, `f = ${m.trans + m.rot} at room temperature`, { a: 'middle', size: 10, w: 'bold', c: ACC });
    s += S.text(cx, 236, `(+ ${2 * m.vib} when vibrating: f = ${m.trans + m.rot + 2 * m.vib})`, { a: 'middle', size: 10, c: MUT });
  };
  // monatomic: one atom, three axes
  const c1 = 70;
  panel(c1, 'monatomic (He)', mono, S.circle(c1, 90, 12, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.arrow(c1, 90, c1 + 44, 90, { c: GRN, w: 1.6, size: 6 }) + S.arrow(c1, 90, c1, 44, { c: GRN, w: 1.6, size: 6 }) + S.arrow(c1, 90, c1 - 32, 122, { c: GRN, w: 1.6, size: 6 }) + S.text(c1 + 46, 94, 'x', { size: 10 }) + S.text(c1 + 4, 42, 'y', { size: 10 }) + S.text(c1 - 38, 134, 'z', { size: 10 }));
  // rigid diatomic: dumbbell, two rotations, one vibration
  const c2 = 210;
  const dumbbell = S.line(c2 - 22, 90, c2 + 22, 90, { w: 3 }) + S.circle(c2 - 22, 90, 10, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.circle(c2 + 22, 90, 10, { c: BLUE, fill: BLUE, fop: 0.35 });
  const rot1 = S.path(`M${c2 - 28} 66 A 30 16 0 0 1 ${c2 + 28} 66`, { c: RED, w: 1.6 }) + S.head(c2 + 28, 66, 0.9, { size: 6, c: RED });
  const rot2 = S.path(`M${c2 - 30} 106 A 30 12 0 0 0 ${c2 + 30} 106`, { c: RED, w: 1.6 }) + S.head(c2 + 30, 106, -1.2, { size: 6, c: RED });
  const vib = S.arrow(c2 - 34, 90, c2 - 46, 90, { c: ACC, w: 1.4, size: 5 }) + S.arrow(c2 + 34, 90, c2 + 46, 90, { c: ACC, w: 1.4, size: 5 });
  panel(c2, 'diatomic (O₂, N₂)', di, dumbbell + rot1 + rot2 + vib + S.text(c2, 142, 'two axes ⟂ the bond', { a: 'middle', size: 10, c: MUT }));
  // non-linear triatomic (bent)
  const c3 = 350;
  const bent = S.line(c3, 80, c3 - 24, 110, { w: 3 }) + S.line(c3, 80, c3 + 24, 110, { w: 3 }) + S.circle(c3, 80, 10, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.circle(c3 - 24, 110, 8, { c: BLUE, fill: BLUE, fop: 0.2 }) + S.circle(c3 + 24, 110, 8, { c: BLUE, fill: BLUE, fop: 0.2 });
  const arcs = S.path(`M${c3 - 36} 62 A 38 18 0 0 1 ${c3 + 36} 62`, { c: RED, w: 1.6 }) + S.head(c3 + 36, 62, 0.9, { size: 6, c: RED }) + S.path(`M${c3 + 40} 128 A 34 14 0 0 1 ${c3 - 40} 128`, { c: RED, w: 1.6 }) + S.head(c3 - 40, 128, 2.6, { size: 6, c: RED }) + S.path(`M${c3 + 46} 78 A 12 24 0 0 1 ${c3 + 46} 124`, { c: RED, w: 1.6 }) + S.head(c3 + 46, 124, 1.57, { size: 6, c: RED });
  panel(c3, 'triatomic (H₂O, bent)', tri, bent + arcs);
  s += S.text(w / 2, h - 4, 'one vibrational mode = kinetic + potential term = 2 quadratic terms', { a: 'middle', size: 10, c: MUT });
  const okCount = mono.total === 3 && di.total === 6 && tri.total === 9 && [mono, di, tri].every((m) => m.trans + m.rot + m.vib === m.total);
  const okF = [mono, di, tri].map((m) => m.trans + m.rot).join(',') === '3,5,6' && [mono, di, tri].map((m) => m.trans + m.rot + 2 * m.vib).join(',') === '3,7,12';
  check(okCount && okF && di.vib === 1 && tri.vib === 3, `dof: 3N modes split into translation + rotation + vibration (3 = 3+0+0, 6 = 3+2+1, 9 = 3+3+3); f = 3, 5, 6 at room temperature and 3, 7, 12 with vibration`);
  return svgDoc(w, h, 'Three molecules and their modes of motion: a single atom has three translational degrees of freedom; a rigid two-atom molecule has three translational and two rotational; a bent three-atom molecule has three translational and three rotational; vibrations add more at high temperature', s);
})();

// ---------------------------------------------------------------- CVBARS: Cv and Cp in units of R from f
export const CVBARS_DATA = { groups: [['monatomic', 3], ['diatomic (rigid)', 5], ['polyatomic (rigid)', 6]], scale: 36, base: 196 };
export const CVBARS = (() => {
  const { groups, scale, base } = CVBARS_DATA;
  const w = 420;
  const h = 250;
  let s = S.line(40, base, 404, base, { w: 1.2 });
  const rows = [];
  groups.forEach(([name, f], i) => {
    const gx = 62 + i * 118;
    const cv = cvR(f);
    const cp = cpR(f);
    rows.push({ name, f, cv, cp, gamma: cp / cv, hv: cv * scale, hp: cp * scale });
    s += S.rect(gx, base - cv * scale, 34, cv * scale, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.rect(gx + 38, base - cp * scale, 34, cp * scale, { c: RED, fill: RED, fop: 0.3 });
    s += S.text(gx + 17, base - cv * scale - 4, `${cv}`, { a: 'middle', size: 10, w: 'bold' }) + S.text(gx + 55, base - cp * scale - 4, `${cp}`, { a: 'middle', size: 10, w: 'bold' });
    s += S.text(gx + 36, base + 14, name, { a: 'middle', size: 10, w: 'bold' }) + S.text(gx + 36, base + 28, `f = ${f}`, { a: 'middle', size: 10 }) + S.text(gx + 36, base + 42, `γ = ${(cp / cv).toFixed(3)}`, { a: 'middle', size: 10, c: ACC });
  });
  s += S.rect(250, 8, 12, 10, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(266, 17, 'CV / R', { size: 10 }) + S.rect(330, 8, 12, 10, { c: RED, fill: RED, fop: 0.3 }) + S.text(346, 17, 'CP / R', { size: 10 });
  s += S.text(40, 17, 'molar heat capacities in units of R', { size: 10, c: MUT });
  const okDiff = rows.every((r) => near(r.cp - r.cv, 1, 1e-12) && near(r.hp - r.hv, scale, 1e-9));
  const okG = near(rows[0].gamma, 5 / 3, 1e-12) && near(rows[1].gamma, 7 / 5, 1e-12) && near(rows[2].gamma, 4 / 3, 1e-12);
  const tall = rows[2].hp < base - 30;
  check(okDiff && okG && tall, `cv-bars: C_P − C_V = R for every group (bar gap ${scale} px = 1 R); C_V/R = ${rows.map((r) => r.cv).join(', ')}; γ = ${rows.map((r) => r.gamma.toFixed(3)).join(', ')}`);
  return svgDoc(w, h, 'Bar chart of molar heat capacities in units of R: monatomic gas CV 1.5 and CP 2.5; rigid diatomic gas CV 2.5 and CP 3.5; rigid polyatomic gas CV 3 and CP 4; CP always exceeds CV by exactly 1', s);
})();

// ---------------------------------------------------------------- MFP: free paths between collisions
export const MFP_DATA = { seed: 12, n: 10 };
export const MFP = (() => {
  const { seed, n } = MFP_DATA;
  const w = 420;
  const h = 236;
  const bx = 16;
  const by = 30;
  const bw = 388;
  const bh = 160;
  const rnd = rng(seed);
  let pts = [[70, 100]];
  while (pts.length <= n) {
    const [px, py] = pts[pts.length - 1];
    const ang = rnd() * 2 * Math.PI;
    const len = 22 + rnd() * 70;
    const nx = px + len * Math.cos(ang);
    const ny = py + len * Math.sin(ang);
    if (nx > bx + 8 && nx < bx + bw - 8 && ny > by + 8 && ny < by + bh - 8) pts.push([nx, ny]);
  }
  const segs = pts.slice(1).map(([x, y], i) => Math.hypot(x - pts[i][0], y - pts[i][1]));
  const lam = meanOf(segs);
  let s = S.rect(bx, by, bw, bh, { w: 1.2, fill: FILL, fop: 0.25 });
  s += S.path(`M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`, { c: BLUE, w: 1.8 });
  pts.forEach(([x, y], i) => {
    s += S.circle(x, y, i === 0 || i === n ? 5 : 3.5, { c: i === 0 ? GRN : i === n ? RED : 'currentColor', fill: i === 0 ? GRN : i === n ? RED : 'currentColor', fop: i === 0 || i === n ? 0.5 : 0.7 });
  });
  s += S.text(pts[0][0] - 6, pts[0][1] - 10, 'start', { size: 10, c: GRN, a: 'end' }) + S.text(pts[n][0] + 7, pts[n][1] + 4, 'end', { size: 10, c: RED });
  s += S.text(bx + 4, by - 10, `one molecule: ${n} straight pieces between ${n + 1} points (collisions are the turning points)`, { size: 10 });
  s += S.text(bx + 4, by + bh + 16, `mean of these ${n} pieces = ${f1(lam)} px = mean free path λ here`, { size: 10, w: 'bold', c: ACC });
  s += S.text(bx + 4, by + bh + 31, `shortest ${f1(Math.min(...segs))} px, longest ${f1(Math.max(...segs))} px: free paths vary; λ is their average`, { size: 10, c: MUT });
  const inBox = pts.every(([x, y]) => x > bx && x < bx + bw && y > by && y < by + bh);
  check(inBox && segs.length === n && near(lam, segs.reduce((a, b) => a + b, 0) / n, 1e-12) && Math.max(...segs) > Math.min(...segs), `mfp: ${n} free paths drawn (${segs.map(f1).join(', ')} px), mean ${f1(lam)} px printed; all turning points inside the box`);
  return svgDoc(w, h, `A zigzag path of one gas molecule colliding with others: ten straight pieces of different lengths, whose average is the mean free path, about ${Math.round(lam)} units in this picture`, s);
})();

// ---------------------------------------------------------------- SPEEDS: ten sample speeds, mean and rms
export const SPEEDS_DATA = { v: [100, 200, 300, 300, 400, 400, 500, 500, 600, 700], sc: 0.28 };
export const SPEEDS = (() => {
  const { v, sc } = SPEEDS_DATA;
  const w = 420;
  const h = 262;
  const x0 = 46;
  const base = 228;
  const mean = meanOf(v);
  const rms = rmsOf(v);
  let s = S.arrow(x0 - 6, base, x0 + 10 * 30 + 6, base, { w: 1.2, size: 5 }) + S.arrow(x0 - 6, base, x0 - 6, base - 700 * sc - 12, { w: 1.2, size: 5 });
  s += S.text(x0 - 10, base - 700 * sc - 14, 'speed (m/s)', { size: 10 });
  v.forEach((vv, i) => {
    const bxp = x0 + i * 30;
    s += S.rect(bxp, base - vv * sc, 22, vv * sc, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(bxp + 11, base - vv * sc + 13, String(vv), { a: 'middle', size: 10 });
    s += S.text(bxp + 11, base + 13, String(i + 1), { a: 'middle', size: 10, c: MUT });
  });
  s += S.text(x0 + 5 * 30, base + 28, 'molecule number', { a: 'middle', size: 10, c: MUT });
  s += S.line(x0 - 6, base - mean * sc, x0 + 10 * 30 + 2, base - mean * sc, { c: GRN, w: 1.6, dash: '5 3' });
  s += S.line(x0 - 6, base - rms * sc, x0 + 10 * 30 + 2, base - rms * sc, { c: RED, w: 1.6, dash: '5 3' });
  s += S.text(x0 + 10 * 30 + 6, base - mean * sc + 12, `mean ${f1(mean)}`, { size: 10, c: GRN, w: 'bold', a: 'start' }) + S.text(x0 + 10 * 30 + 6, base - rms * sc - 2, `rms ${f1(rms)}`, { size: 10, c: RED, w: 'bold' });
  const ok = near(mean, 400, 1e-12) && near(rms * rms, 190000, 1e-9) && rms > mean && Math.max(...v) * sc < 215;
  check(ok, `speeds: mean ${mean} m/s, rms ${f1(rms)} m/s (mean of squares 190000); rms is above the mean; bars at ${sc} px per m/s`);
  return svgDoc(w, h, 'Bar chart of ten sample molecular speeds from 100 to 700 metres per second with a dashed line at their mean of 400 and a dashed line just above it at the root-mean-square speed of about 436', s);
})();

// ---------------------------------------------------------------- VRMSBARS: rms speeds of five gases at 300 K, to scale
export const VRMS_DATA = { T: 300, gases: [['hydrogen', 2.0e-3], ['helium', 4.0e-3], ['nitrogen', 28e-3], ['oxygen', 32e-3], ['carbon dioxide', 44e-3]], sc: 0.13 };
export const VRMSBARS = (() => {
  const { T, gases, sc } = VRMS_DATA;
  const w = 420;
  const h = 232;
  const x0 = 92;
  const rows = gases.map(([name, M], i) => ({ name, M, v: vrmsM(T, M), y: 34 + i * 38 }));
  let s = S.text(x0, 16, `rms speed at ${T} K (27 °C), scale ${sc} px per m/s`, { size: 10, c: MUT });
  for (const r of rows) {
    s += S.text(x0 - 6, r.y + 13, r.name, { a: 'end', size: 10, w: 'bold' });
    s += S.rect(x0, r.y, r.v * sc, 24, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(x0 + r.v * sc + 5, r.y + 16, `${Math.round(r.v)} m/s`, { size: 10, w: 'bold' });
    s += S.text(x0 - 6, r.y + 28, `M = ${r.M * 1000} g/mol`, { a: 'end', size: 10, c: MUT });
  }
  const [h2, he, n2, o2] = rows;
  const okR = near(h2.v / o2.v, 4, 1e-9) && near(he.v / n2.v, Math.sqrt(7), 1e-9) && rows.every((r, i) => i === 0 || r.v < rows[i - 1].v) && rows.every((r) => near(r.v, Math.sqrt((3 * 8.314 * T) / r.M), 1e-9));
  check(okR && x0 + h2.v * sc + 60 < w, `vrms-bars: v ∝ 1/√M (hydrogen ÷ oxygen = 4, helium ÷ nitrogen = √7); speeds ${rows.map((r) => Math.round(r.v)).join(', ')} m/s fit the frame`);
  return svgDoc(w, h, 'Horizontal bars to scale for the rms speed of five gases at 300 kelvin: hydrogen about 1934 metres per second, helium 1368, nitrogen 517, oxygen 484 and carbon dioxide 412; lighter molecules are faster', s);
})();

void R;
export const ALL = { BOX, DOF, CVBARS, MFP, SPEEDS, VRMSBARS };
