// ch05 Magnetism and Matter — question bank. Numbers are computed here and re-checked by the `check` functions.
// The syllabus treats the bar magnet's field and torque qualitatively, so those items use ratios and reasoning;
// numericals are on m = NIA, magnetisation, χ, μr and the Curie law. AR keys planned: a d a c a b a.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { MU0 } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ================================================================ t01 bar magnet, field lines, equivalent solenoid
add('loops-tf', tf({
  stem: 'Magnetic field lines of a bar magnet start on its north pole and end on its south pole, just as electric field lines start on positive and end on negative charges.',
  key: 'f',
  sol: 'False. Magnetic field lines have no ends: outside the magnet they run from N to S, and they continue inside from S to N, forming closed loops.',
  d: 1, c: 'understanding', t: [1],
}));
add('break-mcq', mcq({
  stem: 'A bar magnet is broken into three equal pieces. Each piece',
  right: 'is a complete magnet with its own north and south poles',
  wrong: ['has only a north pole or only a south pole', 'is unmagnetised except the two end pieces', 'has a north pole at both ends'],
  sol: 'Magnetic poles always come in pairs; isolated poles are not found — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('inside-mcq', mcq({
  stem: 'Inside a bar magnet, the magnetic field lines run',
  right: 'from the south pole to the north pole',
  wrong: ['from the north pole to the south pole', 'nowhere: the field inside is zero', 'perpendicular to the length of the magnet'],
  sol: 'The lines are closed loops: N → S outside, so S → N inside — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('flux-mcq', mcq({
  stem: 'A closed surface is drawn round the north-pole end of a bar magnet only (the surface cuts through the magnet). The net magnetic flux out of this surface is',
  right: 'zero',
  wrong: ['positive, because field lines leave the north pole', 'negative, because field lines enter the north pole', 'equal to μ₀ times the pole strength'],
  sol: 'Field lines are closed loops: every line leaving the surface outside re-enters it through the part that cuts the magnet, so the net flux is zero — option (@K).',
  d: 3, c: 'application', t: [1],
}));
const sm = { N: 250, A: 4e-4, I: 2 };
sm.m = sm.N * sm.I * sm.A;
add('solm-num', num({
  stem: 'A solenoid of 250 turns, each of area 4.0 cm², carries 2.0 A. Find its magnetic moment, in A m².',
  value: Number(dec(sm.m, 2)), tol: 0.005, unit: 'A m²',
  sol: r`$m = NIA = 250 \times 2.0 \times 4.0 \times 10^{-4} = ${dec(sm.m, 2)}$ A m².`,
  scheme: [['m = NIA = 0.20 A m²', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(sm.m, q.answer.value) || 'm');
add('solN-mcq', mcq({
  stem: 'Looking at one end of a current-carrying solenoid from outside, you see the current flowing anticlockwise. That end behaves like',
  right: 'a north pole',
  wrong: ['a south pole', 'neither pole, since a solenoid has no poles', 'a north pole only if the solenoid has an iron core'],
  sol: 'By the right-hand rule the field at that end points towards you, out of the solenoid, so it is a north pole — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('halfsol-mcq', mcq({
  stem: 'A long solenoid with magnetic moment $m$ is cut into two equal halves; each half keeps the same current and the same turn area. The magnetic moment of each half is',
  right: '$m/2$',
  wrong: ['$m$', '$2m$', '$m/4$'],
  sol: 'Each half has half the turns, and $m = NIA$, so each has $m/2$ — just as each half of a broken bar magnet is a weaker complete magnet — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('compare-mcq', mcq({
  stem: 'Which property is true of magnetic field lines but NOT of electrostatic field lines?',
  right: 'They always form closed loops',
  wrong: ['They never cross one another', 'Their crowding shows the field strength', 'Their tangent gives the direction of the field'],
  sol: 'The other three are true of both; electrostatic lines begin and end on charges, magnetic lines never end — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('equiv-ar', ar({
  a: 'A current-carrying solenoid behaves like a bar magnet.',
  r: 'Each turn of the solenoid acts as a small magnetic dipole, and the moments of all the turns add along the axis.',
  key: 'a',
  sol: 'Both true; the aligned moments of the turns add up to a net moment $NIA$ along the axis, giving the bar-magnet pattern — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('monopole-ar', ar({
  a: 'A magnetic field line can begin on a north pole and end there on a nearby south pole.',
  r: 'Isolated magnetic poles (monopoles) have not been found.',
  key: 'd',
  sol: 'R is true. A is false: magnetic field lines never begin or end; they continue through the magnet and form closed loops — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('cross-tf', tf({
  stem: 'Two magnetic field lines can never intersect.',
  key: 't',
  sol: 'True. At an intersection the field would have two directions at one point.',
  d: 1, c: 'recall', t: [1],
}));
add('plot-short', short({
  marks: 2,
  stem: 'Describe how you would trace the field lines of a bar magnet on a sheet of paper using a small plotting compass, and say how the result shows that the lines run from N to S outside the magnet.',
  model: 'Put the compass near the **N pole** and dot both ends of its needle. Move it so its tail is on the head dot, dot again, repeat, and join the dots. The needle’s north end always points **away from N, towards S**, so the lines run from N to S outside.',
  sol: 'Step the compass along its own direction.',
  scheme: [['Method: mark needle ends and step along, join dots', 1], ['Needle north end shows direction N → S outside', 1]],
  d: 3, c: 'application', t: [1],
}));
add('cutsol-short', short({
  marks: 2,
  stem: 'Give two observations that show that a current-carrying solenoid is equivalent to a bar magnet.',
  model: 'A freely suspended solenoid carrying current **sets north–south** like a magnet, and its ends **attract and repel** the poles of a bar magnet just as poles do. Also, iron filings round it show the **same field-line pattern** as a bar magnet, and cutting it in two gives two shorter solenoids, each with N and S ends.',
  sol: 'Directive property, attraction/repulsion, field pattern.',
  scheme: [['First observation', 1], ['Second observation', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 magnetic dipole in a uniform field; field (qualitative)
add('halfr-mcq', mcq({
  stem: 'A short bar magnet produces a field $B$ at a far point on its axis. At a point on the axis at HALF that distance (still far from the magnet), the field is about',
  right: '$8B$',
  wrong: ['$2B$', '$4B$', '$B/8$'],
  sol: 'The far field of a dipole varies as $1/r^3$: halving $r$ multiplies the field by $2^3 = 8$ — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => near(1 / 0.5 ** 3, 8) || 'r3');
add('eqax-mcq', mcq({
  stem: 'At the same large distance from a short bar magnet, the field at a point on its equatorial line compared with that at a point on its axis is',
  right: 'half as large and opposite in direction to the magnetic moment',
  wrong: ['twice as large and along the magnetic moment', 'equal and in the same direction', 'zero'],
  sol: 'By analogy with the electric dipole, $B_\\text{eq} = B_\\text{axis}/2$, pointing opposite to $\\vec m$ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('maxtorque-mcq', mcq({
  stem: 'A bar magnet in a uniform magnetic field experiences the largest torque when its axis makes an angle with the field of',
  right: '$90^\\circ$',
  wrong: ['$0^\\circ$', '$45^\\circ$', '$180^\\circ$'],
  sol: '$\\tau = mB\\sin\\theta$ is largest when $\\sin\\theta = 1$ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('uniformF-ar', ar({
  a: 'A bar magnet placed in a uniform magnetic field experiences no net force.',
  r: 'The forces on its north and south poles are equal in size and opposite in direction.',
  key: 'a',
  sol: 'Both true; the equal and opposite pole forces cancel (they form only a couple), which is why there is no net force — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('torque-num', num({
  stem: 'A bar magnet of moment 0.50 A m² is held at right angles to a uniform field of 0.040 T. Find the torque on it, in N m.',
  value: 0.5 * 0.04, tol: 0.001, unit: 'N m',
  sol: r`$\tau = mB\sin 90^\circ = 0.50 \times 0.040 \times 1 = 0.02$ N m, turning the magnet towards the field direction.`,
  scheme: [['τ = mB = 0.020 N m', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(0.02, q.answer.value) || 'tau');
add('nonuniform-mcq', mcq({
  stem: 'A small bar magnet is placed in a NON-uniform magnetic field, with its moment at an angle to the field. It experiences',
  right: 'both a net force and a torque',
  wrong: ['only a torque', 'only a net force', 'neither a force nor a torque'],
  sol: 'The two poles sit in different field strengths, so the pole forces no longer cancel; the torque remains because of the angle — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('oscill-mcq', mcq({
  stem: 'A small magnetised needle, pivoted at its centre, oscillates about the direction of a uniform field. The field is made four times stronger. The oscillations become',
  right: 'faster',
  wrong: ['slower', 'unchanged in speed', 'impossible: the needle stays fixed'],
  sol: 'A stronger field gives a larger restoring torque $mB\\sin\\theta$ for the same angle, so the needle swings back faster (its period is shorter; for small swings it halves) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('unstable-mcq', mcq({
  stem: 'A bar magnet is placed with its magnetic moment pointing exactly opposite to a uniform field. Which is correct?',
  right: 'The torque is zero, but the equilibrium is unstable',
  wrong: ['The torque is maximum', 'The equilibrium is stable', 'There is a net force along the field'],
  sol: '$\\sin 180^\\circ = 0$, so no torque; but any small turn produces a torque that turns it further away, towards alignment — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const rb = { Bax10: 8e-4 };
rb.Beq20 = rb.Bax10 / 2 / 8;
add('ratio-num', num({
  stem: 'The field of a short bar magnet at a point on its axis 10 cm from its centre is 8.0 × 10⁻⁴ T. Using the dipole ratios, estimate the field on its equatorial line 20 cm from the centre, in microtesla.',
  value: rb.Beq20 * 1e6, tol: 1, unit: 'μT',
  sol: r`Equatorial at the same distance: half, $4.0 \times 10^{-4}$ T. Doubling the distance divides by $2^3 = 8$: $\dfrac{4.0 \times 10^{-4}}{8} = ${sci(rb.Beq20, 2)}$ T. In μT: $${sci(rb.Beq20, 2)} \times 10^{6} = ${dec(rb.Beq20 * 1e6, 2)}$.`,
  scheme: [['Factor 1/2 for equatorial and 1/8 for double distance', 1], ['50 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(rb.Beq20 * 1e6, q.answer.value) || 'ratio');
add('rotate-mcq', mcq({
  stem: 'A bar magnet of moment $m$ is turned slowly in a uniform field $B$ from the stable position to the position where it points exactly against the field. The work done is',
  right: '$2mB$',
  wrong: ['$mB$', 'zero', '$mB/2$'],
  sol: 'Its potential energy rises from $-mB$ to $+mB$, so the work done is $2mB$ — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('twomag-mcq', mcq({
  stem: 'Two identical bar magnets, each of moment $m$, are laid side by side and parallel, with the N pole of one next to the S pole of the other. The net magnetic moment of the pair is',
  right: 'zero',
  wrong: ['$2m$', '$m$', '$m\\sqrt{2}$'],
  sol: 'The two moments are equal and point in opposite directions, so they cancel — option (@K). (Placed end to end, N to S in a line, they would give $2m$.)',
  d: 3, c: 'application', t: [2],
}));
add('dipole-match', match({
  stem: 'Match each quantity for an electric dipole in Column A with its analogue for a magnetic dipole (bar magnet) in Column B.',
  pairs: [['Electric dipole moment p', 'Magnetic moment m'], ['Electric field E', 'Magnetic field B'], ['Torque p × E', 'Torque m × B'], ['1/4πε₀', 'μ₀/4π']],
  order: [2, 0, 3, 1],
  sol: 'p ↔ m (1 → r); E ↔ B (2 → p); p × E ↔ m × B (3 → s); 1/4πε₀ ↔ μ₀/4π (4 → q).',
  d: 2, c: 'understanding', t: [2],
}));
add('dipole-short', short({
  marks: 3,
  stem: 'Compare, qualitatively, the magnetic field of a short bar magnet at a far point on its axis and at a point at the same distance on its equatorial line: give the direction at each, their relative sizes and how each depends on distance.',
  model: 'On the **axis**, the field points **along** the magnetic moment (S → N direction). On the **equatorial line** it points **opposite** to the moment. At the same distance the axial field is **twice** the equatorial field. Both fall as **1/r³**, so doubling the distance makes each eight times weaker — much faster than the 1/r² field of a single pole would.',
  sol: 'Use the analogy with the electric dipole.',
  scheme: [['Directions: along m on axis, opposite on equator', 1], ['Axial = 2 × equatorial', 1], ['Both ∝ 1/r³', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('torque-short', short({
  marks: 3,
  stem: 'A compass needle is displaced slightly from the direction of a uniform magnetic field and released. Explain, using the torque on a magnetic dipole, why it oscillates and finally settles along the field, and why a stronger field makes it oscillate faster.',
  model: 'The field exerts a torque $\\vec m \\times \\vec B$ ($mB\\sin\\theta$) that turns the needle **back towards the field** (net force is zero). It overshoots because of its inertia, so it **swings to and fro** about the field direction; friction and air resistance damp the motion until it **settles along** the field, the stable position. A stronger field gives a **larger restoring torque** at each angle, so the needle swings back faster.',
  sol: 'Restoring torque, inertia, damping.',
  scheme: [['Restoring torque towards the field, no net force', 1], ['Overshoot and damping: oscillates then settles', 1], ['Stronger B, larger torque, faster oscillation', 1]],
  d: 3, c: 'application', t: [2],
}));

// ================================================================ t03 magnetic properties of materials
add('classify-mcq', mcq({
  stem: 'A material has a magnetic susceptibility of $-2.0 \\times 10^{-5}$. It is',
  right: 'diamagnetic',
  wrong: ['paramagnetic', 'ferromagnetic', 'a superconductor'],
  sol: 'Small negative susceptibility means diamagnetic (a superconductor has $\\chi = -1$) — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('utube-mcq', mcq({
  stem: 'A U-tube holds a solution of a paramagnetic salt; one arm is placed between the poles of a strong electromagnet. When the magnet is switched on, the level in that arm',
  right: 'rises slightly',
  wrong: ['falls slightly', 'does not change', 'rises in the other arm instead'],
  sol: 'A paramagnetic liquid is pulled into the stronger field, so it rises in the arm between the poles — option (@K). (Water, being diamagnetic, would be pushed down slightly.)',
  d: 2, c: 'application', t: [3],
}));
add('curieT-mcq', mcq({
  stem: 'When a ferromagnetic material is heated above its Curie temperature, it',
  right: 'becomes paramagnetic',
  wrong: ['becomes diamagnetic', 'becomes more strongly ferromagnetic', 'becomes a superconductor'],
  sol: 'Thermal agitation destroys the alignment within the domains; the material is then only paramagnetic — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const mz = { m: 2, V: 5e-6 };
mz.M = mz.m / mz.V;
add('M-num', num({
  stem: 'A magnetised rod of volume 5.0 cm³ has a magnetic moment of 2.0 A m². Find its magnetisation, in kA m⁻¹.',
  value: mz.M / 1e3, tol: 2, unit: 'kA m⁻¹',
  sol: r`$V = 5.0 \times 10^{-6}$ m³; $M = \dfrac{m}{V} = \dfrac{2.0}{5.0 \times 10^{-6}} = ${sci(mz.M, 2)}$ A m$^{-1}$. In kA m$^{-1}$: $${sci(mz.M, 2)}/10^{3} = ${mz.M / 1e3}$.`,
  scheme: [['M = m/V = 400 kA m⁻¹', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(mz.M / 1e3, q.answer.value) || 'M');
const cb = { chi: 599, H: 1000 };
cb.B = MU0 * (1 + cb.chi) * cb.H;
add('chiB-num', num({
  stem: 'A material of susceptibility 599 is placed in a magnetising field (magnetic intensity) of 1000 A m⁻¹. Find the magnetic field B inside it, in tesla (3 significant figures).',
  value: Number(dec(cb.B, 3)), tol: 0.005, unit: 'T',
  sol: r`$\mu_r = 1 + \chi = 600$. $B = \mu_0\mu_r H = 4\pi \times 10^{-7} \times 600 \times 1000 \approx ${dec(cb.B, 3)}$ T.`,
  scheme: [['μr = 1 + χ = 600', 1], ['B = μ₀μrH ≈ 0.754 T', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(cb.B, q.answer.value) || 'B');
add('curie-num', num({
  stem: 'The susceptibility of a paramagnetic salt at 300 K is χ. At what temperature, in kelvin, will its susceptibility be 2χ?',
  value: 150, tol: 1, unit: 'K',
  sol: r`Curie law: $\chi T$ is constant, so $2\chi \times T = \chi \times 300$ and $T = 300/2 = 150$ K.`,
  scheme: [['χT constant', 0.5], ['T = 150 K', 0.5]],
  d: 2, c: 'application', t: [3],
}), (q) => near(300 / 2, q.answer.value) || 'T');
add('rod-mcq', mcq({
  stem: 'A small rod of bismuth is hung by a thread between the flat poles of a strong magnet. It comes to rest',
  right: 'at right angles to the field',
  wrong: ['along the field', 'at 45° to the field', 'pressed against one pole'],
  sol: 'Bismuth is diamagnetic: it tends to move to weaker-field regions, so its ends swing away from the poles and the rod sets across the field — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('supercon-mcq', mcq({
  stem: 'A material in the superconducting state has magnetic susceptibility',
  right: '−1',
  wrong: ['0', '+1', 'very large and positive'],
  sol: 'A superconductor expels the field completely ($B = 0$ inside, so $M = -H$): it is a perfect diamagnet — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('softiron-mcq', mcq({
  stem: 'The core of an electromagnet used in a scrap-metal crane is best made of',
  right: 'soft iron, which is strongly magnetised and easily demagnetised',
  wrong: ['steel, which keeps its magnetism after the current stops', 'copper, which is a good conductor', 'aluminium, which is paramagnetic'],
  sol: 'The crane must drop its load when the current is switched off, so the core must have high permeability but lose magnetisation easily — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('water-mcq', mcq({
  stem: 'A small drop of water hangs near the pole of a very strong magnet, where the field is strongest close to the pole. The drop is',
  right: 'very weakly pushed away from the pole',
  wrong: ['strongly pulled towards the pole', 'very weakly pulled towards the pole', 'unaffected, because water is not magnetic at all'],
  sol: 'Water is diamagnetic ($\\chi < 0$), so it is pushed weakly towards the weaker field, away from the pole — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('oxygen-mcq', mcq({
  stem: 'Liquid oxygen is poured slowly between the poles of a strong electromagnet. It is observed that the liquid',
  right: 'is held between the poles, because oxygen is paramagnetic',
  wrong: ['falls straight through, because oxygen is diamagnetic', 'is pushed sideways out of the gap', 'turns into a ferromagnet'],
  sol: 'Oxygen molecules have permanent moments; the liquid is pulled into the strong field and can bridge the gap — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('diaT-mcq', mcq({
  stem: 'How does the susceptibility of a diamagnetic material change with temperature?',
  right: 'It is almost independent of temperature',
  wrong: ['It varies as 1/T', 'It increases sharply with temperature', 'It becomes positive above a certain temperature'],
  sol: 'Diamagnetism comes from induced changes in electron orbits, not from aligning permanent moments, so thermal agitation hardly affects it — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('BHM-mcq', mcq({
  stem: 'Inside a magnetised iron core, $H = 2000$ A m$^{-1}$ and $M = 8.0 \\times 10^{5}$ A m$^{-1}$. The magnetic field B in the core is about',
  right: '1.0 T',
  wrong: ['$2.5 \\times 10^{-3}$ T', '0.80 T', '10 T'],
  sol: r`$B = \mu_0(H + M) = 4\pi \times 10^{-7} \times (2000 + 8.0 \times 10^{5}) \approx ${dec(MU0 * 802000, 2)}$ T; almost all of it comes from the magnetisation — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(MU0 * 802000, 1.0, 0.01) || 'BHM');
add('meissner-fill', fill({
  stem: 'The complete expulsion of a magnetic field from a superconductor is called the ___ effect.',
  acc: [['Meissner']],
  sol: 'The **Meissner** effect; it makes a superconductor a perfect diamagnet.',
  d: 1, c: 'recall', t: [3],
}));
add('curie-fill', fill({
  stem: 'Above its ___ temperature, a ferromagnetic material becomes paramagnetic.',
  acc: [['Curie']],
  sol: 'The **Curie** temperature (about 1043 K for iron).',
  d: 1, c: 'recall', t: [3],
}));
add('mur-tf', tf({
  stem: 'The relative permeability of a paramagnetic material is slightly less than 1.',
  key: 'f',
  sol: 'False. For a paramagnet χ is small and positive, so μr = 1 + χ is slightly MORE than 1; slightly less than 1 describes a diamagnet.',
  d: 1, c: 'understanding', t: [3],
}));
add('cool-tf', tf({
  stem: 'Cooling a paramagnetic salt increases its magnetic susceptibility.',
  key: 't',
  sol: 'True. By the Curie law χ = C/T, a lower absolute temperature gives a larger susceptibility, because thermal agitation disturbs the alignment less.',
  d: 2, c: 'understanding', t: [3],
}));
add('dia-ar', ar({
  a: 'Diamagnetic materials are weakly repelled by a strong magnet.',
  r: 'The atoms of a diamagnetic material have permanent magnetic moments that line up opposite to the applied field.',
  key: 'c',
  sol: 'A is true. R is false: diamagnetic atoms have no net permanent moment; the field induces small moments that oppose it — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('soft-ar', ar({
  a: 'Soft iron is preferred to steel for the core of an electromagnet.',
  r: 'Soft iron has a high permeability and loses its magnetisation easily when the current is switched off.',
  key: 'a',
  sol: 'Both true, and R gives exactly the two reasons the core must be soft iron — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('water-ar', ar({
  a: 'Water is a diamagnetic substance.',
  r: 'The field lines of a bar magnet form closed loops.',
  key: 'b',
  sol: 'Both statements are true, but they are unrelated: R does not explain A — option (b).',
  d: 1, c: 'recall', t: [1, 3],
}));
add('classes-match', match({
  stem: 'Match each material in Column A with its magnetic class in Column B.',
  pairs: [['Bismuth', 'Diamagnetic'], ['Aluminium', 'Paramagnetic'], ['Nickel', 'Ferromagnetic'], ['A superconductor below its critical temperature', 'Perfect diamagnet (χ = −1)']],
  order: [1, 3, 0, 2],
  sol: 'Bismuth → diamagnetic (1 → q); aluminium → paramagnetic (2 → s); nickel → ferromagnetic (3 → p); superconductor → perfect diamagnet (4 → r).',
  d: 1, c: 'recall', t: [3],
}));
add('heat-short', short({
  marks: 2,
  stem: 'A magnetised iron nail is heated in a flame until it glows red, and then it no longer attracts small pins. Explain why.',
  model: 'Iron is ferromagnetic only below its **Curie temperature** (about 1043 K, which red heat reaches). Heating gives the atoms so much **thermal energy** that the alignment within the **domains** is destroyed, so the nail loses its magnetisation and becomes merely **paramagnetic**, too weak to attract the pins.',
  sol: 'Domains destroyed above the Curie temperature.',
  scheme: [['Heated above the Curie temperature', 1], ['Domain alignment destroyed: becomes paramagnetic', 1]],
  d: 3, c: 'application', t: [3],
}));
add('liquid-short', short({
  marks: 2,
  stem: 'Two U-tubes contain water and a copper chloride solution, each with one arm between the poles of a strong magnet. Predict what happens to the liquid levels and explain.',
  model: 'Copper chloride solution is **paramagnetic**: it is pulled into the stronger field, so its level **rises** slightly in the arm between the poles. Water is **diamagnetic**: it is pushed towards the weaker field, so its level **falls** very slightly in that arm.',
  sol: 'Para moves to stronger field; dia to weaker.',
  scheme: [['Copper chloride rises (paramagnetic)', 1], ['Water falls slightly (diamagnetic)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('levit-short', short({
  marks: 2,
  stem: 'Explain why a small magnet can float above a superconductor cooled below its critical temperature.',
  model: 'Below its critical temperature the superconductor **expels the magnetic field** (Meissner effect): it is a **perfect diamagnet** with χ = −1. Currents on its surface create a field that **opposes** the magnet’s field, so the magnet is **repelled**; it floats where this repulsion balances its weight.',
  sol: 'Perfect diamagnetism repels the magnet.',
  scheme: [['Field expelled: perfect diamagnet', 1], ['Repulsion balances weight', 1]],
  d: 3, c: 'application', t: [3],
}));
add('domain-short', short({
  marks: 3,
  stem: 'Explain, using domains, why a piece of iron is strongly magnetised in a field although an ordinary piece of iron is not a magnet.',
  model: 'Iron consists of tiny **domains**, in each of which the atomic moments are **spontaneously aligned**, so each domain is strongly magnetised. In an ordinary piece the domains point in **random** directions and their moments **cancel**, so there is no net magnetisation. In an applied field, domains aligned with the field **grow** at the expense of others and other domains **rotate** towards the field, so their moments add and the iron becomes **strongly magnetised**.',
  sol: 'Random domains cancel; a field grows and rotates them.',
  scheme: [['Domains are spontaneously magnetised', 1], ['Random orientation cancels in unmagnetised iron', 1], ['Field: domain growth and rotation give strong magnetisation', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('diapara-short', short({
  marks: 3,
  stem: 'Distinguish between diamagnetic and paramagnetic substances on the basis of (a) the origin of their magnetism, (b) their susceptibility and its temperature dependence, (c) their behaviour in a non-uniform field. Give one example of each.',
  model: '(a) **Dia:** no permanent atomic moments; the field induces small moments that oppose it. **Para:** atoms have permanent moments that the field partly aligns.\n(b) **Dia:** χ small and negative, almost independent of temperature. **Para:** χ small and positive, falling with temperature, χ = C/T.\n(c) **Dia:** move towards weaker field. **Para:** move towards stronger field.\nExamples: bismuth (dia); aluminium (para).',
  sol: 'Compare origin, χ and behaviour.',
  scheme: [['Origin of magnetism', 1], ['Susceptibility and temperature dependence', 1], ['Behaviour in non-uniform field and examples', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
const cs = { n: 800, I: 2.5, mur: 400 };
cs.H = cs.n * cs.I;
cs.B = MU0 * cs.mur * cs.H;
cs.M = (cs.mur - 1) * cs.H;
add('core-short', short({
  marks: 3,
  stem: 'A long solenoid with 800 turns per metre carries 2.5 A. Its core has relative permeability 400. Find (a) H, (b) B in the core, (c) the magnetisation of the core.',
  model: r`(a) $H = nI = 800 \times 2.5 = ${cs.H}$ A m$^{-1}$.
(b) $B = \mu_0\mu_r H = 4\pi \times 10^{-7} \times 400 \times 2000 \approx ${dec(cs.B, 3)}$ T.
(c) $M = (\mu_r - 1)H = 399 \times 2000 = ${cs.M}$ A m$^{-1}$ (about $8.0 \times 10^{5}$).`,
  sol: 'H from the current; B = μ₀μrH; M = χH.',
  scheme: [['H = 2000 A m⁻¹', 1], ['B ≈ 1.01 T', 1], ['M ≈ 8.0 × 10⁵ A m⁻¹', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(cs.B, 1.005) && near(cs.M, 798000) || 'core');

// ================================================================ long answers (5 marks)
const l1 = { N: 500, A: 3e-4, I: 1.2 };
l1.m = l1.N * l1.I * l1.A;
add('equiv-long', long({
  stem: '(a) Explain why a bar magnet is said to be equivalent to a current-carrying solenoid, and draw (describe) the field lines of both. (b) A solenoid of 500 turns, each of area 3.0 cm², carries 1.2 A. Find its magnetic moment. (c) How does the far field of this solenoid change if (i) the distance is doubled along its axis, (ii) the point is moved to the equatorial line at the same distance?',
  model: r`(a) A solenoid carrying current produces a field identical in pattern to that of a bar magnet: closed loops that emerge from one end (N), curve round outside and enter the other end (S), continuing inside from S to N. Both have poles that cannot be separated, both set north–south when suspended, and both attract and repel other magnets in the same way. In a magnet, the electrons in the atoms act like tiny aligned current loops, so the magnet behaves as a solenoid with moment $m = NIA$.

(b) $m = NIA = 500 \times 1.2 \times 3.0 \times 10^{-4} = ${dec(l1.m, 2)}$ A m², along the axis towards the N end.

(c)(i) The far field varies as $1/r^3$: doubling the distance makes it **8 times weaker**. (ii) At the same distance on the equatorial line it is **half** the axial value and points **opposite** to $\vec m$.`,
  sol: 'Compare the field patterns; m = NIA; dipole ratios.',
  scheme: [['Equivalence explained (aligned atomic current loops)', 1], ['Field-line patterns, closed loops', 1], ['m = 0.18 A m²', 1], ['Doubling distance: 1/8', 1], ['Equatorial: half, opposite to m', 1]],
  d: 3, c: 'understanding', t: [1, 2], wl: null,
}), () => near(l1.m, 0.18) || 'm');
const l2 = { m: 0.4, B: 0.25 };
add('torque-long', long({
  stem: '(a) A bar magnet of moment $\\vec m$ lies at angle θ to a uniform field $\\vec B$. Explain why it experiences a torque but no net force, and state the torque. (b) Describe its stable and unstable equilibrium positions in terms of its potential energy. (c) A magnet of moment 0.40 A m² is in a uniform field of 0.25 T. Find the torque when θ = 30°, and the work needed to turn it from θ = 0° to θ = 180°.',
  model: r`(a) In the pole picture, the N pole is pushed along $\vec B$ and the S pole against it with equal forces: the **net force is zero**. The two forces act along different lines, forming a **couple**, so there is a torque $\vec\tau = \vec m \times \vec B$, of size $mB\sin\theta$, which turns the magnet towards the field.

(b) The potential energy is $U = -mB\cos\theta$. **Stable:** $\theta = 0^\circ$, $U = -mB$ (minimum) — a small turn produces a restoring torque. **Unstable:** $\theta = 180^\circ$, $U = +mB$ (maximum) — a small turn produces a torque that turns it further away.

(c) $\tau = mB\sin 30^\circ = 0.40 \times 0.25 \times 0.5 = ${dec(l2.m * l2.B * 0.5, 2)}$ N m. Work $W = U(180^\circ) - U(0^\circ) = 2mB = 2 \times 0.40 \times 0.25 = ${dec(2 * l2.m * l2.B, 2)}$ J.`,
  sol: 'Couple from equal and opposite pole forces; U = −mB cos θ.',
  scheme: [['No net force, couple', 1], ['τ = mB sin θ = m × B', 1], ['Stable and unstable positions with energies', 1], ['τ = 0.050 N m', 1], ['W = 2mB = 0.20 J', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(l2.m * l2.B * 0.5, 0.05) && near(2 * l2.m * l2.B, 0.2) || 'l2');
const l3 = { n: 1500, I: 2, chi: 299 };
l3.H = l3.n * l3.I;
l3.B = MU0 * (1 + l3.chi) * l3.H;
l3.M = l3.chi * l3.H;
add('quantities-long', long({
  stem: '(a) Define magnetisation M, magnetic intensity H and magnetic susceptibility χ. (b) Starting from $B = \\mu_0(H + M)$, show that $\\mu_r = 1 + \\chi$. (c) A long solenoid with 1500 turns per metre carries 2.0 A and is filled with a material of susceptibility 299. Find H, M and B in the material.',
  model: r`(a) **M:** net magnetic moment per unit volume of the material (A m$^{-1}$). **H:** the magnetic intensity set up by the free (conduction) currents, e.g. $nI$ in a solenoid (A m$^{-1}$). **χ:** the ratio $M/H$ for a linear material (no unit).

(b) $B = \mu_0(H + M) = \mu_0(H + \chi H) = \mu_0(1 + \chi)H$. Writing $B = \mu_0\mu_r H$ gives $\mu_r = 1 + \chi$.

(c) $H = nI = 1500 \times 2.0 = ${l3.H}$ A m$^{-1}$; $M = \chi H = 299 \times 3000 = ${l3.M}$ A m$^{-1}$; $B = \mu_0(1 + \chi)H = 4\pi \times 10^{-7} \times 300 \times 3000 \approx ${dec(l3.B, 3)}$ T.`,
  sol: 'Definitions; substitute M = χH; then numbers.',
  scheme: [['Definitions of M, H, χ', 1], ['μr = 1 + χ derived', 1], ['H = 3000 A m⁻¹', 1], ['M ≈ 9.0 × 10⁵ A m⁻¹', 1], ['B ≈ 1.13 T', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(l3.B, 1.131, 0.002) && near(l3.M, 897000) || `l3 ${l3.B}`);
add('classes-long', long({
  stem: 'Compare diamagnetic, paramagnetic and ferromagnetic materials under the headings: (a) atomic origin of magnetism, (b) susceptibility and relative permeability, (c) behaviour in a non-uniform magnetic field, (d) effect of temperature. Give two examples of each.',
  model: '(a) **Dia:** no permanent atomic moments; the applied field induces opposing moments. **Para:** permanent atomic moments, randomly oriented; the field partly aligns them. **Ferro:** permanent moments aligned spontaneously within **domains**.\n\n(b) **Dia:** χ small, negative; μr slightly < 1. **Para:** χ small, positive; μr slightly > 1. **Ferro:** χ and μr very large (hundreds to thousands).\n\n(c) **Dia:** move towards weaker field; a rod sets across the field. **Para:** move towards stronger field; a rod sets along it. **Ferro:** strongly pulled into strong fields.\n\n(d) **Dia:** almost unaffected. **Para:** χ = C/T (Curie law). **Ferro:** become paramagnetic above the Curie temperature.\n\nExamples — dia: bismuth, copper; para: aluminium, sodium; ferro: iron, nickel.',
  sol: 'Tabulate the three classes under each heading.',
  scheme: [['Atomic origin for all three', 1], ['χ and μr for all three', 1], ['Behaviour in non-uniform field', 1], ['Temperature dependence', 1], ['Two examples of each', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('choose-long', long({
  stem: 'An engineer must choose materials for (i) the core of an electromagnet for a door lock that must release instantly when the power is cut, and (ii) a permanent magnet for a bicycle dynamo. (a) Explain, using domains, what property each material needs. (b) Name a suitable material for each. (c) Explain why both magnets would fail if they were run very hot, above the Curie temperature of their materials. (d) Why is copper unsuitable for either?',
  model: '(a) (i) The lock core must be **strongly magnetised** while the current flows (high permeability) and lose its magnetisation **immediately** when it stops: its domains must realign easily and fall back to random orientation (a **soft** ferromagnet). (ii) The dynamo magnet must **keep** its magnetisation with no current: its domains, once aligned, must resist being disturbed (a **hard** ferromagnet).\n\n(b) (i) **Soft iron**. (ii) **Steel** or **alnico**.\n\n(c) Above the Curie temperature thermal agitation destroys the alignment within the domains; both materials become merely **paramagnetic**, so the lock would hold only weakly and the dynamo magnet would lose its magnetism.\n\n(d) Copper is **diamagnetic** (χ tiny and negative): it cannot be magnetised strongly at all.',
  sol: 'Soft vs hard ferromagnets; Curie temperature; copper is diamagnetic.',
  scheme: [['Soft: easily magnetised and demagnetised (domains)', 1], ['Hard: retains magnetisation (domains resist change)', 1], ['Soft iron; steel or alnico', 1], ['Above T_C: domains destroyed, paramagnetic', 1], ['Copper diamagnetic', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const lab = [[100, 9.0e-4], [200, 4.5e-4], [300, 3.0e-4], [400, 2.25e-4]];
add('curie-case', mk.case({
  passage: `Students at a college in Pune measured the magnetic susceptibility of a paramagnetic salt at different temperatures using a sensitive balance.

| T (K) | χ |
|---|---|
${lab.map(([t, c]) => `| ${t} | ${(c * 1e4).toFixed(2)} × 10⁻⁴ |`).join('\n')}`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement describes the data?',
      right: 'χ × T is constant, so χ is inversely proportional to T',
      wrong: ['χ increases linearly with T', 'χ is independent of T', 'χ is negative, so the salt is diamagnetic'],
      sol: 'Each product χT is $9.0 \\times 10^{-2}$ K: the Curie law χ = C/T — option (@K).',
      d: 2, c: 'analysis', t: [3],
    })),
    part('b', num({
      stem: 'Find the Curie constant C of the salt, in kelvin.',
      value: 0.09, tol: 0.002, unit: 'K',
      sol: r`$C = \chi T = 3.0 \times 10^{-4} \times 300 = 0.09$ K (the same from every row).`,
      scheme: [['C = χT = 0.090 K', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Predict the susceptibility at 50 K and explain the trend in terms of atomic moments.',
      model: r`$\chi = C/T = 0.09/50 = 1.8 \times 10^{-3}$. At lower temperature, thermal agitation is weaker, so the applied field lines up the **permanent atomic moments** more effectively and the magnetisation (and χ) is larger.`,
      sol: 'Use C/T; relate to thermal agitation.',
      scheme: [['χ = 1.8 × 10⁻³', 1], ['Less thermal agitation, better alignment', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'One student claims the salt must be ferromagnetic because its susceptibility rises sharply on cooling. Evaluate this claim using the data.',
        model: 'The claim is **wrong**. The susceptibilities are tiny (about 10⁻⁴), whereas a ferromagnet has χ of hundreds or more. Their exact **1/T** dependence is the Curie law, the signature of a **paramagnet**. A rise on cooling does not by itself indicate ferromagnetism.',
        sol: 'Compare the size of χ and the form of its temperature dependence.',
        scheme: [['χ far too small for a ferromagnet', 1], ['1/T law shows paramagnetism', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => lab.every(([t, c]) => near(t * c, 0.09)) && near(q.children[1].answer.value, 0.09) || 'curie');

const cr = { n: 500, I: 4, mur: 600 };
cr.H = cr.n * cr.I;
cr.B = MU0 * cr.mur * cr.H;
add('crane-case', mk.case({
  passage: 'A scrap yard near Alang uses a large electromagnet on a crane to lift iron scrap. Its coil has 500 turns per metre of core length and carries 4.0 A; the core has relative permeability 600. When the operator switches off the current, the scrap must drop at once.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The most suitable material for the core is',
      right: 'soft iron',
      wrong: ['hardened steel', 'copper', 'bismuth'],
      sol: 'Soft iron has a high permeability and loses its magnetisation as soon as the current stops — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Treating the coil as a long solenoid, find the magnetic field in the core, in tesla (3 significant figures).',
      value: Number(dec(cr.B, 3)), tol: 0.01, unit: 'T',
      sol: r`$H = nI = 500 \times 4.0 = 2000$ A m$^{-1}$; $B = \mu_0\mu_r H = 4\pi \times 10^{-7} \times 600 \times 2000 \approx ${dec(cr.B, 3)}$ T.`,
      scheme: [['B ≈ 1.51 T', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain, using domains, why the core makes the magnet so much stronger than the coil alone.',
      model: r`The coil’s field aligns the **domains** of the iron core with it, so the core becomes strongly **magnetised** ($M = (\mu_r - 1)H$, about 600 times H). The field of the aligned domains adds to that of the coil, so B is about **600 times** larger than with an empty coil ($\mu_0 H \approx 2.5$ mT).`,
      sol: 'Domain alignment multiplies B by μr.',
      scheme: [['Coil field aligns the domains', 1], ['B multiplied about μr = 600 times', 1]],
      d: 3, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A supplier offers a cheaper hardened-steel core. Evaluate this offer for the crane.',
        model: 'Steel is a **hard** ferromagnet: after the current is switched off it **keeps** much of its magnetisation. The scrap would stay stuck to the core instead of dropping, making the crane unsafe and slow. The offer should be **rejected**; soft iron is needed.',
        sol: 'Hard ferromagnets retain magnetisation.',
        scheme: [['Steel retains magnetisation', 1], ['Scrap would not release: reject', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(cr.B, 1.508, 0.002) && near(q.children[1].answer.value, 1.51) || 'crane');

const fd = { B10: 4e-4 };
fd.Beq20 = fd.B10 / 2 / 8;
add('probe-case', mk.case({
  passage: 'A student uses a smartphone magnetometer app to measure the field of a small bar magnet in a room in Jaipur, far from other magnets. With the phone on the magnet’s axis, she records 400 μT at 10 cm and 50 μT at 20 cm from the magnet’s centre (after subtracting the background field).',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What do her two readings show about the field on the axis?',
      right: 'It varies as 1/r³, like the field of a dipole',
      wrong: ['It varies as 1/r, like the field of a long wire', 'It varies as 1/r², like the field of a single pole', 'It is uniform'],
      sol: 'Doubling the distance divides the field by 400/50 = 8 = 2³ — option (@K).',
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', num({
      stem: 'Predict the reading, in μT, with the phone on the magnet’s equatorial line 20 cm from its centre.',
      value: fd.Beq20 * 1e6, tol: 0.5, unit: 'μT',
      sol: r`At 20 cm on the axis the field is 50 μT; on the equator at the same distance it is half: $50/2 = 25$ μT.`,
      scheme: [['25 μT', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'At the equatorial point, in which direction would the app show the field, relative to the magnet’s N–S axis? Explain.',
      model: 'The field on the equatorial line points **opposite to the magnetic moment**, i.e. parallel to the magnet’s axis but from its **N end towards its S end**. This matches the field lines, which run outside the magnet from N round to S.',
      sol: 'Equatorial field is antiparallel to m.',
      scheme: [['Parallel to the axis, from N towards S (opposite to m)', 1], ['Linked to field lines running N → S outside', 1]],
      d: 3, c: 'understanding', t: [1, 2],
    }), [
      short({
        marks: 2,
        stem: 'Her friend measures 400 μT at 10 cm but then 200 μT at 20 cm with a different object, and says it is also a bar magnet. Evaluate this conclusion.',
        model: 'The conclusion is **doubtful**. Halving of the field on doubling the distance means the field falls as **1/r**, not 1/r³; a short bar magnet (dipole) should give a fall by a factor of **8**. The object behaves more like a long current-carrying wire or a long magnet whose far end is not far away.',
        sol: 'Compare the ratio 2 with the dipole ratio 8.',
        scheme: [['Ratio 2 means 1/r, not 1/r³', 1], ['Not a short dipole: conclusion doubtful', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(400 / 50, 8) && near(q.children[1].answer.value, 25) || 'probe');

add('maglev-case', mk.case({
  passage: 'In a science exhibition in Chennai, a small disc of a high-temperature superconductor is cooled with liquid nitrogen (77 K). A small neodymium magnet placed above it floats steadily in mid-air. When the disc warms up above its critical temperature, the magnet drops onto it.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'While cold, the superconductor behaves as',
      right: 'a perfect diamagnet, with χ = −1',
      wrong: ['a strong ferromagnet', 'a paramagnet obeying the Curie law', 'a non-magnetic material, χ = 0'],
      sol: 'It expels the magnetic field completely (Meissner effect): χ = −1 — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', mcq({
      stem: 'The magnetic field inside the cold superconductor is',
      right: 'zero',
      wrong: ['equal to the field of the magnet', 'larger than outside', 'reversed but equal in size'],
      sol: 'With χ = −1, M = −H and B = μ₀(H + M) = 0 — option (@K).',
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the magnet floats while the disc is cold and drops when it warms.',
      model: 'While cold, the superconductor **expels** the magnet’s field: currents on its surface produce a field opposing the magnet’s, so the magnet is **repelled** and floats where the repulsion balances its weight. Above the critical temperature the material is no longer superconducting; it is only weakly magnetic, the repulsion **disappears** and the magnet falls.',
      sol: 'Repulsion by perfect diamagnetism; lost above the critical temperature.',
      scheme: [['Field expelled, magnet repelled, balances weight', 1], ['Above critical temperature repulsion vanishes', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A visitor suggests that an ordinary diamagnet such as a copper disc should make the magnet float too. Evaluate this suggestion.',
        model: 'The suggestion is **wrong** in practice. Copper is diamagnetic, but its χ is only about **−10⁻⁵**, so the repulsive force is about **100 000 times** weaker than for a superconductor (χ = −1) — far too small to support the magnet’s weight.',
        sol: 'Compare the size of χ.',
        scheme: [['Copper χ ≈ −10⁻⁵, tiny', 1], ['Repulsion far too weak to support the magnet', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}));
add('rodset-short', short({
  marks: 2,
  stem: 'Small rods of aluminium and of bismuth are hung in turn between the flat poles of a strong magnet. Predict how each sets and explain.',
  model: 'Aluminium is **paramagnetic**: its ends are drawn towards the stronger field near the poles, so the rod sets **along** the field. Bismuth is **diamagnetic**: its ends are pushed towards the weaker field away from the poles, so the rod sets **across** the field.',
  sol: 'Para moves to stronger field, dia to weaker.',
  scheme: [['Aluminium along the field (paramagnetic)', 1], ['Bismuth across the field (diamagnetic)', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- application items added in the verifier pass (competency balance)
const eqs = { m: 0.24, I: 1.2, A: 2e-4 };
eqs.N = eqs.m / (eqs.I * eqs.A);
add('turns-mcq', mcq({
  stem: 'A bar magnet of moment 0.24 A m² is to be replaced by an equivalent solenoid whose turns have area 2.0 cm² and carry 1.2 A. How many turns are needed?',
  right: '1000',
  wrong: ['100', '500', '2000'],
  sol: r`$N = \dfrac{m}{IA} = \dfrac{0.24}{1.2 \times 2.0 \times 10^{-4}} = 1000$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(eqs.N, 1000) || 'N');
add('likepoles-mcq', mcq({
  stem: 'Two identical bar magnets lie on one straight line with their north poles facing each other a short distance apart. At the point midway between the two north poles, the magnetic field due to the magnets is',
  right: 'zero',
  wrong: ['twice the field of one magnet', 'directed towards one of the magnets', 'perpendicular to the line of the magnets'],
  sol: 'By symmetry the two magnets give equal fields in opposite directions at the midpoint (each points away from its own north pole), so they cancel — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('compass-eq-mcq', mcq({
  stem: 'Ignoring the Earth’s field, a small compass is placed on the equatorial line of a bar magnet, some distance from it. The north end of the compass needle points',
  right: 'parallel to the magnet, in the direction from the magnet’s N end towards its S end',
  wrong: ['parallel to the magnet, in the direction from its S end towards its N end', 'straight towards the centre of the magnet', 'straight away from the magnet'],
  sol: r`The needle lines up with $\vec B$. On the equatorial line $\vec B$ is opposite to $\vec m$ (which points S → N), i.e. it points from the N end towards the S end — option (@K).`,
  d: 3, c: 'application', t: [2],
}));
const mr = { B: 0.88, H: 1000 };
mr.mur = mr.B / (4 * Math.PI * 1e-7 * mr.H);
add('mur-num', num({
  stem: 'In an iron core, the magnetic field is 0.88 T when the magnetic intensity is 1000 A m⁻¹. Find the relative permeability of the iron (to the nearest 10).',
  value: Math.round(mr.mur / 10) * 10, tol: 5, unit: null,
  sol: r`$\mu_r = \dfrac{B}{\mu_0 H} = \dfrac{0.88}{4\pi \times 10^{-7} \times 1000} \approx ${Math.round(mr.mur)}$, i.e. about ${Math.round(mr.mur / 10) * 10}.`,
  scheme: [['μr = B/(μ₀H)', 1], ['μr ≈ 700', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(mr.mur, q.answer.value, 0.01) || `mur ${mr.mur}`);
add('celsius-mcq', mcq({
  stem: 'A paramagnetic salt has susceptibility χ at 27 °C. Its susceptibility at −73 °C is',
  right: '1.5χ',
  wrong: ['0.37χ (27/73)', '2.7χ', 'χ, because the Curie law needs kelvin'],
  sol: r`Use kelvin: 300 K and 200 K. $\chi T$ is constant, so the new value is $\chi \times 300/200 = 1.5\chi$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(300 / 200, 1.5) || 'K');
add('nickel-mcq', mcq({
  stem: 'A nickel ball hangs from a thread so that it is pulled sideways by a magnet. When the ball is heated to about 360 °C it swings back and hangs vertically; on cooling it is pulled again. The best explanation is that at about 360 °C nickel',
  right: 'passes its Curie temperature and becomes only paramagnetic',
  wrong: ['becomes diamagnetic and is repelled', 'melts, losing its domains permanently', 'becomes a superconductor'],
  sol: 'Nickel’s Curie temperature is about 631 K (358 °C). Above it the domains break up and the attraction becomes very weak; below it they re-form on cooling — option (@K).',
  d: 2, c: 'application', t: [3],
}));
