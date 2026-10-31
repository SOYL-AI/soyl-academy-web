// ISC 12 Chemistry ch06 Activation Energy, Collision Theory and Arrhenius Equation — two decks: Part 1 (t01–t02)
// energy barrier, threshold energy, activated complex, energy profiles, catalysts, collision theory; Part 2 (t03)
// the Arrhenius equation, its log form and graph, and numericals.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { PROFILE, ORIENT, ENDO } from './svgs.mjs';

export const V = {
  profile: svgV(PROFILE, 'Energy profile of an exothermic reaction with a tall hump for the uncatalysed path and a lower dashed hump for the catalysed path; arrows show the activation energies and the enthalpy change', 'Schematic, not to scale.'),
  endo: svgV(ENDO, 'Energy profile of an endothermic reaction: products higher than reactants, the activated complex at the threshold energy, and arrows for the forward and reverse activation energies and the positive enthalpy change', 'Schematic, not to scale.'),
  orient: svgV(ORIENT, 'An effective collision in which a hydroxide ion strikes the carbon of bromomethane opposite the bromine and forms methanol, and an ineffective collision at the bromine end in which the molecules bounce apart', 'Schematic: real molecules are three-dimensional.'),
};

const r4 = (x) => +x.toFixed(4);
const mb = (e, t) => Math.sqrt(e) * Math.exp(-e / t) / Math.pow(t, 1.5);
export const mbPlot = plot(
  {
    x: { min: 0, max: 8, label: 'Kinetic energy of molecules (arbitrary units)' },
    y: { min: 0, max: 0.5, label: 'Fraction of molecules' },
    series: [
      { label: 'Temperature T', kind: 'line', points: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8].map((e) => [e, r4(mb(e, 1))]) },
      { label: 'Temperature T + 10 K', kind: 'line', points: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8].map((e) => [e, r4(mb(e, 1.3))]) },
    ],
    vlines: [{ x: 4.5, label: 'Ea', dashed: true }],
  },
  'Distribution of molecular kinetic energies at two temperatures: at the higher temperature the curve is flatter and spread to higher energies, so a larger fraction of molecules lies beyond the activation energy line',
  'Illustrative curves; the temperature gap is exaggerated so that the difference is visible.',
);
// log k = log A − Ea/(2.303 R T); illustrative: Ea = 76.6 kJ/mol → slope −4000 K, log A = 11.
export const arrPlot = plot(
  {
    x: { min: 3.0, max: 3.6, label: '1000 ÷ T (K⁻¹)' },
    y: { min: -4, max: 0, label: 'log k' },
    functions: [{ expr: '11 - 4x', label: 'slope = −Ea ÷ 2.303R', domain: [3.0, 3.6] }],
  },
  'Arrhenius plot: log of the rate constant against one thousand divided by temperature is a straight line sloping downwards; the slope gives the activation energy and the intercept gives the frequency factor',
  'Illustrative line: slope −4000 K (per unit of 1/T), so Ea = 2.303 × 8.314 × 4000 ≈ 76.6 kJ mol⁻¹; intercept log A = 11.',
);

export const deck1 = deck({
  part: 1,
  title: 'Activation Energy, Collision Theory and Arrhenius Equation — Part 1: Energy barriers and collisions',
  goals: [
    'Explain energy barrier, threshold energy, activation energy and the activated complex',
    'Draw and label energy profiles for exothermic and endothermic reactions, with and without a catalyst',
    'Explain why only a fraction of collisions lead to reaction (energy and orientation)',
  ],
  slides: [
    sl('title', 'Why reactions need a push', {
      b: 'Part 1 — the energy barrier that molecules must cross, and why most collisions fail.',
      v: table(['Observation', 'Explanation (this chapter)'], [['A matchstick needs striking before it burns', 'Energy is needed to start the reaction (activation energy)'], ['Milk sours faster in summer', 'More molecules have enough energy at higher temperature'], ['Enzymes work at body temperature', 'They lower the activation energy']], 'Table of everyday observations explained by activation energy'),
      n: 'Namaste! A matchstick and the oxygen in air could react, yet the match lies quietly in its box until you strike it. Why? Because reactions must overcome an energy barrier before they can proceed. In this part we meet that barrier, the activation energy, see it on energy profile diagrams, and use collision theory to understand why only a small fraction of molecular collisions actually lead to reaction.',
    }),
    sl('concept', 'Threshold energy and activation energy', {
      b: '**Threshold energy:** the minimum total energy that colliding molecules must have for the collision to produce a reaction. **Activation energy (Ea):** the extra energy that must be supplied to reactant molecules, beyond their average energy, to reach the threshold energy: Ea = threshold energy − average energy of reactants. **Activated complex:** the unstable, high-energy arrangement at the top of the barrier, in which old bonds are partly broken and new ones partly formed.',
      m: [r`E_\text{a} = E_\text{threshold} - E_\text{reactants}`],
      v: table(['Term', 'Meaning'], [['Energy barrier', 'The hump between reactants and products on an energy profile'], ['Threshold energy', 'Energy level at the top of the barrier'], ['Activation energy', 'Height of the barrier above the reactants'], ['Activated complex', 'Short-lived species at the top; bonds partly broken and formed']], 'Table of terms used for the energy barrier'),
      n: 'Reactant molecules must reach a certain minimum energy, the threshold energy, before they can rearrange into products. The extra energy they need above their average energy is the activation energy. At the top of the barrier they form an activated complex, an unstable arrangement in which old bonds are stretched and new bonds are half formed; it can fall forward to products or back to reactants.',
    }),
    sl('diagram', 'Energy profile of an exothermic reaction', {
      b: 'Products lie **below** the reactants (ΔH < 0). The reactants must still climb over the barrier. A **catalyst** (dashed path) provides a route with a **lower** activation energy; it does not change the energies of reactants and products, so ΔH is unchanged.',
      v: V.profile,
      n: 'In an exothermic reaction the products have less energy than the reactants, so heat is released overall. Even so, the molecules must first climb a hill to form the activated complex. The height of that climb, measured from the reactants, is the activation energy. With a catalyst, shown dashed, the hill is lower, but the starting and finishing levels, and so the enthalpy change, stay the same.',
    }),
    sl('diagram', 'Energy profile of an endothermic reaction', {
      b: 'Products lie **above** the reactants (ΔH > 0). For the forward reaction, Ea(forward) = Ea(reverse) + ΔH, so an endothermic reaction always has Ea(forward) > ΔH.',
      v: V.endo,
      m: [r`\Delta H = E_\text{a(forward)} - E_\text{a(reverse)}`],
      n: 'In an endothermic reaction the products lie higher than the reactants, so heat is absorbed overall. The barrier is measured from the reactants for the forward reaction and from the products for the reverse reaction. The difference between the two activation energies equals the enthalpy change, so for an endothermic reaction the forward activation energy is always larger than the enthalpy change.',
    }),
    sl('example', 'Worked example: reading an energy profile', {
      b: r`**Problem.** For a reaction, the reactants are at 40 kJ mol⁻¹, the activated complex at 160 kJ mol⁻¹ and the products at 100 kJ mol⁻¹ (all on the same scale). Find (a) Ea(forward), (b) Ea(reverse) and (c) ΔH; state whether the reaction is exothermic or endothermic.

**(a)** $E_\text{a(f)} = 160 - 40 = 120\ \text{kJ mol}^{-1}$.

**(b)** $E_\text{a(r)} = 160 - 100 = 60\ \text{kJ mol}^{-1}$.

**(c)** $\Delta H = 100 - 40 = +60\ \text{kJ mol}^{-1}$ (= 120 − 60): endothermic.`,
      v: table(['Quantity', 'Value / kJ mol⁻¹'], [['Ea (forward)', '120'], ['Ea (reverse)', '60'], ['ΔH', '+60 (endothermic)']], 'Table of activation energies and enthalpy change from the energy profile'),
      n: 'Measure everything from the right level. The forward activation energy is the height of the activated complex above the reactants, one hundred and twenty. The reverse activation energy is its height above the products, sixty. The enthalpy change is products minus reactants, plus sixty, which also equals the difference between the two activation energies. A positive value means the reaction is endothermic.',
    }),
    sl('check', 'Quick check: energy profiles', {
      b: 'Use an energy profile to find an activation energy or the enthalpy change.',
      n: 'Quick check. Forward activation energy is measured from the reactants; the enthalpy change is products minus reactants.',
      chk: 'profile-mcq',
    }),
    sl('concept', 'Effect of a catalyst', {
      b: 'A **catalyst** provides an alternative pathway (mechanism) with a **lower activation energy**. It lowers Ea for the forward and reverse reactions **equally**, so equilibrium is reached sooner but its position is unchanged. It does not alter ΔH, ΔG or K and is regenerated at the end.',
      v: table(['A catalyst does', 'A catalyst does not'], [['Lower Ea of forward and reverse reactions', 'Change ΔH or ΔG'], ['Increase the fraction of effective collisions', 'Change the equilibrium constant or yield'], ['Take part in the mechanism and come out unchanged', 'Make a non-spontaneous reaction occur']], 'Table of what a catalyst does and does not do'),
      n: 'A catalyst is like a tunnel through the hill: the start and the finish are the same, but the climb is lower. More molecules now have enough energy to get over, so the reaction speeds up. Because the forward and reverse barriers are lowered by the same amount, equilibrium is reached faster, but the equilibrium constant, the enthalpy change and the Gibbs energy change are not altered.',
    }),
    sl('check', 'Quick check: catalysts and energy', {
      b: 'Decide which quantity a catalyst changes.',
      n: 'Quick check. A catalyst lowers the barrier but leaves the starting and finishing energy levels unchanged.',
      chk: 'catalyst-mcq',
    }),
    sl('concept', 'Collision theory', {
      b: 'Reacting molecules are pictured as hard spheres that must **collide**. A collision is **effective** only if (i) the colliding molecules have energy at least equal to the **threshold energy**, and (ii) they collide with **proper orientation**. Rate ∝ collision frequency × fraction of collisions with enough energy × orientation (steric) factor.',
      m: [r`\text{Rate} = P\,Z_\text{AB}\,e^{-E_\text{a}/RT}`],
      v: table(['Condition for an effective collision', 'Why'], [['Energy ≥ threshold energy', 'Enough energy to stretch and break bonds'], ['Proper orientation', 'Reacting atoms must come into contact'], ['Most collisions fail', 'Only a tiny fraction meet both conditions']], 'Table of the conditions for an effective collision'),
      n: 'Collision theory says molecules must collide to react, but colliding is not enough. In a gas, each molecule collides billions of times a second, yet many reactions are slow. A collision works only if the molecules carry at least the threshold energy and meet in the right orientation. The rate depends on how often molecules collide, the fraction with enough energy, and the probability of the right orientation.',
    }),
    sl('diagram', 'Orientation matters', {
      b: 'When OH⁻ reacts with CH₃Br, it must strike the carbon atom from the side **opposite** the bromine. A collision at the bromine end is ineffective, however energetic.',
      v: V.orient,
      n: 'Here is an example of orientation. A hydroxide ion can replace the bromine in bromomethane only if it approaches the carbon atom from the side opposite the bromine. If it strikes the bromine end, the two simply bounce apart. This need for the right orientation is why the steric factor in collision theory is often much less than one.',
    }),
    sl('example', 'Worked example: effective collisions', {
      b: r`**Problem.** In a gas reaction at 300 K, $Z = 1.0 \times 10^{31}$ collisions per litre per second, the fraction with enough energy is $e^{-E_\text{a}/RT} = 2.0 \times 10^{-9}$ and the steric factor is $0.05$. How many effective collisions occur per litre per second?

**Step 1.** Energetic collisions $= 1.0 \times 10^{31} \times 2.0 \times 10^{-9} = 2.0 \times 10^{22}$.

**Step 2.** Effective collisions $= 2.0 \times 10^{22} \times 0.05 = 1.0 \times 10^{21}$ per litre per second.`,
      v: flow('LR', [['a', 'All collisions Z'], ['b', '× fraction with enough energy'], ['c', '× steric factor P'], ['d', 'Effective collisions']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from total collisions to effective collisions'),
      n: 'Start with all the collisions, ten to the thirty one per litre per second. Only two in a thousand million carry enough energy, which leaves two times ten to the twenty two. Of those, only one in twenty is correctly oriented, giving ten to the twenty one effective collisions. Even this is a huge number, but it is a tiny fraction of all collisions.',
    }),
    sl('concept', 'Effect of temperature on collisions', {
      b: 'Raising the temperature increases the collision frequency only slightly, but it greatly increases the **fraction of molecules with energy ≥ threshold** (the tail of the energy distribution). That is why a 10 K rise often roughly doubles the rate.',
      v: mbPlot,
      n: 'At any temperature molecules have a spread of energies. Only those beyond the activation energy line can react. When the temperature rises by ten kelvin, the curve flattens and shifts to higher energies, and the small tail beyond the line grows a lot, often doubling. The molecules also move a little faster, but the growing tail is the main reason reactions speed up so much on warming.',
    }),
    sl('check', 'Quick check: collision theory', {
      b: 'Explain why most collisions between reactant molecules do not lead to reaction.',
      n: 'Quick check. Name the two conditions an effective collision must satisfy.',
      chk: 'collision-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Ea = threshold energy − average energy of reactants; activated complex at the top of the barrier.',
        'Exothermic: products below reactants; endothermic: products above; ΔH = Ea(f) − Ea(r).',
        'A catalyst lowers Ea (forward and reverse equally); ΔH, ΔG and K unchanged.',
        'Effective collisions need energy ≥ threshold and proper orientation.',
        'Temperature mainly raises the fraction of energetic molecules.',
      ],
      v: table(['Quantity', 'Measured from'], [['Ea (forward)', 'Reactant level to the peak'], ['Ea (reverse)', 'Product level to the peak'], ['ΔH', 'Reactant level to product level']], 'Summary table of quantities on an energy profile'),
      n: 'Let us sum up Part 1. Reactants must reach the threshold energy to form the activated complex; the extra energy needed is the activation energy. Energy profiles show this for exothermic and endothermic reactions, and a catalyst lowers the barrier without changing the enthalpy change. Collision theory explains that only energetic, well-oriented collisions succeed, and temperature mainly increases the energetic fraction.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Label reactants, products, activated complex, Ea and ΔH on every profile.',
        'Draw the catalysed path below the uncatalysed one, with the same end levels.',
        'Give both conditions for an effective collision.',
        'Mathematical treatment of collision theory is not required.',
      ],
      v: table(['Slip', 'Fix'], [['Ea measured from zero', 'Measure from the reactant level'], ['Catalyst changes ΔH', 'ΔH is unchanged'], ['All collisions react', 'Only energetic, well-oriented ones']], 'Table of three common slips in Part 1 and fixes'),
      n: 'A few tips. Label every part of an energy profile, and measure the activation energy from the reactant level. Draw the catalysed path lower but with the same ends. Always give both conditions for an effective collision. The mathematical treatment of collision theory is not part of your syllabus.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Activation Energy, Collision Theory and Arrhenius Equation — Part 2: The Arrhenius equation',
  goals: [
    'State the Arrhenius equation and explain the meaning of A and Ea',
    'Use the log form and the graph of log k against 1/T to find Ea and A',
    'Calculate activation energy from rate constants at two temperatures',
    'Calculate the effect of a catalyst or a temperature change on the rate constant',
  ],
  slides: [
    sl('title', 'The Arrhenius equation', {
      b: 'Part 2 — putting numbers to the effect of temperature on rate.',
      v: flow('LR', [['a', 'k = A e^(−Ea/RT)'], ['b', 'Log form'], ['c', 'Arrhenius plot'], ['d', 'Two-temperature equation'], ['e', 'Numericals']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of topics in Part 2'),
      n: 'Why does food keep for days in a refrigerator but spoil in hours in summer? In eighteen eighty nine Svante Arrhenius gave an equation connecting the rate constant with temperature and the activation energy. In this part we use it in its exponential and logarithmic forms, read activation energies from graphs, and solve the numericals that ISC papers often set.',
    }),
    sl('concept', 'The Arrhenius equation', {
      b: r`$k = A\,e^{-E_\text{a}/RT}$. **A** is the **frequency (pre-exponential) factor**, related to the frequency of collisions with proper orientation; it has the same unit as $k$. $e^{-E_\text{a}/RT}$ is the **fraction of molecules** with energy at least $E_\text{a}$ (the Boltzmann factor). A larger $E_\text{a}$ gives a smaller $k$ and a reaction more sensitive to temperature.`,
      m: [r`k = A\,e^{-E_\text{a}/RT}`],
      v: table(['Term', 'Meaning'], [['A', 'Frequency factor (collisions with proper orientation)'], ['Ea', 'Activation energy, J mol⁻¹'], ['R', '8.314 J K⁻¹ mol⁻¹'], ['T', 'Absolute temperature, K'], ['e^(−Ea/RT)', 'Fraction of molecules with energy ≥ Ea']], 'Table of terms in the Arrhenius equation'),
      n: 'In the Arrhenius equation, the rate constant equals A times e to the power minus activation energy over R T. A is the frequency factor, which counts collisions with the right orientation. The exponential term is the fraction of molecules with at least the activation energy. Because the activation energy sits in the exponent, small changes in temperature or activation energy change the rate constant enormously.',
    }),
    sl('concept', 'Log form and the Arrhenius plot', {
      b: r`Taking logarithms: $\ln k = \ln A - \dfrac{E_\text{a}}{RT}$, or $\log k = \log A - \dfrac{E_\text{a}}{2.303RT}$. A plot of $\log k$ against $1/T$ is a straight line with **slope $= -E_\text{a}/2.303R$** and **intercept $= \log A$**.`,
      m: [r`\log k = \log A - \frac{E_\text{a}}{2.303R}\cdot\frac{1}{T}`],
      v: arrPlot,
      n: 'Taking logs turns the exponential equation into a straight line. If you plot log k against one over T, the points fall on a line sloping downwards. The slope is minus the activation energy divided by two point three zero three R, so measuring the slope gives the activation energy. Extending the line to where one over T is zero gives log A, the frequency factor.',
    }),
    sl('example', 'Worked example: Ea and A from an Arrhenius plot', {
      b: r`**Problem.** A plot of $\log k$ against $1/T$ for a reaction is a straight line with slope $-5000\ \text{K}$ and intercept $12.0$ ($k$ in s⁻¹). Find $E_\text{a}$ and $A$.

**Step 1.** $-\dfrac{E_\text{a}}{2.303R} = -5000$, so $E_\text{a} = 5000 \times 2.303 \times 8.314 \approx 95\,740\ \text{J mol}^{-1}$, i.e. about $95.7\ \text{kJ mol}^{-1}$.

**Step 2.** $\log A = 12.0$, so $A = 1.0 \times 10^{12}\ \text{s}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Slope', '−5000 K'], ['Ea', 'about 95.7 kJ mol⁻¹'], ['Intercept', '12.0'], ['A', '1.0 × 10¹² s⁻¹']], 'Table of Arrhenius plot values and results'),
      n: 'The slope equals minus the activation energy over two point three zero three R. Multiplying five thousand by two point three zero three and by eight point three one four gives about ninety six thousand joules, so the activation energy is about ninety six kilojoules per mole. The intercept is log A, twelve, so A is ten to the twelve per second, the same unit as the first-order rate constant.',
    }),
    sl('check', 'Quick check: the Arrhenius plot', {
      b: 'Interpret the slope or intercept of a graph of log k against 1/T.',
      n: 'Quick check. The slope gives the activation energy and the intercept gives the frequency factor.',
      chk: 'plot-mcq',
    }),
    sl('concept', 'Rate constants at two temperatures', {
      b: r`Writing the log form at $T_1$ and $T_2$ and subtracting removes $A$:`,
      m: [r`\log\frac{k_2}{k_1} = \frac{E_\text{a}}{2.303R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right) = \frac{E_\text{a}}{2.303R}\left(\frac{T_2 - T_1}{T_1T_2}\right)`],
      v: table(['Use', 'What is known', 'What is found'], [['Find Ea', 'k₁, k₂, T₁, T₂', 'Ea'], ['Find a new k', 'k₁, Ea, T₁, T₂', 'k₂'], ['Find a temperature', 'k₁, k₂, Ea, T₁', 'T₂']], 'Table of uses of the two-temperature Arrhenius equation'),
      n: 'If we know the rate constant at two temperatures, we can find the activation energy without knowing A: write the log form for each temperature and subtract, and A cancels. The same equation, rearranged, gives the rate constant at a new temperature or the temperature needed for a desired rate constant. Remember to use kelvin and joules.',
    }),
    sl('example', 'Worked example: activation energy from two rate constants', {
      b: r`**Problem.** The rate constant of a first-order reaction is $2.0 \times 10^{-4}\ \text{s}^{-1}$ at $300\ \text{K}$ and $8.0 \times 10^{-4}\ \text{s}^{-1}$ at $320\ \text{K}$. Calculate $E_\text{a}$ ($R = 8.314\ \text{J K}^{-1}\ \text{mol}^{-1}$).

**Step 1.** $\log\dfrac{k_2}{k_1} = \log 4 = 0.602$.

**Step 2.** $\dfrac{T_2 - T_1}{T_1T_2} = \dfrac{20}{300 \times 320} = 2.083 \times 10^{-4}\ \text{K}^{-1}$.

**Step 3.** $E_\text{a} = \dfrac{2.303 \times 8.314 \times 0.602}{2.083 \times 10^{-4}} \approx 55\,340\ \text{J mol}^{-1}$, i.e. about $55.3\ \text{kJ mol}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['k₂/k₁', '4'], ['log (k₂/k₁)', '0.602'], ['(T₂ − T₁)/T₁T₂', '2.083 × 10⁻⁴ K⁻¹'], ['Ea', 'about 55.3 kJ mol⁻¹']], 'Table of the steps for finding Ea from two rate constants'),
      n: 'The rate constant becomes four times larger, and log four is about nought point six. The temperature term is twenty divided by three hundred times three hundred and twenty. Rearranging for the activation energy and putting in two point three zero three times the gas constant gives about fifty five kilojoules per mole. Notice that a twenty kelvin rise quadrupled the rate: roughly doubling for every ten kelvin.',
    }),
    sl('example', 'Worked example: a new rate constant', {
      b: r`**Problem.** A reaction has $E_\text{a} = 60.0\ \text{kJ mol}^{-1}$ and $k = 1.5 \times 10^{-3}\ \text{s}^{-1}$ at $310\ \text{K}$. Calculate $k$ at $330\ \text{K}$.

**Step 1.** $\log\dfrac{k_2}{k_1} = \dfrac{60000}{2.303 \times 8.314} \times \dfrac{20}{310 \times 330} \approx 3133.6 \times 1.955 \times 10^{-4} \approx 0.613$.

**Step 2.** $\dfrac{k_2}{k_1} = 10^{0.613} \approx 4.10$; $k_2 \approx 4.10 \times 1.5 \times 10^{-3} \approx 6.2 \times 10^{-3}\ \text{s}^{-1}$.`,
      v: table(['Temperature', 'Rate constant / s⁻¹'], [['310 K', '1.5 × 10⁻³'], ['330 K', 'about 6.2 × 10⁻³']], 'Table of rate constants at two temperatures'),
      n: 'Put the activation energy in joules, sixty thousand. The first factor, sixty thousand over two point three zero three R, is about three thousand one hundred and thirty four. The temperature factor is twenty over three hundred and ten times three hundred and thirty. Their product, about nought point six one, is the log of the ratio, so the rate constant rises about four times, to six point two thousandths per second.',
    }),
    sl('check', 'Quick check: temperature and k', {
      b: 'Predict how k changes with temperature or with activation energy.',
      n: 'Quick check. A reaction with a higher activation energy is more sensitive to temperature.',
      chk: 'temp-mcq',
    }),
    sl('concept', 'Temperature coefficient', {
      b: r`The **temperature coefficient** is the ratio of rate constants at two temperatures 10 K apart, usually $k_{308}/k_{298}$. For many reactions it is about **2 to 3**. It is larger for reactions with a larger activation energy.`,
      m: [r`\text{Temperature coefficient} = \frac{k_{T+10}}{k_T} \approx 2 \text{ to } 3`],
      v: table(['Ea / kJ mol⁻¹', 'k₃₀₈/k₂₉₈ (approx.)'], [['25', '1.4'], ['53', '2.0'], ['84', '3.0']], 'Table of approximate temperature coefficients for different activation energies'),
      n: 'Chemists often quote the temperature coefficient, the factor by which the rate constant increases for a ten kelvin rise, usually from twenty five to thirty five degrees Celsius. For many reactions it is two or three. A reaction with an activation energy of about fifty three kilojoules per mole doubles its rate for a ten kelvin rise; one with a larger activation energy speeds up even more.',
    }),
    sl('example', 'Worked example: effect of a catalyst', {
      b: r`**Problem.** At 300 K, an enzyme lowers the activation energy of a reaction from $80$ to $55\ \text{kJ mol}^{-1}$. If $A$ is unchanged, by what factor does the rate increase?

**Step 1.** $\log\dfrac{k_\text{cat}}{k} = \dfrac{E_\text{a} - E'_\text{a}}{2.303RT} = \dfrac{25000}{2.303 \times 8.314 \times 300} = \dfrac{25000}{5744} = 4.35$.

**Step 2.** $\dfrac{k_\text{cat}}{k} = 10^{4.35} \approx 2.2 \times 10^{4}$.`,
      v: table(['', 'Ea / kJ mol⁻¹', 'Relative k at 300 K'], [['Without enzyme', '80', '1'], ['With enzyme', '55', 'about 2.2 × 10⁴']], 'Table comparing rate constants with and without the enzyme'),
      n: 'Because A is the same, dividing the two Arrhenius equations leaves only the exponential terms. Lowering the activation energy by twenty five kilojoules per mole at three hundred kelvin raises log k by about four point three five, so the reaction goes about twenty two thousand times faster. That is how enzymes let reactions in our bodies proceed quickly at body temperature.',
    }),
    sl('check', 'Quick check: Arrhenius numericals', {
      b: 'Choose the correct form of the two-temperature Arrhenius equation, or the correct units.',
      n: 'Quick check. Use kelvin for temperature and joules for activation energy with R equal to eight point three one four.',
      chk: 'form-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`$k = Ae^{-E_\text{a}/RT}$; $\log k = \log A - \dfrac{E_\text{a}}{2.303RT}$.`,
        'Plot of log k against 1/T: slope −Ea/2.303R, intercept log A.',
        r`$\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$.`,
        'Temperature coefficient (10 K) is usually 2–3; larger Ea → more temperature-sensitive.',
        'Lowering Ea (catalyst) raises k by 10^(ΔEa/2.303RT).',
      ],
      v: table(['Relation', 'Use'], [['k = A e^(−Ea/RT)', 'Meaning of A and Ea'], ['Arrhenius plot', 'Ea from slope, A from intercept'], ['Two-temperature form', 'Ea, new k or new T']], 'Summary table of Arrhenius relations'),
      n: 'Let us sum up Part 2. The Arrhenius equation links the rate constant to temperature, the activation energy and the frequency factor. A plot of log k against one over T gives the activation energy from its slope and A from its intercept. The two-temperature form finds the activation energy or a new rate constant, and shows why catalysts and temperature have such large effects.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Use T in kelvin; convert °C by adding 273.',
        'Use Ea in J mol⁻¹ with R = 8.314 J K⁻¹ mol⁻¹; give the answer in kJ mol⁻¹.',
        'Put the higher temperature as T₂ so that log(k₂/k₁) is positive.',
        'A has the same unit as k.',
      ],
      v: table(['Slip', 'Fix'], [['Using °C', 'Use kelvin'], ['Ea in kJ with R = 8.314', 'Convert Ea to joules'], ['Slope = −Ea/R for a log₁₀ plot', 'Slope = −Ea/2.303R']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Temperatures must be in kelvin. Use joules with the gas constant eight point three one four and convert to kilojoules at the end. Put the higher temperature second so the log is positive. And for a plot of common logs, the slope is minus the activation energy over two point three zero three R.',
    }),
  ],
});
