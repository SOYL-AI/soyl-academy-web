// ICSE 10 Chemistry ch14 Hydrocarbons: Alkanes, Alkenes and Alkynes — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fx = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Hydrocarbons: Alkanes, Alkenes and Alkynes — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Alkanes; methane as a greenhouse gas',
      `**Alkanes** are saturated hydrocarbons (only C–C single bonds), general formula **CₙH₂ₙ₊₂**: methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀. They are fairly unreactive; their main reactions are **combustion** and **substitution**.

**Methane as a greenhouse gas.** Sources: flooded paddy fields, cattle, landfills and sewage, coal mines, leaks of natural gas. Methane absorbs the infrared radiation given off by the Earth and so traps heat; molecule for molecule it traps far more heat than carbon dioxide (roughly 25–30 times over a century). Rising methane levels add to **global warming**.`,
      [kt('Alkane', 'A saturated hydrocarbon with only single bonds between carbon atoms, general formula CₙH₂ₙ₊₂.'), kt('Greenhouse gas', 'A gas, such as carbon dioxide or methane, that absorbs heat radiated by the Earth and keeps the atmosphere warm.')],
      [],
      table(['Source', 'How methane forms'], [['Paddy fields', 'Decay of plant matter without air'], ['Cattle', 'Digestion of grass'], ['Landfills', 'Rotting of waste without air']], 'Table of three sources of methane and how it forms in each'),
      [1],
    ),
    sec(
      '2. Preparation of methane and ethane',
      `**Decarboxylation:** the sodium salt of a carboxylic acid heated with **soda lime** (NaOH + CaO) gives an alkane with **one carbon fewer** and sodium carbonate. CaO keeps the NaOH dry and protects the glass.

**Reduction of alkyl halides** by **nascent hydrogen** [H] from a zinc–copper couple and ethanol: the halogen atom is replaced by hydrogen.

**Laboratory method for methane:** heat a dry 1 : 3 mixture of sodium ethanoate and soda lime in a hard glass test tube (mouth slightly lower than the base); collect methane over water, as it is nearly insoluble in water.`,
      [kt('Decarboxylation', 'Removal of carbon dioxide (as sodium carbonate) from the sodium salt of a carboxylic acid by heating with soda lime.'), kt('Soda lime', 'A mixture of sodium hydroxide and calcium oxide.'), kt('Nascent hydrogen', 'Freshly produced, very reactive hydrogen, written [H].')],
      [
        fx(r`\ce{CH3COONa + NaOH ->[CaO][heat] CH4 + Na2CO3}`, 'Methane from sodium ethanoate'),
        fx(r`\ce{C2H5COONa + NaOH ->[CaO][heat] C2H6 + Na2CO3}`, 'Ethane from sodium propanoate'),
        fx(r`\ce{CH3I + 2[H] ->[Zn/Cu][ethanol] CH4 + HI}`, 'Methane from iodomethane'),
        fx(r`\ce{C2H5Br + 2[H] ->[Zn/Cu][ethanol] C2H6 + HBr}`, 'Ethane from bromoethane'),
      ],
      table(['Starting compound', 'Reagent', 'Alkane'], [['Sodium ethanoate', 'Soda lime, heat', 'Methane'], ['Sodium propanoate', 'Soda lime, heat', 'Ethane'], ['Iodomethane', 'Zn–Cu couple + ethanol', 'Methane'], ['Bromoethane', 'Zn–Cu couple + ethanol', 'Ethane']], 'Table of four methods of preparing methane and ethane'),
      [1],
    ),
    sec(
      '3. Combustion and substitution of methane and ethane',
      `**Complete combustion** (excess air): blue, non-sooty flame; CO₂ and H₂O; much heat (fuels).
**Incomplete combustion** (limited air): poisonous **carbon monoxide** and soot.

**Substitution with chlorine** (diffused sunlight): H atoms replaced by Cl one at a time, HCl given off at each step: CH₃Cl (chloromethane) → CH₂Cl₂ (dichloromethane) → CHCl₃ (trichloromethane, chloroform) → CCl₄ (tetrachloromethane, carbon tetrachloride). Dark: no reaction. Direct sunlight: explosive (CH₄ + 2Cl₂ → C + 4HCl). Ethane: C₂H₆ + Cl₂ → C₂H₅Cl + HCl, and so on up to C₂Cl₆.`,
      [kt('Substitution reaction', 'A reaction in which an atom or group in a molecule is replaced by another atom or group, as when Cl replaces H in methane.'), kt('Incomplete combustion', 'Burning in a limited supply of air, giving carbon monoxide and/or carbon instead of carbon dioxide.')],
      [
        fx(r`\ce{CH4 + 2O2 -> CO2 + 2H2O}`, 'Complete combustion of methane'),
        fx(r`\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}`, 'Complete combustion of ethane'),
        fx(r`\ce{2CH4 + 3O2 -> 2CO + 4H2O}`, 'Incomplete combustion of methane'),
        fx(r`\ce{CH4 + Cl2 ->[{diffused sunlight}] CH3Cl + HCl}`, 'First substitution step'),
      ],
      table(['Product', 'Formula', 'Other name'], [['Chloromethane', 'CH₃Cl', 'Methyl chloride'], ['Dichloromethane', 'CH₂Cl₂', 'Methylene chloride'], ['Trichloromethane', 'CHCl₃', 'Chloroform'], ['Tetrachloromethane', 'CCl₄', 'Carbon tetrachloride']], 'Table of the four substitution products of methane with chlorine'),
      [2],
    ),
    sec(
      '4. Preparation of ethene and ethyne',
      `**Ethene (C₂H₄):**
- **Dehydrohalogenation:** bromoethane boiled with **alcoholic** KOH (aqueous KOH gives ethanol instead).
- **Dehydration:** ethanol heated with **excess conc. H₂SO₄** at about **170 °C**; the gas is washed in NaOH solution (removes SO₂ and CO₂) and collected over water.

**Ethyne (C₂H₂):**
- **Calcium carbide + water** (water added drop by drop; collected over water). Impure ethyne smells of garlic because of impurities such as phosphine; pure ethyne is almost odourless.
- **1,2-dibromoethane** boiled with **alcoholic** KOH: two HBr removed.`,
      [kt('Dehydrohalogenation', 'Removal of a hydrogen halide (such as HBr) from neighbouring carbon atoms of a compound, forming a multiple bond.'), kt('Dehydration', 'Removal of a molecule of water from a compound, as when ethanol forms ethene.')],
      [
        fx(r`\ce{C2H5Br + KOH ->[{alcohol, heat}] C2H4 + KBr + H2O}`, 'Ethene from bromoethane'),
        fx(r`\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}`, 'Ethene from ethanol'),
        fx(r`\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}`, 'Ethyne from calcium carbide'),
        fx(r`\ce{C2H4Br2 + 2KOH ->[{alcohol, heat}] C2H2 + 2KBr + 2H2O}`, 'Ethyne from 1,2-dibromoethane'),
      ],
      table(['Product', 'From', 'Reagent and condition'], [['Ethene', 'Bromoethane', 'Alcoholic KOH, boil'], ['Ethene', 'Ethanol', 'Conc. H₂SO₄, about 170 °C'], ['Ethyne', 'Calcium carbide', 'Water, drop by drop'], ['Ethyne', '1,2-dibromoethane', 'Alcoholic KOH, boil']], 'Table of the four preparations of ethene and ethyne'),
      [3, 4],
    ),
    sec(
      '5. Addition reactions and the test for unsaturation',
      `Unsaturated hydrocarbons undergo **addition**: atoms add across the C=C or C≡C, which becomes a single bond. Ethene adds **one** molecule; ethyne adds **two**.

- **Hydrogen** (nickel, about 300 °C): ethene → ethane; ethyne → ethene → ethane.
- **Halogens** (room temperature, no light needed): ethene + Cl₂ → 1,2-dichloroethane; + Br₂ → 1,2-dibromoethane; + I₂ → 1,2-diiodoethane. Ethyne + 2Br₂ → 1,1,2,2-tetrabromoethane; + 2Cl₂ → 1,1,2,2-tetrachloroethane.

**Test for unsaturation:** orange-brown bromine water (or bromine in CCl₄) is **decolourised** by ethene and ethyne but **not** by ethane or methane.`,
      [kt('Addition reaction', 'A reaction in which atoms add across a double or triple bond, so that one product forms and the multiple bond becomes a single bond.'), kt('Hydrogenation', 'Addition of hydrogen to an unsaturated compound, using a catalyst such as nickel.')],
      [
        fx(r`\ce{C2H4 + H2 ->[{Ni, about 300 °C}] C2H6}`, 'Hydrogenation of ethene'),
        fx(r`\ce{C2H4 + Br2 -> C2H4Br2}`, 'Ethene and bromine: 1,2-dibromoethane'),
        fx(r`\ce{C2H2 + 2Br2 -> C2H2Br4}`, 'Ethyne and excess bromine: 1,1,2,2-tetrabromoethane'),
      ],
      table(['Gas bubbled into bromine water', 'Observation', 'Inference'], [['Ethane', 'Stays orange-brown', 'Saturated'], ['Ethene', 'Turns colourless', 'Unsaturated (C=C)'], ['Ethyne', 'Turns colourless', 'Unsaturated (C≡C)']], 'Table of the bromine-water test on ethane, ethene and ethyne'),
      [5],
    ),
    sec(
      '6. Uses of methane, ethane, ethene and ethyne',
      `- **Methane:** fuel (natural gas, CNG, biogas); making hydrogen, carbon black (tyres, printing ink) and chloromethanes.
- **Ethane:** fuel; cracked to make ethene; making chloroethane.
- **Ethene:** making polythene; making ethanol; artificial ripening of fruit (a natural plant hormone).
- **Ethyne:** oxy-acetylene flame (about 3000 °C) for welding and cutting metals; making plastics such as PVC; carbide lamps.`,
      [kt('Oxy-acetylene flame', 'The very hot flame obtained by burning ethyne (acetylene) in oxygen, used for welding and cutting metals.')],
      [],
      table(['Hydrocarbon', 'One important use'], [['Methane', 'Fuel (CNG, biogas)'], ['Ethane', 'Making ethene'], ['Ethene', 'Making polythene'], ['Ethyne', 'Welding and cutting metals']], 'Table of one important use of each of methane, ethane, ethene and ethyne'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing that sodium ethanoate gives ethane (it gives methane: one carbon fewer).
- Forgetting the condition: soda lime and heat; Zn–Cu couple; diffused sunlight; alcoholic KOH; conc. H₂SO₄ at 170 °C; Ni at 300 °C.
- Using aqueous KOH for dehydrohalogenation.
- Writing ethyne + Br₂ → C₂H₂Br₂ when bromine is in excess (the product is C₂H₂Br₄).

**How marks are usually awarded**
- Equation (1 mark): correct formulae, balanced, with the condition.
- Observation (1 mark): colour before and after ("orange-brown to colourless").
- Test to distinguish (2 marks): reagent, plus the observation for each compound.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of alkanes?', 'CₙH₂ₙ₊₂.', 'formula', 1),
    fc(2, 'Name three sources of atmospheric methane.', 'Paddy fields, cattle, landfills (also gas leaks, coal mines).', 'fact', 1),
    fc(3, 'Why is methane a greenhouse gas of concern?', 'It traps heat radiated by the Earth, far more strongly per molecule than CO₂.', 'concept', 1),
    fc(4, 'What is soda lime?', 'NaOH + CaO.', 'definition', 1),
    fc(5, 'Role of CaO in soda lime?', 'Keeps NaOH dry and stops it attacking glass; does not react.', 'concept', 1),
    fc(6, 'Sodium ethanoate + soda lime →?', 'CH₄ + Na₂CO₃ (decarboxylation).', 'formula', 1),
    fc(7, 'Which salt gives ethane with soda lime?', 'Sodium propanoate, C₂H₅COONa.', 'fact', 1),
    fc(8, 'Reducing agent for alkyl halide → alkane?', 'Nascent hydrogen from a Zn–Cu couple and ethanol.', 'fact', 1),
    fc(9, 'Why is methane collected over water?', 'It is nearly insoluble in water.', 'concept', 1),
    fc(10, 'Complete combustion of ethane (balanced)?', '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.', 'formula', 2),
    fc(11, 'Poisonous product of incomplete combustion?', 'Carbon monoxide.', 'fact', 2),
    fc(12, 'Condition for methane + chlorine substitution?', 'Diffused sunlight.', 'fact', 2),
    fc(13, 'Four substitution products of methane?', 'CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄.', 'example', 2),
    fc(14, 'Trivial name of CHCl₃?', 'Chloroform.', 'fact', 2),
    fc(15, 'Methane + chlorine in the dark?', 'No reaction.', 'fact', 2),
    fc(16, 'Ethene from bromoethane: reagent?', 'Alcoholic KOH, boil (dehydrohalogenation).', 'fact', 3),
    fc(17, 'Ethene from ethanol: reagent and temperature?', 'Excess conc. H₂SO₄, about 170 °C.', 'fact', 3),
    fc(18, 'Why pass ethene through NaOH solution?', 'To remove SO₂ and CO₂ impurities.', 'concept', 3),
    fc(19, 'CaC₂ + 2H₂O →?', 'C₂H₂ + Ca(OH)₂.', 'formula', 4),
    fc(20, '1,2-dibromoethane + alcoholic KOH gives?', 'Ethyne (two HBr removed).', 'fact', 4),
    fc(21, 'Why does impure ethyne smell of garlic?', 'Impurities such as phosphine from the carbide.', 'concept', 4),
    fc(22, 'Catalyst for adding hydrogen to ethene?', 'Nickel, about 300 °C.', 'fact', 5),
    fc(23, 'Ethene + Br₂ → ?', '1,2-dibromoethane, C₂H₄Br₂.', 'formula', 5),
    fc(24, 'Ethyne + excess Br₂ → ?', '1,1,2,2-tetrabromoethane, C₂H₂Br₄.', 'formula', 5),
    fc(25, 'Ethene + I₂ → ?', '1,2-diiodoethane.', 'example', 5),
    fc(26, 'Test for unsaturation?', 'Bromine water: orange-brown → colourless with C=C or C≡C.', 'concept', 5),
    fc(27, 'Draw the bromine test result for ethane.', 'Tube stays orange-brown: no addition.', 'diagram', 5),
    fc(28, 'One use of ethene?', 'Making polythene (also ripening fruit).', 'fact', 6),
    fc(29, 'One use of ethyne?', 'Oxy-acetylene flame for welding and cutting metals.', 'fact', 6),
    fc(30, 'Exam tip: KOH', 'Alcoholic KOH → ethene; aqueous KOH → ethanol.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
