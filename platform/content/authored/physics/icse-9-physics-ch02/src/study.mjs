// ICSE 9 Physics ch02 notes and flashcards.
import { T, unit, PROV, svgV, table, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { DT_SHAPES, VT_SHAPES, VT_AREAS, DERIV, FALL, THROW, PATH_BUS } from './svgs.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Motion in One Dimension — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Scalars, vectors, distance and displacement',
      `A **scalar** quantity has only magnitude (distance, speed, mass, time). A **vector** has magnitude **and direction** (displacement, velocity, acceleration, force).

A body is **at rest** if its position does not change with time, and **in motion** if it does. Rest and motion are relative to a reference point.

- **Distance** is the total length of the path travelled; it is a scalar and is never negative.
- **Displacement** is the shortest distance from the initial to the final position, with the direction from start to end; it is a vector.

A school bus that goes 8 km north and 3 km back south covers a distance of ${K.BUS_DIST} km, but its displacement is ${K.BUS_DISP} km north. For a body moving along a straight line without turning back, the magnitude of the displacement equals the distance. When a body returns to its starting point the displacement is zero.`,
      [kt('Distance', 'The total length of the path travelled by a body (scalar).'), kt('Displacement', 'The shortest distance between the initial and final positions, in the direction from initial to final position (vector).')],
      [],
      svgV(PATH_BUS, 'Path of a bus: 8 km north then 3 km south'),
      [1],
    ),
    sec(
      '2. Speed, velocity and acceleration',
      `**Speed** = distance ÷ time (scalar); **velocity** = displacement ÷ time (vector). The SI unit of both is m s⁻¹.

- **Uniform motion:** equal distances in equal intervals of time (however small); the speed is constant.
- **Variable motion:** unequal distances in equal intervals.
- **Average speed** = total distance ÷ total time (do not average the speeds). A rider who covers 900 m in 180 s and 1500 m in 420 s has an average speed of ${K.RIDER_DIST} ÷ ${K.RIDER_T} = ${K.RIDER_V} m s⁻¹.

**Acceleration** is the rate of change of velocity: a = (v − u) ÷ t; SI unit m s⁻². A body speeding up has positive acceleration. If the velocity decreases, a is negative: this is **retardation** (deceleration). A train from rest to 30 m s⁻¹ in 120 s has a = ${K.TRAIN_A} m s⁻².

Motion with **non-uniform acceleration** is outside this course; only uniform acceleration is studied. A body can move with constant speed but changing velocity (for example round a circle), because the direction changes.`,
      [kt('Uniform motion', 'Motion in which a body covers equal distances in equal intervals of time.'), kt('Acceleration', 'The rate of change of velocity of a body.'), kt('Retardation', 'Negative acceleration: the rate at which the velocity of a body decreases.')],
      [fm(r`\text{average speed} = \dfrac{\text{total distance}}{\text{total time}}`, 'Average speed'), fm(r`a = \dfrac{v - u}{t}`, 'Acceleration')],
      null,
      [2],
    ),
    sec(
      '3. Distance-time and velocity-time graphs',
      `**Distance-time graph** (distance on the y-axis, time on the x-axis):
- horizontal line: body at rest;
- straight sloping line: uniform speed; **slope = speed**;
- curve: variable speed.

**Velocity-time graph:**
- horizontal line: uniform velocity (a = 0);
- straight line sloping up: uniform acceleration; **slope = acceleration**;
- straight line sloping down: uniform retardation;
- **area under the graph = displacement**.

For the tram graph, the acceleration in the first 6 s is 12 ÷ 6 = ${K.VT_A1} m s⁻² and the distance is the sum of two triangles and a rectangle: ${K.VT_S1} + ${K.VT_S2} + ${K.VT_S3} = ${K.VT_S} m.

On a distance-time graph the steeper line shows the greater speed. A curve that becomes steeper shows increasing speed.`,
      [kt('Slope of a graph', 'The change in the quantity on the y-axis divided by the change on the x-axis between two points of the line.')],
      [fm(r`\text{speed} = \text{slope of the } s\text{–}t \text{ graph}`, 'Speed from a distance-time graph'), fm(r`a = \text{slope of the } v\text{–}t \text{ graph}`, 'Acceleration from a velocity-time graph')],
      svgV(VT_AREAS, 'Velocity-time graph of a tram with its areas'),
      [3],
      [svgV(DT_SHAPES, 'Distance-time graph shapes'), svgV(VT_SHAPES, 'Velocity-time graph shapes')],
    ),
    sec(
      '4. Equations of uniformly accelerated motion',
      `For a body with initial velocity u, uniform acceleration a, final velocity v after time t and displacement S:

1. **v = u + at**
2. **S = ut + ½at²**
3. **S = ½(u + v)t**
4. **v² = u² + 2aS**

**Graphical derivation.** On the v–t graph the slope is a = (v − u) ÷ t, which gives (1). The area under the line is S: a rectangle ut plus a triangle ½ t (v − u) = ½ a t², which gives (2). The whole area is a trapezoid ½(u + v)t, which gives (3). Putting t = (v − u) ÷ a in (3) gives (4).

**Using the equations.** Pick the equation that contains the three known quantities and the unknown. Take the direction of motion as positive. A body that stops has v = 0 and a is negative.

Example: u = 5 m s⁻¹, a = 2 m s⁻², t = 8 s gives v = ${K.CAR1_V} m s⁻¹ and S = ${K.CAR1_S} m. A car at 20 m s⁻¹ with retardation 5 m s⁻² stops in ${K.STOP_T} s after ${K.STOP_S} m.

The equations hold only for **uniform** acceleration.`,
      [kt('Uniformly accelerated motion', 'Motion in which the velocity changes by equal amounts in equal intervals of time.')],
      [fm(r`v = u + at`, 'First equation'), fm(r`S = ut + \dfrac{1}{2}at^2`, 'Second equation'), fm(r`S = \dfrac{1}{2}(u + v)t`, 'Third equation'), fm(r`v^2 = u^2 + 2aS`, 'Fourth equation')],
      svgV(DERIV, 'Velocity-time graph used to derive the equations of motion'),
      [4],
    ),
    sec(
      '5. Motion under gravity',
      `A body that moves only under the force of gravity is in **free fall**. In the absence of air resistance, all bodies fall with the same acceleration **g**, directed downward. In this chapter **g = 10 m s⁻²** (the value 9.8 m s⁻² is also used in books; a question will state the value).

**Dropped body** (u = 0, a = +g with downward positive): v = gt, S = ½gt², v² = 2gS. A stone dropped from 45 m takes ${K.DROP45_T} s and reaches the ground at ${K.DROP45_V} m s⁻¹.

**Body thrown upward** (take upward as positive, a = −g): the velocity falls by 10 m s⁻¹ every second; at the highest point **v = 0** but the acceleration is still g downward. Time to the top = u ÷ g; maximum height = u² ÷ 2g; the body returns to the starting level with the same speed after twice the time taken to rise. For u = 20 m s⁻¹: ${K.T20_UP} s to rise, ${K.T20_H} m high, ${K.T20_FLIGHT} s in the air.`,
      [kt('Free fall', 'The motion of a body under gravity alone, with no air resistance.'), kt('Acceleration due to gravity', 'The acceleration g of a freely falling body; taken as 10 m s⁻² in this chapter.')],
      [fm(r`S = \dfrac{1}{2}gt^2 \quad (u = 0)`, 'Distance fallen from rest'), fm(r`H = \dfrac{u^2}{2g},\quad t_{\text{up}} = \dfrac{u}{g}`, 'Thrown upward')],
      svgV(FALL, 'A ball dropped from rest'),
      [5],
      [svgV(THROW, 'A ball thrown vertically upward')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the distance when displacement is asked (or the other way round), and leaving out the direction of a vector.
- Averaging two speeds instead of using total distance ÷ total time.
- Forgetting to convert km per hour to m per second or minutes to seconds.
- Dropping the negative sign of a retardation, or using g = +10 for a body thrown upward with upward positive.
- Using the equations of motion when the acceleration is not constant.
- Reading the slope of a velocity-time graph as speed (it is acceleration), or taking the area under a distance-time graph as displacement (only the velocity-time area gives it).
- Forgetting that v = 0 at the highest point of a throw but the acceleration is still g.

**How marks are usually awarded**
- 1 mark: a definition, a unit or one reading from a graph.
- 2 marks: a numerical with the formula, substitution and unit.
- 3 marks: a short derivation or a calculation in two steps.
- 10-mark structured question: parts on a graph or a free-fall situation: label the axes, show every substitution and give units; for a graphical derivation draw the graph and mark u, v, t and the areas.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Scalar quantity?', 'A quantity with magnitude only, such as distance, speed, mass and time.', 'definition', 1),
    fc(2, 'Vector quantity?', 'A quantity with magnitude and direction, such as displacement, velocity and acceleration.', 'definition', 1),
    fc(3, 'Define distance.', 'The total length of the path travelled by a body (scalar).', 'definition', 1),
    fc(4, 'Define displacement.', 'The shortest distance from the initial to the final position, in the direction from the start to the end.', 'definition', 1),
    fc(5, 'When is displacement zero although distance is not?', 'When the body returns to its starting point.', 'concept', 1),
    fc(6, 'A bus goes 8 km north then 3 km back: distance and displacement?', '11 km and 5 km north.', 'example', 1),
    fc(7, 'When is a body at rest?', 'When its position does not change with time.', 'definition', 1),
    fc(8, 'Define speed and velocity.', 'Speed = distance ÷ time; velocity = displacement ÷ time.', 'definition', 2),
    fc(9, 'Uniform motion?', 'Equal distances covered in equal intervals of time.', 'definition', 2),
    fc(10, 'Average speed?', 'Total distance ÷ total time.', 'formula', 2),
    fc(11, 'Define acceleration.', 'The rate of change of velocity: a = (v − u) ÷ t.', 'definition', 2),
    fc(12, 'SI unit of acceleration?', 'm s⁻².', 'fact', 2),
    fc(13, 'What is retardation?', 'Negative acceleration: the velocity decreases with time.', 'definition', 2),
    fc(14, 'Constant speed but changing velocity: example?', 'A car on a circular track: the direction keeps changing.', 'concept', 2),
    fc(15, 'Slope of a distance-time graph?', 'The speed.', 'concept', 3),
    fc(16, 'Distance-time graph, horizontal line?', 'The body is at rest.', 'concept', 3),
    fc(17, 'Slope of a velocity-time graph?', 'The acceleration.', 'concept', 3),
    fc(18, 'Area under a velocity-time graph?', 'The displacement.', 'concept', 3),
    fc(19, 'Velocity-time graph, horizontal line?', 'Uniform velocity, zero acceleration.', 'concept', 3),
    fc(20, 'Velocity-time graph sloping downward?', 'Uniform retardation.', 'concept', 3),
    fc(21, 'The four equations of motion?', 'v = u + at; S = ut + ½at²; S = ½(u + v)t; v² = u² + 2aS.', 'formula', 4),
    fc(22, 'How is v = u + at derived?', 'From the slope of the v–t graph: a = (v − u) ÷ t.', 'concept', 4),
    fc(23, 'How is S = ut + ½at² derived?', 'Area under the v–t graph: rectangle ut plus triangle ½ t (v − u).', 'concept', 4),
    fc(24, 'Which equation has no time in it?', 'v² = u² + 2aS.', 'formula', 4),
    fc(25, 'Condition for the equations of motion?', 'The acceleration must be uniform.', 'exam-tip', 4),
    fc(26, 'Value of g used in this chapter?', '10 m s⁻² (9.8 m s⁻² in some books), downward.', 'fact', 5),
    fc(27, 'Dropped body: u and S?', 'u = 0; S = ½gt².', 'formula', 5),
    fc(28, 'Body thrown upward: time to the top and maximum height?', 't = u ÷ g; H = u² ÷ 2g.', 'formula', 5),
    fc(29, 'At the highest point of a throw, v and a?', 'v = 0; a = g downward.', 'concept', 5),
    fc(30, 'Speed on returning to the starting level?', 'The same as the speed of throw, after twice the time of rise.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
