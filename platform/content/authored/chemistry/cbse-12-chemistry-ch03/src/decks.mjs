// ch03 Chemical Kinetics — two decks: Part 1 (t01–t02) rate, factors, rate law, order and molecularity;
// Part 2 (t03–t05) integrated rate equations and half-life, Arrhenius equation, catalysts, collision theory.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { PROFILE, ORIENT } from './svgs.mjs';

export const V = {
  profile: svgV(PROFILE, 'Energy profile of an exothermic reaction with a tall hump for the uncatalysed path and a lower dashed hump for the catalysed path; arrows show the activation energies and the enthalpy change', 'Schematic, not to scale.'),
  orient: svgV(ORIENT, 'An effective collision, in which a hydroxide ion strikes the carbon of bromomethane opposite the bromine and forms methanol, and an ineffective collision at the bromine end in which the molecules bounce apart', 'Schematic: real molecules are three-dimensional.'),
};

const r4 = (x) => +x.toFixed(4);
// [R] = 0.8 e^(−0.05 t); tangent at t = 10 s.
const decay = (t) => 0.8 * Math.exp(-0.05 * t);
export const tangentPlot = plot(
  {
    x: { min: 0, max: 40, label: 'Time (s)' },
    y: { min: 0, max: 0.9, label: 'Concentration of reactant (mol per L)' },
    series: [{ label: 'Concentration of R', kind: 'line', points: [0, 5, 10, 15, 20, 25, 30, 35, 40].map((t) => [t, r4(decay(t))]) }],
    functions: [{ expr: '0.7279 - 0.02426x', label: 'Tangent at t = 10 s', domain: [0, 30] }],
    points: [{ at: [10, 0.4852], label: 'slope here = instantaneous rate', on_curve: false }],
  },
  'Concentration of a reactant falling along a curve from 0.8 towards zero over 40 seconds, with a straight tangent touching the curve at 10 seconds; the steepness of the tangent is the instantaneous rate',
  'Illustrative data. The rate is minus the slope of the tangent.',
);
export const zeroPlot = plot(
  {
    x: { min: 0, max: 25, label: 'Time (min)' },
    y: { min: 0, max: 0.45, label: 'Concentration of reactant (mol per L)' },
    functions: [{ expr: '0.40 - 0.02x', label: 'Zero order: straight line, slope −k', domain: [0, 20] }],
  },
  'Zero-order reaction: the concentration falls in a straight line from 0.40 mol per litre to zero at 20 minutes; the slope is minus k',
  'k = 0.02 mol L⁻¹ min⁻¹ in this example.',
);
const first = (t) => 0.8 * Math.pow(0.5, t / 10);
export const firstPlot = plot(
  {
    x: { min: 0, max: 40, label: 'Time (min)' },
    y: { min: 0, max: 0.9, label: 'Concentration of reactant (mol per L)' },
    series: [{ label: 'First order, half-life 10 min', kind: 'line', points: [0, 5, 10, 15, 20, 25, 30, 35, 40].map((t) => [t, r4(first(t))]) }],
    points: [
      { at: [10, 0.4], label: 'half', on_curve: false },
      { at: [20, 0.2], label: 'quarter', on_curve: false },
      { at: [30, 0.1], label: 'eighth', on_curve: false },
    ],
  },
  'First-order decay: the concentration halves every 10 minutes, from 0.8 to 0.4, 0.2 and 0.1 at 10, 20 and 30 minutes',
  'Each half-life takes the same time, whatever the starting concentration.',
);
const mb = (e, t) => Math.sqrt(e) * Math.exp(-e / t) / Math.pow(t, 1.5);
export const mbPlot = plot(
  {
    x: { min: 0, max: 8, label: 'Kinetic energy of molecules (arbitrary units)' },
    y: { min: 0, max: 0.5, label: 'Fraction of molecules' },
    series: [
      { label: 'Temperature T', kind: 'line', points: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8].map((e) => [e, r4(mb(e, 1))]) },
      { label: 'Temperature T + 10 K', kind: 'line', points: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8].map((e) => [e, r4(mb(e, 1.3))]) },
    ],
    vlines: [{ x: 4, label: 'Ea', dashed: true }],
  },
  'Distribution of molecular kinetic energies at two temperatures: at the higher temperature the curve is flatter and spread to higher energies, so a larger fraction of molecules lies beyond the activation energy line',
  'Illustrative curves; the temperature gap is exaggerated so that the difference is visible.',
);
export const arrPlot = plot(
  {
    x: { min: 3.0, max: 3.5, label: '1000 ÷ T (per kelvin)' },
    y: { min: -10, max: 0, label: 'ln k' },
    functions: [{ expr: '20 - 8x', label: 'slope = −Ea ÷ (1000 R)', domain: [3.0, 3.5] }],
  },
  'Arrhenius plot: natural logarithm of the rate constant against one thousand divided by temperature is a straight line sloping downwards; its slope gives the activation energy',
  'Illustrative line with slope −8, so Ea = 8 × 1000 × 8.314 J mol⁻¹ ≈ 66.5 kJ mol⁻¹.',
);

export const deck1 = deck({
  part: 1,
  title: 'Chemical Kinetics — Part 1: Rates, rate laws and order',
  goals: [
    'Express the average and instantaneous rate of a reaction and relate the rates of change of different species',
    'Identify the factors that affect the rate of a reaction',
    'Write a rate law, find the order of a reaction from data and state the units of the rate constant',
    'Distinguish order from molecularity and explain the rate-determining step',
  ],
  slides: [
    sl('title', 'Chemical Kinetics', {
      b: 'Part 1 — how fast reactions go, how we measure it, and how the speed depends on concentration.',
      v: table(['Reaction', 'Speed'], [['Precipitation of silver chloride', 'Almost instant'], ['Rusting of an iron nail', 'Days to months'], ['Weathering of rocks', 'Thousands of years']], 'Table of three reactions with very different speeds: silver chloride precipitation almost instant, rusting over months, weathering over thousands of years'),
      n: 'Namaste! Thermodynamics tells us whether a reaction can happen. It does not tell us how fast. Mix silver nitrate with salt water and a white precipitate appears at once; an iron nail takes weeks to rust; rocks weather over thousands of years. Chemical kinetics is the study of reaction rates, the factors that change them and the steps by which reactions happen.',
    }),
    sl('concept', 'What is the rate of a reaction?', {
      b: r`The **rate** of a reaction is the change in concentration of a reactant or product per unit time. For $\mathrm{R} \rightarrow \mathrm{P}$, the **average rate** over an interval is:`,
      m: [r`r_\text{av} = -\dfrac{\Delta[\ce{R}]}{\Delta t} = +\dfrac{\Delta[\ce{P}]}{\Delta t}`],
      v: table(['Point', 'Why'], [['Minus sign for reactants', '[R] decreases, so Δ[R] is negative; rate must be positive'], ['Units', r`$\text{mol L}^{-1}\ \text{s}^{-1}$ (or per minute); for gases $\text{atm s}^{-1}$`], ['Rate changes with time', 'As reactants are used up, the reaction slows']], 'Table explaining the minus sign for reactants, the units of rate and why rate changes with time'),
      n: 'The rate of a reaction tells us how quickly the concentration of a reactant falls or a product rises. Because a reactant’s concentration decreases, its change is negative, so we put a minus sign in front to keep the rate positive. Rates are usually in moles per litre per second. And the rate is not constant: as reactants are used up, most reactions slow down.',
    }),
    sl('diagram', 'Average and instantaneous rate', {
      b: r`The **average rate** is the slope of the chord between two times. The **instantaneous rate** at a moment is the slope of the **tangent** to the concentration–time curve at that moment: $r = -\dfrac{d[\ce{R}]}{dt}$.`,
      v: tangentPlot,
      n: 'Here the reactant concentration falls along a curve. An average rate uses two points on the curve and hides what happens in between. To know the rate at one instant, say at ten seconds, we draw a tangent touching the curve there. How steeply the tangent falls is the instantaneous rate. Early on, the curve is steep and the reaction is fast; later it flattens and the reaction is slow.',
    }),
    sl('concept', 'Rate in terms of different species', {
      b: r`For $\ce{aA + bB -> cC + dD}$, the rates of change differ by the coefficients, so we divide each by its coefficient to get **one** rate of reaction.`,
      m: [r`\text{Rate} = -\dfrac{1}{a}\dfrac{\Delta[\ce{A}]}{\Delta t} = -\dfrac{1}{b}\dfrac{\Delta[\ce{B}]}{\Delta t} = \dfrac{1}{c}\dfrac{\Delta[\ce{C}]}{\Delta t} = \dfrac{1}{d}\dfrac{\Delta[\ce{D}]}{\Delta t}`],
      v: table(['Species in 2HI → H₂ + I₂', 'Rate of change', 'Divided by coefficient'], [['HI (reactant, 2)', 'Falls twice as fast as H₂ forms', 'Rate = −½ Δ[HI]/Δt'], ['H₂ (product, 1)', 'Rises', 'Rate = Δ[H₂]/Δt'], ['I₂ (product, 1)', 'Rises at the same rate as H₂', 'Rate = Δ[I₂]/Δt']], 'Table for the decomposition of hydrogen iodide showing that hydrogen iodide is used twice as fast as hydrogen or iodine form, so its rate is divided by two'),
      n: 'When two molecules of hydrogen iodide break down into one hydrogen and one iodine molecule, hydrogen iodide disappears twice as fast as each product appears. To get a single rate for the reaction, we divide each rate of change by its coefficient in the balanced equation, and use a minus sign for reactants. Then every species gives the same answer.',
    }),
    sl('example', 'Worked example: average rate', {
      b: r`**Problem.** In a reaction $\mathrm{R} \rightarrow \mathrm{P}$, $[\ce{R}]$ falls from $0.80$ to $0.50\ \text{mol L}^{-1}$ in $15\ \text{min}$. Find the average rate in $\text{mol L}^{-1}\ \text{min}^{-1}$ and in $\text{mol L}^{-1}\ \text{s}^{-1}$.

**Step 1.** $r_\text{av} = -\dfrac{0.50 - 0.80}{15} = \dfrac{0.30}{15} = 0.02$, so $0.02\ \text{mol L}^{-1}\ \text{min}^{-1}$.

**Step 2.** Per second: $\dfrac{0.02}{60} \approx 3.3 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Change in [R]', r`$-0.30\ \text{mol L}^{-1}$`], ['Time taken', '15 min'], ['Average rate', r`$0.02\ \text{mol L}^{-1}\ \text{min}^{-1}$`]], 'Table of the change in concentration, time and average rate in the worked example'),
      n: 'The concentration of R drops by zero point three mole per litre in fifteen minutes. Dividing, the average rate is zero point zero two mole per litre per minute. The minus sign in the definition cancels the negative change, so the rate is positive. To change to per second, divide by sixty. Always state the time unit you are using.',
    }),
    sl('example', 'Worked example: linking the rates of different species', {
      b: r`**Problem.** In $\ce{4NH3 + 5O2 -> 4NO + 6H2O}$, ammonia is used at $0.024\ \text{mol L}^{-1}\ \text{s}^{-1}$. Find the rate of the reaction, the rate of use of oxygen and the rate of formation of water.

**Step 1.** Rate of reaction $= \dfrac{1}{4} \times 0.024 = 0.006\ \text{mol L}^{-1}\ \text{s}^{-1}$.

**Step 2.** Oxygen: $5 \times 0.006 = 0.030\ \text{mol L}^{-1}\ \text{s}^{-1}$.

**Step 3.** Water: $6 \times 0.006 = 0.036\ \text{mol L}^{-1}\ \text{s}^{-1}$.`,
      v: table(['Species', 'Coefficient', 'Rate of change / mol L⁻¹ s⁻¹'], [['NH₃ (used)', '4', '0.024'], ['O₂ (used)', '5', '0.030'], ['NO (formed)', '4', '0.024'], ['H₂O (formed)', '6', '0.036']], 'Table of the coefficients and rates of change of ammonia, oxygen, nitrogen monoxide and water in the worked example'),
      n: 'First divide the ammonia rate by its coefficient, four, to get the rate of the reaction itself: six thousandths. Then multiply by each coefficient. Oxygen, with five, is used at thirty thousandths; water, with six, forms at thirty six thousandths; nitrogen monoxide, with four, forms at the same rate as ammonia is used. The ratios simply follow the balanced equation.',
    }),
    sl('check', 'Quick check: relating rates', {
      b: 'Use the balanced equation to relate the rate at which one species is used to the rate at which another forms.',
      n: 'Quick check. Divide each rate of change by its coefficient in the balanced equation; all of them must then be equal.',
      chk: 'rate-relation-mcq',
    }),
    sl('concept', 'Factors that affect the rate', {
      b: 'Rates depend on the **concentration** (or pressure) of reactants, **temperature**, the presence of a **catalyst**, the **surface area** of solids and the **nature** of the reactants.',
      v: table(['Factor', 'Effect', 'Everyday example'], [['Concentration', 'More collisions per second', 'Wood burns faster in pure oxygen than in air'], ['Temperature', 'More molecules have enough energy; rate roughly doubles for a 10 K rise', 'Food spoils faster outside the fridge'], ['Catalyst', 'Provides a path with lower activation energy', 'Enzymes in digestion'], ['Surface area', 'More particles exposed to react', 'Powdered sugar dissolves and burns faster than lumps'], ['Nature of reactants', 'Ionic reactions in solution are fast; bond-breaking is slower', 'Precipitation is instant; burning coal needs ignition']], 'Table of five factors affecting reaction rate with their effect and an everyday example'),
      n: 'Several factors change how fast a reaction goes. More concentrated reactants collide more often. Higher temperature gives more molecules enough energy to react, and for many reactions the rate about doubles for a ten degree rise. A catalyst opens an easier path. Powdered solids react faster than lumps because more surface is exposed. And some substances simply react faster than others.',
    }),
    sl('concept', 'The rate law and the rate constant', {
      b: r`The **rate law** expresses the rate in terms of reactant concentrations, each raised to a power found **by experiment**. The **rate constant** $k$ is the rate when every concentration is $1\ \text{mol L}^{-1}$; it depends on temperature but not on concentration.`,
      m: [r`\ce{aA + bB -> products}: \qquad \text{Rate} = k[\ce{A}]^x[\ce{B}]^y`],
      v: table(['Reaction', 'Experimental rate law'], [[r`$\ce{2NO + O2 -> 2NO2}$`, r`$k[\ce{NO}]^2[\ce{O2}]$`], [r`$\ce{CHCl3 + Cl2 -> CCl4 + HCl}$`, r`$k[\ce{CHCl3}][\ce{Cl2}]^{1/2}$`], [r`$\ce{2H2O2 -> 2H2O + O2}$ (with iodide)`, r`$k[\ce{H2O2}][\ce{I-}]$`]], 'Table of three reactions and their experimental rate laws, showing that exponents need not match the coefficients'),
      n: 'The rate law tells us exactly how the rate depends on each concentration. Each concentration is raised to a power, and these powers come from experiments, not from the balanced equation. Look at the second example: the power of chlorine is one half, although its coefficient is one. The rate constant, k, is a property of the reaction at a given temperature.',
    }),
    sl('concept', 'Order of a reaction', {
      b: r`The **order** is the sum of the powers in the rate law, $x + y$. The order with respect to one reactant is its own power. Order can be **0, 1, 2, 3 or a fraction**, and is found only by experiment.`,
      v: table(['Rate law', 'Order w.r.t. A', 'Order w.r.t. B', 'Overall order'], [[r`$k[\ce{A}]^2[\ce{B}]$`, '2', '1', '3'], [r`$k[\ce{A}][\ce{B}]^{1/2}$`, '1', '½', '1½'], [r`$k$`, '0', '0', '0'], [r`$k[\ce{A}]$`, '1', '0', '1']], 'Table of four rate laws with the order with respect to A and B and the overall order'),
      n: 'Add up the powers in the rate law and you get the overall order. A reaction can be first order in one reactant and zero order in another. Orders can even be fractions. In a zero-order reaction, the rate does not depend on concentration at all, as long as some reactant is left. Remember: order is an experimental quantity.',
    }),
    sl('concept', 'Units of the rate constant', {
      b: r`For an $n$th-order reaction, rate $= k[\ce{A}]^n$, so $k = \dfrac{\text{rate}}{[\ce{A}]^n}$ and its unit is $(\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$.`,
      v: table(['Order', 'Unit of k'], [['0', r`$\text{mol L}^{-1}\ \text{s}^{-1}$`], ['1', r`$\text{s}^{-1}$`], ['2', r`$\text{L mol}^{-1}\ \text{s}^{-1}$`], ['3', r`$\text{L}^2\ \text{mol}^{-2}\ \text{s}^{-1}$`]], 'Table of the units of the rate constant for zero, first, second and third order reactions'),
      n: 'Because the rate always has units of moles per litre per second, the units of the rate constant change with the order. For zero order, k has the same units as rate. For first order, it is simply per second. For second order, litres per mole per second. So if you are given the units of k, you can work out the order of the reaction.',
    }),
    sl('check', 'Quick check: order from units', {
      b: 'A rate constant is reported with a unit. Use it to find the order of the reaction.',
      n: 'Quick check. Compare the given unit with the table: which power of concentration must be divided out of the rate to leave this unit?',
      chk: 'units-order-mcq',
    }),
    sl('two-column', 'Order versus molecularity', {
      b: 'An **elementary** reaction happens in one step. Its **molecularity** is the number of reacting species that collide in that step: 1 (unimolecular), 2 (bimolecular) or 3 (termolecular, rare).',
      cols: [
        '**Order**\n\n- Found by experiment\n- Sum of powers in the rate law\n- Can be 0, a fraction or a whole number\n- Applies to the overall reaction',
        '**Molecularity**\n\n- A theoretical count\n- Number of species colliding in one elementary step\n- Always a whole number 1, 2 or 3; never 0\n- Has meaning only for an elementary step',
      ],
      v: table(['', 'Order', 'Molecularity'], [['Source', 'Experiment', 'Mechanism'], ['Can be zero?', 'Yes', 'No'], ['Can be fractional?', 'Yes', 'No'], ['For complex reactions', 'Defined', 'Only for each step']], 'Table comparing order and molecularity by source, whether they can be zero or fractional, and meaning for complex reactions'),
      n: 'Students often mix up order and molecularity. Order comes from experiment and can be zero or a fraction. Molecularity is simply how many particles collide in a single elementary step, so it can only be one, two or, rarely, three. For a reaction that happens in several steps, molecularity applies to each step separately, while the order describes the reaction as a whole.',
    }),
    sl('example', 'Worked example: order by the method of initial rates', {
      b: r`**Problem.** For $\ce{A + B -> products}$:

| Expt | $[\ce{A}]$ / M | $[\ce{B}]$ / M | Initial rate / M s⁻¹ |
|---|---|---|---|
| 1 | 0.10 | 0.10 | $2.0 \times 10^{-3}$ |
| 2 | 0.20 | 0.10 | $8.0 \times 10^{-3}$ |
| 3 | 0.10 | 0.20 | $4.0 \times 10^{-3}$ |

**Step 1.** Expts 1, 2: $[\ce{A}]$ doubles, rate ×4 → second order in A.

**Step 2.** Expts 1, 3: $[\ce{B}]$ doubles, rate ×2 → first order in B. Rate $= k[\ce{A}]^2[\ce{B}]$, overall order 3.

**Step 3.** $k = \dfrac{2.0 \times 10^{-3}}{0.10^2 \times 0.10} = 2.0\ \text{L}^2\ \text{mol}^{-2}\ \text{s}^{-1}$.`,
      v: flow('LR', [['a', 'Pick two runs where only [A] changes'], ['b', 'Ratio of rates = (ratio of [A]) to the power x'], ['c', 'Repeat for B to find y'], ['d', 'k from any run']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for the method of initial rates: compare runs where one concentration changes, find each power from the ratio of rates, then calculate k'),
      n: 'Compare experiments that change only one concentration. Doubling A, with B fixed, makes the rate four times larger, and two to the power two is four, so the reaction is second order in A. Doubling B makes the rate twice as large, so it is first order in B. Put any experiment into the rate law to find k, and its units follow from the overall order of three.',
    }),
    sl('example', 'Worked example: predicting a new rate', {
      b: r`**Problem.** For rate $= k[\ce{A}]^2[\ce{B}]$, what happens to the rate if $[\ce{A}]$ is doubled and $[\ce{B}]$ is halved?

**Step 1.** New rate $= k(2[\ce{A}])^2\left(\tfrac{1}{2}[\ce{B}]\right) = 4 \times \tfrac{1}{2}\,k[\ce{A}]^2[\ce{B}]$.

**Step 2.** So the rate becomes **twice** the original.`,
      v: table(['Change', 'Factor on rate'], [['[A] doubled (second order)', r`$2^2 = 4$`], ['[B] halved (first order)', r`$\tfrac{1}{2}$`], ['Overall', r`$4 \times \tfrac{1}{2} = 2$`]], 'Table showing that doubling A multiplies the rate by four, halving B multiplies it by one half, so overall the rate doubles'),
      n: 'Treat each concentration change as a separate factor raised to its own power. Doubling A, which is second order, multiplies the rate by four. Halving B, which is first order, multiplies the rate by one half. Four times one half is two, so the rate doubles. This factor method is quicker and safer than putting numbers into the whole rate law.',
    }),
    sl('concept', 'Complex reactions and the rate-determining step', {
      b: 'Most reactions happen in a sequence of elementary steps (the **mechanism**). The **slowest step** controls the overall rate: it is the **rate-determining step**, and the rate law reflects it.',
      m: [r`\text{Slow: } \ce{H2O2 + I- -> H2O + IO-}`, r`\text{Fast: } \ce{H2O2 + IO- -> H2O + I- + O2}`],
      v: flow('LR', [['a', 'Step 1 (slow): rate-determining'], ['b', 'Step 2 (fast)'], ['c', 'Rate = k[H₂O₂][I⁻], first order in each']], [['a', 'b'], ['a', 'c']], 'Flow: a slow first step followed by a fast second step; the rate law follows the slow step'),
      n: 'Think of a queue at a ticket counter followed by a quick security check: the slow counter sets the pace. In the decomposition of hydrogen peroxide catalysed by iodide ions, the first step, between hydrogen peroxide and iodide, is slow. So the rate law is first order in each of them, even though the overall equation shows two hydrogen peroxide molecules and no iodide at all.',
    }),
    sl('check', 'Quick check: molecularity', {
      b: 'Decide which statement about molecularity is correct.',
      n: 'Quick check. Remember that molecularity counts colliding species in a single elementary step, so think about which values it can and cannot take.',
      chk: 'molecularity-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        r`Rate $= -\dfrac{1}{a}\dfrac{\Delta[\ce{A}]}{\Delta t} = \dfrac{1}{c}\dfrac{\Delta[\ce{C}]}{\Delta t}$; instantaneous rate = slope of tangent.`,
        'Rate depends on concentration, temperature, catalyst, surface area and nature of reactants.',
        r`Rate law: rate $= k[\ce{A}]^x[\ce{B}]^y$; exponents from experiment; order $= x + y$.`,
        r`Unit of $k$: $(\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$.`,
        'Molecularity: species colliding in an elementary step; whole number 1–3. Order: experimental; may be 0 or fractional.',
        'The slowest step of a mechanism determines the rate law.',
      ],
      v: table(['Term', 'Key point'], [['Rate', 'Change in concentration per unit time'], ['Rate law', 'Found by experiment'], ['Order', 'Sum of powers; can be 0 or fractional'], ['Molecularity', 'Whole number for one elementary step']], 'Summary table of rate, rate law, order and molecularity'),
      n: 'Let us sum up Part 1. The rate of a reaction is the change in concentration per unit time, divided by the coefficient. Rates depend on concentration, temperature, catalysts and surface area. The rate law, found by experiment, gives the order of the reaction and the units of the rate constant. Molecularity applies only to elementary steps, and the slowest step controls the rate.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Put a minus sign before reactant terms and divide every term by its coefficient.',
        'Never take the order from the coefficients of the overall equation unless told the reaction is elementary.',
        'In initial-rate problems, compare two runs where only one concentration changes.',
        'Units of k reveal the order: s⁻¹ means first order; mol L⁻¹ s⁻¹ means zero order.',
        'Molecularity can never be zero or fractional.',
      ],
      v: table(['Slip', 'Fix'], [['Using coefficients as orders', 'Use the experimental rate law'], ['Forgetting ½ for 2HI', 'Divide by the coefficient'], ['Calling a zero-order reaction "no reaction"', 'It proceeds at a constant rate']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few exam tips. Always divide by coefficients and use a minus sign for reactants when writing rates. Never assume the order from the balanced equation. In initial-rate problems, pick runs where only one concentration changes. Use the units of k to identify the order. And remember that molecularity is always a small whole number, never zero.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Kinetics — Part 2: Integrated rate laws, temperature and collisions',
  goals: [
    'Use the integrated rate equations for zero- and first-order reactions and their half-lives',
    'Recognise pseudo-first-order reactions',
    'Explain the effect of temperature and catalysts using the Arrhenius equation and energy profiles, and calculate activation energy',
    'Explain reaction rates using collision theory, including energy and orientation',
  ],
  slides: [
    sl('title', 'Rates over time and temperature', {
      b: 'Part 2 — how concentration changes with time, why heat speeds reactions up, and what happens when molecules collide.',
      v: flow('LR', [['a', 'Rate law'], ['b', 'Integrated rate equation'], ['c', 'Half-life'], ['d', 'Arrhenius: effect of temperature'], ['e', 'Collision theory']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the topics in Part 2: rate law, integrated rate equation, half-life, Arrhenius equation, collision theory'),
      n: 'In Part 2 we ask practical questions. How much medicine is left in the blood after a day? How long until a pollutant falls to a safe level? Why does milk turn sour faster in summer? To answer, we integrate the rate law to get concentration as a function of time, define the half-life, and then use the Arrhenius equation and collision theory to explain temperature effects.',
    }),
    sl('concept', 'Zero-order reactions', {
      b: r`Rate $= k[\ce{R}]^0 = k$: the concentration falls at a **constant rate**. Integrating gives a straight line. Examples: decomposition of ammonia on a hot platinum surface at high pressure; some enzyme reactions when the enzyme is saturated.`,
      m: [r`[\ce{R}] = [\ce{R}]_0 - kt, \qquad k = \dfrac{[\ce{R}]_0 - [\ce{R}]}{t}`],
      v: table(['Feature', 'Zero order'], [['Plot that is a straight line', '[R] against t'], ['Slope', r`$-k$`], ['Unit of k', r`$\text{mol L}^{-1}\ \text{s}^{-1}$`], ['Why zero order?', 'The surface (or enzyme) is fully covered, so extra reactant cannot react faster']], 'Table of the features of a zero-order reaction: straight line of concentration against time, slope minus k, units and the surface-saturation reason'),
      n: 'In a zero-order reaction the rate does not depend on how much reactant is present. A typical case is a gas breaking down on a hot metal surface at high pressure: the surface is completely covered, so adding more gas cannot make it go faster. The concentration therefore falls by the same amount every minute, giving a straight line on a graph of concentration against time.',
    }),
    sl('diagram', 'Zero order on a graph', {
      b: r`The plot of $[\ce{R}]$ against $t$ is a straight line with intercept $[\ce{R}]_0$ and slope $-k$. The reaction stops abruptly when the reactant runs out.`,
      v: zeroPlot,
      n: 'Here the concentration starts at zero point four mole per litre and falls by two hundredths every minute, so it reaches zero after twenty minutes. The graph is a straight line whose slope is minus k. Compare this with first order on the next slides, where the line curves and never quite reaches zero.',
    }),
    sl('concept', 'First-order reactions', {
      b: r`Rate $= k[\ce{R}]$. Integrating gives an exponential decay; $\ln[\ce{R}]$ against $t$ is a straight line. Examples: radioactive decay, decomposition of dinitrogen pentoxide, hydrogenation of ethene (first order in ethene).`,
      m: [r`\ln[\ce{R}] = \ln[\ce{R}]_0 - kt`, r`k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}`, r`[\ce{R}] = [\ce{R}]_0\, e^{-kt}`],
      v: table(['Feature', 'First order'], [['Straight-line plot', r`$\ln[\ce{R}]$ (or $\log[\ce{R}]$) against $t$`], ['Slope', r`$-k$ (or $-k/2.303$ for log)`], ['Unit of k', r`$\text{s}^{-1}$`], ['Concentration', 'Falls exponentially, never quite zero']], 'Table of the features of a first-order reaction: straight line of log concentration against time, slope, units and exponential fall'),
      n: 'In a first-order reaction, the rate is proportional to the concentration. As the reactant is used up, the reaction slows in proportion. Integrating gives an exponential fall. The handy working form uses common logarithms: k equals two point three zero three divided by time, times the log of the starting concentration over the concentration at that time.',
    }),
    sl('diagram', 'First-order decay and half-life', {
      b: r`In a first-order reaction the concentration **halves in equal intervals of time**. That interval is the **half-life**, $t_{1/2}$.`,
      v: firstPlot,
      n: 'Look at the curve. The concentration starts at zero point eight, falls to zero point four after ten minutes, to zero point two after twenty, and to zero point one after thirty. Each halving takes the same ten minutes, no matter where we start. That constant time is the half-life. It is the signature of a first-order reaction.',
    }),
    sl('concept', 'Half-life', {
      b: r`The **half-life** is the time for the concentration of a reactant to fall to half its initial value.`,
      m: [r`\text{Zero order: } t_{1/2} = \dfrac{[\ce{R}]_0}{2k} \qquad \text{First order: } t_{1/2} = \dfrac{0.693}{k}`],
      v: table(['Order', 'Half-life', 'Depends on [R]₀?'], [['Zero', r`$\dfrac{[\ce{R}]_0}{2k}$`, 'Yes, proportional'], ['First', r`$\dfrac{0.693}{k}$`, 'No'], ['After n half-lives (first order)', r`$[\ce{R}] = \dfrac{[\ce{R}]_0}{2^n}$`, '—']], 'Table of the half-life expressions for zero and first order reactions and whether they depend on the starting concentration'),
      n: 'The half-life is the time taken for half the reactant to be used. For a zero-order reaction it is proportional to the starting concentration: double the starting amount and the half-life doubles. For a first-order reaction it is zero point six nine three divided by k, with no concentration in it at all. After n half-lives, a first-order reactant has fallen to one over two to the power n of its start.',
    }),
    sl('example', 'Worked example: a zero-order reaction', {
      b: r`**Problem.** A zero-order reaction has $k = 0.02\ \text{mol L}^{-1}\ \text{min}^{-1}$ and $[\ce{R}]_0 = 0.40\ \text{mol L}^{-1}$. Find the half-life and the time for the reaction to finish.

**Step 1.** $t_{1/2} = \dfrac{0.40}{2 \times 0.02} = 10$, so $10\ \text{min}$.

**Step 2.** Completion when $[\ce{R}] = 0$: $t = \dfrac{0.40}{0.02} = 20$, so $20\ \text{min}$ — just twice the first half-life.`,
      v: table(['Quantity', 'Value'], [[r`$[\ce{R}]_0$`, r`$0.40\ \text{mol L}^{-1}$`], [r`$k$`, r`$0.02\ \text{mol L}^{-1}\ \text{min}^{-1}$`], ['Half-life', '10 min'], ['Time to finish', '20 min']], 'Table of the data and results for the zero-order example: half-life 10 minutes and complete after 20 minutes'),
      n: 'For zero order, divide the starting concentration by twice k: zero point four over zero point zero four is ten minutes. Because the concentration falls at a constant rate, the second half takes just as long as the first, and the reaction finishes at twenty minutes. A first-order reaction would never finish so neatly; it keeps halving.',
    }),
    sl('example', 'Worked example: time for 80% completion (first order)', {
      b: r`**Problem.** A first-order reaction has $k = 0.0462\ \text{min}^{-1}$. Find its half-life and the time for 80% of the reactant to react.

**Step 1.** $t_{1/2} = \dfrac{0.693}{0.0462} = 15$, so $15\ \text{min}$.

**Step 2.** 80% reacted means $[\ce{R}] = 0.2[\ce{R}]_0$: $t = \dfrac{2.303}{0.0462}\log\dfrac{1}{0.2} = \dfrac{2.303}{0.0462} \times \log 5$.

**Step 3.** $t \approx 49.85 \times 0.699 \approx 34.8\ \text{min}$.`,
      v: table(['Fraction reacted', 'Fraction left', 'Time / min'], [['50%', '0.5', '15'], ['75%', '0.25', '30'], ['80%', '0.2', '≈ 34.8'], ['87.5%', '0.125', '45']], 'Table of fraction reacted, fraction left and time for the first-order example, including 80 percent at about 34.8 minutes'),
      n: 'The half-life is zero point six nine three divided by zero point zero four six two, which is fifteen minutes. If eighty percent has reacted, one fifth is left, so the ratio of starting to present concentration is five. Two point three zero three divided by k is about forty nine point eight five, and the log of five is about zero point seven, giving close to thirty five minutes.',
    }),
    sl('example', 'Worked example: medicine in the blood', {
      b: r`**Problem.** A medicine is removed from the blood by a first-order process with a half-life of $6\ \text{h}$. What percentage of a dose remains after $24\ \text{h}$?

**Step 1.** Number of half-lives $n = \dfrac{24}{6} = 4$.

**Step 2.** Fraction left $= \dfrac{1}{2^4} = \dfrac{1}{16} = 0.0625$, that is $6.25\%$.`,
      v: flow('LR', [['a', '100% at dose'], ['b', '50% after 6 h'], ['c', '25% after 12 h'], ['d', '12.5% after 18 h'], ['e', '6.25% after 24 h']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the medicine halving every 6 hours from 100 percent to 6.25 percent after 24 hours'),
      n: 'Doctors use half-lives to plan doses. Here twenty four hours is four half-lives of six hours each. Halving four times leaves one sixteenth of the dose, which is six and a quarter percent. That is why some tablets are taken every six or eight hours: the next dose arrives before the level falls too low.',
    }),
    sl('concept', 'Pseudo-first-order reactions', {
      b: r`If one reactant is in **large excess**, its concentration hardly changes, so the reaction behaves as first order in the other reactant. Example: acid hydrolysis of ethyl ethanoate in a large excess of water.`,
      m: [r`\ce{CH3COOC2H5 + H2O ->[H+] CH3COOH + C2H5OH}`, r`\text{Rate} = k[\ce{CH3COOC2H5}][\ce{H2O}] \approx k'[\ce{CH3COOC2H5}], \quad k' = k[\ce{H2O}]`],
      v: table(['Reaction', 'Reactant in excess', 'Behaves as'], [['Acid hydrolysis of ethyl ethanoate', 'Water', 'First order in ester'], ['Inversion of cane sugar (acid)', 'Water', 'First order in sucrose']], 'Table of two pseudo-first-order reactions with water in excess: hydrolysis of ethyl ethanoate and inversion of cane sugar'),
      n: 'Some reactions are really second order but look first order. When an ester is hydrolysed in a large amount of water, so little water is used that its concentration stays practically constant. It can be folded into the rate constant, and the rate depends only on the ester. We call this pseudo-first-order. The inversion of cane sugar in acid is another example.',
    }),
    sl('check', 'Quick check: half-life', {
      b: 'A reaction’s half-life does not change when the starting concentration is doubled. What is its order?',
      n: 'Quick check. Look back at the two half-life formulas. Which one has no starting concentration in it?',
      chk: 'halflife-order-mcq',
    }),
    sl('concept', 'Temperature and the Arrhenius equation', {
      b: r`For most reactions, a **10 K rise** roughly **doubles** the rate (the temperature coefficient is about 2). Arrhenius explained this with an exponential law. $A$ is the frequency (pre-exponential) factor and $E_\text{a}$ the **activation energy**.`,
      m: [r`k = A\, e^{-E_\text{a}/RT}, \qquad \ln k = \ln A - \dfrac{E_\text{a}}{RT}`],
      v: table(['Term', 'Meaning'], [[r`$e^{-E_\text{a}/RT}$`, 'Fraction of molecules with energy at least Ea'], [r`$A$`, 'Related to the frequency of collisions'], [r`$E_\text{a}$`, 'Minimum extra energy needed to form the activated complex'], ['Larger Ea', 'Slower reaction, more sensitive to temperature']], 'Table explaining the terms of the Arrhenius equation: the exponential factor, A, Ea, and the effect of a larger Ea'),
      n: 'Why do reactions speed up so much on warming? Arrhenius proposed that the rate constant equals a factor A times e to the power minus activation energy over R T. The exponential part is the fraction of molecules with at least the activation energy. A small rise in temperature increases this fraction a lot, so for many reactions a rise of just ten kelvin roughly doubles the rate.',
    }),
    sl('diagram', 'The energy profile and activation energy', {
      b: 'Reactants must pass over an energy barrier, forming a short-lived **activated complex**. The height of the barrier above the reactants is the **activation energy**. A **catalyst** provides a path with a lower barrier; it does not change ΔH.',
      v: V.profile,
      n: 'This energy profile shows the journey from reactants to products. Even for a reaction that releases energy, the molecules must first climb a hill and form an unstable activated complex at the top. The height of the climb is the activation energy. The dashed path, with a catalyst, has a lower hill, so many more molecules can get over it, while the starting and finishing levels stay the same.',
    }),
    sl('diagram', 'Why temperature matters so much', {
      b: r`At a higher temperature the energy distribution spreads out: the **fraction of molecules with energy ≥ $E_\text{a}$** (the area beyond the $E_\text{a}$ line) increases sharply, roughly doubling for a 10 K rise.`,
      v: mbPlot,
      n: 'At any temperature molecules have a spread of energies: most are middling, a few are very energetic. Only those beyond the activation energy line can react. When the temperature rises, the curve flattens and shifts to the right, and the small tail beyond the line grows a lot. That growing tail, not just faster movement, is the main reason reactions speed up on warming.',
    }),
    sl('concept', 'Finding activation energy from two temperatures', {
      b: r`Writing the Arrhenius equation at two temperatures and subtracting gives a working form. A plot of $\ln k$ against $1/T$ is a straight line of slope $-E_\text{a}/R$.`,
      m: [r`\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{1}{T_1} - \dfrac{1}{T_2}\right) = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1 T_2}\right)`],
      v: arrPlot,
      n: 'If we know the rate constant at two temperatures, we can find the activation energy. Write the Arrhenius equation for both and subtract; the factor A cancels. The result links the log of the ratio of rate constants to the activation energy and the two temperatures. Alternatively, plot the log of k against one over T: the straight line’s slope gives minus the activation energy over R.',
    }),
    sl('example', 'Worked example: activation energy from a doubling', {
      b: r`**Problem.** The rate constant of a reaction doubles when the temperature rises from $298\ \text{K}$ to $308\ \text{K}$. Find $E_\text{a}$. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$)

**Step 1.** $\log 2 = \dfrac{E_\text{a}}{2.303 \times 8.314}\left(\dfrac{308 - 298}{298 \times 308}\right)$.

**Step 2.** $E_\text{a} = \dfrac{2.303 \times 8.314 \times 0.3010 \times 298 \times 308}{10}$.

**Step 3.** $E_\text{a} \approx 52\,900\ \text{J mol}^{-1} \approx 52.9\ \text{kJ mol}^{-1}$.`,
      v: table(['Quantity', 'Value'], [[r`$k_2/k_1$`, '2'], [r`$T_1, T_2$`, '298 K, 308 K'], [r`$E_\text{a}$`, r`$\approx 52.9\ \text{kJ mol}^{-1}$`]], 'Table of the data and the activation energy of about 52.9 kilojoules per mole for a reaction whose rate doubles between 298 and 308 kelvin'),
      n: 'The ratio of rate constants is two, and log two is about zero point three. The temperature difference is ten kelvin, and the product of the two temperatures is about ninety one thousand eight hundred. Rearranging for the activation energy and putting in the gas constant gives about fifty three kilojoules per mole. That is why the rule of thumb about doubling works for many reactions.',
    }),
    sl('concept', 'What a catalyst does', {
      b: 'A **catalyst** increases the rate by providing an alternative path of **lower activation energy**. It is not used up, does not change ΔH, ΔG or the equilibrium constant, and speeds up the forward and backward reactions equally, so equilibrium is reached sooner.',
      v: table(['A catalyst does', 'A catalyst does not'], [['Lower the activation energy', 'Change ΔH or ΔG of the reaction'], ['Speed up forward and backward reactions equally', 'Change the equilibrium constant or the yield'], ['Help equilibrium to be reached faster', 'Make a non-spontaneous reaction happen'], ['Take part in the mechanism and come out unchanged', 'Get used up in the overall reaction']], 'Table contrasting what a catalyst does, such as lowering activation energy, with what it does not do, such as changing the equilibrium constant'),
      n: 'A catalyst is like a tunnel through the hill: the start and the finish are the same, but the climb is lower. It lowers the activation energy for both the forward and the backward reaction, so equilibrium is reached sooner, but the position of equilibrium, the enthalpy change and the Gibbs energy change are untouched. A catalyst cannot make a reaction happen that is not spontaneous.',
    }),
    sl('example', 'Worked example: how much faster with a catalyst?', {
      b: r`**Problem.** A catalyst lowers $E_\text{a}$ from $75$ to $50\ \text{kJ mol}^{-1}$ at $300\ \text{K}$. If $A$ is unchanged, by what factor does the rate constant increase?

**Step 1.** $\log\dfrac{k_\text{cat}}{k} = \dfrac{\Delta E_\text{a}}{2.303RT} = \dfrac{25000}{2.303 \times 8.314 \times 300}$.

**Step 2.** $\log\dfrac{k_\text{cat}}{k} \approx \dfrac{25000}{5744} \approx 4.35$.

**Step 3.** $\dfrac{k_\text{cat}}{k} \approx 10^{4.35} \approx 2.2 \times 10^{4}$: over twenty thousand times faster.`,
      v: table(['', 'Ea / kJ mol⁻¹', 'Relative k at 300 K'], [['Without catalyst', '75', '1'], ['With catalyst', '50', r`$\approx 2.2 \times 10^{4}$`]], 'Table comparing activation energies of 75 and 50 kilojoules per mole and the resulting increase of about twenty two thousand times in the rate constant'),
      n: 'Because the activation energy sits in an exponent, even a modest drop has a huge effect. Lowering it by twenty five kilojoules per mole at room temperature raises the rate constant by ten to the power four point three five, which is more than twenty thousand times. This is how enzymes let reactions in our bodies happen quickly at only thirty seven degrees Celsius.',
    }),
    sl('check', 'Quick check: catalysts', {
      b: 'Decide which quantity a catalyst changes.',
      n: 'Quick check. Recall what a catalyst does to the energy profile: which part of it changes, and which parts stay the same?',
      chk: 'catalyst-mcq',
    }),
    sl('diagram', 'Collision theory: energy and orientation', {
      b: r`Molecules react only when they **collide** with (i) energy at least equal to the **threshold** and (ii) the **proper orientation**. Rate $= P\, Z_\text{AB}\, e^{-E_\text{a}/RT}$, where $Z_\text{AB}$ is the collision frequency and $P$ the **probability (steric) factor**.`,
      v: V.orient,
      n: 'Collision theory pictures molecules as hard spheres that must hit each other to react. Most collisions do nothing. A collision is effective only if the molecules have enough energy and meet the right way round. Here a hydroxide ion must strike the carbon atom from the side opposite the bromine; hitting the bromine end just bounces off. The steric factor accounts for this need for the right orientation.',
    }),
    sl('concept', 'Effective collisions and the limits of the theory', {
      b: 'Only a tiny fraction of collisions are effective. Raising the temperature increases both the collision frequency (slightly) and the fraction of energetic collisions (greatly). Collision theory treats molecules as hard spheres, so it ignores their structure; the steric factor P is a correction.',
      v: table(['Change', 'Collision frequency', 'Fraction with enough energy', 'Rate'], [['Higher concentration', 'Increases', 'Same', 'Increases'], ['Higher temperature', 'Increases a little', 'Increases a lot', 'Increases greatly'], ['Catalyst', 'Same', 'Increases (lower Ea)', 'Increases']], 'Table of how concentration, temperature and a catalyst change collision frequency, the fraction of energetic collisions and the rate'),
      n: 'In a gas at room temperature, each molecule collides billions of times a second, yet most reactions are slow, so only a tiny fraction of collisions work. Concentration raises the number of collisions. Temperature raises collisions a little but the fraction with enough energy a lot. A catalyst lowers the energy needed. Collision theory is simple and useful, but it treats molecules as featureless spheres.',
    }),
    sl('check', 'Quick check: effective collisions', {
      b: 'Decide why most collisions between reactant molecules do not lead to a reaction.',
      n: 'Quick check. Name the two conditions a collision must meet to be effective.',
      chk: 'collision-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`Zero order: $[\ce{R}] = [\ce{R}]_0 - kt$, $t_{1/2} = [\ce{R}]_0/2k$.`,
        r`First order: $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$, $t_{1/2} = 0.693/k$ (independent of $[\ce{R}]_0$).`,
        'Pseudo-first order: one reactant in large excess.',
        r`Arrhenius: $k = Ae^{-E_\text{a}/RT}$; $\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$.`,
        'A catalyst lowers Ea, leaving ΔH, ΔG and K unchanged.',
        'Effective collisions need enough energy and proper orientation.',
      ],
      v: table(['Order', 'Integrated form', 'Half-life'], [['Zero', r`$[\ce{R}] = [\ce{R}]_0 - kt$`, r`$[\ce{R}]_0/2k$`], ['First', r`$\ln[\ce{R}] = \ln[\ce{R}]_0 - kt$`, r`$0.693/k$`]], 'Summary table of the integrated rate equations and half-lives for zero and first order reactions'),
      n: 'Let us sum up Part 2. Zero-order reactions lose reactant at a constant rate; first-order reactions halve in equal times, with a half-life that does not depend on the starting amount. A reactant in large excess makes a reaction pseudo-first-order. The Arrhenius equation links rate constants to temperature and activation energy. Catalysts lower the barrier, and collision theory explains why energy and orientation both matter.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For first order, write k = (2.303/t) log([R]₀/[R]) — the larger concentration goes on top.',
        'Check the unit of k to identify the order before choosing a formula.',
        'Use R = 8.314 J K⁻¹ mol⁻¹ with Ea in joules; convert to kJ at the end.',
        'In the two-temperature formula, keep T in kelvin and put (T₂ − T₁)/(T₁T₂).',
        'A catalyst does not change ΔH, ΔG or K — a favourite assertion–reason trap.',
      ],
      v: table(['Slip', 'Fix'], [['Using t½ = 0.693/k for zero order', 'Zero order: [R]₀/2k'], ['Mixing kJ and J with R', 'Use joules with 8.314'], ['°C in the Arrhenius equation', 'Convert to kelvin']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. In the first-order formula, the starting concentration goes on top inside the log. Check the units of k before choosing a formula. Use the gas constant eight point three one four with the activation energy in joules, and convert to kilojoules only at the end. Temperatures must be in kelvin. And never say a catalyst changes the equilibrium constant.',
    }),
  ],
});
