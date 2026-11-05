// ch08 shared data and numerical helpers. Material data are quoted in the stems wherever an item uses them.
export const g = 9.8; // m s^-2, stated in every item that uses it
/** Young's moduli (Pa) as given in the chapter brief. */
export const Y = { steel: 2.0e11, copper: 1.1e11, brass: 9.1e10, aluminium: 7.0e10 };
export const B_WATER = 2.2e9; // Pa
export const RHO_WATER = 1000; // kg m^-3
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** Area of a circle of diameter d (m) and of radius r (m). */
export const areaD = (d) => Math.PI * (d / 2) ** 2;
export const areaR = (r) => Math.PI * r * r;
/** Radius (m) of a circle with area A (m^2). */
export const radiusA = (A) => Math.sqrt(A / Math.PI);
/** Elongation of a wire by Hooke's law: F L / (A Y), by the stress-then-strain route (independent of the one-line formula). */
export function elongate(F, L, A, Y) {
  const stress = F / A;
  const strain = stress / Y;
  return strain * L;
}
/** Piecewise-linear interpolation through knots [[x, y], ...]. */
export function pwl(knots) {
  return (x) => {
    for (let i = 1; i < knots.length; i++) {
      const [x0, y0] = knots[i - 1];
      const [x1, y1] = knots[i];
      if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return knots[knots.length - 1][1];
  };
}
/** Central-difference derivative. */
export const deriv = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
/** Plain-text scientific notation with Unicode superscripts (for marking-scheme steps), same rounding as the library's sci(). */
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
export function usci(x, n = 2) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e <= 3) return Number(x.toPrecision(n)).toString();
  let m = Number((x / 10 ** e).toPrecision(n));
  let k = e;
  if (Math.abs(m) >= 10) { m /= 10; k += 1; }
  return `${m.toFixed(n - 1)} × 10${String(k).split('').map((c) => SUP[c]).join('')}`;
}
