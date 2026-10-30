// ISC 12 Physics ch03 Electrostatic Potential and Potential Energy — question bank (ISC style). Numbers computed and re-checked.
import { mk, add, r, sci, dec, near, K, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;
const deg = (d) => (d * Math.PI) / 180;

// ================================================================ t01 potential, potential difference, equipotentials
add('voltunit-mcq', mcq({
  stem: 'One volt is equal to',
  right: 'one joule per coulomb',
  wrong: ['one coulomb per joule', 'one newton per coulomb', 'one joule per second'],
  sol: 'V = W/q, so 1 V = 1 J C⁻¹ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('pathind-mcq', mcq({
  stem: 'The work done in carrying a test charge between two points in an electrostatic field does not depend on the route taken because',
  right: 'the electrostatic force is conservative',
  wrong: ['the test charge is very small', 'the field is always uniform', 'the charge moves without friction'],
  sol: 'For a conservative force the work depends only on the end points; hence a potential can be defined — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const wq = { q: 3e-6, VA: 20, VB: 80 };
wq.W = wq.q * (wq.VB - wq.VA);
add('work-num', num({
  stem: 'How much work must be done to move a charge of +3.0 μC slowly from a point at 20 V to a point at 80 V? Give the answer in units of 10⁻⁴ J.',
  value: Number(dec(wq.W / 1e-4, 2)), tol: 0.02, unit: '× 10⁻⁴ J',
  sol: r`$W = q(V_B - V_A) = 3.0 \times 10^{-6} \times (80 - 20) = ${sci(wq.W, 2)}$ J, i.e. $\dfrac{${sci(wq.W, 2)}}{10^{-4}} = ${dec(wq.W / 1e-4, 2)}$.`,
  scheme: [['W = qΔV = 1.8 × 10⁻⁴ J', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(wq.W, 1.8e-4) || 'wq');
const un = { E: 1.5e3, d: 0.04 };
un.dV = un.E * un.d;
add('uniformV-num', num({
  stem: 'In a uniform electric field of 1.5 × 10³ V m⁻¹, find the potential difference between two points 4.0 cm apart along the direction of the field, in volts.',
  value: un.dV, tol: 0.5, unit: 'V',
  sol: r`$\Delta V = Ed = 1.5 \times 10^{3} \times 0.040 = ${dec(un.dV, 2)}$ V, the first point being at the higher potential.`,
  scheme: [['ΔV = Ed', 1], ['60 V', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(un.dV, 60) || 'un');
const ue = 200 / 5e-3;
add('uniformE-num', num({
  stem: 'Two parallel plates 5.0 mm apart are kept at a potential difference of 200 V. Find the electric field between them, in units of 10⁴ V m⁻¹.',
  value: Number(dec(ue / 1e4, 2)), tol: 0.02, unit: '× 10⁴ V m⁻¹',
  sol: r`$E = \dfrac{V}{d} = \dfrac{200}{5.0 \times 10^{-3}} = ${sci(ue, 2)}$ V m$^{-1}$, i.e. $\dfrac{${sci(ue, 2)}}{10^{4}} = ${dec(ue / 1e4, 2)}$.`,
  scheme: [['E = V/d', 1], ['4.0 × 10⁴ V m⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ue, 4e4) || 'ue');
add('eqcross-tf', tf({
  stem: 'Two different equipotential surfaces can intersect each other.',
  key: 'f',
  sol: 'False. At an intersection a point would have two different potentials, which is impossible.',
  d: 1, c: 'understanding', t: [1],
}));
add('perp-ar', ar({
  a: 'The electric field at any point is perpendicular to the equipotential surface through that point.',
  r: 'No work is done in moving a charge along an equipotential surface.',
  key: 'a',
  sol: 'Both true, and R explains A: if E had a component along the surface, moving a charge along it would involve work — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('spacing-mcq', mcq({
  stem: 'In a region, equipotential surfaces differing by 10 V are parallel planes 2.0 cm apart. The electric field there is',
  right: '500 V m⁻¹, perpendicular to the planes, towards lower potential',
  wrong: ['5.0 V m⁻¹, along the planes', '0.20 V m⁻¹, perpendicular to the planes', '500 V m⁻¹, towards higher potential'],
  sol: 'E = ΔV/d = 10/0.020 = 500 V m⁻¹, normal to the equipotentials and pointing from high to low V — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('electron-mcq', mcq({
  stem: 'An electron is released from rest in an electrostatic field. It moves',
  right: 'towards regions of higher potential',
  wrong: ['towards regions of lower potential', 'along an equipotential surface', 'perpendicular to the field'],
  sol: 'A negative charge has lower potential energy (U = qV) where V is higher, so it moves towards higher potential, opposite to E — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const inc = { E: 400, x: 0.3, y: 0.4 };
inc.dV = inc.E * inc.x;
add('inclined-num', num({
  stem: 'A uniform electric field of 400 V m⁻¹ points along +x. Point A is at the origin and point B at (0.30 m, 0.40 m). Find V_A − V_B, in volts.',
  value: inc.dV, tol: 0.5, unit: 'V',
  sol: r`Only the displacement along E matters: $V_A - V_B = E\Delta x = 400 \times 0.30 = ${dec(inc.dV, 3)}$ V (the 0.40 m along y lies on an equipotential).`,
  scheme: [['Only the component along E counts', 1], ['V_A − V_B = 120 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [1],
}), (q) => near(inc.dV, 120) || 'inc');
add('equi-short', short({
  marks: 2,
  stem: 'Explain why the electric field is always perpendicular to an equipotential surface.',
  model: 'Along an equipotential surface the potential is **constant**, so moving a charge along it involves **no work**: $W = q\\,\\Delta V = 0$. If $\\vec E$ had a **component** along the surface, the force $q\\vec E$ would do work during such a move. Hence E can have no component along the surface: it is **perpendicular** to it.',
  sol: 'No work along the surface.',
  scheme: [['No work along an equipotential', 1], ['Hence no component of E along it: perpendicular', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('shapes-short3', short({
  marks: 3,
  stem: 'Describe the shape of the equipotential surfaces (a) round an isolated point charge, (b) in a uniform electric field, (c) round an electric dipole, and state how the field lines cross them.',
  model: '(a) **Concentric spheres** centred on the charge; equal potential steps get **farther apart** with distance. (b) **Parallel planes** perpendicular to the field, **equally spaced** for equal steps. (c) **Closed surfaces** round each charge (positive potentials round +q, negative round −q), with the **perpendicular bisector** of the dipole as the **V = 0** plane. In every case field lines cross the equipotentials **at right angles**.',
  sol: 'Spheres, planes, dipole pattern; perpendicular crossing.',
  scheme: [['Point charge: concentric spheres', 1], ['Uniform field: parallel equally spaced planes', 1], ['Dipole pattern with V = 0 bisector; lines cross at 90°', 1]],
  d: 2, c: 'understanding', t: [1, 3],
}));
add('plateslinear-mcq', mcq({
  stem: 'Between two large parallel plates held at a potential difference V, the potential varies with distance x from the negative plate',
  right: 'linearly, from 0 to V',
  wrong: ['as 1/x', 'as 1/x²', 'not at all: it is constant at V'],
  sol: 'The field between the plates is uniform, so V rises by E per metre: V(x) = Ex, a straight line — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('workloop-mcq', mcq({
  stem: 'A charge is carried round a closed path in an electrostatic field and brought back to its starting point. The net work done by the field is',
  right: 'zero',
  wrong: ['positive', 'negative', 'equal to the charge times the field'],
  sol: 'The start and end potentials are the same, so W = q(V_end − V_start) = 0; the electrostatic field is conservative — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('path-short', short({
  marks: 2,
  stem: 'Show that the work done in moving a charge between two points in an electrostatic field is the same for every path, and state what this tells us about the field.',
  model: 'The work done by the field from A to B equals $q(V_A - V_B)$, which depends only on the **potentials at the end points**. Any two paths from A to B therefore need the **same work**; equivalently the work round any **closed path is zero**. This shows that the electrostatic field (force) is **conservative**.',
  sol: 'Depends only on end potentials.',
  scheme: [['W = q(V_A − V_B): end points only', 1], ['Closed path: zero work; field is conservative', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 point charge
const vp = (K * -6e-9) / 0.2;
add('Vpoint-num', num({
  stem: 'Find the electric potential 20 cm from a point charge of −6.0 nC, in volts.',
  value: Number(dec(vp, 3)), tol: 1, unit: 'V',
  sol: r`$V = \dfrac{kq}{r} = \dfrac{9 \times 10^{9} \times (-6.0 \times 10^{-9})}{0.20} = ${dec(vp, 3)}$ V.`,
  scheme: [['V = kq/r = −270 V (sign kept)', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(vp, -270) || 'vp');
add('graphs-mcq', mcq({
  stem: 'For an isolated point charge, as the distance r increases',
  right: 'the field falls faster than the potential, as 1/r² compared with 1/r',
  wrong: ['the potential falls faster than the field', 'both fall as 1/r²', 'the potential stays constant while the field falls'],
  sol: 'V = kq/r and E = kq/r²: E falls off more rapidly — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('halfV-mcq', mcq({
  stem: 'The potential at a distance d from a point charge is 400 V. At what distance from the charge is the potential 200 V?',
  right: '2d',
  wrong: ['√2 d', 'd/2', '4d'],
  sol: 'V ∝ 1/r, so halving V needs twice the distance — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const sw = (K * 6e-6 * 2e-6) / 0.3;
add('bring-num', num({
  stem: 'How much work is needed to bring a charge of +2.0 μC from infinity to a point 30 cm from a fixed charge of +6.0 μC? Give the answer in joules.',
  value: Number(dec(sw, 2)), tol: 0.005, unit: 'J',
  sol: r`$W = qV = q\dfrac{kQ}{r} = 2.0 \times 10^{-6} \times \dfrac{9 \times 10^{9} \times 6.0 \times 10^{-6}}{0.30} = ${dec(sw, 2)}$ J.`,
  scheme: [['W = q × kQ/r', 1], ['0.36 J', 1]],
  marks: 2, d: 2, c: 'application', t: [2, 4],
}), (q) => near(sw, 0.36) || 'sw');
add('Vneg-tf', tf({
  stem: 'The potential at every point near an isolated negative point charge is negative (taking V = 0 at infinity).',
  key: 't',
  sol: 'True: V = kq/r with q < 0 is negative everywhere at finite distance.',
  d: 1, c: 'understanding', t: [2],
}));
add('infinity-fill', fill({
  stem: 'In finding the potential of a point charge, the potential at infinity is taken to be ___.',
  acc: [['zero', '0']],
  sol: '**Zero**: the reference point for potential.',
  d: 1, c: 'recall', t: [2],
}));
add('Vderive-short3', short({
  marks: 3,
  stem: 'Derive an expression for the electric potential at a distance r from a point charge q.',
  model: r`Bring a test charge $q_0$ from infinity to distance $r$ slowly. At distance $x$ the repulsive force is $F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{qq_0}{x^2}$, and the external force is equal and opposite. Work done $W = -\int_\infty^{r}\dfrac{1}{4\pi\varepsilon_0}\dfrac{qq_0}{x^2}dx = \dfrac{1}{4\pi\varepsilon_0}qq_0\left[\dfrac{1}{x}\right]_\infty^{r} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{qq_0}{r}$. Hence $V = \dfrac{W}{q_0} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r}$.`,
  sol: 'Integrate the work from infinity.',
  scheme: [['Work element against kqq₀/x²', 1], ['Integration from ∞ to r', 1], ['V = q/(4πε₀r)', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
const vf = { V: -900, E: 300 };
vf.r = Math.abs(vf.V / vf.E);
vf.q = (vf.V * vf.r) / K;
add('VEfind-short3', short({
  marks: 3,
  stem: 'At a certain point near an isolated point charge, the potential is −900 V and the field is 300 V m⁻¹. Find (a) the distance of the point from the charge, (b) the charge, and (c) the direction of the field there.',
  model: r`(a) $|V|/E = r$, so $r = \dfrac{900}{300} = ${dec(vf.r, 2)}$ m. (b) $q = \dfrac{Vr}{k} = \dfrac{-900 \times 3.0}{9 \times 10^{9}} = ${sci(vf.q, 2)}$ C. (c) The charge is negative, so the field points **towards** the charge.`,
  sol: 'V/E = r for a point charge.',
  scheme: [['r = 3.0 m', 1], ['q = −3.0 × 10⁻⁷ C', 1], ['Field towards the charge', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(vf.r, 3) && near(vf.q, -3e-7) || 'vf');
add('graph-short3', short({
  marks: 3,
  stem: 'Sketch (describe) on the same axes the graphs of electric potential V and field E against distance r for a positive point charge, and explain one difference between them.',
  model: 'Both are positive curves that fall as r increases and approach zero at large r. V falls as **1/r**; E falls as **1/r²**, so the E curve is **steeper**: doubling r **halves V** but **quarters E**. (At any point the ratio V/E equals r.)',
  sol: '1/r versus 1/r².',
  scheme: [['Both fall towards zero', 1], ['V ∝ 1/r, E ∝ 1/r²', 1], ['E steeper: doubling r halves V, quarters E', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 systems of charges and dipoles
add('eqV-mcq', mcq({
  stem: 'The electric potential at a point on the equatorial line of an electric dipole is',
  right: 'zero',
  wrong: ['kp/r²', '2kp/r³', 'kp/r'],
  sol: 'The point is equidistant from +q and −q, so kq/r − kq/r = 0 (although the field there is not zero) — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const sq = { q: [2e-9, -3e-9, 4e-9, 1e-9], a: 0.2 };
sq.r = sq.a / Math.SQRT2;
sq.V = (K * sq.q.reduce((x, y) => x + y, 0)) / sq.r;
add('square-num', num({
  stem: 'Charges of +2.0 nC, −3.0 nC, +4.0 nC and +1.0 nC sit at the four corners of a square of side 20 cm. Find the potential at the centre of the square, in volts (3 significant figures).',
  value: Number(dec(sq.V, 3)), tol: 2, unit: 'V',
  sol: r`Each corner is $\dfrac{0.20}{\sqrt 2} \approx ${dec(sq.r, 3)}$ m from the centre. $V = \dfrac{k\sum q}{r} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{${dec(sq.r, 3)}} \approx ${dec(sq.V, 3)}$ V.`,
  scheme: [['Equal distances 0.141 m; Σq = 4.0 nC', 1], ['V ≈ 255 V', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(sq.V, q.answer.value) || `sq ${sq.V}`);
const zv = { q1: 6, q2: -2, d: 0.4 };
zv.x = (zv.q1 * zv.d) / (zv.q1 + zv.q2); // 6/x = 2/(x − 0.4)
add('zeroV-num', num({
  stem: 'Charges of +6.0 nC and −2.0 nC are 40 cm apart. Apart from the point between them, there is a point on the line through them, beyond the −2.0 nC charge, where the potential is zero. How far is it from the +6.0 nC charge, in metres?',
  value: Number(dec(zv.x, 2)), tol: 0.005, unit: 'm',
  sol: r`At distance $x$ from +6 nC (beyond −2 nC): $\dfrac{6}{x} = \dfrac{2}{x - 0.40}$, so $6x - 2.4 = 2x$ and $x = \dfrac{2.4}{4} = ${dec(zv.x, 2)}$ m.`,
  scheme: [['6/x = 2/(x − 0.40)', 1], ['x = 0.60 m', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(zv.x, 0.6) && near(q.answer.value, 0.6) || 'zv');
const da = (K * 4e-10) / 0.2 ** 2;
add('dipaxis-num', num({
  stem: 'A short dipole has a moment of 4.0 × 10⁻¹⁰ C m. Find the potential on its axis 20 cm from its centre, on the side of the positive charge, in volts.',
  value: Number(dec(da, 2)), tol: 0.5, unit: 'V',
  sol: r`$V = \dfrac{kp}{r^2} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-10}}{(0.20)^2} = ${dec(da, 2)}$ V.`,
  scheme: [['V = kp/r² = 90 V', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(da, 90) || 'da');
const d120 = (K * 4e-10 * Math.cos(deg(120))) / 0.3 ** 2;
add('dip120-num', num({
  stem: 'For the same short dipole (p = 4.0 × 10⁻¹⁰ C m), find the potential at a point 30 cm from its centre on a line making 120° with the dipole moment, in volts.',
  value: Number(dec(d120, 2)), tol: 0.5, unit: 'V',
  sol: r`$V = \dfrac{kp\cos\theta}{r^2} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-10} \times \cos 120°}{(0.30)^2} = \dfrac{3.6 \times (-0.5)}{0.090} = ${dec(d120, 2)}$ V.`,
  scheme: [['V = kp cos θ/r²', 1], ['−20 V', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(d120, -20) || 'd120');
add('dipolederive-short3', short({
  marks: 3,
  stem: 'Derive an expression for the potential due to a short electric dipole at a point at distance r from its centre, the line to the point making angle θ with the dipole moment.',
  model: r`Let $+q$ be at B and $-q$ at A, $2a$ apart, and P at distance $r$ from the centre O. Then $r_+ \approx r - a\cos\theta$ and $r_- \approx r + a\cos\theta$ for $r \gg a$. $V = \dfrac{q}{4\pi\varepsilon_0}\left(\dfrac{1}{r_+} - \dfrac{1}{r_-}\right) = \dfrac{q}{4\pi\varepsilon_0}\dfrac{2a\cos\theta}{r^2 - a^2\cos^2\theta} \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{p\cos\theta}{r^2}$. Special cases: θ = 0 (axis) $kp/r^2$; θ = 90° (equatorial) 0.`,
  sol: 'Distances r ∓ a cos θ.',
  scheme: [['r₊ and r₋ in terms of r, a, θ', 1], ['V = kp cos θ/(r² − a²cos²θ)', 1], ['Approximation and special cases', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('Vzero-ar', ar({
  a: 'The potential at every point on the equatorial line of an electric dipole is zero.',
  r: 'The electric field at every point on the equatorial line of an electric dipole is non-zero.',
  key: 'b',
  sol: 'Both true, but R does not explain A: V = 0 because the point is equidistant from equal and opposite charges; E is a separate (vector) quantity — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('dipfall-mcq', mcq({
  stem: 'Far from an electric dipole, its potential varies with distance r as',
  right: '1/r²',
  wrong: ['1/r', '1/r³', 'r'],
  sol: 'V = kp cos θ/r² — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('scalar-short', short({
  marks: 2,
  stem: 'Why is it easier to find the potential than the field at a point due to several charges?',
  model: 'Potential is a **scalar**: the contributions $kq_i/r_i$ are simply **added algebraically**, with their signs. The field is a **vector**: each contribution has a **direction**, so they must be resolved into components and added **vectorially**, which takes more work.',
  sol: 'Scalar versus vector addition.',
  scheme: [['V is a scalar: algebraic sum', 1], ['E is a vector: vector sum', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('ring-mcq', mcq({
  stem: 'A charge Q is spread uniformly round a thin ring of radius R. At the centre of the ring, the potential and the field are',
  right: 'V = kQ/R and E = 0',
  wrong: ['V = 0 and E = kQ/R²', 'V = kQ/R and E = kQ/R²', 'V = 0 and E = 0'],
  sol: 'Every element is at distance R, so V = kQ/R; the fields of opposite elements cancel, so E = 0 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('midpoint-mcq', mcq({
  stem: 'At the midpoint between two equal and opposite point charges',
  right: 'the potential is zero but the field is not',
  wrong: ['the field is zero but the potential is not', 'both the field and the potential are zero', 'neither is zero'],
  sol: 'Potentials kq/r and −kq/r cancel; the two fields both point from + to − and add — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('Vsign-mcq', mcq({
  stem: 'Charges +q and −q are fixed a distance d apart. The potential at a point on the line between them, at d/4 from −q, is',
  right: 'negative',
  wrong: ['positive', 'zero', 'infinite'],
  sol: 'V = kq/(3d/4) − kq/(d/4) = (4kq/d)(1/3 − 1) < 0: the nearer negative charge dominates — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('VzeroE-short', short({
  marks: 2,
  stem: 'At the midpoint of a dipole the potential is zero, yet a test charge placed there experiences a force. Explain.',
  model: 'Potential is a **scalar**: $kq/r$ from +q and $-kq/r$ from −q **cancel**, so V = 0. Field is a **vector**: at the midpoint the field of +q points away from it and that of −q towards −q, i.e. **both in the same direction**, so they **add** and E ≠ 0; the force is qE.',
  sol: 'Scalar cancels; vectors add.',
  scheme: [['Potentials cancel (scalar)', 1], ['Fields in the same direction add (vector)', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ================================================================ t04 potential energy of charges
add('Usign-mcq', mcq({
  stem: 'The electrostatic potential energy of an electron and a proton held a short distance apart is',
  right: 'negative, because the charges attract',
  wrong: ['positive, because energy is stored', 'zero, because the total charge is zero', 'positive, because the proton is heavier'],
  sol: 'U = kq₁q₂/r with q₁q₂ < 0: negative; work must be done to separate them — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const kev = 5e3 * QE;
add('eV-num', num({
  stem: 'An X-ray tube accelerates electrons through 5.0 kV. Find the kinetic energy each gains, in units of 10⁻¹⁶ J.',
  value: Number(dec(kev / 1e-16, 2)), tol: 0.02, unit: '× 10⁻¹⁶ J',
  sol: r`$K = eV = 1.6 \times 10^{-19} \times 5.0 \times 10^{3} = ${sci(kev, 2)}$ J (5.0 keV), i.e. $\dfrac{${sci(kev, 2)}}{10^{-16}} = ${dec(kev / 1e-16, 2)}$.`,
  scheme: [['K = eV = 8.0 × 10⁻¹⁶ J', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(kev, 8e-16) || 'kev');
const es = { V: 500 };
es.v = Math.sqrt((2 * QE * es.V) / ME);
add('espeed-num', num({
  stem: 'An electron starting from rest is accelerated through 500 V. Find its final speed, in units of 10⁷ m s⁻¹ (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg.)',
  value: Number(dec(es.v / 1e7, 3)), tol: 0.02, unit: '× 10⁷ m s⁻¹',
  sol: r`$\tfrac12 m v^2 = eV \Rightarrow v = \sqrt{\dfrac{2eV}{m}} = \sqrt{\dfrac{2 \times 1.6 \times 10^{-19} \times 500}{9.1 \times 10^{-31}}} \approx ${sci(es.v, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(es.v, 3)}}{10^{7}} = ${dec(es.v / 1e7, 3)}$.`,
  scheme: [['½mv² = eV', 1], ['v ≈ 1.33 × 10⁷ m s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(es.v / 1e7, q.answer.value) || 'es');
const pr = (K * 4e-6 * -2e-6) / 0.3;
add('pairU-num', num({
  stem: 'Find the electrostatic potential energy of a system of +4.0 μC and −2.0 μC charges 30 cm apart, in joules.',
  value: Number(dec(pr, 2)), tol: 0.005, unit: 'J',
  sol: r`$U = \dfrac{kq_1q_2}{r} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-6} \times (-2.0 \times 10^{-6})}{0.30} = ${dec(pr, 2)}$ J.`,
  scheme: [['U = kq₁q₂/r with signs', 1], ['−0.24 J', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(pr, -0.24) || 'pr');
const t3 = (3 * K * 1e-12) / 0.15;
add('triU-num', num({
  stem: 'Three equal charges of +1.0 μC are placed at the corners of an equilateral triangle of side 15 cm. Find the potential energy of the system, in joules.',
  value: Number(dec(t3, 2)), tol: 0.005, unit: 'J',
  sol: r`Three pairs, each at 0.15 m: $U = 3 \times \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{0.15} = ${dec(t3, 2)}$ J.`,
  scheme: [['Three equal pairs', 1], ['U = 0.18 J', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(t3, 0.18) || 't3');
const st = { v: 4e6 };
st.V = (ME * st.v ** 2) / (2 * QE);
add('stop-num', num({
  stem: 'An electron moving at 4.0 × 10⁶ m s⁻¹ enters a region where it is slowed by a retarding electric field. Through what potential difference must it pass to be brought to rest? Give the answer in volts (3 significant figures).',
  value: Number(dec(st.V, 3)), tol: 0.3, unit: 'V',
  sol: r`$eV = \tfrac12 mv^2 \Rightarrow V = \dfrac{mv^2}{2e} = \dfrac{9.1 \times 10^{-31} \times (4.0 \times 10^{6})^2}{2 \times 1.6 \times 10^{-19}} = ${dec(st.V, 3)}$ V.`,
  scheme: [['eV = ½mv²', 1], ['V ≈ 45.5 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(st.V, 45.5) || 'st');
add('order-tf', tf({
  stem: 'The potential energy of a system of three point charges depends on the order in which the charges are brought into position.',
  key: 'f',
  sol: 'False. The electrostatic force is conservative, so the total work (and U) depends only on the final arrangement.',
  d: 1, c: 'understanding', t: [4],
}));
add('ext-ar', ar({
  a: 'An external agent must do positive work to push two positive charges closer together.',
  r: 'The potential energy of two like charges increases as their separation decreases.',
  key: 'a',
  sol: 'Both true, and R explains A: the work done by the external agent equals the increase in potential energy, kq₁q₂/r rising as r falls — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('energy-short', short({
  marks: 2,
  stem: 'Define the electrostatic potential energy of a system of two point charges and write its expression.',
  model: 'It is the **work done** (by an external agent, without acceleration) in **bringing the charges from infinity** to their positions, i.e. in assembling the system. For charges $q_1$ and $q_2$ at separation $r$: $U = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r}$ (positive for like, negative for unlike charges).',
  sol: 'Work to assemble from infinity.',
  scheme: [['Definition as work to assemble from infinity', 1], ['U = kq₁q₂/r', 1]],
  d: 1, c: 'recall', t: [4], wl: null,
}));
add('eVdef-short', short({
  marks: 2,
  stem: 'What is an electronvolt? Express 1 MeV in joules.',
  model: 'One **electronvolt** is the **energy gained by an electron** (or lost) when it moves through a potential difference of **one volt**: 1 eV = $1.6 \\times 10^{-19}$ J. So 1 MeV = $10^{6} \\times 1.6 \\times 10^{-19}$ = $1.6 \\times 10^{-13}$ J.',
  sol: 'e × 1 V.',
  scheme: [['Definition', 1], ['1 MeV = 1.6 × 10⁻¹³ J', 1]],
  d: 1, c: 'recall', t: [4], wl: null,
}));
const s4 = { q: 1e-6, a: 0.1 };
s4.U = ((K * s4.q ** 2) / s4.a) * (4 + 2 / Math.SQRT2);
add('squareU-short3', short({
  marks: 3,
  stem: 'Four equal charges of +1.0 μC are placed at the corners of a square of side 10 cm. Find the potential energy of the system.',
  model: r`There are 6 pairs: 4 along the sides (separation $a = 0.10$ m) and 2 along the diagonals ($\sqrt2 a$). $U = \dfrac{kq^2}{a}\left(4 + \dfrac{2}{\sqrt 2}\right) = \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{0.10}(4 + 1.414) \approx ${dec(s4.U, 3)}$ J.`,
  sol: 'Six pairs: four sides, two diagonals.',
  scheme: [['Six pairs identified', 1], ['U = (kq²/a)(4 + √2)', 1], ['≈ 0.487 J', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(s4.U, 0.4873) || `s4 ${s4.U}`);
const qv = { Q: 4e-6, q: 2e-9, ra: 0.5, rb: 0.2 };
qv.W = qv.q * K * qv.Q * (1 / qv.rb - 1 / qv.ra);
add('qV-short3', short({
  marks: 3,
  stem: 'A charge of +2.0 nC is moved from a point 50 cm away from a fixed charge of +4.0 μC to a point 20 cm away from it. Find (a) the potentials at the two points, (b) the work done by the external agent.',
  model: r`(a) $V_A = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-6}}{0.50} = 7.2 \times 10^{4}$ V; $V_B = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-6}}{0.20} = 1.8 \times 10^{5}$ V.
(b) $W = q(V_B - V_A) = 2.0 \times 10^{-9} \times (1.8 \times 10^{5} - 7.2 \times 10^{4}) \approx ${sci(qv.W, 3)}$ J (positive: work done against repulsion).`,
  sol: 'W = q(V_B − V_A).',
  scheme: [['V_A = 7.2 × 10⁴ V', 1], ['V_B = 1.8 × 10⁵ V', 1], ['W ≈ 2.16 × 10⁻⁴ J', 1]],
  d: 3, c: 'application', t: [2, 4], wl: null,
}), () => near(qv.W, 2.16e-4) || 'qv');

// ================================================================ t05 dipole in a uniform field
add('unstable-tf', tf({
  stem: 'An electric dipole in a uniform field is in unstable equilibrium when its dipole moment points opposite to the field.',
  key: 't',
  sol: 'True. At θ = 180° the torque is zero but U = +pE is a maximum; a slight turn makes the dipole rotate further away.',
  d: 1, c: 'understanding', t: [5],
}));
const dU = -2e-9 * 3e5 * Math.cos(deg(60));
add('dipU-num', num({
  stem: 'A dipole of moment 2.0 × 10⁻⁹ C m makes 60° with a uniform field of 3.0 × 10⁵ N C⁻¹. Find its potential energy, in units of 10⁻⁴ J.',
  value: Number(dec(dU / 1e-4, 2)), tol: 0.02, unit: '× 10⁻⁴ J',
  sol: r`$U = -pE\cos\theta = -2.0 \times 10^{-9} \times 3.0 \times 10^{5} \times 0.5 = ${sci(dU, 2)}$ J, i.e. $\dfrac{${sci(dU, 2)}}{10^{-4}} = ${dec(dU / 1e-4, 2)}$.`,
  scheme: [['U = −pE cos θ', 1], ['−3.0 × 10⁻⁴ J', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(dU, -3e-4) || 'dU');
const rw = 4e-9 * 5e4 * (1 - Math.cos(deg(60)));
add('rotwork-num', num({
  stem: 'A dipole of moment 4.0 × 10⁻⁹ C m is initially aligned with a uniform field of 5.0 × 10⁴ N C⁻¹. How much work is needed to turn it through 60°? Give the answer in units of 10⁻⁴ J.',
  value: Number(dec(rw / 1e-4, 2)), tol: 0.02, unit: '× 10⁻⁴ J',
  sol: r`$W = pE(\cos 0° - \cos 60°) = 4.0 \times 10^{-9} \times 5.0 \times 10^{4} \times (1 - 0.5) = ${sci(rw, 2)}$ J, i.e. $\dfrac{${sci(rw, 2)}}{10^{-4}} = ${dec(rw / 1e-4, 2)}$.`,
  scheme: [['W = pE(cos θ₁ − cos θ₂)', 1], ['1.0 × 10⁻⁴ J', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(rw, 1e-4) || 'rw');
add('maxU-mcq', mcq({
  stem: 'The potential energy of an electric dipole in a uniform electric field is greatest when the angle between the dipole moment and the field is',
  right: '180°',
  wrong: ['0°', '90°', '45°'],
  sol: 'U = −pE cos θ is largest (+pE) when cos θ = −1 — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('Uderive-short3', short({
  marks: 3,
  stem: 'Derive an expression for the potential energy of an electric dipole of moment p at an angle θ to a uniform field E. Hence state the positions of stable and unstable equilibrium.',
  model: r`The torque is $pE\sin\theta$; to turn the dipole slowly through $d\theta$ an external agent does work $dW = pE\sin\theta\,d\theta$. From $\theta_1$ to $\theta_2$: $W = pE(\cos\theta_1 - \cos\theta_2)$. Taking U = 0 at $\theta_1 = 90°$: $U(\theta) = -pE\cos\theta = -\vec p\cdot\vec E$. **Stable** at θ = 0° (U = −pE, minimum); **unstable** at θ = 180° (U = +pE, maximum).`,
  sol: 'Integrate the work against the torque.',
  scheme: [['dW = pE sin θ dθ', 1], ['U = −pE cos θ with zero at 90°', 1], ['Stable at 0°, unstable at 180°', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));
add('ninety-mcq', mcq({
  stem: 'The work needed to turn a dipole in a uniform field from θ = 90° to θ = 180° is',
  right: 'pE',
  wrong: ['2pE', 'zero', '−pE'],
  sol: 'W = pE(cos 90° − cos 180°) = pE(0 + 1) = pE — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('Utorque-ar', ar({
  a: 'A dipole whose moment is parallel to a uniform field experiences no torque.',
  r: 'In this position the potential energy of the dipole is zero.',
  key: 'c',
  sol: 'A is true (τ = pE sin 0° = 0). R is false: the energy there is −pE, its minimum value — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('stableunstable-short', short({
  marks: 2,
  stem: 'A dipole in a uniform field has zero torque at both θ = 0° and θ = 180°. Why is one position stable and the other unstable?',
  model: 'At **0°** the energy $U = -pE$ is a **minimum**: a small twist produces a torque that turns the dipole **back** towards the field, so it is **stable**. At **180°** the energy $+pE$ is a **maximum**: a small twist produces a torque that turns it **further away**, so it is **unstable**.',
  sol: 'Minimum versus maximum of U.',
  scheme: [['0°: minimum U, restoring torque', 1], ['180°: maximum U, torque increases the displacement', 1]],
  d: 2, c: 'understanding', t: [5], wl: null,
}));
add('equicross-ar', ar({
  a: 'Two equipotential surfaces may cut each other at some points.',
  r: 'The electric field is perpendicular to every equipotential surface.',
  key: 'd',
  sol: 'R is true. A is false: at an intersection one point would have two values of potential (and two field directions) — option (d).',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ 5-mark questions (in parts)
const pl = { q: 8e-9, r1: 0.2, r2: 0.4 };
pl.V1 = (K * pl.q) / pl.r1;
pl.V2 = (K * pl.q) / pl.r2;
pl.W = 3e-9 * (pl.V1 - pl.V2);
add('potential-long', long({
  stem: '(a) Define electric potential at a point and state its SI unit. [1] (b) Derive an expression for the potential at a distance r from a point charge q. [2] (c) A charge of +8.0 nC is fixed in air. Find the potentials at 20 cm and 40 cm from it, and the work done by the field when a +3.0 nC charge moves from the first point to the second. [2]',
  model: r`(a) The work done per unit positive charge in bringing a test charge from infinity to the point (without acceleration); unit volt (J C$^{-1}$).

(b) $W = -\int_\infty^{r}\dfrac{kqq_0}{x^2}dx = \dfrac{kqq_0}{r}$, so $V = \dfrac{W}{q_0} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r}$.

(c) $V_1 = \dfrac{9 \times 10^{9} \times 8.0 \times 10^{-9}}{0.20} = ${dec(pl.V1, 3)}$ V; $V_2 = ${dec(pl.V2, 3)}$ V. Work by the field $= q(V_1 - V_2) = 3.0 \times 10^{-9} \times ${dec(pl.V1 - pl.V2, 3)} = ${sci(pl.W, 3)}$ J.`,
  sol: 'Definition; integral; numbers.',
  scheme: [['Definition and unit', 1], ['Work integral', 1], ['V = q/(4πε₀r)', 1], ['360 V and 180 V', 1], ['W = 5.4 × 10⁻⁷ J', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(pl.V1, 360) && near(pl.W, 5.4e-7) || 'pl');
const dp = { q: 5e-9, d: 4e-3, r: 0.2 };
dp.p = dp.q * dp.d;
dp.Vax = (K * dp.p) / dp.r ** 2;
dp.V45 = dp.Vax * Math.cos(deg(45));
add('dipolepot-long', long({
  stem: '(a) Derive an expression for the potential due to an electric dipole at a point on its axial line. [2] (b) Show that the potential on its equatorial line is zero. [1] (c) Charges of ±5.0 nC are 4.0 mm apart. Find the potential 20 cm from the centre (i) on the axis, (ii) on a line at 45° to the dipole moment. [2]',
  model: r`(a) For P on the axis at distance $r$ from the centre, nearer to +q: $V = \dfrac{q}{4\pi\varepsilon_0}\left(\dfrac{1}{r - a} - \dfrac{1}{r + a}\right) = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2qa}{r^2 - a^2} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^2 - a^2} \approx \dfrac{kp}{r^2}$.

(b) A point on the equatorial line is equidistant from +q and −q: $V = \dfrac{kq}{d} - \dfrac{kq}{d} = 0$.

(c) $p = 5.0 \times 10^{-9} \times 4.0 \times 10^{-3} = ${sci(dp.p, 2)}$ C m. (i) $V = \dfrac{kp}{r^2} = ${dec(dp.Vax, 2)}$ V. (ii) $V = \dfrac{kp\cos 45°}{r^2} \approx ${dec(dp.V45, 3)}$ V.`,
  sol: 'Algebraic sum; equidistance; numbers.',
  scheme: [['Axial expression derived', 1], ['Short-dipole form', 1], ['Equatorial V = 0', 1], ['4.5 V on the axis', 1], ['≈ 3.18 V at 45°', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(dp.Vax, 4.5) && near(dp.V45, 3.18) || 'dp');
const el = { q: [2e-6, -2e-6, 1e-6], s: 0.3 };
el.U = (K * (el.q[0] * el.q[1] + el.q[0] * el.q[2] + el.q[1] * el.q[2])) / el.s;
el.Vc = (K * (el.q[0] + el.q[1] + el.q[2])) / (el.s / Math.sqrt(3));
add('energy-long', long({
  stem: '(a) Define the electrostatic potential energy of a system of charges. [1] (b) Write the potential energy of a system of three point charges. [1] (c) Charges of +2.0 μC, −2.0 μC and +1.0 μC are at the corners of an equilateral triangle of side 30 cm. Find (i) the potential energy of the system, (ii) the potential at the centroid of the triangle. [3]',
  model: r`(a) The work done in bringing the charges from infinity to their positions (assembling the system).

(b) $U = \dfrac{1}{4\pi\varepsilon_0}\left(\dfrac{q_1q_2}{r_{12}} + \dfrac{q_1q_3}{r_{13}} + \dfrac{q_2q_3}{r_{23}}\right)$.

(c)(i) Products: $(2)(-2) + (2)(1) + (-2)(1) = -4$ ($\times 10^{-12}$ C²); $U = \dfrac{9 \times 10^{9} \times (-4 \times 10^{-12})}{0.30} = ${dec(el.U, 2)}$ J.
(ii) The centroid is $\dfrac{0.30}{\sqrt 3} \approx 0.173$ m from each corner; $\sum q = 1.0\ \mu$C, so $V = \dfrac{9 \times 10^{9} \times 1.0 \times 10^{-6}}{0.173} \approx ${sci(el.Vc, 3)}$ V.`,
  sol: 'Pairs; centroid distance a/√3.',
  scheme: [['Definition', 1], ['Three-pair expression', 1], ['Sum of products −4 × 10⁻¹²', 1], ['U = −0.12 J', 1], ['V ≈ 5.20 × 10⁴ V at the centroid', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(el.U, -0.12) && near(el.Vc, 5.196e4) || `el ${el.Vc}`);
const de = { q: 3e-6, d: 2e-3, E: 4e4 };
de.p = de.q * de.d;
de.U0 = -de.p * de.E;
de.W = 2 * de.p * de.E;
add('dipoleenergy-long', long({
  stem: '(a) Derive the expression U = −pE cos θ for a dipole in a uniform field. [2] (b) A dipole of charges ±3.0 μC, 2.0 mm apart, lies along a uniform field of 4.0 × 10⁴ N C⁻¹. Find its potential energy and the work needed to reverse it. [2] (c) Which of the two positions is stable? Explain. [1]',
  model: r`(a) The torque is $pE\sin\theta$; work to turn it slowly from $\theta_1$ to $\theta_2$: $W = \int pE\sin\theta\,d\theta = pE(\cos\theta_1 - \cos\theta_2)$. With U = 0 at 90°: $U = -pE\cos\theta = -\vec p\cdot\vec E$.

(b) $p = 3.0 \times 10^{-6} \times 2.0 \times 10^{-3} = ${sci(de.p, 2)}$ C m. Along the field: $U = -pE = ${sci(de.U0, 2)}$ J. Reversing (0° → 180°): $W = 2pE = ${sci(de.W, 2)}$ J.

(c) The aligned position: U is a minimum, and a small twist produces a restoring torque.`,
  sol: 'Work against torque; numbers; stability.',
  scheme: [['Work integral', 1], ['U = −pE cos θ', 1], ['U = −2.4 × 10⁻⁴ J', 1], ['W = 4.8 × 10⁻⁴ J', 1], ['Aligned position stable, with reason', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(de.U0, -2.4e-4) && near(de.W, 4.8e-4) || 'de');
const pf = { V: 300, d: 0.015 };
pf.E = pf.V / pf.d;
pf.v = Math.sqrt((2 * QE * pf.V) / ME);
pf.Vmid = pf.V / 2;
add('plates-long', long({
  stem: 'Two large parallel plates 1.5 cm apart are held at 0 V and 300 V. (a) Find the field between them. [1] (b) Describe the equipotential surfaces between the plates and give the potential halfway across. [1] (c) An electron is released from rest at the 0 V plate. Find the work done on it by the field and its speed on reaching the other plate. [2] (d) How would the speed change if the plates were moved to 3.0 cm apart at the same potential difference? Explain. [1]',
  model: r`(a) $E = \dfrac{V}{d} = \dfrac{300}{0.015} = ${sci(pf.E, 2)}$ V m$^{-1}$, from the 300 V plate to the 0 V plate.

(b) Planes parallel to the plates, equally spaced for equal steps of V; halfway across $V = ${dec(pf.Vmid, 3)}$ V.

(c) Work by the field $= eV = 1.6 \times 10^{-19} \times 300 = 4.8 \times 10^{-17}$ J; $v = \sqrt{\dfrac{2eV}{m}} \approx ${sci(pf.v, 3)}$ m s$^{-1}$.

(d) Unchanged: the energy gained depends only on the potential difference eV, not on the separation (the field halves but the distance doubles).`,
  sol: 'V/d; linear V; eV = ½mv².',
  scheme: [['E = 2.0 × 10⁴ V m⁻¹', 1], ['Parallel planes; 150 V halfway', 1], ['W = 4.8 × 10⁻¹⁷ J', 1], ['v ≈ 1.03 × 10⁷ m s⁻¹', 1], ['Speed unchanged, with reason', 1]],
  d: 4, c: 'analysis', t: [1, 4], wl: null,
}), () => near(pf.E, 2e4) && near(pf.v, 1.027e7) || `pf ${pf.v}`);

await import('./questions-extra.mjs');
