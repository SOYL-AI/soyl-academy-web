// ICSE 10 Geography ch01 figures. Every figure is drawn by topo.mjs (the ONE imagined practice sheet shared by ch01-ch03) from its own
// height function and feature coordinates; the cross-sections are computed from the same height function. Nothing is traced or
// copied from any Survey of India sheet. SELF_CHECKS (read by build.mjs) start with the module's own checks.
import * as T from './topo.mjs';
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = T.SELF_CHECKS;
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const pt = (id) => T.POINTS.find((p) => p.id === id);
const mark = (id, label) => ({ E: pt(id).E, N: pt(id).N, label });

// ---------------------------------------------------------------- sheet and extracts
export const SHEET = T.render({ legend: true, desc: 'The imagined SOYL practice sheet in full: a 10 by 10 grid of 1 km squares, brown contours every 20 metres, blue streams and a canal, red and black roads and tracks, three clustered villages, scattered huts, yellow cultivated land, green forest and white open scrub. Imagined practice sheet, not a real place.' });
export const GRIDX = T.extract(46, 73, 3, 3);
export const GRID_SYM = T.extract(46, 73, 3, 3, { names: false, abbr: false, marks: [mark('temple1', 'A'), mark('po1', 'B'), mark('well2', 'C')] });
export const GRID_SYM2 = T.extract(43, 72, 3, 3, { names: false, abbr: false, marks: [mark('disp1', 'P'), mark('well1', 'Q'), mark('spot3', 'R')] });
export const GRID_BARE = T.extract(46, 73, 3, 3, { names: false, abbr: false });
export const GRID_NAMED = T.extract(43, 72, 3, 3);
export const HILL = T.extract(44, 77, 4, 3);
export const HILL_MARK = T.extract(44, 77, 4, 3, { marks: [{ E: 46.05, N: 78.45, label: 'X' }] });
export const RIDGE = T.extract(40, 76, 5, 4);
export const ESC = T.extract(47, 74, 3, 4);
export const GENTLE = T.extract(42, 70, 3, 3);

// ---------------------------------------------------------------- cross-sections computed from h(E, N)
/** Cross-section from (E0, N0) to (E1, N1): heights read from the height function every 0.05 km; vertical scale exaggerated. */
export function profile(a, b, { marks = [], title }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.round(len / 0.05);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push([u * len, T.height(a[0] + u * (b[0] - a[0]), a[1] + u * (b[1] - a[1]))]);
  }
  const hMin = Math.floor(Math.min(...pts.map((p) => p[1])) / 100) * 100;
  const hMax = Math.ceil(Math.max(...pts.map((p) => p[1])) / 100) * 100;
  const X0 = 58;
  const Y0 = 232;
  const W = 340;
  const H = 170;
  const x = (d) => X0 + (d / len) * W;
  const y = (h) => Y0 - ((h - hMin) / (hMax - hMin)) * H;
  let s = S.line(X0, Y0, X0 + W, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let h = hMin; h <= hMax; h += 100) s += S.line(X0 - 3, y(h), X0, y(h), { w: 1 }) + S.text(X0 - 6, y(h) + 3.5, String(h), { a: 'end', size: 10 });
  for (let d = 0; d <= len + 1e-9; d += 0.5) s += S.line(x(d), Y0, x(d), Y0 + 3, { w: 1 }) + S.text(x(d), Y0 + 15, String(d), { a: 'middle', size: 10 });
  const line = `M${pts.map(([d, h]) => `${x(d).toFixed(1)} ${y(h).toFixed(1)}`).join(' L')}`;
  s += S.path(`${line} L${x(len).toFixed(1)} ${Y0} L${x(0).toFixed(1)} ${Y0} Z`, { fill: 'var(--diagram-brown)', fop: 0.2, c: 'none', w: 0 });
  s += S.path(line, { c: 'var(--diagram-brown)', w: 2 });
  let ok = true;
  for (const m of marks) {
    const d = Math.hypot(m.E - a[0], m.N - a[1]);
    const h = T.height(m.E, m.N);
    if (Math.abs(h - m.value) > 0.6) ok = false;
    s += S.line(x(d), y(h), x(d), Y0, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }) + S.circle(x(d), y(h), 3, { fill: 'currentColor' });
    s += S.text(x(d) + (m.dx ?? 5), y(h) + (m.dy ?? -6), `${m.label} ${m.value} m`, { size: 10, w: 'bold' });
  }
  s += S.text(X0 + W / 2, 18, title, { a: 'middle', size: 11, w: 'bold' });
  s += S.text(X0 + W / 2, 270, 'Distance along the line (km)', { a: 'middle', size: 10 });
  s += S.text(X0 - 6, Y0 - H - 10, 'Height (m)', { a: 'end', size: 10 });
  s += S.text(X0 + W / 2, 36, 'Imagined practice sheet. Cross-section: vertical scale exaggerated.', { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
  check(ok, `cross-section "${title}": every marked height equals the height function at that point`);
  return svgDoc(420, 278, `${title}. Cross-section of the imagined practice sheet from easting ${a[0]} northing ${a[1]} to easting ${b[0]} northing ${b[1]}, length ${len.toFixed(1)} km, heights from ${Math.round(Math.min(...pts.map((p) => p[1])))} to ${Math.round(Math.max(...pts.map((p) => p[1])))} metres. Vertical scale exaggerated.`, s);
}
const s1 = pt('spot1');
const s2 = pt('spot2');
export const PROF_ESC = profile([47.0, 75.55], [50.0, 75.55], {
  title: 'Cross-section west to east along northing 75.55',
  marks: [{ E: s2.E, N: s2.N, value: s2.value, label: 'Foot', dx: -4, dy: -9 }, { E: s1.E, N: s1.N, value: s1.value, label: 'Top', dx: -30, dy: -9 }],
});
const t1 = pt('trig1');
export const PROF_HILL = profile([46.05, 76.0], [46.05, 80.0], { title: 'Cross-section south to north along easting 46.05', marks: [{ E: t1.E, N: t1.N, value: t1.value, label: 'Summit', dx: 6, dy: 12 }] });
export const PROF_GENTLE = profile([42.0, 70.5], [45.0, 70.5], { title: 'Cross-section west to east along northing 70.5' });

// ---------------------------------------------------------------- self-checks specific to the figures
const esc = { top: s1.value, foot: s2.value };
check(esc.top - esc.foot === 108 && T.gradientBetween(s2, s1) > 70, `escarpment: the foot (${esc.foot} m) and top (${esc.top} m) spot heights give a relative height of ${esc.top - esc.foot} m over ${T.round1(T.dist(s1, s2))} km (average ${Math.round(T.gradientBetween(s2, s1))} m per km)`);
check(Math.round(T.height(46.05, 78.45)) === t1.value && t1.value === 478, 'hill: the triangulated height on the conical hill is 478 m');
export const ESC_STEEP = Math.max(...Array.from({ length: 60 }, (_, i) => T.slope(48.0 + i * 0.02, 75.55)));
export const ESC_GENTLE = T.slope(44.0, 70.8);
check(ESC_STEEP > 120 && ESC_GENTLE < 40, `slopes: the steepest part of the escarpment is about ${Math.round(ESC_STEEP)} m per km while the south-west plain is about ${Math.round(ESC_GENTLE)} m per km`);
T.renderChecks();
export const fact = check;
