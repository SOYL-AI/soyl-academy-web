// Independent numeric quadrature for the ISC 12 ch11 re-solve checks (copied from ch10/src/calc.mjs). Tanh-sinh
// (double-exponential) quadrature never evaluates the endpoints, so curves with vertical tangents at a limit (circle,
// ellipse, parabola branches) are handled; `breaks` splits the interval where a modulus has a corner.

/** ∫_a^b g(x) dx by tanh-sinh quadrature, split at the given break points (a > b gives the negative). */
export function I(g, a, b, breaks = []) {
  if (a > b) return -I(g, b, a, breaks);
  const pts = [a, ...breaks.filter((p) => p > a && p < b).sort((u, v) => u - v), b];
  let s = 0;
  for (let i = 0; i + 1 < pts.length; i++) s += ts(g, pts[i], pts[i + 1]);
  return s;
}
function ts(g, a, b) {
  const c = (a + b) / 2;
  const h = (b - a) / 2;
  const H = 1 / 64;
  let s = 0;
  for (let k = -256; k <= 256; k++) {
    const t = k * H;
    const u = (Math.PI / 2) * Math.sinh(t);
    const w = ((Math.PI / 2) * Math.cosh(t)) / Math.cosh(u) ** 2;
    const x = c + h * Math.tanh(u);
    if (!(x > a && x < b) || w < 1e-300) continue;
    const v = g(x);
    if (Number.isFinite(v)) s += w * v;
  }
  return s * H * h;
}

export const near = (a, b, tol = 1e-8) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
/** Round to 8 decimals so that option values computed two ways compare exactly. */
export const r8 = (v) => Math.round(v * 1e8) / 1e8;
