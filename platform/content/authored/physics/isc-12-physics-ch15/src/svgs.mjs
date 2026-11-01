// ISC ch15 diagrams: the single-surface derivation figure (an exact ray traced with Snell's law, so the exterior-angle
// relations i = α + γ and r = γ − β hold in the drawing), a worked single-surface example drawn with the paraxial rules,
// lens shapes with the signs of R₁ and R₂, the lens maker's derivation figure (two surfaces, intermediate image I₁), a
// convex and a concave lens example, two thin lenses in contact, two separated convex lenses, a lens with a plane mirror
// at its focus (auto-collimation), and the worked lens-plus-plane-mirror example.
// Lens and mirror systems are drawn with a paraxial ray tracer (thin lens: slope changes by −y/f; mirror: the ray turns
// back and, for a curved mirror, is also bent by y/f), so every drawn ray follows the same rules the formulas assume. The
// self-checks (SELF_CHECKS) confirm that the traced rays meet at the image found from the formulas, that the signs of the
// radii match the drawn centres of curvature, and that the exact single-surface ray obeys Snell's law. Horizontal and
// vertical scales differ in the system diagrams (paraxial rays: image positions do not depend on the vertical scale).
// The thin-lens symbol and the arrow helpers are adapted from the author's CBSE 12 Physics ch09 code (copied, not imported).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const IMG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
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

// ================================================================ physics (New Cartesian: light from left to right)
/** Single spherical surface: n2/v − n1/u = (n2 − n1)/R, returns v. */
export const surfaceImage = (n1, n2, u, R) => n2 / ((n2 - n1) / R + n1 / u);
/** Thin lens: 1/v − 1/u = 1/f; m = v/u. */
export const lensImage = (u, f) => {
  const v = 1 / (1 / f + 1 / u);
  return { v, m: v / u };
};
/** Lens maker: 1/f = (n/nm − 1)(1/R1 − 1/R2). */
export const lensMaker = (n, R1, R2, nm = 1) => 1 / ((n / nm - 1) * (1 / R1 - 1 / R2));

/**
 * Paraxial ray trace through elements met in order. elems: { x, kind: 'lens' | 'mirror', f } (lens f > 0 converging;
 * mirror f > 0 converging (concave), f < 0 convex, Infinity plane). A ray is (x, y, slope s = dy/dx, dir = ±1).
 * Thin lens: s → s − dir·y/f. Mirror: s → −s + dir·y/f, and dir reverses.
 */
export function traceRay(p0, s0, elems) {
  let [x, y] = p0;
  let s = s0;
  let dir = 1;
  const pts = [[x, y]];
  const turns = [];
  for (const e of elems) {
    y += s * (e.x - x);
    x = e.x;
    pts.push([x, y]);
    if (e.kind === 'lens') s -= (dir * y) / e.f;
    else {
      s = -s + (dir * y) / e.f;
      dir = -dir;
      turns.push(pts.length - 1);
    }
  }
  return { pts, x, y, s, dir, turns };
}
/** Final image of the point (x0, h) through the system: crossing of two traced rays (parallel and through the first pole). */
export function systemImage(x0, h, elems) {
  const a = traceRay([x0, h], 0, elems);
  const b = traceRay([x0, h], -h / (elems[0].x - x0), elems);
  if (Math.abs(a.s - b.s) < 1e-14) return { x: Infinity, h: Infinity, m: Infinity, real: false, dir: a.dir };
  const X = (b.y - a.y + a.s * a.x - b.s * b.x) / (a.s - b.s);
  const Y = a.y + a.s * (X - a.x);
  return { x: X, h: Y, m: Y / h, real: (X - a.x) * a.dir > 0, dir: a.dir };
}
/** Where a beam parallel to the axis is finally brought to a point (x), and whether it is real. */
export function parallelImage(elems) {
  const a = traceRay([elems[0].x - 10, 1], 0, elems);
  const X = a.x - a.y / a.s;
  return { x: X, real: (X - a.x) * a.dir > 0 };
}

// ================================================================ drawing helpers
function angleArc(cx, cy, rr, a1, a2, o = {}) {
  const sweep = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) < Math.PI ? 1 : 0;
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, { w: 1, c: o.c ?? 'currentColor' });
}
/** Ray polyline (screen points) with an arrowhead on each long segment. */
function rayPath(pts, { c = RAY, w = 1.7 } = {}) {
  let s = S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c, w, join: 'round' });
  for (let k = 0; k + 1 < pts.length; k++) if (Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]) > 22) s += S.midHead(...pts[k], ...pts[k + 1], { c, size: 6 });
  return s;
}
/** Thin-lens symbol at screen x, centred on the axis y, half-height `half`. */
function lensSym(X, Y, half, converging) {
  if (converging) return S.path(`M${f1(X)} ${f1(Y - half)} Q${f1(X + 13)} ${f1(Y)} ${f1(X)} ${f1(Y + half)} Q${f1(X - 13)} ${f1(Y)} ${f1(X)} ${f1(Y - half)} Z`, { fill: FILL, w: 1.5 });
  return S.path(`M${f1(X - 8)} ${f1(Y - half)} L${f1(X + 8)} ${f1(Y - half)} Q${f1(X + 1)} ${f1(Y)} ${f1(X + 8)} ${f1(Y + half)} L${f1(X - 8)} ${f1(Y + half)} Q${f1(X - 1)} ${f1(Y)} ${f1(X - 8)} ${f1(Y - half)} Z`, { fill: FILL, w: 1.5 });
}
/** Plane mirror: a thick line with hatching on its back (the side away from the incoming light, here the right). */
function planeMirror(X, Y, half) {
  let s = S.line(X, Y - half, X, Y + half, { w: 2.5 });
  for (let y = Y - half + 4; y <= Y + half; y += 9) s += S.line(X, y, X + 6, y - 5, { w: 1, c: MUT });
  return s;
}
/** Object or image arrow from the axis (screen X, axis Y0) to the tip at screen Y1. */
function arrowObj(X, Y0, Y1, c, dash, tipName, footName) {
  const up = Y1 < Y0;
  let s = S.line(X, Y0, X, Y1 + (up ? 6 : -6), { c, w: 2, dash }) + S.head(X, Y1, up ? -Math.PI / 2 : Math.PI / 2, { c, size: 8 });
  s += lab(X + 6, Y1 + (up ? 4 : 8), tipName, { c });
  if (footName) s += lab(X - 6, Y0 + (up ? 13 : -5), footName, { c, a: 'end' });
  return s;
}

/**
 * Lens/mirror system drawn from the paraxial trace. o: { elems, obj: { x, h }, slopes: [initial slopes], xmin, xmax,
 * ymin, ymax (world), sx, sy (px per unit), endX (world x where the final rays stop), marks: [[x, label]],
 * images: [{ x, h, tip, foot, dashed }], ghosts: [[rayIndex, segmentIndex, toX]] (dashed continuation of a segment),
 * back: true (dashed back-extension of final rays to the image), half (lens half-height, world), label, note }.
 */
function systemDiagram(o) {
  const padL = 14;
  const top = 24;
  const W = Math.round((o.xmax - o.xmin) * o.sx + 2 * padL);
  const Y0 = top + o.ymax * o.sy;
  const H = Math.round(Y0 - o.ymin * o.sy + (o.note ? 34 : 20));
  const X = (x) => padL + (x - o.xmin) * o.sx;
  const Y = (y) => Y0 - y * o.sy;
  let s = S.line(0, Y0, W, Y0, { c: MUT, w: 1, dash: '5 4' });
  const seen = new Set();
  for (const e of o.elems) {
    if (seen.has(e.x)) continue;
    seen.add(e.x);
    const half = (o.half ?? o.ymax * 0.9) * o.sy;
    s += e.kind === 'lens' ? lensSym(X(e.x), Y0, half, e.f > 0) : planeMirror(X(e.x), Y0, half);
  }
  for (const [x, name] of o.marks ?? []) s += S.circle(X(x), Y0, 2.4, { fill: 'currentColor', sw: 0 }) + lab(X(x), Y0 + 14, name, { a: 'middle', w: 'bold', size: 10 });
  const traces = o.slopes.map((s0) => traceRay([o.obj.x, o.obj.h], s0, o.elems));
  traces.forEach((t, k) => {
    const pts = [...t.pts, [o.endX, t.y + t.s * (o.endX - t.x)]];
    // colour: before the first mirror red, after it green
    const firstTurn = t.turns.length ? t.turns[0] : Infinity;
    const before = pts.slice(0, Math.min(firstTurn, pts.length - 1) + 1).map(([x, y]) => [X(x), Y(y)]);
    s += rayPath(before);
    if (firstTurn < Infinity) s += rayPath(pts.slice(firstTurn).map(([x, y]) => [X(x), Y(y)]), { c: GRN });
    for (const [ri, si, toX] of o.ghosts ?? []) {
      if (ri !== k) continue;
      const [a, b] = [t.pts[si], t.pts[si + 1]];
      const sl = (b[1] - a[1]) / (b[0] - a[0]);
      s += S.line(X(b[0]), Y(b[1]), X(toX), Y(b[1] + sl * (toX - b[0])), { c: MUT, w: 1, dash: '4 3' });
    }
    if (o.back) s += S.line(X(t.x), Y(t.y), X(o.back.x), Y(o.back.h), { c: MUT, w: 1, dash: '4 3' });
  });
  s += arrowObj(X(o.obj.x), Y0, Y(o.obj.h), 'currentColor', null, 'A', o.objFoot ?? 'B');
  for (const im of o.images ?? []) s += arrowObj(X(im.x), Y0, Y(im.h), IMG, im.dashed ? '4 3' : null, im.tip, im.foot);
  if (o.note) s += lab(W / 2, H - 8, o.note, { a: 'middle', size: 10 });
  return { svg: svgDoc(W, H, o.label, s), traces };
}
/** Self-check: every traced ray, after the last element, passes through (or extends back through) the image point. */
function meetsAt(name, traces, im) {
  const miss = Math.max(...traces.map((t) => Math.abs(t.y + t.s * (im.x - t.x) - im.h)));
  check(miss < 1e-9, `${name}: all ${traces.length} traced rays meet at x = ${im.x.toFixed(2)}, height ${im.h.toFixed(2)} (miss ${miss.toExponential(1)})`);
}

// ================================================================ t01 derivation figure: exact ray at a convex surface
export const SURF_DATA = { R: 60, n1: 1, n2: 2, u: -150, yA: 30, scale: 1 };
export const SURF = (() => {
  const { R, n1, n2, u, yA } = SURF_DATA;
  const W = 420;
  const H = 206;
  const ay = 100;
  const px = 168; // screen x of the pole
  const T = (x, y) => [px + x, ay - y];
  const A = [R - Math.sqrt(R * R - yA * yA), yA];
  const O = [u, 0];
  const Cc = [R, 0];
  const d = unit2([A[0] - O[0], A[1] - O[1]]);
  let nrm = unit2([A[0] - Cc[0], A[1] - Cc[1]]); // outward normal (towards the air)
  if (dot(nrm, d) > 0) nrm = [-nrm[0], -nrm[1]];
  const eta = n1 / n2;
  const cosi = -dot(nrm, d);
  const sinT = eta * Math.sqrt(1 - cosi * cosi);
  const cost = Math.sqrt(1 - sinT * sinT);
  const dr = unit2([eta * d[0] + (eta * cosi - cost) * nrm[0], eta * d[1] + (eta * cosi - cost) * nrm[1]]);
  const Ix = A[0] + (-A[1] / dr[1]) * dr[0];
  // glass region bounded by the arc
  const arc = [];
  for (let y = -56; y <= 56.01; y += 4) arc.push(T(R - Math.sqrt(R * R - y * y), y));
  let s = S.path('M' + arc.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ` L${W} ${f1(arc[arc.length - 1][1])} L${W} ${f1(arc[0][1])} Z`, { c: 'none', w: 0, fill: IMG, fop: 0.1 });
  s += S.path('M' + arc.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c: ACC, w: 2.2 });
  s += S.line(0, ay, W, ay, { c: MUT, w: 1, dash: '5 4' });
  s += lab(8, 20, 'rarer medium, n₁', { size: 10 }) + lab(W - 8, 20, 'denser medium, n₂', { a: 'end', size: 10 });
  // normal CA extended beyond A into the air
  const nOut = [A[0] + (A[0] - Cc[0]) * 0.75, A[1] + (A[1] - Cc[1]) * 0.75];
  s += S.line(...T(...Cc), ...T(...nOut), { c: GRN, w: 1.2, dash: '5 3' }) + lab(T(...nOut)[0] - 4, T(...nOut)[1] - 4, 'normal', { c: GRN, size: 10, a: 'end' });
  s += rayPath([T(...O), T(...A), T(Ix, 0)]);
  // angles: α at O, β at I, γ at C, i and r at A
  const sA = T(...A);
  s += angleArc(...T(...O), 40, 0, Math.atan2(sA[1] - ay, sA[0] - T(...O)[0])) + lab(T(...O)[0] + 44, ay - 3, 'α', { it: true });
  s += angleArc(...T(Ix, 0), 34, Math.PI, Math.atan2(sA[1] - ay, sA[0] - T(Ix, 0)[0])) + lab(T(Ix, 0)[0] - 46, ay - 3, 'β', { it: true });
  s += angleArc(...T(...Cc), 22, Math.PI, Math.atan2(sA[1] - ay, sA[0] - T(...Cc)[0])) + lab(T(...Cc)[0] - 30, ay - 8, 'γ', { it: true });
  const aIncBack = Math.atan2(T(...O)[1] - sA[1], T(...O)[0] - sA[0]);
  const aNormOut = Math.atan2(T(...nOut)[1] - sA[1], T(...nOut)[0] - sA[0]);
  const aNormIn = Math.atan2(ay - sA[1], T(...Cc)[0] - sA[0]);
  const aRefr = Math.atan2(ay - sA[1], T(Ix, 0)[0] - sA[0]);
  s += angleArc(...sA, 22, aIncBack, aNormOut) + lab(sA[0] - 30, sA[1] - 24, 'i', { it: true });
  s += angleArc(...sA, 30, aNormIn, aRefr) + lab(sA[0] + 30, sA[1] + 28, 'r', { it: true });
  for (const [x, nm] of [[0, 'P'], [R, 'C'], [u, 'O'], [Ix, 'I']]) s += S.circle(...T(x, 0), 2.6, { fill: 'currentColor', sw: 0 }) + lab(T(x, 0)[0], ay + 15, nm, { a: 'middle', w: 'bold' });
  s += S.circle(...sA, 2.6, { fill: 'currentColor', sw: 0 }) + lab(sA[0] - 2, sA[1] - 8, 'A', { w: 'bold', a: 'end' });
  s += S.line(sA[0], sA[1], sA[0], ay, { c: MUT, w: 1, dash: '2 3' }) + lab(sA[0] + 3, ay - 12, 'D', { size: 10, c: MUT });
  s += lab(10, 170, 'triangle OAC: i = α + γ;  triangle AIC: γ = r + β', { size: 10 });
  s += lab(10, 185, 'small angles: α ≈ AD/OP, β ≈ AD/PI, γ ≈ AD/PC; n₁ i = n₂ r', { size: 10 });
  s += lab(10, 200, 'angles exaggerated for clarity', { size: 10, c: MUT });
  // checks
  const alpha = Math.atan2(A[1], A[0] - O[0]);
  const beta = Math.atan2(A[1], Ix - A[0]);
  const gamma = Math.atan2(A[1], Cc[0] - A[0]);
  const i = deg(Math.acos(cosi));
  const r = deg(Math.asin(sinT));
  check(Math.abs(i - deg(alpha + gamma)) < 1e-9 && Math.abs(r - deg(gamma - beta)) < 1e-9, `surface figure: i = α + γ (${i.toFixed(2)}°) and r = γ − β (${r.toFixed(2)}°) in the drawn triangles`);
  check(Math.abs(n1 * Math.sin((i * Math.PI) / 180) - n2 * Math.sin((r * Math.PI) / 180)) < 1e-12 && r < i && Ix > 0, `surface figure: the drawn ray obeys n₁ sin i = n₂ sin r exactly, bends towards the normal and forms a real image at x = ${Ix.toFixed(1)}`);
  check(Math.abs(angleBetween([Cc[0] - A[0], Cc[1] - A[1]], [-nrm[0], -nrm[1]])) < 1e-9, 'surface figure: the normal at A passes through the centre of curvature C');
  return svgDoc(W, H, 'Refraction at a convex spherical surface separating a rarer medium of index n1 from a denser medium of index n2: a ray from a point object O on the axis meets the surface at A, bends towards the normal C A, and crosses the axis at the real image I; the ray makes angle alpha with the axis at O, the normal makes gamma at C and the refracted ray beta at I, so that i equals alpha plus gamma and r equals gamma minus beta', s);
})();

// ================================================================ t01 worked example (paraxial rules): u = −24 cm, R = +6 cm, n = 1.5
export const SEX_DATA = { n1: 1, n2: 1.5, u: -24, R: 6, h: 1 };
export const SEX = (() => {
  const { n1, n2, u, R, h } = SEX_DATA;
  const v = surfaceImage(n1, n2, u, R);
  const m = (n1 * v) / (n2 * u);
  const F2 = (n2 * R) / (n2 - n1);
  const F1 = (-n1 * R) / (n2 - n1);
  const sx = 6;
  const sy = 22;
  const xmin = -28;
  const W = Math.round((42 - xmin) * sx + 20);
  const Y0 = 82;
  const X = (x) => 10 + (x - xmin) * sx;
  const Yy = (y) => Y0 - y * sy;
  // the surface: arc of radius R about C, drawn with the same scales
  const arc = [];
  for (let y = -2.6; y <= 2.601; y += 0.2) arc.push([X(R - Math.sqrt(R * R - y * y)), Yy(y)]);
  let s = S.path('M' + arc.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ` L${W} ${f1(arc[arc.length - 1][1])} L${W} ${f1(arc[0][1])} Z`, { c: 'none', w: 0, fill: IMG, fop: 0.1 });
  s += S.path('M' + arc.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c: ACC, w: 2.2 });
  s += S.line(0, Y0, W, Y0, { c: MUT, w: 1, dash: '5 4' });
  s += lab(8, 18, 'air, n₁ = 1', { size: 10 }) + lab(W - 8, 18, 'glass, n₂ = 1.5', { a: 'end', size: 10 });
  // paraxial rays from the tip A(u, h): through C (undeviated), parallel (to F₂), through F₁ (then parallel)
  const A = [u, h];
  const rays = [
    [A, [0, h * (R / (R - u))], [R, 0], [v + 4, h + ((0 - h) / (R - u)) * (v + 4 - u)]],
    [A, [0, h], [v + 4, h + (-h / F2) * (v + 4)]],
    [A, [0, h + ((0 - h) / (F1 - u)) * (0 - u)], [v + 4, h + ((0 - h) / (F1 - u)) * (0 - u)]],
  ];
  for (const ray of rays) s += rayPath(ray.map(([x, y]) => [X(x), Yy(y)]));
  for (const [x, nm] of [[0, 'P'], [F1, 'F₁'], [R, 'C'], [F2, 'F₂']]) s += S.circle(X(x), Y0, 2.4, { fill: 'currentColor', sw: 0 }) + lab(X(x) + (x === 0 ? 4 : 0), Y0 + 15, nm, { a: x === 0 ? 'start' : 'middle', w: 'bold', size: 10 });
  s += arrowObj(X(u), Y0, Yy(h), 'currentColor', null, 'A', 'B') + arrowObj(X(v), Y0, Yy(m * h), IMG, null, 'A′', 'B′');
  s += lab(W / 2, 162, 'u = −24 cm, R = +6 cm → v = +36 cm, m = n₁v/(n₂u) = −1', { a: 'middle', size: 10, w: 'bold' });
  s += lab(W / 2, 176, 'paraxial ray rules; vertical scale enlarged', { a: 'middle', size: 10, c: MUT });
  // checks: the three rays meet at (v, m h)
  const at = (ray) => {
    const [p, q] = ray.slice(-2);
    return p[1] + ((q[1] - p[1]) / (q[0] - p[0])) * (v - p[0]);
  };
  const miss = Math.max(...rays.map((ray) => Math.abs(at(ray) - m * h)));
  check(Math.abs(n2 / v - n1 / u - (n2 - n1) / R) < 1e-12 && Math.abs(v - 36) < 1e-9 && Math.abs(m + 1) < 1e-9, `surface example: v = ${v} cm, m = ${m} from n₂/v − n₁/u = (n₂ − n₁)/R`);
  check(miss < 1e-9 && Math.abs(F2 - 18) < 1e-9 && Math.abs(F1 + 12) < 1e-9, `surface example: the ray through C, the parallel ray via F₂ (18 cm) and the ray via F₁ (−12 cm) meet at the image tip (miss ${miss.toExponential(1)})`);
  return svgDoc(W, 184, 'A glass rod with a convex end of radius 6 centimetres and an object 24 centimetres in front of it in air: a ray through the centre of curvature goes straight on, a ray parallel to the axis bends through the second focus 18 centimetres inside the glass, and a ray through the first focus 12 centimetres in front comes out parallel; they meet 36 centimetres inside the rod, where an inverted image of the same size forms', s);
})();

// ================================================================ t02 lens shapes and the signs of R₁ and R₂
export const SHAPES_DATA = [
  { name: 'biconvex', R1: 70, R2: -70, t: 30, conv: true },
  { name: 'plano-convex', R1: Infinity, R2: -70, t: 16, conv: true },
  { name: 'biconcave', R1: -70, R2: 70, t: 6, conv: false },
  { name: 'plano-concave', R1: -70, R2: Infinity, t: 5, conv: false },
];
export const SHAPES = (() => {
  const W = 440;
  const H = 214;
  const ay = 100;
  const half = 40;
  let s = S.arrow(14, 26, 74, 26, { c: ACC, w: 2 }) + lab(80, 30, 'light from the left: R positive if C lies to the right of the surface', { size: 10 });
  const sgn = (R) => (R === Infinity ? '∞' : R > 0 ? '+' : '−');
  SHAPES_DATA.forEach((L, k) => {
    const cx = 60 + k * 106;
    const x1 = cx - L.t / 2;
    const x2 = cx + L.t / 2;
    const xs = (xv, R, y) => (R === Infinity ? xv : xv + R - Math.sign(R) * Math.sqrt(R * R - y * y));
    const left = [];
    const right = [];
    for (let y = -half; y <= half + 0.01; y += 4) {
      left.push([xs(x1, L.R1, y), ay - y]);
      right.push([xs(x2, L.R2, y), ay - y]);
    }
    const d = 'M' + left.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' L' + right.reverse().map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z';
    s += S.path(d, { fill: FILL, w: 1.5 });
    s += S.line(cx - 46, ay, cx + 46, ay, { c: MUT, w: 1, dash: '4 3' });
    s += lab(cx, ay + 62, L.name, { a: 'middle', size: 11, w: 'bold' });
    s += lab(cx, ay + 78, `R₁ ${sgn(L.R1)}, R₂ ${sgn(L.R2)}`, { a: 'middle', size: 10 });
    s += lab(cx, ay + 94, L.conv ? 'converging (f > 0)' : 'diverging (f < 0)', { a: 'middle', size: 10, c: L.conv ? GRN : RAY });
    // checks: centre of curvature side gives the sign; edge thickness positive; lens maker sign (n = 1.5)
    const c1 = L.R1 === Infinity ? null : x1 + L.R1;
    const c2 = L.R2 === Infinity ? null : x2 + L.R2;
    const signOk = (c1 === null || Math.sign(c1 - x1) === Math.sign(L.R1)) && (c2 === null || Math.sign(c2 - x2) === Math.sign(L.R2));
    const edge = xs(x2, L.R2, half) - xs(x1, L.R1, half);
    const p = 0.5 * ((L.R1 === Infinity ? 0 : 1 / L.R1) - (L.R2 === Infinity ? 0 : 1 / L.R2));
    check(signOk && edge > 0 && p > 0 === L.conv, `shapes: ${L.name} drawn with C₁, C₂ on the sides giving R₁ ${sgn(L.R1)}, R₂ ${sgn(L.R2)}; edge thickness ${edge.toFixed(1)} px; (n − 1)(1/R₁ − 1/R₂) ${p > 0 ? '> 0' : '< 0'}`);
  });
  return svgDoc(W, H, 'Four thin lenses with light arriving from the left: biconvex, with R1 positive and R2 negative; plano-convex with the flat face first, R1 infinite and R2 negative; biconcave, R1 negative and R2 positive; plano-concave with the curved face first, R1 negative and R2 infinite; the first two converge light and the last two diverge it', s);
})();

// ================================================================ t02 lens maker's derivation figure (thick-lens trace, two surfaces)
export const LM_DATA = { n: 1.5, R1: 60, R2: -120, u: -240, t: 10, k: 0.62, ky: 1.7, yA: 20 };
export const LM = (() => {
  const { n, R1, R2, u, t, k, ky, yA } = LM_DATA;
  const x1 = -t / 2;
  const x2 = t / 2;
  const v1 = surfaceImage(1, n, u - x1, R1); // from vertex 1
  const I1 = x1 + v1;
  const u2 = I1 - x2; // virtual object for surface 2 (positive)
  const v2 = surfaceImage(n, 1, u2, R2);
  const Ix = x2 + v2;
  const fThin = lensMaker(n, R1, R2);
  const vThin = lensImage(u, fThin).v;
  const xmin = -255;
  const W = Math.round((I1 + 20 - xmin) * k + 16);
  const ay = 96;
  const X = (x) => 8 + (x - xmin) * k;
  const Yy = (y) => ay - y * ky;
  const xs = (xv, R, y) => xv + R - Math.sign(R) * Math.sqrt(R * R - y * y);
  const left = [];
  const right = [];
  for (let y = -26; y <= 26.01; y += 2) {
    left.push([X(xs(x1, R1, y)), Yy(y)]);
    right.push([X(xs(x2, R2, y)), Yy(y)]);
  }
  let s = S.line(0, ay, W, ay, { c: MUT, w: 1, dash: '5 4' });
  s += S.path('M' + left.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' L' + [...right].reverse().map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z', { fill: FILL, w: 1.5 });
  // ray: O → A on surface 1 (height yA) → towards I₁, meeting surface 2 at B → I
  const A = [xs(x1, R1, yA), yA];
  let B = [x2, yA];
  for (let it = 0; it < 30; it++) {
    const yB = A[1] + ((0 - A[1]) / (I1 - A[0])) * (B[0] - A[0]);
    B = [xs(x2, R2, yB), yB];
  }
  s += rayPath([[X(u), ay], [X(A[0]), Yy(A[1])], [X(B[0]), Yy(B[1])], [X(Ix), ay], [X(Ix + 26), Yy(-B[1] * (26 / (Ix - B[0])))]]);
  s += S.line(X(B[0]), Yy(B[1]), X(I1), ay, { c: MUT, w: 1, dash: '4 3' });
  for (const [x, nm] of [[u, 'O'], [x1 + R1, 'C₁'], [x2 + R2, 'C₂'], [Ix, 'I'], [I1, 'I₁']]) s += S.circle(X(x), ay, 2.4, { fill: 'currentColor', sw: 0 }) + lab(X(x), ay + 15, nm, { a: 'middle', w: 'bold', size: 10 });
  s += lab(X(A[0]) - 4, Yy(A[1]) - 6, 'A', { a: 'end', w: 'bold', size: 10 }) + lab(X(B[0]) + 4, Yy(B[1]) - 6, 'B', { w: 'bold', size: 10 });
  s += lab(8, 18, 'air', { size: 10 }) + lab(X(0), 18, `glass, n = ${n}`, { a: 'middle', size: 10 }) + lab(W - 8, 18, 'air', { a: 'end', size: 10 });
  s += lab(10, 168, 'surface 1 alone would form I₁ (n/v₁ − 1/u = (n − 1)/R₁)', { size: 10 });
  s += lab(10, 182, 'I₁ is the object for surface 2: 1/v − n/v₁ = (1 − n)/R₂', { size: 10 });
  s += lab(10, 196, 'add: 1/v − 1/u = (n − 1)(1/R₁ − 1/R₂)', { size: 10, w: 'bold' });
  check(Math.abs(n / v1 - 1 / (u - x1) - (n - 1) / R1) < 1e-12 && Math.abs(1 / v2 - n / u2 - (1 - n) / R2) < 1e-12 && u2 > 0, `lens maker figure: surface 1 images O at I₁ (${I1.toFixed(1)}), a virtual object ${u2.toFixed(1)} beyond surface 2, which images it at I (${Ix.toFixed(1)})`);
  check(Math.abs(Ix - vThin) / vThin < 0.05 && Math.abs(fThin - 80) < 1e-9, `lens maker figure: two-surface image at ${Ix.toFixed(1)} vs thin-lens ${vThin.toFixed(1)} (f = ${fThin}): within ${((Math.abs(Ix - vThin) / vThin) * 100).toFixed(1)}%`);
  return svgDoc(W, 204, 'Derivation of the lens maker’s formula: a ray from a point object O in air enters the first surface of a biconvex lens at A and heads towards I1, where the first surface alone would form an image; the second surface at B bends it again so that it meets the axis at the final image I, closer to the lens; C1 and C2 are the centres of curvature of the two surfaces', s);
})();

// ================================================================ t03 convex lens worked example: u = −28 cm, f = 21 cm, h = 2.0 cm
export const LEX_DATA = { u: -28, f: 21, h: 2 };
const lex = (() => {
  const { u, f, h } = LEX_DATA;
  const im = lensImage(u, f);
  const d = systemDiagram({
    elems: [{ x: 0, kind: 'lens', f }],
    obj: { x: u, h },
    slopes: [0, -h / -u, (0 - h) / (-f - u)],
    xmin: -32, xmax: 92, ymin: -7.4, ymax: 7, sx: 3.4, sy: 9, endX: 92, half: 6.6,
    marks: [[-f, 'F₁'], [f, 'F₂'], [2 * f, '2F₂']],
    images: [{ x: im.v, h: im.m * h, tip: 'A′', foot: 'B′' }],
    label: 'A convex lens of focal length 21 centimetres with a 2 centimetre object 28 centimetres in front, between F1 and 2F1: the ray parallel to the axis passes through F2, the ray through the optical centre goes straight on, and the ray through F1 leaves parallel; they meet 84 centimetres beyond the lens, where a real, inverted image 6 centimetres tall forms',
    note: 'u = −28 cm, f = +21 cm → v = +84 cm, m = −3 (vertical scale enlarged)',
  });
  meetsAt('convex lens example', d.traces, { x: im.v, h: im.m * h });
  check(Math.abs(im.v - 84) < 1e-9 && Math.abs(im.m + 3) < 1e-9, 'convex lens example: v = +84 cm and m = −3 from 1/v − 1/u = 1/f');
  return d.svg;
})();
export const LEX = lex;

// ================================================================ t03 concave lens: u = −20 cm, f = −30 cm, h = 3.0 cm
export const CEX_DATA = { u: -20, f: -30, h: 3 };
export const CEX = (() => {
  const { u, f, h } = CEX_DATA;
  const im = lensImage(u, f);
  const d = systemDiagram({
    elems: [{ x: 0, kind: 'lens', f }],
    obj: { x: u, h },
    slopes: [0, -h / -u],
    xmin: -34, xmax: 30, ymin: -4, ymax: 5.2, sx: 6, sy: 14, endX: 22, half: 4.4,
    marks: [[f, 'F₁'], [-f, 'F₂']],
    images: [{ x: im.v, h: im.m * h, tip: 'A′', foot: 'B′', dashed: true }],
    back: { x: im.v, h: im.m * h },
    label: 'A concave lens of focal length 30 centimetres with a 3 centimetre object 20 centimetres in front: the ray parallel to the axis spreads out as if from the focus F1 on the object side, the ray through the centre goes straight on, and traced back they meet 12 centimetres in front of the lens, where a virtual, erect image 1.8 centimetres tall is seen',
    note: 'u = −20 cm, f = −30 cm → v = −12 cm, m = +0.6 (virtual, erect)',
  });
  meetsAt('concave lens example', d.traces, { x: im.v, h: im.m * h });
  check(Math.abs(im.v + 12) < 1e-9 && Math.abs(im.m - 0.6) < 1e-9, 'concave lens example: v = −12 cm, m = +0.6; the parallel ray extended back passes through F₁ at −30 cm');
  return d.svg;
})();

// ================================================================ t04 two thin lenses in contact
export const CONTACT_DATA = { f1: 50, f2: -150, u: -150, y: 34, k: 1.15 };
export const CONTACT = (() => {
  const { f1: fa, f2: fb, u, y, k } = CONTACT_DATA;
  const v1 = lensImage(u, fa).v;
  const vFinal = 1 / (1 / v1 + 1 / fb); // I₁ is the (virtual) object for lens 2: 1/v − 1/v₁ = 1/f₂
  const F = 1 / (1 / fa + 1 / fb);
  const vF = lensImage(u, F).v;
  const W = 420;
  const ay = 92;
  const X0 = 8 + 165 * k;
  const X = (x) => X0 + x * k;
  let s = S.line(0, ay, W, ay, { c: MUT, w: 1, dash: '5 4' });
  s += lensSym(X0 - 8, ay, 56, true) + lensSym(X0 + 9, ay, 56, false);
  s += lab(X0 - 10, ay - 62, 'L₁ (f₁)', { a: 'end', size: 10 }) + lab(X0 + 12, ay - 62, 'L₂ (f₂)', { size: 10 });
  for (const sg of [1, -1]) {
    const yy = sg * y;
    s += rayPath([[X(u), ay], [X0 - 8, ay - yy], [X0 + 9, ay - yy], [X(vFinal), ay], [X(vFinal) + 30, ay + yy * (30 / (X(vFinal) - X0 - 9))]]);
    s += S.line(X0 + 9, ay - yy, X(v1), ay, { c: MUT, w: 1, dash: '4 3' });
  }
  for (const [x, nm] of [[u, 'O'], [v1, 'I₁'], [vFinal, 'I']]) s += S.circle(X(x), ay, 2.6, { fill: 'currentColor', sw: 0 }) + lab(X(x), ay + 16, nm, { a: 'middle', w: 'bold' });
  s += lab(10, 176, 'L₁ alone: 1/v₁ − 1/u = 1/f₁ (image I₁)', { size: 10 }) + lab(10, 190, 'L₂, object I₁: 1/v − 1/v₁ = 1/f₂ (image I)', { size: 10 });
  s += lab(10, 206, 'add: 1/v − 1/u = 1/f₁ + 1/f₂ = 1/F;  P = P₁ + P₂', { size: 10, w: 'bold' });
  check(Math.abs(vFinal - vF) < 1e-9 && Math.abs(F - 75) < 1e-9 && Math.abs(v1 - 75) < 1e-9 && Math.abs(vFinal - 150) < 1e-9, `contact: L₁ alone images O (u = ${u}) at I₁ = ${v1}; L₂ moves it to I = ${vFinal}, the same as one lens of F = ${F} (1/F = 1/f₁ + 1/f₂)`);
  return svgDoc(W, 214, 'Two thin lenses in contact, a converging lens L1 and a diverging lens L2: rays from a point object O pass through L1, which alone would bring them to I1; L2 makes them converge less, so they meet farther away at I; adding the two lens equations gives one over F equals one over f1 plus one over f2', s);
})();

// ================================================================ t05 two separated convex lenses: f₁ = 10, f₂ = 15, d = 50, u = −15
export const TWO_DATA = { f1: 10, f2: 15, d: 50, u: -15, h: 1 };
export const TWO = (() => {
  const { f1: fa, f2: fb, d, u, h } = TWO_DATA;
  const elems = [{ x: 0, kind: 'lens', f: fa }, { x: d, kind: 'lens', f: fb }];
  const a = lensImage(u, fa);
  const b = lensImage(a.v - d, fb);
  const fin = systemImage(u, h, elems);
  const dg = systemDiagram({
    elems,
    obj: { x: u, h },
    slopes: [0, -h / -u],
    xmin: -18, xmax: 116, ymin: -4.8, ymax: 7, sx: 3, sy: 10, endX: 116, half: 5.4,
    marks: [[fa, 'F₁'], [d - fb, 'F₂'], [d + fb, 'F₂′']],
    images: [{ x: a.v, h: a.m * h, tip: 'A₁', foot: 'I₁' }, { x: d + b.v, h: a.m * b.m * h, tip: 'A₂', foot: '' }],
    label: 'Two convex lenses 50 centimetres apart, of focal lengths 10 and 15 centimetres, with an object 15 centimetres in front of the first: the first lens forms a real, inverted, doubled image I1 30 centimetres beyond it, which is 20 centimetres in front of the second lens; the second lens forms the final real image 60 centimetres beyond itself, erect and six times the size of the object',
    note: 'v₁ = +30 cm, u₂ = 30 − 50 = −20 cm, v₂ = +60 cm; m = (−2)(−3) = +6',
  });
  meetsAt('two lenses: first image', dg.traces.map((t) => ({ x: t.pts[1][0], y: t.pts[1][1], s: (t.pts[2][1] - t.pts[1][1]) / (t.pts[2][0] - t.pts[1][0]) })), { x: a.v, h: a.m * h });
  meetsAt('two lenses: final image', dg.traces, { x: fin.x, h: fin.h });
  check(Math.abs(fin.x - (d + b.v)) < 1e-9 && Math.abs(fin.m - a.m * b.m) < 1e-9 && Math.abs(fin.m - 6) < 1e-9, `two lenses: traced final image at x = ${fin.x} (v₂ = ${b.v} beyond L₂), m = m₁m₂ = ${fin.m}`);
  return dg.svg;
})();

// ================================================================ t05 auto-collimation: object at the focus of a lens backed by a plane mirror
export const AUTO_DATA = { f: 20, mirror: 24, h: 1 };
export const AUTO = (() => {
  const { f, mirror, h } = AUTO_DATA;
  const elems = [{ x: 0, kind: 'lens', f }, { x: mirror, kind: 'mirror', f: Infinity }, { x: 0, kind: 'lens', f }];
  const fin = systemImage(-f, h, elems);
  const dg = systemDiagram({
    elems,
    obj: { x: -f, h },
    slopes: [0, -h / f],
    xmin: -27, xmax: 28, ymin: -3.2, ymax: 3.2, sx: 7, sy: 15, endX: -25, half: 2.8,
    marks: [[f, '']],
    images: [{ x: fin.x, h: fin.h, tip: 'image', foot: '' }],
    objFoot: 'F',
    label: 'Finding the focal length of a convex lens with a plane mirror: a pin at the focus sends rays that leave the lens parallel, are reflected back by the plane mirror, and are brought to a focus again in the same focal plane, so an inverted image of the pin forms right beside it, tip to tip',
    note: 'pin at F: rays leave parallel, return parallel, focus back in the plane of the pin',
  });
  const t0 = dg.traces[0];
  const t1 = dg.traces[1];
  const parallel = Math.abs((t0.pts[2][1] - t0.pts[1][1]) / (t0.pts[2][0] - t0.pts[1][0]) - (t1.pts[2][1] - t1.pts[1][1]) / (t1.pts[2][0] - t1.pts[1][0])) < 1e-12;
  meetsAt('auto-collimation', dg.traces, { x: fin.x, h: fin.h });
  check(parallel && Math.abs(fin.x + f) < 1e-9 && Math.abs(fin.h + h) < 1e-9 && fin.real, `auto-collimation: rays parallel between lens and mirror; image back at x = ${fin.x} (the focal plane), height ${fin.h}: real, inverted, same size`);
  const fin2 = systemImage(-f, h, [{ x: 0, kind: 'lens', f }, { x: 2 * mirror, kind: 'mirror', f: Infinity }, { x: 0, kind: 'lens', f }]);
  check(Math.abs(fin2.x + f) < 1e-9, 'auto-collimation: doubling the lens–mirror distance leaves the image in the focal plane');
  return dg.svg;
})();

// ================================================================ t05 worked example: lens f = 12 cm, object at 18 cm, plane mirror 27 cm behind
export const LM2_DATA = { f: 12, u: -18, mirror: 27, h: 1 };
export const LENSMIRROR = (() => {
  const { f, u, mirror, h } = LM2_DATA;
  const elems = [{ x: 0, kind: 'lens', f }, { x: mirror, kind: 'mirror', f: Infinity }, { x: 0, kind: 'lens', f }];
  const fin = systemImage(u, h, elems);
  const a = lensImage(u, f);
  const I2 = mirror - (a.v - mirror);
  const dg = systemDiagram({
    elems,
    obj: { x: u, h },
    slopes: [0, -h / -u],
    xmin: -40, xmax: 39, ymin: -4, ymax: 4.6, sx: 5, sy: 12, endX: -40, half: 3.9,
    marks: [[-f, 'F'], [f, 'F']],
    images: [{ x: a.v, h: a.m * h, tip: 'I₁', foot: '', dashed: true }, { x: I2, h: a.m * h, tip: 'I₂', foot: '' }, { x: fin.x, h: fin.h, tip: 'I₃', foot: '' }],
    ghosts: [[0, 1, a.v], [1, 1, a.v]],
    label: 'A convex lens of focal length 12 centimetres with an object 18 centimetres in front and a plane mirror 27 centimetres behind it: the lens alone would form an image I1 36 centimetres away, 9 centimetres behind the mirror; the mirror turns the converging rays back to a real image I2 18 centimetres from the lens; light from I2 passes back through the lens and forms the final real image I3 36 centimetres in front of the lens, erect and four times the size of the object',
    note: 'returning rays in green: I₃ at 36 cm in front of the lens, m = (−2)(+1)(−2) = +4',
  });
  meetsAt('lens and mirror example', dg.traces, { x: fin.x, h: fin.h });
  const atI2 = dg.traces.map((tr) => tr.pts[2][1] + ((tr.pts[3][1] - tr.pts[2][1]) / (tr.pts[3][0] - tr.pts[2][0])) * (I2 - tr.pts[2][0]));
  check(Math.abs(fin.x + 36) < 1e-9 && Math.abs(fin.m - 4) < 1e-9 && fin.real && Math.abs(I2 - 18) < 1e-9, `lens and mirror example: I₁ at ${a.v}, I₂ at ${I2}, final I₃ at x = ${fin.x}, m = ${fin.m} (real, erect)`);
  check(atI2.every((yy) => Math.abs(yy - a.m * h) < 1e-9), 'lens and mirror example: both reflected rays pass through I₂ (18 cm, height −2)');
  return dg.svg;
})();

export const ALL = { SURF, SEX, SHAPES, LM, LEX, CEX, CONTACT, TWO, AUTO, LENSMIRROR };
