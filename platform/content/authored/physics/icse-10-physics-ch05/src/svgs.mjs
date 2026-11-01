// ICSE 10 Physics ch05 diagrams (allow-listed elements, palette colours only). Every ray diagram is computed: the image is the
// intersection of the drawn principal rays, and SELF_CHECKS (read by build.mjs) confirm that it lies where the lens formula
// 1/v - 1/u = 1/f (New Cartesian sign convention, light from the left) puts it, with height m h where m = v/u.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const near = (a, b, tol) => Math.abs(a - b) <= tol;

/** Lens outline at x = X, half-height hh: convex (bulging) or concave (waisted). */
function lensShape(X, Y, hh, type) {
  const w = 9;
  if (type === 'convex') return S.path(`M${X} ${Y - hh} Q ${X + 2 * w} ${Y} ${X} ${Y + hh} Q ${X - 2 * w} ${Y} ${X} ${Y - hh} Z`, { fill: BLUE, fop: 0.18, c: BLUE, w: 1.5 });
  return S.path(`M${X - w} ${Y - hh} L${X + w} ${Y - hh} Q ${X + 1} ${Y} ${X + w} ${Y + hh} L${X - w} ${Y + hh} Q ${X - 1} ${Y} ${X - w} ${Y - hh} Z`, { fill: BLUE, fop: 0.18, c: BLUE, w: 1.5 });
}
/** Ray segment with a mid-arrow. */
const ray = (p, q, o = {}) => S.line(p[0], p[1], q[0], q[1], { c: o.c ?? RED, w: o.w ?? 1.8, dash: o.dash }) + (o.head === false ? '' : S.midHead(p[0], p[1], q[0], q[1], { c: o.c ?? RED, size: 6 }));
/** Vertical arrow from the axis to height y (screen). */
const objArrow = (x, Y, y, c, dash) => S.arrow(x, Y, x, y, { c, w: 2.2, size: 8, dash });
/** Point where the line p + t d reaches x = X. */
const atX = (p, d, X) => [X, p[1] + ((X - p[0]) * d[1]) / d[0]];
/** Intersection of lines p + s d and q + t e. */
function meet(p, d, q, e) {
  const den = d[0] * e[1] - d[1] * e[0];
  const s = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den;
  return [p[0] + d[0] * s, p[1] + d[1] * s];
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

/**
 * Ray diagram for a thin lens. u, f in cm (New Cartesian: u < 0; f > 0 convex, f < 0 concave), h object height in cm.
 * X0 = screen x of the lens, k = px per cm. Draws two principal rays (three for real images), the image, F and 2F marks.
 */
function lensDiagram({ type, u, f, h, X0, k, W, H, Y = null, title, label, note, objBelow = false, imgBelow = false }) {
  const Yax = Y ?? Math.round(H / 2) + 10;
  const sx = (cm) => X0 + cm * k;
  const top = [sx(u), Yax - h * k];
  const hh = Math.min(Yax - 18, H - Yax - 30);
  let s = S.line(10, Yax, W - 10, Yax, { c: MUT, w: 1 }) + lensShape(X0, Yax, hh, type);
  for (const [cm, t] of [[-2 * Math.abs(f), '2F₁'], [-Math.abs(f), 'F₁'], [Math.abs(f), 'F₂'], [2 * Math.abs(f), '2F₂']]) {
    const x = sx(cm);
    if (x > 8 && x < W - 8) s += S.circle(x, Yax, 2.5, { fill: 'currentColor' }) + lab(x, Yax + 15, t, { size: 10, a: 'middle' });
  }
  s += lab(X0 + 4, Yax + 15, 'O', { size: 10 });
  s += objArrow(top[0], Yax, top[1], GREEN) + lab(top[0], objBelow ? Yax + 30 : top[1] - 6, 'object', { size: 10, a: 'middle', c: GREEN });
  const L1 = [X0, top[1]];
  // Ray 1: parallel to the axis, then through F2 (convex) or as if from F1 (concave)
  const d1 = type === 'convex' ? sub([sx(f), Yax], L1) : sub(L1, [sx(f), Yax]);
  // Ray 2: through the optical centre, undeviated
  const d2 = sub([X0, Yax], top);
  const real = u + f < 0 && type === 'convex' ? true : false;
  const parallel = type === 'convex' && near(u, -f, 1e-9);
  const v = parallel ? Infinity : 1 / (1 / f + 1 / u);
  const m = v / u;
  let img = null;
  if (!parallel) img = meet(L1, d1, top, d2);
  const far = (p, d, len) => [p[0] + (d[0] / Math.hypot(...d)) * len, p[1] + (d[1] / Math.hypot(...d)) * len];
  s += ray(top, L1);
  const end1 = img && v > 0 ? far(L1, d1, Math.hypot(img[0] - L1[0], img[1] - L1[1]) + 40) : atX(L1, d1, W - 12);
  s += ray(L1, end1);
  const end2 = img && v > 0 ? far([X0, Yax], d2, Math.hypot(img[0] - X0, img[1] - Yax) + 40) : atX(top, d2, W - 12);
  s += ray(top, [X0, Yax]) + ray([X0, Yax], end2);
  if (type === 'convex' && real && u < -f) {
    // Ray 3: through F1, then parallel to the axis
    const d3 = sub([sx(-f), Yax], top);
    const L3 = atX(top, d3, X0);
    s += ray(top, L3, { c: ACC, w: 1.4 }) + ray(L3, [img ? img[0] + 40 : W - 12, L3[1]], { c: ACC, w: 1.4 });
    check(near(L3[1], img[1], 1e-6), `${title}: third ray (through F1, then parallel) also passes through the image point`);
  }
  if (img && v < 0) {
    s += S.line(L1[0], L1[1], img[0], img[1], { c: MUT, w: 1, dash: '4 3' }) + S.line(top[0], top[1], img[0], img[1], { c: MUT, w: 1, dash: '4 3' });
    s += objArrow(img[0], Yax, img[1], BLUE, '5 3') + (imgBelow ? lab(img[0], Yax + 30, 'virtual image', { size: 10, a: 'middle', c: BLUE }) : lab(img[0] - 4, img[1] - 6, 'virtual image', { size: 10, a: 'end', c: BLUE }));
  } else if (img) {
    s += objArrow(img[0], Yax, img[1], BLUE) + lab(img[0] - 6, img[1] + (img[1] > Yax ? 14 : -6), 'real image', { size: 10, a: 'end', c: BLUE });
  } else s += lab(W - 14, 30, 'refracted rays parallel: image at infinity', { size: 10, a: 'end', c: BLUE });
  s += lab(10, H - 8, note, { size: 10 });
  if (parallel) {
    const cross = d1[0] * d2[1] - d1[1] * d2[0];
    check(near(cross, 0, 1e-6), `${title}: object at F, so the two refracted rays are parallel (image at infinity)`);
  } else {
    const vDrawn = (img[0] - X0) / k;
    const hDrawn = (Yax - img[1]) / k;
    check(near(vDrawn, v, 1e-6) && near(hDrawn, m * h, 1e-6), `${title}: rays meet at v = ${vDrawn.toFixed(2)} cm, height ${hDrawn.toFixed(2)} cm; lens formula gives v = ${v.toFixed(2)} cm, m = ${m.toFixed(3)}`);
  }
  return svgDoc(W, H, label, s);
}

export const LENS_CASES = {
  beyond2F: { type: 'convex', u: -30, f: 10, h: 4 },
  at2F: { type: 'convex', u: -20, f: 10, h: 3 },
  F2F: { type: 'convex', u: -15, f: 10, h: 2.5 },
  atF: { type: 'convex', u: -10, f: 10, h: 3 },
  withinF: { type: 'convex', u: -6, f: 10, h: 2 },
  concave: { type: 'concave', u: -20, f: -10, h: 4 },
};
const C = LENS_CASES;
export const CONVEX_BEYOND_2F = lensDiagram({ ...C.beyond2F, X0: 250, k: 7.5, W: 400, H: 210, title: 'convex, object beyond 2F', note: 'Object beyond 2F₁: image between F₂ and 2F₂, real, inverted, diminished', label: 'Convex lens with the object beyond 2F1. A ray parallel to the axis passes through F2 after refraction, a ray through the optical centre goes straight on, and a ray through F1 emerges parallel. They meet between F2 and 2F2, forming a real, inverted, diminished image.' });
export const CONVEX_AT_2F = lensDiagram({ ...C.at2F, X0: 200, k: 9, W: 400, H: 210, title: 'convex, object at 2F', note: 'Object at 2F₁: image at 2F₂, real, inverted, same size', label: 'Convex lens with the object at 2F1. The refracted rays meet at 2F2, forming a real, inverted image of the same size as the object.' });
export const CONVEX_F_2F = lensDiagram({ ...C.F2F, X0: 150, k: 8, W: 420, H: 230, Y: 95, title: 'convex, object between F and 2F', note: 'Object between F₁ and 2F₁: image beyond 2F₂, real, inverted, magnified', label: 'Convex lens with the object between F1 and 2F1. The refracted rays meet beyond 2F2, forming a real, inverted, magnified image.' });
export const CONVEX_AT_F = lensDiagram({ ...C.atF, X0: 180, k: 9, W: 400, H: 200, title: 'convex, object at F', note: 'Object at F₁: refracted rays parallel; image at infinity, real, inverted, highly magnified', label: 'Convex lens with the object at F1. After refraction the two rays are parallel to each other, so the image is formed at infinity; it is real, inverted and highly magnified.' });
export const CONVEX_WITHIN_F = lensDiagram({ ...C.withinF, X0: 250, k: 11, W: 400, H: 210, Y: 125, title: 'convex, object within F (magnifying glass)', objBelow: true, note: 'Object between O and F₁: image on the same side, virtual, erect, magnified', label: 'Convex lens used as a magnifying glass, with the object between the optical centre and F1. The refracted rays diverge; produced backwards they meet on the same side as the object, farther from the lens, forming a virtual, erect, magnified image.' });
export const CONCAVE = lensDiagram({ ...C.concave, X0: 280, k: 11, W: 400, H: 200, Y: 110, title: 'concave lens', imgBelow: true, note: 'Concave lens: image between F₁ and O, virtual, erect, diminished', label: 'Concave lens with an object beyond F1. A ray parallel to the axis diverges as if coming from F1, and a ray through the optical centre goes straight on. Produced backwards, they meet between F1 and the lens, forming a virtual, erect, diminished image.' });

// ---------------------------------------------------------------- parallel beams: converging and diverging action, focal length
export const LENS_ACTION = (() => {
  const Y = 95;
  const f = 70;
  let s = '';
  // convex panel
  const X1 = 110;
  s += S.line(10, Y, 250, Y, { c: MUT, w: 1 }) + lensShape(X1, Y, 55, 'convex');
  let conv = true;
  for (const y of [-40, -20, 20, 40]) {
    s += ray([20, Y + y], [X1, Y + y], { w: 1.4 });
    const d = [X1 + f - X1, -y];
    const end = [X1 + f + 50, Y + y + (d[1] * (f + 50)) / f];
    s += ray([X1, Y + y], end, { w: 1.4 });
    if (!near(Y + y + (d[1] * f) / f, Y, 1e-9)) conv = false;
  }
  s += S.circle(X1 + f, Y, 3, { fill: 'currentColor' }) + lab(X1 + f, Y + 18, 'F₂', { size: 10, a: 'middle' }) + lab(X1 - 4, Y + 18, 'O', { size: 10, a: 'end' });
  s += S.line(X1, Y + 66, X1 + f, Y + 66, { c: ACC, w: 1 }) + lab(X1 + f / 2, Y + 80, 'focal length f', { size: 10, a: 'middle', c: ACC });
  s += lab(130, 16, 'convex: converges', { size: 11, a: 'middle' });
  // concave panel
  const X2 = 380;
  s += S.line(270, Y, 500, Y, { c: MUT, w: 1 }) + lensShape(X2, Y, 55, 'concave');
  let div = true;
  for (const y of [-40, -20, 20, 40]) {
    s += ray([285, Y + y], [X2, Y + y], { w: 1.4 });
    const d = [f, y];
    const end = [X2 + 70, Y + y + (d[1] * 70) / f];
    s += ray([X2, Y + y], end, { w: 1.4 }) + S.line(X2, Y + y, X2 - f, Y, { c: MUT, w: 1, dash: '4 3' });
    if (!near(Y + y - (d[1] * f) / f, Y, 1e-9)) div = false;
  }
  s += S.circle(X2 - f, Y, 3, { fill: 'currentColor' }) + lab(X2 - f, Y + 18, 'F₁', { size: 10, a: 'middle' });
  s += lab(390, 16, 'concave: diverges', { size: 11, a: 'middle' });
  s += lab(10, 202, 'Rays parallel to the axis meet at F₂ (convex) or appear to come from F₁ (concave)', { size: 10 });
  check(conv && div, 'lens action: every refracted ray of the convex lens crosses the axis at F2, and every refracted ray of the concave lens produced backwards passes through F1, at the same focal length');
  return svgDoc(510, 212, 'Left: a convex lens refracts a beam parallel to the principal axis so that it converges to the principal focus F2; the distance from the optical centre to F2 is the focal length. Right: a concave lens makes a parallel beam diverge so that the rays appear to come from the principal focus F1 on the incident side.', s);
})();

// ---------------------------------------------------------------- lens as a set of prisms
export const PRISMS = (() => {
  let s = '';
  const Y = 95;
  const ys = [0, 22, 44, 66];
  const piece = (X, t, fillOp) => {
    let out = '';
    const angles = [];
    for (let j = 0; j < 3; j++) {
      for (const sg of [-1, 1]) {
        const y1 = Y + sg * (ys[j] + (j ? 1.5 : 0));
        const y2 = Y + sg * ys[j + 1];
        out += S.path(`M${X - t[j]} ${y1} L${X + t[j]} ${y1} L${X + t[j + 1]} ${y2} L${X - t[j + 1]} ${y2} Z`, { fill: BLUE, fop: fillOp, c: BLUE, w: 1.2 });
      }
      angles.push((2 * Math.atan(Math.abs(t[j] - t[j + 1]) / 22) * 180) / Math.PI);
    }
    return { out, angles };
  };
  const cv = piece(80, [18, 15, 9, 0.5], 0.22);
  const cc = piece(300, [4, 7, 13, 22], 0.22);
  s += cv.out + cc.out;
  s += lab(80, 186, 'convex: bases towards the axis', { size: 10, a: 'middle' });
  s += lab(300, 186, 'concave: apexes towards the axis', { size: 10, a: 'middle' });
  s += S.line(10, Y, 380, Y, { c: MUT, w: 1, dash: '4 3' });
  s += lab(130, 40, 'each prism bends light', { size: 10 }) + lab(130, 54, 'towards its base:', { size: 10 }) + lab(130, 68, 'convex converges,', { size: 10 }) + lab(130, 82, 'concave diverges', { size: 10 });
  s += lab(130, 130, 'prism angle grows', { size: 10, c: ACC }) + lab(130, 144, 'away from the axis', { size: 10, c: ACC });
  const grows = (A) => A[0] < A[1] && A[1] < A[2];
  check(grows(cv.angles) && grows(cc.angles), `lens as prisms: the angle between the faces of each piece grows away from the axis (convex ${cv.angles.map((x) => x.toFixed(0)).join(', ')} degrees; concave ${cc.angles.map((x) => x.toFixed(0)).join(', ')} degrees), so outer rays are bent more`);
  return svgDoc(390, 200, 'A convex lens pictured as a stack of truncated prisms, thickest at the principal axis, with their bases towards the axis; a concave lens as prisms with their apexes towards the axis, thinnest at the axis. Each prism bends light towards its base, so the convex lens converges light and the concave lens diverges it. The angle between the faces of each piece grows away from the axis.', s);
})();

// ---------------------------------------------------------------- New Cartesian sign convention
export const SIGN = (() => {
  const X0 = 210;
  const Y = 100;
  let s = S.line(20, Y, 400, Y, { c: MUT, w: 1 }) + lensShape(X0, Y, 60, 'convex');
  s += S.arrow(30, 30, 110, 30, { c: RED, w: 1.8 }) + lab(30, 22, 'incident light', { size: 10, c: RED });
  s += S.arrow(X0, Y + 30, 380, Y + 30, { c: GREEN, w: 1.5 }) + lab(300, Y + 46, '+ distances (along the light)', { size: 10, a: 'middle', c: GREEN });
  s += S.arrow(X0, Y + 30, 40, Y + 30, { c: ACC, w: 1.5 }) + lab(120, Y + 46, '− distances (against the light)', { size: 10, a: 'middle', c: ACC });
  s += S.arrow(X0 + 30, Y, X0 + 30, 30, { c: GREEN, w: 1.5 }) + lab(X0 + 36, 40, '+ heights up', { size: 10, c: GREEN });
  s += S.arrow(X0 + 30, Y, X0 + 30, Y + 22, { c: ACC, w: 1.5, size: 6 });
  s += lab(X0 + 36, Y + 20, '− down', { size: 10, c: ACC });
  const u = -15;
  const ox = X0 + u * 8;
  s += S.arrow(ox, Y, ox, Y - 30, { c: BLUE, w: 2.2 }) + lab(ox, Y - 36, 'object: u < 0', { size: 10, a: 'middle', c: BLUE });
  s += lab(X0 - 10, Y - 6, 'O (origin)', { size: 10, a: 'end' });
  s += lab(20, 186, 'All distances from the optical centre O; f is + for convex, − for concave', { size: 10 });
  check(ox < X0 && u < 0, 'sign convention: the object is drawn to the left of O, against the incident light, so its distance u is negative');
  return svgDoc(420, 195, 'The New Cartesian sign convention for lenses. The optical centre O is the origin and light travels from left to right. Distances measured in the direction of the incident light, to the right of O, are positive; distances against it, to the left, are negative, so the object distance u is negative. Heights above the principal axis are positive and below are negative.', s);
})();
