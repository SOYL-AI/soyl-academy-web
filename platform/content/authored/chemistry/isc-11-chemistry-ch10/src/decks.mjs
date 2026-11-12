// ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law: two decks. Part 1 (t01-t03): systems, properties, state functions,
// processes, first law. Part 2 (t04-t05): work of expansion, enthalpy, heat capacity.
// Sign convention (stated once, used throughout): delta U = q + w; w is positive when work is done ON the system, so w = -p_ext delta V.
import { sl, deck, table, svgV, r } from './lib.mjs';
import { SYSTEMS_3, SPLIT_PROPS, PATHS_PV, PROCESSES_PV, CYCLE_PV, SIGN_CONV, PV_WORK, CP_CV, VESSELS } from './svgs.mjs';
import { R, LATM, CMP, PATHS, CYC, MONO, wIrrev, wIrrevLatm, wRev, dUfromH, dHfromU, CpFromCv } from './data.mjs';

export const V = {
  systems: svgV(SYSTEMS_3, 'Open, closed and isolated systems: an uncovered cup of tea, a sealed bottle and a stoppered vacuum flask', 'Open: matter and energy. Closed: energy only. Isolated: neither.'),
  split: svgV(SPLIT_PROPS, 'A sample of water divided into two halves: mass and volume halve, temperature and density do not', 'Extensive properties halve; intensive properties do not.'),
  paths: svgV(PATHS_PV, 'Two paths on a pressure volume graph between the same two states, with different work', 'Same states, different work: work is a path function.'),
  procs: svgV(PROCESSES_PV, 'Isothermal, isobaric, isochoric and adiabatic paths from the same starting state on a pressure volume graph', 'Four processes from one start.'),
  cycle: svgV(CYCLE_PV, 'A rectangular cyclic process on a pressure volume graph; the enclosed area is the net work', 'Enclosed area = net work; ΔU = 0 for the cycle.'),
  sign: svgV(SIGN_CONV, 'Sign convention: heat absorbed and work done on the system are positive, heat released and work done by the system are negative', 'ΔU = q + w'),
  pv: svgV(PV_WORK, 'Pressure volume graph comparing the work from a one-step, a two-step and a reversible isothermal expansion', 'Reversible expansion gives the largest work.'),
  cpcv: svgV(CP_CV, 'Heat against temperature rise for one mole of a monatomic ideal gas at constant volume and constant pressure', 'The gap between the lines is RΔT.'),
  vessels: svgV(VESSELS, 'Rigid vessel at constant volume and piston cylinder at constant pressure with the enthalpy bar for PCl5 decomposition', 'qV = ΔU; qp = ΔH.'),
};

const f0 = (x) => Math.round(x).toString();
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);

// ---- worked-example numbers (computed)
const adi = { n: 2.0, Cv: 12.5, w: -500 };
adi.dT = adi.w / (adi.n * adi.Cv);
const irr = { pext: 2.5, V1: 1.0, V2: 4.0 };
irr.wL = wIrrevLatm(irr.pext, irr.V1, irr.V2);
irr.wJ = wIrrev(irr.pext, irr.V1, irr.V2);
const rev = { n: 2.0, T: 300, V1: 4.0, V2: 20.0 };
rev.w = wRev(rev.n, rev.T, rev.V1, rev.V2);
rev.log = Math.log10(rev.V2 / rev.V1);
const no2 = { dU: -112.0, dn: -1, T: 298 };
no2.dH = dHfromU(no2.dU, no2.dn, no2.T);
no2.term = (no2.dn * R * no2.T) / 1000;
const heat = { n: 2.0, Cv: 20.8, dT: 40 };
heat.Cp = CpFromCv(heat.Cv);
heat.qv = heat.n * heat.Cv * heat.dT;
heat.qp = heat.n * heat.Cp * heat.dT;
heat.w = -heat.n * R * heat.dT;

export const deck1 = deck({
  part: 1,
  title: 'Thermodynamics: Systems and the First Law — Part 1: Systems, state functions, processes and the first law',
  goals: [
    'Classify systems as open, closed or isolated, and properties as intensive or extensive, state or path functions',
    'Identify thermodynamic processes from the quantity held constant, including reversible and cyclic processes',
    'Apply ΔU = q + w with the sign convention, and explain ΔU = 0 for cyclic and isolated systems',
  ],
  slides: [
    sl('title', 'Thermodynamics: energy changes in chemistry', {
      b: 'Part 1: thermodynamics tracks **energy exchanged as heat and work** between a chosen part of the universe (the **system**) and everything else (the **surroundings**). We start with what can cross the boundary.',
      v: V.systems,
      n: 'Welcome to thermodynamics. It is the study of energy changes, and it begins by choosing a part of the universe to watch. That part is the system. Everything else is the surroundings. What we can say about the system depends on what is allowed to cross the boundary between them.',
    }),
    sl('concept', 'System, surroundings and boundary', {
      b: r`The **system** is the part under study; the **surroundings** are everything else that can exchange energy or matter with it; the **boundary** separates them. System + surroundings = **universe**. A system is **open**, **closed** or **isolated**, according to what crosses the boundary.`,
      v: table(['Type', 'Matter exchange', 'Energy exchange', 'Example'], [['Open', 'Yes', 'Yes', 'Tea in an uncovered cup'], ['Closed', 'No', 'Yes (heat, work)', 'Sealed bottle of cola in a fridge'], ['Isolated', 'No', 'No', 'Tea in a stoppered vacuum flask (approximately)']], 'Table of open, closed and isolated systems with what each exchanges and an example'),
      n: 'The boundary may be real, like the glass of a flask, or imaginary. An open system exchanges both matter and energy. A closed system exchanges energy only, as heat or work. An isolated system exchanges neither. A perfect isolated system does not exist, but a good vacuum flask is close.',
    }),
    sl('concept', 'Classifying everyday systems', {
      b: 'Always decide **what the system is** first, then ask whether **matter** or **energy** can cross its boundary. The same object can be a different system depending on what you choose.',
      v: table(['System chosen', 'Type', 'Reason'], [['Water boiling in an open pan', 'Open', 'Steam leaves and heat enters'], ['Sealed ampoule of medicine on a warm shelf', 'Closed', 'Heat crosses; nothing leaves'], ['Hot coffee in a sealed vacuum flask', 'Isolated', 'Very little heat or matter crosses'], ['A living plant cell', 'Open', 'Exchanges water, gases and energy']], 'Table of four systems classified as open, closed or isolated with reasons'),
      n: 'Always start by naming the system. Boiling water in an open pan is open, because steam leaves and heat enters. A sealed ampoule is closed, because heat crosses but nothing leaves. Hot coffee in a sealed vacuum flask is nearly isolated. A living cell is open, since it exchanges water, gases and energy.',
    }),
    sl('diagram', 'Intensive and extensive properties', {
      b: r`An **extensive** property depends on the **amount** of matter (mass, volume, internal energy, enthalpy, heat capacity). An **intensive** property does not (temperature, pressure, density, molar volume, specific heat). A ratio of two extensive properties, such as $\text{mass}/\text{volume}$, is intensive.`,
      v: V.split,
      n: 'Divide a sample into two halves. Mass and volume are halved, so they are extensive. Temperature and density stay exactly the same, so they are intensive. A ratio of two extensive properties, for example mass divided by volume, is itself intensive, because the amount cancels.',
    }),
    sl('example', 'Worked example: classify the properties', {
      b: r`**Problem.** A chemist heats 100 g of water in a beaker, then doubles the sample to 200 g at the same temperature. Which of these change? Mass, temperature, density, enthalpy, molar heat capacity, volume.

Doubling the amount **doubles** the extensive properties: mass, enthalpy, volume. It leaves the **intensive** ones unchanged: temperature, density and molar heat capacity (a property per mole).`,
      v: table(['Property', 'Kind', 'Effect of doubling the sample'], [['Mass', 'Extensive', 'Doubles'], ['Volume', 'Extensive', 'Doubles'], ['Enthalpy', 'Extensive', 'Doubles'], ['Temperature', 'Intensive', 'Unchanged'], ['Density', 'Intensive', 'Unchanged'], ['Molar heat capacity', 'Intensive', 'Unchanged']], 'Table classifying six properties as extensive or intensive with the effect of doubling the sample'),
      n: 'Doubling the sample doubles every extensive property. Mass, volume and enthalpy all double. Intensive properties do not depend on the amount, so temperature, density and molar heat capacity stay the same. A property measured per mole or per gram is always intensive.',
    }),
    sl('check', 'Quick check: classifying a system', {
      b: 'Decide what can cross the boundary of the system.',
      n: 'Quick check. Look at the situation in the question and decide whether matter, energy, both or neither can cross the boundary of the system. Then choose the type of system that matches.',
      chk: 'chk-open-mcq',
    }),
    sl('concept', 'State of a system and state functions', {
      b: r`The **state** of a system is fixed by its measurable properties: $p$, $V$, $T$ and amount ($n$). A **state function** depends only on the **present state**, not on how it was reached, so its change depends only on the initial and final states. Examples: $U$, $H$, $p$, $V$, $T$. **Heat $q$ and work $w$** are not state functions: they depend on the **path**.`,
      v: V.paths,
      n: 'A state function has a value fixed by the present state alone. Its change between two states is the same however you get there. Pressure, volume, temperature, internal energy and enthalpy are state functions. Heat and work are not. They describe how energy is transferred, and they depend on the path taken.',
    }),
    sl('concept', 'State functions and path functions compared', {
      b: 'On the graph, the **same two end states** are joined by two routes. The change in internal energy is the same on both; the **work** is the area under each route and **differs**.',
      v: table(['Route', 'Steps', 'Work done on the gas', 'ΔU'], [['Path I', 'Cool at 2.0 L, then expand at 1.0 atm', `${f1(PATHS.wI)} L atm (${f0(PATHS.wIJ)} J)`, 'Same'], ['Path II', 'Expand at 4.0 atm, then cool at 6.0 L', `${f1(PATHS.wII)} L atm (${f0(PATHS.wIIJ)} J)`, 'Same']], 'Table comparing work on two paths between the same states'),
      n: 'Both routes start at the same state and end at the same state. On the first route the gas expands at a low pressure, and little work is done. On the second it expands at a high pressure, and much more work is done. The change in internal energy is identical, because it is a state function.',
    }),
    sl('diagram', 'Thermodynamic processes', {
      b: 'A **process** takes a system from one state to another. It is named by the **quantity held constant**: **isothermal** (T), **isobaric** (p), **isochoric** (V), **adiabatic** (no heat exchanged, q = 0). A **cyclic** process returns to the starting state.',
      v: V.procs,
      n: 'Here are four paths from one starting state. Isothermal keeps the temperature constant, so the curve is a hyperbola. Isobaric keeps the pressure constant, a horizontal line. Isochoric keeps the volume constant, a vertical line. Adiabatic allows no heat in or out, and falls more steeply than the isotherm.',
    }),
    sl('concept', 'Naming the process', {
      b: 'Read the condition, then name the process. The same table also gives the **simplification of the first law**.',
      v: table(['Process', 'Held constant or true', 'What it gives'], [['Isothermal', 'T constant', 'ΔU = 0 for an ideal gas'], ['Isobaric', 'p constant', 'Heat absorbed = ΔH'], ['Isochoric', 'V constant', 'w = 0 (no p-V work), so ΔU = q'], ['Adiabatic', 'q = 0', 'ΔU = w'], ['Cyclic', 'Final state = initial state', 'ΔU = 0, so q = −w']], 'Table of thermodynamic processes with the condition and the simplification of the first law'),
      n: 'Name the process from what stays constant. Isothermal means constant temperature. Isobaric means constant pressure, and the heat absorbed is the enthalpy change. Isochoric means constant volume, so no pressure volume work. Adiabatic means no heat exchange. In a cyclic process the system returns to its start.',
    }),
    sl('concept', 'Reversible and irreversible processes; equilibrium', {
      b: 'A **reversible** process is carried out **infinitely slowly**, so the system is in equilibrium at every stage and the driving force is only infinitesimally larger than the opposing force; it can be reversed by an infinitesimal change. Every **real** (spontaneous) process is **irreversible**. A system is in **thermodynamic equilibrium** when it is in thermal, mechanical and chemical equilibrium.',
      v: table(['Feature', 'Reversible', 'Irreversible'], [['Speed', 'Infinitely slow', 'Finite, fast'], ['Stages', 'Equilibrium at every stage', 'Not in equilibrium'], ['Driving force', 'Infinitesimal', 'Finite'], ['Work obtained in expansion', 'Maximum', 'Less than maximum']], 'Table comparing reversible and irreversible processes'),
      n: 'A reversible process is an ideal limit. It runs infinitely slowly, with the system in equilibrium at every stage, and the driving force only a whisker larger than the opposing force. All real processes are irreversible. Equilibrium means thermal, mechanical and chemical equilibrium together.',
    }),
    sl('check', 'Quick check: adiabatic changes', {
      b: 'What does adiabatic tell you about heat?',
      n: 'Quick check. Recall what the word adiabatic says about heat flow, and think about whether that is the same as saying the temperature is constant. Decide whether the statement is true or false.',
      chk: 'chk-adiab-tf',
    }),
    sl('diagram', 'The first law and its sign convention', {
      b: r`The **first law**: energy can be neither created nor destroyed; the **internal energy $U$** of a system changes only through heat and work. $$\Delta U = q + w$$ **Sign convention used here:** $q > 0$ when heat flows **into** the system; $w > 0$ when work is done **on** the system. So an expanding gas has $w < 0$.`,
      v: V.sign,
      n: 'This is the first law of thermodynamics. The change in internal energy equals heat plus work. We count energy flowing into the system as positive, and energy flowing out as negative. Work done on the system, such as compression, is positive. Work done by the system, such as expansion, is negative.',
    }),
    sl('concept', 'Special cases of the first law', {
      b: 'Combine the law with the process conditions. **Isolated system:** q = 0 and w = 0, so ΔU = 0: the internal energy of an isolated system is constant. **Cyclic process:** ΔU = 0 because U is a state function and the final state is the initial state, so q = −w.',
      v: table(['Situation', 'First law becomes', 'Meaning'], [['Isolated system', 'ΔU = 0', 'U constant (energy of the universe is constant)'], ['Cyclic process', 'q = −w', 'Net heat absorbed = net work done by the system'], ['Adiabatic change', 'ΔU = w', 'Compression warms, expansion cools'], ['Constant volume', 'ΔU = q', 'Heat changes only U'], ['Ideal gas, isothermal', 'q = −w', 'ΔU = 0; heat absorbed does expansion work']], 'Table of special cases of the first law'),
      n: 'In an isolated system nothing crosses the boundary, so internal energy stays constant. In a cyclic process the system comes back to its start, and since internal energy is a state function, its change is zero. So the heat absorbed over the cycle equals the work done by the system.',
    }),
    sl('example', 'Worked example: adiabatic expansion', {
      b: r`**Problem.** Two moles of an ideal gas with $C_V = ${adi.Cv}\ \text{J K}^{-1}\text{mol}^{-1}$ expand adiabatically and do ${-adi.w} J of work. Find $\Delta U$ and the change in temperature.

Adiabatic: $q = 0$. Work is done **by** the gas, so $w = ${adi.w}$ J. $\Delta U = q + w = 0 + (${adi.w}) = ${adi.w}$ J.

$\Delta U = n C_V \Delta T$, so $\Delta T = \dfrac{${adi.w}}{${adi.n} \times ${adi.Cv}} = ${f1(adi.dT)}$ K: the gas **cools** by ${f0(-adi.dT)} K.`,
      v: table(['Quantity', 'Value', 'Reason'], [['q', '0', 'Adiabatic'], ['w', `${adi.w} J`, 'Gas does work (expansion)'], ['ΔU', `${adi.w} J`, 'ΔU = q + w'], ['ΔT', `${f1(adi.dT)} K`, 'ΔU = n C_V ΔT']], 'Table of q, w, change in internal energy and temperature change in an adiabatic expansion'),
      n: 'In an adiabatic change, no heat is exchanged, so the change in internal energy equals the work. The gas does work, so the internal energy falls by five hundred joules. Dividing by the number of moles and the heat capacity at constant volume gives a temperature fall of twenty kelvin.',
    }),
    sl('diagram', 'Cyclic processes', {
      b: r`Over one complete cycle the system returns to its start, so $\Delta U = 0$ and $q = -w$. On a p–V graph, the **net work equals the area enclosed** by the loop. A clockwise loop means **net work done by the gas**: here ${f1(-CYC.net)} L atm, or ${f0(-CYC.netJ)} J.`,
      v: V.cycle,
      n: 'Here the gas goes round a loop and returns to its starting state. The change in internal energy over the whole loop is zero. The area enclosed by the loop is the net work. Going clockwise, the gas expands at high pressure and is compressed at low pressure, so it delivers net work to the surroundings.',
    }),
    sl('check', 'Quick check: signs in the first law', {
      b: 'Assign the signs of q and w, then add.',
      n: 'Quick check. Decide the sign of the heat and the sign of the work from the wording of the question, remembering that work done on the system is positive. Then add them to get the change in internal energy.',
      chk: 'chk-sign-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Open systems exchange matter and energy; closed systems energy only; isolated systems neither.',
        'Extensive properties depend on the amount (mass, V, U, H); intensive ones do not (T, p, density). A ratio of extensive properties is intensive.',
        'State functions (U, H, p, V, T) depend only on the states; q and w are path functions.',
        'Process names: isothermal, isobaric, isochoric, adiabatic (q = 0), cyclic (ΔU = 0); real processes are irreversible.',
        'First law: ΔU = q + w, with q and w positive when energy enters the system; ΔU = 0 for isolated and cyclic systems.',
      ],
      v: table(['Idea', 'Key fact'], [['System types', 'Open, closed, isolated'], ['State function', 'Path independent'], ['First law', 'ΔU = q + w'], ['Cycle', 'ΔU = 0, q = −w']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Systems are open, closed or isolated. Extensive properties depend on the amount, intensive ones do not. State functions depend only on the states, while heat and work depend on the path. The first law says the change in internal energy equals heat plus work, and it is zero for a cycle.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State your sign convention before using the first law: q positive into the system, w positive when work is done on the system.',
        'Work done BY a gas in expansion goes into the equation as a negative number.',
        'Always name the system before classifying it as open, closed or isolated.',
        'Say "state function: depends only on initial and final states" and give two examples.',
        'Adiabatic means q = 0, not constant temperature.',
      ],
      v: table(['Slip', 'Fix'], [['Writing ΔU = q − w without saying the convention', 'Use ΔU = q + w and state that w is on the system'], ['Calling heat a state function', 'Heat and work are path functions'], ['Adiabatic = isothermal', 'Adiabatic: q = 0; isothermal: T constant']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips for Part One. State your sign convention before using the first law. Remember that work done by an expanding gas is negative. Name the system before you classify it. Define a state function as one that depends only on the initial and final states. And never confuse adiabatic with isothermal.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Thermodynamics: Systems and the First Law — Part 2: Work of expansion, enthalpy and heat capacity',
  goals: [
    'Calculate work of expansion for irreversible and reversible isothermal changes and compare them on a p–V graph',
    'Define enthalpy and relate ΔH and ΔU using ΔH = ΔU + Δn(g)RT',
    'Use heat capacity and specific heat, relate C_V to ΔU, and derive C_p − C_V = R',
  ],
  slides: [
    sl('title', 'Work of expansion: how much can a gas deliver?', {
      b: 'Part 2: a gas pushing a piston does **p–V work**. How much work you get depends on **how** the expansion is carried out, and we then meet **enthalpy** and **heat capacity**.',
      v: V.paths,
      n: 'Welcome to Part Two. A gas that pushes a piston does pressure volume work, and the amount of work depends on how the expansion is carried out. We calculate it for different routes, then introduce enthalpy and heat capacity, two quantities that chemists use constantly.',
    }),
    sl('concept', 'Work of expansion against a constant external pressure', {
      b: r`For a gas pushing against a **constant external pressure** $p_\text{ext}$, with volume changing by $\Delta V = V_2 - V_1$: $$w = -p_\text{ext}\,\Delta V$$ The minus sign makes $w$ negative for expansion (work **by** the gas), positive for compression. Units: $1\ \text{L atm} = 101.3\ \text{J}$. In **free expansion** into a vacuum $p_\text{ext} = 0$, so $w = 0$.`,
      v: table(['Change', 'ΔV', 'Sign of w'], [['Expansion', 'Positive', 'Negative (system does work)'], ['Compression', 'Negative', 'Positive (work done on system)'], ['Free expansion (p_ext = 0)', 'Positive', 'Zero'], ['Constant volume', 'Zero', 'Zero']], 'Table of the sign of work for expansion, compression, free expansion and constant volume'),
      n: 'Work against a constant external pressure is minus the pressure times the change in volume. Expansion gives a negative work, because the gas does the work. In a free expansion into a vacuum, the external pressure is zero, so no work is done. One litre atmosphere is about one hundred and one joules.',
    }),
    sl('concept', 'Reversible isothermal work', {
      b: r`In a **reversible** isothermal expansion of an ideal gas the external pressure is always only infinitesimally less than the gas pressure. Integrating gives $$w_\text{rev} = -2.303\,nRT\log_{10}\frac{V_2}{V_1} = -2.303\,nRT\log_{10}\frac{p_1}{p_2}$$ For an ideal gas $\Delta U = 0$ at constant $T$, so $q = -w$: the gas **absorbs** as much heat as the work it does.`,
      v: table(['Quantity', 'Reversible isothermal, ideal gas'], [['ΔU', '0 (T constant)'], ['w', '−2.303 nRT log(V₂/V₁)'], ['q', '+2.303 nRT log(V₂/V₁)'], ['Work obtained', 'Maximum possible']], 'Table of ΔU, w and q for a reversible isothermal expansion of an ideal gas'),
      n: 'For a reversible isothermal expansion of an ideal gas, the work is minus two point three zero three times n R T times the logarithm of the volume ratio. The temperature is constant, so the internal energy does not change, and the heat absorbed exactly equals the work done by the gas.',
    }),
    sl('example', 'Worked example: irreversible expansion', {
      b: r`**Problem.** A gas in a cylinder expands from ${irr.V1} L to ${irr.V2} L against a constant external pressure of ${irr.pext} atm. Find the work done on the gas in joules.

$\Delta V = ${irr.V2} - ${irr.V1} = ${f1(irr.V2 - irr.V1)}$ L. $w = -p_\text{ext}\Delta V = -${irr.pext} \times ${f1(irr.V2 - irr.V1)} = ${f1(irr.wL)}$ L atm.

$w = ${f1(irr.wL)} \times 101.3 = ${f0(irr.wJ)}$ J (negative: the gas does the work).`,
      v: table(['Step', 'Result'], [['ΔV', `${f1(irr.V2 - irr.V1)} L`], ['w in L atm', `${f1(irr.wL)}`], ['w in joules (× 101.3)', `${f0(irr.wJ)} J`]], 'Table of the steps in an irreversible work calculation'),
      n: 'First find the change in volume, which is three litres. Multiply by the external pressure and put in the minus sign for expansion. That gives minus seven point five litre atmospheres. Multiplying by one hundred and one point three converts it to about minus seven hundred and sixty joules.',
    }),
    sl('example', 'Worked example: reversible isothermal expansion', {
      b: r`**Problem.** Two moles of an ideal gas expand reversibly and isothermally at ${rev.T} K from ${rev.V1} L to ${rev.V2} L. Find $w$ and $q$. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)

$\log_{10}(${rev.V2}/${rev.V1}) = \log_{10} 5 = ${f3(rev.log)}$.

$w = -2.303 \times ${rev.n} \times 8.314 \times ${rev.T} \times ${f3(rev.log)} = ${f0(rev.w)}$ J. Since $\Delta U = 0$, $q = +${f0(-rev.w)}$ J.`,
      v: table(['Quantity', 'Value'], [['log(V₂/V₁)', f3(rev.log)], ['w', `${f0(rev.w)} J`], ['ΔU', '0'], ['q', `+${f0(-rev.w)} J`]], 'Table of w, q and change in internal energy for the reversible isothermal expansion'),
      n: 'The volume ratio is five, and its common logarithm is point six nine nine. Substituting into the reversible work formula gives a work of about minus eight thousand joules. The internal energy does not change at constant temperature, so the gas absorbs the same amount of heat from the surroundings.',
    }),
    sl('check', 'Quick check: work against a constant pressure', {
      b: 'Find ΔV, multiply by the external pressure, and attach the sign.',
      n: 'Quick check. Work out the change in volume, multiply by the constant external pressure, and give the work the correct sign. Remember that a gas pushing out against the surroundings does negative work in our convention.',
      chk: 'chk-work-num',
    }),
    sl('diagram', 'Reversible against irreversible work on a p–V graph', {
      b: r`Work is the **area under the p–V curve**. A gas expanding from 8.0 atm to 2.0 atm at 300 K delivers **${f0(-CMP.w1)} J** in one step, **${f0(-CMP.w2)} J** in two steps, and the **maximum ${f0(-CMP.wr)} J** if reversible. Reversible work is the greatest because the gas always pushes against nearly its own pressure.`,
      v: V.pv,
      n: 'The red curve is the reversible path. In one step the gas pushes against only the final pressure, and the work is the blue rectangle. With two steps the green area is added, and more work is obtained. The more steps, the closer we get to the curve, whose area is the maximum work.',
    }),
    sl('concept', 'Why reversible work is the maximum', {
      b: 'In the **one-step** expansion the opposing pressure is the low final value for the whole change, so the area is small. The **reversible** path keeps the opposing pressure just below the gas pressure at every volume, so the area under the curve is the **largest possible**. For compression the reverse holds: the **reversible path needs the least work**.',
      v: table(['Route', 'Opposing pressure', 'Work obtained (J)'], [['One step', 'Final pressure, 2.0 atm', f0(-CMP.w1)], ['Two steps', '4.0 atm, then 2.0 atm', f0(-CMP.w2)], ['Reversible', 'Always about equal to p_gas', f0(-CMP.wr)]], 'Table of work obtained from the one-step, two-step and reversible expansion'),
      n: 'In a single step the opposing pressure is low from the start, so the area under the graph is small. A reversible path always keeps the opposing pressure just below the gas pressure, and gets the largest area. For compression the opposite is true, and the reversible path needs the least work.',
    }),
    sl('diagram', 'Enthalpy', {
      b: r`**Enthalpy** is defined as $H = U + pV$. It is a **state function** (U, p and V are) and **extensive**. At constant pressure the only work is $p\Delta V$, so the heat absorbed is $q_p = \Delta U + p\Delta V = \Delta H$. At constant volume, $q_V = \Delta U$.`,
      v: V.vessels,
      n: 'Enthalpy is the internal energy plus pressure times volume. It is a state function. At constant volume the heat measured is the change in internal energy. At constant pressure, a part of the heat goes into the expansion work, and the heat measured is the change in enthalpy.',
    }),
    sl('concept', 'Relation between ΔH and ΔU', {
      b: r`For gases treated as ideal, $p\Delta V = \Delta n_g RT$, so $$\Delta H = \Delta U + \Delta n_g\,RT$$ where $\Delta n_g$ = moles of gaseous products − moles of gaseous reactants. Solids and liquids contribute almost no $p\Delta V$. If $\Delta n_g = 0$, $\Delta H = \Delta U$.`,
      v: table(['Reaction (all gases unless shown)', 'Δn_g', 'ΔH compared with ΔU'], [['H₂(g) + I₂(g) → 2HI(g)', '0', 'Equal'], ['PCl₅(g) → PCl₃(g) + Cl₂(g)', '+1', 'ΔH larger by RT'], ['2NO(g) + O₂(g) → 2NO₂(g)', '−1', 'ΔH smaller by RT'], ['CaCO₃(s) → CaO(s) + CO₂(g)', '+1', 'ΔH larger by RT']], 'Table of four reactions with the change in moles of gas and the comparison of enthalpy and internal energy changes'),
      n: 'For ideal gases, pressure times the volume change equals the change in moles of gas times R T. So the enthalpy change equals the internal energy change plus that term. Count only gaseous substances. If the moles of gas do not change, the two are equal, and solids and liquids hardly matter.',
    }),
    sl('example', 'Worked example: from ΔU to ΔH', {
      b: r`**Problem.** For $\ce{2NO(g) + O2(g) -> 2NO2(g)}$ at ${no2.T} K, $\Delta U = ${no2.dU}$ kJ (given). Find $\Delta H$.

$\Delta n_g = 2 - 3 = ${no2.dn}$. $\Delta n_g RT = (${no2.dn}) \times 8.314 \times 10^{-3} \times ${no2.T} = ${f2(no2.term)}$ kJ.

$\Delta H = \Delta U + \Delta n_g RT = ${no2.dU} + (${f2(no2.term)}) = ${f1(no2.dH)}$ kJ.`,
      v: table(['Quantity', 'Value'], [['Δn_g', String(no2.dn)], ['Δn_g RT', `${f2(no2.term)} kJ`], ['ΔU', `${no2.dU} kJ`], ['ΔH', `${f1(no2.dH)} kJ`]], 'Table of the steps from internal energy change to enthalpy change'),
      n: 'Count the gases. Two product moles minus three reactant moles gives minus one. Multiply by R T, taking care to convert joules to kilojoules, to get minus two point four eight kilojoules. Adding that to the internal energy change gives an enthalpy change of about minus one hundred and fourteen point five kilojoules.',
    }),
    sl('check', 'Quick check: enthalpy and internal energy', {
      b: 'Count the moles of gas on each side.',
      n: 'Quick check. Count only the gaseous substances on each side of the equation, find the change in the number of moles of gas, and use it to decide how the enthalpy change compares with the internal energy change.',
      chk: 'chk-dn-mcq',
    }),
    sl('concept', 'Heat capacity and specific heat', {
      b: r`**Heat capacity** $C$ is the heat needed to raise the temperature of a given sample by 1 K: $q = C\Delta T$ (J K⁻¹, extensive). **Specific heat** $c$ is per gram: $q = mc\Delta T$ (J g⁻¹ K⁻¹). **Molar heat capacity** $C_m$ is per mole: $q = nC_m\Delta T$ (J K⁻¹ mol⁻¹). $c$ and $C_m$ are intensive.`,
      v: table(['Quantity', 'Symbol', 'Unit', 'Kind'], [['Heat capacity', 'C', 'J K⁻¹', 'Extensive'], ['Specific heat', 'c', 'J g⁻¹ K⁻¹', 'Intensive'], ['Molar heat capacity', 'C_m', 'J K⁻¹ mol⁻¹', 'Intensive'], ['Water (for reference)', 'c', '4.18 J g⁻¹ K⁻¹', '75.3 J K⁻¹ mol⁻¹']], 'Table of heat capacity, specific heat and molar heat capacity with units'),
      n: 'Heat capacity is the heat needed to raise the temperature of a whole sample by one kelvin, so it depends on the amount. Specific heat is the same per gram, and molar heat capacity is the same per mole. Those two do not depend on the amount, and they characterise the substance.',
    }),
    sl('diagram', 'Heat capacity at constant volume and constant pressure', {
      b: r`A gas can be heated at **constant volume** ($q_V = nC_V\Delta T$) or at **constant pressure** ($q_p = nC_p\Delta T$). At constant pressure it also expands and does work, so more heat is needed for the same $\Delta T$: $C_p > C_V$. For one mole of a monatomic ideal gas the gap after ${100} K is $R\Delta T = ${f0(R * 100)}$ J.`,
      v: V.cpcv,
      n: 'Both lines start at zero. At constant volume all of the heat raises the internal energy, so the line is lower. At constant pressure the gas also expands, so extra heat is needed for the same temperature rise. The gap between the two lines is the expansion work, R times the temperature change.',
    }),
    sl('concept', 'C_V, ΔU and the relation C_p − C_V = R', {
      b: r`For an ideal gas $U$ depends only on $T$, so $\Delta U = nC_V\Delta T$ for **any** process (not only at constant volume). Since $H = U + pV = U + RT$ per mole, $\dfrac{dH}{dT} = \dfrac{dU}{dT} + R$, that is $$C_p - C_V = R$$ (8.314 J K⁻¹ mol⁻¹). The extra heat at constant pressure is the work $p\Delta V = R\Delta T$.`,
      v: table(['Quantity', 'Expression', 'Applies to'], [['ΔU', 'n C_V ΔT', 'Ideal gas, any process'], ['ΔH', 'n C_p ΔT', 'Ideal gas, any process'], ['q at constant V', 'n C_V ΔT', 'Constant volume only'], ['q at constant p', 'n C_p ΔT', 'Constant pressure only'], ['C_p − C_V', 'R', 'One mole of ideal gas']], 'Table of the expressions for internal energy change, enthalpy change and heats with heat capacities'),
      n: 'For an ideal gas the internal energy depends on temperature alone, so the change in internal energy is n times the heat capacity at constant volume times the temperature change, whatever the process. Differentiating enthalpy with respect to temperature shows that the two heat capacities differ by R.',
    }),
    sl('example', 'Worked example: heating at constant V and at constant p', {
      b: r`**Problem.** Two moles of an ideal gas with $C_V = ${heat.Cv}\ \text{J K}^{-1}\text{mol}^{-1}$ are heated by ${heat.dT} K. Find $q_V$, $q_p$ and the work at constant pressure.

$C_p = C_V + R = ${heat.Cv} + 8.314 = ${f1(heat.Cp)}$. $q_V = \Delta U = ${heat.n} \times ${heat.Cv} \times ${heat.dT} = ${f0(heat.qv)}$ J. $q_p = ${heat.n} \times ${f1(heat.Cp)} \times ${heat.dT} = ${f0(heat.qp)}$ J.

$w = \Delta U - q_p = ${f0(heat.qv)} - ${f0(heat.qp)} = ${f0(heat.w)}$ J $= -nR\Delta T$.`,
      v: table(['Quantity', 'Value (J)'], [['C_p (J K⁻¹ mol⁻¹)', f1(heat.Cp)], ['q_V = ΔU', f0(heat.qv)], ['q_p = ΔH', f0(heat.qp)], ['w at constant p', f0(heat.w)]], 'Table of heats and work for heating an ideal gas at constant volume and at constant pressure'),
      n: 'First add R to the heat capacity at constant volume to get the heat capacity at constant pressure. At constant volume the heat equals the internal energy change. At constant pressure more heat is needed. The difference between the two is the work of expansion, which is minus n R times the temperature change.',
    }),
    sl('check', 'Quick check: why Cp is larger', {
      b: 'Where does the extra heat go at constant pressure?',
      n: 'Quick check. Read both statements carefully. Decide whether each is true, and then whether the second one is the reason for the first, thinking about where the extra heat goes when a gas is heated at constant pressure.',
      chk: 'chk-cpcv-ar',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Work against constant pressure: w = −p_ext ΔV (1 L atm = 101.3 J); free expansion has w = 0.',
        'Reversible isothermal work of an ideal gas: w = −2.303 nRT log(V₂/V₁), q = −w; it is the maximum work.',
        'Enthalpy H = U + pV; q_p = ΔH and q_V = ΔU; ΔH = ΔU + Δn_g RT.',
        'q = mcΔT = CΔT; ΔU = n C_V ΔT for an ideal gas; C_p − C_V = R.',
      ],
      v: table(['Idea', 'Key fact'], [['Irreversible work', 'w = −p_ext ΔV'], ['Reversible work', 'Maximum; area under isotherm'], ['Enthalpy', 'ΔH = ΔU + Δn_g RT'], ['Heat capacities', 'C_p − C_V = R']], 'Summary table of the key ideas of Part 2'),
      n: 'Let us sum up Part Two. Work against a constant pressure is minus pressure times the volume change. Reversible isothermal work is the largest, and equals the area under the isotherm. Enthalpy is the heat at constant pressure, and differs from the internal energy change by the change in moles of gas times R T. The heat capacities differ by R.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert L atm to J with 101.3 before comparing with kJ or J answers; write R = 8.314 J K⁻¹ mol⁻¹ when R is in joules.',
        'In ΔH = ΔU + Δn_g RT count only gases and convert RT to kJ if ΔU is in kJ.',
        'For reversible work use 2.303 and log to base 10; the ratio is V₂/V₁ or p₁/p₂.',
        'Say clearly: reversible work is the maximum because p_ext differs from p_gas only infinitesimally.',
        'ΔU = n C_V ΔT even when the heating is at constant pressure.',
      ],
      v: table(['Slip', 'Fix'], [['Using joules and kJ together', 'Convert RT to kJ (÷ 1000)'], ['Counting solids and liquids in Δn_g', 'Gases only'], ['Using C_p for ΔU', 'ΔU uses C_V, ΔH uses C_p']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips for Part Two. Convert litre atmospheres to joules before you combine them with other energies. Count only gases when you find the change in moles. Use the common logarithm with two point three zero three for reversible work. And remember that internal energy change always uses the heat capacity at constant volume.',
    }),
  ],
});
