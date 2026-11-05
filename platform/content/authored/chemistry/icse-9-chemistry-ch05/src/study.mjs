// ICSE 9 Chemistry ch05 notes and flashcards.
import { T, unit, PROV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import * as K from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Water of crystallisation; hydrated and anhydrous substances',
      `**Water of crystallisation** is the fixed number of water molecules that combine chemically with one formula unit of a salt when it crystallises from solution. Such a salt is **hydrated**; a salt without it is **anhydrous**.

| Hydrated salt | Formula | Colour of crystals | Colour of anhydrous form |
|---|---|---|---|
| Copper sulphate pentahydrate (blue vitriol) | CuSO₄·5H₂O | Blue | White |
| Ferrous sulphate heptahydrate (green vitriol) | FeSO₄·7H₂O | Pale green | Whitish |
| Sodium carbonate decahydrate (washing soda) | Na₂CO₃·10H₂O | Colourless | White |
| Sodium sulphate decahydrate (Glauber's salt) | Na₂SO₄·10H₂O | Colourless | White |

**Anhydrous salts** (no water of crystallisation): sodium nitrate NaNO₃, potassium chloride KCl, lead chloride PbCl₂, potassium sulphate K₂SO₄.

**Heating a hydrate** (dry hard glass test tube, mouth slightly downwards): the crystals crumble to a powder, coloured hydrates lose their colour and drops of water collect on the cooler part of the tube.

**A test for water:** white anhydrous copper sulphate turns blue on adding water (heat is given out); heating the blue crystals turns them white again.

**Percentage of water of crystallisation** = (mass of water in one formula unit ÷ relative molecular mass of the hydrate) × 100. With H = ${K.A.H}, O = ${K.A.O}, Na = ${K.A.Na}, S = ${K.A.S}, Fe = ${K.A.Fe}, Cu = ${K.A.Cu}, C = ${K.A.C}:

| Hydrate | Mass of hydrate | Mass of water | Per cent water |
|---|---|---|---|
| CuSO₄·5H₂O | ${K.CUSO4_5} | ${K.W_CU} | ${K.P_CU} |
| FeSO₄·7H₂O | ${K.FESO4_7} | ${K.W_FE} | ${K.P_FE} |
| Na₂SO₄·10H₂O | ${K.NA2SO4_10} | ${K.W_NA2SO4} | ${K.P_NA2SO4} |
| Na₂CO₃·10H₂O | ${K.NA2CO3_10} | ${K.W_NA2CO3} | ${K.P_NA2CO3} |

Ferrous sulphate crystals are described as pale green and the residue as whitish; books vary slightly.`,
      [kt('Water of crystallisation', 'The fixed number of water molecules combined with one formula unit of a salt in its crystals.'), kt('Hydrated salt', 'A salt whose crystals contain water of crystallisation.'), kt('Anhydrous', 'Without water of crystallisation.')],
      [fm(r`\ce{CuSO4.5H2O ->[\Delta] CuSO4 + 5H2O}`, 'Heating copper sulphate crystals'), fm(r`\ce{FeSO4.7H2O ->[\Delta] FeSO4 + 7H2O}`, 'Heating ferrous sulphate crystals'), fm(r`\ce{Na2CO3.10H2O ->[\Delta] Na2CO3 + 10H2O}`, 'Heating washing soda crystals')],
      V.heat,
      [1],
    ),
    sec(
      '2. Efflorescence, deliquescence and hygroscopy',
      `| Term | What happens | Examples |
|---|---|---|
| **Efflorescence** | A hydrate loses its water of crystallisation (wholly or partly) to dry air at ordinary temperature and crumbles to powder | Washing soda, Glauber's salt |
| **Deliquescence** | A solid takes moisture from the air and dissolves in it to form a solution | Ferric chloride, sodium hydroxide, anhydrous calcium chloride |
| **Hygroscopy** | A substance absorbs moisture from the air, usually without dissolving | Quicklime, concentrated sulphuric acid |

- Efflorescence **loses** water; deliquescence and hygroscopy **gain** it. Washing soda changes to the monohydrate, ${'Na₂CO₃·H₂O'}, when it effloresces.
- A **deliquescent** substance is also hygroscopic; a hygroscopic substance need not be deliquescent. Books group some substances (for example anhydrous calcium chloride) differently; the examples above are the usual ICSE ones.
- Efflorescent crystals **lose mass**; deliquescent and hygroscopic substances **gain mass**.
- **Example:** ${K.EF_MASS} g of washing soda crystals that fully change to the monohydrate leave ${K.EF_LEFT} g of powder (${K.EF_LOST} g of water lost).`,
      [kt('Efflorescence', 'Loss of water of crystallisation by a hydrate on exposure to dry air.'), kt('Deliquescence', 'Absorption of moisture from air by a solid so that it dissolves to form a solution.'), kt('Hygroscopic substance', 'A substance that absorbs moisture from the air.')],
      [fm(r`\ce{Na2CO3.10H2O -> Na2CO3.H2O + 9H2O}`, 'Efflorescence of washing soda'), fm(r`\ce{CaO + H2O -> Ca(OH)2}`, 'Quicklime taking in water')],
      V.air,
      [2],
    ),
    sec(
      '3. Drying agents and dehydrating agents',
      `| | Drying agent | Dehydrating agent |
|---|---|---|
| Removes | Moisture mixed with a gas or liquid | Water that is chemically combined, or the elements hydrogen and oxygen in the ratio 2 : 1 |
| Substance dried | Not changed | A new substance is formed |
| Examples | Quicklime (CaO), concentrated sulphuric acid | Concentrated sulphuric acid |

**Drying gases:** a drying agent must **not react** with the gas.
- Concentrated sulphuric acid (in a wash bottle) dries hydrogen, chlorine and hydrogen chloride, but **not ammonia**, which reacts with it: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄.
- **Quicklime** (lumps in a drying tower) dries **ammonia**.

**Dehydrating action of concentrated sulphuric acid:** blue crystals of copper sulphate turn **white** (the combined water is removed); sugar is **charred to black carbon**: C₁₂H₂₂O₁₁ → 12C + 11H₂O (hydrogen and oxygen leave in the ratio of water). Quicklime is a **drying agent**, not a dehydrating agent.`,
      [kt('Drying agent', 'A substance that removes moisture from a gas or liquid without reacting with it.'), kt('Dehydrating agent', 'A substance that removes water, or the elements of water, that is chemically combined in a compound.')],
      [fm(r`\ce{2NH3 + H2SO4 -> (NH4)2SO4}`, 'Ammonia reacts with sulphuric acid'), fm(r`\ce{C12H22O11 ->[\text{conc. H2SO4}] 12C + 11H2O}`, 'Dehydration of sugar')],
      V.drygas,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing a hydrate formula without the **dot** and the **number**, or leaving the water out of the equation.
- Forgetting the **colour change** and the **drops of water** when a hydrate is heated.
- Mixing up efflorescence (a **loss** of water) with deliquescence (a **gain** that ends in a solution).
- Drying ammonia with concentrated sulphuric acid: it **reacts** with the gas.
- Calling quicklime a dehydrating agent; it is a **drying agent**.
- In a percentage calculation, forgetting to include all the water molecules in the mass of the hydrate.

**How marks are usually awarded**
- 1 mark: a formula, a colour change, an observation or a term.
- 2 marks: a balanced equation or two differences, matched point for point.
- 3 marks: a short calculation with working, or a drying agent chosen with a reason.
- 10-mark structured question: a situation or diagram followed by parts such as equations, observations, a calculation and a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Water of crystallisation?', 'The fixed number of water molecules combined with a salt in its crystals.', 'definition', 1),
    fc(2, 'Hydrated salt?', 'A salt whose crystals contain water of crystallisation.', 'definition', 1),
    fc(3, 'Anhydrous?', 'Without water of crystallisation.', 'definition', 1),
    fc(4, 'Formula of blue vitriol?', 'CuSO₄·5H₂O', 'formula', 1),
    fc(5, 'Formula of green vitriol?', 'FeSO₄·7H₂O', 'formula', 1),
    fc(6, 'Formula of washing soda?', 'Na₂CO₃·10H₂O', 'formula', 1),
    fc(7, 'Formula of Glauber\'s salt?', 'Na₂SO₄·10H₂O', 'formula', 1),
    fc(8, 'Four anhydrous salts?', 'NaNO₃, KCl, PbCl₂, K₂SO₄.', 'fact', 1),
    fc(9, 'Colour of CuSO₄·5H₂O and of anhydrous CuSO₄?', 'Blue; white.', 'fact', 1),
    fc(10, 'Colour of FeSO₄·7H₂O?', 'Pale green.', 'fact', 1),
    fc(11, 'What is seen on heating a hydrate in a test tube?', 'Crystals crumble to powder; drops of water form on the cooler part.', 'fact', 1),
    fc(12, 'Why is the test tube mouth tilted slightly downwards?', 'So that water formed does not run back onto the hot glass.', 'concept', 1),
    fc(13, 'Test for water using copper sulphate?', 'White anhydrous copper sulphate turns blue.', 'fact', 1),
    fc(14, 'Percentage of water in a hydrate?', 'Mass of water ÷ relative molecular mass of hydrate × 100.', 'formula', 1),
    fc(15, 'Percentage of water in FeSO₄·7H₂O?', `${K.P_FE} per cent.`, 'fact', 1),
    fc(16, 'Efflorescence?', 'A hydrate loses water of crystallisation to dry air and crumbles to powder.', 'definition', 2),
    fc(17, 'Example of an efflorescent substance?', 'Washing soda (or Glauber\'s salt).', 'example', 2),
    fc(18, 'Deliquescence?', 'A solid takes moisture from the air and dissolves in it.', 'definition', 2),
    fc(19, 'Example of a deliquescent substance?', 'Ferric chloride (also sodium hydroxide).', 'example', 2),
    fc(20, 'Hygroscopic substance?', 'One that absorbs moisture from the air, usually without dissolving.', 'definition', 2),
    fc(21, 'Examples of hygroscopic substances?', 'Quicklime and concentrated sulphuric acid.', 'example', 2),
    fc(22, 'Which of the three loses water?', 'Efflorescence.', 'fact', 2),
    fc(23, 'Equation for efflorescence of washing soda?', 'Na₂CO₃·10H₂O → Na₂CO₃·H₂O + 9H₂O', 'formula', 2),
    fc(24, 'Drying agent?', 'Removes moisture without reacting with the substance dried.', 'definition', 3),
    fc(25, 'Dehydrating agent?', 'Removes combined water, or hydrogen and oxygen in the ratio 2 to 1.', 'definition', 3),
    fc(26, 'Drying agent for ammonia?', 'Quicklime.', 'fact', 3),
    fc(27, 'Why not concentrated sulphuric acid for ammonia?', 'It reacts with ammonia to form ammonium sulphate.', 'concept', 3),
    fc(28, 'Dehydrating action on blue vitriol?', 'Blue crystals turn white.', 'fact', 3),
    fc(29, 'Dehydrating action on sugar?', 'Sugar is charred to black carbon.', 'fact', 3),
    fc(30, 'Is quicklime a dehydrating agent?', 'No, it is a drying agent.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
