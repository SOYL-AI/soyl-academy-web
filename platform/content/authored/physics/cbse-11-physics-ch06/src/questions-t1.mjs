// ch06 question bank, part 1: t01 centre of mass and its motion. Numericals are computed here and re-solved by an independent `check`.
import { mk, add, r, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, dec, v3, R6, cm1 } from './data.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const p3 = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---- cm2-mcq (check slide)
const bd = { m1: 3.0, m2: 1.0, d: 0.4 };
bd.x = (bd.m2 * bd.d) / (bd.m1 + bd.m2);
add('cm2-mcq', mcq({
  stem: 'Two beads of mass 3.0 kg and 1.0 kg are fixed on a light straight wire, 0.40 m apart. Their centre of mass lies',
  right: `${dec(bd.x, 2)} m from the 3.0 kg bead, on the wire between them`,
  wrong: [`${dec(bd.x, 2)} m from the 1.0 kg bead`, '0.20 m from each bead, at the midpoint', '0.30 m from the 3.0 kg bead'],
  sol: `Take the 3.0 kg bead as origin: x_cm = (3.0 × 0 + 1.0 × 0.40)/4.0 = ${dec(bd.x, 2)} m. The CM is nearer the heavier bead — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}), () => near(bd.x, 0.1, 1e-9) || 'bd');

add('ring-mcq', mcq({
  stem: 'A thin steel bangle of uniform thickness lies flat on a table. Its centre of mass is located',
  right: 'at the geometric centre of the bangle, in the empty space inside it',
  wrong: ['at the point of the bangle nearest the table edge', 'on the circumference, at the heaviest point', 'at no point, because a bangle has no centre of mass'],
  sol: 'By symmetry the CM of a uniform ring is at its centre, where there is no material — option (@K).',
  d: 1, c: 'recall', t: [1],
}));

add('rodmid-fill', fill({
  stem: 'A uniform tent pole of constant thickness is balanced on a single finger. The finger has to be placed at the ___ of the pole.',
  acc: [['midpoint', 'middle', 'centre', 'center', 'mid-point']],
  sol: 'The CM of a uniform rod is at its **midpoint**; supporting it there balances the weight.',
  d: 1, c: 'recall', t: [1],
}));

add('outside-tf', tf({
  stem: 'The centre of mass of a rigid body always coincides with some particle of the body.',
  key: 'f',
  sol: 'False. For a ring, a hollow sphere or a bent wire the CM lies in empty space; it is a point defined by the mass distribution.',
  d: 2, c: 'understanding', t: [1],
}));

add('burst-ar', ar({
  a: 'A firework shell bursts at the top of its flight and throws fragments in many directions, yet the centre of mass of all the fragments continues along the original parabola until one of them lands.',
  r: 'The forces of the burst are internal to the system, so the only external force is gravity.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: internal forces cannot change the motion of the CM, which therefore follows the path set by gravity alone — option (a).',
  d: 2, c: 'understanding', t: [1],
}));

const bc = { m1: 200, v1: 6.0, m2: 300, v2: -4.0 };
bc.v = (bc.m1 * bc.v1 + bc.m2 * bc.v2) / (bc.m1 + bc.m2);
add('cmvel-mcq', mcq({
  stem: 'Two bumper cars on a straight fairground track move towards each other: a 200 kg car at +6.0 m/s and a 300 kg car at −4.0 m/s. The velocity of their centre of mass is',
  right: 'zero: the centre of mass is at rest',
  wrong: ['+1.0 m/s, the mean of the two velocities', '+2.4 m/s, towards the heavier car’s start', '−2.4 m/s'],
  sol: 'v_cm = (200 × 6.0 + 300 × (−4.0))/500 = (1200 − 1200)/500 = 0. The momenta cancel, so the CM is at rest — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => bc.v === 0 || 'bc');

const co = { mC: 12, mO: 16, d: 0.113 };
co.x = (co.mO * co.d) / (co.mC + co.mO);
add('co-num', num({
  stem: 'In a carbon monoxide molecule the carbon atom (mass 12 u) and the oxygen atom (mass 16 u) are 0.113 nm apart. Find the distance of the centre of mass from the carbon atom, in nm (3 significant figures).',
  value: v3(co.x), tol: 0.0005, unit: 'nm',
  sol: r`Origin at the carbon atom: $x_\text{cm} = \dfrac{12 \times 0 + 16 \times 0.113}{12 + 16} = \dfrac{${p3(co.mO * co.d, 4)}}{28} = ${dec(co.x, 3)}$ nm, towards the heavier oxygen atom.`,
  scheme: [['Weighted average with origin at carbon', 1], [`x_cm = ${dec(co.x, 3)} nm`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(cm1([co.mC, co.mO], [0, co.d]), q.answer.value, 0.01) || 'co');

const tr = { m: [4.0, 1.0, 3.0], x: [0, 5.0, 2.0], y: [0, 0, 6.0] };
tr.M = 8;
tr.X = cm1(tr.m, tr.x);
tr.Y = cm1(tr.m, tr.y);
add('tri-num', num({
  stem: 'Three small beads of mass 4.0 kg, 1.0 kg and 3.0 kg lie on a flat tray at (0, 0), (5.0 m, 0) and (2.0 m, 6.0 m). Find the y-coordinate of their centre of mass, in m.',
  value: tr.Y, tol: 0.01, unit: 'm',
  sol: r`$Y = \dfrac{4.0 \times 0 + 1.0 \times 0 + 3.0 \times 6.0}{4.0 + 1.0 + 3.0} = \dfrac{18}{8.0} = ${dec(tr.Y, 3)}$ m. (The x-coordinate is ${dec(tr.X, 4)} m.)`,
  scheme: [['Y = Σ m y / Σ m', 1], [`Y = ${dec(tr.Y, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(cm1(tr.m, tr.y), q.answer.value, 1e-9) && near(tr.X, 1.375, 1e-9) || 'tr');

const vv = { arm: 0.5 };
vv.X = (vv.arm * (vv.arm / 2)) / (2 * vv.arm);
vv.dist = Math.hypot(vv.X, vv.X);
add('vwire-num', num({
  stem: 'A uniform wire 1.00 m long is bent at its midpoint into a right angle, so each arm is 0.50 m. Find the distance of its centre of mass from the corner, in m (3 significant figures).',
  value: v3(vv.dist), tol: 0.002, unit: 'm',
  sol: r`Arms along x and y from the corner, each of equal mass at its midpoint (0.25 m from the corner): $X = Y = \dfrac{0.50 \times 0.25}{1.00} = ${dec(vv.X, 3)}$ m. Distance $= \sqrt{${dec(vv.X, 3)}^2 + ${dec(vv.X, 3)}^2} = ${dec(vv.dist, 3)}$ m.`,
  scheme: [['Each arm acts at its midpoint with equal mass: X = Y = 0.125 m', 1], [`Distance √2 × 0.125 = ${dec(vv.dist, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(Math.hypot(0.125, 0.125), q.answer.value, 0.005) || 'vwire');

const mn = { M: 6.0e24, m: 7.35e22, d: 3.84e8 };
mn.x = (mn.m * mn.d) / (mn.M + mn.m);
mn.km = mn.x / 1e3;
add('moon-num', num({
  stem: 'The Earth (mass 6.0 × 10²⁴ kg) and the Moon (mass 7.35 × 10²² kg) have their centres 3.84 × 10⁸ m apart. Find the distance of their common centre of mass from the Earth’s centre, in km (3 significant figures), and say whether it lies inside the Earth (radius 6400 km).',
  value: v3(mn.km), tol: 10, unit: 'km',
  sol: r`$x_\text{cm} = \dfrac{m\,d}{M + m} = \dfrac{7.35 \times 10^{22} \times 3.84 \times 10^{8}}{6.0 \times 10^{24} + 7.35 \times 10^{22}} \approx ${dec(mn.x / 1e6, 4)} \times 10^{6}$ m $= ${Math.round(mn.km)}$ km. This is less than 6400 km, so it lies inside the Earth.`,
  scheme: [['x_cm = m d/(M + m) from the Earth’s centre', 1], [`${Math.round(mn.km)} km, inside the Earth (< 6400 km)`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(cm1([mn.M, mn.m], [0, mn.d]) / 1e3, q.answer.value, 0.005) && mn.km < 6400 || 'moon');

const sl = { m: 45, M: 135, L: 3.2 };
sl.s = (sl.m * sl.L) / (sl.m + sl.M);
add('sled-num', num({
  stem: 'A girl of mass 45 kg stands at one end of a 135 kg trolley, 3.2 m long, on the smooth floor of a railway workshop; both are at rest. She walks to the other end of the trolley. Find the distance moved by the trolley over the floor, in m.',
  value: sl.s, tol: 0.01, unit: 'm',
  sol: r`No external horizontal force acts, so the CM does not move. If the trolley moves $s$ backwards, the girl moves $3.2 - s$ forwards over the floor: $45(3.2 - s) = 135\,s$. So $s = \dfrac{45 \times 3.2}{180} = ${dec(sl.s, 3)}$ m.`,
  scheme: [['CM fixed: m (L − s) = M s', 1], [`s = ${dec(sl.s, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(45 * (3.2 - sl.s), 135 * sl.s, 1e-9) && near(sl.s, q.answer.value, 1e-6) || 'sl');

const sx = { M: 8.0, u: 30, m1: 3.0, v1: 70 };
sx.m2 = sx.M - sx.m1;
sx.v2 = (sx.M * sx.u - sx.m1 * sx.v1) / sx.m2;
add('shell-num', num({
  stem: 'A shell of mass 8.0 kg flying horizontally at 30 m/s bursts into two pieces. A 3.0 kg piece continues in the same direction at 70 m/s. Find the velocity of the other piece, in m/s (positive in the original direction).',
  value: sx.v2, tol: 0.05, unit: 'm/s',
  sol: r`The burst forces are internal, so momentum is conserved: $8.0 \times 30 = 3.0 \times 70 + 5.0\,v$. So $v = \dfrac{240 - 210}{5.0} = ${dec(sx.v2, 3)}$ m/s in the original direction.`,
  scheme: [['Momentum conserved: 240 = 210 + 5.0 v', 1], [`v = ${dec(sx.v2, 3)} m/s forward`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(sx.m1 * sx.v1 + sx.m2 * sx.v2, 240, 1e-9) && near(q.answer.value, 6, 1e-9) || 'sx');

const ca = { m1: 2.0, m2: 3.0, F1: 10, F2: -5 };
ca.a = (ca.F1 + ca.F2) / (ca.m1 + ca.m2);
add('cmacc-num', num({
  stem: 'Two blocks of 2.0 kg and 3.0 kg on a smooth horizontal table are joined by a stretched spring. Outside pushes act along the line of the spring: 10 N eastwards on the 2.0 kg block and 5.0 N westwards on the 3.0 kg block. Find the acceleration of the centre of mass, in m/s² (east positive).',
  value: ca.a, tol: 0.01, unit: 'm/s²',
  sol: r`The spring forces are internal. $a_\text{cm} = \dfrac{F_\text{ext}}{M} = \dfrac{10 - 5.0}{2.0 + 3.0} = ${dec(ca.a, 3)}$ m/s² eastwards.`,
  scheme: [['Only external forces: 10 − 5.0 = 5.0 N', 1], [`a_cm = F/M = ${dec(ca.a, 3)} m/s²`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ca.a, q.answer.value, 1e-9) && near(ca.a, 1.0, 1e-9) || 'ca');

const cs = { a: 0.4, c: 0.2 };
cs.A = cs.a ** 2;
cs.Ac = cs.c ** 2;
cs.X = (cs.A * (cs.a / 2) - cs.Ac * (cs.c / 2)) / (cs.A - cs.Ac);
add('cutsq-num', num({
  stem: 'From a uniform square plate of side 0.40 m a square of side 0.20 m is cut out at one corner. Taking the cut corner of the original plate as the origin, with x along one side, find the x-coordinate of the centre of mass of the remaining plate, in m (3 significant figures).',
  value: v3(cs.X), tol: 0.002, unit: 'm',
  sol: r`Treat the removed square as a negative mass. Areas (proportional to mass): full plate $0.16$ m² at $x = 0.20$ m; removed piece $0.04$ m² at $x = 0.10$ m. $X = \dfrac{0.16 \times 0.20 - 0.04 \times 0.10}{0.16 - 0.04} = \dfrac{0.028}{0.12} = ${dec(cs.X, 3)}$ m.`,
  scheme: [['Whole plate minus the removed part, mass ∝ area', 1], ['Correct moments 0.032 − 0.004 and area 0.12', 1], [`X = ${dec(cs.X, 3)} m`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [1],
}), (q) => near((0.16 * 0.2 - 0.04 * 0.1) / 0.12, q.answer.value, 0.005) && near(cs.X, 0.2333, 0.001) || 'cs');

add('cm-short', short({
  marks: 2,
  stem: 'What is meant by the centre of mass of a system of particles? Give an example of a body whose centre of mass lies outside the body.',
  model: 'The centre of mass is the point whose position is the mass-weighted average of the positions of all the particles, $\\sum m_i \\vec r_i / M$; the system moves as if all its mass and external force were there. A uniform ring or a bent wire has it in empty space, at the centre of the ring.',
  sol: 'Weighted average position; ring example.',
  scheme: [['Mass-weighted average position Σ m r / M', 1], ['Valid example (ring, bent wire, horseshoe)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

add('internal-short', short({
  marks: 2,
  stem: 'A passenger sits in a car standing on frictionless ice and pushes hard on the dashboard with both hands. Will the centre of mass of the car and passenger move? Explain.',
  model: 'No. The push and the dashboard’s reaction are internal forces of the system, equal and opposite, and the ice exerts no horizontal force. With no external horizontal force the centre of mass stays at rest; the car and passenger may only shift relative to each other.',
  sol: 'Internal forces only.',
  scheme: [['Push and reaction are internal and cancel; no external horizontal force', 1], ['So the CM stays at rest (only relative shift)', 1]],
  d: 3, c: 'application', t: [1],
}));

add('cmmot-short3', short({
  marks: 3,
  stem: 'Show that the total momentum of a system of particles equals $M\\vec v_\\text{cm}$, and hence that the centre of mass moves with constant velocity when no external force acts.',
  model: r`The centre of mass is defined by $M\vec r_\text{cm} = \sum m_i \vec r_i$, where $M$ is the total mass. Differentiating once with respect to time gives $M\vec v_\text{cm} = \sum m_i \vec v_i$, which is the total momentum $\vec P$ of the system. Differentiating again gives $M\vec a_\text{cm} = d\vec P/dt = \vec F_\text{ext}$, because the internal forces cancel in equal and opposite pairs. When no external force acts, the acceleration of the centre of mass is zero, so its velocity stays constant.`,
  sol: 'Differentiate the CM definition twice.',
  scheme: [['Differentiate M r_cm = Σ m r once: P = M v_cm', 1], ['Differentiate again: M a_cm = F_ext (internal forces cancel)', 1], ['F_ext = 0 gives constant v_cm', 1]],
  d: 3, c: 'understanding', t: [1],
}));

const tc = { m1: 4.0, u1: 3.0, m2: 6.0, u2: 1.0 };
tc.v = (tc.m1 * tc.u1 + tc.m2 * tc.u2) / (tc.m1 + tc.m2);
add('cm-long', long({
  stem: '(a) Write the position of the centre of mass of two particles of masses $m_1$ and $m_2$ at $x_1$ and $x_2$. [1] (b) Show that $M\\vec a_\\text{cm} = \\vec F_\\text{ext}$ for a system of particles. [2] (c) Two trolleys on a smooth horizontal rail, 4.0 kg at 3.0 m/s and 6.0 kg at 1.0 m/s, move in the same direction. Find the velocity of their centre of mass, and their common speed if they lock together after a collision. [2]',
  model: r`(a) For two particles the centre of mass is at $x_\text{cm} = \dfrac{m_1x_1 + m_2x_2}{m_1 + m_2}$, the mass-weighted average of the two positions. (b) Write Newton’s second law for every particle, $m_i\vec a_i = \vec F_i^\text{ext} + \sum_j \vec F_{ij}$, and add the equations. The internal forces satisfy $\vec F_{ij} = -\vec F_{ji}$, so they cancel in pairs and leave only the external forces; and since the sum of $m_i\vec a_i$ is $M\vec a_\text{cm}$, we get $M\vec a_\text{cm} = \vec F_\text{ext}$. (c) The velocity of the centre of mass is $\dfrac{4.0 \times 3.0 + 6.0 \times 1.0}{10} = ${dec(tc.v, 3)}$ m/s. The collision forces are internal and no external force acts, so the velocity of the centre of mass is unchanged: the locked trolleys move together at ${dec(tc.v, 3)} m/s.`,
  sol: 'Weighted average; internal forces cancel; v_cm constant.',
  scheme: [['(a) Formula', 1], ['(b) Sum of Newton’s second law; internal pairs cancel', 1], ['(b) Result with M a_cm', 1], [`(c) v_cm = ${dec(tc.v, 3)} m/s`, 1], ['(c) Locked trolleys move at v_cm', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(tc.v, 1.8, 1e-9) || 'tc');

const bl = { m: [0.1, 0.3, 0.2], x: [0.0, 0.4, 1.0] };
bl.X = cm1(bl.m, bl.x);
const bl2 = cm1([0.3, 0.3, 0.2], [0.0, 0.4, 1.0]);
add('bells-case', mk.case({
  passage: 'A craft shop in Jaipur sells a hanging decoration made of a light rod 1.00 m long with three brass bells fixed to it. The bells have masses 0.10 kg, 0.30 kg and 0.20 kg, at 0 m, 0.40 m and 1.00 m from the left end. The decoration is hung from a single thread tied at the point where the rod stays horizontal.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The rod hangs horizontally when the thread is tied at',
      right: 'the centre of mass of the three bells, because the total weight then has no turning effect about it',
      wrong: ['the midpoint of the rod, because the rod is light', 'the heaviest bell, because it pulls hardest', 'the lightest bell, because it needs the most support'],
      sol: 'The thread supports the whole weight along its line; for balance this line must pass through the centre of mass of the system — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the distance of the tying point from the left end, in m (3 significant figures).',
      value: v3(bl.X), tol: 0.002, unit: 'm',
      sol: r`$x_\text{cm} = \dfrac{0.10 \times 0 + 0.30 \times 0.40 + 0.20 \times 1.00}{0.60} = \dfrac{0.32}{0.60} = ${dec(bl.X, 3)}$ m.`,
      scheme: [['Σ m x = 0.12 + 0.20 = 0.32 over Σ m = 0.60', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'A second 0.20 kg bell is added at the left end (0 m). Find the new tying point.',
      model: r`The masses are now 0.30 kg at 0 m, 0.30 kg at 0.40 m and 0.20 kg at 1.00 m, total 0.80 kg. $x_\text{cm} = \dfrac{0 + 0.12 + 0.20}{0.80} = ${dec(bl2, 3)}$ m, so the tying point moves towards the left end.`,
      sol: 'Recompute the weighted average.',
      scheme: [['Masses 0.30, 0.30, 0.20; total 0.80 kg', 1], [`x_cm = ${dec(bl2, 3)} m`, 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A student says the thread should always be tied at the midpoint (0.50 m) of the rod because the rod is uniform. Evaluate this claim.',
        model: 'The claim is **wrong**. The rod is light, so its own weight is negligible and the centre of mass is set by the bells, which are not placed symmetrically. The thread must go at the centre of mass of the bells, here 0.533 m from the left end, not at the midpoint.',
        sol: 'Light rod: CM set by the bells.',
        scheme: [['Claim wrong: the rod is light, the bells decide the CM', 1], ['Thread at the CM of the bells, 0.533 m, not 0.50 m', 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(bl.X, 0.5333, 1e-3) && near(bl2, 0.4, 1e-9) && near(q.children[1].answer.value, 0.533, 2e-3) || 'bells');

void g;
void R6;
