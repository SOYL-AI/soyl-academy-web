// ISC 12 Chemistry ch05 Rate of Reaction and Rate Laws — question bank (ISC style). Stems name their own reactions so
// that they stay unique across the bank. MCQ keys are placed by the builder; AR keys planned: d a a c b.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 rate of reaction
add('relate-mcq', mcq({
  stem: 'In the contact process, 2SO₂ + O₂ → 2SO₃. If SO₃ is formed at 4.0 × 10⁻³ mol L⁻¹ s⁻¹, oxygen is used up at:',
  right: '2.0 × 10⁻³ mol L⁻¹ s⁻¹',
  wrong: ['4.0 × 10⁻³ mol L⁻¹ s⁻¹', '8.0 × 10⁻³ mol L⁻¹ s⁻¹', '1.0 × 10⁻³ mol L⁻¹ s⁻¹'],
  sol: '−d[O₂]/dt = ½ d[SO₃]/dt = 2.0 × 10⁻³ mol L⁻¹ s⁻¹ — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('tangent-mcq', mcq({
  stem: 'A student plots [H₂O₂] against time for the decomposition of hydrogen peroxide. The instantaneous rate at 10 minutes is obtained from:',
  right: 'minus the slope of the tangent to the curve at 10 minutes',
  wrong: ['the slope of the line joining the first and last points', 'the concentration at 10 minutes divided by 10', 'the area under the curve up to 10 minutes'],
  sol: 'The instantaneous rate is −d[H₂O₂]/dt, the negative of the tangent’s slope at that time — option (@K). A chord gives an average rate (@1).',
  d: 1, c: 'understanding', t: [1],
}));
add('ionic-mcq', mcq({
  stem: 'Barium chloride and sodium sulfate solutions give a white precipitate the instant they are mixed, whereas a mixture of hydrogen and oxygen needs a spark to react. The precipitation is fast because:',
  right: 'free Ba²⁺ and SO₄²⁻ ions combine on collision without breaking covalent bonds',
  wrong: ['barium sulfate has a very high molar mass', 'the solutions are always warm', 'precipitation reactions have a high activation energy'],
  sol: 'Ionic reactions need no bond breaking, so they are very fast — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rate-tf', tf({
  stem: 'In the decomposition of N₂O₅ at a fixed temperature, the rate of reaction stays constant from start to finish.',
  key: 'f',
  sol: 'False. As N₂O₅ is used up its concentration falls, so the rate decreases with time (the reaction is first order).',
  d: 1, c: 'understanding', t: [1, 5],
}));
add('avg-num', num({
  stem: r`In the isomerisation A → B, $[\ce{A}]$ falls from $0.50$ to $0.38\ \text{mol L}^{-1}$ in $10\ \text{min}$. What is the average rate, in mol L⁻¹ min⁻¹?`,
  value: 0.012, tol: 0.0001, unit: 'mol L⁻¹ min⁻¹',
  sol: r`Average rate $= -\dfrac{\Delta[\ce{A}]}{\Delta t} = \dfrac{0.50 - 0.38}{10} = 0.012$, so $0.012\ \text{mol L}^{-1}\ \text{min}^{-1}$.`,
  scheme: [['0.012 mol L⁻¹ min⁻¹', 1]],
  d: 1, c: 'application', t: [1],
}), () => near((0.5 - 0.38) / 10, 0.012) || 'avg');
add('rate-short', short({
  marks: 2,
  stem: 'For the decomposition 2NOCl(g) → 2NO(g) + Cl₂(g), chlorine is formed at 1.5 × 10⁻³ mol L⁻¹ s⁻¹. Calculate the rate of disappearance of NOCl and the rate of the reaction.',
  model: r`Rate $= -\tfrac{1}{2}\dfrac{d[\ce{NOCl}]}{dt} = \dfrac{d[\ce{Cl2}]}{dt} = 1.5 \times 10^{-3}\ \text{mol L}^{-1}\ \text{s}^{-1}$. So $-\dfrac{d[\ce{NOCl}]}{dt} = 2 \times 1.5 \times 10^{-3} = 3.0 \times 10^{-3}\ \text{mol L}^{-1}\ \text{s}^{-1}$.`,
  sol: 'Rate of reaction 1.5 × 10⁻³; NOCl 3.0 × 10⁻³.',
  scheme: [['Rate expression with coefficients', 1], ['3.0 × 10⁻³ and 1.5 × 10⁻³', 1]],
  d: 2, c: 'application', t: [1],
}));
add('tangent-short', short({
  marks: 2,
  stem: 'Explain, with reference to a concentration–time graph for the decomposition of hydrogen peroxide, how the average rate between two times differs from the instantaneous rate at one time.',
  model: 'The average rate is the change in concentration divided by the time interval, i.e. minus the slope of the chord joining two points on the curve. The instantaneous rate at a given time is minus the slope of the tangent drawn to the curve at that time; it equals the average rate only over a vanishingly small interval.',
  sol: 'Chord vs tangent.',
  scheme: [['Average rate from chord', 1], ['Instantaneous rate from tangent', 1]],
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 factors; law of mass action
add('factor-mcq', mcq({
  stem: 'Equal masses of zinc granules and zinc powder are added to separate beakers of the same dilute hydrochloric acid. The powder gives hydrogen much faster because:',
  right: 'it has a much larger surface area in contact with the acid',
  wrong: ['powdered zinc is a different allotrope', 'the powder lowers the concentration of the acid', 'granules act as a catalyst poison'],
  sol: 'More exposed surface means more collisions per second — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('radiation-mcq', mcq({
  stem: 'A mixture of hydrogen and chlorine can be kept in the dark for days, but explodes when exposed to bright sunlight. The factor responsible is:',
  right: 'radiation (light), which starts a photochemical reaction',
  wrong: ['a rise in pressure', 'a change in surface area', 'a decrease in concentration'],
  sol: 'Light supplies the energy to split Cl₂ and start the chain reaction — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('mass-action-mcq', mcq({
  stem: 'Treating 2NO(g) + O₂(g) → 2NO₂(g) as a single elementary step, the law of mass action gives the rate as proportional to:',
  right: '[NO]²[O₂]',
  wrong: ['[NO][O₂]', '[NO₂]²', '2[NO] + [O₂]'],
  sol: 'Each active mass is raised to its stoichiometric coefficient — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('active-mcq', mcq({
  stem: 'In the decomposition CaCO₃(s) → CaO(s) + CO₂(g), the active mass of solid calcium carbonate is:',
  right: 'taken as constant (unity)',
  wrong: ['equal to its mass in grams', 'equal to its number of moles', 'zero'],
  sol: 'The concentration of a pure solid does not change, so its active mass is taken as 1 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mass-action-ar', ar({
  a: 'The law of mass action correctly predicts the rate law of H₂ + Br₂ → 2HBr from its balanced equation.',
  r: 'For complex reactions, the order with respect to each reactant must be found by experiment.',
  key: 'd',
  sol: 'A is false — the experimental rate law is k[H₂][Br₂]^½, not k[H₂][Br₂]; R is true — option (d).',
  d: 3, c: 'analysis', t: [2, 3],
}));
add('mass-action-short', short({
  marks: 2,
  stem: 'State the law of mass action and explain what is meant by the active mass of (a) a gas in a closed vessel and (b) a pure solid such as iron in the Haber process.',
  model: 'At constant temperature, the rate of a reaction is directly proportional to the product of the active masses of the reactants, each raised to the power of its stoichiometric coefficient. (a) For a gas, the active mass is its molar concentration (moles per litre). (b) For a pure solid, the concentration is constant, so its active mass is taken as 1.',
  sol: 'Statement; concentration; unity.',
  scheme: [['Statement', 1], ['Active mass of gas and solid', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('factor-short3', short({
  marks: 3,
  stem: 'Explain, using one everyday example for each, how (a) temperature, (b) a catalyst and (c) surface area affect the rate of a reaction.',
  model: '(a) Raising the temperature increases the kinetic energy of molecules, so more collisions exceed the activation energy; the rate roughly doubles for each 10 K rise — food spoils faster outside a refrigerator. (b) A catalyst provides an alternative path of lower activation energy — enzymes such as amylase speed up digestion of starch. (c) A larger surface area exposes more particles to collision — coal dust burns explosively while a lump of coal burns slowly.',
  sol: 'Three factors with examples.',
  scheme: [['(a) Temperature with example', 1], ['(b) Catalyst with example', 1], ['(c) Surface area with example', 1]],
  d: 2, c: 'application', t: [2],
}));
add('factors-long', long({
  stem: '(a) State the law of mass action. What is meant by active mass? [2]\n\n(b) Explain how each of the following affects the rate of a reaction, giving one example: (i) nature of reactants, (ii) concentration, (iii) radiation. [3]',
  model: '(a) At constant temperature, the rate of a reaction is proportional to the product of the active masses of the reactants, each raised to the power of its coefficient. Active mass is the molar concentration of a substance; for pure solids and liquids it is taken as unity. (b) (i) Ionic reactions such as AgNO₃ + NaCl are almost instantaneous because no bonds are broken, while molecular reactions such as the oxidation of CO are slower because covalent bonds must break. (ii) Higher concentration increases the number of collisions per second, so the rate increases, e.g. charcoal burns faster in pure oxygen than in air. (iii) Light supplies energy to start photochemical reactions, e.g. H₂ and Cl₂ react explosively in sunlight; photosynthesis needs light.',
  sol: 'Law and active mass; three factors.',
  scheme: [['(a) Law of mass action', 1], ['(a) Active mass', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 rate law, order, units of k
add('units-mcq', mcq({
  stem: 'The rate constant for the decomposition of N₂O₅ in carbon tetrachloride at 318 K is 6.2 × 10⁻⁴ s⁻¹. The order of the reaction is:',
  right: 'one',
  wrong: ['zero', 'two', 'three'],
  sol: 'A rate constant in s⁻¹ means first order — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('order-mcq', mcq({
  stem: 'For 2NO(g) + Br₂(g) → 2NOBr(g), doubling [NO] at constant [Br₂] makes the initial rate four times larger. The order with respect to NO is:',
  right: '2',
  wrong: ['1', '4', '0'],
  sol: '2ⁿ = 4 gives n = 2 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('kdep-mcq', mcq({
  stem: 'The rate constant of the decomposition of hydrogen peroxide changes when:',
  right: 'the temperature is changed',
  wrong: ['the initial concentration of H₂O₂ is doubled', 'the volume of solution is doubled', 'the reaction has been running for some time'],
  sol: 'k depends on temperature (and catalyst), not on concentration — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fraction-order-mcq', mcq({
  stem: 'The experimental rate law for H₂(g) + Br₂(g) → 2HBr(g) is rate = k[H₂][Br₂]^½. The overall order is:',
  right: '1.5',
  wrong: ['2', '1', '0.5'],
  sol: '1 + ½ = 1.5 — option (@K); the coefficients would wrongly give 2 (@1).',
  d: 1, c: 'application', t: [3],
}));
add('volume-mcq', mcq({
  stem: 'For 2NO(g) + O₂(g) → 2NO₂(g), rate = k[NO]²[O₂]. If the volume of the reaction vessel is suddenly halved at constant temperature, the rate becomes:',
  right: '8 times the original',
  wrong: ['2 times the original', '4 times the original', 'half the original'],
  sol: 'Halving the volume doubles every concentration: 2² × 2 = 8 — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('order-ar', ar({
  a: 'The order of a reaction can be a fraction.',
  r: 'Order is determined by experiment and need not be equal to the stoichiometric coefficients.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('order-tf', tf({
  stem: 'The order of the reaction 2N₂O₅ → 4NO₂ + O₂ can be read directly from its balanced equation as two.',
  key: 'f',
  sol: 'False. The reaction is experimentally first order; orders cannot be read from coefficients.',
  d: 1, c: 'understanding', t: [3],
}));
add('order-fill', fill({
  stem: 'In the rate law rate = k[A]ˣ[B]ʸ, the sum x + y is called the ___ of the reaction.',
  acc: [['order', 'overall order']],
  sol: 'The **order** (overall order).',
  d: 1, c: 'recall', t: [3],
}));
add('units-match', match({
  stem: 'For rates measured in mol L⁻¹ s⁻¹, match the order of reaction with the unit of its rate constant.',
  pairs: [
    ['Zero order', 'mol L⁻¹ s⁻¹'],
    ['First order', 's⁻¹'],
    ['Second order', 'L mol⁻¹ s⁻¹'],
    ['Third order', 'L² mol⁻² s⁻¹'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Unit of k = (mol L⁻¹)^(1−n) s⁻¹.',
  d: 1, c: 'recall', t: [3],
}));
add('initial-num', num({
  marks: 2,
  stem: 'For 2A + B → C at 300 K: with [A] = 0.10 M and [B] = 0.10 M the initial rate is 3.0 × 10⁻⁴ M s⁻¹; with [A] = 0.20 M, [B] = 0.10 M it is 1.2 × 10⁻³ M s⁻¹; with [A] = 0.10 M, [B] = 0.20 M it is 3.0 × 10⁻⁴ M s⁻¹. Find the rate constant, in L mol⁻¹ s⁻¹.',
  value: 0.03, tol: 0.0002, unit: 'L/(mol s)',
  sol: r`Doubling [A] multiplies the rate by 4: second order in A. Doubling [B] has no effect: zero order in B. Rate $= k[\ce{A}]^2$; $k = 3.0 \times 10^{-4} \div 0.10^2 = 0.030$, so $0.030\ \text{L mol}^{-1}\ \text{s}^{-1}$.`,
  scheme: [['Orders: 2 in A, 0 in B', 1], ['k = 0.030 L mol⁻¹ s⁻¹', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(3e-4 / 0.01, 0.03) || 'initial');
add('rate-law-short', short({
  marks: 2,
  stem: 'The rate law for the oxidation of nitric oxide, 2NO + O₂ → 2NO₂, is rate = k[NO]²[O₂]. How does the rate change if (a) [NO] is tripled at constant [O₂], and (b) the volume of the vessel is doubled?',
  model: '(a) Rate is multiplied by 3² = 9. (b) Doubling the volume halves both concentrations, so the rate is multiplied by (½)² × ½ = ⅛.',
  sol: '×9; ×⅛.',
  scheme: [['(a) 9 times', 1], ['(b) one-eighth', 1]],
  d: 2, c: 'application', t: [3],
}));
add('initial-short3', short({
  marks: 3,
  stem: 'For the reaction X + 2Y → products, initial rates were: [X] 0.05 M, [Y] 0.05 M: 2.0 × 10⁻⁴ M s⁻¹; [X] 0.10 M, [Y] 0.05 M: 4.0 × 10⁻⁴ M s⁻¹; [X] 0.05 M, [Y] 0.15 M: 1.8 × 10⁻³ M s⁻¹. Deduce the rate law and calculate k with its unit.',
  model: r`Runs 1 and 2: [X] doubles, rate doubles → first order in X. Runs 1 and 3: [Y] triples, rate ×9 → second order in Y. Rate $= k[\ce{X}][\ce{Y}]^2$ (third order). $k = 2.0 \times 10^{-4} \div (0.05 \times 0.05^2) = 1.6\ \text{L}^2\ \text{mol}^{-2}\ \text{s}^{-1}$.`,
  sol: 'k[X][Y]²; k = 1.6 L² mol⁻² s⁻¹.',
  scheme: [['Order in X', 1], ['Order in Y and rate law', 1], ['k with unit', 1]],
  d: 3, c: 'application', t: [3],
}));
add('units-short3', short({
  marks: 3,
  stem: 'Starting from rate = k[A]ⁿ, derive the units of the rate constant for zero, first and second order reactions when concentration is in mol L⁻¹ and time in seconds.',
  model: r`$k = \text{rate}/[\ce{A}]^n$, so the unit is $(\text{mol L}^{-1}\ \text{s}^{-1}) \div (\text{mol L}^{-1})^n = (\text{mol L}^{-1})^{1-n}\ \text{s}^{-1}$. Zero order ($n = 0$): mol L⁻¹ s⁻¹. First order ($n = 1$): s⁻¹. Second order ($n = 2$): L mol⁻¹ s⁻¹.`,
  sol: 'General expression and three cases.',
  scheme: [['General expression', 1], ['Zero and first order', 1], ['Second order', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('rate-long', long({
  stem: '(a) Distinguish between the average rate and the instantaneous rate of a reaction, and explain how each is found from a concentration–time graph. [2]\n\n(b) For A + B → products: [A] = 0.10 M, [B] = 0.20 M gives an initial rate of 4.0 × 10⁻³ M s⁻¹; [A] = 0.30 M, [B] = 0.20 M gives 1.2 × 10⁻² M s⁻¹; [A] = 0.10 M, [B] = 0.40 M gives 4.0 × 10⁻³ M s⁻¹. Deduce the rate law, calculate k with its unit, and find the rate when [A] = 0.25 M and [B] = 0.50 M. [3]',
  model: r`(a) Average rate is the change in concentration over a time interval, minus the slope of the chord between two points on the curve. Instantaneous rate is the rate at one moment, minus the slope of the tangent at that point.

(b) Tripling [A] triples the rate → first order in A; doubling [B] has no effect → zero order in B. Rate $= k[\ce{A}]$; $k = 4.0 \times 10^{-3} \div 0.10 = 0.040\ \text{s}^{-1}$. Rate $= 0.040 \times 0.25 = 0.010\ \text{M s}^{-1}$.`,
  sol: 'Chord vs tangent; rate = k[A], k = 0.040 s⁻¹; 0.010 M s⁻¹.',
  scheme: [['(a) Distinction and graphical method', 2], ['(b) Orders and rate law', 1], ['(b) k = 0.040 s⁻¹', 1], ['(b) Rate 0.010 M s⁻¹', 1]],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t04 zero order
add('zero-mcq', mcq({
  stem: 'The half-life of the decomposition of ammonia on a hot tungsten wire doubles when the initial pressure of ammonia is doubled. The reaction is:',
  right: 'zero order',
  wrong: ['first order', 'second order', 'pseudo-first order'],
  sol: 'For zero order t½ = [R]₀/2k, proportional to the initial amount — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('zero-graph-mcq', mcq({
  stem: 'For the zero-order decomposition of a gas on a saturated metal surface, which plot is a straight line?',
  right: 'Concentration of the gas against time',
  wrong: ['log (concentration) against time', 'Rate against the square of concentration', '1/concentration against time'],
  sol: '[R] = [R]₀ − kt is linear in t with slope −k — option (@K). log[R] vs t is linear for first order (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('zero-tf', tf({
  stem: 'The half-life of a zero-order reaction, such as the decomposition of NH₃ on platinum at high pressure, is independent of the initial concentration.',
  key: 'f',
  sol: 'False. For zero order t½ = [R]₀/2k, which is proportional to the initial concentration.',
  d: 2, c: 'understanding', t: [4],
}));
add('zero-ar', ar({
  a: 'The decomposition of ammonia on hot platinum is zero order at high pressure.',
  r: 'Platinum is a transition metal.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; the reaction is zero order because the platinum surface is fully covered with ammonia — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('zero-num', num({
  marks: 2,
  stem: r`A zero-order reaction has $k = 0.050\ \text{mol L}^{-1}\ \text{min}^{-1}$. How long, in minutes, does it take for the reactant concentration to fall from $0.80$ to $0.20\ \text{mol L}^{-1}$?`,
  value: 12, tol: 0.05, unit: 'min',
  sol: r`$t = \dfrac{[\ce{R}]_0 - [\ce{R}]}{k} = \dfrac{0.80 - 0.20}{0.050} = 12$, so $12\ \text{min}$.`,
  scheme: [['Zero-order equation', 1], ['12 min', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((0.8 - 0.2) / 0.05, 12) || 'zero');
add('zero-short', short({
  marks: 2,
  stem: 'Explain why the decomposition of ammonia on a hot platinum surface is zero order at high pressure but becomes first order at low pressure.',
  model: 'At high pressure the platinum surface is completely covered by adsorbed ammonia, so the rate depends only on the surface area, not on the gas pressure: zero order. At low pressure only part of the surface is covered, and the amount adsorbed (and so the rate) is proportional to the pressure of ammonia: first order.',
  sol: 'Saturated vs partly covered surface.',
  scheme: [['High pressure: surface saturated, zero order', 1], ['Low pressure: rate ∝ pressure, first order', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('zero-short3', short({
  marks: 3,
  stem: 'Derive the integrated rate equation and the half-life for a zero-order reaction R → P, and state the slope of the straight-line plot.',
  model: r`Rate $= -\dfrac{d[\ce{R}]}{dt} = k$, so $d[\ce{R}] = -k\,dt$. Integrating from $[\ce{R}]_0$ at $t = 0$ to $[\ce{R}]$ at $t$: $[\ce{R}] - [\ce{R}]_0 = -kt$, i.e. $[\ce{R}] = [\ce{R}]_0 - kt$. At $t_{1/2}$, $[\ce{R}] = [\ce{R}]_0/2$, so $t_{1/2} = [\ce{R}]_0/2k$. A plot of [R] against t is a straight line with slope $-k$.`,
  sol: 'Integration; half-life; slope −k.',
  scheme: [['Integration', 1], ['Half-life', 1], ['Slope −k', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 first order
add('halflife-mcq', mcq({
  stem: 'Phosphorus-32, used to trace nutrient uptake in plants, decays by first-order kinetics with a half-life of 14.3 days. What fraction of a sample remains after 42.9 days?',
  right: '12.5%',
  wrong: ['25%', '33.3%', '6.25%'],
  sol: '42.9 ÷ 14.3 = 3 half-lives; (½)³ = 0.125 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('firstk-mcq', mcq({
  stem: 'The decomposition of sulfuryl chloride, SO₂Cl₂ → SO₂ + Cl₂, is first order with a half-life of 693 s at a certain temperature. Its rate constant is:',
  right: '1.0 × 10⁻³ s⁻¹',
  wrong: ['693 s⁻¹', '1.0 × 10⁻³ mol L⁻¹ s⁻¹', '0.693 s⁻¹'],
  sol: 'k = 0.693/t½ = 0.693 ÷ 693 = 1.0 × 10⁻³ s⁻¹ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('first-graph-mcq', mcq({
  stem: 'For the first-order decomposition of N₂O₅, a graph of log[N₂O₅] against time is a straight line with slope:',
  right: '−k/2.303',
  wrong: ['−k', '+k/2.303', '−2.303k'],
  sol: 'log[R] = log[R]₀ − kt/2.303 — option (@K). Slope −k applies to ln[R] (@1).',
  d: 2, c: 'understanding', t: [5],
}));
add('pseudo-mcq', mcq({
  stem: 'The acid-catalysed inversion of cane sugar, C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆, behaves as a first-order reaction because:',
  right: 'water is present in such large excess that its concentration stays practically constant',
  wrong: ['water does not take part in the reaction', 'sucrose is a catalyst', 'the reaction is elementary and unimolecular'],
  sol: 'The rate k[sucrose][H₂O] becomes k′[sucrose] — a pseudo-first-order reaction — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('radio-mcq', mcq({
  stem: 'After three half-lives of the first-order decomposition of hydrogen peroxide in a bottle, the percentage of H₂O₂ that has decomposed is:',
  right: '87.5%',
  wrong: ['75%', '33.3%', '12.5%'],
  sol: 'Remaining (½)³ = 12.5%, so 87.5% has decomposed — option (@K); 12.5% is the amount left (@3).',
  d: 2, c: 'application', t: [5],
}));
add('first-ar', ar({
  a: 'The half-life of the first-order decomposition of N₂O₅ is the same whether the initial concentration is 0.1 M or 0.5 M.',
  r: 'For a first-order reaction, t½ = 0.693/k.',
  key: 'a',
  sol: 'Both are true and R explains A: the expression contains no concentration term — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('first-num', num({
  marks: 2,
  stem: r`A first-order reaction has $k = 2.31 \times 10^{-3}\ \text{s}^{-1}$. How long, in seconds, does it take for 75% of the reactant to be consumed?`,
  value: 600, tol: 2, unit: 's',
  sol: r`$t_{1/2} = 0.693 \div (2.31 \times 10^{-3}) = 300\ \text{s}$. 75% consumed = 2 half-lives, so $t = 2 \times 300 = 600$, i.e. $600\ \text{s}$.`,
  scheme: [['t½ = 300 s', 1], ['600 s', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(2 * (0.693 / 2.31e-3), 600) || 'first');
add('drug-num', num({
  marks: 2,
  stem: r`A patient’s blood contains $60\ \text{mg L}^{-1}$ of a drug that is eliminated by first-order kinetics with $k = 0.115\ \text{h}^{-1}$. What is the concentration, in mg L⁻¹, after 12 hours?`,
  value: 15.1, tol: 0.1, unit: 'mg/L',
  sol: r`$\log\dfrac{60}{[\ce{R}]} = \dfrac{kt}{2.303} = \dfrac{0.115 \times 12}{2.303} = 0.599$; $\dfrac{60}{[\ce{R}]} = 10^{0.599} = 3.97$; $[\ce{R}] = 60 \div 3.97 = 15.1$, so $15.1\ \text{mg L}^{-1}$.`,
  scheme: [['log ratio 0.599', 1], ['15.1 mg L⁻¹', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(60 * Math.exp(-0.115 * 12), 15.1, 0.003) || 'drug');
add('first-short', short({
  marks: 2,
  stem: 'Show that, for a first-order reaction such as the decay of a radioactive tracer, the time required for 99.9% of the reactant to react is about ten times its half-life.',
  model: r`$t_{99.9\%} = \dfrac{2.303}{k}\log\dfrac{100}{0.1} = \dfrac{2.303 \times 3}{k} = \dfrac{6.909}{k}$; $t_{1/2} = \dfrac{0.693}{k}$. Ratio $= 6.909 \div 0.693 \approx 10$.`,
  sol: 'Ratio ≈ 10.',
  scheme: [['Expression for 99.9%', 1], ['Ratio ≈ 10', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('pseudo-short', short({
  marks: 2,
  stem: 'Explain why the acid hydrolysis of ethyl ethanoate in a large excess of water is called a pseudo-first-order reaction. Write its rate law.',
  model: r`The true rate law is rate $= k[\ce{CH3COOC2H5}][\ce{H2O}]$, second order. Water is in such large excess that its concentration hardly changes, so $k[\ce{H2O}]$ is a constant $k'$ and rate $= k'[\ce{CH3COOC2H5}]$: it behaves as first order.`,
  sol: 'Excess water; k′.',
  scheme: [['True rate law and excess water', 1], ['Pseudo rate law with k′', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('derive-short3', short({
  marks: 3,
  stem: 'Derive the integrated rate equation for a first-order reaction R → P and show that its half-life is independent of the initial concentration.',
  model: r`$-\dfrac{d[\ce{R}]}{dt} = k[\ce{R}]$, so $\dfrac{d[\ce{R}]}{[\ce{R}]} = -k\,dt$. Integrating between $[\ce{R}]_0$ at $t = 0$ and $[\ce{R}]$ at $t$: $\ln[\ce{R}] - \ln[\ce{R}]_0 = -kt$, so $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$. At $t_{1/2}$, $[\ce{R}] = [\ce{R}]_0/2$: $t_{1/2} = \dfrac{2.303}{k}\log 2 = \dfrac{0.693}{k}$, which contains no concentration term.`,
  sol: 'Integration; t½ = 0.693/k.',
  scheme: [['Differential form and separation', 1], ['Integrated equation', 1], ['Half-life independent of [R]₀', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('first-short3', short({
  marks: 3,
  stem: 'In the first-order decomposition of N₂O₅ in carbon tetrachloride, [N₂O₅] falls from 0.040 M to 0.010 M in 40 minutes. Calculate (a) the rate constant, (b) the half-life and (c) the concentration after a further 20 minutes.',
  model: r`(a) $k = \dfrac{2.303}{40}\log\dfrac{0.040}{0.010} = \dfrac{2.303 \times 0.602}{40} = 0.0347\ \text{min}^{-1}$.

(b) $t_{1/2} = 0.693 \div 0.0347 = 20\ \text{min}$ (0.040 → 0.010 is two half-lives).

(c) One more half-life: $0.010 \div 2 = 0.0050\ \text{M}$.`,
  sol: '0.0347 min⁻¹; 20 min; 0.0050 M.',
  scheme: [['(a) k', 1], ['(b) t½ = 20 min', 1], ['(c) 0.0050 M', 1]],
  d: 3, c: 'application', t: [5],
}));
add('halflife-short3', short({
  marks: 3,
  stem: 'Two reactions, one zero order and one first order, both start at 0.40 M and have a half-life of 10 minutes. Calculate the concentration remaining in each after 20 minutes, and explain the difference.',
  model: r`Zero order: $t_{1/2} = [\ce{R}]_0/2k$ gives $k = 0.40 \div 20 = 0.020\ \text{M min}^{-1}$; after 20 min, $[\ce{R}] = 0.40 - 0.020 \times 20 = 0$ (complete). First order: two half-lives, $[\ce{R}] = 0.40 \div 4 = 0.10\ \text{M}$. A zero-order reaction loses a constant amount per minute, so the second half takes as long as the first; a first-order reaction slows as concentration falls, losing half of what remains in each half-life.`,
  sol: '0 M vs 0.10 M.',
  scheme: [['Zero order: 0 M', 1], ['First order: 0.10 M', 1], ['Explanation', 1]],
  d: 4, c: 'analysis', t: [4, 5],
}));
add('first-long', long({
  stem: '(a) Derive the integrated rate equation for a first-order reaction and obtain the expression for its half-life. [3]\n\n(b) The half-life of a first-order reaction is 40 minutes. Calculate (i) the time for the concentration to fall to one-tenth of its initial value and (ii) the fraction remaining after 2 hours. [2]',
  model: r`(a) $-d[\ce{R}]/dt = k[\ce{R}]$; $d[\ce{R}]/[\ce{R}] = -k\,dt$; integrating from $t = 0$: $\ln([\ce{R}]_0/[\ce{R}]) = kt$, so $k = \dfrac{2.303}{t}\log\dfrac{[\ce{R}]_0}{[\ce{R}]}$. With $[\ce{R}] = [\ce{R}]_0/2$: $t_{1/2} = 0.693/k$.

(b) $k = 0.693 \div 40 = 0.0173\ \text{min}^{-1}$. (i) $t = \dfrac{2.303}{0.0173}\log 10 = 133\ \text{min}$. (ii) 120 min = 3 half-lives; fraction left $= (\tfrac{1}{2})^3 = \tfrac{1}{8}$.`,
  sol: 'Derivation; 133 min; 1/8.',
  scheme: [['(a) Integration', 2], ['(a) Half-life', 1], ['(b)(i) 133 min', 1], ['(b)(ii) 1/8', 1]],
  d: 3, c: 'application', t: [5],
}));
add('zero-first-long', long({
  stem: '(a) Compare zero-order and first-order reactions with respect to (i) the straight-line plot, (ii) the unit of k and (iii) the dependence of half-life on initial concentration. [3]\n\n(b) A zero-order reaction with [R]₀ = 0.60 M has a half-life of 15 min. Calculate k and the time for complete reaction. [2]',
  model: r`(a) (i) Zero order: [R] against t is linear (slope −k); first order: log[R] against t is linear (slope −k/2.303). (ii) Zero order: mol L⁻¹ s⁻¹; first order: s⁻¹. (iii) Zero order: $t_{1/2} = [\ce{R}]_0/2k$, proportional to [R]₀; first order: $t_{1/2} = 0.693/k$, independent of [R]₀.

(b) $k = [\ce{R}]_0/2t_{1/2} = 0.60 \div 30 = 0.020\ \text{M min}^{-1}$; complete when $[\ce{R}] = 0$: $t = 0.60 \div 0.020 = 30\ \text{min}$.`,
  sol: 'Comparison; k = 0.020 M min⁻¹; 30 min.',
  scheme: [['(a)(i) Plots', 1], ['(a)(ii) Units', 1], ['(a)(iii) Half-life dependence', 1], ['(b) k', 1], ['(b) 30 min', 1]],
  d: 3, c: 'application', t: [4, 5],
}));

// ---------------------------------------------------------------- t06 molecularity and mechanism
add('molecularity-mcq', mcq({
  stem: 'The step NO(g) + O₃(g) → NO₂(g) + O₂(g) is elementary. Which statement about it is correct?',
  right: 'It is bimolecular and its rate law is rate = k[NO][O₃]',
  wrong: ['It is unimolecular because only NO is oxidised', 'Its order must be found by experiment and could be zero', 'It is termolecular because four molecules appear in the equation'],
  sol: 'Two species collide in the elementary step, so it is bimolecular and the rate law follows its stoichiometry — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('rds-mcq', mcq({
  stem: 'The mechanism proposed for 2NO₂Cl → 2NO₂ + Cl₂ is: NO₂Cl → NO₂ + Cl (slow); NO₂Cl + Cl → NO₂ + Cl₂ (fast). The rate law is:',
  right: 'rate = k[NO₂Cl]',
  wrong: ['rate = k[NO₂Cl]²', 'rate = k[NO₂Cl][Cl]', 'rate = k[NO₂]²[Cl₂]'],
  sol: 'The slow first step is unimolecular in NO₂Cl and controls the rate — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('termolecular-mcq', mcq({
  stem: 'Termolecular steps such as 2NO + O₂ → 2NO₂ are rare because:',
  right: 'three particles seldom collide at the same instant with enough energy and the right orientation',
  wrong: ['three molecules can never react together', 'such reactions are always endothermic', 'molecularity cannot exceed one'],
  sol: 'The chance of a simultaneous effective three-body collision is very small — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('mol-ar', ar({
  a: 'The molecularity of an elementary step is always a whole number.',
  r: 'Molecularity can be found only by experiment.',
  key: 'c',
  sol: 'A is true; R is false — molecularity is a theoretical count of colliding species from the mechanism; it is order that is experimental — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('mol-tf', tf({
  stem: 'A complex reaction such as the iodide-catalysed decomposition of H₂O₂ has a single molecularity for the overall reaction.',
  key: 'f',
  sol: 'False. Molecularity is defined only for each elementary step; the overall reaction has an order, not a molecularity.',
  d: 2, c: 'understanding', t: [6],
}));
add('rds-fill', fill({
  stem: 'In a reaction mechanism, the slowest elementary step, which controls the overall rate, is called the ___ step.',
  acc: [['rate-determining', 'rate determining', 'rate-limiting']],
  sol: 'The **rate-determining** step.',
  d: 1, c: 'recall', t: [6],
}));
add('mol-match', match({
  stem: 'For the two-step mechanism NO + Br₂ ⇌ NOBr₂ (fast); NOBr₂ + NO → 2NOBr (slow), match each term with its example from this mechanism.',
  pairs: [
    ['Intermediate', 'NOBr₂'],
    ['Rate-determining step', 'NOBr₂ + NO → 2NOBr'],
    ['Molecularity of the slow step', 'Two (bimolecular)'],
    ['Overall order (from the mechanism)', 'Three'],
  ],
  order: [3, 1, 0, 2],
  sol: 'NOBr₂ is formed and used up; the slow step controls the rate and is bimolecular; rate = k[NO]²[Br₂] is third order.',
  d: 3, c: 'analysis', t: [6],
}));
add('order-mol-short', short({
  marks: 2,
  stem: 'Give two differences between the order and the molecularity of a reaction, using the decomposition of N₂O₅ (experimentally first order) as an example.',
  model: 'Order is found by experiment and refers to the overall reaction; molecularity is the number of species colliding in an elementary step. Order may be zero or fractional; molecularity is always 1, 2 or 3. For 2N₂O₅ → 4NO₂ + O₂ the order is 1, although two molecules appear in the overall equation; molecularity can be stated only for its individual steps.',
  sol: 'Two differences with example.',
  scheme: [['Experimental vs theoretical / overall vs step', 1], ['Values allowed, with N₂O₅ example', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'The decomposition of ozone, 2O₃ → 3O₂, is thought to occur by: O₃ ⇌ O₂ + O (fast equilibrium, constant K); O + O₃ → 2O₂ (slow). Derive the rate law and state the order with respect to O₃ and O₂.',
  model: r`Slow step: rate $= k_2[\ce{O}][\ce{O3}]$. From the fast equilibrium, $K = \dfrac{[\ce{O2}][\ce{O}]}{[\ce{O3}]}$, so $[\ce{O}] = \dfrac{K[\ce{O3}]}{[\ce{O2}]}$. Rate $= k_2K\dfrac{[\ce{O3}]^2}{[\ce{O2}]} = k\dfrac{[\ce{O3}]^2}{[\ce{O2}]}$: second order in O₃, order −1 in O₂ (overall first order).`,
  sol: 'k[O₃]²/[O₂].',
  scheme: [['Rate of slow step', 1], ['Eliminating [O] using K', 1], ['Rate law and orders', 1]],
  d: 4, c: 'analysis', t: [6],
}));
add('mechanism-long', long({
  stem: '(a) What is meant by the rate-determining step? Give two differences between order and molecularity. [2]\n\n(b) For 2NO₂Cl → 2NO₂ + Cl₂, the proposed mechanism is: step 1 (slow) NO₂Cl → NO₂ + Cl; step 2 (fast) NO₂Cl + Cl → NO₂ + Cl₂. (i) Identify the intermediate. (ii) State the molecularity of each step. (iii) Write the rate law and the overall order. [3]',
  model: '(a) The slowest elementary step in a mechanism, which controls the overall rate. Order is found by experiment and may be zero or fractional; molecularity is the number of species in an elementary step and is always a whole number (1, 2 or 3). (b) (i) Cl (chlorine atom), formed in step 1 and used in step 2. (ii) Step 1 is unimolecular; step 2 is bimolecular. (iii) The slow step controls the rate: rate = k[NO₂Cl], first order overall.',
  sol: 'RDS; differences; Cl; uni/bi; k[NO₂Cl].',
  scheme: [['(a) Rate-determining step', 1], ['(a) Two differences', 1], ['(b)(i) Intermediate', 1], ['(b)(ii) Molecularities', 1], ['(b)(iii) Rate law and order', 1]],
  d: 3, c: 'application', t: [6],
}));
