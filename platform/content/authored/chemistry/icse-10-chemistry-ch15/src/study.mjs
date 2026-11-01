// ICSE 10 Chemistry ch15 Alcohols and Carboxylic Acids — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fx = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Alcohols and Carboxylic Acids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Ethanol: preparation and physical properties',
      `**Ethanol** (ethyl alcohol), C₂H₅OH or CH₃–CH₂–OH: an ethyl group joined to the **hydroxyl group, –OH**, the functional group of alcohols (general formula CₙH₂ₙ₊₁OH).

**Preparation by hydrolysis of an alkyl halide:** boil bromoethane with **aqueous** NaOH or KOH; OH⁻ replaces Br. (Alcoholic KOH gives ethene instead.)

**Physical properties:** colourless, volatile liquid; pleasant smell, burning taste; **boils at 78 °C**, freezes at about −114 °C; **density 0.79 g cm⁻³** (lighter than water); **miscible with water** in all proportions (hydrogen bonding through –OH); good solvent; **neutral to litmus**.`,
      [kt('Alcohol', 'An organic compound in which a hydroxyl group, –OH, is joined to a saturated carbon atom.'), kt('Hydrolysis (of an alkyl halide)', 'Replacement of the halogen atom of an alkyl halide by –OH on boiling with an aqueous alkali.')],
      [fx(r`\ce{C2H5Br + NaOH ->[{aqueous, boil}] C2H5OH + NaBr}`, 'Ethanol from bromoethane')],
      table(['Property', 'Ethanol'], [['Appearance', 'Colourless, volatile liquid'], ['Boiling point', '78 °C'], ['Density', '0.79 g cm⁻³'], ['Solubility in water', 'Miscible in all proportions'], ['Litmus', 'Neutral']], 'Table of five physical properties of ethanol'),
      [1],
    ),
    sec(
      '2. Chemical properties of ethanol',
      `- **Combustion:** burns with a blue, non-sooty flame; CO₂ and H₂O; much heat (fuel).
- **Sodium:** brisk effervescence of **hydrogen**; **sodium ethoxide** C₂H₅ONa is left (gentler than sodium with water).
- **Esterification:** warmed with ethanoic acid and **a few drops of conc. H₂SO₄**, gives **ethyl ethanoate** (fruity smell) and water; reversible.
- **Dehydration:** heated with **excess conc. H₂SO₄ at about 170 °C**, gives **ethene**.`,
      [kt('Sodium ethoxide', 'The compound C₂H₅ONa formed, with hydrogen, when sodium reacts with ethanol.'), kt('Esterification', 'The reaction of a carboxylic acid with an alcohol, in the presence of concentrated sulphuric acid, to form an ester and water.')],
      [
        fx(r`\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}`, 'Combustion'),
        fx(r`\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}`, 'With sodium'),
        fx(r`\ce{C2H5OH + CH3COOH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}`, 'Esterification'),
        fx(r`\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}`, 'Dehydration'),
      ],
      table(['Reagent and condition', 'Product', 'Observation'], [['Air, ignite', 'CO₂ + H₂O', 'Blue flame'], ['Sodium', 'C₂H₅ONa + H₂', 'Effervescence'], ['Ethanoic acid, conc. H₂SO₄, warm', 'CH₃COOC₂H₅ + H₂O', 'Fruity smell'], ['Excess conc. H₂SO₄, 170 °C', 'C₂H₄ + H₂O', 'Gas decolourises bromine water']], 'Table of four reactions of ethanol with products and observations'),
      [2],
    ),
    sec(
      '3. Denatured, methylated and spurious alcohol; uses of ethanol',
      `**Denatured alcohol:** ethanol made unfit to drink by adding **methanol**, pyridine and a dye (such as copper sulphate). Industrial ethanol carries no liquor tax; denaturing prevents its misuse as a drink. **Methylated spirit:** ethanol denatured mainly with methanol.

**Spurious alcohol:** illicit liquor, often containing **methanol**. In the body methanol is oxidised to methanal and methanoic acid, which damage the optic nerve: **blindness** and even **death**.

**Uses of ethanol:** solvent (medicines, tinctures, perfumes, varnishes); fuel and petrol blend (E20); antiseptic and hand sanitiser; thermometer liquid for cold places (freezes at about −114 °C); making ethanoic acid, esters and ethene; alcoholic drinks.`,
      [kt('Denatured alcohol', 'Ethanol made unfit for drinking by adding poisonous or unpleasant substances such as methanol and pyridine.'), kt('Spurious alcohol', 'Illegally made liquor, often contaminated with methanol, which can cause blindness or death.')],
      [],
      table(['Use of ethanol', 'Property it depends on'], [['Solvent in medicines and perfumes', 'Dissolves many organic substances'], ['Fuel', 'Burns with a clean, hot flame'], ['Sanitiser', 'Kills germs'], ['Thermometers for cold places', 'Very low freezing point']], 'Table of four uses of ethanol with the property each depends on'),
      [3],
    ),
    sec(
      '4. Ethanoic (acetic) acid: structure and physical properties',
      `**Ethanoic acid**, CH₃COOH: a methyl group joined to the **carboxyl group, –COOH** (the carboxyl carbon has one C=O and one C–OH). Molecular mass 60. **Vinegar** is a 5–8 per cent solution of it in water.

**Physical properties:** colourless liquid; pungent vinegar smell; sour taste; **boils at 118 °C**; **melts at about 17 °C** (16.6 °C); miscible with water; the pure acid is corrosive.

**Glacial acetic acid:** pure (anhydrous) ethanoic acid. Below about 17 °C it freezes into colourless, **ice-like crystals**, hence "glacial".`,
      [kt('Carboxyl group', 'The functional group –COOH of carboxylic acids: a carbon atom with a C=O bond and a C–OH bond.'), kt('Glacial acetic acid', 'Pure, water-free ethanoic acid, which freezes at about 17 °C to an ice-like solid.')],
      [],
      table(['Property', 'Ethanol', 'Ethanoic acid'], [['Smell', 'Pleasant', 'Vinegar'], ['Boiling point', '78 °C', '118 °C'], ['Melting point', 'about −114 °C', 'about 17 °C'], ['Blue litmus', 'No change', 'Red']], 'Table comparing ethanol and ethanoic acid'),
      [4],
    ),
    sec(
      '5. Chemical properties of ethanoic acid',
      `- **Litmus:** turns blue litmus red. It is a **weak acid**: only partly ionised in water (CH₃COOH ⇌ CH₃COO⁻ + H⁺).
- **Alkalis:** neutralisation gives a salt (ethanoate) and water.
- **Alcohols (esterification):** with ethanol and a few drops of conc. H₂SO₄ (warm), gives **ethyl ethanoate**; with methanol gives **methyl ethanoate**. **Evidence:** the mixture poured into water gives an oily layer with a **sweet, fruity smell**. Conc. H₂SO₄ acts as catalyst and dehydrating agent; the reaction is reversible.`,
      [kt('Weak acid', 'An acid that is only partly ionised in water, so its solution contains relatively few hydrogen ions.'), kt('Ester', 'A compound formed from a carboxylic acid and an alcohol, with the group –COO–; esters have fruity smells.')],
      [
        fx(r`\ce{CH3COOH + NaOH -> CH3COONa + H2O}`, 'With sodium hydroxide'),
        fx(r`\ce{CH3COOH + KOH -> CH3COOK + H2O}`, 'With potassium hydroxide'),
        fx(r`\ce{CH3COOH + CH3OH <=>[{conc. H2SO4}] CH3COOCH3 + H2O}`, 'With methanol: methyl ethanoate'),
      ],
      table(['Reagent', 'Product', 'Type of reaction'], [['Blue litmus', 'Turns red', 'Acidic nature'], ['NaOH solution', 'Sodium ethanoate + water', 'Neutralisation'], ['Ethanol, conc. H₂SO₄', 'Ethyl ethanoate + water', 'Esterification']], 'Table of three reactions of ethanoic acid'),
      [5],
    ),
    sec(
      '6. Uses of ethanoic acid',
      `- **Vinegar:** flavouring food and preserving pickles (the acid stops microbes from growing).
- **Esters:** for perfumes and artificial food flavourings.
- **Rubber industry:** coagulating latex.
- **Plastics and fibres:** cellulose acetate (photographic film, rayon).
- **Laboratory:** a reagent and solvent; making ethanoates such as sodium ethanoate.`,
      [kt('Vinegar', 'A dilute (about 5–8 per cent) solution of ethanoic acid in water, used in food.')],
      [],
      table(['Use', 'Why ethanoic acid'], [['Preserving pickles', 'Acidic: stops microbes growing'], ['Making esters', 'Reacts with alcohols'], ['Coagulating latex', 'Acid makes rubber particles clump']], 'Table of three uses of ethanoic acid and the reason for each'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing aqueous and alcoholic KOH as if they gave the same product with bromoethane.
- Unbalanced sodium equation: write 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂.
- Calling ethanol acidic because it reacts with sodium (it is neutral to litmus).
- Writing hydrogen instead of water as a product of ethanoic acid with an alkali.
- Naming the ester with the acid part first (it is ethyl ethanoate, methyl ethanoate).

**How marks are usually awarded**
- Equation (1 mark): correct formulae, balanced, with the condition.
- Observation (1 mark): "brisk effervescence" with sodium; "fruity smell" for an ester; "blue litmus turns red" for the acid.
- Definitions (1 mark): denatured alcohol, glacial acetic acid — include the key reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Functional group of alcohols?', 'Hydroxyl group, –OH.', 'definition', 1),
    fc(2, 'Bromoethane + aqueous NaOH →?', 'Ethanol + NaBr (hydrolysis).', 'formula', 1),
    fc(3, 'Boiling point of ethanol?', '78 °C.', 'fact', 1),
    fc(4, 'Is ethanol lighter or heavier than water?', 'Lighter (0.79 g cm⁻³).', 'fact', 1),
    fc(5, 'Effect of ethanol on litmus?', 'None: it is neutral.', 'fact', 1),
    fc(6, 'Why does ethanol mix with water?', 'Its –OH group forms hydrogen bonds with water.', 'concept', 1),
    fc(7, 'Combustion of ethanol (balanced)?', 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.', 'formula', 2),
    fc(8, 'Ethanol + sodium: products?', 'Sodium ethoxide and hydrogen.', 'fact', 2),
    fc(9, 'Observation: sodium in ethanol?', 'Brisk effervescence; gas burns with a pop.', 'fact', 2),
    fc(10, 'Condition for dehydration of ethanol?', 'Excess conc. H₂SO₄, about 170 °C.', 'fact', 2),
    fc(11, 'Ethanol + ethanoic acid (conc. H₂SO₄) →?', 'Ethyl ethanoate + water.', 'formula', 2),
    fc(12, 'Denatured alcohol?', 'Ethanol made unfit to drink by adding methanol, pyridine and a dye.', 'definition', 3),
    fc(13, 'Why is ethanol denatured?', 'To stop untaxed industrial ethanol being drunk.', 'concept', 3),
    fc(14, 'Methylated spirit?', 'Ethanol denatured mainly with methanol.', 'definition', 3),
    fc(15, 'Why is spurious alcohol dangerous?', 'It may contain methanol, which causes blindness or death.', 'concept', 3),
    fc(16, 'Two uses of ethanol?', 'Solvent for medicines; fuel (also sanitiser, thermometers).', 'fact', 3),
    fc(17, 'Functional group of carboxylic acids?', 'Carboxyl group, –COOH.', 'definition', 4),
    fc(18, 'Draw the carboxyl group in words.', 'C with =O and –OH: CH₃–C(=O)–O–H.', 'diagram', 4),
    fc(19, 'Boiling and melting points of ethanoic acid?', '118 °C; about 17 °C.', 'fact', 4),
    fc(20, 'Glacial acetic acid?', 'Pure ethanoic acid; freezes at about 17 °C into ice-like crystals.', 'definition', 4),
    fc(21, 'What is vinegar?', 'A 5–8 per cent solution of ethanoic acid in water.', 'fact', 4),
    fc(22, 'Ethanoic acid and blue litmus?', 'Turns red.', 'fact', 5),
    fc(23, 'Why is ethanoic acid a weak acid?', 'It is only partly ionised in water.', 'concept', 5),
    fc(24, 'CH₃COOH + NaOH →?', 'CH₃COONa + H₂O (sodium ethanoate).', 'formula', 5),
    fc(25, 'Evidence that an ester has formed?', 'Sweet, fruity smell (oily layer on water).', 'fact', 5),
    fc(26, 'Role of conc. H₂SO₄ in esterification?', 'Catalyst and dehydrating agent.', 'concept', 5),
    fc(27, 'Ester from ethanoic acid and methanol?', 'Methyl ethanoate, CH₃COOCH₃.', 'example', 5),
    fc(28, 'Use of ethanoic acid in the rubber industry?', 'Coagulating latex.', 'fact', 5),
    fc(29, 'One test to tell ethanol from ethanoic acid?', 'Blue litmus: only the acid turns it red.', 'example', 5),
    fc(30, 'Exam tip: naming esters', 'Alcohol part first: ethyl ethanoate.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
