// Painting engine for the SOYL portfolio plates (p5.brush standalone build).
// Every plate paints on white at 1920x1080; the deck lays HTML type and screenshots on top.
const W = 1920, H = 1080;
brush.createCanvas(W, H, { parent: document.body, pixelDensity: 1 });
brush.scaleBrushes(4.5);
brush.angleMode(brush.DEGREES);

// ---- pigments: Indian natural dyes plus iron-black ink ----
const PIG = {
  indigo: '#14294F', indigoMid: '#27467E', indigoPale: '#6F88B5',
  madder: '#A3302A', madderRose: '#C8645A',
  turmeric: '#DFA22A', turmericDeep: '#C2820F',
  green: '#5D7D39', greenPale: '#93A86A',
  henna: '#9A562A', hennaPale: '#C98B5A',
  ink: '#1B1A19', graphite: '#4A4744',
};

// ---- seeded random for geometry (brush keeps its own seed) ----
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let R = mulberry(1);
const rr = (a, b) => a + (b - a) * R();
const D2R = Math.PI / 180;

// ---- geometry ----
// organic pool: an ellipse whose radius wanders with a few low harmonics
function blob(cx, cy, rx, ry, o = {}) {
  const n = o.n || 72, amp = o.amp ?? 0.16, rot = (o.rot || 0) * D2R;
  const harm = o.harm || [2, 3, 5, 7];
  const ph = harm.map(() => R() * Math.PI * 2), am = harm.map((h, i) => amp * (0.55 + 0.9 * R()) / (1 + i * 0.7));
  const pts = [], c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    let m = 1; harm.forEach((h, k) => { m += am[k] * Math.sin(h * a + ph[k]); });
    const x = Math.cos(a) * rx * m, y = Math.sin(a) * ry * m;
    pts.push([cx + x * c - y * s, cy + x * s + y * c]);
  }
  return pts;
}
function centroid(pts) { let x = 0, y = 0; pts.forEach(p => { x += p[0]; y += p[1]; }); return [x / pts.length, y / pts.length]; }
function shrink(pts, k, dx = 0, dy = 0) { const [cx, cy] = centroid(pts); return pts.map(p => [cx + (p[0] - cx) * k + dx, cy + (p[1] - cy) * k + dy]); }

// ---- paint ops (each sets and resets its own state; brush state leaks otherwise) ----
function reset() { brush.noStroke(); brush.noFill(); brush.noWash(); brush.noHatch(); }
let SCATTER = false;
function water(pts, color, op = 170, bleed = 0.22, tex = 0.55, border = 0.5) {
  reset(); brush.fill(color, op); brush.fillBleed(bleed); brush.fillTexture(tex, border, SCATTER === 'auto' ? bleed <= 0.06 : SCATTER); brush.polygon(pts); reset();
}
function solid(pts, color, op = 255) { reset(); brush.wash(color, op); brush.polygon(pts); reset(); }
// a pool: body glaze, a second smaller glaze, and a dark pigment edge pass
function pool(cx, cy, rx, ry, color, o = {}) {
  const base = blob(cx, cy, rx, ry, o);
  water(base, color, o.op ?? 150, o.bleed ?? 0.26, o.tex ?? 0.6, o.border ?? 0.55);
  if ((o.layers ?? 2) > 1) water(shrink(blob(cx, cy, rx, ry, { ...o, amp: (o.amp ?? 0.16) * 1.2 }), 0.78, rx * 0.05, ry * 0.04), o.deep || color, o.op2 ?? 120, 0.3, 0.7, 0.6);
  if ((o.layers ?? 2) > 2) water(shrink(base, 0.5, -rx * 0.08, ry * 0.06), o.deep || color, o.op3 ?? 90, 0.35, 0.75, 0.5);
  return base;
}
function dab(x, y, r, color, op = 210, o = {}) {
  const pts = blob(x, y, r, r * (o.sq ?? 0.92), { n: 16, amp: o.amp ?? 0.1, harm: [2, 3], rot: rr(0, 180) });
  water(pts, color, op, o.bleed ?? 0.12, 0.55, 0.45);
  return pts;
}
function line(pts, name, color, w, curv = 0.5) { reset(); brush.set(name, color, w); brush.spline(pts, curv); reset(); }
function seg(x1, y1, x2, y2, name, color, w) { reset(); brush.set(name, color, w); brush.line(x1, y1, x2, y2); reset(); }
// fine pen rays fanning out from a point (the logo's radial lines)
function rays(cx, cy, n, r0, r1, a0, a1, color = PIG.ink, w = 0.55, name = 'pen') {
  for (let i = 0; i < n; i++) {
    const a = (a0 + (a1 - a0) * (n === 1 ? 0.5 : i / (n - 1)) + rr(-0.6, 0.6)) * D2R;
    const s = r0 * rr(0.9, 1.15), e = rr(r1 * 0.55, r1);
    seg(cx + Math.cos(a) * s, cy + Math.sin(a) * s, cx + Math.cos(a) * e, cy + Math.sin(a) * e, name, color, w * rr(0.8, 1.2));
  }
}
// hatched area clipped to a polygon
function hatchArea(pts, dist, ang, color = PIG.ink, w = 0.5, name = 'pen', rand = 0.2) {
  reset(); brush.hatch(dist, ang, { rand, continuous: false, gradient: 0.2 }); brush.hatchStyle(name, color, w); brush.polygon(pts); reset();
}
// dry-brush arc (charcoal) along a circle, pressure falling off at the tail
function dryArc(cx, cy, r, a0, a1, color = PIG.ink, w = 3, name = 'charcoal', wob = 0.03) {
  const pts = []; const n = 36;
  for (let i = 0; i <= n; i++) { const t = i / n; const a = (a0 + (a1 - a0) * t) * D2R; const rad = r * (1 + rr(-wob, wob));
    pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, 1.25 - 0.85 * t]); }
  line(pts, name, color, w, 0.6);
}

// ---- strokes and panels ----
// polyline sampled along a quadratic-ish path through control points (Catmull-Rom)
function path(ctrl, n = 80) {
  const P = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]], out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1) * (ctrl.length - 1), k = Math.min(Math.floor(t), ctrl.length - 2), u = t - k;
    const p0 = P[k], p1 = P[k + 1], p2 = P[k + 2], p3 = P[k + 3];
    const f = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}
function normals(pts) {
  return pts.map((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; });
}
// a flat-brush sweep: a ribbon along a path, width tapering at both ends, ragged edges
function sweepShape(ctrl, width, o = {}) {
  const pts = path(ctrl, o.n || 90), nm = normals(pts), L = [], Rt = [];
  const ph = [R() * 6.28, R() * 6.28, R() * 6.28];
  pts.forEach((p, i) => {
    const t = i / (pts.length - 1);
    const taper = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * (0.04 + t * 0.92)), o.taper ?? 0.35);
    const rag = 1 + (o.rag ?? 0.06) * (Math.sin(t * 23 + ph[0]) + 0.6 * Math.sin(t * 57 + ph[1]) + 0.3 * Math.sin(t * 131 + ph[2]));
    const w = width / 2 * taper;
    L.push([p[0] + nm[i][0] * w * rag, p[1] + nm[i][1] * w * rag]);
    const rag2 = 1 + (o.rag ?? 0.06) * (Math.sin(t * 19 + ph[2]) + 0.6 * Math.sin(t * 61 + ph[0]));
    Rt.push([p[0] - nm[i][0] * w * rag2, p[1] - nm[i][1] * w * rag2]);
  });
  return L.concat(Rt.reverse());
}
function sweep(ctrl, width, color, o = {}) {
  const shp = sweepShape(ctrl, width, o);
  water(shp, color, o.op ?? 228, o.bleed ?? 0.1, o.tex ?? 0.45, o.border ?? 0.55);
  for (let k = 1; k < (o.layers ?? 3); k++) {
    const c2 = ctrl.map(p => [p[0] + rr(-width * 0.06, width * 0.06), p[1] + rr(-width * 0.06, width * 0.06)]);
    water(sweepShape(c2, width * (1 - 0.14 * k), o), o.deep || color, (o.op2 ?? 175) - k * 10, 0.1, 0.5, 0.55);
  }
  return shp;
}
// a painted panel: a rectangle with ragged, brushed edges
function panelShape(x, y, w, h, rag = 10) {
  const pts = [], per = 2 * (w + h), n = Math.round(per / 14);
  const ph = [R() * 6.28, R() * 6.28];
  for (let i = 0; i < n; i++) {
    const d = i / n * per; let px, py, nx, ny;
    if (d < w) { px = x + d; py = y; nx = 0; ny = -1; }
    else if (d < w + h) { px = x + w; py = y + d - w; nx = 1; ny = 0; }
    else if (d < 2 * w + h) { px = x + w - (d - w - h); py = y + h; nx = 0; ny = 1; }
    else { px = x; py = y + h - (d - 2 * w - h); nx = -1; ny = 0; }
    const j = rag * (0.6 * Math.sin(d * 0.017 + ph[0]) + 0.35 * Math.sin(d * 0.061 + ph[1]) + 0.15 * Math.sin(d * 0.19 + ph[0] * 2));
    pts.push([px + nx * j, py + ny * j]);
  }
  return pts;
}
function panel(x, y, w, h, color, o = {}) {
  const shp = panelShape(x, y, w, h, o.rag ?? 12);
  water(shp, color, o.op ?? 228, o.bleed ?? 0.08, o.tex ?? 0.45, o.border ?? 0.6);
  for (let k = 1; k < (o.layers ?? 3); k++)
    water(panelShape(x + rr(-14, 14) + w * 0.03 * k, y + rr(-14, 14) + h * 0.03 * k, w * (1 - 0.07 * k), h * (1 - 0.08 * k), (o.rag ?? 12) * 1.3),
      o.deep || color, (o.op2 ?? 170) - 15 * k, 0.08, 0.5, 0.55);
  return shp;
}
// dry bristle brush: many fine lines along one path, breaking up as the brush runs dry
function bristle(ctrl, width, color, o = {}) {
  const pts = path(ctrl, o.n || 120), nm = normals(pts);
  const nb = o.bristles || 34, name = o.name || 'pen', w = o.w ?? 0.9, dry = o.dry ?? 0.55;
  for (let b = 0; b < nb; b++) {
    const off = (b / (nb - 1) - 0.5) * width * rr(0.9, 1.1);
    const lag = rr(0, 0.08), stop = 1 - rr(0, dry * 0.35);
    let cur = [];
    for (let i = 0; i < pts.length; i++) {
      const t = i / (pts.length - 1);
      if (t < lag || t > stop) continue;
      const taper = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.02)), 0.25);
      const gapP = dry * Math.pow(t, 1.6) * 0.9;
      if (R() < gapP * 0.35) { if (cur.length > 2) line(cur, name, color, w * rr(0.7, 1.3), 0.4); cur = []; continue; }
      cur.push([pts[i][0] + nm[i][0] * off * taper, pts[i][1] + nm[i][1] * off * taper]);
    }
    if (cur.length > 2) line(cur, name, color, w * rr(0.7, 1.3), 0.4);
  }
}
// an opaque ink body with a watercolor glaze on top (ink reads too pale as a glaze alone)
function inkBody(pts, color = PIG.ink, glaze = '#2A2826') { solid(pts, color, 235); water(pts, glaze, 200, 0.06, 0.8, 0.7); }

// ---- plate runner ----
const PLATES = {};
window.renderPlate = (name, opts = {}) => {
  const t0 = performance.now();
  R = mulberry(opts.seed ?? 7);
  brush.seed(opts.seed ?? 7); brush.noiseSeed(opts.seed ?? 7);
  brush.clear('#ffffff');
  brush.push(); brush.translate(-W / 2, -H / 2);
  PLATES[name](opts);
  brush.pop(); brush.render();
  const url = document.querySelector('canvas').toDataURL('image/png');
  return { url, ms: performance.now() - t0 };
};
