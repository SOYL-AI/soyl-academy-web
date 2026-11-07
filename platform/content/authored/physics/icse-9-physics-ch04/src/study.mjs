// ICSE 9 Physics ch04 Gravitation: notes and flashcards.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { TABLE_RATIO, SB_M, SB_N } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Gravitation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The universal law of gravitation',
      r`Every body in the universe attracts every other body. **Law:** the force of attraction between two bodies is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres. It acts along the line joining the centres.

$F = \dfrac{G\, m_1 m_2}{r^{2}}$, where $G = 6.67 \times 10^{-11}$ N m² kg⁻² has the same value everywhere (that is why it is called universal).

- The two forces of a pair are **equal and opposite** and act on **different bodies**, so they do not cancel. This follows the third law of motion.
- **Ratio method:** if the masses are multiplied by $a$ and $b$ and the distance by $k$, the force is multiplied by $\dfrac{ab}{k^{2}}$.
- **Importance:** the same law explains the fall of bodies, the orbit of the Moon round the Earth, the motion of planets round the Sun, the tides, and the motion of artificial satellites.
- The force between everyday objects is tiny because $G$ is tiny; it is noticeable only when at least one body is very massive.`,
      [kt('Gravitation', 'The force of attraction between any two bodies in the universe.'), kt('Universal gravitational constant G', 'The constant in the law of gravitation; 6.67 × 10⁻¹¹ N m² kg⁻² in SI units, the same for every pair of bodies.')],
      [fm(r`F = \dfrac{G\, m_1 m_2}{r^{2}}`, 'Universal law of gravitation'), fm(r`F_{\text{new}} = F \times \dfrac{ab}{k^{2}}`, 'Ratio method')],
      table(['Change', 'Force becomes'], [['One mass doubled', `${TABLE_RATIO.m1x2} times`], ['Distance doubled', 'one quarter'], ['Distance halved', `${TABLE_RATIO.r_half} times`], ['Distance tripled', 'one ninth'], ['Both masses and the distance doubled', 'unchanged']], 'Table of how the force changes with the masses and the distance'),
      [1],
    ),
    sec(
      '2. Gravity, acceleration due to gravity and free fall',
      r`**Gravity** is the force of attraction of the Earth on a body. A body released near the Earth speeds up; the acceleration it gains is the **acceleration due to gravity**, $g$, about 9.8 m s⁻² (10 m s⁻² where a question says so).

**Free fall:** motion under gravity alone, with no air resistance. Because the pull on a body of mass $m$ is $mg$, its acceleration is $\dfrac{mg}{m} = g$: the mass cancels, so **all bodies fall with the same acceleration**, whatever their masses.

- In air, a feather or a sheet of paper falls slower than a coin because of **air resistance**. In a vacuum tube both fall together.
- Starting from rest, after time $t$: speed $v = g t$ and distance $s = \tfrac{1}{2} g t^{2}$.
- The distances covered in successive equal intervals grow because the speed grows.`,
      [kt('Acceleration due to gravity', 'The acceleration of a freely falling body near the Earth, about 9.8 m s⁻²; it is the same for all bodies.'), kt('Free fall', 'The motion of a body under the action of gravity alone.')],
      [fm(r`v = g t`, 'Speed after time t from rest'), fm(r`s = \tfrac{1}{2} g t^{2}`, 'Distance fallen in time t from rest')],
      table(['Time', 'Speed (g = 10)', 'Distance fallen'], [['1 s', '10 m s⁻¹', '5 m'], ['2 s', '20 m s⁻¹', '20 m'], ['3 s', '30 m s⁻¹', '45 m']], 'Table of speed and distance fallen at one, two and three seconds'),
      [2],
    ),
    sec(
      '3. Mass and weight',
      r`**Mass** is the quantity of matter in a body; it is a scalar, measured in kilograms with a beam (physical) balance, and it is the same everywhere.

**Weight** is the force with which the Earth attracts a body: $W = m g$. It is a vector pointing towards the centre of the Earth, measured with a spring balance, and it changes with the place because $g$ changes. At a place where $g$ is smaller (for example on the Moon) the weight is smaller, but the mass is unchanged.

- SI unit of weight: **newton**. Gravitational unit: **kilogram force (kgf)**; $1\ \text{kgf} = 9.8$ N (about 10 N when $g = 10$ m s⁻² is used). A body of mass $m$ kg weighs $m$ kgf.
- Weight in newton $=$ weight in kgf $\times$ 9.8.

| Property | Mass | Weight |
|---|---|---|
| Meaning | Quantity of matter | Force of gravity on the body |
| SI unit | kilogram | newton |
| Nature | Scalar | Vector |
| Instrument | Beam balance | Spring balance |
| Varies with place | No | Yes |

Books differ on whether 1 kgf is taken as 9.8 N or 10 N; every problem here states the value used.`,
      [kt('Mass', 'The quantity of matter contained in a body; SI unit kilogram.'), kt('Weight', 'The force with which the Earth attracts a body; W = m g; SI unit newton.'), kt('Kilogram force', 'The weight of a one-kilogram mass; equal to 9.8 N.')],
      [fm(r`W = m g`, 'Weight'), fm(r`1\ \text{kgf} = 9.8\ \text{N}`, 'Kilogram force')],
      table(['Mass', 'Weight in kgf', 'Weight in N (1 kgf = 9.8 N)'], [['1 kg', '1', '9.8'], ['5 kg', `${SB_M}`, `${SB_N}`], ['10 kg', '10', '98']], 'Table of three masses with their weights in kgf and in newton'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Measuring the distance from the surfaces instead of from the centres.
- Forgetting to square the distance in the law of gravitation.
- Writing the unit of weight as kg.
- Saying that a heavier body falls faster in a vacuum, or that mass changes from place to place.

**How marks are usually awarded**
- Statement of the law (2 marks): both proportionalities and the line of action.
- Numericals (1 to 3 marks): formula, substitution with units, answer with unit; for ratio problems, the factor for each quantity.
- Mass against weight (3 marks): definition, unit and instrument, one mark each.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Law of gravitation, equation?', 'F = G m₁ m₂ / r².', 'formula', 1),
    fc(2, 'Value of G?', '6.67 × 10⁻¹¹ N m² kg⁻².', 'fact', 1),
    fc(3, 'SI unit of G?', 'N m² kg⁻².', 'fact', 1),
    fc(4, 'Distance in the law is measured between?', 'The centres of the two bodies.', 'concept', 1),
    fc(5, 'Distance doubled: force?', 'One quarter.', 'fact', 1),
    fc(6, 'Distance halved: force?', 'Four times.', 'fact', 1),
    fc(7, 'One mass tripled: force?', 'Three times.', 'fact', 1),
    fc(8, 'Are the two forces of a gravitational pair equal?', 'Yes, equal and opposite, on different bodies.', 'concept', 1),
    fc(9, 'Why do the pair of forces not cancel?', 'They act on different bodies.', 'concept', 1),
    fc(10, 'Why can we not feel the pull between two students?', 'G is tiny and the masses are small.', 'concept', 1),
    fc(11, 'Name two effects explained by the law.', 'Orbit of the Moon; tides (also planets, satellites).', 'example', 1),
    fc(12, 'Gravity?', 'The Earth’s force of attraction on a body.', 'definition', 2),
    fc(13, 'Acceleration due to gravity, value?', 'About 9.8 m s⁻² (10 where stated).', 'fact', 2),
    fc(14, 'Free fall?', 'Motion under gravity alone.', 'definition', 2),
    fc(15, 'Speed after t from rest in free fall?', 'v = g t.', 'formula', 2),
    fc(16, 'Distance in time t from rest?', 's = ½ g t².', 'formula', 2),
    fc(17, 'Why do all bodies fall together in a vacuum?', 'Pull is m g, so acceleration m g / m = g for every mass.', 'concept', 2),
    fc(18, 'Why does a feather fall slowly in air?', 'Air resistance acts strongly on it.', 'concept', 2),
    fc(19, 'Fall distances in 1 s, 2 s, 3 s (g = 10)?', '5 m, 20 m, 45 m.', 'fact', 2),
    fc(20, 'Mass?', 'Quantity of matter in a body (kg).', 'definition', 3),
    fc(21, 'Weight?', 'Force of gravity on a body, W = m g (N).', 'definition', 3),
    fc(22, 'Instrument for mass?', 'Beam balance.', 'fact', 3),
    fc(23, 'Instrument for weight?', 'Spring balance.', 'fact', 3),
    fc(24, 'Is weight a scalar or a vector?', 'A vector, towards the centre of the Earth.', 'concept', 3),
    fc(25, 'Does mass change with place?', 'No.', 'fact', 3),
    fc(26, 'Does weight change with place?', 'Yes, because g changes.', 'fact', 3),
    fc(27, '1 kgf in newton?', '9.8 N.', 'fact', 3),
    fc(28, 'Weight of 1 kg in kgf?', '1 kgf.', 'fact', 3),
    fc(29, 'Convert kgf to N?', 'Multiply by 9.8.', 'formula', 3),
    fc(30, 'Exam tip: ratio problems', 'Write the factor for each quantity, then multiply.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
