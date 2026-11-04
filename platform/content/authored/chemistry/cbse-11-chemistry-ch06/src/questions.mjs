// ch06 Equilibrium — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d c a.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, dec, sci, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const Rg = 0.08314;
const Kw = 1.0e-14;
const Ka = 1.8e-5; // ethanoic acid
const pKa = -Math.log10(Ka);
const j = (x, n = 4) => dec(x, n);
const S = (x, n = 2) => sci(x, n);
const lg = Math.log10;

// ---------------------------------------------------------------- numbers
// n1: Kc for ammonia synthesis
const n1 = { N: 0.2, H: 0.3, A: 0.12 };
n1.Kc = n1.A ** 2 / (n1.N * n1.H ** 3);
// n2: Kp from Kc
const n2 = { Kc: 0.06, T: 500 };
n2.Kp = n2.Kc * (Rg * n2.T) ** -2;
// n3: Q for HI
const n3 = { H: 0.1, I: 0.2, HI: 0.6, K: 54 };
n3.Q = n3.HI ** 2 / (n3.H * n3.I);
// n4: ICE, CO + H2O <=> CO2 + H2, Kc = 9.0
const n4 = { K: 9.0, c0: 1.0 };
n4.x = (n4.c0 * Math.sqrt(n4.K)) / (1 + Math.sqrt(n4.K));
// n5: pH of HCN
const n5 = { Ka: 4.9e-10, c: 0.1 };
n5.H = Math.sqrt(n5.Ka * n5.c);
n5.pH = -lg(n5.H);
// n6: pH of ammonia
const n6 = { Kb: 1.8e-5, c: 0.2 };
n6.OH = Math.sqrt(n6.Kb * n6.c);
n6.pOH = -lg(n6.OH);
n6.pH = 14 - n6.pOH;
// n7: Henderson
const n7 = { A: 0.2, B: 0.1 };
n7.pH = pKa + lg(n7.B / n7.A);
// n8: Ag2CrO4 molar solubility
const n8 = { Ksp: 1.1e-12 };
n8.s = Math.cbrt(n8.Ksp / 4);
// n9: minimum chloride for AgCl precipitation
const n9 = { Ag: 2.0e-4, Ksp: 1.8e-10 };
n9.Cl = n9.Ksp / n9.Ag;

// ---------------------------------------------------------------- t01 equilibrium in physical and chemical processes
add('physical-eq-mcq', mcq({
  stem: 'Water is sealed in a flask at 298 K and left until the vapour pressure becomes constant. At that stage:',
  right: 'evaporation and condensation continue at equal rates',
  wrong: ['evaporation has stopped', 'all the water has turned to vapour', 'condensation has stopped'],
  sol: 'A constant vapour pressure does not mean that nothing is happening. The two opposing processes go on at equal rates, so the amounts of liquid and vapour stay constant — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('dynamic-mcq', mcq({
  stem: 'Some radioactively labelled sugar crystals are added to a saturated sugar solution that already contains undissolved crystals. After a while the solution becomes radioactive, although its concentration has not changed. This shows that at equilibrium:',
  right: 'dissolution and crystallisation both continue at equal rates',
  wrong: ['dissolution has stopped, and only crystallisation occurs', 'crystallisation has stopped, and only dissolution occurs', 'the labelled sugar reacts chemically with the solution'],
  sol: 'Labelled molecules leave the crystals (dissolution) and unlabelled ones join them (crystallisation) at the same rate, so the concentration is constant but the process is dynamic — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dyn-ar', ar({
  a: 'At chemical equilibrium the concentrations of reactants and products stay constant with time.',
  r: 'At equilibrium the rate of the forward reaction equals the rate of the reverse reaction.',
  key: 'a',
  sol: 'Both are true. If the two rates are equal, each species is formed as fast as it is used up, so its concentration is constant; R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('equal-conc-tf', tf({
  stem: 'At equilibrium the concentrations of reactants and products are always equal.',
  key: 'f',
  sol: 'False. It is the **rates** of the forward and reverse reactions that are equal; the concentrations are constant, and their ratio is given by K, which may be far from 1.',
  d: 1, c: 'understanding', t: [1],
}));
add('eq-dyn-short', short({
  marks: 2,
  stem: 'A sealed flask contains liquid water in equilibrium with its vapour. Why is this equilibrium described as dynamic?',
  model: 'Water molecules continue to leave the liquid and vapour molecules continue to return to it. The two rates are equal, so the amount of liquid and the vapour pressure stay constant, although both processes carry on at the molecular level.',
  sol: 'Equal rates of evaporation and condensation.',
  scheme: [['Both processes continue', 1], ['Equal rates give constant properties', 1]],
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Kc, Kp, Q, ICE
add('k-manip-mcq', mcq({
  stem: r`For $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, $K_c = 100$ at a certain temperature (given). The equilibrium constant for $\ce{SO3(g) <=> SO2(g) + 1/2O2(g)}$ at the same temperature is:`,
  right: '0.10',
  wrong: ['0.010', '10', '0.20'],
  sol: r`The new equation is the first one reversed and halved, so $K' = (1/K_c)^{1/2} = (1/100)^{1/2} = 0.10$ — option (@K). (@1) reverses without halving, and (@2) halves without reversing.`,
  d: 3, c: 'application', t: [2],
}), () => near(Math.sqrt(1 / 100), 0.1, 1e-9) || 'K');
add('kc-expr-mcq', mcq({
  stem: r`The equilibrium constant $K_c$ for $\ce{3Fe(s) + 4H2O(g) <=> Fe3O4(s) + 4H2(g)}$ is:`,
  right: r`$\dfrac{[\text{H}_2]^4}{[\text{H}_2\text{O}]^4}$`,
  wrong: [r`$\dfrac{[\text{Fe}_3\text{O}_4][\text{H}_2]^4}{[\text{Fe}]^3[\text{H}_2\text{O}]^4}$`, r`$\dfrac{[\text{H}_2\text{O}]^4}{[\text{H}_2]^4}$`, r`$\dfrac{[\text{Fe}_3\text{O}_4]}{[\text{Fe}]^3}$`],
  sol: 'Pure solids (Fe and Fe₃O₄) are left out of the expression, so only the gases appear: products over reactants, each raised to its coefficient — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('kp-kc-mcq', mcq({
  stem: r`For $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, the relation between $K_p$ and $K_c$ is:`,
  right: r`$K_p = K_c(RT)^{-1}$`,
  wrong: [r`$K_p = K_c$`, r`$K_p = K_c(RT)$`, r`$K_p = K_c(RT)^{-2}$`],
  sol: r`$\Delta n = 2 - 3 = -1$, so $K_p = K_c(RT)^{\Delta n} = K_c(RT)^{-1}$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('q-dir-mcq', mcq({
  stem: r`For $\ce{N2O4(g) <=> 2NO2(g)}$, $K_c = 0.15$ at 400 K (given). A mixture contains $[\text{N}_2\text{O}_4] = 0.020$ and $[\text{NO}_2] = 0.060\ \text{mol L}^{-1}$. The mixture will:`,
  right: r`shift in the reverse direction, because $Q_c = 0.18 > K_c$`,
  wrong: [r`shift in the forward direction, because $Q_c = 0.18 > K_c$`, r`stay unchanged, because $Q_c = K_c$`, r`shift in the forward direction, because $Q_c = 0.0060 < K_c$`],
  sol: r`$Q_c = (0.060)^2/0.020 = 0.18$, which is larger than $K_c = 0.15$, so there is too much $\ce{NO2}$ and the net reaction goes in reverse — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(0.06 ** 2 / 0.02, 0.18, 1e-9) || 'Q');
add('kp-ar', ar({
  a: r`The value of $K_c$ for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ at a given temperature does not change when the pressure is increased.`,
  r: 'Increasing the pressure shifts this equilibrium towards the products.',
  key: 'b',
  sol: 'A is true: K depends only on temperature. R is also true (4 → 2 moles of gas), but it does not explain A: the shift in position happens with the concentrations adjusting so that K stays the same — option (b).',
  d: 3, c: 'analysis', t: [2, 3],
}));
add('kc-fill', fill({
  stem: 'In the expression for Kc, the concentrations of pure ___ and pure liquids are not included.',
  acc: [['solids', 'solid']],
  sol: 'Pure **solids** and pure liquids have constant activity (taken as 1) and are left out.',
  d: 1, c: 'recall', t: [2],
}));
add('kc-het-short', short({
  marks: 2,
  stem: r`Write $K_c$ and $K_p$ for $\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$ and explain why the solids do not appear.`,
  model: r`$K_c = [\text{CO}_2]$ and $K_p = p_{\text{CO}_2}$. The concentration of a pure solid is fixed by its density and does not change, so it is incorporated into the constant (its activity is 1).`,
  sol: 'Only the gas appears; solids have constant activity.',
  scheme: [['Kc and Kp expressions', 1], ['Reason: constant activity of pure solids', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('q-short', short({
  marks: 2,
  stem: r`What is the reaction quotient, Q? How does it differ from K, and what does Q > K tell you?`,
  model: 'Q has the same form as K but uses the concentrations present at any moment, whereas K uses equilibrium concentrations. If Q is greater than K, there are too many products, so the net reaction proceeds in the reverse direction until Q equals K.',
  sol: 'Q at any moment; Q > K gives reverse reaction.',
  scheme: [['Definition and difference from K', 1], ['Q > K: net reverse reaction', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('kc-num', num({
  stem: r`At equilibrium, a mixture in a 1.0 L vessel contains $${n1.N}\ \text{mol}$ $\ce{N2}$, $${n1.H}\ \text{mol}$ $\ce{H2}$ and $${n1.A}\ \text{mol}$ $\ce{NH3}$ (given). Calculate $K_c$ for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$.`,
  value: Number(j(n1.Kc, 3)), tol: 0.02, unit: 'L² mol⁻²',
  sol: r`$K_c = \dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3} = \dfrac{(${n1.A})^2}{${n1.N} \times (${n1.H})^3} = \dfrac{${j(n1.A ** 2, 3)}}{${j(n1.N * n1.H ** 3, 3)}} = ${j(n1.Kc, 3)}$, in $\text{L}^2\text{mol}^{-2}$.`,
  scheme: [['Correct expression with powers', 1], ['Substitution and Kc = 2.67', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), () => near(0.12 ** 2 / (0.2 * 0.3 ** 3), 2.667, 0.002) || 'Kc');
add('kp-num', num({
  stem: r`For $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $K_c = ${n2.Kc}\ \text{L}^2\text{mol}^{-2}$ at ${n2.T} K (given). Calculate $K_p$ in $\text{bar}^{-2}$. ($R = 0.08314\ \text{L bar K}^{-1}\text{mol}^{-1}$)`,
  value: Number(n2.Kp.toPrecision(3)), tol: 2e-7, unit: 'bar⁻²',
  sol: r`$\Delta n = 2 - 4 = -2$, so $K_p = K_c(RT)^{-2}$, with $RT = 0.08314 \times ${n2.T} = ${j(Rg * n2.T, 4)}$. $K_p = ${n2.Kc}/(${j(Rg * n2.T, 4)})^2 = ${S(n2.Kp, 3)} = ${n2.Kp.toPrecision(3)}$, i.e. $${S(n2.Kp, 3)}\ \text{bar}^{-2}$.`,
  scheme: [['Δn = −2 and RT = 41.57 L bar mol⁻¹', 1], ['Kp = 3.47 × 10⁻⁵ bar⁻²', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), () => near(0.06 / (0.08314 * 500) ** 2, 3.47e-5, 0.005) || 'Kp');
add('q-num', num({
  stem: r`For $\ce{H2(g) + I2(g) <=> 2HI(g)}$, $K_c = ${n3.K}$ at 700 K (given). A mixture contains $[\text{H}_2] = ${n3.H}$, $[\text{I}_2] = ${n3.I}$ and $[\text{HI}] = ${n3.HI}\ \text{mol L}^{-1}$. Calculate $Q_c$ and state the direction in which the reaction proceeds.`,
  value: n3.Q, tol: 0.1, unit: null,
  sol: r`$Q_c = \dfrac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]} = \dfrac{(${n3.HI})^2}{${n3.H} \times ${n3.I}} = ${j(n3.Q, 3)}$. Since $Q_c = ${j(n3.Q, 3)} < K_c = ${n3.K}$, the reaction proceeds in the forward direction.`,
  scheme: [['Qc = 18', 1], ['Q < K, so forward', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), () => near(0.6 ** 2 / (0.1 * 0.2), 18, 1e-9) || 'Q');
add('ice-num', num({
  stem: r`For $\ce{CO(g) + H2O(g) <=> CO2(g) + H2(g)}$, $K_c = ${n4.K}$ at a certain temperature (given). Initially $${n4.c0}\ \text{mol L}^{-1}$ each of $\ce{CO}$ and $\ce{H2O}$ are present. Calculate the equilibrium concentration of $\ce{H2}$, in mol L⁻¹.`,
  value: n4.x, tol: 0.01, unit: 'mol L⁻¹',
  sol: r`Let $[\text{H}_2] = [\text{CO}_2] = x$ and $[\text{CO}] = [\text{H}_2\text{O}] = ${n4.c0} - x$. $K_c = \dfrac{x^2}{(${n4.c0} - x)^2} = ${n4.K}$, so $\dfrac{x}{${n4.c0} - x} = \sqrt{${n4.K}} = 3$ and $x = \dfrac{3 \times ${n4.c0}}{1 + 3} = ${j(n4.x, 3)}$, i.e. $[\text{H}_2] = ${j(n4.x, 3)}\ \text{mol L}^{-1}$.`,
  scheme: [['ICE table and Kc expression', 1], ['Square root: x/(1 − x) = 3', 1], ['x = 0.75 mol L⁻¹', 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), () => near((1 * 3) / (1 + 3), 0.75, 1e-9) && near(0.75 ** 2 / 0.25 ** 2, 9, 1e-9) || 'ICE');
add('pcl5-short3', short({
  marks: 3,
  stem: r`For $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$, $\Delta H^\circ = +93\ \text{kJ}$. Predict, with reasons, the effect on the equilibrium of (i) raising the temperature, (ii) raising the pressure by reducing the volume, and (iii) adding chlorine at constant volume.`,
  model: '(i) The forward reaction is endothermic, so a higher temperature favours it: more PCl₃ and Cl₂, and K increases. (ii) There is one mole of gas on the left and two on the right, so higher pressure shifts the equilibrium to the left. (iii) Adding Cl₂ raises Q above K, so the equilibrium shifts to the left, forming more PCl₅.',
  sol: 'Endothermic forward reaction; fewer gas moles on the left; adding a product gives reverse shift.',
  scheme: [['(i) Forward shift, endothermic', 1], ['(ii) Backward shift, fewer gas moles', 1], ['(iii) Backward shift, Q > K', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t03 Le Chatelier
add('lechat-mcq', mcq({
  stem: r`$\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ is exothermic. Which change increases the equilibrium yield of $\ce{SO3}$?`,
  right: 'Reducing the volume of the container at constant temperature',
  wrong: ['Raising the temperature', 'Adding a catalyst', 'Adding argon at constant volume'],
  sol: 'Three moles of gas change to two, so compression favours SO₃ — option (@K). A higher temperature favours the endothermic (reverse) direction; a catalyst and an inert gas at constant volume do not shift the equilibrium.',
  d: 2, c: 'application', t: [3],
}));
add('catalyst-mcq', mcq({
  stem: 'Two identical equilibrium mixtures are prepared, one with a catalyst and one without. After equilibrium is reached, they differ in:',
  right: 'neither the composition nor the value of K, but the one with the catalyst got there sooner',
  wrong: ['the yield of products, which is higher with the catalyst', 'the value of K, which is larger with the catalyst', 'the composition, because the catalyst takes part in the reaction'],
  sol: 'A catalyst lowers the activation energy of both directions equally. It speeds up the attainment of equilibrium but does not change K or the composition — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('temp-mcq', mcq({
  stem: 'For an exothermic reaction, an increase in temperature:',
  right: 'decreases the equilibrium constant and shifts the equilibrium towards the reactants',
  wrong: ['increases the equilibrium constant and the yield of products', 'leaves the equilibrium constant unchanged but speeds up the reaction', 'has no effect on the position, as it affects only the rate'],
  sol: 'Heat can be treated as a product of an exothermic reaction; adding heat shifts the equilibrium back, and K falls — option (@K). Temperature is the one factor that changes K.',
  d: 2, c: 'understanding', t: [3],
}));
add('inert-mcq', mcq({
  stem: r`Argon is added at constant volume to an equilibrium mixture of $\ce{N2}$, $\ce{H2}$ and $\ce{NH3}$ at constant temperature. The amount of ammonia:`,
  right: 'stays the same, because the concentrations of the reacting gases do not change',
  wrong: ['increases, because the total pressure rises', 'decreases, because the total pressure rises', 'increases, because argon is inert'],
  sol: 'At constant volume the number of moles per litre of N₂, H₂ and NH₃ is unchanged, so Q still equals K and there is no shift — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('catalyst-short', short({
  marks: 2,
  stem: 'Why does a catalyst not change the value of the equilibrium constant or the composition of the equilibrium mixture?',
  model: 'A catalyst provides a new path with a lower activation energy, and it lowers the barrier for the forward and reverse reactions by the same amount. Both rates rise equally, so equilibrium is reached sooner, but the ratio of the rate constants, and so K, is unchanged.',
  sol: 'Both directions are speeded up equally.',
  scheme: [['Lowers activation energy of both directions equally', 1], ['K (ratio of rates) and composition unchanged; time to equilibrium shorter', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('lechat-long', long({
  stem: '(a) State Le Chatelier’s principle.\n\n' + r`(b) For $\ce{N2O4(g) <=> 2NO2(g)}$, $\Delta H = +57\ \text{kJ}$, predict the effect on the amount of $\ce{NO2}$ of (i) increasing the pressure, (ii) raising the temperature, (iii) removing $\ce{NO2}$ as it forms, (iv) adding a catalyst.` + '\n\n' + r`(c) Which of these changes alters the value of $K_c$?`,
  model: r`(a) If a system at equilibrium is disturbed by a change in concentration, pressure or temperature, it shifts in the direction that partly opposes the disturbance. (b) (i) One mole of gas gives two, so higher pressure shifts the equilibrium towards N₂O₄ and less NO₂ is present. (ii) The forward reaction is endothermic, so heating favours it and more NO₂ forms. (iii) Removing NO₂ lowers Q below K, so more N₂O₄ dissociates and more NO₂ forms. (iv) A catalyst does not change the position, so the amount of NO₂ is the same. (c) Only the temperature change alters K, which increases when the mixture is heated.`,
  sol: 'Principle; four predictions with reasons; only temperature changes K.',
  scheme: [['(a) Statement', 1], ['(b) (i) and (ii) with reasons', 1.5], ['(b) (iii) and (iv) with reasons', 1.5], ['(c) Only temperature changes K', 1]],
  d: 3, c: 'application', t: [3],
}));
add('kc-long', long({
  stem: r`(a) State the law of mass action and write $K_c$ for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$.` + '\n\n' + r`(b) Show that $K_p = K_c(RT)^{\Delta n}$.` + '\n\n' + r`(c) If $K_c = 0.060$ for the reaction above at 500 K, find $K_c$ for $\ce{2NH3(g) <=> N2(g) + 3H2(g)}$ and for $\ce{1/2N2(g) + 3/2H2(g) <=> NH3(g)}$.`,
  model: r`(a) At a fixed temperature, the rate of a reaction is proportional to the product of the active masses of the reactants; at equilibrium this gives a constant ratio, $K_c = [\text{NH}_3]^2/([\text{N}_2][\text{H}_2]^3)$. (b) For an ideal gas $p = (n/V)RT = cRT$, so each partial pressure is $c\,RT$. Substituting into $K_p$ gives $K_p = K_c(RT)^{\Delta n}$, where $\Delta n$ is the change in moles of gas. (c) For the reversed reaction, $K = 1/0.060 = ${j(1 / 0.06, 3)}$; for the halved equation, $K = \sqrt{0.060} = ${j(Math.sqrt(0.06), 3)}$.`,
  sol: 'Law and expression; p = cRT substitution; reciprocal and square root.',
  scheme: [['(a) Law and Kc expression', 1.5], ['(b) p = cRT substituted', 1.5], ['(c) 1/K = 16.7', 1], ['(c) √K = 0.245', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(1 / 0.06, 16.67, 0.002) && near(Math.sqrt(0.06), 0.245, 0.002) || 'K');

// ---------------------------------------------------------------- t04 ionic equilibrium
add('conj-pair-mcq', mcq({
  stem: r`The conjugate base of $\ce{H2PO4-}$ is:`,
  right: r`$\ce{HPO4^2-}$`,
  wrong: [r`$\ce{H3PO4}$`, r`$\ce{PO4^3-}$`, r`$\ce{H3O+}$`],
  sol: r`A conjugate base is formed by the loss of one proton: $\ce{H2PO4- -> HPO4^2- + H+}$ — option (@K). $\ce{H3PO4}$ is the conjugate acid.`,
  d: 1, c: 'application', t: [4],
}));
add('ph-mcq', mcq({
  stem: r`The pH of a $1.0 \times 10^{-3}\ \text{mol L}^{-1}$ solution of sodium hydroxide at 298 K is:`,
  right: '11',
  wrong: ['3', '9', '14'],
  sol: r`$[\text{OH}^-] = 1.0 \times 10^{-3}$, so $\text{pOH} = 3$ and $\text{pH} = 14 - 3 = 11$ — option (@K). (@1) is the pOH.`,
  d: 1, c: 'application', t: [4],
}));
add('lewis-mcq', mcq({
  stem: r`Which of the following behaves as a Lewis acid?`,
  right: r`$\ce{AlCl3}$`,
  wrong: [r`$\ce{NH3}$`, r`$\ce{Cl-}$`, r`$\ce{H2O}$`],
  sol: 'AlCl₃ has an incomplete octet on aluminium and accepts an electron pair — option (@K). NH₃, Cl⁻ and H₂O each have lone pairs to donate.',
  d: 1, c: 'understanding', t: [4],
}));
add('amphoteric-mcq', mcq({
  stem: 'Which of the following species can act as both a Brønsted acid and a Brønsted base?',
  right: r`$\ce{HCO3-}$`,
  wrong: [r`$\ce{CO3^2-}$`, r`$\ce{NH4+}$`, r`$\ce{Cl-}$`],
  sol: r`$\ce{HCO3-}$ can lose a proton to give $\ce{CO3^2-}$ or gain one to give $\ce{H2CO3}$ — option (@K). The others can only accept or only donate.`,
  d: 2, c: 'understanding', t: [4],
}));
add('ph-ratio-mcq', mcq({
  stem: 'The hydrogen ion concentration of a solution of pH 3 is how many times that of a solution of pH 5?',
  right: '100',
  wrong: ['2', '10', '0.01'],
  sol: r`$[\text{H}^+] = 10^{-3}$ and $10^{-5}$ respectively; the ratio is $10^{-3}/10^{-5} = 100$ — option (@K). Each pH unit is a factor of 10.`,
  d: 2, c: 'application', t: [4],
}));
add('pka-mcq', mcq({
  stem: r`$K_a$ of hydrocyanic acid is $4.9 \times 10^{-10}$ at 298 K. The $K_b$ of the cyanide ion at 298 K is about:`,
  right: r`$2.0 \times 10^{-5}$`,
  wrong: [r`$4.9 \times 10^{-24}$`, r`$4.9 \times 10^{-4}$`, r`$1.0 \times 10^{-7}$`],
  sol: r`$K_b = K_w/K_a = 1.0 \times 10^{-14}/(4.9 \times 10^{-10}) \approx ${S(Kw / 4.9e-10, 2)}$ — option (@K). (@1) multiplies $K_a$ and $K_w$.`,
  d: 3, c: 'application', t: [4],
}), () => near(Kw / 4.9e-10, 2.04e-5, 0.005) || 'Kb');
add('common-ion-mcq', mcq({
  stem: 'Solid sodium ethanoate is dissolved in a solution of ethanoic acid. The pH of the solution:',
  right: 'increases, because the ethanoate ion suppresses the ionisation of the acid',
  wrong: ['decreases, because more H⁺ ions are produced', 'remains the same, because sodium ethanoate is a neutral salt', 'decreases, because ethanoate is a strong acid'],
  sol: 'The common ion CH₃COO⁻ shifts CH₃COOH ⇌ CH₃COO⁻ + H⁺ to the left, lowering [H⁺] and raising the pH — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('hydrolysis-mcq', mcq({
  stem: 'An aqueous solution of ammonium chloride is acidic because:',
  right: r`the $\ce{NH4+}$ ion donates a proton to water`,
  wrong: [r`the $\ce{Cl-}$ ion accepts a proton from water`, r`the $\ce{Cl-}$ ion hydrolyses to give $\ce{HCl}$ and $\ce{OH-}$`, r`ammonium chloride is a salt of a strong acid and a strong base`],
  sol: r`$\ce{NH4+ + H2O <=> NH3 + H3O+}$: the ammonium ion is the conjugate acid of a weak base. Chloride is the conjugate base of a strong acid and does not hydrolyse — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}));
add('buffer-mcq', mcq({
  stem: r`Which mixture forms an acidic buffer solution?`,
  right: r`50 mL of $0.20\ \text{M}$ $\ce{CH3COOH}$ + 25 mL of $0.20\ \text{M}$ $\ce{NaOH}$`,
  wrong: [r`25 mL of $0.20\ \text{M}$ $\ce{CH3COOH}$ + 25 mL of $0.20\ \text{M}$ $\ce{NaOH}$`, r`50 mL of $0.10\ \text{M}$ $\ce{HCl}$ + 50 mL of $0.10\ \text{M}$ $\ce{NaOH}$`, r`50 mL of $0.20\ \text{M}$ $\ce{HCl}$ + 25 mL of $0.20\ \text{M}$ $\ce{NaCl}$`],
  sol: r`In (@K), 10 mmol of acid is half neutralised by 5 mmol of base, leaving 5 mmol of $\ce{CH3COOH}$ and 5 mmol of $\ce{CH3COO-}$. In (@1) the acid is exactly neutralised (only salt remains); (@2) gives only NaCl; (@3) has a strong acid, which is not a buffer.`,
  d: 3, c: 'analysis', t: [4],
}), () => 50 * 0.2 - 25 * 0.2 === 5 && 25 * 0.2 === 5 || 'buffer');
add('henderson-mcq', mcq({
  stem: r`A buffer made from a weak acid HA and its sodium salt has a pH of 5.0 when $[\text{A}^-]/[\text{HA}] = 10$. The $pK_a$ of the acid is:`,
  right: '4.0',
  wrong: ['5.0', '6.0', '4.5'],
  sol: r`$\text{pH} = pK_a + \log 10 = pK_a + 1$, so $pK_a = 5.0 - 1 = 4.0$ — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('kw-ar', ar({
  a: 'The pH of pure water decreases when it is heated from 298 K to 373 K, yet the water remains neutral.',
  r: 'The ionic product of water, Kw, decreases with increase in temperature.',
  key: 'c',
  sol: 'A is true: Kw increases on heating, so [H⁺] = [OH⁻] rises, pH falls (to about 6.1 at 373 K) and [H⁺] still equals [OH⁻], so the water is neutral. R is false, because Kw increases — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('nh4cl-ar', ar({
  a: 'An aqueous solution of ammonium chloride turns blue litmus red.',
  r: 'The chloride ion reacts with water to produce hydronium ions.',
  key: 'c',
  sol: 'A is true because NH₄⁺ donates protons to water. R is false: Cl⁻ is the conjugate base of a strong acid and does not react with water — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('buffer-ar', ar({
  a: 'A mixture of ethanoic acid and sodium ethanoate resists a change in pH on adding small amounts of acid or base.',
  r: 'The ethanoate ion removes added H⁺ and ethanoic acid removes added OH⁻, so the ratio [salt]/[acid] changes only slightly.',
  key: 'a',
  sol: 'Both are true and R is the explanation, since pH depends on the logarithm of the ratio [salt]/[acid] — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ph-tf', tf({
  stem: r`The pH of $1.0 \times 10^{-3}\ \text{mol L}^{-1}$ ethanoic acid is exactly 3.`,
  key: 'f',
  sol: r`False. Ethanoic acid is a weak acid and is only partly ionised, so $[\text{H}^+]$ is less than $1.0 \times 10^{-3}$ and the pH is greater than 3 (about 3.9).`,
  d: 2, c: 'application', t: [4],
}));
add('hf-fill', fill({
  stem: r`The pH of a solution with $[\text{OH}^-] = 1.0 \times 10^{-4}\ \text{mol L}^{-1}$ at 298 K is ___.`,
  acc: [['10', '10.0', '10.00']],
  sol: r`$\text{pOH} = 4$, so $\text{pH} = 14 - 4 = $ **10**.`,
  d: 1, c: 'application', t: [4],
}));
add('hend-fill', fill({
  stem: 'In the Henderson equation for an acidic buffer, pH = pKa + log([___]/[acid]).',
  acc: [['salt', 'conjugate base', 'base', 'anion']],
  sol: 'The numerator is the concentration of the **salt** (the conjugate base).',
  d: 1, c: 'recall', t: [4],
}));
add('ph-match', match({
  stem: 'Match each salt solution with its nature at 298 K.',
  pairs: [
    ['Sodium chloride', 'Neutral'],
    ['Sodium ethanoate', 'Basic'],
    ['Ammonium chloride', 'Acidic'],
    ['Ammonium ethanoate', 'Nearly neutral'],
  ],
  order: [0, 1, 2, 3],
  sol: 'NaCl: strong acid + strong base. CH₃COONa: weak acid + strong base, basic. NH₄Cl: strong acid + weak base, acidic. CH₃COONH₄: Ka (acid) ≈ Kb (base), so nearly neutral.',
  d: 2, c: 'understanding', t: [4],
}));
add('lechat-match', match({
  stem: r`For $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $\Delta H^\circ = -92\ \text{kJ}$, match each disturbance with its result.`,
  pairs: [
    ['Increase in pressure', 'More NH₃ at equilibrium'],
    ['Increase in temperature', 'Less NH₃ at equilibrium'],
    ['Addition of an iron catalyst', 'Same composition, reached sooner'],
    ['Addition of argon at constant volume', 'No shift'],
  ],
  order: [3, 1, 2, 0],
  sol: 'Compression favours fewer gas moles (more NH₃); heating favours the endothermic reverse reaction (less NH₃); a catalyst only speeds the approach; argon at constant volume leaves partial pressures unchanged.',
  d: 2, c: 'application', t: [3],
}));
add('ph-pka-short', short({
  marks: 2,
  stem: 'Both 0.10 M HCl and 0.10 M ethanoic acid are monoprotic, yet their pH values are about 1.0 and 2.9. Explain.',
  model: 'HCl is a strong acid and is almost completely ionised, so [H⁺] is about 0.10 M. Ethanoic acid is weak: only about 1.3% of its molecules ionise (Ka is small), so [H⁺] is about 1.3 × 10⁻³ M and its pH is higher.',
  sol: 'Complete against partial ionisation.',
  scheme: [['HCl completely ionised', 1], ['Ethanoic acid partly ionised, smaller [H⁺]', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lewis-short', short({
  marks: 2,
  stem: r`Classify $\ce{BF3}$, $\ce{NH3}$ and $\ce{OH-}$ as Lewis acids or bases, and write the reaction between $\ce{BF3}$ and $\ce{NH3}$.`,
  model: r`$\ce{BF3}$ is a Lewis acid (electron-deficient boron accepts a pair); $\ce{NH3}$ and $\ce{OH-}$ are Lewis bases (they have lone pairs to donate). $\ce{BF3 + :NH3 -> F3B-NH3}$ forms a coordinate bond, in which nitrogen supplies both electrons of the new B–N bond.`,
  sol: 'Acid accepts a pair; base donates a pair.',
  scheme: [['Correct classification of all three', 1], ['Reaction with the coordinate bond', 1]],
  d: 2, c: 'application', t: [4],
}));
add('ph-weak-num', num({
  stem: r`Calculate the pH of $${n5.c}\ \text{mol L}^{-1}$ hydrocyanic acid, $K_a = 4.9 \times 10^{-10}$ (assume $\alpha \ll 1$).`,
  value: Number(j(n5.pH, 3)), tol: 0.01, unit: null,
  sol: r`$[\text{H}^+] = \sqrt{K_a c} = \sqrt{4.9 \times 10^{-10} \times ${n5.c}} = ${S(n5.H, 2)}\ \text{mol L}^{-1}$, so $\text{pH} = -\log(${S(n5.H, 2)}) = ${j(n5.pH, 3)}$.`,
  scheme: [['[H⁺] = √(Ka c) = 7.0 × 10⁻⁶ M', 1], ['pH = 5.15', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), () => near(-lg(Math.sqrt(4.9e-10 * 0.1)), 5.155, 0.003) || 'pH');
add('nh3-num', num({
  stem: r`Calculate the pH of $${n6.c}\ \text{mol L}^{-1}$ aqueous ammonia, $K_b = 1.8 \times 10^{-5}$ at 298 K (assume $\alpha \ll 1$).`,
  value: Number(j(n6.pH, 4)), tol: 0.02, unit: null,
  sol: r`$[\text{OH}^-] = \sqrt{K_b c} = \sqrt{1.8 \times 10^{-5} \times ${n6.c}} = ${S(n6.OH, 3)}$; $\text{pOH} = ${j(n6.pOH, 3)}$; $\text{pH} = 14 - ${j(n6.pOH, 3)} = ${j(n6.pH, 4)}$.`,
  scheme: [['[OH⁻] = √(Kb c)', 1], ['pOH = 2.72', 1], ['pH = 11.28', 1]],
  marks: 3, d: 3, c: 'application', t: [4],
}), () => near(14 + lg(Math.sqrt(1.8e-5 * 0.2)), 11.278, 0.002) || 'pH');
add('hend-num', num({
  stem: r`A buffer contains $${n7.A}\ \text{mol L}^{-1}$ ethanoic acid and $${n7.B}\ \text{mol L}^{-1}$ sodium ethanoate. Calculate its pH. ($K_a = 1.8 \times 10^{-5}$)`,
  value: Number(j(n7.pH, 3)), tol: 0.01, unit: null,
  sol: r`$pK_a = -\log(1.8 \times 10^{-5}) = ${j(pKa, 4)}$. $\text{pH} = pK_a + \log\dfrac{[\text{salt}]}{[\text{acid}]} = ${j(pKa, 4)} + \log\dfrac{${n7.B}}{${n7.A}} = ${j(n7.pH, 3)}$.`,
  scheme: [['pKa = 4.74', 1], ['Henderson substitution, pH = 4.44', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), () => near(4.7447 + lg(0.5), 4.443, 0.002) || 'pH');
add('common-ion-short3', short({
  marks: 3, wl: null,
  stem: r`The pH of $0.10\ \text{mol L}^{-1}$ ethanoic acid is 2.87. Calculate its pH after sodium ethanoate is dissolved in it to a concentration of $0.10\ \text{mol L}^{-1}$ (no change in volume). ($K_a = 1.8 \times 10^{-5}$) Explain the change.`,
  model: r`$[\text{H}^+] = K_a\dfrac{[\text{acid}]}{[\text{salt}]} = 1.8 \times 10^{-5} \times \dfrac{0.10}{0.10} = 1.8 \times 10^{-5}$ M, so pH $= ${j(-lg(1.8e-5), 3)}$. The ethanoate ion is a common ion that suppresses the ionisation of the acid, so [H⁺] falls and the pH rises from 2.87 to about 4.74.`,
  sol: r`$[\text{H}^+] = 1.8 \times 10^{-5} = 1.8 \times 10^{-5}$ M, so pH $= ${j(-lg(1.8e-5), 3)}$.`,
  scheme: [['Expression for [H⁺] with the salt present', 1], ['pH = 4.74', 1], ['Common ion effect explained', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(-lg(1.8e-5), 4.745, 0.002) || 'pH');
add('buffer-short3', short({
  marks: 3,
  stem: 'Explain, with equations, how a mixture of ammonia and ammonium chloride acts as a buffer.',
  model: r`The mixture contains a weak base, $\ce{NH3}$, and its conjugate acid, $\ce{NH4+}$. Added acid is removed by ammonia: $\ce{NH3 + H+ -> NH4+}$. Added base is removed by ammonium ions: $\ce{NH4+ + OH- -> NH3 + H2O}$. The ratio of $[\text{NH}_4^+]$ to $[\text{NH}_3]$ changes only slightly, so the pH stays nearly constant.`,
  sol: 'Base removes H⁺, conjugate acid removes OH⁻.',
  scheme: [['Components identified', 1], ['Equation for added acid', 1], ['Equation for added base; ratio nearly constant', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('hydrolysis-short3', short({
  marks: 3,
  stem: 'Explain, with equations, why an aqueous solution of sodium carbonate is basic but that of ammonium chloride is acidic.',
  model: r`Sodium carbonate is the salt of a weak acid: the carbonate ion hydrolyses, $\ce{CO3^2- + H2O <=> HCO3- + OH-}$, producing hydroxide ions, so the solution is basic. Ammonium chloride is the salt of a weak base and a strong acid: the ammonium ion donates a proton, $\ce{NH4+ + H2O <=> NH3 + H3O+}$, so the solution is acidic. Na⁺ and Cl⁻ do not hydrolyse.`,
  sol: 'Hydrolysis of the ion of the weak acid or weak base.',
  scheme: [['Carbonate hydrolysis and basic', 1.5], ['Ammonium hydrolysis and acidic', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('acid-base-long', long({
  stem: '(a) Distinguish between the Arrhenius, Brønsted–Lowry and Lewis definitions of an acid and a base.\n\n(b) What is a conjugate acid–base pair? Identify the pairs in NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.\n\n(c) Why is water called amphoteric?',
  model: 'An Arrhenius acid gives H⁺ and a base gives OH⁻ in water; this applies only to aqueous solutions. A Brønsted–Lowry acid is a proton donor and a base is a proton acceptor, which covers other solvents. A Lewis acid accepts an electron pair and a Lewis base donates one, which includes BF₃ and NH₃. A conjugate pair differs by one proton. In the reaction, NH₃ is the base with conjugate acid NH₄⁺, and H₂O is the acid with conjugate base OH⁻. Water is amphoteric because it can donate a proton (to NH₃) or accept one (from HCl).',
  sol: 'Three definitions; conjugate pairs; amphoteric water.',
  scheme: [['(a) Arrhenius', 1], ['(a) Brønsted–Lowry and Lewis', 1.5], ['(b) Definition and pairs', 1.5], ['(c) Amphoteric', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('buffer-long', long({
  stem: '(a) What is a buffer solution? Name one acidic and one basic buffer.\n\n(b) Derive the Henderson equation for an acidic buffer.\n\n' + r`(c) Calculate the pH of a buffer containing $0.30\ \text{mol L}^{-1}$ $\ce{NH3}$ and $0.20\ \text{mol L}^{-1}$ $\ce{NH4Cl}$. ($K_b = 1.8 \times 10^{-5}$)`,
  model: r`(a) A buffer resists a change in pH when small amounts of acid or base are added. An acidic buffer is a weak acid with its salt, for example CH₃COOH with CH₃COONa; a basic buffer is a weak base with its salt, for example NH₃ with NH₄Cl. (b) For $\text{HA} \rightleftharpoons \text{H}^+ + \text{A}^-$ the ionisation constant gives $[\text{H}^+] = K_a[\text{HA}]/[\text{A}^-]$. Taking the negative logarithm of both sides gives $\text{pH} = pK_a + \log([\text{A}^-]/[\text{HA}])$, which is the Henderson equation. (c) For the basic buffer, $\text{pOH} = pK_b + \log([\text{NH}_4^+]/[\text{NH}_3]) = ${j(-lg(1.8e-5), 4)} + \log(0.20/0.30) = ${j(-lg(1.8e-5) + lg(0.2 / 0.3), 4)}$, so $\text{pH} = 14 - ${j(-lg(1.8e-5) + lg(0.2 / 0.3), 4)} = ${j(14 + lg(1.8e-5) - lg(0.2 / 0.3), 4)}$.`,
  sol: 'Definition and examples; Henderson derivation; pOH of a basic buffer.',
  scheme: [['(a) Definition and two examples', 1], ['(b) Derivation', 2], ['(c) pOH = 4.57', 1], ['(c) pH = 9.43', 1]],
  d: 4, c: 'application', t: [4],
}), () => near(14 + lg(1.8e-5) - lg(0.2 / 0.3), 9.431, 0.002) || 'buffer');
add('ph-case', mk.case({
  passage: r`A student measures the pH of three $0.10\ \text{mol L}^{-1}$ acid solutions at 298 K.

| Solution | pH |
|---|---|
| Hydrochloric acid | 1.00 |
| Ethanoic acid | 2.87 |
| Hydrocyanic acid | 5.15 |

(The pH of ethanoic acid and hydrocyanic acid are values the student found with a pH meter.)`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement is supported by the data?',
      right: 'Hydrocyanic acid is the weakest of the three acids.',
      wrong: ['Hydrocyanic acid is the strongest of the three acids.', 'Ethanoic acid is a stronger acid than hydrochloric acid.', 'All three acids are completely ionised.'],
      sol: 'At the same concentration, a higher pH means a lower [H⁺] and weaker ionisation. HCN (pH 5.15) is the weakest and HCl (pH 1.00, [H⁺] = 0.10 M, complete ionisation) the strongest — option (@K).',
      d: 2, c: 'analysis', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the hydrogen ion concentration of the ethanoic acid solution.',
      model: r`$[\text{H}^+] = 10^{-\text{pH}} = 10^{-2.87} = ${S(10 ** -2.87, 3)}\ \text{mol L}^{-1}$.`,
      sol: '[H⁺] = 10^−pH.',
      scheme: [['1.35 × 10⁻³ mol L⁻¹', 1]],
      d: 2, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Use the data to calculate the ionisation constant Ka of ethanoic acid.',
      model: r`$K_a \approx \dfrac{[\text{H}^+]^2}{c} = \dfrac{(${S(10 ** -2.87, 3)})^2}{0.10} = ${S((10 ** -2.87) ** 2 / 0.1, 2)}$.`,
      sol: r`$K_a = [\text{H}^+]^2/c = (1.35 \times 10^{-3})^2/0.10 \approx ${S((10 ** -2.87) ** 2 / 0.1, 2)}$.`,
      scheme: [['Ka = [H⁺]²/c with α small', 1], ['Ka ≈ 1.8 × 10⁻⁵', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Calculate the degree of ionisation of ethanoic acid in this solution, as a percentage.',
        model: r`$\alpha = [\text{H}^+]/c = ${S(10 ** -2.87, 3)}/0.10 = ${j(10 ** -2.87 / 0.1, 3)}$, i.e. about ${j((10 ** -2.87 / 0.1) * 100, 2)}%.`,
        sol: r`$\alpha = 1.35 \times 10^{-3}/0.10 = ${j(10 ** -2.87 / 0.1, 3)}$, about 1.3%.`,
        scheme: [['α = [H⁺]/c', 1], ['1.3%', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), () => near((10 ** -2.87) ** 2 / 0.1, 1.82e-5, 0.01) || 'Ka');
add('buffer-case', mk.case({
  passage: r`A laboratory prepares $1.0\ \text{L}$ of a buffer containing $0.10\ \text{mol}$ ethanoic acid and $0.10\ \text{mol}$ sodium ethanoate ($K_a = 1.8 \times 10^{-5}$, so $pK_a = 4.74$). A technician then adds $0.010\ \text{mol}$ of hydrogen chloride gas to the buffer (no change in volume).`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The pH of the buffer before adding hydrogen chloride is:',
      right: '4.74',
      wrong: ['7.00', '1.00', '2.87'],
      sol: r`The acid and salt concentrations are equal, so $\log([\text{salt}]/[\text{acid}]) = 0$ and $\text{pH} = pK_a = 4.74$ — option (@K).`,
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the pH of the buffer after the hydrogen chloride is added.',
      model: r`HCl converts 0.010 mol of ethanoate to acid: acid $= 0.11$, salt $= 0.09$. $\text{pH} = 4.74 + \log(0.09/0.11) = ${j(pKa + lg(0.09 / 0.11), 3)}$.`,
      sol: r`$\text{pH} = pK_a + \log(0.09/0.11) = ${j(pKa, 4)} + (${j(lg(0.09 / 0.11), 3)}) = ${j(pKa + lg(0.09 / 0.11), 3)}$.`,
      scheme: [['pH = 4.66', 1]],
      d: 3, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Show that the same amount of hydrogen chloride added to 1.0 L of pure water would change the pH by far more.',
      model: r`In pure water, $[\text{H}^+] = 0.010$ M, so pH $= 2.00$, a fall of 5 units from 7.00. The buffer pH fell only from 4.74 to 4.66, a change of about 0.08.`,
      sol: r`$[\text{H}^+] = 0.010$, so pH $= 2.00$; change $= 7.00 - 2.00 = 5.00$ against $${j(pKa - (pKa + lg(0.09 / 0.11)), 2)}$ for the buffer.`,
      scheme: [['pH of acidified water = 2.00', 1], ['Comparison: 5 units against about 0.09', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Explain, in terms of the components of the buffer, why its pH changes so little.',
        model: 'The added H⁺ reacts with the ethanoate ions: CH₃COO⁻ + H⁺ → CH₃COOH. Only a small part of the large reservoir of ethanoate is used up, so the ratio [salt]/[acid] changes slightly, and since pH depends on the logarithm of this ratio, the pH changes very little.',
        sol: 'Ethanoate removes added H⁺; ratio changes little.',
        scheme: [['Ethanoate removes H⁺ (equation)', 1], ['Ratio and its logarithm change only slightly', 1]],
        d: 3, c: 'understanding', t: [4],
      }),
    ]),
  ],
}), () => near(pKa + lg(0.09 / 0.11), 4.657, 0.002) || 'pH');

// ---------------------------------------------------------------- t05 solubility product
add('ksp-mcq', mcq({
  stem: r`The molar solubility of silver chromate, $\ce{Ag2CrO4}$, is $s\ \text{mol L}^{-1}$. Its solubility product $K_{sp}$ is:`,
  right: r`$4s^3$`,
  wrong: [r`$s^2$`, r`$2s^3$`, r`$27s^4$`],
  sol: r`$\ce{Ag2CrO4 <=> 2Ag+ + CrO4^2-}$ gives $[\text{Ag}^+] = 2s$ and $[\text{CrO}_4^{2-}] = s$, so $K_{sp} = (2s)^2 \times s = 4s^3$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('precip-mcq', mcq({
  stem: r`$K_{sp}$ of $\ce{AgCl}$ is $1.8 \times 10^{-10}$. In a mixture, $[\text{Ag}^+] = 1.0 \times 10^{-4}$ and $[\text{Cl}^-] = 1.0 \times 10^{-5}\ \text{mol L}^{-1}$. Which statement is correct?`,
  right: r`A precipitate forms, because $Q_{sp} = 1.0 \times 10^{-9} > K_{sp}$`,
  wrong: [r`No precipitate forms, because $Q_{sp} = 1.0 \times 10^{-9} > K_{sp}$`, r`A precipitate forms, because $Q_{sp} = 1.0 \times 10^{-9} < K_{sp}$`, r`The solution is exactly saturated`],
  sol: r`$Q_{sp} = (1.0 \times 10^{-4})(1.0 \times 10^{-5}) = 1.0 \times 10^{-9}$, which is greater than $1.8 \times 10^{-10}$, so ions combine and AgCl precipitates — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => near(1e-4 * 1e-5, 1e-9, 1e-9) && 1e-9 > 1.8e-10 || 'Qsp');
add('agcl-ar', ar({
  a: 'The solubility of silver chloride is greater in 0.10 M sodium chloride solution than in pure water.',
  r: 'A common ion lowers the solubility of a sparingly soluble salt.',
  key: 'd',
  sol: 'A is false: the common ion Cl⁻ lowers the solubility (s = Ksp/[Cl⁻] = 1.8 × 10⁻⁹ M against 1.3 × 10⁻⁵ M in water). R is true — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('ksp-match', match({
  stem: 'Match each sparingly soluble salt with its solubility product in terms of molar solubility s.',
  pairs: [
    ['AgCl', 's²'],
    ['CaF₂', '4s³'],
    ['Ag₃PO₄', '27s⁴'],
    ['Ca₃(PO₄)₂', '108s⁵'],
  ],
  order: [0, 1, 2, 3],
  sol: 'AgCl: s × s. CaF₂: s(2s)² = 4s³. Ag₃PO₄: (3s)³ × s = 27s⁴. Ca₃(PO₄)₂: (3s)³(2s)² = 108s⁵.',
  d: 3, c: 'application', t: [5],
}));
add('ksp-short', short({
  marks: 2,
  stem: 'Explain why silver chloride is less soluble in 0.10 M sodium chloride solution than in pure water.',
  model: 'In a saturated solution AgCl(s) ⇌ Ag⁺ + Cl⁻, and Ksp = [Ag⁺][Cl⁻] is constant. Sodium chloride supplies Cl⁻, a common ion, so the equilibrium shifts to the left to keep the product equal to Ksp, and less AgCl dissolves.',
  sol: 'Common ion effect on the solubility equilibrium.',
  scheme: [['Ksp constant; common ion Cl⁻ increases [Cl⁻]', 1], ['Equilibrium shifts left, lower solubility', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('ag2cro4-num', num({
  stem: r`The solubility product of $\ce{Ag2CrO4}$ is $${S(n8.Ksp, 2)}$ at 298 K. Calculate its molar solubility, in mol L⁻¹.`,
  value: Number(n8.s.toPrecision(3)), tol: 2e-7, unit: 'mol L⁻¹',
  sol: r`$K_{sp} = 4s^3$, so $s = \left(\dfrac{K_{sp}}{4}\right)^{1/3} = \left(\dfrac{1.1 \times 10^{-12}}{4}\right)^{1/3} = ${S(n8.s, 3)} = ${n8.s.toPrecision(3)}$, i.e. $${S(n8.s, 3)}\ \text{mol L}^{-1}$.`,
  scheme: [['Ksp = 4s³', 1], ['s = 6.50 × 10⁻⁵ mol L⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), () => near(Math.cbrt(1.1e-12 / 4), 6.5e-5, 0.005) || 's');
add('cl-num', num({
  stem: r`$K_{sp}(\text{AgCl}) = 1.8 \times 10^{-10}$. Calculate the minimum chloride ion concentration, in mol L⁻¹, that must be exceeded for AgCl to start precipitating from a solution in which $[\text{Ag}^+] = ${S(n9.Ag, 2)}\ \text{mol L}^{-1}$.`,
  value: n9.Cl, tol: 1e-8, unit: 'mol L⁻¹',
  sol: r`Precipitation starts when $Q_{sp} = K_{sp}$: $[\text{Cl}^-] = \dfrac{K_{sp}}{[\text{Ag}^+]} = \dfrac{1.8 \times 10^{-10}}{${S(n9.Ag, 2)}} = ${S(n9.Cl, 2)} = 0.00000090$, i.e. $${S(n9.Cl, 2)}\ \text{mol L}^{-1}$.`,
  scheme: [['Condition Qsp = Ksp', 1], ['[Cl⁻] = 9.0 × 10⁻⁷ mol L⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), () => near(1.8e-10 / 2.0e-4, 9.0e-7, 0.005) || 'Cl');
add('precip-short3', short({
  marks: 3, wl: null,
  stem: r`$50\ \text{mL}$ of $4.0 \times 10^{-5}\ \text{M}$ $\ce{BaCl2}$ is mixed with $50\ \text{mL}$ of $2.0 \times 10^{-5}\ \text{M}$ $\ce{Na2SO4}$. Will $\ce{BaSO4}$ ($K_{sp} = 1.1 \times 10^{-10}$) precipitate?`,
  model: r`After mixing the volume doubles, so $[\text{Ba}^{2+}] = 2.0 \times 10^{-5}$ M and $[\text{SO}_4^{2-}] = 1.0 \times 10^{-5}$ M. $Q_{sp} = (2.0 \times 10^{-5})(1.0 \times 10^{-5}) = ${S(2e-5 * 1e-5, 2)}$, which is greater than $K_{sp} = 1.1 \times 10^{-10}$, so $\ce{BaSO4}$ precipitates.`,
  sol: r`$Q_{sp} = (2.0 \times 10^{-5}) \times (1.0 \times 10^{-5}) = ${S(2e-5 * 1e-5, 2)} > 1.1 \times 10^{-10}$: precipitation occurs.`,
  scheme: [['Concentrations halved on mixing', 1], ['Qsp = 2.0 × 10⁻¹⁰', 1], ['Qsp > Ksp: precipitate forms', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(2e-5 * 1e-5, 2e-10, 1e-9) && 2e-10 > 1.1e-10 || 'Qsp');
add('ksp-long', long({
  stem: '(a) Define the solubility product of a sparingly soluble salt and write the relation between Ksp and molar solubility for a salt AB₂.\n\n' + r`(b) Calculate the molar solubility of $\ce{Mg(OH)2}$ ($K_{sp} = 1.8 \times 10^{-11}$, given) in water.` + '\n\n' + r`(c) How does its solubility change in $0.10\ \text{M}$ NaOH? Calculate it.`,
  model: r`(a) In a saturated solution of a sparingly soluble salt, Ksp is the product of the ion concentrations, each raised to the power of its coefficient. For a salt AB₂, $[\text{A}^{2+}] = s$ and $[\text{B}^-] = 2s$, so $K_{sp} = s(2s)^2 = 4s^3$. (b) Rearranging, $s = (K_{sp}/4)^{1/3} = (1.8 \times 10^{-11}/4)^{1/3} = ${S(Math.cbrt(1.8e-11 / 4), 3)}$ mol L⁻¹. (c) Hydroxide from sodium hydroxide is a common ion, so the equilibrium shifts towards solid Mg(OH)₂ and the solubility falls sharply. With $[\text{OH}^-] \approx 0.10$ M, $s = K_{sp}/[\text{OH}^-]^2 = 1.8 \times 10^{-11}/(0.10)^2 = ${S(1.8e-11 / 0.01, 2)}$ mol L⁻¹, which is far smaller than in water.`,
  sol: 'Definition and 4s³; cube root; common ion calculation.',
  scheme: [['(a) Definition and Ksp = 4s³', 1.5], ['(b) s = 1.65 × 10⁻⁴ mol L⁻¹', 1.5], ['(c) Common ion lowers solubility, s = 1.8 × 10⁻⁹ mol L⁻¹', 2]],
  d: 4, c: 'application', t: [5],
}), () => near(Math.cbrt(1.8e-11 / 4), 1.65e-4, 0.005) && near(1.8e-11 / 0.01, 1.8e-9, 1e-9) || 'Mg(OH)2');
add('ksp-case', mk.case({
  passage: r`A water sample contains $0.010\ \text{mol L}^{-1}$ each of chloride ions and chromate ions. Solid silver nitrate is added slowly (no change in volume). $K_{sp}(\text{AgCl}) = 1.8 \times 10^{-10}$ and $K_{sp}(\text{Ag}_2\text{CrO}_4) = 1.1 \times 10^{-12}$ at 298 K.`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which solid precipitates first as silver nitrate is added?',
      right: 'AgCl, because it needs a much lower [Ag⁺] to start precipitating',
      wrong: ['Ag₂CrO₄, because its Ksp is smaller', 'Both precipitate together', 'Neither, because both salts are soluble'],
      sol: r`AgCl needs $[\text{Ag}^+] = 1.8 \times 10^{-10}/0.010 = 1.8 \times 10^{-8}$ M, but Ag₂CrO₄ needs $\sqrt{1.1 \times 10^{-12}/0.010} = 1.0 \times 10^{-5}$ M. AgCl starts first — option (@K). Ksp values of salts with different formulas cannot be compared directly.`,
      d: 3, c: 'analysis', t: [5],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the [Ag⁺] at which AgCl begins to precipitate.',
      model: r`$[\text{Ag}^+] = K_{sp}/[\text{Cl}^-] = 1.8 \times 10^{-10}/0.010 = ${S(1.8e-10 / 0.01, 2)}\ \text{mol L}^{-1}$.`,
      sol: 'Qsp = Ksp for AgCl.',
      scheme: [['1.8 × 10⁻⁸ mol L⁻¹', 1]],
      d: 2, c: 'application', t: [5],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate the [Cl⁻] remaining when Ag₂CrO₄ just begins to precipitate.',
      model: r`Ag₂CrO₄ starts at $[\text{Ag}^+] = \sqrt{1.1 \times 10^{-12}/0.010} = ${S(Math.sqrt(1.1e-12 / 0.01), 2)}$ M. Then $[\text{Cl}^-] = \dfrac{1.8 \times 10^{-10}}{${S(Math.sqrt(1.1e-12 / 0.01), 2)}} \approx ${S(1.8e-10 / Math.sqrt(1.1e-12 / 0.01), 2)}\ \text{mol L}^{-1}$.`,
      sol: r`$[\text{Cl}^-] = K_{sp}/[\text{Ag}^+] = \dfrac{1.8 \times 10^{-10}}{${S(Math.sqrt(1.1e-12 / 0.01), 3)}} \approx ${S(1.8e-10 / Math.sqrt(1.1e-12 / 0.01), 2)}$ M.`,
      scheme: [['[Ag⁺] for chromate = 1.0 × 10⁻⁵ mol L⁻¹', 1], ['[Cl⁻] left = 1.7 × 10⁻⁵ mol L⁻¹', 1]],
      d: 4, c: 'application', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain why this order of precipitation allows chloride to be separated from chromate.',
        model: 'Chloride precipitates as AgCl at a very low [Ag⁺]. By the time chromate begins to precipitate, almost all the chloride (all but about 0.17% of it) has already been removed, so the two ions can be separated by controlling the amount of Ag⁺ added.',
        sol: 'AgCl first; almost all Cl⁻ gone before Ag₂CrO₄ starts.',
        scheme: [['AgCl precipitates first at low [Ag⁺]', 1], ['Almost all chloride removed before chromate precipitates', 1]],
        d: 4, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), () => near(Math.sqrt(1.1e-12 / 0.01), 1.05e-5, 0.01) && near(1.8e-10 / Math.sqrt(1.1e-12 / 0.01), 1.7e-5, 0.02) || 'ksp');
add('equilibrium-case', mk.case({
  passage: r`A student follows the reaction $\ce{N2O4(g) <=> 2NO2(g)}$ in a 1.0 L sealed vessel at 350 K. Starting with $0.100\ \text{mol}$ of $\ce{N2O4}$ and no $\ce{NO2}$, concentrations (mol L⁻¹) are measured (illustrative data):

| Time / s | $[\ce{N2O4}]$ | $[\ce{NO2}]$ |
|---|---|---|
| 0 | 0.100 | 0.000 |
| 20 | 0.070 | 0.060 |
| 40 | 0.055 | 0.090 |
| 60 | 0.050 | 0.100 |
| 80 | 0.050 | 0.100 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Equilibrium is first reached at about:',
      right: '60 s, because the concentrations stop changing',
      wrong: ['0 s, because the reaction has just started', '20 s, because the rate is highest then', '80 s, because the concentrations change after 60 s'],
      sol: 'The concentrations are the same at 60 s and 80 s: the forward and reverse rates are equal from about 60 s onwards — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate Kc at 350 K from the equilibrium data.',
      model: r`$K_c = [\text{NO}_2]^2/[\text{N}_2\text{O}_4] = (0.100)^2/0.050 = ${j(0.1 ** 2 / 0.05, 3)}\ \text{mol L}^{-1}$.`,
      sol: 'Kc from the 60 s row.',
      scheme: [['Kc = 0.20 mol L⁻¹', 1]],
      d: 2, c: 'application', t: [2],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate Qc at 20 s and say which way the reaction is going at that moment.',
      model: r`$Q_c = (0.060)^2/0.070 = ${j(0.06 ** 2 / 0.07, 3)}$, which is less than $K_c = 0.20$, so the net reaction is forward (more $\ce{NO2}$ forms).`,
      sol: r`$Q_c = 0.0036/0.070 = ${j(0.06 ** 2 / 0.07, 3)} < 0.20$.`,
      scheme: [['Qc = 0.051', 1], ['Q < K, so forward', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'The volume of the vessel is halved at 80 s at constant temperature. Predict the direction of change, giving a reason.',
        model: 'Halving the volume doubles both concentrations; Q becomes (0.20)²/0.10 = 0.40, which exceeds K = 0.20. So the equilibrium shifts to the left, towards N₂O₄ (fewer gas moles). K itself is unchanged.',
        sol: 'Q > K, so the shift is to the side with fewer gas moles.',
        scheme: [['Q > K or fewer gas moles', 1], ['Shift towards N₂O₄; K unchanged', 1]],
        d: 4, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => near(0.1 ** 2 / 0.05, 0.2, 1e-9) && near(0.06 ** 2 / 0.07, 0.0514, 0.005) || 'N2O4');

// ---------------------------------------------------------------- additional recall and understanding items
add('ph-def-mcq', mcq({
  stem: 'The pH of a solution is defined as:',
  right: 'the negative logarithm (base 10) of the hydrogen ion concentration',
  wrong: ['the logarithm (base 10) of the hydroxide ion concentration', 'the hydrogen ion concentration expressed in mol L⁻¹', 'the negative natural logarithm of the hydroxide ion concentration'],
  sol: 'pH = −log[H⁺], with [H⁺] in mol L⁻¹ — option (@K). The other options describe other quantities.',
  d: 1, c: 'recall', t: [4],
}));
add('closed-mcq', mcq({
  stem: 'A chemical equilibrium involving a gas can be established and maintained only in:',
  right: 'a closed system, in which no matter enters or leaves',
  wrong: ['an open system, in which gases escape freely', 'a system in which the temperature keeps changing', 'a system in which the forward reaction has stopped'],
  sol: 'If matter could escape, the products would be lost and the reverse reaction could not balance the forward one; equilibrium needs a closed system at constant temperature — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('strong-conj-tf', tf({
  stem: 'The conjugate base of a strong acid is a strong base.',
  key: 'f',
  sol: 'False. The stronger the acid, the weaker its conjugate base: Cl⁻, the conjugate base of the strong acid HCl, is a very weak base.',
  d: 1, c: 'understanding', t: [4],
}));
add('precip-fill', fill({
  stem: 'A precipitate of a sparingly soluble salt forms when the ionic product Qsp is ___ than its Ksp.',
  acc: [['greater', 'larger', 'higher', 'more']],
  sol: 'Precipitation occurs when Qsp is **greater** than Ksp.',
  d: 1, c: 'recall', t: [5],
}));
