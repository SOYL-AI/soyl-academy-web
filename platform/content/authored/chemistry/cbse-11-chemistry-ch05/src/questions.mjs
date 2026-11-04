// ch05 Chemical Thermodynamics — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d c a.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, dec, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const R = 8.314;
const L = 2.303;
const T298 = 298;
const j = (x, n = 4) => dec(x, n);

// ---------------------------------------------------------------- numbers (computed once, used in stems, solutions and checks)
// n1: reversible isothermal work
const n1 = { n: 0.5, T: 300, V1: 2.0, V2: 10.0 };
n1.w = -L * n1.n * R * n1.T * Math.log10(n1.V2 / n1.V1);
// n2: irreversible work
const n2 = { p: 1.8, V1: 2.5, V2: 7.0 };
n2.w = -n2.p * (n2.V2 - n2.V1) * 100;
// n3: ΔU of Haber
const n3 = { dH: 2 * -46.1, dn: -2 };
n3.dU = n3.dH - (n3.dn * R * T298) / 1000;
// n4: bomb calorimetry of ethanol
const n4 = { m: 0.8, M: 46.0, C: 11.0, dT: 2.15, dn: -1 };
n4.n = n4.m / n4.M;
n4.q = n4.C * n4.dT;
n4.dU = -n4.q / n4.n;
n4.dH = n4.dU + (n4.dn * R * T298) / 1000;
// n5: ΔfH of ethane from combustion data
const n5 = { cC: -393.5, cH: -285.8, cE: -1559.7 };
n5.f = 2 * n5.cC + 3 * n5.cH - n5.cE;
// n6: bond enthalpy, ethene + hydrogen
const n6 = { cc2: 611, hh: 436, cc1: 347, ch: 414 };
n6.dH = n6.cc2 + n6.hh - (n6.cc1 + 2 * n6.ch);
// n7: entropy of vaporisation of ethanol
const n7 = { dH: 38.6, T: 351, n: 2.0 };
n7.dS = (n7.n * n7.dH * 1000) / n7.T;
// n8: NH4Cl(s) -> NH3(g) + HCl(g)
const n8 = { fNH4Cl: -314.4, fNH3: -46.1, fHCl: -92.3, dS: 285 };
n8.dH = n8.fNH3 + n8.fHCl - n8.fNH4Cl;
n8.T = (n8.dH * 1000) / n8.dS;
n8.dG298 = n8.dH - (T298 * n8.dS) / 1000;
// n9: log K from ΔG°
const n9 = { dG: -32.8 };
n9.logK = (-n9.dG * 1000) / (L * R * T298);

// ---------------------------------------------------------------- t01 system, state functions
add('system-type-mcq', mcq({
  stem: 'A student seals a few millilitres of ethanol in a thick glass tube and warms it in a water bath. Heat flows in, but no ethanol can escape. The ethanol in the tube is best described as:',
  right: 'a closed system',
  wrong: ['an open system', 'an isolated system', 'an adiabatic surrounding'],
  sol: 'Energy (heat) crosses the boundary but matter does not, so it is a closed system — option (@K). An open system would also exchange matter; an isolated system would exchange nothing.',
  d: 1, c: 'application', t: [1],
}));
add('path-fn-mcq', mcq({
  stem: 'Which of the following quantities is a path function?',
  right: 'Heat absorbed by a gas in a change of state',
  wrong: ['Internal energy of the gas', 'Enthalpy of the gas', 'Entropy of the gas'],
  sol: 'U, H and S depend only on the state of the system. Heat depends on how the change is carried out, so it is a path function — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('intensive-mcq', mcq({
  stem: 'Which pair contains only intensive properties?',
  right: 'Density and molar volume',
  wrong: ['Mass and volume', 'Internal energy and enthalpy', 'Heat capacity and entropy'],
  sol: 'Density (mass ÷ volume) and molar volume (volume ÷ amount) are ratios of extensive properties, so they do not depend on the amount of substance — option (@K). The other pairs contain extensive quantities.',
  d: 2, c: 'understanding', t: [1],
}));
add('state-fn-ar', ar({
  a: 'For an ideal gas expanding isothermally, ΔU is zero even though work is done by the gas.',
  r: 'The internal energy of an ideal gas depends only on its temperature.',
  key: 'a',
  sol: 'Both are true. With no change in temperature there is no change in the internal energy of an ideal gas, so q = −w; R explains A — option (a).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('intensive-tf', tf({
  stem: 'Molar enthalpy of vaporisation is an extensive property because enthalpy is extensive.',
  key: 'f',
  sol: 'False. Enthalpy is extensive, but dividing it by the amount of substance gives a molar quantity, which is intensive.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 work, first law, enthalpy
add('first-law-mcq', mcq({
  stem: 'A piston does 250 J of work on a gas while 90 J of heat flows out of the gas to the surroundings. The change in internal energy of the gas is:',
  right: r`$+160\ \text{J}$`,
  wrong: [r`$+340\ \text{J}$`, r`$-160\ \text{J}$`, r`$-340\ \text{J}$`],
  sol: r`Work done on the gas is $w = +250$ J and heat lost is $q = -90$ J, so $\Delta U = q + w = -90 + 250 = +160$, in joules — option (@K). (@1) ignores that heat was lost, (@2) reverses the sign of the result and (@3) treats both terms as losses.`,
  d: 2, c: 'application', t: [2],
}), () => near(-90 + 250, 160) || 'dU');
add('free-exp-mcq', mcq({
  stem: 'One mole of an ideal gas expands isothermally into an evacuated container. For this change:',
  right: r`$w = 0,\ q = 0,\ \Delta U = 0$`,
  wrong: [r`$w < 0,\ q > 0,\ \Delta U = 0$`, r`$w = 0,\ q > 0,\ \Delta U > 0$`, r`$w < 0,\ q = 0,\ \Delta U < 0$`],
  sol: 'The gas pushes against zero external pressure, so w = 0. An ideal gas at constant temperature has ΔU = 0, hence q = −w = 0 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rev-irrev-mcq', mcq({
  stem: 'One mole of an ideal gas expands isothermally from 5 L to 20 L, first reversibly and then in one step against the final pressure. Which statement is correct?',
  right: 'The gas does more work, and absorbs more heat, in the reversible expansion.',
  wrong: ['The gas does more work in the irreversible expansion.', 'The work is the same, since the initial and final states are the same.', 'The internal energy changes by different amounts in the two expansions.'],
  sol: 'Work is a path function. The reversible path follows the isotherm, so its area under the p–V curve is the largest. Because ΔU = 0 in both cases, q = −w is also larger — option (@K). ΔU is a state function and is the same (zero) for both.',
  d: 3, c: 'analysis', t: [2],
}));
add('adiabatic-mcq', mcq({
  stem: 'An ideal gas in an insulated cylinder expands against a constant external pressure. Its temperature:',
  right: 'falls, because the work done by the gas is taken from its internal energy',
  wrong: ['rises, because the gas expands', 'stays constant, because ΔU = 0 for ideal gases', 'cannot be predicted without the amount of gas'],
  sol: 'The insulation makes q = 0, so ΔU = w, and w is negative for an expansion. The internal energy falls, so the temperature falls — option (@K). ΔU = 0 holds only at constant temperature.',
  d: 3, c: 'analysis', t: [2],
}));
add('dh-du-mcq', mcq({
  stem: r`For which of the following reactions at constant temperature is $\Delta H = \Delta U$?`,
  right: r`$\ce{H2(g) + Cl2(g) -> 2HCl(g)}$`,
  wrong: [r`$\ce{N2(g) + 3H2(g) -> 2NH3(g)}$`, r`$\ce{PCl5(g) -> PCl3(g) + Cl2(g)}$`, r`$\ce{CaCO3(s) -> CaO(s) + CO2(g)}$`],
  sol: r`$\Delta H = \Delta U + \Delta n_g RT$, so they are equal only if $\Delta n_g = 0$. The first reaction has 2 mol of gas on each side — option (@K). The others have $\Delta n_g = -2$, $+1$ and $+1$.`,
  d: 2, c: 'application', t: [2],
}));
add('dh-dn-mcq', mcq({
  stem: r`For $\ce{N2O4(g) -> 2NO2(g)}$ at 298 K, how does $\Delta H$ compare with $\Delta U$?`,
  right: r`$\Delta H$ is larger than $\Delta U$ by $RT$`,
  wrong: [r`$\Delta H$ is smaller than $\Delta U$ by $RT$`, r`$\Delta H$ is larger than $\Delta U$ by $2RT$`, r`$\Delta H$ equals $\Delta U$`],
  sol: r`$\Delta n_g = 2 - 1 = +1$, so $\Delta H - \Delta U = \Delta n_g RT = +RT$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('cp-cv-mcq', mcq({
  stem: r`The molar heat capacity of dinitrogen at constant pressure is $29.1\ \text{J K}^{-1}\text{mol}^{-1}$. Treating it as an ideal gas ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$), its $C_V$ is about:`,
  right: r`$20.8\ \text{J K}^{-1}\text{mol}^{-1}$`,
  wrong: [r`$37.4\ \text{J K}^{-1}\text{mol}^{-1}$`, r`$29.1\ \text{J K}^{-1}\text{mol}^{-1}$`, r`$8.3\ \text{J K}^{-1}\text{mol}^{-1}$`],
  sol: r`$C_V = C_p - R = 29.1 - 8.314 = 20.8$, in $\text{J K}^{-1}\text{mol}^{-1}$ — option (@K). (@1) adds $R$ instead of subtracting it.`,
  d: 2, c: 'application', t: [2],
}), () => near(29.1 - R, 20.8, 0.002) || 'Cv');
add('calorimeter-mcq', mcq({
  stem: 'A fuel is burnt in a sealed, rigid steel bomb surrounded by water. The temperature rise of the water gives directly:',
  right: 'the change in internal energy, ΔU',
  wrong: ['the change in enthalpy, ΔH', 'the change in entropy, ΔS', 'the work done by the gases, w'],
  sol: 'The volume is fixed, so no expansion work is done (w = 0) and q_V = ΔU — option (@K). ΔH is then calculated using ΔH = ΔU + Δn_g RT.',
  d: 2, c: 'understanding', t: [3],
}));
add('heat-state-ar', ar({
  a: 'The heat absorbed by a system at constant pressure has a definite value for a given change of state.',
  r: 'At constant pressure the heat absorbed equals the change in enthalpy, which is a state function.',
  key: 'a',
  sol: 'Both are true. Heat in general is a path function, but under the single condition of constant pressure it equals ΔH, so it depends only on the initial and final states; R explains A — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('free-exp-ar', ar({
  a: 'The work done by a gas in free expansion into a vacuum is large, because the gas expands very rapidly.',
  r: 'In free expansion the external pressure is zero.',
  key: 'd',
  sol: 'A is false: with p_ex = 0, w = −p_ex ΔV = 0, whatever the speed of expansion. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('dh-ar', ar({
  a: r`$\Delta H$ and $\Delta U$ differ for $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$.`,
  r: r`$\Delta n_g$ is zero for this reaction.`,
  key: 'c',
  sol: r`A is true because $\Delta n_g = 2 - 4 = -2$, so $\Delta H - \Delta U = -2RT$. R is false (Δn_g is −2, not zero) — option (c).`,
  d: 2, c: 'application', t: [2],
}));
add('free-exp-tf', tf({
  stem: 'The temperature of an ideal gas does not change when it expands freely into a vacuum.',
  key: 't',
  sol: 'True. Here w = 0 and, with no heat exchange, ΔU = 0; for an ideal gas the internal energy depends only on temperature, so T is unchanged.',
  d: 2, c: 'understanding', t: [2],
}));
add('cal-fill', fill({
  stem: 'A bomb calorimeter measures the change in ___ energy of a reaction directly.',
  acc: [['internal', 'internal energy']],
  sol: 'At constant volume the heat exchanged is q_V = ΔU, the change in **internal** energy.',
  d: 1, c: 'recall', t: [3],
}));

// work numericals
add('rev-work-num', num({
  stem: r`Calculate the work, in joules, done by $${n1.n}\ \text{mol}$ of an ideal gas when it expands reversibly and isothermally at $${n1.T}\ \text{K}$ from $${n1.V1}\ \text{L}$ to $${n1.V2}\ \text{L}$. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)`,
  value: Number(j(n1.w)), tol: 8, unit: 'J',
  sol: r`$w = -2.303\,nRT\log\dfrac{V_2}{V_1} = -2.303 \times ${n1.n} \times 8.314 \times ${n1.T} \times \log ${n1.V2 / n1.V1} = ${j(n1.w)}$, so $${j(n1.w)}\ \text{J}$ (the gas does work, so $w$ is negative).`,
  scheme: [['Formula with V₂/V₁ = 5', 1], ['Substitution and result −2008 J with sign', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), () => near(-n1.n * R * n1.T * Math.log(n1.V2 / n1.V1), -2008, 0.002) || 'rev work');
add('irrev-work-num', num({
  stem: r`A gas expands from $${n2.V1}\ \text{L}$ to $${n2.V2}\ \text{L}$ against a constant external pressure of $${n2.p}\ \text{bar}$. Calculate the work done on the gas, in joules. ($1\ \text{L bar} = 100\ \text{J}$)`,
  value: n2.w, tol: 2, unit: 'J',
  sol: r`$w = -p_\text{ex}\Delta V = -${n2.p} \times (${n2.V2} - ${n2.V1}) = ${j(n2.w / 100)}\ \text{L bar}$, and $-${j(-n2.w / 100)} \times 100 = ${j(n2.w)}$, i.e. $${j(n2.w)}\ \text{J}$.`,
  scheme: [['−p_ex ΔV with ΔV = 4.5 L', 1], ['Conversion to joules, −810 J', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), () => near(-1.8 * (7.0 - 2.5) * 100, -810) || 'irrev work');
add('dh-du-num', num({
  stem: r`For $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, $\Delta H^\circ = ${j(n3.dH)}\ \text{kJ}$ at 298 K. Calculate $\Delta U^\circ$ in kJ. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)`,
  value: Number(j(n3.dU, 3)), tol: 0.1, unit: 'kJ',
  sol: r`$\Delta n_g = 2 - 4 = -2$. $\Delta U = \Delta H - \Delta n_g RT = ${j(n3.dH)} - (-2)(8.314)(298)/1000 = ${j(n3.dU, 3)}$, so $${j(n3.dU, 3)}\ \text{kJ}$.`,
  scheme: [['Δn_g = −2', 1], ['ΔU = −87.2 kJ', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), () => near(-92.2 + (2 * 8.314 * 298) / 1000, -87.245, 0.002) || 'dU');
add('bomb-num', num({
  stem: r`$${n4.m}\ \text{g}$ of ethanol ($M = ${n4.M}\ \text{g mol}^{-1}$) is burnt completely in a bomb calorimeter of heat capacity $${n4.C}\ \text{kJ K}^{-1}$, and the temperature rises by $${n4.dT}\ \text{K}$ (given). For $\ce{C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)}$, calculate the enthalpy of combustion $\Delta_c H$ at 298 K, in kJ mol⁻¹. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)`,
  value: Number(j(n4.dH)), tol: 4, unit: 'kJ mol⁻¹',
  sol: r`Heat released $q = C\Delta T = ${n4.C} \times ${n4.dT} = ${j(n4.q)}\ \text{kJ}$ from $n = ${n4.m}/${n4.M} = ${j(n4.n)}\ \text{mol}$. $\Delta_cU = -${j(n4.q)}/${j(n4.n)} = ${j(n4.dU)}\ \text{kJ mol}^{-1}$. $\Delta n_g = 2 - 3 = -1$, so $\Delta_cH = \Delta_cU + \Delta n_g RT = ${j(n4.dU)} + (-1)(8.314)(298)/1000 = ${j(n4.dH)}$, i.e. $${j(n4.dH)}\ \text{kJ mol}^{-1}$.`,
  scheme: [['q = CΔT = 23.65 kJ and ΔcU per mole', 1], ['Δn_g = −1', 1], ['ΔcH = −1362 kJ mol⁻¹', 1]],
  marks: 3, d: 4, c: 'application', t: [2, 3],
}), () => near(-(11.0 * 2.15) / (0.8 / 46) - (8.314 * 298) / 1000, -1362.4, 0.002) || 'bomb');

// ---------------------------------------------------------------- t03 enthalpy terms, Hess, bond enthalpy
add('enthalpy-term-mcq', mcq({
  stem: r`The enthalpy change for the process $\ce{CH4(g) -> C(g) + 4H(g)}$ is called the standard enthalpy of:`,
  right: 'atomisation of methane',
  wrong: ['formation of methane', 'combustion of methane', 'sublimation of carbon'],
  sol: 'The molecule is completely broken into gaseous atoms: that is atomisation — option (@K). Formation starts from the elements in their reference states; combustion needs oxygen.',
  d: 2, c: 'understanding', t: [3],
}));
add('formation-zero-mcq', mcq({
  stem: 'At 298 K and 1 bar, the standard enthalpy of formation is zero for:',
  right: 'Br₂(l)',
  wrong: ['Br₂(g)', 'C(diamond)', 'O₃(g)'],
  sol: 'ΔfH° is zero for an element in its most stable (reference) form. At 298 K bromine is a liquid, so Br₂(l) — option (@K). Gaseous bromine, diamond and ozone are not the most stable forms.',
  d: 2, c: 'understanding', t: [3],
}));
add('combustion-mcq', mcq({
  stem: 'Which standard enthalpy change is always negative?',
  right: 'Enthalpy of combustion',
  wrong: ['Enthalpy of atomisation', 'Enthalpy of solution', 'Enthalpy of fusion'],
  sol: 'Burning a substance completely in oxygen always releases heat — option (@K). Atomisation and fusion absorb heat; the enthalpy of solution may have either sign.',
  d: 1, c: 'recall', t: [3],
}));
add('neutralisation-mcq', mcq({
  stem: 'The heat released on neutralising a strong acid with a strong base is about 57 kJ per mole of water, but it is smaller when ethanoic acid is neutralised with sodium hydroxide. The reason is that:',
  right: 'some of the energy is used to ionise the weak acid completely',
  wrong: ['ethanoic acid is a stronger acid than the strong acids', 'water is not formed in this reaction', 'the reaction is endothermic'],
  sol: 'Ionisation of a weak acid absorbs energy, which offsets part of the heat released when H⁺ and OH⁻ combine — option (@K). Water is still formed, and the overall reaction is still exothermic.',
  d: 3, c: 'analysis', t: [3],
}));
add('solution-fill', fill({
  stem: 'The enthalpy change on dissolving one mole of a substance in a very large amount of solvent is the enthalpy of ___.',
  acc: [['solution']],
  sol: 'This defines the enthalpy of **solution**.',
  d: 1, c: 'recall', t: [3],
}));
add('hess-mcq', mcq({
  stem: r`Given $\ce{S(s) + O2(g) -> SO2(g)}$, $\Delta H = -296.8\ \text{kJ}$ and $\ce{SO2(g) + 1/2O2(g) -> SO3(g)}$, $\Delta H = -98.9\ \text{kJ}$ (given), the enthalpy of formation of $\ce{SO3(g)}$ from sulfur and oxygen is:`,
  right: r`$-395.7\ \text{kJ mol}^{-1}$`,
  wrong: [r`$-197.9\ \text{kJ mol}^{-1}$`, r`$+395.7\ \text{kJ mol}^{-1}$`, r`$-98.9\ \text{kJ mol}^{-1}$`],
  sol: r`Adding the two equations gives $\ce{S(s) + 3/2O2(g) -> SO3(g)}$, so $\Delta H = -296.8 + (-98.9) = -395.7$, in kJ mol⁻¹ — option (@K). (@1) subtracts the second value instead of adding.`,
  d: 2, c: 'application', t: [3],
}), () => near(-296.8 - 98.9, -395.7, 0.001) || 'hess');
add('bond-mcq', mcq({
  stem: r`Using bond enthalpies (H–H 436, Cl–Cl 242, H–Cl 431, all in kJ mol⁻¹), the enthalpy change for $\ce{H2(g) + Cl2(g) -> 2HCl(g)}$ is:`,
  right: r`$-184\ \text{kJ}$`,
  wrong: [r`$+184\ \text{kJ}$`, r`$-862\ \text{kJ}$`, r`$+678\ \text{kJ}$`],
  sol: r`Bonds broken: $436 + 242 = 678$; bonds formed: $2 \times 431 = 862$. $\Delta H = 678 - 862 = -184$, in kJ — option (@K). (@1) subtracts the wrong way round.`,
  d: 2, c: 'application', t: [3],
}), () => 436 + 242 - 2 * 431 === -184 || 'bond');
add('hess-ar', ar({
  a: 'The standard enthalpy of formation of O₂(g) at 298 K is zero.',
  r: 'Enthalpy is a state function.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A. ΔfH° of an element in its reference state is zero **by definition** (forming an element from itself involves no change) — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('ethane-num', num({
  stem: r`Enthalpies of combustion (kJ mol⁻¹): $\ce{C(graphite)}$ $${n5.cC}$, $\ce{H2(g)}$ $${n5.cH}$, $\ce{C2H6(g)}$ $${n5.cE}$. Calculate the enthalpy of formation of ethane, $\ce{2C(s) + 3H2(g) -> C2H6(g)}$, in kJ mol⁻¹.`,
  value: Number(j(n5.f)), tol: 0.5, unit: 'kJ mol⁻¹',
  sol: r`$\Delta_fH = 2\Delta_cH(\text{C}) + 3\Delta_cH(\text{H}_2) - \Delta_cH(\text{C}_2\text{H}_6) = 2(${n5.cC}) + 3(${n5.cH}) - (${n5.cE}) = ${j(n5.f)}$, so $${j(n5.f)}\ \text{kJ mol}^{-1}$.`,
  scheme: [['Combination of combustion data', 1], ['−84.7 kJ mol⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), () => near(2 * -393.5 + 3 * -285.8 + 1559.7, -84.7, 0.002) || 'ethane');
add('bond-num', num({
  stem: r`Estimate $\Delta H$ for $\ce{CH2=CH2(g) + H2(g) -> CH3-CH3(g)}$ using the average bond enthalpies (kJ mol⁻¹): C=C ${n6.cc2}, C–C ${n6.cc1}, C–H ${n6.ch}, H–H ${n6.hh}.`,
  value: n6.dH, tol: 1, unit: 'kJ',
  sol: r`Broken: C=C and H–H $= ${n6.cc2} + ${n6.hh} = ${n6.cc2 + n6.hh}$. Formed: C–C and two C–H $= ${n6.cc1} + 2(${n6.ch}) = ${n6.cc1 + 2 * n6.ch}$. $\Delta H = ${n6.cc2 + n6.hh} - ${n6.cc1 + 2 * n6.ch} = ${n6.dH}$, so $${n6.dH}\ \text{kJ}$.`,
  scheme: [['Bonds broken 1047 kJ', 1], ['Bonds formed 1175 kJ and ΔH = −128 kJ', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), () => 611 + 436 - (347 + 828) === -128 || 'bond');
add('formation-short3', short({
  marks: 3, wl: null,
  stem: r`Calculate $\Delta H^\circ$ for $\ce{Fe2O3(s) + 3CO(g) -> 2Fe(s) + 3CO2(g)}$ from $\Delta_fH^\circ$ (kJ mol⁻¹): $\ce{Fe2O3(s)}$ −824.2, $\ce{CO(g)}$ −110.5, $\ce{CO2(g)}$ −393.5. Is the reaction exothermic?`,
  model: r`Products: $3(-393.5) = -1180.5$ kJ; Fe(s) is an element, so 0. Reactants: $-824.2 + 3(-110.5) = -1155.7$ kJ. $\Delta H^\circ = -1180.5 - (-1155.7) = ${j(-1180.5 + 1155.7)}$ kJ. It is negative, so the reaction is exothermic.`,
  sol: r`$\Delta_rH^\circ = \sum\Delta_fH^\circ(\text{P}) - \sum\Delta_fH^\circ(\text{R}) = -1180.5 - (-1155.7) = ${j(-1180.5 + 1155.7)}$, in kJ.`,
  scheme: [['Products and reactants sums with coefficients', 1], ['ΔH° = −24.8 kJ', 1], ['Exothermic because ΔH is negative', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(3 * -393.5 - (-824.2 + 3 * -110.5), -24.8, 0.003) || 'Fe2O3');
add('hess-long', long({
  stem: '(a) State Hess’s law and explain why it holds.\n\n(b) Given the enthalpies of combustion of graphite (−393.5), hydrogen (−285.8) and methane (−890.3 kJ mol⁻¹), calculate the enthalpy of formation of methane.\n\n(c) Mention two uses of Hess’s law.',
  model: r`(a) Hess’s law states that the enthalpy change of a reaction is the same whether it occurs in one step or in several steps, because enthalpy is a state function. (b) Required: $\ce{C(s) + 2H2(g) -> CH4(g)}$. $\Delta_fH = \Delta_cH(\text{C}) + 2\Delta_cH(\text{H}_2) - \Delta_cH(\text{CH}_4) = -393.5 + 2(-285.8) - (-890.3) = ${j(-393.5 - 571.6 + 890.3)}$ kJ mol⁻¹. (c) It lets us find enthalpy changes that cannot be measured directly, such as formation of methane or carbon monoxide, and it allows lattice or bond enthalpies to be calculated from cycles.`,
  sol: 'Statement and reason; combination of combustion data; two uses.',
  scheme: [['(a) Statement', 1], ['(a) State-function reason', 1], ['(b) Correct combination with coefficients', 1], ['(b) −74.8 kJ mol⁻¹', 1], ['(c) Two uses', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(-393.5 - 571.6 + 890.3, -74.8, 0.002) || 'CH4');
add('terms-long', long({
  stem: 'Define each of the following and give an equation or example: (a) standard enthalpy of formation, (b) standard enthalpy of combustion, (c) enthalpy of atomisation, (d) enthalpy of sublimation, (e) enthalpy of solution. Mention the usual sign of each.',
  model: r`(a) The enthalpy change when one mole of a compound forms from its elements in their reference states, e.g. $\ce{H2(g) + 1/2O2(g) -> H2O(l)}$, −285.8 kJ mol⁻¹; usually negative. (b) The enthalpy change when one mole of a substance burns completely in oxygen, e.g. graphite, −393.5 kJ mol⁻¹; always negative. (c) The enthalpy change to convert one mole of a substance into gaseous atoms, e.g. $\ce{1/2H2(g) -> H(g)}$, +218 kJ mol⁻¹; positive. (d) The enthalpy change when one mole of a solid changes directly to vapour, e.g. iodine, +62 kJ mol⁻¹; positive. (e) The enthalpy change when one mole dissolves in a large excess of solvent; negative for NaOH, positive for NH₄NO₃.`,
  sol: 'One definition, example and sign for each of the five terms.',
  scheme: [['(a) formation', 1], ['(b) combustion', 1], ['(c) atomisation', 1], ['(d) sublimation', 1], ['(e) solution', 1]],
  d: 2, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 entropy and Gibbs energy
add('gibbs-sign-mcq', mcq({
  stem: r`For $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, $\Delta H = -92\ \text{kJ}$ and $\Delta S = -199\ \text{J K}^{-1}$. The reaction is spontaneous:`,
  right: 'only at temperatures below about 460 K',
  wrong: ['only at temperatures above about 460 K', 'at all temperatures', 'at no temperature'],
  sol: r`Both $\Delta H$ and $\Delta S$ are negative, so $\Delta G = \Delta H - T\Delta S$ is negative only if $T < \Delta H/\Delta S = 92000/199 = 462\ \text{K}$ — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(92000 / 199, 462, 0.005) || 'T');
add('entropy-mcq', mcq({
  stem: 'In which of the following changes does the entropy of the system decrease?',
  right: r`$\ce{2H2(g) + O2(g) -> 2H2O(l)}$`,
  wrong: [r`$\ce{CaCO3(s) -> CaO(s) + CO2(g)}$`, r`$\ce{H2O(l) -> H2O(g)}$`, r`$\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}$`],
  sol: 'Three moles of gas change to a liquid: the system becomes much more ordered, so ΔS is negative — option (@K). The other changes produce a gas or free ions, increasing disorder.',
  d: 2, c: 'application', t: [4],
}));
add('high-t-mcq', mcq({
  stem: r`A reaction has $\Delta H > 0$ and $\Delta S > 0$. It becomes spontaneous:`,
  right: r`at temperatures high enough for $T\Delta S$ to exceed $\Delta H$`,
  wrong: ['at all temperatures', 'at low temperatures only', 'at no temperature'],
  sol: r`$\Delta G = \Delta H - T\Delta S$ is positive at low $T$ (the $\Delta H$ term dominates) and becomes negative once $T > \Delta H/\Delta S$ — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}));
add('dg-k-mcq', mcq({
  stem: r`A reaction has $\Delta G^\circ = -11.4\ \text{kJ mol}^{-1}$ at 298 K. Its equilibrium constant is about:`,
  right: '100',
  wrong: ['10', '1', '1000'],
  sol: r`$\log K = -\Delta G^\circ/(2.303RT) = 11400/(2.303 \times 8.314 \times 298) = 2.0$, so $K \approx 100$ — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(Math.pow(10, 11400 / (2.303 * 8.314 * 298)), 100, 0.02) || 'K');
add('boiling-mcq', mcq({
  stem: r`Water boils at 373 K under 1 atm. For $\ce{H2O(l) <=> H2O(g)}$ at these conditions:`,
  right: r`$\Delta G = 0$ and $\Delta S = \Delta H/T$`,
  wrong: [r`$\Delta G < 0$ and $\Delta S = 0$`, r`$\Delta G > 0$ and $\Delta H = 0$`, r`$\Delta G = 0$ and $\Delta S = 0$`],
  sol: r`The liquid and vapour are in equilibrium, so $\Delta G = 0 = \Delta H - T\Delta S$, giving $\Delta S = \Delta H/T$ — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('dissolve-ar', ar({
  a: 'Ice melts spontaneously above 273 K although melting is endothermic.',
  r: 'The entropy of water decreases when ice melts.',
  key: 'c',
  sol: 'A is true: above 273 K the TΔS term outweighs the positive ΔH, so ΔG < 0. R is false: liquid water is more disordered than ice, so the entropy increases — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('spont-ar', ar({
  a: 'A reaction with positive ΔH and positive ΔS is spontaneous at high temperature.',
  r: 'At high temperature the term TΔS outweighs ΔH, making ΔG negative.',
  key: 'a',
  sol: 'Both are true and R is the explanation, since ΔG = ΔH − TΔS — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('dg-eq-tf', tf({
  stem: 'At equilibrium the standard Gibbs energy change ΔG° of a reaction is always zero.',
  key: 'f',
  sol: 'False. At equilibrium the Gibbs energy change ΔG is zero; ΔG° = −2.303 RT log K is zero only if K = 1.',
  d: 3, c: 'understanding', t: [4],
}));
add('spont-match', match({
  stem: 'Match the signs of ΔH and ΔS with the temperatures at which the reaction is spontaneous.',
  pairs: [
    ['ΔH negative, ΔS positive', 'At all temperatures'],
    ['ΔH positive, ΔS negative', 'At no temperature'],
    ['ΔH negative, ΔS negative', 'Only at low temperatures'],
    ['ΔH positive, ΔS positive', 'Only at high temperatures'],
  ],
  order: [2, 0, 3, 1],
  sol: 'ΔG = ΔH − TΔS: −,+ always negative; +,− always positive; −,− negative only when T is small; +,+ negative only when T is large.',
  d: 2, c: 'understanding', t: [4],
}));
add('terms-match', match({
  stem: 'Match each enthalpy change with its description.',
  pairs: [
    ['Enthalpy of formation', 'One mole of a compound from its elements'],
    ['Enthalpy of combustion', 'One mole burnt completely in oxygen'],
    ['Enthalpy of atomisation', 'One mole of gaseous atoms produced'],
    ['Enthalpy of sublimation', 'Solid converted directly to vapour'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Formation builds a compound from elements; combustion burns in oxygen; atomisation gives gaseous atoms; sublimation is solid → vapour.',
  d: 1, c: 'recall', t: [3],
}));
add('entropy-num', num({
  stem: r`The enthalpy of vaporisation of ethanol is $${n7.dH}\ \text{kJ mol}^{-1}$ at its boiling point, $${n7.T}\ \text{K}$. Calculate the entropy change, in J K⁻¹, when $${n7.n}\ \text{mol}$ of ethanol vaporises reversibly at this temperature.`,
  value: Number(j(n7.dS, 3)), tol: 1, unit: 'J K⁻¹',
  sol: r`$\Delta S = \dfrac{q_\text{rev}}{T} = \dfrac{${n7.n} \times ${n7.dH * 1000}}{${n7.T}} = ${j(n7.dS, 3)}$, so $${j(n7.dS, 3)}\ \text{J K}^{-1}$.`,
  scheme: [['q_rev = n ΔH_vap = 77.2 kJ', 1], ['ΔS = q_rev/T = 220 J K⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), () => near((2 * 38600) / 351, 220, 0.003) || 'dS');
add('nh4cl-num', num({
  stem: r`For $\ce{NH4Cl(s) -> NH3(g) + HCl(g)}$ use $\Delta_fH^\circ$ (kJ mol⁻¹): $\ce{NH4Cl(s)}$ ${n8.fNH4Cl}, $\ce{NH3(g)}$ ${n8.fNH3}, $\ce{HCl(g)}$ ${n8.fHCl}, and $\Delta S^\circ = +${n8.dS}\ \text{J K}^{-1}\text{mol}^{-1}$ (given). Assuming $\Delta H$ and $\Delta S$ do not vary with temperature, find the minimum temperature, in K, at which the decomposition is spontaneous.`,
  value: Number(j(n8.T, 3)), tol: 3, unit: 'K',
  sol: r`$\Delta H^\circ = (${n8.fNH3}) + (${n8.fHCl}) - (${n8.fNH4Cl}) = ${j(n8.dH, 4)}\ \text{kJ}$. $\Delta G = 0$ at $T = \Delta H/\Delta S = ${n8.dH * 1000}/${n8.dS} = ${j(n8.T, 3)}$, so $${j(n8.T, 3)}\ \text{K}$. (At 298 K, $\Delta G = ${j(n8.dG298, 3)}\ \text{kJ}$, positive.)`,
  scheme: [['ΔH° = +176.0 kJ', 1], ['T = ΔH/ΔS in consistent units', 1], ['T ≈ 618 K', 1]],
  marks: 3, d: 4, c: 'application', t: [3, 4],
}), () => near(176000 / 285, 617.5, 0.002) || 'T');
add('dgk-num', num({
  stem: r`For $\ce{N2(g) + 3H2(g) -> 2NH3(g)}$, $\Delta G^\circ = ${n9.dG}\ \text{kJ mol}^{-1}$ at 298 K (given). Calculate $\log K$ for the reaction. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)`,
  value: Number(j(n9.logK, 3)), tol: 0.03, unit: null,
  sol: r`$\log K = \dfrac{-\Delta G^\circ}{2.303\,RT} = \dfrac{32800}{2.303 \times 8.314 \times 298} = ${j(n9.logK, 3)}$, so $\log K = ${j(n9.logK, 3)}$ ($K \approx 5.6 \times 10^{5}$).`,
  scheme: [['ΔG° converted to J (32800)', 1], ['log K = 5.75', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), () => near((32800) / (2.303 * 8.314 * 298), 5.748, 0.003) || 'logK');

add('state-short', short({
  marks: 2,
  stem: 'Distinguish between a state function and a path function. Give one example of each.',
  model: 'A state function depends only on the initial and final states of the system, not on how the change was carried out; internal energy and enthalpy are examples. A path function depends on the route taken; heat and work are examples.',
  sol: 'Definition and example of each.',
  scheme: [['State function, with example', 1], ['Path function, with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('first-law-short', short({
  marks: 2, wl: null,
  stem: 'A gas absorbs 200 J of heat and does 80 J of work on the surroundings. Using the IUPAC convention, find the change in its internal energy.',
  model: r`$q = +200$ J (heat absorbed) and $w = -80$ J (work done by the gas). $\Delta U = q + w = 200 + (-80) = +120$ J, so the internal energy rises by 120 J.`,
  sol: r`$\Delta U = q + w = 200 - 80 = +120$, in joules.`,
  scheme: [['Correct signs of q and w', 1], ['ΔU = +120 J', 1]],
  d: 2, c: 'application', t: [2],
}), () => 200 - 80 === 120 || 'dU');
add('solids-short', short({
  marks: 2,
  stem: 'Why is ΔH almost equal to ΔU for reactions involving only solids and liquids?',
  model: r`$\Delta H = \Delta U + p\Delta V$. For solids and liquids the volume change is very small, so $p\Delta V$ is negligible, and there are no moles of gas, so $\Delta n_g RT = 0$. Hence ΔH ≈ ΔU.`,
  sol: 'pΔV is negligible when no gas is involved.',
  scheme: [['ΔH = ΔU + pΔV', 1], ['ΔV negligible for condensed phases', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cp-short', short({
  marks: 2,
  stem: 'Why is the molar heat capacity of a gas at constant pressure greater than at constant volume?',
  model: 'At constant volume all the heat raises the internal energy. At constant pressure the gas also expands and does work on the surroundings, so extra heat is needed for the same rise in temperature. For an ideal gas the difference is R.',
  sol: 'Extra heat goes into expansion work at constant pressure.',
  scheme: [['Heat goes only into internal energy at constant V', 1], ['Extra expansion work at constant p; difference R', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bomb-short', short({
  marks: 2,
  stem: 'Why does a bomb calorimeter give ΔU and not ΔH? How is ΔH then found?',
  model: 'The bomb is rigid and sealed, so the volume is constant and no expansion work is done; the heat released is q_V = ΔU. ΔH is found from ΔH = ΔU + Δn_g RT, where Δn_g is the change in moles of gas.',
  sol: 'Constant volume gives ΔU; correct with Δn_g RT.',
  scheme: [['Constant volume, w = 0, q_V = ΔU', 1], ['ΔH = ΔU + Δn_g RT', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hess-short', short({
  marks: 2,
  stem: 'State Hess’s law and name the property of enthalpy on which it is based.',
  model: 'Hess’s law states that the total enthalpy change of a reaction is the same whether the reaction takes place in one step or in several steps. It is based on enthalpy being a state function, which depends only on the initial and final states.',
  sol: 'Statement; H is a state function.',
  scheme: [['Statement of the law', 1], ['Reason: enthalpy is a state function', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('entropy-sign-short', short({
  marks: 2,
  stem: r`Predict the sign of ΔS for (a) $\ce{2SO2(g) + O2(g) -> 2SO3(g)}$ and (b) $\ce{NH4Cl(s) -> NH3(g) + HCl(g)}$, giving a reason in each case.`,
  model: r`(a) Negative: three moles of gas become two, so the disorder decreases. (b) Positive: a solid forms two moles of gas, so the disorder increases greatly.`,
  sol: 'Compare moles of gas on the two sides.',
  scheme: [['(a) Negative with reason', 1], ['(b) Positive with reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('bond-short3', short({
  marks: 3, wl: null,
  stem: r`Estimate $\Delta H$ for $\ce{CH4(g) + Cl2(g) -> CH3Cl(g) + HCl(g)}$ from bond enthalpies (kJ mol⁻¹): C–H 414, Cl–Cl 242, C–Cl 326, H–Cl 431. State whether the reaction is exothermic.`,
  model: r`Broken: C–H and Cl–Cl $= 414 + 242 = 656$ kJ. Formed: C–Cl and H–Cl $= 326 + 431 = 757$ kJ. $\Delta H = 656 - 757 = -101$ kJ. The value is negative, so the reaction is exothermic.`,
  sol: r`$\Delta H = (414 + 242) - (326 + 431) = 656 - 757 = -101$, in kJ.`,
  scheme: [['Bonds broken 656 kJ', 1], ['Bonds formed 757 kJ and ΔH = −101 kJ', 1], ['Exothermic', 1]],
  d: 3, c: 'application', t: [3],
}), () => 414 + 242 - (326 + 431) === -101 || 'bond');
add('gibbs-short3', short({
  marks: 3, wl: null,
  stem: r`A reaction has $\Delta H = -40\ \text{kJ}$ and $\Delta S = -120\ \text{J K}^{-1}$ (both given). Calculate $\Delta G$ at 298 K and say whether the reaction is spontaneous. Above what temperature does it cease to be spontaneous?`,
  model: r`$\Delta G = \Delta H - T\Delta S = -40 - 298 \times (-0.120) = ${j(-40 + 298 * 0.12, 3)}$ kJ, which is negative, so the reaction is spontaneous at 298 K. It stops being spontaneous when $T > \Delta H/\Delta S = 40000/120 = ${j(40000 / 120, 4)}$ K.`,
  sol: r`$\Delta G = -40 + 35.76 = ${j(-40 + 298 * 0.12, 3)}$ kJ; $T = 40000/120 = ${j(40000 / 120, 4)}$ K.`,
  scheme: [['ΔG = ΔH − TΔS with unit conversion', 1], ['ΔG = −4.24 kJ, spontaneous', 1], ['T = 333 K', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(-40 + 298 * 0.12, -4.24, 0.01) && near(40000 / 120, 333.3, 0.002) || 'dG');
add('nh4no3-short3', short({
  marks: 3,
  stem: 'Ammonium nitrate dissolves in water spontaneously although the process is endothermic. Explain this using ΔG = ΔH − TΔS.',
  model: 'Dissolving NH₄NO₃ absorbs heat, so ΔH is positive. The ordered crystal changes into freely moving ions in solution, so ΔS is positive and large. At room temperature the term TΔS is greater than ΔH, so ΔG is negative and the process is spontaneous.',
  sol: 'Positive ΔH is outweighed by TΔS.',
  scheme: [['ΔH positive (endothermic)', 1], ['ΔS positive, ordered solid to free ions', 1], ['TΔS > ΔH so ΔG < 0', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('work-short3', short({
  marks: 3,
  stem: 'Using a p–V graph, explain why the work obtained from a reversible isothermal expansion of an ideal gas is greater than that from a one-step irreversible expansion between the same states.',
  model: 'Work equals the area under the p–V curve. In the reversible expansion the external pressure always equals the gas pressure, so the path follows the isotherm and the area is large. In the one-step expansion the gas works against the lower final pressure, giving only a smaller rectangle. Hence reversible work is the maximum.',
  sol: 'Area under the curve versus the rectangle at the final pressure.',
  scheme: [['Work is the area under p–V', 1], ['Reversible path follows the isotherm (larger area)', 1], ['Irreversible: rectangle at final pressure, so smaller', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('first-law-long', long({
  stem: '(a) State the first law of thermodynamics and write its mathematical form with the IUPAC sign convention.\n\n(b) Write the values of q, w and ΔU (or their relation) for (i) an isolated system, (ii) an adiabatic change, (iii) an isothermal change of an ideal gas.\n\n(c) A gas absorbs 50 J of heat and 30 J of work is done on it. Find ΔU.',
  model: r`(a) Energy can neither be created nor destroyed; the change in internal energy equals heat absorbed plus work done on the system: $\Delta U = q + w$, where q and w are positive when energy enters the system. (b) (i) Isolated: q = 0, w = 0, ΔU = 0. (ii) Adiabatic: q = 0, so ΔU = w. (iii) Isothermal for an ideal gas: ΔU = 0, so q = −w. (c) $q = +50$ J and $w = +30$ J, so $\Delta U = 50 + 30 = +80$ J.`,
  sol: 'Statement, sign convention, three special cases, and a calculation.',
  scheme: [['(a) Statement', 1], ['(a) ΔU = q + w with signs', 1], ['(b) Isolated and adiabatic', 1], ['(b) Isothermal', 1], ['(c) +80 J', 1]],
  d: 2, c: 'application', t: [2],
}), () => 50 + 30 === 80 || 'dU');
add('enthalpy-long', long({
  stem: '(a) Define enthalpy and show that the heat absorbed at constant pressure equals ΔH.\n\n(b) Derive ΔH = ΔU + Δn_g RT.\n\n(c) For N₂(g) + 3H₂(g) → 2NH₃(g) at 298 K, ΔH = −92.2 kJ. State whether ΔH is larger or smaller than ΔU and by how much.',
  model: r`(a) Enthalpy is a state function defined as $H = U + pV$. By the first law, $\Delta U = q_p + w$ with $w = -p\Delta V$ at constant pressure, so $q_p = \Delta U + p\Delta V$. This is the change in $U + pV$, which is $\Delta H$; hence the heat absorbed at constant pressure equals the enthalpy change. (b) For gases, $p\Delta V = \Delta n_g RT$ from $pV = nRT$ at constant T, so $\Delta H = \Delta U + \Delta n_g RT$. (c) Here $\Delta n_g = 2 - 4 = -2$, so $\Delta H - \Delta U = -2RT = -2 \times 8.314 \times 298 = ${j(-2 * R * 298, 4)}$ J, i.e. about −4.96 kJ. ΔH is therefore smaller (more negative) than ΔU by about 4.96 kJ, because the volume of the gaseous system shrinks and the surroundings do work on it.`,
  sol: 'Definition, constant-pressure heat, derivation with pV = nRT, calculation.',
  scheme: [['(a) H = U + pV and q_p = ΔH', 1.5], ['(b) pΔV = Δn_g RT and the result', 1.5], ['(c) Δn_g = −2 and the difference', 1], ['(c) Smaller by about 4.96 kJ', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(-2 * 8.314 * 298 / 1000, -4.955, 0.002) || 'RT');
add('gibbs-long', long({
  stem: '(a) Write the Gibbs equation and the criterion of spontaneity.\n\n(b) Explain, for the four combinations of signs of ΔH and ΔS, the temperatures at which a reaction is spontaneous.\n\n(c) How is ΔG° related to the equilibrium constant? What does a large negative ΔG° imply?',
  model: r`(a) $\Delta G = \Delta H - T\Delta S$; a process at constant T and p is spontaneous if ΔG < 0, at equilibrium if ΔG = 0. (b) ΔH negative, ΔS positive: ΔG is always negative, so spontaneous at all temperatures. ΔH positive, ΔS negative: ΔG always positive, so never spontaneous. Both negative: spontaneous only at low T. Both positive: spontaneous only at high T. (c) $\Delta G^\circ = -2.303\,RT\log K$. A large negative ΔG° gives a large K, so the products are strongly favoured at equilibrium.`,
  sol: 'Gibbs equation, four cases, link to K.',
  scheme: [['(a) Equation and criterion', 1], ['(b) Four cases with reasons', 2], ['(c) ΔG° = −2.303 RT log K', 1], ['(c) Large negative ΔG° means large K', 1]],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- case-based
add('bomb-case', mk.case({
  passage: r`A student burns $0.500\ \text{g}$ of glucose ($\ce{C6H12O6}$, $M = 180\ \text{g mol}^{-1}$) completely in a bomb calorimeter whose heat capacity is $8.20\ \text{kJ K}^{-1}$. The temperature rises by $0.95\ \text{K}$ (given).

$$\ce{C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)}$$`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The heat measured in this experiment gives directly:',
      right: 'ΔU of the combustion, because the volume is constant',
      wrong: ['ΔH of the combustion, because the pressure is constant', 'ΔS of the combustion', 'the work done on the calorimeter'],
      sol: 'A bomb calorimeter has a fixed volume, so w = 0 and q_V = ΔU — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the heat released, in kJ, from the temperature rise.',
      model: r`$q = C\Delta T = 8.20 \times 0.95 = ${j(8.2 * 0.95)}$ kJ.`,
      sol: 'q = CΔT.',
      scheme: [['q = 7.79 kJ', 1]],
      d: 2, c: 'application', t: [3],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate the enthalpy change of combustion per mole of glucose, in kJ mol⁻¹, and say how it compares with ΔU.',
      model: r`$n = 0.500/180 = ${j(0.5 / 180)}$ mol; $\Delta_cU = -${j(8.2 * 0.95)}/${j(0.5 / 180)} = ${j(-(8.2 * 0.95) / (0.5 / 180), 4)}$ kJ mol⁻¹. $\Delta n_g = 6 - 6 = 0$, so $\Delta_cH = \Delta_cU \approx -2.80 \times 10^3$ kJ mol⁻¹.`,
      sol: r`$\Delta_cU = -7.79/0.002778 = ${j(-(8.2 * 0.95) / (0.5 / 180), 4)}$, in kJ mol⁻¹; $\Delta n_g = 0$ so $\Delta H = \Delta U$.`,
      scheme: [['ΔcU per mole ≈ −2804 kJ mol⁻¹', 1], ['Δn_g = 0, so ΔH = ΔU', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'If the same bomb experiment were repeated with 1.00 g of glucose, what temperature rise would be expected, and why?',
        model: 'The amount of glucose is doubled, so twice the heat is released, and the temperature rise doubles to about 1.9 K, because heat capacity of the calorimeter is unchanged and ΔT is proportional to the heat.',
        sol: 'ΔT is proportional to the amount burnt.',
        scheme: [['Heat doubles with amount', 1], ['ΔT ≈ 1.9 K', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => near(-(8.2 * 0.95) / (0.5 / 180), -2803.8, 0.003) || 'glucose');
add('fuel-case', mk.case({
  passage: r`A school lab compares fuels using standard enthalpies of combustion (kJ mol⁻¹, 298 K). Hydrogen: $-285.8$ ($M = 2.0\ \text{g mol}^{-1}$); methane: $-890.3$ ($M = 16\ \text{g mol}^{-1}$); ethanol: $-1366.8$ ($M = 46\ \text{g mol}^{-1}$). Also, $\Delta_fH^\circ$ for $\ce{CO2(g)}$ is $-393.5$ and for $\ce{H2O(l)}$ is $-285.8$ kJ mol⁻¹.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which fuel releases the most heat per gram?',
      right: 'Hydrogen (about 143 kJ per gram)',
      wrong: ['Methane (about 56 kJ per gram)', 'Ethanol (about 30 kJ per gram)', 'All release the same heat per gram'],
      sol: r`Per gram: H₂ $285.8/2.0 = 142.9$; CH₄ $890.3/16 = 55.6$; C₂H₅OH $1366.8/46 = 29.7$ — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the heat released, in kJ, on burning 1.0 g of methane.',
      model: r`$q = 890.3/16 = ${j(890.3 / 16, 3)}$ kJ.`,
      sol: 'Divide the molar value by the molar mass.',
      scheme: [['55.6 kJ', 1]],
      d: 2, c: 'application', t: [3],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Calculate the enthalpy of formation of ethanol from its enthalpy of combustion, using $\ce{2C(s) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}$.`,
      model: r`$\Delta_fH = 2(-393.5) + 3(-285.8) - (-1366.8) = ${j(-787 - 857.4 + 1366.8)}$ kJ mol⁻¹ (the products of burning ethanol are 2 CO₂ and 3 H₂O).`,
      sol: r`$\Delta_fH = 2\Delta_fH(\text{CO}_2) + 3\Delta_fH(\text{H}_2\text{O}) - \Delta_cH = -787.0 - 857.4 + 1366.8 = ${j(-787 - 857.4 + 1366.8)}$, in kJ mol⁻¹.`,
      scheme: [['Correct combination with coefficients', 1], ['−277.6 kJ mol⁻¹', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'What mass of methane, in grams, must be burnt to release 500 kJ of heat?',
        model: r`Moles $= 500/890.3 = ${j(500 / 890.3, 3)}$ mol; mass $= ${j(500 / 890.3, 3)} \times 16 = ${j((500 / 890.3) * 16, 3)}$ g, about 9.0 g.`,
        sol: r`$n = 500/890.3 = 0.5616$ mol; mass $= 0.5616 \times 16 = ${j((500 / 890.3) * 16, 3)}$ g.`,
        scheme: [['Moles = 0.562', 1], ['Mass ≈ 8.99 g', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => near(-787 - 857.4 + 1366.8, -277.6, 0.002) || 'ethanol');
add('gibbs-case', mk.case({
  passage: r`A student studies four reactions at constant temperature and pressure. The data are (illustrative):

| Reaction | $\Delta H$ / kJ | $\Delta S$ / J K⁻¹ |
|---|---|---|
| P | −110 | +90 |
| Q | +60 | −40 |
| R | −75 | −150 |
| S | +50 | +130 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which reaction is spontaneous at all temperatures?',
      right: 'P',
      wrong: ['Q', 'R', 'S'],
      sol: 'P has ΔH negative and ΔS positive, so ΔG = ΔH − TΔS is negative at every temperature — option (@K). Q is never spontaneous; R only at low T; S only at high T.',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate ΔG for reaction R at 298 K, in kJ.',
      model: r`$\Delta G = -75 - 298 \times (-0.150) = ${j(-75 + 298 * 0.15, 3)}$ kJ.`,
      sol: 'ΔG = ΔH − TΔS with ΔS in kJ K⁻¹.',
      scheme: [['−30.3 kJ', 1]],
      d: 3, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the minimum temperature at which reaction S becomes spontaneous.',
      model: r`$T = \Delta H/\Delta S = 50000/130 = ${j(50000 / 130, 3)}$ K; above about 385 K, ΔG is negative.`,
      sol: r`$\Delta G = 0$ at $T = 50000/130 = ${j(50000 / 130, 3)}$, in K.`,
      scheme: [['T = ΔH/ΔS with consistent units', 1], ['385 K', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Explain why reaction Q cannot be made spontaneous by changing the temperature.',
        model: 'Q has positive ΔH and negative ΔS, so both terms of ΔG = ΔH − TΔS are positive at every temperature. ΔG therefore never becomes negative, and Q is non-spontaneous at all temperatures.',
        sol: 'Both terms positive at all T.',
        scheme: [['Signs of ΔH and ΔS', 1], ['ΔG positive at every T', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}), () => near(-75 + 298 * 0.15, -30.3, 0.003) && near(50000 / 130, 384.6, 0.002) || 'gibbs');
add('work-case', mk.case({
  passage: r`One mole of an ideal gas at 300 K expands from $10\ \text{L}$ to $20\ \text{L}$ in two ways: path A, in one step against a constant external pressure of $1.2\ \text{bar}$; path B, reversibly and isothermally. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$; $1\ \text{L bar} = 100\ \text{J}$)`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement is correct?',
      right: 'More work is done by the gas in path B than in path A.',
      wrong: ['More work is done by the gas in path A than in path B.', 'ΔU is larger for path B.', 'Equal work is done, as the end states are the same.'],
      sol: 'The reversible path follows the isotherm and encloses the largest area under the p–V curve, so path B gives the maximum work — option (@K). ΔU is a state function and equals zero in both cases.',
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the work done on the gas in path A, in joules.',
      model: r`$w = -p_\text{ex}\Delta V = -1.2 \times 10 = -12\ \text{L bar} = ${j(-1.2 * 10 * 100)}$ J.`,
      sol: 'w = −p_ex ΔV.',
      scheme: [['−1200 J', 1]],
      d: 2, c: 'application', t: [2],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate the work done on the gas in path B, in joules.',
      model: r`$w = -2.303 \times 1 \times 8.314 \times 300 \times \log 2 = ${j(-L * R * 300 * Math.log10(2), 4)}$ J.`,
      sol: r`$w = -2.303\,nRT\log(V_2/V_1) = -2.303 \times 8.314 \times 300 \times 0.3010 = ${j(-L * R * 300 * Math.log10(2), 4)}$, in joules.`,
      scheme: [['Formula with V₂/V₁ = 2', 1], ['≈ −1729 J', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'For path B, find ΔU and the heat absorbed q.',
        model: r`For an ideal gas at constant temperature, $\Delta U = 0$. Then $q = -w = +${j(L * R * 300 * Math.log10(2), 4)}$ J, about +1729 J absorbed from the surroundings.`,
        sol: 'ΔU = 0 so q = −w.',
        scheme: [['ΔU = 0', 1], ['q = +1729 J', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), () => near(-2.303 * 8.314 * 300 * Math.log10(2), -1729, 0.003) || 'path B');
