// ICSE 10 Geography ch03 figures. Every map figure is drawn by topo.mjs (the ONE imagined practice sheet shared by ch01-ch03). The three
// drainage-pattern diagrams (dendritic, trellis, radial) are SEPARATE SCHEMATIC sketches built here from stated geometry; they are labelled
// "Schematic, not from the sheet". Nothing is traced or copied from any Survey of India sheet. SELF_CHECKS (read by build.mjs) start with
// the module's own checks.
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

// ---------------------------------------------------------------- contour crossings of the main river (computed)
const mainS = T.stream('main');
export const crossAt = (level) => {
  const c = T.CONTOURS.find((x) => x.level === level);
  for (const l of c.lines)
    for (let i = 0; i < l.pts.length - 1; i++)
      for (let j = 0; j < mainS.pts.length - 1; j++) {
        const [a, b] = [l.pts[i], l.pts[i + 1]];
        const [p, q] = [mainS.pts[j], mainS.pts[j + 1]];
        const r = [b[0] - a[0], b[1] - a[1]];
        const s = [q[0] - p[0], q[1] - p[1]];
        const den = r[0] * s[1] - r[1] * s[0];
        if (Math.abs(den) < 1e-12) continue;
        const t = ((p[0] - a[0]) * s[1] - (p[1] - a[1]) * s[0]) / den;
        const u = ((p[0] - a[0]) * r[1] - (p[1] - a[1]) * r[0]) / den;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return { E: a[0] + t * r[0], N: a[1] + t * r[1], level };
      }
  return null;
};
export const X140 = crossAt(140);
export const X120 = crossAt(120);
export const X100 = crossAt(100);
export const X80 = crossAt(80);
export const X60 = crossAt(60);

// ---------------------------------------------------------------- sheet and extracts
export const SHEET = T.render({ legend: true, desc: 'The imagined SOYL practice sheet in full, with its key: villages, huts, roads and tracks, river, streams, canal, tank, yellow cultivated land, green forest and white open scrub. Imagined practice sheet, not a real place.' });
export const SETT = T.extract(43, 72, 5, 5);
export const SITE = T.extract(42, 71, 3, 3);
export const NAND = T.extract(46, 73, 3, 3);
export const NAND_SYM = T.extract(46, 73, 3, 3, { names: false, abbr: true, marks: [{ ...FEAT.nandiwadi, label: 'V' }] });
export const LU_SOUTH = T.extract(42, 70, 4, 3);
export const LU_NORTH = T.extract(44, 77, 4, 3);
export const LU_WEST = T.extract(40, 74, 4, 3);
export const LU_MARK = T.render({ legend: false, scalebar: false, names: false, marks: [{ E: 46.5, N: 72.5, label: 'P' }, { E: 46.5, N: 78.5, label: 'Q' }, { E: 40.5, N: 75.5, label: 'R' }], desc: 'The imagined practice sheet with three squares marked P, Q and R, for a land-use question. Imagined practice sheet, not a real place.' });
export const TRANS = T.extract(43, 72, 5, 4);
export const TRANS_LINES = T.extract(45, 72, 4, 3);
export const DRAIN = T.extract(43, 74, 5, 4);
export const FLOW_R = T.extract(46, 73, 3, 3, { marks: [{ E: X140.E, N: X140.N, label: 'P' }, { E: X100.E, N: X100.N, label: 'Q' }] });
export const FLOW_R2 = T.extract(47, 71, 3, 4, { marks: [{ E: X120.E, N: X120.N, label: 'P' }, { E: X80.E, N: X80.N, label: 'Q' }] });
export const FLOW_T = T.extract(43, 74, 3, 3, { marks: [{ E: T.stream('t1').pts[0][0], N: T.stream('t1').pts[0][1], label: 'A' }, { E: T.stream('t1').pts.at(-1)[0], N: T.stream('t1').pts.at(-1)[1], label: 'B' }] });
export const CLUST = T.extract(46, 73, 2, 2);
export const DISP = T.extract(40, 74, 4, 3);
export const DISP_S = T.extract(41, 70, 4, 3);
export const MAN = T.extract(45, 72, 4, 4, { names: true });

// ---------------------------------------------------------------- schematic drainage patterns (NOT from the sheet)
const BLUE = 'var(--diagram-blue)';
const note = (s) => S.text(130, 224, s, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
export const DEND = (() => {
  let s = '';
  const trunk = S.line(130, 24, 130, 196, { c: BLUE, w: 3 });
  s += trunk + S.arrow(130, 170, 130, 198, { c: BLUE, w: 3, size: 9 });
  const angs = [];
  for (const [jy, len, side] of [[60, 52, -1], [78, 48, 1], [104, 56, 1], [124, 52, -1], [150, 46, 1], [166, 44, -1]]) {
    const a = (38 * Math.PI) / 180; // branch makes 38 degrees with the trunk, opening upstream
    const sx = 130 + side * len * Math.sin(a);
    const sy = jy - len * Math.cos(a);
    s += S.line(sx, sy, 130, jy, { c: BLUE, w: 2 });
    // v1 = branch direction downstream; v2 = trunk direction downstream
    const v1 = [130 - sx, jy - sy];
    const v2 = [0, 1];
    angs.push((Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / Math.hypot(...v1)) * 180) / Math.PI);
    // twigs
    const mx = (sx + 130) / 2;
    const my = (sy + jy) / 2;
    const tx = mx + side * 20 * Math.sin(a + 0.5);
    const ty = my - 20 * Math.cos(a + 0.5);
    s += S.line(tx, ty, mx, my, { c: BLUE, w: 1.4 });
  }
  s += S.text(130, 14, 'Dendritic (tree-like)', { a: 'middle', size: 11, w: 'bold' }) + note('Schematic, not from the sheet');
  check(angs.every((x) => Math.abs(x - 38) < 1e-6) && angs.every((x) => x < 90), 'dendritic schematic: every branch joins the trunk at an acute angle (38 degrees) pointing downstream');
  return svgDoc(260, 232, 'Schematic of a dendritic drainage pattern: a main river with branches joining at acute angles pointing downstream, like the branches of a tree. Schematic, not from the imagined sheet.', s);
})();
export const TRELLIS = (() => {
  let s = '';
  for (const x of [55, 130, 205]) s += S.arrow(x, 26, x, 176, { c: BLUE, w: 2.6, size: 8 });
  s += S.arrow(40, 192, 225, 192, { c: BLUE, w: 3.2, size: 9 });
  for (const x of [55, 130, 205]) s += S.line(x, 176, x, 192, { c: BLUE, w: 2.6 });
  const angs = [];
  for (const x of [55, 130, 205]) for (const [y, side] of [[60, -1], [86, 1], [112, -1], [138, 1]]) {
    const len = 28;
    s += S.line(x + side * len, y, x, y, { c: BLUE, w: 1.5 });
    const v1 = [-side * len, 0]; // tributary flows horizontally towards the trunk
    angs.push((Math.acos(v1[1] / Math.hypot(...v1)) * 180) / Math.PI); // angle with the vertical trunk direction (0, 1)
  }
  s += S.text(130, 14, 'Trellis (garden fence)', { a: 'middle', size: 11, w: 'bold' }) + note('Schematic, not from the sheet');
  check(angs.every((x) => Math.abs(x - 90) < 1e-9), 'trellis schematic: short tributaries are drawn horizontal and the main streams vertical, so they join at right angles');
  return svgDoc(260, 232, 'Schematic of a trellised drainage pattern: long parallel streams joined by short tributaries at right angles, like a garden trellis. Schematic, not from the imagined sheet.', s);
})();
export const RADIAL = (() => {
  let s = '';
  const cx = 130;
  const cy = 118;
  for (const r of [30, 55, 80]) s += S.circle(cx, cy, r, { c: 'var(--diagram-brown)', sw: 1, dash: '4 3' });
  const n = 8;
  const starts = [];
  for (let i = 0; i < n; i++) {
    const a = (i * 2 * Math.PI) / n + Math.PI / 8;
    const r0 = 14;
    const r1 = 92;
    const x0 = cx + r0 * Math.sin(a);
    const y0 = cy - r0 * Math.cos(a);
    s += S.arrow(x0, y0, cx + r1 * Math.sin(a), cy - r1 * Math.cos(a), { c: BLUE, w: 2, size: 8 });
    starts.push([Math.hypot(x0 - cx, y0 - cy), a]);
  }
  s += S.text(cx, cy + 4, 'dome', { a: 'middle', size: 10 });
  s += S.text(130, 14, 'Radial (spokes of a wheel)', { a: 'middle', size: 11, w: 'bold' }) + note('Schematic, not from the sheet');
  check(starts.every(([r]) => Math.abs(r - 14) < 1e-9) && starts.length === 8 && Math.abs(starts[1][1] - starts[0][1] - Math.PI / 4) < 1e-9, 'radial schematic: eight streams start at the same distance from the centre of the dome, 45 degrees apart, and flow outwards');
  return svgDoc(260, 232, 'Schematic of a radial drainage pattern: streams flow outwards in all directions from the top of a dome or conical hill, like the spokes of a wheel. Schematic, not from the imagined sheet.', s);
})();

// ---------------------------------------------------------------- site facts of the villages (computed)
const dl = (E, N, pts) => {
  let b = 1e9;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const vx = bx - ax;
    const vy = by - ay;
    const L2 = vx * vx + vy * vy;
    let u = L2 ? ((E - ax) * vx + (N - ay) * vy) / L2 : 0;
    u = Math.max(0, Math.min(1, u));
    b = Math.min(b, Math.hypot(E - ax - u * vx, N - ay - u * vy));
  }
  return b;
};
/** Distances (km) from a village centre to its nearest road, nearest water source and its ground slope. */
export const siteInfo = (v) => {
  const road = T.LINEAR.filter((l) => ['metalled', 'unmetalled', 'cart', 'pack', 'foot'].includes(l.type)).map((l) => [l.id, l.type, dl(v.E, v.N, l.pts)]).sort((a, b) => a[2] - b[2])[0];
  const water = [
    ...T.STREAMS.map((s) => [s.id, s.id === 'main' ? 'river' : 'stream', dl(v.E, v.N, s.pts)]),
    ['K1', 'canal', dl(v.E, v.N, T.LINEAR.find((l) => l.id === 'K1').pts)],
    ['tank', 'tank', Math.hypot(T.TANKS[0].cx - v.E, T.TANKS[0].cy - v.N)],
    ...T.POINTS.filter((p) => p.kind === 'well').map((p) => [p.id, 'well', Math.hypot(p.E - v.E, p.N - v.N)]),
  ].sort((a, b) => a[2] - b[2]);
  return { road, water, slope: T.slope(v.E, v.N) };
};
export const lenKm = (type) => T.LINEAR.filter((l) => l.type === type).reduce((a, l) => a + T.polyLen(l.pts), 0);

// ---------------------------------------------------------------- figure-specific checks
check(T.compass8(T.bearing(X140, X100)) === 'south-east' && T.compassMargin(T.bearing(X140, X100)) > 10, `drainage: the river falls from the 140 m crossing to the 100 m crossing towards the south-east (bearing ${Math.round(T.bearing(X140, X100))} degrees)`);
const hs = (p) => Math.round(T.height(p[0], p[1]));
const t1 = T.stream('t1');
check(X120 && X100 && X80 && X60 && hs([X120.E, X120.N]) >= 119 && hs([X120.E, X120.N]) <= 121 && hs([X80.E, X80.N]) >= 79 && hs([X80.E, X80.N]) <= 81, `drainage: the main river crosses the 120 m contour at ${T.sixFig(X120.E, X120.N)} and the 80 m contour at ${T.sixFig(X80.E, X80.N)}, and its bed height there agrees with the contour value`);
check(hs(t1.pts[0]) > hs(t1.pts.at(-1)) && T.directionOf({ E: t1.pts[0][0], N: t1.pts[0][1] }, { E: t1.pts.at(-1)[0], N: t1.pts.at(-1)[1] }) === 'east', `drainage: stream T1 falls from ${hs(t1.pts[0])} m at A to ${hs(t1.pts.at(-1))} m at B, so it flows east`);
T.renderChecks();
