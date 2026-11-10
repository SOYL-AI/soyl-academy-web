// ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity: two decks. Part 1 (t01-t02) inadequacy of the first law, spontaneity,
// second law, entropy and its calculation, entropy of the universe, thermal death; Part 2 (t03-t04) Gibbs and Helmholtz free energy,
// criteria of spontaneity and the crossover temperature, ΔG° and K, third law.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SPONT, ENTROPY_T, UNIVERSE, GIBBS_T, G_LOGK } from './svgs.mjs';
import { TRANS, dsTrans, dsIsoExp, RX, R, S0, RT2303, logK, f0, f1, f2, f3, sg, tx } from './data.mjs';

export const V = {
  spont: svgV(SPONT, 'A gas spreading into an evacuated bulb and heat flowing from a hot body to a cold body, two spontaneous changes', 'Energy is conserved in the reverse changes too, but they do not occur unaided.'),
  entropyT: svgV(ENTROPY_T, 'Entropy of one mole of water against temperature with jumps on melting and boiling', 'S = 0 at 0 K; jumps = ΔH / T.'),
  universe: svgV(UNIVERSE, 'Entropy changes of system, surroundings and universe for ice melting at 283 K and at 263 K', 'ΔS(universe) > 0 for a spontaneous change.'),
  gibbsT: svgV(GIBBS_T, 'Gibbs energy change against temperature for two reactions with crossover temperatures of 325 K and 780 K', 'Spontaneous where ΔG < 0.'),
  gk: svgV(G_LOGK, 'Graph of log K against the standard Gibbs energy change at 298 K', 'log K = −ΔG° / (2.303 R T).'),
};

// ---- worked-example data
const benz = dsTrans('benzVap');
const expN = 2.0;
const expS = dsIsoExp(expN, 10, 40);
const ha = RX.haber;
const kEx = 2.0e3;
const gEx = -RT2303(300) * Math.log10(kEx);
const no = RX.NO;

export const deck1 = deck({
  part: 1,
  title: 'Entropy, Free Energy and Spontaneity — Part 1: Spontaneous change, the second law and entropy',
  goals: [
    'Explain why the first law and the sign of ΔH cannot decide whether a change occurs, and state the second law',
    'Describe entropy as a state function and a measure of disorder; predict the sign of ΔS and calculate ΔS = q_rev / T',
    'Use the entropy change of the universe as the criterion of spontaneity and describe the thermal death of the universe',
  ],
  slides: [
    sl('title', 'Why do some changes happen and others do not?', {
      b: 'Part 1: the **direction of change**. The first law counts energy; the **second law** and **entropy** tell us which way a change goes.',
      v: flow('LR', [['a', 'First law: energy conserved'], ['b', 'Spontaneous or not?'], ['c', 'Second law'], ['d', 'Entropy S and ΔS = q_rev / T'], ['e', 'Entropy of the universe']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the topics of Part 1'),
      n: 'Welcome to Part One. The first law of thermodynamics says that energy is conserved, but it cannot tell us which changes will actually happen. In this part we meet spontaneous processes, the second law, and entropy, a measure of disorder, and we learn to calculate entropy changes.',
    }),
    sl('concept', 'The first law is not enough', {
      b: 'The **first law** says energy is conserved. It does **not** say in which direction a change goes. Heat flowing from a cold body to a hot body would conserve energy, but never happens unaided. A negative **ΔH** is not a reliable guide either: **ice melts** above 273 K and **NH₄NO₃ dissolves** although both absorb heat.',
      v: table(['Change', 'ΔH', 'Occurs by itself?'], [['Heat from hot to cold body', 'not relevant', 'yes'], ['Heat from cold to hot body (no work)', 'not relevant', 'no, though energy is conserved'], ['Ice melting at 298 K', 'positive', 'yes'], ['Gas spreading into a vacuum', 'zero (ideal gas)', 'yes'], ['Natural gas burning', 'negative', 'yes (once started)']], 'Table showing that neither energy conservation nor the sign of ΔH decides whether a change occurs'),
      n: 'The first law only says that energy is conserved. Heat flowing from a cold body to a hot body would obey it, yet it does not happen by itself. Nor is the sign of the enthalpy change a reliable guide, because ice melts and ammonium nitrate dissolves, although both take in heat.',
    }),
    sl('diagram', 'Two spontaneous changes', {
      b: 'A **spontaneous process** occurs of its own accord under the given conditions, in a definite direction. A gas **expands** into a vacuum; heat flows from **hot to cold**. The reverse changes need **outside work**: they are **non-spontaneous**.',
      v: V.spont,
      n: 'Here are two spontaneous changes. When the tap is opened, gas spreads into the empty bulb and never collects in one bulb again by itself. Heat flows from the hot body to the cold body, and never in the opposite direction unless work is done. Spontaneous changes have a definite direction.',
    }),
    sl('concept', 'Spontaneous and non-spontaneous; the second law', {
      b: '**Spontaneous:** occurs unaided (rusting, dissolving, cooling). **Non-spontaneous:** needs outside work (pumping water uphill, compressing a gas). **Second law (Clausius):** heat cannot flow of itself from a colder to a hotter body. **(Kelvin–Planck):** heat from a single reservoir cannot be converted completely into work in a cycle. Both lead to: **the entropy of the universe increases in a spontaneous change**.',
      v: table(['Spontaneous', 'Non-spontaneous (needs work)'], [['Heat flows from hot to cold', 'Heat flows from cold to hot'], ['Gas expands into a vacuum', 'Gas compresses itself into a corner'], ['Sugar dissolves in water', 'Sugar separates from its solution'], ['Iron rusts in moist air', 'Rust turns back into iron']], 'Table of spontaneous changes and their non-spontaneous reverses'),
      n: 'A spontaneous process happens unaided, like rusting or the cooling of hot tea. A non spontaneous process needs outside work, like pumping water uphill. The second law has two familiar statements: heat does not flow by itself from cold to hot, and heat from a single source cannot be changed completely into work in a cycle.',
    }),
    sl('check', 'Quick check: which change is non-spontaneous?', {
      b: 'Ask which direction of change you have ever seen happen on its own.',
      n: 'Quick check. For each change, think about whether you have ever seen it happen on its own at room temperature. Changes such as rusting, dissolving and cooling are natural. Look for the one that would need work to be done on the system before it could occur.',
      chk: 'spont-ex-mcq',
    }),
    sl('concept', 'Entropy: disorder and a state function', {
      b: '**Entropy, S,** measures the **disorder** (randomness) of a system. It is a **state function**: ΔS depends only on the initial and final states. For a **reversible** change **ΔS = q_rev / T**, in **J K⁻¹**. Entropy **rises** when a solid melts, a liquid boils, a gas is formed, a solute dissolves, or the volume of a gas increases; it **falls** when gas molecules combine.',
      v: table(['Change', 'ΔS of the system', 'Reason'], [['Ice melting', 'positive', 'ordered lattice → liquid'], ['Water boiling', 'positive (large)', 'liquid → free gas'], ['NaCl dissolving', 'positive', 'lattice → hydrated ions'], ['CaCO₃(s) → CaO(s) + CO₂(g)', 'positive', 'gas formed'], ['2NO₂(g) → N₂O₄(g)', 'negative', 'fewer moles of gas']], 'Table of the sign of the entropy change for common processes'),
      n: 'Entropy measures the disorder of a system, and it is a state function, so its change depends only on the initial and final states. For a reversible change, the entropy change is the heat divided by the temperature. Melting, boiling, dissolving and making a gas increase entropy, while molecules combining decrease it.',
    }),
    sl('diagram', 'Entropy of water rises with temperature', {
      b: 'The entropy of a perfect crystal is **zero at 0 K** and **rises** as the temperature rises, with **jumps** at the melting point (**+22.0 J K⁻¹ mol⁻¹**) and the boiling point (**+109.1 J K⁻¹ mol⁻¹**). Gas ≫ liquid > solid.',
      v: V.entropyT,
      n: 'This graph shows the entropy of one mole of water. It starts at zero at absolute zero, rises as ice warms, and jumps when the ice melts. It rises again in the liquid and jumps much more when the water boils. Steam has the highest entropy because its molecules move freely.',
    }),
    sl('concept', 'Entropy of fusion and vaporisation: ΔS = ΔH / T', {
      b: 'At the melting or boiling point the change is **reversible** and takes in heat q = ΔH at constant T, so **ΔS = ΔH / T** (convert kJ to J). Vaporisation gives a much larger ΔS than fusion because a gas is much more disordered than a liquid.',
      v: table(['Transition', 'ΔH (kJ mol⁻¹)', 'T (K)', 'ΔS (J K⁻¹ mol⁻¹)'], [['Ice → water', String(TRANS.iceFus.H), String(TRANS.iceFus.T), f1(dsTrans('iceFus'))], ['Water → steam', String(TRANS.waterVap.H), String(TRANS.waterVap.T), f1(dsTrans('waterVap'))], ['Benzene, solid → liquid', String(TRANS.benzFus.H), String(TRANS.benzFus.T), f1(dsTrans('benzFus'))], ['Benzene, liquid → gas', String(TRANS.benzVap.H), String(TRANS.benzVap.T), f1(dsTrans('benzVap'))]], 'Table of entropies of fusion and vaporisation'),
      n: 'At the melting point or boiling point the change is reversible, and the heat absorbed equals the enthalpy change. So the entropy change is the enthalpy change divided by the temperature. Remember to convert kilojoules to joules. Vaporisation gives a much larger entropy change than fusion, because a gas is far more disordered than a liquid.',
    }),
    sl('example', 'Worked example: entropy of vaporisation of benzene', {
      b: r`**Problem.** Benzene boils at ${TRANS.benzVap.T} K with $\Delta_{vap}H = ${TRANS.benzVap.H}$ kJ mol⁻¹. Find $\Delta_{vap}S$.

$\Delta S = \dfrac{q_{rev}}{T} = \dfrac{${f0(TRANS.benzVap.H * 1000)}\ \text{J mol}^{-1}}{${TRANS.benzVap.T}\ \text{K}} = ${f1(benz)}$ J K⁻¹ mol⁻¹.`,
      v: table(['Step', 'Working', 'Result'], [['Convert ΔH to joules', '30.8 kJ × 1000', '30 800 J mol⁻¹'], ['Divide by T', '30 800 / 353.2', `${f1(benz)} J K⁻¹ mol⁻¹`]], 'Table of the calculation of the entropy of vaporisation of benzene'),
      n: 'Change the enthalpy of vaporisation into joules, which gives thirty thousand eight hundred joules for each mole. Divide by the boiling temperature, three hundred fifty three point two kelvin. The entropy of vaporisation of benzene is about eighty seven joules per kelvin per mole, close to the value for many liquids.',
    }),
    sl('check', 'Quick check: entropy of vaporisation', {
      b: 'Convert kJ to J before dividing by the boiling point in kelvin.',
      n: 'Quick check. Write the enthalpy of vaporisation in joules per mole, since the unit of entropy involves joules. Divide by the boiling point in kelvin. The result should be close to the values you saw in the table for other liquids, around ninety joules per kelvin per mole.',
      chk: 'ds-vap-num',
    }),
    sl('concept', 'Entropy change on isothermal expansion of an ideal gas', {
      b: r`For a **reversible isothermal** expansion, $\Delta U = 0$, so $q_{rev} = -w = nRT\ln\dfrac{V_2}{V_1}$ and **$\Delta S = nR\ln\dfrac{V_2}{V_1}$**. ΔS is positive on expansion (more room for the molecules) and negative on compression. It depends on the volume ratio only, not on T.`,
      v: table(['n (mol)', 'V₁ → V₂', 'ΔS = nR ln(V₂/V₁) (J K⁻¹)'], [['1.0', 'V → 2V', f2(dsIsoExp(1, 1, 2))], ['1.0', 'V → 10V', f2(dsIsoExp(1, 1, 10))], ['0.5', 'V → 2V', f2(dsIsoExp(0.5, 1, 2))], ['1.0', '2V → V (compression)', f2(dsIsoExp(1, 2, 1))]], 'Table of entropy changes for the isothermal expansion and compression of an ideal gas'),
      n: 'In a reversible isothermal expansion of an ideal gas the internal energy does not change, so the heat absorbed equals the work done, n R T times the natural logarithm of the volume ratio. Dividing by the temperature, the entropy change is n R times the logarithm of the volume ratio. It is positive for expansion and negative for compression.',
    }),
    sl('example', 'Worked example: expansion of 2 mol of gas', {
      b: r`**Problem.** Two moles of an ideal gas expand reversibly and isothermally at 300 K from 10 L to 40 L. Find ΔS ($R = 8.314$ J K⁻¹ mol⁻¹).

$\Delta S = nR\ln\dfrac{V_2}{V_1} = ${expN} \times 8.314 \times \ln 4 = ${expN} \times 8.314 \times ${f3(Math.log(4))} \approx ${f2(expS)}$ J K⁻¹.`,
      v: table(['Quantity', 'Value'], [['n', '2.0 mol'], ['V₂ / V₁', '4'], ['ln 4', f3(Math.log(4))], ['ΔS', `${f2(expS)} J K⁻¹`], ['q_rev = TΔS at 300 K', `${f2((300 * expS) / 1000)} kJ`]], 'Table of the entropy change for an isothermal expansion of an ideal gas'),
      n: 'The volume ratio is four, and the natural logarithm of four is one point three eight six. Multiply by the number of moles and the gas constant. The entropy of the gas rises by about twenty three joules per kelvin. The heat absorbed reversibly at three hundred kelvin is the temperature times this, about seven kilojoules.',
    }),
    sl('check', 'Quick check: halving the pressure', {
      b: 'Doubling the volume gives ln 2 = 0.693 in the formula.',
      n: 'Quick check. The gas expands until its volume is doubled, so the volume ratio is two. Use the formula with the number of moles, the gas constant and the natural logarithm of two. The temperature itself does not appear in the final formula for the entropy change.',
      chk: 'isoexp-mcq',
    }),
    sl('diagram', 'Entropy of the universe decides', {
      b: '**ΔS(universe) = ΔS(system) + ΔS(surroundings)**, with **ΔS(surroundings) = −ΔH / T**. A change is spontaneous if **ΔS(universe) > 0**. Melting of 1 mol of ice: at 283 K the total is **+0.8 J K⁻¹** (melts); at 263 K it is **−0.8 J K⁻¹** (does not melt).',
      v: V.universe,
      n: 'Here the system is one mole of ice. Its entropy rises by twenty two joules per kelvin when it melts. The surroundings lose the same heat, so their entropy falls by the heat divided by their temperature. At two hundred eighty three kelvin the total is positive, so ice melts. At two hundred sixty three kelvin the total is negative, so it does not.',
    }),
    sl('concept', 'Second law in terms of entropy; thermal death', {
      b: '**Second law:** in a spontaneous (irreversible) process the **entropy of the universe increases**; in a reversible process it is unchanged; it **never decreases**. As changes continue, the entropy of the universe heads to a **maximum**: **thermal death**, a state of uniform temperature in which no heat flows and no work can be got from heat.',
      v: flow('LR', [['a', 'Spontaneous changes occur'], ['b', 'Entropy of the universe increases'], ['c', 'Entropy tends to a maximum'], ['d', 'Uniform temperature: no work from heat']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart from spontaneous change to the thermal death of the universe'),
      n: 'The second law says that the entropy of the universe increases in every spontaneous change, stays constant in a reversible one, and never decreases. If this goes on, the entropy of the universe tends towards a maximum. That is the so called thermal death, with the same temperature everywhere, no flow of heat, and no work to be had from heat.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'The first law does not give the direction of change; ΔH < 0 is neither necessary nor sufficient for spontaneity.',
        'A spontaneous process occurs unaided in one direction; the reverse is non-spontaneous and needs work.',
        'Entropy S: disorder, a state function; ΔS = q_rev / T (J K⁻¹); ΔS(fusion or vaporisation) = ΔH / T.',
        'Isothermal reversible expansion of an ideal gas: ΔS = nR ln(V₂/V₁).',
        'Spontaneous if ΔS(universe) = ΔS(system) − ΔH/T > 0; the universe tends to thermal death.',
      ],
      v: table(['Idea', 'Key fact'], [['Entropy', 'state function, J K⁻¹'], ['ΔS at a phase change', 'ΔH / T'], ['Spontaneous', 'ΔS(universe) > 0'], ['Surroundings', 'ΔS = −ΔH / T']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. The first law does not give the direction of change. Spontaneous processes happen unaided, and the second law says that the entropy of the universe increases in them. Entropy is a state function, measuring disorder, and at a phase change it is the enthalpy change divided by the temperature.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert ΔH from kJ to J before dividing by T to get ΔS in J K⁻¹ mol⁻¹.',
        'Use the reversible heat: ΔS = q_rev / T, not the actual heat of an irreversible change.',
        'Predict the sign of ΔS by looking at the change in the number of moles of gas and at changes of state.',
        'For the universe add ΔS(system) and ΔS(surroundings) = −ΔH / T for the same temperature.',
        'Say "entropy of the universe increases" in a spontaneous change, not "entropy of the system".',
      ],
      v: table(['Slip', 'Fix'], [['Dividing kJ by K and quoting J K⁻¹', 'Multiply ΔH by 1000 first'], ['Using ΔH(system) as ΔS(surroundings)', 'ΔS(surroundings) = −ΔH / T'], ['Saying the entropy of the system must rise', 'The universe must gain entropy']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Convert the enthalpy change to joules before dividing by the temperature. Use the reversible heat. Predict the sign of the entropy change from the moles of gas and the change of state. Add the entropy changes of the system and the surroundings, and remember that it is the universe whose entropy must increase.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Entropy, Free Energy and Spontaneity — Part 2: Gibbs and Helmholtz energy, ΔG° and K, the third law',
  goals: [
    'Define the Gibbs and Helmholtz free energies, relate them, and use ΔG = ΔH − TΔS to judge spontaneity and find a crossover temperature',
    'Calculate K from ΔG° and ΔG° from K using ΔG° = −2.303 RT log K',
    'State the third law of thermodynamics and use standard entropies',
  ],
  slides: [
    sl('title', 'A single criterion: free energy', {
      b: 'Part 2: combining ΔH and ΔS into **free energy**, the criterion of spontaneity, its link with the **equilibrium constant**, and the **third law**.',
      v: table(['Quantity', 'Definition', 'Spontaneous when'], [['Gibbs energy G', 'H − TS', 'ΔG < 0 (const T, p)'], ['Helmholtz energy A', 'U − TS', 'ΔA < 0 (const T, V)'], ['Relation', 'G = A + pV', '']], 'Table of the free-energy functions'),
      n: 'Welcome to Part Two. Looking at the system and the surroundings together is awkward, so we combine them into a single function of the system, the free energy. We meet the Gibbs and Helmholtz free energies, use them to decide spontaneity and the crossover temperature, link them to the equilibrium constant, and state the third law.',
    }),
    sl('concept', 'Gibbs and Helmholtz free energy', {
      b: '**Gibbs energy G = H − TS**; at constant T and p, **ΔG = ΔH − TΔS**. **Helmholtz energy A = U − TS**; at constant T, ΔA = ΔU − TΔS. Both are **state functions**. −ΔG is the **maximum useful (non-expansion) work**; −ΔA is the maximum work of all kinds at constant temperature.',
      v: table(['', 'Gibbs energy G', 'Helmholtz energy A'], [['Definition', 'G = H − TS', 'A = U − TS'], ['Constant', 'T and p', 'T and V'], ['Spontaneous', 'ΔG < 0', 'ΔA < 0'], ['Equilibrium', 'ΔG = 0', 'ΔA = 0'], ['Meaning of −Δ', 'maximum non-expansion work', 'maximum total work']], 'Table comparing Gibbs and Helmholtz energies'),
      n: 'The Gibbs energy is the enthalpy minus the temperature times the entropy, and it is the one used at constant temperature and pressure. The Helmholtz energy is the internal energy minus the temperature times the entropy, used at constant temperature and volume. Both are state functions, and a negative change means a spontaneous process.',
    }),
    sl('concept', 'The relation G = A + pV', {
      b: r`Since $H = U + pV$: $G = H - TS = U + pV - TS = (U - TS) + pV$, so **G = A + pV**. At constant T: $\Delta G = \Delta A + \Delta(pV)$. For ideal gases $\Delta(pV) = \Delta n_g RT$, so **ΔG = ΔA + Δn_g RT**. For reactions without a change in the number of moles of gas, ΔG ≈ ΔA.`,
      v: table(['Reaction', 'Δn_g', 'ΔG − ΔA at 300 K (kJ)'], [['N₂O₄(g) → 2NO₂(g)', '+1', f2((1 * R * 300) / 1000)], ['2SO₂(g) + O₂(g) → 2SO₃(g)', '−1', f2((-1 * R * 300) / 1000)], ['H₂(g) + I₂(g) → 2HI(g)', '0', '0.00'], ['N₂(g) + 3H₂(g) → 2NH₃(g)', '−2', f2((-2 * R * 300) / 1000)]], 'Table of the difference between ΔG and ΔA for gaseous reactions at 300 K'),
      n: 'Start from the definition of the Gibbs energy. Replace the enthalpy by internal energy plus pressure times volume. Grouping the internal energy minus T S gives the Helmholtz energy, so G equals A plus p V. For ideal gases the change in p V is the change in moles of gas times R T, which is zero if the moles of gas do not change.',
    }),
    sl('concept', 'Criteria for spontaneity: ΔG = ΔH − TΔS', {
      b: 'At constant T and p: **ΔG < 0** spontaneous; **ΔG = 0** equilibrium; **ΔG > 0** non-spontaneous (the reverse occurs). The signs of ΔH and ΔS decide how the answer depends on **temperature**. At the crossover, **T = ΔH / ΔS**.',
      v: table(['ΔH', 'ΔS', 'ΔG = ΔH − TΔS', 'Spontaneous', 'Example'], [['−', '+', 'always −', 'at all T', '2H₂O₂(l) → 2H₂O(l) + O₂(g)'], ['+', '−', 'always +', 'at no T', '3O₂(g) → 2O₃(g)'], ['−', '−', '− at low T', 'below ΔH/ΔS', 'N₂ + 3H₂ → 2NH₃'], ['+', '+', '− at high T', 'above ΔH/ΔS', 'MgCO₃(s) → MgO(s) + CO₂(g)']], 'Table of the four sign combinations of ΔH and ΔS and the spontaneity of the reaction'),
      n: 'At constant temperature and pressure, a negative change in Gibbs energy means spontaneous, zero means equilibrium, and positive means non spontaneous. The signs of the enthalpy and entropy changes decide how this depends on temperature. When both have the same sign there is a crossover temperature, equal to the enthalpy change divided by the entropy change.',
    }),
    sl('diagram', 'ΔG against temperature', {
      b: 'ΔG = ΔH − TΔS is a **straight line** in T with slope −ΔS. **N₂O₄ → 2NO₂** (ΔH, ΔS > 0): the line falls and crosses zero at **325 K**; spontaneous above. **2NO + O₂ → 2NO₂** (ΔH, ΔS < 0): the line rises, crossing zero at **780 K**; spontaneous below.',
      v: V.gibbsT,
      n: 'The Gibbs energy change is a straight line against temperature, with slope equal to minus the entropy change. For the dissociation of dinitrogen tetroxide, both changes are positive, so the line falls and crosses zero at about three hundred twenty five kelvin. For nitric oxide and oxygen, both are negative, so the line rises and crosses zero near seven hundred eighty kelvin.',
    }),
    sl('example', 'Worked example: ΔH° and ΔS° of the Haber reaction', {
      b: r`**Problem.** For $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$ find ΔH° and ΔS° from ΔfH°(NH₃) = −46.1 kJ mol⁻¹ and S° (N₂ 191.6, H₂ 130.7, NH₃ 192.5 J K⁻¹ mol⁻¹).

$\Delta H^\circ = 2(-46.1) = ${tx(ha.h)}$ kJ. $\Delta S^\circ = 2(192.5) - [191.6 + 3(130.7)] = 385.0 - 583.7 = ${tx(ha.s)}$ J K⁻¹.`,
      v: table(['', 'Reactants', 'Products', 'Change'], [['Moles of gas', '4', '2', '−2'], ['ΣS° (J K⁻¹)', '583.7', '385.0', tx(ha.s)], ['ΣΔfH° (kJ)', '0', '−92.2', tx(ha.h)]], 'Table of the calculation of the enthalpy and entropy changes for ammonia synthesis'),
      n: 'The enthalpy change is twice the formation enthalpy of ammonia, since the elements contribute zero. For entropy, add the standard entropies of the products and subtract those of the reactants. Four moles of gas become two, so the entropy change is negative, about minus one hundred ninety nine joules per kelvin.',
    }),
    sl('check', 'Quick check: the Helmholtz criterion', {
      b: 'Compare with ΔG < 0 at constant T and p: which variables are held constant for A?',
      n: 'Quick check. The Helmholtz energy is the internal energy minus T S, and it is the natural function when the temperature and the volume are held constant. Recall the sign of the change in the Gibbs energy for a spontaneous process, and use the same sign for the Helmholtz energy.',
      chk: 'helm-mcq',
    }),
    sl('example', 'Worked example: ΔG° at 298 K and the crossover temperature', {
      b: r`**Problem.** Using $\Delta H^\circ = ${tx(ha.h)}$ kJ and $\Delta S^\circ = ${tx(ha.s)}$ J K⁻¹ for ammonia synthesis, find ΔG° at 298 K and the temperature at which it becomes zero.

$\Delta G^\circ = ${tx(ha.h)} - 298 \times (${tx(ha.s / 1000, 4)}) = ${tx(ha.h)} + ${f1((298 * -ha.s) / 1000)} = ${tx(ha.g298)}$ kJ. $T = \dfrac{\Delta H}{\Delta S} = \dfrac{92\,200}{198.7} = ${f0(ha.Tc)}$ K.`,
      v: table(['Step', 'Result'], [['−TΔS° at 298 K', `+${f1((298 * -ha.s) / 1000)} kJ`], ['ΔG° at 298 K', `${tx(ha.g298)} kJ: spontaneous`], ['Crossover T = ΔH/ΔS', `${f0(ha.Tc)} K`], ['Above this temperature', 'ΔG° > 0: not spontaneous']], 'Table of the Gibbs energy change at 298 K and the crossover temperature for ammonia synthesis'),
      n: 'Convert the entropy change to kilojoules per kelvin. The temperature times minus the entropy change is plus fifty nine kilojoules. Adding the enthalpy change gives a Gibbs energy change of about minus thirty three kilojoules, so the reaction is spontaneous at room temperature. Setting it to zero gives a crossover near four hundred sixty four kelvin, above which it is not spontaneous.',
    }),
    sl('check', 'Quick check: converting ΔS to kilojoules', {
      b: 'ΔH is in kJ and ΔS is in J K⁻¹: use the same energy unit.',
      n: 'Quick check. The enthalpy change is given in kilojoules but the entropy change is in joules per kelvin. Express both in the same unit before you subtract. Remember also that the temperature must be in kelvin, and that a negative entropy change makes the temperature term positive.',
      chk: 'dG298-mcq',
    }),
    sl('concept', 'ΔG° and the equilibrium constant', {
      b: r`At equilibrium ΔG = 0, and the standard Gibbs energy change is related to **K** by **ΔG° = −RT ln K = −2.303 RT log K**. **ΔG° < 0: K > 1** (products favoured); **ΔG° > 0: K < 1**; **ΔG° = 0: K = 1**. At 298 K, $2.303RT = 5.706$ kJ mol⁻¹.`,
      v: V.gk,
      n: 'At equilibrium the Gibbs energy change is zero, and the standard Gibbs energy change is related to the equilibrium constant. It equals minus two point three oh three R T times the logarithm of K. A negative value gives K greater than one, a positive value gives K less than one, and zero gives K equal to one.',
    }),
    sl('example', 'Worked example: ΔG° from K', {
      b: r`**Problem.** A reaction has $K = 2.0 \times 10^{3}$ at 300 K. Find ΔG°.

$\Delta G^\circ = -2.303RT\log K = -2.303 \times 8.314 \times 300 \times \log(2.0 \times 10^3) = -5744 \times ${f2(Math.log10(kEx))} \approx ${tx(gEx)}$ kJ mol⁻¹ (after dividing by 1000).`,
      v: table(['Step', 'Value'], [['2.303 RT at 300 K', `${f2(RT2303(300) * 1000)} J mol⁻¹`], ['log K', f2(Math.log10(kEx))], ['ΔG° = −2.303 RT log K', `${tx(gEx)} kJ mol⁻¹`], ['Sign check', 'K > 1, so ΔG° < 0']], 'Table of the calculation of the standard Gibbs energy change from an equilibrium constant'),
      n: 'Work out two point three oh three R T at three hundred kelvin, which is about five thousand seven hundred forty four joules per mole. The logarithm of two thousand is three point three. Multiply and change the sign, giving about minus nineteen kilojoules per mole. The sign is negative, as expected for a constant greater than one.',
    }),
    sl('check', 'Quick check: from ΔG° to log K', {
      b: 'Rearrange ΔG° = −2.303 RT log K for log K, using joules.',
      n: 'Quick check. Rearrange the relation so that the logarithm of K is on one side. The standard Gibbs energy change is given in kilojoules, so convert it to joules to match the gas constant. Divide by two point three oh three R T and keep the sign carefully.',
      chk: 'dgk-num',
    }),
    sl('concept', 'The third law and absolute entropy', {
      b: '**Third law:** the entropy of a **perfect crystalline substance is zero at the absolute zero** of temperature. It gives entropy a natural zero, so **absolute (standard molar) entropies S°** can be tabulated. S° is **small** for compact solids and **large** for gases.',
      v: table(['Substance', 'S° (J K⁻¹ mol⁻¹)', 'State'], [['C (diamond)', String(S0.diamond), 'hard crystal'], ['C (graphite)', String(S0.C), 'layered crystal'], ['H₂O(l)', String(S0.H2Ol), 'liquid'], ['H₂O(g)', String(S0.H2Og), 'gas'], ['NH₃(g)', String(S0.NH3), 'gas'], ['CO₂(g)', String(S0.CO2), 'gas']], 'Table of standard molar entropies of some substances'),
      n: 'The third law states that the entropy of a perfect crystal is zero at the absolute zero of temperature. This gives entropy a natural zero, so absolute entropies can be listed in tables. Compact solids such as diamond have very small values, liquids have more, and gases have the largest values.',
    }),
    sl('example', 'Worked example: ΔS° from standard entropies', {
      b: r`**Problem.** Find ΔS° and the crossover temperature for $\ce{2NO(g) + O2(g) -> 2NO2(g)}$ with S° (NO 210.8, O₂ 205.1, NO₂ 240.1 J K⁻¹ mol⁻¹) and ΔH° = ${tx(no.h)} kJ.

$\Delta S^\circ = 2(240.1) - [2(210.8) + 205.1] = 480.2 - 626.7 = ${tx(no.s)}$ J K⁻¹. $T = \dfrac{114\,200}{146.5} = ${f0(no.Tc)}$ K: spontaneous below this.`,
      v: table(['', 'Reactants', 'Products', 'ΔS°'], [['Moles of gas', '3', '2', 'fewer'], ['ΣS° (J K⁻¹)', '626.7', '480.2', tx(no.s)], ['ΔH° (kJ)', '', '', tx(no.h)], ['Crossover T', '', '', `${f0(no.Tc)} K`]], 'Table of the calculation of the entropy change and crossover temperature for the oxidation of nitric oxide'),
      n: 'Add the standard entropies of the products, two moles of nitrogen dioxide, and subtract those of the reactants. Three moles of gas become two, so the entropy change is negative, about minus one hundred forty six point five. The enthalpy change is also negative, so the reaction is spontaneous only below the crossover, near seven hundred eighty kelvin.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'G = H − TS; A = U − TS; G = A + pV, so ΔG = ΔA + Δn_g RT for ideal gases.',
        'Constant T, p: ΔG = ΔH − TΔS; ΔG < 0 spontaneous, = 0 equilibrium, > 0 non-spontaneous.',
        '(−, +) always spontaneous; (+, −) never; (−, −) below ΔH/ΔS; (+, +) above ΔH/ΔS.',
        'ΔG° = −2.303 RT log K: negative ΔG° gives K > 1; 2.303 RT = 5.706 kJ mol⁻¹ at 298 K.',
        'Third law: S = 0 for a perfect crystal at 0 K; ΔS° = ΣS°(products) − ΣS°(reactants).',
      ],
      v: table(['Idea', 'Key fact'], [['Gibbs criterion', 'ΔG = ΔH − TΔS < 0'], ['Crossover', 'T = ΔH / ΔS'], ['ΔG° and K', 'ΔG° = −2.303 RT log K'], ['Third law', 'S = 0 at 0 K, perfect crystal']], 'Summary table of the key ideas of Part 2'),
      n: 'Let us sum up Part Two. The Gibbs energy is enthalpy minus T S, and the Helmholtz energy is internal energy minus T S. A negative Gibbs energy change means spontaneous at constant temperature and pressure. The signs of the enthalpy and entropy changes give the crossover temperature. The standard change links to the equilibrium constant, and the third law fixes absolute entropies.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write ΔG = ΔH − TΔS with ΔH in kJ and TΔS in kJ (divide ΔS in J by 1000); T in kelvin.',
        'For the crossover temperature use T = ΔH / ΔS with both in joules (or both in kilojoules).',
        'In ΔG° = −2.303 RT log K use R = 8.314 J K⁻¹ mol⁻¹ and ΔG° in joules.',
        'State the conditions: ΔG < 0 at constant T and p; ΔA < 0 at constant T and V.',
        'Define S = 0 only for a perfect crystal at 0 K when stating the third law.',
      ],
      v: table(['Slip', 'Fix'], [['Using ΔS in J and ΔH in kJ together', 'Divide ΔS by 1000 (or multiply ΔH)'], ['log K with the wrong sign', 'K > 1 means ΔG° < 0'], ['Third law: "entropy is zero at 0 K"', 'Say perfect crystalline substance']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Use the same energy unit for the enthalpy change and for T times the entropy change. Use the crossover formula with consistent units. In the equation linking the standard Gibbs energy change to K, use joules and check the sign. And when you state the third law, say a perfect crystalline substance at the absolute zero.',
    }),
  ],
});
