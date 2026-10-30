// ch12 Atoms — question bank. Numbers are computed here (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C,
// h = 6.63 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, hc ≈ 1243 eV nm, Eₙ = −13.6/n² eV) and re-checked by `check` functions.
// AR keys planned: a a b c a d.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { K, QE, H, ME, HC, En, lamFor } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const closest = (Z, KeV) => (K * 2 * Z * QE) / KeV; // metres, K in eV

// ================================================================ t01 alpha scattering and the nuclear model
add('impact-mcq', mcq({
  stem: 'Four alpha particles approach a gold nucleus with different impact parameters. The one deflected through the largest angle has',
  right: 'the smallest impact parameter',
  wrong: ['the largest impact parameter', 'the lowest speed but a large impact parameter', 'an impact parameter equal to the radius of the atom'],
  sol: 'The closer the aim (smaller b), the stronger the repulsion it feels and the larger the deflection — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('double-mcq', mcq({
  stem: 'The kinetic energy of the alpha particles in a scattering experiment is doubled. The distance of closest approach for a head-on collision with the same nucleus becomes',
  right: 'half as large',
  wrong: ['twice as large', 'unchanged', 'one quarter as large'],
  sol: 'd = 2Ze²/(4πε₀K) ∝ 1/K, so doubling K halves d — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('empty-ar', ar({
  a: 'Most alpha particles pass through a thin gold foil with little or no deflection.',
  r: 'Most of the volume of an atom is empty space.',
  key: 'a',
  sol: 'Both true, and R explains A: most particles never come near a nucleus, so they pass straight through — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('thomson-mcq', mcq({
  stem: 'According to Thomson’s model of the atom, alpha particles passing through a thin metal foil should',
  right: 'be deflected only through very small angles',
  wrong: ['often bounce straight back', 'be absorbed completely', 'be deflected through large angles as often as small ones'],
  sol: 'With the positive charge spread through the atom, the forces on a fast alpha particle are weak, so deflections should be tiny — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('foil-mcq', mcq({
  stem: 'Geiger and Marsden used a gold foil only about 0.2 μm thick. The main reason for making it so thin was',
  right: 'so that most alpha particles would be scattered by at most one nucleus',
  wrong: ['so that the alpha particles would gain energy', 'to make the foil electrically neutral', 'to stop all the alpha particles inside the foil'],
  sol: 'A very thin foil makes multiple scattering unlikely, so the measured angles come from single encounters with nuclei — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('zns-fill', fill({
  stem: 'In the Geiger–Marsden experiment, scattered alpha particles were detected by the flashes they produced on a screen coated with zinc ___.',
  acc: [['sulphide', 'sulfide', 'ZnS']],
  sol: 'Zinc **sulphide**, which gives a tiny flash of light when an alpha particle strikes it.',
  d: 1, c: 'recall', t: [1],
}));
add('half-tf', tf({
  stem: 'In the alpha-scattering experiment, about half of the alpha particles were deflected through more than 90°.',
  key: 'f',
  sol: 'False. Only about 1 in 8000 was deflected through more than 90°; most passed through almost undeflected.',
  d: 1, c: 'recall', t: [1],
}));
const c1 = closest(79, 7.7e6);
add('closest-num', num({
  stem: 'An alpha particle of kinetic energy 7.7 MeV is directed head-on at a gold nucleus (Z = 79). Find the distance of closest approach, in femtometres (1 fm = 10⁻¹⁵ m) (3 significant figures). (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C.)',
  value: Number(dec(c1 * 1e15, 3)), tol: 0.3, unit: 'fm',
  sol: r`$d = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2Ze^2}{K} = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{7.7 \times 10^{6} \times 1.6 \times 10^{-19}} \approx ${sci(c1, 3)}$ m, i.e. $${sci(c1, 3)} \times 10^{15} = ${dec(c1 * 1e15, 3)}$ fm.`,
  scheme: [['K = 2Ze²/(4πε₀d)', 1], ['d ≈ 29.5 fm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(c1 * 1e15, q.answer.value) && near(c1, 2.955e-14) || `c1 ${c1}`);
const zc = { KeV: 4.0e6, Z: 29 };
zc.d = closest(zc.Z, zc.KeV);
zc.dfm = Number(dec(zc.d * 1e15, 3));
zc.Zback = (zc.dfm * 1e-15 * zc.KeV) / (K * 2 * QE);
add('Z-num', num({
  stem: `A 4.0 MeV alpha particle aimed head-on at a nucleus comes to rest momentarily ${zc.dfm} fm from its centre. Find the atomic number of the nucleus.`,
  value: zc.Z, tol: 0.5, unit: '',
  sol: r`$Z = \dfrac{dK}{2e^2/(4\pi\varepsilon_0)} = \dfrac{${zc.dfm} \times 10^{-15} \times 4.0 \times 10^{6} \times 1.6 \times 10^{-19}}{9 \times 10^{9} \times 2 \times (1.6 \times 10^{-19})^2} \approx ${dec(zc.Zback, 3)}$, so $Z = 29$ (copper).`,
  scheme: [['Rearrange for Z', 1], ['Z = 29', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), () => near(zc.Zback, 29, 0.003) || `zc ${zc.Zback}`);
const ke10 = (K * 2 * 79 * QE) / 1e-14 / 1e6;
add('Kneeded-num', num({
  stem: 'What kinetic energy, in MeV, must an alpha particle have to reach within 10 fm (1.0 × 10⁻¹⁴ m) of the centre of a gold nucleus (Z = 79) in a head-on approach? (3 significant figures)',
  value: Number(dec(ke10, 3)), tol: 0.2, unit: 'MeV',
  sol: r`$K = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2Ze^2}{d} = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{1.0 \times 10^{-14}} \approx ${sci(ke10 * 1e6 * QE, 3)}$ J. In MeV: $\dfrac{${sci(ke10 * 1e6 * QE, 3)}}{1.6 \times 10^{-13}} = ${dec(ke10, 3)}$.`,
  scheme: [['K = 2Ze²/(4πε₀d) in joules', 1], ['≈ 22.8 MeV', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(ke10, q.answer.value) && near(ke10, 22.75) || `ke10 ${ke10}`);
add('protonalpha-mcq', mcq({
  stem: 'A proton and an alpha particle with the same kinetic energy are each fired head-on at the same nucleus. The ratio of their distances of closest approach, d_proton : d_alpha, is',
  right: '1 : 2',
  wrong: ['2 : 1', '1 : 4', '1 : 1'],
  sol: 'd = q₁Ze/(4πε₀K): with equal K, d is proportional to the projectile’s charge, e for the proton and 2e for the alpha — option (@K).',
  d: 4, c: 'analysis', t: [1],
}));
add('rest-mcq', mcq({
  stem: 'At the point of closest approach in a head-on collision with a nucleus, the alpha particle',
  right: 'is momentarily at rest, with all its kinetic energy turned into electric potential energy',
  wrong: ['moves at its maximum speed', 'has zero potential energy', 'has lost all its charge'],
  sol: 'It slows to rest, turns and is pushed back; at that instant K = 0 and U = 2Ze²/(4πε₀d) equals its initial kinetic energy — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('drawbacks-short', short({
  marks: 2,
  stem: 'State two drawbacks of Rutherford’s nuclear model of the atom.',
  model: '(1) An electron revolving round the nucleus is **accelerated**, so by classical electromagnetism it should **radiate energy** and **spiral into the nucleus**; atoms would be unstable, yet they are stable. (2) The radiated frequency would change continuously, giving a **continuous spectrum**, but atoms emit **line spectra**.',
  sol: 'Instability and continuous spectrum.',
  scheme: [['Accelerated electron radiates and spirals in', 1], ['Predicts continuous, not line, spectrum', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('observe-short3', short({
  marks: 3,
  stem: 'State three observations of the Geiger–Marsden alpha-scattering experiment and the conclusion Rutherford drew from each.',
  model: '(1) **Most** alpha particles passed straight through: the atom is **mostly empty space**. (2) A **few** were deflected through **large angles**: the positive charge is concentrated in a very **small region** where the repulsion is strong. (3) About 1 in 8000 was turned back by more than 90°, some almost **straight back**: that small region (the **nucleus**) also holds nearly all the **mass**, so it is not pushed aside.',
  sol: 'Observation → conclusion, three times.',
  scheme: [['Straight through → mostly empty', 1], ['Large angles → concentrated positive charge', 1], ['Back-scattering → massive nucleus', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fraction-mcq', mcq({
  stem: 'If an atom has a radius of about 10⁻¹⁰ m and its nucleus a radius of about 10⁻¹⁴ m, the fraction of the atom’s volume occupied by the nucleus is about',
  right: '10⁻¹²',
  wrong: ['10⁻⁴', '10⁻⁸', '10⁻²⁴'],
  sol: 'Volume ∝ r³: (10⁻¹⁴/10⁻¹⁰)³ = (10⁻⁴)³ = 10⁻¹² — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('rare-ar', ar({
  a: 'The number of alpha particles scattered through large angles is very small compared with the number scattered through small angles.',
  r: 'Only alpha particles with very small impact parameters are scattered through large angles, and very few particles have such small impact parameters.',
  key: 'a',
  sol: 'Both true, and R explains A: the target area for close approach is tiny, so large-angle scattering is rare — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('gold-ar', ar({
  a: 'The gold foil used by Geiger and Marsden was extremely thin.',
  r: 'Gold has a large atomic number.',
  key: 'b',
  sol: 'Both true, but R does not explain A: the foil was thin so that each alpha particle met at most one nucleus; gold’s large Z gives strong scattering, a different point — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('estimate-short', short({
  marks: 2,
  stem: 'Explain how the distance of closest approach of an alpha particle gives an estimate of the size of a nucleus.',
  model: 'In a head-on approach the alpha particle stops where its kinetic energy equals the electric potential energy $2Ze^2/4\\pi\\varepsilon_0 d$, and is turned back **without touching** the nucleus. So the nucleus must be **smaller** than $d$: $d$ is an **upper limit** to the nuclear radius, about $10^{-14}$ m for gold with 5 MeV alphas.',
  sol: 'Turned back before contact: nucleus smaller than d.',
  scheme: [['K = U at closest approach', 1], ['Nucleus smaller than d: upper limit', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('impact-short', short({
  marks: 2,
  stem: 'What is the impact parameter of an alpha particle in a scattering experiment? How does the scattering angle depend on it?',
  model: 'The **impact parameter** is the **perpendicular distance** between the line of the alpha particle’s initial velocity and the **centre of the nucleus**. The **smaller** it is, the closer the particle passes and the **larger** the scattering angle; for zero impact parameter (head-on) the particle is turned straight back, θ = 180°.',
  sol: 'Definition; θ falls as b rises.',
  scheme: [['Definition', 1], ['Smaller b → larger θ; b = 0 → 180°', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 Bohr model
add('radius-num', num({
  stem: 'In the Bohr model of hydrogen, find the ratio of the radius of the fourth orbit to the radius of the second orbit.',
  value: 4, tol: 0.01, unit: '',
  sol: r`$r_n \propto n^2$, so $\dfrac{r_4}{r_2} = \dfrac{4^2}{2^2} = \dfrac{16}{4} = 4$.`,
  scheme: [['r ∝ n²: ratio 16/4 = 4', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('negative-tf', tf({
  stem: 'The total energy of the electron in a Bohr orbit of hydrogen is negative, which shows that the electron is bound to the nucleus.',
  key: 't',
  sol: 'True. Zero energy corresponds to a free electron at rest far away; a negative total means energy must be supplied to free it.',
  d: 1, c: 'understanding', t: [2],
}));
add('quantum-fill', fill({
  stem: 'Bohr’s second postulate states that the angular momentum of the electron in a stationary orbit is an integral multiple of ___.',
  acc: [['h/2π', 'h/2pi', 'h/(2π)', 'ħ', 'h-bar']],
  sol: '**h/2π**: $mvr = nh/2\\pi$.',
  d: 1, c: 'recall', t: [2],
}));
const v4 = 2.18e6 / 4;
add('v4-num', num({
  stem: 'The speed of the electron in the first Bohr orbit of hydrogen is 2.18 × 10⁶ m s⁻¹. Find its speed in the fourth orbit, in units of 10⁵ m s⁻¹ (3 significant figures).',
  value: Number(dec(v4 / 1e5, 3)), tol: 0.02, unit: '× 10⁵ m s⁻¹',
  sol: r`$v_n = \dfrac{v_1}{n}$, so $v_4 = \dfrac{2.18 \times 10^{6}}{4} = ${sci(v4, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(v4, 3)}}{10^{5}} = ${dec(v4 / 1e5, 3)}$.`,
  scheme: [['v ∝ 1/n: 5.45 × 10⁵ m s⁻¹', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(v4 / 1e5, q.answer.value) || 'v4');
const k3 = 13.6 / 9;
add('K3-num', num({
  stem: 'Find the kinetic energy of the electron in the n = 3 orbit of hydrogen, in eV (3 significant figures).',
  value: Number(dec(k3, 3)), tol: 0.02, unit: 'eV',
  sol: r`$E_3 = -\dfrac{13.6}{9} \approx ${dec(En(3), 3)}$ eV and $K = -E$, so $K_3 = \dfrac{13.6}{9} = ${dec(k3, 3)}$ eV.`,
  scheme: [['K = −E = 13.6/9 ≈ 1.51 eV', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(k3, q.answer.value) || 'k3');
add('U1-num', num({
  stem: 'Find the potential energy of the electron in the ground state of hydrogen, in eV.',
  value: -27.2, tol: 0.1, unit: 'eV',
  sol: r`$E_1 = -13.6$ eV and $U = 2E$, so $U_1 = 2 \times (-13.6) = -27.2$ eV.`,
  scheme: [['U = 2E', 1], ['−27.2 eV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}));
add('KUE-mcq', mcq({
  stem: 'For the electron in any Bohr orbit of hydrogen, the kinetic energy K, potential energy U and total energy E are in the ratio K : U : E =',
  right: '1 : −2 : −1',
  wrong: ['1 : −1 : 0', '2 : −1 : 1', '1 : 2 : 3'],
  sol: 'K = e²/(8πε₀r), U = −e²/(4πε₀r) = −2K, E = K + U = −K — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const L3 = (3 * H) / (2 * Math.PI);
add('L3-num', num({
  stem: 'Find the angular momentum of the electron in the third Bohr orbit of hydrogen, in units of 10⁻³⁴ J s (3 significant figures). (h = 6.63 × 10⁻³⁴ J s.)',
  value: Number(dec(L3 / 1e-34, 3)), tol: 0.02, unit: '× 10⁻³⁴ J s',
  sol: r`$L = \dfrac{nh}{2\pi} = \dfrac{3 \times 6.63 \times 10^{-34}}{2\pi} \approx ${sci(L3, 3)}$ J s, i.e. $\dfrac{${sci(L3, 3)}}{10^{-34}} = ${dec(L3 / 1e-34, 3)}$.`,
  scheme: [['L = nh/2π', 1], ['≈ 3.17 × 10⁻³⁴ J s', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(L3 / 1e-34, q.answer.value) || 'L3');
const per = (2 * Math.PI * 5.3e-11) / 2.18e6;
add('period-num', num({
  stem: 'Using r₁ = 5.3 × 10⁻¹¹ m and v₁ = 2.18 × 10⁶ m s⁻¹, find the time taken by the electron to go once round the first Bohr orbit, in units of 10⁻¹⁶ s (3 significant figures).',
  value: Number(dec(per / 1e-16, 3)), tol: 0.02, unit: '× 10⁻¹⁶ s',
  sol: r`$T = \dfrac{2\pi r_1}{v_1} = \dfrac{2\pi \times 5.3 \times 10^{-11}}{2.18 \times 10^{6}} \approx ${sci(per, 3)}$ s, i.e. $\dfrac{${sci(per, 3)}}{10^{-16}} = ${dec(per / 1e-16, 3)}$.`,
  scheme: [['T = 2πr/v', 1], ['≈ 1.53 × 10⁻¹⁶ s', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(per / 1e-16, q.answer.value) || 'per');
add('freq-mcq', mcq({
  stem: 'In the Bohr model, how does the frequency of revolution of the electron depend on the principal quantum number n?',
  right: 'It is proportional to 1/n³',
  wrong: ['It is proportional to 1/n', 'It is proportional to n²', 'It is proportional to 1/n²'],
  sol: 'f = v/(2πr) with v ∝ 1/n and r ∝ n², so f ∝ (1/n)/n² = 1/n³ — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('radius-short3', short({
  marks: 3,
  stem: 'Using Bohr’s postulates, derive an expression for the radius of the nth orbit of the electron in a hydrogen atom.',
  model: r`The Coulomb attraction provides the centripetal force: $\dfrac{mv^2}{r} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{e^2}{r^2}$, so $mv^2 r = \dfrac{e^2}{4\pi\varepsilon_0}$ … (1). Bohr’s quantum condition: $mvr = \dfrac{nh}{2\pi}$, so $v = \dfrac{nh}{2\pi mr}$ … (2). Substituting (2) in (1): $m\dfrac{n^2h^2}{4\pi^2m^2r^2}r = \dfrac{e^2}{4\pi\varepsilon_0}$, giving $r_n = \dfrac{n^2h^2\varepsilon_0}{\pi me^2}$, so $r_n \propto n^2$.`,
  sol: 'Force balance plus quantisation.',
  scheme: [['Force balance', 1], ['mvr = nh/2π used to eliminate v', 1], ['r_n = n²h²ε₀/πme²', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('energy-short3', short({
  marks: 3,
  stem: 'Show that the total energy of the electron in the nth orbit of hydrogen is Eₙ = −e²/(8πε₀rₙ), and hence explain why it is negative and why it increases (becomes less negative) with n.',
  model: r`From $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0 r^2}$: $K = \tfrac{1}{2}mv^2 = \dfrac{e^2}{8\pi\varepsilon_0 r}$. Potential energy $U = -\dfrac{e^2}{4\pi\varepsilon_0 r}$. So $E = K + U = -\dfrac{e^2}{8\pi\varepsilon_0 r_n}$. It is **negative** because the electron is **bound** (energy is needed to free it). Since $r_n \propto n^2$, $|E_n|$ falls as $n$ rises, so $E_n$ **increases** towards zero.`,
  sol: 'K from force balance, U, add.',
  scheme: [['K = e²/8πε₀r', 1], ['U = −e²/4πε₀r, E = −e²/8πε₀r', 1], ['Negative (bound); rises towards 0 as r ∝ n² grows', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('dbwave-short', short({
  marks: 2,
  stem: 'Show that Bohr’s quantisation condition follows if the electron in an orbit is treated as a de Broglie wave that forms a standing wave round the orbit.',
  model: r`For a standing wave, a **whole number** of wavelengths must fit round the circumference: $2\pi r = n\lambda$. With de Broglie’s $\lambda = \dfrac{h}{mv}$: $2\pi r = \dfrac{nh}{mv}$, so $mvr = \dfrac{nh}{2\pi}$, which is **Bohr’s second postulate**.`,
  sol: '2πr = nλ with λ = h/mv.',
  scheme: [['2πr = nλ for a standing wave', 1], ['With λ = h/mv gives mvr = nh/2π', 1]],
  d: 4, c: 'analysis', t: [2], wl: null,
}));
add('ion3-num', num({
  stem: 'How much energy, in eV, is needed to ionise a hydrogen atom whose electron is in the n = 3 level? (3 significant figures)',
  value: Number(dec(13.6 / 9, 3)), tol: 0.02, unit: 'eV',
  sol: r`$E_3 = -\dfrac{13.6}{9}$ eV; ionisation needs $0 - E_3 = \dfrac{13.6}{9} = ${dec(13.6 / 9, 3)}$ eV.`,
  scheme: [['13.6/9 ≈ 1.51 eV', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('excite-mcq', mcq({
  stem: 'The minimum energy needed to raise a hydrogen atom from its ground state to its first excited state is',
  right: '10.2 eV',
  wrong: ['3.4 eV', '13.6 eV', '6.8 eV'],
  sol: 'E₂ − E₁ = −3.4 − (−13.6) = 10.2 eV — option (@K).',
  d: 2, c: 'application', t: [2, 3],
}));
const bomb = { E: 12.5 };
bomb.top = [1, 2, 3, 4, 5].filter((n) => En(n) - En(1) <= bomb.E).pop();
bomb.lines = (bomb.top * (bomb.top - 1)) / 2;
add('bombard-mcq', mcq({
  stem: 'Hydrogen atoms in the ground state are bombarded with electrons of energy 12.5 eV. The highest level the atoms can be excited to, and the number of different spectral lines that can then be emitted, are',
  right: 'n = 3, and 3 lines',
  wrong: ['n = 4, and 6 lines', 'n = 2, and 1 line', 'n = 3, and 2 lines'],
  sol: 'E₃ − E₁ = 13.6(1 − 1/9) ≈ 12.09 eV ≤ 12.5 eV, but E₄ − E₁ ≈ 12.75 eV > 12.5 eV; so n = 3, giving 3 → 2, 3 → 1 and 2 → 1 — option (@K).',
  d: 4, c: 'analysis', t: [2, 3],
}), () => (bomb.top === 3 && bomb.lines === 3) || `bomb ${bomb.top}`);
add('postulates-short', short({
  marks: 2,
  stem: 'State Bohr’s postulates for the hydrogen atom.',
  model: '(1) The electron revolves in certain **stationary orbits** without radiating energy. (2) In these orbits its **angular momentum** is $mvr = nh/2\\pi$ ($n = 1, 2, 3, \\dots$). (3) When it jumps from an orbit of energy $E_i$ to one of lower energy $E_f$, it emits a **photon** of frequency given by $h\\nu = E_i - E_f$.',
  sol: 'Three postulates.',
  scheme: [['Stationary orbits and quantised angular momentum', 1], ['Frequency condition hν = E_i − E_f', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('accel-ar', ar({
  a: 'In Bohr’s model, an electron in a stationary orbit does not radiate energy.',
  r: 'An electron moving in a circular orbit at constant speed has no acceleration.',
  key: 'c',
  sol: 'A is true (it is Bohr’s first postulate). R is false: circular motion always involves centripetal acceleration; Bohr simply postulated that these orbits do not radiate — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('helium-mcq', mcq({
  stem: 'Bohr’s theory also applies to a helium ion He⁺ (one electron, nuclear charge 2e), for which Eₙ = −13.6Z²/n² eV. The ground-state energy of He⁺ is',
  right: '−54.4 eV',
  wrong: ['−27.2 eV', '−13.6 eV', '−6.8 eV'],
  sol: 'E₁ = −13.6 × 2²/1² = −54.4 eV — option (@K).',
  d: 3, c: 'application', t: [2],
}));

// ================================================================ t03 hydrogen spectrum
add('visible-mcq', mcq({
  stem: 'The visible lines in the spectrum of hydrogen belong to the series in which the electron ends up in the level',
  right: 'n = 2 (Balmer series)',
  wrong: ['n = 1 (Lyman series)', 'n = 3 (Paschen series)', 'n = 4 (Brackett series)'],
  sol: 'Jumps to n = 2 release 1.9–3.4 eV photons, in the visible and near UV: the Balmer series — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const hb = { dE: En(4) - En(2) };
hb.lam = lamFor(hb.dE);
add('Hbeta-num', num({
  stem: 'Find the wavelength of the photon emitted when the electron in a hydrogen atom falls from n = 4 to n = 2, in nm (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(hb.lam, 3)), tol: 2, unit: 'nm',
  sol: r`$\Delta E = 13.6\left(\dfrac{1}{4} - \dfrac{1}{16}\right) = 13.6 \times \dfrac{3}{16} = ${dec(hb.dE, 3)}$ eV; $\lambda = \dfrac{1243}{${dec(hb.dE, 3)}} \approx ${dec(hb.lam, 3)}$ nm (blue-green).`,
  scheme: [['ΔE = 2.55 eV', 1], ['λ ≈ 488 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(hb.lam, q.answer.value) && near(hb.lam, 487.5) || `hb ${hb.lam}`);
const pa = { dE: En(4) - En(3) };
pa.lam = lamFor(pa.dE) / 1000;
add('paschen-num', num({
  stem: 'Find the wavelength of the first (longest-wavelength) line of the Paschen series of hydrogen, in micrometres (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(pa.lam, 3)), tol: 0.01, unit: 'μm',
  sol: r`First Paschen line: $4 \to 3$. $\Delta E = 13.6\left(\dfrac{1}{9} - \dfrac{1}{16}\right) = 13.6 \times \dfrac{7}{144} \approx ${dec(pa.dE, 3)}$ eV; $\lambda = \dfrac{1243}{${dec(pa.dE, 3)}} \approx ${dec(pa.lam * 1000, 4)}$ nm, i.e. $\dfrac{${dec(pa.lam * 1000, 4)}}{1000} = ${dec(pa.lam, 3)}$ μm (infrared).`,
  scheme: [['Transition 4 → 3, ΔE ≈ 0.661 eV', 1], ['λ ≈ 1.88 μm', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(pa.lam, q.answer.value) && near(pa.lam, 1.88) || `pa ${pa.lam}`);
add('lines5-num', num({
  stem: 'A hydrogen atom’s electron is excited to the n = 5 level. How many different spectral lines can be emitted as atoms like this return to the ground state?',
  value: 10, tol: 0.1, unit: '',
  sol: r`Number of lines $= \dfrac{n(n - 1)}{2} = \dfrac{5 \times 4}{2} = 10$.`,
  scheme: [['n(n − 1)/2 = 10', 1]],
  d: 2, c: 'application', t: [3],
}));
add('longest-mcq', mcq({
  stem: 'The longest wavelength in the Lyman series of hydrogen comes from the transition',
  right: 'n = 2 → n = 1',
  wrong: ['n = ∞ → n = 1', 'n = 3 → n = 1', 'n = 3 → n = 2'],
  sol: 'Within a series the smallest energy jump gives the longest wavelength; for Lyman that is 2 → 1 (10.2 eV, about 122 nm) — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('series-match', match({
  stem: 'Match each series of hydrogen lines in Column A with the region of the spectrum in Column B.',
  pairs: [['Lyman', 'Ultraviolet'], ['Balmer', 'Visible'], ['Paschen', 'Infrared'], ['Pfund', 'Far infrared']],
  order: [1, 3, 0, 2],
  sol: 'Lyman → ultraviolet (1 → q); Balmer → visible (2 → s); Paschen → infrared (3 → p); Pfund → far infrared (4 → r).',
  d: 1, c: 'recall', t: [3],
}));
add('absorb-ar', ar({
  a: 'Cool hydrogen gas in front of a white-light source absorbs only certain wavelengths.',
  r: 'A photon is absorbed only if its energy equals the difference between two energy levels of the atom.',
  key: 'a',
  sol: 'Both true, and R explains A: only photons that exactly match an allowed jump are absorbed, giving dark lines at those wavelengths — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('continuous-tf', tf({
  stem: 'Hydrogen gas in a discharge tube emits a continuous spectrum containing all wavelengths of visible light.',
  key: 'f',
  sol: 'False. It emits a line spectrum: only wavelengths that match jumps between its discrete energy levels.',
  d: 1, c: 'understanding', t: [3],
}));
const il = lamFor(13.6);
add('ionlam-num', num({
  stem: 'Find the longest wavelength of light that can ionise a hydrogen atom in its ground state, in nm (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(il, 3)), tol: 0.5, unit: 'nm',
  sol: r`Ionisation needs 13.6 eV, so $\lambda_\text{max} = \dfrac{hc}{13.6} = \dfrac{1243}{13.6} \approx ${dec(il, 3)}$ nm (ultraviolet; the Lyman series limit).`,
  scheme: [['E = 13.6 eV', 1], ['λ ≈ 91.4 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [2, 3],
}), (q) => near(il, q.answer.value) || 'il');
const lr = { ly: lamFor(En(2) - En(1)), ba: lamFor(En(3) - En(2)) };
lr.ratio = lr.ly / lr.ba;
add('lratio-num', num({
  stem: 'Find the ratio of the longest wavelength in the Lyman series to the longest wavelength in the Balmer series of hydrogen (3 significant figures).',
  value: Number(dec(lr.ratio, 3)), tol: 0.003, unit: '',
  sol: r`Longest Lyman: $2 \to 1$, $\Delta E = 13.6 \times \dfrac{3}{4}$. Longest Balmer: $3 \to 2$, $\Delta E = 13.6 \times \dfrac{5}{36}$. Since $\lambda \propto 1/\Delta E$: $\dfrac{\lambda_L}{\lambda_B} = \dfrac{5/36}{3/4} = \dfrac{5}{27} = ${dec(lr.ratio, 3)}$.`,
  scheme: [['Identify 2 → 1 and 3 → 2', 1], ['Ratio 5/27 ≈ 0.185', 1]],
  marks: 2, d: 5, c: 'analysis', t: [3],
}), (q) => near(lr.ratio, 5 / 27) && near(q.answer.value, 0.185) || `lr ${lr.ratio}`);
add('crowd-short', short({
  marks: 2,
  stem: 'Why do the lines of a hydrogen series crowd closer and closer together towards the short-wavelength end?',
  model: 'The energy levels $E_n = -13.6/n^2$ eV get **closer together** as $n$ increases and approach 0. Jumps from successive high levels to the same lower level therefore differ in energy by **smaller and smaller** amounts, so their wavelengths bunch up towards the **series limit**, set by a jump from $n = \\infty$.',
  sol: 'Upper levels converge.',
  scheme: [['Levels converge towards 0 as n rises', 1], ['Photon energies, and so lines, converge to the series limit', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('linespec-short3', short({
  marks: 3,
  stem: 'Explain, using the idea of energy levels, why hydrogen gives a line emission spectrum, and why each line has a definite wavelength.',
  model: 'In a discharge, collisions **excite** hydrogen atoms to **higher levels**. The excited electron soon **falls** to a lower level, emitting a **photon** of energy $h\\nu = E_i - E_f$. Since the electron can have only **discrete** energies $E_n = -13.6/n^2$ eV, only certain **differences** are possible, so only certain photon energies, and therefore **definite wavelengths** $\\lambda = hc/(E_i - E_f)$, appear as separate bright lines.',
  sol: 'Excitation, de-excitation, discrete levels.',
  scheme: [['Atoms excited to higher levels', 1], ['Photon hν = E_i − E_f on falling', 1], ['Discrete levels → definite wavelengths, lines', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const n4 = { long: lamFor(En(4) - En(3)), short: lamFor(En(4) - En(1)) };
add('n4-short3', short({
  marks: 3,
  stem: 'A hydrogen atom’s electron is in the n = 4 level. List the possible transitions to lower levels, and find the longest and shortest wavelengths that can be emitted. (hc = 1243 eV nm.)',
  model: r`Transitions: 4 → 3, 4 → 2, 4 → 1, 3 → 2, 3 → 1, 2 → 1 (six lines). Longest wavelength: smallest jump, 4 → 3: $\Delta E = 13.6\left(\dfrac{1}{9} - \dfrac{1}{16}\right) \approx ${dec(En(4) - En(3), 3)}$ eV, $\lambda = \dfrac{1243}{${dec(En(4) - En(3), 3)}} \approx ${dec(n4.long, 4)}$ nm (infrared). Shortest: largest jump, 4 → 1: $\Delta E = 13.6 \times \dfrac{15}{16} = ${dec(En(4) - En(1), 4)}$ eV, $\lambda = \dfrac{1243}{${dec(En(4) - En(1), 4)}} \approx ${dec(n4.short, 3)}$ nm (ultraviolet).`,
  sol: 'Six transitions; extremes are 4 → 3 and 4 → 1.',
  scheme: [['Six transitions listed', 1], ['Longest: 4 → 3, ≈ 1880 nm', 1], ['Shortest: 4 → 1, ≈ 97.5 nm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(n4.long, 1880, 0.003) && near(n4.short, 97.5) || `n4 ${n4.long} ${n4.short}`);

// ================================================================ long answers (5 marks)
const sc = closest(79, 6.0e6);
add('scatter-long', long({
  stem: '(a) Describe the Geiger–Marsden alpha-scattering experiment with a labelled diagram (described in words). (b) State its main observations and Rutherford’s conclusions. (c) Sketch (describe) the graph of the number of scattered particles against scattering angle. (d) Find the distance of closest approach of a 6.0 MeV alpha particle to a gold nucleus (Z = 79).',
  model: r`(a) Alpha particles from a radioactive source in a lead block pass through a slit (collimator) as a narrow beam onto a very thin gold foil, in vacuum. A zinc sulphide screen with a microscope, which can be rotated round the foil, counts the flashes made by particles scattered through each angle θ.

(b) Most particles pass undeflected → the atom is mostly empty space. A few are deflected through large angles and about 1 in 8000 by more than 90° → the positive charge and almost all the mass are in a tiny nucleus.

(c) The number falls very steeply as θ increases (as $1/\sin^4(\theta/2)$), but is not zero even near 180°.

(d) $d = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2Ze^2}{K} = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{6.0 \times 10^{6} \times 1.6 \times 10^{-19}} \approx ${sci(sc, 3)}$ m (about 38 fm).`,
  sol: 'Set-up; observations and conclusions; N(θ) graph; d.',
  scheme: [['Arrangement described', 1], ['Observations', 1], ['Conclusions: empty atom, tiny massive nucleus', 1], ['Graph falls steeply with θ', 1], ['d ≈ 3.79 × 10⁻¹⁴ m', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(sc, 3.79e-14) || `sc ${sc}`);
const bl = { n: 2 };
bl.r = 4 * 5.3e-11;
bl.v = 2.18e6 / 2;
add('bohr-long', long({
  stem: '(a) State Bohr’s postulates. (b) Derive expressions for the speed of the electron and the radius of its orbit in the nth orbit of the hydrogen atom. (c) Taking r₁ = 5.3 × 10⁻¹¹ m and v₁ = 2.18 × 10⁶ m s⁻¹, find the radius and speed in the first excited state.',
  model: r`(a) (1) The electron revolves in certain stationary orbits without radiating. (2) In them $mvr = \dfrac{nh}{2\pi}$. (3) A jump from $E_i$ to $E_f$ emits a photon with $h\nu = E_i - E_f$.

(b) Force balance: $\dfrac{mv^2}{r} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{e^2}{r^2}$ … (1). Quantisation: $mvr = \dfrac{nh}{2\pi}$ … (2). Dividing (1)·r² by (2): $v = \dfrac{e^2}{4\pi\varepsilon_0}\cdot\dfrac{2\pi}{nh} = \dfrac{e^2}{2\varepsilon_0 nh}$. From (2), $r = \dfrac{nh}{2\pi mv} = \dfrac{n^2h^2\varepsilon_0}{\pi me^2}$.

(c) First excited state: $n = 2$. $r_2 = 4r_1 = ${sci(bl.r, 3)}$ m; $v_2 = \dfrac{v_1}{2} = ${sci(bl.v, 3)}$ m s$^{-1}$.`,
  sol: 'Postulates; force balance with quantisation; scale with n.',
  scheme: [['Three postulates', 1], ['Force balance and quantum condition', 1], ['v_n = e²/2ε₀nh', 1], ['r_n = n²h²ε₀/πme²', 1], ['r₂ = 2.12 × 10⁻¹⁰ m, v₂ = 1.09 × 10⁶ m s⁻¹', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => near(bl.r, 2.12e-10) && near(bl.v, 1.09e6) || 'bl');
const el = { dE21: En(2) - En(1) };
el.lam21 = lamFor(el.dE21);
add('energy-long', long({
  stem: '(a) Obtain the expression for the total energy of the electron in the nth orbit of hydrogen in terms of rₙ, and hence show that Eₙ = −13.6/n² eV (you may quote rₙ). (b) Draw (describe) an energy-level diagram showing the first four levels and the ionisation level. (c) Find the energy and wavelength of the photon emitted in the jump from n = 2 to n = 1. (d) What is meant by ionisation energy, and what is its value for hydrogen?',
  model: r`(a) From $\dfrac{mv^2}{r} = \dfrac{e^2}{4\pi\varepsilon_0 r^2}$, $K = \dfrac{e^2}{8\pi\varepsilon_0 r}$; $U = -\dfrac{e^2}{4\pi\varepsilon_0 r}$; so $E_n = -\dfrac{e^2}{8\pi\varepsilon_0 r_n}$. With $r_n = \dfrac{n^2h^2\varepsilon_0}{\pi me^2}$: $E_n = -\dfrac{me^4}{8\varepsilon_0^2h^2n^2}$; the constants give $-13.6/n^2$ eV.

(b) Horizontal lines at −13.6 eV (n = 1), −3.4 eV (n = 2), −1.51 eV (n = 3), −0.85 eV (n = 4), crowding towards 0 eV (n = ∞).

(c) $\Delta E = -3.4 - (-13.6) = ${dec(el.dE21, 3)}$ eV; $\lambda = \dfrac{1243}{${dec(el.dE21, 3)}} \approx ${dec(el.lam21, 4)}$ nm (ultraviolet, first Lyman line).

(d) The least energy needed to remove the electron completely from the atom in its ground state: 13.6 eV for hydrogen.`,
  sol: 'E = K + U; level diagram; ΔE and λ.',
  scheme: [['K and U in terms of r', 1], ['E_n = −13.6/n² eV', 1], ['Level diagram', 1], ['10.2 eV, ≈ 122 nm', 1], ['Ionisation energy 13.6 eV', 1]],
  d: 3, c: 'application', t: [2, 3], wl: null,
}), () => near(el.lam21, 121.9) || `el ${el.lam21}`);
const sl5 = { ha: lamFor(En(3) - En(2)), hb: lamFor(En(4) - En(2)), lim: lamFor(3.4) };
add('spectrum-long', long({
  stem: '(a) Explain how the line spectrum of hydrogen arises. (b) Name the series of lines that end on n = 1, 2 and 3 and the region of each. (c) Calculate the wavelengths of the first two lines of the Balmer series and its series limit. (d) Explain why only the Balmer series is seen when hydrogen in a discharge tube is viewed through a glass prism.',
  model: r`(a) Excited atoms fall from higher to lower levels; each jump emits one photon with $h\nu = E_i - E_f$. Since levels are discrete, only definite wavelengths appear: a line spectrum.

(b) n = 1: Lyman (ultraviolet); n = 2: Balmer (visible and near UV); n = 3: Paschen (infrared).

(c) $3 \to 2$: $\Delta E = 13.6\left(\dfrac{1}{4} - \dfrac{1}{9}\right) \approx 1.89$ eV, $\lambda \approx ${dec(sl5.ha, 3)}$ nm (red). $4 \to 2$: $\Delta E = 2.55$ eV, $\lambda \approx ${dec(sl5.hb, 3)}$ nm (blue-green). Limit: $\Delta E = 3.4$ eV, $\lambda = \dfrac{1243}{3.4} \approx ${dec(sl5.lim, 3)}$ nm.

(d) The Lyman lines are ultraviolet, absorbed by glass and invisible; the Paschen lines are infrared, invisible to the eye. Only Balmer lines fall in the visible range.`,
  sol: 'Jumps; series; three wavelengths; visibility.',
  scheme: [['Origin of lines', 1], ['Three series and regions', 1], ['First two Balmer lines ≈ 658 nm and 488 nm', 1], ['Series limit ≈ 366 nm', 1], ['Why only Balmer is seen', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(sl5.ha, 658) && near(sl5.hb, 487.5) && near(sl5.lim, 365.6) || 'sl5');
const dw = { r2: 4 * 5.3e-11, v2: 2.18e6 / 2 };
dw.lamFit = Math.PI * dw.r2;
dw.lamDB = H / (ME * dw.v2);
add('models-long', long({
  stem: '(a) Compare the Thomson, Rutherford and Bohr models of the atom, giving one success and one failure of each. (b) Show how de Broglie’s hypothesis justifies Bohr’s quantum condition. (c) For the n = 2 orbit (r₂ = 2.12 × 10⁻¹⁰ m, v₂ = 1.09 × 10⁶ m s⁻¹), find the de Broglie wavelength of the electron in two ways — from the orbit and from h/mv — and comment.',
  model: r`(a) **Thomson:** explained neutrality and electrons in atoms; failed to explain large-angle alpha scattering. **Rutherford:** explained alpha scattering with a tiny massive nucleus; failed to explain the stability of atoms and line spectra. **Bohr:** explained the stability of hydrogen and its line spectrum ($E_n = -13.6/n^2$ eV); failed for many-electron atoms and line intensities.

(b) A stable orbit holds a whole number of wavelengths: $2\pi r = n\lambda = \dfrac{nh}{mv}$, so $mvr = \dfrac{nh}{2\pi}$.

(c) From the orbit: $2\pi r_2 = 2\lambda$, so $\lambda = \pi r_2 \approx ${sci(dw.lamFit, 3)}$ m. From $h/mv$: $\dfrac{6.63 \times 10^{-34}}{9.1 \times 10^{-31} \times 1.09 \times 10^{6}} \approx ${sci(dw.lamDB, 3)}$ m. The two agree (within rounding), confirming that exactly two wavelengths fit round the second orbit.`,
  sol: 'Successes and failures; 2πr = nλ; compare.',
  scheme: [['Thomson and Rutherford: success and failure', 1], ['Bohr: success and failure', 1], ['2πr = nλ gives mvr = nh/2π', 1], ['λ = πr₂ ≈ 6.66 × 10⁻¹⁰ m', 1], ['h/mv ≈ 6.68 × 10⁻¹⁰ m; agreement', 1]],
  d: 4, c: 'analysis', t: [1, 2], wl: null,
}), () => near(dw.lamFit, dw.lamDB, 0.01) || `dw ${dw.lamFit} ${dw.lamDB}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const dc = { lam: lamFor(En(4) - En(2)) };
add('discharge-case', mk.case({
  passage: 'In a school laboratory in Chandigarh, students look at a glowing hydrogen discharge tube through a handheld spectroscope. Instead of a continuous rainbow they see a few sharp coloured lines: a bright red line, a blue-green line and two fainter violet lines, on a dark background.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'These visible lines belong to the series of transitions ending on',
      right: 'n = 2 (the Balmer series)',
      wrong: ['n = 1 (the Lyman series)', 'n = 3 (the Paschen series)', 'n = ∞ (ionisation)'],
      sol: 'Jumps to n = 2 give photons of 1.9–3.4 eV, in the visible range: the Balmer series — option (@K).',
      d: 1, c: 'recall', t: [3],
    })),
    part('b', num({
      stem: 'The blue-green line comes from the jump n = 4 → n = 2. Find its wavelength, in nm (3 significant figures). (hc = 1243 eV nm.)',
      value: Number(dec(dc.lam, 3)), tol: 2, unit: 'nm',
      sol: r`$\Delta E = 13.6\left(\dfrac{1}{4} - \dfrac{1}{16}\right) = 2.55$ eV; $\lambda = \dfrac{1243}{2.55} \approx ${dec(dc.lam, 3)}$ nm.`,
      scheme: [['λ ≈ 488 nm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the students see separate lines rather than a continuous spectrum.',
      model: 'The electron in hydrogen can have only **discrete** energies, $E_n = -13.6/n^2$ eV. Light is emitted only when it **jumps** between two of these levels, as a photon of energy $E_i - E_f$. Only certain differences exist, so only certain **wavelengths** appear: separate **lines**.',
      sol: 'Discrete levels.',
      scheme: [['Discrete energy levels', 1], ['Only certain photon energies → lines', 1]],
      d: 2, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A student says that turning up the voltage on the tube will make new colours, such as yellow, appear among the hydrogen lines. Evaluate this claim.',
        model: 'The claim is **incorrect**. A higher voltage excites **more atoms** (and to higher levels), making the lines **brighter**, but the energy levels of hydrogen are **fixed**, so the possible jump energies and wavelengths do not change. No yellow line exists, because no pair of hydrogen levels differs by about 2.1 eV.',
        sol: 'Levels fixed; brightness changes.',
        scheme: [['Levels fixed, so wavelengths fixed', 1], ['Higher voltage: brighter lines, no new colours', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(dc.lam, 487.5) && near(q.children[1].answer.value, 487) || `dc ${dc.lam}`);

const gc = closest(79, 6.0e6);
add('simulation-case', mk.case({
  passage: 'Students in a Hyderabad computer lab run a simulation of Rutherford’s experiment. They fire 6.0 MeV alpha particles at a single gold nucleus (Z = 79), changing only the impact parameter, and record the scattering angle. With an impact parameter of a few hundred femtometres the particles are barely deflected; with almost zero impact parameter they come straight back.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'As the impact parameter is made smaller, the scattering angle',
      right: 'increases, reaching 180° for a head-on approach',
      wrong: ['decreases, reaching 0° for a head-on approach', 'stays the same', 'first increases and then becomes zero'],
      sol: 'Closer approach means a stronger repulsion and a larger deflection; head-on, the particle turns straight back — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the distance of closest approach for the head-on case, in femtometres (3 significant figures). (1/4πε₀ = 9 × 10⁹ N m² C⁻²; e = 1.6 × 10⁻¹⁹ C.)',
      value: Number(dec(gc * 1e15, 3)), tol: 0.3, unit: 'fm',
      sol: r`$d = \dfrac{9 \times 10^{9} \times 2 \times 79 \times (1.6 \times 10^{-19})^2}{6.0 \times 10^{6} \times 1.6 \times 10^{-19}} \approx ${sci(gc, 3)}$ m, i.e. $${sci(gc, 3)} \times 10^{15} = ${dec(gc * 1e15, 3)}$ fm.`,
      scheme: [['d ≈ 37.9 fm', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'In the real experiment, why were most alpha particles hardly deflected?',
      model: 'The nucleus is **tiny** compared with the atom (about $10^{-14}$ m against $10^{-10}$ m), so in a foil almost all particles pass with **large impact parameters**, far from any nucleus, and feel only a weak force. Only the very few aimed almost directly at a nucleus are deflected strongly.',
      sol: 'Most impact parameters are large.',
      scheme: [['Nucleus tiny; atom mostly empty', 1], ['Most particles have large b → small deflection', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'One student suggests that using a much thicker gold foil in the real experiment would have given clearer results. Evaluate this suggestion.',
        model: 'It would make the results **less clear**. In a thick foil each alpha particle meets **many nuclei** in turn (multiple scattering) and loses energy, so a measured angle no longer comes from a **single** encounter, and many particles are **stopped**. A thin foil keeps scattering to one nucleus.',
        sol: 'Multiple scattering, absorption.',
        scheme: [['Thick foil: multiple scattering and energy loss', 1], ['Angles no longer from single encounters: suggestion poor', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(gc, 3.79e-14) && near(q.children[1].answer.value, 37.9) || `gc ${gc}`);

const nb = { ha: lamFor(En(3) - En(2)) };
add('nebula-case', mk.case({
  passage: 'At a planetarium show in Kolkata, visitors see a photograph of a glowing pink-red cloud of hydrogen gas in space. The presenter explains that very hot stars inside the cloud give out ultraviolet light that ionises the hydrogen. When electrons are recaptured by the protons, they cascade down through the energy levels, and many pass through the jump from n = 3 to n = 2.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the minimum energy a photon must have to ionise a hydrogen atom in its ground state?',
      right: '13.6 eV',
      wrong: ['10.2 eV', '3.4 eV', '1.89 eV'],
      sol: 'Ionisation from n = 1 takes the electron from −13.6 eV to 0 — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the wavelength of the light from the n = 3 → n = 2 jump, in nm (3 significant figures). (hc = 1243 eV nm.)',
      value: Number(dec(nb.ha, 3)), tol: 3, unit: 'nm',
      sol: r`$\Delta E = 13.6\left(\dfrac{1}{4} - \dfrac{1}{9}\right) \approx 1.89$ eV; $\lambda = \dfrac{1243}{1.889} \approx ${dec(nb.ha, 3)}$ nm.`,
      scheme: [['λ ≈ 658 nm (red)', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'The cloud also emits strongly at about 122 nm (n = 2 → n = 1). Explain why the photograph nevertheless shows the cloud as red.',
      model: '122 nm lies in the **ultraviolet** (Lyman series): it is invisible to the eye and is **absorbed** by the Earth’s atmosphere, so a camera on the ground does not record it. The strongest **visible** emission is the **red** 3 → 2 Balmer line near 656 nm, so the cloud appears red.',
      sol: 'Lyman is UV; strongest visible line is red.',
      scheme: [['122 nm is UV: invisible and absorbed by air', 1], ['Strongest visible line is the red 3 → 2 line', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A visitor suggests that the cloud must be glowing because it is hot, like a stove element. Evaluate this suggestion.',
        model: 'The suggestion is **not right**. A hot solid glows with a **continuous** spectrum, but this thin gas emits **sharp lines** (such as the red 3 → 2 line) set by hydrogen’s **energy levels**. The light comes from electrons **cascading** between levels after recombination, powered by the stars’ ultraviolet.',
        sol: 'Line, not continuous, emission.',
        scheme: [['Hot body: continuous spectrum', 1], ['Cloud: line emission from level jumps', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(nb.ha, 658) && near(q.children[1].answer.value, 658) || `nb ${nb.ha}`);

// ================================================================ further items (key and bank balance)
add('size-ar', ar({
  a: 'The radius of a nucleus is about the same as the radius of the atom it belongs to.',
  r: 'The distance of closest approach of an alpha particle gives an upper limit to the size of a nucleus.',
  key: 'd',
  sol: 'R is true. A is false: a nucleus (about 10⁻¹⁴ m or less) is roughly ten thousand times smaller than its atom (about 10⁻¹⁰ m) — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
const blim = lamFor(3.4);
add('balmerlim-num', num({
  stem: 'Find the series limit (shortest wavelength) of the Balmer series of hydrogen, in nm (3 significant figures). (hc = 1243 eV nm.)',
  value: Number(dec(blim, 3)), tol: 1, unit: 'nm',
  sol: 'The limit is the jump from n = ∞ to n = 2: ΔE = 0 − (−3.4) = 3.4 eV, so λ = 1243/3.4 ≈ 366 nm, just beyond violet.',
  scheme: [['ΔE = 3.4 eV', 1], ['λ ≈ 366 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(blim, q.answer.value) && near(blim, 365.6) || `blim ${blim}`);
