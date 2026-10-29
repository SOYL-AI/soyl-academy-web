// ch04 Moving Charges and Magnetism — question bank. Every numerical value is computed here from the givens and
// re-checked by the `check` functions; force and field directions are checked as cross products where they matter.
// AR keys planned: d a a d b c a.
import { mk, add, r, QE, ME, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { MU0, MP } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const U = 1.66e-27;

// ================================================================ t01 Lorentz force and motion of charges
add('nowork-tf', tf({
  stem: 'A steady magnetic field cannot change the kinetic energy of a charged particle moving through it.',
  key: 't',
  sol: 'True. The magnetic force $q\\vec v \\times \\vec B$ is always perpendicular to the velocity, so it does no work; only the direction of motion changes.',
  d: 1, c: 'understanding', t: [1],
}));
add('electron-mcq', mcq({
  stem: 'An electron moves towards the right across the page through a uniform magnetic field directed into the page. The magnetic force on it is',
  right: 'towards the bottom of the page',
  wrong: ['towards the top of the page', 'into the page', 'zero'],
  sol: r`For a positive charge, $\vec v \times \vec B$ (right × into) points to the top of the page; the electron is negative, so the force points to the bottom — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => { const F = cross([1, 0, 0], [0, 0, 1]); return (F[1] < 0) || 'dir'; }); // screen: y down, z into page; F[1] < 0 is "up" for +q, so −q goes down
const er = { v: 3e6, B: 1e-3 };
er.r = (ME * er.v) / (QE * er.B);
add('radius-num', num({
  stem: 'An electron moves at 3.0 × 10⁶ m s⁻¹ perpendicular to a uniform field of 1.0 × 10⁻³ T. Find the radius of its path, in centimetres. (mₑ = 9.1 × 10⁻³¹ kg)',
  value: Number(dec(er.r * 100, 3)), tol: 0.02, unit: 'cm',
  sol: r`$r = \dfrac{mv}{qB} = \dfrac{9.1 \times 10^{-31} \times 3.0 \times 10^{6}}{1.6 \times 10^{-19} \times 1.0 \times 10^{-3}} = ${dec(er.r, 3)}$ m. In cm: $${dec(er.r, 3)} \times 100 = ${dec(er.r * 100, 3)}$.`,
  scheme: [['r = mv/qB ≈ 1.71 cm', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(er.r * 100, q.answer.value) || 'r');
add('alpha-mcq', mcq({
  stem: 'A proton and an alpha particle (charge $2e$, mass about $4m_p$) enter the same uniform magnetic field with the same speed, perpendicular to the field. The ratio of the radius of the alpha particle’s path to that of the proton is',
  right: '2',
  wrong: ['1/2', '4', '1'],
  sol: r`$r = \dfrac{mv}{qB}$: $\dfrac{r_\alpha}{r_p} = \dfrac{4m/2e}{m/e} = 2$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near((4 / 2) / (1 / 1), 2) || 'ratio');
add('sameK-mcq', mcq({
  stem: 'A proton and a deuteron (same charge, twice the mass) have the SAME kinetic energy and move perpendicular to the same uniform magnetic field. The ratio $r_d / r_p$ of the radii of their paths is',
  right: '$\\sqrt{2}$',
  wrong: ['2', '1/2', '1'],
  sol: r`$r = \dfrac{mv}{qB} = \dfrac{\sqrt{2mK}}{qB}$, so with the same $K$ and $q$, $r \propto \sqrt{m}$: the ratio is $\sqrt{2}$ — option (@K).`,
  d: 4, c: 'application', t: [1],
}), () => near(Math.sqrt(2 * 2) / Math.sqrt(2 * 1), Math.SQRT2) || 'K');
add('period-mcq', mcq({
  stem: 'The speed of a charged particle moving in a circle in a uniform magnetic field is doubled. Its period of revolution',
  right: 'stays the same',
  wrong: ['doubles', 'halves', 'becomes four times'],
  sol: '$T = 2\\pi m/qB$ does not involve $v$: the radius doubles, and so does the distance per turn — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('helix-mcq', mcq({
  stem: 'A proton enters a uniform magnetic field with its velocity at $30^\\circ$ to the field. Its path is',
  right: 'a helix with its axis along the field',
  wrong: ['a circle in a plane perpendicular to the field', 'a straight line along the field', 'a parabola'],
  sol: 'The component of $\\vec v$ along $\\vec B$ is unchanged, while the perpendicular component makes the proton circle: together they give a helix — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const sel = { v: 4e4, B: 0.05 };
add('selector-num', num({
  stem: 'In a velocity selector the magnetic field is 0.050 T. What electric field (in V m⁻¹) lets ions moving at 4.0 × 10⁴ m s⁻¹ pass undeflected?',
  value: sel.v * sel.B, tol: 10, unit: 'V m⁻¹',
  sol: r`$qE = qvB$, so $E = vB = 4.0 \times 10^{4} \times 0.050 = ${sel.v * sel.B}$ V m$^{-1}$.`,
  scheme: [['E = vB = 2000 V m⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(sel.v * sel.B, q.answer.value) || 'E');
const pf = { v: 5e6, B: 0.4 };
pf.F = QE * pf.v * pf.B * 0.5;
add('force-num', num({
  stem: 'A proton moves at 5.0 × 10⁶ m s⁻¹ at 30° to a uniform field of 0.40 T. Find the magnetic force on it, in piconewtons (1 pN = 10⁻¹² N).',
  value: Number(dec(pf.F * 1e12, 2)), tol: 0.005, unit: 'pN',
  sol: r`$F = qvB\sin 30^\circ = 1.6 \times 10^{-19} \times 5.0 \times 10^{6} \times 0.40 \times 0.5 = ${sci(pf.F, 2)}$ N. In pN: $${sci(pf.F, 2)} \times 10^{12} = ${dec(pf.F * 1e12, 2)}$.`,
  scheme: [['F = qvB sin θ = 0.16 pN', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(pf.F * 1e12, q.answer.value) || 'F');
add('always-ar', ar({
  a: 'A charged particle moving through a magnetic field always experiences a magnetic force.',
  r: 'The magnetic force on a moving charge is $q\\vec v \\times \\vec B$.',
  key: 'd',
  sol: 'R is true. A is false: if $\\vec v$ is parallel or antiparallel to $\\vec B$, $\\vec v \\times \\vec B = 0$ and there is no force — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('tesla-fill', fill({
  stem: 'The SI unit of magnetic field is the ___.',
  acc: [['tesla', 'T']],
  sol: 'The **tesla** (T); 1 T = 1 N A⁻¹ m⁻¹.',
  d: 1, c: 'recall', t: [1],
}));
add('helix-short', short({
  marks: 2,
  stem: 'Explain why a charged particle entering a uniform magnetic field at an angle (neither along nor perpendicular to it) moves in a helix.',
  model: 'Split $\\vec v$ into components **along** $\\vec B$ and **perpendicular** to it. The parallel component feels **no force**, so it stays constant and carries the particle along the field. The perpendicular component feels a force $qv_\\perp B$ at right angles to it, so it produces **circular motion**. Circling while drifting steadily along the field gives a helix.',
  sol: 'Resolve v along and perpendicular to B.',
  scheme: [['Parallel component unchanged (no force)', 1], ['Perpendicular component gives circular motion: helix', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('circ-short', short({
  marks: 3,
  stem: 'A particle of mass $m$ and charge $q$ moves with speed $v$ perpendicular to a uniform magnetic field $B$. Show that its path is a circle, find its radius, and show that its period does not depend on its speed.',
  model: r`The force $qvB$ is always perpendicular to $\vec v$, so the speed stays constant and the force has constant size: it acts as a **centripetal force**, so the path is a circle. $qvB = \dfrac{mv^2}{r}$ gives $r = \dfrac{mv}{qB}$. Period $T = \dfrac{2\pi r}{v} = \dfrac{2\pi m}{qB}$, which contains no $v$: a faster particle moves on a proportionally larger circle in the same time.`,
  sol: 'Equate qvB to mv²/r; then T = 2πr/v.',
  scheme: [['Force perpendicular to v, constant speed: circle', 1], ['r = mv/qB', 1], ['T = 2πm/qB, independent of v', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));

// ================================================================ t02 Biot–Savart, circular loop
add('loopR-mcq', mcq({
  stem: 'The current in a circular loop is kept the same but the radius of the loop is doubled. The field at its centre becomes',
  right: 'half as large',
  wrong: ['twice as large', 'one quarter as large', 'unchanged'],
  sol: '$B = \\mu_0 I/2R$ is inversely proportional to $R$ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
const cc = { N: 50, I: 1.5, R: 0.1 };
cc.B = (MU0 * cc.N * cc.I) / (2 * cc.R);
add('centre-num', num({
  stem: 'A circular coil of 50 turns and radius 10 cm carries 1.5 A. Find the field at its centre, in millitesla (mT).',
  value: Number(dec(cc.B * 1e3, 3)), tol: 0.005, unit: 'mT',
  sol: r`$B = \dfrac{\mu_0 NI}{2R} = \dfrac{4\pi \times 10^{-7} \times 50 \times 1.5}{2 \times 0.10} \approx ${sci(cc.B, 3)}$ T. In mT: $${sci(cc.B, 3)} \times 10^{3} = ${dec(cc.B * 1e3, 3)}$.`,
  scheme: [['B = μ₀NI/2R ≈ 0.471 mT', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(cc.B * 1e3, q.answer.value) || 'B');
add('axis8-mcq', mcq({
  stem: 'The field at the centre of a circular loop is $B_0$. At a point on its axis at a distance $\\sqrt{3}R$ from the centre, the field is',
  right: '$B_0/8$',
  wrong: ['$B_0/3$', '$B_0/4$', '$B_0/\\sqrt{3}$'],
  sol: r`$\dfrac{B}{B_0} = \dfrac{R^3}{(R^2 + x^2)^{3/2}} = \dfrac{R^3}{(4R^2)^{3/2}} = \dfrac{1}{8}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(1 / (1 + 3) ** 1.5, 1 / 8) || 'axis');
add('semicircle-mcq', mcq({
  stem: 'A wire bent into a semicircle of radius $R$ carries current $I$ (the straight leads point radially and contribute nothing). The field at the centre of the semicircle is',
  right: '$\\dfrac{\\mu_0 I}{4R}$',
  wrong: ['$\\dfrac{\\mu_0 I}{2R}$', '$\\dfrac{\\mu_0 I}{2\\pi R}$', '$\\dfrac{\\mu_0 I}{8R}$'],
  sol: r`Every element is at distance $R$ and perpendicular to the radius, so the Biot–Savart contributions add: $B = \dfrac{\mu_0}{4\pi}\dfrac{I(\pi R)}{R^2} = \dfrac{\mu_0 I}{4R}$, half the full-loop value — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near((1e-7 * Math.PI) / 1, (4 * Math.PI * 1e-7) / 4) || 'semi');
add('inline-mcq', mcq({
  stem: 'According to the Biot–Savart law, the field produced by a short current element at a point lying on the line of the element (ahead of it) is',
  right: 'zero',
  wrong: ['largest', 'along the element', 'directed towards the element'],
  sol: 'For a point on the line of the element, $\\theta = 0$ and $\\sin\\theta = 0$ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('loopdir-short', short({
  marks: 2,
  stem: 'A circular loop lies flat on a table and, seen from above, carries current anticlockwise. State the direction of the field at its centre and explain how you found it.',
  model: 'The field at the centre points **vertically upwards** (out of the table, towards the viewer). Curl the fingers of the **right hand** in the direction of the current (anticlockwise seen from above); the thumb points up, giving the field direction at the centre.',
  sol: 'Right-hand rule for a loop.',
  scheme: [['Upwards (towards the viewer)', 1], ['Right-hand rule explained', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => { const dB = cross([0, -1, 0], [-1, 0, 0]); return (dB[2] < 0) || 'loopdir'; }); // element at the right of the loop moving "up the page" (anticlockwise from above), r̂ towards the centre: dB along −z = towards viewer
add('sources-match', match({
  stem: 'Match each current arrangement in Column A with its magnetic field in Column B.',
  pairs: [['Long straight wire, distance r', '$\\mu_0 I/2\\pi r$'], ['Centre of a circular loop of radius R', '$\\mu_0 I/2R$'], ['Inside a long solenoid, n turns per metre', '$\\mu_0 nI$'], ['Centre of a semicircular arc of radius R', '$\\mu_0 I/4R$']],
  order: [2, 0, 3, 1],
  sol: 'Wire → μ₀I/2πr (1 → r); loop centre → μ₀I/2R (2 → p); solenoid → μ₀nI (3 → s); semicircle → μ₀I/4R (4 → q).',
  d: 2, c: 'understanding', t: [2, 3],
}));

// ================================================================ t03 Ampere's law
const ww = 2e-7 * 6 / 0.04;
add('wire-num', num({
  stem: 'Find the magnetic field 4.0 cm from a long straight wire carrying 6.0 A, in microtesla (μT).',
  value: Number(dec(ww * 1e6, 2)), tol: 0.2, unit: 'μT',
  sol: r`$B = \dfrac{\mu_0 I}{2\pi r} = \dfrac{2 \times 10^{-7} \times 6.0}{0.040} = ${sci(ww, 2)}$ T. In μT: $${sci(ww, 2)} \times 10^{6} = ${dec(ww * 1e6, 2)}$.`,
  scheme: [['B = μ₀I/2πr = 30 μT', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(ww * 1e6, q.answer.value) || 'B');
add('enclosed-mcq', mcq({
  stem: 'A closed loop encloses two long wires: one carries 3 A into the page and the other 5 A out of the page. The magnitude of $\\oint \\vec B\\cdot d\\vec l$ round the loop is',
  right: '$2\\mu_0$ (in SI units)',
  wrong: ['$8\\mu_0$', '$15\\mu_0$', 'zero'],
  sol: 'Only the net enclosed current counts: $5 - 3 = 2$ A, so the integral is $\\mu_0 \\times 2$ in magnitude — option (@K).',
  d: 3, c: 'application', t: [3],
}));
const sn = { N: 500, L: 0.5, I: 2 };
sn.B = (MU0 * sn.N * sn.I) / sn.L;
add('solenoid-num', num({
  stem: 'A solenoid 50 cm long has 500 turns and carries 2.0 A. Find the field inside it, near the middle, in millitesla.',
  value: Number(dec(sn.B * 1e3, 3)), tol: 0.02, unit: 'mT',
  sol: r`$n = 500/0.50 = 1000$ m$^{-1}$; $B = \mu_0 nI = 4\pi \times 10^{-7} \times 1000 \times 2.0 \approx ${sci(sn.B, 3)}$ T. In mT: $${sci(sn.B, 3)} \times 10^{3} = ${dec(sn.B * 1e3, 3)}$.`,
  scheme: [['n = 1000 m⁻¹', 0.5], ['B ≈ 2.51 mT', 0.5]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(sn.B * 1e3, q.answer.value) || 'Bs');
add('solenoidN-mcq', mcq({
  stem: 'A long solenoid is rewound with twice as many turns over the same length, and the current is halved. The field inside',
  right: 'stays the same',
  wrong: ['doubles', 'halves', 'becomes four times'],
  sol: '$B = \\mu_0 nI$: $n$ doubles and $I$ halves, so $nI$ is unchanged — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('midpoint-mcq', mcq({
  stem: 'Two long parallel wires carry equal currents in the SAME direction. The magnetic field at the point midway between them is',
  right: 'zero',
  wrong: ['twice the field of one wire', 'equal to the field of one wire', 'along the line joining the wires'],
  sol: 'At the midpoint the two fields are equal in size and, by the right-hand rule, opposite in direction — option (@K). (Opposite currents would give twice one wire’s field.)',
  d: 3, c: 'application', t: [3],
}), () => { const B1 = cross([0, 0, -1], [1, 0, 0]); const B2 = cross([0, 0, -1], [-1, 0, 0]); return (Math.abs(B1[1] + B2[1]) < 1e-12) || 'mid'; });
add('ampere-ar', ar({
  a: 'Ampere’s circuital law gives the field of a long straight wire very simply.',
  r: 'By symmetry, the field is tangential and has the same size at every point of a circle centred on the wire.',
  key: 'a',
  sol: 'Both true, and the symmetry in R is exactly why $\\oint \\vec B\\cdot d\\vec l$ reduces to $B \\cdot 2\\pi r$ — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
const wf = { I: 15, d: 0.05, BE: 4.0e-5 };
wf.B = (2e-7 * wf.I) / wf.d;
add('compass-short', short({
  marks: 2,
  stem: 'A long straight wire carrying 15 A runs north–south, 5.0 cm above a compass. The horizontal component of the Earth’s field there is 4.0 × 10⁻⁵ T. Find the wire’s field at the compass and say whether the compass will deflect noticeably.',
  model: r`$B = \dfrac{2 \times 10^{-7} \times 15}{0.050} = ${sci(wf.B, 2)}$ T, at right angles to the wire (east–west), about $1.5$ times the Earth’s horizontal field. The compass points along the resultant, so it deflects **a lot** (about $56^\circ$, since $\tan\theta = 6.0/4.0$).`,
  sol: 'Compare the wire’s field with the Earth’s horizontal field.',
  scheme: [['B = 6.0 × 10⁻⁵ T', 1], ['Comparable with/larger than Earth’s field: large deflection', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(wf.B, 6e-5) && near((Math.atan(6 / 4) * 180) / Math.PI, 56.3, 0.01) || 'compass');

// ================================================================ t04 force on conductors, parallel currents
add('opposite-ar', ar({
  a: 'Two long parallel wires carrying currents in opposite directions repel each other.',
  r: 'Each wire lies in the magnetic field of the other, and the force $I\\vec l \\times \\vec B$ on it points away from the other wire.',
  key: 'a',
  sol: 'Both true; working out $\\vec B$ of one wire at the other and then $I\\vec l \\times \\vec B$ gives a force directed away, which explains the repulsion — option (a).',
  d: 3, c: 'understanding', t: [4],
}), () => { const B1 = cross([0, -1, 0], [1, 0, 0]); const F2 = cross([0, 1, 0], B1); return (F2[0] > 0) || 'repel'; });
add('wireF-num', num({
  stem: 'A straight wire 0.50 m long carries 4.0 A at right angles to a uniform field of 0.30 T. Find the force on it, in newtons.',
  value: 0.5 * 4 * 0.3, tol: 0.01, unit: 'N',
  sol: r`$F = IlB = 4.0 \times 0.50 \times 0.30 = 0.6$ N.`,
  scheme: [['F = IlB = 0.60 N', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(0.6, q.answer.value) || 'F');
add('closed-mcq', mcq({
  stem: 'A closed loop of wire of any shape carries a current and lies in a UNIFORM magnetic field. The net magnetic force on the loop is',
  right: 'zero',
  wrong: ['$IlB$, where $l$ is the length of wire', 'largest when the loop is circular', 'directed along the field'],
  sol: r`$\vec F = I\left(\oint d\vec l\right) \times \vec B$, and $\oint d\vec l = 0$ for a closed loop — option (@K). (There can still be a torque.)`,
  d: 3, c: 'analysis', t: [4],
}));
const pw = { I1: 20, I2: 30, d: 0.1 };
pw.f = (2e-7 * pw.I1 * pw.I2) / pw.d;
add('parallel-num', num({
  stem: 'Two long parallel wires 10 cm apart carry 20 A and 30 A. Find the force per metre of length between them, in millinewtons per metre (mN m⁻¹).',
  value: Number(dec(pw.f * 1e3, 2)), tol: 0.02, unit: 'mN m⁻¹',
  sol: r`$\dfrac{F}{L} = \dfrac{\mu_0 I_1I_2}{2\pi d} = \dfrac{2 \times 10^{-7} \times 20 \times 30}{0.10} = ${sci(pw.f, 2)}$ N m$^{-1}$. In mN m$^{-1}$: $${sci(pw.f, 2)} \times 10^{3} = ${dec(pw.f * 1e3, 2)}$.`,
  scheme: [['F/L = 1.2 mN m⁻¹', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(pw.f * 1e3, q.answer.value) || 'f');
add('spring-mcq', mcq({
  stem: 'A light, loosely wound metal spring hangs vertically with its lower end just dipping into mercury. When a current is passed through the spring, it',
  right: 'contracts, because neighbouring turns carry parallel currents and attract',
  wrong: ['stretches, because neighbouring turns repel', 'stays still, because the forces cancel', 'rotates about its axis'],
  sol: 'Adjacent turns carry current in the same direction, so they attract and the spring shortens — option (@K). (It then lifts out of the mercury, the circuit breaks, and the spring falls back: it oscillates.)',
  d: 3, c: 'application', t: [4],
}));
add('three-mcq', mcq({
  stem: 'Three long parallel wires lie in one plane, equally spaced, each carrying the same current in the same direction. The net force on the middle wire is',
  right: 'zero',
  wrong: ['towards the left wire', 'towards the right wire', 'twice the force between two neighbours'],
  sol: 'The middle wire is attracted equally by the wires on either side, so the forces cancel — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('ampdef-short', short({
  marks: 2,
  stem: 'Define one ampere using the force between two parallel currents.',
  model: 'One ampere is the steady current which, flowing in each of two **infinitely long**, straight, parallel conductors of negligible cross-section placed **1 m apart in vacuum**, produces between them a force of **$2 \\times 10^{-7}$ N per metre** of length.',
  sol: 'State the arrangement and the force per metre.',
  scheme: [['Two long parallel wires 1 m apart in vacuum', 1], ['Force 2 × 10⁻⁷ N per metre', 1]],
  d: 1, c: 'recall', t: [4],
}));
const mw = { I1: 10, I2: 10, d: 0.1 };
mw.Bmid = 2 * ((2e-7 * mw.I1) / (mw.d / 2));
mw.f = (2e-7 * mw.I1 * mw.I2) / mw.d;
add('wires-short', short({
  marks: 3,
  stem: 'Two long parallel wires 10 cm apart carry 10 A each in OPPOSITE directions. Find (a) the field midway between them, (b) the force per metre on each wire, and state whether they attract or repel.',
  model: r`(a) Each wire gives $\dfrac{2 \times 10^{-7} \times 10}{0.050} = 4.0 \times 10^{-5}$ T at the midpoint; for opposite currents the two fields point the **same** way there, so $B = ${sci(mw.Bmid, 2)}$ T.
(b) $\dfrac{F}{L} = \dfrac{2 \times 10^{-7} \times 10 \times 10}{0.10} = ${sci(mw.f, 2)}$ N m$^{-1}$; opposite currents **repel**.`,
  sol: 'Add the two wire fields at the midpoint; then μ₀I₁I₂/2πd.',
  scheme: [['Field of each wire 4.0 × 10⁻⁵ T', 1], ['Midpoint field 8.0 × 10⁻⁵ T (fields add)', 1], ['2.0 × 10⁻⁴ N m⁻¹, repel', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(mw.Bmid, 8e-5) && near(mw.f, 2e-4) || 'wires');

// ================================================================ t05 torque on a loop; magnetic dipole
add('zerotorque-mcq', mcq({
  stem: 'A current-carrying coil is free to rotate in a uniform magnetic field. The torque on it is zero when',
  right: 'the plane of the coil is perpendicular to the field',
  wrong: ['the plane of the coil is parallel to the field', 'the plane of the coil is at 45° to the field', 'the current is largest'],
  sol: 'Then the normal (and $\\vec m$) is along $\\vec B$, so $\\theta = 0$ and $\\tau = NIAB\\sin\\theta = 0$ — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
const mo = { N: 100, I: 0.5, R: 0.02 };
mo.m = mo.N * mo.I * Math.PI * mo.R ** 2;
add('moment-num', num({
  stem: 'A circular coil of 100 turns and radius 2.0 cm carries 0.50 A. Find its magnetic moment, in A m² (3 significant figures).',
  value: Number(dec(mo.m, 3)), tol: 0.001, unit: 'A m²',
  sol: r`$m = NI\pi R^2 = 100 \times 0.50 \times \pi \times 0.020^2 \approx ${dec(mo.m, 3)}$ A m².`,
  scheme: [['m = NIπR² ≈ 0.0628 A m²', 1]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near(mo.m, q.answer.value) || 'm');
const tn = { N: 20, A: 25e-4, I: 2, B: 0.5 };
tn.tau = tn.N * tn.I * tn.A * tn.B;
add('torque-num', num({
  stem: 'A coil of 20 turns and area 25 cm² carries 2.0 A in a uniform field of 0.50 T, with the plane of the coil PARALLEL to the field. Find the torque on it, in N m.',
  value: tn.tau, tol: 0.002, unit: 'N m',
  sol: r`Plane parallel to $\vec B$ means the normal is perpendicular: $\theta = 90^\circ$. $\tau = NIAB = 20 \times 2.0 \times 25 \times 10^{-4} \times 0.50 = ${dec(tn.tau, 2)}$ N m (the maximum).`,
  scheme: [['θ = 90° (normal ⟂ B)', 1], ['τ = 0.050 N m', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(tn.tau, q.answer.value) || 'tau');
add('shape-mcq', mcq({
  stem: 'Equal lengths of the same wire are bent into a circle and into a square, and the same current is passed through each. Which has the larger magnetic moment?',
  right: 'The circle',
  wrong: ['The square', 'Both are equal', 'It depends on the field they are placed in'],
  sol: r`$m = IA$. For perimeter $L$: circle area $L^2/4\pi \approx 0.080L^2$; square area $L^2/16 \approx 0.063L^2$. The circle encloses more area — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => (1 / (4 * Math.PI) > 1 / 16) || 'shape');
add('analogy-match', match({
  stem: 'Match each quantity for an electric dipole in Column A with its analogue for a current loop (magnetic dipole) in Column B.',
  pairs: [['Electric dipole moment $\\vec p$', 'Magnetic moment $\\vec m = NI\\vec A$'], ['Torque $\\vec p \\times \\vec E$', 'Torque $\\vec m \\times \\vec B$'], ['Stable when $\\vec p \\parallel \\vec E$', 'Stable when $\\vec m \\parallel \\vec B$'], ['Far field $\\propto p/r^3$', 'Far field $\\propto m/r^3$']],
  order: [1, 3, 0, 2],
  sol: 'p ↔ m = NIA (1 → q); p × E ↔ m × B (2 → s); stable alignment (3 → p); far field ∝ 1/r³ (4 → r).',
  d: 2, c: 'understanding', t: [5],
}));
add('torque-short', short({
  marks: 3,
  stem: 'Derive an expression for the torque on a rectangular coil of $N$ turns, sides $a$ and $b$, carrying current $I$ in a uniform field $B$, when the normal to the coil makes angle $\\theta$ with the field.',
  model: r`Let the sides of length $b$ be perpendicular to $\vec B$ (the rotation axis is parallel to them). On each such side the force is $NIbB$, equal and opposite on the two sides. The forces on the other two sides are equal, opposite and along the same line (they cancel without torque). The two forces $NIbB$ act along parallel lines separated by $a\sin\theta$, forming a couple: $\tau = NIbB \times a\sin\theta = NIAB\sin\theta$ with $A = ab$. In vector form $\vec\tau = \vec m \times \vec B$, $\vec m = NI\vec A$.`,
  sol: 'Find the couple formed by the forces on the two sides perpendicular to B.',
  scheme: [['Forces NIbB on the two sides, net force zero', 1], ['Arm a sin θ', 1], ['τ = NIAB sin θ (vector form)', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));

// ================================================================ t06 galvanometer
add('ammeterR-mcq', mcq({
  stem: 'Which statement about an ideal ammeter is correct?',
  right: 'It has zero resistance and is connected in series',
  wrong: ['It has infinite resistance and is connected in series', 'It has zero resistance and is connected in parallel', 'It has infinite resistance and is connected in parallel'],
  sol: 'In series, a zero-resistance ammeter does not change the current it measures — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('radial-mcq', mcq({
  stem: 'The pole pieces of a moving coil galvanometer are made concave and a soft-iron core is placed inside the coil so that',
  right: 'the field is radial, making the deflection proportional to the current',
  wrong: ['the field is uniform and parallel to the coil’s normal', 'the coil’s resistance is reduced', 'the spring constant is increased'],
  sol: 'In a radial field the plane of the coil is always along $\\vec B$, so the torque is $NIAB$ at every deflection and $\\phi \\propto I$ — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
const sh = { G: 100, Ig: 1e-3, I: 0.1 };
sh.S = (sh.Ig * sh.G) / (sh.I - sh.Ig);
add('shunt-num', num({
  stem: 'A galvanometer of resistance 100 Ω gives full-scale deflection for 1.0 mA. Find the shunt needed to make it an ammeter of range 0–0.10 A, in ohms (3 significant figures).',
  value: Number(dec(sh.S, 3)), tol: 0.01, unit: 'Ω',
  sol: r`$S = \dfrac{I_gG}{I - I_g} = \dfrac{0.0010 \times 100}{0.10 - 0.0010} = \dfrac{0.1}{0.099} \approx ${dec(sh.S, 3)}$ Ω, in parallel.`,
  scheme: [['S = I_gG/(I − I_g)', 1], ['S ≈ 1.01 Ω in parallel', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(sh.S, q.answer.value) || 'S');
const vs = { G: 20, Ig: 5e-3, V: 15 };
vs.R = vs.V / vs.Ig - vs.G;
add('series-num', num({
  stem: 'A galvanometer of resistance 20 Ω gives full-scale deflection for 5.0 mA. Find the resistance to be connected in series to make it a voltmeter of range 0–15 V, in ohms.',
  value: vs.R, tol: 1, unit: 'Ω',
  sol: r`$R = \dfrac{V}{I_g} - G = \dfrac{15}{0.0050} - 20 = 3000 - 20 = ${vs.R}$ Ω.`,
  scheme: [['Total resistance 3000 Ω', 1], ['R = 2980 Ω in series', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => near(vs.R, q.answer.value) || 'R');
add('turns-mcq', mcq({
  stem: 'A galvanometer coil is rewound with twice as many turns of the same wire (so its resistance also doubles), everything else unchanged. Its current sensitivity and voltage sensitivity become',
  right: 'doubled and unchanged',
  wrong: ['doubled and doubled', 'unchanged and halved', 'halved and unchanged'],
  sol: r`Current sensitivity $NAB/k$ doubles with $N$. Voltage sensitivity $NAB/(kG)$: both $N$ and $G$ double, so it is unchanged — option (@K).`,
  d: 4, c: 'analysis', t: [6],
}));
add('shunt-ar', ar({
  a: 'To increase the range of an ammeter, a larger shunt resistance must be used.',
  r: 'In an ammeter, the shunt carries most of the current.',
  key: 'd',
  sol: 'R is true. A is false: a larger range needs a **smaller** shunt, $S = I_gG/(I - I_g)$, so that more current bypasses the coil — option (d).',
  d: 3, c: 'application', t: [6],
}));
add('core-short', short({
  marks: 2,
  stem: 'Why does a moving coil galvanometer use a soft-iron core inside the coil? Give two reasons.',
  model: 'The soft-iron core (with concave pole pieces) makes the field **radial**, so the torque is $NIAB$ at every angle and the scale is **linear**. It also **concentrates** the field lines, increasing $B$ and so the **sensitivity** of the galvanometer.',
  sol: 'Radial field and stronger field.',
  scheme: [['Makes the field radial: linear scale', 1], ['Increases B: higher sensitivity', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('volt-short', short({
  marks: 2,
  stem: 'A student connects a voltmeter of resistance 500 Ω across a 10 kΩ resistor to measure its voltage. Evaluate this choice of meter.',
  model: 'Poor choice. The 500 Ω meter in **parallel** with 10 kΩ makes a combination of only about **476 Ω**, so it draws a large current and **changes** the voltage it is meant to measure. A voltmeter should have a resistance **much larger** than the resistor (say ≥ 1 MΩ) so that it draws negligible current.',
  sol: 'Compare the meter resistance with the resistance it is connected across.',
  scheme: [['Parallel combination ≈ 476 Ω: reading disturbed', 1], ['Voltmeter must have very high resistance', 1]],
  d: 3, c: 'evaluation', t: [6],
}), () => near(1 / (1 / 500 + 1 / 10000), 476.2, 0.001) || 'par');
const gm = { G: 60, Ig: 2e-3 };
gm.S = (gm.Ig * gm.G) / (3 - gm.Ig);
gm.R = 6 / gm.Ig - gm.G;
add('meter-short', short({
  marks: 3,
  stem: 'A galvanometer has resistance 60 Ω and full-scale current 2.0 mA. Show how to convert it into (a) an ammeter of range 0–3.0 A and (b) a voltmeter of range 0–6.0 V, finding the resistance needed in each case and how it is connected.',
  model: r`(a) Shunt in **parallel**: $S = \dfrac{I_gG}{I - I_g} = \dfrac{0.0020 \times 60}{3.0 - 0.0020} \approx ${dec(gm.S, 3)}$ Ω (about 0.04 Ω).
(b) Resistance in **series**: $R = \dfrac{V}{I_g} - G = \dfrac{6.0}{0.0020} - 60 = ${gm.R}$ Ω.
The ammeter then has a very small total resistance; the voltmeter a large one (3000 Ω).`,
  sol: 'Shunt for the ammeter, series resistance for the voltmeter.',
  scheme: [['Shunt S ≈ 0.040 Ω in parallel', 1], ['Series R = 2940 Ω', 1], ['Correct connections stated', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(gm.S, 0.04003, 0.001) && near(gm.R, 2940) || 'gm');

// ================================================================ long answers (5 marks)
const ll = { N: 1, I: 5, R: 0.1 };
ll.B0 = (MU0 * ll.I) / (2 * ll.R);
add('loop-long', long({
  stem: '(a) State the Biot–Savart law in vector form. (b) Use it to derive the magnetic field at a point on the axis of a circular loop of radius $R$ carrying current $I$, at a distance $x$ from its centre. (c) Find the field at the centre of a single loop of radius 10 cm carrying 5.0 A.',
  model: r`(a) $d\vec B = \dfrac{\mu_0}{4\pi}\dfrac{I\,d\vec l \times \hat r}{r^2}$, where $\hat r$ points from the element to the point.

(b) Every element $d\vec l$ of the loop is at distance $r = \sqrt{R^2 + x^2}$ from P and perpendicular to $\vec r$, so $dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl}{R^2 + x^2}$, directed perpendicular to $\vec r$. Resolve it into a component along the axis, $dB\cos\alpha$, and one perpendicular to it. For diametrically opposite elements the perpendicular components cancel. With $\cos\alpha = \dfrac{R}{\sqrt{R^2 + x^2}}$:
$$B = \oint \dfrac{\mu_0}{4\pi}\dfrac{I\,dl}{R^2 + x^2}\cdot\dfrac{R}{\sqrt{R^2 + x^2}} = \dfrac{\mu_0 I R}{4\pi (R^2 + x^2)^{3/2}}\cdot 2\pi R = \dfrac{\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$$
along the axis (right-hand rule).

(c) At the centre $x = 0$: $B = \dfrac{\mu_0 I}{2R} = \dfrac{4\pi \times 10^{-7} \times 5.0}{2 \times 0.10} \approx ${sci(ll.B0, 3)}$ T.`,
  sol: 'Equal-size contributions from every element; perpendicular parts cancel; integrate dl round the loop.',
  scheme: [['Biot–Savart law in vector form', 1], ['dB for an element and its direction', 1], ['Cancellation of perpendicular components', 1], ['B = μ₀IR²/2(R² + x²)^{3/2}', 1], ['B at centre ≈ 3.14 × 10⁻⁵ T', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => near(ll.B0, 3.1416e-5, 0.001) || 'B0');
const lp = { I1: 4, I2: 6, d: 0.03 };
lp.f = (2e-7 * lp.I1 * lp.I2) / lp.d;
add('parallel-long', long({
  stem: '(a) Derive an expression for the force per unit length between two long straight parallel wires carrying currents $I_1$ and $I_2$, a distance $d$ apart. (b) Show that like currents attract. (c) Use the result to define the ampere. (d) Find the force on 2.0 m of either wire when $I_1 = 4.0$ A, $I_2 = 6.0$ A and $d = 3.0$ cm.',
  model: r`(a) By Ampere’s law, wire 1 produces at wire 2 a field $B_1 = \dfrac{\mu_0 I_1}{2\pi d}$, perpendicular to wire 2. The force on a length $L$ of wire 2 is $F = I_2 L B_1$, so $\dfrac{F}{L} = \dfrac{\mu_0 I_1 I_2}{2\pi d}$. By symmetry wire 1 feels an equal and opposite force.

(b) Let both currents point up the page with wire 2 to the right of wire 1. The right-hand rule gives $\vec B_1$ at wire 2 into the page. $I_2\vec L \times \vec B_1$ (up × into) points to the left, towards wire 1: **attraction**.

(c) **One ampere** is the current in each of two long parallel wires 1 m apart in vacuum that gives a force of $2 \times 10^{-7}$ N per metre.

(d) $\dfrac{F}{L} = \dfrac{2 \times 10^{-7} \times 4.0 \times 6.0}{0.030} = ${sci(lp.f, 2)}$ N m$^{-1}$, so on 2.0 m: $F = ${sci(lp.f * 2, 2)}$ N (attractive if the currents are in the same direction).`,
  sol: 'Field of one wire at the other, then F = ILB.',
  scheme: [['Field B₁ = μ₀I₁/2πd at wire 2', 1], ['F/L = μ₀I₁I₂/2πd', 1], ['Direction: like currents attract', 1], ['Definition of the ampere', 1], ['F = 3.2 × 10⁻⁴ N on 2.0 m', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => { const B1 = cross([0, -1, 0], [1, 0, 0]); const F = cross([0, -1, 0], B1); return (near(lp.f * 2, 3.2e-4) && F[0] < 0) || 'par'; });
const lg = { N: 30, A: 1.5e-3, B: 0.2, k: 3e-8 };
lg.Si = (lg.N * lg.A * lg.B) / lg.k;
add('galv-long', long({
  stem: '(a) Explain the principle and working of a moving coil galvanometer, including the role of the radial field. (b) Define current sensitivity and show that it equals $NAB/k$. (c) A galvanometer coil has 30 turns of area 1.5 × 10⁻³ m² in a radial field of 0.20 T, and the spring constant is 3.0 × 10⁻⁸ N m rad⁻¹. Find the deflection for a current of 1.0 μA.',
  model: r`(a) **Principle:** a current-carrying coil in a magnetic field feels a torque. The coil, wound on a soft-iron core, hangs between concave pole pieces, so the field is **radial**: the plane of the coil is always along $\vec B$ and the deflecting torque is $NIAB$ at every angle. A spring provides a restoring torque $k\phi$. The coil turns until $NIAB = k\phi$, so $\phi = \dfrac{NAB}{k}I$: the deflection is proportional to the current and the scale is linear.

(b) **Current sensitivity** is the deflection per unit current, $\dfrac{\phi}{I} = \dfrac{NAB}{k}$, from the equilibrium condition.

(c) $\dfrac{\phi}{I} = \dfrac{30 \times 1.5 \times 10^{-3} \times 0.20}{3.0 \times 10^{-8}} = ${sci(lg.Si, 2)}$ rad A$^{-1}$, so for 1.0 μA: $\phi = ${dec(lg.Si * 1e-6, 2)}$ rad (about ${Math.round((lg.Si * 1e-6 * 180) / Math.PI)}°).`,
  sol: 'Balance NIAB with kφ.',
  scheme: [['Principle: torque on a coil', 1], ['Radial field: torque NIAB at all angles', 1], ['φ = (NAB/k)I, linear scale', 1], ['Current sensitivity NAB/k', 1], ['φ = 0.30 rad for 1.0 μA', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}), () => near(lg.Si * 1e-6, 0.3) || `phi ${lg.Si * 1e-6}`);
const lm = { E: 1.0e4, B1: 0.025, B2: 0.10, m: 9.1e-31 };
lm.v = lm.E / lm.B1;
lm.r = (lm.m * lm.v) / (QE * lm.B2);
add('motion-long', long({
  stem: '(a) Write the Lorentz force on a charge $q$ moving with velocity $\\vec v$ in fields $\\vec E$ and $\\vec B$, and show that a magnetic field does no work on the charge. (b) Electrons pass undeflected through crossed fields $E = 1.0 \\times 10^{4}$ V m$^{-1}$ and $B = 0.025$ T. Find their speed. (c) They then enter a region with only a magnetic field of 0.10 T, perpendicular to their velocity. Find the radius of their path. (mₑ = 9.1 × 10⁻³¹ kg)',
  model: r`(a) $\vec F = q(\vec E + \vec v \times \vec B)$. The magnetic part is perpendicular to $\vec v$, so its power $\vec F\cdot\vec v = q(\vec v \times \vec B)\cdot\vec v = 0$: it does no work and the speed does not change.

(b) Undeflected: $qE = qvB$, so $v = \dfrac{E}{B} = \dfrac{1.0 \times 10^{4}}{0.025} = ${sci(lm.v, 2)}$ m s$^{-1}$.

(c) $r = \dfrac{mv}{qB} = \dfrac{9.1 \times 10^{-31} \times 4.0 \times 10^{5}}{1.6 \times 10^{-19} \times 0.10} = ${sci(lm.r, 3)}$ m (about 23 μm).`,
  sol: 'F·v = 0 for the magnetic part; v = E/B; r = mv/qB.',
  scheme: [['Lorentz force', 1], ['No work: force ⟂ velocity', 1], ['v = E/B = 4.0 × 10⁵ m s⁻¹', 1], ['r = mv/qB set up', 1], ['r ≈ 2.3 × 10⁻⁵ m', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(lm.v, 4e5) && near(lm.r, 2.275e-5, 0.002) || `lm ${lm.r}`);
const lt = { N: 40, a: 0.06, b: 0.04, I: 0.8, B: 0.5 };
lt.m = lt.N * lt.I * lt.a * lt.b;
lt.t60 = lt.m * lt.B * Math.sin(Math.PI / 3);
add('torque-long', long({
  stem: '(a) Show that a current loop in a uniform field experiences no net force but a torque $\\vec\\tau = \\vec m \\times \\vec B$. (b) A rectangular coil of 40 turns, 6.0 cm × 4.0 cm, carries 0.80 A in a field of 0.50 T. Find its magnetic moment and the torque when its normal makes $60^\\circ$ with the field. (c) In which orientation is the coil in stable equilibrium?',
  model: r`(a) For a rectangular coil, the forces on opposite sides are equal and opposite: those on the sides parallel to the rotation axis ($NIbB$ each) act along parallel lines a distance $a\sin\theta$ apart, and those on the other two sides act along one line. The net force is zero, but the first pair forms a couple: $\tau = NIbB\,a\sin\theta = NIAB\sin\theta$, i.e. $\vec\tau = \vec m \times \vec B$ with $\vec m = NI\vec A$.

(b) $m = NIA = 40 \times 0.80 \times 0.060 \times 0.040 = ${dec(lt.m, 3)}$ A m². $\tau = mB\sin 60^\circ = 0.0768 \times 0.50 \times 0.866 \approx ${dec(lt.t60, 3)}$ N m.

(c) **Stable** when $\vec m$ is along $\vec B$ (plane of the coil perpendicular to the field): the torque is zero and a small twist produces a torque that restores it.`,
  sol: 'Couple from the two sides; then m = NIA and τ = mB sin θ.',
  scheme: [['Net force zero', 1], ['Couple and τ = NIAB sin θ', 1], ['m = 0.0768 A m²', 1], ['τ ≈ 0.0333 N m', 1], ['Stable when m is along B', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(lt.m, 0.0768) && near(lt.t60, 0.03326, 0.002) || `lt ${lt.t60}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const ms = { v: 2e5, B: 0.5 };
ms.r20 = (20 * U * ms.v) / (QE * ms.B);
ms.r22 = (22 * U * ms.v) / (QE * ms.B);
add('spectro-case', mk.case({
  passage: `In a mass spectrometer at a research laboratory in Mumbai, singly charged neon ions first pass through a velocity selector, so that all of them move at 2.0 × 10⁵ m s⁻¹. They then enter a region with a uniform magnetic field of 0.50 T perpendicular to their velocity, travel round a semicircle and strike a detector plate. Natural neon contains mainly neon-20 (mass 20 u) with some neon-22 (mass 22 u). Take 1 u = 1.66 × 10⁻²⁷ kg.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which ions travel on the larger semicircle?',
      right: 'Neon-22, because r is proportional to the mass at fixed speed and charge',
      wrong: ['Neon-20, because lighter ions are deflected less', 'Both, because they have the same charge', 'Neither: the field does no work, so they go straight'],
      sol: '$r = mv/qB$ with the same $v$, $q$ and $B$, so the heavier ion has the larger radius — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'Find the radius of the path of the neon-20 ions, in centimetres.',
      value: Number(dec(ms.r20 * 100, 3)), tol: 0.05, unit: 'cm',
      sol: r`$r = \dfrac{mv}{qB} = \dfrac{20 \times 1.66 \times 10^{-27} \times 2.0 \times 10^{5}}{1.6 \times 10^{-19} \times 0.50} = ${dec(ms.r20, 3)}$ m. In cm: $${dec(ms.r20, 3)} \times 100 = ${dec(ms.r20 * 100, 3)}$.`,
      scheme: [['r = mv/qB ≈ 8.30 cm', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find how far apart the two isotopes land on the detector plate.',
      model: r`The ions land one diameter from the entry slit. $r_{22} = \dfrac{22}{20}r_{20} = ${dec(ms.r22 * 100, 3)}$ cm, so the separation is $2(r_{22} - r_{20}) = 2 \times (${dec(ms.r22 * 100, 3)} - ${dec(ms.r20 * 100, 3)}) \approx ${dec(2 * (ms.r22 - ms.r20) * 100, 2)}$ cm.`,
      sol: 'Landing point is one diameter from the slit.',
      scheme: [['r for neon-22 ≈ 9.13 cm', 1], ['Separation 2Δr ≈ 1.7 cm', 1]],
      d: 3, c: 'application', t: [1], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Explain why the velocity selector is needed before the magnetic field region.',
        model: 'The radius $r = mv/qB$ depends on **speed** as well as mass. If ions of the same isotope entered with different speeds they would land at different places, smearing the lines and mixing up the isotopes. Selecting **one speed** makes the radius depend on **mass alone**.',
        sol: 'r depends on both m and v.',
        scheme: [['r depends on v as well as m', 1], ['Fixed v makes r depend on mass only', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), (q) => near(ms.r20, 0.083) && near(q.children[1].answer.value, 8.3) || 'spectro');

const pl = { I: 200, h: 10, BE: 5e-5 };
pl.B = (2e-7 * pl.I) / pl.h;
add('cable-case', mk.case({
  passage: 'A high-voltage direct-current (HVDC) line near Chandrapur carries a steady current of 200 A in a straight cable 10 m above the ground. A resident worries that the magnetic field of the cable is harmful and that it will upset her son’s compass. The Earth’s magnetic field in the region is about 5 × 10⁻⁵ T.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The magnetic field lines of the cable are',
      right: 'circles centred on the cable, in planes perpendicular to it',
      wrong: ['straight lines parallel to the cable', 'straight lines radiating from the cable', 'circles in planes containing the cable'],
      sol: 'A long straight current produces circular field lines round it (right-hand thumb rule) — option (@K).',
      d: 1, c: 'recall', t: [3],
    })),
    part('b', num({
      stem: 'Find the field of the cable at ground level directly below it, in microtesla.',
      value: Number(dec(pl.B * 1e6, 2)), tol: 0.05, unit: 'μT',
      sol: r`$B = \dfrac{\mu_0 I}{2\pi r} = \dfrac{2 \times 10^{-7} \times 200}{10} = ${sci(pl.B, 2)}$ T. In μT: $${sci(pl.B, 2)} \times 10^{6} = ${dec(pl.B * 1e6, 2)}$.`,
      scheme: [['B = 4.0 μT', 1]],
      d: 2, c: 'understanding', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare this field with the Earth’s field and comment on the resident’s worries.',
      model: r`$\dfrac{4.0 \times 10^{-6}}{5 \times 10^{-5}} = 0.08$: the cable’s field is only about **8%** of the Earth’s field, which everyone lives in all the time. It is not a health concern at this level, and a compass would deflect only slightly (a few degrees) directly under the cable.`,
      sol: 'Compare with the Earth’s field.',
      scheme: [['Ratio ≈ 0.08 of Earth’s field', 1], ['Conclusion: small effect on compass, not a concern', 1]],
      d: 3, c: 'evaluation', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Explain why the effect on a compass would be even smaller for an AC line carrying the same current.',
        model: 'With AC the current reverses **100 times a second** (50 Hz), so the cable’s field also reverses. A compass needle has too much inertia to follow such rapid reversals; it responds to the **average**, which is zero, so it simply points along the Earth’s field.',
        sol: 'The field reverses too fast for the needle.',
        scheme: [['AC field reverses rapidly (average zero)', 1], ['Needle cannot follow; no steady deflection', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => near(pl.B, 4e-6) && near(q.children[1].answer.value, 4) || 'cable');

const lev = { m: 0.02, g: 9.8, l: 0.4, B: 0.5 };
lev.I = (lev.m * lev.g) / (lev.l * lev.B);
add('balance-case', mk.case({
  passage: 'In a physics club demonstration, a straight copper rod of mass 20 g and length 40 cm rests on two horizontal metal rails connected to a power supply. A uniform horizontal magnetic field of 0.50 T acts at right angles to the rod. When the current is switched on, the rod can be made to rise off the rails. Take g = 9.8 m s⁻².',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'For the magnetic force on the rod to be vertically upwards, the current must be',
      right: 'perpendicular to the field and in the direction given by I l × B pointing up',
      wrong: ['parallel to the field', 'in any direction, since only its size matters', 'vertical'],
      sol: 'The force $I\\vec l \\times \\vec B$ must point up, so the current must be horizontal, perpendicular to $\\vec B$, with the sense fixed by the right-hand rule — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', num({
      stem: 'Find the smallest current that makes the rod just rise, in amperes.',
      value: Number(dec(lev.I, 2)), tol: 0.02, unit: 'A',
      sol: r`$IlB = mg$: $I = \dfrac{mg}{lB} = \dfrac{0.020 \times 9.8}{0.40 \times 0.50} = ${dec(lev.I, 2)}$ A.`,
      scheme: [['I = mg/lB ≈ 0.98 A', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'The current is reversed. Describe and explain what happens to the rod.',
      model: 'Reversing the current reverses $I\\vec l \\times \\vec B$, so the magnetic force points **downwards**. The rod is pressed harder onto the rails (normal force $mg + IlB$) and does **not** rise.',
      sol: 'Force reverses with current.',
      scheme: [['Force reverses (downwards)', 1], ['Rod pressed onto rails, does not rise', 1]],
      d: 2, c: 'understanding', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A student suggests turning the field so that it is parallel to the rod, to make lifting easier. Evaluate the suggestion.',
        model: 'It would **not work**. With $\\vec B$ parallel to the rod (and so to the current), $F = IlB\\sin 0^\\circ = 0$: there is no magnetic force at all. The force is largest when the field is **perpendicular** to the rod, as in the original set-up.',
        sol: 'F = IlB sin θ with θ = 0.',
        scheme: [['Parallel field gives zero force', 1], ['Perpendicular arrangement is best', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(lev.I, 0.98) && near(q.children[1].answer.value, 0.98) || 'lev');

const cv = { G: 40, Ig: 5e-3, I: 2 };
cv.S = (cv.Ig * cv.G) / (cv.I - cv.Ig);
add('lab-case', mk.case({
  passage: 'For a school laboratory in Kochi, students are given a galvanometer marked “40 Ω, full scale 5.0 mA”. They need an ammeter reading up to 2.0 A for an experiment on resistors, and they have a reel of thick copper wire to make the shunt.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How should the shunt be connected?',
      right: 'In parallel with the galvanometer',
      wrong: ['In series with the galvanometer', 'Across the battery', 'In series with the resistor under test, away from the galvanometer'],
      sol: 'The shunt must carry most of the current alongside the coil: it goes in parallel — option (@K).',
      d: 1, c: 'understanding', t: [6],
    })),
    part('b', num({
      stem: 'Find the resistance of the shunt needed, in ohms (3 significant figures).',
      value: Number(dec(cv.S, 3)), tol: 0.002, unit: 'Ω',
      sol: r`$S = \dfrac{I_gG}{I - I_g} = \dfrac{0.0050 \times 40}{2.0 - 0.0050} \approx ${dec(cv.S, 3)}$ Ω.`,
      scheme: [['S ≈ 0.100 Ω', 1]],
      d: 2, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the finished ammeter has a very small resistance, and why that is desirable.',
      model: r`The ammeter is the shunt (about 0.1 Ω) in parallel with 40 Ω, so its resistance is just under **0.1 Ω**. It is connected in **series**, so a small resistance hardly changes the current in the circuit it is measuring.`,
      sol: 'Parallel combination dominated by the shunt; series connection.',
      scheme: [['Resistance ≈ 0.1 Ω (parallel with small shunt)', 1], ['In series, so it barely changes the current', 1]],
      d: 2, c: 'understanding', t: [6], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'The students’ shunt turns out to be 0.12 Ω instead of 0.100 Ω. Predict whether the ammeter will read too high or too low, and explain.',
        model: 'With a **larger** shunt, a **larger fraction** of the current passes through the galvanometer coil. So for a true current of 2.0 A the coil current exceeds 5.0 mA: the meter reads **too high** (it goes off scale before 2.0 A).',
        sol: 'Larger shunt sends more current through the coil.',
        scheme: [['More current through the coil', 1], ['Reads too high', 1]],
        d: 4, c: 'analysis', t: [6],
      }),
    ]),
  ],
}), (q) => near(cv.S, 0.10025, 0.001) && near(q.children[1].answer.value, 0.1) || 'lab');

await import('./questions-extra.mjs');
