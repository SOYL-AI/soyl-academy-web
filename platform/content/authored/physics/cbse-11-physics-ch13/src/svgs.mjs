// ch13 diagrams, all drawn from numbers with self-checks: the reference circle (SHM as the shadow of uniform circular motion),
// a block on a spring at three positions with the restoring force, a simple pendulum with the weight resolved along the string
// and the arc, and the split of the total energy between kinetic and potential at five displacements.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- REF: reference circle
export const REF_DATA = { cx: 104, cy: 128, R: 80, thDeg: 50, Lt: 44 };
export const REF = (() => {
  const { cx, cy, R, thDeg, Lt } = REF_DATA;
  const w = 420;
  const h = 262;
  const th = (thDeg * Math.PI) / 180;
  const P = [cx + R * Math.cos(th), cy - R * Math.sin(th)];
  const Q = [P[0], cy];
  let s = S.circle(cx, cy, R, { c: BLUE, w: 1.5, fill: FILL, fop: 0.15 });
  s += S.line(cx - R - 14, cy, cx + R + 14, cy, { w: 1.2 });
  s += S.text(cx - R - 4, cy + 16, '−A', { a: 'end', size: 10 }) + S.text(cx, cy + 16, 'O', { a: 'middle', size: 10 }) + S.text(cx + R + 4, cy + 16, '+A', { a: 'start', size: 10 });
  s += S.line(cx, cy, P[0], P[1], { c: BLUE, w: 1.6 });
  s += S.line(P[0], P[1], Q[0], Q[1], { c: MUT, w: 1.2, dash: '4 3' });
  s += S.path(`M${f1(cx + 24)} ${f1(cy)} A 24 24 0 0 0 ${f1(cx + 24 * Math.cos(th))} ${f1(cy - 24 * Math.sin(th))}`, { c: ACC, w: 1.4 });
  s += S.text(cx + 30, cy - 9, 'θ', { size: 11, c: ACC, w: 'bold' });
  s += S.circle(P[0], P[1], 5.5, { c: BLUE, fill: BLUE, fop: 0.5 }) + S.circle(Q[0], Q[1], 4.5, { c: GRN, fill: GRN, fop: 0.5 });
  s += S.text(P[0] + 8, P[1] - 4, 'P', { size: 11, w: 'bold', c: BLUE }) + S.text(Q[0] + 9, Q[1] + 16, 'Q', { size: 11, w: 'bold', c: GRN, a: 'start' });
  // velocity of P along the tangent (anticlockwise motion): screen direction (-sin, -cos)
  const tdir = [-Math.sin(th), -Math.cos(th)];
  const Pe = [P[0] + Lt * tdir[0], P[1] + Lt * tdir[1]];
  s += S.arrow(P[0], P[1], Pe[0], Pe[1], { c: RED, w: 1.8, size: 7 }) + S.text(Pe[0] - 4, Pe[1] - 6, 'v = Aω', { size: 10, c: RED, a: 'end' });
  // x-component of the velocity, drawn from Q along the diameter
  const Qe = [Q[0] + Lt * tdir[0], Q[1]];
  s += S.arrow(Q[0], Q[1] + 30, Qe[0], Q[1] + 30, { c: GRN, w: 1.8, size: 6 });
  s += S.text(Qe[0] - 4, Q[1] + 34, 'vx', { size: 10, c: GRN, a: 'end' });
  s += S.lines(224, 50, ['P moves on a circle of radius A', 'with constant angular speed ω;', 'the angle of OP is θ = ωt + φ.', 'Its foot Q has x = A cos(ωt + φ),', 'so Q performs SHM.'], { size: 10, dy: 15 });
  s += S.lines(224, 150, ['Velocity of P: Aω along the tangent.', 'Its x-component, the velocity of Q:', 'vx = −Aω sin(ωt + φ).', 'Q is at rest at ±A and fastest at O.'], { size: 10, dy: 15, c: RED });
  s += S.text(w / 2, h - 8, 'one turn of P = one oscillation of Q: ω = 2π / T', { a: 'middle', size: 10, c: MUT });
  // self-checks
  const OP = Math.hypot(P[0] - cx, P[1] - cy);
  const dth = 1e-6;
  const qx = (t) => cx + R * Math.cos(t);
  const dQ = (qx(th + dth) - qx(th - dth)) / (2 * dth); // pixels per radian of phase
  const arrowDx = Qe[0] - Q[0];
  const okDeriv = near(dQ / R, -Math.sin(th), 1e-6) && near(arrowDx / Lt, dQ / R, 1e-9) && arrowDx < 0;
  const okGeom = near(OP, R, 1e-9) && near(Q[0] - cx, R * Math.cos(th), 1e-9) && near(cy - P[1], R * Math.sin(th), 1e-9) && Q[1] === cy;
  const okTan = near((P[0] - cx) * tdir[0] + (P[1] - cy) * tdir[1], 0, 1e-9) && near(Math.hypot(...tdir), 1, 1e-12) && tdir[0] < 0;
  const pts = [P, Q, Pe, Qe];
  const okIn = pts.every(([a, b]) => a > 0 && a < w && b > 0 && b < h) && cx - R - 14 > 0;
  check(okGeom && okDeriv && okTan && okIn, `ref-circle: |OP| = A, Q = A cos(${thDeg}°) from O; the slope of Q against the phase is −A sin(phase) and the drawn x-component of the velocity (negative, length ∝ sin) matches it; the velocity of P is tangent to the circle and anticlockwise; all points inside the frame`);
  return svgDoc(w, h, 'The reference circle: a particle P moves uniformly on a circle of radius A with angular speed omega; its foot Q on a diameter performs simple harmonic motion with displacement x equal to A cos of omega t plus phi, and the x-component of the velocity of P is the velocity of Q', s);
})();

// ---------------------------------------------------------------- SPRING: block on a spring at -A, 0, +A
export const SPRING_DATA = { wallX: 22, xe: 160, d: 56, bw: 44, bh: 34, kpx: 0.6, rows: [-1, 0, 1], y0: 48, dy: 82 };
export const SPRING = (() => {
  const { wallX, xe, d, bw, bh, kpx, rows, y0, dy } = SPRING_DATA;
  const w = 420;
  const h = 268;
  let s = '';
  const info = [];
  rows.forEach((sg, i) => {
    const y = y0 + i * dy;
    const cxb = xe + sg * d;
    const left = cxb - bw / 2;
    // wall with hatching
    s += S.line(wallX, y - 24, wallX, y + 24, { w: 3 });
    for (let j = -3; j <= 3; j++) s += S.line(wallX, y + j * 7, wallX - 7, y + j * 7 + 6, { c: MUT, w: 1 });
    // spring: zigzag of 9 half-turns between the wall and the block
    const n = 9;
    const x1 = wallX;
    const x2 = left;
    let pth = `M${f1(x1)} ${f1(y)}`;
    for (let j = 1; j < n; j++) pth += ` L${f1(x1 + ((x2 - x1) * j) / n)} ${f1(y + (j % 2 ? -9 : 9))}`;
    pth += ` L${f1(x2)} ${f1(y)}`;
    s += S.path(pth, { c: BLUE, w: 1.6, join: 'round' });
    s += S.rect(left, y - bh / 2, bw, bh, { w: 1.6, fill: FILL, fop: 0.5 });
    s += S.text(cxb, y + 4, 'm', { a: 'middle', size: 11, w: 'bold' });
    // restoring force arrow above the block: F = -k x
    const Flen = kpx * d * Math.abs(sg);
    let tip = null;
    if (sg !== 0) {
      tip = cxb - sg * Flen;
      s += S.arrow(cxb, y - bh / 2 - 8, tip, y - bh / 2 - 8, { c: RED, w: 2, size: 7 });
    }
    const lab = sg === 0 ? ['x = 0', 'F = 0', 'speed: maximum'] : sg < 0 ? ['x = −A', 'F = +kA (to the right)', 'speed: zero'] : ['x = +A', 'F = −kA (to the left)', 'speed: zero'];
    s += S.text(266, y - 12, lab[0], { size: 11, w: 'bold' }) + S.text(266, y + 4, lab[1], { size: 10, c: RED }) + S.text(266, y + 18, lab[2], { size: 10, c: MUT });
    info.push({ sg, cxb, left, Flen, tip, springLen: x2 - x1, y });
  });
  const yTop = y0 - 36;
  const yBot = y0 + 2 * dy + 30;
  s += S.line(xe, yTop, xe, yBot, { c: ACC, w: 1.2, dash: '5 3' });
  s += S.text(xe, yBot + 14, 'O (mean position)', { a: 'middle', size: 10, c: ACC });
  // self-checks
  const [a, b, c] = info;
  const okDir = a.tip > a.cxb && c.tip < c.cxb && b.tip === null; // force opposes the displacement
  const okProp = near(a.Flen, c.Flen, 1e-12) && near(a.Flen / (d * 1), kpx, 1e-12);
  const okSpring = a.springLen < b.springLen && b.springLen < c.springLen && near(b.springLen - a.springLen, c.springLen - b.springLen, 1e-12);
  const okIn = info.every((r) => r.left > wallX && r.cxb + bw / 2 < 262 && r.y + 30 < h);
  check(okDir && okProp && okSpring && okIn, `spring: restoring force points back towards O at −A and +A (to the right and to the left), length ∝ |x| (${kpx} px per px, equal at ±A), none at O; spring is shorter at −A and longer at +A by equal steps (${f1(a.springLen)}, ${f1(b.springLen)}, ${f1(c.springLen)} px); blocks inside the frame`);
  return svgDoc(w, h, 'A block on a spring on a smooth table drawn at three positions: at minus A the spring is compressed and the force on the block is plus k A towards the mean position; at the mean position the force is zero and the speed is greatest; at plus A the spring is stretched and the force is minus k A towards the mean position', s);
})();

// ---------------------------------------------------------------- PENDULUM: weight resolved along the string and along the arc
export const PEND_DATA = { px: 130, py: 26, L: 168, thDeg: 28, W: 64, br: 11 };
export const PEND = (() => {
  const { px, py, L, thDeg, W, br } = PEND_DATA;
  const w = 420;
  const h = 272;
  const th = (thDeg * Math.PI) / 180;
  const u = [Math.sin(th), Math.cos(th)]; // pivot -> bob, screen coordinates
  const t = [-Math.cos(th), Math.sin(th)]; // along the arc towards the lowest point
  const B = [px + L * u[0], py + L * u[1]];
  let s = S.line(px - 46, py, px + 46, py, { w: 3 });
  for (let j = -4; j <= 4; j++) s += S.line(px + j * 10, py, px + j * 10 + 6, py - 7, { c: MUT, w: 1 });
  s += S.line(px, py, px, py + L + 30, { c: MUT, w: 1.2, dash: '5 3' });
  s += S.line(px, py, B[0], B[1], { w: 1.8 });
  s += S.path(`M${f1(px)} ${f1(py + 46)} A 46 46 0 0 0 ${f1(px + 46 * u[0])} ${f1(py + 46 * u[1])}`, { c: ACC, w: 1.4 });
  s += S.text(px + 8, py + 70, 'θ', { size: 12, c: ACC, w: 'bold' });
  // forces on the bob
  const Wt = [B[0], B[1] + W];
  const Tt = [B[0] - W * Math.cos(th) * u[0], B[1] - W * Math.cos(th) * u[1]];
  const Fs = [B[0] + W * Math.sin(th) * t[0], B[1] + W * Math.sin(th) * t[1]];
  const Rr = [B[0] + W * Math.cos(th) * u[0], B[1] + W * Math.cos(th) * u[1]];
  s += S.line(Wt[0], Wt[1], Fs[0], Fs[1], { c: MUT, w: 1, dash: '3 3' }) + S.line(Wt[0], Wt[1], Rr[0], Rr[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.circle(B[0], B[1], br, { c: BLUE, fill: BLUE, fop: 0.35, w: 1.6 });
  s += S.arrow(B[0], B[1], Wt[0], Wt[1] - 2, { c: BLUE, w: 2, size: 7 }) + S.text(Wt[0] + 6, Wt[1] + 4, 'mg', { size: 11, c: BLUE, w: 'bold' });
  s += S.arrow(B[0], B[1], Tt[0], Tt[1], { c: GRN, w: 2, size: 7 }) + S.text(Tt[0] + 10, Tt[1] + 2, 'T', { size: 11, c: GRN, w: 'bold' });
  s += S.arrow(B[0], B[1], Fs[0], Fs[1], { c: RED, w: 2, size: 7 }) + S.text(Fs[0] - 6, Fs[1] + 14, 'mg sin θ', { size: 10, c: RED, w: 'bold', a: 'end' });
  s += S.arrow(B[0], B[1], Rr[0], Rr[1], { c: MUT, w: 1.4, size: 6, dash: '4 2' }) + S.text(Rr[0] + 6, Rr[1] + 12, 'mg cos θ', { size: 10, c: MUT });
  s += S.text(px + L * 0.5 * u[0] - 8, py + L * 0.5 * u[1], 'L', { size: 11, a: 'end', w: 'bold' });
  s += S.lines(236, 40, ['Bob of mass m on a light string', 'of length L, displaced by θ.', 'Along the string: T balances mg cos θ.', 'Along the arc the restoring force is', 'F = −mg sin θ.', 'For small θ: sin θ ≈ θ = s / L, so', 'F ≈ −(mg / L) s: simple harmonic.'], { size: 10, dy: 15 });
  // self-checks
  const comp = (a, b) => a[0] * b[0] + a[1] * b[1];
  const sumX = (Fs[0] - B[0]) + (Rr[0] - B[0]);
  const sumY = (Fs[1] - B[1]) + (Rr[1] - B[1]);
  const okSum = near(sumX, Wt[0] - B[0], 1e-9) || Math.abs(sumX - (Wt[0] - B[0])) < 1e-9;
  const okSumY = near(sumY, Wt[1] - B[1], 1e-9);
  const okPerp = Math.abs(comp(t, u)) < 1e-12;
  const okLen = near(Math.hypot(B[0] - px, B[1] - py), L, 1e-12) && near(Math.hypot(Fs[0] - B[0], Fs[1] - B[1]), W * Math.sin(th), 1e-9) && near(Math.hypot(Tt[0] - B[0], Tt[1] - B[1]), W * Math.cos(th), 1e-9);
  const okToward = Fs[0] < B[0] && Fs[1] > B[1] && Tt[1] < B[1]; // arc force points down and towards the vertical through the pivot; tension points up the string
  const okSmall = Math.abs(Math.sin(th) - th) / th < 0.05;
  const okIn = [B, Wt, Tt, Fs, Rr].every(([a, b]) => a > 0 && a < w && b > 0 && b < h);
  check(okSum && okSumY && okPerp && okLen && okToward && okIn, `pendulum: mg sin θ along the arc and mg cos θ along the string add up to mg (components checked numerically at θ = ${thDeg}°), the two directions are perpendicular, tension balances mg cos θ (length ${f1(W * Math.cos(th))} px), the arc force points back towards the vertical; sin θ differs from θ by ${(((th - Math.sin(th)) / th) * 100).toFixed(1)}% at this angle${okSmall ? '' : ' (drawn large for clarity)'}`);
  return svgDoc(w, h, 'A simple pendulum displaced by an angle theta from the vertical: the weight m g is resolved into m g cos theta along the string, balanced by the tension, and m g sin theta along the arc towards the lowest point, which is the restoring force', s);
})();

// ---------------------------------------------------------------- EBARS: energy split at five displacements
export const EBARS_DATA = { xs: [-1, -0.5, 0, 0.5, 1], H: 130, base: 196, x0: 50, step: 72, bw: 44 };
export const EBARS = (() => {
  const { xs, H, base, x0, step, bw } = EBARS_DATA;
  const w = 420;
  const h = 244;
  let s = S.line(x0 - 16, base, x0 + 4 * step + bw + 16, base, { w: 1.2 });
  const rows = xs.map((q, i) => {
    const pe = H * q * q;
    const ke = H - pe;
    const bx = x0 + i * step;
    s += S.rect(bx, base - pe, bw, pe, { c: RED, fill: RED, fop: 0.35, w: 1.2 }) + S.rect(bx, base - H, bw, ke, { c: BLUE, fill: BLUE, fop: 0.3, w: 1.2 });
    if (pe > 14) s += S.text(bx + bw / 2, base - pe / 2 + 4, `${Math.round((pe / H) * 100)}%`, { a: 'middle', size: 10, c: RED, w: 'bold' });
    if (ke > 14) s += S.text(bx + bw / 2, base - pe - ke / 2 + 4, `${Math.round((ke / H) * 100)}%`, { a: 'middle', size: 10, c: BLUE, w: 'bold' });
    s += S.text(bx + bw / 2, base + 15, q === 0 ? 'x = 0' : `x = ${q < 0 ? '−' : ''}${Math.abs(q) === 1 ? 'A' : 'A/2'}`, { a: 'middle', size: 10 });
    return { q, pe, ke, bx };
  });
  s += S.line(x0 - 16, base - H, x0 + 4 * step + bw + 16, base - H, { c: ACC, w: 1.2, dash: '5 3' });
  s += S.text(x0 - 16, base - H - 6, 'total energy E = ½ k A² (the same at every position)', { size: 10, c: ACC });
  s += S.rect(60, 222, 12, 10, { c: RED, fill: RED, fop: 0.35 }) + S.text(76, 231, 'potential ½ k x²', { size: 10 }) + S.rect(190, 222, 12, 10, { c: BLUE, fill: BLUE, fop: 0.3 }) + S.text(206, 231, 'kinetic ½ k (A² − x²)', { size: 10 });
  const okSum = rows.every((r) => near(r.pe + r.ke, H, 1e-12));
  const okQuad = near(rows[1].pe / H, 0.25, 1e-12) && near(rows[0].pe / H, 1, 1e-12) && rows[2].pe === 0 && near(rows[3].pe, rows[1].pe, 1e-12) && near(rows[4].pe, rows[0].pe, 1e-12);
  const okIn = base - H - 10 > 0 && x0 + 4 * step + bw + 16 < w;
  check(okSum && okQuad && okIn, `energy-bars: kinetic + potential = E at all five positions; potential energy ∝ x² (100%, 25%, 0, 25%, 100% of E), symmetric about O`);
  return svgDoc(w, h, 'Bars showing how the constant total energy of an oscillating block is shared at five positions: at plus or minus A all of it is potential, at plus or minus A over 2 one quarter is potential and three quarters kinetic, and at the mean position all of it is kinetic', s);
})();

export const ALL = { REF, SPRING, PEND, EBARS };
