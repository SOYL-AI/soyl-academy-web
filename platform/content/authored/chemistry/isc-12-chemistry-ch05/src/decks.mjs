// ISC 12 Chemistry ch05 Rate of Reaction and Rate Laws — two decks: Part 1 (t01–t03) rate, factors, law of mass
// action, rate law, order and units of k; Part 2 (t04–t06) zero- and first-order reactions (derivation, half-life),
// molecularity and mechanism.
import { sl, deck, table, flow, plot, r } from './lib.mjs';

const r4 = (x) => +x.toFixed(4);
// [R] = 0.6 e^(−0.04 t); tangent at t = 15 s: [R] = 0.3293, slope = −0.01317.
const decay = (t) => 0.6 * Math.exp(-0.04 * t);
export const tangentPlot = plot(
  {
    x: { min: 0, max: 50, label: 'Time (s)' },
    y: { min: 0, max: 0.7, label: 'Concentration of reactant (mol L⁻¹)' },
    series: [{ label: 'Concentration of R', kind: 'line', points: [0, 5, 10, 15, 20, 25, 30, 40, 50].map((t) => [t, r4(decay(t))]) }],
    functions: [{ expr: '0.5269 - 0.01317x', label: 'Tangent at t = 15 s', domain: [0, 40] }],
    points: [{ at: [15, 0.3293], label: 'slope of tangent = −(instantaneous rate)', on_curve: false }],
  },
  'Concentration of a reactant falling along a curve from 0.6 towards zero over 50 seconds, with a straight tangent touching the curve at 15 seconds; the steepness of the tangent gives the instantaneous rate',
  'Illustrative data. Instantaneous rate = −(slope of the tangent).',
);
export const zeroPlot = plot(
  {
    x: { min: 0, max: 30, label: 'Time (min)' },
    y: { min: 0, max: 0.6, label: 'Concentration of reactant (mol L⁻¹)' },
    functions: [{ expr: '0.50 - 0.02x', label: 'Zero order: straight line, slope −k', domain: [0, 25] }],
  },
  'Zero-order reaction: the concentration falls in a straight line from 0.50 mol per litre to zero at 25 minutes; the slope is minus k',
  'k = 0.02 mol L⁻¹ min⁻¹ in this example.',
);
const first = (t) => 0.64 * Math.pow(0.5, t / 8);
export const firstPlot = plot(
  {
    x: { min: 0, max: 32, label: 'Time (min)' },
    y: { min: 0, max: 0.7, label: 'Concentration of reactant (mol L⁻¹)' },
    series: [{ label: 'First order, half-life 8 min', kind: 'line', points: [0, 4, 8, 12, 16, 20, 24, 28, 32].map((t) => [t, r4(first(t))]) }],
    points: [
      { at: [8, 0.32], label: 'half', on_curve: false },
      { at: [16, 0.16], label: 'quarter', on_curve: false },
      { at: [24, 0.08], label: 'eighth', on_curve: false },
    ],
  },
  'First-order decay: the concentration halves every 8 minutes, from 0.64 to 0.32, 0.16 and 0.08 at 8, 16 and 24 minutes',
  'Each half-life takes the same time, whatever the starting concentration.',
);
export const logPlot = plot(
  {
    x: { min: 0, max: 40, label: 'Time (min)' },
    y: { min: -1.6, max: 0, label: 'log [R]' },
    functions: [{ expr: '-0.1938 - 0.03x', label: 'log[R] = log[R]₀ − kt ÷ 2.303', domain: [0, 40] }],
  },
  'For a first-order reaction, a graph of log of concentration against time is a straight line sloping down; its slope equals minus k divided by 2.303',
  'Illustrative: slope −0.03 min⁻¹, so k = 2.303 × 0.03 = 0.069 min⁻¹.',
);

export const deck1 = deck({
  part: 1,
  title: 'Rate of Reaction and Rate Laws — Part 1: Rate, factors and rate laws',
  goals: [
    'Express average and instantaneous rates and relate the rates of change of different species',
    'Explain slow and fast reactions in terms of bonds, and the effect of each factor on rate',
    'State the law of mass action',
    'Deduce order and rate constant from initial-rate data and derive the units of k',
  ],
  slides: [
    sl('title', 'Rate of reaction', {
      b: 'Part 1 — how fast reactions go and how the rate depends on concentration.',
      v: table(['Reaction', 'Typical speed'], [['AgNO₃ + NaCl → AgCl precipitate', 'Instantaneous'], ['Fading of a dye in sunlight', 'Hours to days'], ['Rusting of iron', 'Weeks to months'], ['Formation of coal', 'Millions of years']], 'Table of reactions with very different speeds'),
      n: 'Namaste! Chemical kinetics is the study of how fast reactions go and the steps by which they happen. Thermodynamics tells us whether a reaction can happen; kinetics tells us how quickly. A silver chloride precipitate forms in an instant, while coal forms over millions of years. Kinetics helps industry choose conditions, doctors plan doses and food scientists keep food fresh.',
    }),
    sl('concept', 'Slow and fast reactions', {
      b: '**Ionic reactions** in solution are very fast: ions are already free, and no bonds need to be broken, so they react on collision. **Molecular (covalent) reactions** are slower: covalent bonds must be broken and new ones formed, which needs energy and suitable orientation.',
      v: table(['Type', 'Why', 'Example'], [['Very fast', 'Oppositely charged ions combine; no bond breaking', 'Ag⁺ + Cl⁻ → AgCl; H⁺ + OH⁻ → H₂O'], ['Moderate', 'Few bonds broken; measurable rate', 'Decomposition of H₂O₂; hydrolysis of an ester'], ['Very slow', 'Strong bonds, high energy barrier', 'Rusting; H₂ + O₂ at room temperature']], 'Table of fast, moderate and slow reactions explained by bonds'),
      n: 'Why are some reactions so fast? When solutions of silver nitrate and sodium chloride are mixed, silver and chloride ions are already free and simply combine as they meet. In molecular reactions, strong covalent bonds have to be broken before new ones form, and that needs energy, so they go more slowly. Hydrogen and oxygen can stay mixed for years at room temperature.',
    }),
    sl('concept', 'Rate of reaction', {
      b: r`The **rate** is the change in concentration of a reactant or product per unit time. For $\mathrm{R} \rightarrow \mathrm{P}$, the **average rate** over an interval is $-\Delta[\ce{R}]/\Delta t = \Delta[\ce{P}]/\Delta t$; the minus sign makes the rate positive because $[\ce{R}]$ falls. Units: $\text{mol L}^{-1}\ \text{s}^{-1}$; for gases, atm s⁻¹.`,
      m: [r`r_\text{av} = -\frac{\Delta[\ce{R}]}{\Delta t} = \frac{\Delta[\ce{P}]}{\Delta t}, \qquad r_\text{inst} = -\frac{d[\ce{R}]}{dt}`],
      v: table(['Point', 'Explanation'], [['Minus sign for reactants', 'Δ[R] is negative; rate must be positive'], ['Rate changes with time', 'Reactants are used up, so most reactions slow down'], ['Units', 'mol L⁻¹ s⁻¹ (or min⁻¹)']], 'Table of key points about the rate of reaction'),
      n: 'The rate tells us how quickly a reactant’s concentration falls or a product’s rises. Because the reactant’s concentration decreases, we put a minus sign in front to keep the rate positive. Rates are usually given in moles per litre per second. Most reactions slow down as they go, because the reactants are being used up.',
    }),
    sl('diagram', 'Average and instantaneous rate', {
      b: r`The **average rate** is the slope of a chord between two times. The **instantaneous rate** is minus the slope of the **tangent** to the concentration–time curve at that moment.`,
      v: tangentPlot,
      n: 'Here the reactant concentration falls along a curve. An average rate uses two points and hides what happens in between. To find the rate at one instant, say fifteen seconds, draw a tangent touching the curve there and measure its slope: the instantaneous rate is minus that slope. The curve is steepest at the start, when the reaction is fastest.',
    }),
    sl('concept', 'Rate in terms of each species', {
      b: r`For $\ce{aA + bB -> cC + dD}$, divide each rate of change by its coefficient to get **one** rate of reaction.`,
      m: [r`\text{Rate} = -\frac{1}{a}\frac{\Delta[\ce{A}]}{\Delta t} = -\frac{1}{b}\frac{\Delta[\ce{B}]}{\Delta t} = \frac{1}{c}\frac{\Delta[\ce{C}]}{\Delta t} = \frac{1}{d}\frac{\Delta[\ce{D}]}{\Delta t}`],
      v: table(['In N₂ + 3H₂ → 2NH₃', 'Relative rate of change'], [['N₂ used', '1 part'], ['H₂ used', '3 parts'], ['NH₃ formed', '2 parts'], ['Rate of reaction', '−Δ[N₂]/Δt = −⅓Δ[H₂]/Δt = ½Δ[NH₃]/Δt']], 'Table of relative rates for the synthesis of ammonia'),
      n: 'In the synthesis of ammonia, hydrogen is used three times as fast as nitrogen, and ammonia forms twice as fast as nitrogen is used. To get a single rate for the reaction, we divide each rate of change by its coefficient, with a minus sign for the reactants. Then every species gives the same value.',
    }),
    sl('example', 'Worked example: average rate and related rates', {
      b: r`**Problem.** For $\ce{2N2O5 -> 4NO2 + O2}$, $[\ce{N2O5}]$ falls from $0.240$ to $0.180\ \text{mol L}^{-1}$ in $20\ \text{min}$. Find (a) the average rate of disappearance of N₂O₅, (b) the rate of reaction and (c) the rate of formation of NO₂.

**(a)** $-\Delta[\ce{N2O5}]/\Delta t = 0.060 \div 20 = 3.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{min}^{-1}$.

**(b)** Rate $= \tfrac{1}{2} \times 3.0 \times 10^{-3} = 1.5 \times 10^{-3}\ \text{mol L}^{-1}\ \text{min}^{-1}$.

**(c)** $\Delta[\ce{NO2}]/\Delta t = 4 \times 1.5 \times 10^{-3} = 6.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{min}^{-1}$.`,
      v: table(['Species', 'Coefficient', 'Rate of change / mol L⁻¹ min⁻¹'], [['N₂O₅ (used)', '2', '3.0 × 10⁻³'], ['NO₂ (formed)', '4', '6.0 × 10⁻³'], ['O₂ (formed)', '1', '1.5 × 10⁻³']], 'Table of rates for the decomposition of dinitrogen pentoxide'),
      n: 'The concentration of dinitrogen pentoxide falls by six hundredths of a mole per litre in twenty minutes, three thousandths per minute. Dividing by its coefficient, two, gives the rate of the reaction itself, one and a half thousandths. Nitrogen dioxide, with a coefficient of four, forms four times as fast as that: six thousandths of a mole per litre per minute.',
    }),
    sl('check', 'Quick check: relating rates', {
      b: 'Relate the rate of use of one species to the rate of formation of another.',
      n: 'Quick check. Divide each rate of change by its coefficient in the balanced equation; the results must be equal.',
      chk: 'relate-mcq',
    }),
    sl('concept', 'Factors affecting the rate', {
      b: 'The rate depends on the **nature of reactants**, **surface area**, **concentration**, **temperature**, a **catalyst** and **radiation** (light).',
      v: table(['Factor', 'Effect', 'Example'], [['Nature of reactants', 'Ionic fast; covalent slower', 'AgCl precipitation vs burning of coal'], ['Surface area', 'Powders react faster', 'Coal dust explosions; powdered zinc with acid'], ['Concentration (pressure)', 'More collisions per second', 'Charcoal burns faster in pure O₂'], ['Temperature', 'Rate roughly doubles for a 10 K rise', 'Food spoils faster outside a fridge'], ['Catalyst', 'Lower activation energy path', 'Fe in the Haber process; enzymes'], ['Radiation', 'Light supplies energy to start photochemical reactions', 'H₂ + Cl₂ explodes in sunlight; photosynthesis; fading of dyes']], 'Table of factors affecting reaction rate with examples'),
      n: 'Several factors change the rate. Ionic reactions are faster than molecular ones. Powders react faster than lumps because more surface is exposed. Higher concentration means more collisions. Raising the temperature by ten degrees roughly doubles many rates. A catalyst provides an easier path. And light can start photochemical reactions: a mixture of hydrogen and chlorine is stable in the dark but explodes in sunlight.',
    }),
    sl('concept', 'Law of mass action and active mass', {
      b: r`**Law of mass action** (Guldberg and Waage): at constant temperature, the rate of a reaction is directly proportional to the product of the **active masses** of the reactants, each raised to the power of its stoichiometric coefficient. **Active mass** = molar concentration (mol L⁻¹) for solutions and gases; for pure solids and liquids it is taken as constant (unity).`,
      m: [r`\ce{aA + bB -> products}: \quad \text{Rate} \propto [\ce{A}]^a[\ce{B}]^b`],
      v: table(['Law of mass action', 'Experimental rate law'], [['Powers equal coefficients', 'Powers found by experiment'], ['Strictly true only for elementary reactions', 'True for all reactions'], ['Theoretical', 'Practical']], 'Table comparing the law of mass action with the experimental rate law'),
      n: 'The law of mass action says that the rate is proportional to the product of the active masses of the reactants, each raised to its coefficient. Active mass simply means molar concentration; for pure solids and liquids it is taken as one. The law is exact only for elementary reactions. For most real reactions, the powers in the rate law have to be found by experiment, as we see next.',
    }),
    sl('concept', 'Rate law, rate constant and order', {
      b: r`The **rate law** gives rate $= k[\ce{A}]^x[\ce{B}]^y$, with $x$ and $y$ found **by experiment**. The **rate constant** $k$ is the rate when all concentrations are 1 mol L⁻¹; it depends on temperature (and catalyst), not on concentration. **Order** $= x + y$; it may be 0, 1, 2, 3 or a fraction.`,
      v: table(['Reaction', 'Rate law', 'Order'], [[r`$\ce{2NO + O2 -> 2NO2}$`, r`$k[\ce{NO}]^2[\ce{O2}]$`, '3'], [r`$\ce{H2 + Br2 -> 2HBr}$`, r`$k[\ce{H2}][\ce{Br2}]^{1/2}$`, '1½'], [r`$\ce{2N2O5 -> 4NO2 + O2}$`, r`$k[\ce{N2O5}]$`, '1'], [r`$\ce{2NH3 -> N2 + 3H2}$ (on hot Pt)`, r`$k$`, '0']], 'Table of reactions with experimental rate laws and orders'),
      n: 'The rate law tells us how the rate depends on each concentration. The powers come from experiment, not from the balanced equation: dinitrogen pentoxide has a coefficient of two, yet its decomposition is first order; hydrogen and bromine give an order of one and a half. The rate constant is characteristic of the reaction at a given temperature. Adding the powers gives the overall order.',
    }),
    sl('concept', 'Units of the rate constant', {
      b: r`For an $n$th-order reaction, $k = \text{rate}/[\ce{A}]^n$, so its unit is $(\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$.`,
      m: [r`\text{unit of } k = (\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}`],
      v: table(['Order', 'Unit of k'], [['0', 'mol L⁻¹ s⁻¹'], ['1', 's⁻¹'], ['2', 'L mol⁻¹ s⁻¹'], ['3', 'L² mol⁻² s⁻¹']], 'Table of units of the rate constant for orders zero to three'),
      n: 'Because the rate always has units of moles per litre per second, the unit of k depends on the order. For zero order, k has the same unit as the rate; for first order, it is simply per second; for second order, litres per mole per second. So the unit of a rate constant reveals the order of the reaction.',
    }),
    sl('check', 'Quick check: units of k', {
      b: 'Identify the order of a reaction from the unit of its rate constant.',
      n: 'Quick check. Per second alone means first order; moles per litre per second means zero order.',
      chk: 'units-mcq',
    }),
    sl('example', 'Worked example: method of initial rates', {
      b: r`**Problem.** For $\ce{P + Q -> products}$ at 300 K:

| Expt | [P] / M | [Q] / M | Initial rate / M min⁻¹ |
|---|---|---|---|
| 1 | 0.20 | 0.10 | 1.2 × 10⁻³ |
| 2 | 0.40 | 0.10 | 2.4 × 10⁻³ |
| 3 | 0.20 | 0.30 | 1.08 × 10⁻² |

**Step 1.** 1 → 2: [P] ×2, rate ×2 → first order in P.

**Step 2.** 1 → 3: [Q] ×3, rate ×9 → second order in Q. Rate $= k[\ce{P}][\ce{Q}]^2$; overall order 3.

**Step 3.** $k = 1.2 \times 10^{-3} \div (0.20 \times 0.10^2) = 0.60\ \text{L}^2\ \text{mol}^{-2}\ \text{min}^{-1}$.`,
      v: flow('LR', [['a', 'Pick runs where only [P] changes'], ['b', 'Rate ratio = (conc. ratio)^x'], ['c', 'Repeat for Q'], ['d', 'k from any run']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for the method of initial rates'),
      n: 'Compare experiments in which only one concentration changes. Doubling P doubles the rate, so the reaction is first order in P. Tripling Q multiplies the rate by nine, which is three squared, so it is second order in Q. Substituting any experiment gives k, nought point six, with units for a third-order reaction: litres squared per mole squared per minute.',
    }),
    sl('example', 'Worked example: predicting a new rate', {
      b: r`**Problem.** For rate $= k[\ce{P}][\ce{Q}]^2$, how does the rate change if [P] is halved and [Q] is tripled?

**Step 1.** Factor $= \tfrac{1}{2} \times 3^2 = 4.5$.

**Step 2.** The rate becomes $4.5$ times the original.`,
      v: table(['Change', 'Factor'], [['[P] halved (first order)', '½'], ['[Q] tripled (second order)', '3² = 9'], ['Overall', '4.5']], 'Table of the factors by which the rate changes'),
      n: 'Treat each change as a factor raised to its own power. Halving P, which is first order, multiplies the rate by one half. Tripling Q, which is second order, multiplies it by nine. Together the rate goes up four and a half times. This factor method is quicker and safer than substituting numbers into the whole rate law.',
    }),
    sl('check', 'Quick check: order from data', {
      b: 'Deduce the order with respect to a reactant from how the rate changes.',
      n: 'Quick check. If doubling a concentration multiplies the rate by four, the order in that reactant is two.',
      chk: 'order-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Ionic reactions are fast; reactions needing covalent bonds to break are slower.',
        r`Rate $= -\frac{1}{a}\frac{\Delta[\ce{A}]}{\Delta t} = \frac{1}{c}\frac{\Delta[\ce{C}]}{\Delta t}$; instantaneous rate from the tangent.`,
        'Factors: nature, surface area, concentration, temperature, catalyst, radiation.',
        'Law of mass action: rate ∝ product of active masses raised to their coefficients.',
        r`Rate law $k[\ce{A}]^x[\ce{B}]^y$ (experimental); order $= x + y$; unit of $k$ $= (\text{mol L}^{-1})^{1-n}\text{s}^{-1}$.`,
      ],
      v: table(['Term', 'Key point'], [['Rate', 'Change in concentration per unit time'], ['Rate constant', 'Rate at unit concentrations; depends on T'], ['Order', 'Experimental; may be 0 or fractional']], 'Summary table of Part 1 terms'),
      n: 'Let us sum up Part 1. Reaction rates range from instant to geological, depending largely on whether bonds must be broken. The rate is the change in concentration per unit time, divided by the coefficient. It depends on several factors, including light. The law of mass action gives the idea of active mass, and the experimental rate law gives the order and the units of the rate constant.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Use a minus sign for reactants and divide by coefficients.',
        'Never take orders from the balanced equation unless the reaction is elementary.',
        'In initial-rate problems, compare runs where only one concentration changes.',
        'State the unit of k with every value.',
      ],
      v: table(['Slip', 'Fix'], [['Order = coefficients', 'Order from experiment'], ['Rate of reaction = rate of change of NO₂', 'Divide by its coefficient'], ['k depends on concentration', 'k depends on temperature only']], 'Table of three common slips in Part 1 and fixes'),
      n: 'A few tips. Always divide by coefficients and use a minus sign for reactants. Never assume orders from the balanced equation. In initial-rate problems, choose runs where only one concentration changes. And always write the unit of the rate constant.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Rate of Reaction and Rate Laws — Part 2: Integrated rate laws, half-life and mechanism',
  goals: [
    'Use the integrated rate equation for a zero-order reaction and interpret its graph',
    'Derive the integrated rate equation and half-life of a first-order reaction',
    'Solve problems on rate constant, half-life and time for a given fraction to react',
    'Distinguish order from molecularity and write the rate law from the slowest step of a mechanism',
  ],
  slides: [
    sl('title', 'Concentration and time', {
      b: 'Part 2 — how concentration changes with time, and the steps by which reactions happen.',
      v: flow('LR', [['a', 'Rate law'], ['b', 'Integrated rate equation'], ['c', 'Half-life'], ['d', 'Molecularity and mechanism']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of topics in Part 2'),
      n: 'In Part 2 we answer practical questions. How long until half a drug has left the blood? How much pollutant remains after a day? To answer, we integrate the rate law to get concentration as a function of time for zero- and first-order reactions. Then we look inside reactions at their elementary steps and see how the slowest step controls the rate law.',
    }),
    sl('concept', 'Zero-order reactions', {
      b: r`Rate $= -\dfrac{d[\ce{R}]}{dt} = k$. Integrating from $[\ce{R}]_0$ at $t = 0$: $[\ce{R}] = [\ce{R}]_0 - kt$. Half-life $t_{1/2} = [\ce{R}]_0/2k$ (proportional to the initial concentration). Examples: decomposition of NH₃ on hot platinum at high pressure; some enzyme reactions at saturation; H₂ + Cl₂ photochemical reaction.`,
      m: [r`[\ce{R}] = [\ce{R}]_0 - kt, \qquad k = \frac{[\ce{R}]_0 - [\ce{R}]}{t}, \qquad t_{1/2} = \frac{[\ce{R}]_0}{2k}`],
      v: table(['Feature', 'Zero order'], [['Straight-line plot', '[R] against t'], ['Slope', '−k'], ['Unit of k', 'mol L⁻¹ s⁻¹'], ['Half-life', 'Proportional to [R]₀']], 'Table of features of a zero-order reaction'),
      n: 'In a zero-order reaction the rate does not depend on concentration. A gas decomposing on a fully covered hot metal surface is the classic case: adding more gas cannot make it go faster. So the concentration falls by the same amount every minute, giving a straight line. Its half-life is proportional to the starting concentration.',
    }),
    sl('diagram', 'Zero order on a graph', {
      b: r`A plot of $[\ce{R}]$ against $t$ is a straight line with intercept $[\ce{R}]_0$ and slope $-k$; the reaction stops when the reactant is used up.`,
      v: zeroPlot,
      n: 'Here the concentration starts at nought point five mole per litre and falls by two hundredths every minute, reaching zero at twenty five minutes. The graph is a straight line of slope minus k. Compare it with the curved first-order graph on the next slides.',
    }),
    sl('example', 'Worked example: a zero-order reaction', {
      b: r`**Problem.** A zero-order reaction has $k = 0.025\ \text{mol L}^{-1}\ \text{min}^{-1}$. Starting at $[\ce{R}]_0 = 0.30\ \text{mol L}^{-1}$, find (a) $[\ce{R}]$ after 8 min, (b) the half-life and (c) the time for completion.

**(a)** $[\ce{R}] = 0.30 - 0.025 \times 8 = 0.10\ \text{mol L}^{-1}$.

**(b)** $t_{1/2} = 0.30 \div (2 \times 0.025) = 6.0\ \text{min}$.

**(c)** $t = 0.30 \div 0.025 = 12\ \text{min}$.`,
      v: table(['Quantity', 'Value'], [['[R] after 8 min', '0.10 mol L⁻¹'], ['Half-life', '6.0 min'], ['Time to finish', '12 min']], 'Table of results of the zero-order example'),
      n: 'For zero order the concentration simply falls by k every minute. After eight minutes it has fallen by nought point two, leaving nought point one. The half-life is the starting concentration divided by twice k, six minutes, and the reaction is complete after twelve minutes: exactly two half-lives, unlike a first-order reaction.',
    }),
    sl('check', 'Quick check: zero order', {
      b: 'Recognise a zero-order reaction from its graph or half-life.',
      n: 'Quick check. For zero order, concentration falls in a straight line and the half-life is proportional to the starting concentration.',
      chk: 'zero-mcq',
    }),
    sl('concept', 'First-order reactions: derivation', {
      b: r`Rate $= -\dfrac{d[\ce{R}]}{dt} = k[\ce{R}]$. Separating variables, $\dfrac{d[\ce{R}]}{[\ce{R}]} = -k\,dt$. Integrating with $[\ce{R}] = [\ce{R}]_0$ at $t = 0$: $\ln[\ce{R}] - \ln[\ce{R}]_0 = -kt$. Hence:`,
      m: [r`\ln\frac{[\ce{R}]_0}{[\ce{R}]} = kt \quad\Rightarrow\quad k = \frac{2.303}{t}\log\frac{[\ce{R}]_0}{[\ce{R}]}`, r`[\ce{R}] = [\ce{R}]_0\,e^{-kt}, \qquad \log[\ce{R}] = \log[\ce{R}]_0 - \frac{kt}{2.303}`],
      v: logPlot,
      n: 'For a first-order reaction, the rate is k times the concentration. Rearranging puts all the concentration terms on one side and time on the other. Integrating from time zero gives the natural log of the starting concentration over the present concentration equal to k t. Converting to common logs introduces the factor two point three zero three. A graph of log concentration against time is a straight line with slope minus k over two point three zero three.',
    }),
    sl('diagram', 'First-order decay and half-life', {
      b: r`The concentration falls exponentially and **halves in equal intervals of time**: the half-life $t_{1/2}$.`,
      v: firstPlot,
      n: 'Here the concentration starts at nought point six four, falls to nought point three two after eight minutes, to nought point one six after sixteen, and to nought point nought eight after twenty four. Each halving takes the same eight minutes, wherever we start. A constant half-life is the signature of a first-order reaction.',
    }),
    sl('concept', 'Half-life of a first-order reaction', {
      b: r`Put $[\ce{R}] = [\ce{R}]_0/2$ in the integrated equation: $t_{1/2} = \dfrac{2.303}{k}\log 2 = \dfrac{0.693}{k}$. The half-life — and $k$ — are **independent of the initial concentration**. After $n$ half-lives, $[\ce{R}] = [\ce{R}]_0/2^n$.`,
      m: [r`t_{1/2} = \frac{0.693}{k}`, r`[\ce{R}] = \frac{[\ce{R}]_0}{2^n}, \quad n = \frac{t}{t_{1/2}}`],
      v: table(['Order', 'Half-life', 'Depends on [R]₀?'], [['Zero', '[R]₀ ÷ 2k', 'Yes'], ['First', '0.693 ÷ k', 'No']], 'Table comparing zero- and first-order half-lives'),
      n: 'Setting the concentration to half its starting value in the integrated equation gives the half-life: nought point six nine three divided by k. It contains no concentration, so the half-life of a first-order reaction is the same whether we start with a little or a lot. After n half-lives, the concentration has fallen to one over two to the power n of its starting value.',
    }),
    sl('example', 'Worked example: time for a given fraction to react', {
      b: r`**Problem.** A first-order reaction has $k = 0.0577\ \text{min}^{-1}$. Find (a) its half-life and (b) the time for 90% of the reactant to react.

**(a)** $t_{1/2} = 0.693 \div 0.0577 = 12.0\ \text{min}$.

**(b)** 90% reacted: $[\ce{R}]_0/[\ce{R}] = 10$; $t = \dfrac{2.303}{0.0577}\log 10 = \dfrac{2.303}{0.0577} = 39.9\ \text{min}$.`,
      v: table(['Fraction reacted', 'Fraction left', 'Time / min'], [['50%', '0.50', '12.0'], ['75%', '0.25', '24.0'], ['90%', '0.10', '39.9'], ['99%', '0.01', '79.8']], 'Table of fraction reacted against time for the first-order example'),
      n: 'The half-life is nought point six nine three over nought point nought five seven seven, twelve minutes. For ninety percent to react, one tenth is left, so the ratio of starting to present concentration is ten, whose log is one. So the time is simply two point three zero three over k, about forty minutes. Notice that ninety nine percent takes exactly twice as long.',
    }),
    sl('example', 'Worked example: a drug in the blood', {
      b: r`**Problem.** An antibiotic is removed from the blood by a first-order process with a half-life of 5 h. A patient receives a dose giving 80 mg per litre of blood. What is the concentration after 20 h, and what is k?

**Step 1.** $n = 20 \div 5 = 4$; $[\ce{R}] = 80 \div 2^4 = 5.0\ \text{mg L}^{-1}$.

**Step 2.** $k = 0.693 \div 5 = 0.139\ \text{h}^{-1}$.`,
      v: flow('LR', [['a', '80 mg/L at dose'], ['b', '40 after 5 h'], ['c', '20 after 10 h'], ['d', '10 after 15 h'], ['e', '5 after 20 h']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the antibiotic halving every five hours'),
      n: 'Twenty hours is four half-lives of five hours. Halving four times takes eighty milligrams per litre down to five. The rate constant is nought point six nine three divided by five, about nought point one four per hour. Doctors use exactly this kind of calculation to decide how often a dose must be repeated.',
    }),
    sl('check', 'Quick check: half-life', {
      b: 'Use the half-life to decide the order or to find how much reactant remains.',
      n: 'Quick check. A half-life that does not depend on the starting concentration means first order.',
      chk: 'halflife-mcq',
    }),
    sl('two-column', 'Molecularity and order', {
      b: 'An **elementary reaction** occurs in a single step; a **complex reaction** occurs in several steps (its **mechanism**). **Molecularity** is the number of reacting species colliding in an elementary step.',
      cols: [
        '**Order**\n\n- Found by experiment\n- Sum of powers in the rate law\n- May be 0, a fraction or a whole number\n- Defined for the overall reaction',
        '**Molecularity**\n\n- Theoretical, from the mechanism\n- Number of species in one elementary step\n- Always 1, 2 or (rarely) 3; never 0 or fractional\n- Defined only for elementary steps',
      ],
      v: table(['Molecularity', 'Example of an elementary step'], [['Unimolecular', 'O₃ → O₂ + O'], ['Bimolecular', 'NO + O₃ → NO₂ + O₂'], ['Termolecular (rare)', '2NO + O₂ → 2NO₂']], 'Table of unimolecular, bimolecular and termolecular elementary steps'),
      n: 'Order and molecularity are easily confused. Order comes from experiment and can be zero or a fraction. Molecularity is simply the number of particles that collide in one elementary step, so it is always one, two or, rarely, three. Three-particle collisions are rare because three molecules seldom meet at the same instant with the right energy and orientation.',
    }),
    sl('concept', 'Mechanism and the rate-determining step', {
      b: 'In a complex reaction, the **slowest elementary step** controls the overall rate: the **rate-determining step**. The rate law follows from it.',
      m: [r`\text{Step 1 (slow): } \ce{NO2 + NO2 -> NO3 + NO}`, r`\text{Step 2 (fast): } \ce{NO3 + CO -> NO2 + CO2}`, r`\text{Overall: } \ce{NO2 + CO -> NO + CO2}; \quad \text{Rate} = k[\ce{NO2}]^2`],
      v: flow('LR', [['a', 'Step 1 (slow): 2NO₂ → NO₃ + NO'], ['b', 'Step 2 (fast): NO₃ + CO → NO₂ + CO₂'], ['c', 'Rate = k[NO₂]², zero order in CO']], [['a', 'b'], ['a', 'c']], 'Flow of a two-step mechanism with a slow first step'),
      n: 'Most reactions take place in several steps, like a queue at a ticket counter followed by a quick security check: the slow step sets the pace. For nitrogen dioxide reacting with carbon monoxide at low temperature, the slow first step involves two nitrogen dioxide molecules, so the rate law is k times the square of nitrogen dioxide, and carbon monoxide does not appear at all.',
    }),
    sl('example', 'Worked example: rate law from a mechanism', {
      b: r`**Problem.** The proposed mechanism for $\ce{2NO + Br2 -> 2NOBr}$ is: Step 1 (fast, equilibrium) $\ce{NO + Br2 <=> NOBr2}$; Step 2 (slow) $\ce{NOBr2 + NO -> 2NOBr}$. Deduce the rate law.

**Step 1.** Rate $= k_2[\ce{NOBr2}][\ce{NO}]$ (slow step).

**Step 2.** From the fast equilibrium, $[\ce{NOBr2}] = K[\ce{NO}][\ce{Br2}]$.

**Step 3.** Rate $= k_2K[\ce{NO}]^2[\ce{Br2}] = k[\ce{NO}]^2[\ce{Br2}]$: third order overall.`,
      v: table(['Step', 'Speed', 'Contribution'], [['NO + Br₂ ⇌ NOBr₂', 'Fast equilibrium', '[NOBr₂] = K[NO][Br₂]'], ['NOBr₂ + NO → 2NOBr', 'Slow', 'Rate = k₂[NOBr₂][NO]']], 'Table of the two steps and their contributions to the rate law'),
      n: 'Start from the slow step: the rate equals k two times the intermediate times nitric oxide. The intermediate cannot appear in the final rate law, so we use the fast equilibrium before it to replace it with K times nitric oxide times bromine. The result is second order in nitric oxide and first order in bromine, third order overall, which matches experiment.',
    }),
    sl('check', 'Quick check: molecularity and mechanism', {
      b: 'Decide which statement about molecularity or the rate-determining step is correct.',
      n: 'Quick check. Molecularity is a small whole number for one elementary step; the slow step sets the rate law.',
      chk: 'molecularity-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`Zero order: $[\ce{R}] = [\ce{R}]_0 - kt$; $t_{1/2} = [\ce{R}]_0/2k$.`,
        r`First order: $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$; $t_{1/2} = 0.693/k$, independent of $[\ce{R}]_0$.`,
        'log[R] against t is a straight line for first order; [R] against t for zero order.',
        'Molecularity: species in one elementary step (1, 2, 3); order: experimental.',
        'The slowest step of a mechanism determines the rate law.',
      ],
      v: table(['Order', 'Integrated form', 'Half-life'], [['0', '[R] = [R]₀ − kt', '[R]₀/2k'], ['1', 'k = (2.303/t) log([R]₀/[R])', '0.693/k']], 'Summary table of integrated rate equations and half-lives'),
      n: 'Let us sum up Part 2. Integrating the rate law gives concentration against time: a straight line for zero order and an exponential decay for first order, whose half-life does not depend on the starting concentration. Molecularity counts the particles in one elementary step, while order is found by experiment, and the slowest step of a mechanism sets the rate law.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Use log (base 10) with the factor 2.303 consistently.',
        'For “x% reacted”, [R] = (100 − x)% of [R]₀.',
        'Half-life independent of [R]₀ → first order; proportional → zero order.',
        'Eliminate intermediates from rate laws using a fast pre-equilibrium.',
      ],
      v: table(['Slip', 'Fix'], [['Using 90% as [R]', '90% reacted leaves 10%'], ['t½ of first order depends on [R]₀', 'It does not'], ['Molecularity can be zero', 'Never zero']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Use common logs with the factor two point three zero three. When a percentage has reacted, the concentration left is the rest. Recognise the order from how the half-life behaves. And remember to remove intermediates from a rate law using the fast equilibrium step.',
    }),
  ],
});
