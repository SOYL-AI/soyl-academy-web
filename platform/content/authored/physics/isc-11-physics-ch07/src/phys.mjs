// ISC 11 ch07 Circular Motion: shared constants and independent numerical helpers. Slides and items print closed-form results
// (v = r omega, a = v^2/r, v_max = sqrt(mu r g), tan(theta) = v^2/(r g), sqrt(g r), sqrt(5 g r), T = 6 m g ...); the re-solves use
// these instead: finite differences of the position on the circle, root finding on the net force, and a step-by-step integration
// of a ball on a string in a vertical circle.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const mn = (x) => String(x).replace('-', '−');
export const TAU = 2 * Math.PI;

/** Bisection root of f on [a, b] (f must change sign). */
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

/** Acceleration magnitude of a particle on a circle of radius r turning at constant angular speed w: second difference of its position. */
export function accFD(r, w, t = 0.37, h = 1e-4) {
  const p = (tt) => [r * Math.cos(w * tt), r * Math.sin(w * tt)];
  const [a, b, c] = [p(t - h), p(t), p(t + h)];
  return Math.hypot((a[0] + c[0] - 2 * b[0]) / (h * h), (a[1] + c[1] - 2 * b[1]) / (h * h));
}
/** Speed of that particle: first difference of its position. */
export function speedFD(r, w, t = 0.37, h = 1e-6) {
  const p = (tt) => [r * Math.cos(w * tt), r * Math.sin(w * tt)];
  const [a, c] = [p(t - h), p(t + h)];
  return Math.hypot(c[0] - a[0], c[1] - a[1]) / (2 * h);
}
/** Rotation from rest-or-not with constant angular acceleration, stepped: returns { w, th } after time t. */
export function stepRotation(w0, alpha, t, dt = 1e-5) {
  let w = w0;
  let th = 0;
  for (let s = 0; s < t - dt / 2; s += dt) {
    th += w * dt + 0.5 * alpha * dt * dt;
    w += alpha * dt;
  }
  return { w, th };
}
/** Time for the angular speed to reach w1 by stepping, from w0 with constant alpha. */
export function timeTo(w0, w1, alpha, dt = 1e-5) {
  let w = w0;
  let t = 0;
  while (w < w1) {
    w += alpha * dt;
    t += dt;
  }
  return t;
}

/** Banking angle (degrees) for speed v on radius r by root finding: the vertical forces balance only at the right angle. */
export function bankAngle(v, r) {
  // N from the horizontal equation N sin(th) = m v^2 / r (m = 1), then the vertical net force N cos(th) - g must vanish
  const net = (th) => (v * v) / (r * Math.tan(th)) - g;
  return deg(root(net, 1e-4, 1.5));
}
/** Greatest speed on a level curve: root of the net inward force when friction is at its limit. */
export function levelVmax(mu, r) {
  return root((v) => mu * g - (v * v) / r, 0, 200);
}
/** Design speed of a banked curve by root finding. */
export function bankSpeed(thDeg, r) {
  return root((v) => v * v - r * g * Math.tan(rad(thDeg)), 0, 200);
}

/**
 * A ball on a string of length r in a vertical circle, stepped with RK4 as a pendulum: th is the angle from the lowest point,
 * thdot the angular speed. Starts at the bottom with speed v0 and returns the speed and the string tension per unit mass at the
 * angle `thEnd` (radians), or null if the string would go slack before reaching it (tension < 0).
 */
export function circleRun(r, v0, thEnd, dt = 1e-5) {
  let th = 0;
  let w = v0 / r;
  const acc = (t) => -(g / r) * Math.sin(t);
  while (th < thEnd) {
    const k1t = w;
    const k1w = acc(th);
    const k2t = w + 0.5 * dt * k1w;
    const k2w = acc(th + 0.5 * dt * k1t);
    const k3t = w + 0.5 * dt * k2w;
    const k3w = acc(th + 0.5 * dt * k2t);
    const k4t = w + dt * k3w;
    const k4w = acc(th + dt * k3t);
    th += (dt / 6) * (k1t + 2 * k2t + 2 * k3t + k4t);
    w += (dt / 6) * (k1w + 2 * k2w + 2 * k3w + k4w);
    const T = r * w * w + g * Math.cos(th);
    if (T < -1e-3) return null;
    if (w <= 0) return null;
  }
  return { v: r * w, T: r * w * w + g * Math.cos(th) };
}
