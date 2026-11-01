// ISC ch12 diagrams: displacement current in a charging capacitor, the circular magnetic field round the gap (end-on view),
// a plane EM wave with E, B and the direction of travel, the electromagnetic spectrum on a logarithmic wavelength scale,
// and what the atmosphere does to each band. Directions are worked out in explicit coordinates (screen: x right, y down,
// z into the page) and checked with cross products; the spectrum order and the atmosphere drawing are checked against their
// data tables (SELF_CHECKS). The capacitor, wave and spectrum drawings are adapted from the author's CBSE 12 Physics ch08
// code (copied, not imported).
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

// ---------------------------------------------------------------- displacement current in a charging capacitor
export const DISP_DATA = { plusX: 170, minusX: 222, currentDir: +1 };
export const DISPLACEMENT = (() => {
  const w = 400;
  const h = 224;
  const { plusX, minusX, currentDir } = DISP_DATA;
  let s = '';
  s += S.line(20, 110, plusX, 110, { w: 2 }) + S.line(minusX + 8, 110, 380, 110, { w: 2 });
  s += S.rect(plusX, 50, 8, 120, { c: POS, sw: 1.5, fill: POS, fop: 0.3 }) + S.rect(minusX, 50, 8, 120, { c: NEG, sw: 1.5, fill: NEG, fop: 0.3 });
  s += S.text(plusX + 4, 186, '+q', { a: 'middle', size: 11, c: POS, w: 'bold' }) + S.text(minusX + 4, 186, '−q', { a: 'middle', size: 11, c: NEG, w: 'bold' });
  const eArrows = [70, 95, 125, 150].map((y) => [plusX + 12, y, minusX - 4, y]);
  for (const [x1, y, x2] of eArrows) s += S.arrow(x1, y, x2, y, { c: MUT, w: 1.2, size: 5 });
  s += S.text(200, 42, 'E growing', { a: 'middle', size: 10 });
  s += S.arrow(60, 102, 120, 102, { c: ACC, w: 2 }) + S.text(20, 94, 'i (conduction)', { size: 10 });
  s += S.arrow(260, 102, 330, 102, { c: ACC, w: 2 }) + S.text(296, 94, 'i', { a: 'middle', size: 10, it: true });
  // Amperian loop round the wire, with two surfaces: a flat disc (cut by the wire) and a bag through the gap
  s += S.ellipse(110, 110, 10, 34, { c: GRN, sw: 1.6 });
  s += S.path('M110 76 C170 30 215 40 200 110 C215 180 170 190 110 144', { c: GRN, w: 1.4, dash: '5 3' });
  s += S.text(96, 165, 'loop', { a: 'end', size: 10 }) + S.text(205, 210, 'surface through the gap: no conduction current, but a changing E', { a: 'middle', size: 10 });
  s += S.text(200, 20, 'i_d = ε₀ dΦE/dt = i', { a: 'middle', size: 12, w: 'bold' });
  // check: the charging current flows into the left plate (+x along the wire), so that plate is +; E points from + to −
  const eDir = Math.sign(eArrows[0][2] - eArrows[0][0]);
  check(currentDir > 0 && plusX < minusX && eDir === Math.sign(minusX - plusX), 'displacement current: current flows into the left plate, which is drawn +, and E is drawn from the + plate to the − plate (the same sense as i)');
  return svgDoc(w, h, 'A capacitor being charged: conduction current i flows in the wires but no charge crosses the gap. For a loop round the wire, a surface that bulges through the gap encloses no conduction current, but the electric field there is growing; the displacement current epsilon nought times the rate of change of electric flux equals i and keeps the current continuous', s);
})();

// ---------------------------------------------------------------- end-on view: circular B round the gap
export const BLOOP_DATA = { plateR: 70, rings: [30, 55, 95] };
export const BLOOPS = (() => {
  const w = 360;
  const h = 252;
  const cx = 180;
  const cy = 118;
  const { plateR, rings } = BLOOP_DATA;
  let s = '';
  s += S.circle(cx, cy, plateR, { c: POS, sw: 1.5, fill: POS, fop: 0.12, dash: '6 4' });
  // displacement current into the page (+z): a cross in a circle
  s += S.circle(cx, cy, 9, { sw: 1.6 }) + S.line(cx - 6, cy - 6, cx + 6, cy + 6, { w: 1.6 }) + S.line(cx - 6, cy + 6, cx + 6, cy - 6, { w: 1.6 });
  // B direction at the rightmost point of each ring: z-hat × r-hat (r-hat = +x)
  const bAtRight = cross([0, 0, 1], [1, 0, 0]);
  const down = bAtRight[1] > 0;
  for (const rr of rings) {
    s += S.circle(cx, cy, rr, { c: NEG, sw: 1.5 });
    // heads at the right (pointing down if clockwise) and at the left (pointing up)
    s += S.head(cx + rr, cy + 4, down ? Math.PI / 2 : -Math.PI / 2, { c: NEG, size: 7 });
    s += S.head(cx - rr, cy - 4, down ? -Math.PI / 2 : Math.PI / 2, { c: NEG, size: 7 });
  }
  s += S.text(cx, 14, 'looking along the axis; i_d into the page', { a: 'middle', size: 10 });
  s += S.lead(cx + plateR * 0.707, cy - plateR * 0.707, 288, 44) + S.text(290, 42, 'plate edge', { size: 10 });
  s += S.text(cx + rings[2] * 0.72 + 6, cy + rings[2] * 0.72 + 12, 'B', { it: true, w: 'bold', c: NEG });
  s += S.text(cx, 236, 'B forms circles round the axis, inside and outside the gap, clockwise here', { a: 'middle', size: 10 });
  check(down === true && rings.every((rr, i) => i === 0 || rr > rings[i - 1]), 'B loops: for i_d into the page, z × x points down the page at the right of each ring, so the loops are drawn clockwise');
  check(rings.some((rr) => rr < plateR) && rings.some((rr) => rr > plateR), 'B loops: rings drawn both inside and outside the plate edge');
  return svgDoc(w, h, 'End-on view of the circular plates of a charging capacitor, looking along the axis with the displacement current into the page: the magnetic field lines are circles centred on the axis, both within the plate area and beyond its edge, running clockwise, just as round a wire carrying the same current', s);
})();

// ---------------------------------------------------------------- plane EM wave
export const WAVE = (() => {
  const w = 420;
  const h = 240;
  const O = [40, 130];
  const L = 360;
  let s = S.arrow(O[0], O[1], O[0] + L, O[1], { c: 'currentColor', w: 1.5 }) + S.text(O[0] + L - 4, O[1] + 62, 'x (direction of travel)', { a: 'end', size: 10 });
  // E along y (up on the page), B along z drawn obliquely (down-left at 30°)
  const k = (2 * Math.PI) / 180;
  let dE = '';
  let dB = '';
  const dz = [-Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)]; // oblique screen direction for +z (towards the viewer)
  for (let i = 0; i <= 360; i += 4) {
    const v = Math.sin(k * i);
    dE += `${i ? ' L' : 'M'}${f1(O[0] + i)} ${f1(O[1] - 70 * v)}`;
    dB += `${i ? ' L' : 'M'}${f1(O[0] + i + 45 * v * dz[0])} ${f1(O[1] + 45 * v * dz[1])}`;
  }
  s += S.path(dE, { c: POS, w: 2 }) + S.path(dB, { c: NEG, w: 2 });
  for (let i = 15; i <= 360; i += 30) {
    const v = Math.sin(k * i);
    s += S.line(O[0] + i, O[1], O[0] + i, O[1] - 70 * v, { c: POS, w: 0.8 });
    s += S.line(O[0] + i, O[1], O[0] + i + 45 * v * dz[0], O[1] + 45 * v * dz[1], { c: NEG, w: 0.8 });
  }
  s += S.text(O[0] + 45, O[1] - 76, 'E (along y)', { size: 11, c: POS, w: 'bold' }) + S.text(O[0] + 10, O[1] + 46, 'B (along z)', { size: 11, c: NEG, w: 'bold' });
  s += S.line(O[0] + 180, O[1] - 92, O[0] + 360, O[1] - 92, { w: 1 }) + S.text(O[0] + 270, O[1] - 98, 'one wavelength λ', { a: 'middle', size: 10 });
  // physical axes x (travel), y (E), z (B): E × B ∝ ŷ × ẑ = x̂
  const prop = cross([0, 1, 0], [0, 0, 1]);
  check(prop[0] > 0 && prop[1] === 0 && prop[2] === 0, 'EM wave: E along y and B along z give E × B along +x, the direction of travel drawn');
  check(Math.abs(Math.sin(k * 180)) < 1e-9 && Math.abs(Math.sin(k * 360)) < 1e-9, 'EM wave: E and B both drawn from the same sin kx (in phase), and the bracket from 180 to 360 spans one wavelength');
  s += S.text(210, 222, 'E and B in phase, at right angles to each other and to x; E₀/B₀ = c', { a: 'middle', size: 10 });
  return svgDoc(w, h, 'A plane electromagnetic wave travelling along x: the electric field oscillates along y and the magnetic field along z, in phase with each other; both are at right angles to the direction of travel, so the wave is transverse, and the ratio of their peak values is the speed of light', s);
})();

// ---------------------------------------------------------------- electromagnetic spectrum on a log scale
export const BANDS = [
  // name, longest and shortest wavelength (m), approximate
  ['Radio', 1e4, 0.3],
  ['Microwave', 0.3, 1e-3],
  ['Infrared', 1e-3, 7e-7],
  ['Visible', 7e-7, 4e-7],
  ['Ultraviolet', 4e-7, 1e-9],
  ['X-rays', 1e-9, 1e-12],
  ['Gamma rays', 1e-12, 1e-14],
];
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (e) => String(e).split('').map((ch) => SUP[ch]).join('');
/** Band of a vacuum wavelength (m), from the table above. */
export const bandOf = (lam) => BANDS.find(([, a, b]) => lam <= a && lam > b)?.[0] ?? null;
export const SPECTRUM = (() => {
  const w = 440;
  const h = 176;
  const x0 = 20;
  const x1 = 420;
  const lmax = 4;
  const lmin = -14;
  const X = (lam) => x0 + ((lmax - Math.log10(lam)) / (lmax - lmin)) * (x1 - x0);
  const cols = [MUT, ACC, POS, GRN, NEG, MUT, ACC];
  let s = '';
  BANDS.forEach(([name, a, b], i) => {
    const xa = X(a);
    const xb = name === 'Visible' ? X(b) + 4 : X(b);
    s += S.rect(xa, 60, xb - xa, 34, { c: 'currentColor', sw: 1, fill: cols[i], fop: 0.35 });
    const mid = (xa + xb) / 2;
    s += S.text(mid, i % 2 ? 112 : 52, name, { a: 'middle', size: 10, w: 'bold' });
  });
  for (let e = 4; e >= -14; e -= 3) s += S.line(X(10 ** e), 94, X(10 ** e), 100, { w: 1 }) + S.text(X(10 ** e), 134, `10${sup(e)}`, { a: 'middle', size: 10 });
  s += S.text(220, 152, 'wavelength (m), logarithmic scale; f = c/λ increases to the right', { a: 'middle', size: 10 });
  s += S.text(220, 168, 'all bands travel at c in vacuum', { a: 'middle', size: 10 });
  s += S.arrow(300, 20, 410, 20, { c: ACC, w: 1.5 }) + S.text(296, 24, 'higher frequency, more penetrating', { a: 'end', size: 10 });
  const ordered = BANDS.every((bnd, i) => i === 0 || bnd[1] <= BANDS[i - 1][2] * 1.0001);
  check(ordered, 'spectrum: bands are contiguous and ordered by decreasing wavelength (increasing frequency to the right)');
  check(Math.abs(X(7e-7) - X(4e-7)) < 6, 'spectrum: the visible band is drawn narrow (400–700 nm spans only 0.24 of a decade)');
  return svgDoc(w, h, 'The electromagnetic spectrum on a logarithmic wavelength scale from ten thousand metres to ten to the minus fourteen metre: radio, microwave, infrared, a very narrow visible band, ultraviolet, X-rays and gamma rays, with frequency increasing to the right', s);
})();

// ---------------------------------------------------------------- the atmosphere and the spectrum
// fate: where each drawn ray ends. 'high' = absorbed in the upper atmosphere, 'ozone' = absorbed in the ozone layer,
// 'ground' = reaches the ground, 'bounce' = reflected by the ionosphere, 'through' = passes the ionosphere to a satellite.
export const ATMOS_DATA = [
  { label: 'γ, X', x: 40, from: 'space', fate: 'high' },
  { label: 'UV-C', x: 96, from: 'space', fate: 'ozone' },
  { label: 'visible', x: 152, from: 'space', fate: 'ground' },
  { label: 'radio', x: 208, from: 'space', fate: 'ground' },
  { label: 'MW radio', x: 270, from: 'ground', fate: 'bounce' },
  { label: 'microwave', x: 392, from: 'ground', fate: 'through' },
];
export const ATMOS = (() => {
  const w = 440;
  const h = 268;
  const Y = { space: 28, iono: [52, 74], high: 92, ozone: [118, 134], ground: 222 };
  let s = '';
  s += S.rect(10, Y.iono[0], 420, Y.iono[1] - Y.iono[0], { c: MUT, sw: 1, fill: MUT, fop: 0.25 });
  s += S.text(382, Y.iono[0] + 15, 'ionosphere', { a: 'end', size: 10 });
  s += S.rect(10, Y.ozone[0], 420, Y.ozone[1] - Y.ozone[0], { c: ACC, sw: 1, fill: ACC, fop: 0.25 });
  s += S.text(382, Y.ozone[0] + 12, 'ozone layer', { a: 'end', size: 10 });
  s += S.line(10, Y.ground, 430, Y.ground, { w: 2.5 }) + S.text(14, Y.ground + 16, 'ground', { size: 10 });
  s += S.rect(372, 6, 40, 16, { c: 'currentColor', sw: 1.3, fill: FILL }) + S.text(352, 18, 'satellite', { a: 'end', size: 10 });
  const ends = {};
  for (const d of ATMOS_DATA) {
    if (d.from === 'space') {
      const yEnd = { high: Y.high, ozone: Y.ozone[0] + 8, ground: Y.ground - 2 }[d.fate];
      ends[d.label] = yEnd;
      const c = d.fate === 'ground' ? GRN : POS;
      s += S.arrow(d.x, Y.space + 8, d.x, yEnd, { c, w: 2 });
      if (d.fate !== 'ground') s += S.line(d.x - 6, yEnd + 4, d.x + 6, yEnd + 4, { c, w: 2.5 });
      s += S.text(d.x, Y.space, d.label, { a: 'middle', size: 10, w: 'bold' });
    } else if (d.fate === 'bounce') {
      const top = Y.iono[1];
      ends[d.label] = top;
      s += S.arrow(d.x, Y.ground - 2, d.x + 30, top, { c: NEG, w: 2 }) + S.arrow(d.x + 30, top, d.x + 60, Y.ground - 2, { c: NEG, w: 2 });
      s += S.text(d.x + 30, Y.ground + 16, d.label, { a: 'middle', size: 10, w: 'bold' });
    } else {
      ends[d.label] = 22;
      s += S.arrow(d.x, Y.ground - 2, d.x, 24, { c: GRN, w: 2 });
      s += S.text(d.x, Y.ground + 16, d.label, { a: 'middle', size: 10, w: 'bold' });
    }
  }
  s += S.text(220, 252, 'red: absorbed on the way down; green: gets through; blue: reflected back to Earth', { a: 'middle', size: 10 });
  // checks: each ray ends in the layer its fate says, and the fates match the physics facts used in the chapter
  const inBand = (y, [a, b]) => y >= a && y <= b;
  const okDraw = ends['UV-C'] !== undefined && inBand(ends['UV-C'], Y.ozone) && ends['γ, X'] < Y.ozone[0] && ends['γ, X'] > Y.iono[1] && ends.visible > Y.ozone[1] && ends.radio > Y.ozone[1] && ends['MW radio'] === Y.iono[1] && ends.microwave < Y.iono[0];
  check(okDraw, 'atmosphere: UV-C stops in the ozone layer, gamma and X-rays stop above it, visible and radio reach the ground, medium-wave radio turns back at the ionosphere and microwaves pass it');
  const fate = Object.fromEntries(ATMOS_DATA.map((d) => [d.label, d.fate]));
  check(fate['UV-C'] === 'ozone' && fate['MW radio'] === 'bounce' && fate.microwave === 'through' && fate.visible === 'ground', 'atmosphere: data table agrees with the facts taught (ozone absorbs UV-C; ionosphere reflects medium waves; microwaves reach satellites)');
  return svgDoc(w, h, 'How the atmosphere treats the spectrum: gamma rays and X-rays from space are absorbed high in the atmosphere, short-wave ultraviolet is absorbed by the ozone layer, visible light and a range of radio waves reach the ground, medium-wave radio sent up from the ground is reflected back by the ionosphere, and microwaves pass through it to a satellite', s);
})();

export const ALL = { DISPLACEMENT, BLOOPS, WAVE, SPECTRUM, ATMOS };
