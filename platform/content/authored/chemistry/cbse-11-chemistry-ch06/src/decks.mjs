// ch06 Equilibrium — two decks: Part 1 (t01–t03) physical and chemical equilibrium, Kc and Kp, Q, ICE tables, Le Chatelier's principle;
// Part 2 (t04–t05) ionic equilibrium: acids and bases, pH, weak electrolytes, common ion effect, hydrolysis, buffers, Ksp.
import { sl, deck, table, flow, svgV, r, dec, sci, near } from './lib.mjs';
import { APPROACH, PHSCALE, QK } from './svgs.mjs';

const assert = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};
const Rg = 0.08314; // L bar K⁻¹ mol⁻¹
const Kw = 1.0e-14;
const Ka = 1.8e-5; // ethanoic (acetic) acid at 298 K
const Ksp = 1.8e-10; // AgCl at 298 K

export const V = {
  approach: svgV(APPROACH, 'Approach to equilibrium of A converting to B: concentrations level off at 0.20 and 0.80 while forward and reverse rates become equal', 'Illustrative model with A ⇌ B, forward rate constant four times the reverse.'),
  qk: svgV(QK, 'Reaction quotient Q compared with K equal to 54 on a logarithmic axis: Q below K means net forward reaction, Q above K means net reverse reaction'),
  ph: svgV(PHSCALE, 'The pH scale from 0 to 14 with typical values for gastric juice, lemon juice, tomato juice, rainwater, pure water, sea water, milk of magnesia, household ammonia and sodium hydroxide solution', 'Typical, approximate values at 298 K.'),
};

// ---- numbers used in worked examples (computed here, asserted, interpolated)
const pcl5 = { Cl: 0.06, P: 0.06, A: 0.09, T: 500 };
pcl5.Kc = (pcl5.Cl * pcl5.P) / pcl5.A;
pcl5.Kp = pcl5.Kc * Rg * pcl5.T;
assert(near(pcl5.Kc, 0.04, 1e-9) && near(pcl5.Kp, 1.663, 0.001), 'PCl5');
const Khi = 54;
const dir = { H: 0.4, I: 0.1, HI: 0.3 };
dir.Q = dir.HI ** 2 / (dir.H * dir.I);
assert(near(dir.Q, 2.25, 1e-9), 'Q');
const ice = { c0: 0.5 };
ice.x = (ice.c0 * Math.sqrt(Khi)) / (2 + Math.sqrt(Khi));
ice.HI = 2 * ice.x;
ice.H = ice.c0 - ice.x;
assert(near(ice.HI ** 2 / ice.H ** 2, Khi, 1e-9) && near(ice.HI, 0.786, 0.002) && near(ice.H, 0.107, 0.004), 'ICE');
const ac = { c: 0.1 };
ac.alpha = Math.sqrt(Ka / ac.c);
ac.H = ac.c * ac.alpha;
ac.pH = -Math.log10(ac.H);
assert(near(ac.alpha, 0.01342, 0.001) && near(ac.pH, 2.872, 0.001), 'acetic');
const ba = { c: 0.005 };
ba.OH = 2 * ba.c;
ba.pOH = -Math.log10(ba.OH);
ba.pH = 14 - ba.pOH;
assert(near(ba.pH, 12, 1e-9), 'Ba(OH)2');
const hy = { c: 0.1 };
hy.Kh = Kw / Ka;
hy.OH = Math.sqrt(hy.Kh * hy.c);
hy.pOH = -Math.log10(hy.OH);
hy.pH = 14 - hy.pOH;
assert(near(hy.Kh, 5.56e-10, 0.002) && near(hy.pH, 8.87, 0.002), 'hydrolysis');
const pKa = -Math.log10(Ka);
const buf = { A: 0.1, B: 0.2 };
buf.pH = pKa + Math.log10(buf.B / buf.A);
buf.pH2 = pKa + Math.log10((buf.B + 0.01) / (buf.A - 0.01));
assert(near(pKa, 4.745, 0.001) && near(buf.pH, 5.046, 0.001) && near(buf.pH2, 5.113, 0.001), 'buffer');
const ag = { s: Math.sqrt(Ksp) };
ag.sNaCl = Ksp / 0.1;
assert(near(ag.s, 1.342e-5, 0.001) && near(ag.sNaCl, 1.8e-9, 0.001), 'AgCl');
const qsp = { Ag: 2.0e-5, Cl: 2.0e-5 };
qsp.Q = qsp.Ag * qsp.Cl;
assert(near(qsp.Q, 4.0e-10, 1e-9) && qsp.Q > Ksp, 'Qsp');

export const deck1 = deck({
  part: 1,
  title: 'Equilibrium — Part 1: Chemical equilibrium, equilibrium constants and Le Chatelier’s principle',
  goals: [
    'Describe physical and chemical equilibria as dynamic processes',
    'Write Kc and Kp, relate them by Kp = Kc(RT)^Δn, and manipulate them',
    'Use Q to predict direction and an ICE table to find equilibrium concentrations',
    'Predict the effect of concentration, pressure, temperature, catalyst and inert gas on equilibrium',
  ],
  slides: [
    sl('title', 'Equilibrium', {
      b: 'Part 1 — when forward and reverse changes go on at the same rate, and how to predict and control where that balance lies.',
      v: table(['System', 'Forward ⇌ reverse', 'Where it matters'], [['Water in a closed bottle', 'Evaporation ⇌ condensation', 'Humidity'], ['Ammonia synthesis', r`$\ce{N2 + 3H2 <=> 2NH3}$`, 'Fertiliser'], ['Dissolved carbon dioxide', r`$\ce{CO2(g) <=> CO2(aq)}$`, 'Fizzy drinks'], ['Haemoglobin and oxygen', 'Binding ⇌ release', 'Breathing']], 'Table of everyday equilibria with forward and reverse changes'),
      n: 'Welcome. Many changes do not go to completion. Water in a closed bottle keeps evaporating and condensing, the gases of the Haber process keep making and breaking ammonia, and carbon dioxide in a fizzy drink keeps moving in and out of solution. In this part we see what equilibrium is, how to calculate it, and how to shift it by changing conditions.',
    }),
    sl('concept', 'Physical equilibria', {
      b: 'In a **closed** vessel a physical change can reach **equilibrium** when two opposing processes occur at equal rates. Each type has a fixed measurable quantity at a given temperature.',
      v: table(['Equilibrium', 'Condition', 'Constant at fixed T'], [['Solid ⇌ liquid', 'Melting point, 1 atm', 'Both phases coexist'], ['Liquid ⇌ vapour', 'Closed vessel', 'Vapour pressure'], ['Solid ⇌ vapour', 'Closed vessel', 'Sublimation pressure of the solid'], ['Solute(s) ⇌ solute(aq)', 'Saturated solution', 'Solubility'], ['Gas ⇌ gas in liquid', 'Closed bottle', r`$\text{Solubility} \propto p$ (Henry)`]], 'Table of physical equilibria with their conditions and the quantity that stays constant'),
      n: 'Physical equilibria involve a change of state or of place, not a new substance. Ice and water coexist at the melting point. In a closed vessel, a liquid and its vapour reach a fixed vapour pressure. A saturated solution holds the maximum amount of solute at that temperature. In each case two opposite processes run at the same rate, so the amounts stay constant.',
    }),
    sl('concept', 'Dynamic nature of chemical equilibrium', {
      b: 'At equilibrium the **rate of the forward reaction equals the rate of the reverse reaction**; the concentrations stay constant but both reactions continue. The same state is reached from **either direction**.',
      v: table(['Feature', 'Meaning'], [['Dynamic', 'Reactions continue in both directions'], ['Constant macroscopic properties', 'Concentration, colour, pressure stay fixed'], ['Reached from either side', 'Same K from reactants or from products'], ['Closed system needed', 'No matter exchanged with the surroundings'], ['Catalyst', 'Speeds up arrival; does not change the position']], 'Table of characteristics of chemical equilibrium'),
      n: 'Equilibrium looks still, but it is not. Reactants keep turning into products and products back into reactants, at exactly the same rate, so nothing seems to change. You can reach the same equilibrium starting with reactants only, or products only. A catalyst helps the system arrive sooner but does not move the balance point.',
    }),
    sl('diagram', 'Approach to equilibrium', {
      b: 'As reactant is used up the forward rate falls; as product builds up the reverse rate rises. Equilibrium is reached when the two rates meet.',
      v: V.approach,
      n: 'On the left, the concentration of A falls and the concentration of B rises, then both level off at constant values. On the right, the forward rate falls while the reverse rate rises, until they meet. From that moment the concentrations do not change, although both reactions carry on. The ratio of the two final concentrations is the equilibrium constant.',
    }),
    sl('check', 'Quick check: equilibrium', {
      b: 'Identify a true statement about a system at equilibrium.',
      n: 'Quick check. Think about rates and about what stays constant, and what does not.',
      chk: 'physical-eq-mcq',
    }),
    sl('concept', 'Law of mass action and Kc', {
      b: 'For $a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}$ at equilibrium, the ratio of product to reactant concentrations, each raised to its coefficient, is constant at a given temperature. **Pure solids and pure liquids** are left out (activity 1).',
      m: [r`K_c = \dfrac{[\text{C}]^c\,[\text{D}]^d}{[\text{A}]^a\,[\text{B}]^b}`],
      v: table(['Equilibrium', 'Kc expression'], [[r`$\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$`, r`$\dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3}$`], [r`$\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$`, r`$\dfrac{[\text{PCl}_3][\text{Cl}_2]}{[\text{PCl}_5]}$`], [r`$\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$`, r`$[\text{CO}_2]$`], [r`$\ce{Fe^3+(aq) + SCN-(aq) <=> FeSCN^2+(aq)}$`, r`$\dfrac{[\text{FeSCN}^{2+}]}{[\text{Fe}^{3+}][\text{SCN}^-]}$`]], 'Table of equilibrium constant expressions for four reactions including a heterogeneous one'),
      n: 'The law of mass action says that for a reaction at equilibrium, the product concentrations raised to their coefficients, divided by the reactant concentrations raised to theirs, give a constant at a given temperature. Pure solids and pure liquids do not appear, because their concentrations do not change. So for the decomposition of calcium carbonate, the constant is just the carbon dioxide concentration.',
    }),
    sl('concept', 'Kp and the relation Kp = Kc(RT)^Δn', {
      b: 'For gases we may use **partial pressures**. Since $p = cRT$ for each gas, $K_p = K_c(RT)^{\\Delta n}$, where $\\Delta n$ is moles of gaseous products minus moles of gaseous reactants. $K_p = K_c$ only if $\\Delta n = 0$.',
      m: [r`K_p = K_c\,(RT)^{\Delta n}`],
      v: table(['Reaction', 'Δn', 'Relation'], [[r`$\ce{H2 + I2 <=> 2HI}$`, '0', r`$K_p = K_c$`], [r`$\ce{N2 + 3H2 <=> 2NH3}$`, '−2', r`$K_p = K_c(RT)^{-2}$`], [r`$\ce{PCl5 <=> PCl3 + Cl2}$`, '+1', r`$K_p = K_c\,RT$`], [r`$\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$`, '+1', r`$K_p = p_{\text{CO}_2}$`]], 'Table of delta n and the relation between Kp and Kc for four reactions'),
      n: 'For gaseous equilibria it is often easier to use partial pressures. Because the pressure of a gas is its concentration times R T, the two constants are related by Kp equals Kc times R T to the power delta n. Delta n is the number of moles of gaseous products minus gaseous reactants. When delta n is zero, as in hydrogen iodide formation, the two constants are equal.',
    }),
    sl('example', 'Worked example: Kc and Kp', {
      b: r`**Problem.** At 500 K, an equilibrium mixture of $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$ contains $[\text{PCl}_5] = 0.090$, $[\text{PCl}_3] = 0.060$, $[\text{Cl}_2] = 0.060\ \text{mol L}^{-1}$ (given). Find $K_c$ and $K_p$. ($R = 0.08314\ \text{L bar K}^{-1}\text{mol}^{-1}$)

**Step 1.** $K_c = \dfrac{[\text{PCl}_3][\text{Cl}_2]}{[\text{PCl}_5]} = \dfrac{0.060 \times 0.060}{0.090} = ${dec(pcl5.Kc, 2)}\ \text{mol L}^{-1}$.

**Step 2.** $\Delta n = 2 - 1 = +1$.

**Step 3.** $K_p = K_c\,RT = ${dec(pcl5.Kc, 2)} \times 0.08314 \times 500 = ${dec(pcl5.Kp, 3)}\ \text{bar}$.`,
      v: table(['Species', 'Equilibrium concentration / mol L⁻¹'], [['PCl₅', '0.090'], ['PCl₃', '0.060'], ['Cl₂', '0.060']], 'Table of equilibrium concentrations of phosphorus pentachloride, trichloride and chlorine'),
      n: 'Substitute the concentrations into the expression. The product of the two products is zero point zero zero three six, and dividing by zero point zero nine zero gives zero point zero four zero. There is one more mole of gas on the right, so delta n is plus one. Multiply by R T, which is about forty two bar per mole litre, to get Kp close to one point six six bar.',
    }),
    sl('concept', 'Changing the equation changes K', {
      b: 'K belongs to the equation as written. **Reverse** it: $K_\\text{new} = 1/K$. **Multiply** the coefficients by $n$: $K_\\text{new} = K^n$. **Add** two equations: $K = K_1 K_2$.',
      v: table(['Operation', 'New constant', 'Example'], [['Reverse the reaction', r`$1/K$`, r`$\ce{2NH3 <=> N2 + 3H2}$ has $1/K$`], ['Halve the coefficients', r`$\sqrt{K}$`, r`$\ce{1/2N2 + 3/2H2 <=> NH3}$ has $\sqrt{K}$`], ['Double the coefficients', r`$K^2$`, 'Square the constant'], ['Add two steps', r`$K_1 \times K_2$`, 'Multiply the constants']], 'Table of how the equilibrium constant changes when a reaction is reversed, scaled or added to another'),
      n: 'The value of K depends on how the equation is written. If you reverse the reaction, the new constant is the reciprocal. If you multiply all the coefficients by a number, the constant is raised to that power, so halving gives the square root. And when two reactions are added, their constants are multiplied.',
    }),
    sl('check', 'Quick check: manipulating K', {
      b: 'Find K for a rewritten equation.',
      n: 'Quick check. Decide whether the equation was reversed, scaled, or both.',
      chk: 'k-manip-mcq',
    }),
    sl('diagram', 'Reaction quotient Q and direction', {
      b: 'The **reaction quotient** $Q$ has the same form as $K$ but uses the concentrations present at any moment. **$Q < K$:** net forward. **$Q = K$:** equilibrium. **$Q > K$:** net reverse.',
      v: V.qk,
      n: 'The reaction quotient is built exactly like the equilibrium constant, but from the concentrations at this moment. If Q is smaller than K, there are too many reactants, and the net reaction runs forward. If Q is larger than K, there are too many products, and it runs in reverse. When Q equals K, the system is at equilibrium and no net change occurs.',
    }),
    sl('example', 'Worked example: predicting direction', {
      b: r`**Problem.** For $\ce{H2(g) + I2(g) <=> 2HI(g)}$, $K_c = 54$ at 700 K (given). A mixture has $[\text{H}_2] = 0.40$, $[\text{I}_2] = 0.10$, $[\text{HI}] = 0.30\ \text{mol L}^{-1}$. Which way does it shift?

**Step 1.** $Q_c = \dfrac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]} = \dfrac{(0.30)^2}{0.40 \times 0.10} = ${dec(dir.Q, 3)}$.

**Step 2.** $Q_c = ${dec(dir.Q, 3)} < K_c = 54$.

**Step 3.** More HI must form: the mixture shifts **forward** (towards products).`,
      v: table(['Quantity', 'Value'], [['Q', dec(dir.Q, 3)], ['K', '54'], ['Comparison', 'Q < K'], ['Direction', 'Forward (HI forms)']], 'Table comparing Q with K and giving the direction of shift for the hydrogen iodide mixture'),
      n: 'Work out Q from the mixture. The square of zero point three is zero point zero nine, divided by zero point four times zero point one, gives two point two five. That is far below fifty four, so the mixture has too little hydrogen iodide. The reaction therefore proceeds in the forward direction until Q rises to fifty four.',
    }),
    sl('concept', 'ICE tables: finding equilibrium concentrations', {
      b: 'Set up **I**nitial, **C**hange and **E**quilibrium rows using the stoichiometry. Write $K$ with the equilibrium row, then solve for $x$ (a perfect square can be square-rooted; otherwise use a quadratic or the small-$x$ approximation).',
      v: flow('LR', [['a', 'Write balanced equation and K'], ['b', 'Initial row from data'], ['c', 'Change row: −ax, +cx'], ['d', 'Equilibrium row'], ['e', 'Substitute into K and solve for x'], ['f', 'Check and report']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the steps of an ICE table calculation from the balanced equation to checking the answer'),
      n: 'An ICE table keeps the algebra tidy. Write the initial concentrations, then the change, using the coefficients and one unknown x, then the equilibrium row, which is initial plus change. Put the equilibrium row into the expression for K and solve for x. Finally, check that no concentration is negative and that the answer fits the constant.',
    }),
    sl('example', 'Worked example: ICE table', {
      b: r`**Problem.** $0.50\ \text{mol L}^{-1}$ each of $\ce{H2}$ and $\ce{I2}$ react at 700 K, $K_c = 54$ (given). Find the equilibrium concentrations.

**Step 1.** $\ce{H2 + I2 <=> 2HI}$: $[\text{H}_2] = [\text{I}_2] = 0.50 - x$, $[\text{HI}] = 2x$.

**Step 2.** $K_c = \dfrac{(2x)^2}{(0.50 - x)^2} = 54$, so $\dfrac{2x}{0.50 - x} = \sqrt{54} = 7.35$.

**Step 3.** $x = \dfrac{0.50 \times 7.35}{2 + 7.35} = ${dec(ice.x, 3)}$.

**Step 4.** $[\text{HI}] = 2x = ${dec(ice.HI, 3)}$ and $[\text{H}_2] = [\text{I}_2] = 0.50 - x = ${dec(ice.H, 3)}\ \text{mol L}^{-1}$.`,
      v: table(['', '[H₂]', '[I₂]', '[HI]'], [['Initial', '0.50', '0.50', '0'], ['Change', '−x', '−x', '+2x'], ['Equilibrium', dec(ice.H, 3), dec(ice.H, 3), dec(ice.HI, 3)]], 'ICE table for hydrogen iodide formation with initial, change and equilibrium concentrations'),
      n: 'Both sides of the expression are perfect squares, so take the square root of fifty four, about seven point three five. That gives a linear equation for x, and its solution is about zero point three nine three. The hydrogen iodide concentration is twice that, about zero point seven eight six, and what remains of each reactant is about zero point one zero seven.',
    }),
    sl('concept', 'Le Chatelier’s principle: concentration, pressure, temperature', {
      b: 'If a system at equilibrium is disturbed, it **shifts to partly oppose the change**. Only a change in **temperature** alters the value of $K$.',
      v: table(['Change', 'Shift', 'K changes?'], [['Add reactant (or remove product)', 'Forward', 'No'], ['Add product (or remove reactant)', 'Backward', 'No'], ['Raise pressure (reduce volume)', 'Towards fewer gas moles', 'No'], ['Raise temperature', 'Endothermic direction', 'Yes'], ['Lower temperature', 'Exothermic direction', 'Yes']], 'Table of the effect of concentration, pressure and temperature changes on the position of equilibrium and on K'),
      n: 'Le Chatelier said that a system at equilibrium responds to a disturbance by partly cancelling it. Add a reactant, and the system uses some up. Squeeze the gases, and it moves towards the side with fewer gas molecules. Heat it, and it favours the endothermic direction, which absorbs heat. Only a temperature change actually alters the value of the equilibrium constant.',
    }),
    sl('concept', 'Catalyst and inert gas', {
      b: 'A **catalyst** lowers the activation energy of forward and reverse reactions equally: equilibrium is reached faster, but its **position and K are unchanged**. An **inert gas** at constant volume does not change concentrations, so there is **no shift**; at constant pressure it increases volume and favours the side with more gas moles.',
      v: table(['Disturbance', 'Effect on position', 'Reason'], [['Catalyst', 'None', 'Speeds both directions equally'], ['Inert gas, constant volume', 'None', 'Partial pressures unchanged'], ['Inert gas, constant pressure', 'Towards more gas moles', 'Volume rises, as if pressure fell']], 'Table of the effect of a catalyst and an inert gas on the position of equilibrium'),
      n: 'A catalyst makes the forward and reverse reactions faster by the same factor, so you get to equilibrium sooner but at the same place. Adding an inert gas at constant volume changes no concentrations, so nothing shifts. If the pressure is kept constant, the volume grows, and the system moves towards the side with more gas molecules, as if the pressure had dropped.',
    }),
    sl('example', 'Worked example: the Haber process', {
      b: r`**Problem.** For $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $\Delta H^\circ = -92\ \text{kJ}$. How do (a) high pressure, (b) low temperature, (c) removing ammonia, (d) an iron catalyst affect the yield?

**(a)** 4 mol gas → 2 mol gas: high pressure favours ammonia.

**(b)** The forward reaction is exothermic: low temperature favours ammonia, but the rate is then too slow.

**(c)** Removing $\ce{NH3}$ makes $Q < K$: the reaction goes forward.

**(d)** The catalyst only speeds equilibrium; yield is unchanged. A compromise of about 700 K and high pressure is used.`,
      v: table(['Change', 'Effect on yield of NH₃', 'Practical note'], [['High pressure', 'Increases', 'Costly equipment'], ['Low temperature', 'Increases', 'Too slow'], ['Remove NH₃', 'Increases', 'Condense and recycle'], ['Catalyst', 'None', 'Faster rate']], 'Table applying Le Chatelier principle to the Haber process for ammonia'),
      n: 'Apply the principle to the Haber process. Four moles of gas become two, so high pressure helps. The reaction gives out heat, so low temperature helps the yield, but it makes the reaction too slow. Removing ammonia keeps Q below K. An iron catalyst speeds the approach but does not raise the yield, so industry chooses a compromise temperature with high pressure.',
    }),
    sl('check', 'Quick check: Le Chatelier', {
      b: 'Predict how a system responds to a disturbance.',
      n: 'Quick check. Count gas moles on each side, and note whether the reaction is exothermic.',
      chk: 'lechat-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Equilibrium is dynamic: forward and reverse rates are equal in a closed system.',
        'Kc = [products]^coefficients / [reactants]^coefficients; solids and pure liquids are omitted.',
        'Kp = Kc(RT)^Δn; reversing gives 1/K, scaling by n gives K^n, adding gives K₁K₂.',
        'Q < K: forward; Q = K: equilibrium; Q > K: reverse. ICE tables give equilibrium concentrations.',
        'Le Chatelier: the system opposes the change; only temperature changes K; a catalyst and an inert gas at constant volume do not shift equilibrium.',
      ],
      v: table(['Quantity', 'Statement'], [['Kc', 'Ratio at equilibrium, fixed at a given T'], ['Kp', r`$K_c(RT)^{\Delta n}$`], ['Q', 'Same form as K, any moment'], ['Catalyst', 'Changes rate, not K']], 'Summary table of Part 1 quantities'),
      n: 'Let us sum up Part 1. Chemical equilibrium is dynamic, with equal forward and reverse rates. The constant Kc comes from the law of mass action, Kp is related to it through delta n, and K changes if the equation is reversed or scaled. Comparing Q with K tells the direction, ICE tables give concentrations, and Le Chatelier’s principle predicts how conditions shift the balance.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write K for the equation as given; leave out solids and pure liquids.',
        'Use R = 0.08314 L bar K⁻¹ mol⁻¹ with Kp in bar, and T in kelvin.',
        'Compare Q with K before deciding direction; state the direction and the reason.',
        'In ICE tables, put the coefficient into the change row: +2x for 2HI.',
        'A catalyst and an inert gas at constant volume never change K or the position.',
      ],
      v: table(['Slip', 'Fix'], [['Including CaCO₃(s) in Kc', 'Omit pure solids'], ['Kp = Kc always', 'Only when Δn = 0'], ['Saying pressure changes K', 'Only temperature changes K'], ['Catalyst raises yield', 'Only the rate rises']], 'Table of four common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Write the expression for exactly the equation given, and omit solids. Use the right value of R, and remember that Kp equals Kc only when delta n is zero. Always compare Q with K and give the direction with a reason. Finally, remember that only temperature changes K, and a catalyst never changes the yield.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Equilibrium — Part 2: Ionic equilibrium, pH, buffers and solubility product',
  goals: [
    'Distinguish Arrhenius, Brønsted–Lowry and Lewis acids and bases, and identify conjugate pairs',
    'Calculate pH from Ka, Kb, degree of ionisation and Kw',
    'Explain the common ion effect, salt hydrolysis and buffers (Henderson equation)',
    'Use Ksp to find solubility and to predict precipitation',
  ],
  slides: [
    sl('title', 'Ionic Equilibrium', {
      b: 'Part 2 — equilibria of acids, bases, salts and sparingly soluble compounds in water.',
      v: table(['Question', 'Tool'], [['How acidic is this solution?', 'pH and Ka'], ['Why does a salt solution turn litmus?', 'Hydrolysis'], ['How can a solution resist a pH change?', 'Buffer'], ['Will a precipitate form on mixing?', 'Qsp against Ksp']], 'Table of four questions of Part 2 and the tool used to answer each'),
      n: 'In this part we look at equilibria between ions in water. We define acids and bases in three ways, calculate the pH of weak acids and bases, see why some salts make water acidic or basic, learn how buffers keep the pH steady, and use the solubility product to say how much of a sparingly soluble salt dissolves and when it precipitates.',
    }),
    sl('concept', 'Acids and bases: three definitions', {
      b: 'Each definition widens the last: **Arrhenius** (in water), **Brønsted–Lowry** (proton transfer), **Lewis** (electron-pair transfer).',
      v: table(['Theory', 'Acid', 'Base', 'Example'], [['Arrhenius', r`Gives $\ce{H+}$ in water`, r`Gives $\ce{OH-}$ in water`, r`$\ce{HCl}$, $\ce{NaOH}$`], ['Brønsted–Lowry', 'Proton donor', 'Proton acceptor', r`$\ce{NH3 + H2O <=> NH4+ + OH-}$`], ['Lewis', 'Electron-pair acceptor', 'Electron-pair donor', r`$\ce{BF3}$ accepts a pair from $\ce{NH3}$`]], 'Table comparing the Arrhenius, Brønsted–Lowry and Lewis definitions of acids and bases with examples'),
      n: 'The Arrhenius definition says an acid gives hydrogen ions in water and a base gives hydroxide ions. Brønsted and Lowry widened this: an acid is a proton donor and a base is a proton acceptor, in any solvent. Lewis went further: an acid accepts an electron pair and a base donates one, which explains boron trifluoride reacting with ammonia.',
    }),
    sl('concept', 'Conjugate acid–base pairs and amphoteric species', {
      b: 'When an acid loses $\\ce{H+}$ it forms its **conjugate base**; when a base gains $\\ce{H+}$ it forms its **conjugate acid**. A **strong** acid has a very weak conjugate base. Species that can do both (water, $\\ce{HCO3-}$) are **amphoteric**.',
      v: table(['Acid', 'Conjugate base', 'Base', 'Conjugate acid'], [[r`$\ce{HCl}$`, r`$\ce{Cl-}$`, r`$\ce{NH3}$`, r`$\ce{NH4+}$`], [r`$\ce{CH3COOH}$`, r`$\ce{CH3COO-}$`, r`$\ce{H2O}$`, r`$\ce{H3O+}$`], [r`$\ce{H2O}$`, r`$\ce{OH-}$`, r`$\ce{HCO3-}$`, r`$\ce{H2CO3}$`], [r`$\ce{H2PO4-}$`, r`$\ce{HPO4^2-}$`, r`$\ce{CO3^2-}$`, r`$\ce{HCO3-}$`]], 'Table of acids with conjugate bases and bases with conjugate acids'),
      n: 'Every acid has a conjugate base, formed when it loses a proton, and every base has a conjugate acid. The stronger the acid, the weaker its conjugate base, so chloride ions barely accept protons at all. Some species, such as water and the hydrogen carbonate ion, can either donate or accept a proton, and are called amphoteric.',
    }),
    sl('check', 'Quick check: conjugate pairs', {
      b: 'Identify a conjugate acid or base.',
      n: 'Quick check. Remove or add one proton, and keep track of the charge.',
      chk: 'conj-pair-mcq',
    }),
    sl('concept', 'Weak acids: Ka and degree of ionisation', {
      b: 'A weak acid HA ionises only partly: $K_a = \\dfrac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]}$. If $\\alpha$ is the **degree of ionisation**, $K_a = \\dfrac{c\\alpha^2}{1-\\alpha} \\approx c\\alpha^2$, so $\\alpha = \\sqrt{K_a/c}$ and $[\\text{H}^+] = c\\alpha = \\sqrt{K_a c}$ for $\\alpha \\ll 1$.',
      m: [r`K_a \approx c\alpha^2,\qquad \alpha = \sqrt{\dfrac{K_a}{c}},\qquad [\ce{H+}] = \sqrt{K_a\,c}`],
      v: table(['Acid (298 K)', 'Ka', 'pKa'], [['Ethanoic (acetic) acid', r`$1.8 \times 10^{-5}$`, '4.74'], ['Methanoic (formic) acid', r`$1.8 \times 10^{-4}$`, '3.74'], ['Hydrofluoric acid', r`$3.5 \times 10^{-4}$`, '3.46'], ['Hydrocyanic acid', r`$4.9 \times 10^{-10}$`, '9.31']], 'Table of acid ionisation constants and pKa values of four weak acids at 298 K'),
      n: 'A weak acid ionises only a little, and the acid ionisation constant Ka measures how much. If the degree of ionisation is small, Ka is about the concentration times the square of that degree. So the degree of ionisation is the square root of Ka divided by the concentration, and it increases on dilution. The hydrogen ion concentration is the square root of Ka times c.',
    }),
    sl('example', 'Worked example: pH of a weak acid', {
      b: r`**Problem.** Find $\alpha$ and the pH of $0.10\ \text{mol L}^{-1}$ ethanoic acid, $K_a = 1.8 \times 10^{-5}$.

**Step 1.** $\alpha = \sqrt{K_a/c} = \sqrt{1.8 \times 10^{-5}/0.10} = ${dec(ac.alpha, 3)}$ (about 1.3%, so $\alpha \ll 1$ is justified).

**Step 2.** $[\text{H}^+] = c\alpha = 0.10 \times ${dec(ac.alpha, 3)} = ${sci(ac.H, 3)}\ \text{mol L}^{-1}$.

**Step 3.** $\text{pH} = -\log(${sci(ac.H, 3)}) = ${dec(ac.pH, 3)}$.`,
      v: table(['Quantity', 'Value'], [['α', dec(ac.alpha, 3)], ['[H⁺] / mol L⁻¹', r`$${sci(ac.H, 3)}$`], ['pH', dec(ac.pH, 3)]], 'Table of the degree of ionisation, hydrogen ion concentration and pH of 0.10 molar ethanoic acid'),
      n: 'First find the degree of ionisation as the square root of one point eight times ten to the minus five divided by zero point one, about zero point zero one three four. Only one and a third percent of the molecules ionise, so the approximation is fine. The hydrogen ion concentration is zero point one times that, about one point three four times ten to the minus three, giving a pH of two point eight seven.',
    }),
    sl('concept', 'Weak bases, Kw and pH', {
      b: 'Water ionises slightly: $K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}$ at 298 K. $\\text{pH} = -\\log[\\text{H}^+]$, $\\text{pOH} = -\\log[\\text{OH}^-]$, and $\\text{pH} + \\text{pOH} = 14$. For a conjugate pair, $K_a K_b = K_w$, so $pK_a + pK_b = pK_w$. $K_w$ **increases** with temperature.',
      m: [r`\text{pH} + \text{pOH} = pK_w = 14,\qquad K_a \times K_b = K_w`],
      v: table(['Relation', 'Expression'], [['Water autoprotolysis', r`$K_w = [\ce{H+}][\ce{OH-}] = 1.0 \times 10^{-14}$`], ['pH', r`$-\log[\ce{H+}]$`], ['Conjugate pair', r`$pK_a + pK_b = 14$`], ['Weak base NH₃ (Kb = 1.8 × 10⁻⁵)', r`$[\ce{OH-}] = \sqrt{K_b c}$`]], 'Table of relations among Kw, pH, pOH and the ionisation constants of conjugate pairs'),
      n: 'Pure water ionises very slightly, and the product of the hydrogen and hydroxide ion concentrations is ten to the minus fourteen at room temperature. Taking negative logarithms, pH plus pOH equals fourteen. For any conjugate acid and base, Ka times Kb equals Kw, so a strong acid has a very weak conjugate base. Weak bases follow the same pattern as weak acids.',
    }),
    sl('diagram', 'The pH scale', {
      b: 'A change of **one pH unit** is a tenfold change in $[\\text{H}^+]$. Neutral water at 298 K has pH 7.',
      v: V.ph,
      n: 'The pH scale runs from zero to fourteen at room temperature. Gastric juice and lemon juice are strongly acidic, rainwater is slightly acidic, pure water is neutral at seven, blood and sea water are slightly basic, and household ammonia and sodium hydroxide are strongly basic. Each step down the scale is a tenfold increase in hydrogen ion concentration.',
    }),
    sl('example', 'Worked example: pH of a strong base', {
      b: r`**Problem.** Find the pH of $0.0050\ \text{mol L}^{-1}$ barium hydroxide, $\ce{Ba(OH)2}$ (a strong base, fully ionised).

**Step 1.** $\ce{Ba(OH)2 -> Ba^2+ + 2OH-}$, so $[\text{OH}^-] = 2 \times 0.0050 = 0.010\ \text{mol L}^{-1}$.

**Step 2.** $\text{pOH} = -\log(0.010) = ${dec(ba.pOH, 3)}$.

**Step 3.** $\text{pH} = 14 - 2.00 = ${dec(ba.pH, 4)}$.`,
      v: table(['Step', 'Result'], [['[OH⁻] / mol L⁻¹', '0.010'], ['pOH', '2.00'], ['pH', dec(ba.pH, 4)], ['[H⁺] / mol L⁻¹', r`1.0 × 10⁻¹²`]], 'Table of hydroxide concentration, pOH, pH and hydrogen ion concentration of 0.0050 molar barium hydroxide'),
      n: 'Barium hydroxide gives two hydroxide ions per formula unit, so the hydroxide concentration is twice the formula concentration, zero point zero one zero molar. The pOH is the negative logarithm, which is two. Subtracting from fourteen gives a pH of twelve. Remember the factor of two: forgetting it is a very common slip.',
    }),
    sl('check', 'Quick check: pH calculation', {
      b: 'Convert between concentration and pH.',
      n: 'Quick check. Work out whether the solution is an acid or a base before you take logarithms.',
      chk: 'ph-mcq',
    }),
    sl('concept', 'Common ion effect', {
      b: 'Adding an ion that is **common** to a weak electrolyte suppresses its ionisation. Sodium ethanoate added to ethanoic acid raises the $\\ce{CH3COO-}$ concentration, so the equilibrium shifts back, $\\alpha$ falls, and the **pH rises**.',
      m: [r`\ce{CH3COOH <=> CH3COO- + H+}`],
      v: table(['Mixture', 'Common ion', 'Effect'], [[r`$\ce{CH3COOH}$ + $\ce{CH3COONa}$`, r`$\ce{CH3COO-}$`, 'Ionisation of acid suppressed, pH rises'], [r`$\ce{NH3}$ + $\ce{NH4Cl}$`, r`$\ce{NH4+}$`, 'Ionisation of base suppressed, pH falls'], [r`$\ce{AgCl}$ in $\ce{NaCl}$`, r`$\ce{Cl-}$`, 'Solubility falls']], 'Table of three examples of the common ion effect and their consequences'),
      n: 'Add sodium ethanoate to a solution of ethanoic acid. The ethanoate ion is already a product of the acid’s ionisation, so by Le Chatelier’s principle the equilibrium moves back towards undissociated acid. The acid ionises less, the hydrogen ion concentration falls and the pH rises. The same idea reduces the solubility of a salt in a solution containing one of its ions.',
    }),
    sl('concept', 'Salt hydrolysis', {
      b: '**Hydrolysis** is the reaction of the ions of a salt with water. The ion of a **weak** acid or base reacts; ions of strong acids or bases do not. For the salt of a weak acid, $K_h = K_w/K_a$ and $[\\text{OH}^-] = \\sqrt{K_h c}$.',
      v: table(['Salt from', 'Example', 'Solution', 'Reason'], [['Strong acid + strong base', 'NaCl', 'Neutral, pH 7', 'No hydrolysis'], ['Weak acid + strong base', 'CH₃COONa', 'Basic, pH > 7', r`$\ce{CH3COO- + H2O <=> CH3COOH + OH-}$`], ['Strong acid + weak base', 'NH₄Cl', 'Acidic, pH < 7', r`$\ce{NH4+ + H2O <=> NH3 + H3O+}$`], ['Weak acid + weak base', 'CH₃COONH₄', 'Near neutral', 'Ka ≈ Kb for this pair']], 'Table of salt types, an example of each, the nature of the solution and the reason'),
      n: 'Salts can change the pH of water. The ion of a weak acid or weak base takes or gives a proton to water, and that is hydrolysis. Sodium ethanoate gives a basic solution, because the ethanoate ion pulls protons from water. Ammonium chloride gives an acidic solution, because the ammonium ion gives protons to water. Sodium chloride has no ion that hydrolyses, so it is neutral.',
    }),
    sl('example', 'Worked example: pH of a salt solution', {
      b: r`**Problem.** Find the pH of $0.10\ \text{mol L}^{-1}$ sodium ethanoate. ($K_a = 1.8 \times 10^{-5}$, $K_w = 1.0 \times 10^{-14}$)

**Step 1.** $K_h = K_w/K_a = ${sci(hy.Kh, 3)}$.

**Step 2.** $[\text{OH}^-] = \sqrt{K_h c} = \sqrt{${sci(hy.Kh, 3)} \times 0.10} = ${sci(hy.OH, 3)}\ \text{mol L}^{-1}$.

**Step 3.** $\text{pOH} = ${dec(hy.pOH, 3)}$, so $\text{pH} = 14 - ${dec(hy.pOH, 3)} = ${dec(hy.pH, 3)}$ (basic).`,
      v: flow('LR', [['a', 'Kh = Kw / Ka'], ['b', 'OH⁻ = square root of Kh times c'], ['c', 'pOH = −log OH⁻'], ['d', 'pH = 14 − pOH']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the steps for finding the pH of a salt of a weak acid and strong base'),
      n: 'The ethanoate ion is the conjugate base of a weak acid. Its hydrolysis constant is Kw divided by Ka, about five point six times ten to the minus ten. The hydroxide concentration is the square root of that times zero point one, about seven point five times ten to the minus six molar. The pOH is about five point one, so the pH is about eight point nine, a weakly basic solution.',
    }),
    sl('concept', 'Buffer solutions and the Henderson equation', {
      b: 'A **buffer** resists a change in pH on adding small amounts of acid or base. An **acidic buffer** is a weak acid + its salt; a **basic buffer** is a weak base + its salt. For an acidic buffer the **Henderson equation** is $\\text{pH} = pK_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}$.',
      m: [r`\text{pH} = pK_a + \log\dfrac{[\text{A}^-]}{[\text{HA}]}`],
      v: table(['Buffer', 'Components', 'Added H⁺ is removed by', 'Added OH⁻ is removed by'], [['Acidic', 'CH₃COOH + CH₃COONa', r`$\ce{CH3COO-}$`, r`$\ce{CH3COOH}$`], ['Basic', 'NH₃ + NH₄Cl', r`$\ce{NH3}$`, r`$\ce{NH4+}$`], ['Maximum capacity', 'Equal amounts of acid and salt', 'pH = pKa', 'Works within about pKa ± 1']], 'Table of acidic and basic buffers, their components and how each removes added acid or base'),
      n: 'A buffer contains a weak acid and its conjugate base in comparable amounts. Added acid is removed by the conjugate base, and added base is removed by the weak acid, so the ratio, and hence the pH, changes only slightly. The Henderson equation says the pH equals pKa plus the logarithm of the ratio of salt to acid. When the two are equal, the pH equals pKa.',
    }),
    sl('example', 'Worked example: a buffer at work', {
      b: r`**Problem.** A buffer has $0.10\ \text{mol}$ ethanoic acid and $0.20\ \text{mol}$ sodium ethanoate in 1.0 L ($pK_a = 4.74$). Find its pH, and the pH after adding $0.010\ \text{mol}$ NaOH.

**Step 1.** $\text{pH} = 4.74 + \log\dfrac{0.20}{0.10} = ${dec(buf.pH, 3)}$.

**Step 2.** NaOH converts acid to salt: acid $0.090$, salt $0.21$.

**Step 3.** $\text{pH} = 4.74 + \log\dfrac{0.21}{0.090} = ${dec(buf.pH2, 3)}$, a rise of only $${dec(buf.pH2 - buf.pH, 2)}$.`,
      v: table(['Stage', 'Acid / mol', 'Salt / mol', 'pH'], [['Initial', '0.10', '0.20', dec(buf.pH, 3)], ['After 0.010 mol NaOH', '0.090', '0.21', dec(buf.pH2, 3)]], 'Table of acid and salt amounts and pH before and after adding sodium hydroxide to an ethanoate buffer'),
      n: 'Initially the ratio of salt to acid is two, and the logarithm of two is point three zero, so the pH is about five point zero five. Adding sodium hydroxide uses up some acid and makes the same amount of salt, so the ratio becomes two point three three. The pH rises only to about five point one one. Adding the same base to pure water would have raised the pH by many units.',
    }),
    sl('concept', 'Solubility product', {
      b: 'In a **saturated** solution of a sparingly soluble salt, $K_{sp}$ is the product of ion concentrations, each raised to its coefficient. If the molar solubility is $s$: AB: $K_{sp} = s^2$; $\\text{AB}_2$ or $\\text{A}_2\\text{B}$: $K_{sp} = 4s^3$; $\\text{A}_3\\text{B}$: $27s^4$.',
      v: table(['Salt', 'Dissolution', 'Ksp in terms of s'], [['AgCl', r`$\ce{AgCl(s) <=> Ag+ + Cl-}$`, r`$s^2$`], ['CaF₂', r`$\ce{CaF2(s) <=> Ca^2+ + 2F-}$`, r`$4s^3$`], ['Ag₂CrO₄', r`$\ce{Ag2CrO4(s) <=> 2Ag+ + CrO4^2-}$`, r`$4s^3$`], ['Ag₃PO₄', r`$\ce{Ag3PO4(s) <=> 3Ag+ + PO4^3-}$`, r`$27s^4$`]], 'Table relating solubility product to molar solubility for salts of formula AB, AB2, A2B and A3B'),
      n: 'A sparingly soluble salt in a saturated solution is in equilibrium with its ions, and the product of the ion concentrations, each raised to its coefficient, is the solubility product. If s is the molar solubility, a salt like silver chloride gives s squared. A salt with a two to one ratio, such as calcium fluoride, gives four s cubed.',
    }),
    sl('example', 'Worked example: solubility and precipitation', {
      b: r`**Problem.** $K_{sp}(\text{AgCl}) = 1.8 \times 10^{-10}$ at 298 K. (a) Find the solubility in water. (b) Find it in $0.10\ \text{mol L}^{-1}$ NaCl. (c) Does AgCl precipitate when equal volumes of $4.0 \times 10^{-5}\ \text{M}$ $\ce{AgNO3}$ and $4.0 \times 10^{-5}\ \text{M}$ NaCl are mixed?

**(a)** $s = \sqrt{K_{sp}} = ${sci(ag.s, 3)}\ \text{mol L}^{-1}$.

**(b)** $s = K_{sp}/[\text{Cl}^-] = 1.8 \times 10^{-10}/0.10 = ${sci(ag.sNaCl, 2)}\ \text{mol L}^{-1}$.

**(c)** After mixing each ion is $2.0 \times 10^{-5}$ M: $Q_{sp} = ${sci(qsp.Q, 2)} > K_{sp}$, so **AgCl precipitates**.`,
      v: table(['Case', 'Result'], [['Solubility in water / mol L⁻¹', r`$${sci(ag.s, 3)}$`], ['In 0.10 M NaCl / mol L⁻¹', r`$${sci(ag.sNaCl, 2)}$`], ['Qsp after mixing', r`$${sci(qsp.Q, 2)}$`], ['Decision', 'Qsp > Ksp: precipitate']], 'Table of the solubility of silver chloride in water and in sodium chloride solution and the precipitation test'),
      n: 'In pure water, solubility is the square root of the solubility product, about one point three four times ten to the minus five molar. In zero point one molar sodium chloride the chloride concentration is fixed, so the solubility drops to about two times ten to the minus nine, a common ion effect. For precipitation, compare the ionic product with Ksp. Here it is larger, so a precipitate forms.',
    }),
    sl('concept', 'Predicting precipitation', {
      b: 'Calculate the **ionic product** $Q_{sp}$ with the concentrations present after mixing (remember dilution). **$Q_{sp} > K_{sp}$:** precipitate forms. **$Q_{sp} = K_{sp}$:** saturated. **$Q_{sp} < K_{sp}$:** no precipitate.',
      v: table(['Comparison', 'Meaning', 'Action'], [[r`$Q_{sp} < K_{sp}$`, 'Unsaturated', 'More solid can dissolve'], [r`$Q_{sp} = K_{sp}$`, 'Saturated', 'Equilibrium'], [r`$Q_{sp} > K_{sp}$`, 'Supersaturated', 'Ions precipitate until Q = K']], 'Table of the comparison of ionic product with solubility product and its meaning'),
      n: 'The test for precipitation is the same idea as Q against K. Work out the ionic product from the concentrations after mixing, remembering that mixing dilutes both solutions. If it is below Ksp, the solution is unsaturated. If equal, it is saturated. If above, the ions combine and the excess comes out as a precipitate until the product falls back to Ksp.',
    }),
    sl('check', 'Quick check: solubility product', {
      b: 'Relate Ksp to molar solubility.',
      n: 'Quick check. Count the ions in the formula and use the matching power of s.',
      chk: 'ksp-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Arrhenius, Brønsted–Lowry and Lewis definitions; conjugate pairs; a strong acid has a weak conjugate base.',
        'Weak acid: α = √(Ka/c), [H⁺] = √(Ka c); Kw = 10⁻¹⁴, pH + pOH = 14, pKa + pKb = 14.',
        'Common ion effect suppresses ionisation (and solubility); hydrolysis of ions of weak acids or bases changes pH.',
        'Buffer: pH = pKa + log([salt]/[acid]); it resists small additions of acid or base.',
        'Ksp: AB gives s², AB₂ gives 4s³; Qsp > Ksp means precipitation.',
      ],
      v: table(['Quantity', 'Relation'], [['Weak acid', r`$[\ce{H+}] = \sqrt{K_a c}$`], ['Hydrolysis', r`$K_h = K_w/K_a$`], ['Buffer', r`$\text{pH} = pK_a + \log([\text{salt}]/[\text{acid}])$`], ['Precipitation', r`$Q_{sp} > K_{sp}$`]], 'Summary table of main relations in Part 2'),
      n: 'Let us sum up Part 2. We defined acids and bases three ways and identified conjugate pairs. For weak acids and bases, the degree of ionisation and the pH come from the ionisation constant. The common ion effect suppresses ionisation, salts hydrolyse if they contain ions of weak acids or bases, buffers follow the Henderson equation, and the solubility product decides solubility and precipitation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Check α ≪ 1 before using √(Ka c); otherwise solve the quadratic.',
        'For bases, calculate pOH first, then pH = 14 − pOH; watch for two OH⁻ per formula unit.',
        'Henderson: salt in the numerator, acid in the denominator.',
        'Ksp: write the expression for the formula given, with the right powers of s.',
        'For precipitation, use concentrations after mixing and compare Qsp with Ksp.',
      ],
      v: table(['Slip', 'Fix'], [['Forgetting dilution on mixing', 'Halve each concentration for equal volumes'], ['Using pH = −log[OH⁻]', 'That is pOH'], ['Salt/acid inverted in Henderson', 'log(salt/acid)'], ['Ksp = s² for CaF₂', '4s³']], 'Table of four common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Check that the degree of ionisation is small before using the square root shortcut. For bases, find pOH first. In the Henderson equation, put the salt on top. Write the solubility product expression to match the formula. And in precipitation questions, always use the concentrations after mixing and compare the ionic product with Ksp.',
    }),
  ],
});
