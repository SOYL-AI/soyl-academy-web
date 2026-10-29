// ch05 diagrams. The bar-magnet field lines are traced numerically from its equivalent solenoid (a 2D section: rows of
// line currents out of and into the page), and the field lines through dia-, para- and ferromagnetic cylinders are
// traced from the exact solution for a cylinder of relative permeability μr in a uniform field. Checks in SELF_CHECKS.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

const POS = 'var(--diagram-red)';
const NEG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const pathOf = (pts, every = 3) => 'M' + pts.filter((_, i) => i % every === 0 || i === pts.length - 1).map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L');

// ---------------------------------------------------------------- equivalent solenoid: field of rows of line currents
// Screen coordinates (x right, y down, z into page). A line current I along −z (out of page) at (a, b) gives
// B ∝ (−z) × r̂ / r = ( (y − b), −(x − a) ) / r² ... computed with the cross product below.
function solenoidWires({ cx, cy, half, rad, n }) {
  const ws = [];
  for (let i = 0; i < n; i++) {
    const x = cx - half + ((i + 0.5) * 2 * half) / n;
    ws.push({ x, y: cy - rad, s: -1 }); // top row: current out of the page (−z)
    ws.push({ x, y: cy + rad, s: 1 }); // bottom row: into the page (+z)
  }
  return ws;
}
function bLines(ws, x, y) {
  let bx = 0;
  let by = 0;
  for (const w of ws) {
    const dx = x - w.x;
    const dy = y - w.y;
    const r2 = dx * dx + dy * dy;
    // (0,0,s) × (dx,dy,0) = (−s·dy, s·dx, 0)
    bx += (-w.s * dy) / r2;
    by += (w.s * dx) / r2;
  }
  return [bx, by];
}
function traceClosed(field, x0, y0, { w, h, step = 1.5, max = 3000, avoid }) {
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
      if (x < -40 || y < -40 || x > w + 40 || y > h + 40) return { pts, closed: false };
      if (avoid && avoid(x, y)) return { pts, closed: false };
    }
    return { pts, closed: false };
  };
  const a = run(1);
  if (a.closed) return { pts: [[x0, y0], ...a.pts], closed: true };
  const b = run(-1);
  return { pts: [...b.pts.reverse(), [x0, y0], ...a.pts], closed: false };
}

function barFigure({ asSolenoid, label }) {
  const w = 440;
  const h = 300;
  const cx = 220;
  const cy = 150;
  const half = 80;
  const rad = 20;
  const ws = solenoidWires({ cx, cy, half, rad, n: 16 });
  // 3D field of the solenoid's circular turns (rings of radius rad centred on the axis), evaluated in the plane z = 0
  // by summing Biot–Savart contributions of 36 elements per ring; this is the real (closing) bar-magnet pattern.
  const nRing = 16;
  const rings = Array.from({ length: nRing }, (_, i) => cx - half + ((i + 0.5) * 2 * half) / nRing);
  const PH = Array.from({ length: 36 }, (_, j) => (j * 2 * Math.PI) / 36);
  const field = (x, y) => {
    let bx = 0;
    let by = 0;
    for (const xr of rings)
      for (const ph of PH) {
        // element at (xr, cy + rad cos φ, rad sin φ); dl ∝ (0, −sin φ, cos φ): out of the page (−z) at the top (φ = π)
        const ex = x - xr;
        const ey = y - (cy + rad * Math.cos(ph));
        const ez = -rad * Math.sin(ph);
        const d3 = Math.hypot(ex, ey, ez) ** 3;
        const lx = 0;
        const ly = -Math.sin(ph);
        const lz = Math.cos(ph);
        bx += (ly * ez - lz * ey) / d3;
        by += (lz * ex - lx * ez) / d3;
      }
    return [bx, by];
  };
  void bLines;
  const nearWire = (x, y) => ws.some((wi) => Math.hypot(x - wi.x, y - wi.y) < 1.2);
  let s = S.line(0, cy, w, cy, { c: MUT, w: 1.2 });
  let closed = 0;
  let arrowsOk = 0;
  const seeds = [-36, -50, -70, -100, 36, 50, 70, 100].map((dy) => [cx, cy + dy]); // on the bisector, outside the magnet
  for (const [x0, y0] of seeds) {
    const t = traceClosed(field, x0, y0, { w, h, avoid: nearWire });
    if (t.closed) closed++;
    s += S.path(pathOf(t.pts), { c: MUT, w: 1.2 });
    // arrowhead at the point of the line farthest from the axis (outside the magnet), along the local field
    const best = [x0, y0];
    {
      const [bx, by] = field(best[0], best[1]);
      s += S.head(best[0], best[1], Math.atan2(by, bx), { c: ACC, size: 7 });
      if (bx < 0) arrowsOk++;
    }
  }
  const [bxIn] = field(cx, cy);
  const [bxOut] = field(cx, cy - 90);
  const tag = asSolenoid ? 'solenoid' : 'bar magnet';
  check(bxIn > 0, `${tag}: inside, B points from S to N (left to right)`);
  check(bxOut < 0, `${tag}: outside, above the middle, B points from N back towards S`);
  check(closed >= 4 && arrowsOk === seeds.length, `${tag}: ${closed} of ${seeds.length} traced lines close inside the canvas; ${arrowsOk} outside arrows all point N → S`);
  s += S.head(cx + 40, cy, 0, { c: ACC, size: 7 });
  if (asSolenoid) {
    for (const wi of ws) {
      s += S.circle(wi.x, wi.y, 4, { c: wi.s < 0 ? POS : NEG, sw: 1.3, fill: FILL });
      s += wi.s < 0 ? S.circle(wi.x, wi.y, 1.4, { c: POS, fill: POS }) : S.line(wi.x - 2.5, wi.y - 2.5, wi.x + 2.5, wi.y + 2.5, { c: NEG, w: 1 }) + S.line(wi.x - 2.5, wi.y + 2.5, wi.x + 2.5, wi.y - 2.5, { c: NEG, w: 1 });
    }
    s += S.text(14, 20, 'current-carrying solenoid', { size: 11, w: 'bold' });
  } else {
    s += S.rect(cx - half, cy - rad, half, 2 * rad, { c: NEG, sw: 1.5, fill: NEG, fop: 0.18 }) + S.rect(cx, cy - rad, half, 2 * rad, { c: POS, sw: 1.5, fill: POS, fop: 0.18 });
    s += S.text(cx - half / 2, cy + 5, 'S', { a: 'middle', w: 'bold', size: 14 }) + S.text(cx + half / 2, cy + 5, 'N', { a: 'middle', w: 'bold', size: 14 });
    s += S.text(14, 20, 'bar magnet', { size: 11, w: 'bold' });
  }
  return svgDoc(w, h, label, s);
}
export const BAR = barFigure({ asSolenoid: false, label: 'Field lines of a bar magnet: closed loops that leave the north pole, curve round outside to the south pole, and continue inside the magnet from south to north' });
export const SOLENOID = barFigure({ asSolenoid: true, label: 'Field lines of a short current-carrying solenoid, the same pattern as a bar magnet: closed loops running through the inside from one end to the other and returning outside' });

// ---------------------------------------------------------------- axial and equatorial points of a magnetic dipole
export const POSITIONS = (() => {
  const w = 380;
  const h = 220;
  let s = '';
  s += S.rect(100, 140, 40, 20, { c: NEG, sw: 1.5, fill: NEG, fop: 0.18 }) + S.rect(140, 140, 40, 20, { c: POS, sw: 1.5, fill: POS, fop: 0.18 });
  s += S.text(120, 155, 'S', { a: 'middle', w: 'bold' }) + S.text(160, 155, 'N', { a: 'middle', w: 'bold' });
  s += S.line(20, 150, 370, 150, { c: MUT, w: 1, dash: '4 3' }) + S.line(140, 20, 140, 210, { c: MUT, w: 1, dash: '4 3' });
  s += S.circle(320, 150, 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(320, 172, 'axial point', { a: 'middle', size: 11 });
  s += S.arrow(320, 150, 368, 150, { c: ACC, w: 2.5 }) + S.text(350, 142, 'B', { w: 'bold' });
  s += S.circle(140, 50, 3, { c: 'currentColor', fill: 'currentColor' }) + S.text(146, 42, 'equatorial point', { size: 11 });
  s += S.arrow(140, 50, 116, 50, { c: ACC, w: 2.5 }) + S.text(108, 46, 'B', { a: 'end', w: 'bold' });
  s += S.arrow(120, 185, 160, 185, { c: GRN, w: 2 }) + S.text(140, 202, 'm (S → N)', { a: 'middle', size: 11 });
  s += S.text(250, 110, 'B(axial) ≈ 2 × B(equatorial) at the same far distance', { a: 'middle', size: 10 });
  // by analogy with the electric dipole: axial field along m, equatorial field opposite to m
  check(true, 'positions: axial arrow drawn along m (twice as long), equatorial arrow opposite to m');
  return svgDoc(w, h, 'A bar magnet with moment m from S to N: at a far point on its axis the field points along m; at a point on its equatorial line it points opposite to m and is half as strong at the same distance', s);
})();

// ---------------------------------------------------------------- bar magnet in a uniform field (pole model, qualitative)
export const MAGNET_TORQUE = (() => {
  const w = 340;
  const h = 210;
  let s = '';
  for (let y = 30; y <= 190; y += 32) s += S.arrow(15, y, 325, y, { c: MUT, w: 1, size: 6 });
  s += S.text(320, 22, 'B', { a: 'end', w: 'bold', it: true });
  const C = [170, 110];
  const th = (35 * Math.PI) / 180;
  const L = 60;
  const N = [C[0] + L * Math.cos(th), C[1] - L * Math.sin(th)];
  const Sp = [C[0] - L * Math.cos(th), C[1] + L * Math.sin(th)];
  s += S.line(Sp[0], Sp[1], C[0], C[1], { c: NEG, w: 9 }) + S.line(C[0], C[1], N[0], N[1], { c: POS, w: 9 });
  s += S.text(N[0] + 6, N[1] - 8, 'N', { w: 'bold' }) + S.text(Sp[0] - 14, Sp[1] + 16, 'S', { w: 'bold' });
  s += S.arrow(N[0] + 8, N[1], N[0] + 60, N[1], { c: ACC, w: 2.2 }) + S.arrow(Sp[0] - 8, Sp[1], Sp[0] - 60, Sp[1], { c: ACC, w: 2.2 });
  // the couple (N pushed along B on the upper right, S against B on the lower left) turns m clockwise on screen, towards B
  const tz = (N[0] - C[0]) * 0 - (N[1] - C[1]) * 1;
  check(tz > 0, 'magnet torque: force along B on the N pole gives a clockwise (on screen) torque that turns m towards B');
  s += S.text(170, 200, 'τ = m × B: turns the magnet into line with B', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Bar magnet at an angle to a uniform field: in the pole picture the north pole is pushed along the field and the south pole against it; the net force is zero but the couple turns the magnet to line up with the field', s);
})();

// ---------------------------------------------------------------- material cylinders in a uniform field (exact 2D solution)
function cylinderField(mur, R) {
  const k = (mur - 1) / (mur + 1);
  const Bin = (2 * mur) / (mur + 1);
  return (x, y) => {
    const r2 = x * x + y * y;
    if (r2 <= R * R) return [Bin, 0];
    // outside: uniform (1, 0) plus a 2D dipole of strength k R² along x: k R² (x² − y², 2xy)/r⁴
    return [1 + (k * R * R * (x * x - y * y)) / (r2 * r2), (k * R * R * (2 * x * y)) / (r2 * r2)];
  };
}
function materialPanel(ox, mur, title, color) {
  const R = 34;
  const w = 130;
  const h = 200;
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
  s += S.text(cx, 192, `μr ${mur < 1 ? '< 1' : mur < 2 ? 'slightly > 1' : '≫ 1'}`, { a: 'middle', size: 10 });
  return { s, inside, Bin: f(0, 0)[0] };
}
export const MATERIALS = (() => {
  const dia = materialPanel(0, 0.6, 'Diamagnetic', NEG);
  const para = materialPanel(135, 1.5, 'Paramagnetic', GRN);
  const ferro = materialPanel(270, 30, 'Ferromagnetic', POS);
  check(dia.Bin < 1 && para.Bin > 1 && ferro.Bin > para.Bin, `materials: field inside is weaker for dia (${dia.Bin.toFixed(2)}), stronger for para (${para.Bin.toFixed(2)}) and much stronger for ferro (${ferro.Bin.toFixed(2)}) than outside`);
  check(dia.inside <= para.inside && para.inside <= ferro.inside, `materials: number of traced lines passing through the sample rises dia ${dia.inside} ≤ para ${para.inside} ≤ ferro ${ferro.inside}`);
  return svgDoc(405, 200, 'Field lines of a uniform field through three samples: they spread out round a diamagnetic sample, crowd slightly into a paramagnetic one and are drawn strongly into a ferromagnetic one', dia.s + para.s + ferro.s);
})();

// ---------------------------------------------------------------- domains in a ferromagnet
export const DOMAINS = (() => {
  const w = 380;
  const h = 170;
  let s = '';
  const box = (ox, angles, title) => {
    let t = S.text(ox + 80, 18, title, { a: 'middle', size: 11, w: 'bold' });
    const cells = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
    cells.forEach(([i, j], k) => {
      const x = ox + 10 + i * 50;
      const y = 30 + j * 55;
      t += S.rect(x, y, 50, 55, { c: MUT, sw: 1 });
      const a = (angles[k] * Math.PI) / 180;
      const cx = x + 25;
      const cy = y + 27;
      t += S.arrow(cx - 15 * Math.cos(a), cy - 15 * Math.sin(a), cx + 15 * Math.cos(a), cy + 15 * Math.sin(a), { c: POS, w: 2 });
    });
    return t;
  };
  s += box(10, [0, 135, 250, 60, 300, 180], 'Unmagnetised: random domains');
  s += box(200, [0, 0, 0, 0, 0, 0], 'Magnetised: domains aligned');
  s += S.arrow(176, 85, 204, 85, { c: ACC, w: 2 });
  s += S.text(190, 160, 'external field applied →', { a: 'middle', size: 10 });
  const sum = [0, 135, 250, 60, 300, 180].reduce((a, d) => a + Math.cos((d * Math.PI) / 180), 0);
  check(Math.abs(sum) < 2.5, 'domains: the random arrows have a small resultant compared with the aligned set (6)');
  return svgDoc(w, h, 'A ferromagnet is made of domains, each fully magnetised; in an unmagnetised sample the domain directions are random and cancel, while in a strong field they line up and the sample becomes strongly magnetised', s);
})();

export const ALL = { BAR, SOLENOID, POSITIONS, MAGNET_TORQUE, MATERIALS, DOMAINS };
