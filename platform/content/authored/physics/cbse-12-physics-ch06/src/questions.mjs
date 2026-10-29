// ch06 Electromagnetic Induction — question bank. Every numerical value is computed here and re-checked by the
// `check` functions; induced-current directions are checked with cross products in screen coordinates
// (x right, y down, z into the page). Eddy currents are deleted from the syllabus and not used.
// AR keys planned: a a d a c d b.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { MU0 } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// ================================================================ t01 flux and Faraday's law
add('steady-tf', tf({
  stem: 'A coil held at rest in a very strong but steady magnetic field has a large induced emf.',
  key: 'f',
  sol: 'False. The induced emf depends on the rate of change of flux. A steady flux, however large, induces no emf.',
  d: 1, c: 'understanding', t: [1],
}));
const e1 = 100 * 5e-3 * 0.2;
add('emf-num', num({
  stem: 'A coil of 100 turns, each of area 50 cm², lies face-on in a magnetic field that increases steadily at 0.20 T s⁻¹. Find the induced emf, in volts.',
  value: Number(dec(e1, 2)), tol: 0.005, unit: 'V',
  sol: r`$\varepsilon = NA\dfrac{dB}{dt} = 100 \times 5.0 \times 10^{-3} \times 0.20 = ${dec(e1, 2)}$ V.`,
  scheme: [['ε = NA dB/dt = 0.10 V', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(e1, q.answer.value) || 'e1');
add('flux-mcq', mcq({
  stem: 'A flat coil of area 0.020 m² is in a uniform field of 0.50 T. The normal to the coil makes 60° with the field. The flux through one turn is',
  right: r`$5.0 \times 10^{-3}$ Wb`,
  wrong: [r`$8.7 \times 10^{-3}$ Wb`, r`$1.0 \times 10^{-2}$ Wb`, r`$2.5 \times 10^{-3}$ Wb`],
  sol: r`$\Phi = BA\cos 60^\circ = 0.50 \times 0.020 \times 0.5 = 5.0 \times 10^{-3}$ Wb — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(0.5 * 0.02 * 0.5, 5e-3) || 'phi');
const rt = { N: 50, A: 0.04, B: 0.25, t: 0.1 };
rt.e = (rt.N * rt.A * rt.B) / rt.t;
add('turn-num', num({
  stem: 'A coil of 50 turns and area 0.040 m² is turned in 0.10 s from facing a uniform 0.25 T field (plane perpendicular to B) to lying edge-on to it (plane parallel to B). Find the average induced emf, in volts.',
  value: rt.e, tol: 0.05, unit: 'V',
  sol: r`Flux per turn changes from $BA = 0.25 \times 0.040 = 0.010$ Wb to 0. $|\varepsilon| = \dfrac{N\Delta\Phi}{\Delta t} = \dfrac{50 \times 0.010}{0.10} = ${dec(rt.e, 2)}$ V.`,
  scheme: [['ΔΦ = BA − 0 = 0.010 Wb per turn', 1], ['ε = 5.0 V', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(rt.e, q.answer.value) || 'rt');
const sh = { B: 0.5, dA: (100 - 40) * 1e-4, t: 0.2 };
sh.e = (sh.B * sh.dA) / sh.t;
add('shrink-num', num({
  stem: 'A flexible single loop lies face-on in a uniform field of 0.50 T. It is squeezed so that its area falls from 100 cm² to 40 cm² in 0.20 s. Find the average induced emf, in millivolts.',
  value: Number(dec(sh.e * 1e3, 2)), tol: 0.2, unit: 'mV',
  sol: r`$\Delta A = (100 - 40) \times 10^{-4} = 6.0 \times 10^{-3}$ m². $|\varepsilon| = \dfrac{B\Delta A}{\Delta t} = \dfrac{0.50 \times 6.0 \times 10^{-3}}{0.20} = ${dec(sh.e, 2)}$ V, i.e. $${dec(sh.e, 2)} \times 1000 = ${dec(sh.e * 1e3, 2)}$ mV.`,
  scheme: [['ΔA in m² and ε = BΔA/Δt', 1], ['15 mV', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(sh.e * 1e3, q.answer.value) || 'sh');
add('phi-t-mcq', mcq({
  stem: 'The flux through a single loop varies as $\\Phi = (5t^2 - 4t + 1)$ mWb, with $t$ in seconds. The magnitude of the induced emf at $t = 1$ s is',
  right: '6 mV',
  wrong: ['2 mV', '10 mV', '1 mV'],
  sol: r`$\dfrac{d\Phi}{dt} = 10t - 4 = 6$ mWb s$^{-1}$ at $t = 1$ s, so $|\varepsilon| = 6$ mV — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(10 * 1 - 4, 6) || 'dphi');
add('graph-mcq', mcq({
  stem: 'On a graph of magnetic flux through a coil against time, the induced emf is largest where the graph',
  right: 'is steepest',
  wrong: ['is highest', 'crosses the time axis', 'is flat'],
  sol: 'The emf is the rate of change of flux, the slope of the graph — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('double-mcq', mcq({
  stem: 'A coil’s number of turns is doubled, and the same change of field is made in half the time. The induced emf becomes',
  right: 'four times as large',
  wrong: ['twice as large', 'the same', 'half as large'],
  sol: '$\\varepsilon = N\\Delta\\Phi/\\Delta t$: doubling N doubles it; halving Δt doubles it again — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const cq = { N: 100, dPhi: 2e-3, R: 5 };
cq.q = (cq.N * cq.dPhi) / cq.R;
add('charge-num', num({
  stem: 'A coil of 100 turns and total resistance 5.0 Ω is in a circuit. The flux through each turn changes by 2.0 × 10⁻³ Wb. Find the total charge that flows, in millicoulombs.',
  value: cq.q * 1e3, tol: 0.5, unit: 'mC',
  sol: r`$q = I\Delta t = \dfrac{\varepsilon}{R}\Delta t = \dfrac{N\Delta\Phi}{R} = \dfrac{100 \times 2.0 \times 10^{-3}}{5.0} = ${dec(cq.q, 2)}$ C, i.e. $${dec(cq.q, 2)} \times 1000 = ${dec(cq.q * 1e3, 2)}$ mC (whatever the speed of the change).`,
  scheme: [['q = NΔΦ/R', 1], ['40 mC', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(cq.q * 1e3, q.answer.value) || 'q');
add('weber-fill', fill({
  stem: 'The SI unit of magnetic flux is the ___.',
  acc: [['weber', 'Wb']],
  sol: 'The **weber** (Wb), equal to one tesla square metre.',
  d: 1, c: 'recall', t: [1],
}));
add('faraday-ar', ar({
  a: 'Moving a magnet faster into a coil gives a larger deflection of a galvanometer connected to the coil.',
  r: 'The induced emf is proportional to the rate of change of magnetic flux linkage.',
  key: 'a',
  sol: 'Both true; faster motion changes the flux faster, which by Faraday’s law gives a larger emf and current — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('charge-short', short({
  marks: 2,
  stem: 'A magnet is pushed into a coil connected to a ballistic galvanometer, first slowly and then quickly. Explain why the total charge that flows is the same both times, although the current is not.',
  model: 'The emf is $N\\Delta\\Phi/\\Delta t$, so a faster push gives a **larger current** for a **shorter time**. The charge is $q = I\\Delta t = N\\Delta\\Phi/R$, which depends only on the **total change of flux** and the resistance, the same in both pushes.',
  sol: 'q = NΔΦ/R is independent of Δt.',
  scheme: [['Faster: larger current, shorter time', 1], ['q = NΔΦ/R is the same', 1]],
  d: 3, c: 'application', t: [1],
}));

// ================================================================ t02 Lenz's law
add('pull-mcq', mcq({
  stem: 'The north pole of a bar magnet is pulled AWAY from one face of a coil. The induced current makes that face of the coil',
  right: 'a south pole, which attracts the magnet',
  wrong: ['a north pole, which repels the magnet', 'a north pole, which attracts the magnet', 'neither pole; no current flows'],
  sol: 'The induced current opposes the change (the magnet moving away), so the near face attracts it: it becomes a south pole — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('falling-mcq', mcq({
  stem: 'A bar magnet is dropped vertically through a horizontal closed copper ring. While it approaches and passes through the ring, its acceleration is',
  right: 'less than g',
  wrong: ['equal to g', 'greater than g', 'zero'],
  sol: 'The induced current in the ring opposes the relative motion: it repels the magnet as it approaches and attracts it as it leaves, so the magnet always feels an upward force — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('loopdir-mcq', mcq({
  stem: 'A horizontal loop lies on a table, seen from above. A magnetic field points vertically DOWN through it and is INCREASING. Seen from above, the induced current is',
  right: 'anticlockwise',
  wrong: ['clockwise', 'zero', 'alternately clockwise and anticlockwise'],
  sol: 'Downward flux is increasing, so the induced field must point up; an upward field at the centre needs an anticlockwise current seen from above — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => { const zAntiFromViewer = cross([0, -1, 0], [-1, 0, 0])[2]; return (zAntiFromViewer < 0) || 'dir'; }); // anticlockwise on the viewer's screen gives −z (towards the viewer = up)
add('tworing-mcq', mcq({
  stem: 'Two coaxial loops face each other. A current is suddenly switched on in loop 1. While the current is growing, the current induced in loop 2 is',
  right: 'opposite in sense to that in loop 1, so the loops repel',
  wrong: ['in the same sense as in loop 1, so the loops attract', 'opposite in sense, so the loops attract', 'zero, because loop 2 has no battery'],
  sol: 'Loop 2 opposes the growing flux from loop 1, so its current circulates the other way; antiparallel currents repel — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('energy-ar', ar({
  a: 'Lenz’s law is consistent with the law of conservation of energy.',
  r: 'Because the induced current opposes the change producing it, work must be done to keep the flux changing, and that work appears as electrical energy.',
  key: 'a',
  sol: 'Both true; R is exactly why Lenz’s law agrees with energy conservation — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('lenz-tf', tf({
  stem: 'According to Lenz’s law, the induced current always produces a field opposite to the existing magnetic field.',
  key: 'f',
  sol: 'False. It opposes the CHANGE in flux. If the flux is decreasing, the induced field is in the same direction as the existing field.',
  d: 2, c: 'understanding', t: [2],
}));
add('wirerect-mcq', mcq({
  stem: 'A long straight wire carries a steady current upwards in the plane of the page. A rectangular loop lies in the page to the right of the wire and is moved further to the right. Seen from the front, the current induced in the loop is',
  right: 'clockwise',
  wrong: ['anticlockwise', 'zero, because the current in the wire is steady', 'clockwise only while it is close to the wire'],
  sol: 'To the right of an upward current, the field points into the page. Moving away, this inward flux decreases, so the induced current makes an inward field to oppose the decrease: clockwise — option (@K).',
  d: 4, c: 'analysis', t: [2],
}), () => { const B = cross([0, -1, 0], [1, 0, 0]); const cw = cross([0, 1, 0], [-1, 0, 0]); return (B[2] > 0 && cw[2] > 0) || 'wire'; }); // B into page; clockwise on screen (right side moving down) gives +z (into page)
add('lenz-short', short({
  marks: 2,
  stem: 'A magnet falls through a vertical copper tube that is closed into a ring at the top, and through a similar ring that has a narrow cut in it. Through which ring does it fall more slowly? Explain.',
  model: 'Through the **closed** ring. There the changing flux drives an induced **current** whose field opposes the magnet’s motion (Lenz), slowing it. In the **cut** ring an emf is induced but **no current** can flow, so there is no opposing force and the magnet falls freely.',
  sol: 'Induced current needs a closed path.',
  scheme: [['Closed ring: induced current opposes motion', 1], ['Cut ring: no current, no opposing force', 1]],
  d: 3, c: 'application', t: [2],
}));
add('energy-short', short({
  marks: 2,
  stem: 'Explain how Lenz’s law follows from the conservation of energy.',
  model: 'Suppose the induced current **helped** the change, e.g. attracted an approaching magnet. The magnet would speed up, the current would grow and pull harder: electrical and kinetic energy would increase with no work done — impossible. So the current must **oppose** the change; then **work must be done** to move the magnet, and this work becomes the electrical energy.',
  sol: 'Consider what would happen if the current aided the change.',
  scheme: [['Helping current would create energy from nothing', 1], ['Opposition means work is done, which becomes electrical energy', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('direction-short', short({
  marks: 3,
  stem: 'A square loop lies in the plane of the page, in a uniform magnetic field directed out of the page. State the direction (clockwise or anticlockwise, seen from the front) of the induced current when (a) the field is increasing, (b) the field is decreasing, (c) the loop is rotated about one side so that its plane turns away from facing the field.',
  model: '(a) Outward flux increasing → induced field **into** the page → **clockwise**.\n(b) Outward flux decreasing → induced field **out of** the page → **anticlockwise**.\n(c) Turning the loop reduces the outward flux (Φ = BA cos θ falls) → induced field out of the page → **anticlockwise** (at least while the loop still faces mainly outward).',
  sol: 'Flux direction, increase or decrease, opposing field, right-hand rule.',
  scheme: [['(a) clockwise', 1], ['(b) anticlockwise', 1], ['(c) anticlockwise: flux decreasing', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => { const cw = cross([0, 1, 0], [-1, 0, 0])[2]; return (cw > 0) || 'cw'; }); // clockwise on screen → +z (into page)

// ================================================================ t03 motional emf
const rodn = 0.5 * 0.2 * 5;
add('rod-num', num({
  stem: 'A metal rod 20 cm long moves at 5.0 m s⁻¹ perpendicular to its length and to a uniform field of 0.50 T. Find the emf between its ends, in volts.',
  value: rodn, tol: 0.01, unit: 'V',
  sol: r`$\varepsilon = Blv = 0.50 \times 0.20 \times 5.0 = 0.5$ V.`,
  scheme: [['ε = Blv = 0.50 V', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(rodn, q.answer.value) || 'rod');
const wt = 4e-5 * 30 * 250;
add('wingtip-mcq', mcq({
  stem: 'An aircraft with a wingspan of 30 m flies horizontally at 250 m s⁻¹ through a region where the vertical component of the magnetic field is 4.0 × 10⁻⁵ T. The emf between its wing tips is about',
  right: '0.30 V',
  wrong: ['3.0 V', '0.030 V', '300 V'],
  sol: r`$\varepsilon = Blv = 4.0 \times 10^{-5} \times 30 \times 250 = 0.3$ V; only the vertical component is cut by the horizontal wings — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(wt, 0.3) || 'wing');
add('rodforce-mcq', mcq({
  stem: 'A rod slides on rails in a uniform field and is kept moving at constant speed by an external force. The speed is doubled. The external force needed and the power supplied become',
  right: 'twice and four times as large',
  wrong: ['the same and twice as large', 'twice and twice as large', 'four times and eight times as large'],
  sol: r`$F = \dfrac{B^2l^2v}{R} \propto v$ and $P = Fv \propto v^2$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
const rr = 0.5 * 0.2 * 40 * 0.5 ** 2;
add('rotating-num', num({
  stem: 'A copper rod 0.50 m long rotates about one end at 40 rad s⁻¹ in a plane perpendicular to a uniform field of 0.20 T. Find the emf between its ends, in volts.',
  value: rr, tol: 0.02, unit: 'V',
  sol: r`$\varepsilon = \dfrac{1}{2}B\omega l^2 = 0.5 \times 0.20 \times 40 \times 0.50^2 = 1$ V.`,
  scheme: [['ε = ½Bωl² = 1.0 V', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(rr, q.answer.value) || 'rot');
add('wheel-mcq', mcq({
  stem: 'A metal wheel with 10 spokes, each of length $l$, rotates with angular speed $\\omega$ in a plane perpendicular to a uniform field $B$. The emf between the axle and the rim is',
  right: '$\\tfrac12 B\\omega l^2$',
  wrong: ['$5B\\omega l^2$', '$10B\\omega l^2$', 'zero'],
  sol: 'Every spoke has the same emf $\\tfrac12 B\\omega l^2$ between axle and rim, and the spokes are in parallel, so the emf is that of one spoke — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('parallel-mcq', mcq({
  stem: 'A straight rod moves through a uniform magnetic field with its velocity parallel to the field. The emf between its ends is',
  right: 'zero',
  wrong: ['Blv', 'Blv/2', '2Blv'],
  sol: 'With $\\vec v \\parallel \\vec B$, $q\\vec v \\times \\vec B = 0$: the rod cuts no field lines — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('motional-ar', ar({
  a: 'A straight conductor moving through a uniform magnetic field always has an emf induced across its ends.',
  r: 'The magnetic force on a moving charge is $q\\vec v \\times \\vec B$.',
  key: 'd',
  sol: 'R is true. A is false: if the conductor moves parallel to the field, or along its own length, $\\vec v \\times \\vec B$ has no component along the rod and there is no emf — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
const tv = { m: 0.02, g: 9.8, R: 1, B: 0.5, l: 0.2 };
tv.v = (tv.m * tv.g * tv.R) / (tv.B ** 2 * tv.l ** 2);
add('terminal-short', short({
  marks: 3,
  stem: 'A horizontal rod of mass 20 g and length 20 cm slides without friction down a pair of vertical rails joined at the top through a 1.0 Ω resistor, in a horizontal field of 0.50 T perpendicular to the plane of the rails. Explain why it reaches a constant (terminal) speed and find that speed. Take g = 9.8 m s⁻².',
  model: r`As the rod falls, the emf $Blv$ drives a current $I = Blv/R$, and the force $IlB = \dfrac{B^2l^2v}{R}$ acts **upwards**, opposing the fall (Lenz). It grows with speed until it equals the weight; then the net force is zero and the speed stays constant.
$mg = \dfrac{B^2l^2v}{R}$ gives $v = \dfrac{mgR}{B^2l^2} = \dfrac{0.020 \times 9.8 \times 1.0}{0.50^2 \times 0.20^2} = ${dec(tv.v, 3)}$ m s$^{-1}$.`,
  sol: 'Balance the magnetic force B²l²v/R against mg.',
  scheme: [['Opposing force grows with speed (Lenz)', 1], ['mg = B²l²v/R', 1], ['v = 19.6 m s⁻¹', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(tv.v, 19.6) || 'tv');
const le = { a: 0.1, v: 0.05, B: 0.4 };
le.e = le.B * le.a * le.v;
add('loopenter-short', short({
  marks: 3,
  stem: 'A square loop of side 10 cm moves at a steady 5.0 cm s⁻¹ into, through and out of a region of uniform field 0.40 T that is wider than the loop, with the field perpendicular to the loop. Describe the emf while the loop (a) enters, (b) is wholly inside, (c) leaves the field, and find its size in (a).',
  model: r`(a) **Entering:** the flux grows steadily, so there is a constant emf $Bav = 0.40 \times 0.10 \times 0.050 = ${sci(le.e, 2)}$ V.
(b) **Wholly inside:** the flux is constant, so the emf is **zero**.
(c) **Leaving:** the flux falls steadily, so there is an emf of the **same size but opposite sign** (the current flows the other way).`,
  sol: 'Track the flux; emf is its rate of change.',
  scheme: [['(a) ε = Bav = 2.0 × 10⁻³ V', 1], ['(b) zero', 1], ['(c) same size, opposite direction', 1]],
  d: 3, c: 'application', t: [1, 3], wl: null,
}), () => near(le.e, 2e-3) || 'le');

// ================================================================ t04 self and mutual inductance
add('Lturns-mcq', mcq({
  stem: 'The number of turns of a long solenoid is doubled, keeping its length and cross-section the same. Its self-inductance becomes',
  right: 'four times as large',
  wrong: ['twice as large', 'half as large', 'unchanged'],
  sol: '$L = \\mu_0 N^2 A/l \\propto N^2$ — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('henry-fill', fill({
  stem: 'The SI unit of self-inductance and of mutual inductance is the ___.',
  acc: [['henry', 'H']],
  sol: 'The **henry** (H), equal to one volt second per ampere.',
  d: 1, c: 'recall', t: [4],
}));
const be = 0.4 * (5 / 0.1);
add('backemf-num', num({
  stem: 'The current in a coil of self-inductance 0.40 H falls steadily from 5.0 A to zero in 0.10 s. Find the magnitude of the induced emf, in volts.',
  value: be, tol: 0.2, unit: 'V',
  sol: r`$|\varepsilon| = L\dfrac{\Delta I}{\Delta t} = 0.40 \times \dfrac{5.0}{0.10} = ${dec(be, 2)}$ V.`,
  scheme: [['ε = L ΔI/Δt = 20 V', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(be, q.answer.value) || 'be');
const sl = { N: 1000, l: 0.5, A: 1e-3 };
sl.L = (MU0 * sl.N ** 2 * sl.A) / sl.l;
add('solL-num', num({
  stem: 'An air-cored solenoid has 1000 turns, length 50 cm and cross-sectional area 10 cm². Find its self-inductance, in millihenry (3 significant figures).',
  value: Number(dec(sl.L * 1e3, 3)), tol: 0.02, unit: 'mH',
  sol: r`$L = \dfrac{\mu_0 N^2 A}{l} = \dfrac{4\pi \times 10^{-7} \times 1000^2 \times 1.0 \times 10^{-3}}{0.50} \approx ${sci(sl.L, 3)}$ H. In mH: $${sci(sl.L, 3)} \times 10^{3} = ${dec(sl.L * 1e3, 3)}$.`,
  scheme: [['L = μ₀N²A/l', 0.5], ['≈ 2.51 mH', 0.5]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(sl.L * 1e3, q.answer.value) || 'L');
add('ironcore-mcq', mcq({
  stem: 'A soft-iron core of relative permeability 1000 is slid fully into an air-cored solenoid. Its self-inductance',
  right: 'becomes about 1000 times larger',
  wrong: ['becomes about 1000 times smaller', 'is unchanged, because L depends only on turns and size', 'becomes about 31.6 times larger'],
  sol: 'With a core, $L = \\mu_r\\mu_0 n^2 A l$ — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('Lcurrent-mcq', mcq({
  stem: 'The steady current through a coil is doubled. Its self-inductance',
  right: 'stays the same',
  wrong: ['doubles', 'halves', 'becomes four times'],
  sol: 'Flux linkage doubles with the current, so $L = N\\Phi/I$ is unchanged; L depends on geometry and core only — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const mn = 0.2 * (3 / 0.05);
add('M-num', num({
  stem: 'Two coils have a mutual inductance of 0.20 H. The current in the first coil rises steadily from 0 to 3.0 A in 0.050 s. Find the emf induced in the second coil, in volts.',
  value: mn, tol: 0.1, unit: 'V',
  sol: r`$|\varepsilon_2| = M\dfrac{\Delta I_1}{\Delta t} = 0.20 \times \dfrac{3.0}{0.050} = ${dec(mn, 2)}$ V.`,
  scheme: [['ε₂ = M ΔI₁/Δt = 12 V', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(mn, q.answer.value) || 'M');
const cx = { n1: 1000, n2: 2000, r1: 0.01, l: 0.5 };
cx.M = MU0 * cx.n1 * cx.n2 * Math.PI * cx.r1 ** 2 * cx.l;
add('coax-num', num({
  stem: 'A short solenoid of radius 1.0 cm with 1000 turns per metre lies coaxially inside a long solenoid with 2000 turns per metre; the common length is 50 cm. Find their mutual inductance, in millihenry (3 significant figures).',
  value: Number(dec(cx.M * 1e3, 3)), tol: 0.005, unit: 'mH',
  sol: r`$M = \mu_0 n_1 n_2 \pi r_1^2 l = 4\pi \times 10^{-7} \times 1000 \times 2000 \times \pi \times 0.010^2 \times 0.50 \approx ${sci(cx.M, 3)}$ H. In mH: $${sci(cx.M, 3)} \times 10^{3} = ${dec(cx.M * 1e3, 3)}$.`,
  scheme: [['M = μ₀n₁n₂πr₁²l', 1], ['≈ 0.395 mH', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(cx.M * 1e3, q.answer.value) || 'coax');
add('orientation-mcq', mcq({
  stem: 'Two coils on a circuit board must interfere with each other as little as possible. They should be placed',
  right: 'with their axes at right angles to each other',
  wrong: ['coaxially, face to face', 'side by side with parallel axes', 'one inside the other'],
  sol: 'With perpendicular axes, very little of one coil’s flux threads the other, so M is very small — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('steadyM-ar', ar({
  a: 'A steady current in one coil induces no emf in a nearby coil.',
  r: 'The emf induced in the second coil is proportional to the rate of change of current in the first.',
  key: 'a',
  sol: 'Both true; with a steady current $dI_1/dt = 0$, so $\\varepsilon_2 = -M\\,dI_1/dt = 0$, which explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('core-ar', ar({
  a: 'Inserting a soft-iron core into a coil increases its self-inductance.',
  r: 'Iron is a diamagnetic material.',
  key: 'c',
  sol: 'A is true. R is false: iron is ferromagnetic, with a very large μr, which is why L increases — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('Lcur-ar', ar({
  a: 'The self-inductance of a coil increases when the current through it increases.',
  r: 'The flux linked with a coil is proportional to the current through it.',
  key: 'd',
  sol: 'R is true. A is false: because the flux linkage is proportional to the current, their ratio L is constant — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
const eL = 0.5 * 0.2 * 3 ** 2;
add('energyL-mcq', mcq({
  stem: 'An inductor of 0.20 H carries a steady current of 3.0 A. The energy stored in its magnetic field is',
  right: '0.90 J',
  wrong: ['0.60 J', '1.8 J', '0.30 J'],
  sol: r`$U = \tfrac{1}{2}LI^2 = 0.5 \times 0.20 \times 3.0^2 = 0.9$ J — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(eL, 0.9) || 'U');
add('mutual-match', match({
  stem: 'Match each change in Column A with its effect on the mutual inductance of two coils in Column B.',
  pairs: [['Coils moved further apart', 'M decreases'], ['Common soft-iron core added', 'M increases greatly'], ['One coil turned so the axes are perpendicular', 'M becomes very small'], ['Current in the primary doubled', 'M unchanged']],
  order: [1, 3, 0, 2],
  sol: 'Apart → decreases (1 → q); iron core → increases greatly (2 → s); perpendicular → very small (3 → p); current doubled → unchanged (4 → r).',
  d: 2, c: 'understanding', t: [4],
}));
add('inertia-short', short({
  marks: 2,
  stem: 'Self-inductance is sometimes called “electrical inertia”. Explain why.',
  model: 'Mass resists **changes in velocity**; a coil’s self-inductance resists **changes in current**. When the current tries to change, the back emf $-L\\,dI/dt$ opposes the change, so the current cannot rise or fall instantly. A larger L, like a larger mass, means a stronger opposition to change.',
  sol: 'Compare L dI/dt with m dv/dt.',
  scheme: [['Opposes change in current as mass opposes change in velocity', 1], ['Back emf −L dI/dt; larger L, more opposition', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('factors-short', short({
  marks: 2,
  stem: 'State four factors on which the mutual inductance of a pair of coils depends.',
  model: 'The **numbers of turns** of the two coils; their **cross-sectional areas** (sizes); their **separation**; their **relative orientation** (coaxial or not); and the **medium/core** between them (an iron core increases M greatly). It does not depend on the currents.',
  sol: 'Geometry, arrangement and core.',
  scheme: [['Any two factors', 1], ['Two more factors', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('spark-short', short({
  marks: 2,
  stem: 'When a switch is opened in a circuit containing a large electromagnet, a spark often jumps across the switch contacts. Explain.',
  model: 'Opening the switch makes the current fall to zero **very quickly**, so $dI/dt$ is very large. The coil’s large self-inductance then induces a **large back emf** ($L\\,dI/dt$) that tries to keep the current flowing; this high voltage across the opening gap **ionises the air** and a spark jumps.',
  sol: 'Large L and large dI/dt give a large emf.',
  scheme: [['Rapid fall in current: large dI/dt', 1], ['Large induced emf ionises the air: spark', 1]],
  d: 3, c: 'application', t: [4],
}));
add('Lderive-short', short({
  marks: 3,
  stem: 'Derive an expression for the self-inductance of a long air-cored solenoid of $N$ turns, length $l$ and cross-sectional area $A$.',
  model: r`With current $I$, the field inside is uniform: $B = \mu_0 nI = \mu_0\dfrac{N}{l}I$. The flux through each turn is $BA$, so the total flux linkage is $N\Phi = N\mu_0\dfrac{N}{l}IA$. Since $N\Phi = LI$:
$$L = \dfrac{\mu_0 N^2 A}{l} = \mu_0 n^2 A l.$$
It depends only on the turns, area and length (and on $\mu_r$ if there is a core).`,
  sol: 'Flux linkage divided by current.',
  scheme: [['B = μ₀NI/l', 1], ['Flux linkage N·BA', 1], ['L = μ₀N²A/l', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));

// ================================================================ long answers (5 marks)
const fl = { N: 300, A: 0.02, B1: 0.6, t: 0.15, R: 12 };
fl.e = (fl.N * fl.A * fl.B1) / fl.t;
fl.I = fl.e / fl.R;
add('faraday-long', long({
  stem: '(a) State Faraday’s laws of electromagnetic induction and Lenz’s law. (b) Explain how Lenz’s law is a consequence of conservation of energy. (c) A coil of 300 turns and area 0.020 m², with resistance 12 Ω, lies face-on in a field of 0.60 T. The field is reduced steadily to zero in 0.15 s. Find the induced emf and current.',
  model: r`(a) **Faraday:** an emf is induced in a circuit whenever the magnetic flux linked with it changes; its magnitude equals the rate of change of flux linkage, $\varepsilon = -N\,d\Phi/dt$. **Lenz:** the induced current flows in a direction that opposes the change in flux producing it.

(b) If the induced current aided the change (e.g. attracted an approaching magnet), the magnet would accelerate and the current would grow without any work being done — energy from nothing. Because the current opposes the change, work must be done against it, and this work is converted into electrical energy and heat.

(c) $|\varepsilon| = \dfrac{NA\Delta B}{\Delta t} = \dfrac{300 \times 0.020 \times 0.60}{0.15} = ${dec(fl.e, 2)}$ V; $I = \dfrac{24}{12} = ${dec(fl.I, 2)}$ A, flowing so as to oppose the decrease in flux.`,
  sol: 'State the laws; argue from energy; then ε = NAΔB/Δt and I = ε/R.',
  scheme: [['Faraday’s laws', 1], ['Lenz’s law', 1], ['Energy argument', 1], ['ε = 24 V', 1], ['I = 2.0 A', 1]],
  d: 3, c: 'understanding', t: [1, 2], wl: null,
}), () => near(fl.e, 24) && near(fl.I, 2) || 'fl');
const ml = { B: 0.6, l: 0.25, v: 2, R: 0.5 };
ml.e = ml.B * ml.l * ml.v;
ml.I = ml.e / ml.R;
ml.F = ml.I * ml.l * ml.B;
add('motional-long', long({
  stem: '(a) A rod of length $l$ slides with speed $v$ along a pair of parallel rails in a uniform field $B$ perpendicular to the plane of the rails. Derive the emf induced in the rod. (b) Show that the magnetic force on the rod opposes its motion, and that the mechanical power needed equals the electrical power dissipated. (c) Find the emf, current and force for $B = 0.60$ T, $l = 25$ cm, $v = 2.0$ m s$^{-1}$ and circuit resistance 0.50 Ω.',
  model: r`(a) If the rod is a distance $x$ from the closed end, the flux through the circuit is $\Phi = Blx$. As the rod moves, $dx/dt = v$, so $\varepsilon = \dfrac{d\Phi}{dt} = Blv$ (in magnitude).

(b) The current is $I = Blv/R$. The rod carrying it in field $B$ feels $F = IlB = \dfrac{B^2l^2v}{R}$, directed **against** $\vec v$ (by Lenz’s law, and by $I\vec l \times \vec B$). To keep $v$ constant an equal external force is needed; its power is $Fv = \dfrac{B^2l^2v^2}{R} = I^2R$, the power dissipated in the resistance: energy is conserved.

(c) $\varepsilon = 0.60 \times 0.25 \times 2.0 = ${dec(ml.e, 2)}$ V; $I = \dfrac{0.30}{0.50} = ${dec(ml.I, 2)}$ A; $F = IlB = 0.60 \times 0.25 \times 0.60 = ${dec(ml.F, 2)}$ N.`,
  sol: 'Φ = Blx → Blv; F = IlB opposes v; P = Fv = I²R.',
  scheme: [['Φ = Blx and ε = Blv', 1], ['F = B²l²v/R opposing motion', 1], ['Fv = I²R', 1], ['ε = 0.30 V, I = 0.60 A', 1], ['F = 0.090 N', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(ml.e, 0.3) && near(ml.I, 0.6) && near(ml.F, 0.09) || 'ml');
const ro = { B: 0.5, w: 30, l: 0.4 };
ro.e = 0.5 * ro.B * ro.w * ro.l ** 2;
add('rotate-long', long({
  stem: '(a) A metal rod of length $l$ rotates with angular speed $\\omega$ about one end, in a plane perpendicular to a uniform field $B$. Derive the emf between its ends. (b) Find the emf for $B = 0.50$ T, $\\omega = 30$ rad s$^{-1}$ and $l = 40$ cm. (c) If the rod’s ends are connected through a 2.0 Ω resistor using a sliding contact, find the current and the power needed to keep it rotating (neglect friction and the rod’s resistance).',
  model: r`(a) An element $dr$ at distance $r$ from the axis moves with speed $\omega r$ perpendicular to $B$, so it contributes $d\varepsilon = B\omega r\,dr$. Adding from $0$ to $l$: $\varepsilon = \int_0^l B\omega r\,dr = \dfrac{1}{2}B\omega l^2$.

(b) $\varepsilon = 0.5 \times 0.50 \times 30 \times 0.40^2 = ${dec(ro.e, 2)}$ V.

(c) $I = \dfrac{1.2}{2.0} = ${dec(ro.e / 2, 2)}$ A; power $= \varepsilon I = 1.2 \times 0.60 = ${dec(ro.e * (ro.e / 2), 2)}$ W, supplied by whatever keeps the rod turning (the induced current’s force opposes the rotation).`,
  sol: 'Integrate Bωr dr; then Ohm’s law and P = εI.',
  scheme: [['Element emf Bωr dr', 1], ['Integration to ½Bωl²', 1], ['ε = 1.2 V', 1], ['I = 0.60 A', 1], ['P = 0.72 W', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(ro.e, 1.2) && near(ro.e * ro.e / 2, 0.72) || 'ro');
const mdl = { n1: 1500, n2: 800, r1: 0.02, l: 0.4 };
mdl.M = MU0 * mdl.n1 * mdl.n2 * Math.PI * mdl.r1 ** 2 * mdl.l;
mdl.e = mdl.M * (2 / 0.01);
add('Mderive-long', long({
  stem: '(a) Define mutual inductance. (b) Derive an expression for the mutual inductance of two long coaxial solenoids of the same length $l$, the inner of radius $r_1$ with $n_1$ turns per unit length and the outer with $n_2$ turns per unit length. (c) Find M for $n_1 = 1500$ m⁻¹, $n_2 = 800$ m⁻¹, $r_1 = 2.0$ cm, $l = 40$ cm, and the emf induced in the inner solenoid when the current in the outer one changes at 200 A s⁻¹.',
  model: r`(a) The mutual inductance M of two coils is the flux linked with one per unit current in the other: $N_1\Phi_1 = MI_2$; equivalently the emf induced in one per unit rate of change of current in the other, $\varepsilon_1 = -M\,dI_2/dt$.

(b) A current $I_2$ in the outer solenoid gives a uniform field $B_2 = \mu_0 n_2 I_2$ inside it. The inner solenoid has $n_1 l$ turns, each of area $\pi r_1^2$, so its flux linkage is $N_1\Phi_1 = (n_1 l)(\pi r_1^2)(\mu_0 n_2 I_2)$. Hence $M = \mu_0 n_1 n_2 \pi r_1^2 l$ (and $M_{12} = M_{21}$).

(c) $M = 4\pi \times 10^{-7} \times 1500 \times 800 \times \pi \times 0.020^2 \times 0.40 \approx ${sci(mdl.M, 3)}$ H; $|\varepsilon_1| = M \times 200 \approx ${sci(mdl.e, 3)}$ V.`,
  sol: 'Field of the outer solenoid times the area and turns of the inner one, per unit current.',
  scheme: [['Definition of M', 1], ['B₂ = μ₀n₂I₂ inside', 1], ['Flux linkage of inner coil and M = μ₀n₁n₂πr₁²l', 1], ['M ≈ 7.58 × 10⁻⁴ H', 1], ['ε ≈ 0.152 V', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => near(mdl.M, 7.58e-4, 0.002) && near(mdl.e, 0.1516, 0.003) || `mdl ${mdl.M}`);
const ls = { L: 0.6, I0: 4, t: 0.002 };
ls.e = (ls.L * ls.I0) / ls.t;
ls.U = 0.5 * ls.L * ls.I0 ** 2;
add('Lself-long', long({
  stem: '(a) What is self-induction? Define self-inductance and its SI unit. (b) State three factors on which the self-inductance of a coil depends. (c) An electromagnet has self-inductance 0.60 H and carries 4.0 A. When the circuit is broken, the current falls to zero in 2.0 ms. Find the average induced emf and the energy that was stored in the coil, and explain why a spark may appear at the switch.',
  model: r`(a) **Self-induction:** when the current in a coil changes, the changing flux through the coil itself induces an emf in it that opposes the change. **Self-inductance** $L$ is the flux linkage per unit current, $N\Phi = LI$, or the induced emf per unit rate of change of current, $\varepsilon = -L\,dI/dt$. Unit: **henry** (1 H = 1 V s A$^{-1}$).

(b) The number of turns (L ∝ N² for a fixed length), the area of cross-section, the length of the coil, and the permeability of the core.

(c) $|\varepsilon| = L\dfrac{\Delta I}{\Delta t} = \dfrac{0.60 \times 4.0}{2.0 \times 10^{-3}} = ${dec(ls.e, 3)}$ V. Energy stored $U = \tfrac{1}{2}LI^2 = 0.5 \times 0.60 \times 4.0^2 = ${dec(ls.U, 2)}$ J. The very large emf (about 1200 V) appears across the opening switch gap, ionising the air, and the stored energy is released in the spark.`,
  sol: 'ε = L ΔI/Δt; U = ½LI².',
  scheme: [['Self-induction and definition of L, unit', 1], ['Three factors', 1], ['ε = 1200 V', 1], ['U = 4.8 J', 1], ['Spark explained', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(ls.e, 1200) && near(ls.U, 4.8) || 'ls');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
add('data-case', mk.case({
  passage: `A student in Kanpur placed a 50-turn search coil in a magnetic field whose strength she could control, and logged the flux through EACH turn every second.

| t (s) | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Φ per turn (mWb) | 0 | 4 | 8 | 8 | 8 | 2 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'During which interval is the induced emf zero?',
      right: 't = 2 s to t = 4 s',
      wrong: ['t = 0 to t = 2 s', 't = 4 s to t = 5 s', 'at every instant, because the flux is small'],
      sol: 'Between 2 s and 4 s the flux is constant, so its rate of change, and the emf, is zero — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'Find the magnitude of the induced emf in the whole coil between t = 0 and t = 2 s, in millivolts.',
      value: 50 * (8 / 2), tol: 2, unit: 'mV',
      sol: r`$\dfrac{\Delta\Phi}{\Delta t} = \dfrac{8}{2} = 4$ mWb s$^{-1}$ per turn, so $|\varepsilon| = 50 \times 4 = 200$ mV.`,
      scheme: [['ε = N ΔΦ/Δt = 200 mV', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare the emf between t = 4 s and 5 s with that between 0 and 2 s, in size and direction.',
      model: r`From 4 s to 5 s the flux falls by 6 mWb in 1 s: $|\varepsilon| = 50 \times 6 = 300$ mV, **larger** than 200 mV because the change is faster. Its **direction is opposite**, since the flux is now decreasing instead of increasing (Lenz).`,
      sol: 'Compare slopes and signs.',
      scheme: [['300 mV, larger (faster change)', 1], ['Opposite direction (flux decreasing)', 1]],
      d: 3, c: 'analysis', t: [1, 2], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A classmate says the emf must be largest at t = 2 s to 4 s because the flux is largest then. Evaluate this claim.',
        model: 'The claim is **wrong**. The emf depends on the **rate of change** of flux, not on its value. Between 2 s and 4 s the flux is large but **constant**, so the emf is **zero**. The emf is largest between 4 s and 5 s, where the flux changes fastest.',
        sol: 'Emf depends on dΦ/dt.',
        scheme: [['Emf depends on rate of change', 1], ['Zero there; largest from 4 s to 5 s', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 200) && near(50 * 6, 300) || 'data');

const tr = { B: 5e-5, l: 1.676, v: 30 };
tr.e = tr.B * tr.l * tr.v;
add('train-case', mk.case({
  passage: 'Indian broad-gauge rails are 1.676 m apart. A train runs at 30 m s⁻¹ on a straight track insulated from the ground, in a region where the vertical component of the magnetic field is 5.0 × 10⁻⁵ T. Each steel axle, with its wheels, joins the two rails, so a sensitive voltmeter connected between the rails ahead of the train could record an emf.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which part of the train acts as the moving conductor in which the emf is induced?',
      right: 'Each axle with its two wheels, moving across the vertical field',
      wrong: ['The rails, because they are long', 'The roof of the train', 'Nothing: an emf needs a magnet to move'],
      sol: 'The axle (length equal to the gauge) moves horizontally and cuts the vertical field lines — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the emf between the rails, in millivolts (2 significant figures).',
      value: Number(dec(tr.e * 1e3, 2)), tol: 0.05, unit: 'mV',
      sol: r`$\varepsilon = Blv = 5.0 \times 10^{-5} \times 1.676 \times 30 \approx ${sci(tr.e, 3)}$ V. In mV: $${sci(tr.e, 3)} \times 10^{3} = ${dec(tr.e * 1e3, 3)}$, about ${dec(tr.e * 1e3, 2)} mV.`,
      scheme: [['ε = Blv ≈ 2.5 mV', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain how the reading could be used to measure the speed of the train, and why it is very small.',
      model: r`Since $\varepsilon = Blv$ with $B$ and $l$ fixed, the emf is **proportional to the speed**: $v = \varepsilon/(Bl)$. It is tiny (a few millivolts) because the vertical field is weak, about $5 \times 10^{-5}$ T, so a sensitive voltmeter is needed.`,
      sol: 'ε ∝ v; small B.',
      scheme: [['v = ε/(Bl), proportional', 1], ['Small because B is weak', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A student suggests that the emf would be much larger if the train ran north–south instead of east–west. Evaluate the suggestion.',
        model: 'It is **not right**. The horizontal axle cuts only the **vertical** component of the field whatever the direction of travel, since the velocity is always horizontal and perpendicular to the axle. So $\\varepsilon = B_\\text{vertical}\\,lv$ is the **same** for any direction of travel on level track.',
        sol: 'Only the vertical component matters for a horizontal axle moving horizontally.',
        scheme: [['Only vertical component is cut', 1], ['Emf independent of direction of travel', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(tr.e, 2.514e-3, 0.002) && near(q.children[1].answer.value, 2.5) || 'train');

const ch = { M: 5e-6, rate: 2e5 };
ch.e = ch.M * ch.rate;
add('charger-case', mk.case({
  passage: 'A wireless phone charger has a flat transmitter coil in its base. A rapidly changing current in this coil induces an emf in a flat receiver coil inside the phone placed on top of it. For a phone placed centrally, the mutual inductance between the coils is about 5.0 μH, and the transmitter current changes at up to 2.0 × 10⁵ A s⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The charger works on the principle of',
      right: 'mutual induction',
      wrong: ['self-induction only', 'electrostatic induction', 'the photoelectric effect'],
      sol: 'A changing current in one coil induces an emf in the other coil: mutual induction — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', num({
      stem: 'Find the peak emf induced in the receiver coil, in volts.',
      value: ch.e, tol: 0.02, unit: 'V',
      sol: r`$|\varepsilon| = M\dfrac{dI}{dt} = 5.0 \times 10^{-6} \times 2.0 \times 10^{5} = 1$ V.`,
      scheme: [['ε = M dI/dt = 1.0 V', 1]],
      d: 2, c: 'understanding', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the phone charges poorly if it is placed off-centre or several centimetres above the base.',
      model: 'Moving the receiver coil off-centre or away **reduces the flux** from the transmitter that threads it, so the **mutual inductance M falls**. The induced emf $M\\,dI/dt$ is then smaller, and too little power reaches the battery.',
      sol: 'M depends on separation and alignment.',
      scheme: [['Less flux linkage: M decreases', 1], ['Smaller emf, poorer charging', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the charger must use a changing (alternating) current in its coil rather than a steady direct current.',
        model: 'The emf in the receiver is $-M\\,dI_1/dt$. A **steady** current has $dI_1/dt = 0$, so it would induce **no emf** in the phone at all. Only a continually **changing** current keeps changing the flux and keeps inducing an emf.',
        sol: 'Emf needs dI/dt ≠ 0.',
        scheme: [['Steady current: dI/dt = 0, no emf', 1], ['Changing current keeps inducing emf', 1]],
        d: 2, c: 'understanding', t: [4],
      }),
    ]),
  ],
}), (q) => near(ch.e, 1) && near(q.children[1].answer.value, 1) || 'charger');

add('logger-case', mk.case({
  passage: 'In a school laboratory in Guwahati, a bar magnet is dropped from rest, north pole first, through a vertical coil connected to a data logger. The logger shows a short pulse of emf as the magnet enters the coil, then a second, taller and narrower pulse of the opposite sign as it leaves.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Why do the two pulses have opposite signs?',
      right: 'The flux through the coil increases as the magnet enters and decreases as it leaves',
      wrong: ['The magnet turns round inside the coil', 'The coil’s resistance changes sign', 'The north pole enters but the north pole also leaves'],
      sol: 'Entering: increasing flux; leaving: decreasing flux, so the induced emf reverses — option (@K).',
      d: 2, c: 'analysis', t: [1, 2],
    })),
    part('b', mcq({
      stem: 'Why is the second pulse taller and narrower?',
      right: 'The magnet is moving faster as it leaves, so the flux changes faster over a shorter time',
      wrong: ['The south pole is stronger than the north pole', 'The coil has more turns at the bottom', 'The induced current adds energy to the magnet'],
      sol: 'The magnet accelerates while falling, so the second change of flux happens faster: larger emf for a shorter time — option (@K).',
      d: 3, c: 'analysis', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'If the coil’s ends are joined through a resistor so that current can flow, the magnet takes slightly longer to fall through. Explain.',
      model: 'With a closed circuit an induced **current** flows. By Lenz’s law its field **opposes** the motion: the coil repels the magnet as it enters and attracts it as it leaves, so there is an upward force and the magnet falls with acceleration **less than g**. Some of its energy becomes heat in the resistor.',
      sol: 'Opposing force from the induced current.',
      scheme: [['Induced current opposes the motion (Lenz)', 1], ['Upward force, a < g; energy to heat', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the areas under the two pulses (emf × time) are equal in size.',
        model: r`The area under an emf–time pulse is $\int \varepsilon\,dt = N\Delta\Phi$, the total change of flux linkage. The flux rises by the same amount as the magnet enters as it falls when the magnet leaves, so the two areas are **equal in size** (and opposite in sign), however fast each change is.`,
        sol: '∫ε dt = NΔΦ.',
        scheme: [['Area = NΔΦ', 1], ['Same flux change in and out: equal areas', 1]],
        d: 4, c: 'analysis', t: [1],
      }),
    ]),
  ],
}));

await import('./questions-extra.mjs');
