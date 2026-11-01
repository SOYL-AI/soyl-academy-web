// ICSE 10 Chemistry ch09 Study of Compounds: Hydrogen Chloride — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Study of Compounds: Hydrogen Chloride — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Laboratory preparation',
      `**Reactants:** sodium chloride (rock salt) and **concentrated sulphuric acid**, heated gently **below 200 °C**.

- **Apparatus:** round-bottomed flask with a thistle funnel and delivery tube; wash bottle of concentrated sulphuric acid; upright gas jar.
- **Drying agent:** concentrated sulphuric acid (absorbs water, does not react). Quicklime and solid caustic soda are **not** used: they are bases and react with the gas.
- **Collection:** **upward displacement of air** (heavier than air); not over water (extremely soluble).
- **Jar full?** A rod dipped in ammonia solution gives dense white fumes; moist blue litmus turns red.
- **Why below 200 °C?** At a higher temperature sodium sulphate forms as a hard crust that sticks to the flask; fuel is wasted and the glass may crack.`,
      [kt('Upward displacement of air', 'Collection of a gas heavier than air in an upright jar: the gas enters at the bottom and pushes the air out at the top.'), kt('Drying agent', 'A substance that absorbs water vapour from a gas without reacting with the gas.')],
      [fm(r`\ce{NaCl + H2SO4 -> NaHSO4 + HCl}`, 'Below 200 °C (used)'), fm(r`\ce{2NaCl + H2SO4 -> Na2SO4 + 2HCl}`, 'Above 200 °C (avoided)')],
      table(['Feature', 'Choice', 'Reason'], [['Drying agent', 'Conc. H₂SO₄', 'Does not react with HCl'], ['Collection', 'Upward displacement of air', 'Heavier than air, very soluble'], ['Temperature', 'Below 200 °C', 'Avoids hard crust of Na₂SO₄']], 'Table of the conditions for preparing hydrogen chloride with reasons'),
      [1],
    ),
    sec(
      '2. Density and solubility; the fountain experiment',
      `- **Density:** vapour density of HCl = 36.5 ÷ 2 = **18.25**, greater than that of air (about 14.4), so it is **heavier than air**. It can be "poured" from one jar into another.
- **Solubility:** extremely soluble in water; fumes in moist air.
- **Fountain experiment:** a dry flask of dry HCl, inverted, with a jet tube dipping into water containing blue litmus. A little water dissolves much gas, the pressure inside falls and atmospheric pressure drives water up as a **fountain**, which turns **red**. Shows **high solubility** and **acidic nature**.`,
      [kt('Vapour density', 'Half the relative molecular mass of a gas; compares the mass of a volume of the gas with the same volume of hydrogen.'), kt('Fountain experiment', 'An experiment in which a very soluble gas dissolves in a little water, lowering the pressure so that water is forced into the flask as a fountain.')],
      [],
      table(['Observation', 'Shows'], [['Water rises as a fountain', 'Gas is extremely soluble'], ['Blue litmus turns red', 'Solution is acidic'], ['Gas poured into a lower jar', 'Gas is heavier than air']], 'Table of observations and what each shows about hydrogen chloride'),
      [2],
    ),
    sec(
      '3. Hydrochloric acid and back suction',
      `Hydrochloric acid is made by dissolving hydrogen chloride in water. A delivery tube dipped straight into water would allow **back suction** (water sucked back into the hot flask). An **inverted funnel** with its rim just dipping in the water is used:

- if water rises into the funnel, the level in the beaker falls below the rim, **air enters** and the water falls back;
- the funnel also gives a **large surface area** for absorbing the gas.`,
      [kt('Back suction', 'Water being drawn back into a hot apparatus when a very soluble gas dissolves rapidly and the pressure falls.')],
      [],
      table(['Arrangement', 'Result'], [['Tube dipped into water', 'Back suction may crack the flask'], ['Inverted funnel, rim just dipping', 'No back suction; large surface for absorption']], 'Table comparing a dipped tube with an inverted funnel for dissolving hydrogen chloride'),
      [3],
    ),
    sec(
      '4. Reactions of hydrochloric acid',
      `- **With ammonia:** dense white fumes of ammonium chloride.
- **Active metals:** chloride + hydrogen (Zn, Mg, Fe → FeCl₂). Copper, silver, gold do not react.
- **Oxides and hydroxides:** salt + water (CuO gives a blue-green solution).
- **Carbonates and hydrogencarbonates:** chloride + water + CO₂ (effervescence; lime water milky).
- **Sulphides:** chloride + H₂S (rotten-egg smell; lead acetate paper black).
- **Sulphites:** chloride + water + SO₂ (choking smell; acidified potassium dichromate orange → green).`,
      [kt('Neutralisation', 'The reaction of an acid with a base to give a salt and water only.')],
      [fm(r`\ce{NH3 + HCl -> NH4Cl}`, 'Dense white fumes'), fm(r`\ce{Zn + 2HCl -> ZnCl2 + H2}`, 'Active metal'), fm(r`\ce{CuO + 2HCl -> CuCl2 + H2O}`, 'Metal oxide'), fm(r`\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}`, 'Carbonate'), fm(r`\ce{FeS + 2HCl -> FeCl2 + H2S}`, 'Sulphide'), fm(r`\ce{Na2SO3 + 2HCl -> 2NaCl + H2O + SO2}`, 'Sulphite')],
      table(['Substance', 'Gas given off', 'Test for the gas'], [['Zinc', 'H₂', 'Burns with a pop'], ['Marble', 'CO₂', 'Lime water milky'], ['Iron(II) sulphide', 'H₂S', 'Lead acetate paper black'], ['Sodium sulphite', 'SO₂', 'Acidified dichromate green']], 'Table of substances, the gas each gives with hydrochloric acid and the test for the gas'),
      [4],
    ),
    sec(
      '5. Aqua regia',
      `**Aqua regia:** 3 volumes of concentrated HCl + 1 volume of concentrated HNO₃. Nitric acid oxidises hydrochloric acid to **nascent chlorine**, which converts **gold** and **platinum** into soluble chlorides. **Use:** dissolving noble metals (e.g. in testing and purifying gold).`,
      [kt('Aqua regia', 'A mixture of three volumes of concentrated hydrochloric acid and one volume of concentrated nitric acid that dissolves gold and platinum.'), kt('Nascent chlorine', 'Freshly formed, very reactive atomic chlorine.')],
      [fm(r`\ce{HNO3 + 3HCl -> NOCl + 2H2O + 2Cl}`, 'Formation of nascent chlorine')],
      table(['Feature', 'Aqua regia'], [['Composition', '3 vol conc. HCl : 1 vol conc. HNO₃'], ['Active agent', 'Nascent chlorine'], ['Dissolves', 'Gold, platinum']], 'Table of the composition, active agent and use of aqua regia'),
      [5],
    ),
    sec(
      '6. Precipitation reactions and tests',
      `- **Silver nitrate:** AgNO₃ + HCl → AgCl + HNO₃; **curdy white** precipitate, insoluble in dilute HNO₃, soluble in excess NH₄OH.
- **Lead nitrate:** Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃; white precipitate, **soluble in hot water**.

**Tests:** HCl gas — moist blue litmus turns red; dense white fumes with a rod dipped in ammonia solution. Hydrochloric acid — curdy white precipitate with silver nitrate solution (insoluble in dilute nitric acid).`,
      [kt('Precipitate', 'An insoluble solid formed when two solutions are mixed.')],
      [fm(r`\ce{AgNO3 + HCl -> AgCl + HNO3}`, 'Curdy white precipitate'), fm(r`\ce{Pb(NO3)2 + 2HCl -> PbCl2 + 2HNO3}`, 'White precipitate, soluble in hot water')],
      table(['Reagent', 'Observation with HCl'], [['Moist blue litmus', 'Turns red'], ['Ammonia rod', 'Dense white fumes'], ['Silver nitrate', 'Curdy white precipitate, insoluble in dil. HNO₃'], ['Lead nitrate', 'White precipitate, dissolves on heating']], 'Table of reagents used to test for hydrogen chloride and hydrochloric acid'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Leaving out "below 200 °C" from the preparation.
- Naming quicklime as the drying agent (it reacts with HCl).
- Saying HCl is collected by downward displacement (that is ammonia).
- Writing FeCl₃ for iron with dilute HCl (it is FeCl₂).
- Reversing the 3 : 1 ratio of aqua regia.

**How marks are usually awarded**
- Equations (1 mark each): correct formulae, balanced, with conditions where asked.
- Observations (1 mark): colour, smell, effervescence or precipitate, stated clearly.
- Fountain experiment: set-up, reason (pressure) and the colour change.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Lab preparation of HCl?', 'NaCl + H₂SO₄ → NaHSO₄ + HCl, below 200 °C.', 'formula', 1),
    fc(2, 'Drying agent for HCl?', 'Concentrated sulphuric acid.', 'fact', 1),
    fc(3, 'Why not quicklime?', 'It is basic and reacts: CaO + 2HCl → CaCl₂ + H₂O.', 'concept', 1),
    fc(4, 'How is HCl collected?', 'Upward displacement of air.', 'fact', 1),
    fc(5, 'Why not over water?', 'HCl is extremely soluble in water.', 'concept', 1),
    fc(6, 'Why keep below 200 °C?', 'Avoids a hard crust of Na₂SO₄, wasted fuel and cracked glass.', 'concept', 1),
    fc(7, 'Test that a jar of HCl is full?', 'Rod dipped in ammonia solution gives dense white fumes.', 'fact', 1),
    fc(8, 'Vapour density of HCl?', '18.25 (36.5 ÷ 2).', 'fact', 2),
    fc(9, 'Is HCl heavier or lighter than air?', 'Heavier.', 'fact', 2),
    fc(10, 'What does the fountain experiment show?', 'High solubility and acidic nature.', 'concept', 2),
    fc(11, 'Colour of the fountain with blue litmus?', 'Red.', 'diagram', 2),
    fc(12, 'Why does the fountain rise?', 'Gas dissolves, pressure falls, air pressure pushes water up.', 'concept', 2),
    fc(13, 'Why does HCl fume in moist air?', 'It dissolves in water vapour to form droplets of hydrochloric acid.', 'concept', 2),
    fc(14, 'What is back suction?', 'Water being sucked back into the hot apparatus.', 'definition', 3),
    fc(15, 'How is back suction prevented?', 'Inverted funnel with its rim just dipping in water.', 'diagram', 3),
    fc(16, 'HCl + NH₃?', 'NH₄Cl: dense white fumes.', 'formula', 4),
    fc(17, 'Zn + dilute HCl?', 'Zn + 2HCl → ZnCl₂ + H₂.', 'formula', 4),
    fc(18, 'Iron + dilute HCl gives…?', 'FeCl₂ + H₂ (iron(II) chloride).', 'fact', 4),
    fc(19, 'Does copper react with dilute HCl?', 'No: copper is below hydrogen.', 'fact', 4),
    fc(20, 'CaCO₃ + HCl?', 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.', 'formula', 4),
    fc(21, 'NaHCO₃ + HCl?', 'NaHCO₃ + HCl → NaCl + H₂O + CO₂.', 'formula', 4),
    fc(22, 'FeS + dilute HCl?', 'FeCl₂ + H₂S (rotten-egg smell).', 'formula', 4),
    fc(23, 'Gas from a sulphite and HCl?', 'SO₂: turns acidified K₂Cr₂O₇ green.', 'fact', 4),
    fc(24, 'CuO + dilute HCl: observation?', 'Black solid dissolves; blue-green solution.', 'example', 4),
    fc(25, 'Aqua regia?', '3 volumes conc. HCl + 1 volume conc. HNO₃.', 'definition', 5),
    fc(26, 'Why does aqua regia dissolve gold?', 'It produces nascent chlorine.', 'concept', 5),
    fc(27, 'HCl + AgNO₃?', 'Curdy white AgCl, insoluble in dilute HNO₃.', 'formula', 5),
    fc(28, 'HCl + Pb(NO₃)₂?', 'White PbCl₂, soluble in hot water.', 'formula', 5),
    fc(29, 'HCl gas and moist blue litmus?', 'Turns red.', 'fact', 5),
    fc(30, 'Exam tip: collection', 'HCl: upward displacement; NH₃: downward displacement.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
