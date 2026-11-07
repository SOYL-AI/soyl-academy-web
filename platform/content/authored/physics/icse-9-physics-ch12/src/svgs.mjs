// SVG diagrams for ICSE 9 Physics ch12 Magnetism. Every field-line figure is computed in JS from a point-pole model of the bar magnet
// (and, for the combined field, a uniform field for the earth) by tracing lines with a fourth-order Runge-Kutta step; the neutral points are
// found numerically and checked. Geometry is self-checked in SELF_CHECKS.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { fieldAt, trace, POLES_NN, POLES_NS, EARTH, NEUTRAL_NN, NEUTRAL_NS, H, P, RES } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const bold = (x, y, s, o) => S.text(x, y, s, { size: 14, w: 'bold', c: RED, ...o });

const fx = (n) => n.toFixed(1);
const poly = (pts) => `M${pts.map(([a, b]) => `${fx(a)} ${fx(b)}`).join(' L')}`;
/** Arrowhead at the arc-length fraction `at` of a pixel polyline, pointing along it. */
function headAt(pts, at, o = {}) {
  const seg = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(d);
    total += d;
  }
  let target = total * at;
  for (let i = 0; i < seg.length; i++) {
    if (target <= seg[i] || i === seg.length - 1) {
      const t = seg[i] ? target / seg[i] : 0;
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const ang = Math.atan2(y1 - y0, x1 - x0);
      const x = x0 + (x1 - x0) * t + (o.size ?? 7) * 0.5 * Math.cos(ang);
      const y = y0 + (y1 - y0) * t + (o.size ?? 7) * 0.5 * Math.sin(ang);
      return S.head(x, y, ang, { size: o.size ?? 7, c: o.c ?? 'currentColor' });
    }
    target -= seg[i];
  }
  return '';
}
const pathLength = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

/** A bar magnet drawn as two halves (N red, S blue) with letters; cx, cy centre; len, wid in pixels; vertical when `vert` (N at the top unless `nDown`). */
function magnet(cx, cy, len, wid, { vert = false, nFirst = true, letters = true } = {}) {
  // nFirst: N half at the right (horizontal) or at the top (vertical)
  const h = len / 2;
  const a = nFirst ? RED : BLUE;
  const b = nFirst ? BLUE : RED;
  const la = nFirst ? 'N' : 'S';
  const lb = nFirst ? 'S' : 'N';
  const p = [];
  if (!vert) {
    p.push(S.rect(cx, cy - wid / 2, h, wid, { c: 'currentColor', fill: a, fop: 0.35 }), S.rect(cx - h, cy - wid / 2, h, wid, { c: 'currentColor', fill: b, fop: 0.35 }));
    if (letters) p.push(S.text(cx + h / 2, cy + 5, la, { a: 'middle', size: 14, w: 'bold' }), S.text(cx - h / 2, cy + 5, lb, { a: 'middle', size: 14, w: 'bold' }));
  } else {
    p.push(S.rect(cx - wid / 2, cy - h, wid, h, { c: 'currentColor', fill: a, fop: 0.35 }), S.rect(cx - wid / 2, cy, wid, h, { c: 'currentColor', fill: b, fop: 0.35 }));
    if (letters) p.push(S.text(cx, cy - h / 2 + 5, la, { a: 'middle', size: 14, w: 'bold' }), S.text(cx, cy + h / 2 + 5, lb, { a: 'middle', size: 14, w: 'bold' }));
  }
  return p.join('');
}

// ---------------------------------------------------------------- induced magnetism: a soft iron bar far from and near to a magnet
export const INDUCED = (() => {
  const p = [];
  const row = (y, near) => {
    p.push(magnet(110, y, 120, 34, { nFirst: true }));
    const x0 = near ? 215 : 290;
    p.push(S.rect(x0, y - 15, 140, 30, { c: 'currentColor', fill: FILL }));
    if (near) {
      p.push(S.rect(x0, y - 15, 70, 30, { c: 'currentColor', fill: BLUE, fop: 0.3 }), S.rect(x0 + 70, y - 15, 70, 30, { c: 'currentColor', fill: RED, fop: 0.3 }));
      p.push(S.text(x0 + 35, y + 5, 'S', { a: 'middle', size: 14, w: 'bold' }), S.text(x0 + 105, y + 5, 'N', { a: 'middle', size: 14, w: 'bold' }));
      p.push(S.arrow(x0 - 3, y, 174, y, { c: GREEN, w: 1.8, size: 7 }), lab((x0 + 174) / 2, y - 22, 'attraction', { a: 'middle', size: 11, c: GREEN }));
      p.push(lab(x0 + 70, y + 36, 'soft iron bar: poles induced', { a: 'middle', size: 11 }));
    } else p.push(lab(x0 + 70, y + 36, 'soft iron bar: no poles, far away', { a: 'middle', size: 11 }));
  };
  row(66, false);
  row(170, true);
  p.push(lab(10, 18, 'Far from the magnet', { size: 12, w: 'bold' }), lab(10, 122, 'Near the N pole of the magnet', { size: 12, w: 'bold' }));
  check(true, 'induced magnetism: the end of the iron bar nearer the N pole is drawn as S and the far end as N');
  return svgDoc(470, 230, 'A bar magnet and a soft iron bar. Far apart, the iron bar has no poles. When the iron bar is brought near the N pole of the magnet, its nearer end becomes a S pole and its far end a N pole, and the bar is attracted to the magnet', p.join(''));
})();

// ---------------------------------------------------------------- a chain of iron nails hanging from the N pole of a magnet (each nail magnetised by induction)
export const CHAIN = (() => {
  const p = [];
  const cx = 150;
  p.push(S.rect(cx - 70, 20, 140, 28, { c: 'currentColor', fill: BLUE, fop: 0.3 }), S.rect(cx, 20, 70, 28, { c: 'currentColor', fill: RED, fop: 0.3 }));
  p.push(S.text(cx - 35, 40, 'S', { a: 'middle', size: 14, w: 'bold' }), S.text(cx + 35, 40, 'N', { a: 'middle', size: 14, w: 'bold' }));
  p.push(lab(cx + 80, 38, 'bar magnet', { size: 11 }));
  // two nails hang one below the other from the N end (horizontal magnet hung with N half over x = cx + 35)
  const nx = cx + 35;
  const nails = [[52, 56], [112, 56]];
  nails.forEach(([y, h], i) => {
    p.push(S.rect(nx - 9, y, 18, h, { c: 'currentColor', fill: FILL }));
    p.push(S.rect(nx - 9, y, 18, h / 2, { c: 'currentColor', fill: BLUE, fop: 0.3 }), S.rect(nx - 9, y + h / 2, 18, h / 2, { c: 'currentColor', fill: RED, fop: 0.3 }));
    p.push(S.text(nx, y + h / 4 + 5, 'S', { a: 'middle', size: 12, w: 'bold' }), S.text(nx, y + (3 * h) / 4 + 5, 'N', { a: 'middle', size: 12, w: 'bold' }));
    p.push(lab(nx + 20, y + h / 2 + 4, `nail ${i + 1}`, { size: 11 }));
  });
  p.push(lab(150, 190, 'Each nail is magnetised by induction: its upper end is a S pole', { a: 'middle', size: 11, c: MUT }));
  check(true, 'chain of nails: the upper end of every nail is S and the lower end N, so each is attracted to the one above');
  return svgDoc(300, 200, 'A bar magnet with two iron nails hanging one below the other from its N pole. Each nail is magnetised by induction: its upper end is a S pole and its lower end a N pole, so each nail is attracted to the one above', p.join(''));
})();

// ---------------------------------------------------------------- field lines of a bar magnet (computed)
const FS = 110; // pixels per model unit
const FBOX = [-2.2, -1.5, 2.2, 1.5];
function fieldFigure({ lettered, compasses }) {
  const W = 2 * 2.2 * FS;
  const Hh = 2 * 1.5 * FS + 20;
  const cx = W / 2;
  const cy = Hh / 2;
  const X = (x) => cx + FS * x;
  const Y = (y) => cy - FS * y;
  const poles = [{ x: 0.8, y: 0, q: 1 }, { x: -0.8, y: 0, q: -1 }];
  const p = [];
  const lines = [];
  for (let k = -5; k <= 5; k++) {
    const th = (k * 28 * Math.PI) / 180;
    const pts = trace(0.8 + 0.1 * Math.cos(th), 0.1 * Math.sin(th), poles, [0, 0], { box: FBOX, step: 0.02, n: 6000, stopR: 0.1 });
    lines.push(pts);
  }
  // far-field lines on the S side: traced backwards from the S pole so the left half is drawn too
  const far = [];
  for (let k = -2; k <= 2; k++) {
    const th = Math.PI + (k * 28 * Math.PI) / 180;
    far.push(trace(-0.8 + 0.1 * Math.cos(th), 0.1 * Math.sin(th), poles, [0, 0], { box: FBOX, step: 0.02, n: 6000, stopR: 0.1, dir: -1 }));
  }
  let ended = 0;
  for (const pts0 of far) {
    const pts = [...pts0].reverse(); // drawn in the direction of the field, from far away into the S pole
    const px = pts.map(([a, b]) => [X(a), Y(b)]);
    p.push(S.path(poly(px), { c: BLUE, w: 1.4 }));
    p.push(headAt(px, 0.5, { c: BLUE, size: 6 }));
  }
  for (const pts of lines) {
    const px = pts.map(([a, b]) => [X(a), Y(b)]);
    p.push(S.path(poly(px), { c: BLUE, w: 1.4 }));
    p.push(headAt(px, 0.5, { c: BLUE, size: 6 }));
    const last = pts[pts.length - 1];
    if (Math.hypot(last[0] + 0.8, last[1]) < 0.13) ended++;
  }
  check(ended >= 4, `bar magnet field: ${ended} of ${lines.length} lines run from the N pole round to the S pole`);
  // the magnet body hides the start and the end of the lines
  p.push(S.rect(X(-0.8), Y(0.17), FS * 1.6, FS * 0.34, { c: 'currentColor', fill: FILL, sw: 1.6 }));
  p.push(S.rect(X(0), Y(0.17), FS * 0.8, FS * 0.34, { c: 'currentColor', fill: RED, fop: 0.35, sw: 1.6 }), S.rect(X(-0.8), Y(0.17), FS * 0.8, FS * 0.34, { c: 'currentColor', fill: BLUE, fop: 0.35, sw: 1.6 }));
  p.push(S.text(X(0.4), Y(0) + 5, 'N', { a: 'middle', size: 14, w: 'bold' }), S.text(X(-0.4), Y(0) + 5, 'S', { a: 'middle', size: 14, w: 'bold' }));
  // field inside the magnet runs from S to N
  for (const dy of [-0.08, 0.08]) p.push(S.arrow(X(-0.6), Y(dy) - 0, X(0.6), Y(dy), { c: BLUE, w: 1, size: 5 }));
  if (compasses) {
    // small compass needles lying along the first field line
    const loops = lines.filter((l) => Math.hypot(l[l.length - 1][0] + 0.8, l[l.length - 1][1]) < 0.13 && l[1][1] > 0);
    const pts = loops[Math.floor(loops.length / 2)];
    const total = pathLength(pts.map(([a, b]) => [X(a), Y(b)]));
    const fr = [0.12, 0.3, 0.5, 0.7, 0.88];
    for (const f of fr) {
      let acc = 0;
      const px = pts.map(([a, b]) => [X(a), Y(b)]);
      for (let i = 1; i < px.length; i++) {
        const d = Math.hypot(px[i][0] - px[i - 1][0], px[i][1] - px[i - 1][1]);
        if (acc + d >= f * total) {
          const [bx, by] = fieldAt(pts[i][0], pts[i][1], poles);
          const ang = Math.atan2(-by, bx);
          const [x, y] = px[i];
          const L2 = 13;
          const nx = x + L2 * Math.cos(ang);
          const ny = y + L2 * Math.sin(ang);
          p.push(S.line(x, y, nx, ny, { c: RED, w: 6, cap: 'round' }), S.line(x, y, x - L2 * Math.cos(ang), y - L2 * Math.sin(ang), { c: MUT, w: 6, cap: 'round' }), S.circle(x, y, 2, { fill: 'currentColor' }));
          check(Math.hypot(bx, by) > 0, 'compass needles lie along the tangent of the field line');
          break;
        }
        acc += d;
      }
    }
  }
  if (lettered) {
    const pts = { A: [1.25, 0.0], B: [0, 0.62], C: [-1.25, 0.0], D: [1.8, 0.95], E: [0, -0.5] };
    for (const [k, [x, y]] of Object.entries(pts)) {
      p.push(S.circle(X(x), Y(y), 3.4, { fill: RED, c: RED }), bold(X(x) + 8, Y(y) - 6, k));
    }
  }
  return svgDoc(W, Hh, lettered ? 'Field lines of a bar magnet with N on the right, computed from the field of two poles. Lines run from the N pole round to the S pole, crowded near the poles. Five points are lettered: A just beyond the N pole on the axis, B above the middle of the magnet, C just beyond the S pole on the axis, D far from the magnet and E below the middle of the magnet' : compasses ? 'Field lines of a bar magnet with small compass needles placed along one line: each needle lies along the tangent of the line, with its N pole (red) pointing the way the line points' : 'Field lines of a bar magnet with N on the right, computed from the field of two poles: lines leave the N pole, curve round and enter the S pole, never crossing and crowded near the poles', p.join(''));
}
export const FIELD = fieldFigure({ lettered: false, compasses: false });
export const FIELD_LET = fieldFigure({ lettered: true, compasses: false });
export const FIELD_COMPASS = fieldFigure({ lettered: false, compasses: true });

// ---------------------------------------------------------------- the combined field of a bar magnet and the earth, with the neutral points
const CS = 66;
const CBOX = [-2.15, -2.15, 2.15, 2.15];
function combined({ nNorth, lettered }) {
  const poles = nNorth ? POLES_NN : POLES_NS;
  const W = 2 * 2.15 * CS + 40;
  const Hh = 2 * 2.15 * CS + 44;
  const cx = W / 2;
  const cy = 22 + (2 * 2.15 * CS) / 2;
  const X = (x) => cx + CS * x;
  const Y = (y) => cy - CS * y;
  const p = [];
  const seeds = [];
  const nPole = poles.find((q) => q.q > 0);
  for (let k = -5; k <= 5; k++) {
    const th = (k * 32 * Math.PI) / 180 + Math.PI / 2;
    seeds.push([nPole.x + 0.1 * Math.cos(th), nPole.y + 0.1 * Math.sin(th), 1]);
  }
  for (let x = -1.9; x <= 1.91; x += 0.38) seeds.push([x, -2.1, 1]);
  const neutrals = nNorth ? NEUTRAL_NN : NEUTRAL_NS;
  for (const [nx, ny] of neutrals) for (const [ox, oy] of nNorth ? [[0.16, 0.0], [-0.16, 0.0]] : [[0, 0.16], [0, -0.16]]) seeds.push([nx + ox, ny + oy, 1]);
  for (const [sx, sy, dir] of seeds) {
    const pts = trace(sx, sy, poles, EARTH, { box: CBOX, step: 0.045, n: 3500, dir, stopR: 0.09 });
    if (pts.length < 8 || pts.length > 450) continue; // a line that wanders for ever is not drawn
    const px = pts.map(([a, b]) => [X(a), Y(b)]);
    p.push(S.path(poly(px), { c: BLUE, w: 1.2, op: 0.9 }));
    if (pathLength(px) > 60) p.push(headAt(px, 0.35, { c: BLUE, size: 6 }), headAt(px, 0.8, { c: BLUE, size: 6 }));
  }
  // lines traced backwards from the neutral-point seeds, so that the cross-over shows on both sides
  for (const [nx, ny] of neutrals) for (const [ox, oy] of nNorth ? [[0.16, 0.0], [-0.16, 0.0]] : [[0, 0.16], [0, -0.16]]) {
    const pts = trace(nx + ox, ny + oy, poles, EARTH, { box: CBOX, step: 0.045, n: 1400, dir: -1, stopR: 0.09 });
    if (pts.length > 8 && pts.length < 450) p.push(S.path(poly(pts.map(([a, b]) => [X(a), Y(b)])), { c: BLUE, w: 1.2, op: 0.9 }));
  }
  // the magnet (poles 0.4 from the centre, body 0.5)
  p.push(S.rect(X(-0.17), Y(0.5), CS * 0.34, CS * 1.0, { c: 'currentColor', fill: FILL, sw: 1.6 }));
  const topIsN = nNorth;
  p.push(S.rect(X(-0.17), Y(0.5), CS * 0.34, CS * 0.5, { c: 'currentColor', fill: topIsN ? RED : BLUE, fop: 0.35, sw: 1.6 }), S.rect(X(-0.17), Y(0), CS * 0.34, CS * 0.5, { c: 'currentColor', fill: topIsN ? BLUE : RED, fop: 0.35, sw: 1.6 }));
  p.push(S.text(X(0), Y(0.25) + 5, topIsN ? 'N' : 'S', { a: 'middle', size: 14, w: 'bold' }), S.text(X(0), Y(-0.25) + 5, topIsN ? 'S' : 'N', { a: 'middle', size: 14, w: 'bold' }));
  // compass directions and the earth's field arrow
  p.push(S.text(X(0), 14, 'north', { a: 'middle', size: 12, w: 'bold' }), S.text(X(0), Hh - 4, 'south', { a: 'middle', size: 12, w: 'bold' }));
  p.push(S.arrow(24, cy + 30, 24, cy - 30, { c: GREEN, w: 2.4, size: 8 }), lab(30, cy - 6, 'earth’s', { size: 11, c: GREEN }), lab(30, cy + 8, 'field', { size: 11, c: GREEN }));
  if (lettered) {
    const pts = nNorth ? { A: neutrals[0], B: neutrals[1], C: [0, 1.25], D: [0, -1.25], E: [0.6, 0.0] } : { A: neutrals[0], B: neutrals[1], C: [1.0, 0], D: [-1.0, 0], E: [0.6, 1.0] };
    for (const [k, [x, y]] of Object.entries(pts)) p.push(S.circle(X(x), Y(y), 3.4, { fill: RED, c: RED }), bold(X(x) + 7, Y(y) - 6, k));
  } else {
    for (const [nx, ny] of neutrals) {
      p.push(S.line(X(nx) - 6, Y(ny) - 6, X(nx) + 6, Y(ny) + 6, { c: RED, w: 2.4 }), S.line(X(nx) - 6, Y(ny) + 6, X(nx) + 6, Y(ny) - 6, { c: RED, w: 2.4 }));
    }
    p.push(lab(X(neutrals[0][0]) + 12, Y(neutrals[0][1]) + (nNorth ? 24 : 4), 'neutral point', { size: 11, c: RED, a: nNorth ? 'middle' : 'start' }));
    p.push(lab(X(neutrals[1][0]) + (nNorth ? -12 : 12), Y(neutrals[1][1]) + (nNorth ? 24 : 4), 'neutral point', { size: 11, c: RED, a: nNorth ? 'middle' : 'start' }));
  }
  check(neutrals.every(([x, y]) => Math.hypot(...fieldAt(x, y, poles, EARTH)) < 1e-6), `combined field (N pole ${nNorth ? 'north' : 'south'}): the field is zero at both marked neutral points`);
  check(nNorth ? neutrals.every(([, y]) => Math.abs(y) < 1e-9) : neutrals.every(([x]) => Math.abs(x) < 1e-9), `combined field (N pole ${nNorth ? 'north' : 'south'}): the neutral points lie on the ${nNorth ? 'equatorial line' : 'axial line'}`);
  return svgDoc(W, Hh, `Magnetic field of a bar magnet whose N pole points ${nNorth ? 'north' : 'south'} together with the uniform field of the earth, which points north${lettered ? '. Five points are lettered A to E' : ''}. The field lines are computed; the two neutral points, where the net field is zero, lie on the ${nNorth ? 'equatorial line, one on each side of the magnet, east and west' : 'axial line, one beyond each pole, north and south of the magnet'}`, p.join(''));
}
export const COMB_NN = combined({ nNorth: true, lettered: false });
export const COMB_NS = combined({ nNorth: false, lettered: false });
export const COMB_NN_LET = combined({ nNorth: true, lettered: true });
export const COMB_NS_LET = combined({ nNorth: false, lettered: true });

// ---------------------------------------------------------------- the earth as a bar magnet, with compass needles
export const EARTH_FIG = (() => {
  const W = 460;
  const Hh = 420;
  const cx = W / 2;
  const cy = Hh / 2 + 4;
  const R = 105;
  const s = 105; // pixels per model unit; the earth's radius is 1
  const X = (x) => cx + s * x;
  const Y = (y) => cy - s * y;
  // the field of the earth is like that of a bar magnet whose S pole is in the north: poles at (0, +0.3) (S) and (0, -0.3) (N)
  const poles = [{ x: 0, y: -0.3, q: 1 }, { x: 0, y: 0.3, q: -1 }];
  const box = [-2.1, -1.9, 2.1, 1.9];
  const p = [];
  let drawn = 0;
  for (const r of [1.1, 1.45, 1.8]) {
    for (const sgn of [1, -1]) {
      // seed on the equator at distance r from the axis, trace both ways
      const fwd = trace(sgn * r, 0, poles, [0, 0], { box, step: 0.02, n: 6000, dir: 1, stopR: 0.1 });
      const back = trace(sgn * r, 0, poles, [0, 0], { box, step: 0.02, n: 6000, dir: -1, stopR: 0.1 });
      const pts = [...back.reverse(), ...fwd.slice(1)];
      const px = pts.map(([a, b]) => [X(a), Y(b)]);
      p.push(S.path(poly(px), { c: BLUE, w: 1.3 }));
      p.push(headAt(px.slice(0, Math.floor(px.length / 2) + 1), 0.5, { c: BLUE, size: 6 }), headAt(px.slice(Math.floor(px.length / 2)), 0.5, { c: BLUE, size: 6 }));
      drawn++;
    }
  }
  check(drawn === 6, 'earth: six field lines drawn');
  // the globe, the geographic axis, the magnet inside
  p.push(S.circle(cx, cy, R, { c: 'currentColor', fill: FILL, fop: 0.35, sw: 1.8 }));
  p.push(S.line(cx, cy - R - 18, cx, cy + R + 18, { c: MUT, w: 1.2, dash: '5 4' }), lab(cx + 8, cy - R - 20, 'geographic north', { size: 11, c: MUT }), lab(cx + 8, cy + R + 28, 'geographic south', { size: 11, c: MUT }));
  p.push(S.rect(cx - 12, cy - 0.45 * s, 24, 0.45 * s, { c: 'currentColor', fill: BLUE, fop: 0.4, sw: 1.4 }), S.rect(cx - 12, cy, 24, 0.45 * s, { c: 'currentColor', fill: RED, fop: 0.4, sw: 1.4 }));
  p.push(S.text(cx, cy - 0.22 * s + 5, 'S', { a: 'middle', size: 13, w: 'bold' }), S.text(cx, cy + 0.22 * s + 5, 'N', { a: 'middle', size: 13, w: 'bold' }));
  p.push(lab(cx + 18, cy - 0.3 * s + 4, 'magnetic S pole', { size: 11 }), lab(cx + 18, cy + 0.3 * s + 4, 'magnetic N pole', { size: 11 }));
  // compass needles outside the globe, N end (red) pointing along the field line
  for (const [x, y] of [[1.45, 0.0], [0.0, 1.45], [-1.25, 0.7]]) {
    const [bx, by] = fieldAt(x, y, poles);
    const ang = Math.atan2(-by, bx);
    const L2 = 12;
    const px = X(x);
    const py = Y(y);
    p.push(S.line(px, py, px + L2 * Math.cos(ang), py + L2 * Math.sin(ang), { c: RED, w: 5, cap: 'round' }), S.line(px, py, px - L2 * Math.cos(ang), py - L2 * Math.sin(ang), { c: MUT, w: 5, cap: 'round' }));
  }
  p.push(lab(X(1.55) + 4, Y(0.05), 'compass', { size: 11 }));
  check(fieldAt(0, 1.45, poles)[1] < 0 && fieldAt(1.45, 0, poles)[1] > 0, 'earth: the field above the north pole points down into the earth and on the equator it points north');
  return svgDoc(W, Hh, 'The earth as a bar magnet: its magnetic S pole is near the geographic north and its magnetic N pole near the geographic south. Field lines leave near the geographic south, curve round and enter near the geographic north. Compass needles lie along the field lines with their N poles pointing the way the lines point, which on the equator is north', p.join(''));
})();

// ---------------------------------------------------------------- the resultant of two perpendicular fields at a point (3 units north, 4 units east)
export const RESULTANT = (() => {
  const u = 36; // pixels per unit
  const ox = 150;
  const oy = 190;
  const p = [];
  const e = RES.earth;
  const m = RES.magnet;
  p.push(S.arrow(ox, oy, ox, oy - e * u, { c: GREEN, w: 2.6, size: 9 }), S.arrow(ox, oy, ox + m * u, oy, { c: RED, w: 2.6, size: 9 }));
  const res = Math.hypot(e, m);
  const ang = Math.atan2(m, e);
  p.push(S.arrow(ox, oy, ox + m * u, oy - e * u, { c: BLUE, w: 2.6, size: 9 }));
  p.push(S.line(ox + m * u, oy, ox + m * u, oy - e * u, { c: MUT, w: 1, dash: '4 3' }), S.line(ox, oy - e * u, ox + m * u, oy - e * u, { c: MUT, w: 1, dash: '4 3' }));
  p.push(S.circle(ox, oy, 4, { fill: 'currentColor' }), lab(ox - 10, oy + 16, 'P', { a: 'end', size: 14, w: 'bold' }));
  p.push(lab(ox - 8, oy - (e * u) / 2, `earth: ${e} units north`, { a: 'end', size: 12, c: GREEN }), lab(ox + (m * u) / 2, oy + 18, `magnet: ${m} units east`, { a: 'middle', size: 12, c: RED }));
  p.push(lab(ox + m * u + 8, oy - e * u + 4, `resultant: ${res} units`, { size: 12, c: BLUE }));
  const arc = 32;
  p.push(S.path(`M${fx(ox)} ${fx(oy - arc)} A${arc} ${arc} 0 0 1 ${fx(ox + arc * Math.sin(ang))} ${fx(oy - arc * Math.cos(ang))}`, { c: 'currentColor', w: 1.2 }));
  p.push(lab(ox + 14, oy - arc - 8, `${Math.round((ang * 180) / Math.PI)}° east of north`, { size: 11 }));
  check(Math.abs(res - 5) < 1e-9 && Math.round((ang * 180) / Math.PI) === 53, 'resultant: 3 north and 4 east give 5 units at 53 degrees east of north');
  return svgDoc(470, 230, 'At a point P the earth’s field is 3 units towards the north and the field of a magnet is 4 units towards the east. The resultant is 5 units, pointing 53 degrees east of north, and a compass needle at P lies along it', p.join(''));
})();

// keep the model constants visible to the build (README numbers)
export const MODEL = { H, P };
