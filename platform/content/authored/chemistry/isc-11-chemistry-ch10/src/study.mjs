// ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { R, CMP, MONO } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T), });
const f0 = (x) => Math.round(x).toString();
const f1 = (x) => x.toFixed(1);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Thermodynamics: Systems and the First Law — Notes',
  language: 'en',
  sections: [
    sec(
      '1. System, surroundings and the types of system',
      r`**Thermodynamics** studies the energy changes that accompany physical and chemical changes. The part of the universe under study is the **system**; everything else that can exchange energy or matter with it is the **surroundings**; the **boundary** separates them (real or imaginary). System + surroundings = **universe**.

- **Open system:** exchanges **matter and energy** (water boiling in an uncovered pan; a living cell).
- **Closed system:** exchanges **energy only** (a sealed bottle; a stoppered flask of ethanol).
- **Isolated system:** exchanges **neither** (a stoppered vacuum flask, to a good approximation).

Always name the system first. The universe as a whole is isolated.`,
      [kt('System', 'The part of the universe chosen for study.'), kt('Surroundings', 'Everything outside the system that can exchange energy or matter with it.'), kt('Isolated system', 'A system that exchanges neither matter nor energy with its surroundings.')],
      [],
      table(['Type', 'Matter', 'Energy', 'Example'], [['Open', 'Yes', 'Yes', 'Tea in an uncovered cup'], ['Closed', 'No', 'Yes', 'Sealed bottle'], ['Isolated', 'No', 'No', 'Vacuum flask, stoppered']], 'Table of open, closed and isolated systems'),
      [1],
      [V.systems],
    ),
    sec(
      '2. Properties and state functions',
      r`The **state** of a system is defined by its measurable properties ($p$, $V$, $T$, $n$). **Extensive** properties depend on the **amount** of matter (mass, volume, $U$, $H$, heat capacity); **intensive** properties do not (temperature, pressure, density, molar volume, specific heat). The ratio of two extensive properties is intensive.

A **state function** depends only on the **present state**: its change depends only on the initial and final states, not on the path ($U$, $H$, $p$, $V$, $T$). **Heat $q$ and work $w$** are **path functions**. For a cycle, the change in any state function is zero.`,
      [kt('Extensive property', 'A property that depends on the amount of matter present.'), kt('Intensive property', 'A property that does not depend on the amount of matter present.'), kt('State function', 'A property whose change depends only on the initial and final states of the system.'), kt('Path function', 'A quantity (heat or work) whose value depends on how the change is carried out.')],
      [],
      table(['Property', 'Extensive or intensive', 'State or path function'], [['Temperature', 'Intensive', 'State'], ['Density', 'Intensive', 'State'], ['Internal energy U', 'Extensive', 'State'], ['Enthalpy H', 'Extensive', 'State'], ['Heat q', 'Extensive', 'Path'], ['Work w', 'Extensive', 'Path']], 'Table classifying properties as intensive or extensive and as state or path functions'),
      [1],
      [V.split, V.paths],
    ),
    sec(
      '3. Thermodynamic processes; reversible and irreversible changes',
      r`A **process** takes the system from one state to another. It is named by what is held constant:

- **Isothermal:** $T$ constant ($\Delta T = 0$; for an ideal gas $\Delta U = 0$).
- **Isobaric:** $p$ constant; the heat absorbed equals $\Delta H$.
- **Isochoric:** $V$ constant; $w = 0$ (no $p$–$V$ work), so $\Delta U = q$.
- **Adiabatic:** no heat exchanged, $q = 0$, so $\Delta U = w$.
- **Cyclic:** the system returns to its initial state, so $\Delta U = 0$ and $q = -w$.

A **reversible** process is carried out **infinitely slowly**, the system being in equilibrium at every stage and the driving force only infinitesimally greater than the opposing force; it gives the **maximum work**. All **real** processes are **irreversible**. **Thermodynamic equilibrium** needs thermal, mechanical and chemical equilibrium together.`,
      [kt('Adiabatic process', 'A process in which no heat is exchanged between the system and the surroundings (q = 0).'), kt('Reversible process', 'A process carried out infinitely slowly through a series of equilibrium states, which can be reversed by an infinitesimal change.'), kt('Cyclic process', 'A process in which the system returns to its initial state.')],
      [],
      table(['Process', 'Constant or zero', 'First law becomes'], [['Isothermal (ideal gas)', 'ΔT = 0', 'q = −w'], ['Isobaric', 'Δp = 0', 'q = ΔH'], ['Isochoric', 'ΔV = 0', 'ΔU = q'], ['Adiabatic', 'q = 0', 'ΔU = w'], ['Cyclic', 'ΔU = 0', 'q = −w']], 'Table of processes with the condition and the first-law form'),
      [2],
      [V.procs],
    ),
    sec(
      '4. The first law of thermodynamics',
      r`**Statement:** energy can be neither created nor destroyed; it can only be changed from one form to another. The **internal energy** $U$ of a system (the total of all kinetic and potential energies of its particles) changes only through heat and work: $$\Delta U = q + w$$

**Sign convention (used throughout):** $q > 0$ when heat is **absorbed by** the system; $q < 0$ when it is **released**. $w > 0$ when work is done **on** the system (compression); $w < 0$ when the system does work (expansion).

- **Isolated system:** $q = 0$, $w = 0$, so $\Delta U = 0$: the internal energy of an isolated system is constant.
- **Cyclic process:** $U$ is a state function, so $\Delta U = 0$ and $q = -w$.
- **Adiabatic:** $\Delta U = w$; compression warms, expansion cools.`,
      [kt('Internal energy', 'The total energy of a system: the sum of the kinetic and potential energies of all its particles.'), kt('First law', 'ΔU = q + w: energy is conserved.')],
      [fm(r`\Delta U = q + w`, 'First law (w positive when work is done on the system)')],
      V.sign,
      [3],
      [V.cycle],
    ),
    sec(
      '5. Work of expansion: irreversible and reversible',
      r`For expansion against a constant external pressure: $$w = -p_\text{ext}\,\Delta V\qquad (1\ \text{L atm} = 101.3\ \text{J})$$ The sign is negative for expansion, and $w = 0$ for free expansion ($p_\text{ext} = 0$) and at constant volume.

For a **reversible isothermal** expansion of an ideal gas: $$w_\text{rev} = -2.303\,nRT\log_{10}\frac{V_2}{V_1}\qquad \Delta U = 0,\ q = -w$$ Work is the **area under the p–V curve**. For 1.00 mol at 300 K expanding from 8.0 atm to 2.0 atm: one step ${f0(CMP.w1)} J, two steps ${f0(CMP.w2)} J, reversible ${f0(CMP.wr)} J. **The reversible path delivers the maximum work**, because the opposing pressure is always nearly the gas pressure; the more steps, the nearer the work gets to the reversible value. For compression the reversible path needs the **minimum** work.`,
      [kt('p–V work', 'Work done by or on a gas as its volume changes against an external pressure: w = −p_ext ΔV.'), kt('Free expansion', 'Expansion into a vacuum, with p_ext = 0 and so w = 0.')],
      [fm(r`w = -p_\text{ext}\,\Delta V`, 'Work against a constant external pressure'), fm(r`w_\text{rev} = -2.303\,nRT\log_{10}\frac{V_2}{V_1}`, 'Reversible isothermal work of an ideal gas')],
      table(['Route (1.00 mol, 300 K, 8.0 atm to 2.0 atm)', 'Work on the gas (J)'], [['One step against 2.0 atm', f0(CMP.w1)], ['Two steps (4.0 atm, then 2.0 atm)', f0(CMP.w2)], ['Reversible', f0(CMP.wr)]], 'Table of the work in one-step, two-step and reversible expansion'),
      [4],
      [V.pv],
    ),
    sec(
      '6. Enthalpy, heat capacity and the relation C_p − C_V = R',
      r`**Enthalpy** $H = U + pV$ is an extensive state function. At constant pressure $q_p = \Delta H$; at constant volume $q_V = \Delta U$. For ideal gases $p\Delta V = \Delta n_g RT$, so $$\Delta H = \Delta U + \Delta n_g\,RT$$ where $\Delta n_g$ is moles of gaseous products minus moles of gaseous reactants (convert $RT$ to kJ if $\Delta U$ is in kJ). $\Delta n_g = 0$ gives $\Delta H = \Delta U$.

**Heat capacity** $C$ (J K⁻¹; $q = C\Delta T$), **specific heat** $c$ (J g⁻¹ K⁻¹; $q = mc\Delta T$), **molar heat capacity** $C_m$ (J K⁻¹ mol⁻¹). For an ideal gas $\Delta U = nC_V\Delta T$ for any process and $\Delta H = nC_p\Delta T$. From $H = U + RT$ per mole: $$C_p - C_V = R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$$ At constant pressure the extra heat does the expansion work $p\Delta V = R\Delta T$. For a monatomic gas $C_V = 3R/2 = ${f1(MONO.Cv)}$ and $C_p = 5R/2 = ${f1(MONO.Cp)}$ J K⁻¹ mol⁻¹.`,
      [kt('Enthalpy', 'H = U + pV; its change at constant pressure equals the heat exchanged.'), kt('Heat capacity', 'The heat needed to raise the temperature of a given sample by 1 K.'), kt('Specific heat', 'The heat needed to raise the temperature of 1 g of a substance by 1 K.')],
      [fm(r`\Delta H = \Delta U + \Delta n_g RT`, 'Enthalpy change and internal energy change'), fm(r`C_p - C_V = R`, 'Heat capacities of an ideal gas'), fm(r`q = mc\Delta T = C\Delta T`, 'Heat from specific heat or heat capacity')],
      V.vessels,
      [5],
      [V.cpcv],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using ΔU = q − w without saying which convention is used: here ΔU = q + w and w is positive when work is done on the system.
- Forgetting the minus sign in w = −p_ext ΔV, so an expanding gas gets a positive w.
- Treating adiabatic as isothermal, or calling heat and work state functions.
- Mixing L atm, J and kJ: 1 L atm = 101.3 J; convert Δn_g RT to kJ if ΔU is in kJ.
- Counting solids and liquids in Δn_g, or using C_p for ΔU of an ideal gas.

**Marks**
- First law numericals: signs of q and w (1), substitution (1), answer with unit (1).
- Work of expansion: ΔV (1), formula and sign (1), unit conversion and answer (1).
- Derivations: starting relation (1), key step (1), result (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a thermodynamic system?', 'The part of the universe chosen for study; the rest is the surroundings.', 'definition', 1),
    fc(2, 'Open, closed and isolated systems?', 'Open: matter and energy exchanged; closed: energy only; isolated: neither.', 'fact', 1),
    fc(3, 'Name the type: a sealed bottle of cola.', 'Closed: heat crosses the glass but no matter does.', 'example', 1),
    fc(4, 'Extensive property: definition and two examples?', 'Depends on the amount of matter: mass, volume, internal energy, enthalpy.', 'definition', 1),
    fc(5, 'Intensive property: definition and two examples?', 'Does not depend on the amount: temperature, pressure, density, specific heat.', 'definition', 1),
    fc(6, 'Is the ratio of two extensive properties extensive or intensive?', 'Intensive, because the amount cancels (for example density).', 'concept', 1),
    fc(7, 'What is a state function?', 'A property whose change depends only on the initial and final states, not on the path.', 'definition', 1),
    fc(8, 'Which of U, H, q, w are state functions?', 'U and H are state functions; q and w are path functions.', 'fact', 1),
    fc(9, 'What is an isothermal process?', 'One in which the temperature of the system stays constant (ΔT = 0).', 'definition', 2),
    fc(10, 'What is an adiabatic process?', 'One in which no heat is exchanged with the surroundings (q = 0).', 'definition', 2),
    fc(11, 'Isobaric and isochoric processes?', 'Constant pressure and constant volume.', 'fact', 2),
    fc(12, 'First law for an isochoric process?', 'w = 0 (no p–V work), so ΔU = q.', 'concept', 2),
    fc(13, 'What is a reversible process?', 'One carried out infinitely slowly through equilibrium states, reversible by an infinitesimal change.', 'definition', 2),
    fc(14, 'Why are all real processes irreversible?', 'They occur at a finite rate with a finite driving force, so the system is not in equilibrium at every stage.', 'concept', 2),
    fc(15, 'What is a cyclic process?', 'One in which the system returns to its initial state, so ΔU = 0.', 'definition', 2),
    fc(16, 'State the first law with its sign convention.', 'ΔU = q + w; q positive when heat enters, w positive when work is done on the system.', 'fact', 3),
    fc(17, 'What is internal energy?', 'The total of the kinetic and potential energies of all the particles of the system.', 'definition', 3),
    fc(18, 'First law for an isolated system?', 'q = 0 and w = 0, so ΔU = 0: its internal energy is constant.', 'concept', 3),
    fc(19, 'First law for an adiabatic change?', 'ΔU = w: compression warms the gas and expansion cools it.', 'concept', 3),
    fc(20, 'Why is ΔU = 0 for a cyclic process?', 'U is a state function and the final state is the initial state, so q = −w.', 'concept', 3),
    fc(21, 'Work of expansion against a constant external pressure?', r`$w = -p_\text{ext}\,\Delta V$; negative for expansion.`, 'formula', 4),
    fc(22, 'Work in free expansion?', 'Zero, because p_ext = 0.', 'fact', 4),
    fc(23, 'Convert L atm to joules.', '1 L atm = 101.3 J.', 'fact', 4),
    fc(24, 'Reversible isothermal work of an ideal gas?', r`$w = -2.303\,nRT\log_{10}(V_2/V_1)$; $\Delta U = 0$ and $q = -w$.`, 'formula', 4),
    fc(25, 'Which expansion gives the maximum work?', 'The reversible one: p_ext stays almost equal to the gas pressure.', 'concept', 4),
    fc(26, 'What does the area under a p–V curve represent?', 'The magnitude of the work done by or on the gas.', 'concept', 4),
    fc(27, 'Define enthalpy.', 'H = U + pV, an extensive state function; at constant pressure q_p = ΔH.', 'definition', 5),
    fc(28, 'Relation between ΔH and ΔU?', r`$\Delta H = \Delta U + \Delta n_g RT$, counting only gases.`, 'formula', 5),
    fc(29, 'When is ΔH equal to ΔU?', 'When Δn_g = 0, or when only solids and liquids are involved.', 'concept', 5),
    fc(30, 'Units of heat capacity, specific heat and molar heat capacity?', 'J K⁻¹; J g⁻¹ K⁻¹; J K⁻¹ mol⁻¹.', 'fact', 5),
    fc(31, 'ΔU of an ideal gas in terms of C_V?', r`$\Delta U = nC_V\Delta T$ for any process.`, 'formula', 5),
    fc(32, 'Why is C_p − C_V = R for an ideal gas?', 'At constant pressure the gas also does the expansion work p ΔV = R ΔT per mole, which needs extra heat.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
