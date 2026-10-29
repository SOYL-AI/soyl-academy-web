// Independent 3-vector arithmetic for CBSE 12 Mathematics ch10 Vector Algebra re-solve checks.
// Vectors are plain arrays [x, y, z]; 2-D vectors are padded with z = 0 by the callers.
export const add = (a, b) => a.map((v, i) => v + b[i]);
export const sub = (a, b) => a.map((v, i) => v - b[i]);
export const scl = (k, a) => a.map((v) => k * v);
export const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const mag = (a) => Math.sqrt(dot(a, a));
export const unit = (a) => scl(1 / mag(a), a);
export const cosAngle = (a, b) => dot(a, b) / (mag(a) * mag(b));
export const angle = (a, b) => Math.acos(Math.max(-1, Math.min(1, cosAngle(a, b))));
export const deg = (rad) => (rad * 180) / Math.PI;
/** Scalar projection of a on b. */
export const proj = (a, b) => dot(a, b) / mag(b);
/** Point dividing PQ internally in m : n. */
export const sectionIn = (p, q, m, n) => p.map((v, i) => (m * q[i] + n * v) / (m + n));
/** Point dividing PQ externally in m : n (m ≠ n). */
export const sectionEx = (p, q, m, n) => p.map((v, i) => (m * q[i] - n * v) / (m - n));
export const triArea = (A, B, C) => mag(cross(sub(B, A), sub(C, A))) / 2;
export const isZero = (a, eps = 1e-9) => a.every((v) => Math.abs(v) < eps);
export const collinear = (a, b) => isZero(cross(a, b));
export const eqV = (a, b, eps = 1e-9) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < eps);
export const near = (u, v, eps = 1e-9) => Math.abs(u - v) < eps;
export const round = (v, d = 9) => Math.round(v * 10 ** d) / 10 ** d;
export const R = (a) => a.map((v) => round(v));
