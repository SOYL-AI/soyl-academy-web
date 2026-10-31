// ISC 12 Physics ch07 Moving Charges and Magnetic Field — question bank (ISC style). Numbers computed and re-checked.
import { mk, add, r, sci, dec, near, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';
import { MU0 } from './decks.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;
const RAD = Math.PI / 180;
/** Independent re-solve helpers (formulae written out again, not shared with the stems). */
const Bwire = (I, d) => (2e-7 * I) / d;
const Bcoil = (N, I, R) => (4 * Math.PI * 1e-7 * N * I) / (2 * R);

// ================================================================ t01 Oersted, definition of B, Biot–Savart law
add('oersted-mcq', mcq({
  stem: 'A compass needle rests just below a horizontal wire. When a steady current is switched on in the wire the needle swings round, and when the current is reversed it swings the other way. This shows that',
  right: 'a current in a wire sets up a magnetic field around it',
  wrong: ['the wire has become a permanent magnet', 'the current exerts an electric force on the needle', 'the Earth’s magnetic field reverses near a current'],
  sol: 'The needle responds to a magnetic field produced by the moving charges in the wire (Oersted, 1820); reversing the current reverses that field — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('oersted-short', short({
  marks: 2,
  stem: 'A straight wire is stretched north–south a few centimetres above a horizontal compass needle. State, with a reason, which way the north pole of the needle swings when a current flows (a) northwards, (b) southwards in the wire.',
  model: r`(a) With x east, y north and z up, the needle is **below** the wire, so $\vec B \propto \hat y \times (-\hat z) = -\hat x$: the field at the needle points **west**, and the N pole swings **towards the west**. (b) Reversing the current reverses the field, so the N pole swings **towards the east**.`,
  sol: 'Right-hand grip rule below the wire.',
  scheme: [['(a) Field below the wire points west: N pole swings west', 1], ['(b) Current reversed: N pole swings east', 1]],
  d: 2, c: 'application', t: [1],
}));
add('tesla-fill', fill({
  stem: 'A field in which a 1 C charge moving at 1 m s⁻¹ at right angles to the field lines feels a force of 1 N has a strength of one ___ (name the unit).',
  acc: [['tesla', 'T']],
  sol: 'One **tesla** (T), since $B = F/qv$.',
  d: 1, c: 'recall', t: [1],
}));
const bd = { q: 4e-6, v: 250, F: 2e-4 };
bd.B = bd.F / (bd.q * bd.v);
add('Bdef-num', num({
  stem: 'A charged pellet carrying 4.0 μC crosses a uniform magnetic field at right angles at 250 m s⁻¹ and experiences a sideways force of 2.0 × 10⁻⁴ N. Find the magnetic field, in tesla.',
  value: Number(dec(bd.B, 2)), tol: 0.005, unit: 'T',
  sol: r`$B = \dfrac{F}{qv} = \dfrac{2.0 \times 10^{-4}}{4.0 \times 10^{-6} \times 250} = \dfrac{2.0 \times 10^{-4}}{1.0 \times 10^{-3}} = ${dec(bd.B, 2)}$ T.`,
  scheme: [['B = F/qv = 0.20 T', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(q.answer.value * 4e-6 * 250, 2e-4) || 'bd');
const an = { q: 3.2e-19, v: 2e5, B: 0.25, th: 30 };
an.F = an.q * an.v * an.B * Math.sin(an.th * RAD);
add('angle-num', num({
  stem: 'A doubly charged ion (charge 3.2 × 10⁻¹⁹ C) moves at 2.0 × 10⁵ m s⁻¹ at 30° to a uniform magnetic field of 0.25 T. Find the magnetic force on it, in units of 10⁻¹⁵ N.',
  value: Number(dec(an.F / 1e-15, 2)), tol: 0.05, unit: '× 10⁻¹⁵ N',
  sol: r`$F = qvB\sin\theta = 3.2 \times 10^{-19} \times 2.0 \times 10^{5} \times 0.25 \times \sin 30^\circ = ${sci(an.F, 2)}$ N, i.e. $\dfrac{${sci(an.F, 2)}}{10^{-15}} = ${dec(an.F / 1e-15, 2)}$.`,
  scheme: [['F = qvB sin θ = 8.0 × 10⁻¹⁵ N', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(q.answer.value * 1e-15, 3.2e-19 * 2e5 * 0.25 * 0.5) || 'an');
add('parallelv-mcq', mcq({
  stem: 'A beam of protons passes through a region containing only a uniform magnetic field and emerges with its velocity completely unchanged. The protons must have been moving',
  right: 'parallel or antiparallel to the field',
  wrong: ['at right angles to the field', 'at 45° to the field', 'in any direction, since a magnetic field never acts on protons'],
  sol: 'F = qvB sin θ is zero only for θ = 0° or 180°; at any other angle the path bends — option (@K).',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('dBdir-mcq', mcq({
  stem: 'A short current element at the origin carries current in the +x direction. By the Biot–Savart law, the field it produces at a point on the positive y-axis points in the',
  right: '+z direction',
  wrong: ['−z direction', '+y direction', '−x direction'],
  sol: r`$d\vec B \propto d\vec l \times \vec r = \hat x \times \hat y = \hat z$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('unit-mcq', mcq({
  stem: 'Which of the following is equivalent to one tesla, the SI unit of magnetic field?',
  right: 'one newton per ampere per metre (N A⁻¹ m⁻¹)',
  wrong: ['one newton per coulomb (N C⁻¹)', 'one newton ampere per metre (N A m⁻¹)', 'one volt per metre (V m⁻¹)'],
  sol: 'From F = BIl, B = F/Il, so 1 T = 1 N A⁻¹ m⁻¹ (N C⁻¹ and V m⁻¹ are units of electric field) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('biot-short', short({
  marks: 2,
  stem: 'Write the Biot–Savart law in vector form for the field produced by a current element, explain each symbol, and state the direction of the field.',
  model: r`$d\vec B = \dfrac{\mu_0}{4\pi}\,\dfrac{I\,d\vec l \times \vec r}{r^3}$, where $I\,d\vec l$ is the **current element** (along the current), $\vec r$ is the **position vector** of the field point from the element and $\mu_0 = 4\pi \times 10^{-7}$ T m A⁻¹. $d\vec B$ is **perpendicular to both** $d\vec l$ and $\vec r$, as the cross product gives.`,
  sol: 'Vector form; symbols; direction.',
  scheme: [['Vector form with μ₀/4π and r³', 1], ['Symbols explained; dB ⊥ dl and r', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Give two similarities and two differences between the Biot–Savart law for a current element and Coulomb’s law for the field of a point charge.',
  model: r`**Similarities:** both fields fall off as the **inverse square** of distance, and both are **linear in their source**, so fields of many sources add by superposition. **Differences:** the source of the electric field is a **scalar** charge q, but the magnetic source $I\,d\vec l$ is a **vector**, so dB depends on the **angle** θ ($\sin\theta$ factor); the electric field points **along** $\vec r$, while $d\vec B$ is **perpendicular** to $\vec r$.`,
  sol: 'Inverse-square and superposition; vector source and angle; direction relative to r.',
  scheme: [['Two similarities: inverse square; superposition', 1], ['Difference: vector source, sin θ dependence', 1], ['Difference: E along r, dB perpendicular to r', 1]],
  d: 3, c: 'understanding', t: [1],
}));
const el = { I: 10, dl: 2e-3, r: 0.2, th: 30 };
el.dB = (1e-7 * el.I * el.dl * Math.sin(el.th * RAD)) / el.r ** 2;
add('element-num', num({
  stem: 'A straight wire carries 10 A. Find the size of the field produced by a 2.0 mm length of it at a point 20 cm away, on a line making 30° with the direction of the current. Give the answer in units of 10⁻⁸ T.',
  value: Number(dec(el.dB / 1e-8, 2)), tol: 0.05, unit: '× 10⁻⁸ T',
  sol: r`$dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl\sin\theta}{r^2} = \dfrac{10^{-7} \times 10 \times 2.0 \times 10^{-3} \times 0.5}{(0.20)^2} = ${sci(el.dB, 2)}$ T, i.e. $\dfrac{${sci(el.dB, 2)}}{10^{-8}} = ${dec(el.dB / 1e-8, 2)}$.`,
  scheme: [['Biot–Savart with sin 30° and r = 0.20 m', 1], ['2.5 × 10⁻⁸ T', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(q.answer.value * 1e-8, (1e-6 * 2e-3) / 0.08) || 'el');
add('alongline-tf', tf({
  stem: 'A short segment of a current-carrying wire produces no magnetic field at points lying on the straight line that extends the segment, in front of it or behind it.',
  key: 't',
  sol: 'True. On that line $d\\vec l$ and $\\vec r$ are parallel or antiparallel, so $\\sin\\theta = 0$ and $d\\vec B = 0$.',
  d: 2, c: 'understanding', t: [1],
}));
add('perp-ar', ar({
  a: 'The magnetic force on a charged particle is always perpendicular to the magnetic field at its position.',
  r: 'The magnetic force on a moving charge is q(v × B), and a cross product is perpendicular to each of the two vectors in it.',
  key: 'a',
  sol: 'Both true, and R explains A: q(v × B) is perpendicular to B (and to v) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 circular coil
const cn = { N: 25, R: 0.04, I: 0.8 };
cn.B = (MU0 * cn.N * cn.I) / (2 * cn.R);
add('centre-num', num({
  stem: 'A flat circular coil of 25 turns and radius 4.0 cm carries 0.80 A. Find the magnetic field at its centre, in units of 10⁻⁴ T (3 significant figures).',
  value: Number(dec(cn.B / 1e-4, 3)), tol: 0.03, unit: '× 10⁻⁴ T',
  sol: r`$B = \dfrac{\mu_0NI}{2R} = \dfrac{4\pi \times 10^{-7} \times 25 \times 0.80}{2 \times 0.040} = ${sci(cn.B, 3)}$ T, i.e. $\dfrac{${sci(cn.B, 3)}}{10^{-4}} = ${dec(cn.B / 1e-4, 3)}$.`,
  scheme: [['B = μ₀NI/2R with R = 0.040 m', 1], ['3.14 × 10⁻⁴ T', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(q.answer.value * 1e-4, Bcoil(25, 0.8, 0.04)) || 'cn');
const ax = { N: 10, R: 0.03, I: 2, x: 0.04 };
ax.B = (MU0 * ax.N * ax.I * ax.R ** 2) / (2 * (ax.R ** 2 + ax.x ** 2) ** 1.5);
add('axis-num', num({
  stem: 'A coil of 10 turns and radius 3.0 cm carries 2.0 A. Find the magnetic field at a point on its axis 4.0 cm from its centre, in μT (3 significant figures).',
  value: Number(dec(ax.B * 1e6, 3)), tol: 0.5, unit: 'μT',
  sol: r`$R^2 + x^2 = 0.0009 + 0.0016 = 0.0025$ m², so $(R^2 + x^2)^{3/2} = 0.050^3 = 1.25 \times 10^{-4}$ m³. $B = \dfrac{\mu_0NIR^2}{2(R^2 + x^2)^{3/2}} = \dfrac{4\pi \times 10^{-7} \times 10 \times 2.0 \times 0.0009}{2 \times 1.25 \times 10^{-4}} = ${sci(ax.B, 3)}$ T, i.e. $${sci(ax.B, 3)} \times 10^{6} = ${dec(ax.B * 1e6, 3)}\ \mu$T.`,
  scheme: [['(R² + x²)^(3/2) = 1.25 × 10⁻⁴ m³', 1], ['B ≈ 90.5 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(q.answer.value * 1e-6, Bcoil(10, 2, 0.03) * 0.6 ** 3) || 'ax');
add('twocoil-mcq', mcq({
  stem: 'Coil P has 1 turn of radius R and coil Q has 3 turns of radius 3R; both carry the same current. The ratio of the field at the centre of P to that at the centre of Q is',
  right: '1 : 1',
  wrong: ['1 : 3', '3 : 1', '1 : 9'],
  sol: 'B = μ₀NI/2R ∝ N/R: for P, 1/R; for Q, 3/3R = 1/R. The fields are equal — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('rewind-mcq', mcq({
  stem: 'A fixed length of wire carrying a steady current is first bent into a single circular turn and then rewound into a flat coil of 2 turns. The field at the centre becomes',
  right: '4 times as large',
  wrong: ['2 times as large', 'the same', '8 times as large'],
  sol: 'The length is fixed, so with 2 turns the radius halves. B ∝ N/R gives 2 ÷ ½ = 4 times — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('loopdir-mcq', mcq({
  stem: 'A circular loop lies in the plane of this page and carries a current that flows clockwise as you look at it. At the centre of the loop the magnetic field is',
  right: 'perpendicular to the page, pointing into it (away from you)',
  wrong: ['perpendicular to the page, pointing out of it (towards you)', 'in the plane of the page, along a diameter', 'zero, because opposite sides of the loop cancel'],
  sol: 'Curl the right-hand fingers clockwise: the thumb points into the page. Every element contributes in the same direction, so nothing cancels — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('centrederive-short3', short({
  marks: 3,
  stem: 'Using the Biot–Savart law, obtain the magnetic field at the centre of a flat circular coil of N turns and radius R carrying a current I, and state its direction.',
  model: r`Every element $d\vec l$ of a turn is at distance $R$ from the centre and **perpendicular** to the line joining it to the centre ($\theta = 90^\circ$), so $dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl}{R^2}$, and all the $d\vec B$ point the **same way, along the axis**. Adding round one turn, $\sum dl = 2\pi R$: $B = \dfrac{\mu_0 I (2\pi R)}{4\pi R^2} = \dfrac{\mu_0I}{2R}$. For N turns $B = \dfrac{\mu_0NI}{2R}$, along the axis as given by the **right-hand grip rule**.`,
  sol: 'θ = 90° for every element; all dB parallel; sum of dl = 2πR.',
  scheme: [['dB = μ₀I dl/4πR², all along the axis', 1], ['Sum dl = 2πR: B = μ₀I/2R', 1], ['N turns: μ₀NI/2R; direction by right-hand rule', 1]],
  d: 3, c: 'understanding', t: [1, 2], wl: null,
}));
const ec = { N: 50, R: 0.1, Bh: 3.6e-5 };
ec.I = (2 * ec.R * ec.Bh) / (MU0 * ec.N);
add('earthcancel-num', num({
  stem: 'A flat circular coil of 50 turns and radius 10 cm stands vertically with its plane at right angles to the magnetic meridian. What current through it would make the field at its centre exactly cancel the horizontal component of the Earth’s field, 3.6 × 10⁻⁵ T? Give the answer in amperes (3 significant figures).',
  value: Number(dec(ec.I, 3)), tol: 0.002, unit: 'A',
  sol: r`The coil’s axis lies along the meridian, so its central field can oppose the Earth’s horizontal field: $\dfrac{\mu_0NI}{2R} = B_H$ gives $I = \dfrac{2RB_H}{\mu_0N} = \dfrac{2 \times 0.10 \times 3.6 \times 10^{-5}}{4\pi \times 10^{-7} \times 50} = ${dec(ec.I, 3)}$ A (in the sense that makes the central field point south).`,
  scheme: [['μ₀NI/2R = B_H', 1], ['I ≈ 0.115 A', 1]],
  marks: 2, d: 3, c: 'analysis', t: [2],
}), (q) => near(Bcoil(50, q.answer.value, 0.1), 3.6e-5) || 'ec');
const ar2 = 1 / (1 + 2 ** 2) ** 1.5;
add('axisratio-num', num({
  stem: 'On the axis of a flat circular coil, at a distance from the centre equal to twice the coil’s radius, the field is what fraction of the field at the centre? Give the answer to 2 significant figures.',
  value: Number(dec(ar2, 2)), tol: 0.002, unit: '',
  sol: r`$\dfrac{B}{B_0} = \dfrac{R^3}{(R^2 + x^2)^{3/2}} = \dfrac{1}{(1 + 4)^{3/2}} = \dfrac{1}{5\sqrt5} \approx ${dec(ar2, 2)}$.`,
  scheme: [['B/B₀ = (1 + x²/R²)^(−3/2) = 5^(−3/2) ≈ 0.089', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(q.answer.value, 1 / (5 * Math.sqrt(5))) || 'ar2');
add('coils-b-ar', ar({
  a: 'Doubling the current in a flat circular coil doubles the magnetic field at its centre.',
  r: 'The magnetic field at the centre of a flat circular coil is inversely proportional to its radius.',
  key: 'b',
  sol: 'Both true (B = μ₀NI/2R), but R, about the dependence on radius, does not explain why B doubles with the current — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('farfield-short', short({
  marks: 2,
  stem: 'Starting from the field on the axis of a flat circular coil, show that at distances x much greater than its radius R the field varies as 1/x³. What does the same expression give at x = 0?',
  model: r`On the axis $B = \dfrac{\mu_0NIR^2}{2(R^2 + x^2)^{3/2}}$. For $x \gg R$, $R^2 + x^2 \approx x^2$, so $B \approx \dfrac{\mu_0NIR^2}{2x^3}$: **B falls as 1/x³**. At $x = 0$ it gives $\dfrac{\mu_0NIR^2}{2R^3} = \dfrac{\mu_0NI}{2R}$, the **centre value**.`,
  sol: 'Neglect R² against x²; set x = 0.',
  scheme: [['x ≫ R: B ≈ μ₀NIR²/2x³ ∝ 1/x³', 1], ['x = 0: μ₀NI/2R', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));

// ================================================================ t03 Ampere's law, long wire, solenoid, finite wire
const wn = Bwire(20, 0.08);
add('wire-num', num({
  stem: 'Find the magnetic field 8.0 cm from a long straight conductor carrying 20 A, in μT.',
  value: Number(dec(wn * 1e6, 2)), tol: 0.5, unit: 'μT',
  sol: r`$B = \dfrac{\mu_0I}{2\pi r} = \dfrac{2 \times 10^{-7} \times 20}{0.080} = ${sci(wn, 2)}$ T, i.e. $${sci(wn, 2)} \times 10^{6} = ${dec(wn * 1e6, 2)}\ \mu$T.`,
  scheme: [['B = μ₀I/2πr = 50 μT', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(q.answer.value * 1e-6, (MU0 * 20) / (2 * Math.PI * 0.08)) || 'wn');
const wd = (2e-7 * 3) / 1.5e-5;
add('wiredist-num', num({
  stem: 'At what distance from a long straight wire carrying 3.0 A is the magnetic field 1.5 × 10⁻⁵ T? Give the answer in cm.',
  value: Number(dec(wd * 100, 2)), tol: 0.05, unit: 'cm',
  sol: r`$r = \dfrac{\mu_0I}{2\pi B} = \dfrac{2 \times 10^{-7} \times 3.0}{1.5 \times 10^{-5}} = ${dec(wd, 2)}$ m $= ${dec(wd * 100, 2)}$ cm.`,
  scheme: [['r = μ₀I/2πB = 4.0 cm', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(Bwire(3, q.answer.value / 100), 1.5e-5) || 'wd');
add('enclosed-mcq', mcq({
  stem: r`Four long straight wires run perpendicular to the page. Three of them pass through a closed loop drawn on the page, carrying 4 A out of the page, 6 A out of the page and 3 A into the page; the fourth, carrying 5 A out of the page, lies outside the loop. The value of $\oint \vec B \cdot d\vec l$ round the loop, in T m, is`,
  right: '$7\\mu_0$',
  wrong: ['$13\\mu_0$', '$12\\mu_0$', '$18\\mu_0$'],
  sol: r`Only currents threading the loop count, with signs: $I_{\text{enc}} = 4 + 6 - 3 = 7$ A, so $\oint \vec B \cdot d\vec l = 7\mu_0$. The outside 5 A wire contributes nothing to the integral — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('ratiowire-mcq', mcq({
  stem: 'Point P is 2.0 cm from a long straight wire carrying current I, and point Q is 4.0 cm from another long straight wire carrying current 3I. The ratio of the field at P to the field at Q is',
  right: '2 : 3',
  wrong: ['3 : 2', '2 : 1', '4 : 3'],
  sol: 'B ∝ I/r: at P, I/2; at Q, 3I/4. Ratio (1/2) : (3/4) = 2 : 3 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const sn = { N: 600, L: 0.3, I: 0.5 };
sn.n = sn.N / sn.L;
sn.B = MU0 * sn.n * sn.I;
add('solenoid-num', num({
  stem: 'A long solenoid 30 cm long has 600 turns and carries 0.50 A. Find the magnetic field near its middle, in mT (3 significant figures).',
  value: Number(dec(sn.B * 1e3, 3)), tol: 0.01, unit: 'mT',
  sol: r`$n = \dfrac{600}{0.30} = ${dec(sn.n, 4)}$ m$^{-1}$; $B = \mu_0nI = 4\pi \times 10^{-7} \times 2000 \times 0.50 = ${sci(sn.B, 3)}$ T, i.e. $${sci(sn.B, 3)} \times 10^{3} = ${dec(sn.B * 1e3, 3)}$ mT.`,
  scheme: [['n = 2000 turns per metre', 1], ['B = μ₀nI ≈ 1.26 mT', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(q.answer.value * 1e-3, 4 * Math.PI * 1e-7 * 2000 * 0.5) || 'sn');
const si = { n: 1500, B: 6e-3 };
si.I = si.B / (MU0 * si.n);
add('solI-num', num({
  stem: 'A long solenoid is wound with 15 turns per centimetre. What current must it carry to produce a field of 6.0 mT inside it? Give the answer in amperes (3 significant figures).',
  value: Number(dec(si.I, 3)), tol: 0.02, unit: 'A',
  sol: r`$n = 15$ per cm $= 1500$ m$^{-1}$. $I = \dfrac{B}{\mu_0n} = \dfrac{6.0 \times 10^{-3}}{4\pi \times 10^{-7} \times 1500} = ${dec(si.I, 3)}$ A.`,
  scheme: [['n = 1500 m⁻¹', 1], ['I = B/μ₀n ≈ 3.18 A', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(4 * Math.PI * 1e-7 * 1500 * q.answer.value, 6e-3) || 'si');
add('stretch-mcq', mcq({
  stem: 'A long solenoid is gently stretched until its length doubles, keeping the same number of turns and the same current. The field near its middle',
  right: 'falls to half its original value',
  wrong: ['doubles', 'stays the same, since N and I are unchanged', 'falls to a quarter of its original value'],
  sol: 'B = μ₀nI with n = N/L: doubling L halves n, so B halves — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const fw = { I: 4, half: 0.03, a: 0.04 };
fw.s = fw.half / Math.hypot(fw.half, fw.a);
fw.B = ((MU0 * fw.I) / (4 * Math.PI * fw.a)) * 2 * fw.s;
add('finite-num', num({
  stem: 'A straight wire 6.0 cm long carries 4.0 A. Find the magnetic field at a point 4.0 cm from the midpoint of the wire, on its perpendicular bisector, in μT.',
  value: Number(dec(fw.B * 1e6, 2)), tol: 0.2, unit: 'μT',
  sol: r`Each half is 3.0 cm, so $\sin\alpha = \sin\beta = \dfrac{3.0}{\sqrt{3.0^2 + 4.0^2}} = ${dec(fw.s, 2)}$. $B = \dfrac{\mu_0I}{4\pi a}(\sin\alpha + \sin\beta) = \dfrac{10^{-7} \times 4.0}{0.040} \times 1.2 = ${sci(fw.B, 2)}$ T, i.e. $${sci(fw.B, 2)} \times 10^{6} = ${dec(fw.B * 1e6, 2)}\ \mu$T.`,
  scheme: [['sin α = sin β = 0.6', 1], ['B = 12 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(q.answer.value * 1e-6, 1e-5 * 1.2) || 'fw');
add('limit-short', short({
  marks: 2,
  stem: 'The field of a straight wire of finite length at perpendicular distance a is B = (μ₀I/4πa)(sin α + sin β). Show that it reduces to μ₀I/2πa for a very long wire, and find B at perpendicular distance a from the end of a very long wire that extends in one direction only.',
  model: r`Very long wire: both ends are far away, so $\alpha, \beta \to 90^\circ$ and $\sin\alpha + \sin\beta \to 2$: $B = \dfrac{\mu_0I}{4\pi a} \times 2 = \dfrac{\mu_0I}{2\pi a}$. Opposite the end of a semi-infinite wire, $\alpha = 0$ and $\beta \to 90^\circ$: $B = \dfrac{\mu_0I}{4\pi a}$, **half** the long-wire value.`,
  sol: 'Angles 90° and 90°; then 0° and 90°.',
  scheme: [['α, β → 90°: μ₀I/2πa', 1], ['Semi-infinite: α = 0, β = 90°: μ₀I/4πa', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const sq = { side: 0.1, I: 5 };
sq.a = sq.side / 2;
sq.one = ((MU0 * sq.I) / (4 * Math.PI * sq.a)) * 2 * Math.sin(45 * RAD);
sq.B = 4 * sq.one;
add('square-short3', short({
  marks: 3,
  stem: 'A square loop of wire of side 10 cm carries a current of 5.0 A. Using the formula for the field of a finite straight wire, find the magnetic field at the centre of the square.',
  model: r`Each side is at perpendicular distance $a = 5.0$ cm from the centre, and its ends subtend $\alpha = \beta = 45^\circ$. One side gives $B_1 = \dfrac{\mu_0I}{4\pi a}(\sin 45^\circ + \sin 45^\circ) = \dfrac{10^{-7} \times 5.0}{0.050} \times \sqrt2 = ${sci(sq.one, 3)}$ T. All four sides give fields in the **same direction** (perpendicular to the loop), so $B = 4B_1 = ${sci(sq.B, 3)}$ T.`,
  sol: 'a = side/2; α = β = 45°; four equal contributions add.',
  scheme: [['a = 0.050 m, α = β = 45°', 1], ['One side: 1.41 × 10⁻⁵ T', 1], ['Four sides add: 5.66 × 10⁻⁵ T', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(sq.B, (2 * Math.SQRT2 * MU0 * 5) / (Math.PI * 0.1)) || 'sq');
add('halfdist-ar', ar({
  a: 'Moving from 2 cm to 4 cm away from a long straight current-carrying wire halves the magnetic field.',
  r: 'On a circle centred on the wire, B is tangential and constant in size, so Ampere’s law gives B(2πr) = μ₀I.',
  key: 'a',
  sol: 'Both true, and R explains A: B = μ₀I/2πr ∝ 1/r, so doubling r halves B — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ampere-short', short({
  marks: 2,
  stem: 'State Ampere’s circuital law. In applying it, how are currents that thread the loop in opposite directions, and currents that do not pass through the loop, treated?',
  model: r`$\oint \vec B \cdot d\vec l = \mu_0 I_{\text{enc}}$: the line integral of B round **any closed loop** equals $\mu_0$ times the **net current threading** the loop. Currents through the loop in opposite senses take **opposite signs** (the right-hand rule fixes the positive sense); currents **outside** the loop add **nothing** to the integral, though they do affect B on the loop.`,
  sol: 'Statement; signs; outside currents.',
  scheme: [['Statement with μ₀ × net enclosed current', 1], ['Opposite currents: opposite signs; outside currents: no contribution', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
add('wirederive-short3', short({
  marks: 3,
  stem: 'Use Ampere’s circuital law to find the magnetic field at a distance r from a long straight wire carrying current I, explaining why you choose the closed path you do.',
  model: r`By symmetry the field lines are **circles centred on the wire**, and B has the same size at every point a distance r away. So choose as the Amperian loop a **circle of radius r** centred on the wire: at every point B is **along** $d\vec l$ and **constant**, so $\oint \vec B \cdot d\vec l = B(2\pi r)$. The current threading the loop is I, so $B(2\pi r) = \mu_0I$ and $B = \dfrac{\mu_0I}{2\pi r}$, tangential to the circle.`,
  sol: 'Symmetry; circular loop; B(2πr) = μ₀I.',
  scheme: [['Symmetry: circular field lines, constant B at fixed r', 1], ['Circular loop: ∮B·dl = B·2πr', 1], ['B = μ₀I/2πr', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
const np = { d: 0.1, I1: 6, I2: 4 };
np.x = (np.I1 * np.d) / (np.I1 + np.I2);
add('nullpoint-num', num({
  stem: 'Two long parallel wires 10 cm apart carry 6.0 A and 4.0 A in the same direction. How far from the 6.0 A wire, on the line between the wires, is the magnetic field zero? Give the answer in cm.',
  value: Number(dec(np.x * 100, 2)), tol: 0.05, unit: 'cm',
  sol: r`Between like currents the two fields are opposite, so they cancel where $\dfrac{\mu_0 \times 6.0}{2\pi x} = \dfrac{\mu_0 \times 4.0}{2\pi(0.10 - x)}$: $6.0(0.10 - x) = 4.0x$, so $x = ${dec(np.x, 2)}$ m $= ${dec(np.x * 100, 2)}$ cm.`,
  scheme: [['Fields opposite between like currents: 6/x = 4/(0.10 − x)', 1], ['x = 6.0 cm from the 6.0 A wire', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3],
}), (q) => near(Bwire(6, q.answer.value / 100), Bwire(4, 0.1 - q.answer.value / 100)) || 'np');
add('solenoid-c-ar', ar({
  a: 'Near the middle of a long, closely wound solenoid the magnetic field is μ₀nI, directed along the axis.',
  r: 'The field of a long solenoid is strongest just outside its windings.',
  key: 'c',
  sol: 'A is true. R is false: outside a long solenoid the field is very weak; it is strong and uniform inside — option (c).',
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 Lorentz force and motion of charges
add('nowork-ar', ar({
  a: 'A uniform magnetic field can change the direction in which a proton moves but cannot change its kinetic energy.',
  r: 'The magnetic force on a moving charge is always perpendicular to its velocity.',
  key: 'a',
  sol: 'Both true, and R explains A: a force perpendicular to v does no work (F·v = 0), so the speed and kinetic energy stay constant — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
const rd = { q: 3.2e-19, m: 6.6e-27, v: 1.6e6, B: 0.75 };
rd.r = (rd.m * rd.v) / (rd.q * rd.B);
add('radius-num', num({
  stem: 'An alpha particle (charge 3.2 × 10⁻¹⁹ C, mass 6.6 × 10⁻²⁷ kg) moves at 1.6 × 10⁶ m s⁻¹ at right angles to a uniform magnetic field of 0.75 T. Find the radius of its path, in cm.',
  value: Number(dec(rd.r * 100, 2)), tol: 0.05, unit: 'cm',
  sol: r`$r = \dfrac{mv}{qB} = \dfrac{6.6 \times 10^{-27} \times 1.6 \times 10^{6}}{3.2 \times 10^{-19} \times 0.75} = \dfrac{1.056 \times 10^{-20}}{2.4 \times 10^{-19}} = ${dec(rd.r, 2)}$ m $= ${dec(rd.r * 100, 2)}$ cm.`,
  scheme: [['r = mv/qB', 1], ['r = 4.4 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near((q.answer.value / 100) * 3.2e-19 * 0.75, 6.6e-27 * 1.6e6) || 'rd');
const fq = (QE * 5e-3) / (2 * Math.PI * ME);
add('freq-num', num({
  stem: 'Find the frequency with which an electron circles in a uniform magnetic field of 5.0 mT, in MHz (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)',
  value: Number(dec(fq / 1e6, 3)), tol: 1, unit: 'MHz',
  sol: r`$f = \dfrac{eB}{2\pi m_e} = \dfrac{1.6 \times 10^{-19} \times 5.0 \times 10^{-3}}{2\pi \times 9.1 \times 10^{-31}} = ${sci(fq, 3)}$ Hz, i.e. $\dfrac{${sci(fq, 3)}}{10^{6}} = ${dec(fq / 1e6, 3)}$ MHz (whatever the electron’s speed).`,
  scheme: [['f = eB/2πm ≈ 140 MHz', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near((q.answer.value * 1e6 * 2 * Math.PI * 9.1e-31) / 1.6e-19, 5e-3) || 'fq');
add('samevolt-mcq', mcq({
  stem: 'A proton and an alpha particle (charge 2e, mass 4mₚ) are each accelerated from rest through the same potential difference and then move at right angles to the same uniform magnetic field. The ratio of the radius of the alpha particle’s path to that of the proton’s is',
  right: '√2 : 1',
  wrong: ['1 : 1', '2 : 1', '1 : √2'],
  sol: r`$qV = \tfrac12mv^2$ gives $mv = \sqrt{2mqV}$, so $r = \dfrac{mv}{qB} = \dfrac{1}{B}\sqrt{\dfrac{2mV}{q}} \propto \sqrt{m/q}$. For the alpha particle $m/q$ is $4/2 = 2$ times the proton’s, so the ratio is $\sqrt2 : 1$ — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}));
add('doubleB-mcq', mcq({
  stem: 'An ion moves in a circle at right angles to a uniform magnetic field. The field is then doubled while the ion’s speed stays the same. Its new circular path has',
  right: 'half the radius and half the period',
  wrong: ['half the radius and the same period', 'twice the radius and twice the period', 'the same radius and half the period'],
  sol: 'r = mv/qB and T = 2πm/qB both vary as 1/B — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('updir-mcq', mcq({
  stem: 'A proton moves vertically upwards through a horizontal magnetic field that points due north. The magnetic force on it is directed towards the',
  right: 'west',
  wrong: ['east', 'north', 'south'],
  sol: r`With x east, y north and z up: $\vec v \times \vec B \propto \hat z \times \hat y = -\hat x$, which is west; the proton is positive — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('electrondir-mcq', mcq({
  stem: 'An electron travels due east through a magnetic field that points vertically upwards. The magnetic force on the electron points',
  right: 'due north',
  wrong: ['due south', 'vertically downwards', 'due west'],
  sol: r`With x east, y north and z up: $\vec v \times \vec B \propto \hat x \times \hat z = -\hat y$ (south). The electron’s charge is negative, so the force is reversed: due north — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
const pt = { v: 3e6, th: 30, B: 2e-3 };
pt.T = (2 * Math.PI * ME) / (QE * pt.B);
pt.p = pt.v * Math.cos(pt.th * RAD) * pt.T;
add('pitch-num', num({
  stem: 'An electron enters a uniform magnetic field of 2.0 mT with a speed of 3.0 × 10⁶ m s⁻¹, its velocity making 30° with the field. Find the pitch of its helical path, in cm (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)',
  value: Number(dec(pt.p * 100, 3)), tol: 0.05, unit: 'cm',
  sol: r`$T = \dfrac{2\pi m_e}{eB} = \dfrac{2\pi \times 9.1 \times 10^{-31}}{1.6 \times 10^{-19} \times 2.0 \times 10^{-3}} = ${sci(pt.T, 3)}$ s. Pitch $p = v\cos 30^\circ \times T = 3.0 \times 10^{6} \times 0.866 \times ${sci(pt.T, 3)} = ${sci(pt.p, 3)}$ m $= ${dec(pt.p * 100, 3)}$ cm.`,
  scheme: [['T = 2πm/eB ≈ 1.79 × 10⁻⁸ s', 1], ['p = v cos θ × T ≈ 4.64 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(q.answer.value / 100, (2 * Math.PI * 9.1e-31 * 3e6 * Math.cos(Math.PI / 6)) / (1.6e-19 * 2e-3)) || 'pt');
add('paths-short3', short({
  marks: 3,
  stem: 'Describe, with a reason in each case, the path of a charged particle that enters a uniform magnetic field (a) moving along the field lines, (b) at right angles to them, (c) at 45° to them.',
  model: r`(a) **Straight line** at constant speed: $\theta = 0$, so $qvB\sin\theta = 0$ and there is no force. (b) **Circle** in a plane perpendicular to B: the force $qvB$ has constant size and is always perpendicular to v, so it acts as a centripetal force ($r = mv/qB$). (c) **Helix** about the field direction: $v\sin 45^\circ$ is bent into a circle while $v\cos 45^\circ$, along B, is unaffected.`,
  sol: 'sin θ = 0; constant perpendicular force; split the velocity.',
  scheme: [['(a) Straight line: no force along B', 1], ['(b) Circle: constant force perpendicular to v', 1], ['(c) Helix: perpendicular part circles, parallel part unchanged', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const sv = 3e4 / 0.06;
add('selector-num', num({
  stem: 'In a region of crossed fields, E = 3.0 × 10⁴ V m⁻¹ and B = 0.060 T, arranged so that the electric and magnetic forces on a charge moving at right angles to both are opposite. At what speed does a charged particle pass through undeflected? Give the answer in units of 10⁵ m s⁻¹.',
  value: Number(dec(sv / 1e5, 2)), tol: 0.05, unit: '× 10⁵ m s⁻¹',
  sol: r`$qE = qvB \Rightarrow v = \dfrac{E}{B} = \dfrac{3.0 \times 10^{4}}{0.060} = ${sci(sv, 2)}$ m s$^{-1}$, i.e. $\dfrac{${sci(sv, 2)}}{10^{5}} = ${dec(sv / 1e5, 2)}$, for any charge or mass.`,
  scheme: [['v = E/B = 5.0 × 10⁵ m s⁻¹', 1]],
  d: 2, c: 'understanding', t: [4],
}), (q) => near(q.answer.value * 1e5 * 0.06, 3e4) || 'sv');
const nf = { v: 2e5, E: 1e4, B: 0.02 };
nf.F = QE * (nf.E - nf.v * nf.B); // v × B = x̂ × ẑ (vB) = −ŷ vB
add('netforce-num', num({
  stem: 'A proton moves along +x at 2.0 × 10⁵ m s⁻¹ through a region where an electric field of 1.0 × 10⁴ V m⁻¹ points along +y and a magnetic field of 0.020 T points along +z. Find the size of the net force on the proton, in units of 10⁻¹⁶ N.',
  value: Number(dec(nf.F / 1e-16, 2)), tol: 0.05, unit: '× 10⁻¹⁶ N',
  sol: r`$\vec v \times \vec B = vB(\hat x \times \hat z) = -vB\,\hat y$, with $vB = 2.0 \times 10^{5} \times 0.020 = 4.0 \times 10^{3}$ V m$^{-1}$. So $\vec F = e(E - vB)\hat y = 1.6 \times 10^{-19} \times (1.0 \times 10^{4} - 4.0 \times 10^{3})\,\hat y = ${sci(nf.F, 2)}$ N along +y, i.e. $\dfrac{${sci(nf.F, 2)}}{10^{-16}} = ${dec(nf.F / 1e-16, 2)}$.`,
  scheme: [['Magnetic force along −y, size evB', 1], ['Net e(E − vB) = 9.6 × 10⁻¹⁶ N along +y', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(q.answer.value * 1e-16, 1.6e-19 * 6e3) || 'nf');
add('orbit-short3', short({
  marks: 3,
  stem: 'A particle of charge q and mass m is projected with speed v at right angles to a uniform magnetic field B. Obtain the radius of its orbit and the time for one revolution, and hence explain why all such particles with the same q/m take the same time to go round, whatever their speed.',
  model: r`The force $qvB$ is always perpendicular to v, so the speed is constant and the force supplies the **centripetal force**: $qvB = \dfrac{mv^2}{r}$, giving $r = \dfrac{mv}{qB}$. The time for one revolution is $T = \dfrac{2\pi r}{v} = \dfrac{2\pi m}{qB}$. T contains **no v**: a faster particle moves on a **proportionally larger** circle, so the time per turn depends only on $q/m$ and B.`,
  sol: 'Centripetal force; T = 2πr/v.',
  scheme: [['qvB = mv²/r', 1], ['r = mv/qB', 1], ['T = 2πm/qB, independent of v (larger r for larger v)', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
add('KEchange-short', short({
  marks: 2,
  stem: 'A student proposes to speed up a beam of protons by passing it through a very strong steady magnetic field. Evaluate the proposal.',
  model: r`It **will not work**. The magnetic force $q\vec v \times \vec B$ is always **perpendicular to the velocity**, so it does **no work** ($\vec F \cdot \vec v = 0$): the protons’ **speed and kinetic energy stay the same**, and the field only **bends** the beam. To speed them up an **electric field** (a potential difference) is needed.`,
  sol: 'Magnetic force does no work.',
  scheme: [['Force perpendicular to v: no work, speed unchanged', 1], ['Only deflects; an electric field is needed to accelerate', 1]],
  d: 3, c: 'evaluation', t: [4],
}));

// ================================================================ t05 force on a conductor, parallel currents, the ampere
const rn = 2.5 * 0.4 * 0.2 * Math.sin(30 * RAD);
add('rod-num', num({
  stem: 'A straight wire 40 cm long carries 2.5 A and lies at 30° to a uniform magnetic field of 0.20 T. Find the force on the wire, in newtons.',
  value: Number(dec(rn, 2)), tol: 0.005, unit: 'N',
  sol: r`$F = BIl\sin\theta = 0.20 \times 2.5 \times 0.40 \times \sin 30^\circ = ${dec(rn, 2)}$ N.`,
  scheme: [['F = BIl sin θ = 0.10 N', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(q.answer.value, 0.1) || 'rn');
const fl = { L: 0.5, m: 0.04, B: 0.25, g: 9.8 };
fl.I = (fl.m * fl.g) / (fl.B * fl.L);
add('float-num', num({
  stem: 'A horizontal straight rod 0.50 m long, of mass 40 g, lies at right angles to a horizontal magnetic field of 0.25 T. What current in the rod would make the magnetic force on it just balance its weight? Take g = 9.8 m s⁻². Give the answer in amperes (3 significant figures).',
  value: Number(dec(fl.I, 3)), tol: 0.02, unit: 'A',
  sol: r`For balance $BIl = mg$, so $I = \dfrac{mg}{Bl} = \dfrac{0.040 \times 9.8}{0.25 \times 0.50} = \dfrac{0.392}{0.125} = ${dec(fl.I, 3)}$ A (in the direction that makes $I\vec l \times \vec B$ point upwards).`,
  scheme: [['BIl = mg', 1], ['I ≈ 3.14 A', 1]],
  marks: 2, d: 3, c: 'analysis', t: [5],
}), (q) => near(0.25 * q.answer.value * 0.5, 0.04 * 9.8) || 'fl');
add('wiredir-mcq', mcq({
  stem: 'A straight wire carries a current due north through a magnetic field that points vertically downwards. The force on the wire points',
  right: 'due west',
  wrong: ['due east', 'due north', 'vertically upwards'],
  sol: r`With x east, y north and z up: $\vec F = I\vec l \times \vec B \propto \hat y \times (-\hat z) = -\hat x$, due west — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
const pn = { I1: 12, I2: 9, d: 0.05, L: 2 };
pn.F = ((MU0 * pn.I1 * pn.I2) / (2 * Math.PI * pn.d)) * pn.L;
add('parallel-num', num({
  stem: 'Two long straight parallel wires 5.0 cm apart carry 12 A and 9.0 A in the same direction. Find the force on a 2.0 m length of either wire, in mN (3 significant figures).',
  value: Number(dec(pn.F * 1e3, 3)), tol: 0.01, unit: 'mN',
  sol: r`$\dfrac{F}{l} = \dfrac{\mu_0I_1I_2}{2\pi r} = \dfrac{2 \times 10^{-7} \times 12 \times 9.0}{0.050} = ${sci(pn.F / pn.L, 3)}$ N m$^{-1}$; on 2.0 m, $F = ${sci(pn.F, 3)}$ N $= ${dec(pn.F * 1e3, 3)}$ mN, attractive.`,
  scheme: [['F/l = μ₀I₁I₂/2πr = 4.32 × 10⁻⁴ N m⁻¹', 1], ['On 2.0 m: 0.864 mN', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(q.answer.value * 1e-3, (2 * 2e-7 * 108) / 0.05) || 'pn');
add('opposite-mcq', mcq({
  stem: 'Two long straight wires lie side by side, one carrying 3.0 A and the other 6.0 A in the opposite direction. Compared with the force on the 6.0 A wire, the force on the 3.0 A wire is',
  right: 'equal in size, with the wires pushing apart',
  wrong: ['half as large, with the wires pulling together', 'twice as large, with the wires pushing apart', 'equal in size, with the wires pulling together'],
  sol: 'Each wire feels μ₀I₁I₂/2πr per metre, which contains both currents (Newton’s third law); unlike currents repel — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ampdef-short', short({
  marks: 2,
  stem: 'State the definition of one ampere based on the magnetic force between two long parallel wires in vacuum, and use it to define one coulomb.',
  model: 'One **ampere** is the steady current in each of two **long, thin, parallel** wires **1 m apart in vacuum** that makes each wire feel **2 × 10⁻⁷ N per metre**. One **coulomb** is the charge carried past a point in **1 s** by a steady current of **1 A** (1 C = 1 A s).',
  sol: 'Parallel-wire force; Q = It.',
  scheme: [['Ampere: 1 m apart, vacuum, 2 × 10⁻⁷ N m⁻¹', 1], ['Coulomb: 1 A for 1 s', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('ampere-fill', fill({
  stem: 'Two long, thin, parallel wires 1 m apart in vacuum carry equal steady currents, and each metre of either wire is pushed with a force of 2 × 10⁻⁷ N. Each current is then one ___.',
  acc: [['ampere', 'A', 'amp']],
  sol: 'One **ampere**: $\\dfrac{\\mu_0I^2}{2\\pi \\times 1} = 2 \\times 10^{-7}$ N m$^{-1}$ gives $I = 1$ A.',
  d: 1, c: 'recall', t: [5],
}));
add('coulomb-tf', tf({
  stem: 'One coulomb is the charge that a steady current of one ampere carries past a point in the circuit in one second.',
  key: 't',
  sol: 'True. Q = It, so 1 C = 1 A × 1 s.',
  d: 1, c: 'understanding', t: [5],
}));
add('forcederive-short3', short({
  marks: 3,
  stem: 'Two long straight conductors in vacuum, a distance r apart, carry steady currents I₁ and I₂ in the same sense. Obtain the magnetic force on each metre of either conductor and show that the conductors attract.',
  model: r`Conductor 1 sets up a field $B_1 = \dfrac{\mu_0I_1}{2\pi r}$ at conductor 2, **perpendicular** to it (circles round conductor 1). A length l of conductor 2 feels $F = B_1I_2l$, so $\dfrac{F}{l} = \dfrac{\mu_0I_1I_2}{2\pi r}$. By $I_2\vec l \times \vec B_1$ this force points **towards conductor 1**; by symmetry conductor 1 feels an equal force towards conductor 2: like currents **attract**.`,
  sol: 'B₁ at the second wire; F = B₁I₂l; direction by I l × B.',
  scheme: [['B₁ = μ₀I₁/2πr, perpendicular to wire 2', 1], ['F/l = μ₀I₁I₂/2πr', 1], ['Direction towards the other wire: attraction', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));
add('conductor-short3', short({
  marks: 3,
  stem: 'Starting from the force on a single moving charge, show that a straight conductor of length l carrying current I in a uniform field B experiences a force F = I(l × B).',
  model: r`Let the conductor have cross-section A and n free electrons per unit volume drifting with velocity $\vec v_d$. Each feels $-e(\vec v_d \times \vec B)$; there are $nAl$ of them, so $\vec F = -nAle(\vec v_d \times \vec B)$. The current is $I = nAe v_d$, and $\vec l$ (in the direction of the current) is opposite to $\vec v_d$, so $-nAle\,\vec v_d = I\vec l$. Hence $\vec F = I(\vec l \times \vec B)$, of size $BIl\sin\theta$.`,
  sol: 'Sum over nAl drifting electrons; I = nAev_d.',
  scheme: [['Force on one electron and number nAl', 1], ['I = nAev_d; l along the current', 1], ['F = I(l × B), size BIl sin θ', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));
const md = { d: 0.08, IA: 10, IB: 6, IC: 2 };
md.FA = (2e-7 * md.IA * md.IC) / (md.d / 2);
md.FB = (2e-7 * md.IB * md.IC) / (md.d / 2);
md.F = md.FA - md.FB;
add('middle-num', num({
  stem: 'Parallel wires A and B are 8.0 cm apart and carry 10 A and 6.0 A in the same direction. A third parallel wire C, midway between them, carries 2.0 A in the same direction. Find the net force on each metre of C, in units of 10⁻⁵ N m⁻¹, and state which way it acts.',
  value: Number(dec(md.F / 1e-5, 2)), tol: 0.05, unit: '× 10⁻⁵ N m⁻¹',
  sol: r`Each wire is 4.0 cm from C and all currents are alike, so C is pulled towards both. From A: $\dfrac{2 \times 10^{-7} \times 10 \times 2.0}{0.040} = ${sci(md.FA, 2)}$ N m$^{-1}$; from B: $\dfrac{2 \times 10^{-7} \times 6.0 \times 2.0}{0.040} = ${sci(md.FB, 2)}$ N m$^{-1}$. Net $= ${sci(md.F, 2)}$ N m$^{-1}$, i.e. $\dfrac{${sci(md.F, 2)}}{10^{-5}} = ${dec(md.F / 1e-5, 2)}$, **towards A**.`,
  scheme: [['Forces from A and B opposite: 1.0 × 10⁻⁴ and 6.0 × 10⁻⁵ N m⁻¹', 1], ['Net 4.0 × 10⁻⁵ N m⁻¹ towards A', 1]],
  marks: 2, d: 4, c: 'analysis', t: [5],
}), (q) => near(q.answer.value * 1e-5, 2e-7 * 2 * (10 - 6) / 0.04) || 'md');
add('parallelB-ar', ar({
  a: 'A straight current-carrying wire experiences the largest magnetic force when it lies along the direction of a uniform magnetic field.',
  r: 'The force on a straight conductor of length l is BIl sin θ, where θ is the angle between the wire and the field.',
  key: 'd',
  sol: 'R is true. A is false: along the field θ = 0, so the force is zero; it is largest at θ = 90° — option (d).',
  d: 2, c: 'understanding', t: [5],
}));

// ================================================================ 5-mark questions (in parts)
const al = { N: 200, R: 0.1, I: 0.5, x: 0.24 };
al.Bc = (MU0 * al.N * al.I) / (2 * al.R);
al.Bx = (MU0 * al.N * al.I * al.R ** 2) / (2 * (al.R ** 2 + al.x ** 2) ** 1.5);
add('axis-long', long({
  stem: '(a) A flat circular coil of N turns and radius R carries a current I. Using the Biot–Savart law, obtain the magnetic field at a point on its axis a distance x from its centre. [3] (b) A coil of 200 turns and radius 10 cm carries 0.50 A. Find the field at its centre and at a point on its axis 24 cm from the centre. [2]',
  model: r`(a) An element $d\vec l$ is at distance $r = \sqrt{R^2 + x^2}$ from P and perpendicular to $\vec r$, so $dB = \dfrac{\mu_0}{4\pi}\dfrac{I\,dl}{R^2 + x^2}$, perpendicular to $\vec r$. Pairing elements at opposite ends of a diameter, the components **across the axis cancel**; the **axial** components $dB\sin\phi$ with $\sin\phi = R/r$ add. So $B = \dfrac{\mu_0IR}{4\pi r^3}\sum dl = \dfrac{\mu_0IR(2\pi R)}{4\pi r^3} = \dfrac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}$, and for N turns $B = \dfrac{\mu_0NIR^2}{2(R^2 + x^2)^{3/2}}$, along the axis.

(b) Centre: $B_0 = \dfrac{4\pi \times 10^{-7} \times 200 \times 0.50}{2 \times 0.10} = ${sci(al.Bc, 3)}$ T. At 24 cm: $\sqrt{R^2 + x^2} = \sqrt{0.010 + 0.0576} = 0.26$ m, so $B = B_0\left(\dfrac{0.10}{0.26}\right)^3 = ${sci(al.Bx, 3)}$ T.`,
  sol: 'Biot–Savart; cancel across the axis; numbers.',
  scheme: [['dB = μ₀I dl/4π(R² + x²), each element ⊥ r', 1], ['Cross-axis parts cancel; axial parts dB·R/r add', 1], ['B = μ₀NIR²/2(R² + x²)^(3/2)', 1], ['B₀ ≈ 6.28 × 10⁻⁴ T', 1], ['B ≈ 3.57 × 10⁻⁵ T at 24 cm', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(al.Bc, Bcoil(200, 0.5, 0.1)) && near(al.Bx, Bcoil(200, 0.5, 0.1) * (0.1 / 0.26) ** 3) || 'al');
const am = { I: 6, half: 0.06, a: 0.08, N: 500, L: 0.25, Is: 2, d: 0.01 };
am.s = am.half / Math.hypot(am.half, am.a);
am.Bf = ((MU0 * am.I) / (4 * Math.PI * am.a)) * 2 * am.s;
am.Bs = MU0 * (am.N / am.L) * am.Is;
am.Iw = (am.Bs * 2 * Math.PI * am.d) / MU0;
add('ampere-long', long({
  stem: '(a) State Ampere’s circuital law and use it to obtain the magnetic field at a distance r from a long straight wire carrying current I. [2] (b) A straight wire 12 cm long carries 6.0 A. Find the field at a point 8.0 cm from its midpoint, on its perpendicular bisector. [1] (c) A solenoid 25 cm long with 500 turns carries 2.0 A. Find the field near its middle, and the current a single long straight wire would need to produce a field of the same size 1.0 cm from it. [2]',
  model: r`(a) $\oint \vec B \cdot d\vec l = \mu_0I_{\text{enc}}$. On a circle of radius r centred on the wire, B is tangential and constant, so $B(2\pi r) = \mu_0I$ and $B = \dfrac{\mu_0I}{2\pi r}$.

(b) $\sin\alpha = \sin\beta = \dfrac{6.0}{10} = ${dec(am.s, 2)}$; $B = \dfrac{10^{-7} \times 6.0}{0.080} \times 1.2 = ${sci(am.Bf, 2)}$ T.

(c) $n = \dfrac{500}{0.25} = 2000$ m$^{-1}$; $B = \mu_0nI = 4\pi \times 10^{-7} \times 2000 \times 2.0 = ${sci(am.Bs, 3)}$ T. For the wire, $I = \dfrac{2\pi rB}{\mu_0} = \dfrac{2\pi \times 0.010 \times ${sci(am.Bs, 3)}}{4\pi \times 10^{-7}} \approx ${dec(am.Iw, 3)}$ A: a solenoid gives a strong field from a small current.`,
  sol: 'Ampere’s law; finite-wire formula; solenoid.',
  scheme: [['Statement of the law', 1], ['Circular loop: B = μ₀I/2πr', 1], ['Finite wire: 9.0 × 10⁻⁶ T', 1], ['Solenoid: 5.03 × 10⁻³ T', 1], ['Wire current ≈ 251 A', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(am.Bf, 9e-6) && near(am.Iw, 2 * Math.PI * 2000 * 2 * 0.01) || 'am');
const lz = { v: 2e7, B: 1.5e-3 };
lz.r = (ME * lz.v) / (QE * lz.B);
lz.T = (2 * Math.PI * ME) / (QE * lz.B);
lz.E = lz.v * lz.B;
add('lorentz-long', long({
  stem: '(a) A charge q moves with velocity v through a region containing both an electric field E and a magnetic field B. Write the total force on it in vector form and show that the magnetic part cannot alter its speed. [2] (b) Electrons travelling at 2.0 × 10⁷ m s⁻¹ are bent by a uniform magnetic field of 1.5 mT acting at right angles to the beam. Find the radius of their path and the time for one revolution. [2] (c) An electric field is now added so that the beam goes straight on. Find its size and say how it must be directed. [1] (mₑ = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)',
  model: r`(a) Lorentz force $\vec F = q(\vec E + \vec v \times \vec B)$. The magnetic part $q\vec v \times \vec B$ is perpendicular to $\vec v$, so its power $\vec F \cdot \vec v = 0$: it does no work, and the speed (kinetic energy) cannot change; only the direction does.

(b) $r = \dfrac{mv}{eB} = \dfrac{9.1 \times 10^{-31} \times 2.0 \times 10^{7}}{1.6 \times 10^{-19} \times 1.5 \times 10^{-3}} = ${sci(lz.r, 3)}$ m (about 7.6 cm); $T = \dfrac{2\pi m}{eB} = ${sci(lz.T, 3)}$ s.

(c) The net force must vanish: $\vec E = -\vec v \times \vec B$, of size $E = vB = 2.0 \times 10^{7} \times 1.5 \times 10^{-3} = ${sci(lz.E, 2)}$ V m$^{-1}$, perpendicular to both $\vec v$ and $\vec B$ (along $\vec B \times \vec v$), so that the electric force cancels the magnetic force.`,
  sol: 'Lorentz force; r and T; E = vB.',
  scheme: [['F = q(E + v × B)', 1], ['Magnetic part ⊥ v: no work, speed constant', 1], ['r ≈ 7.58 × 10⁻² m', 1], ['T ≈ 2.38 × 10⁻⁸ s', 1], ['E = vB = 3.0 × 10⁴ V m⁻¹, along B × v', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(lz.r, 0.07583) && near(lz.T, 2.382e-8) && near(lz.E, 3e4) || 'lz');
const pl = { IP: 50, r: 0.02, mpl: 2e-3, g: 9.8 };
pl.IQ = (pl.mpl * pl.g * 2 * Math.PI * pl.r) / (MU0 * pl.IP);
add('parallel-long', long({
  stem: '(a) Two long straight parallel conductors in vacuum, a distance r apart, carry currents I₁ and I₂. Find the force on a length l of one of them due to the other, and state when this force is attractive. [2] (b) Use your result to define the ampere. [1] (c) A long horizontal wire P carries 50 A. A second long wire Q, parallel to P and 2.0 cm directly below it, has a mass of 2.0 g per metre. What current in Q, and in which direction, would let the magnetic force support Q’s weight? Take g = 9.8 m s⁻². [2]',
  model: r`(a) P’s field at Q is $B = \dfrac{\mu_0I_1}{2\pi r}$, perpendicular to Q, so $F = BI_2l = \dfrac{\mu_0I_1I_2l}{2\pi r}$. The force is **attractive** when the currents are in the **same** direction (repulsive when opposite).

(b) One ampere is the steady current in each of two long, thin, parallel conductors 1 m apart in vacuum that produces a force of $2 \times 10^{-7}$ N per metre on each.

(c) Q must be pulled **up**, towards P, so its current is in the **same direction** as P’s. Per metre: $\dfrac{\mu_0I_PI_Q}{2\pi r} = (m/l)g$, so $I_Q = \dfrac{(m/l)g \times 2\pi r}{\mu_0I_P} = \dfrac{2.0 \times 10^{-3} \times 9.8 \times 0.020}{2 \times 10^{-7} \times 50} = ${dec(pl.IQ, 3)}$ A.`,
  sol: 'Force between currents; ampere; balance with the weight.',
  scheme: [['B = μ₀I₁/2πr; F = BI₂l', 1], ['F = μ₀I₁I₂l/2πr; attractive for like currents', 1], ['Definition of the ampere', 1], ['Balance μ₀I_PI_Q/2πr = (m/l)g', 1], ['I_Q ≈ 39.2 A, same direction as P', 1]],
  d: 4, c: 'analysis', t: [5], wl: null,
}), () => near((2e-7 * 50 * pl.IQ) / 0.02, 2e-3 * 9.8) && near(pl.IQ, 39.2) || 'pl');
const rl = { L: 0.25, m: 0.015, B: 0.3, I: 4 };
rl.F = rl.B * rl.I * rl.L;
rl.a = rl.F / rl.m;
add('rod-long', long({
  stem: '(a) Show that a straight conductor of length l carrying a current I at an angle θ to a uniform magnetic field B experiences a force of size BIl sin θ, and state its direction. [2] (b) A metal rod of mass 15 g rests across two smooth horizontal rails 25 cm apart, in a vertical magnetic field of 0.30 T. A current of 4.0 A flows through the rod from one rail to the other. Find the force on the rod and its initial acceleration. [2] (c) State what happens if the current is reversed. [1]',
  model: r`(a) The conductor holds $nAl$ free electrons drifting at $v_d$, each feeling $ev_dB\sin\theta$; the total is $nAle\,v_dB\sin\theta = BIl\sin\theta$ since $I = nAe v_d$. In vector form $\vec F = I\vec l \times \vec B$: perpendicular to both the conductor and the field.

(b) The rod is perpendicular to B: $F = BIl = 0.30 \times 4.0 \times 0.25 = ${dec(rl.F, 2)}$ N, horizontal and along the rails. $a = \dfrac{F}{m} = \dfrac{${dec(rl.F, 2)}}{0.015} = ${dec(rl.a, 2)}$ m s$^{-2}$.

(c) The force reverses ($\vec l$ reverses in $I\vec l \times \vec B$), so the rod is pushed the other way along the rails with the same size of force.`,
  sol: 'Sum over electrons; F = BIl; a = F/m; reversal.',
  scheme: [['Sum of forces on drifting electrons', 1], ['F = BIl sin θ, perpendicular to l and B', 1], ['F = 0.30 N', 1], ['a = 20 m s⁻²', 1], ['Reversed current: force reverses', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(rl.F, 0.3) && near(rl.a, 20) || 'rl');
