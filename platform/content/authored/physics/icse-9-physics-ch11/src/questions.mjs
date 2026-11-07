// ICSE 9 Physics ch11 Current Electricity — question bank in ICSE school-examination style.
// Removed topics (derivation of V = W/q, working of galvanometers and ammeters, construction and equations of cells and accumulators) are not asked.
// The charge of an electron is 1.6 × 10⁻¹⁹ C wherever it is needed (the stem says so). Every number comes from calc.mjs.
// AR keys: a = (A) true (R) false, b = (A) false (R) true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { SYMBOLS_LET, CIRCUIT_LET, OHM_CIRCUIT, VI_GRAPH } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const fv = (svg, alt) => svgV(svg, alt);
const sh = (a, b) => (a === b ? true : `got ${a}, expected ${b}`);
const figSym = () => fv(SYMBOLS_LET, 'Six circuit symbols lettered A to F: a cell, a closed key, a bulb, a resistor, a rheostat and an ammeter');
const figCirc = () => fv(CIRCUIT_LET, 'A simple circuit with four lettered components: A on the left side, B on the top, C on the right side and D on the bottom');
const figOhm = () => fv(OHM_CIRCUIT, "The circuit for verifying Ohm's law: a battery, a key, a rheostat, an ammeter and a resistor R with a voltmeter across it");
const figVI = () => fv(VI_GRAPH, 'Graph of p.d. in volts against current in amperes for a coil: a straight line through the origin passing through 0.5 A and 6 V');
const E_TXT = 'The charge of an electron is 1.6 × 10⁻¹⁹ C.';

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-class', mcq({
  stem: 'Silicon conducts better than rubber but far worse than copper. Silicon is',
  right: 'a semiconductor', wrong: ['a good conductor', 'an insulator', 'a superconductor'],
  sol: 'A material that conducts between the extremes of a metal and an insulator is a semiconductor, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-I', mcq({
  stem: `A charge of ${K.CHK_I.q} C passes a point in a wire in ${K.CHK_I.t} s. The current in the wire is`,
  right: `${K.CHK_I_I} A`, wrong: ['192 A', '0.33 A', '16 A'],
  sol: r`$I = \dfrac{Q}{t} = \dfrac{${K.CHK_I.q}}{${K.CHK_I.t}} = ${K.CHK_I_I}$ A, option (@K).`,
  d: 1, c: 'application', t: [2],
}));
add('chk-dir', mcq({
  stem: 'In the wires outside a cell, the electrons flow',
  right: 'from the negative terminal towards the positive terminal', wrong: ['from the positive terminal towards the negative terminal', 'in both directions at the same time', 'in no fixed direction'],
  sol: 'Electrons are negative and are driven towards the positive terminal; the conventional current is drawn the opposite way, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-W', mcq({
  stem: `A charge of ${K.CHK_W.q} C is moved through a potential difference of ${K.CHK_W.v} V. The work done is`,
  right: `${K.CHK_W_W} J`, wrong: ['0.83 J', '1.2 J', '11 J'],
  sol: r`$W = qV = ${K.CHK_W.q} \times ${K.CHK_W.v} = ${K.CHK_W_W}$ J, option (@K).`,
  d: 1, c: 'application', t: [3],
}));
add('chk-open', mcq({
  stem: 'A cell, a working bulb and a key are joined in a loop, but the bulb does not glow because the key is open. The reason is that',
  right: 'the open key breaks the path, so no current flows', wrong: ['the cell has lost its charge for ever', 'the bulb has too much resistance', 'electrons cannot move in a closed loop'],
  sol: 'A current flows only in a complete (closed) circuit, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-ohm', mcq({
  stem: `A current of ${K.CHK_OHM.i} A flows through a resistor of ${K.CHK_OHM.r} Ω. The potential difference across it is`,
  right: `${K.CHK_OHM_V} V`, wrong: ['0.015 V', '66.7 V', '20.3 V'],
  sol: r`$V = IR = ${K.CHK_OHM.i} \times ${K.CHK_OHM.r} = ${K.CHK_OHM_V}$ V, option (@K).`,
  d: 2, c: 'application', t: [6],
}));
add('chk-R', mcq({
  stem: `A potential difference of ${K.CHK_R.v} V sends a current of ${K.CHK_R.i} A through a coil. The resistance of the coil is`,
  right: `${K.CHK_R_R} Ω`, wrong: ['6 Ω', '0.04 Ω', '12.5 Ω'],
  sol: r`$R = \dfrac{V}{I} = \dfrac{${K.CHK_R.v}}{${K.CHK_R.i}} = ${K.CHK_R_R}$ Ω, option (@K).`,
  d: 2, c: 'application', t: [6],
}));
add('chk-sym', mcq({
  stem: 'To measure the current through a bulb, an ammeter is joined',
  right: 'in series with the bulb', wrong: ['in parallel with the bulb', 'across the cell only', 'in series with the key only'],
  sol: 'The whole current of the bulb must pass through the ammeter, so it is joined in series, option (@K).',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t01 free electrons, conductors, charge
add('m-free', mcq({
  stem: 'A copper wire carries a current readily because copper',
  right: 'contains a large number of free electrons', wrong: ['has all its electrons bound tightly to atoms', 'has no ions in it', 'has more protons than electrons'],
  sol: 'The free electrons in a metal move through it under the push of a cell, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('m-ins', mcq({
  stem: 'Which of the following is a bad conductor of electricity?',
  right: 'Dry wood', wrong: ['Silver', 'Aluminium', 'A solution of common salt in water'],
  sol: 'Dry wood has almost no free charges; the others conduct, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-super', mcq({
  stem: 'When a sample of mercury is cooled below about 4 K, its resistance',
  right: 'falls to zero', wrong: ['becomes very large', 'doubles', 'stays the same as at room temperature'],
  sol: 'Mercury becomes a superconductor and has zero resistance below its critical temperature, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-semi', mcq({
  stem: 'Germanium is used to make electronic devices because it is',
  right: 'a semiconductor', wrong: ['a superconductor at room temperature', 'a very good insulator', 'a perfect conductor'],
  sol: 'Germanium, like silicon, is a semiconductor, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('m-quant', mcq({
  stem: `${E_TXT} A charged body can have a charge of`,
  right: '4.8 × 10⁻¹⁹ C', wrong: ['2.4 × 10⁻¹⁹ C', '1.0 × 10⁻¹⁹ C', '3.0 × 10⁻¹⁹ C'],
  sol: r`Only a whole number of electron charges is possible: $\dfrac{4.8}{1.6} = 3$ exactly, but $\dfrac{2.4}{1.6} = 1.5$, $\dfrac{1.0}{1.6} = 0.625$ and $\dfrac{3.0}{1.6} = 1.875$ are not whole numbers, option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('m-unit', mcq({
  stem: 'The SI unit of electric charge is the',
  right: 'coulomb', wrong: ['ampere', 'volt', 'ohm'],
  sol: 'Charge is measured in coulombs; the ampere, volt and ohm are units of current, p.d. and resistance, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-free', ar({
  a: 'Metals are good conductors of electricity.',
  r: 'A metal contains a large number of free electrons.',
  key: 'c',
  sol: 'The free electrons carry the current through a metal, so (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-quant', ar({
  a: 'A body can have a charge of 2.5 × 10⁻¹⁹ C.',
  r: 'The charge on a body is always a whole-number multiple of the charge of an electron.',
  key: 'b',
  sol: r`Since $\dfrac{2.5}{1.6}$ is not a whole number, such a charge is impossible and (A) is false; (R) is true, option (b).`,
  d: 3, c: 'analysis', t: [1],
}));
add('ar-super', ar({
  a: 'A superconductor has zero resistance below its critical temperature.',
  r: 'Silicon is a semiconductor.',
  key: 'd',
  sol: 'Both statements are true, but the second does not explain the first, option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-rubber', tf({
  stem: 'Rubber is a good conductor of electricity because it has many free electrons.',
  key: 'f',
  sol: 'False. Rubber is an insulator and has almost no free electrons.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-coul', fill({
  stem: 'A material whose resistance becomes zero below a certain low temperature is called a ___.',
  acc: [['superconductor', 'super conductor']],
  sol: 'Superconductor.',
  d: 1, c: 'recall', t: [1],
}));
add('num-n', num({
  stem: `A small spark carries a charge of 3.2 × 10⁻⁶ C. ${E_TXT} Find the number of electrons that pass, in units of 10¹³.`,
  value: K.SPARK_N / 1e13, tol: 0, unit: '× 10¹³',
  sol: r`$n = \dfrac{q}{e} = \dfrac{3.2 \times 10^{-6}}{1.6 \times 10^{-19}} = 2 \times 10^{13}$, that is $n = ${K.SPARK_N / 1e13}$ in units of $10^{13}$.`,
  scheme: [['n = q / e with substitution', 0.5], [`${K.SPARK_N / 1e13} × 10¹³`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.SPARK_N / 1e13, 2));
add('num-q', num({
  stem: `A plastic rod gains 5 × 10¹² extra electrons when it is rubbed. ${E_TXT} Find the magnitude of the charge on it, in units of 10⁻⁷ C.`,
  value: K.BODY_Q_UNITS, tol: 0, unit: '× 10⁻⁷ C',
  sol: r`$q = n e = 5 \times 10^{12} \times 1.6 \times 10^{-19} = 8 \times 10^{-7}$ C, that is $q = ${K.BODY_Q_UNITS}$ in units of $10^{-7}$ C.`,
  scheme: [['q = n e with substitution', 0.5], [`${K.BODY_Q_UNITS} × 10⁻⁷ C`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.BODY_Q_UNITS, 8));
add('s2a', short({
  marks: 2,
  stem: 'Distinguish between a good conductor and an insulator, with two examples of each.',
  wl: null,
  model: 'A **good conductor** has a large number of free electrons and carries current easily (copper, silver); an **insulator** has almost no free electrons and does not carry current (rubber, glass).',
  sol: 'Many free electrons against almost none; two examples each.',
  scheme: [['Good conductor with examples', 1], ['Insulator with examples', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s2g', short({
  marks: 2,
  stem: 'What is a superconductor? State one condition needed for a material to behave as one.',
  wl: null,
  model: 'A **superconductor** is a material whose **resistance becomes zero**. This happens only when it is cooled **below a certain low temperature**, its critical temperature.',
  sol: 'Zero resistance; below a critical temperature.',
  scheme: [['Zero resistance', 1], ['Cooling below a low (critical) temperature', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3a', short({
  marks: 3,
  stem: 'Explain how a metal wire is able to carry an electric current, and say why a rubber tube is not.',
  wl: null,
  model: 'A metal has **free electrons** that are not bound to any atom. When a cell is joined, they **drift towards the positive end** and this flow of charge is the current. Rubber has **almost no free electrons**, so nothing can drift and no current flows.',
  sol: 'Free electrons drift under a cell; rubber has none.',
  scheme: [['Free electrons present in a metal', 1], ['Drift under the cell is the current', 1], ['Rubber has almost no free electrons', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3f', short({
  marks: 3,
  stem: `A glass rod rubbed with silk loses 3 × 10¹² electrons. ${E_TXT} (a) What is the sign of the charge on the rod? (b) Find the magnitude of the charge in units of 10⁻⁷ C.`,
  wl: null,
  model: `**(a)** It has lost negative charges, so its charge is **positive**.\n\n**(b)** q = n e = 3 × 10¹² × 1.6 × 10⁻¹⁹ = 4.8 × 10⁻⁷ C, that is **${K.GAIN_Q_UNITS} in units of 10⁻⁷ C**.`,
  sol: 'Positive; 4.8 in units of 10⁻⁷ C.',
  scheme: [['Positive with a reason', 1], ['q = n e with substitution', 1], ['4.8 × 10⁻⁷ C', 1]],
  d: 2, c: 'application', t: [1],
}), () => sh(K.GAIN_Q_UNITS, 4.8));

// ---------------------------------------------------------------- t02 electric current
add('m-conv', mcq({
  stem: 'The conventional current in the wires outside a cell flows',
  right: 'from the positive terminal to the negative terminal', wrong: ['from the negative terminal to the positive terminal', 'only inside the cell', 'in the direction of the flow of electrons'],
  sol: 'By convention the current is taken from positive to negative outside the cell, the opposite of the electron flow, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-amp', mcq({
  stem: 'A current of 2 A in a wire means that',
  right: 'a charge of 2 C passes any point of the wire every second', wrong: ['a charge of 2 C passes any point of the wire every minute', 'two electrons pass any point every second', 'a p.d. of 2 V is applied across the wire'],
  sol: 'One ampere is one coulomb per second, so 2 A is 2 C per second, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-conv', ar({
  a: 'In the wires outside a cell the conventional current flows from the positive terminal to the negative terminal.',
  r: 'The conventional current is the direction in which the electrons flow.',
  key: 'a',
  sol: 'The first statement is the convention, so (A) is true; the electrons actually flow the other way, so (R) is false, option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('tf-edir', tf({
  stem: 'Outside the cell, electrons flow from the positive terminal to the negative terminal.',
  key: 'f',
  sol: 'False. Electrons flow from the negative terminal to the positive terminal.',
  d: 1, c: 'recall', t: [2],
}));
add('num-I', num({
  stem: `A charge of ${K.COIL.q} C flows through the heating coil of a room heater in ${K.COIL.min} minutes. Find the current in the coil, in A.`,
  value: K.COIL_I, tol: 0, unit: 'A',
  sol: r`$t = ${K.COIL.min} \times 60 = ${K.COIL_T}$ s, so $I = \dfrac{Q}{t} = \dfrac{${K.COIL.q}}{${K.COIL_T}} = ${K.COIL_I}$ A.`,
  scheme: [['Time in seconds and formula', 0.5], [`${K.COIL_I} A`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.COIL_I, 3));
add('num-Q', num({
  stem: `A table fan draws a current of ${K.FAN.i} A for ${K.FAN.min} minutes. Find the charge that flows through the fan in this time, in C.`,
  value: K.FAN_Q, tol: 0, unit: 'C',
  sol: r`$Q = It = ${K.FAN.i} \times (${K.FAN.min} \times 60) = ${K.FAN.i} \times ${K.FAN_T} = ${K.FAN_Q}$ C.`,
  scheme: [['Q = I t with time in seconds', 0.5], [`${K.FAN_Q} C`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.FAN_Q, 1800));
add('num-lamp', num({
  stem: `A small lamp carries a current of ${K.LAMP.i} A. Find the charge that flows through it in ${K.LAMP.min} minutes, in C.`,
  value: K.LAMP_Q, tol: 0, unit: 'C',
  sol: r`$Q = It = ${K.LAMP.i} \times (${K.LAMP.min} \times 60) = ${K.LAMP_Q}$ C.`,
  scheme: [['Q = I t with time in seconds', 0.5], [`${K.LAMP_Q} C`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => sh(K.LAMP_Q, 60));
add('num-t', num({
  stem: `A buzzer needs a charge of ${K.BUZZ.q} C to flow through it. It carries a steady current of ${K.BUZZ.i} A. Find the time for which it works, in s.`,
  value: K.BUZZ_T, tol: 0, unit: 's',
  sol: r`$t = \dfrac{Q}{I} = \dfrac{${K.BUZZ.q}}{${K.BUZZ.i}} = ${K.BUZZ_T}$ s.`,
  scheme: [['t = Q / I with substitution', 0.5], [`${K.BUZZ_T} s`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sh(K.BUZZ_T, 60));
add('num-rate', num({
  stem: `A wire carries a current of ${K.RATE.i} A. ${E_TXT} Find the number of electrons that cross a section of the wire every second, in units of 10¹⁸.`,
  value: K.RATE_N / 1e18, tol: 0, unit: '× 10¹⁸',
  sol: r`In 1 s the charge is $0.8$ C, so $n = \dfrac{Q}{e} = \dfrac{0.8}{1.6 \times 10^{-19}} = 5 \times 10^{18}$, that is $n = ${K.RATE_N / 1e18}$ in units of $10^{18}$.`,
  scheme: [['Charge per second and n = Q / e', 0.5], [`${K.RATE_N / 1e18} × 10¹⁸`, 0.5]],
  d: 3, c: 'application', t: [1, 2],
}), () => sh(K.RATE_N / 1e18, 5));
add('s2b', short({
  marks: 2,
  stem: 'Distinguish between the direction of the conventional current and the direction of electron flow in a circuit.',
  wl: null,
  model: 'The **conventional current** is taken from the **positive terminal** of the cell through the circuit to the **negative terminal**; the **electrons** really move the **opposite** way, from the negative terminal to the positive terminal.',
  sol: 'Positive to negative; electrons the other way.',
  scheme: [['Conventional current positive to negative', 1], ['Electrons negative to positive', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('s3d', short({
  marks: 3,
  stem: `A charge of ${K.WIRE.q} C flows through a wire in ${K.WIRE.min} minutes. ${E_TXT} Find (a) the current and (b) the number of electrons that pass, in units of 10²¹.`,
  wl: null,
  model: `**(a)** t = ${K.WIRE.min} × 60 = 120 s; I = Q ÷ t = ${K.WIRE.q} ÷ 120 = **${K.WIRE_I} A**.\n\n**(b)** n = Q ÷ e = ${K.WIRE.q} ÷ (1.6 × 10⁻¹⁹) = 2.25 × 10²¹, that is **${K.WIRE_N_UNITS} in units of 10²¹**.`,
  sol: '3 A; 2.25 in units of 10^21.',
  scheme: [['Time in seconds', 1], ['Current 3 A', 1], ['Number of electrons', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => sh(K.WIRE_I, 3));

// ---------------------------------------------------------------- t03 potential difference and resistance
add('m-wq', mcq({
  stem: `A battery of ${K.WQ.v} V moves a charge of ${K.WQ.q} C through a circuit. The work done by the battery is`,
  right: `${K.WQ_W} J`, wrong: ['4 J', '15 J', '0.25 J'],
  sol: r`$W = qV = ${K.WQ.q} \times ${K.WQ.v} = ${K.WQ_W}$ J, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('m-ohmunit', mcq({
  stem: 'A conductor has a resistance of one ohm when a current of',
  right: 'one ampere flows through it for a p.d. of one volt across it', wrong: ['one coulomb flows through it in one hour', 'one ampere flows through it for a p.d. of one joule across it', 'one volt flows through it for a current of one ampere across it'],
  sol: 'One ohm is one volt per ampere, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-volt', term({
  stem: 'Define the volt.',
  model: 'The potential difference between two points is **one volt** when **one joule of work** is done in moving **one coulomb** of charge from one point to the other.', sol: 'One joule per coulomb.', sch: 'One joule per coulomb',
  d: 1, c: 'recall', t: [3],
}));
add('fill-ohm', fill({
  stem: 'One volt per ampere is called one ___.',
  acc: [['ohm', 'Ω']],
  sol: 'One ohm.',
  d: 1, c: 'recall', t: [3],
}));
add('num-pd', num({
  stem: `A cell does ${K.PD.w} J of work in moving ${K.PD.q} C of charge round a circuit. Find the potential difference of the cell, in V.`,
  value: K.PD_V, tol: 0, unit: 'V',
  sol: r`$V = \dfrac{W}{q} = \dfrac{${K.PD.w}}{${K.PD.q}} = ${K.PD_V}$ V.`,
  scheme: [['V = W / q with substitution', 0.5], [`${K.PD_V} V`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => sh(K.PD_V, 6));
add('num-W', num({
  stem: `A ${K.MOVE.v} V battery sends ${K.MOVE.q} C of charge through an electric toy. Find the work done by the battery, in J.`,
  value: K.MOVE_W, tol: 0, unit: 'J',
  sol: r`$W = qV = ${K.MOVE.q} \times ${K.MOVE.v} = ${K.MOVE_W}$ J.`,
  scheme: [['W = q V with substitution', 0.5], [`${K.MOVE_W} J`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => sh(K.MOVE_W, 360));
add('num-R', num({
  stem: `A p.d. of ${K.OHM.v} V is applied across a resistance coil and a current of ${K.OHM.i} A flows through it. Find the resistance of the coil, in Ω.`,
  value: K.OHM_R, tol: 0, unit: 'Ω',
  sol: r`$R = \dfrac{V}{I} = \dfrac{${K.OHM.v}}{${K.OHM.i}} = ${K.OHM_R}$ Ω.`,
  scheme: [['R = V / I with substitution', 0.5], [`${K.OHM_R} Ω`, 0.5]],
  d: 2, c: 'application', t: [3, 6],
}), () => sh(K.OHM_R, 18));
add('s2c', short({
  marks: 2,
  stem: 'Define resistance and state its SI unit.',
  wl: null,
  model: '**Resistance** is the **opposition** a conductor offers to the flow of current, equal to the p.d. across it divided by the current through it (R = V ÷ I). Its SI unit is the **ohm**.',
  sol: 'Opposition to current, V/I; ohm.',
  scheme: [['Definition with R = V ÷ I', 1], ['Unit ohm', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s2d', short({
  marks: 2,
  stem: 'Define the potential difference between two points of a circuit and give its SI unit.',
  wl: null,
  model: 'It is the **work done in moving a unit positive charge** from one point to the other (V = W ÷ q). Its SI unit is the **volt**, which is one joule per coulomb.',
  sol: 'Work per unit charge; volt.',
  scheme: [['Work done per unit charge', 1], ['Unit volt (joule per coulomb)', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 simple circuits and symbols
add('m-cellsym', mcq({
  stem: 'In the symbol of a cell, the positive terminal is shown by',
  right: 'the long, thin plate', wrong: ['the short, thick plate', 'the plate nearer the bulb', 'either plate, since a cell has no fixed polarity'],
  sol: 'The long thin line is the positive terminal and the short thick line the negative, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('m-rheo', mcq({
  stem: 'A rheostat is included in a circuit mainly to',
  right: 'change the resistance, and so the current', wrong: ['measure the current', 'store the charge', 'switch the circuit on and off'],
  sol: 'A rheostat is a variable resistor used to adjust the current, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('m-sym', mcq({
  stem: 'In the figure of circuit symbols, the symbol lettered F is the symbol of a(n)',
  right: 'ammeter', wrong: ['rheostat', 'bulb', 'closed key'],
  sol: 'A circle containing the letter A is the symbol of an ammeter; the rheostat is E, the bulb C and the closed key B, option (@K).',
  d: 1, c: 'recall', t: [4],
  assets: [figSym()],
}));
add('m-closed', mcq({
  stem: 'A bulb joined to a cell glows only when the key is closed because',
  right: 'a current flows only in a complete circuit', wrong: ['the key produces the charge', 'the key makes the cell stronger', 'the bulb stores electricity until the key is closed'],
  sol: 'Closing the key completes the path, so charge can flow round, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('tf-amm', tf({
  stem: 'An ammeter is joined in series with the part of the circuit whose current is to be measured.',
  key: 't',
  sol: 'True. The whole current must pass through it.',
  d: 1, c: 'recall', t: [4],
}));
add('term-amm', term({
  stem: 'Name the instrument that is joined in series in a circuit to measure the current.',
  model: 'An **ammeter**.', sol: 'Ammeter.', sch: 'Ammeter',
  d: 1, c: 'recall', t: [4],
}));
add('match-comp', match({
  marks: 5,
  stem: 'Match each component in Column A with its use in Column B.',
  pairs: [
    ['Cell', 'Supplies the push that drives the current'],
    ['Key', 'Opens or closes the circuit'],
    ['Rheostat', 'Changes the current by changing the resistance'],
    ['Ammeter', 'Measures the current'],
    ['Bulb', 'Glows when a current flows through it'],
  ],
  order: [0, 1, 2, 3, 4],
  sol: 'The cell drives the current, the key breaks or completes the path, the rheostat varies the resistance, the ammeter measures the current and the bulb glows.',
  scheme: [['Five pairs', 5]],
  d: 2, c: 'understanding', t: [4],
}));
add('fill-para', fill({
  marks: 5,
  stem: 'Complete the paragraph. A metal conducts because it has many ___ electrons. Current is measured in ___ with an ___ which is joined in ___ with the part of the circuit. The resistance of a conductor is measured in ___.',
  acc: [['free'], ['ampere', 'amperes', 'A'], ['ammeter'], ['series'], ['ohm', 'ohms']],
  sol: 'Free, ampere, ammeter, series, ohm.',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('s2e', short({
  marks: 2,
  stem: 'A student joins a cell, a bulb and a key in a loop. On closing the key, the bulb glows; on opening it, the bulb goes out. Explain both observations.',
  wl: null,
  model: 'With the key **closed** the circuit is **complete**, so a current flows and the bulb glows. With the key **open** there is a **gap** in the circuit, so **no current** flows and the bulb is off.',
  sol: 'Closed: complete path, current flows; open: gap, no current.',
  scheme: [['Closed key: complete circuit, bulb glows', 1], ['Open key: broken circuit, no current', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s3b', short({
  marks: 3,
  stem: 'The figure shows six circuit symbols lettered A to F. Name the component for each of A, C and E, and state which symbol shows the negative terminal of a source.',
  wl: null,
  model: '**A** is a **cell**, **C** is a **bulb** and **E** is a **rheostat**. In the symbol of the cell A the **short thick plate** is the negative terminal.',
  sol: 'A cell; C bulb; E rheostat; short thick plate is negative.',
  scheme: [['A as a cell', 1], ['C as a bulb and E as a rheostat', 1], ['Short thick plate is negative', 1]],
  d: 2, c: 'application', t: [4],
  assets: [figSym()],
}));

// ---------------------------------------------------------------- t05 sources of direct current
add('m-accum', mcq({
  stem: 'A source of direct current that can be charged again and used repeatedly is called',
  right: 'an accumulator', wrong: ['a dry cell', 'a bulb', 'a rheostat'],
  sol: 'An accumulator is rechargeable; a dry cell is used up and thrown away, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('m-dc', mcq({
  stem: 'A direct current is a current that',
  right: 'flows in one direction only', wrong: ['keeps reversing its direction', 'is always very small', 'flows only inside a cell'],
  sol: 'A dry cell or an accumulator pushes charge round the circuit in a single direction, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('m-use', mcq({
  stem: 'A wall clock works for months on a single small cell. The cell is',
  right: 'a dry cell, a source of direct current', wrong: ['an accumulator, a source of alternating current', 'a rheostat, a source of direct current', 'a dry cell, a source of alternating current'],
  sol: 'Clocks and torches use dry cells, which are sources of direct current, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('s2f', short({
  marks: 2,
  stem: 'Name two sources of direct current and give one use of each.',
  wl: null,
  model: 'A **dry cell**, used in a torch or a wall clock; an **accumulator**, used in a car or an inverter.',
  sol: 'Dry cell and accumulator with uses.',
  scheme: [['Dry cell with a use', 1], ['Accumulator with a use', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('s3c', short({
  marks: 3,
  stem: 'State two differences between a dry cell and an accumulator, and give one use of an accumulator.',
  wl: null,
  model: 'A **dry cell** cannot be recharged and is thrown away when spent; an **accumulator** can be **recharged** and used again. A dry cell is small and used for torches and clocks, while an accumulator is larger and **supplies bigger currents**. An accumulator is used to start a **car**.',
  sol: 'Rechargeable against not; size and use; car.',
  scheme: [['Rechargeable against not', 1], ['Size or the current supplied', 1], ['A use of an accumulator', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 Ohm's law
add('m-vi', mcq({
  stem: "For a metallic conductor at constant temperature, the graph of p.d. (y-axis) against current (x-axis) is",
  right: 'a straight line through the origin', wrong: ['a straight line parallel to the current axis', 'a curve that bends upwards', 'a straight line that does not pass through the origin'],
  sol: "Ohm's law says V is proportional to I, which gives a straight line through the origin, option (@K).",
  d: 1, c: 'understanding', t: [6],
}));
add('m-ohmcond', mcq({
  stem: "Ohm's law holds for a metallic conductor only if its",
  right: 'temperature is constant', wrong: ['length is changed', 'colour is unchanged', 'resistance is zero'],
  sol: "Ohm's law is true at constant temperature; heating the conductor changes its resistance, option (@K).",
  d: 1, c: 'recall', t: [6],
}));
add('m-slope', mcq({
  stem: 'The slope of the V against I graph of a conductor obeying Ohm’s law gives its',
  right: 'resistance', wrong: ['current', 'charge', 'power'],
  sol: 'Slope = V ÷ I, which is the resistance, option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('tf-ohm', tf({
  stem: "V = IR holds for a metal wire at constant temperature, however large the current becomes and however hot the wire gets.",
  key: 'f',
  sol: "False. Ohm's law needs a constant temperature; a very hot wire has a larger resistance.",
  d: 2, c: 'understanding', t: [6],
}));
add('num-V', num({
  stem: `A resistance coil of ${K.COILV.r} Ω carries a current of ${K.COILV.i} A. Find the potential difference across it, in V.`,
  value: K.COILV_V, tol: 0, unit: 'V',
  sol: r`$V = IR = ${K.COILV.i} \times ${K.COILV.r} = ${K.COILV_V}$ V.`,
  scheme: [['V = I R with substitution', 0.5], [`${K.COILV_V} V`, 0.5]],
  d: 2, c: 'application', t: [6],
}), () => sh(K.COILV_V, 9));
add('num-I2', num({
  stem: `A table lamp has a resistance of ${K.MAINS.r} Ω and is connected to a ${K.MAINS.v} V supply. Find the current through it, in A.`,
  value: K.MAINS_I, tol: 0, unit: 'A',
  sol: r`$I = \dfrac{V}{R} = \dfrac{${K.MAINS.v}}{${K.MAINS.r}} = ${K.MAINS_I}$ A.`,
  scheme: [['I = V / R with substitution', 0.5], [`${K.MAINS_I} A`, 0.5]],
  d: 2, c: 'application', t: [6],
}), () => sh(K.MAINS_I, 0.5));
add('num-graph', num({
  stem: 'The figure shows the V–I graph of a resistance coil at constant temperature. Using the point (0.5 A, 6.0 V), find the resistance of the coil, in Ω.',
  value: K.READ.r, tol: 0, unit: 'Ω',
  sol: r`$R = \dfrac{V}{I} = \dfrac{6.0}{0.5} = ${K.READ.r}$ Ω (the slope of the line).`,
  scheme: [['Reading of one point and R = V / I', 0.5], [`${K.READ.r} Ω`, 0.5]],
  d: 2, c: 'application', t: [6],
  assets: [figVI()],
}), () => sh(K.READ_V[4] / K.READ.i[4], 12));
add('s2h', short({
  marks: 2,
  stem: "State Ohm's law and write it as an equation.",
  wl: null,
  model: 'At **constant temperature** the **current** through a metallic conductor is **directly proportional to the potential difference** across its ends: **V = IR**, where R is a constant.',
  sol: 'V proportional to I at constant temperature; V = I R.',
  scheme: [['Statement with constant temperature', 1], ['V = I R', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('s3e', short({
  marks: 3,
  stem: `A heater coil of resistance ${K.HEATER.r} Ω is joined to a ${K.HEATER.v} V supply. Find (a) the current in the coil and (b) the charge that flows through it in ${K.HEATER.min} minute.`,
  wl: null,
  model: `**(a)** I = V ÷ R = ${K.HEATER.v} ÷ ${K.HEATER.r} = **${K.HEATER_I} A**.\n\n**(b)** t = ${K.HEATER.min} × 60 = 60 s; Q = I t = ${K.HEATER_I} × 60 = **${K.HEATER_Q} C**.`,
  sol: '6 A; 360 C.',
  scheme: [['I = V / R', 1], ['Current 6 A', 1], ['Charge 360 C', 1]],
  d: 3, c: 'application', t: [2, 6],
}), () => sh(K.HEATER_Q, 360));

// ---------------------------------------------------------------- 10-mark structured questions
add('circuit-long', long({
  marks: 10, wl: null,
  stem: 'The figure shows a circuit in which four components are lettered A, B, C and D.\n\n(a) Name the components A, B, C and D. [2]\n\n(b) State, with a reason, whether the bulb glows. [2]\n\n(c) Through the bulb, does the conventional current flow from top to bottom or from bottom to top? State the direction of flow of the electrons. [2]\n\n(d) What happens to the bulb and to the reading of the ammeter when the key is opened? [2]\n\n(e) The ammeter reads 0.5 A. Find the charge that flows through the bulb in 2 minutes. [2]',
  model: `**(a)** A: **cell**; B: **key** (closed); C: **bulb**; D: **ammeter**.\n\n**(b)** The bulb **glows**, because the key is closed and the circuit is complete, so a current flows.\n\n**(c)** The conventional current leaves the positive plate of the cell, which is the **upper** one, and goes round the loop clockwise, so through the bulb it flows from **top to bottom**; the **electrons** flow the other way, from **bottom to top**.\n\n**(d)** The circuit is broken, so **no current** flows: the bulb **goes out** and the ammeter reads **zero**.\n\n**(e)** t = ${K.CIRC.min} × 60 = 120 s; Q = I t = ${K.CIRC.i} × 120 = **${K.CIRC_Q} C**.`,
  sol: 'Cell, key, bulb, ammeter; glows, circuit complete; top to bottom, electrons bottom to top; goes out, zero; 60 C.',
  scheme: [['Cell and key', 1], ['Bulb and ammeter', 1], ['Glows', 1], ['Reason: complete circuit', 1], ['Conventional current top to bottom', 1], ['Electrons the opposite way', 1], ['Bulb goes out', 1], ['Ammeter reads zero', 1], ['Q = I t with time in seconds', 1], ['60 C', 1]],
  d: 3, c: 'application', t: [2, 4],
  assets: [figCirc()],
}), () => sh(K.CIRC_Q, 60));
add('ohm-long', long({
  marks: 10, wl: null,
  stem: `A student sets up the circuit shown to study a coil R at constant temperature and records these readings.\n\n| Current I (A) | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 |\n|---|---|---|---|---|---|\n| p.d. V (V) | ${K.READ_V.join(' | ')} |\n\n(a) What is the use of the rheostat in the circuit? [1]\n\n(b) State Ohm's law. [2]\n\n(c) What kind of graph is obtained when V is plotted against I, and what does its slope give? [2]\n\n(d) Find the resistance of the coil from the reading at 0.4 A. [2]\n\n(e) Find the p.d. across the coil when the current is 0.8 A. [2]\n\n(f) Find the current when the p.d. is 7.2 V. [1]`,
  model: `**(a)** To **change the current** in the circuit, so that several pairs of readings can be taken.\n\n**(b)** At **constant temperature** the **current** through a metallic conductor is **directly proportional to the potential difference** across it.\n\n**(c)** A **straight line through the origin**; its **slope** is the **resistance** of the coil.\n\n**(d)** R = V ÷ I = ${K.READ_V[3]} ÷ 0.4 = **${K.READ.r} Ω**.\n\n**(e)** V = I R = 0.8 × ${K.READ.r} = **${K.READ_AT08} V**.\n\n**(f)** I = V ÷ R = 7.2 ÷ ${K.READ.r} = **${K.READ_I_AT} A**.`,
  sol: 'Varies the current; V proportional to I; straight line through the origin, slope R; 12 ohm; 9.6 V; 0.6 A.',
  scheme: [['Rheostat varies the current', 1], ['Statement of the law', 1], ['Constant temperature', 1], ['Straight line through the origin', 1], ['Slope is the resistance', 1], ['R = V / I with substitution', 1], ['12 Ω', 1], ['V = I R with substitution', 1], ['9.6 V', 1], ['0.6 A', 1]],
  d: 4, c: 'application', t: [6],
  assets: [figOhm()],
}), () => sh(K.READ_AT08, 9.6));
add('charge-long', long({
  marks: 10, wl: null,
  stem: `A copper wire carries a steady current. A charge of ${K.CH.q} C passes a section of the wire in ${K.CH.min} minutes. ${E_TXT}\n\n(a) Explain why copper conducts electricity. [2]\n\n(b) A plastic comb gains 3 × 10¹² electrons on being rubbed. Find the magnitude of its charge in units of 10⁻⁷ C and state its sign. [3]\n\n(c) Define electric current and state the SI unit. [2]\n\n(d) Find the current in the wire. [1]\n\n(e) Find the number of electrons that cross the section in the ${K.CH.min} minutes, in units of 10²¹. [2]`,
  model: `**(a)** Copper has a large number of **free electrons** that are not bound to atoms; they drift through the metal when a cell is connected.\n\n**(b)** q = n e = 3 × 10¹² × 1.6 × 10⁻¹⁹ = 4.8 × 10⁻⁷ C, that is **4.8 in units of 10⁻⁷ C**, and the sign is **negative** (the comb gained electrons).\n\n**(c)** Current is the **rate of flow of charge**, I = Q ÷ t; its SI unit is the **ampere**.\n\n**(d)** t = ${K.CH.min} × 60 = 240 s; I = ${K.CH.q} ÷ 240 = **${K.CH_I} A**.\n\n**(e)** n = Q ÷ e = ${K.CH.q} ÷ (1.6 × 10⁻¹⁹) = 3 × 10²¹, that is **${K.CH_N_UNITS} in units of 10²¹**.`,
  sol: 'Free electrons; 4.8 and negative; rate of flow of charge, ampere; 2 A; 3 in units of 10^21.',
  scheme: [['Free electrons in copper', 1], ['They drift under a cell', 1], ['q = n e with substitution', 1], ['4.8 in units of 10⁻⁷ C', 1], ['Negative sign with reason', 1], ['Rate of flow of charge', 1], ['Ampere', 1], ['2 A', 1], ['n = Q / e with substitution', 1], ['3 in units of 10²¹', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => sh(K.CH_I, 2));
add('pd-long', long({
  marks: 10, wl: null,
  stem: `A ${K.BULB9.v} V battery lights a bulb, and the bulb carries a steady current of ${K.BULB9.i} A for ${K.BULB9.min} minutes.\n\n(a) Define the potential difference between two points and state its SI unit. [2]\n\n(b) Find the charge that flows through the bulb in this time. [2]\n\n(c) Find the work done by the battery in moving this charge. [2]\n\n(d) Find the resistance of the bulb. [2]\n\n(e) What does the statement "the p.d. of the battery is ${K.BULB9.v} V" mean in terms of energy? [2]`,
  model: `**(a)** The **work done in moving a unit positive charge** from one point to the other; SI unit **volt**.\n\n**(b)** t = ${K.BULB9.min} × 60 = 120 s; Q = I t = ${K.BULB9.i} × 120 = **${K.BULB9_Q} C**.\n\n**(c)** W = q V = ${K.BULB9_Q} × ${K.BULB9.v} = **${K.BULB9_W} J**.\n\n**(d)** R = V ÷ I = ${K.BULB9.v} ÷ ${K.BULB9.i} = **${K.BULB9_R} Ω**.\n\n**(e)** The battery does **${K.BULB9.v} J of work on every coulomb** of charge it moves round the circuit.`,
  sol: 'Work per unit charge, volt; 72 C; 648 J; 15 ohm; 9 J per coulomb.',
  scheme: [['Work done per unit charge', 1], ['Volt', 1], ['Time in seconds and Q = I t', 1], ['72 C', 1], ['W = q V with substitution', 1], ['648 J', 1], ['R = V / I with substitution', 1], ['15 Ω', 1], ['Joules of work per coulomb', 1], ['9 J for every coulomb', 1]],
  d: 3, c: 'application', t: [3],
}), () => sh(K.BULB9_W, 648));
add('material-long', long({
  marks: 10, wl: null,
  stem: 'A science club collects a copper wire, a strip of silicon, a rubber strip and a sample of mercury cooled to 3 K in liquid helium.\n\n(a) Classify each as a good conductor, an insulator, a semiconductor or a superconductor. [4]\n\n(b) Why are household electric cables made of copper wire covered with a layer of plastic? [2]\n\n(c) State one advantage of using a superconductor to carry current. [2]\n\n(d) The rubber strip is joined in series with a cell and a bulb. Will the bulb glow? Give a reason. [2]',
  model: '**(a)** Copper wire: **good conductor**; silicon: **semiconductor**; rubber: **insulator**; mercury at 3 K: **superconductor**.\n\n**(b)** **Copper** has many free electrons and carries the current easily; the **plastic** is an insulator, which stops the current from leaking out and protects the user from shock.\n\n**(c)** It has **zero resistance**, so there is **no loss of energy as heat** in the wire.\n\n**(d)** The bulb will **not glow**, because rubber is an **insulator** with almost no free electrons, so no current flows in the circuit.',
  sol: 'Conductor, semiconductor, insulator, superconductor; copper conducts, plastic insulates; no heat loss; rubber blocks the current.',
  scheme: [['Copper as a good conductor', 1], ['Silicon as a semiconductor', 1], ['Rubber as an insulator', 1], ['Mercury at 3 K as a superconductor', 1], ['Copper conducts well', 1], ['Plastic insulates', 1], ['Zero resistance', 1], ['No loss of energy as heat', 1], ['Bulb does not glow', 1], ['Rubber is an insulator', 1]],
  d: 2, c: 'application', t: [1],
}));
add('source-long', long({
  marks: 10, wl: null,
  stem: `A torch runs on a ${K.TORCH.v} V supply of dry cells. Its bulb carries a current of ${K.TORCH.i} A for ${K.TORCH.min} minutes.\n\n(a) Name two sources of direct current. [2]\n\n(b) Give one use of each source you named. [2]\n\n(c) Which of the two sources can be recharged? [1]\n\n(d) Find the charge that flows through the bulb in this time. [2]\n\n(e) Find the resistance of the bulb. [2]\n\n(f) What is meant by direct current? [1]`,
  model: `**(a)** A **dry cell** and an **accumulator**.\n\n**(b)** Dry cell: a **torch** (or a clock); accumulator: a **car** (or an inverter).\n\n**(c)** The **accumulator**.\n\n**(d)** t = ${K.TORCH.min} × 60 = 1200 s; Q = I t = ${K.TORCH.i} × 1200 = **${K.TORCH_Q} C**.\n\n**(e)** R = V ÷ I = ${K.TORCH.v} ÷ ${K.TORCH.i} = **${K.TORCH_R} Ω**.\n\n**(f)** A current that flows in **one direction only**.`,
  sol: 'Dry cell and accumulator; torch and car; accumulator; 360 C; 15 ohm; one direction.',
  scheme: [['Dry cell', 1], ['Accumulator', 1], ['Use of the dry cell', 1], ['Use of the accumulator', 1], ['Accumulator can be recharged', 1], ['Time in seconds and Q = I t', 1], ['360 C', 1], ['R = V / I with substitution', 1], ['15 Ω', 1], ['Flows in one direction only', 1]],
  d: 2, c: 'application', t: [5, 2, 6],
}), () => sh(K.TORCH_R, 15));

// ---------------------------------------------------------------- more application items
add('m-qt', mcq({
  stem: `A current of ${K.QT.i} A flows through a bulb for ${K.QT.t} s. The charge that passes through the bulb is`,
  right: `${K.QT_Q} C`, wrong: ['0.013 C', '75 C', '30.4 C'],
  sol: r`$Q = It = ${K.QT.i} \times ${K.QT.t} = ${K.QT_Q}$ C, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('m-double', mcq({
  stem: 'The p.d. across a metal wire kept at constant temperature is doubled. The current through the wire',
  right: 'becomes twice as large', wrong: ['becomes half as large', 'stays the same', 'becomes four times as large'],
  sol: "By Ohm's law the current is proportional to the p.d. at constant temperature, so doubling the p.d. doubles the current, option (@K).",
  d: 2, c: 'application', t: [6],
}));
add('m-gr', mcq({
  stem: `The V–I graph of a conductor at constant temperature is a straight line through the origin that passes through the point (${K.GR.i} A, ${K.GR.v} V). The resistance of the conductor is`,
  right: `${K.GR_R} Ω`, wrong: ['0.2 Ω', '12 Ω', '20 Ω'],
  sol: r`$R = \dfrac{V}{I} = \dfrac{${K.GR.v}}{${K.GR.i}} = ${K.GR_R}$ Ω, option (@K).`,
  d: 2, c: 'application', t: [6],
}));
add('m-el', mcq({
  stem: `${E_TXT} A body carries a charge of −3.2 × 10⁻¹⁸ C. It has`,
  right: `gained ${K.EL_N} electrons`, wrong: [`lost ${K.EL_N} electrons`, 'gained 2 electrons', 'lost 2 electrons'],
  sol: r`The charge is negative, so electrons were gained; $n = \dfrac{3.2 \times 10^{-18}}{1.6 \times 10^{-19}} = ${K.EL_N}$, option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('num-Rb', num({
  stem: `A torch bulb carries a current of ${K.RB.i} A when a p.d. of ${K.RB.v} V is applied across it. Find the resistance of the bulb, in Ω.`,
  value: K.RB_R, tol: 0, unit: 'Ω',
  sol: r`$R = \dfrac{V}{I} = \dfrac{${K.RB.v}}{${K.RB.i}} = ${K.RB_R}$ Ω.`,
  scheme: [['R = V / I with substitution', 0.5], [`${K.RB_R} Ω`, 0.5]],
  d: 1, c: 'application', t: [3, 6],
}), () => sh(K.RB_R, 15));
add('num-Ww', num({
  stem: `A cell of p.d. ${K.VW.v} V moves a charge of ${K.VW.q} C round a circuit. Find the work done by the cell, in J.`,
  value: K.VW_W, tol: 0, unit: 'J',
  sol: r`$W = qV = ${K.VW.q} \times ${K.VW.v} = ${K.VW_W}$ J.`,
  scheme: [['W = q V with substitution', 0.5], [`${K.VW_W} J`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => sh(K.VW_W, 60));
add('s2i', short({
  marks: 2,
  stem: `A ${K.SR.v} V battery is joined across a coil of resistance ${K.SR.r} Ω. Find the current in the coil and the charge that flows through it in ${K.SR.t} s.`,
  wl: null,
  model: `I = V ÷ R = ${K.SR.v} ÷ ${K.SR.r} = **${K.SR_I} A**; Q = I t = ${K.SR_I} × ${K.SR.t} = **${K.SR_Q} C**.`,
  sol: '2 A; 20 C.',
  scheme: [['Current 2 A', 1], ['Charge 20 C', 1]],
  d: 2, c: 'application', t: [2, 6],
}), () => sh(K.SR_Q, 20));
add('s3g', short({
  marks: 3,
  stem: `A p.d. of ${K.S3G.v} V across a resistor drives a current of ${K.S3G.i} A through it, at constant temperature. Find (a) its resistance, (b) the p.d. needed for a current of ${K.S3G.i2} A and (c) the current when the p.d. is ${K.S3G.v2} V.`,
  wl: null,
  model: `**(a)** R = V ÷ I = ${K.S3G.v} ÷ ${K.S3G.i} = **${K.S3G_R} Ω**.\n\n**(b)** V = I R = ${K.S3G.i2} × ${K.S3G_R} = **${K.S3G_V2} V**.\n\n**(c)** I = V ÷ R = ${K.S3G.v2} ÷ ${K.S3G_R} = **${K.S3G_I3} A**.`,
  sol: '5 ohm; 2.5 V; 3 A.',
  scheme: [['Resistance 5 Ω', 1], ['P.d. 2.5 V', 1], ['Current 3 A', 1]],
  d: 2, c: 'application', t: [6],
}), () => sh(K.S3G_I3, 3));
