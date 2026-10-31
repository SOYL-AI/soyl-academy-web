// ISC 12 Chemistry ch08 Inner Transition (f-Block) Elements: Lanthanoids and Actinoids — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, lnPlot, oxPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Inner Transition (f-Block) Elements: Lanthanoids and Actinoids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Lanthanoids: configuration, oxidation states, colour, complexes and alloys',
      r`**Lanthanoids:** Ce (58) to Lu (71), after La; fill 4f. General configuration $[\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2$; 5d¹ only in La, Ce, Gd (4f⁷5d¹) and Lu (4f¹⁴5d¹). Ln³⁺: remove 6s², then 5d or one 4f electron.

**Oxidation states:** **+3** for all (lattice/hydration enthalpy repays ionisation). +4: Ce⁴⁺ (f⁰), Tb⁴⁺ (f⁷) — oxidising. +2: Eu²⁺ (f⁷), Yb²⁺ (f¹⁴), Sm²⁺ — reducing.

**Colour:** f–f transitions; f⁰ and f¹⁴ ions (La³⁺, Lu³⁺) colourless. Unpaired f electrons → paramagnetic. **Complexes:** few (large ions, 4f buried). **Alloys:** mischmetall (≈ 95% Ln, 5% Fe, traces S, C, Ca, Al) — flints, Mg alloys for shells and bullets.`,
      [kt('Lanthanoids', 'The fourteen elements cerium to lutetium, in which 4f orbitals are being filled.'), kt('Mischmetall', 'An alloy of about 95% lanthanoid metals and 5% iron with traces of S, C, Ca and Al.')],
      [fm(r`[\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2`, 'Lanthanoid configuration')],
      V.blocks,
      [1],
    ),
    sec(
      '2. Lanthanoid contraction and its consequences',
      r`**Definition:** the steady decrease in atomic and Ln³⁺ ionic radii from La (103 pm) to Lu (86 pm). **Cause:** 4f electrons shield poorly (diffuse shape), so effective nuclear charge increases steadily.

**Consequences:** (i) 4d and 5d elements of a group have nearly equal radii (Zr 160, Hf 159 pm; Nb/Ta; Mo/W) and very similar chemistry — Zr and Hf are hard to separate; (ii) basicity of Ln(OH)₃ decreases La → Lu; (iii) lanthanoids are difficult to separate (ion exchange); (iv) 5d metals are very dense.`,
      [kt('Lanthanoid contraction', 'The steady decrease in size of lanthanoid atoms and Ln³⁺ ions with increasing atomic number, due to poor shielding by 4f electrons.')],
      [],
      lnPlot,
      [2],
    ),
    sec(
      '3. Chemical reactivity of lanthanoids',
      r`Strongly electropositive ($E^\circ$ ≈ −2.3 V); early members similar to calcium; reactivity falls slightly to Lu.

| Reagent | Product |
|---|---|
| O₂ (burn) | Ln₂O₃ (Ce → CeO₂) |
| H₂ (heat) | LnH₂, LnH₃ |
| X₂ (heat) | LnX₃ |
| S (heat) | Ln₂S₃ |
| N₂ (heat) | LnN |
| C (2773 K) | Ln₃C, Ln₂C₃, LnC₂ |
| H₂O | Ln(OH)₃ + H₂ |
| Dilute acid | Ln³⁺ salt + H₂ |`,
      [kt('Electropositive', 'Having a strong tendency to lose electrons and form positive ions.')],
      [fm(r`\ce{2Ln + 6H2O -> 2Ln(OH)3 + 3H2}`, 'Reaction with water')],
      table(['Reagent', 'Product'], [['O₂', 'Ln₂O₃'], ['N₂', 'LnN'], ['S', 'Ln₂S₃'], ['C', 'LnC₂ and others']], 'Table of selected lanthanoid reactions'),
      [3],
    ),
    sec(
      '4. Actinoids and comparison with lanthanoids',
      r`**Actinoids:** Th (90) to Lr (103); fill 5f; $[\text{Rn}]5f^{1\text{–}14}6d^{0\text{–}1}7s^2$. All radioactive; transuranium elements synthetic.

**Oxidation states:** +3 to +7; maximum +4 (Th), +5 (Pa), +6 (U), +7 (Np, Pu), then falls; later members mainly +3. **Reason:** 5f, 6d, 7s close in energy; 5f less buried than 4f.

**Comparison:** actinoids — wider range of states, all radioactive, larger contraction, more complex formation (e.g. uranyl complexes); lanthanoids — mainly +3, only Pm radioactive, smaller contraction, fewer complexes.`,
      [kt('Transuranium elements', 'Elements with atomic number greater than 92, all made artificially.'), kt('Actinoid contraction', 'Decrease in size across the actinoids, greater than the lanthanoid contraction because 5f electrons shield even more poorly.')],
      [],
      oxPlot,
      [4],
      [table(['Feature', 'Lanthanoids', 'Actinoids'], [['States', 'Mainly +3', '+3 to +7'], ['Radioactive', 'Only Pm', 'All'], ['Complexes', 'Fewer', 'More']], 'Comparison table of lanthanoids and actinoids')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the cause of the lanthanoid contraction as "increasing number of shells".
- Calling Ce⁴⁺ a reducing agent or Eu²⁺ an oxidising agent.
- Writing lanthanoid oxides as LnO instead of Ln₂O₃.
- Saying all lanthanoids are radioactive (only promethium).

**How marks are usually awarded**
- Lanthanoid contraction (2–3 marks): definition, cause (poor 4f shielding) and consequences with examples.
- Reactivity (2 marks): correct products with +3 state and balanced equations.
- Comparison (3 marks): three distinct points, preferably in a table.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Lanthanoids?', 'Ce (58) to Lu (71); 4f filled.', 'definition', 1),
    fc(2, 'General lanthanoid configuration?', '[Xe]4f¹⁻¹⁴5d⁰⁻¹6s².', 'formula', 1),
    fc(3, 'Configuration of Gd?', '[Xe]4f⁷5d¹6s².', 'fact', 1),
    fc(4, 'Common oxidation state of lanthanoids?', '+3.', 'fact', 1),
    fc(5, 'Why is Ce⁴⁺ oxidising?', 'It gains an electron to reach the more stable +3 state.', 'concept', 1),
    fc(6, 'Why is Eu²⁺ reducing?', 'It loses an electron to reach the stable +3 state.', 'concept', 1),
    fc(7, 'Configuration of Gd³⁺?', '[Xe]4f⁷.', 'fact', 1),
    fc(8, 'Colourless Ln³⁺ ions?', 'La³⁺ (f⁰) and Lu³⁺ (f¹⁴).', 'fact', 1),
    fc(9, 'Origin of lanthanoid colours?', 'f–f transitions.', 'concept', 1),
    fc(10, 'Why few lanthanoid complexes?', 'Large ions, low charge density; 4f orbitals buried.', 'concept', 1),
    fc(11, 'Mischmetall composition?', 'About 95% lanthanoids, 5% Fe, traces S, C, Ca, Al.', 'fact', 1),
    fc(12, 'Use of mischmetall?', 'Lighter flints; Mg alloys for shells and bullets.', 'fact', 1),
    fc(13, 'Lanthanoid contraction?', 'Steady decrease in size from La to Lu.', 'definition', 2),
    fc(14, 'Cause of lanthanoid contraction?', 'Poor shielding by 4f electrons.', 'concept', 2),
    fc(15, 'Radii of Zr and Hf?', '160 pm and 159 pm.', 'fact', 2),
    fc(16, 'Most basic lanthanoid hydroxide?', 'La(OH)₃.', 'fact', 2),
    fc(17, 'Why is Hf denser than Zr?', 'Same size, almost twice the mass.', 'concept', 2),
    fc(18, 'Ln + O₂ product?', 'Ln₂O₃ (cerium gives CeO₂).', 'fact', 3),
    fc(19, 'Ln + N₂ product?', 'LnN.', 'fact', 3),
    fc(20, 'Ln + S product?', 'Ln₂S₃.', 'fact', 3),
    fc(21, 'Ln + C at 2773 K?', 'Carbides Ln₃C, Ln₂C₃, LnC₂.', 'fact', 3),
    fc(22, 'Ln + water?', 'Ln(OH)₃ + H₂.', 'fact', 3),
    fc(23, 'Which common metal do early lanthanoids resemble?', 'Calcium.', 'concept', 3),
    fc(24, 'Actinoids?', 'Th (90) to Lr (103); 5f filled.', 'definition', 4),
    fc(25, 'Transuranium elements?', 'Z > 92; all synthetic.', 'definition', 4),
    fc(26, 'Highest actinoid oxidation state?', '+7 (Np, Pu).', 'fact', 4),
    fc(27, 'Why wider range for actinoids?', '5f, 6d, 7s close in energy; 5f less buried.', 'concept', 4),
    fc(28, 'Oxidation state of U in UO₂²⁺?', '+6.', 'fact', 4),
    fc(29, 'Which contraction is greater?', 'Actinoid contraction.', 'fact', 4),
    fc(30, 'Radioactive lanthanoid?', 'Promethium only.', 'fact', 4),
    fc(31, 'Exam tip: lanthanoid products', 'Always use the +3 state: Ln₂O₃, LnX₃, Ln₂S₃.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
