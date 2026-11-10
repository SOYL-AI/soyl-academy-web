// ISC 11 ch04 Projectile Motion — two decks. Part 1 (t01 and the first half of t02): a projectile as two independent motions, the
// terms, the position at time t, the equation of the trajectory, time of flight and maximum height. Part 2 (second half of t02
// and t03): horizontal range, maximum range and complementary angles, velocity at any instant, horizontal projection from a
// height. Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, R6, proj, pos } from './phys.mjs';
import { W, N } from './words.mjs';
import * as G from './svgs.mjs';

const f = (x, n = 3) => dec(x, n);
const mn = (x) => String(x).replace('-', '−');

// ---------------------------------------------------------------- worked-example numbers
// the strobe ball: u = 39.2 m/s at 30 degrees
const M = { u: G.TWOMOT_DATA.u, th: G.TWOMOT_DATA.th };
for (const [k, v] of Object.entries(proj(M.u, M.th))) M[k] = R6(v);
const ex1 = { t: 3 };
[ex1.x, ex1.y] = pos(M.u, M.th, ex1.t);
// a goal kick: u = 24.5 m/s at 40 degrees
const ex2 = { u: 24.5, th: 40 };
Object.assign(ex2, proj(ex2.u, ex2.th));
// a fire-hose jet: u = 21 m/s, range 35 m
const ex3 = { u: 21, R: 35 };
ex3.Rmax = (ex3.u * ex3.u) / g;
ex3.s2 = (ex3.R * g) / (ex3.u * ex3.u);
ex3.th1 = deg(Math.asin(ex3.s2)) / 2;
ex3.th2 = 90 - ex3.th1;
// velocity of the goal-kick ball at 2.5 s
const ex4 = { t: 2.5 };
ex4.vx = ex2.ux;
ex4.vy = ex2.uy - g * ex4.t;
ex4.v = Math.hypot(ex4.vx, ex4.vy);
ex4.ang = deg(Math.atan(Math.abs(ex4.vy) / ex4.vx));
// stone thrown horizontally from a bridge
const ex5 = { u: 12, h: 45 };
ex5.T = Math.sqrt((2 * ex5.h) / g);
ex5.R = ex5.u * ex5.T;
ex5.vy = g * ex5.T;
ex5.v = Math.hypot(ex5.u, ex5.vy);
ex5.ang = deg(Math.atan(ex5.vy / ex5.u));
// relief packet from a helicopter
const ex6 = { u: 20, h: 490 };
ex6.T = Math.sqrt((2 * ex6.h) / g);
ex6.R = ex6.u * ex6.T;
ex6.vy = g * ex6.T;
ex6.v = Math.hypot(ex6.u, ex6.vy);
ex6.ang = deg(Math.atan(ex6.vy / ex6.u));

export const EX = { M, ex1, ex2, ex3, ex4, ex5, ex6 };

// ---------------------------------------------------------------- visuals
export const V = {
  twomot: svgV(G.TWOMOT, 'Strobe picture of a ball thrown at 39.2 metres per second at 30 degrees: the horizontal velocity arrow is the same at every instant while the vertical arrow shrinks to zero at the top and then points down', 'Equal horizontal gaps every second; the vertical velocity changes by 9.8 m s⁻¹ each second.'),
  terms: svgV(G.TERMS, 'A projectile launched at 39.2 metres per second at 45 degrees, with the angle of projection, the maximum height of 39.2 metres and the horizontal range of 156.8 metres marked', 'Angle of projection, maximum height and range.'),
  comp: svgV(G.COMPLEMENT, 'Paths for the same speed at 30, 45 and 60 degrees: 30 and 60 degrees give the same range, 45 degrees gives the largest range', 'Complementary angles give equal ranges; 45° gives the maximum.'),
  veldir: svgV(G.VELDIR, 'Velocity arrows along the path at launch, at the highest point and at 3 seconds, the last with its horizontal and vertical components', 'The velocity is always along the tangent to the path.'),
  horiz: svgV(G.HORIZ, 'A ball thrown horizontally at 20 metres per second from a 19.6 metre cliff lands 40 metres away after 2 seconds with a speed of 28 metres per second at 44.4 degrees below the horizontal', 'Half a parabola: R = uT with T = √(2h/g).'),
  strobe: svgV(G.STROBE, 'A ball thrown horizontally and a ball dropped from the same height at the same moment are always at the same height and reach the ground together', 'Same vertical motion, whatever the horizontal speed.'),
};

const ax = (label, min, max) => ({ label, min, max });
const c8 = (x) => x.toFixed(8);
const tanM = Math.tan(rad(M.th));
const kM = g / (2 * M.ux * M.ux);
export const plotV = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('velocity component (m/s)', -25, 40),
    functions: [
      { expr: c8(M.ux), label: `horizontal: vx = ${f(M.ux)} m/s (constant)`, domain: [0, 4] },
      { expr: `${M.uy} - ${g}*x`, label: `vertical: vy = ${M.uy} − ${g} t (m/s)`, domain: [0, 4] },
    ],
    points: [{ at: [M.tTop, 0], label: 'top: vy = 0' }],
    hlines: [{ y: 0, dashed: true }],
  },
  'Graph of the two velocity components of a ball thrown at 39.2 metres per second at 30 degrees: the horizontal component is a flat line at 33.9 metres per second, the vertical component is a straight line falling from 19.6 to minus 19.6 metres per second and crossing zero at 2 seconds',
  'vx is flat; vy falls steadily with slope −g and is zero at the top.',
);
export const plotTraj = plot(
  {
    x: ax('horizontal distance x (m)', 0, 145),
    y: ax('height y (m)', 0, 25),
    functions: [{ expr: `${c8(tanM)}*x - ${c8(kM)}*x^2`, label: `y = x tan 30° − g x² / (2 u² cos² 30°)`, domain: [0, M.R] }],
    points: [
      { at: [0, 0], label: 'launch' },
      { at: [R6(M.R / 2), R6(M.H)], label: `top (${f(M.R / 2)} m, ${f(M.H)} m)` },
      { at: [R6(M.R), 0], label: `lands at R = ${f(M.R)} m` },
    ],
  },
  'Trajectory of the ball thrown at 39.2 metres per second at 30 degrees plotted as height against horizontal distance: a parabola from the origin, with its top 19.6 metres high at 67.9 metres and landing 135.8 metres away. The vertical scale is stretched.',
  'The trajectory is a parabola, symmetric about the highest point (vertical scale stretched).',
);
export const plotY = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('height y (m)', 0, 24),
    functions: [{ expr: `${M.uy}*x - ${g / 2}*x^2`, label: `y = ${M.uy} t − ${g / 2} t² (m)`, domain: [0, 4] }],
    points: [
      { at: [0, 0], label: 'launch' },
      { at: [M.tTop, R6(M.H)], label: `top: t = ${M.tTop} s, H = ${f(M.H)} m` },
      { at: [M.T, 0], label: `lands: T = ${M.T} s` },
    ],
  },
  'Height against time for the ball: a symmetric arch with the top 19.6 metres high at 2 seconds and the ball back at the ground at 4 seconds',
  'Equal times up and down: the top comes at T/2.',
);
const RM = R6((M.u * M.u) / g);
export const plotR = plot(
  {
    x: ax('angle of projection θ (degrees)', 0, 90),
    y: ax('range R (m)', 0, 175),
    functions: [{ expr: `${RM}*sin(2*pi*x/180)`, label: `R = u² sin 2θ / g, u = ${M.u} m/s`, domain: [0, 90] }],
    points: [
      { at: [30, R6(RM * Math.sin(rad(60)))], label: `30°: ${f(RM * Math.sin(rad(60)))} m` },
      { at: [45, R6(RM)], label: `45°: ${f(RM)} m (maximum)` },
      { at: [60, R6(RM * Math.sin(rad(120)))], label: `60°: ${f(RM * Math.sin(rad(120)))} m` },
    ],
  },
  'Range against angle of projection for a launch speed of 39.2 metres per second: a hump that is symmetric about 45 degrees, with the maximum of 156.8 metres at 45 degrees and equal ranges of 135.8 metres at 30 and 60 degrees',
  'R is symmetric about 45°: θ and 90° − θ give the same range.',
);
const speedAt = (t) => Math.sqrt(M.ux * M.ux + (M.uy - g * t) ** 2);
export const plotSpeed = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('speed v (m/s)', 25, 42),
    functions: [{ expr: `sqrt(${R6(M.ux * M.ux)} + (${M.uy} - ${g}*x)^2)`, label: 'speed v = √(vx² + vy²)', domain: [0, 4] }],
    points: [
      { at: [0, R6(speedAt(0))], label: `launch: ${f(speedAt(0))} m/s` },
      { at: [M.tTop, R6(speedAt(M.tTop))], label: `top: ${f(speedAt(M.tTop))} m/s (least)` },
      { at: [M.T, R6(speedAt(M.T))], label: `landing: ${f(speedAt(M.T))} m/s` },
    ],
  },
  'Speed against time for the ball thrown at 39.2 metres per second at 30 degrees: it starts at 39.2 metres per second, falls to a minimum of 33.9 metres per second at the top after 2 seconds and rises to 39.2 metres per second again at landing. The vertical axis starts at 25.',
  'The speed is least at the top, where it equals u cos θ, and the landing speed equals the launch speed.',
);

// ---------------------------------------------------------------- tables
const T_EX = table(
  ['Motion', 'A projectile?', 'Reason'],
  [
    ['A cricket ball after it leaves the bat', 'Yes', 'Only gravity acts (air drag ignored)'],
    ['A jet of water from a fire hose', 'Yes, each drop', 'Each drop moves under gravity alone'],
    ['A stone thrown sideways from a bridge', 'Yes', 'Gravity alone after the throw'],
    ['A rocket while its engine burns', 'No', 'The thrust acts as well as gravity'],
    ['A parachutist drifting down', 'No', 'Air drag and lift are large'],
  ],
  'Table of motions that are and are not projectile motion, each with the reason',
);
const T_INDEP = table(
  ['', 'Horizontal (x)', 'Vertical (y, up positive)'],
  [
    ['Acceleration', '0', '−g = −9.8 m s⁻²'],
    ['Velocity', 'vx = u cos θ (constant)', 'vy = u sin θ − g t'],
    ['Position', 'x = (u cos θ) t', 'y = (u sin θ) t − ½ g t²'],
    ['Kind of motion', 'Uniform motion', 'Uniformly accelerated (free fall)'],
  ],
  'Table comparing the horizontal and vertical motions of a projectile: acceleration, velocity, position and kind of motion',
);
const T_XY = table(
  ['t (s)', 'x (m)', 'y (m)', 'vx (m/s)', 'vy (m/s)'],
  [0, 1, 2, 3, 4].map((t) => {
    const [x, y] = pos(M.u, M.th, t);
    const z = (v) => (Math.abs(v) < 1e-9 ? '0' : mn(f(v)));
    return [String(t), z(x), z(y), f(M.ux), z(M.uy - g * t)];
  }),
  'Table of position and velocity components every second for a ball thrown at 39.2 metres per second at 30 degrees; x grows by equal steps, y rises and falls, vx stays constant and vy falls by 9.8 each second',
);
const T_EX2 = table(
  ['Quantity', 'Formula', 'Goal kick: u = 24.5 m/s, θ = 40°'],
  [
    ['Vertical component', 'u sin θ', `${f(ex2.uy)} m/s`],
    ['Time to the top', 'u sin θ / g', `${f(ex2.tTop)} s`],
    ['Time of flight', '2 u sin θ / g', `${f(ex2.T)} s`],
    ['Maximum height', 'u² sin² θ / 2g', `${f(ex2.H)} m`],
  ],
  'Table of the vertical component, time to the top, time of flight and maximum height for a goal kick at 24.5 metres per second at 40 degrees',
);
const T_RANGE = table(
  ['Angle θ', 'Range R = u² sin 2θ / g', 'Maximum height H', 'Time of flight T'],
  [30, 45, 60].map((a) => {
    const q = proj(M.u, a);
    return [`${a}°`, `${f(q.R)} m`, `${f(q.H)} m`, `${f(q.T)} s`];
  }),
  'Table of range, maximum height and time of flight for the same speed of 39.2 metres per second at 30, 45 and 60 degrees',
);
const T_HP = table(
  ['Quantity', 'Formula (launched horizontally at u from height h)', `Bridge: u = ${ex5.u} m/s, h = ${ex5.h} m`],
  [
    ['Time of fall', 'T = √(2h/g)', `${f(ex5.T)} s`],
    ['Horizontal distance', 'R = u T', `${f(ex5.R)} m`],
    ['Vertical velocity on landing', 'vy = g T', `${f(ex5.vy)} m/s`],
    ['Speed on landing', 'v = √(u² + 2gh)', `${f(ex5.v)} m/s`],
    ['Direction below horizontal', 'tan α = gT/u', `${f(ex5.ang)}°`],
  ],
  'Table of the time of fall, horizontal distance, landing velocity components, landing speed and direction for a stone thrown horizontally at 12 metres per second from a 45 metre bridge',
);
const T_PK = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['Time of fall', `T = √(2 × ${ex6.h} / ${g})`, `${f(ex6.T)} s`],
    ['Horizontal distance before the target', `R = ${ex6.u} × ${f(ex6.T)}`, `${f(ex6.R)} m`],
    ['Vertical velocity on landing', `g T = ${g} × ${f(ex6.T)}`, `${f(ex6.vy)} m/s`],
    ['Speed on landing', `√(${ex6.u}² + ${f(ex6.vy)}²)`, `${f(ex6.v)} m/s`],
  ],
  'Table of the working for a relief packet dropped from a helicopter: time of fall, horizontal distance, vertical velocity and landing speed',
);
export const TABLES = { T_EX, T_INDEP, T_XY, T_EX2, T_RANGE, T_HP, T_PK };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Projectile Motion — Part 1: Two independent motions, trajectory, time of flight and height',
  goals: [
    'Explain why the horizontal velocity of a projectile stays constant while the vertical velocity changes',
    'Define angle of projection, time of flight, maximum height and range',
    'Write the position of a projectile at any time and derive the equation of the trajectory as a parabola',
    'Derive and use the expressions for time of flight and maximum height',
  ],
  slides: [
    sl('title', 'Projectile Motion', {
      b: 'Part 1 — a projectile as two independent motions, its path, its time of flight and its greatest height.',
      v: V.twomot,
      n: 'A cricket ball hit into the air, a football kicked from the goal line, a stone thrown across a river: once they leave the bat, the boot or the hand, they move under gravity alone. In this part we see why their motion splits into a steady sideways part and an accelerated vertical part, and we work out the path, the time of flight and the greatest height.',
    }),
    sl('concept', 'What is a projectile?', {
      b: 'A **projectile** is a body thrown into the air that then moves under the force of gravity alone. The curved path it follows is its **trajectory**.',
      ul: [
        r`We neglect air resistance and take $g = 9.8$ m s$^{-2}$ as constant and vertically downward, which is a good model over small heights and ranges.`,
        'Everyday examples: a thrown cricket ball, a kicked football, a jet of water from a hose, a stone thrown sideways from a bridge.',
        'A rocket with its engine burning or a parachutist is **not** a projectile: other forces act on it besides gravity.',
        'The motion takes place in one vertical plane, so two coordinates are enough: $x$ horizontal and $y$ vertical.',
      ],
      v: T_EX,
      n: 'A projectile is a body that has been thrown or struck and then moves under gravity alone. A cricket ball in flight, a football and a jet of water all qualify. A rocket with its engine on does not, because the thrust also acts. We ignore air resistance and take gravity as constant and straight down. The path is called the trajectory, and it lies in one vertical plane.',
    }),
    sl('concept', 'Projectile motion is two independent motions', {
      b: 'Resolve the motion along two perpendicular directions. **Each one goes on as if the other did not exist.**',
      ul: [
        r`**Horizontal:** no force, so $a_x = 0$ and the velocity $u\cos\theta$ never changes: uniform motion.`,
        r`**Vertical:** the weight gives $a_y = -g$, so the body rises and falls exactly like a ball thrown straight up with speed $u\sin\theta$.`,
        'The two motions share only the **time**: the ball is at the horizontal distance $x$ and the height $y$ at the same instant $t$.',
      ],
      v: T_INDEP,
      n: 'The key idea is that projectile motion is two simple motions running side by side. Sideways there is no force, so the ball keeps a steady velocity. Vertically the weight gives a downward acceleration of nine point eight metres per second squared, so the ball rises and falls like one thrown straight up. The only link between the two is time: both positions are read at the same instant.',
    }),
    sl('concept', 'Why the horizontal velocity stays constant', {
      b: 'The only force on the projectile is its weight, and it acts **vertically**.',
      ul: [
        'With no horizontal force, the horizontal velocity cannot change (Newton’s first law): $v_x = u\\cos\\theta$ throughout.',
        r`The vertical velocity changes by $9.8$ m s$^{-1}$ every second: upward and shrinking on the way up, **zero** at the top, downward and growing on the way down.`,
        'So at the highest point the velocity is **not** zero; it is purely horizontal, $u\\cos\\theta$, and this is the least speed in the flight.',
      ],
      v: plotV,
      n: 'No force acts sideways, so the sideways velocity stays the same all the way, as the flat green line shows. The vertical velocity falls by nine point eight metres per second every second, passing through zero at the top and then pointing downward. So at the top the ball is not at rest: it is still moving sideways with the full horizontal velocity, and that is the smallest speed it has.',
    }),
    sl('check', 'Quick check: velocity at the top', {
      b: 'Choose the correct option.',
      v: V.twomot,
      chk: 'hvel-mcq',
      n: 'Think about which component of velocity gravity can change, and which it cannot.',
    }),
    sl('concept', 'Terms used in projectile motion', {
      b: 'A body is projected from the origin O with **velocity of projection** $u$ at an **angle of projection** $\\theta$ above the horizontal.',
      ul: [
        '**Angle of projection** $\\theta$: the angle between the initial velocity and the horizontal.',
        '**Time of flight** $T$: the time from launch until the body is back at the launch level.',
        '**Maximum height** $H$: the greatest height above the launch level, reached when $v_y = 0$.',
        '**Horizontal range** $R$: the horizontal distance from the launch point to the point where the body returns to the launch level.',
      ],
      v: V.terms,
      n: 'Here is the vocabulary. The speed at which the ball leaves is the velocity of projection. The angle it makes with the ground is the angle of projection. The time from launch until the ball returns to the launch level is the time of flight. The greatest height reached is the maximum height, and the horizontal distance covered in the whole flight is the range.',
    }),
    sl('concept', 'Position and velocity at time t', {
      b: r`Take the launch point as origin, $x$ horizontal and $y$ upward. The components of $u$ are $u_x = u\cos\theta$ and $u_y = u\sin\theta$.`,
      m: [r`x = (u\cos\theta)\,t \qquad y = (u\sin\theta)\,t - \tfrac{1}{2}gt^2`, r`v_x = u\cos\theta \qquad v_y = u\sin\theta - gt`],
      ul: [
        r`These follow from $s = ut + \tfrac{1}{2}at^2$ and $v = u + at$ with $a_x = 0$ and $a_y = -g$.`,
        `For ${M.u} m s⁻¹ at ${M.th}° the table gives the positions and velocities each second: equal steps in $x$, a rise and a fall in $y$.`,
      ],
      v: T_XY,
      n: `Place the origin at the launch point. The horizontal position is u cosine theta times t, and the height is u sine theta times t minus half g t squared. The velocity components are u cosine theta, constant, and u sine theta minus g t. For a ball thrown at ${N(M.u)} metres per second at thirty degrees, the table shows the horizontal distance growing in equal steps while the height rises and then falls.`,
    }),
    sl('example', 'Worked example 1: a hit to the boundary', {
      b: r`A cricket ball leaves the bat at $${M.u}$ m s$^{-1}$ at $${M.th}^\circ$ above the horizontal. Taking $g = 9.8$ m s$^{-2}$, find (i) the components of the initial velocity and (ii) its position $${ex1.t}$ s later.`,
      ul: [
        r`(i) $u_x = ${M.u}\cos ${M.th}^\circ = ${f(M.ux)}$ m s$^{-1}$ and $u_y = ${M.u}\sin ${M.th}^\circ = ${f(M.uy)}$ m s$^{-1}$.`,
        r`(ii) $x = u_x t = ${f(M.ux)} \times ${ex1.t} = ${f(ex1.x)}$ m.`,
        r`$y = u_y t - \tfrac{1}{2}gt^2 = ${f(M.uy)}(${ex1.t}) - 4.9(${ex1.t ** 2}) = ${f(ex1.y)}$ m.`,
        `At ${ex1.t} s the ball is already coming down: it reached the top at ${M.tTop} s.`,
      ],
      v: V.twomot,
      n: `First resolve the velocity. The horizontal component is ${N(M.ux)} metres per second and the vertical component is ${N(M.uy)}. After ${W(ex1.t)} seconds the ball has gone ${N(ex1.x)} metres sideways. Its height is ${N(M.uy)} times ${W(ex1.t)} minus four point nine times nine, which is ${N(ex1.y)} metres. It reached the top at ${W(M.tTop)} seconds, so at ${W(ex1.t)} seconds it is on its way down.`,
    }),
    sl('concept', 'Equation of the trajectory', {
      b: r`Eliminate $t$ between $x = (u\cos\theta)t$ and $y = (u\sin\theta)t - \tfrac{1}{2}gt^2$.`,
      m: [r`t = \dfrac{x}{u\cos\theta}`, r`y = (u\sin\theta)\dfrac{x}{u\cos\theta} - \dfrac{1}{2}g\dfrac{x^2}{u^2\cos^2\theta}`, r`\boxed{\,y = x\tan\theta - \dfrac{g\,x^2}{2u^2\cos^2\theta}\,}`],
      ul: [
        r`This has the form $y = ax - bx^2$ with $a = \tan\theta$ and $b = \dfrac{g}{2u^2\cos^2\theta}$, both constants: a **parabola** through the origin, opening downward.`,
        `For ${M.u} m s⁻¹ at ${M.th}° it peaks ${f(M.H)} m up at ${f(M.R / 2)} m and returns to the ground at ${f(M.R)} m (vertical scale stretched in the graph).`,
      ],
      v: plotTraj,
      n: 'To find the shape of the path, remove time. From the horizontal motion, t equals x over u cosine theta. Substituting into the vertical motion gives y equals x tan theta minus g x squared over two u squared cosine squared theta. This is of the form a x minus b x squared, where a and b are constants, which is the equation of a parabola. So the trajectory of a projectile is a parabola.',
    }),
    sl('check', 'Quick check: the shape of the path', {
      b: 'Choose the correct option.',
      v: plotTraj,
      chk: 'traj-mcq',
      n: 'Look at how y depends on x in the trajectory equation.',
    }),
    sl('concept', 'Time of flight', {
      b: r`The body is back at the launch level when $y = 0$.`,
      m: [r`0 = (u\sin\theta)\,T - \tfrac{1}{2}gT^2 = T\left(u\sin\theta - \tfrac{1}{2}gT\right)`, r`\boxed{\,T = \dfrac{2u\sin\theta}{g}\,}`],
      ul: [
        r`$T = 0$ is the launch instant; the other root is the landing.`,
        r`The time to reach the top is $\dfrac{u\sin\theta}{g} = \dfrac{T}{2}$, because $v_y = u\sin\theta - gt = 0$ there: **up and down take equal times**.`,
        `Here $T = ${M.T}$ s and the top comes at ${M.tTop} s.`,
      ],
      v: V.terms,
      n: 'The ball is back at the launch level when its height is zero. Factorising, t times u sine theta minus half g t equals zero. One root is zero, the start; the other gives the time of flight, two u sine theta over g. Since the vertical velocity becomes zero after u sine theta over g, which is half the time of flight, the upward and downward journeys take equal times.',
    }),
    sl('concept', 'Maximum height', {
      b: r`At the top $v_y = 0$. Use $v_y^2 = u_y^2 - 2gy$ (or put $t = T/2$ in $y(t)$).`,
      m: [r`0 = (u\sin\theta)^2 - 2gH`, r`\boxed{\,H = \dfrac{u^2\sin^2\theta}{2g}\,}`],
      ul: [
        r`Check with $t = \dfrac{u\sin\theta}{g}$: $H = \dfrac{u^2\sin^2\theta}{g} - \dfrac{1}{2}\dfrac{u^2\sin^2\theta}{g} = \dfrac{u^2\sin^2\theta}{2g}$.`,
        `$H$ depends on the vertical component only; doubling $u$ makes $H$ four times larger. Here $H = ${f(M.H)}$ m.`,
      ],
      v: plotY,
      n: 'At the highest point the vertical velocity is zero. Using the equation relating velocity and distance for the vertical motion, zero equals u sine theta squared minus two g H. So the maximum height is u squared sine squared theta over two g. It depends only on the vertical component of the launch velocity, so doubling the launch speed makes the height four times as great.',
    }),
    sl('example', 'Worked example 2: a goal kick', {
      b: r`A goalkeeper kicks a football at $${ex2.u}$ m s$^{-1}$ at $${ex2.th}^\circ$ to the ground. Find the time to reach the top, the time of flight and the maximum height. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$u\sin\theta = ${ex2.u}\sin ${ex2.th}^\circ = ${f(ex2.uy)}$ m s$^{-1}$.`,
        r`Time to the top $= \dfrac{u\sin\theta}{g} = \dfrac{${f(ex2.uy)}}{9.8} = ${f(ex2.tTop)}$ s.`,
        r`$T = 2 \times ${f(ex2.tTop)} = ${f(ex2.T)}$ s.`,
        r`$H = \dfrac{(u\sin\theta)^2}{2g} = \dfrac{${f(ex2.uy)}^2}{19.6} = ${f(ex2.H)}$ m.`,
      ],
      v: T_EX2,
      n: `The vertical component of the kick is ${N(ex2.uy)} metres per second. Dividing by nine point eight, the ball reaches the top after ${N(ex2.tTop)} seconds, and the time of flight is twice that, ${N(ex2.T)} seconds. The maximum height is the vertical component squared over nineteen point six, which is ${N(ex2.H)} metres.`,
    }),
    sl('check', 'Quick check: comparing two throws', {
      b: 'Choose the correct option.',
      v: plotY,
      chk: 'tratio-mcq',
      n: 'The time of flight depends on the sine of the angle.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results (launch and landing on the same level):',
      v: table(
        ['Idea', 'Result'],
        [
          ['Independent motions', 'Horizontal: a = 0, vx = u cos θ. Vertical: a = −g'],
          ['Position at time t', 'x = (u cos θ) t; y = (u sin θ) t − ½ g t²'],
          ['Equation of trajectory', 'y = x tan θ − g x² / (2 u² cos² θ): a parabola'],
          ['Time of flight', 'T = 2 u sin θ / g'],
          ['Maximum height', 'H = u² sin² θ / 2g, reached at t = T/2'],
          ['At the top', 'vy = 0, speed = u cos θ, acceleration = g downward'],
        ],
        'Summary table of the independent motions, position at time t, equation of the trajectory, time of flight, maximum height and conditions at the top',
      ),
      n: 'To sum up. Projectile motion is a uniform horizontal motion together with a free fall in the vertical direction. The position at time t gives, on eliminating time, a parabola. The time of flight is two u sine theta over g, and the maximum height is u squared sine squared theta over two g. At the top the vertical velocity is zero, but the horizontal velocity is not, and gravity still acts.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In a derivation, state the assumptions first: no air resistance, constant $g$, launch and landing on the same level.',
        'Show the starting equations for both directions, then eliminate $t$ (trajectory) or set $y = 0$ (time of flight) or $v_y = 0$ (height). Each step earns a mark.',
        'Common mistakes: putting $v = 0$ at the top (only $v_y = 0$); using $u$ instead of $u\\sin\\theta$ in the height; forgetting to double the time to the top.',
        'Give units, and state $g = 9.8$ m s$^{-2}$ in numerical work.',
      ],
      v: T_INDEP,
      n: 'In derivations, begin with the assumptions: no air resistance, constant gravity, and launch and landing on the same level. Write the starting equations for both directions. Marks are lost for saying the velocity is zero at the top, when only its vertical component is zero, for using u instead of its vertical component in the height formula, and for forgetting to double the time to the top. Always give units.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Projectile Motion — Part 2: Range, velocity at any instant and horizontal projection',
  goals: [
    'Derive the horizontal range R = u² sin 2θ / g and show that it is greatest at 45°',
    'Show that complementary angles of projection give equal ranges',
    'Find the magnitude and direction of the velocity of a projectile at any instant',
    'Solve problems on a body projected horizontally from a height',
  ],
  slides: [
    sl('title', 'Range, Velocity and Horizontal Projection', {
      b: 'Part 2 — how far a projectile goes, how fast it is moving at any moment, and bodies thrown sideways from a height.',
      v: V.comp,
      n: 'How far will the ball go, and how fast and in which direction is it moving after a given time? How does a stone thrown sideways from a bridge behave? In this part we derive the range, find the angle for maximum range, meet the surprising fact that two different angles give the same range, and then study the velocity of a projectile and horizontal projection.',
    }),
    sl('concept', 'Horizontal range', {
      b: r`The range is the horizontal distance covered in the time of flight $T = \dfrac{2u\sin\theta}{g}$, moving at the constant speed $u\cos\theta$.`,
      m: [r`R = (u\cos\theta)\,T = (u\cos\theta)\dfrac{2u\sin\theta}{g} = \dfrac{u^2\,2\sin\theta\cos\theta}{g}`, r`\boxed{\,R = \dfrac{u^2\sin 2\theta}{g}\,}`],
      ul: [
        r`We used $2\sin\theta\cos\theta = \sin 2\theta$.`,
        r`Check on the trajectory: put $y = 0$ in $y = x\tan\theta - \dfrac{gx^2}{2u^2\cos^2\theta}$; the non-zero root is $x = \dfrac{2u^2\sin\theta\cos\theta}{g}$, the same $R$.`,
        `For ${M.u} m s⁻¹ at ${M.th}°: $R = ${f(M.R)}$ m; at 45° (figure) $R = ${f(RM)}$ m.`,
      ],
      v: V.terms,
      n: 'The ball moves at a constant horizontal speed, u cosine theta, for the whole time of flight. So the range is u cosine theta times two u sine theta over g. Using the identity that two sine theta cosine theta equals sine of two theta, the range is u squared sine two theta over g. Putting y equal to zero in the equation of the trajectory gives the same result.',
    }),
    sl('concept', 'Range depends on the angle', {
      b: r`For a fixed speed $u$, $R = \dfrac{u^2}{g}\sin 2\theta$ varies only through $\sin 2\theta$.`,
      ul: [
        r`$R$ is zero at $\theta = 0^\circ$ and $90^\circ$ (a vertical throw comes straight back).`,
        r`$\sin 2\theta$ is largest, equal to $1$, at $2\theta = 90^\circ$, so $\theta = 45^\circ$.`,
        'The graph is symmetric about $45^\\circ$: the range falls away equally on both sides.',
      ],
      v: plotR,
      n: 'For a given launch speed the range depends on the angle only through sine of two theta. That is zero at zero degrees and ninety degrees, and largest when two theta is ninety degrees, which means forty five degrees. The graph is a symmetric hump about forty five degrees, so angles equally far on either side of forty five give the same range.',
    }),
    sl('concept', 'Maximum range at 45 degrees', {
      b: r`With $\theta = 45^\circ$, $\sin 2\theta = \sin 90^\circ = 1$:`,
      m: [r`\boxed{\,R_{\max} = \dfrac{u^2}{g}\,}`, r`H = \dfrac{u^2\sin^2\theta}{2g}, \quad R = \dfrac{2u^2\sin\theta\cos\theta}{g} \;\Rightarrow\; \dfrac{H}{R} = \dfrac{\tan\theta}{4}`],
      ul: [
        r`At $45^\circ$, $\tan\theta = 1$, so $R = 4H$: the range is four times the maximum height.`,
        `For $u = ${M.u}$ m s⁻¹: $R_{\\max} = ${f(RM)}$ m and $H = ${f(RM / 4)}$ m.`,
        'The maximum range is **only for launch and landing on one level** and with no air resistance.',
      ],
      v: plotR,
      n: 'At forty five degrees sine of two theta is one, so the maximum range is u squared over g. Dividing the height by the range, the ratio is tan theta over four. At forty five degrees the tangent is one, so the range is exactly four times the maximum height. All of this assumes launch and landing on the same level and no air resistance.',
    }),
    sl('concept', 'Equal ranges for complementary angles', {
      b: r`Angles $\theta$ and $90^\circ - \theta$ are **complementary**. At the same speed they give the **same range**:`,
      m: [r`R(90^\circ - \theta) = \dfrac{u^2\sin(180^\circ - 2\theta)}{g} = \dfrac{u^2\sin 2\theta}{g} = R(\theta)`],
      ul: [
        r`The heights and times differ: the steeper path has $H \propto \sin^2\theta$ and $T \propto \sin\theta$ larger.`,
        `Same $u$ = ${M.u} m s⁻¹: $30^\\circ$ and $60^\\circ$ both give ${f(RM * Math.sin(rad(60)))} m; the heights are in the ratio $1:3$.`,
      ],
      v: V.comp,
      n: 'If the angle is replaced by its complement, ninety degrees minus theta, then two theta becomes one hundred and eighty degrees minus two theta, and the sine is unchanged. So complementary angles give the same range. The paths are quite different though: the steeper one rises higher and stays in the air longer. For thirty and sixty degrees the heights are in the ratio one to three.',
    }),
    sl('check', 'Quick check: complementary angles', {
      b: 'Choose the correct option.',
      v: V.comp,
      chk: 'compl-mcq',
      n: 'Use the idea that sine of two theta is the same for theta and its complement.',
    }),
    sl('example', 'Worked example 3: a fire-hose jet', {
      b: r`A jet of water leaves a hose at $${ex3.u}$ m s$^{-1}$. Find (i) the greatest horizontal distance it can reach on level ground and (ii) the angles of projection for a target $${ex3.R}$ m away. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`(i) $R_{\max} = \dfrac{u^2}{g} = \dfrac{${ex3.u}^2}{9.8} = ${f(ex3.Rmax)}$ m, at $45^\circ$.`,
        r`(ii) $\sin 2\theta = \dfrac{Rg}{u^2} = \dfrac{${ex3.R} \times 9.8}{${ex3.u ** 2}} = ${f(ex3.s2, 4)}$, so $2\theta = ${f(deg(Math.asin(ex3.s2)), 4)}^\circ$ or $${f(180 - deg(Math.asin(ex3.s2)), 4)}^\circ$.`,
        r`$\theta = ${f(ex3.th1)}^\circ$ (flat jet) or $${f(ex3.th2)}^\circ$ (lobbed jet): complementary angles, as they must be.`,
      ],
      v: plotR,
      n: `The greatest distance is u squared over g, which is ${N(ex3.Rmax)} metres. For a target ${W(ex3.R)} metres away, sine of two theta is ${W(R6(ex3.s2 * 1e4) / 1e4)}, giving two theta of about ${N(deg(Math.asin(ex3.s2)))} degrees or its supplement. So theta is about ${N(ex3.th1)} degrees for a flat jet, or ${N(ex3.th2)} degrees for a lobbed jet. The two angles add up to ninety.`,
    }),
    sl('concept', 'Velocity at any instant', {
      b: 'At time $t$ the two components of the velocity are',
      m: [r`v_x = u\cos\theta \qquad v_y = u\sin\theta - gt`, r`v = \sqrt{v_x^2 + v_y^2} \qquad \tan\alpha = \dfrac{v_y}{v_x}`],
      ul: [
        r`$\alpha$ is the angle of the velocity with the horizontal: above it if $v_y > 0$ (rising), below it if $v_y < 0$ (falling).`,
        'The velocity is always **tangent to the path**.',
        r`On landing at the launch level $v_y = -u\sin\theta$, so the speed is $u$ again and the direction is $\theta$ below the horizontal.`,
      ],
      v: V.veldir,
      n: 'At any time the horizontal component is still u cosine theta, and the vertical component is u sine theta minus g t. The magnitude of the velocity is the square root of the sum of their squares, and the tangent of its angle with the horizontal is the vertical component over the horizontal component. The velocity always points along the path. On returning to the launch level, the speed equals the launch speed.',
    }),
    sl('concept', 'Speed along the path', {
      b: r`$v^2 = (u\cos\theta)^2 + (u\sin\theta - gt)^2$ is smallest when $v_y = 0$.`,
      ul: [
        r`**Least speed:** at the top, $v = u\cos\theta$ (for $\theta = 90^\circ$ it is zero).`,
        'The speed at the same height is the same on the way up and on the way down.',
        r`At height $y$ above the launch point $v^2 = u^2 - 2gy$ (energy idea, same as a vertical throw).`,
      ],
      v: plotSpeed,
      n: 'The speed starts at the launch speed, falls steadily as the ball climbs, reaches its smallest value at the top where only the horizontal component is left, and then rises again. At the same height the speeds going up and coming down are equal, and at landing the speed is back to the launch speed.',
    }),
    sl('example', 'Worked example 4: velocity of the goal-kick ball', {
      b: r`For the football of Example 2 ($u = ${ex2.u}$ m s$^{-1}$, $\theta = ${ex2.th}^\circ$) find the speed and direction of motion at $t = ${ex4.t}$ s.`,
      ul: [
        r`$v_x = u\cos\theta = ${f(ex4.vx)}$ m s$^{-1}$; $v_y = u\sin\theta - gt = ${f(ex2.uy)} - 9.8(${ex4.t}) = ${mn(f(ex4.vy))}$ m s$^{-1}$.`,
        r`$v = \sqrt{${f(ex4.vx)}^2 + ${f(Math.abs(ex4.vy))}^2} = ${f(ex4.v)}$ m s$^{-1}$.`,
        r`$\tan\alpha = \dfrac{${mn(f(ex4.vy))}}{${f(ex4.vx)}} = ${mn(f(ex4.vy / ex4.vx, 3))}$, so $\alpha = ${f(ex4.ang)}^\circ$ **below** the horizontal (the ball is falling, since the top was at ${f(ex2.tTop)} s).`,
      ],
      v: V.veldir,
      n: `The horizontal component is still ${N(ex4.vx)} metres per second. The vertical component is ${N(ex2.uy)} minus nine point eight times two point five, which is minus ${N(Math.abs(ex4.vy))}: the ball is moving downward. The speed is ${N(ex4.v)} metres per second, and the direction is ${N(ex4.ang)} degrees below the horizontal.`,
    }),
    sl('check', 'Quick check: speed at the top', {
      b: 'Choose the correct option.',
      v: plotSpeed,
      chk: 'toplat-mcq',
      n: 'At the top only one component of velocity survives.',
    }),
    sl('concept', 'Horizontal projection from a height', {
      b: r`A body is thrown **horizontally** with speed $u$ from a height $h$. Origin at the launch point, $y$ measured **downward**: $u_x = u$, $u_y = 0$.`,
      m: [r`x = ut \qquad y = \tfrac{1}{2}gt^2`, r`T = \sqrt{\dfrac{2h}{g}} \qquad R = uT = u\sqrt{\dfrac{2h}{g}} \qquad y = \dfrac{g}{2u^2}x^2`],
      ul: [
        r`**Time of fall** depends only on $h$ (put $y = h$): the same as a body dropped from rest.`,
        r`**Path:** $y \propto x^2$, half of a parabola with its vertex at the launch point.`,
        r`**On landing:** $v_x = u$, $v_y = gT = \sqrt{2gh}$, $v = \sqrt{u^2 + 2gh}$, and $\tan\alpha = \dfrac{gT}{u}$ below the horizontal.`,
      ],
      v: V.horiz,
      n: 'Now throw the body sideways from a height. Horizontally it moves at the constant speed u; vertically it starts from rest and falls freely. Putting the drop equal to h, the time of fall is the square root of two h over g, and the horizontal distance is u times that. Eliminating time gives y proportional to x squared, so the path is half a parabola. At landing the vertical velocity is g T.',
    }),
    sl('concept', 'Thrown sideways or dropped: the same fall', {
      b: 'Release one ball from rest and throw another horizontally from the **same height at the same moment**.',
      ul: [
        'At every instant the two are at the same height: the sideways throw does not change how fast the ball falls.',
        'They reach the ground **together**; a faster sideways throw only lands farther away, $R \\propto u$.',
        'This is the experimental proof that the horizontal and vertical motions are independent.',
      ],
      v: V.strobe,
      n: 'This picture shows the independence of the two motions. One ball is dropped and another is thrown sideways from the same height at the same moment. At each half second the two are at the same height, joined by the dashed lines, and they reach the ground together. Throwing faster only carries the ball farther away. The sideways motion has no effect on the fall.',
    }),
    sl('example', 'Worked example 5: a stone from a bridge', {
      b: r`A boy throws a stone horizontally at $${ex5.u}$ m s$^{-1}$ from a bridge $${ex5.h}$ m above the water. Find the time to reach the water, the horizontal distance covered, and the speed and direction on reaching the water. ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`$T = \sqrt{\dfrac{2h}{g}} = \sqrt{\dfrac{90}{9.8}} = ${f(ex5.T)}$ s.`,
        r`$R = uT = ${ex5.u} \times ${f(ex5.T)} = ${f(ex5.R)}$ m.`,
        r`$v_y = gT = ${f(ex5.vy)}$ m s$^{-1}$, so $v = \sqrt{${ex5.u}^2 + ${f(ex5.vy)}^2} = ${f(ex5.v)}$ m s$^{-1}$.`,
        r`$\tan\alpha = \dfrac{${f(ex5.vy)}}{${ex5.u}}$, so $\alpha = ${f(ex5.ang)}^\circ$ below the horizontal.`,
      ],
      v: T_HP,
      n: `The time of fall is the square root of ninety over nine point eight, about ${N(ex5.T)} seconds. In that time the stone moves ${N(ex5.R)} metres sideways. Its vertical velocity on arrival is ${N(ex5.vy)} metres per second, so its speed is ${N(ex5.v)} metres per second, directed ${N(ex5.ang)} degrees below the horizontal.`,
    }),
    sl('check', 'Quick check: a faster throw', {
      b: 'Choose the correct option.',
      v: V.strobe,
      chk: 'hratio2-mcq',
      n: 'The time of fall depends on the height only.',
    }),
    sl('example', 'Worked example 6: relief supplies', {
      b: r`A helicopter flies horizontally at $${ex6.u}$ m s$^{-1}$ at a height of $${ex6.h}$ m and drops a packet. How far before the target must it be released, and with what speed does the packet land? ($g = 9.8$ m s$^{-2}$.)`,
      ul: [
        r`The packet leaves with the helicopter's horizontal velocity, $u = ${ex6.u}$ m s$^{-1}$, and zero vertical velocity.`,
        r`$T = \sqrt{\dfrac{2 \times ${ex6.h}}{9.8}} = ${f(ex6.T)}$ s, so $R = uT = ${f(ex6.R)}$ m ahead of the target.`,
        r`$v_y = gT = ${f(ex6.vy)}$ m s$^{-1}$ and $v = \sqrt{${ex6.u}^2 + ${f(ex6.vy)}^2} = ${f(ex6.v)}$ m s$^{-1}$, at $${f(ex6.ang)}^\circ$ below the horizontal.`,
      ],
      v: T_PK,
      n: `The packet keeps the helicopter's horizontal speed of ${W(ex6.u)} metres per second. It falls for ${N(ex6.T)} seconds, covering ${N(ex6.R)} metres sideways, so the helicopter must release it that far before the target. It lands with a vertical speed of ${N(ex6.vy)} metres per second, which gives a landing speed of about ${N(ex6.v)} metres per second.`,
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Horizontal range', 'R = u² sin 2θ / g'],
          ['Maximum range', 'θ = 45°, R_max = u²/g, and R = 4H at 45°'],
          ['Equal ranges', 'θ and 90° − θ give the same R (different H and T)'],
          ['Velocity at time t', 'vx = u cos θ; vy = u sin θ − g t; tan α = vy/vx'],
          ['Least speed', 'At the top: u cos θ; landing speed = launch speed'],
          ['Horizontal launch from h', 'T = √(2h/g); R = uT; v = √(u² + 2gh); path y = g x²/2u²'],
        ],
        'Summary table of the range, maximum range, equal ranges, velocity at time t, least speed and horizontal projection results',
      ),
      n: 'To sum up. The range is u squared sine two theta over g. It is greatest at forty five degrees, where it equals u squared over g and four times the height. Complementary angles give equal ranges. The velocity at any time has a constant horizontal part and a changing vertical part, and always points along the path. For a body thrown sideways from a height, the fall takes the square root of two h over g, whatever the horizontal speed.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Derive $R$ from $T$ and the constant horizontal velocity; write the identity $2\\sin\\theta\\cos\\theta = \\sin 2\\theta$. For maximum range say $\\sin 2\\theta = 1$, so $\\theta = 45^\\circ$.',
        'For complementary angles, show $\\sin(180^\\circ - 2\\theta) = \\sin 2\\theta$ explicitly.',
        'For a velocity question give **both** magnitude and direction, and say whether the angle is above or below the horizontal.',
        'Horizontal launch: take $y$ downward, $u_y = 0$; the time of fall does not involve $u$.',
        'Common mistakes: using $\\sin 2\\theta$ for the height; adding $u$ and $gt$ instead of combining components at right angles; using $R = u^2\\sin 2\\theta/g$ when the landing level differs from the launch level.',
      ],
      v: T_RANGE,
      n: 'For the range, derive it from the time of flight and the constant horizontal velocity, and quote the double angle identity. For maximum range say that sine two theta equals one. To show equal ranges for complementary angles, write sine of one hundred and eighty minus two theta equals sine two theta. For velocity questions give magnitude and direction, saying above or below the horizontal. In horizontal projection the time of fall does not depend on the throwing speed.',
    }),
  ],
});
