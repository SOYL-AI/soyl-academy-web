// ISC 12 Physics ch01 Electric Charges and Fields — question bank (ISC style: 1-mark objective items, 2- and 3-mark
// short answers, 5-mark questions in parts). Numbers are computed here and re-checked by the `check` functions.
import { mk, add, r, sci, dec, near, K, QE, ME } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const deg = (d) => (d * Math.PI) / 180;

// ================================================================ t01 charge
add('quant-mcq', mcq({
  stem: 'Which of these values could be the charge on an oil drop in a laboratory experiment?',
  right: '4.8 × 10⁻¹⁹ C',
  wrong: ['2.4 × 10⁻¹⁹ C', '1.0 × 10⁻¹⁹ C', '3.6 × 10⁻¹⁹ C'],
  sol: 'Only 4.8 × 10⁻¹⁹ C is a whole-number multiple of e = 1.6 × 10⁻¹⁹ C (n = 3); the others give n = 1.5, 0.625 and 2.25 — option (@K).',
  d: 1, c: 'understanding', t: [1],
}), () => near(4.8e-19 / QE, 3) || 'q');
add('silk-mcq', mcq({
  stem: 'A glass rod is rubbed with a silk cloth. The silk becomes negatively charged because',
  right: 'electrons move from the glass to the silk',
  wrong: ['protons move from the silk to the glass', 'negative charge is created in the silk by friction', 'electrons move from the silk to the glass'],
  sol: 'Rubbing transfers electrons; the silk gains them and the glass is left equally positive — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const comb = { Q: 4.8e-8 };
comb.n = comb.Q / QE;
add('comb-num', num({
  stem: 'A plastic comb drawn through dry hair acquires a charge of −4.8 × 10⁻⁸ C. How many extra electrons does it carry? Give the answer in units of 10¹¹.',
  value: Number(dec(comb.n / 1e11, 2)), tol: 0.02, unit: '× 10¹¹',
  sol: r`$n = \dfrac{|q|}{e} = \dfrac{4.8 \times 10^{-8}}{1.6 \times 10^{-19}} = ${sci(comb.n, 2)}$, i.e. $\dfrac{${sci(comb.n, 2)}}{10^{11}} = ${dec(comb.n / 1e11, 2)}$.`,
  scheme: [['n = q/e = 3.0 × 10¹¹', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(comb.n / 1e11, q.answer.value) || 'comb');
const ms = { Q: 1e-6 };
ms.n = ms.Q / QE;
ms.m = ms.n * ME;
add('mass-num', num({
  stem: 'A metal sphere is given a charge of −1.0 μC by adding electrons. By how much does its mass increase? Give the answer in units of 10⁻¹⁸ kg (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg.)',
  value: Number(dec(ms.m / 1e-18, 3)), tol: 0.03, unit: '× 10⁻¹⁸ kg',
  sol: r`$n = \dfrac{1.0 \times 10^{-6}}{1.6 \times 10^{-19}} = ${sci(ms.n, 3)}$; $\Delta m = nm_e = ${sci(ms.n, 3)} \times 9.1 \times 10^{-31} \approx ${sci(ms.m, 3)}$ kg, i.e. $\dfrac{${sci(ms.m, 3)}}{10^{-18}} = ${dec(ms.m / 1e-18, 3)}$.`,
  scheme: [['n = 6.25 × 10¹² electrons', 1], ['Δm ≈ 5.69 × 10⁻¹⁸ kg', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(ms.m / 1e-18, q.answer.value) || 'ms');
add('create-tf', tf({
  stem: 'When a glass rod is rubbed with silk, positive charge is created on the glass and negative charge on the silk.',
  key: 'f',
  sol: 'False. No charge is created: electrons are transferred from glass to silk, and the total charge stays zero (conservation of charge).',
  d: 1, c: 'understanding', t: [1],
}));
add('induction-mcq', mcq({
  stem: 'A positively charged rod is brought near (without touching) one end of an uncharged, insulated metal bar. The near end of the bar becomes',
  right: 'negatively charged, and the far end positively charged',
  wrong: ['positively charged, and the far end negatively charged', 'negatively charged, and the far end stays neutral', 'uncharged, because the rod does not touch it'],
  sol: 'Free electrons in the metal are attracted towards the rod, leaving the far end short of electrons — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('paper-short', short({
  marks: 2,
  stem: 'A charged plastic ruler picks up small bits of uncharged paper. Explain why.',
  model: 'The charged ruler **polarises** each bit of paper: charges in the paper shift slightly, so the side **nearer** the ruler carries charge **opposite** to the ruler’s and the far side the same charge. The attraction on the nearer charges is **stronger** (smaller distance) than the repulsion on the farther ones, so there is a **net attraction**.',
  sol: 'Polarisation; nearer charges attract more strongly.',
  scheme: [['Paper polarised: opposite charge on the near side', 1], ['Nearer attraction outweighs farther repulsion', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const sh = { q1: 8e-6, q2: -2e-6 };
sh.f = (sh.q1 + sh.q2) / 2;
sh.n = (sh.q1 - sh.f) / QE;
add('share-num', num({
  stem: 'Two identical small conducting spheres carry +8.0 μC and −2.0 μC. They are touched together and separated. How many electrons pass to the first sphere? Give the answer in units of 10¹³ (3 significant figures).',
  value: Number(dec(sh.n / 1e13, 3)), tol: 0.02, unit: '× 10¹³',
  sol: r`Total charge $= 8.0 - 2.0 = 6.0\ \mu$C, shared equally: each gets $+3.0\ \mu$C. The first sphere’s charge falls by $5.0\ \mu$C, so $n = \dfrac{5.0 \times 10^{-6}}{1.6 \times 10^{-19}} = ${sci(sh.n, 3)}$, i.e. $\dfrac{${sci(sh.n, 3)}}{10^{13}} = ${dec(sh.n / 1e13, 3)}$.`,
  scheme: [['Each sphere ends with +3.0 μC (conservation, symmetry)', 1], ['n = 5.0 μC/e ≈ 3.13 × 10¹³', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(sh.n / 1e13, q.answer.value) || 'sh');
add('coulomb-fill', fill({
  stem: 'The SI unit of electric charge, equal to one ampere second, is the ___.',
  acc: [['coulomb', 'C']],
  sol: 'The **coulomb** (C) = 1 A s.',
  d: 1, c: 'recall', t: [1],
}));

// ================================================================ t02 Coulomb's law
add('halve-mcq', mcq({
  stem: 'The separation between two point charges is halved and each charge is doubled. The force between them becomes',
  right: '16 times as large',
  wrong: ['4 times as large', '8 times as large', 'unchanged'],
  sol: 'F ∝ q₁q₂/r²: doubling both charges gives ×4, halving r gives ×4 more: ×16 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('water-mcq', mcq({
  stem: 'Two charges are moved, at the same separation, from air into water (dielectric constant 80). The force between them becomes',
  right: '1/80 of its value in air',
  wrong: ['80 times its value in air', '1/√80 of its value in air', 'unchanged, since the charges are unchanged'],
  sol: 'In a medium F_m = F/K; with K = 80 the force is divided by 80 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
const cf = (K * 3e-6 * 6e-6) / 0.3 ** 2;
add('force-num', num({
  stem: 'Find the force, in newtons, between point charges of +3.0 μC and +6.0 μC placed 30 cm apart in vacuum.',
  value: cf, tol: 0.02, unit: 'N',
  sol: r`$F = \dfrac{9 \times 10^{9} \times 3.0 \times 10^{-6} \times 6.0 \times 10^{-6}}{(0.30)^2} = ${dec(cf, 2)}$ N (repulsive).`,
  scheme: [['F = kq₁q₂/r² = 1.8 N', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(cf, 1.8) && near(q.answer.value, 1.8) || 'cf');
const rd = Math.sqrt((K * (2e-6) ** 2) / 0.9);
add('sep-num', num({
  stem: 'Two equal point charges of 2.0 μC each repel each other with a force of 0.90 N in air. How far apart are they, in metres?',
  value: Number(dec(rd, 2)), tol: 0.003, unit: 'm',
  sol: r`$r = \sqrt{\dfrac{kq^2}{F}} = \sqrt{\dfrac{9 \times 10^{9} \times (2.0 \times 10^{-6})^2}{0.90}} = \sqrt{0.040} = ${dec(rd, 2)}$ m.`,
  scheme: [['Rearrange: r² = kq²/F', 1], ['r = 0.20 m', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(rd, 0.2) && near(q.answer.value, 0.2) || 'rd');
add('Kfind-num', num({
  stem: 'Two charges at a fixed separation attract each other with a force of 12 N in air. When the space between them is filled with an oil, the force becomes 1.5 N. Find the dielectric constant of the oil.',
  value: 8, tol: 0.05, unit: '',
  sol: r`$K = \dfrac{F_\text{air}}{F_\text{oil}} = \dfrac{12}{1.5} = 8.0$.`,
  scheme: [['F_m = F/K', 1], ['K = 8.0', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}));
add('medium-ar', ar({
  a: 'The Coulomb force between two point charges is independent of the medium between them.',
  r: 'Coulomb’s law is an inverse-square law.',
  key: 'd',
  sol: 'R is true. A is false: in a medium of dielectric constant K the force is reduced to F/K — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('unequal-tf', tf({
  stem: 'A charge of +1 μC and a charge of +5 μC repel each other; the force on the +5 μC charge is five times the force on the +1 μC charge.',
  key: 'f',
  sol: 'False. The forces form an action–reaction pair: equal in size and opposite in direction (F₁₂ = −F₂₁), whatever the charges.',
  d: 1, c: 'understanding', t: [2],
}));
add('vector-short', short({
  marks: 2,
  stem: 'Write Coulomb’s law in vector form for the force on q₂ due to q₁, and use it to show that the forces the two charges exert on each other are equal and opposite.',
  model: r`$\vec F_{12} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}\hat r_{12}$, where $\hat r_{12}$ is the unit vector from $q_1$ to $q_2$. Similarly $\vec F_{21} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}\hat r_{21}$. Since $\hat r_{21} = -\hat r_{12}$, $\vec F_{21} = -\vec F_{12}$: equal and opposite.`,
  sol: 'Unit vectors are opposite.',
  scheme: [['Vector form with unit vector defined', 1], ['r̂₂₁ = −r̂₁₂ gives F₂₁ = −F₁₂', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));
add('gravity-short3', short({
  marks: 3,
  stem: 'Give one similarity and two differences between Coulomb’s law of electrostatic force and Newton’s law of gravitation.',
  model: '**Similarity:** both forces are **inverse-square** and **central** (act along the line joining the two bodies), and both obey Newton’s third law. **Differences:** (1) the electric force can be **attractive or repulsive**, gravity is **always attractive**; (2) the electric force **depends on the medium** (reduced by K), gravity does not; (3) the electric force is enormously **stronger** (about 10³⁶ times between two protons).',
  sol: 'Inverse square; sign, medium, strength.',
  scheme: [['One similarity', 1], ['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const ep = (K * QE * QE) / (6.67e-11 * ME * 1.67e-27);
add('ep-num', num({
  stem: 'Find the ratio of the electrostatic attraction to the gravitational attraction between an electron and a proton (independent of their separation). Give the answer in units of 10³⁹ (3 significant figures). (mₑ = 9.1 × 10⁻³¹ kg, m_p = 1.67 × 10⁻²⁷ kg, G = 6.67 × 10⁻¹¹ N m² kg⁻².)',
  value: Number(dec(ep / 1e39, 3)), tol: 0.03, unit: '× 10³⁹',
  sol: r`$\dfrac{F_e}{F_g} = \dfrac{ke^2}{Gm_em_p} = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{6.67 \times 10^{-11} \times 9.1 \times 10^{-31} \times 1.67 \times 10^{-27}} \approx ${sci(ep, 3)}$, i.e. $\dfrac{${sci(ep, 3)}}{10^{39}} = ${dec(ep / 1e39, 3)}$.`,
  scheme: [['Ratio ke²/(G mₑ m_p), r cancels', 1], ['≈ 2.27 × 10³⁹', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(ep / 1e39, q.answer.value) || `ep ${ep}`);
const eq = { q1: 1, q2: 4, d: 0.6 };
eq.x = eq.d / (1 + Math.sqrt(eq.q2 / eq.q1));
add('eqbm-num', num({
  stem: 'Point charges +q and +4q are fixed 60 cm apart. At what distance from +q, in metres, must a third charge be placed on the line joining them so that the net force on it is zero?',
  value: Number(dec(eq.x, 2)), tol: 0.003, unit: 'm',
  sol: r`Between the charges, at $x$ from $+q$: $\dfrac{kqQ}{x^2} = \dfrac{k(4q)Q}{(0.60 - x)^2}$, so $\dfrac{0.60 - x}{x} = 2$ and $x = \dfrac{0.60}{3} = ${dec(eq.x, 2)}$ m (whatever the sign of the third charge).`,
  scheme: [['Equal and opposite forces: (0.60 − x)/x = √4', 1], ['x = 0.20 m', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2, 3],
}), (q) => near(eq.x, 0.2) && near(q.answer.value, 0.2) || 'eq');

// ================================================================ t03 superposition
const tri = { F: (K * 1e-6 * 1e-6) / 0.1 ** 2 };
tri.Fnet = 2 * tri.F * Math.cos(deg(30));
add('triangle-num', num({
  stem: 'Three charges of +1.0 μC each sit at the corners of an equilateral triangle of side 10 cm. Find the net force on any one of them, in newtons (3 significant figures).',
  value: Number(dec(tri.Fnet, 3)), tol: 0.02, unit: 'N',
  sol: r`Each pair: $F = \dfrac{9 \times 10^{9} \times (1.0 \times 10^{-6})^2}{(0.10)^2} = ${dec(tri.F, 2)}$ N; the two forces on one charge are 60° apart, so $F_\text{net} = 2F\cos 30° = 2 \times ${dec(tri.F, 2)} \times 0.866 \approx ${dec(tri.Fnet, 3)}$ N, along the bisector away from the triangle.`,
  scheme: [['Each force 0.90 N', 1], ['F_net = 2F cos 30° ≈ 1.56 N', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(tri.Fnet, q.answer.value) || 'tri');
const ln = { F1: (K * 2e-6 * 1e-6) / 0.2 ** 2, F2: (K * 3e-6 * 1e-6) / 0.1 ** 2 };
ln.net = ln.F2 - ln.F1;
add('line-num', num({
  stem: 'Charges of +2.0 μC, −3.0 μC and +1.0 μC lie on a straight line at x = 0, x = 10 cm and x = 20 cm respectively. Find the size of the net force on the +1.0 μC charge, in newtons.',
  value: Number(dec(ln.net, 3)), tol: 0.02, unit: 'N',
  sol: r`From +2.0 μC (0.20 m away): $\dfrac{9 \times 10^{9} \times 2 \times 10^{-12}}{0.04} = ${dec(ln.F1, 2)}$ N towards +x. From −3.0 μC (0.10 m away): $\dfrac{9 \times 10^{9} \times 3 \times 10^{-12}}{0.01} = ${dec(ln.F2, 2)}$ N towards −x. Net $= ${dec(ln.F2, 2)} - ${dec(ln.F1, 2)} = ${dec(ln.net, 3)}$ N, towards the −3.0 μC charge.`,
  scheme: [['Both forces with directions', 1], ['Net 2.25 N towards −x', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(ln.net, 2.25) && near(q.answer.value, 2.25) || 'ln');
add('principle-mcq', mcq({
  stem: 'According to the superposition principle for electrostatic forces, the force between two given charges',
  right: 'is unaffected by the presence of other charges nearby',
  wrong: ['decreases when other charges are brought nearby', 'increases when other charges are brought nearby', 'depends on the total charge of all the bodies present'],
  sol: 'Each pair interacts independently; the net force on a charge is the vector sum of these pair forces — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const rs = { F: (K * 2e-6 * 1e-6) / 0.1 ** 2 };
rs.net = Math.SQRT2 * rs.F;
add('rightangle-short3', short({
  marks: 3,
  stem: 'A charge of +1.0 μC is at the origin. Charges of +2.0 μC are placed at (−10 cm, 0) and at (0, −10 cm). Find the size and direction of the net force on the +1.0 μC charge.',
  model: r`Each +2.0 μC charge repels the origin charge with $F = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-6} \times 1.0 \times 10^{-6}}{(0.10)^2} = ${dec(rs.F, 2)}$ N: one along +x, the other along +y. They are perpendicular, so $F_\text{net} = \sqrt{2} \times ${dec(rs.F, 2)} \approx ${dec(rs.net, 3)}$ N, at 45° to the +x axis (between +x and +y), pointing away from both charges.`,
  sol: 'Two equal perpendicular forces.',
  scheme: [['Each force 1.8 N with direction', 1], ['Perpendicular: F = √2 × 1.8', 1], ['≈ 2.55 N at 45° between +x and +y', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(rs.net, 2.546) || 'rs');
add('square-mcq', mcq({
  stem: 'Four equal positive charges sit at the corners of a square and a fifth positive charge sits at its centre. If the charge at one corner is removed, the net force on the central charge',
  right: 'points from the centre towards the empty corner, and equals the force that the opposite corner charge exerts',
  wrong: ['remains zero', 'points from the empty corner towards the centre', 'equals the sum of the forces from the three remaining charges'],
  sol: 'With all four present the forces cancel in opposite pairs. Removing one leaves the opposite corner’s repulsion unbalanced, pushing the centre charge towards the empty corner — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));

// ================================================================ t04 electric field and charge densities
const ept = (K * 4e-9) / 0.03 ** 2;
add('Epoint-num', num({
  stem: 'Find the electric field 3.0 cm from a point charge of +4.0 nC, in units of 10⁴ N C⁻¹.',
  value: Number(dec(ept / 1e4, 2)), tol: 0.02, unit: '× 10⁴ N C⁻¹',
  sol: r`$E = \dfrac{kq}{r^2} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{(0.030)^2} = ${sci(ept, 2)}$ N C$^{-1}$, i.e. $\dfrac{${sci(ept, 2)}}{10^{4}} = ${dec(ept / 1e4, 2)}$.`,
  scheme: [['E = kq/r² = 4.0 × 10⁴ N C⁻¹', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(ept / 1e4, q.answer.value) || 'ept');
const ac = { E: 2e4 };
ac.a = (QE * ac.E) / ME;
add('accel-num', num({
  stem: 'An electron is released in a uniform electric field of 2.0 × 10⁴ N C⁻¹. Find its acceleration, in units of 10¹⁵ m s⁻² (3 significant figures).',
  value: Number(dec(ac.a / 1e15, 3)), tol: 0.03, unit: '× 10¹⁵ m s⁻²',
  sol: r`$F = eE = 1.6 \times 10^{-19} \times 2.0 \times 10^{4} = 3.2 \times 10^{-15}$ N; $a = \dfrac{F}{m} = \dfrac{3.2 \times 10^{-15}}{9.1 \times 10^{-31}} \approx ${sci(ac.a, 3)}$ m s$^{-2}$, i.e. $\dfrac{${sci(ac.a, 3)}}{10^{15}} = ${dec(ac.a / 1e15, 3)}$, opposite to E.`,
  scheme: [['F = eE = 3.2 × 10⁻¹⁵ N', 1], ['a ≈ 3.52 × 10¹⁵ m s⁻², opposite to E', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(ac.a / 1e15, q.answer.value) || 'ac');
const np = { q1: 9, q2: 1, d: 0.4 };
np.x = (np.d * Math.sqrt(np.q1)) / (Math.sqrt(np.q1) + Math.sqrt(np.q2));
add('null-num', num({
  stem: 'Point charges of +9.0 nC and +1.0 nC are 40 cm apart. How far from the +9.0 nC charge, in metres, is the point between them where the electric field is zero?',
  value: Number(dec(np.x, 2)), tol: 0.003, unit: 'm',
  sol: r`$\dfrac{9}{x^2} = \dfrac{1}{(0.40 - x)^2} \Rightarrow \dfrac{x}{0.40 - x} = 3 \Rightarrow x = \dfrac{3 \times 0.40}{4} = ${dec(np.x, 2)}$ m.`,
  scheme: [['Equal fields: x/(0.40 − x) = √9', 1], ['x = 0.30 m', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(np.x, 0.3) && near(q.answer.value, 0.3) || 'np');
add('unlikenull-mcq', mcq({
  stem: 'Charges +4q and −q are fixed a distance d apart. The point on the line through them where the electric field is zero lies',
  right: 'outside the pair, on the side of −q, at a distance d from −q',
  wrong: ['between the charges, nearer to −q', 'between the charges, at the midpoint', 'outside the pair, on the side of +4q'],
  sol: 'Between unlike charges the fields add, so E = 0 must lie outside, nearer the smaller charge: 4/(x + d)² = 1/x² gives x = d beyond −q — option (@K).',
  d: 4, c: 'analysis', t: [4],
}), () => near(4 / (2 * 2), 1 / 1) || 'un');
add('sigma-fill', fill({
  stem: 'Surface charge density is measured in coulomb per square ___.',
  acc: [['metre', 'meter', 'm']],
  sol: 'Coulomb per square **metre** (C m⁻²).',
  d: 1, c: 'recall', t: [4],
}));
const lam = 2e-6 / 0.5;
add('lambda-num', num({
  stem: 'A thin rod 50 cm long carries a charge of 2.0 μC spread uniformly along it. Find its linear charge density, in μC m⁻¹.',
  value: lam * 1e6, tol: 0.02, unit: 'μC m⁻¹',
  sol: r`$\lambda = \dfrac{q}{l} = \dfrac{2.0}{0.50} = ${dec(lam * 1e6, 2)}\ \mu$C m$^{-1}$.`,
  scheme: [['λ = q/l = 4.0 μC m⁻¹', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(lam * 1e6, 4) || 'lam');
add('unitE-mcq', mcq({
  stem: 'The SI unit N C⁻¹ of electric field is equivalent to',
  right: 'V m⁻¹',
  wrong: ['V m', 'J C', 'C m⁻¹'],
  sol: '1 N C⁻¹ = 1 J m⁻¹ C⁻¹ = 1 V m⁻¹ — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('testcharge-short', short({
  marks: 2,
  stem: 'Define the electric field at a point. Why must the test charge used to measure it be very small?',
  model: 'The electric field at a point is the **force per unit positive test charge** placed there: $\\vec E = \\vec F/q_0$ (in the limit $q_0 \\to 0$). The test charge must be **very small** so that it does **not disturb** the charges that produce the field; a large test charge would push or pull them and change the field being measured.',
  sol: 'F/q₀; small q₀ does not disturb sources.',
  scheme: [['Definition E = F/q₀', 1], ['Small q₀ so the source charges are undisturbed', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const od = { m: 3.2e-15, g: 9.8, E: 9.8e4 };
od.q = (od.m * od.g) / od.E;
od.n = od.q / QE;
add('drop-num', num({
  stem: 'A negatively charged oil drop of mass 3.2 × 10⁻¹⁵ kg is held stationary between two horizontal plates by a downward electric field of 9.8 × 10⁴ N C⁻¹. How many excess electrons does the drop carry? (g = 9.8 m s⁻².)',
  value: Math.round(od.n), tol: 0.1, unit: '',
  sol: r`For balance $qE = mg$: $q = \dfrac{3.2 \times 10^{-15} \times 9.8}{9.8 \times 10^{4}} = 3.2 \times 10^{-19}$ C; $n = \dfrac{3.2 \times 10^{-19}}{1.6 \times 10^{-19}} = ${dec(od.n, 2)}$.`,
  scheme: [['qE = mg gives q = 3.2 × 10⁻¹⁹ C', 1], ['n = 2', 1]],
  marks: 2, d: 3, c: 'application', t: [1, 4],
}), (q) => near(od.n, 2) && q.answer.value === 2 || `od ${od.n}`);
const pb = { m: 1.67e-27, g: 9.8 };
pb.E = (pb.m * pb.g) / QE;
add('proton-short3', short({
  marks: 3,
  stem: 'Find the size and direction of the electric field that would hold a proton at rest against its weight near the Earth’s surface, and comment on how this field compares with everyday fields such as the 100 N C⁻¹ near the ground. (m_p = 1.67 × 10⁻²⁷ kg, g = 9.8 m s⁻².)',
  model: r`For balance $eE = m_pg$, so $E = \dfrac{1.67 \times 10^{-27} \times 9.8}{1.6 \times 10^{-19}} \approx ${sci(pb.E, 3)}$ N C$^{-1}$, directed **vertically upwards** (force on a positive charge is along E). This is about $10^{9}$ times **smaller** than the field near the ground, showing that gravity on charged particles is usually **negligible** compared with electric forces.`,
  sol: 'eE = mg.',
  scheme: [['eE = m_p g', 1], ['E ≈ 1.02 × 10⁻⁷ N C⁻¹ upwards', 1], ['Comment: gravity negligible for charged particles', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(pb.E, 1.02e-7) || `pb ${pb.E}`);

// ================================================================ t05 field lines
add('cross-ar', ar({
  a: 'Two electric lines of force never intersect each other.',
  r: 'At any point the electric field has a single, definite direction.',
  key: 'a',
  sol: 'Both true, and R explains A: at a crossing the tangents would give two directions for E at one point — option (a).',
  d: 1, c: 'understanding', t: [5],
}));
add('straight-ar', ar({
  a: 'Electric lines of force are crowded together where the field is strong.',
  r: 'Electric lines of force are always straight lines.',
  key: 'c',
  sol: 'A is true: line density shows field strength. R is false: field lines curve in general (for example, those of a dipole) — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('plates-mcq', mcq({
  stem: 'Well away from the edges, the electric field between two large, oppositely charged parallel plates is',
  right: 'uniform: field lines straight, parallel and equally spaced',
  wrong: ['strongest near the positive plate', 'zero', 'radial, spreading out from the positive plate'],
  sol: 'Between large parallel plates the field has the same size and direction everywhere, except near the edges (fringing) — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('path-tf', tf({
  stem: 'A small positive charge released from rest in any electrostatic field always moves along the field line through its starting point.',
  key: 'f',
  sol: 'False. It starts moving along the field line, but on a curved line its inertia carries it off the line; it follows a field line only if the line is straight.',
  d: 3, c: 'understanding', t: [5],
}));
add('patterns-short3', short({
  marks: 3,
  stem: 'Sketch (describe in words) the field-line patterns for (a) an electric dipole, (b) two equal positive charges, (c) two large oppositely charged parallel plates, stating one feature of each.',
  model: '(a) **Dipole:** lines leave +q, curve round and end on −q; they are most crowded between the charges. (b) **Two equal positive charges:** lines from each bend **away** from the other; there is a **neutral point** midway where no line passes (E = 0). (c) **Parallel plates:** lines are **straight, parallel and equally spaced** from the + plate to the − plate (uniform field), bulging only at the edges.',
  sol: 'Three patterns with a feature each.',
  scheme: [['Dipole pattern', 1], ['Like charges with neutral point', 1], ['Uniform field between plates', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('lineprops-short', short({
  marks: 2,
  stem: 'State four properties of electric lines of force.',
  model: 'Any four: they **start on positive** and **end on negative** charges; the **tangent** at a point gives the direction of E; **two lines never intersect**; they are **closer together** where the field is stronger; electrostatic lines **never form closed loops**; they meet a conductor’s surface **at right angles**.',
  sol: 'Four properties.',
  scheme: [['Two properties', 1], ['Two more properties', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('neutral-short', short({
  marks: 2,
  stem: 'Explain why there is a neutral point between two equal positive charges but not between a positive and a negative charge.',
  model: 'Between two **positive** charges their fields point in **opposite** directions (each away from its own charge), so at the midpoint they **cancel**: a neutral point. Between **unlike** charges both fields point the **same** way (from + towards −), so they **add** everywhere between them and can never cancel there.',
  sol: 'Opposite vs same direction between the charges.',
  scheme: [['Like charges: fields opposite, cancel midway', 1], ['Unlike charges: fields add between them', 1]],
  d: 2, c: 'understanding', t: [4, 5],
}));

// ================================================================ t06 electric dipole
add('ratio-mcq', mcq({
  stem: 'For a short electric dipole, the ratio of the field at a point on its axis to the field at a point on its equatorial line, both at the same distance from the centre, is',
  right: '2 : 1',
  wrong: ['1 : 2', '1 : 1', '4 : 1'],
  sol: 'E_axial = 2kp/r³ and E_eq = kp/r³ — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('pdir-mcq', mcq({
  stem: 'The dipole moment of an electric dipole is directed',
  right: 'from the negative charge to the positive charge',
  wrong: ['from the positive charge to the negative charge', 'along the perpendicular bisector of the dipole', 'opposite to the field at an axial point'],
  sol: 'By convention p = q × 2a points from −q to +q — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('eqdir-mcq', mcq({
  stem: 'At a point on the equatorial line of an electric dipole, the electric field is',
  right: 'parallel to the dipole axis and opposite in direction to the dipole moment',
  wrong: ['along the dipole moment', 'along the equatorial line, away from the dipole', 'zero, since the point is equidistant from both charges'],
  sol: 'The components along the bisector cancel; those parallel to the axis add, pointing from +q towards −q, i.e. opposite to p — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
const dpn = { q: 3e-9, d: 2e-3, r: 0.1 };
dpn.p = dpn.q * dpn.d;
dpn.E = (2 * K * dpn.p) / dpn.r ** 3;
add('axial-num', num({
  stem: 'A dipole consists of charges ±3.0 nC separated by 2.0 mm. Find the electric field on its axis 10 cm from its centre, in N C⁻¹.',
  value: Number(dec(dpn.E, 3)), tol: 1, unit: 'N C⁻¹',
  sol: r`$p = 3.0 \times 10^{-9} \times 2.0 \times 10^{-3} = ${sci(dpn.p, 2)}$ C m. Since $r \gg a$: $E = \dfrac{2kp}{r^3} = \dfrac{2 \times 9 \times 10^{9} \times ${sci(dpn.p, 2)}}{(0.10)^3} = ${dec(dpn.E, 3)}$ N C$^{-1}$, along p.`,
  scheme: [['p = 6.0 × 10⁻¹² C m', 1], ['E = 2kp/r³ = 108 N C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => near(dpn.E, 108) && near(q.answer.value, 108) || 'dpn');
const eqn = (K * 4e-10) / 0.15 ** 3;
add('equatorial-num', num({
  stem: 'A short dipole has a moment of 4.0 × 10⁻¹⁰ C m. Find the field on its equatorial line 15 cm from its centre, in N C⁻¹ (3 significant figures).',
  value: Number(dec(eqn, 3)), tol: 5, unit: 'N C⁻¹',
  sol: r`$E = \dfrac{kp}{r^3} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-10}}{(0.15)^3} \approx ${dec(eqn, 4)}$ N C$^{-1}$, opposite to p.`,
  scheme: [['E = kp/r³ ≈ 1070 N C⁻¹, opposite to p', 1]],
  d: 2, c: 'understanding', t: [6],
}), (q) => near(eqn, q.answer.value) || 'eqn');
add('double-mcq', mcq({
  stem: 'The distance from the centre of a short dipole to a point on its axis is doubled. The field at that point becomes',
  right: 'one eighth as large',
  wrong: ['one quarter as large', 'half as large', 'one sixteenth as large'],
  sol: 'E ∝ 1/r³ for a dipole far away; doubling r divides E by 8 — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('axial-short3', short({
  marks: 3,
  stem: 'Derive an expression for the electric field at a point on the axial line of an electric dipole, and simplify it for a point far from the dipole.',
  model: r`Let −q be at A and +q at B, distance $2a$ apart, and P on the axis at distance $r$ from the centre O, beyond B. Field of +q at P: $E_+ = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{(r - a)^2}$, along BP (along p). Field of −q: $E_- = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{(r + a)^2}$, towards A. Net: $E = \dfrac{q}{4\pi\varepsilon_0}\left[\dfrac{1}{(r - a)^2} - \dfrac{1}{(r + a)^2}\right] = \dfrac{1}{4\pi\varepsilon_0}\dfrac{4qar}{(r^2 - a^2)^2} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2pr}{(r^2 - a^2)^2}$, along p. For $r \gg a$: $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{r^3}$.`,
  sol: 'Subtract the two point-charge fields.',
  scheme: [['Fields of +q and −q with directions', 1], ['Net 2pr/[4πε₀(r² − a²)²]', 1], ['Short-dipole limit 2p/(4πε₀r³)', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
add('equatorial-short3', short({
  marks: 3,
  stem: 'Derive an expression for the electric field at a point on the equatorial line of an electric dipole, and state its direction.',
  model: r`Let Q be on the perpendicular bisector at distance $r$ from the centre; each charge is $\sqrt{r^2 + a^2}$ away, so $E_+ = E_- = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2 + a^2}$. Their components along the bisector cancel; the components parallel to the axis add: $E = 2E_+\cos\theta$, with $\cos\theta = \dfrac{a}{\sqrt{r^2 + a^2}}$. So $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2qa}{(r^2 + a^2)^{3/2}} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{(r^2 + a^2)^{3/2}}$, directed **opposite to p** (from +q towards −q). For $r \gg a$: $E = \dfrac{p}{4\pi\varepsilon_0 r^3}$.`,
  sol: 'Resolve; perpendicular parts cancel.',
  scheme: [['Equal fields, cancellation of perpendicular components', 1], ['E = p/[4πε₀(r² + a²)^(3/2)]', 1], ['Direction opposite to p; short-dipole form', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
add('close-num', num({
  stem: 'For an electric dipole of half-length a, find the ratio of the exact field on its axis at r = 2a to the value given by the short-dipole formula 2p/(4πε₀r³) (3 significant figures).',
  value: Number(dec(16 / 9, 3)), tol: 0.01, unit: '',
  sol: r`$\dfrac{E_\text{exact}}{E_\text{short}} = \dfrac{2pr/(r^2 - a^2)^2}{2p/r^3} = \dfrac{r^4}{(r^2 - a^2)^2} = \dfrac{16a^4}{(4a^2 - a^2)^2} = \dfrac{16}{9} = ${dec(16 / 9, 3)}$.`,
  scheme: [['Ratio r⁴/(r² − a²)²', 1], ['= 16/9 ≈ 1.78', 1]],
  marks: 2, d: 4, c: 'analysis', t: [6],
}));
const hcl = { p: 3.4e-30, d: 1.27e-10 };
hcl.q = hcl.p / hcl.d;
hcl.f = hcl.q / QE;
add('hcl-mcq', mcq({
  stem: 'An HCl molecule has a dipole moment of 3.4 × 10⁻³⁰ C m and a bond length of 1.27 × 10⁻¹⁰ m. Treating it as two point charges ±q at the ends of the bond, q is about',
  right: '0.17e',
  wrong: ['1.0e', '0.017e', '1.7e'],
  sol: 'q = p/d = 3.4 × 10⁻³⁰/1.27 × 10⁻¹⁰ ≈ 2.7 × 10⁻²⁰ C ≈ 0.17e: the electrons are only partly shifted towards chlorine — option (@K).',
  d: 3, c: 'application', t: [6],
}), () => near(hcl.f, 0.167) || `hcl ${hcl.f}`);

// ================================================================ t07 dipole in a uniform field
add('uniform-tf', tf({
  stem: 'An electric dipole placed at an angle to a uniform electric field experiences a torque but no net force.',
  key: 't',
  sol: 'True. The forces +qE and −qE are equal and opposite (zero net force) but act at different points, forming a couple of torque pE sin θ.',
  d: 1, c: 'understanding', t: [7],
}));
const tq = { p: 4e-9, E: 2e5, th: 60 };
tq.tau = tq.p * tq.E * Math.sin(deg(tq.th));
add('tau-num', num({
  stem: 'A dipole of moment 4.0 × 10⁻⁹ C m makes an angle of 60° with a uniform field of 2.0 × 10⁵ N C⁻¹. Find the torque on it, in units of 10⁻⁴ N m (3 significant figures).',
  value: Number(dec(tq.tau / 1e-4, 3)), tol: 0.03, unit: '× 10⁻⁴ N m',
  sol: r`$\tau = pE\sin\theta = 4.0 \times 10^{-9} \times 2.0 \times 10^{5} \times \sin 60° \approx ${sci(tq.tau, 3)}$ N m, i.e. $\dfrac{${sci(tq.tau, 3)}}{10^{-4}} = ${dec(tq.tau / 1e-4, 3)}$.`,
  scheme: [['τ = pE sin θ', 1], ['≈ 6.93 × 10⁻⁴ N m', 1]],
  marks: 2, d: 2, c: 'application', t: [7],
}), (q) => near(tq.tau / 1e-4, q.answer.value) || 'tq');
add('maxtau-mcq', mcq({
  stem: 'The torque on an electric dipole in a uniform electric field is greatest when the dipole moment makes an angle with the field of',
  right: '90°',
  wrong: ['0°', '45°', '180°'],
  sol: 'τ = pE sin θ is largest when sin θ = 1 — option (@K).',
  d: 1, c: 'understanding', t: [7],
}));
add('stable-mcq', mcq({
  stem: 'A dipole free to rotate in a uniform electric field comes to rest in stable equilibrium when its dipole moment is',
  right: 'parallel to the field',
  wrong: ['antiparallel to the field', 'perpendicular to the field', 'at 45° to the field'],
  sol: 'At θ = 0 the torque is zero and a small twist produces a torque back towards the field: stable. At 180° the torque is also zero but the equilibrium is unstable — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
const fp = { tau: 9e-5, E: 3e4, th: 30, d: 2e-3 };
fp.p = fp.tau / (fp.E * Math.sin(deg(fp.th)));
fp.q = fp.p / fp.d;
add('charge-num', num({
  stem: 'A dipole whose charges are 2.0 mm apart experiences a torque of 9.0 × 10⁻⁵ N m when its axis is at 30° to a uniform field of 3.0 × 10⁴ N C⁻¹. Find the size of each charge, in μC.',
  value: Number(dec(fp.q * 1e6, 2)), tol: 0.03, unit: 'μC',
  sol: r`$p = \dfrac{\tau}{E\sin\theta} = \dfrac{9.0 \times 10^{-5}}{3.0 \times 10^{4} \times 0.5} = ${sci(fp.p, 2)}$ C m; $q = \dfrac{p}{2a} = \dfrac{${sci(fp.p, 2)}}{2.0 \times 10^{-3}} = ${sci(fp.q, 2)}$ C, i.e. $${sci(fp.q, 2)} \times 10^{6} = ${dec(fp.q * 1e6, 2)}\ \mu$C.`,
  scheme: [['p = τ/(E sin θ) = 6.0 × 10⁻⁹ C m', 1], ['q = 3.0 μC', 1]],
  marks: 2, d: 3, c: 'application', t: [7],
}), (q) => near(fp.q * 1e6, 3) && near(q.answer.value, 3) || 'fp');
add('nonuniform-ar', ar({
  a: 'An electric dipole placed in a non-uniform electric field may experience a net force as well as a torque.',
  r: 'In a non-uniform field the forces on the two charges of the dipole are, in general, unequal.',
  key: 'a',
  sol: 'Both true, and R explains A: unequal forces +qE₁ and −qE₂ leave a net force — option (a).',
  d: 2, c: 'understanding', t: [7],
}));
add('torque-short3', short({
  marks: 3,
  stem: 'Derive an expression for the torque acting on an electric dipole placed at an angle θ to a uniform electric field E. Write it in vector form and state the directions of maximum and zero torque.',
  model: r`Forces: $+qE$ on +q along E and $-qE$ on −q opposite to E; they are equal and opposite, so the **net force is zero**, but they form a **couple**. Perpendicular distance between their lines of action $= 2a\sin\theta$. Torque $\tau = qE \times 2a\sin\theta = pE\sin\theta$; in vector form $\vec\tau = \vec p \times \vec E$. It is **maximum** ($pE$) at θ = 90° and **zero** at θ = 0° and 180°.`,
  sol: 'Couple of forces qE at arm 2a sin θ.',
  scheme: [['Equal and opposite forces: couple, zero net force', 1], ['τ = qE·2a sin θ = pE sin θ', 1], ['τ = p × E; max at 90°, zero at 0°/180°', 1]],
  d: 3, c: 'understanding', t: [7], wl: null,
}));
add('nonuni-short', short({
  marks: 2,
  stem: 'A small dipole is placed near a positive point charge with its moment pointing directly away from the charge. Describe its subsequent motion.',
  model: 'The field of the point charge is **non-uniform**: stronger nearer the charge. The −q end is nearer, so the **attractive** force on it is **greater** than the repulsion on the +q end; the dipole feels a **net force towards** the point charge. With p along E there is **no torque**, so it moves towards the charge without rotating.',
  sol: 'Non-uniform field: net force; aligned so no torque.',
  scheme: [['Unequal forces: net attraction towards the charge', 1], ['No torque since p is along E', 1]],
  d: 3, c: 'analysis', t: [7], wl: null,
}));
add('units-match', match({
  stem: 'Match each electrostatic quantity in Column A with its SI unit in Column B.',
  pairs: [['Electric dipole moment', 'C m'], ['Electric field strength', 'N C⁻¹'], ['Linear charge density', 'C m⁻¹'], ['Permittivity of free space', 'C² N⁻¹ m⁻²']],
  order: [2, 0, 3, 1],
  sol: 'Dipole moment → C m (1 → r); field → N C⁻¹ (2 → p); linear charge density → C m⁻¹ (3 → s); permittivity → C² N⁻¹ m⁻² (4 → q).',
  d: 1, c: 'recall', t: [2, 4, 6],
}));
add('salt-short', short({
  marks: 2,
  stem: 'Common salt dissolves readily in water but hardly at all in kerosene. Use Coulomb’s law in a medium to explain this.',
  model: 'Na⁺ and Cl⁻ ions are held by **electrostatic attraction**, which a medium divides by its **dielectric constant K**. In water (K ≈ 80) the force falls to about **1/80**, so thermal motion separates the ions; in kerosene (K ≈ 2) the force stays **large** and the crystal survives.',
  sol: 'F/K with K(water) ≈ 80.',
  scheme: [['Ionic attraction reduced to F/K', 1], ['Water K ≈ 80 vs kerosene K ≈ 2', 1]],
  d: 2, c: 'application', t: [2],
}));

// ================================================================ 5-mark questions (in parts)
const lt = { F: (K * 2e-6 * 2e-6) / 0.3 ** 2 };
lt.net = 2 * lt.F * Math.cos(deg(30));
add('coulomb-long', long({
  stem: '(a) Explain what is meant by quantisation of charge and show that a charge of 5.6 × 10⁻¹⁹ C is not possible. [1] (b) State Coulomb’s law and write it in vector form. [2] (c) Three equal charges of +2.0 μC are placed at the corners of an equilateral triangle of side 30 cm. Find the net force on one of them. [2]',
  model: r`(a) Every charge is an integral multiple of $e$: $q = n e$. Here $n = \dfrac{5.6 \times 10^{-19}}{1.6 \times 10^{-19}} = 3.5$, not an integer, so the charge is impossible.

(b) The force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them, acting along the line joining them: $\vec F_{12} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}\hat r_{12}$ (force on $q_2$, $\hat r_{12}$ from $q_1$ to $q_2$).

(c) Each pair force $F = \dfrac{9 \times 10^{9} \times (2.0 \times 10^{-6})^2}{(0.30)^2} = ${dec(lt.F, 2)}$ N; the two forces on one charge are at 60°, so $F_\text{net} = 2F\cos 30° \approx ${dec(lt.net, 3)}$ N, along the outward bisector of that corner.`,
  sol: 'n = 3.5; statement; 2F cos 30°.',
  scheme: [['n = 3.5: not an integer', 1], ['Statement of Coulomb’s law', 1], ['Vector form with unit vector', 1], ['Each force 0.40 N', 1], ['F_net ≈ 0.693 N along the bisector', 1]],
  d: 3, c: 'application', t: [1, 2, 3], wl: null,
}), () => near(lt.net, 0.693) || `lt ${lt.net}`);
const fl = { q1: 16e-9, q2: 4e-9, d: 0.3 };
fl.x = (fl.d * Math.sqrt(fl.q1)) / (Math.sqrt(fl.q1) + Math.sqrt(fl.q2));
fl.E = (K * fl.q1) / (fl.d / 2) ** 2 - (K * fl.q2) / (fl.d / 2) ** 2;
add('field-long', long({
  stem: '(a) Define electric field intensity and state its SI unit. [1] (b) State three properties of electric lines of force. [1] (c) Charges of +16 nC and +4 nC are 30 cm apart. Find (i) the electric field at the midpoint, (ii) the position of the neutral point. [3]',
  model: r`(a) Force per unit positive test charge, $\vec E = \vec F/q_0$; unit N C$^{-1}$ (V m$^{-1}$).

(b) Lines start on positive and end on negative charges; two lines never cross; they are closer where the field is stronger (also: no closed loops; normal to conductors).

(c)(i) At the midpoint (0.15 m from each): $E = \dfrac{9 \times 10^{9}(16 - 4) \times 10^{-9}}{(0.15)^2} = ${dec(fl.E, 3)}$ N C$^{-1}$, directed away from the 16 nC charge.
(ii) $\dfrac{16}{x^2} = \dfrac{4}{(0.30 - x)^2} \Rightarrow \dfrac{x}{0.30 - x} = 2 \Rightarrow x = ${dec(fl.x, 2)}$ m from the 16 nC charge.`,
  sol: 'Definition; properties; fields subtract between like charges.',
  scheme: [['Definition and unit', 1], ['Three properties', 1], ['E at midpoint 4800 N C⁻¹ with direction', 2], ['Neutral point 0.20 m from 16 nC', 1]],
  d: 3, c: 'application', t: [4, 5], wl: null,
}), () => near(fl.E, 4800) && near(fl.x, 0.2) || `fl ${fl.E}`);
const dl = { q: 4e-9, a: 1e-3, r: 0.2 };
dl.p = dl.q * 2 * dl.a;
dl.ax = (2 * K * dl.p) / dl.r ** 3;
dl.eq = (K * dl.p) / dl.r ** 3;
add('dipole-long', long({
  stem: '(a) Define electric dipole moment and state its direction and unit. [1] (b) Derive an expression for the electric field at a point on the axial line of a dipole, and deduce its value for a short dipole. [2] (c) Charges of ±4.0 nC are 2.0 mm apart. Find the fields 20 cm from the centre on the axial and equatorial lines, and their ratio. [2]',
  model: r`(a) $\vec p = q \times 2a$, directed from −q to +q; unit C m.

(b) With P on the axis at $r$ from the centre: $E = \dfrac{q}{4\pi\varepsilon_0}\left[\dfrac{1}{(r - a)^2} - \dfrac{1}{(r + a)^2}\right] = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2pr}{(r^2 - a^2)^2}$, along p; for $r \gg a$, $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{r^3}$.

(c) $p = 4.0 \times 10^{-9} \times 2.0 \times 10^{-3} = ${sci(dl.p, 2)}$ C m. $E_\text{ax} = \dfrac{2kp}{r^3} = ${dec(dl.ax, 2)}$ N C$^{-1}$ (along p); $E_\text{eq} = \dfrac{kp}{r^3} = ${dec(dl.eq, 2)}$ N C$^{-1}$ (opposite p); ratio 2 : 1.`,
  sol: 'Definition; derivation; numbers.',
  scheme: [['Definition, direction, unit', 1], ['Axial derivation', 1], ['Short-dipole limit', 1], ['p = 8.0 × 10⁻¹² C m, E_ax = 18 N C⁻¹', 1], ['E_eq = 9.0 N C⁻¹; ratio 2 : 1', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}), () => near(dl.ax, 18) && near(dl.eq, 9) || `dl ${dl.ax}`);
const tl = { q: 5e-6, d: 4e-3, E: 2.5e4 };
tl.p = tl.q * tl.d;
tl.max = tl.p * tl.E;
tl.at30 = tl.max * 0.5;
add('torque-long', long({
  stem: '(a) Show that a dipole in a uniform electric field experiences no net force, and derive the torque acting on it. [2] (b) A dipole of charges ±5.0 μC separated by 4.0 mm is placed in a uniform field of 2.5 × 10⁴ N C⁻¹. Find the torque when its axis is (i) perpendicular to the field, (ii) at 30° to the field. [2] (c) Name the orientation in which the dipole is in unstable equilibrium. [1]',
  model: r`(a) The forces are $+q\vec E$ and $-q\vec E$: their sum is zero. They act along parallel lines a perpendicular distance $2a\sin\theta$ apart, forming a couple: $\tau = qE \cdot 2a\sin\theta = pE\sin\theta$, i.e. $\vec\tau = \vec p \times \vec E$.

(b) $p = 5.0 \times 10^{-6} \times 4.0 \times 10^{-3} = ${sci(tl.p, 2)}$ C m. (i) $\tau = pE = ${sci(tl.p, 2)} \times 2.5 \times 10^{4} = ${sci(tl.max, 2)}$ N m. (ii) $\tau = pE\sin 30° = ${sci(tl.at30, 2)}$ N m.

(c) Dipole moment **antiparallel** to the field (θ = 180°): the torque is zero, but a slight twist produces a torque that turns it further away.`,
  sol: 'Couple; pE sin θ; numbers; θ = 180° unstable.',
  scheme: [['Zero net force shown', 1], ['τ = pE sin θ derived', 1], ['p = 2.0 × 10⁻⁸ C m; τ = 5.0 × 10⁻⁴ N m', 1], ['τ = 2.5 × 10⁻⁴ N m at 30°', 1], ['Unstable at 180°', 1]],
  d: 3, c: 'application', t: [7], wl: null,
}), () => near(tl.max, 5e-4) && near(tl.at30, 2.5e-4) || 'tl');
const sy = { qA: 3e-9, qB: -4e-9, a: 0.3, b: 0.4 };
sy.EA = (K * Math.abs(sy.qA)) / sy.a ** 2;
sy.EB = (K * Math.abs(sy.qB)) / sy.b ** 2;
sy.E = Math.hypot(sy.EA, sy.EB);
sy.F = sy.E * 2e-9;
add('corner-long', long({
  stem: 'In a right-angled triangle ABC, the right angle is at C, AC = 30 cm and BC = 40 cm. A charge of +3.0 nC is at A and a charge of −4.0 nC is at B. (a) Find the electric field at C due to each charge and show their directions on a sketch (described in words). [2] (b) Find the resultant field at C. [2] (c) Find the force on a charge of +2.0 nC placed at C. [1]',
  model: r`(a) From A: $E_A = \dfrac{9 \times 10^{9} \times 3.0 \times 10^{-9}}{(0.30)^2} = ${dec(sy.EA, 3)}$ N C$^{-1}$, along AC produced (away from A). From B: $E_B = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{(0.40)^2} = ${dec(sy.EB, 3)}$ N C$^{-1}$, along CB (towards B).

(b) The two fields are perpendicular: $E = \sqrt{${dec(sy.EA, 3)}^2 + ${dec(sy.EB, 3)}^2} \approx ${dec(sy.E, 3)}$ N C$^{-1}$, at $\tan^{-1}\dfrac{${dec(sy.EB, 3)}}{${dec(sy.EA, 3)}} \approx ${dec((Math.atan(sy.EB / sy.EA) * 180) / Math.PI, 3)}°$ to the direction of $E_A$.

(c) $F = qE = 2.0 \times 10^{-9} \times ${dec(sy.E, 3)} \approx ${sci(sy.F, 3)}$ N, along the resultant field.`,
  sol: 'Two perpendicular fields; Pythagoras; F = qE.',
  scheme: [['E_A = 300 N C⁻¹ with direction', 1], ['E_B = 225 N C⁻¹ with direction', 1], ['Resultant ≈ 375 N C⁻¹', 1], ['Direction ≈ 36.9° to E_A', 1], ['F ≈ 7.5 × 10⁻⁷ N', 1]],
  d: 4, c: 'analysis', t: [3, 4], wl: null,
}), () => near(sy.E, 375) && near(sy.F, 7.5e-7) || `sy ${sy.E}`);
const sp = { q1: 6e-6, q2: -2e-6, r: 0.3 };
sp.F1 = (K * sp.q1 * Math.abs(sp.q2)) / sp.r ** 2;
sp.q = (sp.q1 + sp.q2) / 2;
sp.F2 = (K * sp.q * sp.q) / sp.r ** 2;
add('spheres-short3', short({
  marks: 3,
  stem: 'Two identical small metal spheres carrying +6.0 μC and −2.0 μC are 30 cm apart. (a) Find the force between them. (b) They are touched together and returned to the same positions. Find the new force and state whether it is attractive or repulsive.',
  model: r`(a) $F = \dfrac{9 \times 10^{9} \times 6.0 \times 10^{-6} \times 2.0 \times 10^{-6}}{(0.30)^2} = ${dec(sp.F1, 2)}$ N, **attractive**.
(b) On touching, the total charge $+4.0\ \mu$C is shared equally: $+2.0\ \mu$C each. $F' = \dfrac{9 \times 10^{9} \times (2.0 \times 10^{-6})^2}{(0.30)^2} = ${dec(sp.F2, 2)}$ N, now **repulsive**.`,
  sol: 'Coulomb’s law before and after equal sharing.',
  scheme: [['F = 1.2 N attractive', 1], ['Charge shared: +2.0 μC each', 1], ['F′ = 0.40 N repulsive', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(sp.F1, 1.2) && near(sp.F2, 0.4) || 'sp');

await import('./questions-extra.mjs');
