// ch02 Electrostatic Potential and Capacitance — question bank. Every numerical value is computed here from the givens
// and re-checked by the `check` functions; AR keys planned: a a c a d c b.
import { mk, add, r, K, EPS0, QE, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const ser = (...cs) => 1 / cs.reduce((s, c) => s + 1 / c, 0);

// ================================================================ t01 potential and potential difference
const pv = (K * 2e-9) / 0.3;
add('pointV-num', num({
  stem: 'Find the electric potential 30 cm from a point charge of +2.0 nC in air, in volts.',
  value: Number(dec(pv, 2)), tol: 1, unit: 'V',
  sol: r`$V = \dfrac{kq}{r} = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-9}}{0.30} = ${dec(pv, 2)}$ V.`,
  scheme: [['V = kq/r = 60 V', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(pv, q.answer.value) || 'V');
add('square0-mcq', mcq({
  stem: 'Charges $+q$, $+q$, $-q$ and $-q$ are placed at the corners of a square (the two positive charges at adjacent corners). At the centre of the square',
  right: '$V = 0$ but $E \\neq 0$',
  wrong: ['$V = 0$ and $E = 0$', '$V \\neq 0$ but $E = 0$', '$V \\neq 0$ and $E \\neq 0$'],
  sol: r`All four charges are equally far from the centre, so the potentials cancel: $V = 0$. The fields of the two positive charges point away from them and those of the negative charges towards them; they add to a field pointing from the positive side to the negative side — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => {
  const ch = [[0, 0, 1], [1, 0, 1], [1, 1, -1], [0, 1, -1]];
  let v = 0; let ex = 0; let ey = 0;
  for (const [x, y, q] of ch) { const dx = 0.5 - x; const dy = 0.5 - y; const d = Math.hypot(dx, dy); v += q / d; ex += (q * dx) / d ** 3; ey += (q * dy) / d ** 3; }
  return (Math.abs(v) < 1e-12 && Math.hypot(ex, ey) > 1) || 'square';
});
add('zeroV-ar', ar({
  a: 'At a point on the equatorial line of an electric dipole the potential is zero, but the electric field is not zero.',
  r: 'Potential is a scalar, so the equal and opposite contributions cancel, whereas the fields are vectors whose components along the dipole axis add.',
  key: 'a',
  sol: 'Both true, and R explains A: the two potentials $\\pm kq/\\sqrt{r^2+a^2}$ cancel, while the axial components of the two fields add to $kp/(r^2+a^2)^{3/2}$ — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
const wab = 3e-6 * (80 - 20);
add('workAB-num', num({
  stem: 'Find the work done by an external agent in slowly moving a charge of +3.0 μC from a point at 20 V to a point at 80 V. Give your answer in millijoules (mJ).',
  value: Number(dec(wab * 1e3, 2)), tol: 0.005, unit: 'mJ',
  sol: r`$W = q(V_B - V_A) = 3.0 \times 10^{-6} \times (80 - 20) = ${sci(wab, 2)}$ J. In mJ: $${sci(wab, 2)} \times 10^{3} = ${dec(wab * 1e3, 2)}$.`,
  scheme: [['W = q(V_B − V_A) = 1.8 × 10⁻⁴ J = 0.18 mJ', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(wab * 1e3, q.answer.value) || 'W');
const vd = { V: 500, E: 250 };
vd.r = vd.V / vd.E;
vd.q = (vd.V * vd.r) / K;
add('VE-mcq', mcq({
  stem: 'At a certain point near an isolated point charge, the potential is 500 V and the field is 250 N C$^{-1}$. The distance of the point from the charge is',
  right: '2.0 m',
  wrong: ['0.50 m', '4.0 m', '1.0 m'],
  sol: r`$V = kq/r$ and $E = kq/r^2$, so $r = V/E = 500/250 = 2$ m — option (@K). (Then $q = Vr/k \approx ${sci(vd.q, 2)}$ C.)`,
  d: 3, c: 'application', t: [1],
}), () => near(vd.r, 2) || 'r');
add('dipole60-mcq', mcq({
  stem: 'The potential at a point on the axis of a short dipole, a distance $r$ from its centre, is $V$. At the same distance, on a line making $60^\\circ$ with the axis, the potential is',
  right: '$V/2$',
  wrong: ['$V$', '$V\\sqrt{3}/2$', '$2V$'],
  sol: r`$V(\theta) = kp\cos\theta/r^2$ and $\cos 60^\circ = 0.5$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(Math.cos(Math.PI / 3), 0.5) || 'cos');
add('sphereV-mcq', mcq({
  stem: 'A hollow metal sphere of radius 10 cm is charged so that the potential at its surface is 450 V. The potential at a point 5 cm from its centre is',
  right: '450 V',
  wrong: ['0 V', '900 V', '225 V'],
  sol: 'Inside a conductor $E = 0$, so the potential is the same as at the surface — option (@K).',
  d: 2, c: 'application', t: [1, 4],
}));
add('downhill-tf', tf({
  stem: 'A positive charge released from rest in an electric field moves from a region of lower potential to a region of higher potential.',
  key: 'f',
  sol: 'False. The field points towards lower potential, so a free positive charge moves from higher to lower potential (a negative charge does the opposite).',
  d: 1, c: 'understanding', t: [1],
}));
add('volt-fill', fill({
  stem: 'One volt is equal to one ___ per coulomb.',
  acc: [['joule', 'J']],
  sol: 'One **joule** per coulomb: 1 V is the potential difference across which 1 C gains or loses 1 J.',
  d: 1, c: 'recall', t: [1],
}));
const sqv = { qsum: (1 + 2 - 3 + 4) * 1e-9, d: 0.1 * Math.SQRT2 };
sqv.V = (K * sqv.qsum) / sqv.d;
add('squareV-num', num({
  stem: 'Charges of +1, +2, −3 and +4 nC are placed at the corners of a square of side 20 cm. Find the potential at the centre of the square, in volts (to 3 significant figures).',
  value: Number(dec(sqv.V, 3)), tol: 2, unit: 'V',
  sol: r`Each corner is $0.10\sqrt{2} = ${dec(sqv.d, 3)}$ m from the centre. $V = \dfrac{k(q_1 + q_2 + q_3 + q_4)}{r} = \dfrac{9 \times 10^{9} \times 4 \times 10^{-9}}{0.1414} = ${dec(sqv.V, 3)}$ V.`,
  scheme: [['Distance 0.141 m and algebraic sum 4 nC', 1], ['V ≈ 255 V', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(sqv.V, q.answer.value) || 'Vc');

// ================================================================ t02 equipotentials, E and V
add('equiwork-mcq', mcq({
  stem: 'A charge of 5 μC is carried along a closed path that lies entirely on an equipotential surface at 200 V. The work done is',
  right: 'zero',
  wrong: ['1 mJ', '−1 mJ', '40 J'],
  sol: 'Every step is between points at the same potential, so $W = q\\Delta V = 0$ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('perp-mcq', mcq({
  stem: 'The angle between an electric field line and an equipotential surface at the point where they meet is',
  right: '$90^\\circ$',
  wrong: ['$0^\\circ$', '$45^\\circ$', '$180^\\circ$'],
  sol: 'If $\\vec E$ had a component along the surface, work would be done moving along it — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
const eq = { dV: 10, d: 0.02 };
add('Espacing-num', num({
  stem: 'In a uniform field, equipotential planes at 10 V intervals are 2.0 cm apart. Find the field strength, in V m⁻¹.',
  value: eq.dV / eq.d, tol: 2, unit: 'V m⁻¹',
  sol: r`$E = \dfrac{\Delta V}{d} = \dfrac{10}{0.020} = ${eq.dV / eq.d}$ V m$^{-1}$, pointing towards lower potential.`,
  scheme: [['E = ΔV/d = 500 V m⁻¹', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(eq.dV / eq.d, q.answer.value) || 'E');
add('gradient-mcq', mcq({
  stem: 'Along the x-axis the potential is $V = 4x^2$ volts, with $x$ in metres. The electric field at $x = 1$ m is',
  right: '8 V m$^{-1}$ along the negative x-direction',
  wrong: ['8 V m$^{-1}$ along the positive x-direction', '4 V m$^{-1}$ along the negative x-direction', 'zero'],
  sol: r`$E_x = -\dfrac{dV}{dx} = -8x = -8$ V m$^{-1}$ at $x = 1$ m — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(-8 * 1, -8) || 'grad');
add('cross-ar', ar({
  a: 'Two different equipotential surfaces can never intersect.',
  r: 'At a point of intersection the potential would have two different values.',
  key: 'a',
  sol: 'Both true, and R is exactly the reason for A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('spacing-tf', tf({
  stem: 'For an isolated point charge, equipotential surfaces drawn for equal steps of potential are equally spaced.',
  key: 'f',
  sol: 'False. $V \\propto 1/r$, so equal steps of $V$ need bigger and bigger steps of $r$: the surfaces spread out away from the charge.',
  d: 2, c: 'understanding', t: [2],
}));
add('shapes-match', match({
  stem: 'Match each charge arrangement in Column A with the shape of its equipotential surfaces in Column B.',
  pairs: [['Isolated point charge', 'Concentric spheres'], ['Uniform field between large plates', 'Parallel planes'], ['Long straight charged wire', 'Coaxial cylinders'], ['Electric dipole', 'Closed surfaces round each charge, with a flat V = 0 plane midway']],
  order: [2, 0, 3, 1],
  sol: 'Point charge → spheres (1 → r); uniform field → planes (2 → p); wire → coaxial cylinders (3 → s); dipole → closed surfaces with a zero plane (4 → q).',
  d: 2, c: 'understanding', t: [2],
}));
add('constV-mcq', mcq({
  stem: 'In a region of space the electric potential has the same value everywhere. The electric field in that region is',
  right: 'zero',
  wrong: ['uniform and non-zero', 'equal to the potential divided by the size of the region', 'directed towards the boundary'],
  sol: '$E = -dV/dl = 0$ when $V$ does not change — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('equi-short', short({
  marks: 2,
  stem: 'Explain why the electric field at any point is perpendicular to the equipotential surface through that point.',
  model: 'Moving a charge along an equipotential takes **no work**, since $\\Delta V = 0$. If the field had a component **along** the surface, that component would do work on a charge moved along it. So the field can have **no tangential component**: it must be perpendicular to the surface.',
  sol: 'Argue from W = qΔV = 0 along the surface.',
  scheme: [['No work along an equipotential', 1], ['So no tangential field component: E is perpendicular', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 potential energy
const u2 = (K * 2e-6 * -3e-6) / 0.3;
add('twoU-num', num({
  stem: 'Find the electrostatic potential energy of a system of charges +2.0 μC and −3.0 μC placed 30 cm apart in air, in joules.',
  value: Number(dec(u2, 2)), tol: 0.005, unit: 'J',
  sol: r`$U = \dfrac{kq_1q_2}{r} = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-6} \times (-3.0 \times 10^{-6})}{0.30} = ${dec(u2, 2)}$ J (negative: the system is bound).`,
  scheme: [['U = kq₁q₂/r with signs = −0.18 J', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(u2, q.answer.value) || 'U');
const sep = (K * 5e-9 * -2e-9) / 0.1;
add('separate-mcq', mcq({
  stem: 'Charges of +5.0 nC and −2.0 nC are 10 cm apart. The minimum work needed to pull them apart to a very large separation is',
  right: r`$${sci(-sep, 2)}$ J`,
  wrong: [r`$${sci(sep, 2)}$ J`, r`$${sci(-sep * 10, 2)}$ J`, '0'],
  sol: r`$U = \dfrac{9 \times 10^{9} \times 5.0 \times 10^{-9} \times (-2.0 \times 10^{-9})}{0.10} = ${sci(sep, 2)}$ J. Final $U = 0$, so $W = 0 - U = ${sci(-sep, 2)}$ J — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(-sep, 9e-7) || 'sep');
add('square4-mcq', mcq({
  stem: 'Four equal charges $q$ are at the corners of a square of side $a$. The potential energy of the system is',
  right: r`$\dfrac{kq^2}{a}\left(4 + \sqrt{2}\right)$`,
  wrong: [r`$\dfrac{4kq^2}{a}$`, r`$\dfrac{kq^2}{a}\left(4 + 2\sqrt{2}\right)$`, r`$\dfrac{6kq^2}{a}$`],
  sol: r`Six pairs: four sides (distance $a$) and two diagonals (distance $a\sqrt{2}$). $U = \dfrac{kq^2}{a}\left(4 + \dfrac{2}{\sqrt{2}}\right) = \dfrac{kq^2}{a}(4 + \sqrt{2})$ — option (@K).`,
  d: 4, c: 'application', t: [3],
}), () => near(4 + 2 / Math.SQRT2, 4 + Math.SQRT2) || 'pairs');
const rot = { p: 4e-9, E: 5e4 };
rot.W = 2 * rot.p * rot.E;
add('rotate-num', num({
  stem: 'A dipole of moment 4.0 × 10⁻⁹ C m is aligned with a uniform field of 5.0 × 10⁴ N C⁻¹. Find the work needed to turn it through 180°, in millijoules (mJ).',
  value: Number(dec(rot.W * 1e3, 2)), tol: 0.01, unit: 'mJ',
  sol: r`$W = U(180^\circ) - U(0^\circ) = pE - (-pE) = 2pE = 2 \times 4.0 \times 10^{-9} \times 5.0 \times 10^{4} = ${sci(rot.W, 2)}$ J. In mJ: $${sci(rot.W, 2)} \times 10^{3} = ${dec(rot.W * 1e3, 2)}$.`,
  scheme: [['W = 2pE = 4.0 × 10⁻⁴ J = 0.40 mJ', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(rot.W * 1e3, q.answer.value) || 'rot');
add('Umin-mcq', mcq({
  stem: 'The potential energy of an electric dipole in a uniform field is least when the angle between $\\vec p$ and $\\vec E$ is',
  right: '$0^\\circ$',
  wrong: ['$90^\\circ$', '$180^\\circ$', '$45^\\circ$'],
  sol: '$U = -pE\\cos\\theta$ is most negative at $\\theta = 0^\\circ$ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('eV-mcq', mcq({
  stem: 'An electron is accelerated from rest through a potential difference of 100 V. The kinetic energy it gains is',
  right: r`$1.6 \times 10^{-17}$ J`,
  wrong: [r`$1.6 \times 10^{-19}$ J`, r`$1.6 \times 10^{-21}$ J`, '100 J'],
  sol: r`$K = eV = 1.6 \times 10^{-19} \times 100 = 1.6 \times 10^{-17}$ J, i.e. 100 eV — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => near(QE * 100, 1.6e-17) || 'eV');
add('extU-mcq', mcq({
  stem: 'A charge of −2.0 μC is placed at a point where the potential due to other charges is +300 V. Its potential energy there is',
  right: r`$-6.0 \times 10^{-4}$ J`,
  wrong: [r`$+6.0 \times 10^{-4}$ J`, r`$-1.5 \times 10^{2}$ J`, r`$-6.0 \times 10^{-8}$ J`],
  sol: r`$U = qV = -2.0 \times 10^{-6} \times 300 = -6.0 \times 10^{-4}$ J — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => near(-2e-6 * 300, -6e-4) || 'qV');
add('unlikeU-ar', ar({
  a: 'The electrostatic potential energy of a system of two unlike charges is negative.',
  r: 'Unlike charges repel each other.',
  key: 'c',
  sol: 'A is true ($q_1q_2 < 0$ in $kq_1q_2/r$). R is false: unlike charges attract — option (c).',
  d: 1, c: 'understanding', t: [3],
}));
const l3 = { U: 9e9 * 1e-12 * ((1 * -2) / 0.1 + (1 * 3) / 0.3 + (-2 * 3) / 0.2) };
add('threeU-short', short({
  marks: 3,
  stem: 'Charges of +1.0 μC, −2.0 μC and +3.0 μC are fixed on the x-axis at $x = 0$, $x = 10$ cm and $x = 30$ cm. Find the potential energy of the system and say what its sign means.',
  model: r`Pairs: $(1, 2)$ at 0.10 m, $(1, 3)$ at 0.30 m, $(2, 3)$ at 0.20 m.
$U = 9 \times 10^{9} \times 10^{-12} \times \left(\dfrac{1 \times (-2)}{0.10} + \dfrac{1 \times 3}{0.30} + \dfrac{(-2) \times 3}{0.20}\right) = 9 \times 10^{-3} \times (-20 + 10 - 30) = ${dec(l3.U, 2)}$ J.
**Negative:** an external agent must supply 0.36 J to separate the charges to infinity; the arrangement is bound.`,
  sol: 'Sum kq_iq_j/r_ij over the three pairs.',
  scheme: [['Three pairs with correct distances', 1], ['U = −0.36 J', 1], ['Meaning of the negative sign', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(l3.U, -0.36) || `U ${l3.U}`);
add('Usign-short', short({
  marks: 2,
  stem: 'Two protons are brought closer together. Does the potential energy of the system increase or decrease? What happens for a proton and an electron brought closer together? Explain.',
  model: 'For two protons $q_1q_2 > 0$, so $U = kq_1q_2/r$ is positive and **increases** as $r$ decreases: work must be done against the repulsion. For a proton and an electron $q_1q_2 < 0$, so $U$ is negative and becomes **more negative (decreases)** as they approach: the attraction does the work.',
  sol: 'Use the sign of q₁q₂ in U = kq₁q₂/r.',
  scheme: [['Two protons: U increases, with reason', 1], ['Proton and electron: U decreases, with reason', 1]],
  d: 3, c: 'application', t: [3],
}));

// ================================================================ t04 conductors and dielectrics
add('cavity-tf', tf({
  stem: 'The electric field inside a charge-free cavity in a conductor is zero even when the conductor is charged or placed in an external field.',
  key: 't',
  sol: 'True. This is electrostatic shielding: the charges on the conductor arrange themselves so that the field in the charge-free cavity is zero.',
  d: 2, c: 'understanding', t: [4],
}));
add('surface-mcq', mcq({
  stem: 'Excess charge given to an isolated conductor in electrostatic equilibrium',
  right: 'resides on its outer surface',
  wrong: ['spreads uniformly through its volume', 'collects at its centre', 'leaks away immediately'],
  sol: 'Any charge inside would create a field inside, which must be zero in equilibrium — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
const sg = { s: 1.77e-6 };
sg.E = sg.s / EPS0 / 1e3;
add('Esurface-num', num({
  stem: 'The surface charge density on a region of a charged conductor is 1.77 μC m⁻². Find the field just outside that region, in kN C⁻¹.',
  value: Number(dec(sg.E, 3)), tol: 1, unit: 'kN C⁻¹',
  sol: r`$E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{1.77 \times 10^{-6}}{8.85 \times 10^{-12}} = ${sci(sg.E * 1e3, 2)}$ N C$^{-1}$, normal to the surface. In kN C$^{-1}$: $${sci(sg.E * 1e3, 2)}/10^{3} = ${dec(sg.E, 3)}$.`,
  scheme: [['E = σ/ε₀ = 200 kN C⁻¹', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(sg.E, q.answer.value) || 'Es');
const sp = { r1: 0.01, r2: 0.03 };
add('spheres-mcq', mcq({
  stem: 'Two charged metal spheres of radii 1 cm and 3 cm, far apart, are joined by a thin wire. In the final state, the ratio of their surface charge densities $\\sigma_1 : \\sigma_2$ is',
  right: '3 : 1',
  wrong: ['1 : 3', '1 : 1', '1 : 9'],
  sol: r`Joined, they reach the same potential: $\dfrac{kq_1}{r_1} = \dfrac{kq_2}{r_2}$, so $q \propto r$. Then $\sigma = \dfrac{q}{4\pi r^2} \propto \dfrac{1}{r}$, giving $\sigma_1 : \sigma_2 = 3 : 1$ — option (@K). The smaller sphere has the denser charge, as at the pointed end of a conductor.`,
  d: 4, c: 'application', t: [4],
}), () => near((sp.r1 / sp.r1 ** 2) / (sp.r2 / sp.r2 ** 2), 3) || 'sigma');
add('bird-mcq', mcq({
  stem: 'A bird sits with both feet on a single bare high-voltage line at 11 kV. It is not harmed because',
  right: 'both its feet are at practically the same potential, so almost no current flows through it',
  wrong: ['its feathers are perfect insulators', 'the potential of the line is zero where it sits', 'the current in the line is too small to matter'],
  sol: 'Current through the bird needs a potential difference between its feet; on one wire the two points are at nearly the same potential — option (@K). Touching the line and a pole (earth) at once would be fatal.',
  d: 3, c: 'application', t: [1],
}));
add('cavity-mcq', mcq({
  stem: 'A point charge $+q$ is placed at the centre of an uncharged, isolated, hollow metal sphere. The charges that appear on the inner and outer surfaces of the sphere are',
  right: '$-q$ on the inner surface and $+q$ on the outer surface',
  wrong: ['zero on both surfaces', '$+q$ on the inner surface and $-q$ on the outer surface', '$-q$ on the inner surface and zero on the outer surface'],
  sol: 'A Gaussian surface inside the metal has $E = 0$, so it must enclose zero net charge: the inner surface carries $-q$. The sphere is uncharged, so $+q$ appears on the outer surface — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('polar-mcq', mcq({
  stem: 'Which of these is made of polar molecules?',
  right: 'Water',
  wrong: ['Oxygen gas', 'Hydrogen gas', 'Carbon dioxide gas'],
  sol: 'A water molecule has a permanent dipole moment because of its bent shape; O₂, H₂ and the symmetric CO₂ molecule do not — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('Ediel-mcq', mcq({
  stem: 'An isolated parallel-plate capacitor has a field of $3.0 \\times 10^{4}$ V m$^{-1}$ between its plates. A dielectric of constant 6 fills the gap. The field in the dielectric is',
  right: '$5.0 \\times 10^{3}$ V m$^{-1}$',
  wrong: ['$1.8 \\times 10^{5}$ V m$^{-1}$', '$3.0 \\times 10^{4}$ V m$^{-1}$', '$2.5 \\times 10^{4}$ V m$^{-1}$'],
  sol: r`Charge fixed, so $E = E_0/K = \dfrac{3.0 \times 10^{4}}{6} = 5.0 \times 10^{3}$ V m$^{-1}$ — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => near(3e4 / 6, 5e3) || 'E');
add('sharp-mcq', mcq({
  stem: 'On a charged pear-shaped conductor, the surface charge density is greatest',
  right: 'at the sharply curved, pointed end',
  wrong: ['at the flattest part', 'equally everywhere', 'at the centre of the conductor'],
  sol: 'Charge density is larger where the radius of curvature is smaller; this is why lightning conductors have points — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('dielectric-ar', ar({
  a: 'Inserting a dielectric slab between the plates of an isolated charged capacitor reduces the field between the plates.',
  r: 'The polarised slab has bound surface charges whose field opposes the applied field.',
  key: 'a',
  sol: 'Both true, and the opposing field of the bound charges is why the net field falls to $E_0/K$ — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('hollowV-ar', ar({
  a: 'The potential at every point inside a charged hollow conducting sphere is zero.',
  r: 'The electric field at every point inside a charged hollow conducting sphere is zero.',
  key: 'd',
  sol: 'R is true. A is false: zero field means the potential is constant inside, equal to the surface value $kq/R$, not zero — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('polar-short', short({
  marks: 2,
  stem: 'Distinguish between polar and non-polar dielectrics, and explain how each becomes polarised in an external field.',
  model: '**Polar** molecules (water) have a **permanent** dipole moment; normally the dipoles point randomly, and a field **aligns** them partly. **Non-polar** molecules (oxygen) have **no** permanent dipole; the field pushes electrons and nuclei slightly apart and **induces** a dipole along the field. In both, the material gains a net dipole moment per unit volume.',
  sol: 'Contrast permanent and induced dipoles.',
  scheme: [['Polar: permanent dipoles aligned by the field', 1], ['Non-polar: dipoles induced by the field', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('car-short', short({
  marks: 2,
  stem: 'During a thunderstorm a student argues that sitting inside a closed metal car is safer than standing under a tall tree. Evaluate the argument using the properties of conductors.',
  model: 'The argument is **sound**. The car body is a closed **conductor**: the charge stays on its outer surface and the field inside is **zero** (shielding), so no current passes through the people. A tall tree attracts strikes, and current can jump from it to a person nearby.',
  sol: 'Apply shielding by a closed conductor; compare with the tree.',
  scheme: [['Car: closed conductor, zero field inside (shielding)', 1], ['Tree: attracts strikes, current can reach the person', 1]],
  d: 3, c: 'evaluation', t: [4],
}));

// ================================================================ t05 capacitors and capacitance
add('series-mcq', mcq({
  stem: 'Capacitors of 2 μF, 3 μF and 6 μF are connected in series. The equivalent capacitance is',
  right: '1 μF',
  wrong: ['11 μF', '6 μF', '0.5 μF'],
  sol: r`$\dfrac{1}{C} = \dfrac{1}{2} + \dfrac{1}{3} + \dfrac{1}{6} = 1$, so $C = 1\,\mu\text{F}$, smaller than the smallest — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}), () => near(ser(2, 3, 6), 1) || 'series');
add('mixed-mcq', mcq({
  stem: 'Two 4 μF capacitors in series are connected in parallel with a 2 μF capacitor. The equivalent capacitance is',
  right: '4 μF',
  wrong: ['10 μF', '1.3 μF', '6 μF'],
  sol: 'The series pair gives 2 μF; in parallel with 2 μF the total is 4 μF — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => near(ser(4, 4) + 2, 4) || 'mixed');
add('make3-mcq', mcq({
  stem: 'A technician has three identical 2 μF capacitors and needs a capacitance of 3 μF. She should connect',
  right: 'two in series, and the third in parallel with that pair',
  wrong: ['all three in series', 'all three in parallel', 'two in parallel, and the third in series with that pair'],
  sol: 'Two in series give 1 μF; adding 2 μF in parallel gives 3 μF — option (@K). (All series: 0.67 μF; all parallel: 6 μF; parallel pair in series with one: 1.33 μF.)',
  d: 3, c: 'application', t: [5],
}), () => near(ser(2, 2) + 2, 3) && !near(ser(2, 2, 2), 3) && !near(ser(4, 2), 3) || 'make3');
const pc = { A: 50e-4, d: 2e-3 };
pc.C = (EPS0 * pc.A) / pc.d;
add('plateC-num', num({
  stem: 'A parallel-plate capacitor has plates of area 50 cm² separated by 2.0 mm of air. Find its capacitance, in picofarads.',
  value: Number(dec(pc.C * 1e12, 3)), tol: 0.3, unit: 'pF',
  sol: r`$A = 50 \times 10^{-4} = 5.0 \times 10^{-3}$ m². $C = \dfrac{\varepsilon_0 A}{d} = \dfrac{8.85 \times 10^{-12} \times 5.0 \times 10^{-3}}{2.0 \times 10^{-3}} = ${sci(pc.C, 3)}$ F. In pF: $${sci(pc.C, 3)} \times 10^{12} = ${dec(pc.C * 1e12, 3)}$.`,
  scheme: [['Area in m²', 0.5], ['C ≈ 22.1 pF', 0.5]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near(pc.C * 1e12, q.answer.value) || 'C');
add('halfd-mcq', mcq({
  stem: 'The plate separation of a parallel-plate capacitor of capacitance $C$ is halved and the gap is filled with a dielectric of constant 3. The new capacitance is',
  right: '$6C$',
  wrong: ['$1.5C$', '$3C$', '$C/6$'],
  sol: r`$C' = \dfrac{K\varepsilon_0 A}{d/2} = 2K \cdot \dfrac{\varepsilon_0 A}{d} = 6C$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => near(3 * 2, 6) || 'C');
add('slab-mcq', mcq({
  stem: 'A slab of dielectric constant 2 and thickness $d/2$ is placed between the plates of a parallel-plate capacitor of separation $d$ and capacitance $C_0$ (in air). The new capacitance is',
  right: '$\\dfrac{4}{3}C_0$',
  wrong: ['$2C_0$', '$\\dfrac{3}{2}C_0$', '$\\dfrac{3}{4}C_0$'],
  sol: r`$C = \dfrac{\varepsilon_0 A}{d - t + t/K} = \dfrac{\varepsilon_0 A}{d - d/2 + d/4} = \dfrac{\varepsilon_0 A}{3d/4} = \dfrac{4}{3}C_0$ — option (@K).`,
  d: 4, c: 'application', t: [5],
}), () => near(1 / (1 - 0.5 + 0.25), 4 / 3) || 'slab');
add('farad-fill', fill({
  stem: 'The SI unit of capacitance, equal to one coulomb per volt, is the ___.',
  acc: [['farad', 'F']],
  sol: 'The **farad** (F); practical capacitors are measured in μF, nF and pF.',
  d: 1, c: 'recall', t: [5],
}));
const net = { Cp: 2 + 6 };
net.C = ser(4, net.Cp);
net.Q = net.C * 10;
add('network-num', num({
  stem: 'A 4 μF capacitor is in series with a parallel pair of 2 μF and 6 μF capacitors, and the network is connected to a 10 V battery. Find the charge on the 4 μF capacitor, in microcoulombs (3 significant figures).',
  value: Number(dec(net.Q, 3)), tol: 0.3, unit: 'μC',
  sol: r`Parallel pair: $2 + 6 = 8\,\mu\text{F}$. In series with 4 μF: $C = \dfrac{4 \times 8}{4 + 8} = ${dec(net.C, 3)}\,\mu\text{F}$. The series capacitors carry the full charge: $Q = CV = ${dec(net.C, 3)} \times 10 = ${dec(net.Q, 3)}\,\mu\text{C}$.`,
  scheme: [['Equivalent 2.67 μF', 1], ['Q = 26.7 μC on the 4 μF capacitor', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(net.Q, q.answer.value) || 'Q');
const farad = { A: (1 * 1e-3) / EPS0 };
add('onefarad-mcq', mcq({
  stem: 'Roughly what plate area would an air-filled parallel-plate capacitor of 1 F need, with plates 1 mm apart?',
  right: r`About $1 \times 10^{8}$ m² (a square more than 10 km on a side)`,
  wrong: ['About 1 m²', r`About $1 \times 10^{3}$ m²`, r`About $1 \times 10^{-8}$ m²`],
  sol: r`$A = \dfrac{Cd}{\varepsilon_0} = \dfrac{1 \times 1 \times 10^{-3}}{8.85 \times 10^{-12}} \approx ${sci(farad.A, 2)}$ m²: the farad is a very large unit — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => (Math.round(Math.log10(farad.A)) === 8) || 'A');
add('series-ar', ar({
  a: 'Capacitors connected in series all carry the same charge.',
  r: 'The capacitances of capacitors connected in series add up.',
  key: 'c',
  sol: 'A is true (charge on the inner plates is only separated). R is false: for series, the reciprocals add — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
const s24 = { C: ser(2, 4) };
s24.Q = s24.C * 12;
add('series-short', short({
  marks: 2,
  stem: 'Capacitors of 2 μF and 4 μF are connected in series across a 12 V battery. Find the charge on each and the voltage across each.',
  model: r`$C = \dfrac{2 \times 4}{2 + 4} = \dfrac{4}{3}\,\mu\text{F}$, so $Q = \dfrac{4}{3} \times 12 = ${dec(s24.Q, 2)}\,\mu\text{C}$ on **each**. $V_2 = 16/2 = ${s24.Q / 2}$ V and $V_4 = 16/4 = ${s24.Q / 4}$ V (total 12 V): the smaller capacitor takes the larger voltage.`,
  sol: 'Series: same charge; split the voltage as Q/C.',
  scheme: [['Q = 16 μC on each', 1], ['8 V and 4 V', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(s24.Q, 16) || 'Q');
add('Cdepends-short', short({
  marks: 2,
  stem: 'A student says, “Since $C = Q/V$, doubling the charge on a capacitor doubles its capacitance.” Is the student right? Explain.',
  model: 'No. Doubling $Q$ also **doubles** $V$, so the ratio $Q/V$ is **unchanged**. Capacitance depends only on the **geometry** (plate area, separation) and the **medium** between the plates, for example $C = K\\varepsilon_0 A/d$.',
  sol: 'V is proportional to Q, so the ratio is fixed.',
  scheme: [['V doubles with Q, ratio unchanged', 1], ['C depends on geometry and medium only', 1]],
  d: 3, c: 'evaluation', t: [5],
}));

// ================================================================ t06 energy stored
add('energyK-mcq', mcq({
  stem: 'A capacitor is charged and disconnected from the battery. A dielectric slab of constant $K$ is then slid in to fill the gap. The stored energy',
  right: 'decreases to $1/K$ of its value',
  wrong: ['increases $K$ times', 'stays the same', 'increases $K^2$ times'],
  sol: r`$Q$ is fixed and $C$ becomes $KC$, so $U = Q^2/2C$ becomes $U/K$ — option (@K). (The slab is pulled in; the field does work on it.)`,
  d: 2, c: 'application', t: [6],
}));
const uf = 0.5 * 50e-6 * 200 ** 2;
add('flashU-num', num({
  stem: 'Find the energy stored in a 50 μF capacitor charged to 200 V, in joules.',
  value: Number(dec(uf, 2)), tol: 0.02, unit: 'J',
  sol: r`$U = \tfrac{1}{2}CV^2 = 0.5 \times 50 \times 10^{-6} \times 200^2 = ${dec(uf, 2)}$ J.`,
  scheme: [['U = ½CV² = 1.0 J', 1]],
  d: 1, c: 'understanding', t: [6],
}), (q) => near(uf, q.answer.value) || 'U');
const sh = { C1: 2e-6, V1: 60, C2: 4e-6 };
sh.Q = sh.C1 * sh.V1;
sh.Vc = sh.Q / (sh.C1 + sh.C2);
sh.Ub = 0.5 * sh.C1 * sh.V1 ** 2;
sh.Ua = 0.5 * (sh.C1 + sh.C2) * sh.Vc ** 2;
sh.loss = (sh.Ub - sh.Ua) * 1e3;
add('share-num', num({
  stem: 'A 2.0 μF capacitor charged to 60 V is disconnected and joined across an uncharged 4.0 μF capacitor. Find the energy lost in the process, in millijoules (mJ).',
  value: Number(dec(sh.loss, 2)), tol: 0.02, unit: 'mJ',
  sol: r`Charge $Q = 2.0 \times 60 = 120\,\mu\text{C}$ is shared: common potential $= 120/6.0 = ${sh.Vc}$ V. Before: $0.5 \times 2.0 \times 10^{-6} \times 60^2 = ${sci(sh.Ub, 2)}$ J. After: $0.5 \times 6.0 \times 10^{-6} \times 20^2 = ${sci(sh.Ua, 2)}$ J. Loss $= 3.6 - 1.2 = ${dec(sh.loss, 2)}$ mJ.`,
  scheme: [['Common potential 20 V', 1], ['Energy lost 2.4 mJ', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(sh.loss, q.answer.value) || 'loss');
add('doubleV-mcq', mcq({
  stem: 'The voltage across a capacitor is doubled. The energy stored becomes',
  right: 'four times as large',
  wrong: ['twice as large', 'half as large', 'unchanged'],
  sol: '$U = \\tfrac{1}{2}CV^2$, so doubling $V$ multiplies $U$ by 4 — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('fieldenergy-tf', tf({
  stem: 'The energy of a charged capacitor is stored in the electric field between its plates.',
  key: 't',
  sol: 'True. The energy can be pictured as stored in the field, with energy density $\\tfrac{1}{2}\\varepsilon_0E^2$ between the plates.',
  d: 1, c: 'recall', t: [6],
}));
add('share-ar', ar({
  a: 'When a charged capacitor is connected across an uncharged one, the total stored energy decreases.',
  r: 'Total charge is conserved when the capacitors are connected.',
  key: 'b',
  sol: 'Both are true, but conservation of charge does not explain the loss; the energy is lost as heat and radiation while charge flows through the connecting wires — option (b).',
  d: 3, c: 'analysis', t: [6],
}));

// ================================================================ short answers (3 marks)
const zp = { xin: 1.2 / 4, xout: 0.6 };
add('zeroV-short', short({
  marks: 3,
  stem: 'Charges of +3.0 nC and −1.0 nC are fixed 40 cm apart. Find the two points on the line through them where the electric potential is zero.',
  model: r`Let $x$ be measured from the $+3$ nC charge towards the $-1$ nC charge.
**Between them:** $\dfrac{3}{x} = \dfrac{1}{0.40 - x}$, so $1.2 - 3x = x$ and $x = ${dec(zp.xin, 2)}$ m.
**Beyond the −1 nC charge:** $\dfrac{3}{x} = \dfrac{1}{x - 0.40}$, so $3x - 1.2 = x$ and $x = ${dec(zp.xout, 2)}$ m.
So $V = 0$ at 30 cm and at 60 cm from the +3 nC charge (10 cm and 20 cm from the −1 nC charge), both nearer the smaller charge.`,
  sol: 'Set the magnitudes of the two potentials equal in each region.',
  scheme: [['Equation for the point between the charges', 1], ['x = 0.30 m', 1], ['Second point x = 0.60 m beyond the −1 nC charge', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(3 / zp.xin, 1 / (0.4 - zp.xin)) && near(3 / zp.xout, 1 / (zp.xout - 0.4)) || 'zeros');
add('dipoleV-short', short({
  marks: 3,
  stem: 'Derive an expression for the potential at a point at distance $r$ from the centre of a short electric dipole, along a line making angle $\\theta$ with the dipole axis.',
  model: r`Let the charges $-q$ and $+q$ be at distances $r_2$ and $r_1$ from P. $V = \dfrac{q}{4\pi\varepsilon_0}\left(\dfrac{1}{r_1} - \dfrac{1}{r_2}\right)$. By geometry, $r_1 \approx r - a\cos\theta$ and $r_2 \approx r + a\cos\theta$ for $r \gg a$. Then $\dfrac{1}{r_1} - \dfrac{1}{r_2} = \dfrac{r_2 - r_1}{r_1r_2} \approx \dfrac{2a\cos\theta}{r^2}$, so
$$V = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{p\cos\theta}{r^2},\qquad p = 2qa.$$
On the axis $V = kp/r^2$; on the equatorial line $V = 0$.`,
  sol: 'Add the two point-charge potentials and use r ≫ a.',
  scheme: [['Sum of the two potentials', 1], ['r₁ ≈ r − a cos θ, r₂ ≈ r + a cos θ, r₁r₂ ≈ r²', 1], ['V = p cos θ/(4πε₀r²)', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('diel-short', short({
  marks: 3,
  stem: 'A parallel-plate capacitor is charged by a battery, the battery is disconnected, and then a dielectric of constant $K$ is inserted to fill the gap. State and explain what happens to (a) the charge, (b) the capacitance, (c) the potential difference and the stored energy.',
  model: r`(a) **Charge unchanged:** the plates are isolated, so $Q$ cannot change.
(b) **Capacitance increases $K$ times:** $C = K\varepsilon_0A/d$.
(c) $V = Q/C$ **falls to $V_0/K$** (the field is reduced by the polarised dielectric); $U = Q^2/2C$ **falls to $U_0/K$** — the field does work pulling the slab in.`,
  sol: 'Q is fixed; use C = Kε₀A/d, V = Q/C, U = Q²/2C.',
  scheme: [['Q unchanged (isolated)', 1], ['C × K', 1], ['V ÷ K and U ÷ K', 1]],
  d: 3, c: 'application', t: [5, 6], wl: null,
}));
const net2 = { C: ser(3, 6) + 1 };
add('network-short', short({
  marks: 3,
  stem: 'Capacitors $C_1 = 3\\,\\mu$F and $C_2 = 6\\,\\mu$F are in series, and the pair is connected in parallel with $C_3 = 1\\,\\mu$F. The network is connected to a 30 V supply. Find (a) the equivalent capacitance, (b) the charge on $C_3$, (c) the voltage across $C_1$.',
  model: r`(a) Series pair: $\dfrac{3 \times 6}{3 + 6} = 2\,\mu\text{F}$; with $C_3$ in parallel: $C = 2 + 1 = ${net2.C}\,\mu\text{F}$.
(b) $C_3$ has the full 30 V: $Q_3 = 1 \times 30 = 30\,\mu\text{C}$.
(c) Series branch charge $= 2 \times 30 = 60\,\mu\text{C}$, so $V_1 = 60/3 = 20$ V (and $V_2 = 10$ V).`,
  sol: 'Reduce the series pair first; parallel branches share the supply voltage.',
  scheme: [['C = 3 μF', 1], ['Q₃ = 30 μC', 1], ['V₁ = 20 V', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(net2.C, 3) && near((ser(3, 6) * 30) / 3, 20) || 'net2');

// ================================================================ long answers (5 marks)
const pl = { A: 0.04, d: 2e-3, K: 4 };
pl.C0 = (EPS0 * pl.A) / pl.d;
pl.C = pl.K * pl.C0;
add('plate-long', long({
  stem: '(a) Derive an expression for the capacitance of a parallel-plate capacitor with air between the plates. (b) How does it change when the gap is completely filled with a dielectric of constant $K$? (c) Plates of area 400 cm² are 2.0 mm apart. Find the capacitance in air and with a dielectric of $K = 4$.',
  model: r`(a) Let the plates have area $A$, separation $d$ and charges $\pm Q$, so $\sigma = Q/A$. Each plate acts as a large sheet with field $\sigma/2\varepsilon_0$. **Between** the plates the two fields point the same way and add: $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{Q}{\varepsilon_0 A}$; outside they cancel. The field is uniform, so $V = Ed = \dfrac{Qd}{\varepsilon_0 A}$. Hence $C = \dfrac{Q}{V} = \dfrac{\varepsilon_0 A}{d}$.

(b) The polarised dielectric reduces the field (for the same $Q$) to $E/K$, so $V$ falls $K$ times and $C = \dfrac{K\varepsilon_0 A}{d}$.

(c) $A = 400 \times 10^{-4} = 0.040$ m². $C_0 = \dfrac{8.85 \times 10^{-12} \times 0.040}{2.0 \times 10^{-3}} = ${sci(pl.C0, 3)}$ F (177 pF). With $K = 4$: $C = 4 \times 177 = 708$ pF.`,
  sol: 'Field between plates σ/ε₀, V = Ed, C = Q/V; then multiply by K.',
  scheme: [['Field between plates σ/ε₀, zero outside', 1], ['V = Qd/(ε₀A)', 1], ['C = ε₀A/d', 1], ['With dielectric C = Kε₀A/d, with reason', 1], ['177 pF and 708 pF', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}), () => near(pl.C0 * 1e12, 177) && near(pl.C * 1e12, 708) || 'plate');
const cn = { C0: 10e-6, V0: 100, K: 5 };
add('connected-long', long({
  stem: 'A 10 μF air capacitor is connected to a 100 V battery. A dielectric slab of constant 5 is then inserted to fill the gap. Find the capacitance, charge, potential difference and stored energy after insertion (a) if the battery stays connected, (b) if the battery was disconnected before inserting the slab. Explain the difference in the energy changes.',
  model: r`Initially $Q_0 = C_0V_0 = 10 \times 100 = 1000\,\mu\text{C}$ and $U_0 = \tfrac{1}{2} \times 10 \times 10^{-6} \times 100^2 = ${dec(0.5 * cn.C0 * cn.V0 ** 2, 2)}$ J.

(a) **Connected (V fixed):** $C = 50\,\mu\text{F}$, $V = 100$ V, $Q = 50 \times 100 = 5000\,\mu\text{C}$, $U = \tfrac{1}{2} \times 50 \times 10^{-6} \times 100^2 = ${dec(0.5 * cn.K * cn.C0 * cn.V0 ** 2, 2)}$ J (5 times larger).

(b) **Disconnected (Q fixed):** $C = 50\,\mu\text{F}$, $Q = 1000\,\mu\text{C}$, $V = 1000/50 = 20$ V, $U = \dfrac{(10^{-3})^2}{2 \times 50 \times 10^{-6}} = ${dec((1e-3) ** 2 / (2 * cn.K * cn.C0), 2)}$ J (5 times smaller).

**Why:** in (a) the battery moves an extra 4000 μC through 100 V, doing 0.40 J of work; 0.20 J of it raises the stored energy and the rest is the work done on the slab as it is pulled in. In (b) no energy is supplied, and the field does work pulling the slab in, so the stored energy falls.`,
  sol: 'Decide what is fixed (V or Q) and use C = KC₀, Q = CV, U = ½CV² or Q²/2C.',
  scheme: [['Initial Q₀ = 1000 μC, U₀ = 0.050 J', 1], ['(a) C, Q = 5000 μC, V = 100 V', 1], ['(a) U = 0.25 J', 1], ['(b) Q fixed, V = 20 V, U = 0.010 J', 1], ['Explanation of the energy difference', 1]],
  d: 4, c: 'analysis', t: [5, 6], wl: null,
}), () => near(0.5 * cn.C0 * cn.V0 ** 2, 0.05) && near(0.5 * cn.K * cn.C0 * cn.V0 ** 2, 0.25) && near((1e-3) ** 2 / (2 * cn.K * cn.C0), 0.01) || 'conn');
const dp = { p: 2e-8, E: 3e4 };
dp.W = dp.p * dp.E * (Math.cos(0) - Math.cos(Math.PI / 3));
add('dipoleU-long', long({
  stem: '(a) Show that the potential energy of an electric dipole of moment $\\vec p$ at angle $\\theta$ to a uniform field $\\vec E$ is $U = -pE\\cos\\theta$ (taking $U = 0$ at $\\theta = 90^\\circ$). (b) State the positions of stable and unstable equilibrium. (c) A dipole of moment $2.0 \\times 10^{-8}$ C m is turned from $0^\\circ$ to $60^\\circ$ in a field of $3.0 \\times 10^{4}$ N C$^{-1}$. Find the work done.',
  model: r`(a) The torque on the dipole is $\tau = pE\sin\theta$, tending to reduce $\theta$. To turn it slowly through $d\theta$, an external agent does work $dW = pE\sin\theta\,d\theta$. From $90^\circ$ to $\theta$: $W = \int_{90^\circ}^{\theta} pE\sin\theta\,d\theta = pE(\cos 90^\circ - \cos\theta) = -pE\cos\theta$. This work is stored as potential energy: $U(\theta) = -pE\cos\theta = -\vec p\cdot\vec E$.

(b) **Stable** at $\theta = 0^\circ$ ($U = -pE$, minimum); **unstable** at $\theta = 180^\circ$ ($U = +pE$, maximum).

(c) $W = pE(\cos 0^\circ - \cos 60^\circ) = 2.0 \times 10^{-8} \times 3.0 \times 10^{4} \times 0.5 = ${sci(dp.W, 2)}$ J.`,
  sol: 'Integrate the torque over the angle; then use W = pE(cos θ₁ − cos θ₂).',
  scheme: [['Work dW = pE sin θ dθ against the torque', 1], ['Integration from 90° to θ', 1], ['U = −pE cos θ', 1], ['Stable at 0°, unstable at 180°', 1], ['W = 3.0 × 10⁻⁴ J', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(dp.W, 3e-4) || 'W');
const cs = { s: 2.655e-6 };
add('conductor-long', long({
  stem: '(a) State four properties of a conductor in electrostatic equilibrium, giving a reason for each. (b) Explain electrostatic shielding and give one practical use. (c) Find the field just outside a conductor where the surface charge density is 2.655 μC m⁻².',
  model: r`(a) (i) **$E = 0$ inside:** free electrons would otherwise move. (ii) **Excess charge on the surface:** a Gaussian surface just inside the surface has zero field, so encloses zero charge. (iii) **$E$ normal to the surface outside:** a tangential component would move surface charges. (iv) **The conductor is an equipotential:** no field inside or along the surface means no work in moving a charge from point to point.

(b) Inside a **charge-free cavity** of a conductor the field is zero, whatever charges or fields are outside. Uses: sensitive instruments are kept in metal cases; a closed car protects passengers from lightning.

(c) $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{2.655 \times 10^{-6}}{8.85 \times 10^{-12}} = ${sci(cs.s / EPS0, 2)}$ N C$^{-1}$, normal to the surface.`,
  sol: 'List the equilibrium properties with reasons; shielding from zero field in a cavity; E = σ/ε₀.',
  scheme: [['Two properties with reasons', 1], ['Two more properties with reasons', 1], ['Shielding explained', 1], ['A practical use', 1], ['E = 3.0 × 10⁵ N C⁻¹', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => near(cs.s / EPS0, 3e5) || 'cs');
const cl = { C: ser(6, 12) + 4 };
add('combo-long', long({
  stem: '(a) Derive the expression for the equivalent capacitance of capacitors connected (i) in series, (ii) in parallel. (b) Capacitors of 6 μF and 12 μF in series are connected in parallel with a 4 μF capacitor across a 24 V supply. Find the total charge drawn from the supply and the energy stored in the network.',
  model: r`(a)(i) **Series:** each capacitor carries the same $Q$, and the voltages add: $V = V_1 + V_2 + \dots = Q\left(\dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots\right)$. With $V = Q/C$: $\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$
(ii) **Parallel:** each has the same $V$, and the charges add: $Q = Q_1 + Q_2 + \dots = (C_1 + C_2 + \dots)V$, so $C = C_1 + C_2 + \dots$

(b) Series pair: $\dfrac{6 \times 12}{6 + 12} = 4\,\mu\text{F}$; total $C = 4 + 4 = ${cl.C}\,\mu\text{F}$. Total charge $Q = 8 \times 24 = ${cl.C * 24}\,\mu\text{C}$. Energy $U = \tfrac{1}{2} \times 8 \times 10^{-6} \times 24^2 = ${sci(0.5 * cl.C * 1e-6 * 24 ** 2, 3)}$ J.`,
  sol: 'Same Q in series, same V in parallel; then reduce the network.',
  scheme: [['Series derivation', 1], ['Parallel derivation', 1], ['Equivalent 8 μF', 1], ['Q = 192 μC', 1], ['U ≈ 2.30 × 10⁻³ J', 1]],
  d: 3, c: 'application', t: [5, 6], wl: null,
}), () => near(cl.C, 8) && near(0.5 * 8e-6 * 576, 2.304e-3) || 'combo');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const tank = [12, 9, 6, 3, 0];
add('mapping-case', mk.case({
  passage: `In a school laboratory in Nagpur, students placed two long straight metal strips 8 cm apart on a sheet of conducting paper and connected them to a 12 V supply. Using a voltmeter probe, they measured the potential at points along a line from the strip at 12 V to the strip at 0 V.

| Distance from the 12 V strip (cm) | 0 | 2 | 4 | 6 | 8 |
|---|---|---|---|---|---|
| Potential (V) | ${tank.join(' | ')} |

Then they marked several points that all read 6 V.`,
  passage_origin: 'soyl-original',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'In which direction does the electric field point between the strips?',
      right: 'From the 12 V strip towards the 0 V strip',
      wrong: ['From the 0 V strip towards the 12 V strip', 'Parallel to the strips', 'There is no field, because the paper is a conductor'],
      sol: 'The field points towards decreasing potential — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'Find the magnitude of the field between the strips, in V m⁻¹.',
      value: 150, tol: 3, unit: 'V m⁻¹',
      sol: r`The potential falls by 3 V every 2 cm: $E = \dfrac{\Delta V}{\Delta x} = \dfrac{3}{0.020} = 150$ V m$^{-1}$.`,
      scheme: [['E = 150 V m⁻¹', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Describe the line formed by the points that read 6 V, and explain its direction.',
      model: 'The 6 V points form a straight line **parallel to the strips**, midway between them (4 cm from each). It is an **equipotential**, so it must be **perpendicular to the field**, which runs straight across from one strip to the other.',
      sol: 'Equipotentials are perpendicular to the field lines.',
      scheme: [['Straight line parallel to the strips, midway', 1], ['Perpendicular to the field because it is an equipotential', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Find the work done by an external agent in moving a charge of +2.0 μC from the point at 2 cm to the point at 6 cm, and comment on its sign.',
        model: r`$W = q(V_\text{final} - V_\text{initial}) = 2.0 \times 10^{-6} \times (3 - 9) = -1.2 \times 10^{-5}$ J. **Negative:** the charge moves to lower potential, so the field does the work and the agent must hold it back.`,
        sol: 'W = q(V_f − V_i).',
        scheme: [['W = −1.2 × 10⁻⁵ J', 1], ['Sign explained: moves to lower potential', 1]],
        d: 3, c: 'application', t: [1, 2], wl: null,
      }),
    ]),
  ],
}), (q) => near(3 / 0.02, q.children[1].answer.value) && near(2e-6 * (3 - 9), -1.2e-5) || 'tank');

const fl = { C: 150e-6, V: 300, t: 1e-3 };
fl.U = 0.5 * fl.C * fl.V ** 2;
add('flash-case', mk.case({
  passage: `A camera flash unit uses a 150 μF capacitor. A small battery charges it to 300 V over a few seconds. When the photo is taken, the capacitor discharges through the flash tube in about 1 millisecond, giving a brilliant burst of light.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The energy stored in the charged capacitor is about',
      right: '6.8 J',
      wrong: ['0.045 J', '13.5 J', '45 J'],
      sol: r`$U = \tfrac{1}{2}CV^2 = 0.5 \times 150 \times 10^{-6} \times 300^2 = 6.75$ J — option (@K).`,
      d: 2, c: 'understanding', t: [6],
    })),
    part('b', num({
      stem: 'If all this energy is released in 1.0 ms, find the average power of the flash, in kilowatts.',
      value: Number(dec(fl.U / fl.t / 1e3, 3)), tol: 0.1, unit: 'kW',
      sol: r`$P = \dfrac{U}{t} = \dfrac{6.75}{1.0 \times 10^{-3}} = 6750$ W $= ${dec(fl.U / fl.t / 1e3, 3)}$ kW.`,
      scheme: [['P ≈ 6.75 kW', 1]],
      d: 3, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the flash uses a capacitor instead of connecting the battery straight to the flash tube.',
      model: 'A small battery can deliver energy only **slowly** (small current). The capacitor **stores** energy over a few seconds and then releases it in about a **millisecond**, giving a very large **power** for a short time — which the battery alone could not supply.',
      sol: 'Compare the rate of energy delivery.',
      scheme: [['Battery delivers energy slowly', 1], ['Capacitor stores and releases it quickly: high power', 1]],
      d: 3, c: 'analysis', t: [6],
    }), [
      short({
        marks: 2,
        stem: 'A designer suggests using a 300 μF capacitor charged to only 150 V instead. Would the flash be brighter, dimmer or the same? Justify.',
        model: r`$U = \tfrac{1}{2}CV^2 = 0.5 \times 300 \times 10^{-6} \times 150^2 = 3.375$ J, **half** the original 6.75 J. Doubling $C$ doubles $U$, but halving $V$ quarters it, so the flash would be **dimmer**.`,
        sol: 'Compare ½CV² for both designs.',
        scheme: [['U = 3.4 J', 1], ['Dimmer, with reason (V² dependence)', 1]],
        d: 3, c: 'evaluation', t: [6], wl: null,
      }),
    ]),
  ],
}), (q) => near(fl.U, 6.75) && near(q.children[1].answer.value, 6.75) && near(0.5 * 300e-6 * 150 ** 2, 3.375) || 'flash');

const key = { A: 1e-4, d: 5e-4, K: 3 };
key.C = (key.K * EPS0 * key.A) / key.d;
add('keyboard-case', mk.case({
  passage: 'Many computer keyboards use capacitance to sense key presses. Under each key, a metal plate on the key faces a fixed metal plate on the circuit board, with a thin flexible insulating layer between them. Pressing the key brings the plates closer together. The keyboard circuit detects the change in capacitance and registers the key.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When a key is pressed, its capacitance',
      right: 'increases, because the plate separation decreases',
      wrong: ['decreases, because the plate separation decreases', 'stays the same, because the plate area is unchanged', 'becomes zero, because the plates touch'],
      sol: '$C = K\\varepsilon_0 A/d$: a smaller $d$ gives a larger $C$ — option (@K).',
      d: 2, c: 'application', t: [5],
    })),
    part('b', num({
      stem: 'A key has plates of area 1.0 cm², 0.50 mm apart, with an insulating layer of dielectric constant 3. Find its capacitance, in picofarads.',
      value: Number(dec(key.C * 1e12, 3)), tol: 0.1, unit: 'pF',
      sol: r`$C = \dfrac{K\varepsilon_0 A}{d} = \dfrac{3 \times 8.85 \times 10^{-12} \times 1.0 \times 10^{-4}}{5.0 \times 10^{-4}} = ${sci(key.C, 3)}$ F. In pF: $${sci(key.C, 3)} \times 10^{12} = ${dec(key.C * 1e12, 3)}$.`,
      scheme: [['C ≈ 5.31 pF', 1]],
      d: 2, c: 'understanding', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Pressing the key reduces the separation from 0.50 mm to 0.30 mm. By what factor does the capacitance change? Explain.',
      model: r`$C \propto 1/d$, so $\dfrac{C'}{C} = \dfrac{0.50}{0.30} \approx 1.67$. The capacitance rises by a factor of about **1.7** (from about 5.3 pF to about 8.9 pF), a change the circuit can detect.`,
      sol: 'C is inversely proportional to d.',
      scheme: [['C ∝ 1/d', 1], ['Factor 5/3 ≈ 1.7', 1]],
      d: 3, c: 'application', t: [5], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A designer proposes replacing the insulating layer with one of dielectric constant 6, keeping the same thickness. Explain how this would affect the change in capacitance when a key is pressed.',
        model: 'Every capacitance doubles ($C \\propto K$), so the **change** on pressing also **doubles** (about 10.6 pF to 17.7 pF instead of 5.3 to 8.9 pF), while the **ratio** stays 5/3. A larger change is easier for the circuit to detect, so the proposal helps.',
        sol: 'C ∝ K: absolute change doubles, ratio unchanged.',
        scheme: [['Capacitance doubles with K', 1], ['Change doubles (ratio same), easier to detect', 1]],
        d: 4, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), (q) => near(key.C * 1e12, 5.31) && near(q.children[1].answer.value, 5.31) || 'key');

const vg = { V: 1.5e5, R: 0.15 };
vg.q = (vg.V * vg.R) / K;
vg.E = vg.V / vg.R;
add('dome-case', mk.case({
  passage: 'At a science centre in Kolkata, a demonstration generator collects charge on a hollow metal sphere of radius 15 cm mounted on an insulating column. In one show the sphere reached a potential of 1.5 × 10⁵ V. A visitor standing on an insulating stool and touching the sphere had her hair stand on end. Dry air breaks down and sparks when the field reaches about 3 × 10⁶ V m⁻¹.',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What is the potential at the centre of the sphere when its surface is at 1.5 × 10⁵ V?',
      right: '$1.5 \\times 10^{5}$ V',
      wrong: ['zero', '$3.0 \\times 10^{5}$ V', '$7.5 \\times 10^{4}$ V'],
      sol: 'The field inside the conducting sphere is zero, so the potential is the same everywhere inside as at the surface — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the charge on the sphere, in microcoulombs.',
      value: Number(dec(vg.q * 1e6, 2)), tol: 0.05, unit: 'μC',
      sol: r`$V = \dfrac{kq}{R}$, so $q = \dfrac{VR}{k} = \dfrac{1.5 \times 10^{5} \times 0.15}{9 \times 10^{9}} = ${sci(vg.q, 2)}$ C. In μC: $${sci(vg.q, 2)} \times 10^{6} = ${dec(vg.q * 1e6, 2)}$.`,
      scheme: [['q = 2.5 μC', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the visitor’s hair stood on end.',
      model: 'The visitor is insulated, so she and the sphere become one conductor at the **same potential** and her body gains charge of the **same sign**. Each hair carries like charge, so the hairs **repel** one another and the rest of her head, and stand apart.',
      sol: 'Shared potential and like-charge repulsion.',
      scheme: [['She shares the sphere’s charge and potential (insulated)', 1], ['Like charges on hairs repel', 1]],
      d: 2, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The operator wants to raise the sphere to 1.0 × 10⁶ V. Using $E = V/R$ at the surface of a sphere, evaluate whether this is possible in dry air.',
        model: r`At the surface $E = \dfrac{V}{R} = \dfrac{1.0 \times 10^{6}}{0.15} \approx 6.7 \times 10^{6}$ V m$^{-1}$, more than twice the breakdown field of about $3 \times 10^{6}$ V m$^{-1}$. The air would break down and **spark** long before then, so it is **not possible** with this sphere; a larger sphere would be needed.`,
        sol: 'Compare V/R with the breakdown field.',
        scheme: [['E = V/R ≈ 6.7 × 10⁶ V m⁻¹', 1], ['Exceeds breakdown, so not possible (larger sphere needed)', 1]],
        d: 4, c: 'evaluation', t: [4], wl: null,
      }),
    ]),
  ],
}), (q) => near(vg.q * 1e6, 2.5) && near(q.children[1].answer.value, 2.5) && 1e6 / 0.15 > 3e6 || 'dome');
