// ISC 11 ch02 Motion in a Straight Line — two decks: Part 1 (t01, t02, acceleration from t03) frame of reference, path length,
// velocity, elementary calculus, acceleration as dv/dt; Part 2 (t03 graphs, t04, t05) motion graphs, the equations of uniformly
// accelerated motion by graphical, calculus and analytical methods, and motion under gravity. Every number and every graph is
// computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, deriv, integ, pwl, root, pathLength } from './phys.mjs';
import * as G from './svgs.mjs';

const R6 = (x) => Math.round(x * 1e6) / 1e6;

// ---------------------------------------------------------------- number words for narration (TTS-safe)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function below1000(n) {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (h) parts.push(`${ONES[h]} hundred`);
  if (rest) {
    const ten = rest < 20 ? ONES[rest] : TENS[Math.floor(rest / 10)] + (rest % 10 ? ` ${ONES[rest % 10]}` : '');
    parts.push(h ? `and ${ten}` : ten);
  }
  return parts.join(' ');
}
/** Number in words: integers up to 999999, decimals read digit by digit ("nine point eight"), negatives "minus". */
export function W(x) {
  if (x < 0) return `minus ${W(-x)}`;
  const s = String(R6(x));
  const [ip, fp] = s.split('.');
  let n = Number(ip);
  let out;
  if (n === 0) out = 'zero';
  else {
    const th = Math.floor(n / 1000);
    const rest = n % 1000;
    out = [th ? `${below1000(th)} thousand` : '', rest ? (th && rest < 100 ? `and ${below1000(rest)}` : below1000(rest)) : ''].filter(Boolean).join(' ');
  }
  if (fp) out += ` point ${[...fp].map((d) => ONES[Number(d)]).join(' ')}`;
  return out;
}

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { out: G.PATH_DATA.A, back: G.PATH_DATA.A - G.PATH_DATA.B, T: 250 };
ex1.path = ex1.out + ex1.back;
ex1.disp = ex1.out - ex1.back;
ex1.vs = ex1.path / ex1.T;
ex1.vv = ex1.disp / ex1.T;

const ex2 = { d: 120, v1: 40, v2: 60 };
ex2.t1 = ex2.d / ex2.v1;
ex2.t2 = ex2.d / ex2.v2;
ex2.avg = (2 * ex2.d) / (ex2.t1 + ex2.t2);
ex2.mean = (ex2.v1 + ex2.v2) / 2;

// x = 4t³ − 3t² + 2t + 6
const pol = { a: 4, b: -3, c: 2, d: 6 };
pol.x = (t) => pol.a * t ** 3 + pol.b * t ** 2 + pol.c * t + pol.d;
pol.v = (t) => 3 * pol.a * t ** 2 + 2 * pol.b * t + pol.c;
pol.acc = (t) => 6 * pol.a * t + 2 * pol.b;
pol.t0 = 2;
pol.v0 = pol.v(pol.t0);
pol.a0 = pol.acc(pol.t0);
pol.t1 = 1;
pol.t2 = 3;
pol.avg = (pol.x(pol.t2) - pol.x(pol.t1)) / (pol.t2 - pol.t1);

// trig, exponential, logarithm (t in s, angles in rad)
const trg = { A: 5, t: Math.PI / 3 };
trg.v = trg.A * Math.cos(trg.t);
trg.a = -trg.A * Math.sin(trg.t);
const exq = { k: 2, t: 1 };
exq.v = exq.k * Math.exp(exq.t);
const lgq = { k: 3, t: 2 };
lgq.v = lgq.k / lgq.t;
lgq.a = -lgq.k / lgq.t ** 2;

// v = 3t² + 4t
const itg = { p: 3, q: 4, t1: 1, t2: 3, x0: 5, tt: 2 };
itg.F = (t) => itg.p * (t ** 3 / 3) + itg.q * (t ** 2 / 2);
itg.disp = R6(itg.F(itg.t2) - itg.F(itg.t1));
itg.xt = (t) => itg.F(t) + itg.x0;
itg.x2 = R6(itg.xt(itg.tt));

// x = t³ − 6t² + 9t
const cub = { a: 1, b: -6, c: 9, T: 4 };
cub.x = (t) => cub.a * t ** 3 + cub.b * t ** 2 + cub.c * t;
cub.v = (t) => 3 * cub.a * t ** 2 + 2 * cub.b * t + cub.c;
cub.acc = (t) => 6 * cub.a * t + 2 * cub.b;
cub.r1 = R6(root(cub.v, 0, 2));
cub.r2 = R6(root(cub.v, 2, 4));
cub.x1 = cub.x(cub.r1);
cub.x2 = cub.x(cub.r2);
cub.x4 = cub.x(cub.T);
cub.disp = cub.x4 - cub.x(0);
cub.path = Math.abs(cub.x1 - cub.x(0)) + Math.abs(cub.x2 - cub.x1) + Math.abs(cub.x4 - cub.x2);
cub.vbar = cub.disp / cub.T;
cub.sbar = cub.path / cub.T;

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const car = { knots: [[0, 0], [20, 16], [50, 16], [58, 0]] };
car.f = pwl(car.knots);
car.s1 = 0.5 * 20 * 16;
car.s2 = 30 * 16;
car.s3 = 0.5 * 8 * 16;
car.tot = car.s1 + car.s2 + car.s3;
car.avg = car.tot / 58;
car.a1 = 16 / 20;
car.a3 = -16 / 8;
const ex8 = { u: R6(54 / 3.6), s: 150 };
ex8.a = R6((0 - ex8.u ** 2) / (2 * ex8.s));
ex8.t = R6((0 - ex8.u) / ex8.a);
ex8.s2 = ex8.u * ex8.t + 0.5 * ex8.a * ex8.t ** 2;
const ex9 = { a: 1.5, n: 6 };
ex9.s6 = R6(0.5 * ex9.a * ex9.n ** 2);
ex9.s5 = R6(0.5 * ex9.a * (ex9.n - 1) ** 2);
ex9.sn = R6(ex9.s6 - ex9.s5);
ex9.sn2 = (ex9.a * (2 * ex9.n - 1)) / 2;
const ex10 = { t: 2.5 };
ex10.h = R6(0.5 * g * ex10.t ** 2);
ex10.v = R6(g * ex10.t);
const ex11 = { u: 14.7, H: 49 };
ex11.t = R6((ex11.u + Math.sqrt(ex11.u ** 2 + 2 * g * ex11.H)) / g);
ex11.v = R6(ex11.u - g * ex11.t);
ex11.up = R6(ex11.u ** 2 / (2 * g));
const thr = { u: G.FALL_DATA.u };
thr.tup = R6(thr.u / g);
thr.H = R6(thr.u ** 2 / (2 * g));
thr.T = R6(2 * thr.tup);

export const EX = { ex1, ex2, pol, trg, exq, lgq, itg, cub, car, ex8, ex9, ex10, ex11, thr };
export const NUMCHECK = {
  polV: deriv(pol.x, pol.t0),
  polA: deriv(pol.v, pol.t0),
  trgV: deriv((t) => trg.A * Math.sin(t), trg.t),
  exqV: deriv((t) => exq.k * Math.exp(t), exq.t),
  lgqV: deriv((t) => lgq.k * Math.log(t), lgq.t),
  itgDisp: integ((t) => itg.p * t * t + itg.q * t, itg.t1, itg.t2),
  cubPath: pathLength(cub.x, 0, cub.T),
  carArea: integ(car.f, 0, 58),
  ex11Root: ex11.u * ex11.t - 0.5 * g * ex11.t ** 2,
};

// ---------------------------------------------------------------- visuals
export const V = {
  road: svgV(G.ROAD, 'A position axis along a canal road with a bridge as origin, a tea stall at minus 180 metres and a cyclist at plus 420 metres', 'Positions are signed distances from the origin.'),
  path: svgV(G.PATH, 'A cyclist rides 900 metres east and 350 metres back west: path length 1250 metres, displacement 550 metres east', 'Path length is the whole route; displacement joins start to finish.'),
  secant: svgV(G.SECANT, 'Chords of a position-time curve from a point P to later points, with slopes 12, 10 and 9 metres per second, closing in on the tangent at P of slope 8 metres per second', 'As the interval shrinks, the chord turns into the tangent.'),
  area: svgV(G.AREAINT, 'The area under the velocity-time curve v equals 3 t squared from 1 second to 3 seconds, cut into strips, equal to 26 metres', 'The strips add up to the integral: the displacement.'),
  graphs6: svgV(G.GRAPHS6, 'Six motion graphs: s-t, v-t and a-t for uniform velocity and for uniform acceleration', 'Uniform velocity: constant slope on s–t. Uniform acceleration: constant slope on v–t.'),
  vtarea: svgV(G.VTAREA, 'A straight velocity-time line from 5 to 17 metres per second in 6 seconds, with a rectangle and a triangle under it', 'Area under the line = displacement = 66 m.'),
  fall: svgV(G.FALL, 'Strobe picture of a ball thrown straight up at 29.4 metres per second, one picture per second, with heights and velocities', 'Up and down take equal times; the speed at each height is the same going up and coming down.'),
};

const ax = (label, min, max) => ({ label, min, max });
export const plotSin = plot(
  {
    x: ax('t (rad)', 0, 6.4),
    y: ax('value', -1.3, 1.3),
    functions: [
      { expr: 'sin(x)', label: 'sin t', domain: [0, 6.4] },
      { expr: 'cos(x)', label: 'cos t = slope of sin t', domain: [0, 6.4] },
    ],
    hlines: [{ y: 0, dashed: true }],
  },
  'Graphs of sine and cosine from 0 to 6.4 radians: the cosine curve gives the slope of the sine curve, so cosine is 1 where sine crosses zero going up and is zero where sine has its maximum',
  'cos t is the slope of the sin t curve at every t.',
);
export const plotPoly = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('position x (m)', 0, 12),
    functions: [{ expr: `${cub.a}*x^3 - ${-cub.b}*x^2 + ${cub.c}*x`, label: 'x = t³ − 6t² + 9t (m)', domain: [0, 4.2] }],
    vlines: [{ x: cub.r1, label: `v = 0 at t = ${cub.r1} s (x = ${cub.x1} m)`, dashed: true }, { x: cub.r2, label: `v = 0 at t = ${cub.r2} s (x = ${cub.x2} m)`, dashed: true }],
  },
  'Position-time graph of a particle that moves forward to 4 metres at one second, comes back to the origin at three seconds and goes forward again to 4 metres at four seconds',
  'The tangent is horizontal at the two turning instants.',
);
export const plotVcub = plot(
  {
    x: ax('time t (s)', 0, 4.2),
    y: ax('velocity v (m/s)', -4, 16),
    functions: [{ expr: `${3 * cub.a}*x^2 - ${-2 * cub.b}*x + ${cub.c}`, label: 'v = 3t² − 12t + 9 (m/s)', domain: [0, 4.2] }],
    hlines: [{ y: 0, label: 'v = 0', dashed: true }],
  },
  'Velocity-time graph of the same particle: the velocity starts at 9 metres per second, is zero at one second, falls to a minimum of minus 3 metres per second at two seconds and is zero again at three seconds',
  'The slope of this graph is the acceleration; it is zero at the minimum.',
);
export const plotCar = plot(
  {
    x: ax('time t (s)', 0, 60),
    y: ax('velocity v (m/s)', 0, 20),
    series: [{ label: 'metro train: speeds up, cruises, brakes', kind: 'line', points: car.knots }],
  },
  'Velocity-time graph of a metro train: a straight rise from zero to 16 metres per second in 20 seconds, a flat part to 50 seconds, then a straight fall to zero at 58 seconds',
  'Three straight pieces: slopes +0.8, 0 and −2.0 m s⁻².',
);
export const plotThrowV = plot(
  {
    x: ax('time t (s)', 0, 6.4),
    y: ax('velocity v (m/s)', -34, 34),
    functions: [{ expr: `${thr.u} - ${g}*x`, label: `v = ${thr.u} − ${g} t (m/s)`, domain: [0, 6] }],
    hlines: [{ y: 0, label: 'v = 0 at the top', dashed: true }],
  },
  'Velocity-time graph of a ball thrown up at 29.4 metres per second and caught back in the hand at 6 seconds: one straight line of slope minus 9.8 metres per second squared from plus 29.4 to minus 29.4, crossing zero at 3 seconds; the two triangles have equal areas',
  'Area above the axis (rise) = area below (fall): the net displacement is zero.',
);
export const plotThrowY = plot(
  {
    x: ax('time t (s)', 0, 6.4),
    y: ax('height y (m)', 0, 50),
    functions: [{ expr: `${thr.u}*x - ${0.5 * g}*x^2`, label: `y = ${thr.u} t − ${0.5 * g} t² (m)`, domain: [0, 6] }],
    vlines: [{ x: thr.tup, label: `top: t = ${thr.tup} s, y = ${dec(thr.H, 3)} m`, dashed: true }],
  },
  'Height-time graph of the ball: a symmetric arch with the top at 3 seconds and 44.1 metres, back at the hand at 6 seconds',
  'Symmetric arch: equal times up and down.',
);

// ---------------------------------------------------------------- tables
const T1 = table(
  ['Quantity', 'Definition', 'Sign / kind', 'Zero for a moving body?'],
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
    ['First leg', String(ex2.d), String(ex2.v1), dec(ex2.t1, 2)],
    ['Second leg', String(ex2.d), String(ex2.v2), dec(ex2.t2, 2)],
    ['Whole trip', String(2 * ex2.d), `average = ${dec(ex2.avg, 3)}`, dec(ex2.t1 + ex2.t2, 2)],
  ],
  'Table of the two legs of a train journey: distance, speed and time for each leg and for the whole trip',
);
const TD = table(
  ['Function y', 'Derivative dy/dx', 'Example in motion'],
  [
    ['constant c', '0', 'x = 7 m: v = 0, at rest'],
    ['x^n', 'n x^(n−1)', 'x = t³: v = 3t²'],
    ['c f(x)', 'c × f′(x)', 'x = 4t²: v = 8t'],
    ['sin x', 'cos x', 'x = 5 sin t: v = 5 cos t'],
    ['cos x', '−sin x', 'x = 5 cos t: v = −5 sin t'],
    ['e^x', 'e^x', 'x = 2e^t: v = 2e^t'],
    ['ln x', '1/x', 'x = 3 ln t: v = 3/t'],
  ],
  'Table of the derivatives of a constant, x to the n, a constant multiple, sine, cosine, e to the x and natural log of x, each with an example from motion along a line',
);
const TI = table(
  ['Integrand', 'Indefinite integral', 'Definite integral from a to b'],
  [
    ['x^n (n ≠ −1)', 'x^(n+1)/(n+1) + C', '[x^(n+1)/(n+1)] from a to b'],
    ['1 (that is x⁰)', 'x + C', 'b − a'],
    ['c f(x)', 'c ∫ f(x) dx', 'c times the integral of f'],
    ['velocity v(t)', 'position x(t) + C', 'displacement between a and b'],
    ['acceleration a(t)', 'velocity v(t) + C', 'change in velocity between a and b'],
  ],
  'Table of the integral of x to the n, of a constant and of a constant multiple, and what integrating velocity and acceleration gives',
);
const TS = table(
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
const TG = table(
  ['Quantity', 'Where on the graph', 'Graph'],
  [
    ['Velocity', 'Slope of the tangent', 's–t'],
    ['Acceleration', 'Slope of the tangent', 'v–t'],
    ['Displacement', 'Signed area between the curve and the t-axis', 'v–t'],
    ['Change in velocity', 'Signed area between the curve and the t-axis', 'a–t'],
  ],
  'Table of what the slope and the area of motion graphs represent',
);
const TE = table(
  ['Equation', 'Missing variable', 'Use when you know'],
  [
    ['v = u + a t', 'displacement s', 'u, a and t (or v)'],
    ['s = u t + ½ a t²', 'final velocity v', 'u, a and t'],
    ['v² = u² + 2 a s', 'time t', 'u, a and s'],
    ['s = ½ (u + v) t', 'acceleration a', 'u, v and t'],
  ],
  'Table of the equations for uniformly accelerated motion, the variable each lacks and when to use it',
);
const TM = table(
  ['Method', 'Idea', 'Gives'],
  [
    ['Graphical', 'Slope of the v–t line is a; area under it is s', 'v = u + at; s = ut + ½at²; v² = u² + 2as'],
    ['Calculus', 'Integrate a = dv/dt and v = dx/dt (a constant)', 'v = u + at; s = ut + ½at²; v² = u² + 2as'],
    ['Analytical', 'Definition of a and the mean velocity ½(u + v)', 'v = u + at; s = ut + ½at²; v² = u² + 2as'],
  ],
  'Table of the three methods of deriving the equations of uniformly accelerated motion: graphical, calculus and analytical, with the idea of each',
);
const TF = table(
  ['Time (s)', 'Distance fallen (m)', 'Gap in that second (m)', 'Speed (m/s)'],
  [1, 2, 3, 4].map((t) => [String(t), dec(0.5 * g * t * t, 3), dec(0.5 * g * (2 * t - 1), 3), dec(g * t, 3)]),
  'Table of free fall from rest: total distance, the distance in each successive second and the speed after 1, 2, 3 and 4 seconds; the gaps are in the ratio 1 to 3 to 5 to 7',
);
export const TABLES = { T1, T2, TD, TI, TS, TG, TE, TM, TF };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Motion in a Straight Line — Part 1: Position, velocity, calculus and acceleration',
  goals: [
    'Distinguish path length from displacement and average speed from average velocity',
    'Explain instantaneous velocity as a limit and find it by differentiating x(t)',
    'Differentiate x^n, sin x, cos x, e^x and ln x, and integrate x^n between limits',
    'Define acceleration as dv/dt and interpret its sign together with that of velocity',
  ],
  slides: [
    sl('title', 'Motion in a Straight Line', {
      b: 'Part 1 — where a body is, how far it has gone, how fast, and the calculus that turns a position formula into velocity and acceleration.',
      v: V.road,
      n: 'A cyclist on a canal road, a train on its track and a ball in the air all move along a line. To describe any of them we must say where it is, measured from what, and in which direction. In this part we set up the position axis, meet velocity as a rate of change, and learn the small amount of calculus that physics needs.',
    }),
    sl('concept', 'Frame of reference and point mass', {
      b: 'Motion is always described **relative to a frame of reference**: an origin, an axis and a clock.',
      ul: [
        'Along a line choose an **origin** O and a **positive direction**; the **position** x is the signed distance from O.',
        'A body is a **point mass** when its size is negligible compared with the distances it moves, so one position describes it.',
        'A body is at **rest** if its position does not change with time in the chosen frame, and in **motion** if it does.',
        'Rest and motion are **relative**: the bag on a train rack is at rest for the passenger and moving for a person on the platform.',
      ],
      v: V.road,
      n: 'Pick an origin, such as a bridge, and a positive direction along the road. The position of anything is its signed distance from the origin, positive on one side and negative on the other. A body can be treated as a point mass when its size is tiny compared with the distance it travels. Whether it is at rest or in motion depends on the frame we choose.',
    }),
    sl('diagram', 'Distance and displacement', {
      b: 'A cyclist leaves home O, rides to the market A and returns to the temple B.',
      ul: [
        '**Distance (path length):** total length of the route actually covered; a scalar, never negative, never decreasing.',
        r`**Displacement** $\Delta x = x_2 - x_1$: the signed change of position; it depends only on the end points.`,
        r`Always $|\Delta x| \le$ path length; they are equal only if the body never turns back.`,
        'Displacement can be positive, negative or zero; for a round trip it is zero.',
      ],
      v: V.path,
      n: 'Look at the three arrows. The blue and red arrows together are the route the cyclist really followed, and their lengths add up to the distance travelled. The green arrow runs straight from the start to the finish: that is the displacement. It is shorter than the distance because the cyclist turned back.',
    }),
    sl('example', 'Worked example 1: a cyclist to the market', {
      b: r`A cyclist rides ${ex1.out} m east from home to a market and then ${ex1.back} m back west to a temple, taking ${ex1.T} s in all. Find the distance, the displacement, the average speed and the average velocity.`,
      ul: [
        r`Distance $= ${ex1.out} + ${ex1.back} = ${ex1.path}$ m.`,
        r`Displacement $= x_\text{final} - x_\text{initial} = ${ex1.out - ex1.back} - 0 = ${ex1.disp}$ m east.`,
        r`Average speed $= \dfrac{${ex1.path}}{${ex1.T}} = ${dec(ex1.vs, 2)}$ m s$^{-1}$.`,
        r`Average velocity $= \dfrac{${ex1.disp}}{${ex1.T}} = ${dec(ex1.vv, 2)}$ m s$^{-1}$ east, smaller than the average speed.`,
      ],
      v: V.path,
      n: `The cyclist covers ${W(ex1.out)} metres out and ${W(ex1.back)} back, so the distance is ${W(ex1.path)} metres. The final position is only ${W(ex1.disp)} metres from home, so that is the displacement. Dividing each by ${W(ex1.T)} seconds, the average speed is ${W(ex1.vs)} metres per second, and the average velocity is a smaller number, ${W(Number(dec(ex1.vv, 2)))} metres per second towards the east.`,
    }),
    sl('check', 'Quick check: moving the origin', {
      b: 'Choose the correct option.',
      v: V.road,
      chk: 'origin-mcq',
      n: 'Think about what depends on the choice of origin and what does not.',
    }),
    sl('concept', 'Average speed and average velocity', {
      b: 'Over a time interval from $t_1$ to $t_2$:',
      m: [r`\bar v = \dfrac{\Delta x}{\Delta t} = \dfrac{x_2 - x_1}{t_2 - t_1}`, r`\text{average speed} = \dfrac{\text{distance}}{\Delta t}`],
      ul: [
        'Average velocity has a sign (direction along the axis); average speed does not.',
        'Average speed is never smaller than the magnitude of the average velocity.',
        'After a round trip the average velocity is zero but the average speed is not.',
        'SI unit of both: metre per second (m s⁻¹); 1 m s⁻¹ = 3.6 km h⁻¹.',
      ],
      v: T1,
      n: 'Average velocity is displacement divided by the time taken, so it has a sign. Average speed is distance divided by the time taken, so it is never negative. Because the distance is at least as long as the displacement, the average speed is never smaller than the size of the average velocity. After a full round trip the displacement is zero, so the average velocity is zero even though the body has been moving all along.',
    }),
    sl('example', 'Worked example 2: two legs of a train journey', {
      b: r`A train covers the first ${ex2.d} km of a line at ${ex2.v1} km h$^{-1}$ and the next ${ex2.d} km at ${ex2.v2} km h$^{-1}$. Find its average speed for the whole ${2 * ex2.d} km.`,
      ul: [
        r`Time for the first leg $= \dfrac{${ex2.d}}{${ex2.v1}} = ${ex2.t1}$ h; for the second $= \dfrac{${ex2.d}}{${ex2.v2}} = ${ex2.t2}$ h.`,
        r`Average speed $= \dfrac{\text{total distance}}{\text{total time}} = \dfrac{${2 * ex2.d}}{${ex2.t1 + ex2.t2}} = ${ex2.avg}$ km h$^{-1}$.`,
        r`This is not the mean $\tfrac{1}{2}(${ex2.v1} + ${ex2.v2}) = ${ex2.mean}$ km h$^{-1}$: the train spends more time at the lower speed.`,
      ],
      v: T2,
      n: `The first leg takes ${W(ex2.t1)} hours and the second takes ${W(ex2.t2)} hours, so the whole trip of ${W(2 * ex2.d)} kilometres takes ${W(ex2.t1 + ex2.t2)} hours. The average speed is ${W(ex2.avg)} kilometres per hour. It is not the plain mean of ${W(ex2.v1)} and ${W(ex2.v2)}, because the train spends more time going slowly.`,
    }),
    sl('concept', 'Instantaneous velocity: a limit', {
      b: 'Shrink the time interval around an instant and the average velocity settles to a value:',
      m: [r`v = \lim_{\Delta t \to 0} \dfrac{\Delta x}{\Delta t} = \dfrac{dx}{dt}`],
      ul: [
        'On the x–t graph the chord between two points is the average velocity; as the second point closes in, the chord becomes the **tangent**.',
        'Instantaneous velocity is the **slope of the tangent** at that instant; its magnitude is the instantaneous speed.',
        'For uniform motion the average and instantaneous velocities are equal; for non-uniform motion they differ.',
      ],
      v: V.secant,
      n: 'The dashed chords join the point P to later points on the curve. Their slopes are average velocities over shorter and shorter intervals, twelve, ten and nine metres per second. They close in on the red tangent, whose slope is eight metres per second. That limit is the instantaneous velocity at P, written d x by d t.',
    }),
    sl('check', 'Quick check: chord and tangent', {
      b: 'Choose the correct option.',
      v: V.secant,
      chk: 'tangent-mcq',
      n: 'Compare the chord with the tangent at the point.',
    }),
    sl('concept', 'Calculus 1: differentiation as rate of change', {
      b: r`For $y = f(x)$ the **derivative** is the rate of change of $y$ with $x$:`,
      m: [r`\dfrac{dy}{dx} = \lim_{\Delta x \to 0} \dfrac{f(x + \Delta x) - f(x)}{\Delta x}`, r`\dfrac{d}{dx}\left(x^n\right) = n\,x^{n-1}, \qquad \dfrac{d}{dx}(c) = 0, \qquad \dfrac{d}{dx}\bigl(c\,f\bigr) = c\,\dfrac{df}{dx}`],
      ul: [
        r`First principles for $y = x^2$: $\dfrac{(x+\Delta x)^2 - x^2}{\Delta x} = 2x + \Delta x \to 2x$.`,
        'The derivative of a sum is the sum of the derivatives; apply the rule term by term.',
        'In motion: $v = dx/dt$ and $a = dv/dt = d^2x/dt^2$.',
      ],
      v: TD,
      n: 'The derivative of a function is the limit of the change in the function divided by the change in the variable. Working from first principles for x squared gives two x plus a tiny bit that vanishes, so the derivative is two x. The general rule is that x to the n differentiates to n times x to the n minus one. A constant gives zero, a constant factor stays, and sums are done term by term.',
    }),
    sl('example', 'Worked example 3: from position to velocity and acceleration', {
      b: r`A particle moves along a line with $x = ${pol.a}t^3 - 3t^2 + ${pol.c}t + ${pol.d}$ (x in m, t in s). Find $v$ and $a$ at $t = ${pol.t0}$ s and the average velocity from $t = ${pol.t1}$ s to $t = ${pol.t2}$ s.`,
      ul: [
        r`$v = \dfrac{dx}{dt} = ${3 * pol.a}t^2 - 6t + ${pol.c}$, so $v(${pol.t0}) = ${3 * pol.a}(${pol.t0 ** 2}) - 6(${pol.t0}) + ${pol.c} = ${pol.v0}$ m s$^{-1}$.`,
        r`$a = \dfrac{dv}{dt} = ${6 * pol.a}t - 6$, so $a(${pol.t0}) = ${pol.a0}$ m s$^{-2}$.`,
        r`$x(${pol.t1}) = ${pol.x(pol.t1)}$ m and $x(${pol.t2}) = ${pol.x(pol.t2)}$ m, so $\bar v = \dfrac{${pol.x(pol.t2)} - ${pol.x(pol.t1)}}{${pol.t2 - pol.t1}} = ${pol.avg}$ m s$^{-1}$, which differs from $v(${pol.t0}) = ${pol.v0}$ m s$^{-1}$.`,
      ],
      v: TD,
      n: `Differentiate term by term. The velocity is twelve t squared minus six t plus two, which is ${W(pol.v0)} metres per second at two seconds. Differentiating again gives the acceleration, twenty four t minus six, which is ${W(pol.a0)} metres per second squared at two seconds. The average velocity from one to three seconds is ${W(pol.avg)} metres per second, different from the instantaneous value because the motion is not uniform.`,
    }),
    sl('concept', 'Calculus 2: derivatives of sin, cos, e^x and ln', {
      b: r`Along with $x^n$ we need four more derivatives (the angle is in radians):`,
      m: [r`\dfrac{d}{dx}\sin x = \cos x, \quad \dfrac{d}{dx}\cos x = -\sin x`, r`\dfrac{d}{dx}e^x = e^x, \quad \dfrac{d}{dx}\ln x = \dfrac{1}{x}\ (x > 0)`],
      ul: [
        'The cos curve is the slope of the sin curve: it is 1 where sin crosses zero rising and 0 at the peak of sin.',
        r`$e^x$ is the one function whose slope equals its own value; $\ln x$ is its inverse, with slope $1/x$.`,
        r`Negative powers are covered by the same rule: $\dfrac{d}{dx}\left(x^{-1}\right) = -x^{-2}$.`,
      ],
      v: plotSin,
      n: 'The cosine curve is the slope of the sine curve. Where sine crosses zero going up, its slope is one, which is the peak of cosine. At the top of sine the slope is zero, and cosine crosses zero there. The derivative of e to the x is e to the x itself, and the derivative of the natural logarithm of x is one over x. Negative powers follow the same rule as positive ones.',
    }),
    sl('example', 'Worked example 4: sine, exponential and logarithm', {
      b: r`(t in s, angles in rad.) Find the velocity in each case: (i) $x = ${trg.A}\sin t$ at $t = \pi/3$; (ii) $x = ${exq.k}e^t$ at $t = ${exq.t}$ s; (iii) $x = ${lgq.k}\ln t$ at $t = ${lgq.t}$ s, and also the acceleration in (iii).`,
      ul: [
        r`(i) $v = ${trg.A}\cos t = ${trg.A}\cos\dfrac{\pi}{3} = ${dec(trg.v, 2)}$ m s$^{-1}$.`,
        r`(ii) $v = ${exq.k}e^t$, so $v(${exq.t}) = ${exq.k}e = ${dec(exq.v, 3)}$ m s$^{-1}$ (with $e = 2.718$).`,
        r`(iii) $v = \dfrac{${lgq.k}}{t}$, so $v(${lgq.t}) = ${lgq.v}$ m s$^{-1}$; $a = \dfrac{dv}{dt} = -\dfrac{${lgq.k}}{t^2} = ${lgq.a}$ m s$^{-2}$.`,
      ],
      v: TD,
      n: `In the first case the velocity is five cosine t, which is ${W(Number(dec(trg.v, 2)))} metres per second at sixty degrees. In the second, the velocity is two e to the t, about ${W(Number(dec(exq.v, 3)))} metres per second at one second. In the third, the velocity is three over t, which is ${W(lgq.v)} metres per second at two seconds, and the acceleration is minus three over t squared, which is ${W(lgq.a)} metres per second squared.`,
    }),
    sl('check', 'Quick check: differentiating', {
      b: 'Choose the correct option.',
      v: TD,
      chk: 'deriv-mcq',
      n: 'Differentiate each term separately.',
    }),
    sl('concept', 'Calculus 3: integration as the reverse', {
      b: r`**Integration** reverses differentiation. For $n \ne -1$:`,
      m: [r`\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C`, r`\int_a^b x^n\,dx = \left[\dfrac{x^{n+1}}{n+1}\right]_a^b = \dfrac{b^{n+1} - a^{n+1}}{n+1}`],
      ul: [
        r`The **indefinite** integral has a constant $C$ (fixed by a starting value such as $x_0$ at $t = 0$); the **definite** integral between limits has none.`,
        'The definite integral is the **area under the curve** between the limits: strips of height $v$ and width $\\Delta t$ add up to it.',
        r`So $x = \int v\,dt$ and $v = \int a\,dt$; $\int_{t_1}^{t_2} v\,dt$ is the displacement.`,
      ],
      v: V.area,
      n: 'Integration undoes differentiation. To integrate x to the n, raise the power by one and divide by the new power, and add a constant for an indefinite integral. For a definite integral, put in the upper limit, subtract the value at the lower limit, and no constant is needed. Geometrically it is the area under the curve, built from thin strips. For velocity, that area is the displacement.',
    }),
    sl('example', 'Worked example 5: from velocity to displacement', {
      b: r`The velocity of a trolley is $v = ${itg.p}t^2 + ${itg.q}t$ (m s$^{-1}$, t in s). Find (i) the displacement from $t = ${itg.t1}$ s to $t = ${itg.t2}$ s and (ii) its position at $t = ${itg.tt}$ s if $x = ${itg.x0}$ m at $t = 0$.`,
      ul: [
        r`(i) $\Delta x = \int_{${itg.t1}}^{${itg.t2}} (${itg.p}t^2 + ${itg.q}t)\,dt = \left[t^3 + 2t^2\right]_{${itg.t1}}^{${itg.t2}} = (${itg.t2 ** 3 + 2 * itg.t2 ** 2}) - (${itg.t1 ** 3 + 2 * itg.t1 ** 2}) = ${itg.disp}$ m.`,
        r`(ii) $x = \int v\,dt = t^3 + 2t^2 + C$; $x(0) = ${itg.x0}$ gives $C = ${itg.x0}$.`,
        r`So $x(${itg.tt}) = ${itg.tt ** 3} + ${2 * itg.tt ** 2} + ${itg.x0} = ${itg.x2}$ m.`,
      ],
      v: TI,
      n: `Integrate term by term: three t squared gives t cubed, and four t gives two t squared. Put in the limits three and one: forty five minus three, so the displacement is ${W(itg.disp)} metres. For the position, the same antiderivative plus a constant is needed; the starting position of ${W(itg.x0)} metres fixes the constant. At two seconds the trolley is at ${W(itg.x2)} metres.`,
    }),
    sl('check', 'Quick check: integrating', {
      b: 'Work out the displacement.',
      v: TI,
      chk: 'integ-num',
      n: 'Integrate, then subtract the value at the lower limit from the value at the upper limit.',
    }),
    sl('concept', 'Acceleration and non-uniform motion', {
      b: 'Velocity itself may change with time; the rate of change is **acceleration**:',
      m: [r`\bar a = \dfrac{\Delta v}{\Delta t}, \qquad a = \lim_{\Delta t \to 0}\dfrac{\Delta v}{\Delta t} = \dfrac{dv}{dt} = \dfrac{d^2x}{dt^2}`],
      ul: [
        '**Uniform motion:** constant velocity, $a = 0$. **Non-uniform motion:** velocity changes; **uniform acceleration:** $a$ constant.',
        'Same signs of $v$ and $a$: speeding up; opposite signs: slowing down (retardation).',
        r`$v = 0$ at an instant does **not** mean $a = 0$: a ball at the top of its flight has $v = 0$ and $a = -g$.`,
        'SI unit of acceleration: metre per second squared (m s⁻²).',
      ],
      v: TS,
      n: 'Acceleration is the rate of change of velocity, the derivative of velocity with respect to time, or the second derivative of position. When velocity and acceleration have the same sign the body speeds up, and when the signs are opposite it slows down. Velocity can be zero for an instant while acceleration is not, as at the top of a throw.',
    }),
    sl('example', 'Worked example 6: a particle that turns back', {
      b: r`A particle has $x = t^3 - 6t^2 + 9t$ (m, s). Find when it is at rest, its acceleration then, and its displacement, distance and average speed in the first ${cub.T} s.`,
      ul: [
        r`$v = 3t^2 - 12t + 9 = 3(t-1)(t-3) = 0$ at $t = ${cub.r1}$ s and $t = ${cub.r2}$ s; $a = 6t - 12$ gives $a = ${cub.acc(cub.r1)}$ and $${cub.acc(cub.r2)}$ m s$^{-2}$.`,
        r`$x(0) = 0$, $x(${cub.r1}) = ${cub.x1}$ m, $x(${cub.r2}) = ${cub.x2}$ m, $x(${cub.T}) = ${cub.x4}$ m.`,
        r`Displacement $= ${cub.disp}$ m. Distance $= ${cub.x1} + ${cub.x1 - cub.x2} + ${cub.x4 - cub.x2} = ${cub.path}$ m (it turns back at both instants).`,
        r`Average speed $= \dfrac{${cub.path}}{${cub.T}} = ${cub.sbar}$ m s$^{-1}$, but the average velocity is only $\dfrac{${cub.disp}}{${cub.T}} = ${cub.vbar}$ m s$^{-1}$.`,
      ],
      v: plotPoly,
      n: `Setting the velocity to zero gives rest at ${W(cub.r1)} second and ${W(cub.r2)} seconds. The particle goes forward ${W(cub.x1)} metres, comes back ${W(cub.x1 - cub.x2)} metres, then goes forward ${W(cub.x4 - cub.x2)} metres again. So in ${W(cub.T)} seconds its displacement is ${W(cub.disp)} metres but the distance is ${W(cub.path)} metres. The average speed is ${W(cub.sbar)} metres per second against an average velocity of ${W(cub.vbar)}.`,
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Distance and displacement', 'Distance ≥ |displacement|; displacement = final − initial'],
          ['Average speed, average velocity', 'distance ÷ time; displacement ÷ time'],
          ['Instantaneous velocity', 'v = dx/dt: slope of the tangent'],
          ['Derivatives', 'x^n → n x^(n−1); sin → cos; cos → −sin; e^x → e^x; ln x → 1/x'],
          ['Integral of x^n', 'x^(n+1)/(n+1) + C; limits give area or displacement'],
          ['Acceleration', 'a = dv/dt; sign rules decide speeding up or slowing down'],
        ],
        'Summary table of distance and displacement, average and instantaneous velocity, derivatives, the integral of x to the n and acceleration',
      ),
      n: 'To sum up. Distance is never less than the size of displacement. Average velocity is displacement over time, average speed is distance over time. Instantaneous velocity is the derivative of position, the slope of the tangent. Learn the derivatives of x to the n, sine, cosine, e to the x and log x, and the integral of x to the n. Acceleration is the derivative of velocity, and its sign relative to velocity tells us whether the body speeds up or slows down.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State the origin and positive direction; give the direction with every displacement and velocity.',
        'Average speed over several stages = total distance ÷ total time, never the mean of the speeds.',
        'Differentiate term by term and show the rule used; write the units of v and a at the end.',
        'For a definite integral write the antiderivative in square brackets with limits, then subtract. Do not forget C when no limits are given.',
        'Common mistakes: using $v = 0 \\Rightarrow a = 0$; adding displacements as distances; leaving out the negative sign of a retardation.',
      ],
      v: T1,
      n: 'Always say what is positive. Average speed is total distance over total time. In calculus questions show the rule you use, differentiate each term, and write units. In a definite integral, substitute both limits; in an indefinite one, add the constant. Marks are lost for treating zero velocity as zero acceleration and for adding displacements as if they were distances.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Motion in a Straight Line — Part 2: Graphs, equations of motion and motion under gravity',
  goals: [
    'Sketch and read s–t, v–t and a–t graphs for uniform velocity and uniform acceleration',
    'Derive v = u + at, s = ut + ½at² and v² = u² + 2as by the graphical, calculus and analytical methods',
    'Solve numerical problems on uniformly accelerated motion',
    'Solve problems on bodies dropped or thrown vertically, and draw the v–t graph of a ball thrown up',
  ],
  slides: [
    sl('title', 'Graphs, equations of motion and gravity', {
      b: 'Part 2 — pictures of motion, three ways to derive the equations, and the one acceleration that every falling body shares.',
      v: V.graphs6,
      n: 'In this part we turn motion into pictures. Graphs of position, velocity and acceleration against time show uniform velocity and uniform acceleration at a glance. Then we derive the three equations of uniformly accelerated motion in three different ways, and finish with bodies falling or thrown upward under gravity.',
    }),
    sl('concept', 'Uniform and non-uniform motion on graphs', {
      b: 'Each kind of motion has its own shape on the three graphs:',
      ul: [
        '**Uniform velocity:** s–t is a straight line (slope = $v$); v–t is horizontal; a–t lies on the axis ($a = 0$).',
        '**Uniform acceleration:** s–t is a parabola whose slope grows; v–t is a straight line (slope = $a$); a–t is horizontal.',
        '**Non-uniform acceleration:** v–t is a curve, a–t is not horizontal; the tangent slope still gives $a$.',
        'A graph shows one quantity against time; it is not a picture of the path in space.',
      ],
      v: V.graphs6,
      n: 'For uniform velocity the position time graph is a straight line, the velocity time graph is horizontal and the acceleration is zero. For uniform acceleration, the position time graph is a parabola that gets steeper, the velocity time graph is a sloping straight line, and the acceleration time graph is horizontal. These graphs show quantities against time, not the path itself.',
    }),
    sl('concept', 'Reading slope and area', {
      b: 'On every motion graph, **slope** and **area** carry meaning:',
      m: [r`v = \dfrac{ds}{dt}, \quad a = \dfrac{dv}{dt}, \quad s = \int v\,dt, \quad \Delta v = \int a\,dt`],
      ul: [
        'Slope of the s–t graph = velocity; slope of the v–t graph = acceleration.',
        'Signed area under the v–t graph = displacement; area above the axis counts forward, below counts backward.',
        'Signed area under the a–t graph = change in velocity.',
        'For distance, add the areas without signs.',
      ],
      v: TG,
      n: 'The slope of a position time graph is the velocity, and the slope of a velocity time graph is the acceleration. The signed area under a velocity time graph is the displacement, with area below the axis counting backwards. For the distance, add all areas as positive numbers. The area under an acceleration time graph is the change in velocity.',
    }),
    sl('example', 'Worked example 7: a metro train between stations', {
      b: r`A metro train's velocity rises uniformly from 0 to $16$ m s$^{-1}$ in $20$ s, stays constant for $30$ s, then falls uniformly to zero in $8$ s. Find the accelerations, the distance between the stations and the average speed.`,
      ul: [
        r`Slopes: $\dfrac{16 - 0}{20} = ${car.a1}$ m s$^{-2}$, then $0$, then $\dfrac{0 - 16}{8} = ${car.a3}$ m s$^{-2}$.`,
        r`Areas: $\tfrac{1}{2} \times 20 \times 16 = ${car.s1}$ m; $30 \times 16 = ${car.s2}$ m; $\tfrac{1}{2} \times 8 \times 16 = ${car.s3}$ m.`,
        r`Distance $= ${car.s1} + ${car.s2} + ${car.s3} = ${car.tot}$ m; average speed $= \dfrac{${car.tot}}{58} = ${dec(car.avg, 3)}$ m s$^{-1}$.`,
      ],
      v: plotCar,
      n: `The three slopes are plus ${W(car.a1)}, zero and minus ${W(-car.a3)} metres per second squared. The areas are a triangle of ${W(car.s1)} metres, a rectangle of ${W(car.s2)} metres and a triangle of ${W(car.s3)} metres, so the stations are ${W(car.tot)} metres apart. Dividing by fifty eight seconds gives an average speed of about ${W(Number(dec(car.avg, 3)))} metres per second.`,
    }),
    sl('check', 'Quick check: graph slopes', {
      b: 'Choose the correct option.',
      v: plotCar,
      chk: 'vtslope-mcq',
      n: 'Remember that the slope of a velocity time graph is the acceleration.',
    }),
    sl('concept', 'Equations of uniformly accelerated motion', {
      b: 'For **constant** acceleration $a$, a body with initial velocity $u$ has, after time $t$, velocity $v$ and displacement $s$:',
      m: [r`v = u + at`, r`s = ut + \tfrac{1}{2}at^2`, r`v^2 = u^2 + 2as`],
      ul: [
        'Three methods derive them: **graphical** (areas and slopes), **calculus** (integrate $a$) and **analytical** (definitions and algebra).',
        'Also useful: $s = \\tfrac{1}{2}(u + v)t$ and the distance in the $n$th second, $s_n = u + \\tfrac{a}{2}(2n - 1)$.',
        'They hold only while $a$ is constant, and along one line with signs for direction.',
      ],
      v: TM,
      n: 'For constant acceleration there are three equations: v equals u plus a t, s equals u t plus half a t squared, and v squared equals u squared plus two a s. We derive them by the graphical method using areas and slopes, by calculus using integration, and by the analytical method using definitions and algebra. They hold only while the acceleration stays constant.',
    }),
    sl('diagram', 'Graphical method: v–t graph', {
      b: r`The v–t line runs from $u$ at $t = 0$ to $v$ at time $t$ with slope $a$.`,
      ul: [
        r`**Slope:** $a = \dfrac{v - u}{t}$, so $v = u + at$. [first equation]`,
        r`**Area** (rectangle $ut$ plus triangle $\tfrac{1}{2}(v-u)t$): $s = ut + \tfrac{1}{2}(v - u)t$; with $v - u = at$, $s = ut + \tfrac{1}{2}at^2$. [second]`,
        r`**Trapezium form:** $s = \dfrac{(u + v)}{2}t$.`,
      ],
      v: V.vtarea,
      n: 'The slope of the line is the acceleration, so v minus u divided by t equals a, which rearranges to v equals u plus a t. The area under the line is the displacement. It splits into a rectangle of height u and width t, and a triangle of base t and height v minus u. Substituting a t for v minus u gives s equals u t plus half a t squared.',
    }),
    sl('concept', 'Graphical method: the third equation', {
      b: r`Use the area of the trapezium, $s = \tfrac{1}{2}(u + v)t$, and eliminate $t$ with the slope.`,
      m: [r`t = \dfrac{v - u}{a}`, r`s = \dfrac{(u+v)}{2}\cdot\dfrac{(v-u)}{a} = \dfrac{v^2 - u^2}{2a} \;\Rightarrow\; v^2 = u^2 + 2as`],
      ul: [
        'The area of the trapezium is its average height $\\tfrac{1}{2}(u+v)$ times its base $t$.',
        'The slope gives $t$ in terms of $v$, $u$ and $a$; substituting removes time.',
        'The result has no $t$: use it when time is neither given nor asked.',
      ],
      v: V.vtarea,
      n: 'The area of the trapezium is the average of the two parallel sides, u and v, times the width t. The slope of the line gives t as v minus u over a. Multiply the two and the product of u plus v and v minus u is v squared minus u squared, so s equals v squared minus u squared over two a. Rearranged, v squared equals u squared plus two a s.',
    }),
    sl('concept', 'Calculus method', {
      b: r`Start from the definitions $a = \dfrac{dv}{dt}$ and $v = \dfrac{dx}{dt}$ with $a$ constant.`,
      m: [r`\int_u^v dv = \int_0^t a\,dt \;\Rightarrow\; v - u = at`, r`\int_0^s dx = \int_0^t (u + at)\,dt \;\Rightarrow\; s = ut + \tfrac{1}{2}at^2`, r`a = \dfrac{dv}{dt} = \dfrac{dv}{dx}\dfrac{dx}{dt} = v\dfrac{dv}{dx} \;\Rightarrow\; \int_u^v v\,dv = a\int_0^s dx \;\Rightarrow\; \tfrac{1}{2}(v^2 - u^2) = as`],
      ul: [
        'Integrating $a$ once with respect to time gives velocity; integrating velocity gives displacement.',
        'To remove time, write $a = v\\,dv/dx$ and integrate with respect to position.',
        'Limits ($t = 0$: velocity $u$, displacement $0$) fix the constants.',
      ],
      v: TI,
      n: 'In the calculus method, integrate the constant acceleration from zero to t: the change in velocity is a t, so v equals u plus a t. Put this velocity into d x by d t and integrate again: the displacement is u t plus half a t squared. For the third equation write a as v d v by d x, integrate both sides, and the half of v squared minus u squared equals a s.',
    }),
    sl('concept', 'Analytical method', {
      b: 'No graph and no integral: use the definitions and algebra.',
      m: [r`a = \dfrac{v - u}{t} \;\Rightarrow\; v = u + at`, r`\bar v = \dfrac{u + v}{2}\ \text{(velocity changes at a constant rate)} \;\Rightarrow\; s = \bar v\,t = \dfrac{(u + v)t}{2} = ut + \tfrac{1}{2}at^2`, r`v^2 = (u + at)^2 = u^2 + 2ut\cdot a + a^2t^2 = u^2 + 2a\left(ut + \tfrac{1}{2}at^2\right) = u^2 + 2as`],
      ul: [
        'The definition of constant acceleration gives the first equation at once.',
        'When velocity changes uniformly, the mean velocity is the mean of the first and last values.',
        'Squaring the first equation and replacing $ut + \\tfrac{1}{2}at^2$ by $s$ gives the third.',
      ],
      v: TE,
      n: 'The analytical method starts with the definition of acceleration, which gives v equals u plus a t. Because velocity changes at a steady rate, the mean velocity is u plus v over two, and displacement is mean velocity times time. Substituting for v gives the second equation. Squaring the first equation and collecting terms gives v squared equals u squared plus two a s.',
    }),
    sl('example', 'Worked example 8: braking a goods train', {
      b: r`A goods train moving at $54$ km h$^{-1}$ is brought to rest by a uniform retardation over ${ex8.s} m. Find the retardation and the time taken.`,
      ul: [
        r`$u = 54 \times \dfrac{1}{3.6} = ${ex8.u}$ m s$^{-1}$, $v = 0$, $s = ${ex8.s}$ m.`,
        r`$v^2 = u^2 + 2as \Rightarrow a = \dfrac{0 - ${ex8.u ** 2}}{2 \times ${ex8.s}} = ${ex8.a}$ m s$^{-2}$ (a retardation of ${-ex8.a} m s$^{-2}$).`,
        r`$v = u + at \Rightarrow t = \dfrac{0 - ${ex8.u}}{${ex8.a}} = ${ex8.t}$ s. Check: $s = \tfrac{1}{2}(u + v)t = \tfrac{1}{2}(${ex8.u})(${ex8.t}) = ${0.5 * ex8.u * ex8.t}$ m.`,
      ],
      v: TE,
      n: `First change the speed to metres per second: fifty four kilometres per hour is ${W(ex8.u)} metres per second. List u, v and s. The equation without time gives the acceleration as minus ${W(-ex8.a)} metres per second squared. Then v equals u plus a t gives ${W(ex8.t)} seconds. As a check, half of u plus v times t gives back ${W(ex8.s)} metres.`,
    }),
    sl('check', 'Quick check: which equation?', {
      b: 'Work out the answer.',
      v: TE,
      chk: 'eqchoice-num',
      n: 'List what you know, then pick the equation that has no unknown you do not need.',
    }),
    sl('example', 'Worked example 9: distance in the nth second', {
      b: r`A bus starts from rest with a constant acceleration of ${ex9.a} m s$^{-2}$. How far does it go in the ${ex9.n}th second?`,
      ul: [
        r`Distance in $n$ seconds $= \tfrac{1}{2}at^2$: in ${ex9.n} s, $\tfrac{1}{2}(${ex9.a})(${ex9.n ** 2}) = ${ex9.s6}$ m; in ${ex9.n - 1} s, $\tfrac{1}{2}(${ex9.a})(${(ex9.n - 1) ** 2}) = ${ex9.s5}$ m.`,
        r`Distance in the ${ex9.n}th second $= ${ex9.s6} - ${ex9.s5} = ${ex9.sn}$ m.`,
        r`Check with $s_n = u + \dfrac{a}{2}(2n - 1) = 0 + \dfrac{${ex9.a}}{2}(${2 * ex9.n - 1}) = ${ex9.sn2}$ m.`,
      ],
      v: TF,
      n: `The distance in the sixth second is the distance in six seconds minus the distance in five seconds. That is ${W(ex9.s6)} metres minus ${W(ex9.s5)} metres, which is ${W(ex9.sn)} metres. The formula for the nth second gives the same value, which confirms the working.`,
    }),
    sl('concept', 'Motion under gravity', {
      b: 'A body moving under gravity alone has the **same** acceleration, whatever its mass:',
      ul: [
        r`**Free fall:** acceleration $g = 9.8$ m s$^{-2}$ **downward**, at all times: rising, at the top and falling (air resistance neglected).`,
        r`Taking **up as positive** a thrown body has $a = -g$; taking down as positive, a dropped body has $a = +g$. Choose once and keep the signs.`,
        r`**Dropped from rest:** $v = gt$, $y = \tfrac{1}{2}gt^2$; distances in successive seconds are in the ratio $1 : 3 : 5 : \dots$.`,
        r`In a vacuum a feather and a stone fall together; in air the feather is held back by air resistance.`,
      ],
      v: TF,
      n: 'Near the Earth every body, heavy or light, has the same downward acceleration, about nine point eight metres per second squared, if air resistance can be ignored. Choose a direction as positive and keep the signs. For a body dropped from rest the speed is g t and the distance is half g t squared, so the distances in successive seconds are in the ratio one, three, five and so on.',
    }),
    sl('example', 'Worked example 10: a coconut falls from a palm', {
      b: r`A coconut drops from rest and hits the ground ${ex10.t} s later. Taking $g = 9.8$ m s$^{-2}$, find the height of the palm crown and the speed on landing.`,
      ul: [
        r`$h = \tfrac{1}{2}gt^2 = \tfrac{1}{2}(9.8)(${ex10.t})^2 = ${dec(ex10.h, 3)}$ m.`,
        r`$v = gt = (9.8)(${ex10.t}) = ${ex10.v}$ m s$^{-1}$ downward.`,
        r`Check: $v^2 = 2gh = 2(9.8)(${dec(ex10.h, 5)}) = ${dec(ex10.v ** 2, 5)}$, and $${ex10.v}^2 = ${dec(ex10.v ** 2, 5)}$.`,
      ],
      v: TF,
      n: `Taking downward as positive and starting from rest, the height is half g t squared, which is ${W(Number(dec(ex10.h, 3)))} metres. The speed on landing is g t, ${W(ex10.v)} metres per second downward. As a check, v squared equals two g h gives the same value.`,
    }),
    sl('diagram', 'Thrown upward: up and down', {
      b: r`A ball is thrown up at $u$ ($a = -g$ throughout). At the top $v = 0$.`,
      m: [r`t_\text{up} = \dfrac{u}{g}, \qquad H = \dfrac{u^2}{2g}, \qquad T = \dfrac{2u}{g}`],
      ul: [
        'Time of ascent = time of descent; the ball returns to the hand with the same speed $u$, directed downward.',
        'At every height the speed going up equals the speed coming down.',
        'The v–t graph is one straight line of slope $-g$; the area above the axis (rise) equals the area below (fall), so the net displacement is zero.',
      ],
      v: V.fall,
      n: `At the top the velocity is zero, so the time to rise is u over g, the height is u squared over two g, and the total time of flight is twice u over g. For a throw at ${W(thr.u)} metres per second the ball rises ${W(Number(dec(thr.H, 3)))} metres in ${W(thr.tup)} seconds and is back in the hand after ${W(thr.T)} seconds, moving as fast as it started.`,
    }),
    sl('concept', 'The v–t graph of a ball thrown up', {
      b: 'Up positive: $v = u - gt$ is a straight line from $+u$ down to $-u$.',
      ul: [
        'It crosses the time axis at $t = u/g$, the top of the flight.',
        'The slope is $-g$ everywhere: the same acceleration going up, at the top and coming down.',
        'Equal triangles above and below the axis: height risen = height fallen.',
      ],
      v: plotThrowV,
      n: 'Taking up as positive, the velocity starts at plus u and falls steadily by g every second. The line crosses the time axis at the top of the flight and goes on to minus u when the ball returns to the hand. The slope is minus g all the way, and the two triangles on either side of the axis have equal areas, so the net displacement is zero.',
    }),
    sl('example', 'Worked example 11: thrown up from a tower', {
      b: r`A stone is thrown vertically upward at ${ex11.u} m s$^{-1}$ from the edge of a ${ex11.H} m high tower. Find the greatest height above the tower and the time to reach the ground below. ($g = 9.8$ m s$^{-2}$)`,
      ul: [
        r`Greatest height above the tower $= \dfrac{u^2}{2g} = \dfrac{${dec(ex11.u ** 2, 5)}}{19.6} = ${dec(ex11.up, 5)}$ m.`,
        r`Up positive: $s = -${ex11.H}$ m, $u = ${ex11.u}$, $a = -9.8$: $-${ex11.H} = ${ex11.u}t - 4.9t^2$, i.e. $t^2 - 3t - 10 = 0$.`,
        r`$(t - 5)(t + 2) = 0$, so $t = ${ex11.t}$ s (the root $-2$ s is rejected). Speed on landing: $v = ${ex11.u} - 9.8(${ex11.t}) = ${dec(ex11.v, 3)}$ m s$^{-1}$, i.e. ${dec(-ex11.v, 3)} m s$^{-1}$ downward.`,
      ],
      v: V.fall,
      n: `Rising above the tower, the stone climbs u squared over two g, about ${W(Number(dec(ex11.up, 5)))} metres. To reach the ground, the displacement is minus ${W(ex11.H)} metres with up positive. That gives a quadratic with roots five and minus two; time cannot be negative, so the stone lands after ${W(ex11.t)} seconds, moving at ${W(Number(dec(-ex11.v, 3)))} metres per second downward.`,
    }),
    sl('check', 'Quick check: at the top', {
      b: 'Judge the assertion and the reason.',
      v: plotThrowV,
      chk: 'riseequal-ar',
      n: 'Look at the slope of the velocity time line at the instant it crosses zero.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Graphs', 'Slope of s–t = v; slope of v–t = a; signed area under v–t = displacement'],
          ['Equations (constant a)', 'v = u + at; s = ut + ½at²; v² = u² + 2as'],
          ['Three derivations', 'graphical (slope, area), calculus (integrate a), analytical (algebra)'],
          ['Free fall', 'a = g = 9.8 m s⁻² downward for every body without air resistance'],
          ['Thrown up', 't = u/g to the top; H = u²/2g; flight 2u/g; return speed u'],
          ['v–t of a throw', 'One line of slope −g from +u to −u; equal areas above and below'],
        ],
        'Summary table of motion graphs, the equations of uniform acceleration, their three derivations, free fall and motion thrown upward',
      ),
      n: 'To sum up. On graphs, slopes give rates and signed areas give changes. For constant acceleration use v equals u plus a t, s equals u t plus half a t squared, and v squared equals u squared plus two a s, and be ready to derive them graphically, by calculus and analytically. Under gravity the acceleration is nine point eight metres per second squared downward, the time up equals the time down, and the ball returns with the speed it started with.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In a derivation say that $a$ is constant; draw the graph with $u$, $v$, $t$ marked and show each step. Marks are given for the graph, the area or integral, and the final result.',
        'List u, v, a, s, t with signs; choose the equation that lacks the unknown you do not need.',
        'For vertical motion state "up is positive, $a = -g$" and use the same equations for the whole flight.',
        'On a v–t graph split the area where the line crosses the axis to get the distance.',
        'Common mistakes: using the equations when $a$ changes; forgetting to convert km h⁻¹ to m s⁻¹; mixing up distance and displacement.',
      ],
      v: TG,
      n: 'In a derivation say that the acceleration is constant, draw the labelled graph and show every step. List what you know with signs, then choose the equation that lacks the unknown you do not need. For vertical motion take up as positive and use minus g throughout. On graphs, split the area where the line crosses the axis to get the distance. Convert kilometres per hour to metres per second before substituting.',
    }),
  ],
});
