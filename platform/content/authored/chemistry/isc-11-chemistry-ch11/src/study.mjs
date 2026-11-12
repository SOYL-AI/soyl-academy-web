// ISC 11 Chemistry ch11 Thermochemistry: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { DF, DC, FUEL, NEUT, BE, SUB, IE, WATER, CUSO4, DIAMOND, f1, sg } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Thermochemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Enthalpy of reaction: formation and combustion',
      r`The **enthalpy of reaction** ΔH is the heat exchanged at constant pressure for the molar amounts in the balanced equation (ΔH < 0 exothermic, ΔH > 0 endothermic). A **thermochemical equation** shows physical states and ΔH; **standard** values refer to 1 bar (and 298 K).

**Standard enthalpy of formation, ΔfH°:** one mole of a compound is formed from its elements in their standard states; it is **zero** for an element in its standard state (graphite for carbon, so diamond is +${f1(DIAMOND.dH)} kJ mol⁻¹). Example: $\ce{C(graphite) + O2(g) -> CO2(g)}$, ${sg(DF.CO2)} kJ mol⁻¹.

**Standard enthalpy of combustion, ΔcH°:** one mole of a substance burns completely in excess oxygen; always **negative**. The combustion of hydrogen to liquid water and of graphite to CO₂ are also formation reactions. From formation data, $\Delta_cH = \sum \Delta_fH(\text{products}) - \sum \Delta_fH(\text{reactants})$; for methane, ${sg(DF.CO2)} + 2(${sg(DF.H2Ol)}) − (${sg(DF.CH4)}) = ${sg(DC.CH4)} kJ mol⁻¹.`,
      [kt('Enthalpy of formation', 'The enthalpy change when one mole of a compound is formed from its elements in their standard states.'), kt('Enthalpy of combustion', 'The enthalpy change when one mole of a substance burns completely in excess oxygen; always negative.'), kt('Standard state', 'The most stable form of a substance at 1 bar and the stated temperature, usually 298 K.'), kt('Thermochemical equation', 'A balanced equation with physical states and the enthalpy change.')],
      [fm(r`\Delta_cH = \sum \Delta_fH(\text{products}) - \sum \Delta_fH(\text{reactants})`, 'Enthalpy of reaction from enthalpies of formation')],
      V.levels,
      [1],
    ),
    sec(
      '2. Enthalpy of solution and dilution; calorimetry',
      r`The **enthalpy of solution** is the enthalpy change when one mole of solute dissolves in a large amount of solvent: it balances the energy to separate the particles (absorbed) against hydration (released). NaOH(s) −44.5 kJ mol⁻¹ (warms), NH₄NO₃(s) +25.7 (cools), CuSO₄(s) ${sg(CUSO4.solAnhyd)}, CuSO₄·5H₂O(s) ${sg(CUSO4.solHydrate)}. The **enthalpy of dilution** is the heat change when more solvent is added to a solution (negative for concentrated H₂SO₄).

In a **solution calorimeter** the heat absorbed is $q = mc\Delta T$ ($c = 4.18$ J g⁻¹ K⁻¹; density 1 g cm⁻³) and $\Delta H = -q/n$, with n the moles of the limiting reagent.`,
      [kt('Enthalpy of solution', 'The enthalpy change when one mole of a substance dissolves in a specified large amount of solvent.'), kt('Enthalpy of dilution', 'The heat change when a solution is diluted by adding more solvent at constant pressure.'), kt('Calorimeter', 'An insulated vessel with a thermometer in which the temperature change of a reaction is measured.')],
      [fm(r`q = mc\Delta T`, 'Heat absorbed by the solution'), fm(r`\Delta H = -\frac{q}{n}`, 'Enthalpy change per mole of limiting reagent')],
      V.calorimeter,
      [1],
    ),
    sec(
      '3. Calorific value of a fuel',
      r`The **calorific value** of a fuel is the heat released when unit mass burns completely, in kJ g⁻¹ or kJ kg⁻¹: **calorific value = −ΔcH / M**. Hydrogen ${f1(FUEL.H2.cv)}; methane ${f1(FUEL.CH4.cv)}; propane ${f1(FUEL.C3H8.cv)} (so 14.2 kg gives about 7.16 × 10⁵ kJ); ethyne ${f1(FUEL.C2H2.cv)}; ethanol ${f1(FUEL.C2H5OH.cv)}; glucose ${f1(FUEL.glucose.cv)} kJ g⁻¹. A good fuel has a high calorific value, burns cleanly and is easy to store and transport.`,
      [kt('Calorific value', 'The heat produced by the complete combustion of unit mass of a fuel, in kJ g⁻¹.')],
      [fm(r`\text{calorific value} = \frac{-\Delta_cH}{M}`, 'Calorific value in kJ per gram')],
      V.fuels,
      [1],
    ),
    sec(
      '4. Heat of neutralisation',
      r`The **enthalpy of neutralisation** is the heat released when an acid and a base react to form **one mole of water**. For a **strong acid with a strong base** in dilute solution it is nearly constant, **−57.1 kJ mol⁻¹**, because both are completely ionised and the spectator ions do not change: $\ce{H+(aq) + OH-(aq) -> H2O(l)}$. For H₂SO₄ and NaOH the value is −57.1 per mole of water (−114.2 per mole of acid).

With a **weak acid or base** less heat is released, because ionisation absorbs energy: CH₃COOH ${sg(NEUT.ethanoic)} (shortfall ${f1(57.1 + NEUT.ethanoic)}), HCN ${sg(NEUT.hcn)} (shortfall ${f1(57.1 + NEUT.hcn)} kJ mol⁻¹).`,
      [kt('Enthalpy of neutralisation', 'The heat released when an acid and a base react to form one mole of water.'), kt('Spectator ions', 'Ions present in the solution that do not change during the reaction.'), kt('Enthalpy of ionisation', 'The enthalpy change when one mole of a weak electrolyte ionises completely in solution.')],
      [fm(r`\ce{H+(aq) + OH-(aq) -> H2O(l)}, \quad \Delta H = -57.1\ \text{kJ mol}^{-1}`, 'Net reaction of a strong acid with a strong base')],
      V.neut,
      [2],
    ),
    sec(
      '5. Bond, atomisation, sublimation, phase-transition and ionisation enthalpies',
      r`**Bond dissociation enthalpy:** energy to break one mole of a bond in a gaseous molecule (mean values in tables: H–H ${BE['H–H']}, C–H ${BE['C–H']}, C–C ${BE['C–C']}, C=C ${BE['C=C']}, C≡C ${BE['C≡C']}, O=O ${BE['O=O']}, Cl–Cl ${BE['Cl–Cl']} kJ mol⁻¹). **ΔH(reaction) ≈ Σ broken − Σ formed**, an estimate for gases.

**Atomisation:** one mole of gaseous atoms from the element or compound (C ${SUB.C}; ½Cl₂ → Cl ${BE['Cl–Cl'] / 2}). **Sublimation:** solid → vapour. **Fusion and vaporisation** (water ${WATER.fus} and ${WATER.vap} kJ mol⁻¹): the temperature stays constant during the change; ΔsubH = ΔfusH + ΔvapH. **Ionisation enthalpy:** X(g) → X⁺(g) + e⁻, always positive (Na ${IE.Na}; Mg ${IE.Mg1} then ${IE.Mg2} kJ mol⁻¹).`,
      [kt('Bond dissociation enthalpy', 'The energy needed to break one mole of a particular bond in a gaseous molecule.'), kt('Enthalpy of atomisation', 'The enthalpy change when one mole of gaseous atoms is formed from the element or compound.'), kt('Enthalpy of sublimation', 'The enthalpy change when one mole of a solid changes directly into vapour.'), kt('Ionisation enthalpy', 'The energy needed to remove one mole of electrons from one mole of gaseous atoms or ions.')],
      [fm(r`\Delta H = \sum(\text{bonds broken}) - \sum(\text{bonds formed})`, 'Enthalpy of reaction from bond enthalpies'), fm(r`\Delta_{sub}H = \Delta_{fus}H + \Delta_{vap}H`, 'Sublimation from fusion and vaporisation')],
      V.heating,
      [3],
      [V.atom],
    ),
    sec(
      '6. Hess’s law and its applications',
      r`**Hess’s law:** the total enthalpy change of a reaction is the same whether it takes place in one step or in several steps, because enthalpy is a **state function**. Add equations to reach the target; **reversing** an equation changes the sign of ΔH; **multiplying** it multiplies ΔH.

**Uses:** ΔfH of a compound from enthalpies of combustion (ethene +52.3 from −393.5, −285.8 and −1410.9); ΔH of a reaction from ΔfH (ΣΔfH products − Σ reactants) or from ΔcH (Σ reactants − Σ products); enthalpies of hydration from solution enthalpies (CuSO₄: ${sg(CUSO4.hyd)} kJ mol⁻¹); enthalpy of atomisation from a cycle; graphite → diamond +${f1(DIAMOND.dH)} kJ mol⁻¹.`,
      [kt('Hess’s law', 'The total enthalpy change of a reaction is the same whether it occurs in one step or in several steps.'), kt('State function', 'A property that depends only on the initial and final states of the system, not on the path.'), kt('Enthalpy cycle', 'A diagram of alternative routes between the same two states, used to apply Hess’s law.')],
      [fm(r`\Delta H_{\text{direct}} = \Delta H_1 + \Delta H_2 + \cdots`, 'Hess’s law'), fm(r`\Delta H = \sum \Delta_cH(\text{reactants}) - \sum \Delta_cH(\text{products})`, 'Enthalpy of reaction from enthalpies of combustion')],
      V.hess,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Quoting ΔfH of an element in its standard state as non-zero, or ΔcH as positive.
- Using bonds formed minus bonds broken, or forgetting to count all the bonds in a molecule.
- Giving calorific value in kJ mol⁻¹ instead of kJ g⁻¹.
- Forgetting to find the limiting reagent before using ΔH = −q / n.
- Explaining the low heat of neutralisation of weak acids without mentioning that ionisation absorbs energy.
- Not changing the sign of ΔH when an equation is reversed in a Hess cycle.

**How marks are usually awarded**
- Definitions: the amount (one mole), the state of the substances and the condition (1 bar, 298 K) (1 each).
- Calorimetry: q = m c ΔT (1), moles (1), ΔH per mole with sign and unit (1).
- Hess's law: target equation or cycle (1), correct manipulation with signs (1), numerical answer with unit (1).
- Bond enthalpies: bonds broken (1), bonds formed (1), difference with sign (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define the standard enthalpy of formation.', 'The enthalpy change when one mole of a compound is formed from its elements in their standard states.', 'definition', 1),
    fc(2, 'What is ΔfH° of an element in its standard state?', 'Zero, by convention (for example graphite, O₂(g), H₂(g)).', 'fact', 1),
    fc(3, 'Define the standard enthalpy of combustion.', 'The enthalpy change when one mole of a substance burns completely in excess oxygen, products in standard states; always negative.', 'definition', 1),
    fc(4, 'ΔcH of methane and how it is found from ΔfH?', r`−890.3 kJ mol⁻¹ $= [-393.5 + 2(-285.8)] - (-74.8)$.`, 'example', 1),
    fc(5, 'Which two enthalpies are numerically equal for hydrogen burning to liquid water?', 'ΔcH of H₂ and ΔfH of H₂O(l): −285.8 kJ mol⁻¹.', 'concept', 1),
    fc(6, 'Define enthalpy of solution.', 'The enthalpy change when one mole of a substance dissolves in a specified large amount of solvent.', 'definition', 1),
    fc(7, 'Why does NH₄NO₃ cool the water while NaOH warms it?', 'ΔsolH is +25.7 kJ mol⁻¹ (endothermic) for NH₄NO₃ and −44.5 kJ mol⁻¹ (exothermic) for NaOH.', 'concept', 1),
    fc(8, 'Define enthalpy of dilution.', 'The heat change when a solution is diluted by adding more solvent at constant pressure.', 'definition', 1),
    fc(9, 'Heat absorbed in a calorimeter?', r`$q = mc\Delta T$, with $c = 4.18$ J g⁻¹ K⁻¹ for dilute solutions.`, 'formula', 1),
    fc(10, 'ΔH per mole from calorimeter data?', r`$\Delta H = -q/n$, n = moles of the limiting reagent.`, 'formula', 1),
    fc(11, 'What is the calorific value of a fuel?', 'The heat released when unit mass of the fuel burns completely, in kJ g⁻¹.', 'definition', 1),
    fc(12, 'Formula for calorific value?', r`$-\Delta_cH / M$ (kJ g⁻¹).`, 'formula', 1),
    fc(13, 'Calorific values of hydrogen, methane, ethanol?', '142.9, 55.6 and 29.7 kJ g⁻¹.', 'fact', 1),
    fc(14, 'Heat of neutralisation of a strong acid with a strong base?', '−57.1 kJ per mole of water formed.', 'fact', 2),
    fc(15, 'Net ionic equation of every strong acid-strong base neutralisation?', r`$\ce{H+(aq) + OH-(aq) -> H2O(l)}$.`, 'concept', 2),
    fc(16, 'Why is the heat of neutralisation of strong acids with strong bases constant?', 'Both are completely ionised, so only H⁺ + OH⁻ → H₂O occurs; the other ions are spectators.', 'concept', 2),
    fc(17, 'Why do weak acids release less heat on neutralisation?', 'Some of the energy is absorbed in ionising the weak acid.', 'concept', 2),
    fc(18, 'Neutralisation heats of CH₃COOH and HCN with NaOH?', '−55.2 and −12.1 kJ mol⁻¹.', 'fact', 2),
    fc(19, 'Heat of neutralisation of H₂SO₄ with NaOH per mole of acid?', '−114.2 kJ (two moles of water form); −57.1 per mole of water.', 'fact', 2),
    fc(20, 'Define bond dissociation enthalpy.', 'The energy needed to break one mole of a particular bond in a gaseous molecule.', 'definition', 3),
    fc(21, 'ΔH from bond enthalpies?', 'Σ (bonds broken) − Σ (bonds formed).', 'formula', 3),
    fc(22, 'Define enthalpy of atomisation.', 'The enthalpy change when one mole of gaseous atoms is formed from the element or compound.', 'definition', 3),
    fc(23, 'ΔatomH of chlorine from the Cl–Cl bond enthalpy 242 kJ mol⁻¹?', '+121 kJ mol⁻¹: half, since one mole of Cl₂ gives two moles of Cl atoms.', 'example', 3),
    fc(24, 'What is the enthalpy of sublimation?', 'The enthalpy change when one mole of a solid changes directly into vapour.', 'definition', 3),
    fc(25, 'Relation between ΔsubH, ΔfusH and ΔvapH?', 'ΔsubH = ΔfusH + ΔvapH (at the same temperature).', 'formula', 3),
    fc(26, 'Define ionisation enthalpy.', 'The energy needed to remove one electron from each atom in a mole of gaseous atoms or ions.', 'definition', 3),
    fc(27, 'Enthalpy change for Na(s) → Na⁺(g) + e⁻?', 'ΔsubH + IE = 107.3 + 496 = +603.3 kJ mol⁻¹.', 'example', 3),
    fc(28, 'State Hess’s law.', 'The total enthalpy change of a reaction is the same whether it takes place in one step or in several steps.', 'definition', 4),
    fc(29, 'Why does Hess’s law hold?', 'Enthalpy is a state function.', 'concept', 4),
    fc(30, 'What happens to ΔH if an equation is reversed or doubled?', 'The sign changes if reversed; ΔH is doubled if the equation is doubled.', 'concept', 4),
    fc(31, 'ΔH from enthalpies of formation?', 'Σ ΔfH(products) − Σ ΔfH(reactants).', 'formula', 4),
    fc(32, 'ΔH for graphite → diamond from combustion data?', '−393.5 − (−395.4) = +1.9 kJ mol⁻¹.', 'example', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
