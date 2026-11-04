// ch01 Units and Measurements diagrams: a log scale of lengths, the radian and steradian, reading a millimetre scale,
// a dot plot of repeated readings (mean and mean absolute error), the area-error rectangle, a simple pendulum,
// and the balance of dimensions in s = ut + (1/2)at^2. Every drawn quantity is computed; SELF_CHECKS is read by build.mjs.
import { svgDoc, S } from './lib.mjs';
import { LY, AU, PARSEC, ROD, RAMP, mean, meanAbsErr, roundSf, pt, dimTxt, Q, T, L, dmul, deq } from './calc.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ---------------------------------------------------------------- lengths on a logarithmic scale
export const LENGTHS = (() => {
  const w = 480;
  const h = 218;
  const x0 = 20;
  const lo = -15;
  const hi = 17;
  const k = (w - 2 * x0) / (hi - lo); // px per decade
  const xOf = (len) => x0 + (Math.log10(len) - lo) * k;
  const yAx = 105;
  let s = S.line(x0, yAx, w - x0, yAx, { w: 2 });
  for (let e = -15; e <= 15; e += 5) {
    const x = xOf(10 ** e);
    s += S.line(x, yAx - 5, x, yAx + 5, { w: 1.5 }) + S.line(x, yAx + 5, x, 186, { c: MUT, w: 0.5, dash: '2 3' }) + S.text(x, 198, `10${e < 0 ? '⁻' : ''}${String(Math.abs(e)).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`, { a: 'middle', size: 10, c: MUT });
  }
  // [length in m, label, label y, anchor]
  const items = [
    [1e-15, '1 fermi', 70, 'start'],
    [1e-10, '1 angstrom (atom)', 140, 'start'],
    [5.5e-7, 'visible light (0.55 μm)', 45, 'start'],
    [1.7, 'a person (1.7 m)', 170, 'middle'],
    [6.4e6, 'Earth radius', 70, 'middle'],
    [AU, '1 AU', 140, 'middle'],
    [LY, '1 light year', 45, 'end'],
    [PARSEC, '1 parsec', 170, 'end'],
  ];
  const xs = [];
  for (const [len, lab, y, a] of items) {
    const x = xOf(len);
    xs.push(x);
    const yEdge = y < yAx ? y + 4 : y - 12;
    s += S.lead(x, yAx, x, yEdge) + S.circle(x, yAx, 3.5, { c: ACC, fill: ACC }) + S.text(x, y, lab, { a, size: 10 });
  }
  s += S.text(w / 2, h - 3, 'logarithmic scale: each tick is a factor of 10⁵ in length (metres)', { a: 'middle', size: 10 });
  const ok = xs.every((x, i) => i === 0 || (i === 4 ? x > xs[3] : i === 5 ? x > xs[4] : true));
  check(ok && xs[0] < xs[1] && xs[1] < xs[2] && xs[2] < xs[3] && xs[3] < xs[4] && xs[4] < xs[5] && xs[5] < xs[6] && xs[6] < xs[7], 'lengths: fermi < angstrom < light < person < Earth < AU < light year < parsec in drawn order');
  check(near((xs[7] - xs[6]) / k, Math.log10(PARSEC / LY), 1e-9) && near((xs[6] - xs[5]) / k, Math.log10(LY / AU), 1e-9), `lengths: parsec is ${(PARSEC / LY).toFixed(2)} light years (${((xs[7] - xs[6]) / k).toFixed(2)} decades to the right); light year is ${pt(LY / AU, 3)} AU`);
  return svgDoc(w, h, 'A logarithmic scale of lengths from the fermi, 10 to the minus 15 metre, through the angstrom, the wavelength of light, a person and the Earth radius to the astronomical unit, the light year and the parsec', s);
})();

// ---------------------------------------------------------------- radian and steradian
export const RADIAN = (() => {
  const w = 420;
  const h = 200;
  const cx = 100;
  const cy = 105;
  const R = 65;
  const th = 1; // radian
  const ex = cx + R * Math.cos(th);
  const ey = cy - R * Math.sin(th);
  let s = S.circle(cx, cy, R, { c: MUT, sw: 1.2 });
  s += S.line(cx, cy, cx + R, cy) + S.line(cx, cy, ex, ey);
  s += S.path(`M${cx + R} ${cy} A${R} ${R} 0 0 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`, { c: RAY, w: 3.5 });
  const a0 = 22;
  s += S.path(`M${cx + a0} ${cy} A${a0} ${a0} 0 0 0 ${(cx + a0 * Math.cos(th)).toFixed(2)} ${(cy - a0 * Math.sin(th)).toFixed(2)}`, { w: 1.2 });
  s += S.text(cx + 30, cy + 34, 'θ = 1 rad', { size: 11 }) + S.lead(cx + 38, cy + 22, cx + 20, cy - 4) + S.text(cx + R / 2, cy + 16, 'r', { a: 'middle', size: 11, it: true }) + S.text(cx + (R / 2) * Math.cos(th) - 10, cy - (R / 2) * Math.sin(th) - 2, 'r', { a: 'middle', size: 11, it: true });
  s += S.text(cx + R + 6, cy - R * 0.55, 'arc s = r', { size: 10, c: RAY });
  s += S.text(cx, 190, 'angle in radians = arc ÷ radius', { a: 'middle', size: 10 });
  // steradian
  const c2x = 300;
  const R2 = 55;
  s += S.circle(c2x, cy, R2, { c: MUT, sw: 1.2, dash: '4 3' });
  s += S.ellipse(c2x + R2 - 3, cy, 7, 19, { c: RAY, fill: RAY, fop: 0.3 });
  s += S.line(c2x, cy, c2x + R2 - 3, cy - 18) + S.line(c2x, cy, c2x + R2 - 3, cy + 18);
  s += S.line(c2x, cy, c2x - R2 * 0.7, cy + R2 * 0.7, { c: MUT, w: 1 }) + S.text(c2x - 40, cy + 10, 'r', { size: 11, it: true });
  s += S.text(c2x + 5, cy - R2 - 8, 'patch of area A = r²', { size: 10, c: RAY });
  s += S.text(c2x, 175, 'solid angle = A ÷ r²;  1 steradian when A = r²', { a: 'middle', size: 10 });
  s += S.text(c2x, 190, 'whole sphere: 4π steradian', { a: 'middle', size: 10 });
  const ang = Math.atan2(cy - ey, ex - cx);
  const chord = Math.hypot(ex - (cx + R), ey - cy);
  check(near(ang, 1, 1e-9) && near(chord, 2 * R * Math.sin(0.5), 1e-9), `radian: arc end drawn at ${ang.toFixed(4)} rad (57.3°), chord = 2 r sin(0.5) = ${chord.toFixed(2)} for r = ${R}`);
  check(near(R * th, R, 1e-12) && Math.abs((180 / Math.PI) - 57.2958) < 1e-3, 'radian: arc length r × 1 rad equals the radius; 1 rad ≈ 57.3°');
  return svgDoc(w, h, 'Left: a circle of radius r with an arc of length r marking an angle of one radian, about 57.3 degrees. Right: a sphere of radius r with a patch of area r squared on its surface marking a solid angle of one steradian', s);
})();

// ---------------------------------------------------------------- reading a millimetre scale
export const RULER = (() => {
  const w = 440;
  const h = 175;
  const x0 = 10;
  const sc = 70; // px per cm
  const xOf = (cm) => x0 + cm * sc;
  let s = S.rect(x0, 85, 6 * sc, 45, { fill: FILL });
  for (let mm = 0; mm <= 60; mm++) {
    const x = xOf(mm / 10);
    const tall = mm % 10 === 0 ? 20 : mm % 5 === 0 ? 14 : 8;
    s += S.line(x, 85, x, 85 + tall, { w: mm % 10 === 0 ? 1.5 : 1 });
    if (mm % 10 === 0) s += S.text(x, 152, String(mm / 10), { a: 'middle', size: 11 });
  }
  s += S.text(xOf(6) - 4, 126, 'cm', { a: 'end', size: 10 });
  s += S.rect(x0, 45, ROD * sc, 28, { c: ACC, fill: ACC, fop: 0.35 }) + S.text(xOf(ROD / 2), 63, 'rod', { a: 'middle', size: 11 });
  s += S.line(xOf(ROD), 40, xOf(ROD), 85, { c: RAY, w: 1.5, dash: '4 3' });
  s += S.text(430, 28, `end between ${(Math.floor(ROD * 10) / 10).toFixed(1)} and ${(Math.floor(ROD * 10) / 10 + 0.1).toFixed(1)} cm: read ${ROD.toFixed(2)} cm`, { a: 'end', size: 11, c: RAY });
  s += S.text(w / 2, 170, `least count 0.1 cm: the digit ${String(ROD.toFixed(2)).slice(-1)} is an estimate between two marks`, { a: 'middle', size: 10 });
  const lo = xOf(Math.floor(ROD * 10) / 10);
  const hi = xOf(Math.floor(ROD * 10) / 10 + 0.1);
  check(xOf(ROD) > lo && xOf(ROD) < hi && near(xOf(ROD) - x0, ROD * sc), `ruler: rod end at ${ROD} cm lies between the 4.6 and 4.7 cm marks (${lo.toFixed(1)} < ${xOf(ROD).toFixed(1)} < ${hi.toFixed(1)}); scale ${sc} px per cm`);
  return svgDoc(w, h, `A rod placed against a millimetre scale: its end falls between the 4.6 and 4.7 centimetre marks, so the reading is ${ROD.toFixed(2)} centimetres with the last digit estimated`, s);
})();

// ---------------------------------------------------------------- repeated readings: mean and mean absolute error
export const DOTS = (() => {
  const w = 440;
  const h = 175;
  const lo = 2.4;
  const hi = 2.6;
  const x0 = 30;
  const wid = 380;
  const xOf = (v) => x0 + ((v - lo) / (hi - lo)) * wid;
  const m = mean(RAMP);
  const d = meanAbsErr(RAMP);
  const yAx = 100;
  let s = S.rect(xOf(m - d), 50, xOf(m + d) - xOf(m - d), 58, { c: ACC, fill: ACC, fop: 0.18, sw: 0.5 });
  s += S.line(x0, yAx, x0 + wid, yAx, { w: 1.5 });
  for (let v = 2.4; v < 2.601; v += 0.05) s += S.line(xOf(v), yAx - 4, xOf(v), yAx + 4) + S.text(xOf(v), yAx + 18, v.toFixed(2), { a: 'middle', size: 10, c: MUT });
  s += S.line(xOf(m), 45, xOf(m), 108, { c: RAY, w: 1.8, dash: '5 3' }) + S.text(xOf(m), 38, `mean = ${m.toFixed(2)} s`, { a: 'middle', size: 11, c: RAY });
  [...RAMP].sort((p, q) => p - q).forEach((v, i) => {
    s += S.circle(xOf(v), yAx, 5, { c: BLUE, fill: BLUE });
    s += S.text(xOf(v), 84 - (i % 3) * 13, `${v.toFixed(2)}`, { a: 'middle', size: 10, c: BLUE });
  });
  s += S.text(w / 2, 168, `shaded band: mean ± mean absolute error = ± ${d.toFixed(3)} s`, { a: 'middle', size: 10 });
  s += S.text(x0 + wid, yAx + 34, 'time (s)', { a: 'end', size: 10 });
  const inBand = RAMP.filter((v) => Math.abs(v - m) <= d).length;
  check(near(m, 2.5, 1e-9) && near(d, 0.028, 1e-9) && near(xOf(m + d) - xOf(m - d), 2 * d * (wid / (hi - lo)), 1e-9), `dots: mean ${m.toFixed(3)} s, mean absolute error ${d.toFixed(3)} s, band width ${(xOf(m + d) - xOf(m - d)).toFixed(1)} px = 2 × error × scale; ${inBand} of 5 readings lie inside it`);
  return svgDoc(w, h, 'Five stopwatch readings of the same time plotted on a number line with their mean marked by a dashed line and a shaded band showing the mean absolute error', s);
})();

// ---------------------------------------------------------------- area of a rectangle with errors in l and b
export const AREA = (() => {
  const w = 500;
  const h = 215;
  const l = 6.0;
  const b = 4.0;
  const dl = 0.3;
  const db = 0.2;
  const sc = 30;
  const x0 = 40;
  const y0 = 40;
  const W = l * sc;
  const H = b * sc;
  const pw = dl * sc;
  const ph = db * sc;
  let s = S.rect(x0, y0, W, H, { fill: FILL });
  s += S.rect(x0 + W, y0, pw, H, { c: RAY, fill: RAY, fop: 0.35 }) + S.rect(x0, y0 + H, W, ph, { c: BLUE, fill: BLUE, fop: 0.35 }) + S.rect(x0 + W, y0 + H, pw, ph, { c: ACC, fill: ACC, fop: 0.6 });
  s += S.text(x0 + W / 2, y0 + H / 2 + 4, 'A = l b', { a: 'middle', size: 13 });
  s += S.line(x0, y0 - 12, x0 + W, y0 - 12, { c: MUT, w: 1 }) + S.text(x0 + W / 2, y0 - 18, `l = ${l.toFixed(1)} cm`, { a: 'middle', size: 11 });
  s += S.text(x0 - 6, y0 + H / 2 + 4, `b = ${b.toFixed(1)}`, { a: 'end', size: 11 }) + S.text(x0 - 6, y0 + H / 2 + 18, 'cm', { a: 'end', size: 11 });
  s += S.text(x0 + W + pw + 6, y0 + 14, `Δl = ${dl.toFixed(1)}`, { size: 10, c: RAY });
  s += S.text(x0 + W + pw + 6, y0 + H + ph - 4, `Δb = ${db.toFixed(1)}`, { size: 10, c: BLUE });
  const A = l * b;
  const sR = b * dl;
  const sB = l * db;
  const sC = dl * db;
  const rx = 290;
  s += S.lines(rx, 60, [`A = ${A.toFixed(1)} cm²`, `red strip  b Δl = ${sR.toFixed(2)} cm²`, `blue strip  l Δb = ${sB.toFixed(2)} cm²`, `corner  Δl Δb = ${sC.toFixed(2)} cm²`, 'the corner is tiny, so ignore it:', `ΔA ≈ b Δl + l Δb = ${(sR + sB).toFixed(2)} cm²`, `ΔA / A = Δl/l + Δb/b = ${(((dl / l + db / b) * 100)).toFixed(0)} %`], { size: 11, dy: 18 });
  const pxRatio = (pw * H) / (W * ph);
  check(near(pxRatio, sR / sB, 1e-9) && sC / (sR + sB) < 0.03 && near((sR + sB) / A, dl / l + db / b, 1e-9), `area: strips drawn in the ratio ${pxRatio.toFixed(2)} (= b Δl : l Δb), corner is ${((sC / (sR + sB)) * 100).toFixed(1)} % of the two strips, ΔA/A = ${(((sR + sB) / A) * 100).toFixed(1)} % = Δl/l + Δb/b`);
  return svgDoc(w, h, 'A rectangle of length 6.0 centimetres and breadth 4.0 centimetres with small strips for the errors in length and breadth; the area error is the two long strips and a negligible corner', s);
})();

// ---------------------------------------------------------------- a simple pendulum
export const PENDULUM = (() => {
  const w = 300;
  const h = 240;
  const px = 110;
  const py = 22;
  const len = 150;
  const th = (25 * Math.PI) / 180;
  const bx = px + len * Math.sin(th);
  const by = py + len * Math.cos(th);
  let s = S.line(px - 55, py, px + 55, py, { w: 2.5 });
  for (let x = px - 55; x < px + 55; x += 11) s += S.line(x, py, x - 7, py - 8, { c: MUT, w: 1 });
  s += S.line(px, py, px, py + len + 14, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(px, py, bx, by, { w: 1.8 }) + S.circle(bx, by, 12, { fill: ACC, fop: 0.5 }) + S.text(bx + 16, by + 4, 'bob, mass m', { size: 10 });
  s += S.path(`M${px} ${py + 45} A45 45 0 0 0 ${(px + 45 * Math.sin(th)).toFixed(2)} ${(py + 45 * Math.cos(th)).toFixed(2)}`, { w: 1.2 }) + S.text(px + 8, py + 62, 'θ', { size: 11 });
  s += S.text((px + bx) / 2 + 8, (py + by) / 2 - 6, 'l', { size: 12, it: true });
  s += S.arrow(250, 90, 250, 150, { c: GRN, w: 1.8, size: 7 }) + S.text(250, 82, 'g', { a: 'middle', size: 12, it: true, c: GRN });
  s += S.lines(150, 195, ['period T = time for one', 'complete to-and-fro swing'], { size: 10, dy: 13 });
  s += S.text(10, 230, 'T could depend on m, l and g', { size: 10 });
  const dist = Math.hypot(bx - px, by - py);
  const angle = Math.atan2(bx - px, by - py);
  check(near(dist, len, 1e-9) && near(angle, th, 1e-9), `pendulum: string drawn ${dist.toFixed(1)} px long at ${((angle * 180) / Math.PI).toFixed(1)}° from the vertical`);
  return svgDoc(w, h, 'A simple pendulum: a bob of mass m on a string of length l hanging from a support, displaced by a small angle theta from the vertical, with gravity g acting downwards', s);
})();

// ---------------------------------------------------------------- dimensional homogeneity: s = ut + (1/2) a t^2
export const BALANCE = (() => {
  const w = 440;
  const h = 215;
  const yb = 62;
  const dimS = dimTxt(L);
  const dimUt = dimTxt(dmul(Q.velocity, T));
  const dimAt2 = dimTxt(dmul(Q.accel, T, T));
  const xl = 70;
  const xr = 360;
  let s = S.line(xl, yb, xr, yb, { w: 3 }) + S.path('M215 70 L195 150 L235 150 Z', { c: MUT, fill: FILL });
  s += S.circle(215, yb, 5, { fill: 'currentColor' });
  s += S.line(xl, yb, xl - 40, 100, { c: MUT, w: 1 }) + S.line(xl, yb, xl + 40, 100, { c: MUT, w: 1 }) + S.line(xr, yb, xr - 65, 100, { c: MUT, w: 1 }) + S.line(xr, yb, xr + 65, 100, { c: MUT, w: 1 });
  s += S.rect(xl - 45, 100, 90, 34, { fill: FILL }) + S.text(xl, 116, 's', { a: 'middle', size: 13, it: true }) + S.text(xl, 130, `[${dimS}]`, { a: 'middle', size: 11, c: BLUE });
  s += S.rect(xr - 70, 100, 140, 34, { fill: FILL }) + S.text(xr, 116, 'u t  +  ½ a t²', { a: 'middle', size: 13 }) + S.text(xr, 130, `[${dimUt}] + [${dimAt2}]`, { a: 'middle', size: 11, c: BLUE });
  s += S.text(215, 175, 'every term must have the same dimensions', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(215, 193, `here each term is a length, [${dimS}], so the equation is dimensionally consistent`, { a: 'middle', size: 10 });
  check(deq(dmul(Q.velocity, T), L) && deq(dmul(Q.accel, T, T), L) && dimS === 'L' && dimUt === 'L' && dimAt2 === 'L', 'balance: [u t] = [½ a t²] = [s] = L, computed from the dimension algebra');
  return svgDoc(w, h, 'A balance with the displacement s on the left pan and u t plus half a t squared on the right pan; each term has the dimension of length, so the equation is dimensionally consistent', s);
})();

export const ALL = { LENGTHS, RADIAN, RULER, DOTS, AREA, PENDULUM, BALANCE };
void roundSf;
