// ch03 Chemical Kinetics — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: b a a c c d.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const R = 8.314;
const eaFrom = (ratio, T1, T2) => (2.303 * R * Math.log10(ratio) * T1 * T2) / (T2 - T1);

// ---------------------------------------------------------------- t01 rate and factors
add('rate-relation-mcq', mcq({
  stem: r`In $\ce{2SO2 + O2 -> 2SO3}$, sulfur trioxide is formed at $4.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$. The rate at which oxygen is used is:`,
  right: r`$2.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$`,
  wrong: [r`$4.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$`, r`$8.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$`, r`$1.0 \times 10^{-4}\ \text{mol L}^{-1}\ \text{s}^{-1}$`],
  sol: r`$-\dfrac{\Delta[\ce{O2}]}{\Delta t} = \dfrac{1}{2}\dfrac{\Delta[\ce{SO3}]}{\Delta t} = \dfrac{1}{2} \times 4.0 \times 10^{-4} = 2.0 \times 10^{-4}$ — option (@K). (@1) ignores the coefficients and (@2) multiplies by 2 instead of dividing.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(4e-4 / 2, 2e-4) || 'rate');
add('avg-rate-mcq', mcq({
  stem: r`The concentration of reactant A falls from $0.60$ to $0.42\ \text{mol L}^{-1}$ in $30\ \text{s}$. The average rate of disappearance of A is:`,
  right: r`$6.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{s}^{-1}$`,
  wrong: [r`$1.4 \times 10^{-2}\ \text{mol L}^{-1}\ \text{s}^{-1}$`, r`$0.18\ \text{mol L}^{-1}\ \text{s}^{-1}$`, r`$-6.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{s}^{-1}$`],
  sol: r`Rate $= -\dfrac{0.42 - 0.60}{30} = \dfrac{0.18}{30} = 0.006$, that is $6.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{s}^{-1}$ — option (@K). (@1) divides 0.42 by 30, (@2) forgets to divide by the time, and (@3) drops the minus sign of the definition.`,
  d: 1, c: 'understanding', t: [1],
}), () => near((0.6 - 0.42) / 30, 0.006) || 'rate');
add('factors-mcq', mcq({
  stem: 'Equal masses of marble chips and marble powder are added to the same volume of the same dilute hydrochloric acid. The powder fizzes much faster mainly because:',
  right: 'the powder has a much larger surface area, so more particles are exposed to collisions with acid',
  wrong: ['the powder has a lower activation energy than the chips', 'the powder raises the temperature of the acid', 'the powder increases the concentration of the acid'],
  sol: 'The substance, its Ea, the temperature and the acid concentration are the same; only the exposed surface differs, so collisions per second rise — option (@K).',
  d: 2, c: 'application', t: [1, 5],
}));
add('extra-catalyst-mcq', mcq({
  stem: 'Hydrogen peroxide solution decomposes very slowly in a bottle, but fizzes vigorously when a pinch of manganese dioxide is added, and the manganese dioxide can be filtered off unchanged afterwards. The manganese dioxide is acting as:',
  right: 'a catalyst that provides a path with lower activation energy',
  wrong: ['a reactant that is used up in the reaction', 'a catalyst that makes the reaction more exothermic', 'a substance that raises the equilibrium constant'],
  sol: 'It speeds up the reaction and is recovered unchanged, so it is a catalyst; catalysts lower Ea but do not change ΔH or K — option (@K).',
  d: 2, c: 'application', t: [1, 4],
}));
add('instant-rate-tf', tf({
  stem: 'The instantaneous rate of a reaction at a given time is found from the slope of the tangent to the concentration–time curve at that time.',
  key: 't',
  sol: 'True. The instantaneous rate is −d[R]/dt, the (negative) slope of the tangent at that instant.',
  d: 1, c: 'recall', t: [1],
}));
add('rate-num', num({
  marks: 2,
  stem: r`For $\ce{2H2O2 -> 2H2O + O2}$, the concentration of hydrogen peroxide falls from $0.50$ to $0.38\ \text{mol L}^{-1}$ in $20\ \text{min}$. Find the average **rate of the reaction** in $\text{mol L}^{-1}\ \text{min}^{-1}$.`,
  value: 0.003, tol: 0.0001, unit: 'mol L⁻¹ min⁻¹',
  sol: r`Step 1 — Rate of disappearance of $\ce{H2O2}$ $= \dfrac{0.50 - 0.38}{20} = 0.006$, in $\text{mol L}^{-1}\ \text{min}^{-1}$.

Step 2 — Rate of reaction $= \dfrac{1}{2} \times 0.006 = 0.003$, in $\text{mol L}^{-1}\ \text{min}^{-1}$.`,
  scheme: [['Rate of disappearance 0.006', 1], ['Divides by the coefficient 2: 0.003', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((0.12 / 20) / 2, 0.003) || 'rate');
add('stoich-short', short({
  marks: 2, wl: null,
  stem: r`For $\ce{N2 + 3H2 -> 2NH3}$, write the rate of reaction in terms of each species. If ammonia forms at $0.40\ \text{mol L}^{-1}\ \text{min}^{-1}$, at what rate is hydrogen used?`,
  model: r`Rate $= -\dfrac{\Delta[\ce{N2}]}{\Delta t} = -\dfrac{1}{3}\dfrac{\Delta[\ce{H2}]}{\Delta t} = \dfrac{1}{2}\dfrac{\Delta[\ce{NH3}]}{\Delta t}$.

Rate of reaction $= \dfrac{0.40}{2} = 0.20$; hydrogen is used at $3 \times 0.20 = 0.60\ \text{mol L}^{-1}\ \text{min}^{-1}$.`,
  sol: 'Divide each rate of change by its coefficient; reactants carry a minus sign.',
  scheme: [['Correct rate expression with coefficients and signs', 1], ['Hydrogen used at 0.60 mol L⁻¹ min⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near((0.4 / 2) * 3, 0.6) || 'H2');

// ---------------------------------------------------------------- t02 rate law, order, molecularity
add('units-order-mcq', mcq({
  stem: r`The rate constant of a reaction is $3.6 \times 10^{-2}\ \text{L mol}^{-1}\ \text{s}^{-1}$. The order of the reaction is:`,
  right: '2',
  wrong: ['0', '1', '3'],
  sol: r`Unit of $k$ $= (\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$. $\text{L mol}^{-1}\ \text{s}^{-1} = (\text{mol L}^{-1})^{-1}\ \text{s}^{-1}$, so $1 - n = -1$ and $n = 2$ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('molecularity-mcq', mcq({
  stem: 'Which statement about molecularity is correct?',
  right: 'It is the number of species colliding in an elementary step, so it is always a whole number.',
  wrong: ['It can be zero for reactions on a metal surface.', 'It can be a fraction such as 3/2.', 'It is always equal to the order of the overall reaction.'],
  sol: 'Molecularity counts colliding species in one elementary step: 1, 2 or 3, never zero or fractional — option (@K). Order (not molecularity) can be zero (@1) or fractional (@2), and the two need not be equal (@3).',
  d: 1, c: 'recall', t: [2],
}));
add('order-def-mcq', mcq({
  stem: r`For a reaction, rate $= k[\ce{A}]^{1/2}[\ce{B}]^{3/2}$. The overall order is:`,
  right: '2',
  wrong: ['3/2', '1/2', '3'],
  sol: r`Order $= \dfrac{1}{2} + \dfrac{3}{2} = 2$ — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
add('initial-rate-mcq', mcq({
  stem: 'When the concentration of the only reactant is doubled, the initial rate becomes eight times as large. The order of the reaction is:',
  right: '3',
  wrong: ['2', '4', '8'],
  sol: r`$2^n = 8$, so $n = 3$ — option (@K). (@1) would give ×4, (@2) ×16, and (@3) confuses the factor with the order.`,
  d: 2, c: 'application', t: [2],
}));
add('rate-change-mcq', mcq({
  stem: r`A gas-phase reaction has rate $= k[\ce{A}][\ce{B}]^2$. If the volume of the vessel is suddenly halved at constant temperature, the rate becomes:`,
  right: '8 times as large',
  wrong: ['4 times as large', '2 times as large', 'one-eighth as large'],
  sol: r`Halving the volume doubles every concentration: new rate $= k(2[\ce{A}])(2[\ce{B}])^2 = 8k[\ce{A}][\ce{B}]^2$ — option (@K). (@1) doubles only B; (@3) treats halving the volume as halving the concentrations.`,
  d: 3, c: 'application', t: [2],
}));
add('order-ar', ar({
  a: r`The reaction $\ce{H2 + Br2 -> 2HBr}$, with rate $= k[\ce{H2}][\ce{Br2}]^{1/2}$, has an overall order of 1.5.`,
  r: 'The molecularity of an elementary reaction cannot be a fraction.',
  key: 'b',
  sol: 'A is true: 1 + ½ = 1.5. R is also true, but it is about molecularity of elementary steps and does not explain the order of this complex reaction — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('mechanism-ar', ar({
  a: r`The iodide-catalysed decomposition of hydrogen peroxide is first order in $\ce{H2O2}$ and first order in $\ce{I-}$.`,
  r: 'The rate law of a complex reaction is decided by its slowest elementary step.',
  key: 'a',
  sol: r`Both are true, and the slow step $\ce{H2O2 + I- -> H2O + IO-}$ gives rate $= k[\ce{H2O2}][\ce{I-}]$, so R explains A — option (a).`,
  d: 3, c: 'understanding', t: [2],
}));
add('units-match', match({
  stem: 'Match the order of a reaction with the unit of its rate constant.',
  pairs: [
    ['Zero order', r`$\text{mol L}^{-1}\ \text{s}^{-1}$`],
    ['First order', r`$\text{s}^{-1}$`],
    ['Second order', r`$\text{L mol}^{-1}\ \text{s}^{-1}$`],
    ['Third order', r`$\text{L}^2\ \text{mol}^{-2}\ \text{s}^{-1}$`],
  ],
  order: [1, 3, 0, 2],
  sol: 'Unit of k = (mol L⁻¹)^(1−n) s⁻¹ for n = 0, 1, 2, 3.',
  d: 2, c: 'understanding', t: [2],
}));
add('mechanism-short', short({
  marks: 2,
  stem: r`The decomposition $\ce{2NO2Cl -> 2NO2 + Cl2}$ is believed to occur in two steps: (1) $\ce{NO2Cl -> NO2 + Cl}$ (slow); (2) $\ce{NO2Cl + Cl -> NO2 + Cl2}$ (fast). Write the rate law and state the molecularity of the slow step.`,
  model: r`The slow step controls the rate, so rate $= k[\ce{NO2Cl}]$: first order overall, although two molecules of $\ce{NO2Cl}$ appear in the equation. Step 1 involves a single molecule, so its molecularity is 1 (unimolecular).`,
  sol: 'The rate law follows the rate-determining step.',
  scheme: [['Rate = k[NO₂Cl] from the slow step', 1], ['Molecularity of the slow step is 1', 1]],
  d: 3, c: 'application', t: [2],
}));
add('order-molec-short', short({
  marks: 2,
  stem: 'Give two differences between the order and the molecularity of a reaction.',
  model: 'Order is found by experiment as the sum of the powers in the rate law, while molecularity is a theoretical count of species colliding in an elementary step. Order can be zero or fractional, but molecularity is always a whole number (1, 2 or 3).',
  sol: 'Contrast the basis and the possible values.',
  scheme: [['Experimental vs theoretical (elementary step)', 1], ['Order can be 0 or fractional; molecularity cannot', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('initial-short3', short({
  marks: 3, wl: null,
  stem: r`For $\ce{X + Y -> products}$ at $298\ \text{K}$:

| Run | $[\ce{X}]$ / M | $[\ce{Y}]$ / M | Initial rate / M s⁻¹ |
|---|---|---|---|
| 1 | 0.020 | 0.030 | $1.5 \times 10^{-5}$ |
| 2 | 0.040 | 0.030 | $3.0 \times 10^{-5}$ |
| 3 | 0.020 | 0.060 | $6.0 \times 10^{-5}$ |

Find the order with respect to X and Y, write the rate law and calculate $k$ with its unit.`,
  model: r`Runs 1 and 2: [X] doubles, rate doubles, so first order in X.

Runs 1 and 3: [Y] doubles, rate ×4, so second order in Y. Rate $= k[\ce{X}][\ce{Y}]^2$ (third order overall).

$k = \dfrac{1.5 \times 10^{-5}}{0.020 \times 0.030^2} \approx 0.83\ \text{L}^2\ \text{mol}^{-2}\ \text{s}^{-1}$.`,
  sol: 'Compare runs in which one concentration changes; k from run 1.',
  scheme: [['First order in X', 1], ['Second order in Y and the rate law', 1], ['k ≈ 0.83 L² mol⁻² s⁻¹', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(1.5e-5 / (0.02 * 0.03 ** 2), 0.8333, 0.002) || 'k');

// ---------------------------------------------------------------- t03 integrated rate equations, half-life
add('halflife-order-mcq', mcq({
  stem: 'The half-life of a reaction stays the same when the initial concentration of the reactant is doubled. The reaction is:',
  right: 'first order',
  wrong: ['zero order', 'second order', 'of any order, since half-life never depends on concentration'],
  sol: r`Only for first order is $t_{1/2} = \dfrac{0.693}{k}$ independent of $[\ce{R}]_0$ — option (@K). For zero order (@1), $t_{1/2}$ is proportional to $[\ce{R}]_0$.`,
  d: 1, c: 'understanding', t: [3],
}));
add('zero-halflife-mcq', mcq({
  stem: 'A gas decomposing on a hot metal surface has a half-life of 10 min when its initial concentration is 0.20 mol L⁻¹ and 20 min when it is 0.40 mol L⁻¹. What half-life do you expect for an initial concentration of 0.10 mol L⁻¹?',
  right: '5 min, because the reaction is zero order',
  wrong: ['10 min, because the reaction is first order', '20 min, because the half-life doubles when the concentration halves', '2.5 min, because the half-life varies with the square of the concentration'],
  sol: r`The half-life is proportional to $[\ce{R}]_0$, which is the signature of zero order: $t_{1/2} = \dfrac{[\ce{R}]_0}{2k}$. Halving 0.20 to 0.10 halves 10 min to 5 min — option (@K). A first-order half-life (@1) would not change with concentration.`,
  d: 3, c: 'application', t: [3],
}));
add('first-frac-mcq', mcq({
  stem: 'A radioactive tracer used for a hospital scan decays by first-order kinetics with a half-life of 6 hours. What percentage of the tracer is left in the body one day after the scan, ignoring removal by other means?',
  right: '6.25%',
  wrong: ['25%', '12.5%', '0%'],
  sol: r`One day is $\dfrac{24}{6} = 4$ half-lives, so the fraction left $= \dfrac{1}{2^4} = \dfrac{1}{16} = 0.0625$, that is 6.25% — option (@K). (@2) counts only three half-lives; (@3) treats the decay as if it stopped after a fixed time, which never happens in first-order decay.`,
  d: 2, c: 'application', t: [3],
}), () => near(1 / 16, 0.0625) || 'frac');
add('plot-mcq', mcq({
  stem: 'For a first-order reaction, which plot gives a straight line?',
  right: 'log [R] against time',
  wrong: ['[R] against time', '1/[R] against time', 'Rate against time'],
  sol: r`$\log[\ce{R}] = \log[\ce{R}]_0 - \dfrac{kt}{2.303}$ is linear in $t$ — option (@K). [R] against t (@1) is linear for zero order.`,
  d: 1, c: 'recall', t: [3],
}));
add('pseudo-mcq', mcq({
  stem: 'The acid hydrolysis of ethyl ethanoate in a large excess of water follows first-order kinetics although two reactants are involved. This is because:',
  right: 'the concentration of water hardly changes, so it is absorbed into the rate constant',
  wrong: ['water does not take part in the reaction', 'the acid is the only reactant', 'the reaction is elementary and unimolecular'],
  sol: r`Rate $= k[\text{ester}][\ce{H2O}] \approx k'[\text{ester}]$ because water is in large excess — a pseudo-first-order reaction, option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('halflife-ar', ar({
  a: 'The time for a first-order reaction to go from 100% to 50% equals the time to go from 50% to 25%.',
  r: r`For a first-order reaction, $t_{1/2} = \dfrac{0.693}{k}$, which does not depend on the initial concentration.`,
  key: 'a',
  sol: 'Both are true; because the half-life is independent of the starting concentration, each halving takes the same time. R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('zero-ar', ar({
  a: 'The rate of a zero-order reaction increases as the concentration of the reactant increases.',
  r: 'For a zero-order reaction, a graph of the reactant concentration against time is a straight line.',
  key: 'd',
  sol: 'A is false: the rate of a zero-order reaction does not depend on concentration (rate = k). R is true: [R] = [R]₀ − kt — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('halflife-tf', tf({
  stem: 'The half-life of a zero-order reaction is directly proportional to the initial concentration of the reactant.',
  key: 't',
  sol: 'True. t½ = [R]₀/2k.',
  d: 1, c: 'recall', t: [3],
}));
add('first-fill', fill({
  stem: 'For a first-order reaction, the half-life equals ___ divided by the rate constant.',
  acc: [['0.693', '0.69', 'ln 2']],
  sol: 't½ = 0.693/k (0.693 = ln 2).',
  d: 1, c: 'recall', t: [3],
}));
add('first-k-num', num({
  stem: r`A first-order reaction has a half-life of $69.3\ \text{min}$. Find its rate constant in $\text{min}^{-1}$.`,
  value: 0.01, tol: 0.0001, unit: 'min⁻¹',
  sol: r`$k = \dfrac{0.693}{t_{1/2}} = \dfrac{0.693}{69.3} = 0.01$, so $0.01\ \text{min}^{-1}$.`,
  scheme: [['k = 0.693/69.3 = 0.01 min⁻¹', 1]],
  d: 1, c: 'understanding', t: [3],
}), () => near(0.693 / 69.3, 0.01) || 'k');
add('first-time-num', num({
  marks: 2,
  stem: r`A first-order reaction has $k = 2.303 \times 10^{-3}\ \text{s}^{-1}$. How long, in seconds, does it take for 90% of the reactant to react?`,
  value: 1000, tol: 2, unit: 's',
  sol: r`Step 1 — 90% reacted leaves $[\ce{R}] = 0.1[\ce{R}]_0$, so $\log\dfrac{[\ce{R}]_0}{[\ce{R}]} = \log 10 = 1$.

Step 2 — $t = \dfrac{2.303}{k} \times 1 = \dfrac{2.303}{0.002303} = 1000$, so $1000\ \text{s}$.`,
  scheme: [['[R]₀/[R] = 10, log = 1', 1], ['t = 1000 s', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((2.303 / 2.303e-3) * Math.log10(10), 1000) || 't');
add('zero-num', num({
  stem: r`A zero-order reaction has $k = 0.005\ \text{mol L}^{-1}\ \text{s}^{-1}$. How long, in seconds, does the reactant take to fall from $0.80$ to $0.30\ \text{mol L}^{-1}$?`,
  value: 100, tol: 0.5, unit: 's',
  sol: r`$t = \dfrac{[\ce{R}]_0 - [\ce{R}]}{k} = \dfrac{0.80 - 0.30}{0.005} = 100$, so $100\ \text{s}$.`,
  scheme: [['t = (0.80 − 0.30)/0.005 = 100 s', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => near(0.5 / 0.005, 100) || 't');
add('radio-short', short({
  marks: 2,
  stem: 'A pesticide washed into a pond breaks down by a first-order process with a half-life of 4 days. What fraction of it remains after 12 days, and why does the half-life not depend on how much pesticide entered the pond?',
  model: 'Twelve days is three half-lives, so the fraction left is (1/2)³ = 1/8, or 12.5%. For a first-order process t½ = 0.693/k contains no concentration term, so every halving takes 4 days whatever the starting amount.',
  sol: 'Count half-lives; first-order half-life is independent of concentration.',
  scheme: [['1/8 (12.5%) remains', 1], ['t½ = 0.693/k has no concentration term', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(Math.pow(0.5, 12 / 4), 0.125) || 'frac');
add('derive-short3', short({
  marks: 3, wl: null,
  stem: r`Starting from the integrated rate equation $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$, show that the half-life of a first-order reaction is $\dfrac{0.693}{k}$. Hence explain why it is independent of the initial concentration.`,
  model: r`At $t = t_{1/2}$, $[\ce{R}] = \dfrac{[\ce{R}]_0}{2}$, so $\dfrac{[\ce{R}]_0}{[\ce{R}]} = 2$.

$k = \dfrac{2.303}{t_{1/2}}\log 2 = \dfrac{2.303 \times 0.3010}{t_{1/2}}$, so $t_{1/2} = \dfrac{0.693}{k}$.

The expression contains only $k$ and no concentration term, so the half-life is the same whatever the starting concentration.`,
  sol: 'Substitute [R] = [R]₀/2 and log 2 = 0.3010.',
  scheme: [['Substitutes [R] = [R]₀/2', 1], ['Obtains t½ = 0.693/k', 1], ['Explains independence of [R]₀', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => near(2.303 * 0.301, 0.693, 0.002) || 'ln2');
add('pseudo-short3', short({
  marks: 3,
  stem: 'What is a pseudo-first-order reaction? Write the rate expression for the acid-catalysed inversion of cane sugar and explain why it behaves as first order.',
  model: r`A pseudo-first-order reaction is one whose true order is higher, but which behaves as first order because one reactant is present in large excess. In the inversion of cane sugar, $\ce{C12H22O11 + H2O ->[H+] C6H12O6 + C6H12O6}$, the true rate is $k[\text{sucrose}][\ce{H2O}]$. Water is the solvent and in huge excess, so its concentration hardly changes and $k[\ce{H2O}] = k'$; the rate becomes $k'[\text{sucrose}]$, first order in sucrose.`,
  sol: 'Definition, rate expression, and why the excess reactant is absorbed into k′.',
  scheme: [['Definition', 1], ['Balanced reaction and true rate law', 1], ['Water in excess, so rate = k′[sucrose]', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('halflife-data-short3', short({
  marks: 3, wl: null,
  stem: 'In two experiments on the same reaction at the same temperature, the half-life was 20 min when the initial concentration was 0.80 mol L⁻¹, and 10 min when it was 0.40 mol L⁻¹. (a) What is the order of the reaction? Justify. (b) Calculate the rate constant with its unit. (c) How long will the 0.80 mol L⁻¹ solution take to react completely?',
  model: r`(a) The half-life is directly proportional to the initial concentration (halving $[\ce{R}]_0$ halves $t_{1/2}$), so the reaction is **zero order**.

(b) $k = \dfrac{[\ce{R}]_0}{2t_{1/2}} = \dfrac{0.80}{2 \times 20} = 0.02\ \text{mol L}^{-1}\ \text{min}^{-1}$.

(c) $t = \dfrac{[\ce{R}]_0}{k} = \dfrac{0.80}{0.02} = 40\ \text{min}$.`,
  sol: 'Proportional half-life means zero order; use t½ = [R]₀/2k.',
  scheme: [['(a) Zero order with reason', 1], ['(b) k = 0.02 mol L⁻¹ min⁻¹', 1], ['(c) 40 min', 1]],
  d: 4, c: 'analysis', t: [3],
}), () => (near(0.8 / 40, 0.02) && near(0.4 / (2 * 0.02), 10) && near(0.8 / 0.02, 40)) || 'zero');

// ---------------------------------------------------------------- t04 Arrhenius equation, catalysts
add('catalyst-mcq', mcq({
  stem: 'A catalyst increases the rate of a reversible reaction. Which quantity does it change?',
  right: 'The activation energy',
  wrong: ['The enthalpy change of the reaction', 'The equilibrium constant', 'The Gibbs energy change of the reaction'],
  sol: 'A catalyst offers a different path with a lower activation energy; the energies of reactants and products, and hence ΔH, ΔG and K, are unchanged — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('arrhenius-mcq', mcq({
  stem: r`A graph of $\ln k$ against $\dfrac{1}{T}$ for a reaction is a straight line. Its slope equals:`,
  right: r`$-\dfrac{E_\text{a}}{R}$`,
  wrong: [r`$\dfrac{E_\text{a}}{R}$`, r`$-\dfrac{E_\text{a}}{2.303R}$`, r`$\ln A$`],
  sol: r`$\ln k = \ln A - \dfrac{E_\text{a}}{R}\cdot\dfrac{1}{T}$, so the slope is $-\dfrac{E_\text{a}}{R}$ and the intercept is $\ln A$ — option (@K). (@2) is the slope of the $\log k$ plot.`,
  d: 2, c: 'understanding', t: [4],
}));
add('temp-mcq', mcq({
  stem: 'A reaction has a temperature coefficient of 2 (its rate doubles for every 10 K rise). By what factor does the rate increase when the temperature rises from 300 K to 340 K?',
  right: '16',
  wrong: ['8', '4', '40'],
  sol: r`A 40 K rise is four 10 K steps: $2^4 = 16$ — option (@K). (@1) uses three steps; (@3) multiplies instead of using powers.`,
  d: 2, c: 'application', t: [4],
}), () => near(Math.pow(2, 4), 16) || 'factor');
add('ea-compare-mcq', mcq({
  stem: 'Reactions P and Q have activation energies of 40 and 120 kJ mol⁻¹. When both are warmed by the same few kelvin, which statement is correct?',
  right: 'The rate of Q increases by a larger factor than the rate of P.',
  wrong: ['The rate of P increases by a larger factor than the rate of Q.', 'Both rates increase by the same factor.', 'Neither rate changes, because Ea does not depend on temperature.'],
  sol: r`$\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$ is proportional to $E_\text{a}$, so the reaction with the larger activation energy is more sensitive to temperature — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}));
add('temp-ar', ar({
  a: 'For many reactions, the rate roughly doubles when the temperature is raised by 10 K.',
  r: 'The total number of collisions per second doubles when the temperature is raised by 10 K.',
  key: 'c',
  sol: 'A is true. R is false: a 10 K rise increases the collision frequency by only a few per cent; the rate doubles because the fraction of molecules with energy at least Ea roughly doubles — option (c).',
  d: 3, c: 'understanding', t: [4, 5],
}));
add('catalyst-ar', ar({
  a: 'A catalyst increases the rate of a reaction by lowering its activation energy.',
  r: 'A catalyst makes the Gibbs energy change of the reaction more negative.',
  key: 'c',
  sol: 'A is true. R is false: a catalyst does not change ΔG (or ΔH or K); it only provides a path with lower Ea — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('activated-fill', fill({
  stem: 'The unstable, highest-energy arrangement of atoms formed when reactant molecules pass over the energy barrier is called the activated ___.',
  acc: [['complex']],
  sol: 'It is the activated **complex** (transition state).',
  d: 1, c: 'recall', t: [4],
}));
add('ea-num', num({
  marks: 2,
  stem: r`The rate constant of a reaction doubles when the temperature is raised from $300\ \text{K}$ to $310\ \text{K}$. Calculate the activation energy in $\text{kJ mol}^{-1}$. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$, $\log 2 = 0.3010$)`,
  value: 53.6, tol: 0.2, unit: 'kJ mol⁻¹',
  sol: r`Step 1 — $\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$, so $E_\text{a} = \dfrac{2.303R\,T_1T_2\log 2}{T_2 - T_1}$.

Step 2 — $E_\text{a} = \dfrac{2.303 \times 8.314 \times 300 \times 310 \times 0.3010}{10} \approx 53\,600$ J $\text{mol}^{-1}$.

Step 3 — In kilojoules: $E_\text{a} = 53600 \div 1000 = 53.6$, so about $53.6\ \text{kJ mol}^{-1}$.`,
  scheme: [['Correct two-temperature equation', 0.5], ['Substitution with T in K and R in J', 1], ['Ea ≈ 53.6 kJ/mol', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near(eaFrom(2, 300, 310) / 1000, 53.6, 0.002) || 'Ea');
add('eak-num', num({
  marks: 2,
  stem: r`The rate constant of a gas-phase reaction is $0.020\ \text{s}^{-1}$ at $500\ \text{K}$ and $0.070\ \text{s}^{-1}$ at $700\ \text{K}$. Calculate $E_\text{a}$ in $\text{kJ mol}^{-1}$. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$, $\log 3.5 = 0.544$)`,
  value: 18.2, tol: 0.1, unit: 'kJ mol⁻¹',
  sol: r`Step 1 — $\dfrac{k_2}{k_1} = \dfrac{0.070}{0.020} = 3.5$.

Step 2 — $E_\text{a} = \dfrac{2.303 \times 8.314 \times 500 \times 700 \times 0.544}{200} \approx 18\,200$ J $\text{mol}^{-1}$; in kilojoules $18200 \div 1000 = 18.2$, so about $18.2\ \text{kJ mol}^{-1}$.`,
  scheme: [['Ratio 3.5 and the two-temperature equation', 1], ['Ea ≈ 18.2 kJ/mol', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(eaFrom(3.5, 500, 700) / 1000, 18.2, 0.003) || 'Ea');
add('catalyst-short', short({
  marks: 2,
  stem: 'State the effect of a catalyst on (a) the activation energy, (b) the enthalpy change and (c) the equilibrium constant of a reaction. Explain your answer to (c).',
  model: '(a) It lowers the activation energy. (b) It has no effect on the enthalpy change. (c) It has no effect on the equilibrium constant, because it lowers the barrier equally for the forward and the backward reactions, so both speed up by the same factor and equilibrium is only reached sooner.',
  sol: 'Lower Ea; ΔH and K unchanged; forward and backward rates rise equally.',
  scheme: [['(a) and (b) correct', 1], ['(c) K unchanged because both directions speed up equally', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('arrhenius-short3', short({
  marks: 3, wl: null,
  stem: r`A reaction has $E_\text{a} = 60\ \text{kJ mol}^{-1}$ and $k = 2.0 \times 10^{-3}\ \text{s}^{-1}$ at $300\ \text{K}$. Calculate $k$ at $320\ \text{K}$. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$)`,
  model: r`$\log\dfrac{k_2}{k_1} = \dfrac{60000}{2.303 \times 8.314}\left(\dfrac{320 - 300}{300 \times 320}\right) \approx 3134 \times 2.083 \times 10^{-4} \approx 0.653$.

$\dfrac{k_2}{k_1} \approx 10^{0.653} \approx 4.50$.

$k_2 \approx 4.50 \times 2.0 \times 10^{-3} \approx 9.0 \times 10^{-3}\ \text{s}^{-1}$.`,
  sol: 'Ea in joules, T in kelvin; then antilog.',
  scheme: [['Correct substitution with Ea in J', 1], ['log ratio ≈ 0.653, ratio ≈ 4.5', 1], ['k ≈ 9.0 × 10⁻³ s⁻¹', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(2e-3 * Math.pow(10, (60000 / (2.303 * R)) * (20 / (300 * 320))), 9.0e-3, 0.005) || 'k2');

// ---------------------------------------------------------------- t05 collision theory
add('collision-mcq', mcq({
  stem: 'Most collisions between reactant molecules do not lead to a reaction because:',
  right: 'they lack the threshold energy or the proper orientation',
  wrong: ['molecules in a gas never really touch each other', 'collisions only happen at high temperature', 'every collision needs a catalyst to be effective'],
  sol: 'An effective collision needs energy at least equal to the threshold energy and the correct orientation; most collisions fail one of these — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('steric-mcq', mcq({
  stem: r`In the collision theory expression rate $= P\,Z_\text{AB}\,e^{-E_\text{a}/RT}$, the factor $P$ allows for:`,
  right: 'the fraction of collisions in which the molecules are suitably oriented',
  wrong: ['the number of collisions per second per unit volume', 'the fraction of molecules with energy at least Ea', 'the pressure of the reacting gases'],
  sol: r`$Z_\text{AB}$ is the collision frequency (@1), $e^{-E_\text{a}/RT}$ the energetic fraction (@2), and $P$ the probability (steric) factor for proper orientation — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}));
add('collision-tf', tf({
  stem: 'Every collision in which the molecules have energy greater than the threshold energy leads to products.',
  key: 'f',
  sol: 'False. The molecules must also collide with the proper orientation.',
  d: 2, c: 'understanding', t: [5],
}));
add('collision-short', short({
  marks: 2,
  stem: 'Using collision theory, explain why raising the temperature increases the rate of a reaction much more than it increases the number of collisions per second.',
  model: 'A small rise in temperature increases the collision frequency only slightly, but it greatly increases the fraction of molecules having energy at least equal to the threshold energy. Since only such energetic, properly oriented collisions are effective, the number of effective collisions, and so the rate, rises sharply.',
  sol: 'Distinguish collision frequency from the fraction of energetic collisions.',
  scheme: [['Collision frequency rises only slightly', 1], ['Fraction of collisions with energy ≥ threshold rises greatly', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- more practice (t01–t05)
add('plot-match', match({
  stem: 'Match each straight-line plot with what it shows.',
  pairs: [
    ['[R] against t', 'Zero order; slope = −k'],
    ['log [R] against t', 'First order; slope = −k/2.303'],
    ['ln k against 1/T', 'Arrhenius plot; slope = −Ea/R'],
    ['log k against 1/T', 'Arrhenius plot; slope = −Ea/2.303R'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Zero order is linear in [R]; first order is linear in log [R]; the Arrhenius plots are linear in 1/T, with slope −Ea/R for ln k and −Ea/2.303R for log k.',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('zero-explain-short', short({
  marks: 2,
  stem: 'Ammonia decomposes on a hot platinum wire. At high pressure the rate stays constant while ammonia is used up, but at very low pressure the rate becomes proportional to the pressure of ammonia. Explain both observations.',
  model: 'At high pressure the platinum surface is completely covered with ammonia molecules, so extra gas cannot react any faster: the rate is constant, a zero-order reaction. At very low pressure only part of the surface is covered, and the number of adsorbed molecules, and so the rate, is proportional to the pressure: first order.',
  sol: 'Surface saturated: zero order. Surface partly covered: rate proportional to pressure.',
  scheme: [['High pressure: surface saturated, rate constant (zero order)', 1], ['Low pressure: coverage ∝ pressure, so first order', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('halflife-num', num({
  marks: 2,
  stem: 'A first-order reaction is 75% complete in 30 min. Find its half-life in minutes.',
  value: 15, tol: 0.1, unit: 'min',
  sol: r`75% complete leaves $\dfrac{1}{4} = \dfrac{1}{2^2}$ of the reactant, which is two half-lives. So $t_{1/2} = \dfrac{30}{2} = 15$, that is $15\ \text{min}$.`,
  scheme: [['75% complete = two half-lives', 1], ['t½ = 15 min', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(30 / Math.log2(1 / 0.25), 15) || 't');
add('k-from-fraction-num', num({
  marks: 2,
  stem: r`A first-order reaction is 20% complete in $10\ \text{min}$. Calculate its rate constant in $\text{min}^{-1}$. ($\log 1.25 = 0.0969$)`,
  value: 0.0223, tol: 0.0002, unit: 'min⁻¹',
  sol: r`Step 1 — 20% complete leaves $[\ce{R}] = 0.8[\ce{R}]_0$, so $\dfrac{[\ce{R}]_0}{[\ce{R}]} = \dfrac{1}{0.8} = 1.25$.

Step 2 — $k = \dfrac{2.303}{10} \times 0.0969 \approx 0.0223$, in $\text{min}^{-1}$.`,
  scheme: [['[R]₀/[R] = 1.25', 1], ['k ≈ 0.0223 min⁻¹', 1]],
  d: 3, c: 'application', t: [3],
}), () => near((2.303 / 10) * Math.log10(1.25), 0.0223, 0.003) || 'k');
add('ea-graph-mcq', mcq({
  stem: r`A plot of $\log k$ against $\dfrac{1}{T}$ for a reaction is a straight line of slope $-2000\ \text{K}$. The activation energy is ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$):`,
  right: r`about $38.3\ \text{kJ mol}^{-1}$`,
  wrong: [r`about $16.6\ \text{kJ mol}^{-1}$`, r`about $2.0\ \text{kJ mol}^{-1}$`, r`about $4.6\ \text{kJ mol}^{-1}$`],
  sol: r`Slope $= -\dfrac{E_\text{a}}{2.303R}$, so $E_\text{a} = 2000 \times 2.303 \times 8.314 \approx 38\,300$ J $\text{mol}^{-1}$ — option (@K). (@1) treats the line as $\ln k$ against $1/T$ (slope $-E_\text{a}/R$); (@2) reads the slope as the energy itself.`,
  d: 3, c: 'application', t: [4],
}), () => near((2000 * 2.303 * R) / 1000, 38.3, 0.002) && near((2000 * R) / 1000, 16.6, 0.002) || 'Ea');
add('pressure-rate-mcq', mcq({
  stem: 'The total pressure of a gaseous reaction mixture is doubled at constant temperature by compressing it. The rate increases mainly because:',
  right: 'the molecules are closer together, so they collide more often',
  wrong: ['a larger fraction of molecules now has energy above the activation energy', 'the activation energy is lowered by compression', 'the rate constant increases with pressure'],
  sol: 'Compression raises concentrations and so the collision frequency; at constant temperature the energy distribution, Ea and k are unchanged — option (@K).',
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- long answers
add('first-long', long({
  wl: null,
  stem: r`(a) Derive the integrated rate equation for a first-order reaction, $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$.

(b) The gas-phase decomposition $\mathrm{A(g)} \rightarrow \mathrm{B(g)} + \mathrm{C(g)}$ is first order. Starting with pure A at $0.40\ \text{atm}$, the total pressure after $100\ \text{s}$ is $0.60\ \text{atm}$ at constant volume and temperature. Calculate $k$ and the half-life.`,
  model: r`(a) For $\mathrm{R} \rightarrow \mathrm{P}$, $-\dfrac{d[\ce{R}]}{dt} = k[\ce{R}]$, so $\dfrac{d[\ce{R}]}{[\ce{R}]} = -k\,dt$. Integrating, $\ln[\ce{R}] = -kt + I$; at $t = 0$, $I = \ln[\ce{R}]_0$. So $\ln\dfrac{[\ce{R}]_0}{[\ce{R}]} = kt$, and converting to common logarithms, $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$.

(b) If A falls by $x$, total pressure $= 0.40 + x = 0.60$, so $x = 0.20$ and $p_\text{A} = 0.20\ \text{atm}$. $k = \dfrac{2.303}{100}\log\dfrac{0.40}{0.20} = 0.02303 \times 0.3010 \approx 6.93 \times 10^{-3}\ \text{s}^{-1}$. $t_{1/2} = \dfrac{0.693}{6.93 \times 10^{-3}} \approx 100\ \text{s}$ — consistent, since A halved in 100 s.`,
  sol: 'Separate variables and integrate; for the gas, find the partial pressure of A from the total pressure.',
  scheme: [['(a) Rate law and separation of variables', 1], ['(a) Integration with the constant from t = 0', 1], ['(b) p(A) = 0.20 atm from the total pressure', 1], ['(b) k ≈ 6.93 × 10⁻³ s⁻¹', 1], ['(b) t½ ≈ 100 s', 1]],
  d: 4, c: 'application', t: [3],
}), () => {
  const k = (2.303 / 100) * Math.log10(0.4 / (2 * 0.4 - 0.6));
  return (near(k, 6.93e-3, 0.002) && near(0.693 / k, 100, 0.002)) || 'k';
});
add('zero-first-long', long({
  wl: null,
  stem: r`(a) Write the integrated rate equations and half-life expressions for zero- and first-order reactions, and sketch the straight-line plot for each.

(b) Two reactions start with $[\ce{R}]_0 = 1.0\ \text{mol L}^{-1}$ and the same initial rate of $0.10\ \text{mol L}^{-1}\ \text{min}^{-1}$; one is zero order, the other first order. Find the half-life of each and the time each takes to reach 75% completion. Comment on the difference.`,
  model: r`(a) Zero order: $[\ce{R}] = [\ce{R}]_0 - kt$; $[\ce{R}]$ vs $t$ is a straight line of slope $-k$; $t_{1/2} = \dfrac{[\ce{R}]_0}{2k}$. First order: $\log[\ce{R}] = \log[\ce{R}]_0 - \dfrac{kt}{2.303}$; $\log[\ce{R}]$ vs $t$ is a straight line of slope $-k/2.303$; $t_{1/2} = \dfrac{0.693}{k}$.

(b) Zero order: $k = 0.10\ \text{mol L}^{-1}\ \text{min}^{-1}$, $t_{1/2} = \dfrac{1.0}{0.20} = 5$ min; 75% means 0.75 mol L⁻¹ used: $t = \dfrac{0.75}{0.10} = 7.5$ min. First order: rate $= k[\ce{R}]_0$ gives $k = 0.10\ \text{min}^{-1}$, $t_{1/2} = \dfrac{0.693}{0.10} = 6.93$ min; 75% is two half-lives, about 13.9 min. The first-order reaction slows as the reactant is used, so it takes longer, whereas the zero-order one keeps a constant rate.`,
  sol: 'Same starting rate fixes k for each order; compare times.',
  scheme: [['(a) Both equations and half-lives', 1.5], ['(a) Correct straight-line plots', 0.5], ['(b) Zero order: 5 min and 7.5 min', 1], ['(b) First order: 6.93 min and 13.9 min', 1], ['(b) Comment on why first order is slower later', 1]],
  d: 4, c: 'analysis', t: [3],
}), () => (near(1 / 0.2, 5) && near(0.75 / 0.1, 7.5) && near(0.693 / 0.1, 6.93) && near((2.303 / 0.1) * Math.log10(4), 13.86, 0.002)) || 'compare');
add('ratelaw-long', long({
  wl: null,
  stem: r`(a) Define rate law, order and molecularity. Why can the order of a reaction not be predicted from its balanced equation?

(b) For $\ce{A + 2B -> products}$ at a fixed temperature:

| Run | $[\ce{A}]$ / M | $[\ce{B}]$ / M | Initial rate / M s⁻¹ |
|---|---|---|---|
| 1 | 0.10 | 0.20 | $3.0 \times 10^{-4}$ |
| 2 | 0.30 | 0.20 | $2.7 \times 10^{-3}$ |
| 3 | 0.10 | 0.40 | $3.0 \times 10^{-4}$ |

Find the order in each reactant, the rate law and the rate constant with its unit.`,
  model: r`(a) The rate law expresses the rate in terms of reactant concentrations raised to experimentally found powers; order is the sum of these powers; molecularity is the number of species colliding in an elementary step. Most reactions happen in several steps, and the rate depends on the slowest step, not on the overall equation, so the order must be found by experiment.

(b) Runs 1, 2: [A] ×3, rate ×9, so second order in A. Runs 1, 3: [B] ×2, rate unchanged, so zero order in B. Rate $= k[\ce{A}]^2$. $k = \dfrac{3.0 \times 10^{-4}}{0.10^2} = 0.03\ \text{L mol}^{-1}\ \text{s}^{-1}$.`,
  sol: 'Definitions and the mechanism argument; compare runs for each reactant.',
  scheme: [['(a) Three definitions', 1.5], ['(a) Reason: mechanism / slowest step, found by experiment', 0.5], ['(b) Second order in A', 1], ['(b) Zero order in B', 1], ['(b) Rate law and k = 0.03 L mol⁻¹ s⁻¹', 1]],
  d: 3, c: 'application', t: [2],
}), () => (near(2.7e-3 / 3e-4, 9) && near(3e-4 / 0.01, 0.03)) || 'k');
add('arrhenius-long', long({
  wl: null,
  stem: r`(a) Write the Arrhenius equation and explain the meaning of each term.

(b) Draw an energy profile for an exothermic reaction with and without a catalyst, labelling the activation energies and ΔH.

(c) A reaction has $E_\text{a} = 50\ \text{kJ mol}^{-1}$. At what temperature will its rate constant be four times its value at $300\ \text{K}$? ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$, $\log 4 = 0.602$)`,
  model: r`(a) $k = Ae^{-E_\text{a}/RT}$: $k$ is the rate constant, $A$ the frequency (pre-exponential) factor, $E_\text{a}$ the activation energy, $R$ the gas constant and $T$ the temperature in kelvin; $e^{-E_\text{a}/RT}$ is the fraction of molecules with energy at least $E_\text{a}$.

(b) Energy against reaction coordinate: reactants at a higher level than products; a tall hump (uncatalysed) and a lower hump (catalysed) between them; $E_\text{a}$ measured from the reactants to each peak; ΔH from reactants down to products, the same for both paths.

(c) $\log 4 = \dfrac{50000}{2.303 \times 8.314}\left(\dfrac{1}{300} - \dfrac{1}{T_2}\right)$, so $\dfrac{1}{300} - \dfrac{1}{T_2} \approx \dfrac{0.602 \times 19.15}{50000} \approx 2.31 \times 10^{-4}$. $\dfrac{1}{T_2} \approx 3.333 \times 10^{-3} - 0.231 \times 10^{-3} \approx 3.103 \times 10^{-3}$, so $T_2 \approx 322\ \text{K}$.`,
  sol: 'Rearrange the two-temperature form for 1/T₂.',
  scheme: [['(a) Equation and meaning of terms', 1], ['(b) Profile with both humps, Ea and ΔH labelled', 1.5], ['(c) Correct substitution', 1], ['(c) T₂ ≈ 322 K', 1.5]],
  d: 4, c: 'application', t: [4],
}), () => {
  const inv = 1 / 300 - (Math.log10(4) * 2.303 * R) / 50000;
  return near(1 / inv, 322.3, 0.002) || 'T2';
});
add('collision-long', long({
  stem: '(a) State the main postulates of collision theory, including the role of the threshold energy and orientation.\n\n(b) Use a sketch of the distribution of molecular energies at two temperatures to explain why a small rise in temperature greatly increases the rate.\n\n(c) Explain, using the same ideas, how a catalyst increases the rate. State one limitation of collision theory.',
  model: 'Reactant molecules are treated as hard spheres, and a reaction occurs only when they collide. Only effective collisions, with energy at least equal to the threshold energy and with the proper orientation, give products; rate = P Z e^(−Ea/RT). A sketch of the energy distribution shows that at the higher temperature the curve flattens and shifts to higher energies, so the area beyond the activation energy, the fraction of molecules able to react, increases greatly, roughly doubling for a 10 K rise, while the collision frequency hardly changes. A catalyst provides a path of lower activation energy; the Ea line moves left, so a much larger fraction of collisions is effective at the same temperature. A limitation is that molecules are treated as structureless spheres, so the steric factor has to be introduced empirically.',
  sol: 'Postulates, energy distribution argument, catalyst moving the Ea line, one limitation.',
  scheme: [['(a) Collisions, threshold energy and orientation', 1.5], ['(b) Sketch with two curves and Ea line', 1], ['(b) Fraction beyond Ea increases greatly', 1], ['(c) Catalyst lowers Ea, larger fraction effective', 1], ['(c) One limitation', 0.5]],
  d: 3, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- case-based
add('drug-case', mk.case({
  passage: 'A pharmacology student measures the concentration of a painkiller in a volunteer’s blood after a single injection:\n\n| Time after injection (h) | 0 | 2 | 4 | 6 |\n|---|---|---|---|---|\n| Concentration (mg per L) | 16 | 8 | 4 | 2 |\n\nThe drug is effective only while its concentration stays above 0.5 mg per L. (Illustrative data.)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the order of the elimination of the drug?',
      right: 'First order, because the concentration halves in equal times',
      wrong: ['Zero order, because the concentration falls by equal amounts in equal times', 'Second order, because the concentration falls fast at first', 'Zero order, because the half-life changes'],
      sol: 'From 16 to 8 to 4 to 2 mg per L, each halving takes 2 h: a constant half-life means first order — option (@K). The falls (8, 4, 2) are not equal, so it is not zero order.',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: r`Calculate the rate constant in $\text{h}^{-1}$.`,
      value: 0.3465, tol: 0.002, unit: 'h⁻¹',
      sol: r`$t_{1/2} = 2\ \text{h}$, so $k = \dfrac{0.693}{2} = 0.3465$, in $\text{h}^{-1}$.`,
      scheme: [['k = 0.693/2 ≈ 0.347 h⁻¹', 1]],
      d: 2, c: 'understanding', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'For how long after the injection does the drug stay effective?',
      model: r`$\dfrac{16}{0.5} = 32 = 2^5$, so it takes 5 half-lives: $5 \times 2 = 10$ hours. The drug stays effective for about 10 h.`,
      sol: 'Count the halvings from 16 to 0.5 mg per L.',
      scheme: [['Five half-lives needed', 1], ['10 hours', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A second dose of the same size is given at 6 h. Why does the concentration not simply return to 16 mg per L and then follow the same curve as before?',
        model: 'At 6 h, 2 mg per L of the first dose is still present, so the second dose raises the level to about 18 mg per L. Elimination stays first order, so this total halves every 2 h, starting from a higher value than before.',
        sol: 'Leftover drug adds to the new dose; first-order elimination halves the total.',
        scheme: [['Leftover 2 mg/L adds to the new dose', 1], ['Total then halves every 2 h (first order)', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), () => near(0.693 / 2, 0.3465) && near(Math.log2(16 / 0.5) * 2, 10) || 'drug');
add('milk-case', mk.case({
  passage: 'A dairy cooperative in Anand tests how long fresh milk takes to turn sour. Stored in a refrigerator at 278 K, a sample takes about 64 hours; on a kitchen shelf at 303 K, an identical sample takes about 4 hours. Souring is caused by bacterial enzymes that convert lactose into lactic acid. Assume that the time taken is inversely proportional to the rate constant.',
  d: 4, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which statement best explains why the milk sours faster on the shelf?',
      right: 'A larger fraction of reacting molecules has energy at least equal to the activation energy at 303 K.',
      wrong: ['The activation energy of the reaction is lower at 303 K.', 'The enzymes are destroyed at the lower temperature.', 'The equilibrium constant of souring is larger in the refrigerator.'],
      sol: 'Ea itself does not change with temperature; warming raises the fraction of molecules with enough energy, so the rate constant increases — option (@K).',
      d: 2, c: 'understanding', t: [4, 5],
    })),
    part('b', num({
      stem: 'By what factor is the rate of souring larger at 303 K than at 278 K?',
      value: 16, tol: 0.1, unit: null,
      sol: r`Rate $\propto \dfrac{1}{\text{time}}$, so the ratio $= \dfrac{64}{4} = 16$.`,
      scheme: [['Ratio 64/4 = 16', 1]],
      d: 1, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Estimate the activation energy of souring in $\text{kJ mol}^{-1}$. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$, $\log 16 = 1.204$)`,
      model: r`$E_\text{a} = \dfrac{2.303R\,T_1T_2\log 16}{T_2 - T_1} = \dfrac{2.303 \times 8.314 \times 278 \times 303 \times 1.204}{25} \approx 77\,700\ \text{J mol}^{-1}$, about $77.7\ \text{kJ mol}^{-1}$.`,
      sol: 'Two-temperature Arrhenius equation with the rate ratio from (b).',
      scheme: [['Correct substitution (T in K, R in J)', 1], ['Ea ≈ 78 kJ/mol', 1]],
      d: 4, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A shopkeeper says, "Refrigeration stops the souring reaction completely." Evaluate this statement using the data.',
        model: 'The statement is wrong. In the refrigerator the milk still sours, but after about 64 hours instead of 4: cooling lowers the fraction of molecules with energy above the activation energy, so the rate falls about 16 times, but it does not become zero.',
        sol: 'Use the 64 h figure: the reaction slows but continues.',
        scheme: [['Uses the data (still sours after 64 h)', 1], ['Cooling slows (lower energetic fraction) but does not stop the reaction', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near(eaFrom(16, 278, 303) / 1000, 77.7, 0.003) || 'Ea');
add('clock-case', mk.case({
  passage: r`In a school “iodine clock” experiment, students study the reaction $\ce{S2O8^2- + 2I- -> 2SO4^2- + I2}$ at $298\ \text{K}$ and measure initial rates:

| Run | $[\ce{S2O8^2-}]$ / M | $[\ce{I-}]$ / M | Initial rate / M s⁻¹ |
|---|---|---|---|
| 1 | 0.010 | 0.020 | $1.2 \times 10^{-6}$ |
| 2 | 0.020 | 0.020 | $2.4 \times 10^{-6}$ |
| 3 | 0.010 | 0.040 | $2.4 \times 10^{-6}$ |

(Illustrative values.)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The order of the reaction with respect to iodide ions is:',
      right: '1',
      wrong: ['2, the coefficient of iodide in the equation', '0', '3'],
      sol: 'Runs 1 and 3: [I⁻] doubles and the rate doubles, so the order in iodide is 1 — option (@K), not the coefficient 2.',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: r`Calculate the rate constant in $\text{L mol}^{-1}\ \text{s}^{-1}$.`,
      value: 0.006, tol: 0.0001, unit: 'L mol⁻¹ s⁻¹',
      sol: r`Rate $= k[\ce{S2O8^2-}][\ce{I-}]$ (first order in each, from runs 1–3); $k = \dfrac{1.2 \times 10^{-6}}{0.010 \times 0.020} = 0.006$, in $\text{L mol}^{-1}\ \text{s}^{-1}$.`,
      scheme: [['k = 6.0 × 10⁻³ L mol⁻¹ s⁻¹', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Predict the initial rate when $[\ce{S2O8^2-}] = 0.030\ \text{M}$ and $[\ce{I-}] = 0.050\ \text{M}$.`,
      model: r`Rate $= k[\ce{S2O8^2-}][\ce{I-}] = 0.006 \times 0.030 \times 0.050 = 9.0 \times 10^{-6}\ \text{M s}^{-1}$.`,
      sol: 'Use the rate law and k from (b).',
      scheme: [['Uses rate = k[S₂O₈²⁻][I⁻]', 1], ['9.0 × 10⁻⁶ M s⁻¹', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A student argues that the reaction must be termolecular because three ions appear on the left of the equation. Evaluate this argument using the data.',
        model: 'The argument is wrong. The data give a rate law that is first order in each ion, second order overall, not third order. Molecularity applies only to elementary steps; this reaction occurs in more than one step, so the coefficients of the overall equation say nothing about how many ions collide at once.',
        sol: 'Order from data is 2; molecularity is defined only for elementary steps.',
        scheme: [['Data give second order overall, not third', 1], ['Coefficients of an overall (complex) reaction do not give molecularity', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), () => (near(1.2e-6 / (0.01 * 0.02), 0.006) && near(0.006 * 0.03 * 0.05, 9e-6)) || 'clock');
add('converter-case', mk.case({
  passage: 'A car’s catalytic converter contains a honeycomb coated with a thin layer of platinum and rhodium. It speeds up reactions that turn carbon monoxide and unburnt hydrocarbons into carbon dioxide and water, and nitrogen oxides into nitrogen. Mechanics in Pune note that the converter does little during the first minute after a cold start, but works well once it is above about 500 K.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How does the metal coating speed up the conversion of carbon monoxide to carbon dioxide?',
      right: 'It provides a reaction path with a lower activation energy.',
      wrong: ['It makes the reaction more exothermic.', 'It shifts the equilibrium further towards carbon dioxide.', 'It is used up as it reacts with carbon monoxide.'],
      sol: 'A catalyst lowers Ea without changing ΔH or K and is not consumed — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Why is the honeycomb shape with a very thin coating used?',
      model: 'It gives a very large surface area of catalyst, so more gas molecules can react on it each second.',
      sol: 'Surface area.',
      scheme: [['Large surface area for more reacting molecules', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the converter is ineffective just after a cold start, even though the catalyst is present.',
      model: 'Even with the catalyst, the reactions still have an activation energy. At a low temperature only a tiny fraction of gas molecules have enough energy to react on the surface, so the rate is very small. As the converter warms above about 500 K, this fraction grows sharply and the reactions become fast.',
      sol: 'A lowered Ea is still an Ea; the energetic fraction depends on temperature.',
      scheme: [['Catalysed path still has an activation energy', 1], ['At low T few molecules have enough energy; warming raises the fraction', 1]],
      d: 3, c: 'application', t: [4, 5],
    }), [
      short({
        marks: 2,
        stem: 'A customer claims the converter "forces more carbon monoxide to turn into carbon dioxide than would ever happen at equilibrium." Evaluate this claim.',
        model: 'The claim is wrong. A catalyst speeds up the forward and backward reactions equally and does not change the equilibrium constant. It only helps the gases reach the equilibrium mixture, which already strongly favours carbon dioxide, during the short time they spend in the converter.',
        sol: 'Catalysts change rates, not equilibrium positions.',
        scheme: [['Catalyst does not change K or the equilibrium position', 1], ['It only lets equilibrium be reached quickly in the short time available', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}));
