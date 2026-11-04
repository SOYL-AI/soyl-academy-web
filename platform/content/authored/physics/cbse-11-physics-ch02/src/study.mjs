// ch02 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotChord, plotCubic, plotVcubic, plotThrowY, plotThrowV, plotCar, plotTrolley, plotJourney, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, cub, ex5, ex6, ex7, ex8, car, tro } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Motion in a Straight Line — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Frame of reference, position, path length and displacement',
      r`- Motion is described relative to a **frame of reference**. On a straight line we choose an **origin** and a **positive direction**; the **position** $x$ is the signed distance from the origin.
- Shifting the origin changes every position but not the **displacement** $\Delta x = x_2 - x_1$ (a signed quantity) nor the **path length** (the total length of the route, never negative).
- Always $|\Delta x| \le$ path length. For a rider who goes ${ex1.out} m east and ${ex1.back} m back west, the path length is ${ex1.path} m and the displacement is ${ex1.disp} m east.
- A body at rest in one frame can be moving in another: **rest and motion are relative**.
- In this chapter bodies are treated as **point objects** moving along a straight line, so direction is given by the sign (+ or −).`,
      [kt('Frame of reference', 'A set of an origin, axes and a clock with respect to which positions and times are measured.'), kt('Displacement', 'The signed change of position, final minus initial; it depends only on the end points.'), kt('Path length', 'The total length of the route actually covered; a scalar.')],
      [fm(r`\Delta x = x_2 - x_1`, 'Displacement along a line')],
      V.frame,
      [1],
      [V.path],
    ),
    sec(
      '2. Average and instantaneous velocity and acceleration',
      r`- **Average velocity** $\bar v = \Delta x/\Delta t$ (signed); **average speed** = path length $/\Delta t$ (never negative, and at least $|\bar v|$). For two equal distances at $${ex2.v1}$ and $${ex2.v2}$ km h$^{-1}$ the average speed is $${ex2.avg}$ km h$^{-1}$, not the mean $${ex2.mean}$.
- **Instantaneous velocity** $v = dx/dt$: the slope of the tangent to the x–t graph. Its magnitude is the instantaneous speed.
- **Acceleration** $a = dv/dt = d^2x/dt^2$: the slope of the v–t graph. Velocity and acceleration with the same sign: speeding up; opposite signs: slowing down. $v = 0$ at an instant does not imply $a = 0$.
- Example: $x = 2t^3 - 9t^2 + 12t$ gives $v = 6t^2 - 18t + 12$, $a = 12t - 18$; the particle is at rest at $t = ${cub.r1}$ s and $${cub.r2}$ s. In 0 to 3 s its displacement is ${cub.disp} m but its path length is ${cub.path} m.
- Conversion: 1 m s⁻¹ = 3.6 km h⁻¹.`,
      [kt('Instantaneous velocity', 'The limit of Δx/Δt as Δt → 0, that is dx/dt.'), kt('Acceleration', 'The rate of change of velocity with time, dv/dt.'), kt('Average speed', 'Total path length divided by total time.')],
      [fm(r`v = \dfrac{dx}{dt}`, 'Instantaneous velocity'), fm(r`a = \dfrac{dv}{dt}`, 'Instantaneous acceleration'), fm(r`\bar v = \dfrac{\Delta x}{\Delta t}`, 'Average velocity')],
      plotChord,
      [2],
      [plotCubic, plotVcubic, TABLES.T3],
    ),
    sec(
      '3. Uniformly accelerated motion, free fall and stopping distance',
      r`- For constant acceleration: $v = u + at$, $\;s = ut + \tfrac{1}{2}at^2$, $\;v^2 = u^2 + 2as$ (and $s = \tfrac{1}{2}(u+v)t$). Graphically: slope of the v–t line is $a$; the area under it is $s$ (a rectangle $ut$ plus a triangle $\tfrac{1}{2}at^2$). By calculus: integrate $a = dv/dt$ once for $v$, twice for $x$; use $a = v\,dv/dx$ for $v^2$.
- Example: a metro train from rest at $${ex5.a}$ m s$^{-2}$ reaches $${ex5.v}$ m s$^{-1}$ in $${dec(ex5.t, 3)}$ s after $${dec(ex5.s, 3)}$ m.
- **Free fall:** only gravity acts, $a = g = 9.8$ m s$^{-2}$ downward for every body (air resistance neglected). Dropped from rest: $v = gt$, $y = \tfrac{1}{2}gt^2$; a stone dropped for ${ex6.t} s falls ${dec(ex6.h, 3)} m and reaches ${dec(ex6.v, 3)} m s⁻¹.
- **Thrown upward** at $u$ (up positive, $a = -g$): time to top $u/g$, height $H = u^2/2g$, total time $2u/g$, returns with speed $u$. For $u = ${ex7.u}$ m s$^{-1}$: ${ex7.tup} s, ${dec(ex7.H, 3)} m, ${ex7.T} s.
- **Stopping distance** = reaction distance $vt_r$ + braking distance $v^2/2a$. At ${ex8.v} m s⁻¹, $t_r = ${ex8.tr}$ s and $a = ${ex8.a}$ m s$^{-2}$ it is ${ex8.tot} m; doubling the speed makes it ${ex8.tot2} m. A **reaction time** can be found from a dropped ruler: $t = \sqrt{2d/g}$.`,
      [kt('Uniform acceleration', 'Motion in which the acceleration is constant in magnitude and direction.'), kt('Free fall', 'Motion under gravity alone, with a = g = 9.8 m s⁻² downward.'), kt('Stopping distance', 'Reaction distance plus braking distance.')],
      [fm(r`v = u + at`, 'First equation'), fm(r`s = ut + \tfrac{1}{2}at^2`, 'Second equation'), fm(r`v^2 = u^2 + 2as`, 'Third equation')],
      V.vtarea,
      [3],
      [V.strobe, plotThrowY, plotThrowV, V.stop, TABLES.T8],
    ),
    sec(
      '4. Position–time and velocity–time graphs',
      r`- **x–t graph:** slope = velocity. Horizontal: at rest. Straight sloping line: uniform velocity (steeper = faster; downward slope = moving in the −x direction). Curve: changing velocity. A walker who goes at 3 m s⁻¹ for 20 s, rests 15 s and returns at 2 m s⁻¹ gives slopes +3, 0 and −2.
- **v–t graph:** slope = acceleration; the **signed area** between the curve and the t-axis = displacement. For path length, add the areas without signs. A car that speeds up to 20 m s⁻¹ in 10 s, cruises 20 s and brakes in 5 s covers $${car.tot}$ m with accelerations $+2.0$, $0$ and $-4.0$ m s$^{-2}$.
- **a–t graph:** signed area = change in velocity.
- A trolley with $u = ${tro.u}$ m s$^{-1}$ and $a = ${tro.a}$ m s$^{-2}$: displacement ${tro.disp} m, path length ${tro.path} m in ${tro.T} s (area above the axis ${tro.up} m, below ${tro.down} m).
- Graphs show how a quantity changes with time; they do not show the shape of the path. The equations of uniform acceleration cannot be applied across a point where the acceleration changes.`,
      [kt('Slope', 'The gradient of a graph: velocity on x–t, acceleration on v–t.'), kt('Signed area', 'Area above the t-axis counted positive and below it negative.')],
      [fm(r`s = \int_{t_1}^{t_2} v\,dt`, 'Displacement as area under the v–t graph')],
      V.shapes,
      [4],
      [plotJourney, plotCar, plotTrolley, TABLES.T7],
    ),
  ],
  exam_tips_md: `- Say what is positive before using signs; give directions with displacements and velocities.
- Average speed over several stages = total path ÷ total time.
- For v–t graphs: slope = a, signed area = displacement; split the area where v changes sign to get the path length.
- For free fall write a = ±g explicitly and say "neglecting air resistance".
- Stopping distance = vt_r + v²/2a: the second term grows with the square of the speed.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What two things must be chosen before positions on a straight road can be quoted?', 'An origin and a positive direction (a frame of reference).', 'concept', 1),
    fc(2, 'How does displacement differ from path length?', 'Displacement is the signed change of position (end points only); path length is the total route length, never negative.', 'concept', 1),
    fc(3, 'Which is never smaller: path length or the magnitude of displacement?', 'Path length: it is at least |displacement|.', 'fact', 1),
    fc(4, 'If the origin is moved, which quantity stays unchanged: position or displacement?', 'Displacement.', 'concept', 1),
    fc(5, 'A rider goes 1200 m east and 450 m back west. Displacement and path length?', '750 m east; 1650 m.', 'example', 1),
    fc(6, 'Is a body at rest in one frame always at rest in another?', 'No: rest and motion are relative to the frame.', 'concept', 1),
    fc(7, 'Can displacement be zero when path length is not?', 'Yes, for a round trip.', 'concept', 1),
    fc(8, 'Write average velocity in terms of positions and times.', '$\\bar v = (x_2 - x_1)/(t_2 - t_1)$.', 'formula', 2),
    fc(9, 'Average speed of a journey?', 'Total path length ÷ total time.', 'formula', 2),
    fc(10, 'Two equal distances are covered at 30 and 45 km/h. Average speed?', '36 km/h (not 37.5).', 'example', 2),
    fc(11, 'What is the instantaneous velocity in calculus form?', '$v = dx/dt$.', 'formula', 2),
    fc(12, 'On an x–t graph, what gives the velocity at one instant?', 'The slope of the tangent at that point.', 'concept', 2),
    fc(13, 'Define acceleration.', 'Rate of change of velocity, $a = dv/dt$ (slope of the v–t graph).', 'concept', 2),
    fc(14, 'When does a body slow down in straight-line motion?', 'When velocity and acceleration have opposite signs.', 'concept', 2),
    fc(15, 'Convert 36 km/h to m/s.', '10 m/s (divide by 3.6).', 'example', 2),
    fc(16, 'Which equation of motion has no displacement in it?', '$v = u + at$.', 'formula', 3),
    fc(17, 'Which equation of motion has no time in it?', '$v^2 = u^2 + 2as$.', 'formula', 3),
    fc(18, 'Write the displacement equation for constant acceleration.', '$s = ut + \\tfrac{1}{2}at^2$.', 'formula', 3),
    fc(19, 'How does the v–t graph give $s = ut + \\tfrac{1}{2}at^2$?', 'Area = rectangle $ut$ + triangle $\\tfrac{1}{2}(v-u)t$ with $v - u = at$.', 'concept', 3),
    fc(20, 'Which equations of motion are valid when acceleration varies with time?', 'None of the three; integrate $a(t)$ instead.', 'concept', 3),
    fc(21, 'Value of g used in this chapter?', '9.8 m s⁻² downward.', 'fact', 3),
    fc(22, 'Why does a feather fall slowly in air but not in a vacuum?', 'In air the air resistance is large compared with its weight; in a vacuum only gravity acts.', 'concept', 3),
    fc(23, 'A ball is thrown up at speed u. Height and time to the top?', '$H = u^2/2g$ and $t = u/g$.', 'formula', 3),
    fc(24, 'What are the velocity and acceleration of a ball at the top of its flight?', 'Velocity 0; acceleration g downward.', 'concept', 3),
    fc(25, 'Stopping distance = ?', 'Reaction distance $vt_r$ + braking distance $v^2/2a$.', 'formula', 3),
    fc(26, 'On an x–t graph, what does a horizontal line mean?', 'The body is at rest.', 'concept', 4),
    fc(27, 'What does the area under a v–t graph give?', 'The displacement (signed area).', 'concept', 4),
    fc(28, 'What does the area under an a–t graph give?', 'The change in velocity.', 'concept', 4),
    fc(29, 'A v–t graph crosses the axis. How do you get the path length?', 'Add the areas above and below the axis without signs.', 'concept', 4),
    fc(30, 'Exam tip: what does a motion graph NOT show?', 'The shape of the path in space; it shows one quantity against time.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
