// SVG diagrams for ICSE 9 Physics ch06 Upthrust and Archimedes' Principle: a body on a spring balance in air and in water
// (plain with readings, and lettered A-E with the pointers left to be read), an overflow can, three floating cases, and an
// iceberg whose drawn fractions are computed. Geometry is computed in JS; palette colours only; every font size is at least 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { SW, SW_APP, ICE_BELOW, ICE_ABOVE, ICE } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BROWN = 'var(--diagram-brown)';

// ---------------------------------------------------------------- 1. spring balance in air and in water
function balance(p, cx, reading, { pointer = true } = {}) {
  const y0 = 56; // zero of the scale
  const pxN = 5; // pixels per newton
  p.push(S.line(cx - 30, 14, cx + 30, 14, { w: 4 }), S.line(cx, 14, cx, 40, { w: 2 }));
  p.push(S.rect(cx - 20, 40, 40, 130, { fill: FILL, rx: 6, sw: 2 }));
  for (let n = 0; n <= 20; n++) {
    const major = n % 5 === 0;
    p.push(S.line(cx + 20, y0 + n * pxN, cx + 20 - (major ? 10 : 5), y0 + n * pxN, { w: 1 }));
    if (major) p.push(lab(cx + 25, y0 + n * pxN + 4, String(n), { size: 10 }));
  }
  p.push(lab(cx + 25, 46, 'N', { size: 10, c: MUT }));
  if (pointer) p.push(S.line(cx - 18, y0 + reading * pxN, cx + 16, y0 + reading * pxN, { c: RED, w: 2.5 }));
  p.push(S.line(cx, 170, cx, 196, { w: 2 }));
}
function springWater(lettered) {
  const p = [];
  const xl = 110;
  const xr = 360;
  const body = (cx) => S.rect(cx - 22, 196, 44, 40, { fill: BROWN, c: BROWN, fop: 0.35, sw: 2 });
  balance(p, xl, SW.w);
  balance(p, xr, SW_APP);
  // beaker with water on the right
  p.push(S.rect(xr - 70, 182, 140, 108, { fill: BLUE, c: 'none', fop: 0.25, sw: 0 }), S.path(`M ${xr - 70} 176 V 290 H ${xr + 70} V 176`, { w: 2.5 }));
  p.push(S.line(xr - 70, 182, xr + 70, 182, { c: BLUE, w: 1.5 }));
  p.push(body(xl), body(xr));
  // weight on both bodies, upthrust only in water
  p.push(S.arrow(xl - 34, 216, xl - 34, 262, { c: RED, w: 2.5, size: 8 }), S.arrow(xr - 34, 216, xr - 34, 262, { c: RED, w: 2.5, size: 8 }));
  p.push(S.arrow(xr + 30, 228, xr + 30, 202, { c: GREEN, w: 2.5, size: 8 }));
  if (lettered) {
    p.push(lab(xr - 36, 30, 'A', { size: 16, w: 'bold' }));
    p.push(lab(xr + 40, 224, 'B', { size: 16, w: 'bold' }));
    p.push(lab(xr + 50, 278, 'C', { size: 16, w: 'bold' }));
    p.push(lab(xr + 38, 198, 'D', { size: 16, w: 'bold', c: GREEN }));
    p.push(lab(xr - 42, 262, 'E', { a: 'end', size: 16, w: 'bold', c: RED }));
    p.push(lab(xl, 312, 'Body in air', { a: 'middle' }), lab(xr, 312, 'Body fully in water', { a: 'middle' }));
  } else {
    p.push(lab(xl, 312, `In air: weight ${SW.w} N`, { a: 'middle' }), lab(xr, 312, `In water: apparent weight ${SW_APP} N`, { a: 'middle' }));
    p.push(lab(xr + 32, 252, `U = ${SW.u} N`, { a: 'middle', size: 12, c: GREEN, w: 'bold' }), lab(xr - 34, 280, `W = ${SW.w} N`, { a: 'middle', size: 12, c: RED, w: 'bold' }));
    p.push(lab(xl - 34, 280, `W = ${SW.w} N`, { a: 'middle', size: 12, c: RED, w: 'bold' }));
  }
  const label = lettered
    ? 'Two spring balances hold the same body, the left one in air and the right one fully immersed in water in a beaker. On the right, A is the spring balance, B the body, C the water, D the upward arrow (upthrust) and E the downward arrow (weight). The pointer positions on the scales of 0 to 20 newton are left to be read'
    : `A spring balance holds a body of weight ${SW.w} newton in air, and the same body fully immersed in water, where the balance reads ${SW_APP} newton. The water pushes up on the body with an upthrust of ${SW.u} newton`;
  return svgDoc(480, 324, label, p.join(''));
}
export const SPRING_WATER = springWater(false);
export const SPRING_WATER_LETTERED = springWater(true);

// ---------------------------------------------------------------- 2. overflow can
export const OVERFLOW = (() => {
  const p = [];
  const x0 = 60;
  const x1 = 170;
  const lvl = 100;
  p.push(S.rect(x0, lvl, x1 - x0, 100, { fill: BLUE, c: 'none', fop: 0.25, sw: 0 }));
  p.push(S.path(`M ${x0} 56 V 200 H ${x1} V ${lvl} L 214 ${lvl} L 222 ${lvl + 10}`, { w: 2.5 }));
  p.push(S.line(80, 30, 150, 30, { w: 4 }), S.line(115, 30, 115, 122, { w: 1.5 }));
  p.push(S.rect(95, 122, 40, 36, { fill: BROWN, c: BROWN, fop: 0.35, sw: 2 }));
  // water drops and the receiving beaker
  p.push(S.circle(222, 126, 3, { fill: BLUE, c: BLUE }), S.circle(222, 144, 3, { fill: BLUE, c: BLUE }));
  p.push(S.rect(196, 160, 56, 40, { fill: BLUE, c: 'none', fop: 0.25, sw: 0 }) , S.path('M 196 150 V 200 H 252 V 150', { w: 2.5 }));
  p.push(S.line(196, 176, 252, 176, { c: BLUE, w: 1.5 }));
  p.push(lab(115, 218, 'overflow can', { a: 'middle', size: 12 }), lab(176, 92, 'water level at the spout', { size: 11, c: MUT }));
  p.push(lab(170, 20, 'thread', { size: 12 }), lab(140, 142, 'body', { size: 12 }));
  p.push(lab(262, 150, 'beaker collects', { size: 12 }), lab(262, 166, 'the displaced water', { size: 12 }));
  p.push(lab(10, 238, 'The water that overflows is the water displaced by the body.', { size: 12, c: MUT }));
  return svgDoc(420, 248, 'An overflow can filled with water up to its spout, with a body hanging from a thread fully immersed in it. The water pushed out of the spout falls into a small beaker; its weight equals the upthrust on the body', p.join(''));
})();

// ---------------------------------------------------------------- 3. sinking, floating fully immersed, floating partly immersed
export const FLOAT3 = (() => {
  const p = [];
  const cxs = [90, 270, 450];
  const lvl = 72;
  const bot = 200;
  const bh = 42;
  const titles = ['Sinks', 'Floats, fully immersed', 'Floats, partly immersed'];
  const notes = ['U is less than W', 'U equals W: same density', 'U equals W: body less dense'];
  cxs.forEach((cx, i) => {
    p.push(S.rect(cx - 62, lvl, 124, bot - lvl, { fill: BLUE, c: 'none', fop: 0.25, sw: 0 }), S.path(`M ${cx - 62} 40 V ${bot} H ${cx + 62} V 40`, { w: 2.5 }));
    p.push(S.line(cx - 62, lvl, cx + 62, lvl, { c: BLUE, w: 1.5 }));
    const y = [118, 118, lvl - bh / 2][i];
    p.push(S.rect(cx - 24, y, 48, bh, { fill: BROWN, c: BROWN, fop: 0.35, sw: 2 }));
    const wLen = i === 0 ? 52 : 36;
    const uLen = i === 0 ? 24 : 36;
    p.push(S.arrow(cx - 14, y + bh / 2, cx - 14, y + bh / 2 + wLen, { c: RED, w: 2.5, size: 8 }));
    p.push(S.arrow(cx + 14, y + bh / 2, cx + 14, y + bh / 2 - uLen, { c: GREEN, w: 2.5, size: 8 }));
    p.push(lab(cx - 20, y + bh / 2 + wLen + 2, 'W', { a: 'end', size: 12, w: 'bold', c: RED }), lab(cx + 20, y + bh / 2 - uLen + 4, 'U', { size: 12, w: 'bold', c: GREEN }));
    p.push(lab(cx, 28, titles[i], { a: 'middle', w: 'bold' }), lab(cx, bot + 22, notes[i], { a: 'middle', size: 12 }));
  });
  return svgDoc(540, 236, 'Three beakers of water. In the first, a body lies at the bottom: the upward arrow U is shorter than the downward arrow W, so it sinks. In the second, a body floats fully immersed with U equal to W. In the third, a less dense body floats partly above the surface with U equal to W', p.join(''));
})();

// ---------------------------------------------------------------- 4. iceberg
export const ICEBERG = (() => {
  const p = [];
  const lvl = 96;
  const total = 160;
  const above = (total * (100 - ICE.frac * 100)) / 100;
  const x0 = 140;
  const x1 = 290;
  p.push(S.rect(10, lvl, 420, 160, { fill: BLUE, c: 'none', fop: 0.25, sw: 0 }), S.line(10, lvl, 430, lvl, { c: BLUE, w: 1.5 }));
  const top = [[x0, lvl], [x0 + 18, lvl - above * 0.7], [x0 + 45, lvl - above], [x0 + 80, lvl - above * 0.6], [x0 + 112, lvl - above * 0.95], [x1, lvl]];
  const body = [...top, [x1, lvl + total - above], [x0, lvl + total - above]];
  p.push(`<polygon points="${body.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="${FILL}" fill-opacity="0.9" stroke="currentColor" stroke-width="2"/>`);
  const yb = lvl + total - above;
  p.push(S.arrow(320, lvl - above - 2, 320, lvl - 2, { w: 1.2, size: 6 }), S.arrow(320, lvl - 2, 320, lvl - above - 2, { w: 1.2, size: 6 }), lab(330, lvl - above / 2 + 2, `about ${ICE_ABOVE}% above`, { size: 12, w: 'bold' }));
  p.push(S.arrow(320, lvl + 2, 320, yb, { w: 1.2, size: 6 }), S.arrow(320, yb, 320, lvl + 2, { w: 1.2, size: 6 }), lab(330, (lvl + yb) / 2 + 4, `about ${ICE_BELOW}% below the surface`, { size: 12, w: 'bold' }));
  p.push(lab(20, 30, 'Ice 900 kg m⁻³ floating in sea water 1030 kg m⁻³', { size: 12, c: MUT }));
  p.push(lab(20, 48, 'Fraction immersed = density of ice ÷ density of sea water', { size: 12, c: MUT }));
  return svgDoc(440, 264, `An iceberg floating in sea water with a small part above the surface, about ${ICE_ABOVE} percent of its volume, and the rest, about ${ICE_BELOW} percent, below the surface`, p.join(''));
})();
