// ISC 12 Physics ch07 Moving Charges and Magnetic Field — two decks: Part 1 (t01–t03) Oersted, the definition of B,
// the Biot–Savart law, the circular coil, Ampere's circuital law, the solenoid and the finite wire; Part 2 (t04–t05) the
// Lorentz force and the motion of charges, the force on a conductor, parallel currents and the ampere. Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;
export const MP = 1.67e-27;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { q: 5e-9, v: 400, F: 6e-8 };
ex1.B = ex1.F / (ex1.q * ex1.v);
ex1.F30 = ex1.q * ex1.v * ex1.B * 0.5;
const ex2 = { N: 40, R: 0.08, I: 0.6, x: 0.06 };
ex2.Bc = (MU0 * ex2.N * ex2.I) / (2 * ex2.R);
ex2.Bx = (MU0 * ex2.N * ex2.I * ex2.R ** 2) / (2 * (ex2.R ** 2 + ex2.x ** 2) ** 1.5);
ex2.ratio = ex2.Bx / ex2.Bc;
const ex3 = { I: 12, d: 0.03, N: 800, L: 0.4, Is: 1.5 };
ex3.Bw = (MU0 * ex3.I) / (2 * Math.PI * ex3.d);
ex3.n = ex3.N / ex3.L;
ex3.Bs = MU0 * ex3.n * ex3.Is;
const ex4 = { I: 5, a: G.FINITE_DATA.a / 100, half: G.FINITE_DATA.half / 100 };
ex4.sin = ex4.half / Math.hypot(ex4.half, ex4.a);
ex4.B = ((MU0 * ex4.I) / (4 * Math.PI * ex4.a)) * 2 * ex4.sin;
ex4.Blong = (MU0 * ex4.I) / (2 * Math.PI * ex4.a);
const ex5 = { v: 4e6, B: 2e-3 };
ex5.r = (ME * ex5.v) / (QE * ex5.B);
ex5.T = (2 * Math.PI * ME) / (QE * ex5.B);
const ex6 = { v: 3e5, th: 60, B: 0.1 };
ex6.vp = ex6.v * Math.sin((ex6.th * Math.PI) / 180);
ex6.va = ex6.v * Math.cos((ex6.th * Math.PI) / 180);
ex6.r = (MP * ex6.vp) / (QE * ex6.B);
ex6.T = (2 * Math.PI * MP) / (QE * ex6.B);
ex6.p = ex6.va * ex6.T;
const ex7 = { L: 0.6, I: 5, B: 4e-5 };
ex7.F = ex7.I * ex7.L * ex7.B;
const ex8 = { d: 0.06, I1: 15, I2: 4 };
ex8.f = (MU0 * ex8.I1 * ex8.I2) / (2 * Math.PI * ex8.d);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8 };

export const V = {
  oersted: svgV(G.OERSTED, 'Compass needle below a north–south wire, before and after the current is switched on'),
  forcedef: svgV(G.FORCE_DEF, 'A moving charge, the field at an angle to its velocity, and the force perpendicular to both'),
  biot: svgV(G.BIOT, 'Biot–Savart geometry: a current element, the distance r to a point P and the field dB out of the page'),
  loop: svgV(G.LOOP_AXIS, 'Field on the axis of a circular coil built from pairs of opposite elements', 'Directions computed from the Biot–Savart law: the parts across the axis cancel.'),
  ampere: svgV(G.AMPERE, 'Circular field lines round a straight wire and circular Amperian loops'),
  solenoid: svgV(G.SOLENOID, 'Section through a long solenoid with a uniform field inside'),
  finite: svgV(G.FINITE, 'A finite straight wire and the angles its ends subtend at a point P', 'Drawn to scale: 8.0 cm wire, P 3.0 cm from its midpoint.'),
  circle: svgV(G.CIRCLE, 'A positive charge moving in a circle in a field into the page, with the force towards the centre'),
  helix: svgV(G.HELIX, 'Side view of a helical path about the field direction, with its radius and pitch'),
  selector: svgV(G.SELECTOR, 'Crossed electric and magnetic fields balancing the forces on a moving charge'),
  rod: svgV(G.ROD, 'A straight conductor carrying current in a field into the page, with the force on it'),
  parallel: svgV(G.PARALLEL, 'Two parallel wires with currents in the same direction attracting each other'),
};
export const coilPlot = plot(
  {
    x: { min: -3, max: 3, label: 'distance from the centre along the axis, x/R' },
    y: { min: 0, max: 1.1, label: 'B as a fraction of its centre value' },
    functions: [{ expr: '1/(1 + x^2)^(3/2)', label: 'B(x)/B(0) = (1 + x²/R²)^(−3/2)' }],
    points: [{ at: [0.75, 0.512], label: 'x = 0.75R: 0.512 of the centre value' }],
  },
  'Axial field of a flat circular coil as a fraction of its value at the centre: a single peak at the centre, about half at three quarters of a radius and falling towards zero far away on either side',
  'At x = 0.75R the field is 0.8³ = 0.512 of the centre value (worked example 2).',
);
export const finitePlot = plot(
  {
    x: { min: 0, max: 5, label: 'half-length of the wire ÷ distance of P, (L/2)/a' },
    y: { min: 0, max: 1.1, label: 'B ÷ field of an infinitely long wire' },
    functions: [{ expr: 'x/sqrt(x^2 + 1)', label: 'P on the perpendicular bisector: sin α' }],
    points: [{ at: [4 / 3, 0.8], label: 'worked example 4: 0.80' }],
    hlines: [{ y: 1, label: 'long-wire limit μ₀I/2πa', dashed: true }],
  },
  'Field at a point on the perpendicular bisector of a finite straight wire, as a fraction of the long-wire value, against the half-length of the wire divided by the distance of the point: it rises towards one as the wire becomes long',
  'Once the wire is a few times longer than the distance a, the long-wire formula is a good approximation.',
);
const lorentzTable = table(
  ['Situation', 'Magnetic force qvB sin θ', 'Result'],
  [
    ['Charge at rest (v = 0)', 'zero', 'stays at rest'],
    ['v along B (θ = 0° or 180°)', 'zero', 'straight line, constant speed'],
    ['v perpendicular to B (θ = 90°)', 'qvB, largest', 'circle'],
    ['v at another angle θ', 'qvB sin θ', 'helix'],
  ],
  'Table of the magnetic force on a charge at rest, moving along the field, moving at right angles to it and moving at another angle, and the path that results in each case',
);
const ampereTable = table(
  ['Quantity', 'Definition'],
  [
    ['1 ampere', 'Steady current in each of two long, thin, parallel wires 1 m apart in vacuum that makes each wire experience 2 × 10⁻⁷ N per metre of length'],
    ['1 coulomb', 'Charge carried past a cross-section in 1 s by a steady current of 1 A (1 C = 1 A s)'],
  ],
  'Table defining one ampere from the force between two parallel wires one metre apart, two times ten to the minus seven newton per metre, and one coulomb as one ampere second',
);

export const deck1 = deck({
  part: 1,
  title: 'Moving Charges and Magnetic Field — Part 1: Defining B and the fields of currents',
  goals: [
    'Describe Oersted’s observation and define the magnetic field B from the force F = q(v × B)',
    'State the Biot–Savart law in vector form and use it to find the field at the centre and on the axis of a circular coil',
    'Apply Ampere’s circuital law to a long straight wire and a long solenoid, and use the formula for a finite straight wire',
  ],
  slides: [
    sl('title', 'Moving Charges and Magnetic Field', {
      b: 'Part 1 — currents make magnetic fields: how to define B, and how to calculate it for wires, coils and solenoids.',
      v: flow('LR', [['o', 'Oersted'], ['d', 'Defining B'], ['b', 'Biot–Savart law'], ['c', 'Circular coil'], ['a', 'Ampere’s law']], [['o', 'd'], ['d', 'b'], ['b', 'c'], ['c', 'a']], 'Flow of this part: Oersted’s observation, the definition of B, the Biot–Savart law, the circular coil and Ampere’s circuital law'),
      n: 'Every electric motor, loudspeaker and hospital scanner depends on one fact: an electric current produces a magnetic field. In this part we see the experiment that revealed it, define the magnetic field precisely from the force it exerts on a moving charge, and learn two tools for calculating it, the Biot Savart law and Ampere’s circuital law.',
    }),
    sl('diagram', 'Oersted’s observation', {
      b: 'In 1820 Hans Christian Oersted noticed that a compass needle placed near a wire **deflected** whenever a current flowed, and **reversed** its deflection when the current was reversed.',
      ul: ['A current (moving charge) produces a **magnetic field** around it.', 'The field lines of a straight wire are **circles** round the wire (right-hand grip rule: thumb along I, fingers curl along B).', 'Electricity and magnetism are linked: the start of electromagnetism.'],
      v: V.oersted,
      n: 'Lay a wire north to south just above a compass. With no current the needle points north. Switch on a current flowing north and the north pole of the needle swings towards the west; reverse the current and it swings east. So the current creates a magnetic field, and the direction of that field depends on the direction of the current. Grip the wire with your right hand, thumb along the current: your fingers curl the way the field goes.',
    }),
    sl('concept', 'Defining the magnetic field B', {
      b: r`A charge $q$ moving with velocity $\vec v$ through a magnetic field feels a force
$$\vec F = q\left(\vec v \times \vec B\right),\qquad F = qvB\sin\theta$$
This defines $\vec B$: its size is $B = \dfrac{F}{qv\sin\theta}$, and $\vec F$ is perpendicular to both $\vec v$ and $\vec B$.`,
      ul: ['SI unit: **tesla** (T): 1 T = 1 N A⁻¹ m⁻¹ = 1 N s C⁻¹ m⁻¹. The gauss, 1 G = 10⁻⁴ T, is also met.', 'No force if the charge is at rest or moves along $\\vec B$; largest force, $qvB$, when $\\vec v \\perp \\vec B$.'],
      v: V.forcedef,
      n: 'We define the magnetic field by what it does. A charge moving through the field feels a force q v cross B: its size is q v B sine theta, and it points at right angles to both the velocity and the field. So the field strength is the force per unit charge per unit speed, when the charge moves at right angles to the field. The unit is the tesla, a newton per ampere metre.',
    }),
    sl('example', 'Worked example 1: measuring B from a force', {
      b: r`A dust grain carrying a charge of 5.0 nC moves at 400 m s$^{-1}$ at right angles to a uniform magnetic field and feels a force of $6.0 \times 10^{-8}$ N. Find B, and the force if the grain moved at $30^\circ$ to the field at the same speed.`,
      ul: [
        r`Step 1 — $B = \dfrac{F}{qv} = \dfrac{6.0 \times 10^{-8}}{5.0 \times 10^{-9} \times 400} = ${dec(ex1.B, 2)}$ T.`,
        r`Step 2 — $F = qvB\sin 30^\circ = 5.0 \times 10^{-9} \times 400 \times ${dec(ex1.B, 2)} \times 0.5 = ${sci(ex1.F30, 2)}$ N, half as much.`,
      ],
      v: table(['Angle between v and B', 'Force on the grain'], [['90°', '6.0 × 10⁻⁸ N'], ['30°', '3.0 × 10⁻⁸ N'], ['0°', 'zero']], 'Worked table: the force on the grain is six times ten to the minus eight newton at ninety degrees, half that at thirty degrees and zero along the field'),
      n: 'Divide the force by the charge times the speed: six times ten to the minus eight, over five nanocoulombs times four hundred, gives three hundredths of a tesla. If the grain crossed the field at thirty degrees instead, the sine of thirty is one half, so the force halves. Moving along the field lines, it would feel no magnetic force at all.',
    }),
    sl('check', 'Quick check: finding B', {
      b: 'Calculate the field.',
      v: V.forcedef,
      chk: 'Bdef-num',
      n: 'Divide the force by the charge times the speed.',
    }),
    sl('concept', 'The Biot–Savart law', {
      b: r`A current element $I\,d\vec l$ produces at a point with position vector $\vec r$ (from the element) the field
$$d\vec B = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,d\vec l \times \vec r}{r^3},\qquad dB = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,dl\sin\theta}{r^2}$$`,
      ul: ['$\\mu_0 = 4\\pi \\times 10^{-7}$ T m A⁻¹ (permeability of free space); $\\mu_0/4\\pi = 10^{-7}$.', '$d\\vec B$ is perpendicular to both $d\\vec l$ and $\\vec r$; it is zero along the line of the element ($\\theta = 0$).', 'Like Coulomb’s law it is an inverse-square law; unlike it, the source is a vector and the field depends on the angle.'],
      v: V.biot,
      n: 'The Biot Savart law gives the field of a tiny piece of current. Its size is mu nought over four pi, times the current, times the length of the piece, times the sine of the angle, over the distance squared. Its direction is that of d l cross r, at right angles to both. Points straight ahead of or behind the element get no field at all. To find the field of a whole circuit, add up the contributions of all its elements.',
    }),
    sl('diagram', 'Field at the centre of a circular coil', {
      b: r`For a circular loop of radius $R$, every element is at distance $R$ from the centre and at $90^\circ$ to the line joining it to the centre, so every $dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl}{R^2}$ points the same way, along the axis. Adding round the loop ($\sum dl = 2\pi R$) and over $N$ turns:
$$B = \dfrac{\mu_0 N I}{2R}$$`,
      ul: ['Direction from the right-hand grip rule: curl the fingers with the current; the thumb gives B at the centre.', 'Current anticlockwise as seen by you: B points towards you.'],
      v: V.loop,
      n: 'At the centre of a circular loop the geometry is as simple as it gets. Every element is the same distance R away and at right angles to the line to the centre, so every contribution has the same size and the same direction, along the axis. Adding them all, the lengths add up to the circumference, two pi R, which gives mu nought I over two R for one turn, and N times that for N turns.',
    }),
    sl('diagram', 'Field on the axis of a circular coil', {
      b: r`At a point on the axis, a distance $x$ from the centre, the components of $d\vec B$ across the axis cancel in pairs and the axial components add:
$$B = \dfrac{\mu_0 N I R^2}{2\left(R^2 + x^2\right)^{3/2}}$$`,
      ul: ['At $x = 0$ this gives the centre value $\\mu_0NI/2R$.', 'Far away ($x \\gg R$): $B \\approx \\mu_0NIR^2/2x^3$, falling as $1/x^3$.', 'B along the axis points the same way on both sides of the coil.'],
      v: coilPlot,
      n: 'Away from the centre, each element is a distance root R squared plus x squared from the point, and its field is tilted. Pair each element with the one opposite: their tilted components across the axis cancel, while the parts along the axis add. The result is mu nought N I R squared over two times R squared plus x squared to the power three halves. It peaks at the centre and falls off as the inverse cube far away.',
    }),
    sl('example', 'Worked example 2: a flat coil', {
      b: r`A flat coil of 40 turns and radius 8.0 cm carries 0.60 A. Find the field at its centre and at a point on its axis 6.0 cm from the centre.`,
      ul: [
        r`Centre: $B_0 = \dfrac{\mu_0NI}{2R} = \dfrac{4\pi \times 10^{-7} \times 40 \times 0.60}{2 \times 0.080} = ${sci(ex2.Bc, 3)}$ T.`,
        r`Axis: $R^2 + x^2 = 0.0064 + 0.0036 = 0.010$ m², so $(R^2 + x^2)^{3/2} = 1.0 \times 10^{-3}$ m³; $B = \dfrac{4\pi \times 10^{-7} \times 40 \times 0.60 \times 0.0064}{2 \times 1.0 \times 10^{-3}} = ${sci(ex2.Bx, 3)}$ T.`,
        r`Ratio $B/B_0 = \left(\dfrac{R}{\sqrt{R^2 + x^2}}\right)^3 = 0.80^3 = ${dec(ex2.ratio, 3)}$.`,
      ],
      v: coilPlot,
      n: 'At the centre, mu nought times forty turns times point six ampere, over sixteen centimetres, gives about one point nine times ten to the minus four tesla. Six centimetres along the axis, the distance to the windings is ten centimetres, a neat three four five triangle, and the field drops to about nine point six five times ten to the minus five tesla: just over half the centre value, as the graph shows.',
    }),
    sl('check', 'Quick check: field at the centre of a coil', {
      b: 'Calculate the field at the centre.',
      v: V.loop,
      chk: 'centre-num',
      n: 'Use mu nought N I over two R, with R in metres.',
    }),
    sl('concept', 'Ampere’s circuital law', {
      b: r`Round any closed loop, the line integral of $\vec B$ equals $\mu_0$ times the net current threading the loop:
$$\oint \vec B \cdot d\vec l = \mu_0 I_{\text{enclosed}}$$
**Long straight wire:** on a circle of radius $r$ about the wire, B is tangential and constant, so $B(2\pi r) = \mu_0I$ and
$$B = \dfrac{\mu_0 I}{2\pi r}$$`,
      ul: ['Currents outside the loop add nothing; currents through it in opposite senses count with opposite signs.', 'The law is always true, but it gives B easily only when symmetry makes B constant along a well-chosen loop.'],
      v: V.ampere,
      n: 'Ampere’s circuital law is a shortcut for symmetric currents. Go round any closed path, adding B along the path times each small step: the total is mu nought times the current passing through the path. Round a long straight wire, choose a circle centred on it. B is the same all the way round and along the path, so B times two pi r equals mu nought I, and B is mu nought I over two pi r.',
    }),
    sl('diagram', 'Field of a long solenoid', {
      b: r`A **solenoid** is a long coil of closely wound turns. Inside a long solenoid, away from its ends, the field is **uniform** and along the axis:
$$B = \mu_0 n I,\qquad n = \dfrac{N}{L}\ \text{(turns per metre)}$$`,
      ul: ['Outside, the field is very weak; the ends act like the N and S poles of a bar magnet.', 'B does not depend on the radius of the turns, only on the turns per metre and the current.', 'Applying Ampere’s law to a rectangular loop with one side inside gives $BL = \\mu_0 NI$, the same result.'],
      v: V.solenoid,
      n: 'Wind wire closely round a long tube and pass a current: the fields of the turns add up inside to a strong, uniform field along the axis, while outside they nearly cancel. The field inside is mu nought n I, where n is the number of turns per metre. It does not depend on how fat the solenoid is. One end behaves as a north pole and the other as a south pole, just like a bar magnet.',
    }),
    sl('diagram', 'A straight wire of finite length', {
      b: r`For a straight wire carrying current $I$, and a point P at perpendicular distance $a$ from it, with the ends subtending angles $\alpha$ and $\beta$ at P (measured from the perpendicular):
$$B = \dfrac{\mu_0 I}{4\pi a}\left(\sin\alpha + \sin\beta\right)$$`,
      ul: ['Formula only (its derivation is not required in the ISC scope).', 'Very long wire: $\\alpha, \\beta \\to 90^\\circ$, so $B = \\mu_0I/2\\pi a$, as Ampere’s law gives.', 'Point opposite one end of a long wire: $\\alpha = 0$, $\\beta \\to 90^\\circ$, so $B = \\mu_0I/4\\pi a$.'],
      v: V.finite,
      n: 'Real wires are not infinitely long. For a straight piece of wire, measure the angles that its two ends make at the point, from the perpendicular dropped onto the wire. The field is mu nought I over four pi a, times the sum of the sines of those two angles. Make the wire very long and both angles approach ninety degrees, so the bracket becomes two and we recover the long-wire result.',
    }),
    sl('example', 'Worked example 3: a cable and a solenoid', {
      b: r`(a) Find the field 3.0 cm from a long straight cable carrying 12 A. (b) A solenoid 40 cm long has 800 turns and carries 1.5 A. Find the field near its middle.`,
      ul: [
        r`(a) $B = \dfrac{\mu_0I}{2\pi r} = \dfrac{2 \times 10^{-7} \times 12}{0.030} = ${sci(ex3.Bw, 2)}$ T (about twice the Earth’s field).`,
        r`(b) $n = \dfrac{800}{0.40} = ${dec(ex3.n, 4)}$ m$^{-1}$; $B = \mu_0nI = 4\pi \times 10^{-7} \times 2000 \times 1.5 = ${sci(ex3.Bs, 3)}$ T.`,
      ],
      v: V.ampere,
      n: 'For the cable, mu nought over two pi is two times ten to the minus seven, so the field is two times ten to the minus seven times twelve over three hundredths of a metre: eight times ten to the minus five tesla, roughly twice the Earth’s field, enough to upset a compass. The solenoid has two thousand turns per metre, so its field is about three point seven seven millitesla, nearly fifty times stronger.',
    }),
    sl('example', 'Worked example 4: a short straight wire', {
      b: r`A straight wire 8.0 cm long carries 5.0 A. Find the field at a point 3.0 cm from its midpoint, on the perpendicular bisector, and compare it with the long-wire value.`,
      ul: [
        r`Each end subtends $\sin\alpha = \sin\beta = \dfrac{4.0}{\sqrt{4.0^2 + 3.0^2}} = ${dec(ex4.sin, 2)}$.`,
        r`$B = \dfrac{\mu_0I}{4\pi a}(\sin\alpha + \sin\beta) = \dfrac{10^{-7} \times 5.0}{0.030} \times 1.6 = ${sci(ex4.B, 3)}$ T.`,
        r`A long wire would give $\dfrac{\mu_0I}{2\pi a} = ${sci(ex4.Blong, 3)}$ T, so the short wire gives ${dec(ex4.B / ex4.Blong, 2)} of it.`,
      ],
      v: finitePlot,
      n: 'Half the wire is four centimetres and the point is three centimetres away, so each end sits on a three four five triangle and each sine is point eight. Ten to the minus seven times five amperes over three centimetres, times one point six, gives about two point six seven times ten to the minus five tesla: eight tenths of what an endless wire would give, as the graph shows.',
    }),
    sl('check', 'Quick check: a solenoid', {
      b: 'Calculate the field inside.',
      v: V.solenoid,
      chk: 'solenoid-num',
      n: 'Find the turns per metre first, then multiply by mu nought and the current.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Definition of B', '$\\vec F = q(\\vec v \\times \\vec B)$; $F = qvB\\sin\\theta$; tesla'],
          ['Biot–Savart law', '$d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,d\\vec l \\times \\vec r}{r^3}$'],
          ['Centre of a coil', '$B = \\mu_0NI/2R$'],
          ['Axis of a coil', '$B = \\mu_0NIR^2/2(R^2 + x^2)^{3/2}$'],
          ['Long straight wire', '$B = \\mu_0I/2\\pi r$ (Ampere’s law)'],
          ['Long solenoid', '$B = \\mu_0nI$'],
          ['Finite wire', '$B = (\\mu_0I/4\\pi a)(\\sin\\alpha + \\sin\\beta)$'],
        ],
        'Summary table of the definition of B, the Biot Savart law, the fields of a coil at its centre and on its axis, a long wire, a long solenoid and a finite wire',
      ),
      n: 'To sum up: a current makes a magnetic field, as Oersted found, and B is defined by the force q v cross B on a moving charge. The Biot Savart law gives the field of each current element; it leads to mu nought N I over two R at the centre of a coil. Ampere’s law gives mu nought I over two pi r for a long wire and mu nought n I inside a long solenoid.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the Biot–Savart law with the cross product and say what each symbol means.',
        'Convert cm to m before substituting; remember $\\mu_0/4\\pi = 10^{-7}$ and $\\mu_0/2\\pi = 2 \\times 10^{-7}$.',
        'Coil questions: count the turns N; solenoid questions: use turns per metre n.',
        'Give a direction with every field: right-hand grip rule.',
      ],
      v: table(['Asked', 'Key point'], [['Radius of a coil doubled?', 'B at the centre halves'], ['Distance from a long wire doubled?', 'B halves'], ['Point along the line of an element?', 'dB = 0']], 'Table of common questions and the key point for each'),
      n: 'State the Biot Savart law with its vector form and define every symbol. Always change centimetres to metres, and use the handy values ten to the minus seven for mu nought over four pi and two times ten to the minus seven for mu nought over two pi. For coils count the turns; for solenoids use turns per metre. And never give a field without its direction.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Moving Charges and Magnetic Field — Part 2: Forces on moving charges and currents',
  goals: [
    'Use the Lorentz force, explain why a magnetic force does no work, and describe circular and helical paths',
    'Use F = I(l × B) for the force on a current-carrying conductor',
    'Derive the force between parallel currents and define the ampere and the coulomb',
  ],
  slides: [
    sl('title', 'Forces on moving charges and currents', {
      b: 'Part 2 — what a magnetic field does to moving charges and to the wires that carry them.',
      v: flow('LR', [['l', 'Lorentz force'], ['c', 'Circle and helix'], ['x', 'Crossed fields'], ['w', 'Force on a wire'], ['p', 'Parallel currents'], ['a', 'The ampere']], [['l', 'c'], ['c', 'x'], ['x', 'w'], ['w', 'p'], ['p', 'a']], 'Flow of this part: the Lorentz force, circular and helical motion, crossed fields, the force on a wire, parallel currents and the definition of the ampere'),
      n: 'In Part 1 currents made magnetic fields. Now we turn the question round: what does a magnetic field do to charges that move through it, and to wires that carry currents? The answers explain how the aurora forms, how beams are steered in particle accelerators, how motors turn, and how the ampere itself is defined.',
    }),
    sl('concept', 'The Lorentz force', {
      b: r`In electric and magnetic fields together, a charge $q$ moving with velocity $\vec v$ feels the **Lorentz force**
$$\vec F = q\left(\vec E + \vec v \times \vec B\right)$$
For a negative charge the magnetic force is opposite to the direction of $\vec v \times \vec B$.`,
      v: lorentzTable,
      n: 'The total force on a moving charge is the Lorentz force: q E, which acts whether or not the charge moves, plus q v cross B, which needs motion. The table shows the special cases. A charge at rest, or one moving along the field, feels no magnetic force. At right angles the force is largest and the path is a circle; at any other angle the path is a helix.',
    }),
    sl('diagram', 'No work, so constant speed: circular motion', {
      b: r`The magnetic force is always perpendicular to $\vec v$, so it does **no work**: $P = \vec F \cdot \vec v = 0$. The speed and kinetic energy stay constant; only the direction changes. If $\vec v \perp \vec B$, the force provides the centripetal force:
$$qvB = \dfrac{mv^2}{r} \;\Rightarrow\; r = \dfrac{mv}{qB} = \dfrac{p}{qB},\qquad T = \dfrac{2\pi m}{qB}$$`,
      ul: ['T and the frequency $f = qB/2\\pi m$ do not depend on the speed: faster particles move on bigger circles.'],
      v: V.circle,
      n: 'Because the magnetic force is always at right angles to the velocity, its power is zero: it can bend a path but never speed a particle up or slow it down. Moving at right angles to a uniform field, the particle feels a constant sideways force and goes round a circle. Equating q v B to m v squared over r gives the radius, m v over q B, and the time for one turn, two pi m over q B, which does not depend on the speed.',
    }),
    sl('example', 'Worked example 5: an electron in a circle', {
      b: r`An electron moves at $4.0 \times 10^{6}$ m s$^{-1}$ at right angles to a uniform field of 2.0 mT. Find the radius of its path and its period. ($m_e = 9.1 \times 10^{-31}$ kg, $e = 1.6 \times 10^{-19}$ C)`,
      ul: [
        r`$r = \dfrac{mv}{eB} = \dfrac{9.1 \times 10^{-31} \times 4.0 \times 10^{6}}{1.6 \times 10^{-19} \times 2.0 \times 10^{-3}} = ${sci(ex5.r, 3)}$ m (about 1.1 cm).`,
        r`$T = \dfrac{2\pi m}{eB} = \dfrac{2\pi \times 9.1 \times 10^{-31}}{3.2 \times 10^{-22}} = ${sci(ex5.T, 3)}$ s.`,
      ],
      v: V.circle,
      n: 'The radius is the momentum over e B: about one point one four centimetres, small enough to fit inside a laboratory tube. The period is two pi m over e B, about one point eight times ten to the minus eight second, so the electron goes round more than fifty million times a second. Double its speed and the circle doubles in size, but the period stays exactly the same.',
    }),
    sl('check', 'Quick check: does a magnetic field do work?', {
      b: 'Judge the assertion and the reason.',
      v: V.circle,
      chk: 'nowork-ar',
      n: 'Compare the direction of the force with the direction of motion.',
    }),
    sl('diagram', 'Helical motion', {
      b: r`If $\vec v$ makes angle $\theta$ with $\vec B$, split it: $v_\perp = v\sin\theta$ gives circular motion, $v_\parallel = v\cos\theta$ is unaffected. The path is a **helix** about the field direction:
$$r = \dfrac{mv\sin\theta}{qB},\qquad \text{pitch } p = v\cos\theta \times T = \dfrac{2\pi m v\cos\theta}{qB}$$`,
      ul: ['Charged particles from the Sun spiral along the Earth’s field lines towards the poles, where they cause the aurora.'],
      v: V.helix,
      n: 'At any other angle, split the velocity into two parts. The part across the field is bent into a circle, with radius m v sine theta over q B. The part along the field feels no force, so the particle drifts steadily along the field while it circles. The result is a helix, like a stretched spring. The pitch, the distance moved along the field in one turn, is the parallel speed times the period.',
    }),
    sl('example', 'Worked example 6: a proton on a helix', {
      b: r`A proton enters a uniform field of 0.10 T at $3.0 \times 10^{5}$ m s$^{-1}$, its velocity making $60^\circ$ with the field. Find the radius and pitch of its helix. ($m_p = 1.67 \times 10^{-27}$ kg)`,
      ul: [
        r`$v_\perp = 3.0 \times 10^{5}\sin 60^\circ = ${sci(ex6.vp, 3)}$ m s$^{-1}$; $r = \dfrac{m v_\perp}{eB} = ${sci(ex6.r, 3)}$ m.`,
        r`$T = \dfrac{2\pi m}{eB} = ${sci(ex6.T, 3)}$ s; $v_\parallel = 3.0 \times 10^{5}\cos 60^\circ = ${sci(ex6.va, 2)}$ m s$^{-1}$.`,
        r`Pitch $p = v_\parallel T = ${sci(ex6.va, 2)} \times ${sci(ex6.T, 3)} = ${sci(ex6.p, 3)}$ m (about 9.8 cm).`,
      ],
      v: V.helix,
      n: 'The speed across the field is three times ten to the five times the sine of sixty degrees, which gives a radius of about two point seven centimetres. One turn takes about six point six times ten to the minus seven second. Meanwhile the proton drifts along the field at half its speed, so each turn carries it about nine point eight centimetres further along the helix.',
    }),
    sl('diagram', 'Crossed electric and magnetic fields', {
      b: r`With $\vec E \perp \vec B$, both perpendicular to $\vec v$, the electric and magnetic forces can be opposite. The charge goes straight through when $qE = qvB$:
$$v = \dfrac{E}{B}$$`,
      ul: ['The result does not depend on q or m: the arrangement selects one speed (a **velocity selector**).', 'Faster charges are bent one way (magnetic force wins), slower ones the other.'],
      v: V.selector,
      n: 'Now put an electric field and a magnetic field at right angles. On a positive charge moving across both, the electric force pushes one way and the magnetic force the other. They balance when q E equals q v B, that is when the speed is E over B. Particles of exactly that speed fly straight through, whatever their charge or mass, while all others are bent aside.',
    }),
    sl('concept', 'Force on a current-carrying conductor', {
      b: r`A wire of length $l$ and cross-section $A$ holds $nAl$ free electrons drifting at $v_d$. Each feels $e v_d B\sin\theta$, so the total is $(nAl)e v_d B\sin\theta$, and with $I = nAev_d$:
$$\vec F = I\left(\vec l \times \vec B\right),\qquad F = BIl\sin\theta$$`,
      ul: ['$\\vec l$ points along the current. The force is largest when the wire is perpendicular to B and zero when it is parallel.', 'Direction: perpendicular to both the wire and B (the rule for $\\vec l \\times \\vec B$).'],
      v: V.rod,
      n: 'A current is just charges on the move, so a wire carrying a current in a magnetic field feels the sum of the forces on all its drifting electrons. Counting them, n A l electrons each with force e v d B sine theta, and using I equals n A e v d, the total becomes B I l sine theta. In vector form it is I l cross B, at right angles to both the wire and the field.',
    }),
    sl('example', 'Worked example 7: a wire in the Earth’s field', {
      b: r`A horizontal wire 60 cm long carries 5.0 A from west to east at a place where the Earth’s field is $4.0 \times 10^{-5}$ T, horizontal and pointing north. Find the size and direction of the force on the wire.`,
      ul: [
        r`$F = BIl = 4.0 \times 10^{-5} \times 5.0 \times 0.60 = ${sci(ex7.F, 2)}$ N.`,
        r`Direction: $\vec l$ east, $\vec B$ north; with x east, y north, z up, $\hat x \times \hat y = \hat z$: the force is **vertically upwards**.`,
      ],
      v: V.rod,
      n: 'The wire is at right angles to the field, so the force is simply B I l: four times ten to the minus five, times five amperes, times point six metre, about one point two times ten to the minus four newton. East crossed with north points straight up, so the Earth’s field pushes the wire gently upwards. Reverse the current and the push is downwards.',
    }),
    sl('check', 'Quick check: direction of the force on a wire', {
      b: 'Choose the correct option.',
      v: V.rod,
      chk: 'wiredir-mcq',
      n: 'Point along the current, then turn towards the field: the cross product gives the force.',
    }),
    sl('diagram', 'Force between parallel currents', {
      b: r`Wire 1 makes a field $B_1 = \dfrac{\mu_0I_1}{2\pi r}$ at wire 2, perpendicular to it. A length $l$ of wire 2 feels $F = B_1I_2l$, so the force per unit length is
$$f = \dfrac{F}{l} = \dfrac{\mu_0 I_1 I_2}{2\pi r}$$`,
      ul: ['**Like** (same direction) currents **attract**; **unlike** currents **repel**.', 'Wire 1 feels an equal and opposite force (Newton’s third law), even if $I_1 \\ne I_2$.'],
      v: V.parallel,
      n: 'Each wire sits in the magnetic field of the other. The field of wire one at wire two is mu nought I one over two pi r, at right angles to wire two, so each metre of wire two feels mu nought I one I two over two pi r. Working out I l cross B shows that currents in the same direction pull the wires together, and opposite currents push them apart. The forces on the two wires are always equal and opposite.',
    }),
    sl('example', 'Worked example 8: two power leads', {
      b: r`Two long straight leads 6.0 cm apart carry 15 A and 4.0 A in opposite directions. Find the force on each metre of either lead, and say whether they attract or repel.`,
      ul: [
        r`$f = \dfrac{\mu_0I_1I_2}{2\pi r} = \dfrac{2 \times 10^{-7} \times 15 \times 4.0}{0.060} = ${sci(ex8.f, 2)}$ N m$^{-1}$.`,
        r`Opposite currents: the leads **repel**; each metre of either lead feels the same $${sci(ex8.f, 2)}$ N.`,
      ],
      v: V.parallel,
      n: 'Two times ten to the minus seven, times fifteen times four, over six hundredths of a metre: about two times ten to the minus four newton on every metre. The currents run in opposite directions, so the leads push apart. Notice that the smaller current feels exactly the same force as the larger one: the force depends on the product of the currents.',
    }),
    sl('concept', 'Defining the ampere and the coulomb', {
      b: r`For $I_1 = I_2 = 1$ A and $r = 1$ m in vacuum: $f = \dfrac{4\pi \times 10^{-7} \times 1 \times 1}{2\pi \times 1} = 2 \times 10^{-7}$ N m$^{-1}$. This gives the definitions:`,
      ul: ['Since 2019 the SI fixes the value of the electron charge exactly; the parallel-wire result is still the standard definition asked for, and it gives $\\mu_0 \\approx 4\\pi \\times 10^{-7}$ T m A⁻¹.'],
      v: ampereTable,
      n: 'Put one ampere in each of two long parallel wires one metre apart in vacuum, and each metre of wire feels two times ten to the minus seven newton. Turning this round gives the classic definition of the ampere. The coulomb then follows: it is the charge carried past any point in one second by a steady current of one ampere, so one coulomb is one ampere second.',
    }),
    sl('check', 'Quick check: force between two wires', {
      b: 'Calculate the force.',
      v: V.parallel,
      chk: 'parallel-num',
      n: 'Use mu nought I one I two over two pi r, then multiply by the length.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Lorentz force', '$\\vec F = q(\\vec E + \\vec v \\times \\vec B)$'],
          ['Work by the magnetic force', 'zero: speed and kinetic energy constant'],
          ['Circle ($\\vec v \\perp \\vec B$)', '$r = mv/qB$, $T = 2\\pi m/qB$'],
          ['Helix', '$r = mv\\sin\\theta/qB$, pitch $= 2\\pi mv\\cos\\theta/qB$'],
          ['Crossed fields', 'undeflected when $v = E/B$'],
          ['Conductor', '$\\vec F = I(\\vec l \\times \\vec B)$'],
          ['Parallel wires', '$f = \\mu_0I_1I_2/2\\pi r$; like currents attract'],
        ],
        'Summary table of the Lorentz force, the work done by a magnetic force, circular and helical paths, crossed fields, the force on a conductor and between parallel wires',
      ),
      n: 'To sum up: the Lorentz force is q times E plus v cross B. The magnetic part does no work, so it bends paths into circles of radius m v over q B, with a period independent of speed, or into helices. Crossed fields pass only the speed E over B. A wire feels I l cross B, and parallel wires feel mu nought I one I two over two pi r per metre, which defines the ampere.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'For directions, write the vectors along x, y, z and use $\\hat x \\times \\hat y = \\hat z$; reverse the answer for an electron.',
        'In circle problems quote $r = mv/qB$ and say why the speed is constant.',
        'For a helix, use $v\\sin\\theta$ for the radius and $v\\cos\\theta$ for the pitch.',
        'State the ampere with all its conditions: long, thin, parallel, 1 m apart, vacuum, $2 \\times 10^{-7}$ N per metre.',
      ],
      v: table(['Asked', 'Key point'], [['B doubled, same speed?', 'r and T both halve'], ['Wire parallel to B?', 'no force'], ['Opposite currents?', 'repel']], 'Table of common questions and the key point for each'),
      n: 'For any direction question, set up axes and use the cross product, and remember to reverse the answer for a negative charge. In circular-motion answers, say clearly why the speed does not change. For a helix, sine theta goes with the radius and cos theta with the pitch. And when defining the ampere, give every condition: long, thin, parallel wires, one metre apart, in vacuum.',
    }),
  ],
});
