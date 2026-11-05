// ch11 Thermodynamics — question bank, part 1: t01 (equilibrium, zeroth law, heat, work, internal energy) and
// t02 (first law, work as an area, specific heats). Every numerical is computed here and re-solved by an independent
// `check`; solutions and schemes print the computed values. Pressures in kPa and volumes in litres give work in joules.
// AR keys planned across the chapter: b (thermometer), a (isochoric), d (isothermal), c (COP), a (heat to the kitchen).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, integ, R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

// ================================================================ t01 equilibrium, zeroth law, heat, work, internal energy
add('zeroth-mcq', mcq({
  stem: 'In a school laboratory a steel ball and a brass cylinder are pressed, one after the other, against the bulb of the same mercury thermometer, and each time it reads 35 °C. Without bringing the two bodies together, the teacher says they would show no net heat flow if they were placed in contact. This conclusion rests on',
  right: 'the zeroth law of thermodynamics',
  wrong: ['the first law of thermodynamics', 'the Kelvin–Planck statement of the second law', 'Newton’s law of cooling'],
  sol: 'Both bodies are in thermal equilibrium with the thermometer, so they are in thermal equilibrium with each other: this is the zeroth law — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('heat-mcq', mcq({
  stem: 'A red-hot copper rod is dropped into a bucket of water and the water warms up. Which description is physically correct?',
  right: 'Energy passes from the rod to the water because of the temperature difference; the energy transferred in this way is called heat',
  wrong: ['The rod contained a store of heat, which has now been poured into the water', 'The rod has done work on the water, since the temperature of the water has changed', 'The internal energy of the rod has risen while that of the water has fallen'],
  sol: 'Heat is energy in transit driven by a temperature difference; it is not a stored quantity. The rod’s internal energy falls and the water’s rises — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('statefn-mcq', mcq({
  stem: 'A fixed mass of gas is taken from state X to state Y by two different routes. Which quantity must have the same value on both routes?',
  right: 'the change in the internal energy of the gas',
  wrong: ['the heat absorbed by the gas', 'the work done by the gas', 'the sum of the heat absorbed and the work done by the gas'],
  sol: 'Internal energy is a state function, so ΔU depends only on X and Y. Q and W depend on the route. Because ΔU = Q − W, the sum Q + W also changes with the route — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('internal-fill', fill({
  stem: 'The total energy of the random motion and the mutual interaction of all the molecules of the gas in a closed cylinder, measured with the cylinder’s centre of mass at rest, is called the ___ energy of the gas.',
  acc: [['internal']],
  sol: 'It is the **internal** energy of the gas, a function of its state.',
  d: 1, c: 'recall', t: [1],
}));
add('heatcontent-tf', tf({
  stem: 'A hot iron spoon contains more heat than an identical cold spoon, which is why heat is described as a property stored in the spoon.',
  key: 'f',
  sol: 'False. Heat is energy in transit because of a temperature difference. The hot spoon has more internal energy, but "heat" is the name of the transfer, not of a stored quantity.',
  d: 2, c: 'understanding', t: [1],
}));
add('tempeq-ar', ar({
  a: 'With a thermometer, a student can say whether two bodies would exchange heat without bringing the bodies into contact.',
  r: 'The kelvin is the SI unit of temperature.',
  key: 'b',
  sol: 'Both statements are true. A follows from the zeroth law (equal readings mean equal temperatures), but the choice of unit does not explain it — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
const bus = { m: 9000, kmh: 36, C: 120000 };
bus.v = bus.kmh / 3.6;
bus.KE = 0.5 * bus.m * bus.v ** 2;
bus.dT = bus.KE / bus.C;
add('brake-num', num({
  stem: 'A city bus of mass 9000 kg slows from 36 km/h to rest on a level road. Its brake assembly absorbs all the kinetic energy and has a total heat capacity of 120 kJ/K. Find the rise in the temperature of the brakes, in K.',
  value: bus.dT, tol: 0.02, unit: 'K',
  sol: r`$v = 36$ km/h $= ${bus.v}$ m/s, so the kinetic energy given to the brakes is $\tfrac{1}{2}mv^2 = \tfrac{1}{2} \times ${bus.m} \times ${bus.v ** 2} = ${bus.KE}$ J. Then $\Delta T = \dfrac{${bus.KE}}{${bus.C}} = ${bus.dT}$ K.`,
  scheme: [[`KE = ½mv² = ${bus.KE} J (v = ${bus.v} m/s)`, 1], [`ΔT = KE/C = ${bus.KE}/${bus.C} = ${bus.dT} K`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(0.5 * 9000 * 10 ** 2 / 120000, q.answer.value, 1e-9) && bus.dT === 3.75 || 'brake');
add('zeroth-short', short({
  marks: 2,
  stem: 'State the zeroth law of thermodynamics and explain how it makes a thermometer a meaningful instrument.',
  model: 'The **zeroth law**: if two bodies are each in thermal equilibrium with a third body, they are in thermal equilibrium with each other. The thermometer is the third body: equal readings on two bodies mean equal temperatures, so the bodies would exchange no net heat if put in contact.',
  sol: 'Statement of the law; thermometer as the third body.',
  scheme: [['Statement: A and B each in equilibrium with C ⇒ A and B in equilibrium', 1], ['Thermometer is the third body: equal readings mean equal temperature, no net heat flow', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('wall-short', short({
  marks: 2,
  stem: 'Distinguish an adiabatic wall from a diathermic wall, and say what happens to the temperatures of two systems separated by each.',
  model: 'An **adiabatic wall** does not let heat pass: two systems separated by it keep their own temperatures, even if these differ. A **diathermic wall** lets heat pass: two systems separated by it exchange heat until they reach one common temperature, that is, thermal equilibrium.',
  sol: 'Adiabatic blocks heat; diathermic allows it, ending in equilibrium.',
  scheme: [['Adiabatic wall blocks heat; the systems keep different temperatures', 1], ['Diathermic wall allows heat flow until the temperatures become equal', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('heatworkU-short3', short({
  marks: 3,
  stem: 'Distinguish between heat, work and internal energy of a gas, and say which of the three depend on the path by which the gas goes from one state to another.',
  model: '**Heat** is energy transferred between a system and its surroundings because of a temperature difference; **work** is energy transferred when a force acts through a displacement, as when a gas pushes a piston. Both are energy in transit. **Internal energy** is the energy of the molecules, a property of the state. Heat and work depend on the path; internal energy does not.',
  sol: 'Definitions; heat and work are path dependent; U is a state function.',
  scheme: [['Heat: energy transfer due to temperature difference', 1], ['Work: transfer by a force through a displacement; internal energy: molecular energy of the state', 1], ['Q and W are path dependent; U depends only on the state', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));

// ================================================================ t02 first law, work as an area, specific heats
add('sign-mcq', mcq({
  stem: 'A gas in a cylinder is compressed so that 150 J of work is done on it, while it loses 40 J of heat to the surroundings. The change in the internal energy of the gas is',
  right: '+110 J',
  wrong: ['+190 J', '−110 J', '−190 J'],
  sol: r`Heat into the gas $Q = -40$ J; work done by the gas $W = -150$ J. $\Delta U = Q - W = -40 - (-150) = +110$ J — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => -40 - -150 === 110 || 'sign');
const fl = { Q: 640, W: 260 };
fl.dU = fl.Q - fl.W;
add('fl-num', num({
  stem: 'A gas in a cylinder absorbs 640 J of heat and does 260 J of work in pushing the piston out. Find the increase in the internal energy of the gas, in J.',
  value: fl.dU, tol: 0.5, unit: 'J',
  sol: r`$\Delta U = Q - W = ${fl.Q} - ${fl.W} = ${fl.dU}$ J.`,
  scheme: [[`ΔU = Q − W = ${fl.Q} − ${fl.W} = ${fl.dU} J`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => 640 - 260 === q.answer.value || 'fl');
const ib = { P: 1.5e5, V1: 4.0, V2: 9.0 };
ib.dV = R6((ib.V2 - ib.V1) * 1e-3); // m^3
ib.W = R6(ib.P * ib.dV);
add('isobwork-num', num({
  stem: 'A gas in a cylinder with a free piston pushes it out at a steady pressure of 1.5 × 10⁵ Pa while its volume grows from 4.0 L to 9.0 L. Find the work done by the gas, in J.',
  value: ib.W, tol: 1, unit: 'J',
  sol: r`$\Delta V = (9.0 - 4.0)\ \text{L} = 5.0 \times 10^{-3}\ \text{m}^3$. $W = P\,\Delta V = 1.5 \times 10^{5} \times 5.0 \times 10^{-3} = ${ib.W}$ J.`,
  scheme: [['ΔV = 5.0 L = 5.0 × 10⁻³ m³', 1], [`W = PΔV = ${ib.W} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(150 * (9 - 4), q.answer.value, 1e-9) || 'isobwork');
const tz = { V1: 1.5, P1: 400, V2: 4.5, P2: 150 };
tz.W = ((tz.P1 + tz.P2) / 2) * (tz.V2 - tz.V1);
add('trap-num', num({
  stem: 'On a P–V diagram a gas goes from (1.5 L, 400 kPa) to (4.5 L, 150 kPa) along a straight line. Find the work done by the gas, in J.',
  value: tz.W, tol: 1, unit: 'J',
  sol: r`Work = area under the line = trapezoid $= \tfrac{1}{2}(${tz.P1} + ${tz.P2}) \times (${tz.V2} - ${tz.V1}) = ${tz.W}$ J (kPa × L = J).`,
  scheme: [['Area under the straight line is a trapezoid', 1], [`W = ½(${tz.P1} + ${tz.P2}) × ${tz.V2 - tz.V1} = ${tz.W} J`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(integ((v) => tz.P1 + ((tz.P2 - tz.P1) * (v - tz.V1)) / (tz.V2 - tz.V1), tz.V1, tz.V2), q.answer.value, 1e-9) || 'trap');
const qp = { Q1: 900, W1: 500, W2: 300 };
qp.dU = qp.Q1 - qp.W1;
qp.Q2 = qp.dU + qp.W2;
add('qpath-num', num({
  stem: 'A gas is taken from state A to state B by path 1, absorbing 900 J of heat and doing 500 J of work. By path 2, between the same two states, it does 300 J of work. Find the heat it absorbs along path 2, in J.',
  value: qp.Q2, tol: 1, unit: 'J',
  sol: r`Internal energy is a state function: $\Delta U = Q_1 - W_1 = ${qp.Q1} - ${qp.W1} = ${qp.dU}$ J on either path. Path 2: $Q_2 = \Delta U + W_2 = ${qp.dU} + ${qp.W2} = ${qp.Q2}$ J.`,
  scheme: [[`ΔU = 900 − 500 = ${qp.dU} J, the same on both paths`, 1], [`Q₂ = ΔU + W₂ = ${qp.dU} + ${qp.W2} = ${qp.Q2} J`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => 900 - 500 + 300 === q.answer.value || 'qpath');
const cg = { gamma: 1.4 };
cg.Cv = R / (cg.gamma - 1);
add('cvgam-num', num({
  stem: 'A gas has γ = Cp/Cv = 1.40. Using Cp − Cv = R with R = 8.314 J mol⁻¹ K⁻¹, find Cv in J mol⁻¹ K⁻¹ (3 significant figures).',
  value: v3(cg.Cv), tol: 0.1, unit: 'J mol⁻¹ K⁻¹',
  sol: r`$C_p = \gamma C_v$, so $(\gamma - 1)C_v = R$ and $C_v = \dfrac{R}{\gamma - 1} = \dfrac{8.314}{0.40} = ${dec(cg.Cv, 3)}$ J mol$^{-1}$ K$^{-1}$.`,
  scheme: [['Cp = γCv and Cp − Cv = R give (γ − 1)Cv = R', 1], [`Cv = 8.314/0.40 = ${dec(cg.Cv, 3)} J mol⁻¹ K⁻¹`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(R / 0.4, q.answer.value, 0.003) && near(R / 0.4 + R, 1.4 * (R / 0.4), 1e-9) || 'cvgam');
const ph = { n: 3.0, dT: 30 };
ph.Cp = 2.5 * R;
ph.Q = ph.n * ph.Cp * ph.dT;
add('cpheat-num', num({
  stem: 'A monatomic ideal gas has Cv = 3R/2 with R = 8.314 J mol⁻¹ K⁻¹. Find the heat needed to raise the temperature of 3.0 mol of it by 30 K at constant pressure, in J (3 significant figures).',
  value: v3(ph.Q), tol: 5, unit: 'J',
  sol: r`$C_p = C_v + R = \tfrac{3}{2}R + R = \tfrac{5}{2}R = ${dec(ph.Cp, 5)}$ J mol$^{-1}$ K$^{-1}$. $Q = nC_p\Delta T = ${ph.n} \times ${dec(ph.Cp, 5)} \times ${ph.dT} = ${dec(ph.Q, 4)}$ J, that is about ${dec(ph.Q, 3)} J.`,
  scheme: [[`Cp = 5R/2 = ${dec(ph.Cp, 5)} J mol⁻¹ K⁻¹`, 1], [`Q = nCpΔT = ${dec(ph.Q, 4)} J ≈ ${v3(ph.Q)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(3 * (1.5 * R + R) * 30, q.answer.value, 0.005) && near(ph.Q - 3 * R * 30, 3 * 1.5 * R * 30, 1e-9) || 'cpheat');
add('cpgt-mcq', mcq({
  stem: 'More heat is needed to warm a sample of gas by 10 K at constant pressure than at constant volume. The reason is that at constant pressure',
  right: 'the gas expands and does work on its surroundings, so extra heat is needed beyond what raises its internal energy',
  wrong: ['the gas contains more molecules than at constant volume', 'the internal energy of an ideal gas rises more for the same temperature change', 'heat is lost to the cylinder walls only when the volume is held fixed'],
  sol: r`For an ideal gas $\Delta U = nC_v\Delta T$ is the same in both cases; at constant pressure the gas also does work $P\Delta V = nR\Delta T$, so $C_p = C_v + R$ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('pvarea-mcq', mcq({
  stem: 'On a P–V diagram a gas is compressed at a steady 200 kPa from 6.0 L to 2.0 L. The work done by the gas is',
  right: '−800 J',
  wrong: ['+800 J', '−400 J', '−1200 J'],
  sol: r`$W = P\,\Delta V = 200 \times (2.0 - 6.0) = -800$ J (kPa × L = J). The negative sign shows that work is done on the gas — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => 200 * (2 - 6) === -800 || 'pvarea');
add('isochoric-ar', ar({
  a: 'When a gas in a sealed rigid cylinder is heated, all the heat supplied goes into raising its internal energy.',
  r: 'A gas whose volume does not change does no work on its surroundings.',
  key: 'a',
  sol: 'R is true (W = P ΔV = 0 when ΔV = 0), and with W = 0 the first law gives Q = ΔU, which is A. R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('firstlaw-short', short({
  marks: 2,
  stem: 'State the first law of thermodynamics with the sign convention you use, and say which general principle of physics it expresses.',
  model: 'The heat **Q** supplied to a system equals the increase in its internal energy **ΔU** plus the work **W** done by it: ΔU = Q − W. Heat into the system and work done by the system are taken as positive. It expresses the **conservation of energy**, with heat counted as a form of energy transfer.',
  sol: 'ΔU = Q − W with signs; conservation of energy.',
  scheme: [['ΔU = Q − W; Q positive into the system, W positive when done by it', 1], ['Statement of conservation of energy', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cpgt-short', short({
  marks: 2,
  stem: 'Explain why the molar heat capacity of an ideal gas at constant pressure is larger than at constant volume, and write the relation between the two.',
  model: 'At constant volume the gas does no work, so all the heat raises its internal energy. At constant pressure the gas also expands and does work **PΔV = nRΔT**, so more heat is needed for the same rise in temperature. Hence **Cp − Cv = R**.',
  sol: 'Extra work at constant pressure; Cp − Cv = R.',
  scheme: [['Constant volume: no work; constant pressure: the gas also does work PΔV', 1], ['Cp − Cv = R', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('cpcv-derive-short3', short({
  marks: 3,
  stem: 'Using the first law of thermodynamics, derive the relation Cp − Cv = R for one mole of an ideal gas.',
  model: r`Heat one mole of the gas at constant pressure through a temperature rise $\Delta T$. By the first law the heat supplied goes partly into internal energy and partly into the work done by the gas: $C_p\Delta T = \Delta U + P\Delta V$. For an ideal gas the internal energy change is $\Delta U = C_v\Delta T$ whatever the process, and the gas law $PV = RT$ at constant pressure gives $P\Delta V = R\Delta T$. Substituting, $C_p\Delta T = C_v\Delta T + R\Delta T$, hence $C_p - C_v = R$.`,
  sol: 'First law at constant pressure; ΔU = CvΔT; PΔV = RΔT.',
  scheme: [['First law at constant pressure: CpΔT = ΔU + PΔV', 1], ['ΔU = CvΔT and PΔV = RΔT (from PV = RT)', 1], ['Cp − Cv = R', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('pathdep-short3', short({
  marks: 3,
  stem: 'Two students take the same gas from state A to state B, one along a straight line on the P–V diagram and the other along a curve lying below it. Explain, with the first law, why they find the same ΔU but different values of Q, and say which student’s gas absorbs less heat.',
  model: r`Internal energy is a state function, so $\Delta U$ depends only on A and B and is the same for both. Work is the area under the path, which is smaller for the curve below the line, so $W$ is smaller. Since $Q = \Delta U + W$, the heat absorbed also differs, and the student on the lower curve has the smaller $Q$.`,
  sol: 'ΔU same; W is the area under the path; Q = ΔU + W is smaller for the smaller area.',
  scheme: [['ΔU is the same (state function)', 1], ['Work is the area under the path: smaller for the lower curve', 1], ['Q = ΔU + W: the lower curve needs less heat', 1]],
  d: 3, c: 'analysis', t: [2],
}));

await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
