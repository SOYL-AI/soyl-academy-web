// ICSE 10 Chemistry ch11 Study of Compounds: Nitric Acid — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Study of Compounds: Nitric Acid — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Laboratory preparation',
      `**Reactants:** potassium nitrate (or sodium nitrate) and **concentrated sulphuric acid**, heated gently.

- **Principle:** the less volatile (higher-boiling) sulphuric acid displaces the more volatile nitric acid from its salt.
- **Apparatus:** a **glass retort** with a **glass stopper**; the neck leads into a **receiver cooled by water**. The apparatus is **all glass** because nitric acid vapour **attacks cork and rubber**.
- **Temperature:** kept **below 200 °C**.`,
      [kt('All-glass apparatus', 'Apparatus with no cork or rubber parts, used because hot nitric acid vapour attacks cork and rubber.'), kt('Volatile acid', 'An acid with a low boiling point that easily forms vapour, such as nitric acid.')],
      [fm(r`\ce{KNO3 + H2SO4 -> KHSO4 + HNO3}`, 'Below 200 °C'), fm(r`\ce{NaNO3 + H2SO4 -> NaHSO4 + HNO3}`, 'With sodium nitrate')],
      table(['Part', 'Purpose'], [['Glass retort and stopper', 'Holds the mixture; resists the acid vapour'], ['Receiver in cold water', 'Condenses the nitric acid vapour'], ['Gentle heating', 'Keeps the temperature below 200 °C']], 'Table of the parts of the apparatus for preparing nitric acid and their purposes'),
      [1],
    ),
    sec(
      '2. Precautions, colour and physical properties',
      `**Why below 200 °C?** At higher temperature KNO₃ + KHSO₄ → K₂SO₄ + HNO₃ would occur, but the strong heat needed would **decompose nitric acid**, may **crack the glass**, leaves a **hard crust** of K₂SO₄ and **wastes fuel**.

**Yellow colour:** heat or light decomposes some acid; the **NO₂** formed dissolves in it. Remove it by **bubbling dry air or CO₂ through the warm acid**, or by **adding water**. Store the acid in **brown bottles**.

**Physical properties:** colourless fuming liquid (pure), choking smell, heavier than water, miscible with water in all proportions, corrosive (yellow stains on skin).`,
      [kt('Decomposition of nitric acid', 'The breakdown of nitric acid by heat or light into nitrogen dioxide, water and oxygen.')],
      [fm(r`\ce{4HNO3 -> 4NO2 + 2H2O + O2}`, 'Heat or sunlight'), fm(r`\ce{KNO3 + KHSO4 -> K2SO4 + HNO3}`, 'Only at high temperature: avoided')],
      table(['Observation', 'Reason'], [['Laboratory acid is yellow', 'Dissolved NO₂ from decomposition'], ['Stored in brown bottles', 'Light decomposes the acid'], ['Yellow stain on skin', 'The acid attacks proteins in the skin']], 'Table of three observations about nitric acid and their reasons'),
      [1],
    ),
    sec(
      '3. Ostwald’s process (equations and conditions)',
      `**Step 1 (catalytic oxidation of ammonia):** dry ammonia and air, about **1 : 10** by volume, over **platinum gauze** at about **800 °C**. Exothermic, so the catalyst stays red-hot.

**Step 2:** nitric oxide combines with more oxygen on cooling.

**Step 3:** nitrogen dioxide is absorbed in **water** in the presence of **excess air (oxygen)**.

Overall, one NH₃ gives one HNO₃ (the nitrogen atom is carried through).`,
      [kt('Ostwald’s process', 'The industrial manufacture of nitric acid by the catalytic oxidation of ammonia over platinum.'), kt('Catalytic oxidation', 'Oxidation that takes place only in the presence of a catalyst, here platinum.')],
      [fm(r`\ce{4NH3 + 5O2 -> 4NO + 6H2O}`, 'Platinum gauze, about 800 °C'), fm(r`\ce{2NO + O2 -> 2NO2}`, 'On cooling'), fm(r`\ce{4NO2 + 2H2O + O2 -> 4HNO3}`, 'Absorption in water with air')],
      table(['Step', 'Change', 'Condition'], [['1', 'NH₃ → NO', 'Pt gauze, about 800 °C, NH₃ : air = 1 : 10'], ['2', 'NO → NO₂', 'Cooling, more oxygen'], ['3', 'NO₂ → HNO₃', 'Water and excess air']], 'Table of the three steps of Ostwald’s process with conditions'),
      [2],
    ),
    sec(
      '4. Oxidising agent: copper',
      `Nitric acid gives **oxygen** on decomposition (conc.: 2HNO₃ → H₂O + 2NO₂ + [O]; dil.: 2HNO₃ → H₂O + 2NO + 3[O]), so it **oxidises** copper, which ordinary dilute acids cannot attack.

- **Concentrated:** reddish-brown **NO₂**; solution green, blue on dilution.
- **Dilute (about 1 : 1):** colourless **NO**, which turns reddish brown at the mouth of the tube (2NO + O₂ → 2NO₂); blue solution.`,
      [kt('Oxidising agent', 'A substance that gives oxygen to (or removes electrons from) another substance.'), kt('Nitric oxide', 'NO, a colourless gas that turns reddish brown in air as it forms nitrogen dioxide.')],
      [fm(r`\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2H2O + 2NO2}`, 'Concentrated acid'), fm(r`\ce{3Cu + 8HNO3 -> 3Cu(NO3)2 + 4H2O + 2NO}`, 'Dilute acid'), fm(r`\ce{2NO + O2 -> 2NO2}`, 'Brown fumes at the mouth of the tube')],
      table(['Acid', 'Gas', 'Mole ratio Cu : gas'], [['Concentrated', 'NO₂ (reddish brown)', '1 : 2'], ['Dilute', 'NO (colourless)', '3 : 2']], 'Table of the gases formed when copper reacts with concentrated and dilute nitric acid'),
      [3],
    ),
    sec(
      '5. Oxidising agent: carbon and sulphur',
      `**Hot concentrated** nitric acid oxidises non-metals and gives **reddish-brown NO₂**:

- **Carbon** → carbon dioxide.
- **Sulphur** → sulphuric acid.`,
      [kt('Oxidation of a non-metal', 'Conversion of a non-metal into its oxide or oxyacid, here by hot concentrated nitric acid.')],
      [fm(r`\ce{C + 4HNO3 -> CO2 + 2H2O + 4NO2}`, 'Carbon'), fm(r`\ce{S + 6HNO3 -> H2SO4 + 2H2O + 6NO2}`, 'Sulphur')],
      table(['Non-metal', 'Product', 'Molecules of HNO₃ per atom'], [['Carbon', 'CO₂', '4'], ['Sulphur', 'H₂SO₄', '6']], 'Table of the products when carbon and sulphur are oxidised by concentrated nitric acid'),
      [3],
    ),
    sec(
      '6. Acidic properties',
      `Nitric acid is a **strong, monobasic** acid: it turns blue litmus red and forms **nitrates**.

- **Metals:** hydrogen is given only by **very dilute (about 1%)** acid with **magnesium** or **manganese**; with other metals the acid oxidises the hydrogen to water.
- **Basic oxides and hydroxides:** nitrate + water.
- **Carbonates and hydrogen carbonates:** nitrate + water + CO₂.
- **Sulphites and hydrogen sulphites:** nitrate + water + SO₂.`,
      [kt('Monobasic acid', 'An acid with one replaceable hydrogen atom per molecule, such as nitric acid.')],
      [fm(r`\ce{Mg + 2HNO3 -> Mg(NO3)2 + H2}`, 'Very dilute acid'), fm(r`\ce{Mn + 2HNO3 -> Mn(NO3)2 + H2}`, 'Very dilute acid'), fm(r`\ce{CuO + 2HNO3 -> Cu(NO3)2 + H2O}`, 'Basic oxide'), fm(r`\ce{CaCO3 + 2HNO3 -> Ca(NO3)2 + H2O + CO2}`, 'Carbonate'), fm(r`\ce{NaHCO3 + HNO3 -> NaNO3 + H2O + CO2}`, 'Hydrogen carbonate'), fm(r`\ce{Na2SO3 + 2HNO3 -> 2NaNO3 + H2O + SO2}`, 'Sulphite')],
      table(['Reactant', 'Products'], [['Mg (very dilute acid)', 'Mg(NO₃)₂ + H₂'], ['NaOH', 'NaNO₃ + H₂O'], ['K₂CO₃', '2KNO₃ + H₂O + CO₂'], ['NaHSO₃', 'NaNO₃ + H₂O + SO₂']], 'Table of four reactions showing the acidic properties of nitric acid'),
      [4],
    ),
    sec(
      '7. Tests for nitric acid',
      `- **Copper turnings, warmed:** reddish-brown fumes of NO₂ and a blue-green solution.
- **Brown ring test:** add **freshly prepared** iron(II) sulphate solution, then pour **conc. H₂SO₄** slowly down the side of the tube. A **brown ring** (of nitroso iron(II) sulphate, FeSO₄·NO) forms at the junction of the layers.`,
      [kt('Brown ring test', 'A test for nitric acid or a nitrate: a brown ring forms at the junction when concentrated sulphuric acid is layered under a mixture of the test solution and fresh iron(II) sulphate solution.')],
      [fm(r`\ce{6FeSO4 + 3H2SO4 + 2HNO3 -> 3Fe2(SO4)3 + 4H2O + 2NO}`, 'Nitric oxide formed in the brown ring test')],
      table(['Test', 'Observation'], [['Warm with copper turnings', 'Reddish-brown fumes, blue-green solution'], ['Brown ring test', 'Brown ring at the junction of the layers']], 'Table of two tests for nitric acid and their observations'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing K₂SO₄ instead of KHSO₄ for the laboratory preparation.
- Using iron as the catalyst in Ostwald’s process (it is platinum).
- Saying dilute nitric acid gives NO₂ with copper (it gives NO).
- Writing hydrogen as a product of copper and nitric acid.

**How marks are usually awarded**
- Equations (1 mark each): correct products and balancing, with “conc.” or “dil.” stated.
- Conditions (1 mark): catalyst and temperature together.
- Reasons (1 mark each): all-glass apparatus, below 200 °C, yellow colour.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Reactants for nitric acid in the laboratory?', 'Potassium (or sodium) nitrate and concentrated sulphuric acid.', 'fact', 1),
    fc(2, 'Equation for the laboratory preparation?', 'KNO₃ + H₂SO₄ → KHSO₄ + HNO₃ (below 200 °C).', 'formula', 1),
    fc(3, 'Why an all-glass apparatus?', 'Nitric acid vapour attacks cork and rubber.', 'concept', 1),
    fc(4, 'Why is the receiver cooled?', 'To condense the nitric acid vapour.', 'concept', 1),
    fc(5, 'Why heat below 200 °C?', 'Avoids decomposing the acid, cracking the glass, a hard K₂SO₄ crust and wasted fuel.', 'concept', 1),
    fc(6, 'Why does sulphuric acid drive out nitric acid?', 'It is less volatile (higher boiling).', 'concept', 1),
    fc(7, 'Why is concentrated nitric acid often yellow?', 'Dissolved NO₂ from its decomposition.', 'concept', 1),
    fc(8, 'Decomposition of nitric acid?', '4HNO₃ → 4NO₂ + 2H₂O + O₂.', 'formula', 1),
    fc(9, 'How is the yellow colour removed?', 'Bubble dry air or CO₂ through the warm acid, or add water.', 'fact', 1),
    fc(10, 'Catalyst in Ostwald’s process?', 'Platinum gauze, about 800 °C.', 'fact', 2),
    fc(11, 'Ostwald step 1?', '4NH₃ + 5O₂ → 4NO + 6H₂O.', 'formula', 2),
    fc(12, 'Ostwald step 3?', '4NO₂ + 2H₂O + O₂ → 4HNO₃.', 'formula', 2),
    fc(13, 'Ratio of ammonia to air in Ostwald’s process?', 'About 1 : 10 by volume.', 'fact', 2),
    fc(14, 'Why does the platinum stay red-hot?', 'The oxidation of ammonia is exothermic.', 'concept', 2),
    fc(15, 'Cu + conc. HNO₃?', 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂.', 'formula', 3),
    fc(16, 'Cu + dil. HNO₃?', '3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO.', 'formula', 3),
    fc(17, 'Colour of NO and of NO₂?', 'NO colourless; NO₂ reddish brown.', 'fact', 3),
    fc(18, 'Why does NO look brown at the mouth of the tube?', 'It reacts with air: 2NO + O₂ → 2NO₂.', 'concept', 3),
    fc(19, 'C + conc. HNO₃?', 'C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂.', 'formula', 3),
    fc(20, 'S + conc. HNO₃?', 'S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂.', 'formula', 3),
    fc(21, 'Why is nitric acid an oxidising agent?', 'It decomposes to give oxygen.', 'concept', 3),
    fc(22, 'Which metals give H₂ with nitric acid?', 'Mg and Mn, with very dilute (about 1%) acid only.', 'fact', 4),
    fc(23, 'Why don’t most metals give H₂ with HNO₃?', 'The acid oxidises the hydrogen to water.', 'concept', 4),
    fc(24, 'Basicity of nitric acid?', 'Monobasic: forms only normal salts (nitrates).', 'fact', 4),
    fc(25, 'CaCO₃ + dil. HNO₃?', 'CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂.', 'formula', 4),
    fc(26, 'Na₂SO₃ + dil. HNO₃?', 'Na₂SO₃ + 2HNO₃ → 2NaNO₃ + H₂O + SO₂.', 'formula', 4),
    fc(27, 'Brown ring test: reagents?', 'Freshly made FeSO₄ solution, then conc. H₂SO₄ down the side.', 'fact', 5),
    fc(28, 'Where does the brown ring form?', 'At the junction of the two layers.', 'diagram', 5),
    fc(29, 'Copper-turnings test for nitric acid?', 'Warm: reddish-brown fumes and a blue-green solution.', 'fact', 5),
    fc(30, 'Exam tip: copper equations', 'Always state conc. or dil.; the gas differs (NO₂ or NO).', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
