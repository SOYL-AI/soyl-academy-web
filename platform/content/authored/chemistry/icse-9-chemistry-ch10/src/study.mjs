// ICSE 9 Chemistry ch10 notes and flashcards.
import { T, unit, PROV, table } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Hydrogen: Position, Sources and Preparation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Position of hydrogen in the periodic table',
      `Hydrogen (atomic number 1) has **one proton and one electron**, in a single shell. It is placed at the top of **group 1**, but it also resembles **group 17**, so its position is a compromise.

| Resemblance with alkali metals (group 1) | Resemblance with halogens (group 17) |
|---|---|
| One electron in the outer shell | One electron short of a full shell (two for hydrogen, eight for chlorine) |
| Loses that electron to form a positive ion, $\\ce{H+}$ like $\\ce{Na+}$ | Gains an electron to form a negative ion, $\\ce{H-}$ in sodium hydride like $\\ce{Cl-}$ in sodium chloride |
| Burns in oxygen to form an oxide: $\\ce{2H2 + O2 -> 2H2O}$ like $\\ce{4Na + O2 -> 2Na2O}$ | Exists as diatomic molecules, $\\ce{H2}$ like $\\ce{Cl2}$ |
| Acts as a reducing agent | Is a non-metal gas and forms covalent compounds with non-metals, such as $\\ce{HCl}$ |

**Differences from the alkali metals:** hydrogen is a gas, not a metal; it has no metallic lustre; it does not form a strongly basic hydroxide; its ion $\\ce{H+}$ is a bare proton. **Differences from the halogens:** hydrogen is much less reactive with metals and burns in oxygen, which the halogens do not.

Ionic hydrides: $\\ce{2Na + H2 -> 2NaH}$ and $\\ce{Ca + H2 -> CaH2}$, in which hydrogen is the negative ion. Covalent compound: $\\ce{H2 + Cl2 -> 2HCl}$.`,
      [kt('Position of hydrogen', 'Placed at the top of group 1 because it has one outer electron, with some resemblance to group 17 because it is one electron short of a full shell.'), kt('Hydride', 'A compound of hydrogen with a metal, in which hydrogen is the negative ion, for example sodium hydride.')],
      V.position,
      [1],
    ),
    sec(
      '2. Hydrogen from water and steam',
      `The more reactive the metal, the milder the condition needed. This is the order of the activity series: K, Na, Ca, Mg, Al, Zn, Fe, (H), Cu.

| Metal | Condition | Equation | What is seen |
|---|---|---|---|
| Sodium | Cold water | $\\ce{2Na + 2H2O -> 2NaOH + H2}$ | Floats, melts to a silvery ball, darts about, hisses; the solution turns red litmus blue |
| Potassium | Cold water | $\\ce{2K + 2H2O -> 2KOH + H2}$ | More violent; the hydrogen catches fire with a lilac flame |
| Calcium | Cold water | $\\ce{Ca + 2H2O -> Ca(OH)2 + H2}$ | Sinks; steady bubbles; the solution turns milky |
| Magnesium | Hot water | $\\ce{Mg + 2H2O -> Mg(OH)2 + H2}$ | Slow bubbles; magnesium burns brightly in steam to give the oxide: $\\ce{Mg + H2O -> MgO + H2}$ |
| Aluminium | Steam, heated | $\\ce{2Al + 3H2O -> Al2O3 + 3H2}$ | The oxide layer on the metal must be broken down by heating |
| Zinc | Steam, heated | $\\ce{Zn + H2O -> ZnO + H2}$ | Zinc oxide: yellow when hot, white when cold |
| Iron | Steam over red-hot iron | $\\ce{3Fe + 4H2O <=> Fe3O4 + 4H2}$ | Black triiron tetroxide; **reversible** |

**Iron and steam is reversible:** hydrogen can reduce the iron oxide back to iron, so steam is passed continuously to carry the hydrogen away.

**Carbon and steam:** $\\ce{C + H2O -> CO + H2}$ with red-hot coke gives **water gas**, a mixture of carbon monoxide and hydrogen.

**Steam set-up:** boiling water supplies steam, which passes over the heated metal in a hard-glass tube; the hydrogen is collected over water.`,
      [kt('Water gas', 'A mixture of carbon monoxide and hydrogen made by passing steam over red-hot coke.'), kt('Reversible reaction', 'A reaction that can go in either direction, shown by the sign ⇌; iron and steam is an example.')],
      V.steam,
      [2],
    ),
    sec(
      '3. Hydrogen from dilute acids and alkalis',
      `**Dilute acids.** Metals above hydrogen displace it from dilute hydrochloric acid and dilute sulphuric acid.

| Metal | With dilute HCl | With dilute H₂SO₄ |
|---|---|---|
| Magnesium | $\\ce{Mg + 2HCl -> MgCl2 + H2}$ | $\\ce{Mg + H2SO4 -> MgSO4 + H2}$ |
| Aluminium | $\\ce{2Al + 6HCl -> 2AlCl3 + 3H2}$ | $\\ce{2Al + 3H2SO4 -> Al2(SO4)3 + 3H2}$ |
| Zinc | $\\ce{Zn + 2HCl -> ZnCl2 + H2}$ | $\\ce{Zn + H2SO4 -> ZnSO4 + H2}$ |
| Iron | $\\ce{Fe + 2HCl -> FeCl2 + H2}$ | $\\ce{Fe + H2SO4 -> FeSO4 + H2}$ |

Iron gives iron(II) salts (a pale green solution). Aluminium is slow at first because of its oxide layer.

**Alkalis.** Zinc, aluminium and lead react with a hot concentrated solution of sodium hydroxide or potassium hydroxide and give hydrogen. The metal ends up in the negative ion (zincate, aluminate, plumbite):

- $\\ce{Zn + 2NaOH -> Na2ZnO2 + H2}$ (sodium zincate); with potassium hydroxide, $\\ce{Zn + 2KOH -> K2ZnO2 + H2}$
- $\\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}$ (sodium aluminate); with potassium hydroxide, $\\ce{2Al + 2KOH + 2H2O -> 2KAlO2 + 3H2}$
- $\\ce{Pb + 2NaOH -> Na2PbO2 + H2}$ (sodium plumbite); with potassium hydroxide, $\\ce{Pb + 2KOH -> K2PbO2 + H2}$

**Metals and acids that are not used**
- **Dilute nitric acid:** it is a strong oxidising agent. It oxidises the hydrogen to water as it forms, and is itself reduced to oxides of nitrogen, so hydrogen is not collected.
- **Very reactive metals (sodium, potassium, calcium):** they react violently, and with the water of the acid, so the reaction is dangerous and cannot be controlled.
- **Unreactive metals (copper, silver, gold):** they lie below hydrogen in the activity series, so they do not displace it from dilute acids.
- **Lead with dilute sulphuric acid:** an insoluble coat of lead sulphate stops the reaction.`,
      [kt('Zincate', 'The negative ion of zinc in a salt such as sodium zincate, Na₂ZnO₂, formed when zinc reacts with an alkali.'), kt('Oxidising agent', 'A substance that oxidises another; concentrated or dilute nitric acid oxidises hydrogen to water.')],
      table(['Metal', 'Dilute acid gives hydrogen?'], [['Magnesium, aluminium, zinc, iron', 'Yes'], ['Copper, silver, gold', 'No']], 'Table showing which metals give hydrogen with dilute acid'),
      [3],
    ),
    sec(
      '4. Laboratory preparation of hydrogen',
      `**Reaction:** $\\ce{Zn + H2SO4 -> ZnSO4 + H2}$ or $\\ce{Zn + 2HCl -> ZnCl2 + H2}$ (dilute acid, room temperature).

**Why zinc?** It reacts at a moderate rate: sodium is too violent, magnesium too fast and expensive, iron too slow, and copper does not react. Granules are used because powder reacts too quickly. A few drops of copper(II) sulphate solution make the reaction faster.

**Set-up** (see the diagram): zinc granules in a flask; dilute acid added through a **thistle funnel whose lower end dips below the acid**, so the gas cannot escape up the funnel; a delivery tube leads to a trough of water.

**Collection:** by **downward displacement of water**. Hydrogen is almost insoluble in water, so it pushes the water out of a jar standing upside down in the trough. You can see when the jar is full and the gas is not mixed with air. Hydrogen is lighter than air, so it cannot be collected by downward displacement of air.

**Impurities and their removal:** the gas may carry acid spray, traces of gases from impurities in the zinc (such as hydrogen sulphide) and moisture. It is passed through a wash bottle of alkali solution (for acid gases) and then dried with anhydrous calcium chloride or concentrated sulphuric acid. When the gas is collected over water it is not dry.

**Precautions**
- Make sure all joints are airtight.
- Keep flames away: a mixture of hydrogen and air explodes.
- Reject the first jar of gas, which contains air from the flask; test a sample with a flame — a quiet pop shows the gas is pure.
- Add acid slowly, and use dilute acid; concentrated acid gives other gases.

**Test for hydrogen:** it burns with a pop when a lighted splint is brought near; it is colourless and odourless.`,
      [kt('Downward displacement of water', 'Collection of a gas that is almost insoluble in water by letting it push the water out of an inverted jar.'), kt('Thistle funnel', 'A funnel with a long stem used to add liquid to a flask; the lower end must dip below the liquid.')],
      V.lab,
      [4],
    ),
    sec(
      '5. Industrial manufacture: the Bosch process',
      `**Stage 1: water gas.** Steam is passed over red-hot coke at about 1000 °C:

$\\ce{C + H2O -> CO + H2}$ (water gas: carbon monoxide and hydrogen).

**Stage 2: conversion of carbon monoxide.** Water gas is mixed with more steam and passed over a catalyst of **iron(III) oxide** ($\\ce{Fe2O3}$), with **chromium(III) oxide** ($\\ce{Cr2O3}$) as a promoter, at about **450 °C**:

$\\ce{CO + H2O <=> CO2 + H2}$

**Removal of the gases from the hydrogen**
- **Carbon dioxide** is removed by washing with **water under pressure** (carbon dioxide is more soluble under pressure) or by **potassium hydroxide solution**: $\\ce{CO2 + 2KOH -> K2CO3 + H2O}$.
- **Carbon monoxide** (the small amount that is left) is removed by **ammoniacal cuprous chloride** solution.

The product is nearly pure hydrogen. Count of molecules: 30 carbon atoms give 30 CO and 30 H₂ in stage 1, and a further 30 H₂ and 30 CO₂ in stage 2, so 60 H₂ in all.`,
      [kt('Bosch process', 'Industrial manufacture of hydrogen from water gas and steam over a catalyst, followed by removal of carbon dioxide and carbon monoxide.'), kt('Promoter', 'A substance that improves the working of a catalyst, such as chromium(III) oxide in the Bosch process.')],
      table(['Stage', 'Reaction', 'Condition'], [['1', 'C + H₂O → CO + H₂', 'Red-hot coke, about 1000 °C'], ['2', 'CO + H₂O ⇌ CO₂ + H₂', 'Fe₂O₃ catalyst, Cr₂O₃ promoter, about 450 °C']], 'Table of the two stages of the Bosch process'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving sodium oxide, not sodium hydroxide, as the product of sodium and cold water.
- Forgetting the condition: cold water, hot water or steam; or writing a reversible arrow for the wrong metals (it is iron and steam).
- Writing Fe₂O₃ for iron and steam; it is Fe₃O₄.
- Using brackets for zincate, aluminate or plumbite; write the salts as Na₂ZnO₂, NaAlO₂ and Na₂PbO₂.
- Drawing the thistle funnel above the acid level, or collecting by upward displacement of air.
- Saying nitric acid is "too strong" without saying that it is an oxidising agent.
- Mixing up the removal of carbon dioxide (water under pressure or potassium hydroxide) with that of carbon monoxide (ammoniacal cuprous chloride).

**How marks are usually awarded**
- 1 mark: a balanced equation, a condition, a name, or one observation.
- 2 marks: an equation with its condition, or a precaution with its reason.
- 3 marks: three equations, or a labelled diagram of the apparatus.
- 10-mark structured question: a situation or set-up with parts of 2 to 4 marks: equations, observations, reasons, a diagram and a count from an equation.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why is hydrogen placed at the top of group 1?', 'It has one electron in its outer shell, like the alkali metals, and can form H⁺.', 'concept', 1),
    fc(2, 'Why does hydrogen also resemble the halogens?', 'It is one electron short of a full shell, forms H⁻ in hydrides, is diatomic and is a non-metal.', 'concept', 1),
    fc(3, 'What is a hydride? Give an example.', 'A compound in which hydrogen is the negative ion, such as NaH.', 'definition', 1),
    fc(4, 'Sodium with cold water: equation?', '2Na + 2H₂O → 2NaOH + H₂.', 'formula', 2),
    fc(5, 'Calcium with cold water: equation and observation?', 'Ca + 2H₂O → Ca(OH)₂ + H₂; steady bubbles, solution turns milky.', 'example', 2),
    fc(6, 'Which metal burns with a lilac flame in water?', 'Potassium: 2K + 2H₂O → 2KOH + H₂.', 'fact', 2),
    fc(7, 'Magnesium and hot water: equation?', 'Mg + 2H₂O → Mg(OH)₂ + H₂.', 'formula', 2),
    fc(8, 'Aluminium and steam: equation?', '2Al + 3H₂O → Al₂O₃ + 3H₂.', 'formula', 2),
    fc(9, 'Zinc and steam: equation and the colour of the oxide?', 'Zn + H₂O → ZnO + H₂; yellow when hot, white when cold.', 'example', 2),
    fc(10, 'Iron and steam: equation?', '3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂ (reversible).', 'formula', 2),
    fc(11, 'Why is steam passed continuously over the iron?', 'To carry hydrogen away so it cannot reverse the reaction.', 'concept', 2),
    fc(12, 'What is water gas and how is it made?', 'Carbon monoxide + hydrogen, from steam over red-hot coke.', 'definition', 2),
    fc(13, 'Which metals react with dilute acids to give hydrogen?', 'Those above hydrogen: Mg, Al, Zn and Fe.', 'fact', 3),
    fc(14, 'Aluminium with dilute hydrochloric acid: equation?', '2Al + 6HCl → 2AlCl₃ + 3H₂.', 'formula', 3),
    fc(15, 'Iron with dilute sulphuric acid: equation?', 'Fe + H₂SO₄ → FeSO₄ + H₂ (iron(II)).', 'formula', 3),
    fc(16, 'Zinc with sodium hydroxide: equation and salt?', 'Zn + 2NaOH → Na₂ZnO₂ + H₂; sodium zincate.', 'example', 3),
    fc(17, 'Aluminium with sodium hydroxide: equation?', '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.', 'formula', 3),
    fc(18, 'Lead with sodium hydroxide: equation and salt?', 'Pb + 2NaOH → Na₂PbO₂ + H₂; sodium plumbite.', 'example', 3),
    fc(19, 'Why is dilute nitric acid not used?', 'It is an oxidising agent: it oxidises hydrogen to water and gives oxides of nitrogen.', 'concept', 3),
    fc(20, 'Why are Na, K and Ca not used with acids?', 'They are far too violent.', 'concept', 3),
    fc(21, 'Why does copper not give hydrogen with dilute acid?', 'It is below hydrogen in the activity series.', 'concept', 3),
    fc(22, 'Laboratory preparation: reactants and equation?', 'Zinc granules and dilute H₂SO₄: Zn + H₂SO₄ → ZnSO₄ + H₂.', 'example', 4),
    fc(23, 'Why must the thistle funnel dip below the acid?', 'So the gas cannot escape through the funnel.', 'concept', 4),
    fc(24, 'How is hydrogen collected, and why?', 'By downward displacement of water: it is almost insoluble in water.', 'concept', 4),
    fc(25, 'Why is the first jar of gas rejected?', 'It contains air from the flask; air and hydrogen explode.', 'concept', 4),
    fc(26, 'Test for hydrogen?', 'It burns with a pop near a flame.', 'fact', 4),
    fc(27, 'Bosch process: stage 1?', 'C + H₂O → CO + H₂; steam over red-hot coke gives water gas.', 'formula', 5),
    fc(28, 'Bosch process: stage 2 and conditions?', 'CO + H₂O ⇌ CO₂ + H₂ over Fe₂O₃ with Cr₂O₃ at about 450 °C.', 'formula', 5),
    fc(29, 'How is CO₂ removed from the product?', 'By water under pressure or by KOH solution.', 'fact', 5),
    fc(30, 'How is CO removed from the product?', 'By ammoniacal cuprous chloride.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
