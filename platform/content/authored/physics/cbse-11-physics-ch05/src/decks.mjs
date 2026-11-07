// ch05 Work, Energy and Power — two decks: Part 1 (t01–t02) work by constant and variable forces, kinetic energy and the
// work–energy theorem; Part 2 (t03–t04) potential energy, springs, conservation of energy, power and collisions.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, integ, dot, norm, elastic, ke, R6 } from './phys.mjs';
import * as G from './svgs.mjs';

const deg = (x) => (x * 180) / Math.PI;

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { F: G.TOW_DATA.F, c: G.TOW_DATA.c, s: G.TOW_DATA.s, d: G.TOW_DATA.d };
ex1.Fc = R6(ex1.F * ex1.c);
ex1.Fs = R6(ex1.F * ex1.s);
ex1.W = R6(ex1.Fc * ex1.d);
const ex2 = { F: [6, -3, 2], d: [2, 5, -4] };
ex2.W = dot(ex2.F, ex2.d);
ex2.nF = norm(ex2.F);
ex2.nd = norm(ex2.d);
ex2.cos = ex2.W / (ex2.nF * ex2.nd);
ex2.theta = deg(Math.acos(ex2.cos));
const ex3 = { F0: G.FX_DATA.F0, x1: G.FX_DATA.x1, x2: G.FX_DATA.x2 };
ex3.A1 = ex3.F0 * ex3.x1;
ex3.A2 = 0.5 * (ex3.x2 - ex3.x1) * ex3.F0;
ex3.W = ex3.A1 + ex3.A2;
ex3.avg = ex3.W / ex3.x2;
const ex4 = { a: 2, b: 3, x1: 1, x2: 3 }; // F = a + b x²
ex4.F = (x) => ex4.a + ex4.b * x * x;
ex4.W = ex4.a * (ex4.x2 - ex4.x1) + ex4.b * (ex4.x2 ** 3 - ex4.x1 ** 3) / 3;
ex4.Wn = integ(ex4.F, ex4.x1, ex4.x2);
ex4.F1 = ex4.F(ex4.x1);
ex4.F2 = ex4.F(ex4.x2);
const ex5 = { m: 20000, v: 4.0, F: 8000 };
ex5.K = ke(ex5.m, ex5.v);
ex5.s = ex5.K / ex5.F;
ex5.a = ex5.F / ex5.m;
ex5.s2 = R6(ex5.v ** 2 / (2 * ex5.a));
const ex6 = { m: 0.5, u: 14, y: 4 };
ex6.K0 = ke(ex6.m, ex6.u);
ex6.H = R6(ex6.K0 / (ex6.m * g));
ex6.Wg = -ex6.m * g * ex6.H;
ex6.Ky = R6(ex6.K0 - ex6.m * g * ex6.y);
ex6.vy = Math.sqrt((2 * ex6.Ky) / ex6.m);
// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex7 = { m: G.BARS_DATA.m, hA: G.BARS_DATA.hA, hB: G.BARS_DATA.hB };
ex7.EA = R6(ex7.m * g * ex7.hA);
ex7.vB = Math.sqrt(2 * g * (ex7.hA - ex7.hB));
ex7.KB = ke(ex7.m, ex7.vB);
ex7.vC = Math.sqrt(2 * g * ex7.hA);
const ex8 = { k: G.SPRING_DATA.k, x: G.SPRING_DATA.x, x2: 0.25 };
ex8.U1 = R6(0.5 * ex8.k * ex8.x ** 2);
ex8.U2 = R6(0.5 * ex8.k * ex8.x2 ** 2);
ex8.dU = R6(ex8.U2 - ex8.U1);
ex8.F = R6(ex8.k * ex8.x);
const ex9 = { m: 0.5, k: 200, A: 0.1, x: 0.06 };
ex9.E = R6(0.5 * ex9.k * ex9.A ** 2);
ex9.v0 = R6(Math.sqrt((2 * ex9.E) / ex9.m));
ex9.U = R6(0.5 * ex9.k * ex9.x ** 2);
ex9.K = R6(ex9.E - ex9.U);
ex9.v = R6(Math.sqrt((2 * ex9.K) / ex9.m));
const ex10 = { m: 2, L: 5, th: 30, f: 4 };
ex10.h = R6(ex10.L * Math.sin((ex10.th * Math.PI) / 180));
ex10.dU = R6(ex10.m * g * ex10.h);
ex10.Wf = -ex10.f * ex10.L;
ex10.K = R6(ex10.dU + ex10.Wf);
ex10.v = Math.sqrt((2 * ex10.K) / ex10.m);
const ex11 = { m: 900, v: 2.0, f: 1500, t: 30 };
ex11.F = R6(ex11.m * g + ex11.f);
ex11.P = R6(ex11.F * ex11.v);
ex11.E = R6(ex11.P * ex11.t);
ex11.kWh = ex11.E / 3.6e6;
ex11.Pv = 30000;
const ex12 = { m1: 3, u1: 4, m2: 1 };
[ex12.v1, ex12.v2] = elastic(ex12.m1, ex12.u1, ex12.m2, 0);
ex12.p = ex12.m1 * ex12.u1;
ex12.K = ke(ex12.m1, ex12.u1);
const ex13 = { m: 0.02, u: 300, M: 3.98 };
ex13.V = R6((ex13.m * ex13.u) / (ex13.m + ex13.M));
ex13.h = ex13.V ** 2 / (2 * g);
ex13.K0 = R6(ke(ex13.m, ex13.u));
ex13.K1 = R6(ke(ex13.m + ex13.M, ex13.V));
ex13.lost = R6(ex13.K0 - ex13.K1);
ex13.frac = (100 * ex13.lost) / ex13.K0;
const ex14 = { m: G.COLL2D_DATA.m, v: G.COLL2D_DATA.v, deg: G.COLL2D_DATA.deg };
ex14.v1 = ex14.v * Math.cos((ex14.deg * Math.PI) / 180);
ex14.v2 = ex14.v * Math.sin((ex14.deg * Math.PI) / 180);
ex14.K = ke(ex14.m, ex14.v);
ex14.p = ex14.m * ex14.v;
const heavy = { m1: 20, m2: 1, u: 1 };
[heavy.v1, heavy.v2] = elastic(heavy.m1, heavy.u, heavy.m2, 0);

export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14, heavy };
export const NUMCHECK = {
  ex4Numeric: integ(ex4.F, ex4.x1, ex4.x2),
  ex3Numeric: integ((x) => (x <= ex3.x1 ? ex3.F0 : (ex3.F0 * (ex3.x2 - x)) / (ex3.x2 - ex3.x1)), 0, ex3.x2, 4000),
  ex8Numeric: integ((x) => ex8.k * x, 0, ex8.x),
  ex9Numeric: integ((x) => ex9.k * x, ex9.x, ex9.A),
};

// ---------------------------------------------------------------- visuals
export const V = {
  tow: svgV(G.TOW, 'A boat hauled along a canal bank by a rope pulling with 50 newtons at 37 degrees to the motion, with the force split into 40 newtons along the motion and 30 newtons across it', 'Only the component along the displacement does work.'),
  signs: svgV(G.SIGNS, 'A force of 10 newtons on a block that moves 5 metres, at 40, 90 and 150 degrees to the motion: positive, zero and negative work', 'The sign of the work follows the sign of cos θ.'),
  fxarea: svgV(G.FXAREA, 'A force-distance graph for a pushed handcart: 20 newtons for 3 metres, then falling to zero at 7 metres; the area is 100 joules', 'Work = area under the F–x graph.'),
  bars: svgV(G.BARS, 'A roller-coaster car with bar charts of potential and kinetic energy at three points; the total stays 58.8 kilojoules', 'Potential energy turns into kinetic energy; the total is constant.'),
  spring: svgV(G.SPRING, 'A block on a spring at natural length, compressed by 0.15 metres and stretched by 0.15 metres, with the spring force and stored energy', 'The force opposes the displacement; the stored energy is the same either way.'),
  collel: svgV(G.COLLEL, 'Two elastic collisions on a track with momentum and kinetic energy before and after', 'Elastic: both momentum and kinetic energy are conserved.'),
  collin: svgV(G.COLLIN, 'Two goods wagons couple on impact: momentum unchanged, kinetic energy reduced from 60 to 36 kilojoules', 'Perfectly inelastic: the bodies move together; kinetic energy is lost.'),
  coll2d: svgV(G.COLL2D, 'A glancing elastic collision of two equal balls, the second at rest, leaving at right angles', 'Equal masses, elastic, target at rest: the paths separate at 90°.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotFx = plot(
  {
    x: ax('position x (m)', 0, 3.5),
    y: ax('force F (N)', 0, 34),
    functions: [{ expr: `${ex4.a} + ${ex4.b}*x^2`, label: `F = ${ex4.a} + ${ex4.b} x² (N)`, domain: [0, 3.3] }],
    vlines: [{ x: ex4.x1, label: `x = ${ex4.x1} m: F = ${ex4.F1} N`, dashed: true }, { x: ex4.x2, label: `x = ${ex4.x2} m: F = ${ex4.F2} N`, dashed: true }],
  },
  'Force against position for F equal to 2 plus 3 x squared newtons; the area between the curve and the axis from 1 metre to 3 metres is the work, 30 joules',
  'The shaded interval is x = 1 m to 3 m; its area is the work.',
);
export const plotK = plot(
  {
    x: ax('speed v (m/s)', 0, 10),
    y: ax('kinetic energy K (J)', 0, 210),
    functions: [{ expr: 'x^2', label: 'm = 2 kg: K = v² (J)', domain: [0, 10] }, { expr: '2*x^2', label: 'm = 4 kg: K = 2 v² (J)', domain: [0, 10] }],
  },
  'Kinetic energy against speed for a 2 kilogram and a 4 kilogram body: two parabolas, the heavier one twice as high; doubling the speed multiplies the kinetic energy by four',
  'K grows as v²: double the speed, four times the energy.',
);
export const plotEs = plot(
  {
    x: ax('displacement x (m)', -0.12, 0.12),
    y: ax('energy (J)', 0, 1.3),
    functions: [
      { expr: `${R6(ex9.k / 2)}*x^2`, label: 'spring energy U = 100 x² (J)', domain: [-0.11, 0.11] },
      { expr: `${R6(ex9.E)} - ${R6(ex9.k / 2)}*x^2`, label: 'kinetic energy K = 1 − 100 x² (J)', domain: [-0.1, 0.1] },
    ],
    hlines: [{ y: ex9.E, label: `total E = ${ex9.E} J`, dashed: true }],
  },
  'Energy against displacement for a block of 0.5 kilograms on a spring of 200 newtons per metre released from 0.10 metres: the spring energy is a parabola opening upward, the kinetic energy a parabola opening downward, and their sum stays at 1.0 joule',
  'U + K = E at every x; at x = ±0.10 m all of E is stored in the spring.',
);
export const plotU = plot(
  {
    x: ax('extension or compression x (m)', -0.3, 0.3),
    y: ax('stored energy U (J)', 0, 40),
    functions: [{ expr: `${ex8.k / 2}*x^2`, label: 'U = 400 x² (J), k = 800 N/m', domain: [-0.3, 0.3] }],
    points: [{ at: [ex8.x, R6(ex8.U1)], label: `x = 0.15 m: U = ${ex8.U1} J` }, { at: [-ex8.x, R6(ex8.U1)], label: `x = −0.15 m: U = ${ex8.U1} J` }],
  },
  'Stored energy of a spring of stiffness 800 newtons per metre against its extension: a parabola symmetric about zero, giving 9 joules at plus and minus 0.15 metres',
  'U depends on x², so compression and stretch store the same energy.',
);
export const plotP = plot(
  {
    x: ax('speed v (m/s)', 0, 40),
    y: ax('driving force F (N)', 0, 6500),
    functions: [{ expr: `${ex11.Pv}/x`, label: 'F = P / v for P = 30 kW (N)', domain: [5, 40] }],
    points: [{ at: [20, ex11.Pv / 20], label: 'v = 20 m/s: F = 1500 N' }],
  },
  'Driving force against speed for an engine delivering a constant 30 kilowatts: a falling curve, 6000 newtons at 5 metres per second, 1500 newtons at 20 metres per second and 750 newtons at 40 metres per second',
  'At constant power, a larger speed means a smaller driving force.',
);

// ---------------------------------------------------------------- tables
const Tke = table(
  ['Moving body', 'Mass (kg)', 'Speed (m/s)', 'Kinetic energy'],
  [
    ['Cricket ball, fast bowl', '0.16', '36', `${dec(ke(0.16, 36), 3)} J`],
    ['Sprinter at the finish', '70', '10', `${dec(ke(70, 10) / 1000, 3)} kJ`],
    ['Auto-rickshaw with driver', '350', '10', `${dec(ke(350, 10) / 1000, 3)} kJ`],
    ['Goods wagon, shunting', '20 000', '4', `${dec(ke(20000, 4) / 1000, 3)} kJ`],
  ],
  'Table of kinetic energies of a cricket ball, a sprinter, an auto-rickshaw and a goods wagon, from half m v squared',
);
const Tdot = table(
  ['Product', 'Value', 'Why'],
  [
    ['î · î = ĵ · ĵ = k̂ · k̂', '1', 'parallel unit vectors, cos 0° = 1'],
    ['î · ĵ = ĵ · k̂ = k̂ · î', '0', 'perpendicular, cos 90° = 0'],
    ['A · B = B · A', 'same number', 'order does not matter'],
    ['A · B = Ax Bx + Ay By + Az Bz', 'scalar', 'multiply matching components and add'],
  ],
  'Table of dot products of the unit vectors and the component rule for the scalar product',
);
const Twork = table(
  ['Situation', 'Angle between F and d', 'Work by that force'],
  [
    ['Normal force on a block sliding on a table', '90°', 'zero'],
    ['Friction on a sliding crate', '180°', 'negative'],
    ['Gravity on a ball while it rises', '180°', 'negative'],
    ['Gravity on the same ball while it falls', '0°', 'positive'],
    ['Hand holding a heavy bag still', 'no displacement', 'zero'],
  ],
  'Table of everyday situations with the angle between force and displacement and the sign of the work',
);
const Tledger = table(
  ['Item', 'Value (J)'],
  [
    ['Gravitational energy lost, m g L sin θ', dec(ex10.dU, 3)],
    ['Work done by friction, −f L', dec(ex10.Wf, 3)],
    ['Gain in kinetic energy (the sum)', dec(ex10.K, 3)],
  ],
  'Energy ledger for a block sliding down a rough slope: the energy lost by gravity less the work done against friction equals the kinetic energy gained',
);
const Tforces = table(
  ['Force', 'Work on a closed path', 'Kind'],
  [
    ['Gravity (near the Earth)', 'zero', 'conservative: potential energy m g h'],
    ['Spring force F = −k x', 'zero', 'conservative: potential energy ½ k x²'],
    ['Kinetic friction', 'negative, never zero', 'non-conservative: energy goes to heat'],
    ['Air drag', 'negative, never zero', 'non-conservative'],
  ],
  'Table comparing gravity, spring force, friction and air drag as conservative or non-conservative forces',
);
const Tpower = table(
  ['Quantity', 'Unit', 'Value'],
  [
    ['Power', 'watt (W)', '1 W = 1 J per second'],
    ['Large power', 'kilowatt, megawatt', '1 kW = 1000 W; 1 MW = 10⁶ W'],
    ['Older engine unit', 'horse power (hp)', '1 hp = 746 W'],
    ['Energy billed by a meter', 'kilowatt hour (kW h)', `1 kW h = 3.6 × 10⁶ J`],
  ],
  'Table of units of power and of the commercial unit of energy',
);
const Tcoll = table(
  ['Type of collision', 'Momentum', 'Kinetic energy', 'Example'],
  [
    ['Elastic', 'conserved', 'conserved', 'steel balls on a track, atoms of a gas'],
    ['Inelastic', 'conserved', 'some lost', 'a ball that rebounds lower'],
    ['Perfectly inelastic', 'conserved', 'greatest loss: bodies move together', 'wagons coupling, a bullet stuck in wood'],
  ],
  'Table of the three kinds of collision: elastic, inelastic and perfectly inelastic, with what is conserved',
);
const Tspecial = table(
  ['Case (target at rest)', 'Result for the first body', 'Result for the target'],
  [
    ['Equal masses', 'stops (v′ = 0)', 'moves off with the full speed u'],
    [`Heavy hits light (${heavy.m1} : ${heavy.m2})`, `keeps going at ${dec(heavy.v1, 3)} u`, `shoots ahead at ${dec(heavy.v2, 3)} u`],
    ['Light hits heavy', 'bounces back with nearly its own speed', 'hardly moves'],
  ],
  'Table of special cases of an elastic collision with the target at rest: equal masses, a heavy body hitting a light one, and a light body hitting a heavy one',
);
export const TABLES = { Tke, Tdot, Twork, Tledger, Tforces, Tpower, Tcoll, Tspecial };
const E0 = (x) => dec(x, 3);

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Work, Energy and Power — Part 1: Work, kinetic energy and the work–energy theorem',
  goals: [
    'Calculate the work done by a constant force using the scalar product, and say when it is positive, zero or negative',
    'Find the work done by a variable force as the area under the F–x graph or by integration',
    'State and use the work–energy theorem with kinetic energy',
  ],
  slides: [
    sl('title', 'Work, Energy and Power', {
      b: 'Part 1 — what work means in physics, how to add it up when the force changes, and how it changes kinetic energy.',
      v: V.tow,
      n: 'A boat hauled along a canal, a handcart pushed through a market lane, a wagon braked to a halt. In each case something pushes or pulls through a distance. In this part we make that idea exact: work as the scalar product of force and displacement, work when the force varies, and the link between work and the energy of motion.',
    }),
    sl('concept', 'Work done by a constant force', {
      b: 'A constant force $\\vec F$ acts on a body that undergoes a displacement $\\vec d$ at angle $\\theta$ to the force.',
      m: [r`W = \vec F \cdot \vec d = F\,d\cos\theta`],
      ul: [
        'Work is a **scalar**: it has a size and a sign but no direction. SI unit: joule (J), 1 J = 1 N m.',
        r`Only the component of the force **along** the displacement, $F\cos\theta$, does work; the component across it does none.`,
        'The work depends on the displacement of the point where the force acts, not on how long the force acts.',
        'A force that does not make its point of application move does no work.',
      ],
      v: V.tow,
      n: 'Work is the product of the force, the displacement, and the cosine of the angle between them. It is a scalar, measured in joules. Only the part of the force along the displacement counts. In the picture the rope pulls at an angle, so just the horizontal component, forty newtons, does the work; the vertical component does nothing for the motion along the bank.',
    }),
    sl('diagram', 'Positive, zero and negative work', {
      b: 'The angle $\\theta$ between force and displacement decides the sign of the work.',
      ul: [
        r`$0^\circ \le \theta < 90^\circ$: $\cos\theta > 0$, work positive; the force helps the motion.`,
        r`$\theta = 90^\circ$: $\cos\theta = 0$, no work.`,
        r`$90^\circ < \theta \le 180^\circ$: $\cos\theta < 0$, work negative; the force opposes the motion, as friction does.`,
        'Negative work takes energy away from the body; positive work gives energy to it.',
      ],
      v: V.signs,
      n: 'Look at the three blocks. When the force has a component along the motion the work is positive. When the force is at a right angle, the work is zero. When the force has a component against the motion, the work is negative, and the body loses energy. Friction on a sliding crate is the everyday example of negative work.',
    }),
    sl('example', 'Worked example 1: a boat on a canal', {
      b: r`A rope pulls a boat along a canal bank with a steady force of ${ex1.F} N at an angle $\theta$ to the bank, where $\cos\theta = ${ex1.c}$. The boat moves ${ex1.d} m along the bank. Find the work done by the rope and the work done by the vertical component of the force.`,
      ul: [
        r`Component along the motion: $F\cos\theta = ${ex1.F} \times ${ex1.c} = ${ex1.Fc}$ N.`,
        r`$W = (F\cos\theta)\,d = ${ex1.Fc} \times ${ex1.d} = ${ex1.W}$ J.`,
        r`The component across the motion is $F\sin\theta = ${ex1.Fs}$ N; it is at $90^\circ$ to $\vec d$, so its work is $0$.`,
        r`Check with components: $\vec F = (${ex1.Fc}\,\hat\imath + ${ex1.Fs}\,\hat\jmath)$ N and $\vec d = ${ex1.d}\,\hat\imath$ m give $\vec F\cdot\vec d = ${ex1.Fc} \times ${ex1.d} = ${ex1.W}$ J.`,
      ],
      v: V.tow,
      n: 'The rope pulls with fifty newtons, but only the horizontal component counts. Fifty times point eight gives forty newtons along the bank. Multiply by the fifteen metre displacement and the work is six hundred joules. The upward component of thirty newtons is at right angles to the motion, so it does no work. Writing the force in components gives the same six hundred.',
    }),
    sl('check', 'Quick check: sign of the work', {
      b: 'Choose the correct option.',
      v: V.signs,
      chk: 'signwork-mcq',
      n: 'Decide whether the force has a component along the motion, across it, or against it.',
    }),
    sl('concept', 'The scalar product in components', {
      b: r`For $\vec A = A_x\hat\imath + A_y\hat\jmath + A_z\hat k$ and $\vec B = B_x\hat\imath + B_y\hat\jmath + B_z\hat k$:`,
      m: [r`\vec A \cdot \vec B = A_x B_x + A_y B_y + A_z B_z = AB\cos\theta`],
      ul: [
        'Perpendicular vectors have a zero scalar product; parallel ones have the largest.',
        r`So the work of $\vec F$ for a displacement $\vec d$ is $W = F_x d_x + F_y d_y + F_z d_z$.`,
        r`The angle follows from $\cos\theta = \dfrac{\vec F\cdot\vec d}{F\,d}$.`,
      ],
      v: Tdot,
      n: 'Multiply the matching components of two vectors and add, and you get the scalar product. It also equals the product of the two sizes and the cosine of the angle between them. Unit vectors that are perpendicular give zero, parallel ones give one. This makes it easy to find work when the force and the displacement are given in components.',
    }),
    sl('example', 'Worked example 2: force and displacement as vectors', {
      b: r`A force $\vec F = (${ex2.F[0]}\,\hat\imath - ${-ex2.F[1]}\,\hat\jmath + ${ex2.F[2]}\,\hat k)$ N acts on a particle while it moves through $\vec d = (${ex2.d[0]}\,\hat\imath + ${ex2.d[1]}\,\hat\jmath - ${-ex2.d[2]}\,\hat k)$ m. Find the work done and the angle between $\vec F$ and $\vec d$.`,
      ul: [
        r`$W = (${ex2.F[0]})(${ex2.d[0]}) + (${ex2.F[1]})(${ex2.d[1]}) + (${ex2.F[2]})(${ex2.d[2]}) = ${ex2.F[0] * ex2.d[0]} - ${-ex2.F[1] * ex2.d[1]} - ${-ex2.F[2] * ex2.d[2]} = ${ex2.W}$ J.`,
        r`$F = \sqrt{${ex2.F[0] ** 2} + ${ex2.F[1] ** 2} + ${ex2.F[2] ** 2}} = ${E0(ex2.nF)}$ N and $d = \sqrt{${ex2.d[0] ** 2} + ${ex2.d[1] ** 2} + ${ex2.d[2] ** 2}} = ${E0(ex2.nd)}$ m.`,
        r`$\cos\theta = \dfrac{${ex2.W}}{${E0(ex2.nF)} \times ${E0(ex2.nd)}} = ${dec(ex2.cos, 3)}$, so $\theta \approx ${dec(ex2.theta, 4)}^\circ$.`,
        'The work is negative because the angle is obtuse: the force mostly opposes the displacement.',
      ],
      v: Tdot,
      n: 'Multiply matching components: six times two is twelve, minus three times five is minus fifteen, two times minus four is minus eight. The total is minus eleven joules. The sizes of the two vectors are seven newtons and about six point seven metres, so the cosine of the angle is about minus point two three. The angle is a little over a hundred degrees, which is why the work is negative.',
    }),
    sl('concept', 'Work done by a variable force', {
      b: 'Cut the path into very short steps $\\Delta x$ in which the force is nearly constant, then add the small works.',
      m: [r`W = \sum F\,\Delta x \;\to\; W = \int_{x_i}^{x_f} F(x)\,dx`],
      ul: [
        '**Graphically:** the work equals the **area under the F–x graph** between the two positions; area above the axis counts positive, below it negative.',
        'For a constant force the area is a rectangle, and the integral reduces to $F\\,\\Delta x$.',
        'Split awkward graphs into rectangles and triangles and add the areas.',
      ],
      v: V.fxarea,
      n: 'When the force changes with position, split the path into tiny steps in which the force is almost constant, and add the small amounts of work. In the limit this sum is the integral of the force over distance, which is the area under the force against position graph. Areas above the axis count positive and areas below it negative.',
    }),
    sl('example', 'Worked example 3: a pushed handcart', {
      b: `A labourer pushes a loaded handcart with ${ex3.F0} N for the first ${ex3.x1} m and then eases off steadily, so that the force falls to zero at ${ex3.x2} m. Find the work done by the push.`,
      ul: [
        `Rectangle, 0 to ${ex3.x1} m: ${ex3.F0} × ${ex3.x1} = ${ex3.A1} J.`,
        `Triangle, ${ex3.x1} m to ${ex3.x2} m: ½ × ${ex3.x2 - ex3.x1} × ${ex3.F0} = ${ex3.A2} J.`,
        `Total work = ${ex3.A1} + ${ex3.A2} = ${ex3.W} J.`,
        `Average force over the ${ex3.x2} m = ${ex3.W}/${ex3.x2} ≈ ${dec(ex3.avg, 3)} N (less than the peak of ${ex3.F0} N).`,
      ],
      v: V.fxarea,
      n: 'Split the graph into a rectangle and a triangle. For the first three metres the force is twenty newtons, giving sixty joules. Over the next four metres it falls to zero, a triangle with area one half times four times twenty, which is forty joules. The total is one hundred joules. Averaged over seven metres, that is about fourteen newtons.',
    }),
    sl('example', 'Worked example 4: work by integration', {
      b: r`A force $F = (${ex4.a} + ${ex4.b}x^2)$ N acts along the $x$-axis, with $x$ in metres. Find the work done in moving the body from $x = ${ex4.x1}$ m to $x = ${ex4.x2}$ m.`,
      ul: [
        r`$W = \int_{${ex4.x1}}^{${ex4.x2}} (${ex4.a} + ${ex4.b}x^2)\,dx = \Big[${ex4.a}x + x^3\Big]_{${ex4.x1}}^{${ex4.x2}}$.`,
        r`At $x = ${ex4.x2}$: $${ex4.a * ex4.x2} + ${ex4.x2 ** 3} = ${ex4.a * ex4.x2 + ex4.x2 ** 3}$; at $x = ${ex4.x1}$: $${ex4.a * ex4.x1} + ${ex4.x1 ** 3} = ${ex4.a * ex4.x1 + ex4.x1 ** 3}$.`,
        r`$W = ${ex4.a * ex4.x2 + ex4.x2 ** 3} - ${ex4.a * ex4.x1 + ex4.x1 ** 3} = ${ex4.W}$ J.`,
        `The force grows from ${ex4.F1} N to ${ex4.F2} N, so the work lies between ${ex4.F1 * 2} J and ${ex4.F2 * 2} J; the answer is consistent.`,
      ],
      v: plotFx,
      n: 'Integrate the force from one metre to three metres. The antiderivative of two plus three x squared is two x plus x cubed. At three metres it is thirty three, at one metre it is three, and the difference is thirty joules. Since the force rises from five to twenty nine newtons over two metres, the work must lie between ten and fifty eight joules, so thirty is reasonable.',
    }),
    sl('check', 'Quick check: area under a graph', {
      b: 'Read the work from the F–x graph described in the question.',
      v: plotFx,
      chk: 'fxarea-num',
      n: 'Split the region into simple shapes, and add the areas with their signs.',
    }),
    sl('concept', 'Kinetic energy', {
      b: 'The energy a body has because of its motion:',
      m: [r`K = \tfrac{1}{2}mv^2 = \dfrac{p^2}{2m}`],
      ul: [
        'A scalar that is never negative; SI unit joule. It does not depend on the direction of motion.',
        'Doubling the speed multiplies $K$ by four; doubling the mass only doubles $K$.',
        'Two bodies with equal momentum: the lighter one has the larger kinetic energy.',
      ],
      v: Tke,
      n: 'Kinetic energy is one half the mass times the speed squared. It is a scalar and never negative. Because it depends on the square of the speed, doubling the speed quadruples the energy, which is why a fast vehicle is so much harder to stop. The table shows a few everyday values, from a cricket ball to a goods wagon.',
    }),
    sl('concept', 'The work–energy theorem', {
      b: 'The change in kinetic energy of a body equals the net work done on it by all the forces.',
      m: [r`W_\text{net} = K_f - K_i = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2`],
      ul: [
        r`**For a constant force:** $v^2 = u^2 + 2as$ and $F = ma$ give $Fs = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$.`,
        r`**For a variable force:** $W = \int F\,dx = \int m\,\dfrac{dv}{dt}\,dx = \int mv\,dv = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2$.`,
        'Positive net work raises the kinetic energy; negative net work lowers it.',
        'It holds for every kind of force, including friction; it is Newton’s second law in energy form.',
      ],
      v: plotK,
      n: 'Start from the equation of motion for constant acceleration. Multiply by the mass and you find that force times distance equals the change in half m v squared. For a variable force, write the force as mass times velocity times the rate of change of velocity with distance, integrate, and the same result appears. The net work done on a body equals its change in kinetic energy.',
    }),
    sl('example', 'Worked example 5: braking a goods wagon', {
      b: `A goods wagon of mass ${ex5.m} kg rolls at ${ex5.v} m/s in a shunting yard. The brakes apply a steady retarding force of ${ex5.F} N. How far does it travel before it stops?`,
      ul: [
        `Initial kinetic energy: ½ × ${ex5.m} × ${ex5.v}² = ${ex5.K} J (${R6(ex5.K / 1000)} kJ).`,
        'Final kinetic energy is zero. The braking force is opposite to the motion, so its work is −F s.',
        `Work–energy theorem: −${ex5.F} s = 0 − ${ex5.K}, so s = ${ex5.K}/${ex5.F} = ${ex5.s} m.`,
        `Check by kinematics: a = F/m = ${ex5.a} m/s², s = v²/2a = ${ex5.v ** 2}/${2 * ex5.a} = ${ex5.s2} m.`,
      ],
      v: plotK,
      n: 'The wagon starts with one hundred sixty kilojoules of kinetic energy. The brakes do negative work equal to the force times the distance, and the final energy is zero. So the distance is one hundred sixty thousand joules divided by eight thousand newtons, which is twenty metres. Checking with the kinematic equation gives the same answer.',
    }),
    sl('example', 'Worked example 6: a ball thrown upward', {
      b: `A ball of mass ${ex6.m} kg is thrown vertically upward at ${ex6.u} m/s (g = 9.8 m/s²; ignore air). Use the work–energy theorem to find the greatest height and the speed at a height of ${ex6.y} m.`,
      ul: [
        `K at launch = ½ × ${ex6.m} × ${ex6.u}² = ${ex6.K0} J.`,
        `At the top v = 0. Gravity does work −m g H: −${ex6.m} × 9.8 × H = 0 − ${ex6.K0}, so H = ${ex6.K0}/${R6(ex6.m * g)} = ${ex6.H} m.`,
        `At ${ex6.y} m: K = ${ex6.K0} − ${ex6.m} × 9.8 × ${ex6.y} = ${dec(ex6.Ky, 3)} J.`,
        `v = √(2K/m) = √(2 × ${dec(ex6.Ky, 3)}/${ex6.m}) = ${dec(ex6.vy, 4)} m/s.`,
      ],
      v: Twork,
      n: 'The ball leaves with forty nine joules of kinetic energy. Gravity does negative work on the way up, minus m g times the height. Setting that equal to the change in kinetic energy gives a maximum height of ten metres. At four metres, gravity has taken away nineteen point six joules, leaving twenty nine point four joules, which corresponds to a speed of about ten point eight metres per second.',
    }),
    sl('check', 'Quick check: work–energy theorem', {
      b: 'Apply the theorem to the situation in the question.',
      v: plotK,
      chk: 'wke-num',
      n: 'Equate the net work to the change in kinetic energy; watch the sign of each force’s work.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Work, constant force', 'W = F · d = F d cos θ (scalar, joule)'],
          ['Sign of work', 'θ < 90°: positive; 90°: zero; > 90°: negative'],
          ['Scalar product', 'A · B = Ax Bx + Ay By + Az Bz'],
          ['Variable force', 'W = ∫ F dx = area under the F–x graph'],
          ['Kinetic energy', 'K = ½ m v² = p² / 2m'],
          ['Work–energy theorem', 'W(net) = K(final) − K(initial)'],
        ],
        'Summary table of work, scalar product, variable force, kinetic energy and the work–energy theorem',
      ),
      n: 'Remember the main results. Work is force dot displacement. Its sign follows the angle. For a changing force, work is the area under the force against position graph. Kinetic energy is half m v squared, and the net work done on a body equals the change in its kinetic energy.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Use the angle between the force and the displacement, not the angle with the horizontal, unless they are the same.',
        'Write the sign of each work: friction and drag do negative work; the normal force on a sliding body does none.',
        'For a variable force, sketch the F–x graph first; areas below the axis are negative.',
        'In work–energy problems add the works of all forces, including gravity, before equating to the change in K.',
      ],
      v: Twork,
      n: 'In the examination, use the angle between the force and the displacement. Give every work its sign. For a changing force, sketch the graph and split it into simple shapes. And in a work energy problem, remember to add the work of every force, including gravity and friction, before you equate the total to the change in kinetic energy.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Work, Energy and Power — Part 2: Potential energy, conservation, power and collisions',
  goals: [
    'Distinguish conservative from non-conservative forces and define potential energy, including the spring',
    'Apply conservation of mechanical energy and the energy ledger with friction',
    'Calculate power, and analyse elastic and inelastic collisions in one dimension and simple two-dimensional collisions',
  ],
  slides: [
    sl('title', 'Potential Energy, Power and Collisions', {
      b: 'Part 2 — stored energy, the conservation of mechanical energy, how fast work is done, and what happens when bodies collide.',
      v: V.bars,
      n: 'A roller coaster car at the top of a track, a compressed spring, a lift motor, two wagons meeting in a yard. In this part we follow energy as it changes form, learn when the total mechanical energy stays constant, define power as the rate of doing work, and use conservation laws to analyse collisions.',
    }),
    sl('concept', 'Conservative forces and potential energy', {
      b: 'A force is **conservative** if the work it does between two points does not depend on the path, so the work over any closed path is zero.',
      ul: [
        r`For such a force a **potential energy** $U$ can be defined: $W_\text{by the force} = -\Delta U$, equivalently $F = -\dfrac{dU}{dx}$.`,
        r`Gravity near the Earth: $U = mgh$ above a chosen reference level; only **differences** of $U$ matter, so the level is a free choice.`,
        'Friction and air drag are **non-conservative**: their work depends on the path and no potential energy exists for them.',
        'Mechanical energy $E = K + U$.',
      ],
      v: Tforces,
      n: 'A force is conservative when the work it does between two points does not depend on the route taken. Over a closed path the work is zero. Gravity and the spring force are like this, so each has a potential energy, and the force is minus the slope of the potential energy curve. Friction and drag are not, because the longer the path, the more work they do. Only changes in potential energy matter, so we can choose the zero level for convenience.',
    }),
    sl('concept', 'Conservation of mechanical energy', {
      b: 'If only conservative forces do work, the total mechanical energy stays constant:',
      m: [r`K + U = \text{constant}, \qquad \tfrac{1}{2}mv_1^2 + mgh_1 = \tfrac{1}{2}mv_2^2 + mgh_2`],
      ul: [
        'The work–energy theorem gives $\\Delta K = W = -\\Delta U$, so $\\Delta(K + U) = 0$.',
        'A force that does no work, such as the normal force of a smooth track, does not spoil conservation.',
        'The mass cancels: the speed at a given drop does not depend on the mass.',
      ],
      v: V.bars,
      n: 'The work energy theorem says the change in kinetic energy equals the work done. For a conservative force the work is minus the change in potential energy. Put the two together and the sum of kinetic and potential energy does not change. On the roller coaster track the normal force does no work, so the bars show potential energy turning into kinetic energy with the same total.',
    }),
    sl('example', 'Worked example 7: a roller-coaster car', {
      b: `A roller-coaster car of mass ${ex7.m} kg is released from rest at a height of ${ex7.hA} m above the lowest point of a frictionless track (g = 9.8 m/s²). Find its speed when it is ${ex7.hB} m above the lowest point and at the lowest point.`,
      ul: [
        `Total energy at the start: m g h = ${ex7.m} × 9.8 × ${ex7.hA} = ${dec(ex7.EA / 1000, 3)} kJ (all potential).`,
        `Drop to the ${ex7.hB} m level: ${ex7.hA - ex7.hB} m. ½ m v² = m g (${ex7.hA - ex7.hB}), so v = √(2 × 9.8 × ${ex7.hA - ex7.hB}) = ${dec(ex7.vB, 4)} m/s.`,
        `Kinetic energy there = ½ × ${ex7.m} × ${dec(ex7.vB, 4)}² = ${dec(ex7.KB / 1000, 3)} kJ; potential energy = ${dec((ex7.m * g * ex7.hB) / 1000, 3)} kJ; the sum is ${dec(ex7.EA / 1000, 3)} kJ.`,
        `At the bottom: v = √(2 × 9.8 × ${ex7.hA}) = ${dec(ex7.vC, 4)} m/s, the same for any mass.`,
      ],
      v: V.bars,
      n: 'At the top the car has fifty eight point eight kilojoules, all potential. When it has dropped fifteen metres, the speed follows from g times the drop, giving about seventeen point one metres per second. Its kinetic energy is forty four point one kilojoules, and fourteen point seven kilojoules remain as potential energy. At the bottom, the speed is about nineteen point eight metres per second, whatever the mass of the car.',
    }),
    sl('check', 'Quick check: conservation of energy', {
      b: 'Choose the correct option.',
      v: V.bars,
      chk: 'cons-mcq',
      n: 'Ask which forces do work, and whether any of them is non-conservative.',
    }),
    sl('concept', 'The spring force and its potential energy', {
      b: 'For a spring that is stretched or compressed by $x$ from its natural length (Hooke’s law, within the elastic limit):',
      m: [r`F = -kx, \qquad U = \tfrac{1}{2}kx^2`],
      ul: [
        'The spring constant $k$ (N/m) measures stiffness; the force always points back towards the natural length.',
        r`The work needed to stretch from $0$ to $x$ is the area of the triangle under the F–x line: $\tfrac{1}{2} \cdot x \cdot kx$.`,
        'The stored energy depends on $x^2$, so a compression and a stretch of the same size store the same energy.',
        'It is stored as potential energy and given back when the spring returns to its natural length.',
      ],
      v: V.spring,
      n: 'A spring pushes or pulls back with a force proportional to its displacement from natural length. To stretch it by x, the work needed is the area of a triangle with base x and height k x, which is half k x squared. That is the stored potential energy. Because it depends on x squared, the same energy is stored whether the spring is stretched or compressed by the same amount.',
    }),
    sl('example', 'Worked example 8: energy stored in a spring', {
      b: `A spring of stiffness k = ${ex8.k} N/m is compressed by ${ex8.x} m. Find the force it exerts, the energy stored, and the extra work needed to compress it further to ${ex8.x2} m.`,
      ul: [
        `Force: F = kx = ${ex8.k} × ${ex8.x} = ${ex8.F} N, directed back towards the natural length.`,
        `Energy at ${ex8.x} m: ½ × ${ex8.k} × ${ex8.x}² = ${ex8.U1} J.`,
        `Energy at ${ex8.x2} m: ½ × ${ex8.k} × ${ex8.x2}² = ${ex8.U2} J.`,
        `Extra work = ${ex8.U2} − ${ex8.U1} = ${ex8.dU} J (more than the first ${ex8.x} m needed, because the force is larger).`,
      ],
      v: V.spring,
      n: 'At fifteen centimetres, the force is eight hundred times point one five, which is one hundred twenty newtons. The energy stored is one half times eight hundred times point one five squared, which is nine joules. At twenty five centimetres the energy is twenty five joules. So the extra work to go from fifteen to twenty five centimetres is sixteen joules, more than the first nine, because the force is bigger.',
    }),
    sl('concept', 'A block on a spring: energy changes form', {
      b: 'A block of mass $m$ on a frictionless table, attached to a spring and released from rest at displacement $A$:',
      m: [r`\tfrac{1}{2}kA^2 = \tfrac{1}{2}mv^2 + \tfrac{1}{2}kx^2`],
      ul: [
        'At $x = \\pm A$ all the energy is stored in the spring and $v = 0$.',
        'At $x = 0$ the spring is relaxed and all the energy is kinetic: the speed is greatest.',
        'In between, $K = E - U$; the sum stays constant because the spring force is conservative.',
      ],
      v: plotEs,
      n: 'Release the block from rest. At the extreme positions, all the energy is stored in the spring. As the block moves towards the centre, the stored energy falls and the kinetic energy rises by the same amount. At the centre, the spring is relaxed and the speed is greatest. The two curves always add up to the constant total.',
    }),
    sl('example', 'Worked example 9: block and spring', {
      b: `A ${ex9.m} kg block on a smooth table is attached to a spring of k = ${ex9.k} N/m and pulled ${ex9.A} m from its relaxed position, then released. Find its speed at the relaxed position and at ${ex9.x} m from it.`,
      ul: [
        `Total energy: E = ½ × ${ex9.k} × ${ex9.A}² = ${ex9.E} J.`,
        `At x = 0: ½ × ${ex9.m} × v² = ${ex9.E}, so v = √(2 × ${ex9.E}/${ex9.m}) = ${ex9.v0} m/s.`,
        `At x = ${ex9.x} m: U = ½ × ${ex9.k} × ${ex9.x}² = ${dec(ex9.U, 3)} J, so K = ${ex9.E} − ${dec(ex9.U, 3)} = ${dec(ex9.K, 3)} J.`,
        `v = √(2 × ${dec(ex9.K, 3)}/${ex9.m}) = ${dec(ex9.v, 3)} m/s.`,
      ],
      v: plotEs,
      n: 'The total energy is one half times two hundred times point one squared, which is one joule. At the centre, all of it is kinetic, so the speed is the square root of two times one divided by half a kilogram, which is two metres per second. At six centimetres, the spring still holds point three six joules, leaving point six four joules of kinetic energy, and a speed of one point six metres per second.',
    }),
    sl('example', 'Worked example 10: sliding down a rough slope', {
      b: `A ${ex10.m} kg block is released from rest at the top of a ${ex10.L} m slope inclined at ${ex10.th}° to the horizontal. A steady friction force of ${ex10.f} N acts along the slope (g = 9.8 m/s²). Find its speed at the bottom.`,
      ul: [
        `Height of the top above the bottom: ${ex10.L} sin ${ex10.th}° = ${dec(ex10.h, 3)} m.`,
        `Gravitational energy released: ${ex10.m} × 9.8 × ${dec(ex10.h, 3)} = ${dec(ex10.dU, 3)} J.`,
        `Work done by friction: −${ex10.f} × ${ex10.L} = ${ex10.Wf} J. The normal force does no work.`,
        `Energy ledger: K = ${dec(ex10.dU, 3)} − ${-ex10.Wf} = ${dec(ex10.K, 3)} J, so v = √(2 × ${dec(ex10.K, 3)}/${ex10.m}) = ${dec(ex10.v, 4)} m/s.`,
      ],
      v: Tledger,
      n: 'The block drops two point five metres, releasing forty nine joules of gravitational energy. Friction does minus twenty joules of work, which is turned into heat. The difference, twenty nine joules, is the kinetic energy at the bottom, and the speed is about five point four metres per second. Without friction the speed would have been seven metres per second.',
    }),
    sl('check', 'Quick check: spring energy', {
      b: 'Work out the energy or speed asked in the question.',
      v: plotU,
      chk: 'spring-num',
      n: 'Use one half k x squared, and remember the sign of x does not matter.',
    }),
    sl('concept', 'Power: the rate of doing work', {
      b: 'How fast energy is transferred or work is done:',
      m: [r`P_\text{av} = \dfrac{W}{t}, \qquad P = \dfrac{dW}{dt} = \vec F \cdot \vec v`],
      ul: [
        'SI unit: watt (W), 1 W = 1 J/s. Power is a scalar.',
        'A machine of larger power does the same work in less time; the work itself is the same.',
        'The kilowatt hour is a unit of **energy**, not of power: the energy used by a 1 kW appliance in one hour.',
        'Efficiency = useful output power ÷ input power.',
      ],
      v: Tpower,
      n: 'Power is the rate at which work is done, work divided by time, and its unit is the watt, one joule per second. At any instant, power equals force dot velocity. The kilowatt hour is a unit of energy, the energy used by one kilowatt in an hour, equal to three point six million joules. Remember: energy in kilowatt hours, power in kilowatts.',
    }),
    sl('concept', 'Power, force and speed', {
      b: r`When the force acts along the velocity, $P = Fv$. For an engine of fixed power the pull falls as the speed rises.`,
      m: [r`F = \dfrac{P}{v}`],
      ul: [
        'A vehicle climbing a slope must give a larger driving force, so it slows down if its engine power is fixed.',
        `At steady speed on a level road the driving force equals the resistive force: P = F v.`,
        `For a 30 kW engine: F = 6000 N at 5 m/s, 1500 N at 20 m/s and 750 N at 40 m/s.`,
      ],
      v: plotP,
      n: 'For a force along the velocity, power is force times speed. For an engine delivering a fixed power, the driving force is that power divided by the speed. At a low speed the force is large, which is why vehicles use low gears to start and to climb. At a high speed, the same engine gives a smaller force, and on a level road that equals the resistance.',
    }),
    sl('example', 'Worked example 11: a lift motor', {
      b: `A lift car and its load have a total mass of ${ex11.m} kg. It rises at a constant ${dec(ex11.v, 2)} m/s against a steady friction force of ${ex11.f} N in the guides (g = 9.8 m/s²). Find the power the motor must deliver, and the energy it supplies in ${ex11.t} s in kW h.`,
      ul: [
        `At constant speed the pull in the cable balances weight plus friction: F = ${ex11.m} × 9.8 + ${ex11.f} = ${ex11.F} N.`,
        `P = F v = ${ex11.F} × ${dec(ex11.v, 2)} = ${ex11.P} W (${dec(ex11.P / 1000, 4)} kW).`,
        `Energy in ${ex11.t} s: ${ex11.P} × ${ex11.t} = ${ex11.E} J.`,
        `In kW h: ${ex11.E}/(3.6 × 10⁶) = ${dec(ex11.kWh, 3)} kW h.`,
      ],
      v: plotP,
      n: 'The lift moves at a steady speed, so the cable pull equals the weight plus the friction, which is ten thousand three hundred twenty newtons. Multiply by the speed of two metres per second and the power is twenty thousand six hundred forty watts. In thirty seconds the motor supplies about six hundred nineteen thousand joules, which is only about point one seven two kilowatt hours.',
    }),
    sl('check', 'Quick check: power', {
      b: 'Compute the power or the time asked in the question.',
      v: plotP,
      chk: 'power-num',
      n: 'Use power equals force times velocity for steady motion, or work divided by time.',
    }),
    sl('concept', 'Collisions: elastic and inelastic', {
      b: 'In a collision the bodies exert large forces on each other for a short time. If no external force acts, **total momentum is conserved** in every collision.',
      ul: [
        '**Elastic:** kinetic energy is also conserved (the forces are conservative).',
        '**Inelastic:** some kinetic energy is changed into heat, sound or deformation.',
        '**Perfectly inelastic:** the bodies stick and move together; the loss of kinetic energy is the greatest.',
        'Total energy is always conserved; only the **kinetic** part is lost to other forms.',
      ],
      v: Tcoll,
      n: 'In a collision, with no external force, the total momentum is always conserved. In an elastic collision the kinetic energy is conserved as well. In an inelastic collision some kinetic energy turns into heat, sound or deformation. If the bodies stick together, the loss is the greatest possible. The total energy is never lost, only the kinetic part.',
    }),
    sl('concept', 'Elastic collisions in one dimension', {
      b: r`A body of mass $m_1$ at speed $u_1$ hits $m_2$ at rest. Conserving momentum and kinetic energy gives:`,
      m: [r`v_1 = \dfrac{m_1 - m_2}{m_1 + m_2}\,u_1, \qquad v_2 = \dfrac{2m_1}{m_1 + m_2}\,u_1`],
      ul: [
        'Equal masses: the first body stops and the second takes over its velocity.',
        'A heavy body hitting a light one keeps moving; the light one flies off faster than $u_1$.',
        'A light body hitting a heavy one at rest bounces back and the heavy one barely moves.',
      ],
      v: V.collel,
      n: 'Write the two conservation equations for a moving body hitting one at rest and solve them. The moving body ends with m one minus m two over the sum of the masses times its original speed. The target gets two m one over the sum. With equal masses, the first stops and the second moves off at the same speed, as in case A of the picture.',
    }),
    sl('example', 'Worked example 12: two trolleys', {
      b: `A ${ex12.m1} kg trolley moving at ${ex12.u1} m/s hits a ${ex12.m2} kg trolley at rest in an elastic collision on a straight track. Find their velocities afterwards and verify the conservation laws.`,
      ul: [
        `v₁ = (${ex12.m1} − ${ex12.m2})/(${ex12.m1} + ${ex12.m2}) × ${ex12.u1} = ${ex12.v1} m/s.`,
        `v₂ = 2 × ${ex12.m1}/(${ex12.m1} + ${ex12.m2}) × ${ex12.u1} = ${ex12.v2} m/s.`,
        `Momentum: before ${ex12.m1} × ${ex12.u1} = ${ex12.p} kg m/s; after ${ex12.m1} × ${ex12.v1} + ${ex12.m2} × ${ex12.v2} = ${R6(ex12.m1 * ex12.v1 + ex12.m2 * ex12.v2)} kg m/s.`,
        `Kinetic energy: before ½ × ${ex12.m1} × ${ex12.u1}² = ${ex12.K} J; after ½ × ${ex12.m1} × ${ex12.v1}² + ½ × ${ex12.m2} × ${ex12.v2}² = ${R6(ke(ex12.m1, ex12.v1) + ke(ex12.m2, ex12.v2))} J.`,
      ],
      v: V.collel,
      n: 'The heavy trolley slows from four to two metres per second and the light one shoots off at six metres per second. Momentum is twelve kilogram metres per second before and after. Kinetic energy is twenty four joules before, and six plus eighteen, again twenty four joules, after. Both conservation laws hold, as they must in an elastic collision.',
    }),
    sl('concept', 'Perfectly inelastic collisions', {
      b: 'The bodies stick together and move with a common velocity $V$:',
      m: [r`m_1u_1 + m_2u_2 = (m_1 + m_2)V`],
      ul: [
        'Only momentum conservation is used; the kinetic energy is not conserved.',
        r`The kinetic energy lost is $K_i - K_f$; it appears as heat, sound and deformation.`,
        'A ballistic pendulum uses this: the collision is inelastic, but the swing afterwards conserves mechanical energy.',
      ],
      v: V.collin,
      n: 'When two bodies stick together, one equation is enough: the total momentum before equals the total mass times the common velocity afterwards. The picture shows a thirty tonne wagon meeting a twenty tonne wagon at rest. They move off at one point two metres per second. Momentum is unchanged, but forty per cent of the kinetic energy has gone.',
    }),
    sl('example', 'Worked example 13: a bullet in a block', {
      b: `A bullet of mass ${ex13.m} kg moving horizontally at ${ex13.u} m/s embeds itself in a wooden block of mass ${ex13.M} kg hanging from long strings. Find the common speed, the height the block rises (g = 9.8 m/s²), and the fraction of kinetic energy lost.`,
      ul: [
        `Momentum: ${ex13.m} × ${ex13.u} = (${ex13.m} + ${ex13.M}) V, so V = ${ex13.m * ex13.u}/${ex13.m + ex13.M} = ${ex13.V} m/s.`,
        `After the impact energy is conserved: ½ V² = g h, so h = ${ex13.V}²/(2 × 9.8) = ${dec(ex13.h, 3)} m.`,
        `K before = ½ × ${ex13.m} × ${ex13.u}² = ${ex13.K0} J; K after = ½ × ${ex13.m + ex13.M} × ${ex13.V}² = ${ex13.K1} J.`,
        `Lost: ${ex13.lost} J, which is ${dec(ex13.frac, 3)} per cent of the initial kinetic energy.`,
      ],
      v: V.collin,
      n: 'First use momentum, since the impact is very short. Six kilogram metres per second shared among four kilograms gives one point five metres per second. Then use energy for the swing: the height is the speed squared over two g, about eleven point five centimetres. The kinetic energy falls from nine hundred joules to four point five joules, so almost all of it, ninety nine point five per cent, is lost.',
    }),
    sl('concept', 'Collisions in two dimensions', {
      b: 'Momentum is a vector, so each component is conserved separately (no external force):',
      m: [r`m_1u_{1x} + m_2u_{2x} = m_1v_{1x} + m_2v_{2x}, \qquad m_1u_{1y} + m_2u_{2y} = m_1v_{1y} + m_2v_{2y}`],
      ul: [
        'Two equations for the components, plus kinetic energy if the collision is elastic.',
        'Special case: **equal masses**, elastic, target at rest and a glancing hit. The first body leaves at an angle $\\theta$ and the target at $90^\\circ - \\theta$, so the paths are at **right angles**.',
        'The speeds are then $v\\cos\\theta$ and $v\\sin\\theta$.',
      ],
      v: V.coll2d,
      n: 'In two dimensions, momentum is conserved along each axis separately. If the masses are equal, the collision is elastic and the target is at rest, the two balls always separate at a right angle. If the first one leaves at an angle theta, its speed is v cosine theta, and the other, at ninety degrees minus theta, has speed v sine theta.',
    }),
    sl('example', 'Worked example 14: two carom coins', {
      b: `A coin of mass ${ex14.m} kg moving at ${ex14.v} m/s strikes an identical coin at rest in a glancing elastic collision. The first coin leaves at ${ex14.deg}° to its original line. Find the speeds after the collision and check the conservation laws.`,
      ul: [
        `The paths are at 90°, so the second coin leaves at ${90 - ex14.deg}° on the other side of the line.`,
        `v₁ = ${ex14.v} cos ${ex14.deg}° = ${dec(ex14.v1, 3)} m/s; v₂ = ${ex14.v} sin ${ex14.deg}° = ${dec(ex14.v2, 3)} m/s.`,
        `Momentum along the original line: ${ex14.m} × (${dec(ex14.v1, 3)} cos ${ex14.deg}° + ${dec(ex14.v2, 3)} cos ${90 - ex14.deg}°) = ${dec(ex14.m * (ex14.v1 * Math.cos((ex14.deg * Math.PI) / 180) + ex14.v2 * Math.sin((ex14.deg * Math.PI) / 180)), 3)} kg m/s, equal to ${ex14.m} × ${ex14.v} = ${dec(ex14.p, 3)}.`,
        `Kinetic energy: ½ × ${ex14.m} × ${dec(ex14.v1, 3)}² + ½ × ${ex14.m} × ${dec(ex14.v2, 3)}² = ${dec(ke(ex14.m, ex14.v1) + ke(ex14.m, ex14.v2), 3)} J = ½ × ${ex14.m} × ${ex14.v}² = ${dec(ex14.K, 3)} J.`,
      ],
      v: V.coll2d,
      n: 'Because the masses are equal and the collision is elastic, the second coin leaves at sixty degrees on the other side. The speeds are four times cosine thirty, about three point four six metres per second, and four times sine thirty, exactly two metres per second. The momentum along the original line is unchanged, and the kinetic energy of one point three six joules is the same before and after.',
    }),
    sl('check', 'Quick check: collisions', {
      b: 'Choose the correct option.',
      v: Tcoll,
      chk: 'coll-mcq',
      n: 'Decide first which quantities are conserved in this kind of collision.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Conservative force', 'Work independent of path; U with F = −dU/dx'],
          ['Gravitational and spring energy', 'U = m g h; U = ½ k x²'],
          ['Conservation of mechanical energy', 'K + U = constant when only conservative forces do work'],
          ['Non-conservative work', 'ΔK + ΔU = W(friction etc.), negative for friction'],
          ['Power', 'P = W/t = F · v; 1 kW h = 3.6 × 10⁶ J'],
          ['Collisions', 'Momentum always conserved; elastic: K conserved; stick together: greatest loss of K'],
        ],
        'Summary table of conservative forces, potential energy, conservation of energy, power and collisions',
      ),
      n: 'Remember the main results. A conservative force has a potential energy, and when only such forces do work the sum of kinetic and potential energy is constant. Friction takes energy away. Power is work per unit time, or force times velocity. In every collision momentum is conserved, but kinetic energy is conserved only when the collision is elastic.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Choose the zero of potential energy first; then write K + U on both sides.',
        'With friction, add the work of friction (negative) to the energy equation instead of using K + U = constant.',
        'Spring problems: use the displacement from the natural length, not the length of the spring.',
        'In a collision write momentum first; use kinetic energy only if the collision is stated to be elastic.',
        'Keep energy in joules and power in watts before comparing with kW h or hp.',
      ],
      v: Tcoll,
      n: 'Choose the zero of potential energy and write energy on both sides. If friction acts, include its negative work. In a spring problem, measure from the natural length. In a collision, always start with momentum, and bring in kinetic energy only if the collision is elastic. And convert to joules and watts before you compare with kilowatt hours or horse power.',
    }),
  ],
});
