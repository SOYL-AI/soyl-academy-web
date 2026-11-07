// ch04 Laws of Motion — two decks: Part 1 (t01–t02) Newton's laws, momentum, impulse, free-body problems and conservation of
// momentum; Part 2 (t03–t04) equilibrium, friction, uniform circular motion and vehicles on level and banked roads.
// Every number and every graph is computed here from stated data; narration is built from the same variables.
import { sl, deck, table, svgV, plot, r, dec, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, R6, rad, deg, integ, tablePulley, atwood, bankLimit } from './phys.mjs';
import * as G from './svgs.mjs';

const w3 = (x) => String(sig(x, 3));
const w2 = (x) => String(sig(x, 2));

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const cart = { m: 250, F: 400, T: 5 };
cart.a = cart.F / cart.m;
cart.v = cart.a * cart.T;
cart.p = cart.m * cart.v;
cart.rate = cart.p / cart.T;

const ball = { m: 0.16, u: 28, v: 35, t: 0.01 };
ball.J = ball.m * (ball.v + ball.u);
ball.F = ball.J / ball.t;
ball.peak = (2 * ball.J) / ball.t;
ball.pts = [[0, 0], [ball.t / 2, ball.peak], [ball.t, 0]];

const lift = { m: G.LIFT_DATA.m, a: G.LIFT_DATA.a };
lift.W = lift.m * g;
lift.up = lift.m * (g + lift.a);
lift.down = lift.m * (g - lift.a);

const pul = G.PULLEY_DATA; // m1 = 3 on a smooth table, m2 = 2 hanging
const atw = { m1: 3, m2: 5, ...atwood(3, 5) };

const gun = G.RECOIL_DATA;
gun.keB = 0.5 * gun.m * gun.v ** 2;
gun.keR = 0.5 * gun.M * gun.V ** 2;

const wag = { m1: 2.0e4, u1: 3.0, m2: 3.0e4 };
wag.V = (wag.m1 * wag.u1) / (wag.m1 + wag.m2);

const exp = { m: 6, u: 10, m1: 2, m2: 4, v1: -5 };
exp.v2 = (exp.m * exp.u + exp.m1 * 5) / exp.m2; // piece 1 goes west at 5 m/s
exp.p0 = exp.m * exp.u;
exp.keBefore = 0.5 * exp.m * exp.u ** 2;
exp.keAfter = 0.5 * exp.m1 * 5 ** 2 + 0.5 * exp.m2 * exp.v2 ** 2;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const rp = G.ROPES_DATA;
const blk = { m: 20, mus: 0.6, muk: 0.4 };
blk.N = blk.m * g;
blk.fmax = blk.mus * blk.N;
blk.fk = blk.muk * blk.N;
blk.F1 = 100;
blk.F2 = 130;
blk.a2 = (blk.F2 - blk.fk) / blk.m;
const inc = { ...G.INCL_DATA };
inc.mus = Math.tan(rad(inc.theta));
const inc2 = { theta: 40, muk: 0.35, mus: 0.5 };
inc2.a = g * (Math.sin(rad(inc2.theta)) - inc2.muk * Math.cos(rad(inc2.theta)));
inc2.tan = Math.tan(rad(inc2.theta));
const roll = { m: 30, slide: 0.4, wheels: 0.02, oil: 0.05 };
roll.W = roll.m * g;
const rough = { m1: 5, m2: 3, mu: 0.2, ...tablePulley(5, 3, 0.2) };
const whirl = { m: 0.25, r: 0.8, rev: 2, Tmax: 40 };
whirl.w = 2 * Math.PI * whirl.rev;
whirl.T = whirl.m * whirl.w ** 2 * whirl.r;
whirl.ac = whirl.w ** 2 * whirl.r;
whirl.vmax = Math.sqrt((whirl.Tmax * whirl.r) / whirl.m);
const lvl = { mu: G.ROAD_DATA.mu0, r: G.ROAD_DATA.r0, wet: 0.2 };
lvl.v = Math.sqrt(lvl.mu * g * lvl.r);
lvl.kmh = lvl.v * 3.6;
lvl.vw = Math.sqrt(lvl.wet * g * lvl.r);
lvl.kmhw = lvl.vw * 3.6;
const bk = { r: G.ROAD_DATA.r, theta: G.ROAD_DATA.theta, mu: G.ROAD_DATA.mu };
bk.v0 = Math.sqrt(bk.r * g * Math.tan(rad(bk.theta)));
bk.v0kmh = bk.v0 * 3.6;
bk.vmax = bankLimit(bk.theta, bk.mu, bk.r, 'max');
bk.vmaxkmh = bk.vmax * 3.6;
bk.tan = Math.tan(rad(bk.theta));

export const EX = { cart, ball, lift, pul, atw, gun, wag, exp, rp, blk, inc, inc2, roll, rough, whirl, lvl, bk };
export const NUMCHECK = {
  ballArea: integ((t) => (t < ball.t / 2 ? (2 * ball.peak * t) / ball.t : (2 * ball.peak * (ball.t - t)) / ball.t), 0, ball.t, 4000),
  cartP: cart.m * (cart.F / cart.m) * cart.T,
  gunP: gun.M * gun.V - gun.m * gun.v,
  expP: exp.m1 * -5 + exp.m2 * exp.v2 - exp.p0,
};

// ---------------------------------------------------------------- visuals
export const V = {
  pair: svgV(G.PAIR, 'Two blocks in contact on a smooth floor with free-body diagrams showing the equal and opposite contact forces on different bodies', 'Action and reaction act on different bodies, so they never cancel.'),
  incl: svgV(G.INCL, 'A block at rest on a rough slope with weight, normal reaction and friction balanced', 'Three forces, zero net force.'),
  pulley: svgV(G.PULLEY, 'A block on a smooth table joined over a pulley to a hanging block, with the forces on each', 'Same tension and same acceleration for both blocks.'),
  lift: svgV(G.LIFT, 'A person on a weighing scale in a lift accelerating up, moving steadily and accelerating down, with the scale readings', 'The scale reads the normal reaction, not the weight.'),
  ropes: svgV(G.ROPES, 'A lamp hung from two ropes with its force triangle closing on itself', 'Equilibrium: the force polygon closes.'),
  recoil: svgV(G.RECOIL, 'Rifle and bullet momenta equal and opposite after firing from rest', 'Total momentum stays zero.'),
  road: svgV(G.ROAD, 'A car on a level circular road with friction towards the centre, and a car on a banked road with weight, normal reaction and friction', 'The net force is horizontal and points to the centre.'),
  circ: svgV(G.CIRC, 'Uniform circular motion: tangent velocity arrows and centre-pointing acceleration arrows of equal lengths', 'Acceleration is at right angles to velocity.'),
};
const ax = (label, min, max) => ({ label, min, max });
export const plotP = plot(
  { x: ax('time t (s)', 0, 6), y: ax('momentum p (kg m/s)', 0, 2600), functions: [{ expr: `${cart.F}*x`, label: `p = ${cart.F} t (kg m/s): slope = F = ${cart.F} N`, domain: [0, 6] }], vlines: [{ x: cart.T, label: `t = ${cart.T} s: p = ${cart.p} kg m/s`, dashed: true }] },
  'Momentum against time for a cart pushed by a constant net force of 400 newtons: a straight line through the origin whose slope is the force, reaching 2000 kilogram metres per second at 5 seconds',
  'The slope of a momentum–time graph is the net force.',
);
export const plotImpulse = plot(
  { x: ax('time t (s)', 0, 0.012), y: ax('force F (N)', 0, 2400), series: [{ label: `bat force on the ball: area = impulse = ${w3(ball.J)} N s`, kind: 'line', points: ball.pts }] },
  'Force against time while a bat is in contact with a cricket ball for 10 milliseconds: a triangular pulse rising to 2016 newtons and falling to zero, whose area is the impulse of 10.08 newton seconds',
  'Area under an F–t graph = impulse = change of momentum.',
);
export const plotFric = plot(
  { x: ax('applied force F (N)', 0, 200), y: ax('friction f (N)', 0, 140), series: [{ label: `static (f = F), then kinetic (f = ${w3(blk.fk)} N)`, kind: 'line', points: [[0, 0], [blk.fmax, blk.fmax], [blk.fmax, blk.fk], [200, blk.fk]] }] },
  'Friction against applied force for a 20 kilogram crate: friction rises along the line f equals F up to the limiting value of 117.6 newtons, then drops to the constant kinetic value of 78.4 newtons once the crate slides',
  'Static friction adjusts to the push; kinetic friction is smaller and steady.',
);

// ---------------------------------------------------------------- tables
const T1 = table(
  ['Idea', 'Aristotle (wrong)', 'Galileo and Newton'],
  [
    ['What keeps a body moving?', 'A continuing force', 'Nothing: a body with no net force keeps its velocity'],
    ['What does a net force do?', 'Maintains the speed', 'Changes the velocity (an acceleration)'],
    ['Why does a pushed trolley stop?', 'The push ends', 'Friction, an unbalanced force, slows it'],
    ['Test case', 'Heavier things fall faster', 'On a frictionless slope the speed gained does not depend on mass'],
  ],
  'Table contrasting Aristotle’s idea that force is needed to keep a body moving with the Galileo and Newton view that force changes velocity',
);
const T2 = table(
  ['Situation', 'Kind of inertia', 'Reason'],
  [
    ['A coin on a card jumps up and drops into a glass when the card is flicked', 'Of rest', 'The coin stays where it was'],
    ['A bus turns left and standing passengers lean right', 'Of direction', 'Their bodies keep moving straight on'],
    ['Passengers lurch forward when a train brakes', 'Of motion', 'Their bodies keep the train’s earlier velocity'],
  ],
  'Table of three everyday situations, the kind of inertia involved and the reason',
);
const T3 = table(
  ['Force', 'Source', 'Direction'],
  [
    ['Weight W = m g', 'Gravitational pull of the Earth', 'Vertically down, from the centre of the body'],
    ['Normal reaction N', 'Contact, from a deformed surface', 'Perpendicular to the surface, away from it'],
    ['Tension T', 'A stretched string or rope', 'Along the string, pulling the body'],
    ['Friction f', 'Contact, between rough surfaces', 'Along the surface, opposing relative motion or its tendency'],
    ['Spring force', 'A stretched or compressed spring', 'Along the spring, towards its natural length'],
  ],
  'Table of the common forces in mechanics problems: weight, normal reaction, tension, friction and spring force, with their sources and directions',
);
const T4 = table(
  ['Lift is', 'Acceleration', 'Scale reading N', 'Compared with weight'],
  [
    ['Accelerating up', `${lift.a} m/s² up`, `${w3(lift.up)} N`, 'more'],
    ['Moving at steady speed or at rest', '0', `${w3(lift.W)} N`, 'equal'],
    ['Accelerating down', `${lift.a} m/s² down`, `${w3(lift.down)} N`, 'less'],
    ['Cable snaps (free fall)', `${g} m/s² down`, '0 N', 'apparent weightlessness'],
  ],
  `Table of the weighing-scale reading of a ${lift.m} kilogram person in a lift for four motions`,
);
const T5 = table(
  ['Set-up', 'Acceleration', 'Tension'],
  [
    ['Block m₁ on a smooth table, m₂ hanging', 'a = m₂ g/(m₁ + m₂)', 'T = m₁ m₂ g/(m₁ + m₂)'],
    ['Same, with friction coefficient μ on the table', 'a = (m₂ − μ m₁) g/(m₁ + m₂)', 'T = m₁ (a + μ g)'],
    ['Atwood machine (m₂ > m₁)', 'a = (m₂ − m₁) g/(m₁ + m₂)', 'T = 2 m₁ m₂ g/(m₁ + m₂)'],
  ],
  'Table of the acceleration and string tension for two blocks over a pulley: on a smooth table, with table friction, and the Atwood machine',
);
const T5b = table(
  ['Quantity', 'Value'],
  [['Heavier mass m₂', `${atw.m2} kg`], ['Lighter mass m₁', `${atw.m1} kg`], ['Acceleration (m₂ − m₁) g/(m₁ + m₂)', `${w3(atw.a)} m/s²`], ['Tension 2 m₁ m₂ g/(m₁ + m₂)', `${w3(atw.T)} N`], ['Check on the lighter mass: m₁ (g + a)',`${w3(atw.m1 * (g + atw.a))} N`]],
  'Table of the numbers for an Atwood machine with 3 and 5 kilogram masses: acceleration and tension, with a consistency check on the lighter mass',
);
const T6 = table(
  ['', 'Before the explosion', 'After the explosion'],
  [
    ['Body 1 (2 kg)', 'part of 6 kg moving east at 10 m/s', `moves west at 5 m/s: p = ${2 * -5} kg m/s`],
    ['Body 2 (4 kg)', 'part of 6 kg', `moves east at ${w3(exp.v2)} m/s: p = ${w3(exp.m2 * exp.v2)} kg m/s`],
    ['Total momentum', `${exp.p0} kg m/s`, `${w3(exp.m1 * -5 + exp.m2 * exp.v2)} kg m/s (conserved)`],
    ['Kinetic energy', `${w3(exp.keBefore)} J`, `${w3(exp.keAfter)} J (not conserved: chemical energy released)`],
  ],
  'Table for a 6 kilogram firework moving east at 10 metres per second that bursts into 2 and 4 kilogram parts: momentum is conserved but kinetic energy increases',
);
const T7 = table(
  ['Law of friction', 'Statement'],
  [
    ['Limiting friction', 'The largest static friction, f_s(max) = μ_s N, acts just before sliding starts'],
    ['Static friction', 'f_s ≤ μ_s N: it adjusts to the applied force, up to the limit'],
    ['Kinetic friction', 'f_k = μ_k N, nearly constant, and usually smaller than the limiting value (μ_k < μ_s)'],
    ['Contact area', 'To a good approximation f does not depend on the apparent area of contact'],
    ['Normal reaction', 'f is proportional to N, the normal reaction (not always equal to the weight)'],
  ],
  'Table of the laws of friction: limiting, static and kinetic friction, contact area and dependence on the normal reaction',
);
const T8 = table(
  ['Sliding the suitcase', 'Coefficient used', 'Force to move it steadily'],
  [
    ['Dragged on its side', `μ = ${roll.slide}`, `${w3(roll.slide * roll.W)} N`],
    ['On a lubricated sliding surface', `μ = ${roll.oil}`, `${w3(roll.oil * roll.W)} N`],
    ['Rolling on its wheels', `μ_r = ${roll.wheels}`, `${w3(roll.wheels * roll.W)} N`],
  ],
  `Table of the horizontal force needed to move a ${roll.m} kilogram suitcase steadily when dragged, on a lubricated surface and on wheels, using illustrative stated coefficients`,
);
const T9 = table(
  ['Push F (N)', 'Does it move?', 'Friction f (N)', 'Acceleration (m/s²)'],
  [
    [String(blk.F1), `No: ${blk.F1} < ${w3(blk.fmax)}`, `${blk.F1} (static, f = F)`, '0'],
    [String(blk.F2), `Yes: ${blk.F2} > ${w3(blk.fmax)}`, `${w3(blk.fk)} (kinetic)`, w3(blk.a2)],
  ],
  `Table for a ${blk.m} kilogram crate with μ_s = ${blk.mus} and μ_k = ${blk.muk}: pushes of ${blk.F1} and ${blk.F2} newtons, whether it moves, the friction and the acceleration`,
);
const T10 = table(
  ['Road', 'Condition', 'Speed'],
  [
    ['Level, friction only', 'f = μ N = m v²/r', 'v max = √(μ r g)'],
    ['Banked, no friction', 'N sin θ = m v²/r, N cos θ = m g', 'v = √(r g tan θ)'],
    ['Banked, with friction (fastest)', 'friction acts down the slope', 'v max = √(r g (μ + tan θ)/(1 − μ tan θ))'],
    ['Banked, with friction (slowest)', 'friction acts up the slope', 'v min = √(r g (tan θ − μ)/(1 + μ tan θ)), if tan θ > μ'],
  ],
  'Table of the limiting speeds of a vehicle on a level road, on a banked road without friction and on a banked road with friction',
);
const T11 = table(
  ['Quantity', 'Formula', 'Value'],
  [
    ['Angular speed ω', '2π × revolutions per second', `${w3(whirl.w)} rad/s`],
    ['Centripetal acceleration', 'ω² r', `${w3(whirl.ac)} m/s²`],
    ['Tension for m = 0.25 kg, r = 0.80 m', 'm ω² r', `${w3(whirl.T)} N`],
    ['Fastest speed if the string can bear 40 N', '√(T r/m)', `${w3(whirl.vmax)} m/s`],
  ],
  'Table for a 0.25 kilogram stone whirled on a smooth table with a 0.80 metre string at two revolutions per second: angular speed, centripetal acceleration, tension and the fastest speed for a 40 newton string',
);

export const TABLES = { T1, T2, T3, T4, T5, T5b, T6, T7, T8, T9, T10, T11 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Laws of Motion — Part 1: Newton’s laws, momentum and impulse, conservation of momentum',
  goals: [
    'State Newton’s three laws and use F = dp/dt and impulse = change of momentum',
    'Draw free-body diagrams and solve lift and connected-body problems',
    'Apply conservation of linear momentum to recoil, explosions and sticking collisions',
  ],
  slides: [
    sl('title', 'Laws of Motion', {
      b: 'Part 1 — what force does to motion, and why momentum is conserved.',
      v: V.pair,
      n: 'Why does a heavy trolley need a long push to get moving, and why does a rifle kick back when it fires? In this part we state the three laws of motion, measure the effect of a force by the change of momentum it causes, draw free-body diagrams, and see that the total momentum of an isolated system never changes.',
    }),
    sl('concept', 'Force, inertia and the first law', {
      b: 'Aristotle thought a force is needed to **keep** a body moving. Galileo and Newton showed it is needed to **change** the motion.',
      ul: [
        '**First law:** a body stays at rest or in uniform motion along a straight line unless a net external force acts on it.',
        '**Inertia** is this reluctance to change velocity; its measure is the **mass**.',
        'The law defines **inertial frames**: frames in which a force-free body does not accelerate. The ground is nearly one; an accelerating bus is not.',
        'In a non-inertial frame a free body seems to accelerate with no force acting.',
      ],
      v: T1,
      n: 'A rolling ball slows down only because friction acts on it. Take friction away and it would roll for ever. So the first law says a body keeps its velocity unless a net external force acts, and it tells us what an inertial frame is: a frame in which a force-free body does not accelerate. A bus that is speeding up is not such a frame.',
    }),
    sl('concept', 'Momentum and the second law', {
      b: r`The **momentum** of a body is $\vec p = m\vec v$. Newton's second law says the net force is the rate of change of momentum.`,
      m: [r`\vec F_\text{net} = \dfrac{d\vec p}{dt}`, r`\vec F = m\vec a \quad (m \text{ constant})`],
      ul: [
        'Unit of force: newton, 1 N = 1 kg m s⁻²; unit of momentum: kg m s⁻¹.',
        'The law is a vector law: it holds along each axis separately, $F_x = ma_x$, $F_y = ma_y$.',
        'With zero net force the momentum does not change: the first law is the special case, but it also tells us where the law holds.',
        r`$F = dp/dt$ is the general form: it also covers a body whose mass changes.`,
      ],
      v: plotP,
      n: `The momentum of a body is its mass times its velocity. The second law says that the net force equals the rate at which momentum changes. For a body of constant mass this becomes force equals mass times acceleration. On this graph the cart's momentum grows by ${cart.F} kilogram metres per second every second, so the slope of the line is the net force of ${cart.F} newtons.`,
    }),
    sl('example', 'Worked example 1: pushing a cart', {
      b: r`A loaded cart of mass ${cart.m} kg, initially at rest, is pushed by a net horizontal force of ${cart.F} N for ${cart.T} s. Find its acceleration, its final speed and its final momentum, and check $F = \Delta p/\Delta t$.`,
      ul: [
        r`$a = \dfrac{F}{m} = \dfrac{${cart.F}}{${cart.m}} = ${w3(cart.a)}$ m s$^{-2}$.`,
        r`$v = at = ${w3(cart.a)} \times ${cart.T} = ${w3(cart.v)}$ m s$^{-1}$.`,
        r`$p = mv = ${cart.m} \times ${w3(cart.v)} = ${w3(cart.p)}$ kg m s$^{-1}$.`,
        r`$\dfrac{\Delta p}{\Delta t} = \dfrac{${w3(cart.p)} - 0}{${cart.T}} = ${w3(cart.rate)}$ N, equal to $F$.`,
      ],
      v: plotP,
      n: `The acceleration is ${cart.F} divided by ${cart.m}, which is ${w3(cart.a)} metres per second squared. After ${cart.T} seconds the speed is ${w3(cart.v)} metres per second and the momentum is ${w3(cart.p)} kilogram metres per second. Dividing that gain of momentum by the time gives ${w3(cart.rate)} newtons, the force we started with.`,
    }),
    sl('concept', 'Impulse', {
      b: r`When a large force acts for a very short time, as in a bat hitting a ball, we use the **impulse**.`,
      m: [r`\vec J = \int_{t_1}^{t_2} \vec F\, dt = \Delta \vec p`, r`\vec F_\text{av} = \dfrac{\Delta \vec p}{\Delta t}`],
      ul: [
        'Impulse is the **area under the F–t graph**; its unit, N s, equals kg m s⁻¹.',
        'The same change of momentum with a **longer** contact time needs a **smaller** average force: foam pits, cricketers drawing their hands back, car crumple zones.',
        'Impulse is a vector: it points along the change of momentum, not along the old velocity.',
      ],
      v: plotImpulse,
      n: 'The impulse of a force is the area under its force against time graph, and it equals the change of momentum it produces. When the contact time is very short the force can be enormous, so we work with the impulse and the average force. Stretching the same impulse over a longer time lowers the average force, which is why a soft landing hurts less.',
    }),
    sl('example', 'Worked example 2: a cricket ball hit back', {
      b: r`A ${ball.m} kg ball reaches a bat at ${ball.u} m s$^{-1}$ and leaves it in the opposite direction at ${ball.v} m s$^{-1}$. The contact lasts ${ball.t * 1000} ms. Find the impulse and the average force.`,
      ul: [
        r`Take the outgoing direction as positive: $\Delta p = ${ball.m}\,[${ball.v} - (-${ball.u})] = ${ball.m} \times ${ball.v + ball.u} = ${w3(ball.J)}$ kg m s$^{-1}$.`,
        r`Impulse $J = \Delta p = ${w3(ball.J)}$ N s.`,
        r`$F_\text{av} = \dfrac{J}{\Delta t} = \dfrac{${w3(ball.J)}}{${ball.t}} = ${w3(ball.F)}$ N.`,
        r`For a triangular pulse the peak force is $2F_\text{av} = ${w3(ball.peak)}$ N.`,
      ],
      v: plotImpulse,
      n: `Because the ball reverses, the speeds add: ${ball.u} plus ${ball.v} is ${ball.u + ball.v} metres per second. Multiplying by the mass ${ball.m} gives an impulse of ${w3(ball.J)} newton seconds. Dividing by the contact time of ${ball.t} seconds gives an average force of ${w3(ball.F)} newtons. If the force pulse is triangular, its peak is twice that, ${w3(ball.peak)} newtons.`,
    }),
    sl('check', 'Quick check: the bus frame', {
      b: 'Choose the correct option.',
      v: T2,
      chk: 'bus-mcq',
      n: 'Think about which frame is inertial and what a free object does in a frame that is itself accelerating.',
    }),
    sl('concept', 'The third law', {
      b: '**Third law:** to every action there is an equal and opposite reaction: forces always occur in pairs.',
      ul: [
        r`If body A exerts $\vec F_{AB}$ on B, then B exerts $\vec F_{BA} = -\vec F_{AB}$ on A.`,
        'The two forces act on **different bodies**, so they never cancel in a free-body diagram of one body.',
        'They are of the same kind, appear and vanish together, and hold for contact forces and for forces at a distance.',
        'A body’s weight and the normal reaction on it are **not** a third-law pair: they act on the same body.',
      ],
      v: V.pair,
      n: `A hand pushes block A, and A pushes block B. The force of A on B and the force of B on A are equal and opposite, ${w3(G.PAIR_DATA.F)} newtons each, but they act on different blocks. So block A feels the push of ${G.PAIR_DATA.P} newtons minus ${w3(G.PAIR_DATA.F)} newtons, and block B feels only ${w3(G.PAIR_DATA.F)} newtons. Both accelerate at ${G.PAIR_DATA.a} metres per second squared.`,
    }),
    sl('concept', 'Free-body diagrams and common forces', {
      b: 'A **free-body diagram** (FBD) shows one body and only the forces acting **on** it.',
      ul: [
        'Choose the body; draw it as a dot or box; draw every force **on** it with its direction.',
        'Choose axes (along and across the motion); resolve forces; write $\\sum F = ma$ along each axis.',
        'Bodies joined by a taut string have the same speed and acceleration along the string; a light string has the same tension throughout.',
        'Solve the equations, then check the answer: units, signs and limiting cases.',
      ],
      v: T3,
      n: 'Pick one body at a time and draw only the forces that act on it: its weight, the normal reaction of any surface touching it, the tension of any string, and friction. Then choose axes, split each force into components, and write the second law along each axis. A light string has the same tension all along it, and a taut string makes joined bodies share one acceleration.',
    }),
    sl('example', 'Worked example 3: a person in a lift', {
      b: r`A ${lift.m} kg person stands on a weighing scale in a lift. Find the scale reading when the lift accelerates up at ${lift.a} m s$^{-2}$, moves steadily, accelerates down at ${lift.a} m s$^{-2}$, and when the cable snaps. Take $g = ${g}$ m s$^{-2}$.`,
      ul: [
        r`Up positive: $N - mg = ma$, so $N = m(g + a)$.`,
        r`Up: $N = ${lift.m}(${g} + ${lift.a}) = ${w3(lift.up)}$ N; steady: $N = mg = ${w3(lift.W)}$ N.`,
        r`Down: $N = m(g - a) = ${lift.m}(${g} - ${lift.a}) = ${w3(lift.down)}$ N.`,
        r`Free fall: $a = g$, so $N = 0$: apparent weightlessness.`,
      ],
      v: V.lift,
      n: `The scale reads the normal reaction, not the weight. Accelerating upward the reaction must exceed the weight by mass times acceleration, so it reads ${w3(lift.up)} newtons. At steady speed it reads the weight, ${w3(lift.W)} newtons. Accelerating downward it reads ${w3(lift.down)} newtons. If the cable snaps the lift and person fall together and the reading drops to zero.`,
    }),
    sl('check', 'Quick check: a lift that slows', {
      b: 'Choose the correct option.',
      v: V.lift,
      chk: 'lift-mcq',
      n: 'Decide the direction of the acceleration first, then compare the scale reading with the weight.',
    }),
    sl('concept', 'Blocks and strings', {
      b: 'For bodies joined by a light string over a smooth pulley, write the second law for **each** body and add the condition that they share one acceleration.',
      ul: [
        r`Block $m_1$ on a smooth table, $m_2$ hanging: $T = m_1 a$ and $m_2 g - T = m_2 a$.`,
        r`Adding: $a = \dfrac{m_2 g}{m_1 + m_2}$ and $T = \dfrac{m_1 m_2 g}{m_1 + m_2}$.`,
        r`Atwood machine, $m_2 > m_1$: $a = \dfrac{(m_2 - m_1)g}{m_1 + m_2}$, $T = \dfrac{2 m_1 m_2 g}{m_1 + m_2}$.`,
        'Check: T is less than the weight of the hanging body, and a is less than g.',
      ],
      v: T5,
      n: 'Write the second law once for each block. For a block on a smooth table the tension is the only horizontal force; for the hanging block the weight minus the tension gives the net force. Adding the two equations removes the tension and gives the shared acceleration. For an Atwood machine the lighter mass rises while the heavier falls with the same acceleration.',
    }),
    sl('example', 'Worked example 4: table and hanging block', {
      b: r`A ${pul.m1} kg block on a smooth table is joined by a light string over a smooth pulley to a ${pul.m2} kg block hanging from the edge. Find the acceleration and the tension. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`Hanging block: $m_2 g - T = m_2 a$; table block: $T = m_1 a$.`,
        r`$a = \dfrac{m_2 g}{m_1 + m_2} = \dfrac{${pul.m2} \times ${g}}{${pul.m1 + pul.m2}} = ${w3(pul.a)}$ m s$^{-2}$.`,
        r`$T = m_1 a = ${pul.m1} \times ${w3(pul.a)} = ${w3(pul.T)}$ N.`,
        r`Check on the hanging block: $${w3(pul.m2 * g)} - ${w3(pul.T)} = ${w3(pul.m2 * g - pul.T)}$ N $= ${pul.m2} \times ${w3(pul.a)}$.`,
      ],
      v: V.pulley,
      n: `Both blocks share the acceleration. The hanging block gives weight minus tension equals mass times acceleration, and the table block gives tension equals mass times acceleration. Adding them, the acceleration is ${pul.m2} times ${g} divided by ${pul.m1 + pul.m2}, which is ${w3(pul.a)} metres per second squared. The tension is ${pul.m1} times that, ${w3(pul.T)} newtons, smaller than the hanging weight of ${w3(pul.m2 * g)} newtons.`,
    }),
    sl('example', 'Worked example 5: an Atwood machine', {
      b: r`Masses ${atw.m1} kg and ${atw.m2} kg hang from the two ends of a light string over a smooth pulley. Find the acceleration and the tension. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`$a = \dfrac{(m_2 - m_1)g}{m_1 + m_2} = \dfrac{(${atw.m2} - ${atw.m1}) \times ${g}}{${atw.m1 + atw.m2}} = ${w3(atw.a)}$ m s$^{-2}$.`,
        r`$T = m_1(g + a) = ${atw.m1} \times (${g} + ${w3(atw.a)}) = ${w3(atw.T)}$ N.`,
        r`Check with the heavier mass: $T = m_2(g - a) = ${atw.m2} \times ${w3(g - atw.a)} = ${w3(atw.m2 * (g - atw.a))}$ N.`,
      ],
      v: T5b,
      n: `The difference of the masses, ${atw.m2 - atw.m1} kilograms, drives the motion of the total ${atw.m1 + atw.m2} kilograms, so the acceleration is ${w3(atw.a)} metres per second squared, a quarter of g. The tension is ${w3(atw.T)} newtons. We can confirm it from either mass: the lighter one gives mass times g plus a, the heavier one gives mass times g minus a, and both agree.`,
    }),
    sl('concept', 'Conservation of linear momentum', {
      b: r`For a system of bodies, the internal forces occur in third-law pairs, so their impulses cancel. Only external forces change the total momentum.`,
      m: [r`\vec F_\text{ext} = \dfrac{d\vec P}{dt}`, r`\vec F_\text{ext} = 0 \;\Rightarrow\; \vec P = m_1\vec v_1 + m_2 \vec v_2 + \dots = \text{constant}`],
      ul: [
        'The law holds along each axis separately: if no external force acts along x, the total $P_x$ is constant.',
        'It holds during a very short interaction (a collision, an explosion), when the external forces are small compared with the internal forces.',
        'Recoil: a system starting at rest has total momentum zero, so the parts move off with equal and opposite momenta.',
      ],
      v: V.recoil,
      n: 'Inside a system the forces come in equal and opposite pairs, so their effects cancel when we add up the momentum of the whole system. Only a net external force can change the total. A rifle and its bullet start at rest, with zero momentum, so after firing the two momenta must be equal and opposite, and the heavy rifle moves back slowly while the light bullet goes forward fast.',
    }),
    sl('example', 'Worked example 6: recoil of a rifle', {
      b: r`A rifle of mass ${gun.M} kg fires a ${gun.m * 1000} g bullet at ${gun.v} m s$^{-1}$ (relative to the ground). Find the recoil speed of the rifle and compare the kinetic energies.`,
      ul: [
        r`Momentum before $= 0$, so $M V = m v$.`,
        r`$V = \dfrac{mv}{M} = \dfrac{${gun.m} \times ${gun.v}}{${gun.M}} = ${w3(gun.V)}$ m s$^{-1}$, backwards.`,
        r`$K_\text{bullet} = \tfrac{1}{2} m v^2 = ${w3(gun.keB)}$ J and $K_\text{rifle} = \tfrac{1}{2} M V^2 = ${w3(gun.keR)}$ J.`,
        r`The momenta are equal in size, but the lighter body carries the larger kinetic energy: the ratio is $M/m = ${w3(gun.M / gun.m)}$.`,
      ],
      v: V.recoil,
      n: `The bullet's momentum is ${gun.m} times ${gun.v}, which is ${w3(gun.p)} kilogram metres per second. The rifle must have the same momentum backwards, so its speed is ${w3(gun.p)} divided by ${gun.M}, which is ${w3(gun.V)} metres per second. The bullet carries ${w3(gun.keB)} joules of kinetic energy against only ${w3(gun.keR)} for the rifle.`,
    }),
    sl('concept', 'Explosions and sticking collisions', {
      b: 'In an explosion or a collision the total momentum is the same just before and just after, but the **kinetic energy** is not.',
      ul: [
        '**Explosion:** one body breaks into parts; internal energy is released, so kinetic energy increases.',
        '**Perfectly inelastic collision:** the bodies move off together, $m_1 u_1 + m_2 u_2 = (m_1 + m_2)V$; kinetic energy is lost.',
        'A shell or firework bursting in flight: the centre of mass keeps its path, and momentum is conserved in each direction.',
        'Always choose a positive direction first and give each velocity its sign.',
      ],
      v: T6,
      n: `A firework of ${exp.m} kilograms moving east at ${exp.u} metres per second bursts into a ${exp.m1} kilogram piece that goes west at 5 metres per second and a ${exp.m2} kilogram piece. Momentum before is ${exp.p0} kilogram metres per second, so the second piece moves east at ${w3(exp.v2)} metres per second. Momentum is conserved, but the kinetic energy rises from ${w3(exp.keBefore)} to ${w3(exp.keAfter)} joules.`,
    }),
    sl('example', 'Worked example 7: coupling two wagons', {
      b: r`A goods wagon of mass $${w3(wag.m1)}$ kg moves at ${wag.u1} m s$^{-1}$ along a level track and couples with a stationary wagon of mass $${w3(wag.m2)}$ kg. Find their common speed. Is kinetic energy conserved?`,
      ul: [
        r`No external horizontal force acts during the coupling: $m_1 u_1 = (m_1 + m_2) V$.`,
        r`$V = \dfrac{${w3(wag.m1)} \times ${wag.u1}}{${w3(wag.m1 + wag.m2)}} = ${w3(wag.V)}$ m s$^{-1}$.`,
        r`$K_\text{before} = \tfrac{1}{2}(${w3(wag.m1)})(${wag.u1})^2 = ${w3(0.5 * wag.m1 * wag.u1 ** 2)}$ J, $K_\text{after} = \tfrac{1}{2}(${w3(wag.m1 + wag.m2)})(${w3(wag.V)})^2 = ${w3(0.5 * (wag.m1 + wag.m2) * wag.V ** 2)}$ J.`,
        'Kinetic energy is not conserved: the difference goes into sound, heat and deformation of the couplers.',
      ],
      v: T6,
      n: `Momentum before is ${w3(wag.m1)} times ${wag.u1}, or ${w3(wag.m1 * wag.u1)} kilogram metres per second. After coupling the same momentum is shared by ${w3(wag.m1 + wag.m2)} kilograms, so the speed is ${w3(wag.V)} metres per second. The kinetic energy falls from ${w3(0.5 * wag.m1 * wag.u1 ** 2)} to ${w3(0.5 * (wag.m1 + wag.m2) * wag.V ** 2)} joules, the rest going into heat, sound and bending of the couplers.`,
    }),
    sl('check', 'Quick check: recoil', {
      b: 'Choose the correct option.',
      v: V.recoil,
      chk: 'skater-mcq',
      n: 'The system starts at rest, so its total momentum is zero. Which quantity must therefore be equal in the two parts?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'The laws of motion in one page.',
      ul: [
        '**First law:** no net force, no change of velocity; it defines inertial frames. Mass measures inertia.',
        r`**Second law:** $\vec F = d\vec p/dt$, which is $m\vec a$ for constant mass; 1 N = 1 kg m s⁻².`,
        r`**Impulse:** $J = \int F\,dt = \Delta p$, the area under the F–t graph.`,
        '**Third law:** equal and opposite forces on **different** bodies.',
        r`**Isolated system:** $\sum \vec p$ is constant; recoil gives equal and opposite momenta; kinetic energy is not conserved in explosions or sticking collisions.`,
      ],
      v: V.pair,
      n: 'To sum up. A net force changes momentum at a rate equal to the force. Impulse is the area under the force against time graph and equals the change of momentum. Third-law forces are equal and opposite and act on different bodies. When no external force acts, the total momentum of a system stays constant, but kinetic energy need not.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      b: 'Marks are lost on these.',
      ul: [
        'Draw the free-body diagram first, one body at a time, with only forces **on** that body.',
        'Do not call weight and the normal reaction an action–reaction pair.',
        'Give momenta and velocities signs; a rebound means the velocity changes sign, so the speeds add in $\\Delta p$.',
        'In a lift problem state the direction of the acceleration; the scale reads N, not mg.',
        'Say clearly that momentum is conserved only if the **external** force is zero (or negligible during the collision).',
      ],
      v: V.lift,
      n: 'Examiners look for four habits. Draw the free-body diagram before writing any equation. Never treat weight and the normal reaction as a third-law pair. Give every velocity a sign, so that a rebound is handled correctly. And when you use conservation of momentum, say why the external force can be ignored.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Laws of Motion — Part 2: Equilibrium, friction and circular motion',
  goals: [
    'Solve equilibrium problems for concurrent forces by resolving or by the force polygon',
    'Apply the laws of static, kinetic and rolling friction, including on an incline',
    'Find centripetal force and the limiting speed of a vehicle on a level or banked road',
  ],
  slides: [
    sl('title', 'Equilibrium, Friction and Circular Motion', {
      b: 'Part 2 — when forces balance, when surfaces grip, and how a car takes a bend.',
      v: V.ropes,
      n: 'A lamp hangs motionless from two ropes, a crate refuses to budge until you push hard enough, and a car stays on the road round a bend. All three are applications of the second law. In this part we treat balanced forces, then friction, then the force that turns a velocity round a circle.',
    }),
    sl('concept', 'Equilibrium of concurrent forces', {
      b: r`A particle is in **equilibrium** when the vector sum of the forces on it is zero, so $\vec a = 0$.`,
      m: [r`\sum \vec F = 0 \;\Rightarrow\; \sum F_x = 0,\;\; \sum F_y = 0`],
      ul: [
        'Concurrent forces are forces whose lines of action pass through one point.',
        'Three forces in equilibrium, drawn tip to tail, form a **closed triangle**; any closed polygon works for more forces.',
        'In practice: resolve every force along two perpendicular axes and balance each set of components.',
        'Equilibrium means $a = 0$: the body may be at rest or moving with constant velocity.',
      ],
      v: V.ropes,
      n: 'A particle is in equilibrium when the vector sum of the forces on it is zero. Drawn tip to tail, the forces make a closed polygon, a triangle for three forces. In practice we resolve every force into horizontal and vertical components and make each set add to zero. Equilibrium does not mean at rest, only that the acceleration is zero.',
    }),
    sl('example', 'Worked example 8: a lamp on two ropes', {
      b: r`A ${rp.m} kg lamp hangs from a knot held by two ropes making ${rp.a1}° and ${rp.a2}° with the horizontal ceiling. Find the tension in each rope. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`Weight $W = mg = ${rp.m} \times ${g} = ${w3(rp.W)}$ N.`,
        r`Horizontal: $T_1\cos ${rp.a1}^\circ = T_2 \cos ${rp.a2}^\circ$. Vertical: $T_1 \sin ${rp.a1}^\circ + T_2 \sin ${rp.a2}^\circ = W$.`,
        r`The ropes are at right angles, so $T_1 = W\sin ${rp.a1}^\circ = ${w3(rp.T1)}$ N and $T_2 = W \sin ${rp.a2}^\circ = ${w3(rp.T2)}$ N.`,
        r`Check: $T_1 + T_2 = ${w3(rp.T1 + rp.T2)}$ N is larger than $W = ${w3(rp.W)}$ N, as it must be when the ropes are not vertical.`,
      ],
      v: V.ropes,
      n: `The weight is ${w3(rp.W)} newtons. Balancing horizontal components and then vertical components gives two equations in the two tensions. Because the ropes are at right angles to each other, the answers are simple: ${w3(rp.T1)} newtons in the rope at ${rp.a1} degrees and ${w3(rp.T2)} newtons in the rope at ${rp.a2} degrees. Together they exceed the weight, as they must, since the ropes are not vertical.`,
    }),
    sl('concept', 'Friction: static, limiting and kinetic', {
      b: 'Friction is the contact force along the surfaces that opposes relative motion, or the **tendency** to move.',
      ul: [
        r`**Static friction** $f_s$ matches the applied force while the body stays at rest: $f_s \le \mu_s N$.`,
        r`**Limiting friction** $f_s(\max) = \mu_s N$, just before sliding begins.`,
        r`**Kinetic friction** $f_k = \mu_k N$ once sliding, usually with $\mu_k < \mu_s$ and nearly constant.`,
        r`$\mu$ is a pure number; N is the normal reaction.`,
      ],
      v: plotFric,
      n: `Push a crate gently and nothing happens: static friction equals your push. It can grow only up to the limiting value, ${w3(blk.fmax)} newtons for this crate. Push harder and the crate starts to slide, and the friction drops to the kinetic value of ${w3(blk.fk)} newtons, which then stays nearly constant whatever the speed.`,
    }),
    sl('concept', 'Laws of friction', {
      b: 'Friction follows simple empirical rules that hold to a good approximation for dry surfaces.',
      ul: [
        r`$f$ depends on the **nature** of the two surfaces (through $\mu$) and on the normal reaction N.`,
        'It does not depend, to a first approximation, on the **apparent area** of contact: the real contact is at tiny points that adjust with pressure.',
        r`The angle of friction $\lambda$ satisfies $\tan\lambda = \mu_s$; a body on a plane inclined at the **angle of repose** just begins to slide.`,
        'N is not always mg: with a pull or push at an angle, N changes.',
      ],
      v: T7,
      n: 'Friction depends on the two surfaces through the coefficient of friction and on the normal reaction, but not, to a good approximation, on the apparent area of contact. Be careful with the normal reaction: it equals the weight only on a level surface with no vertical push or pull. A pull at an angle changes it, and so does an incline.',
    }),
    sl('example', 'Worked example 9: a crate on a rough floor', {
      b: r`A ${blk.m} kg crate rests on a floor with $\mu_s = ${blk.mus}$ and $\mu_k = ${blk.muk}$. A horizontal push of ${blk.F1} N is applied, then increased to ${blk.F2} N. Describe the motion each time. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`$N = mg = ${blk.m} \times ${g} = ${w3(blk.N)}$ N; limiting friction $= \mu_s N = ${blk.mus} \times ${w3(blk.N)} = ${w3(blk.fmax)}$ N.`,
        r`${blk.F1} N $<$ ${w3(blk.fmax)} N: the crate stays at rest and static friction $= ${blk.F1}$ N.`,
        r`${blk.F2} N $>$ ${w3(blk.fmax)} N: it slides, with $f_k = \mu_k N = ${blk.muk} \times ${w3(blk.N)} = ${w3(blk.fk)}$ N.`,
        r`$a = \dfrac{F - f_k}{m} = \dfrac{${blk.F2} - ${w3(blk.fk)}}{${blk.m}} = ${w3(blk.a2)}$ m s$^{-2}$.`,
      ],
      v: T9,
      n: `The normal reaction is ${w3(blk.N)} newtons, so the limiting friction is ${w3(blk.fmax)} newtons. A push of ${blk.F1} newtons is below that, so the crate stays still and static friction is exactly ${blk.F1} newtons. A push of ${blk.F2} newtons is above the limit, so the crate slides against kinetic friction of ${w3(blk.fk)} newtons, and its acceleration is ${w3(blk.a2)} metres per second squared.`,
    }),
    sl('concept', 'Friction on an incline', {
      b: 'On a slope of angle $\\theta$ the weight splits into $mg\\sin\\theta$ along the slope and $mg\\cos\\theta$ into it.',
      ul: [
        r`At rest: $f = mg\sin\theta$ and $N = mg\cos\theta$, so $f/N = \tan\theta \le \mu_s$.`,
        r`The steepest slope on which the block stays at rest has $\tan\theta = \mu_s$: the **angle of repose**.`,
        r`Sliding down: $a = g(\sin\theta - \mu_k\cos\theta)$.`,
        'Sliding up (pushed up the slope): friction acts down the slope, so $a$ decreases faster.',
      ],
      v: V.incl,
      n: 'On a slope the weight has a component along the slope that tries to slide the block down and a component into the slope that sets the normal reaction. At rest, friction balances the first and the normal reaction balances the second. Dividing, friction over normal reaction is the tangent of the angle, so the block stays put as long as the tangent of the angle does not exceed the coefficient of static friction.',
    }),
    sl('example', 'Worked example 10: a block on a slope', {
      b: r`The ${inc.m} kg block of the figure rests on a ${inc.theta}° slope. (a) Find the friction and the least $\mu_s$. (b) The slope is raised to ${inc2.theta}° where $\mu_s = ${inc2.mus}$ and $\mu_k = ${inc2.muk}$. Find the acceleration. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`(a) $f = mg\sin ${inc.theta}^\circ = ${w3(inc.W)} \times ${w3(Math.sin(rad(inc.theta)))} = ${w3(inc.f)}$ N; $N = mg\cos ${inc.theta}^\circ = ${w3(inc.N)}$ N.`,
        r`$\mu_s \ge \tan ${inc.theta}^\circ = ${w3(inc.mus)}$.`,
        r`(b) $\tan ${inc2.theta}^\circ = ${w3(inc2.tan)} > ${inc2.mus}$, so it slides.`,
        r`$a = g(\sin ${inc2.theta}^\circ - \mu_k\cos ${inc2.theta}^\circ) = ${w3(inc2.a)}$ m s$^{-2}$ down the slope.`,
      ],
      v: V.incl,
      n: `At ${inc.theta} degrees the block is at rest, so friction equals the component of weight along the slope, ${w3(inc.f)} newtons, and the normal reaction is ${w3(inc.N)} newtons. Their ratio, ${w3(inc.mus)}, is the least coefficient of static friction. At ${inc2.theta} degrees the tangent is ${w3(inc2.tan)}, larger than ${inc2.mus}, so the block slides with an acceleration of ${w3(inc2.a)} metres per second squared.`,
    }),
    sl('check', 'Quick check: static friction', {
      b: 'Choose the correct option.',
      v: plotFric,
      chk: 'friction-mcq',
      n: 'Remember that static friction adjusts itself to the push, up to its limit.',
    }),
    sl('concept', 'Rolling friction and lubrication', {
      b: '**Rolling friction** is the resistance to a wheel or ball rolling on a surface; it is much smaller than sliding friction.',
      ul: [
        r`$f_r = \mu_r N$ with $\mu_r \ll \mu_k$; it comes from the slight deformation of wheel and surface.`,
        'This is why wheels, rollers and **ball bearings** replace sliding.',
        '**Lubrication** puts a thin liquid or gas film (oil, grease, an air cushion) between surfaces, so they slide over the film and friction falls sharply.',
        'Friction is also useful: walking, braking and holding a nail all depend on it.',
      ],
      v: T8,
      n: `Rolling friction is far smaller than sliding friction, which is why we put heavy loads on wheels. Using the stated coefficients, dragging a ${roll.m} kilogram suitcase needs ${w3(roll.slide * roll.W)} newtons, but on wheels only ${w3(roll.wheels * roll.W)} newtons. A film of oil or air between surfaces does a similar job by letting layers of the film slide instead of rough surfaces.`,
    }),
    sl('example', 'Worked example 11: friction and a hanging block', {
      b: r`A ${rough.m1} kg block on a rough table ($\mu_k = ${rough.mu}$) is joined over a smooth pulley to a hanging ${rough.m2} kg block. Find the acceleration and the tension. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`Table block: $T - \mu m_1 g = m_1 a$. Hanging block: $m_2 g - T = m_2 a$.`,
        r`$a = \dfrac{(m_2 - \mu m_1) g}{m_1 + m_2} = \dfrac{(${rough.m2} - ${rough.mu} \times ${rough.m1}) \times ${g}}{${rough.m1 + rough.m2}} = ${w3(rough.a)}$ m s$^{-2}$.`,
        r`$T = m_1(a + \mu g) = ${rough.m1}(${w3(rough.a)} + ${w3(rough.mu * g)}) = ${w3(rough.T)}$ N.`,
      ],
      v: T5,
      n: `Friction on the table block is ${w3(rough.mu * rough.m1 * g)} newtons, which reduces the driving force from the hanging weight. The acceleration is therefore ${w3(rough.a)} metres per second squared, and the tension, found from the table block, is ${w3(rough.T)} newtons.`,
    }),
    sl('concept', 'Uniform circular motion and centripetal force', {
      b: 'A body moving in a circle at **constant speed** has a velocity that keeps changing direction, so it accelerates.',
      m: [r`a_c = \dfrac{v^2}{r} = \omega^2 r`, r`F_c = \dfrac{m v^2}{r} = m\omega^2 r \quad \text{(directed to the centre)}`],
      ul: [
        'The acceleration is **centripetal**: along the radius towards the centre, at right angles to the velocity.',
        '**Centripetal force** is not a new force: it is whichever real force (tension, friction, gravity, a component of the normal reaction) supplies the net inward force.',
        'It does not appear in the free-body diagram as a separate arrow.',
        'If the force vanishes, the body flies off along the **tangent**.',
      ],
      v: V.circ,
      n: `Look at the four positions. The velocity arrows are all the same length, so the speed is constant, but they point in different directions. The acceleration arrows all point to the centre with the same length, v squared over r, which here is ${w3(G.CIRC_DATA.a)} metres per second squared. Centripetal force is just the name for the net inward force that real forces supply.`,
    }),
    sl('example', 'Worked example 12: a whirled stone', {
      b: r`A ${whirl.m} kg stone on a smooth horizontal table is whirled by a ${whirl.r} m string at ${whirl.rev} revolutions per second. Find the tension and the centripetal acceleration. What is the greatest speed if the string breaks at ${whirl.Tmax} N?`,
      ul: [
        r`$\omega = 2\pi \times ${whirl.rev} = ${w3(whirl.w)}$ rad s$^{-1}$.`,
        r`$a_c = \omega^2 r = ${w3(whirl.ac)}$ m s$^{-2}$ and $T = m\omega^2 r = ${w3(whirl.T)}$ N.`,
        r`$T_\text{max} = \dfrac{m v^2}{r}$, so $v_\text{max} = \sqrt{\dfrac{T_\text{max} r}{m}} = \sqrt{\dfrac{${whirl.Tmax} \times ${whirl.r}}{${whirl.m}}} = ${w3(whirl.vmax)}$ m s$^{-1}$.`,
      ],
      v: T11,
      n: `Two revolutions per second is an angular speed of ${w3(whirl.w)} radians per second. The centripetal acceleration is that squared times the radius, ${w3(whirl.ac)} metres per second squared, and the tension supplies the force: ${w3(whirl.T)} newtons. A string that breaks at ${whirl.Tmax} newtons allows a top speed of ${w3(whirl.vmax)} metres per second.`,
    }),
    sl('concept', 'A vehicle on a level circular road', {
      b: 'On a level road the only horizontal force on the car is **static friction** from the road, pointing to the centre.',
      m: [r`\dfrac{m v^2}{r} \le \mu_s m g \;\Rightarrow\; v_\text{max} = \sqrt{\mu_s r g}`],
      ul: [
        'The mass cancels: a lorry and a scooter on the same bend have the same limit.',
        'The limit rises with $\\mu_s$ and with the radius, and falls on a wet road.',
        'Above $v_\\text{max}$ friction cannot supply enough force and the car skids outward along the tangent.',
        'The tyre is not sliding on the road when it grips: this is **static** friction.',
      ],
      v: V.road,
      n: 'Seen from above, the only force that can pull the car towards the centre is friction between the tyres and the road. It has a largest value, mu times the weight, and setting that equal to mass times v squared over r gives the greatest safe speed, which depends on the road and the radius but not on the mass of the car.',
    }),
    sl('example', 'Worked example 13: a level bend', {
      b: r`A car takes a level bend of radius ${lvl.r} m. The tyre–road $\mu_s$ is ${lvl.mu} when dry and ${lvl.wet} when wet. Find the greatest safe speed in each case. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`Dry: $v_\text{max} = \sqrt{\mu_s r g} = \sqrt{${lvl.mu} \times ${lvl.r} \times ${g}} = ${w3(lvl.v)}$ m s$^{-1}$ $= ${w3(lvl.kmh)}$ km h$^{-1}$.`,
        r`Wet: $\sqrt{${lvl.wet} \times ${lvl.r} \times ${g}} = ${w3(lvl.vw)}$ m s$^{-1}$ $= ${w3(lvl.kmhw)}$ km h$^{-1}$.`,
        r`The wet limit is lower by the factor $\sqrt{${lvl.wet}/${lvl.mu}} = ${w3(Math.sqrt(lvl.wet / lvl.mu))}$.`,
      ],
      v: V.road,
      n: `On a dry road the greatest speed is ${w3(lvl.v)} metres per second, about ${w3(lvl.kmh)} kilometres an hour. When wet, the coefficient drops from ${lvl.mu} to ${lvl.wet}, so the safe speed falls to ${w3(lvl.vw)} metres per second, or ${w3(lvl.kmhw)} kilometres an hour. Notice that the car's mass never entered the calculation.`,
    }),
    sl('concept', 'A vehicle on a banked road', {
      b: 'On a road banked at angle $\\theta$ the horizontal component of the normal reaction helps to supply the centripetal force.',
      m: [r`v_0 = \sqrt{r g \tan\theta} \quad (\text{no friction needed})`, r`v_\text{max} = \sqrt{\dfrac{r g(\mu_s + \tan\theta)}{1 - \mu_s\tan\theta}}`],
      ul: [
        r`Without friction: $N\sin\theta = mv^2/r$ and $N\cos\theta = mg$, so $\tan\theta = v^2/rg$.`,
        'At $v_0$ the car needs no friction at all; banking is designed for a typical speed.',
        r`Above $v_0$ the car tends to slide outward, so friction acts **down** the slope; below $v_0$ it acts **up** the slope.`,
        r`If $\mu_s > \tan\theta$ the car can even stand still on the bank without sliding.`,
      ],
      v: T10,
      n: 'On a banked road the normal reaction tilts towards the centre, and its horizontal part supplies the centripetal force. With no friction at all, balancing the vertical and horizontal parts gives the tangent of the angle equal to v squared over r g. Friction widens the range of safe speeds: it acts down the slope for the highest speed and up the slope for the lowest.',
    }),
    sl('example', 'Worked example 14: a banked curve', {
      b: r`A road curve of radius ${bk.r} m is banked at ${bk.theta}°. Find the speed at which no friction is needed, and the greatest safe speed if $\mu_s = ${bk.mu}$. ($g = ${g}$ m s$^{-2}$.)`,
      ul: [
        r`$v_0 = \sqrt{r g \tan\theta} = \sqrt{${bk.r} \times ${g} \times ${w3(bk.tan)}} = ${w3(bk.v0)}$ m s$^{-1}$ $= ${w3(bk.v0kmh)}$ km h$^{-1}$.`,
        r`$v_\text{max} = \sqrt{\dfrac{r g(\mu + \tan\theta)}{1 - \mu\tan\theta}} = \sqrt{\dfrac{${bk.r} \times ${g} \times ${w3(bk.mu + bk.tan)}}{${w3(1 - bk.mu * bk.tan)}}} = ${w3(bk.vmax)}$ m s$^{-1}$ $= ${w3(bk.vmaxkmh)}$ km h$^{-1}$.`,
        r`Since $\mu_s = ${bk.mu} > \tan\theta = ${w3(bk.tan)}$, there is no lower limit: the car can stop on the bank.`,
      ],
      v: V.road,
      n: `With no friction, the design speed is ${w3(bk.v0)} metres per second, about ${w3(bk.v0kmh)} kilometres an hour. Allowing friction with a coefficient of ${bk.mu} raises the greatest safe speed to ${w3(bk.vmax)} metres per second, about ${w3(bk.vmaxkmh)} kilometres an hour. Because the coefficient is larger than the tangent of the angle, a car parked on the bank would not slide down.`,
    }),
    sl('check', 'Quick check: banking', {
      b: 'Choose the correct option.',
      v: V.road,
      chk: 'bank-mcq',
      n: 'On a banked road with no friction, think about which two forces act on the car and what their resultant must be.',
    }),
    sl('check', 'Quick check: tension in a circle', {
      b: 'Choose the correct option.',
      v: V.circ,
      chk: 'circ-mcq',
      n: 'Work out how the tension changes when the speed is doubled at the same radius.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Equilibrium, friction and circular motion.',
      ul: [
        r`**Equilibrium:** $\sum \vec F = 0$; resolve along two axes or close the force polygon.`,
        r`**Friction:** $f_s \le \mu_s N$, $f_k = \mu_k N$ with $\mu_k < \mu_s$; independent of apparent area; rolling friction is much smaller; lubrication reduces it.`,
        r`**Incline:** angle of repose $\tan\theta = \mu_s$; sliding $a = g(\sin\theta - \mu_k\cos\theta)$.`,
        r`**Circular motion:** $a_c = v^2/r$ to the centre; $F_c = mv^2/r$ is the net inward force.`,
        r`**Roads:** level $v_\text{max} = \sqrt{\mu r g}$; banked $v_0 = \sqrt{r g\tan\theta}$, with friction $\sqrt{rg(\mu + \tan\theta)/(1 - \mu\tan\theta)}$.`,
      ],
      v: T10,
      n: 'To sum up. Balanced forces mean zero acceleration. Static friction adjusts up to a limit, kinetic friction is smaller and steady, and rolling friction is smaller still. A body in uniform circular motion has an acceleration of v squared over r towards the centre, supplied by real forces. A level road depends on friction alone, while banking lets the normal reaction help.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      b: 'Marks are lost on these.',
      ul: [
        'Use $N$, not $mg$, in $f = \\mu N$: check whether anything else pushes on the surface.',
        'Compare the applied force with the limiting friction **before** deciding whether the body moves.',
        'Never draw “centripetal force” as an extra force in an FBD; name the real force that provides it.',
        'On a banked road decide whether friction acts up or down the slope before writing the equations.',
        'State the angle and the radius units; convert km h⁻¹ to m s⁻¹ by dividing by 3.6.',
      ],
      v: V.incl,
      n: 'Four slips to avoid. Using the weight instead of the normal reaction in the friction formula. Skipping the check of whether the applied force exceeds the limiting friction. Drawing centripetal force as if it were an extra force instead of naming the real one that supplies it. And forgetting which way friction points on a banked road.',
    }),
  ],
});
