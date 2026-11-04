// Hand-drawn SVG schematics for ch11 The Gaseous State. Curves are computed from the stated laws or from labelled schematic models.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const R_BAR = 0.08314; // L bar K^-1 mol^-1
export const R_ATM = 0.0821; // L atm K^-1 mol^-1

/** A small axes helper: maps data to pixels in a box. */
function frame({ x0, y0, w, h, xmin, xmax, ymin, ymax, xt, yt, xl, yl, title }) {
  const X = (v) => x0 + ((v - xmin) / (xmax - xmin)) * w;
  const Y = (v) => y0 + h - ((v - ymin) / (ymax - ymin)) * h;
  const out = [lab(x0 - 34, y0 - 16, title, { w: 'bold' })];
  for (const t of yt) out.push(S.line(x0, Y(t), x0 + w, Y(t), { c: 'var(--diagram-muted)', w: 0.5, dash: '3 4' }), S.line(x0 - 3, Y(t), x0, Y(t)), lab(x0 - 6, Y(t) + 4, String(t), { a: 'end', size: 10 }));
  for (const t of xt) out.push(S.line(X(t), y0 + h, X(t), y0 + h + 3), lab(X(t), y0 + h + 15, String(t), { a: 'middle', size: 10 }));
  out.push(S.line(x0, y0 + h, x0 + w, y0 + h), S.line(x0, y0, x0, y0 + h), lab(x0 + w / 2, y0 + h + 31, xl, { a: 'middle', size: 11 }), lab(x0 + 8, y0 - 4, yl, { size: 10 }));
  return { X, Y, out };
}
const curve = (f, X, Y, a, b, n = 120) => {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const v = a + ((b - a) * i) / n;
    pts.push(`${i ? 'L' : 'M'}${X(v).toFixed(1)} ${Y(f(v)).toFixed(1)}`);
  }
  return pts.join(' ');
};

// ---------------------------------------------------------------- 1. Boyle isotherms
export const BOYLE = (() => {
  const T1 = 300;
  const T2 = 400;
  const c1 = R_BAR * T1;
  const c2 = R_BAR * T2;
  chk(Math.abs(c2 / c1 - T2 / T1) < 1e-12, `pV constant scales with T: ${c2.toFixed(2)} / ${c1.toFixed(2)} = ${(T2 / T1).toFixed(3)}`);
  chk([5, 10, 20, 40].every((V) => Math.abs((c1 / V) * V - c1) < 1e-9), 'p V is constant along the 300 K isotherm');
  const A = frame({ x0: 52, y0: 52, w: 200, h: 150, xmin: 0, xmax: 40, ymin: 0, ymax: 7, xt: [0, 10, 20, 30, 40], yt: [0, 2, 4, 6], xl: 'V / L', yl: 'p / bar', title: 'p against V (hyperbolas)' });
  const B = frame({ x0: 340, y0: 52, w: 200, h: 150, xmin: 0, xmax: 0.2, ymin: 0, ymax: 7, xt: [0, 0.05, 0.1, 0.15, 0.2], yt: [0, 2, 4, 6], xl: '1/V / L⁻¹', yl: 'p / bar', title: 'p against 1/V (straight lines)' });
  const body = [
    ...A.out,
    S.path(curve((V) => c1 / V, A.X, A.Y, 3.6, 40), { c: 'var(--diagram-blue)', w: 2.2 }),
    S.path(curve((V) => c2 / V, A.X, A.Y, 4.8, 40), { c: 'var(--diagram-red)', w: 2.2 }),
    lab(A.X(24), A.Y(c1 / 24) - 8, 'T₁ = 300 K', { c: 'var(--diagram-blue)', size: 11 }),
    lab(A.X(14), A.Y(c2 / 14) - 10, 'T₂ = 400 K', { c: 'var(--diagram-red)', size: 11 }),
    ...B.out,
    S.line(B.X(0), B.Y(0), B.X(0.2), B.Y(c1 * 0.2), { c: 'var(--diagram-blue)', w: 2.2 }),
    S.line(B.X(0), B.Y(0), B.X(0.2), B.Y(c2 * 0.2), { c: 'var(--diagram-red)', w: 2.2 }),
    lab(B.X(0.11), B.Y(c1 * 0.11) + 20, 'slope = nRT₁', { c: 'var(--diagram-blue)', size: 11 }),
    lab(B.X(0.02), B.Y(c2 * 0.17) - 4, 'slope = nRT₂', { c: 'var(--diagram-red)', size: 11 }),
    lab(30, 262, 'One mole of an ideal gas; each curve is one temperature (an isotherm).', { size: 10 }),
  ].join('');
  return svgDoc(570, 272, 'Two graphs of Boyle law for one mole of ideal gas at 300 kelvin and 400 kelvin. Left: pressure against volume gives hyperbolas, the higher temperature curve lying above. Right: pressure against reciprocal volume gives straight lines through the origin whose slope is n R T, steeper at 400 kelvin.', body);
})();

// ---------------------------------------------------------------- 2. Charles plot
export const CHARLES = (() => {
  const ps = [1, 2, 4];
  const cols = ['var(--diagram-blue)', 'var(--diagram-green)', 'var(--diagram-red)'];
  const V = (t, p) => (R_BAR * (t + 273.15)) / p;
  const F = frame({ x0: 70, y0: 40, w: 440, h: 160, xmin: -300, xmax: 100, ymin: 0, ymax: 32, xt: [-300, -200, -100, 0, 100], yt: [0, 10, 20, 30], xl: 'Temperature t / °C', yl: 'V / L (one mole)', title: 'Charles’s law: V against t at constant p' });
  const out = [...F.out];
  ps.forEach((p, i) => {
    chk(Math.abs(V(-273.15, p)) < 1e-12, `at p = ${p} bar the extrapolated volume at −273.15 °C is ${V(-273.15, p).toFixed(3)} L`);
    out.push(S.line(F.X(-273.15), F.Y(V(-273.15, p)), F.X(-60), F.Y(V(-60, p)), { c: cols[i], w: 1.5, dash: '5 4' }), S.line(F.X(-60), F.Y(V(-60, p)), F.X(100), F.Y(V(100, p)), { c: cols[i], w: 2.4 }), lab(F.X(100) - 2, F.Y(V(100, p)) - 6, `${p} bar`, { a: 'end', c: cols[i], size: 11 }));
  });
  chk(Math.abs(V(0, 1) - 22.71) < 0.01, `molar volume at 0 °C and 1 bar is ${V(0, 1).toFixed(2)} L`);
  out.push(S.circle(F.X(-273.15), F.Y(0), 4.5, { fill: 'var(--diagram-accent)', c: 'var(--diagram-accent)' }), lab(F.X(-290), F.Y(0) + 48, 'Dashed lines are extrapolated: V → 0 at −273.15 °C (real gases liquefy first).', { size: 10 }));
  return svgDoc(560, 262, 'Graph of volume of one mole of ideal gas against temperature in degrees Celsius at 1, 2 and 4 bar. Each is a straight line; the lines are extended as dashed lines backwards and all meet the volume axis at zero at minus 273.15 degrees Celsius.', out.join(''));
})();

// ---------------------------------------------------------------- 3. Compressibility factor against pressure (schematic)
// Schematic model Z = 1 + beta p - alpha p / (1 + p / s); parameters chosen to reproduce the shapes of the textbook figure near 273 K.
const GASES = [
  { name: 'H₂', beta: 0.00065, alpha: 0, s: 100, c: 'var(--diagram-blue)' },
  { name: 'N₂', beta: 0.0012, alpha: 0.00165, s: 150, c: 'var(--diagram-green)' },
  { name: 'CO₂', beta: 0.003, alpha: 0.02, s: 60, c: 'var(--diagram-red)' },
];
export const Zmodel = (g, p) => 1 + g.beta * p - (g.alpha * p) / (1 + p / g.s);
export const ZPLOT = (() => {
  const F = frame({ x0: 62, y0: 36, w: 440, h: 190, xmin: 0, xmax: 600, ymin: 0, ymax: 2, xt: [0, 100, 200, 300, 400, 500, 600], yt: [0, 0.5, 1, 1.5, 2], xl: 'p / atm (schematic)', yl: 'Z = pV / nRT', title: 'Compressibility factor against pressure at about 273 K' });
  const out = [...F.out, S.line(F.X(0), F.Y(1), F.X(600), F.Y(1), { c: 'currentColor', w: 1.4, dash: '6 4' }), lab(F.X(600) - 2, F.Y(1) - 6, 'ideal gas, Z = 1', { a: 'end', size: 11 })];
  const stats = {};
  for (const g of GASES) {
    let zmin = 9;
    let pmin = 0;
    for (let p = 0; p <= 600; p += 1) {
      const z = Zmodel(g, p);
      if (z < zmin) {
        zmin = z;
        pmin = p;
      }
    }
    stats[g.name] = { zmin, pmin, end: Zmodel(g, 600) };
    out.push(S.path(curve((p) => Zmodel(g, p), F.X, F.Y, 0, 600, 150), { c: g.c, w: 2.4 }));
  }
  out.push(lab(F.X(600) - 2, F.Y(stats['H₂'].end) + 16, 'H₂', { a: 'end', c: 'var(--diagram-blue)', w: 'bold', size: 12 }), lab(F.X(600) - 2, F.Y(stats['N₂'].end) - 6, 'N₂', { a: 'end', c: 'var(--diagram-green)', w: 'bold', size: 12 }), lab(F.X(stats['CO₂'].pmin) + 6, F.Y(stats['CO₂'].zmin) + 16, 'CO₂ (dips lowest)', { c: 'var(--diagram-red)', w: 'bold', size: 12 }), lab(F.X(120), F.Y(0.86), 'N₂ dips only slightly below 1', { c: 'var(--diagram-green)', size: 11 }));
  chk(GASES[0] && Array.from({ length: 601 }, (_, p) => Zmodel(GASES[0], p)).every((z) => z >= 1), 'H₂ curve stays at or above Z = 1');
  chk(stats['N₂'].zmin < 1 && stats['N₂'].end > 1, `N₂ dips to Z = ${stats['N₂'].zmin.toFixed(3)} near ${stats['N₂'].pmin} atm and then rises above 1 (${stats['N₂'].end.toFixed(2)})`);
  chk(stats['CO₂'].zmin < stats['N₂'].zmin && stats['CO₂'].zmin < 0.7, `CO₂ dips lowest, Z = ${stats['CO₂'].zmin.toFixed(2)}`);
  chk(GASES.every((g) => Zmodel(g, 0) === 1), 'every curve starts at Z = 1 as p → 0');
  return svgDoc(560, 276, 'Schematic graph of the compressibility factor Z against pressure for hydrogen, nitrogen, carbon dioxide and an ideal gas. The ideal gas is a horizontal dashed line at Z equal to 1. Hydrogen rises above 1 at all pressures. Nitrogen dips slightly below 1 at low pressure and then rises above 1. Carbon dioxide dips far below 1 before rising steeply at high pressure.', out.join(''));
})();
