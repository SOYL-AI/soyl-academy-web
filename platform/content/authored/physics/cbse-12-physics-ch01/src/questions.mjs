// ch01 Electric Charges and Fields — question bank. Every numerical value is computed here from the givens and
// re-checked by the `check` functions (independent re-solve); AR keys planned: a d b c a b a.
import { mk, add, r, K, EPS0, QE, ME, sci, dec, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const coul = (q1, q2, d) => (K * Math.abs(q1 * q2)) / d ** 2;
const fpt = (q, d) => (K * Math.abs(q)) / d ** 2;

// ================================================================ t01 charge, Coulomb's law, superposition
add('quant-mcq', mcq({
  stem: 'In an oil-drop experiment, which of the following could be the charge on a drop?',
  right: r`$4.8 \times 10^{-19}$ C`,
  wrong: [r`$2.4 \times 10^{-19}$ C`, r`$1.0 \times 10^{-19}$ C`, r`$5.6 \times 10^{-19}$ C`],
  sol: r`A charge must be $n e$. $\dfrac{4.8 \times 10^{-19}}{1.6 \times 10^{-19}} = 3$, a whole number; the others give 1.5, 0.625 and 3.5 — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}), () => [4.8, 2.4, 1.0, 5.6].map((x) => x / 1.6).filter((n) => Math.abs(n - Math.round(n)) < 1e-9).length === 1 || 'one integer');

add('double-mcq', mcq({
  stem: 'Two point charges exert a force $F$ on each other. Both charges are doubled and the distance between them is also doubled. The new force is',
  right: '$F$',
  wrong: ['$2F$', '$4F$', '$F/2$'],
  sol: r`$F \propto q_1q_2/r^2$: the product of charges becomes 4 times and $r^2$ becomes 4 times, so the force is unchanged — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near((2 * 2) / 2 ** 2, 1) || 'ratio');

const med = { Fa: 0.4, Fl: 0.05 };
add('medium-mcq', mcq({
  stem: `Two small charged spheres repel each other with a force of ${med.Fa} N in air. With the same separation in a liquid, the force is ${med.Fl} N. The dielectric constant of the liquid is`,
  right: String(med.Fa / med.Fl),
  wrong: ['0.125', '20', '4'],
  sol: r`$\varepsilon_r = F_\text{air}/F_\text{liquid} = 0.4/0.05 = 8$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), (q) => near(med.Fa / med.Fl, 8) || 'er');

const gained = 2.5e13;
add('electrons-mcq', mcq({
  stem: r`A plastic comb gains $2.5 \times 10^{13}$ electrons when it is run through dry hair. The charge on the comb is`,
  right: r`$-4.0\,\mu\text{C}$`,
  wrong: [r`$+4.0\,\mu\text{C}$`, r`$-4.0\ \text{nC}$`, r`$-1.6\,\mu\text{C}$`],
  sol: r`$q = n e = 2.5 \times 10^{13} \times 1.6 \times 10^{-19} = 4.0 \times 10^{-6}$ C, negative because electrons were gained — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(gained * QE, 4e-6) || 'q');

add('touch-mcq', mcq({
  stem: r`Two identical metal spheres carry $+6\,\mu\text{C}$ and $-2\,\mu\text{C}$. They are touched together and then separated. The charge on each is`,
  right: r`$+2\,\mu\text{C}$`,
  wrong: [r`$+4\,\mu\text{C}$`, r`$+3\,\mu\text{C}$ and $-1\,\mu\text{C}$`, r`$+8\,\mu\text{C}$`],
  sol: r`Total charge is conserved: $+6 - 2 = +4\,\mu\text{C}$, shared equally by identical spheres, so $+2\,\mu\text{C}$ each — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => (6 - 2) / 2 === 2 || 'share');

add('induction-mcq', mcq({
  stem: 'A positively charged rod is held near an insulated, uncharged metal sphere. The sphere is touched with an earthed wire, the wire is removed, and then the rod is taken away. The sphere is now',
  right: 'negatively charged',
  wrong: ['positively charged', 'uncharged', 'positive on one side and negative on the other'],
  sol: 'The rod pulls electrons from earth onto the sphere while it is earthed; they are trapped when the wire is removed first — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));

add('vector-mcq', mcq({
  stem: r`In $\vec F_{21} = k\dfrac{q_1q_2}{r^2}\hat r_{12}$, $\hat r_{12}$ points from $q_1$ to $q_2$. If $q_1 > 0$ and $q_2 < 0$, the force on $q_2$`,
  right: r`points from $q_2$ towards $q_1$`,
  wrong: [r`points from $q_1$ towards $q_2$`, 'is perpendicular to the line joining them', 'is zero'],
  sol: r`$q_1q_2 < 0$, so $\vec F_{21}$ is along $-\hat r_{12}$, i.e. towards $q_1$: attraction — option (@K).`,
  d: 3, c: 'understanding', t: [1],
}));

const pr = (() => {
  const G = 6.67e-11;
  const mp = 1.67e-27;
  return (K * QE * QE) / (G * mp * mp);
})();
add('gravity-mcq', mcq({
  stem: r`Two protons are a distance $r$ apart. The ratio of the electric force to the gravitational force between them is about ($G = 6.67 \times 10^{-11}$ N m² kg$^{-2}$, $m_p = 1.67 \times 10^{-27}$ kg)`,
  right: r`$10^{36}$`,
  wrong: [r`$10^{18}$`, r`$10^{-36}$`, r`$10^{6}$`],
  sol: r`$\dfrac{F_e}{F_g} = \dfrac{ke^2}{Gm_p^2} = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{6.67 \times 10^{-11} \times (1.67 \times 10^{-27})^2} \approx ${sci(pr, 2)}$; $r$ cancels — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => (Math.round(Math.log10(pr)) === 36) || `ratio ${pr}`);

add('equil-mcq', mcq({
  stem: 'Charges $+q$ and $+4q$ are fixed a distance $d$ apart. Where should a third charge be placed so that the net force on it is zero?',
  right: 'Between them, $d/3$ from $+q$',
  wrong: ['Between them, $d/2$ from $+q$', 'Between them, $d/3$ from $+4q$', 'Outside them, $d$ beyond $+q$'],
  sol: r`At distance $x$ from $+q$: $\dfrac{q}{x^2} = \dfrac{4q}{(d-x)^2}$, so $d - x = 2x$ and $x = d/3$; between like charges the two forces are opposite — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => { const x = 1 / 3; return near(1 / x ** 2, 4 / (1 - x) ** 2) || 'x'; });

add('paper-ar', ar({
  a: 'A charged balloon attracts small uncharged bits of paper.',
  r: 'The balloon induces charges on the paper, and the induced charge nearer the balloon is opposite in sign to the balloon’s charge.',
  key: 'a',
  sol: 'Both are true. The opposite induced charge is nearer, so its attraction beats the repulsion of the farther like charge; R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('quant-ar', ar({
  a: r`A body can carry a charge of $2.4 \times 10^{-19}$ C.`,
  r: 'Electric charge is quantised.',
  key: 'd',
  sol: r`R is true. A is false: $\dfrac{2.4 \times 10^{-19}}{1.6 \times 10^{-19}} = 1.5$ is not a whole number — option (d).`,
  d: 2, c: 'understanding', t: [1],
}));
add('rub-tf', tf({
  stem: 'When a glass rod is rubbed with silk, protons move from the silk to the glass.',
  key: 'f',
  sol: 'False. Electrons move from the glass to the silk; protons stay in the nuclei. The glass becomes positive because it loses electrons.',
  d: 1, c: 'recall', t: [1],
}));
add('e-fill', fill({
  stem: 'The charge on any body is a whole-number multiple of the charge of an ___.',
  acc: [['electron', 'proton', 'electron or proton']],
  sol: 'Of an **electron** (magnitude $e = 1.6 \\times 10^{-19}$ C), the basic unit of charge.',
  d: 1, c: 'recall', t: [1],
}));

const tn = { before: 6 * 2, after: 2 * 2 };
add('touch-num', num({
  stem: r`Two identical small metal spheres with charges $+6\,\mu\text{C}$ and $-2\,\mu\text{C}$ attract each other with a force $F$ when a distance $r$ apart. They are touched and returned to the same separation. Find the ratio (new force)/(old force), to two decimal places.`,
  value: 0.33, tol: 0.01, unit: null,
  sol: r`After touching each has $+2\,\mu\text{C}$. $F \propto |q_1q_2|$: old product $6 \times 2 = 12$, new product $2 \times 2 = 4$. Ratio $= 4/12 \approx 0.33$ (now repulsive).`,
  scheme: [['Shared charge +2 μC each', 1], ['Ratio 4/12 = 0.33', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(tn.after / tn.before, q.answer.value, 0.02) || 'ratio');

const line3 = { FA: coul(4e-6, 1e-6, 0.2), FC: coul(2e-6, 1e-6, 0.3) };
add('line-num', num({
  stem: r`Charges $+4\,\mu\text{C}$, $+1\,\mu\text{C}$ and $-2\,\mu\text{C}$ are fixed on the x-axis at $x = 0$, $x = 0.20$ m and $x = 0.50$ m. Find the magnitude of the net force on the $+1\,\mu\text{C}$ charge, in newtons.`,
  value: Number(dec(line3.FA + line3.FC, 2)), tol: 0.05, unit: 'N',
  sol: r`From $+4\,\mu\text{C}$ (repulsion, $+x$): $\dfrac{9 \times 10^{9} \times 4 \times 10^{-6} \times 1 \times 10^{-6}}{0.20^2} = ${dec(line3.FA, 2)}$ N. From $-2\,\mu\text{C}$ (attraction, $+x$): $\dfrac{9 \times 10^{9} \times 2 \times 10^{-6} \times 1 \times 10^{-6}}{0.30^2} = ${dec(line3.FC, 2)}$ N. Both along $+x$: $${dec(line3.FA, 2)} + ${dec(line3.FC, 2)} = ${dec(line3.FA + line3.FC, 2)}$ N.`,
  scheme: [['Each force with direction', 1], ['Net 1.1 N along +x', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(line3.FA + line3.FC, q.answer.value, 0.01) || 'net');

// ================================================================ t02 field and field lines
const ef = { E: 2e4 };
ef.a = (QE * ef.E) / ME;
add('electron-mcq', mcq({
  stem: r`An electron is released from rest in a uniform field of $2.0 \times 10^{4}$ N C$^{-1}$ that points to the right. Its acceleration is ($m_e = 9.1 \times 10^{-31}$ kg)`,
  right: r`$${sci(ef.a, 2)}$ m s$^{-2}$ to the left`,
  wrong: [r`$${sci(ef.a, 2)}$ m s$^{-2}$ to the right`, r`$${sci((QE * ef.E) / 1.67e-27, 2)}$ m s$^{-2}$ to the left`, r`$2.0 \times 10^{4}$ m s$^{-2}$ to the left`],
  sol: r`$a = \dfrac{eE}{m_e} = \dfrac{1.6 \times 10^{-19} \times 2.0 \times 10^{4}}{9.1 \times 10^{-31}} \approx ${sci(ef.a, 2)}$ m s$^{-2}$, opposite to $\vec E$ since the charge is negative — option (@K). (The third value uses the proton mass.)`,
  d: 3, c: 'application', t: [2],
}), () => near(ef.a, 3.5e15, 0.02) || `a ${ef.a}`);

add('cross-tf', tf({
  stem: 'Two electric field lines can cross each other at a point where the field is very strong.',
  key: 'f',
  sol: 'False. At a crossing the tangent, and so the field, would have two directions at one point, which is impossible. A strong field is shown by crowded lines, not by crossings.',
  d: 1, c: 'understanding', t: [2],
}));
add('notprop-mcq', mcq({
  stem: 'Which statement about electrostatic field lines is NOT correct?',
  right: 'They form closed loops around charges',
  wrong: ['They start on positive charges and end on negative charges', 'Their tangent gives the direction of the field', 'They are closer together where the field is stronger'],
  sol: 'Electrostatic field lines begin and end on charges and never close on themselves — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('unlike-neutral-mcq', mcq({
  stem: 'Charges $+4q$ and $-q$ are fixed a distance $d$ apart. The point where the electric field is zero lies',
  right: 'on the line, a distance $d$ beyond $-q$ (away from $+4q$)',
  wrong: ['between the charges, $d/3$ from $-q$', 'between the charges, $d/2$ from $-q$', 'on the line, a distance $d$ beyond $+4q$'],
  sol: r`Between unlike charges both fields point the same way, so the zero lies outside, near the smaller charge. At $x$ beyond $-q$: $\dfrac{4q}{(d+x)^2} = \dfrac{q}{x^2}$, so $d + x = 2x$, $x = d$ — option (@K).`,
  d: 4, c: 'analysis', t: [2],
}), () => { const x = 1; return near(4 / (1 + x) ** 2, 1 / x ** 2) || 'x'; });
add('density-mcq', mcq({
  stem: 'In a field-line diagram, lines are closely packed near point A and widely spaced near point B. Which is correct?',
  right: 'The field is stronger at A than at B',
  wrong: ['The field is stronger at B than at A', 'The field is zero at B', 'A charge at A feels no force'],
  sol: 'The density of field lines shows the field strength — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('test-charge-mcq', mcq({
  stem: 'The test charge used to define the electric field at a point is taken to be very small because',
  right: 'a large test charge would disturb the charges that produce the field',
  wrong: ['a small charge feels a larger force', 'the field depends on the size of the test charge', 'only small charges obey Coulomb’s law'],
  sol: 'A tiny test charge measures the field without moving the source charges — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const fN = fpt(5e-9, 0.3);
add('field-num', num({
  stem: 'Find the magnitude of the electric field 30 cm from a point charge of 5.0 nC in air, in N C⁻¹.',
  value: Number(dec(fN, 2)), tol: 5, unit: 'N C⁻¹',
  sol: r`$E = \dfrac{kq}{r^2} = \dfrac{9 \times 10^{9} \times 5.0 \times 10^{-9}}{0.30^2} = ${dec(fN, 2)}$ N C$^{-1}$.`,
  scheme: [['Substitution in kq/r²', 0.5], ['500 N C⁻¹', 0.5]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(fN, q.answer.value) || 'E');
const mid = { E1: fpt(3e-9, 0.1), E2: fpt(1e-9, 0.1) };
add('mid-num', num({
  stem: 'Charges of +3.0 nC and +1.0 nC are 20 cm apart in air. Find the magnitude of the electric field at the midpoint between them, in N C⁻¹.',
  value: Number(dec(mid.E1 - mid.E2, 2)), tol: 20, unit: 'N C⁻¹',
  sol: r`Each is $0.10$ m away. $E_1 = \dfrac{9 \times 10^{9} \times 3.0 \times 10^{-9}}{0.10^2} = ${dec(mid.E1, 2)}$ N C$^{-1}$ (away from the 3 nC charge); $E_2 = ${dec(mid.E2, 2)}$ N C$^{-1}$ (away from the 1 nC charge). Opposite directions: $${dec(mid.E1, 2)} - ${dec(mid.E2, 2)} = ${dec(mid.E1 - mid.E2, 2)}$ N C$^{-1}$, towards the 1 nC charge.`,
  scheme: [['Both fields with opposite directions', 1], ['1800 N C⁻¹ towards the 1 nC charge', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(mid.E1 - mid.E2, q.answer.value) || 'mid');
add('unitE-fill', fill({
  stem: 'The SI unit of electric field is newton per ___.',
  acc: [['coulomb', 'C']],
  sol: 'Newton per **coulomb** (N C$^{-1}$), the force per unit charge; it is the same as volt per metre.',
  d: 1, c: 'recall', t: [2],
}));
add('negative-ar', ar({
  a: 'Electric field lines in a charge-free region are continuous curves.',
  r: 'Two electric field lines can never cross each other.',
  key: 'b',
  sol: 'Both are true. Continuity follows because lines only begin or end on charges; R is a separate property (one direction at each point) and does not explain A — option (b).',
  d: 3, c: 'understanding', t: [2],
}));

// ================================================================ t03 dipole
add('ratio-mcq', mcq({
  stem: 'The field at a point on the axis of a short dipole, a distance $r$ from its centre, is $E$. The field at a point on its equatorial line at a distance $2r$ is',
  right: '$E/16$',
  wrong: ['$E/8$', '$E/4$', '$E/2$'],
  sol: r`$E = 2kp/r^3$. At $2r$ on the equator: $\dfrac{kp}{(2r)^3} = \dfrac{kp}{8r^3} = \dfrac{1}{16}\cdot\dfrac{2kp}{r^3}$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(1 / 8 / 2, 1 / 16) || 'ratio');
add('eq-dir-mcq', mcq({
  stem: 'The electric field at a point on the equatorial line of a dipole is directed',
  right: 'opposite to the dipole moment',
  wrong: ['along the dipole moment', 'along the equatorial line, away from the dipole', 'along the equatorial line, towards the dipole'],
  sol: 'The components along the equatorial line cancel and the remaining components point from $+q$ towards $-q$, i.e. opposite to $\\vec p$ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('maxtorque-mcq', mcq({
  stem: 'A dipole in a uniform electric field experiences the largest torque when the angle between $\\vec p$ and $\\vec E$ is',
  right: '$90^\\circ$',
  wrong: ['$0^\\circ$', '$45^\\circ$', '$180^\\circ$'],
  sol: '$\\tau = pE\\sin\\theta$ is largest when $\\sin\\theta = 1$ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('nonuniform-mcq', mcq({
  stem: 'A dipole is placed in a NON-uniform electric field. In general it experiences',
  right: 'both a net force and a torque',
  wrong: ['a torque but never a net force', 'a net force but never a torque', 'neither a force nor a torque'],
  sol: 'The two charges sit where the field differs, so the forces no longer cancel; a torque acts unless $\\vec p$ is along $\\vec E$ — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const water = { p: 6.2e-30 };
water.s = water.p / QE;
add('water-mcq', mcq({
  stem: r`A water molecule has a dipole moment of about $6.2 \times 10^{-30}$ C m. If this were due to charges $+e$ and $-e$, their separation would be about`,
  right: r`$${sci(water.s, 2)}$ m`,
  wrong: [r`$${sci(water.s * 10, 2)}$ m`, r`$${sci(water.s / 2, 2)}$ m`, r`$${sci(water.s * 1e3, 2)}$ m`],
  sol: r`$2a = \dfrac{p}{e} = \dfrac{6.2 \times 10^{-30}}{1.6 \times 10^{-19}} \approx ${sci(water.s, 2)}$ m, a fraction of an atomic size — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(water.s, 3.9e-11, 0.01) || `s ${water.s}`);
add('uniform-ar', ar({
  a: 'An electric dipole placed in a uniform electric field experiences no net force.',
  r: 'The forces on its two charges are equal in size and opposite in direction.',
  key: 'a',
  sol: 'Both true; the equal and opposite forces $\\pm q\\vec E$ add to zero, which is exactly why there is no net force (they only form a couple) — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
const ax = { q: 1e-9, s: 0.01, r: 0.1 };
ax.p = ax.q * ax.s;
ax.E = (2 * K * ax.p) / ax.r ** 3;
add('axial-num', num({
  stem: 'Charges of +1.0 nC and −1.0 nC are 1.0 cm apart. Find the electric field on the axis of this dipole, 10 cm from its centre, in N C⁻¹.',
  value: Number(dec(ax.E, 2)), tol: 4, unit: 'N C⁻¹',
  sol: r`$p = 1.0 \times 10^{-9} \times 0.010 = ${sci(ax.p, 2)}$ C m. Since $r \gg a$: $E = \dfrac{2kp}{r^3} = \dfrac{2 \times 9 \times 10^{9} \times 1.0 \times 10^{-11}}{0.10^3} = ${dec(ax.E, 2)}$ N C$^{-1}$, along $\vec p$.`,
  scheme: [['p = 1.0 × 10⁻¹¹ C m', 1], ['E = 180 N C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near((2 * K * 1e-11) / 1e-3, q.answer.value) || 'E');
const tq = { q: 2e-6, s: 2e-3, E: 5e4 };
tq.p = tq.q * tq.s;
tq.tau = tq.p * tq.E * 0.5;
add('torque-num', num({
  stem: 'A dipole is made of charges ±2.0 μC separated by 2.0 mm. It is placed at 30° to a uniform field of 5.0 × 10⁴ N C⁻¹. Find the torque on it, in millinewton metres (mN m).',
  value: Number(dec(tq.tau * 1e3, 2)), tol: 0.01, unit: 'mN m',
  sol: r`$p = 2.0 \times 10^{-6} \times 2.0 \times 10^{-3} = ${sci(tq.p, 2)}$ C m. $\tau = pE\sin 30^\circ = 4.0 \times 10^{-9} \times 5.0 \times 10^{4} \times 0.5 = ${sci(tq.tau, 2)}$ N m. In mN m: $${sci(tq.tau, 2)} \times 10^{3} = ${dec(tq.tau * 1e3, 2)}$.`,
  scheme: [['p = 4.0 × 10⁻⁹ C m', 1], ['τ = 0.10 mN m', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(tq.tau * 1e3, q.answer.value) || 'tau');

// ================================================================ t04 continuous distributions
add('sigma-unit-mcq', mcq({
  stem: 'The SI unit of surface charge density is',
  right: 'C m$^{-2}$',
  wrong: ['C m$^{-1}$', 'C m$^{-3}$', 'C m$^{2}$'],
  sol: 'Surface density is charge per unit area — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ring-mcq', mcq({
  stem: 'A thin ring carries charge spread uniformly round it. The electric field at the centre of the ring is',
  right: 'zero, because fields of diametrically opposite elements cancel',
  wrong: ['largest there, because every element is at the same distance', 'along the axis of the ring', 'the same as that of a point charge at the centre'],
  sol: 'Every element $dq$ has an equal element opposite it at the same distance; their fields at the centre are equal and opposite — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('lambda-tf', tf({
  stem: 'A charge of 6.0 μC spread uniformly along a 3.0 m rod gives a linear charge density of 2.0 μC m⁻¹.',
  key: 't',
  sol: 'True: $\\lambda = q/l = 6.0/3.0 = 2.0\\,\\mu\\text{C m}^{-1}$.',
  d: 1, c: 'understanding', t: [4],
}));
add('rho-fill', fill({
  stem: 'Charge per unit volume is called the volume charge density and is written with the Greek letter ___.',
  acc: [['ρ', 'rho']],
  sol: 'It is **ρ** (rho), in C m$^{-3}$; λ is per length and σ per area.',
  d: 1, c: 'recall', t: [4],
}));
add('ring-axis-short', short({
  marks: 2,
  stem: 'A thin ring of radius $R$ carries charge $Q$ spread uniformly. Without integrating, explain why the field at any point on its axis must point along the axis.',
  model: 'Split the ring into pairs of small elements at opposite ends of a diameter. Each pair is at the **same distance** from the axial point, so their fields are equal in size. Their components **perpendicular** to the axis are opposite and **cancel**, while the components **along** the axis add. Summing over all pairs leaves only an axial field.',
  sol: 'Pair diametrically opposite elements and use symmetry.',
  scheme: [['Pairs of opposite elements give equal fields', 1], ['Perpendicular parts cancel, axial parts add', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ================================================================ t05 flux and Gauss's law
const cube = { q: 5.31e-9 };
cube.face = cube.q / EPS0 / 6;
add('cube-num', num({
  stem: 'A point charge of 5.31 nC is at the centre of a cube. Find the electric flux through one face of the cube, in N m² C⁻¹. (ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻².)',
  value: Number(dec(cube.face, 3)), tol: 1, unit: 'N m² C⁻¹',
  sol: r`Total flux $= \dfrac{q}{\varepsilon_0} = \dfrac{5.31 \times 10^{-9}}{8.85 \times 10^{-12}} = ${dec(cube.q / EPS0, 3)}$ N m² C$^{-1}$. By symmetry each of the 6 faces gets the same share: $${dec(cube.q / EPS0, 3)}/6 = ${dec(cube.face, 3)}$ N m² C$^{-1}$.`,
  scheme: [['Total flux q/ε₀ = 600, one sixth through each face = 100', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(cube.face, q.answer.value) || 'face');
add('outside-mcq', mcq({
  stem: 'A closed surface has no charge inside it, but a charge $q$ is placed just outside it. The net flux through the surface is',
  right: 'zero',
  wrong: ['$q/\\varepsilon_0$', '$-q/\\varepsilon_0$', '$q/2\\varepsilon_0$'],
  sol: 'Every field line from the outside charge that enters the surface also leaves it — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
const plate = { E: 500, A: 0.02 };
add('plate-mcq', mcq({
  stem: r`A flat plate of area $0.020$ m² is in a uniform field of 500 N C$^{-1}$. The normal to the plate makes $60^\circ$ with the field. The flux through the plate is`,
  right: '5.0 N m² C$^{-1}$',
  wrong: ['10 N m² C$^{-1}$', '8.7 N m² C$^{-1}$', '0'],
  sol: r`$\phi = EA\cos 60^\circ = 500 \times 0.020 \times 0.5 = 5$ N m² C$^{-1}$ — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}), () => near(plate.E * plate.A * 0.5, 5) || 'flux');
add('moved-mcq', mcq({
  stem: 'A charge is at the centre of a spherical Gaussian surface. The sphere’s radius is doubled and the charge is moved off-centre (still inside). The total flux through the sphere',
  right: 'stays the same',
  wrong: ['becomes four times', 'becomes half', 'changes because the field on the surface is no longer uniform'],
  sol: 'Flux through a closed surface depends only on the enclosed charge: $\\phi = q/\\varepsilon_0$ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
const enc = { q: 3e-6 - 5e-6 };
enc.phi = enc.q / EPS0;
add('enclosed-mcq', mcq({
  stem: r`A closed surface encloses charges $+3.0\,\mu\text{C}$ and $-5.0\,\mu\text{C}$; a charge of $+7.0\,\mu\text{C}$ lies outside it. The net flux through the surface is about`,
  right: r`$${sci(enc.phi, 2)}$ N m² C$^{-1}$`,
  wrong: [r`$${sci(-enc.phi, 2)}$ N m² C$^{-1}$`, r`$${sci((5e-6) / EPS0, 2)}$ N m² C$^{-1}$`, r`$${sci(-0.5 * enc.phi, 2)}$ N m² C$^{-1}$`],
  sol: r`Only enclosed charge counts: $q = -2.0\,\mu\text{C}$, so $\phi = \dfrac{-2.0 \times 10^{-6}}{8.85 \times 10^{-12}} \approx ${sci(enc.phi, 2)}$ N m² C$^{-1}$ (net inward) — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => near(enc.phi, -2.26e5, 0.01) || `phi ${enc.phi}`);
const sq = { E: 2000, A: 0.01 };
add('flux-num', num({
  stem: 'A square of side 10 cm is in a uniform field of 2.0 × 10³ N C⁻¹. The normal to the square makes 60° with the field. Find the flux through the square, in N m² C⁻¹.',
  value: sq.E * sq.A * 0.5, tol: 0.2, unit: 'N m² C⁻¹',
  sol: r`$A = 0.10^2 = 0.010$ m². $\phi = EA\cos 60^\circ = 2000 \times 0.010 \times 0.5 = ${sq.E * sq.A * 0.5}$ N m² C$^{-1}$.`,
  scheme: [['Area in m² and φ = EA cos θ = 10', 1]],
  d: 2, c: 'understanding', t: [5],
}), (q) => near(sq.E * sq.A * 0.5, q.answer.value) || 'flux');
add('outside-ar', ar({
  a: 'The net flux through a closed surface does not depend on charges lying outside it.',
  r: 'Charges outside a closed surface produce no electric field on that surface.',
  key: 'c',
  sol: 'A is true. R is false: outside charges do change the field on the surface, but their lines enter and leave, so their net flux is zero — option (c).',
  d: 3, c: 'understanding', t: [5],
}));
add('symmetric-tf', tf({
  stem: 'Gauss’s law is true only for closed surfaces that are spheres or cylinders.',
  key: 'f',
  sol: 'False. Gauss’s law holds for every closed surface; symmetric surfaces are chosen only because they make the field easy to find.',
  d: 1, c: 'understanding', t: [5],
}));
add('corner-short', short({
  marks: 2,
  stem: 'A point charge $q$ sits exactly at one corner of a cube. Find the flux through the whole cube. Explain your reasoning.',
  model: r`Imagine **eight** identical cubes meeting at that corner; together they form one large cube with $q$ at its **centre**. The large cube has total flux $q/\varepsilon_0$, shared equally by the eight small cubes by symmetry. So the flux through the given cube is $\dfrac{q}{8\varepsilon_0}$.`,
  sol: 'Build a larger cube around the charge and use symmetry.',
  scheme: [['Eight cubes around the corner, charge at the centre of the big cube', 1], ['Flux q/8ε₀', 1]],
  d: 4, c: 'analysis', t: [5], wl: null,
}));

// ================================================================ t06 applications of Gauss's law
add('sheet-dist-mcq', mcq({
  stem: 'A large charged plane sheet produces a field of 600 N C$^{-1}$ at a point 5 cm from it. At a point 10 cm from the sheet (still near its middle), the field is',
  right: '600 N C$^{-1}$',
  wrong: ['300 N C$^{-1}$', '150 N C$^{-1}$', '1200 N C$^{-1}$'],
  sol: 'For an infinite sheet $E = \\sigma/2\\varepsilon_0$, independent of distance — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('two-sheets-mcq', mcq({
  stem: 'Two large parallel sheets carry uniform charge densities $+\\sigma$ and $-\\sigma$. The field between them and outside them is',
  right: '$\\sigma/\\varepsilon_0$ between, zero outside',
  wrong: ['zero between, $\\sigma/\\varepsilon_0$ outside', '$\\sigma/2\\varepsilon_0$ everywhere', '$\\sigma/2\\varepsilon_0$ between, zero outside'],
  sol: 'Each sheet gives $\\sigma/2\\varepsilon_0$. Between the sheets both fields point from $+$ to $-$ and add; outside they are opposite and cancel — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('wire-mcq', mcq({
  stem: 'The field 2 cm from a long straight charged wire is 300 N C$^{-1}$. The field 6 cm from the wire is',
  right: '100 N C$^{-1}$',
  wrong: ['33 N C$^{-1}$', '900 N C$^{-1}$', '300 N C$^{-1}$'],
  sol: r`$E \propto 1/r$ for a long wire: $300 \times \dfrac{2}{6} = 100$ N C$^{-1}$ — option (@K).`,
  d: 2, c: 'application', t: [6],
}), () => near(300 * (2 / 6), 100) || 'wire');
add('dome-mcq', mcq({
  stem: 'A thin hollow metal sphere of radius 15 cm is given a large positive charge. A tiny charged dust particle is inside the sphere, 5 cm from its centre. The electric force on the particle due to the sphere’s charge is',
  right: 'zero',
  wrong: ['largest, because it is close to the charged surface', 'directed towards the centre', 'directed outwards'],
  sol: 'The charge sits on the thin shell; inside a uniformly charged shell $E = 0$, so the force is zero — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('shell-ar', ar({
  a: 'The electric field everywhere inside a uniformly charged thin spherical shell is zero.',
  r: 'A concentric Gaussian sphere inside the shell encloses no charge, and by symmetry the field would have the same size at every point of it.',
  key: 'a',
  sol: 'Both true. Zero enclosed charge gives zero flux; with a symmetric (radial, equal) field this forces $E = 0$. R explains A — option (a).',
  d: 3, c: 'understanding', t: [6],
}));
add('sheet-ar', ar({
  a: 'The field of an infinite plane sheet of charge does not depend on the distance from the sheet.',
  r: 'The flux through a closed surface does not depend on the shape of the surface.',
  key: 'b',
  sol: 'Both are true, but R is not the reason for A. A follows from the pillbox calculation: the flux through the ends, $2EA$, equals $\\sigma A/\\varepsilon_0$, with no distance appearing — option (b).',
  d: 3, c: 'analysis', t: [6],
}));
const sh = { s: 17.7e-9 };
sh.E = sh.s / (2 * EPS0);
add('sheet-num', num({
  stem: 'A large plane sheet carries a uniform surface charge density of 17.7 nC m⁻². Find the field near it, in N C⁻¹.',
  value: Number(dec(sh.E, 3)), tol: 5, unit: 'N C⁻¹',
  sol: r`$E = \dfrac{\sigma}{2\varepsilon_0} = \dfrac{17.7 \times 10^{-9}}{2 \times 8.85 \times 10^{-12}} = ${dec(sh.E, 3)}$ N C$^{-1}$, normal to the sheet.`,
  scheme: [['E = σ/2ε₀ = 1000 N C⁻¹', 1]],
  d: 2, c: 'understanding', t: [6],
}), (q) => near(sh.E, q.answer.value) || 'sheet');
const shl = { q: 2e-9, R: 0.1 };
shl.E20 = fpt(shl.q, 0.2);
add('shell-num', num({
  stem: 'A thin spherical shell of radius 10 cm carries 2.0 nC spread uniformly. Find the field (a) 5 cm from the centre and (b) 20 cm from the centre. Enter the answer to (b), in N C⁻¹.',
  value: Number(dec(shl.E20, 2)), tol: 5, unit: 'N C⁻¹',
  sol: r`(a) Inside the shell, $E = 0$. (b) Outside, treat the charge as at the centre: $E = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-9}}{0.20^2} = ${dec(shl.E20, 2)}$ N C$^{-1}$, radially outward.`,
  scheme: [['(a) E = 0 inside', 1], ['(b) 450 N C⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(shl.E20, q.answer.value) || 'shell');
add('falloff-match', match({
  stem: 'Match each charge distribution in Column A with how its field depends on distance $r$ (far from a dipole; near a sheet) in Column B.',
  pairs: [['Point charge', '$E \\propto 1/r^2$'], ['Short electric dipole', '$E \\propto 1/r^3$'], ['Infinitely long straight wire', '$E \\propto 1/r$'], ['Infinite plane sheet', '$E$ independent of $r$']],
  order: [1, 3, 0, 2],
  sol: 'Point charge → $1/r^2$ (1 → q); dipole → $1/r^3$ (2 → s); wire → $1/r$ (3 → p); sheet → independent of $r$ (4 → r).',
  d: 2, c: 'understanding', t: [2, 3, 6],
}));

// ================================================================ short answers (2 and 3 marks)
add('vector-short', short({
  marks: 2,
  stem: 'Write Coulomb’s law in vector form for the force on $q_2$ due to $q_1$, and use it to show that the two charges exert equal and opposite forces on each other.',
  model: r`$\vec F_{21} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}\hat r_{12}$, with $\hat r_{12}$ from $q_1$ to $q_2$. Swapping the labels gives $\vec F_{12} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}\hat r_{21}$, and $\hat r_{21} = -\hat r_{12}$. So $\vec F_{12} = -\vec F_{21}$: **equal in size, opposite in direction**.`,
  sol: 'Interchange the labels and use the reversed unit vector.',
  scheme: [['Correct vector form with unit vector defined', 1], ['Shows F₁₂ = −F₂₁', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
const s2b = { old: 8 * 2, nw: 3 * 3 };
add('spheres-short', short({
  marks: 2,
  stem: 'Two identical conducting spheres with charges $+8\\,\\mu$C and $-2\\,\\mu$C, a distance $r$ apart, attract with force $F$. They are touched together and put back at the same distance. Find the new force in terms of $F$ and say whether it is attractive or repulsive.',
  model: r`Total charge $= +6\,\mu\text{C}$, so each sphere gets $+3\,\mu\text{C}$. Old: $F \propto 8 \times 2 = 16$. New: $F' \propto 3 \times 3 = 9$. So $F' = \dfrac{9}{16}F$, and it is now **repulsive** (both positive).`,
  sol: 'Conserve charge, share equally, then compare products of charges.',
  scheme: [['Each sphere +3 μC (conservation)', 1], ['F′ = 9F/16, repulsive', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(s2b.nw / s2b.old, 9 / 16) || 'ratio');
add('lines-short', short({
  marks: 2,
  stem: 'Draw (describe) the field-line patterns for (a) two equal and opposite charges and (b) two equal positive charges, a small distance apart. State one difference between them.',
  model: '(a) Lines leave $+q$, curve round and **end on $-q$**; many lines run directly between them. (b) Lines leave both charges and **bend away** from each other; none join the charges, and there is a **neutral point** midway. Difference: in (a) the lines link the two charges; in (b) they never do.',
  sol: 'Use the start-on-plus, end-on-minus rule and the neutral point between like charges.',
  scheme: [['Correct pattern for (a) with arrows from + to −', 1], ['Correct pattern for (b) with neutral point, and a difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stable-short', short({
  marks: 2,
  stem: 'A dipole is in a uniform electric field. Explain why it feels no net force, and state the orientation in which it is in stable equilibrium.',
  model: 'The forces on the charges are $+q\\vec E$ and $-q\\vec E$: equal and opposite, so the **net force is zero**. They form a couple, $\\tau = pE\\sin\\theta$. The dipole is in **stable equilibrium** when $\\vec p$ is **along** $\\vec E$ ($\\theta = 0$); a small twist produces a torque that turns it back.',
  sol: 'Add the two forces; then look at the torque for small turns from θ = 0.',
  scheme: [['Net force zero (equal and opposite forces)', 1], ['Stable when p is along E, with reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sheets-short', short({
  marks: 2,
  stem: 'Two large parallel plane sheets carry charge densities $+\\sigma$ and $-\\sigma$. Using the field of a single sheet, find the field (a) between the sheets and (b) outside them.',
  model: r`Each sheet gives $\dfrac{\sigma}{2\varepsilon_0}$, away from $+\sigma$ and towards $-\sigma$. (a) **Between**, both point from the positive to the negative sheet: $E = \dfrac{\sigma}{2\varepsilon_0} + \dfrac{\sigma}{2\varepsilon_0} = \dfrac{\sigma}{\varepsilon_0}$. (b) **Outside**, they point in opposite directions and cancel: $E = 0$.`,
  sol: 'Superpose the two sheet fields with directions.',
  scheme: [['Between: σ/ε₀ from + to −', 1], ['Outside: zero', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}));
add('test-short', short({
  marks: 2,
  stem: 'A student says, “The electric field at a point depends on the test charge placed there, because $E = F/q_0$.” Is the student right? Explain.',
  model: 'No. If $q_0$ is doubled, the force $F$ on it also doubles (Coulomb’s law), so $F/q_0$ is **unchanged**. The field depends only on the **source charges** and the position. The test charge is kept small only so that it does not disturb those source charges.',
  sol: 'F is proportional to q₀, so the ratio does not depend on q₀.',
  scheme: [['F ∝ q₀, so E is independent of q₀', 1], ['E depends on source charges and position', 1]],
  d: 3, c: 'evaluation', t: [2],
}));

const tri = { F: coul(1e-6, 1e-6, 0.1) };
tri.net = Math.sqrt(3) * tri.F;
add('triangle-short', short({
  marks: 3,
  stem: 'Three equal charges of $+1.0\\,\\mu$C are at the corners of an equilateral triangle of side 10 cm. Find the magnitude and direction of the net force on one of them.',
  model: r`Each pair: $F = \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{0.10^2} = ${dec(tri.F, 2)}$ N, repulsive. The two forces on one charge make $60^\circ$ with each other. Resultant $= 2F\cos 30^\circ = \sqrt{3}F \approx ${dec(tri.net, 3)}$ N, along the bisector of the angle at that corner, **pointing away** from the triangle (away from the opposite side’s midpoint).`,
  sol: 'Find one pair force, then add two equal forces at 60° to each other.',
  scheme: [['One pair force 0.90 N', 1], ['Resultant √3 F ≈ 1.56 N', 1], ['Direction: along the bisector, away from the triangle', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(tri.net, 1.5588, 0.001) || `net ${tri.net}`);
const np = { d: 0.4 };
np.x = (3 / 4) * np.d;
add('neutral-short', short({
  marks: 3,
  stem: 'Charges of $+9\\,\\mu$C and $+1\\,\\mu$C are fixed 40 cm apart. Find the point on the line joining them where the electric field is zero. Explain why it must lie between them.',
  model: r`Between **like** charges the two fields point in opposite directions, so they can cancel there; outside they point the same way. At distance $x$ from the $9\,\mu\text{C}$ charge: $\dfrac{9}{x^2} = \dfrac{1}{(0.40 - x)^2}$, so $3(0.40 - x) = x$ and $x = ${dec(np.x, 2)}$ m. The neutral point is **30 cm from the 9 μC charge** (10 cm from the 1 μC charge).`,
  sol: 'Equate the two field magnitudes and take square roots.',
  scheme: [['Reason it lies between the like charges', 1], ['Equation 9/x² = 1/(0.40 − x)²', 1], ['x = 0.30 m from the 9 μC charge', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(9 / np.x ** 2, 1 / (np.d - np.x) ** 2) || 'neutral');
add('equatorial-short', short({
  marks: 3,
  stem: 'Derive an expression for the electric field at a point on the equatorial line of an electric dipole, a distance $r$ from its centre. Write its form when $r \\gg a$.',
  model: r`Each charge is at distance $\sqrt{r^2 + a^2}$, so $|\vec E_{+}| = |\vec E_{-}| = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2 + a^2}$. Their components **along the equatorial line cancel**; the components **parallel to the axis** add, each being $E_{+}\cos\theta$ with $\cos\theta = \dfrac{a}{\sqrt{r^2 + a^2}}$:
$$E = 2 \cdot \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2+a^2}\cdot\dfrac{a}{\sqrt{r^2+a^2}} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{(r^2+a^2)^{3/2}}$$
directed **opposite to $\vec p$**. For $r \gg a$: $E \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^3}$.`,
  sol: 'Resolve both fields; perpendicular parts cancel, axial parts add.',
  scheme: [['Equal magnitudes and resolution with cos θ = a/√(r² + a²)', 1], ['E = p/[4πε₀(r² + a²)^{3/2}], opposite to p', 1], ['Short-dipole form kp/r³', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('wire-short', short({
  marks: 3,
  stem: 'Use Gauss’s law to derive the electric field at a distance $r$ from an infinitely long straight wire with uniform linear charge density $\\lambda$.',
  model: r`By symmetry the field is **radial** and has the same size at all points a distance $r$ from the wire. Take a **coaxial cylinder** of radius $r$ and length $l$. On the flat ends $\vec E$ is parallel to the surface, so their flux is **zero**. On the curved surface $\vec E$ is along $d\vec S$ and constant: flux $= E \cdot 2\pi r l$. Charge enclosed $= \lambda l$. Gauss’s law: $E \cdot 2\pi r l = \dfrac{\lambda l}{\varepsilon_0}$, so $E = \dfrac{\lambda}{2\pi\varepsilon_0 r}$, radially outward for $\lambda > 0$.`,
  sol: 'Coaxial cylinder; only the curved surface carries flux.',
  scheme: [['Gaussian cylinder and zero flux through the ends', 1], ['Flux E·2πrl = λl/ε₀', 1], ['E = λ/(2πε₀ r), direction', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
const el = { E: 5e4 };
el.F = QE * el.E;
el.a = el.F / ME;
add('electron-short', short({
  marks: 3,
  stem: 'An electron is in a uniform field of $5.0 \\times 10^{4}$ N C$^{-1}$. Find (a) the force on it and (b) its acceleration. (c) Explain why its weight can be ignored. ($m_e = 9.1 \\times 10^{-31}$ kg, $g = 9.8$ m s$^{-2}$.)',
  model: r`(a) $F = eE = 1.6 \times 10^{-19} \times 5.0 \times 10^{4} = ${sci(el.F, 2)}$ N, opposite to $\vec E$.
(b) $a = \dfrac{F}{m_e} = \dfrac{8.0 \times 10^{-15}}{9.1 \times 10^{-31}} \approx ${sci(el.a, 2)}$ m s$^{-2}$.
(c) Its weight is $m_e g \approx ${sci(ME * 9.8, 2)}$ N, about $10^{15}$ times smaller than the electric force, so it has no noticeable effect.`,
  sol: 'F = eE, a = F/m; compare with mg.',
  scheme: [['F = 8.0 × 10⁻¹⁵ N, opposite to E', 1], ['a ≈ 8.8 × 10¹⁵ m s⁻²', 1], ['Weight about 10¹⁵ times smaller than F, negligible', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(el.a, 8.79e15, 0.01) && Math.round(Math.log10(el.F / (ME * 9.8))) === 15 || `e ${el.a} ${el.F / (ME * 9.8)}`);

// ================================================================ long answers (5 marks)
add('axial-long', long({
  stem: 'Derive an expression for the electric field at a point on the axis of an electric dipole at a distance $r$ from its centre. Show that for $r \\gg a$ it varies as $1/r^3$, and compare it with the field at the same distance on the equatorial line.',
  model: r`Let $-q$ be at A and $+q$ at B, with $AB = 2a$ and P on the axis beyond B at distance $r$ from the centre O.

Field due to $+q$ (distance $r - a$): $E_{+} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{(r-a)^2}$, along $\vec p$.
Field due to $-q$ (distance $r + a$): $E_{-} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{(r+a)^2}$, opposite to $\vec p$.

Since $E_{+} > E_{-}$, the net field is along $\vec p$:
$$E = \dfrac{q}{4\pi\varepsilon_0}\left[\dfrac{1}{(r-a)^2} - \dfrac{1}{(r+a)^2}\right] = \dfrac{q}{4\pi\varepsilon_0}\dfrac{4ar}{(r^2-a^2)^2} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2pr}{(r^2-a^2)^2}$$
using $p = 2qa$. For $r \gg a$, $r^2 - a^2 \approx r^2$, so $E \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{r^3}$: it varies as $1/r^3$.

On the equatorial line at the same distance, $E_\text{eq} \approx \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^3}$, opposite to $\vec p$. So $E_\text{axis} = 2E_\text{eq}$, and the two fields are in opposite directions.`,
  sol: 'Subtract the fields of the two charges at P, simplify, then approximate for a far point.',
  scheme: [['Labelled figure and the two fields with directions', 1], ['Net field as a difference', 1], ['Simplified to 2pr/[4πε₀(r² − a²)²]', 1], ['Short-dipole form 2p/(4πε₀r³), 1/r³', 1], ['Comparison: axial = 2 × equatorial, opposite directions', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('sheet-long', long({
  stem: '(a) State Gauss’s law in electrostatics. (b) Use it to derive the electric field due to an infinite plane sheet with uniform surface charge density $\\sigma$. (c) A large sheet produces a field of $3.0 \\times 10^{3}$ N C$^{-1}$. Find $\\sigma$.',
  model: r`(a) The total electric flux through any closed surface equals $\dfrac{1}{\varepsilon_0}$ times the net charge enclosed: $\oint \vec E\cdot d\vec S = \dfrac{q_\text{enc}}{\varepsilon_0}$.

(b) By symmetry, $\vec E$ is **perpendicular** to the sheet, pointing away on both sides (for $\sigma > 0$), with the same size at equal distances. Take a **cylindrical pillbox** crossing the sheet, end faces of area $A$ parallel to it. On the curved side $\vec E$ is parallel to the surface: **no flux**. Through each end, flux $= EA$. Total flux $= 2EA$; charge enclosed $= \sigma A$. So $2EA = \dfrac{\sigma A}{\varepsilon_0}$ and $E = \dfrac{\sigma}{2\varepsilon_0}$, independent of distance.

(c) $\sigma = 2\varepsilon_0 E = 2 \times 8.85 \times 10^{-12} \times 3.0 \times 10^{3} = ${sci(2 * EPS0 * 3e3, 3)}$ C m$^{-2}$.`,
  sol: 'Pillbox Gaussian surface; flux only through the two ends; then rearrange for σ.',
  scheme: [['Statement of Gauss’s law', 1], ['Pillbox and zero flux through the curved side', 1], ['2EA = σA/ε₀', 1], ['E = σ/2ε₀, independent of distance', 1], ['σ = 5.31 × 10⁻⁸ C m⁻²', 1]],
  d: 3, c: 'application', t: [5, 6], wl: null,
}), () => near(2 * EPS0 * 3e3, 5.31e-8) || 'sigma');
const sl3 = { q: 4e-9, R: 0.2 };
sl3.Es = fpt(sl3.q, sl3.R);
sl3.E40 = fpt(sl3.q, 0.4);
add('shell-long', long({
  stem: 'A thin spherical shell of radius $R$ carries charge $q$ spread uniformly. (a) Use Gauss’s law to find the field at a distance $r$ from the centre for $r > R$ and for $r < R$. (b) Sketch a graph of $E$ against $r$. (c) For $q = 4.0$ nC and $R = 20$ cm, find the field at the surface and at 40 cm from the centre.',
  model: r`(a) By symmetry $\vec E$ is radial and has the same size everywhere on a concentric sphere of radius $r$.
**Outside** ($r > R$): the Gaussian sphere encloses $q$, so $E \cdot 4\pi r^2 = \dfrac{q}{\varepsilon_0}$, giving $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$ — as if all the charge were at the centre.
**Inside** ($r < R$): the sphere encloses no charge, so $E \cdot 4\pi r^2 = 0$ and $E = 0$.

(b) $E$ is zero from $r = 0$ to $r = R$, jumps to its largest value $\dfrac{q}{4\pi\varepsilon_0 R^2}$ at $r = R$, and then falls as $1/r^2$.

(c) At the surface: $E = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{0.20^2} = ${dec(sl3.Es, 2)}$ N C$^{-1}$. At 40 cm: $E = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{0.40^2} = ${dec(sl3.E40, 3)}$ N C$^{-1}$ (one quarter, since the distance is doubled).`,
  sol: 'Concentric Gaussian spheres outside and inside; then substitute.',
  scheme: [['Gaussian sphere and symmetry argument', 1], ['E = q/(4πε₀r²) outside', 1], ['E = 0 inside', 1], ['Correct E–r graph', 1], ['900 N C⁻¹ and 225 N C⁻¹', 1]],
  d: 4, c: 'application', t: [6], wl: null,
}), () => near(sl3.Es, 900) && near(sl3.E40, 225) || 'shell');
const sqr = { q: 1e-6, a: 0.1 };
sqr.Fadj = coul(sqr.q, sqr.q, sqr.a);
sqr.Fdiag = coul(sqr.q, sqr.q, sqr.a * Math.SQRT2);
sqr.net = Math.SQRT2 * sqr.Fadj + sqr.Fdiag;
add('square-long', long({
  stem: '(a) State the principle of superposition for electrostatic forces. (b) Equal charges of $+1.0\\,\\mu$C are placed at the four corners A, B, C and D of a square of side 10 cm. Find the magnitude and direction of the net force on the charge at D.',
  model: r`(a) The force on a charge due to a group of charges is the **vector sum** of the forces each charge would exert on it alone; each pair force is unaffected by the others.

(b) Charges at A and C are adjacent to D ($r = 0.10$ m): each force $= \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{0.10^2} = ${dec(sqr.Fadj, 2)}$ N, repulsive, along AD and CD extended, at $90^\circ$ to each other. Their resultant $= \sqrt{2} \times 0.90 \approx ${dec(Math.SQRT2 * sqr.Fadj, 3)}$ N, along the diagonal BD, away from B.
The charge at B is $0.10\sqrt{2}$ m away: force $= \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{0.020} = ${dec(sqr.Fdiag, 2)}$ N, also along BD, away from B.
Net force $= 1.27 + 0.45 \approx ${dec(sqr.net, 3)}$ N, along the diagonal from B through D, pointing **away from the centre** of the square.`,
  sol: 'Add the two perpendicular adjacent forces, then add the diagonal force along the same line.',
  scheme: [['Statement of superposition', 1], ['Adjacent forces 0.90 N each', 1], ['Their resultant 1.27 N along BD', 1], ['Diagonal force 0.45 N along BD', 1], ['Net ≈ 1.72 N away from the centre', 1]],
  d: 4, c: 'application', t: [1], wl: null,
}), () => near(sqr.net, 1.723, 0.002) || `net ${sqr.net}`);
const tl = { p: 3e-9, E: 2e4 };
add('torque-long', long({
  stem: '(a) Show that a dipole of moment $\\vec p$ in a uniform field $\\vec E$ experiences a torque $\\vec\\tau = \\vec p \\times \\vec E$ and no net force. (b) A dipole of moment $3.0 \\times 10^{-9}$ C m is placed in a field of $2.0 \\times 10^{4}$ N C$^{-1}$. Find the torque when $\\vec p$ is at $30^\\circ$ and at $90^\\circ$ to $\\vec E$. (c) In which orientation is the dipole in unstable equilibrium?',
  model: r`(a) The forces on $+q$ and $-q$ are $+q\vec E$ and $-q\vec E$. Their sum is zero, so **no net force**. They act along parallel lines separated by $2a\sin\theta$, forming a couple: $\tau = qE \times 2a\sin\theta = pE\sin\theta$. The torque tends to turn $\vec p$ towards $\vec E$; in vector form $\vec\tau = \vec p \times \vec E$.

(b) At $30^\circ$: $\tau = 3.0 \times 10^{-9} \times 2.0 \times 10^{4} \times 0.5 = ${sci(tl.p * tl.E * 0.5, 2)}$ N m. At $90^\circ$: $\tau = pE = ${sci(tl.p * tl.E, 2)}$ N m (the maximum).

(c) **Unstable** when $\vec p$ is **antiparallel** to $\vec E$ ($\theta = 180^\circ$): the torque is zero, but any small turn produces a torque that turns it further away.`,
  sol: 'Couple of forces ±qE with arm 2a sin θ; then substitute.',
  scheme: [['Net force zero', 1], ['Couple arm 2a sin θ, τ = pE sin θ, vector form', 1], ['τ at 30° = 3.0 × 10⁻⁵ N m', 1], ['τ at 90° = 6.0 × 10⁻⁵ N m', 1], ['Unstable at 180° with reason', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}), () => near(tl.p * tl.E * 0.5, 3e-5) || 'tau');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const lab = [0.05, 0.1, 0.2].map((d) => ({ d, F: 3.6e-3 / d ** 2 }));
add('lab-case', mk.case({
  passage: `In a physics laboratory in Bhopal, students used a sensitive electronic balance to measure the force between two small charged spheres. The charges were kept the same while the distance between the centres was changed.

| Distance (cm) | Force (N) |
|---|---|
| 5 | ${dec(lab[0].F, 3)} |
| 10 | ${dec(lab[1].F, 2)} |
| 20 | ${dec(lab[2].F, 2)} |

The spheres were small compared with their separation, so they could be treated as point charges.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What does the data show about the force when the distance is doubled?',
      right: 'It becomes one quarter',
      wrong: ['It becomes one half', 'It doubles', 'It stays the same'],
      sol: '1.44 N → 0.36 N → 0.090 N: each doubling of distance divides the force by 4, the inverse-square law — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'Predict the force when the distance is 15 cm, in newtons.',
      value: Number(dec(3.6e-3 / 0.15 ** 2, 2)), tol: 0.005, unit: 'N',
      sol: r`$F r^2$ is constant: $1.44 \times 0.05^2 = 0.0036$. At 15 cm: $F = 0.0036/0.15^2 = ${dec(3.6e-3 / 0.15 ** 2, 2)}$ N.`,
      scheme: [['F = 0.16 N', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'If both spheres carry the same charge, find that charge.',
      model: r`$Fr^2 = kq^2$, so $q^2 = \dfrac{0.0036}{9 \times 10^{9}} = 4.0 \times 10^{-13}$ C², giving $q \approx ${sci(Math.sqrt(4e-13), 2)}$ C (about $0.63\,\mu\text{C}$).`,
      sol: 'Use the constant Fr² = kq².',
      scheme: [['Fr² = kq² with 0.0036 N m²', 1], ['q ≈ 6.3 × 10⁻⁷ C', 1]],
      d: 3, c: 'application', t: [1], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'The experiment is repeated with the spheres 10 cm apart in an oil of dielectric constant 2.4. Predict the force and explain.',
        model: r`In a medium the force is divided by the dielectric constant: $F = 0.36/2.4 = ${dec(0.36 / 2.4, 2)}$ N. The oil’s molecules are polarised and partly screen the charges from each other, weakening the force.`,
        sol: 'Divide the air value at 10 cm by the dielectric constant.',
        scheme: [['F = 0.36/2.4 = 0.15 N', 1], ['Reason: medium reduces force by εr (polarisation)', 1]],
        d: 3, c: 'application', t: [1], wl: null,
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 0.16) && near(lab[0].F, 1.44) && near(lab[1].F, 0.36) && near(lab[2].F, 0.09) || 'lab');

add('microwave-case', mk.case({
  passage: `Food warms in a microwave oven because water molecules are tiny electric dipoles. Each water molecule has a dipole moment of about $6.2 \\times 10^{-30}$ C m. Inside the oven the electric field reverses direction billions of times every second. Each time it reverses, the field exerts a torque that tries to turn the molecules round to line up with it. The molecules jostle their neighbours as they turn, and this random motion appears as heat.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In which direction does the dipole moment of a water molecule point?',
      right: 'From the negative charge centre to the positive charge centre',
      wrong: ['From the positive charge centre to the negative charge centre', 'Along the field, always', 'Perpendicular to the line joining the charge centres'],
      sol: 'By definition $\\vec p$ points from $-q$ to $+q$ — option (@K).',
      d: 1, c: 'recall', t: [3],
    })),
    part('b', mcq({
      stem: 'If the field in the oven at some instant is $2.0 \\times 10^{3}$ N C$^{-1}$, the largest torque on one molecule is about',
      right: '$1.2 \\times 10^{-26}$ N m',
      wrong: ['$3.1 \\times 10^{-33}$ N m', '$6.2 \\times 10^{-30}$ N m', '$1.2 \\times 10^{-23}$ N m'],
      sol: r`$\tau_\text{max} = pE = 6.2 \times 10^{-30} \times 2.0 \times 10^{3} = 1.24 \times 10^{-26}$ N m — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why a field that keeps reversing makes the molecules rotate back and forth, whereas a steady field would not keep heating the food.',
      model: 'A steady field turns each dipole until $\\vec p$ is **along $\\vec E$** (stable equilibrium, zero torque); after that nothing more happens, so no further energy is fed in. When the field **reverses**, the dipoles are suddenly antiparallel and feel a torque again, so they keep **rotating back and forth**, transferring energy to their neighbours as heat.',
      sol: 'Use stable equilibrium at θ = 0 and the torque after each reversal.',
      scheme: [['Steady field: dipoles align and stop (zero torque)', 1], ['Reversing field: repeated torque keeps them rotating, energy to heat', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Oil molecules are almost non-polar. Predict whether pure oil warms as quickly as water in the oven, and justify.',
        model: 'No, it warms much **more slowly**. Non-polar molecules have **no permanent dipole moment**, so the alternating field exerts almost **no torque** on them, and little energy is transferred. (A small induced dipole gives only weak heating.)',
        sol: 'Relate heating to the torque on permanent dipoles.',
        scheme: [['Prediction: slower heating', 1], ['Reason: no permanent dipole, little torque', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(6.2e-30 * 2e3, 1.24e-26) || 'tau');

const dome = { q: 1e-6, R: 0.5 };
dome.E = fpt(dome.q, dome.R) / 1000;
add('shield-case', mk.case({
  passage: 'During a thunderstorm near Shillong, a bus was struck by lightning. The passengers inside were unharmed. Engineers explained that the charge spread over the outer metal body of the bus. A science teacher modelled the bus as a closed metal shell and used Gauss’s law to show why sensitive equipment is often kept inside metal boxes.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Treating the bus body as a closed charged shell, the electric field inside it due to the charge on the body is',
      right: 'zero',
      wrong: ['largest near the windows', 'the same as just outside the body', 'directed towards the floor'],
      sol: 'A Gaussian surface inside the shell encloses no charge, so the field inside is zero — option (@K).',
      d: 2, c: 'understanding', t: [6],
    })),
    part('b', num({
      stem: 'A metal sphere of radius 0.50 m (a model of the shell) carries 1.0 μC. Find the field just outside its surface, in kN C⁻¹.',
      value: Number(dec(dome.E, 2)), tol: 0.5, unit: 'kN C⁻¹',
      sol: r`$E = \dfrac{9 \times 10^{9} \times 1.0 \times 10^{-6}}{0.50^2} = ${dec(dome.E * 1000, 2)}$ N C$^{-1}$; in kN C$^{-1}$: $${dec(dome.E * 1000, 2)}/1000 = ${dec(dome.E, 2)}$.`,
      scheme: [['E = 36 kN C⁻¹', 1]],
      d: 2, c: 'understanding', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use Gauss’s law to explain why the field inside the closed shell is zero.',
      model: 'Draw a closed Gaussian surface **inside** the shell. It encloses **no charge**, so the total flux through it is **zero**. For a uniformly charged spherical shell the field would be radial and the same everywhere on a concentric sphere, so zero flux means $E = 0$ at every point inside.',
      sol: 'Zero enclosed charge plus symmetry.',
      scheme: [['Gaussian surface inside encloses no charge, so zero flux', 1], ['Symmetry ⇒ E = 0 everywhere inside', 1]],
      d: 3, c: 'understanding', t: [5, 6],
    }), [
      short({
        marks: 2,
        stem: 'A passenger claims, “We were safe because rubber tyres insulated the bus from the ground.” Evaluate this claim.',
        model: 'The claim is **weak**. A lightning stroke has already crossed kilometres of air, so a few centimetres of rubber cannot stop it. The passengers were safe because the charge stayed on the **outer metal body** and the field **inside** a closed conducting shell is zero, so no current passed through them.',
        sol: 'Compare the insulation of tyres with the shielding by the metal shell.',
        scheme: [['Tyres cannot stop lightning (claim weak)', 1], ['Safety due to zero field inside the metal shell', 1]],
        d: 4, c: 'evaluation', t: [6],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 36) || 'dome');

const ink = { q: 2e-13, E: 1.0e6 };
ink.F = ink.q * ink.E;
add('inkjet-case', mk.case({
  passage: 'In some industrial inkjet printers that print dates on food packets, tiny ink drops are given a small negative charge and then pass between two parallel plates. The upper plate is positive and the lower plate negative, so there is a nearly uniform field between them. By changing the charge on each drop, the printer steers it to the right spot on the packet.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which way is a negatively charged drop deflected between the plates?',
      right: 'Upwards, towards the positive plate',
      wrong: ['Downwards, towards the negative plate', 'Not at all, because the field is uniform', 'Along the direction of the field'],
      sol: 'The field points from the positive (upper) plate to the negative (lower) plate, i.e. downwards; a negative charge is pushed opposite to the field — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'A drop carries a charge of magnitude 2.0 × 10⁻¹³ C and the field is 1.0 × 10⁶ N C⁻¹. Find the force on it, in micronewtons (μN).',
      value: Number(dec(ink.F * 1e6, 2)), tol: 0.01, unit: 'μN',
      sol: r`$F = qE = 2.0 \times 10^{-13} \times 1.0 \times 10^{6} = ${sci(ink.F, 2)}$ N. In μN: $${sci(ink.F, 2)} \times 10^{6} = ${dec(ink.F * 1e6, 2)}$.`,
      scheme: [['F = 0.20 μN', 1]],
      d: 2, c: 'understanding', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Two drops of the same mass pass through the plates at the same speed, but one has twice the charge of the other. Compare their deflections and explain.',
      model: 'The force is $qE$, so the drop with **twice the charge** feels twice the force and twice the **acceleration** ($a = qE/m$). It spends the same time between the plates, so its sideways deflection ($\\tfrac{1}{2}at^2$) is **twice as large**.',
      sol: 'Same time between plates; deflection proportional to acceleration, which is proportional to charge.',
      scheme: [['Double charge gives double force and acceleration', 1], ['Same time, so double deflection', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the field between the plates, away from their edges, can be treated as uniform, using the result for a charged plane sheet.',
        model: r`Each large plate acts like a plane sheet whose field $\sigma/2\varepsilon_0$ does **not depend on distance**. Between the plates the two fields point the same way and add to $\sigma/\varepsilon_0$, the **same at every point**. Only near the edges, where the plates stop looking infinite, does the field bend.`,
        sol: 'Use the distance-independence of a sheet’s field.',
        scheme: [['Each plate’s field independent of distance', 1], ['Sum σ/ε₀ is the same everywhere between them', 1]],
        d: 3, c: 'application', t: [2, 6],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 0.2) || 'ink');
