// ch11 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotCpCv, plotIsoAd, plotIso, plotAdi, plotCycle, plotEff, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex3, ex4, ex5, ex6, ex7, ex8 } = EX;
const n3 = (x) => dec(x, 3);
const n4 = (x) => dec(x, 4);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Thermodynamics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Thermal equilibrium, the zeroth law, heat, work and internal energy',
      r`- A **system** is the part of the world under study; the rest is its **surroundings**. Two systems in contact are in **thermal equilibrium** when no net heat flows between them. An **adiabatic wall** stops heat; a **diathermic wall** lets it pass.
- **Zeroth law:** if A and B are each in thermal equilibrium with a third body C, they are in thermal equilibrium with each other. **Temperature** is the property that is equal for systems in thermal equilibrium; a thermometer is the third body.
- **Heat** is energy transferred because of a temperature difference; **work** is energy transferred by a force acting through a displacement. Neither is "contained" in a body: they are energy in transit and depend on the path.
- **Internal energy** $U$ is the energy of the random motion and mutual interaction of the molecules, measured with the centre of mass at rest. It is a **state function**: it depends only on the state of the system.
- Work can raise internal energy with no heat flow: a ${ex1.m} kg car stopped from ${ex1.kmh} km h⁻¹ puts ${ex1.KE} J into brakes of heat capacity ${ex1.C / 1000} kJ K⁻¹ and warms them by ${ex1.dT} K.`,
      [kt('Thermal equilibrium', 'The state in which no net heat flows between two systems in contact: they have the same temperature.'), kt('Zeroth law', 'Two systems in thermal equilibrium with a third are in thermal equilibrium with each other.'), kt('Internal energy', 'The energy of the molecules of a system (random kinetic energy and interaction energy); a state function.')],
      [fm(r`T_A = T_C \ \text{and}\ T_B = T_C \Rightarrow T_A = T_B`, 'Zeroth law (in terms of temperature)')],
      V.zero,
      [1],
      [TABLES.T_WALLS, TABLES.T_HWU],
    ),
    sec(
      '2. First law, work done by a gas and specific heats',
      r`- **First law:** $\Delta U = Q - W$. $Q$ is positive when heat flows **into** the system; $W$ is the work done **by** the system (positive for expansion, negative for compression). Books that use $W$ for work done on the system write $\Delta U = Q + W$; the physics is the same.
- **Work by a gas:** $W = \int P\,dV$ is the **area under the P–V curve**; at constant pressure $W = P\,\Delta V$. With $P$ in kPa and $V$ in litres the area is in joules (1 kPa × 1 L = 1 J). The work depends on the **path**: for one state-to-state change (A to B in a figure of ${ex3.V1} L, ${ex3.P1} kPa to ${ex3.V2} L, ${ex3.P2} kPa) three paths give ${ex3.Wa} J, ${ex3.Wb} J and ${ex3.Wc} J, while $\Delta U$ is the same ${ex3.dU} J, so $Q$ is ${ex3.Qa} J, ${ex3.Qb} J and ${ex3.Qc} J.
- **Specific heats of a gas:** $Q = nC_v\Delta T$ at constant volume and $Q = nC_p\Delta T$ at constant pressure. For an ideal gas $\Delta U = nC_v\Delta T$ for every process. At constant pressure the gas also does work $nR\,\Delta T$, so $C_p - C_v = R = 8.314$ J mol⁻¹ K⁻¹ and $\gamma = C_p/C_v$.
- Example: ${dec(ex4.n, 2)} mol of a monatomic gas heated by ${ex4.dT} K at constant pressure takes in ${n4(ex4.QP)} J: ${n4(ex4.W)} J is work and ${n4(ex4.dU)} J raises the internal energy. Data from kinetic theory (next chapter): $C_v = 3R/2$ for a monatomic and $5R/2$ for a diatomic gas.`,
      [kt('First law', 'ΔU = Q − W: the heat added to a system minus the work done by it equals the increase in its internal energy.'), kt('Molar heat capacity', 'Heat per mole per kelvin: Cv at constant volume, Cp at constant pressure.'), kt('State function', 'A quantity fixed by the state of the system (U, P, V, T), not by the path taken.')],
      [fm(r`\Delta U = Q - W`, 'First law'), fm(r`W = \int_{V_1}^{V_2} P\,dV`, 'Work done by a gas'), fm(r`C_p - C_v = R`, 'Mayer’s relation (ideal gas)')],
      V.paths,
      [2],
      [plotCpCv, TABLES.T_SIGN, TABLES.T_CASES, TABLES.T_GASES],
    ),
    sec(
      '3. Thermodynamic processes',
      r`- A **quasi-static** process is so slow that the system is in equilibrium at every stage, so it can be drawn as a curve on a P–V diagram.
- **Isochoric** ($V$ constant): $W = 0$, $Q = \Delta U = nC_v\Delta T$. **Isobaric** ($P$ constant): $W = P\,\Delta V = nR\,\Delta T$, $Q = nC_p\Delta T$.
- **Isothermal** ideal gas ($T$ constant, $PV$ constant): $\Delta U = 0$, $Q = W = nRT\ln(V_2/V_1)$. For ${dec(ex5.n, 2)} mol at ${ex5.T} K expanding to ${ex5.ratio} times its volume, $W = Q \approx ${n4(ex5.W)}$ J.
- **Adiabatic** ($Q = 0$): $\Delta U = -W$, $PV^{\gamma} = $ constant, $TV^{\gamma-1} = $ constant, $W = (P_1V_1 - P_2V_2)/(\gamma - 1) = nC_v(T_1 - T_2)$. The adiabat is steeper than the isotherm through the same point (by the factor $\gamma$), so an adiabatic expansion between the same volumes does less work. Compressing ${dec(ex6.n, 2)} mol of a monatomic gas from ${ex6.T1} K to half its volume heats it to ${n4(ex6.T2)} K and needs ${n4(-ex6.W)} J of work.
- **Cyclic:** the system returns to its start, so $\Delta U = 0$ and the net work equals the net heat; the net work is the **area enclosed** by the loop, positive if the loop is run clockwise (engine). The rectangular cycle of the figure encloses ${ex7.W} J; it absorbs ${ex7.Qin} J and rejects ${ex7.Qout} J (efficiency ${n3(ex7.eta * 100)}%).`,
      [kt('Isothermal process', 'A process at constant temperature; for an ideal gas ΔU = 0 and Q = W.'), kt('Adiabatic process', 'A process with no heat exchange (Q = 0); ΔU = −W and PV^γ is constant.'), kt('Quasi-static process', 'A process slow enough that the system is in equilibrium at every stage.'), kt('Cyclic process', 'A process that returns the system to its initial state; ΔU = 0.')],
      [fm(r`W_{\text{iso}} = nRT\ln\dfrac{V_2}{V_1}`, 'Isothermal work'), fm(r`PV^{\gamma} = \text{const}`, 'Adiabatic relation'), fm(r`W_{\text{adi}} = \dfrac{P_1V_1 - P_2V_2}{\gamma - 1}`, 'Adiabatic work')],
      V.four,
      [3],
      [V.isoad, plotIsoAd, plotIso, plotAdi, V.cycle, plotCycle, TABLES.T_PROC, TABLES.T_IB],
    ),
    sec(
      '4. The second law, reversibility, heat engines and refrigerators',
      r`- **Kelvin–Planck statement:** no cyclic device can absorb heat from a single reservoir and convert all of it into work with no other effect. **Clausius statement:** no cyclic device can have as its only result the transfer of heat from a colder to a hotter body. They are equivalent. The first law cannot rule such processes out; the second law does.
- A process is **reversible** only if it is quasi-static and free of friction and of heat flow across a finite temperature difference; free expansion, friction, mixing and conduction across a gap are **irreversible**.
- A **heat engine** takes $Q_1$ from a hot reservoir, delivers $W$ and rejects $Q_2$; $W = Q_1 - Q_2$ and the **efficiency** is $\eta = W/Q_1 = 1 - Q_2/Q_1$, always less than 1. An engine absorbing ${ex8.Q1} kJ and rejecting ${ex8.Q2} kJ has $\eta = ${dec(ex8.eta * 100, 3)}\%$.
- A **refrigerator** takes $Q_2$ from the cold space with work $W$ and releases $Q_1 = Q_2 + W$; its **coefficient of performance** is $\text{COP} = Q_2/W = Q_2/(Q_1 - Q_2)$, which can exceed 1. One removing ${ex8.fQ2} MJ per hour for ${ex8.fW} MJ of work has COP ${ex8.cop} and releases ${n3(ex8.fQ1)} MJ to the room.
- The Carnot engine and Carnot's theorem are not covered here (see README).`,
      [kt('Heat engine', 'A cyclic device that converts part of the heat absorbed from a hot reservoir into work and rejects the rest to a cold reservoir.'), kt('Coefficient of performance', 'For a refrigerator, the heat removed from the cold space divided by the work supplied.'), kt('Irreversible process', 'A process that cannot be retraced exactly; natural processes with friction, free expansion or heat flow across a gap.')],
      [fm(r`\eta = \dfrac{W}{Q_1} = 1 - \dfrac{Q_2}{Q_1}`, 'Efficiency of a heat engine'), fm(r`\text{COP} = \dfrac{Q_2}{W}`, 'Coefficient of performance of a refrigerator')],
      V.engfridge,
      [4],
      [plotEff, TABLES.T_STMT, TABLES.T_REV, TABLES.T_ER],
    ),
  ],
  exam_tips_md: `- Write the sign convention (W done by the gas) before using ΔU = Q − W.
- Heat and work are energy in transit; only internal energy belongs to a body.
- Work from a graph: area under the P–V curve (kPa × L = J), positive if V increases.
- Isothermal: ΔU = 0, Q = W. Adiabatic: Q = 0, ΔU = −W, PV^γ = constant.
- Efficiency η = 1 − Q₂/Q₁ is always less than 1; COP = Q₂/W can exceed 1.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does the zeroth law of thermodynamics say?', 'If A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other.', 'concept', 1),
    fc(2, 'What property do two systems in thermal equilibrium share?', 'The same temperature.', 'concept', 1),
    fc(3, 'How does an adiabatic wall differ from a diathermic wall?', 'An adiabatic wall blocks heat flow; a diathermic wall lets heat pass.', 'concept', 1),
    fc(4, 'Define heat.', 'Energy transferred between a system and its surroundings because of a temperature difference.', 'concept', 1),
    fc(5, 'Why is "heat content of a body" a wrong phrase?', 'Heat is energy in transit, not a stored property; the body has internal energy.', 'concept', 1),
    fc(6, 'What is internal energy?', 'The energy of the random motion and mutual interaction of the molecules (centre of mass at rest); a state function.', 'concept', 1),
    fc(7, 'Name two ways to raise the internal energy of a gas.', 'Add heat, or do work on it (for example compress it).', 'concept', 1),
    fc(8, 'Which of Q, W and ΔU depend only on the initial and final states?', 'Only ΔU; Q and W depend on the path.', 'concept', 1),
    fc(9, 'State the first law with its sign convention.', 'ΔU = Q − W: Q positive into the system, W positive for work done by the system.', 'formula', 2),
    fc(10, 'A gas takes in 500 J and does 200 J of work. ΔU?', '+300 J.', 'example', 2),
    fc(11, 'Work done by a gas at constant pressure?', 'W = PΔV = P(V₂ − V₁).', 'formula', 2),
    fc(12, 'General expression for work done by a gas?', 'W = ∫P dV, the area under the P–V curve.', 'formula', 2),
    fc(13, 'What is 1 kPa × 1 L in joules?', '1 J.', 'fact', 2),
    fc(14, 'Is the work done by a gas negative or positive in compression?', 'Negative (work is done on the gas).', 'concept', 2),
    fc(15, 'Same end states, different paths: what is the same and what differs?', 'ΔU is the same; W and Q differ.', 'concept', 2),
    fc(16, 'Which is larger for a gas, Cp or Cv, and why?', 'Cp: at constant pressure the gas also does work PΔV.', 'concept', 2),
    fc(17, 'Relation between Cp and Cv for an ideal gas?', 'Cp − Cv = R = 8.314 J mol⁻¹ K⁻¹.', 'formula', 2),
    fc(18, 'Value of Cp for a monatomic gas (Cv = 3R/2)?', `5R/2 ≈ ${n4(ex4.Cp)} J mol⁻¹ K⁻¹; γ = 5/3.`, 'fact', 2),
    fc(19, 'What is a quasi-static process?', 'A process so slow that the system is in equilibrium at every stage.', 'concept', 3),
    fc(20, 'In an isochoric process what is W and what is Q?', 'W = 0; Q = ΔU = nCvΔT.', 'formula', 3),
    fc(21, 'Work and heat in an isobaric process?', 'W = PΔV = nRΔT; Q = nCpΔT.', 'formula', 3),
    fc(22, 'For an ideal gas in an isothermal process, what is ΔU and what is Q?', 'ΔU = 0; Q = W = nRT ln(V₂/V₁).', 'formula', 3),
    fc(23, 'What condition defines an adiabatic process, and what follows for ΔU?', 'Q = 0, so ΔU = −W.', 'concept', 3),
    fc(24, 'Adiabatic relations for an ideal gas?', 'PV^γ = constant and TV^(γ−1) = constant.', 'formula', 3),
    fc(25, 'Which is steeper on a P–V diagram, an adiabat or an isotherm?', 'The adiabat (by the factor γ at the same point).', 'concept', 3),
    fc(26, 'In a cyclic process what are ΔU and the net work?', 'ΔU = 0; net work = area of the loop (positive if clockwise) = net heat.', 'concept', 3),
    fc(27, 'State the Kelvin–Planck statement.', 'No cyclic device can convert all the heat from a single reservoir into work with no other effect.', 'concept', 4),
    fc(28, 'State the Clausius statement.', 'No cyclic device can have, as its only result, heat flowing from a colder to a hotter body.', 'concept', 4),
    fc(29, 'Give two examples of irreversible processes.', 'Free expansion into a vacuum; friction; heat flow across a finite temperature gap.', 'example', 4),
    fc(30, 'Formulas for efficiency and coefficient of performance?', 'η = W/Q₁ = 1 − Q₂/Q₁ (always < 1); COP = Q₂/W (can exceed 1).', 'formula', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
