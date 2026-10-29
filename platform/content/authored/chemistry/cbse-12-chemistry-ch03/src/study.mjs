// ch03 Chemical Kinetics — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V, tangentPlot, zeroPlot, firstPlot, mbPlot, arrPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Kinetics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Rate of a reaction and factors affecting it',
      r`The **rate** of a reaction is the change in concentration of a reactant or product per unit time (unit $\text{mol L}^{-1}\ \text{s}^{-1}$; for gases, $\text{atm s}^{-1}$). For $\mathrm{R} \rightarrow \mathrm{P}$: average rate $= -\dfrac{\Delta[\ce{R}]}{\Delta t} = \dfrac{\Delta[\ce{P}]}{\Delta t}$; the **instantaneous rate** is the slope of the tangent to the concentration–time curve, $-\dfrac{d[\ce{R}]}{dt}$.

For $\ce{aA + bB -> cC + dD}$, rate $= -\dfrac{1}{a}\dfrac{\Delta[\ce{A}]}{\Delta t} = -\dfrac{1}{b}\dfrac{\Delta[\ce{B}]}{\Delta t} = \dfrac{1}{c}\dfrac{\Delta[\ce{C}]}{\Delta t} = \dfrac{1}{d}\dfrac{\Delta[\ce{D}]}{\Delta t}$.

**Factors:** concentration (or pressure) of reactants, temperature, catalyst, surface area of solids, nature of reactants (and, for photochemical reactions, light).`,
      [kt('Rate of reaction', 'Change in concentration of a reactant or product per unit time, divided by its coefficient.'), kt('Instantaneous rate', 'Rate at a particular moment: the slope of the tangent to the concentration–time curve.')],
      [fm(r`\text{Rate} = -\dfrac{1}{a}\dfrac{\Delta[\ce{A}]}{\Delta t} = \dfrac{1}{c}\dfrac{\Delta[\ce{C}]}{\Delta t}`, 'Rate in terms of species')],
      tangentPlot,
      [1],
    ),
    sec(
      '2. Rate law, order and molecularity',
      r`**Rate law:** rate $= k[\ce{A}]^x[\ce{B}]^y$, with $x$ and $y$ found **experimentally** (they need not equal the coefficients). $k$ is the **rate constant**: the rate at unit concentrations; it depends on temperature, not on concentration.

**Order** $= x + y$; it may be 0, a whole number or a fraction. Unit of $k$ for order $n$: $(\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$ — zero order $\text{mol L}^{-1}\ \text{s}^{-1}$, first $\text{s}^{-1}$, second $\text{L mol}^{-1}\ \text{s}^{-1}$.

**Method of initial rates:** compare runs in which only one concentration changes: $\dfrac{r_2}{r_1} = \left(\dfrac{[\ce{A}]_2}{[\ce{A}]_1}\right)^x$.

**Molecularity** is the number of reacting species colliding in an **elementary** step: 1, 2 or (rarely) 3; never zero or fractional. For a complex reaction, the **slowest step** is **rate-determining**; e.g. iodide-catalysed decomposition of $\ce{H2O2}$: slow $\ce{H2O2 + I- -> H2O + IO-}$, fast $\ce{H2O2 + IO- -> H2O + I- + O2}$, so rate $= k[\ce{H2O2}][\ce{I-}]$.`,
      [kt('Rate law', 'Expression of the rate in terms of reactant concentrations raised to experimentally determined powers.'), kt('Order of reaction', 'Sum of the powers of the concentrations in the rate law.'), kt('Molecularity', 'Number of reacting species taking part in an elementary step.'), kt('Rate-determining step', 'The slowest step in a reaction mechanism, which controls the overall rate.')],
      [fm(r`\text{Rate} = k[\ce{A}]^x[\ce{B}]^y`, 'Rate law'), fm(r`\text{unit of } k = (\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}`, 'Units of k')],
      table(['', 'Order', 'Molecularity'], [['Basis', 'Experiment', 'Mechanism (elementary step)'], ['Values', '0, whole, fractional', '1, 2, 3 only'], ['Complex reactions', 'Defined overall', 'For each step']], 'Table comparing order and molecularity'),
      [2],
    ),
    sec(
      '3. Integrated rate equations and half-life',
      r`**Zero order:** $[\ce{R}] = [\ce{R}]_0 - kt$; $[\ce{R}]$ vs $t$ is a straight line of slope $-k$; $t_{1/2} = \dfrac{[\ce{R}]_0}{2k}$. Examples: $\ce{2NH3 -> N2 + 3H2}$ on hot platinum at high pressure; decomposition of HI on gold.

**First order:** $\ln[\ce{R}] = \ln[\ce{R}]_0 - kt$, or $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$; $\log[\ce{R}]$ vs $t$ is a straight line of slope $-k/2.303$; $t_{1/2} = \dfrac{0.693}{k}$, **independent of $[\ce{R}]_0$**. After $n$ half-lives, $[\ce{R}] = [\ce{R}]_0/2^n$. Examples: radioactive decay, decomposition of $\ce{N2O5}$, hydrogenation of ethene. For a gas-phase reaction $\mathrm{A(g)} \rightarrow \mathrm{B(g)} + \mathrm{C(g)}$ followed by total pressure, $k = \dfrac{2.303}{t}\log\dfrac{p_0}{2p_0 - p_t}$.

**Pseudo-first-order:** one reactant in large excess (e.g. water in the acid hydrolysis of ethyl ethanoate, inversion of cane sugar) so that rate $\approx k'[\text{other reactant}]$.`,
      [kt('Half-life', 'Time for the concentration of a reactant to fall to half its initial value.'), kt('Pseudo-first-order reaction', 'A higher-order reaction that behaves as first order because one reactant is in large excess.')],
      [fm(r`[\ce{R}] = [\ce{R}]_0 - kt`, 'Zero order'), fm(r`k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}`, 'First order'), fm(r`t_{1/2} = \dfrac{0.693}{k}`, 'First-order half-life')],
      firstPlot,
      [3],
      [zeroPlot],
    ),
    sec(
      '4. Temperature dependence: the Arrhenius equation',
      r`For many reactions a **10 K rise roughly doubles** the rate. **Arrhenius equation:** $k = Ae^{-E_\text{a}/RT}$, where $A$ is the frequency factor and $E_\text{a}$ the activation energy; $e^{-E_\text{a}/RT}$ is the fraction of molecules with energy at least $E_\text{a}$. $\ln k = \ln A - \dfrac{E_\text{a}}{RT}$: a plot of $\ln k$ against $1/T$ is a straight line of slope $-E_\text{a}/R$.

Two temperatures: $\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$, with $R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$.

**Activation energy** is the extra energy reactants need to form the **activated complex** at the top of the energy profile. At higher temperature, the Maxwell–Boltzmann distribution spreads out and the fraction of molecules beyond $E_\text{a}$ rises sharply.

**Catalyst:** provides an alternative path of lower $E_\text{a}$; is unchanged at the end; does **not** change $\Delta H$, $\Delta G$ or $K$; speeds up forward and backward reactions equally.`,
      [kt('Activation energy', 'Minimum extra energy that reacting molecules must have to form the activated complex.'), kt('Activated complex', 'Unstable arrangement of atoms at the top of the energy barrier.'), kt('Catalyst', 'A substance that increases the rate by providing a path of lower activation energy and is unchanged at the end.')],
      [fm(r`k = A\,e^{-E_\text{a}/RT}`, 'Arrhenius equation'), fm(r`\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)`, 'Two temperatures')],
      V.profile,
      [4],
      [mbPlot, arrPlot],
    ),
    sec(
      '5. Collision theory',
      r`Reactant molecules behave as hard spheres; a reaction happens only through **effective collisions**: those with energy at least the **threshold energy** and with **proper orientation**. Rate $= P\,Z_\text{AB}\,e^{-E_\text{a}/RT}$, where $Z_\text{AB}$ is the collision frequency and $P$ the probability (steric) factor.

Raising the concentration increases $Z_\text{AB}$; raising the temperature increases $Z_\text{AB}$ slightly and the energetic fraction greatly; a catalyst lowers $E_\text{a}$. **Limitation:** molecules are treated as structureless spheres, so $P$ is an empirical correction.`,
      [kt('Effective collision', 'A collision with enough energy and the correct orientation to form products.'), kt('Threshold energy', 'Minimum total energy colliding molecules must have for an effective collision.'), kt('Steric factor', 'Probability factor P that allows for the fraction of collisions with suitable orientation.')],
      [fm(r`\text{Rate} = P\,Z_\text{AB}\,e^{-E_\text{a}/RT}`, 'Collision theory')],
      V.orient,
      [5],
      [flow('LR', [['a', 'Collision'], ['b', 'Energy ≥ threshold?'], ['c', 'Correct orientation?'], ['d', 'Effective: products form'], ['e', 'Bounce apart']], [['a', 'b'], ['b', 'c', 'yes'], ['b', 'e', 'no'], ['c', 'd', 'yes'], ['c', 'e', 'no']], 'Decision flow for a collision: it is effective only if the energy reaches the threshold and the orientation is correct; otherwise the molecules bounce apart')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Taking the order from the coefficients of the overall equation.
- Forgetting to divide by the coefficient (and the minus sign) when relating rates of different species.
- Using $t_{1/2} = 0.693/k$ for a zero-order reaction.
- Inverting the ratio inside the logarithm in $k = \\dfrac{2.303}{t}\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}$.
- Using kJ with $R = 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1}$, or °C instead of K in the Arrhenius equation.
- Saying a catalyst shifts the equilibrium or changes $\\Delta H$.
- Calling molecularity zero or fractional.

**How marks are usually awarded**
- 1-mark items: correct option, order, unit of k or definition.
- Numericals (2–3 marks): correct formula (½–1) + substitution (1) + answer with unit (½–1).
- Initial-rate problems: order w.r.t. each reactant (1 each) + rate law and k with unit (1).
- 5-mark answers: derivation of the first-order equation or half-life, a labelled graph, and a numerical.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define the rate of a reaction.', 'Change in concentration of a reactant or product per unit time (divided by its coefficient).', 'definition', 1),
    fc(2, 'Why the minus sign for reactants in a rate expression?', 'Their concentration decreases, so Δ[R] is negative; the minus keeps the rate positive.', 'concept', 1),
    fc(3, 'How is the instantaneous rate found from a graph?', 'From the slope of the tangent to the concentration–time curve at that moment.', 'concept', 1),
    fc(4, 'Rate for 2HI → H₂ + I₂ in terms of HI?', r`Rate $= -\dfrac{1}{2}\dfrac{\Delta[\ce{HI}]}{\Delta t}$.`, 'formula', 1),
    fc(5, 'Five factors affecting the rate?', 'Concentration, temperature, catalyst, surface area, nature of reactants.', 'fact', 1),
    fc(6, 'What is a rate law?', r`Rate $= k[\ce{A}]^x[\ce{B}]^y$ with powers found by experiment.`, 'definition', 2),
    fc(7, 'Define order of reaction.', 'Sum of the powers of concentration terms in the rate law.', 'definition', 2),
    fc(8, 'Unit of k for first order?', r`$\text{s}^{-1}$.`, 'fact', 2),
    fc(9, 'Unit of k for zero order and second order?', r`Zero: $\text{mol L}^{-1}\ \text{s}^{-1}$. Second: $\text{L mol}^{-1}\ \text{s}^{-1}$.`, 'fact', 2),
    fc(10, 'Define molecularity.', 'Number of reacting species colliding in an elementary step (1, 2 or 3).', 'definition', 2),
    fc(11, 'Can molecularity be zero or fractional?', 'No — only order can be zero or fractional.', 'concept', 2),
    fc(12, 'What is the rate-determining step?', 'The slowest step of a mechanism; it controls the overall rate.', 'definition', 2),
    fc(13, 'Doubling [A] quadruples the rate. Order in A?', 'Second order (2² = 4).', 'example', 2),
    fc(14, 'Integrated zero-order equation?', r`$[\ce{R}] = [\ce{R}]_0 - kt$.`, 'formula', 3),
    fc(15, 'Integrated first-order equation (log form)?', r`$k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$.`, 'formula', 3),
    fc(16, 'Half-life of a zero-order reaction?', r`$t_{1/2} = \dfrac{[\ce{R}]_0}{2k}$ — proportional to $[\ce{R}]_0$.`, 'formula', 3),
    fc(17, 'Half-life of a first-order reaction?', r`$t_{1/2} = \dfrac{0.693}{k}$ — independent of $[\ce{R}]_0$.`, 'formula', 3),
    fc(18, 'Fraction left after 3 half-lives (first order)?', '1/8 (12.5%).', 'example', 3),
    fc(19, 'Which plot is a straight line for first order?', 'ln[R] (or log[R]) against t.', 'diagram', 3),
    fc(20, 'What is a pseudo-first-order reaction?', 'A higher-order reaction that behaves as first order because one reactant is in large excess (e.g. ester hydrolysis in water).', 'definition', 3),
    fc(21, 'Give an example of a zero-order reaction.', 'Decomposition of ammonia on a hot platinum surface at high pressure.', 'example', 3),
    fc(22, 'State the Arrhenius equation.', r`$k = Ae^{-E_\text{a}/RT}$.`, 'formula', 4),
    fc(23, 'Define activation energy.', 'Minimum extra energy reactants need to form the activated complex.', 'definition', 4),
    fc(24, 'Why does a 10 K rise roughly double the rate?', 'The fraction of molecules with energy ≥ Ea roughly doubles.', 'concept', 4),
    fc(25, 'Slope of the ln k against 1/T plot?', r`$-E_\text{a}/R$.`, 'diagram', 4),
    fc(26, 'Two-temperature Arrhenius form?', r`$\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$.`, 'formula', 4),
    fc(27, 'What does a catalyst change and not change?', 'Lowers Ea and speeds both directions; does not change ΔH, ΔG or K.', 'concept', 4),
    fc(28, 'Two conditions for an effective collision?', 'Energy at least the threshold energy, and proper orientation.', 'concept', 5),
    fc(29, 'What does the steric factor P account for?', 'The fraction of collisions with suitable orientation.', 'definition', 5),
    fc(30, 'Limitation of collision theory?', 'It treats molecules as hard spheres and ignores their structure.', 'fact', 5),
    fc(31, 'Exam tip: units in Arrhenius problems', 'Use Ea in J with R = 8.314 J K⁻¹ mol⁻¹ and T in kelvin.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
