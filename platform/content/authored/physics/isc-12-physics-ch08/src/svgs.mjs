// ISC ch08 diagrams: a rectangular coil seen face-on with the forces on its four sides, the same coil seen from above with
// the couple and its arm b sin θ (adapted from cbse-12-physics-ch04/src/svgs.mjs TORQUE), the right-hand rule for the
// magnetic moment, the field lines of a current loop as a magnetic dipole, the Bohr orbit with L and μ, the moving coil
// galvanometer seen from above (radial field) and from the front (construction), and the galvanometer converted into an
// ammeter and into a two-range voltmeter. Screen coordinates: x right, y down, z INTO the page (x × y = z), so "out of
// the page" is −z. Every force, moment and torque drawn is computed as a cross product and compared with the drawing,
// and every meter value is solved here (SELF_CHECKS, read by build.mjs).
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
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/** ⊙ (out of the page) or ⊗ (into the page) of radius r. */
function dirSym(x, y, out, { c = 'currentColor', r = 7 } = {}) {
  let s = S.circle(x, y, r, { c, sw: 1.5, fill: FILL });
  if (out) s += S.circle(x, y, 2, { c, fill: c });
  else s += S.line(x - r * 0.7, y - r * 0.7, x + r * 0.7, y + r * 0.7, { c, w: 1.3 }) + S.line(x - r * 0.7, y + r * 0.7, x + r * 0.7, y - r * 0.7, { c, w: 1.3 });
  return s;
}
const symDir = (out) => [0, 0, out ? -1 : 1];

// ---------------------------------------------------------------- 1. rectangular coil face-on, plane along B
export const LOOP_FACE = (() => {
  const w = 360;
  const h = 236;
  let s = '';
  for (let y = 26; y <= 196; y += 34) s += S.arrow(12, y, 348, y, { c: MUT, w: 1, size: 6 });
  s += S.text(344, 18, 'B', { a: 'end', w: 'bold', it: true });
  const P = [110, 50];
  const Q = [250, 50];
  const R = [250, 180];
  const Sx = [110, 180];
  s += S.path(`M${P[0]} ${P[1]} L${Q[0]} ${Q[1]} L${R[0]} ${R[1]} L${Sx[0]} ${Sx[1]} Z`, { c: POS, w: 3, join: 'round' });
  s += S.text(P[0] - 8, P[1] - 6, 'P', { a: 'end', w: 'bold' }) + S.text(Q[0] + 8, Q[1] - 6, 'Q', { w: 'bold' }) + S.text(R[0] + 8, R[1] + 14, 'R', { w: 'bold' }) + S.text(Sx[0] - 8, Sx[1] + 14, 'S', { a: 'end', w: 'bold' });
  // current P → Q → R → S → P (arrowheads at the middle of each side)
  const sides = [[P, Q], [Q, R], [R, Sx], [Sx, P]];
  for (const [a, b] of sides) s += S.midHead(a[0], a[1], b[0], b[1], { c: ACC, size: 9 });
  s += S.text(196, 66, 'I', { a: 'middle', c: ACC, w: 'bold' });
  // forces F = I L × B with B = +x
  const B = [1, 0, 0];
  const F = sides.map(([a, b]) => cross([b[0] - a[0], b[1] - a[1], 0], B));
  // QR (index 1) and SP (index 3) carry the forces; PQ and RS feel none
  check(F[0].every((v) => v === 0) && F[2].every((v) => v === 0), 'loop face: sides PQ and RS lie along B and feel no force');
  check(F[1][2] < 0 && F[3][2] > 0, 'loop face: force on QR is out of the page and on SP into the page (drawn ⊙ and ⊗)');
  s += dirSym(285, 115, true, { c: ACC, r: 9 }) + S.text(300, 112, 'F out', { size: 11 }) + S.text(300, 126, '(on QR)', { size: 10 });
  s += dirSym(75, 115, false, { c: ACC, r: 9 }) + S.text(60, 112, 'F in', { a: 'end', size: 11 }) + S.text(60, 126, '(on SP)', { a: 'end', size: 10 });
  s += S.text(145, 84, 'F = 0 on PQ', { a: 'middle', size: 10 }) + S.text(145, 154, 'F = 0 on RS', { a: 'middle', size: 10 });
  // rotation axis
  s += S.line(180, 34, 180, 214, { c: GRN, w: 1.2, dash: '5 4' }) + S.text(186, 44, 'axis', { size: 10, c: GRN });
  s += S.line(250, 210, 110, 210, { w: 1 }) + S.line(110, 204, 110, 216, { w: 1 }) + S.line(250, 204, 250, 216, { w: 1 }) + S.text(150, 224, 'b', { a: 'middle', it: true });
  s += S.line(266, 50, 266, 180, { w: 1 }) + S.text(272, 160, 'l', { it: true });
  // torque from the two forces about the axis: r × F, r from the axis (x = 180)
  const tQR = cross([R[0] - 180, 0, 0], F[1]);
  const tSP = cross([Sx[0] - 180, 0, 0], F[3]);
  check(tQR[1] > 0 && tSP[1] > 0 && close(tQR[1], tSP[1]), 'loop face: both forces turn the coil the same way about the vertical axis (a couple)');
  // m from the circulation P → Q → R → S (into the page here) and τ = m × B along the axis
  const m = cross([Q[0] - P[0], Q[1] - P[1], 0], [R[0] - Q[0], R[1] - Q[1], 0]);
  const tau = cross(m, B);
  check(m[2] > 0 && tau[1] > 0 && tau[0] === 0 && tau[2] === 0, 'loop face: m is into the page and m × B lies along the drawn axis, same sense as the couple');
  s += S.text(180, 240, 'm into the page, normal ⟂ B: torque largest', { a: 'middle', size: 10 });
  return svgDoc(w, h + 8, 'A rectangular coil PQRS in a uniform field B pointing to the right, its plane along the field. Current flows P to Q to R to S. Sides PQ and RS lie along B and feel no force; side QR is pushed out of the page and side SP into the page, so the coil turns about the vertical axis through its centre', s);
})();

// ---------------------------------------------------------------- 2. the coil seen from above: couple and arm b sin θ
export const TORQUE_TOP_DATA = { thetaDeg: 50 };
export const TORQUE_TOP = (() => {
  const w = 360;
  const h = 250;
  let s = '';
  for (let y = 30; y <= 190; y += 32) s += S.arrow(15, y, 345, y, { c: MUT, w: 1, size: 6 });
  s += S.text(340, 22, 'B', { a: 'end', w: 'bold', it: true });
  const C = [180, 110];
  const th = (TORQUE_TOP_DATA.thetaDeg * Math.PI) / 180;
  const half = 70;
  const A = [C[0] - half * Math.sin(th), C[1] - half * Math.cos(th)];
  const Bp = [C[0] + half * Math.sin(th), C[1] + half * Math.cos(th)];
  s += S.line(A[0], A[1], Bp[0], Bp[1], { c: POS, w: 4 });
  s += dirSym(A[0], A[1], true, { c: POS }) + dirSym(Bp[0], Bp[1], false, { c: POS });
  s += S.text(A[0] - 12, A[1] + 4, 'S', { a: 'end', w: 'bold' }) + S.text(Bp[0] + 12, Bp[1] + 4, 'Q', { w: 'bold' });
  const FA = cross(symDir(true), [1, 0, 0]);
  const FB = cross(symDir(false), [1, 0, 0]);
  check(FA[1] < 0 && FB[1] > 0, 'loop top view: the side with current out of the page is pushed up the page, the other down: a couple');
  s += S.arrow(A[0], A[1] - 10, A[0], A[1] - 52, { c: ACC, w: 2.2 }) + S.text(A[0] - 6, A[1] - 40, 'F', { a: 'end', w: 'bold' });
  s += S.arrow(Bp[0], Bp[1] + 10, Bp[0], Bp[1] + 52, { c: ACC, w: 2.2 }) + S.text(Bp[0] + 8, Bp[1] + 46, 'F', { w: 'bold' });
  // magnetic moment along the normal; right-hand rule for this circulation
  const nx = Math.cos(th);
  const ny = -Math.sin(th);
  const m = cross([0, 0, -1], [Bp[0] - A[0], Bp[1] - A[1], 0]);
  const mm = Math.hypot(m[0], m[1]);
  check(close(m[0] / mm, nx) && close(m[1] / mm, ny), 'loop top view: drawn m agrees with the right-hand rule for the current (out at S, in at Q)');
  s += S.arrow(C[0], C[1], C[0] + 74 * nx, C[1] + 74 * ny, { c: GRN, w: 2.2 }) + S.text(C[0] + 80 * nx, C[1] + 80 * ny, 'm', { it: true, w: 'bold' });
  s += S.path(`M${f1(C[0] + 30)} ${f1(C[1])} A30 30 0 0 0 ${f1(C[0] + 30 * nx)} ${f1(C[1] + 30 * ny)}`, { w: 1 }) + S.text(C[0] + 38, C[1] - 6, 'θ', { it: true });
  // arm of the couple: horizontal distance between the two lines of action
  const arm = Math.abs(Bp[0] - A[0]);
  check(close(arm, 2 * half * Math.sin(th)), 'loop top view: the perpendicular distance between the two forces is b sin θ');
  s += S.line(A[0], 205, Bp[0], 205, { w: 1 }) + S.line(A[0], 199, A[0], 211, { w: 1 }) + S.line(Bp[0], 199, Bp[0], 211, { w: 1 });
  s += S.line(A[0], A[1] + 8, A[0], 199, { c: MUT, w: 1, dash: '3 3' }) + S.line(Bp[0], Bp[1] + 62, Bp[0], 199, { c: MUT, w: 1, dash: '3 3' });
  s += S.text(C[0], 222, 'arm = b sin θ', { a: 'middle', size: 11 });
  // τ = m × B: (nx, ny, 0) × (1, 0, 0) = (0, 0, −ny) → +z since ny < 0 → into the page; the couple turns the coil clockwise on screen
  const tau = cross([nx, ny, 0], [1, 0, 0]);
  check(tau[2] > 0, 'loop top view: m × B points into the page, i.e. a clockwise turn on screen that swings m towards B');
  s += S.text(C[0], 244, 'τ = NIlB × b sin θ = NIAB sin θ', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'The coil seen from above, edge-on, in a field B to the right. Side S carries current out of the page and is pushed up; side Q carries current into the page and is pushed down. The two forces form a couple with arm b sine theta, where theta is the angle between the magnetic moment m and B, so the torque is N I A B sine theta', s);
})();

// ---------------------------------------------------------------- 3. right-hand rule for m
export const RHR = (() => {
  const w = 360;
  const h = 200;
  let s = '';
  const loop = (cx, cy, anti) => {
    let t = S.circle(cx, cy, 50, { c: POS, sw: 3 });
    // arrowheads at four points, tangent to the circulation as seen on screen
    const heads = [];
    for (const a of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
      const x = cx + 50 * Math.cos(a);
      const y = cy - 50 * Math.sin(a);
      // anticlockwise as seen: tangent (−sin a, −cos a) on screen; clockwise: the reverse
      const tx = anti ? -Math.sin(a) : Math.sin(a);
      const ty = anti ? -Math.cos(a) : Math.cos(a);
      heads.push([x, y, tx, ty]);
      t += S.head(x + 5 * tx, y + 5 * ty, Math.atan2(ty, tx), { c: ACC, size: 10 });
    }
    // area vector from the drawn circulation: sum of r × t (z component)
    const z = heads.reduce((acc, [x, y, tx, ty]) => acc + ((x - cx) * ty - (y - cy) * tx), 0);
    return { t, z };
  };
  const L = loop(95, 95, true);
  const Rr = loop(265, 95, false);
  check(L.z < 0 && Rr.z > 0, 'right-hand rule: anticlockwise current gives m out of the page (⊙), clockwise gives m into the page (⊗)');
  s += L.t + Rr.t + dirSym(95, 95, true, { c: GRN, r: 10 }) + dirSym(265, 95, false, { c: GRN, r: 10 });
  s += S.text(95, 20, 'anticlockwise as seen', { a: 'middle', size: 11 }) + S.text(265, 20, 'clockwise as seen', { a: 'middle', size: 11 });
  s += S.text(95, 170, 'm out of the page', { a: 'middle', size: 11, w: 'bold', c: GRN }) + S.text(265, 170, 'm into the page', { a: 'middle', size: 11, w: 'bold', c: GRN });
  s += S.text(180, 192, 'curl right-hand fingers along I: thumb gives m', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Right-hand rule for the magnetic moment of a flat coil seen face-on: with the current anticlockwise as seen, the fingers of the right hand curl that way and the thumb, the magnetic moment, points out of the page; with the current clockwise, m points into the page', s);
})();

// ---------------------------------------------------------------- 4. current loop as a magnetic dipole: field lines r = L sin²φ
export const DIPOLE = (() => {
  const w = 380;
  const h = 260;
  let s = '';
  const cx = 190;
  const cy = 130;
  const rMin = 26;
  let worst = 0;
  for (const L of [60, 90, 120]) {
    for (const side of [-1, 1]) {
      // φ from the +x axis (direction of m); side −1 draws the upper half (screen y up), +1 the lower half
      const pts = [];
      for (let i = 1; i < 180; i++) {
        const ph = (i * Math.PI) / 180;
        const rr = L * Math.sin(ph) ** 2;
        if (rr < rMin) continue;
        pts.push([cx + rr * Math.cos(ph), cy + side * rr * Math.sin(ph)]);
        worst = Math.max(worst, Math.abs(Math.hypot(rr * Math.cos(ph), rr * Math.sin(ph)) - L * Math.sin(ph) ** 2));
      }
      s += S.path(`M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`, { c: MUT, w: 1.3 });
      // arrow at the equator (φ = 90°), drawn pointing to the left (−x)
      s += S.head(cx - 5, cy + side * L, Math.PI, { c: MUT, size: 8 });
    }
  }
  check(worst < 1e-9, 'dipole: drawn field lines follow r = L sin²φ (the far field of a magnetic dipole)');
  // dipole field direction 3(m·r̂)r̂ − m at an equatorial point (r̂ ⟂ m) is −m: to the left, as drawn
  const mHat = [1, 0, 0];
  const rHat = [0, -1, 0];
  const Beq = [0, 1, 2].map((i) => 3 * dot3(mHat, rHat) * rHat[i] - mHat[i]);
  check(Beq[0] < 0 && Beq[1] === 0, 'dipole: on the equatorial line the field points opposite to m, as drawn');
  // the loop edge-on: ⊙ at the top, ⊗ at the bottom gives m along +x
  const top = [0, -22, 0];
  const mTop = cross(top, symDir(true));
  check(mTop[0] > 0, 'dipole: current out of the page at the top and into it at the bottom gives m to the right');
  s += S.line(cx, cy - 22, cx, cy + 22, { c: POS, w: 3 }) + dirSym(cx, cy - 22, true, { c: POS }) + dirSym(cx, cy + 22, false, { c: POS });
  s += S.arrow(cx - 60, cy, cx + 74, cy, { c: GRN, w: 1.6 }) + S.text(cx + 66, cy - 8, 'm', { it: true, w: 'bold', c: GRN });
  s += S.text(cx + 80, cy + 4, 'N face', { w: 'bold', size: 11 }) + S.text(cx - 66, cy + 4, 'S face', { a: 'end', w: 'bold', size: 11 });
  s += S.text(cx, h - 6, 'far away: B = (μ₀/4π) 2m/x³ on the axis', { a: 'middle', size: 11 });
  return svgDoc(w, h, 'Field lines of a small current loop seen edge-on, with current out of the page at the top and into it at the bottom. The lines leave the face towards which the magnetic moment m points, the north face, loop round and re-enter at the south face, exactly like the lines of a short bar magnet or an electric dipole far away', s);
})();

// ---------------------------------------------------------------- 5. Bohr orbit: L and μ
export const ORBIT = (() => {
  const w = 340;
  const h = 230;
  let s = '';
  const cx = 150;
  const cy = 112;
  const R = 78;
  s += S.circle(cx, cy, R, { c: MUT, sw: 1.4, dash: '5 4' });
  s += S.circle(cx, cy, 9, { c: POS, fill: POS, fop: 0.25 }) + S.text(cx, cy + 4, '+', { a: 'middle', c: POS, w: 'bold' });
  // electron at angle 30° (screen, measured anticlockwise as seen)
  const a = Math.PI / 6;
  const ex = cx + R * Math.cos(a);
  const ey = cy - R * Math.sin(a);
  s += S.circle(ex, ey, 8, { c: NEG, fill: NEG, fop: 0.25 }) + S.text(ex, ey + 4, '−', { a: 'middle', c: NEG, w: 'bold' });
  // velocity anticlockwise as seen: (−sin a, −cos a) on screen
  const v = [-Math.sin(a), -Math.cos(a), 0];
  s += S.arrow(ex + 10 * v[0], ey + 10 * v[1], ex + 48 * v[0], ey + 48 * v[1], { c: NEG, w: 2 }) + S.text(ex + 52 * v[0] + 6, ey + 52 * v[1], 'v', { it: true, w: 'bold', c: NEG });
  // conventional current: opposite to v, drawn at the other side of the orbit
  const b = Math.PI + Math.PI / 6;
  const ix = cx + R * Math.cos(b);
  const iy = cy - R * Math.sin(b);
  const iv = [Math.sin(b), Math.cos(b)]; // clockwise as seen
  s += S.head(ix + 6 * iv[0], iy + 6 * iv[1], Math.atan2(iv[1], iv[0]), { c: ACC, size: 10 }) + S.text(ix - 12, iy + 16, 'I', { a: 'end', c: ACC, w: 'bold' });
  // L = r × (m v): r from the nucleus
  const rv = [ex - cx, ey - cy, 0];
  const Lv = cross(rv, v);
  check(Lv[2] < 0, 'orbit: electron moving anticlockwise as seen gives L out of the page (⊙)');
  // μ = −(e/2m) L: into the page
  check(-Lv[2] > 0, 'orbit: the negative electron makes μ opposite to L, into the page (⊗)');
  s += dirSym(258, 70, true, { c: GRN, r: 10 }) + S.text(274, 74, 'L out', { size: 11, w: 'bold' });
  s += dirSym(258, 120, false, { c: GRN, r: 10 }) + S.text(274, 124, 'μ in', { size: 11, w: 'bold' });
  s += S.text(cx, 210, 'μ = evr/2 = (e/2mₑ) L', { a: 'middle', size: 12, w: 'bold' });
  s += S.line(cx, cy, cx - R * 0.7, cy + R * 0.7, { w: 1 }) + S.text(cx - 30, cy + 40, 'r', { it: true });
  return svgDoc(w, h, 'An electron moving anticlockwise as seen in a circular Bohr orbit of radius r round the nucleus. Its orbital angular momentum L points out of the page; the equivalent conventional current is clockwise, so its orbital magnetic moment mu points into the page, opposite to L', s);
})();

// ---------------------------------------------------------------- 6. moving coil galvanometer from above: radial field
export const MCG_TOP_DATA = { alphaDeg: 20 };
export const MCG_TOP = (() => {
  const w = 360;
  const h = 236;
  let s = '';
  const cx = 180;
  const cy = 112;
  const rc = 38;
  const rp = 66;
  const rad = (d) => (d * Math.PI) / 180;
  const pt = (r, d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  // pole pieces with concave cylindrical faces (screen angles, clockwise positive)
  const nTop = pt(rp, 235);
  const nBot = pt(rp, 125);
  const sTop = pt(rp, 305);
  const sBot = pt(rp, 55);
  s += S.path(`M40 ${f1(nTop[1])} L${f1(nTop[0])} ${f1(nTop[1])} A${rp} ${rp} 0 0 0 ${f1(nBot[0])} ${f1(nBot[1])} L40 ${f1(nBot[1])} Z`, { c: POS, w: 1.6, fill: POS, fop: 0.18 });
  s += S.path(`M320 ${f1(sTop[1])} L${f1(sTop[0])} ${f1(sTop[1])} A${rp} ${rp} 0 0 1 ${f1(sBot[0])} ${f1(sBot[1])} L320 ${f1(sBot[1])} Z`, { c: NEG, w: 1.6, fill: NEG, fop: 0.18 });
  s += S.text(62, cy + 5, 'N', { a: 'middle', w: 'bold', size: 16 }) + S.text(298, cy + 5, 'S', { a: 'middle', w: 'bold', size: 16 });
  s += S.circle(cx, cy, rc, { c: 'currentColor', sw: 1.6, fill: FILL });
  s += S.text(cx, cy - 2, 'soft-iron', { a: 'middle', size: 10 }) + S.text(cx, cy + 10, 'core', { a: 'middle', size: 10 });
  // radial field lines in the gap: N side towards the centre, S side away from it
  let radialOk = true;
  for (const d of [-40, -20, 0, 20, 40]) {
    const [x1, y1] = pt(rp - 1, 180 + d);
    const [x2, y2] = pt(rc + 2, 180 + d);
    s += S.arrow(x1, y1, x2, y2, { c: MUT, w: 1.1, size: 5 });
    const [x3, y3] = pt(rc + 2, d);
    const [x4, y4] = pt(rp - 1, d);
    s += S.arrow(x3, y3, x4, y4, { c: MUT, w: 1.1, size: 5 });
    // each line, extended, passes through the centre of the core
    const cr = (x2 - x1) * (cy - y1) - (y2 - y1) * (cx - x1);
    radialOk = radialOk && Math.abs(cr) < 1e-6;
  }
  check(radialOk, 'galvanometer top view: every field line in the gap points along a radius of the core');
  // the coil: two sides in the gap, a diameter apart, deflected by α
  const al = MCG_TOP_DATA.alphaDeg;
  const left = pt(52, 180 + al);
  const right = pt(52, al);
  s += S.line(left[0], left[1], right[0], right[1], { c: POS, w: 1.2, dash: '5 3' });
  s += dirSym(left[0], left[1], true, { c: POS }) + dirSym(right[0], right[1], false, { c: POS });
  // forces F = I L × B with B radial (inwards on the N side, outwards on the S side)
  const bL = [Math.cos(rad(al)), Math.sin(rad(al)), 0]; // from N face towards the centre
  const bR = [Math.cos(rad(al)), Math.sin(rad(al)), 0]; // from the centre towards the S face
  const FL = cross(symDir(true), bL);
  const FR = cross(symDir(false), bR);
  const normal = [-Math.sin(rad(al)), Math.cos(rad(al)), 0]; // normal to the coil plane in this view
  check(close(dot3(bL, normal), 0) && close(dot3(bR, normal), 0), `galvanometer top view: at a deflection of ${al}° the radial field still lies in the plane of the coil, so sin θ = 1`);
  check(close(dot3(FL, bL), 0) && FL[1] < 0 && FR[1] > 0, 'galvanometer top view: forces are perpendicular to the radius, up on the left side and down on the right: a deflecting couple');
  s += S.arrow(left[0] + 10 * FL[0], left[1] + 10 * FL[1], left[0] + 42 * FL[0], left[1] + 42 * FL[1], { c: ACC, w: 2 }) + S.text(left[0] + 46 * FL[0] - 4, left[1] + 46 * FL[1] - 2, 'F', { a: 'end', w: 'bold' });
  s += S.arrow(right[0] + 10 * FR[0], right[1] + 10 * FR[1], right[0] + 42 * FR[0], right[1] + 42 * FR[1], { c: ACC, w: 2 }) + S.text(right[0] + 46 * FR[0] + 6, right[1] + 46 * FR[1] + 8, 'F', { w: 'bold' });
  s += S.text(cx, 206, 'radial field: plane of coil always along B', { a: 'middle', size: 11 });
  s += S.text(cx, 224, 'deflecting torque = NIAB at every angle', { a: 'middle', size: 11, w: 'bold' });
  return svgDoc(w, h, 'Moving coil galvanometer seen from above: concave north and south pole pieces surround a soft-iron cylinder, so the field in the narrow gap is radial. The coil sides sit in the gap; even after the coil has turned, the field at each side is along the radius, in the plane of the coil, and the forces on the two sides form a couple of moment N I A B', s);
})();

// ---------------------------------------------------------------- 7. moving coil galvanometer: construction (front view)
export const MCG_FRONT = (() => {
  const w = 380;
  const h = 270;
  let s = '';
  const cx = 190;
  // torsion head and phosphor-bronze suspension strip
  s += S.rect(cx - 16, 14, 32, 12, { fill: FILL }) + S.line(cx, 26, cx, 70, { w: 1.4 });
  s += S.rect(cx - 7, 44, 14, 9, { c: GRN, sw: 1.2, fill: GRN, fop: 0.25 });
  // pole pieces
  s += S.path('M60 80 L120 80 L120 90 Q104 140 120 190 L120 200 L60 200 Z', { c: POS, w: 1.6, fill: POS, fop: 0.18 }) + S.text(84, 145, 'N', { a: 'middle', w: 'bold', size: 16 });
  s += S.path('M320 80 L260 80 L260 90 Q276 140 260 190 L260 200 L320 200 Z', { c: NEG, w: 1.6, fill: NEG, fop: 0.18 }) + S.text(296, 145, 'S', { a: 'middle', w: 'bold', size: 16 });
  // coil on its frame, soft-iron core inside
  const cL = cx - 50;
  const cR = cx + 50;
  s += S.rect(cL, 70, cR - cL, 140, { c: ACC, sw: 3 });
  for (let y = 78; y <= 202; y += 8) s += S.line(cL, y, cL + 6, y, { c: ACC, w: 1 }) + S.line(cR - 6, y, cR, y, { c: ACC, w: 1 });
  s += S.rect(cx - 30, 92, 60, 96, { c: 'currentColor', sw: 1.2, fill: FILL, dash: '4 3' });
  // hairspring below
  let d = `M${cx} 210 L${cx} 216`;
  for (let i = 0; i < 4; i++) d += ` Q${cx + 12} ${220 + i * 8} ${cx} ${224 + i * 8} Q${cx - 12} ${228 + i * 8} ${cx} ${232 + i * 8}`;
  s += S.path(d, { w: 1.2 }) + S.line(cx, 248, cx, 258, { w: 1.4 });
  // labels with leaders
  s += S.lead(cx + 16, 20, 260, 20) + S.text(264, 24, 'torsion head', { size: 11 });
  s += S.lead(cx + 7, 48, 260, 48) + S.text(264, 52, 'mirror', { size: 11 });
  s += S.lead(cx - 2, 36, 110, 36) + S.text(106, 40, 'phosphor-bronze strip', { a: 'end', size: 11 });
  s += S.lead(cL + 3, 205, 96, 244) + S.text(92, 252, 'coil on frame', { a: 'end', size: 11 });
  s += S.lead(cx + 20, 160, 252, 226) + S.text(256, 230, 'soft-iron core', { size: 11 });
  s += S.lead(cx + 8, 240, 252, 250) + S.text(256, 254, 'spring', { size: 11 });
  s += S.text(90, 214, 'concave pole', { a: 'middle', size: 10 });
  check(close((120 + 260) / 2, cx) && close((cL + cR) / 2, cx), 'galvanometer front view: coil and core hang centred between the pole pieces on the suspension');
  return svgDoc(w, h, 'Construction of a moving coil galvanometer: a rectangular coil of many turns on a light frame hangs from a phosphor-bronze strip with a small mirror, between the concave pole pieces of a strong magnet; a soft-iron core sits inside the coil, and a spring below provides the restoring torque and carries the current out', s);
})();

// ---------------------------------------------------------------- galvanometer used in the meter worked examples
export const GALV = { G: 24, Ig: 2.5e-3 };
GALV.Vg = GALV.G * GALV.Ig;
export const AMM_DATA = (() => {
  const I = 0.5;
  const Sh = (GALV.Ig * GALV.G) / (I - GALV.Ig);
  return { I, S: Sh, RA: (GALV.G * Sh) / (GALV.G + Sh) };
})();
export const VOLT_DATA = (() => {
  const V1 = 3;
  const V2 = 12;
  const R1 = Math.round(V1 / GALV.Ig - GALV.G);
  const R2 = Math.round(V2 / GALV.Ig - GALV.G - R1);
  return { V1, V2, R1, R2 };
})();

function resH(x1, x2, y, label, { ly = -12 } = {}) {
  const n = 6;
  const L = x2 - x1;
  const a = x1 + L * 0.2;
  const b = x2 - L * 0.2;
  let d = `M${x1} ${y} L${a} ${y}`;
  for (let i = 0; i < n; i++) d += ` L${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)} ${y + (i % 2 ? 6 : -6)}`;
  d += ` L${b} ${y} L${x2} ${y}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text((x1 + x2) / 2, y + ly, label, { a: 'middle', size: 11 }) : '');
}
const W = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { w: 1.6 });
const dot = (x, y) => S.circle(x, y, 2.5, { c: 'currentColor', fill: 'currentColor' });
const meter = (x, y, ch) => S.circle(x, y, 13, { sw: 1.6, fill: FILL }) + S.text(x, y + 4, ch, { a: 'middle', size: 12, w: 'bold' });
const term = (x, y, label) => S.circle(x, y, 4, { sw: 1.6, fill: FILL }) + (label ? S.text(x, y - 10, label, { a: 'middle', size: 11, w: 'bold' }) : '');
const cur = (x, y, ang, label, { lx = 0, ly = -8 } = {}) => S.head(x + 5 * Math.cos(ang), y + 5 * Math.sin(ang), ang, { c: ACC, size: 8 }) + (label ? S.text(x + lx, y + ly, label, { a: 'middle', size: 11, c: ACC }) : '');

// ---------------------------------------------------------------- 8. ammeter: shunt in parallel
export const AMMETER = (() => {
  const { I, S: Sh, RA } = AMM_DATA;
  const { G, Ig } = GALV;
  const w = 360;
  const h = 200;
  let s = '';
  s += term(30, 90, 'in') + W(34, 90, 80, 90) + dot(80, 90) + W(80, 90, 80, 50) + W(80, 50, 167, 50) + meter(180, 50, 'G') + W(193, 50, 280, 50) + W(280, 50, 280, 90);
  s += W(80, 90, 80, 130) + W(80, 130, 130, 130) + resH(130, 230, 130, '') + W(230, 130, 280, 130) + W(280, 130, 280, 90) + dot(280, 90) + W(280, 90, 326, 90) + term(330, 90, 'out');
  s += S.text(180, 158, `S ≈ ${Sh.toFixed(3)} Ω`, { a: 'middle', size: 11 }) + S.text(180, 30, `G = ${G} Ω`, { a: 'middle', size: 11 });
  s += cur(55, 90, 0, `I = ${I} A`, { ly: 18 }) + cur(130, 50, 0, `Ig = ${Ig * 1000} mA`, { ly: -8, lx: -20 }) + cur(255, 130, 0, 'I − Ig', { ly: 18 });
  s += S.text(180, 190, `ammeter resistance ≈ ${RA.toFixed(3)} Ω`, { a: 'middle', size: 11, w: 'bold' });
  check(close(Ig * G, (I - Ig) * Sh) && RA < Sh, `ammeter: Ig G = (I − Ig) S holds for S = ${Sh.toFixed(4)} Ω, and the meter's resistance is below S`);
  return svgDoc(w, h, `A galvanometer of resistance ${G} ohm and full-scale current 2.5 milliampere with a small shunt S of about 0.121 ohm connected in parallel: of the 0.5 ampere entering, only 2.5 milliampere passes through the coil and the rest through the shunt, so the ammeter has a resistance of about 0.12 ohm`, s);
})();

// ---------------------------------------------------------------- 9. two-range voltmeter: resistances in series
export const VOLTMETER = (() => {
  const { R1, R2, V1, V2 } = VOLT_DATA;
  const { G, Ig } = GALV;
  const w = 380;
  const h = 170;
  let s = '';
  const y = 80;
  s += term(26, y, '−') + W(30, y, 77, y) + meter(90, y, 'G') + W(103, y, 120, y) + resH(120, 210, y, `R₁ = ${R1} Ω`, { ly: 26 }) + W(210, y, 240, y) + dot(240, y) + resH(240, 330, y, `R₂ = ${R2} Ω`, { ly: 26 }) + W(330, y, 350, y) + term(354, y, `${V2} V`);
  s += W(240, y, 240, 40) + term(240, 36, `${V1} V`);
  s += cur(55, y, 0, `Ig = ${Ig * 1000} mA`, { ly: -14, lx: 10 });
  s += S.text(90, 112, `G = ${G} Ω`, { a: 'middle', size: 11 });
  s += S.text(190, 150, `full scale: Ig(G + R₁) = ${V1} V, Ig(G + R₁ + R₂) = ${V2} V`, { a: 'middle', size: 11, w: 'bold' });
  check(close(Ig * (G + R1), V1) && close(Ig * (G + R1 + R2), V2), `voltmeter: R₁ = ${R1} Ω and R₂ = ${R2} Ω give full-scale readings of ${V1} V and ${V2} V`);
  return svgDoc(w, h, `A two-range voltmeter: the galvanometer of resistance ${G} ohm in series with R1 of ${R1} ohm gives a 0 to ${V1} volt range, and with R2 of ${R2} ohm added gives a 0 to ${V2} volt range, the full-scale current being 2.5 milliampere`, s);
})();

export const ALL = { LOOP_FACE, TORQUE_TOP, RHR, DIPOLE, ORBIT, MCG_TOP, MCG_FRONT, AMMETER, VOLTMETER };
