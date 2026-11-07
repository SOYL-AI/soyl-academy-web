// SVG diagrams for ICSE 9 Physics ch02: distance-time and velocity-time graphs (computed from calc.mjs), path diagrams,
// the graphical derivation figure (named and lettered), free fall and a vertical throw. Geometry is computed and self-checked.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { DT, VT, fallS } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const num = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** Graph frame: returns drawing parts and the data-to-pixel maps. */
function frame({ W = 400, H = 280, xMax, yMax, xStep, yStep, xl, yl, grid = true }) {
  const L = 54;
  const R = 18;
  const T = 24;
  const B = 44;
  const pw = W - L - R;
  const ph = H - T - B;
  const x = (v) => L + (v / xMax) * pw;
  const y = (v) => T + ph - (v / yMax) * ph;
  const p = [];
  for (let v = 0; v <= xMax + 1e-9; v += xStep) {
    if (grid) p.push(S.line(x(v), T, x(v), T + ph, { c: MUT, w: 0.5, dash: '2 3' }));
    p.push(lab(x(v), T + ph + 15, num(v), { a: 'middle' }));
  }
  for (let v = 0; v <= yMax + 1e-9; v += yStep) {
    if (grid) p.push(S.line(L, y(v), L + pw, y(v), { c: MUT, w: 0.5, dash: '2 3' }));
    p.push(lab(L - 6, y(v) + 4, num(v), { a: 'end' }));
  }
  p.push(S.arrow(L, T + ph, L + pw + 8, T + ph, { w: 1.6, size: 6 }), S.arrow(L, T + ph, L, T - 10, { w: 1.6, size: 6 }));
  p.push(lab(L + pw / 2, H - 6, xl, { a: 'middle', size: 12, w: 'bold' }), lab(L + 4, 12, yl, { size: 12, w: 'bold' }));
  return { p, x, y, L, T, pw, ph, W, H };
}
const poly = (f, pts) => pts.map(([a, b]) => [f.x(a), f.y(b)]);

// ---------------------------------------------------------------- distance-time graph of a toy car (lettered O, A, B, C)
function dtGraph({ lettered }) {
  const f = frame({ xMax: 14, yMax: 70, xStep: 2, yStep: 10, xl: 'time t (s)', yl: 'distance (m)' });
  const p = [...f.p];
  const pts = poly(f, DT);
  p.push(S.path(`M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L')}`, { c: BLUE, w: 2.2, join: 'round' }));
  if (lettered) {
    const names = ['O', 'A', 'B', 'C'];
    DT.forEach(([a, b], i) => {
      p.push(S.circle(f.x(a), f.y(b), 3.4, { fill: RED, c: RED }));
      p.push(lab(f.x(a) + (i === 0 ? -20 : 8), f.y(b) + (i === 0 ? -12 : -8), names[i], { size: 14, w: 'bold', c: RED }));
    });
  }
  check(Math.abs((pts[1][1] - pts[2][1])) < 1e-9 && pts[3][1] < pts[2][1], 'd-t graph: AB is horizontal (at rest) and BC rises (moving again)');
  return svgDoc(f.W, f.H, 'Distance against time for a toy car: a straight line from O (0 s, 0 m) to A (4 s, 20 m), a horizontal line from A to B (8 s, 20 m), then a steeper straight line from B to C (12 s, 60 m). The points O, A, B and C are lettered', p.join(''));
}
export const DT_FIG = dtGraph({ lettered: true });

// ---------------------------------------------------------------- v-t graph of a tram, with or without the areas
function vtGraph({ areas }) {
  const f = frame({ xMax: 14, yMax: 14, xStep: 2, yStep: 2, xl: 'time t (s)', yl: 'velocity (m/s)' });
  const p = [...f.p];
  const pts = poly(f, VT);
  if (areas) {
    p.push(`<polygon points="${poly(f, [[0, 0], [6, 12], [6, 0]]).map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="${BLUE}" fill-opacity="0.2" stroke="none"/>`);
    p.push(`<polygon points="${poly(f, [[6, 0], [6, 12], [10, 12], [10, 0]]).map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="${GREEN}" fill-opacity="0.2" stroke="none"/>`);
    p.push(`<polygon points="${poly(f, [[10, 0], [10, 12], [13, 0]]).map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="${RED}" fill-opacity="0.2" stroke="none"/>`);
    p.push(lab(f.x(4), f.y(3), 'S₁', { a: 'middle', size: 12, w: 'bold' }), lab(f.x(8), f.y(5), 'S₂', { a: 'middle', size: 12, w: 'bold' }), lab(f.x(10.8), f.y(3), 'S₃', { a: 'middle', size: 12, w: 'bold' }));
  }
  p.push(S.path(`M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L')}`, { c: BLUE, w: 2.2, join: 'round' }));
  check(VT[1][1] === VT[2][1] && VT[0][1] === 0 && VT[3][1] === 0, 'v-t graph: speeds up from rest, constant in the middle, ends at rest');
  return svgDoc(f.W, f.H, `Velocity against time for a tram: a straight line from the origin to (6 s, 12 m/s), a horizontal line to (10 s, 12 m/s), then a straight line down to (13 s, 0)${areas ? '. The area under the graph is split into a triangle S1, a rectangle S2 and a triangle S3' : ''}`, p.join(''));
}
export const VT_FIG = vtGraph({ areas: false });
export const VT_AREAS = vtGraph({ areas: true });

// ---------------------------------------------------------------- the standard shapes (d-t and v-t sets)
function shapes(kind) {
  const p = [];
  const W = 570;
  const pw = 150;
  const ph = 110;
  const panel = (i, title, draw, caption) => {
    const ox = 20 + i * 185;
    const oy = 150;
    p.push(S.arrow(ox, oy, ox + pw, oy, { w: 1.4, size: 6 }), S.arrow(ox, oy, ox, oy - ph - 8, { w: 1.4, size: 6 }));
    p.push(lab(ox + pw, oy + 14, 't', { a: 'end', size: 12, w: 'bold' }), lab(ox + 4, oy - ph - 10, kind === 'dt' ? 'distance' : 'velocity', { size: 11, w: 'bold' }));
    p.push(draw(ox, oy));
    p.push(lab(ox + 4, oy + 32, title, { size: 12, w: 'bold' }), lab(ox + 4, oy + 47, caption, { size: 11, c: MUT }));
  };
  const line = (ox, oy, x1, y1, x2, y2) => S.path(`M${ox + x1} ${oy - y1} L${ox + x2} ${oy - y2}`, { c: BLUE, w: 2.4 });
  if (kind === 'dt') {
    panel(0, 'At rest', (ox, oy) => line(ox, oy, 0, 50, 140, 50), 'horizontal line');
    panel(1, 'Uniform speed', (ox, oy) => line(ox, oy, 0, 0, 140, 95), 'straight line, slope = speed');
    panel(2, 'Variable speed', (ox, oy) => S.path(`M${ox} ${oy} Q${ox + 80} ${oy - 5} ${ox + 140} ${oy - 100}`, { c: BLUE, w: 2.4 }), 'curve, slope changes');
  } else {
    panel(0, 'Uniform velocity', (ox, oy) => line(ox, oy, 0, 60, 140, 60), 'horizontal line');
    panel(1, 'Uniform acceleration', (ox, oy) => line(ox, oy, 0, 0, 140, 95), 'straight line up, slope = a');
    panel(2, 'Uniform retardation', (ox, oy) => line(ox, oy, 0, 95, 140, 10), 'straight line down');
  }
  return svgDoc(W, 215, kind === 'dt' ? 'Three distance against time graphs: a horizontal line for a body at rest, a straight sloping line for uniform speed and a curve for variable speed' : 'Three velocity against time graphs: a horizontal line for uniform velocity, a straight line sloping up from the origin for uniform acceleration and a straight line sloping down for uniform retardation', p.join(''));
}
export const DT_SHAPES = shapes('dt');
export const VT_SHAPES = shapes('vt');

// ---------------------------------------------------------------- derivation figure: velocity u at t = 0, v at time t, constant acceleration
function derivation(lettered) {
  const W = 420;
  const H = 290;
  const L = 60;
  const B = 240;
  const T = 30;
  const tpx = 280;
  const u = 70;
  const v = 170;
  const x = (a) => L + a;
  const y = (b) => B - b;
  const p = [];
  p.push(S.arrow(L, B, L + 330, B, { w: 1.6, size: 6 }), S.arrow(L, B, L, T - 6, { w: 1.6, size: 6 }));
  p.push(lab(L + 330, B + 16, 'time', { a: 'end', size: 12, w: 'bold' }), lab(L + 6, T - 8, 'velocity', { size: 12, w: 'bold' }));
  p.push(`<polygon points="${x(0)},${y(0)} ${x(0)},${y(u)} ${x(tpx)},${y(v)} ${x(tpx)},${y(0)}" fill="${BLUE}" fill-opacity="0.15" stroke="none"/>`);
  p.push(S.line(x(0), y(u), x(tpx), y(u), { c: MUT, w: 1.2, dash: '5 3' }));
  p.push(S.path(`M${x(0)} ${y(u)} L${x(tpx)} ${y(v)}`, { c: BLUE, w: 2.4 }));
  p.push(S.line(x(tpx), y(v), x(tpx), y(0), { c: MUT, w: 1.2, dash: '5 3' }), S.line(x(0), y(v), x(tpx), y(v), { c: MUT, w: 1.2, dash: '5 3' }));
  const pts = { A: [0, u], B: [tpx, v], C: [tpx, 0], D: [0, v], E: [0, 0] };
  if (lettered) {
    p.push(lab(x(0) - 22, y(u) + 4, 'A', { size: 14, w: 'bold', c: RED }), lab(x(tpx) + 8, y(v) - 2, 'B', { size: 14, w: 'bold', c: RED }), lab(x(tpx) + 6, y(0) + 14, 'C', { size: 14, w: 'bold', c: RED }), lab(x(0) - 22, y(v) + 4, 'D', { size: 14, w: 'bold', c: RED }), lab(x(0) - 22, y(0) + 14, 'E', { size: 14, w: 'bold', c: RED }));
  } else {
    p.push(lab(x(0) - 8, y(u) + 4, 'u', { a: 'end', size: 13, w: 'bold' }), lab(x(tpx) + 8, y(v) + 2, 'v', { size: 13, w: 'bold' }), lab(x(tpx), y(0) + 16, 't', { a: 'middle', size: 13, w: 'bold' }));
    p.push(lab(x(tpx) / 2 + L - 40, y(u + (v - u) / 2) - 40, 'slope = a', { size: 11, c: BLUE }));
    p.push(lab(x(tpx) / 2, y(u / 2), 'rectangle: u t', { a: 'middle', size: 12 }), lab(x(tpx) * 0.62, y(u + 30), 'triangle:', { a: 'middle', size: 11 }), lab(x(tpx) * 0.62, y(u + 16), '½ (v − u) t', { a: 'middle', size: 11 }));
  }
  check(pts.A[1] < pts.D[1] && pts.B[1] === pts.D[1] && pts.C[1] === 0, 'derivation figure: A at u, B and D at v, C and E on the time axis');
  return svgDoc(W, H, lettered ? 'A velocity-time graph for uniform acceleration: the line AB rises from velocity A on the vertical axis to B above time C on the horizontal axis; D is the point on the vertical axis level with B and E is the origin. The points A to E are lettered' : 'A velocity-time graph for uniform acceleration: a straight line from initial velocity u to final velocity v at time t. The area under it is a rectangle of height u and a triangle of height v minus u', p.join(''));
}
export const DERIV = derivation(false);
export const DERIV_LET = derivation(true);

// ---------------------------------------------------------------- path diagrams (distance and displacement)
export const PATH_BUS = (() => {
  const p = [];
  const x = 120;
  const km = 18;
  const y0 = 200;
  const y = (k) => y0 - k * km;
  p.push(S.line(60, y0, 60, y(10), { w: 1.2, c: MUT }));
  for (let k = 0; k <= 10; k += 2) {
    p.push(S.line(56, y(k), 64, y(k), { w: 1.2, c: MUT }), lab(50, y(k) + 4, String(k), { a: 'end', size: 10, c: MUT }));
  }
  p.push(lab(24, 12, 'km north', { size: 10, c: MUT }));
  p.push(S.arrow(x - 14, y(0), x - 14, y(8), { c: BLUE, w: 2.2 }), S.arrow(x + 14, y(8), x + 14, y(5), { c: GREEN, w: 2.2 }));
  p.push(S.circle(x, y(0), 5, { fill: RED, c: RED }), lab(x + 12, y(0) + 4, 'depot (start)'), S.circle(x, y(8), 5, { fill: RED, c: RED }), lab(x + 28, y(8) + 4, 'school'), S.circle(x, y(5), 5, { fill: RED, c: RED }), lab(x + 28, y(5) + 4, 'stop (end)'));
  p.push(lab(x - 24, (y(0) + y(8)) / 2, '8 km', { a: 'end', c: BLUE }), lab(x + 52, (y(8) + y(5)) / 2 - 8, '3 km back', { c: GREEN }));
  p.push(S.line(x + 80, y(0), x + 80, y(5), { c: RED, w: 1.6, dash: '5 3' }), lab(x + 86, (y(0) + y(5)) / 2 + 4, 'displacement 5 km', { c: RED }));
  return svgDoc(360, 220, 'A school bus leaves the depot, goes 8 km north to the school and then 3 km back south to a stop. The distance is 11 km; the displacement is 5 km north, shown by a dashed line from the depot to the stop', p.join(''));
})();
export const PATH_PQR = (() => {
  const p = [];
  const m = 0.55;
  const x0 = 200;
  const X = (d) => x0 + d * m;
  const y = 70;
  p.push(S.line(X(-300), y + 30, X(400), y + 30, { w: 1.2, c: MUT }));
  for (let d = -200; d <= 400; d += 100) p.push(S.line(X(d), y + 26, X(d), y + 34, { w: 1.2, c: MUT }), lab(X(d), y + 48, String(d), { a: 'middle', size: 10, c: MUT }));
  p.push(lab(X(400), y + 62, 'metres east of P', { a: 'end', size: 10, c: MUT }));
  p.push(S.arrow(X(0), y - 10, X(300), y - 10, { c: BLUE, w: 2.2 }), S.arrow(X(300), y + 8, X(-200), y + 8, { c: GREEN, w: 2.2 }));
  p.push(S.circle(X(0), y - 10, 5, { fill: RED, c: RED }), lab(X(0) - 8, y - 22, 'P', { size: 13, w: 'bold', a: 'end' }), S.circle(X(300), y - 10, 5, { fill: RED, c: RED }), lab(X(300) + 4, y - 22, 'Q', { size: 13, w: 'bold' }), S.circle(X(-200), y + 8, 5, { fill: RED, c: RED }), lab(X(-200) - 8, y + 12, 'R', { size: 13, w: 'bold', a: 'end' }));
  return svgDoc(470, 150, 'A number line in metres east of P. A rickshaw goes from P 300 m east to Q and then 500 m west to R, which is 200 m west of P', p.join(''));
})();

// ---------------------------------------------------------------- free fall: positions of a dropped ball each second, s = 5 t^2
export const FALL = (() => {
  const p = [];
  const k = 3.4; // px per metre
  const y0 = 24;
  const X = 100;
  p.push(S.line(70, y0, 70, y0 + 45 * k, { w: 1.4, c: MUT }));
  for (let t = 0; t <= 3; t++) {
    const s = fallS(t);
    const y = y0 + s * k;
    p.push(S.line(66, y, 74, y, { w: 1.4, c: MUT }), lab(60, y + 4, `${s} m`, { a: 'end', size: 11 }));
    p.push(S.circle(X + 14 * t, y, 8, { fill: BLUE, c: BLUE, fop: 0.4 }), lab(X + 14 * t + 18, y + 4, `after ${t} s`, { size: 11 }));
  }
  p.push(lab(10, 12, 'distance fallen', { size: 10, c: MUT }));
  check(fallS(1) === 5 && fallS(2) === 20 && fallS(3) === 45 && Math.abs(fallS(2) / fallS(1) - 4) < 1e-9, 'free fall: distances in 1, 2 and 3 s are 5, 20 and 45 m (g = 10)');
  return svgDoc(330, y0 + 45 * k + 24, 'A ball dropped from rest: it has fallen 0 m at the start, 5 m after 1 second, 20 m after 2 seconds and 45 m after 3 seconds, taking g as 10 metres per second squared. The gaps grow because the ball speeds up', p.join(''));
})();

// ---------------------------------------------------------------- vertical throw at 20 m/s, g = 10
export const THROW = (() => {
  const p = [];
  const k = 6; // px per metre
  const yb = 150;
  const hs = [0, 15, 20, 15, 0];
  const vs = [20, 10, 0, -10, -20];
  p.push(S.line(40, yb + 8, 340, yb + 8, { w: 1.4, c: MUT }), lab(340, yb + 22, 'ground', { a: 'end', size: 10, c: MUT }));
  hs.forEach((h, i) => {
    const up = i <= 2;
    const x = up ? 100 : 230;
    const y = yb - h * k;
    p.push(S.circle(x, y, 7, { fill: up ? BLUE : GREEN, c: up ? BLUE : GREEN, fop: 0.4 }));
    p.push(lab(up ? x - 14 : x + 14, y + 4, `${i} s: ${vs[i] > 0 ? '+' : vs[i] < 0 ? '−' : ''}${Math.abs(vs[i])} m/s`, { a: up ? 'end' : 'start', size: 11 }));
  });
  p.push(S.arrow(100, yb - 6 * k, 100, yb - 18 * k, { c: BLUE, w: 1.6, size: 6 }), S.arrow(230, yb - 18 * k, 230, yb - 6 * k, { c: GREEN, w: 1.6, size: 6 }));
  p.push(S.line(130, yb - 20 * k, 340, yb - 20 * k, { w: 1, c: MUT, dash: '4 3' }), lab(340, yb - 20 * k - 5, 'highest point: 20 m', { a: 'end', size: 11, c: MUT }));
  check(hs[1] === 20 - 5 && hs[2] === 20 && vs[2] === 0 && hs[1] === hs[3], 'throw: same heights at 1 s and 3 s, velocity zero at 2 s (g = 10, u = 20)');
  return svgDoc(360, 190, 'A ball thrown vertically upward at 20 metres per second with g equal to 10: at 0, 1, 2, 3 and 4 seconds its heights are 0, 15, 20, 15 and 0 metres and its velocities are 20, 10, 0, minus 10 and minus 20 metres per second', p.join(''));
})();
