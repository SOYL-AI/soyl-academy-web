// Hand-drawn SVG schematics for ch03 Motion (allow-listed elements, palette colours only). Geometry is computed and self-checked.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

/** Axes with arrowheads; origin at (x0, y0), x to the right for w px, y upwards for h px. */
function axes(x0, y0, w, h, xl, yl, xo = 15) {
  return (
    S.arrow(x0, y0, x0 + w, y0, { size: 6 }) +
    S.arrow(x0, y0, x0, y0 - h, { size: 6 }) +
    lab(x0 + w, y0 + xo, xl, { a: 'end', size: 10 }) +
    lab(x0 + 4, y0 - h - 3, yl, { size: 10 })
  );
}

// 1. Distance and displacement: home to school, 300 m east then 400 m north.
const east = 300;
const north = 400;
const disp = Math.hypot(east, north);
const bearing = (Math.atan2(north, east) * 180) / Math.PI;
chk(near(disp, 500, 1e-9), 'displacement: 300 m east and 400 m north give a straight-line displacement of 500 m');
chk(near(bearing, 53.13, 0.001), 'displacement: direction is about 53 degrees north of east');
const k1 = 0.45;
const A = [60, 230];
const B = [A[0] + east * k1, A[1]];
const C = [B[0], A[1] - north * k1];
chk(near(Math.hypot(C[0] - A[0], C[1] - A[1]) / k1, disp, 1e-6), 'displacement: drawn arrow length matches 500 m at the drawing scale');
export const DISPLACEMENT = svgDoc(
  470,
  270,
  'Map of a walk from home H to school S: 300 metres east to the corner and then 400 metres north. The distance travelled along the path is 700 metres. The displacement is the straight arrow from H to S, 500 metres long, directed about 53 degrees north of east.',
  [
    S.path(`M${A[0]} ${A[1]} L${B[0]} ${B[1]} L${C[0]} ${C[1]}`, { c: 'var(--diagram-blue)', w: 3 }),
    S.arrow(A[0], A[1], C[0], C[1], { c: 'var(--diagram-red)', w: 2.5, size: 9 }),
    S.circle(A[0], A[1], 5, { fill: 'currentColor' }),
    S.circle(C[0], C[1], 5, { fill: 'currentColor' }),
    S.circle(B[0], B[1], 3, { fill: 'var(--diagram-blue)', c: 'var(--diagram-blue)' }),
    lab(A[0], A[1] + 18, 'H (home)', { a: 'middle', w: 'bold' }),
    lab(C[0] + 10, C[1] + 4, 'S (school)', { w: 'bold' }),
    lab((A[0] + B[0]) / 2 + 30, A[1] + 18, '300 m east', { a: 'middle', c: 'var(--diagram-blue)' }),
    lab(B[0] + 8, (B[1] + C[1]) / 2 + 20, '400 m north', { c: 'var(--diagram-blue)' }),
    lab(A[0] + 8, (A[1] + C[1]) / 2 - 22, 'displacement', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(A[0] + 8, (A[1] + C[1]) / 2 - 9, '500 m', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(300, 60, 'Distance = 300 + 400 = 700 m', { w: 'bold', c: 'var(--diagram-blue)' }),
    lab(300, 80, 'Displacement = 500 m', { w: 'bold', c: 'var(--diagram-red)' }),
    lab(300, 98, `at ${Math.round(bearing)}° north of east`, { size: 10 }),
    lab(300, 130, 'Distance is the length of the path.', { size: 10 }),
    lab(300, 145, 'Displacement is the straight line', { size: 10 }),
    lab(300, 160, 'from start to end, with direction.', { size: 10 }),
  ].join(''),
);

// 2. Position-time graph shapes: at rest, uniform velocity, speeding up.
const pw = 110;
const ph = 100;
function panel(x0, title, kind) {
  const y0 = 140;
  let out = axes(x0, y0, pw, ph, 'time', 'position') + lab(x0 + pw / 2, 24, title, { a: 'middle', w: 'bold', size: 11 });
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const pos = kind === 'rest' ? 0.45 : kind === 'uniform' ? 0.1 + 0.8 * t : 0.05 + 0.85 * t * t;
    pts.push([x0 + t * (pw - 10), y0 - pos * (ph - 10)]);
  }
  out += S.path(`M${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L')}`, { c: 'var(--diagram-red)', w: 3 });
  return { out, pts };
}
const pa = panel(30, 'At rest', 'rest');
const pb = panel(180, 'Uniform velocity', 'uniform');
const pc = panel(330, 'Speeding up', 'accel');
const slopes = (pts) => pts.slice(1).map((p, i) => (pts[i][1] - p[1]) / (p[0] - pts[i][0]));
const sb = slopes(pb.pts);
const sc = slopes(pc.pts);
chk(sb.every((s) => near(s, sb[0], 1e-6)), 'x-t graphs: the uniform-velocity line has a constant slope');
chk(sc.every((s, i) => i === 0 || s > sc[i - 1]) && slopes(pa.pts).every((s) => near(s, 0, 1e-9) || Math.abs(s) < 1e-9), 'x-t graphs: the speeding-up curve steepens and the rest line is flat');
export const XT_SHAPES = svgDoc(
  470,
  205,
  'Three position-time graphs. A flat horizontal line means the body is at rest. A straight sloping line means uniform velocity, the slope being the velocity. A curve that gets steeper means the body is speeding up.',
  [
    pa.out,
    pb.out,
    pc.out,
    lab(85, 175, 'slope = 0', { a: 'middle', size: 10 }),
    lab(85, 190, 'velocity is zero', { a: 'middle', size: 10 }),
    lab(235, 175, 'constant slope', { a: 'middle', size: 10 }),
    lab(235, 190, 'constant velocity', { a: 'middle', size: 10 }),
    lab(385, 175, 'slope grows', { a: 'middle', size: 10 }),
    lab(385, 190, 'velocity increases', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Velocity-time graph for uniform acceleration with the area split into a rectangle and a triangle.
const u = 2;
const v = 8;
const tt = 6;
const a = (v - u) / tt;
const sRect = u * tt;
const sTri = 0.5 * (v - u) * tt;
const sTrap = 0.5 * (u + v) * tt;
chk(near(a, 1.0, 1e-9) && near(sRect, 12, 1e-9) && near(sTri, 18, 1e-9), 'v-t graph: u = 2, v = 8, t = 6 give a = 1.0, rectangle 12 and triangle 18');
chk(near(sRect + sTri, sTrap, 1e-9) && near(u * tt + 0.5 * a * tt * tt, sTrap, 1e-9), 'v-t graph: rectangle plus triangle equals the trapezoid, which equals u t + half a t squared (30)');
chk(near(v * v, u * u + 2 * a * sTrap, 1e-9), 'v-t graph: v squared equals u squared plus 2 a s (64 = 4 + 60)');
const gx0 = 55;
const gy0 = 215;
const gk = 22; // px per unit of velocity
const gt = 38; // px per second
const PA = [gx0, gy0 - u * gk];
const PB = [gx0 + tt * gt, gy0 - v * gk];
const PE = [PB[0], PA[1]];
const PD = [PB[0], gy0];
export const VT_UNIFORM = svgDoc(
  500,
  250,
  'Velocity-time graph of a body with uniform acceleration. The line rises from initial velocity u at time zero to final velocity v at time t. The area under the line is a rectangle of height u and width t plus a triangle of height v minus u and width t, and the total area is the displacement s. The slope of the line is the acceleration a.',
  [
    axes(gx0, gy0, 300, 200, 'time t (s)', 'velocity (m/s)'),
    S.path(`M${gx0} ${gy0} L${PA[0]} ${PA[1]} L${PB[0]} ${PB[1]} L${PD[0]} ${PD[1]} Z`, { fill: 'var(--diagram-yellow)', fop: 0.25, c: 'none', sw: 0 }),
    S.rect(gx0, PA[1], PE[0] - gx0, gy0 - PA[1], { fill: 'var(--diagram-blue)', fop: 0.3, c: 'var(--diagram-blue)', sw: 1 }),
    S.path(`M${PA[0]} ${PA[1]} L${PB[0]} ${PB[1]} L${PE[0]} ${PE[1]} Z`, { fill: 'var(--diagram-green)', fop: 0.3, c: 'var(--diagram-green)', sw: 1 }),
    S.line(PA[0], PA[1], PB[0], PB[1], { c: 'var(--diagram-red)', w: 3 }),
    S.line(PB[0], PB[1], PD[0], PD[1], { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(gx0, PB[1], PB[0], PB[1], { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(gx0 - 6, PA[1] + 4, 'u', { a: 'end', w: 'bold' }),
    lab(gx0 - 6, PB[1] + 4, 'v', { a: 'end', w: 'bold' }),
    lab(PD[0], gy0 + 15, 't', { a: 'middle', w: 'bold' }),
    lab(gx0 + 6, gy0 - 8, 'O', { size: 10 }),
    lab(PA[0] + 4, PA[1] - 8, 'A', { w: 'bold' }),
    lab(PB[0] + 7, PB[1] + 4, 'B', { w: 'bold' }),
    lab((gx0 + PE[0]) / 2, (PA[1] + gy0) / 2 + 4, `rectangle: u t = ${sRect}`, { a: 'middle', size: 10 }),
    lab(PE[0] - 10, (PA[1] + PB[1]) / 2 + 24, `triangle:`, { a: 'end', size: 10 }),
    lab(PE[0] - 10, (PA[1] + PB[1]) / 2 + 37, `½ (v − u) t = ${sTri}`, { a: 'end', size: 10 }),
    lab(330, 70, 'Slope of AB = a', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(330, 90, `Total area = displacement s`, { w: 'bold' }),
    lab(330, 108, `Example: u = ${u}, v = ${v}, t = ${tt}`, { size: 10 }),
    lab(330, 124, `a = ${a.toFixed(1)} m/s², s = ${sTrap} m`, { size: 10 }),
  ].join(''),
);

// 4. v-t trapezoid for a scooter: 0 to 10 m/s in 5 s, steady for 15 s, 10 m/s to rest in 10 s.
const sc1 = { vmax: 10, t1: 5, t2: 20, t3: 30 };
const dUp = 0.5 * sc1.vmax * sc1.t1;
const dMid = sc1.vmax * (sc1.t2 - sc1.t1);
const dDown = 0.5 * sc1.vmax * (sc1.t3 - sc1.t2);
const dTot = dUp + dMid + dDown;
chk(near(dUp, 25, 1e-9) && near(dMid, 150, 1e-9) && near(dDown, 50, 1e-9) && near(dTot, 225, 1e-9), 'scooter v-t graph: areas 25 m, 150 m and 50 m give 225 m');
chk(near(dTot / sc1.t3, 7.5, 1e-9) && near(sc1.vmax / sc1.t1, 2.0, 1e-9) && near(-sc1.vmax / (sc1.t3 - sc1.t2), -1.0, 1e-9), 'scooter v-t graph: average speed 7.5 m/s, acceleration 2.0 m/s², retardation 1.0 m/s²');
const tx0 = 55;
const ty0 = 205;
const tkx = 11;
const tky = 15;
const P = (t, vv) => [tx0 + t * tkx, ty0 - vv * tky];
const p0 = P(0, 0);
const p1 = P(sc1.t1, sc1.vmax);
const p2 = P(sc1.t2, sc1.vmax);
const p3 = P(sc1.t3, 0);
const p1d = P(sc1.t1, 0);
const p2d = P(sc1.t2, 0);
export const SCOOTER_VT = svgDoc(
  470,
  250,
  'Velocity-time graph of a scooter. Velocity rises uniformly from zero to 10 metres per second in 5 seconds, stays constant until 20 seconds and then falls uniformly to zero at 30 seconds. The area of the first triangle is 25 metres, of the rectangle 150 metres and of the last triangle 50 metres, so the total displacement is 225 metres.',
  [
    axes(tx0, ty0, 370, 185, 'time (s)', 'velocity (m/s)', 32),
    S.path(`M${p0} L${p1} L${p1d} Z`.replace(/,/g, ' '), { fill: 'var(--diagram-blue)', fop: 0.3, c: 'none', sw: 0 }),
    S.rect(p1d[0], p1[1], p2d[0] - p1d[0], ty0 - p1[1], { fill: 'var(--diagram-green)', fop: 0.3, c: 'none', sw: 0 }),
    S.path(`M${p2} L${p3} L${p2d} Z`.replace(/,/g, ' '), { fill: 'var(--diagram-yellow)', fop: 0.3, c: 'none', sw: 0 }),
    S.path(`M${p0} L${p1} L${p2} L${p3}`.replace(/,/g, ' '), { c: 'var(--diagram-red)', w: 3 }),
    S.line(p1[0], p1[1], p1d[0], p1d[1], { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(p2[0], p2[1], p2d[0], p2d[1], { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(tx0, p1[1], p1[0], p1[1], { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    lab(tx0 - 6, p1[1] + 4, '10', { a: 'end', size: 10 }),
    lab(p1d[0], ty0 + 15, '5', { a: 'middle', size: 10 }),
    lab(p2d[0], ty0 + 15, '20', { a: 'middle', size: 10 }),
    lab(p3[0], ty0 + 15, '30', { a: 'middle', size: 10 }),
    lab(p1d[0] - 18, ty0 - 22, `${dUp} m`, { a: 'middle', size: 10 }),
    lab((p1d[0] + p2d[0]) / 2, (p1[1] + ty0) / 2 + 4, `${dMid} m`, { a: 'middle', w: 'bold' }),
    lab(p2d[0] + 36, ty0 - 22, `${dDown} m`, { a: 'middle', size: 10 }),
    lab(tx0 + 150, 32, `Total displacement = ${dUp} + ${dMid} + ${dDown} = ${dTot} m`, { size: 11, w: 'bold' }),
  ].join(''),
);

// 5. Uniform circular motion: velocity is always tangent to the circle.
const cx = 150;
const cy = 125;
const R = 80;
const angles = [30, 120, 210, 300];
let tangentOk = true;
let circ = S.circle(cx, cy, R, { c: 'var(--diagram-muted)', w: 1.5, sw: 1.5 });
for (const deg of angles) {
  const th = (deg * Math.PI) / 180;
  const px = cx + R * Math.cos(th);
  const py = cy - R * Math.sin(th);
  const tx = -Math.sin(th);
  const ty = -Math.cos(th);
  const dot = Math.cos(th) * tx + -Math.sin(th) * ty;
  if (Math.abs(dot) > 1e-9) tangentOk = false;
  circ += S.circle(px, py, 4, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' });
  circ += S.arrow(px, py, px + 38 * tx, py + 38 * ty, { c: 'var(--diagram-blue)', w: 2.5, size: 8 });
}
chk(tangentOk, 'circular motion: each drawn velocity arrow is perpendicular to its radius');
const Rm = 2.0;
const Tm = 5.0;
const vm = (2 * Math.PI * Rm) / Tm;
chk(near(vm, 2.513, 0.001) && near(2 * Math.PI * Rm, 12.566, 0.001), 'circular motion: r = 2.0 m and T = 5.0 s give a circumference of 12.6 m and v = 2.5 m/s');
export const CIRCLE = svgDoc(
  470,
  250,
  'A body moving in a circle of radius r at constant speed. At four points the velocity arrow is drawn along the tangent, at right angles to the radius, so the direction of the velocity changes at every instant although the speed stays the same. In one period T the body covers the circumference 2 pi r, so the speed is 2 pi r divided by T.',
  [
    circ,
    S.circle(cx, cy, 3, { fill: 'currentColor' }),
    S.line(cx, cy, cx + R * Math.cos(Math.PI / 6), cy - R * Math.sin(Math.PI / 6), { c: 'var(--diagram-red)', w: 1.5, dash: '4 3' }),
    lab(cx + 25, cy - 5, 'r', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(cx - 6, cy + 18, 'centre', { a: 'middle', size: 10 }),
    lab(cx + R * Math.cos(Math.PI / 6) - 31, cy - R * Math.sin(Math.PI / 6) - 36, 'v', { c: 'var(--diagram-blue)', w: 'bold' }),
    lab(290, 60, 'Speed is constant,', { w: 'bold' }),
    lab(290, 76, 'but the direction of the', { w: 'bold' }),
    lab(290, 92, 'velocity keeps changing.', { w: 'bold' }),
    lab(290, 125, 'One round: distance = 2πr', { size: 11 }),
    lab(290, 142, 'Time for one round = T', { size: 11 }),
    lab(290, 164, 'v = 2πr / T', { c: 'var(--diagram-blue)', w: 'bold', size: 13 }),
    lab(290, 192, `Example: r = ${Rm.toFixed(1)} m, T = ${Tm.toFixed(1)} s`, { size: 10 }),
    lab(290, 207, `v = ${vm.toFixed(1)} m/s`, { size: 10 }),
  ].join(''),
);
