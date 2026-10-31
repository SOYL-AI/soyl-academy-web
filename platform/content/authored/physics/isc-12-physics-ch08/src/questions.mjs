// ISC 12 Physics ch08 Torque on a Current Loop and the Moving Coil Galvanometer — question bank (ISC style).
// Numbers computed and re-checked.
import { mk, add, r, sci, dec, near, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';
import { H } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const MU0 = 4 * Math.PI * 1e-7;
const rad = (d) => (d * Math.PI) / 180;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const MUB = (QE * H) / (4 * Math.PI * ME);

// ================================================================ t01 torque on a coil; magnetic moment
add('shape-tf', tf({
  stem: 'A flat coil carrying a current in a uniform magnetic field experiences a torque NIAB sin θ whatever its shape, A being the area the coil encloses.',
  key: 't',
  sol: 'True. The torque depends only on the magnetic moment NIA (and the angle), so circular, square or irregular flat coils of the same area behave alike.',
  d: 2, c: 'understanding', t: [1],
}));
add('maxangle-mcq', mcq({
  stem: 'A rectangular coil carrying a steady current hangs in a uniform magnetic field and can turn about a vertical axis perpendicular to the field. The torque on it is greatest when the angle between the field and the plane of the coil is',
  right: '0°',
  wrong: ['30°', '60°', '90°'],
  sol: 'With the plane along the field, the normal is perpendicular to B, so θ = 90° and sin θ = 1: the torque NIAB is the largest — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const t60 = { N: 30, l: 0.08, b: 0.05, I: 1.2, B: 0.25, plane: 30 };
t60.m = t60.N * t60.I * t60.l * t60.b;
t60.th = 90 - t60.plane;
t60.tau = t60.m * t60.B * Math.sin(rad(t60.th));
add('torque60-num', num({
  stem: 'A rectangular coil of 30 turns, 8.0 cm × 5.0 cm, carries 1.2 A in a uniform field of 0.25 T. The plane of the coil makes 30° with the field. Find the torque on the coil, in units of 10⁻² N m (3 significant figures).',
  value: Number(dec(t60.tau * 100, 3)), tol: 0.02, unit: '× 10⁻² N m',
  sol: r`The normal makes $\theta = 90^\circ - 30^\circ = 60^\circ$ with $\vec B$. $\tau = NIAB\sin\theta = 30 \times 1.2 \times (0.080 \times 0.050) \times 0.25 \times \sin 60^\circ \approx ${sci(t60.tau, 3)}$ N m, i.e. $${sci(t60.tau, 3)} \times 10^{2} = ${dec(t60.tau * 100, 3)}$.`,
  scheme: [['θ = 60° (angle with the normal)', 1], ['τ ≈ 3.12 × 10⁻² N m', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(t60.tau, 0.031177, 0.001) && near(q.answer.value, 3.12) || `t60 ${t60.tau}`);
const cm = { N: 250, D: 0.06, I: 0.08 };
cm.m = cm.N * cm.I * Math.PI * (cm.D / 2) ** 2;
add('circm-num', num({
  stem: 'A flat circular coil of 250 turns and diameter 6.0 cm carries a current of 80 mA. Find its magnetic moment, in units of 10⁻² A m² (3 significant figures).',
  value: Number(dec(cm.m * 100, 3)), tol: 0.02, unit: '× 10⁻² A m²',
  sol: r`Radius $= 0.030$ m. $m = NI\pi R^2 = 250 \times 0.080 \times \pi \times (0.030)^2 \approx ${sci(cm.m, 3)}$ A m², i.e. $${sci(cm.m, 3)} \times 10^{2} = ${dec(cm.m * 100, 3)}$.`,
  scheme: [['m = NIπR² with R = 3.0 cm: 5.65 × 10⁻² A m²', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(cm.m, 0.056549, 0.001) || 'cm');
const bf = { m: 0.45, tmax: 0.054 };
bf.B = bf.tmax / bf.m;
add('Bfind-num', num({
  stem: 'A coil of magnetic moment 0.45 A m² experiences a largest possible torque of 0.054 N m in a uniform magnetic field. Find the magnetic field, in tesla.',
  value: Number(dec(bf.B, 2)), tol: 0.002, unit: 'T',
  sol: r`The largest torque is $mB$, so $B = \dfrac{\tau_\text{max}}{m} = \dfrac{0.054}{0.45} = ${dec(bf.B, 2)}$ T.`,
  scheme: [['B = τmax/m = 0.12 T', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(bf.B, 0.12) || 'bf');
const an = { N: 60, A: 40e-4, I: 0.5, B: 0.3, tau: 0.0216 };
an.m = an.N * an.I * an.A;
an.s = an.tau / (an.m * an.B);
an.th = (Math.asin(an.s) * 180) / Math.PI;
add('angle-num', num({
  stem: 'A coil of 60 turns, each of area 40 cm², carries 0.50 A in a uniform field of 0.30 T and experiences a torque of 0.0216 N m. Find the angle between the normal to the coil and the field, in degrees (to the nearest degree).',
  value: Math.round(an.th), tol: 0.6, unit: '°',
  sol: r`$m = NIA = 60 \times 0.50 \times 40 \times 10^{-4} = ${dec(an.m, 2)}$ A m², so $mB = 0.12 \times 0.30 = ${dec(an.m * an.B, 2)}$ N m. $\sin\theta = \dfrac{0.0216}{0.036} = ${dec(an.s, 2)}$, so $\theta = ${dec(an.th, 3)}$ degrees, i.e. ${Math.round(an.th)} degrees to the nearest degree (the plane of the coil is then at about 53 degrees to the field).`,
  scheme: [['m = 0.12 A m², sin θ = 0.60', 1], ['θ ≈ 37°', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(an.s, 0.6) && q.answer.value === 37 || 'an');
add('righthand-mcq', mcq({
  stem: 'A flat circular coil lies on a horizontal table. Seen from above, the current in it flows clockwise. Its magnetic moment points',
  right: 'vertically downwards, into the table',
  wrong: ['vertically upwards, away from the table', 'horizontally, along a diameter of the coil', 'along the wire, in the direction of the current'],
  sol: 'Curl the fingers of the right hand clockwise as seen from above: the thumb points down, into the table — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => {
  // clockwise as seen from above (viewer on +z, x east, y north): current at (1,0) flows towards −y
  const m = cross([1, 0, 0], [0, -1, 0]);
  return m[2] < 0 || 'rh';
});
add('stable-ar', ar({
  a: 'A current-carrying coil that is free to turn in a uniform magnetic field comes to rest with its magnetic moment pointing along the field.',
  r: 'The torque m × B always acts to turn the magnetic moment of the coil towards the direction of the field.',
  key: 'a',
  sol: 'Both true, and R explains A: the torque swings m towards B, and the only stable position is m along B, where the torque is zero — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('netforce-short', short({
  marks: 2,
  stem: 'Show that a rectangular current-carrying coil placed in a uniform magnetic field experiences no net force, although it may experience a torque.',
  model: 'Opposite sides of the coil have **equal lengths** and carry the current in **opposite directions**, so in a uniform field the forces on them are **equal and opposite**: the four forces add to **zero**. The forces on the two sides parallel to the axis act along **different lines**, so they form a **couple**, which turns the coil.',
  sol: 'Equal and opposite forces; couple from non-collinear pair.',
  scheme: [['Forces on opposite sides equal and opposite: net force zero', 1], ['One pair not collinear: a couple (torque)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('torquederive-short3', short({
  marks: 3,
  stem: 'A rectangular coil of N turns has sides of length l, parallel to its axis of rotation, and b. It carries current I in a uniform field B perpendicular to the axis, its normal making angle θ with B. Starting from the force on each side, derive the torque on the coil and write it in vector form.',
  model: r`The sides of length $l$ stay perpendicular to $\vec B$; each feels $F = NIlB$, the two forces being equal, opposite and parallel. The sides of length $b$ feel equal and opposite forces along the axis, which cancel and give no torque. The perpendicular distance between the lines of the two forces $NIlB$ is $b\sin\theta$, so they form a couple of moment $\tau = NIlB \cdot b\sin\theta = NIAB\sin\theta$, with $A = lb$. With $\vec m = NI\vec A$ along the right-hand normal, $\vec\tau = \vec m \times \vec B$.`,
  sol: 'Couple of the two forces NIlB with arm b sin θ.',
  scheme: [['F = NIlB on the sides of length l; other pair cancels', 1], ['Arm b sin θ', 1], ['τ = NIAB sin θ and τ = m × B', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('twoturn-mcq', mcq({
  stem: 'A fixed length of wire carrying a current I is bent into a flat circular coil of one turn. It is then rewound into a flat circular coil of two turns, with the same current. Compared with the one-turn coil, the magnetic moment of the two-turn coil is',
  right: 'half as large',
  wrong: ['twice as large', 'the same', 'one quarter as large'],
  sol: r`With length $L$ and $n$ turns, the radius is $L/2\pi n$, so $m = nI\pi\left(\dfrac{L}{2\pi n}\right)^2 = \dfrac{IL^2}{4\pi n}$. Doubling $n$ halves $m$: the area falls to a quarter while the turns only double — option (@K).`,
  d: 4, c: 'analysis', t: [1],
}), () => {
  const m = (n) => n * Math.PI * (1 / (2 * Math.PI * n)) ** 2;
  return near(m(2) / m(1), 0.5) || 'two';
});
const sq = { a: 0.1, I: 4, B: 0.15 };
sq.t = sq.I * sq.a ** 2 * sq.B;
add('square-num', num({
  stem: 'A single square loop of side 10 cm carries 4.0 A in a uniform field of 0.15 T. Find the largest torque it can experience, in mN m.',
  value: Number(dec(sq.t * 1000, 2)), tol: 0.05, unit: 'mN m',
  sol: r`$\tau_\text{max} = IAB = 4.0 \times (0.10)^2 \times 0.15 = ${sci(sq.t, 2)}$ N m, i.e. $${sci(sq.t, 2)} \times 10^{3} = ${dec(sq.t * 1000, 2)}$ mN m, when the plane of the loop is along the field.`,
  scheme: [['τmax = IAB = 6.0 mN m', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(sq.t, 0.006) || 'sq');
add('unstable-mcq', mcq({
  stem: 'A current loop in a uniform magnetic field is balanced with its magnetic moment pointing exactly opposite to the field. It is turned through a small angle and released. It',
  right: 'turns further away and swings round towards the position with m along B',
  wrong: ['returns to its original position, because the torque now opposes the displacement', 'stays at its new angle, because the torque is still zero there', 'moves bodily along the field, because a net force now acts on it'],
  sol: 'At θ = 180° the torque is zero, but for a small displacement $\\vec m \\times \\vec B$ turns m further from its starting direction, towards B: the equilibrium is unstable. A uniform field gives no net force — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('normal-fill', fill({
  stem: 'In τ = NIAB sin θ for a rectangular coil turning in a magnetic field, the angle θ is measured between the field and the ___ to the plane of the coil.',
  acc: [['normal', 'perpendicular']],
  sol: 'The **normal** to the plane of the coil (the direction of its magnetic moment).',
  d: 1, c: 'recall', t: [1],
}));
add('tauvec-mcq', mcq({
  stem: 'A flat coil lies in the xy-plane and its current circulates anticlockwise when viewed from the +z side. A uniform magnetic field points along +x. The torque on the coil points along',
  right: '+y',
  wrong: ['−y', '+z', '−x'],
  sol: r`By the right-hand rule $\vec m$ is along $+z$. $\vec\tau = \vec m \times \vec B \propto \hat z \times \hat x = \hat y$: the torque is along $+y$, turning $\vec m$ towards $+x$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => {
  const t = cross([0, 0, 1], [1, 0, 0]);
  return (t[0] === 0 && t[1] === 1 && t[2] === 0) || 'tv';
});
const inn = { N: 50, A: 0.03 * 0.02, B: 0.4, t: 1.2e-3 };
inn.I = inn.t / (inn.N * inn.A * inn.B);
add('Ineeded-num', num({
  stem: 'A rectangular coil of 50 turns, 3.0 cm × 2.0 cm, is placed in a uniform field of 0.40 T. What current must it carry so that the largest torque on it is 1.2 × 10⁻³ N m? Give the answer in amperes.',
  value: Number(dec(inn.I, 2)), tol: 0.002, unit: 'A',
  sol: r`$\tau_\text{max} = NIAB$, so $I = \dfrac{\tau_\text{max}}{NAB} = \dfrac{1.2 \times 10^{-3}}{50 \times 6.0 \times 10^{-4} \times 0.40} = \dfrac{1.2 \times 10^{-3}}{0.012} = ${dec(inn.I, 2)}$ A.`,
  scheme: [['NAB = 0.012 N m A⁻¹', 1], ['I = 0.10 A', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(inn.I, 0.1) || 'inn');
const tc = { N: 25, R: 0.04, I: 3, B: 0.05 };
tc.m = tc.N * tc.I * Math.PI * tc.R ** 2;
tc.t90 = tc.m * tc.B;
tc.t30 = tc.t90 * Math.sin(rad(30));
add('torque-short3', short({
  marks: 3,
  stem: 'A circular coil of 25 turns and radius 4.0 cm carries 3.0 A in a uniform field of 0.050 T. Find (a) its magnetic moment, (b) the torque on it when the plane of the coil is along the field, (c) the torque when the plane of the coil makes 60° with the field.',
  model: r`(a) $m = NI\pi R^2 = 25 \times 3.0 \times \pi \times (0.040)^2 \approx ${dec(tc.m, 3)}$ A m².
(b) Plane along $\vec B$: normal at $90^\circ$, $\tau = mB = ${dec(tc.m, 3)} \times 0.050 \approx ${sci(tc.t90, 3)}$ N m (the largest).
(c) Plane at $60^\circ$: normal at $\theta = 30^\circ$, $\tau = mB\sin 30^\circ \approx ${sci(tc.t30, 3)}$ N m.`,
  sol: 'm = NIπR²; τ = mB sin θ with θ from the normal.',
  scheme: [['m ≈ 0.377 A m²', 1], ['τ ≈ 1.88 × 10⁻² N m', 1], ['θ = 30°: τ ≈ 9.42 × 10⁻³ N m', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(tc.m, 0.37699, 0.001) && near(tc.t30, 0.0094248, 0.001) || 'tc');
add('lift-short', short({
  marks: 2,
  stem: 'A student proposes to lift a small iron weight by hanging it from a current-carrying coil placed in the uniform field between two large magnet poles, arguing that the field pushes on the coil. Evaluate the proposal.',
  model: 'It will **not work**. In a **uniform** field the forces on opposite sides of the coil are equal and opposite, so the **net force is zero**; the coil only feels a **torque** that turns it until its moment lies along the field. A net force needs a **non-uniform** field.',
  sol: 'No net force in a uniform field; only a torque.',
  scheme: [['Net force zero in a uniform field', 1], ['Only a torque that aligns m with B', 1]],
  d: 3, c: 'evaluation', t: [1],
}));

// ================================================================ t02 the loop as a magnetic dipole; the orbiting electron
add('northface-mcq', mcq({
  stem: 'Looking at one face of a flat circular loop, you see the current flowing anticlockwise. That face of the loop behaves like',
  right: 'the north pole of a magnet',
  wrong: ['the south pole of a magnet', 'a region where the field is zero', 'neither pole, since a single loop has no poles'],
  sol: 'By the right-hand rule the moment m points towards you; field lines emerge from the face that m points out of, as from a north pole — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('farfield-short', short({
  marks: 2,
  stem: r`The field on the axis of a circular loop of radius $R$ carrying current $I$, at distance $x$ from its centre, is $B = \dfrac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}$. Show that far from the loop $B \approx \dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3}$, and state what this shows about the loop.`,
  model: r`For $x \gg R$, $(R^2 + x^2)^{3/2} \approx x^3$, so $B \approx \dfrac{\mu_0IR^2}{2x^3} = \dfrac{\mu_0}{4\pi}\dfrac{2I(\pi R^2)}{x^3} = \dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3}$ with $m = I\pi R^2$. This has the same form as the axial field of an electric dipole, $\dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{x^3}$: the loop behaves as a **magnetic dipole** of moment m.`,
  sol: 'Neglect R² beside x²; write IπR² as m.',
  scheme: [['Approximation x ≫ R gives μ₀IR²/2x³', 1], ['= (μ₀/4π)(2m/x³): a magnetic dipole', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('farratio-mcq', mcq({
  stem: 'The magnetic field on the axis of a small current loop, far from it at a distance x, is B. At a distance 2x along the same axis, the field is',
  right: 'B/8',
  wrong: ['B/2', 'B/4', 'B/16'],
  sol: 'Far from a magnetic dipole the axial field varies as 1/x³; doubling x divides B by 2³ = 8 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const ax = { m: 0.5, x: 0.4 };
ax.B = (MU0 / (4 * Math.PI)) * ((2 * ax.m) / ax.x ** 3);
add('axisB-num', num({
  stem: 'A small coil of magnetic moment 0.50 A m² is treated as a magnetic dipole. Find the magnetic field on its axis at a distance of 40 cm from it, in μT (3 significant figures).',
  value: Number(dec(ax.B * 1e6, 3)), tol: 0.02, unit: 'μT',
  sol: r`$B = \dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3} = 10^{-7} \times \dfrac{2 \times 0.50}{(0.40)^3} = 10^{-7} \times \dfrac{1.0}{0.064} \approx ${sci(ax.B, 3)}$ T, i.e. $${sci(ax.B, 3)} \times 10^{6} = ${dec(ax.B * 1e6, 3)}$ μT.`,
  scheme: [['Dipole axial formula', 1], ['B ≈ 1.56 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(ax.B, 1.5625e-6) || 'ax');
add('analogy-ar', ar({
  a: 'A small current loop placed in a uniform magnetic field experiences no net force.',
  r: 'The magnetic forces on opposite sides of such a loop always act along the same line, so they cannot produce a torque either.',
  key: 'c',
  sol: 'A is true: the forces on opposite sides cancel in a uniform field. R is false: one pair of forces generally acts along different lines and forms a couple, so the loop feels a torque m × B, just as an electric dipole does in a uniform E — option (c).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('loopdipole-short', short({
  marks: 2,
  stem: 'Give two reasons why a small plane loop carrying a current is described as a magnetic dipole.',
  model: '(i) Far from the loop its field lines have the **same pattern** as those of a short bar magnet, emerging from one face (north) and entering the other (south), with an axial field $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$. (ii) In a **uniform field** it feels **no net force** but a **torque** $\\vec m \\times \\vec B$ that aligns m with B, exactly like a bar magnet.',
  sol: 'Dipole field pattern; torque without net force.',
  scheme: [['Field pattern of a dipole (1/x³, N and S faces)', 1], ['Torque m × B with no net force in uniform B', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const o2 = { v: 1.1e6, r: 2.1e-10 };
o2.I = (QE * o2.v) / (2 * Math.PI * o2.r);
o2.mu = (QE * o2.v * o2.r) / 2;
add('orbitI-num', num({
  stem: 'In the second Bohr orbit of hydrogen, the electron moves at about 1.1 × 10⁶ m s⁻¹ in a circle of radius 2.1 × 10⁻¹⁰ m. Find the equivalent current of the orbiting electron, in mA (3 significant figures).',
  value: Number(dec(o2.I * 1e3, 3)), tol: 0.002, unit: 'mA',
  sol: r`One charge $e$ passes any point of the orbit once per period: $I = \dfrac{ev}{2\pi r} = \dfrac{1.6 \times 10^{-19} \times 1.1 \times 10^{6}}{2\pi \times 2.1 \times 10^{-10}} \approx ${sci(o2.I, 3)}$ A, i.e. $${sci(o2.I, 3)} \times 10^{3} = ${dec(o2.I * 1e3, 3)}$ mA.`,
  scheme: [['I = ev/2πr', 1], ['I ≈ 0.133 mA', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(o2.I, 1.334e-4, 0.002) || 'o2I');
add('orbitm-num', num({
  stem: 'For the same electron (speed 1.1 × 10⁶ m s⁻¹, orbit radius 2.1 × 10⁻¹⁰ m), find the orbital magnetic moment, in units of 10⁻²³ A m² (3 significant figures).',
  value: Number(dec(o2.mu / 1e-23, 3)), tol: 0.02, unit: '× 10⁻²³ A m²',
  sol: r`$\mu = \dfrac{evr}{2} = \dfrac{1.6 \times 10^{-19} \times 1.1 \times 10^{6} \times 2.1 \times 10^{-10}}{2} \approx ${sci(o2.mu, 3)}$ A m², i.e. $\dfrac{${sci(o2.mu, 3)}}{10^{-23}} = ${dec(o2.mu / 1e-23, 3)}$ (about two Bohr magnetons, as expected for n = 2).`,
  scheme: [['μ = evr/2', 1], ['≈ 1.85 × 10⁻²³ A m²', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(o2.mu, 1.848e-23) && near(o2.mu / MUB, 2, 0.01) || 'o2m');
add('bohrmag-num', num({
  stem: 'Using e = 1.6 × 10⁻¹⁹ C, h = 6.63 × 10⁻³⁴ J s and mₑ = 9.1 × 10⁻³¹ kg, calculate the Bohr magneton, in units of 10⁻²⁴ A m² (3 significant figures).',
  value: Number(dec(MUB / 1e-24, 3)), tol: 0.02, unit: '× 10⁻²⁴ A m²',
  sol: r`$\mu_B = \dfrac{eh}{4\pi m_e} = \dfrac{1.6 \times 10^{-19} \times 6.63 \times 10^{-34}}{4\pi \times 9.1 \times 10^{-31}} \approx ${sci(MUB, 3)}$ A m², i.e. $\dfrac{${sci(MUB, 3)}}{10^{-24}} = ${dec(MUB / 1e-24, 3)}$.`,
  scheme: [['μB = eh/4πmₑ', 1], ['≈ 9.28 × 10⁻²⁴ A m²', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(MUB, 9.2766e-24, 0.001) || 'mub');
add('gyro-mcq', mcq({
  stem: 'For an electron moving in a circular orbit, the ratio of its orbital magnetic moment to its orbital angular momentum',
  right: 'is e/2mₑ, the same for every orbit',
  wrong: ['is e/mₑ, the same for every orbit', 'increases with the radius of the orbit', 'decreases as the speed of the electron increases'],
  sol: 'μ = evr/2 and L = mₑvr, so μ/L = e/2mₑ: v and r cancel — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('muL-ar', ar({
  a: 'The orbital magnetic moment of an electron in an atom points opposite to its orbital angular momentum.',
  r: 'The electron is negatively charged, so the conventional current of its orbit circulates opposite to its motion.',
  key: 'a',
  sol: 'Both true, and R explains A: L follows the motion, μ follows the conventional current, which is reversed for a negative charge — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('quant-ar', ar({
  a: 'In the Bohr model, the orbital magnetic moment of the electron in hydrogen can take only whole-number multiples of the Bohr magneton.',
  r: 'The electron in a hydrogen atom carries a charge of magnitude 1.6 × 10⁻¹⁹ C.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: μ is quantised because μ = (e/2mₑ)L and Bohr’s condition makes L = nh/2π, giving μ = nμB — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
const gy = QE / (2 * ME);
add('gyro-num', num({
  stem: 'Find the ratio of the orbital magnetic moment to the orbital angular momentum of an electron (mₑ = 9.1 × 10⁻³¹ kg), in units of 10¹⁰ C kg⁻¹ (3 significant figures).',
  value: Number(dec(gy / 1e10, 3)), tol: 0.02, unit: '× 10¹⁰ C kg⁻¹',
  sol: r`$\dfrac{\mu}{L} = \dfrac{e}{2m_e} = \dfrac{1.6 \times 10^{-19}}{2 \times 9.1 \times 10^{-31}} \approx ${sci(gy, 3)}$ C kg$^{-1}$, i.e. $\dfrac{${sci(gy, 3)}}{10^{10}} = ${dec(gy / 1e10, 3)}$.`,
  scheme: [['e/2mₑ ≈ 8.79 × 10¹⁰ C kg⁻¹', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(gy, 8.7912e10, 0.001) || 'gy');
add('level-num', num({
  stem: 'In which Bohr orbit of hydrogen does the electron have an orbital magnetic moment of 2.78 × 10⁻²³ A m²? (Take the Bohr magneton as 9.27 × 10⁻²⁴ A m².)',
  value: 3, tol: 0, unit: '',
  sol: r`$\mu = n\mu_B$, so $n = \dfrac{2.78 \times 10^{-23}}{9.27 \times 10^{-24}} = 3$ (the third orbit).`,
  scheme: [['n = μ/μB = 3', 1]],
  d: 2, c: 'application', t: [2],
}), () => Math.round(2.78e-23 / 9.27e-24) === 3 && near(2.78e-23 / 9.27e-24, 3) || 'lv');
add('currentn-mcq', mcq({
  stem: 'In the Bohr model of hydrogen, the orbit radius varies as n² and the speed of the electron as 1/n. How do the equivalent current I of the orbit and the orbital magnetic moment μ vary with n?',
  right: 'I ∝ 1/n³ and μ ∝ n',
  wrong: ['I ∝ 1/n and μ ∝ n²', 'I ∝ n and μ ∝ n³', 'I ∝ 1/n³ and μ ∝ 1/n'],
  sol: 'I = ev/2πr ∝ (1/n)/n² = 1/n³; μ = evr/2 ∝ (1/n)(n²) = n, in step with μ = nμB — option (@K).',
  d: 4, c: 'analysis', t: [2],
}), () => {
  const I = (n) => (1 / n) / n ** 2;
  const mu = (n) => (1 / n) * n ** 2;
  return near(I(1) / I(2), 8) && near(mu(3) / mu(1), 3) || 'cn';
});
add('bohrderive-short3', short({
  marks: 3,
  stem: 'An electron of mass mₑ and charge −e moves with speed v in a circular orbit of radius r. Show that its orbital magnetic moment is μ = (e/2mₑ)L, where L is its orbital angular momentum, and use Bohr’s quantum condition to obtain the Bohr magneton.',
  model: r`The period is $T = \dfrac{2\pi r}{v}$, so the orbit is a current $I = \dfrac{e}{T} = \dfrac{ev}{2\pi r}$ round an area $\pi r^2$. Its moment is $\mu = I\pi r^2 = \dfrac{evr}{2}$. Since $L = m_evr$, $\mu = \dfrac{e}{2m_e}L$; $\vec\mu$ is opposite to $\vec L$ because the charge is negative. Bohr’s condition $L = \dfrac{nh}{2\pi}$ gives $\mu = n\dfrac{eh}{4\pi m_e}$; for $n = 1$ this is the Bohr magneton $\mu_B = \dfrac{eh}{4\pi m_e} \approx 9.27 \times 10^{-24}$ A m².`,
  sol: 'Current e/T times area; L = mₑvr; L = nh/2π.',
  scheme: [['I = ev/2πr and μ = evr/2', 1], ['μ = (e/2mₑ)L, opposite to L', 1], ['μ = n eh/4πmₑ; μB = eh/4πmₑ', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
const el = { r: 8e-11, f: 3e15 };
el.I = QE * el.f;
el.mu = el.I * Math.PI * el.r ** 2;
el.L = ME * 2 * Math.PI * el.f * el.r ** 2;
add('electron-short3', short({
  marks: 3,
  stem: 'An electron revolves in a circular orbit of radius 8.0 × 10⁻¹¹ m, making 3.0 × 10¹⁵ revolutions per second. Find (a) the equivalent current, (b) its orbital magnetic moment, (c) its orbital angular momentum, and verify that the ratio of (b) to (c) is e/2mₑ.',
  model: r`(a) $I = ef = 1.6 \times 10^{-19} \times 3.0 \times 10^{15} = ${sci(el.I, 2)}$ A.
(b) $\mu = I\pi r^2 = ${sci(el.I, 2)} \times \pi \times (8.0 \times 10^{-11})^2 \approx ${sci(el.mu, 3)}$ A m².
(c) $v = 2\pi rf$, so $L = m_evr = 2\pi m_efr^2 \approx ${sci(el.L, 3)}$ kg m² s$^{-1}$.
Ratio $\dfrac{\mu}{L} \approx ${sci(el.mu / el.L, 3)}$ C kg$^{-1}$, equal to $\dfrac{e}{2m_e} = \dfrac{1.6 \times 10^{-19}}{1.82 \times 10^{-30}} \approx ${sci(gy, 3)}$ C kg$^{-1}$.`,
  sol: 'I = ef; μ = Iπr²; L = mₑvr.',
  scheme: [['I = 4.8 × 10⁻⁴ A', 1], ['μ ≈ 9.65 × 10⁻²⁴ A m²', 1], ['L ≈ 1.10 × 10⁻³⁴ kg m² s⁻¹; ratio 8.79 × 10¹⁰ C kg⁻¹', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(el.mu, 9.651e-24, 0.001) && near(el.mu / el.L, gy, 1e-9) || 'el');

// ================================================================ t03 moving coil galvanometer
add('principle-mcq', mcq({
  stem: 'The moving coil galvanometer works on the principle that',
  right: 'a coil carrying a current in a magnetic field experiences a torque',
  wrong: ['a changing magnetic flux through a coil induces an emf in it', 'a current-carrying wire sets up a magnetic field around itself', 'like magnetic poles repel and unlike poles attract'],
  sol: 'The deflecting torque NIAB on the coil, balanced by the restoring torque of the suspension, measures the current — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('radial-mcq', mcq({
  stem: 'As the coil of a moving coil galvanometer turns in the radial field between its pole pieces, the plane of the coil',
  right: 'always contains the field lines at the coil sides, so sin θ stays equal to 1',
  wrong: ['stays perpendicular to the field lines, so the torque stays zero until the spring acts', 'turns away from the field lines, so the torque falls as the deflection grows', 'cuts the field lines at 45°, so the torque is NIAB/√2'],
  sol: 'In a radial field the field at each coil side lies along a radius, which is in the plane of the coil at every deflection: the normal stays at 90° to B and the torque stays NIAB — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('phosphor-ar', ar({
  a: 'The suspension strip of a sensitive moving coil galvanometer is made of phosphor bronze.',
  r: 'Phosphor bronze has a small restoring torque per unit twist and returns fully to its original state after being twisted.',
  key: 'a',
  sol: 'Both true, and R explains A: a small c gives a large deflection for a small current (current sensitivity NAB/c), and full recovery keeps the zero steady — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('turnsV-ar', ar({
  a: 'Winding more turns of the same wire on a galvanometer coil always increases its voltage sensitivity.',
  r: 'The current sensitivity of a galvanometer is directly proportional to the number of turns on its coil.',
  key: 'd',
  sol: 'R is true: θ/I = NAB/c. A is false: more turns of the same wire raise the coil resistance G in proportion, so the voltage sensitivity NAB/cG need not increase — option (d).',
  d: 4, c: 'analysis', t: [3],
}));
const dg = { N: 80, A: 0.02 * 0.015, B: 0.25, c: 6e-8, I: 2e-6 };
dg.th = (dg.N * dg.I * dg.A * dg.B) / dg.c;
add('deflect-num', num({
  stem: 'A galvanometer coil of 80 turns, each 2.0 cm × 1.5 cm, turns in a radial field of 0.25 T against a suspension whose restoring torque is 6.0 × 10⁻⁸ N m per radian. Find the deflection produced by a current of 2.0 μA, in radians.',
  value: Number(dec(dg.th, 2)), tol: 0.005, unit: 'rad',
  sol: r`$NIAB = c\theta$: $\theta = \dfrac{NIAB}{c} = \dfrac{80 \times 2.0 \times 10^{-6} \times 3.0 \times 10^{-4} \times 0.25}{6.0 \times 10^{-8}} = \dfrac{1.2 \times 10^{-8}}{6.0 \times 10^{-8}} = ${dec(dg.th, 2)}$ rad.`,
  scheme: [['θ = NIAB/c', 1], ['0.20 rad', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(dg.th, 0.2) || 'dg');
const vsn = { N: 150, A: 1.2e-4, B: 0.4, c: 1.8e-7, G: 80 };
vsn.SI = (vsn.N * vsn.A * vsn.B) / vsn.c;
vsn.SV = vsn.SI / vsn.G;
add('voltsens-num', num({
  stem: 'A galvanometer has a coil of 150 turns, each of area 1.2 cm², in a radial field of 0.40 T. The restoring torque per unit twist is 1.8 × 10⁻⁷ N m rad⁻¹ and the coil resistance is 80 Ω. Find its voltage sensitivity, in radians per millivolt.',
  value: Number(dec(vsn.SV / 1000, 2)), tol: 0.01, unit: 'rad mV⁻¹',
  sol: r`Current sensitivity $\dfrac{NAB}{c} = \dfrac{150 \times 1.2 \times 10^{-4} \times 0.40}{1.8 \times 10^{-7}} = ${sci(vsn.SI, 2)}$ rad A$^{-1}$. Voltage sensitivity $= \dfrac{${sci(vsn.SI, 2)}}{80} = ${dec(vsn.SV, 2)}$ rad V$^{-1}$, i.e. $\dfrac{${dec(vsn.SV, 2)}}{1000} = ${dec(vsn.SV / 1000, 2)}$ rad per mV.`,
  scheme: [['Current sensitivity 4.0 × 10⁴ rad A⁻¹', 1], ['Divide by G: 0.50 rad per mV', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(vsn.SV, 500) || 'vsn');
add('figure-num', num({
  stem: 'A galvanometer has 25 divisions on each side of its zero and gives full-scale deflection for 0.50 mA. Find its figure of merit (current per division), in μA per division.',
  value: 20, tol: 0.1, unit: 'μA per division',
  sol: r`$k = \dfrac{0.50\ \text{mA}}{25} = \dfrac{500}{25} = 20$ μA per division.`,
  scheme: [['k = 500 μA ÷ 25 = 20 μA per division', 1]],
  d: 1, c: 'understanding', t: [3],
}), () => near(500 / 25, 20) || 'fig');
const ts = { N: 100, A: 4e-4, B: 0.2, I: 5e-4, th: Math.PI / 2 };
ts.c = (ts.N * ts.I * ts.A * ts.B) / ts.th;
add('torsion-num', num({
  stem: 'A galvanometer coil of 100 turns, each of area 4.0 cm², is in a radial field of 0.20 T. A current of 0.50 mA turns it through 90°. Find the restoring torque per unit twist of its suspension, in units of 10⁻⁶ N m rad⁻¹ (3 significant figures).',
  value: Number(dec(ts.c / 1e-6, 3)), tol: 0.02, unit: '× 10⁻⁶ N m rad⁻¹',
  sol: r`$90^\circ = \pi/2$ rad. $c = \dfrac{NIAB}{\theta} = \dfrac{100 \times 5.0 \times 10^{-4} \times 4.0 \times 10^{-4} \times 0.20}{\pi/2} = \dfrac{4.0 \times 10^{-6}}{1.571} \approx ${sci(ts.c, 3)}$ N m rad$^{-1}$, i.e. $\dfrac{${sci(ts.c, 3)}}{10^{-6}} = ${dec(ts.c / 1e-6, 3)}$.`,
  scheme: [['Deflection in radians, π/2', 1], ['c ≈ 2.55 × 10⁻⁶ N m rad⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(ts.c, 2.5465e-6, 0.001) || 'ts');
add('concave-short', short({
  marks: 2,
  stem: 'Explain how the concave pole pieces and the soft-iron core of a moving coil galvanometer together make its scale evenly divided.',
  model: 'Together they make the field in the narrow gap **radial**, along radii of the core. The coil sides move round inside this gap, so the plane of the coil **always contains B** and the deflecting torque is **NIAB at every angle**. Balancing it against the restoring torque cθ gives **θ ∝ I**, so equal steps of current give equal deflections.',
  sol: 'Radial field keeps the torque NIAB, so θ ∝ I.',
  scheme: [['Radial field: plane of coil always along B, torque NIAB', 1], ['NIAB = cθ gives θ ∝ I: even scale', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sensways-short', short({
  marks: 2,
  stem: 'State two ways of increasing the current sensitivity of a moving coil galvanometer, and a practical drawback of each.',
  model: '(i) **More turns** on the coil: the coil becomes heavier and its **resistance rises**, so the voltage sensitivity may not improve. (ii) A **weaker suspension** (smaller c, e.g. a thinner strip): the coil becomes **fragile** and slow to settle, and the zero can drift. (A stronger magnet or a larger coil also helps, but makes the instrument bulky.)',
  sol: 'NAB/c: raise N, A, B or lower c.',
  scheme: [['Two valid ways (N, A, B up or c down)', 1], ['A drawback for each', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
add('mcgworking-short3', short({
  marks: 3,
  stem: 'Explain the working of a moving coil galvanometer and show that the current through it is proportional to the deflection of its coil. Name the constant of proportionality.',
  model: r`When a current $I$ flows, the coil in the **radial field** feels a deflecting torque $NIAB$ (the plane of the coil always contains $\vec B$). The coil turns and twists the suspension, which sets up a **restoring torque** $c\theta$ proportional to the deflection. The coil comes to rest when $NIAB = c\theta$, so $I = \dfrac{c}{NAB}\theta = k\theta$: the current is **proportional** to the deflection. $k = c/NAB$ is the **galvanometer constant**.`,
  sol: 'Deflecting torque NIAB balanced by cθ.',
  scheme: [['Deflecting torque NIAB in a radial field', 1], ['Restoring torque cθ; equilibrium', 1], ['I = kθ, k = c/NAB the galvanometer constant', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
add('sensitivity-short3', short({
  marks: 3,
  stem: 'Define the current sensitivity and the voltage sensitivity of a moving coil galvanometer and obtain expressions for them. Explain why winding more turns of the same wire on the coil need not increase its voltage sensitivity.',
  model: r`**Current sensitivity** is the deflection per unit current: from $NIAB = c\theta$, $\dfrac{\theta}{I} = \dfrac{NAB}{c}$. **Voltage sensitivity** is the deflection per unit potential difference across the coil: with $V = IG$, $\dfrac{\theta}{V} = \dfrac{NAB}{cG}$. Doubling N with the same wire doubles the length of wire and so doubles G as well; $N/G$ is unchanged, so the voltage sensitivity stays the same although the current sensitivity doubles.`,
  sol: 'θ/I = NAB/c; θ/V = NAB/cG; G ∝ N.',
  scheme: [['θ/I = NAB/c', 1], ['θ/V = NAB/cG', 1], ['G rises with N, so N/G unchanged', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('whichincrease-mcq', mcq({
  stem: 'Which one of these changes would NOT increase the current sensitivity of a moving coil galvanometer?',
  right: 'Using a suspension with a larger restoring torque per unit twist',
  wrong: ['Using a stronger permanent magnet', 'Increasing the area of the coil', 'Winding more turns on the coil'],
  sol: 'Current sensitivity NAB/c rises with N, A and B but falls as c increases — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('parts-match', match({
  stem: 'Match each galvanometer part in Column A with its role in Column B.',
  pairs: [
    ['Concave pole pieces', 'Shapes the field in the gap so that it is radial'],
    ['Soft-iron cylinder inside the coil', 'Concentrates the field lines, increasing B in the gap'],
    ['Phosphor-bronze strip', 'Provides the restoring torque and leads current into the coil'],
    ['Small mirror on the suspension', 'Reflects a light beam onto a scale to show small deflections'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Pole pieces → radial field (1 → r); soft iron → stronger B (2 → p); strip → restoring torque and current lead (3 → s); mirror → lamp-and-scale reading (4 → q).',
  d: 2, c: 'understanding', t: [3],
}));
add('uniformscale-mcq', mcq({
  stem: 'Suppose the radial field of a galvanometer were replaced by a uniform field, with the plane of the coil along the field at zero deflection. The current needed to produce a deflection φ would then be proportional to',
  right: 'φ / cos φ',
  wrong: ['φ', 'φ cos φ', 'sin φ'],
  sol: 'After turning through φ the normal makes 90° − φ with B, so the deflecting torque is NIAB cos φ. Balancing cφ gives I ∝ φ/cos φ: the scale would be crowded at large deflections — option (@K).',
  d: 4, c: 'analysis', t: [3],
}), () => near(Math.sin(rad(90 - 30)), Math.cos(rad(30))) || 'us');
add('merit-tf', tf({
  stem: 'Doubling the number of turns on a galvanometer coil, everything else unchanged, doubles both its current sensitivity and its figure of merit (current per division).',
  key: 'f',
  sol: 'False. The current sensitivity NAB/c doubles, but the figure of merit k = c/NAB is its reciprocal, so it is halved.',
  d: 3, c: 'analysis', t: [3],
}));
add('galvconst-fill', fill({
  stem: 'In the relation I = kθ for a moving coil galvanometer, the constant k, equal to c/NAB, is called the ___ constant.',
  acc: [['galvanometer']],
  sol: 'The **galvanometer** constant (current per unit deflection).',
  d: 1, c: 'recall', t: [3],
}));
const gn = { G: 60, div: 50, k: 15e-6 };
gn.Ifs = gn.div * gn.k;
gn.SI = 1 / (gn.k * 1e3); // div per mA
gn.Vdiv = gn.k * gn.G; // V per division
gn.SV = 1 / (gn.Vdiv * 1e3); // div per mV
add('galvnum-short3', short({
  marks: 3,
  stem: 'A galvanometer has a coil of resistance 60 Ω and a scale of 50 divisions; a current of 15 μA deflects it by one division. Find (a) the current for full-scale deflection, (b) its current sensitivity in divisions per mA, (c) its voltage sensitivity in divisions per mV.',
  model: r`(a) $I_g = 50 \times 15\ \mu\text{A} = ${dec(gn.Ifs * 1e3, 2)}$ mA.
(b) One division per 15 μA: $\dfrac{1}{0.015\ \text{mA}} \approx ${dec(gn.SI, 3)}$ divisions per mA.
(c) One division needs $15 \times 10^{-6} \times 60 = ${sci(gn.Vdiv, 2)}$ V $= 0.90$ mV, so the voltage sensitivity is $\dfrac{1}{0.90} \approx ${dec(gn.SV, 3)}$ divisions per mV.`,
  sol: 'Ig = nk; reciprocal of current and of voltage per division.',
  scheme: [['Ig = 0.75 mA', 1], ['≈ 66.7 div per mA', 1], ['≈ 1.11 div per mV', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(gn.Ifs, 7.5e-4) && near(gn.SI, 66.667, 0.001) && near(gn.SV, 1.1111, 0.001) || 'gn');

// ================================================================ t04 ammeter and voltmeter
add('shuntn-mcq', mcq({
  stem: 'A galvanometer of resistance G is to be converted into an ammeter whose range is n times the galvanometer’s full-scale current. The shunt required is',
  right: 'G/(n − 1)',
  wrong: ['G/n', '(n − 1)G', 'nG'],
  sol: 'IgG = (I − Ig)S with I = nIg gives S = G/(n − 1) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const sh = { G: 25, Ig: 4e-3, I: 5 };
sh.S = (sh.Ig * sh.G) / (sh.I - sh.Ig);
add('shunt-num', num({
  stem: 'A galvanometer of resistance 25 Ω gives full-scale deflection for 4.0 mA. Find the shunt needed to convert it into an ammeter of range 0–5.0 A, in ohms (3 significant figures).',
  value: Number(dec(sh.S, 3)), tol: 0.0003, unit: 'Ω',
  sol: r`$S = \dfrac{I_gG}{I - I_g} = \dfrac{0.0040 \times 25}{5.0 - 0.0040} = \dfrac{0.10}{4.996} \approx ${dec(sh.S, 3)}$ Ω, connected in parallel.`,
  scheme: [['S = IgG/(I − Ig)', 1], ['S ≈ 0.0200 Ω in parallel', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(sh.S, 0.020016, 0.001) && near(q.answer.value, 0.02) || 'sh');
const se = { G: 75, Ig: 1.5e-3, V: 30 };
se.R = Math.round(se.V / se.Ig - se.G);
add('series-num', num({
  stem: 'A galvanometer of resistance 75 Ω gives full-scale deflection for 1.5 mA. Find the resistance to be connected in series with it to make a voltmeter of range 0–30 V, in ohms.',
  value: se.R, tol: 5, unit: 'Ω',
  sol: r`Total resistance $= \dfrac{V}{I_g} = \dfrac{30}{1.5 \times 10^{-3}} = 20000$ Ω; $R = 20000 - 75 = ${se.R}$ Ω, in series.`,
  scheme: [['Total 20 000 Ω', 1], ['R = 19 925 Ω in series', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), () => se.R === 19925 || 'se');
const rg = { G: 120, Ig: 2.5e-3, S: 0.3 };
rg.I = rg.Ig * (1 + rg.G / rg.S);
add('range-num', num({
  stem: 'A galvanometer of resistance 120 Ω gives full-scale deflection for 2.5 mA. A shunt of 0.30 Ω is connected across it. Find the range of the ammeter so formed, in amperes (3 significant figures).',
  value: Number(dec(rg.I, 3)), tol: 0.005, unit: 'A',
  sol: r`At full scale the p.d. across the coil is $I_gG = 0.0025 \times 120 = 0.30$ V. The shunt then carries $\dfrac{0.30}{0.30} = 1.0$ A, so $I = 0.0025 + 1.0 = ${dec(rg.I, 3)}$ A.`,
  scheme: [['Shunt current IgG/S = 1.0 A', 1], ['I ≈ 1.00 A', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(rg.I, 1.0025) || 'rg');
add('voltrange-num', num({
  stem: 'A galvanometer of resistance 15 Ω gives full-scale deflection for 10 mA. A 485 Ω resistor is connected in series with it. Find the range of the voltmeter so formed, in volts.',
  value: 5, tol: 0.05, unit: 'V',
  sol: r`$V = I_g(G + R) = 0.010 \times (15 + 485) = 0.010 \times 500 = 5.0$ V.`,
  scheme: [['V = Ig(G + R) = 5.0 V', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.01 * 500, 5) || 'vr');
const ex = { RA: 0.1, I1: 1, I2: 5 };
ex.S = (ex.I1 * ex.RA) / (ex.I2 - ex.I1);
add('extend-num', num({
  stem: 'An ammeter of resistance 0.10 Ω reads up to 1.0 A. What shunt must be connected across it to make it read up to 5.0 A? Give the answer in ohms.',
  value: Number(dec(ex.S, 2)), tol: 0.001, unit: 'Ω',
  sol: r`Treat the ammeter as a meter of resistance 0.10 Ω and full-scale current 1.0 A: $S = \dfrac{1.0 \times 0.10}{5.0 - 1.0} = \dfrac{0.10}{4.0} = ${dec(ex.S, 2)}$ Ω, in parallel.`,
  scheme: [['Same rule with Ig = 1.0 A', 1], ['S = 0.025 Ω', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(ex.S, 0.025) || 'ex');
add('fraction-num', num({
  stem: 'An ammeter is made by connecting a shunt of resistance G/49 across a galvanometer of resistance G. What fraction of the total current passes through the galvanometer?',
  value: 0.02, tol: 0.0005, unit: '',
  sol: r`The currents divide inversely as the resistances: $\dfrac{I_g}{I_S} = \dfrac{G/49}{G} = \dfrac{1}{49}$, so $\dfrac{I_g}{I} = \dfrac{1}{1 + 49} = \dfrac{1}{50} = 0.020$.`,
  scheme: [['Fraction 1/50 = 0.020', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(1 / 50, 0.02) || 'fr');
add('voltrange-ar', ar({
  a: 'A voltmeter of range 0–10 V made from a given galvanometer has a higher resistance than a voltmeter of range 0–1 V made from the same galvanometer.',
  r: 'The series resistance needed for a range V is V/Ig − G, which increases with V.',
  key: 'a',
  sol: 'Both true, and R explains A: the meter resistance G + R = V/Ig is proportional to the range, ten times larger for 10 V — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
const ld = { E: 12, R: 4000, RV: 4000 };
ld.Rp = (ld.R * ld.RV) / (ld.R + ld.RV);
ld.read = (ld.E * ld.Rp) / (ld.R + ld.Rp);
add('loading-mcq', mcq({
  stem: 'Two 4.0 kΩ resistors in series are connected across a 12 V supply of negligible internal resistance. A voltmeter of resistance 4.0 kΩ is connected across one of the resistors. It reads',
  right: '4.0 V',
  wrong: ['6.0 V', '3.0 V', '8.0 V'],
  sol: 'The voltmeter and the resistor in parallel make 2.0 kΩ, in series with 4.0 kΩ: the reading is 12 × 2/6 = 4.0 V, not the 6.0 V present without the meter — option (@K).',
  d: 4, c: 'analysis', t: [4],
}), () => near(ld.read, 4) || 'ld');
add('rangeup-mcq', mcq({
  stem: 'A galvanometer is converted into an ammeter of range 0–2 A, whose resistance is R. If the same galvanometer is instead converted into an ammeter of range 0–10 A, the resistance of the new ammeter is',
  right: 'R/5',
  wrong: ['5R', 'R', 'R/25'],
  sol: r`With $S = G/(n - 1)$ the ammeter resistance is $\dfrac{GS}{G + S} = \dfrac{G}{n}$: five times the range means one fifth of the resistance — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => {
  const RA = (n) => {
    const S = 1 / (n - 1);
    return S / (1 + S);
  };
  return near(RA(5000) / RA(1000), 0.2) || 'ru';
});
add('meterorder-short', short({
  marks: 2,
  stem: 'The same galvanometer is used to make an ammeter and a voltmeter. Arrange the galvanometer, the ammeter and the voltmeter in increasing order of resistance and justify the order.',
  model: '**Ammeter < galvanometer < voltmeter.** The ammeter is the coil G in **parallel** with a small shunt S, so its resistance GS/(G + S) is **less than S**, and far less than G. The voltmeter is the coil in **series** with a large R, so its resistance G + R is **much more than G**.',
  sol: 'Parallel lowers, series raises the resistance.',
  scheme: [['Order: ammeter, galvanometer, voltmeter', 1], ['Reason: shunt in parallel lowers, series R raises', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const ww = { E: 1.5, r: 0.45, RA: 0.05 };
ww.I = ww.E / (ww.r + ww.RA);
add('wrongway-short', short({
  marks: 2,
  stem: 'By mistake, an ammeter of range 0–1.0 A and resistance 0.050 Ω is connected directly across a cell of emf 1.5 V and internal resistance 0.45 Ω. Find the current through the ammeter and comment on the mistake.',
  model: r`$I = \dfrac{E}{r + R_A} = \dfrac{1.5}{0.45 + 0.050} = ${dec(ww.I, 2)}$ A. This is **three times** the full-scale current: the coil and shunt can **overheat** and the meter may be **damaged**. An ammeter has a very low resistance and must always be connected **in series**, never across a source.`,
  sol: 'I = E/(r + RA) = 3.0 A > 1.0 A.',
  scheme: [['I = 3.0 A', 1], ['Exceeds range: damage; ammeter belongs in series', 1]],
  d: 3, c: 'evaluation', t: [4], wl: null,
}), () => near(ww.I, 3) || 'ww');
add('convertderive-short3', short({
  marks: 3,
  stem: 'A galvanometer has resistance G and full-scale current Ig. Derive the resistance needed to convert it into (a) an ammeter of range I, (b) a voltmeter of range V, stating how the resistance is connected in each case.',
  model: r`(a) A shunt $S$ is connected **in parallel**. At full scale the coil carries $I_g$ and the shunt $I - I_g$, with the same p.d.: $I_gG = (I - I_g)S$, so $S = \dfrac{I_gG}{I - I_g}$ (small).
(b) A resistance $R$ is connected **in series**. Full-scale current $I_g$ must flow when $V$ is applied: $V = I_g(G + R)$, so $R = \dfrac{V}{I_g} - G$ (large).`,
  sol: 'Equal p.d. in parallel; V = Ig(G + R) in series.',
  scheme: [['Shunt in parallel; IgG = (I − Ig)S', 1], ['S = IgG/(I − Ig)', 1], ['R in series: R = V/Ig − G', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
const mr = { G: 10, Ig: 1e-3, V1: 5, V2: 50 };
mr.R1 = Math.round(mr.V1 / mr.Ig - mr.G);
mr.R2 = Math.round(mr.V2 / mr.Ig - mr.G - mr.R1);
add('multirange-short3', short({
  marks: 3,
  stem: 'A galvanometer of resistance 10 Ω gives full-scale deflection for 1.0 mA. Design a two-range voltmeter reading 0–5 V and 0–50 V, using two resistors in series with the galvanometer, and find the resistance of the meter on each range.',
  model: r`0–5 V: total $\dfrac{5}{1.0 \times 10^{-3}} = 5000$ Ω, so $R_1 = 5000 - 10 = ${mr.R1}$ Ω in series; the 5 V terminal is taken after $R_1$.
0–50 V: total $\dfrac{50}{1.0 \times 10^{-3}} = 50000$ Ω, so add $R_2 = 50000 - 5000 = ${mr.R2}$ Ω after the 5 V terminal.
Meter resistance: 5000 Ω on the 5 V range and 50 000 Ω on the 50 V range.`,
  sol: 'Total resistance V/Ig for each range.',
  scheme: [['R₁ = 4990 Ω', 1], ['R₂ = 45 000 Ω', 1], ['Arrangement and meter resistances', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => mr.R1 === 4990 && mr.R2 === 45000 || 'mr');

// ================================================================ 5-mark questions (in parts)
const tl = { N: 200, A: 0.04 * 0.025, I: 0.05, B: 0.8, plane: 30 };
tl.m = tl.N * tl.I * tl.A;
tl.th = 90 - tl.plane;
tl.tau = tl.m * tl.B * Math.sin(rad(tl.th));
add('torque-long', long({
  stem: '(a) A rectangular coil of N turns and area A carries current I in a uniform magnetic field B, its normal making angle θ with B. Show that the net force on the coil is zero and derive the torque acting on it. [3] (b) A coil of 200 turns, 4.0 cm × 2.5 cm, carries 50 mA in a field of 0.80 T. Find its magnetic moment and the torque on it when its plane makes 30° with the field, and state the orientation in which it would come to rest if free to turn. [2]',
  model: r`(a) Take the axis of rotation parallel to the sides of length $l$ (the other sides have length $b$). The forces on opposite sides are equal and opposite, so the net force is zero. The forces on the sides of length $b$ act along the axis and cancel. The sides of length $l$ each feel $F = NIlB$, on parallel lines a distance $b\sin\theta$ apart: a couple of moment $\tau = NIlB \cdot b\sin\theta = NIAB\sin\theta$, or $\vec\tau = \vec m \times \vec B$ with $\vec m = NI\vec A$ (right-hand rule).

(b) $m = NIA = 200 \times 0.050 \times 1.0 \times 10^{-3} = ${dec(tl.m, 2)}$ A m². Plane at $30^\circ$ means $\theta = 60^\circ$: $\tau = 0.010 \times 0.80 \times \sin 60^\circ \approx ${sci(tl.tau, 3)}$ N m. It comes to rest with $\vec m$ along $\vec B$, the plane of the coil perpendicular to the field (stable equilibrium).`,
  sol: 'Forces on the four sides; couple; numbers.',
  scheme: [['Net force zero: opposite sides cancel', 1], ['Forces NIlB on two sides form a couple, arm b sin θ', 1], ['τ = NIAB sin θ (vector form)', 1], ['m = 0.010 A m²; τ ≈ 6.93 × 10⁻³ N m', 1], ['Rest with m along B (plane ⟂ B)', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(tl.m, 0.01) && near(tl.tau, 6.928e-3, 0.001) || 'tl');
const bl = { n: 3 };
bl.mu = bl.n * MUB;
add('bohr-long', long({
  stem: '(a) Explain why a small current loop is regarded as a magnetic dipole. [1] (b) An electron revolves with speed v in a circular orbit of radius r. Derive its orbital magnetic moment and show that μ = (e/2mₑ)L, where L is its orbital angular momentum. [2] (c) Using Bohr’s condition L = nh/2π, find the orbital magnetic moment of the electron in the third orbit of hydrogen, and state its direction relative to L. (e = 1.6 × 10⁻¹⁹ C, h = 6.63 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg) [2]',
  model: r`(a) Far away its field has the dipole form (axial field $\dfrac{\mu_0}{4\pi}\dfrac{2m}{x^3}$, N and S faces), and in a uniform field it feels no net force but a torque $\vec m \times \vec B$, like a bar magnet.

(b) Period $T = 2\pi r/v$, so $I = \dfrac{e}{T} = \dfrac{ev}{2\pi r}$; $\mu = I\pi r^2 = \dfrac{evr}{2}$. With $L = m_evr$, $\mu = \dfrac{e}{2m_e}L$.

(c) $\mu = \dfrac{e}{2m_e}\cdot\dfrac{nh}{2\pi} = n\dfrac{eh}{4\pi m_e} = 3 \times ${sci(MUB, 3)} \approx ${sci(bl.mu, 3)}$ A m². It points opposite to $\vec L$, because the electron is negative.`,
  sol: 'Dipole features; current e/T; Bohr condition.',
  scheme: [['Dipole field and torque behaviour', 1], ['I = ev/2πr, μ = evr/2', 1], ['μ = (e/2mₑ)L', 1], ['μ = 3μB ≈ 2.78 × 10⁻²³ A m²', 1], ['Opposite to L (negative charge)', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(bl.mu, 2.783e-23, 0.001) || 'bl');
const gl = { N: 50, A: 3e-4, B: 0.3, c: 1.5e-8, G: 25, th: 0.15 };
gl.SI = (gl.N * gl.A * gl.B) / gl.c;
gl.SV = gl.SI / gl.G;
gl.I = gl.th / gl.SI;
add('galvanometer-long', long({
  stem: '(a) Describe the construction of a moving coil galvanometer and explain the purpose of its radial magnetic field. [2] (b) Show that the deflection of the coil is proportional to the current through it, and define current sensitivity. [1] (c) A galvanometer coil of 50 turns, each of area 3.0 × 10⁻⁴ m², is in a radial field of 0.30 T. The restoring torque per unit twist is 1.5 × 10⁻⁸ N m rad⁻¹ and the coil resistance is 25 Ω. Find (i) its current sensitivity, (ii) its voltage sensitivity, (iii) the current that deflects it by 0.15 rad. [2]',
  model: r`(a) A coil of many turns of fine insulated copper wire on a light frame hangs from a phosphor-bronze strip (with a mirror or pointer) between the concave pole pieces of a strong magnet; a soft-iron cylinder sits inside the coil, and a spring below completes the circuit. The concave poles and the core make the field radial, so the plane of the coil always contains B and the deflecting torque is $NIAB$ at every deflection; the core also strengthens B.

(b) $NIAB = c\theta$, so $\theta = \dfrac{NAB}{c}I \propto I$. Current sensitivity is the deflection per unit current, $\theta/I = NAB/c$.

(c)(i) $\dfrac{NAB}{c} = \dfrac{50 \times 3.0 \times 10^{-4} \times 0.30}{1.5 \times 10^{-8}} = ${sci(gl.SI, 2)}$ rad A$^{-1}$.
(ii) $\dfrac{${sci(gl.SI, 2)}}{25} = ${sci(gl.SV, 2)}$ rad V$^{-1}$.
(iii) $I = \dfrac{0.15}{${sci(gl.SI, 2)}} = ${sci(gl.I, 2)}$ A.`,
  sol: 'Construction; NIAB = cθ; sensitivities.',
  scheme: [['Construction: coil, concave poles, soft-iron core, suspension', 1], ['Radial field: torque NIAB at every angle', 1], ['θ ∝ I; current sensitivity defined', 1], ['3.0 × 10⁵ rad A⁻¹ and 1.2 × 10⁴ rad V⁻¹', 1], ['I = 5.0 × 10⁻⁷ A', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(gl.SI, 3e5) && near(gl.SV, 1.2e4) && near(gl.I, 5e-7) || 'gl');
const cv = { G: 45, Ig: 3e-3, I: 2, V: 24 };
cv.S = (cv.Ig * cv.G) / (cv.I - cv.Ig);
cv.RA = (cv.G * cv.S) / (cv.G + cv.S);
cv.R = Math.round(cv.V / cv.Ig - cv.G);
add('conversion-long', long({
  stem: '(a) Explain, with a circuit diagram described in words, how a galvanometer is converted into an ammeter, and derive the shunt resistance required. [2] (b) A galvanometer of resistance 45 Ω gives full-scale deflection for 3.0 mA. Find (i) the shunt needed for an ammeter of range 0–2.0 A and the resistance of this ammeter, (ii) the resistance needed for a voltmeter of range 0–24 V and the resistance of this voltmeter. [3]',
  model: r`(a) A small resistance S (the shunt) is connected in parallel with the galvanometer, between the two terminals of the meter. The coil may carry only $I_g$; the rest, $I - I_g$, passes through the shunt at the same p.d.: $I_gG = (I - I_g)S$, so $S = \dfrac{I_gG}{I - I_g}$. The combination has a very small resistance and is connected in series.

(b)(i) $S = \dfrac{0.0030 \times 45}{2.0 - 0.0030} = \dfrac{0.135}{1.997} \approx ${dec(cv.S, 3)}$ Ω; ammeter resistance $\dfrac{45 \times ${dec(cv.S, 3)}}{45 + ${dec(cv.S, 3)}} \approx ${dec(cv.RA, 3)}$ Ω.
(ii) Total $\dfrac{24}{0.0030} = 8000$ Ω, so $R = 8000 - 45 = ${cv.R}$ Ω in series; voltmeter resistance 8000 Ω.`,
  sol: 'Shunt rule; series rule.',
  scheme: [['Shunt in parallel, equal p.d.', 1], ['S = IgG/(I − Ig)', 1], ['S ≈ 0.0676 Ω', 1], ['Ammeter ≈ 0.0675 Ω', 1], ['R = 7955 Ω; voltmeter 8000 Ω', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(cv.S, 0.0676, 0.001) && near(cv.RA, 0.06750, 0.001) && cv.R === 7955 || `cv ${cv.S} ${cv.RA}`);
const lg = { E: 9, R1: 3000, R2: 6000, RV: 6000 };
lg.true = (lg.E * lg.R2) / (lg.R1 + lg.R2);
lg.Rp = (lg.R2 * lg.RV) / (lg.R2 + lg.RV);
lg.read = (lg.E * lg.Rp) / (lg.R1 + lg.Rp);
lg.RpMin = (0.99 * lg.true * lg.R1) / (lg.E - 0.99 * lg.true);
lg.RVmin = (lg.R2 * lg.RpMin) / (lg.R2 - lg.RpMin);
lg.meter = 10 / 50e-6;
add('loading-long', long({
  stem: 'A 9.0 V battery of negligible internal resistance is connected across a 3.0 kΩ resistor and a 6.0 kΩ resistor in series. (a) Why should an ideal voltmeter have infinite resistance? [1] (b) Find the true p.d. across the 6.0 kΩ resistor, and the reading of a voltmeter of resistance 6.0 kΩ connected across it. [2] (c) Find the least voltmeter resistance for which the reading is within 1% of the true value. A voltmeter of range 0–10 V is made from a galvanometer of full-scale current 50 μA; is it good enough? [2]',
  model: r`(a) A voltmeter is connected in parallel; any current it draws lowers the effective resistance of that part of the circuit and changes the p.d. it is meant to measure. Infinite resistance draws no current.

(b) True p.d. $= 9.0 \times \dfrac{6.0}{9.0} = ${dec(lg.true, 2)}$ V. With the meter: $6.0$ kΩ in parallel with 6.0 kΩ is $3.0$ kΩ, so the reading is $9.0 \times \dfrac{3.0}{6.0} = ${dec(lg.read, 2)}$ V.

(c) With $R_p$ (the meter in parallel with 6.0 kΩ) in kΩ, the reading must satisfy $9.0 \times \dfrac{R_p}{3.0 + R_p} \ge 0.99 \times 6.0 = 5.94$ V, so $R_p \ge \dfrac{5.94 \times 3.0}{3.06} \approx ${dec(lg.RpMin / 1000, 3)}$ kΩ, and $R_V = \dfrac{6.0R_p}{6.0 - R_p} \approx ${dec(lg.RVmin / 1000, 3)}$ kΩ. The 10 V meter has $\dfrac{10}{50 \times 10^{-6}} = 200$ kΩ, just above 198 kΩ: good enough, only just.`,
  sol: 'Loading by a finite-resistance voltmeter.',
  scheme: [['Ideal voltmeter draws no current', 1], ['True p.d. 6.0 V', 1], ['Reading 4.5 V', 1], ['Least resistance ≈ 198 kΩ', 1], ['200 kΩ meter is just adequate', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => near(lg.true, 6) && near(lg.read, 4.5) && near(lg.RVmin, 198000, 0.001) && near(lg.meter, 200000) || `lg ${lg.RVmin}`);
