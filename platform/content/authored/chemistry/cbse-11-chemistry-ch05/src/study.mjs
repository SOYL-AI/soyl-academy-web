// ch05 Chemical Thermodynamics — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Thermodynamics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. System, surroundings and state functions',
      r`The **system** is the part of the universe under study; the **surroundings** exchange energy with it across a **boundary**.

- **Open:** exchanges matter and energy (tea in an open cup).
- **Closed:** exchanges energy only (a sealed tube in a water bath).
- **Isolated:** exchanges neither (an ideal vacuum flask).

**State functions** ($p, V, T, U, H, S, G$) depend only on the present state, so their changes depend only on the initial and final states. **Path functions** ($q$, $w$) depend on the route.

**Extensive** properties depend on the amount ($m, V, U, H, S, G$); **intensive** ones do not ($T, p$, density, molar quantities). The ratio of two extensive properties is intensive.`,
      [kt('State function', 'A property whose value depends only on the state of the system, not on the path by which it was reached.'), kt('Isolated system', 'A system that exchanges neither matter nor energy with its surroundings.'), kt('Intensive property', 'A property that does not depend on the amount of substance, such as temperature or density.')],
      [],
      table(['System', 'Matter', 'Energy'], [['Open', 'Exchanged', 'Exchanged'], ['Closed', 'Not exchanged', 'Exchanged'], ['Isolated', 'Not exchanged', 'Not exchanged']], 'Types of thermodynamic system'),
      [1],
    ),
    sec(
      '2. Work, heat and the first law',
      r`**IUPAC sign convention:** viewed from the system, energy entering is positive. Work done **on** the system: $w > 0$. Work done **by** the system (expansion): $w < 0$. Heat absorbed: $q > 0$.

**Pressure–volume work:**
- Free expansion into vacuum: $w = 0$.
- Constant external pressure: $w = -p_\text{ex}\Delta V$ ($1\ \text{L bar} = 100\ \text{J}$).
- Isothermal reversible, ideal gas: $w = -2.303\,nRT\log(V_2/V_1)$; this is the **maximum** work obtainable.

**First law:** $\Delta U = q + w$. For an isolated system $\Delta U = 0$; for an adiabatic change $\Delta U = w$; for an isothermal change of an ideal gas $\Delta U = 0$, so $q = -w$.`,
      [kt('Internal energy (U)', 'Total energy of a system: kinetic, potential and bonding energy of its particles. A state function.'), kt('Reversible process', 'A process carried out infinitely slowly so that the system is always in equilibrium with its surroundings.'), kt('Adiabatic process', 'A process in which no heat is exchanged, q = 0.')],
      [fm(r`\Delta U = q + w`, 'First law'), fm(r`w = -p_\text{ex}\,\Delta V`, 'Irreversible expansion work'), fm(r`w = -2.303\,nRT\log\dfrac{V_2}{V_1}`, 'Isothermal reversible work')],
      V.pv,
      [2],
    ),
    sec(
      '3. Enthalpy and heat capacity',
      r`**Enthalpy** $H = U + pV$ is a state function. At constant pressure $q_p = \Delta H$; at constant volume $q_V = \Delta U$.

For reactions involving gases: $\Delta H = \Delta U + \Delta n_g RT$, where $\Delta n_g$ is moles of gaseous products minus moles of gaseous reactants. If $\Delta n_g = 0$, $\Delta H = \Delta U$.

**Heat capacity** $C = q/\Delta T$ (extensive); molar heat capacity per mole, specific heat per gram. $\Delta U = nC_V\Delta T$, $\Delta H = nC_p\Delta T$, and for an ideal gas $C_p - C_V = R$.

**Exothermic:** $\Delta H < 0$ (products lower in enthalpy). **Endothermic:** $\Delta H > 0$.`,
      [kt('Enthalpy (H)', 'H = U + pV; the heat absorbed at constant pressure equals its change.'), kt('Heat capacity', 'Heat needed to raise the temperature of a system by one kelvin.')],
      [fm(r`\Delta H = \Delta U + \Delta n_g RT`, 'Enthalpy and internal energy'), fm(r`C_p - C_V = R`, 'Molar heat capacities of an ideal gas')],
      V.levels,
      [2],
    ),
    sec(
      '4. Calorimetry and standard enthalpy changes',
      r`**Bomb calorimeter** (constant volume) measures $\Delta U$; $q = C_\text{cal}\Delta T$; then convert with $\Delta H = \Delta U + \Delta n_g RT$. A **constant-pressure (coffee-cup) calorimeter** measures $\Delta H$: $q = mc\Delta T$.

Standard enthalpy changes (per mole, 1 bar, usually 298 K):
- **Formation** $\Delta_fH^\circ$: one mole of compound from elements in reference states; zero for an element.
- **Combustion** $\Delta_cH^\circ$: one mole burnt completely in oxygen; always negative.
- **Atomisation** $\Delta_aH^\circ$: one mole of gaseous atoms from the element (or compound).
- **Sublimation**, **fusion**, **vaporisation** (phase transitions): positive.
- **Ionisation enthalpy:** removing one electron from a gaseous atom (Na: +496 kJ mol⁻¹).
- **Solution:** dissolving one mole in a large excess of solvent (NaOH −44.5, NH₄NO₃ +25.7 kJ mol⁻¹).
- **Dilution:** enthalpy change on adding solvent to a solution.
- **Neutralisation** of a strong acid and strong base: about −57 kJ per mole of water.`,
      [kt('Standard state', 'Pure substance at 1 bar pressure; 298 K is the usual reference temperature.'), kt('Enthalpy of combustion', 'Enthalpy change when one mole of a substance burns completely in oxygen under standard conditions.')],
      [fm(r`q = C_\text{cal}\,\Delta T`, 'Heat from a calorimeter')],
      table(['Enthalpy change', 'Example', 'kJ mol⁻¹'], [['Formation of H₂O(l)', 'H₂ + ½O₂', '−285.8'], ['Combustion of graphite', 'C + O₂', '−393.5'], ['Fusion of ice', 'H₂O(s) → H₂O(l)', '+6.01'], ['Vaporisation of water', 'H₂O(l) → H₂O(g)', '+40.7'], ['Ionisation of Na(g)', 'Na → Na⁺ + e⁻', '+496']], 'Examples of standard enthalpy changes'),
      [3],
    ),
    sec(
      '5. Hess’s law and bond enthalpies',
      r`**Hess’s law:** the enthalpy change of a reaction is the same whether it occurs in one step or in several, because $H$ is a state function. Reversing an equation changes the sign of $\Delta H$; multiplying scales it; equations and enthalpies can be added.

$$\Delta_rH^\circ = \sum \Delta_fH^\circ(\text{products}) - \sum \Delta_fH^\circ(\text{reactants})$$

**Bond enthalpy** is the energy to break one mole of a bond in the gas phase (average value for many compounds). For gaseous reactions, $\Delta_rH \approx \sum(\text{bonds broken}) - \sum(\text{bonds formed})$. Typical values (kJ mol⁻¹): H–H 436, C–H 414, C–C 347, C=C 611, O=O 498, O–H 463, C=O (CO₂) 799, Cl–Cl 242, H–Cl 431.`,
      [kt('Hess’s law', 'The total enthalpy change of a reaction is independent of the route between the same initial and final states.'), kt('Bond enthalpy', 'Energy needed to break one mole of a particular bond in gaseous molecules; an average over compounds.')],
      [fm(r`\Delta_rH^\circ = \sum\Delta_fH^\circ(\text{P}) - \sum\Delta_fH^\circ(\text{R})`, 'Enthalpy of reaction from formation data')],
      V.hess,
      [3],
    ),
    sec(
      '6. Entropy, Gibbs energy and spontaneity',
      r`**Entropy** $S$ is a measure of disorder, a state function. For a reversible process $\Delta S = q_\text{rev}/T$. Entropy rises on melting, boiling, dissolving and when the number of gas moles increases. **Second law:** $\Delta S_\text{total} = \Delta S_\text{sys} + \Delta S_\text{surr} > 0$ for a spontaneous process.

**Gibbs energy:** $\Delta G = \Delta H - T\Delta S$ (constant $T$, $p$). $\Delta G < 0$: spontaneous; $= 0$: equilibrium; $> 0$: non-spontaneous.

| ΔH | ΔS | Spontaneous? |
|---|---|---|
| − | + | At all temperatures |
| + | − | At no temperature |
| − | − | At low temperatures |
| + | + | At high temperatures |

**Equilibrium:** $\Delta G^\circ = -2.303\,RT\log K$. If $\Delta G^\circ < 0$, $K > 1$.`,
      [kt('Entropy (S)', 'A state function measuring the disorder of a system; for a reversible change, ΔS = q_rev/T.'), kt('Gibbs energy (G)', 'G = H − TS; its decrease at constant T and p is the criterion of spontaneity.')],
      [fm(r`\Delta G = \Delta H - T\Delta S`, 'Gibbs equation'), fm(r`\Delta G^\circ = -2.303\,RT\log K`, 'Gibbs energy and equilibrium constant')],
      V.gt,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing w = +pΔV for an expansion (the work done by the gas is negative).
- Forgetting that 1 L bar = 100 J, or mixing J and kJ in ΔG = ΔH − TΔS.
- Counting solids and liquids in Δn_g (only gases count).
- Taking formed minus broken for bond enthalpies (it is broken minus formed).
- Not multiplying ΔfH° by the stoichiometric coefficients; forgetting that ΔfH° of an element is zero.
- Quoting spontaneity from ΔH alone.

**How marks are usually awarded**
- 1-mark items: sign convention, state function or the correct relation.
- Numericals (2–3 marks): formula (½–1), substitution with units (1), answer with sign and unit (½–1).
- Reasoning (2–3 marks): the relation used and the argument in terms of ΔH, ΔS and T.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Open, closed and isolated system?', 'Open: matter and energy exchange. Closed: energy only. Isolated: neither.', 'definition', 1),
    fc(2, 'State function: definition and examples?', 'Depends only on the state, not the path: p, V, T, U, H, S, G.', 'definition', 1),
    fc(3, 'Are heat and work state functions?', 'No, they are path functions.', 'fact', 1),
    fc(4, 'Extensive or intensive: density?', 'Intensive (ratio of two extensive properties).', 'concept', 1),
    fc(5, 'IUPAC sign of work done by a gas expanding?', 'Negative: energy leaves the system.', 'concept', 2),
    fc(6, 'Work in free expansion into a vacuum?', 'Zero, because the external pressure is zero.', 'fact', 2),
    fc(7, 'Irreversible expansion work formula?', r`$w = -p_\text{ex}\Delta V$ (1 L bar = 100 J).`, 'formula', 2),
    fc(8, 'Isothermal reversible work of an ideal gas?', r`$w = -2.303\,nRT\log(V_2/V_1)$; it is the maximum work.`, 'formula', 2),
    fc(9, 'First law of thermodynamics?', r`$\Delta U = q + w$: energy is conserved.`, 'formula', 2),
    fc(10, 'ΔU for isothermal change of an ideal gas?', 'Zero, so q = −w.', 'concept', 2),
    fc(11, 'Adiabatic change: ΔU equals?', 'The work, w, because q = 0.', 'concept', 2),
    fc(12, 'Definition of enthalpy?', r`$H = U + pV$; $q_p = \Delta H$.`, 'definition', 2),
    fc(13, 'Relation between ΔH and ΔU?', r`$\Delta H = \Delta U + \Delta n_g RT$.`, 'formula', 2),
    fc(14, 'When is ΔH = ΔU?', 'When Δn_g = 0 (or no gases are involved).', 'concept', 2),
    fc(15, 'C_p − C_V for an ideal gas?', 'Equal to R (8.314 J K⁻¹ mol⁻¹).', 'formula', 2),
    fc(16, 'Exothermic change: sign of ΔH?', 'Negative; products have lower enthalpy.', 'fact', 2),
    fc(17, 'What does a bomb calorimeter measure?', r`$\Delta U$ (constant volume); convert to $\Delta H$ with $\Delta n_g RT$.`, 'concept', 3),
    fc(18, 'Standard enthalpy of formation of an element?', 'Zero in its reference state (e.g. graphite, O₂ gas).', 'fact', 3),
    fc(19, 'Combustion of graphite: ΔcH°?', 'Minus 393.5 kJ per mole.', 'fact', 3),
    fc(20, 'Enthalpy of atomisation?', 'Enthalpy change to produce one mole of gaseous atoms from the element (or compound).', 'definition', 3),
    fc(21, 'Why does dissolving NH₄NO₃ cool the water?', 'Its enthalpy of solution is positive (+25.7 kJ mol⁻¹): heat is absorbed.', 'example', 3),
    fc(22, 'State Hess’s law.', 'The enthalpy change of a reaction is the same whether it occurs in one step or many, as H is a state function.', 'definition', 3),
    fc(23, 'Δ_rH° from formation data?', 'Σ ΔfH°(products) − Σ ΔfH°(reactants), each multiplied by its coefficient.', 'formula', 3),
    fc(24, 'Bond enthalpy estimate of ΔrH?', 'Σ bonds broken − Σ bonds formed (gases, average values).', 'formula', 3),
    fc(25, 'Entropy: what does it measure and for a reversible change?', r`Disorder; $\Delta S = q_\text{rev}/T$.`, 'definition', 4),
    fc(26, 'Which has higher entropy: ice, water or steam?', 'Steam (gas) > water > ice.', 'concept', 4),
    fc(27, 'Gibbs equation and criterion?', r`$\Delta G = \Delta H - T\Delta S$; spontaneous if $\Delta G < 0$.`, 'formula', 4),
    fc(28, 'ΔH negative, ΔS negative: when spontaneous?', 'At low temperatures only (the enthalpy term dominates).', 'concept', 4),
    fc(29, 'Relation between ΔG° and K?', r`$\Delta G^\circ = -2.303\,RT\log K$.`, 'formula', 4),
    fc(30, 'Exam tip: units in ΔG = ΔH − TΔS?', 'Convert ΔS from J to kJ (or ΔH to J), and use kelvin.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
