// Hand-drawn SVG schematics for ch05 Force and Laws of Motion (allow-listed elements, palette colours only). Geometry is computed and self-checked.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const ground = (x1, x2, y) => S.line(x1, y, x2, y, { w: 2 }) + [...Array(Math.floor((x2 - x1) / 14))].map((_, i) => S.line(x1 + 6 + i * 14, y, x1 + i * 14, y + 8, { c: 'var(--diagram-muted)', w: 1 })).join('');

// 1. Balanced forces: a book on a table (weight = normal reaction) and a crate pushed at steady speed (push = friction).
const k = 2.0; // px per newton in panel 1
const W = 40;
const Nr = 40;
const push = 30;
const fric = 30;
chk(W === Nr && push === fric, 'balanced forces: weight equals the normal reaction and the push equals the friction, so the net force is zero');
const kh = 2.4;
const bx = 70;
const by = 160;
export const BALANCED = svgDoc(
  480,
  240,
  'Two cases of balanced forces. Left: a book resting on a table. Its weight of 40 newtons acts downward and the table pushes up with a normal reaction of 40 newtons, so the net force is zero. Right: a crate pushed along the floor at steady speed. The push of 30 newtons to the right equals the friction of 30 newtons to the left, so the net force is zero and the speed does not change.',
  [
    ground(20, 220, by + 30),
    S.rect(bx, by - 40, 80, 70, { fill: 'var(--diagram-yellow)', fop: 0.35, c: 'var(--diagram-brown)' }),
    lab(bx + 8, by + 18, 'book', {}),
    S.arrow(bx + 40, by - 40, bx + 40, by - 40 - Nr * k * 0.8, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    S.arrow(bx + 40, by - 5, bx + 40, by + 50, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(bx + 50, by - 40 - Nr * k * 0.4, 'N = 40 N', { c: 'var(--diagram-green)', w: 'bold' }),
    lab(bx + 50, by + 48, 'W = 40 N', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(120, 30, 'Net force = 0', { a: 'middle', w: 'bold' }),
    ground(250, 470, by + 30),
    S.rect(310, by - 30, 90, 60, { fill: 'var(--diagram-blue)', fop: 0.3, c: 'var(--diagram-blue)' }),
    lab(355, by + 4, 'crate', { a: 'middle' }),
    S.arrow(400, by, 400 + push * kh * 0.9, by, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    S.arrow(310, by, 310 - fric * kh * 0.9, by, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(400 + 2, by - 10, 'push 30 N', { c: 'var(--diagram-green)', w: 'bold' }),
    lab(310 - fric * kh * 0.9, by - 10, 'friction 30 N', { c: 'var(--diagram-red)', w: 'bold' }),
    lab(360, 30, 'Net force = 0: steady speed', { a: 'middle', w: 'bold' }),
  ].join(''),
);

// 2. Unbalanced forces: pull 30 N right, friction 12 N left, net 18 N.
const pull = 30;
const fr = 12;
const net = pull - fr;
chk(net === 18, 'unbalanced forces: 30 N pull and 12 N friction leave a net force of 18 N');
const ku = 5;
export const UNBALANCED = svgDoc(
  470,
  190,
  'A block pulled to the right with 30 newtons while friction of 12 newtons acts to the left. The forces are unbalanced and the net force is 30 minus 12, which is 18 newtons to the right, so the block speeds up in that direction.',
  [
    ground(20, 450, 150),
    S.rect(170, 100, 90, 50, { fill: 'var(--diagram-yellow)', fop: 0.35, c: 'var(--diagram-brown)' }),
    lab(215, 130, 'block', { a: 'middle' }),
    S.arrow(260, 125, 260 + pull * ku * 0.9, 125, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    S.arrow(170, 125, 170 - fr * ku * 0.9, 125, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(268, 112, 'pull 30 N', { c: 'var(--diagram-green)', w: 'bold' }),
    lab(166, 112, 'friction 12 N', { a: 'end', c: 'var(--diagram-red)', w: 'bold' }),
    S.arrow(215, 50, 215 + net * ku * 0.9, 50, { c: 'var(--diagram-blue)', w: 4, size: 10 }),
    lab(215, 38, `net force = 30 − 12 = ${net} N`, { w: 'bold', c: 'var(--diagram-blue)' }),
    lab(215 + net * ku * 0.9 + 8, 54, 'acceleration', { size: 10 }),
    lab(235, 178, 'Arrow length is proportional to the size of the force.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Friction against applied force: static friction rises, peaks, then drops to the smaller sliding value.
const fMax = 20;
const fSlide = 14;
chk(fSlide < fMax, 'friction graph: sliding friction (14 N) is less than the limiting static friction (20 N)');
const gx = 60;
const gy = 190;
const sx = 12;
const sy = 7;
const pts = [[0, 0], [fMax, fMax], [fMax, fSlide], [30, fSlide]];
const P = ([x, y]) => `${(gx + x * sx).toFixed(1)} ${(gy - y * sy).toFixed(1)}`;
export const FRICTION_GRAPH = svgDoc(
  470,
  240,
  'Graph of friction against the applied force on a block. While the block stays at rest, friction equals the applied force and rises along a straight line up to a maximum of 20 newtons. When the applied force passes this limit the block starts to slide and the friction drops to a smaller constant value of 14 newtons.',
  [
    S.arrow(gx, gy, gx + 340, gy, { size: 6 }),
    S.arrow(gx, gy, gx, gy - 170, { size: 6 }),
    lab(gx + 340, gy + 16, 'applied force (N)', { a: 'end', size: 10 }),
    lab(gx + 4, gy - 175, 'friction (N)', { size: 10 }),
    S.path(`M${P(pts[0])} L${P(pts[1])}`, { c: 'var(--diagram-red)', w: 3 }),
    S.line(gx + fMax * sx, gy - fMax * sy, gx + fMax * sx, gy - fSlide * sy, { c: 'var(--diagram-muted)', w: 1.5, dash: '4 3' }),
    S.path(`M${P(pts[2])} L${P(pts[3])}`, { c: 'var(--diagram-blue)', w: 3 }),
    S.circle(gx + fMax * sx, gy - fMax * sy, 4, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
    lab(gx + fMax * sx - 8, gy - fMax * sy - 8, 'maximum static friction 20 N', { a: 'end', size: 10 }),
    lab(gx + 30 * sx - 4, gy - fSlide * sy - 8, 'sliding friction 14 N', { a: 'end', size: 10, c: 'var(--diagram-blue)' }),
    lab(gx + 175, gy - 40, 'block at rest:', { size: 10 }),
    lab(gx + 175, gy - 27, 'friction = applied force', { size: 10 }),
    lab(gx + fMax * sx, gy + 16, '20', { a: 'middle', size: 10 }),
  ].join(''),
);

// 4. Tablecloth and coin (inertia of rest): before, and during a quick tug.
export const TABLECLOTH = svgDoc(
  480,
  230,
  'Inertia demonstration. Left: a coin rests on a cloth on a table. Right: the cloth is pulled away with a sudden quick tug. The coin does not move sideways with the cloth because of its inertia, so it stays where it was and drops onto the table.',
  [
    lab(110, 24, 'Before', { a: 'middle', w: 'bold' }),
    S.rect(30, 150, 160, 12, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)' }),
    S.rect(30, 162, 160, 38, { fill: 'var(--diagram-brown)', fop: 0.3, c: 'var(--diagram-brown)' }),
    S.ellipse(110, 145, 12, 5, { fill: 'var(--diagram-yellow)', fop: 0.6, c: 'var(--diagram-brown)' }),
    lab(110, 130, 'coin', { a: 'middle', size: 10 }),
    lab(36, 160, 'cloth', { size: 10 }),
    lab(110, 214, 'table', { a: 'middle', size: 10 }),
    lab(360, 24, 'After a quick tug', { a: 'middle', w: 'bold' }),
    S.rect(270, 162, 170, 38, { fill: 'var(--diagram-brown)', fop: 0.3, c: 'var(--diagram-brown)' }),
    S.rect(380, 150, 100, 12, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)' }),
    S.arrow(440, 120, 476, 120, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(425, 108, 'quick tug', { a: 'middle', c: 'var(--diagram-red)', w: 'bold', size: 10 }),
    S.ellipse(330, 157, 12, 5, { fill: 'var(--diagram-yellow)', fop: 0.6, c: 'var(--diagram-brown)' }),
    lab(330, 140, 'coin stays in place', { a: 'middle', size: 10 }),
    lab(330, 80, 'The coin tends to stay at rest:', { a: 'middle', size: 10 }),
    lab(330, 94, 'this is inertia.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 5. Recoil of a gun: equal and opposite momenta.
const mB = 0.020;
const vB = 400;
const mG = 4.0;
const vG = (mB * vB) / mG;
chk(near(mB * vB, 8.0, 1e-9) && near(mG * vG, 8.0, 1e-9) && near(vG, 2.0, 1e-9), 'recoil: bullet 0.020 kg at 400 m/s and gun 4.0 kg give momentum 8.0 kg m/s each way and a recoil speed of 2.0 m/s');
export const RECOIL = svgDoc(
  480,
  200,
  'Recoil of a gun. A bullet of mass 0.020 kilograms leaves at 400 metres per second to the right, with momentum 8.0 kilogram metres per second. The gun of mass 4.0 kilograms moves back to the left at 2.0 metres per second, with an equal momentum of 8.0 kilogram metres per second in the opposite direction.',
  [
    ground(10, 470, 160),
    S.rect(190, 100, 100, 28, { fill: 'var(--diagram-muted)', fop: 0.35, c: 'var(--diagram-muted)' }),
    S.rect(200, 128, 24, 28, { fill: 'var(--diagram-muted)', fop: 0.35, c: 'var(--diagram-muted)' }),
    lab(240, 118, 'gun 4.0 kg', { a: 'middle', size: 10 }),
    S.circle(330, 114, 5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
    S.arrow(340, 114, 440, 114, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(390, 100, 'bullet 0.020 kg, 400 m/s', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    S.arrow(180, 114, 90, 114, { c: 'var(--diagram-blue)', w: 3, size: 9 }),
    lab(130, 100, 'recoil 2.0 m/s', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(240, 40, 'Momentum of bullet = 0.020 × 400 = 8.0 kg m/s →', { a: 'middle', c: 'var(--diagram-red)', w: 'bold' }),
    lab(240, 60, 'Momentum of gun = 4.0 × 2.0 = 8.0 kg m/s ←', { a: 'middle', c: 'var(--diagram-blue)', w: 'bold' }),
    lab(240, 82, 'Equal and opposite: the total stays zero.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 6. Force-time area: the same change of momentum with a short large force or a long small force.
const dp = 4.8;
const F1 = 96;
const t1 = dp / F1;
const F2 = 12;
const t2 = dp / F2;
chk(near(F1 * t1, dp, 1e-9) && near(F2 * t2, dp, 1e-9) && near(t1, 0.05, 1e-9) && near(t2, 0.4, 1e-9), 'force-time: 96 N for 0.05 s and 12 N for 0.40 s both give an impulse of 4.8 N s');
const ax = 60;
const ay = 190;
const kT = 300 / 0.5;
const kF = 150 / 100;
export const IMPULSE = svgDoc(
  480,
  240,
  'Force-time sketch for catching a ball of momentum 4.8 kilogram metres per second. Catching it with stiff hands stops it in 0.05 seconds, which needs a force of 96 newtons. Letting the hands move back stops it in 0.40 seconds and needs only 12 newtons. Both rectangles have the same area, 4.8 newton seconds, which is the change of momentum.',
  [
    S.arrow(ax, ay, ax + 380, ay, { size: 6 }),
    S.arrow(ax, ay, ax, ay - 170, { size: 6 }),
    lab(ax + 380, ay + 16, 'time (s)', { a: 'end', size: 10 }),
    lab(ax + 4, ay - 174, 'force (N)', { size: 10 }),
    S.rect(ax, ay - F1 * kF, t1 * kT, F1 * kF, { fill: 'var(--diagram-red)', fop: 0.35, c: 'var(--diagram-red)' }),
    S.rect(ax, ay - F2 * kF, t2 * kT, F2 * kF, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'var(--diagram-blue)' }),
    lab(ax + t1 * kT + 6, ay - F1 * kF + 10, '96 N for 0.05 s', { size: 10, c: 'var(--diagram-red)', w: 'bold' }),
    lab(ax + t2 * kT / 2 + 20, ay - F2 * kF - 6, '12 N for 0.40 s', { a: 'middle', size: 10, c: 'var(--diagram-blue)', w: 'bold' }),
    lab(ax + t1 * kT + 6, ay - F1 * kF + 26, 'area = 4.8 N s', { size: 10 }),
    lab(ax + t2 * kT / 2 + 20, ay - 8, 'area = 4.8 N s', { a: 'middle', size: 10 }),
    lab(ax + t1 * kT, ay + 14, '0.05', { a: 'middle', size: 10 }),
    lab(ax + t2 * kT, ay + 14, '0.40', { a: 'middle', size: 10 }),
    lab(ax + 260, 70, 'Area under a force–time', { size: 10 }),
    lab(ax + 260, 84, 'graph = impulse = change', { size: 10 }),
    lab(ax + 260, 98, 'of momentum.', { size: 10 }),
  ].join(''),
);

// 7. Action-reaction pairs: a swimmer and a rocket.
export const PAIRS = svgDoc(
  500,
  230,
  'Two action-reaction pairs. A swimmer pushes the water backward with her hands and feet and the water pushes her forward with an equal force. A rocket pushes hot gas downward and the gas pushes the rocket upward with an equal force. The two forces of each pair act on different bodies.',
  [
    lab(110, 22, 'Swimmer', { a: 'middle', w: 'bold' }),
    S.rect(20, 120, 200, 70, { fill: 'var(--diagram-blue)', fop: 0.2, c: 'var(--diagram-blue)' }),
    S.ellipse(115, 112, 40, 10, { fill: 'var(--diagram-yellow)', fop: 0.5, c: 'var(--diagram-brown)' }),
    S.arrow(150, 92, 200, 92, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    lab(175, 80, 'water on swimmer', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    S.arrow(110, 150, 50, 150, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(80, 168, 'swimmer on water', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(370, 22, 'Rocket', { a: 'middle', w: 'bold' }),
    S.path('M370 50 L388 130 L352 130 Z', { fill: 'var(--diagram-muted)', fop: 0.35, c: 'var(--diagram-muted)' }),
    S.path('M358 130 L370 170 L382 130', { fill: 'var(--diagram-yellow)', fop: 0.6, c: 'var(--diagram-brown)' }),
    S.arrow(404, 130, 404, 70, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    lab(412, 100, 'gas on rocket', { size: 10, c: 'var(--diagram-green)' }),
    S.arrow(370, 175, 370, 215, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(380, 205, 'rocket on gas', { size: 10, c: 'var(--diagram-red)' }),
    lab(240, 224, 'Equal size, opposite directions, on different bodies.', { a: 'middle', size: 10 }),
  ].join(''),
);

// 8. Two trolleys pushed apart by a spring.
const m1 = 2.0;
const m2 = 3.0;
const v2 = 1.2;
const v1 = (m2 * v2) / m1;
chk(near(v1, 1.8, 1e-9) && near(m1 * v1, m2 * v2, 1e-9), 'trolleys: 2.0 kg and 3.0 kg pushed apart from rest, the 3.0 kg trolley at 1.2 m/s gives 1.8 m/s for the 2.0 kg trolley');
export const TROLLEYS = svgDoc(
  480,
  200,
  'Two trolleys pushed apart by a spring. The 2.0 kilogram trolley moves left at 1.8 metres per second and the 3.0 kilogram trolley moves right at 1.2 metres per second. Their momenta are 3.6 kilogram metres per second to the left and 3.6 to the right, which cancel, so the total momentum stays zero.',
  [
    lab(240, 20, 'Before: both at rest, total momentum 0', { a: 'middle', size: 10, w: 'bold' }),
    S.rect(190, 40, 50, 28, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)' }),
    S.rect(250, 40, 60, 28, { fill: 'var(--diagram-red)', fop: 0.35, c: 'var(--diagram-red)' }),
    S.path('M240 54 L243 48 L246 60 L249 48 L250 54', { w: 1.5 }),
    lab(215, 58, '2.0 kg', { a: 'middle', size: 10 }),
    lab(280, 58, '3.0 kg', { a: 'middle', size: 10 }),
    ground(20, 460, 150),
    lab(240, 96, 'After: spring released', { a: 'middle', size: 10, w: 'bold' }),
    S.rect(100, 108, 50, 28, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)' }),
    S.rect(330, 108, 60, 28, { fill: 'var(--diagram-red)', fop: 0.35, c: 'var(--diagram-red)' }),
    lab(125, 126, '2.0 kg', { a: 'middle', size: 10 }),
    lab(360, 126, '3.0 kg', { a: 'middle', size: 10 }),
    S.arrow(100, 122, 40, 122, { c: 'var(--diagram-blue)', w: 3, size: 9 }),
    S.arrow(390, 122, 450, 122, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    lab(70, 104, '1.8 m/s', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(420, 104, '1.2 m/s', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(240, 178, `2.0 × 1.8 = ${(m1 * v1).toFixed(1)} kg m/s left and 3.0 × 1.2 = ${(m2 * v2).toFixed(1)} kg m/s right`, { a: 'middle', size: 10 }),
  ].join(''),
);
