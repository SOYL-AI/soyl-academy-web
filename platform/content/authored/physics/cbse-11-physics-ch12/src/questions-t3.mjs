// ch12 question bank, part 2: t03 (degrees of freedom, equipartition, specific heats) and t04 (mean free path, Avogadro's number).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, KB, NA, ATM, ZERO_C, mfp, cvR, cpR, v3, tl, sciu } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t03 degrees of freedom, equipartition, specific heats
add('monocv-mcq', mcq({
  stem: 'A rigid closed vessel holds neon, a monatomic gas, at room temperature. By the law of equipartition its molar heat capacity at constant volume is',
  right: '3R/2, because only the three translational terms store energy',
  wrong: ['5R/2, because a neon atom can rotate about two axes', '3R, because each atom has three kinetic and three potential terms', 'R, because the gas does work as it is heated'],
  sol: 'A point-like atom has three translational degrees of freedom, each with ½k_BT, so U = (3/2)RT per mole and C_V = 3R/2 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gamma-mcq', mcq({
  stem: 'At a very high temperature the vibrational motion of a diatomic gas is also excited, so that each molecule has 7 degrees of freedom. For this gas the ratio C_P/C_V is',
  right: '9/7',
  wrong: ['7/5', '5/3', '4/3'],
  sol: r`$\gamma = 1 + \dfrac{2}{f} = 1 + \dfrac{2}{7} = \dfrac{9}{7}$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => near(1 + 2 / 7, 9 / 7, 1e-12) && near(cpR(7) / cvR(7), 9 / 7, 1e-12) || 'gamma');
add('equip-mcq', mcq({
  stem: 'The law of equipartition of energy states that, for a gas in thermal equilibrium at absolute temperature T, the mean energy associated with each quadratic term in the energy of a molecule is',
  right: '½ k_B T',
  wrong: ['k_B T', '(3/2) k_B T', '½ R T'],
  sol: 'Each quadratic term (translation, rotation, or each of the kinetic and potential parts of a vibration) has mean value ½k_BT per molecule. ½RT is the value per mole — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('vib-mcq', mcq({
  stem: 'Oxygen at room temperature is found to behave as a gas with 5 and not 7 degrees of freedom. The reason is that',
  right: 'the vibrational motion is not excited at ordinary temperatures, so it adds nothing to the energy',
  wrong: ['an oxygen molecule cannot rotate about any axis', 'the rotational motion about the bond is excited but not about the other axes', 'the law of equipartition holds only for monatomic gases'],
  sol: 'At room temperature the thermal energy is too small to excite the vibrations of a diatomic molecule, so only 3 translational and 2 rotational terms count. At high temperature f becomes 7 — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('internal-mcq', mcq({
  stem: 'Treating nitrogen at room temperature as a rigid diatomic ideal gas, the internal energy of one mole at absolute temperature T is',
  right: '(5/2) R T',
  wrong: ['(3/2) R T', '(7/2) R T', '(5/2) k_B T'],
  sol: 'f = 5, so U = (f/2)RT = (5/2)RT per mole. (5/2)k_BT is the energy of a single molecule — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cpcv-ar', ar({
  a: 'The molar heat capacity of an ideal gas at constant pressure is greater than its molar heat capacity at constant volume.',
  r: 'At constant volume the gas does work against its surroundings as it is heated.',
  key: 'c',
  sol: 'A is true: at constant pressure the gas expands and does work, so more heat is needed for the same rise in temperature. R is false: at constant volume the gas does no work — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('mayer-ar', ar({
  a: 'The molar heat capacities of a monatomic and a diatomic ideal gas differ, but the difference C_P − C_V is the same, R, for both.',
  r: 'The heat capacity at constant volume of an ideal gas is determined by the number of degrees of freedom of its molecules.',
  key: 'b',
  sol: 'Both are true. But R does not explain A: the difference R is the work done in expanding by one kelvin at constant pressure and does not depend on f — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('dof-fill', fill({
  stem: 'A rigid nitrogen molecule at room temperature has three translational and two rotational motions in which it can store energy; it therefore has ___ degrees of freedom.',
  acc: [['5', 'five']],
  sol: 'It has **5** degrees of freedom (3 translational + 2 rotational).',
  d: 1, c: 'recall', t: [3],
}));
const qv = { n: 0.5, dT: 60, f: 5 };
qv.Q = qv.n * cvR(qv.f) * R * qv.dT;
add('qv-num', num({
  stem: 'A sealed flask holds 0.50 mol of hydrogen, treated as a rigid diatomic gas. How much heat is needed to raise its temperature by 60 K? Give the answer in J (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(qv.Q), tol: tl(qv.Q), unit: 'J',
  sol: r`In a sealed flask the volume is constant, so $Q = n C_V \Delta T$ with $C_V = \tfrac{5}{2} R = ${dec(2.5 * R, 4)}$ J mol$^{-1}$ K$^{-1}$. $Q = ${qv.n} \times ${dec(2.5 * R, 4)} \times ${qv.dT} = ${dec(qv.Q, 3)}$ J.`,
  scheme: [['Constant volume: Q = nC_VΔT with C_V = 5R/2', 1], [`Q = ${dec(qv.Q, 3)} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(0.5 * 60 * (5 / 2) * (KB * NA), q.answer.value, 0.005) || 'qv');
const cpp = { f: 6 };
cpp.Cp = cpR(cpp.f) * R;
add('cppoly-num', num({
  stem: 'Methane is a non-linear polyatomic gas. Treating its molecules as rigid (3 translational and 3 rotational degrees of freedom), find its molar heat capacity at constant pressure, in J mol⁻¹ K⁻¹ (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(cpp.Cp), tol: tl(cpp.Cp), unit: 'J/(mol K)',
  sol: r`$f = 6$, so $C_V = \tfrac{f}{2} R = 3R$ and $C_P = C_V + R = 4R = 4 \times 8.314 = ${dec(cpp.Cp, 3)}$ J mol$^{-1}$ K$^{-1}$.`,
  scheme: [[`C_P = (f/2 + 1)R = 4R = ${dec(cpp.Cp, 3)} J mol⁻¹ K⁻¹`, 1]],
  marks: 1, d: 2, c: 'application', t: [3],
}), (q) => near(4 * 8.314, q.answer.value, 0.003) || 'cpp');
const gm = { n1: 2.0, f1: 3, n2: 3.0, f2: 5 };
gm.Cv = gm.n1 * cvR(gm.f1) + gm.n2 * cvR(gm.f2);
gm.Cp = gm.n1 * cpR(gm.f1) + gm.n2 * cpR(gm.f2);
gm.g = gm.Cp / gm.Cv;
add('gammamix-num', num({
  stem: 'A cylinder holds a mixture of 2.0 mol of helium (monatomic) and 3.0 mol of nitrogen (rigid diatomic). Find the ratio of the heat capacity at constant pressure to that at constant volume for the mixture (3 significant figures).',
  value: v3(gm.g), tol: tl(gm.g), unit: null,
  sol: r`In units of $R$: $C_V = ${gm.n1} \times \tfrac{3}{2} + ${gm.n2} \times \tfrac{5}{2} = ${gm.Cv}$ and $C_P = ${gm.n1} \times \tfrac{5}{2} + ${gm.n2} \times \tfrac{7}{2} = ${gm.Cp}$ for the whole sample. $\gamma = \dfrac{C_P}{C_V} = \dfrac{${gm.Cp}}{${gm.Cv}} = ${dec(gm.g, 3)}$.`,
  scheme: [[`Heat capacities add: C_V = ${gm.Cv}R, C_P = ${gm.Cp}R`, 1], [`γ = ${gm.Cp}/${gm.Cv} = ${dec(gm.g, 3)}`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near((2 * 2.5 + 3 * 3.5) / (2 * 1.5 + 3 * 2.5), q.answer.value, 0.003) && q.answer.value > 1.4 && q.answer.value < 5 / 3 || 'gm');
const du = { m: 0.2, M: 4.0e-3, dT: 50 };
du.n = du.m / du.M;
du.dU = du.n * 1.5 * R * du.dT;
add('du-num', num({
  stem: 'The internal energy of 0.20 kg of helium (molar mass 4.0 g mol⁻¹, monatomic) is raised by heating it through 50 K in a rigid container. Find the increase in internal energy in kJ (3 significant figures; R = 8.314 J mol⁻¹ K⁻¹).',
  value: v3(du.dU / 1000), tol: tl(du.dU / 1000), unit: 'kJ',
  sol: r`$n = \dfrac{0.20}{4.0 \times 10^{-3}} = ${du.n}$ mol. For a monatomic gas $U = \tfrac{3}{2} n R T$, so $\Delta U = \tfrac{3}{2} n R \Delta T = 1.5 \times ${du.n} \times 8.314 \times ${du.dT} = ${dec(du.dU, 5)}$ J $= ${dec(du.dU / 1000, 3)}$ kJ.`,
  scheme: [['n = 0.20/0.0040 = 50 mol; U = (3/2)nRT', 1], [`ΔU = ${dec(du.dU, 5)} J = ${dec(du.dU / 1000, 3)} kJ`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(du.n * (3 * KB * NA * 50) / 2 / 1000, q.answer.value, 0.005) || 'du');
const gc = { Cp: 29.1 };
gc.Cv = gc.Cp - R;
gc.g = gc.Cp / gc.Cv;
add('gammacp-num', num({
  stem: 'The molar heat capacity of a certain ideal gas at constant pressure is measured as 29.1 J mol⁻¹ K⁻¹. Taking R = 8.314 J mol⁻¹ K⁻¹, find the ratio C_P/C_V (3 significant figures).',
  value: v3(gc.g), tol: tl(gc.g), unit: null,
  sol: r`$C_V = C_P - R = 29.1 - 8.314 = ${dec(gc.Cv, 4)}$ J mol$^{-1}$ K$^{-1}$. $\gamma = \dfrac{C_P}{C_V} = \dfrac{29.1}{${dec(gc.Cv, 4)}} = ${dec(gc.g, 3)}$.`,
  scheme: [[`C_V = C_P − R = ${dec(gc.Cv, 4)} J mol⁻¹ K⁻¹`, 1], [`γ = ${dec(gc.g, 3)}`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(1 + 2 / 5, q.answer.value, 0.003) || 'gc');
add('dof-short', short({
  marks: 2,
  stem: 'What is meant by the degrees of freedom of a molecule? State the number for a monatomic gas and for a rigid diatomic gas at room temperature.',
  model: 'The **degrees of freedom** are the independent ways in which a molecule can possess energy: translation, rotation or vibration. A **monatomic** molecule has **3** (translation only). A **rigid diatomic** molecule has **5**: three translational and two rotational.',
  sol: 'Independent modes; 3 and 5.',
  scheme: [['Independent ways of storing energy (translation, rotation, vibration)', 1], ['3 for monatomic and 5 for rigid diatomic', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('equip-short', short({
  marks: 2,
  stem: 'State the law of equipartition of energy. How much energy does it assign to each quadratic term in the energy of a molecule?',
  model: 'In **thermal equilibrium at absolute temperature T** the total energy of a gas is **shared equally** among its degrees of freedom: every quadratic term in the energy of a molecule has a mean value of **½ k_B T**. A molecule with f such terms has a mean energy (f/2) k_B T.',
  sol: 'Equal sharing; ½k_BT per term.',
  scheme: [['Energy shared equally among the quadratic terms in equilibrium', 1], ['½ k_B T per term; (f/2)k_BT per molecule', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('cpgt-short', short({
  marks: 2,
  stem: 'Why must more heat be supplied to raise the temperature of a mole of an ideal gas by 1 K at constant pressure than at constant volume? By how much does the heat capacity differ?',
  model: r`At **constant volume** all the heat raises the internal energy. At **constant pressure** the gas also expands and does **work** on its surroundings, so extra heat is needed. For an ideal gas the work for 1 K is R, so $C_P - C_V = R$.`,
  sol: 'Work of expansion; difference R.',
  scheme: [['At constant pressure the gas does work of expansion; extra heat is needed', 1], ['C_P − C_V = R', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('spheat-short3', short({
  marks: 3,
  stem: 'Using the law of equipartition, obtain C_V, C_P and γ for a monatomic gas and for a rigid diatomic gas.',
  model: r`By equipartition each of the $f$ quadratic terms of a molecule carries $\tfrac{1}{2} k_B T$, so one mole has internal energy $U = \tfrac{f}{2} R T$ and the heat capacity at constant volume is $C_V = \tfrac{f}{2} R$. At constant pressure the gas also does work, and $C_P = C_V + R$, so $\gamma = 1 + 2/f$. A **monatomic** gas has $f = 3$: $C_V = \tfrac{3}{2}R$, $C_P = \tfrac{5}{2}R$, $\gamma = \tfrac{5}{3}$. A **rigid diatomic** gas has $f = 5$: $C_V = \tfrac{5}{2}R$, $C_P = \tfrac{7}{2}R$, $\gamma = \tfrac{7}{5}$.`,
  sol: 'f = 3 and 5.',
  scheme: [['U = (f/2)nRT gives C_V = (f/2)R; C_P = C_V + R', 1], ['Monatomic: 3R/2, 5R/2, 5/3', 1], ['Rigid diatomic: 5R/2, 7R/2, 7/5', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('vibmode-short3', short({
  marks: 3,
  stem: 'A diatomic molecule can also vibrate along its bond. Explain how many quadratic terms a vibrational mode adds, why diatomic gases at room temperature usually behave as if f = 5, and what γ becomes when the vibration is active.',
  model: r`A vibrating bond stores **kinetic and potential** energy, so each vibrational mode adds **two** quadratic terms. At ordinary temperatures the vibrations are **not excited**, so only 3 translational and 2 rotational terms count and $f = 5$ ($\gamma = 7/5$). At high temperature $f = 7$ and $\gamma = 1 + 2/7 = 9/7$.`,
  sol: 'Two terms; f = 5 at room temperature; 9/7 when vibrating.',
  scheme: [['A vibrational mode adds two terms (kinetic + potential)', 1], ['Not excited at room temperature, so f = 5', 1], ['At high temperature f = 7 and γ = 9/7', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ================================================================ t04 mean free path and Avogadro's number
add('mfpdbl-mcq', mcq({
  stem: 'A fixed amount of gas is allowed to expand at constant temperature until its pressure is halved. The mean free path of its molecules',
  right: 'becomes twice as large',
  wrong: ['becomes half as large', 'becomes four times as large', 'does not change'],
  sol: r`At constant $T$, $n = P/(k_B T)$ is halved, and $\lambda = 1/(\sqrt{2}\,\pi d^2 n)$ doubles — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(mfp(ATM / 2 / (KB * 300), 2e-10) / mfp(ATM / (KB * 300), 2e-10), 2, 1e-9) || 'mfpdbl');
add('mfpd-mcq', mcq({
  stem: 'Two gases are kept at the same number of molecules per unit volume. The molecules of gas B have twice the diameter of those of gas A. The ratio of the mean free path of A to that of B is',
  right: '4',
  wrong: ['2', '1/2', '1/4'],
  sol: r`$\lambda \propto 1/d^2$ at fixed $n$, so $\lambda_A/\lambda_B = (d_B/d_A)^2 = 2^2 = 4$ — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(mfp(1e25, 2e-10) / mfp(1e25, 4e-10), 4, 1e-9) || 'mfpd');
add('sealed-mcq', mcq({
  stem: 'A gas in a sealed rigid flask is heated. Which statement about its molecules is correct?',
  right: 'The mean free path is unchanged but the number of collisions per second increases',
  wrong: ['The mean free path increases but the number of collisions per second is unchanged', 'The mean free path and the number of collisions per second both increase', 'The mean free path decreases and the number of collisions per second increases'],
  sol: r`The number density $n$ and the diameter $d$ do not change, so $\lambda = 1/(\sqrt{2}\,\pi d^2 n)$ is unchanged. The molecules move faster, so they make more collisions per second (about speed$/\lambda$) — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}));
add('avogn-mcq', mcq({
  stem: 'All the gases below behave as ideal gases. Which pair of samples contains the same number of molecules?',
  right: '1.0 L of hydrogen and 1.0 L of carbon dioxide, both at 1 atm and 300 K',
  wrong: ['1.0 g of hydrogen and 1.0 g of carbon dioxide', '1.0 L of hydrogen at 300 K and 1.0 L of carbon dioxide at 400 K, both at 1 atm', '1.0 L of hydrogen and 2.0 L of carbon dioxide, both at 1 atm and 300 K'],
  sol: 'By Avogadro\'s law, equal volumes of gases at the same pressure and temperature hold equal numbers of molecules (N = PV/k_BT). Equal masses contain different numbers (they differ in molar mass) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('avog-ar', ar({
  a: 'At the same temperature and pressure, 1.0 L of hydrogen and 1.0 L of carbon dioxide contain the same number of molecules.',
  r: 'In P V = N k_B T the number N is fixed by P, V and T, and does not depend on the kind of molecule.',
  key: 'a',
  sol: 'Both are true and R explains A: N = PV/(k_BT) is the same for both gases when P, V and T are the same — option (a).',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('lamsealed-tf', tf({
  stem: 'The mean free path of the molecules of a gas depends only on the temperature of the gas and not on the number of molecules per unit volume.',
  key: 'f',
  sol: 'False. λ = 1/(√2 π d² n) depends on the number density n (and the diameter d); it changes with temperature only when n changes.',
  d: 2, c: 'understanding', t: [4],
}));
const lm = { P: ATM, T: 300, d: 2.0e-10 };
lm.n = lm.P / (KB * lm.T);
lm.lam = mfp(lm.n, lm.d);
add('lam-num', num({
  stem: 'Helium atoms may be treated as spheres of diameter 2.0 × 10⁻¹⁰ m. Find the mean free path of helium at 1.013 × 10⁵ Pa and 300 K, in nm (3 significant figures; k_B = 1.38 × 10⁻²³ J K⁻¹).',
  value: v3(lm.lam * 1e9), tol: tl(lm.lam * 1e9), unit: 'nm',
  sol: r`$n = \dfrac{P}{k_B T} = \dfrac{1.013 \times 10^5}{1.38 \times 10^{-23} \times 300} = ${sci(lm.n, 3)}$ m$^{-3}$. $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n} = \dfrac{1}{1.414 \times 3.142 \times (2.0 \times 10^{-10})^2 \times ${sci(lm.n, 3)}} = ${sci(lm.lam, 3)}$ m $= ${dec(lm.lam * 1e9, 3)}$ nm.`,
  scheme: [['n = P/(k_B T)', 1], ['λ = 1/(√2 π d² n)', 1], [`λ = ${sciu(lm.lam, 3)} m = ${dec(lm.lam * 1e9, 3)} nm`, 1]],
  marks: 3, d: 3, c: 'application', t: [4],
}), (q) => near((KB * 300) / (Math.SQRT2 * Math.PI * 4e-20 * ATM) * 1e9, q.answer.value, 0.005) || 'lm');
const lv = { P: 1.0e-3, T: 300, d: 2.0e-10 };
lv.n = lv.P / (KB * lv.T);
lv.lam = mfp(lv.n, lv.d);
add('lamvac-num', num({
  stem: 'A vacuum chamber for testing a satellite instrument contains helium atoms (diameter 2.0 × 10⁻¹⁰ m) at a pressure of 1.0 × 10⁻³ Pa and 300 K. Find their mean free path in m (3 significant figures; k_B = 1.38 × 10⁻²³ J K⁻¹).',
  value: v3(lv.lam), tol: tl(lv.lam), unit: 'm',
  sol: r`$n = \dfrac{P}{k_B T} = \dfrac{1.0 \times 10^{-3}}{1.38 \times 10^{-23} \times 300} = ${sci(lv.n, 3)}$ m$^{-3}$. $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n} = \dfrac{1}{1.414 \times 3.142 \times (2.0 \times 10^{-10})^2 \times ${sci(lv.n, 3)}} = ${dec(lv.lam, 3)}$ m.`,
  scheme: [[`n = P/(k_B T) = ${sciu(lv.n, 3)} m⁻³`, 1], [`λ = 1/(√2 π d² n) = ${dec(lv.lam, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near((KB * 300) / (Math.SQRT2 * Math.PI * 4e-20 * 1e-3), q.answer.value, 0.005) || 'lv');
const fq = { lam: 2.3e-7, v: 480 };
fq.f = fq.v / fq.lam;
add('freq-num', num({
  stem: 'In a gas the mean free path is 2.3 × 10⁻⁷ m and the molecules have an average speed of 480 m s⁻¹. Estimate the number of collisions a molecule makes per second, in units of 10⁹ s⁻¹ (3 significant figures).',
  value: v3(fq.f / 1e9), tol: tl(fq.f / 1e9), unit: '10⁹ per second',
  sol: r`Collision frequency $\approx \dfrac{\text{average speed}}{\lambda} = \dfrac{480}{2.3 \times 10^{-7}} = ${sci(fq.f, 3)}$ s$^{-1}$. In units of $10^9$ s$^{-1}$: $f = ${dec(fq.f / 1e9, 3)}$.`,
  scheme: [['Collisions per second ≈ speed / λ', 1], [`f = ${sciu(fq.f, 3)} s⁻¹`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(1 / (2.3e-7 / 480) / 1e9, q.answer.value, 0.005) || 'fq');
const nm = { mass: 9.6, M: 32 };
nm.n = nm.mass / nm.M;
nm.N = nm.n * NA;
add('nmol-num', num({
  stem: 'A cylinder at a hospital in Pune contains 9.6 g of oxygen (molar mass 32 g mol⁻¹). How many molecules does it hold? Give the answer in units of 10²³ (3 significant figures; N_A = 6.02 × 10²³ mol⁻¹).',
  value: v3(nm.N / 1e23), tol: tl(nm.N / 1e23), unit: '10²³',
  sol: r`$n = \dfrac{9.6}{32} = ${dec(nm.n, 3)}$ mol. $N = n N_A = ${dec(nm.n, 3)} \times 6.02 \times 10^{23} = ${sci(nm.N, 3)}$. In units of $10^{23}$: $N = ${dec(nm.N / 1e23, 3)}$.`,
  scheme: [['n = m/M = 0.30 mol', 1], [`N = nN_A = ${sciu(nm.N, 3)}`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near((9.6 / 32) * 6.02, q.answer.value, 0.005) || 'nm');
const ns = { T: ZERO_C, P: ATM };
ns.n = ns.P / (KB * ns.T);
add('nstp-num', num({
  stem: 'Find the number of molecules per cubic metre of an ideal gas at 0 °C and 1.013 × 10⁵ Pa, in units of 10²⁵ m⁻³ (3 significant figures; k_B = 1.38 × 10⁻²³ J K⁻¹).',
  value: v3(ns.n / 1e25), tol: tl(ns.n / 1e25), unit: '10²⁵ per m³',
  sol: r`$T = 0 + 273 = ${ns.T}$ K. From $P V = N k_B T$: $\dfrac{N}{V} = \dfrac{P}{k_B T} = \dfrac{1.013 \times 10^5}{1.38 \times 10^{-23} \times ${ns.T}} = ${sci(ns.n, 3)}$ m$^{-3}$. In units of $10^{25}$ m$^{-3}$: $N/V = ${dec(ns.n / 1e25, 3)}$.`,
  scheme: [['N/V = P/(k_B T) with T = 273 K', 1], [`N/V = ${sciu(ns.n, 3)} m⁻³`, 1]],
  marks: 2, d: 2, c: 'application', t: [4, 1],
}), (q) => near(NA / ((R * 273) / ATM) / 1e25, q.answer.value, 0.005) || 'ns');
const fv = { d: 3.0e-10 };
fv.vol = (4 / 3) * Math.PI * (fv.d / 2) ** 3;
fv.frac = ns.n * fv.vol;
add('fracvol-num', num({
  stem: 'Taking each molecule of a gas as a sphere of diameter 3.0 × 10⁻¹⁰ m, find the fraction of the volume of the gas occupied by the molecules themselves at 0 °C and 1.013 × 10⁵ Pa, in units of 10⁻⁴ (3 significant figures). Use the number density of an ideal gas at these conditions.',
  value: v3(fv.frac * 1e4), tol: tl(fv.frac * 1e4), unit: '10⁻⁴',
  sol: r`Volume of one molecule $= \tfrac{4}{3}\pi (d/2)^3 = \tfrac{4}{3}\pi (1.5 \times 10^{-10})^3 = ${sci(fv.vol, 3)}$ m$^3$. Number density $n = P/(k_B T) = ${sci(ns.n, 3)}$ m$^{-3}$. Fraction $= n \times ${sci(fv.vol, 3)} = ${sci(fv.frac, 3)}$, so the molecules fill only about 0.04% of the volume. In units of $10^{-4}$: fraction $= ${dec(fv.frac * 1e4, 3)}$.`,
  scheme: [['Volume of one molecule (4/3)π(d/2)³', 1], ['n = P/(k_B T) = 2.69 × 10²⁵ m⁻³', 1], [`Fraction = n × volume = ${sciu(fv.frac, 3)}`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [4],
}), (q) => near(((NA * ATM) / (R * 273)) * (Math.PI / 6) * 27e-30 * 1e4, q.answer.value, 0.01) || 'fv');
add('mfp-short', short({
  marks: 2,
  stem: 'Define the mean free path of a gas molecule. Why is it much longer in a gas at very low pressure than at normal pressure?',
  model: r`The **mean free path** is the average distance a molecule travels between two successive collisions. Since $\lambda = 1/(\sqrt{2}\,\pi d^2 n)$, lowering the pressure at fixed temperature lowers the **number of molecules per unit volume** n, so a molecule meets others less often and travels **farther** between collisions.`,
  sol: 'Average distance between collisions; λ ∝ 1/n.',
  scheme: [['Average distance between successive collisions', 1], ['Low pressure: smaller n, so larger λ', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('avogadro-short', short({
  marks: 2,
  stem: 'State Avogadro\'s law. Show how it follows from the equation of state written as P V = N k_B T.',
  model: r`**Avogadro's law:** equal volumes of all gases at the same pressure and temperature contain the same number of molecules. From $P V = N k_B T$ we get $N = P V/(k_B T)$, which involves only $P$, $V$ and $T$; so equal $V$ at equal $P$ and $T$ means equal $N$, whatever the gas.`,
  sol: 'N = PV/k_BT.',
  scheme: [['Statement: same P, T and V gives same number of molecules', 1], ['N = PV/(k_B T) contains no property of the molecule', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mfpdep-short3', short({
  marks: 3,
  stem: 'Write the formula for the mean free path of a gas of molecules of diameter d at number density n, and state how it changes if (a) d is doubled, (b) the pressure is halved at constant temperature, (c) the gas is heated in a sealed rigid vessel.',
  model: r`The mean free path is $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n}$. (a) Since $\lambda \propto 1/d^2$, doubling the diameter makes the mean free path **one quarter** of its value. (b) At constant temperature the number density $n$ is proportional to the pressure, so halving the pressure **doubles** the mean free path. (c) In a sealed rigid vessel neither $n$ nor $d$ changes, so the mean free path is **unchanged**.`,
  sol: 'Quarter; double; unchanged.',
  scheme: [['λ = 1/(√2 π d² n)', 1], ['(a) one quarter and (b) doubled', 1], ['(c) unchanged because n is unchanged', 1]],
  d: 3, c: 'application', t: [4],
}));
const ms = { M: 18e-3 };
ms.m1 = ms.M / NA;
add('molecule-short3', short({
  marks: 3,
  stem: 'Water has a molar mass of 18 g mol⁻¹. Find the number of molecules in 18 g of water and the mass of one molecule. Use N_A = 6.02 × 10²³ mol⁻¹. Comment on why such a number is called a mole.',
  model: r`A sample of 18 g of water is **one mole**, so it contains $N_A = 6.02 \times 10^{23}$ molecules. The mass of one molecule is the molar mass divided by Avogadro's number: $\dfrac{M}{N_A} = \dfrac{18 \times 10^{-3}}{6.02 \times 10^{23}} = ${sci(ms.m1, 3)}$ kg. A mole is the amount of substance that contains Avogadro's number of molecules, so a mole has a mass in grams equal to its molar mass.`,
  sol: '6.02 × 10²³; 2.99 × 10⁻²⁶ kg.',
  scheme: [['One mole contains 6.02 × 10²³ molecules', 1], [`Mass of one molecule = M/N_A = ${sciu(ms.m1, 3)} kg`, 1], ['A mole = Avogadro number of molecules', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(ms.m1, 2.99e-26, 0.005) || 'ms');
