// ICSE 10 Chemistry ch12 Study of Compounds: Sulphuric Acid — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Study of Compounds: Sulphuric Acid — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The Contact process (equations and conditions)',
      `- **Step 1:** sulphur burnt in air (or iron pyrites roasted) → SO₂, which is purified and dried.
- **Step 2 (contact step):** SO₂ + excess air over **vanadium pentoxide, V₂O₅**, at about **450 °C** and **1–2 atm**; reversible and exothermic.
- **Step 3:** SO₃ absorbed in **concentrated H₂SO₄** → **oleum** (fuming sulphuric acid, H₂S₂O₇).
- **Step 4:** oleum diluted with the calculated amount of water → H₂SO₄.

**Why not water?** SO₃ + H₂O is violently exothermic and forms a **dense mist** of acid droplets that does not condense easily.`,
      [kt('Contact process', 'The industrial manufacture of sulphuric acid in which sulphur dioxide and oxygen combine on the surface of a vanadium pentoxide catalyst.'), kt('Oleum', 'H₂S₂O₇, fuming sulphuric acid, formed when sulphur trioxide dissolves in concentrated sulphuric acid.')],
      [fm(r`\ce{S + O2 -> SO2}`, 'Burning sulphur'), fm(r`\ce{2SO2 + O2 <=> 2SO3}`, 'V₂O₅, about 450 °C, 1–2 atm'), fm(r`\ce{SO3 + H2SO4 -> H2S2O7}`, 'Oleum'), fm(r`\ce{H2S2O7 + H2O -> 2H2SO4}`, 'Dilution of oleum')],
      table(['Step', 'Condition'], [['SO₂ → SO₃', 'V₂O₅, about 450 °C, 1–2 atm, excess air'], ['SO₃ → oleum', 'Absorbed in conc. H₂SO₄'], ['Oleum → acid', 'Diluted with water']], 'Table of the conditions for the later steps of the Contact process'),
      [1],
    ),
    sec(
      '2. Dilute sulphuric acid: a dibasic acid',
      `Each molecule gives **two H⁺ ions** (H₂SO₄ → 2H⁺ + SO₄²⁻), so the acid is **dibasic** and forms **two series of salts**:

- **acid salts** (one H replaced): NaHSO₄, KHSO₄
- **normal salts** (both H replaced): Na₂SO₄, K₂SO₄`,
      [kt('Dibasic acid', 'An acid with two replaceable hydrogen atoms per molecule, which forms both acid salts and normal salts.'), kt('Acid salt', 'A salt in which only part of the replaceable hydrogen of the acid has been replaced by a metal, such as NaHSO₄.')],
      [fm(r`\ce{NaOH + H2SO4 -> NaHSO4 + H2O}`, 'Acid salt'), fm(r`\ce{2NaOH + H2SO4 -> Na2SO4 + 2H2O}`, 'Normal salt')],
      table(['Base : acid (moles)', 'Salt', 'Type'], [['1 : 1 (NaOH)', 'NaHSO₄', 'Acid salt'], ['2 : 1 (NaOH)', 'Na₂SO₄', 'Normal salt']], 'Table of the salts formed by sodium hydroxide and sulphuric acid in two mole ratios'),
      [2],
    ),
    sec(
      '3. Reactions of the dilute acid',
      `- **Active metals** (above H): sulphate + **hydrogen**. Copper does not react.
- **Basic oxides and hydroxides:** sulphate + water.
- **Carbonates, hydrogen carbonates:** sulphate + water + **CO₂**. With marble chips the reaction soon stops: insoluble **CaSO₄** coats the chips.
- **Sulphites, hydrogen sulphites:** sulphate + water + **SO₂**.
- **Sulphides:** sulphate + **H₂S** (rotten-egg smell).`,
      [kt('Displacement of a weaker acid', 'A strong acid reacting with a salt of a weaker or more volatile acid, setting that acid (or its gas) free.')],
      [fm(r`\ce{Fe + H2SO4 -> FeSO4 + H2}`, 'Metal'), fm(r`\ce{CuO + H2SO4 -> CuSO4 + H2O}`, 'Basic oxide'), fm(r`\ce{2NaHCO3 + H2SO4 -> Na2SO4 + 2H2O + 2CO2}`, 'Hydrogen carbonate'), fm(r`\ce{Na2SO3 + H2SO4 -> Na2SO4 + H2O + SO2}`, 'Sulphite'), fm(r`\ce{2NaHSO3 + H2SO4 -> Na2SO4 + 2H2O + 2SO2}`, 'Hydrogen sulphite'), fm(r`\ce{FeS + H2SO4 -> FeSO4 + H2S}`, 'Sulphide')],
      table(['Salt type', 'Gas', 'Test for the gas'], [['Carbonate', 'CO₂', 'Lime water turns milky'], ['Sulphite', 'SO₂', 'Acidified K₂Cr₂O₇ turns green'], ['Sulphide', 'H₂S', 'Lead acetate paper turns black']], 'Table of the gases given by salts with dilute sulphuric acid and tests for them'),
      [2],
    ),
    sec(
      '4. Concentrated acid as an oxidising agent',
      `**Hot concentrated** sulphuric acid gives oxygen (H₂SO₄ → H₂O + SO₂ + [O]) and is reduced to **sulphur dioxide**.

- **Carbon** is oxidised to CO₂ (gas mixture of CO₂ and SO₂).
- **Sulphur** is oxidised to SO₂ (the only gas).`,
      [kt('Oxidising agent', 'A substance that supplies oxygen to another substance and is itself reduced.')],
      [fm(r`\ce{C + 2H2SO4 -> CO2 + 2H2O + 2SO2}`, 'Carbon, hot conc. acid'), fm(r`\ce{S + 2H2SO4 -> 3SO2 + 2H2O}`, 'Sulphur, hot conc. acid')],
      table(['Heated with', 'Gases given off'], [['Carbon', 'CO₂ and SO₂'], ['Sulphur', 'SO₂ only']], 'Table of the gases given off when carbon and sulphur are oxidised by hot concentrated sulphuric acid'),
      [3],
    ),
    sec(
      '5. Concentrated acid as a dehydrating agent',
      `Concentrated sulphuric acid has a very strong attraction for water.

- **Sugar:** turns yellow → brown → black; a **black spongy mass of carbon** rises; steam; much heat (**charring**): C₁₂H₂₂O₁₁ → 12C + 11H₂O.
- **Blue vitriol:** blue crystals turn **white** as the water of crystallisation is removed: CuSO₄·5H₂O → CuSO₄ + 5H₂O.

**Drying** removes moisture that is merely present (e.g. moist Cl₂, SO₂, HCl passed through the acid); **dehydration** removes the elements of water from a compound. The acid **cannot dry NH₃** (reacts: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄) or **H₂S** (oxidised to sulphur).`,
      [kt('Dehydration', 'Removal of hydrogen and oxygen in the ratio 2 : 1 (the elements of water) from a compound, or of its water of crystallisation.'), kt('Drying', 'Removal of moisture that is simply present in a substance, without changing the substance.')],
      [fm(r`\ce{C12H22O11 -> 12C + 11H2O}`, 'Charring of sugar by conc. H₂SO₄'), fm(r`\ce{2NH3 + H2SO4 -> (NH4)2SO4}`, 'Why ammonia cannot be dried by it')],
      table(['Change', 'Drying or dehydration?'], [['Moist chlorine through conc. H₂SO₄', 'Drying'], ['Sugar charred', 'Dehydration'], ['Blue vitriol turns white', 'Dehydration']], 'Table classifying three changes as drying or dehydration'),
      [4],
    ),
    sec(
      '6. Non-volatile nature and tests',
      `With a boiling point of about 338 °C, sulphuric acid is **non-volatile**. Heated with salts of **volatile acids**, it drives them out: this is how **HCl** and **HNO₃** are prepared.

**Tests for sulphuric acid / a sulphate:**
- **Barium chloride** solution → **white precipitate** of BaSO₄, **insoluble in dilute HCl** (or HNO₃).
- **Lead nitrate** solution → white precipitate of PbSO₄.
- The **concentrated** acid chars sugar, wood or paper.`,
      [kt('Non-volatile acid', 'An acid with a high boiling point that does not easily turn to vapour, such as sulphuric acid.')],
      [fm(r`\ce{NaCl + H2SO4 -> NaHSO4 + HCl}`, 'Below 200 °C'), fm(r`\ce{KNO3 + H2SO4 -> KHSO4 + HNO3}`, 'Below 200 °C'), fm(r`\ce{BaCl2 + H2SO4 -> BaSO4 + 2HCl}`, 'White precipitate'), fm(r`\ce{Pb(NO3)2 + H2SO4 -> PbSO4 + 2HNO3}`, 'White precipitate')],
      table(['Reagent', 'Observation with H₂SO₄'], [['BaCl₂ solution', 'White precipitate, insoluble in dil. HCl'], ['Pb(NO₃)₂ solution', 'White precipitate'], ['Sugar (conc. acid)', 'Chars black']], 'Table of three tests for sulphuric acid and their observations'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using platinum (Ostwald) instead of vanadium pentoxide as the Contact catalyst.
- Writing SO₃ + H₂O → H₂SO₄ as the plant step (SO₃ is absorbed in conc. H₂SO₄ first).
- Calling the charring of sugar “oxidation” or “drying” (it is dehydration).
- Forgetting to add dilute HCl in the barium chloride test.

**How marks are usually awarded**
- Contact process (1 mark per step): equation plus catalyst, temperature and pressure.
- Observations (1 mark each): colour change and the gas or residue.
- Drying versus dehydration (2 marks): one example of each.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why is H₂SO₄ called the king of chemicals?', 'More of it is made and used than any other chemical.', 'fact', 1),
    fc(2, 'Contact process, step 1?', 'S + O₂ → SO₂ (or roasting iron pyrites).', 'formula', 1),
    fc(3, 'Contact process, step 2?', '2SO₂ + O₂ ⇌ 2SO₃.', 'formula', 1),
    fc(4, 'Catalyst and conditions for step 2?', 'V₂O₅, about 450 °C, 1–2 atm.', 'fact', 1),
    fc(5, 'What is oleum?', 'H₂S₂O₇, fuming sulphuric acid (SO₃ in conc. H₂SO₄).', 'definition', 1),
    fc(6, 'Oleum to sulphuric acid?', 'H₂S₂O₇ + H₂O → 2H₂SO₄.', 'formula', 1),
    fc(7, 'Why not dissolve SO₃ in water?', 'Violently exothermic: a dense acid mist forms that does not condense.', 'concept', 1),
    fc(8, 'Diagram: order of the Contact process', 'S → SO₂ → SO₃ (V₂O₅) → oleum → H₂SO₄.', 'diagram', 1),
    fc(9, 'Why is sulphuric acid dibasic?', 'Two replaceable hydrogens per molecule.', 'concept', 2),
    fc(10, 'Acid salt of H₂SO₄ with NaOH?', 'Sodium hydrogen sulphate, NaHSO₄.', 'example', 2),
    fc(11, 'Fe + dil. H₂SO₄?', 'Fe + H₂SO₄ → FeSO₄ + H₂.', 'formula', 2),
    fc(12, 'Gas from a sulphite with dil. H₂SO₄?', 'Sulphur dioxide.', 'fact', 2),
    fc(13, 'Gas from FeS with dil. H₂SO₄?', 'Hydrogen sulphide (rotten-egg smell).', 'fact', 2),
    fc(14, 'Why does marble stop fizzing in dil. H₂SO₄?', 'Insoluble CaSO₄ coats the chips.', 'concept', 2),
    fc(15, 'Does copper react with dil. H₂SO₄?', 'No: copper is below hydrogen.', 'fact', 2),
    fc(16, 'C + hot conc. H₂SO₄?', 'C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂.', 'formula', 3),
    fc(17, 'S + hot conc. H₂SO₄?', 'S + 2H₂SO₄ → 3SO₂ + 2H₂O.', 'formula', 3),
    fc(18, 'What is conc. H₂SO₄ reduced to when it oxidises?', 'Sulphur dioxide.', 'fact', 3),
    fc(19, 'Conc. H₂SO₄ on sugar?', 'Black spongy carbon, steam, heat: C₁₂H₂₂O₁₁ → 12C + 11H₂O.', 'formula', 4),
    fc(20, 'Conc. H₂SO₄ on blue vitriol?', 'Blue crystals turn white (water of crystallisation removed).', 'fact', 4),
    fc(21, 'Dehydration?', 'Removing the elements of water (H : O = 2 : 1) from a compound.', 'definition', 4),
    fc(22, 'Drying?', 'Removing moisture merely present, without changing the substance.', 'definition', 4),
    fc(23, 'Two gases conc. H₂SO₄ cannot dry?', 'Ammonia and hydrogen sulphide.', 'fact', 4),
    fc(24, 'Why can’t it dry ammonia?', 'It reacts: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄.', 'concept', 4),
    fc(25, 'Why is H₂SO₄ non-volatile?', 'High boiling point (about 338 °C).', 'concept', 5),
    fc(26, 'NaCl + conc. H₂SO₄ below 200 °C?', 'NaCl + H₂SO₄ → NaHSO₄ + HCl.', 'formula', 5),
    fc(27, 'Test for a sulphate?', 'BaCl₂ solution: white precipitate insoluble in dilute HCl.', 'fact', 5),
    fc(28, 'BaCl₂ + H₂SO₄?', 'BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl.', 'formula', 5),
    fc(29, 'Lead nitrate + H₂SO₄?', 'White precipitate of PbSO₄.', 'fact', 5),
    fc(30, 'Exam tip: catalysts', 'Contact: V₂O₅. Ostwald: Pt. Haber: Fe.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
