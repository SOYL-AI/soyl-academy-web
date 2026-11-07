// ICSE 9 Physics ch03 notes and flashcards.
import { T, unit, PROV, table, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { FORCES, INV_SQ, COIN, BUS, CATCH, PAIR, ROCKET } from './svgs.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Force and Newton’s Laws of Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Contact and non-contact forces',
      `A **force** is a push or a pull. It can change the speed or direction of a body, start or stop its motion, or change its shape.

**Contact forces** act only when bodies touch:
- **friction**: opposes the sliding of one surface over another;
- **normal reaction**: the push of a surface on a body resting on it, perpendicular to the surface;
- **tension**: the pull exerted by a stretched string, rope or wire.

**Non-contact forces** act across a gap: **gravitational**, **electric** and **magnetic** forces. They become weaker as the distance increases. For many of them the force varies inversely as the **square of the distance**: if the distance is doubled the force becomes ${'one quarter'}; if it is tripled the force becomes one ninth. A force of 36 N at 1 m falls to ${K.ISQ_3} N at 3 m.`,
      [kt('Contact force', 'A force that acts only when the bodies are in contact, such as friction, normal reaction and tension.'), kt('Non-contact force', 'A force that acts without contact between the bodies, such as gravitational, electric and magnetic forces.')],
      [fm(r`F \propto \dfrac{1}{r^2}`, 'Inverse square dependence on distance')],
      svgV(FORCES, 'A block pulled along a table with tension, friction, normal reaction and weight'),
      [1],
      [svgV(INV_SQ, 'Graph of force against distance, inverse square law')],
    ),
    sec(
      '2. Units of force',
      `The **newton (N)** is the SI unit of force: the force that gives a body of mass **1 kg** an acceleration of **1 m s⁻²**, so 1 N = 1 kg m s⁻². The **dyne** is the cgs unit: the force that gives **1 g** an acceleration of **1 cm s⁻²**, so 1 dyne = 1 g cm s⁻².

**1 N = 10⁵ dyne.**

**Gravitational units.** The **kilogram-force (kgf)** is the force (weight) with which the Earth attracts a mass of 1 kg: **1 kgf = 9.8 N** (take 10 N if the question says g = 10 m s⁻²). The **gram-force (gf)** is the pull on 1 g: **1 gf = 980 dyne**; 1 kgf = 1000 gf.

| Conversion | Value |
|---|---|
| 4 kgf to N | 4 × 9.8 = ${K.U.kgf4} N |
| 2.5 N to dyne | 2.5 × 10⁵ = ${K.U.n25_dyne} dyne |
| 250 gf to dyne | 250 × 980 = ${K.U.gf250_dyne} dyne |

kgf and gf are used in this course only for conversions; second-law numericals use newton or dyne.`,
      [kt('Newton', 'The force that gives a mass of 1 kg an acceleration of 1 m s⁻².'), kt('Dyne', 'The force that gives a mass of 1 g an acceleration of 1 cm s⁻².'), kt('Kilogram-force', 'The force with which the Earth attracts a mass of 1 kg; 1 kgf = 9.8 N.')],
      [fm(r`1\ \text{N} = 10^5\ \text{dyne}`, 'Newton and dyne'), fm(r`1\ \text{kgf} = 9.8\ \text{N}`, 'Kilogram-force')],
      null,
      [2],
    ),
    sec(
      '3. Newton’s first law and inertia',
      `**First law:** a body continues in its state of **rest** or of **uniform motion in a straight line** unless it is acted on by an **external (unbalanced) force**.

**Inertia** is the property of a body by which it **resists any change** in its state of rest or of uniform motion. The first law therefore also **defines force**: a force is that which changes, or tends to change, the state of rest or of uniform motion of a body.

- **Inertia of rest (static inertia):** a body at rest tends to stay at rest. A coin on a card stays in place when the card is flicked sharply and drops into the tumbler; passengers fall backward when a bus starts suddenly.
- **Inertia of motion (dynamic inertia):** a moving body tends to keep moving. A passenger lurches forward when a bus brakes; dust flies out of a beaten carpet; a runner cannot stop at once.

When the net force on a body is zero it moves with constant velocity (or stays at rest); no force is needed to keep it moving steadily once the friction is removed.`,
      [kt('Inertia', 'The property of a body by which it resists a change in its state of rest or of uniform motion in a straight line.'), kt('Force (first law)', 'That which changes or tends to change the state of rest or of uniform motion of a body.')],
      [],
      svgV(COIN, 'A coin dropping into a tumbler as the card is flicked away'),
      [3],
      [svgV(BUS, 'A passenger in a bus that brakes')],
    ),
    sec(
      '4. Momentum and the second law',
      `**Linear momentum** *p* = mass × velocity = **mv**; it is a vector in the direction of the velocity. SI unit **kg m s⁻¹**; cgs unit g cm s⁻¹. A cricket ball of 0.15 kg at 20 m s⁻¹ has p = ${K.BALL_P} kg m s⁻¹.

**Second law:** the **rate of change of momentum** of a body is proportional to the applied force and takes place in the direction of the force. For a body of **constant mass** whose velocity changes from u to v in time t:

F ∝ (mv − mu) ÷ t = m(v − u) ÷ t = ma, and with the units chosen so that the constant is 1: **F = ma**. This defines the newton and the dyne.

**Combining with the equations of motion.** Find a = F ÷ m first, then use v = u + at or S = ut + ½at². A car of 800 kg pushed from rest by 1200 N has a = ${K.CAR_A} m s⁻², v = ${K.CAR_V} m s⁻¹ and S = ${K.CAR_S} m after 5 s. A 1000 kg car stopped from 15 m s⁻¹ in 5 s needs a force of ${-K.BRAKE_F} N.

**Application: catching a ball.** The change of momentum is fixed; the force is (change of momentum) ÷ time. A fielder draws the hands back to **increase the time**, so the **force on the hands is smaller**: for a ball of 0.16 kg moving at 25 m s⁻¹ the force is ${K.CATCH_F1} N in 0.05 s but only ${K.CATCH_F2} N in 0.2 s. The same idea explains cushions, sand beds for jumpers and the bending of knees on landing.

In cgs units F is in dyne, m in g and a in cm s⁻²: 5 × 10⁴ dyne on 250 g gives a = ${K.CGS_A} cm s⁻².`,
      [kt('Linear momentum', 'The product of the mass and the velocity of a body; a vector quantity.'), kt('Second law', 'The rate of change of momentum of a body is proportional to the force applied and is in the direction of the force.')],
      [fm(r`p = mv`, 'Linear momentum'), fm(r`F = \dfrac{mv - mu}{t} = ma`, 'Second law')],
      svgV(CATCH, 'A fielder catching a ball with hands fixed and with hands drawn back'),
      [4],
    ),
    sec(
      '5. Newton’s third law',
      `**Third law:** to every **action** there is an **equal and opposite reaction**.

The action and the reaction:
- are **equal in size** and **opposite in direction**;
- act on **two different bodies**;
- act at the **same time**, and are forces of the **same kind**.

**Pairs in everyday life.** *Walking:* the foot pushes the ground backward (action), the ground pushes the foot forward (reaction). *Rowing:* the oar pushes the water backward, the water pushes the boat forward. *Rocket:* it pushes the exhaust gases downward at high speed, the gases push the rocket upward. A boy pushing a wall with ${K.WALL.F} N receives a push of ${K.WALL.F} N from the wall.

**Why they do not cancel.** Two forces cancel each other only when they act on the **same body**. The action and the reaction act on **different bodies**, so each causes its own effect. (The weight of a book and the normal reaction of the table are *not* an action-reaction pair: they act on the same body.)`,
      [kt('Action and reaction', 'The pair of equal and opposite forces that two interacting bodies exert on each other; they act on different bodies.')],
      [],
      svgV(PAIR, 'A boy pushing a wall, the action and reaction forces shown'),
      [5],
      [svgV(ROCKET, 'A rocket: gases pushed down and the rocket pushed up')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Treating kgf as the SI unit, or writing 1 kgf = 9.8 dyne instead of 9.8 N.
- Using grams or centimetres in F = ma with a force in newtons without converting.
- Saying that a force is needed to keep a body moving at a steady speed (the first law says no net force is needed).
- Saying that action and reaction cancel; they act on different bodies.
- Taking the weight of a book and the normal reaction of the table as an action-reaction pair (they act on the same body).
- Forgetting that momentum is a vector, and giving no unit with an answer.
- In the fielder question, saying the force is smaller because the momentum is smaller; the change of momentum is the same, the time is longer.

**How marks are usually awarded**
- 1 mark: a definition, a unit or a conversion.
- 2 marks: a numerical with the formula, substitution and unit.
- 3 marks: a reasoned answer in three points, or a two-step calculation.
- 10-mark structured question: parts on a situation or figure: write F = ma or the momentum formula, substitute, use an equation of motion where needed, and give units; name the action and reaction pair with the body each force acts on.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define force.', 'A push or a pull that changes, or tends to change, the state of rest or of uniform motion of a body.', 'definition', 1),
    fc(2, 'Three contact forces?', 'Friction, normal reaction and tension.', 'fact', 1),
    fc(3, 'Three non-contact forces?', 'Gravitational, electric and magnetic forces.', 'fact', 1),
    fc(4, 'What is normal reaction?', 'The push of a surface on a body resting on it, at right angles to the surface.', 'definition', 1),
    fc(5, 'Inverse square dependence of a force on distance?', 'F ∝ 1 ÷ r²: double the distance, force becomes one quarter.', 'concept', 1),
    fc(6, 'A force is 36 N at 1 m. Force at 3 m?', '36 ÷ 9 = 4 N.', 'example', 1),
    fc(7, 'Define the newton.', 'The force that gives a mass of 1 kg an acceleration of 1 m s⁻².', 'definition', 2),
    fc(8, 'Define the dyne.', 'The force that gives a mass of 1 g an acceleration of 1 cm s⁻².', 'definition', 2),
    fc(9, 'Relation between newton and dyne?', '1 N = 10⁵ dyne.', 'formula', 2),
    fc(10, 'What is 1 kgf?', 'The force with which the Earth attracts a mass of 1 kg: 9.8 N (10 N if g = 10).', 'definition', 2),
    fc(11, 'What is 1 gf in dyne?', '980 dyne.', 'fact', 2),
    fc(12, 'Relation between kgf and gf?', '1 kgf = 1000 gf.', 'fact', 2),
    fc(13, 'Convert 4 kgf to N.', '4 × 9.8 = 39.2 N.', 'example', 2),
    fc(14, 'Convert 2.5 N to dyne.', '2.5 × 10⁵ = 250000 dyne.', 'example', 2),
    fc(15, 'State Newton’s first law.', 'A body stays at rest or in uniform motion in a straight line unless an external force acts on it.', 'definition', 3),
    fc(16, 'What is inertia?', 'The property of a body to resist a change in its state of rest or of uniform motion.', 'definition', 3),
    fc(17, 'Is a force needed to keep a body moving at a steady speed in a straight line?', 'No: with no net force the body keeps its uniform motion.', 'concept', 3),
    fc(18, 'Inertia of rest: an example?', 'A coin drops into a tumbler when the card under it is flicked away.', 'example', 3),
    fc(19, 'Inertia of motion: an example?', 'A passenger lurches forward when a moving bus brakes suddenly.', 'example', 3),
    fc(20, 'Another name for inertia of rest and of motion?', 'Static inertia and dynamic inertia.', 'fact', 3),
    fc(21, 'Define linear momentum.', 'The product of mass and velocity: p = mv.', 'definition', 4),
    fc(22, 'SI unit of momentum?', 'kg m s⁻¹.', 'fact', 4),
    fc(23, 'State Newton’s second law.', 'The rate of change of momentum is proportional to the applied force and is in the direction of the force.', 'definition', 4),
    fc(24, 'Show that F = ma from the second law.', 'F ∝ (mv − mu) ÷ t = m(v − u) ÷ t = ma.', 'formula', 4),
    fc(25, 'F = ma in SI and cgs units?', 'SI: N, kg, m s⁻²; cgs: dyne, g, cm s⁻².', 'fact', 4),
    fc(26, 'Why does a fielder draw the hands back when catching?', 'The time of stopping increases, so the force (change of momentum ÷ time) decreases.', 'concept', 4),
    fc(27, 'State Newton’s third law.', 'To every action there is an equal and opposite reaction.', 'definition', 5),
    fc(28, 'Do action and reaction act on the same body?', 'No, on two different bodies, so they never cancel.', 'concept', 5),
    fc(29, 'Action-reaction pair in walking?', 'Foot pushes the ground backward; ground pushes the foot forward.', 'example', 5),
    fc(30, 'Action-reaction pair in a rocket?', 'Rocket pushes the gases down; the gases push the rocket up.', 'example', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
