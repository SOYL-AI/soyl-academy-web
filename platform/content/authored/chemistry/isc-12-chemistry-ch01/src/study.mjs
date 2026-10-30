// ISC 12 Chemistry ch01 Solutions and Their Concentration — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, raoultPlot, deviationPlot, bpPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Solutions and Their Concentration — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Types of solutions',
      r`A **solution** is a homogeneous mixture of two or more substances. The component in larger amount is the **solvent**; the others are **solutes**. By the states of solvent and solute there are nine types: gaseous (air; humid air; camphor in air), liquid (soda water; ethanol in water; salt solution) and **solid solutions** (hydrogen in palladium; sodium amalgam; alloys such as brass, bronze and carat gold). A **binary** solution has two components.`,
      [kt('Solution', 'A homogeneous mixture of two or more components.'), kt('Solid solution', 'A solution in which the solvent is a solid, e.g. an alloy such as brass.')],
      [],
      table(['Solvent', 'Examples'], [['Gas', 'Air, humid air'], ['Liquid', 'Soda water, salt solution, ethanol in water'], ['Solid', 'Brass, sodium amalgam, H₂ in Pd']], 'Table of gaseous, liquid and solid solutions with examples'),
      [1],
    ),
    sec(
      '2. Concentration terms',
      r`- **Mass %** $= \dfrac{\text{mass of component}}{\text{mass of solution}} \times 100$; **volume %**; **w/v %** (g per 100 mL).
- **ppm** $= \dfrac{\text{mass of component}}{\text{mass of solution}} \times 10^{6}$ (1 ppm = 1 mg per kg).
- **Mole fraction** $x_\text{B} = n_\text{B}/(n_\text{A} + n_\text{B})$; $\sum x = 1$.
- **Molarity** $M$ = mol of solute per L of **solution**; **molality** $m$ = mol of solute per kg of **solvent**.
- **Normality** $N$ = gram equivalents of solute per L of solution; equivalent mass = molar mass ÷ n-factor (basicity, acidity, electrons transferred), so $N = n \times M$. At an end point, $N_1V_1 = N_2V_2$.
- Mass %, ppm, mole fraction and molality are **independent of temperature**; molarity and normality fall slightly on heating because the volume of solution increases.
- Conversions: assume 100 g of solution for a percentage; use density to get volume; molarity ↔ molality: $m = \dfrac{1000M}{1000d - M M_\text{B}}$ (d in g mL⁻¹, $M_\text{B}$ = molar mass of solute).`,
      [kt('Molality', 'Moles of solute per kilogram of solvent; independent of temperature.'), kt('Normality', 'Number of gram equivalents of solute per litre of solution.'), kt('Equivalent mass', 'Molar mass divided by the n-factor of the substance in the reaction.'), kt('ppm', 'Parts of a component per million parts of the solution by mass.')],
      [fm(r`M = \frac{n_\text{solute}}{V_\text{solution}/\text{L}}`, 'Molarity'), fm(r`m = \frac{n_\text{solute}}{m_\text{solvent}/\text{kg}}`, 'Molality'), fm(r`N = n \times M`, 'Normality from molarity'), fm(r`N_1V_1 = N_2V_2`, 'Normality equation')],
      table(['Term', 'Temperature dependent?'], [['Mass %, ppm', 'No'], ['Mole fraction', 'No'], ['Molality', 'No'], ['Molarity, normality', 'Yes']], 'Table of concentration terms and whether they depend on temperature'),
      [2],
    ),
    sec(
      '3. Solubility of gases; Henry’s law',
      r`Solubility of a gas in a liquid increases with **pressure** and decreases with **temperature** (dissolving is usually exothermic).

**Henry’s law:** at constant temperature, the solubility of a gas is proportional to its partial pressure; $p = K_\text{H}\,x$. Larger $K_\text{H}$ → less soluble; $K_\text{H}$ increases with temperature.

**Applications:** soft drinks bottled under high CO₂ pressure; the bends in divers (tanks use air diluted with helium); anoxia at high altitude; low oxygen in warm water.

**Limitations:** holds for low pressures, gases that do not react with or dissociate in the solvent (not NH₃ or HCl in water), and dilute solutions.`,
      [kt('Henry’s law', 'At constant temperature the partial pressure of a gas over a solution is proportional to its mole fraction in the solution.'), kt('The bends', 'Pain caused by nitrogen bubbles forming in the blood when a diver surfaces too quickly.')],
      [fm(r`p = K_\text{H}\,x`, 'Henry’s law')],
      V.henry,
      [3],
    ),
    sec(
      '4. Raoult’s law; ideal and non-ideal solutions',
      r`**Raoult’s law:** for a solution of volatile liquids, the partial vapour pressure of each component equals its pure vapour pressure times its mole fraction: $p_\text{A} = p^\circ_\text{A}x_\text{A}$; $p_\text{total} = p_\text{A} + p_\text{B}$ (Dalton). Vapour composition: $y_\text{A} = p_\text{A}/p_\text{total}$; the vapour is richer in the more volatile component. For a **non-volatile solute**, $p = p^\circ_1 x_1$ (vapour pressure lowered). Raoult’s law is a special case of Henry’s law with $K_\text{H} = p^\circ$.

| | Ideal | Positive deviation | Negative deviation |
|---|---|---|---|
| A–B forces | ≈ A–A, B–B | weaker | stronger |
| Vapour pressure | as Raoult | higher | lower |
| $\Delta_\text{mix}H$ | 0 | > 0 | < 0 |
| $\Delta_\text{mix}V$ | 0 | > 0 | < 0 |
| Examples | hexane + heptane; benzene + toluene | ethanol + water; acetone + CS₂ | chloroform + acetone; HNO₃ + water |`,
      [kt('Ideal solution', 'A solution that obeys Raoult’s law at all compositions, with zero enthalpy and volume of mixing.'), kt('Positive deviation', 'Vapour pressure higher than Raoult’s law predicts because A–B attractions are weaker.')],
      [fm(r`p_\text{A} = p^\circ_\text{A}\,x_\text{A}`, 'Raoult’s law'), fm(r`p_\text{total} = p^\circ_\text{A} + (p^\circ_\text{B} - p^\circ_\text{A})\,x_\text{B}`, 'Total vapour pressure')],
      raoultPlot,
      [4],
      [deviationPlot],
    ),
    sec(
      '5. Azeotropes and fractional distillation',
      r`An **azeotrope** is a liquid mixture that boils at constant temperature and distils with unchanged composition (liquid and vapour have the same composition).
- **Minimum-boiling azeotrope:** from large positive deviation; e.g. ethanol + water (about 95% ethanol by volume, about 351 K).
- **Maximum-boiling azeotrope:** from large negative deviation; e.g. nitric acid + water (about 68% HNO₃, about 393.5 K), HCl + water (about 20% HCl, about 383 K).

**Boiling point–composition diagrams:** the liquid and vapour curves meet at the azeotrope (minimum or maximum). Fractional distillation of a mixture gives one pure component and the azeotrope — never both pure components — because at the azeotrope the vapour has the same composition as the liquid.`,
      [kt('Azeotrope', 'A constant-boiling mixture whose vapour has the same composition as the liquid.'), kt('Fractional distillation', 'Separation of volatile liquids by repeated evaporation and condensation in a fractionating column.')],
      [],
      bpPlot,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Dividing by the mass of solution instead of the mass of solvent for molality.
- Treating 1 M H₂SO₄ as 1 N (it is 2 N).
- Saying a larger Henry’s constant means a more soluble gas.
- Using liquid mole fractions for the vapour instead of y = pA/ptotal.
- Linking positive deviation with a maximum-boiling azeotrope.

**How marks are usually awarded**
- Numericals: formula, substitution with units, and a final answer with correct units (full working expected).
- Deviation questions: the change in intermolecular forces plus the signs of ΔmixH and ΔmixV, with an example.
- Azeotrope questions: type, cause, an example, and a labelled boiling point–composition sketch.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Solvent vs solute?', 'Solvent: component in larger amount, decides the state. Solutes: the others.', 'definition', 1),
    fc(2, 'Example of a solid solution of a liquid in a solid?', 'Sodium amalgam (mercury in sodium).', 'example', 1),
    fc(3, 'Example of a gas in a solid?', 'Hydrogen dissolved in palladium.', 'example', 1),
    fc(4, 'Number of types of solution by state?', 'Nine (three states of solvent × three of solute).', 'fact', 1),
    fc(5, 'Define molality.', 'Moles of solute per kg of solvent.', 'definition', 2),
    fc(6, 'Define molarity.', 'Moles of solute per litre of solution.', 'definition', 2),
    fc(7, 'Define normality.', 'Gram equivalents of solute per litre of solution.', 'definition', 2),
    fc(8, 'Normality of 0.5 M H₂SO₄?', '1.0 N (n-factor 2).', 'example', 2),
    fc(9, 'Equivalent mass of Ca(OH)₂?', '74 ÷ 2 = 37.', 'example', 2),
    fc(10, '1 ppm by mass means…?', '1 g in 10⁶ g, i.e. 1 mg per kg.', 'definition', 2),
    fc(11, 'Which terms do not change with temperature?', 'Mass %, ppm, mole fraction, molality.', 'concept', 2),
    fc(12, 'Why does molarity change with temperature?', 'The volume of solution changes on heating.', 'concept', 2),
    fc(13, 'Sum of mole fractions?', 'Always 1.', 'formula', 2),
    fc(14, 'Normality equation in titrations?', 'N₁V₁ = N₂V₂.', 'formula', 2),
    fc(15, 'State Henry’s law.', 'At constant T, p = KH x: gas solubility is proportional to its partial pressure.', 'definition', 3),
    fc(16, 'Larger KH means…?', 'Lower solubility of the gas.', 'concept', 3),
    fc(17, 'Effect of temperature on gas solubility?', 'Decreases (KH increases with temperature).', 'concept', 3),
    fc(18, 'Why do divers use helium-diluted air?', 'Helium is much less soluble in blood than nitrogen, reducing the bends.', 'example', 3),
    fc(19, 'Anoxia?', 'Weakness at high altitude due to low partial pressure of O₂ and so low O₂ in blood.', 'definition', 3),
    fc(20, 'Limitation of Henry’s law?', 'Fails at high pressure and for gases that react with the solvent (NH₃, HCl in water).', 'concept', 3),
    fc(21, 'State Raoult’s law.', 'Partial vapour pressure of each component = its pure vapour pressure × its mole fraction.', 'definition', 4),
    fc(22, 'Vapour composition from Raoult’s law?', 'yA = pA ÷ ptotal; richer in the more volatile liquid.', 'formula', 4),
    fc(23, 'Ideal solution conditions?', 'Obeys Raoult’s law; ΔmixH = 0; ΔmixV = 0.', 'concept', 4),
    fc(24, 'Positive deviation?', 'Weaker A–B forces; higher vapour pressure; ΔmixH > 0; ΔmixV > 0.', 'concept', 4),
    fc(25, 'Negative deviation example?', 'Chloroform + acetone (hydrogen bonding).', 'example', 4),
    fc(26, 'Raoult’s law vs Henry’s law?', 'Same form p ∝ x; Raoult’s constant is p°, Henry’s is KH.', 'concept', 4),
    fc(27, 'Azeotrope?', 'Constant-boiling mixture with the same composition in liquid and vapour.', 'definition', 5),
    fc(28, 'Minimum-boiling azeotrope example?', 'Ethanol + water (about 95% ethanol).', 'example', 5),
    fc(29, 'Maximum-boiling azeotrope example?', 'Nitric acid + water (about 68% HNO₃).', 'example', 5),
    fc(30, 'Why can’t azeotropes be separated by distillation?', 'Vapour and liquid have the same composition.', 'concept', 5),
    fc(31, 'Exam tip: deviation → azeotrope', 'Positive → minimum boiling; negative → maximum boiling.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
