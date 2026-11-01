// ICSE 10 Chemistry ch03 Acids, Bases and Salts — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Acids, Bases and Salts — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Acids, bases and alkalis in terms of ions',
      r`**Acid:** gives **H₃O⁺ as the only positive ion** in water (ionisation of covalent molecules). Monobasic: HCl, HNO₃; dibasic: H₂SO₄ (two steps). Strong acids ionise almost completely; weak acids (CH₃COOH, H₂CO₃) only partly.

**Base:** reacts with an acid to give salt and water only (metal oxides and hydroxides). **Alkali:** a soluble base giving **OH⁻ as the only negative ion** (dissociation of an ionic solid). All alkalis are bases; not all bases are alkalis.`,
      [kt('Acid', 'A compound that gives hydronium ions as the only positive ions in aqueous solution.'), kt('Alkali', 'A base that dissolves in water and gives hydroxide ions as the only negative ions.'), kt('Basicity', 'The number of hydronium ions produced by one molecule of an acid in water.')],
      [fm(r`\ce{H2SO4 + 2H2O -> 2H3O+ + SO4^2-}`, 'Overall ionisation of sulphuric acid'), fm(r`\ce{KOH -> K+ + OH-}`, 'Dissociation of potassium hydroxide')],
      table(['Process', 'Happens to', 'Example'], [['Ionisation', 'Covalent molecules', 'HCl in water'], ['Dissociation', 'Ionic solids', 'NaOH in water']], 'Table contrasting ionisation and dissociation'),
      [1],
    ),
    sec(
      '2. Indicators and pH',
      `| Indicator | Acid | Neutral | Alkali |
|---|---|---|---|
| Litmus | Red | Purple | Blue |
| Methyl orange | Pink | Orange | Yellow |
| Phenolphthalein | Colourless | Colourless | Pink |

**pH scale** 0–14: 7 neutral; below 7 acidic (0–3 strongly, 4–6 weakly); above 7 alkaline (8–10 weakly, 11–14 strongly). **Universal indicator / pH paper** gives a colour for each pH (red → green → violet).`,
      [kt('pH', 'A number from 0 to 14 expressing how acidic or alkaline a solution is; 7 is neutral.'), kt('Universal indicator', 'A mixture of indicators that shows a different colour at each pH value.')],
      [],
      table(['pH', 'Nature'], [['1', 'Strongly acidic'], ['5', 'Weakly acidic'], ['7', 'Neutral'], ['13', 'Strongly alkaline']], 'Table of pH values and the nature of the solution'),
      [2],
    ),
    sec(
      '3. Kinds of salts',
      `A **salt** forms when the hydrogen ion of an acid is replaced, partly or completely, by a metal or ammonium ion.

- **Normal salt:** all replaceable H replaced — Na₂SO₄, NaCl, KNO₃.
- **Acid salt:** part of the replaceable H remains — NaHSO₄, NaHCO₃ (only from acids with more than one replaceable H).
- **Basic salt:** contains hydroxide from the base — Pb(OH)Cl, basic copper carbonate.
- **Complex salt:** contains a complex ion that does not break up in water — K₄Fe(CN)₆, sodium argentocyanide.`,
      [kt('Acid salt', 'A salt formed by partial replacement of the replaceable hydrogen of an acid; it still contains replaceable hydrogen.'), kt('Basic salt', 'A salt formed by partial replacement of the hydroxide of a base by an acid radical.')],
      [fm(r`\ce{NaOH + H2SO4 -> NaHSO4 + H2O}`, 'An acid salt')],
      table(['Salt', 'Kind'], [['KNO₃', 'Normal'], ['NaHCO₃', 'Acid'], ['Pb(OH)Cl', 'Basic'], ['K₄Fe(CN)₆', 'Complex']], 'Table of four salts and their kinds'),
      [3],
    ),
    sec(
      '4. Dilute acids on carbonates, sulphites and sulphides',
      r`| Salt + dilute acid | Gas | Test |
|---|---|---|
| Carbonate / hydrogen carbonate | CO₂ | Lime water milky; no effect on acidified K₂Cr₂O₇ |
| Sulphite / hydrogen sulphite | SO₂ | Acidified K₂Cr₂O₇ orange → green; acidified KMnO₄ pink → colourless |
| Sulphide | H₂S | Rotten-egg smell; lead acetate paper turns silvery black |

$\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$; $\ce{Na2SO3 + 2HCl -> 2NaCl + H2O + SO2}$; $\ce{FeS + H2SO4 -> FeSO4 + H2S}$.`,
      [kt('Effervescence', 'Brisk bubbling caused by a gas being given off from a liquid.')],
      [fm(r`\ce{NaHSO3 + HCl -> NaCl + H2O + SO2}`, 'Hydrogen sulphite with dilute acid')],
      table(['Gas', 'Test'], [['CO₂', 'Lime water milky'], ['SO₂', 'Dichromate green'], ['H₂S', 'Lead acetate black']], 'Table of tests for three gases'),
      [4],
    ),
    sec(
      '5. Preparing salts: direct combination, displacement, precipitation',
      r`Choose the method by **solubility**. Insoluble salts (AgCl, PbCl₂, BaSO₄, PbSO₄, most carbonates) → **precipitation** (double decomposition). Soluble salts → other methods.

- Direct combination: $\ce{2Fe + 3Cl2 -> 2FeCl3}$
- Displacement: $\ce{Zn + H2SO4 -> ZnSO4 + H2}$
- Precipitation: $\ce{Pb(NO3)2 + 2NaCl -> PbCl2 + 2NaNO3}$; $\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$`,
      [kt('Precipitation (double decomposition)', 'Preparation of an insoluble salt by mixing solutions of two soluble salts that exchange ions.')],
      [],
      table(['Salt', 'Soluble?', 'Method'], [['BaSO₄', 'No', 'Precipitation'], ['ZnSO₄', 'Yes', 'Displacement'], ['FeCl₃', 'Yes', 'Direct combination']], 'Table of three salts with solubility and method'),
      [5],
    ),
    sec(
      '6. Preparing salts: insoluble base, titration, carbonates',
      r`- **Excess insoluble base + dilute acid**, filter, crystallise: $\ce{CuO + H2SO4 -> CuSO4 + H2O}$.
- **Titration** (salts of Na, K, NH₄): alkali and salt both soluble, so excess cannot be filtered off; find exact volumes with an indicator, repeat without it: $\ce{KOH + HNO3 -> KNO3 + H2O}$.
- **Acid + carbonate or hydrogen carbonate:** $\ce{ZnCO3 + H2SO4 -> ZnSO4 + H2O + CO2}$; $\ce{NaHCO3 + HCl -> NaCl + H2O + CO2}$.`,
      [kt('Titration', 'Adding one solution to another from a burette until the reaction is exactly complete, judged by an indicator.')],
      [],
      table(['Base or salt used', 'Soluble?', 'Excess removed by'], [['CuO', 'No', 'Filtration'], ['NaOH', 'Yes', 'Cannot — use titration']], 'Table explaining when titration is needed'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Leaving out “only” in the definitions of acid and alkali.
- Phenolphthalein colours reversed; methyl orange called red in alkali.
- Choosing titration for copper sulphate or displacement for lead chloride.
- Forgetting that SO₂ also turns lime water milky.

**How marks are usually awarded**
- Equations (1 mark): correct formulae and balancing; state the gas.
- Methods (2 marks): name the method and justify it by solubility.
- Tests (1 mark): reagent and colour change.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Acid (ionic definition)?', 'Gives H₃O⁺ as the only positive ion in water.', 'definition', 1),
    fc(2, 'Alkali (ionic definition)?', 'Soluble base giving OH⁻ as the only negative ion.', 'definition', 1),
    fc(3, 'Basicity of H₂SO₄?', 'Two (dibasic).', 'fact', 1),
    fc(4, 'Ionisation of HCl?', 'HCl + H₂O → H₃O⁺ + Cl⁻.', 'formula', 1),
    fc(5, 'Is CuO an alkali?', 'No: an insoluble base.', 'concept', 1),
    fc(6, 'Ionisation vs dissociation?', 'Ionisation: molecules form ions; dissociation: existing ions separate.', 'concept', 1),
    fc(7, 'Litmus in alkali?', 'Blue.', 'fact', 2),
    fc(8, 'Methyl orange in acid / alkali?', 'Pink / yellow.', 'fact', 2),
    fc(9, 'Phenolphthalein in alkali?', 'Pink.', 'fact', 2),
    fc(10, 'pH of a neutral solution?', '7.', 'fact', 2),
    fc(11, 'Lower pH means?', 'More strongly acidic (more H₃O⁺).', 'concept', 2),
    fc(12, 'Universal indicator?', 'Mixture of indicators; a colour for each pH.', 'definition', 2),
    fc(13, 'Salt?', 'Formed when the H of an acid is replaced by a metal or NH₄⁺.', 'definition', 3),
    fc(14, 'Acid salt example?', 'NaHSO₄ or NaHCO₃.', 'example', 3),
    fc(15, 'Basic salt example?', 'Pb(OH)Cl.', 'example', 3),
    fc(16, 'Complex salt example?', 'K₄Fe(CN)₆.', 'example', 3),
    fc(17, 'Why can HCl not form an acid salt?', 'It has only one replaceable hydrogen.', 'concept', 3),
    fc(18, 'Carbonate + dilute acid gives?', 'Salt + water + CO₂.', 'fact', 4),
    fc(19, 'Test for SO₂?', 'Acidified K₂Cr₂O₇ turns orange to green.', 'fact', 4),
    fc(20, 'Test for H₂S?', 'Lead acetate paper turns black.', 'fact', 4),
    fc(21, 'Smell of SO₂?', 'Burning sulphur (choking).', 'fact', 4),
    fc(22, 'Gas from FeS + dil. H₂SO₄?', 'Hydrogen sulphide.', 'fact', 4),
    fc(23, 'How are insoluble salts made?', 'Precipitation (double decomposition).', 'fact', 5),
    fc(24, 'Iron(III) chloride is made by?', 'Direct combination: 2Fe + 3Cl₂ → 2FeCl₃.', 'formula', 5),
    fc(25, 'Zinc sulphate is made by?', 'Displacement: Zn + dil. H₂SO₄.', 'fact', 5),
    fc(26, 'Lead chloride is made by?', 'Precipitation: Pb(NO₃)₂ + 2NaCl.', 'formula', 5),
    fc(27, 'Copper sulphate is made by?', 'Excess CuO + dil. H₂SO₄; filter.', 'fact', 6),
    fc(28, 'Why titration for sodium salts?', 'Alkali is soluble; excess cannot be filtered off.', 'concept', 6),
    fc(29, 'NaCl from a hydrogen carbonate?', 'NaHCO₃ + HCl → NaCl + H₂O + CO₂.', 'formula', 6),
    fc(30, 'Exam tip: methods', 'Always justify by solubility.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
