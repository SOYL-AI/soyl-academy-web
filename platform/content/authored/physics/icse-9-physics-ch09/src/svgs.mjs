// SVG diagrams for ICSE 9 Physics ch09 Spherical Mirrors: simple qualitative ray diagrams (scale drawing is a removed topic).
// Every diagram is computed: the mirror is an arc of a circle of radius R = 2f; the rays use the standard rules (parallel to the
// axis, through or towards F, through or towards C); the image is placed with 1/v + 1/u = 1/f in the Cartesian convention and the
// build checks that the drawn reflected rays meet there (within a few pixels). Palette colours only; every font size is >= 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { vOf } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUT = 'var(--diagram-muted)';
const rad = (d) => (d * Math.PI) / 180;
const check = (cond, msg) => {
  if (!cond) throw new Error(`svgs: ${msg}`);
};
const ray = (p, q, o = {}) => S.line(p[0], p[1], q[0], q[1], { c: o.c ?? RED, w: o.w ?? 1.9, dash: o.dash }) + (o.head === false ? '' : S.midHead(p[0], p[1], q[0], q[1], { c: o.c ?? RED, size: 7, at: o.at ?? 0.5 }));

const W = 610;
const H = 250;
const Xm = 478;
const Y = 126;
const HALF = 78;

/** Geometry of a mirror of focal length magnitude f (px): concave centre on the left, convex centre on the right. */
function geom(kind, f, xm = Xm) {
  const R = 2 * f;
  const C0 = kind === 'concave' ? [xm - R, Y] : [xm + R, Y];
  const arcX = (y) => (kind === 'concave' ? C0[0] + Math.sqrt(R * R - y * y) : C0[0] - Math.sqrt(R * R - y * y));
  const F = kind === 'concave' ? [xm - f, Y] : [xm + f, Y];
  /** First point where the half-line p + t d (t > 0) meets the mirror arc. */
  const hit = (p, d) => {
    const a = d[0] * d[0] + d[1] * d[1];
    const b = 2 * (d[0] * (p[0] - C0[0]) + d[1] * (p[1] - C0[1]));
    const c = (p[0] - C0[0]) ** 2 + (p[1] - C0[1]) ** 2 - R * R;
    const disc = b * b - 4 * a * c;
    check(disc >= 0, 'ray misses the mirror');
    const cands = [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)].filter((t) => t > 1e-9).map((t) => [p[0] + d[0] * t, p[1] + d[1] * t]);
    const onMirror = cands.filter((q) => (kind === 'concave' ? q[0] > C0[0] : q[0] < C0[0]) && Math.abs(q[1] - Y) <= HALF + 4);
    check(onMirror.length > 0, 'no hit on the mirror arc');
    return onMirror[0];
  };
  return { R, C0, arcX, F, hit };
}
function mirrorShape(kind, g) {
  const pts = [];
  for (let y = -HALF; y <= HALF; y += 6) pts.push([g.arcX(y), Y + y]);
  let s = `<polyline points="${pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')}" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/>`;
  const back = kind === 'concave' ? 1 : 1; // hatching is always on the right-hand side, the back of the mirror
  for (let y = -HALF + 6; y <= HALF - 4; y += 9) {
    const x = g.arcX(y);
    s += S.line(x, Y + y, x + 8 * back, Y + y + 6, { c: MUT, w: 1 });
  }
  return s;
}
const norm = (d) => {
  const n = Math.hypot(d[0], d[1]);
  return [d[0] / n, d[1] / n];
};
const toX = (p, d, x) => [x, p[1] + (d[1] / d[0]) * (x - p[0])];
function meet(p, d, q, e) {
  const den = d[0] * e[1] - d[1] * e[0];
  const s = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den;
  return [p[0] + d[0] * s, p[1] + d[1] * s];
}

/**
 * Ray diagram of an object of height h (px) at distance u (px) from a mirror of focal length f (px).
 * letters: optional {P, F, C, obj, img} to print letters instead of names.
 */
const FPX = 90;
function caseDiagram({ kind, u, f = FPX, h = 26, letters = null, alt, xm = Xm }) {
  const g = geom(kind, f, xm);
  const p = [];
  const T = [xm - u, Y - h];
  const concave = kind === 'concave';
  // image from the mirror formula (Cartesian): u < 0, f < 0 for a concave mirror
  const fs = concave ? -f : f;
  const v = vOf(-u, fs);
  const finite = Number.isFinite(v);
  const mgn = finite ? -v / -u : Infinity;
  const real = finite && v < 0 && concave;
  p.push(S.line(10, Y, W - 10, Y, { c: MUT, w: 1 }), mirrorShape(kind, g));
  // marks
  const mark = (x, t) => S.circle(x, Y, 2.8, { fill: 'currentColor' }) + lab(x, Y + 18, t, { a: 'middle', size: 12, w: 'bold' });
  p.push(mark(xm, letters?.P ?? 'P'), mark(g.F[0], letters?.F ?? 'F'), mark(g.C0[0] + (concave ? 0 : 0), letters?.C ?? 'C'));
  // object
  p.push(S.arrow(T[0], Y, T[0], T[1], { c: GREEN, w: 2.6, size: 8 }), lab(T[0] - 6, T[1] - 6, letters?.obj ?? 'object', { a: 'middle', c: GREEN, w: 'bold' }));
  // ray 1: parallel to the axis
  const H1 = g.hit(T, [1, 0]);
  const d1 = concave ? norm([g.F[0] - H1[0], g.F[1] - H1[1]]) : norm([H1[0] - g.F[0], H1[1] - g.F[1]]);
  // ray 2: through (concave, u > f) or towards F, or as if from F (concave, u < f)
  let H2 = null;
  const d2 = [-1, 0];
  const atF = concave && Math.abs(u - f) < 1e-9;
  if (!atF) {
    const dirIn = concave && u < f ? [T[0] - g.F[0], T[1] - g.F[1]] : [g.F[0] - T[0], g.F[1] - T[1]];
    H2 = g.hit(T, dirIn);
  }
  // ray 3: towards C (back along itself)
  const dirC = concave ? (u > 2 * f ? [g.C0[0] - T[0], g.C0[1] - T[1]] : [T[0] - g.C0[0], T[1] - g.C0[1]]) : [g.C0[0] - T[0], g.C0[1] - T[1]];
  const atC = concave && Math.abs(u - 2 * f) < 1e-9; // the ray through C is then vertical: only two rays are drawn
  const H3 = atC ? null : g.hit(T, dirC);
  const d3 = atC ? null : norm([T[0] - H3[0], T[1] - H3[1]]);
  // image position and check
  let I = null;
  if (finite) {
    I = [xm + v, Y - mgn * h];
    const a = atC ? meet(H1, d1, H2, d2) : meet(H1, d1, H3, d3);
    check(Math.hypot(a[0] - I[0], a[1] - I[1]) <= 6 + 0.06 * Math.abs(v), `${kind} u=${u}: rays meet at ${a.map((x) => x.toFixed(1))}, formula gives ${I.map((x) => x.toFixed(1))}`);
    if (H2) {
      const b = meet(H1, d1, H2, d2);
      check(Math.hypot(b[0] - I[0], b[1] - I[1]) <= 6 + 0.06 * Math.abs(v), `${kind} u=${u}: second pair of rays meets at ${b.map((x) => x.toFixed(1))}`);
    }
  } else {
    check(Math.abs(d1[0] * d3[1] - d1[1] * d3[0]) < 0.02, 'object at F: reflected rays are parallel');
  }
  const reflected = (Hh, d, tag) => {
    if (real) {
      p.push(ray(T, Hh, { c: RED }), ray(Hh, I, { c: BLUE }));
      return;
    }
    p.push(ray(T, Hh, { c: RED }));
    const e = toX(Hh, d, 20);
    p.push(ray(Hh, e, { c: BLUE }));
    if (finite && !concave) p.push(S.line(Hh[0], Hh[1], I[0], I[1], { c: BLUE, w: 1.4, dash: '5 4' }));
    if (finite && concave) p.push(S.line(Hh[0], Hh[1], I[0], I[1], { c: BLUE, w: 1.4, dash: '5 4' }));
    void tag;
  };
  reflected(H1, d1, 1);
  if (H2) reflected(H2, d2, 2);
  if (H3) reflected(H3, d3, 3);
  if (concave && real) {
    // ray 3 retraces: the lines from H3 back to T go on to the image
  }
  if (finite) {
    p.push(S.arrow(I[0], Y, I[0], I[1], { c: BLUE, w: 2.6, size: 8, dash: real ? undefined : '5 3' }), lab(I[0] + (real ? -8 : 0), I[1] + (I[1] > Y ? 16 : -8), letters?.img ?? 'image', { a: real ? 'end' : 'middle', c: BLUE, w: 'bold' }));
  }
  return svgDoc(W, H, alt, p.join(''));
}

const HP = 26;
export const CASE_BEYOND_C = caseDiagram({ kind: 'concave', u: 3 * FPX, h: HP, alt: 'Concave mirror with an object beyond the centre of curvature C. The reflected rays meet between C and the focus F, forming a real, inverted and diminished image' });
export const CASE_AT_C = caseDiagram({ kind: 'concave', u: 2 * FPX, h: HP, alt: 'Concave mirror with an object at the centre of curvature C. The reflected rays meet at C, forming a real, inverted image of the same size as the object' });
export const CASE_C_F = caseDiagram({ kind: 'concave', u: 1.5 * FPX, h: HP * 0.85, alt: 'Concave mirror with an object between the centre of curvature C and the focus F. The reflected rays meet beyond C, forming a real, inverted and enlarged image' });
export const CASE_AT_F = caseDiagram({ kind: 'concave', u: FPX, h: HP, alt: 'Concave mirror with an object at the focus F. The reflected rays are parallel to one another, so the image is formed at infinity' });
export const CASE_IN_F = caseDiagram({ kind: 'concave', u: 0.5 * FPX, h: 16, alt: 'Concave mirror with an object between the focus F and the pole P. The reflected rays diverge; extended backwards they meet behind the mirror, forming a virtual, erect and enlarged image' });
export const CASE_CONVEX = caseDiagram({ kind: 'convex', u: 2.2 * 70, f: 70, xm: 340, h: 24, alt: 'Convex mirror with an object in front of it. The reflected rays diverge; extended backwards they appear to meet behind the mirror between the pole P and the focus F, forming a virtual, erect and diminished image' });
export const CASE_C_F_LETTERED = caseDiagram({
  kind: 'concave', u: 1.5 * FPX, h: HP * 0.85, letters: { P: 'C', F: 'B', C: 'A', obj: 'D', img: 'E' },
  alt: 'Concave mirror with an object, a real inverted image and the points on the principal axis lettered: A is the centre of curvature, B is the principal focus, C is the pole, D is the object and E is the image. The labels are letters only',
});

// ---------------------------------------------------------------- terms: pole, centre of curvature, focus, axis, aperture, R, f
function terms(lettered) {
  const f = 90;
  const g = geom('concave', f);
  const p = [];
  p.push(S.line(10, Y, W - 10, Y, { c: MUT, w: 1.2 }), mirrorShape('concave', g));
  p.push(S.circle(g.C0[0], Y, 3, { fill: 'currentColor' }), S.circle(g.F[0], Y, 3, { fill: 'currentColor' }), S.circle(Xm, Y, 3, { fill: 'currentColor' }));
  // the sphere of which the mirror is a part (dotted)
  p.push(S.path(`M ${g.arcX(HALF).toFixed(1)} ${Y - HALF} A ${g.R} ${g.R} 0 1 0 ${g.arcX(HALF).toFixed(1)} ${Y + HALF}`, { c: MUT, w: 1, dash: '3 5' }));
  // R and f
  p.push(S.arrow(Xm - 4, Y - 44, g.C0[0] + 4, Y - 44, { w: 1.3, size: 6 }), S.arrow(g.C0[0] + 4, Y - 44, Xm - 4, Y - 44, { w: 1.3, size: 6 }));
  p.push(S.arrow(Xm - 4, Y + 44, g.F[0] + 4, Y + 44, { w: 1.3, size: 6 }), S.arrow(g.F[0] + 4, Y + 44, Xm - 4, Y + 44, { w: 1.3, size: 6 }));
  p.push(S.arrow(Xm + 24, Y - HALF, Xm + 24, Y + HALF, { w: 1.3, size: 6 }), S.arrow(Xm + 24, Y + HALF, Xm + 24, Y - HALF, { w: 1.3, size: 6 }));
  if (lettered) {
    p.push(lab(Xm + 8, Y + 18, 'A', { size: 16, w: 'bold' }), lab(g.F[0], Y + 18, 'B', { size: 16, a: 'middle', w: 'bold' }), lab(g.C0[0], Y + 18, 'C', { size: 16, a: 'middle', w: 'bold' }));
    p.push(lab(110, Y - 6, 'D', { size: 16, w: 'bold' }), lab((Xm + g.C0[0]) / 2, Y - 50, 'E', { size: 16, a: 'middle', w: 'bold' }));
  } else {
    p.push(lab(Xm + 6, Y + 18, 'P', { size: 13, w: 'bold' }), lab(g.F[0], Y + 18, 'F', { size: 13, a: 'middle', w: 'bold' }), lab(g.C0[0], Y + 18, 'C', { size: 13, a: 'middle', w: 'bold' }));
    p.push(lab(110, Y - 6, 'principal axis', { w: 'bold' }), lab((Xm + g.C0[0]) / 2, Y - 50, 'R = PC', { a: 'middle', w: 'bold' }), lab((Xm + g.F[0]) / 2, Y + 62, 'f = PF', { a: 'middle', w: 'bold' }));
    p.push(lab(Xm + 30, Y - 4, 'aperture', { size: 11, c: MUT }), lab(Xm - 50, Y - HALF - 8, 'concave mirror', { a: 'middle' }));
  }
  const alt = lettered
    ? 'A concave mirror with its principal axis and marked points, lettered A to E: A is the pole, B the principal focus, C the centre of curvature, D the principal axis and E the radius of curvature. The labels are letters only'
    : 'A concave mirror with the pole P, the principal focus F, the centre of curvature C and the principal axis. The distance PC is the radius of curvature R, the distance PF is the focal length f, and R equals two times f';
  return svgDoc(W, H, alt, p.join(''));
}
export const TERMS = terms(false);
export const TERMS_LETTERED = terms(true);

// ---------------------------------------------------------------- rays parallel to the axis, and a parallel beam at an angle
function parallel(kind) {
  const f = 90;
  const g = geom(kind, f);
  const p = [];
  p.push(S.line(10, Y, W - 10, Y, { c: MUT, w: 1 }), mirrorShape(kind, g));
  p.push(S.circle(g.F[0], Y, 3, { fill: 'currentColor' }), lab(g.F[0], Y + 18, 'F', { a: 'middle', w: 'bold', size: 13 }), S.circle(Xm, Y, 3, { fill: 'currentColor' }), lab(Xm - 4, Y + 18, 'P', { a: 'middle', w: 'bold', size: 13 }));
  for (const y of [-60, -30, 30, 60]) {
    const T = [60, Y + y];
    const Hh = g.hit(T, [1, 0]);
    const d = kind === 'concave' ? norm([g.F[0] - Hh[0], g.F[1] - Hh[1]]) : norm([Hh[0] - g.F[0], Hh[1] - g.F[1]]);
    if (kind === 'concave') {
      const end = [g.F[0] + d[0] * 40, g.F[1] + d[1] * 40];
      p.push(ray(T, Hh, { c: RED, at: 0.35 }), ray(Hh, end, { c: BLUE, at: 0.4 }));
    } else {
      const end = toX(Hh, d, 150);
      p.push(ray(T, Hh, { c: RED, at: 0.35 }), ray(Hh, end, { c: BLUE, at: 0.45 }), S.line(Hh[0], Hh[1], g.F[0], g.F[1], { c: BLUE, w: 1.3, dash: '5 4' }));
    }
  }
  p.push(lab(30, 22, kind === 'concave' ? 'Rays parallel to the principal axis meet at the focus F' : 'Rays parallel to the axis appear to come from the focus F', { size: 12, c: MUT }));
  const alt = kind === 'concave'
    ? 'A beam of rays parallel to the principal axis falling on a concave mirror. After reflection all the rays pass through the principal focus F in front of the mirror'
    : 'A beam of rays parallel to the principal axis falling on a convex mirror. After reflection the rays diverge and appear to come from the principal focus F behind the mirror';
  return svgDoc(W, H, alt, p.join(''));
}
export const PAR_CONCAVE = parallel('concave');
export const PAR_CONVEX = parallel('convex');

export const PAR_INCL = (() => {
  const f = 90;
  const phi = 12;
  const g = geom('concave', f);
  const t = Math.tan(rad(phi));
  const Q = [g.F[0], Y + f * t]; // focal plane point (below the axis)
  const p = [];
  p.push(S.line(10, Y, W - 10, Y, { c: MUT, w: 1 }), mirrorShape('concave', g));
  p.push(S.line(g.F[0], 20, g.F[0], H - 20, { c: MUT, w: 1.2, dash: '5 4' }), lab(g.F[0] - 6, 30, 'focal plane', { a: 'end', c: MUT, size: 12 }));
  p.push(S.circle(g.F[0], Y, 3, { fill: 'currentColor' }), lab(g.F[0] + 6, Y - 8, 'F', { w: 'bold', size: 13 }), S.circle(Xm, Y, 3, { fill: 'currentColor' }), lab(Xm - 4, Y - 10, 'P', { a: 'middle', w: 'bold', size: 13 }));
  const dir = [Math.cos(rad(phi)), Math.sin(rad(phi))]; // incident beam, travelling down to the right
  // ray through the pole: reflected with the angle of incidence unchanged on the other side of the axis
  const Hp = [Xm, Y];
  const dp = [-dir[0], dir[1]];
  const q1 = toX(Hp, dp, Q[0]);
  check(Math.abs(q1[1] - Q[1]) < 1e-6, 'pole ray reaches the focal plane at f tan(phi)');
  // ray directed through C: retraces its own path
  const startC = [g.C0[0] - 0 * 1, g.C0[1]];
  const Hc2 = g.hit(startC, dir);
  const dc = [-dir[0], -dir[1]];
  const qc = toX(Hc2, dc, Q[0]);
  check(Math.abs(qc[1] - Q[1]) < 3.5, 'the ray through C meets the other rays on the focal plane');
  // a third ray of the beam, above the axis, reflected towards the same point
  const H3 = g.hit([Xm - 330, Y - 56 - 330 * t], dir);
  const d3 = norm([Q[0] - H3[0], Q[1] - H3[1]]);
  const back = (Hh) => [Hh[0] - dir[0] * 300, Hh[1] - dir[1] * 300];
  const seg = (Hh, to) => {
    const s0 = back(Hh);
    const x0 = Math.max(12, s0[0]);
    const s1 = [x0, Hh[1] - dir[1] * ((Hh[0] - x0) / dir[0])];
    return ray(s1, Hh, { c: RED, at: 0.4 }) + ray(Hh, to, { c: BLUE, at: 0.5 });
  };
  p.push(seg(Hp, Q), seg(Hc2, Q), seg(H3, Q));
  p.push(S.circle(Q[0], Q[1], 4, { fill: BLUE, c: BLUE }), lab(Q[0] + 8, Q[1] + 14, 'Q', { w: 'bold', c: BLUE, size: 13 }));
  p.push(lab(20, H - 12, 'A parallel beam at a small angle to the axis meets on the focal plane at Q.', { size: 12, c: MUT }));
  void d3;
  return svgDoc(W, H, 'A parallel beam of rays at a small angle to the principal axis falling on a concave mirror. After reflection the rays meet at a point Q on the focal plane, the plane through the focus F perpendicular to the principal axis, below the axis', p.join(''));
})();

// ---------------------------------------------------------------- sign convention
export const SIGN = (() => {
  const p = [];
  const x0 = 290;
  p.push(S.line(20, Y, 550, Y, { c: MUT, w: 1.2 }), S.line(x0, 28, x0, 204, { w: 3 }));
  for (let y = 36; y < 198; y += 9) p.push(S.line(x0, y, x0 + 8, y + 6, { c: MUT, w: 1 }));
  p.push(lab(x0 + 14, Y + 18, 'pole P (origin)', { size: 12, w: 'bold' }));
  p.push(S.arrow(x0 - 8, Y - 20, 60, Y - 20, { c: RED, w: 1.8, size: 8 }), lab(60, Y - 28, 'against the incident light: negative', { size: 12, c: RED }));
  p.push(S.arrow(x0 + 40, Y + 40, 540, Y + 40, { c: GREEN, w: 1.8, size: 8 }), lab(x0 + 40, Y + 58, 'along the incident light: positive', { size: 12, c: GREEN }));
  p.push(S.arrow(80, Y + 30, 80, Y - 16, { c: BLUE, w: 1.8, size: 8 }), lab(88, Y + 52, 'heights above the axis: positive', { size: 12, c: BLUE }));
  p.push(S.arrow(120, 48, 220, 48, { w: 2, size: 8 }), lab(120, 38, 'incident light', { size: 12, w: 'bold' }));
  p.push(lab(20, 226, 'The object is always to the left of the mirror, so u is negative.', { size: 12, c: MUT }), lab(20, 244, 'For a concave mirror f and R are negative; for a convex mirror they are positive.', { size: 12, c: MUT }));
  return svgDoc(W, H, 'The Cartesian sign convention for a mirror: the pole is the origin, light travels from left to right, distances measured against the direction of the incident light are negative and those along it are positive, and heights above the principal axis are positive', p.join(''));
})();
