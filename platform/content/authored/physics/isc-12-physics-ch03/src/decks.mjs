// ISC 12 Physics ch03 Electrostatic Potential and Potential Energy — two decks: Part 1 (t01–t03) potential, equipotentials,
// potential of a point charge, of a system of charges and of a dipole; Part 2 (t04–t05) potential energy of charges and of a
// dipole in a uniform field. Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, K, QE } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { q1: 4e-9, q2: -2e-9, d: 0.3 };
ex1.Vmid = (K * (ex1.q1 + ex1.q2)) / (ex1.d / 2);
ex1.xin = (ex1.d * 4) / 6; // 4/x = 2/(0.3 − x)
ex1.xout = 0.6; // 4/x = 2/(x − 0.3)
const ex2 = { E: 500, d: 0.2, q: 2e-6 };
ex2.dV = -ex2.E * ex2.d;
ex2.W = ex2.q * -ex2.dV; // work done by the field on +q moving along E
const ex3 = { q: 5e-9, r: 0.3 };
ex3.V = (K * ex3.q) / ex3.r;
ex3.E = (K * ex3.q) / ex3.r ** 2;
const ex4 = { q: 3e-9, d: 2e-3, r: 0.1 };
ex4.p = ex4.q * ex4.d;
ex4.Vax = (K * ex4.p) / ex4.r ** 2;
ex4.V60 = ex4.Vax * Math.cos(deg(60));
const ex5 = { q: [3e-6, 2e-6, -1e-6], s: 0.1 };
ex5.U = (K * (ex5.q[0] * ex5.q[1] + ex5.q[0] * ex5.q[2] + ex5.q[1] * ex5.q[2])) / ex5.s;
const ex6 = { p: 5e-9, E: 2e5 };
ex6.U0 = -ex6.p * ex6.E;
ex6.W = 2 * ex6.p * ex6.E;
ex6.W90 = ex6.p * ex6.E;
const ex7 = { V: 100 };
ex7.U = QE * ex7.V;
ex7.v = Math.sqrt((2 * ex7.U) / 9.1e-31);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  point: svgV(G.EQUI_POINT, 'Spherical equipotentials around a point charge', 'Radii r, 2r, 3r carry V, V/2, V/3.'),
  dipole: svgV(G.EQUI_DIPOLE, 'Equipotentials of a dipole with the zero-potential bisector', 'Traced numerically; each curve checked to keep a constant potential.'),
  uniform: svgV(G.EQUI_UNIFORM, 'Equipotential planes in a uniform field'),
  tri: svgV(G.TRIANGLE, 'Three charges at the corners of a triangle'),
  dpoint: svgV(G.DIPOLE_POINT, 'Dipole and a general point P at distance r and angle θ'),
  dpe: svgV(G.DIPOLE_PE, 'Dipole at 0°, 90° and 180° to a uniform field with its potential energy'),
};
export const VEplot = plot(
  {
    x: { min: 0.5, max: 4, label: 'distance r (in units of r₀)' },
    y: { min: 0, max: 4.2, label: 'value / value at r₀' },
    functions: [
      { expr: '1/x', label: 'potential V ∝ 1/r' },
      { expr: '1/x^2', label: 'field E ∝ 1/r²' },
    ],
  },
  'Potential and field of a point charge against distance: the potential falls as one over r and the field falls faster, as one over r squared',
  'Doubling r halves V but quarters E.',
);
export const dipoleUplot = plot(
  {
    x: { min: 0, max: 180, label: 'angle θ between p and E (degrees)' },
    y: { min: -1.2, max: 1.2, label: 'U / pE' },
    functions: [{ expr: '-cos(pi*x/180)', label: 'U = −pE cos θ' }],
  },
  'Potential energy of a dipole in a uniform field against the angle between the dipole moment and the field: minus p E at zero degrees, zero at ninety, plus p E at one hundred and eighty',
  'Least energy (stable) when p is along E; most energy (unstable) when opposite.',
);

export const deck1 = deck({
  part: 1,
  title: 'Electrostatic Potential and Potential Energy — Part 1: Electric potential',
  goals: [
    'Define electric potential and potential difference, and describe equipotential surfaces',
    'Derive the potential of a point charge and compare V and E with distance',
    'Find the potential of a system of charges and of a dipole',
  ],
  slides: [
    sl('title', 'Electrostatic Potential and Potential Energy', {
      b: 'Part 1 — a single number at every point that tells you how much work it takes to bring a charge there.',
      v: V.point,
      n: 'The electric field is a vector, with a size and a direction at every point. Often it is easier to work with a scalar instead: the electric potential, which tells us the work needed per coulomb to bring a charge to a point. In this part we define potential, find it for a point charge, for several charges and for a dipole, and draw surfaces on which it is constant.',
    }),
    sl('concept', 'Potential and potential difference', {
      b: r`The **potential difference** between A and B is the work done per unit positive charge in moving a test charge from A to B without acceleration:
$$V_B - V_A = \dfrac{W_{AB}}{q_0}$$
The **potential** at a point is the work done per unit charge in bringing a test charge from **infinity** (where V = 0) to that point: $V = W/q_0$. Unit: **volt** (1 V = 1 J C⁻¹). Potential is a **scalar**.`,
      ul: ['The electrostatic force is conservative, so W does not depend on the path taken.', 'A positive charge moves naturally from high to low potential.'],
      v: V.uniform,
      n: 'Push a positive test charge against the field from A to B, slowly so that it gains no kinetic energy. The work you do per coulomb is the potential difference between B and A. If we start at infinity, where the potential is taken as zero, the work per coulomb is the potential at the point. Because the electric force is conservative, the route does not matter. One volt is one joule per coulomb.',
    }),
    sl('diagram', 'Equipotential surfaces', {
      b: 'An **equipotential surface** joins points at the same potential:',
      ul: ['No work is done in moving a charge along an equipotential.', 'The field is everywhere **perpendicular** to equipotentials (otherwise a component of E along the surface would do work).', 'E points from higher to lower potential; equipotentials are **closer together** where E is stronger. Two equipotentials never intersect.', 'Point charge: concentric spheres; uniform field: parallel planes perpendicular to E.'],
      v: V.uniform,
      n: 'Join all the points that share the same potential and you get an equipotential surface. Moving a charge along it takes no work, which means the field can have no component along it: field lines always cross equipotentials at right angles. Around a point charge they are spheres; in a uniform field they are flat planes, evenly spaced, with the potential falling in the direction of the field.',
    }),
    sl('concept', 'Potential of a point charge', {
      b: r`Bring a test charge from infinity to a distance $r$ from $q$, against the force $\dfrac{kqq_0}{x^2}$:
$$W = -\int_\infty^{r}\dfrac{kqq_0}{x^2}\,dx = \dfrac{kqq_0}{r}\ \Rightarrow\ V = \dfrac{W}{q_0} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r}$$`,
      ul: ['V is positive near a positive charge and negative near a negative charge.', 'V ∝ 1/r but E ∝ 1/r²: the potential falls off more slowly.'],
      v: VEplot,
      n: 'To bring the test charge in from infinity we push against the repulsion, which grows as the charge gets closer. Adding up force times small displacement, the work done comes to k q q nought over r. Dividing by q nought gives the potential, k q over r. It is positive round a positive charge and negative round a negative one, and it falls off as one over r, more slowly than the field.',
    }),
    sl('example', 'Worked example 1: potential and field of a point charge', {
      b: r`Find the potential and the field 30 cm from a charge of +5.0 nC, and the ratio V/E.`,
      ul: [
        r`$V = \dfrac{kq}{r} = \dfrac{9 \times 10^{9} \times 5.0 \times 10^{-9}}{0.30} = ${dec(ex3.V, 3)}$ V; $E = \dfrac{kq}{r^2} = ${dec(ex3.E, 3)}$ V m$^{-1}$.`,
        r`$\dfrac{V}{E} = r = 0.30$ m, a useful check.`,
      ],
      v: VEplot,
      n: 'Using k q over r, the potential is one hundred and fifty volts; using k q over r squared, the field is five hundred volts per metre. Divide one by the other and you get back the distance, point three metre. That relation holds for any point charge, and it is a quick way to check your arithmetic.',
    }),
    sl('example', 'Worked example 2: moving a charge in a uniform field', {
      b: r`In a uniform field of 500 V m$^{-1}$, a charge of $+2.0\ \mu$C moves 20 cm along the field. Find the change in potential and the work done by the field.`,
      ul: [
        r`Step 1 — potential falls along E: $\Delta V = -Ed = -500 \times 0.20 = ${dec(ex2.dV, 3)}$ V.`,
        r`Step 2 — work by the field $= -q\Delta V = 2.0 \times 10^{-6} \times 100 = ${sci(ex2.W, 2)}$ J.`,
      ],
      v: V.uniform,
      n: 'In a uniform field the potential drops by E times the distance moved along the field: five hundred times point two, a hundred volts lower. A positive charge moving downhill in potential has work done on it by the field, charge times the drop, two times ten to the minus four joule. To move it back, an external agent would have to supply the same work.',
    }),
    sl('check', 'Quick check: equipotentials', {
      b: 'Judge the assertion and the reason.',
      v: V.uniform,
      chk: 'perp-ar',
      n: 'What would happen if the field had a component along an equipotential surface?',
    }),
    sl('concept', 'Potential of a system of charges', {
      b: r`Potentials **add algebraically** (they are scalars):
$$V = \dfrac{1}{4\pi\varepsilon_0}\sum_i \dfrac{q_i}{r_i}$$`,
      ul: ['Keep the sign of each charge.', 'V can be zero at a point where E is not (and vice versa).'],
      v: V.dipole,
      n: 'Because potential is a scalar, finding the potential of several charges is easy: work out k q over r for each, with its sign, and simply add the numbers. No vectors, no angles. One consequence surprises many students: a point can have zero potential even though the field there is not zero, as happens midway between a dipole’s charges.',
    }),
    sl('example', 'Worked example 3: where is V zero?', {
      b: r`Charges of $+4.0$ nC and $-2.0$ nC are 30 cm apart. Find (a) the potential at the midpoint, (b) the points on the line through them where V = 0.`,
      ul: [
        r`(a) $V = \dfrac{9 \times 10^{9}(4.0 - 2.0) \times 10^{-9}}{0.15} = ${dec(ex1.Vmid, 3)}$ V.`,
        r`(b) Between them, at $x$ from +4 nC: $\dfrac{4}{x} = \dfrac{2}{0.30 - x} \Rightarrow x = ${dec(ex1.xin, 2)}$ m. Beyond −2 nC: $\dfrac{4}{x} = \dfrac{2}{x - 0.30} \Rightarrow x = ${dec(ex1.xout, 2)}$ m from +4 nC.`,
      ],
      v: V.dipole,
      n: 'At the midpoint, add k q over r for both charges: the positive one wins, giving one hundred and twenty volts. For zero potential the two contributions must cancel. Between the charges that happens twenty centimetres from the bigger charge, and outside, beyond the smaller negative charge, at sixty centimetres from the positive one. There are two such points on the line.',
    }),
    sl('two-column', 'Potential of an electric dipole', {
      b: r`For $\pm q$ separated by $2a$, at distance $r$ from the centre:`,
      cols: [
        r`**Axial point**
$V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^2 - a^2} \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^2}$

**Equatorial point**
$V = 0$ (equal distances, opposite charges)`,
        r`**General point** (angle θ from $\vec p$, $r \gg a$)
$V = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p\cos\theta}{r^2}$

- Falls as $1/r^2$ (point charge: $1/r$)`,
      ],
      v: V.dpoint,
      n: 'On the axis, the positive charge is nearer, so the potential is k q over r minus a, minus k q over r plus a, which simplifies to k p over r squared minus a squared. On the equatorial line the two charges are equally far away and cancel exactly: zero potential. At a general point far away, the potential is k p cos theta over r squared, so it falls faster than that of a single charge.',
    }),
    sl('example', 'Worked example 4: potential of a small dipole', {
      b: r`Charges of $\pm 3.0$ nC are 2.0 mm apart. Find the potential 10 cm from the centre (a) on the axis, (b) on the equatorial line, (c) along a line at 60° to $\vec p$.`,
      ul: [
        r`$p = 3.0 \times 10^{-9} \times 2.0 \times 10^{-3} = ${sci(ex4.p, 2)}$ C m.`,
        r`(a) $V = \dfrac{kp}{r^2} = \dfrac{9 \times 10^{9} \times ${sci(ex4.p, 2)}}{(0.10)^2} = ${dec(ex4.Vax, 2)}$ V. (b) $V = 0$. (c) $V = \dfrac{kp\cos 60°}{r^2} = ${dec(ex4.V60, 2)}$ V.`,
      ],
      v: V.dpoint,
      n: 'First the dipole moment, six times ten to the minus twelve coulomb metre. On the axis, k p over r squared gives five point four volts. On the equatorial line the potential is exactly zero. Along a line at sixty degrees, multiply by cos sixty, one half, giving two point seven volts. Notice the field on the equatorial line is not zero, even though the potential is.',
    }),
    sl('check', 'Quick check: dipole potential', {
      b: 'Choose the correct option.',
      v: V.dpoint,
      chk: 'eqV-mcq',
      n: 'Compare the distances of a point on the equatorial line from the two charges.',
    }),
    sl('diagram', 'Equipotentials of a dipole', {
      b: 'Closed surfaces surround each charge (positive V around +q, negative around −q); the **perpendicular bisector** is the V = 0 equipotential. Field lines cross every equipotential at right angles.',
      v: V.dipole,
      n: 'Here are the equipotentials of a dipole, traced by computer. Near each charge they are almost spheres, then they distort as the other charge’s influence grows. The plane halfway between the charges is at zero potential everywhere. Wherever field lines and equipotentials meet, they cross at right angles.',
    }),
    sl('check', 'Quick check: potential of a point charge', {
      b: 'Calculate the potential.',
      v: VEplot,
      chk: 'Vpoint-num',
      n: 'Use k q over r, keeping the sign of the charge.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Potential', '$V = W/q_0$ from infinity; volt = J C⁻¹; scalar'],
          ['Potential difference', '$V_B - V_A = W_{AB}/q_0$'],
          ['Point charge', '$V = q/(4\\pi\\varepsilon_0 r)$; $V \\propto 1/r$, $E \\propto 1/r^2$'],
          ['Several charges', '$V = \\sum kq_i/r_i$ (algebraic sum)'],
          ['Dipole', 'axial $kp/(r^2 - a^2)$; equatorial 0; general $kp\\cos\\theta/r^2$'],
          ['Equipotentials', 'Perpendicular to E; no work along them; never intersect'],
        ],
        'Summary table of potential, potential difference, potentials of a point charge, several charges and a dipole, and equipotential surfaces',
      ),
      n: 'To sum up: potential is work per unit charge from infinity, a scalar measured in volts. A point charge gives k q over r. Several charges simply add their potentials with signs. A dipole gives k p cos theta over r squared far away, zero on its equatorial line. Equipotential surfaces are perpendicular to field lines, and no work is done moving along them.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Derive $V = kq/r$ by integrating the work from infinity; state that V(∞) = 0.',
        'Add potentials as numbers with signs, not as vectors.',
        'For zero-potential points, check both between and outside the charges.',
        'Equipotentials: always perpendicular to field lines; give the reason.',
      ],
      v: table(['Asked', 'Key point'], [['Is potential a vector?', 'No, a scalar'], ['V on a dipole’s equatorial line?', 'Zero'], ['Work along an equipotential?', 'Zero']], 'Table of common questions and the key point for each'),
      n: 'In the derivation of k q over r, show the integral from infinity and say that the potential at infinity is zero. Add potentials as signed numbers, never as vectors. When looking for points of zero potential, look both between the charges and outside them. And whenever equipotentials appear, give the reason they are perpendicular to the field.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrostatic Potential and Potential Energy — Part 2: Potential energy',
  goals: [
    'Use U = qV for a charge in a field',
    'Calculate the potential energy of systems of two and three point charges',
    'Derive and use U = −p·E for a dipole in a uniform field',
  ],
  slides: [
    sl('title', 'Electrostatic potential energy', {
      b: 'Part 2 — the energy stored in arrangements of charges, and why a dipole prefers to line up with a field.',
      v: V.tri,
      n: 'Assembling charges takes work, and that work is stored as electrostatic potential energy. It is released when the charges are let go, which is how batteries, capacitors and even chemical bonds store energy. In this part we find the potential energy of a charge in a field, of systems of charges, and of a dipole in a uniform field.',
    }),
    sl('concept', 'Potential energy of a charge in a field', {
      b: r`A charge $q$ at a point of potential $V$ has potential energy
$$U = qV$$
Moving it through a potential difference $\Delta V$ changes its energy by $q\Delta V$.`,
      ul: ['The **electronvolt**: 1 eV = energy gained by an electron through 1 V = $1.6 \\times 10^{-19}$ J.', 'A positive charge loses potential energy moving to lower potential (gaining kinetic energy).'],
      v: V.uniform,
      n: 'A charge q sitting where the potential is V has potential energy q V. Let it move to a lower potential and, if it is positive, it loses potential energy and speeds up; an electron does the reverse. This gives a handy unit for atomic physics, the electronvolt, the energy an electron gains through one volt, one point six times ten to the minus nineteen joule.',
    }),
    sl('example', 'Worked example 5: accelerating an electron', {
      b: r`An electron starts from rest and is accelerated through 100 V. Find the energy gained (in eV and J) and its final speed.`,
      ul: [
        r`Step 1 — $\Delta K = eV = 100$ eV $= 100 \times 1.6 \times 10^{-19} = ${sci(ex7.U, 2)}$ J.`,
        r`Step 2 — $v = \sqrt{\dfrac{2\Delta K}{m_e}} = \sqrt{\dfrac{2 \times ${sci(ex7.U, 2)}}{9.1 \times 10^{-31}}} \approx ${sci(ex7.v, 3)}$ m s$^{-1}$.`,
      ],
      v: V.uniform,
      n: 'The electron loses potential energy e V as it moves to the higher potential, and gains exactly that much kinetic energy: one hundred electronvolts, or one point six times ten to the minus seventeen joule. Setting half m v squared equal to this gives a speed of about six times ten to the six metres per second, two per cent of the speed of light.',
    }),
    sl('concept', 'Potential energy of two point charges', {
      b: r`Bring $q_1$ from infinity (no work), then $q_2$ to distance $r_{12}$ against the field of $q_1$:
$$U = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r_{12}}$$`,
      ul: ['**Like** charges: U > 0 (work had to be done to push them together).', '**Unlike** charges: U < 0 (they attract; work must be done to separate them).'],
      v: VEplot,
      n: 'To build a system of two charges, bring the first one in from infinity: no work, because nothing else is there yet. Bring the second one in against the field of the first: the work is q two times the potential of q one, k q one q two over r. For like charges this is positive; for unlike charges it is negative, meaning the pair is bound and energy is needed to pull it apart.',
    }),
    sl('diagram', 'Potential energy of three charges', {
      b: r`Add the energy of **each pair** once:
$$U = \dfrac{1}{4\pi\varepsilon_0}\left(\dfrac{q_1q_2}{r_{12}} + \dfrac{q_1q_3}{r_{13}} + \dfrac{q_2q_3}{r_{23}}\right)$$`,
      ul: ['This is the work needed to assemble the system from infinity, and the energy released if it flies apart.'],
      v: V.tri,
      n: 'For three charges, bring them in one at a time. The second costs the energy of the pair one two. The third costs the energy of its interaction with both of the others. So the total is the sum over the three pairs, each counted once. The order of assembly does not matter: the answer is the same, because the electric force is conservative.',
    }),
    sl('example', 'Worked example 6: assembling three charges', {
      b: r`Charges of $+3.0$, $+2.0$ and $-1.0\ \mu$C are placed at the corners of an equilateral triangle of side 10 cm. Find the potential energy of the system.`,
      ul: [
        r`Step 1 — sum of products: $(3)(2) + (3)(-1) + (2)(-1) = 6 - 3 - 2 = 1$ (in units of $10^{-12}$ C²).`,
        r`Step 2 — $U = \dfrac{9 \times 10^{9} \times 1 \times 10^{-12}}{0.10} = ${dec(ex5.U, 2)}$ J.`,
      ],
      v: V.tri,
      n: 'All three sides are equal, so add the three products of charges: six, minus three, minus two, leaving one times ten to the minus twelve coulomb squared. Multiply by nine times ten to the nine and divide by the side, point one metre: about nought point zero nine joule. It is positive, so on balance work had to be done against repulsion to build the triangle.',
    }),
    sl('check', 'Quick check: energy of a pair', {
      b: 'Calculate the potential energy.',
      v: V.tri,
      chk: 'pairU-num',
      n: 'Use k q one q two over r, keeping the signs of the charges.',
    }),
    sl('check', 'Quick check: sign of potential energy', {
      b: 'Choose the correct option.',
      v: V.tri,
      chk: 'Usign-mcq',
      n: 'Think about whether the two charges attract or repel.',
    }),
    sl('diagram', 'Potential energy of a dipole in a uniform field', {
      b: r`Rotating a dipole from θ₁ to θ₂ against the torque $pE\sin\theta$ needs work $W = \int_{\theta_1}^{\theta_2} pE\sin\theta\,d\theta = pE(\cos\theta_1 - \cos\theta_2)$. Taking U = 0 at θ = 90°:
$$U = -pE\cos\theta = -\vec p\cdot\vec E$$`,
      ul: ['θ = 0°: U = −pE, minimum, **stable** equilibrium.', 'θ = 90°: U = 0.', 'θ = 180°: U = +pE, maximum, **unstable** equilibrium.'],
      v: V.dpe,
      n: 'Turning a dipole against the torque of the field takes work. Integrating p E sine theta over the angle gives p E times the change in cos theta. Choosing zero energy at ninety degrees, the potential energy is minus p E cos theta, minus p dot E. It is lowest when the dipole points along the field, which is its stable position, and highest when it points the opposite way.',
    }),
    sl('example', 'Worked example 7: turning a dipole round', {
      b: r`A dipole of moment $5.0 \times 10^{-9}$ C m is aligned with a uniform field of $2.0 \times 10^{5}$ N C$^{-1}$. Find (a) its potential energy, (b) the work needed to turn it through 90°, (c) through 180°.`,
      ul: [
        r`(a) $U_0 = -pE = -5.0 \times 10^{-9} \times 2.0 \times 10^{5} = ${sci(ex6.U0, 2)}$ J.`,
        r`(b) $W = pE(\cos 0° - \cos 90°) = ${sci(ex6.W90, 2)}$ J. (c) $W = pE(\cos 0° - \cos 180°) = 2pE = ${sci(ex6.W, 2)}$ J.`,
      ],
      v: dipoleUplot,
      n: 'Aligned with the field, the dipole has energy minus p E, minus one times ten to the minus three joule. Turning it to ninety degrees raises its energy to zero, so the work needed is one millijoule. Turning it all the way round to face against the field raises the energy to plus p E, so the work needed is twice as much, two millijoules.',
    }),
    sl('check', 'Quick check: dipole energy', {
      b: 'Decide whether the statement is true or false.',
      v: dipoleUplot,
      chk: 'unstable-tf',
      n: 'Where is the potential energy of a dipole largest?',
    }),
    sl('two-column', 'Field and potential: how they are linked', {
      b: 'Two ways of describing the same field:',
      cols: [
        '**Field E**\n- Vector\n- Force per unit charge\n- Points from high to low V\n- Uniform field: E = ΔV/d',
        '**Potential V**\n- Scalar\n- Energy per unit charge\n- Constant on equipotentials\n- Point charge: kq/r',
      ],
      v: V.uniform,
      n: 'Field and potential are two descriptions of the same thing. The field is a vector, force per coulomb; the potential is a scalar, energy per coulomb. The field always points from higher to lower potential, at right angles to equipotentials, and its size is the rate at which potential falls with distance: in a uniform field, the potential difference divided by the separation.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Charge in a field', '$U = qV$; 1 eV = 1.6 × 10⁻¹⁹ J'],
          ['Two charges', '$U = kq_1q_2/r_{12}$; + for like, − for unlike'],
          ['Three charges', 'Sum over the three pairs'],
          ['Dipole in uniform E', '$U = -pE\\cos\\theta = -\\vec p\\cdot\\vec E$'],
          ['Work to rotate', '$W = pE(\\cos\\theta_1 - \\cos\\theta_2)$'],
          ['Equilibrium', 'Stable at 0°, unstable at 180°'],
        ],
        'Summary table of potential energy of a charge in a field, of two and three charges and of a dipole, the work to rotate a dipole, and its equilibria',
      ),
      n: 'To sum up: a charge at potential V has energy q V, and the electronvolt is the natural unit for single charges. The energy of a system of charges is the sum over every pair of k q q over r, positive for like charges and negative for unlike ones. A dipole in a uniform field has energy minus p dot E, least when it is aligned and greatest when it is reversed.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Count each pair once in multi-charge energies; keep signs.',
        'Work done by an external agent = increase in potential energy.',
        'Derive U = −pE cos θ from the work against the torque; state the zero at 90°.',
        'For speeds, set the loss of qV equal to the gain of ½mv².',
      ],
      v: table(['Asked', 'Key point'], [['U for unlike charges?', 'Negative'], ['Work to turn a dipole 0° → 180°?', '2pE'], ['Value of 1 eV?', '1.6 × 10⁻¹⁹ J']], 'Table of common questions and the key point for each'),
      n: 'In energy problems with several charges, list the pairs and add each once, signs included. Remember that the work an external agent does equals the rise in potential energy. For the dipole, derive minus p E cos theta from the work against the torque and say where the zero is chosen. And when speeds are asked for, equate the loss of q V to the gain in kinetic energy.',
    }),
  ],
});
