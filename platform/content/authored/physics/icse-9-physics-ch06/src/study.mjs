// ICSE 9 Physics ch06 Upthrust and Archimedes' Principle: notes and flashcards.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { SW, SW_APP, RD_TABLE, ICE_BELOW, ICE_ABOVE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Upthrust and Archimedes’ Principle — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Buoyancy and upthrust',
      r`A liquid exerts an **upward force** on a body placed in it. This force is the **upthrust** (buoyant force); the property of a liquid to exert it is **buoyancy**. SI unit: newton.

- It acts **vertically upwards** through the centre of gravity of the liquid displaced (the centre of buoyancy). It arises because the pressure on the lower face of the body is greater than on the upper face.
- A body seems **lighter** in a liquid: a spring balance reads ${SW.w} N for a body in air and ${SW_APP} N when it is fully in water, because of an upthrust of ${SW.u} N.
- **Upthrust depends on** the volume of the body that is immersed, the density of the liquid and $g$. It does **not** depend on the weight, density or material of the body, or (once the body is fully immersed) on the depth.`,
      [kt('Upthrust', 'The upward force exerted by a liquid on a body immersed in it; also called the buoyant force.'), kt('Buoyancy', 'The property of a liquid by which it exerts an upward force on a body placed in it.')],
      [fm(r`\text{Upthrust} = V \rho g`, 'Upthrust on a body with volume V immersed in a liquid of density ρ')],
      table(['Upthrust depends on', 'Upthrust does not depend on'], [['Volume of the body immersed', 'Weight of the body'], ['Density of the liquid', 'Density or material of the body'], ['g', 'Depth, once fully immersed']], 'Table of the factors that upthrust does and does not depend on'),
      [1],
    ),
    sec(
      '2. Archimedes’ principle and apparent weight',
      r`**Archimedes’ principle:** when a body is fully or partly immersed in a fluid, it experiences an upthrust equal to the **weight of the fluid displaced** by it.

Upthrust $U = V \rho g$ with $V$ the volume immersed (in m³; $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$), $\rho$ the density of the liquid.

**Apparent weight** is the weight of the body in the liquid. When the upthrust is **less than the weight**, the body sinks and
apparent weight $=$ weight in air $-$ upthrust.

**Verification:** a body hangs from a spring balance in an overflow can; the water that overflows into a beaker is collected and weighed; its weight equals the loss of weight of the body (the upthrust).`,
      [kt('Archimedes’ principle', 'A body immersed in a fluid experiences an upthrust equal to the weight of the fluid displaced.'), kt('Apparent weight', 'The weight of a body when immersed in a liquid; weight in air minus the upthrust.')],
      [fm(r`W_{\text{apparent}} = W_{\text{air}} - U`, 'Apparent weight')],
      table(['Quantity', 'Value for a body of volume 600 cm³ weighing 15 N in air, in water'], [['Upthrust', `${SW.u} N`], ['Apparent weight', `${SW_APP} N`]], 'Table of the upthrust and apparent weight for a sample body'),
      [2],
    ),
    sec(
      '3. Relative density',
      r`**Relative density (RD)** of a substance = density of the substance ÷ density of water. It is a ratio and has **no unit**. Density in kg m⁻³ $=$ RD $\times$ 1000.

**RD of a solid denser than water** (spring balance, solid insoluble in water): weigh it in air ($W_1$) and fully in water ($W_2$). The loss of weight $W_1 - W_2$ is the weight of an equal volume of water, so $\text{RD} = \dfrac{W_1}{W_1 - W_2}$.

**RD of a liquid:** weigh a solid that sinks in both liquids in air ($W_1$), in water ($W_2$) and in the liquid ($W_3$): $\text{RD of the liquid} = \dfrac{W_1 - W_3}{W_1 - W_2}$.`,
      [kt('Relative density', 'The ratio of the density of a substance to the density of water at 4 °C; it has no unit.')],
      [fm(r`\text{RD of a solid} = \dfrac{W_1}{W_1 - W_2}`, 'RD of a solid denser than water'), fm(r`\text{RD of a liquid} = \dfrac{W_1 - W_3}{W_1 - W_2}`, 'RD of a liquid')],
      table(['Substance', 'Relative density'], RD_TABLE.map(([n, rd]) => [n, `${rd}`]), 'Table of the relative densities of five substances'),
      [3],
    ),
    sec(
      '4. Floatation',
      r`A body of density $\rho_b$ in a liquid of density $\rho_l$:

| Condition | Result |
|---|---|
| $\rho_b > \rho_l$ (U less than W) | **Sinks**; apparent weight = W − U |
| $\rho_b = \rho_l$ (U = W) | **Floats fully immersed** at any depth |
| $\rho_b < \rho_l$ | Rises and **floats partly immersed**, with U = W for the immersed volume |

**Law of floatation:** a floating body displaces its own weight of liquid: weight of the body = weight of the liquid displaced = upthrust.

**Fraction immersed:** $\dfrac{V_{\text{in}}}{V} = \dfrac{\rho_b}{\rho_l}$. In water, a body of density 600 kg m⁻³ floats with 60% of its volume below the surface.`,
      [kt('Law of floatation', 'A floating body displaces a weight of liquid equal to its own weight.')],
      [fm(r`\dfrac{V_{\text{in}}}{V} = \dfrac{\rho_{\text{body}}}{\rho_{\text{liquid}}}`, 'Fraction of the volume immersed')],
      table(['Case', 'Upthrust compared with weight'], [['Sinking', 'Less than the weight'], ['Floating fully immersed', 'Equal to the weight'], ['Floating partly immersed', 'Equal to the weight']], 'Table of upthrust compared with weight for three cases'),
      [4],
    ),
    sec(
      '5. Applications: ships, submarines, icebergs and balloons',
      r`- **Ship:** an iron ship is hollow, so it displaces a very large weight of water; its **average density** is less than that of water and the upthrust equals its weight. A **Plimsoll line** marks how low a ship may float safely in different waters.
- **Submarine:** it has **ballast tanks**. Filling them with sea water increases its weight (and average density) so it **dives**; blowing the water out with compressed air makes it **rise**. To stay at one depth its average density equals that of the water.
- **Iceberg:** ice (about 900 kg m⁻³) is slightly less dense than sea water (about 1030 kg m⁻³), so about ${ICE_BELOW}% of the volume is below the surface and only about ${ICE_ABOVE}% above it.
- **Balloon:** filled with a gas (hot air, hydrogen or helium) less dense than the surrounding air; it rises while the upthrust $V \rho_{\text{air}} g$ exceeds its total weight, and stops where the two are equal.

Densities are approximate and differ slightly between books; each question states the values it uses.`,
      [kt('Ballast tank', 'A tank in a submarine that is filled with water to make it dive and emptied to make it rise.')],
      [],
      table(['Object', 'Why it floats or rises'], [['Ship', 'Hollow shape, average density below water'], ['Submarine', 'Ballast tanks change its weight'], ['Iceberg', 'Ice is a little less dense than sea water'], ['Balloon', 'Filled with a gas less dense than air']], 'Table of four applications and why each floats or rises'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the volume in cm³ with density in kg m⁻³ and g in m s⁻² without converting.
- Taking the weight of the body as the upthrust when the body is sinking.
- Giving relative density a unit.
- Using the whole volume of a floating body in V ρ g instead of the volume immersed.

**How marks are usually awarded**
- Statements (2 marks): Archimedes' principle with "weight of liquid displaced"; the law of floatation.
- Numericals (1 to 3 marks): formula, substitution with units, answer with unit.
- Applications (2 to 3 marks): average density for a ship, ballast tanks for a submarine, the ratio of densities for an iceberg.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Upthrust?', 'The upward force of a liquid on a body immersed in it.', 'definition', 1),
    fc(2, 'Direction of upthrust?', 'Vertically upwards.', 'fact', 1),
    fc(3, 'Why does a body seem lighter in water?', 'Upthrust acts against its weight.', 'concept', 1),
    fc(4, 'Upthrust depends on?', 'Volume immersed, density of the liquid, g.', 'concept', 1),
    fc(5, 'Does depth change the upthrust on a fully immersed body?', 'No.', 'concept', 1),
    fc(6, 'Does the weight of the body change the upthrust?', 'No.', 'concept', 1),
    fc(7, 'SI unit of upthrust?', 'Newton.', 'fact', 1),
    fc(8, 'Archimedes’ principle?', 'Upthrust equals the weight of the fluid displaced.', 'definition', 2),
    fc(9, 'Formula for upthrust?', 'U = V ρ g.', 'formula', 2),
    fc(10, '1 cm³ in m³?', '10⁻⁶ m³.', 'fact', 2),
    fc(11, 'Apparent weight?', 'Weight in air minus upthrust.', 'formula', 2),
    fc(12, 'Instrument for apparent weight?', 'Spring balance.', 'fact', 2),
    fc(13, 'Overflow can shows?', 'Weight of displaced water equals the upthrust.', 'concept', 2),
    fc(14, 'Relative density?', 'Density of substance ÷ density of water; no unit.', 'definition', 3),
    fc(15, 'Density from RD?', 'RD × 1000 kg m⁻³.', 'formula', 3),
    fc(16, 'RD of a solid denser than water?', 'W(air) ÷ [W(air) − W(water)].', 'formula', 3),
    fc(17, 'RD of a liquid?', '[W(air) − W(liquid)] ÷ [W(air) − W(water)].', 'formula', 3),
    fc(18, 'Loss of weight in water equals?', 'Weight of an equal volume of water.', 'concept', 3),
    fc(19, 'RD of mercury?', '13.6.', 'fact', 3),
    fc(20, 'A denser body in a liquid?', 'Sinks (U < W).', 'fact', 4),
    fc(21, 'Equal densities?', 'Floats fully immersed at any depth (U = W).', 'fact', 4),
    fc(22, 'Less dense body?', 'Floats partly immersed.', 'fact', 4),
    fc(23, 'Law of floatation?', 'Weight of a floating body = weight of liquid displaced.', 'definition', 4),
    fc(24, 'Fraction immersed?', 'Density of body ÷ density of liquid.', 'formula', 4),
    fc(25, 'A floating body: U compared with W?', 'U = W.', 'fact', 4),
    fc(26, 'Why does an iron ship float?', 'Hollow shape, average density below water.', 'concept', 5),
    fc(27, 'How does a submarine dive?', 'Fills ballast tanks with water.', 'concept', 5),
    fc(28, 'How does a submarine rise?', 'Compressed air blows water out of the tanks.', 'concept', 5),
    fc(29, 'Why is only a small part of an iceberg seen?', 'Ice is only slightly less dense than sea water.', 'concept', 5),
    fc(30, 'Why does a balloon rise?', 'It holds a gas less dense than air, so upthrust exceeds weight.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
