// ISC 12 Physics ch04 Capacitance and Dielectrics — question bank (ISC style). Numbers computed and re-checked.
import { mk, add, r, sci, dec, near, K, EPS0 } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;

// ================================================================ t01 conductors and capacitance
add('condfield-tf', tf({
  stem: 'In electrostatic equilibrium, the electric field inside the metal of a charged conductor is zero.',
  key: 't',
  sol: 'True. Any field inside would push the free electrons, so charges rearrange until the internal field vanishes.',
  d: 1, c: 'understanding', t: [1],
}));
add('surface-mcq', mcq({
  stem: 'A hollow metal sphere is given a positive charge. The charge',
  right: 'resides entirely on its outer surface',
  wrong: ['spreads uniformly through the metal', 'collects on the inner surface of the cavity', 'collects at the centre of the sphere'],
  sol: 'A Gaussian surface inside the metal has E = 0 on it, so it encloses no net charge: all excess charge is on the outer surface — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('farad-fill', fill({
  stem: 'A conductor that rises by one volt when it receives one coulomb has a capacitance of one ___ (name the unit).',
  acc: [['farad', 'F']],
  sol: 'The **farad** (F).',
  d: 1, c: 'recall', t: [1],
}));
add('Cdef-mcq', mcq({
  stem: 'The capacitance of an isolated conductor depends on',
  right: 'its size and shape and the surrounding medium',
  wrong: ['the charge placed on it', 'the potential to which it is raised', 'the material it is made of'],
  sol: 'C = Q/V; doubling Q doubles V, so C is fixed by geometry and the medium — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const sc = 0.18 / K;
add('sphereC-num', num({
  stem: 'Find the capacitance of an isolated metal sphere of radius 18 cm in air, in pF.',
  value: Number(dec(sc * 1e12, 2)), tol: 0.2, unit: 'pF',
  sol: r`$C = 4\pi\varepsilon_0R = \dfrac{R}{k} = \dfrac{0.18}{9 \times 10^{9}} = ${sci(sc, 2)}$ F, i.e. $${sci(sc, 2)} \times 10^{12} = ${dec(sc * 1e12, 2)}$ pF.`,
  scheme: [['C = 4πε₀R = 20 pF', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(sc, 2e-11) || 'sc');
const sr = 1e-6 * K;
add('sphereR-num', num({
  stem: 'What radius would an isolated conducting sphere in air need to have a capacitance of 1.0 μF? Give the answer in km.',
  value: Number(dec(sr / 1000, 2)), tol: 0.05, unit: 'km',
  sol: r`$R = \dfrac{C}{4\pi\varepsilon_0} = kC = 9 \times 10^{9} \times 1.0 \times 10^{-6} = ${sci(sr, 2)}$ m, i.e. $\dfrac{${sci(sr, 2)}}{1000} = ${dec(sr / 1000, 2)}$ km: the farad is a very large unit.`,
  scheme: [['R = kC', 1], ['9.0 km', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(sr, 9000) || 'sr');
add('freebound-short', short({
  marks: 2,
  stem: 'Distinguish between free charges and bound charges, giving one example of a material in which each type dominates.',
  model: '**Free charges** can move through the whole material under a field, e.g. conduction electrons in a **metal** such as copper. **Bound charges** are held within their atoms or molecules and can only **shift slightly** (polarisation), e.g. electrons and nuclei in an insulator such as **glass** or mica.',
  sol: 'Mobility of the charges.',
  scheme: [['Free charges move through the material (metal)', 1], ['Bound charges only shift within molecules (insulator)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('conductor-short3', short({
  marks: 3,
  stem: 'For a charged conductor in electrostatic equilibrium, explain why (a) the field inside is zero, (b) the excess charge resides on its surface, (c) the field just outside is normal to the surface.',
  model: '(a) If there were a field inside, the **free electrons would move**; equilibrium means no motion, so **E = 0**. (b) A **Gaussian surface** just inside the surface has E = 0 everywhere on it, so by Gauss’s theorem it **encloses no net charge**: the excess charge must be on the **surface**. (c) A **tangential** component of E at the surface would drive charges along it; at equilibrium there is none, so E is **normal**.',
  sol: 'Free charges; Gauss; no tangential component.',
  scheme: [['E = 0 inside: free charges would move', 1], ['Gauss: no enclosed charge inside', 1], ['No tangential component: E normal', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('normal-ar', ar({
  a: 'The electric field just outside the surface of a charged conductor is perpendicular to the surface.',
  r: 'The surface of a conductor in electrostatic equilibrium is an equipotential surface.',
  key: 'a',
  sol: 'Both true, and R explains A: the field is always perpendicular to equipotential surfaces — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('twosphere-mcq', mcq({
  stem: 'A large metal sphere and a small metal sphere, far apart, are joined by a thin wire and charged. Compared with the large sphere, the small sphere has',
  right: 'the same potential and a larger surface charge density',
  wrong: ['the same charge and the same surface charge density', 'a higher potential and a smaller charge density', 'the same surface charge density but less charge'],
  sol: 'Joined conductors share one potential: kQ₁/R₁ = kQ₂/R₂, so Q ∝ R and σ = Q/4πR² ∝ 1/R: larger on the smaller sphere (why charge crowds at sharp points) — option (@K).',
  d: 4, c: 'analysis', t: [1],
}));
add('cavityV-mcq', mcq({
  stem: 'Inside the empty cavity of a charged hollow conductor, the electric potential is',
  right: 'constant, and equal to the potential of the conductor',
  wrong: ['zero everywhere', 'largest at the centre of the cavity', 'equal to kQ/r, varying with distance from the centre'],
  sol: 'E = 0 in the cavity, so V does not change from point to point: it equals the conductor’s potential — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('shield-short', short({
  marks: 2,
  stem: 'Why are sensitive electronic circuits often enclosed in metal cases?',
  model: 'A closed metal case is a **conductor**: external fields make charges redistribute on its **outer surface** so that the **field inside is zero**. The circuit inside is therefore **shielded** from external electric fields (electrostatic shielding).',
  sol: 'Field inside a conductor is zero.',
  scheme: [['Charges rearrange on the outer surface', 1], ['Field inside zero: shielding', 1]],
  d: 2, c: 'application', t: [1],
}));

// ================================================================ t02 parallel-plate capacitor
add('halfgap-mcq', mcq({
  stem: 'The plate area of a parallel-plate capacitor is doubled and the separation between its plates is halved. Its capacitance becomes',
  right: '4 times as large',
  wrong: ['2 times as large', 'unchanged', 'one quarter as large'],
  sol: 'C = ε₀A/d: doubling A gives ×2 and halving d gives ×2 more — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const pc = (EPS0 * 0.05) / 2e-3;
add('ppC-num', num({
  stem: 'Find the capacitance of a parallel-plate capacitor with plates of area 0.050 m² separated by 2.0 mm of air, in pF (3 significant figures).',
  value: Number(dec(pc * 1e12, 3)), tol: 1, unit: 'pF',
  sol: r`$C = \dfrac{\varepsilon_0A}{d} = \dfrac{8.85 \times 10^{-12} \times 0.050}{2.0 \times 10^{-3}} = ${sci(pc, 3)}$ F, i.e. $${sci(pc, 3)} \times 10^{12} = ${dec(pc * 1e12, 3)}$ pF.`,
  scheme: [['C = ε₀A/d ≈ 221 pF', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(pc * 1e12, q.answer.value) || 'pc');
const an = (1 * 1e-3) / EPS0;
add('area-num', num({
  stem: 'What plate area would a 1.0 F parallel-plate capacitor need if its plates were 1.0 mm apart in air? Give the answer in units of 10⁸ m² (3 significant figures).',
  value: Number(dec(an / 1e8, 3)), tol: 0.02, unit: '× 10⁸ m²',
  sol: r`$A = \dfrac{Cd}{\varepsilon_0} = \dfrac{1.0 \times 1.0 \times 10^{-3}}{8.85 \times 10^{-12}} \approx ${sci(an, 3)}$ m², i.e. $\dfrac{${sci(an, 3)}}{10^{8}} = ${dec(an / 1e8, 3)}$ (about 10 km × 10 km).`,
  scheme: [['A = Cd/ε₀', 1], ['≈ 1.13 × 10⁸ m²', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(an / 1e8, q.answer.value) || 'an');
const pq = { C: (EPS0 * 0.01) / 0.5e-3, V: 50 };
pq.Q = pq.C * pq.V;
add('ppQ-num', num({
  stem: 'A capacitor with plates of area 0.010 m² separated by 0.50 mm of air is connected to a 50 V supply. Find the charge on each plate, in nC (3 significant figures).',
  value: Number(dec(pq.Q * 1e9, 3)), tol: 0.05, unit: 'nC',
  sol: r`$C = \dfrac{8.85 \times 10^{-12} \times 0.010}{0.50 \times 10^{-3}} = ${sci(pq.C, 3)}$ F; $Q = CV = ${sci(pq.C, 3)} \times 50 = ${sci(pq.Q, 3)}$ C, i.e. $${sci(pq.Q, 3)} \times 10^{9} = ${dec(pq.Q * 1e9, 3)}$ nC.`,
  scheme: [['C = 177 pF', 1], ['Q = 8.85 nC', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(pq.Q, 8.85e-9) || 'pq');
const pe = 300 / 2e-3;
add('ppE-num', num({
  stem: 'A parallel-plate capacitor with plates 2.0 mm apart is charged to 300 V. Find the electric field between the plates, in units of 10⁵ V m⁻¹.',
  value: Number(dec(pe / 1e5, 2)), tol: 0.02, unit: '× 10⁵ V m⁻¹',
  sol: r`$E = \dfrac{V}{d} = \dfrac{300}{2.0 \times 10^{-3}} = ${sci(pe, 2)}$ V m$^{-1}$, i.e. $\dfrac{${sci(pe, 2)}}{10^{5}} = ${dec(pe / 1e5, 2)}$.`,
  scheme: [['E = V/d = 1.5 × 10⁵ V m⁻¹', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(pe, 1.5e5) || 'pe');
add('ppderive-short3', short({
  marks: 3,
  stem: 'Derive an expression for the capacitance of a parallel-plate capacitor with plates of area A separated by a distance d in vacuum.',
  model: r`Let the plates carry $\pm Q$, so the surface charge density is $\sigma = Q/A$. By Gauss’s theorem the field between large plates is uniform: $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{Q}{\varepsilon_0A}$ (fringing neglected). The potential difference is $V = Ed = \dfrac{Qd}{\varepsilon_0A}$. Hence $C = \dfrac{Q}{V} = \dfrac{\varepsilon_0A}{d}$.`,
  sol: 'E = σ/ε₀, V = Ed, C = Q/V.',
  scheme: [['E = σ/ε₀ = Q/(ε₀A)', 1], ['V = Ed = Qd/(ε₀A)', 1], ['C = ε₀A/d', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('pullapart-mcq', mcq({
  stem: 'A charged parallel-plate capacitor is disconnected from its battery and its plates are then pulled further apart. Which statement is correct?',
  right: 'C decreases, Q stays the same and V increases',
  wrong: ['C decreases, V stays the same and Q decreases', 'C, Q and V all stay the same', 'C increases and V decreases'],
  sol: 'Isolated: Q is fixed. C = ε₀A/d falls as d grows, so V = Q/C rises (work done pulling the plates apart raises the stored energy) — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('uniformfield-short', short({
  marks: 2,
  stem: 'Explain why the field between the plates of a large parallel-plate capacitor is uniform, and why it is (nearly) zero outside.',
  model: 'Each large plate gives a field of size $\\sigma/2\\varepsilon_0$ that does **not depend on distance**. Between the plates the two fields point the **same way** (from + to −) and **add** to a constant $\\sigma/\\varepsilon_0$; outside they point in **opposite directions** and **cancel**.',
  sol: 'Superposition of two sheet fields.',
  scheme: [['Each plate: distance-independent σ/2ε₀', 1], ['Add between (uniform), cancel outside', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('Ccharge-tf', tf({
  stem: 'The capacitance of a parallel-plate capacitor increases when more charge is placed on its plates.',
  key: 'f',
  sol: 'False. More charge raises V in proportion; C = ε₀A/d depends only on A, d and the medium.',
  d: 1, c: 'understanding', t: [2],
}));

// ================================================================ t03 combinations
add('series-num', num({
  stem: 'Capacitors of 2.0 μF, 3.0 μF and 6.0 μF are connected in series. Find the equivalent capacitance, in μF.',
  value: 1, tol: 0.01, unit: 'μF',
  sol: r`$\dfrac{1}{C} = \dfrac{1}{2} + \dfrac{1}{3} + \dfrac{1}{6} = \dfrac{3 + 2 + 1}{6} = 1$, so $C = 1.0\ \mu$F.`,
  scheme: [['Reciprocal rule', 1], ['1.0 μF', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}));
add('parallel-num', num({
  stem: 'Capacitors of 2.0 μF, 3.0 μF and 5.0 μF are connected in parallel. Find the equivalent capacitance, in μF.',
  value: 10, tol: 0.05, unit: 'μF',
  sol: r`$C = 2.0 + 3.0 + 5.0 = 10$ μF.`,
  scheme: [['C = ΣCᵢ = 10 μF', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('network-num', num({
  stem: 'A 4.0 μF capacitor in parallel with a 2.0 μF capacitor is connected in series with a 3.0 μF capacitor. Find the equivalent capacitance, in μF.',
  value: 2, tol: 0.02, unit: 'μF',
  sol: r`Parallel pair: $4.0 + 2.0 = 6.0\ \mu$F. In series with 3.0 μF: $C = \dfrac{6.0 \times 3.0}{6.0 + 3.0} = 2.0\ \mu$F.`,
  scheme: [['Parallel pair 6.0 μF', 1], ['Series with 3.0 μF: 2.0 μF', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}));
const vs = { C1: 2, C2: 3, V: 100 };
vs.Cs = (vs.C1 * vs.C2) / (vs.C1 + vs.C2);
vs.Q = vs.Cs * vs.V;
vs.V1 = vs.Q / vs.C1;
add('voltsplit-num', num({
  stem: 'Capacitors of 2.0 μF and 3.0 μF are connected in series across a 100 V supply. Find the potential difference across the 2.0 μF capacitor, in volts.',
  value: vs.V1, tol: 0.5, unit: 'V',
  sol: r`$C_s = \dfrac{2.0 \times 3.0}{5.0} = ${dec(vs.Cs, 2)}\ \mu$F; $Q = C_sV = ${dec(vs.Cs, 2)} \times 100 = ${dec(vs.Q, 3)}\ \mu$C; $V_1 = \dfrac{Q}{C_1} = \dfrac{${dec(vs.Q, 3)}}{2.0} = ${dec(vs.V1, 2)}$ V.`,
  scheme: [['Common charge Q = 120 μC', 1], ['V₁ = Q/C₁ = 60 V', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(vs.V1, 60) || 'vs');
add('seriesQ-num', num({
  stem: 'For the same 2.0 μF and 3.0 μF capacitors in series across 100 V, find the charge on each capacitor, in μC.',
  value: Number(dec(vs.Q, 3)), tol: 0.5, unit: 'μC',
  sol: r`In series the charge is common: $Q = C_sV = 1.2 \times 100 = ${dec(vs.Q, 3)}\ \mu$C on each.`,
  scheme: [['Same Q: 120 μC each', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(vs.Q, 120) || 'vsq');
add('seriesderive-short3', short({
  marks: 3,
  stem: 'Derive the expression for the equivalent capacitance of three capacitors connected in series.',
  model: r`In series, the charge $+Q$ on the first plate induces $-Q$ and $+Q$ on successive plates, so **each capacitor carries the same charge Q**. The potential differences add: $V = V_1 + V_2 + V_3 = \dfrac{Q}{C_1} + \dfrac{Q}{C_2} + \dfrac{Q}{C_3}$. For the equivalent capacitor $V = Q/C_s$, so $\dfrac{1}{C_s} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dfrac{1}{C_3}$.`,
  sol: 'Same Q; voltages add.',
  scheme: [['Same charge on each', 1], ['V = ΣQ/Cᵢ', 1], ['1/C_s = Σ1/Cᵢ', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
add('parallel-short', short({
  marks: 2,
  stem: 'Derive the equivalent capacitance of capacitors C₁, C₂ and C₃ connected in parallel.',
  model: r`In parallel every capacitor has the **same potential difference V**. The charges are $Q_1 = C_1V$, $Q_2 = C_2V$, $Q_3 = C_3V$, and the total is $Q = (C_1 + C_2 + C_3)V$. Since $Q = C_pV$, $C_p = C_1 + C_2 + C_3$.`,
  sol: 'Same V; charges add.',
  scheme: [['Same V; Qᵢ = CᵢV', 1], ['C_p = C₁ + C₂ + C₃', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}));
add('minmax-mcq', mcq({
  stem: 'Four capacitors of 4.0 μF each are available. The maximum and minimum capacitances that can be obtained by combining all four are',
  right: '16 μF and 1.0 μF',
  wrong: ['16 μF and 4.0 μF', '8.0 μF and 2.0 μF', '4.0 μF and 1.0 μF'],
  sol: 'All in parallel: 4 × 4 = 16 μF; all in series: 4/4 = 1.0 μF — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('make3-mcq', mcq({
  stem: 'Using three 2.0 μF capacitors, an equivalent capacitance of 3.0 μF can be made by connecting',
  right: 'two in series, with the third in parallel with this pair',
  wrong: ['all three in series', 'all three in parallel', 'two in parallel, with the third in series with this pair'],
  sol: 'Two in series give 1.0 μF; adding 2.0 μF in parallel gives 3.0 μF. (Two in parallel then one in series gives 4 × 2/6 = 1.33 μF.) — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('threeequal-mcq', mcq({
  stem: 'Three identical capacitors of capacitance C are connected in series. The equivalent capacitance is',
  right: 'C/3',
  wrong: ['3C', 'C', 'C/9'],
  sol: '1/C_s = 3/C, so C_s = C/3 — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('smallV-ar', ar({
  a: 'In a series combination of capacitors, the capacitor of smallest capacitance has the largest potential difference across it.',
  r: 'Capacitors connected in series all carry the same charge.',
  key: 'a',
  sol: 'Both true, and R explains A: with the same Q, V = Q/C is largest where C is smallest — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
const rt = { C1: 2, V1max: 200, C2: 4, V2max: 80 };
rt.lim1 = (rt.V1max * (rt.C1 + rt.C2)) / rt.C2; // V₁ = V C₂/(C₁ + C₂)
rt.lim2 = (rt.V2max * (rt.C1 + rt.C2)) / rt.C1;
rt.V = Math.min(rt.lim1, rt.lim2);
add('rating-num', num({
  stem: 'A 2.0 μF capacitor rated at 200 V and a 4.0 μF capacitor rated at 80 V are connected in series. What is the largest voltage that can safely be applied across the combination, in volts?',
  value: rt.V, tol: 1, unit: 'V',
  sol: r`In series V divides inversely as C: $V_{2\mu F} = \dfrac{2}{3}V$ and $V_{4\mu F} = \dfrac{1}{3}V$. Limits: $\dfrac{2}{3}V \le 200 \Rightarrow V \le 300$ V; $\dfrac{1}{3}V \le 80 \Rightarrow V \le 240$ V. So the maximum is $${dec(rt.V, 3)}$ V.`,
  scheme: [['Voltage shares 2/3 and 1/3', 1], ['Smaller limit: 240 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(rt.V, 240) || 'rt');
const mn = { C1: 3, C2: 6, C3: 2, V: 24 };
mn.Cs = (mn.C1 * mn.C2) / (mn.C1 + mn.C2);
mn.C = mn.Cs + mn.C3;
mn.Qs = mn.Cs * mn.V;
mn.V1 = mn.Qs / mn.C1;
add('mixednet-short3', short({
  marks: 3,
  stem: 'Capacitors of 3.0 μF and 6.0 μF in series are connected in parallel with a 2.0 μF capacitor across a 24 V battery. Find (a) the equivalent capacitance, (b) the charge on the 2.0 μF capacitor, (c) the potential difference across the 3.0 μF capacitor.',
  model: r`(a) Series pair $\dfrac{3 \times 6}{9} = ${dec(mn.Cs, 2)}\ \mu$F; total $C = 2.0 + 2.0 = ${dec(mn.C, 2)}\ \mu$F.
(b) $Q = 2.0 \times 24 = 48\ \mu$C.
(c) Series branch: $Q = ${dec(mn.Cs, 2)} \times 24 = ${dec(mn.Qs, 2)}\ \mu$C; $V_{3\mu F} = \dfrac{${dec(mn.Qs, 2)}}{3.0} = ${dec(mn.V1, 2)}$ V.`,
  sol: 'Reduce; then branch charges.',
  scheme: [['C = 4.0 μF', 1], ['48 μC on 2.0 μF', 1], ['16 V across 3.0 μF', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(mn.C, 4) && near(mn.V1, 16) || 'mn');

// ================================================================ t04 energy
add('doubleV-mcq', mcq({
  stem: 'The potential difference across a capacitor is doubled. The energy stored in it becomes',
  right: '4 times as large',
  wrong: ['2 times as large', 'half as large', 'unchanged'],
  sol: 'U = ½CV²: doubling V multiplies U by 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
const eu = 0.5 * 10e-6 * 50 ** 2;
add('energy-num', num({
  stem: 'Find the energy stored in a 10 μF capacitor charged to 50 V, in mJ.',
  value: Number(dec(eu * 1e3, 3)), tol: 0.05, unit: 'mJ',
  sol: r`$U = \tfrac12CV^2 = 0.5 \times 10 \times 10^{-6} \times 50^2 = ${sci(eu, 3)}$ J, i.e. $${sci(eu, 3)} \times 10^{3} = ${dec(eu * 1e3, 3)}$ mJ.`,
  scheme: [['U = ½CV² = 12.5 mJ', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(eu, 0.0125) || 'eu');
const qe = (4e-4) ** 2 / (2 * 8e-6);
add('Qenergy-num', num({
  stem: 'A capacitor of 8.0 μF holds a charge of 4.0 × 10⁻⁴ C. Find the energy stored, in mJ.',
  value: Number(dec(qe * 1e3, 2)), tol: 0.05, unit: 'mJ',
  sol: r`$U = \dfrac{Q^2}{2C} = \dfrac{(4.0 \times 10^{-4})^2}{2 \times 8.0 \times 10^{-6}} = ${sci(qe, 2)}$ J, i.e. $${sci(qe, 2)} \times 10^{3} = ${dec(qe * 1e3, 2)}$ mJ.`,
  scheme: [['U = Q²/2C', 1], ['10 mJ', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(qe, 0.01) || 'qe');
const ud = 0.5 * EPS0 * (3e6) ** 2;
add('density-num', num({
  stem: 'Air breaks down when the field reaches about 3.0 × 10⁶ V m⁻¹. Find the energy density of the electric field just before breakdown, in J m⁻³ (3 significant figures).',
  value: Number(dec(ud, 3)), tol: 0.3, unit: 'J m⁻³',
  sol: r`$u = \tfrac12\varepsilon_0E^2 = 0.5 \times 8.85 \times 10^{-12} \times (3.0 \times 10^{6})^2 \approx ${dec(ud, 3)}$ J m$^{-3}$.`,
  scheme: [['u = ½ε₀E²', 1], ['≈ 39.8 J m⁻³', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(ud, 39.8) || 'ud');
const sh = { C1: 6e-6, V1: 100, C2: 3e-6 };
sh.V = (sh.C1 * sh.V1) / (sh.C1 + sh.C2);
sh.Ub = 0.5 * sh.C1 * sh.V1 ** 2;
sh.Ua = 0.5 * (sh.C1 + sh.C2) * sh.V ** 2;
sh.loss = sh.Ub - sh.Ua;
add('share-num', num({
  stem: 'A 6.0 μF capacitor charged to 100 V is connected across an uncharged 3.0 μF capacitor. Find the energy lost in the process, in mJ.',
  value: Number(dec(sh.loss * 1e3, 3)), tol: 0.1, unit: 'mJ',
  sol: r`Common $V = \dfrac{6.0 \times 100}{9.0} \approx ${dec(sh.V, 3)}$ V. Before: $\tfrac12 \times 6.0 \times 10^{-6} \times 100^2 = ${sci(sh.Ub, 2)}$ J. After: $\tfrac12 \times 9.0 \times 10^{-6} \times ${dec(sh.V, 3)}^2 \approx ${sci(sh.Ua, 2)}$ J. Loss $= ${sci(sh.loss, 2)}$ J, i.e. $${sci(sh.loss, 2)} \times 10^{3} = ${dec(sh.loss * 1e3, 3)}$ mJ.`,
  scheme: [['Common V ≈ 66.7 V (charge conserved)', 1], ['Loss = 30 − 20 = 10 mJ', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(sh.loss, 0.01) || `sh ${sh.loss}`);
const fl = { C: 150e-6, V: 300, t: 1e-3 };
fl.U = 0.5 * fl.C * fl.V ** 2;
fl.P = fl.U / fl.t;
add('flash-short3', short({
  marks: 3,
  stem: 'A camera flash uses a 150 μF capacitor charged to 300 V. Find (a) the charge stored, (b) the energy stored, (c) the average power delivered if it discharges in 1.0 ms.',
  model: r`(a) $Q = CV = 150 \times 10^{-6} \times 300 = 4.5 \times 10^{-2}$ C.
(b) $U = \tfrac12CV^2 = 0.5 \times 150 \times 10^{-6} \times 300^2 = ${dec(fl.U, 3)}$ J.
(c) $P = \dfrac{U}{t} = \dfrac{${dec(fl.U, 3)}}{1.0 \times 10^{-3}} = ${dec(fl.P, 3)}$ W (about 6.8 kW).`,
  sol: 'CV; ½CV²; U/t.',
  scheme: [['Q = 0.045 C', 1], ['U = 6.75 J', 1], ['P = 6750 W', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(fl.U, 6.75) && near(fl.P, 6750) || 'fl');
add('halfloss-mcq', mcq({
  stem: 'A capacitor C charged to potential V is connected across an identical uncharged capacitor. The fraction of the original energy lost is',
  right: 'one half',
  wrong: ['zero', 'one quarter', 'three quarters'],
  sol: 'The common voltage is V/2; final energy = ½(2C)(V/2)² = ¼CV², half the original ½CV² — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('densityderive-short', short({
  marks: 2,
  stem: 'Starting from U = ½CV² for a parallel-plate capacitor, show that the energy stored per unit volume of the field is ½ε₀E².',
  model: r`With $C = \dfrac{\varepsilon_0A}{d}$ and $V = Ed$: $U = \tfrac12\cdot\dfrac{\varepsilon_0A}{d}\cdot E^2d^2 = \tfrac12\varepsilon_0E^2(Ad)$. The field fills volume $Ad$, so $u = \dfrac{U}{Ad} = \tfrac12\varepsilon_0E^2$.`,
  sol: 'Substitute C and V; divide by volume.',
  scheme: [['U = ½ε₀E²(Ad)', 1], ['u = U/(Ad) = ½ε₀E²', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
add('ratioU-mcq', mcq({
  stem: 'Capacitors of 2.0 μF and 4.0 μF are connected (i) in parallel, (ii) in series, across the same battery. The ratio of the energy stored in the 2.0 μF capacitor to that in the 4.0 μF capacitor is',
  right: '1 : 2 in parallel, and 2 : 1 in series',
  wrong: ['2 : 1 in parallel, and 1 : 2 in series', '1 : 2 in both cases', '1 : 1 in both cases'],
  sol: 'Parallel: same V, U = ½CV² ∝ C gives 1 : 2. Series: same Q, U = Q²/2C ∝ 1/C gives 2 : 1 — option (@K).',
  d: 3, c: 'analysis', t: [3, 4],
}));
add('energyplates-ar', ar({
  a: 'The energy of a charged capacitor is stored in the metal of its plates.',
  r: 'The energy density of an electric field is ½ε₀E².',
  key: 'd',
  sol: 'R is true. A is false: the energy is stored in the electric field in the space between the plates — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('lossgoes-short', short({
  marks: 2,
  stem: 'When a charged capacitor is connected to an uncharged one, some energy is lost. Where does it go, and does the answer depend on the resistance of the connecting wires?',
  model: 'The lost energy is converted mainly to **heat** in the connecting wires (and some to **electromagnetic radiation**) while the charge redistributes. The **amount lost** is fixed by the capacitances and initial voltage; it does **not depend** on the wire resistance, which only affects **how quickly** it is dissipated.',
  sol: 'Heat and radiation; independent of R.',
  scheme: [['Heat in wires (and radiation)', 1], ['Amount independent of resistance', 1]],
  d: 3, c: 'understanding', t: [4],
}));

// ================================================================ t05 dielectrics
add('disconnected-ar', ar({
  a: 'Inserting a dielectric slab into a charged capacitor that has been disconnected from its battery decreases the energy stored.',
  r: 'With the battery disconnected the charge stays constant while the capacitance increases.',
  key: 'a',
  sol: 'Both true, and R explains A: U = Q²/2C falls by the factor K as C rises with Q fixed — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('connected-mcq', mcq({
  stem: 'A dielectric slab fills the space between the plates of a capacitor that remains connected to its battery. The charge on the plates',
  right: 'increases by the factor K',
  wrong: ['decreases by the factor K', 'stays the same', 'becomes zero'],
  sol: 'V is held by the battery and C becomes KC, so Q = CV rises K times — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('Kfill-fill', fill({
  stem: 'The ratio of the capacitance of a capacitor filled with a dielectric to its capacitance with vacuum between the plates is called the dielectric ___.',
  acc: [['constant']],
  sol: 'The dielectric **constant** K (relative permittivity).',
  d: 1, c: 'recall', t: [5],
}));
add('Kvalue-num', num({
  stem: 'A parallel-plate capacitor of 12 pF becomes 60 pF when its gap is completely filled with a dielectric. Find the dielectric constant.',
  value: 5, tol: 0.05, unit: '',
  sol: r`$K = \dfrac{C'}{C_0} = \dfrac{60}{12} = 5.0$.`,
  scheme: [['K = C′/C₀ = 5.0', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('polar-short', short({
  marks: 2,
  stem: 'Distinguish between polar and non-polar molecules and describe how each behaves in an external electric field.',
  model: '**Polar** molecules (e.g. H₂O, HCl) have a **permanent dipole moment**; in a field they tend to **align** with it (opposed by thermal agitation). **Non-polar** molecules (e.g. O₂, N₂) have **no permanent dipole**; a field **induces** a dipole by displacing their electron clouds relative to the nuclei.',
  sol: 'Permanent versus induced dipoles.',
  scheme: [['Polar: permanent dipoles that align', 1], ['Non-polar: induced dipoles', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('polarise-short3', short({
  marks: 3,
  stem: 'Explain, with a labelled sketch (described in words), how a dielectric slab placed between the plates of a charged capacitor reduces the electric field between them and increases the capacitance.',
  model: 'In the field $E_0$ the molecules of the slab become **dipoles** aligned along the field (the dielectric is **polarised**). Inside the slab neighbouring dipole charges cancel, but **bound surface charges** remain: **negative** on the face next to the **positive** plate and positive next to the negative plate. These set up a field $E_p$ **opposite** to $E_0$, so the net field is $E = E_0 - E_p = E_0/K$. For the same charge the potential difference falls, so $C = Q/V$ **increases** (by K when the gap is filled).',
  sol: 'Polarisation, induced surface charge, opposing field.',
  scheme: [['Dielectric polarised: aligned dipoles', 1], ['Bound surface charges set up an opposing field: E = E₀/K', 1], ['Lower V for the same Q: C increases', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const va = { C: 20e-12, V: 120, K: 4 };
va.Vd = va.V / va.K;
add('Vafter-num', num({
  stem: 'A 20 pF capacitor is charged to 120 V and then disconnected from the supply. A dielectric of constant 4 is then slid in to fill the gap. Find the new potential difference, in volts.',
  value: va.Vd, tol: 0.2, unit: 'V',
  sol: r`Q is fixed and C becomes $4 \times 20 = 80$ pF, so $V = \dfrac{Q}{C} = \dfrac{120}{4} = ${dec(va.Vd, 2)}$ V.`,
  scheme: [['Q fixed, C × 4', 1], ['V = 30 V', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(va.Vd, 30) || 'va');
const ua = { C: 20e-12, V: 120, K: 4 };
ua.U0 = 0.5 * ua.C * ua.V ** 2;
ua.U = ua.K * ua.U0;
add('Uafter-num', num({
  stem: 'The same 20 pF capacitor at 120 V is instead kept connected to the supply while the dielectric (K = 4) is slid in. Find the energy now stored, in units of 10⁻⁷ J (3 significant figures).',
  value: Number(dec(ua.U / 1e-7, 3)), tol: 0.03, unit: '× 10⁻⁷ J',
  sol: r`V stays 120 V and C becomes 80 pF: $U = \tfrac12 \times 80 \times 10^{-12} \times 120^2 = ${sci(ua.U, 3)}$ J, i.e. $\dfrac{${sci(ua.U, 3)}}{10^{-7}} = ${dec(ua.U / 1e-7, 3)}$ (four times the original $${sci(ua.U0, 3)}$ J).`,
  scheme: [['V fixed, C = 80 pF', 1], ['U = 5.76 × 10⁻⁷ J', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(ua.U, 5.76e-7) || 'ua');
add('table-short3', short({
  marks: 3,
  stem: 'A parallel-plate capacitor is charged by a battery, the battery is disconnected, and then a dielectric of constant K completely fills the space between the plates. State how (a) the charge, (b) the potential difference, (c) the energy stored change, giving a reason in each case.',
  model: '(a) **Charge unchanged**: with the battery disconnected there is nowhere for charge to go. (b) **V falls to V/K**: C becomes KC and V = Q/C. (c) **Energy falls to U/K**: $U = Q^2/2C$ with Q fixed and C × K; the “lost” energy is the work done by the field pulling the slab in.',
  sol: 'Q fixed; V and U ÷ K.',
  scheme: [['Q unchanged', 1], ['V ÷ K', 1], ['U ÷ K, with reason', 1]],
  d: 3, c: 'application', t: [5],
}));
add('whyuse-mcq', mcq({
  stem: 'One reason for filling a capacitor with a dielectric such as mica, rather than leaving air between the plates, is that it',
  right: 'increases the capacitance and allows a higher working voltage before breakdown',
  wrong: ['reduces the capacitance so the capacitor charges faster', 'makes the plates conduct better', 'removes the need for an insulating gap'],
  sol: 'C rises by K, and a good dielectric withstands larger fields than air — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('Efield-mcq', mcq({
  stem: 'A dielectric slab is inserted to fill a capacitor that remains connected to its battery. The electric field between the plates',
  right: 'stays the same, because V and d are unchanged',
  wrong: ['falls by the factor K', 'rises by the factor K', 'becomes zero'],
  sol: 'E = V/d with both fixed; the extra charge drawn from the battery exactly offsets the dielectric’s opposing field — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('slabfield-ar', ar({
  a: 'Placing a dielectric slab between the plates of a capacitor increases its capacitance.',
  r: 'A dielectric slab increases the electric field between the plates.',
  key: 'c',
  sol: 'A is true. R is false: the polarised slab REDUCES the field inside it, lowering V for a given Q, which is why C increases — option (c).',
  d: 2, c: 'understanding', t: [5],
}));

// ================================================================ t06 partly filled capacitor
const sb = { A: 0.02, d: 4e-3, t: 2e-3, Kd: 2 };
sb.C = (EPS0 * sb.A) / (sb.d - sb.t + sb.t / sb.Kd);
add('slab-num', num({
  stem: 'A capacitor has plates of area 0.020 m² separated by 4.0 mm. A slab of dielectric constant 2.0 and thickness 2.0 mm is placed between the plates. Find the capacitance, in pF (3 significant figures).',
  value: Number(dec(sb.C * 1e12, 3)), tol: 0.5, unit: 'pF',
  sol: r`$C = \dfrac{\varepsilon_0A}{d - t + t/K} = \dfrac{8.85 \times 10^{-12} \times 0.020}{0.0040 - 0.0020 + 0.0010} = \dfrac{1.77 \times 10^{-13}}{3.0 \times 10^{-3}} = ${sci(sb.C, 3)}$ F, i.e. $${sci(sb.C, 3)} \times 10^{12} = ${dec(sb.C * 1e12, 3)}$ pF.`,
  scheme: [['Effective gap 3.0 mm', 1], ['C = 59.0 pF', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(sb.C, 5.9e-11) || 'sb');
const ms = { A: 0.03, d: 3e-3, t: 1e-3 };
ms.C = (EPS0 * ms.A) / (ms.d - ms.t);
add('metalslab-num', num({
  stem: 'A metal plate 1.0 mm thick is inserted midway between the plates (area 0.030 m², separation 3.0 mm) of a parallel-plate capacitor, parallel to them. Find the new capacitance, in pF (3 significant figures).',
  value: Number(dec(ms.C * 1e12, 3)), tol: 1, unit: 'pF',
  sol: r`A metal slab acts like $K \to \infty$: $C = \dfrac{\varepsilon_0A}{d - t} = \dfrac{8.85 \times 10^{-12} \times 0.030}{2.0 \times 10^{-3}} = ${sci(ms.C, 3)}$ F, i.e. $${sci(ms.C, 3)} \times 10^{12} = ${dec(ms.C * 1e12, 3)}$ pF.`,
  scheme: [['C = ε₀A/(d − t)', 1], ['≈ 133 pF', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => near(ms.C * 1e12, q.answer.value) || 'ms');
add('slabderive-short3', short({
  marks: 3,
  stem: 'Derive the capacitance of a parallel-plate capacitor (plate area A, separation d) containing a dielectric slab of thickness t (t < d) and dielectric constant K.',
  model: r`With charges $\pm Q$, the field in the air gaps is $E_0 = \dfrac{Q}{\varepsilon_0A}$ and in the slab $E = \dfrac{E_0}{K}$. The potential difference is $V = E_0(d - t) + \dfrac{E_0}{K}t = \dfrac{Q}{\varepsilon_0A}\left(d - t + \dfrac{t}{K}\right)$. So $C = \dfrac{Q}{V} = \dfrac{\varepsilon_0A}{d - t + t/K}$.`,
  sol: 'Add the voltage drops in air and slab.',
  scheme: [['Fields E₀ in air, E₀/K in slab', 1], ['V = E₀(d − t) + E₀t/K', 1], ['C = ε₀A/(d − t + t/K)', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
add('Kslab-num', num({
  stem: 'A dielectric slab whose thickness is half the plate separation raises the capacitance of a parallel-plate capacitor to 1.5 times its air value. Find the dielectric constant of the slab.',
  value: 3, tol: 0.05, unit: '',
  sol: r`$\dfrac{C}{C_0} = \dfrac{d}{d - t + t/K} = \dfrac{1}{0.5 + 0.5/K} = 1.5 \Rightarrow 0.5 + \dfrac{0.5}{K} = \dfrac{2}{3} \Rightarrow \dfrac{0.5}{K} = \dfrac{1}{6}$, so $K = 3.0$.`,
  scheme: [['C/C₀ = 1/(0.5 + 0.5/K)', 1], ['K = 3.0', 1]],
  marks: 2, d: 4, c: 'analysis', t: [6],
}), () => near(1 / (0.5 + 0.5 / 3), 1.5) || 'ks');
add('restore-mcq', mcq({
  stem: 'A slab of thickness t and dielectric constant K is inserted between the plates of a parallel-plate capacitor. To bring the capacitance back to its original value, the plate separation must be increased by',
  right: 't(1 − 1/K)',
  wrong: ['t/K', 'tK', 't(K − 1)'],
  sol: 'The effective gap d − t + t/K must return to d by adding x: x = t − t/K = t(1 − 1/K) — option (@K).',
  d: 4, c: 'analysis', t: [6],
}));

// ================================================================ 5-mark questions (in parts)
const cl = { A: 0.04, d: 2e-3, V: 150 };
cl.C = (EPS0 * cl.A) / cl.d;
cl.Q = cl.C * cl.V;
cl.U = 0.5 * cl.C * cl.V ** 2;
cl.E = cl.V / cl.d;
add('capacitor-long', long({
  stem: '(a) Define capacitance and state its SI unit. [1] (b) Derive the capacitance of a parallel-plate capacitor in vacuum. [2] (c) A capacitor with plates of area 0.040 m², 2.0 mm apart, is charged to 150 V. Find its capacitance, the charge on each plate, the field between the plates and the energy stored. [2]',
  model: r`(a) $C = Q/V$, the charge stored per unit potential difference; unit farad (C V$^{-1}$).

(b) $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{Q}{\varepsilon_0A}$, $V = Ed = \dfrac{Qd}{\varepsilon_0A}$, so $C = \dfrac{\varepsilon_0A}{d}$.

(c) $C = \dfrac{8.85 \times 10^{-12} \times 0.040}{2.0 \times 10^{-3}} = ${sci(cl.C, 3)}$ F; $Q = CV = ${sci(cl.Q, 3)}$ C; $E = \dfrac{V}{d} = ${sci(cl.E, 2)}$ V m$^{-1}$; $U = \tfrac12CV^2 \approx ${sci(cl.U, 3)}$ J.`,
  sol: 'Definition; derivation; numbers.',
  scheme: [['Definition and unit', 1], ['Derivation', 1], ['C = 177 pF', 1], ['Q = 2.66 × 10⁻⁸ C; E = 7.5 × 10⁴ V m⁻¹', 1], ['U ≈ 1.99 × 10⁻⁶ J', 1]],
  d: 3, c: 'application', t: [1, 2, 4], wl: null,
}), () => near(cl.C, 1.77e-10) && near(cl.U, 1.99e-6) || 'cl');
const nl = { C1: 4, C2: 12, C3: 5, V: 18 };
nl.Cs = (nl.C1 * nl.C2) / (nl.C1 + nl.C2);
nl.C = nl.Cs + nl.C3;
nl.Qs = nl.Cs * nl.V;
nl.V1 = nl.Qs / nl.C1;
nl.V2 = nl.Qs / nl.C2;
nl.U = 0.5 * nl.C * 1e-6 * nl.V ** 2;
add('network-long', long({
  stem: '(a) Derive the expressions for the equivalent capacitance of capacitors in series and in parallel. [2] (b) Capacitors of 4.0 μF and 12 μF in series are connected in parallel with a 5.0 μF capacitor across an 18 V battery. Find (i) the equivalent capacitance, (ii) the charge on and potential difference across each capacitor, (iii) the total energy stored. [3]',
  model: r`(a) Series: same Q on each; $V = \sum Q/C_i$ so $\dfrac{1}{C_s} = \sum\dfrac{1}{C_i}$. Parallel: same V; $Q = \sum C_iV$ so $C_p = \sum C_i$.

(b)(i) Series pair $\dfrac{4 \times 12}{16} = ${dec(nl.Cs, 2)}\ \mu$F; total $${dec(nl.C, 2)}\ \mu$F.
(ii) 5.0 μF: $V = 18$ V, $Q = 90\ \mu$C. Series branch: $Q = 3.0 \times 18 = ${dec(nl.Qs, 2)}\ \mu$C on each; $V_{4} = \dfrac{54}{4} = ${dec(nl.V1, 3)}$ V, $V_{12} = \dfrac{54}{12} = ${dec(nl.V2, 2)}$ V.
(iii) $U = \tfrac12 \times 8.0 \times 10^{-6} \times 18^2 = ${sci(nl.U, 3)}$ J.`,
  sol: 'Rules; reduce; branch charges; energy.',
  scheme: [['Series and parallel derivations', 2], ['C = 8.0 μF', 1], ['Charges and voltages: 90 μC, 54 μC; 13.5 V and 4.5 V', 1], ['U ≈ 1.30 × 10⁻³ J', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(nl.C, 8) && near(nl.V1, 13.5) && near(nl.U, 1.296e-3) || 'nl');
const dl = { C0: 50e-12, V: 100, Kd: 6 };
dl.Q0 = dl.C0 * dl.V;
dl.U0 = 0.5 * dl.C0 * dl.V ** 2;
add('dielectric-long', long({
  stem: '(a) Explain what is meant by polarisation of a dielectric and how it reduces the field between the plates of a capacitor. [2] (b) A 50 pF air capacitor is charged to 100 V. A dielectric of constant 6 is then made to fill the gap. Find the charge, the potential difference and the energy stored (i) if the battery has been disconnected, (ii) if the battery remains connected. [3]',
  model: r`(a) In a field the molecules become (or align as) dipoles; bound charges appear on the faces of the slab, negative next to the + plate, positive next to the − plate. Their field opposes the applied field, reducing it to $E_0/K$.

(b) Initially $Q_0 = 50 \times 10^{-12} \times 100 = ${sci(dl.Q0, 2)}$ C and $U_0 = \tfrac12 \times 50 \times 10^{-12} \times 100^2 = ${sci(dl.U0, 2)}$ J; with the dielectric $C = 300$ pF.
(i) Disconnected: $Q = ${sci(dl.Q0, 2)}$ C; $V = \dfrac{100}{6} \approx 16.7$ V; $U = \dfrac{U_0}{6} \approx ${sci(dl.U0 / 6, 3)}$ J.
(ii) Connected: $V = 100$ V; $Q = 300 \times 10^{-12} \times 100 = ${sci(dl.Q0 * 6, 2)}$ C; $U = 6U_0 = ${sci(dl.U0 * 6, 2)}$ J.`,
  sol: 'Polarisation; Q fixed or V fixed.',
  scheme: [['Polarisation and bound charges', 1], ['Opposing field E₀/K', 1], ['Initial Q and U; C = 300 pF', 1], ['Disconnected: Q same, V 16.7 V, U ÷ 6', 1], ['Connected: V same, Q 3.0 × 10⁻⁸ C, U × 6', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(dl.U0, 2.5e-7) || 'dl');
const sl = { A: 0.015, d: 5e-3, t: 2e-3, Kd: 5 };
sl.C0 = (EPS0 * sl.A) / sl.d;
sl.C = (EPS0 * sl.A) / (sl.d - sl.t + sl.t / sl.Kd);
sl.Cm = (EPS0 * sl.A) / (sl.d - sl.t);
add('slab-long', long({
  stem: '(a) Derive an expression for the capacitance of a parallel-plate capacitor containing a dielectric slab of thickness t and dielectric constant K (t < d). [2] (b) Plates of area 0.015 m² are 5.0 mm apart. Find the capacitance (i) with air only, (ii) with a 2.0 mm slab of K = 5 inserted, (iii) with a 2.0 mm metal plate inserted instead. [3]',
  model: r`(a) Field $E_0 = Q/\varepsilon_0A$ in air and $E_0/K$ in the slab: $V = E_0(d - t) + E_0t/K$, so $C = \dfrac{\varepsilon_0A}{d - t + t/K}$.

(b)(i) $C_0 = \dfrac{8.85 \times 10^{-12} \times 0.015}{5.0 \times 10^{-3}} \approx ${sci(sl.C0, 3)}$ F.
(ii) Effective gap $= 3.0 + 0.4 = 3.4$ mm: $C = \dfrac{1.3275 \times 10^{-13}}{3.4 \times 10^{-3}} \approx ${sci(sl.C, 3)}$ F.
(iii) Metal ($K \to \infty$): gap 3.0 mm, $C = ${sci(sl.Cm, 3)}$ F.`,
  sol: 'Derivation; three cases.',
  scheme: [['Fields in air and slab', 1], ['C = ε₀A/(d − t + t/K)', 1], ['C₀ ≈ 2.66 × 10⁻¹¹ F', 1], ['With slab ≈ 3.90 × 10⁻¹¹ F', 1], ['With metal plate ≈ 4.43 × 10⁻¹¹ F', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}), () => near(sl.C, 3.904e-11) && near(sl.Cm, 4.425e-11) || 'sl');
const sh2 = { C1: 3e-6, V1: 200, C2: 2e-6, V2: 100 };
sh2.V = (sh2.C1 * sh2.V1 + sh2.C2 * sh2.V2) / (sh2.C1 + sh2.C2);
sh2.Ub = 0.5 * sh2.C1 * sh2.V1 ** 2 + 0.5 * sh2.C2 * sh2.V2 ** 2;
sh2.Ua = 0.5 * (sh2.C1 + sh2.C2) * sh2.V ** 2;
sh2.loss = sh2.Ub - sh2.Ua;
add('sharing-long', long({
  stem: 'A 3.0 μF capacitor charged to 200 V and a 2.0 μF capacitor charged to 100 V are connected together, positive plate to positive plate. (a) Find the common potential. [2] (b) Find the total energy before and after, and the energy lost. [2] (c) Explain why energy is lost although charge is conserved. [1]',
  model: r`(a) Total charge $= 3.0 \times 200 + 2.0 \times 100 = 800\ \mu$C on $5.0\ \mu$F: $V = \dfrac{800}{5.0} = ${dec(sh2.V, 3)}$ V.

(b) Before: $\tfrac12 \times 3.0 \times 10^{-6} \times 200^2 + \tfrac12 \times 2.0 \times 10^{-6} \times 100^2 = ${sci(sh2.Ub, 3)}$ J. After: $\tfrac12 \times 5.0 \times 10^{-6} \times 160^2 = ${sci(sh2.Ua, 3)}$ J. Loss $= ${sci(sh2.loss, 3)}$ J.

(c) Charge flows from one capacitor to the other through the connecting wires; the flowing current dissipates energy as heat (and some radiation). Charge is conserved but this energy is converted to other forms.`,
  sol: 'Conserve charge; compare energies.',
  scheme: [['Total charge 800 μC', 1], ['V = 160 V', 1], ['Energies 0.070 J and 0.064 J', 1], ['Loss 6.0 × 10⁻³ J', 1], ['Heat in wires during charge flow', 1]],
  d: 4, c: 'analysis', t: [4], wl: null,
}), () => near(sh2.V, 160) && near(sh2.loss, 6e-3) || 'sh2');
