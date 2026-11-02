// Sketches of solids for ICSE 10 Mathematics ch19, drawn as geometry figures (all marked not_to_scale).
// A solid is drawn in a simple oblique view: a circle becomes an ellipse (a polyline of hidden points) whose depth is 0.3 of
// its width, and the hidden back half of a base is dashed. Proportions come from the real dimensions (radius : height), the
// labels are printed by the caller from the same exact values, so a figure never disagrees with its numbers.
import { geom } from './lib.mjs';

const r4 = (v) => Math.round(v * 1e4) / 1e4;
const must = (c, m) => { if (!c) throw new Error(m); };
const DEPTH = 0.3;

export class Cv {
  constructor() { this.P = {}; this.S = []; this.C = []; this.k = 0; }
  pt(name, x, y, label, pos) {
    must(!this.P[name], `duplicate point ${name}`);
    this.P[name] = { x, y, label, pos };
    return name;
  }
  hid(x, y) { const nm = `_${this.k++}`; this.P[nm] = { x, y, label: false }; return nm; }
  /** Point drawn without a label of its own. */
  dot(name, x, y) { return this.pt(name, x, y, false); }
  seg(a, b, o = {}) {
    const A = typeof a === 'string' ? a : this.hid(...a), B = typeof b === 'string' ? b : this.hid(...b);
    this.S.push({ from: A, to: B, ...(o.label ? { label: o.label } : {}), ...(o.dashed ? { dashed: true } : {}) });
    return [A, B];
  }
  /** Elliptical arc: parameter t0..t1 in degrees (0 = right, 90 = top, 180 = left, 270 = bottom). */
  arc(cx, cy, a, b, t0, t1, o = {}) {
    const N = Math.max(6, Math.round(Math.abs(t1 - t0) / 12));
    let prev = null;
    for (let i = 0; i <= N; i++) {
      const t = ((t0 + ((t1 - t0) * i) / N) * Math.PI) / 180;
      const nm = this.hid(cx + a * Math.cos(t), cy + b * Math.sin(t));
      if (prev) this.S.push({ from: prev, to: nm, ...(o.dashed ? { dashed: true } : {}) });
      prev = nm;
    }
  }
  /** Rim ellipse of a circular face at height y: front (lower) half solid, back half solid or dashed. */
  rim(cx, y, a, back = 'solid') {
    this.arc(cx, y, a, a * DEPTH, 180, 360);
    this.arc(cx, y, a, a * DEPTH, 0, 180, { dashed: back === 'dashed' });
  }
  /** A text label at a spot (an unlabelled helper point carrying the text). */
  text(name, x, y, label, pos = 'e') { return this.pt(name, x, y, label, pos); }
  /** Dashed radius from the axis point (cx, y) to the rim, with a label beyond the rim. */
  radius(tag, cx, y, a, label, pos = 'e') {
    const c = this.dot(`${tag}c`, cx, y), e = this.pt(`${tag}e`, cx + a, y, label, pos);
    this.seg(c, e, { dashed: true });
  }
  /** Dimension line to the right of the figure between two heights, labelled. */
  vdim(x, ya, yb, label) { this.seg([x, ya], [x, yb], { label }); }
  circle(centre, radius) { this.C.push({ centre, radius }); }
  finish(alt, caption, margin = 0.75) {
    const xs = [], ys = [];
    for (const p of Object.values(this.P)) { xs.push(p.x); ys.push(p.y); }
    for (const c of this.C) { const q = this.P[c.centre]; xs.push(q.x - c.radius, q.x + c.radius); ys.push(q.y - c.radius, q.y + c.radius); }
    const x0 = Math.min(...xs) - margin, y0 = Math.min(...ys) - margin, x1 = Math.max(...xs) + margin, y1 = Math.max(...ys) + margin;
    const points = {};
    for (const [nm, p] of Object.entries(this.P)) {
      const o = { at: [r4(p.x - x0), r4(p.y - y0)] };
      if (p.label === false) o.label = false; else if (typeof p.label === 'string') o.label = p.label;
      if (p.pos) o.label_position = p.pos;
      points[nm] = o;
    }
    const circles = this.C.map((c) => ({ center: c.centre, radius: r4(c.radius) }));
    return geom({ width: r4(x1 - x0), height: r4(y1 - y0), points, segments: this.S, circles, not_to_scale: true }, alt, caption);
  }
}

/**
 * Stack of coaxial parts from bottom to top. A part is
 *   { k: 'cyl', r, h, lh?, lr? }  { k: 'cone', r, h, ls?, lh?, lr? }  { k: 'hemiUp', r, lr? }  { k: 'hemiDown', r, lr? }
 * `lh` labels the part's height on a dimension line at the right, `lr` labels the radius at the part's lower face, `ls` the
 * slanting side of a cone. The longest dimension is drawn about 3.4 units long.
 */
export function figStack(parts, alt, caption, { open = false, axis = false } = {}) {
  const cv = new Cv();
  const rmax = Math.max(...parts.map((p) => p.r));
  const total = parts.reduce((s, p) => s + (p.k === 'hemiUp' || p.k === 'hemiDown' ? p.r : p.h), 0);
  const s = 3.4 / Math.max(2 * rmax * 1.0 + 0.001, total);
  const sc = Math.min(s, 3.2 / (2 * rmax));
  let y = 0;
  const X = 0, xr = rmax * sc + 0.5;
  parts.forEach((p, i) => {
    const a = p.r * sc, first = i === 0, last = i === parts.length - 1;
    const H = p.k === 'hemiUp' || p.k === 'hemiDown' ? a : p.h * sc;
    const y0 = y, y1 = y + H;
    if (p.k === 'cyl') {
      cv.seg([X - a, y0], [X - a, y1]); cv.seg([X + a, y0], [X + a, y1]);
      if (first) cv.rim(X, y0, a, 'dashed');
      if (last) cv.rim(X, y1, a, open ? 'dashed' : 'solid'); else cv.arc(X, y1, a, a * DEPTH, 180, 360);
    } else if (p.k === 'cone') {
      const ap = cv.dot(`ap${i}`, X, y1);
      cv.seg(ap, [X - a, y0], p.ls ? { label: p.ls } : {}); cv.seg(ap, [X + a, y0]);
      if (first) cv.rim(X, y0, a, 'dashed');
      else cv.arc(X, y0, a, a * DEPTH, 180, 360);
    } else if (p.k === 'hemiUp') {
      cv.arc(X, y0, a, a, 0, 180);
      if (first) cv.rim(X, y0, a, 'dashed'); else cv.arc(X, y0, a, a * DEPTH, 180, 360);
    } else if (p.k === 'hemiDown') {
      cv.arc(X, y1, a, a, 180, 360);
      cv.arc(X, y1, a, a * DEPTH, 180, 360);
      if (last) cv.arc(X, y1, a, a * DEPTH, 0, 180, { dashed: true });
    } else throw new Error(`unknown part ${p.k}`);
    if (p.lh && p.k === 'cone') cv.seg([X, y1], [X, y0], { dashed: true, label: p.lh });
    else if (p.lh) cv.vdim(X + xr, y0, y1, p.lh);
    if (p.lr) cv.radius(`r${i}`, X, p.k === 'hemiDown' ? y1 : y0, a, p.lr, 'e');
    y = y1;
  });
  if (axis) cv.seg([X, 0], [X, y], { dashed: true });
  return cv.finish(alt, caption);
}

/** Two coaxial circles seen in cross-section: a hollow sphere (outer radius R, inner radius r) with labelled radii. */
export function figShell({ R, r, lR, lr }, alt, caption, { half = false } = {}) {
  const cv = new Cv();
  const k = 1.5 / R, A = R * k, B = r * k;
  cv.dot('O', 0, 0);
  cv.circle('O', A); cv.circle('O', B);
  const p1 = cv.pt('P', A * Math.cos(0.5), A * Math.sin(0.5), lR, 'ne');
  const p2 = cv.pt('Q', B * Math.cos(2.3), B * Math.sin(2.3), lr, 'nw');
  cv.seg('O', p1); cv.seg('O', p2);
  return cv.finish(alt, caption, 0.6);
}

/** A sphere: outline circle, equator ellipse (back half dashed) and a labelled radius. */
export function figSphere({ lr }, alt, caption) {
  const cv = new Cv();
  const A = 1.5;
  cv.dot('O', 0, 0); cv.circle('O', A);
  cv.arc(0, 0, A, A * DEPTH, 180, 360); cv.arc(0, 0, A, A * DEPTH, 0, 180, { dashed: true });
  const e = cv.pt('E', A, 0, lr, 'e');
  cv.seg('O', e);
  return cv.finish(alt, caption);
}

/** Hemisphere with its flat face up, a bowl: open top rim ellipse and a labelled radius. */
export function figBowl({ lr }, alt, caption) {
  return figStack([{ k: 'hemiDown', r: 1, lr }], alt, caption, { open: true });
}

/** The curved surface of a cylinder unrolled into a rectangle 2 pi r by h, with the two circles. */
export function figNet({ lw, lh, lr }, alt, caption) {
  const cv = new Cv();
  const W = 4.2, H = 1.7, a = 0.7;
  cv.dot('A', 0, 0); cv.dot('B', W, 0); cv.dot('C', W, H); cv.dot('D', 0, H);
  cv.seg('A', 'B', { label: lw }); cv.seg('B', 'C', { label: lh }); cv.seg('C', 'D'); cv.seg('D', 'A');
  cv.circle('T', a); cv.circle('U', a);
  cv.dot('T', 0.8, H + 0.3 + a); cv.dot('U', 3.0, -0.3 - a);
  const t = cv.pt('Te', 0.8 + a, H + 0.3 + a, lr, 'e'); cv.seg('T', t, { dashed: true });
  return cv.finish(alt, caption, 0.4);
}

/** Hollow cylinder (a pipe): outer radius R, inner radius r, height h; the bore shows as an inner ellipse and dashed walls. */
export function figHollow({ R, r, h, lR, lr, lh }, alt, caption) {
  const cv = new Cv();
  const sc = Math.min(3.4 / (2 * R), 3.2 / h), A = R * sc, B = r * sc, H = h * sc;
  cv.seg([-A, 0], [-A, H]); cv.seg([A, 0], [A, H]);
  cv.rim(0, 0, A, 'dashed');
  cv.rim(0, H, A, 'solid');
  cv.rim(0, H, B, 'solid');
  cv.seg([-B, H], [-B, 0.0], { dashed: true }); cv.seg([B, H], [B, 0.0], { dashed: true });
  cv.arc(0, 0, B, B * DEPTH, 180, 360, { dashed: true });
  cv.dot('c', 0, H);
  const e1 = cv.pt('e1', B, H, lr, 'n'), e2 = cv.pt('e2', A, H, lR, 'e');
  cv.seg('c', e1, { dashed: true }); cv.seg(e1, e2, { dashed: true });
  cv.vdim(A + 0.9, 0, H, lh);
  return cv.finish(alt, caption);
}

/** An open cylindrical tank holding water to a level, with a sphere resting on the bottom (radius rs). */
export function figWater({ r, h, hw, rs, lr, lh, lrs }, alt, caption) {
  const cv = new Cv();
  const sc = Math.min(3.4 / (2 * r), 3.2 / h), A = r * sc, H = h * sc, W = hw * sc, S = rs * sc;
  cv.seg([-A, 0], [-A, H]); cv.seg([A, 0], [A, H]);
  cv.arc(0, 0, A, A * DEPTH, 180, 360);
  cv.rim(0, H, A, 'solid');
  cv.arc(0, W, A, A * DEPTH, 180, 360, { dashed: true });
  cv.dot('S', 0, S - 0.15 * A * 0 + 0.0); cv.circle('S', S);
  const e = cv.pt('Se', S, S, lrs, 'e'); cv.seg('S', e, { dashed: true });
  cv.vdim(A + 0.6, 0, W, lh);
  const c = cv.dot('c', 0, H); const q = cv.pt('q', A, H, lr, 'e'); cv.seg(c, q, { dashed: true });
  return cv.finish(alt, caption);
}
