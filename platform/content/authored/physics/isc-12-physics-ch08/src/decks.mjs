// ISC 12 Physics ch08 Torque on a Current Loop and the Moving Coil Galvanometer — two decks: Part 1 (t01–t02) torque on a
// coil, magnetic moment, the loop as a magnetic dipole and the orbiting electron; Part 2 (t03–t04) the moving coil
// galvanometer, its sensitivities and its conversion into an ammeter and a voltmeter. Numbers computed here.
import { sl, deck, table, svgV, plot, r, sci, dec, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const H = 6.63e-34; // Planck constant, J s
// ---------------------------------------------------------------- worked-example numbers
const ex1 = { N: 120, l: 0.05, b: 0.03, I: 0.4, B: 0.3, plane: 60 };
ex1.A = ex1.l * ex1.b;
ex1.F = ex1.N * ex1.I * ex1.l * ex1.B;
ex1.tmax = ex1.F * ex1.b;
ex1.theta = 90 - ex1.plane;
ex1.tau = ex1.tmax * Math.sin((ex1.theta * Math.PI) / 180);
const ex2 = { N: 40, R: 0.05, I: 2.5, B: 0.02 };
ex2.m = ex2.N * ex2.I * Math.PI * ex2.R ** 2;
ex2.tau = ex2.m * ex2.B;
const ex3 = { r: 5.3e-11, v: 2.2e6 };
ex3.f = ex3.v / (2 * Math.PI * ex3.r);
ex3.I = QE * ex3.f;
ex3.mu = ex3.I * Math.PI * ex3.r ** 2;
ex3.L = ME * ex3.v * ex3.r;
export const MU_B = (QE * H) / (4 * Math.PI * ME);
const ex4 = { N: 60, A: 5e-4, B: 0.18, c: 4.5e-8, th: 0.3 };
ex4.NAB = ex4.N * ex4.A * ex4.B;
ex4.I = (ex4.c * ex4.th) / ex4.NAB;
ex4.SI = ex4.NAB / ex4.c;
const ex5 = { div: 30, Ifs: 1.2e-3, G: 40 };
ex5.k = ex5.Ifs / ex5.div;
ex5.SI = ex5.div / (ex5.Ifs * 1e3); // div per mA
ex5.Vfs = ex5.Ifs * ex5.G;
ex5.SV = ex5.div / (ex5.Vfs * 1e3); // div per mV
const ex8 = { E: 6, R1: 1000, R2: 2000, RV: 2000 };
ex8.true = (ex8.E * ex8.R2) / (ex8.R1 + ex8.R2);
ex8.Rp = (ex8.R2 * ex8.RV) / (ex8.R2 + ex8.RV);
ex8.read = (ex8.E * ex8.Rp) / (ex8.R1 + ex8.Rp);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex8 };

const fail = [];
const need = (ok, msg) => ok || fail.push(msg);
need(Math.abs(ex1.F - 0.72) < 1e-9 && Math.abs(ex1.tmax - 0.0216) < 1e-9 && Math.abs(ex1.tau - 0.0108) < 1e-9, 'ex1');
need(Math.abs(ex2.m - 0.785) < 1e-3 && Math.abs(ex2.tau - 0.0157) < 1e-4, 'ex2');
need(Math.abs(ex3.I - 1.06e-3) < 1e-5 && Math.abs(ex3.mu - 9.33e-24) < 1e-26 && Math.abs(ex3.mu / ex3.L - QE / (2 * ME)) < 1e3, 'ex3');
need(Math.abs(MU_B - 9.28e-24) < 1e-26, 'muB');
need(Math.abs(ex4.I - 2.5e-6) < 1e-12 && Math.abs(ex4.SI - 1.2e5) < 1e-6, 'ex4');
need(Math.abs(ex5.k - 4e-5) < 1e-12 && Math.abs(ex5.SI - 25) < 1e-9 && Math.abs(ex5.SV - 0.625) < 1e-9, 'ex5');
need(Math.abs(ex8.read - 3) < 1e-9 && Math.abs(ex8.true - 4) < 1e-9, 'ex8');
if (fail.length) throw new Error(`worked examples: ${fail.join(', ')}`);

export const V = {
  face: svgV(G.LOOP_FACE, 'Rectangular coil in a uniform field with the forces on its sides'),
  top: svgV(G.TORQUE_TOP, 'The coil seen from above: a couple of arm b sin θ'),
  rhr: svgV(G.RHR, 'Right-hand rule for the magnetic moment of a coil'),
  dipole: svgV(G.DIPOLE, 'Field lines of a current loop: a magnetic dipole'),
  orbit: svgV(G.ORBIT, 'Electron in a Bohr orbit with L and μ'),
  mcgTop: svgV(G.MCG_TOP, 'Radial field in a moving coil galvanometer'),
  mcgFront: svgV(G.MCG_FRONT, 'Construction of a moving coil galvanometer'),
  amm: svgV(G.AMMETER, 'Galvanometer with a shunt: an ammeter', 'Worked example 6 values.'),
  volt: svgV(G.VOLTMETER, 'Galvanometer with series resistances: a two-range voltmeter', 'Worked example 7 values.'),
};
export const torquePlot = plot(
  {
    x: { min: 0, max: 180, label: 'angle θ between m and B (degrees)' },
    y: { min: 0, max: 1.15, label: 'τ / τmax' },
    functions: [{ expr: 'sin(pi*x/180)', label: 'τ = NIAB sin θ' }],
    points: [{ at: [90, 1], label: 'plane of coil along B: largest' }, { at: [30, 0.5], label: 'θ = 30°: half' }],
  },
  'Torque on a current loop as a fraction of its maximum against the angle theta between the magnetic moment and the field: a sine curve, zero at 0 and 180 degrees, largest at 90 degrees, and half the maximum at 30 degrees',
  'θ = 0°: stable equilibrium; θ = 180°: unstable equilibrium.',
);
export const scalePlot = plot(
  {
    x: { min: 0, max: 1.3, label: 'deflection φ (rad)' },
    y: { min: 0, max: 4, label: 'current needed (units of c/NAB)' },
    functions: [
      { expr: 'x', label: 'radial field: I = kφ' },
      { expr: 'x/cos(x)', label: 'uniform field: I ∝ φ/cos φ' },
    ],
  },
  'Current needed for a given deflection of a galvanometer coil: a straight line through the origin for a radial field, so the scale is evenly divided; a curve rising ever more steeply for a uniform field, which would crowd the scale divisions at large deflections',
  'Only the radial field gives a linear scale.',
);
export const loadPlot = plot(
  {
    x: { min: 0, max: 100, label: 'voltmeter resistance (kΩ)' },
    y: { min: 0, max: 4.5, label: 'reading across 2.0 kΩ (V)' },
    functions: [{ expr: '12x/(2 + 3x)', label: 'reading' }],
    hlines: [{ y: 4, label: 'true p.d. 4.0 V', dashed: true }],
    points: [{ at: [2, 3], label: '2.0 kΩ meter: 3.0 V' }],
  },
  'Reading of a voltmeter placed across the 2 kilo-ohm resistor of a 1 kilo-ohm and 2 kilo-ohm divider on 6 volts, against the voltmeter resistance: 3 volts for a 2 kilo-ohm meter, rising towards the true 4 volts as the meter resistance becomes large',
  'A good voltmeter has a resistance much larger than the resistance it is connected across.',
);
const orient = table(
  ['Angle θ between m and B', 'Coil plane', 'Torque', 'Equilibrium'],
  [
    ['0°', 'perpendicular to B', 'zero', 'stable'],
    ['90°', 'along B', 'largest, NIAB', 'none'],
    ['180°', 'perpendicular to B', 'zero', 'unstable'],
  ],
  'Table of the torque on a coil at three orientations: zero and stable at 0 degrees, largest at 90 degrees, zero and unstable at 180 degrees',
);
const analogy = table(
  ['Electric dipole in E', 'Current loop in B'],
  [
    ['moment $\\vec p = q(2\\vec a)$','moment $\\vec m = NI\\vec A$'],
    ['net force zero in a uniform field', 'net force zero in a uniform field'],
    ['$\\vec\\tau = \\vec p \\times \\vec E$', '$\\vec\\tau = \\vec m \\times \\vec B$'],
    ['axial field $\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2p}{x^3}$', 'axial field $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$'],
  ],
  'Table comparing an electric dipole in an electric field with a current loop in a magnetic field: moments p and m equal to N I A, no net force in a uniform field, torques p cross E and m cross B, and axial fields falling as the inverse cube of distance',
);
const sensTable = table(
  ['Quantity', 'Expression', 'Unit'],
  [
    ['Galvanometer constant k', '$I/\\theta = c/NAB$', 'A rad⁻¹ (or A per division)'],
    ['Current sensitivity', '$\\theta/I = NAB/c$', 'rad A⁻¹ (or div A⁻¹)'],
    ['Voltage sensitivity', '$\\theta/V = NAB/cG$', 'rad V⁻¹ (or div V⁻¹)'],
  ],
  'Table of the galvanometer constant, current sensitivity and voltage sensitivity with their expressions and units',
);
const meterTable = table(
  ['Meter', 'Made by adding', 'Connected', 'Ideal resistance'],
  [
    ['Ammeter', 'small shunt S in parallel', 'in series', 'zero'],
    ['Voltmeter', 'large R in series', 'in parallel', 'infinite'],
  ],
  'Table comparing ammeter and voltmeter: an ammeter has a small shunt in parallel, goes in series and ideally has zero resistance; a voltmeter has a large series resistance, goes in parallel and ideally has infinite resistance',
);

export const deck1 = deck({
  part: 1,
  title: 'Torque on a Current Loop — Part 1: Torque, magnetic moment and the loop as a dipole',
  goals: [
    'Derive the torque on a rectangular coil in a uniform field, τ = NIAB sin θ',
    'Define the magnetic moment m = NIA and find its direction with the right-hand rule',
    'Treat a current loop as a magnetic dipole and find the orbital magnetic moment of an electron in a Bohr orbit',
  ],
  slides: [
    sl('title', 'Torque on a Current Loop', {
      b: 'Part 1 — why a coil carrying current turns in a magnetic field, and why a small loop behaves like a tiny magnet.',
      v: V.face,
      n: 'Every electric motor, every analogue meter and every loudspeaker relies on one fact: a coil carrying a current in a magnetic field feels a turning effect. In this part we work out that torque for a rectangular coil, define the magnetic moment of a coil, see that a small current loop behaves exactly like a magnetic dipole, and apply the idea to an electron going round a nucleus.',
    }),
    sl('diagram', 'Forces on the four sides of a coil', {
      b: r`A rectangular coil PQRS ($N$ turns, current $I$) can turn about an axis through its centre, perpendicular to a uniform field $\vec B$. Each side feels $\vec F = NI\,\vec l \times \vec B$.`,
      ul: ['QR and SP (length $l$) stay perpendicular to $\\vec B$: forces $NIlB$, equal and opposite, on **different lines**: a couple.', 'PQ and RS (length $b$): equal and opposite forces along the **same line** (the axis): they cancel without turning.', 'Net force on the coil in a **uniform** field is zero.'],
      v: V.face,
      n: 'Look at each side in turn. The two sides parallel to the axis always cut across the field, so each feels a force N I l B, one pushed out of the page and the other pushed in. The other two sides feel equal and opposite forces that act along the same line, so they cancel completely. The total force is zero, but the first pair forms a couple that turns the coil.',
    }),
    sl('diagram', 'Deriving τ = NIAB sin θ', {
      b: r`Seen from above, the two forces $F = NIlB$ act along parallel lines a distance $b\sin\theta$ apart, where $\theta$ is the angle between the normal to the coil and $\vec B$:
$$\tau = NIlB \times b\sin\theta = NIAB\sin\theta \qquad (A = lb)$$`,
      ul: ['The result holds for a flat coil of **any shape** of area $A$.', '$\\theta$ is measured from the **normal**, not from the plane of the coil.'],
      v: V.top,
      n: 'Now look down on the coil from above. The two long sides appear as dots, one pushed up the page and one pushed down. The perpendicular distance between these two forces is b sine theta, where theta is the angle between the normal to the coil and the field. Torque is force times arm, N I l B times b sine theta, and since l times b is the area, the torque is N I A B sine theta.',
    }),
    sl('example', 'Worked example 1: torque on a rectangular coil', {
      b: r`A coil of 120 turns, 5.0 cm × 3.0 cm, carries 0.40 A in a uniform field of 0.30 T. The axis of rotation is along the 5.0 cm sides and perpendicular to $\vec B$. Find (a) the force on each 5.0 cm side, (b) the largest torque, (c) the torque when the plane of the coil makes $${ex1.plane}^\circ$ with the field.`,
      ul: [
        r`(a) $F = NIlB = 120 \times 0.40 \times 0.050 \times 0.30 = ${dec(ex1.F, 2)}$ N.`,
        r`(b) Largest when the plane is along $\vec B$: $\tau_\text{max} = F \times b = ${dec(ex1.F, 2)} \times 0.030 = ${sci(ex1.tmax, 3)}$ N m.`,
        r`(c) Plane at $${ex1.plane}^\circ$ means the normal is at $\theta = ${ex1.theta}^\circ$: $\tau = ${sci(ex1.tmax, 3)} \times \sin ${ex1.theta}^\circ = ${sci(ex1.tau, 3)}$ N m.`,
      ],
      v: torquePlot,
      n: 'Each long side carries one hundred and twenty turns of point four ampere across a field of point three tesla, so the force on it is point seven two newton. With an arm equal to the three centimetre width, the largest torque is about point zero two two newton metre. With the plane at sixty degrees to the field, the normal is at thirty degrees, so the torque is half of that.',
    }),
    sl('check', 'Quick check: largest torque', {
      b: 'Choose the correct option.',
      v: torquePlot,
      chk: 'maxangle-mcq',
      n: 'Remember that theta is the angle between the normal to the coil and the field.',
    }),
    sl('concept', 'Magnetic moment of a coil', {
      b: r`Write the torque as $\tau = (NIA)B\sin\theta$. The **magnetic moment** of the coil is
$$\vec m = NI\vec A, \qquad \text{unit A m}^2$$
Its direction is along the normal given by the **right-hand rule**: curl the fingers of the right hand in the sense of the current; the thumb points along $\vec m$.`,
      ul: ['Anticlockwise current as seen: $\\vec m$ towards you. Clockwise: away from you.', 'For a circular coil of radius $R$: $m = NI\\pi R^2$.'],
      v: V.rhr,
      n: 'The product N I A collects everything about the coil that matters for the torque, so we give it a name: the magnetic moment, measured in ampere square metres. It is a vector along the normal to the coil. To find which way, curl the fingers of your right hand round the coil in the direction of the current. Your thumb then points along the magnetic moment.',
    }),
    sl('concept', 'Torque as a vector: τ = m × B', {
      b: r`$$\vec\tau = \vec m \times \vec B, \qquad \tau = mB\sin\theta$$
The torque always tends to turn $\vec m$ **into line with** $\vec B$.`,
      v: orient,
      ul: ['At $\\theta = 0^\\circ$ a small twist produces a torque that brings the coil back: **stable**.', 'At $\\theta = 180^\\circ$ a small twist produces a torque that turns it further: **unstable**.'],
      n: 'In vector form the torque is m cross B. It is zero when the moment is along the field or exactly opposite to it, and largest when the two are at right angles. The torque always tries to swing the moment round into line with the field. So the coil rests stably with m along B; with m opposite to B it is balanced, but the slightest nudge makes it flip over.',
    }),
    sl('example', 'Worked example 2: a circular coil in a field', {
      b: r`A flat circular coil of 40 turns and radius 5.0 cm lies in the plane of the page and carries 2.5 A anticlockwise as seen. A uniform field of 0.020 T points to the right, in the plane of the page. Find the magnetic moment and the torque, and describe how the coil turns.`,
      ul: [
        r`$m = NI\pi R^2 = 40 \times 2.5 \times \pi \times (0.050)^2 \approx ${dec(ex2.m, 3)}$ A m², **out of the page** (right-hand rule).`,
        r`$\vec m \perp \vec B$, so $\tau = mB = ${dec(ex2.m, 3)} \times 0.020 \approx ${sci(ex2.tau, 2)}$ N m (the largest possible).`,
        'The torque turns the coil about the vertical line in the page through its centre until $\\vec m$ points along $\\vec B$, to the right.',
      ],
      v: V.rhr,
      n: 'Turns times current times pi R squared gives about point seven eight five ampere square metre. Curling the right hand anticlockwise, the thumb points out of the page, at right angles to the field, so the torque is at its largest, m times B, about one point six times ten to the minus two newton metre. The coil swings about a vertical line until its moment points to the right, along the field.',
    }),
    sl('check', 'Quick check: direction of m', {
      b: 'Choose the correct option.',
      v: V.rhr,
      chk: 'righthand-mcq',
      n: 'Curl the fingers of your right hand along the current.',
    }),
    sl('diagram', 'A current loop is a magnetic dipole', {
      b: r`Far from a small loop, its field has the same pattern as that of a short bar magnet or an electric dipole. On the axis at distance $x \gg R$:
$$B \approx \dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3}$$
(from the axial field of a loop, chapter 7, with $x \gg R$).`,
      ul: ['The face the moment points out of acts as a **north** face; the other as a **south** face.', 'The field falls as $1/x^3$, like that of any dipole.'],
      v: V.dipole,
      n: 'Step back from a small current loop and its field lines look just like those of a tiny bar magnet: they leave one face, loop round, and enter the other. The face that the magnetic moment points out of acts as a north pole. On the axis far away, the field is mu nought over four pi times two m over x cubed, falling off with the cube of the distance, like the field of any dipole.',
    }),
    sl('two-column', 'Electric dipole and current loop compared', {
      b: 'The magnetic moment plays the role of the dipole moment:',
      v: analogy,
      cols: ['**Electric dipole**\n- Two charges ±q\n- No net force in uniform E\n- Turns to align p with E', '**Current loop**\n- A current round an area\n- No net force in uniform B\n- Turns to align m with B'],
      n: 'Put the two side by side. An electric dipole in a uniform electric field feels no net force but a torque p cross E. A current loop in a uniform magnetic field feels no net force but a torque m cross B. Both settle with their moment along the field, and both have far fields that fall as the inverse cube of distance. One difference: there are no separate magnetic charges inside a loop.',
    }),
    sl('diagram', 'The orbiting electron as a current loop', {
      b: r`An electron (charge $-e$) moving at speed $v$ in a circle of radius $r$ is a current loop:
$$I = \dfrac{e}{T} = \dfrac{ev}{2\pi r}, \qquad \mu = I\pi r^2 = \dfrac{evr}{2}$$
With $L = m_evr$: $\mu = \dfrac{e}{2m_e}L$, and $\vec\mu$ is **opposite** to $\vec L$ because the charge is negative.`,
      ul: ['Bohr orbit: $L = \\dfrac{nh}{2\\pi}$, so $\\mu = n\\dfrac{eh}{4\\pi m_e}$.', '**Bohr magneton** $\\mu_B = \\dfrac{eh}{4\\pi m_e} \\approx 9.27 \\times 10^{-24}$ A m².'],
      v: V.orbit,
      n: 'In the Bohr model the electron races round the nucleus. Each time round, a charge e passes any point, so the orbit carries a current e divided by the period. Multiply by the area of the orbit and the magnetic moment is e v r over two. Since the angular momentum is m v r, the moment is e over two m times L. Bohr’s rule fixes L as n h over two pi, so the moment comes in steps of the Bohr magneton.',
    }),
    sl('example', 'Worked example 3: the electron in hydrogen', {
      b: r`In the ground state of hydrogen the electron moves at $2.2 \times 10^{6}$ m s$^{-1}$ in an orbit of radius $5.3 \times 10^{-11}$ m. Find the equivalent current and the orbital magnetic moment.`,
      ul: [
        r`$I = \dfrac{ev}{2\pi r} = \dfrac{1.6 \times 10^{-19} \times 2.2 \times 10^{6}}{2\pi \times 5.3 \times 10^{-11}} \approx ${sci(ex3.I, 3)}$ A (about 1 mA).`,
        r`$\mu = \dfrac{evr}{2} = \dfrac{1.6 \times 10^{-19} \times 2.2 \times 10^{6} \times 5.3 \times 10^{-11}}{2} \approx ${sci(ex3.mu, 3)}$ A m².`,
        r`Compare $\mu_B \approx 9.27 \times 10^{-24}$ A m²: the ground state ($n = 1$) has one Bohr magneton, to the accuracy of the data.`,
      ],
      v: V.orbit,
      n: 'The electron goes round about six and a half thousand million million times a second. That makes an equivalent current of about one milliampere, surprisingly large for a single electron. Multiplying by the tiny area of the orbit gives a magnetic moment of about nine point three times ten to the minus twenty four ampere square metre, one Bohr magneton, as the Bohr model predicts for the first orbit.',
    }),
    sl('check', 'Quick check: the orbiting electron', {
      b: 'Calculate the magnetic moment.',
      v: V.orbit,
      chk: 'orbitm-num',
      n: 'Use e v r over two.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Net force on a loop in uniform B', 'Zero'],
          ['Torque on a coil', '$\\tau = NIAB\\sin\\theta$, θ between normal and B'],
          ['Magnetic moment', '$\\vec m = NI\\vec A$ (A m²), right-hand rule'],
          ['Vector torque', '$\\vec\\tau = \\vec m \\times \\vec B$; stable at 0°, unstable at 180°'],
          ['Loop as a dipole', 'Axial far field $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$'],
          ['Orbiting electron', '$\\mu = evr/2 = (e/2m_e)L$; $\\mu_B \\approx 9.27 \\times 10^{-24}$ A m²'],
        ],
        'Summary table of the torque on a coil, its magnetic moment, the vector torque, the loop as a dipole and the orbital moment of the electron',
      ),
      n: 'To sum up: a coil in a uniform field feels no net force but a torque N I A B sine theta, where theta is measured from the normal. Its magnetic moment N I A points along the right-hand normal, and the torque m cross B turns it towards the field. A small loop is a magnetic dipole, and an orbiting electron has a magnetic moment e over two m times its angular momentum.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In the derivation, show the forces on all four sides and say why two pairs behave differently.',
        'Convert “plane at α to B” into θ = 90° − α before using sin θ.',
        'Use the right-hand rule for the direction of m; no other rule is needed.',
        'For the electron, μ is opposite to L: say why (negative charge).',
      ],
      v: table(['Asked', 'Key point'], [['Plane of coil along B?', 'θ = 90°, torque largest'], ['Plane perpendicular to B?', 'θ = 0°, torque zero'], ['μ of nth Bohr orbit?', 'n Bohr magnetons']], 'Table of common questions and the key point for each'),
      n: 'When you derive the torque, draw all four sides and explain why one pair of forces cancels and the other forms a couple. Watch the angle: if a question gives the angle between the plane and the field, subtract it from ninety degrees first. Use the right-hand rule for the moment. And for the electron, remember that its negative charge makes the moment opposite to its angular momentum.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Torque on a Current Loop — Part 2: The moving coil galvanometer, ammeter and voltmeter',
  goals: [
    'Describe the construction and working of a moving coil galvanometer and the purpose of its radial field',
    'Derive I = kθ and use current and voltage sensitivity',
    'Convert a galvanometer into an ammeter with a shunt and into a voltmeter with a series resistance',
  ],
  slides: [
    sl('title', 'The Moving Coil Galvanometer', {
      b: 'Part 2 — the torque on a coil put to work: a sensitive current detector, and the ammeters and voltmeters built from it.',
      v: V.mcgFront,
      n: 'The torque on a coil has a very practical use: the moving coil galvanometer, which can detect currents of a few microamperes. In this part we see how it is built and why its magnet has curved pole pieces, show that its deflection is proportional to the current, define its sensitivity, and then turn the same instrument into an ammeter and a voltmeter of any range we like.',
    }),
    sl('diagram', 'Construction', {
      b: 'Main parts of a moving coil galvanometer:',
      ul: ['A rectangular **coil** of many turns of fine insulated copper wire on a light frame, free to turn about a vertical axis.', 'A strong **magnet** with **concave** (cylindrical) pole pieces.', 'A **soft-iron cylinder** fixed inside the coil.', 'A **phosphor-bronze** suspension strip (or hairsprings) giving the restoring torque, with a mirror or pointer to read the deflection.'],
      v: V.mcgFront,
      n: 'The heart of the instrument is a coil of many turns of fine copper wire, wound on a light frame and hung between the poles of a strong magnet. The pole pieces are curved, and a soft-iron cylinder sits inside the coil without touching it. A thin phosphor-bronze strip, or a pair of hairsprings, holds the coil, carries the current in and out, and twists back against any deflection.',
    }),
    sl('diagram', 'Why a radial field?', {
      b: r`The concave pole pieces and the soft-iron core make the field in the narrow gap **radial**. Whatever the deflection, the plane of the coil contains $\vec B$, so $\theta = 90^\circ$ and the deflecting torque is always
$$\tau = NIAB$$`,
      ul: ['The soft-iron core also **concentrates** the field lines, making $B$ larger and the galvanometer more sensitive.'],
      v: V.mcgTop,
      n: 'Seen from above, the field lines in the gap all point along radii of the iron cylinder. As the coil turns, its sides move round inside this gap, and the field at each side still lies along the plane of the coil. So the angle between the moment and the field stays at ninety degrees, and the torque is simply N I A B at every deflection. The iron core also strengthens the field.',
    }),
    sl('concept', 'Principle and working: I = kθ', {
      b: r`Principle: a coil carrying current in a magnetic field experiences a torque. The suspension twists back with a restoring torque $c\theta$ ($c$ = restoring torque per unit twist). The coil comes to rest when
$$NIAB = c\theta \;\Rightarrow\; I = \dfrac{c}{NAB}\,\theta = k\theta$$`,
      ul: ['$k = c/NAB$ is the **galvanometer constant**: current per unit deflection.', 'Since $I \\propto \\theta$, the scale is **evenly divided** (linear).'],
      v: scalePlot,
      n: 'When a current flows, the deflecting torque N I A B turns the coil, twisting the suspension. The suspension pushes back with a torque c theta that grows with the twist. The coil stops where the two balance, so the current equals c over N A B times the deflection. That constant, k, is the galvanometer constant. Because the current is proportional to the deflection, the scale divisions are evenly spaced.',
    }),
    sl('example', 'Worked example 4: current for a given deflection', {
      b: r`A galvanometer coil has 60 turns, each 2.0 cm × 2.5 cm, in a radial field of 0.18 T. The restoring torque per unit twist is $4.5 \times 10^{-8}$ N m rad$^{-1}$. Find the current that deflects it by 0.30 rad, and its current sensitivity.`,
      ul: [
        r`$NAB = 60 \times 5.0 \times 10^{-4} \times 0.18 = ${sci(ex4.NAB, 2)}$ N m A$^{-1}$.`,
        r`$I = \dfrac{c\theta}{NAB} = \dfrac{4.5 \times 10^{-8} \times 0.30}{${sci(ex4.NAB, 2)}} = ${sci(ex4.I, 2)}$ A, i.e. 2.5 μA.`,
        r`Current sensitivity $\dfrac{\theta}{I} = \dfrac{NAB}{c} = ${sci(ex4.SI, 2)}$ rad A$^{-1}$ (0.12 rad per μA).`,
      ],
      v: V.mcgTop,
      n: 'First find N A B: sixty turns times five square centimetres times point one eight tesla, five point four times ten to the minus three. The current needed for point three radian is the restoring torque, c times theta, divided by N A B: two and a half microamperes. Turned round, the current sensitivity is a hundred and twenty thousand radians per ampere, about point one two radian for every microampere.',
    }),
    sl('check', 'Quick check: the radial field', {
      b: 'Choose the correct option.',
      v: V.mcgTop,
      chk: 'radial-mcq',
      n: 'Think about the angle between the plane of the coil and the field as the coil turns.',
    }),
    sl('concept', 'Current and voltage sensitivity', {
      b: r`**Current sensitivity:** deflection per unit current, $\dfrac{\theta}{I} = \dfrac{NAB}{c}$. **Voltage sensitivity:** deflection per unit p.d. across the coil, $\dfrac{\theta}{V} = \dfrac{\theta}{IG} = \dfrac{NAB}{cG}$ ($G$ = coil resistance).`,
      ul: ['Raise sensitivity with more turns $N$, larger area $A$, stronger radial $B$ and a suspension of small $c$ (phosphor bronze).', 'More turns of the same wire also raise $G$, so the voltage sensitivity need not rise.'],
      v: sensTable,
      n: 'A sensitive galvanometer gives a big deflection for a small current. Its current sensitivity is N A B over c. Its voltage sensitivity, the deflection per volt across the coil, is that divided by the coil resistance G. More turns, a larger coil, a stronger field or a weaker suspension all help. But adding turns also adds resistance, so the voltage sensitivity may not improve.',
    }),
    sl('example', 'Worked example 5: a divided scale', {
      b: r`A galvanometer of resistance 40 Ω has 30 divisions on its scale and gives full-scale deflection for 1.2 mA. Find its figure of merit (current per division), its current sensitivity and its voltage sensitivity.`,
      ul: [
        r`$k = \dfrac{1.2 \times 10^{-3}}{30} = ${sci(ex5.k, 2)}$ A per division (40 μA per division).`,
        r`Current sensitivity $= \dfrac{30}{1.2\ \text{mA}} = ${dec(ex5.SI, 2)}$ divisions per mA.`,
        r`Full-scale p.d. $= 1.2\ \text{mA} \times 40\ \Omega = ${dec(ex5.Vfs * 1e3, 2)}$ mV; voltage sensitivity $= \dfrac{30}{48\ \text{mV}} \approx ${dec(ex5.SV, 3)}$ divisions per mV.`,
      ],
      v: sensTable,
      n: 'Thirty divisions for one point two milliamperes means forty microamperes per division: that is the figure of merit. Turned round, the current sensitivity is twenty five divisions per milliampere. At full scale the coil carries one point two milliamperes through forty ohms, a potential difference of forty eight millivolts, so the voltage sensitivity is about point six two five division per millivolt.',
    }),
    sl('check', 'Quick check: figure of merit', {
      b: 'Calculate the current per division.',
      v: sensTable,
      chk: 'figure-num',
      n: 'Divide the full-scale current by the number of divisions.',
    }),
    sl('diagram', 'Galvanometer to ammeter: the shunt', {
      b: r`A galvanometer (resistance $G$, full-scale current $I_g$) reads up to $I$ when a small **shunt** $S$ is joined **in parallel**. Same p.d. across both: $I_gG = (I - I_g)S$, so
$$S = \dfrac{I_gG}{I - I_g}$$`,
      ul: ['If $I = nI_g$, then $S = \\dfrac{G}{n - 1}$.', 'The ammeter’s resistance $\\dfrac{GS}{G + S}$ is less than $S$: tiny, as an ammeter in series needs.'],
      v: V.amm,
      n: 'A galvanometer can take only a few milliamperes. To measure larger currents, connect a small resistance, the shunt, across it. The coil and the shunt have the same potential difference, so I g times G equals the shunt current times S. Most of the current goes through the shunt, and the finished ammeter has a very low resistance, so it hardly changes the current in the circuit it is placed in.',
    }),
    sl('example', 'Worked example 6: making an ammeter', {
      b: r`A galvanometer of resistance 24 Ω gives full-scale deflection for 2.5 mA. Find the shunt needed to make an ammeter of range 0–0.50 A, and the resistance of the ammeter.`,
      ul: [
        r`$S = \dfrac{I_gG}{I - I_g} = \dfrac{2.5 \times 10^{-3} \times 24}{0.50 - 0.0025} = \dfrac{0.060}{0.4975} \approx ${dec(G.AMM_DATA.S, 3)}$ Ω, in parallel.`,
        r`Ammeter resistance $= \dfrac{24 \times ${dec(G.AMM_DATA.S, 3)}}{24 + ${dec(G.AMM_DATA.S, 3)}} \approx ${dec(G.AMM_DATA.RA, 3)}$ Ω.`,
      ],
      v: V.amm,
      n: 'At full scale the coil carries two and a half milliamperes, so the potential difference across it is sixty millivolts. The shunt must carry the rest of the half ampere at the same potential difference, which needs about point one two one ohm. The finished ammeter, the coil and shunt in parallel, has a resistance of only about point one two ohm.',
    }),
    sl('diagram', 'Galvanometer to voltmeter: the series resistance', {
      b: r`For a voltmeter of range $V$, a large resistance $R$ is joined **in series** so that $I_g$ flows when $V$ is applied: $V = I_g(G + R)$, so
$$R = \dfrac{V}{I_g} - G$$`,
      ul: ['A tap between series resistors gives a **multi-range** voltmeter.', 'The voltmeter’s resistance $G + R$ is large, as a meter in parallel needs.'],
      v: V.volt,
      n: 'To measure potential difference, put a large resistance in series with the coil, so that the full-scale current flows only when the chosen voltage is applied. The total resistance must be that voltage divided by the full-scale current; subtract the coil’s own resistance to find the series resistor. Taps between several resistors give a meter with more than one range.',
    }),
    sl('example', 'Worked example 7: a two-range voltmeter', {
      b: r`Using the same galvanometer (24 Ω, 2.5 mA), design a voltmeter with ranges 0–3 V and 0–12 V.`,
      ul: [
        r`0–3 V: total $\dfrac{3}{2.5 \times 10^{-3}} = 1200$ Ω, so $R_1 = 1200 - 24 = ${G.VOLT_DATA.R1}$ Ω.`,
        r`0–12 V: total $\dfrac{12}{2.5 \times 10^{-3}} = 4800$ Ω, so add $R_2 = 4800 - 1200 = ${G.VOLT_DATA.R2}$ Ω after the 3 V tap.`,
      ],
      v: V.volt,
      n: 'For three volts at full scale, the total resistance must be three volts divided by two and a half milliamperes, twelve hundred ohms, so the series resistor is eleven hundred and seventy six ohms. For twelve volts the total must be four thousand eight hundred ohms, so a further three thousand six hundred ohms is added beyond the first tap.',
    }),
    sl('check', 'Quick check: a shunt', {
      b: 'Calculate the shunt resistance.',
      v: V.amm,
      chk: 'shunt-num',
      n: 'The galvanometer and the shunt have the same potential difference across them.',
    }),
    sl('concept', 'Meters in real circuits', {
      b: r`A real meter changes what it measures. Example: 6.0 V across 1.0 kΩ and 2.0 kΩ in series puts 4.0 V across the 2.0 kΩ resistor; a 2.0 kΩ voltmeter placed across it makes that part $1.0$ kΩ and reads only $${dec(ex8.read, 2)}$ V.`,
      v: loadPlot,
      ul: ['A voltmeter should have a resistance **much larger** than the resistance it is across.', 'An ammeter should have a resistance **much smaller** than the rest of the circuit.'],
      n: 'Meters are not perfect. Take six volts across one kilo-ohm and two kilo-ohms in series: the two kilo-ohm resistor has four volts across it. A voltmeter of only two kilo-ohms in parallel turns that part of the circuit into one kilo-ohm, and it reads just three volts. As the graph shows, the reading approaches four volts only when the meter’s resistance is many times larger.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: meterTable,
      ul: ['Radial field: torque $NIAB$ at every angle; $I = k\\theta$, $k = c/NAB$, a linear scale.', 'Current sensitivity $NAB/c$; voltage sensitivity $NAB/cG$.', 'Ammeter: shunt $S = I_gG/(I - I_g)$ in parallel. Voltmeter: $R = V/I_g - G$ in series.'],
      n: 'To sum up: the galvanometer’s radial field keeps the torque at N I A B, so the current is proportional to the deflection. Its current sensitivity is N A B over c, and its voltage sensitivity is that divided by the coil resistance. A small shunt in parallel makes it an ammeter of low resistance; a large resistance in series makes it a voltmeter of high resistance.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Explain the radial field in terms of the angle between the plane of the coil and B.',
        'Shunt: equate the p.d. across coil and shunt. Voltmeter: total resistance = V/Ig.',
        'Work in amperes and ohms; convert mA and μA first.',
        'When asked to compare sensitivities, check whether G changes too.',
      ],
      v: table(['Asked', 'Key point'], [['Range n times Ig?', 'S = G/(n − 1)'], ['Voltmeter of range V?', 'R = V/Ig − G'], ['Why soft iron?', 'Radial and stronger field']], 'Table of common questions and the key point for each'),
      n: 'For the radial field, say that the plane of the coil always contains the field, so the torque is the same at every angle. For a shunt, set the potential difference across the coil equal to that across the shunt; for a voltmeter, find the total resistance first. Convert milliamperes and microamperes to amperes before you substitute, and check whether the coil resistance changes when comparing sensitivities.',
    }),
  ],
});
