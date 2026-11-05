// ch06 question bank, part 4: t04 moment of inertia, radius of gyration, rotational kinetic energy; long and case-based items for t02/t04.
import { mk, add, r, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { dec, v3 } from './data.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const rpm = (n) => (2 * Math.PI * n) / 60;

const al = { tau: 18, I: 6.0 };
al.a = al.tau / al.I;
add('alpha-num', num({
  stem: 'A motor applies a constant torque of 18 N m to a flywheel of moment of inertia 6.0 kg m² about its axle, which is free to turn. Find the angular acceleration of the flywheel, in rad/s².',
  value: al.a, tol: 0.01, unit: 'rad/s²',
  sol: r`$\tau = I\alpha$, so $\alpha = \dfrac{\tau}{I} = \dfrac{18}{6.0} = ${dec(al.a, 3)}$ rad/s$^2$.`,
  scheme: [['τ = I α']].map(([s]) => [s, 1]),
  d: 1, c: 'application', t: [4],
}), (q) => near(al.a, q.answer.value, 1e-9) || 'al');

add('depend-mcq', mcq({
  stem: 'A flywheel is spinning on its axle. Its moment of inertia about the axle does NOT depend on',
  right: 'the angular speed with which it is spinning',
  wrong: ['the mass of the flywheel', 'how the mass is distributed about the axle', 'the position of the axle chosen'],
  sol: 'I = Σ m r² depends on the masses, their distances from the axis and the axis chosen, not on how fast the body turns — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));

add('ringdisc-mcq', mcq({
  stem: 'A thin brass ring and a solid brass disc have the same mass and the same radius. About the axis through the centre perpendicular to their planes, the moment of inertia of the ring is',
  right: 'twice that of the disc',
  wrong: ['half that of the disc', 'equal to that of the disc', 'four times that of the disc'],
  sol: 'Ring: M R². Disc: ½ M R². The ratio is 2 : 1 — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));

add('radg-mcq', mcq({
  stem: 'The radius of gyration of a rotating body about a given axis is',
  right: 'the distance from the axis at which all the mass, concentrated at one place, would give the same moment of inertia',
  wrong: ['the distance of the centre of mass from the axis', 'the largest distance of any particle from the axis', 'half the radius of the body'],
  sol: 'It is defined by I = M k², so k = √(I/M) — option (@K).',
  d: 1, c: 'recall', t: [4],
}));

const db = { M: 3.0, R: 0.2 };
add('double-mcq', mcq({
  stem: 'A uniform circular potter’s disc is replaced by another of the same material and mass but twice the radius. About the central axis, its moment of inertia becomes',
  right: 'four times the earlier value',
  wrong: ['twice the earlier value', 'eight times the earlier value', 'unchanged, because the mass is the same'],
  sol: 'I = ½ M R² with M fixed: doubling R multiplies I by 2² = 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}));

add('sphere-mcq', mcq({
  stem: 'A solid sphere and a hollow spherical shell have the same mass and radius. About a diameter, the ratio of the moment of inertia of the solid sphere to that of the shell is',
  right: '3 : 5',
  wrong: ['5 : 3', '2 : 3', '2 : 5'],
  sol: 'Solid sphere (2/5) M R²; shell (2/3) M R². Ratio = (2/5)/(2/3) = 3/5 — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near((2 / 5) / (2 / 3), 0.6, 1e-9) || 'sph');

add('unitI-fill', fill({
  stem: 'The SI unit of the moment of inertia of a spinning top is kg ___.',
  acc: [['m²', 'm^2', 'm2', 'metre squared', 'metre²', 'square metre']],
  sol: 'I = Σ m r², so its unit is kg **m²**.',
  d: 1, c: 'recall', t: [4],
}));

add('ke-tf', tf({
  stem: 'A ring-shaped flywheel and a disc-shaped flywheel of the same mass and radius are spinning at the same angular speed. The ring stores more rotational kinetic energy.',
  key: 't',
  sol: 'True. K = ½ I ω²; the ring has I = M R², twice the disc’s ½ M R², so at the same ω it stores twice the energy.',
  d: 2, c: 'understanding', t: [4],
}));

add('sameI-tf', tf({
  stem: 'A uniform rod has the same moment of inertia about every axis, since its mass does not change with the axis.',
  key: 'f',
  sol: 'False. I = Σ m r² depends on the distances from the chosen axis; for example, for a thin rod I about its centre perpendicular to its length is M L²/12, while about the rod’s own length it is almost zero.',
  d: 1, c: 'understanding', t: [4],
}));

add('moi-ar', ar({
  a: 'The moment of inertia of a rigid body is the same about every axis.',
  r: 'The moment of inertia is the sum of m r², where r is the distance of each particle from the axis.',
  key: 'd',
  sol: 'A is false: r depends on the axis, so I does too. R is true: it is the definition of I — option (d).',
  d: 2, c: 'understanding', t: [4],
}));

add('radg-ar', ar({
  a: 'The radius of gyration of a thin ring about its central axis is equal to its radius.',
  r: 'The radius of gyration of every rigid body equals the radius of the body.',
  key: 'c',
  sol: 'A is true: I = M R² gives k = R for a ring. R is false: for a disc k = R/√2 and for a solid sphere k = R√(2/5) — option (c).',
  d: 3, c: 'analysis', t: [4],
}));

add('rotke-ar', ar({
  a: 'The kinetic energy of a disc turning about its central axis is ½ I ω².',
  r: 'The kinetic energy of a body moving in a straight line is ½ m v².',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A: ½ I ω² follows from adding ½ m v² for every particle with v = r ω, not from the linear formula alone — option (b).',
  d: 3, c: 'analysis', t: [4],
}));

const sq4 = { m: 0.25, a: 0.4 };
sq4.r2 = sq4.a ** 2 / 2;
sq4.I = 4 * sq4.m * sq4.r2;
add('sq-num', num({
  stem: 'Four beads of mass 0.25 kg each are fixed at the corners of a light square frame of side 0.40 m. Find the moment of inertia about the axis through the centre of the frame perpendicular to its plane, in kg m² (2 significant figures).',
  value: Number(dec(sq4.I, 2)), tol: 0.0005, unit: 'kg m²',
  sol: r`Each bead is at $r = 0.40/\sqrt{2}$ from the centre, so $r^2 = \dfrac{0.40^2}{2} = ${dec(sq4.r2, 2)}$ m$^2$. $I = \sum m r^2 = 4 \times 0.25 \times ${dec(sq4.r2, 2)} = ${dec(sq4.I, 2)}$ kg m$^2$.`,
  scheme: [['r² = a²/2 = 0.08 m²', 1], [`I = 4 m r² = ${dec(sq4.I, 2)} kg m²`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(4 * sq4.m * (0.2 ** 2 + 0.2 ** 2), q.answer.value, 1e-9) || 'sq4');

const kk = { I: sq4.I, M: 4 * sq4.m };
kk.k = Math.sqrt(kk.I / kk.M);
add('k-num', num({
  stem: 'For the four-bead frame (total mass 1.0 kg, moment of inertia 0.080 kg m² about the central perpendicular axis), find the radius of gyration about that axis, in m (3 significant figures).',
  value: v3(kk.k), tol: 0.002, unit: 'm',
  sol: r`$k = \sqrt{\dfrac{I}{M}} = \sqrt{\dfrac{0.080}{1.0}} = ${dec(kk.k, 3)}$ m, equal to the distance of each bead from the axis.`,
  scheme: [['k = √(I/M)', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(Math.sqrt(sq4.r2), q.answer.value, 2e-3) || 'kk');

const bd = { M: 6.0, R: 0.15 };
bd.I = 0.5 * bd.M * bd.R ** 2;
add('disc-num', num({
  stem: 'A cast-iron brake disc has mass 6.0 kg and radius 0.15 m. Treating it as a uniform solid disc, find its moment of inertia about its axle, in kg m² (3 significant figures).',
  value: v3(bd.I), tol: 0.0001, unit: 'kg m²',
  sol: r`$I = \tfrac{1}{2} M R^2 = \tfrac{1}{2} \times 6.0 \times 0.15^2 = ${dec(bd.I, 3)}$ kg m$^2$.`,
  scheme: [['I = ½ M R²', 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near(0.5 * 6 * 0.0225, q.answer.value, 2e-3) || 'bd');

const rk = { M: 40, R: 0.5, n: 600 };
rk.I = rk.M * rk.R ** 2;
rk.w = rpm(rk.n);
rk.K = 0.5 * rk.I * rk.w ** 2;
add('ringke-num', num({
  stem: 'A ring-shaped flywheel of mass 40 kg and radius 0.50 m turns at 600 revolutions per minute. Find its kinetic energy of rotation, in kJ (3 significant figures).',
  value: v3(rk.K / 1e3), tol: 0.05, unit: 'kJ',
  sol: r`$I = M R^2 = 40 \times 0.50^2 = ${rk.I}$ kg m$^2$ and $\omega = \dfrac{2\pi \times 600}{60} \approx ${dec(rk.w, 4)}$ rad/s. $K = \tfrac{1}{2} I \omega^2 \approx \tfrac{1}{2} \times ${rk.I} \times ${dec(rk.w, 4)}^2 \approx ${dec(rk.K, 4)}$ J $= ${dec(rk.K / 1e3, 3)}$ kJ.`,
  scheme: [['I = M R² = 10 kg m²; ω = 2π n/60', 1], [`K = ½ I ω² = ${dec(rk.K / 1e3, 3)} kJ`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(0.5 * 10 * rpm(600) ** 2 / 1e3, q.answer.value, 2e-3) || 'rk');

const dm = { m: 2.0, r: 0.5, w: 4.0 };
dm.I = 2 * dm.m * dm.r ** 2;
dm.K = 0.5 * dm.I * dm.w ** 2;
add('dumbbell-num', num({
  stem: 'Two 2.0 kg balls are fixed to the ends of a light rod 1.0 m long, which turns at 4.0 rad/s about a perpendicular axis through its midpoint. Find the kinetic energy of the system, in J.',
  value: dm.K, tol: 0.05, unit: 'J',
  sol: r`Each ball is $0.50$ m from the axis, so $I = 2 \times 2.0 \times 0.50^2 = ${dec(dm.I, 3)}$ kg m$^2$. $K = \tfrac{1}{2} I \omega^2 = \tfrac{1}{2} \times ${dec(dm.I, 3)} \times 4.0^2 = ${dec(dm.K, 3)}$ J.`,
  scheme: [['I = Σ m r² = 1.0 kg m²', 1], [`K = ½ I ω² = ${dec(dm.K, 3)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(2 * 0.5 * dm.m * (dm.r * dm.w) ** 2, q.answer.value, 1e-9) || 'dm');

const sk = { I1: 4.04, w1: 2.0, I2: 1.16 };
sk.w2 = (sk.I1 * sk.w1) / sk.I2;
sk.K1 = 0.5 * sk.I1 * sk.w1 ** 2;
sk.K2 = 0.5 * sk.I2 * sk.w2 ** 2;
sk.gain = sk.K2 - sk.K1;
add('stoolke-num', num({
  stem: 'A girl on a frictionless rotating stool turns at 2.0 rad/s with a total moment of inertia 4.04 kg m². She pulls two weights inwards, reducing the moment of inertia to 1.16 kg m². Find the increase in the kinetic energy of rotation, in J (3 significant figures).',
  value: v3(sk.gain), tol: 0.1, unit: 'J',
  sol: r`$\omega_2 = \dfrac{4.04 \times 2.0}{1.16} \approx ${dec(sk.w2, 4)}$ rad/s. $K_1 = \tfrac{1}{2} \times 4.04 \times 2.0^2 = ${dec(sk.K1, 3)}$ J and $K_2 = \tfrac{1}{2} \times 1.16 \times ${dec(sk.w2, 4)}^2 \approx ${dec(sk.K2, 4)}$ J. Increase $= ${dec(sk.K2, 4)} - ${dec(sk.K1, 3)} = ${dec(sk.gain, 3)}$ J, supplied by her muscles.`,
  scheme: [['ω₂ from I₁ω₁ = I₂ω₂', 1], ['K₁ = 8.08 J and K₂ ≈ 28.1 J', 1], [`Increase = ${dec(sk.gain, 3)} J`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [2, 4],
}), (q) => near(sk.I1 * sk.w1, sk.I2 * sk.w2, 1e-9) && near(sk.K2 - sk.K1, q.answer.value, 3e-3) || 'sk');

const rd = { M: 1.2, L: 0.9 };
rd.I = (rd.M * rd.L ** 2) / 12;
add('rod-num', num({
  stem: 'A thin uniform rod of mass 1.2 kg and length 0.90 m is turned about an axis through its centre perpendicular to its length. Find its moment of inertia, in kg m² (2 significant figures).',
  value: Number(dec(rd.I, 2)), tol: 0.0005, unit: 'kg m²',
  sol: r`$I = \dfrac{M L^2}{12} = \dfrac{1.2 \times 0.90^2}{12} = ${dec(rd.I, 2)}$ kg m$^2$.`,
  scheme: [['I = M L²/12 for a rod about its centre', 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near(rd.M * rd.L ** 2 / 12, q.answer.value, 0.02) || 'rd');

add('moi-short', short({
  marks: 2,
  stem: 'Define the moment of inertia of a rigid body about an axis and state two factors on which it depends.',
  model: 'The moment of inertia is the sum of the products of the mass of each particle and the square of its perpendicular distance from the axis, $I = \\sum m_i r_i^2$. It depends on the mass of the body, on how the mass is distributed about the axis, and on the position and direction of the axis.',
  sol: 'I = Σ m r²; mass, distribution, axis.',
  scheme: [['Definition I = Σ m r²', 1], ['Two factors: mass distribution, axis chosen (or the mass)', 1]],
  d: 2, c: 'recall', t: [4],
}));

add('flywheel-short', short({
  marks: 2,
  stem: 'The heavy flywheel of a diesel pump has most of its mass in a thick rim. Explain the advantage of this design.',
  model: 'Mass at the rim is far from the axis, and $I = \\sum m r^2$, so the moment of inertia is large. A large $I$ means a large kinetic energy $\\tfrac{1}{2}I\\omega^2$ at a given speed and a small change of $\\omega$ for a given torque, so the flywheel stores energy and keeps the motion steady.',
  sol: 'Large I from rim mass: stores energy, smooths the speed.',
  scheme: [['Rim mass gives a large I', 1], ['Large I stores more energy and resists changes in ω', 1]],
  d: 3, c: 'application', t: [4],
}));

add('analog-short', short({
  marks: 2,
  stem: 'Name the rotational counterparts of mass, force and linear momentum, and write the rotational form of Newton’s second law for a body turning about a fixed axis.',
  model: 'Mass corresponds to the moment of inertia $I$, force to torque $\\tau$, and linear momentum to angular momentum $L = I\\omega$. The rotational form of Newton’s second law is $\\tau = I\\alpha$, where $\\alpha$ is the angular acceleration.',
  sol: 'I, τ, L; τ = I α.',
  scheme: [['I, τ and L as counterparts', 1], ['τ = I α', 1]],
  d: 2, c: 'recall', t: [4],
}));

add('radg-short3', short({
  marks: 3,
  stem: 'Define the radius of gyration of a body. Using the standard values of the moment of inertia, find its value for a thin ring and for a uniform disc, each of radius $R$, about the central axis.',
  model: r`The radius of gyration $k$ of a body of mass $M$ is the distance from the axis at which the whole mass could be concentrated to give the same moment of inertia, so $I = Mk^2$ and $k = \sqrt{I/M}$. For a thin ring $I = MR^2$, hence $k = R$. For a uniform disc $I = \tfrac{1}{2}MR^2$, hence $k = R/\sqrt{2}$, about $0.71R$.`,
  sol: 'k = √(I/M); ring R; disc R/√2.',
  scheme: [['Definition I = M k²', 1], ['Ring: k = R', 1], ['Disc: k = R/√2', 1]],
  d: 3, c: 'understanding', t: [4],
}));

add('ke-short3', short({
  marks: 3,
  stem: 'A rigid body turns about a fixed axis with angular speed $\\omega$. Show that its kinetic energy is $\\tfrac{1}{2}I\\omega^2$.',
  model: r`A particle of mass $m_i$ at distance $r_i$ from the axis moves in a circle with speed $v_i = r_i\omega$, the same $\omega$ for every particle of a rigid body. Its kinetic energy is $\tfrac{1}{2}m_i r_i^2\omega^2$. Adding the energies of all the particles, and taking the common factor $\omega^2$ outside the sum, gives $K = \tfrac{1}{2}\left(\sum m_i r_i^2\right)\omega^2 = \tfrac{1}{2}I\omega^2$, because the bracket is the moment of inertia.`,
  sol: 'v = r ω for each particle; add ½ m v².',
  scheme: [['v_i = r_i ω', 1], ['Kinetic energy of one particle ½ m_i r_i² ω²', 1], ['Sum gives ½ I ω²', 1]],
  d: 3, c: 'understanding', t: [4],
}));

const fl = { M: 20, R: 0.4, n: 300, tau: 8.0 };
fl.I = 0.5 * fl.M * fl.R ** 2;
fl.w = rpm(fl.n);
fl.K = 0.5 * fl.I * fl.w ** 2;
fl.L = fl.I * fl.w;
fl.t = fl.L / fl.tau;
add('flywheel-long', long({
  stem: '(a) Define the moment of inertia and the radius of gyration of a body. [2] (b) A uniform disc-shaped flywheel of mass 20 kg and radius 0.40 m is brought from rest to 300 revolutions per minute by a motor. Find its moment of inertia, the final kinetic energy and hence the work done by the motor. [2] (c) The motor’s torque is constant at 8.0 N m. Find the time taken to reach this speed. [1]',
  model: r`(a) The moment of inertia is $I = \sum m_i r_i^2$, the sum of each mass times the square of its distance from the axis; the radius of gyration $k$ is the distance at which the whole mass would give the same $I$, so $I = Mk^2$. (b) For a disc $I = \tfrac{1}{2}MR^2 = ${dec(fl.I, 3)}$ kg m$^2$, and $\omega = 2\pi \times 300/60 \approx ${dec(fl.w, 4)}$ rad/s. The final kinetic energy is $K = \tfrac{1}{2}I\omega^2 \approx ${dec(fl.K, 3)}$ J, and this equals the work done by the motor. (c) The final angular momentum is $L = I\omega \approx ${dec(fl.L, 3)}$ kg m$^2$/s. A constant torque gives $\tau t = L$, so $t = ${dec(fl.L, 3)}/8.0 \approx ${dec(fl.t, 3)}$ s.`,
  sol: 'I, k; I = ½ M R²; K = ½ I ω²; t = L/τ.',
  scheme: [['(a) I = Σ m r²', 1], ['(a) I = M k²', 1], [`(b) I = ${dec(fl.I, 3)} kg m²`, 1], [`(b) K ≈ ${dec(fl.K, 3)} J = work done`, 1], [`(c) t ≈ ${dec(fl.t, 3)} s`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(fl.I, 1.6, 1e-9) && near(fl.t, (fl.K * 2 / fl.w) / fl.tau, 1e-9) || 'fl');

const sp = { M: 5.0, R: 0.1, w: 20 };
sp.I = 0.4 * sp.M * sp.R ** 2;
sp.L = sp.I * sp.w;
sp.K = 0.5 * sp.I * sp.w ** 2;
add('rigid-long', long({
  stem: '(a) For a rigid body turning about a fixed axis with angular speed $\\omega$, show that its angular momentum about the axis is $I\\omega$. [2] (b) Hence state how the torque is related to the angular acceleration. [1] (c) A solid sphere of mass 5.0 kg and radius 0.10 m turns at 20 rad/s about a diameter. Find its angular momentum and its kinetic energy. [2]',
  model: r`(a) A particle of mass $m_i$ at distance $r_i$ from the axis moves in a circle with speed $r_i\omega$ perpendicular to $r_i$, so its angular momentum about the axis is $m_i r_i^2\omega$. Adding over all the particles, with the same $\omega$ for each, gives $L = (\sum m_i r_i^2)\omega = I\omega$. (b) The torque is the rate of change of angular momentum, $\tau = dL/dt = I\,d\omega/dt = I\alpha$, for a fixed axis. (c) For a solid sphere $I = \tfrac{2}{5}MR^2 = ${dec(sp.I, 3)}$ kg m$^2$, so $L = I\omega = ${dec(sp.L, 3)}$ kg m$^2$/s and $K = \tfrac{1}{2}I\omega^2 = ${dec(sp.K, 3)}$ J.`,
  sol: 'L = Σ m r² ω = I ω; τ = I α; sphere values.',
  scheme: [['(a) Particle value m r² ω', 1], ['(a) Sum gives I ω', 1], ['(b) τ = dL/dt = I α', 1], [`(c) L = ${dec(sp.L, 3)} kg m²/s`, 1], [`(c) K = ${dec(sp.K, 3)} J`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(sp.I, 0.02, 1e-9) && near(sp.L, 0.4, 1e-9) && near(sp.K, 4, 1e-9) || 'sp');

const rf = { M: 60, R: 0.4, n: 300, tau: 12 };
rf.I = rf.M * rf.R ** 2;
rf.w = rpm(rf.n);
rf.K = 0.5 * rf.I * rf.w ** 2;
rf.t = (rf.I * rf.w) / rf.tau;
add('flywheel-case', mk.case({
  passage: 'A diesel pump on a Punjab farm has a flywheel in the form of a thin ring of mass 60 kg and radius 0.40 m, running at 300 revolutions per minute. Its mass is concentrated at the rim. When the engine is switched off, friction at the bearings applies a constant retarding torque of 12 N m.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Putting the mass of the flywheel at its rim is useful because',
      right: 'it makes the moment of inertia large, so the wheel stores more energy and changes speed slowly',
      wrong: ['it reduces the mass of the wheel without changing I', 'it makes the angular momentum zero', 'it makes the moment of inertia independent of the axis'],
      sol: 'I = Σ m r² is largest when the mass is far from the axis, so K = ½ I ω² is large and a given torque changes ω only slowly — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the kinetic energy of the flywheel at 300 revolutions per minute, in kJ (3 significant figures).',
      value: v3(rf.K / 1e3), tol: 0.02, unit: 'kJ',
      sol: r`$I = M R^2 = 60 \times 0.40^2 = ${dec(rf.I, 3)}$ kg m$^2$; $\omega = \dfrac{2\pi \times 300}{60} \approx ${dec(rf.w, 4)}$ rad/s. $K = \tfrac{1}{2} \times ${dec(rf.I, 3)} \times ${dec(rf.w, 4)}^2 \approx ${dec(rf.K, 4)}$ J $= ${dec(rf.K / 1e3, 3)}$ kJ.`,
      scheme: [['I = 9.6 kg m² and ω = 31.4 rad/s', 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the time the flywheel takes to stop after the engine is switched off.',
      model: r`The initial angular momentum is $L = I\omega = ${dec(rf.I, 3)} \times ${dec(rf.w, 4)} \approx ${dec(rf.I * rf.w, 4)}$ kg m$^2$/s. Torque is the rate of change of angular momentum, so the retarding torque of 12 N m removes it at a steady rate, and the time to stop is the angular momentum divided by the torque, $t = L/\tau \approx ${dec(rf.t, 3)}$ s.`,
      sol: 't = L/τ.',
      scheme: [['L = I ω', 1], [`t = L/τ ≈ ${dec(rf.t, 3)} s`, 1]],
      d: 3, c: 'application', t: [2, 4],
    }), [
      short({
        marks: 2,
        stem: 'A student says a solid disc of the same mass and radius, turning at the same speed, would store the same kinetic energy. Evaluate this claim.',
        model: 'The claim is **wrong**. The kinetic energy is $\\tfrac{1}{2}I\\omega^2$. For the ring $I = MR^2$ but for a solid disc $I = \\tfrac{1}{2}MR^2$, half as much, so at the same speed the disc stores only half the energy of the ring.',
        sol: 'I disc is half I ring.',
        scheme: [['Claim wrong: K depends on I', 1], ['Disc I is half the ring’s, so K is half', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(rf.I, 9.6, 1e-9) && near(rf.K, 4737.4, 1e-3) && near(rf.t, 25.13, 1e-3) && near(q.children[1].answer.value, 4.74, 2e-3) || 'rf');

void db;
