// ch10 shared data and independent numerical helpers. Every item computes its key with the closed form and re-solves it with
// one of these (enthalpy bookkeeping, bisection on energy balance, step-by-step integration of the cooling law, flux continuity
// at an interface), so a re-solve is a genuinely different route.

// ---- data stated in the stems that use them (standard table values)
export const CW = 4200; // specific heat of water, J kg^-1 K^-1
export const CICE = 2100; // ice
export const CSTEAM = 2000; // steam
export const LF = 3.34e5; // latent heat of fusion of ice, J kg^-1
export const LV = 2.26e6; // latent heat of vaporisation of water, J kg^-1
export const ALPHA = { steel: 1.2e-5, copper: 1.7e-5, aluminium: 2.3e-5, brass: 1.9e-5 }; // K^-1
export const C_METAL = { aluminium: 900, copper: 385, iron: 450, lead: 130 }; // J kg^-1 K^-1

/** Density of water (kg m^-3), CRC values rounded to two decimals, 0 to 10 degrees C at one atmosphere. */
export const DENSITY = [[0, 999.84], [1, 999.9], [2, 999.94], [3, 999.96], [4, 999.97], [5, 999.97], [6, 999.94], [7, 999.9], [8, 999.85], [9, 999.78], [10, 999.7]];

export const R6 = (x) => Math.round(x * 1e6) / 1e6;

/** Bisection root of f on [a, b] (opposite signs at the ends). */
export function root(f, a, b) {
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

/**
 * Enthalpy (J) of m kg of water substance at T degrees C, measured from solid ice at 0 degrees C. `solidAtZero` chooses the
 * phase at exactly 0 degrees C (the latent heat is not yet absorbed when it is solid).
 */
export function enthalpy(m, T, solidAtZero = false) {
  if (T < 0 || (T === 0 && solidAtZero)) return m * CICE * T;
  if (T <= 100) return m * (LF + CW * T);
  return m * (LF + CW * 100 + LV + CSTEAM * (T - 100));
}

/** Heat to take m kg of water substance from T0 to T1 (T0 <= T1), by the enthalpy difference. */
export function heatBetween(m, T0, T1) {
  return enthalpy(m, T1) - enthalpy(m, T0, T0 === 0);
}

/**
 * Final state when bodies exchange heat in an insulated vessel. A body is { m, T } for water substance (any phase; set `solid: true`
 * for ice at exactly 0) or { m, c, T } for a generic body of constant specific heat. Returns { T, melted } where `melted` is the
 * mass of water substance that is liquid at the end (only meaningful when T = 0).
 */
export function mixTemp(bodies) {
  const H = (b, T, solid) => (b.c !== undefined ? b.m * b.c * T : enthalpy(b.m, T, solid));
  const H0 = bodies.reduce((s, b) => s + H(b, b.T, b.solid === true), 0);
  const lo = bodies.reduce((s, b) => s + H(b, 0, true), 0);
  const hi = bodies.reduce((s, b) => s + H(b, 0, false), 0);
  if (H0 >= lo && H0 <= hi) return { T: 0, melted: hi > lo ? (H0 - lo) / LF : 0 };
  const f = (T) => bodies.reduce((s, b) => s + H(b, T, T <= 0), 0) - H0;
  return { T: root(f, -100, 400), melted: null };
}

/** Newton's law of cooling, integrated step by step (classical RK4): dT/dt = -k (T - T0). */
export function coolNumeric(T1, T0, k, t, n = 4000) {
  const h = t / n;
  const f = (T) => -k * (T - T0);
  let T = T1;
  for (let i = 0; i < n; i++) {
    const a = f(T);
    const b = f(T + (h * a) / 2);
    const c = f(T + (h * b) / 2);
    const d = f(T + h * c);
    T += (h * (a + 2 * b + 2 * c + d)) / 6;
  }
  return T;
}
export const coolExact = (T1, T0, k, t) => T0 + (T1 - T0) * Math.exp(-k * t);

/**
 * Steady conduction through slabs in series (area A, hot face at Th, cold face at Tc). layers = [{ K, L }, ...] from the hot side.
 * Solved by requiring the same heat current in every slab (bisection on the interface temperatures, two layers).
 */
export function seriesTwo(l1, l2, A, Th, Tc) {
  const flow1 = (Ti) => (l1.K * A * (Th - Ti)) / l1.L;
  const flow2 = (Ti) => (l2.K * A * (Ti - Tc)) / l2.L;
  const Ti = root((x) => flow1(x) - flow2(x), Tc, Th);
  return { Ti, H: flow1(Ti) };
}

/** Linear interpolation of data points [[x, y], ...]. */
export function interp(pts, x) {
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return pts[pts.length - 1][1];
}
