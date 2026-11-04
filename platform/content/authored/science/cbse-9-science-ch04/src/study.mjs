// ch04 Exploring Mixtures and their Separation — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Exploring Mixtures and their Separation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Pure substances and mixtures',
      r`A **pure substance** (an element or a compound) has fixed composition and sharp, fixed properties such as a melting point. A **mixture** contains two or more substances mixed physically, in any proportion; each keeps its own properties, and the parts can be separated by physical methods.

- **Homogeneous mixture:** uniform throughout (sugar syrup, air without dust, brass, a solid solution).
- **Heterogeneous mixture:** composition varies and parts are often visible (muddy water, sand and iron filings, oil and water).`,
      [kt('Pure substance', 'Matter of fixed composition: an element or a compound.'), kt('Mixture', 'Two or more substances mixed physically in any proportion.'), kt('Homogeneous mixture', 'A mixture with uniform composition throughout.'), kt('Heterogeneous mixture', 'A mixture whose composition varies from place to place.')],
      [],
      table(['Mixture', 'Type'], [['Sugar syrup', 'homogeneous'], ['Brass', 'homogeneous (solid solution)'], ['Muddy water', 'heterogeneous'], ['Sand and iron filings', 'heterogeneous']], 'Table sorting four mixtures into homogeneous and heterogeneous'),
      [1],
    ),
    sec(
      '2. Solutions, suspensions and colloids',
      r`Particle size decides the kind of liquid mixture: below about 1 nm a **solution**, about 1 to 1000 nm a **colloid**, above about 1000 nm a **suspension**.

A solution and a colloid are stable and do not settle. A suspension settles, and its particles are held back by filter paper. A colloid passes through filter paper but **scatters light**: the **Tyndall effect**. A solution does not scatter light. Misty-morning sunbeams in a forest show the Tyndall effect.`,
      [kt('Solution', 'A homogeneous mixture with particles below about 1 nm; clear and stable.'), kt('Colloid', 'A mixture with particles about 1 to 1000 nm; stable, passes through filter paper, scatters light.'), kt('Suspension', 'A heterogeneous mixture with particles above about 1000 nm that settle and are filtered off.'), kt('Tyndall effect', 'The scattering of a light beam by colloidal (or larger) particles, making its path visible.')],
      [],
      V.tyndall,
      [2],
      [V.size],
    ),
    sec(
      '3. Types of colloid',
      r`Colloids are named by the dispersed phase and the medium: **aerosol** (liquid or solid in gas: fog, smoke), **foam** (gas in liquid: shaving cream), **emulsion** (liquid in liquid: milk, face cream), **sol** (solid in liquid: ink, paint) and **gel** (liquid in solid: jelly, cheese).`,
      [kt('Aerosol', 'Tiny liquid drops or solid particles spread in a gas.'), kt('Emulsion', 'A colloid of one liquid spread in another liquid, such as milk.'), kt('Foam', 'Gas bubbles spread in a liquid.'), kt('Sol', 'Solid particles spread in a liquid.'), kt('Gel', 'A liquid spread in a solid, such as jelly.')],
      [],
      table(['Type', 'Dispersed in medium', 'Example'], [['Aerosol', 'liquid/solid in gas', 'fog, smoke'], ['Foam', 'gas in liquid', 'shaving cream'], ['Emulsion', 'liquid in liquid', 'milk'], ['Sol', 'solid in liquid', 'ink'], ['Gel', 'liquid in solid', 'jelly']], 'Table of five colloid types with examples'),
      [2],
    ),
    sec(
      '4. Concentration of a solution',
      r`The **solute** dissolves in the **solvent** to give the **solution**. Concentration can be stated as
$$\text{mass percentage} = \dfrac{\text{mass of solute}}{\text{mass of solution}} \times 100$$
$$\text{volume percentage} = \dfrac{\text{volume of solute}}{\text{volume of solution}} \times 100$$
$$\text{mass by volume percentage} = \dfrac{\text{mass of solute (g)}}{\text{volume of solution (mL)}} \times 100$$
Mass of solution = mass of solute + mass of solvent. Example: 36 g sugar in 164 g water is 36/200 × 100 = 18 % by mass.`,
      [kt('Concentration', 'The amount of solute present in a given amount of solution.'), kt('Mass percentage', 'Mass of solute in 100 g of solution.'), kt('Volume percentage', 'Volume of solute in 100 mL of solution.'), kt('Mass by volume percentage', 'Grams of solute in 100 mL of solution.')],
      [fm(r`\dfrac{m_{\text{solute}}}{m_{\text{solution}}} \times 100`, 'Mass percentage'), fm(r`\dfrac{V_{\text{solute}}}{V_{\text{solution}}} \times 100`, 'Volume percentage'), fm(r`\dfrac{m_{\text{solute}}\ (\text{g})}{V_{\text{solution}}\ (\text{mL})} \times 100`, 'Mass by volume percentage')],
      table(['Case', 'Working', 'Result'], [['36 g sugar in 164 g water', '36 / 200 × 100', '18 % by mass'], ['12 mL lemon juice in 80 mL drink', '12 / 80 × 100', '15 % by volume'], ['9 g salt in 150 mL solution', '9 / 150 × 100', '6 % mass by volume']], 'Table of three concentration calculations'),
      [3],
    ),
    sec(
      '5. Solubility, saturation and crystallisation',
      r`**Solubility** is the maximum mass of solute that dissolves in 100 g of solvent at a given temperature. An **unsaturated** solution can dissolve more; a **saturated** one cannot. On a solubility curve, a point on the curve is saturated and a point below it is unsaturated.

For most solids, solubility **rises** with temperature (potassium nitrate steeply, sodium chloride very little), so cooling a hot saturated solution gives **crystals**. For gases, solubility **falls** as temperature rises. Example from the illustrative curve: 100 g of water saturated at 60 °C gives 110 − 32 = 78 g of crystals when cooled to 20 °C.`,
      [kt('Solubility', 'Maximum mass of solute that dissolves in 100 g of solvent at a given temperature.'), kt('Saturated solution', 'A solution holding the maximum solute at that temperature.'), kt('Unsaturated solution', 'A solution that can still dissolve more solute at that temperature.'), kt('Crystallisation', 'Formation of pure crystals from a hot saturated solution as it cools.')],
      [],
      V.solub,
      [3],
    ),
    sec(
      '6. Evaporation, crystallisation and distillation',
      r`**Evaporation** leaves a dissolved solid behind (the salt pans of Gujarat). **Crystallisation** purifies a solid and avoids charring (jaggery from boiled cane juice).

**Simple distillation** separates liquids with a large difference in boiling point (acetone 56 °C and water 100 °C); the condenser is cooled by water entering at the lower end. **Fractional distillation** uses a fractionating column for close boiling points (ethanol and water, liquefied air, petroleum). The traditional **deg and bhapka** of Kannauj use the same idea to make attars.`,
      [kt('Evaporation', 'Turning a liquid into vapour to leave a dissolved solid behind.'), kt('Distillation', 'Separating liquids by boiling, condensing the vapour and collecting the distillate.'), kt('Fractional distillation', 'Distillation with a fractionating column, used when boiling points are close.'), kt('Distillate', 'The liquid collected after condensation.')],
      [],
      V.distill,
      [4],
    ),
    sec(
      '7. Chromatography, centrifugation and other methods',
      r`**Paper chromatography** separates dyes or pigments by their speed on paper. The base line is drawn in pencil. $R_f = \dfrac{\text{distance moved by the substance}}{\text{distance moved by the solvent front}}$, between 0 and 1, with no unit.

**Centrifugation** flings denser particles to the bottom (cream separator, blood cells). **Churning** of curd makes butter by joining fat droplets. Also: **sublimation** (camphor, ammonium chloride), **separating funnel** (oil and water), **magnet** (iron filings), **winnowing** (husk and grain), **sieving** (atta and bran) and **decantation** (pour off the clear liquid).`,
      [kt('Chromatography', 'Separation of substances that move at different speeds on a stationary phase.'), kt('Rf value', 'Distance moved by a substance divided by distance moved by the solvent front.'), kt('Centrifugation', 'Separating particles by spinning so that the denser ones are thrown to the bottom.'), kt('Sublimation', 'A solid changing directly into vapour on heating.'), kt('Decantation', 'Pouring off the clear liquid after the solid has settled.')],
      [fm(r`R_f = \dfrac{d_{\text{substance}}}{d_{\text{solvent front}}}`, 'Retention factor')],
      V.chromato,
      [4],
      [V.centrifuge],
    ),
  ],
  exam_tips_md: `- Divide by the mass of the whole solution when finding a mass percentage.
- Prove a colloid by the Tyndall effect and by the fact that it does not settle.
- Read solubility curves with dashed guide lines and quote both values.
- Name the property that differs before naming the separation method.
- Draw distillation with cold water entering at the lower end of the condenser.
- Rf has no unit and lies between 0 and 1.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a pure substance?', 'Matter of fixed composition and fixed properties: an element or a compound.', 'definition', 1),
    fc(2, 'What is a mixture?', 'Two or more substances mixed physically in any proportion; each keeps its properties.', 'definition', 1),
    fc(3, 'What is a homogeneous mixture?', 'A mixture with uniform composition throughout, such as sugar syrup or brass.', 'definition', 1),
    fc(4, 'What is a heterogeneous mixture?', 'A mixture whose composition varies; the parts can often be seen, such as muddy water.', 'definition', 1),
    fc(5, 'Is brass a compound or a mixture?', 'A homogeneous mixture: a solid solution of copper and zinc.', 'fact', 1),
    fc(6, 'Particle size in a solution, a colloid and a suspension?', 'Below about 1 nm; about 1 to 1000 nm; above about 1000 nm.', 'fact', 2),
    fc(7, 'Which of solution, colloid, suspension settles on standing?', 'Only the suspension.', 'concept', 2),
    fc(8, 'Which mixtures pass through ordinary filter paper?', 'Solutions and colloids; a suspension leaves a residue.', 'concept', 2),
    fc(9, 'What is the Tyndall effect?', 'The scattering of a light beam by colloid particles, making its path visible.', 'definition', 2),
    fc(10, 'Does a true solution show the Tyndall effect?', 'No; its particles are too small to scatter light.', 'concept', 2),
    fc(11, 'Why do sunbeams show up in a misty forest?', 'Water droplets and dust scatter the sunlight: the Tyndall effect.', 'example', 2),
    fc(12, 'What kind of colloid is fog? Milk? Jelly?', 'Fog: aerosol. Milk: emulsion. Jelly: gel.', 'fact', 2),
    fc(13, 'What is shaving cream as a colloid?', 'A foam: gas bubbles in a liquid.', 'fact', 2),
    fc(14, 'Formula for mass percentage?', r`$\dfrac{\text{mass of solute}}{\text{mass of solution}} \times 100$`, 'formula', 3),
    fc(15, 'Formula for volume percentage?', r`$\dfrac{\text{volume of solute}}{\text{volume of solution}} \times 100$`, 'formula', 3),
    fc(16, 'Formula for mass by volume percentage?', r`$\dfrac{\text{mass of solute (g)}}{\text{volume of solution (mL)}} \times 100$`, 'formula', 3),
    fc(17, '36 g sugar in 164 g water. Mass percentage?', r`$36/200 \times 100 = 18\ \%$`, 'example', 3),
    fc(18, 'What is solubility?', 'The maximum mass of solute that dissolves in 100 g of solvent at a given temperature.', 'definition', 3),
    fc(19, 'Saturated and unsaturated solution?', 'Saturated: holds the maximum solute at that temperature. Unsaturated: can dissolve more.', 'definition', 3),
    fc(20, 'How does temperature affect the solubility of most solids and of gases?', 'Solids: usually rises. Gases: falls.', 'concept', 3),
    fc(21, 'What gives crystals from a hot saturated solution?', 'Cooling it: crystallisation.', 'concept', 3),
    fc(22, 'Which method gives salt on the Gujarat coast?', 'Evaporation of sea water in shallow pans by sun and wind.', 'example', 4),
    fc(23, 'Why prefer crystallisation to evaporating to dryness?', 'It gives purer crystals and avoids charring heat-sensitive solids.', 'concept', 4),
    fc(24, 'When is simple distillation enough?', 'When the boiling points differ by a large amount, such as acetone and water.', 'concept', 4),
    fc(25, 'When is fractional distillation used?', 'For liquids with close boiling points, using a fractionating column.', 'concept', 4),
    fc(26, 'Where does cold water enter a Liebig condenser?', 'At the lower end, and leaves at the upper end.', 'fact', 4),
    fc(27, 'What are the deg and the bhapka?', 'The copper pot and the receiver of the traditional Kannauj attar still.', 'fact', 4),
    fc(28, 'Formula for Rf?', r`$R_f = \dfrac{\text{distance moved by the substance}}{\text{distance moved by the solvent front}}$`, 'formula', 4),
    fc(29, 'Why is the chromatography base line drawn in pencil?', 'Pencil graphite does not dissolve and move with the solvent; ink would.', 'concept', 4),
    fc(30, 'What does centrifugation do?', 'Spins a mixture so that denser particles go to the bottom as sediment.', 'definition', 4),
    fc(31, 'Name the property used: winnowing, sieving, magnet, sublimation.', 'Weight, size, magnetism, and a solid turning straight into vapour.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
