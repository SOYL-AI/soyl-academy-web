// ISC 12 Chemistry ch09 Potassium Permanganate and Potassium Dichromate — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Potassium Permanganate and Potassium Dichromate — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Potassium permanganate: structure and preparation',
      r`Dark purple crystals; Mn **+7** (3d⁰), diamagnetic; colour by **charge transfer**. $\ce{MnO4-}$ is **tetrahedral**; manganate $\ce{MnO4^2-}$ (Mn +6, d¹, green, paramagnetic) is also tetrahedral. Decomposes at 513 K: $\ce{2KMnO4 -> K2MnO4 + MnO2 + O2}$.

**Preparation from pyrolusite:** (1) fuse $\ce{MnO2}$ with KOH and air (or KNO₃) → green $\ce{K2MnO4}$; (2) oxidise manganate electrolytically (industry), or with Cl₂/O₃, or let it disproportionate in neutral/acid solution: $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$.`,
      [kt('Charge transfer', 'Movement of an electron from ligand (oxygen) to metal on absorbing light; causes the colour of d⁰ ions such as MnO₄⁻.'), kt('Disproportionation', 'A reaction in which the same species is both oxidised and reduced.')],
      [fm(r`\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}`, 'Fusion of pyrolusite')],
      V.manganate,
      [1],
    ),
    sec(
      '2. Oxidising action of KMnO₄ and titrations',
      r`**Acid (dil. H₂SO₄):** $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ — oxidises Fe²⁺ (1 : 5), oxalic acid (2 : 5, warm), I⁻ → I₂.
**Basic, with KI:** $\ce{2MnO4- + I- + H2O -> 2MnO2 + IO3- + 2OH-}$.
**Neutral, with H₂S:** $\ce{2MnO4- + 3H2S -> 2MnO2 + 3S + 2OH- + 2H2O}$.

**Titrations:** self-indicator (end point = first permanent pale pink); dilute H₂SO₄ only (HCl is oxidised to Cl₂; HNO₃ is an oxidant); oxalic acid titrations warm, Mn²⁺ autocatalyses; KMnO₄ is not a primary standard. Equivalent mass in acid = M/5 = 31.6.`,
      [kt('Self-indicator', 'A titrant whose own colour change shows the end point, so no separate indicator is needed.'), kt('Autocatalysis', 'Catalysis of a reaction by one of its own products (Mn²⁺ in the permanganate–oxalate reaction).')],
      [fm(r`\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}`, 'Acidic medium'), fm(r`\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}`, 'Neutral/alkaline medium')],
      table(['Medium', 'e⁻ gained', 'Product'], [['Acidic', '5', 'Mn²⁺'], ['Neutral/faintly alkaline', '3', 'MnO₂'], ['Strongly alkaline', '1', 'MnO₄²⁻']], 'Table of permanganate in different media'),
      [2],
    ),
    sec(
      '3. Potassium dichromate: structure and preparation',
      r`Orange crystals; Cr **+6**. $\ce{CrO4^2-}$ tetrahedral; $\ce{Cr2O7^2-}$ = two tetrahedra sharing one O (Cr–O–Cr ≈ 126°).

**From chromite** ($\ce{FeCr2O4}$, Cr +3):
1. Roast with Na₂CO₃ in air: $\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}$ (Cr oxidised to +6).
2. Acidify: $\ce{2Na2CrO4 + H2SO4 -> Na2Cr2O7 + Na2SO4 + H2O}$.
3. Add KCl: $\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}$ (K salt less soluble).`,
      [kt('Chromite', 'The ore FeCr₂O₄, in which chromium is +3.')],
      [],
      V.chromate,
      [3],
    ),
    sec(
      '4. Oxidising action of K₂Cr₂O₇; chromate ⇌ dichromate',
      r`**Acid:** $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$ (orange → green; $E^\circ = +1.33$ V). Oxidises Fe²⁺ (1 : 6), I⁻ → I₂, SO₂ → SO₄²⁻, H₂S → S, ethanol → ethanal.

**pH:** $\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$ — acid gives orange dichromate, alkali gives yellow chromate; Cr stays +6 (not redox).

**Titrations:** primary standard (pure, non-hygroscopic, stable solutions); internal indicator diphenylamine; HCl may be used. Equivalent mass = M/6 = 49.`,
      [kt('Primary standard', 'A substance pure and stable enough for a standard solution to be made by direct weighing.')],
      [fm(r`\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}`, 'Dichromate in acid'), fm(r`\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}`, 'Chromate–dichromate equilibrium')],
      table(['Feature', 'KMnO₄', 'K₂Cr₂O₇'], [['Primary standard', 'No', 'Yes'], ['Indicator', 'Self', 'Diphenylamine'], ['e⁻ per ion (acid)', '5', '6']], 'Table comparing the two titrants'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using HCl to acidify permanganate titrations.
- Giving Mn²⁺ as the product in neutral medium (it is MnO₂).
- Treating chromate ⇌ dichromate as a redox change.
- Wrong mole ratios: use 1 : 5 (MnO₄⁻ : Fe²⁺), 2 : 5 (MnO₄⁻ : H₂C₂O₄), 1 : 6 (Cr₂O₇²⁻ : Fe²⁺).

**How marks are usually awarded**
- Preparation (3 marks): one balanced equation per step with conditions.
- Ionic equations (1 mark each): atoms and charge balanced.
- Titration numericals (2–3 marks): moles, ratio, answer with unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Ore used to make KMnO₄?', 'Pyrolusite, MnO₂.', 'fact', 1),
    fc(2, 'Shape of MnO₄⁻?', 'Tetrahedral.', 'fact', 1),
    fc(3, 'Oxidation state of Mn in K₂MnO₄?', '+6.', 'fact', 1),
    fc(4, 'Colour of K₂MnO₄?', 'Dark green.', 'fact', 1),
    fc(5, 'Why is MnO₄⁻ purple though d⁰?', 'Charge transfer from O to Mn.', 'concept', 1),
    fc(6, 'Industrial conversion of manganate to permanganate?', 'Electrolytic oxidation in alkaline solution.', 'fact', 1),
    fc(7, 'KMnO₄ on heating at 513 K?', 'K₂MnO₄ + MnO₂ + O₂.', 'fact', 1),
    fc(8, 'Permanganate half-equation in acid?', 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O.', 'formula', 2),
    fc(9, 'Product of MnO₄⁻ in neutral medium?', 'MnO₂ (3 e⁻ gained).', 'fact', 2),
    fc(10, 'KI with alkaline KMnO₄ gives?', 'Iodate, IO₃⁻.', 'fact', 2),
    fc(11, 'H₂S with neutral KMnO₄ gives?', 'Sulphur (and MnO₂).', 'fact', 2),
    fc(12, 'Why is HCl not used with KMnO₄?', 'Cl⁻ is oxidised to Cl₂.', 'concept', 2),
    fc(13, 'End point in a permanganate titration?', 'First permanent pale pink.', 'concept', 2),
    fc(14, 'Ratio MnO₄⁻ : Fe²⁺?', '1 : 5.', 'formula', 2),
    fc(15, 'Ratio MnO₄⁻ : oxalic acid?', '2 : 5.', 'formula', 2),
    fc(16, 'Why warm oxalic acid titrations?', 'Reaction is slow at first; Mn²⁺ then autocatalyses.', 'concept', 2),
    fc(17, 'Equivalent mass of KMnO₄ in acid?', '158 ÷ 5 = 31.6.', 'fact', 2),
    fc(18, 'Ore used to make K₂Cr₂O₇?', 'Chromite, FeCr₂O₄.', 'fact', 3),
    fc(19, 'Oxidation state of Cr in chromite?', '+3.', 'fact', 3),
    fc(20, 'Product of roasting chromite with Na₂CO₃ in air?', 'Na₂CrO₄ (and Fe₂O₃, CO₂).', 'fact', 3),
    fc(21, 'Why add KCl to Na₂Cr₂O₇?', 'K₂Cr₂O₇ is less soluble and crystallises.', 'concept', 3),
    fc(22, 'Structure of Cr₂O₇²⁻?', 'Two tetrahedra sharing one O; Cr–O–Cr about 126°.', 'fact', 3),
    fc(23, 'Dichromate half-equation in acid?', 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.', 'formula', 4),
    fc(24, 'Colour change of acidified dichromate on reduction?', 'Orange → green.', 'fact', 4),
    fc(25, 'Effect of alkali on dichromate?', 'Orange → yellow chromate.', 'fact', 4),
    fc(26, 'Is chromate ⇌ dichromate redox?', 'No; Cr stays +6.', 'concept', 4),
    fc(27, 'Ratio Cr₂O₇²⁻ : Fe²⁺?', '1 : 6.', 'formula', 4),
    fc(28, 'Indicator for dichromate titration?', 'Diphenylamine.', 'fact', 4),
    fc(29, 'Why is K₂Cr₂O₇ a primary standard?', 'Very pure, not hygroscopic, stable solutions.', 'concept', 4),
    fc(30, 'Equivalent mass of K₂Cr₂O₇ in acid?', '294 ÷ 6 = 49.', 'fact', 4),
    fc(31, 'Exam tip: oxidant ionic equations', 'Balance atoms first, then charge with H⁺ and electrons.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
