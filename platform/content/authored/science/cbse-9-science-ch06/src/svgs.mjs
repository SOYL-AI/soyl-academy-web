// Hand-drawn SVG schematics for ch06 Work, Energy and Simple Machines (allow-listed elements, palette colours only). Geometry is computed and self-checked.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const g = 9.8;
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const YELLOW = 'var(--diagram-yellow)';
const MUTED = 'var(--diagram-muted)';
const ground = (x1, x2, y) => S.line(x1, y, x2, y, { w: 2 }) + [...Array(Math.floor((x2 - x1) / 14))].map((_, i) => S.line(x1 + 6 + i * 14, y, x1 + i * 14, y + 8, { c: MUTED, w: 1 })).join('');

// 1. Positive, negative and zero work: W = F s cos(theta) with theta = 0, 90 and 180 degrees.
const F1 = 30;
const s1 = 4;
const cosD = (d) => Math.round(Math.cos((d * Math.PI) / 180) * 1e9) / 1e9;
const w0 = F1 * s1 * cosD(0);
const w90 = F1 * s1 * cosD(90);
const w180 = F1 * s1 * cosD(180);
chk(w0 === 120 && w90 === 0 && w180 === -120, 'work signs: F = 30 N and s = 4 m give +120 J at 0 degrees, 0 at 90 degrees and -120 J at 180 degrees');
const panel = (px, head, sub, arrows, res) =>
  [
    lab(px + 90, 20, head, { a: 'middle', w: 'bold' }),
    lab(px + 90, 36, sub, { a: 'middle', size: 10 }),
    ground(px + 8, px + 172, 140),
    S.rect(px + 60, 100, 60, 40, { fill: YELLOW, fop: 0.35, c: BROWN }),
    lab(px + 90, 124, 'box', { a: 'middle', size: 10 }),
    ...arrows,
    S.arrow(px + 50, 164, px + 130, 164, { c: BLUE, w: 3, size: 9 }),
    lab(px + 90, 182, 'displacement s = 4 m', { a: 'middle', size: 10, c: BLUE }),
    ...res.map((t, i) => lab(px + 90, 206 + i * 15, t, { a: 'middle', w: i === res.length - 1 ? 'bold' : undefined })),
  ];
export const WORK_SIGNS = svgDoc(
  560,
  240,
  'Three cases of work done by a force of 30 newtons on a box that moves 4 metres to the right. Left: the force points the same way as the motion, the angle is 0 degrees, cosine 0 is 1 and the work is plus 120 joules. Middle: the force points upward at right angles to the motion, the angle is 90 degrees, cosine 90 is 0 and the work is zero. Right: the force, friction, points opposite to the motion, the angle is 180 degrees, cosine 180 is minus 1 and the work is minus 120 joules.',
  [
    ...panel(0, 'Positive work', 'force along the motion', [S.arrow(px(0) + 120, 120, px(0) + 168, 120, { c: GREEN, w: 3, size: 9 }), lab(px(0) + 124, 112, 'push 30 N', { size: 10, c: GREEN, w: 'bold' })], ['angle 0°, cos 0° = 1', 'W = +120 J']),
    ...panel(187, 'Zero work', 'force at right angles', [S.arrow(187 + 90, 100, 187 + 90, 62, { c: GREEN, w: 3, size: 9 }), lab(187 + 98, 74, 'lift 30 N', { size: 10, c: GREEN, w: 'bold' })], ['angle 90°, cos 90° = 0', 'W = 0']),
    ...panel(374, 'Negative work', 'force against the motion', [S.arrow(374 + 60, 120, 374 + 12, 120, { c: RED, w: 3, size: 9 }), lab(374 + 10, 92, 'friction 30 N', { size: 10, c: RED, w: 'bold' })], ['angle 180°, cos 180° = −1', 'W = −120 J']),
  ].join(''),
);
function px(x) {
  return x;
}

// 2. Work as the area under a force-displacement graph: constant force, and a force that rises steadily.
const Fc = 12;
const sc = 4.0;
const areaConst = Fc * sc;
const Fr = 12;
const sr = 0.4;
const areaTri = 0.5 * Fr * sr;
chk(near(areaConst, 48, 1e-9) && near(areaTri, 2.4, 1e-9), 'work area: 12 N over 4.0 m gives 48 J and a force rising from 0 to 12 N over 0.40 m gives 2.4 J');
const ky = 8; // px per newton
const oy = 190;
const kx1 = 36; // px per metre (left panel, 0-5 m)
const kx2 = 360; // px per metre (right panel, 0-0.5 m)
const o1 = 50;
const o2 = 320;
export const WORK_AREA = svgDoc(
  540,
  250,
  'Two force against displacement graphs. Left: a constant force of 12 newtons acts over 4.0 metres, so the area of the rectangle, 12 times 4.0, is the work done, 48 joules. Right: a force that rises steadily from 0 to 12 newtons over 0.40 metres makes a triangle whose area, half times 0.40 times 12, is the work done, 2.4 joules.',
  [
    lab(o1 + 90, 22, 'Constant force', { a: 'middle', w: 'bold' }),
    S.arrow(o1, oy, o1 + 190, oy, { size: 6 }),
    S.arrow(o1, oy, o1, oy - 150, { size: 6 }),
    lab(o1 + 190, oy + 28, 'displacement (m)', { a: 'end', size: 10 }),
    lab(o1 - 4, oy - 154, 'force (N)', { size: 10 }),
    S.rect(o1, oy - Fc * ky, sc * kx1, Fc * ky, { fill: GREEN, fop: 0.3, c: GREEN }),
    lab(o1 + (sc * kx1) / 2, oy - (Fc * ky) / 2 - 4, 'area = 12 × 4.0', { a: 'middle', w: 'bold' }),
    lab(o1 + (sc * kx1) / 2, oy - (Fc * ky) / 2 + 12, `= ${areaConst} J`, { a: 'middle', w: 'bold' }),
    lab(o1 + sc * kx1, oy + 14, '4.0', { a: 'middle', size: 10 }),
    lab(o1 - 6, oy - Fc * ky + 4, '12', { a: 'end', size: 10 }),
    lab(o2 + 90, 22, 'Force rising steadily', { a: 'middle', w: 'bold' }),
    S.arrow(o2, oy, o2 + 190, oy, { size: 6 }),
    S.arrow(o2, oy, o2, oy - 150, { size: 6 }),
    lab(o2 + 190, oy + 28, 'displacement (m)', { a: 'end', size: 10 }),
    lab(o2 - 4, oy - 154, 'force (N)', { size: 10 }),
    S.path(`M${o2} ${oy} L${o2 + sr * kx2} ${oy} L${o2 + sr * kx2} ${oy - Fr * ky} Z`, { fill: BLUE, fop: 0.3, c: BLUE }),
    lab(o2 + 8, oy - 110, 'area = ½ × 0.40 × 12', { w: 'bold' }),
    lab(o2 + 8, oy - 94, `= ${areaTri.toFixed(1)} J`, { w: 'bold' }),
    lab(o2 + sr * kx2, oy + 14, '0.40', { a: 'middle', size: 10 }),
    lab(o2 + sr * kx2 + 6, oy - Fr * ky + 4, '12', { size: 10 }),
  ].join(''),
);

// 3. A falling mango: kinetic and potential energy bars at each metre of the fall (mass 0.40 kg, from 5.0 m).
const mM = 0.4;
const H = 5.0;
const total = mM * g * H;
const rows = [5, 4, 3, 2, 1, 0].map((h) => {
  const pe = mM * g * h;
  const ke = total - pe;
  return { h, pe, ke, v: Math.sqrt(2 * g * (H - h)) };
});
chk(rows.every((r) => near(r.pe + r.ke, 19.6, 1e-9)) && near(rows[5].ke, 19.6, 1e-9) && near(rows[5].v, 9.9, 0.005), 'fall bars: PE + KE = 19.6 J at every height for a 0.40 kg mango dropped from 5.0 m, and it lands at about 9.9 m/s');
chk(near(rows[2].pe, 11.76, 1e-9) && near(rows[2].ke, 7.84, 1e-9), 'fall bars: at 3.0 m the PE is 11.76 J and the KE is 7.84 J');
const kb = 7; // px per joule
const base = 210;
const bx0 = 62;
const dx = 78;
export const FALL_BARS = svgDoc(
  560,
  290,
  'Bar chart for a 0.40 kilogram mango falling from a branch 5.0 metres above the ground. At each metre of the fall the potential energy bar gets shorter and the kinetic energy bar gets longer by the same amount, so the two together always make 19.6 joules. At the top the mango has 19.6 joules of potential energy and no kinetic energy. Just before landing it has no potential energy and 19.6 joules of kinetic energy, a speed of about 9.9 metres per second.',
  [
    S.line(40, base, 540, base, { w: 2 }),
    lab(40, 22, 'Energy of a 0.40 kg mango falling from 5.0 m (g = 9.8 m/s²)', { w: 'bold' }),
    S.rect(380, 32, 12, 12, { fill: BLUE, fop: 0.45, c: BLUE }),
    lab(396, 42, 'potential energy', { size: 10 }),
    S.rect(380, 50, 12, 12, { fill: RED, fop: 0.45, c: RED }),
    lab(396, 60, 'kinetic energy', { size: 10 }),
    S.line(40, base - total * kb, 540, base - total * kb, { c: MUTED, w: 1, dash: '5 4' }),
    lab(42, base - total * kb - 6, 'total 19.6 J', { size: 10 }),
    ...rows.flatMap((r, i) => {
      const x = bx0 + i * dx;
      const hPe = r.pe * kb;
      const hKe = r.ke * kb;
      const out = [];
      if (hPe > 0) out.push(S.rect(x, base - hPe, 44, hPe, { fill: BLUE, fop: 0.45, c: BLUE }));
      if (hKe > 0) out.push(S.rect(x, base - hPe - hKe, 44, hKe, { fill: RED, fop: 0.45, c: RED }));
      if (hPe >= 20) out.push(lab(x + 22, base - hPe / 2 + 4, r.pe.toFixed(1), { a: 'middle', size: 10 }));
      if (hKe >= 20) out.push(lab(x + 22, base - hPe - hKe / 2 + 4, r.ke.toFixed(1), { a: 'middle', size: 10 }));
      out.push(lab(x + 22, base + 16, `h = ${r.h.toFixed(1)} m`, { a: 'middle', size: 10 }));
      out.push(lab(x + 22, base + 32, `v = ${r.v.toFixed(1)}`, { a: 'middle', size: 10 }));
      return out;
    }),
    lab(18, base + 32, 'speed', { size: 10, c: MUTED }),
    lab(280, 276, 'v is in m/s. Energy values in the bars are in joules.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Roller-coaster track: energy at four points, no friction.
const keys = [
  { name: 'A', x: 50, h: 25 },
  { name: 'B', x: 180, h: 5 },
  { name: 'C', x: 310, h: 15 },
  { name: 'D', x: 440, h: 0 },
];
const kh = 5.2;
const gy = 232;
const hAt = (x) => {
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (x >= a.x && x <= b.x) return a.h + ((b.h - a.h) * (1 - Math.cos((Math.PI * (x - a.x)) / (b.x - a.x)))) / 2;
  }
  return keys[keys.length - 1].h;
};
const trackPts = [];
for (let x = keys[0].x; x <= keys[3].x; x += 5) trackPts.push(`${x} ${(gy - hAt(x) * kh).toFixed(1)}`);
const speedAt = (h) => Math.sqrt(2 * g * (keys[0].h - h));
chk(near(speedAt(15), 14.0, 1e-9) && near(speedAt(5), 19.8, 0.005) && near(speedAt(0), 22.1, 0.005) && speedAt(25) === 0, 'roller: from rest at 25 m the speed is 0 at A, about 19.8 m/s at 5 m, 14.0 m/s at 15 m and about 22.1 m/s at the ground');
const callouts = [
  { k: keys[0], tx: 14, ty: 70, a: 'start' },
  { k: keys[1], tx: 180, ty: 112, a: 'middle' },
  { k: keys[2], tx: 310, ty: 100, a: 'middle' },
  { k: keys[3], tx: 440, ty: 150, a: 'middle' },
];
export const ROLLER = svgDoc(
  540,
  290,
  'A roller-coaster track without friction. A car starts from rest at point A, 25 metres above the ground. At B, 5.0 metres high, its speed is about 19.8 metres per second. At C, 15 metres high, its speed is 14.0 metres per second. At D on the ground its speed is about 22.1 metres per second. Wherever it is lower, it is faster, because potential energy changes into kinetic energy and the total stays the same.',
  [
    S.line(30, gy, 520, gy, { c: MUTED, w: 1.5, dash: '3 3' }),
    lab(34, gy + 14, 'ground level', { size: 10, c: MUTED }),
    S.path(`M${trackPts.join(' L')}`, { w: 3 }),
    ...callouts.flatMap(({ k, tx, ty, a }) => {
      const y = gy - k.h * kh;
      const v = speedAt(k.h);
      return [
        S.circle(k.x, y, 6, { fill: RED, fop: 0.6, c: RED }),
        lab(tx, ty, `${k.name}: height ${k.h} m`, { a, w: 'bold' }),
        lab(tx, ty + 14, k.h === 25 ? 'speed 0 (at rest)' : `speed ${v.toFixed(1)} m/s`, { a }),
        S.lead(tx, ty + 18, k.x, y - 7),
      ];
    }),
    lab(270, 276, 'PE + KE is the same at every point. The speed does not depend on the mass.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 5. Three classes of lever (arm lengths in cm drawn at 2 px per cm along a 100 cm beam).
const sc2 = 2;
const bx = 40;
const arms = [
  { cls: 'Class I', note: 'fulcrum between effort and load', fx: 25, lx: 0, ex: 100, eArm: 75, lArm: 25, eg: 'seesaw, crowbar, scissors' },
  { cls: 'Class II', note: 'load between fulcrum and effort', fx: 0, lx: 25, ex: 100, eArm: 100, lArm: 25, eg: 'wheelbarrow, nutcracker, bottle opener' },
  { cls: 'Class III', note: 'effort between fulcrum and load', fx: 0, lx: 100, ex: 30, eArm: 30, lArm: 100, eg: 'tongs, fishing rod, the forearm' },
];
for (const a of arms) {
  chk(a.eArm === Math.abs(a.ex - a.fx) && a.lArm === Math.abs(a.lx - a.fx), `lever ${a.cls}: drawn arms match effort arm ${a.eArm} cm and load arm ${a.lArm} cm`);
}
chk(near(arms[0].eArm / arms[0].lArm, 3.0, 1e-9) && near(arms[1].eArm / arms[1].lArm, 4.0, 1e-9) && near(arms[2].eArm / arms[2].lArm, 0.3, 1e-9), 'levers: MA = 3.0 (class I), 4.0 (class II) and 0.30 (class III)');
const leverRow = (a, i) => {
  const by = 62 + i * 112;
  const X = (cm) => bx + cm * sc2;
  const loadDown = true;
  const effortUp = a.cls !== 'Class I';
  const ma = a.eArm / a.lArm;
  const loadLabelLeft = a.cls === 'Class I';
  return [
    S.rect(X(0), by - 4, 100 * sc2, 8, { fill: BROWN, fop: 0.4, c: BROWN }),
    S.path(`M${X(a.fx)} ${by + 4} L${X(a.fx) - 10} ${by + 24} L${X(a.fx) + 10} ${by + 24} Z`, { fill: MUTED, fop: 0.5, c: MUTED }),
    lab(X(a.fx), by + 38, 'fulcrum', { a: 'middle', size: 10 }),
    loadDown ? S.arrow(X(a.lx), by + 4, X(a.lx), by + 46, { c: RED, w: 3, size: 9 }) : '',
    lab(loadLabelLeft ? X(a.lx) - 6 : X(a.lx) + 6, by + 40, 'load', { a: loadLabelLeft ? 'end' : 'start', size: 10, c: RED, w: 'bold' }),
    effortUp ? S.arrow(X(a.ex), by - 4, X(a.ex), by - 46, { c: GREEN, w: 3, size: 9 }) : S.arrow(X(a.ex), by + 4, X(a.ex), by + 46, { c: GREEN, w: 3, size: 9 }),
    lab(X(a.ex) + (a.cls === 'Class II' ? -6 : 6), effortUp ? by - 36 : by + 40, 'effort', { a: a.cls === 'Class II' ? 'end' : 'start', size: 10, c: GREEN, w: 'bold' }),
    lab(310, by - 20, `${a.cls}: ${a.note}`, { w: 'bold', size: 11 }),
    lab(310, by - 4, `effort arm ${a.eArm} cm, load arm ${a.lArm} cm`, { size: 11 }),
    lab(310, by + 12, `MA = ${a.eArm} ÷ ${a.lArm} = ${ma < 1 ? ma.toFixed(2) : ma.toFixed(1)}`, { size: 11, w: 'bold' }),
    lab(310, by + 28, `e.g. ${a.eg}`, { size: 10 }),
  ].join('');
};
export const LEVERS = svgDoc(
  620,
  360,
  'The three classes of lever on a 100 centimetre beam. Class I: the fulcrum is between the load and the effort, effort arm 75 centimetres and load arm 25 centimetres, mechanical advantage 3.0, for example a seesaw or crowbar. Class II: the load is between the fulcrum and the effort, effort arm 100 centimetres and load arm 25 centimetres, mechanical advantage 4.0, for example a wheelbarrow. Class III: the effort is between the fulcrum and the load, effort arm 30 centimetres and load arm 100 centimetres, mechanical advantage 0.30, for example tongs.',
  arms.map(leverRow).join(''),
);

// 6. Pulleys: single fixed, single movable and a block and tackle with three supporting strands (ideal, no friction, light pulleys).
const pulleys = [
  { name: 'single fixed', strands: 1, load: 100, effort: 100 },
  { name: 'single movable', strands: 2, load: 100, effort: 50 },
  { name: 'block and tackle', strands: 3, load: 150, effort: 50 },
];
for (const p of pulleys) chk(near(p.load / p.effort, p.strands, 1e-9), `pulley ${p.name}: load ${p.load} N over effort ${p.effort} N equals ${p.strands} supporting strands`);
const wheel = (cx, cy, r) => S.circle(cx, cy, r, { fill: MUTED, fop: 0.3, c: 'currentColor' }) + S.circle(cx, cy, 2.5, { fill: 'currentColor', c: 'currentColor' });
const box = (x, y, w, h, t) => S.rect(x, y, w, h, { fill: YELLOW, fop: 0.35, c: BROWN }) + lab(x + w / 2, y + h / 2 + 4, t, { a: 'middle', size: 10 });
const bar = (x1, x2) => S.rect(x1, 28, x2 - x1, 8, { fill: BROWN, fop: 0.4, c: BROWN });
const A = 0;
const B = 190;
const Cx = 380;
export const PULLEYS = svgDoc(
  570,
  300,
  'Three pulley systems with ideal, friction-free, light pulleys. Single fixed pulley: the rope goes over a wheel fixed to a beam, the effort of 100 newtons equals the load of 100 newtons, so the mechanical advantage is 1 and it only changes the direction of the pull. Single movable pulley: two rope strands support the load, so an effort of 50 newtons lifts a load of 100 newtons, a mechanical advantage of 2. Block and tackle with three supporting strands: an effort of 50 newtons lifts a load of 150 newtons, a mechanical advantage of 3.',
  [
    lab(A + 90, 18, 'Single fixed pulley', { a: 'middle', w: 'bold' }),
    bar(A + 30, A + 130),
    S.line(A + 80, 36, A + 80, 55, { w: 2 }),
    wheel(A + 80, 75, 20),
    S.line(A + 60, 75, A + 60, 195, { w: 2 }),
    S.line(A + 100, 75, A + 100, 150, { w: 2 }),
    box(A + 36, 195, 48, 30, '100 N'),
    S.arrow(A + 100, 150, A + 100, 200, { c: GREEN, w: 3, size: 9 }),
    lab(A + 106, 182, 'effort', { size: 10, c: GREEN, w: 'bold' }),
    lab(A + 106, 196, '100 N', { size: 10, c: GREEN, w: 'bold' }),
    lab(A + 90, 252, 'MA = 100 ÷ 100 = 1', { a: 'middle', w: 'bold' }),
    lab(A + 90, 268, 'only changes direction', { a: 'middle', size: 10 }),
    lab(B + 90, 18, 'Single movable pulley', { a: 'middle', w: 'bold' }),
    bar(B + 30, B + 130),
    S.line(B + 60, 36, B + 60, 130, { w: 2 }),
    S.path(`M${B + 60} 130 L${B + 60} 135 A20 20 0 0 0 ${B + 100} 135 L${B + 100} 80`, { w: 2 }),
    wheel(B + 80, 135, 20),
    S.arrow(B + 100, 110, B + 100, 62, { c: GREEN, w: 3, size: 9 }),
    lab(B + 106, 80, 'effort', { size: 10, c: GREEN, w: 'bold' }),
    lab(B + 106, 94, '50 N', { size: 10, c: GREEN, w: 'bold' }),
    S.line(B + 80, 155, B + 80, 195, { w: 2 }),
    box(B + 56, 195, 48, 30, '100 N'),
    lab(B + 90, 252, 'MA = 100 ÷ 50 = 2', { a: 'middle', w: 'bold' }),
    lab(B + 90, 268, 'two strands share the load', { a: 'middle', size: 10 }),
    lab(Cx + 90, 18, 'Block and tackle', { a: 'middle', w: 'bold' }),
    bar(Cx + 20, Cx + 130),
    S.line(Cx + 52, 36, Cx + 52, 60, { w: 2 }),
    S.line(Cx + 100, 36, Cx + 100, 60, { w: 2 }),
    wheel(Cx + 52, 72, 12),
    wheel(Cx + 100, 72, 12),
    S.rect(Cx + 36, 138, 56, 28, { c: BROWN, sw: 1.5 }),
    wheel(Cx + 76, 152, 12),
    S.line(Cx + 40, 138, Cx + 40, 72, { w: 2 }),
    S.path(`M${Cx + 40} 72 A12 12 0 0 1 ${Cx + 64} 72`, { w: 2 }),
    S.line(Cx + 64, 72, Cx + 64, 152, { w: 2 }),
    S.path(`M${Cx + 64} 152 A12 12 0 0 0 ${Cx + 88} 152`, { w: 2 }),
    S.line(Cx + 88, 152, Cx + 88, 72, { w: 2 }),
    S.path(`M${Cx + 88} 72 A12 12 0 0 1 ${Cx + 112} 72`, { w: 2 }),
    S.line(Cx + 112, 72, Cx + 112, 130, { w: 2 }),
    S.arrow(Cx + 112, 110, Cx + 112, 160, { c: GREEN, w: 3, size: 9 }),
    lab(Cx + 118, 176, 'effort', { size: 10, c: GREEN, w: 'bold' }),
    lab(Cx + 118, 190, '50 N', { size: 10, c: GREEN, w: 'bold' }),
    S.line(Cx + 64, 166, Cx + 64, 195, { w: 2 }),
    box(Cx + 40, 195, 48, 30, '150 N'),
    lab(Cx + 90, 252, 'MA = 150 ÷ 50 = 3', { a: 'middle', w: 'bold' }),
    lab(Cx + 90, 268, 'three supporting strands', { a: 'middle', size: 10 }),
  ].join(''),
);
