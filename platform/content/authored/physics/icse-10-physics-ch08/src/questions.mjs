// ICSE 10 Physics ch08 Current Electricity — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- t01 charge, current, p.d., resistance, Ohm's law
const Ic = 90 / 75;
add('charge-mcq', mcq({
  stem: 'While a hair dryer runs for 1 minute 15 seconds, a charge of 90 C flows through its heating coil. The current in the coil is:',
  right: `${f(Ic)} A`,
  wrong: ['0.83 A', '1.5 A', '6750 A'],
  sol: `$t = 75$ s, so $I = \\dfrac{Q}{t} = \\dfrac{90}{75} = ${f(Ic)}$ A — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(Ic, 1.2) || 'I');
const Rohm = 4.5 / 0.3;
add('ohm-mcq', mcq({
  stem: 'A carbon resistor on a circuit board carries 0.3 A when a p.d. of 4.5 V is applied across it. Its resistance is:',
  right: `${f(Rohm)} Ω`,
  wrong: ['1.35 Ω', '0.067 Ω', '4.8 Ω'],
  sol: `$R = \\dfrac{V}{I} = \\dfrac{4.5}{0.3} = ${f(Rohm)}$ Ω — option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => near(Rohm, 15) || 'R');
const slope = 3.5 / 0.5;
add('slope-mcq', mcq({
  stem: 'Shreya plots p.d. V (y-axis) against current I (x-axis) for a manganin coil. Her straight line passes through the origin and through the point (0.5 A, 3.5 V). The resistance of the coil is:',
  right: `${f(slope)} Ω`,
  wrong: ['0.14 Ω', '1.75 Ω', '3.5 Ω'],
  sol: `Slope $= \\dfrac{3.5}{0.5} = ${f(slope)}$, so $R = ${f(slope)}$ Ω — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(slope, 7) || 'slope');
add('lamp-mcq', mcq({
  stem: 'Kunal finds that the value of V ÷ I for the filament of a torch bulb rises as he increases the voltage across it. The best explanation is that:',
  right: 'the filament gets hotter, and the resistance of a metal rises with temperature',
  wrong: ['the filament becomes shorter as it glows', 'the current through the filament stays the same at every voltage', 'Ohm’s law applies only to alloys and never to pure metals'],
  sol: 'A larger current heats the tungsten filament more; a hotter metal has a higher resistance, so the V–I graph curves — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
const Wpd = 12 * 25;
add('pd-mcq', mcq({
  stem: 'The 12 V battery of a car sends 25 C of charge through its interior lamp. The work done by the battery on this charge is:',
  right: `${Wpd} J`,
  wrong: ['0.48 J', '2.08 J', '37 J'],
  sol: `$W = QV = 25 \\times 12 = ${Wpd}$ J — option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => Wpd === 300 || 'W');
add('nonohm-mcq', mcq({
  stem: 'Which of these is a non-ohmic conductor?',
  right: 'A junction diode in a phone charger circuit',
  wrong: ['A constantan wire kept at a steady temperature', 'A manganin coil inside a resistance box', 'A nichrome wire kept in a water bath at constant temperature'],
  sol: 'A diode conducts easily in one direction only, so its V–I graph is not a straight line through the origin — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ohm-ar', ar({
  a: 'For a nichrome wire held at constant temperature, the graph of V against I is a straight line through the origin.',
  r: 'At constant temperature the resistance of the nichrome wire does not change.',
  key: 'c',
  sol: 'Constant R means V/I is constant, so the graph is a straight line through the origin. Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('conv-tf', tf({
  stem: 'In the external circuit, conventional current flows from the negative terminal of a cell to its positive terminal.',
  key: 'f',
  sol: 'False: conventional current flows from the positive terminal to the negative terminal outside the cell; electrons drift the other way.',
  d: 1, c: 'recall', t: [1],
}));
add('ohm-fill', fill({
  stem: 'The SI unit of resistance, equal to one volt per ampere, is the ___.',
  acc: [['ohm']],
  sol: '**Ohm** (Ω).',
  d: 1, c: 'recall', t: [1],
}));
add('pd-fill', fill({
  stem: 'The potential difference between two points is the work done in moving a ___ positive charge from one point to the other.',
  acc: [['unit']],
  sol: '**Unit** (one coulomb).',
  d: 1, c: 'recall', t: [1],
}));
const ne = 4.8 / 1.6e-19;
add('electrons-num', num({
  stem: 'Each time a doorbell rings, a charge of 4.8 C flows through its coil. How many electrons pass through the coil? Give your answer as a multiple of $10^{19}$. (Charge of an electron = $1.6 \\times 10^{-19}$ C.)',
  value: ne / 1e19, tol: 0.001, unit: null,
  sol: r`$n = \dfrac{Q}{e} = \dfrac{4.8}{1.6 \times 10^{-19}} = 3 \times 10^{19}$, so the multiple is $n = 3$.`,
  scheme: [['3 × 10¹⁹ electrons', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(ne, 3e19) || 'n');
const Rbell = 6 / 0.15;
add('res-num', num({
  stem: 'The electromagnet of a school bell draws 0.15 A from a 6 V supply. Find its resistance in ohms.',
  value: Rbell, tol: 0, unit: 'Ω',
  sol: `$R = \\dfrac{V}{I} = \\dfrac{6}{0.15} = ${f(Rbell)}$ Ω.`,
  scheme: [[`${f(Rbell)} Ω`, 1]],
  d: 1, c: 'application', t: [1],
}), () => near(Rbell, 40) || 'R');
const Vradio = 75 * 0.08;
add('volt-num', num({
  stem: 'A 75 Ω resistor in a transistor radio carries a current of 0.08 A. Find the p.d. across it in volts.',
  value: Vradio, tol: 0.001, unit: 'V',
  sol: `$V = IR = 0.08 \\times 75 = ${f(Vradio)}$ V.`,
  scheme: [[`${f(Vradio)} V`, 1]],
  d: 1, c: 'application', t: [1],
}), () => near(Vradio, 6) || 'V');
add('ohmlaw-short1', short({
  marks: 1,
  stem: 'State Ohm’s law.',
  model: 'At constant temperature (other physical conditions unchanged), the p.d. across a metallic conductor is directly proportional to the current through it, so V ÷ I stays constant.',
  sol: 'Statement with the condition.',
  scheme: [['Proportionality with the constant-temperature condition', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('ammeter-short1', short({
  marks: 1,
  stem: 'Why must an ammeter have a very low resistance?',
  model: 'It is placed in series, so a low resistance hardly changes the current it is measuring.',
  sol: 'So that it does not reduce the current in the circuit.',
  scheme: [['Reason linked to series connection', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('verify-short2', short({
  marks: 2,
  stem: 'To verify Ohm’s law for a coil of eureka wire, Aditya has a battery, a key, a rheostat, an ammeter and a voltmeter. (a) How should the ammeter and the voltmeter be connected? (b) What should he do with the rheostat, and which graph should he plot?',
  model: '(a) The ammeter goes in series with the coil; the voltmeter goes across (in parallel with) the coil. (b) He should move the rheostat slider to take several different pairs of V and I readings, then plot V against I: a straight line through the origin verifies the law.',
  sol: 'Connections; rheostat use and graph.',
  scheme: [['Meter connections', 1], ['Rheostat varies current; straight-line V–I graph', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const Rread = 1.6 / 0.2;
add('readings-short2', short({
  marks: 2,
  stem: 'Readings for a constantan coil: I = 0.2, 0.4, 0.6 and 0.8 A gave V = 1.6, 3.2, 4.8 and 6.4 V. (a) Does the coil obey Ohm’s law? Give a reason. (b) Find its resistance.',
  model: `(a) Yes: V ÷ I has the same value for every pair, so V is proportional to I. (b) $R = \\dfrac{1.6}{0.2} = ${f(Rread)}$ Ω.`,
  sol: `Constant ratio; ${f(Rread)} Ω.`,
  scheme: [['Constant ratio stated', 1], ['Resistance with unit', 1]],
  d: 2, c: 'analysis', t: [1],
}), () => [[0.2, 1.6], [0.4, 3.2], [0.6, 4.8], [0.8, 6.4]].every(([i, v]) => near(v / i, 8)) || 'ratio');

// ---------------------------------------------------------------- t02 factors affecting resistance; resistivity; superconductors
const Rlen = (12 * 0.75) / 3;
add('length-mcq', mcq({
  stem: 'A 3 m length of eureka wire has a resistance of 12 Ω. A 75 cm length cut from the same reel has a resistance of:',
  right: `${f(Rlen)} Ω`,
  wrong: ['48 Ω', '9 Ω', '0.75 Ω'],
  sol: `$R \\propto l$: $12 \\times \\dfrac{0.75}{3} = ${f(Rlen)}$ Ω — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(Rlen, 3) || 'R');
add('area-mcq', mcq({
  stem: 'An electrician replaces a copper wire with another copper wire of the same length but three times the diameter. The new resistance is:',
  right: 'one-ninth of the old resistance',
  wrong: ['one-third of the old resistance', 'three times the old resistance', 'nine times the old resistance'],
  sol: 'Area $\\propto d^{2}$, so the area becomes 9 times and $R \\propto 1/A$ becomes one-ninth — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => near(1 / 3 ** 2, 1 / 9) || 'ratio');
add('super-mcq', mcq({
  stem: 'A sample of mercury is cooled steadily in liquid helium. Below about 4.2 K, its resistance:',
  right: 'suddenly drops to zero',
  wrong: ['rises very sharply', 'stays exactly the same as at room temperature', 'becomes negative'],
  sol: 'Mercury becomes a superconductor below its critical temperature — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('temp-mcq', mcq({
  stem: 'An iron wire and a germanium strip, both at room temperature, are dipped into hot water. Their resistances change as follows:',
  right: 'the iron wire’s increases and the germanium strip’s decreases',
  wrong: ['both increase', 'both decrease', 'the iron wire’s decreases and the germanium strip’s increases'],
  sol: 'A metal’s resistance rises with temperature; a semiconductor’s falls — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const Rst = 5 * 3 ** 2;
add('stretch-mcq', mcq({
  stem: 'A silver wire of resistance 5 Ω is drawn out uniformly to three times its original length, its volume staying the same. Its new resistance is:',
  right: `${Rst} Ω`,
  wrong: ['15 Ω', '5 Ω', '1.67 Ω'],
  sol: `Length × 3 and area ÷ 3, so $R$ becomes $3 \\times 3 = 9$ times: $5 \\times 9 = ${Rst}$ Ω — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => Rst === 45 || 'R');
add('thick-ar', ar({
  a: 'A thick copper wire has a lower resistance than a thin copper wire of the same length.',
  r: 'The resistance of a wire is inversely proportional to its length.',
  key: 'a',
  sol: 'A is true (R is inversely proportional to the area); R is false, since resistance is directly proportional to length — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('super-tf', tf({
  stem: 'Below its critical temperature, a superconducting cable carrying a current produces no heat in itself.',
  key: 't',
  sol: 'True: its resistance is zero, so the heat produced, which depends on resistance, is zero.',
  d: 2, c: 'understanding', t: [2],
}));
add('rho-fill', fill({
  stem: 'Materials whose resistance becomes zero below a certain critical temperature are called ___.',
  acc: [['superconductors', 'superconductor']],
  sol: '**Superconductors**.',
  d: 1, c: 'recall', t: [2],
}));
add('area-fill', fill({
  stem: 'The resistance of a wire is inversely proportional to its area of ___.',
  acc: [['cross-section', 'cross section', 'cross-sectional area']],
  sol: '**Cross-section**.',
  d: 1, c: 'recall', t: [2],
}));
const rho = (22 * 5e-8) / 2.5;
add('rho-num', num({
  stem: 'A manganin wire 2.5 m long, with a cross-sectional area of $5 \\times 10^{-8}$ m², has a resistance of 22 Ω. Find the specific resistance of manganin, in units of $10^{-7}$ Ω m.',
  value: rho / 1e-7, tol: 0.01, unit: '× 10⁻⁷ Ω m',
  sol: r`$\rho = \dfrac{RA}{l} = \dfrac{22 \times 5 \times 10^{-8}}{2.5} = 4.4 \times 10^{-7}$ Ω m, so the answer is $\rho = 4.4$ in units of $10^{-7}$ Ω m.`,
  scheme: [['4.4 × 10⁻⁷ Ω m', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(rho, 4.4e-7) || 'rho');
const lcon = (10 * 0.49e-6) / 4.9e-7;
add('len-num', num({
  stem: 'A radio mechanic wants to wind a 10 Ω resistor from constantan wire of cross-sectional area 0.49 mm². The specific resistance of constantan is $4.9 \\times 10^{-7}$ Ω m. What length of wire, in metres, does he need?',
  value: lcon, tol: 0.01, unit: 'm',
  sol: r`$A = 0.49 \times 10^{-6}$ m²; $l = \dfrac{RA}{\rho} = \dfrac{10 \times 0.49 \times 10^{-6}}{4.9 \times 10^{-7}} = 10$ m.`,
  scheme: [['10 m', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(lcon, 10) || 'l');
add('factor-short1', short({
  marks: 1,
  stem: 'Apart from the material, name two factors on which the resistance of a copper wire depends.',
  model: 'Its length and its area of cross-section (its temperature also matters).',
  sol: 'Length; area of cross-section.',
  scheme: [['Two factors', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('rho-short2', short({
  marks: 2,
  stem: 'A nichrome wire of a toaster element is cut into two equal halves. (a) What happens to the resistance of each half? (b) What happens to the specific resistance? Explain your answer to (b).',
  model: '(a) Each half has half the resistance, because R is proportional to length. (b) The specific resistance does not change: it is a property of the material (and its temperature), not of the size of the piece.',
  sol: 'Resistance halves; resistivity unchanged.',
  scheme: [['(a)', 1], ['(b) with reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('alloy-short3', short({
  marks: 3,
  stem: 'Give a reason for each: (a) the element of an electric kettle is made of nichrome; (b) the flexible lead joining the kettle to its plug has copper strands; (c) the resistance of the kettle element, measured when cold, is a little less than its value while working.',
  model: '(a) Nichrome has a high specific resistance and a high melting point and does not oxidise easily when red-hot, so it produces plenty of heat safely. (b) Copper has a very low specific resistance, so the lead wastes little energy and stays cool. (c) The resistance of a metal increases with temperature, so the hot element has a slightly larger resistance.',
  sol: 'Three reasons.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 e.m.f., internal resistance, terminal voltage
const Iemf = 1.5 / (2.5 + 0.5);
add('emf-mcq', mcq({
  stem: 'A dry cell of e.m.f. 1.5 V and internal resistance 0.5 Ω lights a torch bulb of resistance 2.5 Ω. The current through the bulb is:',
  right: `${f(Iemf)} A`,
  wrong: ['0.6 A', '3 A', '0.75 A'],
  sol: `$I = \\dfrac{E}{R + r} = \\dfrac{1.5}{2.5 + 0.5} = ${f(Iemf)}$ A — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(Iemf, 0.5) || 'I');
const Vt = 9 - 1.2 * 1.5;
add('terminal-mcq', mcq({
  stem: 'A transistor-radio battery of e.m.f. 9 V and internal resistance 1.5 Ω is supplying a current of 1.2 A. Its terminal voltage is:',
  right: `${f(Vt)} V`,
  wrong: ['10.8 V', '9 V', '1.8 V'],
  sol: `$V = E - Ir = 9 - 1.2 \\times 1.5 = ${f(Vt)}$ V — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(Vt, 7.2) || 'V');
add('open-mcq', mcq({
  stem: 'Tanvi connects only a high-resistance voltmeter across the terminals of a fresh lead–acid cell; nothing else is connected. The voltmeter reads:',
  right: 'the e.m.f. of the cell',
  wrong: ['zero', 'the lost volts of the cell', 'twice the e.m.f. of the cell'],
  sol: 'Almost no current is drawn, so Ir is negligible and V equals E — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('intr-mcq', mcq({
  stem: 'In a simple cell made with copper and zinc plates in dilute acid, the internal resistance becomes smaller when:',
  right: 'the plates are pushed deeper, so a larger area dips into the acid',
  wrong: ['the plates are moved farther apart', 'the cell is cooled in ice', 'the plates are lifted so that less of them dips into the acid'],
  sol: 'A larger area of electrode in the electrolyte gives the current a wider path, reducing r — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('emf-ar', ar({
  a: 'The terminal voltage of a cell is less than its e.m.f. while the cell supplies a current.',
  r: 'Part of the e.m.f. is used in driving the current through the internal resistance of the cell.',
  key: 'c',
  sol: 'Both are true, and the lost volts Ir explain why V = E − Ir is smaller — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('emf2-ar', ar({
  a: 'The e.m.f. of a cell depends on the size of its electrodes.',
  r: 'The internal resistance of a cell depends on the area of its electrodes in contact with the electrolyte.',
  key: 'b',
  sol: 'A is false: the e.m.f. depends on the materials of the electrodes and the electrolyte, not on their size. R is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ir-tf', tf({
  stem: 'While a cell is supplying current, its terminal voltage is greater than its e.m.f.',
  key: 'f',
  sol: 'False: V = E − Ir, so the terminal voltage is less than the e.m.f. when a current flows.',
  d: 1, c: 'understanding', t: [3],
}));
add('emf-fill', fill({
  stem: 'The resistance offered by the electrolyte of a cell to the current passing through it is called the ___ resistance of the cell.',
  acc: [['internal']],
  sol: '**Internal** resistance.',
  d: 1, c: 'recall', t: [3],
}));
const Ilost = 6 / (4 + 0.8);
const lost = Ilost * 0.8;
add('lost-num', num({
  stem: 'A 6 V battery with an internal resistance of 0.8 Ω lights a scooter lamp of resistance 4 Ω. Find the lost volts, in volts, inside the battery.',
  value: lost, tol: 0.001, unit: 'V',
  sol: r`$I = \dfrac{6}{4 + 0.8} = 1.25$ A; lost volts $= Ir = 1.25 \times 0.8 = 1$ V.`,
  scheme: [['Current 1.25 A', 0.5], ['Lost volts 1 V', 0.5]],
  d: 3, c: 'application', t: [3],
}), () => near(Ilost, 1.25) && near(lost, 1) || 'lost');
const Ir1 = 1.6 / 4;
const rr = (2 - 1.6) / Ir1;
add('r-num', num({
  stem: 'A cell of e.m.f. 2 V gives a terminal voltage of 1.6 V when it is connected across a 4 Ω resistor. Find the internal resistance of the cell in ohms.',
  value: rr, tol: 0.001, unit: 'Ω',
  sol: r`$I = \dfrac{1.6}{4} = 0.4$ A; lost volts $= 2 - 1.6 = 0.4$ V; $r = \dfrac{0.4}{0.4} = 1$ Ω.`,
  scheme: [['1 Ω', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(rr, 1) || 'r');
add('emfvs-short2', short({
  marks: 2,
  stem: 'A voltmeter across a torch battery reads 3.0 V when the torch is switched off and 2.7 V when it is switched on. (a) Which reading is the e.m.f.? (b) Explain why the second reading is lower.',
  model: '(a) 3.0 V, the reading when no current is drawn. (b) With the torch on, current flows through the battery’s internal resistance, and 0.3 V is lost inside the battery (Ir), so only 2.7 V appears at the terminals.',
  sol: '3.0 V; lost volts across the internal resistance.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'analysis', t: [3],
}), () => near(3.0 - 2.7, 0.3) || 'lost');
const Ic3 = 1.5 / (2.75 + 0.25);
add('cell-short3', short({
  marks: 3,
  stem: 'A cell of e.m.f. 1.5 V and internal resistance 0.25 Ω is connected to a 2.75 Ω resistor in a wall clock. Calculate (a) the current, (b) the terminal voltage and (c) the lost volts.',
  model: r`(a) $I = \dfrac{1.5}{2.75 + 0.25} = 0.5$ A. (b) $V = IR = 0.5 \times 2.75 = 1.375$ V. (c) Lost volts $= Ir = 0.5 \times 0.25 = 0.125$ V (check: $1.375 + 0.125 = 1.5$).`,
  sol: '0.5 A; 1.375 V; 0.125 V.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(Ic3, 0.5) && near(Ic3 * 2.75 + Ic3 * 0.25, 1.5) || 'cell');

// ---------------------------------------------------------------- t04 series, parallel, networks
const Iser = 10 / (3 + 7 + 10);
add('series-mcq', mcq({
  stem: 'Three heater coils of 3 Ω, 7 Ω and 10 Ω are wired in series to a 10 V bench supply. The current in the 7 Ω coil is:',
  right: `${f(Iser)} A`,
  wrong: ['1.43 A', '1 A', '3.5 A'],
  sol: `$R_{s} = 3 + 7 + 10 = 20$ Ω; the same current flows in every coil: $I = \\dfrac{10}{20} = ${f(Iser)}$ A — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(Iser, 0.5) || 'I');
const Rpar = (20 * 30) / (20 + 30);
add('par-mcq', mcq({
  stem: 'The two windings of a hair dryer, of 20 Ω and 30 Ω, are connected in parallel. Their equivalent resistance is:',
  right: `${f(Rpar)} Ω`,
  wrong: ['50 Ω', '25 Ω', '10 Ω'],
  sol: `$R_{p} = \\dfrac{20 \\times 30}{20 + 30} = ${f(Rpar)}$ Ω — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(Rpar, 12) || 'Rp');
add('least-mcq', mcq({
  stem: 'Five lamps of different resistances are connected in parallel in a shop window. The equivalent resistance of the group is:',
  right: 'less than the resistance of the smallest lamp',
  wrong: ['greater than the resistance of the largest lamp', 'equal to the average of the five resistances', 'equal to the sum of the five resistances'],
  sol: 'Each branch adds a path, so the combination conducts better than any single lamp — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('same-mcq', mcq({
  stem: 'A 5 Ω and a 15 Ω resistor are joined in parallel across a battery. Which quantity is the same for both resistors?',
  right: 'The potential difference across them',
  wrong: ['The current through them', 'The heat produced in them each second', 'The charge passing through them each second'],
  sol: 'Both are connected between the same two points, so they have the same p.d.; the currents differ — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const R4 = ((8 + 8) * (8 + 8)) / (8 + 8 + 8 + 8);
add('four-mcq', mcq({
  stem: 'Four identical 8 Ω resistors are arranged as two pairs; in each pair the resistors are in series, and the two pairs are then joined in parallel. The equivalent resistance is:',
  right: `${f(R4)} Ω`,
  wrong: ['32 Ω', '2 Ω', '16 Ω'],
  sol: `Each pair is $8 + 8 = 16$ Ω; two 16 Ω in parallel give $\\dfrac{16 \\times 16}{16 + 16} = ${f(R4)}$ Ω — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => near(R4, 8) || 'R');
add('ratio-mcq', mcq({
  stem: 'A 4 Ω and a 12 Ω resistor are in parallel across a battery. The ratio of the current in the 4 Ω resistor to that in the 12 Ω resistor is:',
  right: '3 : 1',
  wrong: ['1 : 3', '1 : 1', '4 : 1'],
  sol: 'Same p.d., so $I \\propto 1/R$: $\\dfrac{12}{4} = 3$, giving 3 : 1 — option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => near((1 / 4) / (1 / 12), 3) || 'ratio');
add('parb-ar', ar({
  a: 'The equivalent resistance of two resistors in parallel is less than either resistor.',
  r: 'In a parallel combination the p.d. across each resistor is the same.',
  key: 'd',
  sol: 'Both statements are true, but the reason Rp is smaller is that each branch adds an extra path for current (the reciprocals add), not merely that the p.d. is common — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('series-tf', tf({
  stem: 'Joining a 10 Ω resistor in series with a 5 Ω resistor gives an equivalent resistance of less than 10 Ω.',
  key: 'f',
  sol: 'False: in series the resistances add, giving 15 Ω, more than the larger resistor.',
  d: 1, c: 'understanding', t: [4],
}));
add('parlow-tf', tf({
  stem: 'Two 10 Ω resistors joined in parallel have an equivalent resistance of 5 Ω.',
  key: 't',
  sol: 'True: $\\dfrac{10 \\times 10}{10 + 10} = 5$ Ω.',
  d: 1, c: 'application', t: [4],
}));
add('series-fill', fill({
  stem: 'In a series combination of resistors, the ___ is the same through every resistor.',
  acc: [['current', 'electric current']],
  sol: '**Current**.',
  d: 1, c: 'recall', t: [4],
}));
add('par-fill', fill({
  stem: 'The reciprocal of the equivalent resistance of resistors in parallel equals the ___ of the reciprocals of the individual resistances.',
  acc: [['sum']],
  sol: '**Sum**.',
  d: 1, c: 'recall', t: [4],
}));
const Inet = 9 / (5 + (8 * 8) / (8 + 8));
add('net-num', num({
  stem: 'In a toy car, a 5 Ω speed-control resistor is in series with two 8 Ω motor windings that are connected in parallel with each other. The circuit runs from a 9 V battery of negligible internal resistance. Find the current, in amperes, drawn from the battery.',
  value: Inet, tol: 0.001, unit: 'A',
  sol: r`Windings: $\dfrac{8 \times 8}{8 + 8} = 4$ Ω; total $5 + 4 = 9$ Ω; $I = \dfrac{9}{9} = 1$ A.`,
  scheme: [['1 A', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(Inet, 1) || 'I');
const Rp3 = 1 / (1 / 6 + 1 / 12 + 1 / 12);
add('par-num', num({
  stem: 'Three heating strips of 6 Ω, 12 Ω and 12 Ω are connected in parallel inside a seed-germination box. Find their equivalent resistance in ohms.',
  value: Rp3, tol: 0.001, unit: 'Ω',
  sol: r`$\dfrac{1}{R_{p}} = \dfrac{1}{6} + \dfrac{1}{12} + \dfrac{1}{12} = \dfrac{4}{12}$, so $R_{p} = \dfrac{12}{4} = 3$ Ω.`,
  scheme: [['3 Ω', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(Rp3, 3) || 'Rp');
const Ext2 = 3 + (6 * 12) / (6 + 12);
const I2 = 12 / (Ext2 + 1);
const V2 = 12 - I2 * 1;
add('net2-num', num({
  stem: 'A battery of e.m.f. 12 V and internal resistance 1 Ω is connected to a 3 Ω resistor in series with a parallel pair of 6 Ω and 12 Ω resistors. Find the terminal voltage of the battery in volts.',
  value: V2, tol: 0.001, unit: 'V',
  sol: r`Pair: $\dfrac{6 \times 12}{6 + 12} = 4$ Ω; external $3 + 4 = 7$ Ω; $I = \dfrac{12}{7 + 1} = 1.5$ A; $V = 12 - 1.5 \times 1 = 10.5$ V.`,
  scheme: [['10.5 V', 1]],
  d: 4, c: 'analysis', t: [3, 4],
}), () => near(I2, 1.5) && near(V2, 10.5) || 'V');
add('parl-short1', short({
  marks: 1,
  stem: 'Write the expression for the equivalent resistance of two resistors $R_{1}$ and $R_{2}$ joined in parallel.',
  model: r`$R_{p} = \dfrac{R_{1}R_{2}}{R_{1} + R_{2}}$ (product divided by sum).`,
  sol: 'Product over sum.',
  scheme: [['Correct expression', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('derive-short2', short({
  marks: 2,
  stem: 'Two resistors $R_{1}$ and $R_{2}$ are connected in parallel across a battery that maintains a p.d. V across them. Starting from $I = I_{1} + I_{2}$, show that $\\dfrac{1}{R_{p}} = \\dfrac{1}{R_{1}} + \\dfrac{1}{R_{2}}$.',
  model: r`Each resistor has the same p.d. V, so $I_{1} = \dfrac{V}{R_{1}}$ and $I_{2} = \dfrac{V}{R_{2}}$; for the combination $I = \dfrac{V}{R_{p}}$. Substituting in $I = I_{1} + I_{2}$ gives $\dfrac{V}{R_{p}} = \dfrac{V}{R_{1}} + \dfrac{V}{R_{2}}$; dividing by V, $\dfrac{1}{R_{p}} = \dfrac{1}{R_{1}} + \dfrac{1}{R_{2}}$.`,
  sol: 'Same V; Ohm’s law for each; divide by V.',
  scheme: [['Same p.d. and Ohm’s law for each branch', 1], ['Combination and result', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const big = 4 + 6 + 12;
const small = 1 / (1 / 4 + 1 / 6 + 1 / 12);
add('get-short2', short({
  marks: 2,
  stem: 'Rohan has one 4 Ω, one 6 Ω and one 12 Ω resistor. How should he connect all three to get (a) the largest and (b) the smallest possible resistance? Calculate each value.',
  model: r`(a) All in series: $4 + 6 + 12 = 22$ Ω. (b) All in parallel: $\dfrac{1}{R} = \dfrac{1}{4} + \dfrac{1}{6} + \dfrac{1}{12} = \dfrac{6}{12}$, so $R = 2$ Ω.`,
  sol: '22 Ω in series; 2 Ω in parallel.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}), () => big === 22 && near(small, 2) || 'R');
const Vsp = 2 * ((20 * 5) / (20 + 5));
add('split-short2', short({
  marks: 2,
  stem: 'A 20 Ω and a 5 Ω resistor in a mixer’s speed switch are connected in parallel, and the pair carries a total current of 2 A. Find the current through each resistor.',
  model: r`$R_{p} = \dfrac{20 \times 5}{20 + 5} = 4$ Ω; $V = 2 \times 4 = 8$ V; $I_{20} = \dfrac{8}{20} = 0.4$ A and $I_{5} = \dfrac{8}{5} = 1.6$ A (sum 2 A).`,
  sol: '0.4 A and 1.6 A.',
  scheme: [['p.d. across the pair', 1], ['Both currents', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(Vsp, 8) && near(Vsp / 20 + Vsp / 5, 2) || 'split');
const Inet3 = 9 / (3.5 + (3 * 6) / (3 + 6) + 0.5);
add('net-short3', short({
  marks: 3,
  stem: 'A 9 V battery of internal resistance 0.5 Ω is connected to a 3.5 Ω resistor in series with a parallel pair of 3 Ω and 6 Ω. Find (a) the total external resistance, (b) the current drawn from the battery and (c) the current through the 3 Ω resistor.',
  model: r`(a) Pair $= \dfrac{3 \times 6}{3 + 6} = 2$ Ω; external $= 3.5 + 2 = 5.5$ Ω. (b) $I = \dfrac{9}{5.5 + 0.5} = 1.5$ A. (c) p.d. across the pair $= 1.5 \times 2 = 3$ V, so $I_{3} = \dfrac{3}{3} = 1$ A.`,
  sol: '5.5 Ω; 1.5 A; 1 A.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => near(Inet3, 1.5) && near((Inet3 * 2) / 3, 1) || 'net');

// ---------------------------------------------------------------- match items
add('term-match', match({
  marks: 2,
  stem: 'Match each device or material in Column A with its correct description in Column B.',
  pairs: [
    ['Ammeter', 'Joined in series; very low resistance'],
    ['Voltmeter', 'Joined in parallel; very high resistance'],
    ['Rheostat', 'Varies the current in a circuit'],
    ['Superconductor', 'Zero resistance below a critical temperature'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Ammeter → series, low resistance; voltmeter → parallel, high resistance; rheostat → varies the current; superconductor → zero resistance when cold enough.',
  d: 1, c: 'recall', t: [1, 2],
}));
add('formula-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with the expression for it in Column B.',
  pairs: [
    ['Specific resistance', 'RA ÷ l'],
    ['Terminal voltage', 'E − Ir'],
    ['Series equivalent of R₁ and R₂', 'R₁ + R₂'],
    ['Current', 'Q ÷ t'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Specific resistance → RA ÷ l; terminal voltage → E − Ir; series equivalent → R₁ + R₂; current → Q ÷ t.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const Rl = 1.5 / 0.25;
add('ohm-long', long({
  stem: '(a) State Ohm’s law. Name one conductor that obeys it and one that does not. [3]\n\n(b) A student records these readings for a coil: V = 1.5, 3.0 and 4.5 V with I = 0.25, 0.50 and 0.75 A. (i) Find the resistance of the coil. (ii) What current flows at 7.5 V? (iii) What p.d. is needed for a current of 2 A? [3]\n\n(c) The filament of a torch bulb gives a V–I graph that is not a straight line. (i) Describe the shape of the graph. (ii) Explain it. (iii) Is the filament ohmic? (iv) Why must the condition of constant temperature be part of Ohm’s law? [4]',
  model: r`(a) Provided its temperature and physical state do not change, a conductor carries a current that is directly proportional to the p.d. across its ends. Ohmic: a manganin (or constantan) wire. Non-ohmic: a junction diode (or a filament lamp).

(b) (i) $R = \dfrac{1.5}{0.25} = 6$ Ω (the other pairs give the same ratio). (ii) $I = \dfrac{7.5}{6} = 1.25$ A. (iii) $V = 2 \times 6 = 12$ V.

(c) (i) With V on the y-axis, the graph curves upwards, getting steeper as the current grows. (ii) A larger current heats the filament more, and its resistance rises with temperature, so V ÷ I increases. (iii) No, it is non-ohmic. (iv) The resistance of a metal changes with temperature, so V ÷ I stays constant only if the temperature is kept the same.`,
  sol: 'Law and examples; three calculations; filament graph.',
  scheme: [['(a) law with condition', 2], ['(a) examples', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Rl, 6) && near(3 / 0.5, 6) && near(4.5 / 0.75, 6) && near(7.5 / Rl, 1.25) && near(2 * Rl, 12) || 'ohm');
const Rw = (1.0e-6 * 1.5) / 0.3e-6;
add('rho-long', long({
  stem: '(a) State three factors on which the resistance of a metal wire depends, and say how it depends on each. [3]\n\n(b) The heating coil of an immersion rod uses 1.5 m of alloy wire of cross-sectional area 0.3 mm²; the specific resistance of the alloy is $1.0 \\times 10^{-6}$ Ω m. (i) Find the resistance of the coil. (ii) Find the current when 3 V is applied in a test. (iii) What length of the same wire would have a resistance of 20 Ω? [3]\n\n(c) (i) What is a superconductor? (ii) Name the element in which superconductivity was first observed. (iii) State one advantage of superconducting power cables. (iv) How does the resistance of a silicon chip change when it is warmed? [4]',
  model: r`(a) Length: R is directly proportional to it. Area of cross-section: R is inversely proportional to it. Temperature: for a metal, R increases as it rises. (The material also decides R through its specific resistance.)

(b) (i) $R = \dfrac{\rho l}{A} = \dfrac{1.0 \times 10^{-6} \times 1.5}{0.3 \times 10^{-6}} = 5$ Ω. (ii) $I = \dfrac{3}{5} = 0.6$ A. (iii) $l = \dfrac{20 \times 0.3 \times 10^{-6}}{1.0 \times 10^{-6}} = 6$ m.

(c) (i) A material whose resistance falls to zero below a critical temperature. (ii) Mercury (below about 4.2 K). (iii) No energy is wasted as heat in the cable. (iv) It decreases, since silicon is a semiconductor.`,
  sol: 'Factors; three calculations; superconductors.',
  scheme: [['(a) three factors', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(Rw, 5) && near(3 / Rw, 0.6) && near((20 * 0.3e-6) / 1e-6, 6) || 'rho');
const Ie = 2 / (3.5 + 0.5);
const re2 = (1.5 - 1.2) / (1.2 / 2);
add('emf-long', long({
  stem: '(a) Define the e.m.f. of a cell and its internal resistance. State one factor that increases the internal resistance. [3]\n\n(b) A cell of e.m.f. 2 V and internal resistance 0.5 Ω is joined to a 3.5 Ω resistor. Calculate (i) the current, (ii) the terminal voltage and (iii) the lost volts. [3]\n\n(c) A voltmeter across a dry cell reads 1.5 V with the key open. When the key is closed so that the cell drives current through a 2 Ω resistor, the voltmeter reads 1.2 V. (i) Find the current. (ii) Find the internal resistance. (iii) Why does the reading fall when the key is closed? (iv) What would the voltmeter read if the 2 Ω resistor were replaced by a much larger one? [4]',
  model: r`(a) E.m.f.: the work done by the cell per unit positive charge in taking it round the complete circuit, cell included (the terminal p.d. on open circuit). Internal resistance: the opposition of the electrolyte inside the cell to the current. It increases if the electrodes are farther apart (or the electrolyte is more concentrated, or the electrode area in the electrolyte is smaller).

(b) (i) $I = \dfrac{2}{3.5 + 0.5} = 0.5$ A. (ii) $V = 0.5 \times 3.5 = 1.75$ V. (iii) $Ir = 0.5 \times 0.5 = 0.25$ V.

(c) (i) $I = \dfrac{1.2}{2} = 0.6$ A. (ii) $r = \dfrac{1.5 - 1.2}{0.6} = 0.5$ Ω. (iii) Current now flows through the internal resistance and 0.3 V is lost inside the cell. (iv) Nearly 1.5 V, because the current, and so Ir, becomes very small.`,
  sol: 'Definitions; three calculations; internal resistance from two readings.',
  scheme: [['(a) definitions', 2], ['(a) factor', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(Ie, 0.5) && near(Ie * 3.5, 1.75) && near(re2, 0.5) || 'emf');
const Rs3 = 4 + 8 + 12;
const Is3 = 6 / Rs3;
const Rp3b = 1 / (1 / 4 + 1 / 8 + 1 / 12);
add('series-long', long({
  stem: '(a) Three resistors $R_{1}$, $R_{2}$ and $R_{3}$ are connected in series across a battery. Derive an expression for their equivalent resistance. [3]\n\n(b) Resistors of 4 Ω, 8 Ω and 12 Ω are connected in series across a 6 V supply of negligible internal resistance. Find (i) the equivalent resistance, (ii) the current and (iii) the p.d. across each resistor. [3]\n\n(c) The same three resistors are now connected in parallel across the same supply. Find (i) the current in each resistor, (ii) the total current and (iii) the equivalent resistance. (iv) State one advantage of connecting household lamps in this way. [4]',
  model: r`(a) The same current I flows through each resistor, and the supply p.d. is shared: $V = V_{1} + V_{2} + V_{3} = IR_{1} + IR_{2} + IR_{3}$. For the equivalent resistor $V = IR_{s}$, so $IR_{s} = I(R_{1} + R_{2} + R_{3})$ and $R_{s} = R_{1} + R_{2} + R_{3}$.

(b) (i) $4 + 8 + 12 = 24$ Ω. (ii) $I = \dfrac{6}{24} = 0.25$ A. (iii) $0.25 \times 4 = 1$ V, $0.25 \times 8 = 2$ V, $0.25 \times 12 = 3$ V.

(c) (i) $\dfrac{6}{4} = 1.5$ A, $\dfrac{6}{8} = 0.75$ A, $\dfrac{6}{12} = 0.5$ A. (ii) $1.5 + 0.75 + 0.5 = 2.75$ A. (iii) $R_{p} = \dfrac{6}{2.75} \approx 2.18$ Ω. (iv) Each lamp gets the full mains voltage and can be switched on or off without affecting the others.`,
  sol: 'Derivation; series values; parallel values.',
  scheme: [['(a) derivation', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [4],
}), () => Rs3 === 24 && near(Is3, 0.25) && near(6 / Rp3b, 2.75) && near(Rp3b, 2.18, 0.005) || 'series');
const Ip = (4 * 12) / (4 + 12);
const In = 6 / (0.4 + 1.6 + Ip);
const Vpair = In * Ip;
add('network-long', long({
  stem: '(a) Derive the expression for the equivalent resistance of two resistors connected in parallel. [3]\n\n(b) A battery of e.m.f. 6 V and internal resistance 0.4 Ω is connected to a 1.6 Ω resistor in series with a parallel pair of 4 Ω and 12 Ω. Find (i) the equivalent resistance of the pair, (ii) the current drawn from the battery and (iii) the terminal voltage. [3]\n\n(c) (i) Find the p.d. across the parallel pair. (ii) Find the current in the 4 Ω and the 12 Ω resistors. (iii) The 12 Ω resistor is now removed. Find the new current from the battery. (iv) Does the terminal voltage rise or fall when the 12 Ω resistor is removed? Give a reason. [4]',
  model: r`(a) Both resistors have the same p.d. V; the currents add: $I = I_{1} + I_{2} = \dfrac{V}{R_{1}} + \dfrac{V}{R_{2}}$. For the equivalent resistor $I = \dfrac{V}{R_{p}}$, so $\dfrac{1}{R_{p}} = \dfrac{1}{R_{1}} + \dfrac{1}{R_{2}}$, that is $R_{p} = \dfrac{R_{1}R_{2}}{R_{1} + R_{2}}$.

(b) (i) $\dfrac{4 \times 12}{4 + 12} = 3$ Ω. (ii) $I = \dfrac{6}{0.4 + 1.6 + 3} = 1.2$ A. (iii) $V = 6 - 1.2 \times 0.4 = 5.52$ V.

(c) (i) $1.2 \times 3 = 3.6$ V. (ii) $\dfrac{3.6}{4} = 0.9$ A and $\dfrac{3.6}{12} = 0.3$ A. (iii) Total resistance $0.4 + 1.6 + 4 = 6$ Ω, so $I = \dfrac{6}{6} = 1$ A. (iv) It rises (to $6 - 1 \times 0.4 = 5.6$ V), because a smaller current means smaller lost volts.`,
  sol: 'Derivation; network current; branch currents and the effect of removing a branch.',
  scheme: [['(a) derivation', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 4, c: 'analysis', t: [3, 4],
}), () => near(Ip, 3) && near(In, 1.2) && near(6 - In * 0.4, 5.52) && near(Vpair / 4 + Vpair / 12, In) && near(6 / (0.4 + 1.6 + 4), 1) || 'network');
