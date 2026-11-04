// ch02 diagrams, all drawn from numbers with self-checks: a position axis, path length against displacement, a strobe
// picture of free fall, stopping distances to scale, the area under a v–t line, and the shapes of x–t graphs.
import { svgDoc, S, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
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

// ---------------------------------------------------------------- FRAME: a position axis along a railway line (0.4 px per metre)
export const FRAME_DATA = { origin: 0, signal: -200, train: 450, scale: 0.4, x0px: 130 };
export const FRAME = (() => {
  const { signal, train, scale, x0px } = FRAME_DATA;
  const px = (x) => x0px + scale * x;
  const w = 420;
  const h = 190;
  const ay = 100;
  let s = S.arrow(px(-300) - 8, ay, px(650), ay, { w: 1.6 });
  for (let x = -300; x <= 600; x += 100) s += S.line(px(x), ay - 4, px(x), ay + 4) + S.text(px(x), ay + 17, String(x), { a: 'middle', size: 10 });
  s += S.text(px(650) - 2, ay - 8, '+x (m)', { a: 'end', size: 10, w: 'bold' });
  // station building at the origin
  s += S.rect(px(0) - 14, ay - 34, 28, 26, { fill: FILL }) + S.path(`M${f1(px(0) - 17)} ${ay - 34} L${f1(px(0))} ${ay - 46} L${f1(px(0) + 17)} ${ay - 34} Z`, { fill: FILL }) + S.text(px(0), ay - 52, 'station = origin O', { a: 'middle', size: 10, w: 'bold' });
  // signal post
  s += S.line(px(signal), ay - 4, px(signal), ay - 40, { w: 2 }) + S.circle(px(signal), ay - 40, 4, { c: RED, fill: RED }) + S.text(px(signal), ay - 52, 'signal', { a: 'middle', size: 10 });
  // train: coaches ending at the front at x = 450 m
  const coach = (xf) => S.rect(px(xf) - 36, ay - 24, 34, 18, { c: BLUE, fill: BLUE, fop: 0.25, rx: 2 });
  s += coach(train) + coach(train - 90) + S.circle(px(train) - 30, ay - 5, 3, { fill: 'currentColor' }) + S.circle(px(train) - 8, ay - 5, 3, { fill: 'currentColor' });
  s += S.text(px(train) - 36, ay - 30, 'train (front)', { a: 'middle', size: 10, c: BLUE });
  // dimension line: displacement of the train relative to the signal
  const dy = 142;
  s += S.arrow(px(signal), dy, px(train), dy, { c: GRN, w: 1.5, size: 6 }) + S.lead(px(signal), ay + 22, px(signal), dy + 4) + S.lead(px(train), ay + 22, px(train), dy + 4);
  s += S.text((px(signal) + px(train)) / 2, dy + 16, 'train relative to signal: 450 − (−200) = +650 m', { a: 'middle', size: 10, c: GRN });
  s += S.text(w / 2, h - 3, 'Positions are signed: left of O is negative. Scale: 100 m = 40 px.', { a: 'middle', size: 10 });
  const okPos = near(px(train) - px(0), 0.4 * 450, 1e-9) && px(signal) < px(0);
  const okDim = near((px(train) - px(signal)) / scale, train - signal, 1e-9) && train - signal === 650;
  check(okPos && okDim, `frame: positions drawn at 0.4 px per metre; signal at −200 m left of O; train front at +450 m; separation ${train - signal} m`);
  return svgDoc(w, h, 'A position axis along a straight railway line with the station as origin: a signal post at minus 200 metres, the front of a train at plus 450 metres, and the train 650 metres beyond the signal', s);
})();

// ---------------------------------------------------------------- PATH: path length and displacement (0.27 px per metre)
export const PATH_DATA = { A: 1200, B: 750, scale: 0.27, x0px: 30 };
export const PATH = (() => {
  const { A, B, scale, x0px } = PATH_DATA;
  const px = (x) => x0px + scale * x;
  const w = 420;
  const h = 215;
  const ay = 100;
  let s = S.arrow(px(0) - 10, ay, px(A) + 38, ay, { w: 1.4, c: MUT }) + S.text(px(A) + 38, ay + 14, '+x', { a: 'end', size: 10 });
  for (const [x, lab] of [[0, 'O (depot)'], [B, 'B'], [A, 'A (shop)']]) s += S.line(px(x), ay - 4, px(x), ay + 4) + S.text(px(x), ay + 17, lab, { a: 'middle', size: 10, w: 'bold' });
  s += S.arrow(px(0), 74, px(A), 74, { c: BLUE, w: 2 }) + S.lead(px(0), ay - 4, px(0), 74) + S.lead(px(A), ay - 4, px(A), 74);
  s += S.text(px(A / 2), 64, `${A} m eastwards`, { a: 'middle', size: 10, c: BLUE });
  s += S.arrow(px(A), 124, px(B), 124, { c: RED, w: 2 }) + S.lead(px(A), ay + 22, px(A), 124) + S.lead(px(B), ay + 22, px(B), 124);
  s += S.text(px(B) + (px(A) - px(B)) / 2, 142, `${A - B} m westwards`, { a: 'middle', size: 10, c: RED });
  s += S.arrow(px(0), 168, px(B), 168, { c: GRN, w: 2.4 }) + S.lead(px(0), ay + 22, px(0), 168) + S.lead(px(B), ay + 22, px(B), 168);
  s += S.text(px(B / 2), 186, `displacement = +${B} m`, { a: 'middle', size: 10, c: GRN, w: 'bold' });
  s += S.text(px(A) + 38, 186, `path length = ${A} + ${A - B} = ${A + A - B} m`, { a: 'end', size: 10, w: 'bold' });
  const okLen = near((px(A) - px(0)) / scale, A, 1e-9) && near((px(A) - px(B)) / scale, A - B, 1e-9) && near((px(B) - px(0)) / scale, B, 1e-9);
  check(okLen && A + (A - B) === 1650 && B === 750, `path: legs drawn to scale (${A} m out, ${A - B} m back, displacement ${B} m); path length ${A + A - B} m exceeds displacement ${B} m`);
  return svgDoc(w, h, 'A delivery rider goes 1200 metres east from the depot to a shop and 450 metres back west to a customer: the path length is 1650 metres but the displacement is 750 metres east of the depot', s);
})();

// ---------------------------------------------------------------- STROBE: free fall from rest, one picture per second
export const STROBE_DATA = { n: 4, scale: 3, y0: 20, vscale: 1.0 };
export const STROBE = (() => {
  const { n, scale, y0, vscale } = STROBE_DATA;
  const w = 420;
  const h = 314;
  const xs = 100;
  const pos = [];
  for (let k = 0; k <= n; k++) pos.push({ k, y: 0.5 * g * k * k, v: g * k });
  let s = S.line(xs - 40, y0 - 10, xs - 40, y0 + 0.5 * g * n * n * scale + 12, { c: MUT, w: 1 }) + S.text(xs - 44, y0 - 14, 'start', { a: 'end', size: 10 });
  for (const p of pos) {
    const cy = y0 + p.y * scale;
    s += S.circle(xs, cy, 6, { c: BLUE, fill: BLUE, fop: 0.35 });
    s += S.line(xs - 40, cy, xs - 9, cy, { c: MUT, w: 0.8, dash: '2 3' });
    if (p.k > 0) s += S.arrow(xs + 22, cy, xs + 22, cy + p.v * vscale, { c: GRN, w: 1.4, size: 5 });
    s += S.text(xs + 36, cy + 4, p.k === 0 ? 't = 0: released from rest' : `t = ${p.k} s:  y = ${f1(p.y)} m,  v = ${f1(p.v)} m s⁻¹`, { size: 10 });
  }
  s += S.text(xs - 44, y0 + 0.5 * g * n * n * scale + 12, 'y ↓', { a: 'end', size: 10 });
  s += S.text(w - 4, h - 3, 'g = 9.8 m s⁻²; scale 3 px per m; green arrows show v (1 px per m s⁻¹)', { a: 'end', size: 10 });
  // checks: gaps between successive pictures in the ratio 1 : 3 : 5 : 7; speed arrows 1 : 2 : 3 : 4
  const gaps = pos.slice(1).map((p, i) => p.y - pos[i].y);
  const okRatio = gaps.every((d, i) => near(d / gaps[0], 2 * i + 1, 1e-9));
  const okV = pos.slice(1).every((p) => near((p.v * vscale) / (pos[1].v * vscale), p.k, 1e-9));
  check(okRatio && okV, `strobe: successive gaps ${gaps.map((d) => d.toFixed(1)).join(', ')} m are in the ratio 1:3:5:7; speed arrows grow 1:2:3:4; last drop ${pos[n].y.toFixed(1)} m`);
  return svgDoc(w, h, 'A strobe picture of a ball dropped from rest, once per second: it falls 4.9, 19.6, 44.1 and 78.4 metres in total, the gaps between pictures grow in the ratio 1 to 3 to 5 to 7, and the speed grows by 9.8 metres per second every second', s);
})();

// ---------------------------------------------------------------- STOP: reaction distance and braking distance to scale
export const STOP_DATA = { tr: 0.6, a: 5, speeds: [10, 20, 30], scale: 2.6 };
export const STOP = (() => {
  const { tr, a, speeds, scale } = STOP_DATA;
  const w = 420;
  const h = 215;
  const x0 = 78;
  let s = S.rect(x0, 8, 12, 10, { c: ACC, fill: ACC, fop: 0.5 }) + S.text(x0 + 17, 17, 'reaction distance (steady speed)', { size: 10 }) + S.rect(x0 + 190, 8, 12, 10, { c: RED, fill: RED, fop: 0.5 }) + S.text(x0 + 207, 17, 'braking distance', { size: 10 });
  const rows = speeds.map((v, i) => ({ v, dr: v * tr, db: (v * v) / (2 * a), y: 34 + i * 56 }));
  for (const r of rows) {
    s += S.text(x0 - 8, r.y + 16, `${r.v} m s⁻¹`, { a: 'end', size: 11, w: 'bold' });
    s += S.rect(x0, r.y, r.dr * scale, 24, { c: ACC, fill: ACC, fop: 0.5 }) + S.rect(x0 + r.dr * scale, r.y, r.db * scale, 24, { c: RED, fill: RED, fop: 0.5 });
    s += S.text(x0 + (r.dr + r.db) * scale + 5, r.y + 16, `${f1(r.dr + r.db)} m`, { size: 11, w: 'bold' });
    s += S.text(x0 + (r.dr * scale) / 2, r.y + 38, f1(r.dr), { a: 'middle', size: 10 }) + S.text(x0 + r.dr * scale + (r.db * scale) / 2, r.y + 38, f1(r.db), { a: 'middle', size: 10 });
  }
  s += S.text(w - 4, h - 4, `reaction time ${tr} s, deceleration ${a} m s⁻²; 100 m = 260 px`, { a: 'end', size: 10 });
  const okQuad = near(rows[2].db / rows[0].db, 9, 1e-9) && near(rows[1].db / rows[0].db, 4, 1e-9) && near(rows[1].dr / rows[0].dr, 2, 1e-9);
  check(okQuad, `stopping: reaction distance grows with v (${rows.map((r) => f1(r.dr)).join(', ')} m), braking distance with v² (${rows.map((r) => f1(r.db)).join(', ')} m); totals ${rows.map((r) => f1(r.dr + r.db)).join(', ')} m`);
  return svgDoc(w, h, 'Stopping distances drawn to scale for a car at 10, 20 and 30 metres per second with a reaction time of 0.6 seconds and a braking deceleration of 5 metres per second squared: the reaction part grows in proportion to the speed and the braking part with the square of the speed, giving totals of 16, 52 and 108 metres', s);
})();

// ---------------------------------------------------------------- VTAREA: the area under a straight v–t line = displacement
export const VTAREA_DATA = { u: 4, v: 16, t: 6, sx: 34, sy: 9 };
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
  s += S.lines(ox + sx * t + 36, 70, [`u = ${u} m s⁻¹`, `v = ${v} m s⁻¹`, `t = ${t} s`, `a = (v − u)/t`, `  = ${a} m s⁻²`, `s = u t + ½ (v − u) t`, `  = ${u * t} + ${0.5 * (v - u) * t} = ${sArea} m`], { size: 10, dy: 15 });
  // checks: pixel area of rectangle + triangle, converted to physical units, equals the trapezoid (u + v)/2 × t
  const pxArea = (x1 - x0) * (y0 - yu) + 0.5 * (x1 - x0) * (yu - yv);
  const phys = pxArea / (sx * sy);
  check(near(phys, ((u + v) / 2) * t, 1e-9) && near(phys, sArea, 1e-9) && near(((yu - yv) / sy) / ((x1 - x0) / sx), a, 1e-9), `vt-area: drawn rectangle + triangle = ${phys.toFixed(2)} m = (u + v)t/2; slope of the line = a = ${a} m s⁻²`);
  return svgDoc(w, h, 'A velocity-time graph for uniform acceleration: a straight line from u equal to 4 metres per second to v equal to 16 metres per second in 6 seconds; the area under it splits into a rectangle u t and a triangle half v minus u times t, and the total area 60 metres is the displacement', s);
})();

// ---------------------------------------------------------------- SHAPES: six x–t graphs and what they say
export const SHAPES = (() => {
  const w = 420;
  const h = 270;
  const pw = 118;
  const ph = 84;
  const panels = [
    { title: 'at rest', f: () => 0.5, claim: 'slope 0', test: (d) => d.every((x) => Math.abs(x) < 1e-9) },
    { title: 'uniform velocity, +x', f: (u) => 0.1 + 0.8 * u, claim: 'constant slope > 0', test: (d) => d.every((x) => near(x, d[0], 1e-6) && x > 0) },
    { title: 'uniform velocity, −x', f: (u) => 0.9 - 0.8 * u, claim: 'constant slope < 0', test: (d) => d.every((x) => near(x, d[0], 1e-6) && x < 0) },
    { title: 'speeding up', f: (u) => 0.08 + 0.85 * u * u, claim: 'slope grows', test: (d) => d.every((x, i) => i === 0 || x > d[i - 1]) && d[0] >= 0 },
    { title: 'slowing down', f: (u) => 0.08 + 0.85 * (1 - (1 - u) * (1 - u)), claim: 'slope falls to 0', test: (d) => d.every((x, i) => i === 0 || x < d[i - 1]) && Math.abs(d[d.length - 1]) < 0.05 },
    { title: 'turns back', f: (u) => 0.1 + 3.4 * u * (1 - u) * 0.85 + 0.0 * u, claim: 'slope + then −', test: (d) => d[0] > 0 && d[d.length - 1] < 0 },
  ];
  let s = '';
  let ok = true;
  panels.forEach((p, i) => {
    const px0 = 14 + (i % 3) * 136;
    const py0 = 12 + Math.floor(i / 3) * 124;
    // axes: x–t (time to the right, position up)
    s += S.arrow(px0 + 8, py0 + ph, px0 + pw, py0 + ph, { w: 1.2, size: 5 }) + S.arrow(px0 + 8, py0 + ph, px0 + 8, py0 + 2, { w: 1.2, size: 5 });
    s += S.text(px0 + pw, py0 + ph + 11, 't', { a: 'end', size: 10 }) + S.text(px0 + 12, py0 + 8, 'x', { size: 10 });
    const n = 40;
    const ys = [];
    let d = `M`;
    for (let k = 0; k <= n; k++) {
      const u = k / n;
      const yv = p.f(u);
      ys.push(yv);
      d += `${k ? ' L' : ''}${f1(px0 + 8 + (pw - 22) * u)} ${f1(py0 + ph - 6 - (ph - 16) * yv)}`;
    }
    s += S.path(d, { c: RED, w: 2 });
    s += S.text(px0 + pw / 2, py0 + ph + 26, p.title, { a: 'middle', size: 10, w: 'bold' }) + S.text(px0 + pw / 2, py0 + ph + 38, p.claim, { a: 'middle', size: 10, c: MUT });
    const slopes = ys.slice(1).map((y, k) => (y - ys[k]) * n);
    if (!p.test(slopes)) {
      ok = false;
      SELF_CHECKS.push(`FAIL shapes: ${p.title} does not show "${p.claim}"`);
    }
  });
  check(ok, 'shapes: all six x–t curves show the stated slope behaviour (zero, constant +, constant −, increasing, decreasing to zero, positive then negative)');
  return svgDoc(w, h, 'Six position-time graph shapes: a horizontal line for a body at rest, a straight line sloping up for uniform velocity in the positive direction, a straight line sloping down for uniform velocity in the negative direction, a curve getting steeper for speeding up, a curve flattening for slowing down, and a hump for a body that turns back', s);
})();

export const ALL = { FRAME, PATH, STROBE, STOP, VTAREA, SHAPES };
