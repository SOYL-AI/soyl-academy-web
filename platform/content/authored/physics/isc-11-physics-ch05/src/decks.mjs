// ISC 11 ch05 Newton's Laws of Motion: two decks. Part 1 (t01 to t03): force and inertia, the first law, momentum, the second law
// F = dp/dt and F = ma, mass near the speed of light (idea only), impulse, conservation of linear momentum, the third law from it,
// and recoil. Part 2 (t04 and t05): free-body diagrams, tension and normal reaction, connected bodies (table and hanging mass,
// Atwood machine with one pulley, blocks in contact, a lift), equilibrium of concurrent forces, three coplanar forces on a rigid
// body and the ladder against a smooth wall. Every number is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, atwood, tableHang, liftN, lamp, ladder, gamma } from './phys.mjs';
import { W, N } from './words.mjs';
import * as G from './svgs.mjs';

const f = (x, n = 3) => dec(x, n);

// ---------------------------------------------------------------- worked-example numbers
// deck 1
const e1 = { m: 40, F: 150, th: 30 };
e1.Fx = e1.F * Math.cos(rad(e1.th));
e1.Fy = e1.F * Math.sin(rad(e1.th));
e1.ax = e1.Fx / e1.m;
e1.Nr = e1.m * g - e1.Fy;
const e2 = { m: 0.16, v: 28, t1: 0.02, t2: 0.08 };
e2.J = e2.m * e2.v;
e2.F1 = e2.J / e2.t1;
e2.F2 = e2.J / e2.t2;
const e3 = { M: 3.6, m: 0.012, v: 750 };
e3.p = e3.m * e3.v;
e3.V = e3.p / e3.M;
e3.ratio = e3.m / e3.M; // KE of gun / KE of bullet
const RC = G.RECOIL_DATA;
RC.p = RC.m * RC.v;
RC.V = RC.p / RC.M;
// deck 2
const IN = G.INC_DATA;
const inc = { m: IN.m, th: IN.th };
inc.W = inc.m * g;
inc.N = inc.W * Math.cos(rad(inc.th));
inc.a = g * Math.sin(rad(inc.th));
const TB = G.TABLE_DATA;
const tb = { m1: TB.m1, m2: TB.m2, ...tableHang(TB.m1, TB.m2) };
const AT = G.ATWOOD_DATA;
const at = { m1: AT.m1, m2: AT.m2, h: 1.2, ...atwood(AT.m1, AT.m2) };
at.t = Math.sqrt((2 * at.h) / at.a);
at.v = at.a * at.t;
const CT = G.CONTACT_DATA;
const ct = { m1: CT.m1, m2: CT.m2, F: CT.F, a: CT.F / (CT.m1 + CT.m2) };
ct.Fc = ct.m2 * ct.a;
const LF = G.LIFT_DATA;
const lf = { m: LF.m, a: LF.a, M: 560 };
lf.Nup = liftN(lf.m, lf.a);
lf.Nrest = liftN(lf.m, 0);
lf.Ndown = liftN(lf.m, -lf.a);
lf.Tc = liftN(lf.M, lf.a);
const LP = G.LAMP_DATA;
const lp = { W: LP.W, al: LP.alpha, be: LP.beta, ...lamp(LP.W, LP.alpha, LP.beta) };
lp.sab = Math.sin(rad(lp.al + lp.be));
const LD = G.LADDER_DATA;
const ld = { L: LD.L, th: LD.th, m: LD.m, ...ladder(LD.L, LD.th, LD.m) };
ld.W = ld.m * g;
ld.R = Math.hypot(ld.Nf, ld.Ff);
ld.ang = deg(Math.atan2(ld.Nf, ld.Ff));
const pt = { p0: 4, F: 6 };

export const EX = { e1, e2, e3, RC, inc, tb, at, ct, lf, lp, ld, pt };

// ---------------------------------------------------------------- visuals
export const V = {
  pair: svgV(G.PAIR, 'Two skaters in contact on smooth ice push each other with equal and opposite forces of 50 newtons, on different bodies; the 40 kilogram skater accelerates at 1.25 and the 50 kilogram skater at 1 metre per second squared', 'Third-law pair: equal, opposite, on different bodies.'),
  impulse: svgV(G.IMPULSE, 'Force against time for a bat striking a ball: a triangular pulse of 3000 newtons maximum lasting 0.005 seconds with area 7.5 newton seconds, equal to the dashed rectangle at the average force of 1500 newtons', 'Impulse is the area under the force–time graph.'),
  recoil: svgV(G.RECOIL, 'A 4 kilogram gun fires a 20 gram bullet at 400 metres per second: the bullet and the gun have equal and opposite momenta of 8 kilogram metres per second and the gun recoils at 2 metres per second', 'Equal and opposite momenta: the gun recoils.'),
  table: svgV(G.TABLEHANG, 'A 3 kilogram block on a smooth table joined over a pulley to a 2 kilogram hanging block, with the free-body diagram of each block: tension 11.8 newtons, acceleration 3.92 metres per second squared', 'Block on a smooth table joined to a hanging mass, with free-body diagrams.'),
  atwood: svgV(G.ATWOODSVG, 'An Atwood machine with 5 kilogram and 3 kilogram masses: acceleration 2.45 metres per second squared, tension 36.75 newtons, with the free-body diagram of each mass', 'Atwood machine with free-body diagrams.'),
  contact: svgV(G.CONTACT, 'A force of 18 newtons pushes a 4 kilogram block in contact with a 2 kilogram block on a smooth floor; the contact force between them is 6 newtons and the acceleration is 3 metres per second squared', 'Blocks in contact: one acceleration, a contact pair of forces.'),
  lift: svgV(G.LIFTSVG, 'A 60 kilogram person in a lift accelerating up, at rest and accelerating down: the normal reaction of the floor is 678, 588 and 498 newtons', 'Apparent weight in a lift.'),
  incline: svgV(G.INCLINE, 'A 6 kilogram block on a smooth plane inclined at 30 degrees with its weight, normal reaction of 50.9 newtons and the two components of the weight', 'Free-body diagram on a smooth incline.'),
  lamp: svgV(G.LAMPSVG, 'A lamp of weight 60 newtons on two strings at 35 and 50 degrees to the ceiling, and the closed triangle of the three forces', 'Three concurrent forces in equilibrium and their force triangle.'),
  ladder: svgV(G.LADDERSVG, 'A 6 metre ladder of mass 20 kilograms against a smooth wall at 50 degrees with its weight, the wall reaction and the two reactions at the floor, all three lines of action meeting at one point', 'Ladder against a smooth wall: the three forces meet at one point.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotPT = plot(
  {
    x: ax('time t (s)', 0, 3.2),
    y: ax('momentum p (kg m/s)', 0, 26),
    functions: [{ expr: `${pt.p0} + ${pt.F}*x`, label: `p = ${pt.p0} + ${pt.F} t  (slope = F = ${pt.F} N)`, domain: [0, 3] }],
    points: [
      { at: [0, pt.p0], label: `t = 0: p = ${pt.p0}` },
      { at: [2, pt.p0 + pt.F * 2], label: `t = 2 s: p = ${pt.p0 + pt.F * 2}` },
    ],
  },
  'Graph of momentum against time for a trolley acted on by a constant force of 6 newtons: a straight line from 4 kilogram metres per second whose slope of 6 kilogram metres per second per second is the force',
  'The slope of the momentum–time graph is the force: F = dp/dt.',
);
export const plotAM = plot(
  {
    x: ax('mass m (kg)', 0, 12.5),
    y: ax('acceleration a (m/s²)', 0, 13),
    functions: [{ expr: '12/x', label: 'a = F/m, F = 12 N', domain: [1, 12] }],
    points: [
      { at: [2, 6], label: '2 kg: 6 m/s²' },
      { at: [4, 3], label: '4 kg: 3 m/s²' },
      { at: [6, 2], label: '6 kg: 2 m/s²' },
    ],
  },
  'Graph of acceleration against mass for a fixed force of 12 newtons: a falling curve through 6 metres per second squared at 2 kilograms, 3 at 4 kilograms and 2 at 6 kilograms, showing that acceleration is inversely proportional to mass',
  'For a fixed force the acceleration is inversely proportional to the mass.',
);
export const plotGamma = plot(
  {
    x: ax('speed v as a fraction of c', 0, 1),
    y: ax('measured mass / rest mass', 0, 8),
    functions: [{ expr: '1/sqrt(1 - x^2)', label: 'm / m0 = 1/√(1 − v²/c²)  (idea only)', domain: [0, 0.99] }],
    points: [
      { at: [0.1, R6(gamma(0.1))], label: `0.1 c: ${f(gamma(0.1), 4)}` },
      { at: [0.6, R6(gamma(0.6))], label: `0.6 c: ${f(gamma(0.6), 3)}` },
      { at: [0.9, R6(gamma(0.9))], label: `0.9 c: ${f(gamma(0.9), 3)}` },
      { at: [0.99, R6(gamma(0.99))], label: `0.99 c: ${f(gamma(0.99), 3)}` },
    ],
  },
  'Graph of measured mass over rest mass against speed as a fraction of the speed of light: almost flat up to about a tenth of the speed of light, then rising steeply, about 1.25 at 0.6, 2.3 at 0.9 and 7.1 at 0.99, growing without limit as the speed approaches the speed of light',
  'Mass seems to grow as v approaches c; at everyday speeds the change is negligible.',
);

// ---------------------------------------------------------------- tables
const T_FIRST = table(
  ['Situation', 'What happens', 'Reason (first law)'],
  [
    ['A puck on smooth ice', 'Glides on at constant velocity', 'Net force is nearly zero, so the velocity does not change'],
    ['A coin on a card over a glass, card flicked away', 'Coin drops straight into the glass', 'The coin stays at rest (inertia of rest) while the card leaves'],
    ['A bus brakes sharply', 'Standing passengers lurch forward', 'Their bodies tend to keep moving (inertia of motion)'],
    ['A cyclist on a straight road stops pedalling', 'Slows down', 'Friction and drag are forces: they change the velocity'],
  ],
  'Table of situations showing the first law: a puck on ice, a coin on a card, a bus braking and a cyclist freewheeling, each with what happens and the reason',
);
const T_INERTIA = table(
  ['Kind of inertia', 'Example', 'Explanation'],
  [
    ['Of rest', 'Passengers jerk backward when a train starts', 'The body tends to stay at rest while the floor moves forward'],
    ['Of motion', 'Passengers lurch forward when a bus brakes', 'The body tends to continue moving at the old velocity'],
    ['Of direction', 'Passengers are thrown outward at a sharp turn', 'The body tends to continue in a straight line'],
  ],
  'Table of the three kinds of inertia, inertia of rest, of motion and of direction, with an example and explanation for each',
);
const mom = [
  ['A cricket ball, 0.16 kg at 30 m/s', 0.16 * 30],
  ['A sprinter, 70 kg at 10 m/s', 70 * 10],
  ['A bullet, 0.01 kg at 800 m/s', 0.01 * 800],
  ['A car, 1200 kg at 15 m/s', 1200 * 15],
];
const T_MOM = table(
  ['Moving body', 'Momentum p = m v (kg m/s)'],
  mom.map(([a, p]) => [a, f(p, 4)]),
  'Table of the momentum of a cricket ball, a sprinter, a bullet and a car, with mass and speed in each case',
);
const T_E1 = table(
  ['Step', 'Working', 'Result'],
  [
    ['Horizontal force', `F cos ${e1.th}° = ${e1.F} × cos ${e1.th}°`, `${f(e1.Fx)} N`],
    ['Acceleration', `a = ${f(e1.Fx)} / ${e1.m}`, `${f(e1.ax)} m/s²`],
    ['Vertical pull of the rope', `F sin ${e1.th}° = ${e1.F} × sin ${e1.th}°`, `${f(e1.Fy)} N`],
    ['Normal reaction', `N = m g − F sin ${e1.th}° = ${f(e1.m * g)} − ${f(e1.Fy)}`, `${f(e1.Nr)} N`],
  ],
  'Table of the working for a crate pulled by a rope at 30 degrees: horizontal force, acceleration, vertical pull and normal reaction',
);
const T_CATCH = table(
  ['Stopping the ball', 'Time', 'Average force F = Δp / Δt'],
  [
    ['Hands held rigid', `${e2.t1} s`, `${f(e2.F1)} N`],
    ['Hands drawn back', `${e2.t2} s`, `${f(e2.F2)} N`],
  ],
  'Table comparing the average stopping force for a catch with rigid hands over 0.02 seconds and with hands drawn back over 0.08 seconds, with the same impulse',
);
const T_CONS = table(
  ['Isolated system', 'Before', 'After'],
  [
    ['Gun and bullet (fired from rest)', 'total p = 0', 'm v + M V = 0'],
    ['Two bodies colliding', 'm₁ u₁ + m₂ u₂', 'm₁ v₁ + m₂ v₂ (the same total)'],
    ['Bomb exploding into two pieces', 'p = 0 (at rest)', 'p₁ + p₂ = 0'],
  ],
  'Table of conservation of momentum for a gun and bullet, a collision of two bodies and an exploding bomb, giving the total momentum before and after',
);
const T_RIFLE = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['Bullet momentum', `${e3.m} × ${e3.v}`, `${f(e3.p)} kg m/s`],
    ['Recoil speed of rifle', `${f(e3.p)} / ${e3.M}`, `${f(e3.V)} m/s`],
    ['KE of rifle : KE of bullet', `m / M = ${e3.m} / ${e3.M}`, `1 : ${f(1 / e3.ratio, 3)}`],
  ],
  'Table of the working for a rifle firing a 12 gram bullet at 750 metres per second: bullet momentum, recoil speed and ratio of kinetic energies',
);
const T_FBD = table(
  ['Force', 'Where it acts', 'Direction'],
  [
    ['Weight W = m g', 'Centre of the body', 'Vertically down'],
    ['Normal reaction N', 'Surface in contact', 'Perpendicular to the surface, away from it'],
    ['Tension T', 'Along a string or rope', 'Away from the body, along the string'],
    ['Applied push or pull', 'Where it is applied', 'Along the push or pull'],
  ],
  'Table of the forces drawn in a free-body diagram: weight, normal reaction, tension and applied force, with where each acts and its direction',
);
const T_ATW = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['Acceleration', `(${at.m1} − ${at.m2}) × 9.8 / (${at.m1} + ${at.m2})`, `${f(at.a)} m/s²`],
    ['Tension', `2 × ${at.m1} × ${at.m2} × 9.8 / (${at.m1} + ${at.m2})`, `${f(at.T, 4)} N`],
    ['Time to move ' + at.h + ' m from rest', `√(2 × ${at.h} / ${f(at.a)})`, `${f(at.t)} s`],
    ['Speed then', `a t = ${f(at.a)} × ${f(at.t)}`, `${f(at.v)} m/s`],
  ],
  'Table of the working for an Atwood machine with 5 kilogram and 3 kilogram masses: acceleration, tension, time to move 1.2 metres from rest and the speed then',
);
const T_LIFT = table(
  ['Case', 'Equation', 'Result'],
  [
    ['Cable tension, lift and passengers 560 kg, a = 1.5 m/s² up', `T − M g = M a, T = ${lf.M} × (9.8 + ${lf.a})`, `${f(lf.Tc)} N`],
    ['Reading for the 60 kg person, accelerating up', `N = ${lf.m} × (9.8 + ${lf.a})`, `${f(lf.Nup)} N`],
    ['Reading for the 60 kg person, accelerating down', `N = ${lf.m} × (9.8 − ${lf.a})`, `${f(lf.Ndown)} N`],
    ['Cable snaps: free fall, a = g', `N = ${lf.m} × (9.8 − 9.8)`, '0 N'],
  ],
  'Table of the working for a lift: cable tension, the reading for a 60 kilogram person accelerating up and down, and the reading when the cable snaps',
);
const T_LAMI = table(
  ['Method', 'Equations', 'Result'],
  [
    ['Resolving horizontally', `T₁ cos ${lp.al}° = T₂ cos ${lp.be}°`, `T₁ = ${f(lp.T1 / lp.T2, 4)} T₂`],
    ['Resolving vertically', `T₁ sin ${lp.al}° + T₂ sin ${lp.be}° = ${lp.W}`, 'solve together'],
    ['Lami: T₁', `${lp.W} cos ${lp.be}° / sin ${lp.al + lp.be}°`, `${f(lp.T1)} N`],
    ['Lami: T₂', `${lp.W} cos ${lp.al}° / sin ${lp.al + lp.be}°`, `${f(lp.T2)} N`],
  ],
  'Table comparing the two methods for the lamp on two strings: resolving along two directions and Lami’s theorem, giving 38.7 and 49.3 newtons',
);
const T_RIGID = table(
  ['Condition', 'Meaning'],
  [
    ['Sum of forces = 0', 'No acceleration of the centre of mass (translation equilibrium)'],
    ['Sum of torques about any point = 0', 'No angular acceleration (rotation equilibrium)'],
    ['Three non-parallel coplanar forces', 'Their lines of action must meet at one point'],
    ['Three parallel coplanar forces', 'Possible, with the middle force opposite to the other two'],
  ],
  'Table of the conditions of equilibrium of a rigid body under three coplanar forces: zero resultant, zero torque, concurrency for non-parallel forces and the parallel case',
);
const T_LADDER = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['Weight', `${ld.m} × 9.8`, `${f(ld.W)} N`],
    ['Floor normal reaction', 'N_f = W (vertical balance)', `${f(ld.Nf)} N`],
    ['Wall reaction (torque about the foot)', `(W/2) cot ${ld.th}° = ${f(ld.W / 2)} × ${f(1 / Math.tan(rad(ld.th)), 4)}`, `${f(ld.Nw)} N`],
    ['Horizontal force at the floor', 'F_f = N_w (horizontal balance)', `${f(ld.Ff)} N`],
    ['Total floor reaction', `√(${f(ld.Nf)}² + ${f(ld.Ff)}²)`, `${f(ld.R)} N at ${f(ld.ang)}° to the floor`],
  ],
  'Table of the working for a 6 metre ladder of mass 20 kilograms at 50 degrees to a smooth wall: weight, floor normal reaction, wall reaction, horizontal force at the floor and the total floor reaction',
);
export const TABLES = { T_FIRST, T_INERTIA, T_MOM, T_E1, T_CATCH, T_CONS, T_RIFLE, T_FBD, T_ATW, T_LIFT, T_LAMI, T_RIGID, T_LADDER };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Newton’s Laws of Motion — Part 1: Inertia, momentum, impulse and conservation of momentum',
  goals: [
    'State Newton’s first law, define inertia and relate it to mass, and explain everyday inertia effects',
    'Define momentum and write the second law as F = dp/dt, obtain F = ma for constant mass and resolve it into components',
    'Calculate impulse as the change in momentum and use it for catching, striking and stopping',
    'Derive the law of conservation of linear momentum, obtain the third law from it and solve recoil problems',
  ],
  slides: [
    sl('title', 'Newton’s Laws of Motion', {
      b: 'Part 1 — inertia, momentum, the second law, impulse, and conservation of momentum.',
      v: V.pair,
      n: 'A passenger lurches forward when the bus brakes. A fielder pulls the hands back while catching a fast ball. A rifle kicks back into the shoulder. All three follow from three laws of motion. In this part we study inertia, momentum, force as the rate of change of momentum, impulse, and the conservation of momentum, from which the third law follows.',
    }),
    sl('concept', 'Force and Newton’s first law', {
      b: 'A **force** is a push or a pull that changes, or tends to change, the state of rest or of uniform motion of a body, or its shape. **Newton’s first law:** every body continues in its state of rest or of uniform motion in a straight line unless a net external force acts on it.',
      ul: [
        'The law gives a **qualitative definition of force**: it is what changes the velocity of a body.',
        'No net force means constant velocity: rest is just the special case of zero velocity.',
        'On Earth a body does not go on for ever because friction and air drag are forces that act on it.',
        'The law is also called the **law of inertia**.',
      ],
      v: T_FIRST,
      n: 'A force is a push or a pull that changes, or tends to change, the state of rest or of motion of a body. Newton’s first law says a body stays at rest or keeps moving in a straight line at constant speed unless a net external force acts on it. That gives us a qualitative idea of force. On Earth, friction and air drag are the forces that make moving bodies slow down.',
    }),
    sl('concept', 'Inertia and mass', {
      b: '**Inertia** is the property of a body by which it resists any change in its state of rest or of uniform motion. Its measure is the **mass**: the greater the mass, the greater the inertia.',
      ul: [
        'A loaded handcart is harder to start, and harder to stop, than an empty one: it has more mass, so more inertia.',
        '**Inertia of rest:** passengers jerk backward when a train starts. **Inertia of motion:** they lurch forward when a bus brakes. **Inertia of direction:** they are thrown outward at a sharp turn.',
        'Inertia is not a force; it is a property of matter. Mass is a scalar with SI unit kg.',
      ],
      v: T_INERTIA,
      n: 'Inertia is the property of a body by which it resists a change in its state of rest or of uniform motion. Mass is the measure of inertia: a loaded handcart is harder to start or stop than an empty one. There is inertia of rest, as when a train starts and passengers jerk backward, inertia of motion, as when a bus brakes, and inertia of direction, as at a sharp turn.',
    }),
    sl('check', 'Quick check: inertia in a bus', {
      b: 'Choose the correct option.',
      v: T_INERTIA,
      chk: 'bus-mcq',
      n: 'Think about what the passenger’s body tends to keep doing when the bus slows down.',
    }),
    sl('concept', 'Linear momentum', {
      b: r`The **linear momentum** of a body of mass $m$ moving with velocity $\vec{v}$ is $\vec{p} = m\vec{v}$.`,
      ul: [
        r`Momentum is a **vector**, in the direction of the velocity. SI unit: $\text{kg m s}^{-1}$, which is the same as $\text{N s}$; dimensions $[\text{M L T}^{-1}]$.`,
        'It measures how hard a body is to stop: a cricket ball and a car at one speed differ widely in momentum, and a fast light bullet can match a slow heavy body.',
        'A change in momentum can come from a change in speed, in direction, or in both.',
      ],
      v: T_MOM,
      n: 'The linear momentum of a body is its mass times its velocity. It is a vector, pointing along the velocity, and its unit is kilogram metre per second, the same as newton second. The table shows how momentum differs widely between a cricket ball, a sprinter, a bullet and a car, which tells us how hard each one is to stop.',
    }),
    sl('concept', 'Newton’s second law: F = dp/dt', {
      b: r`The rate of change of momentum of a body is proportional to the net force on it, and takes place in the direction of the force. With the unit of force chosen so that the constant is $1$:`,
      m: [r`\vec{F} = \dfrac{d\vec{p}}{dt}`, r`\vec{F}_{\text{avg}} = \dfrac{\Delta\vec{p}}{\Delta t}`],
      ul: [
        r`This is the general form. It holds even when the mass changes (a rocket burning fuel) and is the form that survives at speeds close to $c$.`,
        `The graph shows a trolley with a constant force of ${pt.F} N: the momentum rises by ${pt.F} kg m s⁻¹ every second, and the **slope of the $p$–$t$ graph is the force**.`,
      ],
      v: plotPT,
      n: 'Newton’s second law says that the rate of change of momentum is proportional to the net force, and in the direction of the force. Choosing the unit of force suitably, force equals the rate of change of momentum. Over a short interval, the average force equals the change in momentum divided by the time. On a momentum time graph, the slope is the force.',
    }),
    sl('concept', 'F = ma as a special case', {
      b: r`For a body of **constant mass**, $\vec{p} = m\vec{v}$ and the mass comes out of the derivative:`,
      m: [r`\vec{F} = \dfrac{d(m\vec{v})}{dt} = m\dfrac{d\vec{v}}{dt} = m\vec{a}`, r`\sum F_x = m a_x, \qquad \sum F_y = m a_y`],
      ul: [
        r`**One newton** is the force that gives a mass of $1$ kg an acceleration of $1\ \text{m s}^{-2}$: $1\ \text{N} = 1\ \text{kg m s}^{-2}$.`,
        'The vector equation splits into **component equations** along perpendicular axes; each is solved separately, so a force at an angle is resolved first.',
        'For a fixed force, $a \\propto 1/m$ (graph): a body with twice the mass has half the acceleration.',
      ],
      v: plotAM,
      n: 'If the mass is constant it comes out of the derivative, and force equals mass times acceleration. One newton is the force that gives a mass of one kilogram an acceleration of one metre per second squared. The vector equation can be split into components along two perpendicular axes, and each is solved on its own. For a fixed force, the acceleration is inversely proportional to the mass.',
    }),
    sl('example', 'Worked example 1: a crate pulled at an angle', {
      b: r`A crate of mass $${e1.m}$ kg on a smooth floor is pulled by a rope with a force of $${e1.F}$ N at $${e1.th}^\circ$ above the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the acceleration and the normal reaction.`,
      ul: [
        r`Horizontal: $F\cos${e1.th}^\circ = ${f(e1.Fx)}$ N, so $a = \dfrac{${f(e1.Fx)}}{${e1.m}} = ${f(e1.ax)}$ m s$^{-2}$.`,
        r`Vertical: no acceleration, so $N + F\sin${e1.th}^\circ = mg$.`,
        r`$N = ${f(e1.m * g)} - ${f(e1.Fy)} = ${f(e1.Nr)}$ N, less than the weight because the rope lifts part of the load.`,
      ],
      v: T_E1,
      n: `Resolve the pull along the two axes. The horizontal part is ${N(e1.Fx)} newtons, so the acceleration is ${N(e1.Fx)} divided by ${W(e1.m)}, which is ${N(e1.ax)} metres per second squared. Vertically the crate does not accelerate, so the normal reaction plus the vertical part of the pull equals the weight. The normal reaction is ${N(e1.Nr)} newtons, less than the weight.`,
    }),
    sl('concept', 'Mass near the speed of light (idea only)', {
      b: r`At everyday speeds mass is constant and $F = ma$ works. As the speed of a body approaches the speed of light $c$, experiments show that its **measured mass increases** and tends to infinity.`,
      ul: [
        `At ${f(0.1)} c the increase is only ${f((gamma(0.1) - 1) * 100, 2)} per cent; at ${f(0.9)} c the mass is ${f(gamma(0.9), 3)} times the rest mass; at ${f(0.99)} c it is ${f(gamma(0.99), 3)} times.`,
        'So no material body can be accelerated to the speed of light, however long a force acts.',
        r`Here $F = ma$ with a fixed $m$ fails, but $F = \dfrac{dp}{dt}$ still holds: this is why the second law is stated through momentum. Only the idea is required; no calculation.`,
      ],
      v: plotGamma,
      n: 'At everyday speeds the mass of a body is constant. As the speed approaches the speed of light, experiments show that the measured mass increases, without limit. So a force cannot push a body to the speed of light. In that region force equals mass times acceleration, with a fixed mass, fails, but force equals the rate of change of momentum still holds. We need only the idea.',
    }),
    sl('check', 'Quick check: force and momentum', {
      b: 'Choose the correct option.',
      v: plotPT,
      chk: 'dpdt-mcq',
      n: 'Average force is the change in momentum divided by the time taken.',
    }),
    sl('concept', 'Impulse', {
      b: r`**Impulse** is the product of a force and the time for which it acts. For a force that varies, it is the **area under the force–time graph**.`,
      m: [r`\vec{J} = \vec{F}\,\Delta t = \Delta\vec{p} = m\vec{v} - m\vec{u}`],
      ul: [
        r`It follows from $F = \dfrac{\Delta p}{\Delta t}$: impulse equals the **change in momentum**. Unit $\text{N s} = \text{kg m s}^{-1}$; vector, along the change in momentum.`,
        `The bat in the figure acts on a ${IMP().m} kg ball for ${IMP().dt} s: a peak of ${IMP().Fmax} N but an average of ${IMP().Favg} N; the impulse ${IMP().J} N s is the area.`,
        'For a bounce back, take directions into account: a ball arriving at $u$ and leaving at $v$ the other way has $\\Delta p = m(v + u)$.',
      ],
      v: V.impulse,
      n: `Impulse is force times the time for which it acts, and it equals the change in momentum. For a varying force it is the area under the force time graph. In the figure the bat acts on the ball for ${N(IMP().dt)} seconds. The peak force is ${N(IMP().Fmax)} newtons, the average is ${N(IMP().Favg)} newtons, and the impulse is ${N(IMP().J)} newton seconds. When a ball bounces back, add the two speeds.`,
    }),
    sl('example', 'Worked example 2: catching a ball', {
      b: r`A fielder catches a cricket ball of mass $${e2.m}$ kg moving at $${e2.v}$ m s$^{-1}$. Find the average force on the hands if the ball is stopped in (i) $${e2.t1}$ s with rigid hands, (ii) $${e2.t2}$ s by drawing the hands back.`,
      ul: [
        r`Impulse $= \Delta p = m v = ${e2.m} \times ${e2.v} = ${f(e2.J)}$ N s in both cases.`,
        r`(i) $F = \dfrac{\Delta p}{\Delta t} = \dfrac{${f(e2.J)}}{${e2.t1}} = ${f(e2.F1)}$ N.`,
        r`(ii) $F = \dfrac{${f(e2.J)}}{${e2.t2}} = ${f(e2.F2)}$ N, **one quarter** of the first, because the time is four times as long.`,
      ],
      v: T_CATCH,
      n: `The impulse needed to stop the ball is its momentum, ${N(e2.J)} newton seconds, whichever way it is stopped. With rigid hands the stopping time is ${W(e2.t1)} seconds and the average force is ${N(e2.F1)} newtons. Drawing the hands back makes the time ${W(e2.t2)} seconds, so the force falls to ${N(e2.F2)} newtons. A longer time means a smaller force for the same impulse.`,
    }),
    sl('check', 'Quick check: why the fielder draws the hands back', {
      b: 'Choose the correct option.',
      v: T_CATCH,
      chk: 'impulse-mcq',
      n: 'The change in momentum is fixed. What can the fielder change?',
    }),
    sl('concept', 'Conservation of linear momentum', {
      b: r`For a system of bodies, Newton’s second law reads: net **external** force $= \dfrac{d\vec{P}}{dt}$, where $\vec{P}$ is the total momentum. For an **isolated system** the external force is zero:`,
      m: [r`\dfrac{d\vec{P}}{dt} = 0 \;\Rightarrow\; \vec{P} = \vec{p}_1 + \vec{p}_2 + \cdots = \text{constant}`, r`m_1\vec{u}_1 + m_2\vec{u}_2 = m_1\vec{v}_1 + m_2\vec{v}_2`],
      ul: [
        '**Law:** the total linear momentum of an isolated system stays constant; whatever one part gains, another loses.',
        'It is a vector law: it holds for each component separately, with signs for directions.',
        'Internal forces (collisions, explosions, recoil) change the momenta of the parts but not the total. The law is confirmed in all experiments and holds even where it is hard to use the forces.',
      ],
      v: T_CONS,
      n: 'For a system of bodies, the net external force equals the rate of change of the total momentum. For an isolated system there is no external force, so the total momentum does not change. That is the law of conservation of linear momentum. It is a vector law. Internal forces, as in collisions and explosions, can shift momentum from one part to another but cannot change the total.',
    }),
    sl('concept', 'The third law follows from conservation', {
      b: r`Take two bodies A and B that interact only with each other, an isolated pair. Conservation of momentum gives $\vec{p}_A + \vec{p}_B = \text{constant}$.`,
      m: [r`\dfrac{d\vec{p}_A}{dt} + \dfrac{d\vec{p}_B}{dt} = 0 \;\Rightarrow\; \vec{F}_{\text{on A}} = -\vec{F}_{\text{on B}}`],
      ul: [
        '**Newton’s third law:** to every action there is an equal and opposite reaction. The force on A by B is equal and opposite to the force on B by A.',
        'The two forces act at the **same time** on **different bodies**, so they never cancel each other; each produces its own acceleration.',
        'In the figure the forces are equal (50 N), but the lighter skater accelerates more, $a = F/m$.',
      ],
      v: V.pair,
      n: 'Take two bodies that interact only with each other. Their total momentum is constant, so the rate of change of one momentum is minus the rate of change of the other. Therefore the force on A equals minus the force on B. This is the third law: action and reaction are equal and opposite. They act on different bodies, so they do not cancel, and the lighter skater accelerates more.',
    }),
    sl('concept', 'Recoil of a gun', {
      b: r`A gun of mass $M$ fires a bullet of mass $m$ at velocity $\vec{v}$. Before firing the total momentum is zero. After firing:`,
      m: [r`0 = m v + M V \;\Rightarrow\; V = -\dfrac{m}{M}\,v`],
      ul: [
        'The minus sign: the gun **recoils** in the opposite direction. The two momenta are equal in size and opposite.',
        `Because $M \\gg m$, the recoil speed is small; here $V = ${RC.V}$ m s⁻¹ against $v = ${RC.v}$ m s⁻¹.`,
        r`The kinetic energies are **not** equal: $\dfrac{K_{\text{gun}}}{K_{\text{bullet}}} = \dfrac{m}{M}$, so the light bullet carries nearly all the energy.`,
      ],
      v: V.recoil,
      n: `Before firing, the total momentum is zero. After firing, the bullet's momentum and the gun's momentum must add to zero, so the gun recoils in the opposite direction with speed m v over M. In the figure the bullet has momentum ${W(RC.p)} kilogram metres per second, and so does the gun, so the gun recoils at only ${W(RC.V)} metres per second. The bullet carries nearly all the energy.`,
    }),
    sl('example', 'Worked example 3: a rifle fires a bullet', {
      b: r`A rifle of mass $${e3.M}$ kg fires a bullet of mass $${e3.m}$ kg at $${e3.v}$ m s$^{-1}$. Find the recoil speed of the rifle and the ratio of the kinetic energy of the rifle to that of the bullet.`,
      ul: [
        r`Momentum conservation: $0 = ${e3.m}(${e3.v}) + ${e3.M}V$, so the bullet’s momentum is $${f(e3.p)}$ kg m s$^{-1}$.`,
        r`$V = -\dfrac{${f(e3.p)}}{${e3.M}} = -${f(e3.V)}$ m s$^{-1}$: the rifle recoils at $${f(e3.V)}$ m s$^{-1}$.`,
        r`$\dfrac{K_{\text{rifle}}}{K_{\text{bullet}}} = \dfrac{m}{M} = \dfrac{${e3.m}}{${e3.M}} = \dfrac{1}{${f(1 / e3.ratio, 3)}}$.`,
      ],
      v: T_RIFLE,
      n: `The bullet's momentum is ${N(e3.p)} kilogram metres per second. The rifle must have an equal and opposite momentum, so its recoil speed is ${N(e3.p)} divided by ${W(e3.M)}, which is ${N(e3.V)} metres per second. The ratio of the kinetic energies is the mass of the bullet over the mass of the rifle, about one to ${N(1 / e3.ratio)}.`,
    }),
    sl('check', 'Quick check: recoil', {
      b: 'Choose the correct option.',
      v: V.recoil,
      chk: 'recoilspeed-mcq',
      n: 'Equal and opposite momenta: set the gun’s momentum equal to the bullet’s.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['First law, inertia', 'No net force: rest or uniform motion; inertia measured by mass'],
          ['Momentum', 'p = m v, vector, kg m/s'],
          ['Second law', 'F = dp/dt; F = ma for constant mass; 1 N = 1 kg m/s²'],
          ['Impulse', 'J = F Δt = Δp = area under the F–t graph'],
          ['Conservation of momentum', 'Isolated system: total p constant'],
          ['Third law', 'From conservation: forces of a pair equal and opposite, on different bodies'],
          ['Recoil', 'V = − m v / M; momenta equal and opposite'],
        ],
        'Summary table of the first law, momentum, the second law, impulse, conservation of momentum, the third law and recoil',
      ),
      n: 'To sum up. With no net force a body keeps its velocity, and inertia is measured by mass. Momentum is mass times velocity. Force is the rate of change of momentum, and for constant mass it is mass times acceleration. Impulse is force times time and equals the change in momentum. In an isolated system the total momentum is conserved, which gives the third law and explains recoil.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Give the law, then the formula, then the working: marks are given for each. In F = dp/dt, say that the force is the **net** force.',
        'Derivations: F = ma (take $m$ constant out of the derivative); conservation of momentum (no external force, so $dP/dt = 0$); third law from conservation (differentiate $p_A + p_B$).',
        'Common mistakes: treating action and reaction as acting on one body so that they cancel; forgetting the direction (sign) of velocities in a rebound or recoil; calling inertia a force; using grams for mass in newtons.',
        'State the condition for conservation: no external force (or negligible during the short interaction).',
      ],
      v: T_CATCH,
      n: 'In the examination, give the law, the formula and then the working. Say that the force is the net force. Learn the derivations: force equals mass times acceleration from the rate of change of momentum, conservation of momentum, and the third law from conservation. Common mistakes are letting action and reaction cancel, forgetting signs in rebound and recoil, and using grams instead of kilograms.',
    }),
  ],
});

/** Impulse numbers for the figure (read from the drawing data). */
function IMP() {
  const { m, u, v, dt } = G.IMP_DATA;
  const J = m * (v + u);
  return { m, dt, J, Fmax: (2 * J) / dt, Favg: J / dt };
}

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Newton’s Laws of Motion — Part 2: Free-body diagrams, connected bodies and equilibrium of forces',
  goals: [
    'Draw a free-body diagram showing weight, normal reaction, tension and applied forces',
    'Find the acceleration and tension for a block on a table joined over a pulley to a hanging mass, for an Atwood machine, for blocks in contact and for a lift',
    'State and use the triangle law, the parallelogram law, resolution and Lami’s theorem for concurrent forces in equilibrium',
    'State the conditions of equilibrium of three coplanar forces on a rigid body and solve the ladder problem against a smooth wall',
  ],
  slides: [
    sl('title', 'Solving Problems with Newton’s Laws', {
      b: 'Part 2 — free-body diagrams, connected bodies, a lift, and the equilibrium of concurrent forces and of a ladder.',
      v: V.table,
      n: 'How fast does a block slide when a hanging mass pulls it over the edge of a table? What does a weighing machine read inside a lift? How steeply can a ladder lean on a smooth wall? Each problem is solved the same way: draw a free body diagram for each body, then apply the laws of motion. In this part we do that for connected bodies and for forces in equilibrium.',
    }),
    sl('concept', 'Free-body diagrams: weight, normal reaction and tension', {
      b: 'A **free-body diagram** (FBD) isolates one body, or part of a system, and shows **only the forces acting on it**, each as an arrow from the body, with the axes marked.',
      ul: [
        '**Weight** $mg$ acts down. The **normal reaction** $N$ is perpendicular to the surface of contact and pushes the body away from it; it adjusts to whatever value is needed (it is not always $mg$).',
        '**Tension** $T$ pulls along a string, away from the body. For a light string over a smooth pulley the tension is the **same throughout** the string.',
        'Do not draw forces that the body exerts on others, and do not draw “resultant” or “force down the slope” as an extra force: components are drawn dashed.',
        'Then write $\\sum F = ma$ for each body along each axis.',
      ],
      v: T_FBD,
      n: 'A free body diagram shows one body on its own, with only the forces acting on it. Weight acts downward. The normal reaction is perpendicular to the surface and adjusts itself, so it is not always equal to the weight. Tension acts along a string, and for a light string over a smooth pulley it is the same everywhere. Then write force equals mass times acceleration for each body.',
    }),
    sl('example', 'Worked example 1: a block on a smooth incline', {
      b: r`A block of mass $${inc.m}$ kg slides on a smooth plane inclined at $${inc.th}^\circ$ to the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the normal reaction and the acceleration.`,
      ul: [
        r`Forces: weight $mg = ${f(inc.W)}$ N down, and $N$ perpendicular to the plane. Take axes along and perpendicular to the plane.`,
        r`Perpendicular (no acceleration): $N = mg\cos${inc.th}^\circ = ${f(inc.N)}$ N.`,
        r`Along the plane: $mg\sin${inc.th}^\circ = ma$, so $a = g\sin${inc.th}^\circ = ${f(inc.a)}$ m s$^{-2}$ down the slope, whatever the mass.`,
      ],
      v: V.incline,
      n: `Only two forces act on the block: its weight and the normal reaction. Choose axes along the plane and perpendicular to it. Perpendicular to the plane there is no acceleration, so the normal reaction is mg cosine theta, ${N(inc.N)} newtons. Along the plane the component mg sine theta produces the acceleration, g sine theta, ${N(inc.a)} metres per second squared, and the mass cancels.`,
    }),
    sl('concept', 'A block on a table joined to a hanging mass', {
      b: r`Block $m_1$ on a smooth table is joined by a light string over a smooth pulley to a mass $m_2$ hanging freely. Both have the same acceleration $a$ and the same tension $T$.`,
      m: [r`m_1:\; T = m_1 a \qquad m_2:\; m_2 g - T = m_2 a`, r`a = \dfrac{m_2 g}{m_1 + m_2}, \qquad T = \dfrac{m_1 m_2\, g}{m_1 + m_2}`],
      ul: [
        `For $m_1 = ${tb.m1}$ kg and $m_2 = ${tb.m2}$ kg: $a = ${f(tb.a)}$ m s⁻² and $T = ${f(tb.T)}$ N, less than the weight $${f(tb.m2 * g)}$ N of the hanging mass.`,
        'On the table, $N = m_1 g$ balances the weight: no vertical acceleration. Adding the two equations eliminates $T$.',
      ],
      v: V.table,
      n: `Apply force equals mass times acceleration to each body. On the table the tension alone gives m one a. For the hanging mass, weight minus tension gives m two a. Adding them eliminates the tension, so the acceleration is m two g over m one plus m two. For ${W(tb.m1)} and ${W(tb.m2)} kilograms it is ${N(tb.a)} metres per second squared, and the tension is ${N(tb.T)} newtons.`,
    }),
    sl('check', 'Quick check: table and hanging mass', {
      b: 'Choose the correct option.',
      v: V.table,
      chk: 'tablehang-mcq',
      n: 'Write one equation for each body, then add them.',
    }),
    sl('concept', 'The Atwood machine (one pulley)', {
      b: r`Masses $m_1 > m_2$ hang from a light string over a smooth pulley. $m_1$ goes down and $m_2$ goes up with the same acceleration $a$.`,
      m: [r`m_1 g - T = m_1 a \qquad T - m_2 g = m_2 a`, r`a = \dfrac{(m_1 - m_2)\,g}{m_1 + m_2}, \qquad T = \dfrac{2 m_1 m_2\, g}{m_1 + m_2}`],
      ul: [
        'Adding the two equations gives $a$; substituting back gives $T$. If $m_1 = m_2$, then $a = 0$ and $T = mg$.',
        r`$T$ lies between the two weights: $m_2 g < T < m_1 g$. (Problems with two pulleys are not required.)`,
        'The same method works for any chain of bodies joined by light strings.',
      ],
      v: V.atwood,
      n: 'Draw a free body diagram for each mass. The heavier mass goes down, so weight minus tension equals mass times acceleration. For the lighter mass, tension minus weight equals mass times acceleration. Adding gives the acceleration, m one minus m two over m one plus m two, times g. Substituting back gives the tension, which always lies between the two weights.',
    }),
    sl('example', 'Worked example 2: masses of 5 kg and 3 kg', {
      b: r`Masses of $${at.m1}$ kg and $${at.m2}$ kg hang from a light string over a smooth pulley, released from rest. Take $g = 9.8$ m s$^{-2}$. Find $a$, $T$, and the time for the heavier mass to move down $${at.h}$ m.`,
      ul: [
        r`$a = \dfrac{(${at.m1} - ${at.m2})(9.8)}{${at.m1} + ${at.m2}} = ${f(at.a)}$ m s$^{-2}$.`,
        r`$T = \dfrac{2(${at.m1})(${at.m2})(9.8)}{${at.m1} + ${at.m2}} = ${f(at.T, 4)}$ N, between $${f(at.m2 * g)}$ N and $${f(at.m1 * g)}$ N.`,
        r`$h = \tfrac{1}{2}at^2$ gives $t = \sqrt{\dfrac{2(${at.h})}{${f(at.a)}}} = ${f(at.t)}$ s.`,
      ],
      v: T_ATW,
      n: `The acceleration is the difference of the masses over their sum, times g: ${N(at.a)} metres per second squared. The tension is twice the product of the masses, times g, over the sum: ${N(at.T, 4)} newtons, between the two weights. Starting from rest, the heavier mass takes ${N(at.t)} seconds to move down ${W(at.h)} metres.`,
    }),
    sl('concept', 'Blocks in contact', {
      b: r`A force $F$ pushes block A (mass $m_1$), which pushes block B (mass $m_2$) on a smooth floor. They move together with one acceleration.`,
      m: [r`a = \dfrac{F}{m_1 + m_2}, \qquad F_{c} = m_2 a = \dfrac{m_2}{m_1 + m_2}F`],
      ul: [
        'Treat both as one body to find $a$; then isolate B: the only horizontal force on B is the contact force $F_c$ from A.',
        'A feels $F_c$ backward from B: a third-law pair, equal and opposite. For A: $F - F_c = m_1 a$.',
        `With $F = ${ct.F}$ N, $m_1 = ${ct.m1}$ kg, $m_2 = ${ct.m2}$ kg: $a = ${f(ct.a)}$ m s⁻² and $F_c = ${f(ct.Fc)}$ N.`,
      ],
      v: V.contact,
      n: `Treat the two blocks as a single body to find the acceleration, the force divided by the total mass, here ${N(ct.a)} metres per second squared. Then isolate the second block. The only horizontal force on it is the contact force from the first block, mass times acceleration, ${N(ct.Fc)} newtons. The first block feels an equal and opposite contact force, a third law pair.`,
    }),
    sl('concept', 'A lift: apparent weight', {
      b: r`A person of mass $m$ stands on a weighing machine in a lift of upward acceleration $a$. The machine reads the normal reaction $N$ (the **apparent weight**). Taking upward as positive: $N - mg = ma$.`,
      m: [r`N = m(g + a) \;\;(\text{accelerating up}), \quad N = mg \;\;(a = 0), \quad N = m(g - a) \;\;(\text{accelerating down})`],
      ul: [
        'Upward acceleration, or slowing down while moving down, makes $N > mg$: you feel heavier. Downward acceleration makes $N < mg$: you feel lighter.',
        'Constant velocity, up or down, gives the true weight. If the cable snaps, $a = g$ and $N = 0$: **weightlessness**.',
        `For ${lf.m} kg and $a = ${lf.a}$ m s⁻² the readings are ${f(lf.Nup)} N, ${f(lf.Nrest)} N and ${f(lf.Ndown)} N.`,
      ],
      v: V.lift,
      n: `The weighing machine reads the normal reaction. For upward positive, N minus m g equals m a. If the lift accelerates up, N is m times g plus a, and the person feels heavier. At constant velocity N equals the weight. If the lift accelerates down, N is m times g minus a, and the person feels lighter. If the cable snaps, N is zero, which is weightlessness.`,
    }),
    sl('example', 'Worked example 3: cable tension and the scale reading', {
      b: r`A lift of total mass $${lf.M}$ kg (with passengers) accelerates upward at $${lf.a}$ m s$^{-2}$. Take $g = 9.8$ m s$^{-2}$. Find the tension in the cable, and the reading of a scale under a $${lf.m}$ kg passenger.`,
      ul: [
        r`Whole lift: $T - Mg = Ma$, so $T = M(g + a) = ${lf.M} \times ${f(g + lf.a)} = ${f(lf.Tc)}$ N.`,
        r`Passenger: $N = m(g + a) = ${lf.m} \times ${f(g + lf.a)} = ${f(lf.Nup)}$ N, which is more than the true weight $${f(lf.m * g)}$ N.`,
        `If the cable snaps, the whole lift falls freely and the scale reads zero.`,
      ],
      v: T_LIFT,
      n: `For the whole lift, the cable tension minus the weight equals mass times acceleration, so the tension is ${W(lf.M)} times ${N(g + lf.a)}, which is ${N(lf.Tc)} newtons. For the passenger, the scale reads sixty times ${N(g + lf.a)}, ${N(lf.Nup)} newtons, greater than the true weight. If the cable snaps, the scale reads zero.`,
    }),
    sl('check', 'Quick check: reading in a lift', {
      b: 'Choose the correct option.',
      v: V.lift,
      chk: 'lift-mcq',
      n: 'Write N minus m g equals m a with downward acceleration taken as negative.',
    }),
    sl('concept', 'Equilibrium of concurrent forces', {
      b: r`Forces whose lines of action meet at a point are **concurrent**. A body is in **equilibrium** when the resultant is zero, $\sum\vec{F} = 0$.`,
      ul: [
        '**Triangle law:** if three forces keep a particle in equilibrium, they can be drawn head to tail to form a **closed triangle**. For more forces the closed figure is a **polygon**.',
        '**Parallelogram law:** the resultant of two forces is the diagonal of the parallelogram on them; in equilibrium the third force is equal and opposite to that diagonal.',
        '**Resolution:** equivalently, resolve along two perpendicular axes: $\\sum F_x = 0$ and $\\sum F_y = 0$.',
        'The lamp in the figure is held by two strings: the weight, $T_2$ and $T_1$ close the triangle.',
      ],
      v: V.lamp,
      n: 'Forces whose lines of action meet at a point are concurrent. For equilibrium their resultant is zero. By the triangle law, three forces in equilibrium can be drawn head to tail to form a closed triangle. By the parallelogram law, the resultant of two forces is the diagonal of the parallelogram, and the third force is equal and opposite to it. Or resolve along two axes and set each sum to zero.',
    }),
    sl('concept', 'Resolution and Lami’s theorem', {
      b: r`**Lami’s theorem:** if three concurrent forces are in equilibrium, each is proportional to the sine of the angle between the other two.`,
      m: [r`\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}`],
      ul: [
        r`It is the sine rule applied to the closed force triangle: each side is a force, and the angle opposite a side is the **supplement** of the angle between the other two forces.`,
        r`For a lamp of weight $W$ on strings at $\alpha$ (left) and $\beta$ (right) to the horizontal: $T_1 = \dfrac{W\cos\beta}{\sin(\alpha + \beta)}$ and $T_2 = \dfrac{W\cos\alpha}{\sin(\alpha + \beta)}$.`,
        'Resolving horizontally and vertically gives the same answers; use whichever method is quicker.',
      ],
      v: T_LAMI,
      n: 'Lami’s theorem says that if three concurrent forces are in equilibrium, each force is proportional to the sine of the angle between the other two. It is just the sine rule applied to the closed force triangle. For a lamp on two strings, it gives each tension directly. Resolving horizontally and vertically gives the same answers, so use whichever method is quicker.',
    }),
    sl('example', 'Worked example 4: a lamp on two strings', {
      b: r`A lamp of weight $${lp.W}$ N hangs from a knot held by two strings making $${lp.al}^\circ$ (left) and $${lp.be}^\circ$ (right) with the horizontal ceiling. Find the tensions.`,
      ul: [
        r`The angle between the strings is $180^\circ - (${lp.al}^\circ + ${lp.be}^\circ) = ${180 - lp.al - lp.be}^\circ$, and $\sin${lp.al + lp.be}^\circ = ${f(lp.sab, 4)}$.`,
        r`Lami: $T_1 = \dfrac{${lp.W}\cos${lp.be}^\circ}{\sin${lp.al + lp.be}^\circ} = ${f(lp.T1)}$ N.`,
        r`$T_2 = \dfrac{${lp.W}\cos${lp.al}^\circ}{\sin${lp.al + lp.be}^\circ} = ${f(lp.T2)}$ N.`,
        r`Check by resolving horizontally: $T_1\cos${lp.al}^\circ = ${f(lp.T1 * Math.cos(rad(lp.al)))}$ N $= T_2\cos${lp.be}^\circ = ${f(lp.T2 * Math.cos(rad(lp.be)))}$ N.`,
      ],
      v: V.lamp,
      n: `By Lami's theorem, the first tension is the weight times cosine of the second angle over sine of the sum of the two angles, ${N(lp.T1)} newtons. The second tension is ${N(lp.T2)} newtons. As a check, resolve horizontally: the horizontal parts of the two tensions are equal, ${N(lp.T1 * Math.cos(rad(lp.al)))} newtons each, so the knot has no sideways resultant.`,
    }),
    sl('check', 'Quick check: forces in equilibrium', {
      b: 'Choose the correct option.',
      v: V.lamp,
      chk: 'equil3-mcq',
      n: 'For three forces to balance, the closed triangle must be possible.',
    }),
    sl('concept', 'Three coplanar forces on a rigid body', {
      b: r`For a **rigid body** two conditions must hold, not one: no net force **and** no net torque.`,
      ul: [
        r`**Translation:** $\sum\vec{F} = 0$. **Rotation:** the sum of torques about any point is zero.`,
        '**Three non-parallel coplanar forces** can keep a rigid body in equilibrium only if their **lines of action meet at one point**. If they met at no common point, the torque about the meeting point of two of them would be due to the third alone, and could not vanish.',
        'Three **parallel** forces are also possible: the middle force acts opposite to the other two (like a plank on two supports).',
        'This gives a graphical method: find where two lines of action meet, then the third line must pass through that point.',
      ],
      v: T_RIGID,
      n: 'A rigid body needs two conditions for equilibrium: no net force and no net torque. If three forces in one plane are not parallel and keep a rigid body in equilibrium, their lines of action must meet at one point. Otherwise the third force would give a torque about the meeting point of the other two. Three parallel forces are also possible, with the middle one opposite to the other two.',
    }),
    sl('concept', 'The ladder against a smooth wall', {
      b: r`A uniform ladder of length $L$ and weight $W$ makes an angle $\theta$ with the floor and leans on a **smooth** wall. A smooth wall exerts only a **horizontal** reaction $N_w$ (perpendicular to it).`,
      m: [r`N_f = W, \qquad F_f = N_w`, r`N_w\,(L\sin\theta) = W\left(\dfrac{L}{2}\cos\theta\right) \;\Rightarrow\; N_w = \dfrac{W}{2}\cot\theta`],
      ul: [
        'At the floor there are two reaction components: a vertical $N_f$, and a horizontal force $F_f$ (taken here simply as the reaction component found from equilibrium; its limit comes with friction in the next chapter).',
        'Vertical balance gives $N_f$; horizontal balance gives $F_f = N_w$; torques about the foot give $N_w$ (the floor forces have no torque about the foot).',
        r`The three lines of action meet at **Q**, above the middle of the ladder: floor reaction $\tan\phi = N_f/F_f = 2\tan\theta$ with the floor.`,
        'A less steep ladder (smaller $\\theta$) needs a larger $N_w$ and a larger horizontal force at the floor.',
      ],
      v: V.ladder,
      n: 'The smooth wall pushes only horizontally, perpendicular to the wall. At the floor there is a vertical reaction and a horizontal force. Vertical balance says the floor reaction equals the weight. Horizontal balance says the floor force equals the wall reaction. Taking torques about the foot, the wall reaction times L sine theta equals W times half L cosine theta, so the wall reaction is W over two times cotangent theta.',
    }),
    sl('example', 'Worked example 5: a ladder of mass 20 kg', {
      b: r`A uniform ladder of length $${ld.L}$ m and mass $${ld.m}$ kg rests against a smooth wall at $${ld.th}^\circ$ to the floor. Take $g = 9.8$ m s$^{-2}$. Find the reaction of the wall and the total reaction at the floor.`,
      ul: [
        r`$W = ${ld.m} \times 9.8 = ${f(ld.W)}$ N and $N_f = W = ${f(ld.Nf)}$ N.`,
        r`Torques about the foot: $N_w = \dfrac{W}{2}\cot${ld.th}^\circ = ${f(ld.W / 2)} \times ${f(1 / Math.tan(rad(ld.th)), 4)} = ${f(ld.Nw)}$ N.`,
        r`Horizontal balance: $F_f = N_w = ${f(ld.Ff)}$ N.`,
        r`Total floor reaction $= \sqrt{${f(ld.Nf)}^2 + ${f(ld.Ff)}^2} = ${f(ld.R)}$ N, at $${f(ld.ang)}^\circ$ to the floor.`,
      ],
      v: T_LADDER,
      n: `The weight is ${N(ld.W)} newtons, so the vertical floor reaction is also ${N(ld.W)} newtons. Taking torques about the foot, the wall reaction is half the weight times the cotangent of fifty degrees, ${N(ld.Nw)} newtons. The horizontal force at the floor is the same, ${N(ld.Ff)} newtons. The total reaction at the floor is the resultant of the two, ${N(ld.R)} newtons.`,
    }),
    sl('check', 'Quick check: the ladder', {
      b: 'Choose the correct option.',
      v: V.ladder,
      chk: 'ladder-mcq',
      n: 'A smooth wall pushes only along its perpendicular. What must balance that push?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Problem', 'Result'],
        [
          ['Free-body diagram', 'One body, only the forces on it: W, N, T, applied; then F = ma along each axis'],
          ['Smooth incline', 'N = mg cos θ; a = g sin θ'],
          ['Table + hanging mass', 'a = m₂ g/(m₁ + m₂); T = m₁ m₂ g/(m₁ + m₂)'],
          ['Atwood machine', 'a = (m₁ − m₂) g/(m₁ + m₂); T = 2 m₁ m₂ g/(m₁ + m₂)'],
          ['Blocks in contact', 'a = F/(m₁ + m₂); contact force = m₂ a'],
          ['Lift', 'N = m(g ± a): up +, down −; zero in free fall'],
          ['Concurrent forces', 'Closed triangle; Lami: F/sin(opposite angle) equal'],
          ['Rigid body, three forces', 'ΣF = 0, Στ = 0; lines of action meet at a point'],
          ['Ladder, smooth wall', 'N_f = W; N_w = F_f = (W/2) cot θ'],
        ],
        'Summary table of free-body diagrams, the smooth incline, a table with a hanging mass, the Atwood machine, blocks in contact, the lift, concurrent forces, a rigid body under three forces and the ladder',
      ),
      n: 'To sum up. Draw a free body diagram for each body, and apply force equals mass times acceleration along each axis. Connected bodies share the same acceleration and, over a light string and smooth pulley, the same tension. In a lift, the scale reads m times g plus or minus a. Concurrent forces in equilibrium form a closed triangle, and Lami’s theorem applies. For a rigid body, forces and torques both vanish.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Draw a **separate FBD for each body** and label every force; marks are given for the diagram. Do not show the resultant as an extra force, and do not forget the normal reaction.',
        'Choose the positive direction in the direction of motion for each body, and say so. The acceleration and the tension are the **same magnitude** for bodies on one light string.',
        'Lift: write $N - mg = ma$ with a sign for $a$; check that $N > mg$ when accelerating up. Ladder: take torques about the foot (the unknown floor forces drop out), and give the direction of each reaction.',
        'Common mistakes: using $T = mg$ when the body accelerates; adding the weights in the Atwood machine; treating the wall reaction as vertical; giving the angle of Lami’s theorem as the angle between the strings rather than its sine.',
      ],
      v: T_FBD,
      n: 'Draw a separate free body diagram for each body, label every force, and say which direction you take as positive. Bodies on one light string share the same acceleration and tension. In a lift write N minus m g equals m a, with a sign for the acceleration. For a ladder, take torques about the foot, so the unknown floor forces drop out. Do not treat the tension as the weight when the body accelerates.',
    }),
  ],
});
