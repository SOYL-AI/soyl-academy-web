// ch05 Work, Energy and Power — question bank, part 2: t03 (potential energy, springs, conservative forces, conservation of
// mechanical energy). Every numerical is computed here and re-solved by an independent `check`.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, integ, ke, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const v3 = (x) => Number(dec(x, 3));

add('cons-mcq', mcq({
  stem: 'A child slides down a rough playground slide at a constant speed. During the slide, her mechanical energy (kinetic plus gravitational potential)',
  right: 'decreases, because friction does negative work; the lost energy appears as heat',
  wrong: ['stays constant, because her kinetic energy does not change', 'increases, because the slide pushes on her', 'stays constant, because energy can never be lost'],
  sol: 'The kinetic energy is constant but her height falls, so $K + U$ decreases. The work done by friction is negative and equals the loss; total energy is conserved only if the heat produced is counted — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('noncons-mcq', mcq({
  stem: 'Which one of the following forces is non-conservative?',
  right: 'The kinetic friction on a block dragged across a rough table',
  wrong: ['The weight of a stone thrown upward', 'The force of a stretched spring on the block attached to it', 'The force of gravity on a body sliding down a smooth ramp'],
  sol: 'The work of kinetic friction depends on the path length, not only on the end points, and is never zero over a closed path. Gravity and the spring force have potential energies — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const sc = { x1: 2, x2: 6, W1: 3 };
sc.W2 = sc.W1 * (sc.x2 / sc.x1) ** 2;
add('springcomp-mcq', mcq({
  stem: 'It takes 3.0 J of work to compress a spring by 2.0 cm from its natural length. The work needed to compress it by 6.0 cm from its natural length is',
  right: `${sc.W2} J`,
  wrong: [`${sc.W1 * 3} J`, `${sc.W1 * 6} J`, `${sc.W1 * 81} J`],
  sol: r`$U = \tfrac{1}{2}kx^2 \propto x^2$. Three times the compression needs $3^2 = 9$ times the work: $3.0 \times 9 = ${sc.W2}$ J — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => sc.W2 === 27 || 'sc');
add('gpath-ar', ar({
  a: 'The work done by gravity on a ball that goes from point P to point Q is the same along every path from P to Q.',
  r: 'Gravity is a non-conservative force.',
  key: 'c',
  sol: 'A is true: gravity is conservative, so its work depends only on the difference in height between P and Q. R is false for exactly this reason. Option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('closed-tf', tf({
  stem: 'A block attached to a spring is pulled out from the natural length to x = 5 cm and then allowed to return to the natural length; the total work done by the spring force over this round trip is zero.',
  key: 't',
  sol: 'True. The spring force is conservative, so over a closed path the work is zero: the spring does $-\\tfrac{1}{2}kx^2$ on the way out and $+\\tfrac{1}{2}kx^2$ on the way back.',
  d: 1, c: 'understanding', t: [3],
}));
add('hooke-fill', fill({
  stem: 'Within the elastic limit, the restoring force of a helical spring is proportional to its ___ from the natural length.',
  acc: [['extension', 'compression', 'displacement', 'elongation', 'change in length', 'stretch']],
  sol: 'The restoring force is proportional to the **extension** (or compression), $F = -kx$.',
  d: 1, c: 'recall', t: [3],
}));

const sp = { k: 250, x: 0.12 };
sp.U = R6(0.5 * sp.k * sp.x ** 2);
add('spring-num', num({
  stem: 'A spring of stiffness 250 N/m is stretched by 12 cm from its natural length. How much energy is stored in it, in J?',
  value: sp.U, tol: 0.01, unit: 'J',
  sol: r`$U = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times ${sp.k} \times (0.12)^2 = ${sp.U}$ J.`,
  scheme: [['Converts 12 cm to 0.12 m', 0.5], [`U = ½ × ${sp.k} × 0.12² = ${sp.U} J`, 0.5]],
  d: 1, c: 'application', t: [3],
}), (q) => near(integ((x) => sp.k * x, 0, sp.x), q.answer.value, 1e-9) || 'sp');
const kf = { F: 20, x: 0.04 };
kf.k = kf.F / kf.x;
kf.U = R6(0.5 * kf.k * kf.x ** 2);
add('kfromf-num', num({
  stem: 'A force of 20 N holds a spring stretched by 4.0 cm. Find the elastic potential energy stored in the spring, in J.',
  value: kf.U, tol: 0.005, unit: 'J', marks: 2,
  sol: r`$k = F/x = \dfrac{${kf.F}}{0.040} = ${kf.k}$ N/m. Then $U = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times ${kf.k} \times (0.040)^2 = ${kf.U}$ J.`,
  scheme: [[`k = F/x = ${kf.k} N/m`, 1], [`U = ½ k x² = ${kf.U} J`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(0.5 * kf.F * kf.x, q.answer.value, 1e-9) || 'kf');
const pb = { k: 300, x: 0.08, m: 0.05 };
pb.v = pb.x * Math.sqrt(pb.k / pb.m);
add('pinball-num', num({
  stem: 'The plunger of a pinball machine has a spring of stiffness 300 N/m. It is pulled back 8.0 cm and released, launching a steel ball of mass 50 g along a smooth horizontal groove. Assuming all the stored energy goes into the ball, find its launch speed, in m/s.',
  value: v3(pb.v), tol: 0.03, unit: 'm/s', marks: 2,
  sol: r`$\tfrac{1}{2}kx^2 = \tfrac{1}{2}mv^2$, so $v = x\sqrt{\dfrac{k}{m}} = 0.080 \times \sqrt{\dfrac{${pb.k}}{${pb.m}}} = 0.080 \times ${dec(Math.sqrt(pb.k / pb.m), 4)} = ${dec(pb.v, 3)}$ m/s.`,
  scheme: [['Spring energy = kinetic energy of the ball', 1], [`v = ${dec(pb.v, 3)} m/s`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(Math.sqrt((2 * 0.5 * pb.k * pb.x ** 2) / pb.m), q.answer.value, 2e-3) || 'pb');
const fw = { m: 0.5, h: 2, v: 4 };
fw.W = R6(fw.m * g * fw.h - ke(fw.m, fw.v));
add('friction-num', num({
  stem: 'A 0.50 kg block is released from rest at the top of a curved rough ramp that is 2.0 m high and reaches the bottom at 4.0 m/s. Taking $g = 9.8$ m/s², find the work done against friction, in J.',
  value: fw.W, tol: 0.05, unit: 'J', marks: 2,
  sol: r`Loss of potential energy $= mgh = 0.50 \times 9.8 \times 2.0 = ${R6(fw.m * g * fw.h)}$ J; gain of kinetic energy $= \tfrac{1}{2} \times 0.50 \times 4.0^2 = ${ke(fw.m, fw.v)}$ J. The difference is the work done against friction: $${R6(fw.m * g * fw.h)} - ${ke(fw.m, fw.v)} = ${fw.W}$ J.`,
  scheme: [['U lost and K gained', 1], [`Work against friction = ${R6(fw.m * g * fw.h)} − ${ke(fw.m, fw.v)} = ${fw.W} J`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(0.5 * 0.5 * (2 * g * 2 - 16), q.answer.value, 1e-9) || 'fw');
const mc = { m: 1.5, v: 4, k: 600 };
mc.x = mc.v * Math.sqrt(mc.m / mc.k);
add('maxcomp-num', num({
  stem: 'A 1.5 kg block sliding at 4.0 m/s on a smooth horizontal floor runs into a spring of stiffness 600 N/m fixed to a wall. Find the maximum compression of the spring, in m.',
  value: R6(mc.x), tol: 0.002, unit: 'm', marks: 2,
  sol: r`At maximum compression the block is momentarily at rest, so $\tfrac{1}{2}kx^2 = \tfrac{1}{2}mv^2$ and $x = v\sqrt{\dfrac{m}{k}} = 4.0 \times \sqrt{\dfrac{${mc.m}}{${mc.k}}} = 4.0 \times ${dec(Math.sqrt(mc.m / mc.k), 3)} = ${R6(mc.x)}$ m.`,
  scheme: [['All the kinetic energy becomes spring energy', 1], [`x = v √(m/k) = ${R6(mc.x)} m`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(Math.sqrt((mc.m * mc.v ** 2) / mc.k), q.answer.value, 1e-6) || 'mc');
