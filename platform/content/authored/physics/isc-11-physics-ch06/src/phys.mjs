// ISC 11 ch06 shared numbers and independent numerical helpers. Slides and items print closed-form results (mg sin θ ± μ mg cos θ,
// μ W / (cos φ ± μ sin φ), tan α = μ); the re-solves use these instead: a horizontal–vertical (Cartesian) force solve, root finding
// on the net force, and a stepping integrator.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** Proper minus sign for printed plain text. */
export const mn = (x) => String(x).replace('-', '−');

/** Closed-form results for a block of mass m on a rough slope of angle th (degrees), coefficient mu. */
export function slope(m, th, mu) {
  const W = m * g;
  const s = Math.sin(rad(th));
  const c = Math.cos(rad(th));
  return { W, N: W * c, along: W * s, fric: mu * W * c, up: W * (s + mu * c), down: W * (s - mu * c), aDown: g * (s - mu * c) };
}

/**
 * Independent solve in a horizontal–vertical frame (not resolved along the slope).
 * Slope rises to the right at th degrees. Unknowns: acceleration a along the slope (positive up the slope) and the normal reaction N.
 * Forces: weight (0, −mg); normal N(−sin, cos); friction mu N opposing the motion (dir = +1 moving up, −1 moving down);
 * applied force P along the slope (positive up the slope). Returns { a, N }.
 */
export function slopeCartesian(m, th, mu, P, dir) {
  const s = Math.sin(rad(th));
  const c = Math.cos(rad(th));
  // x: m a c = P c − N s − dir mu N c      y: m a s = P s + N c − dir mu N s − m g
  const a11 = m * c;
  const a12 = s + dir * mu * c;
  const b1 = P * c;
  const a21 = m * s;
  const a22 = -(c - dir * mu * s);
  const b2 = P * s - m * g;
  const det = a11 * a22 - a12 * a21;
  return { a: (b1 * a22 - a12 * b2) / det, N: (a11 * b2 - a21 * b1) / det };
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

/** Force along a handle at phi degrees to the horizontal for a roller of weight W moving at constant speed; s = +1 pull (handle up), −1 push. Found by bisection on the horizontal net force. */
export function handleForce(W, mu, phi, s) {
  const net = (F) => F * Math.cos(rad(phi)) - mu * (W - s * F * Math.sin(rad(phi)));
  return root(net, 0, 5 * W);
}

/** Time and final speed for constant acceleration a over distance d, by stepping. */
export function stepRun(a, d, v0 = 0, dt = 1e-5) {
  let x = 0;
  let v = v0;
  let t = 0;
  while (x < d) {
    v += a * dt;
    x += v * dt;
    t += dt;
  }
  return { t, v };
}
/** Stopping distance for deceleration a (positive number) from speed v0, by stepping. */
export function stopDist(a, v0, dt = 1e-5) {
  let x = 0;
  let v = v0;
  while (v > 0) {
    v -= a * dt;
    x += v * dt;
  }
  return x;
}
