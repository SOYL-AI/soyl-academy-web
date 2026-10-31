// ISC 12 Physics ch09 Magnetism and Matter — question bank (ISC style). Numbers computed and re-checked.
// The ISC scope gives the bar-magnet fields as formulae (derivations removed) and treats the B–H loop qualitatively,
// so no item asks for those derivations or for a loop-area calculation.
import { mk, add, r, sci, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { MU0, KM } from './decks.mjs';
import { endOn, broadside } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (d) => (d * Math.PI) / 180;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// ================================================================ t01 bar magnet, equivalent solenoid, field lines
add('lines-vs-e-mcq', mcq({
  stem: 'An electric dipole (charges +q and −q) and a short bar magnet are drawn side by side, with the dipole moment p and the magnetic moment m both pointing to the right. At the centre of each — midway between the two charges, and in the middle of the magnet itself — the field points',
  right: 'to the left between the charges, but to the right inside the magnet',
  wrong: ['to the right in both', 'to the left in both', 'to the right between the charges, but to the left inside the magnet'],
  sol: 'p points from −q to +q, and between the charges E runs from +q to −q: to the left, opposite to p. The magnetic lines are closed loops that run through the magnet from S to N: to the right, along m. This is the clearest difference between the two patterns — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('closed-ar', ar({
  a: 'However a closed surface is drawn near a bar magnet — even one that cuts through the body of the magnet — the total magnetic flux out of it is zero.',
  r: 'Magnetic field lines have no starting or finishing points, so every line that leaves a closed surface must cross back into it somewhere.',
  key: 'a',
  sol: 'Both true, and R explains A: with no monopoles the lines are closed loops, so the outward and inward crossings of any closed surface cancel — option (a).',
  d: 3, c: 'understanding', t: [1, 3],
}));
add('inside-ar', ar({
  a: 'Within the body of a bar magnet, its field lines are directed from the north pole towards the south pole.',
  r: 'Outside a bar magnet the field lines run from its north pole round to its south pole, and every line is a closed loop.',
  key: 'd',
  sol: 'R is true. A is false: because the loops are closed and run N → S outside, they must return S → N inside the magnet, along its magnetic moment — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('reverse-tf', tf({
  stem: 'A long solenoid behaves like a bar magnet; if the battery connections are swapped so that the current flows the other way round the turns, the end that was a north pole becomes a south pole.',
  key: 't',
  sol: 'True. Reversing the current reverses the magnetic moment NIA (right-hand rule), so the polarities of the two ends are exchanged.',
  d: 1, c: 'understanding', t: [1],
}));
const eqI = { m: 1.8, N: 600, A: 5e-4 };
eqI.I = eqI.m / (eqI.N * eqI.A);
add('equivI-num', num({
  stem: 'A bar magnet of magnetic moment 1.8 A m² is to be replaced by an equivalent solenoid of 600 turns, each turn enclosing 5.0 cm². What current must the solenoid carry, in amperes?',
  value: Number(dec(eqI.I, 2)), tol: 0.05, unit: 'A',
  sol: r`$m = NIA$, so $I = \dfrac{m}{NA} = \dfrac{1.8}{600 \times 5.0 \times 10^{-4}} = \dfrac{1.8}{0.30} = 6.0$ A.`,
  scheme: [['I = m/NA = 6.0 A', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(eqI.I, 6) && q.answer.value === 6 || 'eqI');
add('differ-short', short({
  marks: 2,
  stem: 'State two differences between the field lines of a bar magnet and those of an electric dipole, and give the physical reason for the first.',
  model: '(i) Magnetic lines form **closed loops**, running N → S outside the magnet and S → N inside; electric lines **start on +q and end on −q**. Reason: no **magnetic monopoles** exist, so a magnetic line has nowhere to begin or end. (ii) Inside the magnet B points **along m**; between the charges E points **opposite to p**.',
  sol: 'Closed loops versus lines ending on charges; direction inside.',
  scheme: [['Two correct differences', 1], ['Reason: no magnetic monopoles', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const eq3 = { m: 2.4, N: 400, r: 0.015 };
eq3.I = eq3.m / (eq3.N * Math.PI * eq3.r ** 2);
add('equiv-short3', short({
  marks: 3,
  stem: 'Explain why a bar magnet can be treated as an equivalent solenoid. A bar magnet 8.0 cm long has a magnetic moment of 2.4 A m². It is to be replaced by a solenoid of the same length with 400 turns of radius 1.5 cm. What current is needed, and which end of the solenoid must act as its north pole?',
  model: r`Each atom of the magnet behaves as a tiny current loop; in a magnet these loops are aligned, so their currents cancel inside and leave a net current circulating round the surface, exactly like the turns of a solenoid. Both give the same closed field-line pattern and a moment along the axis. For the solenoid $m = NI\pi r^2$, so $I = \dfrac{m}{N\pi r^2} = \dfrac{2.4}{400 \times \pi \times (0.015)^2} \approx ${dec(eq3.I, 3)}$ A. The end that the moment points towards, where the current is anticlockwise as seen from outside, must take the place of the magnet's north pole.`,
  sol: 'Aligned atomic current loops; m = NIπr².',
  scheme: [['Aligned atomic current loops act like solenoid turns; same field pattern', 1], ['I = m/Nπr² ≈ 8.49 A', 1], ['N end: the end m points to (anticlockwise current seen from outside)', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(eq3.I, 8.4883, 0.001) || `eq3 ${eq3.I}`);
add('bent-mcq', mcq({
  stem: 'A thin, uniformly magnetised steel strip of magnetic moment m is bent at its midpoint so that its two halves are at right angles, each half keeping its magnetisation along its own length. The magnetic moment of the bent strip is',
  right: 'm/√2',
  wrong: ['m', 'm/2', '√2 m'],
  sol: r`Each half is a dipole of moment $m/2$ along its own length. The two moments are perpendicular, so the resultant is $\sqrt{(m/2)^2 + (m/2)^2} = m/\sqrt2$ — option (@K).`,
  d: 4, c: 'analysis', t: [1],
}), () => near(Math.hypot(0.5, 0.5), 1 / Math.SQRT2) || 'bent');
add('monopole-fill', fill({
  stem: 'Snapping a bar magnet in two always gives two complete magnets; a particle carrying only a north pole or only a south pole, never yet detected, is called a magnetic ___.',
  acc: [['monopole']],
  sol: 'A magnetic **monopole**. Because none exists, magnetic field lines have no ends.',
  d: 1, c: 'recall', t: [1],
}));

// ================================================================ t02 field of a magnetic dipole; torque on a magnet
const en = { m: 2.5, d: 0.25 };
en.B = (KM * 2 * en.m) / en.d ** 3;
add('endon-num', num({
  stem: 'A short bar magnet has a magnetic moment of 2.5 A m². Find the magnetic field it produces at an end-on point 25 cm from its centre, in μT.',
  value: Number(dec(en.B * 1e6, 2)), tol: 0.3, unit: 'μT',
  sol: r`$B = \dfrac{\mu_0}{4\pi}\dfrac{2m}{d^3} = 10^{-7} \times \dfrac{2 \times 2.5}{(0.25)^3} = ${sci(en.B, 2)}$ T, i.e. $${sci(en.B, 2)} \times 10^{6} = ${dec(en.B * 1e6, 2)}$ μT, along the magnetic moment.`,
  scheme: [['B = 3.2 × 10⁻⁵ T = 32 μT', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(en.B, 3.2e-5) && q.answer.value === 32 || 'en');
const bs = { l: 0.05, m: 1.2, d: 0.12 };
bs.B = KM * broadside(bs.m, bs.l, bs.d);
add('broadside-num', num({
  stem: 'A bar magnet of magnetic length 10 cm has a magnetic moment of 1.2 A m². Using the broadside-on formula for a magnet of finite length, find the field at a point on its perpendicular bisector 12 cm from its centre, in μT (3 significant figures).',
  value: Number(dec(bs.B * 1e6, 3)), tol: 0.3, unit: 'μT',
  sol: r`$l = 0.050$ m and $d = 0.12$ m, so $d^2 + l^2 = 0.0144 + 0.0025 = 0.0169$ m² and $(d^2 + l^2)^{3/2} = (0.13)^3 = ${sci(0.13 ** 3, 4)}$ m³. $B = \dfrac{\mu_0}{4\pi}\dfrac{m}{(d^2 + l^2)^{3/2}} \approx 10^{-7} \times \dfrac{1.2}{${sci(0.13 ** 3, 4)}} \approx ${sci(bs.B, 3)}$ T, i.e. $${sci(bs.B, 3)} \times 10^{6} = ${dec(bs.B * 1e6, 3)}$ μT, opposite to the magnetic moment.`,
  scheme: [['(d² + l²)^(3/2) = (0.13)³ m³', 1], ['B ≈ 54.6 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(bs.B, 5.462e-5, 0.001) && near(q.answer.value, 54.6) || `bs ${bs.B}`);
const ex = { l: 0.03, m: 0.8, d: 0.09 };
ex.B = KM * endOn(ex.m, ex.l, ex.d);
add('endon-exact-num', num({
  stem: 'A bar magnet of magnetic length 6.0 cm and magnetic moment 0.80 A m² lies along a straight line. Using the end-on formula for a magnet of finite length, find the field on this line 9.0 cm from the centre of the magnet, in μT (3 significant figures).',
  value: Number(dec(ex.B * 1e6, 3)), tol: 1.5, unit: 'μT',
  sol: r`$l = 0.030$ m and $d = 0.090$ m: $d^2 - l^2 = 0.0081 - 0.0009 = 0.0072$ m². $B = \dfrac{\mu_0}{4\pi}\dfrac{2md}{(d^2 - l^2)^2} \approx 10^{-7} \times \dfrac{2 \times 0.80 \times 0.090}{(0.0072)^2} \approx ${sci(ex.B, 3)}$ T, i.e. $${sci(ex.B, 3)} \times 10^{6} = ${dec(ex.B * 1e6, 3)}$ μT, along the magnetic moment.`,
  scheme: [['d² − l² = 0.0072 m² in the end-on formula', 1], ['B ≈ 278 μT', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(ex.B, 2.7778e-4, 0.001) && q.answer.value === 278 || `ex ${ex.B}`);
add('ratio-endbroad-mcq', mcq({
  stem: 'Point P lies end-on to a short bar magnet, 20 cm from its centre, and point Q lies broadside-on to the same magnet, 10 cm from its centre. The ratio of the field strengths $B_P : B_Q$ is',
  right: '1 : 4',
  wrong: ['4 : 1', '1 : 2', '2 : 1'],
  sol: r`$B_P = \dfrac{\mu_0}{4\pi}\dfrac{2m}{(0.20)^3}$ and $B_Q = \dfrac{\mu_0}{4\pi}\dfrac{m}{(0.10)^3}$, so $\dfrac{B_P}{B_Q} = \dfrac{2 \times (0.10)^3}{(0.20)^3} = \dfrac{2}{8} = \dfrac{1}{4}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near((2 / 0.2 ** 3) / (1 / 0.1 ** 3), 0.25) || 'ratio');
const eqd = { de: 30 };
eqd.db = eqd.de / 2 ** (1 / 3);
add('equal-distance-num', num({
  stem: 'The field of a short bar magnet at an end-on point 30 cm from its centre is to be matched by its field at a broadside-on point. How far from the centre must the broadside-on point be, in cm (3 significant figures)?',
  value: Number(dec(eqd.db, 3)), tol: 0.1, unit: 'cm',
  sol: r`Equal fields need $\dfrac{m}{d_b^3} = \dfrac{2m}{(30)^3}$, so $d_b^3 = \dfrac{(30)^3}{2} = 13500$ cm³ and $d_b = \dfrac{30}{2^{1/3}} = ${dec(eqd.db, 3)}$ cm. The broadside-on point must be closer, because the broadside-on field is only half as strong at the same distance.`,
  scheme: [['d_b³ = d_e³/2', 1], ['d_b ≈ 23.8 cm', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(eqd.db ** 3, 13500) && q.answer.value === 23.8 || `eqd ${eqd.db}`);
const tq = { m: 1.6, B: 0.05, th: 25 };
tq.t = tq.m * tq.B * Math.sin(rad(tq.th));
add('torque-num', num({
  stem: 'A bar magnet of magnetic moment 1.6 A m² is held at 25° to a uniform magnetic field of 0.050 T. Find the torque on it, in mN m (3 significant figures).',
  value: Number(dec(tq.t * 1e3, 3)), tol: 0.2, unit: 'mN m',
  sol: r`$\tau = mB\sin\theta = 1.6 \times 0.050 \times \sin 25^\circ \approx 0.080 \times 0.4226 \approx ${sci(tq.t, 3)}$ N m, i.e. $${sci(tq.t, 3)} \times 10^{3} = ${dec(tq.t * 1e3, 3)}$ mN m.`,
  scheme: [['τ = mB sin θ', 1], ['τ ≈ 33.8 mN m', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(tq.t, 0.033809, 0.001) && near(q.answer.value, 33.8) || `tq ${tq.t}`);
add('findm-num', num({
  stem: 'A short magnet hung at 30° to a uniform field of 0.032 T experiences a torque of 0.012 N m. Find its magnetic moment, in A m².',
  value: 0.75, tol: 0.01, unit: 'A m²',
  sol: r`$m = \dfrac{\tau}{B\sin\theta} = \dfrac{0.012}{0.032 \times 0.5} = 0.75$ A m².`,
  scheme: [['m = τ/(B sin θ) = 0.75 A m²', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.012 / (0.032 * Math.sin(rad(30))), 0.75) || 'findm');
const nt = { m: 0.4, BH: 4e-5 };
nt.d = Math.cbrt((KM * nt.m) / nt.BH);
add('neutral-num', num({
  stem: 'A short bar magnet of moment 0.40 A m² lies on a horizontal table with its north pole pointing geographic north. The horizontal component of the Earth’s field there is 4.0 × 10⁻⁵ T, directed north. Find the distance from the centre of the magnet, in cm, of the points where the resultant horizontal field is zero (the neutral points).',
  value: Number(dec(nt.d * 100, 2)), tol: 0.2, unit: 'cm',
  sol: r`With m pointing north, the magnet's field end-on is along m and adds to the Earth's field, but broadside-on it is opposite to m, i.e. southwards. So the neutral points lie on the east–west line through the centre, where $\dfrac{\mu_0}{4\pi}\dfrac{m}{d^3} = B_H$: $d^3 = \dfrac{10^{-7} \times 0.40}{4.0 \times 10^{-5}} = 1.0 \times 10^{-3}$ m³, so $d = 0.10$ m, i.e. $0.10 \times 100 = 10$ cm, on each side of the magnet.`,
  scheme: [['Neutral points broadside-on (field opposite to m cancels B_H)', 1], ['d = 10 cm', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(nt.d, 0.1) && q.answer.value === 10 || `nt ${nt.d}`);
add('endbroad-ar', ar({
  a: 'At equal large distances from a short bar magnet, the end-on field is twice as strong as the broadside-on field.',
  r: 'The field of a short bar magnet weakens as the inverse cube of the distance from its centre.',
  key: 'b',
  sol: 'Both true, but R does not explain A: the 1/d³ law holds equally in both positions; the factor 2 comes from the different geometry of the two positions (2m/d³ against m/d³) — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('halfmax-mcq', mcq({
  stem: 'A pivoted compass needle sits in a uniform magnetic field. Through what smallest angle from the field direction must it be turned for the torque on it to be half of the largest torque it can feel?',
  right: '30°',
  wrong: ['45°', '60°', '90°'],
  sol: r`$\tau = mB\sin\theta$, so $\sin\theta = \tfrac12$ gives $\theta = 30^\circ$ (150° also works, on the far side) — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(Math.sin(rad(30)), 0.5) || 'half');
add('torquedir-mcq', mcq({
  stem: 'A bar magnet lies on a horizontal table with its magnetic moment pointing north. A uniform horizontal magnetic field pointing east is switched on. The torque on the magnet points',
  right: 'vertically downwards, so the magnet turns clockwise as seen from above',
  wrong: ['vertically upwards, so the magnet turns anticlockwise as seen from above', 'towards the east, along the field', 'towards the north, along the magnet'],
  sol: r`With x east, y north and z up, $\vec\tau = \vec m \times \vec B \propto \hat y \times \hat x = -\hat z$: downwards. A torque pointing down turns the magnet clockwise as seen from above, swinging m from north towards east, into line with B — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => {
  const t = cross([0, 1, 0], [1, 0, 0]);
  return (t[0] === 0 && t[1] === 0 && t[2] === -1) || 'tdir';
});
add('limit-short', short({
  marks: 2,
  stem: 'Show that the formulae for the field of a bar magnet of magnetic length 2l reduce to (μ₀/4π)2m/d³ end-on and (μ₀/4π)m/d³ broadside-on when d ≫ l, and state the direction of the field in each position.',
  model: r`End-on: $B = \dfrac{\mu_0}{4\pi}\dfrac{2md}{(d^2 - l^2)^2}$; for $d \gg l$, $(d^2 - l^2)^2 \approx d^4$, so $B \approx \dfrac{\mu_0}{4\pi}\dfrac{2m}{d^3}$, **along m**. Broadside-on: $B = \dfrac{\mu_0}{4\pi}\dfrac{m}{(d^2 + l^2)^{3/2}}$ and $(d^2 + l^2)^{3/2} \approx d^3$, so $B \approx \dfrac{\mu_0}{4\pi}\dfrac{m}{d^3}$, **opposite to m** (parallel to the axis, from the N end towards the S end).`,
  sol: 'Neglect l² beside d².',
  scheme: [['End-on limit 2m/d³, along m', 1], ['Broadside-on limit m/d³, opposite to m', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
const ec = { l: 0.04, m: 0.9, d: 0.2 };
ec.Bex = KM * endOn(ec.m, ec.l, ec.d);
ec.Bsh = (KM * 2 * ec.m) / ec.d ** 3;
ec.pct = ((ec.Bex - ec.Bsh) / ec.Bex) * 100;
add('exact-short3', short({
  marks: 3,
  stem: 'A bar magnet of magnetic length 8.0 cm has a magnetic moment of 0.90 A m². Find the field at an end-on point 20 cm from its centre (a) with the formula for a magnet of finite length, (b) treating it as a short magnet. (c) By what percentage does the short-magnet value fall below the value in (a)?',
  model: r`(a) $l = 0.040$ m, $d = 0.20$ m: $d^2 - l^2 = 0.04 - 0.0016 = 0.0384$ m². $B = 10^{-7} \times \dfrac{2 \times 0.90 \times 0.20}{(0.0384)^2} \approx ${sci(ec.Bex, 3)}$ T.
(b) $B \approx 10^{-7} \times \dfrac{2 \times 0.90}{(0.20)^3} = ${sci(ec.Bsh, 3)}$ T.
(c) $\dfrac{(a) - (b)}{(a)} \times 100 \approx ${dec(ec.pct, 2)}$ per cent: the short-magnet formula is about 8% low because l is not negligible beside d.`,
  sol: 'Finite-length end-on formula, then 2m/d³.',
  scheme: [['B ≈ 2.44 × 10⁻⁵ T', 1], ['B ≈ 2.25 × 10⁻⁵ T', 1], ['About 7.8% low; l not negligible', 1]],
  d: 4, c: 'analysis', t: [2], wl: null,
}), () => near(ec.Bex, 2.4414e-5, 0.001) && near(ec.Bsh, 2.25e-5) && near(ec.pct, 7.84, 0.01) || `ec ${ec.Bex} ${ec.pct}`);
add('zerotorque-short', short({
  marks: 2,
  stem: 'A bar magnet can turn freely about a vertical axis in a uniform horizontal field. In which two orientations is the torque on it zero? Which of them is stable, and why?',
  model: 'The torque mB sin θ is zero when the moment points **along** the field (θ = 0°) or **exactly against** it (θ = 180°). θ = 0° is **stable**: a small twist produces a torque that turns the magnet **back**. At θ = 180° a small twist produces a torque that turns it **further away**, so that position is **unstable**.',
  sol: 'sin θ = 0 at 0° and 180°; restoring or not.',
  scheme: [['θ = 0° and θ = 180°', 1], ['0° stable (restoring torque), 180° unstable', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const ts = { m: 2, B: 0.03, t: 0.03 };
ts.tmax = ts.m * ts.B;
ts.th = (Math.asin(ts.t / ts.tmax) * 180) / Math.PI;
add('torque-short3', short({
  marks: 3,
  stem: 'A bar magnet of magnetic moment 2.0 A m² hangs from a thread so that it can turn in a horizontal plane, in a uniform horizontal field of 0.030 T. (a) Find the torque on it when its axis is perpendicular to the field. (b) At what angle from the field is the torque 0.030 N m? (c) The magnet is at rest along the field when the field is suddenly reversed. Describe and explain what happens.',
  model: r`(a) $\tau = mB = 2.0 \times 0.030 = ${dec(ts.tmax, 2)}$ N m.
(b) $\sin\theta = \dfrac{0.030}{0.060} = 0.5$, so $\theta = ${Math.round(ts.th)}^\circ$ (or $150^\circ$).
(c) Now m points opposite to B: θ = 180°, where the torque is zero but the equilibrium is **unstable**. The slightest disturbance produces a torque that turns the magnet further, so it swings right round, overshoots and oscillates, and finally settles with m along the new field.`,
  sol: 'τ = mB sin θ; stability at 180°.',
  scheme: [['τ = 0.060 N m', 1], ['θ = 30°', 1], ['Unstable at 180°: turns round to align with the reversed field', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(ts.tmax, 0.06) && near(ts.th, 30) || 'ts');
const mb = { d: 0.2, B: 2e-5 };
mb.m = (mb.B * mb.d ** 3) / KM;
add('momentB-num', num({
  stem: 'At a broadside-on point 20 cm from the centre of a short bar magnet, the field due to the magnet is 2.0 × 10⁻⁵ T. Find the magnetic moment of the magnet, in A m².',
  value: Number(dec(mb.m, 2)), tol: 0.02, unit: 'A m²',
  sol: r`$B = \dfrac{\mu_0}{4\pi}\dfrac{m}{d^3}$, so $m = \dfrac{Bd^3}{10^{-7}} = \dfrac{2.0 \times 10^{-5} \times (0.20)^3}{10^{-7}} = ${dec(mb.m, 2)}$ A m².`,
  scheme: [['m = Bd³/(μ₀/4π) = 1.6 A m²', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(mb.m, 1.6) && q.answer.value === 1.6 || 'mb');

// ================================================================ t03 magnetic flux and flux density
const bf = { a: 0.15, b: 0.08, B: 0.25, elev: 30 };
bf.A = bf.a * bf.b;
bf.th = 90 - bf.elev;
bf.phi = bf.B * bf.A * Math.cos(rad(bf.th));
add('bench-flux-num', num({
  stem: 'A rectangular loop 15 cm × 8.0 cm lies flat on a horizontal bench in a uniform magnetic field of 0.25 T that is directed at 30° above the horizontal. Find the magnetic flux through the loop, in mWb.',
  value: Number(dec(bf.phi * 1e3, 2)), tol: 0.02, unit: 'mWb',
  sol: r`The normal to the loop is vertical, so it makes $90^\circ - 30^\circ = 60^\circ$ with $\vec B$. $A = 0.15 \times 0.080 = 0.012$ m². $\Phi = BA\cos 60^\circ = 0.25 \times 0.012 \times 0.5 = ${sci(bf.phi, 2)}$ Wb, i.e. $${sci(bf.phi, 2)} \times 10^{3} = ${dec(bf.phi * 1e3, 2)}$ mWb.`,
  scheme: [['Angle with the normal 60°', 1], ['Φ = 1.5 mWb', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(bf.phi, 1.5e-3) && q.answer.value === 1.5 || 'bf');
add('gauss-mcq', mcq({
  stem: 'An old reference book gives the strength of the Earth’s magnetic field at a place in Bhopal as 0.46 gauss. Expressed in tesla, this is',
  right: '4.6 × 10⁻⁵ T',
  wrong: ['4.6 × 10⁻⁴ T', '4.6 × 10⁻⁶ T', '46 T'],
  sol: r`1 G $= 10^{-4}$ T, so the field is $0.46 \times 10^{-4} = 4.6 \times 10^{-5}$ T — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => near(0.46e-4, 4.6e-5) || 'gauss');
add('weber-fill', fill({
  stem: 'Magnetic flux is flux density times area, so a flux density of one tesla through one square metre held normal to the field gives a flux of one ___.',
  acc: [['weber', 'Wb']],
  sol: 'One **weber** (1 Wb = 1 T m²).',
  d: 1, c: 'recall', t: [3],
}));
const fm = { max: 3.6e-3, plane: 30 };
fm.th = 90 - fm.plane;
fm.phi = fm.max * Math.cos(rad(fm.th));
add('fluxmax-num', num({
  stem: 'As a flat coil is turned in a uniform magnetic field, the largest flux through it is 3.6 × 10⁻³ Wb. Find the flux, in mWb, when the plane of the coil makes 30° with the field.',
  value: Number(dec(fm.phi * 1e3, 2)), tol: 0.02, unit: 'mWb',
  sol: r`The plane at $30^\circ$ to the field means the normal is at $\theta = 60^\circ$. $\Phi = \Phi_\text{max}\cos\theta = 3.6 \times 10^{-3} \times 0.5 = 1.8 \times 10^{-3}$ Wb, i.e. $1.8 \times 10^{-3} \times 10^{3} = 1.8$ mWb.`,
  scheme: [['θ = 60° from the normal', 1], ['Φ = 1.8 mWb', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(fm.phi, 1.8e-3) && q.answer.value === 1.8 || 'fm');
add('bowl-mcq', mcq({
  stem: 'A hemispherical bowl of radius R rests with its rim horizontal in a uniform vertical magnetic field B. The magnetic flux through its curved surface has magnitude',
  right: 'πR²B, the same as through the flat circle of the rim',
  wrong: ['2πR²B, since the curved area is 2πR²', 'zero, since the field lines enter and leave the bowl', '4πR²B, the area of a whole sphere times B'],
  sol: r`The bowl and the flat disc of its rim together form a closed surface, through which the net magnetic flux is zero. So every line that crosses the disc also crosses the curved surface: flux $= \pi R^2B$ — option (@K).`,
  d: 3, c: 'analysis', t: [1, 3],
}));
const bg = { phi: 4.8e-4, A: 60e-4 };
bg.B = bg.phi / bg.A;
add('Bgauss-num', num({
  stem: 'A magnetic flux of 4.8 × 10⁻⁴ Wb passes normally through a flat area of 60 cm². Find the flux density, in gauss.',
  value: Math.round(bg.B * 1e4), tol: 5, unit: 'G',
  sol: r`$B = \dfrac{\Phi}{A} = \dfrac{4.8 \times 10^{-4}}{60 \times 10^{-4}} = 0.080$ T, i.e. $0.080 \times 10^{4} = 800$ G.`,
  scheme: [['B = 0.080 T = 800 G', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(bg.B, 0.08) && q.answer.value === 800 || 'bg');
add('scalar-ar', ar({
  a: 'Magnetic flux through a surface is a scalar quantity, although the flux density B is a vector.',
  r: 'Flux is the scalar (dot) product of $\\vec B$ with the area vector of the surface: $\\Phi = \\vec B \\cdot \\vec A$.',
  key: 'a',
  sol: 'Both true, and R explains A: a dot product of two vectors is a scalar — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('gauss-tf', tf({
  stem: 'Since one tesla equals one weber per square metre, a field of one gauss can also be written as 10⁻⁴ Wb m⁻².',
  key: 't',
  sol: 'True. 1 G = 10⁻⁴ T and 1 T = 1 Wb m⁻², so 1 G = 10⁻⁴ Wb m⁻².',
  d: 1, c: 'understanding', t: [3],
}));
add('fluxdef-short', short({
  marks: 2,
  stem: 'Define magnetic flux through a plane surface and state its SI unit. A flat coil is turned in a uniform field: in which orientations is the flux through it (i) greatest, (ii) zero?',
  model: r`Magnetic flux $\Phi = \vec B \cdot \vec A = BA\cos\theta$, where θ is the angle between B and the **normal** to the surface; SI unit the **weber** (1 Wb = 1 T m²). (i) Greatest, $BA$, when the plane of the coil is **perpendicular** to the field. (ii) Zero when the plane of the coil is **parallel** to the field.`,
  sol: 'Φ = BA cos θ.',
  scheme: [['Φ = BA cos θ; weber', 1], ['Greatest with plane ⟂ B; zero with plane ∥ B', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const fc = { r: 0.07, B: 0.12, th: 37 };
fc.A = Math.PI * fc.r ** 2;
fc.perp = fc.B * fc.A;
fc.tilt = fc.perp * Math.cos(rad(fc.th));
add('flux-short3', short({
  marks: 3,
  stem: 'A circular coil of radius 7.0 cm lies in a uniform magnetic field of 0.12 T. Find the flux through one turn when (a) its plane is perpendicular to the field, (b) its normal makes 37° with the field, (c) its plane is parallel to the field. Also express the field in gauss.',
  model: r`(a) $A = \pi r^2 = \pi \times (0.070)^2 \approx ${sci(fc.A, 3)}$ m², so $\Phi = BA \approx 0.12 \times ${sci(fc.A, 3)} \approx ${sci(fc.perp, 3)}$ Wb.
(b) $\Phi = BA\cos 37^\circ \approx ${sci(fc.perp, 3)} \times ${dec(Math.cos(rad(37)), 3)} \approx ${sci(fc.tilt, 3)}$ Wb.
(c) No field lines cross the coil: $\Phi = 0$. The field is $0.12 \times 10^{4} = 1200$ G.`,
  sol: 'Φ = BA cos θ; 1 T = 10⁴ G.',
  scheme: [['Φ ≈ 1.85 × 10⁻³ Wb', 1], ['Φ ≈ 1.48 × 10⁻³ Wb', 1], ['Zero; 1200 G', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(fc.perp, 1.8473e-3, 0.001) && near(fc.tilt, 1.4753e-3, 0.001) || `fc ${fc.tilt}`);

// ================================================================ t04 magnetic properties of materials
const mz = { len: 0.12, A: 0.5e-4, m: 4.2 };
mz.V = mz.len * mz.A;
mz.M = mz.m / mz.V;
add('M-num', num({
  stem: 'An iron rod 12 cm long with a cross-section of 0.50 cm² is magnetised until its magnetic moment is 4.2 A m². Find its magnetisation, in units of 10⁵ A m⁻¹.',
  value: Number(dec(mz.M / 1e5, 2)), tol: 0.05, unit: '× 10⁵ A m⁻¹',
  sol: r`$V = 0.12 \times 0.50 \times 10^{-4} = 6.0 \times 10^{-6}$ m³; $M = \dfrac{m}{V} = \dfrac{4.2}{6.0 \times 10^{-6}} = 7.0 \times 10^{5}$ A m$^{-1}$, i.e. $M = 7.0$ in units of $10^{5}$ A m$^{-1}$.`,
  scheme: [['M = m/V = 7.0 × 10⁵ A m⁻¹', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(mz.M, 7e5) && q.answer.value === 7 || 'mz');
const ch = { H: 2400, M: 1.8 };
ch.chi = ch.M / ch.H;
add('chi-num', num({
  stem: 'A magnetic intensity of 2.4 × 10³ A m⁻¹ magnetises a crystal of a paramagnetic salt to 1.8 A m⁻¹. Find the susceptibility of the salt, in units of 10⁻⁴.',
  value: Number(dec(ch.chi * 1e4, 2)), tol: 0.05, unit: '× 10⁻⁴',
  sol: r`$\chi = \dfrac{M}{H} = \dfrac{1.8}{2.4 \times 10^{3}} = 7.5 \times 10^{-4}$, i.e. $7.5 \times 10^{-4} \times 10^{4} = 7.5$ (small and positive, as for a paramagnet).`,
  scheme: [['χ = M/H = 7.5 × 10⁻⁴', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(ch.chi, 7.5e-4) && q.answer.value === 7.5 || 'ch');
const cu = { chi1: 4.2e-4, T1: 250, tC: 77 };
cu.T2 = cu.tC + 273;
cu.chi2 = (cu.chi1 * cu.T1) / cu.T2;
add('curie-num', num({
  stem: 'A paramagnetic salt has a susceptibility of 4.2 × 10⁻⁴ at 250 K. Assuming Curie’s law, find its susceptibility at 77 °C, in units of 10⁻⁴.',
  value: Number(dec(cu.chi2 * 1e4, 2)), tol: 0.05, unit: '× 10⁻⁴',
  sol: r`77 °C is $77 + 273 = 350$ K. By Curie's law $\chi T$ is constant, so $\chi_2 = 4.2 \times 10^{-4} \times \dfrac{250}{350} = 3.0 \times 10^{-4}$, i.e. $3.0 \times 10^{-4} \times 10^{4} = 3.0$.`,
  scheme: [['Temperature in kelvin, 350 K', 1], ['χ = 3.0 × 10⁻⁴', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(cu.chi2, 3e-4) && q.answer.value === 3 || 'cu');
const fe = { H: 500, B: 1.4 };
fe.M = fe.B / MU0 - fe.H;
fe.chi = fe.M / fe.H;
add('ferroM-num', num({
  stem: 'In a soft-iron sample the magnetic intensity is 500 A m⁻¹ and the magnetic field is 1.4 T. Find the susceptibility of the iron (3 significant figures).',
  value: Number(dec(fe.chi, 3)), tol: 10, unit: '',
  sol: r`$B = \mu_0(H + M)$, so $M = \dfrac{B}{\mu_0} - H \approx \dfrac{1.4}{4\pi \times 10^{-7}} - 500 \approx ${sci(fe.M, 4)}$ A m$^{-1}$. Then $\chi = \dfrac{M}{H} \approx ${Math.round(fe.chi)}$, i.e. $\chi = ${dec(fe.chi, 3)}$ to 3 significant figures: a ferromagnet.`,
  scheme: [['M = B/μ₀ − H ≈ 1.11 × 10⁶ A m⁻¹', 1], ['χ ≈ 2230', 1]],
  marks: 2, d: 3, c: 'analysis', t: [4],
}), (q) => near(fe.chi, 2227.2, 0.001) && q.answer.value === 2230 || `fe ${fe.chi}`);
add('murclass-mcq', mcq({
  stem: 'A sample has a relative permeability of 0.99990. Its magnetic susceptibility, and the class of material it belongs to, are',
  right: '−1.0 × 10⁻⁴; diamagnetic',
  wrong: ['+1.0 × 10⁻⁴; paramagnetic', '0.99990; paramagnetic', '−0.99990; diamagnetic'],
  sol: r`$\chi = \mu_r - 1 = 0.99990 - 1 = -1.0 \times 10^{-4}$: small and negative, so the material is diamagnetic — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(0.9999 - 1, -1e-4, 1e-6) || 'mur');
add('sphere-mcq', mcq({
  stem: 'A small sphere of a material whose susceptibility is −1.6 × 10⁻⁵ is placed in a uniform magnetic field. Compared with the empty space around it, the field lines inside the sphere are',
  right: 'very slightly less crowded, because the material is diamagnetic',
  wrong: ['very slightly more crowded, because the material is paramagnetic', 'much more crowded, because the material is ferromagnetic', 'absent, because the field is completely expelled'],
  sol: 'A small negative χ marks a diamagnet: its magnetisation opposes H, so B inside is very slightly smaller and the lines spread out a little — option (@K). Complete expulsion happens only in a superconductor (χ = −1).',
  d: 2, c: 'understanding', t: [4],
}));
add('gadolinium-mcq', mcq({
  stem: 'Gadolinium has a Curie temperature of about 293 K (20 °C). A gadolinium bar is tested with a strong magnet on a winter morning at 10 °C and again on a summer afternoon at 35 °C. The bar is',
  right: 'ferromagnetic in the morning but only paramagnetic in the afternoon',
  wrong: ['paramagnetic in the morning but ferromagnetic in the afternoon', 'ferromagnetic on both occasions', 'diamagnetic on both occasions'],
  sol: '10 °C = 283 K is below the Curie temperature, so the domains survive and the bar is ferromagnetic. 35 °C = 308 K is above it, so the bar is only paramagnetic — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => (10 + 273 < 293 && 35 + 273 > 293) || 'gd');
add('cooling-mcq', mcq({
  stem: 'A paramagnetic sample is cooled from 300 K to 100 K while the applied magnetic intensity is held fixed (well below saturation). Its magnetisation',
  right: 'becomes about three times as large',
  wrong: ['becomes about one third as large', 'stays the same', 'becomes about nine times as large'],
  sol: 'M = χH with χ = C/T. At fixed H, M ∝ 1/T, so reducing T to one third triples M — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(300 / 100, 3) || 'cool');
add('domain-mcq', mcq({
  stem: 'When a weak magnetic field is first applied to an unmagnetised piece of soft iron, its magnetisation grows mainly because',
  right: 'domains already magnetised roughly along the field grow at the expense of their neighbours',
  wrong: ['each atom acquires a new magnetic moment opposite to the field', 'the iron warms up, so its atoms vibrate less', 'the electrons stop moving in their orbits'],
  sol: 'In weak fields the domain walls shift, so favourably oriented domains enlarge. In stronger fields whole domains rotate towards the field, until the sample saturates — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('units-match', match({
  stem: 'Match each quantity describing a magnetised steel bar (Column A) with its SI unit (Column B).',
  pairs: [
    ['Magnetic flux through its cross-section', 'weber'],
    ['Magnetic field B inside it', 'tesla, i.e. Wb m⁻²'],
    ['Its magnetic moment', 'A m²'],
    ['Its magnetisation M', 'A m⁻¹'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Flux → weber (1 → s); field B → tesla (2 → q); magnetic moment → A m² (3 → p); magnetisation → A m⁻¹ (4 → r).',
  d: 1, c: 'recall', t: [3, 4],
}));
add('curie-ar', ar({
  a: 'The susceptibility of a paramagnetic salt rises when the salt is cooled.',
  r: 'At lower temperatures thermal agitation upsets the alignment of the permanent atomic magnetic moments less.',
  key: 'a',
  sol: 'Both true, and R explains A: the field lines up the permanent moments more effectively when thermal agitation is weaker, so χ = C/T rises — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ferro-ar', ar({
  a: 'Iron heated above its Curie temperature (about 1043 K) can no longer hold any permanent magnetisation.',
  r: 'Above its Curie temperature iron becomes diamagnetic.',
  key: 'c',
  sol: 'A is true: thermal agitation destroys the alignment within the domains. R is false: iron becomes paramagnetic, not diamagnetic — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('classify-short', short({
  marks: 2,
  stem: 'Three samples X, Y and Z have susceptibilities −2.3 × 10⁻⁵, +6.0 × 10⁻⁴ and +2.0 × 10³. Classify each, and say which is pushed out of, and which is most strongly pulled into, the strong-field region near a magnet pole.',
  model: 'X: small negative χ, so **diamagnetic**. Y: small positive χ, so **paramagnetic**. Z: very large positive χ, so **ferromagnetic**. X is **pushed weakly towards the weaker field**, away from the pole; Z is **pulled in most strongly**, while Y is attracted only feebly.',
  sol: 'Classify by sign and size of χ.',
  scheme: [['X dia, Y para, Z ferro', 1], ['X pushed out; Z pulled in most strongly', 1]],
  d: 2, c: 'application', t: [4],
}));
add('warm-short', short({
  marks: 2,
  stem: 'A paramagnetic salt in a fixed magnetising field is warmed from 200 K to 400 K. By what factor does its magnetisation change? Explain in terms of its atomic magnetic moments.',
  model: 'By Curie’s law χ = C/T, so at fixed H, **M = χH ∝ 1/T**: doubling T **halves** M (factor 0.5). The atoms carry **permanent moments** that the field tries to line up; stronger **thermal agitation** at the higher temperature disorders them more, so fewer point along the field.',
  sol: 'M ∝ 1/T at fixed H.',
  scheme: [['M halves (M ∝ 1/T)', 1], ['Thermal agitation disorders the permanent moments', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(200 / 400, 0.5) || 'warm');
const cs = { n: 1200, I: 0.75, mur: 850 };
cs.H = cs.n * cs.I;
cs.B = MU0 * cs.mur * cs.H;
cs.M = (cs.mur - 1) * cs.H;
add('core-short3', short({
  marks: 3,
  stem: 'A long solenoid with 1200 turns per metre carries a current of 0.75 A and is wound on a core of relative permeability 850. Calculate (a) the magnetic intensity H, (b) the magnetic field B in the core, (c) the magnetisation M of the core.',
  model: r`(a) $H = nI = 1200 \times 0.75 = ${cs.H}$ A m$^{-1}$.
(b) $B = \mu_0\mu_rH = 4\pi \times 10^{-7} \times 850 \times 900 \approx ${dec(cs.B, 3)}$ T.
(c) $M = (\mu_r - 1)H = 849 \times 900 = ${cs.M}$ A m$^{-1}$, about $${sci(cs.M, 3)}$ A m$^{-1}$.`,
  sol: 'H = nI; B = μ₀μrH; M = χH.',
  scheme: [['H = 900 A m⁻¹', 1], ['B ≈ 0.961 T', 1], ['M ≈ 7.64 × 10⁵ A m⁻¹', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => cs.H === 900 && near(cs.B, 0.96133, 0.001) && cs.M === 764100 || `cs ${cs.B}`);
const cuMur = 1 - 9.6e-6;
add('murchi-short3', short({
  marks: 3,
  stem: 'Explain the meaning of the magnetisation M, the magnetic intensity H and the susceptibility χ of a sample placed in a solenoid. Use B = μ₀(H + M) to show that μr = 1 + χ, and hence find the relative permeability of copper, whose susceptibility is −9.6 × 10⁻⁶.',
  model: r`**M** is the net magnetic moment per unit volume of the sample; **H** is the magnetic intensity due to the current in the solenoid ($nI$); both in A m$^{-1}$. **χ** = M/H, a pure number. With $M = \chi H$, $B = \mu_0(H + \chi H) = \mu_0(1 + \chi)H$; comparing with $B = \mu_0\mu_rH$ gives $\mu_r = 1 + \chi$. For copper $\mu_r = 1 - 0.0000096 = ${cuMur}$, just below 1: diamagnetic.`,
  sol: 'Substitute M = χH.',
  scheme: [['Meanings of M, H, χ', 1], ['μr = 1 + χ derived', 1], ['μr ≈ 0.9999904 for copper', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}), () => near(cuMur, 0.9999904, 1e-9) || 'cuMur');
add('atomic-short3', short({
  marks: 3,
  stem: 'Using the behaviour of atomic magnetic moments, explain why (a) every material shows some diamagnetism, (b) the susceptibility of a paramagnet depends on temperature while that of a diamagnet hardly does, (c) a ferromagnet can have a susceptibility of several thousand.',
  model: '(a) An applied field alters the **orbital motion** of electrons in every atom, **inducing** small moments that **oppose** it; this is masked when permanent moments exist. (b) Paramagnetism comes from **aligning permanent moments**, which **thermal agitation** disorders, so χ = C/T; induced moments need no alignment, so diamagnetic χ is nearly **independent of T**. (c) In a ferromagnet neighbouring moments line up **spontaneously in domains**; a modest field merely **reorients whole domains**, giving a huge M for a small H.',
  sol: 'Induced versus permanent moments; domains.',
  scheme: [['Induced opposing moments in all atoms', 1], ['Thermal agitation affects alignment of permanent moments only', 1], ['Domains reoriented: huge M for small H', 1]],
  d: 3, c: 'understanding', t: [4],
}));
const ox = { n: 2000, I: 0.6, chi: 3.5e-3 };
ox.H = ox.n * ox.I;
ox.M = ox.chi * ox.H;
add('Mfromchi-num', num({
  stem: 'A long solenoid with 2000 turns per metre carries 0.60 A and is filled with a paramagnetic liquid of susceptibility 3.5 × 10⁻³. Find the magnetisation of the liquid, in A m⁻¹.',
  value: Number(dec(ox.M, 2)), tol: 0.05, unit: 'A m⁻¹',
  sol: r`$H = nI = 2000 \times 0.60 = 1200$ A m$^{-1}$; $M = \chi H = 3.5 \times 10^{-3} \times 1200 = ${dec(ox.M, 2)}$ A m$^{-1}$.`,
  scheme: [['H = 1200 A m⁻¹ and M = χH = 4.2 A m⁻¹', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(ox.M, 4.2) && q.answer.value === 4.2 || 'ox');

// ================================================================ t05 electromagnets, the B–H loop, choice of materials
add('thickwire-mcq', mcq({
  stem: 'An electromagnet is a coil wound on a soft-iron core and is used well below saturation. Which one of these changes would NOT make its field stronger?',
  right: 'rewinding the same number of turns with thicker wire, the current being kept the same',
  wrong: ['increasing the current in the coil', 'winding more turns on the same length of core', 'replacing the core with one of higher relative permeability'],
  sol: 'B ≈ μ₀μr nI depends on the turns per unit length, the current and the permeability of the core, not on the thickness of the wire once n and I are fixed — option (@K). (Thicker wire only lets a larger current flow from the same supply.)',
  d: 4, c: 'analysis', t: [5],
}));
add('speaker-mcq', mcq({
  stem: 'The magnet of a moving-coil loudspeaker must keep its magnetisation for many years, despite vibration and the changing field of the voice coil beside it. Its material should have',
  right: 'high retentivity and high coercivity',
  wrong: ['high retentivity and low coercivity', 'low retentivity and low coercivity', 'a susceptibility that is small and negative'],
  sol: 'High retentivity leaves a strong field after magnetisation; high coercivity means a large reverse field is needed to destroy it, so stray fields and knocks do not demagnetise it — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('transformer-mcq', mcq({
  stem: 'For the core of a 230 V, 50 Hz mains transformer, which kind of B–H loop is best?',
  right: 'a tall, narrow loop: high permeability, low coercivity and a small loop area',
  wrong: ['a wide loop with a large area: high coercivity', 'a loop that never saturates, with coercivity as high as possible', 'no loop at all: a diamagnetic core'],
  sol: 'The core is taken round its loop 50 times a second; the energy lost each cycle grows with the loop area, so a narrow loop (low coercivity) keeps the core cool, and high permeability gives a large flux for a small current — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('coercivity-mcq', mcq({
  stem: 'After a ferromagnetic sample has been magnetised to saturation, the reverse magnetic intensity needed to bring its flux density back to zero is called its',
  right: 'coercivity',
  wrong: ['retentivity', 'susceptibility', 'saturation magnetisation'],
  sol: 'The **coercivity** is the reverse H that reduces B to zero; the retentivity is the B left when H is reduced to zero — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('retentivity-fill', fill({
  stem: 'On the B–H loop of a ferromagnet, the flux density that remains when the magnetising field H has been brought back to zero after saturation is called the ___.',
  acc: [['retentivity', 'remanence', 'residual magnetism']],
  sol: 'The **retentivity** (also called remanence or residual magnetism).',
  d: 1, c: 'recall', t: [5],
}));
add('steel-ar', ar({
  a: 'Steel rather than soft iron is chosen for making permanent magnets.',
  r: 'Steel has a much higher coercivity than soft iron, so its magnetisation is not easily destroyed.',
  key: 'a',
  sol: 'Both true, and R explains A: a permanent magnet must resist demagnetisation by knocks and stray fields, which needs a high coercivity — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('coretf-tf', tf({
  stem: 'A material with a large coercivity and a wide B–H loop is a good choice for the core of a transformer.',
  key: 'f',
  sol: 'False. A wide loop means a large energy loss as heat in every cycle; transformer cores need a narrow loop (low coercivity) and high permeability, e.g. soft iron or silicon steel.',
  d: 2, c: 'understanding', t: [5],
}));
add('xfmr-core-short', short({
  marks: 2,
  stem: 'Give two reasons, linked to the B–H loop, why transformer cores are made of soft iron (or silicon steel) and not of hard steel.',
  model: '(i) Soft iron has a **low coercivity**, so its B–H loop is **narrow** and little energy is lost as heat in each of the 50 cycles every second (**small hysteresis loss**). (ii) It has a **high permeability**, so a small magnetising current produces a **large flux** linking both coils. Hard steel has a wide loop and would overheat.',
  sol: 'Narrow loop; high permeability.',
  scheme: [['Low coercivity, narrow loop: small hysteresis loss', 1], ['High permeability: large flux for small current', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('choose-short', short({
  marks: 2,
  stem: 'Two ferromagnetic samples are tested. P has a retentivity of 1.2 T and a coercivity of 50 A m⁻¹; Q has a retentivity of 0.90 T and a coercivity of 4.5 × 10⁴ A m⁻¹. Which would you use for a permanent magnet and which for the core of an electromagnet? Justify your choice.',
  model: '**Q for the permanent magnet**: its very large coercivity means stray fields and knocks cannot easily demagnetise it, and 0.90 T retentivity is ample. **P for the electromagnet core**: its tiny coercivity lets it lose its magnetism as soon as the current is switched off, despite its higher retentivity.',
  sol: 'Coercivity decides.',
  scheme: [['Q for the permanent magnet (high coercivity)', 1], ['P for the electromagnet (low coercivity)', 1]],
  d: 3, c: 'evaluation', t: [5],
}));
add('strengthen-short3', short({
  marks: 3,
  stem: 'An electromagnet made by winding a coil on a soft-iron rod is too weak to lift a load. Suggest three changes that would make it stronger, and explain why raising the current further eventually stops helping.',
  model: 'The field in the core is about μ₀μr nI, so: (i) wind **more turns per unit length**; (ii) pass a **larger current**; (iii) use a core of **higher permeability**, or bend it into a **U shape** so that both poles act on the load across a small air gap. Raising I helps only until the core **saturates**: once nearly all its **domains are aligned**, M cannot grow, so B rises only by the small μ₀H of the coil itself.',
  sol: 'B ≈ μ₀μr nI up to saturation.',
  scheme: [['Two of: more n, more I, higher μr', 1], ['Third valid change (U shape, small gap, etc.)', 1], ['Saturation: domains all aligned', 1]],
  d: 3, c: 'application', t: [5],
}));
add('hyst-short3', short({
  marks: 3,
  stem: 'Describe the B–H loop obtained when a ferromagnetic sample is taken through a complete cycle of magnetisation, and explain what is meant by saturation, retentivity and coercivity on it. (Describe the sketch in words.)',
  model: 'From the unmagnetised state, B rises along a curve as H increases until it levels off at **saturation**, when nearly all the domains are aligned. When H is reduced to zero, B does not return to zero: the value left is the **retentivity**. A reverse H, the **coercivity**, is needed to make B zero. Continuing to large negative H saturates the sample the other way, and bringing H back round closes the loop: B always **lags** behind H.',
  sol: 'Saturation, retentivity, coercivity on the loop.',
  scheme: [['Shape: rises to saturation, loop closed through reverse saturation', 1], ['Retentivity: B at H = 0', 1], ['Coercivity: reverse H for B = 0', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const ab = { B0: 1.6e-3, mur: 700 };
ab.B = ab.mur * ab.B0;
add('airB-num', num({
  stem: 'An air-cored solenoid produces a field of 1.6 mT. A soft-iron core of relative permeability 700 is slid in, and the current is unchanged (the iron stays well below saturation). Find the new field in the core, in tesla.',
  value: Number(dec(ab.B, 3)), tol: 0.01, unit: 'T',
  sol: r`$B = \mu_rB_0 = 700 \times 1.6 \times 10^{-3} = ${dec(ab.B, 3)}$ T.`,
  scheme: [['B = μr B₀ = 1.12 T', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(ab.B, 1.12) && q.answer.value === 1.12 || 'ab');
const ec2 = { N: 400, len: 0.25, mur: 900, B: 1.2 };
ec2.n = ec2.N / ec2.len;
ec2.den = MU0 * ec2.mur * ec2.n;
ec2.I = ec2.B / ec2.den;
add('emcurrent-num', num({
  stem: 'A coil of 400 turns is wound uniformly along a soft-iron core 25 cm long, of relative permeability 900. What current is needed to produce a field of 1.2 T in the core? Give the answer in amperes (3 significant figures).',
  value: Number(dec(ec2.I, 3)), tol: 0.005, unit: 'A',
  sol: r`$n = \dfrac{400}{0.25} = 1600$ m$^{-1}$. $I = \dfrac{B}{\mu_0\mu_rn} = \dfrac{1.2}{4\pi \times 10^{-7} \times 900 \times 1600} \approx \dfrac{1.2}{${dec(ec2.den, 4)}} = ${dec(ec2.I, 3)}$ A.`,
  scheme: [['n = 1600 m⁻¹', 1], ['I ≈ 0.663 A', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(ec2.I, 0.66315, 0.001) && q.answer.value === 0.663 || `ec2 ${ec2.I}`);

// ================================================================ 5-mark questions (in parts)
const sl = { len: 0.3, N: 900, r: 0.012, I: 2 };
sl.A = Math.PI * sl.r ** 2;
sl.m = sl.N * sl.I * sl.A;
sl.n = sl.N / sl.len;
sl.B = MU0 * sl.n * sl.I;
sl.phi = sl.B * sl.A;
add('solenoid-long', long({
  stem: '(a) Compare the field lines of a bar magnet with those of a current-carrying solenoid, and explain why magnetic field lines always form closed loops. [2] (b) A solenoid 30 cm long has 900 turns of radius 1.2 cm and carries 2.0 A. Find (i) its magnetic moment, (ii) the magnetic field near its centre, (iii) the magnetic flux through its cross-section there. [3]',
  model: r`(a) Outside, both give the same pattern: lines leave one end (N), curve round and enter the other end (S); inside, the lines run from S to N along the axis, so every line is a closed loop. The magnet behaves as an equivalent solenoid because its aligned atomic current loops act like the turns. Lines close because there are no magnetic monopoles: there is nothing for a line to start or end on.

(b)(i) $A = \pi(0.012)^2 \approx ${sci(sl.A, 3)}$ m²; $m = NIA = 900 \times 2.0 \times ${sci(sl.A, 3)} \approx ${dec(sl.m, 3)}$ A m².
(ii) $n = \dfrac{900}{0.30} = 3000$ m$^{-1}$; $B = \mu_0nI = 4\pi \times 10^{-7} \times 3000 \times 2.0 \approx ${sci(sl.B, 3)}$ T.
(iii) $\Phi = BA \approx ${sci(sl.B, 3)} \times ${sci(sl.A, 3)} \approx ${sci(sl.phi, 3)}$ Wb.`,
  sol: 'Same pattern; no monopoles; m = NIA, B = μ₀nI, Φ = BA.',
  scheme: [['Same pattern; S → N inside, closed loops', 1], ['Closed because no monopoles', 1], ['m ≈ 0.814 A m²', 1], ['B ≈ 7.54 × 10⁻³ T', 1], ['Φ ≈ 3.41 × 10⁻⁶ Wb', 1]],
  d: 3, c: 'application', t: [1, 3], wl: null,
}), () => near(sl.m, 0.8143, 0.001) && near(sl.B, 7.5398e-3, 0.001) && near(sl.phi, 3.4109e-6, 0.001) || `sl ${sl.m} ${sl.phi}`);
const dl = { l: 0.03, m: 0.75, d: 0.04, mn: 0.02 };
dl.B = KM * broadside(dl.m, dl.l, dl.d);
dl.t = dl.mn * dl.B;
add('dipole-long', long({
  stem: '(a) Write the expressions for the magnetic field of a bar magnet of magnetic length 2l and moment m at a point a distance d from its centre (i) end-on, (ii) broadside-on, and state the direction of the field in each position. [2] (b) A bar magnet of magnetic length 6.0 cm has a moment of 0.75 A m². Find the field at a broadside-on point 4.0 cm from its centre. [2] (c) A small compass needle of moment 0.020 A m² is held at that point with its axis perpendicular to the field there. Find the torque on it. [1]',
  model: r`(a)(i) $B = \dfrac{\mu_0}{4\pi}\dfrac{2md}{(d^2 - l^2)^2}$, along m (from the S end towards the N end). (ii) $B = \dfrac{\mu_0}{4\pi}\dfrac{m}{(d^2 + l^2)^{3/2}}$, opposite to m, parallel to the axis of the magnet.

(b) $l = 0.030$ m, $d = 0.040$ m: $d^2 + l^2 = 0.0016 + 0.0009 = 0.0025$ m², so $(d^2 + l^2)^{3/2} = (0.050)^3 = 1.25 \times 10^{-4}$ m³. $B = 10^{-7} \times \dfrac{0.75}{1.25 \times 10^{-4}} = ${sci(dl.B, 2)}$ T.

(c) $\tau = mB\sin 90^\circ = 0.020 \times ${sci(dl.B, 2)} = ${sci(dl.t, 2)}$ N m.`,
  sol: 'Formulae; broadside-on value; τ = mB.',
  scheme: [['End-on formula and direction', 1], ['Broadside-on formula and direction', 1], ['(d² + l²)^(3/2) = 1.25 × 10⁻⁴ m³', 1], ['B = 6.0 × 10⁻⁴ T', 1], ['τ = 1.2 × 10⁻⁵ N m', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(dl.B, 6e-4) && near(dl.t, 1.2e-5) || `dl ${dl.B}`);
const rw = { r: 0.1, N: 500, I: 0.4, B: 0.6 };
rw.H = (rw.N * rw.I) / (2 * Math.PI * rw.r);
rw.B0 = MU0 * rw.H;
rw.mur = rw.B / rw.B0;
rw.M = rw.B / MU0 - rw.H;
add('rowland-long', long({
  stem: '(a) Define the relative permeability and the susceptibility of a material, and state how each identifies a ferromagnetic material. [1] (b) A Rowland ring (an iron toroid) has a mean radius of 10 cm and is wound uniformly with 500 turns carrying 0.40 A. The field measured in the iron is 0.60 T. Find (i) the magnetic intensity H, (ii) the relative permeability of the iron, (iii) its susceptibility and magnetisation. [3] (c) State what would happen to the relative permeability if the ring were heated above 1043 K. [1]',
  model: r`(a) $\mu_r = \mu/\mu_0 = B/\mu_0H$; $\chi = M/H = \mu_r - 1$. For a ferromagnet both are very large (hundreds to thousands).

(b)(i) $H = \dfrac{NI}{2\pi r} = \dfrac{500 \times 0.40}{2\pi \times 0.10} \approx ${dec(rw.H, 3)}$ A m$^{-1}$.
(ii) $\mu_0H = 4\pi \times 10^{-7} \times ${dec(rw.H, 4)} \approx ${sci(rw.B0, 2)}$ T, so $\mu_r = \dfrac{0.60}{${sci(rw.B0, 2)}} = ${Math.round(rw.mur)}$.
(iii) $\chi = \mu_r - 1 = ${Math.round(rw.mur) - 1}$; $M = \chi H \approx ${Math.round(rw.mur) - 1} \times ${dec(rw.H, 3)} \approx ${sci(rw.M, 3)}$ A m$^{-1}$.

(c) 1043 K is the Curie temperature of iron: above it the domains break up, the iron becomes paramagnetic and $\mu_r$ falls to just above 1.`,
  sol: 'H = NI/2πr; μr = B/μ₀H; χ = μr − 1; Curie temperature.',
  scheme: [['Definitions; both very large for a ferromagnet', 1], ['H ≈ 318 A m⁻¹', 1], ['μr = 1500', 1], ['χ = 1499, M ≈ 4.77 × 10⁵ A m⁻¹', 1], ['Above T_C: paramagnetic, μr ≈ 1', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(rw.H, 318.31, 0.001) && near(rw.mur, 1500, 1e-9) && near(rw.M, 4.7715e5, 0.001) || `rw ${rw.mur} ${rw.M}`);
const cl = { chi1: 6.3e-4, T1: 150, chi2: 2.1e-4 };
cl.C = cl.chi1 * cl.T1;
cl.T2 = cl.C / cl.chi2;
add('curie-long', long({
  stem: '(a) Distinguish diamagnetic, paramagnetic and ferromagnetic substances by the sign and size of their susceptibility and relative permeability, giving one example of each. [2] (b) State Curie’s law and explain why paramagnetic susceptibility depends on temperature. [1] (c) A paramagnetic salt has a susceptibility of 6.3 × 10⁻⁴ at 150 K. Find its Curie constant, and the temperature at which its susceptibility is 2.1 × 10⁻⁴. [2]',
  model: r`(a) **Diamagnetic:** χ small and negative (about $-10^{-5}$), $\mu_r$ slightly below 1, e.g. bismuth. **Paramagnetic:** χ small and positive ($10^{-5}$ to $10^{-3}$), $\mu_r$ slightly above 1, e.g. aluminium. **Ferromagnetic:** χ and $\mu_r$ very large (hundreds to thousands), e.g. iron.

(b) $\chi = C/T$: the susceptibility of a paramagnet is inversely proportional to its absolute temperature, because thermal agitation disorders the permanent atomic moments that the field tries to align.

(c) $C = \chi T = 6.3 \times 10^{-4} \times 150 = ${dec(cl.C, 3)}$ K. $T = \dfrac{C}{\chi} = \dfrac{0.0945}{2.1 \times 10^{-4}} = ${Math.round(cl.T2)}$ K.`,
  sol: 'Classes; χ = C/T.',
  scheme: [['Sign and size of χ, μr for the three classes', 1], ['One example of each', 1], ['Curie’s law with reason', 1], ['C = 0.0945 K', 1], ['T = 450 K', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(cl.C, 0.0945) && near(cl.T2, 450) || 'cl');
add('hysteresis-long', long({
  stem: '(a) Describe, as you would draw it, a labelled B–H loop for a ferromagnetic material, marking the retentivity and the coercivity. [2] (b) The loops of soft iron and of steel are compared. State two differences between them. [1] (c) Name, with a reason, a suitable material for (i) the core of the electromagnet in an electric bell, (ii) the magnet of a moving-coil galvanometer, (iii) the core of a step-down transformer. [2]',
  model: r`(a) Axes H (horizontal) and B (vertical). From the origin B rises along a curve to saturation. As H is reduced to zero, B falls only to a positive value, the **retentivity** (intercept on the B axis). A reverse H, the **coercivity** (intercept on the negative H axis), brings B to zero; B then saturates in the reverse direction, and increasing H again closes the loop through the negative retentivity and the positive coercivity.

(b) Soft iron gives a **narrower** loop with a much **smaller coercivity** and a **smaller area** (less energy lost per cycle); its retentivity and permeability are slightly larger than those of steel.

(c)(i) **Soft iron**: high permeability, low coercivity, so the armature is released as soon as the current breaks. (ii) A hard material such as **steel or alnico**: high retentivity and high coercivity, so the magnet stays strong. (iii) **Laminated soft iron or silicon steel**: narrow loop for small hysteresis loss and high permeability.`,
  sol: 'Loop features; soft against hard; choice by property.',
  scheme: [['Loop shape with saturation', 1], ['Retentivity and coercivity marked', 1], ['Two differences: narrower loop, smaller coercivity and area for soft iron', 1], ['Bell: soft iron; galvanometer: steel or alnico', 1], ['Transformer: laminated soft iron or silicon steel, with reasons', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}));
