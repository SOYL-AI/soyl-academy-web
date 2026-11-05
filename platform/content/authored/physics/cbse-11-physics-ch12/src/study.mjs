// ch12 notes and flashcards.
import { T, unit, PROV, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotIsotherms, plotIsobars, plotVrms, plotMfp, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, stp } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Kinetic Theory — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Equation of state of a perfect gas',
      r`- An **ideal (perfect) gas** obeys $P V = n R T = N k_B T$ with $T$ in **kelvin** ($T = t_\text{C} + 273$). Here $n$ is the number of moles, $N = n N_A$ the number of molecules, $R = 8.314$ J mol$^{-1}$ K$^{-1}$, $k_B = 1.38 \times 10^{-23}$ J K$^{-1}$, $N_A = 6.02 \times 10^{23}$ mol$^{-1}$ and $R = N_A k_B$.
- **Special cases** for a fixed amount of gas: Boyle ($P V$ constant at fixed $T$; the P–V curves are hyperbolas called isotherms), Charles ($V/T$ constant at fixed $P$), Gay-Lussac ($P/T$ constant at fixed $V$), and the combined law $P_1 V_1/T_1 = P_2 V_2/T_2$. Avogadro's law: at the same $P$ and $T$, equal volumes of gases hold equal numbers of molecules.
- **Real gases** approach ideal behaviour at low pressure and high temperature; at high pressure the molecular volume matters and at low temperature the attractions matter, so the gas liquefies.
- Example: $${ex1.n}$ mol of helium in $${ex1.V}$ m$^3$ at 27 °C exerts $P = n R T/V = ${sci(ex1.P, 3)}$ Pa ($\approx ${dec(ex1.atm, 3)}$ atm). Dry air (M = 29 g mol$^{-1}$) at 1 atm and 300 K has density $PM/RT = ${dec(ex2.rho, 3)}$ kg m$^{-3}$, and one mole of it occupies $${dec(ex2.Vm * 1000, 3)}$ litre.`,
      [kt('Ideal gas', 'A gas of point-like molecules with no mutual forces except in elastic collisions; it obeys P V = n R T at all pressures and temperatures.'), kt('Isotherm', 'A curve of constant temperature on a P–V graph; for an ideal gas it is the hyperbola P V = constant.'), kt('Absolute temperature', 'Temperature on the kelvin scale, T = t(°C) + 273; zero kelvin is where the translational motion would cease.')],
      [fm(r`P V = n R T = N k_B T`, 'Equation of state of an ideal gas'), fm(r`\dfrac{P_1 V_1}{T_1} = \dfrac{P_2 V_2}{T_2}`, 'Combined gas law')],
      plotIsotherms,
      [1],
      [plotIsobars, TABLES.TLAWS, TABLES.TCONST, TABLES.TREAL],
    ),
    sec(
      '2. Kinetic theory of an ideal gas: pressure, temperature and rms speed',
      r`- **Assumptions:** a large number of identical molecules in random motion; molecular size negligible compared with the separation; no forces except during collisions; elastic collisions with the walls and each other; no preferred direction and gravity ignored.
- **Pressure.** One molecule hitting a wall with $v_x$ gives it momentum $2 m v_x$; it returns after $2L/v_x$, so it exerts $m v_x^2/L$. Summing for $N$ molecules over a cube of volume $V = L^3$ and using $\overline{v_x^2} = \overline{v^2}/3$: $P = \tfrac{1}{3}\,\dfrac{N}{V}\,m\,\overline{v^2} = \tfrac{1}{3}\rho\,\overline{v^2}$. Equivalently $P V = \tfrac{2}{3}E$, where $E$ is the total translational kinetic energy.
- **Temperature.** Comparing with $P V = N k_B T$: $\tfrac{1}{2} m \overline{v^2} = \tfrac{3}{2} k_B T$. The kelvin temperature measures the mean translational kinetic energy per molecule, the same for every ideal gas. $v_\text{rms} = \sqrt{3 k_B T/m} = \sqrt{3 R T/M} \propto \sqrt{T}$, and for different gases at one temperature $v_\text{rms} \propto 1/\sqrt{M}$.
- The rms speed is never less than the mean speed. The mean velocity of the molecules is zero. In a mixture, each gas exerts its own partial pressure and the total is their sum (**Dalton's law**).
- Examples: hydrogen with $\rho = ${ex3.rho}$ kg m$^{-3}$ and $v_\text{rms} = ${ex3.v}$ m s$^{-1}$ has $P = ${sci(ex3.P, 3)}$ Pa. At 300 K nitrogen has $v_\text{rms} = ${dec(ex4.vN, 3)}$ m s$^{-1}$ and oxygen $${dec(ex4.vO, 3)}$ m s$^{-1}$, but each molecule has mean energy $${sci(ex4.ke, 3)}$ J. To raise $v_\text{rms}$ by a factor ${ex5.k} from ${ex5.t1} °C one must go to $${ex5.T2}$ K $= ${ex5.t2}$ °C.`,
      [kt('Root-mean-square speed', 'The square root of the mean of the squares of the molecular speeds: v_rms = √(3 k_B T / m).'), kt('Mean translational energy', 'The average kinetic energy of translation per molecule, (3/2) k_B T, fixed by temperature alone.'), kt('Partial pressure', 'The pressure a gas of a mixture would exert if it alone filled the vessel; the partial pressures add up (Dalton).')],
      [fm(r`P = \dfrac{1}{3}\rho\,\overline{v^2}`, 'Pressure of an ideal gas'), fm(r`\tfrac{1}{2} m \overline{v^2} = \tfrac{3}{2} k_B T`, 'Kinetic meaning of temperature'), fm(r`v_\text{rms} = \sqrt{\dfrac{3 R T}{M}}`, 'Root-mean-square speed')],
      V.box,
      [2],
      [V.vrms, V.speeds, plotVrms, TABLES.TASSUME, TABLES.TDERIV, TABLES.TTEMP, TABLES.TDALTON],
    ),
    sec(
      '3. Degrees of freedom, equipartition and specific heats',
      r`- **Degrees of freedom** are the independent ways a molecule can store energy. A monatomic molecule has 3 (translation); a rigid diatomic molecule 5 (3 translational and 2 rotational); a non-linear polyatomic molecule 6 (3 and 3). A vibrational mode stores kinetic and potential energy, so it adds 2 quadratic terms; vibrations are excited only at high temperatures, so a diatomic gas at room temperature behaves as rigid ($f = 5$) and at high temperature has $f = 7$.
- **Law of equipartition:** in equilibrium each quadratic term in the energy of a molecule has mean value $\tfrac{1}{2} k_B T$. With $f$ terms the energy per molecule is $\tfrac{f}{2} k_B T$ and the internal energy of $n$ moles of an ideal gas is $U = \tfrac{f}{2} n R T$.
- **Specific heats:** $C_V = \tfrac{f}{2} R$ and, because $C_P - C_V = R$ for an ideal gas (from the first law), $C_P = \left(\tfrac{f}{2} + 1\right) R$ and $\gamma = 1 + 2/f$. Monatomic: $\tfrac{3}{2}R$, $\tfrac{5}{2}R$, $5/3$. Rigid diatomic: $\tfrac{5}{2}R$, $\tfrac{7}{2}R$, $7/5$. Rigid non-linear polyatomic: $3R$, $4R$, $4/3$.
- For a mixture, $C_V = \sum n_i C_{V,i}$ and $C_P = \sum n_i C_{P,i}$ for the whole sample, then $\gamma = C_P/C_V$ (for 1.0 mol of argon and 2.0 mol of oxygen, $\gamma = ${dec(ex8.gamma, 3)}$).
- Examples: oxygen at ${ex6.T} K has $\tfrac{5}{2} k_B T = ${sci(ex6.eps, 3)}$ J per molecule and $U = ${dec(ex6.Um, 5)}$ J per mole. Heating ${ex7.n} mol of nitrogen by ${ex7.dT} K needs $${dec(ex7.QV, 5)}$ J at constant volume and $${dec(ex7.QP, 5)}$ J at constant pressure; the difference $n R \Delta T = ${dec(ex7.W, 5)}$ J is the work done by the gas.`,
      [kt('Degrees of freedom', 'The number of independent quadratic terms in the energy of a molecule (translation, rotation and vibration).'), kt('Law of equipartition', 'In thermal equilibrium each quadratic term in the energy contributes ½ k_B T per molecule on average.'), kt('Ratio γ', 'C_P / C_V = 1 + 2/f for an ideal gas.')],
      [fm(r`U = \dfrac{f}{2} n R T`, 'Internal energy of an ideal gas'), fm(r`C_V = \dfrac{f}{2} R, \quad C_P = \left(\dfrac{f}{2} + 1\right) R`, 'Molar specific heats'), fm(r`\gamma = 1 + \dfrac{2}{f}`, 'Ratio of specific heats')],
      V.dof,
      [3],
      [V.cv, TABLES.TEQ, TABLES.TFS],
    ),
    sec(
      '4. Mean free path and Avogadro\'s number',
      r`- The **mean free path** $\lambda$ is the average distance a molecule travels between two successive collisions. For molecules of diameter $d$ and number density $n$, $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n}$, and since $n = P/(k_B T)$, $\lambda = \dfrac{k_B T}{\sqrt{2}\,\pi d^2 P}$.
- Hence $\lambda$ is shorter for a more crowded gas and for larger molecules ($\lambda \propto 1/d^2$); at fixed $T$, $\lambda \propto 1/P$; at fixed $P$, $\lambda \propto T$; heating a gas in a sealed vessel leaves $n$, and so $\lambda$, unchanged. The collision frequency is about (mean speed)$/\lambda$.
- Example: nitrogen-like molecules ($d = 3.0 \times 10^{-10}$ m) at 1 atm and 300 K have $n = ${sci(ex9.n, 3)}$ m$^{-3}$ and $\lambda = ${sci(ex9.lam, 3)}$ m, about ${Math.round(ex9.ratio)} diameters, and about $${sci(ex9.freq, 2)}$ collisions per second at a mean speed of ${ex9.vbar} m s$^{-1}$. At $${ex10.P}$ Pa $\lambda = ${dec(ex10.lam, 3)}$ m, longer than a ${ex10.tube} m tube.
- **Avogadro's number** $N_A = 6.02 \times 10^{23}$ mol$^{-1}$ is the number of molecules in one mole. The mass of a molecule is $M/N_A$, and $N = (m/M) N_A$ molecules are in a sample of mass $m$. From $P V = N k_B T$, equal volumes of any gases at the same $P$ and $T$ hold the same number of molecules (**Avogadro's law**). At 0 °C and 1 atm one mole occupies $${dec(stp.Vm * 1000, 3)}$ litre and the number density is $${sci(stp.n, 3)}$ m$^{-3}$. For ${ex11.mass} g of nitrogen, $N = ${sci(ex11.N, 3)}$ and one molecule has mass $${sci(ex11.m1, 3)}$ kg.`,
      [kt('Mean free path', 'The average distance travelled by a molecule between successive collisions; λ = 1/(√2 π d² n).'), kt('Avogadro constant', 'The number of molecules in one mole, 6.02 × 10²³ per mole.'), kt('Avogadro\'s law', 'At the same pressure and temperature equal volumes of different gases contain equal numbers of molecules.')],
      [fm(r`\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n}`, 'Mean free path'), fm(r`N = \dfrac{m}{M} N_A`, 'Number of molecules in a sample')],
      V.mfp,
      [4],
      [plotMfp, TABLES.TMFPDEP, TABLES.TAVOG],
    ),
  ],
  exam_tips_md: `- Convert Celsius to kelvin first; keep P in pascal and V in cubic metre when R = 8.314.
- In the pressure derivation state the assumptions, the momentum change 2 m v_x, the time 2L / v_x and the step v̄x² = v̄²/3.
- At one temperature all gases have the same mean translational energy (3/2) k_B T but different rms speeds, v_rms ∝ 1/√M.
- Say which modes are active before choosing f; then C_V = (f/2) R, C_P = C_V + R, γ = 1 + 2/f.
- Mean free path: sealed vessel, unchanged; fixed T, λ ∝ 1/P; fixed P, λ ∝ T; λ ∝ 1/d².`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Write the equation of state of an ideal gas in terms of moles and in terms of molecules.', '$P V = n R T = N k_B T$.', 'formula', 1),
    fc(2, 'Which temperature scale must be used in the gas equation?', 'The absolute (kelvin) scale: $T = t_\\text{C} + 273$.', 'concept', 1),
    fc(3, 'Value of the gas constant R used in this chapter?', '$8.314$ J mol⁻¹ K⁻¹.', 'fact', 1),
    fc(4, 'How are R, the Boltzmann constant and Avogadro\'s number related?', '$R = N_A k_B$, with $k_B = 1.38 \\times 10^{-23}$ J K⁻¹ and $N_A = 6.02 \\times 10^{23}$ mol⁻¹.', 'formula', 1),
    fc(5, 'What does Boyle\'s law say, and what is its graph at constant temperature?', '$P V$ is constant for a fixed amount of gas at fixed T; a hyperbola (isotherm).', 'concept', 1),
    fc(6, 'What is the V–T graph at constant pressure (kelvin scale)?', 'A straight line through the origin: $V \\propto T$ (Charles).', 'concept', 1),
    fc(7, 'Under what conditions does a real gas behave most like an ideal gas?', 'Low pressure and high temperature.', 'concept', 1),
    fc(8, 'Show that density of an ideal gas is $\\rho = P M / (R T)$.', 'Put $n = m/M$ in $P V = n R T$ and divide by $V$.', 'formula', 1),
    fc(9, 'State two assumptions of the kinetic theory of an ideal gas.', 'Any two: tiny molecules, no forces except in collisions, elastic collisions, random motion with no preferred direction.', 'concept', 2),
    fc(10, 'What is the momentum given to a wall by one elastic collision of a molecule with perpendicular speed $v_x$?', '$2 m v_x$.', 'concept', 2),
    fc(11, 'Pressure of an ideal gas in terms of density and mean square speed?', '$P = \\tfrac{1}{3}\\rho\\,\\overline{v^2}$.', 'formula', 2),
    fc(12, 'Why is $\\overline{v_x^2} = \\overline{v^2}/3$?', 'No direction is preferred: $\\overline{v_x^2} = \\overline{v_y^2} = \\overline{v_z^2}$ and they add up to $\\overline{v^2}$.', 'concept', 2),
    fc(13, 'Mean translational kinetic energy per molecule at temperature T?', '$\\tfrac{3}{2} k_B T$, whatever the gas.', 'formula', 2),
    fc(14, 'Write the rms speed in terms of T and molar mass.', '$v_\\text{rms} = \\sqrt{3 R T / M}$.', 'formula', 2),
    fc(15, 'How does the rms speed change if the temperature is quadrupled?', 'It doubles ($\\propto \\sqrt{T}$).', 'concept', 2),
    fc(16, 'Two gases at the same temperature: which has the greater rms speed?', 'The one with the smaller molar mass; their mean kinetic energies are equal.', 'concept', 2),
    fc(17, 'What is the mean velocity of the molecules of a gas at rest in a vessel?', 'Zero; but the rms speed is not zero.', 'concept', 2),
    fc(18, 'State Dalton\'s law of partial pressures.', 'The total pressure of a mixture of non-reacting gases is the sum of the pressures each would exert alone.', 'concept', 2),
    fc(19, 'How many degrees of freedom has a monatomic molecule? A rigid diatomic one?', '3; 5 (3 translational + 2 rotational).', 'fact', 3),
    fc(20, 'How many degrees of freedom has a rigid non-linear polyatomic molecule?', '6 (3 translational + 3 rotational), plus 2 for each active vibration.', 'fact', 3),
    fc(21, 'State the law of equipartition of energy.', 'In equilibrium each quadratic term in the energy has mean value $\\tfrac{1}{2} k_B T$ per molecule.', 'concept', 3),
    fc(22, 'Why does each vibrational mode count twice?', 'It stores both kinetic and potential energy: two quadratic terms.', 'concept', 3),
    fc(23, 'Internal energy of n moles of an ideal gas with f degrees of freedom?', '$U = \\tfrac{f}{2} n R T$.', 'formula', 3),
    fc(24, 'Give $C_V$ and $C_P$ in terms of f.', '$C_V = \\tfrac{f}{2} R$ and $C_P = \\left(\\tfrac{f}{2} + 1\\right) R$.', 'formula', 3),
    fc(25, 'What is $\\gamma$ for a monatomic gas and for a rigid diatomic gas?', '$5/3$ and $7/5$.', 'fact', 3),
    fc(26, 'Define mean free path.', 'The average distance a molecule travels between two successive collisions.', 'concept', 4),
    fc(27, 'Write the mean free path in terms of $n$ and $d$.', '$\\lambda = 1 / (\\sqrt{2}\\,\\pi d^2 n)$.', 'formula', 4),
    fc(28, 'A gas is heated in a sealed vessel. What happens to its mean free path?', 'It is unchanged: n and d do not change.', 'concept', 4),
    fc(29, 'What does Avogadro\'s law say?', 'Equal volumes of all gases at the same temperature and pressure contain the same number of molecules.', 'concept', 4),
    fc(30, 'Exam tip: how do you find the number of molecules in a sample of mass m?', '$N = (m/M) N_A$; the mass of one molecule is $M/N_A$.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
