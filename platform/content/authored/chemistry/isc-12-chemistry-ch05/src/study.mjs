// ISC 12 Chemistry ch05 Rate of Reaction and Rate Laws — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { tangentPlot, zeroPlot, firstPlot, logPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Rate of Reaction and Rate Laws — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Rate of reaction',
      r`**Chemical kinetics** studies reaction rates, the factors that affect them and reaction mechanisms. **Ionic reactions** (e.g. Ag⁺ + Cl⁻ → AgCl) are very fast because no bonds need breaking; **molecular reactions** are slower because covalent bonds must break.

**Average rate** $= -\Delta[\ce{R}]/\Delta t = \Delta[\ce{P}]/\Delta t$; **instantaneous rate** $= -d[\ce{R}]/dt$, found as minus the slope of the tangent to the concentration–time curve. For $\ce{aA + bB -> cC + dD}$: rate $= -\frac{1}{a}\frac{d[\ce{A}]}{dt} = -\frac{1}{b}\frac{d[\ce{B}]}{dt} = \frac{1}{c}\frac{d[\ce{C}]}{dt} = \frac{1}{d}\frac{d[\ce{D}]}{dt}$. Units: mol L⁻¹ s⁻¹.`,
      [kt('Rate of reaction', 'Change in concentration of a reactant or product per unit time, divided by its stoichiometric coefficient.'), kt('Instantaneous rate', 'The rate at a particular moment, equal to minus the slope of the tangent to the concentration–time curve.')],
      [fm(r`\text{Rate} = -\frac{1}{a}\frac{d[\ce{A}]}{dt} = \frac{1}{c}\frac{d[\ce{C}]}{dt}`, 'Rate in terms of each species')],
      tangentPlot,
      [1],
    ),
    sec(
      '2. Factors affecting rate; law of mass action',
      r`**Factors:** nature of reactants (ionic fast, covalent slower); surface area (powders faster); concentration or pressure (more collisions); temperature (rate roughly doubles per 10 K rise); catalyst (lower activation energy); radiation (photochemical reactions such as H₂ + Cl₂ in sunlight, photosynthesis, fading of dyes).

**Law of mass action** (Guldberg and Waage): at constant temperature, the rate of a reaction is proportional to the product of the **active masses** of the reactants, each raised to its stoichiometric coefficient. Active mass = molar concentration; for pure solids and liquids it is taken as 1. Strictly valid for elementary reactions.`,
      [kt('Active mass', 'Molar concentration of a substance; taken as unity for pure solids and liquids.'), kt('Law of mass action', 'Rate is proportional to the product of the active masses of reactants, each raised to its stoichiometric coefficient.')],
      [],
      table(['Factor', 'Effect on rate'], [['Larger surface area', 'Increases'], ['Higher concentration', 'Increases'], ['Rise in temperature', 'Increases (about ×2 per 10 K)'], ['Catalyst', 'Increases (lower Ea)'], ['Light (photochemical)', 'Starts or speeds reaction']], 'Table of factors and their effect on rate'),
      [2],
    ),
    sec(
      '3. Rate law, order and units of k',
      r`**Rate law:** rate $= k[\ce{A}]^x[\ce{B}]^y$, with $x$, $y$ found **experimentally** (not from coefficients). **Rate constant** $k$: rate at unit concentrations; depends on temperature and catalyst, not on concentration. **Order** $= x + y$: may be 0, a whole number or a fraction.

**Method of initial rates:** compare runs in which only one concentration changes; rate ratio = (concentration ratio)ⁿ.

**Units of k:** $(\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$ — zero order mol L⁻¹ s⁻¹; first order s⁻¹; second order L mol⁻¹ s⁻¹; third order L² mol⁻² s⁻¹.`,
      [kt('Rate constant', 'The proportionality constant in the rate law; equal to the rate when all concentrations are 1 mol L⁻¹.'), kt('Order of reaction', 'The sum of the powers of the concentration terms in the experimental rate law.')],
      [fm(r`\text{Rate} = k[\ce{A}]^x[\ce{B}]^y`, 'Rate law'), fm(r`\text{unit of } k = (\text{mol L}^{-1})^{1-n}\,\text{s}^{-1}`, 'Units of k')],
      table(['Order', 'Unit of k'], [['0', 'mol L⁻¹ s⁻¹'], ['1', 's⁻¹'], ['2', 'L mol⁻¹ s⁻¹'], ['3', 'L² mol⁻² s⁻¹']], 'Table of units of the rate constant'),
      [3],
    ),
    sec(
      '4. Zero-order reactions',
      r`Rate $= k$. Integrated: $[\ce{R}] = [\ce{R}]_0 - kt$; $k = ([\ce{R}]_0 - [\ce{R}])/t$. Plot of [R] against t: straight line, slope $-k$. Half-life $t_{1/2} = [\ce{R}]_0/2k$ (proportional to initial concentration). Examples: decomposition of NH₃ on hot Pt at high pressure; enzyme reactions at saturation.`,
      [kt('Zero-order reaction', 'A reaction whose rate is independent of reactant concentration.')],
      [fm(r`[\ce{R}] = [\ce{R}]_0 - kt`, 'Zero-order integrated equation'), fm(r`t_{1/2} = \frac{[\ce{R}]_0}{2k}`, 'Zero-order half-life')],
      zeroPlot,
      [4],
    ),
    sec(
      '5. First-order reactions',
      r`**Derivation:** $-d[\ce{R}]/dt = k[\ce{R}]$ → $d[\ce{R}]/[\ce{R}] = -k\,dt$ → $\ln([\ce{R}]_0/[\ce{R}]) = kt$, so $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$ and $[\ce{R}] = [\ce{R}]_0e^{-kt}$. Plot of log[R] against t: straight line, slope $-k/2.303$.

**Half-life:** $t_{1/2} = 0.693/k$, independent of $[\ce{R}]_0$; $k$ is also independent of initial concentration. After $n$ half-lives, $[\ce{R}] = [\ce{R}]_0/2^n$. Time for 99.9% reaction ≈ $10\,t_{1/2}$.

Examples: radioactive decay, decomposition of N₂O₅, elimination of many drugs. **Pseudo-first-order:** one reactant in large excess (acid hydrolysis of an ester in water; inversion of cane sugar).`,
      [kt('Half-life', 'The time taken for the concentration of a reactant to fall to half its initial value.'), kt('Pseudo-first-order reaction', 'A reaction of higher order that behaves as first order because one reactant is in large excess.')],
      [fm(r`k = \frac{2.303}{t}\log\frac{[\ce{R}]_0}{[\ce{R}]}`, 'First-order integrated equation'), fm(r`t_{1/2} = \frac{0.693}{k}`, 'First-order half-life')],
      firstPlot,
      [5],
      [logPlot],
    ),
    sec(
      '6. Molecularity, mechanism and the rate-determining step',
      r`**Elementary reaction:** one step; **complex reaction:** several steps (mechanism). **Molecularity:** number of reacting species colliding in an elementary step — 1, 2 or (rarely) 3, never 0 or fractional; defined only for elementary steps. **Order:** experimental, for the overall reaction; may be 0 or fractional.

The **slowest step** is the **rate-determining step**; the rate law follows from it. Intermediates are eliminated using a fast pre-equilibrium. Example: NO₂ + CO → NO + CO₂ at low T: slow step 2NO₂ → NO₃ + NO gives rate = k[NO₂]².`,
      [kt('Molecularity', 'The number of reacting species taking part in an elementary step.'), kt('Rate-determining step', 'The slowest step in a reaction mechanism, which controls the overall rate.')],
      [],
      table(['', 'Order', 'Molecularity'], [['Source', 'Experiment', 'Mechanism'], ['Zero possible?', 'Yes', 'No'], ['Fraction possible?', 'Yes', 'No'], ['Applies to', 'Overall reaction', 'Elementary step']], 'Table comparing order and molecularity'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing orders from the coefficients of the overall equation.
- Forgetting to divide rates by stoichiometric coefficients.
- Using the percentage reacted instead of the fraction remaining in first-order calculations.
- Saying the half-life of a first-order reaction depends on the initial concentration.
- Including an intermediate in the final rate law.

**How marks are usually awarded**
- Derivation of the first-order equation (3 marks): differential rate law, integration with limits, final form.
- Numericals: equation, substitution with units, answer with units of k or time.
- Initial-rate problems: order with respect to each reactant with reasoning, rate law, k with units.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why are ionic reactions in solution fast?', 'Ions are free and combine on collision; no bonds must be broken.', 'concept', 1),
    fc(2, 'Average vs instantaneous rate?', 'Average: Δ over an interval. Instantaneous: −slope of the tangent at a moment.', 'concept', 1),
    fc(3, 'Rate for N₂ + 3H₂ → 2NH₃?', '−d[N₂]/dt = −⅓ d[H₂]/dt = ½ d[NH₃]/dt.', 'formula', 1),
    fc(4, 'Unit of rate?', 'mol L⁻¹ s⁻¹ (atm s⁻¹ for gases).', 'fact', 1),
    fc(5, 'Six factors affecting rate?', 'Nature, surface area, concentration, temperature, catalyst, radiation.', 'fact', 2),
    fc(6, 'Example of radiation affecting rate?', 'H₂ + Cl₂ explodes in sunlight; photosynthesis.', 'example', 2),
    fc(7, 'Law of mass action?', 'Rate ∝ product of active masses of reactants raised to their coefficients.', 'definition', 2),
    fc(8, 'Active mass of a pure solid?', 'Taken as 1 (constant).', 'fact', 2),
    fc(9, 'How are orders in a rate law found?', 'By experiment (e.g. method of initial rates).', 'concept', 3),
    fc(10, 'What does k depend on?', 'Temperature and catalyst; not concentration.', 'concept', 3),
    fc(11, 'Unit of k for second order?', 'L mol⁻¹ s⁻¹.', 'fact', 3),
    fc(12, 'Order with unit mol L⁻¹ s⁻¹?', 'Zero order.', 'fact', 3),
    fc(13, 'Doubling [A] quadruples rate: order in A?', 'Two.', 'example', 3),
    fc(14, 'Zero-order integrated equation?', '[R] = [R]₀ − kt.', 'formula', 4),
    fc(15, 'Zero-order half-life?', '[R]₀/2k — proportional to [R]₀.', 'formula', 4),
    fc(16, 'Example of zero order?', 'NH₃ decomposing on hot Pt at high pressure.', 'example', 4),
    fc(17, 'Straight-line plot for zero order?', '[R] against t, slope −k.', 'concept', 4),
    fc(18, 'First-order integrated equation?', 'k = (2.303/t) log([R]₀/[R]).', 'formula', 5),
    fc(19, 'First-order half-life?', '0.693/k, independent of [R]₀.', 'formula', 5),
    fc(20, 'Straight-line plot for first order?', 'log[R] against t, slope −k/2.303.', 'concept', 5),
    fc(21, 'Fraction left after n half-lives?', '1/2ⁿ.', 'formula', 5),
    fc(22, 'Time for 99.9% of a first-order reaction?', 'About 10 half-lives.', 'fact', 5),
    fc(23, 'Pseudo-first-order example?', 'Acid hydrolysis of ethyl ethanoate in excess water.', 'example', 5),
    fc(24, 'First step of the first-order derivation?', '−d[R]/dt = k[R] → d[R]/[R] = −k dt.', 'formula', 5),
    fc(25, 'Molecularity?', 'Number of species colliding in one elementary step (1, 2 or 3).', 'definition', 6),
    fc(26, 'Can molecularity be zero?', 'No — only order can be zero or fractional.', 'concept', 6),
    fc(27, 'Rate-determining step?', 'The slowest step of a mechanism; it fixes the rate law.', 'definition', 6),
    fc(28, 'Why are termolecular steps rare?', 'Three particles seldom collide at once with the right energy and orientation.', 'concept', 6),
    fc(29, 'Rate law for NO₂ + CO at low T?', 'k[NO₂]² (from slow step 2NO₂ → NO₃ + NO).', 'example', 6),
    fc(30, 'How are intermediates removed from a rate law?', 'Express them using a fast pre-equilibrium.', 'concept', 6),
    fc(31, 'Exam tip: “x% reacted”', '[R] left = (100 − x)% of [R]₀.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
