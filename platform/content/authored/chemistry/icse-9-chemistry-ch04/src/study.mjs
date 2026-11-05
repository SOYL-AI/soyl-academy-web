// ICSE 9 Chemistry ch04 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { KNO3, NACL, at, N2_CRYST } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Water as a Universal Solvent: Solutions and Solubility — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Water as a universal solvent; solutions, colloids and suspensions',
      `Water dissolves more substances than any other common liquid (solids such as salt and sugar, liquids such as alcohol, and gases such as ammonia), so it is called the **universal solvent**. Its molecules are **polar**, which lets them pull ionic and polar substances apart. The name is not strictly true: oils, wax and sand do not dissolve in water.

A **solution** has a **solute** dissolved in a **solvent**. Mixtures of a solid or liquid in water are classed by particle size.

| Property | Solution | Colloid | Suspension |
|---|---|---|---|
| Particle size | Smaller than about 1 nm | About 1 nm to 1000 nm | Larger than about 1000 nm |
| Appearance | Clear | Clear or slightly cloudy | Cloudy |
| Settles on standing? | No | No | Yes |
| Tyndall effect (beam of light seen)? | No | Yes | Yes (cloudy liquid) |
| Passes through filter paper? | Yes | Yes | No |
| Example | Sugar or salt in water | Milk, starch in water | Chalk powder in water |

The **Tyndall effect** is the scattering of a beam of light by colloidal particles so that the path of the beam is seen. The size limits are approximate; books quote them slightly differently.`,
      [kt('Solute', 'The substance that dissolves in a solution.'), kt('Solvent', 'The liquid in which the solute dissolves.'), kt('Colloid', 'A mixture with particles large enough to scatter light but too small to settle.'), kt('Suspension', 'A cloudy mixture whose large particles settle on standing.')],
      V.tyndall,
      [1],
    ),
    sec(
      '2. Saturated, unsaturated and supersaturated solutions',
      `**Solubility** of a solid in water is the **mass of the solid, in grams, that saturates 100 g of water at a stated temperature**.

| Type | Meaning | Test with a crystal of the solute |
|---|---|---|
| **Unsaturated** | Can still dissolve more solute at that temperature | The crystal dissolves |
| **Saturated** | Holds as much solute as it can at that temperature | The crystal stays unchanged |
| **Supersaturated** | Holds more than a saturated solution at that temperature (unstable) | Extra solute crystallises out at once |

**Making a saturated solution:** add the solute in small portions to water, stirring after each portion, until a little stays undissolved; pour off or filter the clear liquid.

**Making a supersaturated solution:** cool a hot saturated solution slowly and undisturbed. A crystal added or a knock makes the excess crystallise.

If a solution is saturated, more solute dissolves only if the temperature is raised (for most solids).`,
      [kt('Solubility', 'Grams of solute that saturate 100 g of water at a given temperature.'), kt('Saturated solution', 'A solution that cannot dissolve any more solute at that temperature.'), kt('Supersaturated solution', 'An unstable solution that holds more solute than it normally could at that temperature.')],
      V.sattest,
      [2],
    ),
    sec(
      '3. Effect of temperature on solubility; solubility curves',
      `A **solubility curve** plots solubility (g per 100 g of water) against temperature.

| Temperature (°C) | Potassium nitrate | Sodium chloride |
|---|---|---|
| 20 | ${at(KNO3, 20)} | ${at(NACL, 20)} |
| 40 | ${at(KNO3, 40)} | ${at(NACL, 40)} |
| 60 | ${at(KNO3, 60)} | ${at(NACL, 60)} |
| 80 | ${at(KNO3, 80)} | ${at(NACL, 80)} |

- **Potassium nitrate:** solubility **rises steeply** with temperature.
- **Sodium chloride:** solubility changes **very little** (curve almost flat).
- **Calcium sulphate:** only **slightly soluble**; its solubility is very small and decreases a little at higher temperatures.

**Crystallisation on cooling:** a hot saturated solution of potassium nitrate cools, its solubility falls, and the **excess crystallises out**. For example, a saturated solution made with 200 g of water at 80 °C gives ${N2_CRYST} g of crystals when cooled to 20 °C.

**Calculations:** solute in a given water = solubility × water ÷ 100. Crystals formed = solute held when hot − solute held when cold.

**All numbers in this chapter's tables and graphs are rounded, illustrative values in the shape of textbook curves, not laboratory measurements.**`,
      [kt('Solubility curve', 'A graph of solubility against temperature for one substance.'), kt('Crystallisation', 'Formation of crystals from a solution as it cools or as water evaporates.')],
      V.curves,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Defining solubility without **100 g of water** or without a **temperature**.
- Saying a clear liquid is always a solution; a colloid can also look clear, so check the **beam of light**.
- Saying "the solution becomes saturated" in the crystal test without stating the **observation** (crystal dissolves, stays, or crystals appear).
- Forgetting to **scale** the solubility to the actual mass of water.
- Reading the graph at the wrong temperature; draw **dotted guide lines** to both axes.
- Saying all solids dissolve more in hot water; sodium chloride hardly changes and calcium sulphate falls slightly.

**How marks are usually awarded**
- 1 mark: a term, a definition word, or a reading from the graph.
- 2 marks: two differences or two observations, matched point for point.
- 3 marks: a short numerical with working, or a comparison of three curves.
- 10-mark structured question: a situation or graph followed by parts such as a calculation, a reading, an explanation and a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why is water called the universal solvent?', 'It dissolves more substances than any other common liquid.', 'concept', 1),
    fc(2, 'Why can water dissolve ionic compounds?', 'Its molecules are polar and pull the ions apart.', 'concept', 1),
    fc(3, 'Two substances that do not dissolve in water?', 'Cooking oil and wax (sand also).', 'fact', 1),
    fc(4, 'Solute?', 'The substance that dissolves.', 'definition', 1),
    fc(5, 'Solvent?', 'The liquid in which the solute dissolves.', 'definition', 1),
    fc(6, 'Particle size in a solution?', 'Smaller than about 1 nanometre.', 'fact', 1),
    fc(7, 'Particle size in a colloid?', 'About 1 to 1000 nanometres.', 'fact', 1),
    fc(8, 'Particle size in a suspension?', 'Larger than about 1000 nanometres.', 'fact', 1),
    fc(9, 'Which mixture settles on standing?', 'A suspension.', 'fact', 1),
    fc(10, 'Tyndall effect?', 'Scattering of a light beam by colloidal particles so the path is seen.', 'definition', 1),
    fc(11, 'Example of a colloid?', 'Milk (or starch in water).', 'fact', 1),
    fc(12, 'Does a solution pass through filter paper?', 'Yes. A suspension does not.', 'fact', 1),
    fc(13, 'Solubility?', 'Grams of solute that saturate 100 g of water at a given temperature.', 'definition', 2),
    fc(14, 'Unsaturated solution?', 'Can dissolve more solute at that temperature.', 'definition', 2),
    fc(15, 'Saturated solution?', 'Cannot dissolve more solute at that temperature.', 'definition', 2),
    fc(16, 'Supersaturated solution?', 'Holds more solute than a saturated solution; unstable.', 'definition', 2),
    fc(17, 'Crystal test: crystal dissolves means?', 'The solution is unsaturated.', 'fact', 2),
    fc(18, 'Crystal test: crystal unchanged means?', 'The solution is saturated.', 'fact', 2),
    fc(19, 'Crystal test: crystals appear at once means?', 'The solution is supersaturated.', 'fact', 2),
    fc(20, 'How is a saturated solution prepared?', 'Add solute in small portions with stirring until a little stays undissolved.', 'concept', 2),
    fc(21, 'How can a supersaturated solution be made?', 'Cool a hot saturated solution slowly and undisturbed.', 'concept', 2),
    fc(22, 'Unit of solubility?', 'Grams of solute per 100 g of water.', 'fact', 3),
    fc(23, 'Shape of the potassium nitrate curve?', 'Rises steeply with temperature.', 'fact', 3),
    fc(24, 'Shape of the sodium chloride curve?', 'Almost flat.', 'fact', 3),
    fc(25, 'Calcium sulphate solubility?', 'Very small; falls slightly at higher temperatures.', 'fact', 3),
    fc(26, 'Why does potassium nitrate crystallise on cooling?', 'Its solubility falls, so the excess comes out.', 'concept', 3),
    fc(27, 'Solute dissolved in a given mass of water?', 'Solubility × mass of water ÷ 100.', 'formula', 3),
    fc(28, 'Mass of a saturated solution?', 'Mass of water + mass of solute dissolved.', 'formula', 3),
    fc(29, 'Crystals formed on cooling?', 'Held when hot − held when cold.', 'formula', 3),
    fc(30, 'Best way to separate potassium nitrate from sodium chloride in a hot mixture?', 'Cool it: mostly potassium nitrate crystallises.', 'example', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
