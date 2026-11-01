// ICSE 10 Physics ch01 Force: Turning Effect and Circular Motion — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Force: Turning Effect and Circular Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Translational and rotational motion; moment of a force',
      r`- **Translational motion:** every particle moves the same distance in the same direction. **Rotational motion:** the body turns about a fixed axis.
- A force on a pivoted body turns it; its turning effect is the **moment of the force (torque)**: $\tau = F \times d$, $d$ = perpendicular distance from the axis to the line of action.
- Units: **N m** (SI), **dyne cm** (cgs); $1\ \text{N m} = 10^{7}\ \text{dyne cm}$.
- Moment increases with force and with perpendicular distance: handles far from hinges, long spanners, large steering wheels. A force through the axis has zero moment.`,
      [kt('Moment of a force', 'The turning effect of a force about an axis, equal to the force multiplied by the perpendicular distance of its line of action from the axis.'), kt('Rotational motion', 'Motion in which a body turns about a fixed axis, each particle moving in a circle.')],
      [fm(r`\tau = F \times d`, 'Moment of a force'), fm(r`1\ \text{N m} = 10^{7}\ \text{dyne cm}`, 'Unit conversion')],
      table(['F', 'd', 'Moment'], [['20 N', '0.5 m', '10 N m'], ['10 N', '1.0 m', '10 N m'], ['40 N', '0 m', '0']], 'Table showing that equal moments can come from different force and distance pairs'),
      [1],
    ),
    sec(
      '2. Clockwise and anticlockwise moments; couples',
      r`- Convention: **anticlockwise moments positive, clockwise negative**.
- **Resultant moment** = algebraic sum; the body turns in the sense of the larger total.
- **Couple:** two equal, opposite, parallel forces not in the same line; produces rotation only. Moment of couple = $F \times$ arm (perpendicular distance between the forces). Examples: tap, steering wheel, winding a key.`,
      [kt('Couple', 'Two equal and opposite parallel forces whose lines of action are different; it produces rotation only.'), kt('Resultant moment', 'The algebraic sum of the moments of all the forces about a point.')],
      [fm(r`\tau_{\text{couple}} = F \times \text{arm}`, 'Moment of a couple')],
      table(['Moment', 'Sense', 'Sign'], [['Turns like clock hands', 'Clockwise', 'Negative'], ['Turns the other way', 'Anticlockwise', 'Positive']], 'Table of the sign convention for moments'),
      [2],
    ),
    sec(
      '3. Equilibrium and the principle of moments',
      r`**Equilibrium:** a body at rest (static) or moving with uniform velocity without turning faster (dynamic). Conditions: (1) **resultant force = 0**; (2) **resultant moment = 0**.

**Principle of moments:** for a body in equilibrium, sum of anticlockwise moments about any point = sum of clockwise moments about that point: $W_{1} d_{1} = W_{2} d_{2}$.

**Verification:** metre rule on a knife edge, weights hung on both sides, adjusted until the rule is horizontal; products W × d agree. Take moments about the fulcrum; include the rule’s weight at its centre of gravity if it is not pivoted there.`,
      [kt('Principle of moments', 'For a body in equilibrium, the sum of the anticlockwise moments about any point equals the sum of the clockwise moments about that point.'), kt('Static equilibrium', 'The state of a body at rest under several forces.')],
      [fm(r`W_{1} d_{1} = W_{2} d_{2}`, 'Balanced lever')],
      table(['Condition', 'Prevents'], [['Resultant force zero', 'Translation'], ['Resultant moment zero', 'Rotation']], 'Table of the two conditions of equilibrium'),
      [3],
    ),
    sec(
      '4. Centre of gravity',
      `**Centre of gravity (G):** the point through which the whole weight of a body acts, in every orientation. It may lie outside the material (ring).

| Body | Position of G |
|---|---|
| Uniform rod | Mid-point |
| Ring | Centre of the ring |
| Circular disc | Centre |
| Triangular lamina | Point of intersection of the medians |
| Rectangle, parallelogram | Intersection of the diagonals |

**Irregular lamina:** suspend freely from a hole with a plumb line, mark the vertical; repeat from a second hole; G is where the lines cross.`,
      [kt('Centre of gravity', 'The point through which the whole weight of a body acts, whatever its position.')],
      [],
      table(['Shape', 'G'], [['Rod', 'Middle'], ['Ring', 'Centre (in air)'], ['Triangle', 'Medians meet']], 'Table of centres of gravity of three regular shapes'),
      [4],
    ),
    sec(
      '5. Uniform circular motion',
      `- **Uniform circular motion:** constant speed along a circle; velocity is along the **tangent** and changes direction continuously, so the motion is **accelerated**.
- **Centripetal force:** the real force towards the centre that keeps the body in the circle (tension, gravity, friction, electrostatic attraction).
- **Centrifugal force:** the apparent outward force felt in the rotating frame; fictitious, equal and opposite to the centripetal force.
- If the centripetal force stops, the body moves off along the tangent (mud flying off a cycle wheel).`,
      [kt('Centripetal force', 'The force directed towards the centre that keeps a body moving in a circle.'), kt('Centrifugal force', 'An apparent outward force felt by a body in a rotating frame; it is not a real force.')],
      [],
      table(['Motion', 'Centripetal force from'], [['Moon round Earth', 'Gravity'], ['Car on a bend', 'Friction'], ['Stone on string', 'Tension']], 'Table of three circular motions and their centripetal forces'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the length along a body instead of the perpendicular distance.
- Forgetting to convert cm to m for N m answers.
- Ignoring the weight of a metre rule pivoted away from its centre.
- Saying uniform circular motion is not accelerated.

**How marks are usually awarded**
- Calculations (1 mark each step): formula, substitution with units, answer with unit and sense.
- Definitions (1 mark): include “perpendicular distance”, “about any point”, “whole weight acts”.
- Circular motion (1 mark each): direction of velocity and of centripetal force.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Translational motion?', 'Every particle moves the same distance in the same direction.', 'definition', 1),
    fc(2, 'Rotational motion?', 'Turning about a fixed axis.', 'definition', 1),
    fc(3, 'Moment of a force?', 'Force × perpendicular distance from the axis.', 'formula', 1),
    fc(4, 'SI unit of moment?', 'Newton metre (N m).', 'fact', 1),
    fc(5, 'cgs unit of moment?', 'Dyne centimetre (dyne cm).', 'fact', 1),
    fc(6, '1 N m in dyne cm?', '10⁷ dyne cm.', 'formula', 1),
    fc(7, 'Why is a door handle far from the hinges?', 'Larger distance, so less force for the same moment.', 'concept', 1),
    fc(8, 'Moment of a force through the axis?', 'Zero.', 'fact', 1),
    fc(9, 'Sign of an anticlockwise moment (usual convention)?', 'Positive.', 'fact', 2),
    fc(10, 'Resultant moment?', 'Algebraic sum of all moments about the point.', 'definition', 2),
    fc(11, 'Couple?', 'Two equal, opposite, parallel forces not in one line.', 'definition', 2),
    fc(12, 'Effect of a couple?', 'Rotation only.', 'fact', 2),
    fc(13, 'Moment of a couple?', 'One force × arm of the couple.', 'formula', 2),
    fc(14, 'Conditions of equilibrium?', 'Resultant force zero and resultant moment zero.', 'concept', 3),
    fc(15, 'Principle of moments?', 'Sum of anticlockwise moments = sum of clockwise moments.', 'definition', 3),
    fc(16, 'Static vs dynamic equilibrium?', 'At rest vs moving with constant velocity.', 'concept', 3),
    fc(17, 'Example of dynamic equilibrium?', 'A raindrop falling at terminal speed.', 'example', 3),
    fc(18, 'Where is the weight of a uniform metre rule?', 'At the 50 cm mark.', 'fact', 3),
    fc(19, 'Centre of gravity?', 'Point through which the whole weight acts.', 'definition', 4),
    fc(20, 'G of a ring?', 'At its centre (outside the material).', 'fact', 4),
    fc(21, 'G of a triangular lamina?', 'Where the medians meet.', 'fact', 4),
    fc(22, 'Finding G of an irregular lamina?', 'Plumb lines from two suspension points cross at G.', 'concept', 4),
    fc(23, 'Uniform circular motion: speed?', 'Constant.', 'fact', 5),
    fc(24, 'Why is uniform circular motion accelerated?', 'Direction of velocity changes continuously.', 'concept', 5),
    fc(25, 'Direction of velocity in circular motion?', 'Along the tangent.', 'fact', 5),
    fc(26, 'Centripetal force direction?', 'Towards the centre.', 'fact', 5),
    fc(27, 'Is centrifugal force real?', 'No: an apparent force in the rotating frame.', 'concept', 5),
    fc(28, 'Centripetal force for the Moon?', 'Earth’s gravitational pull.', 'example', 5),
    fc(29, 'Stone released from a whirling string moves?', 'Along the tangent.', 'fact', 5),
    fc(30, 'Exam tip: moments', 'Perpendicular distance, metres, and say the sense.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
