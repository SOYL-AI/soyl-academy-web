// ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { TRANS, dsTrans, RX, S0, f0, f1, f2, sg } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Entropy, Free Energy and Spontaneity — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Inadequacy of the first law; spontaneous processes; the second law',
      r`The **first law** states that energy is conserved but gives **no direction** of change: heat flowing from a cold to a hot body would conserve energy. A negative ΔH is also not a sufficient criterion: ice melts above 273 K and NH₄NO₃ dissolves in water although both absorb heat.

A **spontaneous process** occurs of its own accord under the given conditions, in a definite direction (heat from hot to cold, gas into a vacuum, rusting). A **non-spontaneous process** needs outside work. A **reversible** process proceeds by infinitesimal steps with the system always in equilibrium.

**Second law:** (Clausius) heat cannot flow of itself from a colder to a hotter body; (Kelvin–Planck) heat from a single reservoir cannot be converted completely into work in a cycle. In terms of entropy: the **entropy of the universe increases** in a spontaneous change.`,
      [kt('Spontaneous process', 'A process that occurs of its own accord, without continuous outside help, under the given conditions.'), kt('Reversible process', 'A process carried out in infinitesimal steps, the system being in equilibrium with its surroundings at every stage.'), kt('Second law', 'The entropy of the universe increases in every spontaneous process.')],
      [],
      V.spont,
      [1],
    ),
    sec(
      '2. Entropy and its meaning',
      r`**Entropy S** is a measure of the **disorder** (randomness) of a system, and a **state function**. For a **reversible** change $\Delta S = q_{rev}/T$ (unit J K⁻¹; molar entropy J K⁻¹ mol⁻¹).

ΔS is **positive** for melting, vaporisation, sublimation, dissolution of a solid, formation of gas molecules and expansion of a gas; **negative** for freezing, condensation and the combination of gas molecules (2NO₂ → N₂O₄). S increases with temperature, with jumps at the melting and boiling points; S(gas) ≫ S(liquid) > S(solid).`,
      [kt('Entropy', 'A state function that measures the disorder of a system; ΔS = q_rev / T.'), kt('State function', 'A property whose change depends only on the initial and final states.')],
      [fm(r`\Delta S = \frac{q_{rev}}{T}`, 'Entropy change for a reversible process')],
      V.entropyT,
      [2],
    ),
    sec(
      '3. Calculating ΔS; entropy of the universe; thermal death',
      r`**At a phase change** (reversible, constant T): $\Delta S = \Delta H/T$ (ΔH in J). Ice ${f1(dsTrans('iceFus'))} (fusion), water ${f1(dsTrans('waterVap'))} (vaporisation), benzene ${f1(dsTrans('benzVap'))} J K⁻¹ mol⁻¹ (vaporisation). **Isothermal reversible expansion of an ideal gas:** $\Delta S = nR\ln(V_2/V_1)$.

**Entropy of the universe:** $\Delta S_{univ} = \Delta S_{sys} + \Delta S_{surr}$, with $\Delta S_{surr} = -\Delta H/T$. Spontaneous if ΔS(univ) > 0; zero at equilibrium. Ice melting at 283 K: +22.0 − 21.2 = +0.8 J K⁻¹ (melts); at 263 K: −0.8 J K⁻¹ (does not).

**Thermal death:** since the entropy of the universe keeps increasing, it tends to a maximum: uniform temperature, no heat flow, no work obtainable from heat.`,
      [kt('Entropy of the universe', 'The sum of the entropy changes of the system and the surroundings.'), kt('Thermal death', 'The predicted final state of the universe, with maximum entropy and uniform temperature, in which no work can be got from heat.')],
      [fm(r`\Delta S = \frac{\Delta H}{T}`, 'Entropy change at a phase transition'), fm(r`\Delta S = nR\ln\frac{V_2}{V_1}`, 'Isothermal reversible expansion of an ideal gas'), fm(r`\Delta S_{surr} = -\frac{\Delta H}{T}`, 'Entropy change of the surroundings')],
      V.universe,
      [2],
    ),
    sec(
      '4. Gibbs and Helmholtz free energy',
      r`**Gibbs energy** $G = H - TS$; at constant T and p, $\Delta G = \Delta H - T\Delta S$, and $-\Delta G = T\Delta S_{univ}$. **Helmholtz energy** $A = U - TS$; at constant T and V, ΔA < 0 is the criterion. −ΔG is the maximum useful (non-expansion) work; −ΔA is the maximum work of all kinds.

**Relationship:** $G = H - TS = U + pV - TS = A + pV$, so $\Delta G = \Delta A + \Delta(pV)$; for ideal gases $\Delta G = \Delta A + \Delta n_g RT$ (about 2.49 kJ per unit Δn_g at 300 K).`,
      [kt('Gibbs energy', 'G = H − TS; the criterion of spontaneity at constant temperature and pressure is ΔG < 0.'), kt('Helmholtz energy', 'A = U − TS; the criterion of spontaneity at constant temperature and volume is ΔA < 0.')],
      [fm(r`G = H - TS`, 'Gibbs energy'), fm(r`A = U - TS`, 'Helmholtz energy'), fm(r`G = A + pV`, 'Relation between G and A'), fm(r`\Delta G = \Delta A + \Delta n_g RT`, 'For ideal gases')],
      table(['', 'Gibbs energy', 'Helmholtz energy'], [['Definition', 'H − TS', 'U − TS'], ['Constant', 'T and p', 'T and V'], ['Spontaneous', 'ΔG < 0', 'ΔA < 0'], ['Equilibrium', 'ΔG = 0', 'ΔA = 0']], 'Table comparing Gibbs and Helmholtz energies'),
      [3],
    ),
    sec(
      '5. Criteria of spontaneity and the crossover temperature',
      r`$\Delta G = \Delta H - T\Delta S$. **(−, +):** always spontaneous. **(+, −):** never. **(−, −):** spontaneous at low T, below $T = \Delta H/\Delta S$. **(+, +):** spontaneous at high T, above $T = \Delta H/\Delta S$ (use consistent units).

Examples: N₂O₄ → 2NO₂ (ΔH = +${f1(RX.N2O4.h)} kJ, ΔS = +${f1(RX.N2O4.s)} J K⁻¹): ΔG° at 298 K = ${sg(RX.N2O4.g298, 2)} kJ, spontaneous above ${f0(RX.N2O4.Tc)} K. 2NO + O₂ → 2NO₂ (ΔH = ${sg(RX.NO.h)}, ΔS = ${sg(RX.NO.s)}): spontaneous below ${f0(RX.NO.Tc)} K. MgCO₃ → MgO + CO₂ (+${f1(RX.MgCO3.h)} kJ, +${f1(RX.MgCO3.s)} J K⁻¹): above ${f0(RX.MgCO3.Tc)} K.`,
      [kt('Crossover temperature', 'The temperature T = ΔH / ΔS at which ΔG = 0 and the direction of spontaneity changes.')],
      [fm(r`\Delta G = \Delta H - T\Delta S`, 'Gibbs equation'), fm(r`T = \frac{\Delta H}{\Delta S}`, 'Temperature at which ΔG = 0')],
      V.gibbsT,
      [3],
    ),
    sec(
      '6. ΔG° and the equilibrium constant; the third law',
      r`At equilibrium ΔG = 0 and $\Delta G^\circ = -RT\ln K = -2.303RT\log K$. ΔG° < 0: K > 1; ΔG° > 0: K < 1; ΔG° = 0: K = 1. At 298 K, 2.303 RT = 5.706 kJ mol⁻¹: ΔG° = −28.5 kJ gives log K = 4.99; ethanoic acid, Ka = 1.8 × 10⁻⁵, has ΔG° = +27.1 kJ mol⁻¹.

**Third law:** the entropy of a perfect crystalline substance is **zero at the absolute zero**. It allows **absolute entropies** to be tabulated (S°: diamond ${S0.diamond}, H₂O(l) ${S0.H2Ol}, H₂O(g) ${S0.H2Og} J K⁻¹ mol⁻¹), and $\Delta S^\circ = \sum S^\circ(\text{products}) - \sum S^\circ(\text{reactants})$.`,
      [kt('Standard Gibbs energy change', 'The Gibbs energy change when reactants in their standard states change completely to products in their standard states.'), kt('Third law of thermodynamics', 'The entropy of a perfect crystalline substance is zero at the absolute zero of temperature.')],
      [fm(r`\Delta G^\circ = -2.303\,RT\log K`, 'Standard Gibbs energy change and equilibrium constant')],
      V.gk,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Dividing ΔH in kJ by T and quoting J K⁻¹ (convert to J first), or mixing kJ and J in ΔH − TΔS.
- Using the actual heat of an irreversible change in q/T instead of the reversible heat.
- Saying the entropy of the system must increase in a spontaneous change (it is the universe).
- Using T in °C, or ΔG° in kJ with R in J, in ΔG° = −2.303 RT log K.
- Forgetting to mention constant T and p for ΔG, and constant T and V for ΔA.
- Stating the third law without "perfect crystalline" and "absolute zero".

**How marks are usually awarded**
- ΔS at a phase change: convert ΔH to J (1), divide by T (1), unit (1).
- ΔG = ΔH − TΔS: consistent units (1), value with sign (1), conclusion about spontaneity (1).
- Crossover temperature: ΔG = 0 (1), T = ΔH / ΔS (1), direction above or below (1).
- ΔG° and K: 2.303 RT in joules (1), log K with sign (1), K (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why is the first law inadequate for predicting the direction of change?', 'It only conserves energy; heat flow from cold to hot would also conserve it, and ΔH < 0 is neither necessary nor sufficient.', 'concept', 1),
    fc(2, 'Define a spontaneous process.', 'A process that occurs of its own accord under the given conditions, in a definite direction, without continuous outside help.', 'definition', 1),
    fc(3, 'Give two examples of spontaneous and two of non-spontaneous processes.', 'Spontaneous: heat from hot to cold, gas into a vacuum. Non-spontaneous: gas compressing itself, water flowing uphill.', 'example', 1),
    fc(4, 'Give two endothermic spontaneous changes.', 'Melting of ice above 273 K; dissolving of ammonium nitrate in water.', 'example', 1),
    fc(5, 'State the Clausius form of the second law.', 'Heat cannot flow by itself from a colder body to a hotter body.', 'definition', 1),
    fc(6, 'State the second law in terms of entropy.', 'The entropy of the universe increases in a spontaneous process.', 'definition', 1),
    fc(7, 'What is a reversible process?', 'One carried out in infinitesimal steps with the system in equilibrium with its surroundings at every stage.', 'definition', 1),
    fc(8, 'What is entropy?', 'A state function that measures the disorder of a system; ΔS = q_rev / T.', 'definition', 2),
    fc(9, 'Why is entropy a state function?', 'Its change depends only on the initial and final states, not on the path.', 'concept', 2),
    fc(10, 'Unit of entropy and of molar entropy?', 'J K⁻¹ and J K⁻¹ mol⁻¹.', 'fact', 2),
    fc(11, 'Sign of ΔS for melting, boiling, dissolving a salt?', 'Positive in all three (more disorder).', 'fact', 2),
    fc(12, 'Sign of ΔS for 2NO₂(g) → N₂O₄(g)?', 'Negative: fewer moles of gas.', 'example', 2),
    fc(13, 'ΔS at a melting or boiling point?', r`$\Delta S = \Delta H / T$, with ΔH in J mol⁻¹.`, 'formula', 2),
    fc(14, 'Entropies of fusion of ice and vaporisation of water?', '22.0 and 109.1 J K⁻¹ mol⁻¹.', 'fact', 2),
    fc(15, 'ΔS for the isothermal reversible expansion of an ideal gas?', r`$\Delta S = nR\ln(V_2/V_1)$.`, 'formula', 2),
    fc(16, 'ΔS of the surroundings for a process with enthalpy change ΔH at T?', r`$\Delta S_{surr} = -\Delta H / T$.`, 'formula', 2),
    fc(17, 'Criterion of spontaneity using the entropy of the universe?', 'ΔS(universe) = ΔS(system) + ΔS(surroundings) > 0.', 'concept', 2),
    fc(18, 'What is the thermal death of the universe?', 'The predicted final state of maximum entropy and uniform temperature, with no heat flow and no work obtainable from heat.', 'definition', 2),
    fc(19, 'Define the Gibbs free energy.', 'G = H − TS; at constant T and p a process is spontaneous if ΔG < 0.', 'definition', 3),
    fc(20, 'Define the Helmholtz free energy.', 'A = U − TS; at constant T and V a process is spontaneous if ΔA < 0.', 'definition', 3),
    fc(21, 'Relationship between G and A?', 'G = A + pV, so ΔG = ΔA + Δn_g RT for ideal gases.', 'formula', 3),
    fc(22, 'What does −ΔG represent?', 'The maximum useful (non-expansion) work obtainable at constant T and p.', 'concept', 3),
    fc(23, 'The Gibbs equation?', r`$\Delta G = \Delta H - T\Delta S$.`, 'formula', 3),
    fc(24, 'ΔH negative, ΔS positive: when spontaneous?', 'At all temperatures.', 'fact', 3),
    fc(25, 'ΔH positive, ΔS negative: when spontaneous?', 'At no temperature.', 'fact', 3),
    fc(26, 'ΔH and ΔS both positive: when spontaneous?', 'At high temperature, above T = ΔH / ΔS.', 'fact', 3),
    fc(27, 'ΔH and ΔS both negative: when spontaneous?', 'At low temperature, below T = ΔH / ΔS.', 'fact', 3),
    fc(28, 'Crossover temperature of N₂O₄ → 2NO₂ (+57.2 kJ, +175.9 J K⁻¹)?', 'T = 57 200 / 175.9 = 325 K; spontaneous above.', 'example', 3),
    fc(29, 'Relation between ΔG° and K?', r`$\Delta G^\circ = -2.303RT\log K$.`, 'formula', 4),
    fc(30, 'What does a negative ΔG° imply about K?', 'K > 1: products favoured at equilibrium.', 'concept', 4),
    fc(31, 'Value of 2.303 RT at 298 K?', '5.706 kJ mol⁻¹ (5706 J mol⁻¹).', 'fact', 4),
    fc(32, 'State the third law of thermodynamics.', 'The entropy of a perfect crystalline substance is zero at the absolute zero of temperature.', 'definition', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
