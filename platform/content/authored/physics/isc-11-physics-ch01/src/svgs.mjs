// ISC 11 ch01 Units and Measurement diagrams: a log scale of lengths, the parallax triangle behind the parsec, the radian and
// steradian, reading a millimetre scale, repeated readings (mean and mean absolute error), the order-of-magnitude rule on a
// logarithmic decade, and the balance of dimensions in v² = u² + 2as. Every drawn quantity is computed; SELF_CHECKS is read by build.mjs.
import { svgDoc, S } from './lib.mjs';
import { LY, AU, PARSEC, ARCSEC, mean, meanAbsErr, pt, dimTxt, Q, L, dmul, deq, orderOfMag } from './calc.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

/** Data used by the ruler and dot-plot diagrams (also by the slides and questions). */
export const ROD = 5.27; // cm
export const PEND = [1.84, 1.9, 1.87, 1.83, 1.86]; // s, five timings of one swing

// ---------------------------------------------------------------- lengths on a logarithmic scale
export const LENGTHS = (() => {
  const w = 480;
  const h = 218;
  const x0 = 20;
  const lo = -15;
  const hi = 17;
  const k = (w - 2 * x0) / (hi - lo);
  const xOf = (len) => x0 + (Math.log10(len) - lo) * k;
  const yAx = 105;
  let s = S.line(x0, yAx, w - x0, yAx, { w: 2 });
  for (let e = -15; e <= 15; e += 5) {
    const x = xOf(10 ** e);
    s += S.line(x, yAx - 5, x, yAx + 5, { w: 1.5 }) + S.line(x, yAx + 5, x, 186, { c: MUT, w: 0.5, dash: '2 3' }) + S.text(x, 198, `10${e < 0 ? '⁻' : ''}${String(Math.abs(e)).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`, { a: 'middle', size: 10, c: MUT });
  }
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
  check(xs.every((x, i) => i === 0 || x > xs[i - 1]), 'lengths: fermi < angstrom < light < person < Earth < AU < light year < parsec in drawn order');
  check(near((xs[7] - xs[6]) / k, Math.log10(PARSEC / LY), 1e-9) && near((xs[6] - xs[5]) / k, Math.log10(LY / AU), 1e-9), `lengths: parsec is ${(PARSEC / LY).toFixed(2)} light years (${((xs[7] - xs[6]) / k).toFixed(2)} decades to the right); light year is ${pt(LY / AU, 3)} AU`);
  return svgDoc(w, h, 'A logarithmic scale of lengths from the fermi, 10 to the minus 15 metre, through the angstrom, the wavelength of light, a person and the Earth radius to the astronomical unit, the light year and the parsec', s);
})();

// ---------------------------------------------------------------- the parallax triangle behind the parsec
export const PARALLAX = (() => {
  const w = 480;
  const h = 200;
  const sx = 60;
  const sy = 130;
  const b = 62; // px, baseline Sun to Earth (1 AU)
  const D = 360; // px, distance to the star
  const stx = sx + D;
  const ex = sx;
  const ey = sy - b;
  const p = Math.atan2(b, D);
  let s = S.circle(sx, sy, 11, { c: ACC, fill: ACC, fop: 0.5 }) + S.text(sx - 16, sy + 26, 'Sun', { size: 11 });
  s += S.circle(ex, ey, 5, { c: BLUE, fill: BLUE }) + S.text(ex - 6, ey - 12, 'Earth', { size: 11, c: BLUE });
  s += S.line(sx, sy - 12, ex, ey + 6, { c: MUT, w: 1.5 });
  s += S.text(sx - 10, (sy + ey) / 2 + 4, 'b = 1 AU', { a: 'end', size: 11 });
  s += S.line(sx + 12, sy, stx - 8, sy, { c: MUT, w: 1.2, dash: '5 4' }) + S.text(sx + D / 2, sy + 18, 'D = distance to the star', { a: 'middle', size: 11 });
  s += S.line(ex + 6, ey, stx - 4, sy - 1, { c: RAY, w: 1.5 });
  s += S.circle(stx, sy, 6, { c: ACC, fill: ACC }) + S.text(stx, sy + 26, 'star', { a: 'middle', size: 11 });
  const ar = 80;
  const ax = stx - ar * Math.cos(p);
  const ay = sy - ar * Math.sin(p);
  s += S.path(`M${(stx - ar).toFixed(2)} ${sy} A${ar} ${ar} 0 0 1 ${ax.toFixed(2)} ${ay.toFixed(2)}`, { c: RAY, w: 1.8 });
  s += S.text(stx - ar - 8, sy - 8, 'p', { a: 'end', size: 13, it: true, c: RAY });
  s += S.lines(w / 2, 24, ['parallax angle p = angle that the baseline b subtends at the star', 'drawn far too large: even for the nearest star p is under one arcsecond'], { a: 'middle', size: 10, dy: 14 });
  s += S.text(w / 2, 190, 'D = b / p (p in radian);  1 parsec is the D at which 1 AU subtends p = 1 arcsecond', { a: 'middle', size: 10 });
  const drawn = Math.atan2(sy - ay, stx - ax);
  check(near(Math.tan(p), b / D, 1e-9) && near(drawn, p, 1e-9), `parallax: b = ${b} px and D = ${D} px give p = ${((p * 180) / Math.PI).toFixed(2)} deg (drawn arc ends on the Earth ray, tan p = b/D = ${(b / D).toFixed(4)})`);
  const pcCalc = AU / Math.tan(ARCSEC);
  check(near(pcCalc, PARSEC, 0.005) && near(ARCSEC, 4.848e-6, 0.001), `parallax: 1 AU / tan(1 arcsecond) = ${pt(pcCalc, 3)} m, equal to the parsec ${pt(PARSEC, 3)} m within 0.5 %; 1 arcsecond = ${pt(ARCSEC, 4)} rad`);
  return svgDoc(w, h, 'A right-angled triangle with the Sun and the Earth one astronomical unit apart and a distant star far to the right; the angle at the star is the parallax angle p, and the distance to the star is the baseline divided by p', s);
})();

// ---------------------------------------------------------------- radian and steradian
export const RADIAN = (() => {
  const w = 420;
  const h = 200;
  const cx = 100;
  const cy = 105;
  const R = 65;
  const th = 1;
  const ex = cx + R * Math.cos(th);
  const ey = cy - R * Math.sin(th);
  let s = S.circle(cx, cy, R, { c: MUT, sw: 1.2 });
  s += S.line(cx, cy, cx + R, cy) + S.line(cx, cy, ex, ey);
  s += S.path(`M${cx + R} ${cy} A${R} ${R} 0 0 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`, { c: RAY, w: 3.5 });
  const a0 = 22;
  s += S.path(`M${cx + a0} ${cy} A${a0} ${a0} 0 0 0 ${(cx + a0 * Math.cos(th)).toFixed(2)} ${(cy - a0 * Math.sin(th)).toFixed(2)}`, { w: 1.2 });
  s += S.text(cx - 28, cy + 44, 'θ = 1 rad', { size: 11 }) + S.lead(cx + 4, cy + 34, cx + a0 * Math.cos(0.5), cy - a0 * Math.sin(0.5)) + S.text(cx + R / 2, cy + 16, 'r', { a: 'middle', size: 11, it: true }) + S.text(cx + (R / 2) * Math.cos(th) - 10, cy - (R / 2) * Math.sin(th) - 2, 'r', { a: 'middle', size: 11, it: true });
  s += S.text(cx + R + 6, cy - R * 0.55, 'arc s = r', { size: 10, c: RAY });
  s += S.text(cx, 190, 'angle in radians = arc ÷ radius', { a: 'middle', size: 10 });
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
  check(near(ang, 1, 1e-9) && near(chord, 2 * R * Math.sin(0.5), 1e-9), `radian: arc end drawn at ${ang.toFixed(4)} rad (57.3 deg), chord = 2 r sin(0.5) = ${chord.toFixed(2)} for r = ${R}`);
  check(near(R * th, R, 1e-12) && Math.abs(180 / Math.PI - 57.2958) < 1e-3, 'radian: arc length r × 1 rad equals the radius; 1 rad is about 57.3 deg');
  return svgDoc(w, h, 'Left: a circle of radius r with an arc of length r marking an angle of one radian, about 57.3 degrees. Right: a sphere of radius r with a patch of area r squared on its surface marking a solid angle of one steradian', s);
})();

// ---------------------------------------------------------------- reading a millimetre scale
export const RULER = (() => {
  const w = 440;
  const h = 175;
  const x0 = 10;
  const sc = 70;
  const xOf = (cm) => x0 + cm * sc;
  let s = S.rect(x0, 85, 6 * sc, 45, { fill: FILL });
  for (let mm = 0; mm <= 60; mm++) {
    const x = xOf(mm / 10);
    const tall = mm % 10 === 0 ? 20 : mm % 5 === 0 ? 14 : 8;
    s += S.line(x, 85, x, 85 + tall, { w: mm % 10 === 0 ? 1.5 : 1 });
    if (mm % 10 === 0) s += S.text(x, 152, String(mm / 10), { a: 'middle', size: 11 });
  }
  s += S.text(xOf(6) - 4, 126, 'cm', { a: 'end', size: 10 });
  s += S.rect(x0, 45, ROD * sc, 28, { c: ACC, fill: ACC, fop: 0.35 }) + S.text(xOf(ROD / 2), 63, 'metal strip', { a: 'middle', size: 11 });
  s += S.line(xOf(ROD), 40, xOf(ROD), 85, { c: RAY, w: 1.5, dash: '4 3' });
  const lowMark = Math.floor(ROD * 10) / 10;
  s += S.text(430, 28, `end between ${lowMark.toFixed(1)} and ${(lowMark + 0.1).toFixed(1)} cm: read ${ROD.toFixed(2)} cm`, { a: 'end', size: 11, c: RAY });
  s += S.text(w / 2, 170, `least count 0.1 cm: the digit ${String(ROD.toFixed(2)).slice(-1)} is an estimate between two marks`, { a: 'middle', size: 10 });
  const lo = xOf(lowMark);
  const hi = xOf(lowMark + 0.1);
  check(xOf(ROD) > lo && xOf(ROD) < hi && near(xOf(ROD) - x0, ROD * sc), `ruler: strip end at ${ROD} cm lies between the ${lowMark.toFixed(1)} and ${(lowMark + 0.1).toFixed(1)} cm marks (${lo.toFixed(1)} < ${xOf(ROD).toFixed(1)} < ${hi.toFixed(1)}); scale ${sc} px per cm`);
  return svgDoc(w, h, `A metal strip placed against a millimetre scale: its end falls between the ${lowMark.toFixed(1)} and ${(lowMark + 0.1).toFixed(1)} centimetre marks, so the reading is ${ROD.toFixed(2)} centimetres with the last digit estimated`, s);
})();

// ---------------------------------------------------------------- repeated readings: mean and mean absolute error
export const DOTS = (() => {
  const w = 440;
  const h = 175;
  const lo = 1.76;
  const hi = 1.96;
  const x0 = 30;
  const wid = 380;
  const xOf = (v) => x0 + ((v - lo) / (hi - lo)) * wid;
  const m = mean(PEND);
  const d = meanAbsErr(PEND);
  const yAx = 100;
  let s = S.rect(xOf(m - d), 50, xOf(m + d) - xOf(m - d), 58, { c: ACC, fill: ACC, fop: 0.18, sw: 0.5 });
  s += S.line(x0, yAx, x0 + wid, yAx, { w: 1.5 });
  for (let i = 0; i <= 5; i++) {
    const v = 1.76 + i * 0.04;
    s += S.line(xOf(v), yAx - 4, xOf(v), yAx + 4) + S.text(xOf(v), yAx + 18, v.toFixed(2), { a: 'middle', size: 10, c: MUT });
  }
  s += S.line(xOf(m), 45, xOf(m), 108, { c: RAY, w: 1.8, dash: '5 3' }) + S.text(xOf(m), 38, `mean = ${m.toFixed(2)} s`, { a: 'middle', size: 11, c: RAY });
  [...PEND].sort((p, q) => p - q).forEach((v, i) => {
    s += S.circle(xOf(v), yAx, 5, { c: BLUE, fill: BLUE });
    const atMean = Math.abs(v - m) < 1e-9;
    s += S.text(atMean ? xOf(v) - 8 : xOf(v), atMean ? 58 : 84 - (i % 3) * 13, `${v.toFixed(2)}`, { a: atMean ? 'end' : 'middle', size: 10, c: BLUE });
  });
  s += S.text(w / 2, 168, `shaded band: mean ± mean absolute error = ± ${d.toFixed(2)} s`, { a: 'middle', size: 10 });
  s += S.text(x0 + wid, yAx + 34, 'time (s)', { a: 'end', size: 10 });
  const inBand = PEND.filter((v) => Math.abs(v - m) <= d + 1e-9).length;
  check(near(m, 1.86, 1e-9) && near(d, 0.02, 1e-9) && near(xOf(m + d) - xOf(m - d), 2 * d * (wid / (hi - lo)), 1e-9), `dots: mean ${m.toFixed(3)} s, mean absolute error ${d.toFixed(3)} s, band width ${(xOf(m + d) - xOf(m - d)).toFixed(1)} px = 2 × error × scale; ${inBand} of 5 readings lie inside it`);
  return svgDoc(w, h, 'Five stopwatch readings of the same time plotted on a number line with their mean marked by a dashed line and a shaded band showing the mean absolute error', s);
})();

// ---------------------------------------------------------------- order of magnitude on a logarithmic decade
export const ORDER = (() => {
  const w = 480;
  const h = 205;
  const x0 = 40;
  const W = 400;
  const xOf = (a) => x0 + W * Math.log10(a);
  const y = 100;
  const cut = Math.sqrt(10);
  let s = S.rect(x0, y - 16, xOf(cut) - x0, 32, { c: BLUE, fill: BLUE, fop: 0.18, sw: 0.5 }) + S.rect(xOf(cut), y - 16, x0 + W - xOf(cut), 32, { c: ACC, fill: ACC, fop: 0.25, sw: 0.5 });
  s += S.line(x0, y, x0 + W, y, { w: 2 });
  for (let a = 1; a <= 10; a++) s += S.line(xOf(a), y - 6, xOf(a), y + 6, { w: 1.2 }) + S.text(xOf(a), y + 22, String(a), { a: 'middle', size: 10, c: MUT });
  s += S.line(xOf(cut), y - 40, xOf(cut), y + 16, { c: RAY, w: 1.8, dash: '5 3' }) + S.text(xOf(cut), y - 46, '3.16 (the square root of 10)', { a: 'middle', size: 11, c: RAY });
  s += S.text(x0 + 4, y - 22, 'order = k', { size: 11, c: BLUE, w: 'bold' }) + S.text(x0 + W - 4, y - 22, 'order = k + 1', { a: 'end', size: 11, w: 'bold' });
  const hb = 2.65;
  const un = 4.35;
  s += S.lead(xOf(hb), y + 6, xOf(hb), y + 60) + S.circle(xOf(hb), y, 4, { c: BLUE, fill: BLUE }) + S.text(xOf(hb), y + 74, `a = ${hb}`, { a: 'middle', size: 11 });
  s += S.lead(xOf(un), y + 6, xOf(un), y + 60) + S.circle(xOf(un), y, 4, { c: ACC, fill: ACC }) + S.text(xOf(un), y + 74, `a = ${un}`, { a: 'middle', size: 11 });
  s += S.text(w / 2, 196, 'N = a × 10ᵏ with 1 ≤ a < 10: a up to 3.16 keeps k, larger a gives k + 1 (3.16 is the log midpoint)', { a: 'middle', size: 10 });
  const mid = x0 + W / 2;
  check(near(xOf(cut), mid, 1e-9) && xOf(hb) < xOf(cut) && xOf(un) > xOf(cut) && orderOfMag(hb * 1e9) === 9 && orderOfMag(un * 1e17) === 18, `order: 3.16 drawn at the midpoint ${xOf(cut).toFixed(1)} of the decade; a = ${hb} falls left (order k), a = ${un} right (order k + 1)`);
  return svgDoc(w, h, 'A logarithmic number line from 1 to 10 showing that the order of magnitude of a number a times ten to the k stays k when a is up to 3.16, the square root of ten, and becomes k plus 1 when a is larger', s);
})();

// ---------------------------------------------------------------- dimensional homogeneity: v² = u² + 2as
export const BALANCE = (() => {
  const w = 440;
  const h = 215;
  const yb = 62;
  const dimV = dimTxt(dmul(Q.velocity, Q.velocity));
  const dimU = dimTxt(dmul(Q.velocity, Q.velocity));
  const dimAs = dimTxt(dmul(Q.accel, L));
  const xl = 70;
  const xr = 360;
  let s = S.line(xl, yb, xr, yb, { w: 3 }) + S.path('M215 70 L195 150 L235 150 Z', { c: MUT, fill: FILL });
  s += S.circle(215, yb, 5, { fill: 'currentColor' });
  s += S.line(xl, yb, xl - 40, 100, { c: MUT, w: 1 }) + S.line(xl, yb, xl + 40, 100, { c: MUT, w: 1 }) + S.line(xr, yb, xr - 65, 100, { c: MUT, w: 1 }) + S.line(xr, yb, xr + 65, 100, { c: MUT, w: 1 });
  s += S.rect(xl - 45, 100, 90, 34, { fill: FILL }) + S.text(xl, 116, 'v²', { a: 'middle', size: 13, it: true }) + S.text(xl, 130, `[${dimV}]`, { a: 'middle', size: 11, c: BLUE });
  s += S.rect(xr - 70, 100, 140, 34, { fill: FILL }) + S.text(xr, 116, 'u²  +  2 a s', { a: 'middle', size: 13 }) + S.text(xr, 130, `[${dimU}] + [${dimAs}]`, { a: 'middle', size: 11, c: BLUE });
  s += S.text(215, 175, 'every term must have the same dimensions', { a: 'middle', size: 11, w: 'bold' });
  s += S.text(215, 193, `each term is [${dimV}], so v² = u² + 2as is dimensionally consistent`, { a: 'middle', size: 10 });
  check(deq(dmul(Q.velocity, Q.velocity), dmul(Q.accel, L)) && dimV === dimU && dimU === dimAs && dimV === 'L² T⁻²', 'balance: [v²] = [u²] = [2as] = L² T⁻², computed from the dimension algebra');
  return svgDoc(w, h, 'A balance with v squared on the left pan and u squared plus 2 a s on the right pan; each term has the dimension length squared per time squared, so the equation is dimensionally consistent', s);
})();

export const ALL = { LENGTHS, PARALLAX, RADIAN, RULER, DOTS, ORDER, BALANCE };
