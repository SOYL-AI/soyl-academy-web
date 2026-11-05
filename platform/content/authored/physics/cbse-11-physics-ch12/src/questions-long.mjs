// ch12 question bank, part 3: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, KB, NA, ATM, ZERO_C, idealP, vrmsM, mfp, cvR, cpR, v3, tl, sciu } from './phys.mjs';

const { mcq, num, short, long, part } = mk;

// ================================================================ long answers
const dl = { rho: 1.2, v: 500 };
dl.P = (dl.rho * dl.v ** 2) / 3;
add('derive-long', long({
  stem: '(a) State four assumptions of the kinetic theory of an ideal gas. (b) Derive the expression P = (1/3) ρ v̄² for the pressure of an ideal gas in a cube of side L, by considering the collisions of its molecules with one wall. (c) An enclosure holds a gas of density 1.2 kg m⁻³ whose molecules have an rms speed of 500 m s⁻¹. Find its pressure in kPa.',
  model: r`(a) Many identical molecules in random motion; molecular volume negligible; no forces except in collisions; elastic collisions; no preferred direction.

(b) Take a molecule of mass $m$ with velocity component $v_x$ towards a wall. After an elastic collision the component is $-v_x$, so the wall gets momentum $2 m v_x$. The molecule returns after $2L/v_x$, so the force it exerts on average is $\dfrac{2 m v_x}{2L/v_x} = \dfrac{m v_x^2}{L}$. For $N$ molecules the pressure on the wall of area $L^2$ is $P = \dfrac{m}{L^3}\left(v_{x1}^2 + \cdots + v_{xN}^2\right) = \dfrac{N m \overline{v_x^2}}{V}$. With no preferred direction, $\overline{v_x^2} = \dfrac{\overline{v^2}}{3}$, so $P = \dfrac{1}{3}\dfrac{N m}{V}\overline{v^2} = \dfrac{1}{3}\rho\,\overline{v^2}$.

(c) $P = \dfrac{1}{3} \times ${dl.rho} \times 500^2 = ${dec(dl.P, 6)}$ Pa $= ${dec(dl.P / 1000, 3)}$ kPa.`,
  sol: 'Assumptions; derivation; 100 kPa.',
  scheme: [['Any four assumptions of the model', 1], ['Momentum change 2 m v_x per collision and time 2L/v_x between collisions: force m v_x²/L', 1], ['Sum over N molecules: P = N m v̄_x²/V', 1], ['Use of v̄_x² = v̄²/3 to reach P = (1/3)ρ v̄²', 1], [`P = (1/3)(${dl.rho})(500²) = ${dec(dl.P, 6)} Pa = ${dec(dl.P / 1000, 3)} kPa`, 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => near(dl.P, 1e5, 1e-9) && near(((1 / 3) * (dl.rho * dl.v ** 2)) / 1000, 100, 1e-9) || 'dl');
const tp = { t: 27, MHe: 4.0e-3, MH: 2.0e-3 };
tp.T = tp.t + ZERO_C;
tp.vHe = vrmsM(tp.T, tp.MHe);
tp.TH = (tp.T * tp.MH) / tp.MHe;
tp.tH = tp.TH - ZERO_C;
add('temp-long', long({
  stem: '(a) Using P = (1/3) ρ v̄² and the equation of state, show that the mean translational kinetic energy of a molecule of an ideal gas is (3/2) k_B T. (b) Deduce the expression for the rms speed in terms of the temperature and the molar mass. (c) Find the rms speed of helium (molar mass 4.0 g mol⁻¹) at 27 °C. (d) At what temperature, in °C, would hydrogen (molar mass 2.0 g mol⁻¹) have the same rms speed as helium at 27 °C? Use R = 8.314 J mol⁻¹ K⁻¹.',
  model: r`(a) For $N$ molecules $P V = \tfrac{1}{3} N m \overline{v^2}$, and also $P V = N k_B T$. Equating, $\tfrac{1}{3} m \overline{v^2} = k_B T$, so $\tfrac{1}{2} m \overline{v^2} = \tfrac{3}{2} k_B T$, which depends only on the temperature.

(b) $v_\text{rms} = \sqrt{\overline{v^2}} = \sqrt{\dfrac{3 k_B T}{m}}$; with $m = M/N_A$ and $R = N_A k_B$ this is $\sqrt{\dfrac{3 R T}{M}}$.

(c) $T = ${tp.T}$ K, so $v_\text{rms} = \sqrt{\dfrac{3 \times 8.314 \times ${tp.T}}{4.0 \times 10^{-3}}} = ${dec(tp.vHe, 4)}$ m s$^{-1}$.

(d) Equal speeds need $T/M$ equal, so $T_H = ${tp.T} \times \dfrac{2.0}{4.0} = ${tp.TH}$ K $= ${tp.tH}\,^\circ$C.`,
  sol: 'KE = 3/2 kT; v_rms; 1368 m/s; 150 K = −123 °C.',
  scheme: [['Equating (1/3)N m v̄² to N k_B T', 1], ['(1/2) m v̄² = (3/2) k_B T', 1], ['v_rms = √(3RT/M)', 1], [`v_rms(He) = ${dec(tp.vHe, 4)} m/s`, 1], [`T/M equal: T = ${tp.TH} K = −${-tp.tH} °C`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(vrmsM(tp.TH, tp.MH), tp.vHe, 1e-9) && tp.TH === 150 && tp.tH === -123 && near(tp.vHe, 1367.7, 0.001) || 'tp');
const eq = { n: 2.0, dT: 25, f: 5 };
eq.Qp = eq.n * cpR(eq.f) * R * eq.dT;
add('eqpart-long', long({
  stem: '(a) State the law of equipartition of energy. (b) Give the number of degrees of freedom of a monatomic, a rigid diatomic and a rigid non-linear polyatomic molecule. (c) Obtain C_V, C_P and γ for each of these three kinds of gas. (d) How much heat is needed to raise the temperature of 2.0 mol of a rigid diatomic gas by 25 K at constant pressure? Use R = 8.314 J mol⁻¹ K⁻¹.',
  model: r`(a) In thermal equilibrium at temperature $T$ the energy is shared equally among the quadratic terms: each has a mean value $\tfrac{1}{2} k_B T$ per molecule.

(b) Monatomic: $f = 3$; rigid diatomic: $f = 5$ (3 translational + 2 rotational); rigid non-linear polyatomic: $f = 6$ (3 + 3).

(c) $U = \tfrac{f}{2} n R T$, so $C_V = \tfrac{f}{2}R$, $C_P = C_V + R$ and $\gamma = 1 + \tfrac{2}{f}$. Monatomic: $\tfrac{3}{2}R$, $\tfrac{5}{2}R$, $\tfrac{5}{3}$. Diatomic: $\tfrac{5}{2}R$, $\tfrac{7}{2}R$, $\tfrac{7}{5}$. Polyatomic: $3R$, $4R$, $\tfrac{4}{3}$.

(d) $Q = n C_P \Delta T = ${eq.n} \times \tfrac{7}{2} \times 8.314 \times ${eq.dT} = ${dec(eq.Qp, 5)}$ J $\approx ${dec(eq.Qp / 1000, 3)}$ kJ.`,
  sol: 'Equipartition; f = 3, 5, 6; heat capacities; 1455 J.',
  scheme: [['Statement of the law: ½k_BT per quadratic term', 1], ['f = 3, 5 and 6', 1], ['U = (f/2)nRT, C_V = (f/2)R, C_P = C_V + R, γ = 1 + 2/f', 1], ['Values for the three gases (3R/2, 5R/2, 5/3; 5R/2, 7R/2, 7/5; 3R, 4R, 4/3)', 1], [`Q = nC_PΔT = ${dec(eq.Qp, 5)} J`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(eq.n * (cvR(5) + 1) * R * 25, 1454.95, 1e-6) && near(cpR(6) / cvR(6), 4 / 3, 1e-12) && near(cpR(3) / cvR(3), 5 / 3, 1e-12) || 'eq');
const gl = { V: 5.0e-3, n: 0.2, t1: 27, t2: 127 };
gl.T1 = gl.t1 + ZERO_C;
gl.T2 = gl.t2 + ZERO_C;
gl.P1 = idealP(gl.n, gl.T1, gl.V);
gl.P2 = gl.P1 * (gl.T2 / gl.T1);
gl.N = gl.n * NA;
add('gaslaw-long', long({
  stem: '(a) Write the equation of state of an ideal gas and show that Boyle\'s law and Gay-Lussac\'s law are special cases of it. (b) A flask of volume 5.0 L contains 0.20 mol of an ideal gas at 27 °C. Find the pressure in kPa. (c) The flask is heated to 127 °C. Find the new pressure in kPa. (d) Find the number of molecules in the flask. Use R = 8.314 J mol⁻¹ K⁻¹ and N_A = 6.02 × 10²³ mol⁻¹.',
  model: r`(a) $P V = n R T$. At constant $n$ and $T$ the right side is constant, so $P V = $ constant (Boyle). At constant $n$ and $V$, $P/T = nR/V$ is constant (Gay-Lussac), with $T$ in kelvin.

(b) $T_1 = ${gl.T1}$ K and $V = 5.0 \times 10^{-3}$ m$^3$, so $P_1 = \dfrac{${gl.n} \times 8.314 \times ${gl.T1}}{5.0 \times 10^{-3}} = ${dec(gl.P1, 5)}$ Pa $= ${dec(gl.P1 / 1000, 3)}$ kPa.

(c) At constant volume, $P_2 = P_1 \dfrac{T_2}{T_1} = ${dec(gl.P1 / 1000, 3)} \times \dfrac{${gl.T2}}{${gl.T1}} = ${dec(gl.P2 / 1000, 3)}$ kPa.

(d) $N = n N_A = ${gl.n} \times 6.02 \times 10^{23} = ${sci(gl.N, 3)}$.`,
  sol: 'PV = nRT; 99.8 kPa; 133 kPa; 1.20 × 10²³.',
  scheme: [['PV = nRT; Boyle and Gay-Lussac as special cases', 1], [`P₁ = nRT₁/V = ${dec(gl.P1 / 1000, 3)} kPa`, 1], [`P₂ = P₁T₂/T₁ = ${dec(gl.P2 / 1000, 3)} kPa`, 1], [`N = nN_A = ${sciu(gl.N, 3)}`, 1], ['Kelvin temperatures (300 K and 400 K) and SI units used', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near((0.2 * KB * NA * 300) / 5e-3 / 1000, gl.P1 / 1000, 0.002) && near(gl.P2 / gl.P1, 4 / 3, 1e-12) || 'gl');
const lg = { P: ATM, T: ZERO_C, d: 3.6e-10, lam2: 1.0e-2 };
lg.n = lg.P / (KB * lg.T);
lg.lam = mfp(lg.n, lg.d);
lg.ratio = lg.lam / lg.d;
lg.P2 = (lg.P * lg.lam) / lg.lam2;
add('mfp-long', long({
  stem: '(a) Define the mean free path and write the formula for it, naming each symbol. (b) Argon atoms may be taken as spheres of diameter 3.6 × 10⁻¹⁰ m. Find the mean free path of argon at 0 °C and 1.013 × 10⁵ Pa, in nm. (c) How many atomic diameters is this? (d) At the same temperature, what pressure would make the mean free path 1.0 cm? Use k_B = 1.38 × 10⁻²³ J K⁻¹.',
  model: r`(a) The mean free path is the average distance a molecule travels between two successive collisions: $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n}$, where $d$ is the molecular diameter and $n$ the number of molecules per unit volume.

(b) $n = \dfrac{P}{k_B T} = \dfrac{1.013 \times 10^5}{1.38 \times 10^{-23} \times ${lg.T}} = ${sci(lg.n, 3)}$ m$^{-3}$, so $\lambda = \dfrac{1}{1.414 \times 3.142 \times (3.6 \times 10^{-10})^2 \times ${sci(lg.n, 3)}} = ${sci(lg.lam, 3)}$ m $= ${dec(lg.lam * 1e9, 3)}$ nm.

(c) $\dfrac{\lambda}{d} = \dfrac{${sci(lg.lam, 3)}}{3.6 \times 10^{-10}} = ${dec(lg.ratio, 3)}$ diameters.

(d) At constant $T$, $\lambda \propto 1/P$, so $P_2 = P \dfrac{\lambda}{\lambda_2} = 1.013 \times 10^5 \times \dfrac{${sci(lg.lam, 3)}}{1.0 \times 10^{-2}} = ${dec(lg.P2, 3)}$ Pa.`,
  sol: 'Definition and formula; 64.6 nm; 179 diameters; 0.654 Pa.',
  scheme: [['Definition and λ = 1/(√2 π d² n)', 1], [`n = P/(k_B T) = ${sciu(lg.n, 3)} m⁻³`, 1], [`λ = ${dec(lg.lam * 1e9, 3)} nm`, 1], [`λ/d = ${dec(lg.ratio, 3)}`, 1], [`P₂ = P λ/λ₂ = ${dec(lg.P2, 3)} Pa`, 1]],
  d: 4, c: 'application', t: [4], wl: null,
}), () => near((KB * 273) / (Math.SQRT2 * Math.PI * (3.6e-10) ** 2 * ATM) * 1e9, lg.lam * 1e9, 0.001) && near(lg.lam * 1e9, 64.59, 0.002) && near(lg.P2, 0.6543, 0.002) || 'lg');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const bn = { P: 1.0e5, V: 3.0, t1: 27, t2: 42 };
bn.T1 = bn.t1 + ZERO_C;
bn.T2 = bn.t2 + ZERO_C;
bn.n = (bn.P * bn.V) / (R * bn.T1);
bn.V2 = bn.V * (bn.T2 / bn.T1);
bn.wrong = bn.V * (bn.t2 / bn.t1);
add('tyre-case', mk.case({
  passage: 'At a fair in Pune a large advertising balloon is filled with hydrogen. In the morning the gas is at 27 °C and a pressure of 1.0 × 10⁵ Pa, and the balloon has a volume of 3.0 m³. The balloon skin is so slack that the pressure of the gas always stays equal to the outside pressure of 1.0 × 10⁵ Pa. Take R = 8.314 J mol⁻¹ K⁻¹ and treat hydrogen as an ideal gas.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The amount of hydrogen in the balloon is found from',
      right: 'n = PV/(RT) with T = 300 K',
      wrong: ['n = PV/(RT) with T = 27', 'n = RT/(PV) with T = 300 K', 'n = PV × RT with T = 300 K'],
      sol: 'From PV = nRT, n = PV/(RT), with the temperature in kelvin (27 + 273 = 300 K) — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the amount of hydrogen in the balloon, in mol (3 significant figures).',
      value: v3(bn.n), tol: tl(bn.n), unit: 'mol',
      sol: r`$n = \dfrac{P V}{R T} = \dfrac{1.0 \times 10^5 \times 3.0}{8.314 \times ${bn.T1}} = ${dec(bn.n, 3)}$ mol.`,
      scheme: [[`n = PV/RT = ${dec(bn.n, 3)} mol`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'By noon the gas has warmed to 42 °C while its pressure stays at 1.0 × 10⁵ Pa. Find the new volume of the balloon in m³.',
      model: r`The balloon gas stays at constant pressure and constant amount, so by Charles' law its volume is proportional to the **absolute** temperature. Convert to kelvin: $T_2 = ${bn.T2}$ K. Then $V_2 = V_1 \dfrac{T_2}{T_1} = 3.0 \times \dfrac{${bn.T2}}{${bn.T1}} = ${dec(bn.V2, 3)}$ m$^3$.`,
      sol: 'Charles: V ∝ T; 3.15 m³.',
      scheme: [['Constant P: V₂/V₁ = T₂/T₁ with kelvin temperatures', 1], [`V₂ = ${dec(bn.V2, 3)} m³`, 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A stall-holder says the volume should now be 3.0 × (42/27) m³, because the temperature has risen from 27 to 42. Evaluate this claim.',
        model: r`The claim is **wrong**. At constant pressure the volume of a gas is proportional to its **absolute** temperature, not to the Celsius value, so Charles' law needs kelvin temperatures. The ratio is therefore $\dfrac{${bn.T2}}{${bn.T1}}$ and not $\dfrac{42}{27}$. The balloon grows only to $${dec(bn.V2, 3)}$ m$^3$, a rise of five per cent, and not to $${dec(bn.wrong, 3)}$ m$^3$ as the stall-holder claims.`,
        sol: 'Use kelvin: 3.15 m³, not 4.67 m³.',
        scheme: [['Claim wrong: Charles\' law needs kelvin temperatures', 1], [`Correct volume ${dec(bn.V2, 3)} m³ (not ${dec(bn.wrong, 3)} m³)`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near((1e5 * 3.0) / (KB * NA * 300), q.children[1].answer.value, 0.005) && near(bn.V2, 3.15, 1e-9) && near(bn.wrong, 4.6667, 1e-3) || 'bn');
const mo = { t: 380, MH: 2.0e-3, MN: 28e-3, vesc: 2400 };
mo.vH = vrmsM(mo.t, mo.MH);
mo.vN = vrmsM(mo.t, mo.MN);
mo.ratio = Math.sqrt(mo.MN / mo.MH);
add('moon-case', mk.case({
  passage: 'The Moon has no atmosphere. At midday on the lunar surface the temperature of the ground and of any gas near it is about 380 K. The escape speed from the Moon is 2.4 × 10³ m s⁻¹. A mission planner compares hydrogen (molar mass 2.0 g mol⁻¹) with nitrogen (molar mass 28 g mol⁻¹) as gases that might be released near the lander. Take R = 8.314 J mol⁻¹ K⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the same temperature the rms speed of hydrogen molecules is',
      right: 'larger than that of nitrogen molecules, because hydrogen molecules are lighter',
      wrong: ['smaller than that of nitrogen molecules, because hydrogen molecules are lighter', 'equal to that of nitrogen molecules, because the temperature is the same', 'larger than that of nitrogen molecules, because hydrogen has a larger mean kinetic energy'],
      sol: 'v_rms = √(3RT/M) varies as 1/√M at one temperature. The mean translational kinetic energy is the same for both gases — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the rms speed of hydrogen molecules at 380 K, in m s⁻¹ (3 significant figures).',
      value: v3(mo.vH), tol: tl(mo.vH), unit: 'm/s',
      sol: r`$v_\text{rms} = \sqrt{\dfrac{3 R T}{M}} = \sqrt{\dfrac{3 \times 8.314 \times ${mo.t}}{2.0 \times 10^{-3}}} = \sqrt{${dec(3 * R * mo.t / mo.MH, 6)}} = ${dec(mo.vH, 3)}$ m s$^{-1}$.`,
      scheme: [[`v_rms = √(3RT/M) = ${dec(mo.vH, 3)} m/s`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the ratio of the rms speed of hydrogen to that of nitrogen at the same temperature, and say which gas has the larger fraction of molecules fast enough to escape.',
      model: r`$\dfrac{v_H}{v_N} = \sqrt{\dfrac{M_N}{M_H}} = \sqrt{\dfrac{28}{2.0}} = ${dec(mo.ratio, 3)}$. Hydrogen molecules are about ${dec(mo.ratio, 2)} times faster, so far more of them reach the escape speed; **hydrogen** is the gas more easily lost.`,
      sol: '√14 = 3.74; hydrogen.',
      scheme: [[`Ratio = √(28/2.0) = ${dec(mo.ratio, 3)}`, 1], ['Hydrogen is faster, so more of its molecules can escape', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A colleague says that nitrogen at 380 K also has an rms speed of about 2.2 × 10³ m s⁻¹, because both gases are at the same temperature. Evaluate this claim.',
        model: r`The claim is **wrong**. Equal temperature means equal mean **kinetic energy**, not equal speed. $v_\text{rms}$ varies as $1/\sqrt{M}$, so for nitrogen $v_\text{rms} = \sqrt{\dfrac{3 \times 8.314 \times ${mo.t}}{0.028}} = ${dec(mo.vN, 3)}$ m s$^{-1}$, about a quarter of the speed of hydrogen.`,
        sol: 'Nitrogen is about 582 m/s.',
        scheme: [['Claim wrong: same temperature gives the same energy, not the same speed', 1], [`v_rms(N₂) = ${dec(mo.vN, 3)} m/s`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(vrmsM(380, 2e-3), q.children[1].answer.value, 0.005) && near(mo.ratio, 3.7417, 1e-3) && near(mo.vN, 581.8, 1e-3) || 'mo');
const gc = { Cv: 20.8, n: 2.0, dT: 30 };
gc.f = (2 * gc.Cv) / R;
gc.Cp = gc.Cv + R;
gc.Q = gc.n * gc.Cp * gc.dT;
add('gamma-case', mk.case({
  passage: 'In a laboratory in Bengaluru a student heats a gas in a rigid sealed bulb and finds that its molar heat capacity at constant volume is 20.8 J mol⁻¹ K⁻¹. She treats the gas as ideal. Use R = 8.314 J mol⁻¹ K⁻¹.',
  d: 4, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The measured value of C_V suggests that the gas is most likely',
      right: 'a diatomic gas with 5 active degrees of freedom',
      wrong: ['a monatomic gas with 3 degrees of freedom', 'a non-linear polyatomic gas with 6 degrees of freedom', 'a diatomic gas with 7 active degrees of freedom'],
      sol: r`$f = \dfrac{2 C_V}{R} = \dfrac{2 \times 20.8}{8.314} = ${dec(gc.f, 3)} \approx 5$ — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'Find the molar heat capacity of the gas at constant pressure, in J mol⁻¹ K⁻¹ (3 significant figures).',
      value: v3(gc.Cp), tol: tl(gc.Cp), unit: 'J/(mol K)',
      sol: r`$C_P = C_V + R = 20.8 + 8.314 = ${dec(gc.Cp, 4)}$ J mol$^{-1}$ K$^{-1}$ $= ${dec(gc.Cp, 3)}$ J mol$^{-1}$ K$^{-1}$.`,
      scheme: [[`C_P = C_V + R = ${dec(gc.Cp, 3)} J mol⁻¹ K⁻¹`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the heat needed to raise the temperature of 2.0 mol of this gas by 30 K at constant pressure, in kJ.',
      model: r`At constant pressure the heat needed is $Q = n C_P \Delta T = ${gc.n} \times ${dec(gc.Cp, 5)} \times ${gc.dT} = ${dec(gc.Q, 5)}$ J $= ${dec(gc.Q / 1000, 3)}$ kJ. This is more than the heat needed at constant volume for the same rise in temperature, because the gas also does work of expansion against the surroundings.`,
      sol: 'Q = nC_PΔT = 1.75 kJ.',
      scheme: [[`Q = nC_PΔT = ${dec(gc.Q, 5)} J`, 1], [`= ${dec(gc.Q / 1000, 3)} kJ; extra heat does the expansion work`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A colleague suggests that the gas could be helium. Use the measured C_V to evaluate this suggestion.',
        model: r`The suggestion is **wrong**. Helium is a monatomic gas with only three degrees of freedom ($f = 3$), so its molar heat capacity at constant volume would be $C_V = \tfrac{3}{2}R = ${dec(1.5 * R, 4)}$ J mol$^{-1}$ K$^{-1}$, much less than the measured $20.8$. The measured value is very close to $\tfrac{5}{2}R = ${dec(2.5 * R, 4)}$ J mol$^{-1}$ K$^{-1}$, which points to a rigid diatomic gas with $f = 5$.`,
        sol: 'Helium would give 12.5.',
        scheme: [[`Helium: C_V = 3R/2 = ${dec(1.5 * R, 4)} J mol⁻¹ K⁻¹, not 20.8`, 1], ['Measured value equals 5R/2: diatomic gas', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(20.8 + 8.314, q.children[1].answer.value, 0.002) && near(gc.f, 5, 0.01) && near(gc.Q, 1746.84, 1e-5) || 'gc');
const vc = { P: 5.0e-4, T: 300, d: 2.0e-10, w: 2.0 };
vc.n = vc.P / (KB * vc.T);
vc.lam = mfp(vc.n, vc.d);
vc.P2 = (vc.P * vc.lam) / vc.w;
add('vac-case', mk.case({
  passage: 'A vacuum chamber used to test a satellite instrument is a cube of side 2.0 m. It is filled with helium atoms (diameter 2.0 × 10⁻¹⁰ m) at a pressure of 5.0 × 10⁻⁴ Pa and a temperature of 300 K. Take k_B = 1.38 × 10⁻²³ J K⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At this very low pressure the helium atoms in the chamber mostly collide with',
      right: 'the walls of the chamber, because the mean free path is larger than the chamber',
      wrong: ['each other, because the number density is large', 'each other, because the atoms are fast', 'neither, because the atoms are point masses that do not collide'],
      sol: 'λ is much larger than 2.0 m (about 47 m), so an atom crosses the chamber far more often than it meets another atom: collisions are mostly with the walls — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the mean free path of the helium atoms in the chamber, in m (3 significant figures).',
      value: v3(vc.lam), tol: tl(vc.lam), unit: 'm',
      sol: r`$n = \dfrac{P}{k_B T} = \dfrac{5.0 \times 10^{-4}}{1.38 \times 10^{-23} \times 300} = ${sci(vc.n, 3)}$ m$^{-3}$. $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n} = \dfrac{1}{1.414 \times 3.142 \times (2.0 \times 10^{-10})^2 \times ${sci(vc.n, 3)}} = ${dec(vc.lam, 3)}$ m.`,
      scheme: [[`n = P/(k_B T) = ${sciu(vc.n, 3)} m⁻³`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'At the same temperature, find the pressure at which the mean free path of the atoms would equal the 2.0 m side of the chamber, in Pa.',
      model: r`At constant $T$, $\lambda \propto 1/P$, so $P_2 = P \dfrac{\lambda}{\lambda_2} = 5.0 \times 10^{-4} \times \dfrac{${dec(vc.lam, 3)}}{2.0} = ${sci(vc.P2, 3)}$ Pa. At a higher pressure than this, atoms would collide with each other more often than with the walls.`,
      sol: `P ∝ 1/λ; about ${dec(vc.P2, 3)} Pa.`,
      scheme: [['λ ∝ 1/P at constant temperature', 1], [`P₂ = ${sciu(vc.P2, 3)} Pa`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The chamber is sealed and its gas is heated from 300 K to 600 K. A technician says the mean free path of the atoms doubles. Evaluate this claim.',
        model: r`The claim is **wrong**. In a sealed chamber the number of atoms per unit volume $n$ and the atomic diameter $d$ do not change, and $\lambda = 1/(\sqrt{2}\,\pi d^2 n)$ depends only on these, so $\lambda$ is **unchanged** at ${dec(vc.lam, 3)} m. The pressure doubles and the atoms collide more often because they are faster, but they still travel the same average distance between collisions.`,
        sol: 'λ unchanged in a sealed chamber.',
        scheme: [['Claim wrong: n and d unchanged, so λ unchanged', 1], ['Pressure rises and collisions per second increase, but λ does not', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near((KB * 300) / (Math.SQRT2 * Math.PI * 4e-20 * 5e-4), q.children[1].answer.value, 0.005) && near(vc.P2, 1.165e-2, 0.005) || 'vc');
void long;
