// ch05 Work, Energy and Power — question bank, part 1: t01 (work by constant and variable forces) and t02 (kinetic energy,
// work–energy theorem). Every numerical is computed here and re-solved by an independent `check`; solutions and schemes
// print the computed values.
// AR keys planned across the chapter: a (pendulum tension), d (equal speed steps), c (gravity path), b (perfectly inelastic), a (friction can do positive work).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, integ, dot, ke, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num } = mk;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ t01 work by constant and variable forces
add('signwork-mcq', mcq({
  stem: 'At a weightlifting camp in Patiala, a lifter raises a barbell from the floor to above his head and then lowers it slowly back to the floor. For the whole up-and-down trip, the net work done by the lifter’s force on the barbell is',
  right: 'zero, because the positive work on the way up is cancelled by the negative work on the way down',
  wrong: ['positive, because the lifter’s force is always upward', 'negative, because the weight acts downward all the time', 'twice the work done on the way up'],
  sol: 'Going up, force and displacement are both upward: work is positive, $+mgh$. Coming down slowly, the lifter’s force is still upward but the displacement is downward: work is $-mgh$. The sum over the round trip is zero — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const dp = { d: [3, -2], good: [2, 3] };
add('dotperp-mcq', mcq({
  stem: 'A particle is displaced by $\\vec d = (3\\hat\\imath - 2\\hat\\jmath)$ m. Which one of the following constant forces (in N) does no work on it?',
  right: '$2\\hat\\imath + 3\\hat\\jmath$',
  wrong: ['$3\\hat\\imath - 2\\hat\\jmath$', '$2\\hat\\imath - 3\\hat\\jmath$', '$-3\\hat\\imath + 2\\hat\\jmath$'],
  sol: r`Work $= \vec F\cdot\vec d$. For $(2, 3)$: $2 \times 3 + 3 \times (-2) = 0$. The others give $13$, $12$ and $-13$ J — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => dot([2, 3], dp.d) === 0 && dot([3, -2], dp.d) === 13 && dot([2, -3], dp.d) === 12 || 'dp');
add('whirl-mcq', mcq({
  stem: 'At a village fair a boy whirls a stone, tied to a string, in a horizontal circle at a steady speed. The work done by the string’s tension on the stone during one full revolution is',
  right: 'zero, because the tension is perpendicular to the stone’s displacement at every instant',
  wrong: ['equal to the tension multiplied by the circumference of the circle', 'positive, because the stone is kept moving', 'negative, because the string pulls the stone inwards'],
  sol: 'The tension points to the centre while the stone’s small displacement is along the tangent, at $90^\\circ$ to it: $\\cos 90^\\circ = 0$, so every small work is zero — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const fs = { up: 30, down: 12 };
fs.net = fs.up - fs.down;
add('fxsign-mcq', mcq({
  stem: 'On the force–position graph of a body, the region between the curve and the x-axis from $x = 0$ to $4$ m lies above the axis and has an area of 30 J; from $x = 4$ m to $6$ m it lies below the axis and has an area of 12 J. The total work done from $x = 0$ to $6$ m is',
  right: `${fs.net} J`,
  wrong: [`${fs.up + fs.down} J`, `${fs.up} J`, `−${fs.net} J`],
  sol: `Areas below the axis count negative: $30 - 12 = ${fs.net}$ J — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => fs.net === 18 || 'fs');

add('pend-ar', ar({
  a: 'The tension in the string of a swinging pendulum bob does no work on the bob.',
  r: 'At every instant the tension is perpendicular to the velocity of the bob.',
  key: 'a',
  sol: 'Both statements are true. The bob moves along a circular arc, so its small displacement is perpendicular to the string; $\\cos 90^\\circ = 0$ and the tension’s work is zero. R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('fric-ar', ar({
  a: 'Friction can do positive work on a body.',
  r: 'Friction opposes the relative sliding between two surfaces in contact.',
  key: 'a',
  sol: 'A crate on the floor of an accelerating truck is dragged forward by static friction from the floor; the force and the displacement are in the same direction, so the work is positive. The friction acts forward because it opposes the crate’s tendency to slide backwards relative to the truck. Both true and R explains A — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('normal-tf', tf({
  stem: 'A heavy crate is pushed 4 m across a level warehouse floor; the weight of the crate does negative work during this displacement.',
  key: 'f',
  sol: 'False. The weight is vertical and the displacement is horizontal, at $90^\\circ$ to each other, so the weight does no work.',
  d: 1, c: 'understanding', t: [1],
}));
add('perp-fill', fill({
  stem: 'A force that stays perpendicular to the velocity of a body at every instant does ___ work on it.',
  acc: [['zero', '0', 'no']],
  sol: 'Zero: the angle between force and displacement is $90^\\circ$ and $\\cos 90^\\circ = 0$.',
  d: 1, c: 'recall', t: [1],
}));

const dv = { F: [4, 2, -1], d: [3, -1, 6] };
dv.W = dot(dv.F, dv.d);
add('dot-num', num({
  stem: 'A constant force $\\vec F = (4\\hat\\imath + 2\\hat\\jmath - \\hat k)$ N acts on a bead while it is displaced by $\\vec d = (3\\hat\\imath - \\hat\\jmath + 6\\hat k)$ m. Find the work done, in J.',
  value: dv.W, tol: 0.05, unit: 'J',
  sol: r`$W = \vec F\cdot\vec d = (4)(3) + (2)(-1) + (-1)(6) = 12 - 2 - 6 = ${dv.W}$ J.`,
  scheme: [[`W = F·d = 12 − 2 − 6 = ${dv.W} J`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => dv.F.reduce((s, f, i) => s + f * dv.d[i], 0) === q.answer.value || 'dot');
const fa = { F0: 30, x1: 4, x2: 10 };
fa.W = 0.5 * fa.x1 * fa.F0 + fa.F0 * (fa.x2 - fa.x1);
add('fxarea-num', num({
  stem: 'In a pulling test, the force applied on a trolley rises uniformly from 0 to 30 N between $x = 0$ and $x = 4$ m, and then stays at 30 N up to $x = 10$ m. Find the work done by the force from $x = 0$ to $x = 10$ m, in J.',
  value: fa.W, tol: 0.5, unit: 'J',
  sol: r`Work = area under the F–x graph = triangle + rectangle $= \tfrac{1}{2} \times ${fa.x1} \times ${fa.F0} + ${fa.F0} \times ${fa.x2 - fa.x1} = ${0.5 * fa.x1 * fa.F0} + ${fa.F0 * (fa.x2 - fa.x1)} = ${fa.W}$ J.`,
  scheme: [[`Triangle ½ × ${fa.x1} × ${fa.F0} = ${0.5 * fa.x1 * fa.F0} J`, 0.5], [`Rectangle ${fa.F0} × ${fa.x2 - fa.x1} = ${fa.F0 * (fa.x2 - fa.x1)} J`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => near(integ((x) => (x < fa.x1 ? (fa.F0 * x) / fa.x1 : fa.F0), 0, fa.x2, 4000), q.answer.value, 1e-4) || 'fa');
const vi = { a: 10, b: 3, x2: 2 };
vi.W = (vi.a * vi.x2 ** 2) / 2 - (vi.b * vi.x2 ** 3) / 3;
add('varint-num', num({
  stem: 'A force $F = (10x - 3x^2)$ N, with $x$ in metres, acts on a body along the $x$-axis. Find the work done by the force as the body moves from $x = 0$ to $x = 2$ m, in J.',
  value: vi.W, tol: 0.05, unit: 'J', marks: 2,
  sol: r`$W = \int_0^{2}(10x - 3x^2)\,dx = \big[5x^2 - x^3\big]_0^{2} = 20 - 8 = ${vi.W}$ J.`,
  scheme: [['Sets up W = ∫F dx between 0 and 2 m', 1], [`Evaluates 5x² − x³ at 2 m: 20 − 8 = ${vi.W} J`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(integ((x) => vi.a * x - vi.b * x * x, 0, vi.x2), q.answer.value, 1e-6) || 'vi');
const lk = { m0: 40, leak: 12, h: 8 };
lk.mAvg = (lk.m0 + (lk.m0 - lk.leak)) / 2;
lk.W = R6(lk.mAvg * g * lk.h);
add('leaky-num', num({
  stem: 'A sack of grain of total mass 40 kg is lifted slowly through 8.0 m onto a truck. The sack has a small tear, and grain leaks out at a uniform rate with the height, so that 12 kg has leaked by the time the sack reaches the top. Take $g = 9.8$ m s⁻². Find the work done by the lifting force, in J.',
  value: lk.W, tol: 5, unit: 'J', marks: 3,
  sol: r`At height $x$ the mass is $m(x) = ${lk.m0} - ${lk.leak / lk.h}x$ kg. The lifting force equals the weight (slow lift), so $W = \int_0^{${lk.h}} m(x)\,g\,dx = g\big[${lk.m0}x - ${lk.leak / lk.h / 2}x^2\big]_0^{${lk.h}} = 9.8 \times (${lk.m0 * lk.h} - ${(lk.leak / lk.h / 2) * lk.h ** 2}) = ${lk.W}$ J.`,
  scheme: [['Writes the mass as a linear function of height', 1], ['Sets up W = ∫ m g dx', 1], [`Evaluates: 9.8 × 272 = ${lk.W} J`, 1]],
  d: 4, c: 'application', t: [1],
}), (q) => near(integ((x) => (lk.m0 - (lk.leak / lk.h) * x) * g, 0, lk.h), q.answer.value, 1e-6) && near(lk.mAvg * g * lk.h, q.answer.value, 1e-9) || 'lk');

// ================================================================ t02 kinetic energy and the work-energy theorem
add('kedouble-mcq', mcq({
  stem: 'A cyclist of total mass 60 kg and a motorcyclist of total mass 240 kg are moving with equal kinetic energies. The ratio of the cyclist’s speed to the motorcyclist’s speed is',
  right: '2 : 1',
  wrong: ['1 : 2', '4 : 1', '√2 : 1'],
  sol: r`$\tfrac{1}{2}m_1v_1^2 = \tfrac{1}{2}m_2v_2^2$ gives $\dfrac{v_1}{v_2} = \sqrt{\dfrac{m_2}{m_1}} = \sqrt{\dfrac{240}{60}} = 2$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(Math.sqrt(240 / 60), 2, 1e-12) || 'kd');
add('kemom-mcq', mcq({
  stem: 'Two trolleys on a laboratory track have equal momentum, but the second trolley has twice the mass of the first. The ratio of the kinetic energy of the second to that of the first is',
  right: '1 : 2',
  wrong: ['2 : 1', '1 : 4', '1 : 1'],
  sol: r`$K = \dfrac{p^2}{2m}$. With equal $p$, $K \propto 1/m$, so the heavier trolley has half the kinetic energy — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near((1 / 2) / (1 / 1), 0.5, 1e-12) || 'km');
const bk = { v1: 30, s1: 6, v2: 60 };
bk.s2 = bk.s1 * (bk.v2 / bk.v1) ** 2;
add('brake-mcq', mcq({
  stem: 'A scooter on a dry road skids to rest with its wheels locked (constant retarding force) from 30 km/h in 6.0 m. Starting at 60 km/h on the same road, the skid distance would be',
  right: `${bk.s2} m`,
  wrong: [`${bk.s1 * 2} m`, `${bk.s1 * 3} m`, `${bk.s1 * 8} m`],
  sol: r`$F s = \tfrac{1}{2}mv^2$, so $s \propto v^2$. Doubling the speed multiplies the distance by $4$: $6.0 \times 4 = ${bk.s2}$ m — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => bk.s2 === 24 || 'bk');
add('wnet0-mcq', mcq({
  stem: 'Over a 10 s interval, the net work done by all the forces acting on a moving body is zero. Which statement must be true?',
  right: 'Its kinetic energy at the end of the interval equals its kinetic energy at the start',
  wrong: ['Its velocity is the same at the end as at the start', 'No force acted on it during the interval', 'It moved along a straight line at constant speed'],
  sol: 'By the work–energy theorem, net work $=$ change in kinetic energy $= 0$. The speed returns to its value, but the direction may differ (for example a body in uniform circular motion) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('dke-ar', ar({
  a: 'A car’s kinetic energy increases by the same amount when its speed rises from 10 to 20 m/s as when it rises from 20 to 30 m/s.',
  r: 'The net work done on a body equals the change in its kinetic energy.',
  key: 'd',
  sol: r`A is false: $\Delta K = \tfrac{1}{2}m(20^2 - 10^2) = 150m$ for the first step but $\tfrac{1}{2}m(30^2 - 20^2) = 250m$ for the second, so the second needs more work. R is the work–energy theorem and is true. Option (d).`,
  d: 3, c: 'analysis', t: [2],
}), () => 0.5 * (400 - 100) === 150 && 0.5 * (900 - 400) === 250 || 'dke');
add('ke-tf', tf({
  stem: 'A trolley moving at −5 m/s along a track (towards the negative x-direction) has the same kinetic energy as an identical trolley moving at +5 m/s.',
  key: 't',
  sol: 'True. $K = \\tfrac{1}{2}mv^2$ depends on the square of the speed, so the sign of the velocity does not matter and $K$ is never negative.',
  d: 1, c: 'understanding', t: [2],
}));

const pk = { m: 0.25, v: 8, f: 0.5 };
pk.s = R6(ke(pk.m, pk.v) / pk.f);
add('wke-num', num({
  stem: 'A hockey puck of mass 0.25 kg slides on a rough floor at 8.0 m/s and is brought to rest by a constant friction force of 0.50 N. Using the work–energy theorem, find the distance it slides before stopping, in m.',
  value: pk.s, tol: 0.1, unit: 'm',
  sol: r`$-f\,s = 0 - \tfrac{1}{2}mv^2$, so $s = \dfrac{\tfrac{1}{2} \times ${pk.m} \times ${pk.v}^2}{${pk.f}} = \dfrac{${ke(pk.m, pk.v)}}{${pk.f}} = ${pk.s}$ m.`,
  scheme: [['Net work = −f s = change in K = −½ m v²', 0.5], [`s = ${ke(pk.m, pk.v)}/${pk.f} = ${pk.s} m`, 0.5]],
  marks: 1, d: 2, c: 'application', t: [2],
}), (q) => near((pk.v * pk.v) / (2 * (pk.f / pk.m)), q.answer.value, 1e-9) || 'pk');
const sg = { m: 4, u: 3, W: 360 };
sg.v = Math.sqrt(sg.u ** 2 + (2 * sg.W) / sg.m);
add('speedgain-num', num({
  stem: 'A 4.0 kg trolley moving at 3.0 m/s on a smooth floor is pushed so that the total work done on it is 360 J. Find its final speed, in m/s.',
  value: v3(sg.v), tol: 0.05, unit: 'm/s', marks: 2,
  sol: r`$W = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$, so $360 = \tfrac{1}{2} \times 4 \times v^2 - \tfrac{1}{2} \times 4 \times 3^2$. Then $v^2 = ${sg.u ** 2} + \dfrac{2 \times ${sg.W}}{${sg.m}} = ${sg.u ** 2 + (2 * sg.W) / sg.m}$, so $v = ${dec(sg.v, 3)}$ m/s.`,
  scheme: [['Work–energy theorem with the initial kinetic energy included', 1], [`v² = ${sg.u ** 2 + (2 * sg.W) / sg.m}, v = ${dec(sg.v, 3)} m/s`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(Math.sqrt(0.5 * sg.m * sg.u ** 2 + sg.W) / Math.sqrt(0.5 * sg.m), q.answer.value, 5e-3) || 'sg');
const bu = { m: 0.015, u: 300, v: 100, d: 0.05 };
bu.F = R6((ke(bu.m, bu.u) - ke(bu.m, bu.v)) / bu.d);
add('bullet-num', num({
  stem: 'A bullet of mass 15 g travelling at 300 m/s passes through a wooden board 5.0 cm thick and emerges at 100 m/s. Find the average resistive force exerted by the board on the bullet, in N.',
  value: bu.F, tol: 50, unit: 'N', marks: 3,
  sol: r`Loss of kinetic energy $= \tfrac{1}{2} \times 0.015 \times (300^2 - 100^2) = ${R6(ke(bu.m, bu.u) - ke(bu.m, bu.v))}$ J. This equals the work done against the resistive force over the thickness: $F \times 0.050 = ${R6(ke(bu.m, bu.u) - ke(bu.m, bu.v))}$, so $F = ${bu.F}$ N.`,
  scheme: [['Initial and final kinetic energies (in SI units)', 1], ['Work done against the board = loss of kinetic energy', 1], [`F = ${R6(ke(bu.m, bu.u) - ke(bu.m, bu.v))}/0.050 = ${bu.F} N`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near((bu.m * (bu.u ** 2 - bu.v ** 2)) / (2 * bu.d), q.answer.value, 1e-9) || 'bu');
