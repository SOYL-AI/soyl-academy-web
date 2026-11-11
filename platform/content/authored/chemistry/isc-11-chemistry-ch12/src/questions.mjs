// ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity: question bank (ISC style). Constants: R = 8.314 J K⁻¹ mol⁻¹, 2.303 R T = 5.706 kJ mol⁻¹
// at 298 K. Data: ΔfusH(ice) 6.01 kJ mol⁻¹ at 273.15 K, ΔvapH(water) 40.7 at 373.15 K, benzene fusion 9.87 at 278.7 K, vaporisation 30.8 at 353.2 K,
// propanone vaporisation 29.1 at 329.4 K, mercury fusion 2.29 at 234.3 K; S° (J K⁻¹ mol⁻¹) H₂ 130.7, N₂ 191.6, O₂ 205.1, NH₃ 192.5, H₂O(l) 69.9,
// H₂O(g) 188.8, NO 210.8, NO₂ 240.1, N₂O₄ 304.3, CO₂ 213.8, MgO 26.9, MgCO₃ 65.7; ΔfH° (kJ mol⁻¹) NO +90.3, NO₂ +33.2, N₂O₄ +9.2, MgO −601.6,
// MgCO₃ −1095.8, CO₂ −393.5, H₂O(l) −285.8; ΔfG° NO₂ +51.3, N₂O₄ +97.9. Every numerical is computed in JS and re-solved by a check.
// Assertion-reason keys: a c d b a c.
import { mk, add, r } from './lib.mjs';
import { TRANS, dsTrans, dsIsoExp, RX, R, S0, HF, GF, RT2303, logK, dG, Tc, near, f0, f1, f2, f3, sg, tx } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const T0 = 273.15;
const sFus = dsTrans('iceFus'); // 22.0
const ex = (x, d = 1) => x.toExponential(d).replace(/e([+-])(\d+)/, (_, s, n) => ` × 10${[...String(Number(n))].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('').replace(/^/, s === '-' ? '⁻' : '')}`);

// ================================================================ t01 first law, spontaneity, second law
add('first-law-mcq', mcq({
  stem: 'A physics teacher lists four changes that all conserve energy. Which one cannot happen as a spontaneous change, even though it does not break the first law?',
  right: 'heat passing from a cold block to a hot block in contact with it, with no work done',
  wrong: ['heat passing from the hot block to the cold block', 'a gas spreading into a neighbouring evacuated vessel', 'the pressure of a gas cylinder falling when its valve is opened'],
  sol: 'The first law only says that energy is conserved; it does not give the direction of change. Heat flowing from cold to hot would conserve energy but never occurs unaided, so the second law is needed — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('spont-def-mcq', mcq({
  stem: 'A process that proceeds on its own, without continuous outside help, under the given conditions is called a:',
  right: 'spontaneous process',
  wrong: ['reversible process', 'adiabatic process', 'cyclic process'],
  sol: 'A spontaneous (natural) process occurs by itself under the given conditions, in a definite direction. Reversible, adiabatic and cyclic describe the way a change is carried out, not whether it occurs unaided — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('exo-mcq', mcq({
  stem: 'A student notes that ice melts at room temperature although melting is endothermic, and that ammonium nitrate dissolves in water although the dissolution is also endothermic. The justified conclusion is that:',
  right: 'a negative ΔH alone cannot be the criterion of spontaneity; the increase of entropy also drives such changes',
  wrong: ['all endothermic processes are spontaneous at room temperature', 'ΔH has no relation at all to spontaneity', 'endothermic processes break the first law of thermodynamics'],
  sol: 'Both changes absorb heat yet occur spontaneously, so ΔH < 0 is not necessary for spontaneity. In each case the disorder of the system increases (solid → liquid, ordered crystal → free ions), and this entropy gain outweighs the energy cost — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('spont-ex-mcq', mcq({
  stem: 'Which of the following changes will not occur unaided at room temperature?',
  right: 'the scent molecules spread evenly through a classroom collecting again in one corner',
  wrong: ['an iron nail rusting in moist air', 'sugar dissolving in a cup of tea', 'a hot cup of tea cooling to room temperature'],
  sol: 'Rusting, dissolving and cooling are all natural, spontaneous changes. The spread of molecules through a room is irreversible: their collection into one corner by themselves would need outside work — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('secondlaw-mcq', mcq({
  stem: 'Which statement is a form of the second law of thermodynamics?',
  right: 'heat cannot by itself flow from a colder body to a hotter body',
  wrong: ['energy can neither be created nor destroyed', 'the entropy of a perfect crystal is zero at absolute zero', 'the enthalpy change of a reaction is the same by every route'],
  sol: 'The Clausius statement of the second law says that heat cannot flow of its own accord from a colder to a hotter body. The other options are the first law, the third law and Hess’s law — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('reverse-mcq', mcq({
  stem: 'In a thermodynamically reversible process:',
  right: 'the system is at every stage in equilibrium with its surroundings, the changes being infinitesimally small',
  wrong: ['the change takes place at a finite rate in a single step', 'the surroundings do no work on the system', 'the process can be carried out only once'],
  sol: 'A reversible process is carried out through a series of infinitesimal steps, with the system always in equilibrium with its surroundings, so that the process can be reversed at any stage by an infinitesimal change in a condition — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('spont-ar', ar({
  a: 'A gas confined to one of two connected bulbs spreads into the evacuated bulb when the tap between them is opened.',
  r: 'The spreading of the gas increases the disorder, and hence the entropy, of the system.',
  key: 'a',
  sol: 'Both statements are true. There is no energy change for an ideal gas, so the driving force is the increase in entropy: the gas has more ways of being arranged in the larger volume, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('exo-ar', ar({
  a: 'Ice melts spontaneously above 273 K even though melting is endothermic.',
  r: 'The entropy of water decreases when ice melts.',
  key: 'c',
  sol: 'A is true. R is false: the molecules of liquid water are less ordered than those in the ice lattice, so the entropy increases on melting, and above 273 K the gain outweighs the heat absorbed — option (c).',
  d: 2, c: 'analysis', t: [1, 2],
}));
add('spont-tf', tf({
  stem: 'A process that is spontaneous in one direction is also spontaneous in the reverse direction under the same conditions, provided enough time is allowed.',
  key: 'f',
  sol: 'False. A spontaneous change has a definite direction; the reverse change does not occur unaided under the same conditions and needs outside work.',
  d: 1, c: 'understanding', t: [1],
}));
add('inadequacy-short2', short({
  marks: 2,
  stem: 'Give two reasons, with an example each, why the first law of thermodynamics alone cannot decide whether a chemical or physical change will take place.',
  model: 'First, the first law only requires energy to be conserved, and says nothing about direction: heat flowing from a cold body to a hot body would conserve energy, yet never occurs by itself. Second, a negative ΔH is not a sufficient guide: ice melts above 273 K and ammonium nitrate dissolves in water although both changes absorb heat, so the first law cannot predict them.',
  sol: 'No direction of change; ΔH < 0 is neither necessary nor sufficient.',
  scheme: [['No direction: heat from cold to hot conserves energy but does not occur', 1], ['ΔH alone fails: endothermic changes such as melting of ice are spontaneous', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('spont-short2', short({
  marks: 2,
  stem: 'Distinguish a spontaneous process from a non-spontaneous process, giving two examples of each.',
  model: 'A spontaneous process takes place of its own accord under the given conditions, in a definite direction (for example heat flowing from a hot to a cold body, or a gas expanding into a vacuum). A non-spontaneous process does not occur unaided and needs outside work or energy (for example a gas compressing itself into one corner of a vessel, or water flowing uphill).',
  sol: 'Spontaneous: occurs unaided (two examples); non-spontaneous: needs outside work (two examples).',
  scheme: [['Spontaneous: definition and two examples', 1], ['Non-spontaneous: definition and two examples', 1]],
  d: 1, c: 'understanding', t: [1],
}));
// ================================================================ t02 entropy
add('entropy-state-mcq', mcq({
  stem: 'The entropy change of a system depends only on its initial and final states and not on the path followed between them. This shows that entropy is a:',
  right: 'state function',
  wrong: ['path function', 'form of heat', 'form of work'],
  sol: 'A property whose change depends only on the initial and final states is a state function, like U, H and G — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('sign-mcq', mcq({
  stem: 'A student classifies four changes. Which one shows a decrease in the entropy of the system?',
  right: String.raw`$\ce{2NO2(g) -> N2O4(g)}$`,
  wrong: ['sublimation of a pellet of solid carbon dioxide', 'dissolving a crystal of sugar in water', 'boiling water in a kettle'],
  sol: 'Two moles of gas combine to form one mole of gas, so the system becomes more ordered and ΔS < 0. Sublimation, dissolution and boiling all create more freedom of motion (ΔS > 0) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('fusion-mcq', (() => {
  const s = (TRANS.benzFus.H * 1000) / TRANS.benzFus.T;
  return mcq({
    stem: `Solid benzene melts at ${TRANS.benzFus.T} K, and the enthalpy of fusion is ${TRANS.benzFus.H} kJ mol⁻¹. The entropy of fusion is about:`,
    right: `${f1(s)} J K⁻¹ mol⁻¹`,
    wrong: [`${f3(s / 1000)} J K⁻¹ mol⁻¹`, `${f0(s * 10)} J K⁻¹ mol⁻¹`, `${f2(TRANS.benzFus.H)} J K⁻¹ mol⁻¹`],
    sol: `At the melting point the change is reversible, so ΔS = q_rev / T = ΔfusH / T = ${f0(TRANS.benzFus.H * 1000)} J mol⁻¹ / ${TRANS.benzFus.T} K = ${f1(s)} J K⁻¹ mol⁻¹ — option (@K).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => near(9870 / 278.7, 35.41, 0.001) || 'fusion-mcq');
add('univ-mcq', (() => {
  const surr = -6010 / 263;
  const tot = 22.0 + surr;
  return mcq({
    stem: 'Melting one mole of ice gives the system an entropy gain of +22.0 J K⁻¹ and takes 6010 J of heat from the surroundings. In surroundings held at 263 K, the total entropy change of the universe for this melting is:',
    right: `${sg(tot, 2)} J K⁻¹, so the ice does not melt spontaneously`,
    wrong: [`${sg(-tot, 2)} J K⁻¹, so the ice melts spontaneously`, '+22.0 J K⁻¹, since the surroundings do not matter', 'zero, so ice and water are in equilibrium at 263 K'],
    sol: `ΔS(surroundings) = −q / T = −6010 / 263 = ${sg(surr, 2)} J K⁻¹. ΔS(total) = +22.0 + (${sg(surr, 2)}) = ${sg(tot, 2)} J K⁻¹ < 0, so melting does not occur spontaneously at 263 K — option (@K).`,
    d: 3, c: 'analysis', t: [2],
  });
})(), () => near(22.0 - 6010 / 263, -0.852, 0.01) || 'univ-mcq');
add('isoexp-mcq', (() => {
  const s = dsIsoExp(0.5, 1, 2);
  return mcq({
    stem: 'In a demonstration, 0.50 mol of an ideal gas expands isothermally and reversibly at 300 K until its volume doubles. The entropy change of the gas is:',
    right: `${sg(s, 2)} J K⁻¹`,
    wrong: [`${sg(2 * s, 2)} J K⁻¹`, `${sg(s / 2, 2)} J K⁻¹`, `${sg(0.5 * R * 2, 2)} J K⁻¹`],
    sol: `For a reversible isothermal expansion q_rev = nRT ln(V₂/V₁), so ΔS = q_rev/T = nR ln(V₂/V₁) = 0.50 × 8.314 × ln 2 = ${f2(s)} J K⁻¹ — option (@K).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => near(0.5 * 8.314 * Math.LN2, 2.881, 0.001) || 'isoexp-mcq');
add('thermal-mcq', mcq({
  stem: 'The "thermal death" of the universe is the predicted final state in which:',
  right: 'the entropy of the universe has reached its maximum and temperature is uniform, so no work can be obtained from heat',
  wrong: ['the entropy of the universe has fallen to zero', 'all the energy of the universe has been destroyed', 'every reaction has been converted completely into its products'],
  sol: 'Since the entropy of the universe increases in every spontaneous change, it tends to a maximum. At that stage temperature is the same everywhere, no heat flows, and no heat engine can work — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('entropy-order-mcq', mcq({
  stem: `The standard molar entropies (J K⁻¹ mol⁻¹) at 298 K are diamond ${S0.diamond}, graphite ${S0.C}, liquid water ${S0.H2Ol} and steam ${S0.H2Og}. The order of increasing entropy is:`,
  right: 'diamond < graphite < liquid water < steam',
  wrong: ['steam < liquid water < graphite < diamond', 'graphite < diamond < steam < liquid water', 'liquid water < steam < diamond < graphite'],
  sol: 'Entropy rises with the freedom of motion of the particles: a rigid, compact crystal (diamond) is the most ordered, then graphite, then the liquid, with the gas the most disordered — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ds-vap-num', (() => {
  const s = dsTrans('acetVap');
  return num({
    stem: `Propanone (acetone) boils at ${TRANS.acetVap.T} K under 1 atm and its enthalpy of vaporisation is ${TRANS.acetVap.H} kJ mol⁻¹. Calculate the entropy of vaporisation, in J K⁻¹ mol⁻¹.`,
    value: Number(f1(s)), tol: 0.1, unit: 'J K⁻¹ mol⁻¹',
    sol: r`At the boiling point the change is reversible: $\Delta S = \dfrac{q_{rev}}{T} = \dfrac{29\,100\ \text{J mol}^{-1}}{329.4\ \text{K}} = ${f1(s)}$ J K⁻¹ mol⁻¹.`,
    scheme: [['ΔS = ΔvapH / T with ΔH in J', 1], ['88.3 J K⁻¹ mol⁻¹', 1]],
    marks: 2, d: 2, c: 'understanding', t: [2],
  });
})(), (q) => near(29100 / 329.4, 88.34, 0.001) && q.answer.value === 88.3 || 'ds-vap-num');
add('dsfus-num', (() => {
  const s = dsTrans('hgFus');
  return num({
    stem: `Mercury freezes at ${TRANS.hgFus.T} K and the enthalpy of fusion is ${TRANS.hgFus.H} kJ mol⁻¹. Calculate the entropy of fusion in J K⁻¹ mol⁻¹.`,
    value: Number(f2(s)), tol: 0.02, unit: 'J K⁻¹ mol⁻¹',
    sol: r`$\Delta S = \dfrac{\Delta_{fus}H}{T} = \dfrac{2290}{234.3} = ${f2(s)}$ J K⁻¹ mol⁻¹.`,
    scheme: [['ΔH converted to J mol⁻¹', 0.5], ['9.77 J K⁻¹ mol⁻¹', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [2],
  });
})(), (q) => near(2290 / 234.3, 9.773, 0.001) && q.answer.value === 9.77 || 'dsfus-num');
add('isoexp-num', (() => {
  const s = dsIsoExp(3.0, 5, 25) ;
  return num({
    stem: 'A chemist lets 3.0 mol of an ideal gas expand isothermally and reversibly at 350 K from 5.0 L to 25.0 L. Calculate the entropy change of the gas in J K⁻¹ (R = 8.314 J K⁻¹ mol⁻¹).',
    value: Number(f1(s)), tol: 0.2, unit: 'J K⁻¹',
    sol: r`$\Delta S = nR\ln\dfrac{V_2}{V_1} = 3.0 \times 8.314 \times \ln 5 = 3.0 \times 8.314 \times ${f3(Math.log(5))} \approx ${f1(s)}$ J K⁻¹.`,
    scheme: [['ΔS = nR ln(V₂/V₁)', 1], ['ln 5 = 1.609 and 40.1 J K⁻¹', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(3 * 8.314 * Math.log(5), 40.14, 0.001) && q.answer.value === 40.1 || 'isoexp-num');
add('entropy-fill', fill({
  stem: 'The SI unit of molar entropy is ___.',
  acc: [['J K⁻¹ mol⁻¹', 'J K-1 mol-1', 'J/K/mol', 'J/(K mol)', 'JK⁻¹mol⁻¹']],
  sol: 'Entropy change = heat / temperature, so the unit of entropy is J K⁻¹ and of molar entropy J K⁻¹ mol⁻¹.',
  d: 1, c: 'recall', t: [2],
}));
add('entropy-tf', tf({
  stem: 'The entropy change of a system is equal to the heat actually absorbed, divided by the temperature, for any process, reversible or irreversible.',
  key: 'f',
  sol: 'False. ΔS = q_rev / T: the heat must be the heat absorbed in a reversible path between the same states; for an irreversible change q/T is smaller than ΔS.',
  d: 2, c: 'understanding', t: [2],
}));
add('ice-ar', ar({
  a: 'The entropy of vaporisation of water at 373 K is about 109 J K⁻¹ mol⁻¹.',
  r: 'Water vapour in the atmosphere is a greenhouse gas that absorbs infrared radiation.',
  key: 'b',
  sol: 'Both statements are true. The value follows from ΔvapS = ΔvapH / T = 40 700 / 373.15 ≈ 109 J K⁻¹ mol⁻¹; the greenhouse behaviour of water vapour has nothing to do with it — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('entropy-short2', short({
  marks: 2,
  stem: 'Define entropy and give its SI unit. Predict, with a reason, the sign of ΔS when a crystal of sodium chloride dissolves in water.',
  model: 'Entropy is a thermodynamic state function that measures the disorder (randomness) of a system; for a reversible change ΔS = q_rev / T, with the unit J K⁻¹. When NaCl dissolves, the ordered crystal lattice breaks up into freely moving hydrated ions, so the disorder increases and ΔS is positive.',
  sol: 'Measure of disorder, J K⁻¹; ΔS positive (ordered lattice → free ions).',
  scheme: [['Definition and unit', 1], ['ΔS positive with the reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('signs-short2', short({
  marks: 2,
  stem: String.raw`Predict the sign of ΔS for (a) the freezing of water, $\ce{H2O(l) -> H2O(s)}$, and (b) the decomposition $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, giving a reason in each case.`,
  model: String.raw`(a) ΔS is negative: the molecules go from the free motion of the liquid into a fixed, ordered lattice in ice, so the disorder falls. (b) ΔS is positive: a gas is produced from solids, and the gas has far more freedom of motion.`,
  sol: '(a) negative (more order); (b) positive (gas formed).',
  scheme: [['(a) Negative with reason', 1], ['(b) Positive with reason (gas formed)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('deltaS-short2', (() => {
  const s = 2 * sFus;
  return short({
    marks: 2,
    stem: 'A chemist melts 36 g of ice (M = 18 g mol⁻¹) at 273.15 K. The enthalpy of fusion of ice is 6.01 kJ mol⁻¹. Calculate the entropy change of the water.',
    model: `Moles of ice = 36 / 18 = 2. Heat absorbed reversibly = 2 × 6010 = 12 020 J. ΔS = q_rev / T = 12 020 / 273.15 = ${f1(s)} J K⁻¹ (that is, 22.0 J K⁻¹ for each mole).`,
    sol: `${f1(s)} J K⁻¹.`,
    scheme: [['q = 12 020 J for 2 mol', 1], [`ΔS = q / T = ${f1(s)} J K⁻¹`, 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near((2 * 6010) / 273.15, 44.0, 0.002) || 'deltaS-short2');
add('thermal-short2', short({
  marks: 2,
  stem: 'What is meant by the "thermal death" of the universe, and on what law is the prediction based?',
  model: 'Thermal death is the predicted end state in which the entropy of the universe has reached its maximum value: temperature is uniform everywhere, no heat can flow, and no work can be got from heat, so all natural change stops. It is based on the second law, which says that the entropy of the universe increases in every spontaneous process.',
  sol: 'Maximum entropy, uniform temperature, no work obtainable; second law.',
  scheme: [['Maximum entropy, uniform temperature, no further change', 1], ['Based on the second law: entropy of the universe increases', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('univ-short3', (() => {
  const surr = -6010 / 283;
  const tot = 22.0 + surr;
  return short({
    marks: 3,
    stem: 'One mole of ice at 273 K melts in a room at 283 K. The entropy change of the water (the system) is +22.0 J K⁻¹ and the heat taken from the room is 6010 J. Calculate the entropy change of the surroundings and of the universe, and state whether melting is spontaneous.',
    model: `ΔS(surroundings) = −q / T = −6010 / 283 = ${sg(surr, 2)} J K⁻¹. ΔS(universe) = ΔS(system) + ΔS(surroundings) = +22.0 + (${sg(surr, 2)}) = ${sg(tot, 2)} J K⁻¹. It is positive, so melting is spontaneous at 283 K.`,
    sol: `ΔS(surroundings) = ${sg(surr, 2)} J K⁻¹; ΔS(universe) = ${sg(tot, 2)} J K⁻¹; spontaneous.`,
    scheme: [[`ΔS(surroundings) = ${sg(surr, 2)} J K⁻¹`, 1], [`ΔS(universe) = ${sg(tot, 2)} J K⁻¹`, 1], ['Positive, so spontaneous', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(22.0 - 6010 / 283, 0.763, 0.01) || 'univ-short3');
add('stdS-short3', (() => {
  const s = RX.haber.s;
  return short({
    marks: 3,
    stem: String.raw`Use the standard entropies S° (J K⁻¹ mol⁻¹): N₂ 191.6, H₂ 130.7, NH₃ 192.5 to calculate ΔS° for $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, and explain the sign of the answer.`,
    model: String.raw`ΔS° = ΣS°(products) − ΣS°(reactants) = 2(192.5) − [191.6 + 3(130.7)] = 385.0 − 583.7 = ${tx(s)} J K⁻¹ mol⁻¹. It is negative because four moles of gas change to two moles of gas, so there is less disorder in the product.`,
    sol: `ΔS° = ${tx(s)} J K⁻¹ mol⁻¹; negative as the number of gas moles falls.`,
    scheme: [['ΣS° products 385.0 and reactants 583.7', 1.5], [`ΔS° = ${sg(s)} J K⁻¹ mol⁻¹`, 0.5], ['Fall in moles of gas, so less disorder', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(2 * 192.5 - (191.6 + 3 * 130.7), -198.7, 0.001) || 'stdS3');
add('entropy-short3', (() => {
  const d = S0.H2Og - S0.H2Ol;
  return short({
    marks: 3,
    stem: 'The standard molar entropies of liquid water and steam at 298 K are 69.9 and 188.8 J K⁻¹ mol⁻¹. Calculate ΔS° for H₂O(l) → H₂O(g) at 298 K, and explain why the entropy of a gas is so much greater than that of the same substance as a liquid.',
    model: `ΔS° = 188.8 − 69.9 = ${f1(d)} J K⁻¹ mol⁻¹. In the liquid the molecules are close together with limited freedom of motion; in the gas they are far apart and move freely through a very much larger volume, so the number of possible arrangements, and hence the disorder, is far greater.`,
    sol: `ΔS° = ${f1(d)} J K⁻¹ mol⁻¹.`,
    scheme: [['Subtraction of S° values', 1], [`${f1(d)} J K⁻¹ mol⁻¹`, 0.5], ['Greater freedom of motion and more arrangements in the gas', 1.5]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(188.8 - 69.9, 118.9, 0.001) || 'entropy3');
add('spont-long', (() => {
  const a = -2000 / 400;
  const b = 2000 / 300;
  const t = a + b;
  return long({
    stem: `(a) Explain, with an example, why the first law of thermodynamics is inadequate to predict the direction of a change. [2]

(b) When 2000 J of heat flows from a hot body at 400 K to a cold body at 300 K, calculate the entropy change of each body and of the two together (the bodies are large enough for the temperatures to stay constant), and say what the sign of the total shows. [3]`,
    model: `(a) The first law only demands that energy is conserved. Heat flowing from a cold body to a hot body would conserve energy just as well as the reverse, yet only the hot-to-cold direction is observed; similarly ice melts above 273 K although it absorbs heat. The first law gives no direction, so a second criterion (entropy) is needed.

(b) ΔS(hot) = −2000 / 400 = ${f2(a)} J K⁻¹; ΔS(cold) = +2000 / 300 = +${f2(b)} J K⁻¹. ΔS(total) = ${f2(a)} + ${f2(b)} = +${f2(t)} J K⁻¹. The total is positive, so the heat flow is spontaneous, as observed.`,
    sol: `ΔS(hot) = ${f2(a)}; ΔS(cold) = +${f2(b)}; total = +${f2(t)} J K⁻¹.`,
    scheme: [['(a) First law gives no direction', 1], ['(a) Example (heat flow or melting of ice)', 1], ['(b) ΔS(hot) = −5.00 J K⁻¹', 1], ['(b) ΔS(cold) = +6.67 J K⁻¹ and total +1.67 J K⁻¹', 1], ['(b) Positive total: spontaneous', 1]],
    d: 3, c: 'application', t: [1, 2],
  });
})(), () => near(-5 + 2000 / 300, 1.667, 0.002) || 'spont-long');
add('entropy-long', (() => {
  const f = sFus;
  const v = dsTrans('waterVap');
  return long({
    stem: `(a) Define entropy, and state why it is called a state function. [2]

(b) Calculate the entropy of fusion of ice (ΔfusH = 6.01 kJ mol⁻¹ at 273.15 K) and the entropy of vaporisation of water (ΔvapH = 40.7 kJ mol⁻¹ at 373.15 K), and explain why the second is so much larger. [3]`,
    model: `(a) Entropy is a measure of the disorder of a system; for a reversible process ΔS = q_rev / T. It is a state function because its change depends only on the initial and final states of the system, not on the path.

(b) ΔS(fusion) = 6010 / 273.15 = ${f1(f)} J K⁻¹ mol⁻¹; ΔS(vaporisation) = 40 700 / 373.15 = ${f1(v)} J K⁻¹ mol⁻¹. On melting, the molecules remain close together and gain only some freedom; on vaporisation they become completely free and spread through a much larger volume, so the increase in disorder is about five times greater.`,
    sol: `ΔS(fusion) = ${f1(f)}; ΔS(vaporisation) = ${f1(v)} J K⁻¹ mol⁻¹.`,
    scheme: [['(a) Measure of disorder; ΔS = q_rev/T', 1], ['(a) State function: depends on initial and final states only', 1], [`(b) ${f1(f)} and ${f1(v)} J K⁻¹ mol⁻¹`, 2], ['(b) Gas has far more freedom than liquid', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(6010 / 273.15, 22.0, 0.002) && near(40700 / 373.15, 109.07, 0.001) || 'entropy-long');

// ================================================================ t03 Gibbs and Helmholtz free energy
add('dG-crit-mcq', mcq({
  stem: 'At constant temperature and pressure, a process is spontaneous when:',
  right: 'ΔG is negative',
  wrong: ['ΔG is positive', 'ΔH is negative, whatever the value of ΔS', 'ΔS of the system alone is positive, whatever the value of ΔH'],
  sol: 'The Gibbs energy criterion is ΔG = ΔH − TΔS < 0 at constant T and p. Neither the sign of ΔH alone nor that of ΔS(system) alone decides the direction — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('sign-table-mcq', mcq({
  stem: 'Hydrogen peroxide solution in a pharmacy bottle decomposes slowly: 2H₂O₂(l) → 2H₂O(l) + O₂(g), with ΔH = −196 kJ and ΔS = +126 J K⁻¹ (both illustrative). Using ΔG = ΔH − TΔS, the decomposition is spontaneous:',
  right: 'at all temperatures, since ΔH is negative and ΔS positive',
  wrong: ['only at high temperatures', 'only at low temperatures', 'at no temperature'],
  sol: 'With ΔH < 0 and ΔS > 0, the term −TΔS is also negative, so ΔG = −196 − T(0.126) is negative at every temperature. (Spontaneous does not mean fast: the bottle keeps because the rate is slow) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cross-mcq', (() => {
  const x = RX.NO.Tc;
  return mcq({
    stem: String.raw`For $\ce{2NO(g) + O2(g) -> 2NO2(g)}$, ΔH = ${tx(RX.NO.h)} kJ and ΔS = ${tx(RX.NO.s)} J K⁻¹ (taken as constant). The reaction is spontaneous only:`,
    right: `below about ${f0(Math.round(x / 10) * 10)} K`,
    wrong: [`above about ${f0(Math.round(x / 10) * 10)} K`, `below about ${f2(-RX.NO.s / RX.NO.h)} K`, 'at all temperatures'],
    sol: `ΔG = ΔH − TΔS = 0 at T = ΔH/ΔS = (−114 200 J)/(−146.5 J K⁻¹) = ${f0(x)} K. Both ΔH and ΔS are negative, so −TΔS is positive and grows with T: ΔG is negative only below this temperature — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(114200 / 146.5, 779.5, 0.001) || 'cross-mcq');
add('rel-mcq', (() => {
  const dn = 1;
  const pv = (dn * R * 300) / 1000;
  const dA = 4.8 - pv;
  return mcq({
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$ at 300 K, ΔG = +4.8 kJ (given). Using G = A + pV, so that ΔG = ΔA + Δn_g RT for ideal gases, ΔA is:`,
    right: `+${f1(dA)} kJ`,
    wrong: [`+${f1(4.8 + pv)} kJ`, `−${f1(dA)} kJ`, '+4.8 kJ'],
    sol: `Δn_g = 2 − 1 = +1, so Δ(pV) = Δn_g RT = 8.314 × 300 / 1000 = ${f2(pv)} kJ. ΔA = ΔG − Δ(pV) = 4.8 − ${f2(pv)} = ${f1(dA)} kJ ≈ +${f1(dA)} kJ — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(4.8 - (8.314 * 300) / 1000, 2.306, 0.002) || 'rel-mcq');
add('helm-mcq', mcq({
  stem: 'The Helmholtz energy is defined as A = U − TS. At constant temperature and constant volume a process is spontaneous when:',
  right: 'ΔA is negative',
  wrong: ['ΔA is positive', 'ΔA is zero', 'ΔU is positive'],
  sol: 'At constant T and V the criterion of spontaneity is ΔA < 0 (the analogue of ΔG < 0 at constant T and p); ΔA = 0 at equilibrium — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('dG298-mcq', (() => {
  const g = RX.water.g298;
  return mcq({
    stem: String.raw`For $\ce{2H2(g) + O2(g) -> 2H2O(l)}$ at 298 K, ΔH° = ${tx(RX.water.h)} kJ and ΔS° = ${tx(RX.water.s)} J K⁻¹. The value of ΔG° is:`,
    right: `${sg(g)} kJ`,
    wrong: [`${sg(RX.water.h + (298 * RX.water.s) / 1000)} kJ`, `${sg(RX.water.h - RX.water.s)} kJ`, `+${f1(-g)} kJ`],
    sol: `ΔG° = ΔH° − TΔS° = −571.6 − 298 × (−326.7 / 1000) = −571.6 + ${f1((298 * 326.7) / 1000)} = ${sg(g)} kJ. The ΔS term must be converted to kJ (÷ 1000) — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(-571.6 + (298 * 326.7) / 1000, -474.2, 0.001) || 'dG298-mcq');
add('gibbs-nonexp-mcq', mcq({
  stem: 'At constant temperature and pressure, the decrease in the Gibbs energy, −ΔG, of a system measures:',
  right: 'the maximum useful (non-expansion) work that can be obtained from the process',
  wrong: ['the heat absorbed by the system', 'the work of expansion done against the atmosphere', 'the entropy change of the surroundings only'],
  sol: 'G = H − TS; at constant T and p, −ΔG equals the maximum net work obtainable other than pV work (for example electrical work from a cell) — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('dg-num', (() => {
  const g = RX.N2O4.g298;
  return num({
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$ at 298 K, ΔH° = +57.2 kJ and ΔS° = +175.9 J K⁻¹ (from tables). Calculate ΔG° in kJ, and decide whether the dissociation is spontaneous at 298 K.`,
    value: Number(f2(g)), tol: 0.05, unit: 'kJ',
    sol: r`$\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ = 57.2 - 298 \times 0.1759 = 57.2 - ${f2((298 * 175.9) / 1000)} = ${f2(g)}$ kJ. Positive, so not spontaneous at 298 K.`,
    scheme: [['TΔS = 52.42 kJ with ΔS in kJ', 1], ['ΔG° = +4.78 kJ; not spontaneous', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(57.2 - (298 * 175.9) / 1000, 4.78, 0.003) && q.answer.value === 4.78 || 'dg-num');
add('cross-num', (() => {
  const t = RX.MgCO3.Tc;
  return num({
    stem: String.raw`Magnesium carbonate decomposes: $\ce{MgCO3(s) -> MgO(s) + CO2(g)}$, with ΔH = +100.7 kJ and ΔS = +175.0 J K⁻¹ (both from tables, taken as independent of temperature). Calculate the temperature, in K, above which the decomposition becomes spontaneous.`,
    value: Number(f0(t)), tol: 2, unit: 'K',
    sol: r`At the crossover $\Delta G = 0$, so $T = \dfrac{\Delta H}{\Delta S} = \dfrac{100\,700}{175.0} = ${f1(t)} \approx ${f0(t)}$ K.`,
    scheme: [['ΔG = 0, T = ΔH/ΔS with ΔH in J', 1], ['About 575 K', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(100700 / 175.0, 575.4, 0.001) && q.answer.value === 575 || 'cross-num');
add('gibbs-fill', fill({
  stem: 'The thermodynamic function G = H − TS is called the ___ free energy.',
  acc: [['Gibbs', 'gibbs']],
  sol: 'G = H − TS is the Gibbs free energy (or Gibbs energy); the criterion of spontaneity at constant T and p is ΔG < 0.',
  d: 1, c: 'recall', t: [3],
}));
add('gibbs-ar', ar({
  a: 'At constant temperature and pressure, a process is spontaneous if ΔG is negative.',
  r: 'ΔG = −TΔS(total), where ΔS(total) is the entropy change of the system and surroundings together.',
  key: 'a',
  sol: 'Both statements are true. ΔS(surroundings) = −ΔH/T, so TΔS(total) = TΔS − ΔH = −ΔG; ΔG < 0 therefore means ΔS(total) > 0, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('signs-match', match({
  stem: 'Match the signs of ΔH and ΔS of a reaction with its spontaneity according to ΔG = ΔH − TΔS.',
  pairs: [['ΔH negative, ΔS positive', 'spontaneous at all temperatures'], ['ΔH positive, ΔS negative', 'non-spontaneous at all temperatures'], ['ΔH negative, ΔS negative', 'spontaneous at low temperatures only'], ['ΔH positive, ΔS positive', 'spontaneous at high temperatures only']],
  order: [3, 0, 2, 1],
  sol: '(−, +): ΔG always negative → s; (+, −): ΔG always positive → p; (−, −): spontaneous below ΔH/ΔS → r; (+, +): spontaneous above ΔH/ΔS → q.',
  d: 2, c: 'understanding', t: [3],
}));
add('func-match', match({
  stem: 'Match each thermodynamic quantity with its defining expression.',
  pairs: [['Gibbs energy, G', 'H − TS'], ['Helmholtz energy, A', 'U − TS'], ['Entropy change of a reversible change, ΔS', 'q_rev / T'], ['G in terms of A', 'A + pV']],
  order: [1, 3, 0, 2],
  sol: 'G = H − TS (q); A = U − TS (s); ΔS = q_rev/T (p); G = A + pV (r).',
  d: 1, c: 'recall', t: [2, 3],
}));
add('helmholtz-short2', short({
  marks: 2,
  stem: 'Write the expression that defines the Helmholtz free energy A, and state the criterion of spontaneity in terms of ΔA at constant temperature and volume.',
  model: 'A = U − TS, where U is the internal energy, T the temperature and S the entropy. At constant temperature and volume a process is spontaneous if ΔA < 0 (and at equilibrium ΔA = 0); −ΔA is the maximum work obtainable from the system at constant temperature.',
  sol: 'A = U − TS; spontaneous if ΔA < 0 at constant T and V.',
  scheme: [['A = U − TS', 1], ['ΔA < 0 for spontaneity at constant T and V', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('relation-short2', short({
  marks: 2,
  stem: 'Starting from G = H − TS and H = U + pV, show that the Gibbs energy G and the Helmholtz energy A are related by G = A + pV.',
  model: 'G = H − TS = (U + pV) − TS = (U − TS) + pV. Since A = U − TS, G = A + pV. For a change at constant temperature, ΔG = ΔA + Δ(pV).',
  sol: 'G = U + pV − TS = A + pV.',
  scheme: [['Substitute H = U + pV in G = H − TS', 1], ['Group U − TS = A, giving G = A + pV', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cross-short3', (() => {
  const h = RX.N2O4.h;
  const s = RX.N2O4.s;
  return short({
    marks: 3,
    stem: String.raw`Using ΔfH° (N₂O₄ +9.2, NO₂ +33.2 kJ mol⁻¹) and S° (N₂O₄ 304.3, NO₂ 240.1 J K⁻¹ mol⁻¹), calculate ΔH° and ΔS° for $\ce{N2O4(g) -> 2NO2(g)}$, and the temperature above which the dissociation is spontaneous.`,
    model: String.raw`ΔH° = 2(33.2) − 9.2 = +${f1(h)} kJ. ΔS° = 2(240.1) − 304.3 = +${f1(s)} J K⁻¹. At the crossover ΔG = 0: T = ΔH/ΔS = 57 200 / ${f1(s)} = ${f0(RX.N2O4.Tc)} K. Both ΔH and ΔS are positive, so the dissociation is spontaneous above about 325 K.`,
    sol: `ΔH° = +${f1(h)} kJ; ΔS° = +${f1(s)} J K⁻¹; T = ${f0(RX.N2O4.Tc)} K.`,
    scheme: [[`ΔH° = +${f1(h)} kJ`, 0.5], [`ΔS° = +${f1(s)} J K⁻¹`, 0.5], [`T = ΔH/ΔS = ${f0(RX.N2O4.Tc)} K`, 1], ['Spontaneous above this temperature (ΔH, ΔS positive)', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(2 * 33.2 - 9.2, 57.2, 0.001) && near(2 * 240.1 - 304.3, 175.9, 0.001) && near(57200 / 175.9, 325.2, 0.001) || 'cross3');
add('h2o2-short3', (() => {
  const g = -196.0 - (298 * 125.8) / 1000;
  return short({
    marks: 3,
    stem: 'The decomposition 2H₂O₂(l) → 2H₂O(l) + O₂(g) has ΔH = −196.0 kJ and ΔS = +125.8 J K⁻¹ (both illustrative). Explain why ΔS is positive, calculate ΔG at 298 K, and say whether the reaction can be made non-spontaneous by changing the temperature.',
    model: `ΔS is positive because a gas is formed from liquids, so the disorder increases. ΔG = ΔH − TΔS = −196.0 − 298 × 0.1258 = −196.0 − ${f1((298 * 125.8) / 1000)} = ${f1(g)} kJ. Since ΔH < 0 and ΔS > 0, ΔG is negative at every temperature, so no change of temperature makes the decomposition non-spontaneous (it may still be slow).`,
    sol: `ΔG = ${f1(g)} kJ at 298 K; negative at all temperatures.`,
    scheme: [['ΔS positive: gas formed', 1], [`ΔG = ${f1(g)} kJ`, 1], ['Negative at all T since ΔH < 0 and ΔS > 0', 1]],
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(-196.0 - (298 * 125.8) / 1000, -233.5, 0.001) || 'h2o2-3');
add('deltaG-short3', (() => {
  const gf = 2 * GF.NO2 - GF.N2O4;
  const g = RX.N2O4.g298;
  return short({
    marks: 3,
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$ at 298 K, find ΔG° in two ways: (i) from ΔG° = ΔH° − TΔS° with ΔH° = +57.2 kJ and ΔS° = +175.9 J K⁻¹; (ii) from ΔfG° (N₂O₄ +97.9, NO₂ +51.3 kJ mol⁻¹). Comment on the result.`,
    model: `(i) ΔG° = 57.2 − 298 × 0.1759 = 57.2 − ${f2((298 * 175.9) / 1000)} = +${f2(g)} kJ. (ii) ΔG° = 2(51.3) − 97.9 = +${f1(gf)} kJ. The two agree within rounding (about +4.7 to +4.8 kJ); the positive value shows that the dissociation is not spontaneous at 298 K, so N₂O₄ is the favoured form at room temperature.`,
    sol: `(i) +${f2(g)} kJ; (ii) +${f1(gf)} kJ; non-spontaneous at 298 K.`,
    scheme: [[`(i) ΔG° = +${f2(g)} kJ`, 1], [`(ii) ΔG° = +${f1(gf)} kJ`, 1], ['Agreement; positive so non-spontaneous at 298 K', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(2 * 51.3 - 97.9, 4.7, 0.001) && near(57.2 - (298 * 175.9) / 1000, 4.78, 0.003) || 'dG3');
add('water-short3', (() => {
  const g = RX.water.g298;
  return short({
    marks: 3,
    stem: String.raw`The formation of liquid water, $\ce{2H2(g) + O2(g) -> 2H2O(l)}$, has ΔH° = −571.6 kJ and ΔS° = −326.7 J K⁻¹ at 298 K. Although ΔS° is negative, the reaction is spontaneous once started. Calculate ΔG° and explain the paradox.`,
    model: `ΔG° = ΔH° − TΔS° = −571.6 − 298 × (−0.3267) = −571.6 + ${f1((298 * 326.7) / 1000)} = ${f1(g)} kJ. The negative ΔS° (three moles of gas become liquid) makes the −TΔS° term positive (+97.4 kJ), but it is far smaller than the large negative ΔH°, so ΔG° is strongly negative and the reaction is spontaneous.`,
    sol: `ΔG° = ${f1(g)} kJ; the large negative ΔH° outweighs −TΔS°.`,
    scheme: [['−TΔS° = +97.4 kJ', 1], [`ΔG° = ${f1(g)} kJ`, 1], ['ΔH° dominates the entropy term', 1]],
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(-571.6 + (298 * 326.7) / 1000, -474.2, 0.001) || 'water3');
add('gibbs-long', (() => {
  const pv = (-1 * R * 300) / 1000;
  const dA = -70.0 - pv;
  return long({
    stem: `(a) Define the Gibbs free energy G and the Helmholtz free energy A, and show that G = A + pV. [3]

(b) For 2SO₂(g) + O₂(g) → 2SO₃(g) at 300 K, ΔG = −70.0 kJ (given). Calculate ΔA, treating the gases as ideal (R = 8.314 J K⁻¹ mol⁻¹). [2]`,
    model: `(a) G = H − TS and A = U − TS. Since H = U + pV, G = U + pV − TS = (U − TS) + pV = A + pV.

(b) Δn_g = 2 − 3 = −1, so Δ(pV) = Δn_g RT = −1 × 8.314 × 300 = ${f0(pv * 1000)} J = ${f2(pv)} kJ. ΔA = ΔG − Δ(pV) = −70.0 − (${f2(pv)}) = ${f1(dA)} kJ.`,
    sol: `G = A + pV; ΔA = ${f1(dA)} kJ.`,
    scheme: [['(a) G = H − TS', 1], ['(a) A = U − TS', 0.5], ['(a) G = A + pV shown', 1.5], ['(b) Δ(pV) = Δn_g RT = −2.49 kJ', 1], [`(b) ΔA = ${f1(dA)} kJ`, 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(-70.0 + (8.314 * 300) / 1000, -67.5, 0.002) || 'gibbs-long');
add('mgco3-long', (() => {
  const { h, s, Tc: t, g298 } = RX.MgCO3;
  return long({
    stem: String.raw`Magnesium carbonate decomposes on heating: $\ce{MgCO3(s) -> MgO(s) + CO2(g)}$.

(a) Calculate ΔH° and ΔS° from ΔfH° (MgCO₃ −1095.8, MgO −601.6, CO₂ −393.5 kJ mol⁻¹) and S° (MgCO₃ 65.7, MgO 26.9, CO₂ 213.8 J K⁻¹ mol⁻¹). [3]

(b) Calculate ΔG° at 298 K and the temperature above which the decomposition is spontaneous. [2]`,
    model: String.raw`(a) ΔH° = (−601.6 − 393.5) − (−1095.8) = +${f1(h)} kJ. ΔS° = (26.9 + 213.8) − 65.7 = +${f1(s)} J K⁻¹.

(b) ΔG° = 100.7 − 298 × 0.1750 = 100.7 − ${f2((298 * s) / 1000)} = +${f1(g298)} kJ, positive, so MgCO₃ is stable at 298 K. At the crossover ΔG = 0: T = 100 700 / ${f1(s)} = ${f0(t)} K, so the decomposition is spontaneous above about 575 K.`,
    sol: `ΔH° = +${f1(h)} kJ; ΔS° = +${f1(s)} J K⁻¹; ΔG° = +${f1(g298)} kJ; T = ${f0(t)} K.`,
    scheme: [[`(a) ΔH° = +${f1(h)} kJ`, 1.5], [`(a) ΔS° = +${f1(s)} J K⁻¹`, 1.5], [`(b) ΔG° = +${f1(g298)} kJ at 298 K`, 1], [`(b) T = ${f0(t)} K`, 1]],
    d: 4, c: 'application', t: [3],
  });
})(), () => near(100.7 - (298 * 175.0) / 1000, 48.55, 0.003) && near(100700 / 175.0, 575.4, 0.001) || 'mgco3-long');

// ================================================================ t04 ΔG° and K; third law
add('k-mcq', mcq({
  stem: 'For a reaction at 298 K, the standard Gibbs energy change ΔG° is negative. The equilibrium constant of the reaction is therefore:',
  right: 'greater than 1',
  wrong: ['less than 1', 'equal to 1', 'equal to zero'],
  sol: 'ΔG° = −2.303 RT log K. A negative ΔG° makes log K positive, so K > 1 and the products are favoured at equilibrium — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('kcalc-mcq', (() => {
  const lk = logK(22.8);
  return mcq({
    stem: 'A reaction has ΔG° = +22.8 kJ mol⁻¹ at 298 K. Using ΔG° = −2.303 RT log K (R = 8.314 J K⁻¹ mol⁻¹), the equilibrium constant is about:',
    right: '1.0 × 10⁻⁴',
    wrong: ['1.0 × 10⁴', '4.0 × 10⁻⁴', '1.0 × 10⁻²'],
    sol: `log K = −ΔG° / (2.303 RT) = −22 800 / (2.303 × 8.314 × 298) = −22 800 / 5706 = ${f2(lk)}, so K ≈ 10⁻⁴ = 1.0 × 10⁻⁴ — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => near(logK(22.8), -4.0, 0.002) || 'kcalc-mcq');
add('third-mcq', mcq({
  stem: 'Which statement is the third law of thermodynamics?',
  right: 'the entropy of a perfect crystalline substance is zero at the absolute zero of temperature',
  wrong: ['the entropy of every substance is zero at 273 K', 'the entropy of the universe remains constant', 'the entropy of a gas is zero at 0 °C and 1 atm'],
  sol: 'The third law states that the entropy of a perfect crystal is zero at 0 K, which allows absolute entropies to be tabulated — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ktemp-mcq', (() => {
  const g = RX.N2O4.h - (350 * RX.N2O4.s) / 1000;
  const lk = logK(g, 350);
  return mcq({
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$, ΔH° = +57.2 kJ and ΔS° = +175.9 J K⁻¹ (taken as constant). The equilibrium constant at 350 K is about:`,
    right: `${f1(10 ** lk)}`,
    wrong: [`${f2(10 ** -lk)}`, `${f1(lk)}`, `${f1(10 ** lk * 2)}`],
    sol: `ΔG° = 57.2 − 350 × 0.1759 = ${f2(g)} kJ. log K = ${f2(-g)} / (2.303 × 8.314 × 350 / 1000) = ${f2(-g)} / ${f2(RT2303(350))} = ${f3(lk)}, so K = ${f1(10 ** lk)} — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => near(10 ** logK(57.2 - (350 * 175.9) / 1000, 350), 4.49, 0.01) || 'ktemp');
add('dgk-num', (() => {
  const lk = logK(-28.5);
  return num({
    stem: 'The standard Gibbs energy change of a reaction at 298 K is −28.5 kJ mol⁻¹ (given). Calculate log K for the reaction (R = 8.314 J K⁻¹ mol⁻¹).',
    value: Number(f2(lk)), tol: 0.02, unit: null,
    sol: r`$\log K = \dfrac{-\Delta G^\circ}{2.303\,RT} = \dfrac{28\,500}{2.303 \times 8.314 \times 298} = \dfrac{28\,500}{5706} = ${f2(lk)}$.`,
    scheme: [['2.303 RT = 5706 J mol⁻¹', 0.5], ['log K = 4.99 (K ≈ 10⁵)', 0.5]],
    marks: 1, d: 2, c: 'understanding', t: [4],
  });
})(), (q) => near(logK(-28.5), 4.995, 0.001) && Math.abs(q.answer.value - 4.99) < 0.021 || 'dgk-num');
add('third-fill', fill({
  stem: 'According to the third law, the entropy of a perfect crystalline substance is zero at ___ K.',
  acc: [['0', 'zero', 'Zero']],
  sol: 'The third law states that the entropy of a perfect crystal is zero at the absolute zero, 0 K.',
  d: 1, c: 'recall', t: [4],
}));
add('third-tf', tf({
  stem: 'The entropy of a perfect crystal of a pure substance is zero at 0 K, and it increases as the temperature is raised.',
  key: 't',
  sol: 'True. This is the third law; as the temperature rises the particles gain motion and the entropy increases, with further jumps at melting and boiling.',
  d: 1, c: 'recall', t: [4],
}));
add('third-ar', ar({
  a: 'The entropy of a perfect crystal is zero at room temperature.',
  r: 'The entropy of a pure substance decreases as its temperature is raised.',
  key: 'd',
  sol: 'A is false: the entropy of a perfect crystal is zero only at 0 K. R is false: entropy increases with temperature as the thermal motion grows — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('dG-ar', ar({
  a: 'The equilibrium constant of a reaction with ΔG° = 0 is equal to 1.',
  r: 'At equilibrium the standard Gibbs energy change ΔG° of every reaction is zero.',
  key: 'c',
  sol: 'A is true: ΔG° = 0 gives log K = 0, so K = 1. R is false: at equilibrium it is ΔG (not ΔG°) that is zero; ΔG° is zero only when K = 1 — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('third-short2', short({
  marks: 2,
  stem: 'State the third law of thermodynamics and say what it allows chemists to tabulate.',
  model: 'The third law states that the entropy of a perfect crystalline substance is zero at the absolute zero of temperature. It provides a reference point, so the absolute (standard molar) entropies of substances at other temperatures can be calculated and tabulated.',
  sol: 'S = 0 for a perfect crystal at 0 K; absolute entropies can be tabulated.',
  scheme: [['Statement of the third law', 1], ['Absolute entropies from this zero', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('dgk-short3', (() => {
  const g = -RT2303() * Math.log10(1.8e-5);
  return short({
    marks: 3,
    stem: 'The acid dissociation constant of ethanoic acid is 1.8 × 10⁻⁵ at 298 K. Calculate ΔG° for its ionisation in water (R = 8.314 J K⁻¹ mol⁻¹) and say what the sign tells you.',
    model: `ΔG° = −2.303 RT log K = −2.303 × 8.314 × 298 × log(1.8 × 10⁻⁵) = −5706 × (−4.745) = +${f0(g * 1000)} J mol⁻¹ ≈ +${f1(g)} kJ mol⁻¹. The positive sign means that the ionisation is not spontaneous from the standard state (K < 1): at equilibrium the acid is mostly un-ionised.`,
    sol: `ΔG° = +${f1(g)} kJ mol⁻¹; K < 1.`,
    scheme: [['2.303 RT = 5706 J mol⁻¹ and log K = −4.745', 1], [`ΔG° = +${f1(g)} kJ mol⁻¹`, 1], ['Positive: K < 1, mostly un-ionised', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(-RT2303() * Math.log10(1.8e-5), 27.07, 0.002) || 'dgk3');
add('k-short3', (() => {
  const g = RX.N2O4.g298;
  const lk = logK(g);
  return short({
    marks: 3,
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$ at 298 K, ΔG° = +4.78 kJ mol⁻¹. Calculate the equilibrium constant K (R = 8.314 J K⁻¹ mol⁻¹) and state which species predominates at equilibrium.`,
    model: `log K = −ΔG° / (2.303 RT) = −4780 / 5706 = ${f3(lk)}, so K = ${f2(10 ** lk)}. Since K < 1, the equilibrium mixture contains mainly N₂O₄ (the reactant).`,
    sol: `log K = ${f3(lk)}; K = ${f2(10 ** lk)}; N₂O₄ predominates.`,
    scheme: [['Substitution in log K = −ΔG°/(2.303 RT)', 1], [`log K = ${f3(lk)} and K = ${f2(10 ** lk)}`, 1], ['K < 1: N₂O₄ predominates', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(10 ** logK(4.78), 0.145, 0.01) || 'k3');
add('kt-short3', (() => {
  const g = RX.N2O4.h - (350 * RX.N2O4.s) / 1000;
  const lk = logK(g, 350);
  return short({
    marks: 3,
    stem: String.raw`For $\ce{N2O4(g) -> 2NO2(g)}$, ΔH° = +57.2 kJ and ΔS° = +175.9 J K⁻¹ (assumed constant). Calculate ΔG° and K at 350 K, and say how the position of equilibrium differs from that at 298 K (K = 0.15).`,
    model: `ΔG° = 57.2 − 350 × 0.1759 = ${f2(g)} kJ. log K = ${f2(-g)} / (2.303 × 8.314 × 350 / 1000) = ${f3(lk)}, so K = ${f1(10 ** lk)}. At 350 K, ΔG° is negative and K > 1, so NO₂ predominates; at 298 K, K < 1 and N₂O₄ predominates. The endothermic dissociation is favoured at the higher temperature.`,
    sol: `ΔG° = ${f2(g)} kJ; K = ${f1(10 ** lk)}; NO₂ favoured at 350 K.`,
    scheme: [[`ΔG° = ${f2(g)} kJ at 350 K`, 1], [`K = ${f1(10 ** lk)}`, 1], ['Comparison: NO₂ favoured at the higher temperature', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(10 ** logK(57.2 - (350 * 175.9) / 1000, 350), 4.49, 0.01) || 'kt3');
add('kcalc-long', (() => {
  const lk = logK(-17.1);
  return long({
    stem: `(a) Write the relation between the standard Gibbs energy change and the equilibrium constant, and state what a negative and a positive ΔG° imply for K. [2]

(b) A reaction in a laboratory has ΔG° = −17.1 kJ mol⁻¹ at 298 K (given). Calculate its equilibrium constant (R = 8.314 J K⁻¹ mol⁻¹). [3]`,
    model: `(a) ΔG° = −RT ln K = −2.303 RT log K. If ΔG° < 0, log K > 0 and K > 1 (products favoured); if ΔG° > 0, K < 1 (reactants favoured); if ΔG° = 0, K = 1.

(b) log K = 17 100 / (2.303 × 8.314 × 298) = 17 100 / 5706 = ${f2(lk)}, so K = 10^${f2(lk)} ≈ ${f0(10 ** lk)} ≈ 1.0 × 10³.`,
    sol: `log K = ${f2(lk)}; K ≈ 1.0 × 10³.`,
    scheme: [['(a) ΔG° = −2.303 RT log K', 1], ['(a) Meaning of negative and positive ΔG°', 1], ['(b) 2.303 RT = 5706 J mol⁻¹', 1], ['(b) log K = 3.00', 1], ['(b) K ≈ 1.0 × 10³', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(logK(-17.1), 2.997, 0.002) || 'kcalc-long');
add('third-long', (() => {
  const d = S0.H2Og - S0.H2Ol;
  return long({
    stem: `(a) State the third law of thermodynamics. [1]

(b) Using S° (liquid water 69.9, steam 188.8 J K⁻¹ mol⁻¹), calculate ΔS° for H₂O(l) → H₂O(g) at 298 K. [2]

(c) Explain why the third law lets us tabulate absolute entropies, although absolute enthalpies cannot be tabulated. [2]`,
    model: `(a) The entropy of a perfect crystalline substance is zero at the absolute zero of temperature.

(b) ΔS° = 188.8 − 69.9 = ${f1(d)} J K⁻¹ mol⁻¹ (positive: gas formed from liquid).

(c) The third law fixes a natural zero of entropy (S = 0 for a perfect crystal at 0 K), so S at any temperature can be found by adding up q_rev/T from 0 K. For enthalpy and internal energy there is no such natural zero, so only changes (ΔH) can be measured and tabulated.`,
    sol: `(b) ΔS° = ${f1(d)} J K⁻¹ mol⁻¹.`,
    scheme: [['(a) Third law stated', 1], ['(b) Subtraction setup', 1], [`(b) ${f1(d)} J K⁻¹ mol⁻¹`, 1], ['(c) Natural zero of entropy at 0 K', 1], ['(c) No such zero for H or U, so only ΔH can be measured', 1]],
    d: 3, c: 'understanding', t: [2, 4],
  });
})(), () => near(188.8 - 69.9, 118.9, 0.001) || 'third-long');
