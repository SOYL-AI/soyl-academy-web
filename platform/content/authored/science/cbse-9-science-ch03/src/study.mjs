// ch03 Motion — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Distance and displacement',
      r`A body is in motion if its position changes with time, measured against a chosen reference point. The SI unit of length is the metre (m).

- **Distance** is the total length of the path. It is a scalar: size only, never negative.
- **Displacement** is the shortest straight-line change of position from start to end, with its direction. It is a vector.
- Displacement can be smaller than the distance (a curved or bent path), equal to it (straight line, no turning back), or zero (the body returns to its start).`,
      [kt('Distance', 'Length of the path travelled; a scalar quantity.'), kt('Displacement', 'Shortest change of position from start to end, with direction; a vector quantity.'), kt('Scalar', 'A quantity with size only.'), kt('Vector', 'A quantity with both size and direction.')],
      [],
      V.disp,
      [1],
    ),
    sec(
      '2. Speed, velocity and acceleration',
      r`**Speed** $=$ distance ÷ time (scalar). **Velocity** $=$ displacement ÷ time (vector). Both are in m s⁻¹. To change km/h to m/s divide by 3.6.

**Average velocity** is total displacement over total time; **instantaneous velocity** is the velocity at a particular moment. Velocity is **uniform** if neither size nor direction changes.

**Acceleration** is the rate of change of velocity, $a = (v - u)/t$, in m s⁻². Speeding up gives positive acceleration, slowing down negative acceleration (**retardation**). A body can have zero velocity at an instant and still be accelerating, as a ball does at the top of its flight.`,
      [kt('Average velocity', 'Total displacement divided by total time taken.'), kt('Instantaneous velocity', 'Velocity at one particular instant of time.'), kt('Acceleration', 'Change in velocity per unit time; SI unit m s⁻².'), kt('Retardation', 'Negative acceleration: the body is slowing down.')],
      [fm(r`v = \dfrac{\text{displacement}}{\text{time}}`, 'Velocity'), fm(r`a = \dfrac{v - u}{t}`, 'Acceleration')],
      table(['Quantity', 'Formula', 'SI unit'], [['Speed', 'distance ÷ time', 'm/s'], ['Velocity', 'displacement ÷ time', 'm/s'], ['Acceleration', '(v − u) ÷ t', 'm/s²']], 'Table of formulas and SI units for speed, velocity and acceleration'),
      [1],
    ),
    sec(
      '3. Position–time graphs',
      r`Time goes on the x-axis and position on the y-axis.

- A flat line: the body is at rest.
- A straight sloping line: uniform velocity. **Slope $= \Delta x / \Delta t =$ velocity.**
- A line sloping down: motion in the negative direction.
- A curve that steepens: increasing velocity (the body is accelerating).

To find the **average velocity** from a graph, choose two points on it and divide the change in position by the change in time.`,
      [kt('Position–time graph', 'A graph of position (y-axis) against time (x-axis).'), kt('Slope', 'Rise divided by run; on a position–time graph it equals velocity.')],
      [fm(r`v = \dfrac{x_2 - x_1}{t_2 - t_1}`, 'Velocity from two points of the graph')],
      V.xtShapes,
      [2],
    ),
    sec(
      '4. Velocity–time graphs',
      r`Time goes on the x-axis and velocity on the y-axis.

- A horizontal line: uniform velocity, zero acceleration.
- A straight rising line: uniform acceleration; a straight falling line: uniform retardation.
- **Slope $=$ acceleration.**
- **Area between the line and the time axis $=$ displacement.** Split an irregular shape into rectangles and triangles. If part of the graph lies below the axis, that area is a displacement in the opposite direction.

For a scooter that speeds up to 10 m s⁻¹ in 5 s, runs steadily for 15 s and stops in 10 s, the total area is $25 + 150 + 50 = 225$ m.`,
      [kt('Velocity–time graph', 'A graph of velocity (y-axis) against time (x-axis).'), kt('Uniform acceleration', 'Velocity changes by equal amounts in equal intervals of time.')],
      [fm(r`s = \text{area under the } v\text{–}t \text{ graph}`, 'Displacement from a velocity–time graph')],
      V.scooter,
      [2],
    ),
    sec(
      '5. Equations of motion for uniform acceleration',
      r`For motion in a straight line with constant acceleration $a$, initial velocity $u$, final velocity $v$, time $t$ and displacement $s$:

$$v = u + at \qquad s = ut + \tfrac12 at^2 \qquad v^2 = u^2 + 2as$$

**Graphical derivation.** On the $v$–$t$ line AB, slope $= (v - u)/t = a$ gives the first. The area under AB is a rectangle $ut$ plus a triangle $\tfrac12 (v - u)t$, and $v - u = at$ gives the second. Eliminating $t$ between $s = \tfrac12 (u + v)t$ and $t = (v - u)/a$ gives the third.

**Algebraic derivation.** The definition $a = (v - u)/t$ gives the first. With average velocity $(u + v)/2$, $s = \tfrac12 (u + v) t$, and putting in $v = u + at$ gives the second.

Take the direction of $u$ as positive. Applications: braking distance of a vehicle, a train gaining speed.`,
      [kt('Equations of motion', 'Three relations between u, v, a, t and s for straight-line motion with uniform acceleration.'), kt('Braking distance', 'Distance a vehicle travels while the brakes bring it to rest.')],
      [fm(r`v = u + at`, 'First equation'), fm(r`s = ut + \tfrac12 at^2`, 'Second equation'), fm(r`v^2 = u^2 + 2as`, 'Third equation')],
      V.vtUniform,
      [3],
    ),
    sec(
      '6. Free fall and uniform circular motion',
      r`**Free fall.** Near the Earth's surface a falling body gains about $9.8\ \text{m s}^{-2}$ of velocity every second (acceleration due to gravity $g$), whatever its mass, when air resistance is small. A ball thrown up with $u$ rises until $v = 0$ at height $u^2 / 2g$ after $u/g$ seconds and returns with the same speed.

**Uniform circular motion.** A body moving in a circle of radius $r$ at constant speed covers the circumference $2\pi r$ in one period $T$:
$$v = \dfrac{2\pi r}{T}$$
The speed is constant but the direction of the velocity (along the tangent) changes continually, so the motion is **accelerated**, with the acceleration directed towards the centre. Examples: a satellite, a merry-go-round, the tip of a fan blade.`,
      [kt('Acceleration due to gravity', 'The acceleration of a freely falling body, about 9.8 m s⁻² downward near the Earth.'), kt('Period', 'Time taken for one complete revolution.'), kt('Uniform circular motion', 'Motion in a circle at constant speed.')],
      [fm(r`v = \dfrac{2\pi r}{T}`, 'Speed in uniform circular motion')],
      V.circle,
      [3, 4],
    ),
  ],
  exam_tips_md: `- Convert km/h to m/s (divide by 3.6) before using any formula.
- Write what is given with its sign (u, v, a, t, s), then choose the equation.
- On a graph, say which two points you used for the slope and show each area you add.
- Remember: a ball at the top of its flight has zero velocity but acceleration 9.8 m s⁻² downward.
- Circular motion: speed is constant, velocity is not, so it is accelerated.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Distance versus displacement?', 'Distance is the path length (scalar). Displacement is the straight-line change of position with direction (vector).', 'definition', 1),
    fc(2, 'SI unit of displacement?', 'Metre (m).', 'fact', 1),
    fc(3, 'Can displacement be zero when distance is not?', 'Yes. A runner who completes a lap returns to the start: displacement zero, distance equal to the lap length.', 'concept', 1),
    fc(4, 'Speed versus velocity?', 'Speed is distance ÷ time (scalar). Velocity is displacement ÷ time (vector).', 'definition', 1),
    fc(5, 'SI unit of speed and velocity?', r`Metre per second, $\text{m s}^{-1}$.`, 'fact', 1),
    fc(6, 'How do you change km/h to m/s?', r`Divide by 3.6. For example $72\ \text{km/h} = 20\ \text{m s}^{-1}$.`, 'example', 1),
    fc(7, 'What is average velocity?', 'Total displacement divided by total time.', 'definition', 1),
    fc(8, 'What is instantaneous velocity?', 'The velocity of a body at one particular instant, such as a speedometer reading with direction.', 'definition', 1),
    fc(9, 'Define acceleration.', r`The rate of change of velocity: $a = (v - u)/t$. SI unit $\text{m s}^{-2}$.`, 'definition', 1),
    fc(10, 'What is retardation?', 'Negative acceleration: the body slows down.', 'definition', 1),
    fc(11, 'What does uniform acceleration mean?', 'Velocity changes by equal amounts in equal intervals of time.', 'concept', 1),
    fc(12, 'What does a flat line on a position–time graph mean?', 'The body is at rest.', 'concept', 2),
    fc(13, 'What does the slope of a position–time graph give?', 'The velocity.', 'concept', 2),
    fc(14, 'What does a straight sloping line on a position–time graph show?', 'Uniform velocity.', 'concept', 2),
    fc(15, 'What does the slope of a velocity–time graph give?', 'The acceleration.', 'concept', 2),
    fc(16, 'What does the area under a velocity–time graph give?', 'The displacement.', 'concept', 2),
    fc(17, 'What does a horizontal line on a v–t graph show?', 'Uniform velocity, zero acceleration.', 'concept', 2),
    fc(18, 'How do you find average velocity from a position–time graph?', r`Divide the change in position by the change in time between two points: $(x_2 - x_1)/(t_2 - t_1)$.`, 'concept', 2),
    fc(19, 'First equation of motion?', r`$v = u + at$`, 'formula', 3),
    fc(20, 'Second equation of motion?', r`$s = ut + \tfrac12 at^2$`, 'formula', 3),
    fc(21, 'Third equation of motion?', r`$v^2 = u^2 + 2as$`, 'formula', 3),
    fc(22, 'When do the equations of motion hold?', 'For motion in a straight line with uniform acceleration.', 'concept', 3),
    fc(23, 'Which equation has no time in it?', r`$v^2 = u^2 + 2as$`, 'concept', 3),
    fc(24, 'How is s = ut + ½at² found from the v–t graph?', 'Area = rectangle (u t) + triangle (½ (v − u) t), and v − u = a t.', 'concept', 3),
    fc(25, 'Value of g used in Class 9?', r`$9.8\ \text{m s}^{-2}$, directed downward.`, 'fact', 3),
    fc(26, 'Velocity and acceleration of a ball at the top of its flight?', r`Velocity is zero; acceleration is still $9.8\ \text{m s}^{-2}$ downward.`, 'concept', 3),
    fc(27, 'Height reached by a ball thrown up at speed u?', r`$H = u^2/2g$, reached after $t = u/g$.`, 'formula', 3),
    fc(28, 'What is uniform circular motion?', 'Motion in a circle at constant speed.', 'definition', 4),
    fc(29, 'Speed of a body in uniform circular motion?', r`$v = 2\pi r / T$`, 'formula', 4),
    fc(30, 'Is uniform circular motion accelerated?', 'Yes. The speed is constant but the direction of velocity changes, so the velocity changes.', 'concept', 4),
    fc(31, 'Direction of the velocity in circular motion?', 'Along the tangent to the circle, at right angles to the radius.', 'concept', 4),
    fc(32, 'Exam tip for acceleration problems?', 'Convert to SI units, take the starting direction as positive, and give the sign of a.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
