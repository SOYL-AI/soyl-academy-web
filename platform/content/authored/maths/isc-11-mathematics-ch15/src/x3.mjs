// Extra exact helpers for ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry, built on space.mjs / gp.mjs
// (copies of the CBSE 11 ch11 modules, unchanged). Everything is exact: integer coordinates, rational section points,
// squared distances. Each helper re-checks its result a second way and throws if the two routes disagree.
import { Rat, must, tx, pt, dsq, sect, mid, centroid, vminus, cross, N, sqTex } from './space.mjs';

export const num = (v) => Rat.of(v).num();
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Point dividing AB externally in the ratio m : n (AP : PB = m : n, m != n); lies off the segment. */
export function ext(A, B, m, n) {
  must(m > 0 && n > 0 && m !== n, 'external ratio needs m != n');
  const P = sect(A, B, m, -n);
  const t = Rat.of(m).div(m - n); // P = A + t (B - A)
  must(P.every((c, i) => c.eq(Rat.of(A[i]).add(t.mul(Rat.of(B[i]).sub(A[i]))))), 'external point = A + t AB');
  must(t.lt(0) || t.gt(1), 'external point lies outside the segment');
  must(m > n ? t.gt(1) : t.lt(0), 'beyond B when m > n, beyond A when m < n');
  return P;
}
/** Fourth vertex D of the parallelogram ABCD (A, B, C in order): D = A + C - B, checked by equal mid-points of the diagonals. */
export function fourth(A, B, C) {
  const D = A.map((a, i) => a + C[i] - B[i]);
  const m1 = mid(A, C), m2 = mid(B, D);
  must(m1.every((v, i) => v.eq(m2[i])), 'diagonals of ABCD bisect each other');
  return D;
}
/** Where the segment AB meets the coordinate plane whose zero coordinate has index k: ratio and point. */
export function planeCut(A, B, k) {
  must(A[k] !== 0 || B[k] !== 0, 'segment not inside the plane');
  must(A[k] !== B[k], 'segment parallel to the plane');
  const m = -A[k], n = B[k]; // AP : PB = -a_k : b_k
  const t = Rat.of(A[k]).div(A[k] - B[k]); // P = A + t (B - A)
  const P = A.map((a, i) => Rat.of(a).add(t.mul(B[i] - a)));
  must(P[k].isZero(), 'cut point lies in the plane');
  const internal = (m > 0 && n > 0) || (m < 0 && n < 0);
  must(internal === (t.sign() > 0 && t.lt(1)), 'internal iff 0 < t < 1');
  const g = gcd(Math.abs(m), Math.abs(n));
  const ratio = [Math.abs(m) / g, Math.abs(n) / g];
  const Pc = internal ? sect(A, B, ratio[0], ratio[1]) : ext(A, B, ratio[0], ratio[1]);
  must(Pc.every((c, i) => c.eq(P[i])), 'section formula reproduces the cut point');
  return { ratio, P, internal, text: `${ratio[0]} : ${ratio[1]}` };
}
/** If C lies on line AB, the exact t with C = A + t (B - A); otherwise null. */
export function onLine(A, B, C) {
  const d = vminus(A, B), e = vminus(A, C);
  if (cross(d, e).some((v) => v !== 0)) return null;
  const k = d.findIndex((v) => v !== 0);
  const t = Rat.of(C[k] - A[k]).div(B[k] - A[k]);
  must(A.every((a, i) => Rat.of(a).add(t.mul(B[i] - a)).eq(C[i])), 'C = A + t AB');
  return t;
}
/** Centroid of four points, checked: the segment from a vertex to the centroid of the opposite face is divided 3 : 1. */
export function tetraCentroid(V) {
  const G = V[0].map((_, i) => V.reduce((s, v) => s.add(v[i]), Rat.of(0)).div(4));
  for (let k = 0; k < 4; k++) {
    const rest = V.filter((_, j) => j !== k);
    const F = centroid(...rest);
    const G2 = sect(V[k], F, 3, 1);
    must(G.every((c, i) => c.eq(G2[i])), 'tetrahedron centroid divides vertex-to-face-centroid in 3 : 1');
  }
  return G;
}

// ---------------------------------------------------------------- linear and sphere equations
/** TeX of a x + b y + c z + d with the coefficient conventions of a hand-written equation (no 1x, no leading +). */
export function lin(co, d = 0, vars = ['x', 'y', 'z']) {
  const parts = [];
  co.forEach((c, i) => {
    if (c === 0) return;
    const a = Math.abs(c), s = c < 0 ? '-' : '+';
    parts.push({ s, t: `${a === 1 ? '' : a}${vars[i]}` });
  });
  if (d !== 0) parts.push({ s: d < 0 ? '-' : '+', t: String(Math.abs(d)) });
  if (!parts.length) return '0';
  return parts.map((p, i) => (i === 0 ? (p.s === '-' ? `-${p.t}` : p.t) : ` ${p.s} ${p.t}`)).join('');
}
/** Plane of points equidistant from A and B: 2(B - A).X = |B|^2 - |A|^2, divided by the gcd. */
export function bisector(A, B) {
  const co = vminus(A, B).map((v) => 2 * v), rhs = dsq([0, 0, 0], B) - dsq([0, 0, 0], A);
  const g = [...co, rhs].reduce(gcd, 0) || 1;
  const c = co.map((v) => v / g), d = rhs / g;
  // second route: the mid-point satisfies it, and so does mid-point + any vector perpendicular to AB
  const M = mid(A, B), u = vminus(A, B);
  must(c.reduce((s, v, i) => s.add(Rat.of(v).mul(M[i])), Rat.of(0)).eq(d), 'mid-point lies on the bisecting plane');
  for (const w of [[u[1], -u[0], 0], [u[2], 0, -u[0]], [0, u[2], -u[1]]]) {
    const X = M.map((m0, i) => m0.add(w[i]));
    const da = X.reduce((s, x, i) => s.add(x.sub(A[i]).pow(2)), Rat.of(0)), db = X.reduce((s, x, i) => s.add(x.sub(B[i]).pow(2)), Rat.of(0));
    must(da.eq(db) && c.reduce((s, v, i) => s.add(Rat.of(v).mul(X[i])), Rat.of(0)).eq(d), 'perpendicular offsets stay equidistant and on the plane');
  }
  return { co: c, d };
}
/** PA^2 - PB^2 = k as a plane: 2(B - A).X + |A|^2 - |B|^2 = k. */
export function diffLocus(A, B, k) {
  const co = vminus(A, B).map((v) => 2 * v), d = k + dsq([0, 0, 0], B) - dsq([0, 0, 0], A);
  const g = [...co, d].reduce(gcd, 0) || 1;
  const c = co.map((v) => v / g), dd = d / g;
  // second route: sample lattice points on the plane and test PA^2 - PB^2 = k
  let tested = 0;
  for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) {
    if (c[2] === 0) continue;
    const z = (dd - c[0] * x - c[1] * y) / c[2];
    if (!Number.isInteger(z)) continue;
    must(dsq([x, y, z], A) - dsq([x, y, z], B) === k, 'point of the plane has PA^2 - PB^2 = k');
    tested++;
  }
  must(c[2] === 0 || tested > 5, 'enough lattice points tested');
  return { co: c, d: dd, tested };
}
/** Sphere with centre C and squared radius r2: squared and expanded forms; lattice points of the sphere are tested in both. */
export function sphere(C, r2) {
  const sq = `(x ${C[0] < 0 ? '+' : '-'} ${Math.abs(C[0])})^2 + (y ${C[1] < 0 ? '+' : '-'} ${Math.abs(C[1])})^2 + (z ${C[2] < 0 ? '+' : '-'} ${Math.abs(C[2])})^2 = ${r2}`.replace(/\(x - 0\)/, 'x').replace(/\(y - 0\)/, 'y').replace(/\(z - 0\)/, 'z').replace(/\(x \+ 0\)/, 'x');
  const con = C[0] ** 2 + C[1] ** 2 + C[2] ** 2 - r2;
  const tail = lin(C.map((v) => -2 * v), con);
  const gen = `x^2 + y^2 + z^2 ${tail.startsWith('-') ? `- ${tail.slice(1)}` : `+ ${tail}`} = 0`;
  let n = 0;
  const R = Math.ceil(Math.sqrt(r2)) + 1;
  for (let x = C[0] - R; x <= C[0] + R; x++) for (let y = C[1] - R; y <= C[1] + R; y++) for (let z = C[2] - R; z <= C[2] + R; z++) {
    const onS = dsq([x, y, z], C) === r2;
    const viaGen = x * x + y * y + z * z - 2 * C[0] * x - 2 * C[1] * y - 2 * C[2] * z + con === 0;
    must(onS === viaGen, `squared and expanded forms agree at ${x},${y},${z}`);
    if (onS) n++;
  }
  must(n > 0, 'sphere has lattice points');
  return { sq, gen, con, lattice: n };
}
export const sumCoords = (P) => P.reduce((s, v) => s.add(v), Rat.of(0));
export { sqTex, pt, tx, N };
