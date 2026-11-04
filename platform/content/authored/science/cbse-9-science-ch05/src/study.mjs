// ch05 Force and Laws of Motion — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Force and Laws of Motion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Balanced and unbalanced forces',
      r`A **force** is a push or a pull, with a size and a direction. Its SI unit is the **newton** (N). The single force equal to the combined effect of all the forces on a body is the **net force**.

- **Balanced forces:** net force zero. The body stays at rest or keeps moving at constant velocity.
- **Unbalanced forces:** net force not zero. The velocity changes (speed, direction or both).
- For forces along one line, subtract the smaller from the larger; the net force points the way of the larger.`,
      [kt('Force', 'A push or a pull; a vector with SI unit newton.'), kt('Net force', 'The single force with the same effect as all the forces acting on a body.'), kt('Balanced forces', 'Forces whose net force is zero.')],
      [],
      V.balanced,
      [1],
    ),
    sec(
      '2. Friction',
      r`**Friction** opposes the relative motion, or the attempt at motion, of two surfaces in contact, and acts opposite to the motion. **Static** friction adjusts to the applied push up to a maximum; **sliding** friction is smaller than that maximum; **rolling** friction is smaller still.

**Increase** friction with grooves, rough surfaces, sand and harder pressing. **Reduce** it with lubricants, ball bearings, polishing and streamlining. Friction is useful for walking, gripping and braking, and a nuisance for wear and wasted energy in machines.`,
      [kt('Static friction', 'Friction that acts while the surfaces are at rest, rising up to a maximum.'), kt('Sliding friction', 'Friction when one surface slides over another.'), kt('Rolling friction', 'Friction when a wheel or ball rolls; the smallest kind.'), kt('Lubricant', 'Oil or grease that reduces friction.')],
      [],
      V.friction,
      [1],
    ),
    sec(
      "3. Newton's first law and inertia",
      r`**First law:** a body stays at rest, or in uniform motion along a straight line, unless an unbalanced external force acts on it.

**Inertia** is the tendency of a body to resist a change in its state of rest or motion. **Mass** measures inertia: greater mass, greater inertia.

- Rest: dust leaves a carpet when it is beaten; a coin stays when a cloth is pulled quickly.
- Motion: passengers lurch forward when a bus brakes.
- Direction: passengers lean outward at a sharp turn.`,
      [kt('First law of motion', 'A body continues in its state of rest or uniform straight-line motion unless a net external force acts on it.'), kt('Inertia', 'The property of a body to resist any change in its state of rest or of uniform motion.')],
      [],
      V.cloth,
      [2],
    ),
    sec(
      "4. Momentum and Newton's second law",
      r`**Momentum** $p = mv$, in kg m s⁻¹, in the direction of the velocity.

**Second law:** the rate of change of momentum is proportional to the net force and is in the direction of the force:
$$F = \dfrac{\Delta p}{\Delta t} = \dfrac{m(v - u)}{t} = ma$$
**One newton** is the force that gives 1 kg an acceleration of 1 m s⁻²: $1\ \text{N} = 1\ \text{kg m s}^{-2}$. For a given force, acceleration is inversely proportional to mass.`,
      [kt('Momentum', 'Product of mass and velocity, p = m v.'), kt('Newton', 'The force that gives a mass of 1 kg an acceleration of 1 m s⁻².')],
      [fm(r`p = mv`, 'Momentum'), fm(r`F = ma`, 'Second law'), fm(r`F = \dfrac{\Delta p}{\Delta t}`, 'Force as rate of change of momentum')],
      V.afPlot,
      [3],
    ),
    sec(
      '5. Impulse, cricket catches and airbags',
      r`**Impulse** $= F t = \Delta p$, the change of momentum; on a force–time graph it is the area. For a fixed change of momentum, a longer time means a smaller force.

A fielder pulls her hands back when catching, an airbag lengthens the time over which a passenger stops, and a foam mat protects a high jumper. A ball of 0.20 kg at 24 m s⁻¹ has a momentum of 4.8 kg m s⁻¹, stopped in 0.05 s needs 96 N and in 0.40 s needs 12 N.`,
      [kt('Impulse', 'Force multiplied by the time for which it acts; equal to the change in momentum.')],
      [fm(r`F\,t = \Delta p`, 'Impulse')],
      V.impulse,
      [3],
    ),
    sec(
      "6. Newton's third law and recoil",
      r`**Third law:** to every action there is an equal and opposite reaction. The two forces act on **different bodies**, so they never cancel.

Examples: a rocket and the gas it throws out, a swimmer and the water, a foot and the ground when walking, a gun and its bullet.

**Simple consequence.** The two forces of a pair act for the same time, so the two bodies get equal and opposite changes of momentum. A gun and bullet initially at rest end with equal and opposite momenta, so the total stays zero: $m_\text{bullet} v_\text{bullet} = m_\text{gun} v_\text{gun}$. The lighter body has the greater speed.`,
      [kt('Action and reaction', 'The two equal and opposite forces of an interaction, acting on different bodies.'), kt('Recoil', 'The backward motion of a gun when it fires a bullet.')],
      [fm(r`m_1 v_1 = m_2 v_2`, 'Recoil from rest (speeds, opposite directions)')],
      V.recoil,
      [4],
    ),
  ],
  exam_tips_md: `- Write the law or formula first, then substitute with units (N, kg, m s⁻², kg m s⁻¹).
- Convert grams to kilograms before using F = ma.
- Explain inertia by naming rest, motion or direction.
- Action and reaction act on different bodies, so they do not cancel.
- In recoil, state that the momenta are equal and opposite.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a force?', 'A push or a pull, with size and direction. SI unit: newton (N).', 'definition', 1),
    fc(2, 'What are balanced forces?', 'Forces whose net force is zero; they do not change the state of motion.', 'definition', 1),
    fc(3, 'What do unbalanced forces do?', 'They change the velocity of the body: its speed, its direction or both.', 'concept', 1),
    fc(4, 'A 30 N pull and 12 N friction act on a block. Net force?', '18 N in the direction of the pull.', 'example', 1),
    fc(5, 'What is friction?', 'The force that opposes the relative motion, or the attempt at motion, of surfaces in contact.', 'definition', 1),
    fc(6, 'Three kinds of friction?', 'Static, sliding and rolling. Rolling is the smallest.', 'fact', 1),
    fc(7, 'Which is larger: maximum static friction or sliding friction?', 'Maximum static friction.', 'concept', 1),
    fc(8, 'Two ways to increase friction?', 'Grooves on tyres and shoes; sprinkling sand on a slippery road.', 'example', 1),
    fc(9, 'Two ways to reduce friction?', 'Lubricants (oil, grease) and ball bearings.', 'example', 1),
    fc(10, "State Newton's first law.", 'A body stays at rest or in uniform motion in a straight line unless an unbalanced external force acts on it.', 'definition', 2),
    fc(11, 'What is inertia?', 'The property of a body to resist a change in its state of rest or of uniform motion.', 'definition', 2),
    fc(12, 'What measures inertia?', 'Mass: greater mass means greater inertia.', 'fact', 2),
    fc(13, 'Why does dust fall from a carpet when it is beaten?', 'The dust has inertia of rest and stays behind when the carpet moves.', 'example', 2),
    fc(14, 'Why do passengers lurch forward when a bus brakes?', 'Inertia of motion: their bodies tend to keep moving forward.', 'example', 2),
    fc(15, 'Why do passengers lean outward on a sharp turn?', 'Inertia of direction: their bodies tend to go straight on.', 'example', 2),
    fc(16, 'Define momentum.', r`The product of mass and velocity, $p = mv$, in kg m s⁻¹.`, 'definition', 3),
    fc(17, "State Newton's second law.", 'The rate of change of momentum is proportional to the net force and acts in its direction.', 'definition', 3),
    fc(18, 'Formula for the second law?', r`$F = \Delta p/\Delta t = ma$`, 'formula', 3),
    fc(19, 'Define one newton.', r`The force that gives a mass of 1 kg an acceleration of $1\ \text{m s}^{-2}$.`, 'definition', 3),
    fc(20, 'Net force 6.0 N on 1.5 kg. Acceleration?', r`$a = F/m = 4.0\ \text{m s}^{-2}$`, 'example', 3),
    fc(21, 'What is impulse?', r`Force times time, $Ft$; equal to the change of momentum.`, 'definition', 3),
    fc(22, 'What does the area under a force–time graph give?', 'The impulse, which is the change of momentum.', 'concept', 3),
    fc(23, 'Why do fielders pull their hands back when catching a fast ball?', 'A longer stopping time gives a smaller force for the same change of momentum.', 'concept', 3),
    fc(24, 'How does an airbag reduce injury?', 'It lengthens the time over which the passenger stops, so the force is smaller.', 'concept', 3),
    fc(25, "State Newton's third law.", 'To every action there is an equal and opposite reaction.', 'definition', 4),
    fc(26, 'Do action and reaction cancel each other?', 'No. They act on different bodies.', 'concept', 4),
    fc(27, 'What pushes a rocket upward?', 'The hot gas it throws out downward pushes the rocket up (the reaction).', 'example', 4),
    fc(28, 'Why does a swimmer move forward?', 'She pushes the water backward and the water pushes her forward.', 'example', 4),
    fc(29, 'Why does a gun recoil?', 'The gun pushes the bullet forward and the bullet pushes the gun backward with an equal force.', 'example', 4),
    fc(30, 'In recoil, which body moves faster, the gun or the bullet?', 'The bullet, because the momenta are equal and the bullet has the smaller mass.', 'concept', 4),
    fc(31, 'Gun 4.0 kg, bullet 0.020 kg at 400 m/s. Recoil speed?', r`$v = 0.020 \times 400 / 4.0 = 2.0\ \text{m s}^{-1}$ backward.`, 'example', 4),
    fc(32, 'Exam tip for force problems?', 'Write the formula, convert to kg, and give the unit of the answer.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
