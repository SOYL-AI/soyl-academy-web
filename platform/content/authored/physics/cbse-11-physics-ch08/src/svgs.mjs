// ch08 diagrams, all drawn from numbers with self-checks: the four kinds of stress, shear strain, a loaded wire with its
// extension, the extension of three wires under one load, a cube under hydraulic pressure, and a bent beam with an I-section.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { Y, areaD, elongate, usci } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const net = (fs) => fs.reduce(([a, b], [x1, y1, x2, y2]) => [a + (x2 - x1), b + (y2 - y1)], [0, 0]);
const near0 = (v) => Math.abs(v) < 1e-9;

// ---------------------------------------------------------------- STRESS: tensile, compressive, shear and hydraulic stress
export const STRESS = (() => {
  const w = 420;
  const h = 250;
  let s = '';
  const arrows = (list, c) => list.map(([x1, y1, x2, y2]) => S.arrow(x1, y1, x2, y2, { c, w: 2, size: 7 })).join('');
  // panel 1: tension (rod pulled at both ends)
  const t = { x: 44, y: 50, w: 120, h: 22 };
  const tF = [[t.x - 4, t.y + 11, t.x - 34, t.y + 11], [t.x + t.w + 4, t.y + 11, t.x + t.w + 34, t.y + 11]];
  s += S.rect(t.x, t.y, t.w, t.h, { fill: FILL }) + arrows(tF, RED);
  s += S.text(t.x + t.w / 2, t.y + 46, 'tensile stress: rod stretched', { a: 'middle', size: 10, w: 'bold' }) + S.text(t.x + t.w / 2, t.y + 59, 'strain = ΔL / L', { a: 'middle', size: 10, c: MUT });
  check(near0(net(tF)[0]) && tF[0][2] < t.x && tF[1][2] > t.x + t.w, 'stress: tensile forces are equal and opposite and point away from the rod');
  // panel 2: compression (pillar pressed at both ends)
  const c = { x: 295, y: 22, w: 30, h: 70 };
  const cF = [[c.x + c.w / 2, c.y - 16, c.x + c.w / 2, c.y - 2], [c.x + c.w / 2, c.y + c.h + 16, c.x + c.w / 2, c.y + c.h + 2]];
  s += S.rect(c.x, c.y, c.w, c.h, { fill: FILL }) + arrows(cF, BLUE);
  s += S.text(c.x + c.w / 2, c.y + c.h + 34, 'compressive stress: pillar squeezed', { a: 'middle', size: 10, w: 'bold' });
  check(near0(net(cF)[1]) && cF[0][3] < c.y + 1 && cF[1][3] > c.y + c.h - 1 && cF[0][1] < cF[0][3] && cF[1][1] > cF[1][3], 'stress: compressive forces are equal and opposite and point into the pillar');
  // panel 3: shear (tangential forces on the top and bottom faces)
  const sh = { x: 44, y: 158, w: 90, h: 50 };
  const shF = [[sh.x + 6, sh.y - 5, sh.x + 56, sh.y - 5], [sh.x + sh.w - 6, sh.y + sh.h + 5, sh.x + sh.w - 56, sh.y + sh.h + 5]];
  s += S.rect(sh.x, sh.y, sh.w, sh.h, { fill: FILL }) + arrows(shF, GRN);
  s += S.text(sh.x + sh.w / 2, sh.y + sh.h + 30, 'shear stress: forces along the faces', { a: 'middle', size: 10, w: 'bold' });
  check(near0(net(shF)[0]) && shF[0][1] === shF[0][3] && shF[1][1] === shF[1][3] && Math.sign(shF[0][2] - shF[0][0]) === -Math.sign(shF[1][2] - shF[1][0]) && shF[0][3] < sh.y && shF[1][3] > sh.y + sh.h, 'stress: shear forces are parallel to the faces, equal and opposite');
  // panel 4: hydraulic (pressure on every face)
  const hy = { x: 280, y: 156, w: 50, h: 50 };
  const cx = hy.x + hy.w / 2;
  const cy = hy.y + hy.h / 2;
  const hF = [[cx, hy.y - 22, cx, hy.y - 2], [cx, hy.y + hy.h + 22, cx, hy.y + hy.h + 2], [hy.x - 22, cy, hy.x - 2, cy], [hy.x + hy.w + 22, cy, hy.x + hy.w + 2, cy]];
  s += S.rect(hy.x, hy.y, hy.w, hy.h, { fill: FILL }) + arrows(hF, ACC);
  s += S.text(cx, hy.y + hy.h + 37, 'hydraulic stress: pressure p on all faces', { a: 'middle', size: 10, w: 'bold' });
  const lens = hF.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1));
  check(near0(net(hF)[0]) && near0(net(hF)[1]) && lens.every((l) => near(l, lens[0], 1e-9)), 'stress: the four pressure arrows have equal length and cancel in pairs');
  return svgDoc(w, h, 'Four kinds of stress: a rod pulled at both ends (tensile), a pillar squeezed at both ends (compressive), a block with equal and opposite forces along its top and bottom faces (shear) and a block with pressure on every face (hydraulic)', s);
})();

// ---------------------------------------------------------------- SHEAR: shear strain = dx / h = tan(theta)
export const SHEAR_DATA = { w: 120, h: 90, dx: 20 };
export const SHEAR = (() => {
  const { w: bw, h: bh, dx } = SHEAR_DATA;
  const w = 420;
  const h = 220;
  const x0 = 70;
  const yb = 170;
  const yt = yb - bh;
  let s = '';
  // fixed base with hatching
  s += S.line(x0 - 20, yb, x0 + bw + 40, yb, { w: 2 });
  for (let x = x0 - 20; x < x0 + bw + 40; x += 10) s += S.line(x, yb, x - 8, yb + 9, { c: MUT, w: 1 });
  s += S.text(x0 - 20, yb + 26, 'fixed base', { size: 10, c: MUT });
  // undeformed block (dashed) and sheared block
  s += S.rect(x0, yt, bw, bh, { c: MUT, dash: '4 3', sw: 1.2 });
  s += S.path(`M${x0} ${yb} L${x0 + bw} ${yb} L${x0 + bw + dx} ${yt} L${x0 + dx} ${yt} Z`, { c: BLUE, fill: BLUE, fop: 0.18, w: 2 });
  // applied force on the top face
  s += S.arrow(x0 + dx + 10, yt - 22, x0 + dx + 75, yt - 22, { c: RED, w: 2.4 }) + S.text(x0 + dx + 82, yt - 18, 'F (along the face)', { size: 10, c: RED });
  // dimension lines
  s += S.line(x0, yt - 6, x0 + dx, yt - 6, { c: GRN, w: 1.6 }) + S.text(x0 + dx / 2, yt - 12, 'Δx', { a: 'middle', size: 11, c: GRN, w: 'bold' });
  s += S.line(x0 - 14, yt, x0 - 14, yb, { c: MUT, w: 1 }) + S.text(x0 - 18, (yt + yb) / 2 + 4, 'h', { a: 'end', size: 11, w: 'bold' });
  // angle theta at the lower left corner: the left edge runs from (x0, yb) to (x0 + dx, yt) and leans by theta from the vertical
  const th = Math.atan2(dx, bh);
  const rr = 34;
  s += S.path(`M${f1(x0)} ${f1(yb - rr)} A${rr} ${rr} 0 0 1 ${f1(x0 + rr * Math.sin(th))} ${f1(yb - rr * Math.cos(th))}`, { c: ACC, w: 1.6 });
  s += S.text(x0 + 6, yb - rr - 4, 'θ', { size: 12, c: ACC, w: 'bold' });
  s += S.lines(x0 + bw + dx + 14, yt + 8, ['shear strain', 'θ ≈ tan θ = Δx / h', `Δx / h = ${f1(dx)} / ${f1(bh)} = ${(dx / bh).toFixed(3)}`, '(drawn about 100 times', 'larger than in metals)'], { size: 10, dy: 14 });
  check(near(Math.tan(th), dx / bh, 1e-12) && near(dx / bh, 20 / 90, 1e-9), `shear: the drawn edge leans by θ with tan θ = Δx/h = ${(dx / bh).toFixed(3)} (θ = ${th.toFixed(3)} rad); the base stays fixed and the top face moves along its own plane`);
  return svgDoc(w, h, 'A block fixed at its base with a force F along its top face: the top face slides sideways by a distance delta x, the vertical edges tilt through the angle theta, and the shear strain is delta x over h, which is the tangent of theta', s);
})();

// ---------------------------------------------------------------- WIRE: a loaded wire and its (exaggerated) extension
export const WIRE_DATA = { L: 2.5, d: 1.6e-3, F: 150, dL: 0.8e-3, px: 40, exag: 300 };
export const WIRE = (() => {
  const { L, F, dL, px, exag } = WIRE_DATA;
  const w = 420;
  const h = 250;
  const xw = 90;
  const y0 = 36;
  const Lpx = L * px;
  const dLpx = dL * px * exag;
  let s = S.line(xw - 50, y0, xw + 50, y0, { w: 3 });
  for (let x = xw - 50; x < xw + 50; x += 10) s += S.line(x, y0, x + 8, y0 - 9, { c: MUT, w: 1 });
  s += S.line(xw, y0, xw, y0 + Lpx + dLpx, { w: 2 });
  s += S.line(xw - 14, y0 + Lpx, xw + 14, y0 + Lpx, { c: MUT, w: 1.2, dash: '3 3' });
  s += S.rect(xw - 22, y0 + Lpx + dLpx, 44, 26, { fill: ACC, fop: 0.35, c: ACC });
  s += S.text(xw, y0 + Lpx + dLpx + 17, `${F} N`, { a: 'middle', size: 11, w: 'bold' });
  // length and extension marks
  s += S.line(xw + 56, y0, xw + 56, y0 + Lpx, { c: BLUE, w: 1.5 }) + S.text(xw + 64, y0 + Lpx / 2 + 4, `original length L = ${L} m`, { size: 10, c: BLUE });
  s += S.line(xw + 40, y0 + Lpx, xw + 40, y0 + Lpx + dLpx, { c: RED, w: 3 }) + S.text(xw + 64, y0 + Lpx + dLpx / 2 + 14, `extension ΔL = ${dL * 1000} mm`, { size: 10, c: RED }) + S.text(xw + 64, y0 + Lpx + dLpx / 2 + 27, `(drawn ${exag} times too large)`, { size: 10, c: RED });
  s += S.text(xw + 64, y0 + Lpx + dLpx + 52, 'stress = F / A  (A = π d² / 4)', { size: 10 }) + S.text(xw + 64, y0 + Lpx + dLpx + 66, 'strain = ΔL / L', { size: 10 });
  check(near(dLpx / Lpx, exag * (dL / L), 1e-9) && dLpx < 40, `wire: extension ${dL * 1000} mm on ${L} m is drawn ${exag} times too large (${f1(dLpx)} px on ${f1(Lpx)} px); the load hangs from the lower end`);
  return svgDoc(w, h, 'A steel wire clamped at the top and carrying a load of 150 newtons: the original length is 2.5 metres and the extension, 0.8 millimetres, is drawn about 300 times too large so that it can be seen', s);
})();

// ---------------------------------------------------------------- YWIRES: three metals, same wire, same load
export const YWIRES_DATA = { F: 200, L: 2.0, d: 1.0e-3, pxPerMm: 22, metals: [['steel', Y.steel], ['brass', Y.brass], ['aluminium', Y.aluminium]] };
export const YWIRES = (() => {
  const { F, L, d, pxPerMm, metals } = YWIRES_DATA;
  const A = areaD(d);
  const w = 420;
  const h = 200;
  const x0 = 96;
  const rows = metals.map(([name, Ym], i) => ({ name, Ym, dL: elongate(F, L, A, Ym) * 1000, y: 40 + i * 44 }));
  let s = S.text(x0, 18, 'extension of the same wire under the same load', { size: 11, w: 'bold' });
  s += S.line(x0, 28, x0, 28 + rows.length * 44, { w: 1.5 });
  for (const r of rows) {
    s += S.text(x0 - 8, r.y + 16, r.name, { a: 'end', size: 11, w: 'bold' });
    s += S.rect(x0, r.y, r.dL * pxPerMm, 24, { c: BLUE, fill: BLUE, fop: 0.3 });
    s += S.text(x0 + r.dL * pxPerMm + 6, r.y + 11, `${r.dL.toFixed(2)} mm`, { size: 10, w: 'bold' }) + S.text(x0 + r.dL * pxPerMm + 6, r.y + 23, `Y = ${usci(r.Ym, 2)} Pa`, { size: 10, c: MUT });
  }
  s += S.text(w - 4, h - 6, `each wire: L = ${L} m, diameter ${d * 1000} mm, load ${F} N; 1 mm = ${pxPerMm} px`, { a: 'end', size: 10, c: MUT });
  const prod = rows.map((r) => r.dL * r.Ym);
  const okY = prod.every((p) => near(p, prod[0], 1e-9));
  const okPx = near((rows[2].dL * pxPerMm) / (rows[0].dL * pxPerMm), Y.steel / Y.aluminium, 1e-9);
  const okW = rows.every((r) => 96 + r.dL * pxPerMm + 100 < w);
  check(okY && okPx && okW && rows[0].dL < rows[1].dL && rows[1].dL < rows[2].dL, `ywires: extension × Y is the same for all three metals (F L / A); bar lengths are in the ratio 1/Y (steel ${rows[0].dL.toFixed(2)}, brass ${rows[1].dL.toFixed(2)}, aluminium ${rows[2].dL.toFixed(2)} mm)`);
  return svgDoc(w, h, `Bar chart of the extension of identical wires of steel, brass and aluminium under the same ${F} newton load: steel stretches ${rows[0].dL.toFixed(2)} millimetres, brass ${rows[1].dL.toFixed(2)} millimetres and aluminium ${rows[2].dL.toFixed(2)} millimetres, so the larger the Young modulus the smaller the extension`, s);
})();

// ---------------------------------------------------------------- BULK: a cube under all-round pressure
export const BULK_DATA = { s0: 86, dV: 0.12 };
export const BULK = (() => {
  const { s0, dV } = BULK_DATA;
  const s1 = s0 * Math.cbrt(1 - dV);
  const w = 420;
  const h = 230;
  const cube = (x, y, side, c) => {
    const o = 0.32 * side;
    let g = S.rect(x + o, y - o, side, side, { c, sw: 1.2 }) + S.rect(x, y, side, side, { c, fill: c, fop: 0.18, sw: 2 });
    g += S.line(x, y, x + o, y - o, { c, w: 1.2 }) + S.line(x + side, y, x + side + o, y - o, { c, w: 1.2 }) + S.line(x, y + side, x + o, y + side - o, { c, w: 1.2 }) + S.line(x + side, y + side, x + side + o, y + side - o, { c, w: 1.2 });
    return g;
  };
  const cx0 = 40;
  const cy0 = 70;
  let s = cube(cx0, cy0, s0, MUT) + S.text(cx0 + s0 / 2 + 14, cy0 + s0 + 28, 'before: volume V', { a: 'middle', size: 11, w: 'bold' });
  const x1 = 250;
  const y1 = cy0 + (s0 - s1) / 2;
  s += cube(x1, y1, s1, BLUE) + S.text(x1 + s1 / 2 + 14, cy0 + s0 + 28, 'after: volume V − ΔV', { a: 'middle', size: 11, w: 'bold' });
  // pressure arrows on the left, top and front of the squeezed cube
  const ym = y1 + s1 / 2;
  s += S.arrow(x1 - 34, ym, x1 - 4, ym, { c: ACC, w: 2.2 }) + S.arrow(x1 + s1 / 2, y1 - 40, x1 + s1 / 2, y1 - 4, { c: ACC, w: 2.2 }) + S.arrow(x1 + s1 + 40, y1 + s1 + 22, x1 + s1 + 8, y1 + s1 + 6, { c: ACC, w: 2.2 });
  s += S.text(x1 - 38, ym - 6, 'p', { a: 'end', size: 12, c: ACC, w: 'bold' });
  s += S.arrow(cx0 + s0 + 44, cy0 + s0 / 2, x1 - 56, cy0 + s0 / 2, { c: MUT, w: 1.6 }) + S.text((cx0 + s0 + x1) / 2 - 6, cy0 + s0 / 2 - 8, 'pressure', { a: 'middle', size: 10, c: MUT });
  s += S.text(w / 2, 16, `volume strain ΔV / V = ${dV} (drawn about 100 times larger than in a solid)`, { a: 'middle', size: 10 });
  s += S.text(w / 2, h - 4, 'B = − p / (ΔV / V): the shape stays the same, only the volume changes', { a: 'middle', size: 10, c: MUT });
  check(near((s1 / s0) ** 3, 1 - dV, 1e-12) && s1 < s0, `bulk: the squeezed cube has side ${f1(s1)} px against ${s0} px, so its volume ratio is ${((s1 / s0) ** 3).toFixed(3)} = 1 − ΔV/V; the shape is unchanged (cube)`);
  return svgDoc(w, h, 'A cube before and after being squeezed by the same pressure on every face: it stays a cube but its volume falls by a fraction delta V over V', s);
})();

// ---------------------------------------------------------------- BEAM: a bent beam and an I-shaped section
export const BEAM_DATA = { L: 200, R: 520, d: 38 };
export const BEAM = (() => {
  const { L, R, d } = BEAM_DATA;
  const phi = L / R;
  const w = 420;
  const h = 250;
  const cx = 120;
  const ym = 100;
  const Cy = ym - R; // centre of curvature above the beam (the beam sags)
  const pt = (rho, a) => [cx + rho * Math.sin(a), Cy + rho * Math.cos(a)];
  const N = 40;
  const arc = (rho) => Array.from({ length: N + 1 }, (_, k) => pt(rho, -phi / 2 + (phi * k) / N));
  const top = arc(R - d / 2);
  const mid = arc(R);
  const bot = arc(R + d / 2);
  const len = (a) => a.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - a[i][0], p[1] - a[i][1]), 0);
  const poly = (a) => a.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join(' ');
  let s = S.path(`${poly(top)} ${poly(bot.slice().reverse()).replace('M', 'L')} Z`, { c: BLUE, fill: BLUE, fop: 0.2, w: 2 });
  s += S.path(poly(mid), { c: MUT, w: 1.4, dash: '5 3' });
  // supports and load
  const [xl, yl] = bot[0];
  const [xr, yr] = bot[N];
  s += S.path(`M${f1(xl)} ${f1(yl + 2)} l-9 15 h18 Z`, { fill: FILL }) + S.path(`M${f1(xr)} ${f1(yr + 2)} l-9 15 h18 Z`, { fill: FILL });
  const yTopMid = top[N / 2][1];
  s += S.arrow(cx, yTopMid - 44, cx, yTopMid - 3, { c: RED, w: 2.4 }) + S.text(cx + 8, yTopMid - 28, 'load', { size: 10, c: RED });
  s += S.text(cx, ym + d / 2 + 38, 'top layers: shorter, compressed', { a: 'middle', size: 10, c: BLUE });
  s += S.text(cx, ym + d / 2 + 52, 'bottom layers: longer, stretched', { a: 'middle', size: 10, c: RED });
  s += S.text(cx, ym + d / 2 + 66, 'dashed middle layer: same length', { a: 'middle', size: 10, c: MUT });
  // I-section on the right
  const ix = 330;
  const iy = 70;
  const fw = 74;
  const ft = 12;
  const web = 12;
  const ih = 96;
  s += S.path(`M${ix - fw / 2} ${iy} h${fw} v${ft} h${-(fw - web) / 2} v${ih - 2 * ft} h${(fw - web) / 2} v${ft} h${-fw} v${-ft} h${(fw - web) / 2} v${-(ih - 2 * ft)} h${-(fw - web) / 2} Z`, { c: BLUE, fill: BLUE, fop: 0.25, w: 2 });
  s += S.line(ix - fw / 2 - 8, iy + ih / 2, ix + fw / 2 + 8, iy + ih / 2, { c: MUT, w: 1.2, dash: '5 3' });
  s += S.text(ix, iy - 10, 'I-shaped section', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(ix, iy + ih + 20, 'most material far from the', { a: 'middle', size: 10 }) + S.text(ix, iy + ih + 33, 'middle layer, where stress is', { a: 'middle', size: 10 }) + S.text(ix, iy + ih + 46, 'largest', { a: 'middle', size: 10 });
  const Ltop = len(top);
  const Lmid = len(mid);
  const Lbot = len(bot);
  const eTop = (Ltop - L) / L;
  const eBot = (Lbot - L) / L;
  check(Ltop < Lmid && Lmid < Lbot && near(Lmid, L, 1e-3) && near(eTop, -(d / 2) / R, 5e-3) && near(eBot, (d / 2) / R, 5e-3), `beam: top fibre ${Ltop.toFixed(1)} < middle ${Lmid.toFixed(1)} (= ${L}) < bottom ${Lbot.toFixed(1)} px; surface strains ±${((d / 2) / R).toFixed(4)} = ±(d/2)/R`);
  const flangeArm = (ih - ft) / 2; // centre of a flange from the middle layer
  check(flangeArm > web && flangeArm > ih / 4, `beam: each flange of the I-section lies ${flangeArm} px from the middle layer, more than half the section's half-depth (${ih / 2} px), so the flanges carry most of the bending stress`);
  return svgDoc(w, h, 'A beam resting on two supports and bent by a central load: the top layers are compressed and become shorter, the bottom layers are stretched and become longer, and a middle layer keeps its length; beside it an I-shaped cross-section with most of the material in the top and bottom flanges', s);
})();

export const ALL = { STRESS, SHEAR, WIRE, YWIRES, BULK, BEAM };
