// Shared module for ICSE 10 Geography ch01, ch02 and ch03: ONE IMAGINED practice toposheet, built entirely in code.
// The same file is copied unchanged into each chapter's src folder.
//
// INTEGRITY NOTES. The area is IMAGINED. It is not a real place and it is not copied, traced or imitated from any Survey of India
// sheet or any other map. The terrain is a height function h(E, N) in metres written below (a base surface that falls to the
// south-east, a conical hill, a ridge, an escarpment and gentle knolls). Contours are generated from h by marching squares.
// The river and its tributaries are found by steepest descent of h and a valley is carved along each one, so contours bend
// upstream. All features sit at fixed (E, N) coordinates in this file. Every answer used in the chapters (grid references,
// heights, distances, areas, directions, flow, settlement pattern, land use) is COMPUTED here or in the chapters from this data
// and asserted in SELF_CHECKS. Colours follow the usual conventions of topographical sheets (yellow cultivated land, green forest,
// white uncultivated land, blue water, brown contours, black settlements and tracks, red metalled roads); the legend is our own.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);

// ---------------------------------------------------------------- the grid and the scale
export const SHEET_TITLE = 'SOYL practice sheet — IMAGINED AREA (not a real place, not a Survey of India sheet)';
export const E_MIN = 40;
export const E_MAX = 50;
export const N_MIN = 70;
export const N_MAX = 80;
export const PX_PER_KM = 60; // each 1 km grid square is 60 px on the full sheet
export const KM_PER_CM = 0.5; // scale statement: 1 cm on the sheet to 0.5 km on the ground
export const SCALE_STATEMENT = '1 cm to 0.5 km';
export const RF_DENOM = 50000; // representative fraction 1 : 50 000
export const CM_PER_SQUARE = 1 / KM_PER_CM; // each 1 km square is 2 cm on a printed sheet
export const CI = 20; // contour interval in metres
export const INDEX_EVERY = 100; // index contours every 100 m

check(RF_DENOM === Math.round((KM_PER_CM * 100000) / 1), `scale: 1 cm to ${KM_PER_CM} km is ${KM_PER_CM * 100000} cm to 1 cm, so the RF is 1 : ${RF_DENOM}`);
check(CM_PER_SQUARE === 2 && PX_PER_KM === 60, 'scale: one 1 km grid square is 2 cm on the printed sheet and 60 px in the drawings');

// ---------------------------------------------------------------- terrain (local coordinates x = E - 40, y = N - 70, in km)
const gauss = (x, y, cx, cy, sa, sb, deg, A) => {
  const t = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  const u = dx * Math.cos(t) + dy * Math.sin(t);
  const v = -dx * Math.sin(t) + dy * Math.cos(t);
  return A * Math.exp(-((u * u) / (2 * sa * sa) + (v * v) / (2 * sb * sb)));
};
const sig = (z) => 1 / (1 + Math.exp(-z));
// Escarpment: a finite line through (ESC.p) and (ESC.q); ground to the east of the line is raised by ESC.A over a steep face.
const ESC = { px: 8.15, py: 9.2, qx: 8.55, qy: 4.0, A: 120, w: 0.2 };
function terrain(x, y) {
  let h = 170 + 12 * y - 8 * x;
  h += gauss(x, y, 6.2, 8.3, 0.95, 0.95, 0, 250); // conical hill
  h += gauss(x, y, 2.3, 8.0, 2.1, 0.5, 18, 150); // ridge (long axis west-south-west to east-north-east)
  h += gauss(x, y, 3.9, 4.6, 0.8, 0.8, 0, 30) + gauss(x, y, 6.4, 3.4, 0.9, 0.9, 0, 34) + gauss(x, y, 1.7, 3.2, 0.9, 0.7, 0, 28) + gauss(x, y, 5.2, 1.4, 0.8, 0.8, 0, -16);
  const L = Math.hypot(ESC.qx - ESC.px, ESC.qy - ESC.py);
  const along = ((x - ESC.px) * (ESC.qx - ESC.px) + (y - ESC.py) * (ESC.qy - ESC.py)) / L; // distance along the line from p
  const d = ((x - ESC.px) * (ESC.qy - ESC.py) - (y - ESC.py) * (ESC.qx - ESC.px)) / L; // signed distance (negative east of the line)
  const env = sig((along + 0.0) / 0.5) * sig((L - along) / 0.5); // fades at both ends
  h += ESC.A * env * sig(-d / ESC.w);
  return h;
}

// ---------------------------------------------------------------- rivers: steepest descent, then a carved valley
const RIVER_DEFS = [
  { id: 'main', name: 'River Taravati (imagined)', src: [5.6, 6.9], seasonal: false, depth: 16, width: 0.32, depthB: 34, widthB: 1.7 },
  { id: 't1', name: 'Tributary 1', src: [3.4, 5.2], seasonal: false, depth: 10, width: 0.26, depthB: 16, widthB: 1.0 },
  { id: 't2', name: 'Tributary 2', src: [4.1, 6.9], seasonal: false, depth: 10, width: 0.26, depthB: 16, widthB: 1.0 },
  { id: 't3', name: 'Seasonal stream', src: [7.4, 7.0], seasonal: true, depth: 8, width: 0.22, depthB: 10, widthB: 0.7 },
];
const dist2seg = (px, py, ax, ay, bx, by) => {
  const vx = bx - ax;
  const vy = by - ay;
  const L2 = vx * vx + vy * vy;
  let t = L2 ? ((px - ax) * vx + (py - ay) * vy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * vx;
  const cy = ay + t * vy;
  return { d: Math.hypot(px - cx, py - cy), s: t };
};
function carveOf(river, x, y) {
  // river: { pts (resampled), cum (distance along), depth, width }
  let best = 1e9;
  let bs = 0;
  const p = river.pts;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i];
    const b = p[i + 1];
    if (Math.abs(x - a[0]) > 7 && Math.abs(x - b[0]) > 7) continue;
    if (Math.abs(y - a[1]) > 7 && Math.abs(y - b[1]) > 7) continue;
    const r = dist2seg(x, y, a[0], a[1], b[0], b[1]);
    if (r.d < best) {
      best = r.d;
      bs = river.cum[i] + r.s * (river.cum[i + 1] - river.cum[i]);
    }
  }
  if (best > 4 * river.widthB) return 0;
  const taper = Math.min(1, bs / 1.2);
  return taper * (river.depth * Math.exp(-((best / river.width) ** 2)) + river.depthB * Math.exp(-((best / river.widthB) ** 2)));
}
function heightWith(rivers) {
  return (x, y) => {
    let c = 0;
    for (const r of rivers) c = Math.max(c, carveOf(r, x, y));
    return terrain(x, y) - c;
  };
}
const grad = (f, x, y, e = 0.01) => [(f(x + e, y) - f(x - e, y)) / (2 * e), (f(x, y + e) - f(x, y - e)) / (2 * e)];
function resample(pts, step) {
  const out = [pts[0]];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc >= step) {
      out.push(pts[i]);
      acc = 0;
    }
  }
  if (out.at(-1) !== pts.at(-1)) out.push(pts.at(-1));
  return out;
}
const withCum = (pts) => {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return cum;
};
function descend(f, x, y, joinTo) {
  const pts = [[x, y]];
  for (let i = 0; i < 4000; i++) {
    const [gx, gy] = grad(f, x, y);
    const n = Math.hypot(gx, gy);
    if (n < 1e-6) break;
    x -= (0.02 * gx) / n;
    y -= (0.02 * gy) / n;
    pts.push([x, y]);
    if (x <= 0 || x >= 10 || y <= 0 || y >= 10) {
      x = Math.max(0, Math.min(10, x));
      y = Math.max(0, Math.min(10, y));
      pts[pts.length - 1] = [x, y];
      return { pts, joined: null };
    }
    if (joinTo && pts.length > 12) {
      for (const r of joinTo) {
        for (let k = 0; k < r.pts.length; k++) {
          if (Math.hypot(x - r.pts[k][0], y - r.pts[k][1]) < 0.045) {
            pts.push([r.pts[k][0], r.pts[k][1]]);
            return { pts, joined: { river: r.id, index: k } };
          }
        }
      }
    }
  }
  return { pts, joined: null };
}
const RIVERS = [];
for (const def of RIVER_DEFS) {
  const f = heightWith(RIVERS);
  const r = descend(f, def.src[0], def.src[1], RIVERS.length ? RIVERS : null);
  const pts = resample(r.pts, 0.03);
  RIVERS.push({ ...def, pts, cum: withCum(pts), joined: r.joined });
}
const hLocal = heightWith(RIVERS);
/** Height of the ground in metres at map coordinates (E, N). */
export const height = (E, N) => hLocal(E - E_MIN, N - N_MIN);
/** Slope in metres per km at (E, N). */
export const slope = (E, N) => {
  const [gx, gy] = grad(hLocal, E - E_MIN, N - N_MIN, 0.05);
  return Math.hypot(gx, gy);
};
/** Rivers in map coordinates: [{ id, name, seasonal, pts:[[E,N]…] (source to mouth), joined }] */
export const STREAMS = RIVERS.map((r) => ({ id: r.id, name: r.name, seasonal: r.seasonal, joined: r.joined, pts: r.pts.map(([x, y]) => [x + E_MIN, y + N_MIN]) }));
export const streamLen = (s) => s.pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - s.pts[i - 1][0], p[1] - s.pts[i - 1][1]) : 0), 0);

// ---------------------------------------------------------------- contours by marching squares
const STEP = 0.05;
const NX = Math.round((E_MAX - E_MIN) / STEP) + 1;
const NY = Math.round((N_MAX - N_MIN) / STEP) + 1;
const Z = [];
let zmin = 1e9;
let zmax = -1e9;
for (let j = 0; j < NY; j++) {
  const row = new Float64Array(NX);
  for (let i = 0; i < NX; i++) {
    row[i] = hLocal(i * STEP, j * STEP);
    zmin = Math.min(zmin, row[i]);
    zmax = Math.max(zmax, row[i]);
  }
  Z.push(row);
}
export const H_MIN = zmin;
export const H_MAX = zmax;
export const LEVELS = [];
for (let L = Math.ceil((zmin + 1) / CI) * CI; L < zmax; L += CI) LEVELS.push(L);

function contourLines(level) {
  const L = level + 1e-6;
  const pt = (key) => {
    const [k, i, j] = key;
    if (k === 'h') {
      const a = Z[j][i];
      const b = Z[j][i + 1];
      const t = (L - a) / (b - a);
      return [(i + t) * STEP, j * STEP];
    }
    const a = Z[j][i];
    const b = Z[j + 1][i];
    const t = (L - a) / (b - a);
    return [i * STEP, (j + t) * STEP];
  };
  const adj = new Map();
  const link = (k1, k2) => {
    const a = k1.join(',');
    const b = k2.join(',');
    if (!adj.has(a)) adj.set(a, { key: k1, n: [] });
    if (!adj.has(b)) adj.set(b, { key: k2, n: [] });
    adj.get(a).n.push(b);
    adj.get(b).n.push(a);
  };
  for (let j = 0; j < NY - 1; j++)
    for (let i = 0; i < NX - 1; i++) {
      const v = [Z[j][i], Z[j][i + 1], Z[j + 1][i + 1], Z[j + 1][i]]; // sw, se, ne, nw
      const code = (v[0] > L ? 1 : 0) | (v[1] > L ? 2 : 0) | (v[2] > L ? 4 : 0) | (v[3] > L ? 8 : 0);
      if (code === 0 || code === 15) continue;
      const bottom = ['h', i, j];
      const top = ['h', i, j + 1];
      const left = ['v', i, j];
      const right = ['v', i + 1, j];
      const segs = {
        1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[right, top]], 6: [[bottom, top]], 7: [[left, top]],
        8: [[left, top]], 9: [[bottom, top]], 11: [[right, top]], 12: [[left, right]], 13: [[bottom, right]], 14: [[left, bottom]],
      };
      if (code === 5 || code === 10) {
        const c = (v[0] + v[1] + v[2] + v[3]) / 4 > L;
        const s = code === 5 ? (c ? [[left, top], [bottom, right]] : [[left, bottom], [right, top]]) : c ? [[left, bottom], [right, top]] : [[left, top], [bottom, right]];
        for (const [a, b] of s) link(a, b);
      } else for (const [a, b] of segs[code]) link(a, b);
    }
  const seen = new Set();
  const lines = [];
  const walk = (startKey) => {
    const out = [];
    let prev = null;
    let cur = startKey;
    while (cur && !seen.has(cur)) {
      seen.add(cur);
      out.push(pt(adj.get(cur).key));
      const nx = adj.get(cur).n.find((k) => k !== prev && !seen.has(k));
      prev = cur;
      cur = nx;
      if (!cur) break;
    }
    return out;
  };
  for (const [k, v] of adj) if (v.n.length === 1 && !seen.has(k)) lines.push({ pts: walk(k), closed: false });
  for (const [k] of adj) if (!seen.has(k)) lines.push({ pts: walk(k), closed: true });
  return lines;
}
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let m = -1;
    let md = 0;
    for (let i = a + 1; i < b; i++) {
      const d = dist2seg(pts[i][0], pts[i][1], pts[a][0], pts[a][1], pts[b][0], pts[b][1]).d;
      if (d > md) {
        md = d;
        m = i;
      }
    }
    if (md > tol && m > 0) {
      keep[m] = true;
      stack.push([a, m], [m, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}
/** Contours: [{ level, index (bool), lines:[{ pts:[[E,N]…], closed }] }] */
export const CONTOURS = LEVELS.map((level) => ({
  level,
  index: level % INDEX_EVERY === 0,
  lines: contourLines(level)
    .map((l) => {
      let pts = dp(l.pts, 0.006);
      if (l.closed) pts = [...pts, pts[0]];
      return { closed: l.closed, pts: pts.map(([x, y]) => [x + E_MIN, y + N_MIN]) };
    })
    .filter((l) => l.pts.length >= 3),
}));

export const polyLen = (pts) => pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);
// ---------------------------------------------------------------- colours and small helpers
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const GRN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BRN = 'var(--diagram-brown)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const FIL = 'var(--diagram-fill)';
const INK = 'currentColor';
const f1 = (n) => (Math.round(n * 10) / 10).toString();

// ---------------------------------------------------------------- grid references, distance, direction (all computed)
export const pad2 = (n) => String(n).padStart(2, '0');
/** Four-figure grid reference of the square containing (E, N): easting first, then northing. */
export const fourFig = (E, N) => `${pad2(Math.floor(E + 1e-9))}${pad2(Math.floor(N + 1e-9))}`;
/** Six-figure grid reference: easting (2 digits + tenths) then northing (2 digits + tenths), tenths read from the south-west corner. */
export const sixFig = (E, N) => `${Math.floor(Math.round(E * 100) / 10)}${Math.floor(Math.round(N * 100) / 10)}`;
export const sixFigSp = (E, N) => `${Math.floor(Math.round(E * 100) / 10)} ${Math.floor(Math.round(N * 100) / 10)}`;
/** South-west corner [E, N] of a four-figure square. */
export const squareCorner = (ref) => [Number(ref.slice(0, 2)), Number(ref.slice(2, 4))];
export const dist = (a, b) => Math.hypot(a.E - b.E, a.N - b.N);
export const COMPASS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
/** Bearing in degrees clockwise from grid north, from a to b. */
export const bearing = (a, b) => ((Math.atan2(b.E - a.E, b.N - a.N) * 180) / Math.PI + 360) % 360;
export const compass8 = (deg) => COMPASS[Math.round(deg / 45) % 8];
/** Angular distance from the nearest boundary between two compass points (degrees; boundaries lie at 22.5, 67.5, ...). */
export const compassMargin = (deg) => Math.abs(22.5 - (((deg % 45) + 45) % 45));
export const directionOf = (a, b) => compass8(bearing(a, b));
export const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const round1 = (x) => Math.round(x * 10) / 10;
/** Real distance in km from a length in cm on the sheet, and back. */
export const cmToKm = (cm) => cm * KM_PER_CM;
export const kmToCm = (km) => km / KM_PER_CM;

// ---------------------------------------------------------------- drawing
const inRect = (E, N, r, pad = 0) => E >= r.e0 - pad && E <= r.e1 + pad && N >= r.n0 - pad && N <= r.n1 + pad;
/** Clips a polyline (map units) to a rectangle (Liang-Barsky per segment); returns an array of polylines. */
export function clipLine(pts, r) {
  const out = [];
  let cur = null;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const dx = bx - ax;
    const dy = by - ay;
    let t0 = 0;
    let t1 = 1;
    let ok = true;
    for (const [p, q] of [[-dx, ax - r.e0], [dx, r.e1 - ax], [-dy, ay - r.n0], [dy, r.n1 - ay]]) {
      if (p === 0) {
        if (q < 0) ok = false;
      } else {
        const t = q / p;
        if (p < 0) t0 = Math.max(t0, t);
        else t1 = Math.min(t1, t);
      }
    }
    if (!ok || t0 > t1) {
      cur = null;
      continue;
    }
    const s = [ax + t0 * dx, ay + t0 * dy];
    const e = [ax + t1 * dx, ay + t1 * dy];
    if (!cur || t0 > 0) {
      cur = [s];
      out.push(cur);
    }
    cur.push(e);
    if (t1 < 1) cur = null;
  }
  return out;
}
function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}
function inPoly(E, N, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > N !== yj > N && E < ((xj - xi) * (N - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const chaikin = (pts, n = 2) => {
  let p = pts;
  for (let k = 0; k < n; k++) {
    const q = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      q.push([0.75 * p[i][0] + 0.25 * p[i + 1][0], 0.75 * p[i][1] + 0.25 * p[i + 1][1]], [0.25 * p[i][0] + 0.75 * p[i + 1][0], 0.25 * p[i][1] + 0.75 * p[i + 1][1]]);
    }
    q.push(p.at(-1));
    p = q;
  }
  return p;
};

// ---------------------------------------------------------------- features (fixed map coordinates)
const distToLine = (E, N, pts) => {
  let b = 1e9;
  for (let i = 0; i < pts.length - 1; i++) b = Math.min(b, dist2seg(E, N, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]).d);
  return b;
};
/** Centre of the 0.1 km cell that contains v (so a six-figure reference is never on a cell edge). */
const snap5 = (v) => Math.round((v - 0.05) * 10) / 10 + 0.05;
const MAIN = STREAMS.find((s) => s.id === 'main');
const mkTank = (name, cx, cy, rx, ry, deg) => {
  const t = (deg * Math.PI) / 180;
  const pts = [];
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * 2 * Math.PI;
    const f = 1 + 0.1 * Math.sin(3 * a + 1) + 0.05 * Math.sin(5 * a);
    const x = rx * f * Math.cos(a);
    const y = ry * f * Math.sin(a);
    pts.push([cx + x * Math.cos(t) - y * Math.sin(t), cy + x * Math.sin(t) + y * Math.cos(t)]);
  }
  return { name, cx, cy, pts };
};
export const TANKS = [mkTank('Sonakhedi tank', 42.5, 71.9, 0.3, 0.17, -25)];

export const CULT_MAX = 200; // below this height: cultivated land
export const FOREST_MIN = 280; // from this height up: forest
export const landClassAt = (E, N) => {
  if (TANKS.some((t) => inPoly(E, N, t.pts))) return 'water';
  const hh = height(E, N);
  return hh >= FOREST_MIN ? 'forest' : hh >= CULT_MAX ? 'scrub' : 'cult';
};
const LU = new Array(100 * 100);
for (let j = 0; j < 100; j++) for (let i = 0; i < 100; i++) LU[j * 100 + i] = landClassAt(E_MIN + (i + 0.5) / 10, N_MIN + (j + 0.5) / 10);
const LU_CELL = (i, j) => (i < 400 || i >= 500 || j < 700 || j >= 800 ? 'none' : LU[(j - 700) * 100 + (i - 400)]);

// roads and tracks (waypoints are smoothed); canal traced along a contour; embankment beside the tank
const way = (type, id, name, wp, smooth = 2) => ({ type, id, name, pts: smooth ? chaikin(wp, smooth) : wp });
function traceCanal(E, N, toward, steps, fall = 1.0, ds = 0.05) {
  const H0 = height(E, N);
  const pts = [[E, N]];
  let s = 0;
  let sign = 0;
  for (let i = 0; i < steps; i++) {
    const [gx, gy] = grad((x, y) => height(x + E_MIN, y + N_MIN), E - E_MIN, N - N_MIN, 0.02);
    const n = Math.hypot(gx, gy);
    const tx = -gy / n;
    const ty = gx / n;
    if (!sign) sign = (toward[0] - E) * tx + (toward[1] - N) * ty >= 0 ? 1 : -1;
    let nE = E + sign * ds * tx;
    let nN = N + sign * ds * ty;
    s += ds;
    for (let r = 0; r < 3; r++) {
      const [ax, ay] = grad((x, y) => height(x + E_MIN, y + N_MIN), nE - E_MIN, nN - N_MIN, 0.02);
      const nn = ax * ax + ay * ay;
      const dh = height(nE, nN) - (H0 - fall * s);
      nE -= (dh * ax) / nn;
      nN -= (dh * ay) / nn;
    }
    E = nE;
    N = nN;
    if (E < E_MIN + 0.1 || E > E_MAX - 0.1 || N < N_MIN + 0.1 || N > N_MAX - 0.1) break;
    pts.push([E, N]);
  }
  return pts;
}
const canalPts = (() => {
  // the head works start on the river bank, at the river point nearest (45.55, 75.58)
  let best = MAIN.pts[0];
  for (const p of MAIN.pts) if (Math.hypot(p[0] - 45.55, p[1] - 75.58) < Math.hypot(best[0] - 45.55, best[1] - 75.58)) best = p;
  return traceCanal(best[0], best[1], [44.5, 73.5], 80, 1.2);
})();

export const LINEAR = [
  way('metalled', 'M1', 'Metalled road', [[40, 72.85], [41.5, 72.7], [42.7, 72.4], [43.7, 72.45], [45.0, 72.8], [46.0, 73.25], [46.6, 73.5], [47.5, 73.35], [48.3, 72.7], [49.0, 71.9], [50, 71.45]]),
  way('unmetalled', 'U1', 'Unmetalled road', [[43.1, 72.5], [43.25, 73.4], [43.8, 74.3], [44.5, 74.85], [45.4, 74.5], [46.0, 74.1], [46.55, 73.75]]),
  way('cart', 'C1', 'Cart track', [[43.15, 72.3], [43.6, 71.6], [44.5, 71.2], [45.3, 70.7], [45.5, 70.0]]),
  way('cart', 'C2', 'Cart track', [[46.65, 73.3], [46.5, 72.5], [46.2, 71.6], [46.3, 70.0]]),
  way('pack', 'P1', 'Pack track', [[44.7, 75.55], [44.2, 76.3], [43.7, 76.9], [43.2, 77.45], [42.6, 77.8]], 1),
  way('foot', 'F1', 'Footpath', [[44.9, 75.0], [45.4, 75.0], [45.9, 74.75], [46.35, 74.65]], 1),
  way('foot', 'F2', 'Footpath', [[46.85, 73.95], [47.2, 74.35], [47.5, 74.7]], 1),
  { type: 'canal', id: 'K1', name: 'Canal', pts: canalPts },
  { type: 'embankment', id: 'B1', name: 'Embankment', pts: (() => TANKS[0].pts.slice(0, 7).map(([E, N]) => [TANKS[0].cx + (E - TANKS[0].cx) * 1.22, TANKS[0].cy + (N - TANKS[0].cy) * 1.22 - 0.0]))() },
];
const segsIntersect = (a, b, c, d) => {
  const r = [b[0] - a[0], b[1] - a[1]];
  const s2 = [d[0] - c[0], d[1] - c[1]];
  const den = r[0] * s2[1] - r[1] * s2[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((c[0] - a[0]) * s2[1] - (c[1] - a[1]) * s2[0]) / den;
  const u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { E: a[0] + t * r[0], N: a[1] + t * r[1], ang: Math.atan2(r[0], r[1]) };
};
/** Bridges: where the metalled road crosses the river (computed intersection). */
export const BRIDGES = (() => {
  const road = LINEAR.find((l) => l.id === 'M1').pts;
  const out = [];
  for (let i = 0; i < road.length - 1; i++)
    for (let j = 0; j < MAIN.pts.length - 1; j++) {
      const x = segsIntersect(road[i], road[i + 1], MAIN.pts[j], MAIN.pts[j + 1]);
      if (x) out.push({ E: x.E, N: x.N, ang: Math.atan2(MAIN.pts[j + 1][0] - MAIN.pts[j][0], MAIN.pts[j + 1][1] - MAIN.pts[j][1]) + Math.PI / 2 });
    }
  return out;
})();
const metalled = LINEAR.find((l) => l.id === 'M1').pts;

// villages (huts generated deterministically inside a disc) and dispersed huts
const mkVillage = (id, name, E, N, n, r, seed, labelDx, labelDy, anchor) => {
  const rnd = lcg(seed);
  const huts = [];
  let guard = 0;
  while (huts.length < n && guard++ < 5000) {
    const a = rnd() * 2 * Math.PI;
    const d = r * Math.sqrt(rnd());
    const hE = E + d * Math.cos(a) * 1.15;
    const hN = N + d * Math.sin(a) * 0.85;
    if (huts.some((q) => Math.hypot(q.E - hE, q.N - hN) < 0.075)) continue;
    if (distToLine(hE, hN, MAIN.pts) < 0.12 || distToLine(hE, hN, metalled) < 0.06) continue;
    if (TANKS.some((t) => inPoly(hE, hN, t.pts))) continue;
    if (Math.floor(hE) !== Math.floor(E) && false) continue;
    huts.push({ E: hE, N: hN });
  }
  return { id, name, E, N, r, huts, labelDx, labelDy, anchor };
};
export const VILLAGES = [
  mkVillage('nandiwadi', 'Nandiwadi', 46.6, 73.55, 17, 0.3, 11, 0, 0.5, 'middle'),
  mkVillage('sonakhedi', 'Sonakhedi', 43.1, 72.4, 15, 0.28, 23, -0.38, 0.3, 'end'),
  mkVillage('pathrali', 'Pathrali', 44.75, 75.05, 11, 0.22, 37, -0.3, -0.12, 'end'),
];
export const HUTS = [[40.9, 74.1], [41.9, 75.5], [42.3, 76.3], [41.3, 72.0], [41.4, 70.85], [44.6, 71.1], [49.3, 70.8], [49.3, 74.6], [43.5, 70.8], [42.3, 79.6], [43.9, 79.5], [49.5, 79.4]].map(([E, N], i) => ({ id: `hut${i + 1}`, E, N }));

// point features: kind, id, name, E, N (value = rounded height for trig and spot heights)
const hill = (() => {
  let best = { h: -1, E: 0, N: 0 };
  for (let E = 45; E <= 47.5; E += 0.05) for (let N = 77.5; N <= 79.5; N += 0.05) if (height(E, N) > best.h) best = { h: height(E, N), E, N };
  return best;
})();
const ridge = (() => {
  let best = { h: -1, E: 0, N: 0 };
  for (let E = 40.5; E <= 43.8; E += 0.05) for (let N = 77.2; N <= 79.4; N += 0.05) if (height(E, N) > best.h) best = { h: height(E, N), E, N };
  return best;
})();
const P = (kind, id, name, E, N) => ({ kind, id, name, E, N });
const tv = (kind, id, name, E, N) => ({ ...P(kind, id, name, E, N), value: Math.round(height(E, N)) });
export const POINTS = [
  P('temple', 'temple1', 'temple', 46.35, 74.65),
  P('well', 'well1', 'well', 43.55, 72.85),
  P('well', 'well2', 'well', 46.95, 73.25),
  P('well', 'well3', 'well', 44.45, 74.75),
  P('po', 'po1', 'post office', 46.85, 73.85),
  P('ps', 'ps1', 'police station', 46.45, 73.75),
  P('disp', 'disp1', 'dispensary', 43.15, 72.62),
  tv('trig', 'trig1', 'triangulated height', snap5(hill.E), snap5(hill.N)),
  tv('trig', 'trig2', 'triangulated height', snap5(ridge.E), snap5(ridge.N)),
  tv('spot', 'spot1', 'spot height', 49.15, 75.55),
  tv('spot', 'spot2', 'spot height', 47.85, 75.55),
  tv('spot', 'spot3', 'spot height', 43.45, 73.15),
  tv('spot', 'spot4', 'spot height', 45.05, 75.35),
  tv('spot', 'spot5', 'spot height', 41.05, 78.95),
  tv('spot', 'spot6', 'spot height', 44.45, 77.45),
  tv('spot', 'spot7', 'spot height', 46.55, 71.65),
  tv('spot', 'spot8', 'spot height', 40.85, 71.35),
  tv('spot', 'spot9', 'spot height', 48.65, 79.25),
  tv('spot', 'spot10', 'spot height', 45.65, 76.55),
  tv('spot', 'spot11', 'spot height', 49.25, 72.05),
];
export const FEATURE = (id) => POINTS.find((p) => p.id === id) ?? VILLAGES.find((v) => v.id === id) ?? HUTS.find((h) => h.id === id);

// open-scrub marks: short ticks at fixed positions on uncultivated, unforested ground
export const SCRUB_MARKS = [];
for (let j = 0; j < 50; j++)
  for (let i = 0; i < 50; i++) {
    if ((i * 7 + j * 13) % 4 !== 0) continue;
    const E = E_MIN + i / 5 + 0.1 + ((i * 31 + j * 17) % 5) * 0.012;
    const N = N_MIN + j / 5 + 0.1 + ((i * 11 + j * 23) % 5) * 0.012;
    if (landClassAt(E, N) === 'scrub') SCRUB_MARKS.push([E, N]);
  }

// ---------------------------------------------------------------- rendering
let RENDER_OK = 0;
let RENDER_BAD = 0;
const escT = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const STYLE = {
  metalled: { c: RED, w: 2.8 },
  unmetalled: { c: INK, w: 2, dash: '7 2.5' },
  cart: { c: INK, w: 1.2 },
  pack: { c: INK, w: 1.1, dash: '5 3' },
  foot: { c: INK, w: 1.1, dash: '1.2 3' },
};
/**
 * Draws a window of the sheet (the same drawing code makes the full sheet and every extract).
 * o: { e0, n0, w, h (window in squares), pk (px per km), marks:[{E,N,label}], names, labelsOn, spots, tints, legend, scalebar, title, desc }
 */
export function render(o = {}) {
  const { e0 = E_MIN, n0 = N_MIN, w = 10, h = 10, pk = PX_PER_KM, marks = [], names = true, legend = false, scalebar = true, title = null, spots = true, tints = true, labelsOn = true, abbr = true, desc = null } = o;
  const full = w === 10 && h === 10 && e0 === E_MIN && n0 === N_MIN;
  const k = Math.max(1, pk / PX_PER_KM);
  const kc = Math.min(k, 1.3);
  const R = { e0, e1: e0 + w, n0, n1: n0 + h };
  const ml = 34;
  const mr = 34;
  const mt = 54;
  const legendH = legend ? 190 : 0;
  const mb = (scalebar ? 78 : 26) + legendH;
  const W = ml + w * pk + mr;
  const H = mt + h * pk + mb;
  const X = (E) => ml + (E - e0) * pk;
  const Y = (N) => mt + (R.n1 - N) * pk;
  const P = (pts) => pts.map(([E, N]) => `${f1(X(E))} ${f1(Y(N))}`);
  const poly = (pts) => `M${P(pts).join(' L')}`;
  const lineD = (pts) => clipLine(pts, R).filter((sg) => sg.length > 1).map(poly).join('');
  let s = '';
  let tx = '';
  let sqD = '';
  const txt = (x, y, str, op = {}) => {
    tx += `<text x="${f1(x)}" y="${f1(y)}"${op.a ? ` text-anchor="${op.a}"` : ''}${op.size ? ` font-size="${op.size}"` : ''}${op.w ? ` font-weight="${op.w}"` : ''}${op.c ? ` fill="${op.c}"` : ''}>${escT(str)}</text>`;
    return '';
  };
  const sq = (x, y, size) => {
    sqD += `M${f1(x - size / 2)} ${f1(y - size / 2)}h${f1(size)}v${f1(size)}h${f1(-size)}z`;
  };
  // title
  const ttl = title ?? (full ? SHEET_TITLE : 'Extract of the SOYL imagined practice sheet');
  txt(W / 2, 18, ttl, { a: 'middle', size: full ? 12 : 11, w: 'bold' });
  txt(W / 2, 33, full ? 'Scale 1 cm to 0.5 km (RF 1 : 50 000). Contour interval 20 m. Grid squares are 1 km.' : 'IMAGINED area. Grid squares are 1 km; contour interval 20 m.', { a: 'middle', c: MUT });
  // land-use tints (cells of 0.1 km, merged into runs)
  if (tints) {
    for (const [cls, col, op] of [['cult', YEL, 0.32], ['forest', GRN, 0.34]]) {
      let d = '';
      for (let j = Math.round(R.n0 * 10); j < Math.round(R.n1 * 10); j++) {
        let run = null;
        for (let i = Math.round(R.e0 * 10); i <= Math.round(R.e1 * 10); i++) {
          const here = i < Math.round(R.e1 * 10) && LU_CELL(i, j) === cls;
          if (here && run === null) run = i;
          if (!here && run !== null) {
            d += `M${f1(X(run / 10))} ${f1(Y((j + 1) / 10))}h${f1(((i - run) / 10) * pk)}v${f1(0.1 * pk)}h${f1((-(i - run) / 10) * pk)}z`;
            run = null;
          }
        }
      }
      if (d) s += `<path d="${d}" fill="${col}" fill-opacity="${op}" stroke="none"/>`;
    }
    let d = '';
    for (const [E, N] of SCRUB_MARKS) if (inRect(E, N, R, -0.05)) d += `M${f1(X(E) - 1.6 * k)} ${f1(Y(N))}h${f1(3.2 * k)}`;
    if (d) s += `<path d="${d}" fill="none" stroke="${GRN}" stroke-width="1" stroke-opacity="0.85"/>`;
  }
  // tanks
  for (const t of TANKS) if (t.pts.some(([E, N]) => inRect(E, N, R))) s += `<path d="${poly(t.pts)}z" fill="${BLUE}" fill-opacity="0.5" stroke="${BLUE}" stroke-width="1"/>`;
  // grid lines
  let gd = '';
  for (let E = Math.ceil(R.e0); E <= R.e1; E++) gd += `M${f1(X(E))} ${f1(Y(R.n1))}V${f1(Y(R.n0))}`;
  for (let N = Math.ceil(R.n0); N <= R.n1; N++) gd += `M${f1(X(R.e0))} ${f1(Y(N))}H${f1(X(R.e1))}`;
  s += `<path d="${gd}" fill="none" stroke="${INK}" stroke-width="0.6" stroke-opacity="0.38"/>`;
  // contours
  const labelCands = new Map();
  for (const c of CONTOURS) {
    let d = '';
    for (const l of c.lines)
      for (const seg of clipLine(l.pts, R)) {
        if (seg.length < 2) continue;
        d += poly(seg);
        if (c.index && labelsOn) {
          const arr = labelCands.get(c.level) ?? [];
          arr.push({ seg, len: polyLen(seg) });
          labelCands.set(c.level, arr);
        }
      }
    if (d) s += `<path d="${d}" fill="none" stroke="${BRN}" stroke-width="${f1((c.index ? 1.35 : 0.8) * kc)}"/>`;
  }
  // drainage
  for (const st of STREAMS) {
    const d = lineD(dp(st.pts, 0.004));
    if (d) s += `<path d="${d}" fill="none" stroke="${BLUE}" stroke-width="${f1((st.id === 'main' ? 2 : 1.4) * kc)}"${st.seasonal ? ' stroke-dasharray="5 3"' : ''} stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  // canal and embankment
  for (const l of LINEAR) {
    if (l.type === 'canal') {
      const d = lineD(l.pts);
      if (d) s += `<path d="${d}" fill="none" stroke="${BLUE}" stroke-width="${f1(3.4 * kc)}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${FIL}" stroke-width="${f1(1.2 * kc)}" stroke-linejoin="round"/>`;
    } else if (l.type === 'embankment') {
      const d = lineD(l.pts);
      if (!d) continue;
      s += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
      let t = '';
      for (const seg of clipLine(l.pts, R))
        for (let i = 0; i < seg.length - 1; i++) {
          const len = Math.hypot(seg[i + 1][0] - seg[i][0], seg[i + 1][1] - seg[i][1]);
          if (len < 1e-9) continue;
          const n = Math.max(1, Math.round(len / 0.07));
          for (let m = 0; m < n; m++) {
            const u = (m + 0.5) / n;
            const E = seg[i][0] + u * (seg[i + 1][0] - seg[i][0]);
            const N = seg[i][1] + u * (seg[i + 1][1] - seg[i][1]);
            const nx = -(seg[i + 1][1] - seg[i][1]) / len;
            const ny = (seg[i + 1][0] - seg[i][0]) / len;
            t += `M${f1(X(E))} ${f1(Y(N))}l${f1(nx * 4.5)} ${f1(-ny * 4.5)}`;
          }
        }
      s += `<path d="${t}" fill="none" stroke="${INK}" stroke-width="1"/>`;
    }
  }
  // roads and tracks
  for (const l of LINEAR) {
    const st = STYLE[l.type];
    if (!st) continue;
    const d = lineD(l.pts);
    if (d) s += `<path d="${d}" fill="none" stroke="${st.c}" stroke-width="${f1(st.w * kc)}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ''} stroke-linejoin="round"/>`;
  }
  for (const b of BRIDGES) if (inRect(b.E, b.N, R)) s += `<path d="M${f1(X(b.E) - 5 * k * Math.sin(b.ang))} ${f1(Y(b.N) - 5 * k * Math.cos(b.ang))}L${f1(X(b.E) + 5 * k * Math.sin(b.ang))} ${f1(Y(b.N) + 5 * k * Math.cos(b.ang))}" fill="none" stroke="${INK}" stroke-width="3.4"/>`;
  // huts and village names
  for (const v of VILLAGES) for (const hut of v.huts) if (inRect(hut.E, hut.N, R)) sq(X(hut.E), Y(hut.N), 3.2 * k);
  for (const hut of HUTS) if (inRect(hut.E, hut.N, R)) sq(X(hut.E), Y(hut.N), 3.2 * k);
  if (names) for (const v of VILLAGES) if (inRect(v.E + v.labelDx, v.N + v.labelDy, R, -0.3)) txt(X(v.E + v.labelDx), Y(v.N + v.labelDy), v.name, { a: v.anchor, size: 11, w: 'bold' });
  // point symbols
  const chk = (E, N, x, y, id) => {
    // every drawn symbol must lie inside the pixel rectangle of its own grid square
    const sqE = Math.floor(E + 1e-9);
    const sqN = Math.floor(N + 1e-9);
    if (x >= X(sqE) - 0.01 && x <= X(sqE + 1) + 0.01 && y >= Y(sqN + 1) - 0.01 && y <= Y(sqN) + 0.01) RENDER_OK++;
    else {
      RENDER_BAD++;
      check(false, `render: ${id} drawn outside its grid square ${fourFig(E, N)}`);
    }
  };
  let dots = '';
  for (const p of POINTS) {
    if (!inRect(p.E, p.N, R)) continue;
    const x = X(p.E);
    const y = Y(p.N);
    chk(p.E, p.N, x, y, p.id);
    if (p.kind === 'temple') {
      s += `<path d="M${f1(x)} ${f1(y)}v${f1(-8 * k)}" fill="none" stroke="${INK}" stroke-width="1.2"/><polygon points="${f1(x)},${f1(y - 8 * k)} ${f1(x + 5 * k)},${f1(y - 6 * k)} ${f1(x)},${f1(y - 4 * k)}" fill="${INK}" stroke="none"/>`;
      sq(x, y, 4.4 * k);
      if (labelsOn && names) txt(x + 6 * k, y + 11, 'Temple');
    } else if (p.kind === 'well') {
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 * k)}" fill="none" stroke="${INK}" stroke-width="1.2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="0.9" fill="${INK}" stroke="none"/>`;
      if (labelsOn && names) txt(x + 5 * k, y + 14, 'Well');
    } else if (['po', 'ps', 'disp'].includes(p.kind)) {
      sq(x, y, 5.6 * k);
      if (abbr) txt(x + 5 * k, y + 4, { po: 'PO', ps: 'PS', disp: 'Dis' }[p.kind], { w: 'bold' });
    } else if (p.kind === 'trig') {
      s += `<polygon points="${f1(x)},${f1(y - 5.5 * k)} ${f1(x - 4.8 * k)},${f1(y + 3 * k)} ${f1(x + 4.8 * k)},${f1(y + 3 * k)}" fill="${INK}" stroke="none"/>`;
      if (spots) txt(x + 6 * k, y + 4, String(p.value), { w: 'bold' });
    } else if (p.kind === 'spot') {
      dots += `M${f1(x - 1.7 * k)} ${f1(y)}a${f1(1.7 * k)} ${f1(1.7 * k)} 0 1 0 ${f1(3.4 * k)} 0a${f1(1.7 * k)} ${f1(1.7 * k)} 0 1 0 ${f1(-3.4 * k)} 0z`;
      if (spots) txt(x + 4 * k, y + 3.5, String(p.value));
    }
  }
  if (dots) s += `<path d="${dots}" fill="${INK}" stroke="none"/>`;
  if (labelsOn && names && inRect(49.3, 70.55, R, -0.1)) txt(X(49.3), Y(70.55), 'R. Taravati', { a: 'end', size: 10 });
  if (labelsOn && names) for (const t of TANKS) if (inRect(t.cx, t.cy, R, -0.15)) txt(X(t.cx), Y(t.cy) + 3.5, 'Tank', { a: 'middle' });
  // contour labels (index contours): up to two per level, on the longest pieces
  for (const [level, arr] of labelCands) {
    arr.sort((a, b) => b.len - a.len);
    let used = 0;
    for (const { seg, len } of arr) {
      if (used >= 2 || len < 0.9 * (pk / 60)) continue;
      let acc = 0;
      let pos = null;
      for (let i = 0; i < seg.length - 1 && !pos; i++) {
        const l = Math.hypot(seg[i + 1][0] - seg[i][0], seg[i + 1][1] - seg[i][1]);
        if (acc + l >= len / 2) {
          const u = (len / 2 - acc) / l;
          pos = [seg[i][0] + u * (seg[i + 1][0] - seg[i][0]), seg[i][1] + u * (seg[i + 1][1] - seg[i][1])];
        }
        acc += l;
      }
      if (!pos || !inRect(pos[0], pos[1], R, -0.18)) continue;
      const x = X(pos[0]);
      const y = Y(pos[1]);
      s += `<rect x="${f1(x - 11)}" y="${f1(y - 6.5)}" width="22" height="12" fill="${FIL}" fill-opacity="0.92" stroke="none"/>`;
      txt(x, y + 3.5, String(level), { a: 'middle', c: BRN, w: 'bold' });
      used++;
    }
  }
  // lettered marks for questions
  for (const m of marks) {
    if (!inRect(m.E, m.N, R)) continue;
    const x = X(m.E);
    const y = Y(m.N);
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(11 * k)}" fill="none" stroke="${ACC}" stroke-width="1.8"/>`;
    txt(x + 13 * k, y - 11 * k, m.label, { a: 'middle', size: 13, w: 'bold', c: ACC });
  }
  // frame and grid labels
  s += `<rect x="${f1(X(R.e0))}" y="${f1(Y(R.n1))}" width="${f1(w * pk)}" height="${f1(h * pk)}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
  for (let E = Math.ceil(R.e0); E <= R.e1; E++) {
    txt(X(E), mt - 5, String(E), { a: 'middle' });
    txt(X(E), mt + h * pk + 13, String(E), { a: 'middle' });
  }
  for (let N = Math.ceil(R.n0); N <= R.n1; N++) {
    txt(ml - 5, Y(N) + 3.5, String(N), { a: 'end' });
    txt(ml + w * pk + 5, Y(N) + 3.5, String(N));
  }
  // linear scale bar
  if (scalebar) {
    const bx = ml;
    const by = mt + h * pk + 28;
    const L = Math.min(w, 5);
    for (let i = 0; i < L; i++) s += `<rect x="${f1(bx + i * pk)}" y="${f1(by)}" width="${f1(pk)}" height="6" fill="${i % 2 === 0 ? INK : 'none'}" stroke="${INK}" stroke-width="1"/>`;
    s += `<path d="M${f1(bx + 0.5 * pk)} ${f1(by)}v6" fill="none" stroke="${INK}" stroke-width="1"/>`;
    txt(bx, by + 18, '0', { a: 'middle' });
    txt(bx + 0.5 * pk, by + 18, '0.5', { a: 'middle' });
    for (let i = 1; i <= L; i++) txt(bx + i * pk, by + 18, i === L ? `${i} km` : String(i), { a: 'middle' });
    txt(bx, by + 34, `Linear scale (${full ? 'sheet' : 'this drawing'}): each grid square is 1 km`, { c: MUT });
  }
  // legend (our own key; conventional colours)
  if (legend) {
    const ly = mt + h * pk + 90;
    const colW = (w * pk) / 2;
    txt(ml, ly - 6, 'Key to the imagined practice sheet (our own legend)', { w: 'bold' });
    const row = (c, r) => ({ x: ml + c * colW, y: ly + 10 + r * 16 });
    const line = (c, r, st, label) => {
      const { x, y } = row(c, r);
      s += `<path d="M${f1(x)} ${f1(y)}h34" fill="none" stroke="${st.c}" stroke-width="${st.w}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ''}/>`;
      txt(x + 42, y + 3.5, label);
    };
    line(0, 0, STYLE.metalled, 'Metalled road (red)');
    line(0, 1, STYLE.unmetalled, 'Unmetalled road (black, dashed)');
    line(0, 2, STYLE.cart, 'Cart track');
    line(0, 3, STYLE.pack, 'Pack track');
    line(0, 4, STYLE.foot, 'Footpath');
    line(0, 5, { c: BLUE, w: 2 }, 'Stream, perennial (blue)');
    line(0, 6, { c: BLUE, w: 1.4, dash: '5 3' }, 'Stream, seasonal (dashed)');
    line(0, 7, { c: BLUE, w: 3.4 }, 'Canal (man-made; double blue line)');
    { const { x, y } = row(0, 7); s += `<path d="M${f1(x)} ${f1(y)}h34" fill="none" stroke="${FIL}" stroke-width="1.2"/>`; }
    line(0, 8, { c: BRN, w: 0.9 }, 'Contour (brown); thick = index, every 100 m');
    {
      const { x, y } = row(0, 9);
      s += `<path d="M${f1(x)} ${f1(y)}h34" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M${f1(x + 4)} ${f1(y)}v4M${f1(x + 11)} ${f1(y)}v4M${f1(x + 18)} ${f1(y)}v4M${f1(x + 25)} ${f1(y)}v4M${f1(x + 32)} ${f1(y)}v4" fill="none" stroke="${INK}" stroke-width="1"/>`;
      txt(x + 42, y + 3.5, 'Embankment');
    }
    {
      let { x, y } = row(1, 0);
      sq(x + 12, y, 3.2);
      sq(x + 19, y + 3, 3.2);
      sq(x + 24, y - 3, 3.2);
      txt(x + 42, y + 3.5, 'Huts (clustered in a village or dispersed)');
      ({ x, y } = row(1, 1));
      s += `<path d="M${f1(x + 17)} ${f1(y + 4)}v-8" fill="none" stroke="${INK}" stroke-width="1.2"/><polygon points="${f1(x + 17)},${f1(y - 4)} ${f1(x + 22)},${f1(y - 2)} ${f1(x + 17)},${f1(y)}" fill="${INK}" stroke="none"/>`;
      txt(x + 42, y + 3.5, 'Temple');
      ({ x, y } = row(1, 2));
      s += `<circle cx="${f1(x + 17)}" cy="${f1(y)}" r="3" fill="none" stroke="${INK}" stroke-width="1.2"/><circle cx="${f1(x + 17)}" cy="${f1(y)}" r="0.9" fill="${INK}" stroke="none"/>`;
      txt(x + 42, y + 3.5, 'Well');
      ({ x, y } = row(1, 3));
      s += `<rect x="${f1(x + 6)}" y="${f1(y - 5)}" width="22" height="10" fill="${BLUE}" fill-opacity="0.5" stroke="${BLUE}" stroke-width="1"/>`;
      txt(x + 42, y + 3.5, 'Tank (water body)');
      ({ x, y } = row(1, 4));
      sq(x + 17, y, 5.6);
      txt(x + 42, y + 3.5, 'PO post office, PS police station, Dis dispensary');
      ({ x, y } = row(1, 5));
      s += `<polygon points="${f1(x + 17)},${f1(y - 5.5)} ${f1(x + 12.2)},${f1(y + 3)} ${f1(x + 21.8)},${f1(y + 3)}" fill="${INK}" stroke="none"/>`;
      txt(x + 42, y + 3.5, 'Triangulated height (value in metres)');
      ({ x, y } = row(1, 6));
      s += `<circle cx="${f1(x + 17)}" cy="${f1(y)}" r="1.7" fill="${INK}" stroke="none"/>`;
      txt(x + 42, y + 3.5, 'Spot height (value in metres)');
      ({ x, y } = row(1, 7));
      s += `<path d="M${f1(x + 10)} ${f1(y + 4)}L${f1(x + 24)} ${f1(y - 4)}" fill="none" stroke="${INK}" stroke-width="3.4"/>`;
      txt(x + 42, y + 3.5, 'Bridge');
      ({ x, y } = row(1, 8));
      s += `<rect x="${f1(x + 6)}" y="${f1(y - 5)}" width="9" height="10" fill="${YEL}" fill-opacity="0.32" stroke="${INK}" stroke-width="0.6"/><rect x="${f1(x + 15)}" y="${f1(y - 5)}" width="9" height="10" fill="${GRN}" fill-opacity="0.34" stroke="${INK}" stroke-width="0.6"/><rect x="${f1(x + 24)}" y="${f1(y - 5)}" width="9" height="10" fill="none" stroke="${INK}" stroke-width="0.6"/>`;
      txt(x + 42, y + 3.5, 'Cultivated (yellow), forest (green), scrub (white)');
    }
  }
  if (sqD) s += `<path d="${sqD}" fill="${INK}" stroke="none"/>`;
  const label = desc ?? `${ttl}. Window: eastings ${e0} to ${e0 + w}, northings ${n0} to ${n0 + h}.`;
  return svgDoc(W, H, label, s + `<g fill="${INK}" stroke="none" font-size="10">${tx}</g>`);
}
export function renderChecks() {
  check(RENDER_BAD === 0 && RENDER_OK > 0, `render: all ${RENDER_OK} point symbols drawn so far lie inside the pixel rectangle of their own four-figure grid square`);
}

// ---------------------------------------------------------------- analysis helpers (chapter answers are computed from these)
/** Bilinear height read back from the contour grid (used only to confirm that spot heights agree with the drawn contours). */
const gridHeight = (E, N) => {
  const x = (E - E_MIN) / STEP;
  const y = (N - N_MIN) / STEP;
  const i = Math.min(NX - 2, Math.floor(x));
  const j = Math.min(NY - 2, Math.floor(y));
  const fx = x - i;
  const fy = y - j;
  return Z[j][i] * (1 - fx) * (1 - fy) + Z[j][i + 1] * fx * (1 - fy) + Z[j + 1][i] * (1 - fx) * fy + Z[j + 1][i + 1] * fx * fy;
};
export const stream = (id) => STREAMS.find((s) => s.id === id);
export const pointsIn = (ref) => POINTS.filter((p) => fourFig(p.E, p.N) === ref);
export const pointAtSix = (ref6) => POINTS.find((p) => sixFig(p.E, p.N) === ref6);
export const allHuts = () => [...VILLAGES.flatMap((v) => v.huts), ...HUTS];
export const hutsIn = (ref) => allHuts().filter((h) => fourFig(h.E, h.N) === ref).length;
export const SERVICE_KINDS = ['po', 'ps', 'disp'];
export const servicesOf = (v) => POINTS.filter((p) => SERVICE_KINDS.includes(p.kind) && dist(p, v) < 0.5).map((p) => p.kind);
/** Counts of the 100 cells (0.1 km) of a four-figure square by land class. */
export const landMix = (ref) => {
  const [e, n] = squareCorner(ref);
  const m = { cult: 0, scrub: 0, forest: 0, water: 0 };
  for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) m[LU_CELL(e * 10 + i, n * 10 + j)]++;
  return m;
};
export const dominantLand = (ref) => {
  const m = landMix(ref);
  const [cls, c] = Object.entries(m).sort((a, b) => b[1] - a[1])[0];
  return { cls, share: c / 100 };
};
/** Squares completely covered (all 100 cells) by one land class, optionally inside a window of squares. */
export const fullSquares = (cls, win = { e0: E_MIN, e1: E_MAX, n0: N_MIN, n1: N_MAX }) => {
  const out = [];
  for (let e = win.e0; e < win.e1; e++) for (let n = win.n0; n < win.n1; n++) if (landMix(`${e}${n}`)[cls] === 100) out.push(`${e}${n}`);
  return out;
};
/** Average gradient in metres per km between two points. */
export const gradientBetween = (a, b) => Math.abs(height(a.E, a.N) - height(b.E, b.N)) / dist(a, b);
/** Number of contour lines of the sheet strictly between two heights. */
export const levelsBetween = (h1, h2) => LEVELS.filter((L) => L > Math.min(h1, h2) && L < Math.max(h1, h2)).length;
export const flowDirection = (id) => {
  const s = stream(id);
  return directionOf({ E: s.pts[0][0], N: s.pts[0][1] }, { E: s.pts.at(-1)[0], N: s.pts.at(-1)[1] });
};
export const nnMean = (huts) => {
  let sum = 0;
  for (const h of huts) sum += Math.min(...huts.filter((q) => q !== h).map((q) => dist(h, q)));
  return sum / huts.length;
};
export const patternOf = (huts) => (huts.length >= 4 && nnMean(huts) < 0.15 ? 'clustered' : 'dispersed');
/** A convenient extract window (pk chosen so a window of w squares is readable). */
export const extract = (e0, n0, w, h, o = {}) => render({ e0, n0, w, h, pk: o.pk ?? (w <= 3 ? 120 : w <= 4 ? 100 : w <= 5 ? 84 : 66), scalebar: o.scalebar ?? false, ...o });

// ---------------------------------------------------------------- self-checks of the module
{
  const near = (a, b, t) => Math.abs(a - b) <= t;
  check(LEVELS.every((L, i) => L % CI === 0 && (i === 0 || L - LEVELS[i - 1] === CI)), `contours: every level is a multiple of ${CI} m and consecutive levels differ by the contour interval ${CI} m (${LEVELS[0]} m to ${LEVELS.at(-1)} m)`);
  check(CONTOURS.filter((c) => c.index).every((c) => c.level % 100 === 0), 'contours: index contours are exactly the multiples of 100 m');
  for (const s of STREAMS) {
    const hs = s.pts.map((p) => height(p[0], p[1]));
    let ok = true;
    for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 0.05) ok = false;
    check(ok && hs[0] - hs.at(-1) > 20, `drainage: stream ${s.id} falls from ${Math.round(hs[0])} m at its source to ${Math.round(hs.at(-1))} m at its end and never rises along its path`);
  }
  const mainS = stream('main');
  for (const s of STREAMS.filter((x) => x.joined)) {
    const j = s.joined;
    const host = stream(j.river);
    const a = s.pts.at(-6);
    const b = s.pts.at(-1);
    const c = host.pts[Math.max(0, j.index - 2)];
    const d = host.pts[Math.min(host.pts.length - 1, j.index + 2)];
    const v1 = [b[0] - a[0], b[1] - a[1]];
    const v2 = [d[0] - c[0], d[1] - c[1]];
    const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
    const ang = (Math.acos(cos) * 180) / Math.PI;
    check(ang < 90, `drainage: stream ${s.id} joins ${j.river} at an acute angle (${Math.round(ang)} degrees) pointing downstream`);
  }
  check(STREAMS.filter((s) => s.seasonal).length === 1 && !mainS.seasonal, 'drainage: exactly one stream is drawn as seasonal (dashed) and the main river is perennial');
  {
    let pass = 0;
    let total = 0;
    for (const c of CONTOURS)
      for (const l of c.lines)
        for (let i = 0; i < l.pts.length - 1; i++)
          for (let j = 0; j < mainS.pts.length - 1; j++) {
            const x = segsIntersect(l.pts[i], l.pts[i + 1], mainS.pts[j], mainS.pts[j + 1]);
            if (!x) continue;
            const u = [mainS.pts[j + 1][0] - mainS.pts[j][0], mainS.pts[j + 1][1] - mainS.pts[j][1]];
            const un = Math.hypot(...u);
            const side = (dir) => {
              let acc = 0;
              let k = i + (dir > 0 ? 1 : 0);
              let prev = [x.E, x.N];
              while (k >= 0 && k < l.pts.length && acc < 0.35) {
                acc += Math.hypot(l.pts[k][0] - prev[0], l.pts[k][1] - prev[1]);
                prev = l.pts[k];
                k += dir;
              }
              return ((prev[0] - x.E) * u[0] + (prev[1] - x.N) * u[1]) / un;
            };
            if (c.level > 200) continue;
            total++;
            if (side(1) > 0 && side(-1) > 0) pass++;
          }
    check(total >= 6 && pass === total, `terrain: at all ${pass} of ${total} crossings of the main river below the 200 m contour, both arms of the contour trail downstream (a V whose point is upstream)`);
  }
  const hv = POINTS.filter((p) => p.value !== undefined);
  check(hv.every((p) => p.value === Math.round(height(p.E, p.N)) && near(gridHeight(p.E, p.N), height(p.E, p.N), 1.0)), `heights: all ${hv.length} spot and triangulated heights equal the rounded ground height h(E, N) and agree with the drawn contours to within 1 m`);
  const t1 = POINTS.find((p) => p.id === 'trig1');
  const t2 = POINTS.find((p) => p.id === 'trig2');
  check(t1.value >= Math.round(H_MAX) - 1 && t1.value > t2.value, `heights: the triangulated height on the conical hill (${t1.value} m) is the highest point of the sheet (maximum ${Math.round(H_MAX)} m) and exceeds the ridge's (${t2.value} m)`);
  const refOK = POINTS.every((p) => fourFig(p.E, p.N) === `${Math.floor(p.E)}${Math.floor(p.N)}` && sixFig(p.E, p.N).slice(0, 2) === fourFig(p.E, p.N).slice(0, 2) && sixFig(p.E, p.N).slice(3, 5) === fourFig(p.E, p.N).slice(2, 4) && p.E > E_MIN + 0.15 && p.E < E_MAX - 0.15 && p.N > N_MIN + 0.15 && p.N < N_MAX - 0.15);
  check(refOK, `grid references: four-figure and six-figure references of all ${POINTS.length} point features agree with each other and with their coordinates, and none lies within 0.15 km of the sheet edge`);
  check(new Set(POINTS.map((p) => sixFig(p.E, p.N))).size === POINTS.length, 'grid references: every point feature has its own six-figure reference');
  check(POINTS.every((p) => Math.round(p.E * 100) % 10 !== 0 && Math.round(p.N * 100) % 10 !== 0), 'grid references: no point sits on the boundary between two tenths (six-figure references are unambiguous)');
  for (const v of VILLAGES) check(v.huts.length >= 10 && patternOf(v.huts) === 'clustered' && slope(v.E, v.N) < 60, `settlements: ${v.name} has ${v.huts.length} huts (mean nearest-neighbour distance ${round1(nnMean(v.huts) * 1000)} m: clustered) on gentle ground (${Math.round(slope(v.E, v.N))} m per km)`);
  check(patternOf(HUTS) === 'dispersed' && HUTS.length >= 8, `settlements: the ${HUTS.length} dispersed huts have a mean nearest-neighbour distance of ${round1(nnMean(HUTS))} km: dispersed`);
  check(allHuts().every((h) => landClassAt(h.E, h.N) !== 'forest' && landClassAt(h.E, h.N) !== 'water' && slope(h.E, h.N) < 90), 'settlements: no hut stands in forest, in the tank or on ground steeper than 90 m per km');
  const svc = Object.fromEntries(VILLAGES.map((v) => [v.id, servicesOf(v).sort().join('+')]));
  check(svc.nandiwadi === 'po+ps' && svc.sonakhedi === 'disp' && svc.pathrali === '', `settlements: services by village computed from positions: Nandiwadi ${svc.nandiwadi}, Sonakhedi ${svc.sonakhedi}, Pathrali none`);
  const maxGrad = (pts) => {
    let m = 0;
    for (let i = 1; i < pts.length; i++) m = Math.max(m, Math.abs(height(pts[i][0], pts[i][1]) - height(pts[i - 1][0], pts[i - 1][1])) / Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    return m;
  };
  const m1 = LINEAR.find((l) => l.id === 'M1');
  check(maxGrad(m1.pts) < 130, `transport: the metalled road keeps to gentle ground (steepest stretch ${Math.round(maxGrad(m1.pts))} m per km)`);
  check(BRIDGES.length === 1, `transport: the metalled road crosses the main river exactly once, at one bridge (${BRIDGES.length ? fourFig(BRIDGES[0].E, BRIDGES[0].N) : 'none'})`);
  const canal = LINEAR.find((l) => l.id === 'K1');
  const ch = canal.pts.map((p) => height(p[0], p[1]));
  let canalOK = true;
  for (let i = 1; i < ch.length; i++) if (ch[i] > ch[i - 1] + 0.5) canalOK = false;
  check(canalOK && ch[0] - ch.at(-1) < 6 && polyLen(canal.pts) > 3, `man-made features: the canal (${round1(polyLen(canal.pts))} km) runs along a contour from the river with a fall of only ${round1(ch[0] - ch.at(-1))} m, so it flows downhill and stays high above the river`);
  const lc = { cult: 0, scrub: 0, forest: 0, water: 0 };
  for (let j = 700; j < 800; j++) for (let i = 400; i < 500; i++) lc[LU_CELL(i, j)]++;
  check(landClassAt(46.05, 78.55) === 'forest' && landClassAt(45.5, 72.0) === 'cult' && landClassAt(41.0, 74.3) === 'scrub', `land use: forest from ${FOREST_MIN} m up (hill, ridge), open scrub from ${CULT_MAX} m to ${FOREST_MIN} m, cultivated land below ${CULT_MAX} m (cells: cultivated ${lc.cult}, scrub ${lc.scrub}, forest ${lc.forest}, water ${lc.water} of 10 000)`);
  check(TANKS.every((t) => landClassAt(t.cx, t.cy) === 'water' && slope(t.cx, t.cy) < 60), 'land use: the tank lies on gently sloping ground and its cells are classed as water');
  check(near(dist({ E: 40, N: 70 }, { E: 41, N: 70 }) * PX_PER_KM, 60, 1e-9), 'scale: one km on the ground (one grid square) is drawn as 60 px, so the drawn scale bar and grid agree');
  check(near(kmToCm(5), 10, 1e-9) && near(cmToKm(7.2), 3.6, 1e-9), 'scale: 5 km is 10 cm and 7.2 cm is 3.6 km at 1 cm to 0.5 km');
  check(directionOf({ E: 0, N: 0 }, { E: 1, N: 1 }) === 'north-east' && directionOf({ E: 0, N: 0 }, { E: -1, N: 0 }) === 'west' && directionOf({ E: 0, N: 0 }, { E: 1, N: -1 }) === 'south-east', 'direction: the eight-point compass helper returns north-east, west and south-east for known test vectors');
}
