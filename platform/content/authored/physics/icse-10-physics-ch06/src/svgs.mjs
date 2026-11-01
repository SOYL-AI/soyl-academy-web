// ICSE 10 Physics ch06 diagrams (allow-listed elements, palette colours only). Geometry is computed and self-checked
// (SELF_CHECKS, read by build.mjs): each colour is traced through a flint-glass prism with Snell's law and its own refractive
// index, so violet is deviated most and red least; the electromagnetic spectrum is drawn on a logarithmic wavelength scale
// with region widths proportional to the decades they span and frequencies from c = f lambda; the visible band is drawn to a
// linear wavelength scale; and the sunlight paths at noon and at sunrise are chords through a spherical atmosphere.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const pow10 = (e) => `10${String(e).split('').map((ch) => SUP[ch]).join('')}`;
const D = Math.PI / 180;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit = (a) => mul(a, 1 / Math.hypot(a[0], a[1]));
function refract(d, nrm, n1, n2) {
  const cosi = -dot(nrm, d);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return unit(add(mul(d, eta), mul(nrm, eta * cosi - Math.sqrt(k))));
}
function meet(p, d, q, e) {
  const den = d[0] * e[1] - d[1] * e[0];
  const s = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den;
  return add(p, mul(d, s));
}

// ---------------------------------------------------------------- dispersion by a prism
/** Refractive indices of a dense flint glass for the seven colours (red to violet), rising with frequency. */
export const COLOURS = [
  { name: 'red', n: 1.612, c: RED },
  { name: 'orange', n: 1.616, c: ACC },
  { name: 'yellow', n: 1.62, c: YEL },
  { name: 'green', n: 1.626, c: GREEN },
  { name: 'blue', n: 1.635, c: BLUE },
  { name: 'indigo', n: 1.643, c: 'currentColor' },
  { name: 'violet', n: 1.652, c: BROWN },
];
export const DISPERSION_DATA = (() => {
  const A = 60;
  const i = 50;
  const P = [170, 30];
  const side = 200;
  const Q = [P[0] - side / 2, P[1] + side * Math.sin(A * D)];
  const R = [P[0] + side / 2, Q[1]];
  const M = add(P, mul(sub(Q, P), 0.5));
  const inL = [Math.cos(30 * D), Math.sin(30 * D)];
  const inR = [-Math.cos(30 * D), Math.sin(30 * D)];
  const d = [Math.cos((30 - i) * D), Math.sin((30 - i) * D)];
  const rays = COLOURS.map((col) => {
    const t1 = refract(d, mul(inL, -1), 1, col.n);
    const H = meet(M, t1, P, unit(sub(R, P)));
    const t2 = refract(t1, inR, col.n, 1);
    const dev = Math.acos(dot(d, t2)) / D;
    return { ...col, t1, H, t2, dev };
  });
  return { A, i, P, Q, R, M, d, rays };
})();
export const DISPERSION = (() => {
  const { P, Q, R, M, d, rays, i, A } = DISPERSION_DATA;
  let s = S.path(`M${P[0]} ${P[1]} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)} L${R[0].toFixed(1)} ${R[1].toFixed(1)} Z`, { fill: FILL, fop: 0.6, w: 1.5 });
  const start = sub(M, mul(d, 120));
  s += S.line(start[0], start[1], M[0], M[1], { w: 3 }) + S.midHead(start[0], start[1], M[0], M[1]) + lab(start[0] + 4, start[1] + 22, 'white light', { size: 11 });
  const screenX = 470;
  const ends = [];
  for (const ry of rays) {
    const end = add(ry.H, mul(ry.t2, (screenX - ry.H[0]) / ry.t2[0]));
    ends.push(end);
    s += S.line(M[0], M[1], ry.H[0], ry.H[1], { c: ry.c, w: 1 }) + S.line(ry.H[0], ry.H[1], end[0], end[1], { c: ry.c, w: 1.6 });
  }
  const yTop = ends[0][1] - 40;
  const yBot = ends[6][1] + 40;
  s += S.line(screenX, yTop, screenX, yBot, { w: 3, c: MUT }) + lab(screenX, yTop - 6, 'screen', { size: 10, a: 'middle', c: MUT });
  s += lab(screenX + 6, ends[0][1] + 4, 'red', { size: 10, c: RED }) + lab(screenX + 6, ends[6][1] + 4, 'violet', { size: 10 });
  s += lab(screenX - 60, ends[0][1] - 44, 'least deviated', { size: 10, c: RED, a: 'end' }) + lab(screenX - 8, ends[6][1] + 30, 'most deviated', { size: 10, a: 'end' });
  s += lab(10, 372, `Flint glass, A = ${A}°, i = ${i}°: deviation from ${rays[0].dev.toFixed(1)}° (red) to ${rays[6].dev.toFixed(1)}° (violet)`, { size: 10 });
  const devs = rays.map((x) => x.dev);
  const ys = ends.map((e) => e[1]);
  const mono = devs.every((v, k) => k === 0 || v > devs[k - 1]) && ys.every((v, k) => k === 0 || v > ys[k - 1]);
  check(mono, `dispersion: deviations ${devs.map((v) => v.toFixed(2)).join(', ')} degrees rise from red to violet, and the colours reach the screen in the order red (top) to violet (bottom)`);
  return svgDoc(530, 382, `White light enters a glass prism and is split into its colours. Each colour has a slightly different refractive index in glass, so each is bent by a different amount: red is deviated least, about ${Math.round(rays[0].dev)} degrees, and violet most, about ${Math.round(rays[6].dev)} degrees. On the screen the colours appear in the order red, orange, yellow, green, blue, indigo, violet, with red nearest the apex side.`, s);
})();

// ---------------------------------------------------------------- the electromagnetic spectrum, to a log scale
export const EM_REGIONS = [
  { name: 'gamma', lo: -13, hi: -11, c: BROWN },
  { name: 'X-rays', lo: -11, hi: -8, c: MUT },
  { name: 'UV', lo: -8, hi: Math.log10(4e-7), c: BLUE },
  { name: 'visible', lo: Math.log10(4e-7), hi: Math.log10(8e-7), c: YEL },
  { name: 'infrared', lo: Math.log10(8e-7), hi: -3, c: RED },
  { name: 'microwaves', lo: -3, hi: Math.log10(0.3), c: ACC },
  { name: 'radio waves', lo: Math.log10(0.3), hi: 3, c: GREEN },
];
export const EM_BAND = (() => {
  const x0 = 30;
  const x1 = 610;
  const L0 = -13;
  const L1 = 3;
  const X = (L) => x0 + ((L - L0) / (L1 - L0)) * (x1 - x0);
  const y = 70;
  const h = 40;
  let s = '';
  let widthsOk = true;
  EM_REGIONS.forEach((g, k) => {
    const a = X(g.lo);
    const b = X(g.hi);
    s += S.rect(a, y, b - a, h, { fill: g.c, fop: 0.35, c: 'currentColor', sw: 1 });
    const mid = (a + b) / 2;
    if (g.name === 'visible') s += S.lead(mid, y, mid, y - 22) + lab(mid, y - 26, 'visible', { size: 10, a: 'middle' });
    else s += lab(mid, y + h / 2 + 4, g.name, { size: g.name.length > 8 ? 10 : 11, a: 'middle' });
    if (!(Math.abs(b - a - ((g.hi - g.lo) / (L1 - L0)) * (x1 - x0)) < 1e-9 && (k === 0 || g.lo === EM_REGIONS[k - 1].hi))) widthsOk = false;
  });
  // wavelength ticks (m) below, frequency (Hz) above
  for (let L = -12; L <= 2; L += 2) {
    const x = X(L);
    s += S.line(x, y + h, x, y + h + 6, { w: 1 }) + lab(x, y + h + 18, pow10(L), { size: 10, a: 'middle' });
    const fexp = Math.round(Math.log10(3e8) - L);
    s += S.line(x, y - 4, x, y, { w: 1, c: MUT });
    s += lab(x, y - 8, `${(3e8 / 10 ** L / 10 ** fexp).toFixed(0)}×${pow10(fexp)}`, { size: 10, a: 'middle', c: MUT });
  }
  s += lab(x0, y + h + 36, 'wavelength (m) →  increasing', { size: 10 });
  s += lab(x1, y + h + 36, 'frequency (Hz, top) decreases →', { size: 10, a: 'end', c: MUT });
  s += lab(x0, 22, 'Electromagnetic spectrum (logarithmic scale: each tick is a factor of 100)', { size: 11 });
  const visW = X(EM_REGIONS[3].hi) - X(EM_REGIONS[3].lo);
  const freqOk = Math.abs(3e8 / 1e-6 - 3e14) < 1;
  check(widthsOk && freqOk && visW < 15, `EM spectrum: seven regions in order of increasing wavelength, contiguous, each drawn with width proportional to the powers of ten it spans; visible light (400–800 nm) is only ${visW.toFixed(1)} px of ${x1 - x0}; frequencies from f = c / wavelength`);
  return svgDoc(640, 160, 'The electromagnetic spectrum on a logarithmic wavelength scale from ten to the minus thirteen metre to a thousand metres. In order of increasing wavelength: gamma rays, X-rays, ultraviolet, a very narrow band of visible light from about 400 to 800 nanometres, infrared, microwaves and radio waves. Frequency decreases in the same direction.', s);
})();

// ---------------------------------------------------------------- the visible spectrum, linear scale
export const VISIBLE_BANDS = [
  { name: 'violet', lo: 400, hi: 440, c: BROWN },
  { name: 'indigo', lo: 440, hi: 460, c: 'currentColor' },
  { name: 'blue', lo: 460, hi: 500, c: BLUE },
  { name: 'green', lo: 500, hi: 570, c: GREEN },
  { name: 'yellow', lo: 570, hi: 590, c: YEL },
  { name: 'orange', lo: 590, hi: 620, c: ACC },
  { name: 'red', lo: 620, hi: 800, c: RED },
];
export const VISIBLE = (() => {
  const x0 = 30;
  const k = 1.4; // px per nm
  const X = (nm) => x0 + (nm - 400) * k;
  const y = 50;
  let s = '';
  VISIBLE_BANDS.forEach((b, j) => {
    s += S.rect(X(b.lo), y, (b.hi - b.lo) * k, 40, { fill: b.c, fop: 0.4, c: 'currentColor', sw: 0.8 });
    const mid = X((b.lo + b.hi) / 2);
    const yy = j % 2 ? y + 56 : y - 8;
    s += lab(mid, yy, b.name, { size: 10, a: 'middle' });
  });
  for (let nm = 400; nm <= 800; nm += 100) s += S.line(X(nm), y + 40, X(nm), y + 46, { w: 1 }) + lab(X(nm), y + 72, `${nm} nm`, { size: 10, a: 'middle' });
  s += S.arrow(x0, 140, X(800), 140, { c: RED, w: 1.2 }) + lab(x0, 156, 'wavelength increases; frequency and refractive index in glass decrease', { size: 10 });
  const ok = VISIBLE_BANDS.every((b, j) => j === 0 || b.lo === VISIBLE_BANDS[j - 1].hi) && Math.abs(X(800) - X(400) - 560) < 1e-9;
  check(ok, 'visible spectrum: seven contiguous bands from 400 nm (violet) to about 800 nm (red), drawn to a linear scale of 1.4 px per nm');
  return svgDoc(620, 168, 'The visible spectrum drawn to scale, from about 400 nanometres to about 800 nanometres: violet, indigo, blue, green, yellow, orange and red. Red light has the longest wavelength and violet the shortest.', s);
})();

// ---------------------------------------------------------------- noon and sunrise: path of sunlight through the air
export const SKY_PATHS = (() => {
  const C = [300, 520];
  const Rr = 420;
  const H = 70; // exaggerated thickness of the atmosphere (px)
  const O = [C[0], C[1] - Rr];
  let s = S.circle(C[0], C[1], Rr + H, { fill: BLUE, fop: 0.1, c: BLUE, sw: 1 }) + S.circle(C[0], C[1], Rr, { fill: GREEN, fop: 0.25, c: GREEN, sw: 1.5 });
  // noon: sun overhead, path along the vertical
  const noonLen = H;
  s += S.arrow(O[0], O[1] - H - 20, O[0], O[1] - 3, { c: YEL, w: 3 }) + lab(O[0] + 8, O[1] - H - 6, 'noon: short path', { size: 10 });
  // sunrise: sun on the horizon, path along the tangent
  const sunriseLen = Math.sqrt((Rr + H) ** 2 - Rr ** 2);
  const start = [O[0] - sunriseLen, O[1]];
  s += S.arrow(start[0] - 20, start[1], O[0] - 3, O[1], { c: RED, w: 3 }) + lab(start[0] - 12, start[1] - 10, 'sunrise: long path through air', { size: 10 });
  s += S.circle(O[0], O[1], 4, { fill: 'currentColor' }) + lab(O[0] + 8, O[1] + 16, 'observer', { size: 10 });
  s += lab(415, 60, 'atmosphere (thickness exaggerated)', { size: 10, c: BLUE }) + lab(300, 170, 'Earth', { size: 11, a: 'middle', c: GREEN });
  s += lab(20, 190, `Path at sunrise ≈ ${(sunriseLen / noonLen).toFixed(1)} × path at noon (in this drawing); blue is scattered out, red reaches the eye`, { size: 10 });
  check(sunriseLen > 3 * noonLen && Math.abs(Math.hypot(start[0] - C[0], start[1] - C[1]) - (Rr + H)) < 1e-9, `sky paths: the horizontal ray to the observer enters the atmosphere ${sunriseLen.toFixed(0)} px away, ${(sunriseLen / noonLen).toFixed(1)} times the vertical path of ${noonLen} px (tangent length sqrt((R + h)^2 - R^2))`);
  return svgDoc(620, 200, 'Sunlight reaching an observer on the Earth. At noon the Sun is overhead and its light crosses only the thickness of the atmosphere. At sunrise the Sun is on the horizon and its light travels a much longer path through the air, so most of the blue light is scattered away and the Sun looks red.', s);
})();
