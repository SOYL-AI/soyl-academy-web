// ISC 11 ch06 diagrams, all drawn from numbers with self-checks: the two views of friction at a surface, static friction adjusting to
// the push (four crate pictures), a block pushed up a rough slope, a block sliding down one, a roller pulled and pushed, the angle
// of friction, the angle of repose and a ball bearing.
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, slope, handleForce } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const d1 = (n) => (Math.round(n * 10) / 10).toFixed(1);
const d2 = (n) => (Math.round(n * 100) / 100).toFixed(2);
const d0 = (n) => String(Math.round(n));
const sum = (vs) => vs.reduce((a, v) => [a[0] + v[0], a[1] + v[1]], [0, 0]);
const mag = (v) => Math.hypot(v[0], v[1]);

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const vec = (x, y, dx, dy, o = {}) => (mag([dx, dy]) < 1e-9 ? '' : S.arrow(x, y, x + dx, y + dy, { w: 2.2, size: 7, ...o }));
const pd = (pts) => `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`;

// ---------------------------------------------------------------- CONTACT: classical (interlocking) and modern (adhesion) views
export const CONTACT_DATA = { period: 25, h: 14, gap: 2, xs: [30, 55, 80, 105, 130, 155, 180], touching: [1, 3, 5], d: [7, 0, 9, 0, 6, 0, 10], e: [5, 0, 8, 0, 9, 0, 6], patch: 5 };
export const CONTACT = (() => {
  const { period, h: th, gap, xs, touching, d, e, patch } = CONTACT_DATA;
  const w = 430;
  const h = 216;
  let s = '';
  // ---- left panel: classical view, meshed teeth with a constant gap
  const lx = 12;
  const yb = 130;
  const teeth = 7;
  const low = [];
  for (let i = 0; i <= teeth; i++) {
    low.push([lx + i * period, yb]);
    if (i < teeth) low.push([lx + i * period + period / 2, yb - th]);
  }
  const up = low.map(([x, y]) => [x, y - gap]);
  s += S.path(`${pd(low)} L${f1(lx + teeth * period)} ${yb + 24} L${lx} ${yb + 24} Z`, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.3 });
  s += S.path(`${pd(up)} L${f1(lx + teeth * period)} ${yb - 52} L${lx} ${yb - 52} Z`, { c: BLUE, fill: BLUE, fop: 0.18, w: 1.3 });
  s += S.arrow(lx + 20, yb - 30, lx + 20 + 60, yb - 30, { c: RED, w: 2.2, size: 7 });
  s += S.text(lx + 86, yb - 26, 'push', { size: 10, c: RED, w: 'bold' });
  s += S.text(lx, 18, 'Classical view', { size: 12, w: 'bold' });
  s += S.lines(lx, 34, ['Hills of one surface fit into the', 'hollows of the other: sliding means', 'lifting over or shearing them off.'], { size: 10, dy: 12 });
  s += S.text(lx, yb + 44, `meshed teeth, gap ${gap} px (schematic)`, { size: 10, c: MUT });
  // ---- right panel: modern view, a few contact points, cold-welded
  const rx = 226;
  const y0 = 128; // contact plane
  const yLowBase = y0 + 26;
  const yUpBase = y0 - 26;
  const half = 12;
  const lowP = [];
  const upP = [];
  xs.forEach((x0, i) => {
    const x = rx + x0 - 22;
    lowP.push([x - half, yLowBase], [x, y0 + d[i]], [x + half, yLowBase]);
    upP.push([x - half, yUpBase], [x, y0 - e[i]], [x + half, yUpBase]);
  });
  s += S.path(`${pd(lowP)} L${f1(lowP.at(-1)[0])} ${yLowBase + 14} L${f1(lowP[0][0])} ${yLowBase + 14} Z`, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.3 });
  s += S.path(`${pd(upP)} L${f1(upP.at(-1)[0])} ${yUpBase - 14} L${f1(upP[0][0])} ${yUpBase - 14} Z`, { c: BLUE, fill: BLUE, fop: 0.18, w: 1.3 });
  touching.forEach((i) => {
    const x = rx + xs[i] - 22;
    s += S.circle(x, y0, patch / 2 + 2, { c: RED, fill: RED });
  });
  s += S.text(rx, 18, 'Modern view', { size: 12, w: 'bold' });
  s += S.lines(rx, 34, ['The surfaces really touch only at a', 'few tips. There the atoms stick', '(cold welding); friction is the force', 'to break these junctions.'], { size: 10, dy: 12 });
  s += S.text(rx, yLowBase + 36, 'red: welded junctions (not to scale)', { size: 10, c: RED });
  const realFrac = (touching.length * patch) / (xs.at(-1) - xs[0] + 2 * half);
  let gapOk = true;
  for (let i = 0; i < low.length; i++) if (!near(low[i][1] - up[i][1], gap, 1e-9) || low[i][0] !== up[i][0]) gapOk = false;
  check(gapOk && teeth === 7, `contact: classical panel, the upper surface is the lower surface lifted ${gap} px at all ${low.length} corners (teeth mesh, nothing overlaps)`);
  const gaps = xs.map((_, i) => d[i] + e[i]);
  const okTouch = gaps.every((q, i) => (touching.includes(i) ? q === 0 : q >= 10)) && touching.length === 3;
  check(okTouch, `contact: modern panel, tip gaps (px) ${gaps.join(', ')}: exactly 3 of the 7 pairs touch (gap 0), the other 4 have gaps of 10 px or more; welded patches ${d0(realFrac * 100)}% of the apparent length (schematic)`);
  return svgDoc(w, h, 'Two views of friction. Left, the classical view: the teeth of two rough surfaces mesh like a saw blade, so sliding means lifting over or breaking the teeth. Right, the modern view: the two surfaces touch only at three of seven tips, drawn in red, where the atoms stick together by cold welding; the force needed to break these junctions is the friction', s);
})();

// ---------------------------------------------------------------- SELFADJ: crate of 35 kg, pushes 0, 60, 120 N (at rest) and 180 N (sliding)
export const SELFADJ_DATA = { m: 35, mus: 0.45, muk: 0.3, k: 0.6, pushes: [0, 60, 120, 180] };
SELFADJ_DATA.N = SELFADJ_DATA.m * g;
SELFADJ_DATA.fmax = SELFADJ_DATA.mus * SELFADJ_DATA.N;
SELFADJ_DATA.fk = SELFADJ_DATA.muk * SELFADJ_DATA.N;
export const SELFADJ = (() => {
  const { m, k, pushes, fmax, fk } = SELFADJ_DATA;
  const w = 430;
  const h = 272;
  let s = '';
  const lens = [];
  pushes.forEach((F, i) => {
    const ox = (i % 2) * 215;
    const oy = Math.floor(i / 2) * 132;
    const gy = oy + 92;
    const bx = ox + 130;
    const bw = 56;
    const bh = 36;
    const sliding = F > fmax;
    const f = sliding ? fk : F;
    s += S.line(ox + 6, gy, ox + 208, gy, { w: 2 });
    s += S.rect(bx, gy - bh, bw, bh, { c: BLUE, fill: BLUE, fop: 0.22 });
    s += S.text(bx + bw / 2, gy - bh / 2 + 4, `${m} kg`, { a: 'middle', size: 10 });
    s += S.text(ox + 8, oy + 14, sliding ? `F = ${F} N: crate slides` : F === 0 ? 'F = 0: crate at rest' : `F = ${F} N: crate at rest`, { size: 11, w: 'bold' });
    if (F > 0) s += S.arrow(bx - k * F, gy - bh / 2, bx, gy - bh / 2, { c: RED, w: 2.2, size: 7 });
    if (F > 0) s += S.text(bx - 4, gy - bh / 2 - 8, `F = ${F} N`, { a: 'end', size: 10, c: RED, w: 'bold' });
    const fy = gy + 13;
    if (f > 0) s += S.arrow(bx + bw / 2, fy, bx + bw / 2 - k * f, fy, { c: ACC, w: 2.2, size: 7 });
    s += S.text(bx + bw / 2 - k * f - 2, fy + 13, f === 0 ? 'f = 0' : `f = ${d1(f)} N`, { size: 10, c: ACC, w: 'bold' });
    lens.push({ F, f, fLen: k * f, FLen: k * F, sliding });
  });
  s += S.text(8, 264, `Scale ${k} px per newton. Limiting friction ${d1(fmax)} N, kinetic friction ${d1(fk)} N.`, { size: 10 });
  const okRest = lens.slice(0, 3).every((q) => near(q.fLen, q.FLen, 1e-9) && q.F <= fmax);
  const okSlide = lens[3].sliding && near(lens[3].fLen, k * fk, 1e-9) && lens[3].fLen < lens[3].FLen && near((lens[3].FLen - lens[3].fLen) / k, 180 - fk, 1e-9) && fk < fmax;
  check(okRest && okSlide, `selfadj: at rest the friction arrow equals the push (0, 60, 120 N; all below the limit ${d1(fmax)} N); at 180 N the crate slides and friction drops to ${d1(fk)} N, leaving a net ${d1(180 - fk)} N`);
  return svgDoc(w, h, `Four pictures of a 35 kilogram crate on a floor with pushes of 0, 60, 120 and 180 newtons. For the first three the crate stays at rest and the friction arrow is exactly as long as the push arrow, so friction adjusts itself. At 180 newtons, above the limiting friction of ${d1(fmax)} newtons, the crate slides and the friction arrow shrinks to the kinetic value of ${d1(fk)} newtons`, s);
})();

// ---------------------------------------------------------------- slope scene helper
function slopeScene(thDeg, { Ax = 30, Ay = 266, L = 330, sC = 200, half = 26, hh = 16 } = {}) {
  const t = rad(thDeg);
  const along = [Math.cos(t), -Math.sin(t)]; // up the slope, screen coordinates
  const nrm = [-Math.sin(t), -Math.cos(t)]; // out of the slope, screen coordinates
  const Bx = Ax + L * Math.cos(t);
  const By = Ay - L * Math.sin(t);
  let s = S.path(`M${f1(Ax)} ${Ay} L${f1(Bx)} ${f1(By)} L${f1(Bx)} ${Ay} Z`, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.5 });
  const base = [Ax + sC * along[0], Ay + sC * along[1]];
  const corner = (u, n) => [base[0] + u * along[0] + n * nrm[0], base[1] + u * along[1] + n * nrm[1]];
  const pts = [corner(-half, 0), corner(half, 0), corner(half, 2 * hh), corner(-half, 2 * hh)];
  s += S.path(`M${pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L')} Z`, { c: BLUE, fill: BLUE, fop: 0.25 });
  const C = corner(0, hh);
  return { s, C, along, nrm, t, Ax, Ay };
}
const arcAt = (x, y, r0, thDeg) => S.path(`M${f1(x + r0)} ${y} A${r0} ${r0} 0 0 0 ${f1(x + r0 * Math.cos(rad(thDeg)))} ${f1(y - r0 * Math.sin(rad(thDeg)))}`, { c: 'currentColor', w: 1 });

// ---------------------------------------------------------------- INCL_UP: 40 kg pushed up a 20 degree slope at constant speed, mu_k = 0.25
export const UP_DATA = { m: 40, th: 20, mu: 0.25, k: 0.22 };
Object.assign(UP_DATA, slope(UP_DATA.m, UP_DATA.th, UP_DATA.mu));
export const INCL_UP = (() => {
  const { m, th, mu, k, W, N, fric, up } = UP_DATA;
  const w = 420;
  const h = 290;
  const sc = slopeScene(th);
  let s = sc.s;
  const { C, along, nrm } = sc;
  s += arcAt(sc.Ax, sc.Ay, 70, th);
  s += S.text(sc.Ax + 76, sc.Ay - 4, `θ = ${th}°`, { size: 11, w: 'bold' });
  const Wv = [0, k * W];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const fv = [-k * fric * along[0], -k * fric * along[1]];
  const Pv = [k * up * along[0], k * up * along[1]];
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  s += vec(C[0], C[1], ...Wv, { c: RED }) + vec(C[0], C[1], ...Nv, { c: GRN }) + vec(C[0], C[1], ...fv, { c: ACC }) + vec(C[0], C[1], ...Pv, { c: BLUE });
  s += S.text(C[0] + 8, C[1] + Wv[1] * 0.6, `W = mg = ${d1(W)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(C[0] + Nv[0] - 6, C[1] + Nv[1] - 4, `N = ${d1(N)} N`, { a: 'end', size: 10, c: GRN, w: 'bold' });
  s += S.text(C[0] + fv[0] - 24, C[1] + fv[1] + 20, `f = μN = ${d1(fric)} N`, { a: 'end', size: 10, c: ACC, w: 'bold' });
  s += S.text(C[0] + Pv[0] + 6, C[1] + Pv[1] - 6, `P = ${d1(up)} N`, { size: 10, c: BLUE, w: 'bold' });
  s += S.text(30, 18, `${m} kg pushed up at constant speed: forces balance`, { size: 11, w: 'bold' });
  s += S.text(30, 34, `μ = ${mu}. Friction acts down the slope, against the motion. Scale: ${k} px per N.`, { size: 10 });
  const net = sum([Wv, Nv, fv, Pv]);
  check(mag(net) / k < 1e-9, `incl-up: drawn W, N, f and P sum to zero (net ${mag(net).toExponential(1)} px) for ${m} kg at ${th}° with μ = ${mu}`);
  const okAng = near(Math.atan2(Math.abs(Nv[0]), Math.abs(Nv[1])), rad(th), 1e-9) && near(fric / N, mu, 1e-12) && near(up, W * Math.sin(rad(th)) + fric, 1e-12) && near(Math.atan2(-Pv[1], Pv[0]), rad(th), 1e-9);
  check(okAng, `incl-up: N drawn ${th}° from the vertical, P drawn ${th}° above the horizontal; f/N = ${mu}; P = mg sin θ + μ mg cos θ = ${d1(up)} N (W = ${d1(W)} N, N = ${d1(N)} N, f = ${d1(fric)} N)`);
  return svgDoc(w, h, `A block of 40 kilograms pushed up a rough slope of 20 degrees at constant speed. From its centre: weight ${d1(W)} newtons straight down, normal reaction ${d1(N)} newtons perpendicular to the slope, friction ${d1(fric)} newtons down the slope, and the push of ${d1(up)} newtons up the slope, which balance`, s);
})();

// ---------------------------------------------------------------- INCL_DOWN: 25 kg sliding down a 35 degree slope, mu_k = 0.30
export const DOWN_DATA = { m: 25, th: 35, mu: 0.3, k: 0.4 };
Object.assign(DOWN_DATA, slope(DOWN_DATA.m, DOWN_DATA.th, DOWN_DATA.mu));
export const INCL_DOWN = (() => {
  const { m, th, mu, k, W, N, fric, along: wAlong, aDown } = DOWN_DATA;
  const w = 420;
  const h = 290;
  const sc = slopeScene(th, { sC: 215 });
  let s = sc.s;
  const { C, along, nrm } = sc;
  s += arcAt(sc.Ax, sc.Ay, 70, th);
  s += S.text(sc.Ax + 76, sc.Ay - 4, `θ = ${th}°`, { size: 11, w: 'bold' });
  const Wv = [0, k * W];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const fv = [k * fric * along[0], k * fric * along[1]]; // friction up the slope (the block moves down)
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  s += vec(C[0], C[1], ...Wv, { c: RED }) + vec(C[0], C[1], ...Nv, { c: GRN }) + vec(C[0], C[1], ...fv, { c: ACC });
  // net force along the slope, drawn from a point shifted out of the slope
  const O = [C[0] + 30 * nrm[0], C[1] + 30 * nrm[1]];
  const net = k * (wAlong - fric);
  const netv = [-net * along[0], -net * along[1]];
  s += vec(O[0], O[1], ...netv, { c: 'currentColor', w: 2.2 });
  s += S.text(C[0] + Wv[0] + 8, C[1] + Wv[1] * 0.6, `W = ${d1(W)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(C[0] + Nv[0] - 6, C[1] + Nv[1] - 4, `N = ${d1(N)} N`, { a: 'end', size: 10, c: GRN, w: 'bold' });
  {
    const Lp = [C[0] + 46 * along[0] - 34 * nrm[0], C[1] + 46 * along[1] - 34 * nrm[1]];
    s += S.lead(C[0] + fv[0] + 2, C[1] + fv[1] + 2, Lp[0] - 2, Lp[1] - 4);
    s += S.text(Lp[0], Lp[1], `f = ${d1(fric)} N`, { size: 10, c: ACC, w: 'bold' });
  }
  s += S.text(O[0] + netv[0] - 6, O[1] + netv[1] - 6, `net = ma = ${d1(wAlong - fric)} N`, { a: 'end', size: 10, w: 'bold' });
  s += S.text(30, 18, `${m} kg sliding down: friction up the slope, net force down`, { size: 11, w: 'bold' });
  s += S.text(30, 34, `μ = ${mu}. Component of weight along the slope = ${d1(wAlong)} N. Scale: ${k} px per N.`, { size: 10 });
  const tot = sum([Wv, Nv, fv]);
  const alongDown = [-along[0], -along[1]];
  const netAlong = (tot[0] * alongDown[0] + tot[1] * alongDown[1]) / k;
  const perp = Math.abs(tot[0] * nrm[0] + tot[1] * nrm[1]) / k;
  check(near(netAlong, wAlong - fric, 1e-9) && perp < 1e-9 && near(netAlong / m, aDown, 1e-9), `incl-down: drawn W + N + f is ${d1(netAlong)} N along the slope and ${perp.toExponential(1)} N across it; divided by ${m} kg that is a = ${d2(aDown)} m/s² = g(sin ${th}° − μ cos ${th}°)`);
  check(near(Math.atan2(Math.abs(Nv[0]), Math.abs(Nv[1])), rad(th), 1e-9) && near(Math.atan2(-fv[1], fv[0]), rad(th), 1e-9) && near(mag(netv) / k, wAlong - fric, 1e-9), `incl-down: N drawn ${th}° from the vertical, f drawn ${th}° above the horizontal, net arrow ${d1(mag(netv) / k)} N`);
  return svgDoc(w, h, `A block of 25 kilograms sliding down a rough slope of 35 degrees. From its centre: weight ${d1(W)} newtons down, normal reaction ${d1(N)} newtons perpendicular to the slope and friction ${d1(fric)} newtons up the slope. The net force down the slope is ${d1(wAlong - fric)} newtons`, s);
})();

// ---------------------------------------------------------------- ROLLER: 50 kg roller, mu = 0.3, handle at 40 degrees, pulled and pushed at constant speed
export const ROLLER_DATA = { m: 50, mu: 0.3, phi: 40, k: 0.17 };
ROLLER_DATA.W = ROLLER_DATA.m * g;
ROLLER_DATA.pull = handleForce(ROLLER_DATA.W, ROLLER_DATA.mu, ROLLER_DATA.phi, 1);
ROLLER_DATA.push = handleForce(ROLLER_DATA.W, ROLLER_DATA.mu, ROLLER_DATA.phi, -1);
ROLLER_DATA.Npull = ROLLER_DATA.W - ROLLER_DATA.pull * Math.sin(rad(ROLLER_DATA.phi));
ROLLER_DATA.Npush = ROLLER_DATA.W + ROLLER_DATA.push * Math.sin(rad(ROLLER_DATA.phi));
export const ROLLER = (() => {
  const { mu, phi, k, W, pull, push, Npull, Npush } = ROLLER_DATA;
  const w = 430;
  const h = 345;
  let s = '';
  const cph = Math.cos(rad(phi));
  const sph = Math.sin(rad(phi));
  const res = [];
  [[0, 'pull', pull, Npull, 1], [215, 'push', push, Npush, -1]].forEach(([ox, kind, F, N, sgn]) => {
    const cx = ox + 105;
    const gy = 92;
    const rr = 24;
    s += S.line(ox + 8, gy, ox + 205, gy, { w: 2 });
    s += S.circle(cx, gy - rr, rr, { c: BLUE, fill: BLUE, fop: 0.2 });
    s += S.circle(cx, gy - rr, 2.5, { fill: 'currentColor' });
    const hl = 62;
    const hx = sgn > 0 ? cx + hl * cph : cx - hl * cph;
    const hy = gy - rr - hl * sph;
    s += S.line(cx, gy - rr, hx, hy, { w: 2.5 });
    s += S.text(ox + 8, 14, kind === 'pull' ? `Pulled: handle ${phi}° above the ground` : `Pushed: handle ${phi}° above the ground`, { size: 11, w: 'bold' });
    s += S.arrow(cx + 34, gy - 8, cx + 76, gy - 8, { c: MUT, w: 1.3, size: 5 });
    s += S.text(cx + 34, gy - 14, 'motion', { size: 10, c: MUT });
    // free-body diagram of the roller (a dot), forces to scale
    const dy = 222;
    s += S.circle(cx, dy, 3, { fill: 'currentColor' });
    const f = mu * N;
    const Fv = [k * F * cph, -sgn * k * F * sph]; // pull: up and forward; push: down and forward
    const Nv = [0, -k * N];
    const Wv = [0, k * W];
    const fv = [-k * f, 0];
    s += vec(cx, dy, ...Fv, { c: BLUE }) + vec(cx, dy, ...Nv, { c: GRN }) + vec(cx, dy, ...Wv, { c: RED }) + vec(cx, dy, ...fv, { c: ACC });
    s += S.text(cx + Fv[0] + 5, dy + Fv[1] + (sgn > 0 ? -4 : 12), `F = ${d0(F)} N`, { size: 10, c: BLUE, w: 'bold' });
    s += S.text(cx + 8, dy + Nv[1] + 4, `N = ${d0(N)} N`, { size: 10, c: GRN, w: 'bold' });
    s += S.text(cx + 8, dy + Wv[1] + 4, `W = ${d0(W)} N`, { size: 10, c: RED, w: 'bold' });
    s += S.text(cx + fv[0] - 4, dy + 16, `f = ${d0(f)} N`, { a: 'end', size: 10, c: ACC, w: 'bold' });
    const net = sum([Fv, Nv, Wv, fv]);
    res.push({ kind, net: mag(net) / k, F, N, f, Fv, Nv });
  });
  s += S.text(8, 338, `Weight ${d0(W)} N, μ = ${mu}. Scale ${k} px per N. Same speed, so all forces balance.`, { size: 10 });
  check(res.every((q) => q.net < 1e-9), `roller: drawn F, N, W and f balance in both panels (net ${res.map((q) => q.net.toExponential(1)).join(', ')} N)`);
  const [a, b] = res;
  check(near(a.N, W - a.F * sph, 1e-12) && near(b.N, W + b.F * sph, 1e-12) && near(a.F * cph, mu * a.N, 1e-6) && near(b.F * cph, mu * b.N, 1e-6) && a.F < b.F && a.N < W && b.N > W, `roller: pull F = ${d0(a.F)} N with N = ${d0(a.N)} N < W; push F = ${d0(b.F)} N with N = ${d0(b.N)} N > W; F cos ${phi}° = μN in both; the push needs ${d2(b.F / a.F)} times the pull`);
  check(near(Math.atan2(-a.Fv[1], a.Fv[0]), rad(phi), 1e-9) && near(Math.atan2(b.Fv[1], b.Fv[0]), rad(phi), 1e-9), `roller: F drawn ${phi}° above the horizontal for the pull and ${phi}° below it for the push`);
  return svgDoc(w, h, `A roller of weight ${d0(W)} newtons with its handle at 40 degrees. Left, pulled: the handle force of ${d0(pull)} newtons has an upward component, so the normal reaction falls to ${d0(Npull)} newtons. Right, pushed: the force of ${d0(push)} newtons has a downward component, so the normal reaction rises to ${d0(Npush)} newtons and friction is greater`, s);
})();

// ---------------------------------------------------------------- ANGLES: angle of friction, mu_s = 0.5, 10 kg block
export const ANGLES_DATA = { m: 10, mus: 0.5, k: 1.2 };
ANGLES_DATA.N = ANGLES_DATA.m * g;
ANGLES_DATA.fmax = ANGLES_DATA.mus * ANGLES_DATA.N;
ANGLES_DATA.R = Math.hypot(ANGLES_DATA.N, ANGLES_DATA.fmax);
ANGLES_DATA.lam = deg(Math.atan(ANGLES_DATA.mus));
export const ANGLES = (() => {
  const { m, mus, k, N, fmax, R, lam } = ANGLES_DATA;
  const w = 420;
  const h = 250;
  const gy = 210;
  const bx = 40;
  const bw = 70;
  const bh = 46;
  let s = S.line(20, gy, 400, gy, { w: 2 });
  s += S.rect(bx, gy - bh, bw, bh, { c: BLUE, fill: BLUE, fop: 0.22 });
  s += S.text(bx + bw / 2, gy - bh / 2 + 4, `${m} kg`, { a: 'middle', size: 11 });
  s += S.arrow(bx + bw + 4, gy - bh / 2, bx + bw + 4 + k * fmax, gy - bh / 2, { c: BLUE, w: 2.2, size: 7 });
  s += S.text(bx + bw + 8, gy - bh / 2 - 8, `pull = ${d1(fmax)} N (just sliding)`, { size: 10, c: BLUE, w: 'bold' });
  // contact-force diagram from the contact point O
  const O = [300, gy - 6];
  const Nv = [0, -k * N];
  const fv = [-k * fmax, 0];
  const Rv = [fv[0], Nv[1]];
  s += S.line(O[0] + fv[0], O[1] + Nv[1], O[0] + fv[0], O[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(O[0] + fv[0], O[1] + Nv[1], O[0], O[1] + Nv[1], { c: MUT, w: 1, dash: '4 3' });
  s += vec(O[0], O[1], ...Nv, { c: GRN }) + vec(O[0], O[1], ...fv, { c: ACC }) + vec(O[0], O[1], ...Rv, { c: RED, w: 2.6 });
  s += S.path(`M${f1(O[0])} ${f1(O[1] - 44)} A44 44 0 0 0 ${f1(O[0] - 44 * Math.sin(rad(lam)))} ${f1(O[1] - 44 * Math.cos(rad(lam)))}`, { c: 'currentColor', w: 1.2 });
  s += S.text(O[0] - 17, O[1] - 56, 'λ', { size: 13, w: 'bold' });
  s += S.text(O[0] + 8, O[1] + Nv[1] + 12, `N = ${d1(N)} N`, { size: 10, c: GRN, w: 'bold' });
  s += S.text(O[0] + fv[0] / 2, O[1] + 14, `f max = ${d1(fmax)} N`, { a: 'middle', size: 10, c: ACC, w: 'bold' });
  s += S.text(O[0] + Rv[0] - 4, O[1] + Rv[1] - 6, `R = ${d1(R)} N`, { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(20, 18, 'Angle of friction λ: angle between the normal reaction N', { size: 11, w: 'bold' });
  s += S.text(20, 33, `and the resultant R of N and limiting friction. λ = ${d1(lam)}°, tan λ = f max / N = μs = ${mus}.`, { size: 10 });
  const ang = Math.atan2(Math.abs(Rv[0]), Math.abs(Rv[1]));
  check(near(ang, Math.atan(mus), 1e-9) && near(Math.tan(ang), fmax / N, 1e-9) && near(mag(Rv) / k, R, 1e-9), `angles: R drawn ${d1(deg(ang))}° from N, tan λ = ${d2(fmax / N)} = f max / N = μs; R = ${d1(mag(Rv) / k)} N = √(N² + f²)`);
  check(near(N, m * g, 1e-12) && near(fmax, mus * N, 1e-12) && near(k * fmax, 58.8, 1e-9), `angles: N = mg = ${d1(N)} N, f max = μs N = ${d1(fmax)} N, drawn ${d1(k * fmax)} px (scale ${k} px per N)`);
  return svgDoc(w, h, `A 10 kilogram block just about to slide under a pull of ${d1(fmax)} newtons, and the contact forces drawn separately: normal reaction ${d1(N)} newtons up, limiting friction ${d1(fmax)} newtons backward, and their resultant of ${d1(R)} newtons tilted from the normal by the angle of friction, ${d1(lam)} degrees, where the tangent of that angle is 0.5, the coefficient of static friction`, s);
})();

// ---------------------------------------------------------------- REPOSE: the same coefficient on a slope at the angle of repose
export const REPOSE_DATA = { m: 4, mus: 0.5, k: 2.4 };
REPOSE_DATA.alpha = deg(Math.atan(REPOSE_DATA.mus));
Object.assign(REPOSE_DATA, slope(REPOSE_DATA.m, REPOSE_DATA.alpha, REPOSE_DATA.mus));
export const REPOSE = (() => {
  const { m, mus, k, alpha, W, N, fric, along: wAlong } = REPOSE_DATA;
  const w = 420;
  const h = 290;
  const sc = slopeScene(alpha, { sC: 205 });
  let s = sc.s;
  const { C, along, nrm } = sc;
  s += arcAt(sc.Ax, sc.Ay, 70, alpha);
  s += S.text(sc.Ax + 76, sc.Ay - 4, `α = ${d1(alpha)}°`, { size: 11, w: 'bold' });
  const Wv = [0, k * W];
  const Nv = [k * N * nrm[0], k * N * nrm[1]];
  const fv = [k * fric * along[0], k * fric * along[1]];
  const Rv = [Nv[0] + fv[0], Nv[1] + fv[1]]; // resultant of N and the limiting friction
  s += S.circle(C[0], C[1], 3, { fill: 'currentColor' });
  s += vec(C[0], C[1], ...Rv, { c: RED, w: 2.6, dash: '5 3' });
  s += vec(C[0], C[1], ...Wv, { c: RED }) + vec(C[0], C[1], ...Nv, { c: GRN }) + vec(C[0], C[1], ...fv, { c: ACC });
  s += S.text(C[0] + 8, C[1] + Wv[1] * 0.6, `W = mg = ${d1(W)} N`, { size: 10, c: RED, w: 'bold' });
  s += S.text(C[0] + Nv[0] - 6, C[1] + Nv[1] - 4, `N = ${d1(N)} N`, { a: 'end', size: 10, c: GRN, w: 'bold' });
  {
    const Lp = [C[0] + 38 * along[0] - 34 * nrm[0], C[1] + 38 * along[1] - 34 * nrm[1]];
    s += S.lead(C[0] + fv[0] + 2, C[1] + fv[1] + 2, Lp[0] - 2, Lp[1] - 4);
    s += S.text(Lp[0], Lp[1], `f max = ${d1(fric)} N`, { size: 10, c: ACC, w: 'bold' });
  }
  s += S.text(C[0] - 8, C[1] + Rv[1] - 6, `R = ${d1(mag(Rv) / k)} N`, { a: 'end', size: 10, c: RED, w: 'bold' });
  s += S.text(30, 18, `Block of ${m} kg on the verge of sliding: α = λ`, { size: 11, w: 'bold' });
  s += S.text(30, 34, `μs = ${mus}. R (dashed) = N + f max balances the weight. Scale: ${k} px per N.`, { size: 10 });
  const angN = Math.atan2(Math.abs(Nv[0]), Math.abs(Nv[1]));
  const cosRN = (Rv[0] * Nv[0] + Rv[1] * Nv[1]) / (mag(Rv) * mag(Nv));
  const lam = Math.acos(cosRN);
  check(near(angN, rad(alpha), 1e-9) && near(lam, rad(alpha), 1e-9) && near(Math.tan(lam), mus, 1e-9), `repose: N drawn ${d1(deg(angN))}° from the vertical (= α), and R drawn ${d1(deg(lam))}° from N (= λ): α = λ = arctan ${mus} = ${d1(alpha)}°`);
  check(Math.abs(Rv[0]) < 1e-6 && near(-Rv[1], k * W, 1e-9) && near(fric, wAlong, 1e-9) && near(fric / N, mus, 1e-12), `repose: R vertical and ${d1(-Rv[1] / k)} N = mg; f max = mg sin α = ${d1(fric)} N and f max / N = ${mus}`);
  return svgDoc(w, h, `A block of 4 kilograms on a slope tilted to the angle of repose of ${d1(alpha)} degrees, where the coefficient of static friction is 0.5. The weight, the normal reaction and the limiting friction up the slope are drawn from the centre, and the resultant of the normal reaction and friction is a dashed vertical arrow equal and opposite to the weight. The angle between the normal reaction and that resultant, the angle of friction, equals the slope angle`, s);
})();

// ---------------------------------------------------------------- BEARING: ball bearing cross-section
export const BEARING_DATA = { Rsh: 22, Ri: 30, Ro: 70, Rout: 84, n: 7, cx: 120, cy: 120 };
BEARING_DATA.rb = (BEARING_DATA.Ro - BEARING_DATA.Ri) / 2;
BEARING_DATA.rc = (BEARING_DATA.Ro + BEARING_DATA.Ri) / 2;
export const BEARING = (() => {
  const { Rsh, Ri, Ro, Rout, n, cx, cy, rb, rc } = BEARING_DATA;
  const w = 420;
  const h = 245;
  let s = S.circle(cx, cy, Rout, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.5 });
  s += S.circle(cx, cy, Ro, { c: 'currentColor', fill: 'none', w: 1.5 });
  s += S.circle(cx, cy, Ri, { c: 'currentColor', fill: FILL, fop: 0.5, w: 1.5 });
  s += S.circle(cx, cy, Rsh, { c: MUT, fill: BLUE, fop: 0.25, w: 1.2 });
  const balls = [];
  for (let i = 0; i < n; i++) {
    const a = rad(-90 + (360 * i) / n);
    const bx = cx + rc * Math.cos(a);
    const by = cy + rc * Math.sin(a);
    balls.push([bx, by]);
    s += S.circle(bx, by, rb, { c: BLUE, fill: BLUE, fop: 0.3, w: 1.4 });
  }
  s += S.text(250, 30, 'Ball bearing (cross-section)', { size: 12, w: 'bold' });
  s += S.lines(250, 52, ['Steel balls roll between an inner', 'ring on the shaft and a fixed outer', 'ring. The shaft turns on rolling', 'contacts, not sliding ones.'], { size: 10, dy: 12 });
  s += S.lead(cx + Rout - 8, cy - 30, 262, 122);
  s += S.text(264, 126, 'outer ring (fixed)', { size: 10 });
  s += S.lead(balls[1][0] + 5, balls[1][1] + 5, 262, 148);
  s += S.text(264, 152, 'balls: rolling contact', { size: 10, c: BLUE, w: 'bold' });
  s += S.lead(cx + 6, cy + 6, 262, 174);
  s += S.text(264, 178, 'inner ring and shaft', { size: 10 });
  s += S.lines(250, 206, ['Rolling friction is far smaller', 'than sliding friction.'], { size: 10, dy: 12, w: 'bold' });
  const chord = 2 * rc * Math.sin(Math.PI / n);
  let tangent = true;
  balls.forEach(([bx, by]) => {
    const dist = Math.hypot(bx - cx, by - cy);
    if (!near(dist - rb, Ri, 1e-9) || !near(dist + rb, Ro, 1e-9)) tangent = false;
  });
  check(tangent && near(rb, 20, 1e-12) && near(rc, 50, 1e-12), `bearing: every ball (radius ${rb}) touches the inner ring (${Ri}) and the outer ring (${Ro}): centres at ${rc} from the axis`);
  check(chord > 2 * rb && balls.length === 7, `bearing: ${n} balls are ${d1(chord)} px apart (centre to centre), more than their diameter ${2 * rb}: none overlap`);
  return svgDoc(w, h, 'Cross-section of a ball bearing: seven steel balls between an outer ring and an inner ring on a shaft. Each ball touches both rings, so the shaft turns on rolling contacts instead of sliding ones', s);
})();

export const ALL = { CONTACT, SELFADJ, INCL_UP, INCL_DOWN, ROLLER, ANGLES, REPOSE, BEARING };
