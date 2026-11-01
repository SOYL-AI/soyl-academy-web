// ICSE 10 Chemistry ch10 Study of Compounds: Ammonia — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Study of Compounds: Ammonia — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Laboratory preparation',
      `**Reactants:** ammonium chloride and slaked lime (calcium hydroxide), heated.

- **Flask** clamped **slanting**, mouth slightly lower, so the water formed does not run back onto the hot glass.
- **Drying agent:** **quicklime** (CaO). Not concentrated H₂SO₄ or P₂O₅ (acidic, react with ammonia), not anhydrous CaCl₂ (forms CaCl₂·8NH₃).
- **Collection:** **downward displacement of air** in an inverted jar (lighter than air; extremely soluble, so not over water).
- **Jar full?** Moist red litmus turns blue at the mouth; a rod dipped in conc. HCl gives dense white fumes.`,
      [kt('Downward displacement of air', 'Collection of a gas lighter than air in an inverted jar: the gas rises and pushes the air down and out.'), kt('Slaked lime', 'Calcium hydroxide, Ca(OH)₂.')],
      [fm(r`\ce{2NH4Cl + Ca(OH)2 -> CaCl2 + 2H2O + 2NH3}`, 'Laboratory preparation (heat)'), fm(r`\ce{2NH3 + H2SO4 -> (NH4)2SO4}`, 'Why sulphuric acid cannot dry ammonia')],
      table(['Drying agent', 'Suitable?', 'Reason'], [['Quicklime', 'Yes', 'Basic, does not react'], ['Conc. H₂SO₄', 'No', 'Forms (NH₄)₂SO₄'], ['P₂O₅', 'No', 'Acidic; reacts'], ['Anhydrous CaCl₂', 'No', 'Forms CaCl₂·8NH₃']], 'Table of drying agents for ammonia with reasons'),
      [1],
    ),
    sec(
      '2. Ammonia from nitrides and ammonium salts',
      `- **Metal nitrides + warm water** → metal hydroxide + ammonia.
- **Any ammonium salt + alkali, warmed** → salt + water + ammonia (a test for ammonium ions).`,
      [kt('Nitride', 'A compound of a metal with nitrogen only, such as Mg₃N₂ or AlN.')],
      [fm(r`\ce{Mg3N2 + 6H2O -> 3Mg(OH)2 + 2NH3}`, 'Magnesium nitride'), fm(r`\ce{AlN + 3H2O -> Al(OH)3 + NH3}`, 'Aluminium nitride'), fm(r`\ce{(NH4)2SO4 + 2NaOH -> Na2SO4 + 2H2O + 2NH3}`, 'Ammonium salt with alkali'), fm(r`\ce{NH4NO3 + KOH -> KNO3 + H2O + NH3}`, 'Ammonium salt with alkali')],
      table(['Source', 'Condition', 'Other product'], [['Mg₃N₂', 'Warm water', 'Mg(OH)₂'], ['AlN', 'Warm water', 'Al(OH)₃'], ['(NH₄)₂SO₄', 'Warm with NaOH', 'Na₂SO₄ + H₂O']], 'Table of other sources of ammonia, the conditions and the other products'),
      [2],
    ),
    sec(
      '3. Manufacture: Haber’s process',
      `- **Raw materials:** nitrogen (from liquid air) and hydrogen, **1 : 3 by volume**.
- **Conditions:** **450–500 °C**, **200–900 atm**, catalyst **finely divided iron**, promoter **molybdenum**.
- The reaction is **reversible** and **exothermic**; high pressure favours ammonia (4 volumes → 2 volumes).
- **Separation:** the gases are cooled; ammonia **liquefies** and is drawn off. **Unreacted N₂ and H₂ are recycled.**`,
      [kt('Catalyst', 'A substance that changes the rate of a reaction without itself being used up.'), kt('Promoter', 'A substance that increases the efficiency of a catalyst (molybdenum in Haber’s process).')],
      [fm(r`\ce{N2 + 3H2 <=> 2NH3}`, 'Iron catalyst, molybdenum promoter, 450–500 °C, 200–900 atm')],
      table(['Condition', 'Value'], [['N₂ : H₂', '1 : 3 by volume'], ['Temperature', '450–500 °C'], ['Pressure', '200–900 atm'], ['Catalyst', 'Finely divided iron'], ['Promoter', 'Molybdenum']], 'Table of the conditions of Haber’s process'),
      [3],
    ),
    sec(
      '4. Physical properties; burning and catalytic oxidation',
      `- **Lighter than air** (vapour density 8.5); **extremely soluble** in water. **Fountain experiment:** red litmus → **blue** fountain (phenolphthalein → **pink**): very soluble, alkaline solution.
- **Burning:** does not burn in air or support combustion; burns in **oxygen** with a **greenish-yellow flame**, giving nitrogen.
- **Catalytic oxidation:** over **platinum at about 800 °C**, giving **nitric oxide**; exothermic, so the platinum keeps glowing. In air, 2NO + O₂ → 2NO₂ (reddish-brown).`,
      [kt('Catalytic oxidation of ammonia', 'Oxidation of ammonia by oxygen over hot platinum to nitric oxide and water; the first step of Ostwald’s process.')],
      [fm(r`\ce{4NH3 + 3O2 -> 2N2 + 6H2O}`, 'Burning in oxygen'), fm(r`\ce{4NH3 + 5O2 -> 4NO + 6H2O}`, 'Catalytic oxidation: Pt, about 800 °C'), fm(r`\ce{2NO + O2 -> 2NO2}`, 'Reddish-brown fumes')],
      table(['Feature', 'Burning', 'Catalytic oxidation'], [['Condition', 'Lit in oxygen', 'Pt, about 800 °C'], ['Nitrogen product', 'N₂', 'NO'], ['Sign', 'Greenish-yellow flame', 'Pt glows; brown fumes in air']], 'Table comparing burning and catalytic oxidation of ammonia'),
      [4],
    ),
    sec(
      '5. Reducing nature; reactions with chlorine and hydrogen chloride',
      `- **Hot metal oxides** are reduced to the metal; ammonia is oxidised to nitrogen. Copper(II) oxide: black → reddish-brown, with water droplets. Lead(II) and lead(IV) oxides give grey lead.
- **Chlorine:** with **excess ammonia** → NH₄Cl (white fumes) + N₂; with **excess chlorine** → NCl₃ (yellow, explosive) + HCl.
- **Hydrogen chloride:** dense white fumes of NH₄Cl.`,
      [kt('Reducing agent', 'A substance that removes oxygen from another substance (or gives electrons), being itself oxidised.'), kt('Nitrogen trichloride', 'NCl₃, a yellow, highly explosive oily liquid formed by ammonia with excess chlorine.')],
      [fm(r`\ce{3CuO + 2NH3 -> 3Cu + 3H2O + N2}`, 'Copper(II) oxide'), fm(r`\ce{3PbO + 2NH3 -> 3Pb + 3H2O + N2}`, 'Lead(II) oxide'), fm(r`\ce{3PbO2 + 4NH3 -> 3Pb + 6H2O + 2N2}`, 'Lead(IV) oxide'), fm(r`\ce{8NH3 + 3Cl2 -> 6NH4Cl + N2}`, 'Excess ammonia'), fm(r`\ce{NH3 + 3Cl2 -> NCl3 + 3HCl}`, 'Excess chlorine')],
      table(['Reagent', 'Product with ammonia'], [['Hot CuO', 'Cu, H₂O, N₂'], ['Cl₂ (NH₃ in excess)', 'NH₄Cl, N₂'], ['Cl₂ in excess', 'NCl₃, HCl'], ['HCl', 'NH₄Cl']], 'Table of reagents and the products they give with ammonia'),
      [5],
    ),
    sec(
      '6. Aqueous ammonia',
      `Ammonia dissolves to give **ammonium hydroxide**, a **weak alkali**. It neutralises acids and precipitates metal hydroxides:

| Solution | Precipitate | Excess NH₄OH |
|---|---|---|
| FeCl₃ | Reddish-brown Fe(OH)₃ | Insoluble |
| FeSO₄ | Dirty green Fe(OH)₂ | Insoluble |
| Pb(NO₃)₂ | Chalky white Pb(OH)₂ | Insoluble |
| Zn(NO₃)₂ | White gelatinous Zn(OH)₂ | Dissolves (colourless) |
| CuSO₄ | Pale blue Cu(OH)₂ | Dissolves (deep blue) |`,
      [kt('Ammonium hydroxide', 'The weak alkali formed when ammonia dissolves in water, NH₄OH.')],
      [fm(r`\ce{2NH4OH + H2SO4 -> (NH4)2SO4 + 2H2O}`, 'Neutralisation'), fm(r`\ce{FeCl3 + 3NH4OH -> Fe(OH)3 + 3NH4Cl}`, 'Reddish-brown precipitate'), fm(r`\ce{FeSO4 + 2NH4OH -> Fe(OH)2 + (NH4)2SO4}`, 'Dirty green precipitate'), fm(r`\ce{CuSO4 + 2NH4OH -> Cu(OH)2 + (NH4)2SO4}`, 'Pale blue precipitate')],
      table(['Ion', 'Identified by'], [['Fe³⁺', 'Reddish-brown precipitate'], ['Fe²⁺', 'Dirty green precipitate'], ['Zn²⁺', 'White, soluble in excess'], ['Pb²⁺', 'White, insoluble in excess'], ['Cu²⁺', 'Deep blue solution in excess']], 'Table of metal ions identified with ammonium hydroxide'),
      [6],
    ),
    sec(
      '7. Uses, refrigerants and tests',
      `- **Uses:** fertilisers (urea, ammonium sulphate, nitrate, phosphate); nitric acid (Ostwald’s process); explosives; refrigerant in ice plants and cold stores (high latent heat of vaporisation); cleansing agent (removes grease).
- **Refrigerants:** CFCs release chlorine in the upper atmosphere that **destroys the ozone layer**; they are replaced by **non-ozone-depleting** refrigerants (HFCs, hydrocarbons, ammonia).
- **Tests:** pungent smell; moist red litmus turns blue; dense white fumes with a rod dipped in conc. HCl; with copper sulphate solution, a deep blue solution in excess.`,
      [kt('CFCs', 'Chlorofluorocarbons: older refrigerants that release chlorine in the upper atmosphere and deplete the ozone layer.')],
      [],
      table(['Test', 'Result'], [['Moist red litmus', 'Turns blue'], ['Rod dipped in conc. HCl', 'Dense white fumes'], ['CuSO₄ solution', 'Pale blue precipitate, then deep blue solution']], 'Table of tests for ammonia'),
      [7],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Naming concentrated sulphuric acid or calcium chloride as the drying agent for ammonia.
- Writing "upward displacement" for ammonia (it is downward).
- Mixing up the catalysts: iron (Haber) and platinum (catalytic oxidation).
- Saying burning in oxygen gives nitric oxide (it gives nitrogen).
- Saying lead hydroxide dissolves in excess ammonium hydroxide (only zinc and copper hydroxides do).

**How marks are usually awarded**
- Equations (1 mark): balanced, with conditions (Pt, 800 °C; iron, 450–500 °C, 200–900 atm) where asked.
- Observations (1 mark): colour of precipitate or solid, and its behaviour in excess.
- Reasons (1 mark): drying agent, method of collection, slanting flask.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Lab preparation of ammonia?', '2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃ (heat).', 'formula', 1),
    fc(2, 'Drying agent for ammonia?', 'Quicklime (CaO).', 'fact', 1),
    fc(3, 'Why not anhydrous CaCl₂?', 'It forms CaCl₂·8NH₃ with ammonia.', 'concept', 1),
    fc(4, 'How is ammonia collected?', 'Downward displacement of air (inverted jar).', 'fact', 1),
    fc(5, 'Why is the flask tilted?', 'Water formed must not run onto the hot glass and crack it.', 'diagram', 1),
    fc(6, 'Mg₃N₂ + warm water?', 'Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃.', 'formula', 2),
    fc(7, 'AlN + warm water?', 'AlN + 3H₂O → Al(OH)₃ + NH₃.', 'formula', 2),
    fc(8, 'Ammonium salt + alkali?', 'Gives ammonia on warming (test for NH₄⁺).', 'concept', 2),
    fc(9, 'Haber equation?', 'N₂ + 3H₂ ⇌ 2NH₃ (exothermic).', 'formula', 3),
    fc(10, 'Haber catalyst and promoter?', 'Finely divided iron; molybdenum.', 'fact', 3),
    fc(11, 'Haber temperature and pressure?', '450–500 °C; 200–900 atm.', 'fact', 3),
    fc(12, 'How is ammonia separated in Haber’s process?', 'Cooling liquefies it; unreacted gases recycled.', 'concept', 3),
    fc(13, 'Why does high pressure help?', '4 volumes of reactants give 2 volumes of ammonia.', 'concept', 3),
    fc(14, 'Vapour density of ammonia?', '8.5 (lighter than air).', 'fact', 4),
    fc(15, 'Fountain colour with red litmus?', 'Blue.', 'diagram', 4),
    fc(16, 'Flame when ammonia burns in oxygen?', 'Greenish-yellow; products N₂ and H₂O.', 'fact', 4),
    fc(17, 'Catalytic oxidation?', '4NH₃ + 5O₂ → 4NO + 6H₂O (Pt, about 800 °C).', 'formula', 4),
    fc(18, 'Why does the Pt coil keep glowing?', 'The oxidation is exothermic.', 'concept', 4),
    fc(19, 'NH₃ over hot CuO?', '3CuO + 2NH₃ → 3Cu + 3H₂O + N₂ (black → reddish-brown).', 'formula', 5),
    fc(20, 'Excess NH₃ + Cl₂?', '8NH₃ + 3Cl₂ → 6NH₄Cl + N₂ (white fumes).', 'formula', 5),
    fc(21, 'NH₃ + excess Cl₂?', 'NH₃ + 3Cl₂ → NCl₃ + 3HCl (explosive NCl₃).', 'formula', 5),
    fc(22, 'Role of ammonia with hot CuO?', 'Reducing agent.', 'concept', 5),
    fc(23, 'Fe³⁺ with NH₄OH?', 'Reddish-brown precipitate, insoluble in excess.', 'fact', 6),
    fc(24, 'Fe²⁺ with NH₄OH?', 'Dirty green precipitate, insoluble in excess.', 'fact', 6),
    fc(25, 'Zn²⁺ with NH₄OH?', 'White gelatinous precipitate, soluble in excess.', 'fact', 6),
    fc(26, 'Cu²⁺ with excess NH₄OH?', 'Pale blue precipitate dissolves to a deep blue solution.', 'example', 6),
    fc(27, 'Two uses of ammonia?', 'Fertilisers; nitric acid (also refrigerant, cleaning).', 'fact', 7),
    fc(28, 'Why replace CFCs?', 'They release chlorine that destroys the ozone layer.', 'concept', 7),
    fc(29, 'Two tests for ammonia?', 'Moist red litmus turns blue; white fumes with conc. HCl.', 'fact', 7),
    fc(30, 'Exam tip: catalysts', 'Haber: iron (Mo promoter). Oxidation of NH₃: platinum.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
