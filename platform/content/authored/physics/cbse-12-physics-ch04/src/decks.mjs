// ch04 Moving Charges and Magnetism — two decks: Part 1 (t01–t03) magnetic force on charges, Biot–Savart law, the loop
// axis, Ampere's law and the solenoid; Part 2 (t04–t06) forces on currents, torque on loops and the galvanometer.
// Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, QE, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;
export const MP = 1.67e-27;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = (() => {
  const v = 2.0e6;
  const B = 0.5;
  const rr = (MP * v) / (QE * B);
  const T = (2 * Math.PI * MP) / (QE * B);
  return { rr, T };
})();
const ex2 = { v: 3.0e4 / 0.02 };
const ex3 = (() => {
  const N = 100;
  const I = 2.0;
  const R = 0.05;
  const Bc = (MU0 * N * I) / (2 * R);
  const Bx = Bc / 2 ** 1.5;
  return { Bc, Bx };
})();
const ex4 = { Bw: (MU0 * 10) / (2 * Math.PI * 0.05), Bs: MU0 * 1000 * 2 };
const ex5 = { f: (MU0 * 5 * 8) / (2 * Math.PI * 0.04) };
const ex6 = (() => {
  const N = 50;
  const A = 0.04 * 0.05;
  const I = 0.5;
  const B = 0.2;
  const m = N * I * A;
  return { A, m, tau: m * B * 0.5, tmax: m * B };
})();
const ex7 = (() => {
  const G0 = 50;
  const Ig = 2e-3;
  const S = (Ig * G0) / (1 - Ig);
  const R = 10 / Ig - G0;
  return { S, R };
})();
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  circle: svgV(G.CIRCLE, 'A positive charge moving in a circle in a magnetic field into the page, with the magnetic force pointing to the centre'),
  selector: svgV(G.SELECTOR, 'Velocity selector with crossed electric and magnetic fields balancing the forces on a moving charge'),
  biot: svgV(G.BIOT, 'Biot–Savart geometry: a current element, the distance r to a point P and the field dB out of the page'),
  loop: svgV(G.LOOP_AXIS, 'Field on the axis of a circular loop built from pairs of opposite elements', 'Directions computed from the Biot–Savart law: the perpendicular parts cancel.'),
  ampere: svgV(G.AMPERE, 'Circular field lines round a straight wire and an Amperian loop'),
  solenoid: svgV(G.SOLENOID, 'Section through a long solenoid with a uniform field inside'),
  parallel: svgV(G.PARALLEL, 'Two parallel wires with currents in the same direction attracting each other'),
  torque: svgV(G.TORQUE, 'Side view of a current loop in a uniform field with a couple of forces and the magnetic moment'),
  meters: svgV(G.METERS, 'Galvanometer with a shunt to make an ammeter and with a series resistor to make a voltmeter'),
};
export const loopPlot = plot(
  {
    x: { min: -3, max: 3, label: 'x / R (distance along the axis)' },
    y: { min: 0, max: 1.1, label: 'B / B at the centre' },
    functions: [{ expr: '1/(1 + x^2)^(3/2)', label: 'B = B₀ / (1 + x²/R²)^(3/2)' }],
    points: [{ at: [0, 1], label: 'centre: B₀ = μ₀I/2R' }],
  },
  'Field on the axis of a circular loop: largest at the centre and falling off symmetrically on both sides, to about one third at x equal to R',
  'Shape of the axial field; at x = R the field is 1/2^(3/2) ≈ 0.35 of the centre value.',
);
export const wirePlot = plot(
  {
    x: { min: 0.2, max: 4, label: 'r (arbitrary units)' },
    y: { min: 0, max: 5.2, label: 'B (arbitrary units)' },
    functions: [{ expr: '1/x', label: 'long straight wire: B ∝ 1/r' }],
  },
  'Field of a long straight wire falling as one over the distance from the wire',
);

export const deck1 = deck({
  part: 1,
  title: 'Moving Charges and Magnetism — Part 1: Magnetic force and the fields of currents',
  goals: [
    'Use the Lorentz force and describe the motion of a charge in a uniform magnetic field and in crossed fields',
    'State the Biot–Savart law and derive the field on the axis of a circular loop',
    'Apply Ampere’s circuital law to a long straight wire and describe the field of a solenoid',
  ],
  slides: [
    sl('title', 'Moving Charges and Magnetism', {
      b: 'Part 1 — how a magnetic field pushes on moving charges, and how moving charges (currents) create magnetic fields.',
      v: flow('LR', [['f', 'Lorentz force'], ['m', 'Motion in B'], ['b', 'Biot–Savart law'], ['l', 'Loop axis'], ['a', 'Ampere’s law']], [['f', 'm'], ['m', 'b'], ['b', 'l'], ['l', 'a']], 'Flow of the part: Lorentz force, motion in a magnetic field, Biot–Savart law, field on a loop axis, Ampere’s law'),
      n: 'In 1820 a compass needle twitched beside a current-carrying wire, and electricity and magnetism were found to be linked. In this part we see how a magnetic field pushes on a moving charge, which is how particle detectors and mass spectrometers bend beams. Then we turn it round and find the fields that currents make, using the Biot Savart law and Ampere’s law.',
    }),
    sl('concept', 'The Lorentz force', {
      b: r`A charge $q$ moving with velocity $\vec v$ in fields $\vec E$ and $\vec B$ feels
$$\vec F = q\left[\vec E + \vec v \times \vec B\right]$$
The magnetic part has size $F = qvB\sin\theta$ and is **perpendicular to both** $\vec v$ and $\vec B$. Unit of $B$: **tesla**, $1\ \text{T} = 1\ \text{N s C}^{-1}\,\text{m}^{-1}$.`,
      ul: ['No magnetic force on a charge at rest, or moving parallel to $\\vec B$.', 'The magnetic force does **no work**: it changes the direction of motion, not the speed.', 'For a negative charge the force is opposite to $\\vec v \\times \\vec B$.'],
      v: table(['Situation', 'Magnetic force'], [['Charge at rest', '0'], ['v parallel to B', '0'], ['v perpendicular to B', 'qvB (largest)'], ['v at angle θ to B', 'qvB sin θ']], 'Table of the magnetic force for a charge at rest, moving parallel, perpendicular and at an angle to the field'),
      n: 'The Lorentz force combines two parts. The electric part, q E, acts whether or not the charge moves. The magnetic part, q v cross B, needs motion: its size is q v B sine theta and its direction is at right angles to both the velocity and the field. Because it is always at right angles to the velocity, the magnetic force never changes a particle’s speed, only its direction.',
    }),
    sl('diagram', 'Circular motion in a uniform field', {
      b: r`If $\vec v \perp \vec B$, the force $qvB$ is always towards a fixed centre, so the charge moves in a **circle**:
$$qvB = \dfrac{mv^2}{r} \Rightarrow r = \dfrac{mv}{qB},\qquad T = \dfrac{2\pi m}{qB},\qquad f = \dfrac{qB}{2\pi m}$$
The period does not depend on the speed. With a velocity component along $\vec B$ the path is a **helix**.`,
      v: V.circle,
      n: 'When a charge moves at right angles to a uniform field, the magnetic force is always perpendicular to its velocity and of constant size, so it supplies a centripetal force. The charge goes round a circle of radius m v over q B. Faster particles move on bigger circles, but they take exactly the same time per revolution: the period is two pi m over q B. A velocity component along the field stretches the circle into a helix.',
    }),
    sl('example', 'Worked example 1: a proton in a magnetic field', {
      b: r`A proton moves at $2.0 \times 10^{6}$ m s$^{-1}$ perpendicular to a uniform field of $0.50$ T. Find the radius of its path and its period. ($m_p = 1.67 \times 10^{-27}$ kg)`,
      ul: [
        r`Step 1 — $r = \dfrac{mv}{qB} = \dfrac{1.67 \times 10^{-27} \times 2.0 \times 10^{6}}{1.6 \times 10^{-19} \times 0.50} = ${sci(ex1.rr, 3)}$ m (about 4.2 cm).`,
        r`Step 2 — $T = \dfrac{2\pi m}{qB} = \dfrac{2\pi \times 1.67 \times 10^{-27}}{1.6 \times 10^{-19} \times 0.50} \approx ${sci(ex1.T, 3)}$ s.`,
        'Check — doubling the speed doubles $r$ but leaves $T$ unchanged.',
      ],
      v: V.circle,
      n: 'Use r equals m v over q B with SI values: the proton circles with a radius of about four centimetres. The period, two pi m over q B, is about one point three times ten to the minus seven seconds. Notice the speed cancels from the period. That is a strong check on your algebra, and it is the reason particle accelerators can keep charges in step with a fixed-frequency supply.',
    }),
    sl('two-column', 'Crossed fields: the velocity selector', {
      b: 'With $\\vec E$, $\\vec B$ and $\\vec v$ mutually perpendicular and the forces opposite:',
      cols: [
        r`**Balance**
$$qE = qvB \ \Rightarrow\ v = \dfrac{E}{B}$$
Only particles with this speed pass undeflected, whatever their charge or mass.`,
        r`**Faster or slower?**
- $v > E/B$: magnetic force wins, deflected one way.
- $v < E/B$: electric force wins, deflected the other way.
Used to pick one speed from a beam (J.J. Thomson’s e/m experiment, mass spectrometers).`,
      ],
      v: V.selector,
      n: 'Arrange an electric field and a magnetic field at right angles so that their forces on a moving charge point in opposite directions. The electric force q E is the same at all speeds, but the magnetic force q v B grows with speed. They balance only when v equals E over B, so only charges with that speed travel straight through. This velocity selector works for any charge or mass.',
    }),
    sl('example', 'Worked example 2: selecting a speed', {
      b: r`In a velocity selector, $E = 3.0 \times 10^{4}$ V m$^{-1}$ and $B = 0.020$ T. Which speed passes undeflected? What happens to a particle twice as fast?`,
      ul: [
        r`Step 1 — $v = \dfrac{E}{B} = \dfrac{3.0 \times 10^{4}}{0.020} = ${sci(ex2.v, 2)}$ m s$^{-1}$.`,
        'Step 2 — at twice this speed the magnetic force is twice the electric force, so the particle is deflected in the direction of the magnetic force.',
        'Note — the result does not depend on the charge or mass of the particle.',
      ],
      v: V.selector,
      n: 'Divide the electric field by the magnetic field: one point five million metres per second passes straight through. A particle moving twice as fast feels a magnetic force twice as large as the electric force, so the magnetic force wins and bends it. Because the charge cancels in the balance, electrons, protons and ions are all selected at the same speed.',
    }),
    sl('check', 'Quick check: work by a magnetic force', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'nowork-tf',
      n: 'Think about the angle between the magnetic force and the velocity at every instant, and what that means for the work done.',
    }),
    sl('diagram', 'The Biot–Savart law', {
      b: r`A current element $I\,d\vec l$ produces at a point a distance $r$ away
$$d\vec B = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,d\vec l \times \hat r}{r^2},\qquad dB = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,dl\sin\theta}{r^2}$$
with $\mu_0 = 4\pi \times 10^{-7}$ T m A$^{-1}$. $d\vec B$ is perpendicular to both $d\vec l$ and $\vec r$.`,
      ul: ['Compare with Coulomb’s law: both fall as $1/r^2$, but $d\\vec B$ depends on direction through $\\sin\\theta$.', 'Zero field along the line of the element ($\\theta = 0$).'],
      v: V.biot,
      n: 'The Biot Savart law gives the field of a tiny piece of current. Its size is mu nought over four pi, times I d l sine theta, over r squared, and its direction is at right angles to both the current element and the line to the point. Like Coulomb’s law it is an inverse square law, but it depends on the angle: a point directly in line with the element gets no field from it.',
    }),
    sl('concept', 'Field on the axis of a circular loop', {
      b: r`For a loop of radius $R$ and current $I$, every element is at distance $\sqrt{R^2 + x^2}$ from P and at $90^\circ$ to the line to P. Opposite elements’ perpendicular components cancel; the axial components add:`,
      m: [r`B = \oint \dfrac{\mu_0}{4\pi}\,\dfrac{I\,dl}{R^2 + x^2}\cdot\dfrac{R}{\sqrt{R^2 + x^2}} = \dfrac{\mu_0 I R^2}{2\left(R^2 + x^2\right)^{3/2}}`],
      ul: ['At the centre ($x = 0$): $B = \\dfrac{\\mu_0 I}{2R}$; with $N$ turns multiply by $N$.', 'Direction: curl the right-hand fingers with the current; the thumb gives $\\vec B$.'],
      v: V.loop,
      n: 'Every element of the loop is the same distance from a point on the axis and at right angles to the line joining them, so each gives the same size of field. Pair elements on opposite sides: their sideways components cancel and their components along the axis add. Adding all the axial parts gives mu nought I R squared over two times R squared plus x squared to the power three halves. At the centre this is mu nought I over two R.',
    }),
    sl('example', 'Worked example 3: a flat coil', {
      b: r`A flat coil of 100 turns and radius 5.0 cm carries 2.0 A. Find the field at its centre and on its axis 5.0 cm from the centre.`,
      ul: [
        r`Step 1 — centre: $B_0 = \dfrac{\mu_0 N I}{2R} = \dfrac{4\pi \times 10^{-7} \times 100 \times 2.0}{2 \times 0.050} = ${sci(ex3.Bc, 3)}$ T.`,
        r`Step 2 — on the axis at $x = R$: $B = \dfrac{B_0}{(1 + 1)^{3/2}} = \dfrac{B_0}{2\sqrt{2}} \approx ${sci(ex3.Bx, 3)}$ T.`,
        'Check — about 35% of the centre value, as the graph shows.',
      ],
      v: loopPlot,
      n: 'At the centre, multiply mu nought by the number of turns and the current and divide by twice the radius: about two point five millitesla. At a point on the axis one radius away, R squared plus x squared is two R squared, so the field is the centre value divided by two root two, about point nine millitesla. The graph shows how quickly the field falls along the axis.',
    }),
    sl('check', 'Quick check: doubling the radius', {
      b: 'A loop carries a fixed current. Its radius is doubled.',
      v: loopPlot,
      chk: 'loopR-mcq',
      n: 'Use the field at the centre, mu nought I over two R, and see how it depends on R.',
    }),
    sl('concept', 'Ampere’s circuital law', {
      b: r`The line integral of $\vec B$ round any closed loop equals $\mu_0$ times the current threading the loop:
$$\oint \vec B\cdot d\vec l = \mu_0 I_\text{enc}$$
**Long straight wire:** take a circle of radius $r$; $B$ is tangential and constant on it: $B \cdot 2\pi r = \mu_0 I$, so $B = \dfrac{\mu_0 I}{2\pi r}$.`,
      ul: ['Field lines round a wire are circles; the right-hand thumb rule gives their sense.', 'Like Gauss’s law, it is always true but useful only with symmetry.'],
      v: V.ampere,
      n: 'Ampere’s law plays the role for magnetism that Gauss’s law plays for electrostatics. Go round any closed loop adding B dot d l, and the total equals mu nought times the current passing through the loop. For a long straight wire, choose a circle centred on the wire: by symmetry the field is tangential and the same all the way round, so B times two pi r equals mu nought I.',
    }),
    sl('diagram', 'The solenoid', {
      b: r`A long, tightly wound solenoid with $n$ turns per unit length carrying $I$ has a **uniform** field inside along its axis and nearly zero field outside:
$$B = \mu_0 n I$$
Its ends behave like the N and S poles of a bar magnet.`,
      v: V.solenoid,
      n: 'Wind wire closely into a long coil and the fields of all the turns add up inside to a strong, uniform field along the axis, mu nought n I, where n is the number of turns per metre. Outside, the contributions nearly cancel. The pattern is just like that of a bar magnet, with a north pole at the end where, looking in, the current flows anticlockwise. The syllabus treats the solenoid qualitatively.',
    }),
    sl('example', 'Worked example 4: wire and solenoid', {
      b: r`(a) Find the field 5.0 cm from a long straight wire carrying 10 A. (b) Find the field inside a long solenoid with 1000 turns per metre carrying 2.0 A.`,
      ul: [
        r`(a) $B = \dfrac{\mu_0 I}{2\pi r} = \dfrac{2 \times 10^{-7} \times 10}{0.050} = ${sci(ex4.Bw, 2)}$ T, along circles round the wire.`,
        r`(b) $B = \mu_0 nI = 4\pi \times 10^{-7} \times 1000 \times 2.0 \approx ${sci(ex4.Bs, 3)}$ T, along the axis.`,
        'Compare — the Earth’s field is about $5 \\times 10^{-5}$ T, similar to (a).',
      ],
      v: wirePlot,
      n: 'For the wire, mu nought over two pi is two times ten to the minus seven, so the field five centimetres away is four times ten to the minus five tesla, about the same as the Earth’s field. That is why a compass near a wire is deflected noticeably. The solenoid concentrates the field: with a thousand turns per metre and two amperes, the field inside is two and a half millitesla.',
    }),
    sl('check', 'Quick check: field of a wire', {
      b: 'Find the field of a long straight wire.',
      v: V.ampere,
      chk: 'wire-num',
      n: 'Use B equals mu nought I over two pi r, and remember that mu nought over two pi is two times ten to the minus seven.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Situation', 'Result'],
        [
          ['Lorentz force', '$\\vec F = q(\\vec E + \\vec v \\times \\vec B)$'],
          ['Circular motion', '$r = mv/qB$, $T = 2\\pi m/qB$'],
          ['Velocity selector', '$v = E/B$'],
          ['Biot–Savart', '$dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}$'],
          ['Loop axis / centre', '$\\dfrac{\\mu_0 IR^2}{2(R^2+x^2)^{3/2}}$ / $\\dfrac{\\mu_0 I}{2R}$'],
          ['Straight wire', '$\\mu_0 I/2\\pi r$'],
          ['Solenoid', '$\\mu_0 nI$'],
        ],
        'Summary table of the Lorentz force, circular motion, velocity selector, Biot–Savart law, loop, wire and solenoid fields',
      ),
      n: 'To sum up: a magnetic field pushes a moving charge sideways with force q v B sine theta and never changes its speed, so charges circle with radius m v over q B. Crossed fields pick out the speed E over B. Currents create fields: the Biot Savart law gives the field of a loop, and Ampere’s law gives the field of a long wire and of a solenoid.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Direction of $\\vec v \\times \\vec B$: use the right-hand rule, then reverse for a negative charge.',
        'Loop-axis derivation: figure, $dB$ perpendicular to $\\vec r$, cancel perpendicular components, integrate $dl$ to $2\\pi R$.',
        'Name the Amperian loop and say why $B$ is constant and tangential on it.',
        'Keep $\\mu_0/4\\pi = 10^{-7}$ and $\\mu_0/2\\pi = 2 \\times 10^{-7}$ handy.',
      ],
      v: table(['Common slip', 'Fix'], [['Force on an electron drawn along v × B', 'Reverse it for negative charge'], ['Speed changed by a magnetic field', 'Only direction changes'], ['Forgetting N turns', 'Multiply loop fields by N']], 'Table of common slips and fixes for magnetic force and field questions'),
      n: 'Most mistakes here are about directions. Work out v cross B with your right hand and remember to reverse it for electrons. In the loop derivation, show the cancellation of the perpendicular components clearly. In Ampere’s law, say which loop you chose and why the field is constant along it. And keep the handy constants: mu nought over four pi is ten to the minus seven.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Moving Charges and Magnetism — Part 2: Forces and torques on currents; the galvanometer',
  goals: [
    'Find the force on a current-carrying conductor and between two parallel currents; define the ampere',
    'Calculate the torque on a current loop and treat it as a magnetic dipole',
    'Explain the moving coil galvanometer and its conversion into an ammeter and a voltmeter',
  ],
  slides: [
    sl('title', 'Forces and torques on currents', {
      b: 'Part 2 — the push on a wire in a magnetic field, the pull between two currents, and the turning effect that makes meters and motors work.',
      v: flow('LR', [['f', 'Force on a wire'], ['p', 'Parallel currents'], ['a', 'The ampere'], ['t', 'Torque on a loop'], ['g', 'Galvanometer']], [['f', 'p'], ['p', 'a'], ['a', 't'], ['t', 'g']], 'Flow of the part: force on a wire, parallel currents, the ampere, torque on a loop, galvanometer'),
      n: 'A current is a stream of moving charges, so a wire carrying current in a magnetic field feels a force. In this part we find that force, see why two parallel currents attract, and use it to define the ampere. Then we find the torque on a current loop, which turns the coil of every analogue meter, and learn how a galvanometer becomes an ammeter or a voltmeter.',
    }),
    sl('concept', 'Force on a current-carrying conductor', {
      b: r`Adding the forces $q\vec v_d \times \vec B$ on all the drifting charges in a straight conductor of length $l$:
$$\vec F = I\,\vec l \times \vec B,\qquad F = IlB\sin\theta$$
where $\vec l$ points along the current.`,
      ul: ['Largest when the wire is perpendicular to $\\vec B$; zero when parallel.', 'Direction: perpendicular to both the wire and the field (Fleming’s left-hand rule gives the same answer).'],
      v: table(['Wire relative to B', 'Force'], [['Parallel', '0'], ['At angle θ', 'IlB sin θ'], ['Perpendicular', 'IlB (largest)']], 'Table: the force on a wire is zero parallel to the field, I l B sine theta at an angle and largest perpendicular'),
      n: 'A wire carrying current contains a huge number of drifting charges, each feeling q v cross B. Add them all up and the total force on a straight piece of wire is I l cross B. Its size is I l B sine theta, largest when the wire crosses the field at right angles and zero when it lies along the field. This force drives every electric motor and loudspeaker.',
    }),
    sl('diagram', 'Force between two parallel currents', {
      b: r`Wire 1 makes a field $B_1 = \dfrac{\mu_0 I_1}{2\pi d}$ at wire 2. The force on a length $L$ of wire 2 is $I_2 L B_1$, so the force per unit length is
$$\dfrac{F}{L} = \dfrac{\mu_0 I_1 I_2}{2\pi d}$$
**Like currents attract; opposite currents repel.**`,
      v: V.parallel,
      n: 'Each wire sits in the field of the other. The first wire’s field at the second is mu nought I one over two pi d, and the second wire, carrying I two, feels a force I two times that field per metre. The result is mu nought I one I two over two pi d per unit length. Using the right-hand rules, currents in the same direction attract, which is the opposite of the rule for like charges.',
    }),
    sl('concept', 'Defining the ampere', {
      b: r`If two long parallel wires 1 m apart in vacuum carry equal currents and the force on each is $2 \times 10^{-7}$ N per metre of length, each current is **1 ampere**:
$$\dfrac{F}{L} = \dfrac{\mu_0 (1)(1)}{2\pi (1)} = 2 \times 10^{-7}\ \text{N m}^{-1}$$`,
      ul: ['This is the classic definition; since 2019 the SI fixes the value of $e$ instead, but the numbers agree.', 'One coulomb is the charge carried by one ampere in one second.'],
      v: V.parallel,
      n: 'The force between parallel wires gave the classic definition of the ampere. Two long, thin, straight wires one metre apart in vacuum, carrying equal currents, push or pull each other with two times ten to the minus seven newton on every metre of length when each current is one ampere. Today the SI defines the ampere through the electron’s charge, but the old definition still describes the same size of unit.',
    }),
    sl('example', 'Worked example 5: force between two wires', {
      b: r`Two long parallel wires 4.0 cm apart carry 5.0 A and 8.0 A in the same direction. Find the force on 1 m of either wire.`,
      ul: [
        r`Step 1 — $\dfrac{F}{L} = \dfrac{\mu_0 I_1 I_2}{2\pi d} = \dfrac{2 \times 10^{-7} \times 5.0 \times 8.0}{0.040} = ${sci(ex5.f, 2)}$ N m$^{-1}$.`,
        'Step 2 — currents in the same direction, so the force is **attractive**.',
        'Check — Newton’s third law: the 5 A wire feels the same force as the 8 A wire.',
      ],
      v: V.parallel,
      n: 'Use mu nought over two pi equals two times ten to the minus seven. Multiply by the two currents and divide by the separation in metres: two times ten to the minus four newton on every metre. The currents run the same way, so the wires attract. Both wires feel exactly the same size of force, even though their currents differ, as Newton’s third law requires.',
    }),
    sl('check', 'Quick check: opposite currents', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'opposite-ar',
      n: 'Work out the field of one wire at the other with the right-hand rule, then the force on the second wire.',
    }),
    sl('diagram', 'Torque on a current loop', {
      b: r`A rectangular coil of $N$ turns, area $A$, current $I$ in a uniform field: forces on opposite sides are equal and opposite (net force zero) but form a **couple**:
$$\tau = NIAB\sin\theta,\qquad \vec\tau = \vec m \times \vec B,\qquad \vec m = NI\vec A$$
$\theta$ is the angle between the normal to the coil (direction of $\vec m$) and $\vec B$.`,
      v: V.torque,
      n: 'Put a rectangular coil in a uniform field. The two sides parallel to the axis of rotation feel equal and opposite forces, so the coil does not move as a whole, but the forces form a couple. The torque is N I A B sine theta, where theta is the angle between the coil’s normal and the field. It is largest when the plane of the coil is along the field and zero when the coil faces the field.',
    }),
    sl('two-column', 'The current loop as a magnetic dipole', {
      b: 'The magnetic moment $\\vec m = NI\\vec A$ (unit A m²) plays the role of the electric dipole moment:',
      cols: [
        r`**Electric dipole in $\vec E$**
- $\vec\tau = \vec p \times \vec E$
- Stable when $\vec p \parallel \vec E$
- Far field $\propto p/r^3$`,
        r`**Current loop in $\vec B$**
- $\vec\tau = \vec m \times \vec B$
- Stable when $\vec m \parallel \vec B$
- Far field on the axis $\dfrac{\mu_0}{4\pi}\dfrac{2m}{r^3}$`,
      ],
      v: V.torque,
      n: 'A small current loop behaves exactly like a magnetic dipole. Its magnetic moment, N I A, points along the normal given by the right-hand rule. In a uniform field it feels a torque m cross B that turns it into line with the field, just as an electric dipole turns in an electric field. Far away, its field on the axis is mu nought over four pi times two m over r cubed, the same form as the electric dipole field.',
    }),
    sl('example', 'Worked example 6: torque on a coil', {
      b: r`A rectangular coil of 50 turns, 4.0 cm × 5.0 cm, carries 0.50 A in a uniform field of 0.20 T. The normal to the coil makes $30^\circ$ with the field. Find the magnetic moment and the torque, and the largest possible torque.`,
      ul: [
        r`Step 1 — $A = 0.040 \times 0.050 = ${sci(ex6.A, 2)}$ m²; $m = NIA = 50 \times 0.50 \times 2.0 \times 10^{-3} = ${dec(ex6.m, 2)}$ A m².`,
        r`Step 2 — $\tau = mB\sin 30^\circ = 0.050 \times 0.20 \times 0.5 = ${sci(ex6.tau, 2)}$ N m.`,
        r`Step 3 — largest at $90^\circ$: $\tau_\text{max} = mB = ${sci(ex6.tmax, 2)}$ N m.`,
      ],
      v: table(['Quantity', 'Value'], [['m', `${dec(ex6.m, 2)} A m²`], ['τ at 30°', `$${sci(ex6.tau, 2)}$ N m`], ['τ max', `$${sci(ex6.tmax, 2)}$ N m`]], 'Worked table: magnetic moment 0.050 ampere square metre, torque 5.0 times ten to the minus three newton metre at 30 degrees and 1.0 times ten to the minus two at most'),
      n: 'First find the area in square metres, two times ten to the minus three. The magnetic moment is turns times current times area, zero point zero five ampere square metre. Multiply by B and by sine thirty degrees to get five times ten to the minus three newton metre. When the normal is at right angles to the field the torque doubles to its maximum, one times ten to the minus two newton metre.',
    }),
    sl('check', 'Quick check: zero torque', {
      b: 'At which orientation is the torque on a current loop zero?',
      v: V.torque,
      chk: 'zerotorque-mcq',
      n: 'Torque depends on sine theta, where theta is measured between the normal to the coil and the field.',
    }),
    sl('concept', 'The moving coil galvanometer', {
      b: r`A coil on a soft-iron core sits in a **radial** field between concave pole pieces, so $\vec B$ is always in the plane of the coil and the torque is $NIAB$ at every angle. A spring provides a restoring torque $k\phi$. At equilibrium:
$$NIAB = k\phi \Rightarrow \phi = \left(\dfrac{NAB}{k}\right) I$$`,
      ul: ['The deflection is proportional to the current: a linear scale.', '**Current sensitivity** $\\phi/I = NAB/k$; **voltage sensitivity** $\\phi/V = NAB/(kG)$.', 'Increasing $N$ raises current sensitivity, but also the resistance $G$, so voltage sensitivity need not rise.'],
      v: table(['Part', 'Purpose'], [['Concave pole pieces', 'Make the field radial'], ['Soft-iron core', 'Strengthens and shapes the field'], ['Spring (phosphor bronze)', 'Restoring torque kφ'], ['Pointer and scale', 'Reads the deflection']], 'Table of galvanometer parts and their purposes: pole pieces, soft-iron core, spring, pointer and scale'),
      n: 'In a moving coil galvanometer the magnet’s pole pieces are curved and a soft-iron cylinder sits inside the coil, so the field is radial. Then the plane of the coil always lies along the field, and the torque is N I A B whatever the angle. A spring twists back with a torque proportional to the deflection. Balancing the two, the deflection is proportional to the current, giving an evenly spaced scale.',
    }),
    sl('diagram', 'Galvanometer to ammeter and voltmeter', {
      b: 'A galvanometer (resistance $G$, full-scale current $I_g$) can be converted:',
      ul: [
        r`**Ammeter (range $I$):** small **shunt** $S$ in parallel, $S = \dfrac{I_g G}{I - I_g}$. Total resistance is very small.`,
        r`**Voltmeter (range $V$):** large **series** resistance $R = \dfrac{V}{I_g} - G$. Total resistance is very large.`,
      ],
      v: V.meters,
      n: 'A galvanometer gives a full-scale reading with only a few milliamperes. To measure large currents, connect a small shunt resistance in parallel so that most of the current bypasses the coil; the ammeter then has very small resistance and hardly disturbs the circuit it is put in series with. To measure voltage, add a large resistance in series, so the meter draws very little current from the points it is connected across.',
    }),
    sl('example', 'Worked example 7: converting a galvanometer', {
      b: r`A galvanometer of resistance 50 Ω gives full-scale deflection for 2.0 mA. Find (a) the shunt needed to make a 0–1.0 A ammeter, (b) the series resistance needed for a 0–10 V voltmeter.`,
      ul: [
        r`(a) $S = \dfrac{I_g G}{I - I_g} = \dfrac{0.0020 \times 50}{1.0 - 0.0020} \approx ${dec(ex7.S, 3)}$ Ω, in parallel.`,
        r`(b) $R = \dfrac{V}{I_g} - G = \dfrac{10}{0.0020} - 50 = ${dec(ex7.R, 4)}$ Ω, in series.`,
        'Check — the ammeter’s total resistance is below 0.1 Ω; the voltmeter’s is 5000 Ω.',
      ],
      v: V.meters,
      n: 'For the ammeter, only two milliamperes may pass through the coil; the remaining nine hundred and ninety eight milliamperes go through the shunt, which has the same voltage across it. That gives a shunt of about zero point one ohm. For the voltmeter, the total resistance must be ten volts divided by two milliamperes, five thousand ohms, so add four thousand nine hundred and fifty ohms in series.',
    }),
    sl('check', 'Quick check: an ideal ammeter', {
      b: 'Judge the statement about meters.',
      v: V.meters,
      chk: 'ammeterR-mcq',
      n: 'An ammeter is placed in series with the circuit element. Ask what resistance it should have so that it does not change the current it measures.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Force on a wire', '$\\vec F = I\\vec l \\times \\vec B$'],
          ['Parallel currents', '$F/L = \\mu_0 I_1I_2/2\\pi d$; like currents attract'],
          ['Ampere', '$2 \\times 10^{-7}$ N m$^{-1}$ at 1 m'],
          ['Torque on a coil', '$\\tau = NIAB\\sin\\theta$, $\\vec\\tau = \\vec m \\times \\vec B$'],
          ['Galvanometer', '$\\phi = (NAB/k)I$'],
          ['Conversions', 'Shunt $S = I_gG/(I - I_g)$; series $R = V/I_g - G$'],
        ],
        'Summary table of the force on a wire, parallel currents, the ampere, torque on a coil, the galvanometer and conversions',
      ),
      n: 'To sum up: a current in a field feels a force I l cross B, and parallel currents attract, which defined the ampere. A current loop in a field feels a torque m cross B, so it behaves as a magnetic dipole of moment N I A. In a galvanometer, a radial field makes the deflection proportional to the current, and a shunt or a series resistance turns it into an ammeter or a voltmeter.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'State what θ is: in $\\tau = NIAB\\sin\\theta$ it is between the coil’s **normal** and $\\vec B$.',
        'Force between wires: always say attract or repel.',
        'Galvanometer answers: mention the radial field and why it makes the scale linear.',
        'Ammeter in series with small resistance; voltmeter in parallel with large resistance.',
      ],
      v: table(['Meter', 'Connected', 'Resistance', 'Made with'], [['Ammeter', 'In series', 'Very small', 'Shunt in parallel'], ['Voltmeter', 'In parallel', 'Very large', 'Resistor in series']], 'Table comparing ammeter and voltmeter: how connected, resistance and how they are made from a galvanometer'),
      n: 'Examiners check that you know what the angle in the torque formula refers to: it is the angle between the normal to the coil and the field. Always state whether wires attract or repel. When describing the galvanometer, explain why the radial field gives a linear scale. And keep the meter table straight: ammeters go in series and have tiny resistance; voltmeters go in parallel and have huge resistance.',
    }),
  ],
});
