// ISC 11 ch02 question bank, part 2: short answers of 2 marks (30–50 words) and 3 marks (50–80 words; derivations).
import { mk, add, r, dec, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, deriv, integ } from './phys.mjs';

const { short } = mk;
const R6 = (x) => Math.round(x * 1e6) / 1e6;
const mn = (x) => String(x).replace('-', '−'); // proper minus sign in printed plain text

// ================================================================ 2 marks
add('frame-short', short({
  marks: 2,
  stem: 'A lamp is fixed to the ceiling of a railway coach that moves steadily past a platform. Explain, in terms of frame of reference, how the lamp can be both at rest and in motion.',
  model: 'A frame of reference is an origin with axes and a clock used to measure position. Measured from the coach, the position of the lamp never changes, so it is at rest. Measured from the platform, its position changes with time, so it is in motion. Rest and motion are therefore relative.',
  sol: 'Frame defined; lamp at rest in the coach frame and moving in the platform frame.',
  scheme: [['A frame of reference is an origin, axes and a clock', 1], ['At rest in the coach frame, in motion in the platform frame: motion is relative', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('zero-short', short({
  marks: 2,
  stem: 'Give one example of motion in which the displacement is zero but the distance is not, and state the condition under which the magnitude of the displacement equals the distance.',
  model: 'A runner who completes one full lap of a circular track returns to the starting point, so the displacement is zero while the distance is the length of the lap. The magnitude of the displacement equals the distance only when the body moves along a straight line without reversing its direction.',
  sol: 'Round trip example; equality only for straight-line motion with no reversal.',
  scheme: [['Example with zero displacement and non-zero distance (a full lap or a return trip)', 1], ['Equal only for motion along a straight line without turning back', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('avginst-short', short({
  marks: 2,
  stem: 'The speedometer of a taxi reads 36 km h⁻¹ at one instant of a trip. Does this reading give the average speed for the whole trip? Explain.',
  model: 'No. The speedometer shows the instantaneous speed, the limit of distance divided by a very small time interval around that instant. The average speed is the total distance divided by the total time, and it differs from the speedometer reading whenever the speed changes during the trip.',
  sol: 'Instantaneous reading against total distance over total time.',
  scheme: [['The speedometer shows the instantaneous speed at that moment', 1], ['Average speed = total distance ÷ total time, which differs when the speed varies', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const dv = { f: (t) => 7 * t ** 4 - 3 * Math.sin(t) + 2 * Math.log(t) + 5 * Math.exp(t), df: (t) => 28 * t ** 3 - 3 * Math.cos(t) + 2 / t + 5 * Math.exp(t) };
add('derivs-short', short({
  marks: 2,
  stem: 'Differentiate x = 7t⁴ − 3 sin t + 2 ln t + 5e^t with respect to t, naming the result used for each term.',
  model: r`Differentiate term by term. $\dfrac{d}{dt}(7t^4) = 28t^3$ by the power rule; $\dfrac{d}{dt}(-3\sin t) = -3\cos t$ because the derivative of $\sin t$ is $\cos t$; $\dfrac{d}{dt}(2\ln t) = \dfrac{2}{t}$ because the derivative of $\ln t$ is $\dfrac{1}{t}$; $\dfrac{d}{dt}(5e^t) = 5e^t$ because $e^t$ is its own derivative. Hence $\dfrac{dx}{dt} = 28t^3 - 3\cos t + \dfrac{2}{t} + 5e^t$.`,
  sol: 'Power rule, then the standard derivatives of sin, ln and exp, term by term.',
  scheme: [['28t³ and −3 cos t with the rules named', 1], ['2/t and 5eᵗ with the rules named; sum written', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(deriv(dv.f, 1.3), dv.df(1.3), 1e-6) || 'derivs');
const di = { F: (x) => x ** 3 + x ** 2 };
di.val = di.F(2) - di.F(1);
add('defint-short', short({
  marks: 2,
  stem: 'Evaluate the integral of (3x² + 2x) with respect to x from x = 1 to x = 2. If x were time and the integrand a velocity in m s⁻¹, what would the value represent?',
  model: r`$\int_1^2 (3x^2 + 2x)\,dx = \left[x^3 + x^2\right]_1^2 = (8 + 4) - (1 + 1) = ${di.val}$. If $x$ were time and the integrand a velocity, the value would be the displacement, ${di.val} m, between the instants 1 s and 2 s, which is the area under the v–t graph between them.`,
  sol: 'Antiderivative with limits; the integral of velocity is displacement.',
  scheme: [[`Antiderivative x³ + x² and limits: (8 + 4) − (1 + 1) = ${di.val}`, 1], [`Represents the displacement (${di.val} m) between 1 s and 2 s`, 1]],
  d: 2, c: 'application', t: [2],
}), () => near(integ((x) => 3 * x * x + 2 * x, 1, 2), di.val, 1e-6) || 'defint-short');
add('st-short', short({
  marks: 2,
  stem: 'Describe the shape of the s–t graph of a body that starts from rest with uniform acceleration, and explain with the help of slope why it has this shape.',
  model: 'The graph is a parabola that starts at the origin with a horizontal tangent and curves upward. The slope of an s–t graph is the velocity. Under uniform acceleration the velocity grows steadily from zero, so the slope keeps increasing and the curve becomes steeper with time.',
  sol: 'Parabola; slope = velocity, which increases.',
  scheme: [['Parabola through the origin, horizontal at the start and curving upward', 1], ['Slope = velocity, which grows steadily, so the curve steepens', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const ar2 = { u: 8, t1: 5, t2: 3 };
ar2.s1 = 0.5 * ar2.t1 * ar2.u;
ar2.s2 = ar2.t2 * ar2.u;
ar2.s = ar2.s1 + ar2.s2;
ar2.vbar = ar2.s / (ar2.t1 + ar2.t2);
add('area-short', short({
  marks: 2,
  stem: 'The v–t graph of a trolley is a straight line from rest to 8 m s⁻¹ in 5 s, followed by a horizontal line for the next 3 s. Find the displacement of the trolley in the 8 s and its average velocity.',
  model: r`The displacement equals the area under the v–t graph, a triangle plus a rectangle: $\tfrac{1}{2}(5)(8) = ${ar2.s1}$ m and $(3)(8) = ${ar2.s2}$ m, so the displacement is ${ar2.s} m. The average velocity is the displacement divided by the total time, $\dfrac{${ar2.s}}{8} = ${ar2.vbar}$ m s$^{-1}$, directed along the motion.`,
  sol: 'Area of triangle plus rectangle, divided by 8 s.',
  scheme: [[`Displacement = ${ar2.s1} + ${ar2.s2} = ${ar2.s} m`, 1], [`Average velocity = ${ar2.s}/8 = ${ar2.vbar} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [3],
}), () => near(integ((t) => (t <= 5 ? (8 * t) / 5 : 8), 0, 5, 2000) + integ(() => 8, 5, 8), ar2.s, 1e-6) && ar2.s === 44 || 'area-short');
add('meanvel-short', short({
  marks: 2,
  stem: 'Show that, for uniform acceleration, the average velocity over a time t equals half the sum of the initial and final velocities.',
  model: r`The displacement is $s = ut + \tfrac{1}{2}at^2$, so the average velocity is $\dfrac{s}{t} = u + \tfrac{1}{2}at = \dfrac{u + (u + at)}{2}$. Since $v = u + at$ is the final velocity, this equals $\dfrac{u + v}{2}$. The result holds only because the velocity changes at a constant rate.`,
  sol: 'Divide the displacement equation by t and use v = u + at.',
  scheme: [['Average velocity = s/t = u + ½at', 1], ['= (u + (u + at))/2 = (u + v)/2, valid for constant a', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('nth-short', short({
  marks: 2,
  stem: 'Derive an expression for the distance covered by a uniformly accelerated body in the nth second of its motion.',
  model: r`The distance covered in $n$ seconds is $un + \tfrac{1}{2}an^2$, and in $(n-1)$ seconds it is $u(n-1) + \tfrac{1}{2}a(n-1)^2$. The distance in the $n$th second is the difference of the two: $s_n = u + \tfrac{1}{2}a(2n - 1)$, where $u$ is the velocity at the start of the motion.`,
  sol: 'Distance in n seconds minus distance in n − 1 seconds.',
  scheme: [['Distances in n and in (n − 1) seconds from s = ut + ½at²', 1], ['Subtract: s_n = u + ½a(2n − 1)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('updown-short', short({
  marks: 2,
  stem: 'Show that a ball thrown straight up and caught at the same level takes equal times to rise and to fall, neglecting air resistance.',
  model: r`Taking up as positive, $v = u - gt$; at the top $v = 0$, so the time of rise is $\dfrac{u}{g}$. The ball is back at the same level when $0 = ut - \tfrac{1}{2}gt^2$, that is at $t = \dfrac{2u}{g}$. So the time of fall is $\dfrac{2u}{g} - \dfrac{u}{g} = \dfrac{u}{g}$, equal to the time of rise.`,
  sol: 'Time to the top from v = 0; return time from y = 0.',
  scheme: [['Time of rise u/g from v = u − gt = 0', 1], ['Return at 2u/g, so the fall also takes u/g', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('tube-short', short({
  marks: 2,
  stem: 'A coin and a feather are released together at the top of a long glass tube. State what is seen when the tube is full of air and when most of the air has been pumped out, and what this shows.',
  model: 'With air in the tube the coin reaches the bottom first, because air resistance holds back the light feather much more. With most of the air removed the two fall together. This shows that, without air resistance, all bodies fall with the same acceleration, whatever their masses.',
  sol: 'Observation with and without air; acceleration of free fall is the same for all.',
  scheme: [['Coin first in air; both together when the air is removed', 1], ['Free-fall acceleration is the same for all bodies when air resistance is absent', 1]],
  d: 1, c: 'understanding', t: [5],
}));

// ================================================================ 3 marks
const rt = { d: 60, t1: 1, t2: 1.5 };
rt.dist = 2 * rt.d;
rt.T = rt.t1 + rt.t2;
rt.avg = rt.dist / rt.T;
add('roundtrip-short3', short({
  marks: 3,
  stem: 'A car goes from town A to town B, 60 km away, in 1 h and returns to A in 1.5 h. Find the average speed and the average velocity for the round trip, and explain why they differ.',
  model: r`The total distance is $60 + 60 = ${rt.dist}$ km and the total time is $1 + 1.5 = ${rt.T}$ h, so the average speed is $\dfrac{${rt.dist}}{${rt.T}} = ${rt.avg}$ km h$^{-1}$. The car returns to its starting point, so the displacement is zero and the average velocity is zero. They differ because speed uses the distance, which only adds up, while velocity uses the displacement, which depends on the end points and cancels on a round trip.`,
  sol: 'Distance ÷ time and displacement ÷ time.',
  scheme: [[`Average speed = 120/2.5 = ${rt.avg} km h⁻¹`, 1], ['Displacement = 0, so average velocity = 0', 1], ['Distance adds up; displacement depends only on the end points and cancels', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(rt.d * 2 / (rt.t1 + rt.t2), 48, 1e-9) || 'roundtrip');
add('chord-short3', short({
  marks: 3,
  stem: 'Using the chord and the tangent on an x–t graph, explain how the instantaneous velocity is obtained from average velocities, and state when the two are equal.',
  model: r`The average velocity over an interval is the slope of the chord joining two points of the x–t curve. If the second point is brought closer to the first, the interval shrinks and the chord swings towards the tangent at the first point. The limiting slope of the chord is the slope of the tangent, the instantaneous velocity $\dfrac{dx}{dt}$. For uniform motion the graph is a straight line, so the chord and the tangent coincide and the two velocities are equal.`,
  sol: 'Chord slope = average velocity; limit = tangent slope.',
  scheme: [['Slope of the chord = average velocity over the interval', 1], ['Shrinking the interval turns the chord into the tangent; its slope is dx/dt', 1], ['Equal for uniform motion (straight x–t line)', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('firstprin-short3', short({
  marks: 3,
  stem: 'Using the definition of the derivative, show that the derivative of x³ with respect to x is 3x².',
  model: r`By definition, the derivative is the limit, as the small increment $h$ tends to zero, of the change in the function divided by $h$: $\dfrac{dy}{dx} = \lim_{h\to 0}\dfrac{(x+h)^3 - x^3}{h}$. On expanding the cube, $(x+h)^3 - x^3 = 3x^2h + 3xh^2 + h^3$, and every term now contains $h$, so dividing by $h$ gives $3x^2 + 3xh + h^2$. As $h$ tends to zero the last two terms vanish, so $\dfrac{d}{dx}(x^3) = 3x^2$, which agrees with the power rule $nx^{n-1}$ for $n = 3$.`,
  sol: 'Expand the cube and take the limit.',
  scheme: [['Definition of the derivative with (x + h)³ − x³ over h', 1], ['Expansion and division: 3x² + 3xh + h²', 1], ['Limit h → 0 gives 3x²', 1]],
  d: 3, c: 'understanding', t: [2],
}), () => near(deriv((x) => x ** 3, 2.3), 3 * 2.3 ** 2, 1e-6) || 'firstprin');
const qd = { v: (t) => 10 * t - 3 * t * t, a: (t) => 10 - 6 * t, x: (t) => 5 * t * t - t ** 3 };
qd.v2 = qd.v(2);
qd.a2 = qd.a(2);
qd.rest = 10 / 3;
add('quartic-short3', short({
  marks: 3,
  stem: 'The position of a body moving along a line is x = 5t² − t³ (x in m, t in s). Find its velocity and acceleration at t = 2 s and the instant, other than t = 0, at which it is momentarily at rest.',
  model: r`Differentiating, $v = \dfrac{dx}{dt} = 10t - 3t^2$, so $v(2) = 20 - 12 = ${qd.v2}$ m s$^{-1}$. Differentiating again, $a = \dfrac{dv}{dt} = 10 - 6t$, so $a(2) = ${qd.a2}$ m s$^{-2}$, which means the body is slowing down at that instant, since the velocity is positive and the acceleration negative. The body is at rest when the velocity is zero, so when $10t - 3t^2 = t(10 - 3t) = 0$, that is, apart from $t = 0$, at $t = \dfrac{10}{3} = ${dec(qd.rest, 3)}$ s.`,
  sol: 'v = dx/dt, a = dv/dt, then v = 0.',
  scheme: [[`v = 10t − 3t², v(2) = ${qd.v2} m s⁻¹`, 1], [`a = 10 − 6t, a(2) = ${mn(qd.a2)} m s⁻²`, 1], [`v = 0 at t = 10/3 = ${dec(qd.rest, 3)} s`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(deriv(qd.x, 2), qd.v2, 1e-6) && near(deriv(qd.v, 2), qd.a2, 1e-6) && Math.abs(deriv(qd.x, qd.rest)) < 1e-6 || 'quartic');
const ai = { c0: 2 };
ai.v = (t) => 3 * t * t - 4 * t + ai.c0;
ai.x = (t) => t ** 3 - 2 * t * t + ai.c0 * t;
add('accint-short3', short({
  marks: 3,
  stem: 'The acceleration of a particle is a = 6t − 4 (SI units). At t = 0 it is at the origin moving with a velocity of 2 m s⁻¹. Find its velocity and its position at t = 3 s by integration.',
  model: r`Integrating the acceleration $a = \dfrac{dv}{dt}$ with respect to time gives $v = 3t^2 - 4t + C$; the condition that the velocity is 2 m s$^{-1}$ at $t = 0$ fixes $C = 2$, so $v(3) = 27 - 12 + 2 = ${ai.v(3)}$ m s$^{-1}$. Integrating the velocity in turn gives $x = t^3 - 2t^2 + 2t + C'$; the particle starts at the origin, so $x(0) = 0$ fixes $C' = 0$, so $x(3) = 27 - 18 + 6 = ${ai.x(3)}$ m.`,
  sol: 'Integrate a, fix C from v(0); integrate v, fix C′ from x(0).',
  scheme: [['v = 3t² − 4t + C with C = 2 from v(0) = 2', 1], [`v(3) = ${ai.v(3)} m s⁻¹`, 1], [`x = t³ − 2t² + 2t, x(3) = ${ai.x(3)} m`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(integ((t) => 6 * t - 4, 0, 3) + 2, ai.v(3), 1e-6) && near(integ(ai.v, 0, 3), ai.x(3), 1e-6) || 'accint');
add('vtdesc-short3', short({
  marks: 3,
  stem: 'A car accelerates uniformly from rest, moves at constant speed and then brakes uniformly to rest. Describe its v–t graph and explain how the acceleration in each stage and the total distance are found from it.',
  model: 'The graph is a sloping straight line from the origin, then a horizontal line, then a straight line sloping down to the time axis. The slope of each part is the acceleration there: positive, zero and negative. The total distance is the area between the graph and the time axis, found by adding the triangle, the rectangle and the second triangle, or the area of the trapezium.',
  sol: 'Three straight pieces; slope = a; total area = distance.',
  scheme: [['Shape: rising line, horizontal line, falling line', 1], ['Slope of each part = acceleration (positive, zero, negative)', 1], ['Total area under the graph = distance travelled', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('graphderiv-short3', short({
  marks: 3,
  stem: 'Using the v–t graph of a body moving with uniform acceleration a, derive the relation s = ut + ½at².',
  model: r`Let the velocity rise uniformly from $u$ at $t = 0$ to $v$ at time $t$. The displacement is the area under the v–t line. It is a rectangle of height $u$ and width $t$, giving $ut$, plus a triangle of base $t$ and height $v - u$, giving $\tfrac{1}{2}(v - u)t$. The slope gives $v - u = at$, so the triangle has area $\tfrac{1}{2}at^2$. Hence $s = ut + \tfrac{1}{2}at^2$.`,
  sol: 'Rectangle plus triangle under the v–t line.',
  scheme: [['v–t line from u to v; displacement = area under it', 1], ['Rectangle ut plus triangle ½(v − u)t', 1], ['Substituting v − u = at: s = ut + ½at²', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('calcderiv-short3', short({
  marks: 3,
  stem: 'Derive the equations v = u + at and s = ut + ½at² by the calculus method.',
  model: r`For a constant acceleration $a = \dfrac{dv}{dt}$, so $\int_u^v dv = \int_0^t a\,dt$, which gives $v - u = at$, that is $v = u + at$. Since the velocity is $v = \dfrac{dx}{dt}$, the displacement follows from $\int_0^s dx = \int_0^t (u + at)\,dt$, and evaluating the integral gives $s = ut + \tfrac{1}{2}at^2$. The limits come from the starting values $v = u$ and $x = 0$ at $t = 0$; the acceleration $a$ was taken outside the integral because it is constant.`,
  sol: 'Integrate a, then v, between t = 0 and t.',
  scheme: [['a = dv/dt integrated from 0 to t', 1], ['v = u + at', 1], ['Integrate v = dx/dt: s = ut + ½at²', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('analyt-short3', short({
  marks: 3,
  stem: 'Derive the equation v² = u² + 2as by the analytical method.',
  model: r`From the definition of acceleration as the change of velocity per unit time, $v = u + at$, so $t = \dfrac{v - u}{a}$. For uniform acceleration the velocity changes at a steady rate, so the mean velocity is $\dfrac{u + v}{2}$, and the displacement, which is the mean velocity multiplied by the time, is $s = \dfrac{u + v}{2}\cdot t = \dfrac{(u + v)(v - u)}{2a} = \dfrac{v^2 - u^2}{2a}$. Rearranging gives $v^2 = u^2 + 2as$, which contains no time and so is used when time is neither given nor asked.`,
  sol: 'Eliminate t between v = u + at and s = ½(u + v)t.',
  scheme: [['t = (v − u)/a from the definition of a', 1], ['Mean velocity (u + v)/2 and s = ½(u + v)t', 1], ['Substitution and rearrangement: v² = u² + 2as', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('maxh-short3', short({
  marks: 3,
  stem: 'A body is thrown vertically up with velocity u. Derive expressions for the greatest height it reaches and its total time of flight, neglecting air resistance.',
  model: r`Taking up as positive, $a = -g$. At the highest point $v = 0$, so $0 = u^2 - 2gH$ and the greatest height is $H = \dfrac{u^2}{2g}$. The time to the top follows from $0 = u - gt$, so $t = \dfrac{u}{g}$. The body returns to the starting level when $0 = uT - \tfrac{1}{2}gT^2$, so the total time of flight is $T = \dfrac{2u}{g}$, twice the time of rise.`,
  sol: 'v² = u² − 2gH with v = 0, then v = u − gt.',
  scheme: [['a = −g and v = 0 at the top: H = u²/2g', 1], ['Time to the top t = u/g', 1], ['Return when y = 0: T = 2u/g', 1]],
  d: 3, c: 'understanding', t: [5],
}));
const ls = { last: 24.5 };
ls.T = ls.last / g + 0.5;
ls.h = 0.5 * g * ls.T ** 2;
add('lastsec-short3', short({
  marks: 3,
  stem: 'A stone dropped from a cliff covers 24.5 m in the last second before it hits the ground. Taking g = 9.8 m s⁻², find the height of the cliff.',
  model: r`Let the fall last $T$ seconds. The distance in the last second is the distance in $T$ seconds minus that in $(T-1)$ seconds: $\tfrac{1}{2}gT^2 - \tfrac{1}{2}g(T-1)^2 = g\left(T - \tfrac{1}{2}\right)$. Putting this equal to the given $24.5$ m and using $g = 9.8$ m s$^{-2}$ gives $9.8\left(T - \tfrac{1}{2}\right) = 24.5$, so $T = ${R6(ls.T)}$ s. The time of fall is therefore ${R6(ls.T)} s, and the height of the cliff is $h = \tfrac{1}{2}gT^2 = \tfrac{1}{2}(9.8)(${R6(ls.T)})^2 = ${R6(ls.h)}$ m.`,
  sol: 'Difference of distances in T and T − 1 seconds.',
  scheme: [['Last-second distance = ½gT² − ½g(T − 1)² = g(T − ½)', 1], [`g(T − ½) = 24.5 gives T = ${R6(ls.T)} s`, 1], [`h = ½gT² = ${R6(ls.h)} m`, 1]],
  d: 4, c: 'application', t: [5],
}), () => {
  const T = 3;
  return near(0.5 * g * T * T - 0.5 * g * (T - 1) ** 2, 24.5, 1e-9) && near(0.5 * g * T * T, ls.h, 1e-9) || 'lastsec';
});
