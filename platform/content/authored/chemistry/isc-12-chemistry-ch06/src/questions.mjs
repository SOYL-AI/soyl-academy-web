// ISC 12 Chemistry ch06 Activation Energy, Collision Theory and Arrhenius Equation — question bank (ISC style). Stems
// name their own reactions. MCQ keys are placed by the builder; AR keys planned: a d a c b. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const R23 = 2.303 * 8.314;

// ---------------------------------------------------------------- t01 energy barrier, profiles, catalysts
add('profile-mcq', mcq({
  stem: 'On the energy profile of a reaction, the reactants are at 30 kJ mol⁻¹, the activated complex at 130 kJ mol⁻¹ and the products at −20 kJ mol⁻¹. The activation energy of the forward reaction is:',
  right: '100 kJ mol⁻¹',
  wrong: ['150 kJ mol⁻¹', '130 kJ mol⁻¹', '50 kJ mol⁻¹'],
  sol: 'Ea(f) = 130 − 30 = 100 kJ mol⁻¹ — option (@K); 150 is Ea of the reverse reaction (@1).',
  d: 2, c: 'application', t: [1],
}));
add('catalyst-mcq', mcq({
  stem: 'In the Haber process, finely divided iron speeds up N₂ + 3H₂ ⇌ 2NH₃. Which quantity does the iron catalyst change?',
  right: 'The activation energy of the forward and reverse reactions',
  wrong: ['The enthalpy change of the reaction', 'The equilibrium constant', 'The Gibbs energy change of the reaction'],
  sol: 'A catalyst provides a lower-energy path; ΔH, ΔG and K are unchanged — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('threshold-mcq', mcq({
  stem: 'For the reaction between hydrogen and iodine molecules, the minimum energy that colliding molecules must possess for the collision to produce HI is called the:',
  right: 'threshold energy',
  wrong: ['activation energy', 'enthalpy of reaction', 'kinetic energy of the products'],
  sol: 'The minimum energy for reaction is the threshold energy; activation energy is the extra energy above the average (@1) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('complex-mcq', mcq({
  stem: 'In the reaction OH⁻ + CH₃Br → CH₃OH + Br⁻, the species HO···CH₃···Br at the top of the energy barrier is best described as:',
  right: 'an activated complex in which the C–O bond is forming while the C–Br bond is breaking',
  wrong: ['a stable intermediate that can be isolated', 'the product of the reaction', 'a catalyst that is regenerated'],
  sol: 'The activated complex is a short-lived arrangement at the energy maximum with bonds partly made and broken — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('endo-mcq', mcq({
  stem: 'For the endothermic decomposition of calcium carbonate, which relation between the activation energies is correct?',
  right: 'Ea(forward) is greater than Ea(reverse)',
  wrong: ['Ea(forward) is less than Ea(reverse)', 'Ea(forward) equals Ea(reverse)', 'Ea(forward) is less than ΔH'],
  sol: 'ΔH = Ea(f) − Ea(r) > 0, so Ea(f) > Ea(r) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('matchstick-mcq', mcq({
  stem: 'A matchstick does not catch fire in its box but bursts into flame when struck. The best explanation is:',
  right: 'striking supplies the activation energy needed to start the combustion',
  wrong: ['striking makes the combustion exothermic', 'striking adds a catalyst', 'combustion of the match head is endothermic until it is struck'],
  sol: 'The reaction is already exothermic and spontaneous, but the molecules must first cross the energy barrier — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('enzyme-mcq', mcq({
  stem: 'The enzyme catalase decomposes hydrogen peroxide in a cut millions of times faster than it decomposes on its own. This is because catalase:',
  right: 'provides a reaction path with a much lower activation energy',
  wrong: ['makes the decomposition more exothermic', 'raises the temperature of the wound', 'shifts the equilibrium towards oxygen'],
  sol: 'Enzymes are catalysts: they lower Ea without changing ΔH or K — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('reverse-mcq', mcq({
  stem: 'For a reaction, Ea(forward) = 80 kJ mol⁻¹ and ΔH = +30 kJ mol⁻¹. The activation energy of the reverse reaction is:',
  right: '50 kJ mol⁻¹',
  wrong: ['110 kJ mol⁻¹', '30 kJ mol⁻¹', '80 kJ mol⁻¹'],
  sol: 'Ea(r) = Ea(f) − ΔH = 80 − 30 = 50 kJ mol⁻¹ — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('catalyst2-mcq', mcq({
  stem: 'Platinum gauze increases the rate of the forward reaction in 2SO₂ + O₂ ⇌ 2SO₃ by a factor of 1000 at a given temperature. The rate of the reverse reaction is increased by a factor of:',
  right: '1000',
  wrong: ['1', '1/1000', '10⁶'],
  sol: 'A catalyst lowers both activation energies equally, so both rate constants rise by the same factor and K is unchanged — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('catalyst-ar', ar({
  a: 'Adding vanadium(V) oxide to the contact process does not change the equilibrium yield of SO₃.',
  r: 'A catalyst lowers the activation energies of the forward and reverse reactions equally.',
  key: 'a',
  sol: 'Both are true and R explains A: equal speeding up of both directions leaves K unchanged — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('endo-ar', ar({
  a: 'For an endothermic reaction such as the decomposition of N₂O₄ into NO₂, the forward activation energy can be smaller than ΔH.',
  r: 'ΔH = Ea(forward) − Ea(reverse).',
  key: 'd',
  sol: 'A is false: since Ea(reverse) is positive, Ea(forward) = ΔH + Ea(reverse) > ΔH. R is true — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('complex-tf', tf({
  stem: 'The activated complex formed when H₂ and I₂ react can be isolated and stored like a normal compound.',
  key: 'f',
  sol: 'False. The activated complex exists only at the energy maximum for an instant; it cannot be isolated.',
  d: 1, c: 'understanding', t: [1],
}));
add('catalyst-tf', tf({
  stem: 'Manganese dioxide makes the decomposition of potassium chlorate faster but does not change ΔG for the reaction.',
  key: 't',
  sol: 'True. A catalyst changes the path, not the energies of reactants and products.',
  d: 1, c: 'understanding', t: [1],
}));
add('ea-fill', fill({
  stem: 'The extra energy that reactant molecules must absorb, above their average energy, to reach the threshold energy is called the ___ energy.',
  acc: [['activation']],
  sol: 'The **activation** energy.',
  d: 1, c: 'recall', t: [1],
}));
add('profile-match', match({
  stem: 'Match each feature of the energy profile for H₂(g) + I₂(g) → 2HI(g) with its description.',
  pairs: [
    ['The highest point of the curve', 'Activated complex'],
    ['Height of the peak above the reactants', 'Activation energy of the forward reaction'],
    ['Height of the peak above the products', 'Activation energy of the reverse reaction'],
    ['Difference between reactant and product levels', 'Enthalpy change ΔH'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Peak → activated complex; reactants→peak → Ea(f); products→peak → Ea(r); reactants→products → ΔH.',
  d: 1, c: 'understanding', t: [1],
}));
add('profile-num', num({
  stem: 'The decomposition of an organic peroxide has Ea(forward) = 150 kJ mol⁻¹ and ΔH = −40 kJ mol⁻¹. What is the activation energy of the reverse reaction, in kJ mol⁻¹?',
  value: 190, tol: 0.5, unit: 'kJ/mol',
  sol: r`$E_\text{a(r)} = E_\text{a(f)} - \Delta H = 150 - (-40) = 190$, so $190\ \text{kJ mol}^{-1}$.`,
  scheme: [['190 kJ mol⁻¹', 1]],
  d: 2, c: 'application', t: [1],
}), () => (150 + 40 === 190) || 'profile');
add('profile-short', short({
  marks: 2,
  stem: 'Sketch and label the energy profile for the exothermic combustion of methane, showing the paths with and without a catalyst.',
  model: 'Energy (y-axis) against reaction coordinate (x-axis). The reactants (CH₄ + 2O₂) start at a higher level and the products (CO₂ + 2H₂O) end at a lower level, so ΔH is negative. The uncatalysed path rises to a tall peak (the activated complex); Ea is measured from the reactant level to this peak. The catalysed path, drawn dashed, has a lower peak (smaller Ea′) but the same starting and finishing levels.',
  sol: 'Labelled profile with two humps.',
  scheme: [['Axes, levels and ΔH < 0', 1], ['Peak, Ea and lower catalysed path', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('endo-short', short({
  marks: 2,
  stem: 'Explain why, for the endothermic reaction N₂(g) + O₂(g) → 2NO(g), the activation energy of the forward reaction must be greater than ΔH.',
  model: 'On the energy profile, the products lie above the reactants by ΔH, and the activated complex lies above the products by Ea(reverse), which is positive. Ea(forward) is the height from the reactants to the peak, so Ea(f) = ΔH + Ea(r), which is greater than ΔH.',
  sol: 'Ea(f) = ΔH + Ea(r).',
  scheme: [['Products above reactants by ΔH', 1], ['Ea(f) = ΔH + Ea(r) > ΔH', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('catalyst-short', short({
  marks: 2,
  stem: 'Explain why adding a catalyst to the reversible esterification of ethanoic acid with ethanol makes equilibrium be reached sooner but does not change the equilibrium constant.',
  model: 'The catalyst (H⁺) provides an alternative path that lowers the activation energy of both the forward and the reverse reaction by the same amount, so both rates increase by the same factor and equilibrium is reached sooner. Because K = k(forward)/k(reverse), and both rate constants increase equally, K is unchanged; ΔG and ΔH are also unaffected.',
  sol: 'Equal effect on both directions.',
  scheme: [['Lowers Ea of both directions equally', 1], ['K = kf/kr unchanged', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('profile-short3', short({
  marks: 3,
  stem: 'For the reaction A + B → C + D, the energies (kJ mol⁻¹) are: reactants 50, activated complex 170, products 90. A catalyst lowers the peak to 120. Calculate (a) Ea(forward) and Ea(reverse) without the catalyst, (b) the same with the catalyst and (c) ΔH in each case.',
  model: '(a) Ea(f) = 170 − 50 = 120 kJ mol⁻¹; Ea(r) = 170 − 90 = 80 kJ mol⁻¹. (b) Ea(f) = 120 − 50 = 70 kJ mol⁻¹; Ea(r) = 120 − 90 = 30 kJ mol⁻¹ (both lowered by 50). (c) ΔH = 90 − 50 = +40 kJ mol⁻¹ in both cases (endothermic); the catalyst does not change ΔH.',
  sol: '120/80; 70/30; +40 both.',
  scheme: [['(a) 120 and 80', 1], ['(b) 70 and 30', 1], ['(c) ΔH = +40 unchanged', 1]],
  d: 3, c: 'application', t: [1],
}));
add('profile-long', long({
  stem: '(a) Define threshold energy, activation energy and activated complex. [1½]\n\n(b) Draw labelled energy profiles for (i) an exothermic reaction and (ii) an endothermic reaction, each with and without a catalyst. [2]\n\n(c) For a reaction, Ea(forward) = 96 kJ mol⁻¹ and Ea(reverse) = 128 kJ mol⁻¹. Calculate ΔH and state whether the reaction is exothermic or endothermic. [1½]',
  model: '(a) Threshold energy: the minimum energy colliding molecules must have to react. Activation energy: the extra energy, above the average energy of the reactants, needed to reach the threshold. Activated complex: the unstable arrangement at the top of the barrier with bonds partly broken and formed. (b) (i) Products below reactants, ΔH < 0, peak above both; catalysed (dashed) peak lower, ends unchanged. (ii) Products above reactants, ΔH > 0; Ea(f) greater than ΔH; catalysed peak lower, ends unchanged. Ea is measured from the reactant level in each. (c) ΔH = Ea(f) − Ea(r) = 96 − 128 = −32 kJ mol⁻¹: exothermic.',
  sol: 'Definitions; profiles; −32 kJ/mol, exothermic.',
  scheme: [['(a) Three definitions', 1.5], ['(b)(i) Exothermic profile', 1], ['(b)(ii) Endothermic profile', 1], ['(c) ΔH = −32 kJ/mol, exothermic', 1.5]],
  d: 3, c: 'application', t: [1],
}));
add('catalyst-long', long({
  stem: '(a) Explain, with an energy profile, how a catalyst increases the rate of a reaction. State three things a catalyst does not change. [3]\n\n(b) The enzyme invertase lowers the activation energy for the hydrolysis of sucrose from 107 kJ mol⁻¹ to 36 kJ mol⁻¹. Assuming A is unchanged, calculate the factor by which the rate increases at 310 K. [2]',
  model: r`(a) A catalyst provides an alternative path with a lower peak on the energy profile, so a larger fraction of molecules has enough energy to react; the starting and finishing levels are unchanged. It does not change ΔH, ΔG or the equilibrium constant (nor the position of equilibrium).

(b) $\log\dfrac{k_\text{cat}}{k} = \dfrac{\Delta E_\text{a}}{2.303RT} = \dfrac{71000}{2.303 \times 8.314 \times 310} \approx 11.96$, so the rate increases by about $10^{12}$ ($9.1 \times 10^{11}$) times.`,
  sol: 'Lower peak; ΔH, ΔG, K unchanged; about 10¹² times.',
  scheme: [['(a) Lower activation energy path with profile', 2], ['(a) Three unchanged quantities', 1], ['(b) log ratio 11.96', 1], ['(b) Factor about 10¹²', 1]],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t02 collision theory
add('collision-mcq', mcq({
  stem: 'Hydrogen and iodine molecules in a flask at 600 K collide billions of times a second, yet HI forms only slowly. The main reason is that most collisions:',
  right: 'lack the threshold energy or the proper orientation',
  wrong: ['occur between molecules of the same gas only', 'destroy the HI already formed', 'take place at the walls of the flask'],
  sol: 'Only collisions with enough energy and the right orientation are effective — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('orientation-mcq', mcq({
  stem: 'A hydroxide ion collides with a bromomethane molecule with more than the threshold energy, but no reaction occurs. The most likely reason is that:',
  right: 'the OH⁻ ion struck the bromine end instead of the carbon atom opposite the bromine',
  wrong: ['the collision had too much energy', 'bromomethane is a catalyst', 'the temperature was too high'],
  sol: 'Even energetic collisions fail without proper orientation — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tempeffect-mcq', mcq({
  stem: 'When the temperature of a mixture of H₂ and Cl₂ in the dark is raised by 10 K, the rate roughly doubles. The main reason is that:',
  right: 'the fraction of molecules with energy above the threshold increases greatly',
  wrong: ['the number of collisions per second doubles', 'the activation energy decreases', 'the reaction becomes exothermic'],
  sol: 'Collision frequency rises only a few per cent; the energetic fraction (tail of the distribution) roughly doubles — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('conc-collision-mcq', mcq({
  stem: 'Increasing the concentration of hydrochloric acid that reacts with marble chips increases the rate mainly because it increases:',
  right: 'the number of collisions per second',
  wrong: ['the fraction of collisions with enough energy', 'the activation energy', 'the proportion of correctly oriented collisions'],
  sol: 'More acid particles per unit volume means more collisions; the energy distribution is unchanged at the same temperature — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('steric-mcq', mcq({
  stem: 'For a reaction between two large, complex organic molecules, the probability (steric) factor P in collision theory is usually:',
  right: 'much less than 1, because only a small part of each molecule can react',
  wrong: ['exactly 1', 'greater than 1', 'equal to the activation energy'],
  sol: 'Most orientations bring unreactive parts together, so only a small fraction of collisions are correctly oriented — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('collision-ar', ar({
  a: 'Not every collision between H₂ and I₂ molecules produces hydrogen iodide.',
  r: 'Many collisions do not have the threshold energy or the proper orientation.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 1, c: 'understanding', t: [2],
}));
add('temp-ar', ar({
  a: 'For many reactions, a 10 K rise in temperature roughly doubles the rate.',
  r: 'A 10 K rise in temperature doubles the collision frequency.',
  key: 'c',
  sol: 'A is true; R is false — collision frequency rises only by about 2%; it is the fraction of energetic molecules that roughly doubles — option (c).',
  d: 3, c: 'analysis', t: [2, 3],
}));
add('orient-tf', tf({
  stem: 'In the reaction of OH⁻ with CH₃Br, a collision with enough energy can still fail if the ion strikes the bromine end of the molecule.',
  key: 't',
  sol: 'True. Proper orientation is the second condition for an effective collision.',
  d: 1, c: 'understanding', t: [2],
}));
add('collision-short', short({
  marks: 2,
  stem: 'State the two conditions for a collision between nitrogen monoxide and ozone molecules to be effective in forming NO₂ and O₂.',
  model: 'The colliding molecules must have energy equal to or greater than the threshold energy, so that bonds can be broken; and they must collide with the proper orientation, so that the O atom of ozone meets the N atom of nitrogen monoxide.',
  sol: 'Energy and orientation.',
  scheme: [['Energy ≥ threshold', 1], ['Proper orientation', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('temp-short', short({
  marks: 2,
  stem: 'Using the distribution of molecular energies, explain why a 10 K rise in temperature roughly doubles the rate of the reaction between sodium thiosulfate and hydrochloric acid.',
  model: 'At the higher temperature the energy distribution curve flattens and shifts to higher energies. The area under the curve beyond the activation energy — the fraction of molecules with enough energy to react — roughly doubles, although the collision frequency rises only slightly. So the number of effective collisions, and the rate, roughly doubles.',
  sol: 'Energetic fraction doubles.',
  scheme: [['Curve shifts; fraction beyond Ea increases', 1], ['Roughly doubles; collision frequency hardly changes', 1]],
  d: 2, c: 'application', t: [2],
}));
add('collision-short3', short({
  marks: 3,
  stem: 'Use collision theory to explain how each change affects the rate of the reaction between zinc and dilute sulfuric acid: (a) using more concentrated acid, (b) warming the acid, (c) adding a few drops of copper sulfate solution as a catalyst.',
  model: '(a) More acid particles per unit volume increases the number of collisions per second, so the number of effective collisions and the rate increase. (b) Warming increases the fraction of particles with energy above the threshold (and slightly the collision frequency), so the rate increases sharply. (c) A catalyst provides a path of lower activation energy, so a larger fraction of collisions has enough energy to react, increasing the rate.',
  sol: 'Collision frequency; energetic fraction; lower Ea.',
  scheme: [['(a) More collisions', 1], ['(b) More energetic collisions', 1], ['(c) Lower Ea', 1]],
  d: 2, c: 'application', t: [2],
}));
add('collision-long', long({
  stem: '(a) State the main postulates of collision theory, including the two conditions for an effective collision. [2]\n\n(b) Sketch the distribution of kinetic energies of gas molecules at two temperatures, mark the activation energy, and use it to explain the effect of temperature on rate. [2]\n\n(c) Give one limitation of collision theory. [1]',
  model: '(a) Reactant molecules, treated as hard spheres, must collide to react; the rate depends on the collision frequency. A collision is effective only if the molecules have energy at least equal to the threshold energy and collide with proper orientation; rate = P Z e^(−Ea/RT). (b) The curve at the higher temperature is flatter and spread to higher energies; the shaded area beyond the Ea line (fraction of molecules able to react) is much larger, so the number of effective collisions and the rate increase greatly, even though the collision frequency increases only slightly. (c) It treats molecules as hard spheres and ignores their structure; the steric factor P has to be introduced empirically.',
  sol: 'Postulates; distribution; limitation.',
  scheme: [['(a) Postulates and two conditions', 2], ['(b) Distribution sketch and explanation', 2], ['(c) Limitation', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Arrhenius equation
add('plot-mcq', mcq({
  stem: 'For the decomposition of acetaldehyde, a graph of log k against 1/T is a straight line. Its slope is equal to:',
  right: '−Ea/2.303R',
  wrong: ['−Ea/R', 'log A', '+Ea/2.303R'],
  sol: 'log k = log A − (Ea/2.303R)(1/T) — option (@K); −Ea/R is the slope for ln k (@1); log A is the intercept (@2).',
  d: 2, c: 'understanding', t: [3],
}));
add('temp-mcq', mcq({
  stem: 'Reaction P has Ea = 40 kJ mol⁻¹ and reaction Q has Ea = 100 kJ mol⁻¹. When both are warmed from 300 K to 310 K:',
  right: 'the rate constant of Q increases by a larger factor than that of P',
  wrong: ['the rate constant of P increases by a larger factor than that of Q', 'both increase by the same factor', 'the rate constant of Q decreases'],
  sol: 'log(k₂/k₁) is proportional to Ea, so the reaction with the larger Ea is more temperature-sensitive — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('form-mcq', mcq({
  stem: 'Which equation correctly relates the rate constants k₁ and k₂ of the decomposition of N₂O₅ at temperatures T₁ and T₂ (T₂ > T₁)?',
  right: 'log(k₂/k₁) = (Ea/2.303R) × (T₂ − T₁)/(T₁T₂)',
  wrong: ['log(k₂/k₁) = (Ea/2.303R) × (T₁T₂)/(T₂ − T₁)', 'log(k₂/k₁) = (Ea/R) × (T₂ − T₁)', 'log(k₁/k₂) = (Ea/2.303R) × (T₂ − T₁)/(T₁T₂)'],
  sol: 'Subtracting the log forms at T₁ and T₂ gives option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('A-unit-mcq', mcq({
  stem: 'For the first-order decomposition of cyclopropane to propene, the frequency factor A has the unit:',
  right: 's⁻¹',
  wrong: ['J mol⁻¹', 'mol L⁻¹ s⁻¹', 'K⁻¹'],
  sol: 'A has the same unit as k; for a first-order reaction that is s⁻¹ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('limit-mcq', mcq({
  stem: 'According to the Arrhenius equation k = A e^(−Ea/RT), as the temperature becomes very high the rate constant approaches:',
  right: 'A',
  wrong: ['zero', 'Ea', 'infinity'],
  sol: 'As T → ∞, Ea/RT → 0 and e^0 = 1, so k → A — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('tc-mcq', mcq({
  stem: 'The temperature coefficient of the hydrolysis of an ester, k(308 K)/k(298 K), is found to be 2. This means that:',
  right: 'the rate constant doubles for a 10 K rise in temperature',
  wrong: ['the activation energy doubles', 'the reaction is second order', 'the rate halves for a 10 K rise'],
  sol: 'The temperature coefficient is the ratio of rate constants 10 K apart — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('ea-zero-mcq', mcq({
  stem: 'Some radical recombination reactions, such as 2CH₃• → C₂H₆, have an activation energy close to zero. For such a reaction, the rate constant:',
  right: 'hardly changes with temperature',
  wrong: ['increases very sharply with temperature', 'is zero', 'decreases sharply with temperature'],
  sol: 'With Ea ≈ 0, k ≈ A, which is almost independent of temperature — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ln-mcq', mcq({
  stem: 'A student plots ln k (natural logarithm) instead of log k against 1/T for the decomposition of hydrogen iodide. The slope of her graph is:',
  right: '−Ea/R',
  wrong: ['−Ea/2.303R', '−2.303Ea/R', 'ln A'],
  sol: 'ln k = ln A − Ea/RT — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('arr-ar', ar({
  a: 'The rate of a reaction with a large activation energy is very sensitive to temperature.',
  r: 'The frequency factor A is almost independent of temperature.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; the sensitivity arises because Ea appears in the exponent e^(−Ea/RT) — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('arr-tf', tf({
  stem: 'For the decomposition of N₂O₅, which has a positive activation energy, the rate constant increases as the temperature rises.',
  key: 't',
  sol: 'True. With Ea > 0, e^(−Ea/RT) increases with T, so k increases.',
  d: 1, c: 'understanding', t: [3],
}));
add('freq-fill', fill({
  stem: 'In the Arrhenius equation k = A e^(−Ea/RT), the constant A is called the ___ factor.',
  acc: [['frequency', 'pre-exponential', 'preexponential', 'Arrhenius']],
  sol: 'The **frequency** (pre-exponential) factor.',
  d: 1, c: 'recall', t: [3],
}));
add('arr-match', match({
  stem: 'Match each term in the Arrhenius treatment of the decomposition of N₂O₅ with its meaning.',
  pairs: [
    ['A', 'Frequency factor, related to correctly oriented collisions'],
    ['Ea', 'Minimum extra energy needed for reaction'],
    ['e^(−Ea/RT)', 'Fraction of molecules with energy ≥ Ea'],
    ['Slope of log k against 1/T', '−Ea/2.303R'],
  ],
  order: [3, 1, 0, 2],
  sol: 'A → frequency factor; Ea → activation energy; exponential → energetic fraction; slope → −Ea/2.303R.',
  d: 2, c: 'understanding', t: [3],
}));
add('ea-num', num({
  marks: 2,
  stem: r`The rate constant of the alkaline hydrolysis of an ester doubles when the temperature is raised from $300\ \text{K}$ to $310\ \text{K}$. Calculate the activation energy in kJ mol⁻¹. ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$)`,
  value: 53.6, tol: 0.2, unit: 'kJ/mol',
  sol: r`$\log 2 = \dfrac{E_\text{a}}{2.303R} \times \dfrac{10}{300 \times 310}$, so $E_\text{a} = \dfrac{2.303 \times 8.314 \times 0.301 \times 93000}{10} \approx 53\,600\ \text{J mol}^{-1}$; in kJ: $53600 \div 1000 = 53.6$.`,
  scheme: [['Correct equation and substitution', 1], ['Ea ≈ 53.6 kJ/mol', 1]],
  d: 3, c: 'application', t: [3],
}), () => near((R23 * Math.log10(2) * 300 * 310) / 10 / 1000, 53.6, 0.003) || 'ea');
add('k2-num', num({
  marks: 2,
  stem: r`A reaction has $E_\text{a} = 50.0\ \text{kJ mol}^{-1}$ and $k = 2.0 \times 10^{-5}\ \text{s}^{-1}$ at $300\ \text{K}$. Calculate $k$ at $350\ \text{K}$, in units of $10^{-4}\ \text{s}^{-1}$.`,
  value: 3.5, tol: 0.03, unit: '× 10⁻⁴ s⁻¹',
  sol: r`$\log\dfrac{k_2}{k_1} = \dfrac{50000}{2.303 \times 8.314} \times \dfrac{50}{300 \times 350} \approx 2611.4 \times 4.762 \times 10^{-4} \approx 1.2435$; $\dfrac{k_2}{k_1} \approx 17.5$; $k_2 \approx 17.5 \times 2.0 \times 10^{-5} = 3.5 \times 10^{-4}\ \text{s}^{-1}$; in units of $10^{-4}$: $3.5 \times 10^{-4} \times 10^{4} = 3.5$.`,
  scheme: [['log ratio 1.2435', 1], ['k = 3.5 × 10⁻⁴ s⁻¹', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(2e-5 * Math.pow(10, (50000 / R23) * (50 / (300 * 350))) * 1e4, 3.5, 0.005) || 'k2');
add('A-num', num({
  stem: r`A first-order reaction has $k = 2.0 \times 10^{-3}\ \text{s}^{-1}$ at $400\ \text{K}$ and $E_\text{a} = 40.0\ \text{kJ mol}^{-1}$. Calculate the frequency factor $A$ in s⁻¹.`,
  value: 334, tol: 2, unit: 's⁻¹',
  sol: r`$\log A = \log k + \dfrac{E_\text{a}}{2.303RT} = -2.699 + \dfrac{40000}{2.303 \times 8.314 \times 400} = -2.699 + 5.223 = 2.524$; $A = 10^{2.524} \approx 334$, so about $334\ \text{s}^{-1}$.`,
  scheme: [['A ≈ 334 s⁻¹', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(2e-3 * Math.pow(10, 40000 / (R23 * 400)), 334, 0.005) || 'A');
add('slope-num', num({
  stem: r`For the decomposition of nitrous oxide on gold, a plot of $\log k$ against $1/T$ has a slope of $-6000\ \text{K}$. Calculate $E_\text{a}$ in kJ mol⁻¹.`,
  value: 114.9, tol: 0.3, unit: 'kJ/mol',
  sol: r`$E_\text{a} = 2.303R \times 6000 = 2.303 \times 8.314 \times 6000 \approx 114\,880\ \text{J mol}^{-1}$; in kJ: $E_\text{a} = 2.303 \times 8.314 \times 6000 \div 1000 \approx 114.9\ \text{kJ mol}^{-1}$.`,
  scheme: [['114.9 kJ/mol', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((R23 * 6000) / 1000, 114.9, 0.002) || 'slope');
add('cat-num', num({
  marks: 2,
  stem: r`At $310\ \text{K}$ an enzyme lowers the activation energy of a reaction by $20.0\ \text{kJ mol}^{-1}$. Assuming $A$ is unchanged, by what factor does the rate constant increase?`,
  value: 2342, tol: 15, unit: null,
  sol: r`$\log\dfrac{k_\text{cat}}{k} = \dfrac{20000}{2.303 \times 8.314 \times 310} \approx \dfrac{20000}{5935.6} \approx 3.3695$; factor $= 10^{3.3695} \approx 2342$ (about $2.3 \times 10^{3}$).`,
  scheme: [['log ratio 3.37', 1], ['Factor ≈ 2.3 × 10³', 1]],
  d: 3, c: 'application', t: [1, 3],
}), () => near(Math.pow(10, 20000 / (R23 * 310)), 2342, 0.006) || 'cat');
add('temp-num', num({
  marks: 2,
  stem: r`A reaction with $E_\text{a} = 70.0\ \text{kJ mol}^{-1}$ has a rate constant $k$ at $300\ \text{K}$. At what temperature, in K, will the rate constant be $2k$?`,
  value: 307.6, tol: 0.3, unit: 'K',
  sol: r`$\log 2 = \dfrac{70000}{2.303 \times 8.314}\left(\dfrac{1}{300} - \dfrac{1}{T_2}\right)$; $\dfrac{1}{300} - \dfrac{1}{T_2} \approx \dfrac{0.301}{3656} \approx 8.234 \times 10^{-5}$; $\dfrac{1}{T_2} \approx 3.3333 \times 10^{-3} - 8.234 \times 10^{-5} \approx 3.2510 \times 10^{-3}$; $T_2 \approx 1 \div 0.0032510 \approx 307.6$, so about $307.6\ \text{K}$.`,
  scheme: [['Rearranged equation', 1], ['T₂ ≈ 307.6 K', 1]],
  d: 4, c: 'analysis', t: [3],
}), () => { const x = Math.log10(2) / (70000 / R23); return near(1 / (1 / 300 - x), 307.6, 0.001) || 'temp'; });
add('fraction-num', num({
  stem: r`For a reaction with $E_\text{a} = 57.4\ \text{kJ mol}^{-1}$, calculate the fraction of molecules having energy at least $E_\text{a}$ at $300\ \text{K}$, in units of $10^{-10}$.`,
  value: 1.02, tol: 0.03, unit: '× 10⁻¹⁰',
  sol: r`$\log f = -\dfrac{E_\text{a}}{2.303RT} = -\dfrac{57400}{2.303 \times 8.314 \times 300} \approx -9.993$; $f = 10^{-9.993} \approx 1.02 \times 10^{-10}$; in units of $10^{-10}$: $1.02 \times 10^{-10} \times 10^{10} = 1.02$.`,
  scheme: [['1.02 × 10⁻¹⁰', 1]],
  d: 3, c: 'application', t: [2, 3],
}), () => near(Math.pow(10, -57400 / (R23 * 300)) * 1e10, 1.02, 0.01) || 'fraction');
add('arr-short', short({
  marks: 2,
  stem: 'Write the Arrhenius equation for the rate constant of the decomposition of hydrogen peroxide and explain the significance of A and of the term e^(−Ea/RT).',
  model: 'k = A e^(−Ea/RT). A is the frequency (pre-exponential) factor, related to the frequency of collisions with proper orientation; it has the same unit as k. The term e^(−Ea/RT) is the fraction of molecules (or collisions) that have energy equal to or greater than the activation energy.',
  sol: 'Equation; meaning of A and the exponential.',
  scheme: [['Equation and meaning of A', 1], ['Meaning of e^(−Ea/RT)', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('plot-short', short({
  marks: 2,
  stem: 'Explain how the activation energy and frequency factor of the decomposition of N₂O₅ can be found from rate constants measured at several temperatures.',
  model: 'Plot log k against 1/T; from log k = log A − Ea/(2.303RT) the graph is a straight line. Its slope equals −Ea/2.303R, so Ea = −2.303R × slope; the intercept on the log k axis (at 1/T = 0) equals log A, so A = antilog of the intercept.',
  sol: 'Slope and intercept of log k vs 1/T.',
  scheme: [['Plot and slope → Ea', 1], ['Intercept → A', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fridge-short', short({
  marks: 2,
  stem: 'The spoiling of milk has an activation energy of about 50 kJ mol⁻¹. Estimate how many times more slowly milk spoils in a refrigerator at 278 K than on a kitchen shelf at 303 K.',
  model: r`$\log\dfrac{k_{303}}{k_{278}} = \dfrac{50000}{2.303 \times 8.314} \times \dfrac{25}{278 \times 303} \approx 2611 \times 2.968 \times 10^{-4} \approx 0.775$; ratio $\approx 10^{0.775} \approx 6$. Milk spoils about 6 times more slowly in the refrigerator.`,
  sol: 'About 6 times.',
  scheme: [['Substitution in the two-temperature equation', 1], ['About 6 times', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ea-short3', short({
  marks: 3,
  stem: 'The rate constant for the decomposition of a dye in solution is 1.6 × 10⁻³ s⁻¹ at 310 K and 6.4 × 10⁻³ s⁻¹ at 330 K. Calculate the activation energy. (R = 8.314 J K⁻¹ mol⁻¹)',
  model: r`$\log\dfrac{k_2}{k_1} = \log 4 = 0.602$; $\dfrac{T_2 - T_1}{T_1T_2} = \dfrac{20}{310 \times 330} \approx 1.955 \times 10^{-4}\ \text{K}^{-1}$. $E_\text{a} = \dfrac{2.303 \times 8.314 \times 0.602}{1.955 \times 10^{-4}} \approx 58\,960\ \text{J mol}^{-1}$, about $59.0\ \text{kJ mol}^{-1}$.`,
  sol: 'About 59.0 kJ/mol.',
  scheme: [['log ratio 0.602', 1], ['Temperature term', 1], ['Ea ≈ 59.0 kJ/mol', 1]],
  d: 3, c: 'application', t: [3],
}));
add('k2-short3', short({
  marks: 3,
  stem: 'The decomposition of a pesticide in soil has Ea = 85 kJ mol⁻¹ and k = 3.0 × 10⁻⁵ s⁻¹ at 300 K. Calculate k at 320 K, and comment on what this suggests for pesticide persistence in hot weather.',
  model: r`$\log\dfrac{k_2}{k_1} = \dfrac{85000}{2.303 \times 8.314} \times \dfrac{20}{300 \times 320} \approx 4439 \times 2.083 \times 10^{-4} \approx 0.925$; ratio $\approx 8.4$; $k_2 \approx 8.4 \times 3.0 \times 10^{-5} \approx 2.5 \times 10^{-4}\ \text{s}^{-1}$. The pesticide breaks down about eight times faster at 320 K, so it persists for a much shorter time in hot weather.`,
  sol: 'k ≈ 2.5 × 10⁻⁴ s⁻¹; faster breakdown.',
  scheme: [['Substitution', 1], ['k ≈ 2.5 × 10⁻⁴ s⁻¹', 1], ['Comment', 1]],
  d: 3, c: 'application', t: [3],
}));
add('cat-short3', short({
  marks: 3,
  stem: 'At body temperature (310 K) an enzyme lowers the activation energy of a reaction from 70 kJ mol⁻¹ to 45 kJ mol⁻¹. (a) Calculate the factor by which the rate increases, assuming A is unchanged. (b) Explain why the enzyme does not change the equilibrium position of the reaction.',
  model: r`(a) $\log\dfrac{k_\text{cat}}{k} = \dfrac{25000}{2.303 \times 8.314 \times 310} \approx \dfrac{25000}{5936} \approx 4.21$; factor $\approx 10^{4.21} \approx 1.6 \times 10^{4}$.

(b) The enzyme lowers the activation energy of the reverse reaction by the same amount, so both rate constants increase by the same factor; their ratio, the equilibrium constant, is unchanged.`,
  sol: 'About 1.6 × 10⁴; equal effect on both directions.',
  scheme: [['(a) log ratio 4.21', 1], ['(a) Factor ≈ 1.6 × 10⁴', 1], ['(b) Reason', 1]],
  d: 3, c: 'application', t: [1, 3],
}));
add('tc-short3', short({
  marks: 3,
  stem: 'Show, using the Arrhenius equation, that a temperature coefficient of 2 between 298 K and 308 K corresponds to an activation energy of about 53 kJ mol⁻¹. Would a reaction with Ea = 100 kJ mol⁻¹ have a larger or smaller temperature coefficient?',
  model: r`$\log 2 = \dfrac{E_\text{a}}{2.303R} \times \dfrac{10}{298 \times 308}$, so $E_\text{a} = \dfrac{2.303 \times 8.314 \times 0.301 \times 298 \times 308}{10} \approx 52\,900\ \text{J mol}^{-1} \approx 53\ \text{kJ mol}^{-1}$. Since $\log(k_2/k_1)$ is proportional to $E_\text{a}$, a reaction with $E_\text{a} = 100\ \text{kJ mol}^{-1}$ would have a larger temperature coefficient (about 3.7).`,
  sol: 'About 53 kJ/mol; larger coefficient.',
  scheme: [['Substitution', 1], ['Ea ≈ 53 kJ/mol', 1], ['Larger temperature coefficient for larger Ea', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('A-short3', short({
  marks: 3,
  stem: 'The rate constant of the hydrolysis of an alkyl halide is 1.0 × 10⁻³ s⁻¹ at 300 K and 1.0 × 10⁻² s⁻¹ at 330 K. Calculate (a) the activation energy and (b) the frequency factor A.',
  model: r`(a) $\log\dfrac{k_2}{k_1} = 1$; $\dfrac{T_2 - T_1}{T_1T_2} = \dfrac{30}{300 \times 330} \approx 3.030 \times 10^{-4}$; $E_\text{a} = \dfrac{2.303 \times 8.314 \times 1}{3.030 \times 10^{-4}} \approx 63\,190\ \text{J mol}^{-1}$, about $63.2\ \text{kJ mol}^{-1}$.

(b) $\log A = \log k_1 + \dfrac{E_\text{a}}{2.303RT_1} = -3 + \dfrac{63190}{2.303 \times 8.314 \times 300} \approx -3 + 11.0 = 8.0$; $A \approx 1.0 \times 10^{8}\ \text{s}^{-1}$.`,
  sol: 'Ea ≈ 63.2 kJ/mol; A ≈ 10⁸ s⁻¹.',
  scheme: [['(a) Substitution', 1], ['(a) Ea ≈ 63.2 kJ/mol', 1], ['(b) A ≈ 1.0 × 10⁸ s⁻¹', 1]],
  d: 3, c: 'application', t: [3],
}));
add('graph-short3', short({
  marks: 3,
  stem: 'Two points on an Arrhenius plot (log k against 1/T) for the decomposition of an azo compound are (1/T = 3.1 × 10⁻³ K⁻¹, log k = −1.0) and (1/T = 3.4 × 10⁻³ K⁻¹, log k = −3.1). Calculate the slope of the line and the activation energy.',
  model: r`Slope $= \dfrac{-3.1 - (-1.0)}{3.4 \times 10^{-3} - 3.1 \times 10^{-3}} = \dfrac{-2.1}{0.3 \times 10^{-3}} = -7000\ \text{K}$. $E_\text{a} = -2.303R \times \text{slope} = 2.303 \times 8.314 \times 7000 \approx 134\,000\ \text{J mol}^{-1}$, about $134\ \text{kJ mol}^{-1}$.`,
  sol: 'Slope −7000 K; Ea ≈ 134 kJ/mol.',
  scheme: [['Slope −7000 K', 1], ['Ea = −2.303R × slope', 1], ['Ea ≈ 134 kJ/mol', 1]],
  d: 3, c: 'application', t: [3],
}));
add('arr-long', long({
  stem: '(a) Write the Arrhenius equation and its logarithmic form. Explain how a graph can be used to find Ea and A. [2]\n\n(b) The rate constant for the decomposition of hydrogen iodide is 2.15 × 10⁻⁸ L mol⁻¹ s⁻¹ at 556 K and 3.95 × 10⁻⁶ L mol⁻¹ s⁻¹ at 629 K. Calculate the activation energy. (R = 8.314 J K⁻¹ mol⁻¹) [3]',
  model: r`(a) $k = Ae^{-E_\text{a}/RT}$; $\log k = \log A - \dfrac{E_\text{a}}{2.303RT}$. A plot of log k against 1/T is a straight line of slope $-E_\text{a}/2.303R$ (giving Ea) and intercept log A (giving A).

(b) $\log\dfrac{k_2}{k_1} = \log\dfrac{3.95 \times 10^{-6}}{2.15 \times 10^{-8}} = \log 183.7 \approx 2.264$. $\dfrac{T_2 - T_1}{T_1T_2} = \dfrac{73}{556 \times 629} \approx 2.087 \times 10^{-4}$. $E_\text{a} = \dfrac{2.303 \times 8.314 \times 2.264}{2.087 \times 10^{-4}} \approx 207\,700\ \text{J mol}^{-1}$, about $208\ \text{kJ mol}^{-1}$.`,
  sol: 'Equation and graph; about 208 kJ/mol.',
  scheme: [['(a) Equations', 1], ['(a) Graphical method', 1], ['(b) log ratio 2.264', 1], ['(b) Temperature term', 1], ['(b) Ea ≈ 208 kJ/mol', 1]],
  d: 3, c: 'application', t: [3],
}));
add('k-long', long({
  stem: '(a) Define the temperature coefficient of a reaction and state its usual value. [1]\n\n(b) The rate constant of a reaction at 300 K is 4.0 × 10⁻⁴ s⁻¹ and its activation energy is 75.0 kJ mol⁻¹. Calculate (i) the rate constant at 310 K, (ii) the temperature coefficient and (iii) the time taken for half the reactant to react at 310 K, assuming first-order kinetics. [4]',
  model: r`(a) The ratio of the rate constants at two temperatures differing by 10 K (usually $k_{308}/k_{298}$); usually 2 to 3.

(b) (i) $\log\dfrac{k_2}{k_1} = \dfrac{75000}{2.303 \times 8.314} \times \dfrac{10}{300 \times 310} \approx 3917 \times 1.075 \times 10^{-4} \approx 0.421$; ratio $\approx 2.64$; $k_2 \approx 2.64 \times 4.0 \times 10^{-4} \approx 1.055 \times 10^{-3}\ \text{s}^{-1}$. (ii) Temperature coefficient $\approx 2.64$. (iii) $t_{1/2} = 0.693 \div (1.055 \times 10^{-3}) \approx 657\ \text{s}$.`,
  sol: 'Definition; 1.055 × 10⁻³ s⁻¹; 2.64; about 657 s.',
  scheme: [['(a) Definition and value', 1], ['(b)(i) log ratio and k₂', 2], ['(b)(ii) 2.64', 1], ['(b)(iii) about 657 s', 1]],
  d: 4, c: 'application', t: [3],
}));
