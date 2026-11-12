// ch14 diagrams, all drawn from numbers with self-checks: transverse and longitudinal waves, a snapshot of a travelling wave a
// little later, particle velocities along a wave, reflection of a pulse at a fixed and a free end, normal modes of a string, normal
// modes of open and closed pipes, and beats.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, columnModes, stringModes, interiorSwells, ddx } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const pathOf = (pts) => `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join(' L')}`;

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- WAVETYPES: transverse and longitudinal waves
export const WT_DATA = { x0: 30, step: 10, n: 36, lam: 120, A: 24, d: 12 };
export const WAVETYPES = (() => {
  const { x0, step, n, lam, A, d } = WT_DATA;
  const w = 420;
  const h = 336;
  const k = (2 * PI) / lam;
  const base = 78;
  const base2 = 244;
  let s = S.text(10, 16, 'Transverse wave (rope): particles move up and down', { size: 11, w: 'bold' });
  const rest = Array.from({ length: n }, (_, i) => x0 + i * step);
  const tr = rest.map((x) => [x, base - A * Math.sin(k * (x - x0))]);
  s += S.line(x0 - 10, base, x0 + (n - 1) * step + 10, base, { c: MUT, w: 1, dash: '4 3' });
  s += S.path(pathOf(tr), { c: BLUE, w: 1.2, op: 0.5 });
  for (const [x, y] of tr) s += S.circle(x, y, 2.6, { c: BLUE, fill: BLUE, fop: 0.6, sw: 1 });
  const crestX = x0 + lam / 4;
  const troughX = x0 + (3 * lam) / 4;
  s += S.text(crestX, base - A - 8, 'crest', { a: 'middle', size: 10, c: RED, w: 'bold' }) + S.text(troughX, base + A + 16, 'trough', { a: 'middle', size: 10, c: RED, w: 'bold' });
  s += S.arrow(crestX + lam, base - A - 26, crestX + lam + 46, base - A - 26, { c: ACC, w: 1.8, size: 7 }) + S.text(crestX + lam + 52, base - A - 22, 'wave travels', { size: 10, c: ACC, w: 'bold' });
  s += S.arrow(x0 + 7 * step, base + 4, x0 + 7 * step, base - 20, { c: GRN, w: 1.6, size: 6 }) + S.arrow(x0 + 7 * step, base + 4, x0 + 7 * step, base + 20, { c: GRN, w: 1.6, size: 6 });
  s += S.text(x0 + 7 * step + 6, base + A + 66, 'a particle oscillates at right angles to the travel direction', { size: 10, c: GRN });
  // wavelength bracket between two crests
  s += S.arrow(crestX + lam / 2, base + A + 30, crestX, base + A + 30, { w: 1.1, size: 5 }) + S.arrow(crestX + lam / 2, base + A + 30, crestX + lam, base + A + 30, { w: 1.1, size: 5 }) + S.text(crestX + lam / 2, base + A + 44, 'λ (crest to crest)', { a: 'middle', size: 10 });
  // longitudinal
  s += S.text(10, base2 - 56, 'Longitudinal wave (spring or air): particles move along the line', { size: 11, w: 'bold' });
  const lg = rest.map((x) => x + d * Math.sin(k * (x - x0)));
  for (const x of lg) s += S.line(x, base2 - 16, x, base2 + 16, { c: BLUE, w: 2, cap: 'round' });
  const comp = [x0 + lam / 2, x0 + (3 * lam) / 2, x0 + (5 * lam) / 2];
  const rare = [x0 + lam, x0 + 2 * lam];
  for (const c of comp) s += S.text(c, base2 - 24, 'C', { a: 'middle', size: 11, c: RED, w: 'bold' });
  for (const c of rare) s += S.text(c, base2 - 24, 'R', { a: 'middle', size: 11, c: GRN, w: 'bold' });
  s += S.text(10, base2 + 40, 'C compression (close together)   R rarefaction (spread out)', { size: 10, c: MUT });
  s += S.arrow(comp[0], base2 + 58, comp[1], base2 + 58, { w: 1.1, size: 5 }) + S.arrow(comp[1], base2 + 58, comp[0], base2 + 58, { w: 1.1, size: 5 }) + S.text((comp[0] + comp[1]) / 2, base2 + 72, 'λ (compression to compression)', { a: 'middle', size: 10 });
  s += S.arrow(x0 + 2.5 * lam + 20, base2 + 36, x0 + 2.5 * lam + 64, base2 + 36, { c: ACC, w: 1.8, size: 7 }) + S.text(x0 + 2.5 * lam + 20, base2 + 30, 'wave travels', { size: 10, c: ACC, w: 'bold' });
  // checks
  const crests = tr.filter(([, y], i) => y < base - A + 0.01 && i > 0).map(([x]) => x);
  const gaps = lg.slice(1).map((x, i) => x - lg[i]);
  const gmin = Math.min(...gaps);
  const gmax = Math.max(...gaps);
  const minIdx = gaps.map((g, i) => [g, i]).filter(([g]) => g < step * 0.5).map(([, i]) => (lg[i] + lg[i + 1]) / 2);
  const okT = tr.every(([x], i) => x === rest[i]) && crests.length >= 2 && near(crests[1] - crests[0], lam, 1e-9);
  const okL = gmin < step && gmax > step && Math.abs(minIdx[0] - comp[0]) <= step && gaps.every((g) => g > 0);
  const okLy = near(lg[0] - rest[0], d * Math.sin(0), 1) && lg.every((x, i) => Math.abs(x - rest[i]) <= d + 1e-9);
  check(okT && okL && okLy && d * k < 1 && lg.at(-1) < w - 10, `wave-types: transverse particles keep their x (only y changes), crests ${lam} px apart = λ; longitudinal particles keep one line (x shifts by at most ${d} px), closest spacing ${f1(gmin)} px at the compressions (about ${f1(minIdx[0])} px, labelled C) and widest ${f1(gmax)} px, spacing never negative (d k = ${(d * k).toFixed(2)} < 1)`);
  return svgDoc(w, h, 'Two wave types drawn from the same sine rule: a transverse wave on a rope with crests and troughs, where each particle moves up and down at right angles to the direction of travel; and a longitudinal wave in a spring or air, where particles move back and forth along the direction of travel, bunching into compressions and spreading into rarefactions', s);
})();

// ---------------------------------------------------------------- SNAP: y(x, 0) and y(x, T/8) for a wave moving right
export const SNAP_DATA = { x0: 40, lam: 160, A: 50, base: 120, frac: 1 / 8 };
export const SNAP = (() => {
  const { x0, lam, A, base, frac } = SNAP_DATA;
  const w = 420;
  const h = 266;
  const k = (2 * PI) / lam;
  const y = (x, ph) => A * Math.sin(k * (x - x0) - ph);
  const ph = 2 * PI * frac; // omega t
  const xs = Array.from({ length: 181 }, (_, i) => x0 + (i * 360) / 180);
  let s = S.arrow(x0 - 6, base, 412, base, { w: 1.2, size: 6 }) + S.text(406, base + 14, 'x', { size: 10, it: true });
  s += S.path(pathOf(xs.map((x) => [x, base - y(x, 0)])), { c: BLUE, w: 2 });
  s += S.path(pathOf(xs.map((x) => [x, base - y(x, ph)])), { c: RED, w: 2, dash: '6 4' });
  // crests: first curve at x0 + lam/4, second shifted by lam*frac
  const c1 = x0 + lam / 4;
  const c2 = c1 + lam * frac;
  s += S.line(c1, base - A, c1, base - A - 18, { c: BLUE, w: 1 }) + S.line(c2, base - A, c2, base - A - 18, { c: RED, w: 1 });
  s += S.arrow(c1, base - A - 14, c2, base - A - 14, { c: ACC, w: 1.6, size: 6 }) + S.text(c1 - 6, base - A - 20, 'v Δt = λ/8', { a: 'end', size: 10, c: ACC, w: 'bold' });
  s += S.text(300, 22, 't = 0 (solid)', { size: 10, c: BLUE, w: 'bold' }) + S.text(300, 36, 't = T/8 (dashed)', { size: 10, c: RED, w: 'bold' });
  // wavelength between two crests (blue)
  const wy = base + A + 74;
  s += S.arrow(c1 + lam / 2, wy, c1, wy, { w: 1.1, size: 5 }) + S.arrow(c1 + lam / 2, wy, c1 + lam, wy, { w: 1.1, size: 5 }) + S.text(c1 + lam / 2, wy + 14, 'wavelength λ', { a: 'middle', size: 10 });
  // amplitude
  s += S.line(x0 + 3 * lam + 18, base, x0 + 3 * lam + 18, base - A, { c: MUT, w: 1 });
  // one particle at x0: moves down
  const py0 = base - y(x0, 0);
  const py1 = base - y(x0, ph);
  s += S.circle(x0, py0, 4, { c: BLUE, fill: BLUE, fop: 0.5 }) + S.circle(x0, py1, 4, { c: RED, fill: RED, fop: 0.5 }) + S.arrow(x0 + 12, py0 + 2, x0 + 12, py1 - 4, { c: GRN, w: 1.5, size: 6 });
  s += S.text(x0 + 20, base + A + 24, 'this particle moves down,', { size: 10, c: GRN }) + S.text(x0 + 20, base + A + 37, 'it does not travel along', { size: 10, c: GRN });
  s += S.text(x0 + 3 * lam + 14, base - A / 2, 'a', { a: 'end', size: 11, it: true });
  // checks
  const argmax = (f) => xs.reduce((best, x) => (f(x) > f(best) ? x : best), xs[0]);
  const m1 = argmax((x) => (x < x0 + lam ? y(x, 0) : -1e9));
  const m2 = argmax((x) => (x < x0 + lam ? y(x, ph) : -1e9));
  const okShift = near(m2 - m1, lam * frac, 0.06) && near(c2 - c1, lam * frac, 1e-9);
  const okDown = py1 > py0 && near(y(x0, ph), -A * Math.sin(PI / 4), 1e-9);
  const okA = near(Math.max(...xs.map((x) => y(x, 0))), A, 1e-3);
  check(okShift && okDown && okA, `snapshot: crest moves ${f1(m2 - m1)} px (= λ/8 = ${lam * frac} px) in T/8, so v = λ/T; amplitude ${A} px; the particle at x = 0 goes from 0 to ${f1(y(x0, ph))} (down) while the shape moves right`);
  return svgDoc(w, h, 'Two snapshots of a sine wave travelling to the right, one at time zero and one an eighth of a period later: the whole shape shifts right by an eighth of a wavelength, while a single particle only moves up or down', s);
})();

// ---------------------------------------------------------------- PVEL: particle velocities along a wave
export const PVEL_DATA = { x0: 40, lam: 160, A: 40, base: 120, omega: 1 };
export const PVEL = (() => {
  const { x0, lam, A, base, omega } = PVEL_DATA;
  const w = 420;
  const h = 226;
  const k = (2 * PI) / lam;
  const Y = (x, t) => A * Math.sin(k * (x - x0) - omega * t);
  const xs = Array.from({ length: 181 }, (_, i) => x0 + (i * 360) / 180);
  let s = S.line(x0 - 6, base, 410, base, { c: MUT, w: 1 });
  s += S.path(pathOf(xs.map((x) => [x, base - Y(x, 0)])), { c: BLUE, w: 2 });
  const pts = Array.from({ length: 9 }, (_, j) => x0 + (j * lam) / 8);
  const sc = 0.55; // arrow length per unit velocity (A omega = 40 px)
  const arrows = [];
  pts.forEach((x, j) => {
    const vy = ddx((t) => Y(x, t), 0); // velocity, up positive: numerical derivative of the displacement
    arrows.push({ j, x, vy });
    const py = base - Y(x, 0);
    s += S.circle(x, py, 3, { c: BLUE, fill: BLUE, fop: 0.7, sw: 1 });
    if (Math.abs(vy) > 0.5) s += S.arrow(x, py, x, py - vy * sc, { c: RED, w: 1.8, size: 6 });
  });
  s += S.arrow(x0 + 1.5 * lam, 24, x0 + 1.5 * lam + 58, 24, { c: ACC, w: 2, size: 8 }) + S.text(x0 + 1.5 * lam, 16, 'wave velocity v', { size: 10, c: ACC, w: 'bold' });
  s += S.text(x0, 200, 'red arrows: velocity of each particle at t = 0 (up or down), zero at crests and troughs', { size: 10, c: RED });
  s += S.text(x0, 215, 'largest at the middle, where the string passes through its rest position', { size: 10, c: MUT });
  // checks: analytic -A omega cos(k (x - x0)); max |v| = A omega at zero crossings; zero at crest/trough
  const okAnalytic = arrows.every(({ x, vy }) => near(vy, -A * omega * Math.cos(k * (x - x0)), 1e-6) || Math.abs(vy + A * omega * Math.cos(k * (x - x0))) < 1e-6);
  const crest = arrows.find((a) => near(a.x, x0 + lam / 4, 1e-9));
  const zero = arrows.find((a) => near(a.x, x0, 1e-9));
  const okEx = Math.abs(crest.vy) < 1e-6 && near(Math.abs(zero.vy), A * omega, 1e-6) && Math.abs(Math.max(...arrows.map((a) => Math.abs(a.vy))) - A * omega) < 1e-6;
  // a point just right of a crest is moving up (the crest is about to arrive): sign check
  const right = ddx((t) => Y(x0 + lam / 4 + 10, t), 0);
  check(okAnalytic && okEx && right > 0, `particle velocity: numerical d y/d t equals −A ω cos(kx) at all 9 points; zero at the crest, ±A ω = ${A * omega} at the rest position; a point just right of a crest moves up toward it, as it must for a wave moving right`);
  return svgDoc(w, h, 'A wave moving to the right with arrows showing the up or down velocity of particles at nine points: zero at the crests and troughs, greatest where a particle crosses its rest position, so particle velocity and wave velocity are different things', s);
})();

// ---------------------------------------------------------------- REFLECT: a pulse reflected at a fixed end and at a free end
export const REFLECT_DATA = { len: 170, hgt: 17, wid: 14, shift: 90 };
export const REFLECT = (() => {
  const { len, hgt, wid, shift } = REFLECT_DATA;
  const w = 420;
  const h = 330;
  const f = (u) => hgt * Math.exp(-((u / wid) ** 2));
  const total = (sign, x, c, XW) => f(x - c) + sign * f(2 * XW - x - c); // sign −1 fixed end, +1 free end
  let s = '';
  const rowsY = [80, 170, 260];
  const labels = ['before: pulse travelling right', 'pulse arrives at the end', 'after: reflected pulse travelling left'];
  const panels = [
    { name: 'Fixed end (string tied to a wall)', XW: 190, sign: -1 },
    { name: 'Free end (ring sliding on a rod)', XW: 410, sign: 1 },
  ];
  const ok = { fixedZero: true, freeSlope: true, signs: {} };
  panels.forEach((P, pi) => {
    const X0 = P.XW - len;
    s += S.text(X0 - 6, 18, P.name, { size: 11, w: 'bold' });
    rowsY.forEach((by, ri) => {
      const c = P.XW - shift + shift * ri;
      const pts = [];
      for (let x = X0; x <= P.XW + 0.01; x += 2) pts.push([x, by - total(P.sign, x, c, P.XW)]);
      s += S.line(X0, by, P.XW, by, { c: MUT, w: 1, dash: '4 3' });
      s += S.path(pathOf(pts), { c: pi === 0 ? BLUE : GRN, w: 2 });
      if (pi === 0) s += S.text(X0 - 6, by - 40, labels[ri], { size: 10, c: MUT });
      if (ri === 0) s += S.arrow(X0 + 28, by + 14, X0 + 66, by + 14, { c: ACC, w: 1.4, size: 5 });
      if (ri === 2) s += S.arrow(X0 + 66, by + 14, X0 + 28, by + 14, { c: ACC, w: 1.4, size: 5 });
    });
    if (pi === 0) {
      s += S.line(P.XW, 50, P.XW, 290, { c: RED, w: 5 });
      for (let yy = 56; yy < 290; yy += 14) s += S.line(P.XW, yy + 12, P.XW + 9, yy, { c: RED, w: 1 });
    } else {
      s += S.line(P.XW, 50, P.XW, 290, { c: MUT, w: 2 });
      // the ring rides on the rod with the free end of the string, so it is drawn at the end's displacement in each row
      rowsY.forEach((by, ri) => (s += S.circle(P.XW, by - total(P.sign, P.XW, P.XW - shift + shift * ri, P.XW), 4, { c: GRN, sw: 1.8 })));
    }
    // checks
    for (let t = 0; t <= 2 * shift; t += 5) {
      const c = P.XW - shift + t;
      if (P.sign === -1 && Math.abs(total(-1, P.XW, c, P.XW)) > 1e-9) ok.fixedZero = false;
      if (P.sign === 1 && Math.abs(ddx((x) => total(1, x, c, P.XW), P.XW - 1e-3, 1e-4)) > 1e-3) ok.freeSlope = false;
    }
    const after = Array.from({ length: 171 }, (_, i) => total(P.sign, P.XW - len + i, P.XW + shift, P.XW));
    ok.signs[P.sign] = after.reduce((m, v) => (Math.abs(v) > Math.abs(m) ? v : m), 0);
  });
  const mid = (sg) => Array.from({ length: 171 }, (_, i) => total(sg, 190 - len + i, 190, 190));
  const flat = mid(-1).every((v) => Math.abs(v) < 1e-9);
  const dbl = Math.max(...mid(1)) > 1.99 * hgt;
  check(ok.fixedZero && ok.freeSlope && ok.signs[-1] < -0.98 * hgt && ok.signs[1] > 0.98 * hgt && flat && dbl, `reflection: fixed end has zero displacement at all times and returns the pulse inverted (peak ${f1(ok.signs[-1])}); free end has zero slope and returns it upright (peak ${f1(ok.signs[1])}); at the instant of arrival the fixed-end string is flat and the free-end pulse is twice as tall`);
  return svgDoc(w, h, 'A pulse travelling to the right and reflecting at the end of a string, shown at three moments for each end: tied to a wall, the reflected pulse comes back upside down; at a free end, it comes back the same way up', s);
})();

// ---------------------------------------------------------------- STRINGMODES: normal modes of a string fixed at both ends
export const SM_DATA = { x0: 70, L: 280, A: 20, rows: [1, 2, 3, 4], dy: 66, top: 44 };
export const STRINGMODES = (() => {
  const { x0, L, A, rows, dy, top } = SM_DATA;
  const w = 420;
  const h = 336;
  let s = S.text(10, 16, 'String of length L, fixed at both ends: normal modes', { size: 11, w: 'bold' });
  const info = [];
  rows.forEach((n, i) => {
    const by = top + i * dy + 22;
    const up = [];
    const dn = [];
    for (let j = 0; j <= 140; j++) {
      const u = j / 140;
      up.push([x0 + u * L, by - A * Math.sin(n * PI * u)]);
      dn.push([x0 + u * L, by + A * Math.sin(n * PI * u)]);
    }
    s += S.path(pathOf(up), { c: BLUE, w: 1.8 }) + S.path(pathOf(dn), { c: BLUE, w: 1.8, dash: '5 3' });
    const nodes = Array.from({ length: n + 1 }, (_, j) => x0 + (j * L) / n);
    for (const x of nodes) s += S.circle(x, by, 3.2, { c: RED, fill: RED, fop: 0.8, sw: 1 });
    s += S.text(x0 - 10, by + 4, `n = ${n}`, { a: 'end', size: 11, w: 'bold' });
    s += S.text(x0 + L + 10, by - 4, n === 1 ? 'f = f₁' : `f = ${n} f₁`, { size: 10, w: 'bold' }) + S.text(x0 + L + 10, by + 10, n === 1 ? 'L = λ/2' : n === 2 ? 'L = λ' : `L = ${n}λ/2`, { size: 10, c: MUT });
    info.push({ n, nodes, by });
  });
  s += S.text(x0, top + rows.length * dy + 14, 'red dots: nodes (no motion); solid and dashed: the two extreme shapes', { size: 10, c: MUT });
  // checks
  const lamsOk = info.every(({ n, nodes }) => near(nodes[1] - nodes[0], L / n, 1e-9) && near(2 * (nodes[1] - nodes[0]), (2 * L) / n, 1e-9));
  const interior = info.every(({ n }) => {
    let signChanges = 0;
    let prev = Math.sign(Math.sin(n * PI * 0.0005));
    for (let j = 1; j <= 4000; j++) {
      const sg = Math.sign(Math.sin(n * PI * (0.0005 + (j / 4001) * 0.999)));
      if (sg !== 0 && sg !== prev) signChanges++;
      prev = sg;
    }
    return signChanges === n - 1;
  });
  const ends = info.every(({ n }) => Math.abs(Math.sin(n * PI * 0)) < 1e-12 && Math.abs(Math.sin(n * PI * 1)) < 1e-9);
  const modes = stringModes(L, 1, 4);
  const ratio = modes.every((f, i) => near(f / modes[0], i + 1, 1e-6));
  check(lamsOk && interior && ends && ratio, `string-modes: modes n = 1..4 have n−1 interior nodes, nodes ${L}/n px apart (= λ/2, λ = 2L/n), both ends nodes; root-finding sin(kL) = 0 gives frequencies in the ratio 1 : 2 : 3 : 4`);
  return svgDoc(w, h, 'The first four normal modes of a string fixed at both ends: one, two, three and four loops, with nodes at the ends and n minus one nodes between them; the wavelength is two L over n and the frequency is n times the fundamental', s);
})();

// ---------------------------------------------------------------- PIPES: normal modes of open and closed pipes
export const PIPES_DATA = { L: 150, ox: 24, cx: 236, H: 18, rows: 3, dy: 92, top: 56 };
export const PIPES = (() => {
  const { L, ox, cx, H, rows, dy, top } = PIPES_DATA;
  const w = 420;
  const h = 336;
  let s = S.text(ox, 16, 'Open pipe (both ends open)', { size: 11, w: 'bold' }) + S.text(cx, 16, 'Closed pipe (right end shut)', { size: 11, w: 'bold' });
  const open = (n) => (x) => Math.cos((n * PI * x) / L); // displacement amplitude, x measured from the left (open) end
  const closed = (n) => (x) => Math.cos(((2 * n - 1) * PI * x) / (2 * L));
  const oLab = ['1st harmonic, f₁: L = λ/2', '2nd harmonic, 2f₁: L = λ', '3rd harmonic, 3f₁: L = 3λ/2'];
  const cLab = ['1st harmonic, f₁: L = λ/4', '3rd harmonic, 3f₁: L = 3λ/4', '5th harmonic, 5f₁: L = 5λ/4'];
  const nodeCount = (g) => {
    let c = 0;
    let prev = Math.sign(g(0.0005));
    for (let j = 1; j <= 4000; j++) {
      const x = 0.0005 + (j / 4001) * (L - 0.001);
      const sg = Math.sign(g(x));
      if (sg !== 0 && sg !== prev) c++;
      prev = sg;
    }
    return c;
  };
  const rec = { open: [], closed: [] };
  for (let i = 0; i < rows; i++) {
    const cy = top + i * dy;
    for (const [kind, x0, g, lab] of [['open', ox, open(i + 1), oLab[i]], ['closed', cx, closed(i + 1), cLab[i]]]) {
      const up = [];
      const dn = [];
      for (let j = 0; j <= 120; j++) {
        const x = (j / 120) * L;
        up.push([x0 + x, cy - H * g(x)]);
        dn.push([x0 + x, cy + H * g(x)]);
      }
      s += S.line(x0, cy - H - 8, x0 + L, cy - H - 8, { c: MUT, w: 1.5 }) + S.line(x0, cy + H + 8, x0 + L, cy + H + 8, { c: MUT, w: 1.5 });
      if (kind === 'closed') s += S.line(x0 + L, cy - H - 8, x0 + L, cy + H + 8, { c: RED, w: 4 });
      s += S.path(pathOf(up), { c: BLUE, w: 1.8 }) + S.path(pathOf(dn), { c: BLUE, w: 1.8, dash: '5 3' });
      s += S.text(x0 + L / 2, cy + H + 24, lab, { a: 'middle', size: 10, w: 'bold' });
      rec[kind].push({ x0, cy, g, n: i + 1 });
    }
  }
  s += S.text(ox, top + rows * dy - 24, 'ends: open = antinode (A), closed = node (N)', { size: 10, c: MUT });
  s += S.text(cx, top + rows * dy - 24, 'only odd harmonics: 1, 3, 5', { size: 10, c: MUT });
  // checks
  const fo = columnModes('open', 1, 1, 3);
  const fc = columnModes('closed', 1, 1, 3);
  const okRatio = fo.every((f, i) => near(f / fo[0], i + 1, 1e-6)) && fc.every((f, i) => near(f / fc[0], 2 * i + 1, 1e-6)) && near(fc[0], fo[0] / 2, 1e-6);
  const okOpenEnds = rec.open.every(({ g }) => near(Math.abs(g(0)), 1, 1e-12) && near(Math.abs(g(L)), 1, 1e-9));
  const okClosedEnds = rec.closed.every(({ g }) => near(Math.abs(g(0)), 1, 1e-12) && Math.abs(g(L)) < 1e-9);
  const okNodes = rec.open.every(({ g, n }) => nodeCount(g) === n) && rec.closed.every(({ g, n }) => nodeCount(g) === n - 1);
  const okLam = rec.open.every(({ n }) => near(L / ((2 * L) / n), n / 2, 1e-12)) && rec.closed.every(({ n }) => near(L / ((4 * L) / (2 * n - 1)), (2 * n - 1) / 4, 1e-12));
  check(okRatio && okOpenEnds && okClosedEnds && okNodes && okLam, `pipes: boundary-condition roots give open pipe 1 : 2 : 3 and closed pipe 1 : 3 : 5, closed fundamental = half the open one; open ends are displacement antinodes, the closed end a node; interior nodes n (open) and n−1 (closed); L = n λ/2 (open) and (2n−1) λ/4 (closed)`);
  return svgDoc(w, h, 'Displacement patterns in an open pipe, whose three lowest modes fit one half, two halves and three halves of a wavelength in the pipe, and in a pipe closed at the right end, whose three lowest modes fit one quarter, three quarters and five quarters of a wavelength', s);
})();

// ---------------------------------------------------------------- BEATS: two close frequencies and their sum
export const BEATS_DATA = { f1: 9, f2: 12, x0: 40, W: 340, a: 18, rate: 240 };
export const BEATS = (() => {
  const { f1: fa, f2: fb, x0, W, a, rate } = BEATS_DATA;
  const w = 420;
  const h = 300;
  const N = rate;
  const t = (j) => j / N;
  const X = (j) => x0 + (W * j) / N;
  const y1 = (j) => Math.cos(2 * PI * fa * t(j));
  const y2 = (j) => Math.cos(2 * PI * fb * t(j));
  const base1 = 62;
  const base2 = 196;
  let s = S.text(x0, 16, 'Two notes: 9 and 12 vibrations per second (time axis 1 s)', { size: 11, w: 'bold' });
  const idx = Array.from({ length: N + 1 }, (_, j) => j);
  s += S.line(x0, base1, x0 + W, base1, { c: MUT, w: 1 });
  s += S.path(pathOf(idx.map((j) => [X(j), base1 - a * y1(j)])), { c: BLUE, w: 1.6 }) + S.path(pathOf(idx.map((j) => [X(j), base1 - a * y2(j)])), { c: RED, w: 1.6 });
  s += S.text(x0 + W + 6, base1 - 8, '9 Hz', { size: 10, c: BLUE, w: 'bold' }) + S.text(x0 + W + 6, base1 + 6, '12 Hz', { size: 10, c: RED, w: 'bold' });
  s += S.text(x0, base2 - 2 * a - 24, 'Their sum: loud, soft, loud … (envelope dashed)', { size: 11, w: 'bold' });
  s += S.line(x0, base2, x0 + W, base2, { c: MUT, w: 1 });
  const env = (j) => 2 * Math.abs(Math.cos(PI * (fb - fa) * t(j)));
  s += S.path(pathOf(idx.map((j) => [X(j), base2 - a * (y1(j) + y2(j))])), { c: ACC, w: 1.4 });
  s += S.path(pathOf(idx.map((j) => [X(j), base2 - a * env(j)])), { c: MUT, w: 1.2, dash: '4 3' }) + S.path(pathOf(idx.map((j) => [X(j), base2 + a * env(j)])), { c: MUT, w: 1.2, dash: '4 3' });
  const fbeat = fb - fa;
  const peaks = Array.from({ length: fbeat + 1 }, (_, k) => k / fbeat);
  for (const tp of peaks) s += S.line(x0 + W * tp, base2 + 2 * a + 4, x0 + W * tp, base2 + 2 * a + 16, { c: RED, w: 1.5 });
  s += S.arrow(x0 + W / fbeat / 2, base2 + 2 * a + 12, x0, base2 + 2 * a + 12, { w: 1, size: 5 }) + S.arrow(x0 + W / fbeat / 2, base2 + 2 * a + 12, x0 + W / fbeat, base2 + 2 * a + 12, { w: 1, size: 5 });
  s += S.text(x0 + W / fbeat / 2, base2 + 2 * a + 28, 'beat period = 1/3 s', { a: 'middle', size: 10, c: RED, w: 'bold' });
  s += S.text(x0, base2 + 2 * a + 46, 'loud swells per second = 12 − 9 = 3 (beat frequency)', { size: 10, w: 'bold' });
  // checks: independent count of swells in the sampled sum, and the peak of the sum
  const swells = interiorSwells(fa, fb, 1);
  const sumMax = Math.max(...Array.from({ length: 20001 }, (_, j) => Math.abs(Math.cos(2 * PI * fa * (j / 20000)) + Math.cos(2 * PI * fb * (j / 20000)))));
  const nearZeroNeeded = Math.min(...idx.filter((j) => Math.abs(t(j) - 1 / 6) < 0.01).map((j) => Math.abs(y1(j) + y2(j))));
  const okEnv = idx.every((j) => Math.abs(y1(j) + y2(j)) <= env(j) + 1e-9);
  check(swells === fbeat - 1 && sumMax > 1.98 && nearZeroNeeded < 0.2 && okEnv && near(1 / fbeat, 1 / 3, 1e-12), `beats: counting swells in a sampled sum of ${fa} Hz and ${fb} Hz over one second finds ${swells} interior swells (one fewer than the ${fb} − ${fa} = ${fbeat} per second, since the swells at the two ends of the second are not counted); sum peaks at ${sumMax.toFixed(2)} (≈ 2 a) and is near zero at t = 1/6 s; the sum stays inside the envelope 2a|cos(π(f₂ − f₁)t)|`);
  return svgDoc(w, h, 'Beats from two notes of nearly equal frequency, nine and twelve vibrations per second: the top graph shows the two waves and the lower graph their sum, which swells to twice the single amplitude and fades to nearly nothing three times every second; the dashed envelope marks the swells', s);
})();

export const ALL = { WAVETYPES, SNAP, PVEL, REFLECT, STRINGMODES, PIPES, BEATS };
