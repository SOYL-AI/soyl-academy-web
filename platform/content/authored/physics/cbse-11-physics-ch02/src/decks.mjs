// ch02 Motion in a Straight Line — two decks: Part 1 (t01–t02) position, displacement, velocity and acceleration;
// Part 2 (t03–t04) uniformly accelerated motion, free fall, stopping distance and motion graphs. Every number and
// every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, deriv, integ, pwl, root, pathLength } from './phys.mjs';
import * as G from './svgs.mjs';

const R6 = (x) => Math.round(x * 1e6) / 1e6;

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { out: G.PATH_DATA.A, back: G.PATH_DATA.A - G.PATH_DATA.B, T: 330 };
ex1.path = ex1.out + ex1.back;
ex1.disp = ex1.out - ex1.back;
ex1.vs = ex1.path / ex1.T;
ex1.vv = ex1.disp / ex1.T;

const ex2 = { d: 90, v1: 30, v2: 45 };
ex2.t1 = ex2.d / ex2.v1;
ex2.t2 = ex2.d / ex2.v2;
ex2.avg = (2 * ex2.d) / (ex2.t1 + ex2.t2);
ex2.mean = (ex2.v1 + ex2.v2) / 2;

// x = 2t³ − 9t² + 12t
const cub = { a: 2, b: -9, c: 12, T: 3 };
cub.x = (t) => cub.a * t ** 3 + cub.b * t ** 2 + cub.c * t;
cub.v = (t) => 3 * cub.a * t ** 2 + 2 * cub.b * t + cub.c;
cub.acc = (t) => 6 * cub.a * t + 2 * cub.b;
cub.r1 = R6(root(cub.v, 0.2, 1.4));
cub.r2 = R6(root(cub.v, 1.4, 2.8));
cub.x1 = cub.x(cub.r1);
cub.x2 = cub.x(cub.r2);
cub.x3 = cub.x(cub.T);
cub.disp = cub.x3 - cub.x(0);
cub.path = Math.abs(cub.x1 - cub.x(0)) + Math.abs(cub.x2 - cub.x1) + Math.abs(cub.x3 - cub.x2);
cub.vbar = cub.disp / cub.T;
cub.sbar = cub.path / cub.T;
cub.tmin = -cub.b / (3 * cub.a); // a = 12t − 18 = 0 at 1.5 s
cub.vmin = cub.v(cub.tmin);

const chord = { k: 1.5, t1: 1, t2: 3 };
chord.x1 = chord.k * chord.t1 ** 2;
chord.x2 = chord.k * chord.t2 ** 2;
chord.slope = (chord.x2 - chord.x1) / (chord.t2 - chord.t1);
chord.tang = 2 * chord.k * chord.t2; // slope at t2 (dx/dt = 2kt)

const ex4 = { v1: 18, v2: 72, t: 6 };
ex4.u = R6(ex4.v1 / 3.6);
ex4.w = R6(ex4.v2 / 3.6);
ex4.a = (ex4.w - ex4.u) / ex4.t;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex5 = { a: 1.2, v: R6(72 / 3.6) };
ex5.t = ex5.v / ex5.a;
ex5.s = ex5.v ** 2 / (2 * ex5.a);
ex5.s2 = 0.5 * ex5.v * ex5.t;
const ex6 = { t: 3.0 };
ex6.h = 0.5 * g * ex6.t ** 2;
ex6.v = g * ex6.t;
const ex7 = { u: 19.6 };
ex7.tup = ex7.u / g;
ex7.H = ex7.u ** 2 / (2 * g);
ex7.T = 2 * ex7.tup;
ex7.y3 = ex7.u * 3 - 0.5 * g * 9;
ex7.v3 = ex7.u - g * 3;
const ex8 = { v: G.STOP_DATA.speeds[1], tr: G.STOP_DATA.tr, a: G.STOP_DATA.a };
ex8.dr = ex8.v * ex8.tr;
ex8.db = ex8.v ** 2 / (2 * ex8.a);
ex8.tot = ex8.dr + ex8.db;
ex8.v2 = 2 * ex8.v;
ex8.dr2 = ex8.v2 * ex8.tr;
ex8.db2 = ex8.v2 ** 2 / (2 * ex8.a);
ex8.tot2 = ex8.dr2 + ex8.db2;
const car = { knots: [[0, 0], [10, 20], [30, 20], [35, 0]] };
car.f = pwl(car.knots);
car.s1 = 0.5 * 10 * 20;
car.s2 = 20 * 20;
car.s3 = 0.5 * 5 * 20;
car.tot = car.s1 + car.s2 + car.s3;
car.avg = car.tot / 35;
car.a1 = 20 / 10;
car.a3 = -20 / 5;
const tro = { u: 6, a: -2, T: 5 };
tro.tstop = -tro.u / tro.a;
tro.up = (tro.u * tro.tstop) / 2;
tro.vend = tro.u + tro.a * tro.T;
tro.down = 0.5 * (tro.T - tro.tstop) * Math.abs(tro.vend);
tro.disp = tro.up - tro.down;
tro.path = tro.up + tro.down;
tro.vbar = tro.disp / tro.T;
tro.sbar = tro.path / tro.T;
const jr = { knots: [[0, 0], [20, 60], [35, 60], [65, 0]] };

export const EX = { ex1, ex2, cub, chord, ex4, ex5, ex6, ex7, ex8, car, tro, jr };
export const NUMCHECK = {
  cubPathNumeric: pathLength(cub.x, 0, cub.T),
  carAreaNumeric: integ(car.f, 0, 35),
  troDispNumeric: integ((t) => tro.u + tro.a * t, 0, tro.T),
  cubVNumeric: deriv(cub.x, 2.4),
};

// ---------------------------------------------------------------- visuals
export const V = {
  frame: svgV(G.FRAME, 'A position axis along a railway line with the station as origin, a signal post at minus 200 metres and the front of a train at plus 450 metres', 'Positions are signed distances from the origin.'),
  path: svgV(G.PATH, 'A rider goes 1200 metres east and 450 metres back west: path length 1650 metres, displacement 750 metres east', 'Path length is the whole route; displacement joins start to finish.'),
  strobe: svgV(G.STROBE, 'Strobe picture of a ball dropped from rest, once per second, with distances fallen and speeds', 'Equal time gaps, unequal distances: the ball is speeding up.'),
  stop: svgV(G.STOP, 'Stopping distances to scale at 10, 20 and 30 metres per second: reaction distance plus braking distance', 'Reaction distance grows with v, braking distance with v².'),
  vtarea: svgV(G.VTAREA, 'A straight velocity-time line from 4 to 16 metres per second in 6 seconds, with a rectangle and a triangle under it', 'Area under the line = displacement = 60 m.'),
  shapes: svgV(G.SHAPES, 'Six position-time graph shapes and what each says about the motion', 'Read the slope: zero, constant, increasing, decreasing.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotChord = plot(
  {
    x: ax('time t (s)', 0, 4.5),
    y: ax('position x (m)', 0, 32),
    functions: [
      { expr: `${chord.k}*x^2`, label: `x = ${chord.k} t² (m)`, domain: [0, 4.5] },
      { expr: `${chord.slope}*x - ${R6(chord.slope * chord.t1 - chord.x1)}`, label: `chord, t = ${chord.t1} s to ${chord.t2} s: slope ${chord.slope} m/s`, domain: [0.4, 3.6] },
      { expr: `${chord.tang}*x - ${R6(chord.tang * chord.t2 - chord.x2)}`, label: `tangent at t = ${chord.t2} s: slope ${chord.tang} m/s`, domain: [1.8, 4.2] },
    ],
  },
  'Position-time curve with the chord between one and three seconds, whose slope is the average velocity of 6 metres per second, and the tangent at three seconds, whose slope is the instantaneous velocity of 9 metres per second',
  'The chord gives the average velocity over an interval; the tangent gives the velocity at one instant.',
);
export const plotCubic = plot(
  {
    x: ax('time t (s)', 0, 3.2),
    y: ax('position x (m)', 0, 12),
    functions: [{ expr: `${cub.a}*x^3 - ${-cub.b}*x^2 + ${cub.c}*x`, label: 'x = 2t³ − 9t² + 12t (m)', domain: [0, 3.2] }],
    vlines: [{ x: cub.r1, label: `v = 0 at t = ${cub.r1} s (x = ${cub.x1} m)`, dashed: true }, { x: cub.r2, label: `v = 0 at t = ${cub.r2} s (x = ${cub.x2} m)`, dashed: true }],
  },
  'Position-time graph of a particle that moves forward to 5 metres at one second, turns back to 4 metres at two seconds, then moves forward again to 9 metres at three seconds',
  'The tangent is horizontal at the two turning instants.',
);
export const plotVcubic = plot(
  {
    x: ax('time t (s)', 0, 3.2),
    y: ax('velocity v (m/s)', -3, 16),
    functions: [{ expr: `${3 * cub.a}*x^2 - ${-2 * cub.b}*x + ${cub.c}`, label: 'v = 6t² − 18t + 12 (m/s)', domain: [0, 3.2] }],
    hlines: [{ y: 0, label: 'v = 0', dashed: true }],
  },
  'Velocity-time graph of the same particle: the velocity falls from 12 metres per second, crosses zero at one second, reaches a minimum of minus 1.5 metres per second at 1.5 seconds and rises again, crossing zero at two seconds',
  'The slope of this graph is the acceleration; it is zero at the minimum.',
);
export const plotThrowY = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('height y (m)', 0, 22),
    functions: [{ expr: `${ex7.u}*x - ${0.5 * g}*x^2`, label: `y = ${ex7.u} t − ${0.5 * g} t² (m)`, domain: [0, 4] }],
    vlines: [{ x: ex7.tup, label: `top: t = ${ex7.tup} s, y = ${dec(ex7.H, 3)} m`, dashed: true }],
  },
  'Height-time graph of a ball thrown straight up at 19.6 metres per second: a symmetric arch with the top at 2 seconds and 19.6 metres, back at the starting height at 4 seconds',
  'Symmetric arch: equal times up and down.',
);
export const plotThrowV = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('velocity v (m/s)', -22, 22),
    functions: [{ expr: `${ex7.u} - ${g}*x`, label: `v = ${ex7.u} − ${g} t (m/s)`, domain: [0, 4] }],
    hlines: [{ y: 0, label: 'v = 0 at the top', dashed: true }],
  },
  'Velocity-time graph of the same ball: a straight line of constant slope minus 9.8 metres per second squared, from plus 19.6 down to minus 19.6 metres per second',
  'One straight line: the acceleration is −9.8 m s⁻² throughout, up and down.',
);
export const plotCar = plot(
  {
    x: ax('time t (s)', 0, 37),
    y: ax('velocity v (m/s)', 0, 24),
    series: [{ label: 'car: speeds up, cruises, brakes', kind: 'line', points: car.knots }],
  },
  'Velocity-time graph of a car on a straight road: a straight rise from zero to 20 metres per second in 10 seconds, a flat part to 30 seconds, then a straight fall to zero at 35 seconds',
  'Three straight pieces: slopes +2.0, 0 and −4.0 m s⁻².',
);
export const plotTrolley = plot(
  {
    x: ax('time t (s)', 0, 5.2),
    y: ax('velocity v (m/s)', -5, 7),
    functions: [{ expr: `${tro.u} - ${-tro.a}*x`, label: `v = ${tro.u} − ${-tro.a} t (m/s)`, domain: [0, tro.T] }],
    hlines: [{ y: 0, label: 'v = 0', dashed: true }],
  },
  'Velocity-time graph of a trolley that goes up a ramp and comes back: the line falls from 6 metres per second, crosses zero at 3 seconds and reaches minus 4 metres per second at 5 seconds',
  'Area above the axis counts forward, area below counts backward.',
);
export const plotJourney = plot(
  {
    x: ax('time t (s)', 0, 70),
    y: ax('position x (m)', 0, 70),
    series: [{ label: 'x–t graph of a walker', kind: 'line', points: jr.knots }],
  },
  'Position-time graph of a walker: moves away at a steady 3 metres per second for 20 seconds, stands still for 15 seconds, then returns to the start at a steady 2 metres per second',
  'Slopes +3, 0 and −2 m/s.',
);

// ---------------------------------------------------------------- tables
const T1 = table(
  ['Quantity', 'Definition', 'Sign / kind', 'Can it be zero while the body moves?'],
  [
    ['Distance (path length)', 'Total length of the route', 'Never negative', 'No'],
    ['Displacement', 'Final position − initial position', 'Signed along the axis', 'Yes (a round trip)'],
    ['Average speed', 'Path length ÷ time', 'Never negative', 'No'],
    ['Average velocity', 'Displacement ÷ time', 'Signed along the axis', 'Yes (a round trip)'],
  ],
  'Table comparing distance, displacement, average speed and average velocity: definition, sign and whether it can be zero for a moving body',
);
const T2 = table(
  ['Leg', 'Distance (km)', 'Speed (km/h)', 'Time (h)'],
  [
    ['First half', String(ex2.d), String(ex2.v1), dec(ex2.t1, 2)],
    ['Second half', String(ex2.d), String(ex2.v2), dec(ex2.t2, 2)],
    ['Whole trip', String(2 * ex2.d), `average = ${dec(ex2.avg, 3)}`, dec(ex2.t1 + ex2.t2, 2)],
  ],
  'Table of the two halves of a bus journey: distance, speed and time for each half and for the whole trip',
);
const T3 = table(
  ['Velocity', 'Acceleration', 'The body is'],
  [
    ['+', '+', 'speeding up, moving along +x'],
    ['+', '−', 'slowing down, moving along +x'],
    ['−', '−', 'speeding up, moving along −x'],
    ['−', '+', 'slowing down, moving along −x'],
    ['0 at this instant', 'not zero', 'about to move or to turn round'],
  ],
  'Table of the signs of velocity and acceleration and whether the body is speeding up or slowing down',
);
const T4 = table(
  ['Speed in km/h', 'Speed in m/s'],
  [[String(ex4.v1), dec(ex4.u, 3)], [String(ex4.v2), dec(ex4.w, 3)], ['divide by 3.6', 'multiply by 3.6']],
  'Table converting speeds between kilometres per hour and metres per second',
);
const T5 = table(
  ['Equation', 'Missing variable', 'Use when you know'],
  [
    ['v = u + a t', 'displacement s', 'u, a and t (or v)'],
    ['s = u t + ½ a t²', 'final velocity v', 'u, a and t'],
    ['v² = u² + 2 a s', 'time t', 'u, a and s'],
    ['s = ½ (u + v) t', 'acceleration a', 'u, v and t'],
  ],
  'Table of the equations for uniformly accelerated motion, the variable each lacks and when to use it',
);
const T6 = table(
  ['Starting point', 'Integrate once', 'Integrate twice'],
  [
    ['a = dv/dt = constant', 'v = u + a t', 'x = x₀ + u t + ½ a t²'],
    ['a = v dv/dx', 'v² = u² + 2 a (x − x₀)', '—'],
  ],
  'Table showing how the equations of uniformly accelerated motion follow by integrating the constant acceleration',
);
const T7 = table(
  ['Quantity', 'Where on the graph', 'Graph'],
  [
    ['Velocity', 'Slope of the tangent', 'x–t'],
    ['Acceleration', 'Slope of the tangent', 'v–t'],
    ['Displacement', 'Area between the curve and the t-axis (signed)', 'v–t'],
    ['Change in velocity', 'Area between the curve and the t-axis (signed)', 'a–t'],
  ],
  'Table of what the slope and the area of motion graphs represent',
);
const T8 = table(
  ['Ruler fell (cm)', 'Reaction time (s)'],
  [10, 15, 20, 25, 30].map((cm) => [String(cm), dec(Math.sqrt((2 * (cm / 100)) / g), 3)]),
  'Table of reaction time against the distance a dropped ruler falls before it is caught, from the relation distance equals half g t squared',
);
export const TABLES = { T1, T2, T3, T4, T5, T6, T7, T8 };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Motion in a Straight Line — Part 1: Position, displacement, velocity and acceleration',
  goals: [
    'Describe position along a straight line in a chosen frame of reference',
    'Distinguish path length from displacement and speed from velocity',
    'Use average and instantaneous velocity and acceleration, including as slopes and derivatives',
  ],
  slides: [
    sl('title', 'Motion in a Straight Line', {
      b: 'Part 1 — how to say where something is, how far it has gone, and how fast its position is changing.',
      v: V.frame,
      n: 'A goods train, a delivery rider and a falling coconut all move, but to describe any of them we must first say where it is, measured from what, and in which direction. In this part we set up a position axis, separate the length of a path from the displacement, and meet velocity and acceleration as rates of change.',
    }),
    sl('concept', 'Frame of reference and position', {
      b: 'Motion is always described **relative to a frame of reference**: an origin, an axis and a clock.',
      ul: [
        'Along a straight line we need one axis: choose an **origin** O and a **positive direction**.',
        'The **position** x of a body is its signed distance from O; it is negative on the other side of O.',
        'Moving the origin changes every position but not the separation between two positions.',
        'A body at rest in one frame may move in another, so rest and motion are **relative**.',
      ],
      v: V.frame,
      n: 'Pick an origin, such as a railway station, and a positive direction along the track. The position of anything is then its signed distance from the origin: positive on one side, negative on the other. Shift the origin and every position changes, but the gap between two positions stays the same. Whether something is at rest or moving also depends on the frame we choose.',
    }),
    sl('diagram', 'Path length and displacement', {
      b: 'A body leaves O, goes to A and comes back to B.',
      ul: [
        '**Path length** (distance): the total length of the route actually covered. It is a scalar and never decreases.',
        r`**Displacement** $\Delta x = x_2 - x_1$: the signed change of position. It depends only on the end points, not on the route.`,
        r`Always $|\Delta x| \le$ path length; they are equal only if the body never turns back.`,
        'Displacement can be positive, negative or zero; path length is never negative.',
      ],
      v: V.path,
      n: 'Look at the three arrows. The blue and red arrows together are the route the rider really followed, and their lengths add up to the path length. The green arrow runs straight from the start to the finish: that is the displacement. It is shorter than the path because the rider turned back.',
    }),
    sl('example', 'Worked example 1: a delivery rider', {
      b: r`A delivery rider leaves a depot (the origin), rides ${ex1.out} m east to a shop and then ${ex1.back} m back west to a customer. The trip takes 5 min 30 s ($= ${ex1.T}$ s). Find the path length, the displacement, the average speed and the average velocity.`,
      ul: [
        r`Path length $= ${ex1.out} + ${ex1.back} = ${ex1.path}$ m.`,
        r`Displacement $= x_\text{final} - x_\text{initial} = ${ex1.out - ex1.back} - 0 = ${ex1.disp}$ m, towards the east.`,
        r`Average speed $= \dfrac{${ex1.path}}{${ex1.T}} = ${dec(ex1.vs, 2)}$ m s$^{-1}$.`,
        r`Average velocity $= \dfrac{${ex1.disp}}{${ex1.T}} \approx ${dec(ex1.vv, 3)}$ m s$^{-1}$ east, smaller than the average speed.`,
      ],
      v: V.path,
      n: 'The rider covers twelve hundred metres out and four hundred and fifty back, so the path length is sixteen hundred and fifty metres. But the final position is only seven hundred and fifty metres from the depot, so that is the displacement. Divide each by the three hundred and thirty seconds taken: the average speed is five metres per second, and the average velocity is a smaller number, about two point three metres per second eastwards.',
    }),
    sl('check', 'Quick check: moving the origin', {
      b: 'Choose the correct option.',
      v: V.frame,
      chk: 'origin-mcq',
      n: 'Think about what depends on the choice of origin and what does not.',
    }),
    sl('concept', 'Average velocity and average speed', {
      b: 'Over a time interval from $t_1$ to $t_2$:',
      m: [r`\bar v = \dfrac{\Delta x}{\Delta t} = \dfrac{x_2 - x_1}{t_2 - t_1}`, r`\text{average speed} = \dfrac{\text{path length}}{\Delta t}`],
      ul: [
        'Average velocity carries a sign (its direction along the axis); average speed does not.',
        'Average speed is never smaller than the magnitude of the average velocity.',
        'After a round trip the average velocity is zero but the average speed is not.',
        'SI unit of both: metre per second (m s⁻¹); 1 m s⁻¹ = 3.6 km h⁻¹.',
      ],
      v: T1,
      n: 'Average velocity is displacement divided by the time taken, so it has a sign. Average speed is path length divided by the time taken, so it is never negative. Because the path is at least as long as the displacement, the average speed is never smaller than the size of the average velocity. After a full round trip the displacement is zero, so the average velocity is zero even though the body has been moving all the time.',
    }),
    sl('example', 'Worked example 2: two halves of a journey', {
      b: r`A bus on a highway covers the first half of the distance at $${ex2.v1}$ km h$^{-1}$ and the second half at $${ex2.v2}$ km h$^{-1}$. Find its average speed for the whole trip.`,
      ul: [
        r`Take each half as $${ex2.d}$ km (any value gives the same answer). Time for the first half $= \dfrac{${ex2.d}}{${ex2.v1}} = ${ex2.t1}$ h; for the second half $\dfrac{${ex2.d}}{${ex2.v2}} = ${ex2.t2}$ h.`,
        r`Average speed $= \dfrac{${2 * ex2.d}}{${ex2.t1} + ${ex2.t2}} = \dfrac{${2 * ex2.d}}{${ex2.t1 + ex2.t2}} = ${ex2.avg}$ km h$^{-1}$.`,
        r`Not the arithmetic mean $\dfrac{${ex2.v1} + ${ex2.v2}}{2} = ${ex2.mean}$ km h$^{-1}$: the bus spends more time at the lower speed.`,
      ],
      v: T2,
      n: 'Average speed is total distance over total time, not the average of the two speeds. Choose ninety kilometres for each half. The first half takes three hours, the second takes two hours, so one hundred and eighty kilometres take five hours: thirty six kilometres per hour. The simple mean of the speeds would give a larger answer, because the bus spends more time going slowly.',
    }),
    sl('concept', 'Instantaneous velocity: the slope of the tangent', {
      b: r`Shrink the interval: $v = \lim_{\Delta t \to 0} \dfrac{\Delta x}{\Delta t} = \dfrac{dx}{dt}$.`,
      ul: [
        'On an x–t graph the **chord** between two points has slope equal to the average velocity; the **tangent** at one point has slope equal to the instantaneous velocity.',
        'The sign of v gives the direction; a steeper tangent means a larger speed.',
        'Instantaneous speed is the magnitude |v|; a speedometer reads it.',
        r`For $x = ${chord.k}\,t^2$: $v = \dfrac{dx}{dt} = ${2 * chord.k}\,t$, so $v(${chord.t2}\ \text{s}) = ${chord.tang}$ m s$^{-1}$.`,
      ],
      v: plotChord,
      n: 'On a position time graph, the straight line joining two points, a chord, has a slope equal to the average velocity over that interval. Let the second point slide towards the first and the chord turns into the tangent, whose slope is the velocity at that instant. For this curve the chord from one to three seconds has slope six, and the tangent at three seconds has slope nine metres per second.',
    }),
    sl('example', 'Worked example 3: a particle that turns back', {
      b: r`A particle moves on the x-axis with $x = 2t^3 - 9t^2 + 12t$ (x in m, t in s). For the interval 0 to 3 s find the velocity, the instants of rest, the displacement, the path length, the average velocity and the average speed.`,
      ul: [
        r`$v = \dfrac{dx}{dt} = 6t^2 - 18t + 12 = 6(t-1)(t-2)$, so $v = 0$ at $t = ${cub.r1}$ s and $t = ${cub.r2}$ s.`,
        r`$x(0) = 0$, $x(${cub.r1}) = ${cub.x1}$ m, $x(${cub.r2}) = ${cub.x2}$ m, $x(3) = ${cub.x3}$ m. Displacement $= ${cub.disp}$ m.`,
        r`Path length $= ${cub.x1} + ${cub.x1 - cub.x2} + ${cub.x3 - cub.x2} = ${cub.path}$ m (5 m forward, 1 m back, 5 m forward).`,
        r`Average velocity $= \dfrac{${cub.disp}}{3} = ${dec(cub.vbar, 2)}$ m s$^{-1}$; average speed $= \dfrac{${cub.path}}{3} \approx ${dec(cub.sbar, 3)}$ m s$^{-1}$.`,
      ],
      v: plotCubic,
      n: 'Differentiate the position to get the velocity: six t squared minus eighteen t plus twelve. It vanishes at one second and at two seconds, which are the turning instants. The particle is at five metres after one second, back at four metres after two, and at nine metres after three. So it covers five metres forward, one back, five forward: eleven metres of path for a displacement of only nine.',
    }),
    sl('check', 'Quick check: tangent and chord', {
      b: 'Choose the correct option.',
      v: plotChord,
      chk: 'instv-mcq',
      n: 'Remember which line on the graph gives the velocity at one instant.',
    }),
    sl('concept', 'Acceleration', {
      b: r`Average acceleration $\bar a = \dfrac{\Delta v}{\Delta t}$; instantaneous $a = \dfrac{dv}{dt} = \dfrac{d^2x}{dt^2}$, the slope of the v–t graph.`,
      ul: [
        'SI unit: metre per second squared (m s⁻²); the sign shows the direction along the axis.',
        'The body speeds up when v and a have the same sign, and slows down when they have opposite signs.',
        'v = 0 at an instant does not mean a = 0: a ball at the top of its flight has v = 0 but is still being accelerated.',
        r`For Example 3, $a = \dfrac{dv}{dt} = 12t - 18$: it is $${cub.acc(cub.r1)}$ m s$^{-2}$ when $v = 0$ at $t = ${cub.r1}$ s, zero at $t = ${cub.tmin}$ s where $v$ is least ($${cub.vmin}$ m s$^{-1}$).`,
      ],
      v: plotVcubic,
      n: 'Acceleration is the rate at which velocity changes, the slope of the velocity time graph. When velocity and acceleration point the same way the body speeds up; when they point opposite ways it slows down. Notice on this graph that the velocity is zero at one second, yet the slope there is not zero: the particle is momentarily at rest but its velocity is still changing.',
    }),
    sl('example', 'Worked example 4: a metro train', {
      b: r`A metro train on a straight track speeds up from $${ex4.v1}$ km h$^{-1}$ to $${ex4.v2}$ km h$^{-1}$ in $${ex4.t}$ s. Find its average acceleration in m s$^{-2}$.`,
      ul: [
        r`$${ex4.v1}$ km h$^{-1}$ $= ${ex4.v1} \times \dfrac{1000}{3600} = ${ex4.u}$ m s$^{-1}$ and $${ex4.v2}$ km h$^{-1}$ $= ${ex4.w}$ m s$^{-1}$.`,
        r`$\bar a = \dfrac{\Delta v}{\Delta t} = \dfrac{${ex4.w} - ${ex4.u}}{${ex4.t}} = ${dec(ex4.a, 2)}$ m s$^{-2}$.`,
      ],
      v: T4,
      n: 'Convert the speeds to metres per second first: eighteen kilometres per hour is five metres per second, and seventy two is twenty. The change in velocity is fifteen metres per second in six seconds, so the average acceleration is two and a half metres per second squared.',
    }),
    sl('two-column', 'Speed and velocity at a glance', {
      b: 'Scalar and vector quantities along a line:',
      cols: [
        '**Scalar-like (no direction)**\n- Distance (path length)\n- Average speed\n- Instantaneous speed |v|\n- Never negative',
        '**Signed (direction by sign)**\n- Displacement\n- Average velocity\n- Instantaneous velocity\n- Acceleration',
      ],
      v: T1,
      n: 'In straight line motion, direction is carried by a plus or minus sign. Distance and speed have no direction and are never negative. Displacement, velocity and acceleration are signed. For instantaneous values over a very short interval, speed equals the size of the velocity, but for longer intervals average speed can be larger than the size of the average velocity.',
    }),
    sl('check', 'Quick check: zero velocity', {
      b: 'Judge the assertion and the reason.',
      v: plotVcubic,
      chk: 'zeroacc-ar',
      n: 'Look at the slope of the graph where the velocity touches zero.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Position', 'Signed distance from the chosen origin'],
          ['Displacement', 'Δx = x₂ − x₁; path length ≥ |Δx|'],
          ['Average velocity', 'Δx/Δt; average speed = path length/Δt'],
          ['Instantaneous velocity', 'v = dx/dt: slope of the x–t tangent'],
          ['Acceleration', 'a = dv/dt: slope of the v–t graph'],
          ['Signs', 'Same sign: speeding up; opposite: slowing down'],
        ],
        'Summary table of position, displacement, velocity, speed and acceleration',
      ),
      n: 'To sum up. Position is a signed distance from an origin. Displacement is the change of position and is never longer than the path. Average velocity is displacement over time; average speed is path length over time. Instantaneous velocity is the slope of the position time graph, and acceleration is the slope of the velocity time graph. If velocity and acceleration have the same sign, the body speeds up.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the positive direction before writing a sign; give the direction with every displacement or velocity.',
        'For average speed over two stages use total path ÷ total time, never the mean of two speeds.',
        'Convert km h⁻¹ to m s⁻¹ (divide by 3.6) before using g = 9.8 m s⁻².',
        'Find turning points from v = 0 before computing path length.',
      ],
      v: T3,
      n: 'Always state your positive direction, and give a direction with every displacement and velocity. For two stage journeys, divide the total path by the total time. Convert kilometres per hour to metres per second before mixing with other units. And to find the path length of a particle that may turn back, first find where its velocity is zero.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Motion in a Straight Line — Part 2: Uniform acceleration, free fall and motion graphs',
  goals: [
    'Derive and apply the equations of motion for uniform acceleration, graphically and by calculus',
    'Analyse free fall, a vertical throw and stopping distance with reaction time',
    'Read slopes and areas of position–time, velocity–time and acceleration–time graphs',
  ],
  slides: [
    sl('title', 'Uniform acceleration and motion graphs', {
      b: 'Part 2 — equations for constant acceleration, falling bodies, stopping a car, and what graphs tell us.',
      v: V.vtarea,
      n: 'Many motions have an acceleration that stays constant, a car pulling away smoothly or a stone falling from a bridge. For these we can write simple equations that connect position, velocity, acceleration and time. We derive them two ways, apply them to falling bodies and to stopping a vehicle, and finish by reading motion graphs.',
    }),
    sl('concept', 'The equations of uniformly accelerated motion', {
      b: 'For constant acceleration $a$, initial velocity $u$, final velocity $v$, displacement $s$ in time $t$:',
      m: [r`v = u + at`, r`s = ut + \tfrac{1}{2}at^2`, r`v^2 = u^2 + 2as`],
      ul: [
        'Choose the equation that **lacks** the quantity you neither know nor want.',
        r`A useful fourth form: $s = \tfrac{1}{2}(u + v)t$ (average velocity × time).`,
        'They hold only while the acceleration is constant; for a changing acceleration, integrate.',
        'Signs matter: take one direction as positive and use signed u, v, a and s.',
      ],
      v: T5,
      n: 'Here are the three equations of motion for constant acceleration. The first has no displacement in it, the second has no final velocity, and the third has no time. Pick the one that leaves out the quantity you neither know nor want. They only hold while the acceleration is constant, and every quantity carries a sign.',
    }),
    sl('diagram', 'Deriving the equations from the v–t graph', {
      b: 'Constant acceleration makes the v–t graph a straight line from $u$ to $v$.',
      ul: [
        r`Slope $= a = \dfrac{v - u}{t}$, so $v = u + at$.`,
        r`Area under the line = displacement = rectangle + triangle $= ut + \tfrac{1}{2}(v - u)t = ut + \tfrac{1}{2}at^2$.`,
        r`The same area is $\tfrac{1}{2}(u+v)t$; eliminate $t = \dfrac{v-u}{a}$ to get $v^2 = u^2 + 2as$.`,
        `Check with the picture: u = ${G.VTAREA_DATA.u} m s⁻¹, v = ${G.VTAREA_DATA.v} m s⁻¹, t = ${G.VTAREA_DATA.t} s gives a = ${(G.VTAREA_DATA.v - G.VTAREA_DATA.u) / G.VTAREA_DATA.t} m s⁻² and s = ${((G.VTAREA_DATA.u + G.VTAREA_DATA.v) / 2) * G.VTAREA_DATA.t} m.`,
      ],
      v: V.vtarea,
      n: 'The slope of the line is the acceleration, so the final velocity is the initial velocity plus acceleration times time. The area under the line is the displacement. It splits into a rectangle of height u and a triangle on top, and adding them gives u t plus a half a t squared. Eliminating the time between the first two results gives v squared equals u squared plus two a s.',
    }),
    sl('concept', 'Deriving the equations by calculus', {
      b: r`Start from $a = \dfrac{dv}{dt}$ with $a$ constant and integrate.`,
      m: [r`\int_u^v dv = \int_0^t a\,dt \;\Rightarrow\; v = u + at`, r`\int_{x_0}^{x} dx = \int_0^t (u + at)\,dt \;\Rightarrow\; x - x_0 = ut + \tfrac{1}{2}at^2`],
      ul: [
        r`Write $a = \dfrac{dv}{dt} = v\dfrac{dv}{dx}$, so $a\,dx = v\,dv$; integrating from $x_0$ to $x$ gives $a(x - x_0) = \tfrac{1}{2}(v^2 - u^2)$.`,
        'If a depends on time, say a = 6 − 2t, the same steps give v and x without the constant-acceleration formulae.',
      ],
      v: T6,
      n: 'Calculus gives the same equations. Integrate acceleration with respect to time to get velocity, and integrate velocity to get position. For the third equation, write acceleration as v times dv by dx, rearrange to a d x equals v d v, and integrate. If the acceleration changes with time, this method still works, but the three formulae do not.',
    }),
    sl('example', 'Worked example 5: a metro leaves the station', {
      b: r`A metro train starts from rest and accelerates uniformly at $${ex5.a}$ m s$^{-2}$ until it reaches $72$ km h$^{-1}$. Find the time taken and the distance covered.`,
      ul: [
        r`$u = 0$, $v = 72$ km h$^{-1}$ $= ${ex5.v}$ m s$^{-1}$, $a = ${ex5.a}$ m s$^{-2}$.`,
        r`$t = \dfrac{v - u}{a} = \dfrac{${ex5.v} - 0}{${ex5.a}} \approx ${dec(ex5.t, 3)}$ s.`,
        r`$s = \dfrac{v^2 - u^2}{2a} = \dfrac{${ex5.v ** 2}}{${2 * ex5.a}} \approx ${dec(ex5.s, 3)}$ m.`,
        r`Check: $s = \tfrac{1}{2}(u + v)t \approx \tfrac{1}{2} \times ${ex5.v} \times ${dec(ex5.t, 4)} \approx ${dec(ex5.s2, 3)}$ m.`,
      ],
      v: T4,
      n: 'First convert seventy two kilometres per hour to twenty metres per second. The time is the change in velocity over the acceleration, twenty over one point two, about sixteen point seven seconds. The distance is twenty squared over two times one point two, about one hundred and sixty seven metres. The average velocity times time gives the same distance, a useful check.',
    }),
    sl('check', 'Quick check: choosing an equation', {
      b: 'Choose the equation that leaves out the unknown you do not need, then compute.',
      v: T5,
      chk: 'bus-num',
      n: 'Write down what you know, then choose the equation without the quantity you do not need.',
    }),
    sl('concept', 'Free fall and g', {
      b: r`Near the Earth's surface, with air resistance negligible, every body falls with the same downward acceleration $g = 9.8$ m s$^{-2}$.`,
      ul: [
        'Free fall means only gravity acts: a body dropped, thrown up or thrown down has the same acceleration.',
        'Dropped from rest: $v = gt$, $y = \\tfrac{1}{2}gt^2$, $v^2 = 2gy$; successive distances in equal seconds are in the ratio 1 : 3 : 5 : 7 …',
        'Heavy and light bodies reach the ground together in a vacuum; a feather lags in air only because of air resistance.',
        'Take up as positive for a throw upward: then a = −g (and for a drop, with down positive, a = +g).',
      ],
      v: V.strobe,
      n: 'Once air resistance is ignored, everything falls with the same acceleration of nine point eight metres per second every second. A ball dropped from rest gains nine point eight metres per second each second, and the gaps between the pictures grow in the ratio one, three, five, seven. A feather falls slowly in air only because the air pushes back on it.',
    }),
    sl('example', 'Worked example 6: a stone dropped from a bridge', {
      b: r`A stone dropped from rest from a railway bridge takes $${ex6.t}$ s to hit the river. Using $g = 9.8$ m s$^{-2}$, find the height of the bridge and the speed of impact.`,
      ul: [
        r`$u = 0$, $a = g$ (down is positive), $t = ${ex6.t}$ s.`,
        r`$h = \tfrac{1}{2}gt^2 = \tfrac{1}{2} \times 9.8 \times ${ex6.t ** 2} = ${dec(ex6.h, 3)}$ m.`,
        r`$v = gt = 9.8 \times ${ex6.t} = ${dec(ex6.v, 3)}$ m s$^{-1}$ (about ${dec(ex6.v * 3.6, 3)} km h$^{-1}$).`,
      ],
      v: V.strobe,
      n: 'Take downward as positive, with the initial velocity zero. The height is half g t squared: half of nine point eight times nine, which is forty four point one metres. The speed at impact is g times t, twenty nine point four metres per second, which is over a hundred kilometres per hour.',
    }),
    sl('concept', 'Going up and coming down', {
      b: r`A ball thrown straight up at $u$: take upward as positive, so $a = -g$ throughout.`,
      ul: [
        r`Rises for $t_\text{up} = \dfrac{u}{g}$ to a height $H = \dfrac{u^2}{2g}$; at the top $v = 0$ but $a = -g$.`,
        'It returns to the launch height after $2u/g$ with speed $u$ downward: equal times up and down, equal speeds at equal heights.',
        r`Position $y = ut - \tfrac{1}{2}gt^2$ is a symmetric arch; velocity $v = u - gt$ is a single straight line of slope $-g$.`,
      ],
      v: plotThrowY,
      n: 'Throw a ball upward and take up as positive. Its acceleration is minus g all the way, on the way up, at the very top and on the way down. The height against time graph is a symmetric arch, so the climb takes exactly as long as the descent, and the ball comes back to the launch height with the speed it started with.',
    }),
    sl('example', 'Worked example 7: a ball thrown upward', {
      b: r`A ball is thrown straight up at $${ex7.u}$ m s$^{-1}$ ($g = 9.8$ m s$^{-2}$). Find the time to the top, the maximum height, the total time of flight, and its height and velocity at $t = 3$ s.`,
      ul: [
        r`$t_\text{up} = \dfrac{u}{g} = \dfrac{${ex7.u}}{9.8} = ${ex7.tup}$ s; $H = \dfrac{u^2}{2g} = \dfrac{${dec(ex7.u ** 2, 5)}}{19.6} \approx ${dec(ex7.H, 3)}$ m.`,
        r`Time of flight $= 2 \times ${ex7.tup} = ${ex7.T}$ s; it lands with speed $${ex7.u}$ m s$^{-1}$ downward.`,
        r`At $t = 3$ s: $y = ${ex7.u} \times 3 - \tfrac{1}{2} \times 9.8 \times 9 = ${dec(ex7.y3, 3)}$ m and $v = ${ex7.u} - 9.8 \times 3 = ${dec(ex7.v3, 3)}$ m s$^{-1}$ (moving down, 1 s after the top).`,
      ],
      v: plotThrowV,
      n: 'The ball rises for twenty over nine point eight, which is two seconds, and reaches a height of nineteen point six metres. The whole flight takes four seconds. After three seconds it is on the way down, fourteen point seven metres up, and its velocity is minus nine point eight metres per second, exactly what we expect one second after the top.',
    }),
    sl('check', 'Quick check: up and down', {
      b: 'Choose the correct option.',
      v: plotThrowY,
      chk: 'rise-mcq',
      n: 'Use the symmetry of the arch.',
    }),
    sl('concept', 'Stopping distance and reaction time', {
      b: 'A driver sees danger, reacts, then brakes: **stopping distance = reaction distance + braking distance**.',
      ul: [
        r`Reaction distance $= v t_r$: the car moves at steady speed $v$ during the reaction time $t_r$ (about 0.2 s to 1 s).`,
        r`Braking distance $= \dfrac{v^2}{2a}$ for uniform deceleration $a$: it grows with the **square** of the speed.`,
        'Doubling the speed doubles the reaction distance but multiplies the braking distance by 4.',
        r`Reaction time can be measured by catching a dropped ruler: $t = \sqrt{2d/g}$ for a fall of $d$.`,
      ],
      v: V.stop,
      n: 'Stopping a car has two parts. During the driver’s reaction time the car keeps going at its full speed, and the distance is speed times reaction time. Then the brakes slow it, and the braking distance is v squared over two a. Double the speed and the braking distance becomes four times as long. That is why speed limits matter near schools.',
    }),
    sl('example', 'Worked example 8: stopping from 72 km/h', {
      b: r`A car at $72$ km h$^{-1}$ ($${ex8.v}$ m s$^{-1}$) has a driver with reaction time $${ex8.tr}$ s, and the brakes give a deceleration of $${ex8.a}$ m s$^{-2}$. Find the stopping distance. What if the speed were doubled?`,
      ul: [
        r`Reaction distance $= vt_r = ${ex8.v} \times ${ex8.tr} = ${ex8.dr}$ m.`,
        r`Braking distance $= \dfrac{v^2}{2a} = \dfrac{${ex8.v ** 2}}{${2 * ex8.a}} = ${ex8.db}$ m.`,
        r`Stopping distance $= ${ex8.dr} + ${ex8.db} = ${ex8.tot}$ m.`,
        r`At $${ex8.v2}$ m s$^{-1}$: $${ex8.dr2} + ${ex8.db2} = ${ex8.tot2}$ m, about ${dec(ex8.tot2 / ex8.tot, 2)} times as much.`,
      ],
      v: V.stop,
      n: 'At twenty metres per second and a reaction time of point six seconds, the car travels twelve metres before the brakes even start. Braking from twenty metres per second at five metres per second squared takes forty metres. The total is fifty two metres. Double the speed and the total jumps to one hundred and eighty four metres, about three and a half times more.',
    }),
    sl('check', 'Quick check: stopping distance', {
      b: 'Compute the stopping distance.',
      v: V.stop,
      chk: 'stopdist-num',
      n: 'Add the reaction distance to the braking distance.',
    }),
    sl('concept', 'Reading motion graphs: slope and area', {
      b: 'A graph is a picture of the motion: read **slopes** and **areas**.',
      ul: [
        'x–t graph: slope = velocity; horizontal = at rest; straight = uniform velocity; curved = changing velocity.',
        'v–t graph: slope = acceleration; area (signed) between the curve and the t-axis = displacement; area above the axis counts forward, below counts backward.',
        'a–t graph: area (signed) = change in velocity.',
        'A graph shows motion along a line against time; it is not a picture of the path in space.',
      ],
      v: V.shapes,
      n: 'On a position time graph, the slope is the velocity: a horizontal line means rest, a straight sloping line means constant velocity, and a curve means the velocity is changing. On a velocity time graph the slope is the acceleration and the signed area under the curve is the displacement. Area above the axis counts forwards and area below counts backwards.',
    }),
    sl('example', 'Worked example 9: a car on a straight road', {
      b: r`A car's velocity rises uniformly from 0 to $20$ m s$^{-1}$ in $10$ s, stays constant for $20$ s, then falls uniformly to zero in $5$ s. Find the accelerations, the distance covered and the average speed.`,
      ul: [
        r`Accelerations (slopes): $\dfrac{20 - 0}{10} = ${dec(car.a1, 2)}$ m s$^{-2}$, then $0$, then $\dfrac{0 - 20}{5} = ${car.a3}$ m s$^{-2}$.`,
        r`Areas: $\tfrac{1}{2} \times 10 \times 20 = ${car.s1}$ m; $20 \times 20 = ${car.s2}$ m; $\tfrac{1}{2} \times 5 \times 20 = ${car.s3}$ m.`,
        r`Distance $= ${car.s1} + ${car.s2} + ${car.s3} = ${car.tot}$ m; average speed $= \dfrac{${car.tot}}{35} \approx ${dec(car.avg, 3)}$ m s$^{-1}$.`,
      ],
      v: plotCar,
      n: 'The three slopes are plus two, zero and minus four metres per second squared. The areas are a triangle of one hundred metres, a rectangle of four hundred metres and a triangle of fifty metres, so the car covers five hundred and fifty metres in thirty five seconds. Dividing gives an average speed of about fifteen point seven metres per second.',
    }),
    sl('example', 'Worked example 10: velocity changes sign', {
      b: r`A trolley is pushed up a ramp at $${tro.u}$ m s$^{-1}$ and has a constant acceleration of $${tro.a}$ m s$^{-2}$ along the ramp. Using the graph, find the displacement and the path length in the first $${tro.T}$ s.`,
      ul: [
        r`$v = 0$ at $t = \dfrac{${tro.u}}{${-tro.a}} = ${tro.tstop}$ s. Area above the axis: $\tfrac{1}{2} \times ${tro.tstop} \times ${tro.u} = ${tro.up}$ m (up the ramp).`,
        r`At $t = ${tro.T}$ s, $v = ${tro.u} + (${tro.a})(${tro.T}) = ${tro.vend}$ m s$^{-1}$. Area below the axis: $\tfrac{1}{2} \times ${tro.T - tro.tstop} \times ${-tro.vend} = ${tro.down}$ m (down the ramp).`,
        r`Displacement $= ${tro.up} - ${tro.down} = ${tro.disp}$ m; path length $= ${tro.up} + ${tro.down} = ${tro.path}$ m.`,
        r`Average velocity $= \dfrac{${tro.disp}}{${tro.T}} = ${dec(tro.vbar, 2)}$ m s$^{-1}$; average speed $= \dfrac{${tro.path}}{${tro.T}} = ${dec(tro.sbar, 2)}$ m s$^{-1}$.`,
      ],
      v: plotTrolley,
      n: 'The trolley slows, stops after three seconds, and then rolls back. The triangle above the axis is nine metres up the ramp. The triangle below the axis, from three to five seconds, is four metres back down. So the displacement is nine minus four, five metres, while the path length is nine plus four, thirteen metres.',
    }),
    sl('check', 'Quick check: matching graphs', {
      b: 'Match each x–t shape with the motion it describes.',
      v: V.shapes,
      chk: 'xtshape-match',
      n: 'Think about what the slope is doing in each shape.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Uniform acceleration', 'v = u + at; s = ut + ½at²; v² = u² + 2as'],
          ['Free fall', 'a = g = 9.8 m s⁻² downward; same for all bodies without air resistance'],
          ['Up and down', 'Time up = time down = u/g; H = u²/2g'],
          ['Stopping distance', 'vt_r + v²/2a; braking part grows as v²'],
          ['v–t graph', 'Slope = a; signed area = displacement'],
          ['x–t graph', 'Slope = v; horizontal = at rest'],
        ],
        'Summary table of the equations of uniform acceleration, free fall, stopping distance and motion graphs',
      ),
      n: 'To sum up. For constant acceleration use v equals u plus a t, s equals u t plus half a t squared, and v squared equals u squared plus two a s. A freely falling body has acceleration nine point eight metres per second squared downward. Stopping distance is reaction distance plus braking distance, and the braking part grows with the square of the speed. On graphs, slopes give rates and signed areas give changes.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'List u, v, a, s, t with signs; choose the equation that lacks the unknown you do not need.',
        'For a throw upward say "take up as positive, a = −g"; the same equations then cover the whole flight.',
        'For graphs: area = displacement only on a v–t graph; split the area at each sign change for path length.',
        'In derivations, state clearly that a is constant.',
      ],
      v: T7,
      n: 'List what you know with signs, then pick the equation that lacks the unknown you do not need. For vertical motion take one direction as positive and use minus g for upward positive. On graphs, remember which quantity the slope and the area give. When a velocity time graph crosses the axis, split the area there to find the path length. And in any derivation, say that the acceleration is constant.',
    }),
  ],
});
