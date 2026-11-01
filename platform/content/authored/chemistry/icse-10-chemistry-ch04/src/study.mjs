// ICSE 10 Chemistry ch04 Analytical Chemistry — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Analytical Chemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Colours of salts and their solutions',
      `**Qualitative analysis** identifies the ions in a substance from observations such as colour and precipitates.

- **White solids, colourless solutions:** salts of Na⁺, K⁺, Ca²⁺, NH₄⁺, Zn²⁺ and Pb²⁺.
- **Copper(II):** hydrated CuSO₄ blue crystals, blue solution; CuCl₂ green to blue-green; CuO black; CuCO₃ green.
- **Iron(II):** FeSO₄·7H₂O pale green crystals, pale green solution.
- **Iron(III):** FeCl₃ yellowish-brown solid and solution; Fe₂O₃ reddish brown.
- **Zinc and lead oxides:** ZnO white (yellow when hot); PbO yellow; Pb₃O₄ bright red; PbO₂ dark brown.`,
      [kt('Qualitative analysis', 'Finding out which ions or substances are present, without measuring how much.'), kt('Precipitate', 'An insoluble solid that forms when two solutions are mixed.')],
      [],
      table(['Ion', 'Typical colour of its solution'], [['Cu²⁺', 'Blue'], ['Fe²⁺', 'Pale green'], ['Fe³⁺', 'Yellowish brown'], ['Zn²⁺, Pb²⁺, Ca²⁺, NH₄⁺', 'Colourless']], 'Table of four groups of ions and the colours of their solutions'),
      [1],
    ),
    sec(
      '2. Sodium hydroxide: coloured precipitates',
      `Sodium hydroxide supplies OH⁻ ions; insoluble metal hydroxides precipitate. Add it **drop by drop**, then **in excess**.

- **Fe²⁺:** dirty green Fe(OH)₂, insoluble in excess (turns brown on standing in air: oxidised to Fe(OH)₃).
- **Fe³⁺:** reddish-brown Fe(OH)₃, insoluble in excess.
- **Cu²⁺:** pale blue Cu(OH)₂, insoluble in excess.
- **Ca²⁺:** white Ca(OH)₂ (sparingly soluble), insoluble in excess.`,
      [kt('Drop by drop', 'Adding a reagent a little at a time so that the first change can be seen before an excess is present.')],
      [fm(r`\ce{FeSO4 + 2NaOH -> Fe(OH)2 + Na2SO4}`, 'Dirty green precipitate'), fm(r`\ce{FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl}`, 'Reddish-brown precipitate'), fm(r`\ce{CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4}`, 'Pale blue precipitate')],
      table(['Cation', 'Precipitate', 'Colour', 'Excess NaOH'], [['Fe²⁺', 'Fe(OH)₂', 'Dirty green', 'Insoluble'], ['Fe³⁺', 'Fe(OH)₃', 'Reddish brown', 'Insoluble'], ['Cu²⁺', 'Cu(OH)₂', 'Pale blue', 'Insoluble'], ['Ca²⁺', 'Ca(OH)₂', 'White', 'Insoluble']], 'Table of precipitates formed by sodium hydroxide with four cations and their behaviour in excess'),
      [2],
    ),
    sec(
      '3. Sodium hydroxide: zinc and lead',
      `Zinc and lead salts give **white** precipitates that **dissolve in excess** NaOH, because their hydroxides are amphoteric.

- **Zn²⁺:** white gelatinous Zn(OH)₂ → dissolves to **sodium zincate**, Na₂ZnO₂ (colourless solution).
- **Pb²⁺:** white chalky Pb(OH)₂ → dissolves to **sodium plumbite**, Na₂PbO₂ (colourless solution).`,
      [kt('Sodium zincate', 'Na₂ZnO₂, the soluble salt formed when zinc, its oxide or its hydroxide reacts with sodium hydroxide.'), kt('Sodium plumbite', 'Na₂PbO₂, the soluble salt formed when lead, lead(II) oxide or lead(II) hydroxide reacts with sodium hydroxide.')],
      [fm(r`\ce{ZnSO4 + 2NaOH -> Zn(OH)2 + Na2SO4}`, 'A few drops'), fm(r`\ce{Zn(OH)2 + 2NaOH -> Na2ZnO2 + 2H2O}`, 'Excess: sodium zincate'), fm(r`\ce{Pb(NO3)2 + 2NaOH -> Pb(OH)2 + 2NaNO3}`, 'A few drops'), fm(r`\ce{Pb(OH)2 + 2NaOH -> Na2PbO2 + 2H2O}`, 'Excess: sodium plumbite')],
      table(['Cation', 'A few drops of NaOH', 'Excess NaOH'], [['Zn²⁺', 'White, gelatinous', 'Dissolves (sodium zincate)'], ['Pb²⁺', 'White, chalky', 'Dissolves (sodium plumbite)']], 'Table of zinc and lead ions with a little and excess sodium hydroxide'),
      [2, 5],
    ),
    sec(
      '4. Ammonium hydroxide, a few drops and in excess',
      `A few drops of NH₄OH give the **same precipitates** as NaOH (an ammonium salt stays in solution). In **excess**:

- **Cu(OH)₂ dissolves** → **deep (inky) blue** solution of tetraamminecopper(II) sulphate, [Cu(NH₃)₄]SO₄.
- **Zn(OH)₂ dissolves** → **colourless** solution of tetraamminezinc(II) sulphate, [Zn(NH₃)₄]SO₄.
- **Pb(OH)₂, Fe(OH)₂, Fe(OH)₃ do not dissolve.**

Plain-text equation for copper in excess: Cu(OH)₂ + (NH₄)₂SO₄ + 2NH₄OH → [Cu(NH₃)₄]SO₄ + 4H₂O (zinc follows the same pattern).`,
      [kt('Ammonium hydroxide', 'A solution of ammonia in water; a weak alkali.'), kt('Tetraamminecopper(II) sulphate', 'The deep blue soluble complex salt formed when copper(II) hydroxide dissolves in excess ammonium hydroxide.')],
      [fm(r`\ce{FeSO4 + 2NH4OH -> Fe(OH)2 + (NH4)2SO4}`, 'Dirty green precipitate'), fm(r`\ce{Pb(NO3)2 + 2NH4OH -> Pb(OH)2 + 2NH4NO3}`, 'White precipitate, insoluble in excess'), fm(r`\ce{Zn(NO3)2 + 2NH4OH -> Zn(OH)2 + 2NH4NO3}`, 'White precipitate, soluble in excess')],
      table(['Cation', 'Excess NaOH', 'Excess NH₄OH'], [['Fe²⁺, Fe³⁺', 'Precipitate stays', 'Precipitate stays'], ['Cu²⁺', 'Precipitate stays', 'Deep blue solution'], ['Zn²⁺', 'Dissolves', 'Dissolves'], ['Pb²⁺', 'Dissolves', 'Precipitate stays']], 'Table comparing the behaviour of five cations in excess sodium hydroxide and excess ammonium hydroxide'),
      [3],
    ),
    sec(
      '5. Sodium hydroxide and ammonium salts',
      `Any **ammonium salt warmed with an alkali** gives **ammonia**: the stronger base drives out the weaker one.

**Identifying ammonia:** pungent smell; turns **moist red litmus blue**; gives **dense white fumes** of NH₄Cl with a rod dipped in concentrated HCl (NH₃ + HCl → NH₄Cl).`,
      [kt('Test for the ammonium ion', 'Warm the substance with sodium hydroxide solution: ammonia is given off, which turns moist red litmus paper blue.')],
      [fm(r`\ce{NH4Cl + NaOH -> NaCl + H2O + NH3}`, 'Ammonium chloride, warmed'), fm(r`\ce{(NH4)2SO4 + 2NaOH -> Na2SO4 + 2H2O + 2NH3}`, 'Ammonium sulphate, warmed'), fm(r`\ce{NH4NO3 + NaOH -> NaNO3 + H2O + NH3}`, 'Ammonium nitrate, warmed')],
      table(['Test on the gas', 'Observation for ammonia'], [['Smell (waft gently)', 'Sharp, pungent'], ['Moist red litmus', 'Turns blue'], ['Rod dipped in conc. HCl', 'Dense white fumes']], 'Table of three tests that identify ammonia'),
      [4],
    ),
    sec(
      '6. Amphoteric nature of aluminium, zinc and lead',
      `**Amphoteric:** reacts with **both acids and bases** to form a salt and water. Examples: Al₂O₃, ZnO, PbO and Al(OH)₃, Zn(OH)₂, Pb(OH)₂.

- **Metals with hot concentrated NaOH** give **hydrogen**: aluminium (with water) → sodium aluminate; zinc → sodium zincate; lead → sodium plumbite.
- **Oxides and hydroxides with NaOH** give the same salts and **water** (no hydrogen).
- With KOH the products are potassium aluminate, zincate and plumbite.`,
      [kt('Amphoteric substance', 'A substance that reacts with both acids and bases to form a salt and water.'), kt('Sodium aluminate', 'NaAlO₂, the soluble salt formed when aluminium, its oxide or its hydroxide reacts with sodium hydroxide.')],
      [fm(r`\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}`, 'Aluminium with hot NaOH'), fm(r`\ce{Zn + 2NaOH -> Na2ZnO2 + H2}`, 'Zinc with hot NaOH'), fm(r`\ce{Pb + 2NaOH -> Na2PbO2 + H2}`, 'Lead with hot NaOH'), fm(r`\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}`, 'Aluminium oxide'), fm(r`\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}`, 'Zinc oxide'), fm(r`\ce{PbO + 2NaOH -> Na2PbO2 + H2O}`, 'Lead(II) oxide'), fm(r`\ce{Al(OH)3 + NaOH -> NaAlO2 + 2H2O}`, 'Aluminium hydroxide')],
      table(['Reactant with NaOH', 'Salt', 'Other product'], [['Al (with water)', 'Sodium aluminate, NaAlO₂', 'Hydrogen'], ['Zn', 'Sodium zincate, Na₂ZnO₂', 'Hydrogen'], ['Pb', 'Sodium plumbite, Na₂PbO₂', 'Hydrogen'], ['Oxide or hydroxide', 'Same salt', 'Water']], 'Table of the products when aluminium, zinc, lead and their oxides or hydroxides react with sodium hydroxide'),
      [5],
    ),
    sec(
      '7. Telling solutions apart',
      `Choose a reagent that gives a **different observation for each member** of the pair:

| Pair | Reagent | Observations |
|---|---|---|
| Fe²⁺ / Fe³⁺ | NaOH | dirty green / reddish brown |
| Zn²⁺ / Pb²⁺ | excess NH₄OH | precipitate dissolves / stays |
| Zn²⁺ / Ca²⁺ | excess NaOH | precipitate dissolves / stays |
| Cu²⁺ / Fe²⁺ | excess NH₄OH | deep blue solution / dirty green precipitate stays |
| NH₄⁺ / Na⁺ | NaOH, warm | ammonia evolved / no gas |`,
      [kt('Distinguishing test', 'A single test whose observation differs for the two substances being compared.')],
      [],
      table(['Step', 'Observation', 'Conclusion'], [['A few drops of NaOH', 'Coloured precipitate', 'Fe²⁺, Fe³⁺ or Cu²⁺ by colour'], ['Excess NaOH', 'White precipitate dissolves', 'Zn²⁺ or Pb²⁺'], ['Excess NH₄OH', 'White precipitate dissolves', 'Zn²⁺'], ['Excess NH₄OH', 'White precipitate stays', 'Pb²⁺']], 'Table of a sequence of tests for identifying a cation'),
      [2, 3, 4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Swapping the colours of Fe(OH)₂ (dirty green) and Fe(OH)₃ (reddish brown).
- Saying Cu(OH)₂ dissolves in excess NaOH (it dissolves in excess NH₄OH).
- Using excess NaOH to tell zinc from lead (it dissolves both).
- Leaving water out of the aluminium–NaOH equation.

**How marks are usually awarded**
- Observation questions (1 mark each): colour **and** behaviour in excess where asked.
- Equations (1 mark): correct formulae and balancing; name the salt (zincate, plumbite, aluminate) if asked.
- Distinguish questions (2 marks): one reagent, one observation for each substance.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Qualitative analysis?', 'Identifying which ions or substances are present.', 'definition', 1),
    fc(2, 'Colour of iron(II) sulphate solution?', 'Pale green.', 'fact', 1),
    fc(3, 'Colour of iron(III) chloride solution?', 'Yellowish brown.', 'fact', 1),
    fc(4, 'Colour of a copper(II) sulphate solution?', 'Blue.', 'fact', 1),
    fc(5, 'Colour of zinc oxide, cold and hot?', 'White when cold, yellow when hot.', 'fact', 1),
    fc(6, 'Colour of red lead, Pb₃O₄?', 'Bright red.', 'fact', 1),
    fc(7, 'Which salts give colourless solutions?', 'Salts of Na, K, Ca, NH₄, Zn and Pb.', 'fact', 1),
    fc(8, 'Precipitate from Fe²⁺ with NaOH?', 'Dirty green Fe(OH)₂, insoluble in excess.', 'fact', 2),
    fc(9, 'Precipitate from Fe³⁺ with NaOH?', 'Reddish-brown Fe(OH)₃, insoluble in excess.', 'fact', 2),
    fc(10, 'Precipitate from Cu²⁺ with NaOH?', 'Pale blue Cu(OH)₂, insoluble in excess.', 'fact', 2),
    fc(11, 'FeCl₃ + NaOH equation?', 'FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl.', 'formula', 2),
    fc(12, 'Zn²⁺ with NaOH, a few drops then excess?', 'White gelatinous precipitate; dissolves in excess.', 'fact', 2),
    fc(13, 'Pb²⁺ with NaOH, a few drops then excess?', 'White chalky precipitate; dissolves in excess.', 'fact', 2),
    fc(14, 'Zn(OH)₂ + excess NaOH?', 'Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O (sodium zincate).', 'formula', 2),
    fc(15, 'Why does Fe(OH)₂ turn brown in air?', 'It is oxidised to Fe(OH)₃.', 'concept', 2),
    fc(16, 'Cu²⁺ with excess NH₄OH?', 'Pale blue precipitate dissolves to a deep (inky) blue solution.', 'fact', 3),
    fc(17, 'Name of the deep blue compound?', 'Tetraamminecopper(II) sulphate, [Cu(NH₃)₄]SO₄.', 'fact', 3),
    fc(18, 'Zn²⁺ with excess NH₄OH?', 'White precipitate dissolves; colourless solution.', 'fact', 3),
    fc(19, 'Pb²⁺ with excess NH₄OH?', 'White precipitate stays (insoluble).', 'fact', 3),
    fc(20, 'Reagent to tell Zn²⁺ from Pb²⁺?', 'Excess ammonium hydroxide.', 'exam-tip', 3),
    fc(21, 'Ammonium salt warmed with NaOH gives?', 'Ammonia gas.', 'fact', 4),
    fc(22, 'NH₄Cl + NaOH (warm)?', 'NH₄Cl + NaOH → NaCl + H₂O + NH₃.', 'formula', 4),
    fc(23, 'Two tests for ammonia?', 'Moist red litmus turns blue; dense white fumes with conc. HCl.', 'fact', 4),
    fc(24, 'Amphoteric substance?', 'Reacts with both acids and bases to form a salt and water.', 'definition', 5),
    fc(25, 'Three amphoteric oxides?', 'Al₂O₃, ZnO, PbO.', 'example', 5),
    fc(26, 'Al with NaOH solution?', '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.', 'formula', 5),
    fc(27, 'Salt from lead and NaOH?', 'Sodium plumbite, Na₂PbO₂.', 'fact', 5),
    fc(28, 'Gas from Zn and hot NaOH?', 'Hydrogen (Zn + 2NaOH → Na₂ZnO₂ + H₂).', 'formula', 5),
    fc(29, 'Oxide + NaOH: hydrogen or water?', 'Water (only the metals give hydrogen).', 'concept', 5),
    fc(30, 'Diagram: what the test-tube row shows', 'Fe²⁺ green, Fe³⁺ brown, Cu²⁺ blue, Zn²⁺ and Pb²⁺ white; only Zn and Pb dissolve in excess NaOH.', 'diagram', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
