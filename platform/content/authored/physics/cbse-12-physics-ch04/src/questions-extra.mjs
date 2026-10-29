// ch04 further items (added in the verifier pass for count and competency balance). Imported by questions.mjs after
// the main bank, so ids continue in order.
import { mk, add, r, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

add('rest-ar', ar({
  a: 'A charged particle at rest in a steady magnetic field stays at rest.',
  r: 'Magnetic field lines always form closed loops.',
  key: 'b',
  sol: r`Both are true, but R is not the reason for A. A follows because the magnetic force $q\vec v \times \vec B$ is zero when $\vec v = 0$ — option (b).`,
  d: 2, c: 'understanding', t: [1],
}));
add('solenoid-ar', ar({
  a: 'The magnetic field inside a long solenoid is nearly uniform.',
  r: 'The magnetic field just outside the middle of a long solenoid is very strong.',
  key: 'c',
  sol: 'A is true. R is false: outside a long solenoid the contributions of the turns nearly cancel, so the field there is very weak — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('radial-ar', ar({
  a: 'In a moving coil galvanometer the deflection is directly proportional to the current.',
  r: 'The radial field keeps the plane of the coil along the field at every deflection, so the deflecting torque is always NIAB.',
  key: 'a',
  sol: r`Both true; with torque $NIAB$ at all angles, balancing $k\phi$ gives $\phi \propto I$, which is what R explains — option (a).`,
  d: 3, c: 'understanding', t: [6],
}));
add('loopforce-tf', tf({
  stem: 'A current-carrying loop placed in a uniform magnetic field experiences a net force.',
  key: 'f',
  sol: 'False. The forces on opposite sides cancel, so the net force is zero; the loop experiences only a torque. (In a non-uniform field there can be a net force.)',
  d: 1, c: 'understanding', t: [5],
}));
add('radius-tf', tf({
  stem: 'The field inside a long, tightly wound solenoid does not depend on the radius of its turns.',
  key: 't',
  sol: r`True. $B = \mu_0 nI$ depends only on the turns per unit length and the current.`,
  d: 2, c: 'understanding', t: [3],
}));
add('mu0-fill', fill({
  stem: 'The permeability of free space is μ₀ = 4π × 10⁻⁷ in the SI unit tesla metre per ___.',
  acc: [['ampere', 'A']],
  sol: 'Tesla metre per **ampere** (T m A⁻¹), equivalent to N A⁻².',
  d: 1, c: 'recall', t: [2],
}));
add('pitch-mcq', mcq({
  stem: 'A proton moves along a helical path in a uniform magnetic field. If the field is doubled (the velocity components unchanged at that instant), the pitch of the helix',
  right: 'halves',
  wrong: ['doubles', 'stays the same', 'becomes four times'],
  sol: r`Pitch $= v_\parallel T$ and $T = \dfrac{2\pi m}{qB}$: doubling $B$ halves $T$ and so halves the pitch — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('twoloops-mcq', mcq({
  stem: r`Two concentric circular loops lie in the same plane, with radii $R$ and $2R$. Each carries current $I$, but in opposite senses. The field at the common centre is`,
  right: r`$\dfrac{\mu_0 I}{4R}$`,
  wrong: [r`$\dfrac{3\mu_0 I}{4R}$`, 'zero', r`$\dfrac{\mu_0 I}{2R}$`],
  sol: r`The fields are opposite: $\dfrac{\mu_0 I}{2R} - \dfrac{\mu_0 I}{2(2R)} = \dfrac{\mu_0 I}{4R}$, in the direction set by the smaller loop — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(1 / 2 - 1 / 4, 1 / 4) || 'two');
add('fourfold-mcq', mcq({
  stem: 'The radius of a circular coil is doubled, keeping the number of turns and the current the same. Its magnetic moment becomes',
  right: 'four times as large',
  wrong: ['twice as large', 'half as large', 'unchanged'],
  sol: r`$m = NI\pi R^2$, so doubling $R$ multiplies $m$ by 4 — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('angle-num', num({
  stem: 'A straight wire 20 cm long carrying 3.0 A in a uniform field of 0.50 T experiences a force of 0.15 N. Find the angle between the wire and the field, in degrees.',
  value: 30, tol: 0.5, unit: '°',
  sol: r`$F = IlB\sin\theta$, so $\sin\theta = \dfrac{0.15}{3.0 \times 0.20 \times 0.50} = 0.5$, so $\theta = 30$ degrees.`,
  scheme: [['sin θ = F/(IlB) = 0.5', 1], ['θ = 30°', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near((Math.asin(0.15 / (3 * 0.2 * 0.5)) * 180) / Math.PI, q.answer.value) || 'theta');
add('extend-mcq', mcq({
  stem: 'A voltmeter made from a galvanometer has a total resistance of 2000 Ω and a range of 0–5 V. What extra resistance must be added in series to extend its range to 0–15 V?',
  right: '4000 Ω',
  wrong: ['2000 Ω', '6000 Ω', '1000 Ω'],
  sol: r`Full-scale current $I_g = 5/2000 = 0.0025$ A. For 15 V the total must be $15/0.0025 = 6000$ Ω, so add $6000 - 2000 = 4000$ Ω — option (@K).`,
  d: 3, c: 'application', t: [6],
}), () => near(15 / (5 / 2000) - 2000, 4000) || 'ext');
add('momentum-mcq', mcq({
  stem: 'A proton and an electron with momenta of equal size move perpendicular to the same uniform magnetic field. Which statement is correct?',
  right: 'They move on circles of equal radius, in opposite senses',
  wrong: ['The electron’s circle is much smaller', 'The proton’s circle is much smaller', 'They move on equal circles in the same sense'],
  sol: r`$r = \dfrac{mv}{qB} = \dfrac{p}{|q|B}$: equal $p$ and $|q|$ give equal radii; opposite charges circle in opposite senses — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('beam-short', short({
  marks: 2,
  stem: 'An electron beam travels horizontally away from you towards a screen. A bar magnet is held so that its field at the beam points vertically upwards. Which way is the spot on the screen deflected? Explain.',
  model: r`Take $\vec v$ away from you and $\vec B$ up. For a **positive** charge, $\vec v \times \vec B$ points to your **right** (forward × up = right). The electrons are **negative**, so the force — and the deflection of the spot — is to your **left**.`,
  sol: 'Find v × B, then reverse for electrons.',
  scheme: [['v × B to the right for a positive charge', 1], ['Electron deflected to the left', 1]],
  d: 3, c: 'application', t: [1],
}), () => { const F = cross([0, 0, 1], [0, -1, 0]); return (F[0] > 0) || 'beam'; }); // viewer axes: x right, y down, z away; v = +z, B up = −y: v × B = +x (right) for +q, so electrons go left
add('ampere-short', short({
  marks: 2,
  stem: 'Ampere’s circuital law is true for every closed loop. Why, then, is it not used to find the field of a short straight segment of wire?',
  model: r`Ampere’s law gives $B$ easily only when **symmetry** makes $B$ constant and tangential (or zero) along a loop, so that $\oint \vec B\cdot d\vec l$ becomes $B \times$ length. Near a short segment the field varies along any loop, so the integral cannot be simplified; the **Biot–Savart law** is used instead.`,
  sol: 'The law needs symmetry to be useful.',
  scheme: [['Needs B constant along the loop (symmetry)', 1], ['Short segment lacks it: use Biot–Savart', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));
