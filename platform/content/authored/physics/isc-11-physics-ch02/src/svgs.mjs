// ISC 11 ch02 diagrams, all drawn from numbers with self-checks: a position axis, path length against displacement,
// chords closing in on a tangent, the area under a curve by strips, the six basic motion graphs, the v–t trapezoid
// and a strobe picture of a ball thrown straight up.
import { svgDoc, S, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g } from './phys.mjs';

const RED = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- ROAD: a position axis along a canal road (0.4 px per metre)
export const ROAD_DATA = { stall: -180, cyclist: 420, scale: 0.4, x0px: 130 };
export const ROAD = (() => {
  const { stall, cyclist, scale, x0px } = ROAD_DATA;
  const px = (x) => x0px + scale * x;
  const w = 420;
  const h = 190;
  const ay = 100;
  let s = S.arrow(px(-300) - 8, ay, px(650), ay, { w: 1.6 });
  for (let x = -300; x <= 600; x += 100) s += S.line(px(x), ay - 4, px(x), ay + 4) + S.text(px(x), ay + 17, String(x), { a: 'middle', size: 10 });
  s += S.text(px(650) - 2, ay - 8, '+x (m)', { a: 'end', size: 10, w: 'bold' });
  // bridge at the origin
  s += S.path(`M${f1(px(0) - 22)} ${ay - 8} Q${f1(px(0))} ${ay - 34} ${f1(px(0) + 22)} ${ay - 8}`, { w: 2.2 }) + S.text(px(0), ay - 40, 'bridge = origin O', { a: 'middle', size: 10, w: 'bold' });
  // tea stall
  s += S.rect(px(stall) - 12, ay - 24, 24, 16, { fill: FILL }) + S.path(`M${f1(px(stall) - 15)} ${ay - 24} L${f1(px(stall))} ${ay - 34} L${f1(px(stall) + 15)} ${ay - 24} Z`, { fill: ACC, fop: 0.4 }) + S.text(px(stall), ay - 40, 'tea stall', { a: 'middle', size: 10 });
  // cyclist
  s += S.circle(px(cyclist) - 8, ay - 10, 6, { c: BLUE }) + S.circle(px(cyclist) + 8, ay - 10, 6, { c: BLUE }) + S.line(px(cyclist) - 8, ay - 10, px(cyclist), ay - 22, { c: BLUE }) + S.line(px(cyclist), ay - 22, px(cyclist) + 8, ay - 10, { c: BLUE });
  s += S.text(px(cyclist), ay - 30, 'cyclist', { a: 'middle', size: 10, c: BLUE });
  const dy = 142;
  s += S.arrow(px(stall), dy, px(cyclist), dy, { c: GRN, w: 1.5, size: 6 }) + S.lead(px(stall), ay + 22, px(stall), dy + 4) + S.lead(px(cyclist), ay + 22, px(cyclist), dy + 4);
  s += S.text((px(stall) + px(cyclist)) / 2, dy + 16, 'cyclist relative to stall: 420 − (−180) = +600 m', { a: 'middle', size: 10, c: GRN });
  s += S.text(w / 2, h - 3, 'Positions are signed: left of O is negative. Scale: 100 m = 40 px.', { a: 'middle', size: 10 });
  const okPos = near(px(cyclist) - px(0), scale * cyclist, 1e-9) && px(stall) < px(0);
  const okDim = near((px(cyclist) - px(stall)) / scale, cyclist - stall, 1e-9) && cyclist - stall === 600;
  check(okPos && okDim, `road: positions drawn at 0.4 px per metre; tea stall at ${stall} m left of O; cyclist at +${cyclist} m; separation ${cyclist - stall} m`);
  return svgDoc(w, h, 'A position axis along a straight canal road with a bridge as origin: a tea stall at minus 180 metres, a cyclist at plus 420 metres, and the cyclist 600 metres beyond the stall', s);
})();

// ---------------------------------------------------------------- PATH: path length and displacement (0.36 px per metre)
export const PATH_DATA = { A: 900, B: 550, scale: 0.36, x0px: 30 };
export const PATH = (() => {
  const { A, B, scale, x0px } = PATH_DATA;
  const px = (x) => x0px + scale * x;
  const w = 420;
  const h = 215;
  const ay = 100;
  let s = S.arrow(px(0) - 10, ay, px(A) + 38, ay, { w: 1.4, c: MUT }) + S.text(px(A) + 38, ay + 14, '+x', { a: 'end', size: 10 });
  for (const [x, lab] of [[0, 'O (home)'], [B, 'B (temple)'], [A, 'A (market)']]) s += S.line(px(x), ay - 4, px(x), ay + 4) + S.text(px(x), ay + 17, lab, { a: 'middle', size: 10, w: 'bold' });
  s += S.arrow(px(0), 74, px(A), 74, { c: BLUE, w: 2 }) + S.lead(px(0), ay - 4, px(0), 74) + S.lead(px(A), ay - 4, px(A), 74);
  s += S.text(px(A / 2), 64, `${A} m eastwards`, { a: 'middle', size: 10, c: BLUE });
  s += S.arrow(px(A), 124, px(B), 124, { c: RED, w: 2 }) + S.lead(px(A), ay + 22, px(A), 124) + S.lead(px(B), ay + 22, px(B), 124);
  s += S.text(px(B) + (px(A) - px(B)) / 2, 142, `${A - B} m westwards`, { a: 'middle', size: 10, c: RED });
  s += S.arrow(px(0), 168, px(B), 168, { c: GRN, w: 2.4 }) + S.lead(px(0), ay + 22, px(0), 168) + S.lead(px(B), ay + 22, px(B), 168);
  s += S.text(px(B / 2), 186, `displacement = +${B} m`, { a: 'middle', size: 10, c: GRN, w: 'bold' });
  s += S.text(px(A) + 38, 186, `path length = ${A} + ${A - B} = ${A + A - B} m`, { a: 'end', size: 10, w: 'bold' });
  const okLen = near((px(A) - px(0)) / scale, A, 1e-9) && near((px(A) - px(B)) / scale, A - B, 1e-9) && near((px(B) - px(0)) / scale, B, 1e-9);
  check(okLen && A + (A - B) === 1250 && B === 550, `path: legs drawn to scale (${A} m out, ${A - B} m back, displacement ${B} m); path length ${A + A - B} m exceeds displacement ${B} m`);
  return svgDoc(w, h, 'A cyclist rides 900 metres east from home to the market and 350 metres back west to the temple: the path length is 1250 metres but the displacement is 550 metres east of home', s);
})();

// ---------------------------------------------------------------- SECANT: chords of x = 2t² closing in on the tangent at t = 2 s
export const SECANT_DATA = { k: 2, t0: 2, dts: [2, 1, 0.5], ox: 50, oy: 225, ts: 70, xs: 5.5 };
export const SECANT = (() => {
  const { k, t0, dts, ox, oy, ts, xs } = SECANT_DATA;
  const w = 420;
  const h = 250;
  const X = (t) => k * t * t;
  const P = (t) => [ox + ts * t, oy - xs * X(t)];
  let s = S.arrow(ox, oy, ox + ts * 4.9, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - xs * 36, { w: 1.5 });
  s += S.text(ox + ts * 4.9, oy + 14, 't (s)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - xs * 36 + 4, 'x (m)', { size: 10 });
  for (let t = 1; t <= 4; t++) s += S.line(ox + ts * t, oy - 3, ox + ts * t, oy + 3) + S.text(ox + ts * t, oy + 14, String(t), { a: 'middle', size: 10 });
  let d = 'M';
  for (let i = 0; i <= 42; i++) {
    const t = (4.2 * i) / 42;
    const [a, b] = P(t);
    d += `${i ? ' L' : ''}${f1(a)} ${f1(b)}`;
  }
  s += S.path(d, { c: BLUE, w: 2.2 });
  const [px0, py0] = P(t0);
  // chords and tangent
  const cols = [ACC, ACC, ACC];
  const pxSlopes = [];
  dts.forEach((dt, i) => {
    const [qx, qy] = P(t0 + dt);
    s += S.line(px0, py0, qx, qy, { c: cols[i], w: 1.4, dash: '5 3' }) + S.circle(qx, qy, 3, { c: ACC, fill: ACC });
    pxSlopes.push((py0 - qy) / xs / ((qx - px0) / ts));
  });
  const vt = 2 * k * t0;
  const ta = P(1);
  const tb = P(3.2);
  const t1y = py0 - xs * vt * (1 - t0);
  const t2y = py0 - xs * vt * (3.2 - t0);
  s += S.line(ta[0], t1y, tb[0], t2y, { c: RED, w: 2 });
  s += S.circle(px0, py0, 4, { c: RED, fill: RED });
  s += S.text(px0 + 6, py0 + 16, 'P', { size: 11, w: 'bold' });
  s += S.line(px0, py0, px0, oy, { c: MUT, w: 1, dash: '3 3' });
  const lg = [[ACC, `chord P to t = ${t0 + dts[0]} s: slope ${(X(t0 + dts[0]) - X(t0)) / dts[0]} m s⁻¹`], [ACC, `chord P to t = ${t0 + dts[1]} s: slope ${(X(t0 + dts[1]) - X(t0)) / dts[1]} m s⁻¹`], [ACC, `chord P to t = ${t0 + dts[2]} s: slope ${(X(t0 + dts[2]) - X(t0)) / dts[2]} m s⁻¹`], [RED, `tangent at P (t = ${t0} s): slope ${vt} m s⁻¹`]];
  lg.forEach(([c, tx], i) => (s += S.text(ox + 14, 52 + 16 * i, tx, { size: 10, c, w: i === 3 ? 'bold' : undefined })));
  const exact = dts.map((dt) => 2 * k * t0 + k * dt);
  const okChord = pxSlopes.every((m, i) => near(m, exact[i], 1e-6));
  const okShrink = exact[0] > exact[1] && exact[1] > exact[2] && exact[2] > vt;
  const okTan = near((t2y - t1y) / -xs / ((tb[0] - ta[0]) / ts), vt, 1e-6) && near((X(t0 + 1e-5) - X(t0 - 1e-5)) / 2e-5, vt, 1e-6);
  check(okChord && okShrink && okTan, `secant: drawn chord slopes ${pxSlopes.map((m) => m.toFixed(2)).join(', ')} m/s equal 4t + 2Δt (${exact.join(', ')}); they shrink towards the tangent slope ${vt} m/s (numerical derivative agrees)`);
  return svgDoc(w, h, 'A position-time curve x equals 2 t squared with a point P at t equal to 2 seconds. Chords from P to later points at 4, 3 and 2.5 seconds have slopes 12, 10 and 9 metres per second, closing in on the slope of the tangent at P, which is 8 metres per second', s);
})();

// ---------------------------------------------------------------- AREAINT: area under v = 3t² from 1 s to 3 s
export const AREA_DATA = { c: 3, t1: 1, t2: 3, ox: 50, oy: 225, ts: 80, vs: 5.4, n: 8 };
export const AREAINT = (() => {
  const { c, t1, t2, ox, oy, ts, vs, n } = AREA_DATA;
  const w = 420;
  const h = 250;
  const V = (t) => c * t * t;
  const P = (t) => [ox + ts * t, oy - vs * V(t)];
  let s = S.arrow(ox, oy, ox + ts * 3.8, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - vs * 38, { w: 1.5 });
  s += S.text(ox + ts * 3.8, oy + 14, 't (s)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - vs * 38 + 4, 'v (m s⁻¹)', { size: 10 });
  for (let t = 1; t <= 3; t++) s += S.line(ox + ts * t, oy - 3, ox + ts * t, oy + 3) + S.text(ox + ts * t, oy + 14, String(t), { a: 'middle', size: 10 });
  const poly = [];
  const m = 40;
  for (let i = 0; i <= m; i++) poly.push(P(t1 + ((t2 - t1) * i) / m));
  const shade = `M${f1(P(t1)[0])} ${oy} ` + poly.map(([a, b]) => `L${f1(a)} ${f1(b)}`).join(' ') + ` L${f1(P(t2)[0])} ${oy} Z`;
  s += S.path(shade, { c: GRN, fill: GRN, fop: 0.22, w: 0.5 });
  // strips (left-hand rectangles) of width Δt
  const dt = (t2 - t1) / n;
  let lowSum = 0;
  let highSum = 0;
  for (let i = 0; i < n; i++) {
    const ta = t1 + i * dt;
    const [xa, ya] = P(ta);
    s += S.rect(xa, ya, ts * dt, oy - ya, { c: ACC, sw: 0.8 });
    lowSum += V(ta) * dt;
    highSum += V(ta + dt) * dt;
  }
  let d = 'M';
  for (let i = 0; i <= 38; i++) {
    const t = (3.6 * i) / 38;
    const [a, b] = P(t);
    d += `${i ? ' L' : ''}${f1(a)} ${f1(b)}`;
  }
  s += S.path(d, { c: BLUE, w: 2.2 });
  s += S.text(ox + 12, 46, 'v = 3t²', { size: 12, c: BLUE, w: 'bold' });
  s += S.text(ox + 12, 64, 'strips of width Δt: Σ v Δt', { size: 10, c: ACC });
  s += S.text(ox + 12, 80, 'shaded area = ∫ 3t² dt from 1 to 3', { size: 10, c: GRN, w: 'bold' });
  s += S.text(ox + 12, 96, '= [t³] from 1 to 3 = 27 − 1 = 26 m', { size: 10, c: GRN, w: 'bold' });
  // check: shoelace area of the drawn polygon (in physical units) = 26; strips bracket it; integral by antiderivative
  const pts = [[P(t1)[0], oy], ...poly, [P(t2)[0], oy]];
  let a2 = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a2 += x1 * y2 - x2 * y1;
  }
  const phys = Math.abs(a2 / 2) / (ts * vs);
  const exact = t2 ** 3 - t1 ** 3;
  check(exact === 26 && Math.abs(phys - exact) < 0.05 && lowSum < exact && exact < highSum, `area: shaded polygon area ${phys.toFixed(3)} m (exact ${exact} m); ${n} strips bracket it between ${lowSum.toFixed(2)} m and ${highSum.toFixed(2)} m`);
  return svgDoc(w, h, 'A velocity-time curve v equals 3 t squared. The area under it between 1 second and 3 seconds, shown shaded and cut into thin strips, is the displacement, equal to 3 cubed minus 1 cubed, that is 26 metres', s);
})();

// ---------------------------------------------------------------- GRAPHS6: s–t, v–t, a–t for uniform velocity and uniform acceleration
export const GRAPHS6 = (() => {
  const w = 420;
  const h = 300;
  const pw = 118;
  const ph = 84;
  const constant = (d) => d.every((x) => near(x, d[0], 1e-6));
  const rows = [
    { title: 'Uniform velocity (constant slope on s–t)', names: ['s', 'v', 'a'], caps: ['straight line, slope = v', 'horizontal line', 'zero: on the t-axis'], panels: [
      { f: (u) => 0.1 + 0.8 * u, on: 'slopes', ok: (d) => constant(d) && d[0] > 0 },
      { f: () => 0.5, on: 'slopes', ok: (d) => d.every((x) => Math.abs(x) < 1e-9) },
      { f: () => 0, on: 'values', ok: (d) => d.every((x) => x === 0) },
    ] },
    { title: 'Uniform acceleration (constant slope on v–t)', names: ['s', 'v', 'a'], caps: ['parabola, slope grows', 'straight line, slope = a', 'horizontal line'], panels: [
      { f: (u) => 0.05 + 0.9 * u * u, on: 'slopes', ok: (d) => d.every((x, i) => i === 0 || x > d[i - 1] + 1e-6) && d[0] >= 0 },
      { f: (u) => 0.1 + 0.8 * u, on: 'slopes', ok: (d) => constant(d) && d[0] > 0 },
      { f: () => 0.5, on: 'slopes', ok: (d) => d.every((x) => Math.abs(x) < 1e-9) },
    ] },
  ];
  let s = '';
  let ok = true;
  rows.forEach((row, r) => {
    const py0 = 28 + r * 142;
    s += S.text(14, py0 - 8, row.title, { size: 11, w: 'bold' });
    row.panels.forEach(({ f, on, ok: test }, c) => {
      const px0 = 14 + c * 136;
      s += S.arrow(px0 + 8, py0 + ph, px0 + pw, py0 + ph, { w: 1.2, size: 5 }) + S.arrow(px0 + 8, py0 + ph, px0 + 8, py0 + 4, { w: 1.2, size: 5 });
      s += S.text(px0 + pw, py0 + ph + 11, 't', { a: 'end', size: 10 }) + S.text(px0 + 12, py0 + 10, row.names[c], { size: 10, w: 'bold' });
      const n = 40;
      const ys = [];
      let d = 'M';
      for (let k = 0; k <= n; k++) {
        const u = k / n;
        const yv = f(u);
        ys.push(yv);
        d += `${k ? ' L' : ''}${f1(px0 + 8 + (pw - 22) * u)} ${f1(py0 + ph - (on === 'values' ? 1.5 : 6) - (ph - 18) * yv)}`;
      }
      s += S.path(d, { c: RED, w: 2 });
      s += S.text(px0 + pw / 2, py0 + ph + 26, `${row.names[c]}–t`, { a: 'middle', size: 10, w: 'bold' }) + S.text(px0 + pw / 2, py0 + ph + 38, row.caps[c], { a: 'middle', size: 10, c: MUT });
      const slopes = ys.slice(1).map((y, k) => (y - ys[k]) * n);
      if (!test(on === 'values' ? ys : slopes)) {
        ok = false;
        SELF_CHECKS.push(`FAIL graphs6: row ${r} panel ${c} does not show "${row.caps[c]}"`);
      }
    });
  });
  check(ok, 'graphs6: uniform velocity gives constant positive slope on s–t, a flat v–t line and a = 0; uniform acceleration gives a growing slope on s–t (parabola), a rising straight v–t line of constant slope and a flat a–t line');
  return svgDoc(w, h, 'Six motion graphs. For uniform velocity: a straight sloping s-t line, a horizontal v-t line and a-t on the axis at zero. For uniform acceleration: a parabolic s-t curve that gets steeper, a straight rising v-t line and a horizontal a-t line', s);
})();

// ---------------------------------------------------------------- VTAREA: the area under a straight v–t line = displacement
export const VTAREA_DATA = { u: 5, v: 17, t: 6, sx: 34, sy: 9 };
export const VTAREA = (() => {
  const { u, v, t, sx, sy } = VTAREA_DATA;
  const w = 420;
  const h = 250;
  const ox = 56;
  const oy = 212;
  const P = (tt, vv) => [ox + sx * tt, oy - sy * vv];
  let s = S.arrow(ox, oy, ox + sx * t + 30, oy, { w: 1.5 }) + S.arrow(ox, oy, ox, oy - sy * v - 22, { w: 1.5 });
  s += S.text(ox + sx * t + 30, oy + 14, 't (s)', { a: 'end', size: 10 }) + S.text(ox + 6, oy - sy * v - 24, 'v (m s⁻¹)', { size: 10 });
  const [x0, yu] = P(0, u);
  const [x1, yv] = P(t, v);
  const [, y0] = P(0, 0);
  s += S.rect(x0, yu, x1 - x0, y0 - yu, { c: BLUE, fill: BLUE, fop: 0.22 });
  s += S.path(`M${f1(x0)} ${f1(yu)} L${f1(x1)} ${f1(yu)} L${f1(x1)} ${f1(yv)} Z`, { c: GRN, fill: GRN, fop: 0.22, w: 1 });
  s += S.line(x0, yu, x1, yv, { c: RED, w: 2.4 });
  s += S.line(x1, yv, x1, oy, { c: MUT, w: 1, dash: '3 3' }) + S.line(ox, yv, x1, yv, { c: MUT, w: 1, dash: '3 3' });
  s += S.text(ox - 6, yu + 4, 'u', { a: 'end', size: 11, w: 'bold' }) + S.text(ox - 6, yv + 4, 'v', { a: 'end', size: 11, w: 'bold' }) + S.text(x1, oy + 14, 't', { a: 'middle', size: 11, w: 'bold' });
  s += S.text((x0 + x1) / 2 - 20, yu + (y0 - yu) / 2 + 4, 'rectangle: u t', { a: 'middle', size: 10, c: BLUE });
  s += S.text(x1 - 6, yu - 10, 'triangle: ½ (v − u) t', { a: 'end', size: 10, c: GRN });
  const a = (v - u) / t;
  const sArea = u * t + 0.5 * (v - u) * t;
  s += S.lines(ox + sx * t + 36, 70, [`u = ${u} m s⁻¹`, `v = ${v} m s⁻¹`, `t = ${t} s`, 'a = (v − u)/t', `  = ${a} m s⁻²`, 's = u t + ½ (v − u) t', `  = ${u * t} + ${0.5 * (v - u) * t} = ${sArea} m`], { size: 10, dy: 15 });
  const pxArea = (x1 - x0) * (y0 - yu) + 0.5 * (x1 - x0) * (yu - yv);
  const phys = pxArea / (sx * sy);
  check(near(phys, ((u + v) / 2) * t, 1e-9) && near(phys, sArea, 1e-9) && near(((yu - yv) / sy) / ((x1 - x0) / sx), a, 1e-9), `vt-area: drawn rectangle + triangle = ${phys.toFixed(2)} m = (u + v)t/2; slope of the line = a = ${a} m s⁻²`);
  return svgDoc(w, h, 'A velocity-time graph for uniform acceleration: a straight line from u equal to 5 metres per second to v equal to 17 metres per second in 6 seconds; the area under it splits into a rectangle u t and a triangle half v minus u times t, and the total area 66 metres is the displacement', s);
})();

// ---------------------------------------------------------------- FALL: strobe picture of a ball thrown straight up at 29.4 m/s
export const FALL_DATA = { u: 29.4, sc: 4, y0: 255, vsc: 1.6 };
export const FALL = (() => {
  const { u, sc, y0, vsc } = FALL_DATA;
  const w = 420;
  const h = 300;
  const yy = (t) => u * t - 0.5 * g * t * t;
  const vv = (t) => u - g * t;
  const cols = { 0: 175, 1: 175, 2: 175, 3: 235, 4: 295, 5: 295, 6: 295 };
  let s = S.text(w / 2, 14, 'Ball thrown straight up at 29.4 m s⁻¹ (g = 9.8 m s⁻²), one picture per second', { a: 'middle', size: 11, w: 'bold' });
  s += S.line(110, y0, 360, y0, { w: 1.5 }) + S.text(112, y0 + 13, 'hand / ground, y = 0', { size: 10 });
  const rows = [];
  for (let t = 0; t <= 6; t++) {
    const cx = cols[t];
    const cy = y0 - sc * yy(t) - 6;
    rows.push({ t, cx, cy, y: yy(t), v: vv(t) });
    s += S.circle(cx, cy, 6, { c: BLUE, fill: BLUE, fop: 0.35 });
    if (t >= 1 && t <= 5 && t !== 3) {
      const dir = vv(t) > 0 ? -1 : 1;
      const ax = t < 3 ? cx + 16 : cx - 16;
      s += S.arrow(ax, cy, ax, cy + dir * vsc * Math.abs(vv(t)), { c: GRN, w: 1.4, size: 5 });
    }
    if (t === 0) s += S.arrow(cx + 16, cy, cx + 16, cy - vsc * u, { c: GRN, w: 1.4, size: 5 });
    if (t === 3) s += S.text(cx, cy - 12, `top: t = 3 s, y = ${f1(yy(3))} m, v = 0`, { a: 'middle', size: 10, w: 'bold' });
    else if (t >= 1 && t <= 5) {
      const lab = `t = ${t} s, y = ${f1(yy(t))} m`;
      s += t < 3 ? S.text(cx - 12, cy + 4, lab, { a: 'end', size: 10 }) : S.text(cx + 12, cy + 4, lab, { size: 10 });
    }
  }
  s += S.text(cols[0] - 12, y0 - 2, 't = 0', { a: 'end', size: 10 }) + S.text(cols[6] + 12, y0 - 2, 't = 6 s', { size: 10 });
  s += S.text(w / 2, y0 + 28, 'green arrows: velocity (1.6 px per m s⁻¹); +29.4 up at the start, −29.4 (down) on return', { a: 'middle', size: 10 });
  s += S.text(w / 2, y0 + 41, 'same height at equal times before and after the top: 1 s and 5 s, 2 s and 4 s', { a: 'middle', size: 10 });
  const Hh = (u * u) / (2 * g);
  const okUp = near(yy(3), Hh, 1e-9) && near(yy(0), 0, 1) && Math.abs(yy(6)) < 1e-9 && near(Hh, 44.1, 1e-9);
  const okSym = near(yy(1), yy(5), 1e-9) && near(yy(2), yy(4), 1e-9) && near(vv(1), -vv(5), 1e-9) && near(vv(2), -vv(4), 1e-9);
  const okPix = rows.every((r) => near(y0 - 6 - r.cy, sc * r.y, 1e-9) || Math.abs(y0 - 6 - r.cy - sc * r.y) < 1e-9);
  check(okUp && okSym && okPix, `fall: pictures at heights ${rows.map((r) => f1(r.y)).join(', ')} m drawn at 4 px per m; top ${f1(Hh)} m at 3 s (u²/2g, u/g); returns to the hand at 6 s (2u/g); heights and speeds symmetric about the top`);
  return svgDoc(w, h, 'A strobe picture of a ball thrown straight up at 29.4 metres per second, one picture per second. It rises to 24.5, 39.2 and 44.1 metres at 1, 2 and 3 seconds, comes down through 39.2 and 24.5 metres at 4 and 5 seconds and is back in the hand at 6 seconds, with the speed zero at the top', s);
})();

export const ALL = { ROAD, PATH, SECANT, AREAINT, GRAPHS6, VTAREA, FALL };
