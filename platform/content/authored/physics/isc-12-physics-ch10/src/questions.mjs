// ISC 12 Physics ch10 Electromagnetic Induction — question bank (ISC style).
// Numbers computed and re-checked.
import { mk, add, r, sci, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { MU0 } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const rad = (d) => (d * Math.PI) / 180;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** Field (z, into the page) at the centre of a loop drawn on the page, from the sense of its current. */
const loopFieldZ = (anticlockwise) => cross(anticlockwise ? [0, -1, 0] : [0, 1, 0], [-1, 0, 0])[2];

// ================================================================ t01 flux and Faraday's laws
add('steady-mcq', mcq({
  stem: 'A 500-turn search coil sits in the gap of an electromagnet whose field has been held steady at 1.2 T for several minutes. The emf across the coil is',
  right: 'zero, since the flux through the coil is not changing',
  wrong: ['large, since the field through the coil is strong', 'proportional to 500 × 1.2 T, the turns times the field', 'equal to the flux linkage of the coil divided by its resistance'],
  sol: 'An emf is induced only while the flux linkage changes. A steady field, however strong, gives dΦ/dt = 0 and so no emf — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const fa = { a: 0.15, B: 0.4, plane: 30 };
fa.th = 90 - fa.plane;
fa.phi = fa.B * fa.a ** 2 * Math.cos(rad(fa.th));
add('fluxangle-num', num({
  stem: 'A square loop of side 15 cm lies in a uniform magnetic field of 0.40 T, with the plane of the loop at 30° to the field. Find the magnetic flux through the loop, in mWb.',
  value: Number(dec(fa.phi * 1e3, 2)), tol: 0.05, unit: 'mWb',
  sol: r`The normal makes $\theta = 90^\circ - 30^\circ = 60^\circ$ with $\vec B$. $\Phi = BA\cos\theta = 0.40 \times (0.15)^2 \times 0.50 = ${sci(fa.phi, 2)}$ Wb, i.e. $${sci(fa.phi, 2)} \times 10^{3} = ${dec(fa.phi * 1e3, 2)}$ mWb.`,
  scheme: [['θ = 60° from the normal; Φ = 4.5 mWb', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(fa.phi, 4.5e-3) && q.answer.value === 4.5 || 'fa');
add('weber-fill', fill({
  stem: 'If the flux linked with a single loop of wire changes steadily by one ___ every second, the emf induced in the loop is one volt.',
  acc: [['weber', 'Wb']],
  sol: 'One **weber** per second: by Faraday’s law the emf is the rate of change of flux, and 1 Wb s⁻¹ = 1 V.',
  d: 1, c: 'recall', t: [1],
}));
const rv = { N: 200, A: 25e-4, B: 0.3, t: 0.015 };
rv.dPhi = 2 * rv.B * rv.A;
rv.emf = (rv.N * rv.dPhi) / rv.t;
add('reversal-num', num({
  stem: 'A 200-turn coil, each turn of area 25 cm², has its plane perpendicular to a uniform field of 0.30 T. The field is reversed, to 0.30 T in the opposite direction, in 15 ms. Find the average emf induced in the coil, in volts.',
  value: Number(dec(rv.emf, 2)), tol: 0.2, unit: 'V',
  sol: r`The flux per turn goes from $+BA$ to $-BA$: $\Delta\Phi = 2BA = 2 \times 0.30 \times 25 \times 10^{-4} = ${sci(rv.dPhi, 2)}$ Wb. $\varepsilon = \dfrac{N\Delta\Phi}{\Delta t} = \dfrac{200 \times ${sci(rv.dPhi, 2)}}{0.015} = ${dec(rv.emf, 2)}$ V.`,
  scheme: [['ΔΦ = 2BA = 1.5 × 10⁻³ Wb per turn', 1], ['ε = 20 V', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(rv.emf, 20) && q.answer.value === 20 || 'rv');
const bt = { N: 120, A: 40e-4, t: 2 };
bt.dBdt = -0.2 * bt.t;
bt.emf = bt.N * bt.A * Math.abs(bt.dBdt);
add('Bt2-num', num({
  stem: 'The field through a 120-turn coil of area 40 cm², whose normal lies along the field, varies as B = (0.80 − 0.10t²) T, with t in seconds. Find the magnitude of the emf induced in the coil at t = 2.0 s, in volts (3 significant figures).',
  value: Number(dec(bt.emf, 3)), tol: 0.002, unit: 'V',
  sol: r`$\dfrac{dB}{dt} = -0.20t$, which at $t = 2.0$ s is $-0.40$ T s$^{-1}$. $|\varepsilon| = NA\left|\dfrac{dB}{dt}\right| = 120 \times 40 \times 10^{-4} \times 0.40 = ${dec(bt.emf, 3)}$ V. (The field is falling, so by Lenz’s law the induced current tries to keep it.)`,
  scheme: [['dB/dt = −0.40 T s⁻¹ at t = 2.0 s', 1], ['|ε| = 0.192 V', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(bt.emf, 0.192) && near(q.answer.value, 0.192) || 'bt');
const ch = { N: 40, A: 2e-4, B: 0.6, R: 80 };
ch.q = (ch.N * ch.B * ch.A) / ch.R;
add('searchcharge-num', num({
  stem: 'A search coil of 40 turns, each of area 2.0 cm², is connected to a charge meter; the total resistance of the circuit is 80 Ω. The coil, held with its plane perpendicular to the field in the gap of a magnet where B = 0.60 T, is snatched out to a place where the field is negligible. Find the charge that flows, in μC.',
  value: Number(dec(ch.q * 1e6, 2)), tol: 0.5, unit: 'μC',
  sol: r`$q = \dfrac{N\Delta\Phi}{R} = \dfrac{40 \times 0.60 \times 2.0 \times 10^{-4}}{80} = ${sci(ch.q, 2)}$ C, i.e. $${sci(ch.q, 2)} \times 10^{6} = ${dec(ch.q * 1e6, 2)}$ μC, however quickly the coil is removed.`,
  scheme: [['q = NΔΦ/R', 1], ['q = 60 μC', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(ch.q, 6e-5) && q.answer.value === 60 || 'ch');
const sp = { N: 25, dPhi: 6e-3, t: 0.3 };
sp.emf = (sp.N * sp.dPhi) / sp.t;
add('slope-mcq', mcq({
  stem: 'The flux through each turn of a 25-turn coil rises at a steady rate from zero to 6.0 mWb in 0.30 s and then stays at 6.0 mWb. While the flux is rising, the emf across the whole coil is',
  right: '0.50 V',
  wrong: ['20 mV', '0.15 V', 'zero, since the flux settles at a steady value'],
  sol: r`$\varepsilon = N\dfrac{\Delta\Phi}{\Delta t} = 25 \times \dfrac{6.0 \times 10^{-3}}{0.30} = ${dec(sp.emf, 2)}$ V. 20 mV is the emf of one turn; 0.15 V forgets to divide by the time; the emf is zero only after the flux stops changing — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(sp.emf, 0.5) || 'sp');
add('coilratio-mcq', mcq({
  stem: 'Coil P has 100 turns, each of area A. Coil Q has 300 turns, each of area A/2. Both lie with their planes perpendicular to the same uniform field, which is changing steadily. The ratio of the emf in P to the emf in Q is',
  right: '2 : 3',
  wrong: ['3 : 2', '1 : 3', '1 : 6'],
  sol: r`$\varepsilon = NA\,\dfrac{dB}{dt}$, so $\dfrac{\varepsilon_P}{\varepsilon_Q} = \dfrac{100A}{300 \times A/2} = \dfrac{100}{150} = \dfrac{2}{3}$ — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => near((100 * 1) / (300 * 0.5), 2 / 3) || 'cr');
add('charge-ar', ar({
  a: 'Whether a magnet is withdrawn slowly or quickly from a closed coil, the same total charge flows round the coil.',
  r: 'The emf induced in the coil is larger when the magnet is withdrawn more quickly.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. The charge is q = NΔΦ/R, which depends only on the total change of flux and the resistance; a quicker change gives a larger emf and current for a shorter time — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('faraday-short2', short({
  marks: 2,
  stem: 'State Faraday’s first and second laws of electromagnetic induction, and write the second law as an equation for a coil of N turns.',
  model: r`**First law:** an emf is induced in a circuit whenever the magnetic flux linked with it changes, and it lasts only while the change continues. **Second law:** the induced emf equals the rate of change of the flux linkage: $\varepsilon = -N\,\dfrac{d\Phi}{dt}$, where the minus sign expresses Lenz’s law.`,
  sol: 'Changing flux linkage induces an emf; ε = −N dΦ/dt.',
  scheme: [['First law: emf while the flux linkage changes', 1], ['Second law: ε = −N dΦ/dt', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('threeways-short2', short({
  marks: 2,
  stem: 'A coil is joined to a galvanometer. Without moving any magnet, describe three different ways of making a current flow in the coil, naming the quantity in Φ = BA cos θ that changes in each.',
  model: '(i) Switch the current on or off in a nearby electromagnet, so that **B** changes. (ii) Squeeze or stretch the coil, if it is flexible, to change its **area A**. (iii) Rotate the coil in a steady field so that the **angle θ** changes. Each changes the flux, and a current flows only while the change happens.',
  sol: 'Change B, A or θ.',
  scheme: [['Any two of the three ways, with the changing quantity', 1], ['The third way, and the current lasts only during the change', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const gr = { N: 40 };
gr.e1 = (gr.N * 8e-3) / 2;
gr.e3 = (gr.N * 12e-3) / 1;
add('graph-short3', short({
  marks: 3,
  stem: 'The flux through each turn of a 40-turn coil rises steadily from zero to 8.0 mWb between t = 0 and t = 2.0 s, stays at 8.0 mWb until t = 5.0 s, and then changes steadily to −4.0 mWb (the reverse direction) by t = 6.0 s. Find the emf across the coil in each of the three intervals and compare their directions.',
  model: r`0 to 2.0 s: $\varepsilon = N\dfrac{\Delta\Phi}{\Delta t} = \dfrac{40 \times 8.0 \times 10^{-3}}{2.0} = ${dec(gr.e1, 2)}$ V.
2.0 s to 5.0 s: the flux is constant, so $\varepsilon = 0$.
5.0 s to 6.0 s: $\Delta\Phi = -4.0 - 8.0 = -12$ mWb, so $|\varepsilon| = \dfrac{40 \times 12 \times 10^{-3}}{1.0} = ${dec(gr.e3, 2)}$ V, three times the first value and in the **opposite** direction, because the flux now decreases instead of increasing.`,
  sol: 'emf = N × slope of the Φ–t graph.',
  scheme: [['0.16 V in the first interval', 1], ['Zero in the second', 1], ['0.48 V, opposite direction, in the third', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(gr.e1, 0.16) && near(gr.e3, 0.48) || 'gr');
const cd = { N: 150, A: 12e-4, B: 0.25, R: 9 };
cd.dPhi = cd.B * cd.A;
cd.q = (cd.N * cd.dPhi) / cd.R;
add('chargederive-short3', short({
  marks: 3,
  stem: 'Show that the charge that flows round a closed coil of N turns and resistance R, when the flux through each turn changes by ΔΦ, is NΔΦ/R whatever the time taken. A 150-turn coil of area 12 cm² and resistance 9.0 Ω has its plane perpendicular to a 0.25 T field; it is turned until its plane is parallel to the field. Find the charge that flows.',
  model: r`At any instant $I = \dfrac{|\varepsilon|}{R} = \dfrac{N}{R}\left|\dfrac{d\Phi}{dt}\right|$, so $dq = I\,dt = \dfrac{N}{R}|d\Phi|$. Adding over the whole change, $q = \dfrac{N\Delta\Phi}{R}$: the time cancels.
Here the flux per turn falls from $BA$ to zero: $\Delta\Phi = 0.25 \times 12 \times 10^{-4} = ${sci(cd.dPhi, 2)}$ Wb, so $q = \dfrac{150 \times ${sci(cd.dPhi, 2)}}{9.0} = ${sci(cd.q, 2)}$ C (5.0 mC).`,
  sol: 'dq = I dt = (N/R) dΦ.',
  scheme: [['I dt = (N/R) dΦ, so q = NΔΦ/R', 1], ['ΔΦ = BA = 3.0 × 10⁻⁴ Wb', 1], ['q = 5.0 × 10⁻³ C', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(cd.q, 5e-3) || 'cd');

// ================================================================ t02 Lenz's law; motional emf
add('pullout-mcq', mcq({
  stem: 'A rectangular loop in the plane of the page is being pulled out of a region where a uniform magnetic field points into the page. Seen from the front, the current induced in the loop',
  right: 'flows clockwise, trying to keep the inward flux through the loop',
  wrong: ['flows anticlockwise, opposing the inward field', 'is zero, because the field in the region is uniform', 'flows clockwise in one half of the loop and anticlockwise in the other'],
  sol: 'The inward flux through the loop is decreasing, so the induced field must point into the page to oppose the decrease. By the right-hand rule that needs a clockwise current as seen from the front — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => loopFieldZ(false) > 0 || 'po');
add('ring-mcq', mcq({
  stem: 'A light aluminium ring hangs from a thread with its plane vertical. The north pole of a bar magnet is moved quickly towards the ring along its axis. The ring',
  right: 'swings away from the approaching magnet',
  wrong: ['swings towards the approaching magnet', 'stays still, because aluminium is not attracted by magnets', 'turns until its plane lies along the magnet'],
  sol: 'The flux through the ring grows, so the induced current makes the near face of the ring a north pole, which repels the approaching north pole: the ring swings away — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('wireloop-mcq', mcq({
  stem: 'A long straight wire in the plane of the page carries a current towards the top of the page. A rectangular loop lies in the page to the left of the wire. The current in the wire is steadily reduced. Seen from the front, the current induced in the loop is',
  right: 'anticlockwise',
  wrong: ['clockwise', 'zero, since the loop does not move', 'clockwise at first, then anticlockwise'],
  sol: 'To the left of a wire carrying current up the page, the field points out of the page. That outward flux is decreasing, so the induced field must also point out of the page, which needs an anticlockwise current seen from the front — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => {
  // wire current up the page (−y on screen); point to its left (−x); z into the page
  const B = cross([0, -1, 0], [-1, 0, 0]);
  return (B[2] < 0 && loopFieldZ(true) < 0) || 'wl';
});
add('wireoff-tf', tf({
  stem: 'When the current in a long straight wire is switched off, the current induced in a nearby closed loop flows so as to keep up, for a moment, the flux that the wire had been sending through the loop.',
  key: 't',
  sol: 'True. The flux through the loop is falling, so by Lenz’s law the induced current sets up a field in the same direction as the wire’s field, opposing the decrease.',
  d: 2, c: 'understanding', t: [2],
}));
add('closedcoil-ar', ar({
  a: 'Pushing a bar magnet towards a closed copper coil takes more effort than pushing it at the same speed towards an identical coil whose wire has been cut.',
  r: 'The current induced in the closed coil sets up a magnetic field that repels the approaching magnet.',
  key: 'a',
  sol: 'Both true, and R explains A: only the closed coil carries an induced current, and by Lenz’s law its field repels the magnet, so extra work is needed; the cut coil has an emf but no current — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('lenzeval-short2', short({
  marks: 2,
  stem: 'An inventor claims to have designed a coil in which the induced current helps a magnet move towards the coil, so that the magnet speeds up by itself while the coil warms up. Evaluate the claim using Lenz’s law.',
  model: 'The claim must be **false**. If the induced current aided the motion, the magnet would gain kinetic energy and the coil would gain heat with **no work done** by anyone: energy would be created from nothing. Conservation of energy requires the induced current to **oppose** the change (Lenz’s law), so work must be done to move the magnet.',
  sol: 'Aiding current would create energy from nothing.',
  scheme: [['Aiding current would give energy with no work done', 1], ['Energy conservation requires opposition (Lenz’s law): claim false', 1]],
  d: 3, c: 'evaluation', t: [2],
}));
const an = { B: 3.6e-5, l: 0.9, v: 25 };
an.emf = an.B * an.l * an.v;
add('antenna-num', num({
  stem: 'A car with a vertical radio antenna 0.90 m long drives due east at 25 m s⁻¹. The horizontal component of the Earth’s magnetic field there is 3.6 × 10⁻⁵ T, pointing north. Find the emf between the ends of the antenna, in mV.',
  value: Number(dec(an.emf * 1e3, 2)), tol: 0.01, unit: 'mV',
  sol: r`The antenna, its velocity and the horizontal field are mutually perpendicular, so $\varepsilon = Blv = 3.6 \times 10^{-5} \times 0.90 \times 25 = ${sci(an.emf, 2)}$ V, i.e. $${sci(an.emf, 2)} \times 10^{3} = ${dec(an.emf * 1e3, 2)}$ mV. ($\vec v \times \vec B$ points upwards, so the top end is positive; the vertical component of the field pushes charges sideways, not along the antenna.)`,
  scheme: [['ε = B_H l v = 0.81 mV', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => {
  const f = cross([1, 0, 0], [0, 1, 0]); // east × north (z up)
  return (near(an.emf, 8.1e-4) && f[2] > 0 && near(q.answer.value, 0.81)) || 'an';
});
const ri = { B: 0.25, l: 0.48, v: 2.5, R: 0.2 };
ri.emf = ri.B * ri.l * ri.v;
ri.I = ri.emf / ri.R;
add('railI-num', num({
  stem: 'A conducting bar 0.48 m long slides at 2.5 m s⁻¹ along rails joined by a 0.20 Ω resistor, in a uniform field of 0.25 T perpendicular to the plane of the rails. The bar and rails have negligible resistance. Find the current, in amperes.',
  value: Number(dec(ri.I, 2)), tol: 0.02, unit: 'A',
  sol: r`$\varepsilon = Blv = 0.25 \times 0.48 \times 2.5 = ${dec(ri.emf, 2)}$ V; $I = \dfrac{\varepsilon}{R} = \dfrac{${dec(ri.emf, 2)}}{0.20} = ${dec(ri.I, 2)}$ A.`,
  scheme: [['ε = 0.30 V; I = 1.5 A', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(ri.I, 1.5) && q.answer.value === 1.5 || 'ri');
const vs = { B: 0.6, l: 0.25, R: 0.45, P: 1.25 };
vs.emf = Math.sqrt(vs.P * vs.R);
vs.v = vs.emf / (vs.B * vs.l);
add('speed-num', num({
  stem: 'A bar 25 cm long is pulled along rails in a uniform field of 0.60 T perpendicular to their plane; the circuit resistance is 0.45 Ω. At what steady speed must it move for the resistor to dissipate 1.25 W? Answer in m s⁻¹.',
  value: Number(dec(vs.v, 2)), tol: 0.05, unit: 'm s⁻¹',
  sol: r`$P = \dfrac{(Blv)^2}{R}$, so $Blv = \sqrt{PR} = \sqrt{1.25 \times 0.45} = ${dec(vs.emf, 2)}$ V and $v = \dfrac{${dec(vs.emf, 2)}}{0.60 \times 0.25} = ${dec(vs.v, 2)}$ m s$^{-1}$.`,
  scheme: [['Blv = √(PR) = 0.75 V', 1], ['v = 5.0 m s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(vs.v, 5) && q.answer.value === 5 || 'vs');
add('Bdouble-mcq', mcq({
  stem: 'A bar is kept moving at a steady speed along rails joined by a resistor, in a uniform magnetic field perpendicular to the rails. The field is doubled, while the speed and the resistance stay the same. The force needed to keep the bar moving and the power supplied by the agent become',
  right: 'force × 4, power × 4',
  wrong: ['force × 2, power × 2', 'force × 2, power × 4', 'force × 4, power × 2'],
  sol: r`$F = \dfrac{B^2l^2v}{R}$ and $P = Fv = \dfrac{B^2l^2v^2}{R}$: both vary as $B^2$, so both become four times as large — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => {
  const F = (B) => (B * B * 1 * 1) / 1;
  return near(F(2) / F(1), 4) || 'bd';
});
add('rodalong-ar', ar({
  a: 'A metal rod moving along its own length through a uniform magnetic field has an emf induced between its ends.',
  r: 'The magnetic force on a free charge carried along by the rod is perpendicular to the rod’s velocity.',
  key: 'd',
  sol: 'R is true: F = qv × B is perpendicular to v. A is false: when v is along the rod, that force is perpendicular to the rod, so no charge is pushed from one end to the other and there is no emf between the ends (the rod also sweeps out no area) — option (d).',
  d: 3, c: 'analysis', t: [2],
}), () => {
  const v = [1, 0, 0];
  const f = cross(v, [0, 0.6, 0.8]);
  return Math.abs(f[0]) < 1e-12 || 'ra';
});
add('push-short2', short({
  marks: 2,
  stem: 'A bar lying across smooth horizontal rails, joined at one end through a resistor, sits in a vertical magnetic field. It is given a quick push along the rails and released. Describe its motion and say what becomes of its kinetic energy.',
  model: 'The moving bar has a motional emf **Blv**, so a current flows and the field exerts a force **B²l²v/R** on the bar that **opposes its motion** (Lenz’s law). The bar slows down, ever more gently as v falls, and comes to rest. Its kinetic energy is turned into **heat** in the resistor and the bar.',
  sol: 'Drag ∝ v slows it; KE → heat.',
  scheme: [['Induced current gives a drag force opposing the motion: bar slows and stops', 1], ['Kinetic energy becomes heat in the circuit', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('motional-short3', short({
  marks: 3,
  stem: 'A straight conductor of length l moves with velocity v perpendicular to itself and to a uniform magnetic field B. Using the magnetic force on its free charges, show that the emf between its ends is Blv. If the conductor lies north–south, moves east, and the field points vertically upwards, which end is at the higher potential?',
  model: r`Each free charge $q$ moves with the conductor and feels $\vec F = q\vec v \times \vec B$, of size $qvB$, along the conductor. Charges pile up at the ends until the electric field $E$ they create balances this force: $qE = qvB$, so $E = vB$. The p.d. between the ends, which is the emf, is $\varepsilon = El = Blv$.
With $\vec v$ east and $\vec B$ up, $\vec v \times \vec B$ points **south**, so positive charges are pushed to the south end: the **south end** is at the higher potential.`,
  sol: 'qE = qvB; ε = El = Blv; v × B points south.',
  scheme: [['Force qvB along the conductor separates charges', 1], ['qE = qvB, so ε = El = Blv', 1], ['v × B is south: south end at higher potential', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => {
  // x east, y north, z up
  const f = cross([1, 0, 0], [0, 0, 1]);
  return f[1] < 0 || 'mo';
});
const lo = { a: 0.1, R: 0.02, v: 0.5, B: 0.8 };
lo.emf = lo.B * lo.a * lo.v;
lo.I = lo.emf / lo.R;
lo.F = lo.B * lo.I * lo.a;
lo.W = lo.F * lo.a;
lo.t = lo.a / lo.v;
lo.H = lo.I ** 2 * lo.R * lo.t;
add('loopout-short3', short({
  marks: 3,
  stem: 'A single square loop of wire of side 10 cm and resistance 0.020 Ω lies with its plane perpendicular to a uniform field of 0.80 T. It is pulled out of the field at a steady 0.50 m s⁻¹, one side leaving first. Find (a) the emf and current while it leaves, (b) the force needed, (c) the work done in pulling it completely out, and show that this equals the heat produced.',
  model: r`(a) Only one side cuts the field lines: $\varepsilon = Blv = 0.80 \times 0.10 \times 0.50 = ${dec(lo.emf, 2)}$ V; $I = \dfrac{${dec(lo.emf, 2)}}{0.020} = ${dec(lo.I, 2)}$ A.
(b) The side still in the field feels $F = BIl = 0.80 \times ${dec(lo.I, 2)} \times 0.10 = ${dec(lo.F, 2)}$ N opposing the motion, so an equal pull is needed.
(c) $W = Fd = ${dec(lo.F, 2)} \times 0.10 = ${dec(lo.W, 2)}$ J. The loop takes $\dfrac{0.10}{0.50} = ${dec(lo.t, 2)}$ s to leave, and the heat is $I^2Rt = ${dec(lo.I, 2)}^2 \times 0.020 \times ${dec(lo.t, 2)} = ${dec(lo.H, 2)}$ J, the same.`,
  sol: 'ε = Blv; F = BIl; W = Fd = I²Rt.',
  scheme: [['ε = 0.040 V, I = 2.0 A', 1], ['F = 0.16 N', 1], ['W = 0.016 J = I²Rt', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(lo.emf, 0.04) && near(lo.I, 2) && near(lo.F, 0.16) && near(lo.W, 0.016) && near(lo.H, lo.W) || 'lo');

// ================================================================ t03 eddy currents (qualitative)
add('eddy-tf', tf({
  stem: 'Eddy currents can flow in a metal sheet that is held perfectly still, provided the magnetic flux through the sheet is changing.',
  key: 't',
  sol: 'True. Any change of flux through a conductor induces eddy currents: the metal may move through a steady field, or stay still in a changing field (as in a transformer core or under an induction cooktop).',
  d: 2, c: 'understanding', t: [3],
}));
add('lamination-mcq', mcq({
  stem: 'The armature core of an electric motor is assembled from thin steel stampings, each coated with varnish, rather than machined from one solid block of steel. The main purpose is to',
  right: 'confine the eddy currents to thin sheets, where their paths have a high resistance, cutting the heating loss',
  wrong: ['stop the magnetic flux from passing through the core', 'make the core more strongly magnetised by the winding current', 'reduce the I²R heating in the copper windings'],
  sol: 'The varnish insulates the stampings from one another, so eddy currents can circulate only within each thin sheet; these small paths carry far smaller currents and waste far less heat. The flux still passes along the sheets — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('pendulum-mcq', mcq({
  stem: 'A flat copper plate hangs as a pendulum and swings between the poles of an electromagnet. When the electromagnet is switched on, the plate',
  right: 'stops swinging within a few swings, as eddy currents turn its energy into heat',
  wrong: ['is pulled to one pole and sticks there, as copper is strongly magnetic', 'swings with a larger amplitude, as the field adds energy to it', 'swings exactly as before, because copper is not magnetic'],
  sol: 'As the plate moves through the field, eddy currents are induced in it; by Lenz’s law they oppose the motion, so the swing is damped and its energy appears as heat in the plate — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('slotted-ar', ar({
  a: 'A copper plate with deep slots cut across it swings much more freely between the poles of a magnet than a solid copper plate of the same size.',
  r: 'The slots break up the paths of the eddy currents, so the currents and the opposing force are much smaller.',
  key: 'a',
  sol: 'Both true, and R explains A: with the eddy-current loops broken by the slots, much less current flows, so the damping force that opposes the swing is much smaller — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('deadbeat-fill', fill({
  stem: 'A galvanometer whose coil, wound on a metal frame, settles at once without oscillating, because eddy currents in the frame damp its swing, is called a ___ galvanometer.',
  acc: [['dead-beat', 'deadbeat', 'dead beat']],
  sol: 'A **dead-beat** galvanometer: eddy currents in the metal frame oppose the motion of the coil and stop it at its final deflection.',
  d: 1, c: 'recall', t: [3],
}));
add('eddyuses-match', match({
  stem: 'Match each device in Column A with the part that eddy currents play in it, in Column B.',
  pairs: [
    ['Induction cooktop', 'Currents induced in the base of the pan heat the pan directly'],
    ['Electromagnetic brake of a metro train', 'Currents induced in a moving disc or rail produce a force that slows it'],
    ['Dead-beat galvanometer', 'Currents in the metal frame of the coil stop it from oscillating'],
    ['Transformer core', 'Unwanted heating, kept small by building the core from insulated sheets'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Cooktop → heating the pan (1 → q); brake → force opposing the motion (2 → s); dead-beat galvanometer → damping by the frame (3 → p); transformer core → unwanted heating reduced by lamination (4 → r).',
  d: 2, c: 'understanding', t: [3],
}));
add('cooktop-short2', short({
  marks: 2,
  stem: 'An induction cooktop heats a steel pan placed on it but hardly warms a glass dish of water. Explain this, and why the cooktop coil carries a current that alternates many thousands of times a second.',
  model: 'The coil under the glass top makes a rapidly **changing magnetic field**. In the conducting base of the steel pan this induces large **eddy currents**, which heat the metal directly. Glass is an insulator, so no eddy currents flow in the dish. A **faster** change of flux induces a larger emf and so larger eddy currents and more heat.',
  sol: 'Eddy currents only in conductors; faster change, more heating.',
  scheme: [['Changing field induces eddy currents in the metal pan; none in glass (insulator)', 1], ['High frequency: faster change gives larger eddy currents', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('train-short2', short({
  marks: 2,
  stem: 'Metro trains do most of their braking with eddy-current brakes, but they still carry ordinary friction brakes. Evaluate why the eddy-current brake alone cannot hold a stopped train on a slope.',
  model: 'An eddy-current brake needs **relative motion**: the eddy currents and the opposing force grow with the **speed** of the disc or rail. As the train slows the force fades, and at rest it is **zero**, so it cannot hold the train on a slope. Friction brakes are still needed to stop and hold it.',
  sol: 'Eddy-current force ∝ speed; zero at rest.',
  scheme: [['Braking force needs motion and falls with speed', 1], ['Zero at rest, so friction brakes are needed to hold the train', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
add('eddy-short3', short({
  marks: 3,
  stem: 'What are eddy currents and how are they produced? Give one harmful effect and one useful application of eddy currents, and explain how laminating the core of a transformer reduces the harmful effect.',
  model: 'Eddy currents are **induced currents** that circulate in closed loops inside a bulk piece of metal when the magnetic flux through it **changes**, because the metal moves in a field or the field itself changes. **Harmful:** they heat the iron cores of transformers and motors, wasting energy. **Useful:** an induction furnace or cooktop heats metal with them (or a train’s electromagnetic brake). **Lamination:** the core is built from thin sheets insulated by varnish, so the eddy currents can only circulate in small loops of high resistance within each sheet, and the heat produced is much smaller.',
  sol: 'Induced loops in bulk metal; heating loss; furnace or brake; lamination breaks the loops.',
  scheme: [['Definition and cause (changing flux through bulk metal)', 1], ['One harmful effect and one use', 1], ['Lamination confines currents to thin, high-resistance sheets', 1]],
  d: 2, c: 'understanding', t: [3], wl: [50, 90],
}));

// ================================================================ t04 self-induction
add('stretch-mcq', mcq({
  stem: 'An air-cored solenoid is gently stretched to twice its length, keeping the same number of turns and the same cross-section, and remaining long compared with its width. Its self-inductance',
  right: 'is halved',
  wrong: ['is doubled', 'is unchanged', 'becomes a quarter of its value'],
  sol: r`$L = \dfrac{\mu_0N^2A}{l}$: with N and A fixed, doubling l halves L (the turns are more widely spaced, so the field and the flux are halved) — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => {
  const L = (l) => (MU0 * 100 ** 2 * 1e-4) / l;
  return near(L(2) / L(1), 0.5) || 'st';
});
add('henry-fill', fill({
  stem: 'A coil has a self-inductance of one ___ if a current through it changing at one ampere per second induces a back emf of one volt across it.',
  acc: [['henry', 'H']],
  sol: 'One **henry**: 1 H = 1 V s A⁻¹ = 1 Wb A⁻¹.',
  d: 1, c: 'recall', t: [4],
}));
const ls = { N: 2400, r: 0.015, l: 0.3 };
ls.L = (MU0 * ls.N ** 2 * Math.PI * ls.r ** 2) / ls.l;
add('Lsol-num', num({
  stem: 'A choke is wound as a single-layer air-cored solenoid of 2400 turns over a length of 30 cm on a former of radius 1.5 cm. Treating it as a long solenoid, find its self-inductance, in mH (3 significant figures).',
  value: Number(dec(ls.L * 1e3, 3)), tol: 0.1, unit: 'mH',
  sol: r`$A = \pi r^2 = \pi \times (0.015)^2$ m². $L = \dfrac{\mu_0N^2A}{l} = \dfrac{4\pi \times 10^{-7} \times 2400^2 \times \pi \times (0.015)^2}{0.30} = ${sci(ls.L, 3)}$ H, i.e. $${sci(ls.L, 3)} \times 10^{3} = ${dec(ls.L * 1e3, 3)}$ mH.`,
  scheme: [['L = μ₀N²πr²/l', 1], ['L ≈ 17.1 mH', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(ls.L, 1.7055e-2, 0.002) && near(q.answer.value, 17.1) || `ls ${ls.L}`);
const be = { L: 0.25, dI: 1.2, t: 0.03 };
be.emf = (be.L * be.dI) / be.t;
add('backemf-num', num({
  stem: 'The current through a coil of self-inductance 250 mH grows steadily from 0.40 A to 1.60 A in 30 ms. Find the size of the back emf, in volts.',
  value: Number(dec(be.emf, 2)), tol: 0.1, unit: 'V',
  sol: r`$|\varepsilon| = L\dfrac{\Delta I}{\Delta t} = 0.25 \times \dfrac{1.20}{0.030} = ${dec(be.emf, 2)}$ V, opposing the rise of current.`,
  scheme: [['|ε| = LΔI/Δt = 10 V', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(be.emf, 10) && q.answer.value === 10 || 'be');
add('Lfind-num', num({
  stem: 'A coil of negligible resistance is connected in a circuit where its current changes at a steady 40 A s⁻¹. A voltmeter across the coil reads 3.2 V. Find the self-inductance of the coil, in mH.',
  value: 80, tol: 1, unit: 'mH',
  sol: r`$L = \dfrac{\varepsilon}{dI/dt} = \dfrac{3.2}{40} = 0.080$ H, i.e. $0.080 \times 10^{3} = 80$ mH.`,
  scheme: [['L = ε ÷ (dI/dt) = 80 mH', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(3.2 / 40, 0.08) || 'lf');
const fl = { N: 400, phi: 2.5e-5, I: 0.5 };
fl.L = (fl.N * fl.phi) / fl.I;
add('fluxL-num', num({
  stem: 'A current of 0.50 A in a coil of 400 turns sets up a flux of 2.5 × 10⁻⁵ Wb through each turn. Find the self-inductance of the coil, in mH.',
  value: Number(dec(fl.L * 1e3, 2)), tol: 0.2, unit: 'mH',
  sol: r`$L = \dfrac{N\Phi}{I} = \dfrac{400 \times 2.5 \times 10^{-5}}{0.50} = ${dec(fl.L, 2)}$ H, i.e. $${dec(fl.L, 2)} \times 10^{3} = ${dec(fl.L * 1e3, 2)}$ mH.`,
  scheme: [['L = NΦ/I = 20 mH', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(fl.L, 0.02) && q.answer.value === 20 || 'fl');
add('Lratio-mcq', mcq({
  stem: 'Two long air-cored solenoids P and Q have the same length. Q has three times as many turns as P, and half its radius. The self-inductance of Q is',
  right: '9/4 times that of P',
  wrong: ['3/2 times that of P', '3/4 of that of P', '9 times that of P'],
  sol: r`$L = \dfrac{\mu_0N^2\pi r^2}{l} \propto N^2r^2$, so $\dfrac{L_Q}{L_P} = 3^2 \times \left(\dfrac{1}{2}\right)^2 = \dfrac{9}{4}$ — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => near((3 ** 2) * 0.5 ** 2, 9 / 4) || 'lr');
add('backzero-ar', ar({
  a: 'The back emf across a coil can be large at an instant when the current through the coil is zero.',
  r: 'The back emf of a coil depends on the rate of change of the current through it, not on the current itself.',
  key: 'a',
  sol: 'Both true, and R explains A: ε = −L dI/dt. Just after a switch is closed the current is zero but rising fastest, so the back emf is at its largest — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('lamps-short2', short({
  marks: 2,
  stem: 'Two identical lamps are connected in parallel to a battery through a single switch: lamp X in series with a large iron-cored coil, and lamp Y in series with a resistor equal to the resistance of the coil. Which lamp reaches full brightness later after the switch is closed? Explain.',
  model: '**Lamp X**. As the current through the coil starts to grow, its self-inductance produces a **back emf** that opposes the rise, so the current in X grows gradually and X brightens slowly. The resistor has no such effect, so Y lights at once. Once the current is steady the back emf is zero, and both lamps are **equally bright**.',
  sol: 'Back emf of the coil delays the rise of current in X.',
  scheme: [['Lamp X is later', 1], ['Back emf opposes the growth of current; equal brightness when steady', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('Lderive-short3', short({
  marks: 3,
  stem: 'Define self-inductance. A long solenoid has n turns per unit length, cross-sectional area A and length l, and is wound on a core of relative permeability μr. Obtain its self-inductance, and state how it changes if n is doubled with l and A unchanged.',
  model: r`Self-inductance is the flux linkage of a coil per unit current through it: $N\Phi = LI$ (equivalently the back emf per unit rate of change of current, $\varepsilon = -L\,dI/dt$).
Inside the solenoid $B = \mu_0\mu_r nI$, so the flux through each turn is $\mu_0\mu_r nIA$. There are $nl$ turns, so the flux linkage is $nl \times \mu_0\mu_r nIA = LI$, giving $L = \mu_0\mu_r n^2Al$.
Since $L \propto n^2$, doubling n makes L **four times** as large.`,
  sol: 'NΦ = LI with B = μ₀μr nI.',
  scheme: [['Definition NΦ = LI', 1], ['B = μ₀μr nI; linkage nl × BA', 1], ['L = μ₀μr n²Al; four times for 2n', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
const lr = { L: 0.15, R: 6, E: 12 };
lr.If = lr.E / lr.R;
lr.r0 = lr.E / lr.L;
lr.r1 = (lr.E - 1 * lr.R) / lr.L;
add('LR-short3', short({
  marks: 3,
  stem: 'A coil of self-inductance 0.15 H and resistance 6.0 Ω is connected through a switch to a 12 V battery of negligible internal resistance. Find (a) the final steady current, (b) the rate at which the current grows at the instant the switch is closed, (c) the rate of growth when the current has reached 1.0 A.',
  model: r`At every instant the battery emf is shared between the back emf and the resistance: $E = L\dfrac{dI}{dt} + IR$.
(a) When steady, $dI/dt = 0$: $I = \dfrac{E}{R} = \dfrac{12}{6.0} = ${dec(lr.If, 2)}$ A.
(b) At switch-on $I = 0$: $\dfrac{dI}{dt} = \dfrac{E}{L} = \dfrac{12}{0.15} = ${dec(lr.r0, 2)}$ A s$^{-1}$.
(c) At $I = 1.0$ A: $\dfrac{dI}{dt} = \dfrac{12 - 1.0 \times 6.0}{0.15} = ${dec(lr.r1, 2)}$ A s$^{-1}$; the growth slows as the current rises.`,
  sol: 'E = L dI/dt + IR.',
  scheme: [['I = E/R = 2.0 A', 1], ['dI/dt = E/L = 80 A s⁻¹', 1], ['dI/dt = 40 A s⁻¹ at 1.0 A', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => near(lr.If, 2) && near(lr.r0, 80) && near(lr.r1, 40) || 'lr3');

// ================================================================ t05 mutual induction
add('Mflux-num', num({
  stem: 'Two coils have a mutual inductance of 1.5 mH. Find the flux linkage of the second coil when a steady current of 4.0 A flows in the first, in mWb.',
  value: 6, tol: 0.05, unit: 'mWb',
  sol: r`$N_2\Phi_2 = MI_1 = 1.5 \times 10^{-3} \times 4.0 = 6.0 \times 10^{-3}$ Wb, i.e. $6.0 \times 10^{-3} \times 10^{3} = 6.0$ mWb (no emf, since the current is steady).`,
  scheme: [['N₂Φ₂ = MI₁ = 6.0 mWb', 1]],
  d: 1, c: 'understanding', t: [5],
}), () => near(1.5e-3 * 4, 6e-3) || 'mf');
const mc = { N1: 300, N2: 1500, l: 0.5, r1: 0.02 };
mc.M = (MU0 * mc.N1 * mc.N2 * Math.PI * mc.r1 ** 2) / mc.l;
add('Mcoax-num', num({
  stem: 'A solenoid of 300 turns and radius 2.0 cm lies coaxially inside a wider solenoid of 1500 turns; both are 50 cm long. Find their mutual inductance, in mH (3 significant figures).',
  value: Number(dec(mc.M * 1e3, 3)), tol: 0.01, unit: 'mH',
  sol: r`$n_1 = \dfrac{300}{0.50}$ and $n_2 = \dfrac{1500}{0.50}$ per metre, so $M = \mu_0n_1n_2\pi r_1^2l = \dfrac{\mu_0N_1N_2\pi r_1^2}{l} = \dfrac{4\pi \times 10^{-7} \times 300 \times 1500 \times \pi \times (0.020)^2}{0.50} = ${sci(mc.M, 3)}$ H, i.e. $${sci(mc.M, 3)} \times 10^{3} = ${dec(mc.M * 1e3, 3)}$ mH.`,
  scheme: [['M = μ₀N₁N₂πr₁²/l with the inner radius', 1], ['M ≈ 1.42 mH', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(mc.M, 1.4213e-3, 0.002) && near(q.answer.value, 1.42) || `mc ${mc.M}`);
const ig = { M: 4, I: 3, t: 1e-3 };
ig.emf = (ig.M * ig.I) / ig.t;
add('ignition-num', num({
  stem: 'In a car’s ignition coil the mutual inductance between the primary and secondary windings is 4.0 H. A primary current of 3.0 A is cut off steadily in 1.0 ms. Find the emf induced in the secondary, in kV.',
  value: Number(dec(ig.emf / 1e3, 2)), tol: 0.1, unit: 'kV',
  sol: r`$|\varepsilon_2| = M\dfrac{\Delta I_1}{\Delta t} = 4.0 \times \dfrac{3.0}{1.0 \times 10^{-3}} = ${dec(ig.emf, 5)}$ V, i.e. $\dfrac{${dec(ig.emf, 5)}}{10^{3}} = ${dec(ig.emf / 1e3, 2)}$ kV, enough to make the spark plug fire.`,
  scheme: [['|ε₂| = M ΔI₁/Δt = 12 kV', 1]],
  d: 2, c: 'application', t: [5],
}), (q) => near(ig.emf, 12000) && q.answer.value === 12 || 'ig');
add('innerarea-mcq', mcq({
  stem: 'In obtaining M = μ₀n₁n₂πr₁²l for a narrow solenoid of radius r₁ inside a wide coaxial solenoid of radius r₂, the area πr₁² is used and not πr₂², because',
  right: 'only the inner area is linked with both coils: the outer coil’s field fills it, and the inner coil’s field is negligible outside it',
  wrong: ['the inner solenoid always has more turns per metre than the outer one', 'the field of the outer solenoid is zero inside the inner solenoid', 'the region between the two solenoids carries a field in the opposite direction'],
  sol: 'With current in the outer coil, its field passes through each inner turn only over the area πr₁². With current in the inner coil, its field is confined to its own cross-section, so the outer turns also link flux only through πr₁². Either way M = μ₀n₁n₂πr₁²l — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('Mvsr-mcq', mcq({
  stem: 'Two long coaxial solenoids have mutual inductance M = μ₀n₁n₂πr₁²l. The inner solenoid is replaced by one of twice the radius (still inside the outer one) with half as many turns per metre. The mutual inductance',
  right: 'doubles',
  wrong: ['is unchanged', 'halves', 'becomes four times as large'],
  sol: r`$M \propto n_1r_1^2$: $\dfrac{1}{2} \times 2^2 = 2$, so M doubles — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}), () => near(0.5 * 2 ** 2, 2) || 'mv');
add('iron-ar', ar({
  a: 'Winding two coils on a common soft-iron core increases their mutual inductance.',
  r: 'The mutual inductance of two coils depends on the current flowing in the first coil.',
  key: 'c',
  sol: 'A is true: soft iron has a large relative permeability, so far more flux from one coil links the other for the same current. R is false: M depends only on the turns, sizes, placing and core of the coils, not on the current — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('Mdefine-short2', short({
  marks: 2,
  stem: 'Define the mutual inductance of a pair of coils in two ways, using (i) the flux linkage of the second coil, (ii) the emf induced in the second coil, and give its SI unit.',
  model: r`(i) M is the flux linkage of the second coil per unit current in the first coil: $N_2\Phi_2 = MI_1$. (ii) M is the emf induced in the second coil per unit rate of change of current in the first coil: $\varepsilon_2 = -M\,\dfrac{dI_1}{dt}$. Its SI unit is the **henry** (H), equal to one weber per ampere.`,
  sol: 'N₂Φ₂ = MI₁; ε₂ = −M dI₁/dt; henry.',
  scheme: [['Flux-linkage definition', 1], ['emf definition and the henry', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('Mderive-short3', short({
  marks: 3,
  stem: 'A long air-cored solenoid of length l has N₁ turns of radius r₁. A second coil of N₂ turns, also of length l, is wound closely over it. Starting from the field inside a long solenoid, show that their mutual inductance is μ₀N₁N₂πr₁²/l, and explain why the result is the same whichever coil carries the current.',
  model: r`A current $I_1$ in the inner solenoid gives a uniform field $B_1 = \dfrac{\mu_0N_1I_1}{l}$ over its cross-section $\pi r_1^2$ and practically none outside. Each turn of the outer coil links flux $B_1\pi r_1^2$, so $N_2\Phi_2 = \dfrac{\mu_0N_1N_2\pi r_1^2}{l}I_1 = MI_1$, giving $M = \dfrac{\mu_0N_1N_2\pi r_1^2}{l}$.
With current $I_2$ in the outer coil instead, $B_2 = \dfrac{\mu_0N_2I_2}{l}$ fills the inner coil, whose $N_1$ turns link $\dfrac{\mu_0N_1N_2\pi r_1^2}{l}I_2$: the same M, because only the shared area $\pi r_1^2$ is linked either way.`,
  sol: 'B₁ = μ₀N₁I₁/l; linkage over πr₁²; reverse roles.',
  scheme: [['B₁ = μ₀N₁I₁/l, zero outside', 1], ['N₂Φ₂ = μ₀N₁N₂πr₁²I₁/l, so M', 1], ['Same with current in the outer coil: only πr₁² linked', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));
const tw = { dI: 5, t: 0.1, emf: 0.6, I: 3, dI2: 5, t2: 0.025 };
tw.M = tw.emf / (tw.dI / tw.t);
tw.link = tw.M * tw.I;
tw.emf2 = tw.M * (tw.dI2 / tw.t2);
add('twocoils-short3', short({
  marks: 3,
  stem: 'When the current in coil P rises steadily from zero to 5.0 A in 0.10 s, an emf of 0.60 V is induced in a nearby coil Q. Find (a) the mutual inductance, (b) the flux linkage of Q when P carries a steady 3.0 A, (c) the emf induced in Q if the 5.0 A current in P is then switched off steadily in 25 ms.',
  model: r`(a) $\dfrac{dI}{dt} = \dfrac{5.0}{0.10} = 50$ A s$^{-1}$, so $M = \dfrac{0.60}{50} = ${dec(tw.M, 2)}$ H (12 mH).
(b) $N_Q\Phi_Q = MI = ${dec(tw.M, 2)} \times 3.0 = ${dec(tw.link, 2)}$ Wb.
(c) $\dfrac{dI}{dt} = \dfrac{5.0}{0.025} = 200$ A s$^{-1}$, so $|\varepsilon| = ${dec(tw.M, 2)} \times 200 = ${dec(tw.emf2, 2)}$ V, in the opposite sense to the emf in (a).`,
  sol: 'M = ε/(dI/dt); NΦ = MI.',
  scheme: [['M = 0.012 H', 1], ['Flux linkage 0.036 Wb', 1], ['emf 2.4 V, reversed', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(tw.M, 0.012) && near(tw.link, 0.036) && near(tw.emf2, 2.4) || 'tw');

// ================================================================ t06 transformer and power transmission
add('turns-num', num({
  stem: 'A step-up transformer for a neon sign raises 230 V mains to 4.6 kV. Its primary has 150 turns. Assuming it is ideal, how many turns does its secondary have?',
  value: 3000, tol: 0, unit: 'turns',
  sol: r`$N_s = N_p\dfrac{V_s}{V_p} = 150 \times \dfrac{4600}{230} = 3000$ turns.`,
  scheme: [['Ns = Np Vs/Vp = 3000', 1]],
  d: 2, c: 'application', t: [6],
}), () => 150 * 4600 / 230 === 3000 || 'tn');
add('dc-mcq', mcq({
  stem: 'By mistake, the primary of a mains transformer is connected to a 12 V car battery. Once the switch has been closed for a few seconds, the voltage across the secondary is',
  right: 'zero',
  wrong: ['12 V multiplied by Ns/Np', '12 V, the same as across the primary', '12 V multiplied by Np/Ns'],
  sol: 'A steady current sets up a steady flux in the core, and a steady flux induces no emf in the secondary. (Only a brief pulse appears at the instant of switching; meanwhile the primary, limited only by its small resistance, may overheat) — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
const ip = { Vs: 12, Is: 4, eta: 0.96, Vp: 230 };
ip.Pout = ip.Vs * ip.Is;
ip.Pin = ip.Pout / ip.eta;
ip.Ip = ip.Pin / ip.Vp;
add('Ip-num', num({
  stem: 'A transformer for a set of 12 V garden lights runs from 230 V mains and supplies 4.0 A to the lights. Its efficiency is 96%. Find the current drawn from the mains, in amperes (3 significant figures).',
  value: Number(dec(ip.Ip, 3)), tol: 0.002, unit: 'A',
  sol: r`Output power $= 12 \times 4.0 = ${dec(ip.Pout, 2)}$ W; input power $= \dfrac{48}{0.96} = ${dec(ip.Pin, 2)}$ W; $I_p = \dfrac{${dec(ip.Pin, 2)}}{230} = ${dec(ip.Ip, 3)}$ A.`,
  scheme: [['Input power 50 W', 1], ['Ip ≈ 0.217 A', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(ip.Pin, 50) && near(ip.Ip, 0.21739, 0.001) && near(q.answer.value, 0.217) || 'ip');
add('eff-num', num({
  stem: 'A transformer delivers 855 W to its load, while its copper and core losses together waste 45 W. Find its efficiency, as a percentage.',
  value: 95, tol: 0.1, unit: '%',
  sol: r`Input $= 855 + 45 = 900$ W, so $\eta = \dfrac{855}{900} \times 100 = 95$ per cent.`,
  scheme: [['η = 855/900 = 95%', 1]],
  d: 1, c: 'understanding', t: [6],
}), () => near((855 / 900) * 100, 95) || 'ef');
const ti = { Np: 2000, Ns: 100, Vp: 230, R: 4.6 };
ti.Vs = (ti.Vp * ti.Ns) / ti.Np;
ti.Is = ti.Vs / ti.R;
ti.Ip = (ti.Is * ti.Ns) / ti.Np;
add('transIs-num', num({
  stem: 'An ideal transformer with 2000 turns on its primary and 100 turns on its secondary is connected to 230 V mains. Its secondary supplies a heater of resistance 4.6 Ω. Find the current in the primary, in amperes.',
  value: Number(dec(ti.Ip, 3)), tol: 0.002, unit: 'A',
  sol: r`$V_s = 230 \times \dfrac{100}{2000} = ${dec(ti.Vs, 3)}$ V; $I_s = \dfrac{${dec(ti.Vs, 3)}}{4.6} = ${dec(ti.Is, 2)}$ A; $I_p = I_s\dfrac{N_s}{N_p} = ${dec(ti.Is, 2)} \times \dfrac{100}{2000} = ${dec(ti.Ip, 3)}$ A.`,
  scheme: [['Vs = 11.5 V, Is = 2.5 A', 1], ['Ip = 0.125 A', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(ti.Ip, 0.125) && q.answer.value === 0.125 || 'ti');
add('stepdown-mcq', mcq({
  stem: 'The secondary winding of a step-down transformer in a welding set is made of much thicker wire than its primary. This is because the secondary',
  right: 'carries a much larger current, and thick wire keeps its I²R heating small',
  wrong: ['has a much higher voltage across it, so it needs thicker insulation', 'must carry more power than the primary supplies', 'has more turns than the primary, so its wire must be stronger'],
  sol: 'In a step-down transformer Is/Ip = Np/Ns > 1: the secondary current is the larger. Low-resistance thick wire keeps the copper loss I²R small. The secondary voltage is the lower, and it cannot carry more power than the primary supplies — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('ratiocurrent-tf', tf({
  stem: 'In an ideal transformer, the secondary current is larger than the primary current whenever the secondary has more turns than the primary.',
  key: 'f',
  sol: 'False. Is/Ip = Np/Ns, so a secondary with more turns (step-up) carries the smaller current; the power VI is the same on both sides.',
  d: 2, c: 'understanding', t: [6],
}));
add('losses-match', match({
  stem: 'Match each energy loss in a transformer in Column A with the design feature in Column B that keeps it small.',
  pairs: [
    ['Copper (I²R) loss', 'Windings of thick, low-resistance copper wire'],
    ['Eddy-current loss', 'A core built from thin sheets insulated by varnish'],
    ['Hysteresis loss', 'A core of soft iron or silicon steel, easily magnetised and demagnetised'],
    ['Flux leakage', 'The secondary wound over the primary on a shared core'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Copper loss → thick wire (1 → r); eddy-current loss → laminated core (2 → p); hysteresis loss → soft magnetic core material (3 → s); flux leakage → windings one over the other (4 → q).',
  d: 2, c: 'understanding', t: [6],
}));
const ln = { P: 6.6e6, V: 66e3, R: 8 };
ln.I = ln.P / ln.V;
ln.loss = ln.I ** 2 * ln.R;
add('lineloss-num', num({
  stem: 'A transmission line of total resistance 8.0 Ω carries 6.6 MW at 66 kV. Find the power wasted as heat in the line, in kW.',
  value: Number(dec(ln.loss / 1e3, 2)), tol: 0.5, unit: 'kW',
  sol: r`$I = \dfrac{P}{V} = \dfrac{6.6 \times 10^{6}}{66 \times 10^{3}} = ${dec(ln.I, 3)}$ A; loss $= I^2R = ${dec(ln.I, 3)}^2 \times 8.0 = ${dec(ln.loss, 2)}$ W, i.e. $\dfrac{${dec(ln.loss, 2)}}{10^{3}} = ${dec(ln.loss / 1e3, 2)}$ kW (about 1.2% of the power).`,
  scheme: [['I = P/V = 100 A', 1], ['Loss = I²R = 80 kW', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(ln.loss, 80000) && q.answer.value === 80 || 'ln');
add('kvratio-mcq', mcq({
  stem: 'A state transmission company raises the voltage of a line from 132 kV to 400 kV, sending the same power over the same conductors. The power wasted as heat in the line falls by a factor of about',
  right: '9',
  wrong: ['3', '27', '81'],
  sol: r`Loss $= \dfrac{P^2R}{V^2} \propto \dfrac{1}{V^2}$: $\left(\dfrac{400}{132}\right)^2 \approx 9.2$, so the loss falls about nine times; 3 is only the factor by which the current falls — option (@K).`,
  d: 3, c: 'application', t: [6],
}), () => near((400 / 132) ** 2, 9.18, 0.01) || 'kv');
add('village-short2', short({
  marks: 2,
  stem: 'To save the cost of transformers, a panchayat proposes taking electricity 15 km from a substation to a village at 230 V. Evaluate this proposal.',
  model: '**Unwise.** At 230 V the current P/V would be very **large**, so the heating loss I²R and the voltage drop IR along 15 km of line would be **huge**. Stepping up the voltage cuts the current, and the loss falls as **1/V²**; a transformer near the village then gives a safe 230 V.',
  sol: 'Low V means large I, so large I²R loss.',
  scheme: [['Large current at low voltage gives a large I²R loss (and voltage drop)', 1], ['High-voltage transmission with step-down near users is better', 1]],
  d: 3, c: 'evaluation', t: [6],
}));
add('transformer-short3', short({
  marks: 3,
  stem: 'On what principle does a transformer work? For an ideal transformer, with no flux leakage and no energy loss, obtain the relations between the voltages, the currents and the numbers of turns of its two windings.',
  model: r`A transformer works on **mutual induction**: the alternating current in the primary sets up an alternating flux in the core, which links the secondary and induces an emf in it.
With no flux leakage, every turn of both windings carries the same flux Φ, so $\varepsilon_p = -N_p\dfrac{d\Phi}{dt}$ and $\varepsilon_s = -N_s\dfrac{d\Phi}{dt}$. Taking $V_p \approx \varepsilon_p$ and $V_s \approx \varepsilon_s$, $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$.
With no energy loss, $V_pI_p = V_sI_s$, so $\dfrac{I_p}{I_s} = \dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$.`,
  sol: 'Same dΦ/dt per turn; power in = power out.',
  scheme: [['Principle: mutual induction with alternating flux', 1], ['Vs/Vp = Ns/Np from the same dΦ/dt per turn', 1], ['VpIp = VsIs, so Ip/Is = Ns/Np', 1]],
  d: 2, c: 'understanding', t: [6], wl: null,
}));

// ================================================================ 5-mark questions (in parts)
const fl5 = { N: 80, r: 0.05, R: 4, B: 0.3, t: 0.2 };
fl5.dPhi = fl5.B * Math.PI * fl5.r ** 2;
fl5.emf = (fl5.N * fl5.dPhi) / fl5.t;
fl5.I = fl5.emf / fl5.R;
fl5.q = fl5.I * fl5.t;
fl5.H = fl5.I ** 2 * fl5.R * fl5.t;
add('faraday-long', long({
  stem: '(a) State Faraday’s laws of electromagnetic induction and Lenz’s law. [1] (b) A flat circular coil of 80 turns, radius 5.0 cm and resistance 4.0 Ω lies in the plane of the page, in a uniform field of 0.30 T pointing into the page. The field falls steadily to zero in 0.20 s. Find (i) the induced emf, (ii) the current, (iii) the charge that flows, (iv) the heat produced in the coil. [3] (c) State, with a reason, whether the induced current flows clockwise or anticlockwise as seen from the front. [1]',
  model: r`(a) An emf is induced in a circuit whenever the flux linked with it changes; its size equals the rate of change of flux linkage, $\varepsilon = -N\,d\Phi/dt$. Lenz’s law: the induced current opposes the change that produces it.

(b)(i) $\Delta\Phi = B\pi r^2 = 0.30 \times \pi \times (0.050)^2 \approx ${sci(fl5.dPhi, 3)}$ Wb, so $\varepsilon = \dfrac{80 \times ${sci(fl5.dPhi, 3)}}{0.20} \approx ${dec(fl5.emf, 3)}$ V.
(ii) $I = \dfrac{${dec(fl5.emf, 3)}}{4.0} \approx ${dec(fl5.I, 3)}$ A.
(iii) $q = It \approx ${dec(fl5.I, 3)} \times 0.20 \approx ${sci(fl5.q, 3)}$ C.
(iv) $H = I^2Rt \approx ${dec(fl5.I, 3)}^2 \times 4.0 \times 0.20 \approx ${sci(fl5.H, 3)}$ J.

(c) The inward flux is decreasing, so the induced current sets up an inward field to oppose the decrease: by the right-hand rule the current flows **clockwise** as seen from the front.`,
  sol: 'Faraday and Lenz; ε = NΔΦ/Δt; I, q = It, H = I²Rt; clockwise.',
  scheme: [['Statements of the laws', 1], ['ε ≈ 0.942 V', 1], ['I ≈ 0.236 A and q ≈ 4.71 × 10⁻² C', 1], ['H ≈ 4.44 × 10⁻² J', 1], ['Clockwise, opposing the fall of inward flux', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(fl5.emf, 0.94248, 0.001) && near(fl5.q, 0.047124, 0.001) && near(fl5.H, 0.044413, 0.002) && loopFieldZ(false) > 0 || `fl5 ${fl5.H}`);
const rf = { B: 0.5, l: 0.3, R: 0.5, F: 0.36 };
rf.v = (rf.F * rf.R) / (rf.B ** 2 * rf.l ** 2);
rf.emf = rf.B * rf.l * rf.v;
rf.I = rf.emf / rf.R;
rf.P = rf.F * rf.v;
add('rodforce-long', long({
  stem: '(a) A conducting bar of length l slides with speed v along two parallel rails joined by a resistor R, in a uniform magnetic field B perpendicular to the plane of the rails. Using Faraday’s law, derive the emf induced in the bar. [2] (b) Show that the power needed to keep the bar moving at a steady speed is (Blv)²/R, and explain how this agrees with conservation of energy. [1] (c) A bar 30 cm long, starting from rest on smooth horizontal rails joined by a 0.50 Ω resistor in a vertical field of 0.50 T, is pulled by a constant horizontal force of 0.36 N. Explain why it reaches a steady speed, and find that speed and the current at that speed. [2]',
  model: r`(a) Let the bar be at distance $x$ from the resistor. The circuit encloses area $lx$, so $\Phi = Blx$. As the bar moves, $\varepsilon = \dfrac{d\Phi}{dt} = Bl\dfrac{dx}{dt} = Blv$ in size, its direction given by Lenz’s law.

(b) $I = \dfrac{Blv}{R}$, and the field exerts $F = BIl = \dfrac{B^2l^2v}{R}$ on the bar, opposing its motion. At steady speed the applied force equals this, so the power is $P = Fv = \dfrac{(Blv)^2}{R} = I^2R$: the mechanical work done becomes heat in the circuit, and no energy is created.

(c) The magnetic drag $\dfrac{B^2l^2v}{R}$ grows with speed until it equals the pull, after which the net force is zero. Then $v = \dfrac{FR}{B^2l^2} = \dfrac{0.36 \times 0.50}{0.50^2 \times 0.30^2} = ${dec(rf.v, 2)}$ m s$^{-1}$; $\varepsilon = 0.50 \times 0.30 \times ${dec(rf.v, 2)} = ${dec(rf.emf, 2)}$ V and $I = \dfrac{${dec(rf.emf, 2)}}{0.50} = ${dec(rf.I, 2)}$ A (power $${dec(rf.F, 2)} \times ${dec(rf.v, 2)} = ${dec(rf.P, 3)}$ W).`,
  sol: 'Φ = Blx; F = B²l²v/R; steady when F equals the pull.',
  scheme: [['Φ = Blx', 1], ['ε = Bl dx/dt = Blv', 1], ['P = Fv = (Blv)²/R = I²R: energy conserved', 1], ['Drag grows with v until it balances the pull', 1], ['v = 8.0 m s⁻¹, I = 2.4 A', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(rf.v, 8) && near(rf.I, 2.4) && near(rf.P, 2.88) && near(rf.I ** 2 * rf.R, rf.P) || 'rf');
const in5 = { N: 1000, l: 0.5, R: 0.02, N2: 50, r: 0.01, dI: 2, t: 4e-3 };
in5.L = (MU0 * in5.N ** 2 * Math.PI * in5.R ** 2) / in5.l;
in5.M = (MU0 * (in5.N / in5.l) * in5.N2 * Math.PI * in5.r ** 2);
in5.emf = in5.M * (in5.dI / in5.t);
add('inductance-long', long({
  stem: '(a) Define self-inductance and derive an expression for the self-inductance of a long air-cored solenoid of N turns, length l and cross-sectional area A. [2] (b) A solenoid 50 cm long has 1000 turns of radius 2.0 cm. A small coil of 50 turns and radius 1.0 cm is placed coaxially at its centre. Find (i) the self-inductance of the solenoid, (ii) the mutual inductance of the pair, (iii) the emf induced in the small coil when a current of 2.0 A in the solenoid is switched off steadily in 4.0 ms. [3]',
  model: r`(a) Self-inductance L is the flux linkage of a coil per unit current through it, $N\Phi = LI$ (so $\varepsilon = -L\,dI/dt$). Inside the solenoid $B = \dfrac{\mu_0NI}{l}$; each turn links $BA$, so $N\Phi = \dfrac{\mu_0N^2A}{l}I$ and $L = \dfrac{\mu_0N^2A}{l}$.

(b)(i) $L = \dfrac{4\pi \times 10^{-7} \times 1000^2 \times \pi \times (0.020)^2}{0.50} \approx ${sci(in5.L, 3)}$ H.
(ii) The solenoid’s field $\mu_0\dfrac{N}{l}I$ passes through each small turn of area $\pi r^2$: $M = \mu_0\dfrac{N}{l}N_2\pi r^2 = 4\pi \times 10^{-7} \times 2000 \times 50 \times \pi \times (0.010)^2 \approx ${sci(in5.M, 3)}$ H.
(iii) $\dfrac{dI}{dt} = \dfrac{2.0}{4.0 \times 10^{-3}} = 500$ A s$^{-1}$, so $|\varepsilon| = ${sci(in5.M, 3)} \times 500 \approx ${sci(in5.emf, 3)}$ V (about 20 mV).`,
  sol: 'L = μ₀N²A/l; M from the solenoid field through the small coil.',
  scheme: [['Definition NΦ = LI', 1], ['L = μ₀N²A/l derived', 1], ['L ≈ 3.16 × 10⁻³ H', 1], ['M ≈ 3.95 × 10⁻⁵ H', 1], ['|ε| ≈ 1.97 × 10⁻² V', 1]],
  d: 3, c: 'application', t: [4, 5], wl: null,
}), () => near(in5.L, 3.1583e-3, 0.001) && near(in5.M, 3.9478e-5, 0.001) && near(in5.emf, 0.019739, 0.001) || `in5 ${in5.L} ${in5.M}`);
const tl = { Np: 1150, Vp: 230, Vs: 24, Is: 5, eta: 0.92 };
tl.Ns = (tl.Np * tl.Vs) / tl.Vp;
tl.Pout = tl.Vs * tl.Is;
tl.Pin = tl.Pout / tl.eta;
tl.Ip = tl.Pin / tl.Vp;
add('transformer-long', long({
  stem: '(a) Describe, with a labelled diagram described in words, the construction of a transformer and explain how it works. [2] (b) Why does a transformer not work on a steady DC supply? [1] (c) A step-down transformer with 1150 primary turns gives 24 V from 230 V mains and supplies 5.0 A to a load. Its efficiency is 92%. Find the number of secondary turns, the output power and the primary current. [2]',
  model: r`(a) Two insulated copper windings, the primary ($N_p$ turns, joined to the AC supply) and the secondary ($N_s$ turns, joined to the load), are wound on a closed, laminated soft-iron core, usually one over the other. The alternating primary current sets up an alternating flux in the core; this same flux links the secondary and induces in it an alternating emf (mutual induction), with $V_s/V_p = N_s/N_p$ for an ideal transformer.

(b) A steady current produces a steady flux; with no change of flux, no emf is induced in the secondary.

(c) $N_s = N_p\dfrac{V_s}{V_p} = 1150 \times \dfrac{24}{230} = ${dec(tl.Ns, 3)}$ turns. Output $= 24 \times 5.0 = ${dec(tl.Pout, 3)}$ W. Input $= \dfrac{120}{0.92} \approx ${dec(tl.Pin, 4)}$ W, so $I_p \approx \dfrac{${dec(tl.Pin, 4)}}{230} \approx ${dec(tl.Ip, 3)}$ A.`,
  sol: 'Construction; mutual induction; turns ratio; efficiency.',
  scheme: [['Construction: two windings on a laminated soft-iron core', 1], ['Working: alternating flux links the secondary (mutual induction)', 1], ['DC: steady flux, no induced emf', 1], ['Ns = 120; output 120 W', 1], ['Ip ≈ 0.567 A', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(tl.Ns, 120) && near(tl.Ip, 0.56711, 0.001) || 'tl');
const tm = { P: 1.2e6, V1: 6e3, V2: 60e3, R: 12 };
tm.I1 = tm.P / tm.V1;
tm.L1 = tm.I1 ** 2 * tm.R;
tm.I2 = tm.P / tm.V2;
tm.L2 = tm.I2 ** 2 * tm.R;
add('transmission-long', long({
  stem: 'A small hydroelectric station in the hills generates 1.2 MW at 6.0 kV. The power is sent to a town along a line of total resistance 12 Ω. (a) Show that, for a given power, the heating loss in a line is inversely proportional to the square of the transmission voltage. [1] (b) Find the current in the line and the power lost if the power is sent at 6.0 kV. [1] (c) An ideal transformer at the station raises the voltage to 60 kV. Find its turns ratio, the new current and the power lost, and the percentage of the generated power that reaches the town in each case. [2] (d) Why is the voltage stepped down again before the power reaches homes? [1]',
  model: r`(a) $I = \dfrac{P}{V}$, so the loss is $I^2R = \dfrac{P^2R}{V^2} \propto \dfrac{1}{V^2}$.

(b) $I = \dfrac{1.2 \times 10^{6}}{6.0 \times 10^{3}} = ${dec(tm.I1, 3)}$ A; loss $= ${dec(tm.I1, 3)}^2 \times 12 = ${sci(tm.L1, 2)}$ W (480 kW).

(c) $N_s : N_p = 60 : 6.0 = 10 : 1$. $I = \dfrac{1.2 \times 10^{6}}{60 \times 10^{3}} = ${dec(tm.I2, 2)}$ A; loss $= ${dec(tm.I2, 2)}^2 \times 12 = ${dec(tm.L2, 2)}$ W (4.8 kW). Delivered: at 6.0 kV, $1.2 - 0.48 = 0.72$ MW, i.e. 60%; at 60 kV, $1.2 - 0.0048 = 1.1952$ MW, i.e. 99.6%.

(d) Very high voltages are dangerous and need heavy insulation; step-down transformers near the users bring it to a safe 230 V.`,
  sol: 'Loss P²R/V²; I = P/V; ten times the voltage, one hundredth the loss.',
  scheme: [['Loss = P²R/V²', 1], ['200 A; 480 kW lost', 1], ['Ratio 10 : 1; 20 A; 4.8 kW lost', 1], ['60% and 99.6% delivered', 1], ['Stepped down for safety at 230 V', 1]],
  d: 3, c: 'application', t: [6], wl: null,
}), () => near(tm.L1, 480000) && near(tm.L2, 4800) && near((tm.P - tm.L2) / tm.P, 0.996) || 'tm');
