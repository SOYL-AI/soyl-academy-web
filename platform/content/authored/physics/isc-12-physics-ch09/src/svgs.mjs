// ISC ch09 diagrams: field lines of a bar magnet and of its equivalent solenoid (traced numerically from the solenoid's
// circular turns; copied and adapted from cbse-12-physics-ch05/src/svgs.mjs), electric-dipole lines beside bar-magnet
// lines, end-on and broadside-on points of a magnet with the field drawn to the computed ratio, the torque on a magnet
// in a uniform field, flux through a face-on and a tilted surface, dia-, para- and ferromagnetic samples in a uniform
// field (exact solution for a cylinder, copied from the CBSE chapter), domains, an electromagnet, and B–H loops.
// Screen coordinates: x right, y down, z INTO the page (x × y = z), so "out of the page" is −z. Every direction,
// ratio and loop feature drawn is computed here and compared with the drawing (SELF_CHECKS, read by build.mjs).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const pathOf = (pts, every = 3) => 'M' + pts.filter((_, i) => i % every === 0 || i === pts.length - 1).map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');

/** ⊙ (out of the page) or ⊗ (into the page) of radius r. */
function dirSym(x, y, out, { c = 'currentColor', r = 7 } = {}) {
  let s = S.circle(x, y, r, { c, sw: 1.5, fill: FILL });
  if (out) s += S.circle(x, y, 2, { c, fill: c });
  else s += S.line(x - r * 0.7, y - r * 0.7, x + r * 0.7, y + r * 0.7, { c, w: 1.3 }) + S.line(x - r * 0.7, y + r * 0.7, x + r * 0.7, y - r * 0.7, { c, w: 1.3 });
  return s;
}

// ---------------------------------------------------------------- field of a short solenoid (circular turns), in the plane z = 0
// Element of a turn at (xr, cy + rad cos φ, rad sin φ) with dl ∝ (0, −sin φ, cos φ): out of the page (−z) at the top.
function ringField({ cx, cy, half, rad, nRing, avoidR = 1.2 }) {
  const rings = Array.from({ length: nRing }, (_, i) => cx - half + ((i + 0.5) * 2 * half) / nRing);
  const PH = Array.from({ length: 36 }, (_, j) => (j * 2 * Math.PI) / 36);
  const field = (x, y) => {
    let bx = 0;
    let by = 0;
    for (const xr of rings)
      for (const ph of PH) {
        const ex = x - xr;
        const ey = y - (cy + rad * Math.cos(ph));
        const ez = -rad * Math.sin(ph);
        const d3 = Math.hypot(ex, ey, ez) ** 3;
        const ly = -Math.sin(ph);
        const lz = Math.cos(ph);
        bx += (ly * ez - lz * ey) / d3;
        by += (lz * ex) / d3;
      }
    return [bx, by];
  };
  const nearTurn = (x, y) => rings.some((xr) => Math.hypot(x - xr, y - (cy - rad)) < avoidR || Math.hypot(x - xr, y - (cy + rad)) < avoidR);
  return { field, rings, nearTurn };
}
/** RK4 trace along the unit field from (x0, y0); returns the points and whether the line closed on itself. */
function traceClosed(field, x0, y0, { bounds, step = 1.5, max = 3000, avoid }) {
  const [xa, ya, xb, yb] = bounds;
  const unit = (x, y, sg) => {
    const [bx, by] = field(x, y);
    const m = Math.hypot(bx, by) || 1;
    return [(sg * bx) / m, (sg * by) / m];
  };
  const run = (sg) => {
    let x = x0;
    let y = y0;
    const pts = [];
    for (let k = 0; k < max; k++) {
      const k1 = unit(x, y, sg);
      const k2 = unit(x + (step * k1[0]) / 2, y + (step * k1[1]) / 2, sg);
      const k3 = unit(x + (step * k2[0]) / 2, y + (step * k2[1]) / 2, sg);
      const k4 = unit(x + step * k3[0], y + step * k3[1], sg);
      x += (step * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])) / 6;
      y += (step * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])) / 6;
      pts.push([x, y]);
      if (k > 30 && Math.hypot(x - x0, y - y0) < step * 1.2) return { pts, closed: true };
      if (x < xa || y < ya || x > xb || y > yb) return { pts, closed: false };
      if (avoid && avoid(x, y)) return { pts, closed: false };
    }
    return { pts, closed: false };
  };
  const a = run(1);
  if (a.closed) return { pts: [[x0, y0], ...a.pts], closed: true };
  const b = run(-1);
  return { pts: [...b.pts.reverse(), [x0, y0], ...a.pts], closed: false };
}

// ---------------------------------------------------------------- 1, 2. bar magnet and its equivalent solenoid
function barFigure({ asSolenoid, label }) {
  const w = 440;
  const h = 300;
  const cx = 220;
  const cy = 150;
  const half = 80;
  const rad = 20;
  const { field, rings, nearTurn } = ringField({ cx, cy, half, rad, nRing: 16 });
  let s = S.line(0, cy, w, cy, { c: MUT, w: 1.2, dash: '4 4' });
  let closed = 0;
  let arrowsOk = 0;
  const seeds = [-36, -50, -70, -100, 36, 50, 70, 100].map((dy) => [cx, cy + dy]);
  for (const [x0, y0] of seeds) {
    const t = traceClosed(field, x0, y0, { bounds: [-40, -40, w + 40, h + 40], avoid: nearTurn });
    if (t.closed) closed++;
    s += S.path(pathOf(t.pts), { c: MUT, w: 1.2 });
    const [bx, by] = field(x0, y0);
    s += S.head(x0, y0, Math.atan2(by, bx), { c: ACC, size: 7 });
    if (bx < 0) arrowsOk++;
  }
  const [bxIn] = field(cx, cy);
  const [bxOut] = field(cx, cy - 90);
  const tag = asSolenoid ? 'solenoid' : 'bar magnet';
  check(bxIn > 0, `${tag}: inside, B points from the S end to the N end (left to right), along m`);
  check(bxOut < 0, `${tag}: outside, above the middle, B points back from N towards S`);
  check(closed >= 4 && arrowsOk === seeds.length, `${tag}: ${closed} of ${seeds.length} traced lines close inside the canvas; ${arrowsOk} outside arrows all point N → S`);
  s += S.head(cx + 40, cy, 0, { c: ACC, size: 7 });
  if (asSolenoid) {
    for (const xr of rings) {
      s += S.circle(xr, cy - rad, 4, { c: POS, sw: 1.3, fill: FILL }) + S.circle(xr, cy - rad, 1.4, { c: POS, fill: POS });
      s += S.circle(xr, cy + rad, 4, { c: NEG, sw: 1.3, fill: FILL }) + S.line(xr - 2.5, cy + rad - 2.5, xr + 2.5, cy + rad + 2.5, { c: NEG, w: 1 }) + S.line(xr - 2.5, cy + rad + 2.5, xr + 2.5, cy + rad - 2.5, { c: NEG, w: 1 });
    }
    // current out of the page at the top and into it at the bottom: m = Σ r × dl points along +x
    const m = cross([0, -rad, 0], [0, 0, -1]);
    check(m[0] > 0, 'solenoid: current out of the page at the top of each turn gives m to the right, so the right end is N');
    s += S.text(14, 20, 'current-carrying solenoid', { size: 11, w: 'bold' });
    s += S.text(cx + half + 12, cy + 5, 'N', { w: 'bold', size: 13 }) + S.text(cx - half - 12, cy + 5, 'S', { a: 'end', w: 'bold', size: 13 });
  } else {
    s += S.rect(cx - half, cy - rad, half, 2 * rad, { c: NEG, sw: 1.5, fill: NEG, fop: 0.18 }) + S.rect(cx, cy - rad, half, 2 * rad, { c: POS, sw: 1.5, fill: POS, fop: 0.18 });
    s += S.text(cx - half / 2, cy + 5, 'S', { a: 'middle', w: 'bold', size: 14 }) + S.text(cx + half / 2, cy + 5, 'N', { a: 'middle', w: 'bold', size: 14 });
    s += S.text(14, 20, 'bar magnet', { size: 11, w: 'bold' });
  }
  s += S.text(w - 12, h - 10, 'inside: S → N, along m', { a: 'end', size: 11 });
  return svgDoc(w, h, label, s);
}
export const BAR = barFigure({ asSolenoid: false, label: 'Field lines of a bar magnet: closed loops that leave the north pole, curve round outside to the south pole, and continue inside the magnet from south to north, along its magnetic moment' });
export const SOLENOID = barFigure({ asSolenoid: true, label: 'Field lines of a short current-carrying solenoid, with current out of the page at the top of each turn and into it at the bottom: the same closed-loop pattern as a bar magnet, the right-hand end acting as a north pole' });

// ---------------------------------------------------------------- 3. electric dipole beside a bar magnet
export const E_VS_B = (() => {
  const w = 460;
  const h = 250;
  let s = '';
  // left panel: −q on the left, +q on the right, so p (from −q to +q) points to the right
  const ch = [
    { x: 75, y: 125, q: -1 },
    { x: 150, y: 125, q: 1 },
  ];
  const E = (x, y) => {
    let ex = 0;
    let ey = 0;
    for (const c of ch) {
      const dx = x - c.x;
      const dy = y - c.y;
      const r3 = Math.hypot(dx, dy) ** 3;
      ex += (c.q * dx) / r3;
      ey += (c.q * dy) / r3;
    }
    return [ex, ey];
  };
  const unit = (x, y) => {
    const [ex, ey] = E(x, y);
    const m = Math.hypot(ex, ey) || 1;
    return [ex / m, ey / m];
  };
  let ended = 0;
  let arrows = 0;
  let arrowsOk = 0;
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = ((i + 0.5) * 2 * Math.PI) / n;
    let x = 150 + 12 * Math.cos(a);
    let y = 125 + 12 * Math.sin(a);
    const pts = [[x, y]];
    let hit = false;
    const step = 1.5;
    for (let k = 0; k < 1500; k++) {
      const k1 = unit(x, y);
      const k2 = unit(x + (step / 2) * k1[0], y + (step / 2) * k1[1]);
      const k3 = unit(x + (step / 2) * k2[0], y + (step / 2) * k2[1]);
      const k4 = unit(x + step * k3[0], y + step * k3[1]);
      x += (step / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      y += (step / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      pts.push([x, y]);
      if (Math.hypot(x - 75, y - 125) < 11) {
        hit = true;
        break;
      }
      if (x < 4 || x > 222 || y < 28 || y > h - 4) break;
    }
    if (hit) ended++;
    s += S.path(pathOf(pts, 4), { c: MUT, w: 1.2 });
    const idx = Math.floor(pts.length * 0.4);
    if (idx + 2 < pts.length) {
      const [x1, y1] = pts[idx];
      const [x2, y2] = pts[idx + 2];
      const ang = Math.atan2(y2 - y1, x2 - x1);
      const [ex, ey] = E(x1, y1);
      arrows++;
      if (Math.cos(ang) * ex + Math.sin(ang) * ey > 0) arrowsOk++;
      s += S.head(x2, y2, ang, { c: ACC, size: 7 });
    }
  }
  check(ended >= 6, `E vs B: ${ended} of ${n} electric lines from +q end on −q (none closes)`);
  check(arrows > 0 && arrowsOk === arrows, `E vs B: ${arrowsOk} of ${arrows} electric-line arrows point along E`);
  const [exMid] = E(112.5, 125);
  check(exMid < 0, 'E vs B: midway between the charges E points from +q to −q, opposite to p');
  for (const c of ch) {
    const col = c.q > 0 ? POS : NEG;
    s += S.circle(c.x, c.y, 10, { c: col, fill: col, fop: 0.18 }) + S.line(c.x - 5, c.y, c.x + 5, c.y, { c: col, w: 2 });
    if (c.q > 0) s += S.line(c.x, c.y - 5, c.x, c.y + 5, { c: col, w: 2 });
  }
  s += S.arrow(90, 232, 135, 232, { c: GRN, w: 2 }) + S.text(142, 236, 'p', { it: true, w: 'bold', c: GRN });
  s += S.text(112, 18, 'electric dipole: lines end on charges', { a: 'middle', size: 11, w: 'bold' });
  // right panel: a bar magnet, S on the left and N on the right (m to the right)
  s += S.line(230, 26, 230, 246, { c: MUT, w: 1, dash: '4 4' });
  const mcx = 345;
  const mcy = 125;
  const { field, nearTurn } = ringField({ cx: mcx, cy: mcy, half: 40, rad: 10, nRing: 10, avoidR: 0.4 });
  let closed = 0;
  let outOk = 0;
  const seeds = [-20, -30, -44, -64, 20, 30, 44, 64].map((dy) => [mcx, mcy + dy]);
  for (const [x0, y0] of seeds) {
    const t = traceClosed(field, x0, y0, { bounds: [234, 26, 458, 248], avoid: nearTurn, step: 0.5, max: 4000 });
    if (t.closed) closed++;
    s += S.path(pathOf(t.pts, 6), { c: MUT, w: 1.2 });
    const [bx, by] = field(x0, y0);
    if (bx < 0) outOk++;
    s += S.head(x0, y0, Math.atan2(by, bx), { c: ACC, size: 6 });
  }
  const [bxIn] = field(mcx, mcy);
  check(closed >= 4 && outOk === seeds.length, `E vs B: ${closed} of ${seeds.length} magnet lines close; all ${outOk} outside arrows point N → S`);
  check(bxIn > 0, 'E vs B: inside the magnet B points from S to N, along m (the opposite of the dipole case)');
  s += S.rect(mcx - 40, mcy - 10, 40, 20, { c: NEG, sw: 1.4, fill: NEG, fop: 0.18 }) + S.rect(mcx, mcy - 10, 40, 20, { c: POS, sw: 1.4, fill: POS, fop: 0.18 });
  s += S.text(mcx - 20, mcy + 4, 'S', { a: 'middle', w: 'bold', size: 11 }) + S.text(mcx + 20, mcy + 4, 'N', { a: 'middle', w: 'bold', size: 11 });
  s += S.head(mcx + 8, mcy, 0, { c: ACC, size: 6 });
  s += S.arrow(322, 232, 367, 232, { c: GRN, w: 2 }) + S.text(374, 236, 'm', { it: true, w: 'bold', c: GRN });
  s += S.text(345, 18, 'bar magnet: closed loops', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Left: field lines of an electric dipole with its moment p pointing right; they start on the positive charge and end on the negative charge, and between the charges the field points opposite to p. Right: field lines of a bar magnet with its moment m pointing right; they are closed loops, and inside the magnet the field points along m', s);
})();

// ---------------------------------------------------------------- 4. end-on and broadside-on points (field drawn to the computed ratio)
/** Field of a magnet in the pole model (charges ±1 at x = ±l), units with μ0/4π = 1; used only to check the formulae. */
function poleModel(l, x, y) {
  const one = (px, q) => {
    const dx = x - px;
    const dy = y;
    const r3 = Math.hypot(dx, dy) ** 3;
    return [(q * dx) / r3, (q * dy) / r3];
  };
  const a = one(l, 1);
  const b = one(-l, -1);
  return [a[0] + b[0], a[1] + b[1]];
}
export const endOn = (m, l, d) => (2 * m * d) / (d * d - l * l) ** 2;
export const broadside = (m, l, d) => m / (d * d + l * l) ** 1.5;
export const POSITIONS = (() => {
  const w = 420;
  const h = 260;
  let s = '';
  const cx = 110;
  const cy = 180;
  const L = 30; // l in px
  const d = 3 * L;
  s += S.line(14, cy, 300, cy, { c: MUT, w: 1, dash: '4 3' }) + S.line(cx, 24, cx, 250, { c: MUT, w: 1, dash: '4 3' });
  s += S.rect(cx - L, cy - 9, L, 18, { c: NEG, sw: 1.5, fill: NEG, fop: 0.18 }) + S.rect(cx, cy - 9, L, 18, { c: POS, sw: 1.5, fill: POS, fop: 0.18 });
  s += S.text(cx - L / 2, cy + 4, 'S', { a: 'middle', w: 'bold', size: 11 }) + S.text(cx + L / 2, cy + 4, 'N', { a: 'middle', w: 'bold', size: 11 });
  s += S.line(cx - L, cy + 18, cx + L, cy + 18, { w: 1 }) + S.text(cx, cy + 32, '2l', { a: 'middle', it: true, size: 11 });
  s += S.arrow(cx - 26, cy + 52, cx + 26, cy + 52, { c: GRN, w: 2 }) + S.text(cx + 32, cy + 56, 'm', { it: true, w: 'bold', c: GRN });
  // computed fields (m = 1, l = 1, d = 3) and arrow lengths in the same ratio
  const Bp = endOn(1, 1, 3);
  const Bq = broadside(1, 1, 3);
  const Lp = 64;
  const Lq = (Lp * Bq) / Bp;
  const P = [cx + d, cy];
  const Q = [cx, cy - d];
  s += S.circle(P[0], P[1], 3, { fill: 'currentColor' }) + S.arrow(P[0], P[1], P[0] + Lp, P[1], { c: ACC, w: 2.4 }) + S.text(P[0], P[1] + 18, 'P (end-on)', { a: 'middle', size: 11 });
  s += S.circle(Q[0], Q[1], 3, { fill: 'currentColor' }) + S.arrow(Q[0], Q[1], Q[0] - Lq, Q[1], { c: ACC, w: 2.4 }) + S.text(Q[0] + 8, Q[1] - 8, 'Q (broadside-on)', { size: 10 });
  s += S.text(cx + d / 2, cy - 6, 'd', { a: 'middle', it: true }) + S.text(cx + 6, cy - d / 2, 'd', { it: true });
  s += S.text(P[0] + Lp - 4, P[1] - 8, 'B', { a: 'end', w: 'bold' }) + S.text(Q[0] - Lq - 4, Q[1] + 4, 'B', { a: 'end', w: 'bold' });
  const lines = [
    ['End-on (along m):', 'bold'],
    ['B = (μ₀/4π) · 2md / (d² − l²)²', ''],
    ['Broadside-on (opposite to m):', 'bold'],
    ['B = (μ₀/4π) · m / (d² + l²)^(3/2)', ''],
    ['Short magnet, d ≫ l:', 'bold'],
    ['2m/d³ end-on, m/d³ broadside-on', ''],
  ];
  lines.forEach(([t, wgt], i) => (s += S.text(214, 26 + i * 17, t, { size: 11, w: wgt || undefined })));
  s += S.text(410, 252, 'arrows drawn to scale for d = 3l', { a: 'end', size: 10 });
  // checks: the formulae against the pole model, directions, drawn ratio, short-magnet limit
  const [ax, ay] = poleModel(1, 3, 0);
  const [ex, ey] = poleModel(1, 0, 3);
  check(close(ax, endOn(2, 1, 3), 1e-12) && close(ay, 0, 1e-12) && ax > 0, 'positions: end-on formula 2md/(d² − l²)² matches the pole-model field and points along m');
  check(close(-ex, broadside(2, 1, 3), 1e-12) && close(ey, 0, 1e-12) && ex < 0, 'positions: broadside-on formula m/(d² + l²)^(3/2) matches the pole-model field and points opposite to m');
  check(close(Lp / Lq, Bp / Bq, 1e-9), `positions: arrows drawn in the computed ratio ${(Bp / Bq).toFixed(2)} : 1 for d = 3l`);
  check(Math.abs(endOn(1, 1, 100) / broadside(1, 1, 100) - 2) < 0.002, 'positions: for d ≫ l the ratio of end-on to broadside-on field tends to 2');
  return svgDoc(w, h, 'A bar magnet of magnetic length 2l with moment m from S to N. At P, end-on at distance d along its axis, the field points along m; at Q, broadside-on at the same distance on its perpendicular bisector, the field points opposite to m and is weaker. The formulae for both positions are listed', s);
})();

// ---------------------------------------------------------------- 5. torque on a bar magnet in a uniform field
export const TORQUE_DATA = { thetaDeg: 40 };
export const MAGNET_TORQUE = (() => {
  const w = 360;
  const h = 240;
  let s = '';
  for (let y = 30; y <= 190; y += 32) s += S.arrow(12, y, 348, y, { c: MUT, w: 1, size: 6 });
  s += S.text(344, 22, 'B', { a: 'end', w: 'bold', it: true });
  const C = [170, 120];
  const th = (TORQUE_DATA.thetaDeg * Math.PI) / 180;
  const L = 56;
  const u = [Math.cos(th), -Math.sin(th)]; // screen direction of m
  const N = [C[0] + L * u[0], C[1] + L * u[1]];
  const Sp = [C[0] - L * u[0], C[1] - L * u[1]];
  s += S.line(Sp[0], Sp[1], C[0], C[1], { c: NEG, w: 10 }) + S.line(C[0], C[1], N[0], N[1], { c: POS, w: 10 });
  s += S.text(N[0] - 14, N[1] - 6, 'N', { a: 'end', w: 'bold' }) + S.text(Sp[0] + 14, Sp[1] + 14, 'S', { w: 'bold' });
  s += S.line(C[0], C[1], C[0] + 110, C[1], { c: GRN, w: 1, dash: '4 3' });
  s += S.arrow(C[0] + 64 * u[0], C[1] + 64 * u[1], C[0] + 96 * u[0], C[1] + 96 * u[1], { c: GRN, w: 2.2 }) + S.text(C[0] + 102 * u[0], C[1] + 102 * u[1], 'm', { it: true, w: 'bold', c: GRN });
  s += S.path(`M${f1(C[0] + 34)} ${f1(C[1])} A34 34 0 0 0 ${f1(C[0] + 34 * u[0])} ${f1(C[1] + 34 * u[1])}`, { w: 1 }) + S.text(C[0] + 42, C[1] - 8, 'θ', { it: true });
  // turning sense: an arc beyond the S end with increasing screen angle (clockwise on screen)
  const a0 = Math.PI - th - 0.2;
  const a1 = Math.PI - th + 0.26;
  const R = 70;
  s += S.path(`M${f1(C[0] + R * Math.cos(a0))} ${f1(C[1] + R * Math.sin(a0))} A${R} ${R} 0 0 1 ${f1(C[0] + R * Math.cos(a1))} ${f1(C[1] + R * Math.sin(a1))}`, { c: ACC, w: 1.8 });
  s += S.head(C[0] + R * Math.cos(a1), C[1] + R * Math.sin(a1), Math.atan2(Math.cos(a1), -Math.sin(a1)), { c: ACC, size: 8 });
  const tau = cross([u[0], u[1], 0], [1, 0, 0]);
  check(tau[2] > 0 && a1 > a0, 'magnet torque: m × B points into the page, which turns the magnet clockwise on screen (the drawn sense), swinging m towards B');
  s += dirSym(300, 210, false, { c: ACC, r: 8 }) + S.text(286, 214, 'τ into the page', { a: 'end', size: 11 });
  s += S.text(14, 214, 'τ = m × B,  τ = mB sin θ', { size: 11, w: 'bold' });
  s += S.text(14, 232, 'uniform B: no net force, only a couple', { size: 11 });
  return svgDoc(w, h, 'A bar magnet with its magnetic moment m at angle theta to a uniform field B pointing right. The torque m cross B points into the page and turns the magnet clockwise, towards the field; in a uniform field there is no net force', s);
})();

// ---------------------------------------------------------------- 6. flux through a face-on and a tilted surface
export const FLUX_DATA = { thetaDeg: 60, len: 96 };
export const FLUX = (() => {
  const w = 400;
  const h = 250;
  let s = '';
  const ys = [];
  for (let y = 28; y <= 220; y += 16) {
    ys.push(y);
    s += S.arrow(10, y, 390, y, { c: MUT, w: 1, size: 5 });
  }
  s += S.text(388, 18, 'B', { a: 'end', w: 'bold', it: true });
  const { len } = FLUX_DATA;
  // surface 1, face-on (normal along B)
  const y1a = 110 - len / 2;
  const y1b = 110 + len / 2;
  s += S.line(110, y1a, 110, y1b, { c: ACC, w: 4 });
  s += S.arrow(110, 110, 160, 110, { c: GRN, w: 2.2 }) + S.text(150, 102, 'n', { it: true, w: 'bold', c: GRN });
  s += S.text(110, 238, 'θ = 0: Φ = BA', { a: 'middle', size: 11, w: 'bold' });
  // surface 2, normal at θ to B
  const th = (FLUX_DATA.thetaDeg * Math.PI) / 180;
  const n = [Math.cos(th), -Math.sin(th)];
  const t = [Math.sin(th), Math.cos(th)];
  const C = [290, 110];
  const A = [C[0] - (len / 2) * t[0], C[1] - (len / 2) * t[1]];
  const B = [C[0] + (len / 2) * t[0], C[1] + (len / 2) * t[1]];
  s += S.line(A[0], A[1], B[0], B[1], { c: ACC, w: 4 });
  s += S.arrow(C[0], C[1], C[0] + 50 * n[0], C[1] + 50 * n[1], { c: GRN, w: 2.2 }) + S.text(C[0] + 56 * n[0], C[1] + 56 * n[1], 'n', { it: true, w: 'bold', c: GRN });
  s += S.path(`M${f1(C[0] + 24)} ${f1(C[1])} A24 24 0 0 0 ${f1(C[0] + 24 * n[0])} ${f1(C[1] + 24 * n[1])}`, { w: 1 }) + S.text(C[0] + 28, C[1] - 6, 'θ', { it: true });
  s += S.line(B[0], A[1], 372, A[1], { c: MUT, w: 1, dash: '3 3' }) + S.line(B[0], B[1], 372, B[1], { c: MUT, w: 1, dash: '3 3' });
  s += S.line(368, A[1], 368, B[1], { w: 1.2 }) + S.text(364, (A[1] + B[1]) / 2 + 4, 'A cos θ', { a: 'end', size: 10 });
  s += S.text(290, 238, `θ = ${FLUX_DATA.thetaDeg}°: Φ = BA cos θ`, { a: 'middle', size: 11, w: 'bold' });
  // count the drawn field lines crossing each surface
  const crossing = (ya, yb) => ys.filter((y) => y > Math.min(ya, yb) && y < Math.max(ya, yb)).length;
  const c1 = crossing(y1a, y1b);
  const c2 = crossing(A[1], B[1]);
  check(close(n[0] * t[0] + n[1] * t[1], 0) && close(Math.abs(B[1] - A[1]), len * Math.cos(th)), 'flux: the tilted surface is perpendicular to its normal, and its extent across the field is A cos θ');
  check(c1 === 6 && c2 === 3 && close(c2 / c1, Math.cos(th)), `flux: ${c1} drawn lines cross the face-on surface and ${c2} the tilted one, a ratio of cos ${FLUX_DATA.thetaDeg}° = ${Math.cos(th).toFixed(2)}`);
  return svgDoc(w, h, 'Two equal flat surfaces seen edge-on in a uniform field B pointing right. The left one faces the field, its normal along B, and six field lines cross it: flux B A. The right one is tilted so that its normal makes 60 degrees with B; its extent across the field is A cos theta and only three lines cross it: flux B A cos theta', s);
})();

// ---------------------------------------------------------------- 7. dia-, para- and ferromagnetic samples (exact 2D solution)
function cylinderField(mur, R) {
  const k = (mur - 1) / (mur + 1);
  const Bin = (2 * mur) / (mur + 1);
  return (x, y) => {
    const r2 = x * x + y * y;
    if (r2 <= R * R) return [Bin, 0];
    return [1 + (k * R * R * (x * x - y * y)) / (r2 * r2), (k * R * R * (2 * x * y)) / (r2 * r2)];
  };
}
function materialPanel(ox, mur, title, color, note) {
  const R = 34;
  const w = 130;
  const cx = ox + w / 2;
  const cy = 110;
  const f = cylinderField(mur, R);
  let s = S.circle(cx, cy, R, { c: color, sw: 1.6, fill: color, fop: 0.15 });
  let inside = 0;
  for (let i = -4; i <= 4; i++) {
    let x = -w / 2 + 2;
    let y = i * 12;
    const pts = [[cx + x, cy + y]];
    for (let k = 0; k < 400 && x < w / 2 - 2; k++) {
      const [bx, by] = f(x, y);
      const m = Math.hypot(bx, by);
      x += (0.8 * bx) / m;
      y += (0.8 * by) / m;
      pts.push([cx + x, cy + y]);
    }
    if (pts.some(([px, py]) => Math.hypot(px - cx, py - cy) < R - 1)) inside++;
    s += S.path(pathOf(pts, 4), { c: MUT, w: 1.1 });
  }
  s += S.head(cx + w / 2 - 4, cy, 0, { c: ACC, size: 7 });
  s += S.text(cx, 24, title, { a: 'middle', size: 11, w: 'bold' });
  s += S.text(cx, 192, note, { a: 'middle', size: 10 });
  return { s, inside, Bin: f(0, 0)[0] };
}
export const MATERIALS = (() => {
  const dia = materialPanel(0, 0.5, 'Diamagnetic', NEG, 'χ < 0, μr < 1');
  const para = materialPanel(135, 1.6, 'Paramagnetic', GRN, 'χ > 0 (small), μr > 1');
  const ferro = materialPanel(270, 25, 'Ferromagnetic', POS, 'χ ≫ 1, μr ≫ 1');
  check(dia.Bin < 1 && para.Bin > 1 && ferro.Bin > para.Bin, `materials: field inside is weaker for dia (${dia.Bin.toFixed(2)}), stronger for para (${para.Bin.toFixed(2)}) and much stronger for ferro (${ferro.Bin.toFixed(2)}) than outside`);
  check(dia.inside <= para.inside && para.inside <= ferro.inside, `materials: traced lines passing through the sample rise dia ${dia.inside} ≤ para ${para.inside} ≤ ferro ${ferro.inside}`);
  return svgDoc(405, 200, 'Field lines of a uniform field through three samples: they spread out round a diamagnetic sample, crowd slightly into a paramagnetic one and are drawn strongly into a ferromagnetic one (the effect is exaggerated for the first two)', dia.s + para.s + ferro.s);
})();

// ---------------------------------------------------------------- 8. domains: random, partly aligned, saturated
export const DOMAINS = (() => {
  const w = 420;
  const h = 170;
  let s = '';
  const sets = [
    [20, 160, 245, 75, 310, 200],
    [0, 30, 340, 10, 60, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  const titles = ['no field: random', 'weak field: partly aligned', 'strong field: saturated'];
  const sums = [];
  sets.forEach((angles, p) => {
    const ox = 10 + p * 138;
    s += S.text(ox + 60, 18, titles[p], { a: 'middle', size: 11, w: 'bold' });
    let sum = 0;
    angles.forEach((deg, k) => {
      const i = k % 3;
      const j = Math.floor(k / 3);
      const x = ox + i * 40;
      const y = 30 + j * 48;
      s += S.rect(x, y, 40, 48, { c: MUT, sw: 1 });
      const a = (deg * Math.PI) / 180;
      const cx = x + 20;
      const cy = y + 24;
      s += S.arrow(cx - 13 * Math.cos(a), cy - 13 * Math.sin(a), cx + 13 * Math.cos(a), cy + 13 * Math.sin(a), { c: POS, w: 2 });
      sum += Math.cos(a);
    });
    sums.push(sum);
  });
  s += S.arrow(160, 148, 400, 148, { c: ACC, w: 2 }) + S.text(280, 164, 'applied field increasing →', { a: 'middle', size: 10 });
  check(sums[0] < sums[1] && sums[1] < sums[2] && close(sums[2], 6), `domains: resultant along the field rises ${sums.map((x) => x.toFixed(2)).join(' → ')} (6 = saturation)`);
  return svgDoc(w, h, 'A ferromagnet is made of domains, each fully magnetised. With no field the domain directions are random and nearly cancel; in a weak field the domains are partly aligned; in a strong field all of them point along the field and the sample is saturated', s);
})();

// ---------------------------------------------------------------- 9. electromagnet: coil on a soft-iron core
export const ELECTROMAGNET = (() => {
  const w = 380;
  const h = 240;
  let s = '';
  s += S.rect(80, 100, 220, 40, { c: 'currentColor', sw: 1.5, fill: FILL });
  const xs = Array.from({ length: 10 }, (_, i) => 98 + 20 * i);
  for (const x of xs) {
    s += S.line(x + 8, 148, x + 20, 92, { c: MUT, w: 1, dash: '3 3' }); // back of the turn (hidden)
    s += S.line(x, 92, x + 8, 148, { c: ACC, w: 2.2 }); // front of the turn: current downwards
  }
  for (const x of [xs[1], xs[5], xs[8]]) s += S.midHead(x, 92, x + 8, 148, { c: POS, size: 9 });
  s += S.line(98, 92, 98, 62, { w: 1.5 }) + S.line(98, 62, 44, 62, { w: 1.5 }) + S.circle(40, 62, 4, { sw: 1.5, fill: FILL }) + S.text(40, 52, 'I in', { a: 'middle', size: 11 });
  s += S.line(286, 148, 286, 178, { w: 1.5 }) + S.line(286, 178, 336, 178, { w: 1.5 }) + S.circle(340, 178, 4, { sw: 1.5, fill: FILL }) + S.text(340, 196, 'I out', { a: 'middle', size: 11 });
  // m from the front of a turn (towards the viewer, −z) carrying current downwards (+y)
  const m = cross([0, 0, -1], [0, 1, 0]);
  check(m[0] > 0 && m[1] === 0 && m[2] === 0, 'electromagnet: current down the front of each turn gives m along the core to the right, so the right end is N');
  s += S.text(312, 126, 'N', { w: 'bold', size: 14 }) + S.text(68, 126, 'S', { a: 'end', w: 'bold', size: 14 });
  // two outside field lines from N back to S
  const P0 = [302, 110];
  const P1 = [350, 30];
  const P2 = [30, 30];
  const P3 = [78, 110];
  s += S.path(`M${P0[0]} ${P0[1]} C${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${P3[0]} ${P3[1]}`, { c: MUT, w: 1.2 });
  s += S.path(`M${P0[0]} ${260 - P0[1]} C${P1[0]} ${260 - P1[1] - 30} ${P2[0]} ${260 - P2[1] - 30} ${P3[0]} ${260 - P3[1]}`, { c: MUT, w: 1.2 });
  const tx = 0.75 * (P3[0] + P2[0] - P1[0] - P0[0]);
  const topY = 0.125 * (P0[1] + 3 * P1[1] + 3 * P2[1] + P3[1]);
  s += S.head(190, topY, Math.PI, { c: ACC, size: 8 });
  check(tx < 0, 'electromagnet: outside the core the drawn field line runs from N back to S (opposite to m), as for any magnetic dipole');
  s += S.lead(200, 132, 228, 214) + S.text(232, 218, 'soft-iron core', { size: 11 });
  s += S.text(14, 214, 'B ≈ μ₀μr nI', { size: 12, w: 'bold' });
  s += S.text(14, 232, 'stronger: more n, more I, higher μr', { size: 11 });
  return svgDoc(w, h, 'An electromagnet: a coil wound on a soft-iron core. The current enters at the left and flows down the front of each turn, so by the right-hand rule the magnetic moment points to the right and the right end is a north pole; field lines leave it and return to the south end outside', s);
})();

// ---------------------------------------------------------------- 10, 11. B–H loops (qualitative model: branches Bs tanh((H ∓ Hc)/a))
function loopModel({ Bs, Hc, a, Hmax }) {
  const up = (H) => Bs * Math.tanh((H - Hc) / a); // H increasing (lower branch)
  const down = (H) => Bs * Math.tanh((H + Hc) / a); // H decreasing (upper branch)
  const lower = [];
  const upper = [];
  for (let H = -Hmax; H <= Hmax + 1e-9; H += 2) lower.push([H, up(H)]);
  for (let H = Hmax; H >= -Hmax - 1e-9; H -= 2) upper.push([H, down(H)]);
  const poly = [...lower, ...upper];
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    area += x1 * y2 - x2 * y1;
  }
  return { up, down, lower, upper, area: area / 2, Br: down(0), gap: Math.abs(down(Hmax) - up(Hmax)) / Bs };
}
export const BH_DATA = { Bs: 105, Hc: 30, a: 40, Hmax: 150 };
export const BH_LOOP = (() => {
  const w = 400;
  const h = 300;
  const cx = 200;
  const cy = 150;
  const L = loopModel(BH_DATA);
  const toS = ([H, B]) => [cx + H, cy - B];
  let s = '';
  s += S.arrow(30, cy, 372, cy, { w: 1.2 }) + S.text(374, cy + 16, 'H', { a: 'end', it: true, w: 'bold' });
  s += S.arrow(cx, 284, cx, 22, { w: 1.2 }) + S.text(cx + 8, 26, 'B', { it: true, w: 'bold' });
  s += S.path(pathOf(L.lower.map(toS), 1), { c: ACC, w: 2.2 }) + S.path(pathOf(L.upper.map(toS), 1), { c: ACC, w: 2.2 });
  // initial magnetisation curve
  const init = [];
  for (let H = 0; H <= BH_DATA.Hmax; H += 2) init.push(toS([H, BH_DATA.Bs * Math.tanh(H / BH_DATA.a)]));
  s += S.path(pathOf(init, 1), { c: MUT, w: 1.3, dash: '5 4' });
  // traversal arrows: lower branch left → right, upper branch right → left
  const arrowOn = (fn, H, dir) => {
    const [x1, y1] = toS([H, fn(H)]);
    const [x2, y2] = toS([H + 4 * dir, fn(H + 4 * dir)]);
    return S.head(x2, y2, Math.atan2(y2 - y1, x2 - x1), { c: ACC, size: 9 });
  };
  s += arrowOn(L.up, 70, 1) + arrowOn(L.down, -70, -1);
  const dotAt = (H, B) => S.circle(cx + H, cy - B, 3.5, { c: POS, fill: POS });
  const { Hc, Hmax } = BH_DATA;
  s += dotAt(0, L.Br) + dotAt(0, -L.Br) + dotAt(-Hc, 0) + dotAt(Hc, 0) + dotAt(Hmax, L.down(Hmax)) + dotAt(-Hmax, L.up(-Hmax));
  s += S.text(cx - 8, cy - L.Br - 6, 'retentivity', { a: 'end', size: 11 });
  s += S.text(cx - Hc - 6, cy - 8, 'coercivity', { a: 'end', size: 11 });
  s += S.text(cx + Hmax - 4, cy - L.down(Hmax) - 10, 'saturation', { a: 'end', size: 11 });
  s += S.text(cx + 60, cy - 30, 'first magnetisation', { size: 10, c: MUT });
  s += S.text(cx, 298, 'loop area ∝ energy lost as heat per cycle', { a: 'middle', size: 11 });
  check(L.Br > 0 && close(L.up(0), -L.Br, 1e-9), `B–H loop: B = ±${L.Br.toFixed(1)} (the retentivity) remains on the two branches at H = 0`);
  check(close(L.down(-Hc), 0, 1e-9) && close(L.up(Hc), 0, 1e-9), 'B–H loop: B falls to zero at H = −Hc and +Hc (the coercivity) on the two branches');
  check(L.gap < 0.01 && L.area > 0, `B–H loop: the branches meet at saturation (gap ${(L.gap * 100).toFixed(2)}% of Bs) and the loop is traversed anticlockwise in the (H, B) plane, as the arrows show`);
  let between = true;
  for (let H = 2; H <= Hmax; H += 2) {
    const Bi = BH_DATA.Bs * Math.tanh(H / BH_DATA.a);
    between = between && Bi > L.up(H) && Bi < L.down(H);
  }
  check(between, 'B–H loop: the first-magnetisation curve lies inside the loop');
  return svgDoc(w, h, 'A hysteresis loop of a ferromagnet, B against H. From the unmagnetised state B rises to saturation; when H is brought back to zero a field B equal to the retentivity remains; a reverse H equal to the coercivity is needed to make B zero; the loop is completed through reverse saturation. B always lags behind H', s);
})();
export const LOOPS_DATA = { soft: { Bs: 112, Hc: 10, a: 10, Hmax: 170 }, steel: { Bs: 88, Hc: 55, a: 45, Hmax: 170 } };
export const LOOPS_COMPARE = (() => {
  const w = 400;
  const h = 280;
  const cx = 200;
  const cy = 140;
  const soft = loopModel(LOOPS_DATA.soft);
  const steel = loopModel(LOOPS_DATA.steel);
  const toS = ([H, B]) => [cx + H, cy - B];
  let s = '';
  s += S.arrow(20, cy, 382, cy, { w: 1.2 }) + S.text(384, cy + 16, 'H', { a: 'end', it: true, w: 'bold' });
  s += S.arrow(cx, 266, cx, 14, { w: 1.2 }) + S.text(cx + 8, 20, 'B', { it: true, w: 'bold' });
  s += S.path(pathOf(steel.lower.map(toS), 1), { c: NEG, w: 2 }) + S.path(pathOf(steel.upper.map(toS), 1), { c: NEG, w: 2 });
  s += S.path(pathOf(soft.lower.map(toS), 1), { c: ACC, w: 2.2 }) + S.path(pathOf(soft.upper.map(toS), 1), { c: ACC, w: 2.2 });
  s += S.line(236, 196, 258, 196, { c: ACC, w: 2.2 }) + S.text(264, 200, 'soft iron: narrow', { size: 11 });
  s += S.line(236, 214, 258, 214, { c: NEG, w: 2 }) + S.text(264, 218, 'steel: wide', { size: 11 });
  s += S.text(236, 238, 'larger Hc and area for steel', { size: 10 });
  s += S.text(cx, 278, 'qualitative sketch: H axis not to scale', { a: 'middle', size: 10 });
  check(LOOPS_DATA.steel.Hc > LOOPS_DATA.soft.Hc && soft.Br > steel.Br, `loops: steel has the larger coercivity, soft iron the slightly larger retentivity (${soft.Br.toFixed(1)} against ${steel.Br.toFixed(1)})`);
  check(steel.area > 2 * soft.area && soft.gap < 0.02 && steel.gap < 0.02, `loops: the steel loop encloses ${(steel.area / soft.area).toFixed(1)} times the area of the soft-iron loop; both close at saturation`);
  return svgDoc(w, h, 'B against H loops of soft iron and steel on the same axes: the soft-iron loop is tall and narrow, with a small coercivity, a slightly larger retentivity and a small area; the steel loop is wide, with a large coercivity and a much larger area', s);
})();

export const ALL = { BAR, SOLENOID, E_VS_B, POSITIONS, MAGNET_TORQUE, FLUX, MATERIALS, DOMAINS, ELECTROMAGNET, BH_LOOP, LOOPS_COMPARE };
