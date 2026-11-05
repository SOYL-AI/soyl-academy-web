// ch07 shared constants and independent numerical helpers (kept apart from the closed-form formulae the items use, so re-solves are real checks).
export const G = 6.67e-11; // N m^2 kg^-2, as stated in every item that uses it
export const ME = 6.0e24; // kg
export const RE = 6.4e6; // m
export const g = 9.8; // m s^-2
export const GM = G * ME; // 4.002e14 m^3 s^-2
export const GMg = g * RE * RE; // 4.0141e14: Earth's GM when g = 9.8 and R = 6.4e6 are the data
export const MOON = { M: 7.35e22, R: 1.74e6 }; // stated in the items that use them
export const MARS = { M: 6.4e23, R: 3.4e6 };
export const R6 = (x) => Math.round(x * 1e6) / 1e6;

/** Simpson integral of f from a to b (n even). */
export function integ(f, a, b, n = 4000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Bisection root of f on [a, b]. */
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
/** Newtonian attraction (N) between point masses. */
export const pull = (m1, m2, r, Gc = G) => (Gc * m1 * m2) / (r * r);

/** Leapfrog integration of a particle moving in the field of a point mass at the origin (2D). Returns the trajectory sampled every `every` steps. */
export function orbit2d({ gm, x, y, vx, vy }, tEnd, dt, { every = 1, stopR = 0 } = {}) {
  const acc = (px, py) => {
    const r2 = px * px + py * py;
    const k = -gm / (r2 * Math.sqrt(r2));
    return [k * px, k * py];
  };
  const out = [{ t: 0, x, y, vx, vy }];
  let [ax, ay] = acc(x, y);
  const n = Math.round(tEnd / dt);
  for (let i = 1; i <= n; i++) {
    vx += 0.5 * dt * ax;
    vy += 0.5 * dt * ay;
    x += dt * vx;
    y += dt * vy;
    [ax, ay] = acc(x, y);
    vx += 0.5 * dt * ax;
    vy += 0.5 * dt * ay;
    if (i % every === 0) out.push({ t: i * dt, x, y, vx, vy });
    if (stopR && i > 40 && Math.hypot(x, y) <= stopR) {
      out.push({ t: i * dt, x, y, vx, vy });
      break;
    }
  }
  return out;
}
/** Period of a circular orbit of radius r found by integrating the motion and timing one full turn. */
export function periodNumeric(gm, r) {
  const v = Math.sqrt(gm / r);
  const T0 = 2 * Math.PI * Math.sqrt((r * r * r) / gm);
  const tr = orbit2d({ gm, x: r, y: 0, vx: 0, vy: v }, 1.2 * T0, T0 / 20000);
  for (let i = 2; i < tr.length; i++) if (tr[i - 1].y < 0 && tr[i].y >= 0 && tr[i].t > 0.5 * T0) return tr[i - 1].t + ((tr[i].t - tr[i - 1].t) * -tr[i - 1].y) / (tr[i].y - tr[i - 1].y);
  return NaN;
}
/** Speed gained by a body released from rest at r0 when it reaches r1 < r0 (radial infall), by integrating the motion. */
export function infallSpeed(gm, r0, r1) {
  let r = r0;
  let v = 0;
  const T = 2 * Math.PI * Math.sqrt((r0 * r0 * r0) / gm);
  const dt = T / 400000;
  for (let i = 0; i < 4e6; i++) {
    v += (0.5 * dt * -gm) / (r * r);
    r += dt * v;
    v += (0.5 * dt * -gm) / (r * r);
    if (r <= r1) return Math.abs(v);
  }
  return NaN;
}
/** Does a body launched radially outward at v0 from radius R reach rMax? (time step scaled to the local orbital time) */
export function reaches(gm, R, v0, rMax) {
  let r = R;
  let v = v0;
  for (let i = 0; i < 5e6; i++) {
    const dt = 0.002 * Math.sqrt((r * r * r) / gm);
    v += (0.5 * dt * -gm) / (r * r);
    r += dt * v;
    v += (0.5 * dt * -gm) / (r * r);
    if (v <= 0) return false;
    if (r >= rMax) return true;
  }
  return false;
}

const SUPER_DIGITS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
/** Plain-text scientific notation, "m × 10ᵏ" with n significant figures (for marking schemes, which are not typeset). */
export function xp(x, n = 3) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  let m = Number((x / 10 ** e).toPrecision(n));
  let k = e;
  if (Math.abs(m) >= 10) {
    m /= 10;
    k += 1;
  }
  return `${m.toFixed(n - 1)} × 10${String(k).split('').map((c) => SUPER_DIGITS[c]).join('')}`;
}
