// ISC 11 ch02 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec } from '../../isc-11-physics-ch01/src/lib.mjs';
import { V, EX, plotSin, plotPoly, plotVcub, plotCar, plotThrowV, plotThrowY, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, pol, itg, cub, car, ex8, ex9, ex10, ex11, thr } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Motion in a Straight Line — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Frame of reference, distance, displacement, speed and velocity',
      r`- Motion is described relative to a **frame of reference** (origin, axis, clock). A **point mass** is a body whose size can be ignored compared with the distances involved. A body is at **rest** if its position does not change with time in the chosen frame and in **motion** if it does; both are relative.
- On a line we pick an origin and a positive direction. The **position** $x$ is signed. **Displacement** $\Delta x = x_2 - x_1$ depends only on the end points; **distance** (path length) is the length of the route and is never negative. Always $|\Delta x| \le$ distance.
- **Average velocity** $\bar v = \Delta x/\Delta t$ (signed); **average speed** = distance $/\Delta t$. A cyclist who rides ${ex1.out} m east and ${ex1.back} m back west in ${ex1.T} s has distance ${ex1.path} m, displacement ${ex1.disp} m east, average speed ${dec(ex1.vs, 2)} m s⁻¹ and average velocity ${dec(ex1.vv, 2)} m s⁻¹ east.
- For two equal distances at ${ex2.v1} and ${ex2.v2} km h⁻¹ the average speed is ${ex2.avg} km h⁻¹, not the mean ${ex2.mean} km h⁻¹.
- **Instantaneous velocity** $v = \lim_{\Delta t \to 0}\Delta x/\Delta t = dx/dt$, the slope of the tangent to the x–t graph. Conversion: 1 m s⁻¹ = 3.6 km h⁻¹.`,
      [kt('Frame of reference', 'An origin, axes and a clock with respect to which positions and times are measured.'), kt('Displacement', 'The signed change of position, final minus initial.'), kt('Distance', 'The total length of the route covered; a scalar.'), kt('Instantaneous velocity', 'The limit of Δx/Δt as Δt → 0, that is dx/dt.')],
      [fm(r`\Delta x = x_2 - x_1`, 'Displacement along a line'), fm(r`\bar v = \dfrac{\Delta x}{\Delta t}`, 'Average velocity'), fm(r`v = \dfrac{dx}{dt}`, 'Instantaneous velocity')],
      V.road,
      [1],
      [V.path, V.secant, TABLES.T1, TABLES.T2],
    ),
    sec(
      '2. Elementary calculus for physics',
      r`- **Differentiation** measures the rate of change: $\dfrac{dy}{dx} = \lim_{\Delta x \to 0}\dfrac{f(x + \Delta x) - f(x)}{\Delta x}$. Rules: $\dfrac{d}{dx}(x^n) = nx^{n-1}$ (also for negative $n$), the derivative of a constant is $0$, a constant factor stays, and sums are differentiated term by term.
- Standard derivatives (angle in radians): $\dfrac{d}{dx}\sin x = \cos x$, $\dfrac{d}{dx}\cos x = -\sin x$, $\dfrac{d}{dx}e^x = e^x$, $\dfrac{d}{dx}\ln x = \dfrac{1}{x}$.
- In motion $v = dx/dt$ and $a = dv/dt$. Example: $x = ${pol.a}t^3 - 3t^2 + ${pol.c}t + ${pol.d}$ gives $v = 12t^2 - 6t + 2$ and $a = 24t - 6$; at $t = ${pol.t0}$ s, $v = ${pol.v0}$ m s⁻¹ and $a = ${pol.a0}$ m s⁻².
- **Integration** reverses it: $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$ ($n \ne -1$) and $\int_a^b x^n\,dx = \left[\dfrac{x^{n+1}}{n+1}\right]_a^b$. The indefinite integral needs a constant fixed by a starting value; the definite integral is the area under the curve between the limits.
- Example: $v = 3t^2 + 4t$ gives the displacement $\left[t^3 + 2t^2\right]_1^3 = ${itg.disp}$ m between 1 s and 3 s; with $x = ${itg.x0}$ m at $t = 0$, $x = t^3 + 2t^2 + ${itg.x0}$.
- Products, quotients, chain rule and integrals beyond $x^n$ are not needed here.`,
      [kt('Derivative', 'The limit of the change in y over the change in x as the change in x tends to zero; the slope of the tangent.'), kt('Indefinite integral', 'The antiderivative plus an arbitrary constant C.'), kt('Definite integral', 'The change in the antiderivative between two limits; the area under the curve.')],
      [fm(r`\dfrac{d}{dx}(x^n) = n x^{n-1}`, 'Power rule'), fm(r`\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C`, 'Integral of x^n'), fm(r`\int_a^b x^n\,dx = \dfrac{b^{n+1} - a^{n+1}}{n+1}`, 'Definite integral')],
      TABLES.TD,
      [2],
      [plotSin, V.area, TABLES.TI],
    ),
    sec(
      '3. Uniform and non-uniform motion, acceleration and motion graphs',
      r`- **Uniform motion:** constant velocity, $a = 0$. **Non-uniform:** velocity changes. **Acceleration** $a = dv/dt = d^2x/dt^2$ (SI unit m s⁻²); instantaneous acceleration is the slope of the v–t tangent. Same signs of $v$ and $a$: speeding up; opposite: slowing down. $v = 0$ for an instant does not mean $a = 0$.
- **Graphs.** Uniform velocity: s–t straight line, v–t horizontal, a–t on the axis. Uniform acceleration: s–t parabola, v–t straight line, a–t horizontal. The slope of s–t is $v$; the slope of v–t is $a$; the signed area under v–t is the displacement; the area under a–t is the change in velocity.
- A metro train that speeds up to 16 m s⁻¹ in 20 s, cruises 30 s and brakes in 8 s covers ${car.tot} m with accelerations ${car.a1}, 0 and ${car.a3} m s⁻².
- A particle with $x = t^3 - 6t^2 + 9t$ is at rest at ${cub.r1} s and ${cub.r2} s; in ${cub.T} s its displacement is ${cub.disp} m but its distance is ${cub.path} m.`,
      [kt('Uniform acceleration', 'Constant acceleration in magnitude and direction.'), kt('Retardation', 'Acceleration opposite to the velocity, so the speed falls.'), kt('Signed area', 'Area above the t-axis counted positive, below it negative.')],
      [fm(r`a = \dfrac{dv}{dt}`, 'Instantaneous acceleration'), fm(r`s = \int_{t_1}^{t_2} v\,dt`, 'Displacement as area under v–t')],
      V.graphs6,
      [3],
      [plotCar, plotPoly, plotVcub, TABLES.TS, TABLES.TG],
    ),
    sec(
      '4. Equations of uniformly accelerated motion',
      r`- For constant $a$: $v = u + at$, $\;s = ut + \tfrac{1}{2}at^2$, $\;v^2 = u^2 + 2as$ (also $s = \tfrac{1}{2}(u+v)t$; distance in the $n$th second $s_n = u + \tfrac{a}{2}(2n-1)$).
- **Graphical:** slope of the v–t line gives $v = u + at$; area (rectangle $ut$ + triangle $\tfrac{1}{2}at^2$) gives $s$; eliminating $t$ from $s = \tfrac{1}{2}(u+v)t$ with $t = (v-u)/a$ gives $v^2 = u^2 + 2as$.
- **Calculus:** $\int_u^v dv = \int_0^t a\,dt$; $\int_0^s dx = \int_0^t(u + at)\,dt$; $a = v\,dv/dx$ so $\int_u^v v\,dv = a\int_0^s dx$.
- **Analytical:** $a = (v-u)/t$; mean velocity $\tfrac{1}{2}(u+v)$ for uniform change; $s = \bar v\,t$; square $v = u + at$ and use $s$.
- Example: a train at ${ex8.u} m s⁻¹ stopped uniformly in ${ex8.s} m has $a = ${ex8.a}$ m s⁻² and takes ${ex8.t} s. A bus from rest at ${ex9.a} m s⁻² covers ${ex9.sn} m in its ${ex9.n}th second.
- The equations hold only while $a$ is constant and need signs for direction.`,
      [kt('Graphical method', 'Derivation from the slope and area of the v–t graph.'), kt('Calculus method', 'Derivation by integrating the definitions a = dv/dt and v = dx/dt.'), kt('Analytical method', 'Derivation by algebra from the definitions of a and of mean velocity.')],
      [fm(r`v = u + at`, 'First equation'), fm(r`s = ut + \tfrac{1}{2}at^2`, 'Second equation'), fm(r`v^2 = u^2 + 2as`, 'Third equation')],
      V.vtarea,
      [4],
      [TABLES.TE, TABLES.TM, TABLES.TF],
    ),
    sec(
      '5. Motion under gravity',
      r`- Under gravity alone (air resistance ignored) every body has $a = g = 9.8$ m s⁻² **downward**: rising, at the top and falling. Choose a positive direction and keep the signs ($a = -g$ for up positive).
- **Dropped from rest:** $v = gt$, $y = \tfrac{1}{2}gt^2$, $v^2 = 2gh$; distances in successive seconds are in the ratio $1:3:5:\dots$. A coconut dropped for ${ex10.t} s falls ${dec(ex10.h, 3)} m and lands at ${ex10.v} m s⁻¹.
- **Thrown up at $u$:** time to the top $u/g$, greatest height $H = u^2/2g$, time of flight $2u/g$, return speed $u$ (downward); the speed at any height is the same going up and coming down. For $u = ${thr.u}$ m s⁻¹: ${thr.tup} s, ${dec(thr.H, 3)} m, ${thr.T} s.
- The **v–t graph** is one straight line of slope $-g$ from $+u$ to $-u$; the areas above and below the axis are equal.
- From a tower ${ex11.H} m high a stone thrown up at ${ex11.u} m s⁻¹ reaches the ground after ${ex11.t} s, rising ${dec(ex11.up, 5)} m above the tower first.`,
      [kt('Free fall', 'Motion under gravity alone, with a = g = 9.8 m s⁻² downward.'), kt('Time of flight', 'Total time from throw to return to the same level: 2u/g.'), kt('Greatest height', 'H = u²/2g, reached when the velocity is zero.')],
      [fm(r`H = \dfrac{u^2}{2g}`, 'Greatest height'), fm(r`T = \dfrac{2u}{g}`, 'Time of flight'), fm(r`v = u - gt`, 'Velocity of a body thrown up (up positive)')],
      V.fall,
      [5],
      [plotThrowV, plotThrowY],
    ),
  ],
  exam_tips_md: `- Say what is positive before using signs; give directions with displacements and velocities.
- Average speed over several stages = total distance ÷ total time, not the mean of the speeds.
- Show the rule when differentiating or integrating; write the antiderivative in brackets with limits, and add C when there are no limits.
- v–t graph: slope = a, signed area = displacement; split the area where v changes sign to get the distance.
- Derivations of the three equations: say a is constant, draw the labelled graph or write each integral, and finish with the result. Learn all three methods.
- For free fall write a = ±g explicitly and say "neglecting air resistance"; convert km h⁻¹ to m s⁻¹ first.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What must be chosen before positions on a straight road can be quoted?', 'An origin and a positive direction (a frame of reference).', 'concept', 1),
    fc(2, 'When can a body be treated as a point mass?', 'When its size is negligible compared with the distances over which it moves.', 'concept', 1),
    fc(3, 'How does displacement differ from distance?', 'Displacement is the signed change of position (end points only); distance is the total route length, never negative.', 'concept', 1),
    fc(4, 'Which is never smaller: distance or the magnitude of displacement?', 'Distance.', 'fact', 1),
    fc(5, 'Write average speed and average velocity.', 'Average speed = distance ÷ time; average velocity = displacement ÷ time.', 'formula', 1),
    fc(6, 'Two equal distances at 40 and 60 km/h. Average speed?', '48 km/h, not 50: more time is spent at 40 km/h.', 'example', 1),
    fc(7, 'Define instantaneous velocity.', '$v = \\lim_{\\Delta t \\to 0}\\Delta x/\\Delta t = dx/dt$, the slope of the tangent to the x–t graph.', 'formula', 1),
    fc(8, 'Convert 54 km/h to m/s.', '15 m/s (divide by 3.6).', 'example', 1),
    fc(9, 'State the power rule of differentiation.', '$\\dfrac{d}{dx}(x^n) = nx^{n-1}$.', 'formula', 2),
    fc(10, 'Differentiate $\\sin x$ and $\\cos x$.', '$\\cos x$ and $-\\sin x$.', 'formula', 2),
    fc(11, 'Differentiate $e^x$ and $\\ln x$.', '$e^x$ and $1/x$.', 'formula', 2),
    fc(12, 'Derivative of a constant?', 'Zero.', 'fact', 2),
    fc(13, 'If $x = 4t^3 - 3t^2$, what are $v$ and $a$?', '$v = 12t^2 - 6t$ and $a = 24t - 6$.', 'example', 2),
    fc(14, 'Integrate $x^n$ ($n \\ne -1$).', '$x^{n+1}/(n+1) + C$.', 'formula', 2),
    fc(15, 'Why does a definite integral have no constant C?', 'The constant cancels when the lower limit value is subtracted from the upper.', 'concept', 2),
    fc(16, 'What does $\\int_{t_1}^{t_2} v\\,dt$ give?', 'The displacement between $t_1$ and $t_2$ (area under the v–t graph).', 'concept', 2),
    fc(17, 'Define acceleration.', 'Rate of change of velocity, $a = dv/dt$ (slope of the v–t graph); SI unit m s⁻².', 'concept', 3),
    fc(18, 'When does a body slow down in straight-line motion?', 'When velocity and acceleration have opposite signs.', 'concept', 3),
    fc(19, 'A ball at the top of its flight: v and a?', 'v = 0 but a = g downward.', 'concept', 3),
    fc(20, 'Shape of the s–t graph for uniform acceleration?', 'A parabola: the slope (velocity) keeps growing.', 'concept', 3),
    fc(21, 'What does the area under an a–t graph give?', 'The change in velocity.', 'concept', 3),
    fc(22, 'A v–t graph crosses the axis. How is the distance found?', 'Add the areas above and below the axis without signs.', 'concept', 3),
    fc(23, 'List the three equations of uniformly accelerated motion.', '$v = u + at$; $s = ut + \\tfrac{1}{2}at^2$; $v^2 = u^2 + 2as$.', 'formula', 4),
    fc(24, 'Which equation has no time in it?', '$v^2 = u^2 + 2as$.', 'formula', 4),
    fc(25, 'How does the v–t graph give $s = ut + \\tfrac{1}{2}at^2$?', 'Area = rectangle $ut$ + triangle $\\tfrac{1}{2}(v-u)t$ with $v - u = at$.', 'concept', 4),
    fc(26, 'In the calculus derivation, which substitution removes time?', '$a = v\\,dv/dx$, then integrate with respect to position.', 'concept', 4),
    fc(27, 'The equations of motion fail when what happens?', 'When the acceleration is not constant.', 'concept', 4),
    fc(28, 'Value and direction of g near the Earth?', '9.8 m s⁻², vertically downward.', 'fact', 5),
    fc(29, 'A ball is thrown up at u. Height, time to the top and time of flight?', '$H = u^2/2g$; $t = u/g$; $T = 2u/g$.', 'formula', 5),
    fc(30, 'What is the speed on return to the throwing point?', 'The same as the speed of throw, u, directed downward.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
