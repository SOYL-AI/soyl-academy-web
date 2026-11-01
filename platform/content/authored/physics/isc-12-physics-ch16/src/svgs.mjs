// ISC ch16 diagrams: the simple microscope with the image at D and at infinity, the compound microscope with the final
// image at D and at infinity, the refracting astronomical telescope in normal adjustment and with the image at D, a
// Cassegrain reflecting telescope, chromatic aberration of a lens against a mirror, and the cone of light that fixes the
// resolving power of a microscope objective.
// Every instrument is drawn to scale along the axis with a paraxial ray tracer (thin lens: the slope changes by −y/f;
// mirror: the ray turns back and is bent by y/f), so the drawn rays obey the same rules as the formulas. The self-checks
// (SELF_CHECKS) confirm the lens equation at each lens, that the traced rays (or their backward extensions) meet at the
// images found from the formulas, and that the angular magnification read off the drawn rays equals the formula
// (β/α = 1 + D/f, D/f, m_o(1 + D/f_e), m_o D/f_e, f_o/f_e, (f_o/f_e)(1 + f_e/D), F/f_e). Vertical scales are enlarged and
// angles exaggerated (paraxial rays: image positions do not depend on the vertical scale).
// The thin-lens symbol, ray and arrow helpers are adapted from the author's ISC ch15 and CBSE 12 Physics ch09 code
// (copied, not imported).
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const IMG = 'var(--diagram-blue)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const deg = (r) => (r * 180) / Math.PI;
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

/** Least distance of distinct vision used throughout (cm). */
export const D = 25;

// ================================================================ physics (New Cartesian: light from left to right)
/** Thin lens: 1/v − 1/u = 1/f; m = v/u. */
export const lensImage = (u, f) => {
  const v = 1 / (1 / f + 1 / u);
  return { v, m: v / u };
};
/** Object distance (negative) for which a lens of focal length f puts the image at v. */
export const objectFor = (v, f) => 1 / (1 / v - 1 / f);
/** Simple microscope: magnifying power with the image at D and at infinity. */
export const simpleM = (f, d = D) => ({ atD: 1 + d / f, atInf: d / f });
/** Compound microscope: object at uo (< 0) before the objective. */
export function compound({ fo, uo, fe, d = D }) {
  const o = lensImage(uo, fo);
  const mo = o.v / -uo; // magnitude of the objective's linear magnification
  const ueD = objectFor(-d, fe); // eyepiece object distance for the image at D
  return { vo: o.v, mo, ueD, MD: mo * (1 + d / fe), Minf: mo * (d / fe), sepD: o.v - ueD, sepInf: o.v + fe };
}
/** Refracting telescope. */
export function telescope({ fo, fe, d = D }) {
  const ueD = objectFor(-d, fe);
  return { Mn: fo / fe, Ln: fo + fe, ueD, MD: (fo / fe) * (1 + fe / d), LD: fo - ueD };
}
/** Minimum resolvable separation d = λ/(2 n sin β) of a microscope objective. */
export const dmin = (lambda, n, beta) => lambda / (2 * n * Math.sin(beta));

/**
 * Paraxial ray trace through elements met in order. elems: { x, kind: 'lens' | 'mirror', f } (lens f > 0 converging;
 * mirror f > 0 concave, f < 0 convex). A ray is (x, y, slope s = dy/dx, dir = ±1).
 * Thin lens: s → s − dir·y/f. Mirror: s → −s + dir·y/f, and dir reverses.
 */
export function traceRay(p0, s0, elems) {
  let [x, y] = p0;
  let s = s0;
  let dir = 1;
  const pts = [[x, y]];
  for (const e of elems) {
    y += s * (e.x - x);
    x = e.x;
    pts.push([x, y]);
    if (e.kind === 'lens') s -= (dir * y) / e.f;
    else {
      s = -s + (dir * y) / e.f;
      dir = -dir;
    }
  }
  return { pts, x, y, s, dir };
}
/** Final image of the point (x0, h): crossing of two traced rays (parallel to the axis and through the first pole). */
export function systemImage(x0, h, elems) {
  const a = traceRay([x0, h], 0, elems);
  const b = traceRay([x0, h], -h / (elems[0].x - x0), elems);
  if (Math.abs(a.s - b.s) < 1e-14) return { x: Infinity, h: Infinity, m: Infinity, real: false, dir: a.dir, s: a.s };
  const X = (b.y - a.y + a.s * a.x - b.s * b.x) / (a.s - b.s);
  const Y = a.y + a.s * (X - a.x);
  return { x: X, h: Y, m: Y / h, real: (X - a.x) * a.dir > 0, dir: a.dir };
}
const L = (x, f) => ({ x, kind: 'lens', f });
const M = (x, f) => ({ x, kind: 'mirror', f });
export { L, M };

// ================================================================ drawing helpers
function angleArc(cx, cy, rr, a1, a2, c = 'currentColor') {
  const sweep = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) < Math.PI ? 1 : 0;
  const p1 = [cx + rr * Math.cos(a1), cy + rr * Math.sin(a1)];
  const p2 = [cx + rr * Math.cos(a2), cy + rr * Math.sin(a2)];
  return S.path(`M${f1(p1[0])} ${f1(p1[1])} A${rr} ${rr} 0 0 ${sweep} ${f1(p2[0])} ${f1(p2[1])}`, { w: 1, c });
}
/** Ray polyline (screen points) with an arrowhead on each long segment. */
function rayPath(pts, { c = RAY, w = 1.6 } = {}) {
  let s = S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c, w, join: 'round' });
  for (let k = 0; k + 1 < pts.length; k++) if (Math.hypot(pts[k + 1][0] - pts[k][0], pts[k + 1][1] - pts[k][1]) > 26) s += S.midHead(...pts[k], ...pts[k + 1], { c, size: 6 });
  return s;
}
/** Thin-lens symbol (converging) at screen x, centred on the axis y, half-height `half`. */
function lensSym(X, Y, half) {
  const b = Math.min(12, 4 + half * 0.12);
  return S.path(`M${f1(X)} ${f1(Y - half)} Q${f1(X + b)} ${f1(Y)} ${f1(X)} ${f1(Y + half)} Q${f1(X - b)} ${f1(Y)} ${f1(X)} ${f1(Y - half)} Z`, { fill: FILL, w: 1.5 });
}
/** Object or image arrow from the axis (screen X, axis Y0) to the tip at screen Y1. */
function arrowObj(X, Y0, Y1, { c = 'currentColor', dash, tip, foot, size = 8, tipDx = 6 } = {}) {
  const up = Y1 < Y0;
  const len = Math.abs(Y1 - Y0);
  const hs = Math.min(size, len * 0.8);
  let s = S.line(X, Y0, X, Y1 + (up ? hs * 0.7 : -hs * 0.7), { c, w: 2, dash }) + S.head(X, Y1, up ? -Math.PI / 2 : Math.PI / 2, { c, size: hs });
  if (tip) s += lab(X + tipDx, Y1 + (up ? 4 : 10), tip, { c, size: 10 });
  if (foot) s += lab(X - 4, Y0 + (up ? 13 : -5), foot, { c, a: 'end', size: 10 });
  return s;
}
/** A small eye looking towards the left, centred at (x, y). */
function eye(x, y, r = 9) {
  return S.path(`M${f1(x - r)} ${f1(y)} Q${f1(x)} ${f1(y - r * 0.9)} ${f1(x + r)} ${f1(y)} Q${f1(x)} ${f1(y + r * 0.9)} ${f1(x - r)} ${f1(y)} Z`, { w: 1.2, fill: FILL }) + S.circle(x - r * 0.35, y, r * 0.32, { fill: 'currentColor', sw: 0 });
}
/** Self-check: every traced ray (or its backward extension) passes through the image point. */
function meetsAt(name, traces, im) {
  const miss = Math.max(...traces.map((t) => Math.abs(t.y + t.s * (im.x - t.x) - im.h)));
  check(miss < 1e-9, `${name}: all ${traces.length} traced rays meet at x = ${im.x.toFixed(2)}, height ${im.h.toFixed(3)} (miss ${miss.toExponential(1)})`);
}

/**
 * A lens instrument drawn to scale along the axis. o: { lenses: [{ x, f, half, name }], rays: [{ p0, s, endX }],
 * xmin, xmax, ymin, ymax (world, cm), sx, sy (px per cm), marks: [[x, label]], back: { x, h } (dashed backward extension
 * of the final rays), objects: [{ x, h, ... arrow options }], extra(X, Y, traces) → svg, notes: [lines], label }.
 */
function instrument(o) {
  const padL = 14;
  const top = 26;
  const W = Math.round((o.xmax - o.xmin) * o.sx + 2 * padL);
  const Y0 = top + o.ymax * o.sy;
  const notes = o.notes ?? [];
  const H = Math.round(Y0 - o.ymin * o.sy + 18 + notes.length * 14);
  const X = (x) => padL + (x - o.xmin) * o.sx;
  const Y = (y) => Y0 - y * o.sy;
  let s = S.line(0, Y0, W, Y0, { c: MUT, w: 1, dash: '5 4' });
  for (const l of o.lenses) {
    s += lensSym(X(l.x), Y0, l.half * o.sy);
    if (l.name) s += lab(X(l.x), Y0 - l.half * o.sy - 6, l.name, { a: 'middle', size: 10, c: ACC });
  }
  for (const [x, name, dy] of o.marks ?? []) s += S.circle(X(x), Y0, 2.3, { fill: 'currentColor', sw: 0 }) + lab(X(x), Y0 + (dy ?? 14), name, { a: 'middle', w: 'bold', size: 10 });
  const elems = o.lenses.map((l) => L(l.x, l.f));
  const traces = o.rays.map((r) => {
    const t = traceRay(r.p0, r.s, elems);
    const pts = [...t.pts, [r.endX, t.y + t.s * (r.endX - t.x)]];
    s += rayPath(pts.map(([x, y]) => [X(x), Y(y)]), { c: r.c ?? RAY });
    if (o.back) s += S.line(X(t.x), Y(t.y), X(o.back.x), Y(o.back.h), { c: MUT, w: 1, dash: '4 3' });
    return t;
  });
  for (const ob of o.objects ?? []) s += arrowObj(X(ob.x), Y0, Y(ob.h), ob);
  if (o.extra) s += o.extra(X, Y, traces);
  notes.forEach((line, i) => (s += lab(W / 2, H - 8 - (notes.length - 1 - i) * 14, line, { a: 'middle', size: 10, c: i === notes.length - 1 && o.mutedLast ? MUT : 'currentColor' })));
  return { svg: svgDoc(W, H, o.label, s), traces, X, Y };
}

// ================================================================ t01 simple microscope, image at D: f = 12.5 cm
export const SD_DATA = { f: 12.5, h: 1 };
export const SIMPLE_D = (() => {
  const { f, h } = SD_DATA;
  const u = objectFor(-D, f);
  const im = lensImage(u, f);
  const d = instrument({
    lenses: [{ x: 0, f, half: 3.2, name: 'convex lens' }],
    rays: [{ p0: [u, h], s: 0, endX: 15 }, { p0: [u, h], s: -h / -u, endX: 15 }],
    xmin: -28, xmax: 16, ymin: -1.6, ymax: 3.6, sx: 9, sy: 24,
    marks: [[-f, 'F₁'], [f, 'F₂']],
    back: { x: im.v, h: im.m * h },
    objects: [{ x: u, h, tip: 'A', foot: 'B' }, { x: im.v, h: im.m * h, c: IMG, dash: '4 3', tip: 'A′', foot: 'B′' }],
    extra: (X, Y) => {
      let s = eye(X(3.2), Y(0), 8);
      s += angleArc(X(0), Y(0), 30, Math.PI, Math.atan2(Y(im.m * h) - Y(0), X(im.v) - X(0)), GRN) + lab(X(0) - 40, Y(0) - 8, 'β', { it: true, c: GRN });
      s += S.line(X(0), Y(0), X(im.v), Y(im.m * h), { c: GRN, w: 1, dash: '2 3' });
      s += S.line(X(im.v), Y(0) + 22, X(0), Y(0) + 22, { c: MUT, w: 1 }) + lab((X(im.v) + X(0)) / 2, Y(0) + 34, 'D = 25 cm', { a: 'middle', size: 10, c: MUT });
      return s;
    },
    notes: ['f = 12.5 cm, u = −8.33 cm → v = −25 cm (image at D)', 'M = β/α = 1 + D/f = 3', 'eye close to the lens; vertical scale enlarged'],
    mutedLast: true,
    label: 'Simple microscope with the image at the least distance of distinct vision: an object AB inside the focus of a convex lens of focal length 12.5 centimetres, 8.33 centimetres from it, sends rays that leave the lens diverging; traced back they meet 25 centimetres in front of the lens at a virtual, erect image three times as tall, which subtends the angle beta at the eye held close to the lens',
  });
  meetsAt('simple microscope at D', d.traces, { x: im.v, h: im.m * h });
  const beta = (im.m * h) / D; // angle subtended at the eye (at the lens) by the image at D
  const alpha = h / D; // object at D, unaided eye
  check(close(1 / im.v - 1 / u, 1 / f) && close(im.v, -D) && close(beta / alpha, 1 + D / f) && close(im.m, 3) && close(beta, h / -u), `simple microscope at D: lens equation gives v = ${im.v.toFixed(2)} cm; β/α = ${(beta / alpha).toFixed(3)} = 1 + D/f = m`);
  return d.svg;
})();

// ================================================================ t01 simple microscope, image at infinity (object at F); same object at D for α
export const SINF = (() => {
  const { f, h } = SD_DATA;
  const d = instrument({
    lenses: [{ x: 0, f, half: 3.2, name: 'convex lens' }],
    rays: [{ p0: [-f, h], s: 0, endX: 15 }, { p0: [-f, h], s: -h / f, endX: 15 }, { p0: [-f, h], s: -h * 1.6 / f, endX: 15 }],
    xmin: -28, xmax: 16, ymin: -1.6, ymax: 2.2, sx: 9, sy: 26,
    marks: [[f, 'F₂']],
    objects: [{ x: -f, h, tip: 'A', foot: 'F₁' }, { x: -D, h, c: MUT, dash: '3 3', tip: 'object at D', tipDx: 6 }],
    extra: (X, Y) => {
      let s = eye(X(3.2), Y(0), 8);
      // α: angle of the object at D (unaided eye at the lens position); β: angle of the object at F
      s += S.line(X(-D), Y(h), X(0), Y(0), { c: MUT, w: 1, dash: '2 3' });
      s += angleArc(X(0), Y(0), 46, Math.PI, Math.atan2(Y(h) - Y(0), X(-D) - X(0)), MUT) + lab(X(0) - 60, Y(0) + 12, 'α', { it: true, c: MUT });
      s += angleArc(X(0), Y(0), 26, Math.PI, Math.atan2(Y(h) - Y(0), X(-f) - X(0)), GRN) + lab(X(0) - 34, Y(0) - 10, 'β', { it: true, c: GRN });
      return s;
    },
    notes: ['object at F₁: rays leave parallel, image at infinity', 'β = h/f, α = h/D, M = D/f = 2', 'relaxed eye; vertical scale enlarged'],
    mutedLast: true,
    label: 'Simple microscope with the image at infinity: the object is placed at the first focus of a convex lens of focal length 12.5 centimetres, so all rays from its tip leave the lens parallel to one another and the relaxed eye sees the image at infinity; the object subtends angle beta at the lens, twice the angle alpha that it subtends when held at 25 centimetres from the unaided eye',
  });
  const slopes = d.traces.map((t) => t.s);
  const beta = -slopes[0];
  const alpha = h / D;
  check(slopes.every((sv) => close(sv, -h / f)) && close(beta / alpha, D / f) && close(D / f, 2), `simple microscope at infinity: all ${slopes.length} rays leave with slope −h/f; β/α = ${(beta / alpha).toFixed(3)} = D/f`);
  return d.svg;
})();

// ================================================================ t02 compound microscope, final image at D
export const CD_DATA = { fo: 1.5, uo: -1.8, fe: 6.25, h: 0.4 };
export const COMPOUND_D = (() => {
  const { fo, uo, fe, h } = CD_DATA;
  const c = compound({ fo, uo, fe });
  const xe = c.sepD;
  const elems = [L(0, fo), L(xe, fe)];
  const fin = systemImage(uo, h, elems);
  const I1 = lensImage(uo, fo);
  const d = instrument({
    lenses: [{ x: 0, f: fo, half: 1.1, name: 'objective' }, { x: xe, f: fe, half: 4.0, name: 'eyepiece' }],
    rays: [{ p0: [uo, h], s: 0, endX: 19 }, { p0: [uo, h], s: -h / -uo, endX: 19 }],
    xmin: -12.5, xmax: 19.5, ymin: -10.6, ymax: 4.8, sx: 12.5, sy: 11,
    marks: [[-fo, 'Fo', 14], [fo, 'Fo′', 14], [xe - fe, 'Fe', 14]],
    back: { x: fin.x, h: fin.h },
    objects: [
      { x: uo, h, tip: 'A', foot: '', size: 5, tipDx: -12 },
      { x: I1.v, h: I1.m * h, c: IMG, tip: 'A′', foot: '' },
      { x: fin.x, h: fin.h, c: IMG, dash: '4 3', tip: 'A″ (final image)', foot: '' },
    ],
    extra: (X, Y) => eye(X(xe) + 16, Y(0), 8) + S.line(X(fin.x), Y(0) + 26, X(xe), Y(0) + 26, { c: MUT, w: 1 }) + lab((X(fin.x) + X(xe)) / 2, Y(0) + 38, 'D = 25 cm from the eyepiece', { a: 'middle', size: 10, c: MUT }),
    notes: ['objective: fo = 1.5 cm, uo = −1.8 cm → vo = 9.0 cm, mo = 5', 'eyepiece: fe = 6.25 cm, ue = −5.0 cm → image at D, me = 5', 'M = mo × me = 25; lenses 14 cm apart', 'vertical scale enlarged'],
    mutedLast: true,
    label: 'Compound microscope with the final image at the least distance of distinct vision: a small object AB just outside the focus Fo of the objective of focal length 1.5 centimetres forms a real, inverted, five times enlarged image A′B′ 9 centimetres beyond it; this image lies inside the focus Fe of the eyepiece of focal length 6.25 centimetres, 14 centimetres from the objective, which acts as a magnifier and forms a virtual, inverted final image 25 times the size of the object, 25 centimetres in front of the eyepiece',
  });
  meetsAt('compound microscope: first image', d.traces.map((t) => ({ x: t.pts[1][0], y: t.pts[1][1], s: (t.pts[2][1] - t.pts[1][1]) / (t.pts[2][0] - t.pts[1][0]) })), { x: I1.v, h: I1.m * h });
  meetsAt('compound microscope: final image (backward extensions)', d.traces, { x: fin.x, h: fin.h });
  const beta = Math.abs(fin.h) / D;
  const alpha = h / D;
  check(close(c.vo, 9) && close(c.mo, 5) && close(-c.ueD, 5) && -c.ueD < fe && close(xe - fin.x, D) && !fin.real, `compound microscope at D: vo = ${c.vo.toFixed(2)} cm, I₁ ${(-c.ueD).toFixed(2)} cm inside fe = ${fe} cm, final virtual image ${(xe - fin.x).toFixed(2)} cm from the eyepiece`);
  check(close(beta / alpha, c.MD) && close(c.MD, 25) && fin.m < 0, `compound microscope at D: β/α = ${(beta / alpha).toFixed(3)} = (vo/|uo|)(1 + D/fe) = ${c.MD.toFixed(3)}; final image inverted`);
  return d.svg;
})();

// ================================================================ t02 compound microscope, final image at infinity (expression only)
export const COMPOUND_INF = (() => {
  const { fo, uo, fe, h } = CD_DATA;
  const c = compound({ fo, uo, fe });
  const xe = c.sepInf;
  const I1 = lensImage(uo, fo);
  const d = instrument({
    lenses: [{ x: 0, f: fo, half: 1.1, name: 'objective' }, { x: xe, f: fe, half: 3.8, name: 'eyepiece' }],
    rays: [{ p0: [uo, h], s: 0, endX: 21 }, { p0: [uo, h], s: -h / -uo, endX: 21 }],
    xmin: -3, xmax: 21.5, ymin: -3.6, ymax: 4.6, sx: 16, sy: 20,
    marks: [[-fo, 'Fo', 14], [fo, 'Fo′', 14], [xe - fe, 'Fe', -6]],
    objects: [{ x: uo, h, tip: 'A', size: 5, tipDx: -12 }, { x: I1.v, h: I1.m * h, c: IMG, tip: 'A′ (at Fe)', tipDx: -62 }],
    extra: (X, Y) => eye(X(xe) + 30, Y(0), 8),
    notes: ['A′B′ at the focus of the eyepiece: rays leave parallel', 'final image at infinity; M = (vo/|uo|)(D/fe) = 5 × 4 = 20', 'lenses vo + fe = 15.25 cm apart'],
    label: 'Compound microscope set for a relaxed eye: the eyepiece is moved out until the first image A′B′ formed by the objective lies exactly at its focus Fe, so the rays from each point leave the eyepiece parallel and the final image is at infinity; with the same lenses the magnifying power falls from 25 to 20',
  });
  const exit = d.traces.map((t) => t.s);
  const beta = Math.abs(exit[0]);
  const alpha = h / D;
  check(close(exit[0], exit[1]) && close(I1.v + fe, xe) && close(beta / alpha, c.Minf) && close(c.Minf, 20), `compound microscope at infinity: rays leave parallel (slope ${exit[0].toFixed(4)}); β/α = ${(beta / alpha).toFixed(3)} = (vo/|uo|)(D/fe); separation ${xe.toFixed(2)} cm`);
  return d.svg;
})();

// ================================================================ t03 refracting telescope, normal adjustment: fo = 80 cm, fe = 8.0 cm
export const TEL_DATA = { fo: 80, fe: 8, alpha: 0.02, alphaD: 0.012 };
export const TELE_INF = (() => {
  const { fo, fe, alpha } = TEL_DATA;
  const xe = fo + fe;
  const ys = [1.6, 0, -1.6];
  const d = instrument({
    lenses: [{ x: 0, f: fo, half: 2.1, name: 'objective (fo)' }, { x: xe, f: fe, half: 2.5, name: 'eyepiece (fe)' }],
    rays: ys.map((y) => ({ p0: [-14, y + alpha * 14], s: -alpha, endX: 104 })),
    xmin: -14, xmax: 106, ymin: -3.4, ymax: 2.4, sx: 3.5, sy: 26,
    marks: [[fo, '', 14]],
    objects: [{ x: fo, h: -alpha * fo, c: IMG, tip: 'I (at Fo and Fe)', tipDx: -84 }],
    extra: (X, Y) => {
      let s = angleArc(X(0), Y(0), 40, Math.PI, Math.atan2(Y(alpha * 14) - Y(0), X(-14) - X(0)), GRN) + lab(X(0) - 48, Y(0) - 3, 'α', { it: true, c: GRN });
      // construction line from I through the eyepiece centre: the direction of every emerging ray
      const bx = 104;
      const by = ((alpha * fo) / fe) * (bx - xe);
      s += S.line(X(fo), Y(-alpha * fo), X(bx), Y(by), { c: GRN, w: 1, dash: '3 3' });
      s += angleArc(X(xe), Y(0), 30, 0, Math.atan2(Y(by) - Y(0), X(bx) - X(xe)), GRN) + lab(X(xe) + 34, Y(0) - 6, 'β', { it: true, c: GRN });
      s += eye(X(xe) + 52, Y(0) + 28, 8);
      s += S.line(X(0), Y(0) + 70, X(xe), Y(0) + 70, { c: MUT, w: 1 }) + lab(X(xe / 2), Y(0) + 82, 'L = fo + fe = 88 cm', { a: 'middle', size: 10, c: MUT });
      return s;
    },
    notes: ['parallel light at α → image I in the common focal plane', '→ parallel light at β; M = β/α = fo/fe = 10', 'angles exaggerated; vertical scale enlarged'],
    mutedLast: true,
    label: 'Astronomical telescope in normal adjustment: parallel rays from the top of a distant object arrive at a small angle alpha, and the objective of focal length 80 centimetres brings them to an inverted image I in its focal plane; the eyepiece of focal length 8 centimetres is placed 88 centimetres from the objective so that I is also at its focus, and the rays leave parallel at the larger angle beta, ten times alpha',
  });
  const exit = d.traces.map((t) => t.s);
  const atFocal = d.traces.map((t) => t.pts[1][1] + ((t.pts[2][1] - t.pts[1][1]) / (t.pts[2][0] - t.pts[1][0])) * (fo - t.pts[1][0]));
  check(atFocal.every((y) => close(y, -alpha * fo)), `telescope (normal adjustment): the objective brings the parallel rays to I at height ${(-alpha * fo).toFixed(2)} cm in its focal plane`);
  check(exit.every((sv) => close(sv, exit[0])) && close(exit[0] / alpha, fo / fe) && close(fo / fe, 10), `telescope (normal adjustment): all rays leave parallel at β = ${exit[0].toFixed(3)}; β/α = ${(exit[0] / alpha).toFixed(3)} = fo/fe; L = ${xe} cm`);
  return d.svg;
})();

// ================================================================ t03 refracting telescope, final image at D
export const TELE_D = (() => {
  const { fo, fe, alphaD: alpha } = TEL_DATA;
  const t = telescope({ fo, fe });
  const xe = t.LD;
  const ys = [1.2, 0, -1.2];
  const elems = [L(0, fo), L(xe, fe)];
  const tr = ys.map((y) => traceRay([-14, y + alpha * 14], -alpha, elems));
  // final image: crossing of the backward extensions of the emerging rays
  const [a, b] = [tr[0], tr[2]];
  const fx = (b.y - a.y + a.s * a.x - b.s * b.x) / (a.s - b.s);
  const fh = a.y + a.s * (fx - a.x);
  const d = instrument({
    lenses: [{ x: 0, f: fo, half: 1.6, name: 'objective' }, { x: xe, f: fe, half: 2.2, name: 'eyepiece' }],
    rays: ys.map((y) => ({ p0: [-14, y + alpha * 14], s: -alpha, endX: 100 })),
    xmin: -14, xmax: 101, ymin: -4.6, ymax: 1.8, sx: 3.6, sy: 24,
    back: { x: fx, h: fh },
    objects: [{ x: fo, h: -alpha * fo, c: IMG, tip: 'I', tipDx: -12 }, { x: fx, h: fh, c: IMG, dash: '4 3', tip: 'final image at D', tipDx: -50 }],
    extra: (X, Y) => {
      let s = angleArc(X(0), Y(0), 40, Math.PI, Math.atan2(Y(alpha * 14) - Y(0), X(-14) - X(0)), GRN) + lab(X(0) - 48, Y(0) - 3, 'α', { it: true, c: GRN });
      s += S.line(X(xe), Y(0), X(fx), Y(fh), { c: GRN, w: 1, dash: '2 3' });
      s += angleArc(X(xe), Y(0), 28, Math.PI, Math.atan2(Y(fh) - Y(0), X(fx) - X(xe)), GRN) + lab(X(xe) - 38, Y(0) + 20, 'β', { it: true, c: GRN });
      s += eye(X(xe) + 14, Y(0), 7);
      return s;
    },
    notes: ['I is 6.06 cm in front of the eyepiece, inside fe = 8.0 cm', 'final image 25 cm away; M = (fo/fe)(1 + fe/D) = 13.2', 'lenses 86.06 cm apart; angles exaggerated'],
    mutedLast: true,
    label: 'Astronomical telescope with the final image at the least distance of distinct vision: the objective forms an inverted image I of a distant object in its focal plane; the eyepiece is pushed in to 86.06 centimetres from the objective so that I lies just inside its focus, and the emerging rays diverge as if from a large virtual image 25 centimetres in front of the eyepiece, which subtends an angle beta 13.2 times alpha at the eye',
  });
  const im = lensImage(-(xe - fo), fe);
  const beta = Math.abs(fh) / D;
  check(close(xe - fx, D) && close(im.v, -D) && close(fh, -alpha * fo * im.m), `telescope at D: eyepiece equation with u = −${(xe - fo).toFixed(3)} cm gives v = ${im.v.toFixed(3)} cm; the backward extensions meet there, height ${fh.toFixed(3)}`);
  check(close(beta / alpha, t.MD) && close(t.MD, 13.2) && close(xe, fo + 200 / 33), `telescope at D: β/α = ${(beta / alpha).toFixed(3)} = (fo/fe)(1 + fe/D); L = ${xe.toFixed(2)} cm`);
  meetsAt('telescope at D: backward extensions', tr, { x: fx, h: fh });
  return d.svg;
})();

// ================================================================ t04 Cassegrain reflecting telescope (image at infinity)
export const CASS_DATA = { fp: 60, xp: 60, xs: 15, fs: -20, fe: 4 };
export function cassegrain({ fp, xp, xs, fs, fe }) {
  // primary focus fp in front of the primary; secondary (xp − xs) in front of the primary
  const p = fp - (xp - xs); // virtual object for the secondary, p behind it (towards the primary)
  const q = 1 / (1 / fs + 1 / p); // mirror formula, real-is-positive form with a virtual object: 1/q = 1/f + 1/p
  const ms = q / p; // magnification by the secondary
  const F = fp * ms;
  const focusX = xs + q; // final focus, measured along the returning light
  return { p, q, ms, F, focusX, behind: focusX - xp, xe: focusX + fe, M: F / fe };
}
export const CASS = (() => {
  const cd = CASS_DATA;
  const c = cassegrain(cd);
  const elems = [M(cd.xp, cd.fp), M(cd.xs, cd.fs), L(c.xe, cd.fe)];
  const xmin = -4;
  const xmax = 90;
  const sx = 4.5;
  const sy = 9;
  const padL = 14;
  const W = Math.round((xmax - xmin) * sx + 2 * padL);
  const Y0 = 26 + 10.5 * sy;
  const X = (x) => padL + (x - xmin) * sx;
  const Y = (y) => Y0 - y * sy;
  const sagP = (y) => 0.9 * (y / 9) ** 2; // drawn sag of the primary (exaggerated; rays use the paraxial plane)
  const sagS = (y) => 0.5 * (y / 2.6) ** 2;
  let s = S.line(0, Y0, W, Y0, { c: MUT, w: 1, dash: '5 4' });
  // primary with a central hole
  for (const sg of [1, -1]) {
    const pts = [];
    for (let y = 0.9; y <= 9.001; y += 0.3) pts.push([X(cd.xp - sagP(y)), Y(sg * y)]);
    s += S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c: ACC, w: 3 });
    for (let y = 1.6; y <= 9; y += 1.1) s += S.line(X(cd.xp - sagP(y)) + 2, Y(sg * y), X(cd.xp - sagP(y)) + 7, Y(sg * (y - 0.5)), { c: MUT, w: 1 });
  }
  // secondary (convex towards the primary)
  const sp = [];
  for (let y = -2.6; y <= 2.601; y += 0.2) sp.push([X(cd.xs - sagS(y)), Y(y)]);
  s += S.path('M' + sp.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c: ACC, w: 3 });
  s += lensSym(X(c.xe), Y0, 1.6 * sy);
  // rays: four of an on-axis parallel bundle, outside the secondary's shadow
  const ys = [7.5, 4.2, -4.2, -7.5];
  const traces = ys.map((y) => traceRay([xmin, y], 0, elems));
  for (const t of traces) {
    const [p0, pP, pS, pE] = t.pts;
    const hitP = [cd.xp - sagP(pP[1]), pP[1]];
    const hitS = [cd.xs - sagS(pS[1]), pS[1]];
    s += rayPath([[X(p0[0]), Y(p0[1])], [X(hitP[0]), Y(hitP[1])]]);
    s += rayPath([[X(hitP[0]), Y(hitP[1])], [X(hitS[0]), Y(hitS[1])]], { c: GRN });
    s += rayPath([[X(hitS[0]), Y(hitS[1])], [X(pE[0]), Y(pE[1])], [X(xmax - 1), Y(t.y + t.s * (xmax - 1 - t.x))]], { c: IMG, w: 1.3 });
  }
  s += S.circle(X(c.focusX), Y0, 2.3, { fill: 'currentColor', sw: 0 }) + lab(X(c.focusX), Y0 + 14, 'F', { a: 'middle', w: 'bold', size: 10 });
  s += eye(X(c.xe) + 22, Y0, 7);
  s += lab(X(cd.xp) - 4, Y(9) - 8, 'primary (concave, paraboloidal)', { a: 'middle', size: 10, c: ACC });
  s += lab(X(cd.xs), Y(2.6) - 8, 'secondary (convex)', { a: 'middle', size: 10, c: ACC });
  s += lab(X(c.xe) + 2, Y(1.6) - 6, 'eyepiece', { a: 'start', size: 10, c: ACC });
  s += lab(X(cd.xp) + 10, Y0 + 30, 'hole', { size: 10, c: MUT });
  s += lab(8, Y(9.6), 'light from a distant star', { size: 10 });
  const H = Math.round(Y(-10.5) + 40);
  s += lab(W / 2, H - 22, 'primary f = 60 cm; secondary f = −20 cm, 45 cm in front; F = 240 cm; fe = 4.0 cm → M = F/fe = 60', { a: 'middle', size: 10 });
  s += lab(W / 2, H - 8, 'image at infinity; mirror curvature and vertical scale exaggerated', { a: 'middle', size: 10, c: MUT });
  // checks
  const hitAxis = traces.map((t) => t.pts[2][0] - t.pts[2][1] / ((t.pts[3][1] - t.pts[2][1]) / (t.pts[3][0] - t.pts[2][0])));
  check(hitAxis.every((x) => close(x, c.focusX)) && close(c.behind, 15), `Cassegrain: after the secondary every ray crosses the axis at x = ${c.focusX.toFixed(2)} cm, ${c.behind.toFixed(2)} cm behind the primary`);
  const atHole = Math.max(...traces.map((t) => Math.abs(t.pts[2][1] + ((t.pts[3][1] - t.pts[2][1]) / (t.pts[3][0] - t.pts[2][0])) * (cd.xp - t.pts[2][0]))));
  const atSec = Math.max(...traces.map((t) => Math.abs(t.pts[2][1])));
  check(atHole < 0.9 && atSec < 2.6 && Math.min(...ys.map(Math.abs)) > 2.6, `Cassegrain: the returning beam passes the hole (radius 0.9, beam ${atHole.toFixed(2)}), the cone fits the secondary (half-height 2.6, cone ${atSec.toFixed(2)}), and the drawn rays miss the secondary on the way in`);
  const Fdrawn = traces.map((t) => Math.abs(t.pts[0][1] / ((t.pts[3][1] - t.pts[2][1]) / (t.pts[3][0] - t.pts[2][0]))));
  check(Fdrawn.every((F) => close(F, c.F)) && close(c.F, 240) && traces.every((t) => Math.abs(t.s) < 1e-12), `Cassegrain: effective focal length (entry height ÷ final convergence) = ${c.F.toFixed(2)} cm = fp × ms; the eyepiece at the focus + fe sends the beam out parallel`);
  const a0 = 1e-3;
  const off = [6, -6].map((y) => traceRay([xmin, y], a0, elems));
  check(close(off[0].s, off[1].s) && close(Math.abs(off[0].s) / a0, c.M) && close(c.M, 60), `Cassegrain: an off-axis bundle at α leaves parallel at β; β/α = ${(Math.abs(off[0].s) / a0).toFixed(3)} = F/fe`);
  return svgDoc(W, H, 'Cassegrain reflecting telescope: parallel light from a distant star passes the small secondary mirror and strikes the large concave paraboloidal primary mirror, which reflects it towards its focus; before reaching that focus the light meets the small convex secondary mirror, which sends it back through a hole in the centre of the primary to a focus F 15 centimetres behind it; the eyepiece placed beyond F sends the light out parallel to the eye, so the final image is at infinity', s);
})();

// ================================================================ t04 chromatic aberration: a lens against a mirror
export const CHROMA_DATA = { R: 30, nBlue: 1.6, nRed: 1.5, Rm: 60 };
export const CHROMA = (() => {
  const { R, nBlue, nRed, Rm } = CHROMA_DATA;
  const fB = R / (2 * (nBlue - 1));
  const fR = R / (2 * (nRed - 1));
  const fM = Rm / 2;
  const k = 5;
  const W = 450;
  const ay = 96;
  let s = S.line(0, ay, 222, ay, { c: MUT, w: 1, dash: '5 4' }) + S.line(234, ay, W, ay, { c: MUT, w: 1, dash: '5 4' });
  s += S.line(228, 14, 228, 186, { c: MUT, w: 1 });
  // left: lens at x = 36
  const xl = 36;
  s += lensSym(xl, ay, 46);
  for (const y of [34, -34]) {
    s += S.line(4, ay - y, xl, ay - y, { c: 'currentColor', w: 1.5 });
    for (const [f, c] of [[fB, IMG], [fR, RAY]]) {
      const xEnd = xl + 182;
      const slope = -y / (f * k);
      s += S.line(xl, ay - y, xEnd, ay - (y + slope * (xEnd - xl)), { c, w: 1.4 });
    }
  }
  s += S.circle(xl + fB * k, ay, 2.6, { fill: IMG, sw: 0 }) + lab(xl + fB * k, ay + 16, 'F (blue)', { a: 'end', size: 10, c: IMG });
  s += S.circle(xl + fR * k, ay, 2.6, { fill: RAY, sw: 0 }) + lab(xl + fR * k, ay - 8, 'F (red)', { a: 'start', size: 10, c: RAY });
  s += lab(110, 20, 'lens: colours focus apart', { a: 'middle', size: 11, w: 'bold' });
  s += lab(110, 176, 'f depends on n, and n on colour', { a: 'middle', size: 10 });
  // right: concave mirror at x = 430 facing left
  const xm = 430;
  const pts = [];
  for (let y = -52; y <= 52.01; y += 4) pts.push([xm - (y * y) / (4 * fM * k), ay - y]);
  s += S.path('M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L'), { c: ACC, w: 3 });
  for (const y of [34, -34]) {
    const hx = xm - (y * y) / (4 * fM * k);
    s += S.line(236, ay - y, hx, ay - y, { c: 'currentColor', w: 1.5 });
    const fx = xm - fM * k;
    s += S.line(hx, ay - y + 1.2, fx - 30, ay - (y + ((0 - y) / (fx - hx)) * (fx - 30 - hx)) + 1.2, { c: IMG, w: 1.4 });
    s += S.line(hx, ay - y - 1.2, fx - 30, ay - (y + ((0 - y) / (fx - hx)) * (fx - 30 - hx)) - 1.2, { c: RAY, w: 1.4 });
  }
  s += S.circle(xm - fM * k, ay, 2.8, { fill: 'currentColor', sw: 0 }) + lab(xm - fM * k, ay + 16, 'F (all colours)', { a: 'middle', size: 10 });
  s += lab(340, 20, 'mirror: one focus', { a: 'middle', size: 11, w: 'bold' });
  s += lab(340, 176, 'f = R/2 whatever the colour', { a: 'middle', size: 10 });
  s += lab(W / 2, 196, 'dispersion exaggerated (blue n = 1.6, red n = 1.5)', { a: 'middle', size: 10, c: MUT });
  check(fB < fR && close(fB, 25) && close(fR, 30) && close(fM, 30), `chromatic aberration: equiconvex R = ${R} gives f(blue) = ${fB.toFixed(2)} < f(red) = ${fR.toFixed(2)} from the lens maker’s formula; the mirror focus R/2 = ${fM} does not depend on n`);
  return svgDoc(W, 204, 'Chromatic aberration: on the left, white light parallel to the axis passes through a convex lens and the blue part is focused nearer the lens than the red part, because the refractive index of glass is larger for blue light; on the right, the same white light reflected by a concave mirror comes to a single focus for all colours, because reflection does not depend on the refractive index', s);
})();

// ================================================================ t05 resolving power: the cone of light accepted by the objective
export const RES_DATA = { a: 3.0, w: Math.sqrt(3), lambda: 550, nOil: 1.52 };
export const RESOLVE = (() => {
  const { a, w, lambda, nOil } = RES_DATA;
  const beta = Math.atan(a / w);
  const k = 30;
  const W = 440;
  const ys = 168; // slide surface (screen y)
  const ox = 150; // object point
  const ly = ys - w * k; // objective front at this height
  let s = '';
  // slide and cover
  s += S.rect(40, ys, 220, 10, { fill: FILL, sw: 1 }) + lab(266, ys + 9, 'glass slide', { size: 10 });
  // oil drop between the slide and the lens
  s += S.path(`M${f1(ox - a * k - 8)} ${f1(ys)} Q${f1(ox)} ${f1(ly - 14)} ${f1(ox + a * k + 8)} ${f1(ys)} Z`, { c: 'none', w: 0, fill: IMG, fop: 0.12 });
  // objective (front lens)
  s += S.path(`M${f1(ox - a * k - 6)} ${f1(ly)} Q${f1(ox)} ${f1(ly + 16)} ${f1(ox + a * k + 6)} ${f1(ly)} L${f1(ox + a * k + 6)} ${f1(ly - 30)} L${f1(ox - a * k - 6)} ${f1(ly - 30)} Z`, { fill: FILL, w: 1.5 });
  s += lab(ox, ly - 36, 'objective', { a: 'middle', size: 10, c: ACC });
  // cone from the object point
  s += S.line(ox, ys, ox - a * k, ly + 4, { c: RAY, w: 1.5 }) + S.line(ox, ys, ox + a * k, ly + 4, { c: RAY, w: 1.5 }) + S.line(ox, ys, ox, ly + 8, { c: MUT, w: 1, dash: '4 3' });
  s += angleArc(ox, ys, 34, -Math.PI / 2, Math.atan2(ly + 4 - ys, a * k), GRN) + lab(ox + 12, ys - 40, 'β', { it: true, c: GRN });
  // two point objects a distance d apart
  s += S.circle(ox - 5, ys - 1, 2.6, { fill: 'currentColor', sw: 0 }) + S.circle(ox + 5, ys - 1, 2.6, { fill: 'currentColor', sw: 0 });
  s += S.lead(ox + 5, ys + 3, ox + 40, ys + 26) + lab(ox + 44, ys + 30, 'two points d apart', { size: 10 });
  s += lab(ox - a * k - 18, ys - 22, 'oil, n', { a: 'end', size: 10, c: IMG });
  const dAir = dmin(lambda, 1, beta);
  const dOil = dmin(lambda, nOil, beta);
  const tx = 300;
  s += lab(tx, 34, 'smallest resolvable d:', { size: 11, w: 'bold' });
  s += lab(tx, 52, 'd = λ / (2 n sin β)', { size: 11 });
  s += lab(tx, 70, 'resolving power = 1/d', { size: 11 });
  s += lab(tx, 94, `β = ${deg(beta).toFixed(0)}°, λ = ${lambda} nm:`, { size: 10 });
  s += lab(tx, 110, `air (n = 1): d ≈ ${Math.round(dAir)} nm`, { size: 10 });
  s += lab(tx, 126, `oil (n = ${nOil}): d ≈ ${Math.round(dOil)} nm`, { size: 10 });
  s += lab(W / 2, 222, 'n sin β is the numerical aperture; drawing not to scale for d', { a: 'middle', size: 10, c: MUT });
  check(close(deg(beta), 60, 1e-6) && close(Math.round(dAir), 318) && close(Math.round(dOil), 209) && dOil < dAir, `resolving power figure: drawn cone half-angle ${deg(beta).toFixed(2)}° (radius ${a}, working distance ${w.toFixed(3)}); d = ${dAir.toFixed(1)} nm in air, ${dOil.toFixed(1)} nm in oil`);
  return svgDoc(W, 230, 'Resolving power of a microscope objective: light from two point objects on a glass slide enters the objective in a cone of half-angle beta, here 60 degrees, through a drop of immersion oil of refractive index n; the smallest separation d that can be resolved is lambda divided by twice n sine beta, about 318 nanometres in air and 209 nanometres with oil of index 1.52 for green light of 550 nanometres', s);
})();

export const ALL = { SIMPLE_D, SINF, COMPOUND_D, COMPOUND_INF, TELE_INF, TELE_D, CASS, CHROMA, RESOLVE };
