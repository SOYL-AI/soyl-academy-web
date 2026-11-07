// ICSE 9 Physics ch05 Pressure in Fluids: notes and flashcards.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { BRICK_FACES, BRICK_W, VESSEL_P } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Pressure in Fluids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Thrust and pressure',
      r`**Thrust** is the force acting perpendicular to a surface; its SI unit is the newton. **Pressure** is the thrust acting on unit area: $p = \dfrac{F}{A}$. SI unit: **pascal (Pa)**, $1\ \text{Pa} = 1\ \text{N m}^{-2}$. Convert areas first: $1\ \text{cm}^2 = 10^{-4}\ \text{m}^2$.

- The same thrust gives a **larger pressure on a smaller area**. A brick of weight ${BRICK_W} N on a sponge presses most when it stands on its smallest face.
- **Large pressure (small area):** knife edge, needle, nail, axe, pointed tip of a drawing pin.
- **Small pressure (large area):** broad tyres of heavy vehicles, broad straps of a school bag, the wide feet of a camel, skis and snow shoes.
- When a body rests on a surface, its **weight** is the thrust on the surface.`,
      [kt('Thrust', 'The force acting perpendicular to a surface.'), kt('Pressure', 'The thrust acting on a unit area of a surface; p = F / A.'), kt('Pascal', 'The pressure of one newton acting on one square metre.')],
      [fm(r`p = \dfrac{F}{A}`, 'Pressure')],
      table(['Position of the brick', 'Area', 'Pressure'], BRICK_FACES.map((f) => [f.name, `${f.a} cm²`, `${f.p} Pa`]), 'Table of the area and pressure for the three positions of a brick'),
      [1],
    ),
    sec(
      '2. Pressure in a liquid: p = h ρ g',
      r`A liquid presses on the bottom and the walls of its container, and at a point the pressure acts equally in all directions.

**Pressure of a liquid column:** for height $h$, density $\rho$ and base area $A$, the weight of the liquid is $A h \rho g$, so the pressure is $p = \dfrac{A h \rho g}{A} = h \rho g$ (the pressure of the liquid alone; the atmosphere is not included).

**Factors:** the pressure depends on the **depth** $h$, the **density** $\rho$ of the liquid and $g$. It does **not** depend on the shape of the vessel, the area of its base or the quantity of liquid. At the same depth in the same liquid the pressure is the same.

- **Dam:** the wall is made broader at the base because the water pressure increases with depth.
- **Diver:** needs a strong special suit because of the large pressure at depth.
- A jet from a lower hole of a tall vessel is faster than from a higher hole.
- In water ($\rho = 1000$ kg m⁻³, $g = 10$ m s⁻²) the pressure rises by $10\,000$ Pa for every metre of depth. Mercury has $\rho = 13\,600$ kg m⁻³.`,
      [kt('Pressure of a liquid column', 'The pressure at depth h in a liquid of density ρ: p = h ρ g.'), kt('Hydrostatic pressure', 'The pressure in a liquid that is not moving, which increases with depth.')],
      [fm(r`p = h \rho g`, 'Pressure at depth h in a liquid')],
      table(['Depth in water', 'Pressure (ρ = 1000 kg m⁻³, g = 10 m s⁻²)'], [['1 m', '10 000 Pa'], ['5 m', '50 000 Pa'], ['10 m', '100 000 Pa']], 'Table of liquid pressure at three depths in water'),
      [2],
    ),
    sec(
      '3. Transmission of pressure and Pascal’s law',
      r`Liquids are almost incompressible, so pressure applied to a liquid in a closed vessel is passed on to every part of it.

**Pascal’s law:** pressure applied to an enclosed liquid is transmitted equally and undiminished to every part of the liquid and to the walls of the container.

For a closed vessel with two pistons of areas $A_1$ and $A_2$, a force $F_1$ on the first piston gives the pressure $p = \dfrac{F_1}{A_1}$ everywhere, so the force on the second piston is $F_2 = p A_2 = F_1 \dfrac{A_2}{A_1}$.

- **Examples of transmitted pressure:** squeezing a toothpaste tube, a syringe, a sealed bag of milk with holes pricked in it.
- The **pressure** is the same on every piston; the **force** is not.`,
      [kt('Pascal’s law', 'Pressure applied to an enclosed liquid is transmitted equally and undiminished to every part of the liquid and to the walls of the container.')],
      [fm(r`F_2 = F_1 \dfrac{A_2}{A_1}`, 'Force on the second piston')],
      table(['Quantity', 'Small piston', 'Large piston'], [['Pressure', 'F₁ / A₁', 'Same pressure'], ['Force', 'F₁', 'F₁ × A₂ / A₁'], ['Area', 'A₁', 'A₂']], 'Table comparing pressure, force and area on the two pistons'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the area in cm² in p = F / A and calling the answer Pa.
- Using the mass of a body instead of its weight as the thrust.
- Writing that liquid pressure depends on the shape or width of the vessel.
- Saying the same force acts on both pistons instead of the same pressure.

**How marks are usually awarded**
- Definitions (1 mark each): thrust, pressure, unit; Pascal's law in full.
- Numericals (1 to 3 marks): formula, substitution with units, answer with unit.
- Reasons (2 marks): link the area (knife, tyre) or the depth (dam, diver) to pressure.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Thrust?', 'The force acting perpendicular to a surface.', 'definition', 1),
    fc(2, 'Pressure?', 'Thrust per unit area, p = F / A.', 'definition', 1),
    fc(3, 'SI unit of pressure?', 'Pascal, 1 Pa = 1 N m⁻².', 'fact', 1),
    fc(4, '1 cm² in m²?', '10⁻⁴ m².', 'fact', 1),
    fc(5, 'Same thrust, smaller area: pressure?', 'Greater.', 'concept', 1),
    fc(6, 'Why do sharp knives cut better?', 'Small area of the edge gives a large pressure.', 'concept', 1),
    fc(7, 'Why do heavy trucks have broad tyres?', 'Large area gives a smaller pressure on the road.', 'concept', 1),
    fc(8, 'Why is a school bag strap broad?', 'Large area, smaller pressure on the shoulder.', 'example', 1),
    fc(9, 'Thrust of a body resting on a table?', 'Its weight.', 'concept', 1),
    fc(10, 'Is thrust a scalar or a vector?', 'A vector, as it is a force.', 'concept', 1),
    fc(11, 'Pressure of a liquid column?', 'p = h ρ g.', 'formula', 2),
    fc(12, 'Factors affecting liquid pressure?', 'Depth, density, g.', 'concept', 2),
    fc(13, 'Does vessel shape change the pressure at a given depth?', 'No.', 'concept', 2),
    fc(14, 'Does base area change the pressure at a given depth?', 'No.', 'concept', 2),
    fc(15, 'Pressure at the same depth in the same liquid?', 'The same everywhere.', 'fact', 2),
    fc(16, 'Direction of pressure at a point in a liquid?', 'Equal in all directions.', 'fact', 2),
    fc(17, 'Why is a dam broader at the base?', 'Water pressure increases with depth.', 'concept', 2),
    fc(18, 'Why does a diver need a special suit?', 'Large pressure at depth.', 'concept', 2),
    fc(19, 'Pressure rise per metre of water?', '10 000 Pa (ρ = 1000, g = 10).', 'fact', 2),
    fc(20, 'Density of water in SI units?', '1000 kg m⁻³.', 'fact', 2),
    fc(21, 'Density of mercury?', '13 600 kg m⁻³.', 'fact', 2),
    fc(22, 'Depth doubled: liquid pressure?', 'Doubled.', 'fact', 2),
    fc(23, 'Pascal’s law?', 'Pressure on an enclosed liquid is transmitted equally and undiminished everywhere.', 'definition', 3),
    fc(24, 'Force on the second piston?', 'F₂ = F₁ × A₂ / A₁.', 'formula', 3),
    fc(25, 'What is the same on both pistons?', 'The pressure.', 'concept', 3),
    fc(26, 'Why do liquids transmit pressure well?', 'They are almost incompressible.', 'concept', 3),
    fc(27, 'Give an example of transmitted pressure.', 'Squeezing a toothpaste tube; a syringe.', 'example', 3),
    fc(28, 'Pressure on a piston?', 'Force divided by its area.', 'formula', 3),
    fc(29, 'Convert before dividing: area unit?', 'Square metre.', 'exam-tip', 3),
    fc(30, 'Exam tip: reasons', 'Mention area (knife, tyre) or depth (dam, diver).', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
