// ch02 Electrostatic Potential and Capacitance — two decks: Part 1 (t01–t03) potential, equipotentials and potential
// energy; Part 2 (t04–t06) conductors, dielectrics, capacitors and stored energy. Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, K, EPS0, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = (() => {
  const V = (K * (4e-9 - 2e-9)) / 0.1;
  const xin = 0.8 / 6; // 4/x = 2/(0.2 − x)
  const xout = 0.4; // 4/x = 2/(x − 0.2)
  return { V, xin, xout };
})();
const ex2 = (() => {
  const q = 2e-6;
  const VA = 50;
  const VB = -30;
  const Wext = q * (VB - VA);
  return { Wext, Wfield: -Wext };
})();
const ex3 = (() => {
  const s = 0.1;
  const U = (K / s) * (1e-12 + 1e-6 * -2e-6 + 1e-6 * -2e-6);
  return { U };
})();
const ex4 = (() => {
  const C = (EPS0 * 0.02) / 1e-3;
  return { C, CK: 5 * C, Q: C * 100 };
})();
const ex5 = (() => {
  const Cs = (3 * 6) / (3 + 6);
  const Ct = Cs + 4;
  const Qs = Cs * 12;
  return { Cs, Ct, Qt: Ct * 12, Qs, V3: Qs / 3, V6: Qs / 6, Q4: 4 * 12 };
})();
const ex6 = (() => {
  const U = 0.5 * 6e-6 * 12 ** 2;
  return { U, Ushared: U / 2 };
})();
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  point: svgV(G.EQUI_POINT, 'Concentric equipotential circles around a positive charge crossed at right angles by radial field lines'),
  dipole: svgV(G.EQUI_DIPOLE, 'Closed equipotential curves around each charge of a dipole and a straight zero-potential line midway', 'Traced numerically: the potential stays constant along each dashed curve.'),
  uniform: svgV(G.EQUI_UNIFORM, 'Equipotential planes perpendicular to a uniform field, with the potential falling along the field'),
  conductor: svgV(G.CONDUCTOR, 'Charged conductor with zero field inside and field lines normal to its surface'),
  plates: svgV(G.PLATES, 'Parallel-plate capacitor with a uniform field between the plates'),
  dielectric: svgV(G.DIELECTRIC, 'Dielectric slab between plates with induced surface charges reducing the field inside'),
  combos: svgV(G.SERIES_PARALLEL, 'Capacitors connected in series and in parallel across a battery'),
  triangle: svgV(G.TRIANGLE, 'Three charges at the corners of a triangle with the three pair distances marked'),
};
export const potPlot = plot(
  {
    x: { min: 0.2, max: 4, label: 'r (arbitrary units)' },
    y: { min: 0, max: 5.2, label: 'V or E (arbitrary units)' },
    functions: [
      { expr: '1/x', label: 'V ∝ 1/r' },
      { expr: '1/x^2', label: 'E ∝ 1/r²' },
    ],
  },
  'Graph comparing the potential of a point charge, falling as one over r, with its field, falling faster as one over r squared',
  'Point charge: both are 1 at r = 1; the field falls off faster.',
);
export const shellVPlot = plot(
  {
    x: { min: 0, max: 4, label: 'r / R' },
    y: { min: 0, max: 1.2, label: 'V / (kq/R)' },
    functions: [
      { expr: '1', label: 'inside: V = kq/R', domain: [0, 1] },
      { expr: '1/x', label: 'outside: V = kq/r', domain: [1, 4] },
    ],
    vlines: [{ x: 1, label: 'r = R', dashed: true }],
  },
  'Graph of potential against distance for a charged thin shell or conducting sphere: constant inside and equal to its surface value, then falling as one over r outside',
  'Inside, E = 0, so V does not change.',
);

export const deck1 = deck({
  part: 1,
  title: 'Electrostatic Potential and Capacitance — Part 1: Potential and potential energy',
  goals: [
    'Define electric potential and potential difference and find the potential of a point charge, a dipole and a system of charges',
    'Relate equipotential surfaces to field lines and use E = −dV/dr',
    'Calculate the potential energy of a system of charges and of a dipole in a uniform field',
  ],
  slides: [
    sl('title', 'Electrostatic Potential and Capacitance', {
      b: 'Part 1 — describing the electric field with a single number at each point, the **potential**, and the energy stored in arrangements of charges.',
      v: flow('LR', [['w', 'Work against the field'], ['v', 'Potential V'], ['e', 'Equipotential surfaces'], ['u', 'Potential energy U']], [['w', 'v'], ['v', 'e'], ['e', 'u']], 'Flow of the part: work against the field, potential, equipotential surfaces, potential energy'),
      n: 'A field is a vector at every point, which makes calculations heavy. In this part we replace it with a single number at each point, the electric potential, found from the work needed to bring a charge there. Potential makes energy problems easy. We will meet equipotential surfaces, link potential to field, and find the energy stored in a group of charges and in a dipole placed in a field.',
    }),
    sl('concept', 'Electric potential and potential difference', {
      b: r`The electrostatic force is **conservative**: the work done in moving a charge between two points does not depend on the path. So we can define
$$V_B - V_A = \dfrac{W_{A \to B}}{q},$$
the work done **by an external agent** per unit positive charge in moving it slowly from A to B. The **potential** at a point is the work per unit charge to bring a test charge from infinity ($V_\infty = 0$). Unit: **volt**, $1\ \text{V} = 1\ \text{J C}^{-1}$.`,
      ul: ['Potential is a scalar: potentials of several charges simply add.', 'A positive charge moves on its own from high to low potential; a negative charge from low to high.'],
      v: V.uniform,
      n: 'Because the electrostatic force is conservative, the work done in carrying a charge from one point to another depends only on the end points. The work done per unit positive charge by an outside agent is the potential difference between those points. Taking infinity as zero, the potential at a point is the work per unit charge to bring a test charge from infinity. One volt is one joule per coulomb. In the figure, potential falls along the field.',
    }),
    sl('concept', 'Potential of a point charge', {
      b: r`Bringing a unit positive charge from infinity to distance $r$ from $q$:
$$V(r) = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{q}{r} = \dfrac{kq}{r}$$
Positive near a positive charge, negative near a negative one; it falls as $1/r$, more slowly than the field ($1/r^2$).`,
      ul: ['$V$ has a sign; $E$ is a magnitude with a direction.', 'For a system of charges: $V = k\\sum_i \\dfrac{q_i}{r_i}$ (algebraic sum).'],
      v: potPlot,
      n: 'For a point charge, the potential at distance r is k q over r. It keeps the sign of the charge, so it is positive near a positive charge and negative near a negative one. Notice the graph: the potential falls as one over r, while the field falls faster, as one over r squared. For several charges, just add the potentials with their signs. No vector addition is needed.',
    }),
    sl('example', 'Worked example 1: potential of two charges', {
      b: r`Charges $+4$ nC and $-2$ nC are $20$ cm apart. Find (a) the potential at the midpoint, (b) the points on the line joining them where $V = 0$.`,
      ul: [
        r`(a) $V = \dfrac{9 \times 10^{9} \times (4 - 2) \times 10^{-9}}{0.10} = ${dec(ex1.V, 3)}$ V.`,
        r`(b) Between them, $x$ from $+4$ nC: $\dfrac{4}{x} = \dfrac{2}{0.20 - x}$, so $x = ${dec(ex1.xin, 2)}$ m (13.3 cm).`,
        r`Outside, beyond $-2$ nC: $\dfrac{4}{x} = \dfrac{2}{x - 0.20}$, so $x = ${dec(ex1.xout, 2)}$ m from $+4$ nC (20 cm beyond $-2$ nC).`,
        'Check — potentials add as numbers, so there can be two zero points; the **field** is not zero at either.',
      ],
      v: table(['Point', 'Potential'], [['Midpoint', `$${dec(ex1.V, 3)}$ V`], ['13.3 cm from +4 nC (between)', '0'], ['40 cm from +4 nC (outside)', '0']], 'Worked table: 180 volts at the midpoint and zero potential at 13.3 centimetres and at 40 centimetres from the positive charge'),
      n: 'Potentials are scalars, so at the midpoint just add k q over r for each charge with its sign: one hundred and eighty volts. To find where the potential is zero, set the two contributions equal in size. Between the charges this happens nearer the smaller charge, at thirteen point three centimetres from the larger one. There is a second zero point outside, beyond the negative charge. The field is not zero at these points.',
    }),
    sl('two-column', 'Potential of an electric dipole', {
      b: 'At distance $r$ from the centre, at angle $\\theta$ to the dipole axis ($r \\gg a$):',
      cols: [
        r`$$V = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{p\cos\theta}{r^2}$$
- On the axis ($\theta = 0^\circ$): $V = \dfrac{kp}{r^2}$.
- On the equatorial line ($\theta = 90^\circ$): $V = 0$.`,
        r`**Compared with a point charge**
- Depends on direction ($\cos\theta$), not just on $r$.
- Falls as $1/r^2$, faster than $1/r$.
- On the equatorial plane $V = 0$ although $E \neq 0$.`,
      ],
      v: V.dipole,
      n: 'For a dipole the potential far away is k p cos theta over r squared. On the axis it is k p over r squared. On the equatorial line it is zero, because every point there is the same distance from the two equal and opposite charges. That is a classic trap: zero potential does not mean zero field. The equatorial line has a field pointing opposite to the dipole moment.',
    }),
    sl('check', 'Quick check: zero potential, zero field?', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'zeroV-ar',
      n: 'Think of the equatorial line of a dipole. Work out the potential there and recall the direction of the field.',
    }),
    sl('diagram', 'Equipotential surfaces', {
      b: 'An **equipotential surface** has the same potential at every point.',
      ul: ['No work is done in moving a charge along it ($W = q\\Delta V = 0$).', 'The field is **perpendicular** to it at every point; otherwise a component along the surface would do work.', 'Field lines point from higher to lower equipotentials.', 'Two equipotentials never intersect.'],
      v: V.point,
      n: 'Join all points that have the same potential and you get an equipotential surface. Moving a charge along such a surface takes no work, because the potential difference is zero. That forces the field to be at right angles to the surface everywhere. For a point charge the surfaces are spheres. Equal potential steps are further apart far away, because the field is weaker there.',
    }),
    sl('diagram', 'Equipotentials of a dipole and of a uniform field', {
      b: 'For a uniform field the equipotentials are **parallel planes** perpendicular to $\\vec E$. For a dipole they are closed curves around each charge, with the $V = 0$ plane midway.',
      v: V.dipole,
      n: 'In a uniform field, such as between two large plates, the equipotentials are flat planes at right angles to the field, equally spaced for equal steps of potential. Around a dipole they form closed loops round each charge, positive round the positive charge and negative round the negative one. The plane midway between the charges is at zero potential. Field lines would cross every one of these curves at right angles.',
    }),
    sl('concept', 'Field from potential', {
      b: r`Moving a small distance $dl$ along $\vec E$, the potential drops by $dV = -E\,dl$. So
$$E = -\dfrac{dV}{dl}\quad \text{(along the direction of steepest fall)},\qquad E = \dfrac{\Delta V}{d}\ \text{in a uniform field.}$$`,
      ul: ['$\\vec E$ points in the direction in which $V$ **decreases** fastest.', 'Closely spaced equipotentials mean a strong field.', 'Unit check: V m$^{-1}$ = N C$^{-1}$.'],
      v: V.uniform,
      n: 'The field and the potential are linked by a slope. The field equals minus the rate at which potential changes with distance, taken along the direction where it falls fastest. In a uniform field this becomes the potential difference divided by the distance between the planes. So crowded equipotentials mean a strong field, and volts per metre is the same unit as newtons per coulomb.',
    }),
    sl('example', 'Worked example 2: work and potential difference', {
      b: r`(a) A charge of $+2.0\,\mu\text{C}$ is moved from A ($V_A = 50$ V) to B ($V_B = -30$ V). Find the work done by an external agent and by the field. (b) In a uniform field of 500 V m$^{-1}$, find the potential difference between planes 4.0 cm apart.`,
      ul: [
        r`(a) $W_\text{ext} = q(V_B - V_A) = 2.0 \times 10^{-6} \times (-30 - 50) = ${sci(ex2.Wext, 2)}$ J.`,
        r`The field does $W_\text{field} = -W_\text{ext} = ${sci(ex2.Wfield, 2)}$ J: a positive charge moves "downhill" in potential by itself.`,
        r`(b) $\Delta V = Ed = 500 \times 0.040 = 20$ V, the higher plane being further **up-field**.`,
      ],
      v: V.uniform,
      n: 'Work by an external agent is the charge times the change in potential, final minus initial. Here the potential falls by eighty volts, so the agent does negative work, minus one point six times ten to the minus four joule, and the field does the same amount of positive work. In a uniform field, the potential difference is simply field times distance, so five hundred volts per metre over four centimetres gives twenty volts.',
    }),
    sl('check', 'Quick check: work along an equipotential', {
      b: 'A charge is carried round a path that lies entirely on one equipotential surface.',
      v: V.point,
      chk: 'equiwork-mcq',
      n: 'Use W equals q times the potential difference between the start and the end of each small step.',
    }),
    sl('concept', 'Potential energy of a system of charges', {
      b: r`The potential energy of a system is the work done to assemble it from charges at infinity. For two charges:
$$U = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{q_1 q_2}{r_{12}}$$
For three charges, add over the **pairs**: $U = k\left(\dfrac{q_1q_2}{r_{12}} + \dfrac{q_1q_3}{r_{13}} + \dfrac{q_2q_3}{r_{23}}\right)$.`,
      ul: ['$U > 0$ for like charges (work needed to push them together).', '$U < 0$ for unlike charges (the system is bound; work is needed to separate them).', 'A charge $q$ in an external potential $V$ has $U = qV$.'],
      v: V.triangle,
      n: 'To assemble charges, bring them in one by one from far away and add up the work done against the forces already present. For two charges the result is k q one q two over r. With signs included, like charges give positive energy and unlike charges negative energy. For three charges, add one term for each pair, three terms in all. A charge in an outside potential V has energy q V.',
    }),
    sl('example', 'Worked example 3: energy of three charges', {
      b: r`Charges $+1.0\,\mu\text{C}$, $+1.0\,\mu\text{C}$ and $-2.0\,\mu\text{C}$ sit at the corners of an equilateral triangle of side 10 cm. Find the potential energy of the system.`,
      ul: [
        r`Step 1 — three pairs, all $r = 0.10$ m: $q_1q_2 = +1.0 \times 10^{-12}$, $q_1q_3 = q_2q_3 = -2.0 \times 10^{-12}$ C².`,
        r`Step 2 — sum of products $= (1 - 2 - 2) \times 10^{-12} = -3.0 \times 10^{-12}$ C².`,
        r`Step 3 — $U = \dfrac{9 \times 10^{9} \times (-3.0 \times 10^{-12})}{0.10} = ${dec(ex3.U, 2)}$ J.`,
        'Meaning — negative: 0.27 J of work must be done to pull the charges apart to infinity.',
      ],
      v: V.triangle,
      n: 'Count the pairs: there are three. One pair has two positive charges and two pairs are positive with negative. Because all distances are equal, add the products of the charges first, getting minus three times ten to the minus twelve. Multiply by nine times ten to the nine and divide by the side. The energy is minus zero point two seven joule, so the system is bound.',
    }),
    sl('two-column', 'A dipole in a uniform field: potential energy', {
      b: 'Taking $U = 0$ when the dipole is perpendicular to the field:',
      cols: [
        r`$$U(\theta) = -pE\cos\theta = -\vec p\cdot\vec E$$
- $\theta = 0^\circ$: $U = -pE$ (minimum, **stable**).
- $\theta = 90^\circ$: $U = 0$.
- $\theta = 180^\circ$: $U = +pE$ (maximum, **unstable**).`,
        r`**Work to rotate**
$$W = U(\theta_2) - U(\theta_1) = pE(\cos\theta_1 - \cos\theta_2)$$
Turning a dipole from $0^\circ$ to $180^\circ$ needs $W = 2pE$.`,
      ],
      v: table(['Angle θ', 'U', 'Equilibrium'], [['0°', '−pE', 'Stable'], ['90°', '0', 'Not in equilibrium (torque pE)'], ['180°', '+pE', 'Unstable']], 'Table of dipole potential energy at 0, 90 and 180 degrees: minus p E stable, zero, plus p E unstable'),
      n: 'A dipole in a uniform field has potential energy minus p E cos theta. It is lowest, minus p E, when the dipole points along the field, which is the stable position. It is highest, plus p E, when it points against the field, which is unstable. The work needed to turn the dipole is the change in this energy, so turning it all the way round from aligned to reversed takes two p E.',
    }),
    sl('check', 'Quick check: rotating a dipole', {
      b: 'Find the work needed to rotate a dipole from the stable position by 180°.',
      v: null,
      chk: 'rotate-num',
      n: 'Use the energy at the start and at the end of the rotation, with U equals minus p E cos theta.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Quantity', 'Result'],
        [
          ['Potential difference', '$V_B - V_A = W_{A\\to B}/q$'],
          ['Point charge', '$V = kq/r$'],
          ['Dipole ($r \\gg a$)', '$V = kp\\cos\\theta/r^2$'],
          ['Field from potential', '$E = -dV/dl$; uniform: $E = \\Delta V/d$'],
          ['Two charges', '$U = kq_1q_2/r$'],
          ['Dipole in a field', '$U = -pE\\cos\\theta$'],
        ],
        'Summary table of potential difference, potential of a point charge and a dipole, field from potential, energy of two charges and of a dipole in a field',
      ),
      n: 'To sum up: potential is work per unit charge, measured in volts, and it adds as a plain number. A point charge gives k q over r; a dipole gives k p cos theta over r squared, zero on its equatorial plane. The field is at right angles to equipotentials and equals the rate at which potential falls. Systems of charges store energy k q one q two over r per pair, and a dipole in a field has energy minus p E cos theta.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Keep the **signs** of charges in $V$ and $U$; leave them out only in Coulomb-force magnitudes.',
        'Work by the agent $= q(V_\\text{final} - V_\\text{initial})$; work by the field is the negative of that.',
        '$V = 0$ does not imply $E = 0$, and $E = 0$ does not imply $V = 0$.',
        'For energy of a system, count each **pair once**.',
      ],
      v: table(['Trap', 'Fix'], [['Adding potentials as vectors', 'Add as signed numbers'], ['Counting pairs twice', 'n charges have n(n − 1)/2 pairs'], ['Sign of work', 'Agent: q(V_f − V_i)']], 'Table of traps and fixes: add potentials as signed numbers, count pairs once, sign of work'),
      n: 'Signs carry the physics in this chapter, so keep them in every potential and energy calculation. Work by an outside agent is the charge times final minus initial potential. Do not assume that zero potential means zero field or the other way round. When finding the energy of a group of charges, count each pair once: three charges have three pairs, four charges have six.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electrostatic Potential and Capacitance — Part 2: Conductors, dielectrics and capacitors',
  goals: [
    'Explain the electrostatic properties of conductors and the polarisation of a dielectric',
    'Derive the capacitance of a parallel-plate capacitor with and without a dielectric',
    'Combine capacitors in series and in parallel',
    'Use the formulas for the energy stored in a capacitor',
  ],
  slides: [
    sl('title', 'Conductors, dielectrics and capacitors', {
      b: 'Part 2 — how charge behaves on conductors and inside insulators, and how a capacitor stores charge and energy.',
      v: flow('LR', [['c', 'Conductors'], ['d', 'Dielectrics'], ['k', 'Capacitance'], ['p', 'Parallel plates'], ['s', 'Series and parallel'], ['u', 'Stored energy']], [['c', 'd'], ['d', 'k'], ['k', 'p'], ['p', 's'], ['s', 'u']], 'Flow of the part: conductors, dielectrics, capacitance, parallel plates, combinations and stored energy'),
      n: 'Every phone charger, camera flash and ceiling-fan regulator contains capacitors. To understand them we first see how charge settles on conductors and how insulating materials respond to a field. Then we define capacitance, derive it for parallel plates with and without a dielectric, combine capacitors in series and in parallel, and find the energy a charged capacitor stores.',
    }),
    sl('concept', 'Electrostatics of conductors', {
      b: 'In a conductor in electrostatic equilibrium:',
      ul: [
        'The field **inside** the material is zero.',
        'Any excess charge resides on the **outer surface**.',
        'Just outside, the field is **normal** to the surface, with $E = \\sigma/\\varepsilon_0$.',
        'The whole conductor (surface and inside) is at **one potential**.',
        'A charge-free **cavity** inside a conductor has zero field: **electrostatic shielding**.',
      ],
      v: V.conductor,
      n: 'A conductor has free electrons. If there were any field inside, they would move until the field vanished, so in equilibrium the field inside is zero. Excess charge pushes itself out to the surface. The field just outside must be at right angles to the surface, otherwise charges would slide along it, and its value is sigma over epsilon nought. The whole body is one equipotential, and an empty cavity inside is shielded from outside fields.',
    }),
    sl('diagram', 'Potential of a charged conducting sphere', {
      b: r`For a sphere (or thin shell) of radius $R$ with charge $q$: outside $V = kq/r$; on and inside the surface $V = kq/R$, constant, because $E = 0$ inside.`,
      v: shellVPlot,
      n: 'Here is the potential of a charged conducting sphere. Outside, it behaves like a point charge at the centre, so the potential falls as one over r. At the surface it is k q over R. Inside, the field is zero, so no work is needed to move a charge around, and the potential stays at its surface value everywhere inside. Compare this flat graph with the field graph from Chapter one, which drops to zero inside.',
    }),
    sl('concept', 'Dielectrics and polarisation', {
      b: r`A **dielectric** is an insulator. In a field its molecules become (or line up as) dipoles: the material is **polarised**. The dipole moment per unit volume is the **polarisation** $\vec P$; for most materials it is proportional to the field.`,
      ul: [
        '**Non-polar** molecules (no permanent dipole): the field induces dipoles by shifting charges.',
        '**Polar** molecules (water): permanent dipoles, partly lined up by the field.',
        'Net effect: bound surface charges that **oppose** the applied field, so the field inside is reduced to $E_0/K$.',
      ],
      v: V.dielectric,
      n: 'An insulator placed in a field cannot conduct, but its molecules respond. In non-polar materials the field pulls the electron clouds slightly away from the nuclei, creating tiny induced dipoles. In polar materials the permanent dipoles turn partly into line. Either way, a layer of bound negative charge appears on the face near the positive plate and positive charge on the other face, reducing the field inside by the dielectric constant K.',
    }),
    sl('check', 'Quick check: conductors', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'cavity-tf',
      n: 'Remember what shielding means: think about a charge-free hollow inside a metal body when the body is charged or placed in an outside field.',
    }),
    sl('concept', 'Capacitors and capacitance', {
      b: r`A **capacitor** is two conductors separated by an insulator, carrying $+Q$ and $-Q$. The potential difference $V$ between them is proportional to $Q$:
$$C = \dfrac{Q}{V},\qquad \text{unit farad (F)} = \text{C V}^{-1}$$
$C$ depends only on the size, shape and separation of the conductors and the medium between them.`,
      ul: ['1 F is huge; practical values are μF ($10^{-6}$ F), nF and pF ($10^{-12}$ F).', 'A large $C$ stores a large charge at a small voltage.'],
      v: V.plates,
      n: 'A capacitor is any pair of conductors separated by an insulator. Charge one with plus Q and the other with minus Q, and a potential difference V appears between them, proportional to Q. The ratio Q over V is the capacitance, measured in farads. It depends on geometry and the material between the conductors, not on the charge. A farad is enormous; real capacitors are microfarads or picofarads.',
    }),
    sl('concept', 'Parallel-plate capacitor', {
      b: r`Plates of area $A$, separation $d$ (small compared with the plate size), charge $\pm Q$, $\sigma = Q/A$. Between the plates the two sheet fields add:`,
      m: [r`E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{Q}{\varepsilon_0 A},\qquad V = Ed = \dfrac{Qd}{\varepsilon_0 A},\qquad C = \dfrac{Q}{V} = \dfrac{\varepsilon_0 A}{d}`],
      ul: ['Outside the plates the sheet fields cancel, so $E \\approx 0$.', 'Bigger plates or a smaller gap give a larger capacitance.'],
      v: V.plates,
      n: 'For two large parallel plates, each plate acts like a charged sheet. Between them the two sheet fields add to sigma over epsilon nought, and outside they cancel. The field is uniform, so the potential difference is field times separation. Divide the charge by this voltage and you get epsilon nought A over d. Larger plates or a narrower gap mean more capacitance.',
    }),
    sl('concept', 'Effect of a dielectric', {
      b: r`Filling the gap with a dielectric of constant $K$ reduces the field (for the same $Q$) from $E_0$ to $E_0/K$, so $V$ falls by $K$ and
$$C = \dfrac{K\varepsilon_0 A}{d} = K C_0$$
A slab of thickness $t < d$ gives $C = \dfrac{\varepsilon_0 A}{d - t + t/K}$.`,
      ul: ['With the battery **disconnected**: $Q$ fixed, $V$ and $E$ fall by $K$.', 'With the battery **connected**: $V$ fixed, $Q$ rises by $K$.'],
      v: V.dielectric,
      n: 'Insert a dielectric between the plates. Its bound surface charges weaken the field by the factor K, so for the same charge the voltage is K times smaller and the capacitance is K times larger. If the slab fills only part of the gap, only that part is affected. Watch what is held fixed: an isolated capacitor keeps its charge, while one still joined to a battery keeps its voltage.',
    }),
    sl('example', 'Worked example 4: a parallel-plate capacitor', {
      b: r`Plates of area $0.020$ m² are $1.0$ mm apart in air. Find $C$, the charge at 100 V, and $C$ when the gap is filled with a dielectric of $K = 5$.`,
      ul: [
        r`Step 1 — $C = \dfrac{\varepsilon_0 A}{d} = \dfrac{8.85 \times 10^{-12} \times 0.020}{1.0 \times 10^{-3}} = ${sci(ex4.C, 3)}$ F $= 177$ pF.`,
        r`Step 2 — $Q = CV = 1.77 \times 10^{-10} \times 100 = ${sci(ex4.Q, 3)}$ C (17.7 nC).`,
        r`Step 3 — with the dielectric: $C = 5 \times 177 = 885$ pF.`,
      ],
      v: table(['Quantity', 'Value'], [['C (air)', '177 pF'], ['Q at 100 V', '17.7 nC'], ['C (K = 5)', '885 pF']], 'Worked table: 177 picofarads in air, 17.7 nanocoulombs at 100 volts, 885 picofarads with the dielectric'),
      n: 'Convert the gap to metres, one times ten to the minus three. Then epsilon nought A over d gives one hundred and seventy seven picofarads, a typical small capacitor even with a large plate area. At one hundred volts the charge is seventeen point seven nanocoulombs. Filling the gap with a dielectric of constant five multiplies the capacitance by five, to eight hundred and eighty five picofarads.',
    }),
    sl('diagram', 'Combining capacitors', {
      b: 'Series and parallel rules:',
      v: V.combos,
      ul: [
        r`**Series:** same charge $Q$ on each; voltages add: $\dfrac{1}{C} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$ (smaller than the smallest).`,
        r`**Parallel:** same voltage $V$ across each; charges add: $C = C_1 + C_2 + \dots$`,
      ],
      n: 'In series, capacitors are joined end to end. The same charge appears on each, because charge on the inner plates is only separated, not supplied. The voltages add, so the reciprocals of capacitance add, and the total is smaller than the smallest one. In parallel, every capacitor has the full battery voltage and the charges add, so the capacitances simply add. These are the reverse of the rules for resistors.',
    }),
    sl('check', 'Quick check: series combination', {
      b: 'Find the equivalent capacitance.',
      v: V.combos,
      chk: 'series-mcq',
      n: 'For capacitors in series, add the reciprocals and then take the reciprocal of the sum. The answer must be smaller than the smallest capacitor.',
    }),
    sl('example', 'Worked example 5: a mixed network', {
      b: r`$C_1 = 3\,\mu\text{F}$ and $C_2 = 6\,\mu\text{F}$ are in series; this pair is in parallel with $C_3 = 4\,\mu\text{F}$; the network is across a 12 V battery. Find the equivalent capacitance and the charge and voltage on each.`,
      ul: [
        r`Step 1 — series pair: $C_s = \dfrac{3 \times 6}{3 + 6} = ${ex5.Cs}\,\mu\text{F}$; total $C = 2 + 4 = ${ex5.Ct}\,\mu\text{F}$; $Q_\text{total} = ${ex5.Qt}\,\mu\text{C}$.`,
        r`Step 2 — series branch: $Q = 2 \times 12 = ${ex5.Qs}\,\mu\text{C}$ on both $C_1$ and $C_2$; $V_1 = 24/3 = ${ex5.V3}$ V, $V_2 = 24/6 = ${ex5.V6}$ V.`,
        r`Step 3 — $C_3$: $V = 12$ V, $Q_3 = 4 \times 12 = ${ex5.Q4}\,\mu\text{C}$.`,
        r`Check — $V_1 + V_2 = 12$ V and $24 + 48 = 72\,\mu\text{C}$.`,
      ],
      v: table(['Capacitor', 'Charge (μC)', 'Voltage (V)'], [['C₁ = 3 μF', String(ex5.Qs), String(ex5.V3)], ['C₂ = 6 μF', String(ex5.Qs), String(ex5.V6)], ['C₃ = 4 μF', String(ex5.Q4), '12']], 'Worked table: the 3 and 6 microfarad capacitors each carry 24 microcoulombs at 8 and 4 volts; the 4 microfarad carries 48 microcoulombs at 12 volts'),
      n: 'Reduce the network step by step. Three and six microfarads in series give two. Adding the four microfarads in parallel gives six, so the battery supplies seventy two microcoulombs. The series branch carries twenty four microcoulombs on each capacitor, splitting the twelve volts as eight and four: the smaller capacitor takes the bigger voltage. The four microfarad capacitor has the full twelve volts and forty eight microcoulombs.',
    }),
    sl('concept', 'Energy stored in a capacitor', {
      b: r`Charging a capacitor means moving charge against the growing voltage. The stored energy (formula only; no derivation required):
$$U = \dfrac{Q^2}{2C} = \dfrac{1}{2}CV^2 = \dfrac{1}{2}QV$$
The energy is stored in the **electric field** between the plates.`,
      ul: ['Use $\\tfrac{1}{2}CV^2$ when $V$ is fixed (battery connected), $Q^2/2C$ when $Q$ is fixed (isolated).', 'A camera flash stores energy slowly in a capacitor and releases it in a fraction of a millisecond.'],
      v: plot({ x: { min: 0, max: 10, label: 'Q (μC)' }, y: { min: 0, max: 5.5, label: 'V (V)' }, functions: [{ expr: '0.5x', label: 'V = Q/C (C = 2 μF)', domain: [0, 10] }] }, 'Straight-line graph of voltage against charge for a 2 microfarad capacitor; the area under the line up to Q equals the stored energy one half Q V', 'Area under the V–Q line = stored energy.'),
      n: 'As charge builds up, the voltage rises in proportion, so each extra bit of charge needs a little more work. The total work, the area under the voltage against charge line, is one half Q V. Using Q equals C V this can be written one half C V squared or Q squared over two C. Choose the form that matches what is held fixed. The energy is stored in the field between the plates.',
    }),
    sl('example', 'Worked example 6: energy stored and shared', {
      b: r`A $6.0\,\mu\text{F}$ capacitor is charged to 12 V. (a) Find the energy stored. (b) It is disconnected and joined to an identical uncharged capacitor. Find the total energy afterwards.`,
      ul: [
        r`(a) $U = \tfrac{1}{2}CV^2 = 0.5 \times 6.0 \times 10^{-6} \times 12^2 = ${sci(ex6.U, 3)}$ J (432 μJ).`,
        r`(b) Charge $Q = 72\,\mu\text{C}$ is shared: 36 μC each, $V = 6$ V. Total $U = 2 \times \tfrac{1}{2} \times 6.0 \times 10^{-6} \times 6^2 = ${sci(ex6.Ushared, 3)}$ J.`,
        'Half the energy is lost — as heat in the connecting wires and as radiation — even though charge is conserved.',
      ],
      v: table(['Stage', 'Charge', 'Voltage', 'Energy'], [['Before', '72 μC', '12 V', '432 μJ'], ['After (total)', '72 μC', '6 V', '216 μJ']], 'Worked table: before sharing 72 microcoulombs at 12 volts, 432 microjoules; after sharing the same charge at 6 volts, 216 microjoules'),
      n: 'One half C V squared gives four hundred and thirty two microjoules. When the charged capacitor is joined to an identical empty one, the seventy two microcoulombs spread equally, so each has thirty six at six volts. Add the two energies and you get only two hundred and sixteen microjoules. Charge is conserved but energy is not: half is lost as heat and radiation while the charge flows.',
    }),
    sl('check', 'Quick check: energy with a dielectric', {
      b: 'An isolated charged capacitor has a dielectric slab inserted. What happens to its stored energy?',
      v: V.dielectric,
      chk: 'energyK-mcq',
      n: 'The capacitor is isolated, so its charge is fixed. Choose the energy formula that uses charge and capacitance.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Conductor', 'E = 0 inside; charge on surface; $E = \\sigma/\\varepsilon_0$ normal outside; equipotential'],
          ['Dielectric', 'Polarised; field reduced to $E_0/K$'],
          ['Capacitance', '$C = Q/V$'],
          ['Parallel plates', '$C = K\\varepsilon_0 A/d$'],
          ['Series / parallel', '$1/C = \\sum 1/C_i$ / $C = \\sum C_i$'],
          ['Energy', '$U = Q^2/2C = \\tfrac12 CV^2 = \\tfrac12 QV$'],
        ],
        'Summary table of conductor properties, dielectric effect, capacitance, parallel plates, combinations and energy',
      ),
      n: 'To sum up: a conductor in equilibrium has no field inside, its charge on the surface and one potential throughout. Dielectrics polarise and weaken the field by K. Capacitance is charge per volt, epsilon nought A over d for parallel plates, multiplied by K with a dielectric. Series capacitors add as reciprocals and parallel ones add directly. The stored energy is one half C V squared.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Always ask: is the battery **connected** (V fixed) or **disconnected** (Q fixed)? Then track C, Q, V, E and U.',
        'Series: same Q, smaller capacitor takes the larger voltage. Parallel: same V.',
        'Convert μF, pF, mm and cm² to SI before substituting.',
        'The derivation asked is $C = \\varepsilon_0 A/d$ (and $K\\varepsilon_0 A/d$); the energy formula is used without derivation.',
      ],
      v: table(['Change with dielectric K', 'Battery connected', 'Battery disconnected'], [['C', '× K', '× K'], ['Q', '× K', 'same'], ['V', 'same', '÷ K'], ['U', '× K', '÷ K']], 'Table of how capacitance, charge, voltage and energy change when a dielectric is inserted with the battery connected and disconnected'),
      n: 'The most common question in this part asks what happens when a dielectric is inserted or the plates are moved. First decide whether the battery is still connected. If it is, the voltage stays fixed; if not, the charge stays fixed. Then use the table. In series networks the smaller capacitor takes the larger share of the voltage. And convert every unit to SI before you substitute.',
    }),
  ],
});
