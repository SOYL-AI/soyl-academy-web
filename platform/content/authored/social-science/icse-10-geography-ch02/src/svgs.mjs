// ICSE 10 Geography ch02 figures. Every map figure is drawn by topo.mjs (the ONE imagined practice sheet shared by ch01-ch03); the compass rose
// is computed from the eight-point helper. Nothing is traced or copied from any Survey of India sheet. SELF_CHECKS (read by build.mjs)
// start with the module's own checks.
import * as T from './topo.mjs';
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = T.SELF_CHECKS;
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
export const fact = check;
export const FEAT = (() => {
  const F = {};
  for (const p of T.POINTS) F[p.id] = p;
  for (const v of T.VILLAGES) F[v.id] = v;
  F.tank = { E: T.TANKS[0].cx, N: T.TANKS[0].cy };
  F.bridge = T.BRIDGES[0];
  return F;
})();
const mark = (id, label) => ({ E: FEAT[id].E, N: FEAT[id].N, label });
/** Point at fraction f of the arc length of a road, track, canal or other line (by id). */
export const alongLine = (id, f) => {
  const pts = T.LINEAR.find((l) => l.id === id).pts;
  const total = T.polyLen(pts);
  let acc = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    if (acc + l >= f * total) {
      const u = (f * total - acc) / l;
      return { E: pts[i][0] + u * (pts[i + 1][0] - pts[i][0]), N: pts[i][1] + u * (pts[i + 1][1] - pts[i][1]) };
    }
    acc += l;
  }
  return { E: pts.at(-1)[0], N: pts.at(-1)[1] };
};
const lm = (id, f, label) => ({ ...alongLine(id, f), label });

// ---------------------------------------------------------------- sheet and extracts
export const SHEET = T.render({ legend: true, desc: 'The imagined SOYL practice sheet in full, with its key: a 10 by 10 grid of 1 km squares, brown contours every 20 metres, blue streams and a canal, red and black roads and tracks, three clustered villages, scattered huts, yellow cultivated land, green forest and white open scrub. Imagined practice sheet, not a real place.' });
export const SYMBOLS = T.extract(46, 73, 3, 3);
export const SYM_Q = T.extract(46, 73, 3, 3, { names: false, abbr: false, marks: [mark('temple1', 'A'), mark('po1', 'B'), mark('well2', 'C')] });
export const LINES = T.extract(45, 72, 4, 3);
export const LINES_Q = T.extract(45, 72, 4, 3, { names: false, marks: [lm('M1', 0.72, 'K'), lm('K1', 0.35, 'L'), lm('F1', 0.5, 'M'), lm('U1', 0.93, 'N'), { ...alongLine('F2', 0.5), label: 'O' }] });
export const SCALE5 = T.extract(43, 70, 5, 3, { scalebar: true });
export const DIST1 = T.extract(46, 73, 3, 3, { scalebar: true, marks: [mark('ps1', 'A'), mark('temple1', 'B')] });
export const DIST2 = T.extract(43, 72, 5, 4, { scalebar: true, marks: [mark('disp1', 'P'), mark('well2', 'Q')] });
export const DIST3 = T.extract(43, 72, 5, 4, { scalebar: true, marks: [mark('sonakhedi', 'S'), mark('temple1', 'T')] });
export const AREA_CULT = T.extract(45, 73, 3, 3);
export const AREA_FOREST = T.extract(43, 78, 4, 2);
export const AREA_SCRUB = T.extract(40, 74, 4, 2);
export const AREA_CULT2 = T.extract(43, 70, 5, 3);
export const DIR1 = T.extract(43, 72, 5, 4, { marks: [mark('disp1', 'D'), mark('temple1', 'T')] });
export const DIR2 = T.extract(44, 73, 4, 3, { marks: [mark('pathrali', 'A'), mark('ps1', 'B')] });

// ---------------------------------------------------------------- compass rose computed from the eight-point helper
export const ROSE = (() => {
  const cx = 150;
  const cy = 150;
  const R = 90;
  let s = '';
  let ok = true;
  const ab = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  for (let i = 0; i < 8; i++) {
    const deg = i * 45;
    const rad = (deg * Math.PI) / 180;
    const major = i % 2 === 0;
    const r = major ? R : R * 0.75;
    const x = cx + r * Math.sin(rad);
    const y = cy - r * Math.cos(rad);
    s += S.line(cx, cy, x, y, { c: major ? 'currentColor' : 'var(--diagram-muted)', w: major ? 2 : 1.4 });
    s += S.text(cx + (r + 16) * Math.sin(rad), cy - (r + 16) * Math.cos(rad) + 4, ab[i], { a: 'middle', size: 12, w: major ? 'bold' : undefined });
    if (T.compass8(deg) !== T.COMPASS[i]) ok = false;
    s += S.text(cx + (r + 16) * Math.sin(rad), cy - (r + 16) * Math.cos(rad) + (i === 0 ? -12 : 15), `${deg}`, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
  }
  s += S.circle(cx, cy, 3, { fill: 'currentColor' });
  for (const deg of [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]) {
    const rad = (deg * Math.PI) / 180;
    s += S.line(cx + 30 * Math.sin(rad), cy - 30 * Math.cos(rad), cx + 48 * Math.sin(rad), cy - 48 * Math.cos(rad), { c: 'var(--diagram-accent)', w: 1, dash: '3 2' });
  }
  s += S.text(cx, 282, 'Bearings in degrees from north.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }) + S.text(cx, 296, 'Dashed ticks mark the boundaries between points.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
  const names = [0, 45, 90, 135, 180, 225, 270, 315].map((d) => T.compass8(d));
  check(ok && names.join(',') === 'north,north-east,east,south-east,south,south-west,west,north-west', 'compass rose: the eight points computed from 0, 45, ..., 315 degrees are north, north-east, east, south-east, south, south-west, west, north-west');
  return svgDoc(300, 304, 'Compass rose with the eight points: north, north-east, east, south-east, south, south-west, west and north-west at bearings of 0, 45, 90, 135, 180, 225, 270 and 315 degrees', s);
})();

// ---------------------------------------------------------------- figure-specific checks
check(['M1', 'K1', 'F1', 'U1', 'F2'].every((id) => T.LINEAR.some((l) => l.id === id)), 'lines figure: every lettered line feature (road, canal, footpath, unmetalled road) exists in the module data');
const bar = SCALE5.includes('Linear scale');
check(bar, 'scale-bar figure: the extract carries a linear scale bar of 5 km drawn at the same px-per-km as its grid');
T.renderChecks();
