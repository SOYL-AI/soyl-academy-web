// Ray-diagram generator copied from CBSE 10 Science ch09 (same author family) for CBSE 12 Physics ch09 (computed geometry, New Cartesian sign convention).
// World units are SVG pixels; the pole / optical centre is at x = 0, the principal axis at y = 0, y up.
// Images are found with the mirror / lens formula; rays are drawn to exact ray–mirror intersections and
// every reflected or refracted ray is aimed at the computed image point, so all rays meet there exactly.
import { svgDoc, S } from '../../cbse-12-physics-ch01/src/lib.mjs';

export const mirrorImage = (u, f) => {
  if (Math.abs(u - f) < 1e-9) return { v: Infinity, m: Infinity };
  const v = 1 / (1 / f - 1 / u);
  return { v, m: -v / u };
};
export const lensImage = (u, f) => {
  if (Math.abs(u + f) < 1e-9) return { v: Infinity, m: Infinity };
  const v = 1 / (1 / f + 1 / u);
  return { v, m: v / u };
};

const RAY = 'var(--diagram-red)';
const IMG = 'var(--diagram-blue)';
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

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
  // tip label to the right of the tip; base label left of the foot, on the side opposite the arrow
  out.push(lab(X + 6, Y1 + 4, nameTop, { c }));
  // the base label is left out when the foot sits on a marked point (C, F, 2F…), whose label is already there
  if (!avoid.some((ax) => Math.abs(ax - x) < 8)) out.push(lab(X - 7, Y0 + (h > 0 ? 13 : -5), name, { c, a: 'end' }));
  return out.join('');
}

/** Ray from p0 through p1 (and optionally beyond by `ext` px), with a mid arrowhead. */
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

// --------------------------------------------------------------------------- mirrors
/** Intersection of the ray p + t·d (t > 0) with the mirror sphere (pole at 0, centre at cx = ±R), on the near cap. */
function hitMirror(p, d, cx, R) {
  const ox = p[0] - cx;
  const oy = p[1];
  const a = d[0] * d[0] + d[1] * d[1];
  const b = 2 * (ox * d[0] + oy * d[1]);
  const c = ox * ox + oy * oy - R * R;
  const disc = Math.sqrt(b * b - 4 * a * c);
  const ts = [(-b - disc) / (2 * a), (-b + disc) / (2 * a)].filter((t) => t > 1e-6);
  // the cap near the pole: the point whose x is closest to 0
  const pts = ts.map((t) => [p[0] + t * d[0], p[1] + t * d[1]]);
  pts.sort((m, n) => Math.abs(m[0]) - Math.abs(n[0]));
  return pts[0];
}

/**
 * Concave or convex mirror with the object on the left. o = { type, u, f (magnitude), h, label, title, caption }.
 * Ray choice follows the textbook rules for each object position.
 */
export function mirrorDiagram({ type, u, f = 60, h = 18, label, rays: rayChoice }) {
  const F = type === 'concave' ? -f : f;
  const R = 2 * Math.abs(F);
  const cx = type === 'concave' ? -R : R; // centre of curvature
  const inf = u === -Infinity;
  const { v, m } = inf ? { v: F, m: 0 } : mirrorImage(u, F);
  const hi = inf || !Number.isFinite(v) ? 0 : m * h;
  const A = [u, h];
  const Ai = [v, hi];
  // Default rays (textbook rules): object beyond F → parallel + through F; at F or inside F → parallel + along the
  // line from C; convex → parallel + towards C.
  const au = Math.abs(u);
  const choice = inf ? [] : rayChoice ?? (type === 'convex' ? ['parallel', 'centre'] : au > f + 1 ? ['parallel', 'focus'] : ['parallel', 'centre']);
  const dirFor = (kind) => (kind === 'parallel' ? [1, 0] : kind === 'focus' ? [F - u, -h] : type === 'convex' || au > R ? [cx - u, -h] : [u - cx, h]);
  const hits = choice.map((kind) => hitMirror(A, dirFor(kind), cx, R));
  const aperture = Math.max(h, Math.abs(hi), 24, ...hits.map((p) => Math.abs(p[1]))) + 8;
  const extentPts = [[cx, 0], [F, 0], [0, aperture]];
  if (!inf) extentPts.push(A);
  if (Number.isFinite(v)) extentPts.push(Ai);
  if (inf || !Number.isFinite(v)) extentPts.push([-2.6 * Math.abs(F), 0]);
  const fr = frame(extentPts, aperture);
  const T = (x, y) => [x - fr.minX, fr.y0 - y];
  const parts = [];
  // axis
  parts.push(S.line(0, fr.y0, fr.width, fr.y0, { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }));
  // mirror arc and hatching on the back
  const arcPts = [];
  for (let y = -aperture; y <= aperture + 0.01; y += aperture / 12) {
    const x = type === 'concave' ? cx + Math.sqrt(R * R - y * y) : cx - Math.sqrt(R * R - y * y);
    arcPts.push([x, y]);
  }
  parts.push(S.path('M' + arcPts.map((p) => T(...p).map((n) => n.toFixed(1)).join(' ')).join(' L'), { w: 2.5 }));
  arcPts.filter((_, i) => i % 2 === 0).forEach(([x, y]) => {
    const [X, Y] = T(x, y);
    parts.push(S.line(X, Y, X + 7, Y - 5, { w: 1, c: 'var(--diagram-muted)' }));
  });
  // points P, F, C
  for (const [x, name] of [[0, 'P'], [F, 'F'], [cx, 'C']]) {
    const [X, Y] = T(x, 0);
    parts.push(S.circle(X, Y, 2.4, { fill: 'currentColor', sw: 0 }));
    const under = !inf && Number.isFinite(v) && hi < 0 && Math.abs(v - x) < 8;
    parts.push(lab(under ? X - 8 : X + (x === 0 ? 4 : -4), Y + 14, name, { a: under ? 'end' : x === 0 ? 'start' : 'middle', w: 'bold' }));
  }
  const rays = [];
  const leftEdge = fr.minX + 4;
  if (inf) {
    for (const y of [aperture - 12, (aperture - 12) / 2, -(aperture - 12) / 2]) {
      const start = [leftEdge, y];
      const hit = hitMirror(start, [1, 0], cx, R);
      rays.push(seg(T, start, hit));
      if (type === 'concave') rays.push(seg(T, hit, [F, 0], { ext: 40 }));
      else {
        const dir = [hit[0] - F, hit[1]];
        const L = Math.hypot(...dir);
        rays.push(seg(T, hit, [hit[0] + (dir[0] / L) * 70, hit[1] + (dir[1] / L) * 70]));
        rays.push(seg(T, hit, [F, 0], { dash: '4 3', c: 'var(--diagram-muted)' }));
      }
    }
  } else {
    for (const hit of hits) {
      rays.push(seg(T, A, hit));
      if (Number.isFinite(v)) {
        if (v < 0) rays.push(seg(T, hit, Ai, { ext: 40 })); // real image: rays pass through A'
        else {
          const dd = [hit[0] - Ai[0], hit[1] - Ai[1]];
          const L = Math.hypot(...dd);
          rays.push(seg(T, hit, [hit[0] + (dd[0] / L) * 80, hit[1] + (dd[1] / L) * 80]));
          rays.push(seg(T, hit, Ai, { dash: '4 3', c: 'var(--diagram-muted)' }));
        }
      } else {
        // object at F: every reflected ray is parallel to the reversed ray from C, direction (−f, −h)
        const dirOut = [-Math.abs(F), -h];
        const k = Math.hypot(...dirOut);
        rays.push(seg(T, hit, [hit[0] + (dirOut[0] / k) * (Math.abs(hit[0] - leftEdge) + 20), hit[1] + (dirOut[1] / k) * (Math.abs(hit[0] - leftEdge) + 20)]));
      }
    }
  }
  parts.push(...rays);
  if (!inf) parts.push(arrowObj(T, u, h, 'currentColor', null, 'B', 'A', [cx, F]));
  if (Number.isFinite(v) && !inf) parts.push(arrowObj(T, v, hi, IMG, v > 0 ? '4 3' : null, 'B′', 'A′', [cx, F]));
  if (inf) {
    const [X, Y] = T(F, 0);
    parts.push(S.circle(X, Y, 3.5, { fill: IMG, sw: 0 }));
  }
  return svgDoc(Math.round(fr.width), Math.round(fr.height), label, parts.join(''));
}

// --------------------------------------------------------------------------- lenses
export function lensDiagram({ type, u, f = 60, h = 18, label }) {
  const F = type === 'convex' ? f : -f;
  const inf = u === -Infinity;
  const { v, m } = inf ? { v: F, m: 0 } : lensImage(u, F);
  const hi = inf || !Number.isFinite(v) ? 0 : m * h;
  const A = [u, h];
  const Ai = [v, hi];
  const half = Math.max(h, Math.abs(hi), 30) + 12;
  const extentPts = [[-2 * f, 0], [2 * f, 0], [0, half]];
  if (!inf) extentPts.push(A);
  if (Number.isFinite(v)) extentPts.push(Ai);
  if (inf) extentPts.push([-2.4 * f, 0]);
  const fr = frame(extentPts, half);
  const T = (x, y) => [x - fr.minX, fr.y0 - y];
  const parts = [];
  parts.push(S.line(0, fr.y0, fr.width, fr.y0, { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }));
  const [LX, LY] = T(0, 0);
  if (type === 'convex') parts.push(S.path(`M${LX} ${LY - half} Q${LX + 14} ${LY} ${LX} ${LY + half} Q${LX - 14} ${LY} ${LX} ${LY - half} Z`, { fill: 'var(--diagram-fill)', w: 1.5 }));
  else parts.push(S.path(`M${LX - 9} ${LY - half} L${LX + 9} ${LY - half} Q${LX + 2} ${LY} ${LX + 9} ${LY + half} L${LX - 9} ${LY + half} Q${LX - 2} ${LY} ${LX - 9} ${LY - half} Z`, { fill: 'var(--diagram-fill)', w: 1.5 }));
  for (const [x, name] of [[0, 'O'], [-f, 'F₁'], [f, 'F₂'], [-2 * f, '2F₁'], [2 * f, '2F₂']]) {
    const [X, Y] = T(x, 0);
    parts.push(S.circle(X, Y, 2.4, { fill: 'currentColor', sw: 0 }));
    const under = !inf && Number.isFinite(v) && hi < 0 && Math.abs(v - x) < 8;
    parts.push(lab(under ? X - 8 : X + (x === 0 ? 10 : 0), Y + 14, name, { a: under ? 'end' : x === 0 ? 'start' : 'middle', w: 'bold' }));
  }
  const leftEdge = fr.minX + 4;
  const rightEdge = fr.minX + fr.width - 4;
  const rays = [];
  const outTo = (from, through, real) => {
    // continue from `from` towards / away from the image point to the canvas edge
    const d = real ? [through[0] - from[0], through[1] - from[1]] : [from[0] - through[0], from[1] - through[1]];
    const L = Math.hypot(...d);
    const len = Math.abs((rightEdge - from[0]) / (d[0] / L));
    const lenY = Math.abs(d[1]) > 1e-9 ? (fr.y0 - 8 - Math.sign(d[1]) * from[1]) / (Math.abs(d[1]) / L) : Infinity;
    const k = Math.min(len, lenY, 260);
    return [from[0] + (d[0] / L) * k, from[1] + (d[1] / L) * k];
  };
  if (inf) {
    for (const y of [half - 12, (half - 12) / 2, -(half - 12) / 2]) {
      const hit = [0, y];
      rays.push(seg(T, [leftEdge, y], hit));
      if (type === 'convex') rays.push(seg(T, hit, outTo(hit, [F, 0], true), { at: 0.72 }));
      else {
        rays.push(seg(T, hit, outTo(hit, [F, 0], false), { at: 0.72 }));
        rays.push(seg(T, hit, [F, 0], { dash: '4 3', c: 'var(--diagram-muted)' }));
      }
    }
    const [X, Y] = T(F, 0);
    parts.push(S.circle(X, Y, 3.5, { fill: IMG, sw: 0 }));
  } else {
    const h1 = [0, h]; // parallel ray meets the lens at height h
    rays.push(seg(T, A, h1));
    rays.push(seg(T, A, [0, 0]));
    if (Number.isFinite(v)) {
      const real = v > 0;
      for (const hit of [h1, [0, 0]]) {
        rays.push(seg(T, hit, outTo(hit, Ai, real), { at: 0.72 }));
        if (!real) rays.push(seg(T, hit, Ai, { dash: '4 3', c: 'var(--diagram-muted)' }));
      }
    } else {
      // image at infinity: both refracted rays parallel to the ray through O
      const d = [-u, -h];
      const L = Math.hypot(...d);
      for (const hit of [h1, [0, 0]]) {
        const len = (rightEdge - hit[0]) / (d[0] / L);
        rays.push(seg(T, hit, [hit[0] + (d[0] / L) * len, hit[1] + (d[1] / L) * len], { at: 0.72 }));
      }
    }
    parts.push(arrowObj(T, u, h, 'currentColor', null, 'B', 'A', [-f, f, -2 * f, 2 * f]));
    if (Number.isFinite(v)) parts.push(arrowObj(T, v, hi, IMG, v < 0 ? '4 3' : null, 'B′', 'A′', [-f, f, -2 * f, 2 * f]));
  }
  parts.push(...rays);
  return svgDoc(Math.round(fr.width), Math.round(fr.height), label, parts.join(''));
}

// --------------------------------------------------------------------------- glass slab
export function slabDiagram({ n = 1.5, iDeg = 45, label }) {
  const W = 320;
  const H = 230;
  const top = 70;
  const bot = 160;
  const xIn = 120;
  const i = (iDeg * Math.PI) / 180;
  const r = Math.asin(Math.sin(i) / n);
  const xOut = xIn + (bot - top) * Math.tan(r);
  const len = 60;
  const p0 = [xIn - len * Math.sin(i), top - len * Math.cos(i)];
  const p3 = [xOut + len * Math.sin(i), bot + len * Math.cos(i)];
  const ghost = [xIn + (bot - top + len * Math.cos(i)) * Math.tan(i), bot + len * Math.cos(i)];
  const shift = (bot - top) * Math.sin(i - r) / Math.cos(r);
  const parts = [
    S.rect(40, top, 240, bot - top, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.line(xIn, top - 52, xIn, top + 40, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(xOut, bot - 40, xOut, bot + 52, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(xIn, top, ghost[0], ghost[1], { c: 'var(--diagram-muted)', w: 1, dash: '2 3' }),
    S.line(...p0, xIn, top, { c: RAY, w: 1.8 }) + S.midHead(...p0, xIn, top, { c: RAY }),
    S.line(xIn, top, xOut, bot, { c: RAY, w: 1.8 }) + S.midHead(xIn, top, xOut, bot, { c: RAY }),
    S.line(xOut, bot, ...p3, { c: RAY, w: 1.8 }) + S.midHead(xOut, bot, ...p3, { c: RAY }),
    S.path(`M${xIn} ${top - 22} A22 22 0 0 0 ${(xIn - 22 * Math.sin(i)).toFixed(1)} ${(top - 22 * Math.cos(i)).toFixed(1)}`, { w: 1 }),
    S.path(`M${xIn} ${top + 26} A26 26 0 0 0 ${(xIn + 26 * Math.sin(r)).toFixed(1)} ${(top + 26 * Math.cos(r)).toFixed(1)}`, { w: 1 }),
    S.path(`M${xOut} ${bot + 22} A22 22 0 0 0 ${(xOut + 22 * Math.sin(i)).toFixed(1)} ${(bot + 22 * Math.cos(i)).toFixed(1)}`, { w: 1 }),
    lab(xIn - 13, top - 26, 'i', { it: true, a: 'middle' }),
    lab(xIn + 7, top + 40, 'r', { it: true, a: 'middle' }),
    lab(xOut + 12, bot + 36, 'e', { it: true, a: 'middle' }),
    lab(p0[0] - 4, p0[1] - 4, 'Incident ray', { a: 'end' }),
    lab(p3[0] + 4, p3[1] + 2, 'Emergent ray'),
    lab(232, top + 22, 'Glass slab', { a: 'middle' }),
    lab(232, top - 8, 'Air', { a: 'middle', c: 'var(--diagram-muted)' }),
    lab(70, bot + 18, 'Air', { a: 'middle', c: 'var(--diagram-muted)' }),
    lab(xIn + 6, top - 40, 'Normal', { c: 'var(--diagram-muted)' }),
    (() => {
      // perpendicular from a point E on the emergent ray to the extended incident ray
      const E = [xOut + 34 * Math.sin(i), bot + 34 * Math.cos(i)];
      const d = [Math.sin(i), Math.cos(i)];
      const t = (E[0] - xIn) * d[0] + (E[1] - top) * d[1];
      const G = [xIn + t * d[0], top + t * d[1]];
      return S.line(...E, ...G, { c: 'var(--diagram-accent)', w: 2 }) + lab(G[0] + 8, G[1] + 16, 'Lateral shift', { c: 'var(--diagram-accent)' });
    })(),
  ];
  void shift;
  return svgDoc(W, H, label, parts.join(''));
}

// --------------------------------------------------------------------------- sign convention
export function signDiagram(label) {
  const parts = [
    S.line(10, 110, 360, 110, { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }),
    S.path('M200 40 C190 70 190 150 200 180', { w: 2.5 }),
    S.circle(194, 110, 2.6, { fill: 'currentColor', sw: 0 }),
    lab(186, 126, 'P (origin)', { a: 'end', w: 'bold' }),
    S.arrow(212, 96, 340, 96, { c: 'var(--diagram-green)', w: 2 }),
    lab(300, 88, 'Positive (+)', { a: 'middle', c: 'var(--diagram-green)' }),
    S.arrow(176, 96, 70, 96, { c: 'var(--diagram-red)', w: 2 }),
    lab(124, 88, 'Negative (−)', { a: 'middle', c: 'var(--diagram-red)' }),
    S.arrow(250, 118, 250, 34, { c: 'var(--diagram-green)', w: 2 }),
    lab(256, 44, 'Upward heights: +', { c: 'var(--diagram-green)' }),
    S.arrow(250, 128, 250, 198, { c: 'var(--diagram-red)', w: 2 }),
    lab(256, 192, 'Downward heights: −', { c: 'var(--diagram-red)' }),
    S.arrow(20, 150, 80, 150, { c: 'var(--diagram-yellow)', w: 2.5 }),
    lab(20, 168, 'Incident light'),
    lab(20, 181, 'from the left'),
  ];
  return svgDoc(370, 210, label, parts.join(''));
}

// --------------------------------------------------------------------------- terms: P, F, C, R = 2f
export function termsDiagram(label) {
  const f = 70;
  const R = 2 * f;
  const px = 290;
  const y0 = 96;
  const arcX = (y) => px - R + Math.sqrt(R * R - y * y);
  const arc = [];
  for (let y = -70; y <= 70; y += 7) arc.push([arcX(y), y0 - y]);
  const tick = (x, y) => S.line(x, y - 4, x, y + 4, { w: 1.2 });
  const parts = [
    S.line(10, y0, 320, y0, { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }),
    S.path('M' + arc.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.5 }),
    ...[[px, 'P'], [px - f, 'F'], [px - R, 'C']].map(([x, n]) => S.circle(x, y0, 2.6, { fill: 'currentColor', sw: 0 }) + lab(x + (x === px ? 6 : 0), y0 + 15, n, { a: x === px ? 'start' : 'middle', w: 'bold' })),
    S.line(px - R, y0, arcX(55), y0 - 55, { c: 'var(--diagram-muted)', w: 1.2 }),
    lab(px - R + 50, y0 - 36, 'Radius R', { c: 'var(--diagram-muted)', a: 'middle' }),
    S.line(px - R, y0 + 34, px, y0 + 34, { c: 'var(--diagram-accent)', w: 1.2 }), tick(px - R, y0 + 34), tick(px, y0 + 34),
    lab(px - R / 2, y0 + 30, 'R = 2f', { a: 'middle', c: 'var(--diagram-accent)' }),
    S.line(px - f, y0 + 58, px, y0 + 58, { c: 'var(--diagram-blue)', w: 1.2 }), tick(px - f, y0 + 58), tick(px, y0 + 58),
    lab(px - f / 2, y0 + 54, 'f', { a: 'middle', c: 'var(--diagram-blue)', it: true }),
    lab(14, y0 - 6, 'Principal axis', { c: 'var(--diagram-muted)' }),
    lab(px - 14, 20, 'Concave mirror', { a: 'end' }),
  ];
  return svgDoc(330, 176, label, parts.join(''));
}
