// ISC ch13 diagrams: spherical-mirror vocabulary, the R = 2f construction, the New Cartesian sign convention, the
// mirror-formula derivation figure, three worked-example ray diagrams (concave real, concave virtual, convex), refraction
// at a plane surface, a ray through parallel layers, a parallel-sided slab with its lateral shift, real and apparent
// depth (tank and slab), total internal reflection from a point in glass, three total reflecting prisms and an optical
// fibre. Mirror images come from the mirror formula and every reflected ray is aimed at the computed image; the
// self-checks (SELF_CHECKS) confirm the formula, the drawn image heights, and that each drawn ray obeys the law of
// reflection (exactly for pole and centre rays, within a stated tolerance for the paraxial rays at the drawn aperture).
// Refracted rays are computed with Snell's law (vector form); the prism and fibre rays are traced face by face, with
// total internal reflection decided by the critical angle. The mirror ray-diagram code and the slab, TIR and fibre
// figures are adapted from the author's CBSE 12 Physics ch09 code (copied, not imported).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const IMG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit2 = (v) => {
  const L = Math.hypot(v[0], v[1]);
  return [v[0] / L, v[1] / L];
};
const angleBetween = (a, b) => deg(Math.acos(Math.max(-1, Math.min(1, dot(unit2(a), unit2(b))))));
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

/** Mirror formula, New Cartesian convention: 1/v + 1/u = 1/f, m = −v/u. */
export const mirrorImage = (u, f) => {
  const v = 1 / (1 / f - 1 / u);
  return { v, m: -v / u };
};
/** Reflects direction d about the unit normal n. */
const reflect = (d, n) => {
  const k = 2 * dot(d, n);
  return [d[0] - k * n[0], d[1] - k * n[1]];
};
/** Arc marking the angle between screen directions a1 and a2 (radians, atan2 with y down), radius rr, short way round. */
function angleArc(cx, cy, rr, a1, a2, o = {}) {
  const sweep = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) < Math.PI ? 1 : 0;
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, { w: 1, c: o.c ?? 'currentColor' });
}
/** Ray polyline (screen points) with an arrowhead on each segment. */
function rayPath(pts, { c = RAY, w = 1.7 } = {}) {
  let s = S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c, w, join: 'round' });
  for (let k = 0; k + 1 < pts.length; k++) if (Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]) > 18) s += S.midHead(...pts[k], ...pts[k + 1], { c, size: 6 });
  return s;
}

// ================================================================ mirror ray diagrams (world: pole at 0, axis y = 0, y up)
function frame(pts, extraY) {
  const xs = pts.map((p) => p[0]);
  const minX = Math.min(...xs) - 26;
  const maxX = Math.max(...xs) + 26;
  const maxY = Math.max(extraY, ...pts.map((p) => Math.abs(p[1]))) + 30;
  return { minX, width: maxX - minX, y0: maxY, height: 2 * maxY + 6 };
}
function arrowObj(T, x, h, c, dash, name, nameTop, avoid = []) {
  const [X, Y0] = T(x, 0);
  const [, Y1] = T(x, h);
  const ang = Math.atan2(Y1 - Y0, 0);
  const out = [S.line(X, Y0, X, Y1 + (h > 0 ? 6 : -6), { c, w: 2, dash }), S.head(X, Y1, ang, { c, size: 8 })];
  out.push(lab(X + 6, Y1 + 4, nameTop, { c }));
  if (!avoid.some((ax) => Math.abs(ax - x) < 8)) out.push(lab(X - 7, Y0 + (h > 0 ? 13 : -5), name, { c, a: 'end' }));
  return out.join('');
}
function seg(T, p0, p1, { dash, c = RAY, ext = 0, head = true, at = 0.45 } = {}) {
  let [x1, y1] = p1;
  if (ext) {
    const L = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
    x1 = p1[0] + ((p1[0] - p0[0]) / L) * ext;
    y1 = p1[1] + ((p1[1] - p0[1]) / L) * ext;
  }
  const [a, b] = T(...p0);
  const [cc, d] = T(x1, y1);
  return S.line(a, b, cc, d, { c, w: 1.6, dash }) + (head && !dash ? S.midHead(a, b, cc, d, { c, size: 7, at }) : '');
}
/** Intersection of the ray p + t·d (t > 0) with the mirror sphere (centre at cx on the axis, radius R), on the cap near the pole. */
function hitMirror(p, d, cx, R) {
  const ox = p[0] - cx;
  const oy = p[1];
  const a = d[0] * d[0] + d[1] * d[1];
  const b = 2 * (ox * d[0] + oy * d[1]);
  const c = ox * ox + oy * oy - R * R;
  const disc = Math.sqrt(Math.max(0, b * b - 4 * a * c));
  const ts = [(-b - disc) / (2 * a), (-b + disc) / (2 * a)].filter((t) => t > 1e-6);
  const pts = ts.map((t) => [p[0] + t * d[0], p[1] + t * d[1]]);
  pts.sort((m, n) => Math.abs(m[0]) - Math.abs(n[0]));
  return pts[0];
}

/**
 * Concave or convex mirror, object on the left at u (< 0), focal length magnitude f, object height h (world px).
 * rays: any of 'parallel', 'focus', 'centre', 'pole'. Returns the SVG and the data used by the self-checks.
 */
function mirrorDiagram({ type, u, f, h, rays, label, note }) {
  const F = type === 'concave' ? -f : f;
  const R = 2 * f;
  const cx = type === 'concave' ? -R : R;
  const { v, m } = mirrorImage(u, F);
  const hi = m * h;
  const A = [u, h];
  const Ai = [v, hi];
  const dirFor = (kind) => (kind === 'parallel' ? [1, 0] : kind === 'focus' ? [F - u, -h] : kind === 'pole' ? [-u, -h] : type === 'convex' || Math.abs(u) > R ? [cx - u, -h] : [u - cx, h]);
  const hits = rays.map((kind) => (kind === 'pole' ? [0, 0] : hitMirror(A, dirFor(kind), cx, R)));
  const aperture = Math.max(h, Math.abs(hi), 24, ...hits.map((p) => Math.abs(p[1]))) + 8;
  const fr = frame([[cx, 0], [F, 0], [0, aperture], A, Ai], aperture);
  const T = (x, y) => [x - fr.minX, fr.y0 - y];
  const parts = [S.line(0, fr.y0, fr.width, fr.y0, { c: MUT, w: 1, dash: '5 4' })];
  const arcPts = [];
  for (let y = -aperture; y <= aperture + 0.01; y += aperture / 12) arcPts.push([type === 'concave' ? cx + Math.sqrt(R * R - y * y) : cx - Math.sqrt(R * R - y * y), y]);
  parts.push(S.path('M' + arcPts.map((p) => T(...p).map((n) => n.toFixed(1)).join(' ')).join(' L'), { w: 2.5 }));
  arcPts.filter((_, i) => i % 2 === 0).forEach(([x, y]) => {
    const [X, Y] = T(x, y);
    parts.push(S.line(X, Y, X + 7, Y - 5, { w: 1, c: MUT }));
  });
  for (const [x, name] of [[0, 'P'], [F, 'F'], [cx, 'C']]) {
    const [X, Y] = T(x, 0);
    parts.push(S.circle(X, Y, 2.4, { fill: 'currentColor', sw: 0 }));
    const under = hi < 0 && Math.abs(v - x) < 8;
    parts.push(lab(under ? X - 8 : X + (x === 0 ? 4 : -4), Y + 14, name, { a: under ? 'end' : x === 0 ? 'start' : 'middle', w: 'bold' }));
  }
  let maxErr = 0;
  hits.forEach((hit, k) => {
    parts.push(seg(T, A, hit));
    const nrm = unit2([hit[0] - cx, hit[1]]);
    const exact = reflect(unit2([hit[0] - A[0], hit[1] - A[1]]), nrm);
    let drawn;
    if (v < 0) {
      parts.push(seg(T, hit, Ai, { ext: 40 }));
      drawn = [Ai[0] - hit[0], Ai[1] - hit[1]];
    } else {
      const dd = unit2([hit[0] - Ai[0], hit[1] - Ai[1]]);
      parts.push(seg(T, hit, [hit[0] + dd[0] * 80, hit[1] + dd[1] * 80]));
      parts.push(seg(T, hit, Ai, { dash: '4 3', c: MUT }));
      drawn = dd;
    }
    maxErr = Math.max(maxErr, angleBetween(exact, drawn));
    void k;
  });
  parts.push(arrowObj(T, u, h, 'currentColor', null, 'B', 'A', [cx, F]));
  parts.push(arrowObj(T, v, hi, IMG, v > 0 ? '4 3' : null, 'B′', 'A′', [cx, F]));
  if (note) parts.push(lab(fr.width / 2, 2 * fr.y0 - 2, note, { a: 'middle', size: 10 }));
  return { svg: svgDoc(Math.round(fr.width), Math.round(fr.height + (note ? 8 : 0)), label, parts.join('')), v, m, hi, maxErr, F, u };
}
function mirrorChecks(name, d, h, rays) {
  check(Math.abs(1 / d.v + 1 / d.u - 1 / d.F) < 1e-12 && Math.abs(d.hi - (-d.v / d.u) * h) < 1e-9, `${name}: image at v = ${d.v.toFixed(1)} with height ${d.hi.toFixed(1)} satisfies 1/v + 1/u = 1/f and m = −v/u`);
  const tol = rays.every((r) => r === 'pole' || r === 'centre') ? 1e-6 : 3;
  check(d.maxErr < tol, `${name}: every drawn reflected ray obeys the law of reflection at its point on the mirror to within ${d.maxErr.toFixed(2)}° (tolerance ${tol}°)`);
}

// ---------------------------------------------------------------- mirror vocabulary: P, F, C, R = 2f (concave)
export const TERMS = (() => {
  const f = 70;
  const R = 2 * f;
  const px = 300;
  const y0 = 100;
  const arcX = (y) => px - R + Math.sqrt(R * R - y * y);
  const arc = [];
  for (let y = -70; y <= 70; y += 7) arc.push([arcX(y), y0 - y]);
  const tick = (x, y) => S.line(x, y - 4, x, y + 4, { w: 1.2 });
  let s = S.line(10, y0, 330, y0, { c: MUT, w: 1, dash: '5 4' });
  s += S.path('M' + arc.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.5 });
  for (const [x, y] of arc.filter((_, i) => i % 2 === 0)) s += S.line(x, y, x + 7, y - 5, { w: 1, c: MUT });
  for (const [x, nm] of [[px, 'P'], [px - f, 'F'], [px - R, 'C']]) s += S.circle(x, y0, 2.6, { fill: 'currentColor', sw: 0 }) + lab(x + (x === px ? 6 : 0), y0 + 15, nm, { a: x === px ? 'start' : 'middle', w: 'bold' });
  s += S.line(px - R, y0, arcX(55), y0 - 55, { c: MUT, w: 1.2 }) + lab(px - R + 44, y0 - 38, 'radius R', { c: MUT, a: 'middle' });
  s += S.line(px - R, y0 + 34, px, y0 + 34, { c: ACC, w: 1.2 }) + tick(px - R, y0 + 34) + tick(px, y0 + 34) + lab(px - R / 2, y0 + 30, 'R = 2f', { a: 'middle', c: ACC });
  s += S.line(px - f, y0 + 58, px, y0 + 58, { c: IMG, w: 1.2 }) + tick(px - f, y0 + 58) + tick(px, y0 + 58) + lab(px - f / 2, y0 + 54, 'f', { a: 'middle', c: IMG, it: true });
  s += lab(14, y0 - 6, 'principal axis', { c: MUT }) + lab(px - 6, 22, 'concave mirror (aperture shown)', { a: 'end' });
  check(Math.abs(arcX(0) - px) < 1e-9 && Math.abs(2 * f - R) < 1e-12, 'terms: pole on the arc, F drawn midway between P and C (R = 2f)');
  return svgDoc(340, 180, 'A concave mirror with its pole P, principal focus F and centre of curvature C on the principal axis; the radius of curvature R is twice the focal length f, so F lies midway between P and C', s);
})();

// ---------------------------------------------------------------- why f = R/2: a parallel ray reflected at M
export const R2F_DATA = { R: 180, y0: 50 };
export const R2F = (() => {
  const { R, y0 } = R2F_DATA;
  const w = 400;
  const h = 230;
  const px = 360;
  const ay = 120; // axis on screen
  const Cx = px - R;
  const xm = (y) => Cx + Math.sqrt(R * R - y * y); // world y up
  const arc = [];
  for (let y = -95; y <= 95; y += 5) arc.push([xm(y), ay - y]);
  let s = S.line(10, ay, 390, ay, { c: MUT, w: 1, dash: '5 4' });
  s += S.path('M' + arc.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.5 });
  for (const [x, y] of arc.filter((_, i) => i % 2 === 0)) s += S.line(x, y, x + 7, y - 5, { w: 1, c: MUT });
  const M = [xm(y0), ay - y0];
  const th = Math.asin(y0 / R);
  // exact reflection of the parallel ray at M (screen coords)
  const nIn = unit2([Cx - M[0], ay - M[1]]); // normal at M pointing towards C
  const out = reflect([1, 0], nIn);
  const tAxis = (ay - M[1]) / out[1];
  const Fx = M[0] + tAxis * out[0];
  s += rayPath([[20, M[1]], M]);
  s += S.line(...M, Fx, ay, { c: RAY, w: 1.7 }) + S.midHead(...M, Fx, ay, { c: RAY, size: 6 }) + S.line(Fx, ay, Fx - 0.35 * (M[0] - Fx), ay + 0.35 * (ay - M[1]), { c: RAY, w: 1.7 });
  s += S.line(Cx, ay, M[0] + 0.12 * (M[0] - Cx), M[1] + 0.12 * (M[1] - ay), { c: GRN, w: 1.2, dash: '5 3' }) + lab(Cx + 70, ay - 30, 'normal CM', { c: GRN, size: 10 });
  // angle markers: θ at M between the incident ray (reversed: pointing left) and the normal; θ between the normal and the reflected ray; θ at C
  const aBack = Math.PI; // pointing left
  const aNorm = Math.atan2(ay - M[1], Cx - M[0]);
  const aRefl = Math.atan2(ay - M[1], Fx - M[0]);
  s += angleArc(M[0], M[1], 26, aBack, aNorm) + angleArc(M[0], M[1], 36, aNorm, aRefl);
  s += lab(M[0] - 40, M[1] - 2, 'θ', { it: true }) + lab(M[0] - 46, M[1] + 22, 'θ', { it: true });
  s += angleArc(Cx, ay, 34, 0, Math.atan2(M[1] - ay, M[0] - Cx)) + lab(Cx + 38, ay - 4, 'θ', { it: true });
  for (const [x, nm] of [[px, 'P'], [Fx, 'F'], [Cx, 'C']]) s += S.circle(x, ay, 2.6, { fill: 'currentColor', sw: 0 }) + lab(x + (x === px ? 6 : 0), ay + 15, nm, { a: x === px ? 'start' : 'middle', w: 'bold' });
  s += S.circle(...M, 2.6, { fill: 'currentColor', sw: 0 }) + lab(M[0] + 6, M[1] - 6, 'M', { w: 'bold' });
  s += lab(20, M[1] - 8, 'ray parallel to the axis', { size: 10 });
  s += lab(12, 186, 'alternate angles: ∠MCF = θ, so', { size: 10 }) + lab(12, 200, 'triangle FCM is isosceles: FC = FM', { size: 10 });
  s += lab(12, 218, 'paraxial rays: FM ≈ FP, so f = R/2', { size: 10, w: 'bold' });
  // checks: law of reflection; isosceles triangle; paraxial limit
  const iAng = angleBetween([-1, 0], nIn);
  const rAng = angleBetween(out, nIn);
  const FC = Math.abs(Fx - Cx);
  const FM = Math.hypot(M[0] - Fx, M[1] - ay);
  check(Math.abs(iAng - rAng) < 1e-9 && Math.abs(iAng - deg(th)) < 1e-9, `R = 2f: angle of incidence ${iAng.toFixed(2)}° equals the angle of reflection and the angle at C`);
  check(Math.abs(FC - FM) < 1e-9 && Math.abs(FC - R / (2 * Math.cos(th))) < 1e-9, `R = 2f: triangle FCM drawn isosceles, FC = FM = R/(2 cos θ) = ${FC.toFixed(1)}`);
  const small = 0.5;
  const Fsmall = R - R / (2 * Math.cos(Math.asin(small / R)));
  check(Math.abs(Fsmall - R / 2) / (R / 2) < 1e-4 && Math.abs(px - Fx - R / 2) / (R / 2) < 0.06, `R = 2f: a ray 0.5 px off the axis crosses it at R/2 to 0.01%; the drawn ray (θ = ${deg(th).toFixed(1)}°) at ${(px - Fx).toFixed(1)} px vs R/2 = ${R / 2}`);
  return svgDoc(w, h, 'A ray parallel to the principal axis strikes a concave mirror at M and reflects through the focus F; the normal at M passes through the centre of curvature C; the angle of incidence, the angle of reflection and the angle at C are all theta, so triangle F C M is isosceles, and for rays close to the axis F lies midway between P and C, giving f equal to R over 2', s);
})();

// ---------------------------------------------------------------- New Cartesian sign convention
export const SIGN = (() => {
  const w = 380;
  const h = 214;
  const px = 220;
  const ay = 110;
  const R = 220;
  const arc = [];
  for (let y = -70; y <= 70; y += 7) arc.push([px - R + Math.sqrt(R * R - y * y), ay - y]);
  let s = S.line(10, ay, 370, ay, { c: MUT, w: 1, dash: '5 4' });
  s += S.path('M' + arc.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.5 });
  for (const [x, y] of arc.filter((_, i) => i % 2 === 0)) s += S.line(x, y, x + 7, y - 5, { w: 1, c: MUT });
  s += S.circle(px, ay, 2.6, { fill: 'currentColor', sw: 0 }) + lab(px + 6, ay + 15, 'P (origin)', { w: 'bold' });
  const fx = px - R / 2;
  s += S.circle(fx, ay, 2.6, { fill: 'currentColor', sw: 0 }) + lab(fx, ay + 15, 'F', { a: 'middle', w: 'bold' });
  s += S.arrow(232, 64, 360, 64, { c: GRN, w: 2 }) + lab(250, 56, 'along the light: +', { c: GRN, size: 10 });
  s += S.arrow(208, 64, 80, 64, { c: RAY, w: 2 }) + lab(144, 56, 'against the light: −', { a: 'middle', c: RAY, size: 10 });
  s += S.arrow(344, 104, 344, 30, { c: GRN, w: 2 }) + lab(350, 40, 'up: +', { c: GRN, size: 10 });
  s += S.arrow(344, 116, 344, 186, { c: RAY, w: 2 }) + lab(340, 182, 'down: −', { a: 'end', c: RAY, size: 10 });
  s += S.arrow(16, 150, 90, 150, { c: ACC, w: 2.5 }) + lab(16, 168, 'incident light', { size: 10 }) + lab(16, 181, 'from the left', { size: 10 });
  s += S.arrow(50, ay, 50, ay - 30, { c: 'currentColor', w: 2 }) + lab(56, ay - 16, 'object', { size: 10 });
  s += lab(w / 2, 206, 'real object: u < 0;  concave: f < 0;  convex: f > 0', { a: 'middle', size: 10, w: 'bold' });
  check(fx < px && 50 < px, 'sign: object and the focus of the concave mirror both drawn against the incident light, on the negative side of P');
  return svgDoc(w, h, 'The New Cartesian sign convention: distances are measured from the pole P; those in the direction of the incident light, drawn from left to right, are positive and those against it negative; heights above the principal axis are positive and below it negative; so a real object has negative u, a concave mirror negative f and a convex mirror positive f', s);
})();

// ---------------------------------------------------------------- derivation figure: object beyond C, real image between C and F
export const DERIV_DATA = { R: 160, u: -230, h: 46 };
export const DERIV = (() => {
  const { R, u, h } = DERIV_DATA;
  const f = R / 2;
  const F = -f;
  const cx = -R;
  const { v, m } = mirrorImage(u, F);
  const hi = m * h;
  const xM = cx + Math.sqrt(R * R - h * h);
  const M = [xM, h];
  const A = [u, h];
  const Ai = [v, hi];
  const minX = u - 24;
  const W = Math.round(40 - minX);
  const y0 = 96;
  const H = 236;
  const T = (x, y) => [x - minX, y0 - y];
  let s = S.line(0, y0, W, y0, { c: MUT, w: 1, dash: '5 4' });
  const arcPts = [];
  for (let y = -70; y <= 70.01; y += 7) arcPts.push(T(cx + Math.sqrt(R * R - y * y), y));
  s += S.path('M' + arcPts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L'), { w: 2.5 });
  for (const [x, y] of arcPts.filter((_, i) => i % 2 === 0)) s += S.line(x, y, x + 7, y - 5, { w: 1, c: MUT });
  // rays
  s += seg(T, A, M) + seg(T, M, Ai, { ext: 30 }) + seg(T, A, [0, 0]) + seg(T, [0, 0], Ai, { ext: 30 });
  // MD perpendicular
  s += S.line(...T(xM, h), ...T(xM, 0), { c: GRN, w: 1.2, dash: '3 3' }) + lab(T(xM, 0)[0] - 6, T(xM, 0)[1] + 14, 'D', { a: 'end', c: GRN, w: 'bold' });
  s += S.circle(...T(...M), 2.6, { fill: 'currentColor', sw: 0 }) + lab(T(...M)[0] + 5, T(...M)[1] - 4, 'M', { w: 'bold' });
  for (const [x, nm] of [[0, 'P'], [F, 'F'], [cx, 'C']]) s += S.circle(...T(x, 0), 2.4, { fill: 'currentColor', sw: 0 }) + lab(T(x, 0)[0] + (x === 0 ? 4 : 0), T(x, 0)[1] - 6, nm, { a: x === 0 ? 'start' : 'middle', w: 'bold' });
  s += arrowObj(T, u, h, 'currentColor', null, 'B', 'A', []) + arrowObj(T, v, hi, IMG, null, '', 'A′', [v]);
  s += lab(T(v, 0)[0] + 4, T(v, 0)[1] - 6, 'B′', { c: IMG, w: 'bold' });
  // distances below the axis
  const dim = (x, yy, nm, c) => S.line(...T(0, 0).map((n, i) => (i ? yy : n)), T(x, 0)[0], yy, { c, w: 1.1 }) + S.head(T(x, 0)[0], yy, Math.PI, { c, size: 6 }) + lab((T(0, 0)[0] + T(x, 0)[0]) / 2, yy - 3, nm, { a: 'middle', c, it: true });
  s += dim(u, 172, 'u', 'currentColor') + dim(v, 190, 'v', IMG) + dim(F, 208, 'f', GRN);
  s += lab(W / 2, 228, '△A′B′F ~ △MDF and △A′B′P ~ △ABP (MD = AB, D ≈ P)', { a: 'middle', size: 10 });
  // checks
  check(Math.abs(1 / v + 1 / u - 1 / F) < 1e-12 && v < 0 && v < F && v > cx, `derivation figure: object beyond C (u = ${u}) gives a real image between C and F at v = ${v.toFixed(1)}`);
  const exactM = reflect(unit2([M[0] - A[0], M[1] - A[1]]), unit2([M[0] - cx, M[1]]));
  const errM = angleBetween(exactM, [Ai[0] - M[0], Ai[1] - M[1]]);
  const errP = angleBetween(reflect(unit2([-A[0], -A[1]]), [1, 0]), [Ai[0], Ai[1]]);
  check(errP < 1e-6 && errM < 3, `derivation figure: ray reflected at P obeys i = r exactly; ray reflected at M within ${errM.toFixed(2)}° of the law (paraxial)`);
  check(Math.abs(Math.abs(hi) / h - (v - F) / F) < 1e-9 && Math.abs(Math.abs(hi) / h - v / u) < 1e-9, 'derivation figure: A′B′/AB = B′F/FP = B′P/BP (similar triangles with D at P)');
  return svgDoc(W, H, 'Ray diagram used to derive the mirror formula: an object A B beyond the centre of curvature of a concave mirror; a ray from A parallel to the axis reflects at M through the focus F, and a ray from A to the pole P reflects at equal angles; they meet at A prime, forming a real, inverted, diminished image A prime B prime between C and F; M D is the perpendicular from M to the axis; u, v and f are measured from P', s);
})();

// ---------------------------------------------------------------- worked examples (scaled ray diagrams)
// Example 1: f = 12 cm, u = −18 cm, h = 3.0 cm, drawn at 6 px per cm.
export const EX1_DATA = { scale: 6, f: 12, u: -18, h: 3 };
const ex1 = mirrorDiagram({ type: 'concave', u: EX1_DATA.u * 6, f: EX1_DATA.f * 6, h: EX1_DATA.h * 6, rays: ['parallel', 'focus'], label: 'Concave mirror of focal length 12 centimetres with a 3 centimetre object 18 centimetres in front, between F and C: the reflected rays meet 36 centimetres in front of the mirror, beyond C, forming a real, inverted image 6 centimetres tall', note: 'u = −18 cm, f = −12 cm → v = −36 cm, m = −2' });
export const EX1 = ex1.svg;
mirrorChecks('example 1', ex1, EX1_DATA.h * 6, ['parallel', 'focus']);
check(Math.abs(ex1.v / 6 + 36) < 1e-9 && Math.abs(ex1.m + 2) < 1e-9, 'example 1: drawn image at −36 cm (scaled), m = −2');
// Example 2: make-up mirror f = 20 cm, u = −12 cm, h = 4.0 cm, drawn at 4 px per cm.
const ex2 = mirrorDiagram({ type: 'concave', u: -48, f: 80, h: 16, rays: ['parallel', 'centre'], label: 'Concave make-up mirror of focal length 20 centimetres with the face 12 centimetres in front, inside the focus: the reflected rays diverge and appear to come from a point 30 centimetres behind the mirror, giving a virtual, erect image two and a half times as large', note: 'u = −12 cm, f = −20 cm → v = +30 cm, m = +2.5' });
export const EX2 = ex2.svg;
mirrorChecks('example 2', ex2, 16, ['parallel', 'centre']);
check(Math.abs(ex2.v / 4 - 30) < 1e-9 && Math.abs(ex2.m - 2.5) < 1e-9, 'example 2: drawn image at +30 cm (scaled), m = +2.5, virtual');
// Convex mirror: f = +50, u = −100 (px): image a third of the size, behind the mirror.
const cv = mirrorDiagram({ type: 'convex', u: -100, f: 50, h: 30, rays: ['parallel', 'centre'], label: 'Convex mirror with an object two focal lengths in front: the reflected rays diverge as if from a point behind the mirror between P and F, giving a virtual, erect image one third the size of the object', note: 'convex: image virtual, erect, smaller, between P and F' });
export const CONVEX = cv.svg;
mirrorChecks('convex', cv, 30, ['parallel', 'centre']);
check(cv.v > 0 && cv.v < 50 && Math.abs(cv.m - 1 / 3) < 1e-9, 'convex: image behind the mirror between P and F, m = +1/3');

// ================================================================ refraction at a plane surface
export const SNELL_DATA = { n: 1.5, i: 50 };
export const SNELL = (() => {
  const { n, i } = SNELL_DATA;
  const r = deg(Math.asin(Math.sin(rad(i)) / n));
  const w = 360;
  const h = 236;
  const O = [180, 112];
  let s = S.rect(10, O[1], 340, 112, { c: 'none', sw: 0, fill: IMG, fop: 0.12 }) + S.line(10, O[1], 350, O[1], { c: MUT, w: 1.5 });
  s += lab(16, O[1] - 8, 'air, n₁ = 1.00', { size: 10 }) + lab(16, O[1] + 18, `glass, n₂ = ${n.toFixed(2)}`, { size: 10 });
  s += S.line(O[0], 14, O[0], 222, { c: MUT, w: 1, dash: '4 3' }) + lab(O[0] + 4, 22, 'normal', { size: 10, c: MUT });
  const din = [Math.sin(rad(i)), Math.cos(rad(i))];
  const start = [O[0] - 110 * din[0], O[1] - 110 * din[1]];
  const dr = [Math.sin(rad(r)), Math.cos(rad(r))];
  s += rayPath([start, O, [O[0] + 105 * dr[0], O[1] + 105 * dr[1]]]);
  s += S.line(O[0], O[1], O[0] + 80 * din[0], O[1] - 80 * din[1], { c: RAY, w: 1, dash: '3 3' }) + lab(O[0] + 60 * din[0] + 6, O[1] - 60 * din[1], 'weak reflected ray', { size: 10, c: MUT });
  s += angleArc(O[0], O[1], 34, -Math.PI / 2, Math.atan2(-din[1], -din[0])) + lab(O[0] - 58, O[1] - 58, `i = ${i}°`, { size: 11 });
  s += angleArc(O[0], O[1], 40, Math.PI / 2, Math.atan2(dr[1], dr[0])) + lab(O[0] + 46, O[1] + 52, `r = ${r.toFixed(1)}°`, { size: 11 });
  s += lab(w - 12, 232, 'sin i / sin r = n₂/n₁ = 1.50; bends towards the normal', { a: 'end', size: 10, w: 'bold' });
  check(Math.abs(Math.sin(rad(i)) - n * Math.sin(rad(r))) < 1e-12 && r < i, `Snell: ray from air at ${i}° refracts at ${r.toFixed(1)}° in glass of index ${n} (towards the normal)`);
  return svgDoc(w, h, 'A ray in air strikes a glass surface at 50 degrees to the normal and refracts at about 30.7 degrees, bending towards the normal, so that sine i over sine r equals the refractive index 1.5; a weak reflected ray leaves at 50 degrees', s);
})();

// ---------------------------------------------------------------- parallel layers: air | water | glass | air
export const LAYERS_DATA = { i: 45, media: [['air', 1], ['water', 1.33], ['glass', 1.5], ['air', 1]] };
export const LAYERS = (() => {
  const { i, media } = LAYERS_DATA;
  const w = 380;
  const h = 260;
  const tops = [18, 70, 130, 190, 242];
  const fills = [null, IMG, GRN, null];
  const k = Math.sin(rad(i)); // n sin θ, the same in every layer
  let s = '';
  media.forEach(([nm, n], j) => {
    if (fills[j]) s += S.rect(20, tops[j], 340, tops[j + 1] - tops[j], { c: 'none', sw: 0, fill: fills[j], fop: 0.14 });
    s += lab(350, tops[j] + 18, `${nm}, n = ${n.toFixed(2)}`, { a: 'end', size: 10 });
  });
  for (const y of tops.slice(1, 4)) s += S.line(20, y, 360, y, { c: MUT, w: 1.3 });
  let x = 70;
  const pts = [[x, tops[0]]];
  const angs = [];
  media.forEach(([, n], j) => {
    const th = Math.asin(k / n);
    angs.push(deg(th));
    x += (tops[j + 1] - tops[j]) * Math.tan(th);
    pts.push([x, tops[j + 1]]);
  });
  s += rayPath(pts);
  for (let j = 1; j < 4; j++) s += S.line(pts[j][0], tops[j] - 22, pts[j][0], tops[j] + 22, { c: MUT, w: 1, dash: '3 3' });
  angs.forEach((a, j) => (s += lab(pts[j][0] + (pts[j + 1][0] - pts[j][0]) / 2 + 10, (tops[j] + tops[j + 1]) / 2 + 4, `${a.toFixed(1)}°`, { size: 10, c: RAY })));
  s += lab(20, 256, 'n sin θ is the same in every layer: the ray leaves parallel to the way it came in', { size: 10 });
  const prod = (media[1][1] / media[0][1]) * (media[2][1] / media[1][1]) * (media[0][1] / media[2][1]);
  const okSnell = media.every(([, n], j) => Math.abs(n * Math.sin(rad(angs[j])) - k) < 1e-12);
  check(okSnell && Math.abs(angs[3] - i) < 1e-9 && Math.abs(prod - 1) < 1e-12, `layers: n sin θ = ${k.toFixed(3)} in every layer; angles ${angs.map((a) => a.toFixed(1)).join(', ')}°; emergent ray parallel to the incident ray; aₙw × wₙg × gₙa = 1`);
  return svgDoc(w, h, 'A ray in air at 45 degrees enters a layer of water, then a layer of glass, then air again; it bends towards the normal in water and more in glass, and leaves at 45 degrees, parallel to the incident ray, because n sine theta is the same at every boundary', s);
})();

// ---------------------------------------------------------------- parallel-sided slab: lateral shift (worked example: t = 6.0 cm, n = 1.5, i = 60°)
export const SLAB_DATA = { n: 1.5, i: 60, t: 6, scale: 15 };
export const SLAB = (() => {
  const { n, i: iDeg, t, scale } = SLAB_DATA;
  const W = 380;
  const H = 262;
  const top = 74;
  const bot = top + t * scale;
  const xIn = 150;
  const i = rad(iDeg);
  const r = Math.asin(Math.sin(i) / n);
  const xOut = xIn + (bot - top) * Math.tan(r);
  const len = 66;
  const p0 = [xIn - len * Math.sin(i), top - len * Math.cos(i)];
  const p3 = [xOut + len * Math.sin(i), bot + len * Math.cos(i)];
  const ghostEnd = [xIn + (bot - top + 24) * Math.tan(i), bot + 24];
  let s = S.rect(30, top, 320, bot - top, { fill: FILL, sw: 1.5 });
  s += S.line(xIn, top - 52, xIn, top + 40, { c: MUT, w: 1, dash: '4 3' }) + S.line(xOut, bot - 40, xOut, bot + 52, { c: MUT, w: 1, dash: '4 3' });
  s += S.line(xIn, top, ...ghostEnd, { c: MUT, w: 1, dash: '2 3' });
  s += rayPath([p0, [xIn, top], [xOut, bot], p3]);
  s += angleArc(xIn, top, 22, -Math.PI / 2, Math.atan2(-Math.cos(i), -Math.sin(i))) + lab(xIn - 14, top - 26, 'i', { it: true, a: 'middle' });
  s += angleArc(xIn, top, 28, Math.PI / 2, Math.atan2(Math.cos(r), Math.sin(r))) + lab(xIn + 8, top + 42, 'r', { it: true, a: 'middle' });
  s += angleArc(xOut, bot, 22, Math.PI / 2, Math.atan2(Math.cos(i), Math.sin(i))) + lab(xOut - 6, bot + 40, 'e = i', { it: true, a: 'end' });
  const E = [xOut + 40 * Math.sin(i), bot + 40 * Math.cos(i)];
  const d = [Math.sin(i), Math.cos(i)];
  const tt = (E[0] - xIn) * d[0] + (E[1] - top) * d[1];
  const G = [xIn + tt * d[0], top + tt * d[1]];
  s += S.line(...E, ...G, { c: ACC, w: 2 }) + lab(E[0] + 10, E[1] + 4, 'lateral shift d', { c: ACC, size: 10 });
  s += lab(p0[0] - 4, p0[1] - 4, 'incident ray', { a: 'end', size: 10 }) + lab(p3[0] + 4, p3[1] + 10, 'emergent ray', { size: 10 });
  s += lab(270, top + 22, `glass slab, n = ${n}, t = ${t} cm`, { a: 'middle', size: 10 });
  s += lab(W / 2, H - 6, 'd = t sin(i − r)/cos r; emergent ray parallel to the incident ray', { a: 'middle', size: 10, w: 'bold' });
  const dDrawn = Math.hypot(E[0] - G[0], E[1] - G[1]) / scale;
  const dCalc = (t * Math.sin(i - r)) / Math.cos(r);
  check(Math.abs(dDrawn - dCalc) < 1e-9 && Math.abs(Math.sin(i) - n * Math.sin(r)) < 1e-12, `slab: drawn lateral shift ${dDrawn.toFixed(3)} cm equals t sin(i − r)/cos r = ${dCalc.toFixed(3)} cm (r = ${deg(r).toFixed(2)}°)`);
  check(p3[1] < H - 14 && ghostEnd[0] < 360, 'slab: emergent ray and the dotted continuation of the incident ray fit inside the drawing');
  return svgDoc(W, H, 'A ray strikes a parallel-sided glass slab at 60 degrees, refracts towards the normal inside it and leaves at 60 degrees, parallel to the incident ray but shifted sideways; the perpendicular distance between the incident ray produced and the emergent ray is the lateral shift t sine of i minus r over cosine r', s);
})();

// ---------------------------------------------------------------- real and apparent depth: (a) object under water, (b) mark under a slab
export const DEPTH_DATA = { nW: 4 / 3, nG: 1.5, angle: 10 };
export const DEPTH = (() => {
  const { nW, nG, angle } = DEPTH_DATA;
  const W = 440;
  const H = 250;
  let s = '';
  const panel = (x0, surf, depth, n, medium, title, mpos) => {
    let p = '';
    const O = [x0, surf + depth];
    const a = rad(angle);
    const b = Math.asin(n * Math.sin(a));
    const xs = x0 + depth * Math.tan(a);
    const app = (xs - x0) / Math.tan(b);
    p += S.line(x0, O[1], x0, surf - 40, { c: RAY, w: 1.6 }) + S.midHead(x0, O[1], x0, surf - 20, { c: RAY, size: 6 });
    p += rayPath([O, [xs, surf], [xs + 46 * Math.sin(b), surf - 46 * Math.cos(b)]]);
    p += S.line(xs, surf, x0, surf + app, { c: MUT, w: 1, dash: '4 3' });
    p += S.circle(...O, 3.5, { fill: 'currentColor', sw: 0 }) + lab(O[0] - 6, O[1] + 4, 'O', { a: 'end', w: 'bold' });
    p += S.circle(x0, surf + app, 3, { fill: IMG, sw: 0 }) + lab(x0 - 6, surf + app + 4, 'I', { a: 'end', w: 'bold', c: IMG });
    p += lab(x0 - 80, 16, title, { size: 10, w: 'bold' });
    p += lab(mpos[0], mpos[1], medium, { a: 'end', size: 10 });
    return { p, app, depth, xs, b };
  };
  // (a) tank: surface y = 70, real depth 130 px
  s += S.rect(14, 70, 196, 150, { c: 'none', sw: 0, fill: IMG, fop: 0.14 }) + S.line(14, 70, 210, 70, { c: MUT, w: 1.5 });
  const A = panel(110, 70, 130, nW, 'water, n = 4/3', '(a) object under water', [204, 214]);
  s += A.p;
  s += S.line(30, 70, 30, 200, { c: 'currentColor', w: 1 }) + lab(34, 190, 'real', { size: 10 }) + S.line(50, 70, 50, 70 + A.app, { c: IMG, w: 1.6 }) + lab(54, 104, 'apparent', { size: 10, c: IMG });
  s += lab(20, 238, 'apparent depth = real depth / n', { size: 10 });
  // (b) slab on a mark: top y = 90, thickness 120 px
  s += S.rect(236, 90, 190, 120, { fill: FILL, sw: 1.4 }) + S.line(226, 210, 436, 210, { c: 'currentColor', w: 1.4 });
  const B = panel(306, 90, 120, nG, 'glass, n = 1.5', '(b) mark under a slab', [420, 204]);
  s += B.p;
  const shift = B.depth - B.app;
  s += S.line(276, 210, 276, 90 + B.app, { c: ACC, w: 2 }) + lab(272, 196, 'shift', { a: 'end', size: 10, c: ACC });
  s += lab(331, 236, 'shift = t(1 − 1/n)', { a: 'middle', size: 10 });
  // checks: Snell at the surface; the back-traced point within a few per cent of the paraxial value
  const okA = Math.abs(Math.sin(A.b) - nW * Math.sin(rad(angle))) < 1e-12 && Math.abs(A.app / (A.depth / nW) - 1) < 0.02;
  const okB = Math.abs(Math.sin(B.b) - nG * Math.sin(rad(angle))) < 1e-12 && Math.abs(shift / (B.depth * (1 - 1 / nG)) - 1) < 0.05;
  check(okA, `depth (a): Snell at the water surface; image I at ${(A.app / A.depth).toFixed(3)} of the real depth vs 1/n = ${(1 / nW).toFixed(3)} (ray ${angle}° from the normal)`);
  check(okB, `depth (b): Snell at the top of the slab; drawn shift ${(shift / B.depth).toFixed(3)} t vs (1 − 1/n) t = ${(1 - 1 / nG).toFixed(3)} t`);
  return svgDoc(W, H, 'Two panels on real and apparent depth: on the left, rays from an object O on the floor of a water tank bend away from the normal as they leave the surface and seem to come from I, at about three quarters of the real depth; on the right, a mark under a glass slab seems raised to I, by the thickness times one minus one over n', s);
})();

// ---------------------------------------------------------------- total internal reflection from a point inside glass
export const TIR_DATA = { n: 1.5, angles: [25, null, 55] };
export const TIR = (() => {
  const n = TIR_DATA.n;
  const Cc = deg(Math.asin(1 / n));
  const w = 440;
  const h = 236;
  const surf = 92;
  const O = [220, 204];
  let s = S.rect(0, surf, w, h - surf, { c: 'none', sw: 0, fill: GRN, fop: 0.13 }) + S.line(0, surf, w, surf, { c: MUT, w: 1.5 });
  s += lab(8, surf - 8, 'air (n = 1)', { size: 10 }) + lab(8, h - 8, `glass (n = ${n.toFixed(2)})`, { size: 10 });
  s += S.circle(O[0], O[1], 4, { fill: 'currentColor', sw: 0 }) + lab(O[0] + 8, O[1] + 4, 'O', { w: 'bold' });
  const depth = O[1] - surf;
  let okAll = true;
  [25, Cc, 55].forEach((a, k) => {
    for (const sg of [-1, 1]) {
      const x = O[0] + sg * depth * Math.tan(rad(a));
      s += S.line(O[0], O[1], x, surf, { c: RAY, w: 1.5 }) + S.midHead(O[0], O[1], x, surf, { c: RAY, size: 6 });
      if (k === 0) {
        const r = Math.asin(n * Math.sin(rad(a)));
        s += S.arrow(x, surf, x + sg * 70 * Math.sin(r), surf - 70 * Math.cos(r), { c: RAY, w: 1.5, size: 6 });
        okAll = okAll && Math.abs(Math.sin(r) - n * Math.sin(rad(a))) < 1e-9;
      } else if (k === 1) s += S.arrow(x, surf, x + sg * 46, surf, { c: ACC, w: 1.8, size: 6 });
      else {
        s += S.arrow(x, surf, x + sg * 40 * Math.sin(rad(a)), surf + 40 * Math.cos(rad(a)), { c: IMG, w: 1.5, size: 6 });
        okAll = okAll && n * Math.sin(rad(a)) > 1;
      }
    }
  });
  s += S.line(O[0], surf - 60, O[0], h, { c: MUT, w: 1, dash: '4 3' });
  s += lab(w - 6, 18, `critical angle C = ${Cc.toFixed(1)}° (sin C = 1/n)`, { a: 'end', size: 11, w: 'bold' });
  s += lab(w - 6, 36, '25°: refracts out · C: grazes · 55°: totally reflected', { a: 'end', size: 10 });
  check(okAll && Math.abs(Math.sin(rad(Cc)) * n - 1) < 1e-12 && 25 < Cc && Cc < 55, `TIR: the 25° rays obey Snell’s law on leaving; the 55° rays exceed C = ${Cc.toFixed(1)}° and are totally reflected`);
  return svgDoc(w, h, 'Rays from a point inside glass of refractive index 1.5 meeting the glass to air surface: at 25 degrees they refract out, bending away from the normal; at the critical angle of about 41.8 degrees the refracted ray grazes the surface; at 55 degrees the light is totally reflected back into the glass', s);
})();

// ---------------------------------------------------------------- total reflecting prisms (ray traced face by face)
function segHit(p, d, a, b) {
  const ex = b[0] - a[0];
  const ey = b[1] - a[1];
  const den = d[0] * ey - d[1] * ex;
  if (Math.abs(den) < 1e-12) return null;
  const wx = a[0] - p[0];
  const wy = a[1] - p[1];
  const t = (wx * ey - wy * ex) / den;
  const sp = (wx * d[1] - wy * d[0]) / den;
  if (sp < -1e-9 || sp > 1 + 1e-9) return null;
  return { t };
}
/** Traces a ray from p0 along d0 into the polygon of index n (in air); returns the path, events and final direction. */
export function trace(poly, n, p0, d0, tail = 50) {
  let p = p0;
  let d = unit2(d0);
  let inside = false;
  const pts = [p0];
  const ev = [];
  for (let step = 0; step < 10; step++) {
    let best = null;
    for (let e = 0; e < poly.length; e++) {
      const a = poly[e];
      const b = poly[(e + 1) % poly.length];
      const hit = segHit(p, d, a, b);
      if (hit && hit.t > 1e-6 && (!best || hit.t < best.t)) best = { ...hit, a, b, e };
    }
    if (!best) break;
    const q = [p[0] + best.t * d[0], p[1] + best.t * d[1]];
    pts.push(q);
    let nrm = unit2([-(best.b[1] - best.a[1]), best.b[0] - best.a[0]]);
    if (dot(nrm, d) > 0) nrm = [-nrm[0], -nrm[1]];
    const cosi = Math.min(1, -dot(nrm, d));
    const i = deg(Math.acos(cosi));
    const eta = inside ? n : 1 / n;
    const sinT = eta * Math.sqrt(Math.max(0, 1 - cosi * cosi));
    if (sinT > 1) {
      d = reflect(d, nrm);
      ev.push({ face: best.e, i, kind: 'TIR' });
    } else {
      const cost = Math.sqrt(1 - sinT * sinT);
      d = unit2([eta * d[0] + (eta * cosi - cost) * nrm[0], eta * d[1] + (eta * cosi - cost) * nrm[1]]);
      ev.push({ face: best.e, i, r: deg(Math.asin(sinT)), kind: inside ? 'out' : 'in' });
      inside = !inside;
      if (!inside) {
        pts.push([q[0] + tail * d[0], q[1] + tail * d[1]]);
        break;
      }
    }
    p = q;
  }
  return { pts, ev, d };
}
export const PRISM_N = 1.5;
export const PRISMS = (() => {
  const W = 470;
  const H = 236;
  const n = PRISM_N;
  const Cc = deg(Math.asin(1 / n));
  let s = '';
  const tri = (pts) => S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z', { fill: FILL, w: 1.5 });
  // (a) 45°–90°–45°, turns the ray through 90°: right angle at top-left
  const P1 = [[50, 54], [150, 54], [50, 154]];
  const t1 = trace(P1, n, [80, 30], [0, 1], 38);
  s += tri(P1) + rayPath(t1.pts) + lab(90, 196, '(a) turned through 90°', { a: 'middle', size: 10, w: 'bold' }) + lab(90, 210, 'one TIR at 45°', { a: 'middle', size: 10 });
  // (b) 45°–90°–45°, turns the ray through 180°: hypotenuse on top
  const P2 = [[175, 64], [295, 64], [235, 124]];
  const t2 = trace(P2, n, [205, 32], [0, 1], 32);
  s += tri(P2) + rayPath(t2.pts) + lab(235, 196, '(b) turned through 180°', { a: 'middle', size: 10, w: 'bold' }) + lab(235, 210, 'two TIRs at 45°', { a: 'middle', size: 10 });
  // (c) 30°–60°–90°: right angle at bottom-left, short leg on the left, ray enters it normally
  const a = 120;
  const b = a * Math.tan(rad(30));
  const P3 = [[335, 60], [335, 60 + b], [335 + a, 60 + b]];
  const t3 = trace(P3, n, [312, 60 + 0.55 * b], [1, 0], 40);
  s += tri(P3) + rayPath(t3.pts) + lab(395, 196, '(c) 30°–60°–90° prism', { a: 'middle', size: 10, w: 'bold' }) + lab(395, 210, 'TIR at 60° on the hypotenuse', { a: 'middle', size: 10 });
  s += lab(W / 2, 20, `glass n = ${n}: critical angle ${Cc.toFixed(1)}°, so 45° and 60° incidences are total`, { a: 'middle', size: 11, w: 'bold' });
  s += lab(W / 2, 228, 'a ray entering or leaving a face normally passes straight through', { a: 'middle', size: 10 });
  const kinds = (t) => t.ev.map((e) => `${e.kind}@${e.i.toFixed(1)}`).join(' ');
  const close = (u, v) => Math.abs(u[0] - v[0]) < 1e-9 && Math.abs(u[1] - v[1]) < 1e-9;
  check(kinds(t1) === 'in@0.0 TIR@45.0 out@0.0' && close(t1.d, [-1, 0]), `prism (a): ${kinds(t1)}; leaves at 90° to the incident direction`);
  check(kinds(t2) === 'in@0.0 TIR@45.0 TIR@45.0 out@0.0' && close(t2.d, [0, -1]), `prism (b): ${kinds(t2)}; leaves reversed (180°)`);
  const e3 = t3.ev;
  check(e3.length === 3 && e3[1].kind === 'TIR' && Math.abs(e3[1].i - 60) < 1e-9 && e3[2].kind === 'out' && Math.abs(e3[2].i - 30) < 1e-9 && Math.abs(e3[2].r - deg(Math.asin(0.75))) < 1e-9, `prism (c): ${kinds(t3)}; refracts out of the long face at ${e3[2].r.toFixed(1)}°`);
  check(45 > Cc && 60 > Cc && 1 / Math.sin(rad(60)) < n && 1 / Math.sin(rad(45)) < n, 'prisms: 45° and 60° both exceed the critical angle of glass (n > 1.414 and n > 1.155 needed)');
  return svgDoc(W, H, 'Three total reflecting glass prisms: a right-angled isosceles prism turning a ray through 90 degrees by one total internal reflection at 45 degrees; the same prism with its hypotenuse facing the light, sending the ray back through 180 degrees by two total internal reflections; and a 30, 60, 90 degree prism in which a ray entering the short face normally is totally reflected at 60 degrees from the hypotenuse and leaves through the long face', s);
})();

// ---------------------------------------------------------------- optical fibre (core 1.62, cladding 1.52, entry at 25°)
export const FIBRE_DATA = { n1: 1.62, n2: 1.52, entry: 25 };
export const FIBRE = (() => {
  const { n1, n2, entry } = FIBRE_DATA;
  const Cc = deg(Math.asin(n2 / n1));
  const accept = deg(Math.asin(Math.sqrt(n1 * n1 - n2 * n2)));
  const inside = deg(Math.asin(Math.sin(rad(entry)) / n1));
  const W = 440;
  const H = 200;
  const top = 70;
  const bot = 120;
  const x0 = 80;
  let s = S.rect(x0, 50, 350, 90, { c: MUT, sw: 1, fill: FILL, fop: 0.5 }) + S.rect(x0, top, 350, bot - top, { c: ACC, sw: 1.2, fill: GRN, fop: 0.12 });
  s += lab(x0 + 4, 46, `cladding n₂ = ${n2}`, { size: 10 }) + lab(x0 + 214, top + 14, `core n₁ = ${n1}`, { size: 10 });
  const mid = (top + bot) / 2;
  const yEnter = mid + 10;
  const a = rad(entry);
  const start = [x0 - 66 * Math.cos(a), yEnter + 66 * Math.sin(a)];
  const pts = [start, [x0, yEnter]];
  const t = rad(inside);
  let x = x0 + (yEnter - top) / Math.tan(t);
  let y = top;
  pts.push([x, y]);
  let up = false;
  const dx = (bot - top) / Math.tan(t);
  while (x + dx < 425) {
    x += dx;
    y = up ? top : bot;
    pts.push([x, y]);
    up = !up;
  }
  const last = pts[pts.length - 1];
  const yEnd = up ? top : bot;
  const xEnd = Math.min(428, last[0] + dx);
  pts.push([xEnd, last[1] + ((yEnd - last[1]) * (xEnd - last[0])) / dx]);
  s += rayPath(pts);
  s += S.line(x0 - 70, yEnter, x0 + 40, yEnter, { c: MUT, w: 1, dash: '4 3' });
  s += angleArc(x0, yEnter, 30, Math.PI, Math.atan2(start[1] - yEnter, start[0] - x0)) + lab(x0 - 62, yEnter + 12, `${entry}°`, { size: 10, a: 'end' });
  s += lab(W / 2, 166, `wall: ${(90 - inside).toFixed(1)}° > C = ${Cc.toFixed(1)}° (sin C = n₂/n₁), so every reflection is total`, { a: 'middle', size: 10 });
  s += lab(W / 2, 184, `rays entering within ${accept.toFixed(1)}° of the axis are guided`, { a: 'middle', size: 10, w: 'bold' });
  check(Math.abs(Math.sin(a) - n1 * Math.sin(t)) < 1e-12 && 90 - inside > Cc && entry < accept && pts.length >= 5, `fibre: entry at ${entry}° refracts to ${inside.toFixed(1)}° from the axis; wall incidence ${(90 - inside).toFixed(1)}° > C = ${Cc.toFixed(1)}°; ${pts.length - 3} reflections drawn`);
  return svgDoc(W, H, 'An optical fibre: a ray entering the end of the glass core at 25 degrees to the axis refracts to about 15 degrees and then travels along the core by repeated total internal reflection at the boundary with the cladding of lower refractive index, meeting it at about 75 degrees, more than the critical angle of about 70 degrees', s);
})();

export const ALL = { TERMS, R2F, SIGN, DERIV, EX1, EX2, CONVEX, SNELL, LAYERS, SLAB, DEPTH, TIR, PRISMS, FIBRE };
